window.ROADMAP_DATA = {
  id: "miwork",
  kicker: "MiWork Project v1",
  title: "MiWork 独立项目地图",
  subtitle: "MiWork 是面向 AgentWork / MiniApp / Benchmark 的工作台：把模型能力、上下文压缩、工作流资产、Playwright 评测和发布报告变成可复现产品。",
  captionTitle: "MiWork · Motivation · Modules · Roadmap",
  caption: "从动机到产品模块再到路线图：点击节点查看为什么做、怎么做、何时交付。",
  listTitle: "MiWork Plan / 动机与规划",
  searchPlaceholder: "搜索动机、MiEval、MiPackage、P0、P1、Studio...",
  theme: { cyan: "#7df9e5", green: "#8df086", amber: "#ffd166", coral: "#ff8b6e", pink: "#ff8ac8" },
  nav: [
    { label: "Agent Map", href: "../agent-roadmap/" },
    { label: "Benchmark Map", href: "../benchmark-roadmap/" },
    { label: "Reasoning Map", href: "../reasoning-roadmap/" },
    { label: "World Map", href: "../worldroadmap/" },
    { label: "Dev Docs", href: "../developer-docs/" },
    { label: "API CLI", href: "../provider-api-cli/" },
    { label: "Jobs", href: "https://harzva.github.io/Agent-Job-Interview/" },
    { label: "Papers", href: "../downloads.html" },
    { label: "Home", href: "../" }
  ],
  categories: [
    "Motivation",
    "Product Module",
    "Evaluation Harness",
    "Workspace Package",
    "Research Track",
    "Roadmap Phase"
  ],
  colors: {
    "Motivation": "#ffd166",
    "Product Module": "#7df9e5",
    "Evaluation Harness": "#ff8ac8",
    "Workspace Package": "#8df086",
    "Research Track": "#bda2ff",
    "Roadmap Phase": "#ff8b6e"
  },
  lanes: [
    { label: "Why MiWork exists", y: 0.18, color: "rgba(255,209,102,.52)" },
    { label: "Core product surface", y: 0.36, color: "rgba(125,249,229,.52)" },
    { label: "Evaluation, memory and package infrastructure", y: 0.56, color: "rgba(255,138,200,.48)" },
    { label: "Research and publication loop", y: 0.73, color: "rgba(189,162,255,.48)" },
    { label: "Execution roadmap", y: 0.88, color: "rgba(255,139,110,.48)" }
  ],
  stats: [
    { value: "4", label: "core motivations" },
    { value: "6", label: "product modules" },
    { value: "5", label: "roadmap phases" },
    { value: "3", label: "benchmark gates" }
  ],
  defaultDetail: {
    title: "MiWork 的独立定位",
    body: "MiWork 不再只是 Agent 页面里的机会点。它应独立成为 Agentic MiniApp Workbench：面向模型适配、工作流压缩、可执行交互应用、自动评测和研究报告发布的完整产品线。",
    badges: ["MiniApp", "Playwright", "AgentWorkOS", "Benchmark", "Memory", "Publication"],
    metrics: [
      { value: "P0", label: "atlas and spec" },
      { value: "P1", label: "task bank" },
      { value: "P2", label: "eval harness" },
      { value: "P3", label: "registry" }
    ],
    blocks: [
      {
        title: "一句话动机",
        body: "大模型地图解决“看懂模型生态”，MiWork 解决“把 Agent 能力变成可交付、可测试、可复现的工作成果”。"
      },
      {
        title: "边界",
        items: [
          "不是再做一个通用聊天 UI，而是做可执行工作流和 MiniApp 交付件。",
          "不是再做一个 Agent Kernel，而是复用 AgentWorkOS 的包管理和 runtime adapter。",
          "不是只做内容页，而是把 Benchmark 评测、轨迹、成本和报告纳入产品闭环。"
        ]
      }
    ]
  },
  nodes: [
    {
      id: "motivation-miniapp",
      name: "动机 01: 从文本到交互式工作成果",
      short: "Text → App",
      subtitle: "LLM responses are shifting from static text to interactive MiniApps",
      category: "Motivation",
      lane: "Why MiWork exists",
      x: 0.19,
      y: 0.18,
      score: 92,
      shape: "diamond",
      tags: ["MiniAppBench", "interactive HTML", "user intent"],
      metrics: [
        { value: "500", label: "MiniAppBench tasks" },
        { value: "6", label: "domains" },
        { value: "17.05%", label: "average pass rate" }
      ],
      blocks: [
        { title: "问题", body: "模型已经能写页面，但稳定交付交互逻辑、真实世界原则和状态链仍很难，MiniAppBench 的平均通过率说明该能力还远未饱和。" },
        { title: "MiWork 机会", body: "把 prompt、应用、测试轨迹、评分和修复建议组织成一个可重复工作流。" }
      ],
      links: [{ label: "Benchmark Map", href: "../benchmark-roadmap/" }]
    },
    {
      id: "motivation-harness",
      name: "动机 02: Harness 决定 Agent 上限",
      short: "Harness",
      subtitle: "Agent capability comes from model plus workflow, memory, tools and protocol",
      category: "Motivation",
      lane: "Why MiWork exists",
      x: 0.37,
      y: 0.2,
      score: 90,
      tags: ["Harness Engineering", "workflow", "memory", "tools"],
      metrics: [
        { value: "model + harness", label: "capability source" },
        { value: "50%", label: "OpenClaw GTA-2 note" }
      ],
      blocks: [
        { title: "问题", body: "很多 Agent 失败不是模型完全不会，而是工作流、上下文、工具协议和评测环境没有被工程化。" },
        { title: "MiWork 机会", body: "把可复用的 harness 变成产品模块：任务模板、上下文压缩、工具约束、可视化检查和报告生成。" }
      ]
    },
    {
      id: "motivation-workspace",
      name: "动机 03: 运行时碎片化需要包管理",
      short: "Package Layer",
      subtitle: "Codex, Claude Code, frameworks and Agent OS targets use different workspace semantics",
      category: "Motivation",
      lane: "Why MiWork exists",
      x: 0.56,
      y: 0.17,
      score: 88,
      tags: ["AgentWorkOS", "adapter", "lockfile", "runtime target"],
      metrics: [
        { value: "adapter", label: "core protocol" },
        { value: "lockfile", label: "reproducibility" }
      ],
      blocks: [
        { title: "问题", body: "Agent 资产在 Codex、Claude Code、IDE Agent、Agent Framework 和 AgentOS 之间语义不一致，导致工作成果不可迁移。" },
        { title: "MiWork 机会", body: "复用 AgentWorkOS，把 MiWork 的任务、评测、技能和报告作为可投影 package。" }
      ],
      links: [{ label: "Agent Map", href: "../agent-roadmap/" }]
    },
    {
      id: "motivation-benchmark",
      name: "动机 04: 交付必须经得起评测审计",
      short: "Audit",
      subtitle: "Benchmark credibility requires identity, harness, inference, cost and failure disclosure",
      category: "Motivation",
      lane: "Why MiWork exists",
      x: 0.76,
      y: 0.2,
      score: 86,
      tags: ["Open Scoring Schema", "cost", "trajectory", "harness drift"],
      metrics: [
        { value: "5", label: "audit dimensions" },
        { value: "cost", label: "mandatory report" }
      ],
      blocks: [
        { title: "问题", body: "Agent Benchmark 容易出现支架漂移、静默子集化、解码欠规范、成本不可见和仓库漂移。" },
        { title: "MiWork 机会", body: "把评测配置、轨迹、失败分类和成本报告默认写入每一次交付。" }
      ],
      links: [{ label: "Benchmark Map", href: "../benchmark-roadmap/" }]
    },
    {
      id: "studio",
      name: "MiWork Studio",
      short: "Studio",
      subtitle: "Authoring surface for prompts, miniapps, workflows and repair loops",
      category: "Product Module",
      lane: "Core product surface",
      x: 0.2,
      y: 0.36,
      score: 94,
      shape: "diamond",
      tags: ["authoring", "prompt", "miniapp", "repair"],
      metrics: [
        { value: "prompt", label: "input" },
        { value: "HTML", label: "artifact" },
        { value: "repair loop", label: "interaction" }
      ],
      blocks: [
        { title: "功能", body: "面向用户目标生成 MiniApp / workflow artifact，并把需求、实现、截图、测试轨迹和评分放在同一个工作台。" },
        { title: "首版交付", body: "支持单文件 HTML、Playwright smoke、截图检查、导出报告和任务模板。" }
      ]
    },
    {
      id: "mieval",
      name: "MiEval Playwright",
      short: "MiEval",
      subtitle: "Agentic evaluation harness with intention, static and dynamic scoring",
      category: "Evaluation Harness",
      lane: "Evaluation, memory and package infrastructure",
      x: 0.37,
      y: 0.52,
      score: 96,
      tags: ["Playwright", "Intention", "Static", "Dynamic", "weakest-link"],
      metrics: [
        { value: "I/S/D", label: "score axes" },
        { value: "0.8", label: "pass threshold" },
        { value: "trace", label: "artifact" }
      ],
      blocks: [
        { title: "功能", body: "复刻 MiniAppEval 思路：评估器读取用户意图、源代码和运行实例，通过浏览器自动化执行点击、输入、拖拽和边界输入测试。" },
        { title: "质量门", body: "采用木桶原则，意图对齐、静态质量、动态逻辑任一维度不过线都不算可交付。" }
      ]
    },
    {
      id: "mipackage",
      name: "MiPackage",
      short: "MiPackage",
      subtitle: "AgentWorkOS package projection for tasks, skills, evals and reports",
      category: "Workspace Package",
      lane: "Evaluation, memory and package infrastructure",
      x: 0.55,
      y: 0.55,
      score: 90,
      tags: ["AgentWorkOS", "manifest", "lockfile", "adapter", "rollback"],
      metrics: [
        { value: "manifest", label: "identity" },
        { value: "digest", label: "trust" },
        { value: "rollback", label: "safety" }
      ],
      blocks: [
        { title: "功能", body: "把 MiWork 任务、测试脚本、报告模板、技能和示例产物打成 AgentWorkOS package，投影到 Codex / Claude Code 等运行时。" },
        { title: "验收", body: "每个 package 必须声明 source、digest、adapter version、capabilities、secret refs 和 verify contract。" }
      ],
      links: [{ label: "AgentWorkOS", href: "https://github.com/Harzva/AgentWorkOS" }]
    },
    {
      id: "mimemory",
      name: "MiMemory",
      short: "MiMemory",
      subtitle: "Structured memory for user goals, decisions, traces and evaluation evidence",
      category: "Evaluation Harness",
      lane: "Evaluation, memory and package infrastructure",
      x: 0.72,
      y: 0.53,
      score: 84,
      tags: ["Hindsight", "world", "experience", "opinion", "observation"],
      metrics: [
        { value: "4", label: "memory views" },
        { value: "trace", label: "evidence" }
      ],
      blocks: [
        { title: "功能", body: "借鉴 Hindsight，把用户事实、Agent 执行经历、判断和观察摘要分离，避免评测报告混淆证据与推断。" },
        { title: "首版交付", body: "保留任务意图、关键决策、测试轨迹、失败分类和修复历史。" }
      ]
    },
    {
      id: "mibench",
      name: "MiBench Registry",
      short: "MiBench",
      subtitle: "Benchmark task bank for MiniApp, work agents and workflow artifacts",
      category: "Research Track",
      lane: "Research and publication loop",
      x: 0.22,
      y: 0.72,
      score: 88,
      tags: ["benchmark", "task bank", "leaderboard", "open scoring"],
      metrics: [
        { value: "100", label: "P1 seed tasks" },
        { value: "6", label: "domains" },
        { value: "cost", label: "reported" }
      ],
      blocks: [
        { title: "功能", body: "先从 100 个内部/公开任务建立种子集，再扩展为覆盖科学、工具、可视化、工作流、研究和企业任务的 MiBench。" },
        { title: "发布标准", body: "每个任务包含 identity、reference、harness version、seed、token limit、cost 和 failure taxonomy。" }
      ]
    },
    {
      id: "mireport",
      name: "MiReport",
      short: "MiReport",
      subtitle: "Research-grade report generator for benchmark findings and product releases",
      category: "Research Track",
      lane: "Research and publication loop",
      x: 0.42,
      y: 0.75,
      score: 82,
      tags: ["benchmark paper", "7-section template", "6E", "findings"],
      metrics: [
        { value: "7", label: "paper sections" },
        { value: "6E", label: "experiment frame" }
      ],
      blocks: [
        { title: "功能", body: "把每次评测自动整理为七节 Benchmark 报告骨架：Introduction、Related Work、Benchmark、Experiments、Discussion、Conclusion、References。" },
        { title: "输出", body: "生成 Finding X、消融表、人类一致性/自动一致性、成本表和开放问题。" }
      ]
    },
    {
      id: "mipublish",
      name: "MiPublish",
      short: "MiPublish",
      subtitle: "Artifact publishing layer for demos, datasets, reports and package indexes",
      category: "Workspace Package",
      lane: "Research and publication loop",
      x: 0.64,
      y: 0.73,
      score: 78,
      tags: ["GitHub Pages", "package index", "report", "artifact"],
      metrics: [
        { value: "Pages", label: "demo hosting" },
        { value: "index", label: "package registry" }
      ],
      blocks: [
        { title: "功能", body: "把交互 Demo、任务集、报告和 AgentWorkOS package index 发布为可审计站点。" },
        { title: "注意", body: "公开包和报告不得包含 token、cookie、.env、私有路径、原始聊天日志或 credential dumps。" }
      ]
    },
    {
      id: "miworkflow",
      name: "MiWorkflow Packs",
      short: "Workflow Packs",
      subtitle: "Reusable domain packs for coding, research, enterprise ops and education",
      category: "Product Module",
      lane: "Core product surface",
      x: 0.82,
      y: 0.36,
      score: 80,
      tags: ["coding", "research", "enterprise", "education"],
      metrics: [
        { value: "4", label: "seed packs" },
        { value: "adapter", label: "delivery model" }
      ],
      blocks: [
        { title: "功能", body: "把常见工作流做成可安装 pack：代码修复、论文复现、数据分析、客户服务模拟、MiniApp 设计和课程实验。" },
        { title: "验收", body: "每个 pack 有任务模板、工具要求、评测脚本、示例产物和成本边界。" }
      ]
    },
    {
      id: "p0",
      name: "P0: 独立站点与规格冻结",
      short: "P0",
      subtitle: "Separate MiWork identity, atlas pages, schema and safety rules",
      category: "Roadmap Phase",
      lane: "Execution roadmap",
      x: 0.18,
      y: 0.89,
      score: 90,
      tags: ["now", "schema", "site", "safety"],
      metrics: [
        { value: "Now", label: "phase" },
        { value: "3 pages", label: "atlas deliverable" }
      ],
      blocks: [
        { title: "交付", body: "建立 Agent Map、Benchmark Map、MiWork 独立页；冻结节点 schema、任务 schema、报告 schema 和公开安全边界。" },
        { title: "验收", body: "GitHub Pages 可直接打开；无本地构建依赖；导航和导出功能可用。" }
      ]
    },
    {
      id: "p1",
      name: "P1: 100 个任务种子集",
      short: "P1",
      subtitle: "Seed task bank and first evaluator prompts",
      category: "Roadmap Phase",
      lane: "Execution roadmap",
      x: 0.36,
      y: 0.89,
      score: 84,
      tags: ["task bank", "seed", "rubric"],
      metrics: [
        { value: "100", label: "tasks" },
        { value: "I/S/D", label: "rubric" }
      ],
      blocks: [
        { title: "交付", body: "按 MiniAppBench 六域建立 100 个种子任务，补齐意图参考、静态检查项、动态交互脚本和失败分类。" },
        { title: "验收", body: "每个任务可在 Playwright 中运行 smoke；至少 20 个任务有双模型输出对比。" }
      ]
    },
    {
      id: "p2",
      name: "P2: 自动评测与修复回路",
      short: "P2",
      subtitle: "Playwright evaluator, trace capture, scoring and repair suggestions",
      category: "Roadmap Phase",
      lane: "Execution roadmap",
      x: 0.54,
      y: 0.89,
      score: 82,
      tags: ["Playwright", "trace", "repair", "cost"],
      metrics: [
        { value: "trace", label: "evidence" },
        { value: "cost", label: "report" }
      ],
      blocks: [
        { title: "交付", body: "实现 MiEval：浏览器自动化、截图、console log、DOM 检查、交互轨迹、三维评分和修复建议。" },
        { title: "验收", body: "同一任务在两次运行中可复现；报告包含 inference settings、token/cost 和失败分类。" }
      ]
    },
    {
      id: "p3",
      name: "P3: AgentWorkOS 包投影",
      short: "P3",
      subtitle: "MiWork tasks and evaluators become portable AgentWorkOS packages",
      category: "Roadmap Phase",
      lane: "Execution roadmap",
      x: 0.72,
      y: 0.89,
      score: 78,
      tags: ["AgentWorkOS", "package", "adapter", "rollback"],
      metrics: [
        { value: "Codex", label: "target" },
        { value: "Claude", label: "target" }
      ],
      blocks: [
        { title: "交付", body: "把 MiWork 任务、报告模板和评测脚本打包为 AgentWorkOS packages，可投影到 Codex / Claude Code。" },
        { title: "验收", body: "package install + verify + rollback 通过；lockfile 固定 digest 和 adapter version。" }
      ]
    },
    {
      id: "p4",
      name: "P4: 公开榜单与研究报告",
      short: "P4",
      subtitle: "Leaderboard, monthly report and reproducibility audit",
      category: "Roadmap Phase",
      lane: "Execution roadmap",
      x: 0.88,
      y: 0.89,
      score: 74,
      tags: ["leaderboard", "report", "audit", "community"],
      metrics: [
        { value: "monthly", label: "release" },
        { value: "schema", label: "audit" }
      ],
      blocks: [
        { title: "交付", body: "发布 MiBench 榜单、月度 Finding 报告、失败分析和任务提交指南。" },
        { title: "验收", body: "每条榜单结果都能追溯到任务版本、harness 版本、模型设置、成本和轨迹。" }
      ]
    }
  ],
  relations: [
    { from: "motivation-miniapp", to: "studio", color: "#ffd166", weight: 1.8 },
    { from: "motivation-harness", to: "mieval", color: "#ffd166" },
    { from: "motivation-workspace", to: "mipackage", color: "#8df086" },
    { from: "motivation-benchmark", to: "mibench", color: "#ffd166" },
    { from: "studio", to: "mieval", color: "#7df9e5", weight: 1.8 },
    { from: "mieval", to: "mimemory", color: "#ff8ac8" },
    { from: "mieval", to: "mibench", color: "#ff8ac8" },
    { from: "mipackage", to: "mipublish", color: "#8df086" },
    { from: "mibench", to: "mireport", color: "#bda2ff" },
    { from: "mireport", to: "mipublish", color: "#bda2ff" },
    { from: "miworkflow", to: "studio", color: "#7df9e5" },
    { from: "p0", to: "p1", color: "#ff8b6e", weight: 1.8 },
    { from: "p1", to: "p2", color: "#ff8b6e", weight: 1.8 },
    { from: "p2", to: "p3", color: "#ff8b6e", weight: 1.8 },
    { from: "p3", to: "p4", color: "#ff8b6e", weight: 1.8 },
    { from: "p2", to: "mieval", color: "#ff8ac8" },
    { from: "p3", to: "mipackage", color: "#8df086" }
  ]
};
