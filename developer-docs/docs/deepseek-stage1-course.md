# 《DeepSeek Provider Adapter 第一阶段：模型基础协议》

> 课程草稿 · 基于 57 条文档整理包 · 2026-05-21

---

## 关于这 57 条文档的形式说明

整理包包含 57 条记录，但它们**不是 57 个独立的 Markdown 文件**。

实际存储形式：

| 项目 | 说明 |
|------|------|
| 本地存储 | `data/providers-docs.json` 中的 JSON record，每条是一个 JSON 对象，包含 url、category、contentType、valueScore、snippets 等字段 |
| 原始抓取 | 56 条为 `text/html`（从 DeepSeek 官网 Docusaurus 页面抓取），1 条为 `unknown`（抓取失败的 404） |
| markdown 来源 | 仅 1 条（`chat_prefix_completion`）的 sourceType 标记为 markdown，但实际 contentType 仍是 text/html |

因此，学习时应以 JSON record 的结构化字段（headings、codeSnippets、summary）为主，不要期望找到 57 个 `.md` 文件逐个阅读。价值分（valueScore）和学习密度（difficulty）是本地教程生成的筛选指标，用来帮助排序，不等同于官方文档评分。

---

## 第一章：请求与响应——Chat Completions 协议

### 学习目标

能独立构造一个合法的 `/chat/completions` 请求，理解请求体每个字段的含义，能从响应体中提取 content、reasoning_content、tool_calls、usage 四类信息。

### 必读文档

| 序号 | 文档 | 价值分 | 说明 |
|------|------|--------|------|
| 1 | `api/create-chat-completion` | 100 | 核心接口，请求体和响应体的完整 schema |
| 2 | `api/deepseek-api` | 100 | 认证方式（Bearer token）、base URL、ToS |
| 3 | `api/list-models` | 100 | 可用模型列表；具体模型 id 以接口实时返回为准 |
| 4 | `api/get-user-balance` | 100 | 账户余额查询，含 granted_balance / topped_up_balance 拆分 |

### 工程动作

1. **发一次 curl**：用 `DEEPSEEK_API_KEY` 调用 `/chat/completions`，model 使用 `/models` 当前返回的可用模型 id，stream=false，验证返回 `choices[0].message.content` 非空。
2. **解析 usage 字段**：记录 `prompt_tokens`、`completion_tokens`、`prompt_cache_hit_tokens`、`prompt_cache_miss_tokens`，理解 cache hit 对计费的影响。
3. **调用 /models**：确认当前账户可见的模型列表，记录 owned_by 字段。
4. **调用 /user/balance**：记录余额结构，理解 CNY 货币和三种 balance 的关系。

### 常见坑

- **base_url 拼错**：优先按官方示例配置 `https://api.deepseek.com`；如果使用第三方 OpenAI-compatible SDK，要确认该 SDK 是否自动追加路径，避免重复或漏掉路径。
- **Authorization header 格式**：必须是 `Bearer sk-xxx`，不是 `Token sk-xxx`。
- **stream=false 时响应体结构**：`choices` 是数组，取 `[0].message`；stream 模式下是 SSE chunk，结构不同，本章先不碰。
- **reasoning_content 字段**：仅在开启 thinking mode 时出现，普通请求中该字段为 null 或不存在。

### 验收标准

- [ ] 能手写一个 curl 命令调用 `/chat/completions` 并获得 200 响应
- [ ] 能从响应 JSON 中提取 `usage.prompt_tokens` 和 `usage.completion_tokens`
- [ ] 能调用 `/models` 并列出至少 2 个模型 id
- [ ] 能调用 `/user/balance` 并解释返回的三种 balance 字段

---

## 第二章：思考模式与工具调用

### 学习目标

能开启 thinking mode 并理解 reasoning_content 的生命周期；能定义 tools 数组、处理 tool_calls 响应、回传 tool 结果完成一轮完整的 agent 调用循环。

### 必读文档

| 序号 | 文档 | 价值分 | 说明 |
|------|------|--------|------|
| 1 | `guides/thinking_mode` | 100 | thinking 开关、reasoning_effort 参数、多轮对话中 reasoning_content 的处理 |
| 2 | `guides/tool_calls` | 100 | tools 定义、tool_calls 响应解析、strict mode (Beta) |
| 3 | `api_samples/thinking_mode_api_example_tool_call` | 85 | thinking + tool call 的完整 Python 示例 |
| 4 | `api_samples/thinking_mode_api_example_tool_call_output` | 85 | 多轮 tool call 的实际输出，含 reasoning_content 逐 turn 变化 |

