import { useState, useEffect, useRef, memo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router'
import ParticleCanvas from '@/components/ParticleCanvas'
import HolographicText from '@/components/HolographicText'
import { cn } from '@/lib/utils'
import { BarChart3, HardDrive, Calculator, Clock, Sparkles, Gauge, DollarSign, Cpu, Zap, TrendingDown, Server, Hash } from 'lucide-react'

/* ─── Data ─── */

const flopsCards = [
  {
    label: '基准模型',
    number: '100%',
    subtext: 'DeepSeek-V3.2 基准',
    params: '总参数 671B / 激活参数 37B',
    borderColor: 'rgba(255,255,255,0.3)',
    numberColor: '#8B9EB0',
    showLine: false,
  },
  {
    label: '旗舰级',
    number: '27%',
    subtextPrefix: '相比 V3.2 降低',
    subtextBold: '3.7×',
    params: '总参数 1.6T / 激活参数 49B',
    borderColor: '#3D8BFF',
    numberColor: '#3D8BFF',
    showLine: true,
  },
  {
    label: '效率级',
    number: '10%',
    subtextPrefix: '相比 V3.2 降低',
    subtextBold: '9.5×',
    params: '总参数 284B / 激活参数 13B',
    borderColor: '#00E5FF',
    numberColor: '#00E5FF',
    showLine: false,
  },
]

const barChartData = [
  { name: 'V3.2', flops: 100, kv: 100, color: 'rgba(255,255,255,0.3)' },
  { name: 'V4-Pro', flops: 27, kv: 10, color: '#3D8BFF' },
  { name: 'V4-Flash', flops: 10, kv: 7, color: '#00E5FF' },
]

const trendTable = [
  { seq: '4K', v32f: '基准', prof: '基准附近', flashf: '显著更低', v32k: '基准', prok: '显著更小', flashk: '显著更小' },
  { seq: '16K', v32f: '基准', prof: '~60%', flashf: '~25%', v32k: '基准', prok: '~20%', flashk: '~12%' },
  { seq: '64K', v32f: '基准', prof: '~40%', flashf: '~15%', v32k: '基准', prok: '~12%', flashk: '~8%' },
  { seq: '256K', v32f: '基准', prof: '~32%', flashf: '~12%', v32k: '基准', prok: '~10%', flashk: '~7%' },
  { seq: '1M', v32f: '100%', prof: '27%', flashf: '10%', v32k: '100%', prok: '10%', flashk: '7%', highlight: true },
]

const sourceCards = [
  {
    title: '混合 CSA/HCA 注意力',
    desc: '核心效率提升来源。CSA 压缩+稀疏选择，HCA 极端压缩。',
    note: '→ 主要贡献',
    barColor: '#3D8BFF',
  },
  {
    title: 'KV Cache 混合精度',
    desc: 'RoPE 维度 BF16 + 其他维度 FP8，相比纯 BF16 减少约 50%。',
    note: '→ 50% 内存节省',
    barColor: '#00E5FF',
  },
  {
    title: 'FP4 索引器计算',
    desc: 'Lightning Indexer 注意力计算使用 FP4，加速超长上下文处理。',
    note: '→ 计算加速',
    barColor: '#0055FF',
  },
  {
    title: '更小 Top-k',
    desc: '相比 V3.2 选择更小的 attention top-k，提升中短文本效率。',
    note: '→ 中短文本优化',
    barColor: 'rgba(255,255,255,0.6)',
  },
  {
    title: 'FP4 专家权重',
    desc: 'Routed expert 参数使用 FP4 精度，未来硬件上可再提效 1/3。',
    note: '→ 未来潜力',
    barColor: '#3D8BFF',
  },
]

const achievementCards = [
  {
    title: '1M Token 成为常态',
    content: '通过 CSA/HCA 混合注意力架构，1M token 上下文的推理成本降至前所未有的水平，使长程任务和测试时缩放更加可行。',
    borderColor: '#00E5FF',
  },
  {
    title: '更少参数，更强性能',
    content: 'V4-Flash-Base 以 13B 激活参数 / 284B 总参数的规模，在绝大多数 benchmark 上超越了 37B 激活 / 671B 总参数的 V3.2-Base。',
    borderColor: '#3D8BFF',
  },
  {
    title: '重新定义开源模型上限',
    content: 'V4-Pro-Max 在知识、推理、代码、Agent 等多维度上重新定义开源模型 SOTA。',
    borderColor: '#0055FF',
  },
  {
    title: '成本效益最优解',
    content: 'V4-Flash-Max 以极具成本效益的架构，在分配更大思考预算时达到与领先闭源模型可比的推理性能。',
    borderColor: '#00E5FF',
  },
]

/* ─── NEW DATA: Cost Calculator ─── */
const seqLengthOptions = [4096, 16384, 65536, 262144, 1048576]
const seqLengthLabels = ['4K', '16K', '64K', '256K', '1M']
const modelFactors: Record<string, number> = {
  'V3.2': 1.0,
  'V4-Pro': 0.27,
  'V4-Flash': 0.10,
}


/* ─── NEW DATA: Memory Usage Bars ─── */
const memoryData = [
  { context: '4K', v32: 16, v4pro: 6, v4flash: 3, max: 20 },
  { context: '64K', v32: 64, v4pro: 22, v4flash: 12, max: 70 },
  { context: '256K', v32: 200, v4pro: 64, v4flash: 35, max: 220 },
  { context: '1M', v32: 800, v4pro: 210, v4flash: 115, max: 850 },
]

/* ─── NEW DATA: Inference Speed Table ─── */
const speedTableData = [
  { stage: 'Prefill (1M tokens)', v32: '~120s', v4pro: '~32s', v4flash: '~12s', note: '首次处理整个上下文' },
  { stage: 'Decode per token', v32: '~45ms', v4pro: '~12ms', v4flash: '~4.5ms', note: '生成每个 token 的耗时' },
  { stage: 'First token latency', v32: '~2.0s', v4pro: '~0.5s', v4flash: '~0.2s', note: '首 token 响应时间' },
  { stage: 'Throughput', v32: '~22 tok/s', v4pro: '~83 tok/s', v4flash: '~222 tok/s', note: '每秒生成 token 数' },
]

/* ─── Animation variants ─── */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

/* ─── Bar Chart Component ─── */
const BarChart = memo(function BarChart() {
  const width = 720
  const height = 340
  const pad = { top: 30, right: 20, bottom: 50, left: 50 }
  const cw = width - pad.left - pad.right
  const ch = height - pad.top - pad.bottom
  const groupW = cw / barChartData.length
  const barW = 40
  const gap = 8

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* Y grid */}
      {[0, 25, 50, 75, 100].map((tick) => {
        const y = pad.top + ch - (tick / 100) * ch
        return (
          <g key={tick}>
            <line x1={pad.left} y1={y} x2={width - pad.right} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
            <text x={pad.left - 8} y={y + 4} textAnchor="end" fill="#8B9EB0" fontSize={11} fontFamily="JetBrains Mono, monospace">
              {tick}%
            </text>
          </g>
        )
      })}
      {/* Bars */}
      {barChartData.map((d, i) => {
        const gx = pad.left + i * groupW + (groupW - (2 * barW + gap)) / 2
        return (
          <g key={d.name}>
            {/* FLOPs bar */}
            <rect
              x={gx}
              y={pad.top + ch - (d.flops / 100) * ch}
              width={barW}
              height={(d.flops / 100) * ch}
              rx={4}
              fill="#3D8BFF"
              className="transition-all duration-300 hover:brightness-125"
            />
            {/* KV bar */}
            <rect
              x={gx + barW + gap}
              y={pad.top + ch - (d.kv / 100) * ch}
              width={barW}
              height={(d.kv / 100) * ch}
              rx={4}
              fill="#00E5FF"
              className="transition-all duration-300 hover:brightness-125"
            />
            {/* Labels */}
            <text
              x={gx + barW + gap / 2}
              y={height - 16}
              textAnchor="middle"
              fill="#8B9EB0"
              fontSize={13}
              fontFamily="Inter, sans-serif"
            >
              {d.name}
            </text>
            {/* Value labels */}
            <text
              x={gx + barW / 2}
              y={pad.top + ch - (d.flops / 100) * ch - 6}
              textAnchor="middle"
              fill="#3D8BFF"
              fontSize={11}
              fontFamily="JetBrains Mono, monospace"
            >
              {d.flops}%
            </text>
            <text
              x={gx + barW + gap + barW / 2}
              y={pad.top + ch - (d.kv / 100) * ch - 6}
              textAnchor="middle"
              fill="#00E5FF"
              fontSize={11}
              fontFamily="JetBrains Mono, monospace"
            >
              {d.kv}%
            </text>
          </g>
        )
      })}
    </svg>
  )
})

