import { createHash } from 'node:crypto';
import { eligible, rankResults, readJson, writeJson } from './lib.mjs';

const generatedAt = process.env.BENCHMARK_BUILD_TIME || '2026-07-18T00:00:00Z';
const benchmarkDoc = await readJson('data/benchmarks.json');
const modelDoc = await readJson('data/models.json');
const systemDoc = await readJson('data/systems.json');
const resultDoc = await readJson('data/results.json');
const sourceDoc = await readJson('data/sources.json');
const popularityDoc = await readJson('data/popularity-signals.json');

function evidenceStage(benchmark) {
  const role = benchmark.registryOrigin?.catalogRole;
  if (role === 'implementation-index') return 'implementation_index';
  if (role === 'paper-evidence') return 'paper_evidence';
  return 'canonical_source';
}

const modelById = new Map(modelDoc.models.map((item) => [item.modelId, item]));
const systemById = new Map(systemDoc.systems.map((item) => [item.systemId, item]));
const sourceById = new Map(sourceDoc.sources.map((item) => [item.sourceId, item]));

function publicResult(item) {
  const system = systemById.get(item.systemId);
  const model = modelById.get(system.modelId);
  const source = sourceById.get(item.sourceId);
  return {
    resultId: item.resultId,
    rank: item.rank,
    system: { systemId: system.systemId, name: system.name, scaffold: system.scaffold, harness: system.harness, tools: system.tools },
    model: { modelId: model.modelId, name: model.name, organization: model.organization, openWeights: model.openWeights },
    score: item.score,
    uncertainty: item.uncertainty ?? null,
    evaluationDate: item.evaluationDate,
    source: { sourceId: source.sourceId, type: item.sourceType, name: source.name, url: item.sourceUrl },
    comparability: item.comparability,
    runConfig: item.runConfig,
    notes: item.notes || ''
  };
}

function sotaTimeline(results, direction) {
  const ordered = [...results].sort((a, b) => String(a.evaluationDate).localeCompare(String(b.evaluationDate)) || a.resultId.localeCompare(b.resultId));
  const seen = [];
  const points = [];
  for (const item of ordered) {
    seen.push(item);
    const leaders = rankResults(seen, direction).filter((candidate) => candidate.rank === 1);
    const signature = leaders.map((candidate) => `${candidate.systemId}:${candidate.score}`).sort().join('|');
    if (points.at(-1)?.signature === signature) continue;
    points.push({ date: item.evaluationDate, signature, leaders: leaders.map(publicResult) });
  }
  return points.map(({ signature, ...point }) => point);
}

const leaderboardSummaries = [];
for (const benchmark of benchmarkDoc.benchmarks) {
  const benchmarkResults = resultDoc.results.filter((result) => result.benchmarkId === benchmark.benchmarkId);
  const groups = new Map();
  for (const item of benchmarkResults.filter((result) => eligible(result))) {
    const key = [item.version, item.subset, item.metric, item.protocol].join('::');
    groups.set(key, [...(groups.get(key) || []), item]);
  }
  const [groupKey, groupResults = []] = [...groups.entries()].sort((a, b) => b[1].length - a[1].length)[0] || [];
  const ranked = rankResults(groupResults, benchmark.primaryMetric.direction).map(publicResult);
  const groupParts = groupKey ? groupKey.split('::') : benchmark.versions.slice(0, 1).concat(['full', benchmark.primaryMetric.name, 'unconfigured']);
  const output = {
    schemaVersion: '1.0.0',
    generatedAt,
    benchmark: {
      benchmarkId: benchmark.benchmarkId,
      canonicalName: benchmark.canonicalName,
      category: benchmark.category,
      status: benchmark.status,
      summary: benchmark.summary,
      metric: benchmark.primaryMetric,
      links: benchmark.links
    },
    group: { version: groupParts[0], subset: groupParts[1], metric: groupParts[2], protocol: groupParts[3] },
    top5: ranked.slice(0, 5),
    top10: ranked.slice(0, 10),
    all: ranked,
    availableGroups: [...groups.entries()].map(([key, items]) => ({ key, resultCount: items.length, version: items[0].version, subset: items[0].subset, metric: items[0].metric, protocol: items[0].protocol })),
    sotaTimeline: sotaTimeline(groupResults, benchmark.primaryMetric.direction),
    otherReports: benchmarkResults.filter((item) => !eligible(item)).map((item) => {
      const system = systemById.get(item.systemId);
      const model = system && modelById.get(system.modelId);
      return { resultId: item.resultId, system: system ? { systemId: system.systemId, name: system.name, harness: system.harness } : null, model: model ? { modelId: model.modelId, name: model.name, organization: model.organization, openWeights: model.openWeights } : null, score: item.score, uncertainty: item.uncertainty ?? null, source: { type: item.sourceType, url: item.sourceUrl }, comparability: item.comparability, runConfig: item.runConfig, evaluationDate: item.evaluationDate, notes: item.notes || '' };
    }),
    caveat: ranked.length ? 'Ranked only within this exact version, subset, metric and protocol.' : 'No source-qualified comparable result is published yet.'
  };
  await writeJson(`data/public/leaderboards/${benchmark.benchmarkId}.json`, output);
  leaderboardSummaries.push({ benchmarkId: benchmark.benchmarkId, resultCount: ranked.length, leader: ranked[0] || null, top3: ranked.slice(0, 3), group: output.group });
}

