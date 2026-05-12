import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router';
import {
  Database,
  Filter,
  Sparkles,
  FileText,
  Hash,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Cpu,
  Layers,
  GitBranch,
  Timer,
  BookOpen,
  School,
  PenTool,
  Library,
  Glasses,
  Maximize,
  Expand,
  Scan,
  Radar,
  ShieldAlert,
  Plane,
  Navigation,
  Users,
  PersonStanding,
  Award,
  Activity,
  
  
} from 'lucide-react';

import { cn } from '@/lib/utils';

/* ─────────── scroll-reveal helpers ─────────── */
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true, amount: 0.15 },
  transition: { staggerChildren: 0.1 },
};

const staggerChild = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

/* ─────────── Data: Base Model Evaluation (25 rows) ─────────── */
const baseModelData = [
  { benchmark: 'AGIEval (EM)', shots: '0-shot', v32: 80.1, flash: 82.6, pro: 83.1 },
  { benchmark: 'MMLU (EM)', shots: '5-shot', v32: 87.8, flash: 88.7, pro: 90.1 },
  { benchmark: 'MMLU-Redux (EM)', shots: '5-shot', v32: 87.5, flash: 89.4, pro: 90.8 },
  { benchmark: 'MMLU-Pro (EM)', shots: '5-shot', v32: 65.5, flash: 68.3, pro: 73.5 },
  { benchmark: 'MMMLU (EM)', shots: '5-shot', v32: 87.9, flash: 88.8, pro: 90.3 },
  { benchmark: 'C-Eval (EM)', shots: '5-shot', v32: 90.4, flash: 92.1, pro: 93.1 },
  { benchmark: 'CMMLU (EM)', shots: '5-shot', v32: 88.9, flash: 90.4, pro: 90.8 },
  { benchmark: 'MultiLoKo (EM)', shots: '5-shot', v32: 38.7, flash: 42.2, pro: 51.1 },
  { benchmark: 'Simple-QA verified (EM)', shots: '25-shot', v32: 28.3, flash: 30.1, pro: 55.2 },
  { benchmark: 'SuperGPQA (EM)', shots: '5-shot', v32: 45.0, flash: 46.5, pro: 53.9 },
  { benchmark: 'FACTS Parametric (EM)', shots: '25-shot', v32: 27.1, flash: 33.9, pro: 62.6 },
  { benchmark: 'TriviaQA (EM)', shots: '5-shot', v32: 83.3, flash: 82.8, pro: 85.6 },
  { benchmark: 'BBH (EM)', shots: '3-shot', v32: 87.6, flash: 86.9, pro: 87.5 },
  { benchmark: 'DROP (F1)', shots: '1-shot', v32: 88.2, flash: 88.6, pro: 88.7 },
  { benchmark: 'HellaSwag (EM)', shots: '0-shot', v32: 86.4, flash: 85.7, pro: 88.0 },
  { benchmark: 'WinoGrande (EM)', shots: '0-shot', v32: 78.9, flash: 79.5, pro: 81.5 },
  { benchmark: 'CLUEWSC (EM)', shots: '5-shot', v32: 83.5, flash: 82.2, pro: 85.2 },
  { benchmark: 'BigCodeBench (Pass@1)', shots: '3-shot', v32: 63.9, flash: 56.8, pro: 59.2 },
  { benchmark: 'HumanEval (Pass@1)', shots: '0-shot', v32: 62.8, flash: 69.5, pro: 76.8 },
  { benchmark: 'GSM8K (EM)', shots: '8-shot', v32: 91.1, flash: 90.8, pro: 92.6 },
  { benchmark: 'MATH (EM)', shots: '4-shot', v32: 60.5, flash: 57.4, pro: 64.5 },
  { benchmark: 'MGSM (EM)', shots: '8-shot', v32: 81.3, flash: 85.7, pro: 84.4 },
  { benchmark: 'CMath (EM)', shots: '3-shot', v32: 92.6, flash: 93.6, pro: 90.9 },
  { benchmark: 'LongBench-V2 (EM)', shots: '1-shot', v32: 40.2, flash: 44.7, pro: 51.5 },
];

/* ─────────── Data: Training Hyperparameters ─────────── */
const hyperparameterData = [
  { param: '训练 Token', flash: '32T', pro: '33T' },
  { param: '最大 Batch Size', flash: '75.5M', pro: '94.4M' },
  { param: '峰值学习率', flash: '2.7×10⁻⁴', pro: '2.0×10⁻⁴' },
  { param: '结束学习率', flash: '2.7×10⁻⁵', pro: '2.0×10⁻⁵' },
  { param: '序列长度扩展', flash: '4K → 16K → 64K → 1M', pro: '4K → 16K → 64K → 1M' },
  { param: '密集注意力 Warmup', flash: '前 1T tokens', pro: '比 Flash 更长' },
  { param: '稀疏注意力引入', flash: '64K 序列长度时', pro: '64K 序列长度时' },
  { param: '负载平衡偏置更新', flash: '0.001', pro: '0.001' },
  { param: '平衡 Loss 权重', flash: '0.0001', pro: '0.0001' },
  { param: 'MTP Loss 权重', flash: '0.3 → 0.1', pro: '0.3 → 0.1' },
  { param: 'AdamW β₁ / β₂', flash: '0.9 / 0.95', pro: '0.9 / 0.95' },
  { param: 'Muon 动量', flash: '0.95', pro: '0.95' },
  { param: 'Muon 权重衰减', flash: '0.1', pro: '0.1' },
];

/* ─────────── Data: Training Timeline Phases ─────────── */
const timelinePhases = [
  { phase: 1, tokens: '0-4T', duration: '2周', milestone: 'Dense Attention Warmup', percent: 12.5, context: '4K' },
  { phase: 2, tokens: '4T-8T', duration: '2周', milestone: '4K context, stable training', percent: 25, context: '4K' },
  { phase: 3, tokens: '8T-16T', duration: '3周', milestone: 'Extend to 16K context', percent: 50, context: '16K' },
  { phase: 4, tokens: '16T-24T', duration: '3周', milestone: 'Extend to 64K, introduce CSA/HCA', percent: 75, context: '64K' },
  { phase: 5, tokens: '24T-32T', duration: '4周', milestone: 'Extend to 1M, Muon optimizer active', percent: 100, context: '1M' },
];

