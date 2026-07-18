import { createHash } from 'node:crypto';
import { writeJson } from './lib.mjs';

const url = 'https://raw.githubusercontent.com/SWE-bench/swe-bench.github.io/master/data/leaderboards.json';
try {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const text = await response.text();
  const data = JSON.parse(text);
  const verified = data.leaderboards.find((item) => item.name === 'Verified');
  const snapshot = { sourceId: 'swebench-official-data', retrievedAt: new Date().toISOString(), contentHash: `sha256:${createHash('sha256').update(text).digest('hex')}`, rows: verified.results.map(({ name, resolved, date, cost, folder }) => ({ name, resolved, date, cost, folder })) };
  if (!process.argv.includes('--dry-run')) await writeJson('data/raw/swebench-verified.json', snapshot);
  console.log(`SWE-bench adapter: ${snapshot.rows.length} Verified rows${process.argv.includes('--dry-run') ? ' (dry run)' : ''}.`);
} catch (error) {
  console.error(`SWE-bench adapter failed safely: ${error.message}. Existing validated public data was not changed.`);
  process.exitCode = 2;
}