### 工程动作

1. **开启 thinking mode**：在请求中加 `reasoning_effort: "high"` 和 `extra_body: {"thinking": {"type": "enabled"}}`，验证响应中 `reasoning_content` 非空。
2. **定义一个 tool**：写一个 `get_weather` 函数的 tools 定义，包含 name、description、parameters（含 required）。
3. **完成一轮 tool call 循环**：
   - 发送 user message → 收到 tool_calls → 构造 tool role message（含 tool_call_id）→ 再次请求 → 收到最终 content
4. **测试 strict mode**：在 tool 定义中加 `"strict": true` 和 `"additionalProperties": false`，验证 schema 校验行为。

### 常见坑

- **reasoning_content 不进 messages**：多轮对话时，把上一轮的 `reasoning_content` 放进 messages 会被 API 忽略。DeepSeek 只看 role=assistant 的 content 和 tool_calls，不看 reasoning_content。
- **tool_call_id 必须原样回传**：响应中 `tool_calls[0].id` 是 `call_xxx` 格式，回传 tool result 时 `tool_call_id` 必须完全一致，否则报错。
- **thinking mode 下 tool call 的 reasoning_content**：模型可能先输出 reasoning_content（思考过程），再输出 tool_calls。需要同时处理两个字段。
- **reasoning_effort 映射**：不同集成工具会把自己的 effort 档位映射到 DeepSeek 请求参数，适配时要以官方文档和工具文档为准，不要在 Harness 里写死一套枚举。

### 验收标准

- [ ] 能发送带 thinking mode 的请求并从响应中提取 `reasoning_content`
- [ ] 能定义一个合法的 tools 数组（含 parameters 和 required）
- [ ] 能完成一轮完整的 tool call 循环（user → tool_calls → tool result → final answer）
- [ ] 能解释 reasoning_content 在多轮对话中的生命周期

---

## 第三章：错误处理、计费与限流

### 学习目标

能识别 DeepSeek API 的常见错误码并正确处理；能计算一次请求的 token 费用；能处理 429 限流响应并实现退避重试。

### 必读文档

| 序号 | 文档 | 价值分 | 说明 |
|------|------|--------|------|
| 1 | `quick_start/error_codes` | 75 | 错误码列表及含义 |
| 2 | `quick_start/pricing` | 79 | 模型定价、扣费规则 |
| 3 | `quick_start/rate_limit` | 75 | 限流策略 |
| 4 | `quick_start/token_usage` | 77 | token 计算方式，含 reasoning_tokens |
| 5 | `guides/kv_cache` | 100 | Context Caching 机制，cache hit 降费原理 |
| 6 | `faq` | 100 | 充值、退款、API Key 用量查看等运维问题 |

### 工程动作

1. **故意触发一个错误**：发送一个 model 不存在的请求，记录返回的 HTTP status code 和 error body 结构。
2. **计算费用**：假设 prompt_tokens=1000、completion_tokens=500，并观察是否返回 reasoning 相关 token 统计；按 pricing 页面的计费口径计算总费用。
3. **检查 cache hit**：发送两条相同的 system+user 消息，对比第二次请求的 `prompt_cache_hit_tokens` 是否大于 0。
4. **实现退避重试**：写一个函数，收到 429 时等待 `retry_after` 秒后重试，最多 3 次。

### 常见坑

- **reasoning token 口径**：不同模型和接口版本可能返回不同 usage 细节，教程里先要求记录字段，不擅自推断价格公式。
- **cache hit 的前提**：缓存命中依赖请求前缀一致性和平台缓存策略；本地只记录 `prompt_cache_hit_tokens` / `prompt_cache_miss_tokens`，不要假定一定命中。
- **429 重试**：无论响应是否带 `Retry-After`，本地都应准备指数退避与最大重试次数，避免无限重跑。
- **余额为 0 时的错误**：返回的不是 402，而是一个自定义错误码，需要查 error_codes 文档确认。

### 验收标准

- [ ] 能列出至少 3 个常见错误码及其含义
- [ ] 能根据 pricing 文档和 usage 字段解释一次请求的大致费用来源
- [ ] 能解释 prompt_cache_hit_tokens 和 prompt_cache_miss_tokens 的关系
- [ ] 能实现一个带指数退避的 429 重试函数

---

## 第四章：生态接入——Agent 集成

### 学习目标

