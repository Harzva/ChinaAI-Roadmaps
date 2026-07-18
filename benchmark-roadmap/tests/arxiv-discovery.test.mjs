import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { classifyPaper } from '../scripts/arxiv-lib.mjs';
import { validateArxivData } from '../scripts/arxiv-validate.mjs';

const load = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), 'utf8'));

test('arXiv staging schemas, ledger, cross-references and ranking isolation validate', async () => {
  assert.deepEqual(await validateArxivData(), []);
});

test('golden identity classification distinguishes introduced benchmark, protocol and used benchmark', async () => {
  const papers = (await load('../data/arxiv/papers.json')).papers;
  const registry = (await load('../data/benchmarks.json')).benchmarks;
  const golden = (await load('./fixtures/arxiv-golden.json')).identityCases;
  for (const expected of golden) {
    const paper = papers.find((item) => item.paperId === expected.paperId);
    const actual = classifyPaper(paper, registry);
    assert.ok(actual, expected.paperId);
    assert.equal(actual.entityName, expected.entityName);
    assert.equal(actual.entityKind, expected.entityKind);
    assert.equal(actual.relation, expected.relation);
  }
});

test('20+ golden identity and claim cases preserve PDF page/table values', async () => {
  const golden = await load('./fixtures/arxiv-golden.json');
  const claims = (await load('../data/arxiv/claims.json')).claims;
  assert.ok(golden.identityCases.length + golden.claimCases.length >= 20);
  for (const expected of golden.claimCases) {
    const claim = claims.find((item) => item.claimId === expected.claimId);
    assert.ok(claim, expected.claimId);
    assert.equal(claim.metric.value, expected.value);
    assert.equal(claim.evidence.pdfPage, expected.page);
    assert.equal(claim.evidence.table, expected.table);
  }
});

test('20 real PDF golden cases freeze text-layer, page recall and security baselines', async () => {
  const golden = await load('./fixtures/arxiv-pdf-golden.json');
  assert.equal(golden.cases.length, 20);
  assert.ok(golden.cases.every((item) => /^sha256:[a-f0-9]{64}$/.test(item.pdfSha256)));
  assert.ok(golden.cases.every((item) => item.pageCount > 0 && item.textLayer === 'usable'));
  assert.ok(golden.cases.filter((item) => item.candidatePages.length > 0).length >= 19);
  assert.equal(golden.cases.find((item) => item.paperId === 'arxiv-2607-08705-v1').candidatePages.length, 0, 'a benchmark paper without result tables must remain a review-queue case');
  assert.ok(golden.cases.every((item) => item.security.javascript === false));
  assert.doesNotMatch(JSON.stringify(golden), /\/Users\/|\/Volumes\//);
});

test('paper-reported and OCR-only claims fail closed for Top-K', async () => {
  const claims = (await load('../data/arxiv/claims.json')).claims;
  assert.ok(claims.length >= 18);
  assert.ok(claims.every((item) => item.sourceType !== 'paper_reported' || item.rankingEligible === false));
  assert.ok(claims.every((item) => item.status !== 'ocr_only' || item.rankingEligible === false));
});

test('40-step and 500-step memory results remain separate evidence groups', async () => {
  const claims = (await load('../data/arxiv/claims.json')).claims;
  const forty = claims.find((item) => item.claimId === 'claim-vtm-hm3d-v01-40-sr');
  const fiveHundred = claims.find((item) => item.claimId === 'claim-vtm-hm3d-v01-500-sr');
  assert.equal(forty.runConfig.raw.steps, 40);
  assert.equal(fiveHundred.runConfig.raw.steps, 500);
  assert.equal(fiveHundred.comparability, 'not_comparable');
});

test('public discovery exposes New/Rising separately and no ranking-eligible paper claim', async () => {
  const dashboard = await load('../data/public/arxiv-discovery.json');
  const content = await load('../data/public/arxiv-content-cards.json');
  assert.equal(dashboard.stats.new, 4);
  assert.equal(dashboard.stats.rising, 1);
  assert.equal(dashboard.stats.rankingEligibleClaims, 0);
  assert.ok(dashboard.candidates.some((item) => item.entityKind === 'protocol' && item.watchlists.includes('memory')));
  assert.equal(content.cards.length, dashboard.stats.candidates);
  assert.ok(content.cards.every((item) => item.sources[0].url.startsWith('https://arxiv.org/abs/')));
});
