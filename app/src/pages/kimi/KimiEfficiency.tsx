import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Gauge,
  Zap,
  Clock,
  DollarSign,
  TrendingDown,
  BarChart3,
  Cpu,
  Layers,
  ArrowDownRight,
  Sparkles,
  Server,
  HardDrive,
  Timer,
} from 'lucide-react'
import ParticleCanvas from '@/components/ParticleCanvas'

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

const muonVsAdam = [
  { metric: '训练速度', muon: '1.95x', adamw: '1.0x', improvement: '+95%', desc: 'Muon单次迭代更快' },
  { metric: '收敛迭代数', muon: '~60%', adamw: '100%', improvement: '-40%', desc: '更少轮次达到同等loss' },
  { metric: '内存开销', muon: '+12%', adamw: '基准', improvement: '可接受', desc: '额外存储正交矩阵' },
  { metric: '最终Loss', muon: '更低', adamw: '基准', improvement: '质量提升', desc: '更好的泛化能力' },
]

const contextEfficiency = [
  { length: '128K', inference: '1.2x', memory: '16GB', latency: '~200ms', color: '#4ECDC4' },
  { length: '256K', inference: '1.5x', memory: '28GB', latency: '~380ms', color: '#45B7D1' },
  { length: '1M', inference: '2.8x', memory: '96GB', latency: '~1.2s', color: '#FF6B6B' },
]

const convergenceData = [
  { step: '10K', muon: 0.42, adamw: 0.58 },
  { step: '20K', muon: 0.31, adamw: 0.45 },
  { step: '30K', muon: 0.24, adamw: 0.38 },
  { step: '40K', muon: 0.19, adamw: 0.32 },
  { step: '50K', muon: 0.15, adamw: 0.27 },
  { step: '60K', muon: 0.12, adamw: 0.23 },
  { step: '70K', muon: 0.10, adamw: 0.20 },
  { step: '80K', muon: 0.085, adamw: 0.18 },
]

const trainingCost = {
  tokens: '15.5T',
  gpuHours: '~2.4M',
  estimatedCost: '~$12-15M',
  gpuType: 'NVIDIA H100 80GB',
  clusterSize: '~8,192 GPUs',
}

const pricingComparison = [
  { model: 'Kimi K2.5', input: '¥1 / 1M', output: '¥2 / 1M', context: '1M', color: '#FF6B6B' },
  { model: 'GPT-4o', input: '$5 / 1M', output: '$15 / 1M', context: '128K', color: '#94A3B8' },
  { model: 'Claude-3.5', input: '$3 / 1M', output: '$15 / 1M', context: '200K', color: '#94A3B8' },
]

