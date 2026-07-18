import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';

test('generated catalog has a leaderboard for every registry entry', async () => {
  const registry = JSON.parse(await readFile(new URL('../data/benchmarks.json', import.meta.url), 'utf8'));
  const catalog = JSON.parse(await readFile(new URL('../data/public/catalog.json', import.meta.url), 'utf8'));
  assert.equal(catalog.benchmarks.length, registry.benchmarks.length);
  assert.ok(catalog.benchmarks.every((item) => item.leaderboard && item.leaderboard.group));
  assert.ok(catalog.benchmarks.length >= 200);
  assert.ok(catalog.benchmarks.some((item) => item.evidenceStage === 'implementation_index'));
});

test('every default result links to evidence and carries a run configuration', async () => {
  const terminal = JSON.parse(await readFile(new URL('../data/public/leaderboards/terminal-bench-2-1.json', import.meta.url), 'utf8'));
  assert.ok(terminal.top5.length > 0);
  assert.ok(terminal.top5.every((item) => item.source.url.startsWith('https://') && item.runConfig && item.system.harness));
});

test('hot summaries, SOTA history and maintenance panel data are generated', async () => {
  const hot = JSON.parse(await readFile(new URL('../data/public/hot-benchmarks.json', import.meta.url), 'utf8'));
  const swe = JSON.parse(await readFile(new URL('../data/public/leaderboards/swe-bench-verified.json', import.meta.url), 'utf8'));
  const maintenance = JSON.parse(await readFile(new URL('../data/public/maintenance.json', import.meta.url), 'utf8'));
  assert.ok(hot.benchmarks.some((item) => item.leaderboard.top3.length === 3));
  assert.ok(swe.sotaTimeline.length > 0);
  assert.ok(maintenance.sources.total > 0 && maintenance.queue.needsSource >= 0);
});

test('leaderboard, map bridge and no-JavaScript notice remain present', async () => {
  const index = await readFile(new URL('../index.html', import.meta.url), 'utf8');
  const map = await readFile(new URL('../map.html', import.meta.url), 'utf8');
  const discovery = await readFile(new URL('../discover.html', import.meta.url), 'utf8');
  const app = await readFile(new URL('../leaderboard.js', import.meta.url), 'utf8');
  assert.match(index, /<noscript>/);
  assert.match(index, /maintenance-panel/);
  assert.match(index, /id="load-more"/);
  assert.match(app, /data\/public\/maintenance\.json/);
  assert.match(map, /data\/public\/catalog\.json/);
  assert.match(index, /discover\.html/);
  assert.match(discovery, /id="review-queue"/);
  assert.match(discovery, /data\/public\/arxiv-discovery\.json/);
});
