import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { comparabilityKey, eligible, rankResults } from '../scripts/lib.mjs';

const golden = JSON.parse(await readFile(new URL('./fixtures/golden-ranking.json', import.meta.url), 'utf8'));

test('golden ranking is stable and preserves ties', () => {
  const ranked = rankResults(golden.inputs, golden.direction).map(({ resultId, rank }) => ({ resultId, rank }));
  assert.deepEqual(ranked, golden.expected);
});

test('lower-is-better metrics sort ascending', () => {
  const ranked = rankResults([{ systemId: 'slow', score: 4, evaluationDate: '2026-01-01' }, { systemId: 'fast', score: 2, evaluationDate: '2026-01-01' }], 'lower');
  assert.equal(ranked[0].systemId, 'fast');
});

test('versions, subsets, metrics and protocols are never silently merged', () => {
  const base = { benchmarkId: 'terminal', version: '2.1', subset: 'full', metric: 'success', protocol: 'harbor' };
  assert.notEqual(comparabilityKey(base), comparabilityKey({ ...base, version: '2.0' }));
  assert.notEqual(comparabilityKey(base), comparabilityKey({ ...base, protocol: 'custom' }));
});

test('default Top-K excludes vendor, unverified and partial reports', () => {
  const base = { sourceUrl: 'https://example.com', sourceType: 'official', comparability: 'comparable' };
  assert.equal(eligible(base), true);
  assert.equal(eligible({ ...base, sourceType: 'vendor_reported' }), false);
  assert.equal(eligible({ ...base, comparability: 'partially_comparable' }), false);
  assert.equal(eligible({ ...base, sourceUrl: '' }), false);
});
