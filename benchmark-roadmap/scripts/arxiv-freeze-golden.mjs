import { readdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { ROOT, writeJson } from './lib.mjs';

const inputDirs = [];
let output = 'tests/fixtures/arxiv-pdf-golden.json';
for (let index = 2; index < process.argv.length; index += 1) {
  if (process.argv[index] === '--input') inputDirs.push(process.argv[++index]);
  else if (process.argv[index] === '--output') output = process.argv[++index];
  else throw new Error(`Unknown argument ${process.argv[index]}`);
}
if (!inputDirs.length) throw new Error('Provide at least one --input evidence directory');

const records = [];
for (const directory of inputDirs) {
  const absolute = resolve(ROOT, directory);
  for (const name of (await readdir(absolute)).filter((item) => item.endsWith('.json')).sort()) {
    const evidence = JSON.parse(await readFile(resolve(absolute, name), 'utf8'));
    records.push({
      paperId: evidence.paperId,
      pdfSha256: evidence.pdfSha256,
      pageCount: evidence.pageCount,
      textLayer: evidence.textLayer,
      candidatePages: evidence.candidatePages,
      security: evidence.security || { javascript: false, openAction: false, additionalActions: false, embeddedFiles: false }
    });
  }
}
const unique = [...new Map(records.map((item) => [item.paperId, item])).values()].sort((a, b) => a.paperId.localeCompare(b.paperId));
await writeJson(output, { schemaVersion: '1.0.0', frozenAt: '2026-07-18T00:00:00Z', cases: unique, policy: { pdfsCommitted: false, fullTextCommitted: false, purpose: 'Regression baseline for page count, text-layer detection, evidence-page recall and PDF security flags.' } });
console.log(`Frozen ${unique.length} sanitized PDF golden case(s) to ${output}.`);
