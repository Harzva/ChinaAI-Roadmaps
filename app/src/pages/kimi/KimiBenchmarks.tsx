import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  BarChart3,
  Trophy,
  TrendingUp,
  Users,
  Brain,
  Code2,
  Calculator,
  Puzzle,
  Bot,
  ArrowUpRight,
  Minus,
  Zap,
} from 'lucide-react'
import ParticleCanvas from '@/components/ParticleCanvas'

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

const benchmarkData = [
  { name: 'MMLU', k2: 85.2, k25: 86.8, gpt4o: 87.2, claude35: 88.7, icon: Brain, desc: '大规模多任务语言理解' },
  { name: 'HumanEval', k2: 86.5, k25: 89.2, gpt4o: 90.2, claude35: 92.0, icon: Code2, desc: '代码生成评测' },
  { name: 'MBPP', k2: 82.1, k25: 85.6, gpt4o: 86.5, claude35: 87.3, icon: Code2, desc: 'Python编程能力' },
  { name: 'GSM8K', k2: 94.5, k25: 95.8, gpt4o: 95.3, claude35: 96.4, icon: Calculator, desc: '数学推理(小学)' },
  { name: 'MATH', k2: 62.3, k25: 68.5, gpt4o: 72.6, claude35: 71.1, icon: Puzzle, desc: '竞赛级数学推理' },
  { name: 'Agentic(Tau-bench)', k2: 0, k25: 0, gpt4o: 0, claude35: 0, icon: Bot, desc: 'Agent任务执行', isAgentic: true },
]

const maxVal = 100

