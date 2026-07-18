import { createHash } from 'node:crypto';
import { readJson, writeJson } from './lib.mjs';

const CATALOG = {
  catalogId: 'lm-evaluation-harness',
  owner: 'EleutherAI',
  repository: 'https://github.com/EleutherAI/lm-evaluation-harness',
  apiRepository: 'EleutherAI/lm-evaluation-harness',
  taskRoot: 'lm_eval/tasks',
  sourceId: 'lm-eval-catalog-snapshot'
};

const EXCLUDED_DIRECTORIES = new Set(['benchmarks', 'include', 'leaderboard', 'unitxt']);

const DISPLAY_NAMES = {
  aclue: 'ACLUE', acpbench: 'ACPBench', aexams: 'Arabic Exams', afrimgsm: 'AfriMGSM',
  afrimmlu: 'AfriMMLU', afrixnli: 'AfriXNLI', afrobench: 'AfroBench', agieval: 'AGIEval',
  aime: 'AIME', anli: 'ANLI', arc: 'ARC', arc_mt: 'ARC Multilingual', asdiv: 'ASDiv',
  babi: 'bAbI', babilong: 'BABILong', bbh: 'BIG-Bench Hard', bbq: 'BBQ', belebele: 'Belebele',
  bigbench: 'BIG-Bench', blimp: 'BLiMP', c4: 'C4', cabbq: 'CAbBQ', careqa: 'CareQA',
  ceval: 'C-Eval', chartqa: 'ChartQA', cmmlu: 'CMMLU', code_x_glue: 'CodeXGLUE',
  commonsense_qa: 'CommonsenseQA', coqa: 'CoQA', cruxeval: 'CRUXEval', csatqa: 'CSATQA',
  drop: 'DROP', egymmlu: 'EgyMMLU', eq_bench: 'EQ-Bench', fld: 'FLD',
  glianorex: 'GLiNERoREX', global_mmlu: 'Global MMLU', global_piqa: 'Global PIQA',
  glue: 'GLUE', gpqa: 'GPQA', gsm8k: 'GSM8K', gsm8k_platinum: 'GSM8K-Platinum',
  gsm_plus: 'GSM-Plus', headqa: 'HeadQA', hellaswag: 'HellaSwag', hrm8k: 'HRM8K',
  humaneval: 'HumanEval', humaneval_infilling: 'HumanEval Infilling', ifeval: 'IFEval',
  infinitebench: 'InfiniteBench', jfinqa: 'JFinQA', jsonschema_bench: 'JSONSchemaBench',
  kmmlu: 'KMMLU', kobest: 'KoBEST', kormedmcqa: 'KorMedMCQA', lambada: 'LAMBADA',
  legalbench: 'LegalBench', libra: 'LIBRA', lingoly: 'LingoLy', logiqa: 'LogiQA',
  logiqa2: 'LogiQA 2.0', longbench: 'LongBench', longbench2: 'LongBench v2', mathqa: 'MathQA',
  mbpp: 'MBPP', medmcqa: 'MedMCQA', medqa: 'MedQA', mgsm: 'MGSM', minerva_math: 'Minerva Math',
  mlqa: 'MLQA', mmlu: 'MMLU', mmlu_redux: 'MMLU-Redux', mmlusr: 'MMLU-SR', mmmu: 'MMMU',
  multiblimp: 'MultiBLiMP', mutual: 'MuTual', nq_open: 'Natural Questions Open',
  openbookqa: 'OpenBookQA', paloma: 'Paloma', paws_x: 'PAWS-X', piqa: 'PIQA',
  pubmedqa: 'PubMedQA', qasper: 'QASPER', race: 'RACE', ruler: 'RULER', sciq: 'SciQ',
  scrolls: 'SCROLLS', siqa: 'Social IQa', squadv2: 'SQuAD v2', storycloze: 'StoryCloze',
  super_glue: 'SuperGLUE', swag: 'SWAG', tmlu: 'TMLU', tmmluplus: 'TMMLU+',
  toxigen: 'ToxiGen', triviaqa: 'TriviaQA', truthfulqa: 'TruthfulQA', ulqa: 'ULQA',
  webqs: 'WebQuestions', wikitext: 'WikiText', winogender: 'WinoGender', winogrande: 'WinoGrande',
  wmdp: 'WMDP', wsc273: 'WSC273', xcopa: 'XCOPA', xnli: 'XNLI', xquad: 'XQuAD',
  xstorycloze: 'XStoryCloze', xwinograd: 'XWinograd'
};

