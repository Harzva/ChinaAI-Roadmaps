import { useEffect, useRef, useState, memo, useCallback } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import HolographicText from '@/components/HolographicText'
import ParticleCanvas from '@/components/ParticleCanvas'
import { Stethoscope, Users, Route, Zap, BookOpen, FileText, Gauge, Eye, CheckCircle2, Crosshair, Target, Compass, Navigation, TrendingUp, Award, GitBranch, Shield, Activity, Layers, Hash } from 'lucide-react'

/* ─────────────────────────── MoE Canvas Network ─────────────────────────── */

interface MoENode {
  x: number
  y: number
  type: 'shared' | 'routing'
  id: number
  pulse: number
  active: boolean
}

interface MoEEdge {
  from: number
  to: number
  active: number
}

const MoENetworkCanvas = memo(function MoENetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodesRef = useRef<MoENode[]>([])
  const edgesRef = useRef<MoEEdge[]>([])
  const animRef = useRef<number>(0)
  const lastPulseRef = useRef<number>(0)
  const nextPulseRef = useRef<number>(1000 + Math.random() * 3000)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width
        canvas.height = rect.height
      }
    }
    resize()
    window.addEventListener('resize', resize)

    // Create 50 visible nodes out of 384 conceptual
    const nodeCount = 50
    const cx = canvas.width / 2
    const cy = canvas.height / 2
    const maxR = Math.min(canvas.width, canvas.height) * 0.38
    const nodes: MoENode[] = []
    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.3
      const rings = 3
      const ring = Math.floor(Math.random() * rings)
      const r = (ring + 1) / rings * maxR * (0.8 + Math.random() * 0.4)
      nodes.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        type: i === 0 ? 'shared' : 'routing',
        id: i,
        pulse: 0,
        active: false,
      })
    }

    // Create edges between nearby nodes
    const edges: MoEEdge[] = []
    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < maxR * 0.6 && Math.random() > 0.3) {
          edges.push({ from: i, to: j, active: 0 })
        }
      }
    }
    nodesRef.current = nodes
    edgesRef.current = edges

    const animate = (timestamp: number) => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const nodes = nodesRef.current
      const edges = edgesRef.current

      // Pulse routing
      if (timestamp - lastPulseRef.current > nextPulseRef.current) {
        lastPulseRef.current = timestamp
        nextPulseRef.current = 1000 + Math.random() * 3000
        // Activate 6 random routing experts + shared expert
        const targets = [0] // shared expert always
        while (targets.length < 7) {
          const r = Math.floor(Math.random() * nodeCount)
          if (!targets.includes(r)) targets.push(r)
        }
        for (const t of targets) {
          nodes[t].pulse = 1
          nodes[t].active = true
        }
        // Activate edges between nearby targets
        for (const e of edges) {
          if (targets.includes(e.from) && targets.includes(e.to)) {
            e.active = 1
          }
        }
      }

      // Draw edges
      for (const e of edges) {
        const a = nodes[e.from]
        const b = nodes[e.to]
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        if (e.active > 0) {
          ctx.strokeStyle = `rgba(0,229,255,${e.active * 0.6})`
          ctx.lineWidth = 1.5
          ctx.shadowColor = '#00E5FF'
          ctx.shadowBlur = 8
        } else {
          ctx.strokeStyle = 'rgba(255,255,255,0.03)'
          ctx.lineWidth = 0.5
          ctx.shadowBlur = 0
        }
        ctx.stroke()
        if (e.active > 0) {
          e.active -= 0.015
          if (e.active < 0) e.active = 0
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const isShared = n.type === 'shared'
        const radius = isShared ? 8 : 6
        const color = isShared ? '#FFFFFF' : '#3D8BFF'

        // Pulse effect
        if (n.pulse > 0) {
          const pulseR = radius + (1 - n.pulse) * 30
          const grad = ctx.createRadialGradient(n.x, n.y, radius, n.x, n.y, pulseR)
          grad.addColorStop(0, `rgba(0,229,255,${n.pulse * 0.3})`)
          grad.addColorStop(1, 'rgba(0,229,255,0)')
          ctx.beginPath()
          ctx.arc(n.x, n.y, pulseR, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
          n.pulse -= 0.012
          if (n.pulse < 0) {
            n.pulse = 0
            n.active = false
          }
        }

        ctx.beginPath()
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.shadowColor = color
        ctx.shadowBlur = isShared ? 16 : 12
        ctx.globalAlpha = isShared ? 1 : n.active ? 0.9 : 0.4
        ctx.fill()
        ctx.globalAlpha = 1
        ctx.shadowBlur = 0
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
    />
  )
})

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

/* ─────────────────────────── Data Table Component ─────────────────────────── */

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
                  borderLeft: hoveredCol === i && i > 0 ? `2px solid ${i === 1 ? '#3D8BFF' : '#00E5FF'}` : '2px solid transparent',
                }}
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
                background: ri % 2 === 0 ? '#0A1628' : '#0D1B2E',
              }}
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
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                    }}
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

/* ─────────────────────────── Hashion Animation ─────────────────────────── */

function HashionAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const t1 = setTimeout(() => setPhase(1), 1000)
    const t2 = setTimeout(() => setPhase(2), 2000)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [isInView])

  const ids = Array.from({ length: 16 }, (_, i) => `sq-${i}`)
  const groups = [ids.slice(0, 4), ids.slice(4, 8), ids.slice(8, 12), ids.slice(12, 16)]

  return (
    <div ref={ref} className="flex flex-col items-center gap-8 py-10">
      <div className="min-h-[80px] flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {phase === 0 && (
            <motion.div
              key="phase0"
              className="flex gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {ids.map((id) => (
                <motion.div
                  key={id}
                  layoutId={id}
                  className="w-6 h-6 rounded-sm"
                  style={{ backgroundColor: '#00E5FF' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
              ))}
            </motion.div>
          )}

          {phase === 1 && (
            <motion.div
              key="phase1"
              className="flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {groups.map((group, gi) => (
                <div
                  key={gi}
                  className="flex gap-1 p-2 rounded border"
                  style={{ borderColor: 'rgba(0,229,255,0.3)' }}
                >
                  {group.map((id) => (
                    <motion.div
                      key={id}
                      layoutId={id}
                      className="w-6 h-6 rounded-sm"
                      style={{ backgroundColor: '#00E5FF' }}
                      transition={{ duration: 0.6, ease: 'easeInOut' }}
                    />
                  ))}
                </div>
              ))}
            </motion.div>
          )}

          {phase === 2 && (
            <motion.div
              key="phase2"
              className="grid grid-cols-4 gap-0 p-3 rounded border"
              style={{ borderColor: 'rgba(0,229,255,0.3)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {ids.map((id) => (
                <motion.div
                  key={id}
                  layoutId={id}
                  className="w-6 h-6 rounded-sm"
                  style={{ backgroundColor: '#00E5FF', margin: '-0.5px' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="text-[16px] text-[#8B9EB0] font-mono text-center">
        16 tokens → 4 CSA entries → 1 HCA entry
      </p>
    </div>
  )
}

/* ─────────────────────────── MoE Router Flow SVG ─────────────────────────── */

function MoERouterFlow() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <div ref={ref} className="flex justify-center py-10">
      <svg width="540" height="220" viewBox="0 0 540 220" className="overflow-visible">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Input token */}
        <circle cx="50" cy="110" r="20" fill="#00E5FF" filter="url(#glow)" opacity="0.9" />
        <text x="50" y="115" textAnchor="middle" fill="#050B14" fontSize="12" fontWeight="bold" fontFamily="JetBrains Mono">T</text>
        <text x="50" y="155" textAnchor="middle" fill="#8B9EB0" fontSize="12" fontFamily="Inter">输入 Token</text>

        {/* Arrow: input -> router */}
        <line x1="75" y1="110" x2="125" y2="110" stroke="#00E5FF" strokeWidth="2" markerEnd="url(#arrowhead)" />
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#00E5FF" />
          </marker>
        </defs>

        {/* Router diamond */}
        <polygon points="160,110 190,80 220,110 190,140" fill="rgba(0,229,255,0.15)" stroke="#00E5FF" strokeWidth="2" />
        <text x="190" y="114" textAnchor="middle" fill="#00E5FF" fontSize="12" fontFamily="Inter">Router</text>

        {/* Arrows: router -> experts */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const ex = 270 + (i % 4) * 60
          const ey = i < 4 ? 50 : 170
          return (
            <line
              key={i}
              x1="205"
              y1="110"
              x2={ex - 30}
              y2={ey}
              stroke={i === 1 || i === 5 ? '#00E5FF' : 'rgba(255,255,255,0.15)'}
              strokeWidth={i === 1 || i === 5 ? 2 : 1}
              strokeDasharray={i === 1 || i === 5 ? undefined : '4 2'}
            />
          )
        })}

        {/* Expert rectangles */}
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
          const x = 270 + (i % 4) * 60
          const y = i < 4 ? 35 : 155
          const isActive = i === 1 || i === 5
          return (
            <g key={i}>
              <rect
                x={x}
                y={y}
                width="50"
                height="28"
                rx="4"
                fill={isActive ? 'rgba(0,229,255,0.15)' : 'rgba(255,255,255,0.05)'}
                stroke={isActive ? '#00E5FF' : 'rgba(255,255,255,0.15)'}
                strokeWidth={isActive ? 1.5 : 1}
              />
              <text
                x={x + 25}
                y={y + 17}
                textAnchor="middle"
                fill={isActive ? '#00E5FF' : '#8B9EB0'}
                fontSize="10"
                fontFamily="JetBrains Mono"
              >
                E{i + 1}
              </text>
            </g>
          )
        })}

        {/* Arrows: experts -> output */}
        {[1, 5].map((i) => {
          const x = 270 + (i % 4) * 60 + 50
          const y = i < 4 ? 50 : 170
          return (
            <line
              key={i}
              x1={x}
              y1={y}
              x2="490"
              y2="110"
              stroke="#00E5FF"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
          )
        })}

        {/* Output aggregation */}
        <rect x="490" y="95" width="40" height="30" rx="6" fill="rgba(61,139,255,0.15)" stroke="#3D8BFF" strokeWidth="1.5" />
        <text x="510" y="115" textAnchor="middle" fill="#3D8BFF" fontSize="10" fontFamily="Inter">Out</text>

        {/* Animated dot traveling path */}
        {isInView && (
          <motion.circle
            r="5"
            fill="#00E5FF"
            filter="url(#glow)"
            initial={{ cx: 50, cy: 110, opacity: 0 }}
            animate={{
              cx: [50, 140, 190, 240, 300, 340, 300, 240, 190, 510, 510],
              cy: [110, 110, 110, 60, 60, 170, 170, 170, 110, 110, 110],
              opacity: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            }}
            transition={{
              duration: 5,
              times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
              ease: 'easeInOut',
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        )}
      </svg>
    </div>
  )
}

