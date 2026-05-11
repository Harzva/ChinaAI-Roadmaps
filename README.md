# AI Paper Roadmaps

> 用流程图、时间线和问答式解析，快速读懂 GLM、Kimi、DeepSeek、MiniMax 等大模型论文路线。

这个项目整理了四条中文大模型技术路线的论文分析、技术流程图和可下载论文入口，适合作为研究者、工程师和内容创作者的论文导读资料库。

## 这个工程里有什么

| 模块 | 入口 | 内容 |
| --- | --- | --- |
| 完整教程页 | [index.html](index.html) | 按学习路径组织的交互式导航页 |
| 论文下载索引 | [paper-downloads.md](paper-downloads.md) | arXiv 阅读页与 PDF 下载地址 |
| 总览报告 | [report.md](report.md) | GLM、Kimi、DeepSeek 的英文综合分析 |
| 中文专题导航 | [analysis_page.html](analysis_page.html) | 四个模型家族的中文专题入口 |
| GLM 路线 | [glm_analysis.md](glm_analysis.md) | GLM 到 GLM-5 的技术演进 |
| Kimi 路线 | [kimi_analysis.md](kimi_analysis.md) | k1.5、Muon、K2、K2.5 的路线 |
| DeepSeek 路线 | [deepseek_analysis.md](deepseek_analysis.md) | LLM、MoE、Coder、Math、VL、R1、V3 |
| MiniMax 路线 | [minimax_analysis.md](minimax_analysis.md) | M1、M2.5、长上下文和真实环境 RL |

## 是否有论文下载地址

有。原工程中主要下载线索集中在 [report.md](report.md) 的 `Reference Links` 部分，形式多为 arXiv `abs` 阅读页。整理后已补充为直接 PDF 下载入口：

- 已提取并验证 43 个 arXiv PDF 地址，状态码均为 `200`。
- 已补充 MiniMax-M1 的 arXiv/PDF 地址：`2506.13585`。
- MiniMax-M2.5 目前更像官方技术/产品报告页，暂未整理到 arXiv PDF；教程页中保留官方报告入口。

完整列表见 [paper-downloads.md](paper-downloads.md)。

## 推荐学习路径

1. 先打开 [index.html](index.html)，用教程页了解四条路线的整体结构。
2. 阅读每个家族的 `*_analysis.md`，先把时间线和关键技术词串起来。
3. 按 [paper-downloads.md](paper-downloads.md) 下载原论文，优先读摘要、方法图和实验表。
4. 回到单篇论文解析页，用问答部分检查自己是否理解了核心贡献。
5. 最后查看 `*_flowchart_final.svg`，把技术演进整理成自己的笔记或分享稿。

## 适合谁

- 想系统了解中文大模型路线的研究者
- 需要快速做论文分享的学生和工程师
- 关注 MoE、长上下文、强化学习、Agentic AI 的产品和技术团队
- 想把论文路线转成图文内容、课程或知识库的创作者

## 本地查看

直接用浏览器打开根目录的 [index.html](index.html) 即可。所有图片和分析页都是静态文件，不需要额外构建。

## 命名与定位

仓库建议名：`awesome-ai-paper-roadmaps`

这个名字兼顾了 `awesome` 生态的传播性、`AI paper` 的搜索关键词，以及 `roadmaps` 对时间线/流程图内容的准确描述。

