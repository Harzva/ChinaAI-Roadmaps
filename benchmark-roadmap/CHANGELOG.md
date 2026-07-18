# Changelog

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
