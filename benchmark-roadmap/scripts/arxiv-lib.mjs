import { createHash } from 'node:crypto';

export const sha256 = (value) => `sha256:${createHash('sha256').update(value).digest('hex')}`;

export function slugify(value) {
  return String(value)
    .normalize('NFKD')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'untitled';
}

export function canonicalArxivId(value) {
  const match = String(value).match(/(\d{4}\.\d{4,5})(v\d+)?/i);
  if (!match) throw new Error(`Invalid arXiv id: ${value}`);
  return { arxivId: match[1], version: (match[2] || 'v1').toLowerCase() };
}

export function paperId(arxivId, version = 'v1') {
  return `arxiv-${arxivId.replace('.', '-')}-${version}`;
}

export function decodeXml(value = '') {
  return String(value)
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function tag(entry, name) {
  return decodeXml(entry.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, 'i'))?.[1] || '');
}

export function parseAtomFeed(xml) {
  return [...String(xml).matchAll(/<entry>([\s\S]*?)<\/entry>/gi)].map((match) => {
    const entry = match[1];
    const idValue = tag(entry, 'id');
    const { arxivId, version } = canonicalArxivId(idValue);
    const authors = [...entry.matchAll(/<author>[\s\S]*?<name>([\s\S]*?)<\/name>[\s\S]*?<\/author>/gi)].map((item) => decodeXml(item[1]));
    const categories = [...entry.matchAll(/<category[^>]+term=["']([^"']+)["'][^>]*\/>/gi)].map((item) => item[1]);
    const pdfHref = [...entry.matchAll(/<link\s+([^>]+)\/>/gi)].map((item) => item[1]).find((attrs) => /type=["']application\/pdf["']/i.test(attrs));
    const pdfUrl = pdfHref?.match(/href=["']([^"']+)["']/i)?.[1] || `https://arxiv.org/pdf/${arxivId}${version}`;
    return {
      paperId: paperId(arxivId, version), arxivId, version,
      title: tag(entry, 'title'), authors, summary: tag(entry, 'summary'),
      submittedAt: tag(entry, 'published'), updatedAt: tag(entry, 'updated'), categories,
      arxivUrl: `https://arxiv.org/abs/${arxivId}${version}`,
      pdfUrl: pdfUrl.replace(/^http:/, 'https:')
    };
  });
}

export function queryMatches(paper, config) {
  const title = paper.title.toLowerCase();
  const body = `${paper.title} ${paper.summary || ''}`.toLowerCase();
  const matches = [];
  for (const bucket of config.queryBuckets) {
    if (bucket.terms.some((term) => body.includes(term.toLowerCase()))) matches.push(bucket.id);
  }
  const weights = config.candidateWeights;
  let score = 0;
  if (/\bbench(?:mark)?\b/i.test(title) || /-bench\b/i.test(title)) score += weights.titleBenchmark;
  if (/we (introduce|present|propose|release)/i.test(body) && /benchmark|dataset|evaluation protocol/i.test(body)) score += weights.releaseAndBenchmark;
  if (/\b\d{2,}[,\d]*\s+(tasks|samples|episodes|models)\b/i.test(body)) score += weights.scaleSignal;
  if (/github\.com|code is available|dataset is available/i.test(body)) score += weights.codeOrDataset;
  if (/memory|cross-episode|episodic/i.test(body) && /agent|navigation|evaluation/i.test(body)) score += weights.memoryAndAgent;
  return { score, queryBuckets: matches, watchlists: matches.includes('memory-watch') ? ['memory'] : [] };
}

export function buildArxivQuery(config, bucket, date) {
  const compactDate = date.replaceAll('-', '');
  const categories = config.categories.map((category) => `cat:${category}`).join(' OR ');
  const terms = bucket.terms.map((term) => `all:\"${term}\"`).join(' OR ');
  return `(${categories}) AND (${terms}) AND submittedDate:[${compactDate}0000 TO ${compactDate}2359]`;
}

export function classifyPaper(paper, registry = []) {
  const body = `${paper.title} ${paper.summary || ''}`;
  const titleBenchmark = paper.title.match(/\b([A-Z][A-Za-z0-9]*[- ]?Bench(?:mark)?)\b/);
  const introducedBenchmark = body.match(/(?:we\s+(?:introduce|present|release)|introduce|发布)\s+([A-Z][A-Za-z0-9]*[- ]?Bench(?:mark)?)/i);
  const benchmarkTitle = titleBenchmark || introducedBenchmark;
  let entityName = benchmarkTitle?.[1]?.replace(/Benchmark$/i, 'Benchmark') || null;
  let entityKind = entityName ? 'benchmark' : null;
  let relation = titleBenchmark || introducedBenchmark ? 'introduces' : 'uses';
  if (/(?:we introduce|提出)\s*Cross-Episode Object-Goal Navigation/i.test(body)) {
    entityName = 'Cross-Episode Object-Goal Navigation';
    entityKind = 'protocol';
    relation = 'proposes_protocol';
  }
  if (!entityName && /VisualProbe/i.test(body)) {
    entityName = 'VisualProbe';
    entityKind = 'benchmark';
    relation = 'uses';
  }
  if (!entityName) return null;
  const normalized = slugify(entityName);
  const exact = registry.find((item) => item.benchmarkId === normalized || item.canonicalName.toLowerCase() === entityName.toLowerCase() || (item.aliases || []).some((alias) => alias.toLowerCase() === entityName.toLowerCase()));
  return {
    entityName, entityKind, relation,
    classificationConfidence: relation === 'introduces' || relation === 'proposes_protocol' ? 0.96 : 0.78,
    registryMatch: { matched: Boolean(exact), matchedId: exact?.benchmarkId || null, matchedName: exact?.canonicalName || '', matchScore: exact ? 1 : 0, matchType: exact ? 'exact' : 'none' }
  };
}

export function trendScore(signal, weights) {
  const capped = {
    adoptionPapers: Math.min(signal.adoptionPapers || 0, 5) / 5,
    modelCount: Math.min(signal.modelCount || 0, 10) / 10,
    repository: signal.repository ? 1 : 0,
    leaderboard: signal.leaderboard ? 1 : 0,
    independentResults: Math.min(signal.independentResults || 0, 3) / 3,
    harness: signal.harness ? 1 : 0
  };
  return Math.round(Object.entries(weights).reduce((sum, [key, weight]) => sum + capped[key] * weight, 0));
}

export function sleep(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }
