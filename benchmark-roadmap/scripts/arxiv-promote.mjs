import { readJson, writeJson } from './lib.mjs';

const apply = process.argv.includes('--apply');
const promotions = (await readJson('data/arxiv/promotions.json')).promotions;
const reviews = (await readJson('data/arxiv/reviews.json')).decisions;
const benchmarkDoc = await readJson('data/benchmarks.json');
const sourceDoc = await readJson('data/sources.json');
const accepted = new Set(reviews.filter((item) => item.targetType === 'candidate' && item.decision === 'accept').map((item) => item.targetId));
const selected = promotions.filter((item) => accepted.has(item.candidateId));
const benchmarkIds = new Set(benchmarkDoc.benchmarks.map((item) => item.benchmarkId));
const sourceIds = new Set(sourceDoc.sources.map((item) => item.sourceId));

if (apply) {
  for (const item of selected) {
    if (!benchmarkIds.has(item.benchmark.benchmarkId)) { benchmarkDoc.benchmarks.push(item.benchmark); benchmarkIds.add(item.benchmark.benchmarkId); }
    if (!sourceIds.has(item.source.sourceId)) { sourceDoc.sources.push(item.source); sourceIds.add(item.source.sourceId); }
  }
  benchmarkDoc.benchmarks.sort((a, b) => a.benchmarkId.localeCompare(b.benchmarkId));
  sourceDoc.sources.sort((a, b) => a.sourceId.localeCompare(b.sourceId));
  await writeJson('data/benchmarks.json', benchmarkDoc);
  await writeJson('data/sources.json', sourceDoc);
}

const missing = selected.filter((item) => !benchmarkIds.has(item.benchmark.benchmarkId) || !sourceIds.has(item.source.sourceId));
if (missing.length) {
  console.error(`Missing ${missing.length} accepted arXiv promotion(s): ${missing.map((item) => item.candidateId).join(', ')}`);
  process.exitCode = 1;
} else console.log(`${apply ? 'Applied and verified' : 'Verified'} ${selected.length} accepted arXiv promotion(s); paper-reported scores remain outside results.json.`);
