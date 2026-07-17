window.ROADMAP_DATA = {
  id: "multiagentroadmap",
  kicker: "Multi-Agent Worldmap v2",
  title: "多智能体协作模式全景地图",
  subtitle: "六大主流模式：Pipeline → Supervisor → Hierarchical → Blackboard → Debate → Swarm，覆盖 29 篇论文 + 8 大框架 + 3 大协议。",
  captionTitle: "Multi-Agent Patterns · Frameworks · Protocols",
  caption: "节点按协作模式分层：论文（圆）与框架（方）共存；连线展示模式继承与框架实现关系。",
  listTitle: "Multi-Agent Pattern / 多智能体模式索引",
  searchPlaceholder: "搜索 ChatDev, MetaGPT, AutoGen, LangGraph, Swarm, Debate...",
  theme: { cyan: "#f59e0b", green: "#3b82f6", amber: "#10b981", coral: "#8b5cf6", pink: "#ef4444" },
  nav: [
    { label: "Reasoning Map", href: "../reasoning-roadmap/" },
    { label: "Agent Map", href: "../agent-roadmap/" },
    { label: "Benchmark Map", href: "../benchmark-roadmap/" },
    { label: "World Map", href: "../worldroadmap/" },
    { label: "MiWork", href: "../miwork/" },
    { label: "Dev Docs", href: "../developer-docs/" },
    { label: "API CLI", href: "../provider-api-cli/" },
    { label: "Jobs", href: "https://harzva.github.io/Agent-Job-Interview/" },
    { label: "Home", href: "../" }
  ],
  categories: [
    "Pipeline",
    "Supervisor / Star",
    "Hierarchical",
    "Blackboard",
    "Debate",
    "Swarm",
    "关键综述",
    "主流框架"
  ],
  colors: {
    "Pipeline": "#f59e0b",
    "Supervisor / Star": "#3b82f6",
    "Hierarchical": "#10b981",
    "Blackboard": "#8b5cf6",
    "Debate": "#ef4444",
    "Swarm": "#06b6d4",
    "关键综述": "#94a3b8",
    "主流框架": "#f472b6"
  },
  lanes: [
    { label: "Pipeline 顺序执行（Level 1）", y: 0.12, color: "rgba(245,158,11,.45)" },
    { label: "Supervisor 中心调度（Level 2）", y: 0.26, color: "rgba(59,130,246,.45)" },
    { label: "Hierarchical 层级分解（Level 3）", y: 0.40, color: "rgba(16,185,129,.45)" },
    { label: "Blackboard 共享状态（Level 4）", y: 0.54, color: "rgba(139,92,246,.45)" },
    { label: "Debate 多方辩论（Level 5）", y: 0.70, color: "rgba(239,68,68,.45)" },
    { label: "Swarm 群体智能（Level 6）", y: 0.86, color: "rgba(6,182,212,.45)" }
  ],
  stats: [
    { value: "29", label: "核心论文" },
    { value: "8", label: "主流框架" },
    { value: "6", label: "协作模式" },
    { value: "3", label: "通信协议" },
    { value: "17", label: "开源仓库" }
  ],
  defaultDetail: {
    title: "多智能体不是简单的 Agent 叠加",
    body: "从 Pipeline 的顺序执行到 Swarm 的去中心自治，多智能体的协作复杂度从线性到指数增长。选择正确的模式取决于任务复杂度、并行需求和容错要求。",
    badges: ["Pipeline", "Supervisor", "Hierarchical", "Blackboard", "Debate", "Swarm"],
    metrics: [
      { value: "Level 1", label: "顺序流水线" },
      { value: "Level 2-3", label: "中心/层级" },
      { value: "Level 4-5", label: "共享/辩论" },
      { value: "Level 6", label: "去中心自治" }
    ],
    blocks: [
      {
        title: "六大模式选择决策",
        items: [
          "线性流程、内容生成 → Pipeline（ChatDev, MetaGPT）",
          "企业级复杂编排、任务分配 → Supervisor（AutoGen, AgentScope）",
          "大型软件项目、层级管理 → Hierarchical（CrewAI, MetaGPT）",
          "知识探索、协同研究 → Blackboard（LangGraph Shared State）",
          "决策评估、策略选择、法律分析 → Debate（Multi-Agent Debate, Encore）",
          "大规模分布式、探索性问题 → Swarm（OpenAI Swarm, Symphony）"
        ]
      },
      {
        title: "三大通信协议",
        items: [
          "MCP: Agent-to-Tool 工具调用（Client-Server）",
          "A2A: Agent-to-Agent 对等协作（P2P, 6-state）",
          "ANP: Agent-to-Network 去中心化生态（DID 文档）"
        ]
      }
    ]
  },
  nodes: [
    // ========== Lane 1: Pipeline (y=0.12) ==========
    {
      id: "chatdev",
      name: "ChatDev",
      short: "ChatDev",
      subtitle: "Communicative Agents for Software Development",
      category: "Pipeline",
      lane: "Pipeline 顺序执行（Level 1）",
      x: 0.15,
      y: 0.12,
      score: 94,
      year: "2024",
      venue: "ACL",
      shape: "hexagon",
      tags: ["OpenBMB", "software dev", "chat-chain", "role-play"],
      metrics: [
        { value: "ACL 2024", label: "发表" },
        { value: "Chen Qian", label: "第一作者" },
        { value: "OpenBMB", label: "机构" },
        { value: "chat-chain", label: "核心机制" }
      ],
      blocks: [
        { title: "核心思想", body: "多智能体模拟软件公司：CEO、CTO、程序员、测试员、设计师等角色按 Pipeline 顺序协作完成软件开发。每个角色是一个 Agent，通过 chat-chain 流水线机制传递信息。" },
        { title: "局限", body: "无法并行，效率较低；角色固定，缺乏动态调整；对复杂需求的理解受限于上下文窗口。" },
        { title: "仓库", body: "github.com/OpenBMB/ChatDev — 开源实现，支持自定义角色和流程。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2307.07924" },
        { label: "PDF", href: "./downloads/01_ChatDev_Pipeline.pdf" },
        { label: "GitHub", href: "https://github.com/OpenBMB/ChatDev" }
      ]
    },
    {
      id: "metagpt",
      name: "MetaGPT",
      short: "MetaGPT",
      subtitle: "Meta Programming for Multi-Agent Collaborative Framework",
      category: "Pipeline",
      lane: "Pipeline 顺序执行（Level 1）",
      x: 0.40,
      y: 0.12,
      score: 96,
      year: "2024",
      venue: "ICLR",
      shape: "hexagon",
      tags: ["DeepWisdom", "meta-programming", "SOP", "software dev"],
      metrics: [
        { value: "ICLR 2024", label: "发表" },
        { value: "Sirui Hong", label: "第一作者" },
        { value: "DeepWisdom", label: "机构" },
        { value: "SOP", label: "核心机制" }
      ],
      blocks: [
        { title: "核心思想", body: "基于标准作业程序（SOP）的元编程框架：产品经理 → 架构师 → 工程师 → QA 按角色流水线执行。每个角色输出结构化文档（PRD、设计文档、代码），作为下一角色的输入。" },
        { title: "与 ChatDev 区别", body: "ChatDev 是自由对话式 Pipeline，MetaGPT 是结构化文档式 Pipeline。MetaGPT 的 SOP 约束更强，输出更可控。" },
        { title: "仓库", body: "github.com/geekan/MetaGPT — 最热门的开源多智能体框架之一，Star 数 40k+。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2308.00352" },
        { label: "PDF", href: "./downloads/02_MetaGPT_Pipeline.pdf" },
        { label: "GitHub", href: "https://github.com/geekan/MetaGPT" }
      ]
    },
    {
      id: "crewai",
      name: "CrewAI",
      short: "CrewAI",
      subtitle: "Role-Based Multi-Agent Framework",
      category: "主流框架",
      lane: "Pipeline 顺序执行（Level 1）",
      x: 0.65,
      y: 0.12,
      score: 88,
      year: "2024",
      venue: "Open Source",
      shape: "square",
      tags: ["crewAIInc", "role-based", "process", "sequential/parallel"],
      metrics: [
        { value: "Open Source", label: "类型" },
        { value: "crewAIInc", label: "组织" },
        { value: "process-driven", label: "核心机制" },
        { value: "hierarchical", label: "额外模式" }
      ],
      blocks: [
        { title: "定位", body: "角色化多智能体协作框架，支持顺序和并行流程。强调'crew'（团队）概念，每个 Agent 有明确的角色、目标和工具。" },
        { title: "独特优势", body: "同时支持 Pipeline、Hierarchical 和 Blackboard 三种模式，是目前最灵活的多智能体框架之一。开箱即用，适合快速构建数字员工团队。" },
        { title: "适用", body: "内容生成、数据分析、客户服务、研究助理等需要明确角色分工的任务。" }
      ],
      links: [
        { label: "GitHub", href: "https://github.com/crewAIInc/crewAI" }
      ]
    },
    // ========== Lane 2: Supervisor / Star (y=0.26) ==========
    {
      id: "autogen",
      name: "AutoGen",
      short: "AutoGen",
      subtitle: "Enabling Next-Gen LLM Applications via Multi-Agent Conversation",
      category: "Supervisor / Star",
      lane: "Supervisor 中心调度（Level 2）",
      x: 0.15,
      y: 0.26,
      score: 95,
      year: "2024",
      venue: "COLM",
      shape: "hexagon",
      tags: ["Microsoft", "conversation", "group-chat", "supervisor"],
      metrics: [
        { value: "COLM 2024", label: "发表" },
        { value: "Qingyun Wu", label: "第一作者" },
        { value: "Microsoft", label: "机构" },
        { value: "conversation", label: "核心机制" }
      ],
      blocks: [
        { title: "核心思想", body: "微软官方多智能体对话框架：Agent 之间通过对话协作，支持 Supervisor-Worker 模式、群聊模式（group chat）和嵌套对话。中心 Agent 负责调度和仲裁。" },
        { title: "独特优势", body: "最全面的模式覆盖：支持 Pipeline、Supervisor、Blackboard、Swarm 和 Debate。与 Azure OpenAI 深度集成，企业级首选。" },
        { title: "仓库", body: "github.com/microsoft/autogen — 微软官方维护，社区最活跃的多智能体框架。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2308.08155" },
        { label: "PDF", href: "./downloads/03_AutoGen_Supervisor.pdf" },
        { label: "GitHub", href: "https://github.com/microsoft/autogen" }
      ]
    },
    {
      id: "agentverse",
      name: "AgentVerse",
      short: "AgentVerse",
      subtitle: "Facilitating Multi-Agent Collaboration and Emergent Behaviors",
      category: "Supervisor / Star",
      lane: "Supervisor 中心调度（Level 2）",
      x: 0.38,
      y: 0.26,
      score: 86,
      year: "2024",
      venue: "ICLR",
      shape: "circle",
      tags: ["THU", "emergent behavior", "environment", "role-assign"],
      metrics: [
        { value: "ICLR 2024", label: "发表" },
        { value: "Weize Chen", label: "第一作者" },
        { value: "Tsinghua", label: "机构" },
        { value: "emergent", label: "核心能力" }
      ],
      blocks: [
        { title: "核心思想", body: "清华大学提出的多智能体协作环境：引入环境层（Environment）和角色分配机制（Role-Assign），Agent 在环境中自主协作，产生涌现行为（Emergent Behavior）。" },
        { title: "与 AutoGen 区别", body: "AutoGen 是'对话中心'，AgentVerse 是'环境中心'。AgentVerse 更强调 Agent 在开放环境中的自组织涌现。" },
        { title: "适用", body: "模拟社会、经济、游戏等需要涌现行为的复杂系统。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2308.10848" },
        { label: "PDF", href: "./downloads/04_AgentVerse_Supervisor.pdf" }
      ]
    },
    {
      id: "crossteam",
      name: "Cross-Team Orchestration",
      short: "Cross-Team",
      subtitle: "Multi-Agent Collaboration via Cross-Team Orchestration",
      category: "Supervisor / Star",
      lane: "Supervisor 中心调度（Level 2）",
      x: 0.58,
      y: 0.26,
      score: 82,
      year: "2025",
      venue: "ACL Findings",
      shape: "circle",
      tags: ["cross-team", "orchestration", "multi-team"],
      metrics: [
        { value: "ACL Findings 2025", label: "发表" },
        { value: "Zhihao Du", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "team-level", label: "核心机制" }
      ],
      blocks: [
        { title: "核心思想", body: "跨团队编排：多个 Agent 团队（Team）之间通过中心协调员协作，每个团队内部可以是 Supervisor 或 Pipeline 模式。解决单团队规模限制。" },
        { title: "适用", body: "大型企业任务、需要跨部门协作的复杂项目。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2501.06322" },
        { label: "PDF", href: "./downloads/05_CrossTeamOrchestration_Supervisor.pdf" }
      ]
    },
    {
      id: "agentscope",
      name: "AgentScope",
      short: "AgentScope",
      subtitle: "Alibaba Open Source Multi-Agent Framework",
      category: "主流框架",
      lane: "Supervisor 中心调度（Level 2）",
      x: 0.80,
      y: 0.26,
      score: 84,
      year: "2024",
      venue: "Open Source",
      shape: "square",
      tags: ["Alibaba", "developer-friendly", "Supervisor", "Chinese"],
      metrics: [
        { value: "Open Source", label: "类型" },
        { value: "Alibaba", label: "机构" },
        { value: "Supervisor", label: "主要模式" },
        { value: "CN-first", label: "语言" }
      ],
      blocks: [
        { title: "定位", body: "阿里开源的多智能体框架，开发者友好，支持 Supervisor 中心化调度。对中文场景优化较好。" },
        { title: "特点", body: "内置多种 Agent 模板和对话模式，支持 Web UI 监控和调试。适合快速原型开发。" }
      ],
      links: [
        { label: "GitHub", href: "https://github.com/alibaba/AgentScope" }
      ]
    },
    // ========== Lane 3: Hierarchical (y=0.40) ==========
    {
      id: "dl4robotics",
      name: "DL for Robotics Survey",
      short: "DL-Robotics",
      subtitle: "A Survey of Deep Learning for Robotics",
      category: "Hierarchical",
      lane: "Hierarchical 层级分解（Level 3）",
      x: 0.12,
      y: 0.40,
      score: 78,
      year: "2023",
      venue: "arXiv",
      shape: "circle",
      tags: ["survey", "robotics", "hierarchical RL", "multi-agent"],
      metrics: [
        { value: "arXiv 2023", label: "发表" },
        { value: "多作者", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "survey", label: "类型" }
      ],
      blocks: [
        { title: "定位", body: "机器人领域深度学习综述，涵盖层级强化学习（Hierarchical RL）在多智能体协作中的应用。虽然不是纯 LLM 论文，但层级分解思想直接启发了 LLM Multi-Agent 的层级设计。" },
        { title: "关联", body: "MetaGPT 和 CrewAI 的 Hierarchical 模式都借鉴了此综述中的层级分解与逐级分配思想。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2301.08283" },
        { label: "PDF", href: "./downloads/08_DeepLearningRobotics_Hierarchical.pdf" }
      ]
    },
    {
      id: "metagpt_hier",
      name: "MetaGPT (Hierarchical)",
      short: "MetaGPT-H",
      subtitle: "Hierarchical Role Assignment in MetaGPT",
      category: "Hierarchical",
      lane: "Hierarchical 层级分解（Level 3）",
      x: 0.35,
      y: 0.40,
      score: 90,
      year: "2024",
      venue: "ICLR",
      shape: "hexagon",
      tags: ["DeepWisdom", "hierarchical", "SOP", "software dev"],
      metrics: [
        { value: "ICLR 2024", label: "发表" },
        { value: "Sirui Hong", label: "第一作者" },
        { value: "DeepWisdom", label: "机构" },
        { value: "PM→Arch→Eng→QA", label: "层级" }
      ],
      blocks: [
        { title: "核心思想", body: "MetaGPT 的 Hierarchical 变体：产品经理 → 架构师 → 工程师 → QA 的层级结构。每一层向下分解任务，向上汇报结果。类似企业管理组织架构。" },
        { title: "与 Pipeline 区别", body: "Pipeline 是'同级依次执行'，Hierarchical 是'上级分解、下级执行'。Hierarchical 有管理开销，但适合大型复杂项目。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2308.00352" },
        { label: "PDF", href: "./downloads/02_MetaGPT_Pipeline.pdf" },
        { label: "GitHub", href: "https://github.com/geekan/MetaGPT" }
      ]
    },
    {
      id: "crewai_hier",
      name: "CrewAI (Hierarchical)",
      short: "CrewAI-H",
      subtitle: "Hierarchical Mode in CrewAI",
      category: "Hierarchical",
      lane: "Hierarchical 层级分解（Level 3）",
      x: 0.60,
      y: 0.40,
      score: 85,
      year: "2024",
      venue: "Open Source",
      shape: "square",
      tags: ["crewAIInc", "hierarchical", "manager", "delegation"],
      metrics: [
        { value: "Open Source", label: "类型" },
        { value: "crewAIInc", label: "组织" },
        { value: "manager-agent", label: "核心机制" },
        { value: "delegation", label: "任务分配" }
      ],
      blocks: [
        { title: "核心思想", body: "CrewAI 的 Hierarchical 模式：引入 Manager Agent 作为顶层协调者，将任务分解后委派给各个 Worker Agent。Worker 完成后向 Manager 汇报，Manager 决定下一步。" },
        { title: "与 MetaGPT 区别", body: "MetaGPT 的层级是固定的（PM→Arch→Eng→QA），CrewAI 的层级是动态的（Manager 可以按需创建 Worker）。CrewAI 更灵活，MetaGPT 更结构化。" }
      ],
      links: [
        { label: "GitHub", href: "https://github.com/crewAIInc/crewAI" }
      ]
    },
    // ========== Lane 4: Blackboard (y=0.54) ==========
    {
      id: "dynamicllmagent",
      name: "Dynamic LLM-Agent Network",
      short: "DLAN",
      subtitle: "LLM-Agent Collaboration Framework with Agent Team Optimization",
      category: "Blackboard",
      lane: "Blackboard 共享状态（Level 4）",
      x: 0.15,
      y: 0.54,
      score: 84,
      year: "2023",
      venue: "arXiv",
      shape: "circle",
      tags: ["team optimization", "network", "dynamic topology"],
      metrics: [
        { value: "arXiv 2023", label: "发表" },
        { value: "Zijun Liu", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "team-opt", label: "核心机制" }
      ],
      blocks: [
        { title: "核心思想", body: "动态 LLM-Agent 网络：Agent 之间通过网络拓扑动态协作，共享状态（类似黑板），并通过团队优化算法调整协作结构。低耦合、灵活扩展。" },
        { title: "适用", body: "需要多人协同探索、知识积累的任务，如研究综述、头脑风暴、复杂问题分析。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2310.02170" },
        { label: "PDF", href: "./downloads/06_DynamicLLMAgentNetwork_Blackboard.pdf" }
      ]
    },
    {
      id: "awcp",
      name: "AWCP",
      short: "AWCP",
      subtitle: "Workspace Delegation Protocol for Deep-Engagement Collaboration",
      category: "Blackboard",
      lane: "Blackboard 共享状态（Level 4）",
      x: 0.40,
      y: 0.54,
      score: 80,
      year: "2026",
      venue: "arXiv",
      shape: "circle",
      tags: ["workspace delegation", "protocol", "remote agents"],
      metrics: [
        { value: "arXiv 2026", label: "发表" },
        { value: "多作者", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "protocol", label: "类型" }
      ],
      blocks: [
        { title: "核心思想", body: "工作区委托协议（AWCP）：远程 Agent 通过共享工作区（Workspace）深度协作，实现类似黑板模式的状态共享。支持冲突解决和版本控制。" },
        { title: "定位", body: "为 Blackboard 模式提供了协议层面的标准化，使不同来源的 Agent 可以在共享空间中协作。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2602.20493" },
        { label: "PDF", href: "./downloads/07_AWCP_Blackboard.pdf" }
      ]
    },
    {
      id: "langgraph",
      name: "LangGraph",
      short: "LangGraph",
      subtitle: "State + Graph Workflow for Multi-Agent",
      category: "主流框架",
      lane: "Blackboard 共享状态（Level 4）",
      x: 0.65,
      y: 0.54,
      score: 92,
      year: "2024",
      venue: "Open Source",
      shape: "square",
      tags: ["LangChain", "state graph", "shared state", "enterprise"],
      metrics: [
        { value: "Open Source", label: "类型" },
        { value: "LangChain", label: "组织" },
        { value: "state graph", label: "核心机制" },
        { value: "enterprise", label: "目标" }
      ],
      blocks: [
        { title: "核心思想", body: "LangChain 官方的多智能体框架：基于状态图（State Graph）和共享状态（Shared State）实现工作流编排。是 Blackboard 模式的最佳工程实现。" },
        { title: "独特优势", body: "支持条件分支、循环、子图嵌套和持久化状态。企业级复杂编排的首选框架。" },
        { title: "适用", body: "复杂工作流、状态管理、需要精确控制流程的企业级应用。" }
      ],
      links: [
        { label: "GitHub", href: "https://github.com/langchain-ai/langgraph" }
      ]
    },
    // ========== Lane 5: Debate (y=0.70) ==========
    {
      id: "multiagentdebate",
      name: "Multi-Agent Debate",
      short: "MAD",
      subtitle: "Improving Factuality and Reasoning via Multi-Agent Debate",
      category: "Debate",
      lane: "Debate 多方辩论（Level 5）",
      x: 0.08,
      y: 0.70,
      score: 93,
      year: "2023",
      venue: "ICML",
      shape: "hexagon",
      tags: ["MIT", "factuality", "reasoning", "majority voting"],
      metrics: [
        { value: "ICML 2023", label: "发表" },
        { value: "Yilun Du", label: "第一作者" },
        { value: "MIT", label: "机构" },
        { value: "consensus", label: "核心机制" }
      ],
      blocks: [
        { title: "核心思想", body: "多智能体辩论：多个 Agent 独立回答同一问题，然后互相展示答案并辩论，最终通过多数投票或共识机制得出更准确的结论。事实性准确率显著提升。" },
        { title: "效果", body: "在算术、推理和事实性任务上，多 Agent 辩论优于单 Agent 的 Chain-of-Thought。" },
        { title: "局限", body: "消耗更多资源，耗时更长；多个 Agent 可能同时犯错（一致性幻觉）。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2305.14325" },
        { label: "PDF", href: "./downloads/09_MultiagentDebate_Debate.pdf" },
        { label: "GitHub", href: "https://github.com/composable-systems/MultiAgentDebate" }
      ]
    },
    {
      id: "encore",
      name: "Encore",
      short: "Encore",
      subtitle: "A Divergent Thinking Approach to Multi-Agent Debate",
      category: "Debate",
      lane: "Debate 多方辩论（Level 5）",
      x: 0.22,
      y: 0.70,
      score: 88,
      year: "2024",
      venue: "EMNLP",
      shape: "circle",
      tags: ["divergent thinking", "creative", "debate"],
      metrics: [
        { value: "EMNLP 2024", label: "发表" },
        { value: "Tianyu Liang", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "divergent", label: "核心策略" }
      ],
      blocks: [
        { title: "核心思想", body: "发散式辩论：每个 Agent 从不同的角度（发散思维）思考问题，然后辩论融合。不只是追求事实正确，还追求创意多样性。" },
        { title: "与 Du et al. 区别", body: "Du 的辩论是'收敛式'（追求共识），Encore 是'发散式'（追求多样性）。适用于创意生成、策略探索等任务。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2404.08726" },
        { label: "PDF", href: "./downloads/10_Encore_Debate.pdf" }
      ]
    },
    {
      id: "chateval",
      name: "ChatEval",
      short: "ChatEval",
      subtitle: "Better LLM-based Evaluators through Multi-Agent Debate",
      category: "Debate",
      lane: "Debate 多方辩论（Level 5）",
      x: 0.36,
      y: 0.70,
      score: 85,
      year: "2023",
      venue: "arXiv",
      shape: "circle",
      tags: ["THU", "evaluation", "LLM judge", "debate"],
      metrics: [
        { value: "arXiv 2023", label: "发表" },
        { value: "Chi-Min Chan", label: "第一作者" },
        { value: "Tsinghua", label: "机构" },
        { value: "evaluation", label: "核心目标" }
      ],
      blocks: [
        { title: "核心思想", body: "通过多智能体辩论改进 LLM 评估器：多个评估 Agent 对同一输出进行辩论评分，减少单一评估器的偏见和随机性。" },
        { title: "适用", body: "LLM 输出质量评估、代码评审、内容审核等需要减少评估偏见的场景。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2308.07201" },
        { label: "PDF", href: "./downloads/11_ChatEval_Debate.pdf" },
        { label: "GitHub", href: "https://github.com/thunlp/ChatEval" }
      ]
    },
    {
      id: "whenhelpinghurts",
      name: "When Helping Hurts",
      short: "HelpingHurts",
      subtitle: "Multi-Agent Debate for Data Cleaning",
      category: "Debate",
      lane: "Debate 多方辩论（Level 5）",
      x: 0.50,
      y: 0.70,
      score: 81,
      year: "2026",
      venue: "arXiv",
      shape: "circle",
      tags: ["data cleaning", "failure mode", "helping hurts"],
      metrics: [
        { value: "arXiv 2026", label: "发表" },
        { value: "多作者", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "data cleaning", label: "核心目标" }
      ],
      blocks: [
        { title: "核心思想", body: "研究多智能体辩论中的'帮倒忙'现象：有时 Agent 的协助反而引入错误。提出数据清洗策略来过滤辩论中的有害贡献。" },
        { title: "启示", body: "不是所有 Agent 参与都有益，需要过滤机制和贡献评估。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2606.02866" },
        { label: "PDF", href: "./downloads/12_WhenHelpingHurts_Debate.pdf" }
      ]
    },
    {
      id: "talkisntcheap",
      name: "Talk Isn't Cheap",
      short: "TalkIsntCheap",
      subtitle: "Understanding Failure Modes in Multi-Agent Debate",
      category: "Debate",
      lane: "Debate 多方辩论（Level 5）",
      x: 0.62,
      y: 0.70,
      score: 82,
      year: "2025",
      venue: "arXiv",
      shape: "circle",
      tags: ["failure mode", "diagnosis", "debate analysis"],
      metrics: [
        { value: "arXiv 2025", label: "发表" },
        { value: "多作者", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "failure-analysis", label: "核心目标" }
      ],
      blocks: [
        { title: "核心思想", body: "系统诊断多智能体辩论的失败模式：识别何时辩论会加剧错误（而非修正错误），并提出改进策略。" },
        { title: "启示", body: "辩论不是万能药，需要理解其边界条件。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2509.05396" },
        { label: "PDF", href: "./downloads/13_TalkIsntCheap_Debate.pdf" }
      ]
    },
    {
      id: "consistencyillusion",
      name: "Consistency Illusion",
      short: "ConsistencyIllusion",
      subtitle: "How Multi-Agent Debate Hides Reasoning Misalignment",
      category: "Debate",
      lane: "Debate 多方辩论（Level 5）",
      x: 0.74,
      y: 0.70,
      score: 83,
      year: "2026",
      venue: "arXiv",
      shape: "circle",
      tags: ["misalignment", "consistency", "illusion"],
      metrics: [
        { value: "arXiv 2026", label: "发表" },
        { value: "多作者", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "misalignment", label: "核心发现" }
      ],
      blocks: [
        { title: "核心思想", body: "揭示多智能体辩论的'一致性幻觉'：多个 Agent 表面达成一致，但底层推理过程其实不一致。表面的共识掩盖了根本性的推理偏差。" },
        { title: "启示", body: "不能只看辩论结果，需要深入分析推理过程的一致性。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2606.08457" },
        { label: "PDF", href: "./downloads/14_ConsistencyIllusion_Debate.pdf" }
      ]
    },
    {
      id: "anonymization",
      name: "Anonymization",
      short: "Anonymization",
      subtitle: "Anonymization for Bias-Reduced Multi-Agent Reasoning",
      category: "Debate",
      lane: "Debate 多方辩论（Level 5）",
      x: 0.86,
      y: 0.70,
      score: 80,
      year: "2026",
      venue: "arXiv",
      shape: "circle",
      tags: ["anonymization", "bias reduction", "fairness"],
      metrics: [
        { value: "arXiv 2026", label: "发表" },
        { value: "多作者", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "bias-reduce", label: "核心目标" }
      ],
      blocks: [
        { title: "核心思想", body: "匿名化辩论：隐藏 Agent 的身份和立场，减少身份偏见对辩论结果的影响。提升辩论的公平性和客观性。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2510.07517" },
        { label: "PDF", href: "./downloads/15_Anonymization_Debate.pdf" }
      ]
    },
    // ========== Lane 6: Swarm (y=0.86) ==========
    {
      id: "swarm2004",
      name: "Swarming Behavior (2004)",
      short: "Swarm-04",
      subtitle: "Swarming Behavior of Multi-Agent Systems",
      category: "Swarm",
      lane: "Swarm 群体智能（Level 6）",
      x: 0.08,
      y: 0.86,
      score: 75,
      year: "2004",
      venue: "arXiv",
      shape: "circle",
      tags: ["math", "classic", "swarm", "multi-agent"],
      metrics: [
        { value: "arXiv 2004", label: "发表" },
        { value: "P. K. U. Swarm", label: "第一作者" },
        { value: "数学", label: "领域" },
        { value: "foundational", label: "定位" }
      ],
      blocks: [
        { title: "定位", body: "2004 年的数学论文，研究多智能体系统的群体行为（Swarming）。是多智能体 Swarm 模式的理论基础，早于 LLM 时代。" },
        { title: "关联", body: "现代 LLM Swarm 框架（如 OpenAI Swarm）的数学基础在此。群体行为的自组织、收敛性和稳定性分析。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/math/0405405" },
        { label: "PDF", href: "./downloads/21_SwarmingBehavior_Swarm.pdf" }
      ]
    },
    {
      id: "sagents",
      name: "S-Agents",
      short: "S-Agents",
      subtitle: "Self-Organizing Agents in Open-Ended Environments",
      category: "Swarm",
      lane: "Swarm 群体智能（Level 6）",
      x: 0.22,
      y: 0.86,
      score: 82,
      year: "2024",
      venue: "arXiv",
      shape: "circle",
      tags: ["self-organizing", "open-ended", "autonomous"],
      metrics: [
        { value: "arXiv 2024", label: "发表" },
        { value: "Jiaqi Chen", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "self-org", label: "核心机制" }
      ],
      blocks: [
        { title: "核心思想", body: "自组织 Agent：在开放环境中，Agent 自主学习、适应和协作，无需中心协调。类似自然界的蚁群、鸟群行为。" },
        { title: "适用", body: "探索性问题、无明确目标的任务、需要持续学习和适应的环境。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2402.04578" },
        { label: "PDF", href: "./downloads/22_SAgents_Swarm.pdf" }
      ]
    },
    {
      id: "selforganizingmas",
      name: "Self-Organizing MAS",
      short: "SO-MAS",
      subtitle: "Self-Organizing Multi-Agent Systems for Continuous Software Dev",
      category: "Swarm",
      lane: "Swarm 群体智能（Level 6）",
      x: 0.36,
      y: 0.86,
      score: 81,
      year: "2026",
      venue: "arXiv",
      shape: "circle",
      tags: ["continuous", "software dev", "self-org"],
      metrics: [
        { value: "arXiv 2026", label: "发表" },
        { value: "多作者", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "continuous", label: "核心场景" }
      ],
      blocks: [
        { title: "核心思想", body: "自组织多智能体系统用于持续软件开发：Agent 自主发现任务、分配工作、协作完成，无需人工干预。实现'无人值守'的持续开发。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2603.25928" },
        { label: "PDF", href: "./downloads/23_SelfOrganizingMAS_Swarm.pdf" }
      ]
    },
    {
      id: "evomas",
      name: "EvoMAS",
      short: "EvoMAS",
      subtitle: "Evolutionary Generation of Multi-Agent Systems",
      category: "Swarm",
      lane: "Swarm 群体智能（Level 6）",
      x: 0.50,
      y: 0.86,
      score: 80,
      year: "2026",
      venue: "arXiv",
      shape: "circle",
      tags: ["evolutionary", "genetic", "auto-generate"],
      metrics: [
        { value: "arXiv 2026", label: "发表" },
        { value: "多作者", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "evolutionary", label: "核心机制" }
      ],
      blocks: [
        { title: "核心思想", body: "进化生成多智能体系统：使用遗传算法自动演化出最优的 Agent 协作结构和策略。不是人工设计，而是自动进化。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2602.06511" },
        { label: "PDF", href: "./downloads/24_EvoMAS_Swarm.pdf" }
      ]
    },
    {
      id: "symphony",
      name: "Symphony",
      short: "Symphony",
      subtitle: "Decentralized Multi-Agent Framework for Scalable Collective Intelligence",
      category: "Swarm",
      lane: "Swarm 群体智能（Level 6）",
      x: 0.64,
      y: 0.86,
      score: 83,
      year: "2025",
      venue: "arXiv",
      shape: "circle",
      tags: ["decentralized", "collective intelligence", "scalable"],
      metrics: [
        { value: "arXiv 2025", label: "发表" },
        { value: "Ji Wang", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "decentralized", label: "核心机制" }
      ],
      blocks: [
        { title: "核心思想", body: "Symphony 去中心化多智能体框架：无中心协调节点，Agent 之间通过 P2P 网络自组织协作。实现可扩展的集体智能。" },
        { title: "仓库", body: "github.com/symphony-ai/symphony — 去中心化多智能体框架。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2508.20019" },
        { label: "PDF", href: "./downloads/25_Symphony_Swarm.pdf" },
        { label: "GitHub", href: "https://github.com/symphony-ai/symphony" }
      ]
    },
    {
      id: "dynamic_topologies",
      name: "Dynamic Topologies",
      short: "DynTop",
      subtitle: "Dynamic Generation of Multi LLM Agents Communication Topologies",
      category: "Swarm",
      lane: "Swarm 群体智能（Level 6）",
      x: 0.78,
      y: 0.86,
      score: 82,
      year: "2026",
      venue: "arXiv",
      shape: "circle",
      tags: ["graph diffusion", "topology", "dynamic"],
      metrics: [
        { value: "arXiv 2026", label: "发表" },
        { value: "多作者", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "graph-diffusion", label: "核心机制" }
      ],
      blocks: [
        { title: "核心思想", body: "使用图扩散模型动态生成多 LLM Agent 的通信拓扑：根据任务需求自动优化 Agent 之间的连接结构，实现最优的信息传播效率。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2510.07799" },
        { label: "PDF", href: "./downloads/26_DynamicTopologies_Swarm.pdf" }
      ]
    },
    {
      id: "openai_swarm",
      name: "OpenAI Swarm",
      short: "Swarm",
      subtitle: "Lightweight Decentralized Multi-Agent Framework",
      category: "主流框架",
      lane: "Swarm 群体智能（Level 6）",
      x: 0.92,
      y: 0.86,
      score: 87,
      year: "2024",
      venue: "Open Source",
      shape: "square",
      tags: ["OpenAI", "lightweight", "handoff", "educational"],
      metrics: [
        { value: "Open Source", label: "类型" },
        { value: "OpenAI", label: "组织" },
        { value: "handoff", label: "核心机制" },
        { value: "educational", label: "定位" }
      ],
      blocks: [
        { title: "核心思想", body: "OpenAI 官方轻量级去中心化多智能体框架：通过'handoff'（交接）机制实现 Agent 之间的自主协作。无中心节点，每个 Agent 决定何时将任务交给其他 Agent。" },
        { title: "定位", body: "教育性质的原型框架，展示 Swarm 模式的核心概念。不适合生产级部署，但非常适合学习理解去中心化协作。" }
      ],
      links: [
        { label: "GitHub", href: "https://github.com/openai/swarm" }
      ]
    },
    // ========== 关键综述 (y=0.02) ==========
    {
      id: "llmmas_survey",
      name: "LLM-Based MAS Survey",
      short: "MAS-Survey",
      subtitle: "Large Language Model Based Multi-Agents: A Survey",
      category: "关键综述",
      lane: "关键综述",
      x: 0.15,
      y: 0.02,
      score: 90,
      year: "2024",
      venue: "IJCAI",
      shape: "diamond",
      tags: ["survey", "IJCAI", "multi-agent", "LLM"],
      metrics: [
        { value: "IJCAI 2024", label: "发表" },
        { value: "Taicheng Guo", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "survey", label: "类型" }
      ],
      blocks: [
        { title: "定位", body: "IJCAI 2024 综述：全面覆盖基于 LLM 的多智能体系统进展与挑战。从协作机制、通信模式到应用场景的系统梳理。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2402.01680" },
        { label: "PDF", href: "./downloads/27_LLM-Based-MAS-Survey.pdf" }
      ]
    },
    {
      id: "orchestration_survey",
      name: "Orchestration Survey",
      short: "Orchestration-Survey",
      subtitle: "LLM-Based Multi-Agent Orchestration: A Survey",
      category: "关键综述",
      lane: "关键综述",
      x: 0.50,
      y: 0.02,
      score: 88,
      year: "2026",
      venue: "Preprints",
      shape: "diamond",
      tags: ["survey", "orchestration", "frameworks", "protocols"],
      metrics: [
        { value: "Preprints 2026", label: "发表" },
        { value: "多作者", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "survey", label: "类型" }
      ],
      blocks: [
        { title: "定位", body: "2026 年最新综述：覆盖多智能体编排框架、通信协议（MCP/A2A/ANP）和新兴模式。是进入多智能体领域的首选入口。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2604.2147" },
        { label: "PDF", href: "./downloads/28_MultiAgentOrchestration-Survey.pdf" }
      ]
    },
    {
      id: "whyfail_survey",
      name: "Why Do Multi-Agent Systems Fail?",
      short: "WhyFail",
      subtitle: "Diagnosing Failure Modes in Multi-Agent LLM Systems",
      category: "关键综述",
      lane: "关键综述",
      x: 0.85,
      y: 0.02,
      score: 89,
      year: "2025",
      venue: "ICLR Workshop",
      shape: "diamond",
      tags: ["ICLR Workshop", "failure analysis", "diagnosis"],
      metrics: [
        { value: "ICLR Workshop 2025", label: "发表" },
        { value: "M. Z. Pan", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "failure-analysis", label: "核心目标" }
      ],
      blocks: [
        { title: "定位", body: "ICLR 2025 Workshop：系统诊断多智能体 LLM 系统的失败模式。为什么 Multi-Agent 系统在实际部署中会失败？从通信、协调、推理、记忆等维度全面分析。" },
        { title: "必读理由", body: "不是'怎么做'，而是'为什么做不成'。对工程实践极具参考价值。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2503.13657" },
        { label: "PDF", href: "./downloads/29_WhyDoMultiAgentFail.pdf" }
      ]
    },
    // ========== 额外框架节点 (分散在各 Lane) ==========
    {
      id: "openai_agents",
      name: "OpenAI Agents",
      short: "OpenAI-Agents",
      subtitle: "OpenAI Official Agents SDK",
      category: "主流框架",
      lane: "Supervisor 中心调度（Level 2）",
      x: 0.92,
      y: 0.26,
      score: 86,
      year: "2024",
      venue: "Open Source",
      shape: "square",
      tags: ["OpenAI", "tools", "agents", "SDK"],
      metrics: [
        { value: "Open Source", label: "类型" },
        { value: "OpenAI", label: "组织" },
        { value: "tools-first", label: "核心机制" },
        { value: "app-building", label: "目标" }
      ],
      blocks: [
        { title: "定位", body: "OpenAI 官方 Agents SDK：工具生态强大，适合构建应用与集成。支持函数调用、代码解释器和文件搜索。" },
        { title: "适用", body: "需要强大工具集成能力的应用开发，如客服、数据分析、内容生成。" }
      ],
      links: [
        { label: "GitHub", href: "https://github.com/openai/openai-agents-python" }
      ]
    },
    {
      id: "camel",
      name: "CAMEL",
      short: "CAMEL",
      subtitle: "Communicative Agents for 'Mind' Exploration of Large Language Model Society",
      category: "主流框架",
      lane: "Debate 多方辩论（Level 5）",
      x: 0.95,
      y: 0.70,
      score: 85,
      year: "2023",
      venue: "NeurIPS",
      shape: "square",
      tags: ["role-play", "autonomous conversation", "society"],
      metrics: [
        { value: "NeurIPS 2023", label: "发表" },
        { value: "camel-ai", label: "组织" },
        { value: "role-play", label: "核心机制" },
        { value: "society", label: "愿景" }
      ],
      blocks: [
        { title: "定位", body: "CAMEL（Communicative Agents for 'Mind' Exploration）：通过角色扮演实现自主对话，探索 LLM 社会的涌现行为。是研究多智能体社会学的理想工具。" },
        { title: "适用", body: "研究、对话模拟、社会行为分析、创意角色扮演。" }
      ],
      links: [
        { label: "GitHub", href: "https://github.com/camel-ai/camel" }
      ]
    }
  ]
};