export default function KimiBenchmarks() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen bg-[#050B14] text-slate-200">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden pt-20 pb-24">
        <ParticleCanvas />
        <div className="relative z-10 mx-auto max-w-6xl px-6 text-center">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF6B6B]/30 bg-[#FF6B6B]/10 px-4 py-1.5"
          >
            <BarChart3 size={16} className="text-[#FF6B6B]" />
            <span className="text-sm text-[#FF6B6B] font-medium">Performance Evaluation</span>
          </motion.div>
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="font-heading text-5xl font-bold text-white mb-4 md:text-6xl"
          >
            Kimi <span className="text-[#FF6B6B]">性能基准</span>
          </motion.h1>
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mx-auto max-w-2xl text-lg text-slate-400"
          >
            全方位基准测试对比 · 数据驱动评估Kimi K2/K2.5的能力边界
          </motion.p>
        </div>
      </section>

      {/* ===== BENCHMARK TABLE ===== */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <motion.div
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="liquid-glass mb-16 rounded-2xl border border-slate-700/50 p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-[#FF6B6B]/15 p-2.5">
              <Trophy size={22} className="text-[#FF6B6B]" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-white">Benchmark 对比表格</h2>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-700/50">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/80 text-slate-300">
                <tr>
                  <th className="px-5 py-4 font-heading">Benchmark</th>
                  <th className="px-5 py-4 text-center">
                    <span className="text-[#FF6B6B]">K2</span>
                  </th>
                  <th className="px-5 py-4 text-center">
                    <span className="text-[#FF6B6B]">K2.5</span>
                  </th>
                  <th className="px-5 py-4 text-center text-slate-400">GPT-4o</th>
                  <th className="px-5 py-4 text-center text-slate-400">Claude-3.5</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {benchmarkData.map((row) => {
                  const Icon = row.icon
                  return (
                    <tr key={row.name} className="bg-slate-900/40 hover:bg-slate-800/40 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-slate-800 p-2">
                            <Icon size={16} className="text-slate-400" />
                          </div>
                          <div>
                            <div className="font-medium text-white">{row.name}</div>
                            <div className="text-xs text-slate-500">{row.desc}</div>
                          </div>
                        </div>
                      </td>
                      {row.isAgentic ? (
                        <>
                          <td className="px-5 py-4 text-center">
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#4ECDC4]/15 px-3 py-1 text-xs font-semibold text-[#4ECDC4]">
                              <Trophy size={12} /> 领先
                            </span>
                          </td>
                          <td className="px-5 py-4 text-center">
                            <span className="inline-flex items-center gap-1 rounded-full bg-[#4ECDC4]/15 px-3 py-1 text-xs font-semibold text-[#4ECDC4]">
                              <Trophy size={12} /> 领先
                            </span>
                          </td>
                          <td className="px-5 py-4 text-center text-slate-600">
                            <Minus size={16} className="mx-auto" />
                          </td>
                          <td className="px-5 py-4 text-center text-slate-600">
                            <Minus size={16} className="mx-auto" />
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-5 py-4 text-center font-mono text-white">{row.k2}%</td>
                          <td className="px-5 py-4 text-center font-mono font-semibold text-[#FF6B6B]">
                            {row.k25}%
                          </td>
                          <td className="px-5 py-4 text-center font-mono text-slate-400">{row.gpt4o}%</td>
                          <td className="px-5 py-4 text-center font-mono text-slate-400">{row.claude35}%</td>
                        </>
                      )}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ===== PROGRESS BAR VISUALIZATION ===== */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="liquid-glass mb-16 rounded-2xl border border-slate-700/50 p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-[#4ECDC4]/15 p-2.5">
              <TrendingUp size={22} className="text-[#4ECDC4]" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-white">可视化进度条</h2>
          </div>

          <div className="space-y-6">
            {benchmarkData
              .filter((row) => !row.isAgentic)
              .map((row) => (
                <div key={row.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{row.name}</span>
                    <span className="text-xs text-slate-500">{row.desc}</span>
                  </div>
                  <div className="grid gap-3 md:grid-cols-4">
                    {/* K2 */}
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-[#FF6B6B]/70">K2</span>
                        <span className="font-mono text-[#FF6B6B]">{row.k2}%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-700/50">
                        <motion.div
                          className="h-full rounded-full bg-[#FF6B6B]/60"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(row.k2 / maxVal) * 100}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                    {/* K2.5 */}
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-[#FF6B6B]">K2.5</span>
                        <span className="font-mono font-semibold text-[#FF6B6B]">{row.k25}%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-700/50">
                        <motion.div
                          className="h-full rounded-full bg-[#FF6B6B]"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(row.k25 / maxVal) * 100}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                    {/* GPT-4o */}
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-slate-400">GPT-4o</span>
                        <span className="font-mono text-slate-400">{row.gpt4o}%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-700/50">
                        <motion.div
                          className="h-full rounded-full bg-slate-500/60"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(row.gpt4o / maxVal) * 100}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                    {/* Claude-3.5 */}
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Claude-3.5</span>
                        <span className="font-mono text-slate-400">{row.claude35}%</span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-slate-700/50">
                        <motion.div
                          className="h-full rounded-full bg-slate-500/60"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(row.claude35 / maxVal) * 100}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>

        {/* ===== VS HUMAN COMPARISON ===== */}
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="liquid-glass mb-16 rounded-2xl border border-slate-700/50 p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-[#FFEAA7]/15 p-2.5">
              <Users size={22} className="text-[#FFEAA7]" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-white">与人类对比</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* MMLU Comparison */}
            <div className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-6">
              <h3 className="font-heading text-lg font-semibold text-white mb-4">MMLU — 综合知识</h3>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-slate-400">人类专家（平均）</span>
                    <span className="font-mono text-[#FFEAA7]">~89%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-700/50">
                    <motion.div
                      className="h-full rounded-full bg-[#FFEAA7]"
                      initial={{ width: 0 }}
                      whileInView={{ width: '89%' }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-white">Kimi K2.5</span>
                    <span className="font-mono font-semibold text-[#FF6B6B]">86.8%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-700/50">
                    <motion.div
                      className="h-full rounded-full bg-[#FF6B6B]"
                      initial={{ width: 0 }}
                      whileInView={{ width: '86.8%' }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-slate-400">GPT-4o</span>
                    <span className="font-mono text-slate-400">87.2%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-700/50">
                    <motion.div
                      className="h-full rounded-full bg-slate-500/60"
                      initial={{ width: 0 }}
                      whileInView={{ width: '87.2%' }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-[#FFEAA7]/5 p-3 text-xs text-[#FFEAA7] leading-relaxed">
                <ArrowUpRight size={14} className="inline mr-1" />
                Kimi K2.5 在MMLU上达到86.8%，与人类专家水平(约89%)的差距缩小至仅<strong>2.2个百分点</strong>。
              </div>
            </div>

            {/* Math Comparison */}
            <div className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-6">
              <h3 className="font-heading text-lg font-semibold text-white mb-4">MATH — 数学推理</h3>
              <div className="space-y-4">
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-slate-400">人类竞赛选手</span>
                    <span className="font-mono text-[#FFEAA7]">~90%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-700/50">
                    <motion.div
                      className="h-full rounded-full bg-[#FFEAA7]"
                      initial={{ width: 0 }}
                      whileInView={{ width: '90%' }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-white">Kimi K2.5</span>
                    <span className="font-mono font-semibold text-[#FF6B6B]">68.5%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-700/50">
                    <motion.div
                      className="h-full rounded-full bg-[#FF6B6B]"
                      initial={{ width: 0 }}
                      whileInView={{ width: '68.5%' }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="text-slate-400">GPT-4o</span>
                    <span className="font-mono text-slate-400">72.6%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-slate-700/50">
                    <motion.div
                      className="h-full rounded-full bg-slate-500/60"
                      initial={{ width: 0 }}
                      whileInView={{ width: '72.6%' }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-[#FFEAA7]/5 p-3 text-xs text-[#FFEAA7] leading-relaxed">
                <Zap size={14} className="inline mr-1" />
                K2.5 在MATH上从K2的62.3%跃升至68.5%，提升<strong>6.2个百分点</strong>，展示强劲进步。
              </div>
            </div>
          </div>

          {/* Key Takeaway */}
          <div className="mt-8 rounded-xl border border-[#4ECDC4]/20 bg-[#4ECDC4]/5 p-6">
            <h3 className="font-heading text-lg font-semibold text-[#4ECDC4] mb-3">关键发现</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-start gap-3">
                <TrendingUp size={18} className="mt-0.5 text-[#4ECDC4]" />
                <p className="text-sm text-slate-300">
                  <strong className="text-white">持续提升</strong>：K2.5在所有基准上均超越K2，最大提升出现在MATH(+6.2%)和HumanEval(+2.7%)
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Trophy size={18} className="mt-0.5 text-[#4ECDC4]" />
                <p className="text-sm text-slate-300">
                  <strong className="text-white">Agentic领先</strong>：在Tau-bench Agent评测中，Kimi系列处于行业领先地位
                </p>
              </div>
              <div className="flex items-start gap-3">
                <ArrowUpRight size={18} className="mt-0.5 text-[#4ECDC4]" />
                <p className="text-sm text-slate-300">
                  <strong className="text-white">逼近人类</strong>：MMLU差距仅2.2pp，在GSM8K上已接近人类水平
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-10 text-center text-sm text-slate-500">
        <p className="font-mono">Kimi Benchmarks · Data sourced from official evaluations</p>
      </footer>
    </div>
  )
}