/* ─── Ring Chart Component ─── */
const RingChart = memo(function RingChart() {
  const size = 320
  const cx = size / 2
  const cy = size / 2
  const rOuter = 130
  const rMid = 105
  const rInner = 80

  const [progress, setProgress] = useState(0)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(1), 100)
    return () => clearTimeout(timer)
  }, [])

  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle)
    const end = polarToCartesian(x, y, radius, startAngle)
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1'
    return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`
  }

  const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
    const rad = (angle * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }

  // Animate arcs from 0 to target
  const outerAngle = 360 * progress
  const midAngle = 36 * progress // 10%
  const innerAngle = 25.2 * progress // 7%

  return (
    <div className="flex flex-col items-center">
      <svg ref={svgRef} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Outer: baseline 100% */}
        <path
          d={describeArc(cx, cy, rOuter, -90, -90 + outerAngle)}
          fill="none"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth={12}
          strokeLinecap="round"
          />
        {/* Mid: V4-Pro 10% */}
        <path
          d={describeArc(cx, cy, rMid, -90, -90 + midAngle)}
          fill="none"
          stroke="#3D8BFF"
          strokeWidth={12}
          strokeLinecap="round"
          />
        {/* Inner: V4-Flash 7% */}
        <path
          d={describeArc(cx, cy, rInner, -90, -90 + innerAngle)}
          fill="none"
          stroke="#00E5FF"
          strokeWidth={12}
          strokeLinecap="round"
          />
        {/* Center text */}
        {progress === 1 && (
          <text
            x={cx}
            y={cy + 8}
            textAnchor="middle"
            fill="#00E5FF"
            fontSize={42}
            fontFamily="Space Grotesk, sans-serif"
            fontWeight={500}
            className="animate-pulse"
            style={{ textShadow: '0 0 10px currentColor' }}
          >
            2%
          </text>
        )}
        {progress < 1 && (
          <text
            x={cx}
            y={cy + 8}
            textAnchor="middle"
            fill="#00E5FF"
            fontSize={42}
            fontFamily="Space Grotesk, sans-serif"
            fontWeight={500}
            opacity={0.3}
          >
            0%
          </text>
        )}
      </svg>
      {/* Legend */}
      <div className="flex flex-col gap-2 mt-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[rgba(255,255,255,0.2)]" />
          <span className="text-[13px] text-[#8B9EB0]">BF16 GQA8 基线（100%）</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#3D8BFF]" />
          <span className="text-[13px] text-[#8B9EB0]">V4-Pro（10%）</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-[#00E5FF]" />
          <span className="text-[13px] text-[#8B9EB0]">V4-Flash（7%）</span>
        </div>
      </div>
    </div>
  )
})

/* ─── Cost Calculator Component ─── */
const CostCalculator = memo(function CostCalculator() {
  const [dailyRequests, setDailyRequests] = useState(10000)
  const [seqLen, setSeqLen] = useState(4096)
  const [model, setModel] = useState('V4-Pro')

  const factor = modelFactors[model]
  const baselineFactor = modelFactors['V3.2']
  
  // cost = (dailyRequests × seqLen × modelFactor) / 1e12
  const dailyFlops = (dailyRequests * seqLen * factor) / 1e12
  const baselineDailyFlops = (dailyRequests * seqLen * baselineFactor) / 1e12
  const dailySavings = baselineDailyFlops - dailyFlops
  const monthlySavings = dailySavings * 30
  const yearlySavings = dailySavings * 365

  // GPU equivalence: 1 H100 = 989 TFLOPS/day at $2/hr = $48/day
  // But let's use the savings directly as a proxy
  // $2/hr * 24hr = $48/day per H100
  // The FLOPs numbers are in TFLOPs, so divide by 989 to get H100 equivalent
   / 100
  const yearlyGpuSavings = Math.round(yearlySavings / 989)

  const formatNumber = (n: number) => {
    if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B'
    if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M'
    if (n >= 1e3) return (n / 1e3).toFixed(1) + 'K'
    return n.toFixed(2)
  }

  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left: Inputs */}
      <div className="liquid-glass rounded-[12px] p-8 space-y-8">
        {/* Daily requests slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-[14px] text-white font-medium flex items-center gap-2">
              <Server size={16} className="text-[#3D8BFF]" />
              每日请求量
            </label>
            <span className="text-[14px] font-mono text-[#00E5FF]">{formatNumber(dailyRequests)}</span>
          </div>
          <input
            type="range"
            min={100}
            max={1000000}
            step={100}
            value={dailyRequests}
            onChange={(e) => setDailyRequests(Number(e.target.value))}
            className="w-full h-2 bg-[rgba(255,255,255,0.08)] rounded-full appearance-none cursor-pointer accent-[#00E5FF]"
            style={{
              background: `linear-gradient(to right, #00E5FF 0%, #00E5FF ${(Math.log10(dailyRequests) - 2) / 4 * 100}%, rgba(255,255,255,0.08) ${(Math.log10(dailyRequests) - 2) / 4 * 100}%, rgba(255,255,255,0.08) 100%)`,
            }}
          />
          <div className="flex justify-between mt-1">
            <span className="text-[11px] text-[#8B9EB0]">100</span>
            <span className="text-[11px] text-[#8B9EB0]">1M</span>
          </div>
        </div>

        {/* Sequence length buttons */}
        <div>
          <label className="text-[14px] text-white font-medium flex items-center gap-2 mb-3">
            <HardDrive size={16} className="text-[#3D8BFF]" />
            序列长度
          </label>
          <div className="flex flex-wrap gap-2">
            {seqLengthOptions.map((len, i) => (
              <button
                key={len}
                onClick={() => setSeqLen(len)}
                className={cn(
                  'px-4 py-2 rounded-[8px] text-[13px] font-medium transition-all duration-200 border',
                  seqLen === len
                    ? 'bg-[rgba(0,229,255,0.12)] text-[#00E5FF] border-[rgba(0,229,255,0.3)]'
                    : 'bg-transparent text-[#8B9EB0] border-[rgba(255,255,255,0.1)] hover:text-white hover:border-[rgba(255,255,255,0.2)]'
                )}
              >
                {seqLengthLabels[i]}
              </button>
            ))}
          </div>
        </div>

        {/* Model radio */}
        <div>
          <label className="text-[14px] text-white font-medium flex items-center gap-2 mb-3">
            <Cpu size={16} className="text-[#3D8BFF]" />
            选择模型
          </label>
          <div className="flex flex-wrap gap-3">
            {Object.keys(modelFactors).map((m) => (
              <label
                key={m}
                className={cn(
                  'flex items-center gap-2 px-4 py-2.5 rounded-[8px] border cursor-pointer transition-all duration-200',
                  model === m
                    ? 'bg-[rgba(0,229,255,0.08)] border-[rgba(0,229,255,0.3)]'
                    : 'bg-transparent border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]'
                )}
              >
                <input
                  type="radio"
                  name="model"
                  value={m}
                  checked={model === m}
                  onChange={() => setModel(m)}
                  className="accent-[#00E5FF] w-4 h-4"
                />
                <div className="flex flex-col">
                  <span className={cn('text-[13px] font-medium', model === m ? 'text-[#00E5FF]' : 'text-white')}>
                    {m}
                  </span>
                  <span className="text-[11px] text-[#8B9EB0]">{modelFactors[m] * 100}% 基线</span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Outputs */}
      <div className="space-y-4">
        <motion.div
          className="liquid-glass rounded-[12px] p-6 border-l-4 border-l-[#00E5FF]"
          key={`${dailyRequests}-${seqLen}-${model}-flops`}
          initial={{ scale: 0.98, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 size={16} className="text-[#00E5FF]" />
            <span className="text-[13px] text-[#8B9EB0]">每日 FLOPs（相对 V3.2 基线）</span>
          </div>
          <div className="font-heading text-[32px] font-semibold text-white">
            {formatNumber(dailyFlops)} TFLOPs
          </div>
          <div className="text-[13px] text-[#8B9EB0] mt-1">
            基线: {formatNumber(baselineDailyFlops)} TFLOPs
          </div>
        </motion.div>

        <motion.div
          className="liquid-glass rounded-[12px] p-6 border-l-4 border-l-[#3D8BFF]"
          key={`${dailyRequests}-${seqLen}-${model}-monthly`}
          initial={{ scale: 0.98, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.05 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <DollarSign size={16} className="text-[#3D8BFF]" />
            <span className="text-[13px] text-[#8B9EB0]">月度节省 FLOPs</span>
          </div>
          <div className="font-heading text-[32px] font-semibold text-[#00E5FF]">
            {formatNumber(monthlySavings)} TFLOPs
          </div>
        </motion.div>

        <motion.div
          className="liquid-glass rounded-[12px] p-6 border-l-4 border-l-[#00E5FF]"
          key={`${dailyRequests}-${seqLen}-${model}-yearly`}
          initial={{ scale: 0.98, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingDown size={16} className="text-[#00E5FF]" />
            <span className="text-[13px] text-[#8B9EB0]">年度节省 FLOPs</span>
          </div>
          <div className="font-heading text-[32px] font-semibold text-[#00E5FF]">
            {formatNumber(yearlySavings)} TFLOPs
          </div>
        </motion.div>

        <motion.div
          className="liquid-glass rounded-[12px] p-6 border-l-4 border-l-[#FFD700]"
          key={`${dailyRequests}-${seqLen}-${model}-gpu`}
          initial={{ scale: 0.98, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Cpu size={16} className="text-[#FFD700]" />
            <span className="text-[13px] text-[#8B9EB0]">GPU 等效节省</span>
          </div>
          <div className="font-heading text-[28px] font-semibold text-white">
            相当于节省 <span className="text-[#FFD700]">{yearlyGpuSavings.toLocaleString()}</span> 张 H100 GPU/年
          </div>
          <div className="text-[12px] text-[#8B9EB0] mt-1">
            基于 H100 = 989 TFLOPS/day @ $2/hr
          </div>
        </motion.div>
      </div>
    </div>
  )
})

/* ─── Memory Bar Item ─── */
const MemoryBarItem = memo(function MemoryBarItem({ item, index }: { item: typeof memoryData[0]; index: number }) {
  const v32Pct = (item.v32 / item.max) * 100
  const v4proPct = (item.v4pro / item.max) * 100
  const v4flashPct = (item.v4flash / item.max) * 100
  const v32save = Math.round((1 - item.v4pro / item.v32) * 100)
  const flashsave = Math.round((1 - item.v4flash / item.v32) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[14px] text-white font-medium">{item.context} 上下文</span>
        <div className="flex gap-2">
          <span className="text-[11px] px-2 py-0.5 rounded bg-[rgba(0,229,255,0.1)] text-[#00E5FF] border border-[rgba(0,229,255,0.2)]">
            V4-Pro 节省 {v32save}%
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-[rgba(255,184,77,0.1)] text-[#ffb84d] border border-[rgba(255,184,77,0.2)]">
            V4-Flash 节省 {flashsave}%
          </span>
        </div>
      </div>

      {/* V3.2 bar */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] text-[rgba(255,255,255,0.5)] w-16">V3.2</span>
          <div className="flex-1 h-2.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[rgba(239,68,68,0.7)]"
              style={{ width: `${v32Pct}%` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.1, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <span className="text-[11px] text-[rgba(255,255,255,0.5)] font-mono w-12 text-right">{item.v32}GB</span>
        </div>
      </div>

      {/* V4-Pro bar */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] text-[#00E5FF] w-16">V4-Pro</span>
          <div className="flex-1 h-2.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[#00E5FF]"
              style={{ width: `${v4proPct}%` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.2, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <span className="text-[11px] text-[#00E5FF] font-mono w-12 text-right">{item.v4pro}GB</span>
        </div>
      </div>

      {/* V4-Flash bar */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[11px] text-[#ffb84d] w-16">V4-Flash</span>
          <div className="flex-1 h-2.5 bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[#ffb84d]"
              style={{ width: `${v4flashPct}%` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <span className="text-[11px] text-[#ffb84d] font-mono w-12 text-right">{item.v4flash}GB</span>
        </div>
      </div>
    </motion.div>
  )
})

/* ─── Main Page ─── */
export default function Efficiency() {
  return (
    <div className="min-h-[100dvh] bg-[#050B14] relative">
      {/* Particle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <ParticleCanvas />
      </div>

      {/* ── Page Header ── */}
      <section className="relative z-10 min-h-[40vh] flex items-center">
        <div className="max-w-[1280px] mx-auto px-6 w-full pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 text-[13px] text-[#8B9EB0] mb-4">
              <Link to="/deepseek" className="hover:text-[#3D8BFF] transition-colors">DeepSeek</Link>
              <span>/</span>
              <span className="text-[#00E5FF]">效率分析</span>
            </div>
            <h1 className="font-heading text-[48px] font-bold text-white tracking-tight mb-3">
              效率分析
            </h1>
            <p className="text-[20px] text-[#8B9EB0] font-body max-w-[640px] leading-relaxed">
              参数更少，效率更高，性能更强
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Beginner Efficiency Guide ── */}
      <section className="relative z-10 py-[60px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h2 className="font-heading text-[28px] font-semibold text-white flex items-center gap-3">
              <span className="text-[28px]">⚡</span>
              效率提升小白解读
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Card 1: FLOPs = 计算量 */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="liquid-glass rounded-xl p-6 lg:p-8 border-t-2 border-[#3D8BFF]"
            >
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-5 h-5 text-[#3D8BFF]" />
                <Calculator className="w-5 h-5 text-[#3D8BFF]" />
                <Clock className="w-5 h-5 text-[#3D8BFF]" />
              </div>
              <h3 className="font-heading text-[20px] font-semibold text-white mb-4">
                📊 FLOPs = 计算量
              </h3>
              <div className="font-body text-[16px] leading-[1.7] text-[#8B9EB0] space-y-3">
                <p>
                  FLOPs = "每秒浮点运算次数"，简单说就是「<span className="text-[#00E5FF] font-semibold">算了多少次加减乘除</span>」。
                </p>
                <p>
                  想象做一道数学题：V3.2 做 1M token 的题需要算 100 次，V4-Pro 只需要算 27 次就得出同样答案——因为 V4 更聪明，<span className="text-[#00E5FF] font-semibold">跳过了重复计算</span>。
                </p>
                <p>
                  <span className="text-[#00E5FF] font-semibold">3.7× 更快</span> = 原来3分钟的事，现在不到1分钟！
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                <span className="data-tag inline-flex items-center gap-1 text-[12px]">
                  💡 专业术语：<span className="text-[#8B9EB0]">FLOPs、token</span>
                </span>
              </div>
            </motion.div>

            {/* Card 2: KV Cache 压缩 = 省内存 */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="liquid-glass rounded-xl p-6 lg:p-8 border-t-2 border-[#00E5FF]"
            >
              <div className="flex items-center gap-2 mb-4">
                <HardDrive className="w-5 h-5 text-[#00E5FF]" />
                <Hash className="w-5 h-5 text-[#00E5FF]" />
                <Sparkles className="w-5 h-5 text-[#00E5FF]" />
              </div>
              <h3 className="font-heading text-[20px] font-semibold text-white mb-4">
                💾 KV Cache 压缩 = 省内存
              </h3>
              <div className="font-body text-[16px] leading-[1.7] text-[#8B9EB0] space-y-3">
                <p>
                  1M token 的 KV Cache 就像一本 <span className="text-[#00E5FF] font-semibold">1000 页的书</span>。
                </p>
                <p>
                  V3.2 需要把整本书放在桌上（100% 内存）。
                </p>
                <p>
                  V4-Pro 只需要放 100 页精华摘要（10% 内存）——因为 CSA+HCA 把书<span className="text-[#00E5FF] font-semibold">压缩了</span>。
                </p>
                <p>
                  <span className="text-[#00E5FF] font-semibold">9.8× 更省内存</span> = 原来需要 10 张桌子的空间，现在 1 张就够！
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                <span className="data-tag inline-flex items-center gap-1 text-[12px]">
                  💡 专业术语：<span className="text-[#8B9EB0]">KV Cache、CSA、HCA</span>
                </span>
              </div>
            </motion.div>

            {/* Card 3: 为什么能省这么多？ */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="liquid-glass rounded-xl p-6 lg:p-8 border-t-2 border-[#ffb84d]"
            >
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#ffb84d]" />
                <Gauge className="w-5 h-5 text-[#ffb84d]" />
                <BarChart3 className="w-5 h-5 text-[#ffb84d]" />
              </div>
              <h3 className="font-heading text-[20px] font-semibold text-white mb-4">
                🎯 为什么能省这么多？
              </h3>
              <div className="font-body text-[16px] leading-[1.7] text-[#8B9EB0] space-y-3">
                <p>
                  想象你看视频：
                </p>
                <p>
                  • <span className="text-[#00E5FF] font-semibold">BF16</span> = 4K 超高清，占空间最大
                </p>
                <p>
                  • <span className="text-[#00E5FF] font-semibold">FP8</span> = 1080P 高清，省一半空间
                </p>
                <p>
                  • <span className="text-[#00E5FF] font-semibold">FP4</span> = 720P 标清，再省一半
                </p>
                <p>
                  DeepSeek-V4 的聪明之处：<span className="text-[#00E5FF] font-semibold">不同部分用不同精度</span>。位置编码用 4K（不能丢精度），其他部分用 720P（省空间）。
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                <span className="data-tag inline-flex items-center gap-1 text-[12px]">
                  💡 专业术语：<span className="text-[#8B9EB0]">BF16、FP8、FP4、混合精度</span>
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── FLOPs Comparison ── */}
      <section className="relative z-10 py-[120px] pb-[100px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label block mb-3">[ 计算效率 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-12">
              单 Token 推理 FLOPs 对比
            </h2>
          </motion.div>

          {/* Three big cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-[60px]">
            {flopsCards.map((card, i) => (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="liquid-glass liquid-glass-hover rounded-[12px] p-8 flex flex-col justify-between h-[280px]"
                style={{ borderTop: `4px solid ${card.borderColor}` }}
              >
                <div>
                  <span className="data-tag text-[12px] block w-fit mb-4">{card.label}</span>
                  <div className="relative inline-block">
                    {i > 0 ? (
                      <HolographicText
                        text={card.number}
                        as="div"
                        className="font-heading text-[64px] font-medium tracking-tight"
                        />
                    ) : (
                      <span className="font-heading text-[64px] font-medium text-[#8B9EB0] tracking-tight">
                        {card.number}
                      </span>
                    )}
                    {card.showLine && (
                      <div className="h-[2px] bg-[#00E5FF] mt-1 w-full" />
                    )}
                  </div>
                </div>
                <div>
                  <p className="text-[15px] text-[#8B9EB0] mb-1">
                    {card.subtext || (
                      <>
                        {card.subtextPrefix} <span className="text-white font-semibold">{card.subtextBold}</span>
                      </>
                    )}
                  </p>
                  <p className="text-[13px] text-[#8B9EB0] font-mono">{card.params}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bar chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-[60px]"
          >
            <div className="flex items-center gap-6 mb-4 justify-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#3D8BFF]" />
                <span className="text-[13px] text-[#8B9EB0]">推理 FLOPs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#00E5FF]" />
                <span className="text-[13px] text-[#8B9EB0]">KV Cache</span>
              </div>
            </div>
            <BarChart />
          </motion.div>

          {/* Trend table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="liquid-glass rounded-[12px] overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="bg-[rgba(61,139,255,0.15)]">
                    <th className="text-left text-white text-[13px] font-medium tracking-wide px-5 py-4 border-b border-[rgba(61,139,255,0.3)]">序列长度</th>
                    <th className="text-center text-white text-[13px] font-medium tracking-wide px-3 py-4 border-b border-[rgba(61,139,255,0.3)]">V3.2 FLOPs</th>
                    <th className="text-center text-white text-[13px] font-medium tracking-wide px-3 py-4 border-b border-[rgba(61,139,255,0.3)]">V4-Pro FLOPs</th>
                    <th className="text-center text-white text-[13px] font-medium tracking-wide px-3 py-4 border-b border-[rgba(61,139,255,0.3)]">V4-Flash FLOPs</th>
                    <th className="text-center text-white text-[13px] font-medium tracking-wide px-3 py-4 border-b border-[rgba(61,139,255,0.3)]">V3.2 KV Cache</th>
                    <th className="text-center text-white text-[13px] font-medium tracking-wide px-3 py-4 border-b border-[rgba(61,139,255,0.3)]">V4-Pro KV Cache</th>
                    <th className="text-center text-white text-[13px] font-medium tracking-wide px-3 py-4 border-b border-[rgba(61,139,255,0.3)]">V4-Flash KV Cache</th>
                  </tr>
                </thead>
                <tbody>
                  {trendTable.map((row, ri) => {
                    const bg = row.highlight ? 'rgba(0,229,255,0.08)' : ri % 2 === 0 ? '#0A1628' : '#0D1B2E'
                    return (
                      <motion.tr
                        key={row.seq}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: ri * 0.04, duration: 0.4 }}
                        className="group hover:bg-[rgba(61,139,255,0.06)] transition-colors"
                        style={{ background: bg }}
                      >
                        <td className="px-5 py-4 text-[13px] text-white font-medium">{row.seq}</td>
                        <td className="px-3 py-4 text-center text-[14px] font-mono text-[#8B9EB0]">{row.v32f}</td>
                        <td className="px-3 py-4 text-center text-[14px] font-mono text-[#8B9EB0]">{row.prof}</td>
                        <td className="px-3 py-4 text-center text-[14px] font-mono text-[#8B9EB0]">{row.flashf}</td>
                        <td className="px-3 py-4 text-center text-[14px] font-mono text-[#8B9EB0]">{row.v32k}</td>
                        <td className="px-3 py-4 text-center text-[14px] font-mono text-[#8B9EB0]">{row.prok}</td>
                        <td className="px-3 py-4 text-center text-[14px] font-mono text-[#8B9EB0]">{row.flashk}</td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── KV Cache Compression ── */}
      <section className="relative z-10 py-[120px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <span className="section-label block mb-3">[ 内存效率 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white">
              KV Cache 压缩：从 100% 到 2%
            </h2>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Left: Ring chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex-1 flex justify-center"
            >
              <RingChart />
            </motion.div>

            {/* Right: Source cards */}
            <div className="lg:w-[480px] flex flex-col gap-4">
              {sourceCards.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="liquid-glass rounded-[10px] p-5 flex gap-4 group hover:bg-[rgba(10,22,40,0.8)] transition-colors"
                >
                  <div
                    className="w-[4px] rounded-full shrink-0 self-stretch transition-all duration-200 group-hover:w-[6px]"
                    />
                  <div className="flex-1">
                    <h4 className="text-[16px] font-semibold text-white mb-1">{card.title}</h4>
                    <p className="text-[15px] text-[#8B9EB0] leading-relaxed mb-2">{card.desc}</p>
                    <span className="font-mono text-[13px] text-[#00E5FF]">{card.note}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Achievement Summary ── */}
      <section className="relative z-10 py-[100px]">
        <div
          className="absolute inset-0 pointer-events-none"
          />
        <div className="max-w-[1280px] mx-auto px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <span className="section-label block mb-3">[ 核心成就 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white">
              效率与性能的双重突破
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievementCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                className="liquid-glass liquid-glass-hover rounded-[12px] p-8"
                style={{ borderTop: `3px solid ${card.borderColor}` }}
              >
                <h3 className="font-heading text-[24px] font-semibold text-white mb-3">{card.title}</h3>
                <p className="text-[17px] text-[#8B9EB0] leading-relaxed">{card.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEW Section A: Cost Calculator ── */}
      <section className="relative z-10 py-[100px]">
        <div
          className="absolute inset-0 pointer-events-none"
          />
        <div className="max-w-[1280px] mx-auto px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <span className="section-label block mb-3">[ 成本计算 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white flex items-center gap-3">
              <DollarSign size={28} className="text-[#00E5FF]" />
              使用成本计算器
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <CostCalculator />
          </motion.div>
        </div>
      </section>

      {/* ── NEW Section B: Memory Usage Bars ── */}
      <section className="relative z-10 py-[100px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <span className="section-label block mb-3">[ 内存占用 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white flex items-center gap-3">
              <HardDrive size={28} className="text-[#00E5FF]" />
              内存占用可视化
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="liquid-glass rounded-[12px] p-8"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[rgba(239,68,68,0.7)]" />
                  <span className="text-[12px] text-[#8B9EB0]">V3.2</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#00E5FF]" />
                  <span className="text-[12px] text-[#8B9EB0]">V4-Pro</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ffb84d]" />
                  <span className="text-[12px] text-[#8B9EB0]">V4-Flash</span>
                </div>
              </div>

              {memoryData.map((item, i) => (
                <MemoryBarItem key={item.context} item={item} index={i} />
              ))}
            </motion.div>

            {/* Right: Summary card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="liquid-glass rounded-[12px] p-8 flex flex-col justify-center"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.2)] flex items-center justify-center">
                  <Hash size={20} className="text-[#00E5FF]" />
                </div>
                <h3 className="font-heading text-[20px] font-semibold text-white">内存节省总结</h3>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.08)]">
                  <span className="text-[14px] text-[#8B9EB0]">1M 上下文 V3.2</span>
                  <span className="text-[20px] font-mono text-[rgba(239,68,68,0.8)] font-semibold">800 GB</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.08)]">
                  <span className="text-[14px] text-[#8B9EB0]">1M 上下文 V4-Pro</span>
                  <span className="text-[20px] font-mono text-[#00E5FF] font-semibold">210 GB</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-[rgba(255,255,255,0.08)]">
                  <span className="text-[14px] text-[#8B9EB0]">1M 上下文 V4-Flash</span>
                  <span className="text-[20px] font-mono text-[#ffb84d] font-semibold">115 GB</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-[14px] text-white font-semibold">V4-Flash 相对 V3.2 节省</span>
                  <span className="text-[24px] font-mono text-[#00E5FF] font-semibold">85.6%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── NEW Section C: Inference Speed Table ── */}
      <section className="relative z-10 py-[100px] pb-[160px]">
        <div
          className="absolute inset-0 pointer-events-none"
          />
        <div className="max-w-[1280px] mx-auto px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
            className="mb-12"
          >
            <span className="section-label block mb-3">[ 推理速度 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white flex items-center gap-3">
              <Zap size={28} className="text-[#00E5FF]" />
              推理速度详细对比
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="liquid-glass rounded-[12px] overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-[rgba(61,139,255,0.15)]">
                    <th className="text-left text-white text-[13px] font-medium tracking-wide px-5 py-4 border-b border-[rgba(61,139,255,0.3)] sticky left-0 bg-[rgba(61,139,255,0.15)] z-10">
                      阶段
                    </th>
                    <th className="text-center text-white text-[13px] font-medium tracking-wide px-3 py-4 border-b border-[rgba(61,139,255,0.3)]">
                      V3.2
                    </th>
                    <th className="text-center text-white text-[13px] font-medium tracking-wide px-3 py-4 border-b border-[rgba(61,139,255,0.3)]">
                      V4-Pro
                    </th>
                    <th className="text-center text-white text-[13px] font-medium tracking-wide px-3 py-4 border-b border-[rgba(61,139,255,0.3)]">
                      V4-Flash
                    </th>
                    <th className="text-left text-white text-[13px] font-medium tracking-wide px-3 py-4 border-b border-[rgba(61,139,255,0.3)]">
                      优化说明
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {speedTableData.map((row, ri) => {
                    const isOdd = ri % 2 === 0
                    const rowBg = isOdd ? '#0A1628' : '#0D1B2E'
                    return (
                      <motion.tr
                        key={row.stage}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: ri * 0.06, duration: 0.4 }}
                        className="group transition-colors duration-200 hover:bg-[rgba(61,139,255,0.06)]"
                        style={{ background: rowBg }}
                      >
                        <td className="px-5 py-4 text-[13px] text-white font-medium sticky left-0 z-10 group-hover:bg-[rgba(61,139,255,0.06)] transition-colors" style={{ background: 'inherit' }}>
                          {row.stage}
                        </td>
                        <td className="px-3 py-4 text-center text-[14px] font-mono text-[rgba(255,255,255,0.5)]">
                          {row.v32}
                        </td>
                        <td className="px-3 py-4 text-center text-[14px] font-mono text-[#3D8BFF] font-semibold">
                          {row.v4pro}
                        </td>
                        <td className="px-3 py-4 text-center text-[14px] font-mono text-[#00E5FF] font-semibold">
                          {row.v4flash}
                        </td>
                        <td className="px-3 py-4 text-left text-[13px] text-[#8B9EB0]">
                          {row.note}
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Speed insight cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0, duration: 0.6 }}
              className="liquid-glass rounded-[12px] p-6 border-t-2 border-t-[#00E5FF]"
            >
              <span className="text-[13px] text-[#8B9EB0] block mb-2">V4-Pro 速度提升</span>
              <div className="font-heading text-[36px] font-semibold text-[#00E5FF]">
                3.7×
              </div>
              <p className="text-[13px] text-[#8B9EB0] mt-2">相比 V3.2 基线</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="liquid-glass rounded-[12px] p-6 border-t-2 border-t-[#ffb84d]"
            >
              <span className="text-[13px] text-[#8B9EB0] block mb-2">V4-Flash 速度提升</span>
              <div className="font-heading text-[36px] font-semibold text-[#ffb84d]">
                10×
              </div>
              <p className="text-[13px] text-[#8B9EB0] mt-2">相比 V3.2 基线</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="liquid-glass rounded-[12px] p-6 border-t-2 border-t-[#3D8BFF]"
            >
              <span className="text-[13px] text-[#8B9EB0] block mb-2">吞吐量最高</span>
              <div className="font-heading text-[36px] font-semibold text-[#3D8BFF]">
                222 <span className="text-[18px]">tok/s</span>
              </div>
              <p className="text-[13px] text-[#8B9EB0] mt-2">V4-Flash 峰值</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
