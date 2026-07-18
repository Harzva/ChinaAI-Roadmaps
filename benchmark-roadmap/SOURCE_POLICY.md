# Benchmark 来源政策

本项目发布的是可追溯的榜单事实与来源索引，不镜像受限制数据库，也不绕过登录、访问控制或测试集保密要求。

## 证据等级

默认 Top-K 只接受 `official` 和 `independent`，且成绩必须标记为 `comparable`。`vendor_reported`、`community` 和 `unverified` 可以出现在“其他报告”，但不会进入默认排名。

每条可排名成绩必须带有 HTTPS 原始来源、评测日期、抓取时间、内容哈希、明确版本、subset、metric、protocol 以及运行配置。截图、二手转载、无日期页面和版本不明记录降级为 `unverified`。

Registry 使用两级登记深度：`canonical_source` 表示已经为条目建立原始或项目官方来源；`implementation_index` 表示已在可信评测框架的锁定 commit 中核验实现目录，但原论文、数据集许可证、精确版本与协议仍待二次审核。后者只能保持 `collecting`，不能仅凭目录存在进入 Top-K。

当前大规模目录快照来自 [EleutherAI LM Evaluation Harness](https://github.com/EleutherAI/lm-evaluation-harness)。快照保存 commit、任务路径和内容哈希；同步命令为 `npm run sync:catalogs`。这是一条实现存在性证据，不冒充各 benchmark 作者的官方背书。

论文增量发现采用独立 staging 与人工审核队列。PDF/OCR 抽取结果只是一条 `result claim`，必须带 arXiv version、PDF hash、页码、表号、行列和运行配置；未经人工复核不得写入公开成绩。论文提出的方法名也不会自动登记为 benchmark。完整方案见 [`ARXIV_BENCHMARK_DISCOVERY.md`](ARXIV_BENCHMARK_DISCOVERY.md)。

## 更新、更正与撤回

采集遵循 `fetch → snapshot → normalize → validate → publish`。任一来源失败时保留上一份通过验证的公开快照，禁止以空结果覆盖线上榜单。来源更正通过新增提交记录；撤回的结果保留在 Git 历史和发布审计中，页面不静默改写旧证据。

请求更正时请提交 Issue，并附 benchmark、版本、system、原始链接和需要更正的字段。维护者会复核内容哈希与上游记录，再决定更正、降级或撤回。

## 允许与禁止

- 允许：官方公开榜单、公开 API、许可证允许的可下载数据、标准化独立评测。
- 人工审核：需要明确授权的导入、结构不稳定页面、厂商模型卡。
- 禁止：凭据、Cookie、私有 API、保密测试集、规避 robots 或访问限制的抓取。

产品结构参考 [Hugging Face leaderboard data guide](https://huggingface.co/docs/hub/leaderboard-data-guide)、[Epoch AI Benchmarking Hub](https://epoch.ai/benchmarks)、[Artificial Analysis Evaluations](https://artificialanalysis.ai/evaluations) 与 [evals.report](https://evals.report/benchmarks)。参考不等于复制其数据库。
