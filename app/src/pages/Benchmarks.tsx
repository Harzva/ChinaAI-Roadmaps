import { useState, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router'
import ParticleCanvas from '@/components/ParticleCanvas'
import HolographicText from '@/components/HolographicText'
import { cn } from '@/lib/utils'
import { BookOpen, Brain, Code2, Terminal, Trophy, GraduationCap, FlaskConical, Code, Crown, Medal, Globe, Rocket, Zap, Lightbulb, BrainCircuit, MessageCircle, Table, Eye, ArrowUpRight, CheckCircle, AlertTriangle, Bot, User, Calendar, Search } from 'lucide-react'

/* ─── Data ─── */

const tableData = [
  { benchmark: 'MMLU-Pro (EM)', claude: 89.1, gpt: 87.5, gemini: 91.0, k2: 87.1, glm: 86.0, ds: 87.5, best: 'gemini' },
  { benchmark: 'SimpleQA-Verified (Pass@1)', claude: 46.2, gpt: 45.3, gemini: 75.6, k2: 36.9, glm: 38.1, ds: 57.9, best: 'ds' },
  { benchmark: 'Chinese-SimpleQA (Pass@1)', claude: 76.4, gpt: 76.8, gemini: 85.9, k2: 75.9, glm: 75.0, ds: 84.4, best: 'gemini' },
  { benchmark: 'GPQA Diamond (Pass@1)', claude: 91.3, gpt: 93.0, gemini: 94.3, k2: 90.5, glm: 86.2, ds: 90.1, best: 'gemini' },
  { benchmark: 'HLE (Pass@1)', claude: 40.0, gpt: 39.8, gemini: 44.4, k2: 36.4, glm: 34.7, ds: 37.7, best: 'gemini' },
  { benchmark: 'LiveCodeBench (Pass@1)', claude: 88.8, gpt: null, gemini: 91.7, k2: 89.6, glm: null, ds: 93.5, best: 'ds' },
  { benchmark: 'Codeforces (Rating)', claude: null, gpt: 3168, gemini: 3052, k2: null, glm: null, ds: 3206, best: 'ds' },
  { benchmark: 'HMMT 2026 Feb (Pass@1)', claude: 96.2, gpt: 97.7, gemini: 94.7, k2: 92.7, glm: 89.4, ds: 95.2, best: 'gpt' },
  { benchmark: 'IMO AnswerBench (Pass@1)', claude: 75.3, gpt: 91.4, gemini: 81.0, k2: 86.0, glm: 83.8, ds: 89.8, best: 'ds' },
  { benchmark: 'Apex (Pass@1)', claude: 34.5, gpt: 54.1, gemini: 60.9, k2: 24.0, glm: 11.5, ds: 38.3, best: 'gemini' },
  { benchmark: 'Apex Shortlist (Pass@1)', claude: 85.9, gpt: 78.1, gemini: 89.1, k2: 75.5, glm: 72.4, ds: 90.2, best: 'ds' },
]

const conclusionCards = [
  {
    icon: BookOpen,
    title: '知识',
    content: 'V4-Pro-Max 在 SimpleQA 上显著超越所有开源模型（领先 20 个绝对百分点），成为开源模型新知识 SOTA。距顶级闭源约 3~6 个月差距。',
  },
  {
    icon: Brain,
    title: '推理',
    content: 'MMLU-Pro、GPQA、HLE 上略领先开源对手，IMO AnswerBench 89.8 接近 GPT-5.4 水平。',
  },
  {
    icon: Code2,
    title: '代码',
    content: 'LiveCodeBench 93.5 超越所有对比模型，Codeforces 3206 排名人类第 23 位，开源模型首次匹敌闭源。',
  },
]

/* Radar chart data */
const radarDims = ['MMLU-Pro', 'SimpleQA', 'GPQA', 'LiveCodeBench', 'IMO', 'Apex']
const radarData = {
  'V4-Pro-Max': [87.5, 57.9, 90.1, 93.5, 89.8, 38.3],
  'V4-Flash-Max': [85.2, 52.1, 87.5, 89.2, 84.1, 32.5],
  'Gemini-3.1-Pro': [91.0, 75.6, 94.3, 91.7, 81.0, 60.9],
}

/* Bar chart data */
const barGroups = ['LiveCodeBench', 'Codeforces', 'SWE-Verified', 'TerminalBench']
const barData = {
  'V4-Pro-Max': [93.5, 3206, 80.6, 72.3],
  'V4-Flash-Max': [89.2, 2890, 74.1, 68.5],
  'Claude-Opus-4.6': [88.8, 3100, 78.9, 70.1],
}
/* Normalize Codeforces for bar chart visual */
const barMax = [100, 3500, 100, 100]

/* Line chart data */
const lineX = ['128K', '256K', '512K', '768K', '1M']
const lineData = {
  'V4-Pro-Max': [85, 84, 83, 83, 83.5],
  'Gemini-3.1-Pro': [80, 78, 72, 68, 76.3],
  'Claude-Opus-4.6': [90, 91, 92, 92, 92.9],
}

/* Agent cards */
const agentCards = [
  { benchmark: 'BrowseComp', value: '83.4', note: '与 Opus-4.6 (83.7) 接近', best: false },
  { benchmark: 'HLE w/ tools', value: '48.2', note: '—', best: false },
  { benchmark: 'GDPval-AA (Elo)', value: '1554', note: '超越 K2.6 (1482) 和 GLM-5.1 (1535)', best: true },
  { benchmark: 'MCP Atlas Public', value: '73.6', note: '与 Opus-4.6 (73.8) 持平', best: false },
  { benchmark: 'Toolathlon', value: '51.8', note: '超越所有对比模型', best: true },
  { benchmark: 'SWE-Verified', value: '80.6', note: '与 K2.6 持平，与 Opus-4.6 并列', best: true },
]

const sotaCards = [
  { benchmark: 'LiveCodeBench', value: '93.5', desc: '超越所有对比模型，代码生成能力行业顶尖' },
  { benchmark: 'Codeforces', value: '3206', desc: '开源模型首次匹敌闭源，排名人类选手第 23 位' },
  { benchmark: 'Apex Shortlist', value: '90.2', desc: '学术推理新高度，形式化数学竞赛顶尖成绩' },
  { benchmark: 'Toolathlon', value: '51.8', desc: 'Agent 工具调用能力全面领先所有对比模型' },
]

const tabs = ['知识推理', '代码能力', '长上下文', 'Agent 能力']

/* ─── NEW DATA: Full Mode Comparison (Table 7) ─── */
const fullModeData = [
  { benchmark: 'MMLU-Pro', flashNon: 83.0, flashHigh: 86.4, flashMax: 86.2, proNon: 82.9, proHigh: 87.1, proMax: 87.5 },
  { benchmark: 'SimpleQA-Verified', flashNon: 23.1, flashHigh: 28.9, flashMax: 34.1, proNon: 45.0, proHigh: 46.2, proMax: 57.9 },
  { benchmark: 'Chinese-SimpleQA', flashNon: 71.5, flashHigh: 73.2, flashMax: 78.9, proNon: 75.8, proHigh: 77.7, proMax: 84.4 },
  { benchmark: 'GPQA Diamond', flashNon: 71.2, flashHigh: 87.4, flashMax: 88.1, proNon: 72.9, proHigh: 89.1, proMax: 90.1 },
  { benchmark: 'HLE', flashNon: 8.1, flashHigh: 29.4, flashMax: 34.8, proNon: 7.7, proHigh: 34.5, proMax: 37.7 },
  { benchmark: 'LiveCodeBench', flashNon: 55.2, flashHigh: 88.4, flashMax: 91.6, proNon: 56.8, proHigh: 89.8, proMax: 93.5 },
  { benchmark: 'Codeforces', flashNon: null, flashHigh: 2816, flashMax: 3052, proNon: null, proHigh: 2919, proMax: 3206 },
  { benchmark: 'HMMT 2026 Feb', flashNon: 40.8, flashHigh: 91.9, flashMax: 94.8, proNon: 31.7, proHigh: 94.0, proMax: 95.2 },
  { benchmark: 'IMO AnswerBench', flashNon: 41.9, flashHigh: 85.1, flashMax: 88.4, proNon: 35.3, proHigh: 88.0, proMax: 89.8 },
  { benchmark: 'Apex', flashNon: 1.0, flashHigh: 19.1, flashMax: 33.0, proNon: 0.4, proHigh: 27.4, proMax: 38.3 },
  { benchmark: 'Apex Shortlist', flashNon: 9.3, flashHigh: 72.1, flashMax: 85.7, proNon: 9.2, proHigh: 85.5, proMax: 90.2 },
  { benchmark: 'MRCR 1M', flashNon: 37.5, flashHigh: 76.9, flashMax: 78.7, proNon: 44.7, proHigh: 83.3, proMax: 83.5 },
  { benchmark: 'CorpusQA 1M', flashNon: 15.5, flashHigh: 59.3, flashMax: 60.5, proNon: 35.6, proHigh: 56.5, proMax: 62.0 },
  { benchmark: 'TerminalBench 2.0', flashNon: 49.1, flashHigh: 56.6, flashMax: 56.9, proNon: 59.1, proHigh: 63.3, proMax: 67.9 },
  { benchmark: 'SWE-Verified', flashNon: 73.7, flashHigh: 78.6, flashMax: 79.0, proNon: 73.6, proHigh: 79.4, proMax: 80.6 },
  { benchmark: 'SWE-Pro', flashNon: 49.1, flashHigh: 52.3, flashMax: 52.6, proNon: 52.1, proHigh: 54.4, proMax: 55.4 },
  { benchmark: 'BrowseComp', flashNon: null, flashHigh: 53.5, flashMax: 73.2, proNon: null, proHigh: 80.4, proMax: 83.4 },
  { benchmark: 'HLE w/ tools', flashNon: null, flashHigh: 40.3, flashMax: 45.1, proNon: null, proHigh: 44.7, proMax: 48.2 },
  { benchmark: 'Toolathlon', flashNon: 40.7, flashHigh: 43.5, flashMax: 47.8, proNon: 46.3, proHigh: 49.0, proMax: 51.8 },
]

/* ─── NEW DATA: Code Ability Detail ─── */
const codeDetailData = [
  { benchmark: 'LiveCodeBench', v4proMax: 93.5, opponent: 'Gemini-3.1-Pro (91.7)', gap: '+1.8' },
  { benchmark: 'Codeforces Rating', v4proMax: 3206, opponent: 'GPT-5.4 (3168)', gap: '+38' },
  { benchmark: 'SWE-Verified', v4proMax: 80.6, opponent: 'K2.6 / Opus-4.6 (80.6)', gap: '持平' },
  { benchmark: 'SWE-Pro', v4proMax: 55.4, opponent: '—', gap: 'SOTA' },
  { benchmark: 'SWE-Multilingual', v4proMax: 76.2, opponent: '—', gap: 'SOTA' },
  { benchmark: 'TerminalBench 2.0', v4proMax: 67.9, opponent: '—', gap: 'SOTA' },
]

/* ─── NEW DATA: Agent Capability Detail ─── */
const agentDetailData = [
  { benchmark: 'BrowseComp', v4proMax: 83.4, comparison: '与 Opus-4.6 (83.7) 接近' },
  { benchmark: 'HLE w/ tools', v4proMax: 48.2, comparison: '—' },
  { benchmark: 'GDPval-AA (Elo)', v4proMax: 1554, comparison: '超越 K2.6 (1482) 和 GLM-5.1 (1535)' },
  { benchmark: 'MCP Atlas Public', v4proMax: 73.6, comparison: '与 Opus-4.6 (73.8) 持平' },
  { benchmark: 'Toolathlon', v4proMax: 51.8, comparison: '超越所有对比模型' },
]

/* ─── NEW DATA: Long Context ─── */
const longContextData = [
  { benchmark: 'MRCR 1M (MMR)', claude: 92.9, gemini: 76.3, v4proMax: 83.5, winner: 'Claude' },
  { benchmark: 'CorpusQA 1M (ACC)', claude: 71.7, gemini: 53.8, v4proMax: 62.0, winner: 'Claude' },
]

/* ─── NEW DATA: Additional SOTA Cards ─── */
const extraSotaCards = [
  { benchmark: 'TerminalBench 2.0', value: '67.9', desc: '终端操作与系统交互能力行业顶尖' },
  { benchmark: 'Toolathlon', value: '51.8', desc: 'Agent 工具调用能力全面领先所有对比模型' },
  { benchmark: 'SWE-Verified', value: '80.6', desc: '开源 SOTA，软件工程修复能力媲美顶级闭源模型' },
]

/* ─── NEW DATA: AI vs Human Progress Bars ─── */
const humanVsAiData = [
  { name: 'MMLU-Pro', ai: 87.5, human: 90 },
  { name: 'GPQA Diamond', ai: 90.1, human: 85, badge: '超越' },
  { name: 'Codeforces', ai: 100, human: 75, badge: '超越', detail: '3206 vs 2400分' },
  { name: 'SWE-bench', ai: 100, human: 25, badge: '超越', detail: '80.6% vs 25%' },
  { name: 'HLE', ai: 100, human: 15, badge: '超越' },
  { name: 'HMMT', ai: 95.2, human: 60, badge: '超越' },
]

/* ─── NEW DATA: Model Evolution Timeline ─── */
const evolutionData = [
  { year: '2023', version: 'V1', desc: 'Dense, 7B, 4K', highlight: false },
  { year: '2024', version: 'V2', desc: 'Dense, 236B, 128K, MLA', highlight: false },
  { year: '2024', version: 'V3', desc: 'MoE, 671B/37B, 256K, 14.8T', highlight: false },
  { year: '2025', version: 'V3.2', desc: 'MoE improved', highlight: false },
  { year: '2025', version: 'V4', desc: 'MoE, 1.6T/49B, 1M, 33T, CSA+HCA, Muon', highlight: true },
]

/* ─── NEW DATA: Benchmark Filter Categories ─── */
const filterCategories = ['全部', '知识推理', '代码', '数学', 'Agent', '长上下文']
const categoryKeywords: Record<string, string[]> = {
  '全部': [],
  '知识推理': ['MMLU', 'SimpleQA', 'GPQA', 'HLE', 'Chinese'],
  '代码': ['LiveCodeBench', 'Codeforces', 'SWE', 'TerminalBench'],
  '数学': ['HMMT', 'IMO', 'Apex', 'Math'],
  'Agent': ['BrowseComp', 'Toolathlon', 'MCP', 'GDPval'],
  '长上下文': ['MRCR', 'CorpusQA', 'Long', '1M'],
}

/* ─── Reusable animation variants ─── */
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

/* ─── Radar Chart Component ─── */
const RadarChart = memo(function RadarChart() {
  const size = 400
  const cx = size / 2
  const cy = size / 2
  const radius = 140
  const levels = 5
  const angleStep = (Math.PI * 2) / radarDims.length

  const getPoint = (value: number, max: number, i: number) => {
    const angle = i * angleStep - Math.PI / 2
    const r = (value / max) * radius
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)]
  }

  const gridRings = Array.from({ length: levels + 1 }, (_, i) => (radius / levels) * i)
  const axisLines = radarDims.map((_, i) => {
    const angle = i * angleStep - Math.PI / 2
    return [cx, cy, cx + radius * Math.cos(angle), cy + radius * Math.sin(angle)]
  })

  const series = [
    { name: 'V4-Pro-Max', data: radarData['V4-Pro-Max'], color: '#00E5FF', fill: 'rgba(0,229,255,0.1)' },
    { name: 'V4-Flash-Max', data: radarData['V4-Flash-Max'], color: '#3D8BFF', fill: 'rgba(61,139,255,0.08)' },
    { name: 'Gemini-3.1-Pro', data: radarData['Gemini-3.1-Pro'], color: 'rgba(255,255,255,0.3)', fill: 'none' },
  ]

  const [hoveredSeries, setHoveredSeries] = useState<string | null>(null)

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Grid rings */}
        {gridRings.map((r, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={1}
          />
        ))}
        {/* Axis lines */}
        {axisLines.map((line, i) => (
          <line
            key={i}
            x1={line[0]}
            y1={line[1]}
            x2={line[2]}
            y2={line[3]}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={1}
          />
        ))}
        {/* Labels */}
        {radarDims.map((dim, i) => {
          const angle = i * angleStep - Math.PI / 2
          const lx = cx + (radius + 24) * Math.cos(angle)
          const ly = cy + (radius + 24) * Math.sin(angle)
          return (
            <text
              key={dim}
              x={lx}
              y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#8B9EB0"
              fontSize={11}
              fontFamily="Inter, sans-serif"
            >
              {dim}
            </text>
          )
        })}
        {/* Data series */}
        {series.map((s) => {
          const points = s.data.map((v, i) => getPoint(v, 100, i))
          const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ') + ' Z'
          const isHovered = hoveredSeries === s.name
          const isOtherHovered = hoveredSeries !== null && hoveredSeries !== s.name
          return (
            <g key={s.name}>
              <path
                d={d}
                fill={s.fill}
                stroke={s.color}
                strokeWidth={isHovered ? 3 : 2}
                opacity={isOtherHovered ? 0.3 : 1}
                style={{ transition: 'all 0.3s ease' }}
                onMouseEnter={() => setHoveredSeries(s.name)}
                onMouseLeave={() => setHoveredSeries(null)}
              />
            </g>
          )
        })}
      </svg>
      {/* Legend */}
      <div className="flex gap-6 mt-4">
        {series.map((s) => (
          <div
            key={s.name}
            className="flex items-center gap-2 cursor-pointer"
            onMouseEnter={() => setHoveredSeries(s.name)}
            onMouseLeave={() => setHoveredSeries(null)}
          >
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ background: s.color === 'rgba(255,255,255,0.3)' ? 'rgba(255,255,255,0.5)' : s.color }}
            />
            <span className="text-[13px] text-[#8B9EB0] font-body">{s.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
})

