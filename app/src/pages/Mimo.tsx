import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Zap, Cpu, Brain, Eye, Bot, BarChart3,
  GitBranch, BookOpen, ExternalLink, ArrowRight,
  FileText, Download,
  Globe, Link,
} from 'lucide-react'
import ParticleCanvas from '@/components/ParticleCanvas'

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5 },
  }),
}

/* ─── 论文数据（含PDF下载链接）─── */
const papers = [
  {
    title: 'MiMo: Unlocking the Reasoning Potential of Language Model',
    date: '2025-05',
    arxiv: '2505.07608',
    pdfUrl: 'https://arxiv.org/pdf/2505.07608',
    absUrl: 'https://arxiv.org/abs/2505.07608',
    github: 'https://github.com/XiaomiMiMo/MiMo',
    desc: 'MiMo-7B系列技术报告。7B参数超越o1-mini，AIME 55.4%，LiveCodeBench 49.3%。',
    tags: ['MiMo-7B', '推理模型', 'RL'],
    color: '#FF6900',
  },
  {
    title: 'MiMo-VL Technical Report',
    date: '2025-06',
    arxiv: '2506.03569',
    pdfUrl: 'https://arxiv.org/pdf/2506.03569',
    absUrl: 'https://arxiv.org/abs/2506.03569',
    github: 'https://github.com/XiaomiMiMo/MiMo-VL',
    desc: 'MiMo-VL-7B视觉语言模型。2.4T tokens预训练，MORL强化学习，40+任务SOTA。',
    tags: ['MiMo-VL', '多模态', 'VLM'],
    color: '#FF6900',
  },
  {
    title: 'MiMo-V2-Flash Technical Report',
    date: '2026-01',
    arxiv: '2601.02780',
    pdfUrl: 'https://arxiv.org/pdf/2601.02780',
    absUrl: 'https://arxiv.org/abs/2601.02780',
    github: 'https://github.com/XiaomiMiMo/MiMo-V2-Flash',
    desc: '309B总/15B激活MoE模型。混合注意力5:1，MOPD多教师蒸馏，MTP推测解码2.6×加速。',
    tags: ['MiMo-V2-Flash', 'MoE', 'MIT开源'],
    color: '#FF6900',
  },
  {
    title: 'MiMo-VL-Miloco Technical Report',
    date: '2025-12',
    arxiv: '2512.17436',
    pdfUrl: 'https://arxiv.org/pdf/2512.17436',
    absUrl: 'https://arxiv.org/abs/2512.17436',
    github: 'https://github.com/XiaomiMiMo/MiMo-VL-Miloco',
    desc: '智能家居视觉语言模型。手势识别、家庭场景理解，Video-MME/Video-MMMU领先。',
    tags: ['MiMo-VL-Miloco', '智能家居', '视频'],
    color: '#FF6900',
  },
  {
    title: 'X-Embodied Foundation Model Technical Report',
    date: '2025-11',
    arxiv: '2511.16518',
    pdfUrl: 'https://arxiv.org/pdf/2511.16518',
    absUrl: 'https://arxiv.org/abs/2511.16518',
    github: 'https://github.com/XiaomiMiMo/MiMo-Embodied',
    desc: '跨具身基础模型。17个具身AI基准+12个自动驾驶基准SOTA，Agent与AD正迁移。',
    tags: ['MiMo-Embodied', '具身智能', '自动驾驶'],
    color: '#FF6900',
  },
]

/* ─── 模型家族数据 ─── */
const modelFamily = [
  { name: 'MiMo-7B', year: '2025-05', params: '7B', type: 'Dense', context: '128K', highlight: '首个推理模型，超o1-mini', color: '#FF6900' },
  { name: 'MiMo-VL-7B', year: '2025-06', params: '7B', type: 'VLM', context: '32K', highlight: '视觉语言SOTA', color: '#FF8C42' },
  { name: 'MiMo-Embodied', year: '2025-11', params: '7B', type: 'VLM', context: '32K', highlight: '跨具身基础模型', color: '#FFB347' },
  { name: 'MiMo-VL-Miloco', year: '2025-12', params: '7B', type: 'VLM', context: '32K', highlight: '智能家居专用', color: '#FF6900' },
  { name: 'MiMo-V2-Flash', year: '2026-01', params: '309B/15B', type: 'MoE', context: '256K', highlight: '高效MoE+MIT开源', color: '#FF8C42' },
  { name: 'MiMo-V2.5', year: '2026-04', params: '1.02T/42B', type: 'MoE', context: '256K', highlight: 'Agentic+多模态', color: '#FF6900' },
]

