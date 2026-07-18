import { spawnSync } from 'node:child_process';

const adapters = ['fetch-swebench.mjs', 'fetch-huggingface.mjs', 'fetch-epoch.mjs'];
const failures = [];
for (const adapter of adapters) {
  const result = spawnSync(process.execPath, [`scripts/${adapter}`, '--dry-run'], { stdio: 'inherit' });
  if (result.status !== 0) failures.push(adapter);
}
console.log(`Source audit complete: ${adapters.length - failures.length}/${adapters.length} adapters healthy. Public data remains on the last validated snapshot.`);
if (failures.length) process.exitCode = 2;
