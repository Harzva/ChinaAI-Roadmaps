const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));
const formatScore = (result, unit = '') => `${Number(result.score).toFixed(Number.isInteger(result.score) ? 0 : 1)}${unit === '%' ? '%' : ''}${result.uncertainty ? ` ±${result.uncertainty}` : ''}`;
const state = { catalog: null, hot: null, models: null, snapshot: null, maintenance: null, boards: new Map(), selectedSystems: new Set(), visibleLimit: 50 };

async function getJson(path) {
  const response = await fetch(path, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response.json();
}

async function getBoard(benchmarkId) {
  if (!state.boards.has(benchmarkId)) state.boards.set(benchmarkId, await getJson(`data/public/leaderboards/${encodeURIComponent(benchmarkId)}.json`));
  return state.boards.get(benchmarkId);
}

function renderSnapshot() {
  const { counts } = state.snapshot;
  $('#snapshot-state').textContent = 'VALIDATED';
  $('#snapshot-stats').innerHTML = `<div><strong>${counts.benchmarks}</strong><span>registry</span></div><div><strong>${counts.canonicalSourceEntries}</strong><span>canonical source</span></div><div><strong>${counts.rankedBenchmarks}</strong><span>ranked boards</span></div><div><strong>${counts.qualifiedResults}</strong><span>qualified runs</span></div>`;
}

function signalBars(item) {
  const entries = [['activeLeaderboard',35],['modelAdoption',25],['communityImpact',15],['freshness',15],['reproducibility',10]];
  return entries.map(([key,max]) => `<i style="width:${(item[key] / max) * 20}%" title="${escapeHtml(key)} ${item[key]}/${max}"></i>`).join('');
}

function renderHot() {
  $('#hot-grid').innerHTML = state.hot.benchmarks.map((item) => {
    const benchmark = item.benchmark;
    const top3 = item.leaderboard?.top3 || [];
    return `<article class="hot-card"><div class="hot-card-top"><div><span class="category">${escapeHtml(benchmark.category)}</span><h3>${escapeHtml(benchmark.canonicalName)}</h3><span class="status status-${escapeHtml(benchmark.status)}">${escapeHtml(benchmark.status)}</span></div><span class="hot-score" title="热度分">${item.score}</span></div><div class="leader">${top3.length ? `<small>QUALIFIED TOP 3</small><ol class="top-three">${top3.map((result) => `<li><b>${result.rank}</b><span>${escapeHtml(result.system.name)}</span><em>${formatScore(result, benchmark.primaryMetric.unit)}</em></li>`).join('')}</ol>` : '<small>REGISTRY READY · TOP-K PENDING</small><strong>等待来源合格成绩</strong>'}</div><div class="signal-bar" aria-label="热度信号构成">${signalBars(item)}</div><button class="card-action" type="button" data-benchmark="${escapeHtml(benchmark.benchmarkId)}">打开 ${escapeHtml(benchmark.canonicalName)} 详情</button></article>`;
  }).join('');
}

function renderMaintenance() {
  const item = state.maintenance;
  const values = [
    [item.sources.total, 'canonical sources'],
    [item.sources.curatedSnapshots, 'curated snapshots'],
    [item.queue.needsSource, 'needs source'],
    [item.queue.collecting, 'collecting'],
    [item.queue.implementationIndex, 'implementation index'],
    [item.staleBenchmarks.length, 'legacy / stale']
  ];
  $('#maintenance-stats').innerHTML = values.map(([value,label]) => `<div><strong>${value}</strong><span>${escapeHtml(label)}</span></div>`).join('');
}

function renderCategories() {
  const categories = [...new Set(state.catalog.benchmarks.map((item) => item.category))].sort();
  $('#category').insertAdjacentHTML('beforeend', categories.map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join(''));
  const languages = [...new Set(state.catalog.benchmarks.flatMap((item) => item.languages || []))].sort();
  const modalities = [...new Set(state.catalog.benchmarks.flatMap((item) => item.modalities || []))].sort();
  $('#language').insertAdjacentHTML('beforeend', languages.map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join(''));
  $('#modality').insertAdjacentHTML('beforeend', modalities.map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join(''));
}

function filteredBenchmarks() {
  const query = $('#search').value.trim().toLowerCase();
  const category = $('#category').value;
  const status = $('#status').value;
  const coverage = $('#coverage').value;
  const language = $('#language').value;
  const modality = $('#modality').value;
  const evidenceStage = $('#evidence-stage').value;
  return state.catalog.benchmarks.filter((item) => {
    const haystack = [item.canonicalName, item.summary, item.category, ...(item.aliases || [])].join(' ').toLowerCase();
    if (query && !haystack.includes(query)) return false;
    if (category && item.category !== category) return false;
    if (status && item.status !== status) return false;
    if (coverage === 'ranked' && !item.leaderboard.resultCount) return false;
    if (coverage === 'pending' && item.leaderboard.resultCount) return false;
    if (language && !(item.languages || []).includes(language)) return false;
    if (modality && !(item.modalities || []).includes(modality)) return false;
    if (evidenceStage && item.evidenceStage !== evidenceStage) return false;
    return true;
  });
}

function renderRegistry() {
  const filtered = filteredBenchmarks();
  const rows = filtered.slice(0, state.visibleLimit);
  $('#result-count').textContent = `展示 ${rows.length} / 筛选 ${filtered.length} / 总计 ${state.catalog.benchmarks.length} · canonical identity + version isolation`;
  $('#registry-body').innerHTML = rows.map((item) => {
    const leader = item.leaderboard.leader;
    const stageLabel = item.evidenceStage === 'implementation_index' ? '实现目录已核验' : '原始来源已建档';
    return `<tr><td><span class="benchmark-name">${escapeHtml(item.canonicalName)}</span><span class="benchmark-alias">${escapeHtml((item.aliases || []).slice(0,2).join(' · '))}</span></td><td>${escapeHtml(item.category)}<span class="benchmark-alias">${escapeHtml(item.versions.join(' / '))}</span></td><td><span class="status status-${escapeHtml(item.status)}">${escapeHtml(item.status)}</span><span class="benchmark-alias">${stageLabel}</span></td><td><span class="count-badge">${item.leaderboard.resultCount}</span></td><td class="leader-cell">${leader ? `${escapeHtml(leader.system.name)}<small>${formatScore(leader, item.primaryMetric.unit)}</small>` : '<span class="benchmark-alias">暂无默认排名</span>'}</td><td><button class="row-button" type="button" data-benchmark="${escapeHtml(item.benchmarkId)}">详情 →</button></td></tr>`;
  }).join('') || '<tr><td colspan="6"><div class="empty-state">没有符合筛选条件的 Benchmark。</div></td></tr>';
  const more = $('#load-more');
  more.hidden = rows.length >= filtered.length;
  more.textContent = `继续加载 ${Math.min(50, filtered.length - rows.length)} 项`;
}

function popularityFor(id) { return state.hot.benchmarks.find((item) => item.benchmark.benchmarkId === id); }

function uncertaintyNote(board) {
  const [a, b] = board.all;
  if (!a?.uncertainty || !b?.uncertainty) return '';
  const overlaps = a.score - a.uncertainty <= b.score + b.uncertainty && b.score - b.uncertainty <= a.score + a.uncertainty;
  return overlaps ? 'Top results have overlapping reported uncertainty intervals; displayed rank follows point estimates and preserves the uncertainty.' : '';
}

function rankingRows(board, options = {}) {
  const { limit = '5', openOnly = false, entity = 'system', includeReports = false } = options;
  let results = [...board.all];
  if (openOnly) results = results.filter((item) => item.model.openWeights);
  if (entity === 'model') {
    const seen = new Set();
    results = results.filter((item) => !seen.has(item.model.modelId) && seen.add(item.model.modelId));
  }
  if (limit !== 'all') results = results.slice(0, Number(limit));
  if (!results.length) return '<div class="empty-state"><b>Registry 已建档，默认 Top-K 尚未开放。</b><br>需要来源等级、版本身份和运行配置全部通过门槛。</div>';
  const rankedHtml = `<div class="registry-table-wrap"><table class="ranking-table"><thead><tr><th>Rank</th><th>System / Model</th><th>Score</th><th>Run config</th><th>Evidence</th></tr></thead><tbody>${results.map((item) => `<tr><td class="rank">${item.rank}</td><td><button type="button" class="model-button" data-system="${escapeHtml(item.system.systemId)}">${escapeHtml(item.system.name)}</button><span class="benchmark-alias">${escapeHtml(item.model.organization)} · ${item.model.openWeights ? 'open weights' : 'closed / undisclosed weights'}</span></td><td class="score-value">${formatScore(item, board.benchmark.metric.unit)}</td><td><b>${escapeHtml(item.system.harness)}</b><span class="system-config">effort ${escapeHtml(item.runConfig.effort)} · pass@${escapeHtml(item.runConfig.passK)} · attempts ${escapeHtml(item.runConfig.attempts)}${item.runConfig.budget?.usd ? ` · $${item.runConfig.budget.usd}` : ''}${item.runConfig.budget?.outputTokens ? ` · ${item.runConfig.budget.outputTokens.toLocaleString()} tokens` : ''}</span></td><td><a class="source-link" href="${escapeHtml(item.source.url)}" target="_blank" rel="noreferrer">${escapeHtml(item.source.type)} ↗</a><span class="benchmark-alias">${escapeHtml(item.evaluationDate)}</span></td></tr>`).join('')}</tbody></table></div>`;
  if (!includeReports || !board.otherReports.length) return rankedHtml;
  return `${rankedHtml}<h3>其他报告（不改变默认名次）</h3><div class="registry-table-wrap"><table class="ranking-table"><thead><tr><th>System</th><th>Score</th><th>Status</th><th>Evidence</th></tr></thead><tbody>${board.otherReports.map((item) => `<tr><td>${escapeHtml(item.system?.name || item.resultId)}</td><td class="score-value">${formatScore(item, board.benchmark.metric.unit)}</td><td>${escapeHtml(item.source.type)} · ${escapeHtml(item.comparability)}</td><td><a class="source-link" href="${escapeHtml(item.source.url)}" target="_blank" rel="noreferrer">source ↗</a></td></tr>`).join('')}</tbody></table></div>`;
}

async function openBenchmark(id) {
  const board = await getBoard(id);
  const hot = popularityFor(id);
  const registryEntry = state.catalog.benchmarks.find((item) => item.benchmarkId === id);
  const evidenceLabel = registryEntry?.evidenceStage === 'implementation_index' ? '实现目录已核验 · 原始来源待审核' : '原始来源已建档';
  const content = $('#detail-content');
  content.innerHTML = `<p class="eyebrow">BENCHMARK DETAIL / EXACT GROUP</p><h2 id="detail-title">${escapeHtml(board.benchmark.canonicalName)}</h2><p class="dialog-intro">${escapeHtml(board.benchmark.summary)}</p><div class="detail-meta"><span class="chip">${escapeHtml(board.benchmark.category)}</span><span class="chip">v ${escapeHtml(board.group.version)}</span><span class="chip">subset ${escapeHtml(board.group.subset)}</span><span class="chip">${escapeHtml(board.group.metric)}</span><span class="chip">${escapeHtml(board.group.protocol)}</span><span class="chip">${escapeHtml((state.catalog.benchmarks.find((item) => item.benchmarkId === id)?.languages || []).join(' / '))}</span><span class="chip">${escapeHtml((state.catalog.benchmarks.find((item) => item.benchmarkId === id)?.modalities || []).join(' / '))}</span><span class="chip status status-${escapeHtml(board.benchmark.status)}">${escapeHtml(board.benchmark.status)}</span></div>${hot ? `<div class="pop-breakdown"><div><strong>${hot.activeLeaderboard}</strong><span>榜单 / 35</span></div><div><strong>${hot.modelAdoption}</strong><span>采用 / 25</span></div><div><strong>${hot.communityImpact}</strong><span>社区 / 15</span></div><div><strong>${hot.freshness}</strong><span>新鲜 / 15</span></div><div><strong>${hot.reproducibility}</strong><span>复现 / 10</span></div></div>` : ''}${uncertaintyNote(board) ? `<p class="source-receipt">${escapeHtml(uncertaintyNote(board))}</p>` : ''}<div class="detail-toolbar"><p><b>Top-K</b><br><span class="benchmark-alias">${escapeHtml(board.caveat)}</span></p><div><label>展示 <select id="topk-select"><option value="5">Top 5</option><option value="10">Top 10</option><option value="all">全部</option></select></label><label>权重 <select id="weights-select"><option value="all">全部模型</option><option value="open">开放权重</option></select></label><label>实体 <select id="entity-select"><option value="system">完整系统</option><option value="model">每模型最佳配置</option></select></label><label>来源 <select id="source-select"><option value="default">官方与独立</option><option value="all">包含其他报告</option></select></label></div></div><div id="ranking-output">${rankingRows(board)}</div>${board.sotaTimeline.length ? `<section class="timeline"><h3>当时的 SOTA</h3><ol>${board.sotaTimeline.map((point) => `<li><time>${escapeHtml(point.date)}</time>${point.leaders.map((leader) => `${escapeHtml(leader.system.name)} · ${formatScore(leader, board.benchmark.metric.unit)}`).join('<br>')}</li>`).join('')}</ol></section>` : ''}<aside class="source-receipt"><h3>Evidence receipt / 来源回执</h3>${board.all.length ? `<p>默认榜来源：${[...new Set(board.all.map((item) => item.source.name))].map(escapeHtml).join(' · ')}</p><p>资格：official / independent + comparable；生成时间 ${escapeHtml(board.generatedAt)}</p>` : '<p>暂无同时满足来源等级、可比性与配置完整性的成绩。Registry 条目不会因此伪造空缺排名。</p>'}<p>其他报告：${board.otherReports.length} 条（不进入默认 Top-K）</p></aside>`;
  $('.detail-meta', content)?.insertAdjacentHTML('beforeend', `<span class="chip">${escapeHtml(evidenceLabel)}</span>`);
  $('.source-receipt', content)?.insertAdjacentHTML('afterbegin', `<p>登记深度：${escapeHtml(evidenceLabel)}。 <a class="source-link" href="${escapeHtml(registryEntry?.links?.repo || registryEntry?.links?.homepage || '#')}" target="_blank" rel="noreferrer">查看登记来源 ↗</a></p>`);
  const updateRanking = () => { $('#ranking-output').innerHTML = rankingRows(board, { limit: $('#topk-select').value, openOnly: $('#weights-select').value === 'open', entity: $('#entity-select').value, includeReports: $('#source-select').value === 'all' }); };
  ['#topk-select','#weights-select','#entity-select','#source-select'].forEach((selector) => $(selector)?.addEventListener('change', updateRanking));
  const dialog = $('#detail-dialog');
  if (!dialog.open) dialog.showModal();
  history.replaceState(null, '', `#benchmark=${encodeURIComponent(id)}`);
}

async function loadAllBoards() {
  await Promise.all(state.catalog.benchmarks.map((item) => getBoard(item.benchmarkId)));
  return [...state.boards.values()];
}

function systemIndex(boards) {
  const index = new Map();
  for (const board of boards) for (const result of board.all) {
    if (!index.has(result.system.systemId)) index.set(result.system.systemId, { system: result.system, model: result.model, rows: [] });
    index.get(result.system.systemId).rows.push({ benchmark: board.benchmark, group: board.group, result });
  }
  return index;
}

async function openModel(systemId) {
  const index = systemIndex(await loadAllBoards());
  const item = index.get(systemId);
  if (!item) throw new Error(`Unknown system ${systemId}`);
  $('#model-content').innerHTML = `<p class="eyebrow">MODEL SYSTEM DETAIL</p><h2 id="model-title">${escapeHtml(item.system.name)}</h2><p class="dialog-intro">排行榜实体是完整系统，不只是模型名称。下方只列出通过默认来源和可比性门槛的运行。</p><div class="detail-meta"><span class="chip">model ${escapeHtml(item.model.name)}</span><span class="chip">org ${escapeHtml(item.model.organization)}</span><span class="chip">scaffold ${escapeHtml(item.system.scaffold)}</span><span class="chip">harness ${escapeHtml(item.system.harness)}</span><span class="chip">${item.model.openWeights ? 'open weights' : 'closed / undisclosed weights'}</span></div><div class="registry-table-wrap"><table class="ranking-table"><thead><tr><th>Benchmark</th><th>Exact group</th><th>Score</th><th>Evidence</th></tr></thead><tbody>${item.rows.map((row) => `<tr><td><b>${escapeHtml(row.benchmark.canonicalName)}</b></td><td>${escapeHtml(Object.values(row.group).join(' / '))}</td><td class="score-value">${formatScore(row.result, row.benchmark.metric.unit)}</td><td><a class="source-link" href="${escapeHtml(row.result.source.url)}" target="_blank" rel="noreferrer">${escapeHtml(row.result.source.type)} ↗</a></td></tr>`).join('')}</tbody></table></div><div class="hero-actions"><button type="button" class="button primary" data-compare-system="${escapeHtml(systemId)}">加入模型比较</button></div>`;
  const dialog = $('#model-dialog');
  if (!dialog.open) dialog.showModal();
}

async function openCompare(preselect = null) {
  const boards = await loadAllBoards();
  const index = systemIndex(boards);
  if (preselect) state.selectedSystems.add(preselect);
  const picker = $('#compare-picker');
  picker.innerHTML = [...index.values()].sort((a,b) => a.system.name.localeCompare(b.system.name)).map((item) => `<label><input type="checkbox" value="${escapeHtml(item.system.systemId)}" ${state.selectedSystems.has(item.system.systemId) ? 'checked' : ''}><span><b>${escapeHtml(item.system.name)}</b><small>${escapeHtml(item.model.organization)} · ${item.rows.length} qualified benchmark(s)</small></span></label>`).join('');
  const update = () => {
    state.selectedSystems = new Set($$('input:checked', picker).map((input) => input.value).slice(0,4));
    $$('input', picker).forEach((input) => { input.checked = state.selectedSystems.has(input.value); input.disabled = state.selectedSystems.size >= 4 && !input.checked; });
    renderComparison(index);
  };
  picker.addEventListener('change', update);
  update();
  const dialog = $('#compare-dialog');
  if (!dialog.open) dialog.showModal();
}

function renderComparison(index) {
  const selected = [...state.selectedSystems].map((id) => index.get(id)).filter(Boolean);
  const output = $('#compare-output');
  if (selected.length < 2) { output.innerHTML = '<div class="empty-state">请选择至少 2 个、最多 4 个模型系统。</div>'; return; }
  const common = selected[0].rows.filter((row) => selected.every((item) => item.rows.some((candidate) => candidate.benchmark.benchmarkId === row.benchmark.benchmarkId && JSON.stringify(candidate.group) === JSON.stringify(row.group))));
  if (!common.length) { output.innerHTML = '<div class="empty-state">所选系统没有共同且评测设置一致的 Benchmark。我们不会用不同榜单拼成总分。</div>'; return; }
  output.innerHTML = `<table><thead><tr><th>Benchmark / exact group</th>${selected.map((item) => `<th>${escapeHtml(item.system.name)}</th>`).join('')}</tr></thead><tbody>${common.map((row) => `<tr><td><b>${escapeHtml(row.benchmark.canonicalName)}</b><small class="benchmark-alias">${escapeHtml(Object.values(row.group).join(' / '))}</small></td>${selected.map((item) => { const hit = item.rows.find((candidate) => candidate.benchmark.benchmarkId === row.benchmark.benchmarkId && JSON.stringify(candidate.group) === JSON.stringify(row.group)); return `<td class="score-value">${formatScore(hit.result, row.benchmark.metric.unit)}</td>`; }).join('')}</tr>`).join('')}</tbody></table>`;
}

function bindEvents() {
  $('#filters').addEventListener('input', () => { state.visibleLimit = 50; renderRegistry(); });
  $('#load-more').addEventListener('click', () => { state.visibleLimit += 50; renderRegistry(); });
  document.addEventListener('click', (event) => {
    const benchmark = event.target.closest('[data-benchmark]');
    if (benchmark) openBenchmark(benchmark.dataset.benchmark).catch(showError);
    const system = event.target.closest('[data-system]');
    if (system) openModel(system.dataset.system).catch(showError);
    const compareSystem = event.target.closest('[data-compare-system]');
    if (compareSystem) {
      $('#model-dialog').close();
      openCompare(compareSystem.dataset.compareSystem).catch(showError);
    }
    if (event.target.matches('[data-close]')) event.target.closest('dialog').close();
  });
  $('#compare-open').addEventListener('click', () => openCompare().catch(showError));
  $$('dialog').forEach((dialog) => dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); }));
}

function showError(error) {
  const box = $('#app-error');
  box.hidden = false;
  box.textContent = `数据加载失败：${error.message}。请通过 HTTP 服务访问本站，并保留上一份已验证快照。`;
  console.error(error);
}

async function init() {
  [state.catalog, state.hot, state.models, state.snapshot, state.maintenance] = await Promise.all(['data/public/catalog.json','data/public/hot-benchmarks.json','data/public/models.json','data/public/snapshot.json','data/public/maintenance.json'].map(getJson));
  renderSnapshot();
  renderHot();
  renderCategories();
  renderRegistry();
  renderMaintenance();
  bindEvents();
  const match = location.hash.match(/^#benchmark=([a-z0-9-]+)$/);
  if (match) await openBenchmark(match[1]);
}

init().catch(showError);
