# DeepSeek-V4 技术报告分析

> **报告标题**: DeepSeek-V4: Towards Highly Efficient Million-Token Context Intelligence  
> **分析基于**: DeepSeek-AI 技术报告原文  
> **模型变体**: DeepSeek-V4-Pro (1.6T/49B), DeepSeek-V4-Flash (284B/13B)  
> **上下文长度**: 1,000,000 tokens (1M)

---

## 1. 模型概览

### 1.1 模型规格对比

| 规格项 | DeepSeek-V4-Pro | DeepSeek-V4-Flash | DeepSeek-V3.2 (对比基线) |
|--------|----------------|-------------------|------------------------|
| **总参数量** | **1.6T** | **284B** | 671B |
| **激活参数量** | **49B** | **13B** | 37B |
| **Transformer层数** | 61 | 43 | - |
| **隐藏维度 (d)** | 7,168 | 4,096 | - |
| **上下文长度** | **1M tokens** | **1M tokens** | 128K |
| **MoE routed experts** | 384 | 256 | - |
| **每token激活专家数** | 6 | 6 | - |
| **共享专家数** | 1 | 1 | - |
| **专家中间维度** | 3,072 | 2,048 | - |
| **MTP深度** | 1 | 1 | - |
| **Hash routing层数** | 前3层 | 前3层 | - |
| **mHC扩展因子 (n_hc)** | 4 | 4 | - |

### 1.2 核心架构特点

DeepSeek-V4系列在继承DeepSeek-V3的**DeepSeek MoE**框架和**Multi-Token Prediction (MTP)**策略基础上，引入了三项关键升级：

1. **混合注意力架构 (Hybrid CSA/HCA)**：结合压缩稀疏注意力与重度压缩注意力，实现百万级上下文的高效处理
2. **流形约束超连接 (mHC)**：增强传统残差连接，提升信号传播稳定性
3. **Muon优化器**：替代AdamW用于大部分模块，实现更快收敛和更强训练稳定性

---

## 2. 核心架构创新

### 2.1 Hybrid Attention: CSA + HCA

#### Compressed Sparse Attention (CSA)

CSA将**压缩**与**稀疏注意力**策略相结合：

| CSA配置项 | V4-Pro | V4-Flash |
|-----------|--------|----------|
| 压缩率 (m) | 4 | 4 |
| 序列压缩倍数 | 1/4 | 1/4 |
| Indexer query heads (n_I_h) | 64 | 64 |
| Indexer head dimension (c_I) | 128 | 128 |
| 稀疏注意力 top-k | 1,024 | 512 |
| Query heads (n_h) | 128 | 64 |
| Head dimension (c) | 512 | 512 |
| Query压缩维度 (d_c) | 1,536 | 1,024 |
| 输出投影组数 (g) | 16 | 8 |
| 中间输出维度 (d_g) | 1,024 | 1,024 |
| 滑动窗口大小 (n_win) | 128 | 128 |

**核心机制**：
- 每m个token的KV entries压缩为1个entry
- 使用**Lightning Indexer**进行稀疏选择：通过低秩方式生成indexer queries和keys，计算index score后选择top-k个压缩KV entry
- 采用**Shared Key-Value Multi-Query Attention (MQA)**：每个压缩KV entry同时作为key和value
- **Grouped Output Projection**：将n_h个输出分成g组，降低计算负担
- 额外引入**滑动窗口注意力分支**增强局部依赖建模
- 引入**Attention Sink**技术调整注意力分数

#### Heavily Compressed Attention (HCA)

HCA追求**极端压缩**，不使用稀疏注意力：

