import { useRef, useState, useCallback } from 'react'
import { motion, useInView } from 'framer-motion'
import { Brain, Code2, Zap,
  GitBranch, BarChart3, Eye, Target, Cpu, Layers, Sparkles, Award, Globe, Monitor,
  ExternalLink, Lightbulb, Sword, ChevronDown,
  Shield, Compass, Wind, Scroll} from 'lucide-react'
import ParticleCanvas from '@/components/ParticleCanvas'

/* ─────────────────────────────────────────────── */
/*  Animation Variants                             */
/* ─────────────────────────────────────────────── */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }}}

/* ─────────────────────────────────────────────── */
/*  ScrollReveal Wrapper                           */
/* ─────────────────────────────────────────────── */
function ScrollReveal({ children, className = '', delay = 0 }: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={fadeInUp}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ─────────────────────────────────────────────── */
/*  MouseGlowCard                                  */
/* ─────────────────────────────────────────────── */
function MouseGlowCard({ children, className = '', borderColor = 'rgba(61,139,255,0.2)' }: {
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
        background: `radial-gradient(circle at ${glow}, rgba(61,139,255,0.08) 0%, rgba(10,22,40,0.6) 60%), rgba(10,22,40,0.6)`,
        backdropFilter: 'blur(12px) saturate(140%)',
        WebkitBackdropFilter: 'blur(12px) saturate(140%)',
        borderColor}}
    >
      {children}
    </div>
  )
}

/* ─────────────────────────────────────────────── */
/*  Company Data                                   */
/* ─────────────────────────────────────────────── */
const companies = [
  {
    name: 'DeepSeek',
    color: '#3D8BFF',
    colorName: 'blue',
    icon: Brain,
    models: 'V3 / V4 / Pro / Flash / R1',
    specialty: 'MoE + RL + 多模态',
    params: '1.6T',
    desc: '以极致性价比著称，全开源策略引领行业',
    borderColor: 'rgba(61,139,255,0.3)',
    bgGlow: 'rgba(61,139,255,0.06)'},
  {
    name: 'Kimi',
    color: '#FF5252',
    colorName: 'red',
    icon: Zap,
    models: 'K2 / K2.5',
    specialty: 'Agentic + Muon + 视觉原语',
    params: '1T',
    desc: 'Agentic Intelligence先锋，从对话到自主代理',
    borderColor: 'rgba(255,82,82,0.3)',
    bgGlow: 'rgba(255,82,82,0.06)'},
  {
    name: 'GLM',
    color: '#4ECDC4',
    colorName: 'teal',
    icon: Layers,
    models: 'GLM-4 / 4.5 / 5',
    specialty: '自回归填空 + 动态稀疏',
    params: '355B',
    desc: '统一预训练框架先驱，双语能力强',
    borderColor: 'rgba(78,205,196,0.3)',
    bgGlow: 'rgba(78,205,196,0.06)'},
  {
    name: 'MiniMax',
    color: '#ffb84d',
    colorName: 'amber',
    icon: Sparkles,
    models: 'M1 / M2.5',
    specialty: 'Lightning Attention + 真实RL',
    params: '456\u4ebf',
    desc: '真实生产力工具，1美元/小时的智能',
    borderColor: 'rgba(255,184,77,0.3)',
    bgGlow: 'rgba(255,184,77,0.06)'},
  {
    name: 'MiMo',
    color: '#FF6900',
    colorName: 'orange',
    icon: Cpu,
    models: 'MiMo-7B / V2-Flash / V2.5',
    specialty: '混合注意力 + MTP + MOPD',
    params: '1.02T',
    desc: '小米通用智能基座，7B超o1-mini，全栈MIT开源',
    borderColor: 'rgba(255,105,0,0.3)',
    bgGlow: 'rgba(255,105,0,0.06)'},
]