/* ─── Bar Chart Component ─── */
const BarChart = memo(function BarChart() {
  const width = 720
  const height = 360
  const padding = { top: 30, right: 20, bottom: 50, left: 50 }
  const chartW = width - padding.left - padding.right
  const chartH = height - padding.top - padding.bottom
  const groupCount = barGroups.length
  const groupWidth = chartW / groupCount
  const barWidth = 32
  const barGap = 8
  const seriesKeys = Object.keys(barData) as (keyof typeof barData)[]
  const seriesColors = ['#00E5FF', '#3D8BFF', 'rgba(255,255,255,0.4)']

  const getBarHeight = (val: number, max: number) => (val / max) * chartH

  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
      {/* Y axis grid */}
      {[0, 25, 50, 75, 100].map((tick) => {
        const y = padding.top + chartH - (tick / 100) * chartH
        return (
          <g key={tick}>
            <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth={1} />
            <text x={padding.left - 8} y={y + 4} textAnchor="end" fill="#8B9EB0" fontSize={11} fontFamily="JetBrains Mono, monospace">{tick}%</text>
          </g>
        )
      })}
      {/* Bars */}
      {barGroups.map((group, gi) => {
        const groupX = padding.left + gi * groupWidth + (groupWidth - (seriesKeys.length * barWidth + (seriesKeys.length - 1) * barGap)) / 2
        return (
          <g key={group}>
            {seriesKeys.map((key, si) => {
              const val = barData[key][gi]
              const max = barMax[gi]
              const normalized = max > 100 ? (val / max) * 100 : val
              const h = getBarHeight(normalized, 100)
              const x = groupX + si * (barWidth + barGap)
              const y = padding.top + chartH - h
              return (
                <rect
                  key={key}
                  x={x}
                  y={y}
                  width={barWidth}
                  height={h}
                  rx={4}
                  fill={seriesColors[si]}
                  className="transition-all duration-300 hover:brightness-125"
                />
              )
            })}
            {/* Group label */}
            <text
              x={groupX + (seriesKeys.length * barWidth + (seriesKeys.length - 1) * barGap) / 2}
              y={height - 16}
              textAnchor="middle"
              fill="#8B9EB0"
              fontSize={12}
              fontFamily="Inter, sans-serif"
            >
              {group}
            </text>
          </g>
        )
      })}
    </svg>
  )
})