const LANGUAGE_RULES = [
  [/afri|afro/, ['multilingual', 'af']], [/arab|egy|alghafa|aradice/, ['ar']],
  [/bangla/, ['bn']], [/basque|eus_|xnli_eu/, ['eu']], [/catalan/, ['ca']],
  [/ceval|cmmlu|zhoblimp/, ['zh']], [/darija/, ['ary']], [/french/, ['fr']],
  [/galician/, ['gl']], [/icelandic/, ['is']], [/indic|hindi/, ['multilingual', 'hi']],
  [/japanese|jfinqa/, ['ja']], [/kmmlu|kobest|kormed/, ['ko']], [/noreval/, ['no']],
  [/noticia/, ['es']], [/polemo/, ['pl']], [/portuguese/, ['pt']], [/serbian/, ['sr']],
  [/spanish|esbbq/, ['es']], [/tmlu|tmmlu|turkish|turblimp/, ['tr']],
  [/belebele|global_|lambada_multilingual|mgsm|mlqa|multiblimp|openai-mmmlu|paws-x|translation|truthfulqa-multi|wmt2016|xcopa|xnli|xquad|xstorycloze|xwinograd/, ['multilingual']]
];

function titleCaseTask(name) {
  if (DISPLAY_NAMES[name]) return DISPLAY_NAMES[name];
  return name.split(/[_-]+/).map((token) => {
    if (/^[a-z]\d+$/.test(token)) return token.toUpperCase();
    if (/^(qa|mmlu|gsm|bbh|glue|nli|nlp|mcq|lm|llm|mt|wsc|xglue)$/i.test(token)) return token.toUpperCase();
    return token ? token[0].toUpperCase() + token.slice(1) : token;
  }).join(' ');
}

function slug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function categoryFor(name) {
  if (/code|human|mbpp|crux|jsonschema/.test(name)) return 'Code';
  if (/math|gsm|aime|arithmetic|asdiv|hrm|mastermind|minerva|mgsm|reason|logic|fld/.test(name)) return 'Math & Reasoning';
  if (/toxic|bias|bbq|ethic|moral|discrim|crows|wmdp|winogender|truthful/.test(name)) return 'Safety & Bias';
  if (/long|infinite|scroll|ruler|libra|needle/.test(name)) return 'Long Context';
  if (/med|careqa|pubmed|mimic|prescription|meqsum/.test(name)) return 'Medicine';
  if (/translation|wmt|iwslt|flores|xnli|xquad|xstory|xwinograd|multilingual|global_|afri|arab|basque|bangla|catalan|darija|egy|french|galician|icelandic|indic|japanese|korean|kmmlu|kobest|noreval|portuguese|spanish|turkish|belebele|mgsm|mlqa|paws-x/.test(name)) return 'Multilingual';
  if (/cnn|summ|xsum|dialog|coqa|squad|qasper|narrative/.test(name)) return 'QA & Summarization';
  if (/common|piqa|siqa|hellaswag|winograd|storycloze|swag|openbook|sciq/.test(name)) return 'Commonsense';
  if (/c4|pile|wikitext|lambada|paloma/.test(name)) return 'Language Modeling';
  return 'Knowledge & Reasoning';
}

function languagesFor(name) {
  for (const [pattern, languages] of LANGUAGE_RULES) if (pattern.test(name)) return languages;
  return ['en'];
}

function metricFor(name) {
  if (/^(c4|pile|pile_10k|wikitext|lambada|lambada_cloze|paloma)$/.test(name)) {
    return { name: 'perplexity', unit: '', direction: 'lower', tiesAllowed: true };
  }
  return { name: 'upstream primary score', unit: '', direction: 'higher', tiesAllowed: true };
}

function typeFor(name) {
  if (/^(c4|pile|pile_10k|wikitext|common_voice|cnn_dailymail)$/.test(name)) return 'dataset';
  if (/^(bigbench|glue|super_glue|mmlu|leaderboard|japanese_leaderboard|arabic_leaderboard|spanish_bench|french_bench|basque_bench|portuguese_bench|catalan_bench|galician_bench)$/.test(name)) return 'suite';
  return 'benchmark';
}

async function githubJson(path) {
  const response = await fetch(`https://api.github.com/repos/${CATALOG.apiRepository}/${path}`, {
    headers: { accept: 'application/vnd.github+json', 'user-agent': 'ChinaAI-Benchmark-Registry/2.0' },
    signal: AbortSignal.timeout(30000)
  });
  if (!response.ok) throw new Error(`GitHub API ${path}: HTTP ${response.status}`);
  return response.json();
}

const benchmarkDoc = await readJson('data/benchmarks.json');
const sourceDoc = await readJson('data/sources.json');
const manifestDoc = await readJson('data/raw-manifest.json');
const curated = benchmarkDoc.benchmarks.filter((item) => item.registryOrigin?.catalogId !== CATALOG.catalogId);
const head = await githubJson('commits/main');
const commit = head.sha;
const contents = await githubJson(`contents/${CATALOG.taskRoot}?ref=${commit}`);
const tasks = contents
  .filter((item) => item.type === 'dir' && !EXCLUDED_DIRECTORIES.has(item.name))
  .map((item) => ({ name: item.name, path: item.path, url: item.html_url }))
  .sort((a, b) => a.name.localeCompare(b.name));

