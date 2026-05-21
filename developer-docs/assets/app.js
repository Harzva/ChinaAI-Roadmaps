const tutorialDataUrl = 'data/providers-docs.json';

let docs = [];
let activeProvider = 'all';
let activeCategory = 'all';
let activeTopic = 'all';
let compactMode = true;
let highValueMode = false;
let generatedAt = '';
let selectedDocUrl = '';
let pinnedTaskStates = {};
let pinnedTaskDate = '';
const pinnedTaskStorageKey = 'deepseek-tutorial:daily-pinned-tasks:v1';

const providerDefs = {
  deepseek: {
    id: 'deepseek',
    label: 'DeepSeek',
    key: 'deepseek',
    home: 'https://api-docs.deepseek.com',
    color: '#2f68d6',
    accent: '#4f9cff',
    badge: 'linear-gradient(90deg, #0f4fbe, #4f8eff)',
    themeClass: 'deepseek'
  },
  kimi: {
    id: 'kimi',
    label: 'Kimi',
    key: 'kimi',
    home: 'https://platform.kimi.com/docs',
    color: '#6a4ce0',
    accent: '#9d80ff',
    badge: 'linear-gradient(90deg, #5e3bd1, #8a6fff)',
    themeClass: 'kimi'
  },
  glm: {
    id: 'glm',
    label: 'GLM',
    key: 'glm',
    home: 'https://docs.bigmodel.cn',
    color: '#0ea5a3',
    accent: '#2dc8be',
    badge: 'linear-gradient(90deg, #0e7c7a, #31d8d0)',
    themeClass: 'glm'
  },
  mimo: {
    id: 'mimo',
    label: 'Xiaomi MiMo',
    key: 'mimo',
    home: 'https://platform.xiaomimimo.com',
    color: '#d97706',
    accent: '#f6a44f',
    badge: 'linear-gradient(90deg, #b45d08, #f59e0b)',
    themeClass: 'mimo'
  }
};

const providerOrder = ['all', 'deepseek', 'kimi', 'glm', 'mimo'];

const zhCategory = {
  all: '全部',
  overview: '入口',
  api: 'API 接口',
  guides: '功能指南',
  api_samples: '示例代码',
  quick_start: '快速开始',
  usage_guide: '使用指南',
  quick: '快速开始',
  faq: 'FAQ',
  model: '模型',
  models: '模型',
  error: '错误处理',
  files: '文件',
  batch: '批处理',
  pricing: '计费',
  'markdown-page': '文档说明',
  'prompt-library': '提示词库',
  news: '动态',
  updates: '更新',
  integration: '集成',
  'tool-overview': '工具',
  tool: '工具',
  'api-reference': 'API 参考',
  'api-reference-v2': 'API 参考',
  'static-docs': '静态文档',
  'usage-guide': '使用指南',
  asyncapi: '异步接口',
  'best-practice': '最佳实践',
  pricing: '计费',
  terms: '协议',
  faq: 'FAQ',
  knowledge: '知识库',
  models: '模型',
  'knowledge-base': '知识库',
  openapi: 'OpenAPI',
  'openapi.json': 'OpenAPI'
};

const categoryOrder = [
  'overview',
  'quick_start',
  'api',
  'api-reference',
  'guides',
  'usage_guide',
  'tool',
  'batch',
  'api_samples',
  'faq',
  'model',
  'models',
  'files',
  'usage-guide',
  'integration',
  'pricing',
  'asyncapi',
  'best-practice',
  'news',
  'news',
  'markdown-page',
  'error',
  'terms',
  'updates',
  'openapi',
  'openapi.json',
  'knowledge',
  'knowledge-base',
  'knowledge-api'
];

const stopWords = new Set([
  'the',
  'and',
  'for',
  'you',
  'with',
  'your',
  'this',
  'that',
  'are',
  'can',
  'how',
  'what',
  'when',
  'where',
  'which',
  'from',
  'have',
  'through',
  'into',
  'there',
  'will',
  'using',
  'about',
  'on',
  'api',
  'deepseek',
  'docs',
  'document',
  'documents',
  'documentation',
  'model',
  'models',
  'chat',
  'completion',
  'completions',
  'request',
  'response',
  'status',
  'openai',
  'provider',
  'guides',
  'get',
  'set',
  'use',
  'call',
  'calls',
  'kimi',
  'glm',
  'mimo',
  'batch',
  'streaming',
  'stream',
  'agent',
  'model',
  'multimodal'
]);

const topicRules = [
  {
    id: 'protocol',
    label: '协议 & 结构',
    color: '#2f68d6',
    patterns: ['create-chat-completion', 'chat/completions', 'messages', 'role', 'tool', 'deepseek api', 'api reference', 'request', 'response', 'schema', 'json'],
    tips: '先把请求字段、响应结构、role 与参数边界吃透，防止模型输出不符合协议。'
  },
  {
    id: 'thinking',
    label: '思考模式',
    color: '#1ea5d6',
    patterns: ['thinking', 'reasoning', 'reasoning_content', 'reasoning_effort'],
    tips: '区分 reasoning 与 user-visible content，支持模型反思段落与最终回答链路。'
  },
  {
    id: 'tooling',
    label: '工具调用',
    color: '#1d7dd1',
    patterns: ['tool_calls', 'tool call', 'function', 'json schema', 'strict', 'tool_choice'],
    tips: '重点校验 function.arguments 的 JSON 合法性，不能信任模型原始字符串。'
  },
  {
    id: 'stream',
    label: '流式 & SSE',
    color: '#6f42c1',
    patterns: ['stream', 'sse', 'chunk', 'tool_call_delta', 'reasoning delta', '[done]', 'data:'],
    tips: '按 chunk 增量处理并在 [DONE] 收尾，避免中间状态丢失。'
  },
  {
    id: 'batch',
    label: '异步批处理',
    color: '#6f42c1',
    patterns: ['batch', 'batch_create', 'batch_retrieve', 'batch_list', 'batch_cancel', 'async', 'asynchronous', '异步'],
    tips: '对 batch/file 任务建立状态机：create -> in_progress -> completed，并明确信息链路中的文件依赖。'
  },
  {
    id: 'ops',
    label: '运维与错误码',
    color: '#f08a24',
    patterns: ['error', 'error_code', 'rate', 'quota', 'timeout', 'token', 'retry', 'balance'],
    tips: '将错误码映射成本地失败类型，建立重试与退避策略。'
  },
  {
    id: 'integration',
    label: '生态接入',
    color: '#0b7285',
    patterns: ['agent', 'integration', 'copilot', 'sdk', 'assistant', 'client'],
    tips: '关注输入适配、工具适配、结果回传与多模型兼容。'
  },
  {
    id: 'multimodal',
    label: '多模态',
    color: '#a13fd3',
    patterns: ['image', 'vision', 'audio', 'video', 'tts', 'multimodal', 'multimodal understanding'],
    tips: '将多模态输入单独建模：content_type、payload、输出结构要和文本链路分离。'
  }
];

const providerFeatureSpecs = [
  {
    id: 'protocol',
    label: '协议 / Chat Completion',
    color: '#2f68d6',
    importance: 1.4,
    patterns: ['chat', 'messages', 'role', 'chat completion', 'request', 'response', 'create-chat-completion', 'completions']
  },
  {
    id: 'tooling',
    label: '工具调用',
    color: '#1d7dd1',
    importance: 1.2,
    patterns: ['tools', 'tool_calls', 'tool call', 'function', 'tool_choice', 'json schema']
  },
  {
    id: 'stream',
    label: '流式 / SSE',
    color: '#6f42c1',
    importance: 1.0,
    patterns: ['stream', 'sse', 'data:', 'chunk', 'delta', '[done]']
  },
  {
    id: 'batch',
    label: '异步批处理',
    color: '#f08a24',
    importance: 1.0,
    patterns: ['batch', 'batch_create', 'batch_retrieve', 'batch_list', 'batch-cancel', 'batch list', '异步']
  },
  {
    id: 'error',
    label: '错误与重试',
    color: '#d9480f',
    importance: 1.1,
    patterns: ['error', 'error_code', 'error code', 'rate limit', 'quota', 'retry', '429', '5xx', 'balance']
  },
  {
    id: 'auth',
    label: '鉴权 / 安全',
    color: '#0f6f3f',
    importance: 1.0,
    patterns: ['api key', 'apikey', 'authorization', 'authorization header', 'bearer', 'x-api-key', '签名', '密钥']
  },
  {
    id: 'pricing',
    label: '计费 / 限流',
    color: '#0b7285',
    importance: 1.0,
    patterns: ['pricing', 'rate limit', 'limits', 'quota', 'rate', 'tpm', 'rpm', '收费', '计费']
  }
];

const adapterLessonBlocks = [
  {
    id: 'provider-adapter',
    title: 'Provider Adapter：把不同文档协议收敛成统一入口',
    intent: '不要让 Harness 直接依赖 DeepSeek/Kimi/GLM/MiMo 的原始字段。Provider Adapter 只做四件事：组请求、解析响应、映射错误、转成内部事件。',
    patterns: ['openai', 'anthropic', 'messages', 'role', 'chat', 'completion', 'api reference', 'introduction', 'quick-start'],
    topic: 'protocol',
    deliverables: ['ProviderRequestBuilder', 'ProviderStreamParser', 'ProviderErrorMapper', 'ProviderToolCallAdapter'],
    traps: ['base_url 与鉴权头不要写死在 ActionRunner', 'message role 差异要在 adapter 层抹平', '模型能力开关要记录到 providerProfile']
  },
  {
    id: 'tool-call',
    title: 'Tool Call：从 function.arguments 到 InternalAction',
    intent: '工具调用不是“模型会执行工具”，而是模型输出一个结构化申请。我们要把 name、arguments、tool_call_id 转成 ActionSchema + ActionRunner 能吃的内部动作。',
    patterns: ['tool', 'tool_call', 'tool_calls', 'function', 'json schema', 'strict', 'arguments', 'function-calling'],
    topic: 'tooling',
    deliverables: ['ActionSchema 映射表', 'arguments JSON.parse + schema validate', 'tool_call_id 回传策略', '工具白名单与权限门禁'],
    traps: ['function.arguments 经常是字符串，先 parse 再校验', 'schema 外字段要拒绝或降级', 'tool_result 必须能回到下一轮模型上下文']
  },
  {
    id: 'stream-parser',
    title: 'Streaming：把 SSE chunk 拆成可观察事件',
    intent: '流式不是简单拼文本，要区分 content_delta、reasoning_delta、tool_call_delta、usage、done，并保证中途失败也能留下 Evidence。',
    patterns: ['stream', 'streaming', 'sse', 'chunk', 'delta', 'reasoning', 'partial', '[done]', 'data:'],
    topic: 'stream',
    deliverables: ['ModelStreamEvent 类型', '增量 buffer', 'tool_call_delta 合并器', 'DONE/finish_reason 收口规则'],
    traps: ['reasoning_content 不等于最终回答', 'tool call 参数可能跨多个 chunk', '最后 usage chunk 不能丢']
  },
  {
    id: 'batch-file',
    title: 'Batch / Files：异步任务要做状态机',
    intent: 'Kimi 和 GLM 的 batch/file 文档适合训练异步执行思维：创建任务、轮询状态、读取 output_file_id/error_file_id，再把结果转 Observation。',
    patterns: ['batch', 'batches', 'files', 'file', 'upload', 'retrieve', 'cancel', '异步', 'output_file_id', 'error_file_id'],
    topic: 'batch',
    deliverables: ['BatchTaskState', 'file_id/batch_id 对账表', '轮询与超时策略', '输出文件解析器'],
    traps: ['不要把异步任务当同步响应处理', '失败文件也要变成 Evidence', '取消任务要可重入']
  },
  {
    id: 'ops-error',
    title: 'Error / Ops：错误码要变成可恢复策略',
    intent: '错误码不是只展示给用户，而是驱动 retry/backoff/降级/停止。ProviderError 要统一区分 auth、quota、rate_limit、schema_error、server_error。',
    patterns: ['error', 'errors', 'error code', 'rate limit', 'quota', 'balance', 'pricing', '429', '5xx', 'api-code'],
    topic: 'ops',
    deliverables: ['ProviderError 枚举', 'retry policy', '用户可读提示', '日志字段标准'],
    traps: ['401/403 不应重试', '429 需要退避与队列限速', 'schema 错误应回到 Adapter 修正而不是重跑工具']
  }
];