/* ─── Line Chart Component ─── */
const LineChart = memo(function LineChart() {
  const width = 720
  const height = 360
  const padding = { top: 30, right: 40, bottom: 50, left: 50 }
  const chartW = width - padding.left - padding.right
  const chartH = height - padding.top - padding.bottom
  const stepX = chartW / (lineX.length - 1)

  const getPoint = (val: number, i: number) => ({
    x: padding.left + i * stepX,
    y: padding.top + chartH - (val / 100) * chartH,
  })

  const series = [
    { name: 'V4-Pro-Max', data: lineData['V4-Pro-Max'], color: '#00E5FF', strokeDasharray: 'none' },
    { name: 'Gemini-3.1-Pro', data: lineData['Gemini-3.1-Pro'], color: 'rgba(255,255,255,0.4)', strokeDasharray: '6,4' },
    { name: 'Claude-Opus-4.6', data: lineData['Claude-Opus-4.6'], color: 'rgba(61,139,255,0.5)', strokeDasharray: '6,4' },
  ]

  return (
    <div className="flex flex-col items-center">
      <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Grid */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const y = padding.top + chartH - (tick / 100) * chartH
          return (
            <g key={tick}>
              <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth={1} />
              <text x={padding.left - 8} y={y + 4} textAnchor="end" fill="#8B9EB0" fontSize={11} fontFamily="JetBrains Mono, monospace">{tick}%</text>
            </g>
          )
        })}
        {/* X axis labels */}
        {lineX.map((label, i) => (
          <text
            key={label}
            x={padding.left + i * stepX}
            y={height - 16}
            textAnchor="middle"
            fill="#8B9EB0"
            fontSize={12}
            fontFamily="Inter, sans-serif"
          >
            {label}
          </text>
        ))}
        {/* 128K threshold line */}
        <line
          x1={padding.left}
          y1={padding.top + chartH - (80 / 100) * chartH}
          x2={width - padding.right}
          y2={padding.top + chartH - (80 / 100) * chartH}
          stroke="rgba(0,229,255,0.2)"
          strokeWidth={1}
          strokeDasharray="4,4"
        />
        <text
          x={padding.left + 8}
          y={padding.top + chartH - (80 / 100) * chartH - 6}
          fill="#00E5FF"
          fontSize={11}
          fontFamily="Inter, sans-serif"
          opacity={0.7}
        >
          稳定阈值
        </text>
        {/* Lines */}
        {series.map((s) => {
          const points = s.data.map((v, i) => getPoint(v, i))
          const d = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
          return (
            <g key={s.name}>
              <path
                d={d}
                fill="none"
                stroke={s.color}
                strokeWidth={s.name === 'V4-Pro-Max' ? 2.5 : 1.5}
                strokeDasharray={s.strokeDasharray}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {points.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r={4}
                  fill={s.color}
                  className="hover:r-[6] transition-all"
                />
              ))}
            </g>
          )
        })}
      </svg>
      <p className="mt-4 text-[15px] text-[#8B9EB0] text-center max-w-[600px] leading-relaxed">
        V4-Pro-Max 在 128K 窗口内检索性能高度稳定；超过 128K 后有轻微下降，但 1M tokens 仍保持强大检索能力。
      </p>
    </div>
  )
})