/* ─────────────────────────────────────────────── */
/*  Timeline Data                                  */
/* ─────────────────────────────────────────────── */
const timelineData = [
  {
    company: 'DeepSeek',
    color: '#3D8BFF',
    events: [
      { year: '2023', version: 'V1', params: '7B' },
      { year: '2024', version: 'V2', params: '236B' },
      { year: '2024', version: 'V3', params: '671B' },
      { year: '2025', version: 'V4', params: '1.6T' },
    ]},
  {
    company: 'Kimi',
    color: '#FF5252',
    events: [
      { year: '2024', version: 'k1.5', params: '' },
      { year: '2025', version: 'K2', params: '1T' },
      { year: '2026', version: 'K2.5', params: '' },
    ]},
  {
    company: 'GLM',
    color: '#4ECDC4',
    events: [
      { year: '2021', version: 'GLM', params: '' },
      { year: '2022', version: 'GLM-130B', params: '130B' },
      { year: '2023', version: 'ChatGLM', params: '' },
      { year: '2024', version: 'GLM-4', params: '' },
      { year: '2025', version: 'GLM-4.5', params: '' },
      { year: '2026', version: 'GLM-5', params: '' },
    ]},
  {
    company: 'MiniMax',
    color: '#ffb84d',
    events: [
      { year: '2025', version: 'M1', params: '456\u4ebf' },
      { year: '2026', version: 'M2.5', params: '' },
    ]},
  {
    company: 'MiMo',
    color: '#FF6900',
    events: [
      { year: '2025', version: 'MiMo-7B', params: '7B' },
      { year: '2025', version: 'MiMo-VL', params: '7B' },
      { year: '2025', version: 'Embodied', params: '7B' },
      { year: '2026', version: 'V2-Flash', params: '309B' },
      { year: '2026', version: 'V2.5', params: '1.02T' },
    ]},
]

/* ─────────────────────────────────────────────── */
/*  Comparison Table Data                          */
/* ─────────────────────────────────────────────── */
const comparisonDimensions = [
  { dim: '\u67b6\u6784', deepseek: 'MoE', kimi: 'MoE', glm: 'MoE+DSA', minimax: 'MoE+Lightning', mimo: 'MoE+MTP' },
  { dim: '\u4f18\u5316\u5668', deepseek: 'Muon+AdamW', kimi: 'Muon+MuonClip', glm: '\u5f02\u6b65RL', minimax: 'CISPO+Forge', mimo: 'AdamW+RL' },
  { dim: '\u4e0a\u4e0b\u6587', deepseek: '1M', kimi: '256K', glm: '128K', minimax: '1M', mimo: '256K' },
  { dim: '\u591a\u6a21\u6001', deepseek: 'V4-Pro+VL', kimi: 'K2.5V', glm: 'GLM-4V', minimax: '\u89c4\u5212\u4e2d', mimo: 'MiMo-VL' },
  { dim: 'Agent', deepseek: 'SWE 80.6', kimi: 'Agentic Intelligence', glm: 'All Tools', minimax: '\u771f\u5b9e\u73af\u5883RL', mimo: 'SWE 57.2' },
  { dim: '\u5f00\u6e90', deepseek: '\u5168\u5f00\u6e90', kimi: '\u5f00\u6e90', glm: '\u5f00\u6e90', minimax: '\u5f00\u653e\u6743\u91cd', mimo: '✅ MIT' },
  { dim: '\u6210\u672c', deepseek: '\u6781\u4f4e', kimi: '\u4f4e', glm: '\u4f4e', minimax: '\u6781\u4f4e(1$/hr)', mimo: '\u6781\u4f4e(1$/hr)' },
]

/* ─────────────────────────────────────────────── */
/*  Benchmark Data                                 */
/* ─────────────────────────────────────────────── */
const benchmarkData = [
  { name: 'LiveCodeBench', deepseek: '93.5', kimi: '\u2014', glm: '\u2014', minimax: '\u2014', unit: 'Pass@1' },
  { name: 'SWE-Verified', deepseek: '80.6', kimi: '\u9886\u5148', glm: '\u2014', minimax: '\u9886\u5148', unit: '\u89e3\u7801\u7387' },
  { name: 'Codeforces', deepseek: '3206', kimi: '\u2014', glm: '\u2014', minimax: '\u2014', unit: 'Rating' },
  { name: 'MMLU-Pro', deepseek: '87.5', kimi: '\u2014', glm: '\u2014', minimax: '\u2014', unit: 'EM' },
]

