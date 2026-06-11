# Agent Roadmap

Agent Roadmap 是 ChinaAI Roadmaps 的独立静态子页面，聚焦 AI Coding Agents、Work Agents、Agent Frameworks、Memory Layer、Context Middleware 与 Token Economy。

在线部署路径预期为：

```text
https://harzva.github.io/ChinaAI-Roadmaps/agent-roadmap/
```

## 页面目标

- 建立 TUI / IDE / Work Agent 的生态分类。
- 区分完整 Agent、Framework、Middleware、Skill、Memory Layer 和 Token Optimization Tool。
- 支撑 AgentWork / MiWork 的产品战略分析。
- 为 `paper/` 中的 survey 草稿提供数据和 taxonomy scaffold。

## 文件结构

```text
agent-roadmap/
├── index.html
├── styles.css
├── app.js
├── data/
│   └── agents.js
├── paper/
│   ├── agent-roadmap-review.tex
│   ├── references.bib
│   └── README.md
├── README.md
└── CHANGELOG.md
```

## 主要交互

- 搜索：产品名、模型、token、memory、MCP、Work、TUI、IDE。
- 筛选：分类、界面类型、成熟度、模型目标、MiWork 相关性、Token Focus。
- Card View：适合浏览研究卡片。
- Matrix View：适合横向比较。
- Detail Panel：查看 token strategy、architecture、strengths、weaknesses。
- MiWork Opportunity：Phase 0 到 Phase 5 路线图、技术模块、风险和机会。

## 数据模型

数据维护在 `data/agents.js`。

每条记录包含：

```js
id, name, category, subcategory, interfaceType, maturity, licenseType,
modelTarget, optimizationFocus, tokenStrategy, agentArchitecture,
strengths, weaknesses, bestFor, riskLevel, miWorkRelevance, link, repo, tags
```

## 设计原则

本页面采用纯静态 HTML / CSS / JS，不依赖构建系统。视觉方向参考 WorldRoadmap、Claude、Cursor、Linear 与 Mintlify，强调：

- 深色科技感
- 玻璃拟态
- Bento insight cards
- 细边框与渐变光晕
- 清晰 taxonomy
- 移动端 bottom navigation

## 验证清单

- `index.html` 可直接本地打开。
- 搜索和筛选可正常工作。
- Card View / Matrix View 可切换。
- 点击卡片可打开详情侧栏。
- `paper/agent-roadmap-review.tex` 与 `paper/references.bib` 存在。
- 根目录 `index.html` 有 `Agent Map` 入口。