const stageOneCourseProfile = {
  title: 'DeepSeek 第一阶段：模型基础协议（57 篇）',
  stats: [
    {
      label: '本地出现形式',
      value: 'JSON record',
      detail: '不是 57 个 .md 文件；每篇是一个带 url/path/category/headings/codeSnippets 的对象。'
    },
    {
      label: '原始页面类型',
      value: '56 HTML',
      detail: '主要来自 DeepSeek 官网 Docusaurus 页面，抓取后抽取标题、摘要和代码块。'
    },
    {
      label: 'Markdown 标记',
      value: '1 条',
      detail: '仅 chat_prefix_completion 被标为 markdown 来源；学习时仍以结构化字段为主。'
    },
    {
      label: 'ccmimo 角色',
      value: '先整理，后复核',
      detail: 'ccmimo 产出课程草稿，Codex 再审稿、修正过度确定的协议表述。'
    }
  ],
  artifacts: [
    { label: '57 篇 JSON 包', href: 'docs/deepseek-stage1-57-docs.json' },
    { label: '57 篇 Markdown 导读', href: 'docs/deepseek-stage1-57-docs.md' },
    { label: 'Codex 复核课程', href: 'docs/deepseek-stage1-course.md' }
  ],
  chapters: [
    {
      id: 'request-response',
      title: '1. 请求与响应：Chat Completion 协议',
      topic: 'protocol',
      goal: '手写一次合法请求，能从响应中拆出 content、reasoning_content、tool_calls、usage。',
      docs: ['/api/create-chat-completion', '/api/deepseek-api', '/api/list-models', '/api/get-user-balance'],
      actions: ['固定 base_url、鉴权头、model、messages 的最小请求样本', '把 response choices/message/usage 做成解析器测试', '把模型列表与余额查询放入 ProviderProfile 初始化检查'],
      output: 'ProviderRequestBuilder + ProviderResponseParser 的第一版样例'
    },
    {
      id: 'thinking-tool',
      title: '2. 思考模式与 Tool Calls',
      topic: 'tooling',
      goal: '理解模型只提出 tool call，真正执行仍由 Harness/ActionRunner 完成。',
      docs: ['/guides/thinking_mode', '/guides/tool_calls', '/api_samples/thinking_mode_api_example_tool_call', '/api_samples/thinking_mode_api_example_tool_call_output'],
      actions: ['把 reasoning_content 和最终 content 分通道处理', '把 function.arguments 从字符串 parse 成 JSON 后再 schema validate', '保留 tool_call_id，并把 tool result 回传到下一轮 messages'],
      output: 'DeepSeekToolCallAdapter + ActionSchema 映射表'
    },
    {
      id: 'ops-cost',
      title: '3. 错误处理、计费与限流',
      topic: 'ops',
      goal: '把官方错误码、usage、pricing、rate limit 翻译成可恢复策略。',
      docs: ['/quick_start/error_codes', '/quick_start/pricing', '/quick_start/rate_limit', '/quick_start/token_usage', '/guides/kv_cache', '/faq'],
      actions: ['把 auth/quota/rate_limit/schema/server_error 归一成 ProviderError', '对 429/5xx 做有限重试和指数退避', '只按官方 pricing 与 usage 字段解释费用，不在业务代码里硬编码价格公式'],
      output: 'DeepSeekErrorMapper + retry/backoff policy + 成本观测字段'
    },
    {
      id: 'agent-integration',
      title: '4. 生态接入：Coding Agent 与兼容层',
      topic: 'integration',
      goal: '解释为什么会有 DeepSeek-TUI：开放协议足够清楚，就能包装成 TUI/CLI/IDE Agent。',
      docs: ['/quick_start/agent_integrations/claude_code', '/quick_start/agent_integrations/github_copilot', '/quick_start/agent_integrations/copilot_cli', '/guides/coding_agents', '/guides/anthropic_api', '/quick_start/agent_integrations/crush', '/quick_start/agent_integrations/oh_my_pi'],
      actions: ['对比 OpenAI-compatible 与 Anthropic-compatible 的字段差异', '把第三方工具配置沉淀为 adapter sample，而不是散落在 README', '记录 role、reasoning、tool call 的兼容转换规则'],
      output: 'ProviderAdapterProfile + IntegrationSamples'
    }
  ],
  nextProviders: [
    {
      provider: 'kimi',
      title: 'Kimi：用 Batch Retrieve 训练异步状态机',
      source: 'batch-retrieve / files / tool-use',
      action: '把 batch_id、status、output_file_id、error_file_id 转成 BatchTaskState 与 Evidence。'
    },
    {
      provider: 'glm',
      title: 'GLM：用能力矩阵训练 ProviderProfile',
      source: 'start introduction / model / tool / knowledge docs',
      action: '把模型、工具、知识库、多模态拆成 capability tags，给运行时路由使用。'
    },
    {
      provider: 'mimo',
      title: 'Xiaomi MiMo：用兼容层训练协议转换',
      source: 'OpenAI API / Anthropic API / tool calling / web search',
      action: '抽出双协议请求字段、stop reason、reasoning/tool result 的转换规则。'
    }
  ],
  daily: [
    'Day 1：跑通 chat/completions、models、balance，保留真实请求与响应样本。',
    'Day 2：把请求体 schema 写成参数速查表，明确哪些字段进 ProviderProfile。',
    'Day 3：开启 thinking，验证 reasoning_content 不等于最终 content。',
    'Day 4：完成一轮 tool call：assistant tool_calls -> ActionRunner -> tool result -> final answer。',
    'Day 5：触发错误、记录 usage、设计 429/5xx 的 retry/backoff。',
    'Day 6：接入一个 coding agent 工具，验证 DeepSeek 作为后端 provider 可用。',
    'Day 7：输出一页 Adapter 面试表达和一张实现验收表。'
  ]
};

const providerAdapterNotes = {
  deepseek: {
    line: '第一版样板。DeepSeek 的 Tool Calls、Thinking、Chat Completion、Error Codes 适合拿来定统一 ProviderAdapter 接口。',
    focus: ['strict JSON Schema', 'reasoning_content 分流', 'tool_call_id 回传', 'OpenAI-compatible 请求结构']
  },
  kimi: {
    line: '异步与文件样板。Kimi 的 batch-retrieve / files / partial / tool-use 文档适合把状态机和文件结果链路讲清楚。',
    focus: ['Batch 状态机', 'File API 依赖', 'Partial/Streaming 差异', 'Tool Use 与 OpenAI 迁移']
  },
  glm: {
    line: '能力矩阵样板。GLM 文档面广，适合提炼“模型/工具/知识库/批处理/多模态”的能力路由。',
    focus: ['模型能力标签', '知识库与工具白名单', '中文错误码映射', 'Agent/Coding 生态入口']
  },
  mimo: {
    line: '兼容层样板。MiMo 更像网关型平台，适合验证 OpenAI/Anthropic 双协议兼容和 reasoning/toolcall 回传。',
    focus: ['OpenAI API', 'Assistants API', 'reasoning_content 回传', 'tool-calling/web-search']
  }
};

const providerPlaybookProfiles = {
  deepseek: {
    summary: '协议规范最完整，适合作为第一版 adapter 模板。强调 strict mode、tool schema 和 stream chunk 边界控制。',
    pillars: [
      { name: '协议基线', pattern: ['chat', 'messages', 'role', 'request', 'response', 'create-chat-completion'], action: '先跑通单次 chat completion，固定 role/message 结构。' },
      { name: 'Tool 调用闭环', pattern: ['tools', 'tool_calls', 'tool_call_id', 'function'], action: '输出转换 -> 参数校验 -> 工具执行 -> tool role 回传。' },
      { name: '流式事件链', pattern: ['stream', 'reasoning', 'tool_call_delta', 'data:', 'done'], action: '将 delta 分为 reasoning/content/tool 三个通道并拼装。' },
      { name: '批处理验证', pattern: ['batch', 'batch_create', 'batch_retrieve', 'batch_cancel'], action: '建立状态机：create -> in_progress -> completed。' },
      { name: '错误治理', pattern: ['error', 'error_code', 'rate limit', 'retry'], action: '统一可重试/不可重试错误类型，接入指数退避。' }
    ],
    focusHint: '建议优先完成 DeepSeek 作为 adapter 骨架，再对比 Kimi/MiMo 的偏差。'
  },
  kimi: {
    summary: '文档覆盖全面，尤其是 Batch/API/Tool Use。适合做异步与文件链路的对照实现样例。',
    pillars: [
      { name: '协议入口', pattern: ['chat', 'partial', 'messages', 'request', 'response'], action: '确认 messages/response 的字段一致性，区分 partial 与完整返回。' },
      { name: 'Tool Use 专项', pattern: ['tool-use', 'tool_calls', 'function', 'tool_call'], action: '复现 tool call 形成 action 适配层，重点观察 arguments 与 schema 约束。' },
      { name: 'Batch 生命周期', pattern: ['batch', 'files', 'batch_create', 'batch_retrieve', 'batch_cancel'], action: '建立 file_id -> batch_id 的依赖关系和状态回溯。' },
      { name: '多端接入', pattern: ['agent-support', 'cli', 'openclaw', 'openai'], action: '抽出客户端适配差异，统一成 provider adapter 输出。' },
      { name: '限制与定价', pattern: ['pricing', 'limits', 'error', 'estimate'], action: '把限额与计费行为映射到本地观察指标。' }
    ],
    focusHint: 'Kimi 的亮点在于工具/批处理链路完整，适合把 adapter 做到稳定异步。'
  },
  glm: {
    summary: '生态最广，API 分面复杂。适合搭建可扩展 providerProfile：对齐多类工具、知识库、模型和音视频场景。',
    pillars: [
      { name: '多模型矩阵', pattern: ['模型-api', 'api-reference', 'list', 'model', 'agent'], action: '把模型类型与能力标签映射为运行时路由。' },
      { name: '工具链路', pattern: ['工具-api', 'ocr', 'web', '搜索', 'file_parser', '知识库'], action: '将工具功能按用途封装为安全白名单。' },
      { name: '异步与文件', pattern: ['异步', '文件', 'batch', 'files', 'asynchronous'], action: '做异步状态追踪 + 文件提取链路的回归测试。' },
      { name: '错误码统一', pattern: ['错误码', 'faq/api-code', 'fee', 'batch', 'quota'], action: '提取中文错误码含义，输出统一的 retry policy。' },
      { name: '接入工作流', pattern: ['agent', 'learning-resources', 'coding-plan', 'mcp'], action: '将 agentic 能力映射到现有 Runtime 适配器。' }
    ],
    focusHint: 'GLM 的优势是场景丰富，但要先压缩为 5 类核心动作以免扩展复杂度失控。'
  },
  mimo: {
    summary: '接口入口清晰、文档更偏接入网关与兼容层。适合做 OpenAI/Anthropic 双栈适配的参考实现。',
    pillars: [
      { name: 'OpenAI 兼容', pattern: ['openai-api', 'chat', 'request', 'messages'], action: '按 OpenAI 结构先打通最小请求流程。' },
      { name: 'Anthropic 兼容', pattern: ['anthropic-api', 'tool', 'stop_reason'], action: '比对差异字段并建立兼容分支。' },
      { name: '工具调用', pattern: ['tool', 'tool-calling', 'web-search', 'usage-guide'], action: '统一 reasonning_content、function arguments 与结果回传。' },
      { name: '多模态', pattern: ['multimodal', 'audio', 'image', 'video', 'speech'], action: '将 payload 格式与 content_type 做统一预处理。' },
      { name: '部署与工具生态', pattern: ['integration', 'openclaw', 'hermes', 'cline', 'open-code'], action: '建立集成文档模板，统一 CLI/IDE 入口。' }
    ],
    focusHint: 'MiMo 适合作为多框架接入场景的补充验证集。'
  }
};

const pathLearnMap = [
  {
    id: 'start',
    title: '第一阶段：模型基础协议',
    include: ['overview', 'quick_start', 'api'],
    focusTag: 'protocol',
    tip: '目标：理解聊天请求、角色体系、消息结构、返回码；跑通最小调用。'
  },
  {
    id: 'tool',
    title: '第二阶段：工具调用闭环',
    include: ['guides', 'api_samples'],
    focusTag: 'tooling',
    tip: '目标：将 tool call 解析、参数校验、执行回传形成闭环。'
  },
  {
    id: 'streaming',
    title: '第三阶段：流式与思考链',
    include: ['api_samples', 'guides', 'api'],
    focusTag: 'thinking',
    tip: '目标：处理 stream delta，并把 reasoning 与最终结果准确分发。'
  },
  {
    id: 'ops',
    title: '第四阶段：生产与观测',
    include: ['faq', 'news', 'pricing'],
    focusTag: 'ops',
    tip: '目标：建立错误码映射、日志、指标、重试与演进策略。'
  },
  {
    id: 'batch',
    title: '第五阶段：异步与批量任务',
    include: ['api', 'guides', 'files'],
    focusTag: 'batch',
    tip: '目标：覆盖 batch 状态机、文件流程与异步返回的可观测闭环。'
  },
  {
    id: 'agent',
    title: '第六阶段：生态接入',
    include: ['integration', 'news'],
    focusTag: 'integration',
    tip: '目标：对接工具生态（客户端/SDK/Agent 框架）并沉淀兼容层。'
  }
];

const pinnedTaskCatalog = [
  {
    id: 'task-1',
    title: 'Step 1：先读协议入口，建立问题边界',
    description: '先把 Chat Completion 的请求/响应结构、messages/role、工具字段和返回码边界写成一页纸。',
    estimate: '30 分钟',
    category: 'overview',
    topic: 'protocol',
    deliverable: '产出：接口边界清单（role/message/tool_call/error）',
    focus: ['请求参数齐全性', '消息角色闭环', '停止条件', '错误码映射入口'],
    actionLabel: '开始 Step1',
    actionNote: '适配法：先定义输入/输出 schema，再确认哪些异常由模型侧返回。'
  },
  {
    id: 'task-2',
    title: 'Step 2：把 Tool Call 讲清楚',
    description: '把 `tools`、`tool_calls`、`function.arguments` 与 ActionSchema 一一映射并做 JSON 安全转换。',
    estimate: '40 分钟',
    category: 'api',
    topic: 'tooling',
    deliverable: '产出：工具调用适配草图（输入验证 + 执行映射）',
    focus: ['tool schema 格式', 'arguments 解析失败重试', 'tool_call_id 回传'],
    actionLabel: '开始 Step2',
    actionNote: '开发法：不信任模型输出 JSON，先 parse，再校验。'
  },
  {
    id: 'task-3',
    title: 'Step 3：串流与思考链分发',
    description: '把 SSE 解析为 content / reasoning / tool_call_delta / [DONE]，并明确每段流的回传时机。',
    estimate: '45 分钟',
    category: 'api',
    topic: 'stream',
    deliverable: '产出：Stream 事件状态图 + 单测用例',
    focus: ['增量内容拼接', 'reasoning 与 content 分通道', '结束符收敛'],
    actionLabel: '开始 Step3',
    actionNote: '教程动作：跑 sample，观察 chunk 到最终文本的完整链路。'
  },
  {
    id: 'task-4',
    title: 'Step 4：错误治理与恢复机制',
    description: '对齐 DeepSeek 错误码，输出统一失败类型并加上重试策略（429/5xx/模型拒绝）。',
    estimate: '50 分钟',
    category: 'faq',
    topic: 'ops',
    deliverable: '产出：错误分类表 + 退避策略',
    focus: ['错误码分类', '指数退避', '可重试与不可恢复拆分'],
    actionLabel: '开始 Step4',
    actionNote: '开发法：把“不可恢复”打到日志且不重试，减少无效请求。'
  },
  {
    id: 'task-5',
    title: 'Step 5：搭一个最小端到端闭环',
    description: '从模型 -> tool_call -> runner -> evidence -> observation，一条流水线跑起来，先支持 1-2 个工具。',
    estimate: '60 分钟',
    category: 'guides',
    topic: 'integration',
    deliverable: '产出：可演示的最小适配器闭环',
    focus: ['动作执行权限', '结果回传结构', '复盘日志输出'],
    actionLabel: '开始 Step5',
    actionNote: '教程动作：把一次失败也记录，形成“可复盘”习惯。'
  },
  {
    id: 'task-6',
    title: 'Step 6：复盘并写成教程章节',
    description: '把上面 5 步总结成可复用教学内容：输入、动作、异常、验证、迭代。',
    estimate: '35 分钟',
    category: 'guides',
    topic: 'protocol',
    deliverable: '产出：阶段教学大纲与复盘模板',
    focus: ['知识结构化', '决策规则沉淀', '迭代验证清单'],
    actionLabel: '开始 Step6',
    actionNote: '开发法：把“边做边学”沉淀为下一轮可复用内容。'
  },
  {
    id: 'task-7',
    title: 'Step 7：补齐 Kimi 批处理闭环',
    description: '专门核对 batch create/list/retrieve/cancel 的状态转移和错误码映射，补齐文件接口与异步结果。',
    estimate: '45 分钟',
    category: 'api',
    topic: 'batch',
    provider: 'kimi',
    deliverable: '产出：Kimi Batch 状态机 + 对账日志',
    focus: ['batch 状态机定义', 'file_id 依赖关系', '任务失败重试策略'],
    actionLabel: '开始 Step7',
    actionNote: '优先抓取 batch_* 与 files* 相关文档，先跑一个 create -> list -> retrieve。'
  },
  {
    id: 'task-8',
    title: 'Step 8：补齐 GLM/MiMo 错误码',
    description: '把 GLM/MiMo 的错误码页、速率说明、计费说明转成统一本地失败分类并映射重试策略。',
    estimate: '45 分钟',
    category: 'faq',
    topic: 'ops',
    provider: 'glm',
    deliverable: '产出：跨 Provider ErrorCode 统一表',
    focus: ['错误码归类', '可重试判定', 'provider 差异记录'],
    actionLabel: '开始 Step8',
    actionNote: '建议先对比 DeepSeek errors、Kimi errors、MiMo error-codes。'
  },
  {
    id: 'task-9',
    title: 'Step 9：补齐 Kimi 流式与 Partial 模式',
    description: '对比 Kimi chat 与 partial mode 在 chunk 结构、tool delta 与终止事件上的差异，给出统一 stream parser。',
    estimate: '40 分钟',
    category: 'api',
    topic: 'stream',
    provider: 'kimi',
    deliverable: '产出：流式解析对照矩阵（Kimi/DeepSeek）',
    focus: ['stream chunk 顺序', 'partial 与 stop 的边界', 'tool delta 回填'],
    actionLabel: '开始 Step9',
    actionNote: '建议同时跑 one-shot 与 tool-calling 场景，观察 delta 对齐。'
  },
  {
    id: 'task-10',
    title: 'Step 10：搭建 GLM 统一工具能力仓',
    description: '提炼 GLM 工具能力（OCR、知识库、Web 搜索、模型调用）成统一 ActionSchema 子集，支持能力开关。',
    estimate: '50 分钟',
    category: 'api',
    topic: 'tooling',
    provider: 'glm',
    deliverable: '产出：GLM 工具能力清单 + 权限开关表',
    focus: ['工具白名单', '参数映射', '返回值结构抽象'],
    actionLabel: '开始 Step10',
    actionNote: '先用最小集合：知识库检索 + 工具调用 + 文件解析。'
  },
  {
    id: 'task-11',
    title: 'Step 11：搭建 MiMo 双协议兼容层',
    description: '将 OpenAI/Anthropic 兼容差异固化为转换规则，并给出 provider-level 的请求头/参数适配。',
    estimate: '60 分钟',
    category: 'integration',
    topic: 'integration',
    provider: 'mimo',
    deliverable: '产出：双协议适配规则表 + 适配器代码骨架',
    focus: ['请求字段差异', '停止原因映射', 'tool_calls 序列化策略'],
    actionLabel: '开始 Step11',
    actionNote: '建议固定 3 个最小 case：chat、tool_use、reasoning_content。'
  },
  {
    id: 'task-12',
    title: 'Step 12：形成多 Provider 统一交付模板',
    description: '把 DeepSeek/Kimi/GLM/MiMo 四类文档都转化为统一的“学习-实现-验证”模板，形成明天可复用的 checklist。',
    estimate: '55 分钟',
    category: 'guides',
    topic: 'protocol',
    deliverable: '产出：跨供应商适配交付模板',
    focus: ['课程化输出', '验收用例', '回归测试清单'],
    actionLabel: '开始 Step12',
    actionNote: '本次为关键里程碑：输出完整可交付的 Adapter 教程。'
  }
];

