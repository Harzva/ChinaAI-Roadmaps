# 排行榜质量契约与评测

## 质量契约

本页面声称：默认 Top-K 中每个数字都可回到原始证据，并且只比较同一 benchmark 版本、subset、metric 与 protocol。输入包括 Registry、模型、系统、成绩、来源和热度信号；输出包括 catalog、热门集合、每 benchmark Top 5/10/全部排名与快照摘要。

明确不做：跨 benchmark 聚合总分、推测未披露配置、抓取受限数据、让厂商报告自动进入默认榜。

## Golden cases

`tests/fixtures/golden-ranking.json` 固定验证同分、稳定排序和竞赛排名。arXiv 分支增加两套基线：`arxiv-golden.json` 保存 5 个身份和 18 个页表成绩 case，`arxiv-pdf-golden.json` 保存 20 篇真实 PDF 的 hash、页数、文本层、候选页和安全标志。测试还覆盖 lower-is-better、版本隔离、来源降级、断裂引用和公开字段安全。每个 fixture 都在代码旁保存预期输出，CI 使用 `node --test` 重放。

## 回归闭环

1. 每次数据或代码变更运行 `npm run gates`。
2. 失败先按 `FAILURE_TAXONOMY.md` 分类，再补最小复现 fixture。
3. 修复后同时更新测试、变更日志和必要的 caveat。
4. 只有 schema、构建、golden tests、链接结构和公开面扫描全部通过才能发布。

## 发布门槛

- 阻断：无来源、引用断裂、版本混排、非确定性 Top-K、敏感字段或本地私有路径。
- 警告：在线来源暂时不可达、非默认榜的配置缺失、热门候选证据不足。
- 发布需记录输入快照哈希、条目数、合格成绩数与回滚提交。

当前契约覆盖 happy、edge、ambiguous 和 failure 四类输入；稳定性来自纯函数排序、固定构建时间和 Git 版本化快照。

## arXiv discovery 评测范围

用户行为契约是：能够发现新 benchmark/protocol、看到 PDF 页表证据、区分 New/Rising/Hot，同时任何 paper-reported 或 OCR-only 数字都不会自动进入 Top-K。20 篇 PDF 覆盖 benchmark、memory、GUI、具身、安全、视频和 coding-agent 论文；其中 HumanForge 没有可定位结果表，作为“有 benchmark 身份但无成绩表”的失败关闭 case 保留。

| Factor | Score | 证据 | 当前限制 |
| --- | ---: | --- | --- |
| Quality Contract | 5 | schema、来源政策、rankingEligible 硬门禁 | 无 |
| Golden Cases | 5 | 20 篇真实 PDF、23 个身份/claim case | 仍需持续加入扫描件与跨页表 |
| Regression Loop | 5 | `npm run gates`、确定性公开产物、CI diff | live arXiv 网络结果只上传 artifact |
| Failure Taxonomy | 4 | OCR、小数点、身份、版本、表格与来源分类 | 需要积累更多人工复核误差样本 |
| Release Gates | 5 | schema、ledger、坐标、公开面、安全、Pages smoke | 人工审核决定仍通过 Git 提交完成 |

总分：24/25（Release-grade）。这里的分数衡量评测系统成熟度，不是论文或模型得分。