能将 DeepSeek 接入至少一个 AI coding agent 工具（如 Claude Code、GitHub Copilot CLI）；理解 OpenAI 兼容层和 Anthropic 兼容层的区别；能配置环境变量并验证集成是否成功。

### 必读文档

| 序号 | 文档 | 价值分 | 说明 |
|------|------|--------|------|
| 1 | `quick_start/agent_integrations/claude_code` | 100 | Claude Code 集成，ANTHROPIC_BASE_URL 指向 DeepSeek |
| 2 | `quick_start/agent_integrations/github_copilot` | 96 | VS Code Copilot 集成 |
| 3 | `quick_start/agent_integrations/copilot_cli` | 100 | Copilot CLI 集成 |
| 4 | `guides/coding_agents` | 100 | Claude Code / OpenCode / OpenClaw 三合一指南 |
| 5 | `guides/anthropic_api` | 100 | Anthropic API 兼容层的字段映射细节 |
| 6 | `quick_start/agent_integrations/crush` | 100 | Crush 配置示例，含 context_window 和 can_reason 字段 |
| 7 | `quick_start/agent_integrations/oh_my_pi` | 100 | Oh My Pi 的 compat 字段映射（supportsDeveloperRole、reasoningEffortMap 等） |

### 工程动作

1. **接入 Claude Code**：按官方 agent integration 文档设置 Anthropic-compatible endpoint、认证 token 与模型名，运行 `claude` 验证。具体环境变量名以目标工具文档为准。
2. **对比两种兼容层**：
   - OpenAI 兼容：`base_url=https://api.deepseek.com`，用 openai SDK
   - Anthropic 兼容：`base_url=https://api.deepseek.com/anthropic`，用 anthropic SDK
   记录两者在 tool_calls、thinking mode 参数传递上的差异。
3. **配置一个非 Claude Code 的工具**：选 Copilot CLI 或 Crush，按文档配置并验证可用。
4. **阅读 compat 字段映射**：重点看集成文档里的 role、reasoning、tool call 兼容字段，理解 DeepSeek 与 OpenAI / Anthropic 协议差异。

### 常见坑

- **认证环境变量差异**：不同 agent 工具使用的 key/token 变量名不一致，不能把 Claude Code、Anthropic SDK、OpenAI SDK 的变量名混用。
- **模型名与上下文后缀**：部分集成工具会用模型名后缀或额外字段表达上下文长度，要按工具文档配置，不要把后缀当成所有场景通用规则。
- **thinking mode 在 agent 中的传递**：不同 agent 工具传递 thinking 参数的方式不同——有的用 `reasoning_effort`，有的用 `extra_body`，有的用工具自己的配置项。适配时要逐个查目标工具文档。
- **role 兼容差异**：如果工具文档提示某些 role 不支持，需要在 Provider Adapter 层做 role 回退或转换，而不是让上层 Harness 感知 provider 细节。

### 验收标准

- [ ] 能在至少一个 agent 工具中成功调用 DeepSeek 模型
- [ ] 能解释 OpenAI 兼容层和 Anthropic 兼容层的 base_url 区别
- [ ] 能配置环境变量使 Claude Code 使用 DeepSeek 后端
- [ ] 能列出 DeepSeek 与 OpenAI 协议的至少 2 个差异点

---

## 7 天学习打卡清单

### Day 1：Hello DeepSeek

- [ ] 注册 DeepSeek 平台账号，获取 API Key
- [ ] 用 curl 调用 `/chat/completions`，发送 "Hello" 并收到回复
- [ ] 调用 `/models` 列出可用模型
- [ ] 调用 `/user/balance` 查看账户余额
- **产出**：一个能跑通的 curl 命令截图或日志

### Day 2：协议深挖

- [ ] 阅读 `api/create-chat-completion` 的完整请求体 schema
- [ ] 理解 stream / temperature / max_tokens / top_p 各参数
- [ ] 发送一个带 system message 的请求
- [ ] 对比有无 system message 时的回复差异
- **产出**：一份请求参数速查表（手写或电子均可）

### Day 3：Thinking Mode

- [ ] 阅读 `guides/thinking_mode`
- [ ] 发送一个带 `reasoning_effort: "high"` 的请求
- [ ] 提取并阅读 reasoning_content
- [ ] 发送一个多轮对话，观察第二轮 reasoning_content 的行为
- **产出**：一段 reasoning_content 的实际输出记录

### Day 4：Tool Calls

