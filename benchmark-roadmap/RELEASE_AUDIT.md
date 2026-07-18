# Release Audit — 1.2.0

发布日期：2026-07-18

- 数据范围：237 个唯一 Registry 条目；24 个 canonical-source、209 个 implementation-index、4 个 paper-evidence/collecting 记录。
- 目录快照：EleutherAI LM Evaluation Harness commit `f4d4b3de3ee6741a7151a9fe74945ee515262f4c`；210 个任务目录中导入 209 个，1 个重复身份自动拒绝。
- 默认成绩：仅 `official` / `independent` 且 `comparable`。
- 生成：`npm run gates` 可在干净 Node 20+ 环境重建并验证。
- 安全：公开 JSON 采用结果字段 allowlist 和凭据/内部字段/私有路径 denylist。
- 回滚：GitHub Pages 产物绑定 Git commit；回滚时 revert 发布提交并重新运行 Pages workflow。
- 已知限制：implementation-index 条目只证明可信评测框架中存在对应实现，不替代原论文/许可证/协议审核；这些条目明确显示“等待来源合格成绩”。
- arXiv 增量：5 个精读候选、18 条页表坐标 claim、20 篇真实 PDF golden baseline；paper-reported 与 OCR-only 均不得自动进入 Top-K。
- M1 Registry：完成；M2 可追溯 Top-K：完成；M3 自动更新与治理：完成基础版，计划继续扩展适配器覆盖。

## 验证证据

| 检查 | 结果 |
| --- | --- |
| Release gates | 20/20 tests；237 个榜单、10 个热门条目、16 条默认合格成绩；18 条论文 claim 全部隔离 |
| Determinism | 固定输入重复生成相同 snapshot hash；公开产物由 CI 执行 `git diff --exit-code` |
| Browser smoke | 237 项加载；paper-evidence 筛选准确返回 4 项；发现页 5 篇/18 claims/0 Top-K、Memory 筛选和 40/500-step 证据隔离均通过；控制台 0 error / 0 warning |
| Mobile | 390 × 844；发现页 `documentElement.scrollWidth === innerWidth === 390` |
| Lighthouse | Performance 97、Accessibility 100、Best Practices 100、SEO 100；TBT 0 ms |
| Secret scan | Semgrep secrets 与公开产物 denylist 必须 0 findings；公开面覆盖 247 个生成文件 |
| Workflow lint | `actionlint .github/workflows/benchmark-*.yml` 通过 |
| Adapter dry-run | arXiv fixture 发现 5 篇、Memory 1 篇，永久 ledger 5 个 versioned record；live workflow 每日只上传审核 artifact，不自动改榜 |

最终 commit、远程 workflow 和线上 smoke test 结果在发布完成后以 GitHub Actions 记录为准。
