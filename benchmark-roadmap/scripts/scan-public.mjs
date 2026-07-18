import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { listLeaderboardFiles, PUBLIC } from './lib.mjs';
import { PRIVATE_DENYLIST, PUBLIC_RESULT_FIELDS } from './public-fields.mjs';

const files = ['catalog.json','hot-benchmarks.json','models.json','snapshot.json','maintenance.json', ...(await listLeaderboardFiles()).map((name) => `leaderboards/${name}`)];
const errors = [];
for (const file of files) {
  const path = resolve(PUBLIC, file);
  const text = await readFile(path, 'utf8');
  for (const pattern of PRIVATE_DENYLIST) if (pattern.test(text)) errors.push(`${file}: denylist match ${pattern}`);
  if (file.startsWith('leaderboards/')) {
    const data = JSON.parse(text);
    for (const result of data.all) for (const key of Object.keys(result)) if (!PUBLIC_RESULT_FIELDS.has(key)) errors.push(`${file}: result field ${key} is not allowlisted`);
  }
}
if (errors.length) {
  console.error(errors.map((item) => `- ${item}`).join('\n'));
  process.exitCode = 1;
} else console.log(`Public-surface scan passed for ${files.length} generated files.`);