function getProviderMeta(provider) {
  return providerDefs[provider] || providerDefs.deepseek;
}

function formatProviderCount(provider) {
  return provider === 'all' ? '全部' : getProviderLabel(provider);
}

function inferProviderFromUrl(url) {
  try {
    const host = new URL(url).hostname.toLowerCase();
    if (host.includes('api-docs.deepseek.com')) return 'deepseek';
    if (host.includes('platform.kimi.com')) return 'kimi';
    if (host.includes('docs.bigmodel.cn')) return 'glm';
    if (host.includes('platform.xiaomimimo.com')) return 'mimo';
  } catch (error) {
    // ignore malformed urls
  }
  return 'deepseek';
}

function getProviderLabel(provider) {
  return getProviderMeta(provider).label;
}

function filterByProvider(items, provider = activeProvider) {
  if (!provider || provider === 'all') return items;
  return items.filter((doc) => doc.provider === provider);
}

function renderProviderChips() {
  const container = document.getElementById('providerPills');
  if (!container) return;
  container.innerHTML = '';
  providerOrder.forEach((providerKey) => {
    const item = providerKey === 'all'
      ? { id: 'all', label: '全部 Provider', count: docs.length, color: '#26457d' }
      : { id: providerKey, ...providerDefs[providerKey], count: docs.filter((doc) => doc.provider === providerKey).length };
    const chip = document.createElement('button');
    chip.className = `provider-chip ${activeProvider === item.id ? 'active' : ''}`;
    chip.style.setProperty('--provider-chip-color', item.color);
    chip.title = `${item.label} 共 ${item.count} 篇`;
    chip.innerHTML = `${item.label} (${item.count})`;
    chip.addEventListener('click', () => {
      activeProvider = item.id;
      const providerSelect = document.getElementById('providerSelect');
      if (providerSelect) providerSelect.value = item.id;
      const providerMeta = getProviderMeta(item.id);
      const providerHint = document.getElementById('providerHint');
      if (providerHint) {
        providerHint.textContent = item.id === 'all' ? '当前展示：全部供应商' : `当前展示：${providerMeta.label}`;
      }
      syncFilterUI();
      renderMain();
    });
    container.appendChild(chip);
  });
}

function renderProviderSelect() {
  const select = document.getElementById('providerSelect');
  if (!select) return;
  const current = select.value || activeProvider;

  select.innerHTML = '';
  providerOrder.forEach((providerKey) => {
    const item = providerKey === 'all'
      ? { id: 'all', label: '全部 Provider' }
      : { id: providerKey, ...providerDefs[providerKey] };
    const option = document.createElement('option');
    option.value = item.id;
    option.textContent = item.label;
    select.appendChild(option);
  });

  if ([...select.options].some((option) => option.value === current)) {
    select.value = current;
  } else {
    select.value = 'all';
    activeProvider = 'all';
  }

  const providerHint = document.getElementById('providerHint');
  if (providerHint) {
    providerHint.textContent = activeProvider === 'all' ? '当前展示：全部供应商' : `当前展示：${getProviderLabel(activeProvider)}`;
  }
}

function getTodayDate() {
  const now = new Date();
  return now.toISOString().slice(0, 10);
}

function normalizeTaskState(value) {
  if (value && typeof value === 'object' && typeof value.done === 'boolean') {
    return {
      done: value.done,
      doneAt: typeof value.doneAt === 'string' ? value.doneAt : '',
      note: typeof value.note === 'string' ? value.note : ''
    };
  }

  return {
    done: value === true,
    doneAt: '',
    note: ''
  };
}

function getTaskState(taskId) {
  return normalizeTaskState(pinnedTaskStates[taskId]);
}

function formatTimeString(input) {
  if (!input) return '';
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) return '';
  return date.toLocaleString();
}

function getInitialTaskState() {
  return pinnedTaskCatalog.reduce((acc, task) => {
    acc[task.id] = { done: false, doneAt: '', note: '' };
    return acc;
  }, {});
}

