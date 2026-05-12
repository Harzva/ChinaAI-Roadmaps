import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router'
import { useRef, useState, useEffect } from 'react'
import { ArrowRight, Cpu, Brain, Layers, Sparkles, BarChart3, BookOpen, GitBranch, ExternalLink, Archive } from 'lucide-react'
import ParticleCanvas from '@/components/ParticleCanvas'

/* ────────────── animations ────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cardHover = {
  scale: 1.02,
  y: -4,
  transition: { duration: 0.3 },
}

const cardTap = { scale: 0.98 }

/* ────────────── counter hook ────────────── */
function useAnimatedCounter(target: number, duration = 1500, inView = false) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])

  return count
}

/* ══════════════ company data ══════════════ */
interface CompanyCardData {
  color: string
  title: string
  subtitle: string
  stats: string
  features: string[]
  link: string
  tags: string[]
  icon: React.ReactNode
}

const companies: CompanyCardData[] = [
  {
    color: '#3D8BFF',
    title: 'DeepSeek',
    subtitle: '极致性价比的MoE架构创新',
    stats: '1.6T 参数 · 384 专家 · 1M 上下文',
    features: ['MoE混合专家', 'CSA/HCA注意力', 'Muon优化器', '多模态'],
    link: '/deepseek',
    tags: ['全开源', '低成本'],
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    color: '#FF6B6B',
    title: 'Kimi',
    subtitle: 'Agentic Intelligence 先锋',
    stats: '1T 参数 · Muon优化 · Agentic',
    features: ['Muon/MuonClip', 'Agentic AI', '视觉原语', 'RLVR'],
    link: '/kimi',
    tags: ['开源', 'Agent'],
    icon: <Brain className="w-6 h-6" />,
  },
  {
    color: '#22c55e',
    title: 'GLM 智谱AI',
    subtitle: '统一预训练框架先驱',
    stats: '355B 参数 · DSA稀疏 · 双语',
    features: ['自回归填空', '动态稀疏注意力', '双语模型', 'All Tools'],
    link: '/glm',
    tags: ['开源', '双语'],
    icon: <Layers className="w-6 h-6" />,
  },
  {
    color: '#f59e0b',
    title: 'MiniMax',
    subtitle: '真实生产力的轻量AI',
    stats: '456亿 参数 · Lightning · 1美元/时',
    features: ['Lightning Attention', 'CISPO优化', '真实RL', '生产力工具'],
    link: '/minimax',
    tags: ['开源', '生产力'],
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    color: '#FF6900',
    title: 'MiMo',
    subtitle: '小米通用智能基座',
    stats: '1.02T 参数 · 7B推理SOTA · MIT开源',
    features: ['混合注意力', 'MTP推测解码', 'MOPD多教师蒸馏', '全栈开源'],
    link: '/mimo',
    tags: ['MIT开源', '性价比'],
    icon: <Cpu className="w-6 h-6" />,
  },
]

/* ══════════════ comparison data ══════════════ */
const comparisonRows = [
  { dim: '架构',       ds: 'MoE (1.6T/384专家)', kimi: 'Dense (1T)',      glm: 'GLM (355B)',         mm: 'Lightning (456亿)' },
  { dim: '优化器',     ds: 'Muon / AdamW',       kimi: 'Muon / MuonClip', glm: 'Adam / AdamW',       mm: 'CISPO / AdamW' },
  { dim: '上下文',     ds: '1,024K tokens',      kimi: '256K tokens',     glm: '128K tokens',        mm: '256K tokens' },
  { dim: '多模态',     ds: '✅ Janus Pro',       kimi: '✅ 视觉原语',      glm: '✅ All Tools',       mm: '✅ 视频/语音' },
  { dim: 'Agent',      ds: '🔶 基础能力',         kimi: '✅ Agentic AI',   glm: '✅ AutoGLM',         mm: '🔶 基础能力' },
  { dim: '开源',       ds: '✅ 全开源',           kimi: '❌ 闭源',         glm: '✅ 开源',           mm: '❌ 闭源' },
  { dim: '特色',       ds: '极致性价比',          kimi: 'Agent智能',        glm: '统一预训练框架',      mm: '真实生产力' },
]

/* ────────────── card glow style helper ────────────── */
function cardGlowStyle(color: string) {
  return {
    boxShadow: `0 0 20px ${color}15, 0 4px 30px ${color}08, inset 0 1px 0 rgba(255,255,255,0.05)`,
  }
}