/* ─────────────────────────────────────────────── */
/*  Advantages Data                                */
/* ─────────────────────────────────────────────── */
const advantages = [
  {
    company: 'DeepSeek',
    color: '#3D8BFF',
    title: '\u6781\u81f4\u6027\u4ef7\u6bd4\u4e4b\u738b',
    desc: '\u7528\u6700\u5c11\u7684\u94b1\u505a\u6700\u591a\u7684\u4e8b\uff0c\u5168\u5f00\u6e90\u7b56\u7565\u6253\u7834\u4e86\u5927\u6a21\u578b\u7684\u6210\u672c\u58c1\u5792',
    icon: Award},
  {
    company: 'Kimi',
    color: '#FF5252',
    title: 'Agentic Intelligence\u5148\u950b',
    desc: '\u4ece\u5bf9\u8bdd\u5230\u81ea\u4e3b\u4ee3\u7406\uff0cMuon\u5fc3\u6cd5\u52a0\u6301\uff0c\u5f00\u521bAI Agent\u65b0\u8303\u5f0f',
    icon: Compass},
  {
    company: 'GLM',
    color: '#4ECDC4',
    title: '\u7edf\u4e00\u9884\u8bad\u7ec3\u6846\u67b6\u5148\u9a71',
    desc: '\u81ea\u56de\u5f52\u586b\u7a7a\u4e00\u7edf\u6c5f\u6e56\uff0c\u53cc\u8bed\u80fd\u529b\u5168\u9762\uff0c\u5b66\u672f\u7814\u7a76\u4e0e\u5e94\u7528\u5e76\u91cd',
    icon: Globe},
  {
    company: 'MiniMax',
    color: '#ffb84d',
    title: '\u771f\u5b9e\u751f\u4ea7\u529b\u5de5\u5177',
    desc: '1\u7f8e\u5143/\u5c0f\u65f6\u7684\u667a\u80fd\uff0cLightning Attention\u8ba9\u6548\u7387\u4e0e\u6210\u672c\u8fbe\u5230\u6781\u81f4\u5e73\u8861',
    icon: Monitor},
]

/* ─────────────────────────────────────────────── */
/*  Papers & Open Source Data                      */
/* ─────────────────────────────────────────────── */
const papersData = [
  { company: 'DeepSeek', color: '#3D8BFF', papers: 12, status: '\u5168\u5f00\u6e90' },
  { company: 'Kimi', color: '#FF5252', papers: 6, status: '\u5f00\u6e90' },
  { company: 'GLM', color: '#4ECDC4', papers: 7, status: '\u5f00\u6e90' },
  { company: 'MiniMax', color: '#ffb84d', papers: 3, status: '\u5f00\u653e\u6743\u91cd' },
]

