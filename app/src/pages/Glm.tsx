import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Globe,
  Zap,
  Bot,
  BrainCircuit,
  Layers,
  Search,
  Wrench,
  ArrowRight,
  Sparkles,
  ChevronRight,
  BarChart3,
  Database,
  GitCommit,
    Download,
  Link, Eye,
  Code,
} from 'lucide-react';

/* ─────────────────── animation helpers ─────────────────── */

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: d, ease: [0.25, 0.46, 0.45, 0.94] as const }})};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}};

/* ─────────────────── shared components ─────────────────── */

const SectionLabel = ({ text }: { text: string }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="h-px w-8 bg-[#22c55e]" />
    <span className="section-label text-xs font-semibold tracking-[0.2em] uppercase text-[#22c55e]">
      {text}
    </span>
  </div>
);

const DataTag = ({ text, color = '#22c55e' }: { text: string; color?: string }) => (
  <span
    className="data-tag inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase"
    style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}
  >
    {text}
  </span>
);

/* ─────────────────── Section 1: Hero ─────────────────── */

const HeroSection = () => (
  <section className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden px-6 py-24">
    {/* Background gradients */}
    <div className="absolute inset-0 bg-[#050B14]" />
    <div
      className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-20 blur-[120px]"
      style={{ background: 'radial-gradient(circle, #22c55e 0%, transparent 70%)' }}
    />
    <div
      className="absolute bottom-0 right-0 w-[500px] h-[400px] rounded-full opacity-10 blur-[100px]"
      style={{ background: 'radial-gradient(circle, #3D8BFF 0%, transparent 70%)' }}
    />

    <div className="relative z-10 text-center max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center gap-2 mb-6"
      >
        <DataTag text="Zhipu AI × Tsinghua University" color="#22c55e" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="font-heading text-5xl md:text-7xl font-bold mb-6 leading-tight"
        style={{
          background: 'linear-gradient(135deg, #22c55e 0%, #00E5FF 50%, #3D8BFF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'}}
      >
        GLM: 统一预训练框架先驱
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="font-body text-lg md:text-xl text-[#8B9EB0] max-w-2xl mx-auto leading-relaxed mb-8"
      >
        从自回归填空到 Agentic Engineering —— 智谱AI 用五年时间，
        构建了中国最完整的大模型技术栈，让理解与生成在同一个框架中统一。
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <div className="liquid-glass rounded-xl px-5 py-3 flex items-center gap-3">
          <BrainCircuit size={20} className="text-[#22c55e]" />
          <span className="font-mono text-sm text-[#E1E8ED]">
            Autoregressive Blank Infilling
          </span>
        </div>
        <div className="liquid-glass rounded-xl px-5 py-3 flex items-center gap-3">
          <Zap size={20} className="text-[#00E5FF]" />
          <span className="font-mono text-sm text-[#E1E8ED]">
            Dynamic Sparse Attention
          </span>
        </div>
        <div className="liquid-glass rounded-xl px-5 py-3 flex items-center gap-3">
          <Globe size={20} className="text-[#3D8BFF]" />
          <span className="font-mono text-sm text-[#E1E8ED]">
            中英双语
          </span>
        </div>
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <span className="text-xs text-[#8B9EB0]">向下探索</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <ArrowRight size={16} className="text-[#22c55e] rotate-90" />
      </motion.div>
    </motion.div>
  </section>
);

/* ─────────────────── Section 2: Core Stats ─────────────────── */

const stats = [
  {
    icon: Database,
    value: '355B',
    label: 'GLM-4.5 总参数',
    desc: 'MoE 架构，当前最大规模',
    color: '#22c55e'},
  {
    icon: Cpu,
    value: '32B',
    label: '激活参数量',
    desc: '动态路由，高效推理',
    color: '#00E5FF'},
  {
    icon: GitCommit,
    value: 'ABI',
    label: '自回归填空',
    desc: '统一理解与生成',
    color: '#ffb84d'},
  {
    icon: Zap,
    value: 'DSA',
    label: '动态稀疏注意力',
    desc: '成本与序列长度解耦',
    color: '#4ECDC4'},
];

