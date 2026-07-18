import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { ROOT, readJson, writeJson } from './lib.mjs';
import { trendScore } from './arxiv-lib.mjs';

const generatedAt = process.env.BENCHMARK_BUILD_TIME || '2026-07-18T00:00:00Z';
const config = await readJson('data/arxiv/config.json');
const papers = (await readJson('data/arxiv/papers.json')).papers;
const candidates = (await readJson('data/arxiv/candidates.json')).candidates;
const claims = (await readJson('data/arxiv/claims.json')).claims;
const reviews = (await readJson('data/arxiv/reviews.json')).decisions;
const signalDoc = await readJson('data/arxiv/adoption-signals.json');
const paperById = new Map(papers.map((item) => [item.paperId, item]));
const reviewByTarget = new Map(reviews.map((item) => [item.targetId, item]));
const asOf = new Date(`${signalDoc.asOf}T00:00:00Z`);

const trendByCandidate = new Map(signalDoc.signals.map((signal) => {
  const score = trendScore(signal, config.trendWeights);
  const ageDays = Math.max(0, Math.floor((asOf - new Date(`${signal.firstPublished}T00:00:00Z`)) / 86400000));
  const independentSignals = [signal.repository, signal.leaderboard, signal.independentResults > 0, signal.harness, signal.adoptionPapers > 1].filter(Boolean).length;
  const stage = score >= config.hotThreshold && independentSignals >= 2 ? 'Hot' : ageDays <= config.newWindowDays ? 'New' : score >= 40 || signal.adoptionPapers > 1 ? 'Rising' : 'Watch';
  return [signal.candidateId, { ...signal, score, ageDays, independentSignals, stage }];
}));

const publicCandidates = candidates.map((candidate) => {
  const paper = paperById.get(candidate.paperId);
  return {
    ...candidate,
    paper: { paperId: paper.paperId, arxivId: paper.arxivId, version: paper.version, title: paper.title, submittedAt: paper.submittedAt, arxivUrl: paper.arxivUrl, pdfUrl: paper.pdfUrl, pdfSha256: paper.pdfSha256, pageCount: paper.pageCount, summary: paper.summary },
    claims: claims.filter((item) => item.candidateId === candidate.candidateId),
    review: reviewByTarget.get(candidate.candidateId) || null,
    trend: trendByCandidate.get(candidate.candidateId) || { stage: 'Watch', score: 0, independentSignals: 0 }
  };
}).sort((a, b) => ['Hot', 'Rising', 'New', 'Watch'].indexOf(a.trend.stage) - ['Hot', 'Rising', 'New', 'Watch'].indexOf(b.trend.stage) || b.trend.score - a.trend.score || a.entityName.localeCompare(b.entityName));

const stats = {
  papers: papers.length,
  candidates: candidates.length,
  claims: claims.length,
  acceptedIdentities: candidates.filter((item) => item.status === 'accepted').length,
  humanReviewed: reviews.filter((item) => item.reviewerKind === 'human').length,
  agentReviewed: reviews.filter((item) => item.reviewerKind === 'agent').length,
  rankingEligibleClaims: claims.filter((item) => item.rankingEligible).length,
  memoryCandidates: candidates.filter((item) => item.watchlists.includes('memory')).length,
  new: publicCandidates.filter((item) => item.trend.stage === 'New').length,
  rising: publicCandidates.filter((item) => item.trend.stage === 'Rising').length,
  hot: publicCandidates.filter((item) => item.trend.stage === 'Hot').length
};

const dashboard = {
  schemaVersion: '1.0.0', generatedAt, asOf: signalDoc.asOf, stats,
  policy: { autoPromote: false, paperReportedAutoRank: false, ocrAutoRank: false, humanReviewRequiredForTopK: true, newWindowDays: config.newWindowDays, risingWindowDays: config.risingWindowDays, hotThreshold: config.hotThreshold },
  candidates: publicCandidates
};
await writeJson('data/public/arxiv-discovery.json', dashboard);

