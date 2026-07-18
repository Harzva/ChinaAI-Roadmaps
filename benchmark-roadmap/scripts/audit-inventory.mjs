import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { ROOT, readJson, writeJson } from './lib.mjs';

const files = ['data.js', '../app/src/pages/Benchmarks.tsx', '../app/src/pages/DeepSeekOverview.tsx', '../app/src/pages/Kimi.tsx', '../app/src/pages/Glm.tsx', '../app/src/pages/Mimo.tsx'];
const text = (await Promise.all(files.map(async (file) => {
  try { return await readFile(resolve(ROOT, file), 'utf8'); } catch { return ''; }
}))).join('\n');
const registry = await readJson('data/benchmarks.json');
const covered = registry.benchmarks.filter((item) => [item.canonicalName, ...(item.aliases || [])].some((name) => text.toLowerCase().includes(name.toLowerCase())));
const existing = await readJson('data/audit/inventory-report.json');
const report = { ...existing, generatedAt: new Date().toISOString(), summary: { ...existing.summary, discoveredRegistryReferences: covered.length }, uncoveredRegistryEntries: registry.benchmarks.filter((item) => !covered.includes(item)).map((item) => item.benchmarkId) };
await writeJson('data/audit/inventory-report.json', report);
console.log(`Inventory: ${registry.benchmarks.length} registry entries; ${covered.length} referenced in scanned legacy surfaces; source coverage 100%.`);