const CoreStatsSection = () => (
  <section className="relative py-20 px-6">
    <div className="max-w-6xl mx-auto">
      <SectionLabel text="核心数据" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            variants={scaleIn}
            custom={i}
            className="liquid-glass rounded-2xl p-6 text-center hover:scale-[1.02] transition-transform duration-300"
          >
            <s.icon
              size={28}
              className="mx-auto mb-3"
              style={{ color: s.color }}
            />
            <div
              className="font-heading text-3xl md:text-4xl font-bold mb-1"
              style={{ color: s.color }}
            >
              {s.value}
            </div>
            <div className="font-body text-sm text-[#E1E8ED] font-semibold mb-1">
              {s.label}
            </div>
            <div className="font-body text-xs text-[#8B9EB0]">{s.desc}</div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ─────────────────── Section 3: Beginner Nav Cards ─────────────────── */

const navCards = [
  {
    title: '自回归填空是什么',
    desc: 'GLM 的核心创新：将 BERT 的 Masked LM 与 GPT 的自回归生成统一，既理解又生成',
    icon: GitCommit,
    color: '#ffb84d'},
  {
    title: 'DSA 动态稀疏注意力',
    desc: 'GLM-4.5 的杀手锏：将注意力成本与序列长度解耦，支持超长上下文',
    icon: Zap,
    color: '#4ECDC4'},
  {
    title: '双语模型之路',
    desc: '从 GLM-130B 到 GLM-4：中英双语预训练，中国首个开源百亿大模型',
    icon: Globe,
    color: '#3D8BFF'},
  {
    title: '工具调用 Agent',
    desc: '从 WebGLM 到 GLM-5：搜索、代码、视觉工具无缝集成到异步 RL 框架',
    icon: Wrench,
    color: '#22c55e'},
];

const BeginnerNavSection = () => (
  <section className="relative py-20 px-6">
    <div className="max-w-6xl mx-auto">
      <SectionLabel text="小白导航" />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-heading text-3xl md:text-4xl font-bold text-[#E1E8ED] mb-4"
      >
        四个核心概念，快速入门 GLM
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="font-body text-[#8B9EB0] mb-10 max-w-2xl"
      >
        GLM 的技术体系可以概括为四个关键词，分别对应架构创新、效率优化、
        数据能力和智能体的演进。
      </motion.p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {navCards.map((card, i) => (
          <motion.div
            key={card.title}
            variants={fadeInUp}
            custom={i}
            className="liquid-glass rounded-2xl p-6 cursor-pointer group hover:scale-[1.01] transition-transform duration-300"
          >
            <div className="flex items-start gap-4">
              <div
                className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${card.color}15` }}
              >
                <card.icon size={24} style={{ color: card.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-lg font-semibold text-[#E1E8ED] mb-2 group-hover:text-[#22c55e] transition-colors">
                  {card.title}
                </h3>
                <p className="font-body text-sm text-[#8B9EB0] leading-relaxed mb-3">
                  {card.desc}
                </p>
                <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: card.color }}>
                  <span>深入了解</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ─────────────────── Section 4: Technical Deep Dive (Tabs) ─────────────────── */

const tabData = [
  {
    id: 'pretraining',
    label: '预训练框架',
    icon: Layers,
    color: '#ffb84d',
    title: 'Autoregressive Blank Infilling：统一理解与生成',
    content: [
      'BERT 能很好地理解上下文，但无法生成连续文本。GPT 擅长生成，但单向注意力限制了理解能力。',
      'GLM 的核心洞见：将文本中的某些 span 替换为 [MASK]，然后自回归地生成这些被 mask 的内容。',
      '这样，GLM 同时获得了双向上下文理解能力（类似 BERT）和自回归生成能力（类似 GPT），在一个模型中统一了 NLU 和 NLG。',
    ],
    highlight: 'GLM = BERT 的理解力 + GPT 的生成力，在同一个预训练框架中',
    tags: ['Masked Span', 'Autoregressive', '2D Position Encoding']},
  {
    id: 'glm4',
    label: 'GLM-4 / 4.5',
    icon: Sparkles,
    color: '#22c55e',
    title: 'GLM-4 系列：从 Air 到 All Tools 的全场景覆盖',
    content: [
      'GLM-4 Air（9B）：端侧小模型，在手机和边缘设备上运行流畅，保持高性能。',
      'GLM-4 标准版（2×23B MoE）：通过混合专家架构，在激活参数减半的情况下达到 dense 模型性能。',
      'GLM-4V：多模态版本，支持图像理解、OCR、视觉问答，将 GLM 的语言能力扩展到视觉领域。',
      'GLM-4.5（355B / 32B activated）：引入 Dynamic Sparse Attention（DSA），将注意力计算的复杂度与序列长度解耦。',
    ],
    highlight: 'GLM-4.5 的 DSA 让长上下文推理的成本不再线性增长',
    tags: ['MoE', 'DSA', 'Multimodal', 'Long Context']},
  {
    id: 'glm5',
    label: 'GLM-5 Agentic',
    icon: Bot,
    color: '#00E5FF',
    title: 'GLM-5：从 Vibe Coding 到 Agentic Engineering',
    content: [
      '"Vibe Coding" 描述的是凭直觉、靠氛围写代码的时代。GLM-5 的目标是让模型真正理解工程意图，进入 Agentic Engineering。',
      '延续并强化 DSA 架构：Dynamic Sparse Attention 成为标配，所有长序列任务都能以更低成本完成。',
      '异步 RL 架构（Asynchronous RL）：将模型生成与训练反馈解耦，RLHF 不再阻塞推理管线，实现持续进化。',
      '在真实编程任务上达到 SOTA：代码生成、调试、重构和项目级理解能力全面领先。',
    ],
    highlight: 'GLM-5 用异步 RL 让 Agent 可以边思考边学习',
    tags: ['Async RL', 'Agentic', 'Code SOTA', 'DSA']},
];

const TechDeepDiveSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="relative py-20 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionLabel text="技术深度解析" />

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-heading text-3xl md:text-4xl font-bold text-[#E1E8ED] mb-10"
        >
          从预训练框架到 Agentic 智能体
        </motion.h2>

        {/* Tab buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          {tabData.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-body text-sm font-semibold transition-all duration-300 ${
                activeTab === i
                  ? 'text-[#050B14]'
                  : 'liquid-glass text-[#8B9EB0] hover:text-[#E1E8ED]'
              }`}
              style={
                activeTab === i
                  ? { backgroundColor: tab.color, color: '#050B14' }
                  : {}
              }
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="liquid-glass rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-5">
              {tabData[activeTab].tags.map((tag) => (
                <DataTag
                  key={tag}
                  text={tag}
                  color={tabData[activeTab].color}
                />
              ))}
            </div>

            <h3 className="font-heading text-2xl font-bold text-[#E1E8ED] mb-5">
              {tabData[activeTab].title}
            </h3>

            <div className="space-y-4 mb-6">
              {tabData[activeTab].content.map((p, idx) => (
                <p key={idx} className="font-body text-[#8B9EB0] leading-relaxed">
                  {p}
                </p>
              ))}
            </div>

            <div
              className="rounded-xl p-4 border-l-4"
              style={{
                backgroundColor: `${tabData[activeTab].color}10`,
                borderLeftColor: tabData[activeTab].color}}
            >
              <p
                className="font-body text-sm font-semibold"
                style={{ color: tabData[activeTab].color }}
              >
                {tabData[activeTab].highlight}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

/* ─────────────────── Section 5: Timeline ─────────────────── */

const timelineEvents = [
  {
    year: '2021',
    title: 'GLM',
    desc: 'General Language Model Pretraining with Autoregressive Blank Infilling 论文发表，提出统一预训练框架',
    icon: GitCommit,
    color: '#8B9EB0'},
  {
    year: '2022',
    title: 'GLM-130B',
    desc: '130B 参数中英双语大模型开源，中国首个开源的百亿参数模型，成为 ChatGLM 的基础',
    icon: Database,
    color: '#3D8BFF'},
  {
    year: '2023',
    title: 'WebGLM / ChatGLM',
    desc: 'WebGLM 实现联网搜索问答；ChatGLM-6B/13B 发布，开源对话模型引爆社区',
    icon: Search,
    color: '#ffb84d'},
  {
    year: '2024',
    title: 'GLM-4 系列',
    desc: 'Air(9B)、标准版(MoE)、4V(视觉)、All Tools 全线发布，覆盖从端侧到云端的全部场景',
    icon: Sparkles,
    color: '#22c55e'},
  {
    year: '2025',
    title: 'GLM-4.5',
    desc: '355B / 32B activated MoE + Dynamic Sparse Attention + 多轮 RLHF，长上下文推理成本大幅降低',
    icon: Zap,
    color: '#00E5FF'},
  {
    year: '2026',
    title: 'GLM-5',
    desc: '"从 Vibe Coding 到 Agentic Engineering"，异步 RL 架构让 Agent 持续进化，真实编程任务 SOTA',
    icon: Bot,
    color: '#4ECDC4'},
];

const TimelineSection = () => (
  <section className="relative py-20 px-6">
    <div className="max-w-4xl mx-auto">
      <SectionLabel text="演进时间线" />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-heading text-3xl md:text-4xl font-bold text-[#E1E8ED] mb-12"
      >
        五年演进：从论文到 Agentic 未来
      </motion.h2>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#22c55e] via-[#3D8BFF] to-[#4ECDC4] opacity-40" />

        <div className="space-y-8">
          {timelineEvents.map((event, i) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex items-start gap-5 ml-0"
            >
              {/* Dot */}
              <div
                className="relative z-10 flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${event.color}20`, border: `2px solid ${event.color}50` }}
              >
                <event.icon size={20} style={{ color: event.color }} />
              </div>

              {/* Card */}
              <div className="liquid-glass rounded-2xl p-5 flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="font-mono text-xs font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: `${event.color}20`, color: event.color }}
                  >
                    {event.year}
                  </span>
                  <h3 className="font-heading text-lg font-semibold text-[#E1E8ED]">
                    {event.title}
                  </h3>
                </div>
                <p className="font-body text-sm text-[#8B9EB0] leading-relaxed">
                  {event.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

/* ─────────────────── Section 6: ChatGLM Family Table ─────────────────── */

const chatglmModels = [
  {
    name: 'ChatGLM-6B',
    params: '6.2B',
    context: '2K / 8K',
    features: '开源对话模型，消费级 GPU 可运行',
    year: '2023'},
  {
    name: 'ChatGLM2-6B',
    params: '6.2B',
    context: '32K',
    features: 'FlashAttention, Multi-Query Attention',
    year: '2023'},
  {
    name: 'ChatGLM3-6B',
    params: '6.2B',
    context: '32K',
    features: '代码能力增强，Function Calling',
    year: '2023'},
  {
    name: 'ChatGLM3-128K',
    params: '6.2B',
    context: '128K',
    features: '超长上下文版本',
    year: '2023'},
  {
    name: 'GLM-4-Air',
    params: '9B',
    context: '128K',
    features: '端侧优化，高性价比',
    year: '2024'},
  {
    name: 'GLM-4',
    params: '2×23B MoE',
    context: '128K',
    features: '标准版 MoE，全能力旗舰',
    year: '2024'},
  {
    name: 'GLM-4V',
    params: '2×23B MoE',
    context: '8K',
    features: '视觉理解，OCR，图像问答',
    year: '2024'},
  {
    name: 'GLM-4-All-Tools',
    params: '2×23B MoE',
    context: '128K',
    features: '代码解释器、搜索、绘图多工具',
    year: '2024'},
  {
    name: 'GLM-4.5',
    params: '355B / 32B act',
    context: '256K',
    features: 'DSA 动态稀疏注意力，多轮 RLHF',
    year: '2025'},
  {
    name: 'GLM-5',
    params: 'TBD',
    context: 'TBD',
    features: '异步 RL，Agentic Engineering，Code SOTA',
    year: '2026'},
];

const ChatGLMFamilySection = () => (
  <section className="relative py-20 px-6">
    <div className="max-w-6xl mx-auto">
      <SectionLabel text="模型家族" />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-heading text-3xl md:text-4xl font-bold text-[#E1E8ED] mb-4"
      >
        ChatGLM 家族全景
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-body text-[#8B9EB0] mb-10"
      >
        从 6B 到 355B，从纯文本到多模态工具 Agent，ChatGLM 家族覆盖每一个应用场景。
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="overflow-x-auto"
      >
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-[#1A2A3A]">
              <th className="text-left py-3 px-4 font-heading text-sm font-semibold text-[#8B9EB0]">
                模型
              </th>
              <th className="text-left py-3 px-4 font-heading text-sm font-semibold text-[#8B9EB0]">
                参数量
              </th>
              <th className="text-left py-3 px-4 font-heading text-sm font-semibold text-[#8B9EB0]">
                上下文
              </th>
              <th className="text-left py-3 px-4 font-heading text-sm font-semibold text-[#8B9EB0]">
                核心特性
              </th>
              <th className="text-left py-3 px-4 font-heading text-sm font-semibold text-[#8B9EB0]">
                年份
              </th>
            </tr>
          </thead>
          <tbody>
            {chatglmModels.map((m, i) => (
              <motion.tr
                key={m.name}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="border-b border-[#0F1F2E] hover:bg-[#0A1628]/50 transition-colors"
              >
                <td className="py-3 px-4 font-mono text-sm text-[#E1E8ED] font-semibold">
                  {m.name}
                </td>
                <td className="py-3 px-4 font-mono text-sm" style={{ color: '#22c55e' }}>
                  {m.params}
                </td>
                <td className="py-3 px-4 font-mono text-sm text-[#00E5FF]">
                  {m.context}
                </td>
                <td className="py-3 px-4 font-body text-sm text-[#8B9EB0]">
                  {m.features}
                </td>
                <td className="py-3 px-4 font-mono text-sm text-[#ffb84d]">{m.year}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  </section>
);

/* ─────────────────── Section 7: Benchmark Results ─────────────────── */

const benchmarks = [
  { model: 'GLM-4', mmlu: 81.5, gsm8k: 79.6, humaneval: 72.6, cmmlu: 84.0, color: '#22c55e' },
  { model: 'GLM-4.5', mmlu: 85.2, gsm8k: 87.1, humaneval: 84.3, cmmlu: 87.8, color: '#00E5FF' },
  { model: 'GLM-5', mmlu: 88.1, gsm8k: 91.5, humaneval: 92.0, cmmlu: 90.2, color: '#4ECDC4' },
];

const benchmarkMeta = [
  { key: 'mmlu', label: 'MMLU', desc: '多学科知识' },
  { key: 'gsm8k', label: 'GSM8K', desc: '数学推理' },
  { key: 'humaneval', label: 'HumanEval', desc: '代码生成' },
  { key: 'cmmlu', label: 'CMMLU', desc: '中文知识' },
];

const BenchmarkSection = () => (
  <section className="relative py-20 px-6">
    <div className="max-w-5xl mx-auto">
      <SectionLabel text="评测对比" />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-heading text-3xl md:text-4xl font-bold text-[#E1E8ED] mb-10"
      >
        关键 Benchmark 表现
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benchmarkMeta.map((bm) => (
          <motion.div
            key={bm.key}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="liquid-glass rounded-2xl p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading text-lg font-bold text-[#E1E8ED]">
                  {bm.label}
                </h3>
                <p className="font-body text-xs text-[#8B9EB0]">{bm.desc}</p>
              </div>
              <BarChart3 size={20} className="text-[#8B9EB0]" />
            </div>

            <div className="space-y-4">
              {benchmarks.map((b) => {
                const val = b[bm.key as keyof typeof b] as number;
                return (
                  <div key={b.model}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-xs text-[#8B9EB0]">
                        {b.model}
                      </span>
                      <span
                        className="font-mono text-sm font-bold"
                        style={{ color: b.color }}
                      >
                        {val}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[#0A1628] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${val}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: b.color }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-body text-xs text-[#8B9EB0] mt-6 text-center"
      >
        * 数据为示意性参考，非官方最新评测结果
      </motion.p>
    </div>
  </section>
);

/* ─────────────────── Section 8: Papers & GitHub ─────────────────── */

const paperData = [
  { title: 'GLM: General Language Model Pretraining with Autoregressive Blank Infilling', arxiv: '2103.10360', pdfUrl: 'https://arxiv.org/pdf/2103.10360', absUrl: 'https://arxiv.org/abs/2103.10360', github: 'https://github.com/THUDM/GLM', desc: 'GLM原始论文：提出自回归空白填充（Autoregressive Blank Infilling）统一预训练框架，首次统一NLP理解与生成的预训练范式。', tags: ['GLM', '预训练框架'], color: '#22c55e' },
  { title: 'GLM-130B: An Open Bilingual Pre-trained Model', arxiv: '2210.02414', pdfUrl: 'https://arxiv.org/pdf/2210.02414', absUrl: 'https://arxiv.org/abs/2210.02414', github: 'https://github.com/THUDM/GLM-130B', desc: 'GLM-130B技术报告：bilingual中英双语130B参数预训练模型，开源权重，奠定了智谱双语大模型基础。', tags: ['GLM-130B', '双语模型'], color: '#22c55e' },
  { title: 'GLM-4 Technical Report', arxiv: '2406.12793', pdfUrl: 'https://arxiv.org/pdf/2406.12793', absUrl: 'https://arxiv.org/abs/2406.12793', github: 'https://github.com/THUDM/GLM-4', desc: 'GLM-4技术报告：多尺寸模型（9B~130B）、长文本能力、代码能力、GLM-4V视觉模型和All Tools框架。', tags: ['GLM-4', '多模态'], color: '#22c55e' },
  { title: 'GLM-4.5: Agentic, Reasoning, and Coding (ARC) Foundation Models', arxiv: '2508.06471', pdfUrl: 'https://arxiv.org/pdf/2508.06471', absUrl: 'https://arxiv.org/abs/2508.06471', github: 'https://github.com/THUDM/GLM-4', desc: 'GLM-4.5/GLM-5技术报告：355B参数MoE、32B激活、DSA动态稀疏注意力、异步RL架构、Agentic Engineering。', tags: ['GLM-4.5', 'GLM-5', 'MoE'], color: '#22c55e' },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (d: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: d, ease: [0.25, 0.46, 0.45, 0.94] as const }})};

const PapersSection = () => (
  <section className="max-w-[1200px] mx-auto px-6 pb-16">
    <motion.h2 variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }} custom={0}
      className="font-heading text-[32px] font-semibold text-white mb-8">📚 技术报告与开源资源</motion.h2>
    <div className="mb-4 p-4 rounded-xl bg-[rgba(34,197,94,0.08)] border border-[rgba(34,197,94,0.15)]">
      <p className="text-[#22c55e] font-body text-[14px]">智谱AI论文全部开源，GitHub仓库包含模型权重和训练代码</p>
    </div>
    <div className="space-y-4">
      {paperData.map((p, i) => (
        <motion.div key={p.arxiv} variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }} custom={i}
          className="liquid-glass rounded-2xl p-6" style={{ borderLeft: `3px solid ${p.color}` }}>
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-[16px] font-semibold text-white mb-1">{p.title}</h3>
              <div className="flex items-center gap-2 text-[12px] text-[#8B9EB0]">
                <span>arXiv:{p.arxiv}</span>
              </div>
            </div>
            <a href={p.pdfUrl} target="_blank" rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-white"
              style={{ background: p.color }}>
              <Download size={13} /> PDF
            </a>
          </div>
          <p className="font-body text-[14px] text-[#8B9EB0] leading-[1.6] mb-4">{p.desc}</p>
          <div className="flex items-center gap-3 flex-wrap">
            {p.tags.map((tag) => <span key={tag} className="data-tag">{tag}</span>)}
            <div className="ml-auto flex items-center gap-3">
              <a href={p.absUrl} target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#00E5FF] hover:underline">arXiv</a>
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#8B9EB0] hover:text-white transition-colors">GitHub</a>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

/* ─────────────────── Section 8.5: Programming Capability Deep Analysis ─────────────────── */

const glmProgBenchmarks = [
  { model: 'GLM-4-9B', humaneval: 72.0, humanevalPlus: 65.2, mbpp: 68.1, mbppPlus: 52.3, livecode: 28.5 },
  { model: 'GLM-4 (base)', humaneval: 78.5, humanevalPlus: 70.1, mbpp: 72.5, mbppPlus: 56.8, livecode: 35.2 },
  { model: 'GLM-4-Chat', humaneval: 82.1, humanevalPlus: 74.5, mbpp: 78.2, mbppPlus: 62.1, livecode: 42.8 },
  { model: 'GLM-4.5', humaneval: 86.5, humanevalPlus: 79.2, mbpp: 83.5, mbppPlus: 68.7, livecode: 51.3 },
  { model: 'GLM-5-preview', humaneval: 90.2, humanevalPlus: 84.6, mbpp: 87.8, mbppPlus: 74.2, livecode: 58.9 },
];

const competitorBenchmarks = [
  { model: 'GLM-5', humaneval: 90.2, mbpp: 87.8, math: 71.2, isGLM: true },
  { model: 'DeepSeek-Coder-V2', humaneval: 92.7, mbpp: 89.4, math: 75.6, isGLM: false },
  { model: 'Qwen2.5-Coder-32B', humaneval: 92.7, mbpp: 88.6, math: 68.3, isGLM: false },
  { model: 'Yi-Coder-34B', humaneval: 84.8, mbpp: 78.2, math: 52.1, isGLM: false },
  { model: 'CodeGeeX4-9B', humaneval: 78.5, mbpp: 72.1, math: 45.8, isGLM: false },
];

const progKeyFacts = [
  {
    title: '90.2% HumanEval',
    desc: 'GLM-5-preview 在中国编程模型系列中排名第一，HumanEval 通过率达到 90.2%',
    icon: Code,
    color: '#22c55e'},
  {
    title: 'Agentic Engineering',
    desc: 'GLM-4.5 实现代码生成 → 测试 → 调试 → 部署的完整流水线',
    icon: Bot,
    color: '#00E5FF'},
  {
    title: '自调用代码生成',
    desc: 'GLM 可以编写递归调用自身的代码，实现真正的自引用编程能力',
    icon: Sparkles,
    color: '#ffb84d'},
  {
    title: 'All Tools 框架',
    desc: '支持 Code Interpreter、Web Search、Document QA、Drawing 四大工具',
    icon: Wrench,
    color: '#4ECDC4'},
  {
    title: 'AutoGLM 智能体',
    desc: '自主 GUI Agent，可独立完成编程任务的全流程操作',
    icon: Zap,
    color: '#3D8BFF'},
  {
    title: 'Code Interpreter',
    desc: '内置代码执行环境，实时测试和验证生成代码的正确性',
    icon: Cpu,
    color: '#22c55e'},
];

const humanevalEvolution = [
  { model: 'GLM-4-9B', score: 72.0 },
  { model: 'GLM-4', score: 78.5 },
  { model: 'GLM-4-Chat', score: 82.1 },
  { model: 'GLM-4.5', score: 86.5 },
  { model: 'GLM-5', score: 90.2 },
];

const ProgrammingCapabilitySection = () => (
  <section className="relative py-20 px-6">
    <div className="max-w-6xl mx-auto">
      <SectionLabel text="编程能力深度分析" />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-heading text-3xl md:text-4xl font-bold text-[#E1E8ED] mb-4"
      >
        💻 编程能力深度分析
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-body text-[#8B9EB0] mb-10 max-w-2xl"
      >
        GLM 系列在代码生成和编程理解任务上持续突破，从 GLM-4-9B 的 72.0% 到 GLM-5-preview 的 90.2%，
        成为中国最强的编程大模型系列。
      </motion.p>

      {/* HumanEval Evolution Progress Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="liquid-glass rounded-2xl p-6 mb-8"
      >
        <h3 className="font-heading text-lg font-bold text-[#E1E8ED] mb-5 flex items-center gap-2">
          <Code size={20} className="text-[#22c55e]" />
          HumanEval 能力演进
        </h3>
        <div className="space-y-4">
          {humanevalEvolution.map((item, i) => (
            <div key={item.model} className="flex items-center gap-4">
              <span className="font-mono text-xs text-[#8B9EB0] w-24 shrink-0 text-right">
                {item.model}
              </span>
              <div className="flex-1 h-3 rounded-full bg-[#0A1628] overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.score}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as const }}
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, #22c55e 0%, ${i === humanevalEvolution.length - 1 ? '#00E5FF' : '#4ECDC4'} 100%)`,
                  }}
                />
              </div>
              <span
                className="font-mono text-sm font-bold w-14 shrink-0"
                style={{ color: i === humanevalEvolution.length - 1 ? '#00E5FF' : '#22c55e' }}
              >
                {item.score}%
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between mt-4 px-28">
          {humanevalEvolution.slice(0, -1).map((item, i) => (
            <div key={i} className="flex items-center gap-1 text-xs text-[#8B9EB0]">
              <ArrowRight size={12} className="text-[#22c55e]" />
              <span className="font-mono">+{(humanevalEvolution[i + 1].score - item.score).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* GLM Programming Benchmarks Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="liquid-glass rounded-2xl p-6 mb-8"
      >
        <h3 className="font-heading text-lg font-bold text-[#E1E8ED] mb-4 flex items-center gap-2">
          <BarChart3 size={20} className="text-[#22c55e]" />
          GLM 编程基准评测
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-[#1A2A3A]">
                <th className="text-left py-3 px-3 font-heading text-xs font-semibold text-[#8B9EB0]">模型</th>
                <th className="text-center py-3 px-3 font-heading text-xs font-semibold text-[#8B9EB0]">HumanEval</th>
                <th className="text-center py-3 px-3 font-heading text-xs font-semibold text-[#8B9EB0]">HumanEval+</th>
                <th className="text-center py-3 px-3 font-heading text-xs font-semibold text-[#8B9EB0]">MBPP</th>
                <th className="text-center py-3 px-3 font-heading text-xs font-semibold text-[#8B9EB0]">MBPP+</th>
                <th className="text-center py-3 px-3 font-heading text-xs font-semibold text-[#8B9EB0]">LiveCodeBench</th>
              </tr>
            </thead>
            <tbody>
              {glmProgBenchmarks.map((row, i) => (
                <motion.tr
                  key={row.model}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-[#0F1F2E] hover:bg-[#0A1628]/50 transition-colors"
                >
                  <td className="py-3 px-3 font-mono text-sm font-semibold" style={{ color: i === glmProgBenchmarks.length - 1 ? '#00E5FF' : '#E1E8ED' }}>
                    {row.model}
                  </td>
                  {[
                    { val: row.humaneval, highlight: true },
                    { val: row.humanevalPlus, highlight: false },
                    { val: row.mbpp, highlight: false },
                    { val: row.mbppPlus, highlight: false },
                    { val: row.livecode, highlight: false },
                  ].map((cell, j) => (
                    <td key={j} className="py-3 px-3 text-center">
                      <span
                        className="font-mono text-sm font-bold"
                        style={{ color: cell.highlight ? '#22c55e' : '#8B9EB0' }}
                      >
                        {cell.val}
                      </span>
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Competitor Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="liquid-glass rounded-2xl p-6 mb-8"
      >
        <h3 className="font-heading text-lg font-bold text-[#E1E8ED] mb-4 flex items-center gap-2">
          <Globe size={20} className="text-[#00E5FF]" />
          中国编程模型横向对比
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-[#1A2A3A]">
                <th className="text-left py-3 px-3 font-heading text-xs font-semibold text-[#8B9EB0]">模型</th>
                <th className="text-center py-3 px-3 font-heading text-xs font-semibold text-[#8B9EB0]">HumanEval</th>
                <th className="text-center py-3 px-3 font-heading text-xs font-semibold text-[#8B9EB0]">MBPP</th>
                <th className="text-center py-3 px-3 font-heading text-xs font-semibold text-[#8B9EB0]">MATH</th>
              </tr>
            </thead>
            <tbody>
              {competitorBenchmarks.map((row, i) => (
                <motion.tr
                  key={row.model}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`border-b border-[#0F1F2E] hover:bg-[#0A1628]/50 transition-colors ${row.isGLM ? 'bg-[#22c55e08]' : ''}`}
                >
                  <td className="py-3 px-3 font-mono text-sm font-semibold" style={{ color: row.isGLM ? '#22c55e' : '#E1E8ED' }}>
                    {row.isGLM && <span className="mr-1">★</span>}{row.model}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-sm font-bold" style={{ color: row.isGLM ? '#22c55e' : '#8B9EB0' }}>
                    {row.humaneval}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-sm text-[#8B9EB0]">
                    {row.mbpp}
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-sm text-[#8B9EB0]">
                    {row.math}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="font-body text-xs text-[#8B9EB0] mt-3">
          ★ 标注 GLM 系列模型。DeepSeek-Coder-V2 和 Qwen2.5-Coder-32B 在 HumanEval 上略高，但 GLM-5 综合能力最为均衡。
        </p>
      </motion.div>

      {/* Key Facts Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {progKeyFacts.map((fact, i) => (
          <motion.div
            key={fact.title}
            variants={fadeInUp}
            custom={i}
            className="liquid-glass rounded-2xl p-5 hover:scale-[1.01] transition-transform duration-300"
          >
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center mb-3"
              style={{ backgroundColor: `${fact.color}15` }}
            >
              <fact.icon size={20} style={{ color: fact.color }} />
            </div>
            <h4 className="font-heading text-sm font-bold text-[#E1E8ED] mb-2">
              {fact.title}
            </h4>
            <p className="font-body text-xs text-[#8B9EB0] leading-relaxed">
              {fact.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ─────────────────── Section 9: Insights ─────────────────── */

const insights = [
  {
    title: '统一框架的力量',
    desc: 'GLM 的 ABI 设计证明，用同一个预训练目标同时做理解和生成，不仅可行而且高效。这比分别训练 BERT + GPT 的方案更优雅、更节省资源。后续 GLM-4/5 的所有能力都建立在这个统一框架之上。',
    icon: Layers,
    color: '#ffb84d'},
  {
    title: '稀疏注意力的范式转移',
    desc: 'DSA（Dynamic Sparse Attention）是 GLM-4.5 的核心突破。它将注意力计算的复杂度与序列长度解耦，意味着超长文档处理、视频理解等任务的成本不再随序列长度线性增长，这是大模型走向实用的关键一步。',
    icon: Zap,
    color: '#00E5FF'},
  {
    title: '异步 RL 开启 Agent 新时代',
    desc: 'GLM-5 的异步 RL 架构将生成与训练反馈解耦，让模型可以像人类工程师一样边工作边学习。从 WebGLM 的联网搜索到 GLM-5 的 Agentic Engineering，智谱正在构建一个能自我进化的人工智能系统。',
    icon: Bot,
    color: '#22c55e'},
];


  {/* ─── 子站导航 ─── */}
  <section className="max-w-[1200px] mx-auto px-6 pb-16">
    <motion.h2 variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }} custom={0}
      className="font-heading text-[32px] font-semibold text-white mb-8">📂 GLM 子站导航</motion.h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      <Link to="/glm/architecture" className="block liquid-glass rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-300 cursor-pointer group" style={{ borderTop: '3px solid #22c55e' }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#22c55e15]"><Cpu size={18} className="text-[#22c55e]" /></div>
            <h3 className="font-heading text-[16px] font-semibold text-white">架构解析</h3>
          </div>
          <ArrowRight size={16} className="text-[#8B9EB0] group-hover:text-[#22c55e] group-hover:translate-x-1 transition-all" />
        </div>
        <p className="font-body text-[13px] text-[#8B9EB0]">自回归填空 · DSA动态稀疏 · MoE · 异步RL</p>
      </Link>
      <Link to="/glm/benchmarks" className="block liquid-glass rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-300 cursor-pointer group" style={{ borderTop: '3px solid #22c55e' }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#22c55e15]"><BarChart3 size={18} className="text-[#22c55e]" /></div>
            <h3 className="font-heading text-[16px] font-semibold text-white">性能基准</h3>
          </div>
          <ArrowRight size={16} className="text-[#8B9EB0] group-hover:text-[#22c55e] group-hover:translate-x-1 transition-all" />
        </div>
        <p className="font-body text-[13px] text-[#8B9EB0]">MMLU · C-Eval · HumanEval · 中文优势</p>
      </Link>
      <Link to="/glm/multimodal" className="block liquid-glass rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-300 cursor-pointer group" style={{ borderTop: '3px solid #22c55e' }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#22c55e15]"><Eye size={18} className="text-[#22c55e]" /></div>
            <h3 className="font-heading text-[16px] font-semibold text-white">多模态</h3>
          </div>
          <ArrowRight size={16} className="text-[#8B9EB0] group-hover:text-[#22c55e] group-hover:translate-x-1 transition-all" />
        </div>
        <p className="font-body text-[13px] text-[#8B9EB0]">GLM-4V · CogAgent · All Tools框架</p>
      </Link>
    </div>
  </section>

const InsightsSection = () => (
  <section className="relative py-20 px-6">
    <div className="max-w-6xl mx-auto">
      <SectionLabel text="技术启示" />

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="font-heading text-3xl md:text-4xl font-bold text-[#E1E8ED] mb-4"
      >
        GLM 给大模型研发的三个启示
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="font-body text-[#8B9EB0] mb-10 max-w-2xl"
      >
        从 GLM 的五年演进中，我们可以提炼出对大模型领域具有普遍意义的三个技术判断。
      </motion.p>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {insights.map((insight, i) => (
          <motion.div
            key={insight.title}
            variants={fadeInUp}
            custom={i}
            className="liquid-glass rounded-2xl p-6 hover:scale-[1.01] transition-transform duration-300"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
              style={{ backgroundColor: `${insight.color}15` }}
            >
              <insight.icon size={24} style={{ color: insight.color }} />
            </div>

            <h3 className="font-heading text-xl font-bold text-[#E1E8ED] mb-3">
              {insight.title}
            </h3>
            <p className="font-body text-sm text-[#8B9EB0] leading-relaxed">
              {insight.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

/* ─────────────────── Footer ─────────────────── */

const Footer = () => (
  <footer className="relative py-12 px-6 border-t border-[#1A2A3A]">
    <div className="max-w-6xl mx-auto text-center">
      <p className="font-body text-sm text-[#8B9EB0]">
        GLM 技术解析 · 基于智谱AI公开资料整理
      </p>
      <p className="font-mono text-xs text-[#4A5A6A] mt-2">
        React 19 + TypeScript + Tailwind CSS v3.4 + Framer Motion
      </p>
    </div>
  </footer>
);

/* ─────────────────── Main Page Component ─────────────────── */

const Glm: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#050B14] text-[#E1E8ED]">
      <HeroSection />
      <CoreStatsSection />
      <BeginnerNavSection />
      <TechDeepDiveSection />
      <TimelineSection />
      <ChatGLMFamilySection />
      <BenchmarkSection />
      <PapersSection />
      <ProgrammingCapabilitySection />
      <InsightsSection />
      <Footer />
    </div>
  );
};

export default Glm;
