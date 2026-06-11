const DATA = window.AGENT_ROADMAP_DATA || { agents: [], insights: [], miWork: {} };
const agents = DATA.agents || [];
const state = { query: '', category: 'All', interfaceType: 'All', maturity: 'All', modelTarget: 'All', miWorkRelevance: 'All', tokenOnly: 'All', view: 'cards', selected: null };
const colors = { 'TUI Agent':'#68e9ff','IDE Agent':'#77ffaa','Work Agent':'#ff6bd3','Agent Framework':'#ffba74','Token Optimization':'#8aa9ff','Memory Layer':'#bda2ff','Context Middleware':'#78f0d0','Agent Skill':'#ff9955','Parallel Agent Infrastructure':'#ffd166' };
const $ = (id) => document.getElementById(id);
const unique = (key) => ['All', ...Array.from(new Set(agents.map(a => a[key]).filter(Boolean))).sort()];
const includes = (text, q) => String(text || '').toLowerCase().includes(q.toLowerCase());
function optionize(select, values, label){ select.innerHTML = values.map(v => `<option value="${escapeHtml(v)}">${v === 'All' ? label : v}</option>`).join(''); }
function escapeHtml(s){ return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c])); }
function init(){
  optionize($('categoryFilter'), unique('category'), 'All Categories');
  optionize($('interfaceFilter'), unique('interfaceType'), 'All Interfaces');
  optionize($('maturityFilter'), unique('maturity'), 'All Maturity');
  optionize($('modelFilter'), unique('modelTarget'), 'All Models');
  optionize($('miworkFilter'), unique('miWorkRelevance'), 'All MiWork');
  $('tokenFilter').innerHTML = '<option value="All">All Token Focus</option><option value="Token">Token / Context focused</option>';
  $('searchInput').addEventListener('input', e => { state.query = e.target.value.trim(); render(); });
  ['categoryFilter','interfaceFilter','maturityFilter','modelFilter','miworkFilter','tokenFilter'].forEach(id => {
    $(id).addEventListener('change', e => { const map = { categoryFilter:'category', interfaceFilter:'interfaceType', maturityFilter:'maturity', modelFilter:'modelTarget', miworkFilter:'miWorkRelevance', tokenFilter:'tokenOnly' }; state[map[id]] = e.target.value; render(); });
  });
  $('cardViewBtn').addEventListener('click', () => setView('cards'));
  $('matrixViewBtn').addEventListener('click', () => setView('matrix'));
  $('detailClose').addEventListener('click', () => selectAgent(null));
  renderStatic();
  render();
  selectAgent(agents.find(a => a.miWorkRelevance === 'High') || agents[0]);
}
function setView(view){ state.view = view; $('cardViewBtn').classList.toggle('active', view === 'cards'); $('matrixViewBtn').classList.toggle('active', view === 'matrix'); $('cardsGrid').classList.toggle('hidden', view !== 'cards'); $('matrixWrap').classList.toggle('hidden', view !== 'matrix'); render(); }
function filtered(){
  const q = state.query.toLowerCase();
  return agents.filter(a => {
    const tokenFocused = /token|context|memory|cache|rag|filter|compression|优化/i.test([a.category,a.optimizationFocus,a.tokenStrategy,a.tags?.join(' ')].join(' '));
    const hay = [a.name,a.category,a.subcategory,a.interfaceType,a.maturity,a.modelTarget,a.optimizationFocus,a.tokenStrategy,a.agentArchitecture,a.bestFor,a.tags?.join(' ')].join(' ');
    return (!q || includes(hay, q)) &&
      (state.category === 'All' || a.category === state.category) &&
      (state.interfaceType === 'All' || a.interfaceType === state.interfaceType) &&
      (state.maturity === 'All' || a.maturity === state.maturity) &&
      (state.modelTarget === 'All' || a.modelTarget === state.modelTarget) &&
      (state.miWorkRelevance === 'All' || a.miWorkRelevance === state.miWorkRelevance) &&
      (state.tokenOnly === 'All' || tokenFocused);
  });
}
function renderStatic(){
  $('insights').innerHTML = (DATA.insights || []).map(i => `<article class="insight"><p class="eyebrow">${escapeHtml(i[0])}</p><h3>${escapeHtml(i[1])}</h3><p>${escapeHtml(i[2])}</p></article>`).join('');
  const counts = groupBy(agents, 'category');
  $('miniMap').innerHTML = Object.entries(counts).map(([cat, n]) => `<div class="mini-map-row"><span>${escapeHtml(cat.replace(' Agent',''))}</span><div class="mini-bar"><i style="width:${Math.max(8, n / agents.length * 100)}%;color:${colors[cat] || '#68e9ff'}"></i></div><b>${n}</b></div>`).join('');
  const mw = DATA.miWork || {};
  $('miworkWhy').textContent = mw.whyNotIDE || '';
  $('miworkPhases').innerHTML = (mw.phases || []).map(p => `<li><b>${escapeHtml(p[0])}</b> — ${escapeHtml(p[1])}<br><span>${escapeHtml(p[2])}</span></li>`).join('');
  $('miworkModules').innerHTML = pills(mw.modules || []);
  $('miworkRisks').innerHTML = pills(mw.risks || []);
  $('miworkOpportunities').innerHTML = pills(mw.opportunities || []);
}
function render(){
  const list = filtered();
  const high = agents.filter(a => a.miWorkRelevance === 'High').length;
  const token = agents.filter(a => /Token|Context|Memory|Middleware|Optimization/i.test(a.category + ' ' + a.optimizationFocus)).length;
  $('stats').innerHTML = [
    ['Total', agents.length], ['Visible', list.length], ['TUI', count('TUI Agent')], ['IDE', count('IDE Agent')], ['Work', count('Work Agent')], ['MiWork High', high]
  ].map(([k,v]) => `<div class="stat"><b>${v}</b><span>${k}</span></div>`).join('');
  const categories = groupBy(list, 'category');
  $('taxonomyStrip').innerHTML = Object.entries(categories).map(([cat,n]) => `<button class="taxonomy-card" type="button" data-cat="${escapeHtml(cat)}"><b>${n}</b><span>${escapeHtml(cat)}</span></button>`).join('');
  document.querySelectorAll('[data-cat]').forEach(btn => btn.addEventListener('click', () => { $('categoryFilter').value = btn.dataset.cat; state.category = btn.dataset.cat; render(); }));
  $('tokenRadar').innerHTML = radarCards(list);
  $('cardsGrid').innerHTML = list.map(cardHtml).join('');
  document.querySelectorAll('.agent-card').forEach(el => el.addEventListener('click', () => selectAgent(agents.find(a => a.id === el.dataset.id))));
  $('matrixBody').innerHTML = list.map(a => `<tr data-id="${escapeHtml(a.id)}"><td>${escapeHtml(a.name)}</td><td>${escapeHtml(a.category)}</td><td>${escapeHtml(a.modelTarget)}</td><td>${escapeHtml(short(a.tokenStrategy, 26))}</td><td>${escapeHtml(a.miWorkRelevance)}</td></tr>`).join('');
  document.querySelectorAll('#matrixBody tr').forEach(el => el.addEventListener('click', () => selectAgent(agents.find(a => a.id === el.dataset.id))));
  if (!list.includes(state.selected)) selectAgent(list[0] || null, false);
}
function cardHtml(a){
  const color = colors[a.category] || '#68e9ff';
  return `<article class="agent-card" data-id="${escapeHtml(a.id)}"><div class="card-top"><span class="cat-dot" style="color:${color};background:${color}"></span><div class="tag-row"><span class="tag ${String(a.maturity).toLowerCase().includes('open') ? 'open' : 'official'}">${escapeHtml(a.maturity)}</span><span class="tag high">${escapeHtml(a.miWorkRelevance)}</span></div></div><h3>${escapeHtml(a.name)}</h3><p class="card-desc">${escapeHtml(a.subcategory)} · ${escapeHtml(short(a.bestFor, 90))}</p><div class="tag-row"><span class="tag">${escapeHtml(a.category)}</span><span class="tag token">${escapeHtml(short(a.tokenStrategy, 42))}</span></div></article>`;
}
function selectAgent(a, scroll = true){
  state.selected = a;
  if (!a){ $('detailTitle').textContent = '选择一个项目'; $('detailSummary').textContent = '点击任意卡片查看详情。'; $('detailMeta').innerHTML = ''; $('detailLists').innerHTML = ''; return; }
  $('detailTitle').textContent = a.name;
  $('detailSummary').textContent = `${a.subcategory} · ${a.bestFor}`;
  $('detailMeta').innerHTML = [['Category',a.category],['Interface',a.interfaceType],['Model',a.modelTarget],['Risk',a.riskLevel],['MiWork',a.miWorkRelevance],['Focus',a.optimizationFocus]].map(m => `<div class="meta-item"><small>${escapeHtml(m[0])}</small><b>${escapeHtml(m[1])}</b></div>`).join('');
  $('detailLists').innerHTML = `<div class="detail-list"><h4>Token Strategy</h4><p>${escapeHtml(a.tokenStrategy)}</p></div><div class="detail-list"><h4>Architecture</h4><p>${escapeHtml(a.agentArchitecture)}</p></div>${listBlock('Strengths', a.strengths)}${listBlock('Weaknesses', a.weaknesses)}<div class="detail-list"><h4>Links</h4><p><a href="${escapeHtml(a.link)}" target="_blank" rel="noopener">Open source / docs</a>${a.repo ? ` · <code>${escapeHtml(a.repo)}</code>` : ''}</p></div>`;
  if (scroll && matchMedia('(max-width: 1080px)').matches) $('detailPanel').scrollIntoView({behavior:'smooth', block:'start'});
}
function listBlock(title, arr){ return `<div class="detail-list"><h4>${escapeHtml(title)}</h4><ul>${(arr || []).map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul></div>`; }
function pills(arr){ return arr.map(x => `<span>${escapeHtml(x)}</span>`).join(''); }
function groupBy(list, key){ return list.reduce((acc,a)=>{ acc[a[key] || 'Other']=(acc[a[key] || 'Other']||0)+1; return acc; },{}); }
function count(cat){ return agents.filter(a => a.category === cat).length; }
function short(s,n){ s=String(s||''); return s.length>n ? s.slice(0,n-1)+'…' : s; }
function radarCards(list){
  const buckets = [
    ['Command filtering','command|shell|output|filter|dedupe'], ['Context routing','context|routing|compression|select'], ['Memory','memory|recall|knowledge'], ['Cache / RAG','cache|rag|retrieval'], ['Parallel safety','parallel|worktree|lock|coordination'], ['Verification','verify|receipt|hallucination']
  ];
  return buckets.map(([name, pattern]) => { const re = new RegExp(pattern,'i'); const n = list.filter(a => re.test([a.category,a.optimizationFocus,a.tokenStrategy,a.agentArchitecture,a.tags?.join(' ')].join(' '))).length; return `<article class="radar-card"><b>${n}</b><span>${name}</span></article>`; }).join('');
}
init();