/* ─── Table cell helper ─── */
function formatValue(v: number | null) {
  if (v === null || v === undefined) return '—'
  if (v >= 3000) return v.toString()
  return v.toFixed(1)
}

/* ─── NEW: Best value helper for full mode table ─── */
function getBestFullMode(row: typeof fullModeData[0]): string {
  const vals = [
    { key: 'flashNon', val: row.flashNon },
    { key: 'flashHigh', val: row.flashHigh },
    { key: 'flashMax', val: row.flashMax },
    { key: 'proNon', val: row.proNon },
    { key: 'proHigh', val: row.proHigh },
    { key: 'proMax', val: row.proMax },
  ].filter((v) => v.val !== null && v.val !== undefined)
  if (vals.length === 0) return ''
  const maxVal = Math.max(...vals.map((v) => v.val as number))
  const bestKeys = vals.filter((v) => v.val === maxVal).map((v) => v.key)
  return bestKeys[0] || ''
}

/* ─── AI vs Human Progress Bar Item ─── */
const AiVsHumanBar = memo(function AiVsHumanBar({ item, index }: { item: typeof humanVsAiData[0]; index: number }) {
  const maxVal = 100
  const aiPct = (item.ai / maxVal) * 100
  const humanPct = (item.human / maxVal) * 100

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="mb-5"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-[14px] text-white font-medium">{item.name}</span>
          {item.badge && (
            <span className="text-[11px] px-2 py-0.5 rounded bg-[rgba(0,229,255,0.15)] text-[#00E5FF] border border-[rgba(0,229,255,0.3)]">
              {item.badge}
            </span>
          )}
        </div>
        {item.detail && (
          <span className="text-[12px] text-[#8B9EB0] font-mono">{item.detail}</span>
        )}
      </div>
      <div className="relative h-3 bg-[rgba(255,255,255,0.08)] rounded-full overflow-hidden">
        {/* Human marker line */}
        <motion.div
          className="absolute top-0 bottom-0 w-0.5 bg-white z-10"
          style={{ left: `${humanPct}%` }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 + 0.3, duration: 0.3 }}
        />
        {/* AI fill bar */}
        <motion.div
          className="absolute top-0 bottom-0 left-0 bg-[#00E5FF] rounded-full"
          style={{ width: `${aiPct}%` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.08 + 0.1, duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <div className="flex justify-between mt-1.5">
        <span className="text-[11px] text-[#00E5FF] font-mono">AI {item.ai}%</span>
        <span className="text-[11px] text-[#8B9EB0] font-mono">人类 {item.human}%</span>
      </div>
    </motion.div>
  )
})

