import { readJson } from './lib.mjs';

export async function validateData(overrides = {}) {
  const benchmarkDoc = overrides.benchmarks || await readJson('data/benchmarks.json');
  const modelDoc = overrides.models || await readJson('data/models.json');
  const systemDoc = overrides.systems || await readJson('data/systems.json');
  const resultDoc = overrides.results || await readJson('data/results.json');
  const sourceDoc = overrides.sources || await readJson('data/sources.json');
  const errors = [];
  const ids = (items, key, label) => {
    const seen = new Set();
    for (const item of items) {
      if (!item[key]) errors.push(`${label}: missing ${key}`);
      else if (seen.has(item[key])) errors.push(`${label}: duplicate ${item[key]}`);
      seen.add(item[key]);
    }
    return seen;
  };
  const benchmarkIds = ids(benchmarkDoc.benchmarks, 'benchmarkId', 'benchmark');
  const modelIds = ids(modelDoc.models, 'modelId', 'model');
  const systemIds = ids(systemDoc.systems, 'systemId', 'system');
  const sourceIds = ids(sourceDoc.sources, 'sourceId', 'source');
  ids(resultDoc.results, 'resultId', 'result');
  const aliases = new Map();
  for (const benchmark of benchmarkDoc.benchmarks) {
    if (!['benchmark','suite','framework','dataset','audit_method'].includes(benchmark.type)) errors.push(`${benchmark.benchmarkId}: invalid type`);
    if (!['higher','lower'].includes(benchmark.primaryMetric?.direction)) errors.push(`${benchmark.benchmarkId}: missing metric direction`);
    if (!Array.isArray(benchmark.languages) || !benchmark.languages.length) errors.push(`${benchmark.benchmarkId}: missing languages`);
    if (!Array.isArray(benchmark.modalities) || !benchmark.modalities.length) errors.push(`${benchmark.benchmarkId}: missing modalities`);
    for (const name of [benchmark.canonicalName, ...(benchmark.aliases || [])]) {
      const key = String(name).trim().toLowerCase();
      if (aliases.has(key) && aliases.get(key) !== benchmark.benchmarkId) errors.push(`${benchmark.benchmarkId}: alias conflict ${name} with ${aliases.get(key)}`);
      aliases.set(key, benchmark.benchmarkId);
    }
    for (const sourceId of benchmark.sourceIds || []) if (!sourceIds.has(sourceId)) errors.push(`${benchmark.benchmarkId}: unknown source ${sourceId}`);
  }
  for (const system of systemDoc.systems) if (!modelIds.has(system.modelId)) errors.push(`${system.systemId}: unknown model ${system.modelId}`);
  for (const result of resultDoc.results) {
    if (!benchmarkIds.has(result.benchmarkId)) errors.push(`${result.resultId}: unknown benchmark`);
    if (!systemIds.has(result.systemId)) errors.push(`${result.resultId}: unknown system`);
    if (!sourceIds.has(result.sourceId)) errors.push(`${result.resultId}: unknown source`);
    if (!['official','independent','vendor_reported','community','unverified'].includes(result.sourceType)) errors.push(`${result.resultId}: invalid source type`);
    if (!['comparable','partially_comparable','not_comparable'].includes(result.comparability)) errors.push(`${result.resultId}: invalid comparability`);
    for (const key of ['version','subset','metric','protocol','evaluationDate','retrievedAt']) if (!result[key]) errors.push(`${result.resultId}: missing ${key}`);
    if (!Number.isFinite(result.score)) errors.push(`${result.resultId}: score must be finite`);
    if (!/^https:\/\//.test(result.sourceUrl || '')) errors.push(`${result.resultId}: source URL must use https`);
    if (!/^sha256:[a-f0-9]{64}$/.test(result.contentHash || '')) errors.push(`${result.resultId}: invalid content hash`);
    if (!result.runConfig || !Number.isFinite(result.runConfig.attempts)) errors.push(`${result.resultId}: missing run config attempts`);
  }
  return errors;
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const errors = await validateData();
  if (errors.length) {
    console.error(errors.map((item) => `- ${item}`).join('\n'));
    process.exitCode = 1;
  } else console.log('Data validation passed. Identity, references, source evidence and run configuration are consistent.');
}