| HCA配置项 | V4-Pro | V4-Flash |
|-----------|--------|----------|
| 压缩率 (m') | 128 | 128 |
| 序列压缩倍数 | 1/128 | 1/128 |

**核心机制**：
- 每m'个token的KV entries压缩为1个entry
- 不执行重叠压缩（与CSA不同）
- 同样使用Shared KV MQA和Grouped Output Projection
- 配备滑动窗口注意力分支

#### 混合配置

| 层类型 | V4-Pro | V4-Flash |
|--------|--------|----------|
| 第1-2层 | HCA | Sliding Window Attention (纯) |
| 后续层 | CSA与HCA交错 | CSA与HCA交错 |

#### 精度优化

| 组件 | 存储/计算精度 |
|------|--------------|
| KV entries RoPE维度 | BF16 |
| KV entries 其他维度 | FP8 |
| Lightning indexer注意力计算 | FP4 |
| Index scores | BF16 (从FP32量化，99.7% recall) |

**效果**：在1M上下文设置下，KV cache size可降至BF16 GQA8基线的约**2%**。

### 2.2 Manifold-Constrained Hyper-Connections (mHC)

mHC的核心创新是将残差映射矩阵约束到**双随机矩阵流形 (Birkhoff polytope)**上：

$$B_l \in \mathcal{M} \triangleq \{M \in \mathbb{R}^{n \times n} \ | \ M\mathbf{1}_n = \mathbf{1}_n, \ \mathbf{1}_n^T M = \mathbf{1}_n^T, \ M \geq 0\}$$

**关键特性**：
- 确保映射矩阵的谱范数有界（≤1），残差变换为**非扩张性 (non-expansive)**
- 集合\(\mathcal{M}\)对乘法封闭，保证深层堆叠的稳定性
- 输入映射\(A_l\)和输出映射\(C_l\)通过Sigmoid约束为非负且有界

**动态参数化**：
- 三个线性映射参数分解为**动态 (输入相关)** 和 **静态 (输入无关)** 分量
- 通过RMSNorm扁平化输入后生成原始参数
- 使用**Sinkhorn-Knopp算法**（t_max=20次迭代）将残差映射投影到双随机矩阵流形

**工程实现**：
- 融合kernel实现训练和推理
- 选择性激活检查点策略：重计算层间隐藏状态和归一化层输入
- wall-time开销仅为1F1B流水线阶段的**6.7%**

### 2.3 Muon Optimizer

| 配置 | 设置 |
|------|------|
| 应用范围 | 除embedding、prediction head、RMSNorm权重、mHC静态偏置/门控因子外的所有模块 |
| 保留AdamW的模块 | embedding、prediction head、mHC静态参数、RMSNorm权重 |
| Muon动量 | 0.95 |
| Muon权重衰减 | 0.1 |
| 更新矩阵RMS重缩放 | 0.18 |
| Nesterov trick | 启用 |

**混合Newton-Schulz迭代**（用于正交化）：

| 阶段 | 迭代次数 | 系数 (a, b, c) | 目标 |
|------|---------|---------------|------|
| 快速收敛 | 8次 | (3.4445, -4.7750, 2.0315) | 将奇异值快速推向1 |
| 精确稳定 | 2次 | (2, -1.5, 0.5) | 将奇异值精确稳定在1 |
| **总计** | **10次** | - | - |

**关键优化**：由于CSA/HCA允许直接对queries和KV entries应用RMSNorm，有效防止了注意力logits爆炸，因此**无需使用QK-Clip技术**。

---

## 3. 基础设施优化

### 3.1 Expert Parallelism：细粒度通信-计算重叠

**核心洞察**：MoE层中通信延迟可被有效隐藏在计算之下。

| 指标 | 数值 |
|------|------|
| MoE层分解 | Dispatch → Linear-1 → Linear-2 → Combine |
| 理论加速比 (V4-Flash配置) | **1.92×** |
| 实际加速 (通用推理) | **1.50~1.73×** |
| 实际加速 (RL rollout等低延迟场景) | **最高1.96×** |

**细粒度方案**：将专家分割为多个wave，形成wave级流水线：
- 当前wave的计算、下一wave的token传输、已完成专家的result sending**三者并发**
- 开源实现：**MegaMoE**（DeepGEMM组件）

**硬件设计建议**：
- 计算-通信比阈值：C/B ≤ 2d = **6144 FLOPs/Byte**（即每GBps带宽可隐藏6.1 TFLOPs计算）
- 建议提供足够功率余量应对全并发负载
- 建议采用pull-based通信原语
- 提议用低成本元素级激活替代SwiGLU

### 3.2 TileLang：灵活高效的Kernel开发

| 特性 | 说明 |
|------|------|
| 定位 | 领域特定语言 (DSL)，平衡开发效率与运行时性能 |
| Host Codegen | 将主机端逻辑移入生成代码，CPU验证开销从数百微秒降至**<1微秒/调用** |
| SMT求解器辅助 | 集成Z3 SMT求解器进行形式化整数分析，支持向量化、屏障插入等优化 |
| 数值精度 | 默认禁用fast-math，提供显式精度近似选项；支持IEEE-754兼容内建函数 |
| 位级可复现性 | 与NVCC对齐代数简化规则，支持布局注解实现位相同输出 |

### 3.3 高性能批处理不变和确定性Kernel库

| 特性 | 实现方法 |
|------|---------|
| **批处理不变性** | 同一token无论批次位置如何，输出位相同 |
| Attention | 双kernel策略：单SM完整序列 + 多SM最终partial wave，分布式共享内存高速交换 |
| 矩阵乘法 | 全面替换cuBLAS为DeepGEMM，放弃split-k，引入优化匹配/超越标准split-k性能 |
| **确定性** | 消除原子加指令导致的非确定性累积顺序 |
| Attention反向 | 每SM分配独立累积buffer + 全局确定性求和 |
| MoE反向 | 单rank内token顺序预处理 + 多rank间buffer隔离 |
| mHC矩阵乘法 | 各split部分单独输出 + 后续kernel确定性规约 |

### 3.4 FP4 Quantization-Aware Training (QAT)

| 应用组件 | 量化策略 | 效果 |
|---------|---------|------|
| MoE专家权重 | FP4 (MXFP4) → FP8无损反量化 | 减少GPU内存占用 |
| CSA Indexer QK路径 | QK激活全程FP4缓存/加载/乘 | 加速长上下文注意力分数计算 |
| Index scores | FP32 → BF16 | top-k选择器**2×加速**，99.7% recall |

**关键特性**：FP4→FP8反量化是**无损**的，因为FP8(E4M3)比FP4(E2M1)多2个指数位，动态范围更大。整个QAT流程完全复用现有FP8训练框架。

### 3.5 训练框架其他优化

| 组件 | 优化策略 |
|------|---------|
| Muon + ZeRO | 混合ZeRO bucket分配：dense参数限制ZeRO并行度+背包算法平衡负载；MoE参数按专家独立优化，跨层展平矩阵 |
| Muon梯度通信 | MoE梯度随机舍入到BF16，通信量减半；两阶段all-to-all + FP32本地求和保证数值稳健 |
| mHC实现 | 融合kernel + 选择性激活检查点 + 调整DualPipe 1F1B重叠方案 |
| 长上下文CP | 两阶段通信：先发送最后m个未压缩KV给下一rank压缩，再all-gather收集压缩KV |
| 自动微分扩展 | 基于TorchFX的tensor级激活检查点，自动去重共享存储的tensor |

### 3.6 推理框架

**异构KV Cache布局**：

| 组件 | 管理方式 |
|------|---------|
| 经典KV Cache (CSA/HCA) | 按请求分配多个block，每block覆盖lcm(m,m')个原始token |
| State Cache (SWA + 未压缩尾部token) | 预分配固定大小池，动态分配给各序列 |

**磁盘KV Cache存储策略**（三种SWA管理方案）：

| 策略 | 特点 | 适用场景 |
|------|------|---------|
| Full SWA Caching | 存储完整SWA KV，计算零冗余 | 对存储效率要求不高的场景 |
| Periodic Checkpointing | 每p个token检查点一次，可调存储-计算权衡 | 通用场景 |
| Zero SWA Caching | 不存储SWA KV，利用CSA/HCA缓存重算最后n_win·L个token | 存储敏感场景 |

---

## 4. 预训练细节

### 4.1 数据构建

| 特性 | 详情 |
|------|------|
| **总token量** | **> 32T** (Flash: 32T, Pro: 33T) |
| 数据来源 | 数学内容、代码、网页、长文档及其他高质量类别 |
| 网页数据过滤 | 移除批量自动生成和模板化内容，缓解模型崩溃 |
| 数学/编程 | 核心组件，中期训练加入agentic数据增强编码能力 |
| 多语言 | 更大规模语料，提升长尾知识捕获 |
| 长文档 | 重点筛选科学论文、技术报告等高学术价值材料 |
| 词汇表大小 | 128K（基于V3 tokenizer，增加少量特殊token） |
| 训练策略 | 样本级attention masking（与V3不同） |

### 4.2 训练设置

#### DeepSeek-V4-Flash

| 参数 | 设置 |
|------|------|
| 优化器 | Muon (大部分) + AdamW (embedding/head/RMSNorm) |
| AdamW β₁, β₂ | 0.9, 0.95 |
| AdamW ε | 1e-20 |
| 权重衰减 | 0.1 |
| Muon动量 | 0.95 |
| Muon更新RMS重缩放 | 0.18 |
| 训练token | 32T |
| 最大batch size | 75.5M tokens |
| 学习率预热 | 前2,000步线性预热 |
| 峰值学习率 | 2.7×10⁻⁴ |
| 结束学习率 | 2.7×10⁻⁵（cosine衰减） |
| 序列长度扩展 | 4K → 16K → 64K → 1M |
| 密集注意力warmup | 前1T tokens |
| 稀疏注意力引入 | 64K序列长度时 |
| 负载平衡偏置更新速度 | 0.001 |
| 平衡loss权重 | 0.0001 |
| MTP loss权重 | 0.3（大部分时间），学习率衰减开始时降至0.1 |

#### DeepSeek-V4-Pro

| 参数 | 设置 |
|------|------|
| 训练token | 33T |
| 最大batch size | 94.4M tokens |
| 峰值学习率 | 2.0×10⁻⁴ |
| 结束学习率 | 2.0×10⁻⁵ |
| 密集注意力warmup | 比Flash更长 |
| 其他设置 | 与Flash一致 |

### 4.3 训练稳定性措施

#### Anticipatory Routing (预见式路由)

| 特性 | 说明 |
|------|------|
| 核心思想 | 解耦骨干网络和路由网络的同步更新 |
| 实现 | 步骤t使用当前参数θ_t计算特征，但路由索引使用历史参数θ_{t-Δt} |
| 基础设施优化 | 流水线编排 + EP通信重叠，额外wall-time开销约**20%** |
| 动态触发 | 自动检测loss spike → 短回滚 + 激活预见式路由 → 一段时间后恢复标准训练 |
| 总体效果 | 避免loss spike，总体额外开销可忽略，不损害模型性能 |

#### SwiGLU Clamping

| 组件 | 钳位范围 |
|------|---------|
| SwiGLU线性部分 | [-10, 10] |
| SwiGLU门控部分上限 | 10 |

**效果**：有效消除异常值，大幅稳定训练过程，不损害性能。

### 4.4 Base模型评估结果

| Benchmark (Metric) | Shots | V3.2-Base | V4-Flash-Base | V4-Pro-Base |
|-------------------|-------|-----------|---------------|-------------|
| **AGIEval (EM)** | 0-shot | 80.1 | 82.6 | 83.1 |
| **MMLU (EM)** | 5-shot | 87.8 | 88.7 | **90.1** |
| **MMLU-Redux (EM)** | 5-shot | 87.5 | 89.4 | **90.8** |
| **MMLU-Pro (EM)** | 5-shot | 65.5 | 68.3 | **73.5** |
| **MMMLU (EM)** | 5-shot | 87.9 | 88.8 | **90.3** |
| **C-Eval (EM)** | 5-shot | 90.4 | 92.1 | **93.1** |
| **CMMLU (EM)** | 5-shot | 88.9 | 90.4 | **90.8** |
| **MultiLoKo (EM)** | 5-shot | 38.7 | 42.2 | **51.1** |
| **Simple-QA verified (EM)** | 25-shot | 28.3 | 30.1 | **55.2** |
| **SuperGPQA (EM)** | 5-shot | 45.0 | 46.5 | **53.9** |
| **FACTS Parametric (EM)** | 25-shot | 27.1 | 33.9 | **62.6** |
| **TriviaQA (EM)** | 5-shot | 83.3 | 82.8 | **85.6** |
| **BBH (EM)** | 3-shot | 87.6 | 86.9 | 87.5 |
| **DROP (F1)** | 1-shot | 88.2 | 88.6 | **88.7** |
| **HellaSwag (EM)** | 0-shot | 86.4 | 85.7 | **88.0** |
| **WinoGrande (EM)** | 0-shot | 78.9 | 79.5 | **81.5** |
| **CLUEWSC (EM)** | 5-shot | 83.5 | 82.2 | **85.2** |
| **BigCodeBench (Pass@1)** | 3-shot | 63.9 | 56.8 | 59.2 |
| **HumanEval (Pass@1)** | 0-shot | 62.8 | 69.5 | **76.8** |
| **GSM8K (EM)** | 8-shot | 91.1 | 90.8 | **92.6** |
| **MATH (EM)** | 4-shot | 60.5 | 57.4 | **64.5** |
| **MGSM (EM)** | 8-shot | 81.3 | **85.7** | 84.4 |
| **CMath (EM)** | 3-shot | 92.6 | **93.6** | 90.9 |
| **LongBench-V2 (EM)** | 1-shot | 40.2 | 44.7 | **51.5** |

**关键发现**：
- V4-Flash-Base以**更少的激活参数(13B vs 37B)**和**更少的总参数(284B vs 671B)**，在绝大多数benchmark上超越了V3.2-Base
- V4-Pro-Base在几乎所有类别上全面领先，在知识密集型和长上下文评测上提升尤为显著

---

## 5. 后训练流程

### 5.1 两阶段范式

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│  Specialist     │ ──→ │   On-Policy  │ ──→ │   Unified Model │
│  Training       │     │  Distillation│     │    (Final)      │
└─────────────────┘     └──────────────┘     └─────────────────┘
```

#### Stage 1: Specialist Training (专家培养)

对每个目标领域（数学、编码、agent、指令遵循等）独立训练专家模型：

1. **SFT**: 在高质量领域特定数据上进行监督微调，建立基础能力
2. **RL with GRPO**: 使用Group Relative Policy Optimization和领域特定奖励模型进一步优化
3. 产出多个**领域专家**，各自在专长领域表现卓越

#### Stage 2: On-Policy Distillation (OPD，模型整合)

| 特性 | 说明 |
|------|------|
| 目标 | 将多个专家能力整合到单一统一模型 |
| 方法 | 学生模型(统一模型)从教师模型的输出分布学习，优化reverse KL loss |
| 关键公式 | L_OPD(θ) = Σ w_i · D_KL(π_θ ‖ π_Ei) |
| 教师数量 | **10+**个覆盖各领域的专家模型 |
| 采样 | 从学生模型π_θ采样轨迹，保持on-policy学习 |
| 完整词表蒸馏 | 保留完整logit分布计算reverse KL，梯度估计更稳定 |

### 5.2 推理模式 (Reasoning Efforts)

| 模式 | 特点 | 典型用例 | 响应格式 |
|------|------|---------|---------|
| **Non-think** | 快速、直觉性响应 | 日常任务、紧急反应 | `<think>` summary `</think>` |
| **Think (High)** | 有意识逻辑分析，较慢但更准确 | 复杂问题求解、规划 | `<think>` thinking tokens `</think>` summary |
| **Think Max** | 将推理推向极致 | 探索模型推理边界 | 特殊系统提示 + `<think>` thinking tokens `</think>` summary |

**Think Max特殊指令** (注入系统提示开头)：
> "Reasoning Effort: Absolute maximum with no shortcuts permitted. You MUST be very thorough in your thinking and comprehensively decompose the problem to solve the root cause..."

### 5.3 关键后训练技术

| 技术 | 说明 |
|------|------|
| **Generative Reward Model (GRM)** | 摒弃传统标量奖励模型，使用生成式奖励模型评估策略轨迹；GRM本身参与RL优化，actor网络即GRM |
| **Interleaved Thinking** | 工具调用场景中保留完整推理历史（跨用户消息边界）；一般对话场景中到达新用户消息时丢弃旧推理 |
| **Quick Instruction** | 专用特殊token序列附加到输入，直接复用已计算KV cache执行辅助任务（搜索查询生成、领域识别等），避免冗余prefill |
| **Tool-Call Schema** | 新`|DSML|`token + XML格式工具调用，有效减少转义失败和工具调用错误 |

---

## 6. 基准测试对比

### 6.1 知识与推理 (Knowledge & Reasoning)

#### DeepSeek-V4-Pro-Max vs 闭源/开源模型 (Table 6)

| Benchmark | Claude-Opus-4.6-Max | GPT-5.4-xHigh | Gemini-3.1-Pro-High | K2.6-Thinking | GLM-5.1-Thinking | **DS-V4-Pro-Max** |
|-----------|-------------------|-------------|------------------|-------------|---------------|------------------|
| **MMLU-Pro (EM)** | 89.1 | 87.5 | **91.0** | 87.1 | 86.0 | 87.5 |
| **SimpleQA-Verified (Pass@1)** | 46.2 | 45.3 | 75.6 | 36.9 | 38.1 | **57.9** |
| **Chinese-SimpleQA (Pass@1)** | 76.4 | 76.8 | **85.9** | 75.9 | 75.0 | 84.4 |
| **GPQA Diamond (Pass@1)** | 91.3 | **93.0** | **94.3** | 90.5 | 86.2 | 90.1 |
| **HLE (Pass@1)** | 40.0 | 39.8 | **44.4** | 36.4 | 34.7 | 37.7 |
| **LiveCodeBench (Pass@1)** | 88.8 | - | 91.7 | 89.6 | - | **93.5** |
| **Codeforces (Rating)** | - | 3168 | 3052 | - | - | **3206** |
| **HMMT 2026 Feb (Pass@1)** | 96.2 | **97.7** | 94.7 | 92.7 | 89.4 | 95.2 |
| **IMO AnswerBench (Pass@1)** | 75.3 | 91.4 | 81.0 | 86.0 | 83.8 | **89.8** |
| **Apex (Pass@1)** | 34.5 | 54.1 | **60.9** | 24.0 | 11.5 | 38.3 |
| **Apex Shortlist (Pass@1)** | 85.9 | 78.1 | 89.1 | 75.5 | 72.4 | **90.2** |

**知识评测结论**：
- V4-Pro-Max在SimpleQA上显著超越所有开源模型（**领先20个绝对百分点**），成为开源模型新知识SOTA
- MMLU-Pro、GPQA、HLE上略领先开源对手，但仍落后Gemini-3.1-Pro等顶级闭源模型
- 报告估计：V4-Pro-Max距SOTA前沿闭源模型约**3~6个月**差距

### 6.2 代码能力 (Code)

| Benchmark | 表现 |
|-----------|------|
| **LiveCodeBench** | V4-Pro-Max: **93.5** (超越所有对比模型) |
| **Codeforces** | V4-Pro-Max: **3206** rating (排名人类选手第23位)，首次开源模型匹敌闭源模型 |
| **SWE-Verified** | V4-Pro-Max: **80.6** (与K2.6持平，与Opus-4.6并列) |
| **SWE-Pro** | V4-Pro-Max: **55.4** |
| **SWE-Multilingual** | V4-Pro-Max: **76.2** |
| **TerminalBench 2.0** | V4-Pro-Max: **67.9**；Verified子集约72.0 |

### 6.3 Agent能力 (Agentic Capabilities)

| Benchmark | V4-Pro-Max | 对比 |
|-----------|-----------|------|
| **BrowseComp (Pass@1)** | 83.4 | 与Opus-4.6(83.7)、Gemini-3.1-Pro(85.9)接近 |
| **HLE w/ tools (Pass@1)** | 48.2 | - |
| **GDPval-AA (Elo)** | **1554** | 显著超越K2.6(1482)和GLM-5.1(1535) |
| **MCP Atlas Public (Pass@1)** | 73.6 | 与Opus-4.6(73.8)基本持平 |
| **Toolathlon (Pass@1)** | **51.8** | 超越所有对比模型 |

**Agent评测结论**：公开benchmark上V4-Pro-Max与K2.6、GLM-5.1等开源SOTA持平，略逊于顶级闭源模型。内部评估中，V4-Pro-Max超越Claude Sonnet 4.5，接近Opus 4.5水平。

### 6.4 长上下文 (1M Token Context)

| Benchmark | Claude-Opus-4.6 | Gemini-3.1-Pro | **V4-Pro-Max** |
|-----------|----------------|---------------|---------------|
| **MRCR 1M (MMR)** | 92.9 | 76.3 | **83.5** |
| **CorpusQA 1M (ACC)** | 71.7 | 53.8 | **62.0** |

**长上下文结论**：
- V4-Pro-Max在MRCR上超越Gemini-3.1-Pro，仅次于Claude Opus 4.6
- CorpusQA（更接近真实场景）上优于Gemini-3.1-Pro
- 在128K窗口内检索性能高度稳定；超过128K后有轻微下降，但1M tokens仍保持强大检索能力

### 6.5 模型变体对比：V4-Flash vs V4-Pro (各模式) (Table 7)

| Benchmark | V4-Flash Non-Think | V4-Flash High | V4-Flash Max | V4-Pro Non-Think | V4-Pro High | V4-Pro Max |
|-----------|-------------------|--------------|-------------|-----------------|------------|-----------|
| MMLU-Pro | 83.0 | 86.4 | 86.2 | 82.9 | 87.1 | **87.5** |
| SimpleQA-Verified | 23.1 | 28.9 | 34.1 | 45.0 | 46.2 | **57.9** |
| Chinese-SimpleQA | 71.5 | 73.2 | 78.9 | 75.8 | 77.7 | **84.4** |
| GPQA Diamond | 71.2 | 87.4 | 88.1 | 72.9 | 89.1 | **90.1** |
| HLE | 8.1 | 29.4 | 34.8 | 7.7 | 34.5 | **37.7** |
| LiveCodeBench | 55.2 | 88.4 | 91.6 | 56.8 | 89.8 | **93.5** |
| Codeforces | - | 2816 | 3052 | - | 2919 | **3206** |
| HMMT 2026 Feb | 40.8 | 91.9 | 94.8 | 31.7 | 94.0 | **95.2** |
| IMO AnswerBench | 41.9 | 85.1 | 88.4 | 35.3 | 88.0 | **89.8** |
| Apex | 1.0 | 19.1 | 33.0 | 0.4 | 27.4 | **38.3** |
| Apex Shortlist | 9.3 | 72.1 | 85.7 | 9.2 | 85.5 | **90.2** |
| MRCR 1M | 37.5 | 76.9 | 78.7 | 44.7 | 83.3 | **83.5** |
| CorpusQA 1M | 15.5 | 59.3 | 60.5 | 35.6 | 56.5 | **62.0** |
| TerminalBench 2.0 | 49.1 | 56.6 | 56.9 | 59.1 | 63.3 | **67.9** |
| SWE-Verified | 73.7 | 78.6 | 79.0 | 73.6 | 79.4 | **80.6** |
| SWE-Pro | 49.1 | 52.3 | 52.6 | 52.1 | 54.4 | **55.4** |
| BrowseComp | - | 53.5 | 73.2 | - | 80.4 | **83.4** |
| HLE w/ tools | - | 40.3 | 45.1 | - | 44.7 | **48.2** |
| MCP Atlas | 64.0 | 67.4 | 69.0 | 69.4 | 74.2 | **73.6** |
| GDPval-AA | - | - | 1395 | - | - | **1554** |
| Toolathlon | 40.7 | 43.5 | 47.8 | 46.3 | 49.0 | **51.8** |

**推理模式效果**：Max模式（更长上下文 + 更低长度惩罚）在最具挑战性的任务上明显优于High模式。V4-Flash-Max在分配更大思考预算时，推理任务上可达到与V4-Pro-Max可比的结果。

### 6.6 形式化数学推理 (Formal Math)

| 设置 | V4-Flash-Max | V4 (计算密集型) |
|------|-------------|----------------|
| Putnam-200 Pass@8 (实用模式) | **81.00** | - |
| Putnam-2025 (前沿模式) | - | **120/120** (满分) |

---

## 7. 效率分析

### 7.1 推理FLOPs与KV Cache对比

**基准对比：DeepSeek-V4系列 vs DeepSeek-V3.2**

#### 1M Token Context 场景

| 模型 | 单token推理FLOPs (等效FP8) | vs V3.2 | 累积KV Cache | vs V3.2 |
|------|--------------------------|---------|-------------|---------|
| DeepSeek-V3.2 | 100% (基准) | - | 100% (基准) | - |
| **V4-Pro** | **27%** | **3.7×降低** | **10%** | **9.8×降低** |
| **V4-Flash** | **10%** | **9.5×降低** | **7%** | **13.7×降低** |

#### 多序列长度趋势

| 序列长度 | V3.2 FLOPs | V4-Pro FLOPs | V4-Flash FLOPs | V3.2 KV Cache | V4-Pro KV Cache | V4-Flash KV Cache |
|---------|-----------|-------------|---------------|--------------|----------------|------------------|
| 0-25K | 基准 | 基准附近 | 显著更低 | 基准 | 显著更小 | 显著更小 |
| 256K | - | - | - | - | - | - |
| 512K | - | - | - | - | - | - |
| 768K | - | - | - | - | - | - |
| **1M** | **100%** | **27%** | **10%** | **100%** | **10%** | **7%** |

### 7.2 效率优势来源

| 来源 | 贡献 |
|------|------|
| 混合CSA/HCA注意力 | 核心效率提升：CSA压缩+稀疏选择，HCA极端压缩 |
| KV Cache混合精度 | RoPE维度BF16 + 其他维度FP8，相比纯BF16减少约**50%** |
| FP4索引器计算 | Lightning indexer注意力计算用FP4，加速超长上下文 |
| 更小top-k | 相比V3.2选择更小的attention top-k，提升中短文本效率 |
| FP4专家权重 | Routed expert参数使用FP4精度，未来硬件上可再提效1/3 |

---

## 8. 关键发现和结论

### 8.1 核心成就

1. **百万token上下文成为常态**：通过CSA/HCA混合注意力架构，DeepSeek-V4系列将1M token上下文的推理成本降至前所未有的水平，使长程任务和测试时缩放更加可行。

2. **开源模型新SOTA**：V4-Pro-Max在知识、推理、代码、Agent等多维度上重新定义了开源模型SOTA，Apex Shortlist (90.2)、Codeforces (3206 rating)、Toolathlon (51.8)等多项指标领先。

3. **参数效率突破**：V4-Flash-Base以13B激活参数/284B总参数的规模，在绝大多数benchmark上超越了37B激活/671B总参数的V3.2-Base，证明了架构创新的力量。

4. **推理-成本帕累托前沿**：V4-Flash-Max以极具成本效益的架构，在分配更大思考预算时达到与领先闭源模型可比的推理性能。

### 8.2 架构设计洞察

| 设计 | 效果 |
|------|------|
| CSA (m=4, top-k稀疏) | 平衡压缩与表达能力，适合大部分层 |
| HCA (m'=128, dense) | 极端压缩，适合对局部精细度要求较低的层 |
| 交错混合使用 | 在全局效率与局部表达能力之间取得最优平衡 |
| mHC替代残差连接 | 增强深层信号传播稳定性，支持61层深度模型训练 |
| Muon优化器 | 更快收敛、更强稳定性，避免QK-Clip等权宜之计 |

### 8.3 训练工程洞察

| 技术 | 问题 | 效果 |
|------|------|------|
| Anticipatory Routing | MoE层异常值与路由的恶性循环 | 动态触发，几乎零额外开销消除loss spike |
| SwiGLU Clamping | 激活值异常导致训练不稳定 | 钳位[-10,10]完全消除异常值 |
| 两阶段CP for压缩注意力 | 压缩块跨越CP rank边界 | 两阶段通信解决边界压缩问题 |
| MegaMoE融合kernel | EP通信瓶颈 | 1.50~1.96×加速，容忍更低互联带宽 |

### 8.4 局限性与未来方向

1. **架构复杂度**：为最小化风险保留了较多初步验证的组件，架构相对复杂；未来将进行更系统的精简研究。

2. **训练稳定性理论**：Anticipatory Routing和SwiGLU Clamping有效但原理未充分理解，需更深入的理论研究。

3. **与顶级闭源模型差距**：在知识基准上距Gemini-3.1-Pro仍有差距，整体落后SOTA闭源模型约3~6个月。

4. **未来探索方向**：
   - 更稀疏的嵌入模块等新维度稀疏性探索
   - 低延迟架构和系统技术，提升长上下文交互响应性
   - 长程、多轮agent任务
   - 多模态能力集成
   - 更好的数据策划和合成策略

---

## 附录：关键数据速查表

### A. 模型核心参数

| 参数 | V4-Pro | V4-Flash |
|------|--------|----------|
| 总参数 | 1.6T | 284B |
| 激活参数 | 49B | 13B |
| 层数 | 61 | 43 |
| 隐藏维度 | 7,168 | 4,096 |
| MoE routed experts | 384 | 256 |
| 每token激活专家 | 6 | 6 |
| 专家中间维度 | 3,072 | 2,048 |
| CSA压缩率 m | 4 | 4 |
| CSA top-k | 1,024 | 512 |
| HCA压缩率 m' | 128 | 128 |
| Query heads | 128 | 64 |
| Head dimension | 512 | 512 |
| Sliding window | 128 | 128 |
| mHC n_hc | 4 | 4 |

### B. 训练数据与设置

| 设置 | V4-Pro | V4-Flash |
|------|--------|----------|
| 训练token | 33T | 32T |
| 最大batch size | 94.4M | 75.5M |
| 峰值学习率 | 2.0e-4 | 2.7e-4 |
| 序列长度 | 4K→1M | 4K→1M |

### C. 后训练三种模式

| 模式 | 上下文窗口 | 典型输出长度 |
|------|---------|-------------|
| Non-think | 8K | 短 |
| Think (High) | 128K | 中等 |
| Think Max | 384K | 长 |

### D. 顶级Benchmark SOTA对比

| Benchmark | 最佳成绩 | 记录保持者 |
|-----------|---------|-----------|
| SimpleQA-Verified | 75.6 | Gemini-3.1-Pro |
| MMLU-Pro | 91.0 | Gemini-3.1-Pro |
| GPQA Diamond | 94.3 | Gemini-3.1-Pro |
| LiveCodeBench | **93.5** | **V4-Pro-Max** |
| Codeforces | **3206** | **V4-Pro-Max** |
| Apex Shortlist | **90.2** | **V4-Pro-Max** |
| Toolathlon | **51.8** | **V4-Pro-Max** |
| MRCR 1M | 92.9 | Claude-Opus-4.6 |
