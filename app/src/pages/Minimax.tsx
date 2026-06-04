import { motion } from "framer-motion";
import {
  Zap, Cpu, Target, TrendingUp, Code2, GitBranch,
  Layers, Sparkles, Lightbulb, BookOpen, ArrowRight,
  BarChart3, Gauge, DollarSign, Bot, Workflow, Rocket,
  Monitor, Flame, CheckCircle, Download, ExternalLink,
  Eye, Network,
} from "lucide-react";
import { useState } from "react";
import { Link as RouterLink } from "react-router";

/* ───────── Section Reveal ───────── */
const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.section
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.6 }}
    className={className}
  >
    {children}
  </motion.section>
);

/* ───────── Timeline ───────── */
const timeline = [
  { year: "2025", model: "M1", params: "45.6B", type: "Dense", label: "开山之作" },
  { year: "2026", model: "M2.5", params: "456B", type: "MoE (56专家)", label: "成本革命" },
  { year: "2026", model: "M3", params: "1M ctx", type: "MSA + 原生多模态", label: "Frontier 三件套" },
];

const navCards = [
  {
    icon: Network,
    title: "MSA",
    desc: "MiniMax Sparse Attention",
    detail: "1M上下文下每token计算量降至上代1/20，prefill/decode显著加速",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    icon: Code2,
    title: "Coding Frontier+",
    desc: "长程软件工程",
    detail: "覆盖代码仓库、终端、测试、工具调用和多轮反馈的真实Agent任务",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    icon: Eye,
    title: "Native Multimodal",
    desc: "原生多模态",
    detail: "从训练早期混合图像、视频与文本，服务论文复现、代码审查和桌面操作",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
  {
    icon: Bot,
    title: "MiniMax Code",
    desc: "配套代码智能体",
    detail: "围绕M3训练和更新，对标Claude Code / Codex式长程开发体验",
    color: "text-amber-400",
    bg: "bg-amber-400/10",
  },
];

const tabData = [
  {
    title: "M3三件套",
    icon: Rocket,
    specs: [
      { label: "模型", value: "MiniMax-M3" },
      { label: "上下文窗口", value: "1M tokens" },
      { label: "核心注意力", value: "MSA" },
      { label: "开放状态", value: "Open-weight / 开源进程" },
    ],
    details: [
      "官方定位为同时具备Coding Frontier+、1M上下文窗口和原生多模态的开放权重模型",
      "MSA通过更精细的KV分块与KV outer gather Q降低百万上下文下的计算和访存成本",
      "支持图像、视频输入与桌面操作，适合论文复现、设计稿理解、代码审查和长程Agent任务",
      "MiniMax Code与M3同步更新，面向仓库级开发、测试、修复和多轮反馈闭环",
      "API与Token Plan已上线；官方GitHub/Hugging Face资源处于持续释放阶段",
    ],
  },
  {
    title: "M1架构",
    icon: Cpu,
    specs: [
      { label: "总参数", value: "45.6B" },
      { label: "激活参数", value: "45.6B (Dense)" },
      { label: "上下文窗口", value: "1M tokens" },
      { label: "架构类型", value: "Dense (非MoE)" },
    ],
    details: [
      "使用Lightning Attention替代FlashAttention，实现15%训练加速与20%+推理加速",
      "持续预训练1T tokens（网页数据+专有数据），采用AdamW优化器",
      "Forge RL框架驱动复杂任务在真实环境中执行",
      "CISPO（置信区间策略优化）提升强化学习训练稳定性",
      "SWE-Bench大幅领先Claude Sonnet 4.6，成本仅1美元/小时",
    ],
  },
  {
    title: "M2.5升级",
    icon: Layers,
    specs: [
      { label: "总参数", value: "456B" },
      { label: "激活参数", value: "45.6B (MoE)" },
      { label: "专家数量", value: "56 experts" },
      { label: "部署方式", value: "本地 (via ollama)" },
    ],
    details: [
      "升级为MoE架构，56个专家路由，总参数456B，激活仅45.6B",
      "在真实编程任务上达到业界最佳水平",
      "支持本地部署，可通过ollama在个人设备上运行",
      "延续CISPO优化器，强化RL训练稳定性",
      "保持1美元/小时的GPU成本哲学",
    ],
  },
  {
    title: "Agentic框架",
    icon: Workflow,
    specs: [
      { label: "框架名称", value: "ROPET" },
      { label: "核心引擎", value: "Forge RL" },
      { label: "优化器", value: "CISPO" },
      { label: "目标", value: "闭环自进化" },
    ],
    details: [
      "ROPET = Read, Observe, Plan, Execute, Train",
      "Read：读取文件、代码、文档，理解任务上下文",
      "Observe：观察执行结果，收集环境反馈",
      "Plan：基于观察结果规划下一步行动",
      "Execute：执行代码/工具调用，与环境交互",
      "Train：通过Forge RL自我训练，持续改进策略",
    ],
  },
];

const comparisonData = [
  { feature: "百万上下文计算量", flash: "全注意力成本接近平方增长", lightning: "每token计算量约为上代1/20" },
  { feature: "KV覆盖方式", flash: "固定窗口或粗粒度稀疏容易漏关键依赖", lightning: "更精确KV分块，提高有效上下文覆盖" },
  { feature: "访存模式", flash: "稀疏后可能随机读取、重复加载KV块", lightning: "KV outer gather Q，每块KV尽量只读一次" },
  { feature: "Prefill阶段", flash: "长输入成本高", lightning: "官方披露超过9倍加速" },
  { feature: "Decode阶段", flash: "长程任务延迟高", lightning: "官方披露超过15倍加速" },
  { feature: "Agent适配", flash: "适合短轮次或中等上下文", lightning: "适合仓库级、日志级、论文级长程记忆" },
];

const benchmarkData = [
  { label: "SWE-Bench Pro", value: "59.0%", compare: "官方M3数据", icon: Code2 },
  { label: "Terminal-Bench 2.1", value: "66.0%", compare: "官方M3数据", icon: Terminal },
  { label: "BrowseComp", value: "83.5%", compare: "官方M3数据", icon: Eye },
  { label: "上下文长度", value: "1M", compare: "tokens", icon: Layers },
];

const insights = [
  {
    icon: DollarSign,
    title: "M3把长上下文成本问题前置",
    desc: "MSA不是只把窗口写成1M，而是把稀疏选择、KV分块和GPU访存路径一起优化，让长程Agent更接近可日常使用。",
  },
  {
    icon: Target,
    title: "Frontier能力开始组合出现",
    desc: "M3的重点不是单项榜单，而是Coding、1M上下文和原生多模态在同一模型内协同，面向真实软件工程现场。",
  },
  {
    icon: Rocket,
    title: "MiniMax Code是模型路线的落点",
    desc: "M3不是单纯聊天模型，配套MiniMax Code说明其目标是长程开发任务：读仓库、跑测试、修复错误、复盘并继续执行。",
  },
];

function Terminal(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" x2="20" y1="19" y2="19" />
    </svg>
  );
}