/* ─────────── Data: Data Mix ─────────── */
const dataMix = [
  { source: 'Web pages', tokens: '12.8T', percent: 40, color: '#3D8BFF' },
  { source: 'Code', tokens: '6.4T', percent: 20, color: '#00E5FF' },
  { source: 'Math/Science', tokens: '3.2T', percent: 10, color: '#ffb84d' },
  { source: 'Multi-language', tokens: '4.8T', percent: 15, color: '#FF6B6B' },
  { source: 'Long documents', tokens: '3.2T', percent: 10, color: '#4ECDC4' },
  { source: 'Agent/tool', tokens: '1.6T', percent: 5, color: '#95E1D3' },
];
interface PipelineNodeProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  index: number;
  isLast?: boolean;
}

function PipelineNode({ icon, title, desc, index, isLast = false }: PipelineNodeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div className="relative flex flex-col items-center text-center">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{
          duration: 0.6,
          delay: index * 0.12,
          ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
        }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="liquid-glass liquid-glass-hover w-[140px] h-[140px] rounded-2xl flex items-center justify-center mb-4">
          <div className="text-[#00E5FF]">{icon}</div>
        </div>
        <div className="data-tag mb-2">阶段 {index + 1}</div>
        <h3 className="font-heading text-[20px] font-semibold text-white mb-1">{title}</h3>
        <p className="text-[14px] text-[#8B9EB0] max-w-[200px] leading-relaxed">{desc}</p>
      </motion.div>

      {!isLast && (
        <>
          {/* Desktop horizontal connector */}
          <div className="hidden lg:block absolute top-[70px] left-[calc(50%+80px)] w-[calc(100%-160px)] h-[1px]">
            <svg width="100%" height="2" className="overflow-visible">
              <line
                x1="0"
                y1="1"
                x2="100%"
                y2="1"
                stroke="#00E5FF"
                strokeWidth="1"
                strokeDasharray="6 4"
                opacity="0.4"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-20"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </line>
            </svg>
          </div>
          {/* Mobile vertical connector */}
          <div className="lg:hidden absolute top-[150px] left-1/2 -translate-x-1/2 w-[1px] h-[40px]">
            <svg width="2" height="40" className="overflow-visible">
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="40"
                stroke="#00E5FF"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.4"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-16"
                  dur="1s"
                  repeatCount="indefinite"
                />
              </line>
            </svg>
          </div>
        </>
      )}
    </div>
  );
}

/* ─────────── Comparison Row ─────────── */
function CompareRow({ label, flash, pro }: { label: string; flash: string; pro: string }) {
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr] gap-4 py-3 border-b border-[rgba(255,255,255,0.05)]">
      <span className="text-[14px] text-[#8B9EB0] font-body flex items-center">{label}</span>
      <span className="text-[15px] text-white font-mono">{flash}</span>
      <span className="text-[15px] text-white font-mono">{pro}</span>
    </div>
  );
}