/* ═══════════════════════════ COMPONENT ═══════════════════════════ */
export default function Home() {
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' })

  const comp1 = useAnimatedCounter(5,  1200, statsInView)
  const comp2 = useAnimatedCounter(11, 1400, statsInView)
  const comp3 = useAnimatedCounter(45, 1400, statsInView)
  const comp4 = useAnimatedCounter(28, 1200, statsInView)

  return (
    <div className="relative min-h-screen bg-[#050B14] overflow-x-hidden">
      {/* ────────────── 1. HERO ────────────── */}
      <section className="relative w-full flex flex-col items-center justify-center text-center px-6 pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        {/* particle bg */}
        <div className="absolute inset-0 z-0">
          <ParticleCanvas />
        </div>

        {/* subtle radial gradient overlay */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(0,85,255,0.08) 0%, transparent 60%)',
          }}
        />

        <motion.div
          className="relative z-10 flex flex-col items-center max-w-4xl mx-auto"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* data tag */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-mono tracking-wide text-[#8B9EB0] liquid-glass"
          >
            <BookOpen className="w-3.5 h-3.5" />
            基于 ChinaAI-Roadmaps 开源仓库 · 45 个论文入口 · 30+ 篇技术文章
          </motion.div>

          {/* main title */}
          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-6"
            style={{
              background: 'linear-gradient(135deg, #0055FF 0%, #00E5FF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            中国AI技术路线分析平台
          </motion.h1>

          {/* subtitle */}
          <motion.p
            variants={fadeUp}
            className="font-body text-lg md:text-xl text-[#8B9EB0] max-w-2xl leading-relaxed mb-10"
          >
            深度解析{' '}
            <span className="text-[#3D8BFF] font-medium">DeepSeek</span> ·{' '}
            <span className="text-[#FF6B6B] font-medium">Kimi</span> ·{' '}
            <span className="text-[#22c55e] font-medium">GLM</span> ·{' '}
            <span className="text-[#f59e0b] font-medium">MiniMax</span>{' '}
            的技术路线、架构创新与性能突破
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/deepseek"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #0055FF 0%, #00E5FF 100%)',
                boxShadow: '0 4px 24px rgba(0,85,255,0.35), 0 0 48px rgba(0,229,255,0.15)',
              }}
            >
              开始探索
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/Harzva/ChinaAI-Roadmaps"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium text-[#8B9EB0] liquid-glass hover:text-[#00E5FF] transition-all duration-300 hover:scale-105"
            >
              <GitBranch className="w-4 h-4" />
              查看仓库
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="downloads.html"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium text-[#8B9EB0] liquid-glass hover:text-[#00E5FF] transition-all duration-300 hover:scale-105"
            >
              <Archive className="w-4 h-4" />
              论文下载
              <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ────────────── 2. COMPANY CARDS (2×2) ────────────── */}
      <section className="relative z-10 px-6 md:px-12 pb-24">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          {/* section header */}
          <motion.div variants={fadeUp} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-mono tracking-wide text-[#8B9EB0] liquid-glass">
              <BarChart3 className="w-3.5 h-3.5" />
              五大AI公司
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
              选择一家AI公司深入了解
            </h2>
            <p className="font-body text-[#8B9EB0] text-base max-w-lg mx-auto">
              每个卡片通往独立的技术路线分析页面，涵盖架构设计、训练方法、性能基准等深度内容
            </p>
          </motion.div>

          {/* 2×2 grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.map((c) => (
              <motion.div key={c.title} variants={fadeUp} whileHover={cardHover} whileTap={cardTap}>
                <Link
                  to={c.link}
                  className="group block relative rounded-2xl overflow-hidden transition-all duration-300"
                  style={cardGlowStyle(c.color)}
                >
                  {/* top border line */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px] z-10"
                    style={{ background: `linear-gradient(90deg, ${c.color}00, ${c.color}, ${c.color}00)` }}
                  />

                  {/* liquid glass body */}
                  <div className="liquid-glass relative p-6 md:p-7">
                    {/* header row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-11 h-11 rounded-xl flex items-center justify-center"
                          style={{
                            background: `${c.color}18`,
                            color: c.color,
                            boxShadow: `0 0 12px ${c.color}20`,
                          }}
                        >
                          {c.icon}
                        </div>
                        <div>
                          <h3 className="font-heading text-xl font-bold text-white leading-tight">
                            {c.title}
                          </h3>
                          <p className="text-xs font-mono text-[#8B9EB0] mt-0.5">{c.stats}</p>
                        </div>
                      </div>
                      {/* tags */}
                      <div className="flex gap-1.5 flex-shrink-0 ml-3">
                        {c.tags.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded-md text-[10px] font-semibold font-mono"
                            style={{
                              color: c.color,
                              background: `${c.color}15`,
                              border: `1px solid ${c.color}30`,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* subtitle */}
                    <p className="font-body text-sm text-[#8B9EB0] mb-5 leading-relaxed">{c.subtitle}</p>

                    {/* feature list */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {c.features.map((f) => (
                        <div
                          key={f}
                          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono text-white/80"
                          style={{ background: 'rgba(255,255,255,0.04)' }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ backgroundColor: c.color, boxShadow: `0 0 6px ${c.color}60` }}
                          />
                          {f}
                        </div>
                      ))}
                    </div>

                    {/* bottom link */}
                    <div className="flex items-center gap-1.5 text-sm font-semibold transition-colors duration-300 group-hover:opacity-100"
                      style={{ color: c.color }}
                    >
                      深入了解
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* hover glow ring */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 60px ${c.color}10, 0 0 40px ${c.color}12`,
                    }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ────────────── 3. PLATFORM STATS ────────────── */}
      <section ref={statsRef} className="relative z-10 px-6 md:px-12 pb-24">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeUp}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
          >
            {[
              { value: comp1, suffix: '', label: '家AI公司', color: '#3D8BFF', icon: <Cpu className="w-5 h-5" /> },
              { value: comp2, suffix: '', label: '款模型深度解析', color: '#FF6B6B', icon: <Brain className="w-5 h-5" /> },
              { value: comp3, suffix: '', label: '个论文下载入口', color: '#22c55e', icon: <BookOpen className="w-5 h-5" /> },
              { value: comp4, suffix: '', label: '项基准测试', color: '#f59e0b', icon: <BarChart3 className="w-5 h-5" /> },
            ].map((s) => (
              <motion.div
                key={s.label}
                className="relative rounded-2xl p-5 md:p-6 text-center liquid-glass overflow-hidden"
                variants={fadeUp}
              >
                {/* subtle top glow */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
                    opacity: 0.4,
                  }}
                />

                <div
                  className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 mx-auto"
                  style={{ background: `${s.color}15`, color: s.color }}
                >
                  {s.icon}
                </div>
                <div
                  className="font-heading text-3xl md:text-4xl font-bold tracking-tight mb-1"
                  style={{ color: s.color }}
                >
                  {s.value}{s.suffix}
                </div>
                <div className="font-body text-xs text-[#8B9EB0] leading-relaxed">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ────────────── 4. COMPARISON TABLE ────────────── */}
      <section className="relative z-10 px-6 md:px-12 pb-24">
        <motion.div
          className="max-w-5xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          {/* section header */}
          <motion.div variants={fadeUp} className="text-center mb-10">
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full text-xs font-mono tracking-wide text-[#8B9EB0] liquid-glass">
              <Layers className="w-3.5 h-3.5" />
              横向对比
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
              五大AI公司技术对比
            </h2>
            <p className="font-body text-[#8B9EB0] text-base max-w-lg mx-auto">
              一图看清各公司在架构、优化器、上下文等维度的差异与特色
            </p>
          </motion.div>

          {/* table */}
          <motion.div
            variants={fadeUp}
            className="rounded-2xl overflow-hidden liquid-glass"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-4 py-3.5 text-left text-xs font-mono font-semibold text-[#8B9EB0] tracking-wide w-20">
                      维度
                    </th>
                    {[
                      { name: 'DeepSeek', color: '#3D8BFF' },
                      { name: 'Kimi',     color: '#FF6B6B' },
                      { name: 'GLM',      color: '#22c55e' },
                      { name: 'MiniMax',  color: '#f59e0b' },
                    ].map((h) => (
                      <th key={h.name} className="px-4 py-3.5 text-center">
                        <span
                          className="inline-block px-3 py-1 rounded-lg text-xs font-bold font-heading"
                          style={{
                            color: h.color,
                            background: `${h.color}12`,
                            border: `1px solid ${h.color}20`,
                          }}
                        >
                          {h.name}
                        </span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr
                      key={row.dim}
                      className={i < comparisonRows.length - 1 ? 'border-b border-white/[0.03]' : ''}
                    >
                      <td className="px-4 py-3.5">
                        <span className="text-xs font-mono font-semibold text-[#8B9EB0] tracking-wide">
                          {row.dim}
                        </span>
                      </td>
                      {[
                        { val: row.ds,  color: '#3D8BFF' },
                        { val: row.kimi, color: '#FF6B6B' },
                        { val: row.glm,  color: '#22c55e' },
                        { val: row.mm,   color: '#f59e0b' },
                      ].map((cell) => (
                        <td key={cell.val} className="px-4 py-3.5 text-center">
                          <span className="text-xs font-mono text-white/80 leading-relaxed">
                            {cell.val}
                          </span>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ────────────── 5. FOOTER QUOTE ────────────── */}
      <section className="relative z-10 px-6 md:px-12 pb-16">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="relative rounded-2xl p-8 md:p-12 liquid-glass">
            {/* decorative top border */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px]"
              style={{
                background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)',
                opacity: 0.6,
              }}
            />

            {/* quote icon */}
            <div
              className="text-5xl font-serif leading-none mb-6 select-none"
              style={{ color: '#00E5FF30' }}
            >
              "
            </div>

            <p className="font-body text-base md:text-lg text-white/90 leading-[1.8] mb-6">
              从 <span className="text-[#3D8BFF] font-medium">DeepSeek</span> 的极致性价比到{' '}
              <span className="text-[#FF6B6B] font-medium">Kimi</span> 的 Agentic Intelligence，
              从 <span className="text-[#22c55e] font-medium">GLM</span> 的统一预训练到{' '}
              <span className="text-[#f59e0b] font-medium">MiniMax</span> 的真实生产力——
              中国AI正在走出一条独特的技术路线。
            </p>

            <a
              href="https://github.com/Harzva/ChinaAI-Roadmaps"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-[#8B9EB0] hover:text-[#00E5FF] transition-colors duration-300"
            >
              <GitBranch className="w-3 h-3" />
              github.com/Harzva/ChinaAI-Roadmaps
              <ExternalLink className="w-3 h-3" />
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* bottom spacer */}
      <div className="h-8" />
    </div>
  )
}
