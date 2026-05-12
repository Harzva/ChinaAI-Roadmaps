import { useState, useRef, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Cpu, Zap, Brain, Target, Sparkles, BarChart3,
  ChevronDown, ArrowRight, Bot, Eye, Lightbulb, Layers,
  Settings, Sigma, Flame, CircleDot, GitBranch, Monitor, CheckCircle2, AlertCircle,
  Database, Code2, Atom, Compass, Wrench, Download,
  Link,
  Users, Workflow, Rocket, GitCompare, TrendingUp, Network, Award, Boxes,
} from 'lucide-react'
import ParticleCanvas from '@/components/ParticleCanvas'
import HolographicText from '@/components/HolographicText'

/* ─────────────────────────── Scroll Reveal Wrapper ─────────────────────────── */

function ScrollReveal({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────── Data Table ─────────────────────────── */

interface TableRow {
  [key: string]: string | number
}

function TechTable({ headers, rows, highlightCol }: { headers: string[]; rows: TableRow[]; highlightCol?: number }) {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null)
  const [hoveredCol, setHoveredCol] = useState<number | null>(null)

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr style={{ background: 'rgba(61,139,255,0.15)' }}>
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-5 py-4 text-white font-medium font-body text-[14px]"
                onMouseEnter={() => setHoveredCol(i)}
                onMouseLeave={() => setHoveredCol(null)}
                style={{
                  borderLeft: hoveredCol === i && i > 0 ? `2px solid ${i === 1 ? '#3D8BFF' : '#00E5FF'}` : '2px solid transparent'}}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <motion.tr
              key={ri}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: ri * 0.04, ease: 'easeOut' }}
              className="transition-colors duration-200"
              style={{
                background: ri % 2 === 0 ? '#0A1628' : '#0D1B2E'}}
              onMouseEnter={() => setHoveredRow(ri)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              {headers.map((h, ci) => {
                const val = row[h]
                const isBest = highlightCol !== undefined && ci === highlightCol && ri > 0
                return (
                  <td
                    key={ci}
                    className={`px-5 py-4 font-body text-[14px] ${ci === 0 ? 'text-[#8B9EB0]' : 'text-white font-mono'}`}
                    style={{
                      background: isBest ? 'rgba(0,229,255,0.08)' : hoveredRow === ri ? 'rgba(61,139,255,0.06)' : undefined,
                      color: isBest ? '#00E5FF' : undefined,
                      borderLeft: hoveredCol === ci && ci > 0 ? `2px solid ${ci === 1 ? '#3D8BFF' : '#00E5FF'}` : '2px solid transparent',
                      borderBottom: '1px solid rgba(255,255,255,0.05)'}}
                    onMouseEnter={() => setHoveredCol(ci)}
                    onMouseLeave={() => setHoveredCol(null)}
                  >
                    {val}
                  </td>
                )
              })}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ─────────────────────────── Mouse Glow Card ─────────────────────────── */

function MouseGlowCard({ children, className = '', borderColor = 'rgba(61,139,255,0.3)' }: {
  children: React.ReactNode
  className?: string
  borderColor?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [glow, setGlow] = useState('50% 50%')

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setGlow(`${x}% ${y}%`)
  }, [])

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      className={`liquid-glass liquid-glass-hover relative overflow-hidden ${className}`}
      style={{
        background: `radial-gradient(circle at ${glow}, rgba(61,139,255,0.1) 0%, rgba(10,22,40,0.6) 60%), rgba(10,22,40,0.6)`,
        backdropFilter: 'blur(12px) saturate(140%)',
        WebkitBackdropFilter: 'blur(12px) saturate(140%)',
        borderColor}}
    >
      {children}
    </div>
  )
}

/* ─────────────────────────── Muon Iteration Visual ─────────────────────────── */

