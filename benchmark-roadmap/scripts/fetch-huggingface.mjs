const targets = [
  'https://huggingface.co/api/datasets/gaia-benchmark/GAIA',
  'https://huggingface.co/api/datasets/Idavidrein/gpqa',
  'https://huggingface.co/api/datasets/OpenEvals/leaderboard-data'
];
let ok = 0;
for (const url of targets) {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    await response.json();
    ok += 1;
  } catch (error) { console.error(`Hugging Face source warning: ${url} (${error.message})`); }
}
console.log(`Hugging Face adapter probe: ${ok}/${targets.length} public datasets reachable. No restricted test data was requested.`);
if (!ok) process.exitCode = 2;