/* ─── Benchmark Filter Component ─── */
const BenchmarkFilter = memo(function BenchmarkFilter() {
  const [activeFilter, setActiveFilter] = useState('全部')

  const filtered = activeFilter === '全部'
    ? tableData
    : tableData.filter((row) =>
        categoryKeywords[activeFilter]?.some((kw) =>
          row.benchmark.toLowerCase().includes(kw.toLowerCase())
        )
      )

  return (
    <div>
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filterCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={cn(
              'px-4 py-2 rounded-[8px] text-[13px] font-medium transition-all duration-200 border',
              activeFilter === cat
                ? 'bg-[rgba(0,229,255,0.12)] text-[#00E5FF] border-[rgba(0,229,255,0.3)]'
                : 'bg-transparent text-[#8B9EB0] border-[rgba(255,255,255,0.1)] hover:text-white hover:border-[rgba(255,255,255,0.2)]'
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Filtered table */}
      <div className="liquid-glass rounded-[12px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="bg-[rgba(61,139,255,0.15)]">
                <th className="text-left text-white text-[13px] font-medium px-5 py-4 border-b border-[rgba(61,139,255,0.3)]">
                  Benchmark
                </th>
                <th className="text-center text-white text-[13px] font-medium px-3 py-4 border-b border-[rgba(61,139,255,0.3)]">DS-V4-Pro-Max</th>
                <th className="text-center text-white text-[13px] font-medium px-3 py-4 border-b border-[rgba(61,139,255,0.3)]">Best Opponent</th>
                <th className="text-center text-white text-[13px] font-medium px-3 py-4 border-b border-[rgba(61,139,255,0.3)]">Status</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="wait">
                {filtered.map((row, ri) => {
                  const isBest = row.best === 'ds'
                  const bestModel = ['claude', 'gpt', 'gemini', 'k2', 'glm', 'ds'].find((k) => k === row.best)
                  const bestVal = bestModel ? row[bestModel as keyof typeof row] : null
                  const rowBg = ri % 2 === 0 ? '#0A1628' : '#0D1B2E'
                  return (
                    <motion.tr
                      key={row.benchmark}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: ri * 0.03, duration: 0.3 }}
                      className="group hover:bg-[rgba(61,139,255,0.06)] transition-colors"
                      style={{ background: rowBg }}
                    >
                      <td className="px-5 py-3.5 text-[13px] text-white font-medium">{row.benchmark}</td>
                      <td className={cn(
                        'px-3 py-3.5 text-center text-[14px] font-mono',
                        isBest ? 'text-[#00E5FF] font-semibold bg-[rgba(0,229,255,0.08)]' : 'text-white'
                      )}>
                        {formatValue(row.ds)}
                      </td>
                      <td className="px-3 py-3.5 text-center text-[13px] text-[#8B9EB0] font-mono">
                        {bestModel && bestModel !== 'ds' ? `${bestModel.toUpperCase()} ${formatValue(Number(bestVal))}` : '—'}
                      </td>
                      <td className="px-3 py-3.5 text-center">
                        {isBest ? (
                          <span className="text-[11px] px-2 py-0.5 rounded bg-[rgba(0,229,255,0.15)] text-[#00E5FF] border border-[rgba(0,229,255,0.3)]">
                            SOTA
                          </span>
                        ) : (
                          <span className="text-[11px] text-[#8B9EB0]">追赶中</span>
                        )}
                      </td>
                    </motion.tr>
                  )
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-[14px] text-[#8B9EB0]">
            该分类下暂无数据
          </div>
        )}
      </div>
    </div>
  )
})

/* ─── Main Page ─── */
export default function Benchmarks() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <div className="min-h-[100dvh] bg-[#050B14] relative">
      {/* Particle background for header area */}
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
              <span className="text-[#00E5FF]">性能基准</span>
            </div>
            <h1 className="font-heading text-[48px] font-bold text-white tracking-tight mb-3">
              性能基准
            </h1>
            <p className="text-[20px] text-[#8B9EB0] font-body max-w-[640px] leading-relaxed">
              开源模型新 SOTA 的全景对比
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Beginner-Friendly Guide ── */}
      <section className="relative z-10 py-[80px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
            className="mb-10"
          >
            <span className="section-label block mb-3">[ 入门指南 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white">
              📊 benchmark 小白导读
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: 这些数字是什么意思？ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="liquid-glass liquid-glass-hover rounded-[12px] p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.2)] flex items-center justify-center">
                  <GraduationCap size={22} className="text-[#00E5FF]" />
                </div>
                <h3 className="font-heading text-[20px] font-semibold text-white">这些数字是什么意思？🔢</h3>
              </div>
              <p className="text-[15px] text-[#8B9EB0] leading-relaxed mb-4">
                每个 benchmark 就像一场「AI 高考科目」：
              </p>
              <ul className="space-y-3">
                {[
                  { icon: GraduationCap, text: 'MMLU = 大学水平知识问答（考知识面）' },
                  { icon: FlaskConical, text: 'GPQA Diamond = 博士级科学问答（考深度推理）' },
                  { icon: Code, text: 'LiveCodeBench = 现场编程考试（考写代码）' },
                  { icon: Trophy, text: 'Codeforces = 算法竞赛（考算法能力，3206 分 = 国际大师水平）' },
                  { icon: AlertTriangle, text: 'SWE-bench = 真实软件工程任务（考修 bug）' },
                  { icon: Brain, text: 'HLE = 人类最后考试（考人类觉得难的知识）' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#8B9EB0]">
                    <item.icon size={16} className="text-[#3D8BFF] mt-0.5 shrink-0" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.08)]">
                <p className="text-[14px] text-[#8B9EB0]">
                  <span className="text-[#00E5FF] font-semibold">百分比</span> = 答对多少题。93.5% 就是 100 题对了 93.5 题！
                </p>
              </div>
            </motion.div>

            {/* Card 2: SOTA 是什么？ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="liquid-glass liquid-glass-hover rounded-[12px] p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[rgba(255,215,0,0.1)] border border-[rgba(255,215,0,0.2)] flex items-center justify-center">
                  <Crown size={22} className="text-[#FFD700]" />
                </div>
                <h3 className="font-heading text-[20px] font-semibold text-white">SOTA 是什么？🏆</h3>
              </div>
              <div className="space-y-3 text-[15px] text-[#8B9EB0] leading-relaxed">
                <p>
                  <span className="text-white font-semibold">SOTA</span> = &quot;State of the Art&quot; = 当前世界最好成绩。
                </p>
                <p>
                  就像奥运会金牌：DeepSeek-V4 在多个项目上打破了世界纪录！
                </p>
                <ul className="space-y-2 mt-2">
                  {[
                    { icon: Globe, text: 'LiveCodeBench 93.5% = 世界第一' },
                    { icon: Medal, text: 'Codeforces 3206 分 = 超越 99.9% 的人类程序员' },
                    { icon: Rocket, text: 'SWE-Verified 80.6% = 自动修复代码 bug 能力世界第一' },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[14px] text-[#8B9EB0]">
                      <item.icon size={16} className="text-[#00E5FF] mt-0.5 shrink-0" />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-[14px] text-[#8B9EB0] mt-2 pt-2 border-t border-[rgba(255,255,255,0.08)]">
                  更厉害的是：<span className="text-[#00E5FF] font-semibold">V4-Flash</span> 用更少的「脑子」（13B 激活参数）就超越了其他大模型！
                </p>
              </div>
            </motion.div>

            {/* Card 3: Think / Non-Think */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="liquid-glass liquid-glass-hover rounded-[12px] p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[rgba(61,139,255,0.1)] border border-[rgba(61,139,255,0.2)] flex items-center justify-center">
                  <BrainCircuit size={22} className="text-[#3D8BFF]" />
                </div>
                <h3 className="font-heading text-[20px] font-semibold text-white">Think / Non-Think 是什么意思？🤔</h3>
              </div>
              <p className="text-[15px] text-[#8B9EB0] leading-relaxed mb-4">
                想象你回答问题的三种模式：
              </p>
              <ul className="space-y-3 mb-4">
                {[
                  { icon: Zap, title: 'Non-think', desc: '直觉反应，不用想太多（适合简单问题，快）' },
                  { icon: Lightbulb, title: 'Think', desc: '认真思考，列步骤解题（适合数学题、编程题）' },
                  { icon: BrainCircuit, title: 'Think Max', desc: '全力以赴，穷尽所有思路（适合最难的问题）' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <item.icon size={16} className="text-[#00E5FF] mt-0.5 shrink-0" />
                    <div>
                      <span className="text-[14px] text-white font-semibold">{item.title}</span>
                      <span className="text-[14px] text-[#8B9EB0]"> = {item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-[rgba(255,255,255,0.08)]">
                <p className="text-[14px] text-[#8B9EB0]">
                  <MessageCircle size={14} className="inline text-[#3D8BFF] mr-1.5 -mt-0.5" />
                  DeepSeek-V4 的 Think 模式会输出思考过程（&quot;thinking tokens&quot;），就像你能在草稿纸上看到 AI 是怎么思考的！
                </p>
              </div>
            </motion.div>

            {/* Card 4: 对比表怎么看？ */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="liquid-glass liquid-glass-hover rounded-[12px] p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.2)] flex items-center justify-center">
                  <Table size={22} className="text-[#00E5FF]" />
                </div>
                <h3 className="font-heading text-[20px] font-semibold text-white">对比表怎么看？👀</h3>
              </div>
              <div className="space-y-3">
                {[
                  { icon: Eye, text: '表格中青色高亮的数字 = 这一行里最厉害的' },
                  { icon: ArrowUpRight, text: 'V4-Pro-Max 有青色边框 = 这是 V4 的「完全体」模式' },
                  { icon: CheckCircle, text: '某格是 "--" = 这个模型不支持这个模式' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <item.icon size={16} className="text-[#00E5FF] mt-0.5 shrink-0" />
                    <p className="text-[14px] text-[#8B9EB0] leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.08)]">
                <p className="text-[15px] text-white font-semibold">
                  <CheckCircle size={16} className="inline text-[#00E5FF] mr-1.5 -mt-0.5" />
                  结论：V4-Pro-Max 在几乎所有 benchmark 上都是最好的，而且领先的幅度很大！
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Benchmark Matrix ── */}
      <section className="relative z-10 py-[120px] pb-[100px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label block mb-3">[ 全景对比 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-12">
              基准测试矩阵：V4-Pro-Max vs 前沿模型
            </h2>
          </motion.div>

          {/* Data Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="liquid-glass rounded-[12px] overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="bg-[rgba(61,139,255,0.15)]">
                    <th className="text-left text-white text-[13px] font-medium tracking-wide px-5 py-4 border-b border-[rgba(61,139,255,0.3)] sticky left-0 bg-[rgba(61,139,255,0.15)] z-10">
                      Benchmark
                    </th>
                    {['Claude-Opus-4.6-Max', 'GPT-5.4-xHigh', 'Gemini-3.1-Pro-High', 'K2.6-Thinking', 'GLM-5.1-Thinking', 'DS-V4-Pro-Max'].map((h) => (
                      <th
                        key={h}
                        className={cn(
                          'text-center text-white text-[13px] font-medium tracking-wide px-3 py-4 border-b border-[rgba(61,139,255,0.3)]',
                          h === 'DS-V4-Pro-Max' && 'bg-[rgba(0,229,255,0.08)]'
                        )}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, ri) => {
                    const isOdd = ri % 2 === 0
                    const rowBg = isOdd ? '#0A1628' : '#0D1B2E'
                    return (
                      <motion.tr
                        key={row.benchmark}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: ri * 0.04, duration: 0.4 }}
                        className="group transition-colors duration-200 hover:bg-[rgba(61,139,255,0.06)]"
                        style={{ background: rowBg }}
                      >
                        <td className="px-5 py-4 text-[13px] text-white font-medium sticky left-0 z-10 group-hover:bg-[rgba(61,139,255,0.06)] transition-colors" style={{ background: 'inherit' }}>
                          {row.benchmark}
                        </td>
                        {(['claude', 'gpt', 'gemini', 'k2', 'glm', 'ds'] as const).map((col, _ci) => {
                          const val = row[col]
                          const isBest = row.best === col
                          const isDsCol = col === 'ds'
                          return (
                            <td
                              key={col}
                              className={cn(
                                'px-3 py-4 text-center text-[14px] font-mono transition-colors',
                                isBest && 'text-[#00E5FF] font-semibold bg-[rgba(0,229,255,0.08)]',
                                !isBest && 'text-[#8B9EB0]',
                                isDsCol && !isBest && 'border-l-2 border-l-[#00E5FF]'
                              )}
                            >
                              {formatValue(val)}
                            </td>
                          )
                        })}
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Conclusion cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            {conclusionCards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="liquid-glass liquid-glass-hover rounded-[12px] p-6"
              >
                <div className="flex items-center gap-3 mb-3">
                  <card.icon size={22} className={cn(
                    card.title === '知识' && 'text-[#3D8BFF]',
                    card.title === '推理' && 'text-[#00E5FF]',
                    card.title === '代码' && 'text-[#0055FF]',
                  )} />
                  <h3 className="font-heading text-[20px] font-semibold text-white">{card.title}</h3>
                </div>
                <p className="text-[15px] text-[#8B9EB0] leading-relaxed">{card.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tab Panel: Model Variant Comparison ── */}
      <section className="relative z-10 py-[120px]" style={{ background: 'linear-gradient(to bottom, #050B14, #050B14)' }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.04) 0%, transparent 60%)' }}
        />
        <div className="max-w-[1280px] mx-auto px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={fadeInUp}
            transition={{ duration: 0.7 }}
          >
            <span className="section-label block mb-3">[ 多维度对比 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-10">
              模型变体能力矩阵
            </h2>
          </motion.div>

          {/* Tab Navigation */}
          <div className="liquid-glass rounded-[8px] p-1 inline-flex mb-10">
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={cn(
                  'relative px-5 py-2.5 text-[14px] font-body rounded-[6px] transition-all duration-200',
                  activeTab === i
                    ? 'text-white bg-[rgba(61,139,255,0.15)]'
                    : 'text-[#8B9EB0] hover:text-white'
                )}
              >
                {tab}
                {activeTab === i && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[calc(100%-16px)] h-[2px] bg-[#00E5FF] rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 0 && (
              <motion.div
                key="tab0"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col lg:flex-row gap-10 items-start"
              >
                <div className="flex-1 flex justify-center">
                  <RadarChart />
                </div>
                <div className="lg:w-[360px] liquid-glass rounded-[12px] p-6">
                  <h3 className="font-heading text-[22px] font-semibold text-white mb-4">知识推理对比</h3>
                  <ul className="space-y-3">
                    {[
                      'V4-Pro-Max SimpleQA 57.9，开源模型新知识 SOTA',
                      '距 Gemini-3.1-Pro 75.6 仍有追赶空间',
                      'GPQA Diamond 90.1，与 Claude Opus 4.6 持平',
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[15px] text-[#8B9EB0]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF] mt-2 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {activeTab === 1 && (
              <motion.div
                key="tab1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <BarChart />
                <div className="flex justify-center gap-6 mt-4">
                  {['V4-Pro-Max', 'V4-Flash-Max', 'Claude-Opus-4.6'].map((name, i) => (
                    <div key={name} className="flex items-center gap-2">
                      <span
                        className="inline-block w-3 h-3 rounded-sm"
                        style={{
                          background: i === 0 ? '#00E5FF' : i === 1 ? '#3D8BFF' : 'rgba(255,255,255,0.4)',
                        }}
                      />
                      <span className="text-[13px] text-[#8B9EB0]">{name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 2 && (
              <motion.div
                key="tab2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <LineChart />
              </motion.div>
            )}

            {activeTab === 3 && (
              <motion.div
                key="tab3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {agentCards.map((card, i) => (
                  <motion.div
                    key={card.benchmark}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    className="liquid-glass liquid-glass-hover rounded-[12px] p-5 border-t-2 border-t-[#00E5FF]"
                  >
                    <span className="data-tag text-[11px] block w-fit mb-3">{card.benchmark}</span>
                    <div className={cn('font-mono text-[36px] mb-2', card.best ? 'text-[#00E5FF]' : 'text-white')}>
                      {card.value}
                    </div>
                    <p className="text-[13px] text-[#8B9EB0]">{card.note}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── SOTA Records ── */}
      <section className="relative z-10 py-[100px] pb-[100px]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.06) 0%, transparent 60%)' }}
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
            <span className="section-label block mb-3">[ SOTA 记录 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white">
              V4-Pro-Max 创造的行业记录
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sotaCards.map((card, i) => (
              <motion.div
                key={card.benchmark}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
                className="liquid-glass rounded-[12px] p-6 border-t-2 border-t-[#00E5FF] group hover:-translate-y-1.5 transition-all duration-300"
                style={{
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                <span className="data-tag text-[11px] block w-fit mb-4">{card.benchmark}</span>
                <div className="mb-4">
                  <HolographicText
                    text={card.value}
                    as="div"
                    className="font-heading text-[56px] font-medium text-[#00E5FF] tracking-tight"
                  />
                </div>
                <p className="text-[14px] text-[#8B9EB0] leading-relaxed mb-4">{card.desc}</p>
                <div className="pt-3 border-t border-[rgba(255,255,255,0.08)]">
                  <span className="data-tag text-[11px]">SOTA</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* ── Section D: Additional SOTA Cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {extraSotaCards.map((card, i) => (
              <motion.div
                key={card.benchmark}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7 }}
                className="liquid-glass rounded-[12px] p-6 border-t-2 border-t-[#3D8BFF] group hover:-translate-y-1.5 transition-all duration-300"
                style={{
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                <span className="data-tag text-[11px] block w-fit mb-4">{card.benchmark}</span>
                <div className="mb-4">
                  <HolographicText
                    text={card.value}
                    as="div"
                    className="font-heading text-[56px] font-medium text-[#3D8BFF] tracking-tight"
                  />
                </div>
                <p className="text-[14px] text-[#8B9EB0] leading-relaxed mb-4">{card.desc}</p>
                <div className="pt-3 border-t border-[rgba(255,255,255,0.08)]">
                  <span className="data-tag text-[11px]">{card.benchmark === 'SWE-Verified' ? '开源 SOTA' : 'SOTA'}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section A: Full Mode Comparison Table (Table 7) ── */}
      <section className="relative z-10 py-[100px]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(61,139,255,0.04) 0%, transparent 60%)' }}
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
            <span className="section-label block mb-3">[ 深度对比 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white">
              全模式深度对比: V4-Flash vs V4-Pro
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
              <table className="w-full min-w-[1100px]">
                <thead>
                  <tr className="bg-[rgba(61,139,255,0.15)]">
                    <th className="text-left text-white text-[13px] font-medium tracking-wide px-5 py-4 border-b border-[rgba(61,139,255,0.3)] sticky left-0 bg-[rgba(61,139,255,0.15)] z-10">
                      Benchmark
                    </th>
                    {[
                      'V4-Flash Non-Think',
                      'V4-Flash High',
                      'V4-Flash Max',
                      'V4-Pro Non-Think',
                      'V4-Pro High',
                      'V4-Pro Max',
                    ].map((h) => (
                      <th
                        key={h}
                        className={cn(
                          'text-center text-white text-[13px] font-medium tracking-wide px-3 py-4 border-b border-[rgba(61,139,255,0.3)]',
                          h === 'V4-Pro Max' && 'bg-[rgba(0,229,255,0.08)]'
                        )}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {fullModeData.map((row, ri) => {
                    const isOdd = ri % 2 === 0
                    const rowBg = isOdd ? '#0A1628' : '#0D1B2E'
                    const bestKey = getBestFullMode(row)
                    return (
                      <motion.tr
                        key={row.benchmark}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: ri * 0.03, duration: 0.4 }}
                        className="group transition-colors duration-200 hover:bg-[rgba(61,139,255,0.06)]"
                        style={{ background: rowBg }}
                      >
                        <td className="px-5 py-3.5 text-[13px] text-white font-medium sticky left-0 z-10 group-hover:bg-[rgba(61,139,255,0.06)] transition-colors" style={{ background: 'inherit' }}>
                          {row.benchmark}
                        </td>
                        {([
                          { key: 'flashNon', val: row.flashNon },
                          { key: 'flashHigh', val: row.flashHigh },
                          { key: 'flashMax', val: row.flashMax },
                          { key: 'proNon', val: row.proNon },
                          { key: 'proHigh', val: row.proHigh },
                          { key: 'proMax', val: row.proMax },
                        ]).map((col) => {
                          const isBest = bestKey === col.key
                          const isProMax = col.key === 'proMax'
                          return (
                            <td
                              key={col.key}
                              className={cn(
                                'px-3 py-3.5 text-center text-[14px] font-mono transition-colors',
                                isBest && 'text-[#00E5FF] font-semibold bg-[rgba(0,229,255,0.08)]',
                                !isBest && 'text-[#8B9EB0]',
                                isProMax && !isBest && 'border-l-2 border-l-[#00E5FF]'
                              )}
                            >
                              {formatValue(col.val)}
                            </td>
                          )
                        })}
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Section B: Code & Agent Detailed Benchmarks ── */}
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
            <span className="section-label block mb-3">[ 细分对比 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white">
              代码与 Agent 能力深度评测
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Code Ability Detail Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="liquid-glass rounded-[12px] overflow-hidden"
            >
              <div className="flex items-center gap-3 px-6 py-5 border-b border-[rgba(255,255,255,0.08)]">
                <Code2 size={20} className="text-[#00E5FF]" />
                <h3 className="font-heading text-[20px] font-semibold text-white">代码能力详情</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[rgba(61,139,255,0.12)]">
                      <th className="text-left text-white text-[13px] font-medium px-5 py-3.5">Benchmark</th>
                      <th className="text-center text-white text-[13px] font-medium px-3 py-3.5">V4-Pro-Max</th>
                      <th className="text-center text-white text-[13px] font-medium px-3 py-3.5">Best Opponent</th>
                      <th className="text-center text-white text-[13px] font-medium px-3 py-3.5">Gap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {codeDetailData.map((row, ri) => {
                      const isOdd = ri % 2 === 0
                      const rowBg = isOdd ? '#0A1628' : '#0D1B2E'
                      return (
                        <motion.tr
                          key={row.benchmark}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: ri * 0.05, duration: 0.4 }}
                          className="group transition-colors duration-200 hover:bg-[rgba(61,139,255,0.06)]"
                          style={{ background: rowBg }}
                        >
                          <td className="px-5 py-3.5 text-[13px] text-white font-medium">{row.benchmark}</td>
                          <td className="px-3 py-3.5 text-center text-[14px] font-mono text-[#00E5FF] font-semibold bg-[rgba(0,229,255,0.06)]">
                            {typeof row.v4proMax === 'number' && row.v4proMax >= 3000 ? row.v4proMax : row.v4proMax}
                          </td>
                          <td className="px-3 py-3.5 text-center text-[13px] text-[#8B9EB0] font-mono">{row.opponent}</td>
                          <td className={cn(
                            'px-3 py-3.5 text-center text-[13px] font-mono font-semibold',
                            row.gap === 'SOTA' || row.gap === '持平' ? 'text-[#00E5FF]' : 'text-[#8B9EB0]'
                          )}>
                            {row.gap}
                          </td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Agent Capability Detail Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="liquid-glass rounded-[12px] overflow-hidden"
            >
              <div className="flex items-center gap-3 px-6 py-5 border-b border-[rgba(255,255,255,0.08)]">
                <Terminal size={20} className="text-[#3D8BFF]" />
                <h3 className="font-heading text-[20px] font-semibold text-white">Agent 能力详情</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[rgba(61,139,255,0.12)]">
                      <th className="text-left text-white text-[13px] font-medium px-5 py-3.5">Benchmark</th>
                      <th className="text-center text-white text-[13px] font-medium px-3 py-3.5">V4-Pro-Max</th>
                      <th className="text-left text-white text-[13px] font-medium px-3 py-3.5">Comparison</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agentDetailData.map((row, ri) => {
                      const isOdd = ri % 2 === 0
                      const rowBg = isOdd ? '#0A1628' : '#0D1B2E'
                      const isBest = row.benchmark === 'GDPval-AA (Elo)' || row.benchmark === 'Toolathlon'
                      return (
                        <motion.tr
                          key={row.benchmark}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: ri * 0.05, duration: 0.4 }}
                          className="group transition-colors duration-200 hover:bg-[rgba(61,139,255,0.06)]"
                          style={{ background: rowBg }}
                        >
                          <td className="px-5 py-3.5 text-[13px] text-white font-medium">{row.benchmark}</td>
                          <td className={cn(
                            'px-3 py-3.5 text-center text-[14px] font-mono',
                            isBest ? 'text-[#00E5FF] font-semibold bg-[rgba(0,229,255,0.06)]' : 'text-white'
                          )}>
                            {row.v4proMax}
                          </td>
                          <td className="px-3 py-3.5 text-left text-[13px] text-[#8B9EB0]">{row.comparison}</td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Section C: Long Context Benchmarks ── */}
      <section className="relative z-10 py-[100px]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.04) 0%, transparent 60%)' }}
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
            <span className="section-label block mb-3">[ 长上下文 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white">
              1M Token 长上下文评测
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 1M Token Context Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="liquid-glass rounded-[12px] overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="bg-[rgba(61,139,255,0.15)]">
                      <th className="text-left text-white text-[13px] font-medium px-5 py-4 border-b border-[rgba(61,139,255,0.3)]">Benchmark</th>
                      <th className="text-center text-white text-[13px] font-medium px-3 py-4 border-b border-[rgba(61,139,255,0.3)]">Claude-Opus-4.6</th>
                      <th className="text-center text-white text-[13px] font-medium px-3 py-4 border-b border-[rgba(61,139,255,0.3)]">Gemini-3.1-Pro</th>
                      <th className="text-center text-white text-[13px] font-medium px-3 py-4 border-b border-[rgba(61,139,255,0.3)] bg-[rgba(0,229,255,0.08)]">V4-Pro-Max</th>
                      <th className="text-center text-white text-[13px] font-medium px-3 py-4 border-b border-[rgba(61,139,255,0.3)]">Winner</th>
                    </tr>
                  </thead>
                  <tbody>
                    {longContextData.map((row, ri) => {
                      const isOdd = ri % 2 === 0
                      const rowBg = isOdd ? '#0A1628' : '#0D1B2E'
                      return (
                        <motion.tr
                          key={row.benchmark}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: ri * 0.06, duration: 0.4 }}
                          className="group transition-colors duration-200 hover:bg-[rgba(61,139,255,0.06)]"
                          style={{ background: rowBg }}
                        >
                          <td className="px-5 py-4 text-[13px] text-white font-medium">{row.benchmark}</td>
                          <td className="px-3 py-4 text-center text-[14px] font-mono text-[#00E5FF] font-semibold bg-[rgba(0,229,255,0.06)]">
                            {row.claude}
                          </td>
                          <td className="px-3 py-4 text-center text-[14px] font-mono text-[#8B9EB0]">
                            {row.gemini}
                          </td>
                          <td className="px-3 py-4 text-center text-[14px] font-mono text-white border-l-2 border-l-[#00E5FF]">
                            {row.v4proMax}
                          </td>
                          <td className="px-3 py-4 text-center text-[13px] text-[#8B9EB0] font-medium">
                            {row.winner}
                          </td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Insight Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="liquid-glass rounded-[12px] p-8 flex flex-col justify-center"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.2)] flex items-center justify-center">
                  <Trophy size={20} className="text-[#00E5FF]" />
                </div>
                <h3 className="font-heading text-[20px] font-semibold text-white">性能洞察</h3>
              </div>
              <p className="text-[16px] text-[#8B9EB0] leading-relaxed">
                V4-Pro-Max 在 128K 窗口内检索性能高度稳定；超过 128K 后有轻微下降，但 1M tokens 仍保持强大检索能力
              </p>
              <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.08)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#8B9EB0]">128K 窗口稳定性</span>
                  <span className="text-[13px] font-mono text-[#00E5FF]">优异</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#8B9EB0]">1M 检索保持率</span>
                  <span className="text-[13px] font-mono text-[#00E5FF]">~83%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#8B9EB0]">对比 Gemini 优势</span>
                  <span className="text-[13px] font-mono text-[#00E5FF]">+7.2pp</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── NEW Section A: AI vs Human Progress Bars ── */}
      <section className="relative z-10 py-[100px]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.04) 0%, transparent 60%)' }}
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
            <span className="section-label block mb-3">[ 人机对比 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white flex items-center gap-3">
              <Bot size={32} className="text-[#00E5FF]" />
              vs
              <User size={32} className="text-[#8B9EB0]" />
              AI 超越人类进度
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: Progress bars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="liquid-glass rounded-[12px] p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="w-3 h-3 rounded-full bg-[#00E5FF]" />
                <span className="text-[13px] text-[#8B9EB0]">青色 = AI 性能</span>
                <span className="w-3 h-3 rounded-full bg-white ml-4" />
                <span className="text-[13px] text-[#8B9EB0]">白线 = 人类水平</span>
              </div>
              {humanVsAiData.map((item, i) => (
                <AiVsHumanBar key={item.name} item={item} index={i} />
              ))}
            </motion.div>

            {/* Right: Insight card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="liquid-glass rounded-[12px] p-8 flex flex-col justify-center"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.2)] flex items-center justify-center">
                  <Zap size={20} className="text-[#00E5FF]" />
                </div>
                <h3 className="font-heading text-[20px] font-semibold text-white">超越分析</h3>
              </div>
              <div className="space-y-4 text-[15px] text-[#8B9EB0] leading-relaxed">
                <p>
                  <span className="text-[#00E5FF] font-semibold">代码与工程</span>：Codeforces 3206 分排名人类第 23 位，SWE-bench 80.6% 远超人类平均 25%。
                </p>
                <p>
                  <span className="text-[#00E5FF] font-semibold">科学推理</span>：GPQA Diamond 90.1% 已超越人类专家水平（85%），HMMT 数学竞赛接近满分。
                </p>
                <p>
                  <span className="text-white font-semibold">尚未超越</span>：MMLU-Pro 知识广度测试 AI 87.5% 仍略低于人类专家 90%。
                </p>
              </div>
              <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.08)]">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] text-[#8B9EB0]">已超越人类的项目</span>
                  <span className="text-[24px] font-mono text-[#00E5FF] font-semibold">5/6</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── NEW Section B: Model Evolution Timeline ── */}
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
            <span className="section-label block mb-3">[ 演进历程 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white flex items-center gap-3">
              <Calendar size={28} className="text-[#00E5FF]" />
              DeepSeek 演进时间线
            </h2>
          </motion.div>

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-[50%] top-0 bottom-0 w-px bg-[rgba(0,229,255,0.2)] hidden lg:block" />

            <div className="space-y-8">
              {evolutionData.map((item, i) => {
                const isLeft = i % 2 === 0
                const isHighlight = item.highlight
                return (
                  <motion.div
                    key={item.version}
                    initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ delay: i * 0.1, duration: 0.6, ease: 'easeOut' }}
                    className={cn(
                      'relative flex flex-col lg:flex-row items-center gap-6',
                      isLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    )}
                  >
                    {/* Card */}
                    <div className={cn(
                      'flex-1 max-w-[480px] liquid-glass rounded-[12px] p-6 transition-all duration-300',
                      isHighlight && 'border-2 border-[#00E5FF] scale-105 shadow-[0_0_30px_rgba(0,229,255,0.15)]'
                    )}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[13px] font-mono text-[#3D8BFF] bg-[rgba(61,139,255,0.1)] px-2 py-0.5 rounded">
                          {item.year}
                        </span>
                        <span className={cn(
                          'font-heading text-[24px] font-semibold',
                          isHighlight ? 'text-[#00E5FF]' : 'text-white'
                        )}>
                          {item.version}
                        </span>
                        {isHighlight && (
                          <span className="text-[11px] px-2 py-0.5 rounded bg-[rgba(0,229,255,0.15)] text-[#00E5FF] border border-[rgba(0,229,255,0.3)]">
                            最新
                          </span>
                        )}
                      </div>
                      <p className="text-[15px] text-[#8B9EB0] leading-relaxed">{item.desc}</p>
                    </div>

                    {/* Center dot */}
                    <div className="hidden lg:flex items-center justify-center w-8 shrink-0">
                      <motion.div
                        className={cn(
                          'w-4 h-4 rounded-full border-2',
                          isHighlight
                            ? 'bg-[#00E5FF] border-[#00E5FF] shadow-[0_0_12px_rgba(0,229,255,0.5)]'
                            : 'bg-[#050B14] border-[rgba(0,229,255,0.4)]'
                        )}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 + 0.2, duration: 0.3 }}
                      />
                    </div>

                    {/* Spacer for other side */}
                    <div className="flex-1 hidden lg:block" />
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEW Section C: Interactive Benchmark Filter ── */}
      <section className="relative z-10 py-[100px] pb-[100px]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(61,139,255,0.04) 0%, transparent 60%)' }}
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
            <span className="section-label block mb-3">[ 交互浏览 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white flex items-center gap-3">
              <Search size={28} className="text-[#00E5FF]" />
              交互式基准浏览器
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <BenchmarkFilter />
          </motion.div>
        </div>
      </section>

      <div className="h-20" />
    </div>
  )
}
