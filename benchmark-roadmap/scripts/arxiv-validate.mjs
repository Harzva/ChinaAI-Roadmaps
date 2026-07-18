import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { ROOT, readJson } from './lib.mjs';

function valueType(value) {
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'null';
  if (Number.isInteger(value)) return 'integer';
  return typeof value;
}

function matchesType(value, expected) {
  const types = Array.isArray(expected) ? expected : [expected];
  const actual = valueType(value);
  return types.some((type) => type === actual || (type === 'number' && ['number', 'integer'].includes(actual)) || (type === 'object' && actual === 'object'));
}

function validateSchema(value, schema, path = '$') {
  const errors = [];
  if (schema.type && !matchesType(value, schema.type)) return [`${path}: expected ${JSON.stringify(schema.type)}, got ${valueType(value)}`];
  if (schema.enum && !schema.enum.includes(value)) errors.push(`${path}: value is not in enum`);
  if (typeof value === 'string') {
    if (schema.minLength && value.length < schema.minLength) errors.push(`${path}: shorter than minLength`);
    if (schema.pattern && !new RegExp(schema.pattern).test(value)) errors.push(`${path}: does not match ${schema.pattern}`);
    if (schema.format === 'date-time' && Number.isNaN(Date.parse(value))) errors.push(`${path}: invalid date-time`);
  }
  if (typeof value === 'number') {
    if (schema.minimum !== undefined && value < schema.minimum) errors.push(`${path}: below minimum`);
    if (schema.maximum !== undefined && value > schema.maximum) errors.push(`${path}: above maximum`);
  }
  if (Array.isArray(value)) {
    if (schema.minItems && value.length < schema.minItems) errors.push(`${path}: fewer than minItems`);
    if (schema.uniqueItems && new Set(value.map((item) => JSON.stringify(item))).size !== value.length) errors.push(`${path}: duplicate array items`);
    if (schema.items) value.forEach((item, index) => errors.push(...validateSchema(item, schema.items, `${path}[${index}]`)));
  }
  if (value && typeof value === 'object' && !Array.isArray(value)) {
    for (const key of schema.required || []) if (!(key in value)) errors.push(`${path}: missing ${key}`);
    for (const [key, item] of Object.entries(value)) {
      if (schema.properties?.[key]) errors.push(...validateSchema(item, schema.properties[key], `${path}.${key}`));
      else if (schema.additionalProperties === false) errors.push(`${path}: unexpected property ${key}`);
    }
  }
  return errors;
}

function unique(items, key, label, errors) {
  const seen = new Set();
  for (const item of items) {
    if (seen.has(item[key])) errors.push(`${label}: duplicate ${item[key]}`);
    seen.add(item[key]);
  }
  return seen;
}

