import { useState, memo } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import HolographicText from '@/components/HolographicText'
import ParticleCanvas from '@/components/ParticleCanvas'
import {
  Cpu, Network, ArrowLeftRight, Timer,
  Languages, FileCode, Monitor, Settings,
  Film, Image, HardDrive, Database,
  Layers, Box, Archive, Folder,
  Server, Radio, Download, Upload, Wifi,
} from 'lucide-react'

/* ─────────────────────────── Scroll Reveal ─────────────────────────── */

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

/* ─────────────────────────── Beginner Card ─────────────────────────── */

function BeginnerCard({
  icon,
  title,
  emoji,
  children,
  accent = '#00E5FF',
  delay = 0,
}: {
  icon: React.ReactNode
  title: string
  emoji: string
  children: React.ReactNode
  accent?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className="liquid-glass rounded-xl p-6 md:p-8 relative overflow-hidden"
      style={{ borderTop: `3px solid ${accent}` }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
        >
          <div style={{ color: accent }}>{icon}</div>
        </div>
        <h3 className="font-heading text-[20px] font-semibold text-white">
          {emoji} {title}
        </h3>
      </div>
      <div className="text-[15px] text-[#8B9EB0] leading-[1.8]">{children}</div>
    </motion.div>
  )
}

/* ─────────────────────────── Wave Pipeline SVG ─────────────────────────── */

const WavePipelineSVG = memo(function WavePipelineSVG() {
  return (
    <svg viewBox="0 0 600 180" className="w-full h-auto" style={{ maxHeight: '220px' }}>
      {/* Time axis */}
      <line x1="20" y1="160" x2="580" y2="160" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <text x="580" y="175" fill="rgba(255,255,255,0.4)" fontSize="12" fontFamily="JetBrains Mono, monospace">时间 →</text>

      {/* Wave 1 */}
      <motion.g initial={{ x: -60, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
        <text x="0" y="30" fill="#8B9EB0" fontSize="12" fontFamily="JetBrains Mono, monospace">Wave 1</text>
        {/* Compute block */}
        <rect x="80" y="15" width="160" height="24" rx="4" fill="rgba(61,139,255,0.7)" />
        {/* Shimmer */}
        <motion.rect x="80" y="15" width="30" height="24" rx="4" fill="rgba(255,255,255,0.15)"
          animate={{ x: [0, 130, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        <text x="140" y="32" fill="white" fontSize="10" textAnchor="middle" fontFamily="Inter, sans-serif">计算</text>
        {/* Send results */}
        <rect x="250" y="15" width="50" height="24" rx="4" fill="rgba(255,255,255,0.4)" />
        <text x="275" y="32" fill="white" fontSize="10" textAnchor="middle" fontFamily="Inter, sans-serif">发送</text>
      </motion.g>

      {/* Wave 2 */}
      <motion.g initial={{ x: -60, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}>
        <text x="0" y="70" fill="#8B9EB0" fontSize="12" fontFamily="JetBrains Mono, monospace">Wave 2</text>
        {/* Receive token */}
        <rect x="180" y="55" width="50" height="24" rx="4" fill="transparent" stroke="rgba(0,229,255,0.5)" strokeWidth="1" strokeDasharray="4 2" />
        <text x="205" y="72" fill="#00E5FF" fontSize="10" textAnchor="middle" fontFamily="Inter, sans-serif">接收</text>
        {/* Compute */}
        <rect x="250" y="55" width="160" height="24" rx="4" fill="rgba(61,139,255,0.7)" />
        <motion.rect x="250" y="55" width="30" height="24" rx="4" fill="rgba(255,255,255,0.15)"
          animate={{ x: [0, 130, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 1.3 }}
        />
        <text x="330" y="72" fill="white" fontSize="10" textAnchor="middle" fontFamily="Inter, sans-serif">计算</text>
        {/* Send */}
        <rect x="420" y="55" width="40" height="24" rx="4" fill="rgba(255,255,255,0.4)" />
      </motion.g>

      {/* Wave 3 */}
      <motion.g initial={{ x: -60, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }}>
        <text x="0" y="110" fill="#8B9EB0" fontSize="12" fontFamily="JetBrains Mono, monospace">Wave 3</text>
        {/* Receive */}
        <rect x="350" y="95" width="50" height="24" rx="4" fill="transparent" stroke="rgba(0,229,255,0.5)" strokeWidth="1" strokeDasharray="4 2" />
        {/* Compute */}
        <rect x="420" y="95" width="140" height="24" rx="4" fill="rgba(61,139,255,0.7)" />
        <motion.rect x="420" y="95" width="30" height="24" rx="4" fill="rgba(255,255,255,0.15)"
          animate={{ x: [0, 110, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 2.6 }}
        />
        <text x="490" y="112" fill="white" fontSize="10" textAnchor="middle" fontFamily="Inter, sans-serif">计算</text>
      </motion.g>
    </svg>
  )
})

/* ─────────────────────────── Distillation Flow SVG ─────────────────────────── */

const DistillationFlowSVG = memo(function DistillationFlowSVG() {
  return (
    <svg viewBox="0 0 800 280" className="w-full h-auto" style={{ maxHeight: '320px' }}>
      {/* Main flow line */}
      <motion.line x1="100" y1="60" x2="700" y2="60" stroke="#00E5FF" strokeWidth="2"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }}
      />
      {/* Arrow head */}
      <polygon points="700,60 690,55 690,65" fill="#00E5FF" />

      {/* Specialist Training node */}
      <motion.g initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
        <rect x="20" y="20" width="200" height="80" rx="8" fill="rgba(10,22,40,0.6)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <rect x="20" y="20" width="200" height="3" rx="1.5" fill="#3D8BFF" />
        <text x="120" y="50" fill="white" fontSize="15" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="500">Specialist Training</text>
        <text x="120" y="72" fill="#8B9EB0" fontSize="13" textAnchor="middle" fontFamily="Noto Sans SC, sans-serif">领域专家培养</text>
      </motion.g>

      {/* On-Policy Distillation node */}
      <motion.g initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}>
        <rect x="300" y="20" width="200" height="80" rx="8" fill="rgba(10,22,40,0.6)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <rect x="300" y="20" width="200" height="3" rx="1.5" fill="#3D8BFF" />
        <text x="400" y="50" fill="white" fontSize="15" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="500">On-Policy Distillation</text>
        <text x="400" y="72" fill="#8B9EB0" fontSize="13" textAnchor="middle" fontFamily="Noto Sans SC, sans-serif">10+ 教师模型整合</text>
      </motion.g>

      {/* Unified Model node */}
      <motion.g initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.5 }}>
        <rect x="580" y="20" width="200" height="80" rx="8" fill="rgba(10,22,40,0.6)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <rect x="580" y="20" width="200" height="3" rx="1.5" fill="#3D8BFF" />
        <text x="680" y="50" fill="white" fontSize="15" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="500">Unified Model</text>
        <text x="680" y="72" fill="#8B9EB0" fontSize="13" textAnchor="middle" fontFamily="Noto Sans SC, sans-serif">最终模型</text>
      </motion.g>

      {/* Branch lines */}
      <motion.line x1="120" y1="100" x2="120" y2="150" stroke="rgba(255,255,255,0.2)" strokeWidth="1"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.8 }}
      />
      <motion.line x1="120" y1="150" x2="80" y2="150" stroke="rgba(255,255,255,0.2)" strokeWidth="1"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 1.0 }}
      />
      <motion.line x1="120" y1="150" x2="160" y2="150" stroke="rgba(255,255,255,0.2)" strokeWidth="1"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 1.0 }}
      />

      {/* SFT node */}
      <motion.g initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 1.1 }}>
        <rect x="20" y="160" width="100" height="60" rx="6" fill="rgba(10,22,40,0.6)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <rect x="20" y="160" width="100" height="2" rx="1" fill="#00E5FF" />
        <text x="70" y="185" fill="white" fontSize="13" textAnchor="middle" fontFamily="Inter, sans-serif">SFT</text>
        <text x="70" y="203" fill="#8B9EB0" fontSize="11" textAnchor="middle" fontFamily="Noto Sans SC, sans-serif">监督微调</text>
      </motion.g>

      {/* GRPO node */}
      <motion.g initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 1.1 }}>
        <rect x="130" y="160" width="100" height="60" rx="6" fill="rgba(10,22,40,0.6)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <rect x="130" y="160" width="100" height="2" rx="1" fill="#00E5FF" />
        <text x="180" y="185" fill="white" fontSize="13" textAnchor="middle" fontFamily="Inter, sans-serif">GRPO</text>
        <text x="180" y="203" fill="#8B9EB0" fontSize="11" textAnchor="middle" fontFamily="Noto Sans SC, sans-serif">策略优化</text>
      </motion.g>

      {/* Right branch lines */}
      <motion.line x1="400" y1="100" x2="400" y2="150" stroke="rgba(255,255,255,0.2)" strokeWidth="1"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 0.8 }}
      />
      <motion.line x1="400" y1="150" x2="340" y2="150" stroke="rgba(255,255,255,0.2)" strokeWidth="1"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 1.0 }}
      />
      <motion.line x1="400" y1="150" x2="460" y2="150" stroke="rgba(255,255,255,0.2)" strokeWidth="1"
        initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: 1.0 }}
      />

      {/* Reverse KL node */}
      <motion.g initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 1.1 }}>
        <rect x="280" y="160" width="120" height="60" rx="6" fill="rgba(10,22,40,0.6)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <rect x="280" y="160" width="120" height="2" rx="1" fill="#00E5FF" />
        <text x="340" y="185" fill="white" fontSize="13" textAnchor="middle" fontFamily="Inter, sans-serif">Reverse KL</text>
        <text x="340" y="203" fill="#8B9EB0" fontSize="11" textAnchor="middle" fontFamily="Noto Sans SC, sans-serif">逆向 KL 散度</text>
      </motion.g>

      {/* On-Policy node */}
      <motion.g initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 1.1 }}>
        <rect x="410" y="160" width="120" height="60" rx="6" fill="rgba(10,22,40,0.6)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <rect x="410" y="160" width="120" height="2" rx="1" fill="#00E5FF" />
        <text x="470" y="185" fill="white" fontSize="13" textAnchor="middle" fontFamily="Inter, sans-serif">On-Policy</text>
        <text x="470" y="203" fill="#8B9EB0" fontSize="11" textAnchor="middle" fontFamily="Noto Sans SC, sans-serif">采样学习</text>
      </motion.g>
    </svg>
  )
})

