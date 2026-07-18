# Contributing benchmark data

提交前请先阅读 `SOURCE_POLICY.md` 和 `COMPARABILITY.md`。

1. 在 `data/benchmarks.json` 使用稳定小写 ID 建档；版本和 subset 必须明确。
2. 在 `data/sources.json` 登记原始来源及许可说明。
3. 模型、系统、结果分别加入对应文件；Agent 结果必须披露 harness 和 attempts。
4. 运行 `npm run gates`，确认公开输出中没有敏感字段或本地路径。
5. 在 `CHANGELOG.md` 记录新增、降级、更正或撤回。

arXiv 论文候选先进入 `data/arxiv/` staging。审核时必须提交 arXiv version、PDF SHA-256、页码、表号、行列、metric 和运行配置；审核决定写入 `reviews.json`。Agent 预审可以把明确身份送入 `paper-evidence / collecting`，但只有 `reviewerKind: human` 的二次复核和现有来源资格门槛都通过后，成绩才可能进入正式 `results.json`。公开审核台可复制 review JSON 模板。

不得提交 token、Cookie、`.env`、访问文件、原始聊天记录或受限制测试数据。机器特定配置留在本地，不进入公开仓库。

维护节奏：来源审计每周自动运行；Registry 和榜单通过 Pull Request 更新；默认榜单的来源升级/降级需要一名维护者复核。里程碑采用 M1 Registry、M2 可追溯 Top-K、M3 自动更新与治理，三者均已在 v1.0 建立基础闭环。
