const $ = (selector, root = document) => root.querySelector(selector);
const escapeHtml = (value = '') => String(value).replace(/[&<>'"]/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' }[char]));
const state = { data: null };

async function getJson(path) {
  const response = await fetch(path, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response.json();
}

function formatMetric(metric) {
  const value = Number(metric.value);
  return `${value.toFixed(Number.isInteger(value) ? 0 : value < 1 ? 2 : 1)}${metric.unit === '%' ? '%' : ` ${metric.unit}`}`;
}

function renderStats() {
  const stats = state.data.stats;
  $('#snapshot-date').textContent = state.data.asOf;
  const values = [[stats.papers, 'papers'], [stats.candidates, 'candidates'], [stats.claims, 'claims'], [stats.memoryCandidates, 'memory'], [stats.rankingEligibleClaims, 'Top-K eligible'], [stats.humanReviewed, 'human reviewed']];
  $('#discovery-stats').innerHTML = values.map(([value, label]) => `<div><strong>${value}</strong><span>${escapeHtml(label)}</span></div>`).join('');
}

function filtered() {
  const query = $('#discovery-search').value.trim().toLowerCase();
  const trend = $('#trend-filter').value;
  const kind = $('#kind-filter').value;
  const review = $('#review-filter').value;
  const watch = $('#watch-filter').value;
  return state.data.candidates.filter((item) => {
    const haystack = [item.entityName, item.entityKind, item.paper.title, item.paper.summary, ...(item.watchlists || [])].join(' ').toLowerCase();
    return (!query || haystack.includes(query)) && (!trend || item.trend.stage === trend) && (!kind || item.entityKind === kind) && (!review || item.status === review) && (!watch || item.watchlists.includes(watch));
  });
}

function claimRows(item) {
  if (!item.claims.length) return '<div class="empty-state">尚未建立成绩 claim；需要回溯原始论文或榜单。</div>';
  return `<div class="claim-table-wrap"><table class="claim-table"><thead><tr><th>System</th><th>Dataset / config</th><th>Metric</th><th>Evidence</th><th>Rank</th></tr></thead><tbody>${item.claims.map((claim) => {
    const config = claim.runConfig.raw;
    const budget = config.steps ? `${config.steps} steps` : config.maxTurns ? `${config.maxTurns} turns` : config.subset || 'paper protocol';
    return `<tr><td>${escapeHtml(claim.system)}</td><td>${escapeHtml(claim.dataset)} ${escapeHtml(claim.datasetVersion)}<small>${escapeHtml(budget)}</small></td><td><b>${escapeHtml(claim.metric.name)}</b> ${escapeHtml(formatMetric(claim.metric))}</td><td><a href="${escapeHtml(`${claim.evidence.sourcePdfUrl}#page=${claim.evidence.pdfPage}`)}" target="_blank" rel="noreferrer">p.${claim.evidence.pdfPage} ${escapeHtml(claim.evidence.table)} ↗</a><small>${escapeHtml(claim.evidence.row)} / ${escapeHtml(claim.evidence.column)}</small></td><td><span class="rank-blocked">隔离</span></td></tr>`;
  }).join('')}</tbody></table></div>`;
}

function candidateCard(item) {
  const review = item.review;
  const statusLabel = item.status === 'accepted' ? 'Registry collecting' : 'Source audit required';
  return `<article class="candidate-card" data-candidate="${escapeHtml(item.candidateId)}"><header><div><span class="trend trend-${item.trend.stage.toLowerCase()}">${escapeHtml(item.trend.stage)}</span><span class="entity-kind">${escapeHtml(item.entityKind)}</span><h3>${escapeHtml(item.entityName)}</h3></div><strong class="trend-score" title="趋势分，不是模型分数">${item.trend.score}</strong></header><p>${escapeHtml(item.paper.summary)}</p><div class="candidate-meta"><span>${escapeHtml(item.relation)}</span><span>${escapeHtml(statusLabel)}</span><span>${item.claims.length} claims</span>${item.watchlists.map((watch) => `<span>${escapeHtml(watch)}</span>`).join('')}</div><div class="review-receipt"><b>${review ? `${escapeHtml(review.reviewerKind)} review · ${escapeHtml(review.decision)}` : 'unreviewed'}</b><span>${escapeHtml(review?.reason || '等待身份与来源复核')}</span></div><div class="candidate-actions"><button class="button primary" type="button" data-evidence="${escapeHtml(item.candidateId)}">逐格查看证据</button><a class="button" href="${escapeHtml(item.paper.arxivUrl)}" target="_blank" rel="noreferrer">arXiv ${escapeHtml(item.paper.version)} ↗</a></div></article>`;
}

function renderCandidates() {
  const items = filtered();
  $('#queue-count').textContent = `展示 ${items.length} / ${state.data.candidates.length} · ${state.data.stats.claims} 条 paper-reported claim · 0 条自动进入 Top-K`;
  $('#candidate-grid').innerHTML = items.map(candidateCard).join('') || '<div class="empty-state">没有符合筛选条件的论文候选。</div>';
}

function openEvidence(id) {
  const item = state.data.candidates.find((candidate) => candidate.candidateId === id);
  if (!item) return;
  $('#evidence-content').innerHTML = `<p class="eyebrow">PAGE / TABLE / ROW / COLUMN</p><h2 id="evidence-title">${escapeHtml(item.entityName)}</h2><p class="dialog-intro">${escapeHtml(item.paper.title)}</p><div class="detail-meta"><span class="chip">${escapeHtml(item.entityKind)}</span><span class="chip">${escapeHtml(item.relation)}</span><span class="chip">confidence ${item.classificationConfidence}</span><span class="chip">PDF ${escapeHtml(item.paper.pdfSha256.slice(0, 19))}…</span><span class="chip">${item.paper.pageCount} pages</span></div>${claimRows(item)}<aside class="source-receipt"><h3>Review receipt</h3><p>${escapeHtml(item.review?.reason || 'No review decision')}</p><p>公开页只保存哈希与页表坐标，不镜像论文 PDF。OCR 或作者自报数字的 rankingEligible 始终为 false。</p></aside><div class="hero-actions"><button class="button" type="button" data-copy-review="${escapeHtml(item.candidateId)}">复制人工审核 JSON 模板</button><a class="button primary" href="${escapeHtml(item.paper.pdfUrl)}#page=${item.evidence.sourcePdfPage}" target="_blank" rel="noreferrer">打开证据页 ↗</a></div>`;
  $('#evidence-dialog').showModal();
}

async function copyReview(id) {
  const payload = { decisionId: `review-${id.replace(/^candidate-/, '')}-human`, targetType: 'candidate', targetId: id, decision: 'accept', reviewer: 'REPLACE_WITH_REVIEWER', reviewerKind: 'human', timestamp: new Date().toISOString(), reason: 'REPLACE_WITH_EVIDENCE-BASED_REASON' };
  await navigator.clipboard.writeText(`${JSON.stringify(payload, null, 2)}\n`);
  const status = $('#copy-status');
  status.textContent = '审核 JSON 模板已复制；请在 reviews.json 提交并通过 CI。';
  status.hidden = false;
  setTimeout(() => { status.hidden = true; }, 3500);
}

function bind() {
  $('#discovery-filters').addEventListener('input', renderCandidates);
  document.addEventListener('click', (event) => {
    const evidence = event.target.closest('[data-evidence]');
    if (evidence) openEvidence(evidence.dataset.evidence);
    const copy = event.target.closest('[data-copy-review]');
    if (copy) copyReview(copy.dataset.copyReview).catch(showError);
    if (event.target.closest('[data-close]')) event.target.closest('dialog').close();
  });
  $('#evidence-dialog').addEventListener('click', (event) => { if (event.target === event.currentTarget) event.currentTarget.close(); });
}

function showError(error) {
  const node = $('#app-error');
  node.textContent = `加载失败：${error.message}`;
  node.hidden = false;
}

async function init() {
  state.data = await getJson('data/public/arxiv-discovery.json');
  renderStats();
  renderCandidates();
  bind();
}

init().catch(showError);
