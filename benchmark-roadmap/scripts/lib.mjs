import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const DATA = resolve(ROOT, 'data');
export const PUBLIC = resolve(DATA, 'public');

export async function readJson(path) {
  return JSON.parse(await readFile(resolve(ROOT, path), 'utf8'));
}

export async function writeJson(path, value) {
  const target = resolve(ROOT, path);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, `${JSON.stringify(value, null, 2)}\n`, 'utf8');
}

export function comparabilityKey(result) {
  return [result.benchmarkId, result.version, result.subset, result.metric, result.protocol].join('::');
}

export function eligible(result, allowedSources = ['official', 'independent']) {
  return result.comparability === 'comparable' && allowedSources.includes(result.sourceType) && /^https:\/\//.test(result.sourceUrl);
}

export function rankResults(results, direction = 'higher') {
  const factor = direction === 'lower' ? 1 : -1;
  const sorted = [...results].sort((a, b) => {
    const scoreOrder = factor * (a.score - b.score);
    if (scoreOrder) return scoreOrder;
    const dateOrder = String(b.evaluationDate).localeCompare(String(a.evaluationDate));
    if (dateOrder) return dateOrder;
    return a.systemId.localeCompare(b.systemId);
  });
  let lastScore = null;
  let rank = 0;
  return sorted.map((item, index) => {
    if (lastScore === null || item.score !== lastScore) rank = index + 1;
    lastScore = item.score;
    return { ...item, rank };
  });
}

export async function listLeaderboardFiles() {
  try {
    return (await readdir(resolve(PUBLIC, 'leaderboards'))).filter((name) => name.endsWith('.json')).sort();
  } catch {
    return [];
  }
}