const claimedNames = new Map();
for (const item of curated) for (const name of [item.canonicalName, ...(item.aliases || [])]) claimedNames.set(String(name).trim().toLowerCase(), item.benchmarkId);
const claimedIds = new Set(curated.map((item) => item.benchmarkId));
const imported = [];
const skipped = [];
for (const task of tasks) {
  const benchmarkId = slug(task.name);
  const canonicalName = titleCaseTask(task.name);
  const conflictingId = claimedIds.has(benchmarkId);
  const conflictingName = claimedNames.get(canonicalName.toLowerCase());
  if (conflictingId || conflictingName) {
    skipped.push({ task: task.name, reason: conflictingId ? `id:${benchmarkId}` : `name:${conflictingName}` });
    continue;
  }
  const category = categoryFor(task.name);
  const modalities = category === 'Code' ? ['text', 'code'] : ['text'];
  const item = {
    benchmarkId,
    type: typeFor(task.name),
    canonicalName,
    aliases: task.name === canonicalName ? [] : [task.name],
    category,
    owner: 'Upstream benchmark authors; catalogued by EleutherAI',
    status: 'collecting',
    versions: ['version-pending-audit'],
    primaryMetric: metricFor(task.name),
    links: { homepage: task.url, repo: task.url },
    sourceIds: [CATALOG.sourceId],
    summary: `${canonicalName} 已由 EleutherAI LM Evaluation Harness 的任务目录核验收录；原始论文、精确版本、协议和可比成绩仍在逐项审核。`,
    languages: languagesFor(task.name),
    modalities,
    timeWindow: null,
    registryOrigin: {
      catalogId: CATALOG.catalogId,
      catalogRole: 'implementation-index',
      upstreamPath: task.path,
      upstreamCommit: commit,
      originalSourceStatus: 'pending-audit',
      auditedAt: '2026-07-18'
    }
  };
  imported.push(item);
  claimedIds.add(benchmarkId);
  claimedNames.set(canonicalName.toLowerCase(), benchmarkId);
}

const snapshotPayload = {
  schemaVersion: '1.0.0',
  catalogId: CATALOG.catalogId,
  repository: CATALOG.repository,
  commit,
  capturedAt: '2026-07-18T00:00:00Z',
  taskRoot: CATALOG.taskRoot,
  directoryCount: tasks.length,
  importedCount: imported.length,
  skipped,
  tasks
};
const snapshotHash = createHash('sha256').update(JSON.stringify(snapshotPayload)).digest('hex');
const source = {
  sourceId: CATALOG.sourceId,
  benchmarkIds: imported.map((item) => item.benchmarkId),
  name: `EleutherAI LM Evaluation Harness task catalog @ ${commit.slice(0, 12)}`,
  url: `${CATALOG.repository}/tree/${commit}/${CATALOG.taskRoot}`,
  type: 'independent',
  access: 'public',
  adapter: 'sync-registry-catalogs.mjs',
  licenseNote: 'Implementation-index evidence only. Original benchmark papers, datasets, licenses and protocols require a second-stage audit before ranking.'
};

benchmarkDoc.schemaVersion = '1.1.0';
benchmarkDoc.updatedAt = '2026-07-18T00:00:00Z';
benchmarkDoc.benchmarks = [...curated, ...imported].sort((a, b) => a.canonicalName.localeCompare(b.canonicalName));
sourceDoc.schemaVersion = '1.1.0';
sourceDoc.updatedAt = '2026-07-18T00:00:00Z';
sourceDoc.sources = [...sourceDoc.sources.filter((item) => item.sourceId !== CATALOG.sourceId), source].sort((a, b) => a.sourceId.localeCompare(b.sourceId));
manifestDoc.schemaVersion = '1.1.0';
manifestDoc.snapshots = [
  ...manifestDoc.snapshots.filter((item) => item.sourceId !== CATALOG.sourceId),
  { sourceId: CATALOG.sourceId, status: 'catalog_snapshot', retrievedAt: '2026-07-18T00:00:00Z', contentHash: `sha256:${snapshotHash}`, recordCount: imported.length, upstreamCommit: commit }
];

await writeJson('data/catalog-snapshots/lm-evaluation-harness.json', { ...snapshotPayload, contentHash: `sha256:${snapshotHash}` });
await writeJson('data/benchmarks.json', benchmarkDoc);
await writeJson('data/sources.json', sourceDoc);
await writeJson('data/raw-manifest.json', manifestDoc);
console.log(`Registry sync complete: ${curated.length} curated + ${imported.length} catalogued = ${benchmarkDoc.benchmarks.length}; ${skipped.length} duplicates skipped; commit ${commit.slice(0, 12)}.`);