/* ─────────────────────────────────────────────── */
/*  Wuxia Analogy Data                             */
/* ─────────────────────────────────────────────── */
const wuxiaData = [
  {
    company: 'DeepSeek',
    school: '\u5c11\u6797\u6d3e',
    color: '#3D8BFF',
    icon: Shield,
    trait: '\u529f\u529b\u6df1\u539a\uff0c\u5f00\u6e90\u6d4e\u4e16',
    desc: '\u50cf\u5c11\u6797\u4e00\u6837\u529f\u529b\u6df1\u539a\uff0c\u4ee5\u5f00\u6e90\u4e4b\u5fc3\u6d4e\u4e16\u6551\u4eba\uff0c\u8ba9\u5927\u6a21\u578b\u6280\u672f\u60e0\u53ca\u5929\u4e0b\u5f00\u53d1\u8005\u3002\u4eceV1\u5230V4\uff0c\u6b65\u6b65\u4e3a\u8425\uff0c\u7a33\u624e\u7a33\u6253\u3002'},
  {
    company: 'Kimi',
    school: '\u6b66\u5f53\u6d3e',
    color: '#FF5252',
    icon: Sword,
    trait: 'Agentic\u5185\u529f\uff0cMuon\u5fc3\u6cd5',
    desc: '\u6b66\u5f53\u5185\u5bb6\u529f\u6cd5\uff0c\u4ee5Agentic\u4e4b\u9053\u884c\u4e8e\u4e16\u3002Muon\u5fc3\u6cd5\u72ec\u6b65\u5929\u4e0b\uff0c\u4ece\u5bf9\u8bdd\u5230\u81ea\u4e3b\u6267\u884c\uff0c\u5f00\u521bAI Agent\u65b0\u5883\u754c\u3002'},
  {
    company: 'GLM',
    school: '\u5ce8\u7709\u6d3e',
    color: '#4ECDC4',
    icon: Wind,
    trait: '\u7edf\u4e00\u9884\u8bad\u7ec3\u6846\u67b6\uff0c\u53cc\u8bed\u53cc\u4fee',
    desc: '\u5ce8\u7709\u6d3e\u5f92\u5f1f\u7686\u4e3a\u5973\u4e2d\u8c6a\u6770\uff0c\u4ee5\u81ea\u56de\u5f52\u586b\u7a7a\u7edf\u4e00\u6b66\u5b66\u4f53\u7cfb\uff0c\u53cc\u8bed\u4fee\u70bc\uff0c\u5b66\u672f\u7814\u7a76\u4e0e\u5de5\u7a0b\u5e94\u7528\u5e76\u91cd\u3002'},
  {
    company: 'MiniMax',
    school: '\u900d\u9065\u6d3e',
    color: '#ffb84d',
    icon: Scroll,
    trait: '\u8f7b\u91cf\u5316\u8eab\u6cd5\uff0c\u771f\u5b9e\u73af\u5883\u7ec3\u5251',
    desc: '\u900d\u9065\u6d3e\u8eab\u6cd5\u8f7b\u7075\uff0c\u4ee5Lightning Attention\u5feb\u82e5\u95ea\u7535\uff0c\u5728\u771f\u5b9e\u73af\u5883\u4e2d\u7ec3\u5251\u6210\u957f\uff0c1\u7f8e\u5143/\u5c0f\u65f6\u8ba9\u667a\u80fd\u5982\u6c34\u822c\u81ea\u7136\u6d41\u6dcc\u3002'},
  {
    company: 'MiMo',
    school: '\u660e\u6559\u6d3e',
    color: '#FF6900',
    icon: Cpu,
    trait: '\u5168\u6808\u5f00\u6e90\uff0c\u4ee5\u70b9\u5fa1\u884c',
    desc: '\u660e\u6559\u4ee5\u6280\u827a\u5f85\u4e16\uff0c\u4ece7B\u63a8\u7406\u52301T MoE\uff0c\u5168\u6808MIT\u5f00\u6e90\u8ba9\u6280\u672f\u5e7f\u5e03\u5929\u4e0b\u3002\u5c0f\u6a21\u578b\u4e5f\u80fd\u5927\u667a\u6167\uff0c\u6700\u6781\u6027\u4ef7\u6bd4\u5373\u4e3a\u660e\u6559\u4e4b\u9053\u3002'},
]

