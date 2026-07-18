import { spawnSync } from 'node:child_process';

const commands = [
  ['node', ['scripts/validate-data.mjs']],
  ['node', ['scripts/build-leaderboards.mjs']],
  ['node', ['--test', 'tests/ranking.test.mjs', 'tests/validation.test.mjs', 'tests/public-surface.test.mjs']],
  ['node', ['scripts/check-links.mjs']],
  ['node', ['scripts/scan-public.mjs']]
];
for (const [command, args] of commands) {
  const result = spawnSync(command, args, { stdio: 'inherit' });
  if (result.status !== 0) process.exit(result.status || 1);
}
console.log('Release gates passed: schema, deterministic build, golden evals, links and public-surface safety.');
