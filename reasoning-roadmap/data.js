window.ROADMAP_DATA = {
  id: "reasoningroadmap",
  kicker: "Reasoning Worldmap v1",
  title: "单智能体推理范式全景地图",
  subtitle: "从 CoT 到 PreFlect：展示 LLM Agent 的 21 种思考方式、技术演进路线和生产组合决策。",
  captionTitle: "Reasoning Paradigm · Evolution · Decision Tree",
  caption: "节点代表论文/范式；Lane 分层展示从基础推理到前瞻预防的范式跃迁。颜色区分 7 个范式家族。",
  listTitle: "Reasoning Paradigm / 推理范式索引",
  searchPlaceholder: "搜索 Chain-of-Thought、ReAct、Reflexion、Tree-of-Thoughts...",
  theme: { cyan: "#a78bfa", green: "#34d399", amber: "#fbbf24", coral: "#f87171", pink: "#f472b6" },
  nav: [
    { label: "Agent Map", href: "../agent-roadmap/" },
    { label: "Benchmark Map", href: "../benchmark-roadmap/" },
    { label: "World Map", href: "../worldroadmap/" },
    { label: "Multi-Agent Map", href: "../multi-agent-roadmap/" },
    { label: "MiWork", href: "../miwork/" },
    { label: "Dev Docs", href: "../developer-docs/" },
    { label: "API CLI", href: "../provider-api-cli/" },
    { label: "Jobs", href: "https://harzva.github.io/Agent-Job-Interview/" },
    { label: "Home", href: "../" }
  ],
  categories: [
    "基础推理",
    "Agent 核心范式",
    "搜索/探索",
    "反思/修正",
    "工具集成",
    "新兴前瞻",
    "关键综述"
  ],
  colors: {
    "基础推理": "#a78bfa",
    "Agent 核心范式": "#34d399",
    "搜索/探索": "#fbbf24",
    "反思/修正": "#f87171",
    "工具集成": "#60a5fa",
    "新兴前瞻": "#f472b6",
    "关键综述": "#94a3b8"
  },
  lanes: [
    { label: "基础推理层（2022-2023）", y: 0.15, color: "rgba(167,139,250,.45)" },
    { label: "Agent 核心范式层（2023）", y: 0.32, color: "rgba(52,211,153,.45)" },
    { label: "搜索/探索层（2023-2024）", y: 0.50, color: "rgba(251,191,36,.45)" },
    { label: "反思/修正层（2023-2024）", y: 0.68, color: "rgba(248,113,113,.45)" },
    { label: "工具/前瞻层（2023-2026）", y: 0.86, color: "rgba(96,165,250,.45)" }
  ],
  stats: [
    { value: "21", label: "核心论文" },
    { value: "7", label: "范式家族" },
    { value: "5", label: "演进层" },
    { value: "6", label: "顶尖机构" }
  ],
  defaultDetail: {
    title: "单智能体推理不是单一技术",
    body: "从 CoT 的显式思考到 ReAct 的行动交替，从 Reflexion 的长期记忆到 PreFlect 的事前预防，推理范式构成了 Agent 的'认知操作系统'。选择正确的范式组合，比选择更强大的模型更重要。",
    badges: ["CoT", "ReAct", "Reflexion", "ToT", "CRITIC", "PAL", "PreFlect"],
    metrics: [
      { value: "P0", label: "基础推理" },
      { value: "P1", label: "Agent 范式" },
      { value: "P2", label: "搜索修正" },
      { value: "P3", label: "前瞻预防" }
    ],
    blocks: [
      {
        title: "生产决策树",
        items: [
          "Step 1: 先用 ReAct 建立基线",
          "Step 2: 失败重复 → 添加 Reflexion（+30% 延迟，+10-30% 质量）",
          "Step 3: 循环>30步 → 切换 ToT 搜索或添加 re-anchor 检查点",
          "Step 4: 高 stakes 输出 → 添加 CRITIC/CoVe 验证层",
          "Step 5: 单智能体天花板 → 升级多智能体"
        ]
      },
      {
        title: "机构分布（第一作者）",
        items: [
          "Google / DeepMind: CoT, Least-to-Most, Self-Consistency（推理基础三件套）",
          "Princeton: ReAct, ToT, Reflexion（Agent 思考与搜索）",
          "Microsoft Research: CRITIC, ToRA（工具验证与数学推理）",
          "CMU / Allen Institute: Self-Refine, PAL（自我修正与程序辅助）",
          "Leiden University: Agentic LLMs Survey",
          "多机构: 综述与新兴前瞻（2024-2026）"
        ]
      }
    ]
  },
  nodes: [
    // ===== Lane 1: 基础推理层 (y=0.15) =====
    {
      id: "cot",
      name: "CoT",
      short: "CoT",
      subtitle: "Chain-of-Thought Prompting Elicits Reasoning in LLMs",
      category: "基础推理",
      lane: "基础推理层（2022-2023）",
      x: 0.12,
      y: 0.15,
      score: 98,
      year: "2022",
      venue: "NeurIPS",
      shape: "hexagon",
      tags: ["Google Brain", "prompting", "intermediate steps", "arithmetic"],
      metrics: [
        { value: "NeurIPS 2022", label: "发表" },
        { value: "Jason Wei", label: "第一作者" },
        { value: "Google Brain", label: "机构" },
        { value: "+30%", label: "推理提升" }
      ],
      blocks: [
        { title: "核心思想", body: "要求模型'一步一步想'，显式写出中间推理步骤。数学推理任务提升 30%+，但纯内部思考，无法调用外部工具。" },
        { title: "局限", body: "仅依赖模型内部知识，无外部验证；长链推理时中间步骤错误会级联传播。" },
        { title: "后续演进", body: "催生了 Self-Consistency（投票增强）、Least-to-Most（分解增强）、ReAct（行动增强）三条路线。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2201.11903" },
        { label: "PDF", href: "./downloads/01_CoT_Chain-of-Thought.pdf" }
      ]
    },
    {
      id: "least_to_most",
      name: "Least-to-Most",
      short: "LtM",
      subtitle: "Least-to-Most Prompting Enables Complex Reasoning",
      category: "基础推理",
      lane: "基础推理层（2022-2023）",
      x: 0.32,
      y: 0.15,
      score: 88,
      year: "2022",
      venue: "arXiv",
      shape: "circle",
      tags: ["Google Research", "decomposition", "sub-problems", "progressive"],
      metrics: [
        { value: "arXiv 2022", label: "发表" },
        { value: "Denny Zhou", label: "第一作者" },
        { value: "Google Research", label: "机构" },
        { value: "decomposition", label: "核心策略" }
      ],
      blocks: [
        { title: "核心思想", body: "将复杂问题分解为简单子问题，从易到难逐步解决。适合多步推理任务，避免一次性推理的信息过载。" },
        { title: "与 CoT 区别", body: "CoT 是'线性思考'，Least-to-Most 是'先分解再思考'。分解策略可以叠加在 CoT 之上。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2205.10625" },
        { label: "PDF", href: "./downloads/02_Least-to-Most.pdf" }
      ]
    },
    {
      id: "self_consistency",
      name: "Self-Consistency",
      short: "SC",
      subtitle: "Self-Consistency Improves Chain of Thought Reasoning",
      category: "基础推理",
      lane: "基础推理层（2022-2023）",
      x: 0.52,
      y: 0.15,
      score: 92,
      year: "2023",
      venue: "ICLR",
      shape: "circle",
      tags: ["Google Brain", "majority voting", "sampling", "ensemble"],
      metrics: [
        { value: "ICLR 2023", label: "发表" },
        { value: "Xuezhi Wang", label: "第一作者" },
        { value: "Google Brain", label: "机构" },
        { value: "sampling", label: "核心策略" }
      ],
      blocks: [
        { title: "核心思想", body: "多次采样生成多个推理链，取多数投票结果作为最终答案。将 CoT 从'单一路径'扩展到'概率共识'。" },
        { title: "与 CoT 关系", body: "不是替代 CoT，而是增强 CoT 的稳定性。需要更多推理预算，适合答案可验证的任务。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2203.11171" },
        { label: "PDF", href: "./downloads/03_Self-Consistency.pdf" }
      ]
    },
    {
      id: "survey_agentic_rl",
      name: "Survey: Agentic RL",
      short: "Agentic RL",
      subtitle: "The Landscape of Agentic RL for LLMs: A Survey",
      category: "关键综述",
      lane: "基础推理层（2022-2023）",
      x: 0.72,
      y: 0.15,
      score: 85,
      year: "2025",
      venue: "arXiv",
      shape: "diamond",
      tags: ["survey", "reinforcement learning", "multi-author"],
      metrics: [
        { value: "arXiv 2025", label: "发表" },
        { value: "多作者", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "survey", label: "类型" }
      ],
      blocks: [
        { title: "定位", body: "聚焦强化学习如何赋能 LLM Agent 的完整综述。覆盖策略优化、环境交互、奖励设计和测试时计算分配。" },
        { title: "关联", body: "RAP 和 Selective Reflection-Tuning 等前瞻范式的理论基础在此综述中有系统梳理。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2509.02547" },
        { label: "PDF", href: "./downloads/19_Survey_Agentic-RL.pdf" }
      ]
    },
    {
      id: "survey_agentic_llms",
      name: "Survey: Agentic LLMs",
      short: "Agentic LLMs",
      subtitle: "Agentic Large Language Models: A Survey",
      category: "关键综述",
      lane: "基础推理层（2022-2023）",
      x: 0.82,
      y: 0.15,
      score: 87,
      year: "2025",
      venue: "arXiv",
      shape: "diamond",
      tags: ["survey", "Leiden University", "methodology", "applications"],
      metrics: [
        { value: "arXiv 2025", label: "发表" },
        { value: "Aske Plaat", label: "第一作者" },
        { value: "Leiden University", label: "机构" },
        { value: "survey", label: "类型" }
      ],
      blocks: [
        { title: "定位", body: "全景式方法论综述，覆盖 Agent 架构、规划、记忆、工具使用和评测。是进入 Agent 领域的首选入口。" },
        { title: "关联", body: "ReAct、Reflexion、ToT 等核心范式在此综述中被系统分类和对比。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2503.23037" },
        { label: "PDF", href: "./downloads/20_Survey_Agentic-LLMs.pdf" }
      ]
    },
    {
      id: "survey_self_evolving",
      name: "Survey: Self-Evolving",
      short: "Self-Evolving",
      subtitle: "A Survey of Self-Evolving Agents: On Path to ASI",
      category: "关键综述",
      lane: "基础推理层（2022-2023）",
      x: 0.92,
      y: 0.15,
      score: 84,
      year: "2025",
      venue: "arXiv",
      shape: "diamond",
      tags: ["survey", "self-evolution", "artificial super intelligence"],
      metrics: [
        { value: "arXiv 2025", label: "发表" },
        { value: "Huan-ang Gao", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "survey", label: "类型" }
      ],
      blocks: [
        { title: "定位", body: "指向 AGI/ASI 的终极路径综述。覆盖自我进化、自我反思、自我适应和自我完善四大维度。" },
        { title: "关联", body: "PreFlect 和 Selective Reflection-Tuning 等前瞻范式属于此综述定义的'自我进化'范畴。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2507.21046" },
        { label: "PDF", href: "./downloads/21_Survey_Self-Evolving-Agents.pdf" }
      ]
    },
    // ===== Lane 2: Agent 核心范式层 (y=0.32) =====
    {
      id: "react",
      name: "ReAct",
      short: "ReAct",
      subtitle: "Synergizing Reasoning and Acting in Language Models",
      category: "Agent 核心范式",
      lane: "Agent 核心范式层（2023）",
      x: 0.20,
      y: 0.32,
      score: 96,
      year: "2023",
      venue: "ICLR",
      shape: "hexagon",
      tags: ["Princeton", "thought-action-observation", "tool use", "short-horizon"],
      metrics: [
        { value: "ICLR 2023", label: "发表" },
        { value: "Shunyu Yao", label: "第一作者" },
        { value: "Princeton", label: "机构" },
        { value: "T→A→O", label: "核心循环" }
      ],
      blocks: [
        { title: "核心思想", body: "思考与行动交替进行：Thought → Action → Observation → repeat。每步工具调用后，用观测结果修正下一步推理。" },
        { title: "适用", body: "通用 Agent 任务，30 步以内的短程任务。动态信息实时补全场景。" },
        { title: "局限", body: "长程任务（>50步）连贯性丧失；重复犯相同错误（无记忆沉淀）。" },
        { title: "互补范式", body: "与 Reflexion 组合解决记忆问题；与 ToT 组合解决搜索问题；与 PAL 组合解决计算问题。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2210.03629" },
        { label: "PDF", href: "./downloads/04_ReAct.pdf" }
      ]
    },
    {
      id: "plan_and_solve",
      name: "Plan-and-Solve",
      short: "PnS",
      subtitle: "Plan-and-Solve Prompting: Improving Zero-Shot CoT",
      category: "Agent 核心范式",
      lane: "Agent 核心范式层（2023）",
      x: 0.50,
      y: 0.32,
      score: 82,
      year: "2023",
      venue: "ACL",
      shape: "circle",
      tags: ["Macquarie University", "planner", "executor", "project management"],
      metrics: [
        { value: "ACL 2023", label: "发表" },
        { value: "Lei Wang", label: "第一作者" },
        { value: "Macquarie Univ", label: "机构" },
        { value: "plan→execute", label: "核心结构" }
      ],
      blocks: [
        { title: "核心思想", body: "Planner upfront 生成完整子任务序列 → Executor 逐条执行。先分解再执行，类似项目管理。" },
        { title: "适用", body: "任务分解清晰的场景，如数学证明、代码生成、多步骤数据处理。" },
        { title: "局限", body: "计划僵化，环境变化时需要重新规划。不适合动态信息补全场景。" },
        { title: "与 ReAct 对比", body: "ReAct 是'走一步看一步'，Plan-and-Solve 是'先画地图再走路'。前者灵活但短视，后者全局但僵化。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2305.04091" },
        { label: "PDF", href: "./downloads/05_Plan-and-Solve.pdf" }
      ]
    },
    {
      id: "reflexion",
      name: "Reflexion",
      short: "Reflexion",
      subtitle: "Language Agents with Verbal Reinforcement Learning",
      category: "Agent 核心范式",
      lane: "Agent 核心范式层（2023）",
      x: 0.80,
      y: 0.32,
      score: 94,
      year: "2023",
      venue: "NeurIPS",
      shape: "hexagon",
      tags: ["Northeastern", "Princeton", "self-reflection", "episodic memory", "long-term"],
      metrics: [
        { value: "NeurIPS 2023", label: "发表" },
        { value: "Noah Shinn", label: "第一作者" },
        { value: "Northeastern", label: "机构" },
        { value: "91%", label: "HumanEval pass@1" }
      ],
      blocks: [
        { title: "核心思想", body: "执行 → 评估校验 → 自我反思 → 存入经验记忆 → 重新执行优化。四层组件：Actor / Evaluator / Reflector / Memory。" },
        { title: "关键增强", body: "情景记忆（Episodic Memory）：将错误原因和修正方法结构化存入长期记忆，后续同类任务直接调取历史经验。" },
        { title: "效果", body: "在 HumanEval 上达到 91% pass@1（GPT-4 基线 80%）。延迟增加约 30%，质量提升 10-30%。" },
        { title: "与 ReAct 区别", body: "ReAct 反馈是单步即时的，Reflexion 反馈是全局事后的且跨任务复用的。ReAct 无记忆，Reflexion 有长期沉淀。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2303.11366" },
        { label: "PDF", href: "./downloads/06_Reflexion.pdf" }
      ]
    },
    // ===== Lane 3: 搜索/探索层 (y=0.50) =====
    {
      id: "tot",
      name: "Tree of Thoughts",
      short: "ToT",
      subtitle: "Deliberate Problem Solving with Large Language Models",
      category: "搜索/探索",
      lane: "搜索/探索层（2023-2024）",
      x: 0.20,
      y: 0.50,
      score: 93,
      year: "2023",
      venue: "NeurIPS",
      shape: "hexagon",
      tags: ["Princeton", "tree search", "backtracking", "multi-path", "decision"],
      metrics: [
        { value: "NeurIPS 2023", label: "发表" },
        { value: "Shunyu Yao", label: "第一作者" },
        { value: "Princeton", label: "机构" },
        { value: "BFS/DFS", label: "搜索策略" }
      ],
      blocks: [
        { title: "核心思想", body: "同时生成多条候选推理路径，评估后选择最优分支或回溯。将推理转化为搜索问题，适合高歧义、决策点后果严重的任务。" },
        { title: "与 ReAct 区别", body: "ReAct 是单线程的'走一步看一步'，ToT 是多线程的'探索多条路再选最优'。ToT 需要更多计算预算。" },
        { title: "局限", body: "搜索空间爆炸问题；评估函数设计困难；不适合实时交互场景。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2305.10601" },
        { label: "PDF", href: "./downloads/07_Tree-of-Thoughts.pdf" }
      ]
    },
    {
      id: "got",
      name: "Graph of Thoughts",
      short: "GoT",
      subtitle: "Solving Elaborate Problems with Large Language Models",
      category: "搜索/探索",
      lane: "搜索/探索层（2023-2024）",
      x: 0.50,
      y: 0.50,
      score: 89,
      year: "2024",
      venue: "AAAI",
      shape: "circle",
      tags: ["ETH Zurich", "Microsoft", "graph", "aggregation", "refinement"],
      metrics: [
        { value: "AAAI 2024", label: "发表" },
        { value: "Maciej Besta", label: "第一作者" },
        { value: "ETH Zurich", label: "机构" },
        { value: "graph ops", label: "核心能力" }
      ],
      blocks: [
        { title: "核心思想", body: "将思维节点组织为图结构，支持聚合、精炼、生成等操作。比 ToT 更灵活的拓扑结构。" },
        { title: "与 ToT 关系", body: "ToT 是树（单向分支），GoT 是图（任意连接）。GoT 允许不同推理路径的结果相互融合，适合需要综合多源信息的任务。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2308.09687" },
        { label: "PDF", href: "./downloads/08_Graph-of-Thoughts.pdf" }
      ]
    },
    {
      id: "lats",
      name: "LATS",
      short: "LATS",
      subtitle: "Language Agent Tree Search Unifies Reasoning, Acting, and Planning",
      category: "搜索/探索",
      lane: "搜索/探索层（2023-2024）",
      x: 0.80,
      y: 0.50,
      score: 87,
      year: "2023",
      venue: "arXiv",
      shape: "circle",
      tags: ["UIUC", "MCTS", "reflection", "unified"],
      metrics: [
        { value: "arXiv 2023", label: "发表" },
        { value: "Andy Zhou", label: "第一作者" },
        { value: "UIUC", label: "机构" },
        { value: "MCTS", label: "搜索算法" }
      ],
      blocks: [
        { title: "核心思想", body: "结合蒙特卡洛树搜索（MCTS）与 Reflection，统一推理、行动和规划。在搜索节点中嵌入 ReAct 式的思考-行动循环。" },
        { title: "定位", body: "ToT 的增强版，引入 MCTS 的置信度评估机制，比纯 BFS/DFS 更高效的探索策略。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2310.04406" },
        { label: "PDF", href: "./downloads/09_LATS.pdf" }
      ]
    },
    // ===== Lane 4: 反思/修正层 (y=0.68) =====
    {
      id: "self_refine",
      name: "Self-Refine",
      short: "Self-Refine",
      subtitle: "Iterative Refinement with Self-Feedback",
      category: "反思/修正",
      lane: "反思/修正层（2023-2024）",
      x: 0.20,
      y: 0.68,
      score: 90,
      year: "2023",
      venue: "NeurIPS",
      shape: "hexagon",
      tags: ["CMU", "Allen Institute", "self-feedback", "iteration", "no external"],
      metrics: [
        { value: "NeurIPS 2023", label: "发表" },
        { value: "Aman Madaan", label: "第一作者" },
        { value: "CMU / AI2", label: "机构" },
        { value: "generate→critique", label: "核心循环" }
      ],
      blocks: [
        { title: "核心思想", body: "迭代式自我修正：生成 → 批判 → 修正，无需外部监督。与 Reflexion 的区别：无长期记忆沉淀，单次任务内循环。" },
        { title: "适用", body: "代码优化、文本润色、创意生成等需要反复打磨的任务。" },
        { title: "与 Reflexion 区别", body: "Self-Refine 是'单次任务内的反复打磨'，Reflexion 是'跨任务的经验积累'。前者无记忆，后者有记忆。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2303.17651" },
        { label: "PDF", href: "./downloads/10_Self-Refine.pdf" }
      ]
    },
    {
      id: "critic",
      name: "CRITIC",
      short: "CRITIC",
      subtitle: "LLMs Can Self-Correct with Tool-Interactive Critiquing",
      category: "反思/修正",
      lane: "反思/修正层（2023-2024）",
      x: 0.50,
      y: 0.68,
      score: 91,
      year: "2024",
      venue: "ICLR",
      shape: "hexagon",
      tags: ["Microsoft Research", "tool verification", "search engine", "calculator", "+20%"],
      metrics: [
        { value: "ICLR 2024", label: "发表" },
        { value: "Zhibin Gou", label: "第一作者" },
        { value: "Microsoft", label: "机构" },
        { value: "+20%", label: "修正准确率" }
      ],
      blocks: [
        { title: "核心思想", body: "引入外部验证工具（搜索引擎、计算器、代码执行器）来验证和修正输出。Self-Correction 准确率提升 20%。" },
        { title: "与 Self-Refine 区别", body: "Self-Refine 是'纯内部批判'，CRITIC 是'工具辅助验证'。前者依赖模型自我认知，后者引入外部事实锚点。" },
        { title: "适用", body: "事实核查、数学计算、代码调试、需要外部知识验证的场景。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2305.11738" },
        { label: "PDF", href: "./downloads/11_CRITIC.pdf" }
      ]
    },
    {
      id: "cove",
      name: "CoVe",
      short: "CoVe",
      subtitle: "Chain-of-Verification Reduces Hallucination",
      category: "反思/修正",
      lane: "反思/修正层（2023-2024）",
      x: 0.80,
      y: 0.68,
      score: 86,
      year: "2024",
      venue: "ACL Findings",
      shape: "circle",
      tags: ["Meta AI", "hallucination", "fact verification", "draft→verify→correct"],
      metrics: [
        { value: "ACL Findings 2024", label: "发表" },
        { value: "Shehzaad Dhuliawala", label: "第一作者" },
        { value: "Meta AI", label: "机构" },
        { value: "hallucination↓", label: "核心目标" }
      ],
      blocks: [
        { title: "核心思想", body: "通过链式验证减少幻觉：先生成草稿，再验证每个事实，最后修正。将事实验证分解为多个子步骤。" },
        { title: "与 CRITIC 区别", body: "CRITIC 是'通用工具验证'，CoVe 是'专门的事实链验证'。CoVe 更聚焦于幻觉问题，CRITIC 覆盖更广。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2309.11495" },
        { label: "PDF", href: "./downloads/12_CoVe_Chain-of-Verification.pdf" }
      ]
    },
    // ===== Lane 5: 工具/前瞻层 (y=0.86) =====
    {
      id: "pal",
      name: "PAL",
      short: "PAL",
      subtitle: "Program-aided Language Models",
      category: "工具集成",
      lane: "工具/前瞻层（2023-2026）",
      x: 0.12,
      y: 0.86,
      score: 89,
      year: "2023",
      venue: "ICML",
      shape: "hexagon",
      tags: ["CMU", "Python", "code execution", "computation", "disentangle"],
      metrics: [
        { value: "ICML 2023", label: "发表" },
        { value: "Luyu Gao", label: "第一作者" },
        { value: "CMU", label: "机构" },
        { value: "code+NL", label: "核心模式" }
      ],
      blocks: [
        { title: "核心思想", body: "将自然语言推理与 Python 代码执行环境紧密耦合，用代码解决计算密集型子任务。LLM 负责意图理解，Python 负责精确计算。" },
        { title: "与 CoT 关系", body: "CoT 的'思考'只能做粗略估算，PAL 的'代码'可以做精确计算。两者互补：CoT 理解问题，PAL 执行计算。" },
        { title: "适用", body: "数学推理、数据分析、结构化查询、任何需要精确计算的任务。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2211.10435" },
        { label: "PDF", href: "./downloads/13_PAL_Program-aided.pdf" }
      ]
    },
    {
      id: "tora",
      name: "ToRA",
      short: "ToRA",
      subtitle: "Tool-Integrated Reasoning Agent for Math",
      category: "工具集成",
      lane: "工具/前瞻层（2023-2026）",
      x: 0.32,
      y: 0.86,
      score: 88,
      year: "2024",
      venue: "ICLR",
      shape: "circle",
      tags: ["Microsoft Research", "mathematical", "calculator", "Python interpreter"],
      metrics: [
        { value: "ICLR 2024", label: "发表" },
        { value: "Zhibin Gou", label: "第一作者" },
        { value: "Microsoft", label: "机构" },
        { value: "math solver", label: "核心目标" }
      ],
      blocks: [
        { title: "核心思想", body: "工具集成推理 Agent，专门用于数学问题求解，结合外部工具（如计算器、Python 解释器）。在 PAL 基础上增加了工具调用的灵活性。" },
        { title: "与 PAL 关系", body: "PAL 是'固定生成 Python 代码'，ToRA 是'动态调用多种工具'。ToRA 更像 ReAct 的工具使用模式，但聚焦数学领域。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2309.17452" },
        { label: "PDF", href: "./downloads/14_ToRA.pdf" }
      ]
    },
    {
      id: "pot",
      name: "PoT",
      short: "PoT",
      subtitle: "Program of Thoughts Prompting: Disentangling Computation from Reasoning",
      category: "工具集成",
      lane: "工具/前瞻层（2023-2026）",
      x: 0.52,
      y: 0.86,
      score: 85,
      year: "2023",
      venue: "TMLR",
      shape: "circle",
      tags: ["Waterloo", "Google", "computation", "reasoning", "disentangle"],
      metrics: [
        { value: "TMLR 2023", label: "发表" },
        { value: "Wenhu Chen", label: "第一作者" },
        { value: "Waterloo", label: "机构" },
        { value: "separation", label: "核心策略" }
      ],
      blocks: [
        { title: "核心思想", body: "将计算与推理分离：用程序表示计算过程，用自然语言表示推理过程。两者各司其职，互不干扰。" },
        { title: "与 PAL 关系", body: "PAL 和 PoT 目标一致（NL+Code 混合），但 PoT 更强调'分离'的架构设计，PAL 更强调'耦合'的执行效率。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2211.12588" },
        { label: "PDF", href: "./downloads/15_PoT_Program-of-Thoughts.pdf" }
      ]
    },
    {
      id: "preflect",
      name: "PreFlect",
      short: "PreFlect",
      subtitle: "From Retrospective to Prospective Reflection",
      category: "新兴前瞻",
      lane: "工具/前瞻层（2023-2026）",
      x: 0.72,
      y: 0.86,
      score: 83,
      year: "2026",
      venue: "arXiv",
      shape: "diamond",
      tags: ["prospective", "pre-execution", "error prevention", "planning"],
      metrics: [
        { value: "arXiv 2026", label: "发表" },
        { value: "Hanyu Wang", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "prevention", label: "核心策略" }
      ],
      blocks: [
        { title: "核心思想", body: "从'事后反思'转向'事前预防'，在执行前进行前瞻性反思，预防性规避错误。不是修正错误，而是避免犯错。" },
        { title: "与 Reflexion 区别", body: "Reflexion 是'犯了错再改'，PreFlect 是'还没做就预判哪里会错'。这是从反应式到预测式的范式跃迁。" },
        { title: "前景", body: "2026 年前沿方向，可能改变 Agent 的错误处理范式。与 Plan-and-Solve 组合可以生成更稳健的执行计划。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2602.07187" },
        { label: "PDF", href: "./downloads/16_PreFlect.pdf" }
      ]
    },
    {
      id: "srt",
      name: "Selective Reflection-Tuning",
      short: "SRT",
      subtitle: "Student-Selected Data Recycling Improves LLM Instruction-Tuning",
      category: "新兴前瞻",
      lane: "工具/前瞻层（2023-2026）",
      x: 0.82,
      y: 0.86,
      score: 81,
      year: "2024",
      venue: "arXiv",
      shape: "circle",
      tags: ["instruction tuning", "data recycling", "reflection", "student-selected"],
      metrics: [
        { value: "arXiv 2024", label: "发表" },
        { value: "Yuhan Liu", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "data-centric", label: "核心策略" }
      ],
      blocks: [
        { title: "核心思想", body: "学生选择的数据回收机制：让模型自己判断哪些训练数据值得保留，提升 LLM 指令微调效果。将反思机制引入训练数据筛选。" },
        { title: "定位", body: "不是推理时的范式，而是训练时的范式。属于'推理范式的训练侧增强'。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2402.10110" },
        { label: "PDF", href: "./downloads/17_Selective-Reflection-Tuning.pdf" }
      ]
    },
    {
      id: "rap",
      name: "RAP",
      short: "RAP",
      subtitle: "Reinforced Adaptive Planning for Language Model Agents",
      category: "新兴前瞻",
      lane: "工具/前瞻层（2023-2026）",
      x: 0.92,
      y: 0.86,
      score: 82,
      year: "2024",
      venue: "arXiv",
      shape: "circle",
      tags: ["reinforcement learning", "adaptive planning", "reward model", "test-time search"],
      metrics: [
        { value: "arXiv 2024", label: "发表" },
        { value: "多团队", label: "第一作者" },
        { value: "多机构", label: "机构" },
        { value: "RL+planning", label: "核心模式" }
      ],
      blocks: [
        { title: "核心思想", body: "强化自适应规划：结合奖励模型进行推理时搜索。在规划阶段引入 RL 的评估信号，动态调整推理策略。" },
        { title: "与 ToT 关系", body: "ToT 使用启发式评估（如 GPT-4 自我评分），RAP 使用训练好的奖励模型进行更系统的评估。RAP 是 ToT 的 RL 增强版。" },
        { title: "定位", body: "2024 年 RL 与推理结合的早期探索，为 2025-2026 的 Agentic RL 爆发奠定了范式基础。" }
      ],
      links: [
        { label: "arXiv", href: "https://arxiv.org/abs/2403.04689" },
        { label: "PDF", href: "./downloads/18_RAP_Reinforced-Adaptive-Planning.pdf" }
      ]
    }
  ]
};
