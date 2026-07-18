import { readJson } from './lib.mjs';

const doc = await readJson('data/popularity-signals.json');
const rows = doc.signals.map((item) => ({
  benchmarkId: item.benchmarkId,
  score: item.activeLeaderboard + item.modelAdoption + item.communityImpact + item.freshness + item.reproducibility,
  independentSignals: item.independentSignalCount,
  hot: item.activeLeaderboard + item.modelAdoption + item.communityImpact + item.freshness + item.reproducibility >= doc.threshold && item.independentSignalCount >= 2
})).sort((a, b) => b.score - a.score);
console.table(rows);