/* ─────────── Timeline Node ─────────── */
function TimelineNode({ phase, index }: { phase: typeof timelinePhases[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const isLast = index === timelinePhases.length - 1;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      }}
      className="relative flex gap-6"
    >
      {/* Left: Phase indicator */}
      <div className="relative flex flex-col items-center flex-shrink-0">
        <div
          className={cn(
            'w-14 h-14 rounded-full flex items-center justify-center text-[20px] font-bold font-mono border-2 relative z-10',
            isLast
              ? 'bg-[#00E5FF] text-[#050B14] border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.5)]'
              : 'bg-[#0A1628] text-[#00E5FF] border-[#00E5FF]'
          )}
        >
          {phase.phase}
          {isLast && (
            <span className="absolute inset-0 rounded-full bg-[#00E5FF] animate-ping opacity-20" />
          )}
        </div>
        {!isLast && (
          <div className="w-[2px] flex-1 bg-gradient-to-b from-[#00E5FF] to-[rgba(0,229,255,0.1)] mt-2" />
        )}
      </div>

      {/* Right: Content card */}
      <div className={cn(
        'flex-1 liquid-glass rounded-xl p-5 mb-6',
        isLast && 'border border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.1)]'
      )}>
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="text-[14px] font-mono text-[#00E5FF]">{phase.tokens}</span>
          <span className="text-[12px] text-[#8B9EB0]">•</span>
          <span className="text-[13px] text-[#8B9EB0]">{phase.duration}</span>
          <span className="text-[12px] text-[#8B9EB0]">•</span>
          <span className="text-[13px] font-mono text-[#3D8BFF]">{phase.context}</span>
        </div>
        <h4 className="font-heading text-[16px] font-semibold text-white mb-2">{phase.milestone}</h4>

        {/* Mini progress bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-[#8B9EB0]">训练进度</span>
            <span className="text-[12px] font-mono text-[#00E5FF]">{phase.percent}%</span>
          </div>
          <div className="h-[6px] rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${phase.percent}%` } : {}}
              transition={{ duration: 1, delay: index * 0.15 + 0.3, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-[#3D8BFF] to-[#00E5FF]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────── Donut Chart ─────────── */
function DonutChart() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);

  const size = 280;
  const strokeWidth = 36;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let cumulativePercent = 0;

  return (
    <div ref={ref} className="flex flex-col lg:flex-row items-center gap-10">
      <div className="relative flex-shrink-0">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
          {/* Background ring */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />
          {dataMix.map((item, i) => {
            const sliceCircumference = (item.percent / 100) * circumference;
            const offset = -(cumulativePercent / 100) * circumference;
            cumulativePercent += item.percent;
            return (
              <motion.circle
                key={item.source}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={hoveredSlice === i ? strokeWidth + 6 : strokeWidth}
                strokeDasharray={`${sliceCircumference} ${circumference - sliceCircumference}`}
                strokeDashoffset={offset}
                strokeLinecap="round"
                initial={{ strokeDasharray: `0 ${circumference}` }}
                animate={isInView ? {
                  strokeDasharray: `${sliceCircumference} ${circumference - sliceCircumference}`
                } : {}}
                transition={{ duration: 1.2, delay: i * 0.15, ease: 'easeOut' }}
                onMouseEnter={() => setHoveredSlice(i)}
                onMouseLeave={() => setHoveredSlice(null)}
                style={{ cursor: 'pointer', transition: 'stroke-width 0.2s ease' }}
              />
            );
          })}
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-[32px] font-bold font-mono text-white"
          >
            32T
          </motion.span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-[13px] text-[#8B9EB0]"
          >
            总训练数据
          </motion.span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex-1 space-y-3 w-full max-w-[360px]">
        {dataMix.map((item, i) => (
          <motion.div
            key={item.source}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
            className={cn(
              'flex items-center gap-3 p-2 rounded-lg transition-all duration-200',
              hoveredSlice === i ? 'bg-[rgba(255,255,255,0.05)]' : ''
            )}
            onMouseEnter={() => setHoveredSlice(i)}
            onMouseLeave={() => setHoveredSlice(null)}
          >
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ background: item.color }}
            />
            <span className="text-[14px] text-white flex-1">{item.source}</span>
            <span className="text-[13px] font-mono text-[#8B9EB0]">{item.tokens}</span>
            <span className="text-[14px] font-mono text-[#00E5FF] w-[40px] text-right">{item.percent}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ─────────── Stability Monitor ─────────── */
function StabilityMonitor() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  // Mock loss curve data points
  const normalPoints = [
    80, 72, 65, 58, 52, 47, 43, 39, 36, 33, 30, 28, 26, 24, 22, 20, 19, 18, 17, 16,
    15.5, 15, 14.5, 14, 13.8, 13.5, 13.2, 13, 12.8, 12.5
  ];

  const spikePoints = [...normalPoints.slice(0, 20), 45, 38, 30, 25, 22, 20, 18, 16, 14, 13];

  const preventionPoints = [...normalPoints.slice(0, 20), 20, 19, 18, 17, 16, 15.5, 15, 14.5, 14, 13.5];

  const svgWidth = 600;
  const svgHeight = 200;
  const padding = 20;
  const chartWidth = svgWidth - padding * 2;
  const chartHeight = svgHeight - padding * 2;

  const maxVal = 80;
  const minVal = 10;

  function toSvgY(val: number) {
    return padding + chartHeight - ((val - minVal) / (maxVal - minVal)) * chartHeight;
  }

  function toSvgX(index: number, total: number) {
    return padding + (index / (total - 1)) * chartWidth;
  }

  function makePath(points: number[]) {
    return points
      .map((p, i) => `${i === 0 ? 'M' : 'L'} ${toSvgX(i, points.length)} ${toSvgY(p)}`)
      .join(' ');
  }

  return (
    <div ref={ref} className="liquid-glass rounded-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <Activity size={22} className="text-[#00E5FF]" />
        <h3 className="font-heading text-[20px] font-semibold text-white">训练稳定性监控</h3>
        <span className="ml-auto text-[13px] font-mono text-[#00E5FF] bg-[rgba(0,229,255,0.1)] px-3 py-1 rounded-full">
          Muon + Anticipatory Routing = 零 loss spike
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Normal Training */}
        <div className="rounded-lg p-4 bg-[rgba(0,229,255,0.03)] border border-[rgba(0,229,255,0.1)]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#00E5FF]" />
            <span className="text-[14px] text-white font-medium">正常训练</span>
          </div>
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-[120px]">
            <motion.path
              d={makePath(normalPoints)}
              fill="none"
              stroke="#00E5FF"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, ease: 'easeOut' }}
            />
            <motion.path
              d={makePath(normalPoints) + ` L ${toSvgX(normalPoints.length - 1, normalPoints.length)} ${svgHeight} L ${padding} ${svgHeight} Z`}
              fill="rgba(0,229,255,0.05)"
              stroke="none"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 1.5 }}
            />
          </svg>
          <p className="text-[12px] text-[#8B9EB0] mt-2">平滑下降曲线</p>
        </div>

        {/* Loss Spike */}
        <div className="rounded-lg p-4 bg-[rgba(255,51,51,0.03)] border border-[rgba(255,51,51,0.1)]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#FF3333]" />
            <span className="text-[14px] text-white font-medium">Loss Spike</span>
          </div>
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-[120px]">
            <motion.path
              d={makePath(spikePoints)}
              fill="none"
              stroke="#FF3333"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, ease: 'easeOut', delay: 0.2 }}
            />
            <motion.circle
              cx={toSvgX(20, spikePoints.length)}
              cy={toSvgY(45)}
              r="6"
              fill="#FF3333"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.3, delay: 1.5 }}
            >
              <animate attributeName="r" values="4;8;4" dur="1.5s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
            </motion.circle>
          </svg>
          <p className="text-[12px] text-[#8B9EB0] mt-2">异常跳变（红色脉冲点）</p>
        </div>

        {/* With Prevention */}
        <div className="rounded-lg p-4 bg-[rgba(255,184,77,0.03)] border border-[rgba(255,184,77,0.1)]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-full bg-[#ffb84d]" />
            <span className="text-[14px] text-white font-medium">Anticipatory Routing</span>
          </div>
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-[120px]">
            <motion.path
              d={makePath(normalPoints)}
              fill="none"
              stroke="rgba(0,229,255,0.3)"
              strokeWidth="1"
              strokeDasharray="4 2"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
            <motion.path
              d={makePath(preventionPoints)}
              fill="none"
              stroke="#ffb84d"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="6 3"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, ease: 'easeOut', delay: 0.4 }}
            />
            <motion.path
              d={`M ${toSvgX(19, normalPoints.length)} ${toSvgY(normalPoints[19])} L ${toSvgX(20, spikePoints.length)} ${toSvgY(45)}`}
              fill="none"
              stroke="#FF3333"
              strokeWidth="1"
              strokeDasharray="3 2"
              opacity="0.4"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 0.4 } : {}}
              transition={{ delay: 2 }}
            />
            <text x={toSvgX(22, preventionPoints.length)} y={toSvgY(28)} fill="#ffb84d" fontSize="10" fontFamily="Inter, sans-serif">
              预防线阻断 spike
            </text>
          </svg>
          <p className="text-[12px] text-[#8B9EB0] mt-2">黄色虚线预防 spike 发生</p>
        </div>
      </div>

      {/* Labels */}
      <div className="flex items-center justify-center gap-6 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-[2px] bg-[#00E5FF]" />
          <span className="text-[12px] text-[#8B9EB0]">正常 loss 曲线</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#FF3333]" />
          <span className="text-[12px] text-[#8B9EB0]">spike 触发点</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-[2px] bg-[#ffb84d] border-dashed" style={{ borderTop: '2px dashed #ffb84d', height: 0 }} />
          <span className="text-[12px] text-[#8B9EB0]">预见式路由预防</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Training Page ─────────── */
export default function Training() {
  const pipelineNodes = [
    {
      icon: <Database size={40} strokeWidth={1.5} />,
      title: '源采集',
      desc: '数学、代码、网页、长文档、多语言语料的大规模并行采集',
    },
    {
      icon: <Filter size={40} strokeWidth={1.5} />,
      title: '质量过滤',
      desc: '移除批量生成内容，缓解模型崩溃，确保数据纯净度',
    },
    {
      icon: <Sparkles size={40} strokeWidth={1.5} />,
      title: '领域增强',
      desc: '中期训练加入 agentic 数据，强化工具调用与推理能力',
    },
    {
      icon: <FileText size={40} strokeWidth={1.5} />,
      title: '长文档筛选',
      desc: '科学论文、技术报告等高学术价值材料的精准遴选',
    },
    {
      icon: <Hash size={40} strokeWidth={1.5} />,
      title: 'Token 化',
      desc: '128K 词表基于 V3 tokenizer 扩展，加入特殊任务 token',
    },
  ];

  return (
    <div className="relative min-h-[100dvh] bg-[#050B14]">
      {/* ─── Page Header ─── */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[13px] text-[#8B9EB0] mb-6">
              <Link to="/" className="hover:text-[#00E5FF] transition-colors">
                首页
              </Link>
              <span>/</span>
              <span className="text-[#00E5FF]">训练解析</span>
            </div>

            <h1 className="font-heading text-[48px] font-bold text-white tracking-tight mb-4">
              训练解析
            </h1>
            <p className="text-[#8B9EB0] text-[20px] max-w-[600px] leading-relaxed">
              32T Token 的数据炼金术与训练稳定性工程
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Beginner-Friendly Guide ─── */}
      <section className="relative py-[80px] px-6">
        <div className="max-w-[1280px] mx-auto">
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
              🎓 训练过程小白解读
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: 预训练 = 上学读书 */}
            <motion.div
              className="liquid-glass liquid-glass-hover rounded-[12px] p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[rgba(61,139,255,0.1)] border border-[rgba(61,139,255,0.2)] flex items-center justify-center">
                  <BookOpen size={22} className="text-[#3D8BFF]" />
                </div>
                <h3 className="font-heading text-[20px] font-semibold text-white">预训练 = 上学读书 📚</h3>
              </div>
              <p className="text-[15px] text-[#8B9EB0] leading-relaxed mb-4">
                想象 AI 模型是一个学生：
              </p>
              <ul className="space-y-3 mb-4">
                {[
                  { icon: School, text: '预训练 = 从小学到大学的整个读书过程。AI 读了 32 万亿个 "token"（相当于几百万本书），学习语言、知识、逻辑。' },
                  { icon: PenTool, text: 'Batch Size = 每次考试做多少道题。V4-Flash 一次做 7550 万道，V4-Pro 一次做 9440 万道！' },
                  { icon: Library, text: '学习率 = 每次考试后调整学习方法的幅度。开始时调大步子（2.7×10⁻⁴），后来慢慢小步走（2.7×10⁻⁵）。' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <item.icon size={16} className="text-[#00E5FF] mt-0.5 shrink-0" />
                    <p className="text-[14px] text-[#8B9EB0] leading-relaxed">{item.text}</p>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-[rgba(255,255,255,0.08)]">
                <p className="text-[14px] text-[#8B9EB0]">
                  <span className="text-[#00E5FF] font-semibold">32T tokens</span> 是什么概念？大约等于全人类几千年来写的所有书的总和！
                </p>
              </div>
            </motion.div>

            {/* Card 2: 序列长度扩展 = 记忆力训练 */}
            <motion.div
              className="liquid-glass liquid-glass-hover rounded-[12px] p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.2)] flex items-center justify-center">
                  <Glasses size={22} className="text-[#00E5FF]" />
                </div>
                <h3 className="font-heading text-[20px] font-semibold text-white">序列长度扩展 = 记忆力训练 🧠</h3>
              </div>
              <p className="text-[15px] text-[#8B9EB0] leading-relaxed mb-4">
                人的记忆力有限。AI 也一样，一次能「记住」的文字长度叫「上下文窗口」。
              </p>
              <p className="text-[15px] text-[#8B9EB0] leading-relaxed mb-4">
                DeepSeek-V4 的训练过程就像「记忆力特训」：
              </p>
              <ul className="space-y-3 mb-4">
                {[
                  { icon: Maximize, text: '第一阶段：记 4K token（约 6 页纸）' },
                  { icon: Expand, text: '第二阶段：记 16K token（约 24 页纸）' },
                  { icon: Scan, text: '第三阶段：记 64K token（约 96 页纸）' },
                  { icon: Glasses, text: '最终阶段：记 1M token（约 1500 页纸，一本书！）' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <item.icon size={16} className="text-[#3D8BFF] mt-0.5 shrink-0" />
                    <p className="text-[14px] text-[#8B9EB0] leading-relaxed">{item.text}</p>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-[rgba(255,255,255,0.08)]">
                <p className="text-[14px] text-[#8B9EB0]">
                  每次升级就像换一副更强大的眼镜，能看清更多内容！
                </p>
              </div>
            </motion.div>

            {/* Card 3: Anticipatory Routing = 预防性安全系统 */}
            <motion.div
              className="liquid-glass liquid-glass-hover rounded-[12px] p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[rgba(255,51,51,0.1)] border border-[rgba(255,51,51,0.2)] flex items-center justify-center">
                  <Radar size={22} className="text-[#FF3333]" />
                </div>
                <h3 className="font-heading text-[20px] font-semibold text-white">Anticipatory Routing = 预防性安全系统 🚨</h3>
              </div>
              <p className="text-[15px] text-[#8B9EB0] leading-relaxed mb-4">
                训练大模型时最怕「loss spike」——就像飞机突然遇到强气流，训练过程差点坠毁。
              </p>
              <p className="text-[15px] text-[#8B9EB0] leading-relaxed mb-4">
                <span className="text-white font-semibold">Anticipatory Routing（预见式路由）</span> 就像飞机上的预警雷达：
              </p>
              <ul className="space-y-3 mb-4">
                {[
                  { icon: ShieldAlert, text: '检测到强气流（loss spike 前兆）→ 自动改航线' },
                  { icon: Navigation, text: '使用「老地图」（前几步的模型参数）做路由决策' },
                  { icon: Plane, text: '避免用「正在抖动的方向盘」（当前不稳定参数）决定把数据送给哪个专家' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <item.icon size={16} className="text-[#FF3333] mt-0.5 shrink-0" />
                    <p className="text-[14px] text-[#8B9EB0] leading-relaxed">{item.text}</p>
                  </li>
                ))}
              </ul>
              <div className="pt-3 border-t border-[rgba(255,255,255,0.08)]">
                <p className="text-[14px] text-[#8B9EB0]">
                  额外开销约 <span className="text-[#00E5FF] font-semibold">20%</span>，但总体可以忽略——就像多花 2 分钟安检换来整个航班的安全！
                </p>
              </div>
            </motion.div>

            {/* Card 4: Muon vs AdamW = 新老师 vs 老教师 */}
            <motion.div
              className="liquid-glass liquid-glass-hover rounded-[12px] p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.2)] flex items-center justify-center">
                  <Users size={22} className="text-[#00E5FF]" />
                </div>
                <h3 className="font-heading text-[20px] font-semibold text-white">Muon vs AdamW = 新老师 vs 老教师 👨‍🏫</h3>
              </div>
              <p className="text-[15px] text-[#8B9EB0] leading-relaxed mb-4">
                优化器 = 老师教学生学习的方法。
              </p>
              <ul className="space-y-3 mb-4">
                {[
                  { icon: PersonStanding, text: 'AdamW = 传统教学方法，走一步看一步，经常走弯路。用了几十年，大家都熟悉。' },
                  { icon: TrendingUp, text: 'Muon = 新型教学方法（Kimi K2 也在用），每一步都让学习方向互相垂直——不重复学同一个知识点。' },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <item.icon size={16} className="text-[#3D8BFF] mt-0.5 shrink-0" />
                    <p className="text-[14px] text-[#8B9EB0] leading-relaxed">{item.text}</p>
                  </li>
                ))}
              </ul>
              <div className="p-3 rounded-lg bg-[rgba(0,229,255,0.05)] border border-[rgba(0,229,255,0.15)] mb-4">
                <p className="text-[14px] text-[#00E5FF]">
                  <Award size={14} className="inline mr-1.5 -mt-0.5" />
                  <span className="font-semibold">效果对比</span>：同样的学习时间，Muon 教出的学生成绩好约 2 倍。
                </p>
              </div>
              <div className="pt-3 border-t border-[rgba(255,255,255,0.08)]">
                <p className="text-[14px] text-[#8B9EB0]">
                  DeepSeek-V4 用 <span className="text-[#00E5FF] font-semibold">Muon + AdamW 混合</span>：隐藏层用 Muon，其他部分用 AdamW。取两者之长！
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Data Building Pipeline ─── */}
      <section className="relative py-[80px] px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div className="mb-14" {...fadeInUp}>
            <span className="section-label block mb-3">[ 数据构建流程 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-3">
              32T Token 的数据炼金术
            </h2>
            <p className="text-[17px] text-[#8B9EB0] max-w-[640px] leading-relaxed">
              从原始语料到高质量训练数据，经过五阶段精炼流程，确保每一个 token 都承载最大信息价值
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-16 lg:gap-y-0 lg:gap-6">
            {pipelineNodes.map((node, i) => (
              <PipelineNode
                key={node.title}
                icon={node.icon}
                title={node.title}
                desc={node.desc}
                index={i}
                isLast={i === pipelineNodes.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Training Settings Comparison ─── */}
      <section className="relative py-[80px] px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div className="mb-14" {...fadeInUp}>
            <span className="section-label block mb-3">[ 训练设置对比 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-3">
              V4-Flash 与 V4-Pro 训练配置
            </h2>
            <p className="text-[17px] text-[#8B9EB0] max-w-[640px] leading-relaxed">
              双变体针对不同场景优化训练策略，在规模与效率之间取得精妙平衡
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            {...staggerContainer}
          >
            {/* Flash Card */}
            <motion.div className="liquid-glass rounded-xl overflow-hidden" {...staggerChild}>
              <div className="h-[4px] bg-[#00E5FF]" />
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Zap size={24} className="text-[#00E5FF]" />
                  <h3 className="font-heading text-[24px] font-semibold text-white">V4-Flash</h3>
                  <span className="data-tag ml-auto">高效变体</span>
                </div>
                <div className="space-y-1">
                  <CompareRow label="训练 Token" flash="32T" pro="" />
                  <CompareRow label="最大 Batch Size" flash="75.5M tokens" pro="" />
                  <CompareRow label="峰值 LR" flash="2.7×10⁻⁴" pro="" />
                  <CompareRow label="序列长度扩展" flash="4K → 16K → 64K → 1M" pro="" />
                  <CompareRow label="密集注意力预热" flash="前 1T tokens" pro="" />
                </div>
                <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                  <p className="text-[14px] text-[#8B9EB0]">
                    以更少的激活参数（13B/284B）实现高效推理，适合大规模部署与实时场景
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Pro Card */}
            <motion.div className="liquid-glass rounded-xl overflow-hidden" {...staggerChild}>
              <div className="h-[4px] bg-[#3D8BFF]" />
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Cpu size={24} className="text-[#3D8BFF]" />
                  <h3 className="font-heading text-[24px] font-semibold text-white">V4-Pro</h3>
                  <span className="data-tag ml-auto">旗舰变体</span>
                </div>
                <div className="space-y-1">
                  <CompareRow label="训练 Token" pro="33T" flash="" />
                  <CompareRow label="最大 Batch Size" pro="94.4M tokens" flash="" />
                  <CompareRow label="峰值 LR" pro="2.0×10⁻⁴" flash="" />
                  <CompareRow label="序列长度扩展" pro="4K → 16K → 64K → 1M" flash="" />
                  <CompareRow label="密集注意力预热" pro="比 Flash 更长" flash="" />
                </div>
                <div className="mt-6 pt-4 border-t border-[rgba(255,255,255,0.05)]">
                  <p className="text-[14px] text-[#8B9EB0]">
                    以 1.6T 总参数和 49B 激活参数追求极致性能，专为高难度任务而生
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── Training Stability Visualization ─── */}
      <section className="relative py-[80px] px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div className="mb-14" {...fadeInUp}>
            <span className="section-label block mb-3">[ 训练稳定性 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-3">
              预见式路由：消除 Loss Spike
            </h2>
            <p className="text-[17px] text-[#8B9EB0] max-w-[640px] leading-relaxed">
              通过路由与计算的解耦同步，从根本上消除训练过程中的异常损失峰值
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
            {/* Standard Routing */}
            <motion.div className="liquid-glass rounded-xl p-8" {...staggerChild}>
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp size={22} className="text-[#FF3333]" />
                <h3 className="font-heading text-[20px] font-semibold text-white">标准训练路由</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(255,51,51,0.1)] border border-[rgba(255,51,51,0.2)] flex items-center justify-center text-[#FF3333] text-[13px] font-mono">
                    t
                  </div>
                  <ArrowRight size={16} className="text-[#8B9EB0]" />
                  <div className="flex-1 liquid-glass rounded-lg p-4">
                    <p className="text-[14px] text-[#8B9EB0] mb-1">步骤 t 计算特征</p>
                    <p className="text-[13px] font-mono text-white">f = forward(x; θ<sub className="text-[#FF3333]">t</sub>)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(255,51,51,0.1)] border border-[rgba(255,51,51,0.2)] flex items-center justify-center text-[#FF3333] text-[13px] font-mono">
                    t
                  </div>
                  <ArrowRight size={16} className="text-[#8B9EB0]" />
                  <div className="flex-1 liquid-glass rounded-lg p-4">
                    <p className="text-[14px] text-[#8B9EB0] mb-1">同步骤路由决策</p>
                    <p className="text-[13px] font-mono text-white">route = g(f; θ<sub className="text-[#FF3333]">t</sub>)</p>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-lg bg-[rgba(255,51,51,0.05)] border border-[rgba(255,51,51,0.15)]">
                  <p className="text-[14px] text-[#FF3333]">
                    异常值恶性循环：特征与路由同步更新导致梯度爆炸，产生 Loss Spike
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Anticipatory Routing */}
            <motion.div className="liquid-glass rounded-xl p-8" {...staggerChild}>
              <div className="flex items-center gap-3 mb-6">
                <Shield size={22} className="text-[#00E5FF]" />
                <h3 className="font-heading text-[20px] font-semibold text-white">预见式路由</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.2)] flex items-center justify-center text-[#00E5FF] text-[13px] font-mono">
                    t
                  </div>
                  <ArrowRight size={16} className="text-[#8B9EB0]" />
                  <div className="flex-1 liquid-glass rounded-lg p-4">
                    <p className="text-[14px] text-[#8B9EB0] mb-1">步骤 t 计算特征</p>
                    <p className="text-[13px] font-mono text-white">f = forward(x; θ<sub className="text-[#00E5FF]">t</sub>)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[rgba(0,229,255,0.1)] border border-[rgba(0,229,255,0.2)] flex items-center justify-center text-[#00E5FF] text-[13px] font-mono">
                    t−Δt
                  </div>
                  <ArrowRight size={16} className="text-[#8B9EB0]" />
                  <div className="flex-1 liquid-glass rounded-lg p-4">
                    <p className="text-[14px] text-[#8B9EB0] mb-1">延迟参数路由决策</p>
                    <p className="text-[13px] font-mono text-white">
                      route = g(f; θ<sub className="text-[#00E5FF]">t−Δt</sub>)
                    </p>
                  </div>
                </div>
                <div className="mt-4 p-4 rounded-lg bg-[rgba(0,229,255,0.05)] border border-[rgba(0,229,255,0.15)]">
                  <p className="text-[14px] text-[#00E5FF]">
                    解耦同步：特征与路由使用不同时间步参数，额外 wall-time 约 20%，但总体开销可忽略
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* SwiGLU Clamping */}
          <motion.div className="liquid-glass rounded-xl p-8" {...fadeInUp}>
            <div className="flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Layers size={22} className="text-[#3D8BFF]" />
                  <h3 className="font-heading text-[20px] font-semibold text-white">
                    SwiGLU Clamping
                  </h3>
                </div>
                <p className="text-[17px] text-[#8B9EB0] leading-relaxed mb-4">
                  对 SwiGLU 激活函数的输出施加硬边界约束，消除异常值传播，大幅稳定训练过程，实现零性能损失的鲁棒性提升
                </p>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="liquid-glass rounded-lg px-6 py-4 border-l-[3px] border-l-[#00E5FF]">
                    <p className="text-[13px] text-[#8B9EB0] mb-1">约束公式</p>
                    <p className="text-[18px] font-mono text-white">
                      clamp(x, <span className="text-[#00E5FF]">-10</span>,{' '}
                      <span className="text-[#00E5FF]">10</span>)
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[14px] text-[#8B9EB0]">
                    <Zap size={16} className="text-[#00E5FF]" />
                    零性能损失
                  </div>
                </div>
              </div>

              {/* Visual clamp indicator */}
              <div className="w-full lg:w-[280px] flex-shrink-0">
                <div className="liquid-glass rounded-xl p-5">
                  <div className="text-[12px] text-[#8B9EB0] mb-3 text-center">激活值分布</div>
                  <div className="relative h-[160px] flex items-center justify-center">
                    {/* Center line */}
                    <div className="absolute w-full h-[1px] bg-[rgba(255,255,255,0.1)]" />
                    {/* Clamp bounds */}
                    <div className="absolute top-2 w-full h-[1px] bg-[rgba(0,229,255,0.3)]">
                      <span className="absolute right-0 -top-4 text-[11px] font-mono text-[#00E5FF]">
                        +10
                      </span>
                    </div>
                    <div className="absolute bottom-2 w-full h-[1px] bg-[rgba(0,229,255,0.3)]">
                      <span className="absolute right-0 -bottom-4 text-[11px] font-mono text-[#00E5FF]">
                        -10
                      </span>
                    </div>
                    {/* Bell curve approximation */}
                    <svg viewBox="0 0 200 100" className="w-full h-full">
                      <path
                        d="M10,80 Q50,20 100,50 Q150,80 190,20"
                        fill="none"
                        stroke="#3D8BFF"
                        strokeWidth="2"
                        opacity="0.6"
                      />
                      <path
                        d="M10,80 Q50,20 100,50 Q150,80 190,20 L190,95 L10,95 Z"
                        fill="rgba(61,139,255,0.1)"
                        stroke="none"
                      />
                      {/* Clamped flat tops */}
                      <rect x="0" y="5" width="200" height="8" fill="rgba(0,229,255,0.15)" rx="2" />
                      <rect
                        x="0"
                        y="87"
                        width="200"
                        height="8"
                        fill="rgba(0,229,255,0.15)"
                        rx="2"
                      />
                    </svg>
                  </div>
                  <p className="text-[12px] text-[#8B9EB0] text-center mt-2">
                    超出边界值被压缩至 ±10 范围
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section A: Base Model Evaluation Table (25 rows) ─── */}
      <section className="relative py-[100px] px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div className="mb-14" {...fadeInUp}>
            <span className="section-label block mb-3">[ 全面评测 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-3">
              Base 模型全面评测 (25项 Benchmark)
            </h2>
            <p className="text-[17px] text-[#8B9EB0] max-w-[640px] leading-relaxed">
              从知识推理到代码生成，从多语言理解到长上下文，全方位覆盖基础能力评测
            </p>
          </motion.div>

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
                    <th className="text-left text-white text-[13px] font-medium tracking-wide px-5 py-4 border-b border-[rgba(61,139,255,0.3)] sticky left-0 bg-[rgba(61,139,255,0.15)] z-10">
                      Benchmark (Metric)
                    </th>
                    <th className="text-center text-white text-[13px] font-medium tracking-wide px-3 py-4 border-b border-[rgba(61,139,255,0.3)]">
                      Shots
                    </th>
                    <th className="text-center text-white text-[13px] font-medium tracking-wide px-3 py-4 border-b border-[rgba(61,139,255,0.3)]">
                      V3.2-Base
                    </th>
                    <th className="text-center text-white text-[13px] font-medium tracking-wide px-3 py-4 border-b border-[rgba(61,139,255,0.3)]">
                      V4-Flash-Base
                    </th>
                    <th className="text-center text-white text-[13px] font-medium tracking-wide px-3 py-4 border-b border-[rgba(61,139,255,0.3)] bg-[rgba(0,229,255,0.08)]">
                      V4-Pro-Base
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {baseModelData.map((row, ri) => {
                    const isOdd = ri % 2 === 0;
                    const rowBg = isOdd ? '#0A1628' : '#0D1B2E';
                    const bestVal = Math.max(row.v32, row.flash, row.pro);
                    const isProBest = row.pro === bestVal;
                    const isFlashBest = row.flash === bestVal;
                    const isV32Best = row.v32 === bestVal;
                    return (
                      <motion.tr
                        key={row.benchmark}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: ri * 0.02, duration: 0.4 }}
                        className="group transition-colors duration-200 hover:bg-[rgba(61,139,255,0.06)]"
                        style={{ background: rowBg }}
                      >
                        <td className="px-5 py-3.5 text-[13px] text-white font-medium sticky left-0 z-10 group-hover:bg-[rgba(61,139,255,0.06)] transition-colors" style={{ background: 'inherit' }}>
                          {row.benchmark}
                        </td>
                        <td className="px-3 py-3.5 text-center text-[12px] text-[#8B9EB0] font-mono">
                          {row.shots}
                        </td>
                        <td
                          className={cn(
                            'px-3 py-3.5 text-center text-[14px] font-mono transition-colors',
                            isV32Best && 'text-[#00E5FF] font-semibold bg-[rgba(0,229,255,0.08)]',
                            !isV32Best && 'text-[#8B9EB0]'
                          )}
                        >
                          {row.v32.toFixed(1)}
                        </td>
                        <td
                          className={cn(
                            'px-3 py-3.5 text-center text-[14px] font-mono transition-colors',
                            isFlashBest && 'text-[#00E5FF] font-semibold bg-[rgba(0,229,255,0.08)]',
                            !isFlashBest && 'text-[#8B9EB0]'
                          )}
                        >
                          {row.flash.toFixed(1)}
                        </td>
                        <td
                          className={cn(
                            'px-3 py-3.5 text-center text-[14px] font-mono transition-colors border-l-2 border-l-[#00E5FF]',
                            isProBest && 'text-[#00E5FF] font-semibold bg-[rgba(0,229,255,0.08)]',
                            !isProBest && 'text-white'
                          )}
                        >
                          {row.pro.toFixed(1)}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Insight card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="liquid-glass rounded-[12px] p-6 mt-6"
          >
            <p className="text-[15px] text-[#8B9EB0] leading-relaxed">
              <span className="text-[#00E5FF] font-semibold">V4-Flash-Base</span> 以更少的激活参数 (13B vs 37B) 和更少的总参数 (284B vs 671B)，在绝大多数 benchmark 上超越了 V3.2-Base。<span className="text-[#00E5FF] font-semibold">V4-Pro-Base</span> 在知识密集型和长上下文评测上提升尤为显著。
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Section B: Training Hyperparameter Comparison Table ─── */}
      <section className="relative py-[100px] px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div className="mb-14" {...fadeInUp}>
            <span className="section-label block mb-3">[ 超参数对比 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-3">
              训练超参数详细对比
            </h2>
            <p className="text-[17px] text-[#8B9EB0] max-w-[640px] leading-relaxed">
              Flash 与 Pro 在训练配置上的精妙差异，决定了两者的性能与效率特性
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="liquid-glass rounded-[12px] overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-[rgba(61,139,255,0.15)]">
                    <th className="text-left text-white text-[13px] font-medium tracking-wide px-5 py-4 border-b border-[rgba(61,139,255,0.3)] sticky left-0 bg-[rgba(61,139,255,0.15)] z-10">
                      参数
                    </th>
                    <th className="text-center text-white text-[13px] font-medium tracking-wide px-3 py-4 border-b border-[rgba(61,139,255,0.3)]">
                      V4-Flash
                    </th>
                    <th className="text-center text-white text-[13px] font-medium tracking-wide px-3 py-4 border-b border-[rgba(61,139,255,0.3)] bg-[rgba(0,229,255,0.08)]">
                      V4-Pro
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {hyperparameterData.map((row, ri) => {
                    const isOdd = ri % 2 === 0;
                    const rowBg = isOdd ? '#0A1628' : '#0D1B2E';
                    return (
                      <motion.tr
                        key={row.param}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: ri * 0.03, duration: 0.4 }}
                        className="group transition-colors duration-200 hover:bg-[rgba(61,139,255,0.06)]"
                        style={{ background: rowBg }}
                      >
                        <td className="px-5 py-3.5 text-[13px] text-white font-medium sticky left-0 z-10 group-hover:bg-[rgba(61,139,255,0.06)] transition-colors" style={{ background: 'inherit' }}>
                          {row.param}
                        </td>
                        <td className="px-3 py-3.5 text-center text-[14px] font-mono text-[#8B9EB0]">
                          {row.flash}
                        </td>
                        <td className="px-3 py-3.5 text-center text-[14px] font-mono text-white border-l-2 border-l-[#00E5FF]">
                          {row.pro}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section C: Anticipatory Routing Technical Card ─── */}
      <section className="relative py-[100px] px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div className="mb-14" {...fadeInUp}>
            <span className="section-label block mb-3">[ 技术创新 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-3">
              预见式路由技术详解
            </h2>
            <p className="text-[17px] text-[#8B9EB0] max-w-[640px] leading-relaxed">
              通过解耦同步机制消除训练异常，实现稳定高效的 MoE 训练
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <GitBranch size={28} strokeWidth={1.5} />,
                title: '核心思想',
                desc: '解耦骨干网络和路由网络的同步更新，打破异常值传播的耦合链条',
                color: '#3D8BFF',
              },
              {
                icon: <Zap size={28} strokeWidth={1.5} />,
                title: '实现方式',
                desc: '步骤 t 使用 θ_t 计算特征，路由索引使用 θ_{t−Δt}，形成天然缓冲',
                color: '#00E5FF',
              },
              {
                icon: <Timer size={28} strokeWidth={1.5} />,
                title: '动态触发',
                desc: '检测 loss spike → 短回滚 → 激活预见式路由，自动切换保护模式',
                color: '#00E5FF',
              },
              {
                icon: <Shield size={28} strokeWidth={1.5} />,
                title: '训练效果',
                desc: '额外 wall-time 开销约 20%，但总体可忽略，换来训练的绝对稳定',
                color: '#3D8BFF',
              },
            ].map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="liquid-glass rounded-[12px] p-6 border-t-2 group hover:-translate-y-1.5 transition-all duration-300"
                style={{ borderTopColor: card.color }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${card.color}15`, color: card.color }}
                >
                  {card.icon}
                </div>
                <h3 className="font-heading text-[18px] font-semibold text-white mb-3">
                  {card.title}
                </h3>
                <p className="text-[14px] text-[#8B9EB0] leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          NEW SECTIONS BELOW
          ═══════════════════════════════════════════════════════════ */}

      {/* ─── Section A: Animated Training Timeline ─── */}
      <section className="relative py-[100px] px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div className="mb-14" {...fadeInUp}>
            <span className="section-label block mb-3">[ 训练时间线 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-3">
              32T Token 训练旅程
            </h2>
            <p className="text-[17px] text-[#8B9EB0] max-w-[640px] leading-relaxed">
              五阶段渐进式训练，从 Dense Attention 到 1M 上下文，历时 14 周
            </p>
          </motion.div>

          <div className="max-w-[680px]">
            {timelinePhases.map((phase, i) => (
              <TimelineNode key={phase.phase} phase={phase} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Section B: Data Mix Visualization ─── */}
      <section className="relative py-[100px] px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div className="mb-14" {...fadeInUp}>
            <span className="section-label block mb-3">[ 数据配比 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-3">
              32T 训练数据构成
            </h2>
            <p className="text-[17px] text-[#8B9EB0] max-w-[640px] leading-relaxed">
              网页与代码占据六成，数学科学、多语言、长文档均衡配比，Agent 数据精准注入
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="liquid-glass rounded-xl p-8 lg:p-12"
          >
            <DonutChart />
          </motion.div>
        </div>
      </section>

      {/* ─── Section C: Training Stability Monitor ─── */}
      <section className="relative py-[100px] px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div className="mb-14" {...fadeInUp}>
            <span className="section-label block mb-3">[ 稳定性仪表盘 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-3">
              训练稳定性实时监控
            </h2>
            <p className="text-[17px] text-[#8B9EB0] max-w-[640px] leading-relaxed">
              Muon 优化器 + Anticipatory Routing 协同，实现零 loss spike 的稳定训练
            </p>
          </motion.div>

          <StabilityMonitor />
        </div>
      </section>

      {/* ─── Bottom spacer ─── */}
      <div className="h-20" />
    </div>
  );
}
