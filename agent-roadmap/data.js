window.ROADMAP_DATA = {
  id: "agentroadmap",
  mapMode: "world",
  kicker: "Agent Worldmap v1",
  title: "全球 Agent OS 与运行时地图",
  subtitle: "把 Agent OS、隔离运行时、生产平台、框架、记忆层、科研 Agent 和工作区包管理放在同一张可探索地图里。",
  captionTitle: "Agent 星云 · 公司锚点 · 世界地图",
  caption: "每个发光点代表 Agent OS、运行时、编程 Agent、记忆层或科研 Agent；点击国家、公司或项目查看生态关系。",
  listTitle: "Countries / Agent 生态榜单",
  searchPlaceholder: "搜索国家、公司、项目、Agent OS...",
  theme: { cyan: "#6feee0", green: "#78e08f", amber: "#ffd166", coral: "#ff7b6b", pink: "#ff8ac8" },
  nav: [
    { label: "World Map", href: "../worldroadmap/" },
    { label: "Benchmark Map", href: "../benchmark-roadmap/" },
    { label: "Reasoning Map", href: "../reasoning-roadmap/" },
    { label: "MiWork", href: "../miwork/" },
    { label: "Dev Docs", href: "../developer-docs/" },
    { label: "API CLI", href: "../provider-api-cli/" },
    { label: "Jobs", href: "https://harzva.github.io/Agent-Job-Interview/" },
    { label: "Papers", href: "../downloads.html" },
    { label: "Home", href: "../" }
  ],
  categories: [
    "Kernel / SDK",
    "Isolated Runtime",
    "Platform",
    "Framework",
    "Workspace Layer",
    "Coding Agent",
    "Memory Layer",
    "Research Agent"
  ],
  colors: {
    "Kernel / SDK": "#6feee0",
    "Isolated Runtime": "#ffd166",
    "Platform": "#8ab4ff",
    "Framework": "#ff8ac8",
    "Workspace Layer": "#78e08f",
    "Coding Agent": "#ff7b6b",
    "Memory Layer": "#bda2ff",
    "Research Agent": "#c6f36b"
  },
  lanes: [
    { label: "Kernel and resource syscall layer", y: 0.18, color: "rgba(111,238,224,.55)" },
    { label: "Runtime isolation and production control", y: 0.34, color: "rgba(255,209,102,.52)" },
    { label: "Developer-facing agent frameworks", y: 0.51, color: "rgba(255,138,200,.48)" },
    { label: "Coding / work agents and harnesses", y: 0.67, color: "rgba(255,123,107,.50)" },
    { label: "Persistent memory and research loops", y: 0.83, color: "rgba(198,243,107,.45)" }
  ],
  stats: [
    { value: "28", label: "agent nodes" },
    { value: "8", label: "ecosystem layers" },
    { value: "13", label: "OS / runtime refs" },
    { value: "6", label: "MiWork inputs" }
  ],
  defaultDetail: {
    title: "Agent 不是一个单层市场",
    body: "Agent OS 的核心差异不在名字，而在管理单位：有的管理 LLM/Memory/Tool 资源，有的管理隔离进程，有的管理生产服务，有的只管理工作区资产。",
    badges: ["Kernel", "Runtime", "Platform", "Framework", "Workspace", "Memory"],
    metrics: [
      { value: "P0", label: "clarify boundaries" },
      { value: "P1", label: "runtime adapters" },
      { value: "P2", label: "trust and rollback" },
      { value: "P3", label: "registry layer" }
    ],
    blocks: [
      {
        title: "关键结论",
        items: [
          "AgentWorkOS 的机会不是重造 Agent Kernel，而是成为异构 Agent Runtime 之上的包管理和工作区可移植层。",
          "AIOS / AgentOS 不是统一标准，必须按执行、调度、资源、隔离、状态、控制面和可移植性拆层判断。",
          "MiWork 应承接交互式工作流、可执行 MiniApp、Playwright 评测和 AgentWorkOS 包投影能力。"
        ]
      }
    ]
  },
  nodes: [
    {
      id: "agentworkos",
      name: "AgentWorkOS",
      short: "AgentWorkOS",
      subtitle: "Portable agent workspace package manager",
      category: "Workspace Layer",
      lane: "Workspace package layer",
      x: 0.5,
      y: 0.58,
      score: 94,
      stage: "Alpha / Harzva",
      shape: "diamond",
      country: "China",
      city: "Beijing / Shenzhen",
      lng: 116.4,
      lat: 39.9,
      org: "Harzva",
      tags: ["manifest", "lockfile", "runtime adapter", "Codex", "Claude"],
      metrics: [
        { value: "agentworkos.toml", label: "manifest" },
        { value: "dry-run", label: "safe default" },
        { value: "Codex / Claude", label: "targets" },
        { value: "adapter spec", label: "next protocol" }
      ],
      blocks: [
        { title: "定位", body: "不是 Agent 内核。它声明、锁定、校验并投影 Skills、Agents、Rules、Prompts、MCP、Hooks 和 Repo checkouts。" },
        { title: "路线", body: "优先补强 adapter schema、content digest、transactional apply、rollback、secret references、package signing 和 conformance tests。" }
      ],
      links: [
        { label: "GitHub", href: "https://github.com/Harzva/AgentWorkOS" }
      ]
    },
    {
      id: "aios",
      name: "AIOS Kernel",
      short: "AIOS",
      subtitle: "Kernel + SDK research reference for AI agent operating systems",
      category: "Kernel / SDK",
      lane: "Kernel and resource syscall layer",
      x: 0.24,
      y: 0.16,
      score: 92,
      year: "2026",
      country: "United States",
      city: "New Brunswick, NJ",
      lng: -74.45,
      lat: 40.49,
      org: "AGI Research",
      tags: ["LLM core", "memory manager", "storage", "tool manager", "syscall"],
      metrics: [
        { value: "Kernel", label: "primary layer" },
        { value: "Cerebrum", label: "SDK pair" },
        { value: "v0.3", label: "report snapshot" },
        { value: "resources", label: "managed unit" }
      ],
      blocks: [
        { title: "为什么重要", body: "AIOS 是严格 Agent OS 语境下最清楚的内核参考：Kernel 管 LLM、Memory、Storage、Tool 等资源，SDK 面向 Agent 应用。" }
      ],
      links: [
        { label: "AIOS", href: "https://github.com/agiresearch/AIOS" },
        { label: "Cerebrum", href: "https://github.com/agiresearch/Cerebrum" }
      ]
    },
    {
      id: "cerebrum",
      name: "Cerebrum SDK",
      short: "Cerebrum",
      subtitle: "Agent SDK paired with AIOS kernel",
      category: "Kernel / SDK",
      lane: "Kernel and resource syscall layer",
      x: 0.33,
      y: 0.21,
      score: 82,
      country: "United States",
      city: "New Brunswick, NJ",
      lng: -74.45,
      lat: 40.49,
      org: "AGI Research",
      tags: ["SDK", "agent app", "AIOS"],
      metrics: [
        { value: "SDK", label: "developer surface" },
        { value: "AIOS", label: "kernel pair" }
      ],
      blocks: [
        { title: "地图角色", body: "把内核能力暴露给 Agent 应用，是理解 AIOS 分层时必须与 Kernel 一起看的配套仓库。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/agiresearch/Cerebrum" }]
    },
    {
      id: "rivet",
      name: "Rivet agentOS",
      short: "Rivet",
      subtitle: "In-process VM / OS kernel for isolated agent execution",
      category: "Isolated Runtime",
      lane: "Runtime isolation and production control",
      x: 0.43,
      y: 0.28,
      score: 90,
      country: "United States",
      city: "San Francisco",
      lng: -122.42,
      lat: 37.77,
      org: "Rivet",
      tags: ["VM", "V8 isolate", "WASM", "virtual filesystem", "permissions"],
      metrics: [
        { value: "VM", label: "execution unit" },
        { value: "FS / PTY", label: "virtual resources" },
        { value: "preview", label: "maturity" }
      ],
      blocks: [
        { title: "为什么重要", body: "Rivet 把每个 Agent 视作需要文件系统、进程、网络、权限和持久状态的运行单元，重点是隔离执行边界。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/rivet-dev/agentos" }]
    },
    {
      id: "openfang",
      name: "OpenFang",
      short: "OpenFang",
      subtitle: "Rust-based autonomous Agent OS with kernel, runtime, memory and skills",
      category: "Isolated Runtime",
      lane: "Runtime isolation and production control",
      x: 0.55,
      y: 0.25,
      score: 88,
      country: "United States",
      city: "San Francisco",
      lng: -122.42,
      lat: 37.77,
      org: "RightNow AI",
      tags: ["Rust", "scheduler", "budget", "RBAC", "WASM", "MCP"],
      metrics: [
        { value: "kernel", label: "orchestration" },
        { value: "runtime", label: "agent loop" },
        { value: "pre-1.0", label: "maturity" }
      ],
      blocks: [
        { title: "借鉴点", body: "完整模块组织值得 AgentWorkOS 学习，但不宜把 scheduler、vault、memory、runtime 一次性复制进包管理器。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/RightNow-AI/openfang" }]
    },
    {
      id: "smythos",
      name: "SmythOS SRE",
      short: "SmythOS",
      subtitle: "Runtime kernel and SDK with resource connectors",
      category: "Kernel / SDK",
      lane: "Kernel and resource syscall layer",
      x: 0.67,
      y: 0.2,
      score: 84,
      country: "United States",
      city: "Austin",
      lng: -97.74,
      lat: 30.27,
      org: "SmythOS",
      tags: ["LLM", "Storage", "VectorDB", "Cache", "Vault", "ACL"],
      metrics: [
        { value: "connectors", label: "resource abstraction" },
        { value: "ACL", label: "security surface" }
      ],
      blocks: [
        { title: "地图角色", body: "它展示了跨供应商资源 Connector、Vault 和 ACL 如何成为 Agent runtime 的核心接口。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/SmythOS/sre" }]
    },
    {
      id: "agno",
      name: "Agno",
      short: "Agno",
      subtitle: "Production agent platform and control plane",
      category: "Platform",
      lane: "Runtime isolation and production control",
      x: 0.76,
      y: 0.35,
      score: 86,
      country: "United States",
      city: "San Francisco",
      lng: -122.42,
      lat: 37.77,
      org: "Agno",
      tags: ["tracing", "scheduling", "RBAC", "teams", "workflows"],
      metrics: [
        { value: "control plane", label: "primary role" },
        { value: "services", label: "managed unit" }
      ],
      blocks: [
        { title: "地图角色", body: "Agno 更像生产 Agent application server 与 control plane，而不是传统内核 syscall 模型。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/agno-agi/agno" }]
    },
    {
      id: "infosys",
      name: "Infosys Agentic Foundry",
      short: "Infosys IAF",
      subtitle: "Enterprise agent platform with governance and deployment orientation",
      category: "Platform",
      lane: "Runtime isolation and production control",
      x: 0.84,
      y: 0.42,
      score: 76,
      country: "India",
      city: "Bengaluru",
      lng: 77.59,
      lat: 12.97,
      org: "Infosys",
      tags: ["enterprise", "governance", "platform"],
      metrics: [
        { value: "enterprise", label: "target" },
        { value: "platform", label: "layer" }
      ],
      blocks: [
        { title: "地图角色", body: "适合作为企业 Agent 平台和治理能力的对照，不是 AgentWorkOS 当前阶段要直接复制的执行内核。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/Infosys/Infosys-Agentic-Foundry" }]
    },
    {
      id: "smartcomputer",
      name: "SmartComputer AgentOS",
      short: "SmartComputer",
      subtitle: "Governed runtime for deterministic and auditable self-modifying agents",
      category: "Isolated Runtime",
      lane: "Runtime isolation and production control",
      x: 0.31,
      y: 0.33,
      score: 75,
      country: "United States",
      city: "San Francisco",
      lng: -122.42,
      lat: 37.77,
      org: "SmartComputer AI",
      tags: ["audit", "self-modifying", "runtime"],
      metrics: [
        { value: "audit", label: "differentiator" },
        { value: "runtime", label: "layer" }
      ],
      blocks: [
        { title: "借鉴点", body: "对 AgentWorkOS 的启发是 provenance、签名、变更审批和可重放审计，而不是简单执行 Agent loop。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/smartcomputer-ai/agent-os" }]
    },
    {
      id: "iii",
      name: "iii AgentOS",
      short: "iii",
      subtitle: "Worker / function / trigger oriented experimental runtime",
      category: "Isolated Runtime",
      lane: "Runtime isolation and production control",
      x: 0.2,
      y: 0.39,
      score: 66,
      country: "Taiwan",
      city: "Taipei",
      lng: 121.56,
      lat: 25.04,
      org: "III Experimental",
      tags: ["worker", "function", "trigger"],
      metrics: [
        { value: "worker", label: "execution model" },
        { value: "pre-1.0", label: "maturity" }
      ],
      blocks: [
        { title: "地图角色", body: "代表函数化 Agent runtime 与事件驱动编排路线，适合未来 adapter bundle 研究。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/iii-experimental/agentos" }]
    },
    {
      id: "eliza",
      name: "elizaOS",
      short: "elizaOS",
      subtitle: "Agent framework and platform with plugins, memory and connectors",
      category: "Framework",
      lane: "Developer-facing agent frameworks",
      x: 0.21,
      y: 0.51,
      score: 82,
      country: "United States",
      city: "San Francisco",
      lng: -122.42,
      lat: 37.77,
      org: "ElizaOS",
      tags: ["plugins", "memory", "connectors", "multi-agent"],
      metrics: [
        { value: "framework", label: "primary layer" },
        { value: "plugins", label: "extension model" }
      ],
      blocks: [
        { title: "边界", body: "它有 Agent 能力和平台化能力，但 README 语境更接近 framework/platform，不应直接当成内核。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/elizaOS/eliza" }]
    },
    {
      id: "framers",
      name: "Framers AgentOS",
      short: "Framers",
      subtitle: "TypeScript agent framework with cognitive memory and tool forging",
      category: "Framework",
      lane: "Developer-facing agent frameworks",
      x: 0.34,
      y: 0.49,
      score: 72,
      country: "India",
      city: "Bengaluru",
      lng: 77.59,
      lat: 12.97,
      org: "Framers Lab",
      tags: ["TypeScript", "memory", "tool forging", "providers"],
      metrics: [
        { value: "framework", label: "primary layer" },
        { value: "11", label: "provider refs" }
      ],
      blocks: [
        { title: "地图角色", body: "说明 AgentOS 名称可以指框架品牌，而不是严格 OS kernel。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/framerslab/agentos" }]
    },
    {
      id: "langgraph",
      name: "LangGraph",
      short: "LangGraph",
      subtitle: "Graph-based agent workflow framework",
      category: "Framework",
      lane: "Developer-facing agent frameworks",
      x: 0.47,
      y: 0.47,
      score: 78,
      country: "United States",
      city: "San Francisco",
      lng: -122.42,
      lat: 37.77,
      org: "LangChain",
      tags: ["graph", "workflow", "state"],
      metrics: [
        { value: "graph", label: "workflow unit" },
        { value: "stateful", label: "control" }
      ],
      blocks: [
        { title: "地图角色", body: "作为 workflow graph 方向的代表，适合和 AgentWorkOS 的 package identity、profile 和 runtime projection 对接。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/langchain-ai/langgraph" }]
    },
    {
      id: "autogen",
      name: "AutoGen",
      short: "AutoGen",
      subtitle: "Multi-agent conversation and orchestration framework",
      category: "Framework",
      lane: "Developer-facing agent frameworks",
      x: 0.58,
      y: 0.5,
      score: 76,
      country: "United States",
      city: "Redmond",
      lng: -122.12,
      lat: 47.67,
      org: "Microsoft",
      tags: ["multi-agent", "orchestration", "conversation"],
      metrics: [
        { value: "multi-agent", label: "pattern" },
        { value: "framework", label: "layer" }
      ],
      blocks: [
        { title: "地图角色", body: "用于说明框架侧的多 Agent 协调能力与 runtime kernel 的资源调度不是同一层。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/microsoft/autogen" }]
    },
    {
      id: "crewai",
      name: "CrewAI",
      short: "CrewAI",
      subtitle: "Role-based multi-agent automation framework",
      category: "Framework",
      lane: "Developer-facing agent frameworks",
      x: 0.69,
      y: 0.53,
      score: 70,
      country: "United States",
      city: "San Francisco",
      lng: -122.42,
      lat: 37.77,
      org: "CrewAI",
      tags: ["roles", "tasks", "automation"],
      metrics: [
        { value: "roles", label: "organizing unit" },
        { value: "tasks", label: "workflow unit" }
      ],
      blocks: [
        { title: "地图角色", body: "代表角色分工和任务编排类 framework，适合作为 MiWork workflow pack 的潜在适配对象。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/crewAIInc/crewAI" }]
    },
    {
      id: "codex",
      name: "OpenAI Codex CLI",
      short: "Codex CLI",
      subtitle: "Terminal coding agent and runtime target for AgentWorkOS",
      category: "Coding Agent",
      lane: "Coding / work agents and harnesses",
      x: 0.2,
      y: 0.67,
      score: 88,
      country: "United States",
      city: "San Francisco",
      lng: -122.42,
      lat: 37.77,
      org: "OpenAI",
      tags: ["terminal", "coding", "runtime target", "skills"],
      metrics: [
        { value: "TUI", label: "interface" },
        { value: "skills", label: "asset type" }
      ],
      blocks: [
        { title: "地图角色", body: "Codex CLI 是 AgentWorkOS 当前最重要的 target runtime 之一，重点是工作区资产如何投影为可用技能和规则。" }
      ],
      links: [{ label: "Docs", href: "https://developers.openai.com/codex" }]
    },
    {
      id: "claude-code",
      name: "Claude Code",
      short: "Claude Code",
      subtitle: "Terminal coding agent and Claude-native coding workflow",
      category: "Coding Agent",
      lane: "Coding / work agents and harnesses",
      x: 0.31,
      y: 0.7,
      score: 86,
      country: "United States",
      city: "San Francisco",
      lng: -122.42,
      lat: 37.77,
      org: "Anthropic",
      tags: ["terminal", "coding", "runtime target"],
      metrics: [
        { value: "TUI", label: "interface" },
        { value: "rules", label: "asset type" }
      ],
      blocks: [
        { title: "地图角色", body: "与 Codex 一起构成 AgentWorkOS 的双目标投影场景，推动 adapter lossiness 和 conformance test 成为核心协议。" }
      ],
      links: [{ label: "Product", href: "https://www.anthropic.com/claude-code" }]
    },
    {
      id: "aider",
      name: "Aider",
      short: "Aider",
      subtitle: "CLI pair programmer with repo map and explicit context",
      category: "Coding Agent",
      lane: "Coding / work agents and harnesses",
      x: 0.43,
      y: 0.72,
      score: 78,
      country: "United States",
      city: "Remote",
      lng: -73.94,
      lat: 40.73,
      org: "Aider",
      tags: ["CLI", "repo map", "git"],
      metrics: [
        { value: "repo map", label: "context primitive" },
        { value: "open source", label: "model" }
      ],
      blocks: [
        { title: "地图角色", body: "Aider 体现轻量 TUI/CLI agent 的长处：明确文件上下文、repo map 和 git patch loop。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/Aider-AI/aider" }]
    },
    {
      id: "openhands",
      name: "OpenHands",
      short: "OpenHands",
      subtitle: "Open source software engineering agent environment",
      category: "Coding Agent",
      lane: "Coding / work agents and harnesses",
      x: 0.55,
      y: 0.69,
      score: 80,
      country: "United States",
      city: "San Francisco",
      lng: -122.42,
      lat: 37.77,
      org: "All Hands AI",
      tags: ["software engineering", "workspace", "browser", "terminal"],
      metrics: [
        { value: "workspace", label: "execution context" },
        { value: "open", label: "ecosystem" }
      ],
      blocks: [
        { title: "地图角色", body: "代表面向软件工程任务的开放 Agent 环境，可作为 benchmark 和 MiWork 执行舱的参考。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/All-Hands-AI/OpenHands" }]
    },
    {
      id: "cursor",
      name: "Cursor Agent",
      short: "Cursor",
      subtitle: "IDE-native agent workflow for codebase editing",
      category: "Coding Agent",
      lane: "Coding / work agents and harnesses",
      x: 0.68,
      y: 0.7,
      score: 77,
      country: "United States",
      city: "San Francisco",
      lng: -122.42,
      lat: 37.77,
      org: "Anysphere",
      tags: ["IDE", "codebase", "agent"],
      metrics: [
        { value: "IDE", label: "interface" },
        { value: "context", label: "core asset" }
      ],
      blocks: [
        { title: "地图角色", body: "IDE Agent 侧重点是编辑器上下文和交互体验，与 TUI agent、workspace package layer 互补。" }
      ],
      links: [{ label: "Product", href: "https://cursor.com" }]
    },
    {
      id: "devin",
      name: "Devin",
      short: "Devin",
      subtitle: "Autonomous software engineering agent product archetype",
      category: "Coding Agent",
      lane: "Coding / work agents and harnesses",
      x: 0.79,
      y: 0.66,
      score: 74,
      country: "United States",
      city: "San Francisco",
      lng: -122.42,
      lat: 37.77,
      org: "Cognition",
      tags: ["work agent", "software engineering", "autonomy"],
      metrics: [
        { value: "work agent", label: "archetype" },
        { value: "product", label: "layer" }
      ],
      blocks: [
        { title: "地图角色", body: "作为自主软件工程 Agent 的产品形态参照，强调任务闭环、环境控制和持续修复能力。" }
      ],
      links: [{ label: "Product", href: "https://www.cognition.ai/devin" }]
    },
    {
      id: "hindsight",
      name: "Hindsight",
      short: "Hindsight",
      subtitle: "Epistemic agent memory with world / experience / opinion / observation networks",
      category: "Memory Layer",
      lane: "Persistent memory and research loops",
      x: 0.18,
      y: 0.84,
      score: 93,
      year: "2025",
      country: "United States",
      city: "San Francisco",
      lng: -122.42,
      lat: 37.77,
      org: "Hindsight",
      tags: ["TEMPR", "CARA", "LongMemEval", "LoCoMo", "belief evolution"],
      metrics: [
        { value: "91.4%", label: "LongMemEval top config" },
        { value: "4", label: "semantic networks" },
        { value: "retain / recall / reflect", label: "ops" }
      ],
      blocks: [
        { title: "研究价值", body: "它把生产环境的记忆痛点抽象成认识论分层：事实、经历、观点和观察摘要分离，解决证据与推断混淆。" }
      ]
    },
    {
      id: "memgpt",
      name: "MemGPT",
      short: "MemGPT",
      subtitle: "OS-style virtual memory metaphor for LLM context management",
      category: "Memory Layer",
      lane: "Persistent memory and research loops",
      x: 0.3,
      y: 0.86,
      score: 78,
      country: "United States",
      city: "Berkeley",
      lng: -122.27,
      lat: 37.87,
      org: "Letta / UC Berkeley",
      tags: ["virtual memory", "context", "recall storage"],
      metrics: [
        { value: "OS metaphor", label: "abstraction" },
        { value: "memory", label: "layer" }
      ],
      blocks: [
        { title: "地图角色", body: "代表用操作系统虚拟内存隐喻重构 LLM 上下文管理，是 memory 系统研究的早期标志性方向。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/cpacker/MemGPT" }]
    },
    {
      id: "mem0",
      name: "Mem0",
      short: "Mem0",
      subtitle: "Production memory system optimized for latency and token cost",
      category: "Memory Layer",
      lane: "Persistent memory and research loops",
      x: 0.42,
      y: 0.85,
      score: 82,
      country: "United States",
      city: "San Francisco",
      lng: -122.42,
      lat: 37.77,
      org: "mem0",
      tags: ["memory", "latency", "cost", "LOCOMO"],
      metrics: [
        { value: "two-stage", label: "architecture" },
        { value: "production", label: "constraint" }
      ],
      blocks: [
        { title: "地图角色", body: "代表工程优化型 memory：在延迟、token 成本和可维护性约束下追求可部署。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/mem0ai/mem0" }]
    },
    {
      id: "zep",
      name: "Zep / Graphiti",
      short: "Zep",
      subtitle: "Temporal knowledge graph memory for agent applications",
      category: "Memory Layer",
      lane: "Persistent memory and research loops",
      x: 0.54,
      y: 0.83,
      score: 79,
      country: "United States",
      city: "San Francisco",
      lng: -122.42,
      lat: 37.77,
      org: "Zep",
      tags: ["temporal graph", "knowledge graph", "memory"],
      metrics: [
        { value: "graph", label: "memory form" },
        { value: "temporal", label: "signal" }
      ],
      blocks: [
        { title: "地图角色", body: "强调双时序和图谱化事实管理，但在 Hindsight 报告语境下未单独建模主观信念和行为画像。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/getzep/graphiti" }]
    },
    {
      id: "ai-scientist",
      name: "AI Scientist v2",
      short: "AI Scientist",
      subtitle: "End-to-end autonomous research with agentic tree search",
      category: "Research Agent",
      lane: "Persistent memory and research loops",
      x: 0.67,
      y: 0.84,
      score: 89,
      year: "2025",
      country: "Japan",
      city: "Tokyo",
      lng: 139.69,
      lat: 35.68,
      org: "Sakana AI",
      tags: ["research", "BFTS", "paper writing", "review"],
      metrics: [
        { value: "$20-25", label: "paper cost" },
        { value: "BFTS", label: "search mode" },
        { value: "6.33", label: "workshop score" }
      ],
      blocks: [
        { title: "地图角色", body: "自主科研从固定流水线迈向动态探索的代表，展示 Agent 如何从假设、实验、图表到论文闭环。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/SakanaAI/AI-Scientist" }]
    },
    {
      id: "agent-lab",
      name: "Agent Laboratory",
      short: "Agent Lab",
      subtitle: "Three-stage multi-agent research pipeline",
      category: "Research Agent",
      lane: "Persistent memory and research loops",
      x: 0.78,
      y: 0.82,
      score: 84,
      country: "United States",
      city: "Pittsburgh",
      lng: -79.99,
      lat: 40.44,
      org: "Research community",
      tags: ["literature", "mle-solver", "paper-solver", "co-pilot"],
      metrics: [
        { value: "3 stages", label: "workflow" },
        { value: "$2.33+", label: "reported cost" }
      ],
      blocks: [
        { title: "地图角色", body: "用文献综述、实验执行、报告撰写三阶段把科研 Agent 流水线产品化，适合 MiWork research pack 借鉴。" }
      ],
      links: [{ label: "GitHub", href: "https://github.com/SamuelSchmidgall/AgentLaboratory" }]
    },
    {
      id: "agentrxiv",
      name: "AgentRxiv",
      short: "AgentRxiv",
      subtitle: "Collaborative research agents with a preprint-server abstraction",
      category: "Research Agent",
      lane: "Persistent memory and research loops",
      x: 0.86,
      y: 0.88,
      score: 81,
      country: "China",
      city: "Shanghai",
      lng: 121.47,
      lat: 31.23,
      org: "Academic benchmark",
      tags: ["preprint server", "collaboration", "knowledge sharing"],
      metrics: [
        { value: "11.4%", label: "relative gain" },
        { value: "13.7%", label: "parallel labs" }
      ],
      blocks: [
        { title: "地图角色", body: "揭示 Agent 间知识流动效率是系统性能瓶颈之一，适合启发 MiWork 的 artifact registry 和 report loop。" }
      ]
    }
  ],
  relations: [
    { from: "agentworkos", to: "codex", color: "#78e08f", weight: 1.8 },
    { from: "agentworkos", to: "claude-code", color: "#78e08f", weight: 1.8 },
    { from: "agentworkos", to: "rivet", color: "#ffd166" },
    { from: "agentworkos", to: "aios", color: "#6feee0" },
    { from: "agentworkos", to: "openfang", color: "#ffd166" },
    { from: "aios", to: "cerebrum", color: "#6feee0", weight: 1.8 },
    { from: "rivet", to: "openfang", color: "#ffd166" },
    { from: "smythos", to: "agno", color: "#8ab4ff" },
    { from: "eliza", to: "framers", color: "#ff8ac8" },
    { from: "langgraph", to: "autogen", color: "#ff8ac8" },
    { from: "codex", to: "aider", color: "#ff7b6b" },
    { from: "openhands", to: "devin", color: "#ff7b6b" },
    { from: "hindsight", to: "memgpt", color: "#bda2ff" },
    { from: "hindsight", to: "mem0", color: "#bda2ff" },
    { from: "hindsight", to: "zep", color: "#bda2ff" },
    { from: "ai-scientist", to: "agent-lab", color: "#c6f36b" },
    { from: "agent-lab", to: "agentrxiv", color: "#c6f36b" },
    { from: "hindsight", to: "ai-scientist", color: "#c6f36b" }
  ]
};