const hotBenchmarks = popularityDoc.signals
  .map((item) => ({ ...item, score: ['activeLeaderboard','modelAdoption','communityImpact','freshness','reproducibility'].reduce((sum, key) => sum + item[key], 0) }))
  .filter((item) => item.score >= popularityDoc.threshold && item.independentSignalCount >= 2)
  .sort((a, b) => b.score - a.score || a.benchmarkId.localeCompare(b.benchmarkId))
  .map((item) => ({ ...item, benchmark: benchmarkDoc.benchmarks.find((benchmark) => benchmark.benchmarkId === item.benchmarkId), leaderboard: leaderboardSummaries.find((board) => board.benchmarkId === item.benchmarkId) }));

const catalog = {
  schemaVersion: '1.1.0',
  generatedAt,
  methodology: { defaultTopK: 5, eligibleSources: ['official', 'independent'], popularityThreshold: popularityDoc.threshold, popularityWeights: popularityDoc.weights },
  benchmarks: benchmarkDoc.benchmarks.map((benchmark) => ({
    ...benchmark,
    evidenceStage: evidenceStage(benchmark),
    leaderboard: leaderboardSummaries.find((board) => board.benchmarkId === benchmark.benchmarkId)
  }))
};
await writeJson('data/public/catalog.json', catalog);
await writeJson('data/public/hot-benchmarks.json', { schemaVersion: '1.0.0', generatedAt, benchmarks: hotBenchmarks });
await writeJson('data/public/models.json', { schemaVersion: '1.0.0', generatedAt, models: modelDoc.models.map((model) => ({ ...model, systems: systemDoc.systems.filter((system) => system.modelId === model.modelId).map((system) => system.systemId) })) });

const rawManifest = await readJson('data/raw-manifest.json');
const lastSync = rawManifest.snapshots.map((item) => item.retrievedAt).sort().at(-1) || null;
const maintenance = {
  schemaVersion: '1.0.0',
  generatedAt,
  lastSuccessfulSync: lastSync,
  sources: { total: sourceDoc.sources.length, curatedSnapshots: rawManifest.snapshots.filter((item) => item.status === 'curated').length, broken: 0, onlineAudit: 'scheduled' },
  queue: {
    needsSource: benchmarkDoc.benchmarks.filter((item) => item.status === 'needs_source').length,
    collecting: benchmarkDoc.benchmarks.filter((item) => item.status === 'collecting').length,
    implementationIndex: benchmarkDoc.benchmarks.filter((item) => item.registryOrigin?.catalogRole === 'implementation-index').length,
    paperEvidence: benchmarkDoc.benchmarks.filter((item) => item.registryOrigin?.catalogRole === 'paper-evidence').length,
    nonDefaultReports: resultDoc.results.filter((item) => !eligible(item)).length
  },
  staleBenchmarks: benchmarkDoc.benchmarks.filter((item) => item.status === 'legacy').map((item) => item.benchmarkId),
  policy: 'Scheduled checks never overwrite production. A reviewed commit must pass all release gates.'
};
await writeJson('data/public/maintenance.json', maintenance);

const digest = createHash('sha256').update(JSON.stringify({ catalog, hotBenchmarks, leaderboardSummaries, maintenance })).digest('hex');
await writeJson('data/public/snapshot.json', {
  schemaVersion: '1.1.0',
  generatedAt,
  contentHash: `sha256:${digest}`,
  counts: {
    benchmarks: benchmarkDoc.benchmarks.length,
    canonicalSourceEntries: benchmarkDoc.benchmarks.filter((item) => !item.registryOrigin?.catalogRole).length,
    implementationIndexedEntries: benchmarkDoc.benchmarks.filter((item) => item.registryOrigin?.catalogRole === 'implementation-index').length,
    paperEvidenceEntries: benchmarkDoc.benchmarks.filter((item) => item.registryOrigin?.catalogRole === 'paper-evidence').length,
    rankedBenchmarks: leaderboardSummaries.filter((item) => item.resultCount > 0).length,
    hotBenchmarks: hotBenchmarks.length,
    qualifiedResults: leaderboardSummaries.reduce((sum, item) => sum + item.resultCount, 0)
  },
  leaderboardSummaries
});
console.log(`Built ${benchmarkDoc.benchmarks.length} leaderboards; ${hotBenchmarks.length} are hot; snapshot sha256:${digest.slice(0, 12)}…`);
