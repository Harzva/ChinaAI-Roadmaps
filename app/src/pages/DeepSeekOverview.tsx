import { useEffect } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import {
  Cpu, Layers, BarChart3, Zap, BookOpen,
  GitBranch, Eye, ArrowRight, Code, Target,
  DollarSign,
  Sparkles, HardDrive, Brain,
} from 'lucide-react'
import ParticleCanvas from '@/components/ParticleCanvas'

/* ─── Variants ─── */
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

const subPages = [
  { path: '/deepseek/architecture', icon: Cpu, label: '架构解构', desc: 'MoE混合专家 · CSA/HCA · mHC · Muon', color: '#3D8BFF' },
  { path: '/deepseek/benchmarks', icon: BarChart3, label: '性能基准', desc: '11项Benchmark · SOTA记录 · 全模式对比', color: '#00E5FF' },
  { path: '/deepseek/efficiency', icon: Zap, label: '效率分析', desc: 'FLOPs降低 · KV Cache压缩 · 成本计算', color: '#ffb84d' },
  { path: '/deepseek/infrastructure', icon: HardDrive, label: '系统底层', desc: 'TileLang · FP4量化 · 通信优化', color: '#4ECDC4' },
  { path: '/deepseek/training', icon: BookOpen, label: '训练解析', desc: '32T tokens · 预训练 · 稳定性', color: '#3D8BFF' },
  { path: '/deepseek/post-training', icon: GitBranch, label: '后训练', desc: 'OPD蒸馏 · GRM · 推理模式', color: '#00E5FF' },
  { path: '/deepseek/multimodal', icon: Eye, label: '多模态', desc: '视觉原语 · 7056倍压缩 · Agentic', color: '#FF6B6B' },
]

const highlights = [
  { icon: Target, label: 'MoE 混合专家', value: '1.6T/49B', desc: '总参数 / 激活参数', color: '#3D8BFF' },
  { icon: Layers, label: 'CSA+HCA 注意力', value: '1M', desc: '上下文长度', color: '#00E5FF' },
  { icon: Code, label: '代码能力', value: '93.5%', desc: 'LiveCodeBench SOTA', color: '#ffb84d' },
  { icon: Brain, label: 'Muon 优化器', value: '2×', desc: '比 AdamW 更高效', color: '#4ECDC4' },
]

