import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  TrendingUp,
  Award,
  Code2,
  BookOpen,
  Calculator,
  Brain,
  Zap,
  ArrowRight,
  ChevronUp,
  Trophy,
  FlaskConical,
  Hash,
  Languages,
} from 'lucide-react'
import ParticleCanvas from '@/components/ParticleCanvas'

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

const glassCard =
  'liquid-glass rounded-2xl p-6 md:p-8 border border-white/10 backdrop-blur-xl bg-white/[0.03]'

const accentText = 'text-[#22c55e] font-semibold'
const sectionTitle = 'font-heading text-2xl md:text-3xl font-bold text-white mb-4'

const GlmBenchmarks = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const benchmarks = [
    {
      name: 'MMLU',
      icon: BookOpen,
      desc: '多学科理解',
      glm4: 81.2,
      glm45: 83.5,
      gpt4o: 87.2,
      claude: 88.7,
    },
    {
      name: 'C-Eval',
      icon: Trophy,
      desc: '中文综合评测',
      glm4: 74.5,
      glm45: 78.2,
      gpt4o: null,
      claude: null,
    },
    {
      name: 'HumanEval',
      icon: Code2,
      desc: '代码生成',
      glm4: 78.5,
      glm45: 82.1,
      gpt4o: 90.2,
      claude: 92.0,
    },
    {
      name: 'GSM8K',
      icon: Calculator,
      desc: '数学推理',
      glm4: 91.2,
      glm45: 93.5,
      gpt4o: 95.3,
      claude: 96.4,
    },
    {
      name: 'MATH',
      icon: FlaskConical,
      desc: '竞赛级数学',
      glm4: 52.1,
      glm45: 58.6,
      gpt4o: 72.6,
      claude: 71.1,
    },
    {
      name: 'CMMLU',
      icon: Languages,
      desc: '中文多学科',
      glm4: 73.8,
      glm45: 76.5,
      gpt4o: null,
      claude: null,
    },
  ]

  const glm45Improvements = [
    { name: 'MMLU', from: 81.2, to: 83.5, delta: 2.3 },
    { name: 'C-Eval', from: 74.5, to: 78.2, delta: 3.7 },
    { name: 'HumanEval', from: 78.5, to: 82.1, delta: 3.6 },
    { name: 'GSM8K', from: 91.2, to: 93.5, delta: 2.3 },
    { name: 'MATH', from: 52.1, to: 58.6, delta: 6.5 },
    { name: 'CMMLU', from: 73.8, to: 76.5, delta: 2.7 },
  ]

  return (
    <div className="min-h-screen bg-[#050B14] text-white relative overflow-hidden">
      <ParticleCanvas />

      {/* ====== HERO ====== */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] px-6 pt-20">
        <motion.div
          className="text-center max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <BarChart3 className="w-10 h-10 text-[#22c55e]" />
            <span className="font-mono text-sm text-[#22c55e] tracking-widest uppercase">
              GLM Benchmarks
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-[#22c55e] bg-clip-text text-transparent">
            GLM 性能基准
          </h1>
          <p className="font-body text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            全面评测 GLM-4 与 GLM-4.5 在主流基准测试上的表现
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="#benchmark-table"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#22c55e] text-black font-semibold hover:bg-[#16a34a] transition-colors"
            >
              查看数据
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ====== BENCHMARK TABLE ====== */}
      <section id="benchmark-table" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeIn}
          >
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-8 h-8 text-[#22c55e]" />
              <h2 className={sectionTitle}>Benchmark 对比表格</h2>
            </div>
            <p className="font-body text-white/60 text-lg">
              GLM-4 与 GLM-4.5 在六大主流基准测试上的表现对比
            </p>
          </motion.div>

          <motion.div
            className={`${glassCard} overflow-hidden`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={1}
            variants={fadeIn}
          >
            <div className="overflow-x-auto">
              <table className="w-full font-body text-left">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="pb-4 pr-6 text-white/40 font-medium text-sm uppercase tracking-wider">
                      Benchmark
                    </th>
                    <th className="pb-4 pr-6 text-white/40 font-medium text-sm uppercase tracking-wider">
                      评测维度
                    </th>
                    <th className="pb-4 pr-6 text-[#22c55e] font-semibold text-sm uppercase tracking-wider">
                      GLM-4
                    </th>
                    <th className="pb-4 pr-6 text-[#22c55e] font-semibold text-sm uppercase tracking-wider">
                      GLM-4.5
                    </th>
                    <th className="pb-4 pr-6 text-white/40 font-medium text-sm uppercase tracking-wider">
                      GPT-4o
                    </th>
                    <th className="pb-4 text-white/40 font-medium text-sm uppercase tracking-wider">
                      Claude-3.5
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white/90">
                  {benchmarks.map((row, idx) => (
                    <tr
                      key={row.name}
                      className={`border-b border-white/5 ${idx % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
                    >
                      <td className="py-5 pr-6">
                        <div className="flex items-center gap-2">
                          <row.icon className="w-4 h-4 text-[#22c55e]" />
                          <span className="font-heading font-bold">{row.name}</span>
                        </div>
                      </td>
                      <td className="py-5 pr-6 text-white/50 text-sm">{row.desc}</td>
                      <td className="py-5 pr-6 font-mono">{row.glm4.toFixed(1)}</td>
                      <td className="py-5 pr-6 font-mono font-bold text-[#22c55e]">
                        {row.glm45.toFixed(1)}
                      </td>
                      <td className="py-5 pr-6 font-mono text-white/40">
                        {row.gpt4o !== null ? row.gpt4o.toFixed(1) : '—'}
                      </td>
                      <td className="py-5 font-mono text-white/40">
                        {row.claude !== null ? row.claude.toFixed(1) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== GLM-4.5 IMPROVEMENTS ====== */}
      <section id="improvements" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeIn}
          >
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-8 h-8 text-[#22c55e]" />
              <h2 className={sectionTitle}>GLM-4.5 全面提升</h2>
            </div>
            <p className="font-body text-white/60 text-lg">
              相比 GLM-4，GLM-4.5 在各基准测试上均有显著进步
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {glm45Improvements.map((item, idx) => (
              <motion.div
                key={item.name}
                className={glassCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx + 1}
                variants={fadeIn}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-heading text-lg font-bold">{item.name}</h3>
                  <div className="flex items-center gap-1 text-[#22c55e]">
                    <ChevronUp className="w-4 h-4" />
                    <span className="font-mono text-sm font-bold">+{item.delta.toFixed(1)}</span>
                  </div>
                </div>
                <div className="flex items-end gap-4 mb-3">
                  <div>
                    <div className="font-mono text-xs text-white/40 mb-1">GLM-4</div>
                    <div className="font-mono text-xl text-white/60">{item.from.toFixed(1)}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/20 mb-1" />
                  <div>
                    <div className="font-mono text-xs text-[#22c55e] mb-1">GLM-4.5</div>
                    <div className="font-mono text-xl font-bold text-[#22c55e]">{item.to.toFixed(1)}</div>
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#22c55e] to-[#4ade80] rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.to}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + 0.3, duration: 0.8 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== 中文优势 ====== */}
      <section id="chinese-advantage" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeIn}
          >
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-8 h-8 text-[#22c55e]" />
              <h2 className={sectionTitle}>中文优势</h2>
            </div>
            <p className="font-body text-white/60 text-lg">
              GLM 在中文评测基准上表现领先
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: Hash, title: 'C-Eval 中文综合评测', score45: 78.2, score4: 74.5, delta: 3.7, desc: '覆盖52个学科的中文综合评测基准。GLM-4.5 展现出强大的中文知识储备和推理能力。' },
              { icon: BookOpen, title: 'CMMLU 中文多学科评测', score45: 76.5, score4: 73.8, delta: 2.7, desc: '面向中文语言理解的多任务评测。GLM-4.5 体现了对中文语境的深度理解。' },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                className={glassCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx + 1}
                variants={fadeIn}
              >
                <div className="flex items-center gap-3 mb-4">
                  <item.icon className="w-6 h-6 text-[#22c55e]" />
                  <h3 className="font-heading text-xl font-bold">{item.title}</h3>
                </div>
                <div className="flex items-center gap-6 mb-4">
                  <div className="text-center">
                    <div className="font-mono text-4xl font-bold text-[#22c55e]">{item.score45}</div>
                    <div className="font-body text-xs text-white/50 mt-1">GLM-4.5</div>
                  </div>
                  <div className="text-center">
                    <div className="font-mono text-4xl font-bold text-white/60">{item.score4}</div>
                    <div className="font-body text-xs text-white/50 mt-1">GLM-4</div>
                  </div>
                  <div className="flex-1">
                    <div className="font-body text-sm text-white/70">
                      <div className="flex items-center gap-2 mb-1">
                        <Zap className="w-3 h-3 text-[#22c55e]" />
                        <span>提升 <strong className={accentText}>+{item.delta} 分</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="font-body text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            className={`${glassCard} mt-8 border-[#22c55e]/30`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            variants={fadeIn}
          >
            <div className="flex items-start gap-4">
              <Award className="w-8 h-8 text-[#22c55e] shrink-0 mt-1" />
              <div>
                <h3 className="font-heading text-lg font-bold mb-2">中文评测领先</h3>
                <p className="font-body text-white/70 leading-relaxed">
                  在 C-Eval 和 CMMLU 两个权威中文评测基准上，GLM 系列模型展现出显著优势。这两个评测由国内学术机构开发，更贴近中文语境和知识体系，是衡量模型<strong className={accentText}>中文能力</strong>的重要标准。GLM-4.5 的持续提升证明了其在中文理解和知识应用方面的不断进步。
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== 代码能力提升 ====== */}
      <section id="code" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeIn}
          >
            <div className="flex items-center gap-3 mb-2">
              <Code2 className="w-8 h-8 text-[#22c55e]" />
              <h2 className={sectionTitle}>代码能力提升</h2>
            </div>
            <p className="font-body text-white/60 text-lg">
              HumanEval 基准上的显著进步
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              className={glassCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeIn}
            >
              <h3 className="font-heading text-xl font-bold mb-6">HumanEval 进步分析</h3>
              <div className="flex items-center gap-8 mb-6">
                <div className="text-center p-5 bg-black/30 rounded-xl border border-white/5 flex-1">
                  <div className="font-mono text-3xl font-bold text-white/60">78.5</div>
                  <div className="font-body text-xs text-white/40 mt-1">GLM-4</div>
                </div>
                <div className="flex flex-col items-center">
                  <ArrowRight className="w-6 h-6 text-[#22c55e]" />
                  <span className="font-mono text-sm text-[#22c55e] font-bold mt-1">+3.6</span>
                </div>
                <div className="text-center p-5 bg-[#22c55e]/10 rounded-xl border border-[#22c55e]/30 flex-1">
                  <div className="font-mono text-3xl font-bold text-[#22c55e]">82.1</div>
                  <div className="font-body text-xs text-[#22c55e]/70 mt-1">GLM-4.5</div>
                </div>
              </div>
              <div className="h-3 bg-white/10 rounded-full overflow-hidden mb-4">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#22c55e] to-[#4ade80] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: '82.1%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                />
              </div>
              <p className="font-body text-white/60 text-sm">HumanEval是代码生成权威基准，GLM-4.5从78.5提升至82.1，进步显著。</p>
            </motion.div>
            <motion.div
              className={glassCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeIn}
            >
              <h3 className="font-heading text-xl font-bold mb-4">代码能力亮点</h3>
              <div className="space-y-3">
                {[
                  { icon: Brain, title: '算法理解增强', desc: '对复杂算法和数据结构的理解显著提升' },
                  { icon: Zap, title: '代码生成质量', desc: '生成代码的正确性和可运行性更高' },
                  { icon: Hash, title: '多语言支持', desc: '支持Python、JavaScript、C++等语言' },
                  { icon: TrendingUp, title: '持续迭代', desc: '通过代码专用数据持续优化能力' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-black/20 rounded-lg">
                    <item.icon className="w-5 h-5 text-[#22c55e] mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-heading text-sm font-bold">{item.title}</h4>
                      <p className="font-body text-white/60 text-xs mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== SUMMARY ====== */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className={`${glassCard} border-[#22c55e]/30 text-center`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeIn}
          >
            <BarChart3 className="w-12 h-12 text-[#22c55e] mx-auto mb-4" />
            <h2 className="font-heading text-2xl font-bold mb-3">总结</h2>
            <p className="font-body text-white/70 max-w-2xl mx-auto leading-relaxed">
              GLM-4.5 在所有评测基准上均实现了对 GLM-4 的全面超越，尤其在
              <strong className={accentText}>中文理解</strong>（C-Eval +3.7、CMMLU +2.7）和
              <strong className={accentText}>代码生成</strong>（HumanEval +3.6）方面进步显著。
              MATH 基准上的 <strong className={accentText}>+6.5</strong> 分提升也展现了数学推理能力的大幅增强。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="relative z-10 h-20" />
    </div>
  )
}

export default GlmBenchmarks
