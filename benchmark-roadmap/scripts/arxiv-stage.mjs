import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { ROOT, readJson, writeJson } from './lib.mjs';
import { classifyPaper, slugify } from './arxiv-lib.mjs';

let input = 'data/arxiv/runtime/discovery.json';
let output = 'data/arxiv/runtime/staging.json';
for (let index = 2; index < process.argv.length; index += 1) {
  if (process.argv[index] === '--input') input = process.argv[++index];
  else if (process.argv[index] === '--output') output = process.argv[++index];
  else throw new Error(`Unknown argument ${process.argv[index]}`);
}

const discovery = JSON.parse(await readFile(resolve(ROOT, input), 'utf8'));
const registry = (await readJson('data/benchmarks.json')).benchmarks;
const createdAt = discovery.capturedAt || new Date().toISOString();
const candidates = [];
for (const paper of discovery.papers) {
  const classification = classifyPaper(paper, registry);
  if (!classification) continue;
  candidates.push({
    candidateId: `candidate-${slugify(classification.entityName)}-${paper.arxivId.replace('.', '-')}-${paper.version}`,
    paperId: paper.paperId,
    ...classification,
    createdAt,
    updatedAt: createdAt,
    status: 'open',
    statusHistory: [{ status: 'open', timestamp: createdAt, note: 'Machine-staged; requires evidence review.' }],
    evidence: { sourcePdfPage: 1, contextSnippet: 'Machine-located title/abstract signal; page and entity type require review.' },
    watchlists: paper.watchlists || [],
    noveltySignals: paper.queryBuckets || []
  });
}
await writeJson(output, {
  schemaVersion: '1.0.0', generatedAt: createdAt, source: input,
  counts: { papers: discovery.papers.length, candidates: candidates.length, memory: candidates.filter((item) => item.watchlists.includes('memory')).length },
  candidates,
  safeguards: { autoPromote: false, autoRank: false, nextAction: 'download PDF, extract evidence pages, then review entity identity and claims' }
});
console.log(`Staged ${candidates.length} candidate(s) from ${discovery.papers.length} paper(s); no Registry or Top-K mutation performed.`);