export async function validateArxivData(overrides = {}) {
  const papersDoc = overrides.papers || await readJson('data/arxiv/papers.json');
  const candidatesDoc = overrides.candidates || await readJson('data/arxiv/candidates.json');
  const claimsDoc = overrides.claims || await readJson('data/arxiv/claims.json');
  const reviewsDoc = overrides.reviews || await readJson('data/arxiv/reviews.json');
  const benchmarkDoc = overrides.benchmarks || await readJson('data/benchmarks.json');
  const schemas = {
    papers: await readJson('schema/arxiv-paper.schema.json'),
    candidates: await readJson('schema/benchmark-candidate.schema.json'),
    claims: await readJson('schema/result-claim.schema.json'),
    decisions: await readJson('schema/review-decision.schema.json')
  };
  const errors = [];
  for (const [key, items] of Object.entries({ papers: papersDoc.papers, candidates: candidatesDoc.candidates, claims: claimsDoc.claims, decisions: reviewsDoc.decisions })) {
    items.forEach((item, index) => errors.push(...validateSchema(item, schemas[key], `${key}[${index}]`)));
  }
  const paperIds = unique(papersDoc.papers, 'paperId', 'paper', errors);
  const candidateIds = unique(candidatesDoc.candidates, 'candidateId', 'candidate', errors);
  const claimIds = unique(claimsDoc.claims, 'claimId', 'claim', errors);
  unique(reviewsDoc.decisions, 'decisionId', 'decision', errors);
  const benchmarks = new Map(benchmarkDoc.benchmarks.map((item) => [item.benchmarkId, item]));
  const paperById = new Map(papersDoc.papers.map((item) => [item.paperId, item]));
  const candidateById = new Map(candidatesDoc.candidates.map((item) => [item.candidateId, item]));

  const ledgerLines = (await readFile(resolve(ROOT, 'data/arxiv/ledger.jsonl'), 'utf8')).split('\n').filter(Boolean);
  const ledger = ledgerLines.map((line, index) => { try { return JSON.parse(line); } catch { errors.push(`ledger line ${index + 1}: invalid JSON`); return null; } }).filter(Boolean);
  const ledgerKeys = new Set(ledger.map((item) => `${item.arxivId}${item.version}`));
  for (const paper of papersDoc.papers) if (!ledgerKeys.has(`${paper.arxivId}${paper.version}`)) errors.push(`${paper.paperId}: missing permanent ledger record`);

  for (const candidate of candidatesDoc.candidates) {
    if (!paperIds.has(candidate.paperId)) errors.push(`${candidate.candidateId}: unknown paper`);
    if (candidate.status === 'accepted') {
      if (!candidate.registryMatch.matched || !benchmarks.has(candidate.registryMatch.matchedId)) errors.push(`${candidate.candidateId}: accepted identity is not in Registry collecting`);
      else if (benchmarks.get(candidate.registryMatch.matchedId).status !== 'collecting') errors.push(`${candidate.candidateId}: arXiv promotion must enter collecting`);
    }
  }
  for (const claim of claimsDoc.claims) {
    if (!paperIds.has(claim.paperId)) errors.push(`${claim.claimId}: unknown paper`);
    if (!candidateIds.has(claim.candidateId)) errors.push(`${claim.claimId}: unknown candidate`);
    const paper = paperById.get(claim.paperId);
    if (paper && claim.evidence.pdfSha256 !== paper.pdfSha256) errors.push(`${claim.claimId}: evidence PDF hash differs from paper record`);
    if (paper && claim.evidence.pdfPage > paper.pageCount) errors.push(`${claim.claimId}: evidence page exceeds PDF page count`);
    if (claim.sourceType === 'paper_reported' && claim.rankingEligible) errors.push(`${claim.claimId}: paper-reported claim cannot directly rank`);
    if (claim.status === 'ocr_only' && claim.rankingEligible) errors.push(`${claim.claimId}: OCR-only claim cannot rank`);
  }
  for (const decision of reviewsDoc.decisions) {
    const known = decision.targetType === 'paper' ? paperIds.has(decision.targetId) : decision.targetType === 'candidate' ? candidateIds.has(decision.targetId) : claimIds.has(decision.targetId);
    if (!known) errors.push(`${decision.decisionId}: unknown review target`);
  }
  const publicText = JSON.stringify({ papers: papersDoc, candidates: candidatesDoc, claims: claimsDoc, reviews: reviewsDoc });
  for (const pattern of [/\/Users\//, /\/Volumes\//, /(?:token|cookie|password)\s*[:=]\s*["'][^"']+/i]) if (pattern.test(publicText)) errors.push(`arXiv data: public denylist match ${pattern}`);
  const vtm40 = claimsDoc.claims.find((item) => item.claimId === 'claim-vtm-hm3d-v01-40-sr');
  const vtm500 = claimsDoc.claims.find((item) => item.claimId === 'claim-vtm-hm3d-v01-500-sr');
  if (vtm40 && vtm500 && vtm40.runConfig.raw.steps === vtm500.runConfig.raw.steps) errors.push('golden: 40-step and 500-step protocols collapsed');
  return errors;
}

if (process.argv[1] === new URL(import.meta.url).pathname) {
  const errors = await validateArxivData();
  if (errors.length) {
    console.error(errors.map((item) => `- ${item}`).join('\n'));
    process.exitCode = 1;
  } else console.log('arXiv staging validation passed: schemas, ledger, evidence coordinates, Registry promotion and ranking isolation are consistent.');
}