/* ─────────────────────────── Hardware Topology SVG ─────────────────────────── */

const HardwareTopologySVG = memo(function HardwareTopologySVG() {
  const rows = 6
  const cols = 8
  const nodeSize = 28
  const gap = 12
  const totalW = cols * (nodeSize + gap) + gap
  const totalH = rows * (nodeSize + gap) + gap + 40

  // Pre-compute roles
  const nodes: { r: number; c: number; role: 'compute' | 'router' | 'comm' }[] = []
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let role: 'compute' | 'router' | 'comm' = 'compute'
      if ((r === 0 || r === rows - 1) && (c === 0 || c === cols - 1)) {
        role = 'router'
      } else if ((r + c) % 5 === 0) {
        role = 'comm'
      }
      nodes.push({ r, c, role })
    }
  }

  const roleColors = {
    compute: '#3D8BFF',
    router: '#00E5FF',
    comm: '#FF6B6B',
  }

  return (
    <svg viewBox={`0 0 ${totalW} ${totalH}`} className="w-full h-auto">
      {/* Animated flow lines */}
      <defs>
        <linearGradient id="flowOrange" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0" />
          <stop offset="50%" stopColor="#FF6B6B" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="flowCyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" stopOpacity="0" />
          <stop offset="50%" stopColor="#00E5FF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#00E5FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="flowPurple" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#9B59B6" stopOpacity="0" />
          <stop offset="50%" stopColor="#9B59B6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#9B59B6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="flowGreen" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#4ECDC4" stopOpacity="0" />
          <stop offset="50%" stopColor="#4ECDC4" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#4ECDC4" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Horizontal flow: CPU to GPU */}
      <motion.path
        d={`M ${gap} ${totalH - 25} Q ${totalW / 2} ${totalH - 45} ${totalW - gap} ${totalH - 25}`}
        fill="none"
        stroke="url(#flowOrange)"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
      />

      {/* Diagonal flow: Expert routing */}
      <motion.path
        d={`M ${gap + nodeSize / 2} ${gap + nodeSize / 2} Q ${totalW / 2} ${totalH / 2} ${totalW - gap - nodeSize / 2} ${totalH - 45 - nodeSize / 2}`}
        fill="none"
        stroke="url(#flowCyan)"
        strokeWidth="2"
        strokeDasharray="6 4"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2.5, delay: 0.5, repeat: Infinity, repeatDelay: 0.5 }}
      />

      {/* Gradient sync lines */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.path
          key={`purple-${i}`}
          d={`M ${gap + (i * 3 + 1) * (nodeSize + gap)} ${gap} L ${gap + (i * 3 + 2) * (nodeSize + gap)} ${totalH - 45}`}
          fill="none"
          stroke="url(#flowPurple)"
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: i * 0.3, repeat: Infinity, repeatDelay: 2 }}
        />
      ))}

      {/* KV Cache movement */}
      <motion.path
        d={`M ${totalW - gap} ${gap} Q ${totalW / 2} ${totalH / 2} ${gap} ${totalH - 45}`}
        fill="none"
        stroke="url(#flowGreen)"
        strokeWidth="2"
        strokeDasharray="4 3"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 3, delay: 1, repeat: Infinity, repeatDelay: 0.5 }}
      />

      {/* GPU nodes */}
      {nodes.map((node, i) => {
        const x = gap + node.c * (nodeSize + gap)
        const y = gap + node.r * (nodeSize + gap)
        return (
          <motion.g
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: (node.r * cols + node.c) * 0.01 }}
          >
            <rect
              x={x}
              y={y}
              width={nodeSize}
              height={nodeSize}
              rx={4}
              fill={`${roleColors[node.role]}20`}
              stroke={roleColors[node.role]}
              strokeWidth={1.5}
            />
            {/* Pulse effect for router nodes */}
            {node.role === 'router' && (
              <motion.rect
                x={x - 2}
                y={y - 2}
                width={nodeSize + 4}
                height={nodeSize + 4}
                rx={5}
                fill="none"
                stroke={roleColors[node.role]}
                strokeWidth={1}
                animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.g>
        )
      })}

      {/* Labels */}
      <text x={totalW / 2} y={totalH - 8} fill="#8B9EB0" fontSize="10" textAnchor="middle" fontFamily="Inter, sans-serif">
        384 GPU 训练集群拓扑
      </text>

      {/* Legend */}
      <g transform={`translate(${gap}, ${totalH - 38})`}>
        <rect x="0" y="0" width="8" height="8" rx="2" fill={`${roleColors.compute}40`} stroke={roleColors.compute} strokeWidth="1" />
        <text x="12" y="8" fill="#8B9EB0" fontSize="8" fontFamily="Inter, sans-serif">计算</text>
        <rect x="50" y="0" width="8" height="8" rx="2" fill={`${roleColors.router}40`} stroke={roleColors.router} strokeWidth="1" />
        <text x="62" y="8" fill="#8B9EB0" fontSize="8" fontFamily="Inter, sans-serif">路由</text>
        <rect x="100" y="0" width="8" height="8" rx="2" fill={`${roleColors.comm}40`} stroke={roleColors.comm} strokeWidth="1" />
        <text x="112" y="8" fill="#8B9EB0" fontSize="8" fontFamily="Inter, sans-serif">通信</text>
      </g>

      {/* Flow labels */}
      <text x="10" y={totalH - 50} fill="#FF6B6B" fontSize="8" fontFamily="Inter, sans-serif" opacity="0.8">CPU→GPU</text>
      <text x={totalW - 50} y="15" fill="#4ECDC4" fontSize="8" fontFamily="Inter, sans-serif" opacity="0.8">KV Cache</text>
      <text x={totalW / 2 - 20} y={totalH / 2 - 10} fill="#00E5FF" fontSize="8" fontFamily="Inter, sans-serif" opacity="0.8">专家路由</text>
    </svg>
  )
})