export default function DeepSeekOverview() {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="min-h-[100dvh] bg-[#050B14] text-white">
      {/* ── HERO ── */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-16 px-6">
        <ParticleCanvas />
        <div className="relative z-10 max-w-[900px] mx-auto text-center">
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="section-label inline-block mb-6">
            DeepSeek 技术路线深度解析
          </motion.span>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="font-heading text-[42px] md:text-[56px] font-medium tracking-tight leading-[1.1] mb-6">
            <span className="text-[#3D8BFF]">DeepSeek</span>{' '}
            <span className="bg-gradient-to-r from-[#3D8BFF] to-[#00E5FF] bg-clip-text text-transparent">极致性价比的MoE架构</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="font-body text-[18px] md:text-[20px] text-[#8B9EB0] leading-[1.7] max-w-[700px] mx-auto mb-10">
            总参数 <span className="text-[#3D8BFF]">1.6万亿</span>，推理激活仅 <span className="text-[#00E5FF]">490亿</span>，
            上下文窗口 <span className="text-[#ffb84d]">1M tokens</span>，用不到对手 <span className="text-[#4ECDC4]">1/10 的成本</span> 达到 SOTA 性能
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex justify-center gap-4">
            <Link to="/deepseek/architecture" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3D8BFF] text-white font-body text-[15px] font-semibold hover:bg-[#2a6fd9] transition-colors">
              开始探索 <ArrowRight size={16} />
            </Link>
            <a href="https://github.com/deepseek-ai" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl liquid-glass text-[#8B9EB0] font-body text-[15px] hover:text-white transition-colors">
              GitHub <Sparkles size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── HIGHLIGHTS ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {highlights.map((h, i) => (
            <motion.div key={i} variants={fadeInUp} whileInView="visible" initial="hidden" viewport={{ once: true }} custom={i}
              className="liquid-glass rounded-2xl p-5 text-center" style={{ borderTop: `3px solid ${h.color}` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: `${h.color}15` }}>
                <h.icon size={20} style={{ color: h.color }} />
              </div>
              <div className="font-heading text-[14px] text-[#8B9EB0] mb-1">{h.label}</div>
              <div className="font-heading text-[28px] font-bold" style={{ color: h.color }}>{h.value}</div>
              <div className="text-[12px] text-[#8B9EB0] mt-1">{h.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── 国产化与自主可控 ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-16">
        <motion.h2
          variants={fadeInUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
          custom={0}
          className="font-heading text-[32px] font-semibold text-white mb-8"
        >
          🇨🇳 国产化与自主可控
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: 国产芯片适配 */}
          <motion.div
            variants={fadeInUp}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            custom={0}
            className="liquid-glass rounded-2xl p-6"
            style={{ borderLeft: '4px solid #3D8BFF' }}
          >
            <h3 className="font-heading text-[20px] font-semibold text-white mb-3 flex items-center gap-2">
              <Cpu size={22} className="text-[#3D8BFF]" />
              国产芯片全栈适配
            </h3>
            <div className="font-body text-[15px] text-[#8B9EB0] leading-[1.7] space-y-2">
              <p>
                DeepSeek V4 首次实现从<strong className="text-[#3D8BFF]">训练到推理全流程</strong>深度适配国产芯片：
              </p>
              <ul className="list-disc list-inside space-y-1 text-[14px]">
                <li><strong className="text-white">华为昇腾950</strong>：单卡推理性能达英伟达H20的 <span className="text-[#3D8BFF]">2.87倍</span></li>
                <li><strong className="text-white">寒武纪思元</strong>：算子优化，长上下文处理突破</li>
                <li><strong className="text-white">海光信息</strong>：Day 0 适配，发布即支持</li>
                <li><strong className="text-white">8家国产芯片厂商</strong>：达成 Day 0 适配合作</li>
              </ul>
              <p className="mt-3">
                彻底摆脱对<strong className="text-[#3D8BFF]">英伟达CUDA生态</strong>的依赖，推动国产CANN框架逐步替代CUDA。
              </p>
            </div>
          </motion.div>

          {/* Card 2: 极致性价比 */}
          <motion.div
            variants={fadeInUp}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            custom={1}
            className="liquid-glass rounded-2xl p-6"
            style={{ borderLeft: '4px solid #00E5FF' }}
          >
            <h3 className="font-heading text-[20px] font-semibold text-white mb-3 flex items-center gap-2">
              <DollarSign size={22} className="text-[#00E5FF]" />
              极致性价比：成本降低99%
            </h3>
            <div className="font-body text-[15px] text-[#8B9EB0] leading-[1.7] space-y-2">
              <p>
                DeepSeek 用技术创新重新定义 AI 定价：
              </p>
              <ul className="list-disc list-inside space-y-1 text-[14px]">
                <li>API 调用成本低至 <strong className="text-[#00E5FF]">0.2元/百万Token</strong>（缓存命中）</li>
                <li>推理成本仅为 GPT-5.5 的 <strong className="text-[#00E5FF]">1/100</strong></li>
                <li>1M 上下文算力消耗仅为前代 V3.2 的 <strong className="text-[#00E5FF]">27%</strong></li>
                <li>KV 缓存占用降至 <strong className="text-[#00E5FF]">10%</strong></li>
              </ul>
              <p className="mt-3">
                通过 <strong className="text-[#00E5FF]">DSA稀疏注意力</strong> 和 <strong className="text-[#00E5FF]">MoE架构</strong>，
                在保持 SOTA 性能的同时，将推理成本压到行业最低。
              </p>
            </div>
          </motion.div>

          {/* Card 3: 开源生态构建 */}
          <motion.div
            variants={fadeInUp}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            custom={2}
            className="liquid-glass rounded-2xl p-6"
            style={{ borderLeft: '4px solid #ffb84d' }}
          >
            <h3 className="font-heading text-[20px] font-semibold text-white mb-3 flex items-center gap-2">
              <BookOpen size={22} className="text-[#ffb84d]" />
              MIT开源生态
            </h3>
            <div className="font-body text-[15px] text-[#8B9EB0] leading-[1.7] space-y-2">
              <p>
                DeepSeek 采用 <strong className="text-[#ffb84d]">MIT 协议</strong>完整开源：
              </p>
              <ul className="list-disc list-inside space-y-1 text-[14px]">
                <li>技术报告、模型权重、训练代码 <strong className="text-white">全部开源</strong></li>
                <li>GitHub 30+ 个开源项目</li>
                <li>吸引全球开发者参与优化</li>
                <li>推动国产 CANN 框架生态建设</li>
              </ul>
              <p className="mt-3">
                全球开发者可<strong className="text-[#ffb84d]">自由使用、修改、商用</strong>，
                加速中国 AI 技术自主可控进程。
              </p>
            </div>
          </motion.div>

          {/* Card 4: 产业链协同 */}
          <motion.div
            variants={fadeInUp}
            whileInView="visible"
            initial="hidden"
            viewport={{ once: true }}
            custom={3}
            className="liquid-glass rounded-2xl p-6"
            style={{ borderLeft: '4px solid #4ECDC4' }}
          >
            <h3 className="font-heading text-[20px] font-semibold text-white mb-3 flex items-center gap-2">
              <Layers size={22} className="text-[#4ECDC4]" />
              产业链协同效应
            </h3>
            <div className="font-body text-[15px] text-[#8B9EB0] leading-[1.7] space-y-2">
              <p>
                DeepSeek 带动国产 AI 产业链全面升级：
              </p>
              <ul className="list-disc list-inside space-y-1 text-[14px]">
                <li><strong className="text-white">芯片厂商</strong>：华为、寒武纪、海光等性能提升</li>
                <li><strong className="text-white">算力基建</strong>：国产智算中心建设加速</li>
                <li><strong className="text-white">框架替代</strong>：CANN逐步替代CUDA</li>
                <li><strong className="text-white">开发者生态</strong>：国产AI开发者社区壮大</li>
              </ul>
              <p className="mt-3">
                昇腾950 PR 时延低至 <strong className="text-[#4ECDC4]">10ms</strong>（V4-Flash），
                吞吐量最高 <strong className="text-[#4ECDC4]">4700 TPS</strong>，
                验证国产芯片承载顶级模型的能力。
              </p>
            </div>
          </motion.div>
        </div>

        {/* Performance comparison bar */}
        <motion.div
          variants={fadeInUp}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true }}
          custom={4}
          className="liquid-glass rounded-2xl p-6 mt-6"
        >
          <h3 className="font-heading text-[18px] font-semibold text-white mb-4">
            国产芯片 vs 英伟达性能对比
          </h3>
          <div className="space-y-4">
            {[
              { label: '昇腾950 PR', value: '2.87×', desc: 'vs H20 单卡推理', color: '#3D8BFF', width: '95%' },
              { label: 'V4-Flash 时延', value: '10ms', desc: 'P99 延迟', color: '#00E5FF', width: '30%' },
              { label: 'V4-Pro 时延', value: '20ms', desc: 'P99 延迟', color: '#00E5FF', width: '45%' },
              { label: '吞吐量', value: '4700 TPS', desc: '峰值', color: '#ffb84d', width: '85%' },
            ].map((item, i) => (
              <div key={i}>
                <div className="flex justify-between mb-1">
                  <span className="font-body text-[14px] text-white">{item.label}</span>
                  <span className="font-mono text-[14px]" style={{ color: item.color }}>{item.value} <span className="text-[#8B9EB0]">({item.desc})</span></span>
                </div>
                <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: item.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: item.width }}
                    transition={{ duration: 1.2, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── SUB-PAGE NAVIGATION ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20">
        <motion.h2 variants={fadeInUp} whileInView="visible" initial="hidden" viewport={{ once: true }} custom={0}
          className="font-heading text-[32px] font-semibold text-white mb-8">
          📂 DeepSeek 子站导航
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {subPages.map((p, i) => (
            <motion.div key={p.path} variants={fadeInUp} whileInView="visible" initial="hidden" viewport={{ once: true }} custom={i}>
              <Link to={p.path} className="block liquid-glass rounded-2xl p-6 hover:scale-[1.02] transition-transform duration-300 cursor-pointer group"
                style={{ borderTop: `3px solid ${p.color}` }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${p.color}15` }}>
                      <p.icon size={20} style={{ color: p.color }} />
                    </div>
                    <h3 className="font-heading text-[18px] font-semibold text-white">{p.label}</h3>
                  </div>
                  <ArrowRight size={18} className="text-[#8B9EB0] group-hover:text-[#00E5FF] group-hover:translate-x-1 transition-all" />
                </div>
                <p className="font-body text-[14px] text-[#8B9EB0]">{p.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MODEL EVOLUTION ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <motion.h2 variants={fadeInUp} whileInView="visible" initial="hidden" viewport={{ once: true }} custom={0}
          className="font-heading text-[32px] font-semibold text-white mb-8">
          📅 DeepSeek 演进时间线
        </motion.h2>
        <div className="liquid-glass rounded-2xl p-8">
          <div className="flex flex-wrap items-center gap-4 justify-center">
            {[
              { year: '2023', model: 'V1', params: '7B Dense', color: '#8B9EB0' },
              { year: '2024', model: 'V2', params: '236B + MLA', color: '#8B9EB0' },
              { year: '2024', model: 'V3', params: '671B MoE', color: '#3D8BFF' },
              { year: '2025', model: 'V3.2', params: '671B 优化', color: '#3D8BFF' },
              { year: '2025', model: 'V4 / R1', params: '1.6T / RL推理', color: '#00E5FF' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-center px-4 py-3 rounded-xl" style={{ background: `${item.color}10`, border: `1px solid ${item.color}20` }}>
                  <div className="text-[11px] text-[#8B9EB0]">{item.year}</div>
                  <div className="font-heading text-[16px] font-semibold" style={{ color: item.color }}>{item.model}</div>
                  <div className="text-[11px] text-[#8B9EB0]">{item.params}</div>
                </div>
                {i < 4 && <ArrowRight size={16} className="text-[#8B9EB0] opacity-40" />}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
