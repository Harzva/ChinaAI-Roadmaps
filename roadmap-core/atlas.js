(function () {
  const state = {
    data: null,
    canvas: null,
    ctx: null,
    dpr: 1,
    w: 0,
    h: 0,
    panX: 0,
    panY: 0,
    targetPanX: 0,
    targetPanY: 0,
    zoom: 1,
    targetZoom: 1,
    activeCategory: "All",
    query: "",
    selected: null,
    selectedCountry: null,
    hover: null,
    labels: true,
    density: true,
    flow: true,
    matrix: false,
    pointer: { x: -999, y: -999, down: false, lastX: 0, lastY: 0, moved: false },
    particles: [],
    lastTime: 0,
    fps: 60
  };

  const $ = (id) => document.getElementById(id);
  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
  const esc = (s) => String(s ?? "").replace(/[&<>'"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", "\"": "&quot;" }[c]));
  const colorFor = (category) => (state.data.colors && state.data.colors[category]) || "#6feee0";
  const hash = (s) => {
    let h = 2166136261;
    String(s).split("").forEach((ch) => {
      h ^= ch.charCodeAt(0);
      h = Math.imul(h, 16777619);
    });
    return Math.abs(h);
  };
  const seeded = (n) => {
    const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  const isWorld = () => state.data?.mapMode === "world";
  const hasGeo = (n) => Number.isFinite(n?.lng) && Number.isFinite(n?.lat);
  const countryLabel = (country) => ({
    "United States": "United States · 美国",
    China: "China · 中国",
    India: "India · 印度",
    Japan: "Japan · 日本",
    Taiwan: "Taiwan · 台湾",
    Singapore: "Singapore · 新加坡"
  }[country] || country || "Unknown");
  const WORLD_LAND = [
    [[-168, 72], [-142, 70], [-124, 58], [-118, 49], [-100, 50], [-84, 46], [-72, 44], [-54, 52], [-58, 62], [-92, 72], [-132, 74]],
    [[-125, 49], [-117, 32], [-105, 24], [-96, 16], [-90, 18], [-84, 8], [-78, 9], [-80, 24], [-96, 31], [-112, 38]],
    [[-81, 12], [-70, 8], [-60, -4], [-50, -20], [-60, -38], [-70, -55], [-78, -40], [-73, -18]],
    [[-18, 34], [-6, 52], [18, 58], [45, 52], [60, 42], [38, 30], [28, 18], [32, 0], [24, -18], [16, -35], [0, -34], [-10, -10], [-16, 12]],
    [[-10, 72], [20, 72], [42, 66], [78, 58], [104, 55], [142, 58], [174, 66], [178, 48], [144, 42], [116, 32], [104, 20], [80, 8], [68, 24], [42, 28], [30, 40], [8, 44], [-8, 42]],
    [[68, 24], [78, 8], [90, 7], [102, 1], [112, -8], [104, -18], [86, -4], [72, 8]],
    [[112, -12], [154, -10], [154, -36], [132, -44], [114, -30]],
    [[42, 34], [50, 28], [58, 22], [48, 14], [42, 20]],
    [[130, 44], [144, 42], [146, 34], [136, 32], [128, 38]],
    [[-52, 74], [-28, 78], [-18, 68], [-42, 62]]
  ];

  function createRoadmap(data) {
    state.data = data;
    document.body.classList.toggle("world-mode", isWorld());
    document.title = data.title + " · ChinaAI Roadmaps";
    document.documentElement.style.setProperty("--cyan", data.theme?.cyan || "#6feee0");
    document.documentElement.style.setProperty("--green", data.theme?.green || "#78e08f");
    document.documentElement.style.setProperty("--amber", data.theme?.amber || "#ffd166");
    document.documentElement.style.setProperty("--coral", data.theme?.coral || "#ff7b6b");
    document.documentElement.style.setProperty("--pink", data.theme?.pink || "#ff8ac8");
    mountShell();
    bindCanvas();
    renderStats();
    renderControls();
    renderFilters();
    renderList();
    renderDefaultDetail();
    requestAnimationFrame(draw);
  }

  function mountShell() {
    $("app").innerHTML = `
      <canvas class="atlas-canvas" id="stage" aria-label="${esc(state.data.title)} interactive map"></canvas>
      <section class="panel hero">
        <p class="kicker">${esc(state.data.kicker)}</p>
        <h1>${esc(state.data.title)}</h1>
        <p>${esc(state.data.subtitle)}</p>
        <nav class="site-nav" aria-label="Roadmap navigation">
          ${(state.data.nav || []).map((n) => `<a href="${esc(n.href)}">${esc(n.label)}</a>`).join("")}
        </nav>
      </section>
      <section class="stats panel" id="stats"></section>
      <section class="controls panel" id="controls"></section>
      <aside class="panel left-panel">
        <h2>${esc(state.data.listTitle || "Atlas Index")}</h2>
        <input class="search" id="search" placeholder="${esc(state.data.searchPlaceholder || "Search...")}" />
        <div class="rank-list" id="rankList"></div>
      </aside>
      <aside class="panel right-panel" id="detail"></aside>
      <section class="caption">
        <b>${esc(state.data.captionTitle || state.data.title)}</b>
        <span>${esc(state.data.caption || "Click a node to inspect the ecosystem layer, evidence and planning details.")}</span>
      </section>
      <section class="panel bottom-panel">
        <div class="chips" id="chips"></div>
        <div class="legend" id="legend"></div>
      </section>
      <div class="tooltip" id="tooltip"></div>
      <div class="toast" id="toast"></div>
      <div class="footer-hud"><b id="fps">-- FPS</b><span>Drag · Wheel · Click · / Search</span></div>
    `;
  }

  function bindCanvas() {
    state.canvas = $("stage");
    state.ctx = state.canvas.getContext("2d");
    resize();
    window.addEventListener("resize", resize);

    state.canvas.addEventListener("pointerdown", (e) => {
      state.pointer.down = true;
      state.pointer.lastX = e.clientX;
      state.pointer.lastY = e.clientY;
      state.pointer.moved = false;
      state.canvas.setPointerCapture(e.pointerId);
    });

    state.canvas.addEventListener("pointermove", (e) => {
      state.pointer.x = e.clientX;
      state.pointer.y = e.clientY;
      if (state.pointer.down) {
        const dx = e.clientX - state.pointer.lastX;
        const dy = e.clientY - state.pointer.lastY;
        if (Math.abs(dx) + Math.abs(dy) > 2) state.pointer.moved = true;
        state.targetPanX += dx;
        state.targetPanY += dy;
        state.pointer.lastX = e.clientX;
        state.pointer.lastY = e.clientY;
      } else {
        state.hover = nearestNode(e.clientX, e.clientY, 24);
        drawTooltip();
      }
    });

    state.canvas.addEventListener("pointerup", (e) => {
      state.pointer.down = false;
      if (!state.pointer.moved) {
        const hit = nearestNode(e.clientX, e.clientY, 30);
        if (hit) selectNode(hit);
      }
    });

    state.canvas.addEventListener("pointerleave", () => {
      state.hover = null;
      drawTooltip();
    });

    state.canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      const next = state.targetZoom * (e.deltaY > 0 ? 0.9 : 1.1);
      state.targetZoom = clamp(next, 0.72, 2.45);
      toast(`Zoom ${state.targetZoom.toFixed(2)}x`);
    }, { passive: false });

    $("search").addEventListener("input", (e) => {
      state.query = e.target.value.trim().toLowerCase();
      renderList();
      const direct = filteredNodes().find((n) => searchable(n).includes(state.query));
      if (state.query.length >= 2 && direct) selectNode(direct, false);
    });

    document.addEventListener("keydown", (e) => {
      if (/input|select|textarea/i.test(e.target.tagName)) return;
      const k = e.key.toLowerCase();
      if (k === "/") {
        e.preventDefault();
        $("search").focus();
      }
      if (k === "h") resetView();
      if (k === "l") toggleMode("labels");
      if (k === "d") toggleMode("density");
      if (k === "f") toggleMode("flow");
      if (k === "m") toggleMode("matrix");
      if (k === "escape") {
        state.selected = null;
        renderDefaultDetail();
        renderList();
      }
    });
  }

  function resize() {
    state.dpr = Math.max(1, Math.min(1.5, window.devicePixelRatio || 1));
    state.w = window.innerWidth;
    state.h = window.innerHeight;
    state.canvas.width = Math.round(state.w * state.dpr);
    state.canvas.height = Math.round(state.h * state.dpr);
    state.canvas.style.width = state.w + "px";
    state.canvas.style.height = state.h + "px";
    state.ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
  }

  function renderStats() {
    $("stats").innerHTML = (state.data.stats || []).map((s) => `
      <div class="stat"><b>${esc(s.value)}</b><span>${esc(s.label)}</span></div>
    `).join("");
  }

  function renderControls() {
    $("controls").innerHTML = `
      <button class="control-button" data-mode="home">H 全局</button>
      <button class="control-button ${state.flow ? "active" : ""}" data-mode="flow">F 关系</button>
      <button class="control-button ${state.density ? "active" : ""}" data-mode="density">D 密度</button>
      <button class="control-button ${state.labels ? "active" : ""}" data-mode="labels">L 标签</button>
      <button class="control-button ${state.matrix ? "active" : ""}" data-mode="matrix">M 矩阵</button>
      <button class="export-button" data-export="json">JSON</button>
      <button class="export-button" data-export="csv">CSV</button>
    `;
    $("controls").querySelectorAll("[data-mode]").forEach((btn) => {
      btn.onclick = () => {
        const mode = btn.dataset.mode;
        if (mode === "home") resetView();
        else toggleMode(mode);
      };
    });
    $("controls").querySelectorAll("[data-export]").forEach((btn) => {
      btn.onclick = () => exportData(btn.dataset.export);
    });
  }

  function toggleMode(mode) {
    state[mode] = !state[mode];
    renderControls();
    toast(`${mode}: ${state[mode] ? "on" : "off"}`);
  }

  function renderFilters() {
    const categories = ["All", ...state.data.categories];
    $("chips").innerHTML = categories.map((c) => `
      <button class="chip ${state.activeCategory === c ? "active" : ""}" data-category="${esc(c)}">${esc(c)}</button>
    `).join("");
    $("chips").querySelectorAll("[data-category]").forEach((btn) => {
      btn.onclick = () => {
        state.activeCategory = btn.dataset.category;
        renderFilters();
        renderList();
        toast(`Filter ${state.activeCategory}`);
      };
    });
    $("legend").innerHTML = state.data.categories.map((c) => `
      <span><i style="--c:${esc(colorFor(c))}"></i>${esc(c)}</span>
    `).join("");
  }

  function searchable(n) {
    return [n.name, n.subtitle, n.category, n.lane, ...(n.tags || [])].join(" ").toLowerCase();
  }

  function filteredNodes() {
    return state.data.nodes.filter((n) => {
      const byCategory = state.activeCategory === "All" || n.category === state.activeCategory;
      const byQuery = !state.query || searchable(n).includes(state.query);
      return byCategory && byQuery;
    });
  }

  function renderList() {
    if (isWorld()) {
      renderCountryList();
      return;
    }
    const nodes = filteredNodes().slice().sort((a, b) => (b.score || 0) - (a.score || 0) || a.name.localeCompare(b.name));
    const max = Math.max(...state.data.nodes.map((n) => n.score || 1), 1);
    $("rankList").innerHTML = nodes.map((n) => {
      const active = state.selected && state.selected.id === n.id ? "active" : "";
      const w = Math.round(((n.score || 0) / max) * 100);
      return `<button class="rank-item ${active}" data-id="${esc(n.id)}">
        <span><b>${esc(n.name)}</b><small>${esc(n.subtitle || n.category)} · ${esc(n.lane || "")}</small></span>
        <strong class="rank-score">${esc(n.score || "")}</strong>
        <span class="progress"><i style="--w:${w}%"></i></span>
      </button>`;
    }).join("") || `<div class="detail-block"><p>No results.</p></div>`;
    $("rankList").querySelectorAll("[data-id]").forEach((btn) => {
      btn.onclick = () => selectNode(state.data.nodes.find((n) => n.id === btn.dataset.id));
    });
  }

  function countryStats() {
    const map = new Map();
    for (const n of filteredNodes()) {
      const country = n.country || "Unknown";
      const cur = map.get(country) || { country, nodes: [], score: 0, categories: new Set() };
      cur.nodes.push(n);
      cur.score += n.score || 0;
      cur.categories.add(n.category);
      map.set(country, cur);
    }
    return [...map.values()].map((d) => ({
      ...d,
      count: d.nodes.length,
      orgs: new Set(d.nodes.map((n) => n.org || n.name)).size,
      avgScore: Math.round(d.score / Math.max(1, d.nodes.length)),
      categories: [...d.categories]
    })).sort((a, b) => b.count - a.count || b.avgScore - a.avgScore || a.country.localeCompare(b.country));
  }

  function renderCountryList() {
    const stats = countryStats();
    const max = Math.max(...stats.map((d) => d.count), 1);
    $("rankList").innerHTML = stats.map((d) => {
      const active = state.selectedCountry === d.country ? "active" : "";
      const w = Math.round((d.count / max) * 100);
      return `<button class="rank-item ${active}" data-country="${esc(d.country)}">
        <span><b>${esc(countryLabel(d.country))}</b><small>${d.orgs} orgs · ${d.count} agent nodes · ${esc(d.categories.slice(0, 3).join(" / "))}</small></span>
        <strong class="rank-score">${d.count}</strong>
        <span class="progress"><i style="--w:${w}%"></i></span>
      </button>`;
    }).join("") || `<div class="detail-block"><p>No results.</p></div>`;
    $("rankList").querySelectorAll("[data-country]").forEach((btn) => {
      btn.onclick = () => selectCountry(btn.dataset.country);
    });
  }

  function selectCountry(country) {
    const nodes = state.data.nodes.filter((n) => n.country === country && hasGeo(n));
    if (!nodes.length) return;
    state.selectedCountry = country;
    state.selected = null;
    const center = nodes.reduce((acc, n) => ({ lng: acc.lng + n.lng, lat: acc.lat + n.lat }), { lng: 0, lat: 0 });
    center.lng /= nodes.length;
    center.lat /= nodes.length;
    flyToGeo(center.lng, center.lat, nodes.length > 7 ? 1.85 : 2.35);
    renderCountryDetail(country, nodes);
    renderCountryList();
  }

  function renderCountryDetail(country, nodes) {
    const byScore = nodes.slice().sort((a, b) => (b.score || 0) - (a.score || 0));
    $("detail").innerHTML = `
      <p class="detail-kicker">Country / Agent 生态视角</p>
      <h2 class="detail-title">${esc(countryLabel(country))}</h2>
      <p class="detail-subtitle">该区域聚合了 ${nodes.length} 个 Agent OS、运行时、编程 Agent、记忆层或科研 Agent 节点。点击项目节点可以查看具体定位和路线。</p>
      <div class="badges">
        <span class="badge">${new Set(nodes.map((n) => n.org || n.name)).size} orgs</span>
        <span class="badge">${nodes.length} nodes</span>
        ${[...new Set(nodes.map((n) => n.category))].slice(0, 5).map((c) => `<span class="badge">${esc(c)}</span>`).join("")}
      </div>
      <div class="detail-grid">${byScore.slice(0, 4).map((n) => `<button class="metric-tile node-tile" data-id="${esc(n.id)}"><b>${esc(n.short || n.name)}</b><span>${esc(n.category)}</span></button>`).join("")}</div>
      <div class="detail-block"><h3>代表节点</h3><ul>${byScore.slice(0, 8).map((n) => `<li>${esc(n.name)} · ${esc(n.org || n.city || n.category)} · ${esc(n.subtitle || "")}</li>`).join("")}</ul></div>
    `;
    $("detail").querySelectorAll("[data-id]").forEach((btn) => {
      btn.onclick = () => selectNode(state.data.nodes.find((n) => n.id === btn.dataset.id));
    });
  }

  function renderDefaultDetail() {
    const d = state.data.defaultDetail || {};
    $("detail").innerHTML = `
      <p class="detail-kicker">Selected / 当前选择</p>
      <h2 class="detail-title">${esc(d.title || state.data.title)}</h2>
      <p class="detail-subtitle">${esc(d.body || state.data.subtitle)}</p>
      <div class="badges">${(d.badges || state.data.categories.slice(0, 5)).map((b) => `<span class="badge">${esc(b)}</span>`).join("")}</div>
      <div class="detail-grid">${(d.metrics || state.data.stats || []).slice(0, 4).map((m) => `<div class="metric-tile"><b>${esc(m.value)}</b><span>${esc(m.label)}</span></div>`).join("")}</div>
      ${(d.blocks || []).map(renderBlock).join("")}
    `;
  }

  function renderBlock(block) {
    if (Array.isArray(block.items)) {
      return `<div class="detail-block"><h3>${esc(block.title)}</h3><ul>${block.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul></div>`;
    }
    return `<div class="detail-block"><h3>${esc(block.title)}</h3><p>${esc(block.body)}</p></div>`;
  }

  function selectNode(node, fly = true) {
    if (!node) return;
    state.selected = node;
    state.selectedCountry = null;
    if (fly) flyTo(node);
    renderDetail(node);
    renderList();
  }

  function renderDetail(n) {
    const metrics = n.metrics || [];
    const blocks = n.blocks || [];
    $("detail").innerHTML = `
      <p class="detail-kicker">${esc(n.category)} / ${esc(n.lane || "Node")}</p>
      <h2 class="detail-title">${esc(n.name)}</h2>
      <p class="detail-subtitle">${esc(n.subtitle || "")}</p>
      <div class="badges">
        <span class="badge">${esc(n.category)}</span>
        ${n.country ? `<span class="badge">${esc(countryLabel(n.country))}</span>` : ""}
        ${n.city ? `<span class="badge">${esc(n.city)}</span>` : ""}
        ${n.org ? `<span class="badge">${esc(n.org)}</span>` : ""}
        ${n.stage ? `<span class="badge">${esc(n.stage)}</span>` : ""}
        ${n.year ? `<span class="badge">${esc(n.year)}</span>` : ""}
        ${(n.tags || []).slice(0, 6).map((t) => `<span class="badge">${esc(t)}</span>`).join("")}
      </div>
      ${metrics.length ? `<div class="detail-grid">${metrics.slice(0, 6).map((m) => `<div class="metric-tile"><b>${esc(m.value)}</b><span>${esc(m.label)}</span></div>`).join("")}</div>` : ""}
      ${blocks.map(renderBlock).join("")}
      ${n.links?.length ? `<div class="links">${n.links.map((l) => `<a class="link-button" target="_blank" rel="noopener" href="${esc(l.href)}">${esc(l.label)}</a>`).join("")}</div>` : ""}
    `;
  }

  function projectRaw(n) {
    if (isWorld() && hasGeo(n)) return projectGeo(n.lng, n.lat);
    const base = Math.min(state.w, state.h) * 0.82;
    let x = n.x;
    let y = n.y;
    if (state.matrix) {
      const ci = Math.max(0, state.data.categories.indexOf(n.category));
      const cx = state.data.categories.length <= 1 ? 0.5 : (ci + 0.5) / state.data.categories.length;
      const rank = clamp((n.score || 50) / 100, 0.08, 0.98);
      x = cx;
      y = 0.88 - rank * 0.68;
    }
    return {
      x: state.w / 2 + (x - 0.5) * base * 1.56 * state.zoom + state.panX,
      y: state.h / 2 + (y - 0.5) * base * state.zoom + state.panY
    };
  }

  function geoScale() {
    return Math.min(state.w / 2.18, state.h / 1.12) * state.zoom;
  }

  function projectGeo(lng, lat) {
    const s = geoScale();
    const x = state.w / 2 + state.panX + (lng / 180) * s * 1.08;
    const curve = Math.sin((lng / 180) * Math.PI) * Math.cos((lat / 90) * Math.PI * 0.5) * s * 0.04;
    const y = state.h / 2 + state.panY - (lat / 90) * s * 0.73 + curve;
    return { x, y };
  }

  function nodeRadius(n) {
    return (6 + clamp((n.score || 40) / 18, 1, 5)) * clamp(state.zoom, 0.82, 1.5);
  }

  function nearestNode(x, y, pad = 20) {
    let best = null;
    let bestD = Infinity;
    for (const n of filteredNodes()) {
      const p = projectRaw(n);
      const d = Math.hypot(p.x - x, p.y - y);
      if (d < nodeRadius(n) + pad && d < bestD) {
        best = n;
        bestD = d;
      }
    }
    return best;
  }

  function flyTo(n) {
    if (isWorld() && hasGeo(n)) {
      flyToGeo(n.lng, n.lat, 2.25);
      return;
    }
    const p = projectRaw(n);
    state.targetPanX += state.w / 2 - p.x;
    state.targetPanY += state.h / 2 - p.y;
    state.targetZoom = clamp(state.targetZoom * 1.12, 0.84, 2.1);
  }

  function flyToGeo(lng, lat, zoom = 2.2) {
    const nextZoom = clamp(zoom, 0.82, 2.65);
    const s = Math.min(state.w / 2.18, state.h / 1.12) * nextZoom;
    const curve = Math.sin((lng / 180) * Math.PI) * Math.cos((lat / 90) * Math.PI * 0.5) * s * 0.04;
    state.targetZoom = nextZoom;
    state.targetPanX = -(lng / 180) * s * 1.08;
    state.targetPanY = (lat / 90) * s * 0.73 - curve;
  }

  function resetView() {
    state.targetPanX = 0;
    state.targetPanY = 0;
    state.targetZoom = 1;
    state.selected = null;
    state.selectedCountry = null;
    renderDefaultDetail();
    renderList();
    toast("Global view");
  }

  function draw(t = 0) {
    const ctx = state.ctx;
    const dt = state.lastTime ? t - state.lastTime : 16;
    state.lastTime = t;
    state.fps = state.fps * 0.92 + (1000 / Math.max(16, dt)) * 0.08;
    const fps = $("fps");
    if (fps) fps.textContent = Math.round(state.fps) + " FPS";

    state.panX += (state.targetPanX - state.panX) * 0.12;
    state.panY += (state.targetPanY - state.panY) * 0.12;
    state.zoom += (state.targetZoom - state.zoom) * 0.1;

    ctx.clearRect(0, 0, state.w, state.h);
    drawBackdrop(ctx, t);
    if (isWorld()) drawWorldMap(ctx);
    else drawLanes(ctx);
    if (state.flow) drawRelations(ctx, t);
    if (state.density) drawDensity(ctx, t);
    if (isWorld() && state.density) drawWorldParticles(ctx, t);
    drawNodes(ctx, t);
    requestAnimationFrame(draw);
  }

  function drawBackdrop(ctx, t) {
    const g = ctx.createLinearGradient(0, 0, state.w, state.h);
    g.addColorStop(0, "#07100f");
    g.addColorStop(0.48, "#041012");
    g.addColorStop(1, "#030304");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, state.w, state.h);
    ctx.save();
    ctx.globalAlpha = 0.16;
    ctx.strokeStyle = "rgba(111,238,224,.24)";
    ctx.lineWidth = 1;
    const gap = 58 * state.zoom;
    for (let x = (state.panX * 0.18) % gap; x < state.w; x += gap) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, state.h);
      ctx.stroke();
    }
    for (let y = (state.panY * 0.18) % gap; y < state.h; y += gap) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(state.w, y);
      ctx.stroke();
    }
    const stars = 180;
    for (let i = 0; i < stars; i++) {
      const s = seeded(i + 3);
      const x = (seeded(i + 17) * state.w + state.panX * 0.015 + state.w) % state.w;
      const y = (seeded(i + 31) * state.h + state.panY * 0.012 + state.h) % state.h;
      ctx.globalAlpha = 0.11 + Math.sin(t * 0.001 + i) * 0.04;
      ctx.fillStyle = s > 0.92 ? "#ffd166" : "#bdeee8";
      ctx.fillRect(x, y, s > 0.92 ? 1.8 : 1, s > 0.92 ? 1.8 : 1);
    }
    ctx.restore();
  }

  function drawLanes(ctx) {
    const lanes = state.data.lanes || [];
    if (!lanes.length) return;
    ctx.save();
    ctx.textAlign = "left";
    ctx.font = "800 12px system-ui";
    for (const lane of lanes) {
      const p = projectRaw({ x: 0.08, y: lane.y });
      const p2 = projectRaw({ x: 0.92, y: lane.y });
      ctx.strokeStyle = lane.color || "rgba(255,255,255,.12)";
      ctx.globalAlpha = 0.32;
      ctx.setLineDash([8, 10]);
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 0.72;
      ctx.fillStyle = lane.color || "#9aaba9";
      ctx.fillText(lane.label, p.x, p.y - 10);
    }
    ctx.restore();
  }

  function drawWorldMap(ctx) {
    ctx.save();
    drawGraticule(ctx);
    ctx.translate(0, 10 * state.zoom);
    for (const poly of WORLD_LAND) {
      ctx.beginPath();
      poly.forEach(([lng, lat], i) => {
        const p = projectGeo(lng, lat);
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.closePath();
      ctx.fillStyle = "rgba(8, 18, 31, .58)";
      ctx.strokeStyle = "rgba(139, 184, 224, .23)";
      ctx.lineWidth = 1.1;
      ctx.shadowColor = "rgba(105, 223, 255, .12)";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;
    }
    ctx.restore();
    drawCountryGlows(ctx);
  }

  function drawGraticule(ctx) {
    ctx.save();
    ctx.strokeStyle = "rgba(155, 193, 226, .12)";
    ctx.lineWidth = 0.8;
    for (let lng = -180; lng <= 180; lng += 20) {
      ctx.beginPath();
      for (let lat = -65; lat <= 78; lat += 4) {
        const p = projectGeo(lng, lat);
        if (lat === -65) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    for (let lat = -60; lat <= 80; lat += 10) {
      ctx.beginPath();
      for (let lng = -180; lng <= 180; lng += 5) {
        const p = projectGeo(lng, lat);
        if (lng === -180) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawCountryGlows(ctx) {
    const stats = countryStats();
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (const d of stats) {
      const nodes = d.nodes.filter(hasGeo);
      if (!nodes.length) continue;
      const center = nodes.reduce((acc, n) => ({ lng: acc.lng + n.lng, lat: acc.lat + n.lat }), { lng: 0, lat: 0 });
      center.lng /= nodes.length;
      center.lat /= nodes.length;
      const p = projectGeo(center.lng, center.lat);
      const r = (36 + d.count * 12) * clamp(state.zoom, 0.78, 1.65);
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
      g.addColorStop(0, "rgba(111,238,224,.18)");
      g.addColorStop(0.42, "rgba(120,224,143,.055)");
      g.addColorStop(1, "rgba(111,238,224,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawRelations(ctx, t) {
    const nodesById = new Map(state.data.nodes.map((n) => [n.id, n]));
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (const rel of state.data.relations || []) {
      const a = nodesById.get(rel.from);
      const b = nodesById.get(rel.to);
      if (!a || !b) continue;
      if (!filteredNodes().includes(a) && !filteredNodes().includes(b)) continue;
      const pa = projectRaw(a);
      const pb = projectRaw(b);
      const color = rel.color || colorFor(a.category);
      const mid = { x: (pa.x + pb.x) / 2, y: (pa.y + pb.y) / 2 - 40 * state.zoom };
      ctx.strokeStyle = hexToRgba(color, 0.22);
      ctx.lineWidth = rel.weight || 1.2;
      ctx.beginPath();
      ctx.moveTo(pa.x, pa.y);
      ctx.quadraticCurveTo(mid.x, mid.y, pb.x, pb.y);
      ctx.stroke();
      const u = (t * 0.00015 + seeded(hash(rel.from + rel.to))) % 1;
      const q = quad(pa, mid, pb, u);
      ctx.fillStyle = hexToRgba(color, 0.85);
      ctx.beginPath();
      ctx.arc(q.x, q.y, 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawDensity(ctx, t) {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (const n of filteredNodes()) {
      if (isWorld() && state.selectedCountry && n.country !== state.selectedCountry) continue;
      const p = projectRaw(n);
      const r = (22 + (n.score || 40) * 0.42) * state.zoom;
      const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
      const color = colorFor(n.category);
      g.addColorStop(0, hexToRgba(color, 0.16));
      g.addColorStop(0.45, hexToRgba(color, 0.045));
      g.addColorStop(1, hexToRgba(color, 0));
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  function drawWorldParticles(ctx, t) {
    ctx.save();
    ctx.globalCompositeOperation = "lighter";
    for (const n of filteredNodes()) {
      if (!hasGeo(n)) continue;
      if (state.selectedCountry && n.country !== state.selectedCountry) continue;
      const p = projectRaw(n);
      const count = Math.min(32, 8 + Math.round((n.score || 50) / 6));
      const color = colorFor(n.category);
      for (let i = 0; i < count; i++) {
        const seed = hash(n.id + ":" + i);
        const a = seeded(seed) * Math.PI * 2 + t * 0.00012 * (seeded(seed + 1) - 0.5);
        const radius = (10 + Math.pow(seeded(seed + 2), 0.55) * 58) * clamp(state.zoom, 0.76, 1.7);
        const x = p.x + Math.cos(a) * radius;
        const y = p.y + Math.sin(a) * radius * 0.58;
        const size = 0.8 + seeded(seed + 3) * 2.1;
        const alpha = 0.18 + seeded(seed + 4) * 0.42;
        ctx.fillStyle = hexToRgba(color, alpha);
        if (seeded(seed + 5) > 0.91) {
          ctx.beginPath();
          ctx.moveTo(x, y - size * 1.5);
          ctx.lineTo(x + size * 1.25, y + size);
          ctx.lineTo(x - size * 1.25, y + size);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
    ctx.restore();
  }

  function drawNodes(ctx, t) {
    ctx.save();
    for (const n of filteredNodes()) {
      const p = projectRaw(n);
      if (p.x < -80 || p.x > state.w + 80 || p.y < -80 || p.y > state.h + 80) continue;
      const color = colorFor(n.category);
      const selected = state.selected && state.selected.id === n.id;
      const hover = state.hover && state.hover.id === n.id;
      const dimmed = isWorld() && state.selectedCountry && n.country !== state.selectedCountry && !selected;
      const r = nodeRadius(n) * (selected ? 1.4 : hover ? 1.22 : 1);
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      ctx.globalAlpha = dimmed ? 0.28 : 1;
      ctx.shadowColor = color;
      ctx.shadowBlur = selected ? 26 : hover ? 18 : 10;
      ctx.fillStyle = color;
      ctx.beginPath();
      if (n.shape === "diamond") {
        ctx.moveTo(p.x, p.y - r);
        ctx.lineTo(p.x + r, p.y);
        ctx.lineTo(p.x, p.y + r);
        ctx.lineTo(p.x - r, p.y);
        ctx.closePath();
      } else if (n.shape === "square") {
        roundPath(ctx, p.x - r, p.y - r, r * 2, r * 2, 4);
      } else {
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
      }
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = selected ? "#fff4cf" : hexToRgba("#ffffff", 0.72);
      ctx.lineWidth = selected ? 2.2 : 1;
      ctx.stroke();
      ctx.restore();

      if ((state.labels && (!isWorld() || state.zoom > 0.88 || selected || hover)) || selected || hover) {
        ctx.save();
        ctx.globalAlpha = dimmed ? 0.2 : 1;
        ctx.font = `${selected ? 900 : 800} 12px system-ui`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        const label = n.short || n.name;
        const w = Math.min(170, ctx.measureText(label).width + 16);
        const y = p.y + r + 8;
        roundPath(ctx, p.x - w / 2, y - 2, w, 21, 7);
        ctx.fillStyle = selected ? "rgba(255,209,102,.16)" : "rgba(4,7,8,.64)";
        ctx.fill();
        ctx.strokeStyle = selected ? "rgba(255,209,102,.38)" : "rgba(255,255,255,.12)";
        ctx.stroke();
        ctx.fillStyle = "#f5fbf8";
        ctx.fillText(label, p.x, y + 3);
        ctx.restore();
      }
    }
    ctx.restore();
  }

  function drawTooltip() {
    const tip = $("tooltip");
    if (!state.hover) {
      tip.style.display = "none";
      return;
    }
    tip.style.display = "block";
    tip.style.left = Math.min(state.w - 292, state.pointer.x + 14) + "px";
    tip.style.top = Math.min(state.h - 150, state.pointer.y + 14) + "px";
    tip.innerHTML = `<b>${esc(state.hover.name)}</b><span>${esc(state.hover.subtitle || "")}<br>${esc(state.hover.category)} · ${esc(state.hover.lane || "")}<br>Click to inspect</span>`;
  }

  function exportData(kind) {
    const nodes = filteredNodes();
    let text;
    let type;
    let name;
    if (kind === "csv") {
      const rows = [["name", "category", "lane", "score", "year", "subtitle"], ...nodes.map((n) => [n.name, n.category, n.lane || "", n.score || "", n.year || "", n.subtitle || ""])];
      text = rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
      type = "text/csv";
      name = `${state.data.id || "roadmap"}-export.csv`;
    } else {
      text = JSON.stringify({ exportedAt: new Date().toISOString(), nodes }, null, 2);
      type = "application/json";
      name = `${state.data.id || "roadmap"}-export.json`;
    }
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  function toast(msg) {
    const el = $("toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove("show"), 1100);
  }

  function hexToRgba(hex, alpha) {
    const h = String(hex).replace("#", "");
    const n = parseInt(h.length === 3 ? h.split("").map((x) => x + x).join("") : h, 16);
    const r = (n >> 16) & 255;
    const g = (n >> 8) & 255;
    const b = n & 255;
    return `rgba(${r},${g},${b},${alpha})`;
  }

  function quad(a, c, b, t) {
    return {
      x: (1 - t) * (1 - t) * a.x + 2 * (1 - t) * t * c.x + t * t * b.x,
      y: (1 - t) * (1 - t) * a.y + 2 * (1 - t) * t * c.y + t * t * b.y
    };
  }

  function roundPath(ctx, x, y, w, h, r) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.lineTo(x + w - rr, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + rr);
    ctx.lineTo(x + w, y + h - rr);
    ctx.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
    ctx.lineTo(x + rr, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - rr);
    ctx.lineTo(x, y + rr);
    ctx.quadraticCurveTo(x, y, x + rr, y);
  }

  window.createRoadmap = createRoadmap;
})();