- [ ] 阅读 `guides/tool_calls`
- [ ] 定义一个 tool（如 get_weather）
- [ ] 完成一轮完整的 tool call 循环
- [ ] 测试 strict mode 的 schema 校验
- **产出**：一段完整的 tool call 对话日志（含 tool_calls 和 tool result）

### Day 5：错误与计费

- [ ] 阅读 `quick_start/error_codes`、`pricing`、`rate_limit`
- [ ] 故意触发一个错误（如错误的 model name）
- [ ] 记录一次含 thinking 输出的 usage 字段，并按 pricing 文档解释费用来源
- [ ] 发送重复请求观察 cache hit 行为
- **产出**：一份费用计算示例（含 token 数和单价）

### Day 6：Agent 集成

- [ ] 阅读 `guides/coding_agents` 或 `agent_integrations/claude_code`
- [ ] 配置 Claude Code 或 Copilot CLI 使用 DeepSeek
- [ ] 用 agent 工具完成一个简单任务（如写一个函数）
- [ ] 阅读 `guides/anthropic_api` 了解兼容层细节
- **产出**：agent 工具使用 DeepSeek 的截图或日志

### Day 7：复盘与输出

- [ ] 回顾 7 天的学习笔记
- [ ] 整理一份 DeepSeek API 速查卡（endpoint、参数、错误码、费用）
- [ ] 写一段面试表达（见下方模板）
- [ ] （可选）阅读 `guides/kv_cache` 和 `guides/json_mode` 扩展知识
- **产出**：一份个人速查卡 + 面试表达稿

---

## 面试表达

**面试官**：说说你对 DeepSeek API 的了解？

**回答**：

我系统学过 DeepSeek 的 API 协议。它兼容 OpenAI 的 Chat Completions 格式，endpoint 是 `/chat/completions`，认证用 Bearer token。具体可用模型以 `/models` 返回和官方模型文档为准，不能在业务代码里硬编码。

它有几个比较有特点的地方。第一是 Thinking Mode，请求侧可以开启 thinking 相关参数，响应里需要把 `reasoning_content` 和最终 `content` 分开处理。第二是 Tool Calls，协议接近 OpenAI-compatible 风格，但执行工具仍然是应用侧 Harness 的责任，Adapter 要解析 `function.arguments` 并做 schema 校验。第三是 Context Caching，usage 里会出现 cache hit / miss 相关字段，适合纳入成本和观测体系。

错误处理方面，要把限流、认证、余额、schema 错误和服务端错误映射成统一的 `ProviderError`，再决定是否重试、降级或停止。计费与余额字段按官方 pricing 和 balance 文档解释，不在业务代码里硬编码价格公式。

生态接入方面，DeepSeek 提供 OpenAI 兼容和 Anthropic 兼容相关接入方式。Claude Code、Copilot CLI、Crush 等工具各自的环境变量和模型配置不完全相同，所以 Provider Adapter 只沉淀“兼容层、role、reasoning、tool call 的转换规则”，具体变量名按目标工具官方文档配置。

---

## 附录：优先文档索引

以下是本课程必须覆盖的核心文档，按学习顺序排列：

| 阶段 | 文档 URL 路径 | 对应章节 |
|------|---------------|----------|
| Day 1 | `api/create-chat-completion` | 第一章 |
| Day 1 | `api/deepseek-api` | 第一章 |
| Day 1 | `api/list-models` | 第一章 |
| Day 1 | `api/get-user-balance` | 第一章 |
| Day 3 | `guides/thinking_mode` | 第二章 |
| Day 4 | `guides/tool_calls` | 第二章 |
| Day 4 | `api_samples/thinking_mode_api_example_tool_call` | 第二章 |
| Day 4 | `api_samples/thinking_mode_api_example_tool_call_output` | 第二章 |
| Day 5 | `quick_start/error_codes` | 第三章 |
| Day 5 | `quick_start/pricing` | 第三章 |
| Day 5 | `quick_start/rate_limit` | 第三章 |
| Day 5 | `quick_start/token_usage` | 第三章 |
| Day 5 | `guides/kv_cache` | 第三章 |
| Day 6 | `quick_start/agent_integrations/claude_code` | 第四章 |
| Day 6 | `guides/coding_agents` | 第四章 |
| Day 6 | `guides/anthropic_api` | 第四章 |
| Day 6 | `quick_start/agent_integrations/crush` | 第四章 |
| Day 6 | `quick_start/agent_integrations/oh_my_pi` | 第四章 |
