# MiniMax M3：Coding Frontier、1M 上下文与原生多模态

**MiniMax M3** 于 2026 年 6 月发布，是 MiniMax 面向长程 Agent 与真实软件工程任务推出的开放权重路线模型。官方将其核心能力概括为三件套：**Coding Frontier+、1M 上下文窗口、原生多模态**。与 M1/M2.5 偏重长上下文和真实生产力不同，M3 更强调把代码能力、长程记忆和多模态理解放到同一个模型里协同工作。

## 核心能力

* **Coding Frontier+**：官方披露 M3 在 SWE-Bench Pro、Terminal-Bench、KernelBench Hard、BrowseComp、MCP Atlas 等 Agent/Coding 评测中取得强势成绩，重点覆盖代码仓库修复、终端任务、网页搜索、工具协议和底层内核优化。
* **1M 上下文窗口**：M3 使用 MiniMax Sparse Attention（MSA）支撑百万级上下文。官方说明在 100 万上下文下，每 token 计算量约为上代模型的 1/20；prefill 阶段超过 9 倍加速，decode 阶段超过 15 倍加速。
* **原生多模态**：M3 从训练早期混合文本、图片、视频等模态，支持图片和视频输入，并能服务论文复现、代码审查、桌面应用操作等复杂场景。
* **MiniMax Code**：M3 同步更新配套代码智能体 MiniMax Code，目标是支持类似 Claude Code / Codex 的长程开发体验：读仓库、运行命令、观察报错、修复代码并持续迭代。

## MSA 为什么重要

1M 上下文的难点不是把 `context_length` 写大，而是在长输入下仍然算得动、找得准、跑得快。标准全注意力的计算成本会随序列长度接近平方增长；而真实 Agent 上下文又非常不规则，关键 token 可能来自代码仓库、终端日志、issue、README、设计稿或用户多轮反馈。

MSA 的路线是先筛选再精算：通过更精细的 KV 分块提高有效上下文覆盖，并用 KV outer gather Q 让 GPU 更连续地读取 KV 块，减少随机访存和重复加载。这使 M3 更适合仓库级代码理解、长日志回溯和论文级长文档处理。

## 与 M1 / M2.5 的关系

| 阶段 | 重点 | 代表能力 |
| --- | --- | --- |
| M1 | 开放权重、Lightning Attention、长上下文 | 1M 上下文、CISPO、测试时计算扩展 |
| M2.5 | 真实生产力与低成本 Agent | 真实环境 RL、Forge RL、编程/搜索/办公任务 |
| M3 | Frontier Agent 三件套 | Coding Frontier+、MSA、原生多模态、MiniMax Code |

## 代表评测与案例

| 项目 | 官方披露数据 / 说明 |
| --- | --- |
| SWE-Bench Pro | 59.0% |
| Terminal-Bench 2.1 | 66.0% |
| BrowseComp | 83.5% |
| MCP Atlas | 74.2% |
| KernelBench Hard | 28.8% |
| FP8 GEMM 优化案例 | 约 24 小时连续执行，1959 次工具调用，将 Hopper FP8 硬件峰值利用率推进至 71.3% |

## 资料入口

* 官方模型页：https://www.minimax.io/models/text/m3
* 官方技术报告：https://www.minimax.io/blog/minimax-m3
* M3 GitHub：https://github.com/MiniMax-AI/MiniMax-M3
* MiniMax Hugging Face：https://huggingface.co/MiniMaxAI

## 综合评价

M3 的价值不在于某一个单项指标，而在于把长程 Agent 所需的三个接口放到一起：代码能力决定执行质量，1M 上下文决定工作记忆，原生多模态决定能否理解真实工作现场。对开发者来说，M3 更像是 MiniMax 从“低成本生产力模型”走向“开放权重 Frontier Agent 基座”的一次路线升级。