/* ─────────────────────────── Architecture Comparison Table ─────────────────────────── */

function ArchComparisonTable() {
  const headers = ['', 'V3.2', 'V4-Flash', 'V4-Pro', 'GPT-4o', 'Gemini 2.5 Pro', 'Claude 3.5']
  const rows = [
    { label: '架构', v32: 'MoE', flash: 'MoE', pro: 'MoE', gpt4o: 'Dense', gemini: 'MoE', claude: 'Dense' },
    { label: '总参数', v32: '671B', flash: '284B', pro: '1.6T', gpt4o: '~1T', gemini: '~1T', claude: '~175B' },
    { label: '激活参数', v32: '37B', flash: '13B', pro: '49B', gpt4o: '~200B', gemini: '~100B', claude: '~175B' },
    { label: '上下文', v32: '256K', flash: '1M', pro: '1M', gpt4o: '128K', gemini: '1M', claude: '200K' },
    { label: 'KV压缩方式', v32: 'GQA', flash: 'CSA+HCA', pro: 'CSA+HCA', gpt4o: 'GQA', gemini: 'GQA', claude: 'GQA' },
    { label: '优化器', v32: 'AdamW', flash: 'Muon', pro: 'Muon', gpt4o: 'AdamW', gemini: 'AdamW', claude: 'AdamW' },
  ]

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr style={{ background: 'rgba(61,139,255,0.15)' }}>
            {headers.map((h, i) => (
              <th
                key={i}
                className="px-4 py-3 text-white font-medium font-body text-[13px] whitespace-nowrap"
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
              transition={{ duration: 0.4, delay: ri * 0.05, ease: 'easeOut' }}
              style={{
                background: ri % 2 === 0 ? '#0A1628' : '#0D1B2E',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <td className="px-4 py-3 font-body text-[13px] text-[#8B9EB0] whitespace-nowrap">{row.label}</td>
              <td className="px-4 py-3 font-mono text-[13px] text-white whitespace-nowrap">{row.v32}</td>
              <td
                className="px-4 py-3 font-mono text-[13px] whitespace-nowrap"
                style={{ color: '#00E5FF', background: 'rgba(0,229,255,0.08)' }}
              >
                {row.flash}
              </td>
              <td
                className="px-4 py-3 font-mono text-[13px] whitespace-nowrap"
                style={{ color: '#00E5FF', background: 'rgba(0,229,255,0.08)' }}
              >
                {row.pro}
              </td>
              <td className="px-4 py-3 font-mono text-[13px] text-white whitespace-nowrap">{row.gpt4o}</td>
              <td className="px-4 py-3 font-mono text-[13px] text-white whitespace-nowrap">{row.gemini}</td>
              <td className="px-4 py-3 font-mono text-[13px] text-white whitespace-nowrap">{row.claude}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ─────────────────────────── Architecture Page ─────────────────────────── */

export default function Architecture() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, rect: DOMRect) => {
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  const glassGlowStyle = (rect: DOMRect | null) => ({
    background: rect
      ? `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(61,139,255,0.1), transparent 60%)`
      : undefined,
  })

  return (
    <div className="relative bg-[#050B14] text-white overflow-hidden">
      <ParticleCanvas />

      {/* ───── Hero ───── */}
      <section className="relative min-h-[40dvh] flex items-center z-10">
        <div className="max-w-[1280px] mx-auto px-6 w-full pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-2 text-[13px] text-[#8B9EB0] mb-6">
              <Link to="/deepseek" className="text-[#3D8BFF] hover:underline">DeepSeek</Link>
              <span>/</span>
              <span>架构解构</span>
            </div>
            <h1 className="font-heading text-[48px] font-bold text-white mb-4">架构解构</h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="text-[20px] text-[#8B9EB0] max-w-xl"
          >
            从注意力机制到网络拓扑的深层革新
          </motion.p>
          {/* Decorative grid */}
          <svg className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.03] hidden lg:block" width="200" height="200">
            {Array.from({ length: 10 }).map((_, i) => (
              <g key={i}>
                <line x1={i * 20} y1="0" x2={i * 20} y2="200" stroke="white" strokeWidth="1" />
                <line x1="0" y1={i * 20} x2="200" y2={i * 20} stroke="white" strokeWidth="1" />
              </g>
            ))}
          </svg>
        </div>
      </section>

      {/* ───── Beginner Navigation ───── */}
      <section className="relative z-10 py-[60px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="liquid-glass rounded-xl p-8 lg:p-10 border-l-4 border-[#ffb84d]"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="text-[28px]">🔰</span>
              <h2 className="font-heading text-[28px] font-semibold text-white">
                小白导航：先读这段
              </h2>
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12 } },
              }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              {/* Card 1: MoE = 专科医院 */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="liquid-glass rounded-xl p-6 lg:p-8 border-t-2 border-[#3D8BFF]"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Stethoscope className="w-5 h-5 text-[#3D8BFF]" />
                  <Users className="w-5 h-5 text-[#3D8BFF]" />
                  <Route className="w-5 h-5 text-[#3D8BFF]" />
                  <Zap className="w-5 h-5 text-[#3D8BFF]" />
                </div>
                <h3 className="font-heading text-[20px] font-semibold text-white mb-4">
                  🏥 混合专家模型 (MoE) 是什么？
                </h3>
                <div className="font-body text-[16px] leading-[1.7] text-[#8B9EB0] space-y-3">
                  <p>
                    想象一家超级大医院：传统大模型就像一个全能医生，每次看病都要动用全部脑细胞（所有参数），处理一个感冒也要把心脏科、骨科、神经科的知识都想一遍——又慢又累。
                  </p>
                  <p>
                    MoE 模型就像一家「专科医院」：前台（<span className="text-[#00E5FF] font-semibold">Router 分诊台</span>）根据病情把病人送给最擅长的专家。心脏病去找心脏科专家，骨折去找骨科专家。其他专家在旁边喝茶休息不用干活。
                  </p>
                  <p>
                    <span className="text-[#00E5FF] font-semibold">结果</span>：医院整体很大（1.6万亿参数），但看病时只有少数几个医生在工作（只激活49B参数）。所以既博学又快速！
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                  <span className="data-tag inline-flex items-center gap-1 text-[12px]">
                    💡 专业术语：<span className="text-[#8B9EB0]">Router、专家、激活参数</span>
                  </span>
                </div>
              </motion.div>

              {/* Card 2: KV Cache = 会议纪要 */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="liquid-glass rounded-xl p-6 lg:p-8 border-t-2 border-[#00E5FF]"
              >
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-[#00E5FF]" />
                  <FileText className="w-5 h-5 text-[#00E5FF]" />
                  <Hash className="w-5 h-5 text-[#00E5FF]" />
                  <Gauge className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <h3 className="font-heading text-[20px] font-semibold text-white mb-4">
                  📝 KV Cache 是什么？为什么 1M 上下文才用 10% 资源？
                </h3>
                <div className="font-body text-[16px] leading-[1.7] text-[#8B9EB0] space-y-3">
                  <p>
                    大模型生成文字是一个字一个字往外蹦的。每写一个新字，它都需要回顾之前写过的所有内容。
                  </p>
                  <p>
                    <span className="text-[#00E5FF] font-semibold">没有 KV Cache</span> = 每次写新字都要把整篇文章从头到尾重新读一遍。写第1000个字时，要把前999个字重新理解一遍——疯了！
                  </p>
                  <p>
                    <span className="text-[#00E5FF] font-semibold">有 KV Cache</span> = 像开会做会议纪要。前面讨论过的内容已经记在本子上了，新发言只需要对照纪要就能理解上下文。
                  </p>
                  <p>
                    DeepSeek-V4 的 CSA+HCA 就像「<span className="text-[#00E5FF] font-semibold">超级压缩纪要</span>」——把100页会议记录压缩成1页精华，还能看懂全部意思！所以 1M token 上下文只需要 10% 的资源。
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                  <span className="data-tag inline-flex items-center gap-1 text-[12px]">
                    💡 专业术语：<span className="text-[#8B9EB0]">KV Cache、CSA、HCA</span>
                  </span>
                </div>
              </motion.div>

              {/* Card 3: Attention = 投票表决 */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="liquid-glass rounded-xl p-6 lg:p-8 border-t-2 border-[#ffb84d]"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Eye className="w-5 h-5 text-[#ffb84d]" />
                  <CheckCircle2 className="w-5 h-5 text-[#ffb84d]" />
                  <Crosshair className="w-5 h-5 text-[#ffb84d]" />
                  <Target className="w-5 h-5 text-[#ffb84d]" />
                </div>
                <h3 className="font-heading text-[20px] font-semibold text-white mb-4">
                  🗳️ 注意力机制 (Attention) 是什么？
                </h3>
                <div className="font-body text-[16px] leading-[1.7] text-[#8B9EB0] space-y-3">
                  <p>
                    想象你在一句话中看每个词时，大脑会自动判断哪些词更重要。
                  </p>
                  <p>
                    "猫坐在垫子上，因为它很舒服。" 当你读到"它"的时候，大脑会自动把注意力投向"猫"——你知道"它"指的就是"猫"。
                  </p>
                  <p>
                    注意力机制就是这个过程：每个词给其他所有词"<span className="text-[#00E5FF] font-semibold">投票打分</span>"。关系越密切，分数越高，就越值得关注。
                  </p>
                  <p>
                    CSA（压缩稀疏注意力）= 只看关键词；HCA（重度压缩注意力）= 只看关键段落。两者结合，<span className="text-[#00E5FF] font-semibold">既快又准</span>！
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                  <span className="data-tag inline-flex items-center gap-1 text-[12px]">
                    💡 专业术语：<span className="text-[#8B9EB0]">Attention、CSA、HCA</span>
                  </span>
                </div>
              </motion.div>

              {/* Card 4: Muon = 走路走直线 */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="liquid-glass rounded-xl p-6 lg:p-8 border-t-2 border-[#0055FF]"
              >
                <div className="flex items-center gap-2 mb-4">
                  <Compass className="w-5 h-5 text-[#0055FF]" />
                  <Navigation className="w-5 h-5 text-[#0055FF]" />
                  <TrendingUp className="w-5 h-5 text-[#0055FF]" />
                  <Award className="w-5 h-5 text-[#0055FF]" />
                </div>
                <h3 className="font-heading text-[20px] font-semibold text-white mb-4">
                  🚶 Muon 优化器是什么？（结合 Kimi K2 的研究）
                </h3>
                <div className="font-body text-[16px] leading-[1.7] text-[#8B9EB0] space-y-3">
                  <p>
                    传统 AdamW 优化器就像在一个迷雾森林里乱走——走一步看一下方向，经常绕弯路、走回头路。
                  </p>
                  <p>
                    <span className="text-[#00E5FF] font-semibold">Muon 优化器</span>（Kimi/Moonshot AI 也在用）就像在森林里有了指南针——每次调整方向时，让所有方向互相垂直（正交化），不重复探索同一个方向。这样走的就是最短路！
                  </p>
                  <p>
                    <span className="text-[#00E5FF] font-semibold">效果</span>：Muon 比 AdamW 效率提升约 2 倍。Kimi K2 用 Muon 在 15.5 万亿 token 上训练，零 loss spike，非常稳定。
                  </p>
                  <p>
                    DeepSeek-V4 也用了 Muon，所以训练又快又稳。同时因为 CSA/HCA 让 attention logits 不会爆炸，所以连 <span className="text-[#00E5FF] font-semibold">QK-Clip</span> 这种稳定化技巧都不需要了！
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                  <span className="data-tag inline-flex items-center gap-1 text-[12px]">
                    💡 专业术语：<span className="text-[#8B9EB0]">Muon、AdamW、QK-Clip</span>
                  </span>
                </div>
              </motion.div>

              {/* Card 5: mHC = 高速公路护栏 */}
              <motion.div
                variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="liquid-glass rounded-xl p-6 lg:p-8 border-t-2 border-[#00E5FF] lg:col-span-2"
              >
                <div className="flex items-center gap-2 mb-4">
                  <GitBranch className="w-5 h-5 text-[#00E5FF]" />
                  <Shield className="w-5 h-5 text-[#00E5FF]" />
                  <Activity className="w-5 h-5 text-[#00E5FF]" />
                  <Layers className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <h3 className="font-heading text-[20px] font-semibold text-white mb-4">
                  🛣️ 流形约束超连接 (mHC) 是什么？
                </h3>
                <div className="font-body text-[16px] leading-[1.7] text-[#8B9EB0] space-y-3">
                  <p>
                    想象神经网络是一条很长的信息高速公路，信号要从入口传到出口。
                  </p>
                  <p>
                    如果没有护栏，信号在传播过程中会越传越弱（<span className="text-[#00E5FF] font-semibold">梯度消失</span>）或越传越强（<span className="text-[#00E5FF] font-semibold">梯度爆炸</span>）——就像高速公路上没有护栏的车会跑偏。
                  </p>
                  <p>
                    <span className="text-[#00E5FF] font-semibold">mHC 就像高速公路的护栏系统</span>：通过数学约束（Sinkhorn-Knopp 投影到双随机矩阵流形），确保信号在每一层传播时既不会消失也不会爆炸。
                  </p>
                  <p>
                    <span className="text-[#00E5FF] font-semibold">结果</span>：深层网络也能稳定训练，1000 层和 10 层一样稳！
                  </p>
                </div>
                <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.08)]">
                  <span className="data-tag inline-flex items-center gap-1 text-[12px]">
                    💡 专业术语：<span className="text-[#8B9EB0]">mHC、梯度消失、梯度爆炸、双随机矩阵</span>
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ───── MoE Section ───── */}
      <section className="relative z-10 py-[120px] pb-[100px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <span className="section-label block mb-3">[ 路由网络 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-12">MoE 路由：384 专家的协作网络</h2>
          </ScrollReveal>

          {/* MoE Network Canvas Panel */}
          <ScrollReveal>
            <div className="relative w-full h-[480px] rounded-xl overflow-hidden liquid-glass mb-10">
              <MoENetworkCanvas />
              {/* Legend */}
              <div className="absolute bottom-4 right-4 z-10 flex items-center gap-4 text-[12px] text-[#8B9EB0]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_white]" />
                  共享专家
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#3D8BFF]" />
                  路由专家
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-[1.5px] bg-[#00E5FF]" />
                  激活路径
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Parameter Table */}
          <ScrollReveal delay={0.1}>
            <div className="mb-10">
              <TechTable
                headers={['参数', 'V4-Pro', 'V4-Flash']}
                rows={[
                  { '参数': '路由专家数 (n_routed)', 'V4-Pro': '384', 'V4-Flash': '256' },
                  { '参数': '每 Token 激活专家', 'V4-Pro': '6', 'V4-Flash': '6' },
                  { '参数': '共享专家数 (n_shared)', 'V4-Pro': '1', 'V4-Flash': '1' },
                  { '参数': '专家中间维度', 'V4-Pro': '3,072', 'V4-Flash': '2,048' },
                  { '参数': 'MTP 深度', 'V4-Pro': '1', 'V4-Flash': '1' },
                  { '参数': 'Hash Routing 层数', 'V4-Pro': '前 3 层', 'V4-Flash': '前 3 层' },
                  { '参数': 'mHC 扩展因子 (n_hc)', 'V4-Pro': '4', 'V4-Flash': '4' },
                ]}
              />
            </div>
          </ScrollReveal>

          {/* Hash Routing */}
          <ScrollReveal delay={0.1}>
            <div className="max-w-[600px] liquid-glass rounded-xl p-8">
              <h3 className="font-heading text-[28px] font-semibold text-white mb-4">Hash Routing 机制</h3>
              <div className="liquid-glass rounded-lg p-4 mb-4 border-l-[3px] border-l-[#00E5FF]">
                <code className="font-mono text-[16px] text-white">
                  router(x) = hash(x) % n_experts
                </code>
              </div>
              <p className="text-[17px] text-[#8B9EB0] leading-relaxed">
                前 3 层采用 Hash Routing，通过输入特征的低秩哈希直接映射到专家桶，避免传统门控网络的开销。
              </p>
              {/* Mini flow */}
              <div className="flex items-center gap-3 mt-6">
                <div className="liquid-glass rounded-lg px-4 py-2 text-[13px] text-white">输入向量</div>
                <svg width="40" height="20" className="flex-shrink-0">
                  <line x1="0" y1="10" x2="35" y2="10" stroke="#00E5FF" strokeWidth="1.5" strokeDasharray="4 2">
                    <animate attributeName="stroke-dashoffset" from="6" to="0" dur="1s" repeatCount="indefinite" />
                  </line>
                  <polygon points="35,10 30,7 30,13" fill="#00E5FF" />
                </svg>
                <div className="liquid-glass rounded-lg px-4 py-2 text-[13px] text-[#00E5FF] border border-[rgba(0,229,255,0.3)]">hash 计算</div>
                <svg width="40" height="20" className="flex-shrink-0">
                  <line x1="0" y1="10" x2="35" y2="10" stroke="#00E5FF" strokeWidth="1.5" strokeDasharray="4 2">
                    <animate attributeName="stroke-dashoffset" from="6" to="0" dur="1s" repeatCount="indefinite" />
                  </line>
                  <polygon points="35,10 30,7 30,13" fill="#00E5FF" />
                </svg>
                <div className="liquid-glass rounded-lg px-4 py-2 text-[13px] text-white">专家桶分配</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ───── Attention Section ───── */}
      <section
        className="relative z-10 py-[120px]"
        style={{ background: '#050B14' }}
      >
        <div className="absolute top-0 left-0 right-0 h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.03) 0%, transparent 60%)' }}
        />
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <span className="section-label block mb-3">[ 注意力机制 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-12">混合注意力：从压缩到极端压缩</h2>
          </ScrollReveal>

          {/* CSA / HCA Split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* CSA Panel */}
            <ScrollReveal delay={0}>
              <div
                className="liquid-glass liquid-glass-hover rounded-xl p-8 lg:p-10 relative overflow-hidden"
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget.getBoundingClientRect())}
              >
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-100"
                  style={glassGlowStyle(null)}
                />
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#3D8BFF]" />
                <h3 className="font-heading text-[28px] font-semibold text-white mb-6">CSA：压缩与稀疏的平衡</h3>

                {/* SVG Flow */}
                <div className="flex flex-col gap-3 mb-6">
                  {[
                    { label: '输入序列', sub: '原始 token 序列', color: 'white' },
                    { label: '压缩器', sub: 'm=4', color: '#3D8BFF' },
                    { label: 'Lightning Indexer', sub: '低秩索引', color: '#00E5FF' },
                    { label: 'Top-k 稀疏选择', sub: 'k=1024 / k=512', color: '#3D8BFF' },
                    { label: '输出投影', sub: 'Shared KV MQA + Grouped', color: 'white' },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="flex-1 rounded-lg px-4 py-3 border"
                        style={{
                          borderColor: step.color === 'white' ? 'rgba(255,255,255,0.2)' : step.color,
                          background: 'rgba(10,22,40,0.4)',
                        }}
                      >
                        <div className="text-[14px] text-white font-medium">{step.label}</div>
                        <div className="text-[12px] text-[#8B9EB0]">{step.sub}</div>
                      </div>
                    </div>
                  ))}
                  {/* Connecting arrows */}
                  <div className="absolute left-[50%] top-[140px] bottom-[180px] w-[1px] hidden lg:block"
                    style={{ background: 'linear-gradient(to bottom, #00E5FF, transparent)' }}
                  />
                </div>

                <p className="text-[13px] text-[#8B9EB0] mb-6">
                  滑动窗口注意力（128）并行处理局部依赖
                </p>

                {/* CSA Params */}
                <TechTable
                  headers={['配置', 'V4-Pro', 'V4-Flash']}
                  rows={[
                    { '配置': '压缩率 (m)', 'V4-Pro': '4×', 'V4-Flash': '4×' },
                    { '配置': '稀疏 Top-k', 'V4-Pro': '1,024', 'V4-Flash': '512' },
                    { '配置': 'Query Heads', 'V4-Pro': '128', 'V4-Flash': '64' },
                    { '配置': 'Head 维度 (c)', 'V4-Pro': '512', 'V4-Flash': '512' },
                    { '配置': '滑动窗口 (n_win)', 'V4-Pro': '128', 'V4-Flash': '128' },
                    { '配置': 'Query 压缩维度', 'V4-Pro': '1,536', 'V4-Flash': '1,024' },
                    { '配置': '输出投影组数 (g)', 'V4-Pro': '16', 'V4-Flash': '8' },
                  ]}
                />
              </div>
            </ScrollReveal>

            {/* HCA Panel */}
            <ScrollReveal delay={0.15}>
              <div
                className="liquid-glass liquid-glass-hover rounded-xl p-8 lg:p-10 relative overflow-hidden"
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget.getBoundingClientRect())}
              >
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-100"
                  style={glassGlowStyle(null)}
                />
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#00E5FF]" />
                <h3 className="font-heading text-[28px] font-semibold text-white mb-6">HCA：极端压缩的效率极限</h3>

                {/* HCA Flow */}
                <div className="flex flex-col gap-3 mb-8">
                  {[
                    { label: '输入序列', sub: '原始 token 序列', color: 'white' },
                    { label: '极端压缩器', sub: "m'=128", color: '#00E5FF' },
                    { label: '输出投影', sub: 'Shared KV MQA', color: 'white' },
                  ].map((step, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div
                        className="flex-1 rounded-lg px-4 py-3 border"
                        style={{
                          borderColor: step.color === 'white' ? 'rgba(255,255,255,0.2)' : step.color,
                          background: 'rgba(10,22,40,0.4)',
                        }}
                      >
                        <div className="text-[14px] text-white font-medium">{step.label}</div>
                        <div className="text-[12px] text-[#8B9EB0]">{step.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Big number */}
                <div className="text-center mb-6">
                  <HolographicText
                    text="2%"
                    className="font-heading text-[72px] font-medium text-[#00E5FF]"
                    as="div"
                  />
                  <p className="text-[17px] text-[#8B9EB0] mt-2">KV Cache 降至 BF16 GQA8 基线</p>
                  <span className="data-tag inline-block mt-2">在 1M 上下文设置下</span>
                </div>

                <ul className="space-y-2 text-[15px] text-[#8B9EB0]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#00E5FF] mt-0.5">•</span>
                    不执行稀疏选择（全 dense）
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00E5FF] mt-0.5">•</span>
                    无重叠压缩（与 CSA 不同）
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#00E5FF] mt-0.5">•</span>
                    同样配备滑动窗口注意力分支
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Mixed Config Table */}
          <ScrollReveal delay={0.1} className="mt-14">
            <h4 className="font-heading text-[20px] font-semibold text-white mb-4">混合配置表</h4>
            <TechTable
              headers={['层', 'V4-Pro', 'V4-Flash']}
              rows={[
                { '层': '第 1-2 层', 'V4-Pro': 'HCA', 'V4-Flash': '纯滑动窗口注意力' },
                { '层': '后续层', 'V4-Pro': 'CSA 与 HCA 交错', 'V4-Flash': 'CSA 与 HCA 交错' },
              ]}
            />
          </ScrollReveal>

          {/* Precision Cards */}
          <ScrollReveal delay={0.1} className="mt-14">
            <h4 className="font-heading text-[20px] font-semibold text-white mb-6">精度配置</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'KV RoPE 维度', value: 'BF16', desc: '旋转位置编码存储', color: '#3D8BFF' },
                { title: 'KV 其他维度', value: 'FP8', desc: '非位置信息压缩 50%', color: '#00E5FF' },
                { title: 'Indexer 注意力', value: 'FP4', desc: 'Lightning 索引计算', color: '#0055FF' },
                { title: 'Index Scores', value: 'BF16', desc: '99.7% recall，2× 加速', color: '#3D8BFF' },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                  className="liquid-glass liquid-glass-hover rounded-xl p-5"
                  style={{ borderTop: `2px solid ${card.color}` }}
                >
                  <div className="text-[13px] text-[#8B9EB0] mb-1">{card.title}</div>
                  <div className="font-mono text-[28px] font-medium" style={{ color: card.color }}>{card.value}</div>
                  <div className="text-[13px] text-[#8B9EB0] mt-1">{card.desc}</div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ───── Network Topology & Muon ───── */}
      <section className="relative z-10 py-[120px] pb-[160px]">
        <div className="max-w-[1280px] mx-auto px-6">
          {/* mHC Section */}
          <ScrollReveal>
            <span className="section-label block mb-3">[ 网络拓扑 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-8">mHC：深层网络的稳定性保障</h2>
          </ScrollReveal>

          {/* Formula Box */}
          <ScrollReveal delay={0.1}>
            <motion.div
              className="liquid-glass rounded-xl p-8 mb-10 border-l-[3px] border-l-[#00E5FF] hover:border-l-[4px] transition-all duration-200"
              whileHover={{ borderLeftWidth: 4 }}
            >
              <code className="font-mono text-[18px] leading-relaxed text-white block">
                <span className="text-[#00E5FF]">B</span>
                <sub className="text-[#8B9EB0]">l</sub>
                {' '}∈{' '}
                <span className="text-[#00E5FF]">ℳ</span>
                {' '}≜{' '}{'{'}M ∈{' '}
                <span className="text-[#00E5FF]">ℝ</span>
                <sup>n×n</sup>
                {' | M1'}
                <sub>n</sub>
                {' = 1'}
                <sub>n</sub>
                {', 1'}
                <sub>n</sub>
                <sup>T</sup>
                {'M = 1'}
                <sub>n</sub>
                <sup>T</sup>
                {', M ≥ 0'})
              </code>
            </motion.div>
          </ScrollReveal>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { title: '谱范数 ≤ 1', desc: '保证残差变换非扩张性' },
              { title: '乘法封闭性', desc: '集合 ℳ 对乘法封闭，深层堆叠稳定' },
              { title: 'Sinkhorn-Knopp 投影', desc: 't_max=20 次迭代至双随机矩阵' },
              { title: '融合 Kernel', desc: '额外 wall-time 开销仅 6.7%' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                className="liquid-glass liquid-glass-hover rounded-xl p-6"
              >
                <h4 className="font-heading text-[18px] font-semibold text-white mb-2">{f.title}</h4>
                <p className="text-[14px] text-[#8B9EB0]">{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Dynamic parameterization note */}
          <ScrollReveal delay={0.1}>
            <div className="liquid-glass rounded-xl p-6 mb-20">
              <p className="text-[17px] text-[#8B9EB0] leading-relaxed">
                三个线性映射（A<sub className="text-[#8B9EB0]">l</sub>、B<sub className="text-[#8B9EB0]">l</sub>、C<sub className="text-[#8B9EB0]">l</sub>）分解为动态（输入相关）和静态（输入无关）分量，通过 RMSNorm 扁平化输入后生成原始参数。
              </p>
            </div>
          </ScrollReveal>

          {/* Muon Section */}
          <ScrollReveal>
            <span className="section-label block mb-3">[ 优化策略 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-8">Muon：梯度正交化的力量</h2>
          </ScrollReveal>

          {/* Application Range Panel */}
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
              <div className="liquid-glass liquid-glass-hover rounded-xl p-8 relative overflow-hidden"
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget.getBoundingClientRect())}
              >
                <div className="absolute inset-0 pointer-events-none" style={glassGlowStyle(null)} />
                <h3 className="font-heading text-[24px] font-semibold text-[#00E5FF] mb-4">Muon 优化器</h3>
                <ul className="space-y-3">
                  {['注意力层（CSA/HCA）', 'MoE 专家层', 'FFN 层', '输出投影'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[15px] text-white">
                      <span className="text-[#00E5FF]">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="liquid-glass liquid-glass-hover rounded-xl p-8">
                <h3 className="font-heading text-[24px] font-semibold text-[#8B9EB0] mb-4">保留 AdamW</h3>
                <ul className="space-y-3">
                  {['Embedding 层', 'Prediction Head', 'RMSNorm 权重', 'mHC 静态参数'].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-[15px] text-[#8B9EB0]">
                      <span>−</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Iteration Table */}
          <ScrollReveal delay={0.1}>
            <TechTable
              headers={['阶段', '迭代次数', '系数 (a, b, c)', '目标']}
              rows={[
                { '阶段': '快速收敛', '迭代次数': '8', '系数 (a, b, c)': '(3.4445, -4.7750, 2.0315)', '目标': '奇异值快速推向 1' },
                { '阶段': '精确稳定', '迭代次数': '2', '系数 (a, b, c)': '(2, -1.5, 0.5)', '目标': '奇异值精确稳定在 1' },
                { '阶段': '总计', '迭代次数': '10', '系数 (a, b, c)': '—', '目标': '—' },
              ]}
            />
          </ScrollReveal>

          {/* Key Insight Panel */}
          <ScrollReveal delay={0.1} className="mt-10">
            <div className="liquid-glass rounded-xl p-8 border-l-[4px] border-l-[#00E5FF]">
              <div className="flex items-center gap-2 mb-3">
                <span className="data-tag">架构与优化的协同设计</span>
              </div>
              <h3 className="font-heading text-[28px] font-semibold text-[#00E5FF] mb-4">无需 QK-Clip</h3>
              <p className="text-[17px] text-[#8B9EB0] leading-relaxed">
                由于 CSA/HCA 允许直接对 queries 和 KV entries 应用 RMSNorm，有效防止注意力 logits 爆炸，因此无需使用 QK-Clip 技术。
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ───── Hashion Animation ───── */}
      <section className="relative z-10 py-[120px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <span className="section-label block mb-3">[ 注意力压缩 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-8">CSA / HCA 压缩可视化</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="liquid-glass rounded-xl p-8 md:p-12">
              <HashionAnimation />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ───── MoE Router Flow ───── */}
      <section className="relative z-10 py-[120px]" style={{ background: '#050B14' }}>
        <div className="absolute top-0 left-0 right-0 h-[300px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,229,255,0.03) 0%, transparent 60%)' }}
        />
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <span className="section-label block mb-3">[ 路由流程 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-8">MoE Router 数据流</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="liquid-glass rounded-xl p-8 md:p-12">
              <MoERouterFlow />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ───── Architecture Comparison Table ───── */}
      <section className="relative z-10 py-[120px] pb-[160px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <span className="section-label block mb-3">[ 横向对比 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-8">架构横向对比</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="liquid-glass rounded-xl p-6 md:p-8">
              <ArchComparisonTable />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
