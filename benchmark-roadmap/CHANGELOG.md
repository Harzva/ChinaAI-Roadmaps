# Changelog

## 1.2.0 — 2026-07-18

- 上线 arXiv benchmark 每日发现管线：官方 API 查询、四类召回、24 小时缓存、3 秒节流、永久 version ledger 与最多 5 篇 PDF 下载。
- 新增 PDF 安全、文本层、表格页定位、Poppler 渲染和局部 Tesseract OCR 回退；建立 20 篇真实 PDF 与 23 个身份/成绩 golden cases。
- 新增 paper/candidate/claim/review 四层 schema、18 条页表坐标 claim 和逐格证据审核台；paper-reported 与 OCR-only 均 fail closed。
- Registry 从 233 增到 237：UESF-Bench、REAL-Bench、SafeRelBench 及 Cross-Episode Object-Goal Navigation protocol 以 paper-evidence/collecting 加入。
- 新增 New/Rising/Hot 统计、Memory watchlist、每日/周报、知乎/微信内容素材包和每日 GitHub Actions 审核产物。

## 1.1.0 — 2026-07-18

- Registry 从 24 项扩展到 233 项：保留 24 项 canonical-source 记录，新增 209 项 commit-pinned implementation index。
- 新增 EleutherAI LM Evaluation Harness 目录同步器、上游快照、任务级 GitHub 路径与内容哈希。
- 新增 200+ 数量门禁、来源反向引用、上游 commit、目录路径和 `collecting` 状态校验。
- 页面新增登记深度筛选、来源阶段标识、233 项覆盖统计和每次 50 项渐进加载；实现目录条目不会自动进入 Top-K。

## 1.0.0 — 2026-07-18

- 建立 24 项 Benchmark Registry、模型/系统/成绩/来源四层数据模型和 JSON Schema。
- 首批发布 SWE-bench Verified、Terminal-Bench 2.1、OSWorld v2、LiveBench 的来源可追溯榜单。
- 增加透明热度计算、Top 5/10/全部、来源审计、模型比较与 Benchmark Map 共享数据。
- 增加采集适配器、确定性构建、golden evals、安全扫描、GitHub Actions 与 Pages 发布门槛。
- 保留旧 Benchmark Map URL，并把探索地图迁移到 `map.html`。
