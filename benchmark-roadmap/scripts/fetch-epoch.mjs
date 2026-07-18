const targets = ['https://epoch.ai/benchmarks', 'https://metr.org/time-horizons/'];
let ok = 0;
for (const url of targets) {
  try {
    const response = await fetch(url, { method: 'HEAD', redirect: 'follow', signal: AbortSignal.timeout(15000) });
    if (response.status >= 400 && response.status !== 405) throw new Error(`HTTP ${response.status}`);
    ok += 1;
  } catch (error) { console.error(`Independent source warning: ${url} (${error.message})`); }
}
console.log(`Epoch/METR adapter probe: ${ok}/${targets.length} sources reachable; no private endpoint was used.`);
if (!ok) process.exitCode = 2;