/* ─── Benchmark数据 ─── */
const benchmarks = [
  { task: 'AIME 2025', model: 'MiMo-7B-RL', score: '55.4%', baseline: 'o1-mini: ~50%', highlight: true },
  { task: 'LiveCodeBench v6', model: 'MiMo-7B-RL', score: '49.3%', baseline: 'o1-mini: ~45%', highlight: true },
  { task: 'GPQA Diamond', model: 'MiMo-7B-RL', score: '54.4%', baseline: 'o1-mini: ~50%', highlight: true },
  { task: 'OSWorld-G (GUI)', model: 'MiMo-VL-7B-RL', score: '56.1', baseline: 'UI-TARS: ~55', highlight: true },
  { task: 'OlympiadBench', model: 'MiMo-VL-7B-RL', score: '59.4', baseline: 'Qwen2.5-VL-7B: ~55', highlight: true },
  { task: 'SWE-bench Pro', model: 'MiMo-V2.5', score: '57.2%', baseline: 'Claude: ~50%', highlight: true },
  { task: 'Video-MME', model: 'MiMo-VL-Miloco', score: 'SOTA', baseline: '-', highlight: true },
]

function PaperCard({ paper, index }: { paper: typeof papers[0]; index: number }) {
  return (
    <motion.div
      variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }} custom={index}
      className="liquid-glass rounded-2xl p-6 hover:scale-[1.01] transition-transform"
      style={{ borderLeft: `3px solid ${paper.color}` }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-heading text-[16px] font-semibold text-white mb-1 leading-snug">{paper.title}</h3>
          <div className="flex items-center gap-2 text-[12px] text-[#8B9EB0]">
            <span>arXiv:{paper.arxiv}</span>
            <span>·</span>
            <span>{paper.date}</span>
          </div>
        </div>
        <a href={paper.pdfUrl} target="_blank" rel="noopener noreferrer"
          className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-semibold text-white transition-colors"
          style={{ background: paper.color }}>
          <Download size={13} /> PDF
        </a>
      </div>
      <p className="font-body text-[14px] text-[#8B9EB0] leading-[1.6] mb-4">{paper.desc}</p>
      <div className="flex items-center gap-3 flex-wrap">
        {paper.tags.map((tag) => (
          <span key={tag} className="data-tag">{tag}</span>
        ))}
        <div className="ml-auto flex items-center gap-3">
          <a href={paper.absUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[12px] text-[#00E5FF] hover:underline">
            <FileText size={12} /> arXiv
          </a>
          <a href={paper.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[12px] text-[#8B9EB0] hover:text-white transition-colors">
            <BookOpen size={12} /> GitHub
          </a>
        </div>
      </div>
    </motion.div>
  )
}

export default function Mimo() {
  const [activeTab, setActiveTab] = useState<'models' | 'papers' | 'tech'>('models')
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-[100dvh] bg-[#050B14] text-white">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[55vh] flex flex-col items-center justify-center pt-32 pb-16 px-6">
        <ParticleCanvas />
        <div className="relative z-10 max-w-[900px] mx-auto text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }} className="section-label inline-block mb-6">
            小米 · MiMo 大模型技术路线深度解析
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-[42px] md:text-[56px] font-medium tracking-tight leading-[1.1] mb-6">
            <span className="text-[#FF6900]">MiMo</span>{' '}
            <span className="bg-gradient-to-r from-[#FF6900] to-[#FFB347] bg-clip-text text-transparent">小米通用智能基座</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-[18px] text-[#8B9EB0] leading-[1.7] max-w-[700px] mx-auto mb-8">
            从7B推理模型到1T MoE Agent架构，从视觉语言到跨具身智能——
            小米MiMo用<span className="text-[#FF6900]">极致性价比</span>重新定义开源大模型
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex justify-center gap-4 flex-wrap">
            <a href="https://mimo.xiaomi.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[#050B14] font-body text-[15px] font-semibold transition-colors"
              style={{ background: '#FF6900' }}>
              官网 <ExternalLink size={16} />
            </a>
            <a href="https://github.com/XiaomiMiMo" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl liquid-glass text-[#8B9EB0] font-body text-[15px] hover:text-white transition-colors">
              GitHub <BookOpen size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { label: '技术报告', value: '5', unit: '篇', color: '#FF6900', desc: '全部开源可下载' },
            { label: '模型版本', value: '7+', unit: '款', color: '#FF8C42', desc: '从7B到1T MoE' },
            { label: 'MiMo-7B-RL AIME', value: '55.4', unit: '%', color: '#FFB347', desc: '超越o1-mini' },
            { label: '开源协议', value: 'MIT', unit: '', color: '#FF6900', desc: 'V2-Flash完全开源' },
          ].map((s, i) => (
            <motion.div key={i} variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }} custom={i}
              className="liquid-glass rounded-2xl p-5 text-center" style={{ borderTop: `3px solid ${s.color}` }}>
              <div className="font-heading text-[14px] text-[#8B9EB0] mb-2">{s.label}</div>
              <div className="font-heading text-[32px] font-bold" style={{ color: s.color }}>{s.value}<span className="text-[16px]">{s.unit}</span></div>
              <div className="text-[12px] text-[#8B9EB0] mt-1">{s.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── 小白导航 ─── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-16">
        <motion.h2 variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }} custom={0}
          className="font-heading text-[32px] font-semibold text-white mb-8">🔰 小白导航</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { emoji: '🧠', title: 'MiMo-7B推理模型是什么？', icon: Brain,
              text: <>想象一个学生考试：传统大模型像<strong className="text-[#FF6900]">死记硬背</strong>的学生，看到题直接套答案。MiMo-7B像<strong className="text-[#FF6900]">会思考</strong>的学生——先分析题目，列步骤，再推导答案。MiMo-7B只有<span className="text-[#FFB347]">7B参数</span>，但通过RL强化学习训练，数学和代码推理能力超越了<span className="text-white">OpenAI o1-mini</span>！</>, color: '#FF6900' },
            { emoji: '👁️', title: 'MiMo-VL视觉语言模型', icon: Eye,
              text: <>MiMo-VL就像给MiMo装上了<strong className="text-[#FF6900]">眼睛</strong>。它不仅能看懂图片，还能理解图片和文字之间的关系。核心技术：<strong className="text-[#FF6900]">四阶段预训练</strong>（2.4T tokens）+<strong className="text-[#FF8C42]">MORL混合强化学习</strong>，在GUI交互上达到<span className="text-white">OSWorld-G 56.1</span>，超过专用模型UI-TARS！</>, color: '#FF8C42' },
            { emoji: '⚡', title: 'MiMo-V2-Flash高效MoE', icon: Zap,
              text: <>V2-Flash是MiMo的<strong className="text-[#FF6900]">速度之王</strong>：总参数309B，推理只激活<span className="text-[#FFB347]">15B</span>。秘诀有三：①<strong className="text-[#FF6900]">混合注意力</strong>（SWA:GA=5:1）大幅降低KV Cache ②<strong className="text-[#FF8C42]">MTP推测解码</strong>加速2.6× ③<strong className="text-[#FFB347]">MOPD多教师蒸馏</strong>同时掌握多个领域专家能力。</>, color: '#FFB347' },
            { emoji: '🤖', title: 'MiMo-V2.5 Agentic架构', icon: Bot,
              text: <>V2.5是MiMo的<strong className="text-[#FF6900]">完全体</strong>：<span className="text-[#FFB347]">1.02T总参数/42B激活</span>，SWE-bench Pro <span className="text-white">57.2%</span>超越Claude。Agentic架构让模型能<strong className="text-[#FF6900]">自主规划</strong>、<strong className="text-[#FF8C42]">调用工具</strong>、<strong className="text-[#FFB347]">长程执行</strong>。输入1$/百万token，输出3$/百万token——极致性价比！</>, color: '#FF6900' },
          ].map((card, i) => (
            <motion.div key={i} variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }} custom={i}
              className="liquid-glass rounded-2xl p-6" style={{ borderTop: `3px solid ${card.color}` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${card.color}15` }}>
                  <card.icon size={20} style={{ color: card.color }} />
                </div>
                <h3 className="font-heading text-[18px] font-semibold text-white">{card.emoji} {card.title}</h3>
              </div>
              <div className="font-body text-[15px] text-[#8B9EB0] leading-[1.7]">{card.text}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ─── TABS ─── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-16">
        <div className="flex gap-2 mb-8 flex-wrap">
          {[
            { key: 'models', label: '🏗️ 模型家族', desc: '7+款模型演进' },
            { key: 'papers', label: '📄 技术报告', desc: '5篇论文+PDF' },
            { key: 'tech', label: '🔬 核心技术', desc: '架构+训练+推理' },
          ].map((t) => (
            <button key={t.key} onClick={() => setActiveTab(t.key as typeof activeTab)}
              className={`px-5 py-3 rounded-xl font-body text-[14px] transition-all cursor-pointer ${activeTab === t.key ? 'font-semibold text-[#050B14]' : 'text-[#8B9EB0] hover:text-white'}`}
              style={activeTab === t.key ? { background: '#FF6900' } : { background: 'rgba(255,255,255,0.05)' }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Tab: 模型家族 */}
        {activeTab === 'models' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="liquid-glass rounded-2xl p-6 overflow-x-auto mb-8">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.1)]">
                    <th className="py-3 px-4 text-[#8B9EB0] font-body text-[14px]">模型</th>
                    <th className="py-3 px-4 text-[#8B9EB0] font-body text-[14px]">发布时间</th>
                    <th className="py-3 px-4 text-[#8B9EB0] font-body text-[14px]">参数</th>
                    <th className="py-3 px-4 text-[#8B9EB0] font-body text-[14px]">架构</th>
                    <th className="py-3 px-4 text-[#8B9EB0] font-body text-[14px]">上下文</th>
                    <th className="py-3 px-4 text-[#FF6900] font-body text-[14px]">核心亮点</th>
                  </tr>
                </thead>
                <tbody>
                  {modelFamily.map((m, i) => (
                    <tr key={i} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)]">
                      <td className="py-3 px-4 font-heading text-[14px] font-semibold" style={{ color: m.color }}>{m.name}</td>
                      <td className="py-3 px-4 font-body text-[14px] text-[#8B9EB0]">{m.year}</td>
                      <td className="py-3 px-4 font-mono text-[14px] text-white">{m.params}</td>
                      <td className="py-3 px-4 font-body text-[14px] text-[#8B9EB0]">{m.type}</td>
                      <td className="py-3 px-4 font-mono text-[14px] text-[#8B9EB0]">{m.context}</td>
                      <td className="py-3 px-4 font-body text-[14px] text-[#FF6900]">{m.highlight}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 演进时间线 */}
            <div className="liquid-glass rounded-2xl p-8">
              <h3 className="font-heading text-[22px] font-semibold text-white mb-6">📅 MiMo 演进时间线</h3>
              <div className="flex flex-wrap items-center gap-3 justify-center">
                {[
                  { year: '2025.05', model: 'MiMo-7B', desc: '首个推理模型', color: '#FF6900' },
                  { year: '2025.06', model: 'MiMo-VL', desc: '视觉语言', color: '#FF8C42' },
                  { year: '2025.11', model: 'Embodied', desc: '跨具身', color: '#FFB347' },
                  { year: '2025.12', model: 'VL-Miloco', desc: '智能家居', color: '#FF6900' },
                  { year: '2026.01', model: 'V2-Flash', desc: '309B MoE MIT', color: '#FF8C42' },
                  { year: '2026.04', model: 'V2.5', desc: '1T Agentic', color: '#FF6900' },
                ].map((item, i, arr) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="text-center px-3 py-2 rounded-xl" style={{ background: `${item.color}10`, border: `1px solid ${item.color}25` }}>
                      <div className="text-[11px] text-[#8B9EB0]">{item.year}</div>
                      <div className="font-heading text-[15px] font-semibold" style={{ color: item.color }}>{item.model}</div>
                      <div className="text-[11px] text-[#8B9EB0]">{item.desc}</div>
                    </div>
                    {i < arr.length - 1 && <ArrowRight size={14} className="text-[#8B9EB0] opacity-30" />}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab: 论文 */}
        {activeTab === 'papers' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="mb-6 p-4 rounded-xl bg-[rgba(255,105,0,0.08)] border border-[rgba(255,105,0,0.15)]">
              <p className="text-[#FF6900] font-body text-[14px] flex items-center gap-2">
                <BookOpen size={16} /> 以下5篇技术报告均来自小米LLM-Core团队，所有PDF均可免费下载
              </p>
            </div>
            <div className="space-y-4">
              {papers.map((p, i) => (
                <PaperCard key={p.arxiv} paper={p} index={i} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Tab: 核心技术 */}
        {activeTab === 'tech' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 架构创新 */}
              <motion.div variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }}
                className="liquid-glass rounded-2xl p-6" style={{ borderTop: '3px solid #FF6900' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FF690015] flex items-center justify-center"><Cpu size={20} className="text-[#FF6900]" /></div>
                  <h3 className="font-heading text-[18px] font-semibold text-white">架构创新</h3>
                </div>
                <div className="space-y-3 text-[14px] text-[#8B9EB0] font-body leading-[1.7]">
                  <p><strong className="text-[#FF6900]">混合注意力(SWA:GA=5:1)</strong>：V2-Flash以5:1比例交替滑动窗口和全局注意力，窗口仅128 token，大幅降低KV Cache</p>
                  <p><strong className="text-[#FF6900]">MTP多Token预测</strong>：轻量级MTP模块作为推测解码草稿模型，推理加速<span className="text-white">2.6×</span></p>
                  <p><strong className="text-[#FF6900]">Attention Sink Bias</strong>：可学习的注意力偏置，维持长文性能</p>
                </div>
              </motion.div>

              {/* 训练创新 */}
              <motion.div variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }}
                className="liquid-glass rounded-2xl p-6" style={{ borderTop: '3px solid #FF8C42' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FF8C4215] flex items-center justify-center"><GitBranch size={20} className="text-[#FF8C42]" /></div>
                  <h3 className="font-heading text-[18px] font-semibold text-white">训练创新</h3>
                </div>
                <div className="space-y-3 text-[14px] text-[#8B9EB0] font-body leading-[1.7]">
                  <p><strong className="text-[#FF8C42]">MOPD多教师蒸馏</strong>：通用SFT→领域专家RL→学生MOPD，解决模型合并能力互斥问题</p>
                  <p><strong className="text-[#FF8C42]">R3路由回放</strong>：Rollout Routing Replay解决MoE在RL训练中的路由不一致</p>
                  <p><strong className="text-[#FF8C42]">四阶段VLM预训练</strong>：投影预热→视觉对齐→多模态预训练→长上下文SFT</p>
                </div>
              </motion.div>

              {/* 推理优化 */}
              <motion.div variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }}
                className="liquid-glass rounded-2xl p-6" style={{ borderTop: '3px solid #FFB347' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FFB34715] flex items-center justify-center"><Zap size={20} className="text-[#FFB347]" /></div>
                  <h3 className="font-heading text-[18px] font-semibold text-white">推理优化</h3>
                </div>
                <div className="space-y-3 text-[14px] text-[#8B9EB0] font-body leading-[1.7]">
                  <p><strong className="text-[#FFB347]">推测解码</strong>：MTP作为草稿模型，3.6平均接受长度，<span className="text-white">2.6×</span>解码加速</p>
                  <p><strong className="text-[#FFB347]">Token效率</strong>：V2.5比同类模型少<span className="text-white">40%-60%</span> token消耗</p>
                  <p><strong className="text-[#FFB347]">极致定价</strong>：输入1$/M tokens，输出3$/M tokens，1美元/小时GPU</p>
                </div>
              </motion.div>
            </div>

            {/* Benchmark表 */}
            <motion.div variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }}
              className="liquid-glass rounded-2xl p-6 mt-8 overflow-x-auto">
              <h3 className="font-heading text-[22px] font-semibold text-white mb-4 flex items-center gap-2">
                <BarChart3 size={22} className="text-[#FF6900]" /> 关键Benchmark成绩
              </h3>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[rgba(255,255,255,0.1)]">
                    <th className="py-3 px-4 text-[#8B9EB0] font-body text-[14px]">Benchmark</th>
                    <th className="py-3 px-4 text-[#FF6900] font-body text-[14px]">MiMo成绩</th>
                    <th className="py-3 px-4 text-[#8B9EB0] font-body text-[14px]">对比基准</th>
                  </tr>
                </thead>
                <tbody>
                  {benchmarks.map((b, i) => (
                    <tr key={i} className="border-b border-[rgba(255,255,255,0.05)]">
                      <td className="py-3 px-4 font-body text-[14px] text-white">{b.task}</td>
                      <td className="py-3 px-4 font-mono text-[14px] font-semibold text-[#FF6900]">{b.score}</td>
                      <td className="py-3 px-4 font-body text-[14px] text-[#8B9EB0]">{b.baseline}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.div>
        )}
      </section>

            {/* ─── 子站导航 ─── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-16">
        <motion.h2 variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }} custom={0}
          className="font-heading text-[32px] font-semibold text-white mb-8">📂 MiMo 子站导航</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <Link to="/mimo/architecture" className="block liquid-glass rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-300 cursor-pointer group" style={{ borderTop: '3px solid #FF6900' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#FF690015]"><Cpu size={18} className="text-[#FF6900]" /></div>
                <h3 className="font-heading text-[16px] font-semibold text-white">架构解析</h3>
              </div>
              <ArrowRight size={16} className="text-[#8B9EB0] group-hover:text-[#FF6900] group-hover:translate-x-1 transition-all" />
            </div>
            <p className="font-body text-[13px] text-[#8B9EB0]">混合注意力5:1 · MTP推测解码 · MOPD蒸馏 · R3路由</p>
          </Link>
          <Link to="/mimo/benchmarks" className="block liquid-glass rounded-2xl p-5 hover:scale-[1.02] transition-transform duration-300 cursor-pointer group" style={{ borderTop: '3px solid #FF6900' }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#FF690015]"><BarChart3 size={18} className="text-[#FF6900]" /></div>
                <h3 className="font-heading text-[16px] font-semibold text-white">性能基准</h3>
              </div>
              <ArrowRight size={16} className="text-[#8B9EB0] group-hover:text-[#FF6900] group-hover:translate-x-1 transition-all" />
            </div>
            <p className="font-body text-[13px] text-[#8B9EB0]">AIME · LiveCodeBench · 7B超o1-mini · 性价比</p>
          </Link>
        </div>
      </section>

{/* ─── 技术启示 ─── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <motion.h2 variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }} custom={0}
          className="font-heading text-[32px] font-semibold text-white mb-8">💡 技术启示</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: '小模型也能大智慧', desc: 'MiMo-7B仅用7B参数，通过精心设计的预训练+RL流程，推理能力超越o1-mini。证明模型质量不只看大小，更看训练质量。', color: '#FF6900' },
            { title: '全栈开源生态', desc: '从7B到1T、从语言到视觉到具身、从Dense到MoE——MiMo构建了中国最完整的开源大模型矩阵，MIT协议完全开放。', color: '#FF8C42' },
            { title: '性价比驱动创新', desc: '混合注意力、MTP推测解码、MOPD蒸馏——每项创新都围绕"更快、更省、更强"。1美元/小时GPU成本重新定义AI定价。', color: '#FFB347' },
          ].map((item, i) => (
            <motion.div key={i} variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }} custom={i}
              className="liquid-glass rounded-2xl p-6" style={{ borderLeft: `4px solid ${item.color}` }}>
              <h4 className="font-heading text-[18px] font-semibold text-white mb-3">{item.title}</h4>
              <p className="text-[#8B9EB0] font-body text-[14px] leading-[1.7]">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 引用 */}
        <motion.div variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }}
          className="mt-12 liquid-glass rounded-2xl p-8 text-center">
          <h3 className="font-heading text-[20px] font-semibold text-white mb-4">📚 资料来源</h3>
          <div className="flex flex-wrap justify-center gap-4 text-[14px]">
            <a href="https://mimo.xiaomi.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#FF6900] hover:underline">
              <Globe size={14} /> MiMo官网
            </a>
            <a href="https://github.com/XiaomiMiMo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#8B9EB0] hover:text-white transition-colors">
              <BookOpen size={14} /> GitHub组织
            </a>
            <a href="https://arxiv.org/list/cs.CL/recent" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#8B9EB0] hover:text-white transition-colors">
              <FileText size={14} /> arXiv论文列表
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
