window.ROADMAP_DATA = {
  id: "benchmarkroadmap",
  kicker: "Benchmark Worldmap v1",
  title: "Agent Benchmark 世界地图",
  subtitle: "从 Web、软件工程、桌面 OS、工具调用、企业任务、MiniApp 和长程记忆评测看 Agent 能力如何被定义、审计和发布。",
  captionTitle: "Benchmark Atlas · Evaluation Harness · Failure Modes",
  caption: "节点大小代表研究影响和任务覆盖；关系线连接评估范式、任务环境和审计风险。",
  listTitle: "Benchmark / 基准索引",
  searchPlaceholder: "搜索 SWE-bench、OSWorld、MiniAppBench、LongMemEval...",
  theme: { cyan: "#8ce7ff", green: "#91e887", amber: "#ffd166", coral: "#ff8b6e", pink: "#ff8ac8" },
  nav: [
    { label: "Agent Map", href: "../agent-roadmap/" },
    { label: "World Map", href: "../worldroadmap/" },
    { label: "MiWork", href: "../miwork/" },
    { label: "Dev Docs", href: "../developer-docs/" },
    { label: "API CLI", href: "../provider-api-cli/" },
    { label: "Jobs", href: "https://harzva.github.io/Agent-Job-Interview/" },
    { label: "Papers", href: "../downloads.html" },
    { label: "Home", href: "../" }
  ],
  categories: [
    "Web Agent",
    "Software Engineering",
    "OS / Desktop",
    "Tool Use",
    "Enterprise",
    "MiniApp",
    "Memory",
    "Audit Method"
  ],
  colors: {
    "Web Agent": "#8ce7ff",
    "Software Engineering": "#ff8b6e",
    "OS / Desktop": "#ffd166",
    "Tool Use": "#91e887",
    "Enterprise": "#8ab4ff",
    "MiniApp": "#ff8ac8",
    "Memory": "#bda2ff",
    "Audit Method": "#f6f0a8"
  },
  lanes: [
    { label: "Static matching to browser interaction", y: 0.18, color: "rgba(140,231,255,.52)" },
    { label: "Execution-verified code and OS tasks", y: 0.36, color: "rgba(255,139,110,.50)" },
    { label: "Tool, enterprise and stateful workflow evaluation", y: 0.55, color: "rgba(145,232,135,.48)" },
    { label: "Open-ended creation and memory evaluation", y: 0.74, color: "rgba(255,138,200,.48)" },
    { label: "Reproducibility and benchmark audit layer", y: 0.88, color: "rgba(246,240,168,.42)" }
  ],
  stats: [
    { value: "25", label: "benchmark nodes" },
    { value: "8", label: "evaluation families" },
    { value: "16k+", label: "ToolBench APIs" },
    { value: "5", label: "audit failure modes" }
  ],
  defaultDetail: {
    title: "Agent Benchmark 是新基础设施",
    body: "Agent 评测正在从静态答案匹配走向执行验证、浏览器探索、轨迹审计、成本披露和开放评分 schema。MiniAppBench 是交互式 HTML 应用生成这一新范式的强锚点。",
    badges: ["Playwright", "Execution", "Trajectory", "Cost", "Harness", "Leaderboard"],
    metrics: [
      { value: "Intention", label: "goal alignment" },
      { value: "Static", label: "structure quality" },
      { value: "Dynamic", label: "runtime logic" },
      { value: "Weakest-link", label: "pass rule" }
    ],
    blocks: [
      {
        title: "方法论来源",
        items: [
          "MiniAppBench: 从 1000 万+ 用户记录提炼 500 个任务，使用 Playwright 做类人探索式评估。",
          "Benchmark 写作遵循七节结构和 6E 实验框架：Environment、Engineering、Architecture、Training、Evaluation、Comparison。",
          "审计维度必须披露 benchmark identity、harness spec、inference settings、cost reporting 和 failure breakdown。"
        ]
      }
    ]
  },
  nodes: [
    {
      id: "miniappbench",
      name: "MiniAppBench",
      short: "MiniAppBench",
      subtitle: "Interactive HTML application generation benchmark",
      category: "MiniApp",
      lane: "Open-ended creation and memory evaluation",
      x: 0.5,
      y: 0.72,
      score: 96,
      year: "2026",
      shape: "diamond",
      tags: ["500 tasks", "ICML Spotlight", "Playwright", "Intention", "Static", "Dynamic"],
      metrics: [
        { value: "500", label: "tasks" },
        { value: "6", label: "domains" },
        { value: "92.4%", label: "human F1" },
        { value: "0.8", label: "weakest-link threshold" }
      ],
      blocks: [
        { title: "为什么是中心节点", body: "它把 Agent 从使用现有系统推进到创造交互式系统，评估目标不再是单一答案，而是意图、静态质量和动态逻辑的三维木桶原则。" },
        { title: "MiWork 机会", body: "MiWork 可以把 MiniAppBench 的评测逻辑产品化：从 prompt 到交互应用、从 Playwright 测试到可复现报告、从 benchmark 到工作流资产。" }
      ],
      links: [
        { label: "Homepage", href: "https://miniappbench.github.io" },
        { label: "arXiv", href: "https://arxiv.org/abs/2603.09652" }
      ]
    },
    {
      id: "webarena",
      name: "WebArena",
      short: "WebArena",
      subtitle: "Self-hosted web navigation tasks across realistic sites",
      category: "Web Agent",
      lane: "Static matching to browser interaction",
      x: 0.17,
      y: 0.2,
      score: 88,
      year: "2023",
      tags: ["812 tasks", "web navigation", "success rate"],
      metrics: [
        { value: "812", label: "tasks" },
        { value: "5", label: "websites" },
        { value: "SR", label: "metric" }
      ],
      blocks: [
        { title: "评估范式", body: "代表第一代 Web Agent 端到端任务完成率评估，结合字符串匹配和 LLM judge。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/web-arena-x/webarena" }]
    },
    {
      id: "visualwebarena",
      name: "VisualWebArena",
      short: "VisualWeb",
      subtitle: "Visual extension of WebArena for multimodal web agents",
      category: "Web Agent",
      lane: "Static matching to browser interaction",
      x: 0.27,
      y: 0.15,
      score: 80,
      year: "2024",
      tags: ["visual", "web", "multimodal"],
      metrics: [
        { value: "visual", label: "signal" },
        { value: "web", label: "environment" }
      ],
      blocks: [
        { title: "地图角色", body: "把 Web Agent 从 DOM / 文本导航推向屏幕理解和视觉 grounding。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/web-arena-x/visualwebarena" }]
    },
    {
      id: "mind2web",
      name: "Mind2Web",
      short: "Mind2Web",
      subtitle: "Large-scale real-website action sequence benchmark",
      category: "Web Agent",
      lane: "Static matching to browser interaction",
      x: 0.36,
      y: 0.22,
      score: 84,
      year: "2023",
      tags: ["2350 tasks", "137 sites", "action F1"],
      metrics: [
        { value: "2350", label: "tasks" },
        { value: "137", label: "sites" },
        { value: "Action F1", label: "metric" }
      ],
      blocks: [
        { title: "评估范式", body: "重点不是最终状态，而是动作类型和元素选择准确性；适合作为轨迹级评估的早期代表。" }
      ],
      links: [{ label: "Project", href: "https://osu-nlp-group.github.io/Mind2Web/" }]
    },
    {
      id: "claw-eval",
      name: "Claw-Eval",
      short: "Claw-Eval",
      subtitle: "Trajectory-audited agent benchmark with independent evidence channels",
      category: "Audit Method",
      lane: "Reproducibility and benchmark audit layer",
      x: 0.22,
      y: 0.88,
      score: 86,
      year: "2026",
      tags: ["trajectory", "audit log", "environment snapshot", "Pass^k"],
      metrics: [
        { value: "300", label: "tasks" },
        { value: "2159", label: "rubric items" },
        { value: "3", label: "evidence channels" }
      ],
      blocks: [
        { title: "为什么重要", body: "它指出只看最终输出会漏掉安全违规和鲁棒性失效，Agent 评测必须记录执行轨迹、审计日志和环境快照。" }
      ]
    },
    {
      id: "swe-bench",
      name: "SWE-bench",
      short: "SWE-bench",
      subtitle: "Real GitHub issue resolution with test execution",
      category: "Software Engineering",
      lane: "Execution-verified code and OS tasks",
      x: 0.17,
      y: 0.35,
      score: 92,
      year: "2024",
      tags: ["2294 issues", "Python repos", "unit tests", "resolved rate"],
      metrics: [
        { value: "2294", label: "issues" },
        { value: "12", label: "repos" },
        { value: "tests", label: "verification" }
      ],
      blocks: [
        { title: "评估范式", body: "软件工程 Agent 的标杆：补丁必须通过真实仓库测试，推动 execution-verified benchmark 成为主流。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/SWE-bench/SWE-bench" }]
    },
    {
      id: "swe-verified",
      name: "SWE-bench Verified",
      short: "SWE Verified",
      subtitle: "Human-verified subset for higher-quality software engineering evaluation",
      category: "Software Engineering",
      lane: "Execution-verified code and OS tasks",
      x: 0.29,
      y: 0.37,
      score: 85,
      year: "2024",
      tags: ["500 tasks", "verified", "software engineering"],
      metrics: [
        { value: "500", label: "verified subset" },
        { value: "quality", label: "focus" }
      ],
      blocks: [
        { title: "地图角色", body: "代表高质量子集化，但必须显式说明 subset identity，避免 silent subsetting。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/SWE-bench/SWE-bench" }]
    },
    {
      id: "terminalbench",
      name: "TerminalBench",
      short: "TerminalBench",
      subtitle: "Terminal environment tasks with multi-attempt execution verification",
      category: "Software Engineering",
      lane: "Execution-verified code and OS tasks",
      x: 0.41,
      y: 0.38,
      score: 78,
      year: "2026",
      tags: ["89 tasks", "terminal", "shell", "execution"],
      metrics: [
        { value: "89", label: "tasks" },
        { value: "50%+", label: "pass criterion" }
      ],
      blocks: [
        { title: "地图角色", body: "把软件工程评测拓展到终端环境和 shell 命令执行，强调环境交互能力。" }
      ],
      links: [{ label: "Homepage", href: "https://www.tbench.ai" }]
    },
    {
      id: "agentbench",
      name: "AgentBench",
      short: "AgentBench",
      subtitle: "Multi-environment benchmark across OS, DB, KG, games and web",
      category: "OS / Desktop",
      lane: "Execution-verified code and OS tasks",
      x: 0.53,
      y: 0.35,
      score: 84,
      year: "2023",
      tags: ["8 environments", "29 LLMs", "multi-domain"],
      metrics: [
        { value: "8", label: "environments" },
        { value: "29", label: "LLMs in report" }
      ],
      blocks: [
        { title: "评估范式", body: "早期系统化多域 Agent benchmark，在审计报告中因披露完整性表现突出。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/THUDM/AgentBench" }]
    },
    {
      id: "gaia",
      name: "GAIA",
      short: "GAIA",
      subtitle: "Real-world questions requiring reasoning, multimodal understanding and tool use",
      category: "Tool Use",
      lane: "Tool, enterprise and stateful workflow evaluation",
      x: 0.23,
      y: 0.55,
      score: 82,
      year: "2024",
      tags: ["466 questions", "real-world", "tool use"],
      metrics: [
        { value: "466", label: "questions" },
        { value: "3", label: "difficulty levels" }
      ],
      blocks: [
        { title: "地图角色", body: "面向开放域真实问题，强调多步推理和工具使用，而不是预构造网站或代码仓库。" }
      ],
      links: [{ label: "Leaderboard", href: "https://huggingface.co/spaces/gaia-benchmark/leaderboard" }]
    },
    {
      id: "osworld",
      name: "OSWorld",
      short: "OSWorld",
      subtitle: "Real desktop OS and application workflows with execution verification",
      category: "OS / Desktop",
      lane: "Execution-verified code and OS tasks",
      x: 0.64,
      y: 0.38,
      score: 90,
      year: "2024",
      tags: ["369 tasks", "desktop", "VM", "automation scripts"],
      metrics: [
        { value: "369", label: "tasks" },
        { value: "9", label: "apps" },
        { value: "VM", label: "environment" }
      ],
      blocks: [
        { title: "评估范式", body: "把 Agent 评测推向真实桌面应用、文件 I/O、终端、办公套件和跨应用工作流。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/xlang-ai/OSWorld" }]
    },
    {
      id: "toolbench",
      name: "ToolBench / ToolLLM",
      short: "ToolBench",
      subtitle: "Large-scale real API orchestration benchmark",
      category: "Tool Use",
      lane: "Tool, enterprise and stateful workflow evaluation",
      x: 0.36,
      y: 0.54,
      score: 86,
      year: "2024",
      tags: ["16464 APIs", "RapidAPI", "49 categories", "tool use"],
      metrics: [
        { value: "16464", label: "APIs" },
        { value: "49", label: "categories" },
        { value: "API chain", label: "capability" }
      ],
      blocks: [
        { title: "评估范式", body: "最大规模工具调用类基准之一，考察 API 选择、参数构造和多步工具编排。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/OpenBMB/ToolBench" }]
    },
    {
      id: "api-bank",
      name: "API-Bank",
      short: "API-Bank",
      subtitle: "Function calling and API use benchmark",
      category: "Tool Use",
      lane: "Tool, enterprise and stateful workflow evaluation",
      x: 0.48,
      y: 0.55,
      score: 72,
      year: "2023",
      tags: ["function calling", "parameters", "error handling"],
      metrics: [
        { value: "function", label: "call unit" },
        { value: "API", label: "target" }
      ],
      blocks: [
        { title: "地图角色", body: "侧重函数调用准确性、参数填充和错误处理，是工具使用评测的基础层。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/AlibabaResearch/DAMO-ConvAI/tree/main/api-bank" }]
    },
    {
      id: "workarena",
      name: "WorkArena",
      short: "WorkArena",
      subtitle: "ServiceNow enterprise knowledge-work benchmark",
      category: "Enterprise",
      lane: "Tool, enterprise and stateful workflow evaluation",
      x: 0.62,
      y: 0.55,
      score: 84,
      year: "2024",
      tags: ["ServiceNow", "19912 instances", "BrowserGym", "enterprise"],
      metrics: [
        { value: "33", label: "templates" },
        { value: "19912", label: "instances" },
        { value: "BrowserGym", label: "framework" }
      ],
      blocks: [
        { title: "评估范式", body: "模拟企业知识工作：表单、菜单、知识库、服务目录、仪表盘和列表操作。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/ServiceNow/WorkArena" }]
    },
    {
      id: "workarena-plus",
      name: "WorkArena++",
      short: "WorkArena++",
      subtitle: "Composite enterprise tasks requiring memory and data-driven decisions",
      category: "Enterprise",
      lane: "Tool, enterprise and stateful workflow evaluation",
      x: 0.75,
      y: 0.52,
      score: 78,
      year: "2025",
      tags: ["composite tasks", "memory", "enterprise"],
      metrics: [
        { value: "682", label: "reported tasks" },
        { value: "composite", label: "difficulty" }
      ],
      blocks: [
        { title: "地图角色", body: "从原子企业操作升级到复合任务，要求问题解决、记忆和数据驱动决策。" }
      ],
      links: [{ label: "Project", href: "https://github.com/ServiceNow/WorkArena" }]
    },
    {
      id: "tau-bench",
      name: "tau-bench",
      short: "tau-bench",
      subtitle: "Multi-turn tool-using customer-service benchmark",
      category: "Enterprise",
      lane: "Tool, enterprise and stateful workflow evaluation",
      x: 0.86,
      y: 0.57,
      score: 88,
      year: "2024",
      tags: ["retail", "airline", "pass^k", "policy compliance"],
      metrics: [
        { value: "165", label: "tasks" },
        { value: "pass^k", label: "metric" },
        { value: "DB state", label: "verification" }
      ],
      blocks: [
        { title: "评估范式", body: "以 pass^k 衡量多轮对话和工具使用的一致可靠性，区分偶然成功和稳定能力。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/sierra-research/tau-bench" }]
    },
    {
      id: "longmemeval",
      name: "LongMemEval",
      short: "LongMemEval",
      subtitle: "Long-horizon multi-session memory evaluation up to 1.5M tokens",
      category: "Memory",
      lane: "Open-ended creation and memory evaluation",
      x: 0.3,
      y: 0.73,
      score: 84,
      tags: ["500 questions", "1.5M tokens", "temporal reasoning", "multi-session"],
      metrics: [
        { value: "500", label: "questions" },
        { value: "1.5M", label: "token horizon" },
        { value: "91.4%", label: "Hindsight best" }
      ],
      blocks: [
        { title: "评估范式", body: "记忆系统评测核心基准之一，用来测试跨会话信息、多跳推理、时间推理、知识更新和弃权。" }
      ]
    },
    {
      id: "locomo",
      name: "LoCoMo",
      short: "LoCoMo",
      subtitle: "Long conversation memory benchmark",
      category: "Memory",
      lane: "Open-ended creation and memory evaluation",
      x: 0.4,
      y: 0.8,
      score: 78,
      tags: ["50 conversations", "personal details", "long context"],
      metrics: [
        { value: "50", label: "conversations" },
        { value: "89.61%", label: "Hindsight best" }
      ],
      blocks: [
        { title: "地图角色", body: "用于检验个人细节回忆和长程上下文保持，常与 LongMemEval 形成双基准验证。" }
      ]
    },
    {
      id: "browsergym",
      name: "BrowserGym",
      short: "BrowserGym",
      subtitle: "Browser agent evaluation framework used by enterprise and web tasks",
      category: "Web Agent",
      lane: "Static matching to browser interaction",
      x: 0.46,
      y: 0.18,
      score: 76,
      tags: ["browser", "observation space", "action space", "framework"],
      metrics: [
        { value: "browser", label: "harness" },
        { value: "framework", label: "layer" }
      ],
      blocks: [
        { title: "地图角色", body: "不是单一 benchmark，而是 Web/enterprise Agent 的标准化浏览器评测基础设施之一。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/ServiceNow/BrowserGym" }]
    },
    {
      id: "open-scoring",
      name: "Open Scoring Schema",
      short: "Open Scoring",
      subtitle: "Reproducibility audit checklist for benchmark papers",
      category: "Audit Method",
      lane: "Reproducibility and benchmark audit layer",
      x: 0.52,
      y: 0.88,
      score: 88,
      tags: ["identity", "harness", "inference", "cost", "failure breakdown"],
      metrics: [
        { value: "5", label: "scoring dimensions" },
        { value: "0 / .5 / 1", label: "rubric" }
      ],
      blocks: [
        { title: "五个检查项", body: "Benchmark Identity、Harness Specification、Inference Settings、Cost Reporting 和 Failure Breakdown。" }
      ]
    },
    {
      id: "harness-drift",
      name: "Harness Drift",
      short: "Harness Drift",
      subtitle: "Same benchmark name but different scaffold versions make scores incomparable",
      category: "Audit Method",
      lane: "Reproducibility and benchmark audit layer",
      x: 0.68,
      y: 0.88,
      score: 82,
      tags: ["scaffold", "version", "comparability"],
      metrics: [
        { value: "pin", label: "scaffold version" },
        { value: "compare", label: "reference harness" }
      ],
      blocks: [
        { title: "对策", body: "明确 pinned scaffold 版本、工具清单、镜像 digest，并与 reference scaffold 并列报告。" }
      ]
    },
    {
      id: "cost-invisibility",
      name: "Cost Invisibility",
      short: "Cost",
      subtitle: "Benchmark papers report accuracy without token or dollar cost",
      category: "Audit Method",
      lane: "Reproducibility and benchmark audit layer",
      x: 0.82,
      y: 0.86,
      score: 80,
      tags: ["token", "dollar", "budget", "inference cost"],
      metrics: [
        { value: "11 / 12", label: "audited papers missing cost" },
        { value: "tokens", label: "minimum report" }
      ],
      blocks: [
        { title: "对策", body: "报告每模型总输入/输出 token、等值美元成本、推理引擎和每任务 token 上限。" }
      ]
    },
    {
      id: "silent-subsetting",
      name: "Silent Subsetting",
      short: "Subset",
      subtitle: "Reported benchmark results may hide that only a cheaper subset was evaluated",
      category: "Audit Method",
      lane: "Reproducibility and benchmark audit layer",
      x: 0.58,
      y: 0.78,
      score: 78,
      tags: ["subset identity", "task count", "coverage", "cost pressure"],
      metrics: [
        { value: "B prime", label: "must disclose subset" },
        { value: "cost", label: "common driver" }
      ],
      blocks: [
        { title: "对策", body: "子集化可以接受，但必须公开 benchmark 版本、任务 ID、抽样策略、覆盖范围和与完整集的差异。" }
      ]
    },
    {
      id: "decoding-underspec",
      name: "Decoding Underspecification",
      short: "Decoding",
      subtitle: "Sampling, inference engine, token caps and stop rules are often underspecified",
      category: "Audit Method",
      lane: "Reproducibility and benchmark audit layer",
      x: 0.74,
      y: 0.78,
      score: 79,
      tags: ["temperature", "engine", "token cap", "stop rule"],
      metrics: [
        { value: "seed", label: "determinism" },
        { value: "token cap", label: "per task" }
      ],
      blocks: [
        { title: "对策", body: "同时披露 temperature、seed、推理引擎、模型版本、每任务 token 上限、停止规则和工具调用重试策略。" }
      ]
    },
    {
      id: "repository-drift",
      name: "Repository Drift",
      short: "Repo Drift",
      subtitle: "Paper, README and evaluation repository drift apart over time",
      category: "Audit Method",
      lane: "Reproducibility and benchmark audit layer",
      x: 0.9,
      y: 0.78,
      score: 76,
      tags: ["paper", "README", "commit", "release", "artifact"],
      metrics: [
        { value: "commit SHA", label: "minimum pin" },
        { value: "release", label: "artifact snapshot" }
      ],
      blocks: [
        { title: "对策", body: "论文、仓库 README、数据发布和 leaderboard 必须绑定 commit SHA / release tag；更新时保留 changelog 和旧结果解释。" }
      ]
    }
  ],
  relations: [
    { from: "webarena", to: "visualwebarena", color: "#8ce7ff" },
    { from: "webarena", to: "mind2web", color: "#8ce7ff" },
    { from: "webarena", to: "browsergym", color: "#8ce7ff" },
    { from: "swe-bench", to: "swe-verified", color: "#ff8b6e", weight: 1.8 },
    { from: "swe-bench", to: "terminalbench", color: "#ff8b6e" },
    { from: "agentbench", to: "osworld", color: "#ffd166" },
    { from: "toolbench", to: "api-bank", color: "#91e887" },
    { from: "gaia", to: "toolbench", color: "#91e887" },
    { from: "workarena", to: "workarena-plus", color: "#8ab4ff", weight: 1.8 },
    { from: "workarena", to: "tau-bench", color: "#8ab4ff" },
    { from: "miniappbench", to: "browsergym", color: "#ff8ac8" },
    { from: "miniappbench", to: "open-scoring", color: "#f6f0a8" },
    { from: "longmemeval", to: "locomo", color: "#bda2ff", weight: 1.8 },
    { from: "claw-eval", to: "open-scoring", color: "#f6f0a8" },
    { from: "open-scoring", to: "harness-drift", color: "#f6f0a8" },
    { from: "open-scoring", to: "cost-invisibility", color: "#f6f0a8" },
    { from: "open-scoring", to: "silent-subsetting", color: "#f6f0a8" },
    { from: "open-scoring", to: "decoding-underspec", color: "#f6f0a8" },
    { from: "open-scoring", to: "repository-drift", color: "#f6f0a8" }
  ]
};