export default function KimiEfficiency() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const maxLoss = Math.max(...convergenceData.map((d) => d.adamw))

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
            <Gauge size={16} className="text-[#FF6B6B]" />
            <span className="text-sm text-[#FF6B6B] font-medium">Efficiency Analysis</span>
          </motion.div>
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="font-heading text-5xl font-bold text-white mb-4 md:text-6xl"
          >
            Kimi <span className="text-[#FF6B6B]">效率分析</span>
          </motion.h1>
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mx-auto max-w-2xl text-lg text-slate-400"
          >
            Muon 2×效率 · 长上下文优化 · 成本对比
          </motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        {/* ===== MUON VS ADAMW ===== */}
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
              <Zap size={22} className="text-[#FF6B6B]" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-white">Muon vs AdamW 效率对比</h2>
          </div>

          {/* Comparison Table */}
          <div className="mb-10 overflow-hidden rounded-xl border border-slate-700/50">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/80 text-slate-300">
                <tr>
                  <th className="px-5 py-4">指标</th>
                  <th className="px-5 py-4 text-center">
                    <span className="text-[#FF6B6B]">Muon</span>
                  </th>
                  <th className="px-5 py-4 text-center text-slate-400">AdamW</th>
                  <th className="px-5 py-4 text-center">提升</th>
                  <th className="px-5 py-4">说明</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {muonVsAdam.map((row) => (
                  <tr key={row.metric} className="bg-slate-900/40 hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4 font-medium text-white">{row.metric}</td>
                    <td className="px-5 py-4 text-center font-mono text-[#FF6B6B]">{row.muon}</td>
                    <td className="px-5 py-4 text-center font-mono text-slate-400">{row.adamw}</td>
                    <td className="px-5 py-4 text-center">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#4ECDC4]/15 px-3 py-1 text-xs font-semibold text-[#4ECDC4]">
                        {row.improvement.startsWith('+') || row.improvement.startsWith('-') ? (
                          <ArrowDownRight size={12} />
                        ) : null}
                        {row.improvement}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-slate-400 text-xs">{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Convergence Curve Comparison */}
          <h3 className="font-heading text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 size={20} className="text-[#4ECDC4]" />
            收敛曲线对比（Loss vs 训练步数）
          </h3>
          <div className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-6">
            {/* Chart */}
            <div className="relative h-64 w-full">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-slate-500 font-mono pr-2">
                <span>0.60</span>
                <span>0.45</span>
                <span>0.30</span>
                <span>0.15</span>
                <span>0.00</span>
              </div>
              {/* Chart area */}
              <div className="ml-12 h-full relative">
                {/* Grid lines */}
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="border-t border-slate-700/30 w-full" />
                  ))}
                </div>
                {/* Bars */}
                <div className="absolute inset-0 flex items-end justify-around">
                  {convergenceData.map((d, i) => (
                    <div key={i} className="flex items-end gap-1">
                      {/* Muon bar */}
                      <motion.div
                        className="w-5 rounded-t-sm bg-[#FF6B6B]"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${(d.muon / maxLoss) * 100}%` }}
                        transition={{ delay: i * 0.06, duration: 0.5 }}
                        viewport={{ once: true }}
                      />
                      {/* AdamW bar */}
                      <motion.div
                        className="w-5 rounded-t-sm bg-slate-500/50"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${(d.adamw / maxLoss) * 100}%` }}
                        transition={{ delay: i * 0.06 + 0.03, duration: 0.5 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Legend */}
            <div className="mt-4 flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-[#FF6B6B]" />
                <span className="text-xs text-slate-300">Muon（更低Loss，更快收敛）</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-sm bg-slate-500/50" />
                <span className="text-xs text-slate-400">AdamW（基准）</span>
              </div>
            </div>
            {/* X-axis labels */}
            <div className="mt-2 ml-12 flex justify-around text-xs text-slate-500 font-mono">
              {convergenceData.map((d) => (
                <span key={d.step}>{d.step}</span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ===== LONG CONTEXT EFFICIENCY ===== */}
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
              <Layers size={22} className="text-[#4ECDC4]" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-white">长上下文效率</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {contextEfficiency.map((ctx) => (
              <motion.div
                key={ctx.length}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-6"
                style={{ borderColor: `${ctx.color}30` }}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-heading text-2xl font-bold" style={{ color: ctx.color }}>
                    {ctx.length}
                  </span>
                  <HardDrive size={20} style={{ color: ctx.color }} />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Zap size={12} /> 相对速度
                    </span>
                    <span className="font-mono text-sm text-white">{ctx.inference}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Server size={12} /> 内存占用
                    </span>
                    <span className="font-mono text-sm text-white">{ctx.memory}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5">
                      <Timer size={12} /> 首token延迟
                    </span>
                    <span className="font-mono text-sm text-white">{ctx.latency}</span>
                  </div>
                </div>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-700/50">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: ctx.color }}
                    initial={{ width: 0 }}
                    whileInView={{
                      width:
                        ctx.length === '128K'
                          ? '30%'
                          : ctx.length === '256K'
                            ? '55%'
                            : '100%',
                    }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-[#4ECDC4]/20 bg-[#4ECDC4]/5 p-4">
            <p className="text-sm text-[#4ECDC4] leading-relaxed">
              <Sparkles size={14} className="inline mr-1.5" />
              <strong>关键优化</strong>：Kimi通过KV Cache压缩、滑动窗口注意力和分层内存管理，
              在1M上下文下仍保持可用延迟。相比标准Transformer的O(n²)复杂度，
              Kimi的推理复杂度接近线性增长。
            </p>
          </div>
        </motion.div>

        {/* ===== TRAINING COST ===== */}
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
              <DollarSign size={22} className="text-[#FFEAA7]" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-white">训练成本估算</h2>
          </div>

          <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: '训练数据量', value: trainingCost.tokens, icon: Layers, sub: 'tokens' },
              { label: 'GPU小时数', value: trainingCost.gpuHours, icon: Clock, sub: 'NVIDIA H100' },
              { label: '估算成本', value: trainingCost.estimatedCost, icon: DollarSign, sub: 'USD' },
              { label: '集群规模', value: trainingCost.clusterSize, icon: Server, sub: '并行训练' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-5 text-center"
              >
                <item.icon size={20} className="mx-auto mb-2 text-[#FFEAA7]" />
                <div className="font-heading text-2xl font-bold text-white">{item.value}</div>
                <div className="text-xs text-slate-400">{item.label}</div>
                <div className="text-xs text-slate-500">{item.sub}</div>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-6">
            <h3 className="font-heading text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Cpu size={20} className="text-[#FFEAA7]" />
              训练效率细节
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-lg bg-slate-800/40 p-4">
                  <TrendingDown size={18} className="mt-0.5 text-[#4ECDC4]" />
                  <div>
                    <div className="text-sm font-medium text-white">Muon节省40%迭代</div>
                    <div className="text-xs text-slate-400">
                      相比AdamW，Muon以约60%的训练步数达到同等收敛效果，直接降低训练成本。
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-slate-800/40 p-4">
                  <Layers size={18} className="mt-0.5 text-[#4ECDC4]" />
                  <div>
                    <div className="text-sm font-medium text-white">MoE稀疏激活</div>
                    <div className="text-xs text-slate-400">
                      1T参数中仅激活32B，大幅降低前向/反向计算量和显存占用。
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-lg bg-slate-800/40 p-4">
                  <Zap size={18} className="mt-0.5 text-[#4ECDC4]" />
                  <div>
                    <div className="text-sm font-medium text-white">数据并行优化</div>
                    <div className="text-xs text-slate-400">
                      8192 GPU高效并行，通信开销控制在5%以内，GPU利用率超过85%。
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-slate-800/40 p-4">
                  <Sparkles size={18} className="mt-0.5 text-[#4ECDC4]" />
                  <div>
                    <div className="text-sm font-medium text-white">训练稳定性</div>
                    <div className="text-xs text-slate-400">
                      QK-Clip技术确保15.5T tokens训练全程无发散，避免重训成本。
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== PRICING COMPARISON ===== */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="liquid-glass rounded-2xl border border-slate-700/50 p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-[#96CEB4]/15 p-2.5">
              <DollarSign size={22} className="text-[#96CEB4]" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-white">API定价对比（每百万Token）</h2>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-700/50">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/80 text-slate-300">
                <tr>
                  <th className="px-5 py-4">模型</th>
                  <th className="px-5 py-4 text-center">输入价格</th>
                  <th className="px-5 py-4 text-center">输出价格</th>
                  <th className="px-5 py-4 text-center">上下文窗口</th>
                  <th className="px-5 py-4 text-center">性价比</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {pricingComparison.map((row) => (
                  <tr key={row.model} className="bg-slate-900/40 hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-4">
                      <span
                        className="font-medium"
                        style={{ color: row.color }}
                      >
                        {row.model}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center font-mono text-white">{row.input}</td>
                    <td className="px-5 py-4 text-center font-mono text-white">{row.output}</td>
                    <td className="px-5 py-4 text-center">
                      <span className="font-mono text-xs text-slate-300">{row.context}</span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-700/50 mx-auto">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ backgroundColor: row.color }}
                          initial={{ width: 0 }}
                          whileInView={{
                            width:
                              row.model.includes('Kimi')
                                ? '95%'
                                : row.model.includes('GPT')
                                  ? '40%'
                                  : '50%',
                          }}
                          transition={{ duration: 0.8 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-lg border border-[#96CEB4]/20 bg-[#96CEB4]/5 p-4">
            <p className="text-sm text-[#96CEB4] leading-relaxed">
              <TrendingDown size={14} className="inline mr-1.5" />
              <strong>成本优势</strong>：Kimi K2.5提供1M超长上下文，输入价格仅为GPT-4o的约1/5，
              输出价格仅为1/7。结合MoE架构的稀疏激活，实际推理成本进一步降低。
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-10 text-center text-sm text-slate-500">
        <p className="font-mono">Kimi Efficiency Analysis · Cost estimates are approximate</p>
      </footer>
    </div>
  )
}
