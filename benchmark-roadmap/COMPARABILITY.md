# 可比性与排名资格

排行榜的最小分组键是：

`benchmark_id + version + subset + metric + protocol`

任何一个字段不同，就不能进入同一默认排名。因此 Terminal-Bench 2.0/2.1、SWE-bench Full/Lite/Verified/Pro、OSWorld v1/v2 都是独立榜单。

## 三档判断

- `comparable`：版本、subset、metric、protocol 和关键运行配置明确，来源为官方或标准化独立评测。
- `partially_comparable`：成绩可展示，但预算、harness 或图表转录仍需确认。
- `not_comparable`：版本或协议不明，或指标定义不同。

默认 Top-K 只读取第一档。Agent 系统必须展示模型、scaffold、harness、reasoning effort、attempts/pass@k，以及已披露的 token、时间、步骤或美元预算。未披露值写成 `not_disclosed` 或 `null`，不能推测。

## 排名规则

1. 按 metric 的 `direction` 排序；higher-is-better 降序，lower-is-better 升序。
2. 同分共享名次；下一名使用竞赛排名，例如 1、1、3。
3. 同分展示顺序由评测日期降序、再由稳定 system ID 决定，不改变并列关系。
4. 置信区间重叠会显示提示，但不会私自重算名次。
5. 缺失分数不参与排名；厂商和社区报告不与默认榜平均。

榜单回答“在这一明确评测设置下，哪些系统得分最高”，不回答跨 benchmark 的“全球最佳模型”。
