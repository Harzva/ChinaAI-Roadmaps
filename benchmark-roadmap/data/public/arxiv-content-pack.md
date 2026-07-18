# arXiv Benchmark 内容素材包

> 日期：2026-07-18 · 5 篇论文 · 5 个候选 · 18 条成绩 claim

所有数字均为论文作者报告，未自动进入 Top-K。

## VisualProbe

- 选题：视觉 Agent 不是看得越久越好：4-turn 预算下发生了什么
- 选题：旧 benchmark 在新论文里出现时，怎样回溯真正来源
- 状态：source_audit
- 来源：https://arxiv.org/abs/2607.14547v1
- 证据：Mini-o3 + Qwen2.5-VL-7B · accuracy 36.7% · PDF p.7 Table 1
- 证据：AdaTurn + Qwen2.5-VL-7B · accuracy 47.6% · PDF p.7 Table 1

## REAL-Bench

- 选题：没有上帝视角的机器人 Agent，真实部署要过哪三关
- 选题：REAL-Bench 的 241 项任务如何检验探索、操作与意图澄清
- 状态：ready_for_draft
- 来源：https://arxiv.org/abs/2607.13653v1
- 证据：REAL Ours-8B-SFT+RL · success rate 56.9% · PDF p.10 Table 1
- 证据：REAL physical robot · success rate 78.3% · PDF p.13 Table 2
- 证据：REAL physical robot · SPL 63.1% · PDF p.13 Table 2

## SafeRelBench

- 选题：机器人完成任务就安全吗？过程级空间风险如何评测
- 选题：对象识别正确，动作关系仍可能出错
- 状态：ready_for_draft
- 来源：https://arxiv.org/abs/2607.14543v1
- 证据：Qwen2.5-72B · SSR 0.42ratio · PDF p.8 Table 2
- 证据：GPT-5.4 · SSR 0.49ratio · PDF p.8 Table 2
- 证据：Claude-4.6 · SSR 0.38ratio · PDF p.8 Table 2

## Cross-Episode Object-Goal Navigation

- 选题：Agent 每次进房间都失忆？跨 episode memory 提升了多少
- 选题：为什么一篇论文的新 protocol 不能直接算成新 benchmark
- 状态：ready_for_draft
- 来源：https://arxiv.org/abs/2607.14514v1
- 证据：VTM-Nav + Qwen3-VL-Plus · SR 59.6% · PDF p.8 Table 1
- 证据：VTM-Nav + Qwen3-VL-Plus · SPL 31.8% · PDF p.8 Table 1
- 证据：VTM-Nav + Qwen3-VL-Plus · SR 65.3% · PDF p.8 Table 1
- 证据：VTM-Nav + Qwen3-VL-Plus · SR 72% · PDF p.8 Table 1

## UESF-Bench

- 选题：先找到人，再一直跟住：具身 Agent 新基准难在哪里
- 选题：搜索和跟随为什么不能再拆成两个榜单
- 状态：ready_for_draft
- 来源：https://arxiv.org/abs/2607.13621v1
- 证据：DualHead-TD · TSR 0.35ratio · PDF p.7 Table 1
- 证据：DualHead-TD · Search SPL 0.53ratio · PDF p.7 Table 1
- 证据：DualHead-TD · TSR 0.2ratio · PDF p.8 Table 2
- 证据：DualHead-TD · Search SPL 0.55ratio · PDF p.8 Table 2
