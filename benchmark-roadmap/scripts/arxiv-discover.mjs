import { mkdir, readFile, writeFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { ROOT, readJson, writeJson } from './lib.mjs';
import { buildArxivQuery, canonicalArxivId, paperId, parseAtomFeed, queryMatches, sha256, sleep } from './arxiv-lib.mjs';

function args(argv) {
  const options = { date: new Date().toISOString().slice(0, 10), output: 'data/arxiv/runtime', fixture: '', refresh: false, download: false };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--date') options.date = argv[++index];
    else if (value === '--output') options.output = argv[++index];
    else if (value === '--fixture') options.fixture = argv[++index];
    else if (value === '--refresh') options.refresh = true;
    else if (value === '--download') options.download = true;
    else throw new Error(`Unknown argument ${value}`);
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(options.date)) throw new Error('--date must be YYYY-MM-DD');
  return options;
}

async function exists(path) { try { await access(path); return true; } catch { return false; } }

async function fetchBucket(config, bucket, options, rawDir) {
  const cachePath = resolve(rawDir, `${options.date}-${bucket.id}.xml`);
  if (!options.refresh && await exists(cachePath)) return readFile(cachePath, 'utf8');
  const query = buildArxivQuery(config, bucket, options.date);
  const url = new URL('https://export.arxiv.org/api/query');
  url.searchParams.set('search_query', query);
  url.searchParams.set('start', '0');
  url.searchParams.set('max_results', String(config.maxCandidatesPerRun));
  url.searchParams.set('sortBy', 'submittedDate');
  url.searchParams.set('sortOrder', 'descending');
  const response = await fetch(url, { headers: { 'user-agent': 'ChinaAI-Roadmaps benchmark discovery/1.0 (public research index)' } });
  if (!response.ok) throw new Error(`arXiv ${bucket.id}: HTTP ${response.status}`);
  const xml = await response.text();
  await writeFile(cachePath, xml, 'utf8');
  return xml;
}

async function downloadPdf(paper, cacheDir) {
  const target = resolve(cacheDir, `${paper.arxivId}${paper.version}.pdf`);
  let bytes;
  if (await exists(target)) bytes = await readFile(target);
  else {
    const response = await fetch(paper.pdfUrl, { headers: { 'user-agent': 'ChinaAI-Roadmaps benchmark discovery/1.0' } });
    if (!response.ok) throw new Error(`${paper.paperId}: PDF HTTP ${response.status}`);
    bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length > 120 * 1024 * 1024) throw new Error(`${paper.paperId}: PDF exceeds 120 MiB`);
    if (!bytes.subarray(0, 5).equals(Buffer.from('%PDF-'))) throw new Error(`${paper.paperId}: response is not a PDF`);
    await writeFile(target, bytes);
  }
  return { pdfSha256: sha256(bytes), pdfBytes: bytes.length, cacheKey: `${paper.arxivId}${paper.version}.pdf` };
}

const options = args(process.argv.slice(2));
const config = await readJson('data/arxiv/config.json');
const outputDir = resolve(ROOT, options.output);
const rawDir = resolve(outputDir, 'raw');
const cacheDir = resolve(ROOT, 'data/arxiv/cache');
await mkdir(rawDir, { recursive: true });
await mkdir(cacheDir, { recursive: true });

let papers = [];
if (options.fixture) {
  const fixture = JSON.parse(await readFile(resolve(ROOT, options.fixture), 'utf8'));
  papers = fixture.papers || fixture;
} else {
  const byVersion = new Map();
  for (const [index, bucket] of config.queryBuckets.entries()) {
    const xml = await fetchBucket(config, bucket, options, rawDir);
    for (const paper of parseAtomFeed(xml)) {
      const key = `${paper.arxivId}${paper.version}`;
      const existing = byVersion.get(key) || paper;
      existing.queryBuckets = [...new Set([...(existing.queryBuckets || []), bucket.id])];
      byVersion.set(key, existing);
    }
    if (index < config.queryBuckets.length - 1) await sleep(config.requestDelayMs);
  }
  papers = [...byVersion.values()];
}

papers = papers.map((paper) => {
  const id = canonicalArxivId(`${paper.arxivId}${paper.version || 'v1'}`);
  const matched = queryMatches(paper, config);
  return { ...paper, paperId: paper.paperId || paperId(id.arxivId, id.version), arxivId: id.arxivId, version: id.version, queryScore: matched.score, queryBuckets: [...new Set([...(paper.queryBuckets || []), ...matched.queryBuckets])], watchlists: [...new Set([...(paper.watchlists || []), ...matched.watchlists])] };
}).sort((a, b) => b.queryScore - a.queryScore || String(b.submittedAt).localeCompare(String(a.submittedAt)) || a.paperId.localeCompare(b.paperId));

if (options.download) {
  for (const paper of papers.slice(0, config.maxPdfDownloadsPerRun)) Object.assign(paper, await downloadPdf(paper, cacheDir));
}

const ledgerPath = resolve(outputDir, 'ledger.jsonl');
const previous = await exists(ledgerPath) ? (await readFile(ledgerPath, 'utf8')).split('\n').filter(Boolean).map(JSON.parse) : [];
const ledger = new Map(previous.map((item) => [`${item.arxivId}${item.version}`, item]));
const capturedAt = new Date().toISOString();
for (const paper of papers) {
  const key = `${paper.arxivId}${paper.version}`;
  const old = ledger.get(key);
  ledger.set(key, { paperId: paper.paperId, arxivId: paper.arxivId, version: paper.version, firstSeenAt: old?.firstSeenAt || capturedAt, lastSeenAt: capturedAt, queryBuckets: paper.queryBuckets, status: old?.status || 'discovered', pdfSha256: paper.pdfSha256 || old?.pdfSha256 || null });
}
await writeFile(ledgerPath, `${[...ledger.values()].sort((a, b) => a.paperId.localeCompare(b.paperId)).map((item) => JSON.stringify(item)).join('\n')}\n`, 'utf8');
await writeJson(`${options.output}/discovery.json`, { schemaVersion: '1.0.0', date: options.date, capturedAt, source: options.fixture ? 'fixture' : 'arxiv-api', cachePolicy: { ttlHours: config.cacheTtlHours, requestDelayMs: config.requestDelayMs }, counts: { papers: papers.length, memoryWatch: papers.filter((item) => item.watchlists.includes('memory')).length }, papers });
console.log(`Discovered ${papers.length} paper(s); ${papers.filter((item) => item.watchlists.includes('memory')).length} memory-watch; ledger ${ledger.size} versioned record(s).`);