function getTodayHint() {
  const now = new Date();
  return `今日学习：${now.toLocaleDateString()} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
}

function getMethodMilestone(doneCount) {
  if (doneCount === 0) return '今日开发法：先做协议边界，再定义可执行动作。';
  if (doneCount < 3) return '今日开发法：进入工具链映射阶段，先补齐 tool_call 与参数验证。';
  if (doneCount < 5) return '今日开发法：串流/错误治理同步推进，建立观测闭环。';
  if (doneCount < 6) return '今日开发法：开始写成教程章节，把经验写进复盘。';
  return '今日开发法：本轮开发法已完成，进行复盘并补充未覆盖文档。';
}

function syncPinnedTaskStateFromStorage() {
  pinnedTaskDate = getTodayDate();
  const seed = getInitialTaskState();
  try {
    const raw = localStorage.getItem(pinnedTaskStorageKey);
    if (!raw) {
      pinnedTaskStates = seed;
      return;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      pinnedTaskStates = seed;
      return;
    }

    if (parsed.date !== pinnedTaskDate || !parsed.state || typeof parsed.state !== 'object') {
      pinnedTaskStates = seed;
      return;
    }

    pinnedTaskCatalog.forEach((task) => {
      const value = parsed.state[task.id];
      if (value !== undefined) {
        seed[task.id] = normalizeTaskState(value);
      }
    });
    pinnedTaskStates = seed;
  } catch (error) {
    pinnedTaskStates = seed;
  }
}

function togglePinnedTask(taskId) {
  const next = getTaskState(taskId);
  next.done = !next.done;
  next.doneAt = next.done ? new Date().toISOString() : '';
  pinnedTaskStates[taskId] = next;
  persistPinnedTaskStates();
}

function renderPinnedHeader() {
  const todayStamp = document.getElementById('todayStamp');
  const pinnedStatus = document.getElementById('pinnedStatus');
  const pinnedMethod = document.getElementById('pinnedMethod');
  const focusHint = document.getElementById('pinnedFocusHint');
  const pinHint = document.getElementById('pinnedProgressHint');
  const uncoveredHint = document.getElementById('pinnedProgressUncovered');
  const visibleTasks = pinnedTaskCatalog.filter((task) => !task.provider || activeProvider === 'all' || task.provider === activeProvider);
  const doneCount = visibleTasks.filter((task) => getTaskState(task.id).done).length;
  const total = visibleTasks.length || pinnedTaskCatalog.length || 1;

  if (todayStamp) {
    todayStamp.textContent = getTodayHint();
  }
  if (pinnedStatus) {
    pinnedStatus.textContent = `待打卡任务：${total - doneCount} / ${total}`;
  }
  if (pinHint) {
    if (!doneCount) {
      pinHint.textContent = '学习建议：从 Step 1 开始，先建立「协议边界」与「失败回传」基线。';
    } else if (doneCount < 3) {
      pinHint.textContent = `学习建议：已完成 ${doneCount} 项，建议继续 Step ${doneCount + 1}。`;
    } else {
      pinHint.textContent = '学习建议：当前已形成最小闭环草图，建议补齐复盘章节。';
    }
  }
  if (pinnedMethod) {
    pinnedMethod.textContent = getMethodMilestone(doneCount);
  }
  if (focusHint) {
    if (!focusHint.textContent || !focusHint.textContent.startsWith('当前焦点：')) {
      focusHint.textContent = '当前焦点：无';
    }
  }
  if (uncoveredHint) {
    uncoveredHint.textContent = `未打卡：${total - doneCount} 项`;
  }
}

function persistPinnedTaskStates() {
  try {
    const payload = {
      date: getTodayDate(),
      state: pinnedTaskStates
    };
    localStorage.setItem(pinnedTaskStorageKey, JSON.stringify(payload));
  } catch (error) {
    // localStorage 可能被浏览器策略禁用，静默忽略
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function escapeHtml(value) {
  const safe = value === null || value === undefined ? '' : String(value);
  return safe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function looksMojibake(value) {
  return typeof value === 'string'
    && /(?:Ã|Â|â€|â„|å|æ|ç|è|é|ä¸|ä½|ï¼|ã€)/.test(value)
    && !/[\u4e00-\u9fff]/.test(value);
}

function repairMojibake(value) {
  if (typeof value !== 'string') return value;
  let text = value
    .replace(/\u200b/g, '')
    .replace(/Â°/g, '°')
    .replace(/Â·/g, '·')
    .replace(/â†’/g, '→')
    .replace(/â€œ/g, '“')
    .replace(/â€/g, '”')
    .replace(/â€™/g, '’')
    .replace(/â€“/g, '–')
    .replace(/â€”/g, '—')
    .replace(/â€¦/g, '…')
    .replace(/â€‹/g, '');

  if (looksMojibake(text) && typeof TextDecoder !== 'undefined') {
    try {
      const bytes = Uint8Array.from(Array.from(text, (char) => char.charCodeAt(0) & 0xff));
      const decoded = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
      if (decoded && decoded !== text && /[\u4e00-\u9fff]|[°·→“”’–—…]/.test(decoded)) {
        text = decoded;
      }
    } catch (error) {
      // Some browser engines may refuse malformed byte sequences. Keep the readable original.
    }
  }

  return text.replace(/\s+/g, ' ').trim();
}

function normalizeArray(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return [value];
}

function normalizePath(raw) {
  if (!raw) return '/';
  return String(raw).trim().replace(/\/+$/, '') || '/';
}

function normalizeSnippets(snippets) {
  const arr = normalizeArray(snippets)
    .flatMap((item) => (typeof item === 'string' ? [item] : []))
    .map((s) => repairMojibake(s).trim())
    .filter(Boolean);
  return [...new Set(arr)].slice(0, 10);
}

function normalizeHeadings(headings) {
  return normalizeArray(headings)
    .map((heading) => {
      if (typeof heading === 'string') {
        return { level: 2, text: repairMojibake(heading) };
      }
      return {
        ...heading,
        text: repairMojibake(heading?.text || '')
      };
    })
    .filter((heading) => heading.text);
}

function splitPath(path) {
  const p = normalizePath(path).replace(/^\/+/, '');
  const first = p.split('/')[0];
  return first || 'overview';
}

function inferCategoryFromDoc(raw, fallback = 'overview') {
  const source = `${raw?.path || ''} ${raw?.url || ''} ${raw?.title || ''}`.toLowerCase();
  if (!source.trim()) return fallback || 'overview';
  if (/openapi/.test(source)) return 'openapi';
  if (/promptlibrary|prompt-library/.test(source)) return 'prompt-library';
  if (/quick[-_]?start|quickstart|first-api-call/.test(source)) return 'quick_start';
  if (/pricing|price|billing|balance|estimate|quota|rate[-_]?limit|payment|fee/.test(source)) return 'pricing';
  if (/error|errors|error[-_]?codes?|api-code/.test(source)) return 'error';
  if (/batch|batches|批处理/.test(source)) return 'batch';
  if (/files?|upload|file-parser|file-extract|文件/.test(source)) return 'files';
  if (/knowledge|知识库/.test(source)) return 'knowledge';
  if (/tool|tools|tool-use|tool-calling|function-calling|web-search|ocr|联网搜索/.test(source)) return 'tool';
  if (/agent|integration|openclaw|opencode|hermes|assistant|claude|anthropic|coding-plan|mcp/.test(source)) return 'integration';
  if (/models?|model-overview|list-models|模型/.test(source)) return 'models';
  if (/api_samples/.test(source)) return 'api_samples';
  if (/api-reference|api_reference/.test(source)) return 'api-reference';
  if (/\/api\//.test(source)) return 'api';
  if (/best-practice|benchmark-best-practice|prompt-best-practice/.test(source)) return 'best-practice';
  if (/asyncapi|realtime|异步/.test(source)) return 'asyncapi';
  if (/news|updates?|release|new-releases|feature-updates/.test(source)) return 'news';
  if (/faq|issues/.test(source)) return 'faq';
  if (/agreement|terms|privacy|service/.test(source)) return 'terms';
  if (/guide|guides|usage-guide|capabilities|develop|introduction/.test(source)) return 'guides';
  return fallback || 'overview';
}

function normalizeCategory(category, raw = {}) {
  let safe = String(category || '').trim().toLowerCase();
  if (!safe) safe = 'overview';
  if (safe === 'updates' || safe === 'update') return 'news';
  if (safe === 'promptlibrary') return 'prompt-library';
  if (safe === 'openapi.json') return 'openapi';
  if (safe === 'docs' || safe === 'static' || safe === 'overview') {
    return inferCategoryFromDoc(raw, safe === 'static' ? 'overview' : safe);
  }
  const known = new Set([
    'markdown-page',
    'prompt-library',
    'faq',
    'api',
    'api-reference',
    'guides',
    'api_samples',
    'quick_start',
    'overview',
    'news',
    'error',
    'integration',
    'files',
    'batch',
    'pricing',
    'models',
    'model',
    'tool',
    'terms',
    'knowledge',
    'knowledge-base',
    'asyncapi',
    'best-practice',
    'openapi'
  ]);
  if (known.has(safe)) return safe;
  return inferCategoryFromDoc(raw, splitPath(safe));
}

function toSearchText(doc) {
  return `${doc.title || ''} ${doc.url || ''} ${doc.path || ''} ${doc.summary || ''} ${doc.provider || ''} ${doc.providerLabel || ''} ${normalizeArray(doc.headings).map((h) => h.text || '').join(' ')} ${doc.category || ''} ${doc.tags ? doc.tags.join(' ') : ''}`.toLowerCase();
}

function detectTopics(doc) {
  const source = toSearchText(doc).toLowerCase();
  const topics = new Set();
  topicRules.forEach((rule) => {
    for (const pattern of rule.patterns) {
      if (source.includes(String(pattern).toLowerCase())) {
        topics.add(rule.id);
        break;
      }
    }
  });

  if ((doc.path || '').includes('tool') || (doc.path || '').includes('function')) topics.add('tooling');
  if ((doc.path || '').includes('stream') || (doc.path || '').includes('sse')) topics.add('stream');
  if ((doc.path || '').includes('batch')) topics.add('batch');
  if ((doc.path || '').includes('error') || (doc.path || '').includes('usage')) topics.add('ops');
  if (doc.category === 'api_samples') topics.add('tooling');
  if (doc.category === 'quick_start') topics.add('protocol');
  if (doc.category === 'tool') topics.add('tooling');
  if (doc.category === 'batch') topics.add('batch');
  if (doc.category === 'files' || doc.category === 'knowledge') topics.add('integration');
  if (doc.category === 'error' || doc.category === 'pricing') topics.add('ops');

  if (!topics.size) topics.add('protocol');
  return [...topics];
}

function calcDifficulty(doc) {
  const headingCount = normalizeArray(doc.headings).length;
  const snippetCount = normalizeSnippets(doc.codeSnippets).length;
  const topicCount = doc.tags.length;
  let score = headingCount * 3 + snippetCount * 13 + topicCount * 10;
  if (doc.category === 'api') score += 18;
  if (doc.category === 'api_samples') score += 8;
  if (doc.tags.includes('stream')) score += 10;
  if (doc.tags.includes('ops')) score += 8;
  return clamp(Math.round(score), 16, 100);
}

function calcValueScore(doc) {
  const snippetCount = normalizeSnippets(doc.codeSnippets).length;
  const topicCount = doc.tags.length;
  const headingCount = normalizeArray(doc.headings).length;
  let score = snippetCount * 16 + headingCount * 2 + topicCount * 9;
  if (doc.tags.includes('tooling')) score += 18;
  if (doc.tags.includes('protocol')) score += 10;
  if (doc.tags.includes('stream')) score += 10;
  if (doc.category === 'api') score += 20;
  if (doc.category === 'api_samples') score += 12;
  return clamp(Math.round(score), 8, 100);
}

function detectProviderCoverageText(doc) {
  return toSearchText(doc).toLowerCase();
}

function getProviderCoverage(docs, provider, feature) {
  const providerDocs = docs.filter((doc) => doc.provider === provider);
  const matches = providerDocs.filter((doc) => {
    const content = detectProviderCoverageText(doc);
    return feature.patterns.some((pattern) => content.includes(pattern));
  });
  const total = providerDocs.length || 0;
  const count = matches.length;
  const percent = total ? Math.round((count / total) * 100) : 0;
  const hitPatternCount = feature.patterns.filter((key) => matches.some((doc) => detectProviderCoverageText(doc).includes(key))).length;
  const score = clamp(Math.round((((percent / 100) * 7) + (hitPatternCount / Math.max(1, feature.patterns.length)) * 3) * feature.importance), 0, 100);
  const samples = matches.slice(0, 2).map((doc) => `${doc.title || doc.url}`);
  return {
    providerDocs: total,
    matched: count,
    percent: percent,
    score,
    samples
  };
}

function isHighValueDoc(doc) {
  return doc.hasCode && (doc.valueScore >= 42 || (doc.tags.includes('tooling') && doc.tags.includes('protocol')) || ['api', 'tool', 'batch', 'files'].includes(doc.category));
}

function normalizeTopicName(id) {
  const rule = topicRules.find((item) => item.id === id);
  return rule ? rule.label : id;
}

function headingPreview(headings, compact) {
  const list = normalizeArray(headings);
  if (!list.length) return '<p>暂无可提取标题</p>';
  return `<ul>${list.slice(0, compact ? 3 : 10).map((h) => `<li>${escapeHtml(`H${h.level || '?'} ${h.text || ''}`)}</li>`).join('')}</ul>`;
}

function buildDocs(rawDocs) {
  return normalizeArray(rawDocs).map((raw) => {
    const category = normalizeCategory(raw.category || splitPath(raw.path), raw);
    const title = repairMojibake(raw.title || raw.path || raw.url || '未命名文档');
    const path = normalizePath(raw.path || raw.url || '');
    const provider = (raw.provider || inferProviderFromUrl(raw.url || '') || 'deepseek');
    const doc = {
      ...raw,
      title: String(title),
      path,
      url: raw.url || '',
      provider,
      providerLabel: getProviderLabel(provider),
      category,
      categoryLabel: zhCategory[category] || category,
      headings: normalizeHeadings(raw.headings),
      codeSnippets: normalizeSnippets(raw.codeSnippets),
      summary: repairMojibake(raw.summary || '')
    };
    doc.tags = detectTopics(doc);
    doc.headingCount = normalizeArray(doc.headings).length;
    doc.snippetCount = doc.codeSnippets.length;
    doc.difficulty = calcDifficulty(doc);
    doc.valueScore = calcValueScore(doc);
    doc.hasCode = doc.snippetCount > 0;
    return doc;
  });
}

function byCategory(items, category = activeCategory) {
  if (category === 'all') return items;
  return items.filter((doc) => doc.category === category);
}

function byTopic(items, topic = activeTopic) {
  if (topic === 'all') return items;
  return items.filter((doc) => doc.tags.includes(topic));
}

function bySearch(items, keyword) {
  if (!keyword) return items;
  const terms = keyword.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return items.filter((doc) => {
    const source = toSearchText(doc);
    return terms.every((term) => source.includes(term));
  });
}

function getFilteredList(keyword, options = {}) {
  const category = options.category || activeCategory;
  const topic = options.topic || activeTopic;
  const useHighValue = options.hasOwnProperty('highValue') ? options.highValue : highValueMode;
  let list = [...docs];
  list = filterByProvider(list, options.provider || activeProvider);
  list = byCategory(list, category);
  list = byTopic(list, topic);
  if (useHighValue) list = list.filter(isHighValueDoc);
  if (options.extraFilter) list = list.filter(options.extraFilter);
  if (keyword) list = bySearch(list, keyword);
  return list;
}

function sortItems(items, mode) {
  const list = [...items];
  if (mode === 'title') {
    return list.sort((a, b) => (a.title || '').localeCompare(b.title || '', 'zh-CN'));
  }
  if (mode === 'difficulty') {
    return list.sort((a, b) => b.difficulty - a.difficulty || a.title.localeCompare(b.title, 'zh-CN'));
  }
  if (mode === 'snippets') {
    return list.sort((a, b) => b.snippetCount - a.snippetCount || b.difficulty - a.difficulty);
  }
  return list.sort((a, b) => {
    const ai = categoryOrder.indexOf(a.category);
    const bi = categoryOrder.indexOf(b.category);
    const aiSafe = ai === -1 ? 999 : ai;
    const biSafe = bi === -1 ? 999 : bi;
    if (aiSafe !== biSafe) return aiSafe - biSafe;
    return (a.title || '').localeCompare(b.title || '', 'zh-CN');
  });
}

function topKeywords(items) {
  const counts = {};
  items.forEach((doc) => {
    const raw = `${doc.title || ''} ${doc.summary || ''} ${normalizeArray(doc.headings).map((h) => h.text || '').join(' ')}`.toLowerCase();
    const tokens = raw.match(/[\u4e00-\u9fff]{2,}|[a-z][a-z0-9_-]{2,}/g) || [];
    tokens.forEach((token) => {
      if (token.length < 2) return;
      if (stopWords.has(token)) return;
      counts[token] = (counts[token] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .map(([word, count]) => ({ word, count }))
    .filter((i) => i.count > 1)
    .sort((a, b) => b.count - a.count || a.word.localeCompare(b.word))
    .slice(0, 24);
}

function countDocsByCategory(allDocs) {
  const map = {};
  categoryOrder.forEach((cat) => {
    map[cat] = 0;
  });
  allDocs.forEach((doc) => {
    const cat = doc.category || 'overview';
    map[cat] = (map[cat] || 0) + 1;
  });
  return map;
}

function topicStats(allDocs) {
  const stats = {};
  topicRules.forEach((topic) => {
    stats[topic.id] = 0;
  });
  allDocs.forEach((doc) => {
    doc.tags.forEach((tag) => {
      stats[tag] = (stats[tag] || 0) + 1;
    });
  });
  return stats;
}

function formatPercent(value, total) {
  if (!total) return 0;
  return clamp(Math.round((value / total) * 100), 0, 100);
}

function renderFilterStateStrip(contextDocs) {
  const strip = document.getElementById('activeFilterBadge');
  if (!strip) return;

  const ctx = Array.isArray(contextDocs) ? contextDocs : [];
  const contextTotal = Math.max(1, ctx.length);
  const currentCategoryLabel = zhCategory[activeCategory] || activeCategory;
  const currentTopicLabel = activeTopic === 'all' ? '全部主题' : normalizeTopicName(activeTopic);
  const categoryMatched = activeCategory === 'all'
    ? contextTotal
    : ctx.filter((doc) => doc.category === activeCategory).length;
  const topicMatched = activeTopic === 'all'
    ? contextTotal
    : ctx.filter((doc) => doc.tags.includes(activeTopic)).length;
  const highValueMatched = ctx.filter(isHighValueDoc).length;
  const categoryPercent = formatPercent(categoryMatched, contextTotal);
  const topicPercent = formatPercent(topicMatched, contextTotal);
  const highValuePercent = formatPercent(highValueMatched, contextTotal);
  const categoryState = categoryMatched === contextTotal ? '充足' : categoryMatched ? '进行中' : '待补齐';
  const topicState = topicMatched === contextTotal ? '充足' : topicMatched ? '进行中' : '待补齐';
  const highValueState = highValueMatched >= Math.max(1, Math.round(contextTotal * 0.35)) ? '重点齐备' : '继续补齐';

  strip.innerHTML = `
    <div class="filter-state-item">
      <div class="filter-state-label">
        <span>分类</span>
        <strong>${escapeHtml(currentCategoryLabel)}（${categoryMatched}/${contextTotal}）</strong>
      </div>
      <span class="filter-state-tag ${categoryPercent >= 100 ? 'state-good' : categoryPercent >= 50 ? 'state-warn' : 'state-low'}">${escapeHtml(categoryState)}</span>
      <div class="filter-state-track">
        <span class="filter-state-fill category" style="width:${categoryPercent}%;"></span>
      </div>
      <span class="filter-state-foot">命中 ${categoryPercent}%</span>
    </div>
    <div class="filter-state-item">
      <div class="filter-state-label">
        <span>主题</span>
        <strong>${escapeHtml(currentTopicLabel)}（${topicMatched}/${contextTotal}）</strong>
      </div>
      <span class="filter-state-tag ${topicPercent >= 100 ? 'state-good' : topicPercent >= 50 ? 'state-warn' : 'state-low'}">${escapeHtml(topicState)}</span>
      <div class="filter-state-track">
        <span class="filter-state-fill topic" style="width:${topicPercent}%;"></span>
      </div>
      <span class="filter-state-foot">命中 ${topicPercent}%</span>
    </div>
    <div class="filter-state-item">
      <div class="filter-state-label">
        <span>高价值</span>
        <strong>命中高价值：${highValueMatched} / ${contextTotal}</strong>
      </div>
      <span class="filter-state-tag ${highValuePercent >= 70 ? 'state-good' : highValuePercent >= 40 ? 'state-warn' : 'state-low'}">${escapeHtml(highValueState)}</span>
      <div class="filter-state-track">
        <span class="filter-state-fill high-value" style="width:${highValuePercent}%;"></span>
      </div>
      <span class="filter-state-foot">高价值占比 ${highValuePercent}%</span>
    </div>
  `;
}

function updatePinnedProgress() {
  const visibleTasks = pinnedTaskCatalog.filter((task) => !task.provider || activeProvider === 'all' || task.provider === activeProvider);
  const total = visibleTasks.length || 1;
  const completed = visibleTasks.filter((task) => getTaskState(task.id).done).length;
  const percent = Math.round((completed / total) * 100);
  const bar = document.getElementById('pinnedProgressFill');
  const text = document.getElementById('pinnedProgressText');
  if (bar) bar.style.width = `${percent}%`;
  if (text) text.textContent = `${completed} / ${total}（${percent}%）`;
  renderPinnedHeader();
}

function renderPinnedTasks() {
  const listEl = document.getElementById('pinnedTaskList');
  if (!listEl) return;

  listEl.innerHTML = '';
  const searchInput = document.getElementById('searchInput');
  const visibleTasks = pinnedTaskCatalog.filter((task) => !task.provider || activeProvider === 'all' || task.provider === activeProvider);

  if (!visibleTasks.length) {
    listEl.innerHTML = `
      <article class="pinned-task empty-task">
        <p class="pinned-task-note">当前供应商筛选下没有固定任务，已切换为显示全部任务。可先切换为“全部 Provider”。</p>
      </article>
    `;
    updatePinnedProgress();
    return;
  }

  visibleTasks.forEach((task, index) => {
    const state = getTaskState(task.id);
    const done = Boolean(state.done);
    const chip = document.createElement('article');
    chip.className = `pinned-task ${done ? 'done' : ''}`;
    const doneTime = done ? formatTimeString(state.doneAt) : '';
    chip.innerHTML = `
      <div class="pinned-task-head">
        <h4>${escapeHtml(task.title)}</h4>
        <span class="pinned-badge ${done ? 'done' : ''}">Step ${index + 1}</span>
      </div>
      <p class="pinned-task-desc">${escapeHtml(task.description)}</p>
      <p class="pinned-task-meta">
        <span>${escapeHtml(task.estimate)} · ${escapeHtml(zhCategory[task.category] || task.category)} / ${escapeHtml(normalizeTopicName(task.topic))}</span>
      </p>
      <p class="pinned-task-checkpoint">${escapeHtml(task.deliverable || '')}</p>
      <ul class="pinned-task-step">
        ${task.focus && task.focus.length ? task.focus.map((item) => `<li>${escapeHtml(item)}</li>`).join('') : ''}
      </ul>
      <p class="pinned-task-note">
        ${done ? `完成时间：${escapeHtml(doneTime)}` : `行动提示：${escapeHtml(task.actionNote)}`}
      </p>
      <div class="pinned-task-row">
        <button class="task-quick" data-action="focus" data-id="${escapeHtml(task.id)}" type="button">${escapeHtml(task.actionLabel)}</button>
        <button class="task-quick task-quick-state ${done ? 'done' : ''}" data-action="toggle" data-id="${escapeHtml(task.id)}" type="button">${done ? '今日完成' : '打卡'}</button>
      </div>
    `;

    const focusBtn = chip.querySelector('[data-action="focus"]');
    focusBtn?.addEventListener('click', () => {
      activeCategory = task.category;
      activeTopic = task.topic;
      if (searchInput) searchInput.value = '';
      const focusMode = document.getElementById('focusMode');
      highValueMode = false;
      if (focusMode) focusMode.textContent = '只看高价值';
      syncFilterUI();
      const focusHint = document.getElementById('pinnedFocusHint');
      if (focusHint) {
        focusHint.textContent = `当前焦点：${task.title}`;
      }
      renderMain({
        category: task.category,
        topic: task.topic,
        highValue: false,
        extraFilter: null
      });
    });

    const toggleBtn = chip.querySelector('[data-action="toggle"]');
    toggleBtn?.addEventListener('click', () => {
      togglePinnedTask(task.id);
      renderPinnedTasks();
      renderMain();
    });

    listEl.appendChild(chip);
  });

  updatePinnedProgress();
}

function renderLearningPulse(allDocs) {
  const note = document.getElementById('learningPulse');
  const kpis = document.getElementById('learningKpis');
  const count = allDocs.length || 0;
  const highValue = allDocs.filter(isHighValueDoc).length;
  const noCode = allDocs.filter((doc) => !doc.hasCode).length;
  const codeCount = allDocs.filter((doc) => doc.hasCode).length;
  const avgDifficulty = count ? Math.round(allDocs.reduce((acc, doc) => acc + doc.difficulty, 0) / count) : 0;
  const topics = topicStats(allDocs);
  const activeTopics = Object.entries(topics).filter(([, value]) => value > 0);
  const topTopic = activeTopics.sort((a, b) => b[1] - a[1])[0];

  note.textContent = count
    ? `当前筛选范围内共 ${count} 篇文档，约 ${highValue} 篇可直接转化为适配实现内容，平均学习密度 ${avgDifficulty}%。`
    : '当前筛选范围没有文档，建议尝试放宽条件。';

  kpis.innerHTML = '';
  const kpisData = [
    { label: '高价值文档', value: `${highValue}`, tip: '包含工具/协议/代码片段密度较高' },
    { label: '代码示例文档', value: `${codeCount}`, tip: '可直接用于离线验证' },
    { label: '无代码覆盖', value: `${noCode}`, tip: '需结合上下文判断适配动作' },
    { label: '专题覆盖', value: `${activeTopics.length} / ${topicRules.length}`, tip: topTopic ? `${normalizeTopicName(topTopic[0])}最丰富` : '尚待补齐' }
  ];

  kpisData.forEach((item) => {
    const div = document.createElement('article');
    div.className = 'kpi-item';
    div.innerHTML = `<span>${escapeHtml(item.label)} ${escapeHtml(item.tip)}</span><strong>${escapeHtml(item.value)}</strong>`;
    kpis.appendChild(div);
  });

  const guidance = document.getElementById('dailyGuidance');
  if (guidance) {
    if (!count) {
      guidance.textContent = '先清空筛选条件并重新进入阅读场景，再按阶段继续。';
    } else if (highValue >= 10) {
      guidance.textContent = '当前学习路径已具备高价值覆盖，可以直接进入“工具调用闭环”的代码实现验证。';
    } else {
      guidance.textContent = '建议先补齐“工具调用”与“流式解析”文档，再回到代码实现阶段。';
    }
  }
}

function renderMethodFlow(allDocs) {
  const el = document.getElementById('methodFlow');
  if (!el) return;

  el.innerHTML = '';
  const steps = pathLearnMap.map((path, index) => {
    const matchedDocs = allDocs.filter((doc) => path.include.includes(doc.category) || doc.tags.includes(path.focusTag));
    const universe = allDocs.filter((doc) => path.include.includes(doc.category) || doc.tags.includes(path.focusTag));
    const total = Math.max(1, universe.length);
    const ratio = Math.round((matchedDocs.length / total) * 100);
    const done = ratio >= 70;
    const inProgress = ratio > 0 && !done;
    const status = done ? '完成' : inProgress ? '进行中' : '待开始';
    const statusClass = done ? 'done' : inProgress ? 'processing' : 'pending';
    const stepCats = path.include.map((cat) => zhCategory[cat] || cat).join(' / ');

    return {
      title: `Step ${index + 1}`,
      subtitle: path.title,
      status,
      statusClass,
      ratio,
      path,
      tags: stepCats,
      matched: matchedDocs.length,
      total: universe.length,
      tip: path.tip,
      focusDoc: matchedDocs[0]?.title || '—'
    };
  });

  steps.forEach((step) => {
    const item = document.createElement('article');
    item.className = `method-item method-${step.statusClass}`;
    item.innerHTML = `
      <header>
        <span class="method-index">${escapeHtml(step.title)}</span>
        <span class="method-status method-status-${step.statusClass}">${escapeHtml(step.status)}</span>
      </header>
      <h4>${escapeHtml(step.subtitle)}</h4>
      <p>${escapeHtml(step.tip)}</p>
      <p>${escapeHtml(`覆盖分类：${step.tags}`)}</p>
      <p>${escapeHtml(`关联文档：${step.matched} / ${step.total}（${step.ratio}%）`)}</p>
      <div class="method-track"><span style="width:${step.ratio}%;"></span></div>
      <p class="method-focus-doc">示例焦点：${escapeHtml(step.focusDoc)}</p>
      <button data-path="${escapeHtml(step.path.id)}">进入该阶段</button>
    `;
    const btn = item.querySelector('button');
    btn?.addEventListener('click', () => {
      const path = pathLearnMap.find((p) => p.id === btn.dataset.path);
      if (!path) return;
      activeCategory = 'all';
      activeTopic = 'all';
      renderMain({
        extraFilter: (doc) => path.include.includes(doc.category) || doc.tags.includes(path.focusTag)
      });
    });
    el.appendChild(item);
  });
}

function renderLearningTracks(allDocs) {
  const tracks = document.getElementById('learningTracks');
  tracks.innerHTML = '';
  pathLearnMap.forEach((path, idx) => {
    const includeCats = new Set(path.include);
    const docsForPath = allDocs.filter((doc) => includeCats.has(doc.category) || doc.tags.includes(path.focusTag));
    const ratioBase = Math.max(1, allDocs.length);
    const progress = Math.round((docsForPath.length / ratioBase) * 100);
    const top = docsForPath.slice(0, 2).map((doc) => escapeHtml(doc.title)).join('、');
    const card = document.createElement('article');
    card.className = 'track-card';
    card.innerHTML = `
      <h3>${escapeHtml(path.title)}（${docsForPath.length} 篇）</h3>
      <p class="track-meta"><strong>建议优先级：</strong>${idx + 1} / ${pathLearnMap.length}</p>
      <p class="track-meta"><strong>覆盖：</strong>${progress}%</p>
      <p class="track-meta"><strong>提示：</strong>${escapeHtml(path.tip)}</p>
      <div class="roadmap-progress"><span style="width:${progress}%;"></span></div>
      <ul class="track-list">${top ? `<li>${top}</li>` : '<li>当前筛选下暂无对应文档</li>'}</ul>
      <button data-path="${escapeHtml(path.id)}">聚焦本阶段</button>
    `;
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => {
      const target = pathLearnMap.find((item) => item.id === btn.dataset.path);
      if (target) {
        activeCategory = 'all';
        activeTopic = 'all';
        renderMain({
          extraFilter: (doc) => target.include.includes(doc.category) || doc.tags.includes(target.focusTag)
        });
      }
    });
    tracks.appendChild(card);
  });
}

function renderCategoryBars(allDocs) {
  const el = document.getElementById('categoryBars');
  const counts = countDocsByCategory(allDocs);
  const total = allDocs.length || 1;
  const bars = categoryOrder
    .map((category) => ({
      category,
      count: counts[category] || 0,
      label: zhCategory[category] || category
    }))
    .filter((item) => item.count > 0);
  const max = Math.max(1, ...bars.map((item) => item.count));

  el.innerHTML = '';
  if (!bars.length) {
    el.innerHTML = '<p>当前筛选未命中分类。</p>';
    return;
  }

  bars.forEach((item) => {
    const percent = Math.round((item.count / max) * 100);
    const ratio = Math.round((item.count / total) * 100);
    const card = document.createElement('article');
    card.className = 'category-item';
    card.innerHTML = `
      <div class="category-head">
        <span>${escapeHtml(item.label)}</span>
        <strong>${item.count}篇</strong>
      </div>
      <div class="bar-track"><div class="bar-fill" style="width:${percent}%; background: #1d7dd1;"></div></div>
      <p style="margin:6px 0 0; font-size:12px; color:#586a83;">占当前筛选：${ratio}%</p>
    `;
    card.addEventListener('click', () => {
      activeCategory = item.category;
      activeTopic = 'all';
      renderMain();
    });
    el.appendChild(card);
  });
}

function renderTopicBars(allDocs) {
  const topicMap = document.getElementById('topicBars');
  const stats = topicStats(allDocs);
  const entries = topicRules
    .map((topic) => ({ id: topic.id, label: topic.label, count: stats[topic.id] || 0, color: topic.color }))
    .filter((item) => item.count > 0)
    .sort((a, b) => b.count - a.count);
  const max = Math.max(1, ...entries.map((entry) => entry.count));

  topicMap.innerHTML = '';
  if (!entries.length) {
    topicMap.innerHTML = '<p>当前数据不足，无法生成专题热力。</p>';
    return;
  }

  entries.forEach((entry) => {
    const row = document.createElement('article');
    row.className = 'topic-bar-item';
    const percent = Math.round((entry.count / max) * 100);
    row.innerHTML = `
      <div class="topic-label">
        <span><span class="road-tag" style="background:${entry.color}20;color:${entry.color};">${escapeHtml(entry.label)}</span></span>
        <strong>${entry.count} 篇</strong>
      </div>
      <div class="bar-track"><div class="bar-fill" style="width:${percent}%; background:${entry.color};"></div></div>
    `;
    topicMap.appendChild(row);
  });
}

function renderTopicCategoryMatrix(allDocs) {
  const el = document.getElementById('topicCategoryMatrix');
  const catStats = countDocsByCategory(allDocs);
  const categories = categoryOrder.filter((cat) => (catStats[cat] || 0) > 0);
  const topics = topicRules.filter((topic) => allDocs.some((doc) => doc.tags.includes(topic.id)));

  el.innerHTML = '';
  if (!categories.length || !topics.length) {
    el.innerHTML = '<p>当前筛选后暂无可视化矩阵。</p>';
    return;
  }

  const matrix = {};
  topics.forEach((topic) => {
    matrix[topic.id] = {};
    categories.forEach((cat) => {
      matrix[topic.id][cat] = 0;
    });
  });

  allDocs.forEach((doc) => {
    const cat = doc.category || 'overview';
    if (!categories.includes(cat)) return;
    const tags = new Set(doc.tags);
    tags.forEach((tag) => {
      if (matrix[tag] && matrix[tag][cat] >= 0) {
        matrix[tag][cat] += 1;
      }
    });
  });

  const header = document.createElement('div');
  header.className = 'matrix-header';
  header.innerHTML = `<div class="matrix-cell matrix-topic-label">专题 / 分类</div>${categories.map((cat) => `<div class="matrix-cell matrix-topic-label">${escapeHtml(zhCategory[cat] || cat)}</div>`).join('')}`;
  el.appendChild(header);

  topics.forEach((topic) => {
    const row = document.createElement('div');
    row.className = 'matrix-row';
    const topicTotal = allDocs.filter((doc) => doc.tags.includes(topic.id)).length || 1;
    row.innerHTML = `<div class="matrix-cell matrix-topic-label">${escapeHtml(topic.label)}<span style="margin-left:8px;color:#7f8fa6;font-size:11px;">${topicTotal}</span></div>`;
    categories.forEach((cat) => {
      const count = matrix[topic.id][cat] || 0;
      const alpha = count ? clamp(0.2 + (count / topicTotal) * 0.7, 0.18, 0.9) : 0.15;
      const style = count ? `background:rgba(47,104,214,${alpha});` : '';
      row.innerHTML += `<div class="matrix-cell ${count ? 'count-cell' : 'matrix-empty'}" style="${style}">${count}</div>`;
    });
    el.appendChild(row);
  });
}

function renderKeywordCloud(allDocs) {
  const el = document.getElementById('keywordCloud');
  const top = topKeywords(allDocs);
  el.innerHTML = '';
  if (!top.length) {
    el.innerHTML = '<p>未检测到可用关键词分布。</p>';
    return;
  }

  const max = Math.max(...top.map((item) => item.count));
  top.forEach((item) => {
    const scale = 12 + Math.round((item.count / max) * 16);
    const chip = document.createElement('button');
    chip.className = 'keyword-chip';
    chip.style.fontSize = `${scale * 0.75}px`;
    chip.textContent = `${item.word} (${item.count})`;
    chip.title = `在标题和摘要中出现 ${item.count} 次`;
    chip.addEventListener('click', () => {
      const searchInput = document.getElementById('searchInput');
      searchInput.value = item.word;
      renderMain();
    });
    el.appendChild(chip);
  });
}

function renderRoadmap(allDocs) {
  const legend = document.getElementById('roadmapLegend');
  const wrap = document.getElementById('roadmap');
  const statusCounter = { done: 0, uncovered: 0 };
  wrap.innerHTML = '';
  pathLearnMap.forEach((path) => {
    const matched = allDocs.filter((doc) => path.include.includes(doc.category) || doc.tags.includes(path.focusTag));
    const universe = allDocs;
    const threshold = Math.max(1, Math.round(universe.length * 0.08));
    const denominator = Math.max(1, universe.length);
    const ratio = Math.round((matched.length / denominator) * 100);
    const status = matched.length >= threshold ? '完成' : '未覆盖';
    const statusClass = matched.length >= threshold ? 'done' : 'uncovered';
    statusCounter[statusClass] += 1;
    const tags = path.include.map((tag) => `<span class="road-tag">${escapeHtml(zhCategory[tag] || tag)}</span>`).join('');
    const card = document.createElement('article');
    card.className = `roadmap-stage roadmap-status-${statusClass}`;
    card.innerHTML = `
      <div class="roadmap-status-strip">
        <span class="roadmap-status-dot ${statusClass}"></span>
        <span>${escapeHtml(status === '完成' ? '完成：覆盖阈值已达标' : '未覆盖：关键证据未齐')}</span>
      </div>
      <span class="roadmap-status-chip ${statusClass}">${escapeHtml(status)}</span>
      <h3>${escapeHtml(path.title)}</h3>
      <p>${escapeHtml(path.tip)}</p>
      <p>涉及分类：</p>
      <div class="roadmap-tags">${tags || '<span class="road-tag">综合</span>'}</div>
      <div class="roadmap-progress"><span style="width:${ratio}%;"></span></div>
      <p>${escapeHtml(`本阶段命中文档 ${matched.length} / ${universe.length}（${ratio}%）`)}</p>
      <p class="roadmap-meta">${escapeHtml(`门槛：>= ${threshold} 条（基于全集样本）`)}</p>
      <p class="roadmap-meta">${escapeHtml(`状态色标：${status === '完成' ? '绿色=已覆盖 >=门槛' : '灰蓝=未覆盖'}`)}</p>
      <small>点击可快速聚焦</small>
    `;
    card.addEventListener('click', () => {
      activeCategory = 'all';
      activeTopic = 'all';
      renderMain({
        extraFilter: (doc) => path.include.includes(doc.category) || doc.tags.includes(path.focusTag)
      });
    });
    wrap.appendChild(card);
  });

  if (legend) {
    const totalStages = statusCounter.done + statusCounter.uncovered;
    const ratioDone = totalStages ? Math.round((statusCounter.done / totalStages) * 100) : 0;
    legend.innerHTML = `
      <span class="legend-item"><span class="legend-swatch done"></span>完成 ${statusCounter.done}</span>
      <span class="legend-item"><span class="legend-swatch uncovered"></span>未覆盖 ${statusCounter.uncovered}</span>
      <span class="legend-item"><span class="legend-progress"><span style="width:${ratioDone}%"></span></span>阶段完成 ${ratioDone}%</span>
    `;
  }
}

function renderTopicSelect(allDocs) {
  const select = document.getElementById('topicSelect');
  const count = topicStats(allDocs);
  const previous = select.value;

  select.innerHTML = '';
  const allOpt = document.createElement('option');
  allOpt.value = 'all';
  allOpt.textContent = '按主题：全部';
  select.appendChild(allOpt);

  topicRules
    .filter((topic) => (count[topic.id] || 0) > 0)
    .forEach((topic) => {
      const option = document.createElement('option');
      option.value = topic.id;
      option.textContent = `${topic.label} (${count[topic.id] || 0})`;
      select.appendChild(option);
    });

  select.value = previous && [...select.options].some((item) => item.value === previous) ? previous : 'all';
  activeTopic = select.value;
}

function renderDashboard(list, allDocs, contextDocs = allDocs) {
  const codeCount = allDocs.filter((doc) => doc.hasCode).length;
  const activeTagCount = Object.values(topicStats(contextDocs)).filter((count) => count > 0).length;
  const updateText = generatedAt ? new Date(generatedAt).toLocaleString() : '-';
  const sortModeMap = {
    category: '分类',
    title: '标题',
    difficulty: '学习密度',
    snippets: '代码片段'
  };
  const sortMode = sortModeMap[document.getElementById('sortSelect').value] || '分类';
  const categoryLabel = zhCategory[activeCategory] || activeCategory;
  const topicLabel = activeTopic === 'all' ? '全部主题' : normalizeTopicName(activeTopic);
  const keyword = document.getElementById('searchInput').value.trim();
  renderFilterStateStrip(contextDocs);

  document.getElementById('statTotal').textContent = `${allDocs.length}`;
  document.getElementById('statCode').textContent = `${codeCount}`;
  document.getElementById('statTopics').textContent = `${activeTagCount}`;
  document.getElementById('statUpdated').textContent = updateText || '未记录';

  document.getElementById('count').textContent = `当前筛选：${list.length} / 全部 ${allDocs.length}`;
  const summaryBlock = [`
    筛选方式：${categoryLabel} / ${topicLabel}`,
    `关键词：${keyword || '无'}`,
    `排序：${sortMode}`,
    `今日高价值：${contextDocs.filter(isHighValueDoc).length}/${contextDocs.length}`
  ];
  const badge = document.getElementById('activeFilterBadge');
  if (badge) {
    badge.title = summaryBlock.join(' | ');
  }

  const generatedNote = document.getElementById('generatedNote');
  generatedNote.textContent = allDocs.length ? `离线文档已就绪 · 当前可读 ${allDocs.length} 篇` : '离线文档已加载，但当前筛选为空';
}

function renderChecklist(allDocs) {
  const el = document.getElementById('implementationChecklist');
  el.innerHTML = '';

  const stats = topicStats(allDocs);
  const checks = [
    {
      title: '协议字段是否对齐',
      done: (stats.protocol || 0) >= 3,
      tip: '至少 3 篇协议类文档可支持 request/response 映射与 schema 建模。'
    },
    {
      title: '是否完成工具调用闭环',
      done: (stats.tooling || 0) >= 2,
      tip: '需覆盖 schema 解析、参数校验、工具执行与结果回传。'
    },
    {
      title: '是否支持流式输出',
      done: (stats.stream || 0) >= 2,
      tip: '至少处理 data chunk 与 [DONE] 收口，保障用户可见进度。'
    },
    {
      title: '是否加入错误治理',
      done: (stats.ops || 0) >= 1,
      tip: '准备错误码映射表，优先覆盖 429/5xx/限流等常见场景。'
    },
    {
      title: '是否具备高价值文档样本',
      done: allDocs.filter(isHighValueDoc).length >= 5,
      tip: '高价值样本有助于快速搭建 Adapter 的端到端示例。'
    }
  ];

  checks.forEach((check) => {
    const item = document.createElement('article');
    item.className = 'check-item';
    item.innerHTML = `
      <h4><span class="check-mark ${check.done ? 'done' : ''}"></span>${escapeHtml(check.title)}</h4>
      <p>${escapeHtml(check.tip)}</p>
    `;
    el.appendChild(item);
  });
}

function matchByPatterns(doc, patterns) {
  const text = toSearchText(doc);
  return normalizeArray(patterns).some((pattern) => text.includes(String(pattern || '').toLowerCase()));
}

function getTopDocsByPatterns(allDocs, patterns, limit = 3) {
  const lower = normalizeArray(patterns).map((item) => String(item || '').toLowerCase()).filter(Boolean);
  return allDocs
    .map((doc) => ({
      doc,
      score: lower.reduce((sum, pattern) => sum + (toSearchText(doc).includes(pattern) ? 1 : 0), 0) + Math.round(doc.valueScore / 30)
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || b.doc.valueScore - a.doc.valueScore)
    .slice(0, limit)
    .map((item) => item.doc);
}

function getProviderLessonStats(allDocs, lesson) {
  return providerOrder
    .filter((provider) => provider !== 'all')
    .map((provider) => {
      const providerDocs = allDocs.filter((doc) => doc.provider === provider);
      const matched = providerDocs.filter((doc) => matchByPatterns(doc, lesson.patterns));
      return {
        provider,
        label: getProviderLabel(provider),
        count: matched.length,
        total: providerDocs.length,
        percent: providerDocs.length ? Math.round((matched.length / providerDocs.length) * 100) : 0
      };
    });
}

function renderAdapterLessons(allDocs) {
  const container = document.getElementById('adapterLessons');
  if (!container) return;
  container.innerHTML = '';

  if (!allDocs.length) {
    container.innerHTML = '<p class="detail">当前筛选为空，无法生成 Adapter 教程。</p>';
    return;
  }

  adapterLessonBlocks.forEach((lesson, index) => {
    const matched = allDocs.filter((doc) => matchByPatterns(doc, lesson.patterns));
    const percent = Math.round((matched.length / Math.max(1, allDocs.length)) * 100);
    const topDocs = getTopDocsByPatterns(allDocs, lesson.patterns, 4);
    const providerStats = getProviderLessonStats(allDocs, lesson);
    const card = document.createElement('article');
    card.className = 'lesson-card';
    card.innerHTML = `
      <header class="lesson-head">
        <span class="lesson-index">Lesson ${index + 1}</span>
        <span class="lesson-state ${percent >= 25 ? 'strong' : percent > 0 ? 'medium' : 'weak'}">${escapeHtml(`${matched.length} 篇命中`)}</span>
      </header>
      <h3>${escapeHtml(lesson.title)}</h3>
      <p class="lesson-intent">${escapeHtml(lesson.intent)}</p>
      <div class="lesson-progress"><span style="width:${clamp(percent, 3, 100)}%;"></span></div>
      <div class="lesson-columns">
        <div>
          <h4>要交付什么</h4>
          <ul>${lesson.deliverables.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </div>
        <div>
          <h4>坑点</h4>
          <ul>${lesson.traps.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="lesson-provider-row">
        ${providerStats.map((stat) => `
          <button type="button" data-provider="${escapeHtml(stat.provider)}" title="${escapeHtml(`${stat.label}: ${stat.count}/${stat.total}`)}">
            <span>${escapeHtml(stat.label)}</span>
            <strong>${escapeHtml(String(stat.count))}</strong>
          </button>`).join('')}
      </div>
      <div class="lesson-docs">
        <h4>建议先读</h4>
        ${topDocs.length
          ? topDocs.map((doc) => `<button type="button" data-url="${escapeHtml(doc.url)}">${escapeHtml(doc.title || doc.path || doc.url)}</button>`).join('')
          : '<p>当前筛选下没有直接命中文档，建议切回全部 Provider。</p>'}
      </div>
    `;

    card.querySelectorAll('[data-provider]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeProvider = btn.dataset.provider || 'all';
        activeTopic = lesson.topic || 'all';
        const providerSelect = document.getElementById('providerSelect');
        if (providerSelect) providerSelect.value = activeProvider;
        syncFilterUI();
        renderMain();
      });
    });
    card.querySelectorAll('[data-url]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const found = docs.find((doc) => doc.url === btn.dataset.url);
        if (found) {
          selectedDocUrl = found.url;
          renderDetail(found);
          document.getElementById('docDetail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
    container.appendChild(card);
  });
}

function findCourseDocByPath(path, provider = 'deepseek') {
  const needle = String(path || '').toLowerCase();
  if (!needle) return null;
  return docs.find((doc) => doc.provider === provider && String(doc.path || '').toLowerCase().includes(needle))
    || docs.find((doc) => doc.provider === provider && String(doc.url || '').toLowerCase().includes(needle))
    || null;
}

function renderStageOneCourse() {
  const container = document.getElementById('stageOneCourse');
  const artifacts = document.getElementById('stageOneArtifacts');
  if (!container) return;

  const deepseekDocs = docs.filter((doc) => doc.provider === 'deepseek');
  const stageDocs = stageOneCourseProfile.chapters.flatMap((chapter) => chapter.docs.map((path) => findCourseDocByPath(path))).filter(Boolean);
  const uniqueStageDocs = [...new Map(stageDocs.map((doc) => [doc.url || doc.path, doc])).values()];
  const highValue = deepseekDocs.filter(isHighValueDoc).length;

  if (artifacts) {
    artifacts.innerHTML = `
      ${stageOneCourseProfile.artifacts.map((item) => `
        <a href="${escapeHtml(item.href)}" target="_blank" rel="noreferrer">${escapeHtml(item.label)}</a>
      `).join('')}
    `;
  }

  container.innerHTML = `
    <div class="stage-format-grid">
      ${stageOneCourseProfile.stats.map((item) => `
        <article class="stage-format-card">
          <span>${escapeHtml(item.label)}</span>
          <strong>${escapeHtml(item.value)}</strong>
          <p>${escapeHtml(item.detail)}</p>
        </article>
      `).join('')}
    </div>

    <div class="stage-course-map">
      <article class="stage-course-summary">
        <span class="stage-chip">本地快照</span>
        <h3>${escapeHtml(stageOneCourseProfile.title)}</h3>
        <p>当前 DeepSeek 快照共有 ${deepseekDocs.length} 条记录，其中高价值样本 ${highValue} 条；第一阶段课程优先锁定 ${uniqueStageDocs.length} 条核心文档，用它们把 Provider Adapter 的请求、工具、流式、错误与生态接入跑通。</p>
        <div class="stage-mini-flow">
          <span>HTML 页面</span>
          <b>→</b>
          <span>JSON record</span>
          <b>→</b>
          <span>课程章节</span>
          <b>→</b>
          <span>Adapter 交付物</span>
        </div>
      </article>
      <article class="stage-course-summary stage-course-warning">
        <span class="stage-chip">用 ccmimo 的正确方式</span>
        <h3>可以用 ccmimo 整理，但不要让它直接定稿</h3>
        <p>它适合做“长文档初筛、章节草稿、重复归纳”。最终必须回到 Codex 审核：检查字段名是否真实存在、协议细节是否过度确定、能否转成可执行验收。</p>
        <ul>
          <li>ccmimo：先把 57 条记录压缩成课程草稿。</li>
          <li>Codex：复核风险口径，再决定哪些内容进入网页。</li>
          <li>网页：保留可点击文档、行动项和验收产物。</li>
        </ul>
      </article>
    </div>

    <div class="stage-chapter-grid">
      ${stageOneCourseProfile.chapters.map((chapter, index) => {
        const matchedDocs = chapter.docs.map((path) => findCourseDocByPath(path)).filter(Boolean);
        const ratio = Math.round((matchedDocs.length / Math.max(1, chapter.docs.length)) * 100);
        const state = ratio >= 80 ? 'done' : ratio > 0 ? 'warn' : 'low';
        return `
          <article class="stage-chapter state-${state}">
            <header>
              <span class="stage-index">Chapter ${index + 1}</span>
              <span class="stage-state">${escapeHtml(`${matchedDocs.length}/${chapter.docs.length} 已命中`)}</span>
            </header>
            <h3>${escapeHtml(chapter.title)}</h3>
            <p>${escapeHtml(chapter.goal)}</p>
            <div class="roadmap-progress"><span style="width:${clamp(ratio, 4, 100)}%;"></span></div>
            <h4>工程动作</h4>
            <ul>${chapter.actions.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
            <h4>建议先读</h4>
            <div class="stage-doc-links">
              ${chapter.docs.map((path) => {
                const doc = findCourseDocByPath(path);
                const label = doc ? (doc.title || doc.path || path) : path;
                return `<button type="button" data-course-doc="${escapeHtml(doc ? doc.url : '')}" data-course-path="${escapeHtml(path)}">${escapeHtml(label)}</button>`;
              }).join('')}
            </div>
            <p class="stage-output">交付物：${escapeHtml(chapter.output)}</p>
            <button class="stage-focus-btn" type="button" data-stage-topic="${escapeHtml(chapter.topic)}">聚焦本章文档</button>
          </article>
        `;
      }).join('')}
    </div>

    <div class="stage-provider-next">
      ${stageOneCourseProfile.nextProviders.map((item) => {
        const meta = getProviderMeta(item.provider);
        return `
          <article class="stage-next-card provider-${escapeHtml(item.provider)}">
            <span>${escapeHtml(meta.label)}</span>
            <h3>${escapeHtml(item.title)}</h3>
            <p><strong>文档入口：</strong>${escapeHtml(item.source)}</p>
            <p>${escapeHtml(item.action)}</p>
            <button type="button" data-next-provider="${escapeHtml(item.provider)}">切到 ${escapeHtml(meta.label)} 文档</button>
          </article>
        `;
      }).join('')}
    </div>

    <div class="stage-daily">
      <h3>7 天打卡：从读文档到写 Adapter</h3>
      <ol>${stageOneCourseProfile.daily.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ol>
    </div>
  `;

  container.querySelectorAll('[data-course-doc]').forEach((button) => {
    button.addEventListener('click', () => {
      const url = button.dataset.courseDoc || '';
      const path = button.dataset.coursePath || '';
      const found = docs.find((doc) => doc.url === url) || findCourseDocByPath(path);
      if (!found) return;
      selectedDocUrl = found.url;
      activeProvider = 'deepseek';
      const providerSelect = document.getElementById('providerSelect');
      if (providerSelect) providerSelect.value = 'deepseek';
      renderDetail(found);
      document.getElementById('docDetail')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  container.querySelectorAll('[data-stage-topic]').forEach((button) => {
    button.addEventListener('click', () => {
      activeProvider = 'deepseek';
      activeCategory = 'all';
      activeTopic = button.dataset.stageTopic || 'all';
      const providerSelect = document.getElementById('providerSelect');
      if (providerSelect) providerSelect.value = 'deepseek';
      const searchInput = document.getElementById('searchInput');
      if (searchInput) searchInput.value = '';
      syncFilterUI();
      renderMain();
      document.getElementById('docList')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  container.querySelectorAll('[data-next-provider]').forEach((button) => {
    button.addEventListener('click', () => {
      activeProvider = button.dataset.nextProvider || 'all';
      activeCategory = 'all';
      activeTopic = 'all';
      const providerSelect = document.getElementById('providerSelect');
      if (providerSelect) providerSelect.value = activeProvider;
      const searchInput = document.getElementById('searchInput');
      if (searchInput) searchInput.value = '';
      syncFilterUI();
      renderMain();
    });
  });
}

function coverageState(percent, good = 70, warning = 35) {
  if (percent >= good) return 'good';
  if (percent >= warning) return 'warn';
  return 'low';
}

function renderProviderDeepDive(allDocs) {
  const container = document.getElementById('providerDeepDive');
  if (!container) return;
  container.innerHTML = '';

  const totalProviders = providerOrder.filter((p) => p !== 'all');
  if (!allDocs.length || !totalProviders.length) {
    container.innerHTML = '<p class="detail">当前筛选内容不足，无法做供应商深度对照。</p>';
    return;
  }

  totalProviders.forEach((provider) => {
    const providerDocs = allDocs.filter((doc) => doc.provider === provider);
    const card = document.createElement('article');
    card.className = 'provider-deep-card';
    const providerMeta = getProviderMeta(provider);
    const adapterNote = providerAdapterNotes[provider] || providerAdapterNotes.deepseek;
    const providerHighValue = providerDocs.filter(isHighValueDoc).length;
    const providerTotal = providerDocs.length || 1;
    const best = providerFeatureSpecs.map((feature) => {
      const stat = getProviderCoverage(allDocs, provider, feature);
      const state = coverageState(stat.percent);
      const barStyle = `background: linear-gradient(90deg, ${feature.color}, ${feature.color}CC); width:${stat.percent}%;`;
      return {
        ...feature,
        matched: stat.matched,
        percent: stat.percent,
        state,
        barStyle,
        score: stat.score,
        samples: stat.samples
      };
    }).sort((a, b) => b.score - a.score);

    const critical = best.filter((item) => item.state !== 'good');
    const criticalText = critical.length
      ? `薄弱项：${critical.map((item) => item.label).join('、')}`
      : '该供应商当前筛选范围内覆盖较全。';

    card.innerHTML = `
      <header class="provider-deep-header">
        <h3>${escapeHtml(providerMeta.label)}</h3>
        <p>${escapeHtml(`${providerTotal} 篇 / 高价值 ${providerHighValue} 条`)}</p>
      </header>
      <p class="provider-adapter-note">${escapeHtml(adapterNote.line)}</p>
      <div class="provider-focus-tags">
        ${adapterNote.focus.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}
      </div>
      <div class="provider-deep-summary">${escapeHtml(criticalText)}</div>
      <div class="provider-feature-list">
        ${best.map((item) => {
          return `<div class="provider-feature-item">
            <div class="provider-feature-title">
              <span style="--feature-dot:${item.color}" class="provider-feature-dot"></span>
              <strong>${escapeHtml(item.label)}</strong>
              <span class="provider-feature-state state-${item.state}">${escapeHtml(item.state === 'good' ? '较完整' : item.state === 'warn' ? '待补齐' : '薄弱')}</span>
            </div>
            <div class="provider-feature-bar">
              <span style="${item.barStyle}"></span>
            </div>
            <div class="provider-feature-foot">
              <span>${escapeHtml(`${item.matched}/${providerTotal}`)}</span>
              <span>${escapeHtml(`${item.percent}%`)}</span>
            </div>
          </div>`;
        }).join('')}
      </div>
      <button data-provider="${escapeHtml(provider)}" type="button" class="provider-focus-btn">聚焦该供应商</button>
    `;

    const btn = card.querySelector('button[data-provider]');
    btn?.addEventListener('click', () => {
      activeProvider = provider;
      const providerSelect = document.getElementById('providerSelect');
      if (providerSelect) providerSelect.value = provider;
      const providerHint = document.getElementById('providerHint');
      if (providerHint) providerHint.textContent = `当前展示：${providerMeta.label}`;
      syncFilterUI();
      renderMain();
    });

    container.appendChild(card);
  });
}

function normalizeProviderPlaybookPatterns(patterns) {
  return (patterns || []).map((item) => String(item || '').toLowerCase().trim());
}

function buildPlaybookCoverage(providerDocs, patterns) {
  const lowerPatterns = normalizeProviderPlaybookPatterns(patterns);
  const matched = providerDocs.filter((doc) => {
    const text = toSearchText(doc).toLowerCase();
    return lowerPatterns.some((pattern) => text.includes(pattern));
  });
  const docsByPattern = patterns.length
    ? providerDocs
        .map((doc) => ({
          doc,
          score: lowerPatterns.reduce((count, pattern) => (toSearchText(doc).toLowerCase().includes(pattern) ? count + 1 : count), 0)
        }))
        .sort((a, b) => b.score - a.score || a.doc.title.localeCompare(b.doc.title, 'zh-CN'))
        .map((item) => item.doc)
    : providerDocs;
  return {
    matched: matched.length,
    total: providerDocs.length || 1,
    samples: docsByPattern.slice(0, 2).map((doc) => doc.title || doc.url)
  };
}

function renderProviderPlaybook(allDocs) {
  const container = document.getElementById('providerPlaybook');
  if (!container) return;
  container.innerHTML = '';

  const providers = providerOrder.filter((provider) => provider !== 'all');
  if (!providers.length || !allDocs.length) {
    container.innerHTML = '<p class="detail">当前筛选为空，无法生成开发法深度图。</p>';
    return;
  }

  providers.forEach((provider) => {
    const docsForProvider = allDocs.filter((doc) => doc.provider === provider);
    const profile = providerPlaybookProfiles[provider] || {};
    const card = document.createElement('article');
    const meta = getProviderMeta(provider);
    const totalDocs = docsForProvider.length;
    const focusHint = profile.focusHint || '';
    const pillars = (profile.pillars || []).map((pillar) => {
      const coverage = buildPlaybookCoverage(docsForProvider, pillar.pattern);
      const ratio = Math.round((coverage.matched / coverage.total) * 100);
      const sample = coverage.samples.length ? coverage.samples[0] : '暂无对应文档';
      const stateClass = ratio >= 60 ? 'done' : ratio >= 25 ? 'warn' : 'low';
      return {
        ...pillar,
        ratio,
        sample,
        stateClass
      };
    });

    card.className = 'provider-playbook-card';
    const done = pillars.filter((item) => item.ratio >= 60).length;
    const progress = pillars.length ? Math.round((done / pillars.length) * 100) : 0;

    card.innerHTML = `
      <header class="provider-playbook-header">
        <h3>${escapeHtml(meta.label)}<span class="provider-count">（${totalDocs} 篇）</span></h3>
      </header>
      <p>${escapeHtml(profile.summary || '以该供应商文档建立一套可执行的适配学习序列。')}</p>
      <p class="provider-focus-hint">开发法建议：${escapeHtml(focusHint)}</p>
      <div class="roadmap-progress"><span style="width:${progress}%;"></span></div>
      <ul class="provider-playbook-list">
        ${pillars
          .map(
            (pillar) => `
              <li class="provider-playbook-item state-${pillar.stateClass}">
                <div class="provider-playbook-item-head">
                  <strong>${escapeHtml(pillar.name)}</strong>
                  <span>${escapeHtml(`${pillar.ratio}%`)}</span>
                </div>
                <p>${escapeHtml(pillar.action)}</p>
                <div class="roadmap-progress"><span style="width:${pillar.ratio}%;"></span></div>
                <small>典型命中：${escapeHtml(pillar.sample)}</small>
              </li>`
          )
          .join('')}
      </ul>
      <button data-provider="${escapeHtml(provider)}" class="provider-focus-btn">聚焦该供应商学习线</button>
    `;

    const btn = card.querySelector('button[data-provider]');
    btn?.addEventListener('click', () => {
      activeProvider = provider;
      const providerSelect = document.getElementById('providerSelect');
      if (providerSelect) providerSelect.value = provider;
      const providerHint = document.getElementById('providerHint');
      if (providerHint) providerHint.textContent = `当前展示：${meta.label}`;
      syncFilterUI();
      renderMain();
    });

    container.appendChild(card);
  });
}

function renderPathStory(filtered) {
  const story = document.getElementById('pathStory');
  if (!filtered.length) {
    story.innerHTML = '<p>当前筛选为空，先调整关键词或关闭“只看高价值”。</p>';
    return;
  }

  const stageProgress = pathLearnMap
    .map((stage, index) => {
      const matched = filtered.filter((doc) => stage.include.includes(doc.category) || doc.tags.includes(stage.focusTag)).length;
      return {
        title: stage.title,
        matched,
        index: index + 1
      };
    })
    .sort((a, b) => b.matched - a.matched);

  const best = stageProgress[0];
  const hotTags = topicStats(filtered);
  const topTag = Object.entries(hotTags).sort((a, b) => b[1] - a[1])[0];
  const nextStage = pathLearnMap.find((stage) => stage.title === best.title) || pathLearnMap[0];
  const firstUncovered = filtered.length ? Math.max(...filtered.map((doc) => doc.difficulty)) : 0;

  story.innerHTML = `
    <p>当前学习流最适合先走 <strong>${escapeHtml(nextStage.title)}</strong>。</p>
    <p>关键词热度最高主题：<strong>${escapeHtml(topTag ? normalizeTopicName(topTag[0]) : '协议与结构')}</strong>。</p>
    <p>最大全量建议：先补齐 <strong>${escapeHtml(best.title)}</strong>，再进入困难度较高的模块（最高密度约 ${firstUncovered}%）。</p>
    <ul>
      ${stageProgress
        .map((item) => `<li>第 ${item.index} 阶段命中 ${item.matched} 篇，优先级：${item.title}</li>`)
        .join('')}
    </ul>
  `;
}

function renderPathGuide(filtered) {
  const container = document.getElementById('pathList');
  container.innerHTML = '';

  pathLearnMap.forEach((path) => {
    const targetDocs = filtered.filter((doc) => path.include.includes(doc.category));
    const card = document.createElement('article');
    card.className = 'path-item';
    const labels = path.include.map((cat) => `<span class="road-tag">${escapeHtml(zhCategory[cat] || cat)}</span>`).join('');
    card.innerHTML = `
      <h3>${escapeHtml(path.title)}</h3>
      <p>${escapeHtml(path.tip)}</p>
      <div>${labels}</div>
      <ul>${targetDocs.slice(0, 3).map((doc) => `<li>${escapeHtml(doc.title || doc.path || doc.url)}</li>`).join('')}</ul>
      <button>聚焦此阶段</button>
    `;
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => {
      activeCategory = 'all';
      activeTopic = 'all';
      renderMain({
        extraFilter: (doc) => path.include.includes(doc.category) || doc.tags.includes(path.focusTag)
      });
    });
    container.appendChild(card);
  });
}

function buildChips(filtered) {
  const chips = document.getElementById('categoryPills');
  const uniq = new Set(filtered.map((doc) => doc.category));
  const order = ['all', ...categoryOrder.filter((cat) => uniq.has(cat))];
  chips.innerHTML = '';
  order.forEach((category) => {
    const count = category === 'all' ? filtered.length : filtered.filter((doc) => doc.category === category).length;
    const btn = document.createElement('span');
    btn.className = `chip ${activeCategory === category ? 'active' : ''}`;
    btn.textContent = `${zhCategory[category] || category} (${count})`;
    btn.addEventListener('click', () => {
      activeCategory = category;
      renderMain();
    });
    chips.appendChild(btn);
  });
}

function renderList(filtered) {
  const listEl = document.getElementById('docList');
  listEl.innerHTML = '';
  if (!filtered.length) {
    listEl.innerHTML = `
      <article class="empty-state">
        <h3>没有匹配到文档</h3>
        <p>当前筛选范围下未命中文档。可尝试放宽条件，先清空关键词或分类。</p>
        <button type="button" data-action="empty-reset">重置所有筛选</button>
      </article>
    `;
    const resetButton = listEl.querySelector('[data-action="empty-reset"]');
    resetButton?.addEventListener('click', () => {
      activeCategory = 'all';
      activeTopic = 'all';
      highValueMode = false;
      document.getElementById('searchInput').value = '';
      document.getElementById('sortSelect').value = 'category';
      syncFilterUI();
      renderMain();
    });
    return;
  }

  filtered.forEach((doc) => {
    const card = document.createElement('article');
    const highValue = isHighValueDoc(doc);
    card.className = `doc-card ${selectedDocUrl === doc.url ? 'active' : ''} ${highValue ? 'high-value-doc' : ''}`;
    card.dataset.docUrl = doc.url;
    card.innerHTML = `
      <div class="doc-status-row">
        <span class="doc-status-dot"></span>
        <span>${escapeHtml(highValue ? '高价值：可直接转适配动作' : '阅读：用于背景补齐')}</span>
      </div>
      <h3>${escapeHtml(doc.title || doc.path || doc.url)}</h3>
      <div>
        <span class="tag provider-tag provider-${doc.provider || 'deepseek'}">${escapeHtml(getProviderLabel(doc.provider || 'deepseek'))}</span>
        <span class="tag">${escapeHtml(doc.categoryLabel)}</span>
        <span class="tag">主题：${doc.tags.length}</span>
      </div>
      <p class="doc-summary">${escapeHtml((doc.summary || '无摘要信息').slice(0, compactMode ? 130 : 280))}</p>
      ${headingPreview(doc.headings, compactMode)}
      <div class="skill-meter">
        <span>学习密度</span>
        <div class="skill-track"><div class="skill-fill" style="width:${doc.difficulty}%;"></div></div>
        <span class="skill-value">${doc.difficulty}%</span>
      </div>
      <div class="topic-pills">
        ${doc.tags.slice(0, 3).map((id) => `<span class="tag">${escapeHtml(normalizeTopicName(id))}</span>`).join('')}
      </div>
      <p class="doc-summary">代码片段：${doc.snippetCount} 条 | 标题层级：${doc.headingCount}</p>
    `;
    card.addEventListener('click', () => {
      selectedDocUrl = doc.url;
      renderDetail(doc);
      renderList(filtered);
    });
    listEl.appendChild(card);
  });
}

function buildDocEngineeringPlan(doc) {
  const providerNote = providerAdapterNotes[doc.provider] || providerAdapterNotes.deepseek;
  const base = [
    `Provider 侧重点：${providerNote.line}`,
    `本页应进入分类：${doc.categoryLabel} / 主题：${doc.tags.map((id) => normalizeTopicName(id)).join('、')}`
  ];

  const plans = {
    api: ['抽取 request/response 字段，写成 ProviderRequest 与 ProviderResponse 类型。', '用最小样例跑通 one-shot，再补 stream/tool 两个变体。'],
    'api-reference': ['把 endpoint、method、必填参数、返回结构转成协议表。', '为每个响应字段补一个解析单测，避免 provider 字段漂移。'],
    tool: ['把工具定义映射成 ActionSchema，并对 function.arguments 做 JSON.parse + schema validate。', '记录 tool_call_id，工具执行后用 tool/result message 回传。'],
    batch: ['建立 BatchTaskState：created、running、completed、failed、cancelled。', '把 output_file_id / error_file_id 变成 Evidence，并支持轮询超时。'],
    files: ['把 upload/list/retrieve/content/delete 做成文件子系统，不要塞进 Chat Runner。', '记录 file_id 与本地 artifactPath 的映射，便于回放。'],
    error: ['把错误码映射为 auth、quota、rate_limit、schema_error、server_error。', '为 429/5xx 配置 retry/backoff，为 401/403 直接停止。'],
    pricing: ['把价格、限流、余额能力放进 ProviderProfile。', '运行前做成本与速率预估，运行后记录 token/usage。'],
    models: ['抽出模型能力标签：tool、stream、vision、reasoning、batch。', '不要让业务逻辑直接写死 model name，交给 providerProfile 路由。'],
    knowledge: ['把知识库能力降级成 retrieve/search/read 三类 Action。', '区分知识库文档上传、检索、引用位置和答案生成。'],
    integration: ['记录第三方客户端的 base_url、key、model、tool 支持差异。', '把兼容配置沉淀为 adapter sample，而不是散落在 README。'],
    guides: ['从指南里提炼流程和边界条件，再反推要写哪些测试。', '优先找官方样例里的失败路径与特殊参数。'],
    quick_start: ['先跑最小请求，拿到第一个可复现样本。', '把示例改造成自动化 smoke test。']
  };

  return {
    headline: base,
    actions: plans[doc.category] || ['先提取字段、流程和异常，再决定它属于 request builder、parser、tool adapter 还是 error mapper。', '把该页至少转成一个测试样本或一条 checklist。'],
    providerFocus: providerNote.focus || []
  };
}

function renderDetail(doc) {
  selectedDocUrl = doc.url;
  const box = document.getElementById('docDetail');
  const engineeringPlan = buildDocEngineeringPlan(doc);
  const snippets = normalizeSnippets(doc.codeSnippets);
  const topicTips = doc.tags.map((id) => {
    const topic = topicRules.find((item) => item.id === id);
    return topic ? topic.tips : '';
  }).filter(Boolean);
  const topicList = doc.tags.map((id) => normalizeTopicName(id)).join(' / ');
  const headings = normalizeArray(doc.headings)
    .slice(0, compactMode ? 8 : 20)
    .map((h) => `H${h.level || '?'} ${h.text || ''}`)
    .join('；');

  box.innerHTML = `
    <h3>${escapeHtml(doc.title || doc.path || doc.url)}</h3>
    <p><strong>供应商：</strong><span class="provider-inline ${doc.provider || 'deepseek'}">${escapeHtml(doc.providerLabel || getProviderLabel(doc.provider || 'deepseek'))}</span></p>
    <p><strong>分类：</strong>${escapeHtml(doc.categoryLabel)}（${escapeHtml(doc.category)}）</p>
    <p><strong>来源：</strong><a href="${escapeHtml(doc.url)}" target="_blank">${escapeHtml(doc.url || '')}</a></p>
    <p><strong>主题：</strong>${escapeHtml(topicList)}</p>
    <section>
      <h4>文档概要</h4>
      <p>${escapeHtml(doc.summary || '该页暂无摘要，建议先查看原文并确认关键参数。')}</p>
    </section>
    <section>
      <h4>结构与重点</h4>
      <p>${escapeHtml(headings || '暂无可读标题树')}</p>
    </section>
    <section>
      <h4>学习建议</h4>
      <ul>${topicTips.map((tip) => `<li>${escapeHtml(tip)}</li>`).join('')}</ul>
    </section>
    <section class="engineering-plan">
      <h4>工程映射：这页文档要转成什么</h4>
      <div class="engineering-plan-box">
        ${engineeringPlan.headline.map((item) => `<p>${escapeHtml(item)}</p>`).join('')}
        <ul>${engineeringPlan.actions.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        <div class="provider-focus-tags">
          ${engineeringPlan.providerFocus.map((item) => `<span>${escapeHtml(item)}</span>`).join('')}
        </div>
      </div>
    </section>
    <section>
      <h4>关键代码片段（最多 6 段）</h4>
      ${snippets.length
        ? snippets.slice(0, 6).map((s) => `<pre><code>${escapeHtml(s)}</code></pre>`).join('')
        : '<p>未检测到代码块，建议结合 API 示例页查看。</p>'}
    </section>
    <section>
      <h4>可执行指标</h4>
      <div class="skill-meter">
        <span>难度</span>
        <div class="skill-track"><div class="skill-fill" style="width:${doc.difficulty}%;"></div></div>
        <span class="skill-value">${doc.difficulty}%</span>
      </div>
      <div class="skill-meter">
        <span>实用性</span>
        <div class="skill-track"><div class="skill-fill" style="width:${doc.valueScore}%;"></div></div>
        <span class="skill-value">${doc.valueScore}%</span>
      </div>
    </section>
    <section>
      <h4>快速动作</h4>
      <button data-action="category">只看同分类</button>
      <button data-action="topic">只看同主题</button>
    </section>
  `;

  const topicAction = box.querySelector('[data-action="topic"]');
  const categoryAction = box.querySelector('[data-action="category"]');
  topicAction?.addEventListener('click', () => {
    activeCategory = doc.category;
    activeTopic = doc.tags[0] || 'all';
    renderMain();
  });
  categoryAction?.addEventListener('click', () => {
    activeCategory = doc.category;
    activeTopic = 'all';
    renderMain();
  });
}

function renderMain(options = {}) {
  if (pinnedTaskDate !== getTodayDate()) {
    syncPinnedTaskStateFromStorage();
  }
  const keyword = document.getElementById('searchInput').value.trim();
  const sortBy = document.getElementById('sortSelect').value;
  renderProviderSelect();
  renderProviderChips();
  const visualSource = getFilteredList(keyword, options);
  const contextSource = getFilteredList('', options);
  const list = sortItems(visualSource, sortBy);
  renderTopicSelect(contextSource);
  renderDashboard(list, visualSource, contextSource);
  renderLearningPulse(visualSource);
  renderChecklist(visualSource);
  renderAdapterLessons(visualSource);
  renderStageOneCourse();
  renderProviderDeepDive(visualSource);
  renderProviderPlaybook(visualSource);
  renderPathStory(visualSource);
  renderPathGuide(visualSource);
  renderRoadmap(visualSource);
  renderMethodFlow(visualSource);
  renderCategoryBars(visualSource);
  renderTopicBars(visualSource);
  renderTopicCategoryMatrix(visualSource);
  renderKeywordCloud(visualSource);
  renderLearningTracks(visualSource);
  buildChips(visualSource);
  renderList(list);
  renderPinnedTasks();

  if (!list.length) {
    selectedDocUrl = '';
    const box = document.getElementById('docDetail');
    if (box) {
      box.innerHTML = '<p class="placeholder">当前筛选没有匹配文档。请放宽关键词、Provider 或高价值筛选后继续查看详情。</p>';
    }
    return;
  }

  if (!selectedDocUrl && list[0]) {
    renderDetail(list[0]);
    selectedDocUrl = list[0].url;
  } else if (selectedDocUrl) {
    const found = list.find((doc) => doc.url === selectedDocUrl);
    if (found) renderDetail(found);
    else if (list[0]) {
      selectedDocUrl = list[0].url;
      renderDetail(list[0]);
    }
  }
}

function syncFilterUI() {
  const focusMode = document.getElementById('focusMode');
  if (!focusMode) return;
  focusMode.classList.toggle('focus-active', highValueMode);
  focusMode.textContent = highValueMode ? '退出高价值筛选' : '只看高价值';
}

function buildPathHint() {
  const note = document.getElementById('generatedNote');
  const updateText = generatedAt ? new Date(generatedAt).toLocaleString() : '';
  note.textContent = updateText ? `离线数据已加载 · 生成时间：${updateText}` : '离线数据已加载 · 生成时间未知';
}

function wire() {
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const topicSelect = document.getElementById('topicSelect');
  const providerSelect = document.getElementById('providerSelect');
  const toggleMode = document.getElementById('toggleMode');
  const focusMode = document.getElementById('focusMode');
  const resetFilters = document.getElementById('resetFilters');
  const openFolder = document.getElementById('open-folder');
  const clearPinned = document.getElementById('clearPinned');

  searchInput.addEventListener('input', () => renderMain());
  sortSelect.addEventListener('change', () => renderMain());
  providerSelect?.addEventListener('change', () => {
    activeProvider = providerSelect.value || 'all';
    const providerMeta = getProviderMeta(activeProvider);
    const providerHint = document.getElementById('providerHint');
    if (providerHint) providerHint.textContent = activeProvider === 'all' ? '当前展示：全部供应商' : `当前展示：${providerMeta.label}`;
    syncFilterUI();
    renderMain();
  });
  topicSelect.addEventListener('change', () => {
    activeTopic = topicSelect.value || 'all';
    renderMain();
  });
  toggleMode.addEventListener('click', () => {
    compactMode = !compactMode;
    toggleMode.textContent = compactMode ? '切换：精简 / 全文摘要' : '切换：全文摘要 / 精简';
    renderMain();
  });
  focusMode.addEventListener('click', () => {
    highValueMode = !highValueMode;
    syncFilterUI();
    renderMain();
  });
  resetFilters.addEventListener('click', () => {
    activeCategory = 'all';
    activeTopic = 'all';
    highValueMode = false;
    searchInput.value = '';
    providerSelect.value = 'all';
    activeProvider = 'all';
    sortSelect.value = 'category';
    syncFilterUI();
    const providerHint = document.getElementById('providerHint');
    if (providerHint) providerHint.textContent = '当前展示：全部供应商';
    renderMain();
  });
  clearPinned?.addEventListener('click', () => {
    pinnedTaskStates = getInitialTaskState();
    const focusHint = document.getElementById('pinnedFocusHint');
    if (focusHint) focusHint.textContent = '当前焦点：无';
    persistPinnedTaskStates();
    renderMain();
  });
  openFolder.addEventListener('click', () => {
    const target = new URL(tutorialDataUrl, window.location.href).href;
    window.open(target, '_blank', 'noopener,noreferrer');
  });
}

function loadData() {
  fetch(tutorialDataUrl)
    .then((resp) => resp.json())
    .then((payload) => {
      generatedAt = payload.generatedAt || '';
      const raw = normalizeArray(payload.documents || []);
      docs = buildDocs(raw);
      if (!docs.length) {
        document.getElementById('docList').innerHTML = '<p>数据为空，请先运行脚本更新快照。</p>';
        return;
      }
      syncPinnedTaskStateFromStorage();
      buildPathHint();
      renderMain();
    })
    .catch((error) => {
      document.getElementById('docList').innerHTML = `<p>加载失败：${escapeHtml(String(error.message))}</p>`;
      document.getElementById('count').textContent = '文档数据未找到';
    });
}

wire();
loadData();
