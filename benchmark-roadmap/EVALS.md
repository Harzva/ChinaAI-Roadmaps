# 排行榜质量契约与评测

## 质量契约

本页面声称：默认 Top-K 中每个数字都可回到原始证据，并且只比较同一 benchmark 版本、subset、metric 与 protocol。输入包括 Registry、模型、系统、成绩、来源和热度信号；输出包括 catalog、热门集合、每 benchmark Top 5/10/全部排名与快照摘要。

明确不做：跨 benchmark 聚合总分、推测未披露配置、抓取受限数据、让厂商报告自动进入默认榜。

## Golden cases

`tests/fixtures/golden-ranking.json` 固定验证同分、稳定排序和竞赛排名。测试还覆盖 lower-is-better、版本隔离、来源降级、断裂引用和公开字段安全。每个 fixture 都在代码旁保存预期输出，CI 使用 `node --test` 重放。

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
