import assert from 'node:assert/strict';
import { test } from 'node:test';
import { readFile } from 'node:fs/promises';
import { validateData } from '../scripts/validate-data.mjs';

function fixture() {
  return {
    benchmarks: { benchmarks: [{ benchmarkId: 'demo', canonicalName: 'Demo', aliases: [], type: 'benchmark', languages: ['en'], modalities: ['text'], primaryMetric: { direction: 'higher' }, links: { homepage: 'https://example.com/demo' }, sourceIds: ['src'] }] },
    models: { models: [{ modelId: 'model' }] },
    systems: { systems: [{ systemId: 'system', modelId: 'model' }] },
    sources: { sources: [{ sourceId: 'src', benchmarkIds: ['demo'] }] },
    results: { results: [{ resultId: 'result', benchmarkId: 'demo', version: '1', subset: 'full', metric: 'score', protocol: 'official', evaluationDate: '2026-01-01', retrievedAt: '2026-01-02T00:00:00Z', score: 1, systemId: 'system', sourceId: 'src', sourceType: 'official', sourceUrl: 'https://example.com', comparability: 'comparable', contentHash: `sha256:${'a'.repeat(64)}`, runConfig: { attempts: 1 } }] }
  };
}

test('valid cross-entity references pass', async () => assert.deepEqual(await validateData(fixture()), []));

test('duplicate identity and missing source are rejected', async () => {
  const input = fixture();
  input.benchmarks.benchmarks.push({ ...input.benchmarks.benchmarks[0] });
  input.results.results[0].sourceId = 'missing';
  const errors = await validateData(input);
  assert.ok(errors.some((item) => item.includes('duplicate demo')));
  assert.ok(errors.some((item) => item.includes('unknown source')));
});

test('ambiguous result without comparability or evidence fails closed', async () => {
  const input = fixture();
  input.results.results[0].comparability = 'maybe';
  input.results.results[0].sourceUrl = 'http://example.com';
  const errors = await validateData(input);
  assert.ok(errors.some((item) => item.includes('invalid comparability')));
  assert.ok(errors.some((item) => item.includes('must use https')));
});

test('aliases cannot create a second canonical identity', async () => {
  const input = fixture();
  input.benchmarks.benchmarks.push({ ...input.benchmarks.benchmarks[0], benchmarkId: 'other', canonicalName: 'Other', aliases: ['Demo'] });
  const errors = await validateData(input);
  assert.ok(errors.some((item) => item.includes('alias conflict')));
});

test('production registry stays above 200 and every catalog entry is commit-pinned', async () => {
  const registry = JSON.parse(await readFile(new URL('../data/benchmarks.json', import.meta.url), 'utf8'));
  assert.ok(registry.benchmarks.length >= 200);
  const imported = registry.benchmarks.filter((item) => item.registryOrigin?.catalogRole === 'implementation-index');
  assert.ok(imported.length >= 175);
  assert.ok(imported.every((item) => /^[a-f0-9]{40}$/.test(item.registryOrigin.upstreamCommit) && item.links.repo.startsWith('https://github.com/')));
});