const daily = {
  schemaVersion: '1.0.0', date: signalDoc.asOf, generatedAt,
  counts: stats,
  newCandidates: publicCandidates.filter((item) => item.trend.stage === 'New').map((item) => ({ candidateId: item.candidateId, entityName: item.entityName, entityKind: item.entityKind, paper: item.paper.arxivUrl, claimCount: item.claims.length, rankingEligible: false })),
  memoryWatch: publicCandidates.filter((item) => item.watchlists.includes('memory')).map((item) => ({ candidateId: item.candidateId, entityName: item.entityName, paper: item.paper.arxivUrl })),
  reviewQueue: publicCandidates.filter((item) => item.status !== 'accepted').map((item) => ({ candidateId: item.candidateId, reason: item.statusHistory.at(-1)?.note || item.status }))
};
await writeJson('data/public/arxiv-daily.json', daily);

const weekly = {
  schemaVersion: '1.0.0', weekEnding: signalDoc.asOf, generatedAt,
  counts: stats,
  emerging: publicCandidates.filter((item) => ['Hot', 'Rising', 'New'].includes(item.trend.stage)).map((item) => ({ candidateId: item.candidateId, entityName: item.entityName, stage: item.trend.stage, score: item.trend.score, adoptionPapers: item.trend.adoptionPapers, modelCount: item.trend.modelCount })),
  caveat: 'New/Rising/Hot are separate evidence states. New paper claims never become Top-K without source and comparability review.'
};
await writeJson('data/public/arxiv-weekly.json', weekly);

const angleByCandidate = {
  'candidate-uesf-bench': ['先找到人，再一直跟住：具身 Agent 新基准难在哪里', '搜索和跟随为什么不能再拆成两个榜单'],
  'candidate-real-bench': ['没有上帝视角的机器人 Agent，真实部署要过哪三关', 'REAL-Bench 的 241 项任务如何检验探索、操作与意图澄清'],
  'candidate-cross-episode-object-goal-navigation': ['Agent 每次进房间都失忆？跨 episode memory 提升了多少', '为什么一篇论文的新 protocol 不能直接算成新 benchmark'],
  'candidate-saferelbench': ['机器人完成任务就安全吗？过程级空间风险如何评测', '对象识别正确，动作关系仍可能出错'],
  'candidate-visualprobe': ['视觉 Agent 不是看得越久越好：4-turn 预算下发生了什么', '旧 benchmark 在新论文里出现时，怎样回溯真正来源']
};
const contentCards = publicCandidates.map((item) => ({
  cardId: `content-${item.candidateId.replace(/^candidate-/, '')}`,
  candidateId: item.candidateId,
  title: item.entityName,
  status: item.status === 'accepted' && item.claims.length ? 'ready_for_draft' : 'source_audit',
  platforms: ['Zhihu', 'WeChat'],
  angles: angleByCandidate[item.candidateId] || [`${item.entityName}：新论文里的评测证据与局限`],
  evidence: item.claims.slice(0, 4).map((claim) => ({ claimId: claim.claimId, system: claim.system, metric: claim.metric, page: claim.evidence.pdfPage, table: claim.evidence.table })),
  sources: [{ sourceId: item.paper.paperId, url: item.paper.arxivUrl, version: item.paper.version }],
  editorialRules: ['区分作者报告与独立复现', '所有数字回链到 page/table', '不得把方法名自动写成 benchmark']
}));
await writeJson('data/public/arxiv-content-cards.json', { schemaVersion: '1.0.0', generatedAt, cards: contentCards });

const markdown = ['# arXiv Benchmark 内容素材包', '', `> 日期：${signalDoc.asOf} · ${stats.papers} 篇论文 · ${stats.candidates} 个候选 · ${stats.claims} 条成绩 claim`, '', '所有数字均为论文作者报告，未自动进入 Top-K。'];
for (const card of contentCards) {
  markdown.push('', `## ${card.title}`, '', ...card.angles.map((angle) => `- 选题：${angle}`), `- 状态：${card.status}`, `- 来源：${card.sources[0].url}`, ...card.evidence.map((evidence) => `- 证据：${evidence.system} · ${evidence.metric.name} ${evidence.metric.value}${evidence.metric.unit} · PDF p.${evidence.page} ${evidence.table}`));
}
await writeFile(resolve(ROOT, 'data/public/arxiv-content-pack.md'), `${markdown.join('\n')}\n`, 'utf8');
console.log(`Built arXiv discovery dashboard: ${stats.new} New, ${stats.rising} Rising, ${stats.hot} Hot, ${stats.claims} isolated claim(s).`);