/* ─────────────────────────────────────────────── */
/*  Main Page Component                            */
/* ─────────────────────────────────────────────── */
export default function ChinaAIOverview() {
  /* ─── Hero ─── */
  const heroRef = useRef<HTMLDivElement>(null)
  const isHeroInView = useInView(heroRef, { once: true })

  /* ─── Company Cards ─── */
  const CompanyCards = () => (
    <section className="relative z-10 w-full py-[100px]">
      <div className="max-w-[1280px] mx-auto px-6">
        <ScrollReveal>
          <span className="section-label block mb-3">[ 五公司概览 ]</span>
          <h2 className="font-heading text-[36px] font-semibold text-white mt-4 leading-[1.3] mb-12">
            中国AI五大门派概览
          </h2>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {companies.map((c, i) => (
            <motion.div
              key={c.name}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <MouseGlowCard
                className="rounded-[12px] p-6 md:p-8 h-full"
                borderColor={c.borderColor}
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${c.color}20`, border: `1px solid ${c.color}40` }}
                  >
                    <c.icon size={24} style={{ color: c.color }} />
                  </div>
                  <div>
                    <h3 className="font-heading text-[24px] font-semibold text-white">
                      {c.name}
                    </h3>
                    <span className="text-[12px] font-mono" style={{ color: c.color }}>
                      {c.specialty}
                    </span>
                  </div>
                </div>

                {/* Models */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Code2 size={14} className="text-[#8B9EB0]" />
                    <span className="text-[12px] text-[#8B9EB0] uppercase tracking-wider">模型</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {c.models.split(' / ').map((m) => (
                      <span
                        key={m}
                        className="text-[13px] px-2.5 py-1 rounded-md font-mono text-white"
                        style={{ background: `${c.color}15`, border: `1px solid ${c.color}30` }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Params */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu size={14} className="text-[#8B9EB0]" />
                    <span className="text-[12px] text-[#8B9EB0] uppercase tracking-wider">总参数</span>
                  </div>
                  <span
                    className="font-heading text-[32px] font-bold"
                    style={{ color: c.color }}
                  >
                    {c.params}
                  </span>
                </div>

                {/* Specialty */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-[#8B9EB0]" />
                    <span className="text-[12px] text-[#8B9EB0] uppercase tracking-wider">特色</span>
                  </div>
                  <p className="text-[15px] text-[#8B9EB0] leading-relaxed">{c.desc}</p>
                </div>

                {/* Tag */}
                <div className="pt-4 border-t border-[rgba(255,255,255,0.08)]">
                  <span className="data-tag">{c.specialty}</span>
                </div>
              </MouseGlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  /* ─── Timeline ─── */
  const TimelineSection = () => (
    <section className="relative z-10 w-full py-[100px]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.03) 0%, transparent 60%)' }}
      />
      <div className="max-w-[1280px] mx-auto px-6 relative">
        <ScrollReveal>
          <span className="section-label block mb-3">[ 参数演进 ]</span>
          <h2 className="font-heading text-[36px] font-semibold text-white mt-4 leading-[1.3] mb-4">
            模型参数演进时间线
          </h2>
          <p className="text-[16px] text-[#8B9EB0] mb-12 max-w-[700px]">
            从2021到2026，中国AI模型参数规模呈指数级增长，技术路线各有特色
          </p>
        </ScrollReveal>

        <div className="space-y-12">
          {timelineData.map((company, ci) => (
            <ScrollReveal key={company.company} delay={ci * 0.1}>
              <div className="liquid-glass rounded-[12px] p-6 md:p-8">
                {/* Company header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ background: company.color, boxShadow: `0 0 8px ${company.color}` }}
                  />
                  <h3 className="font-heading text-[20px] font-semibold text-white">
                    {company.company}
                  </h3>
                </div>

                {/* Horizontal timeline */}
                <div className="relative">
                  {/* Line */}
                  <div className="absolute top-[20px] left-0 right-0 h-px bg-[rgba(255,255,255,0.1)]" />

                  {/* Events */}
                  <div className="flex flex-wrap gap-4 relative z-10">
                    {company.events.map((event, ei) => (
                      <motion.div
                        key={`${company.company}-${event.version}`}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: ei * 0.08, duration: 0.5 }}
                        className="flex flex-col items-center"
                      >
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-[13px] font-bold font-mono text-white mb-2"
                          style={{
                            background: `${company.color}20`,
                            border: `2px solid ${company.color}`,
                            boxShadow: `0 0 12px ${company.color}30`}}
                        >
                          {event.version.charAt(0)}
                        </div>
                        <span className="text-[13px] font-semibold text-white font-mono">
                          {event.version}
                        </span>
                        <span className="text-[11px] text-[#8B9EB0] font-mono mt-0.5">
                          {event.year}
                        </span>
                        {event.params && (
                          <span
                            className="text-[11px] font-mono mt-1 px-1.5 py-0.5 rounded"
                            style={{ background: `${company.color}15`, color: company.color }}
                          >
                            {event.params}
                          </span>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )

  /* ─── Comparison Table ─── */
  const ComparisonTable = () => (
    <section className="relative z-10 w-full py-[100px]">
      <div className="max-w-[1280px] mx-auto px-6">
        <ScrollReveal>
          <span className="section-label block mb-3">[ 技术对比 ]</span>
          <h2 className="font-heading text-[36px] font-semibold text-white mt-4 leading-[1.3] mb-12">
            核心技术特色对比
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="liquid-glass rounded-[12px] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr style={{ background: 'rgba(61,139,255,0.15)' }}>
                    <th className="text-left text-white text-[13px] font-medium px-5 py-4 border-b border-[rgba(61,139,255,0.3)]">
                      <div className="flex items-center gap-2">
                        <Target size={14} className="text-[#00E5FF]" />
                        维度
                      </div>
                    </th>
                    {companies.map((c) => (
                      <th
                        key={c.name}
                        className="text-center text-white text-[13px] font-medium px-4 py-4 border-b border-[rgba(61,139,255,0.3)]"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <c.icon size={14} style={{ color: c.color }} />
                          {c.name}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonDimensions.map((row, ri) => (
                    <motion.tr
                      key={row.dim}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: ri * 0.05, duration: 0.4 }}
                      style={{
                        background: ri % 2 === 0 ? '#0A1628' : '#0D1B2E',
                        borderBottom: '1px solid rgba(255,255,255,0.05)'}}
                    >
                      <td className="px-5 py-4 text-[14px] text-white font-medium">{row.dim}</td>
                      <td className="px-4 py-4 text-center text-[13px] font-mono text-[#3D8BFF]">{row.deepseek}</td>
                      <td className="px-4 py-4 text-center text-[13px] font-mono text-[#FF5252]">{row.kimi}</td>
                      <td className="px-4 py-4 text-center text-[13px] font-mono text-[#4ECDC4]">{row.glm}</td>
                      <td className="px-4 py-4 text-center text-[13px] font-mono text-[#ffb84d]">{row.minimax}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )

  /* ─── Benchmark Comparison ─── */
  const BenchmarkComparison = () => (
    <section className="relative z-10 w-full py-[100px]">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(61,139,255,0.03) 0%, transparent 60%)' }}
      />
      <div className="max-w-[1280px] mx-auto px-6 relative">
        <ScrollReveal>
          <span className="section-label block mb-3">[ 性能基准 ]</span>
          <h2 className="font-heading text-[36px] font-semibold text-white mt-4 leading-[1.3] mb-12">
            关键Benchmark横向对比
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benchmarkData.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="liquid-glass liquid-glass-hover rounded-[12px] p-6 border-t-2"
                style={{ borderTopColor: '#3D8BFF' }}
              >
                <span className="data-tag text-[11px] block w-fit mb-4">{item.unit}</span>
                <h3 className="font-heading text-[18px] text-white mb-3">{item.name}</h3>
                <div className="font-mono text-[36px] text-[#3D8BFF] font-bold mb-2">
                  {item.deepseek}
                </div>
                <div className="space-y-1.5 pt-3 border-t border-[rgba(255,255,255,0.08)]">
                  {[
                    { name: 'DeepSeek V4', value: item.deepseek, color: '#3D8BFF' },
                    { name: 'Kimi K2', value: item.kimi, color: '#FF5252' },
                    { name: 'GLM-5', value: item.glm, color: '#4ECDC4' },
                    { name: 'MiniMax M2.5', value: item.minimax, color: '#ffb84d' },
                  ].map((entry) => (
                    <div key={entry.name} className="flex items-center justify-between">
                      <span className="text-[12px] text-[#8B9EB0]">{entry.name}</span>
                      <span className="text-[13px] font-mono font-semibold" style={{ color: entry.color }}>
                        {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )

  /* ─── Advantages ─── */
  const AdvantagesSection = () => (
    <section className="relative z-10 w-full py-[100px]">
      <div className="max-w-[1280px] mx-auto px-6">
        <ScrollReveal>
          <span className="section-label block mb-3">[ 独特优势 ]</span>
          <h2 className="font-heading text-[36px] font-semibold text-white mt-4 leading-[1.3] mb-12">
            各自独特优势
          </h2>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {advantages.map((a, i) => (
            <motion.div
              key={a.company}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <MouseGlowCard
                className="rounded-[12px] p-6 md:p-8 h-full"
                borderColor={`${a.color}40`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: `${a.color}20`, border: `1px solid ${a.color}40` }}
                  >
                    <a.icon size={24} style={{ color: a.color }} />
                  </div>
                  <div>
                    <h3 className="font-heading text-[20px] font-semibold text-white">{a.title}</h3>
                    <span className="text-[12px] font-mono" style={{ color: a.color }}>{a.company}</span>
                  </div>
                </div>
                <p className="text-[15px] text-[#8B9EB0] leading-relaxed">{a.desc}</p>
              </MouseGlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )

  /* ─── Papers & Open Source ─── */
  const PapersSection = () => {
    const maxPapers = Math.max(...papersData.map((d) => d.papers))

    return (
      <section className="relative z-10 w-full py-[100px]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.03) 0%, transparent 60%)' }}
        />
        <div className="max-w-[1280px] mx-auto px-6 relative">
          <ScrollReveal>
            <span className="section-label block mb-3">[ 开源贡献 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mt-4 leading-[1.3] mb-4">
              论文与开源贡献统计
            </h2>
            <p className="text-[16px] text-[#8B9EB0] mb-12 max-w-[600px]">
              各家公司发表的技术分析论文数量与开源开放程度对比
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <ScrollReveal delay={0.1}>
              <div className="liquid-glass rounded-[12px] p-6 md:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <BarChart3 size={20} className="text-[#00E5FF]" />
                  <h3 className="font-heading text-[18px] font-semibold text-white">技术论文分析数</h3>
                </div>
                <div className="space-y-6">
                  {papersData.map((item, i) => (
                    <motion.div
                      key={item.company}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.5 }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ background: item.color }}
                          />
                          <span className="text-[14px] text-white font-medium">{item.company}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[18px] font-mono font-bold" style={{ color: item.color }}>
                            {item.papers}
                          </span>
                          <span className="text-[12px] text-[#8B9EB0]">篇</span>
                        </div>
                      </div>
                      <div className="relative h-3 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden">
                        <motion.div
                          className="absolute top-0 bottom-0 left-0 rounded-full"
                          style={{ background: item.color }}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(item.papers / maxPapers) * 100}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 + 0.2, duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Open Source Status */}
            <ScrollReveal delay={0.2}>
              <div className="liquid-glass rounded-[12px] p-6 md:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <GitBranch size={20} className="text-[#00E5FF]" />
                  <h3 className="font-heading text-[18px] font-semibold text-white">开源开放程度</h3>
                </div>
                <div className="space-y-4">
                  {papersData.map((item, i) => (
                    <motion.div
                      key={item.company}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      className="flex items-center justify-between p-4 rounded-lg"
                      style={{ background: `${item.color}10`, border: `1px solid ${item.color}25` }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center"
                          style={{ background: `${item.color}20` }}
                        >
                          {companies.find((c) => c.name === item.company)?.icon && (
                            <Eye size={18} style={{ color: item.color }} />
                          )}
                        </div>
                        <div>
                          <span className="text-[15px] text-white font-medium block">{item.company}</span>
                          <span className="text-[12px] text-[#8B9EB0]">{item.papers} 篇分析</span>
                        </div>
                      </div>
                      <span
                        className="text-[13px] px-3 py-1 rounded-full font-medium"
                        style={{
                          background: `${item.color}20`,
                          color: item.color,
                          border: `1px solid ${item.color}40`}}
                      >
                        {item.status}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Total */}
                <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.08)]">
                  <div className="flex items-center justify-between">
                    <span className="text-[14px] text-[#8B9EB0]">合计分析论文</span>
                    <span className="font-heading text-[28px] font-bold text-[#00E5FF]">
                      {papersData.reduce((sum, d) => sum + d.papers, 0)}
                      <span className="text-[14px] text-[#8B9EB0] font-normal ml-2">篇</span>
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    )
  }

  /* ─── Wuxia Analogy ─── */
  const WuxiaSection = () => (
    <section className="relative z-10 w-full py-[100px] pb-[140px]">
      <div className="max-w-[1280px] mx-auto px-6">
        <ScrollReveal>
          <span className="section-label block mb-3">[ 小白科普 ]</span>
          <h2 className="font-heading text-[36px] font-semibold text-white mt-4 leading-[1.3] mb-4">
            什么是中国AI五大门派？
          </h2>
          <p className="text-[16px] text-[#8B9EB0] mb-12 max-w-[700px]">
            用武侠小说的比喻来理解这四家AI公司，让技术选型像选择武功流派一样直观
          </p>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {wuxiaData.map((w, i) => (
            <motion.div
              key={w.company}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <MouseGlowCard
                className="rounded-[12px] p-6 md:p-8 h-full"
                borderColor={`${w.color}35`}
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-5">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ background: `${w.color}20`, border: `1px solid ${w.color}40` }}
                  >
                    <w.icon size={28} style={{ color: w.color }} />
                  </div>
                  <div>
                    <h3 className="font-heading text-[22px] font-semibold text-white">
                      {w.school}
                    </h3>
                    <span className="text-[13px] font-mono" style={{ color: w.color }}>
                      {w.company}
                    </span>
                  </div>
                </div>

                {/* Trait */}
                <div
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-4 text-[13px] font-medium"
                  style={{ background: `${w.color}15`, color: w.color, border: `1px solid ${w.color}30` }}
                >
                  <Sword size={13} />
                  {w.trait}
                </div>

                {/* Description */}
                <p className="text-[15px] text-[#8B9EB0] leading-relaxed">{w.desc}</p>
              </MouseGlowCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary */}
        <ScrollReveal delay={0.3}>
          <div className="mt-10 liquid-glass rounded-[12px] p-6 md:p-8 text-center">
            <Lightbulb size={28} className="text-[#ffb84d] mx-auto mb-4" />
            <p className="text-[18px] text-white font-heading mb-2">
              选模型如选武功，适合自己的才是最好的
            </p>
            <p className="text-[15px] text-[#8B9EB0] max-w-[600px] mx-auto leading-relaxed">
              DeepSeek适合追求极致性价比的开发者，Kimi适合需要Agent能力的场景，
              GLM适合学术研究与双语应用，MiniMax适合预算敏感的生产环境。
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )

  /* ─────────────────────────────────────────────── */
  /*  RENDER                                         */
  /* ─────────────────────────────────────────────── */
  return (
    <div className="min-h-[100dvh] bg-[#050B14] relative">
      {/* Particle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ParticleCanvas />
      </div>

      {/* ── 1. Hero ── */}
      <section
        ref={heroRef}
        className="relative min-h-[100dvh] flex flex-col items-center justify-center px-6 overflow-hidden"
      >
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="relative z-10 text-center"
        >
          <h1 className="font-heading text-[48px] md:text-[72px] font-bold text-white tracking-[-0.02em] leading-[1.1]">
            中国AI技术路线全景
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          className="relative z-10 mt-6 text-center max-w-[700px]"
        >
          <p className="text-[18px] md:text-[22px] text-[#8B9EB0] font-body leading-[1.7]">
            DeepSeek · Kimi · GLM · MiniMax — 四大国产AI公司技术路线深度对比
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="relative z-10 mt-6 flex items-center gap-3"
        >
          <span className="data-tag">深度解析</span>
          <span className="data-tag">2025</span>
        </motion.div>

        {/* Source link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="relative z-10 mt-8"
        >
          <a
            href="https://github.com/HuangOwen/ChinaAI-Roadmaps"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[14px] text-[#8B9EB0] hover:text-[#00E5FF] transition-colors group"
          >
            <GitBranch size={16} />
            <span>数据来源: ChinaAI-Roadmaps GitHub</span>
            <ExternalLink size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.4, duration: 0.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <ChevronDown size={28} className="text-[#00E5FF] animate-float" />
        </motion.div>
      </section>

      {/* ── 2. Company Cards ── */}
      <CompanyCards />

      {/* ── 3. Timeline ── */}
      <TimelineSection />

      {/* ── 4. Comparison Table ── */}
      <ComparisonTable />

      {/* ── 5. Benchmark Comparison ── */}
      <BenchmarkComparison />

      {/* ── 6. Advantages ── */}
      <AdvantagesSection />

      {/* ── 7. Papers & Open Source ── */}
      <PapersSection />

      {/* ── 8. Wuxia Analogy ── */}
      <WuxiaSection />

      <div className="h-20" />
    </div>
  )
}