/* ─────────────────────────── Mini Bar Chart ─────────────────────────── */
function MiniBarChart({ before, after, label, unit, color = '#00E5FF' }: {
  before: number
  after: number
  label: string
  unit: string
  color?: string
}) {
  const max = Math.max(before, after)
  const beforePct = (before / max) * 100
  const afterPct = (after / max) * 100

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-[#8B9EB0]">{label}</span>
      </div>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#8B9EB0] w-[32px]">优化前</span>
          <div className="flex-1 h-[14px] rounded bg-[rgba(255,255,255,0.05)] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${beforePct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded"
              style={{ background: 'rgba(255,107,107,0.6)' }}
            />
          </div>
          <span className="text-[10px] font-mono text-[#FF6B6B] w-[40px] text-right">{before}{unit}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[#8B9EB0] w-[32px]">优化后</span>
          <div className="flex-1 h-[14px] rounded bg-[rgba(255,255,255,0.05)] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${afterPct}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className="h-full rounded"
              style={{ background: color }}
            />
          </div>
          <span className="text-[10px] font-mono text-white w-[40px] text-right">{after}{unit}</span>
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────── Parallel Strategy Data ─────────────────────────── */
const parallelStrategies = [
  { strategy: 'Data Parallel', level: '全局', effect: '多GPU同时处理不同batch', v4impl: 'ZeRO-1 + 混合bucket', icon: <Database size={18} /> },
  { strategy: 'Tensor Parallel', level: '层内', effect: '单层分布在多GPU', v4impl: '每8GPU一组', icon: <Layers size={18} /> },
  { strategy: 'Pipeline Parallel', level: '层间', effect: '不同层在不同GPU', v4impl: '1F1B + dual-pipe', icon: <ArrowLeftRight size={18} /> },
  { strategy: 'Expert Parallel', level: '专家', effect: '不同专家在不同GPU', v4impl: '64专家/GPU', icon: <Cpu size={18} /> },
  { strategy: 'Sequence Parallel', level: '序列', effect: '长序列分块处理', v4impl: 'Ring attention + CP', icon: <Wifi size={18} /> },
]

/* ─────────────────────────── Infrastructure Page ─────────────────────────── */

export default function Infrastructure() {
  const [kvTab, setKvTab] = useState<'memory' | 'disk'>('memory')
  const [hoveredMode, setHoveredMode] = useState<number | null>(null)

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
              <span>系统底层</span>
            </div>
            <h1 className="font-heading text-[48px] font-bold text-white mb-4">系统底层</h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
            className="text-[20px] text-[#8B9EB0] max-w-xl"
          >
            从训练工程到推理框架的全栈优化
          </motion.p>
        </div>
      </section>

      {/* ───── Beginner-Friendly Section ───── */}
      <section className="relative z-10 py-[80px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <span className="section-label">[ 小白看懂基础设施 ]</span>
              <span className="text-[18px]">🔧</span>
            </div>
            <h2 className="font-heading text-[32px] font-semibold text-white mb-4">
              用生活比喻，秒懂硬核技术
            </h2>
            <p className="text-[16px] text-[#8B9EB0] mb-12 max-w-[640px]">
              下面这些比喻帮你把抽象的工程概念和日常经验联系起来——不用懂代码，也能明白 DeepSeek 的底层为什么快。
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: 通信-计算重叠 */}
            <BeginnerCard
              icon={<Cpu size={20} />}
              title="通信-计算重叠"
              emoji="📱"
              accent="#00E5FF"
              delay={0.1}
            >
              <p className="mb-3">
                大模型训练就像一支庞大军队的协同作战：
              </p>
              <ul className="space-y-2 mb-3">
                <li className="flex items-start gap-2">
                  <Network size={16} className="mt-1 flex-shrink-0 text-[#00E5FF]" />
                  <span><strong className="text-white">计算</strong> = 士兵们在阵地打仗（GPU 做数学计算）</span>
                </li>
                <li className="flex items-start gap-2">
                  <ArrowLeftRight size={16} className="mt-1 flex-shrink-0 text-[#00E5FF]" />
                  <span><strong className="text-white">通信</strong> = 传令兵在阵地之间传递情报（GPU 之间传数据）</span>
                </li>
              </ul>
              <p className="mb-3">
                传统方式 = 先打仗，打完再传令，传完再打仗——大量时间浪费在等传令兵。
              </p>
              <div className="rounded-lg p-4 mb-3" style={{ background: 'rgba(0,229,255,0.08)', borderLeft: '3px solid #00E5FF' }}>
                <p className="text-white">
                  <strong>通信-计算重叠</strong> = 边打仗边传令！传令兵在士兵们打仗的时候就把下一条命令传到位了。
                </p>
              </div>
              <p className="flex items-center gap-2">
                <Timer size={16} className="text-[#00E5FF]" />
                <span>结果是通信时间被「隐藏」在计算时间里，总体速度快了 <strong className="text-[#00E5FF]">1.92×</strong>！</span>
              </p>
            </BeginnerCard>

            {/* Card 2: TileLang */}
            <BeginnerCard
              icon={<Languages size={20} />}
              title="TileLang = 翻译官"
              emoji="🌐"
              accent="#3D8BFF"
              delay={0.2}
            >
              <p className="mb-3">
                GPU 就像一个只会说「机器语」的外国专家。
              </p>
              <ul className="space-y-2 mb-3">
                <li className="flex items-start gap-2">
                  <FileCode size={16} className="mt-1 flex-shrink-0 text-[#3D8BFF]" />
                  <span>程序员写 Python = 说中文</span>
                </li>
                <li className="flex items-start gap-2">
                  <Monitor size={16} className="mt-1 flex-shrink-0 text-[#3D8BFF]" />
                  <span>GPU 执行 = 说机器语</span>
                </li>
                <li className="flex items-start gap-2">
                  <Settings size={16} className="mt-1 flex-shrink-0 text-[#3D8BFF]" />
                  <span><strong className="text-white">TileLang</strong> = 一个超级翻译官，能把 Python 直接翻译成 GPU 能听懂的最优机器语</span>
                </li>
              </ul>
              <p className="mb-2">
                没有 TileLang = 程序员要学外语（CUDA），写几百行复杂代码。
              </p>
              <p className="mb-3">
                有 TileLang = 写几十行 Python 就搞定，翻译官自动优化成最快版本！
              </p>
              <div className="rounded-lg p-4" style={{ background: 'rgba(61,139,255,0.08)', borderLeft: '3px solid #3D8BFF' }}>
                <p>
                  而且 TileLang 保证「同一段 Python，在任何 GPU 上翻译出来的机器语都一样快」——这叫 <strong className="text-white">batch invariance（批次不变性）</strong>。
                </p>
              </div>
            </BeginnerCard>

            {/* Card 3: FP4 量化 */}
            <BeginnerCard
              icon={<Film size={20} />}
              title="FP4 量化 = 视频压缩"
              emoji="📹"
              accent="#00E5FF"
              delay={0.3}
            >
              <p className="mb-3">
                不同数字精度就像不同视频清晰度：
              </p>
              <ul className="space-y-2 mb-3">
                <li className="flex items-start gap-2">
                  <Image size={16} className="mt-1 flex-shrink-0 text-[#00E5FF]" />
                  <span><strong className="text-white">BF16</strong> = 4K 超高清（16位，最精确，占空间最大）</span>
                </li>
                <li className="flex items-start gap-2">
                  <HardDrive size={16} className="mt-1 flex-shrink-0 text-[#00E5FF]" />
                  <span><strong className="text-white">FP8</strong> = 1080P 高清（8位，省一半空间，肉眼几乎看不出区别）</span>
                </li>
                <li className="flex items-start gap-2">
                  <Database size={16} className="mt-1 flex-shrink-0 text-[#00E5FF]" />
                  <span><strong className="text-white">FP4</strong> = 720P 标清（4位，再省一半，快速预览足够用）</span>
                </li>
              </ul>
              <p className="mb-2 text-white">DeepSeek-V4 的聪明做法：</p>
              <ul className="space-y-1 mb-3 text-[14px]">
                <li>• 位置编码（知道每个词在哪）→ 必须用 4K，不能丢精度</li>
                <li>• KV Cache（之前算过的内容）→ 用 1080P，省一半内存</li>
                <li>• 专家权重（只读取不修改的部分）→ 用 720P 存储，读取时再转 1080P</li>
              </ul>
              <div className="rounded-lg p-4" style={{ background: 'rgba(0,229,255,0.08)', borderLeft: '3px solid #00E5FF' }}>
                <p>
                  <strong className="text-white">为什么 FP4→FP8 是无损的？</strong> 因为 720P 转 1080P 时，原始信息没有丢，只是盒子变大了！
                </p>
              </div>
            </BeginnerCard>

            {/* Card 4: 异构 KV Cache */}
            <BeginnerCard
              icon={<Layers size={20} />}
              title="异构 KV Cache = 分层储物柜"
              emoji="🗄️"
              accent="#3D8BFF"
              delay={0.4}
            >
              <p className="mb-3">
                KV Cache 的管理就像一个超级图书馆：
              </p>
              <ul className="space-y-2 mb-3">
                <li className="flex items-start gap-2">
                  <Box size={16} className="mt-1 flex-shrink-0 text-[#3D8BFF]" />
                  <span><strong className="text-white">经典 KV Cache</strong> = 畅销书区，按请求分配小格子（block），快速存取</span>
                </li>
                <li className="flex items-start gap-2">
                  <Archive size={16} className="mt-1 flex-shrink-0 text-[#3D8BFF]" />
                  <span><strong className="text-white">State Cache</strong> = 参考书区，预先分配固定位置，专门放滑动窗口的历史记录</span>
                </li>
                <li className="flex items-start gap-2">
                  <Folder size={16} className="mt-1 flex-shrink-0 text-[#3D8BFF]" />
                  <span><strong className="text-white">磁盘存储</strong> = 档案室，把不常用的旧记录搬到硬盘上</span>
                </li>
              </ul>
              <p className="mb-2 text-white">三种策略：</p>
              <ul className="space-y-1 mb-3 text-[14px]">
                <li>• <strong>Full SWA</strong> = 什么都存，最占空间但计算最快</li>
                <li>• <strong>Periodic</strong> = 每隔 N 页存一次书签，空间和速度的平衡</li>
                <li>• <strong>Zero</strong> = 不存旧记录，利用压缩后的精华缓存「现场重算」——最省空间</li>
              </ul>
            </BeginnerCard>
          </div>
        </div>
      </section>

      {/* ───── Parallel Computing ───── */}
      <section className="relative z-10 py-[120px] pb-[100px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <span className="section-label block mb-3">[ 通信-计算重叠 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-12">Expert Parallelism：细粒度流水线</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8">
            {/* Left Panel */}
            <ScrollReveal delay={0}>
              <div className="liquid-glass rounded-xl p-8 lg:p-10">
                <div className="border-l-[4px] border-l-[#00E5FF] pl-4 mb-8">
                  <p className="text-[20px] text-white leading-relaxed">
                    MoE 层中通信延迟可被有效隐藏在计算之下
                  </p>
                </div>

                {/* Speedup Cards */}
                <div className="flex flex-col gap-4 mb-8">
                  {[
                    { label: '理论加速', value: '1.92×', desc: 'V4-Flash 配置下的理论极限', hologram: true },
                    { label: '通用推理', value: '1.50~1.73×', desc: '实际通用推理场景加速', hologram: false },
                    { label: '低延迟场景', value: '最高 1.96×', desc: 'RL rollout 等场景峰值加速', hologram: true },
                  ].map((card, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                      className="liquid-glass rounded-lg p-5"
                    >
                      <div className="text-[13px] text-[#8B9EB0] mb-1">{card.label}</div>
                      {card.hologram ? (
                        <HolographicText
                          text={card.value}
                          className={`font-mono text-[40px] font-medium ${i === 1 ? 'text-[#3D8BFF]' : 'text-[#00E5FF]'}`}
                          as="div"
                        />
                      ) : (
                        <div className="font-mono text-[40px] font-medium text-[#3D8BFF]">{card.value}</div>
                      )}
                      <div className="text-[13px] text-[#8B9EB0] mt-1">{card.desc}</div>
                    </motion.div>
                  ))}
                </div>

                <p className="text-[17px] text-[#8B9EB0] leading-relaxed">
                  将专家分割为多个 wave，形成 wave 级流水线。当前 wave 的计算、下一 wave 的 token 传输、已完成专家的 result sending 三者并发。
                </p>
              </div>
            </ScrollReveal>

            {/* Right Panel - Timing Diagram */}
            <ScrollReveal delay={0.2}>
              <div className="liquid-glass rounded-xl p-8 lg:p-10">
                <h3 className="font-heading text-[24px] font-semibold text-white mb-6">Wave 级流水线时序</h3>
                <WavePipelineSVG />
                <div className="mt-4 flex items-center gap-2">
                  <span className="data-tag">开源实现</span>
                  <span className="text-[13px] text-[#3D8BFF]">MegaMoE（DeepGEMM 组件）</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Hardware Suggestion Cards */}
          <ScrollReveal delay={0.1} className="mt-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: '计算-通信比阈值', value: 'C/B ≤ 6144 FLOPs/Byte', desc: '每 GBps 带宽可隐藏 6.1 TFLOPs 计算' },
                { title: '功率余量', value: '', desc: '建议提供足够功率余量应对全并发负载', icon: '⚡' },
                { title: 'Pull-based 通信', value: '', desc: '建议采用 pull-based 通信原语', icon: '→' },
                { title: 'SwiGLU 替代', value: '', desc: '提议用低成本元素级激活替代 SwiGLU', icon: '◈' },
              ].map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                  className="liquid-glass liquid-glass-hover rounded-xl p-5 h-[120px] flex flex-col justify-center"
                >
                  {card.value ? (
                    <>
                      <div className="font-mono text-[14px] text-[#00E5FF] mb-1">{card.value}</div>
                      <div className="text-[13px] text-[#8B9EB0]">{card.desc}</div>
                    </>
                  ) : (
                    <>
                      <div className="text-[16px] text-white font-medium mb-1">{card.icon} {card.title}</div>
                      <div className="text-[13px] text-[#8B9EB0]">{card.desc}</div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ───── TileLang & Kernel ───── */}
      <section className="relative z-10 py-[120px] pb-[100px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <span className="section-label block mb-3">[ Kernel 工程 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-12">灵活高效的基础软件栈</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* TileLang */}
            <ScrollReveal delay={0}>
              <div className="liquid-glass rounded-xl p-8 lg:p-10">
                <h3 className="font-heading text-[24px] font-semibold text-white mb-6">TileLang：DSL 平衡开发效率与性能</h3>
                <div className="flex flex-col gap-4">
                  {[
                    { title: 'Host Codegen', desc: '主机端逻辑移入生成代码，CPU 验证开销从数百微秒降至 <1μs/调用' },
                    { title: 'SMT 求解器', desc: '集成 Z3 SMT 求解器进行形式化整数分析，支持向量化、屏障插入等优化' },
                    { title: '数值精度', desc: '默认禁用 fast-math，提供显式精度近似选项；IEEE-754 兼容' },
                    { title: '位级可复现', desc: '与 NVCC 对齐代数简化规则，支持布局注解实现位相同输出' },
                  ].map((feat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                      className="flex items-start gap-3 group"
                    >
                      <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] mt-2 flex-shrink-0 group-hover:scale-[1.3] transition-transform duration-200" />
                      <div>
                        <div className="text-[15px] text-white font-medium">{feat.title}</div>
                        <div className="text-[14px] text-[#8B9EB0]">{feat.desc}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Batch Invariance & Determinacy */}
            <ScrollReveal delay={0.15}>
              <div className="flex flex-col gap-6">
                <div className="liquid-glass rounded-xl p-8 lg:p-10">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#3D8BFF] rounded-t-xl" />
                  <h3 className="font-heading text-[20px] font-semibold text-white mb-4">批处理不变性</h3>
                  <p className="text-[15px] text-white mb-4">同一 token 无论批次位置如何，输出位相同</p>
                  <ul className="space-y-2 text-[14px] text-[#8B9EB0]">
                    <li>• 注意力双 kernel 策略：单 SM 完整序列 + 多 SM 最终 partial wave</li>
                    <li>• 分布式共享内存高速交换</li>
                    <li>• 矩阵乘法：全面替换 cuBLAS 为 DeepGEMM</li>
                  </ul>
                </div>
                <div className="liquid-glass rounded-xl p-8 lg:p-10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#00E5FF] rounded-t-xl" />
                  <h3 className="font-heading text-[20px] font-semibold text-white mb-4">确定性保障</h3>
                  <p className="text-[15px] text-white mb-4">消除原子加指令导致的非确定性累积顺序</p>
                  <ul className="space-y-2 text-[14px] text-[#8B9EB0]">
                    <li>• 注意力反向：每 SM 分配独立累积 buffer + 全局确定性求和</li>
                    <li>• MoE 反向：单 rank 内 token 顺序预处理 + 多 rank 间 buffer 隔离</li>
                    <li>• mHC 矩阵乘法：各 split 部分单独输出 + 后续 kernel 确定性规约</li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ───── FP4 Quantization ───── */}
      <section className="relative z-10 py-[120px] pb-[100px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <span className="section-label block mb-3">[ 量化训练 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-12">FP4 量化感知训练：精度与效率的极致平衡</h2>
          </ScrollReveal>

          {/* 3 Application Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
            {[
              {
                title: 'MoE 专家权重',
                color: '#3D8BFF',
                strategy: 'MXFP4 → FP8 无损反量化',
                effect: '大幅减少 GPU 内存占用',
                insight: 'FP4→FP8 无损，因为 FP8(E4M3) 比 FP4(E2M1) 多 2 个指数位，动态范围更大',
                icon: (
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <rect x="8" y="8" width="48" height="48" rx="8" stroke="#3D8BFF" strokeWidth="2" fill="rgba(61,139,255,0.08)" />
                    <rect x="18" y="24" width="12" height="20" rx="2" fill="#3D8BFF" opacity="0.6" />
                    <rect x="34" y="18" width="12" height="26" rx="2" fill="#3D8BFF" opacity="0.9" />
                  </svg>
                ),
              },
              {
                title: 'CSA Indexer QK 路径',
                color: '#00E5FF',
                strategy: 'QK 激活全程 FP4 缓存/加载/乘',
                effect: '加速长上下文注意力分数计算',
                insight: '',
                icon: (
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <circle cx="32" cy="32" r="24" stroke="#00E5FF" strokeWidth="2" fill="rgba(0,229,255,0.08)" />
                    <circle cx="24" cy="24" r="6" fill="#00E5FF" opacity="0.6" />
                    <circle cx="40" cy="24" r="6" fill="#00E5FF" opacity="0.6" />
                    <circle cx="32" cy="42" r="6" fill="#00E5FF" opacity="0.9" />
                    <line x1="28" y1="28" x2="30" y2="36" stroke="#00E5FF" strokeWidth="1.5" />
                    <line x1="36" y1="28" x2="34" y2="36" stroke="#00E5FF" strokeWidth="1.5" />
                  </svg>
                ),
              },
              {
                title: 'Index Scores',
                color: '#0055FF',
                strategy: 'FP32 → BF16',
                effect: 'Top-k 选择器 2× 加速，99.7% recall',
                insight: '',
                icon: (
                  <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                    <rect x="8" y="20" width="48" height="32" rx="6" stroke="#0055FF" strokeWidth="2" fill="rgba(0,85,255,0.08)" />
                    <line x1="16" y1="36" x2="48" y2="36" stroke="#0055FF" strokeWidth="2" strokeLinecap="round" />
                    <line x1="20" y1="32" x2="20" y2="44" stroke="#0055FF" strokeWidth="2" strokeLinecap="round" />
                    <line x1="32" y1="28" x2="32" y2="44" stroke="#0055FF" strokeWidth="2" strokeLinecap="round" />
                    <line x1="44" y1="30" x2="44" y2="44" stroke="#0055FF" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ),
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.12, ease: 'easeOut' }}
                className="liquid-glass liquid-glass-hover rounded-xl p-8 relative overflow-hidden flex flex-col"
                style={{ borderTop: `4px solid ${card.color}` }}
              >
                <div className="mb-4">{card.icon}</div>
                <h3 className="font-heading text-[24px] font-semibold text-white mb-3">{card.title}</h3>
                <div className="font-mono text-[16px] text-[#00E5FF] mb-2">{card.strategy}</div>
                <p className="text-[15px] text-[#8B9EB0] mb-4 flex-1">{card.effect}</p>
                {card.insight && (
                  <div className="rounded-lg p-4 mt-auto" style={{ background: 'rgba(61,139,255,0.08)', borderLeft: '3px solid #3D8BFF' }}>
                    <p className="text-[13px] text-[#8B9EB0]">{card.insight}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Formula Comparison */}
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">
              <div className="liquid-glass rounded-xl p-8 text-center">
                <div className="font-mono text-[28px] text-[#00E5FF] mb-2">E2M1</div>
                <p className="text-[14px] text-[#8B9EB0]">2 个指数位，1 个尾数位</p>
                <div className="flex items-center justify-center gap-1 mt-3">
                  <span className="px-2 py-1 rounded bg-[rgba(0,229,255,0.1)] text-[12px] text-[#00E5FF] font-mono">S</span>
                  <span className="px-2 py-1 rounded bg-[rgba(0,229,255,0.1)] text-[12px] text-[#00E5FF] font-mono">E1</span>
                  <span className="px-2 py-1 rounded bg-[rgba(0,229,255,0.1)] text-[12px] text-[#00E5FF] font-mono">E2</span>
                  <span className="px-2 py-1 rounded bg-[rgba(0,229,255,0.1)] text-[12px] text-[#00E5FF] font-mono">M1</span>
                </div>
              </div>

              <div className="text-center">
                <div className="text-[24px] text-[#00E5FF] mb-2">→</div>
                <h3 className="font-heading text-[20px] font-semibold text-[#00E5FF]">动态范围更大</h3>
                <p className="text-[14px] text-[#8B9EB0]">无损反量化</p>
                <p className="text-[13px] text-[#8B9EB0] mt-2">整个 QAT 流程完全复用现有 FP8 训练框架</p>
              </div>

              <div className="liquid-glass rounded-xl p-8 text-center">
                <div className="font-mono text-[28px] text-[#3D8BFF] mb-2">E4M3</div>
                <p className="text-[14px] text-[#8B9EB0]">4 个指数位，3 个尾数位</p>
                <div className="flex items-center justify-center gap-1 mt-3">
                  <span className="px-2 py-1 rounded bg-[rgba(61,139,255,0.1)] text-[12px] text-[#3D8BFF] font-mono">S</span>
                  {Array.from({ length: 4 }).map((_, j) => (
                    <span key={j} className="px-2 py-1 rounded bg-[rgba(61,139,255,0.1)] text-[12px] text-[#3D8BFF] font-mono">E{j + 1}</span>
                  ))}
                  {Array.from({ length: 3 }).map((_, j) => (
                    <span key={j} className="px-2 py-1 rounded bg-[rgba(61,139,255,0.1)] text-[12px] text-[#3D8BFF] font-mono">M{j + 1}</span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ───── KV Cache Management ───── */}
      <section className="relative z-10 py-[120px] pb-[120px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <span className="section-label block mb-3">[ 推理框架 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-12">异构 KV Cache 布局与存储策略</h2>
          </ScrollReveal>

          {/* Tab Nav */}
          <ScrollReveal delay={0.1}>
            <div className="flex gap-2 mb-8">
              <button
                onClick={() => setKvTab('memory')}
                className={`px-6 py-3 rounded-lg text-[14px] font-medium transition-all duration-200 ${
                  kvTab === 'memory'
                    ? 'bg-[rgba(61,139,255,0.15)] text-white border border-[rgba(61,139,255,0.3)]'
                    : 'text-[#8B9EB0] hover:text-white border border-transparent'
                }`}
              >
                内存布局
              </button>
              <button
                onClick={() => setKvTab('disk')}
                className={`px-6 py-3 rounded-lg text-[14px] font-medium transition-all duration-200 ${
                  kvTab === 'disk'
                    ? 'bg-[rgba(61,139,255,0.15)] text-white border border-[rgba(61,139,255,0.3)]'
                    : 'text-[#8B9EB0] hover:text-white border border-transparent'
                }`}
              >
                磁盘存储策略
              </button>
            </div>
          </ScrollReveal>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {kvTab === 'memory' && (
              <motion.div
                key="memory"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
              >
                <div className="liquid-glass rounded-xl p-8">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#3D8BFF] rounded-t-xl" />
                  <h3 className="font-heading text-[24px] font-semibold text-white mb-4">经典 KV Cache (CSA/HCA)</h3>
                  <p className="text-[17px] text-white mb-4">按请求分配多个 block</p>
                  <div className="font-mono text-[16px] text-[#00E5FF] mb-2">block_size = lcm(4, 128) = 128 tokens</div>
                  <p className="text-[14px] text-[#8B9EB0]">每 block 覆盖 lcm(m, m') 个原始 token</p>
                </div>
                <div className="liquid-glass rounded-xl p-8">
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#00E5FF] rounded-t-xl" />
                  <h3 className="font-heading text-[24px] font-semibold text-white mb-4">State Cache (SWA + 未压缩尾部)</h3>
                  <p className="text-[17px] text-white mb-4">预分配固定大小池</p>
                  <p className="text-[16px] text-[#00E5FF] mb-2">动态分配给各序列</p>
                  <p className="text-[14px] text-[#8B9EB0]">滑动窗口注意力 + 未压缩尾部 token 的统一管理</p>
                </div>
              </motion.div>
            )}
            {kvTab === 'disk' && (
              <motion.div
                key="disk"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {[
                  { title: '完整 SWA 缓存', color: '#FFFFFF', feature: '存储完整 SWA KV，计算零冗余', scene: '对存储效率要求不高的场景' },
                  { title: '周期性检查点', color: '#3D8BFF', feature: '每 p 个 token 检查点一次，可调存储-计算权衡', scene: '通用场景' },
                  { title: '零 SWA 缓存', color: '#00E5FF', feature: '不存储 SWA，利用 CSA/HCA 缓存重算最后 n_win·L 个 token', scene: '存储敏感场景' },
                ].map((card, i) => (
                  <div key={i} className="liquid-glass liquid-glass-hover rounded-xl p-6 h-[260px]" style={{ borderTop: `3px solid ${card.color}` }}>
                    <h4 className="font-heading text-[20px] font-semibold text-white mb-4">{card.title}</h4>
                    <p className="text-[15px] text-white mb-3">{card.feature}</p>
                    <p className="text-[13px] text-[#8B9EB0]">适用：{card.scene}</p>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ───── Data Building & Training ───── */}
      <section className="relative z-10 py-[120px] pb-[100px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <span className="section-label block mb-3">[ 训练工程 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-12">32T Token 的数据炼金术</h2>
          </ScrollReveal>

          {/* Flow Nodes */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-col lg:flex-row items-center gap-4 mb-16">
              {[
                { num: '01', title: '源采集', desc: '数学、代码、网页、长文档、多语言' },
                { num: '02', title: '质量过滤', desc: '移除批量生成内容，缓解模型崩溃' },
                { num: '03', title: '领域增强', desc: '中期训练加入 agentic 数据' },
                { num: '04', title: '长文档筛选', desc: '科学论文、技术报告等高学术价值' },
                { num: '05', title: 'Token 化', desc: '128K 词表（V3 tokenizer + 特殊 token）' },
              ].map((node, i) => (
                <div key={i} className="flex items-center gap-4">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
                    className="liquid-glass rounded-xl p-5 w-[200px] h-[140px] flex flex-col items-center text-center"
                  >
                    <div className="w-8 h-8 rounded-full border border-[#00E5FF] flex items-center justify-center text-[12px] text-[#00E5FF] font-mono mb-2">
                      {node.num}
                    </div>
                    <h4 className="font-heading text-[16px] font-semibold text-white mb-1">{node.title}</h4>
                    <p className="text-[12px] text-[#8B9EB0] leading-snug">{node.desc}</p>
                  </motion.div>
                  {i < 4 && (
                    <svg width="40" height="20" className="hidden lg:block flex-shrink-0">
                      <line x1="0" y1="10" x2="35" y2="10" stroke="#00E5FF" strokeWidth="1" strokeDasharray="4 2">
                        <animate attributeName="stroke-dashoffset" from="6" to="0" dur="3s" repeatCount="indefinite" />
                      </line>
                      <polygon points="35,10 30,7 30,13" fill="#00E5FF" />
                    </svg>
                  )}
                  {i < 4 && <div className="lg:hidden h-6 w-[1px] bg-[#00E5FF] opacity-50" />}
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Training Setup Comparison */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <ScrollReveal delay={0}>
              <div className="liquid-glass rounded-xl p-8" style={{ borderTop: '3px solid #00E5FF' }}>
                <h3 className="font-heading text-[24px] font-semibold text-white mb-6">V4-Flash 训练配置</h3>
                <ul className="space-y-3 font-mono text-[14px]">
                  <li className="flex justify-between"><span className="text-[#8B9EB0]">训练 Token</span> <span className="text-white">32T</span></li>
                  <li className="flex justify-between"><span className="text-[#8B9EB0]">最大 Batch Size</span> <span className="text-white">75.5M tokens</span></li>
                  <li className="flex justify-between"><span className="text-[#8B9EB0]">峰值 LR</span> <span className="text-white">2.7×10⁻⁴</span></li>
                  <li className="flex justify-between"><span className="text-[#8B9EB0]">结束 LR</span> <span className="text-white">2.7×10⁻⁵（cosine）</span></li>
                  <li className="flex justify-between"><span className="text-[#8B9EB0]">序列长度扩展</span> <span className="text-white">4K → 16K → 64K → 1M</span></li>
                  <li className="flex justify-between"><span className="text-[#8B9EB0]">密集注意力 warmup</span> <span className="text-white">前 1T tokens</span></li>
                  <li className="flex justify-between"><span className="text-[#8B9EB0]">稀疏注意力引入</span> <span className="text-white">64K 序列长度时</span></li>
                  <li className="flex justify-between"><span className="text-[#8B9EB0]">MTP loss 权重</span> <span className="text-white">0.3（大部分时间）</span></li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="liquid-glass rounded-xl p-8" style={{ borderTop: '3px solid #3D8BFF' }}>
                <h3 className="font-heading text-[24px] font-semibold text-white mb-6">V4-Pro 训练配置</h3>
                <ul className="space-y-3 font-mono text-[14px]">
                  <li className="flex justify-between"><span className="text-[#8B9EB0]">训练 Token</span> <span className="text-white">33T</span></li>
                  <li className="flex justify-between"><span className="text-[#8B9EB0]">最大 Batch Size</span> <span className="text-white">94.4M tokens</span></li>
                  <li className="flex justify-between"><span className="text-[#8B9EB0]">峰值 LR</span> <span className="text-white">2.0×10⁻⁴</span></li>
                  <li className="flex justify-between"><span className="text-[#8B9EB0]">结束 LR</span> <span className="text-white">2.0×10⁻⁵（cosine）</span></li>
                  <li className="flex justify-between"><span className="text-[#8B9EB0]">密集注意力 warmup</span> <span className="text-white">比 Flash 更长</span></li>
                  <li className="flex justify-between"><span className="text-[#8B9EB0]">其他配置</span> <span className="text-white">与 Flash 一致</span></li>
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Training Stability */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScrollReveal delay={0}>
              <div className="liquid-glass rounded-xl p-8">
                <h3 className="font-heading text-[24px] font-semibold text-[#00E5FF] mb-4">预见式路由</h3>
                <p className="text-[17px] text-white mb-4">解耦骨干网络和路由网络的同步更新</p>
                <div className="liquid-glass rounded-lg p-4 mb-4 border-l-[3px] border-l-[#00E5FF]">
                  <code className="font-mono text-[14px] text-white">
                    步骤 t 使用 θ<sub>t</sub> 计算特征，路由索引使用 θ<sub>t-Δt</sub>
                  </code>
                </div>
                <ul className="space-y-2 text-[14px] text-[#8B9EB0]">
                  <li>• 额外 wall-time 开销：约 20%</li>
                  <li>• 动态触发：自动检测 loss spike → 短回滚 → 激活预见式路由</li>
                  <li>• 总体效果：避免 loss spike，总体额外开销可忽略</li>
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="liquid-glass rounded-xl p-8">
                <h3 className="font-heading text-[24px] font-semibold text-[#00E5FF] mb-4">SwiGLU 钳位</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="liquid-glass rounded-lg p-4 text-center">
                    <div className="text-[12px] text-[#8B9EB0] mb-1">线性部分</div>
                    <div className="font-mono text-[18px] text-white">[-10, 10]</div>
                  </div>
                  <div className="liquid-glass rounded-lg p-4 text-center">
                    <div className="text-[12px] text-[#8B9EB0] mb-1">门控部分上限</div>
                    <div className="font-mono text-[18px] text-white">10</div>
                  </div>
                </div>
                <p className="text-[15px] text-[#8B9EB0]">
                  有效消除异常值，大幅稳定训练过程，不损害性能
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ───── Post-Training Distillation ───── */}
      <section className="relative z-10 py-[120px] pb-[160px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <span className="section-label block mb-3">[ 后训练 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-12">从专家到统一模型：两阶段蒸馏</h2>
          </ScrollReveal>

          {/* Distillation Flow Chart */}
          <ScrollReveal delay={0.1} className="mb-12">
            <div className="liquid-glass rounded-xl p-8">
              <DistillationFlowSVG />
            </div>
          </ScrollReveal>

          {/* Key Formula */}
          <ScrollReveal delay={0.1} className="mb-12">
            <div className="liquid-glass rounded-xl p-8 border-l-[3px] border-l-[#00E5FF]">
              <code className="font-mono text-[20px] text-white block mb-4">
                L<sub className="text-[#8B9EB0]">OPD</sub>(<span className="text-[#00E5FF]">θ</span>) = Σ w<sub className="text-[#8B9EB0]">i</sub> · D<sub className="text-[#00E5FF]">KL</sub>(<span className="text-[#3D8BFF]">π</span><sub className="text-[#00E5FF]">θ</sub> ‖ <span className="text-[#3D8BFF]">π</span><sub className="text-[#8B9EB0]">Ei</sub>)
              </code>
              <p className="text-[17px] text-[#8B9EB0]">
                学生模型（统一模型）从教师模型的输出分布学习，优化 reverse KL loss
              </p>
            </div>
          </ScrollReveal>

          {/* Reasoning Mode Matrix */}
          <ScrollReveal delay={0.1} className="mb-8">
            <h3 className="font-heading text-[24px] font-semibold text-white mb-6">三种推理模式，适配不同认知负载</h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
            {[
              {
                title: 'Non-think',
                color: '#FFFFFF',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 4L20 14H30L22 21L25 31L16 24L7 31L10 21L2 14H12L16 4Z" stroke="white" strokeWidth="2" fill="none" />
                  </svg>
                ),
                ctx: '8K',
                output: '短',
                format: '` ` 总结',
                scene: '日常任务、紧急反应',
                example: '快速回答：巴黎是法国的首都，位于塞纳河畔。',
              },
              {
                title: 'Think (High)',
                color: '#3D8BFF',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <circle cx="16" cy="16" r="12" stroke="#3D8BFF" strokeWidth="2" fill="none" />
                    <circle cx="16" cy="13" r="4" fill="#3D8BFF" opacity="0.6" />
                    <path d="M10 22C10 18 12 16 16 16C20 16 22 18 22 22" stroke="#3D8BFF" strokeWidth="2" fill="none" />
                  </svg>
                ),
                ctx: '128K',
                output: '中等',
                format: '` ` 思考 tokens + 总结',
                scene: '复杂问题求解、规划',
                example: '思考：我们需要考虑三个因素... 总结：因此最优方案是 A。',
              },
              {
                title: 'Think Max',
                color: '#00E5FF',
                icon: (
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 2L20 12H30L22 18L25 28L16 22L7 28L10 18L2 12H12L16 2Z" stroke="#00E5FF" strokeWidth="2" fill="none" />
                    <circle cx="16" cy="16" r="6" stroke="#00E5FF" strokeWidth="1.5" fill="none" />
                  </svg>
                ),
                ctx: '384K',
                output: '长',
                format: '特殊系统提示 + 思考 tokens + 总结',
                scene: '探索模型推理边界',
                example: '系统：深度思考模式已激活。思考：从第一性原理出发...',
              },
            ].map((mode, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.12, ease: 'easeOut' }}
                className="liquid-glass liquid-glass-hover rounded-xl p-6 relative overflow-hidden"
                style={{ borderTop: `3px solid ${mode.color}`, height: '300px' }}
                onMouseEnter={() => setHoveredMode(i)}
                onMouseLeave={() => setHoveredMode(null)}
              >
                <div className="flex items-center gap-3 mb-4">
                  {mode.icon}
                  <h4 className="font-heading text-[22px] font-semibold text-white">{mode.title}</h4>
                </div>
                <div className="space-y-2 text-[14px] text-[#8B9EB0]">
                  <div><span className="text-white">上下文窗口：</span>{mode.ctx}</div>
                  <div><span className="text-white">典型输出：</span>{mode.output}</div>
                  <div><span className="text-white">响应格式：</span>{mode.format}</div>
                  <div><span className="text-white">适用：</span>{mode.scene}</div>
                </div>

                {/* Hover bubble */}
                <AnimatePresence>
                  {hoveredMode === i && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-4 left-4 right-4 rounded-lg p-3"
                      style={{ background: 'rgba(10,22,40,0.9)', border: '1px solid #00E5FF' }}
                    >
                      <p className="text-[12px] text-[#8B9EB0]">{mode.example}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Key Post-Training Technologies */}
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Generative Reward Model (GRM)', desc: '摒弃传统标量奖励模型，使用生成式奖励模型评估策略轨迹；GRM 本身参与 RL 优化，actor 网络即 GRM' },
                { title: 'Interleaved Thinking', desc: '工具调用场景中保留完整推理历史；一般对话场景中到达新用户消息时丢弃旧推理' },
                { title: 'Quick Instruction', desc: '专用特殊 token 序列附加到输入，直接复用已计算 KV cache 执行辅助任务，避免冗余 prefill' },
                { title: 'Tool-Call Schema', desc: '新 `\\|DSML\\|` token + XML 格式工具调用，有效减少转义失败和工具调用错误' },
              ].map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                  className="liquid-glass liquid-glass-hover rounded-xl p-5"
                  style={{ borderTop: '2px solid #00E5FF' }}
                >
                  <h4 className="font-heading text-[15px] font-semibold text-white mb-2">{tech.title}</h4>
                  <p className="text-[13px] text-[#8B9EB0]">{tech.desc}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          NEW SECTIONS BELOW
          ═══════════════════════════════════════════════════════════ */}

      {/* ─── Section A: Hardware Topology Visualization ─── */}
      <section className="relative z-10 py-[120px] pb-[100px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <span className="section-label block mb-3">[ 硬件拓扑 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-3">384 GPU 训练集群拓扑</h2>
            <p className="text-[17px] text-[#8B9EB0] max-w-[640px] leading-relaxed mb-12">
              训练集群中数据流与专家路由的实时可视化——计算、通信、路由三类节点协同工作
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="liquid-glass rounded-xl p-6 lg:p-10">
              <HardwareTopologySVG />
            </div>
          </ScrollReveal>

          {/* Flow Legend */}
          <ScrollReveal delay={0.2} className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { color: '#FF6B6B', label: 'CPU → GPU', desc: '数据加载与预处理', icon: <Download size={14} /> },
                { color: '#00E5FF', label: '专家路由', desc: 'All-to-all 通信决策', icon: <Radio size={14} /> },
                { color: '#9B59B6', label: '梯度同步', desc: 'All-gather / All-reduce', icon: <Upload size={14} /> },
                { color: '#4ECDC4', label: 'KV Cache', desc: '缓存迁移与复用', icon: <Server size={14} /> },
              ].map((flow, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="liquid-glass rounded-lg p-4 flex items-start gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${flow.color}15`, border: `1px solid ${flow.color}30`, color: flow.color }}
                  >
                    {flow.icon}
                  </div>
                  <div>
                    <div className="text-[14px] text-white font-medium">{flow.label}</div>
                    <div className="text-[12px] text-[#8B9EB0]">{flow.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Section B: Parallel Strategy Comparison Table ─── */}
      <section className="relative z-10 py-[120px] pb-[100px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <span className="section-label block mb-3">[ 并行策略 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-3">五维并行策略对比</h2>
            <p className="text-[17px] text-[#8B9EB0] max-w-[640px] leading-relaxed mb-12">
              从数据到序列，V4 在不同层级实施精细化并行拆分，最大化硬件利用率
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="liquid-glass rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[700px]">
                  <thead>
                    <tr className="bg-[rgba(61,139,255,0.15)]">
                      <th className="text-left px-5 py-4 text-[13px] font-medium text-white tracking-wide sticky left-0 bg-[rgba(61,139,255,0.15)] z-10">并行策略</th>
                      <th className="text-center px-4 py-4 text-[13px] font-medium text-white tracking-wide">应用层级</th>
                      <th className="text-left px-4 py-4 text-[13px] font-medium text-white tracking-wide">效果</th>
                      <th className="text-left px-4 py-4 text-[13px] font-medium text-white tracking-wide">V4 实现</th>
                    </tr>
                  </thead>
                  <tbody>
                    {parallelStrategies.map((row, i) => {
                      const isOdd = i % 2 === 0;
                      const rowBg = isOdd ? '#0A1628' : '#0D1B2E';
                      return (
                        <motion.tr
                          key={row.strategy}
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.08, duration: 0.4 }}
                          className="group transition-colors hover:bg-[rgba(61,139,255,0.06)]"
                          style={{ background: rowBg }}
                        >
                          <td className="px-5 py-4 text-[13px] text-white font-medium sticky left-0 z-10 group-hover:bg-[rgba(61,139,255,0.06)] transition-colors" style={{ background: 'inherit' }}>
                            <div className="flex items-center gap-2">
                              <span className="text-[#00E5FF]">{row.icon}</span>
                              {row.strategy}
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="text-[12px] font-mono px-2 py-1 rounded bg-[rgba(0,229,255,0.1)] text-[#00E5FF]">
                              {row.level}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-[14px] text-[#8B9EB0]">{row.effect}</td>
                          <td className="px-4 py-4 text-[14px] font-mono text-white">{row.v4impl}</td>
                        </motion.tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─── Section C: Communication Optimization Details ─── */}
      <section className="relative z-10 py-[120px] pb-[160px]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <span className="section-label block mb-3">[ 通信优化 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-3">通信开销精细拆解</h2>
            <p className="text-[17px] text-[#8B9EB0] max-w-[640px] leading-relaxed mb-12">
              从 All-to-all 到 Point-to-point，每一类通信都经过针对性优化，将开销压至极限
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Text details */}
            <ScrollReveal delay={0}>
              <div className="space-y-6">
                {[
                  {
                    title: 'All-to-all 通信量',
                    before: '2.00×',
                    after: '1.92×',
                    desc: '从 2× 到 1.92× 的理论极限优化，通过 wave 级流水线重叠隐藏传输',
                    color: '#3D8BFF',
                  },
                  {
                    title: 'All-gather 开销',
                    before: '100%',
                    after: '10%',
                    desc: '将 90% 的通信开销隐藏在计算过程中，剩余 10% 为不可压缩延迟',
                    color: '#00E5FF',
                  },
                  {
                    title: 'Point-to-point 延迟',
                    before: '100%',
                    after: '70%',
                    desc: 'Pull-based 通信原语减少 30% 延迟，receiver 按需拉取替代 broadcast',
                    color: '#4ECDC4',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.12 }}
                    className="liquid-glass rounded-xl p-6"
                    style={{ borderLeft: `3px solid ${item.color}` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-heading text-[16px] font-semibold text-white">{item.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-mono text-[#FF6B6B]">{item.before}</span>
                        <ArrowLeftRight size={12} className="text-[#8B9EB0]" />
                        <span className="text-[13px] font-mono" style={{ color: item.color }}>{item.after}</span>
                      </div>
                    </div>
                    <p className="text-[14px] text-[#8B9EB0] leading-relaxed">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* Right: Mini bar charts */}
            <ScrollReveal delay={0.15}>
              <div className="liquid-glass rounded-xl p-8">
                <h4 className="font-heading text-[18px] font-semibold text-white mb-6">优化前后对比</h4>
                <div className="space-y-8">
                  <MiniBarChart before={2.0} after={1.92} label="All-to-all 通信量倍数" unit="×" color="#3D8BFF" />
                  <MiniBarChart before={100} after={10} label="All-gather 显式开销" unit="%" color="#00E5FF" />
                  <MiniBarChart before={100} after={70} label="Point-to-point 相对延迟" unit="%" color="#4ECDC4" />
                </div>
                <div className="mt-8 p-4 rounded-lg bg-[rgba(0,229,255,0.03)] border border-[rgba(0,229,255,0.1)]">
                  <p className="text-[13px] text-[#8B9EB0]">
                    <span className="text-[#00E5FF] font-semibold">核心洞察</span>：通信优化的本质不是减少数据量，而是将传输过程与计算过程重叠——让 GPU 在「打仗」的同时「传令」。
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
