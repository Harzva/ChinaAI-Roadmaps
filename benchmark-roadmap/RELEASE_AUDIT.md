# Release Audit — 1.0.0

发布日期：2026-07-18

- 数据范围：24 个 Registry 条目；首发 Agent 为主，General Registry 为辅。
- 默认成绩：仅 `official` / `independent` 且 `comparable`。
- 生成：`npm run gates` 可在干净 Node 20+ 环境重建并验证。
- 安全：公开 JSON 采用结果字段 allowlist 和凭据/内部字段/私有路径 denylist。
- 回滚：GitHub Pages 产物绑定 Git commit；回滚时 revert 发布提交并重新运行 Pages workflow。
- 已知限制：GAIA、τ²-bench、WebArena 等已建档但尚无符合本项目口径的默认 Top-K；它们明确显示“等待来源合格成绩”。
- M1 Registry：完成；M2 可追溯 Top-K：完成；M3 自动更新与治理：完成基础版，计划继续扩展适配器覆盖。

## 验证证据

| 检查 | 结果 |
| --- | --- |
| Release gates | 12/12 tests；24 个榜单、10 个热门条目、16 条默认合格成绩 |
| Determinism | 固定输入重复生成相同 snapshot hash；公开产物由 CI 执行 `git diff --exit-code` |
| Browser smoke | 热门 → Top-K、模型详情、共同 benchmark 比较、Map bridge 均通过；控制台 0 error |
| Mobile | 390 × 844；`documentElement.scrollWidth === innerWidth` |
| Lighthouse | Performance 97、Accessibility 100、Best Practices 100、SEO 100；TBT 0 ms |
| Secret scan | Semgrep secrets：42 rules / 79 targets / 0 findings；公开 JSON denylist：29 files passed |
| Workflow lint | `actionlint .github/workflows/benchmark-*.yml` 通过 |
| Adapter dry-run | 外部网络不可达时退出为警告并保留已验证快照；Epoch 公开源本机探测成功，定时 workflow 负责完整在线审计 |

最终 commit、远程 workflow 和线上 smoke test 结果在发布完成后以 GitHub Actions 记录为准。