/* ───────── MiniMax Page ───────── */
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
}

export default function Minimax() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-[#050B14] text-white font-body">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden px-6 py-20 sm:py-28 lg:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b]/20 via-[#050B14] to-[#050B14]" />
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[128px]" />
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-amber-400/5 rounded-full blur-[100px]" />

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-400/30 bg-amber-400/10 mb-6">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-amber-300 font-mono">MiniMax 稀宇科技</span>
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text text-transparent">
                MiniMax
              </span>
            </h1>

            <p className="text-xl sm:text-2xl lg:text-3xl text-slate-300 mb-4 font-heading">
              Coding Frontier · 1M MSA · 原生多模态
            </p>

            <p className="text-base sm:text-lg text-[#8B9EB0] max-w-2xl mx-auto mb-8">
              MiniMax M3 把长程编程能力、百万级上下文和原生多模态合并到同一开放权重路线中，
              并通过 MiniMax Code 落到真实软件工程智能体场景。
            </p>

            {/* Timeline */}
            <div className="flex items-center justify-center gap-6 sm:gap-10 mt-10">
              {timeline.map((item, i) => (
                <div key={i} className="flex items-center gap-6 sm:gap-10">
                  <div className="text-center">
                    <div className="text-xs text-[#8B9EB0] font-mono mb-1">{item.year}</div>
                    <div className="liquid-glass rounded-xl px-5 py-3 border border-amber-400/20">
                      <div className="text-lg sm:text-xl font-bold text-amber-400 font-heading">{item.model}</div>
                      <div className="text-xs text-slate-400 font-mono">{item.params} · {item.type}</div>
                      <div className="text-xs text-amber-300/70 mt-1">{item.label}</div>
                    </div>
                  </div>
                  {i < timeline.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-amber-400/50 flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── 核心数据 ─── */}
      <Section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <BarChart3 className="w-5 h-5 text-amber-400" />
            <span className="section-label text-amber-400">核心数据</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Cpu, value: "45.6B", label: "总参数 (M1 Dense)" },
              { icon: Layers, value: "456B", label: "总参数 (M2.5 MoE)" },
              { icon: BookOpen, value: "1M", label: "上下文窗口 (tokens)" },
              { icon: Network, value: "MSA", label: "M3 稀疏注意力" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="liquid-glass rounded-xl p-5 text-center border border-white/5"
              >
                <item.icon className="w-6 h-6 text-amber-400 mx-auto mb-2" />
                <div className="text-2xl sm:text-3xl font-bold text-white font-heading">{item.value}</div>
                <div className="text-xs text-[#8B9EB0] mt-1">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── 小白导航 ─── */}
      <Section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <Lightbulb className="w-5 h-5 text-amber-400" />
            <span className="section-label text-amber-400">技术小白导航</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {navCards.map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="liquid-glass rounded-xl p-5 border border-white/5 hover:border-amber-400/30 transition-colors cursor-default"
              >
                <div className={`inline-flex p-2.5 rounded-lg ${card.bg} mb-3`}>
                  <card.icon className={`w-5 h-5 ${card.color}`} />
                </div>
                <h3 className="font-heading text-base font-semibold text-white mb-1">{card.title}</h3>
                <p className="text-sm text-amber-300/80 mb-2">{card.desc}</p>
                <p className="text-xs text-[#8B9EB0] leading-relaxed">{card.detail}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── 技术深度 Tabs ─── */}
      <Section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <Cpu className="w-5 h-5 text-amber-400" />
            <span className="section-label text-amber-400">技术深度</span>
          </div>

          {/* Tab buttons */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
            {tabData.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === i
                    ? "bg-amber-400/15 text-amber-400 border border-amber-400/30"
                    : "text-[#8B9EB0] border border-white/5 hover:text-white hover:border-white/10"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.title}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Specs */}
            <div className="liquid-glass rounded-xl p-6 border border-white/5">
              <h3 className="font-heading text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Gauge className="w-5 h-5 text-amber-400" />
                规格参数
              </h3>
              <div className="space-y-3">
                {tabData[activeTab].specs.map((spec, j) => (
                  <div key={j} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <span className="text-sm text-[#8B9EB0]">{spec.label}</span>
                    <span className="data-tag text-amber-400">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="liquid-glass rounded-xl p-6 border border-white/5">
              <h3 className="font-heading text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                技术亮点
              </h3>
              <ul className="space-y-3">
                {tabData[activeTab].details.map((detail, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-slate-300 leading-relaxed">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* ─── MSA vs Traditional Attention ─── */}
      <Section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <Flame className="w-5 h-5 text-amber-400" />
            <span className="section-label text-amber-400">MSA vs 传统长上下文注意力</span>
          </div>

          <div className="liquid-glass rounded-xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left py-3 px-4 text-[#8B9EB0] font-medium">特性</th>
                    <th className="text-left py-3 px-4 text-[#8B9EB0] font-medium">传统方案风险</th>
                    <th className="text-left py-3 px-4 text-amber-400 font-medium">MiniMax MSA</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, i) => (
                    <motion.tr
                      key={i}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]"
                    >
                      <td className="py-3 px-4 text-slate-300">{row.feature}</td>
                      <td className="py-3 px-4 text-[#8B9EB0]">{row.flash}</td>
                      <td className="py-3 px-4 text-amber-300 font-mono font-medium">{row.lightning}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── Benchmark ─── */}
      <Section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <TrendingUp className="w-5 h-5 text-amber-400" />
            <span className="section-label text-amber-400">Benchmark 结果</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benchmarkData.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="liquid-glass rounded-xl p-5 border border-white/5 text-center"
              >
                <item.icon className="w-6 h-6 text-amber-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-white font-heading mb-1">{item.value}</div>
                <div className="text-sm text-amber-300/80">{item.label}</div>
                <div className="text-xs text-[#8B9EB0] mt-1">{item.compare}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── Agentic Framework ─── */}
      <Section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <Workflow className="w-5 h-5 text-amber-400" />
            <span className="section-label text-amber-400">ROPET 智能体框架</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {[
              { icon: BookOpen, label: "Read", desc: "读取文件/代码/文档", color: "from-amber-400/20 to-amber-500/10" },
              { icon: Monitor, label: "Observe", desc: "观察执行结果", color: "from-amber-400/15 to-amber-500/5" },
              { icon: Target, label: "Plan", desc: "规划下一步行动", color: "from-amber-400/15 to-amber-500/5" },
              { icon: Code2, label: "Execute", desc: "执行代码/工具", color: "from-amber-400/15 to-amber-500/5" },
              { icon: TrendingUp, label: "Train", desc: "Forge RL自训练", color: "from-amber-400/20 to-amber-500/10" },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3 w-full sm:w-auto">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex-1 sm:flex-initial bg-gradient-to-br ${step.color} rounded-xl p-4 border border-amber-400/15 text-center min-w-[140px]`}
                >
                  <step.icon className="w-5 h-5 text-amber-400 mx-auto mb-2" />
                  <div className="font-heading text-sm font-semibold text-white">{step.label}</div>
                  <div className="text-xs text-[#8B9EB0] mt-1">{step.desc}</div>
                </motion.div>
                {i < 4 && (
                  <ArrowRight className="hidden sm:block w-4 h-4 text-amber-400/40 flex-shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── 技术报告 ─── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-16">
        <motion.h2 variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }} custom={0}
          className="font-heading text-[32px] font-semibold text-white mb-8">📚 技术报告与开源资源</motion.h2>
        <div className="mb-4 p-4 rounded-xl bg-[rgba(255,184,77,0.08)] border border-[rgba(255,184,77,0.15)]">
          <p className="text-[#ffb84d] font-body text-[14px]">MiniMax M3 已发布，开放权重与开源资源按官方节奏在 GitHub / Hugging Face 释放</p>
        </div>
        <div className="space-y-4">
          {[
            { title: 'MiniMax M3 Official Report', url: 'https://www.minimax.io/blog/minimax-m3', desc: 'M3官方报告：Coding Frontier+、1M上下文窗口、MiniMax Sparse Attention、原生多模态与MiniMax Code更新。', tags: ['M3', 'MSA', 'Frontier Agent'], color: '#ffb84d', isBlog: true },
            { title: 'MiniMax-01: Scaling Foundation Models with Lightning Attention', arxiv: '2501.08313', pdfUrl: 'https://arxiv.org/pdf/2501.08313', absUrl: 'https://arxiv.org/abs/2501.08313', github: 'https://github.com/MiniMax-AI', desc: 'MiniMax-01（M1）技术报告：456亿参数、Lightning Attention（比FlashAttention快15%训练/20%+推理）、CISPO优化器、Forge RL真实环境强化学习。', tags: ['MiniMax-01', 'Lightning Attention', 'M1'], color: '#ffb84d' },
            { title: 'MiniMax M2.5 Technical Report', url: 'https://www.minimax.io/news/minimax-m2-5', desc: 'M2.5技术报告：456B总参数/45.6B激活MoE架构、56专家、CISPO优化器、真实编程任务SOTA、本地部署支持（ollama）。', tags: ['M2.5', 'MoE', '编程'], color: '#ffb84d', isBlog: true },
          ].map((p, i) => (
            <motion.div key={i} variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }} custom={i}
              className="liquid-glass rounded-2xl p-6" style={{ borderLeft: `3px solid ${p.color}` }}>
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-heading text-[16px] font-semibold text-white mb-1">{p.title}</h3>
                  <div className="flex items-center gap-2 text-[12px] text-[#8B9EB0]">
                    {p.arxiv ? <span>arXiv:{p.arxiv}</span> : <span>MiniMax官方博客</span>}
                  </div>
                </div>
                {p.pdfUrl ? (
                  <a href={p.pdfUrl} target="_blank" rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-white"
                    style={{ background: p.color }}>
                    <Download size={13} /> PDF
                  </a>
                ) : (
                  <a href={p.url} target="_blank" rel="noopener noreferrer"
                    className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-white"
                    style={{ background: p.color }}>
                    <ExternalLink size={13} /> 博客
                  </a>
                )}
              </div>
              <p className="font-body text-[14px] text-[#8B9EB0] leading-[1.6] mb-4">{p.desc}</p>
              <div className="flex items-center gap-3 flex-wrap">
                {p.tags.map((tag) => <span key={tag} className="data-tag">{tag}</span>)}
                <div className="ml-auto">
                  <a href="https://github.com/MiniMax-AI/MiniMax-M3" target="_blank" rel="noopener noreferrer" className="text-[12px] text-[#8B9EB0] hover:text-white transition-colors">M3 GitHub</a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

            {/* ─── 子站导航 ─── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-16">
        <motion.h2 variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }} custom={0}
          className="font-heading text-[32px] font-semibold text-white mb-8">📂 MiniMax 子站导航</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <RouterLink to="/minimax/architecture" className="block liquid-glass rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-300 cursor-pointer group" style={{ borderTop: '3px solid #ffb84d' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#ffb84d15]"><Cpu size={18} className="text-[#ffb84d]" /></div>
                <h3 className="font-heading text-[16px] font-semibold text-white">架构解析</h3>
              </div>
              <ArrowRight size={16} className="text-[#8B9EB0] group-hover:text-[#ffb84d] group-hover:translate-x-1 transition-all" />
            </div>
            <p className="font-body text-[13px] text-[#8B9EB0]">MSA · 1M Context · Native Multimodal · MiniMax Code</p>
          </RouterLink>
          <RouterLink to="/minimax/benchmarks" className="block liquid-glass rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-300 cursor-pointer group" style={{ borderTop: '3px solid #ffb84d' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#ffb84d15]"><BarChart3 size={18} className="text-[#ffb84d]" /></div>
                <h3 className="font-heading text-[16px] font-semibold text-white">性能基准</h3>
              </div>
              <ArrowRight size={16} className="text-[#8B9EB0] group-hover:text-[#ffb84d] group-hover:translate-x-1 transition-all" />
            </div>
            <p className="font-body text-[13px] text-[#8B9EB0]">SWE-Bench Pro · Terminal-Bench · BrowseComp · Agent Evals</p>
          </RouterLink>
        </div>
      </section>

{/* ─── 技术启示 ─── */}
      <Section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-10">
            <GitBranch className="w-5 h-5 text-amber-400" />
            <span className="section-label text-amber-400">技术启示</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {insights.map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                whileHover={{ y: -3 }}
                className="liquid-glass rounded-xl p-6 border border-amber-400/10 hover:border-amber-400/25 transition-colors"
              >
                <div className="inline-flex p-2.5 rounded-lg bg-amber-400/10 mb-4">
                  <insight.icon className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="font-heading text-base font-semibold text-white mb-2">
                  {insight.title}
                </h3>
                <p className="text-sm text-[#8B9EB0] leading-relaxed">{insight.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── Footer ─── */}
      <section className="px-6 py-10 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-sm text-[#8B9EB0]">
              数据来源: MiniMax M3 官方报告 / ChinaAI-Roadmaps
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-[#8B9EB0]">
            <span className="data-tag text-amber-400/70">M1: 2025</span>
            <span className="data-tag text-amber-400/70">M2.5: 2026</span>
            <span className="data-tag text-amber-400/70">M3: 2026</span>
          </div>
        </div>
      </section>
    </div>
  );
}