function MuonIterationVisual() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  const iterations = [
    { id: 1, type: 'fast', a: '3.4445', b: '-4.7750', c: '2.0315', desc: '快速收敛' },
    { id: 2, type: 'fast', a: '3.4445', b: '-4.7750', c: '2.0315', desc: '快速收敛' },
    { id: 3, type: 'fast', a: '3.4445', b: '-4.7750', c: '2.0315', desc: '快速收敛' },
    { id: 4, type: 'fast', a: '3.4445', b: '-4.7750', c: '2.0315', desc: '快速收敛' },
    { id: 5, type: 'fast', a: '3.4445', b: '-4.7750', c: '2.0315', desc: '快速收敛' },
    { id: 6, type: 'fast', a: '3.4445', b: '-4.7750', c: '2.0315', desc: '快速收敛' },
    { id: 7, type: 'fast', a: '3.4445', b: '-4.7750', c: '2.0315', desc: '快速收敛' },
    { id: 8, type: 'fast', a: '3.4445', b: '-4.7750', c: '2.0315', desc: '快速收敛' },
    { id: 9, type: 'stable', a: '2.0000', b: '-1.5000', c: '0.5000', desc: '精确稳定' },
    { id: 10, type: 'stable', a: '2.0000', b: '-1.5000', c: '0.5000', desc: '精确稳定' },
  ]

  return (
    <div ref={ref} className="w-full">
      <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-6">
        {iterations.map((it, i) => (
          <motion.div
            key={it.id}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: i * 0.06, duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <div
              className="w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center text-[13px] font-mono font-bold mb-1"
              style={{
                background: it.type === 'fast'
                  ? 'rgba(61,139,255,0.15)'
                  : 'rgba(0,229,255,0.15)',
                border: `1px solid ${it.type === 'fast' ? '#3D8BFF' : '#00E5FF'}`,
                color: it.type === 'fast' ? '#3D8BFF' : '#00E5FF'}}
            >
              {it.id}
            </div>
            <span className="text-[10px] text-[#8B9EB0] font-mono text-center leading-tight">
              {it.desc}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Iteration table */}
      <div className="liquid-glass rounded-xl p-4 md:p-6 overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.08)]">
              <th className="pb-3 text-[12px] text-[#8B9EB0] font-mono font-medium">迭代</th>
              <th className="pb-3 text-[12px] text-[#8B9EB0] font-mono font-medium">类型</th>
              <th className="pb-3 text-[12px] text-[#8B9EB0] font-mono font-medium">a</th>
              <th className="pb-3 text-[12px] text-[#8B9EB0] font-mono font-medium">b</th>
              <th className="pb-3 text-[12px] text-[#8B9EB0] font-mono font-medium">c</th>
            </tr>
          </thead>
          <tbody>
            {iterations.map((it) => (
              <tr key={it.id} className="border-b border-[rgba(255,255,255,0.04)]">
                <td className="py-2 text-[13px] font-mono text-white">{it.id}</td>
                <td className="py-2">
                  <span
                    className="text-[12px] font-mono px-2 py-0.5 rounded"
                    style={{
                      background: it.type === 'fast' ? 'rgba(61,139,255,0.15)' : 'rgba(0,229,255,0.15)',
                      color: it.type === 'fast' ? '#3D8BFF' : '#00E5FF'}}
                  >
                    {it.type === 'fast' ? 'Fast' : 'Stable'}
                  </span>
                </td>
                <td className="py-2 text-[13px] font-mono text-white">{it.a}</td>
                <td className="py-2 text-[13px] font-mono text-white">{it.b}</td>
                <td className="py-2 text-[13px] font-mono text-white">{it.c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ─────────────────────────── Timeline Visual ─────────────────────────── */

function TimelineVisual() {
  const milestones = [
    { year: '2024', event: 'k1.5', detail: '首次探索RL scaling', color: '#3D8BFF' },
    { year: '2024', event: 'Muon', detail: '优化器论文发表', color: '#00E5FF' },
    { year: '2025', event: 'K2 (1T)', detail: 'MoE + MuonClip + 15.5T tokens', color: '#FF6B6B' },
    { year: '2026', event: 'K2.5/K2.5V', detail: '多模态Agent能力', color: '#ffb84d' },
  ]

  return (
    <div className="relative py-8">
      {/* Timeline line */}
      <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 hidden md:block"
        style={{ background: 'linear-gradient(to right, #3D8BFF, #00E5FF, #FF6B6B, #ffb84d)' }}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
        {milestones.map((m, i) => (
          <motion.div
            key={m.event}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <div
              className="w-4 h-4 rounded-full mb-3 hidden md:block"
              style={{ background: m.color, boxShadow: `0 0 16px ${m.color}80` }}
            />
            <div className="liquid-glass rounded-xl p-5 w-full border-t-2" style={{ borderTopColor: m.color }}>
              <span className="text-[12px] font-mono text-[#8B9EB0]">{m.year}</span>
              <h4 className="font-heading text-[18px] font-semibold text-white mt-1">{m.event}</h4>
              <p className="text-[13px] text-[#8B9EB0] mt-2 leading-relaxed">{m.detail}</p>
            </div>
          </motion.div>
        ))}
            {/* ─── 子站导航 ─── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-16">
        <motion.h2 variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }} custom={0}
          className="font-heading text-[32px] font-semibold text-white mb-8">📂 Kimi 子站导航</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link to="/kimi/architecture" className="block liquid-glass rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-300 cursor-pointer group" style={{ borderTop: '3px solid #FF6B6B' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#FF6B6B15]"><Cpu size={18} className="text-[#FF6B6B]" /></div>
                <h3 className="font-heading text-[16px] font-semibold text-white">架构解析</h3>
              </div>
              <ArrowRight size={16} className="text-[#8B9EB0] group-hover:text-[#FF6B6B] group-hover:translate-x-1 transition-all" />
            </div>
            <p className="font-body text-[13px] text-[#8B9EB0]">Muon优化器 · MoE架构 · Agentic框架 · QK-Clip</p>
          </Link>
          <Link to="/kimi/benchmarks" className="block liquid-glass rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-300 cursor-pointer group" style={{ borderTop: '3px solid #FF6B6B' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#FF6B6B15]"><BarChart3 size={18} className="text-[#FF6B6B]" /></div>
                <h3 className="font-heading text-[16px] font-semibold text-white">性能基准</h3>
              </div>
              <ArrowRight size={16} className="text-[#8B9EB0] group-hover:text-[#FF6B6B] group-hover:translate-x-1 transition-all" />
            </div>
            <p className="font-body text-[13px] text-[#8B9EB0]">MMLU · HumanEval · GSM8K · Agentic对比</p>
          </Link>
          <Link to="/kimi/efficiency" className="block liquid-glass rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-300 cursor-pointer group" style={{ borderTop: '3px solid #FF6B6B' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#FF6B6B15]"><Zap size={18} className="text-[#FF6B6B]" /></div>
                <h3 className="font-heading text-[16px] font-semibold text-white">效率分析</h3>
              </div>
              <ArrowRight size={16} className="text-[#8B9EB0] group-hover:text-[#FF6B6B] group-hover:translate-x-1 transition-all" />
            </div>
            <p className="font-body text-[13px] text-[#8B9EB0]">Muon 2×效率 · 长上下文 · 训练成本 · API定价</p>
          </Link>
          <Link to="/kimi/multimodal" className="block liquid-glass rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-300 cursor-pointer group" style={{ borderTop: '3px solid #FF6B6B' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#FF6B6B15]"><Eye size={18} className="text-[#FF6B6B]" /></div>
                <h3 className="font-heading text-[16px] font-semibold text-white">多模态</h3>
              </div>
              <ArrowRight size={16} className="text-[#8B9EB0] group-hover:text-[#FF6B6B] group-hover:translate-x-1 transition-all" />
            </div>
            <p className="font-body text-[13px] text-[#8B9EB0]">Kimi-VL架构 · K2.5V视觉Agent · 视觉原语</p>
          </Link>
        </div>
      </section>

</div>
    </div>
  )
}

/* ─────────────────────────── Kimi Page ─────────────────────────── */

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
}

export default function Kimi() {
  const [activeTab, setActiveTab] = useState<'muon' | 'k2' | 'k25'>('muon')

  const stats = [
    { value: '1T', label: '总参数规模', sub: '32B 激活 | MoE 架构', icon: <Cpu size={22} />, color: '#3D8BFF' },
    { value: '15.5T', label: '预训练 Tokens', sub: '零 loss spike', icon: <Database size={22} />, color: '#00E5FF' },
    { value: '~2×', label: 'Muon 效率提升', sub: '相比 AdamW', icon: <Zap size={22} />, color: '#ffb84d' },
    { value: 'Agentic', label: '自主代理智能', sub: '从对话到行动', icon: <Bot size={22} />, color: '#FF6B6B' },
  ]

  const beginnerCards = [
    {
      icon: <Compass size={20} />,
      title: 'Muon 是什么？',
      desc: '想象你在迷雾森林里找路。AdamW 像盲人摸象——走一步看一步，经常绕弯路。Muon 像有了指南针：每次调整方向时，让所有方向互相垂直（正交化），不重复探索同一个方向。走的就是最短路！比 AdamW 快约 2 倍。',
      tag: 'Newton-Schulz 正交化',
      color: '#3D8BFF'},
    {
      icon: <Bot size={20} />,
      title: 'Agentic Intelligence 是什么？',
      desc: '传统 AI 只能「聊天回答问题」，Agentic AI 能「自己动手完成任务」。比如你说「帮我订一张去东京的机票」，它不只是告诉你怎么订，而是自己打开网站、搜索航班、比较价格、填写信息、完成支付。从对话到自主代理的飞跃。',
      tag: '自主代理 · 工具使用',
      color: '#FF6B6B'},
    {
      icon: <AlertCircle size={20} />,
      title: 'QK-Clip 是什么？',
      desc: 'MoE 大模型训练时，Query 和 Key 的数值有时会「爆炸」变得极大，导致训练崩溃。QK-Clip 就像电路的保险丝——当 QK 数值超过安全阈值时自动截断。MuonClip 把 Muon 优化器和 QK-Clip 结合，让 1T 参数的 MoE 模型在 15.5T token 上训练零 loss spike！',
      tag: '训练稳定性 · MoE',
      color: '#00E5FF'},
    {
      icon: <Target size={20} />,
      title: 'RLVR 是什么？',
      desc: 'RLVR = Reinforcement Learning with Verifiable Rewards（可验证奖励的强化学习）。传统 RL 奖励靠人类打分，慢且主观。RLVR 的奖励来自「能自动验证对错」的指标：代码能不能跑通？数学题答案对不对？这让 AI 可以自己给自己打分，学习效率大增。',
      tag: '强化学习 · 可验证奖励',
      color: '#ffb84d'},
  ]

  const benchmarkRows = [
    { '模型': 'Kimi K2', 'Tau2-Bench': '76.2', 'ACEBench': '68.5', 'SWE-Bench': '73.8', 'MATH': '91.2', 'Code': '87.4' },
    { '模型': 'Kimi k1.5', 'Tau2-Bench': '62.1', 'ACEBench': '54.3', 'SWE-Bench': '58.6', 'MATH': '83.7', 'Code': '79.1' },
    { '模型': 'GPT-4o', 'Tau2-Bench': '71.5', 'ACEBench': '63.2', 'SWE-Bench': '68.4', 'MATH': '88.1', 'Code': '84.2' },
    { '模型': 'Claude 3.5 Sonnet', 'Tau2-Bench': '69.8', 'ACEBench': '61.7', 'SWE-Bench': '70.2', 'MATH': '86.5', 'Code': '85.7' },
    { '模型': 'Gemini 2.5 Pro', 'Tau2-Bench': '74.3', 'ACEBench': '66.8', 'SWE-Bench': '72.1', 'MATH': '90.1', 'Code': '86.3' },
    { '模型': 'DeepSeek-V4-Pro', 'Tau2-Bench': '75.1', 'ACEBench': '67.2', 'SWE-Bench': '71.5', 'MATH': '90.5', 'Code': '87.1' },
  ]

  const insightCards = [
    {
      icon: <Atom size={28} />,
      title: '优化器创新是效率之源',
      desc: 'Muon 通过 Newton-Schulz 正交化迭代，实现了比 AdamW 约 2 倍的效率提升。Kimi K2 在 15.5T tokens 上使用 Muon 训练，实现了零 loss spike。这说明优化器层面的创新可以带来比单纯堆叠参数更大的收益。',
      color: '#3D8BFF'},
    {
      icon: <GitBranch size={28} />,
      title: 'Agentic 数据合成开启新范式',
      desc: '通过系统化生成工具使用示例（任务生成 → 轨迹生成 → 质量评估），Kimi K2 构建了大规模 Agentic 训练数据。这种「合成+验证」的数据生产模式，让模型从对话者进化为行动者。',
      color: '#FF6B6B'},
    {
      icon: <Sparkles size={28} />,
      title: 'RLVR 让模型学会自我批评',
      desc: 'RLVR 提供可验证的正确性奖励，自我评估奖励提供自我批评能力。两者结合让模型不仅能给出答案，还能判断答案好坏。这种「思考预算」控制机制是 scaling RL 的关键。',
      color: '#00E5FF'},
  ]

  return (
    <div className="relative bg-[#050B14] text-white overflow-hidden">
      <ParticleCanvas />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-[90dvh] flex flex-col items-center justify-center z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex items-center gap-2 text-[13px] text-[#8B9EB0] mb-8"
        >
          <span className="text-[#FF6B6B]">Kimi</span>
          <span>/</span>
          <span>Kimi</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-6"
        >
          <h1
            className="font-heading text-[56px] md:text-[80px] font-bold tracking-[-0.02em] leading-[1.1]"
            style={{
              background: 'linear-gradient(135deg, #FF6B6B 0%, #3D8BFF 40%, #00E5FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'}}
          >
            Kimi
          </h1>
          <p className="font-heading text-[28px] md:text-[36px] font-semibold text-white mt-2">
            Agentic Intelligence 先锋
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
          className="text-[18px] md:text-[20px] text-[#8B9EB0] max-w-2xl text-center leading-[1.7] mb-4"
        >
          Moonshot AI（月之暗面）从对话到自主代理的技术演进
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mb-10"
        >
          <span className="data-tag inline-flex items-center gap-2">
            <CircleDot size={14} />
            Moonshot AI · 2024-2026 技术全景
          </span>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: 'easeOut' }}
          className="w-full max-w-[900px]"
        >
          <TimelineVisual />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <ChevronDown size={28} className="text-[#00E5FF]" style={{ animation: 'float-arrow 2s ease-in-out infinite' }} />
        </motion.div>
      </section>

      {/* ═══════════════ 核心数据栏 ═══════════════ */}
      <section className="relative z-10 py-[80px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number] }}
            className="liquid-glass rounded-2xl p-6 md:p-10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                    style={{ background: `${s.color}20`, color: s.color, border: `1px solid ${s.color}40` }}
                  >
                    {s.icon}
                  </div>
                  <HolographicText
                    text={s.value}
                    className="font-heading text-[32px] md:text-[40px] font-bold text-white"
                  />
                  <span className="text-[14px] text-[#8B9EB0] font-body mt-1">{s.label}</span>
                  <span className="text-[12px] text-[#8B9EB0] font-mono mt-0.5 opacity-70">{s.sub}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ 小白导航 ═══════════════ */}
      <section className="relative z-10 py-[60px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-8">
              <Lightbulb size={24} className="text-[#ffb84d]" />
              <h2 className="font-heading text-[28px] font-semibold text-white">
                小白导航：先读这段
              </h2>
            </div>
          </ScrollReveal>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1 } }}}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {beginnerCards.map((card) => (
              <motion.div
                key={card.title}
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <MouseGlowCard
                  className="rounded-xl p-6 md:p-8 h-full"
                  borderColor={`${card.color}30`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: `${card.color}20`, color: card.color }}
                    >
                      {card.icon}
                    </div>
                    <h3 className="font-heading text-[18px] font-semibold text-white">{card.title}</h3>
                  </div>
                  <p className="text-[15px] text-[#8B9EB0] leading-[1.7]">{card.desc}</p>
                  <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                    <span className="data-tag text-[12px]">{card.tag}</span>
                  </div>
                </MouseGlowCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ 技术深度解析 (Tabs) ═══════════════ */}
      <section className="relative z-10 py-[80px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <span className="section-label block mb-3">[ 技术深度解析 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-8">
              三大技术支柱
            </h2>
          </ScrollReveal>

          {/* Tabs */}
          <ScrollReveal delay={0.1}>
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
              {[
                { key: 'muon' as const, label: 'Muon 优化器', icon: <Sigma size={16} /> },
                { key: 'k2' as const, label: 'K2 架构', icon: <Layers size={16} /> },
                { key: 'k25' as const, label: 'K2.5 多模态', icon: <Eye size={16} /> },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className="flex items-center gap-2 px-5 py-3 rounded-lg font-body text-[14px] font-medium transition-all duration-300 whitespace-nowrap"
                  style={{
                    background: activeTab === tab.key ? 'rgba(61,139,255,0.2)' : 'rgba(10,22,40,0.6)',
                    border: `1px solid ${activeTab === tab.key ? '#3D8BFF' : 'rgba(255,255,255,0.08)'}`,
                    color: activeTab === tab.key ? '#3D8BFF' : '#8B9EB0'}}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* ── Muon Tab ── */}
            {activeTab === 'muon' && (
              <div className="space-y-8">
                <MouseGlowCard className="rounded-xl p-6 md:p-8" borderColor="rgba(61,139,255,0.2)">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(61,139,255,0.15)', color: '#3D8BFF' }}>
                      <Sigma size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading text-[24px] font-semibold text-white">Muon Optimizer</h3>
                      <p className="text-[13px] text-[#8B9EB0] font-mono">Newton-Schulz 正交化迭代</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-[16px] font-semibold text-white mb-3">核心原理</h4>
                      <p className="text-[15px] text-[#8B9EB0] leading-[1.7] mb-4">
                        Muon 通过 Newton-Schulz 迭代对梯度进行正交化：每次更新时，让梯度矩阵的列向量两两正交（内积为零），
                        避免不同参数更新方向互相干扰，从而走出更直的优化路径。
                      </p>

                      <h4 className="text-[16px] font-semibold text-white mb-3">迭代过程</h4>
                      <div className="liquid-glass rounded-lg p-4 border-l-[3px] border-l-[#3D8BFF] mb-4">
                        <code className="font-mono text-[14px] text-white leading-relaxed block">
                          Z = G / ||G||_F<br />
                          repeat 10 times:<br />
                          &nbsp;&nbsp;Z = a·Z + b·ZZ<sup>T</sup>Z + c·ZZ<sup>T</sup>ZZ<sup>T</sup>Z
                        </code>
                      </div>
                      <p className="text-[13px] text-[#8B9EB0]">
                        其中 G 是原始梯度，Z 经过 10 次迭代后成为正交化的更新方向。
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[16px] font-semibold text-white mb-3">10 次迭代分配</h4>
                      <MuonIterationVisual />

                      <div className="mt-6 liquid-glass rounded-lg p-4">
                        <h5 className="text-[14px] font-semibold text-white mb-2">系数对比</h5>
                        <div className="space-y-2 text-[13px] font-mono">
                          <div className="flex justify-between">
                            <span className="text-[#3D8BFF]">Fast 收敛 (8次)</span>
                            <span className="text-white">a=3.4445, b=-4.7750, c=2.0315</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#00E5FF]">Stable 精确 (2次)</span>
                            <span className="text-white">a=2.0000, b=-1.5000, c=0.5000</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </MouseGlowCard>

                {/* Muon vs AdamW comparison */}
                <MouseGlowCard className="rounded-xl p-6 md:p-8" borderColor="rgba(0,229,255,0.2)">
                  <h3 className="font-heading text-[20px] font-semibold text-white mb-6">Muon vs AdamW 对比</h3>
                  <TechTable
                    headers={['指标', 'AdamW', 'Muon']}
                    rows={[
                      { '指标': '收敛速度', 'AdamW': '基线 1×', 'Muon': '~2× 更快' },
                      { '指标': '内存开销', 'AdamW': '2× 参数', 'Muon': '~1.5× 参数' },
                      { '指标': '每步计算量', 'AdamW': 'O(d)', 'Muon': 'O(d) + 正交化' },
                      { '指标': '训练稳定性', 'AdamW': '需学习率调度', 'Muon': '更稳定，少调参' },
                      { '指标': '大规模训练', 'AdamW': '易出现 loss spike', 'Muon': '15.5T tokens 零 spike' },
                      { '指标': '适用场景', 'AdamW': '通用', 'Muon': 'LLM 预训练最优' },
                    ]}
                    highlightCol={2}
                  />
                </MouseGlowCard>
              </div>
            )}

            {/* ── K2 Tab ── */}
            {activeTab === 'k2' && (
              <div className="space-y-8">
                <MouseGlowCard className="rounded-xl p-6 md:p-8" borderColor="rgba(255,107,107,0.2)">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,107,107,0.15)', color: '#FF6B6B' }}>
                      <Layers size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading text-[24px] font-semibold text-white">Kimi K2 架构</h3>
                      <p className="text-[13px] text-[#8B9EB0] font-mono">1T 参数 · 32B 激活 · MoE</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="liquid-glass rounded-xl p-5 border-t-2" style={{ borderTopColor: '#FF6B6B' }}>
                      <Cpu size={20} className="text-[#FF6B6B] mb-3" />
                      <h4 className="font-heading text-[16px] font-semibold text-white mb-2">MoE 架构</h4>
                      <p className="text-[13px] text-[#8B9EB0] leading-relaxed">
                        1 万亿总参数中每次只激活 320 亿，通过路由网络动态选择最相关的专家子网络，实现高效推理。
                      </p>
                    </div>
                    <div className="liquid-glass rounded-xl p-5 border-t-2" style={{ borderTopColor: '#3D8BFF' }}>
                      <Settings size={20} className="text-[#3D8BFF] mb-3" />
                      <h4 className="font-heading text-[16px] font-semibold text-white mb-2">MuonClip</h4>
                      <p className="text-[13px] text-[#8B9EB0] leading-relaxed">
                        Muon 优化器 + QK-Clip 的结合体。QK-Clip 在 MoE 训练中自动截断 Query/Key 的异常值，防止 attention score 爆炸。
                      </p>
                    </div>
                    <div className="liquid-glass rounded-xl p-5 border-t-2" style={{ borderTopColor: '#00E5FF' }}>
                      <Database size={20} className="text-[#00E5FF] mb-3" />
                      <h4 className="font-heading text-[16px] font-semibold text-white mb-2">15.5T Tokens</h4>
                      <p className="text-[13px] text-[#8B9EB0] leading-relaxed">
                        在 15.5 万亿 token 上完成预训练，使用 Muon 优化器实现了零 loss spike 的稳定训练过程。
                      </p>
                    </div>
                  </div>

                  {/* Training stages */}
                  <h4 className="font-heading text-[18px] font-semibold text-white mb-4">多阶段后训练流程</h4>
                  <div className="space-y-4">
                    {[
                      {
                        step: '1',
                        title: '大规模 Agentic 数据合成',
                        desc: '在模拟环境和真实环境中生成工具使用数据：任务生成 → 轨迹生成 → 质量评估，构建大规模 Agentic 训练集。',
                        icon: <Wrench size={18} />,
                        color: '#FF6B6B'},
                      {
                        step: '2',
                        title: 'RLVR（可验证奖励强化学习）',
                        desc: '利用可自动验证的奖励信号（代码执行、数学验证等）进行强化学习，让模型从「能说」进化到「能做对」。',
                        icon: <Target size={18} />,
                        color: '#3D8BFF'},
                      {
                        step: '3',
                        title: '自我评估奖励',
                        desc: '模型学会自我批评：在给定答案后评估自己的输出质量，通过「思考预算」和温度衰减策略控制探索与利用。',
                        icon: <Brain size={18} />,
                        color: '#00E5FF'},
                    ].map((stage) => (
                      <div key={stage.step} className="flex gap-4 items-start liquid-glass rounded-xl p-5">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                          style={{ background: `${stage.color}20`, color: stage.color }}
                        >
                          {stage.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="text-[12px] font-mono px-2 py-0.5 rounded"
                              style={{ background: `${stage.color}20`, color: stage.color }}
                            >
                              Stage {stage.step}
                            </span>
                          </div>
                          <h5 className="text-[16px] font-semibold text-white mb-1">{stage.title}</h5>
                          <p className="text-[14px] text-[#8B9EB0] leading-relaxed">{stage.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Data synthesis detail */}
                  <div className="mt-6 liquid-glass rounded-xl p-5">
                    <h5 className="text-[16px] font-semibold text-white mb-3 flex items-center gap-2">
                      <GitBranch size={18} className="text-[#ffb84d]" />
                      Agentic 数据合成流水线
                    </h5>
                    <div className="flex flex-col md:flex-row items-stretch gap-3">
                      {[
                        { label: '任务生成', desc: '自动生成多样化工具调用任务', color: '#FF6B6B' },
                        { label: '轨迹生成', desc: '在模拟/真实环境执行并记录', color: '#3D8BFF' },
                        { label: '质量评估', desc: '多维度筛选高质量训练样本', color: '#00E5FF' },
                      ].map((item, i) => (
                        <div key={i} className="flex-1 flex items-center gap-2">
                          {i > 0 && <ArrowRight size={16} className="text-[#8B9EB0] hidden md:block flex-shrink-0" />}
                          <div className="flex-1 rounded-lg p-3 border" style={{ borderColor: `${item.color}30` }}>
                            <div className="text-[13px] font-semibold" style={{ color: item.color }}>{item.label}</div>
                            <div className="text-[12px] text-[#8B9EB0] mt-1">{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </MouseGlowCard>
              </div>
            )}

            {/* ── K2.5 Tab ── */}
            {activeTab === 'k25' && (
              <div className="space-y-8">
                <MouseGlowCard className="rounded-xl p-6 md:p-8" borderColor="rgba(255,184,77,0.2)">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,184,77,0.15)', color: '#ffb84d' }}>
                      <Eye size={24} />
                    </div>
                    <div>
                      <h3 className="font-heading text-[24px] font-semibold text-white">Kimi K2.5 / K2.5V</h3>
                      <p className="text-[13px] text-[#8B9EB0] font-mono">多模态 Agent · 视觉编码器 · 复杂环境执行</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h4 className="text-[16px] font-semibold text-white mb-3">核心升级</h4>
                      <p className="text-[15px] text-[#8B9EB0] leading-[1.7] mb-4">
                        K2.5 系列在 K2 基础上增加了视觉编码器，实现了从纯文本 Agent 到多模态 Agent 的跨越。
                        模型不仅能「读懂」屏幕和图像，还能在复杂的视觉环境中进行规划与执行。
                      </p>

                      <div className="space-y-3">
                        {[
                          { label: '视觉编码器', desc: '新增多模态感知能力，处理图像/视频输入', icon: <Monitor size={16} />, color: '#ffb84d' },
                          { label: '增强规划', desc: '在复杂环境中进行多步推理和任务分解', icon: <Compass size={16} />, color: '#3D8BFF' },
                          { label: '工具执行', desc: '结合视觉反馈进行精确的 GUI 操作', icon: <Wrench size={16} />, color: '#00E5FF' },
                        ].map((item) => (
                          <div key={item.label} className="flex items-start gap-3 liquid-glass rounded-lg p-3">
                            <div
                              className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                              style={{ background: `${item.color}20`, color: item.color }}
                            >
                              {item.icon}
                            </div>
                            <div>
                              <div className="text-[14px] font-semibold text-white">{item.label}</div>
                              <div className="text-[13px] text-[#8B9EB0]">{item.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-[16px] font-semibold text-white mb-3">K2.5 vs K2.5V</h4>
                      <TechTable
                        headers={['特性', 'K2.5', 'K2.5V']}
                        rows={[
                          { '特性': '文本能力', 'K2.5': '完整保留', 'K2.5V': '完整保留' },
                          { '特性': '视觉编码器', 'K2.5': '—', 'K2.5V': '内置' },
                          { '特性': '图像理解', 'K2.5': '—', 'K2.5V': '支持' },
                          { '特性': 'GUI 操作', 'K2.5': '基础', 'K2.5V': '增强' },
                          { '特性': '视频理解', 'K2.5': '—', 'K2.5V': '支持' },
                          { '特性': '多模态 Agent', 'K2.5': '—', 'K2.5V': '完整支持' },
                        ]}
                        highlightCol={2}
                      />

                      <div className="mt-6 liquid-glass rounded-lg p-4 border-l-[3px] border-l-[#ffb84d]">
                        <h5 className="text-[14px] font-semibold text-white mb-2">应用场景示例</h5>
                        <div className="space-y-2 text-[13px] text-[#8B9EB0]">
                          <div className="flex items-start gap-2">
                            <CheckCircle2 size={14} className="text-[#4ECDC4] flex-shrink-0 mt-0.5" />
                            <span>看到网页截图后自动填写表单并完成提交</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 size={14} className="text-[#4ECDC4] flex-shrink-0 mt-0.5" />
                            <span>根据设计稿图片生成对应的 HTML/CSS 代码</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <CheckCircle2 size={14} className="text-[#4ECDC4] flex-shrink-0 mt-0.5" />
                            <span>分析图表数据并撰写分析报告</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </MouseGlowCard>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ Muon 详细公式 Section ═══════════════ */}
      <section className="relative z-10 py-[80px]" style={{ background: '#0A1628' }}>
        <div
          className="absolute top-0 left-0 right-0 h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(61,139,255,0.04) 0%, transparent 60%)' }}
        />
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <span className="section-label block mb-3">[ 优化器创新 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-4">
              Muon → MuonClip：从高效到稳定
            </h2>
            <p className="text-[17px] text-[#8B9EB0] max-w-2xl leading-[1.7] mb-10">
              Kimi 的技术路线中，优化器创新是贯穿始终的主线。从 k1.5 首次探索 Muon，
              到 K2 将 Muon 与 QK-Clip 结合为 MuonClip，解决了 MoE 大模型训练的稳定性难题。
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Newton-Schulz Formula */}
            <ScrollReveal delay={0.1}>
              <MouseGlowCard className="rounded-xl p-6 md:p-8 h-full" borderColor="rgba(61,139,255,0.2)">
                <div className="flex items-center gap-2 mb-5">
                  <Sigma size={20} className="text-[#3D8BFF]" />
                  <h3 className="font-heading text-[20px] font-semibold text-white">Newton-Schulz 迭代公式</h3>
                </div>

                <div className="liquid-glass rounded-lg p-5 mb-5 border border-[rgba(61,139,255,0.15)]">
                  <code className="font-mono text-[15px] text-white leading-loose block">
                    <span style={{ color: '#8B9EB0' }}>{'// 初始化'}</span><br />
                    Z₀ = G / ||G||<sub>F</sub><br />
                    <br />
                    <span style={{ color: '#8B9EB0' }}>{'// 迭代 1-8: 快速收敛'}</span><br />
                    <span style={{ color: '#3D8BFF' }}>for i = 1 to 8:</span><br />
                    &nbsp;&nbsp;Zᵢ = <span style={{ color: '#ffb84d' }}>3.4445</span> · Z<sub>i-1</sub><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ <span style={{ color: '#ffb84d' }}>(-4.7750)</span> · Z<sub>i-1</sub>Z<sub>i-1</sub><sup>T</sup>Z<sub>i-1</sub><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ <span style={{ color: '#ffb84d' }}>2.0315</span> · Z<sub>i-1</sub>Z<sub>i-1</sub><sup>T</sup>Z<sub>i-1</sub>Z<sub>i-1</sub><sup>T</sup>Z<sub>i-1</sub><br />
                    <br />
                    <span style={{ color: '#8B9EB0' }}>{'// 迭代 9-10: 精确稳定'}</span><br />
                    <span style={{ color: '#00E5FF' }}>for i = 9 to 10:</span><br />
                    &nbsp;&nbsp;Zᵢ = <span style={{ color: '#00E5FF' }}>2.0</span> · Z<sub>i-1</sub><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ <span style={{ color: '#00E5FF' }}>(-1.5)</span> · Z<sub>i-1</sub>Z<sub>i-1</sub><sup>T</sup>Z<sub>i-1</sub><br />
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+ <span style={{ color: '#00E5FF' }}>0.5</span> · Z<sub>i-1</sub>Z<sub>i-1</sub><sup>T</sup>Z<sub>i-1</sub>Z<sub>i-1</sub><sup>T</sup>Z<sub>i-1</sub>
                  </code>
                </div>

                <p className="text-[14px] text-[#8B9EB0] leading-relaxed">
                  Newton-Schulz 迭代通过五次多项式逼近矩阵的 polar decomposition。
                  前 8 次使用大系数加速收敛，后 2 次使用小系数精确稳定。
                  最终 Z₁₀ 的列向量近似正交，作为正交化的梯度更新方向。
                </p>
              </MouseGlowCard>
            </ScrollReveal>

            {/* QK-Clip */}
            <ScrollReveal delay={0.2}>
              <MouseGlowCard className="rounded-xl p-6 md:p-8 h-full" borderColor="rgba(255,107,107,0.2)">
                <div className="flex items-center gap-2 mb-5">
                  <AlertCircle size={20} className="text-[#FF6B6B]" />
                  <h3 className="font-heading text-[20px] font-semibold text-white">MuonClip & QK-Clip</h3>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="liquid-glass rounded-lg p-4 border-l-[3px] border-l-[#FF6B6B]">
                    <h4 className="text-[14px] font-semibold text-white mb-2">MoE 训练的稳定性挑战</h4>
                    <p className="text-[13px] text-[#8B9EB0] leading-relaxed">
                      MoE 模型中，Query 和 Key 的数值在训练过程中可能急剧增大，
                      导致 attention score 爆炸（数值溢出），引发 loss spike 甚至训练崩溃。
                      随着模型规模达到 1T 参数，这个问题变得更加严重。
                    </p>
                  </div>

                  <div className="liquid-glass rounded-lg p-4 border-l-[3px] border-l-[#3D8BFF]">
                    <h4 className="text-[14px] font-semibold text-white mb-2">QK-Clip 解决方案</h4>
                    <code className="font-mono text-[14px] text-white block mb-2">
                      Q'<sub>ij</sub> = clip(Q<sub>ij</sub>, -c, c)<br />
                      K'<sub>ij</sub> = clip(K<sub>ij</sub>, -c, c)
                    </code>
                    <p className="text-[13px] text-[#8B9EB0]">
                      对 Q 和 K 矩阵的每个元素进行截断，限制在 [-c, c] 范围内。
                      就像电路保险丝，防止数值「过载」。
                    </p>
                  </div>

                  <div className="liquid-glass rounded-lg p-4 border-l-[3px] border-l-[#00E5FF]">
                    <h4 className="text-[14px] font-semibold text-white mb-2">MuonClip = Muon + QK-Clip</h4>
                    <p className="text-[13px] text-[#8B9EB0] leading-relaxed">
                      将 Muon 的高效收敛能力与 QK-Clip 的稳定性保障结合。
                      Kimi K2 使用 MuonClip 在 15.5T tokens 上完成训练，
                      <span className="text-[#00E5FF] font-semibold"> 零 loss spike</span>。
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1 text-center liquid-glass rounded-lg p-3">
                    <div className="text-[24px] font-mono font-bold text-[#00E5FF]">15.5T</div>
                    <div className="text-[11px] text-[#8B9EB0] font-mono">训练 tokens</div>
                  </div>
                  <div className="flex-1 text-center liquid-glass rounded-lg p-3">
                    <div className="text-[24px] font-mono font-bold text-[#FF6B6B]">0</div>
                    <div className="text-[11px] text-[#8B9EB0] font-mono">loss spike</div>
                  </div>
                </div>
              </MouseGlowCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ K2 Architecture Section ═══════════════ */}
      <section className="relative z-10 py-[80px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <span className="section-label block mb-3">[ K2 架构详解 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-10">
              MoE + Agentic + RL 的三位一体
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* MoE Details */}
            <ScrollReveal delay={0}>
              <MouseGlowCard className="rounded-xl p-6 h-full" borderColor="rgba(61,139,255,0.2)">
                <div className="h-[3px] w-full bg-[#3D8BFF] rounded-full mb-5" />
                <div className="flex items-center gap-2 mb-4">
                  <Cpu size={20} className="text-[#3D8BFF]" />
                  <h3 className="font-heading text-[18px] font-semibold text-white">MoE 架构参数</h3>
                </div>
                <div className="space-y-3 font-mono text-[14px]">
                  <div className="flex justify-between">
                    <span className="text-[#8B9EB0]">总参数</span>
                    <span className="text-[#3D8BFF] font-bold">1 Trillion</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8B9EB0]">激活参数</span>
                    <span className="text-white">32 Billion</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8B9EB0]">专家数量</span>
                    <span className="text-white">256</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8B9EB0]">每 token 激活</span>
                    <span className="text-white">8 专家</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8B9EB0]">共享专家</span>
                    <span className="text-white">1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8B9EB0]">激活率</span>
                    <span className="text-[#00E5FF]">3.2%</span>
                  </div>
                </div>
              </MouseGlowCard>
            </ScrollReveal>

            {/* RL Strategies */}
            <ScrollReveal delay={0.1}>
              <MouseGlowCard className="rounded-xl p-6 h-full" borderColor="rgba(255,107,107,0.2)">
                <div className="h-[3px] w-full bg-[#FF6B6B] rounded-full mb-5" />
                <div className="flex items-center gap-2 mb-4">
                  <Target size={20} className="text-[#FF6B6B]" />
                  <h3 className="font-heading text-[18px] font-semibold text-white">RL 策略组合</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { label: 'RLVR', desc: '可验证奖励：代码/数学自动判分', color: '#FF6B6B' },
                    { label: '自我评估', desc: '模型自评输出质量', color: '#3D8BFF' },
                    { label: '思考预算', desc: '控制推理时计算资源', color: '#00E5FF' },
                    { label: '温度衰减', desc: '从探索到利用的过渡', color: '#ffb84d' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div
                        className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                        style={{ background: item.color }}
                      />
                      <div>
                        <div className="text-[14px] font-semibold text-white">{item.label}</div>
                        <div className="text-[12px] text-[#8B9EB0]">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </MouseGlowCard>
            </ScrollReveal>

            {/* Training Pipeline */}
            <ScrollReveal delay={0.2}>
              <MouseGlowCard className="rounded-xl p-6 h-full" borderColor="rgba(0,229,255,0.2)">
                <div className="h-[3px] w-full bg-[#00E5FF] rounded-full mb-5" />
                <div className="flex items-center gap-2 mb-4">
                  <Flame size={20} className="text-[#00E5FF]" />
                  <h3 className="font-heading text-[18px] font-semibold text-white">训练里程碑</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { stage: '预训练', detail: '15.5T tokens', status: 'Muon 零 spike', color: '#00E5FF' },
                    { stage: 'Agentic 合成', detail: '模拟+真实环境', status: '大规模工具数据', color: '#3D8BFF' },
                    { stage: 'RLVR 训练', detail: '可验证奖励', status: '正确性导向', color: '#FF6B6B' },
                    { stage: 'Self-Eval', detail: '自我批评能力', status: '质量评估', color: '#ffb84d' },
                  ].map((item) => (
                    <div key={item.stage} className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0"
                        style={{ background: `${item.color}20`, color: item.color }}
                      >
                        <ChevronDown size={14} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[14px] font-semibold text-white">{item.stage}</div>
                        <div className="text-[12px] text-[#8B9EB0]">{item.detail}</div>
                      </div>
                      <span
                        className="text-[11px] font-mono px-2 py-0.5 rounded"
                        style={{ background: `${item.color}15`, color: item.color }}
                      >
                        {item.status}
                      </span>
                    </div>
                  ))}
                </div>
              </MouseGlowCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ Benchmark Results ═══════════════ */}
      <section className="relative z-10 py-[80px]" style={{ background: '#0A1628' }}>
        <div
          className="absolute top-0 left-0 right-0 h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,107,107,0.03) 0%, transparent 60%)' }}
        />
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <span className="section-label block mb-3">[ 评测结果 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-4">
              标杆性评测表现
            </h2>
            <p className="text-[17px] text-[#8B9EB0] max-w-2xl leading-[1.7] mb-10">
              Kimi K2 在 Agentic 能力评测上表现突出，尤其在 Tau2-Bench、ACEBench 等
              需要复杂规划和工具使用的 benchmark 上取得领先成绩。
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <MouseGlowCard className="rounded-xl p-6 md:p-8" borderColor="rgba(255,107,107,0.15)">
              <div className="flex items-center gap-2 mb-5">
                <BarChart3 size={20} className="text-[#FF6B6B]" />
                <h3 className="font-heading text-[18px] font-semibold text-white">Benchmark 对比</h3>
              </div>

              <TechTable
                headers={['模型', 'Tau2-Bench', 'ACEBench', 'SWE-Bench', 'MATH', 'Code']}
                rows={benchmarkRows}
                highlightCol={1}
              />

              <div className="mt-5 flex flex-wrap gap-3 text-[12px] text-[#8B9EB0] font-mono">
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm" style={{ background: 'rgba(0,229,255,0.15)', border: '1px solid #00E5FF' }} />
                  最优成绩
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-sm" style={{ background: '#0A1628' }} />
                  基线对比
                </span>
                <span>* 数据为近似值，来源于各技术报告</span>
              </div>
            </MouseGlowCard>
          </ScrollReveal>

          {/* Leading benchmarks highlight */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {[
              { name: 'Tau2-Bench', score: '76.2', desc: 'Agentic 任务执行评测', icon: <Bot size={20} />, color: '#FF6B6B' },
              { name: 'ACEBench', score: '68.5', desc: '复杂环境代码执行', icon: <Code2 size={20} />, color: '#3D8BFF' },
              { name: 'SWE-Bench Verified', score: '73.8', desc: '真实软件工程任务', icon: <Wrench size={20} />, color: '#00E5FF' },
            ].map((b, i) => (
              <ScrollReveal key={b.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="liquid-glass rounded-xl p-6 text-center"
                  style={{ border: `1px solid ${b.color}30` }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: `${b.color}20`, color: b.color }}
                  >
                    {b.icon}
                  </div>
                  <h4 className="font-heading text-[16px] font-semibold text-white mb-1">{b.name}</h4>
                  <HolographicText
                    text={b.score}
                    className="font-mono text-[36px] font-bold"
                  />
                  <p className="text-[13px] text-[#8B9EB0] mt-1">{b.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 技术报告 ─── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-16">
        <motion.h2 variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }} custom={0}
          className="font-heading text-[32px] font-semibold text-white mb-8">📚 技术报告与开源资源</motion.h2>
        <div className="mb-4 p-4 rounded-xl bg-[rgba(255,107,107,0.08)] border border-[rgba(255,107,107,0.15)]">
          <p className="text-[#FF6B6B] font-body text-[14px]">Kimi团队论文全部开源，GitHub仓库包含模型权重和训练代码</p>
        </div>
        <div className="space-y-4">
          {[
            { title: 'Kimi k1.5: Scaling Reinforcement Learning with LLMs', arxiv: '2501.12599', pdfUrl: 'https://arxiv.org/pdf/2501.12599', absUrl: 'https://arxiv.org/abs/2501.12599', github: 'https://github.com/MoonshotAI/Kimi-K2', desc: 'k1.5技术报告：Muon优化器、Long-CoT扩展、RLHF策略，7B参数探索大规模推理。', tags: ['k1.5', 'Muon', 'RL'], color: '#FF6B6B' },
            { title: 'Kimi K2: Open Agentic Intelligence', arxiv: '2507.20534', pdfUrl: 'https://arxiv.org/pdf/2507.20534', absUrl: 'https://arxiv.org/abs/2507.20534', github: 'https://github.com/MoonshotAI/Kimi-K2', desc: 'K2技术报告：1T参数MoE、32B激活、Agentic Intelligence框架，万亿参数开源模型。', tags: ['K2', 'MoE', 'Agentic'], color: '#FF6B6B' },
            { title: 'Kimi K2.5: Visual Agentic Intelligence', arxiv: '2602.02276', pdfUrl: 'https://arxiv.org/pdf/2602.02276', absUrl: 'https://arxiv.org/abs/2602.02276', github: 'https://github.com/MoonshotAI/Kimi-K2', desc: 'K2.5技术报告：视觉Agentic Intelligence、多模态Agent、Agent Swarm协作框架。', tags: ['K2.5', 'VLM', 'Agent'], color: '#FF6B6B' },
            { title: 'Kimi-VL Technical Report', arxiv: '2504.07491', pdfUrl: 'https://arxiv.org/pdf/2504.07491', absUrl: 'https://arxiv.org/abs/2504.07491', github: 'https://github.com/MoonshotAI/Kimi-VL', desc: 'Kimi-VL视觉语言模型技术报告：多模态理解、视觉推理、跨模态对齐。', tags: ['Kimi-VL', 'VLM'], color: '#FF6B6B' },
          ].map((p, i) => (
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

      {/* ═══════════════ AgentSwarm 多智能体协作 ═══════════════ */}
      <section className="relative z-10 py-[80px]" style={{ background: '#0A1628' }}>
        <div
          className="absolute top-0 left-0 right-0 h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(255,107,107,0.04) 0%, transparent 60%)' }}
        />
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <span className="section-label block mb-3">[ AgentSwarm 架构 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-4">
              <span style={{ color: '#FF6B6B' }}>🐝</span> AgentSwarm 多智能体协作
            </h2>
            <p className="text-[17px] text-[#8B9EB0] max-w-3xl leading-[1.7] mb-10">
              Kimi K2.5 引入的 AgentSwarm 框架通过 PARL 强化学习训练，实现
              Orchestrator 动态编排数百个子智能体并行协作，将复杂任务执行效率提升数倍。
            </p>
          </ScrollReveal>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {[
              { value: '100', unit: '个', label: '并行子智能体', sub: 'K2.5 AgentSwarm', icon: <Users size={20} />, color: '#FF6B6B' },
              { value: '1,500+', unit: '', label: '工具调用/会话', sub: '每 session 工具调用', icon: <Wrench size={20} />, color: '#ffb84d' },
              { value: '3-4.5×', unit: '', label: '执行速度提升', sub: '时间缩短达 80%', icon: <Rocket size={20} />, color: '#00E5FF' },
              { value: '300', unit: '个', label: 'K2.6 扩展规模', sub: '+ Claw Groups', icon: <TrendingUp size={20} />, color: '#3D8BFF' },
            ].map((m, i) => (
              <ScrollReveal key={m.label} delay={i * 0.08}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="liquid-glass rounded-xl p-5 text-center"
                  style={{ border: `1px solid ${m.color}25` }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ background: `${m.color}20`, color: m.color }}
                  >
                    {m.icon}
                  </div>
                  <div className="font-heading text-[28px] font-bold" style={{ color: m.color }}>
                    {m.value}<span className="text-[16px]">{m.unit}</span>
                  </div>
                  <div className="text-[14px] text-white font-body mt-1">{m.label}</div>
                  <div className="text-[12px] text-[#8B9EB0] font-mono mt-0.5">{m.sub}</div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* PARL Architecture + Reward Shaping */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <ScrollReveal delay={0.1}>
              <MouseGlowCard className="rounded-xl p-6 md:p-8 h-full" borderColor="rgba(255,107,107,0.2)">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,107,107,0.15)', color: '#FF6B6B' }}>
                    <Workflow size={20} />
                  </div>
                  <div>
                    <h3 className="font-heading text-[20px] font-semibold text-white">PARL 强化学习框架</h3>
                    <p className="text-[12px] text-[#8B9EB0] font-mono">Parallel-Agent Reinforcement Learning</p>
                  </div>
                </div>

                <div className="liquid-glass rounded-lg p-4 border-l-[3px] border-l-[#FF6B6B] mb-4">
                  <h4 className="text-[14px] font-semibold text-white mb-2 flex items-center gap-2">
                    <AlertCircle size={14} className="text-[#FF6B6B]" />
                    解决 "Serial Collapse" 难题
                  </h4>
                  <p className="text-[13px] text-[#8B9EB0] leading-relaxed">
                    传统串行 Agent 在长任务中因错误累积导致性能急剧下降（Serial Collapse）。
                    PARL 通过将任务分解为并行子任务，让多个子智能体同时工作，
                    从根本上避免了单点故障的传播。
                  </p>
                </div>

                <h4 className="text-[14px] font-semibold text-white mb-3 flex items-center gap-2">
                  <Layers size={14} className="text-[#FF6B6B]" />
                  Orchestrator → Sub-agents 架构
                </h4>
                <div className="flex items-center gap-3 mb-5">
                  {['Orchestrator', 'Sub-Agent A', 'Sub-Agent B', 'Sub-Agent C'].map((label, i) => (
                    <div key={label} className="flex items-center gap-3">
                      <div
                        className="flex-1 min-w-0 rounded-lg p-3 text-center"
                        style={{
                          background: i === 0 ? 'rgba(255,107,107,0.15)' : 'rgba(10,22,40,0.6)',
                          border: `1px solid ${i === 0 ? '#FF6B6B40' : 'rgba(255,255,255,0.08)'}`
                        }}
                      >
                        <div className="text-[11px] font-mono mb-1" style={{ color: i === 0 ? '#FF6B6B' : '#8B9EB0' }}>
                          {i === 0 ? '调度器' : '并行'}
                        </div>
                        <div className="text-[12px] text-white font-semibold truncate">{label}</div>
                      </div>
                      {i < 3 && <ArrowRight size={14} className="text-[#8B9EB0] flex-shrink-0" />}
                    </div>
                  ))}
                </div>

                <div className="liquid-glass rounded-lg p-4">
                  <h4 className="text-[14px] font-semibold text-white mb-2 flex items-center gap-2">
                    <Boxes size={14} className="text-[#00E5FF]" />
                    动态实例化（无预定义工作流）
                  </h4>
                  <p className="text-[13px] text-[#8B9EB0] leading-relaxed">
                    Orchestrator 根据任务需求<strong className="text-white">动态实例化冻结的子智能体</strong>，
                    而非使用预定义的工作流模板。子智能体从冻结检查点加载，
                    根据实时任务上下文被激活，实现真正的自适应协作。
                  </p>
                </div>
              </MouseGlowCard>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <MouseGlowCard className="rounded-xl p-6 md:p-8 h-full" borderColor="rgba(255,184,77,0.2)">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,184,77,0.15)', color: '#ffb84d' }}>
                    <Award size={20} />
                  </div>
                  <h3 className="font-heading text-[20px] font-semibold text-white">Staged Reward Shaping</h3>
                </div>

                <p className="text-[14px] text-[#8B9EB0] leading-relaxed mb-5">
                  PARL 采用分阶段奖励塑形策略，在不同训练阶段给予不同的奖励信号，
                  引导智能体逐步学会协作。
                </p>

                <div className="space-y-4">
                  {[
                    {
                      stage: '早期奖励',
                      desc: '创建子智能体 — 奖励 Orchestrator 正确识别任务并实例化合适的子智能体',
                      icon: <Sparkles size={16} />,
                      color: '#FF6B6B',
                    },
                    {
                      stage: '中期奖励',
                      desc: '并行执行 — 奖励子智能体间的有效并行协作和正确的任务分工',
                      icon: <Network size={16} />,
                      color: '#3D8BFF',
                    },
                    {
                      stage: '晚期奖励',
                      desc: '任务完成 — 奖励最终任务的成功完成和整体执行效率',
                      icon: <CheckCircle2 size={16} />,
                      color: '#00E5FF',
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={item.stage}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                      className="flex gap-4 items-start liquid-glass rounded-lg p-4"
                      style={{ borderLeft: `3px solid ${item.color}` }}
                    >
                      <div
                        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ background: `${item.color}20`, color: item.color }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <div className="text-[13px] font-semibold text-white mb-1">{item.stage}</div>
                        <div className="text-[12px] text-[#8B9EB0] leading-relaxed">{item.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </MouseGlowCard>
            </ScrollReveal>
          </div>

          {/* Three Swarm Patterns */}
          <ScrollReveal delay={0.1}>
            <h3 className="font-heading text-[22px] font-semibold text-white mb-5 flex items-center gap-2">
              <Network size={20} className="text-[#FF6B6B]" />
              三大 Swarm 模式
            </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              {
                name: 'Research Swarm',
                desc: '多个研究智能体并行检索、交叉验证信息源、汇总分析报告。适用于文献综述、市场调研等需要广泛信息收集的任务。',
                icon: <Compass size={22} />,
                color: '#FF6B6B',
              },
              {
                name: 'Build Swarm',
                desc: '多个编码智能体并行开发不同模块，通过 Orchestrator 协调接口和依赖关系。适用于软件开发、代码重构等工程任务。',
                icon: <Code2 size={22} />,
                color: '#3D8BFF',
              },
              {
                name: 'Office Swarm',
                desc: '多个办公智能体并行处理文档、表格、邮件和日程，协同完成复杂的行政和管理工作流。',
                icon: <Monitor size={22} />,
                color: '#00E5FF',
              },
            ].map((pattern, i) => (
              <ScrollReveal key={pattern.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className="liquid-glass rounded-xl p-6 h-full flex flex-col"
                  style={{ border: `1px solid ${pattern.color}25`, borderTop: `3px solid ${pattern.color}` }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${pattern.color}20`, color: pattern.color }}
                  >
                    {pattern.icon}
                  </div>
                  <h4 className="font-heading text-[18px] font-semibold text-white mb-2">{pattern.name}</h4>
                  <p className="text-[13px] text-[#8B9EB0] leading-relaxed flex-1">{pattern.desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Comparison Table */}
          <ScrollReveal delay={0.1}>
            <MouseGlowCard className="rounded-xl p-6 md:p-8 mb-10" borderColor="rgba(255,107,107,0.15)">
              <div className="flex items-center gap-2 mb-5">
                <GitCompare size={20} className="text-[#FF6B6B]" />
                <h3 className="font-heading text-[18px] font-semibold text-white">Agent Swarm 竞品对比</h3>
              </div>
              <TechTable
                headers={['平台', '最大子智能体数', '并行模式', '核心方法']}
                rows={[
                  { '平台': 'Kimi K2.5 AgentSwarm', '最大子智能体数': '100', '并行模式': 'PARL 动态编排', '核心方法': 'Staged Reward Shaping' },
                  { '平台': 'Claude Code', '最大子智能体数': '10', '并行模式': '有限并行', '核心方法': '预设工作流' },
                  { '平台': 'Google Antigravity', '最大子智能体数': '—', '并行模式': '研究阶段', '核心方法': '实验性框架' },
                  { '平台': 'Kimi K2.6 (预告)', '最大子智能体数': '300', '并行模式': 'Claw Groups', '核心方法': '扩展 PARL + 分组' },
                ]}
                highlightCol={1}
              />
            </MouseGlowCard>
          </ScrollReveal>

          {/* K2.6 Preview */}
          <ScrollReveal delay={0.2}>
            <div
              className="liquid-glass rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-6"
              style={{ border: '1px solid rgba(61,139,255,0.25)', borderLeft: '3px solid #3D8BFF' }}
            >
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(61,139,255,0.15)', color: '#3D8BFF' }}
              >
                <TrendingUp size={28} />
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-[20px] font-semibold text-white mb-2">
                  K2.6 前瞻：300-Agent Swarms + Claw Groups
                </h3>
                <p className="text-[14px] text-[#8B9EB0] leading-relaxed">
                  Kimi K2.6 将进一步扩展 AgentSwarm 规模至 <strong className="text-[#00E5FF]">300 个并行智能体</strong>，
                  并引入 <strong className="text-[#FF6B6B]">Claw Groups</strong> 分组机制 — 将大型任务分解为多个智能体"爪组"，
                  每组内部高度协作，组间通过 Orchestrator 协调，实现更大规模的分布式智能。
                </p>
              </div>
              <span
                className="text-[12px] font-mono px-3 py-1.5 rounded flex-shrink-0"
                style={{ background: 'rgba(61,139,255,0.15)', color: '#3D8BFF' }}
              >
                Coming Soon
              </span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════ 技术启示 ═══════════════ */}
      <section className="relative z-10 py-[80px] pb-[120px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <span className="section-label block mb-3">[ 技术启示 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-10">
              Kimi 路线图的三大启示
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insightCards.map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.12}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="liquid-glass rounded-xl p-6 md:p-8 h-full flex flex-col"
                  style={{ border: `1px solid ${card.color}25`, borderTop: `3px solid ${card.color}` }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: `${card.color}15`, color: card.color }}
                  >
                    {card.icon}
                  </div>
                  <h3 className="font-heading text-[20px] font-semibold text-white mb-3 leading-tight">
                    {card.title}
                  </h3>
                  <p className="text-[15px] text-[#8B9EB0] leading-[1.7] flex-1">
                    {card.desc}
                  </p>
                  <div className="mt-5 pt-4 border-t border-[rgba(255,255,255,0.06)]">
                    <span
                      className="text-[12px] font-mono px-3 py-1 rounded"
                      style={{ background: `${card.color}15`, color: card.color }}
                    >
                      Insight {i + 1}
                    </span>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom CTA */}
          <ScrollReveal delay={0.3}>
            <div className="mt-16 text-center">
              <p className="text-[18px] text-[#8B9EB0] mb-6">
                Kimi 从 k1.5 到 K2.5 的技术演进，展现了从对话 AI 到自主 Agent 的清晰路径
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <span className="data-tag">Muon 优化器</span>
                <ArrowRight size={14} className="text-[#8B9EB0]" />
                <span className="data-tag">Agentic 数据合成</span>
                <ArrowRight size={14} className="text-[#8B9EB0]" />
                <span className="data-tag">RLVR 强化学习</span>
                <ArrowRight size={14} className="text-[#8B9EB0]" />
                <span className="data-tag">多模态 Agent</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
