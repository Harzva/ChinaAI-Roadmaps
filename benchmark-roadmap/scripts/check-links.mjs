import { readJson } from './lib.mjs';

const sources = (await readJson('data/sources.json')).sources;
const invalid = sources.filter((item) => !/^https:\/\/[^\s]+$/.test(item.url));
if (invalid.length) {
  console.error(invalid.map((item) => `${item.sourceId}: invalid URL`).join('\n'));
  process.exitCode = 1;
} else console.log(`Link structure passed for ${sources.length} canonical sources. Use --online for network checks in the scheduled workflow.`);

if (process.argv.includes('--online')) {
  const failures = [];
  for (const source of sources) {
    try {
      const response = await fetch(source.url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(12000), headers: { 'user-agent': 'ChinaAI-Benchmark-Registry/1.0' } });
      if (response.status >= 400 && response.status !== 405) failures.push(`${source.sourceId}: HTTP ${response.status}`);
    } catch (error) { failures.push(`${source.sourceId}: ${error.name}`); }
  }
  if (failures.length) {
    console.error(`Online audit warnings (${failures.length}/${sources.length}); public snapshot remains unchanged:\n${failures.join('\n')}`);
    process.exitCode = 2;
  } else console.log('Online source audit passed.');
}
