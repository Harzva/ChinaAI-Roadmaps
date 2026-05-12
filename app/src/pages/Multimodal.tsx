import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Eye, Target, Box, Brain, Layers, Sparkles, BarChart3,
  FileText, Code, GitBranch, Zap, ArrowRight,
  Award, TrendingUp, Monitor, Crosshair, Focus, Lightbulb,
  ExternalLink, BookOpen
} from 'lucide-react'

/* ─── Fade-in variants ─── */
const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  }),
}

/* ─── 小白科普卡片 ─── */
function BeginnerCard({ emoji, title, children, icon: Icon, color = '#3D8BFF' }: {
  emoji: string; title: string; children: React.ReactNode; icon: React.ComponentType<any>; color?: string
}) {
  return (
    <motion.div
      variants={fadeIn}
      whileInView="visible"
      initial="hidden"
      viewport={{ once: true, amount: 0.2 }}
      className="liquid-glass rounded-2xl p-6"
      style={{ borderTop: `3px solid ${color}` }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15` }}>
          <Icon size={20} style={{ color }} />
        </div>
        <h3 className="font-heading text-[18px] font-semibold text-white">{emoji} {title}</h3>
      </div>
      <div className="font-body text-[15px] text-[#8B9EB0] leading-[1.7]">{children}</div>
    </motion.div>
  )
}

/* ─── 数据对比卡片 ─── */
function StatCard({ label, value, unit, color, description }: { label: string; value: string; unit: string; color: string; description?: string }) {
  return (
    <motion.div
      variants={fadeIn}
      whileInView="visible"
      initial="hidden"
      viewport={{ once: true }}
      className="liquid-glass rounded-2xl p-6 text-center"
      style={{ borderTop: `3px solid ${color}` }}
    >
      <div className="text-[14px] text-[#8B9EB0] font-body mb-2">{label}</div>
      <div className="font-heading text-[36px] font-bold" style={{ color }}>{value}</div>
      <div className="text-[13px] text-[#8B9EB0] font-body mt-1">{unit}</div>
      {description && <div className="text-[12px] text-[#8B9EB0] mt-3 opacity-70">{description}</div>}
    </motion.div>
  )
}

/* ─── 压缩对比进度条 ─── */
function CompressionBar({ label, tokens, color, maxTokens }: { label: string; tokens: number; color: string; maxTokens: number }) {
  const width = (tokens / maxTokens) * 100
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="font-body text-[14px] text-white">{label}</span>
        <span className="font-mono text-[14px]" style={{ color }}>{tokens} entries</span>
      </div>
      <div className="w-full h-8 rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          className="h-full rounded-lg flex items-center justify-end pr-3 font-mono text-[12px] text-white"
          style={{ background: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${width}%` }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] as const }}
          viewport={{ once: true }}
        >
          {tokens > 200 && `${tokens}`}
        </motion.div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function Multimodal() {
  const [activeTab, setActiveTab] = useState<'vision' | 'training' | 'results'>('vision')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-[100dvh] bg-[#050B14] text-white">
      {/* ── HERO ── */}
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center pt-32 pb-16 px-6">
        <div className="max-w-[900px] mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="section-label inline-block mb-6"
          >
            DeepSeek / 多模态分析
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-[42px] md:text-[56px] font-medium tracking-tight leading-[1.1] mb-6"
          >
            <span className="text-[#0055FF]">DeepSeek</span>{' '}
            <span className="bg-gradient-to-r from-[#0055FF] to-[#00E5FF] bg-clip-text text-transparent">
              多模态技术解析
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-[18px] md:text-[20px] text-[#8B9EB0] leading-[1.7] max-w-[700px] mx-auto mb-8"
          >
            以视觉原语思考：一张图90个token，GPT要花1000个——
            深度解析DeepSeek多模态技术范式的核心创新与性能突破
          </motion.p>

          {/* Source links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4 text-[13px] text-[#8B9EB0]"
          >
            <a href="https://mp.weixin.qq.com/s/DJmueVykR9uhZMjj8jfogw" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#00E5FF] transition-colors">
              <FileText size={14} /> 未来协议 <ExternalLink size={12} />
            </a>
            <a href="https://mp.weixin.qq.com/s/2ounFVjR9t6QHSwjKC13ew" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#00E5FF] transition-colors">
              <BookOpen size={14} /> 机器之心 <ExternalLink size={12} />
            </a>
            <a href="https://github.com/deepseek-ai/Thinking-with-Visual-Primitives" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-[#00E5FF] transition-colors">
              <Code size={14} /> GitHub <ExternalLink size={12} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 核心数据栏 ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <StatCard label="视觉压缩比" value="7,056" unit="倍" color="#00E5FF" description="756×756 → 81 KV entries" />
          <StatCard label="Token消耗" value="90" unit="entries/图" color="#3D8BFF" description="vs GPT 870~1100" />
          <StatCard label="成本降低" value="90" unit="%" color="#ffb84d" description="看图成本砍掉九成" />
          <StatCard label="训练样本" value="4,000" unit="万条" color="#4ECDC4" description="31700数据源生成" />
        </div>
      </section>

      {/* ── 小白科普 ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20">
        <motion.h2
          variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }}
          className="font-heading text-[32px] font-semibold text-white mb-8"
        >
          🔰 小白导航：先读这段
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BeginnerCard emoji="👁️" title="Reference Gap（指代鸿沟）是什么？" icon={Eye} color="#3D8BFF">
            <p className="mb-3">
              想象你向<strong className="text-[#00E5FF]">看不见屏幕的朋友</strong>描述一张棋盘：
              "左边那个棋子要吃掉中间偏右一点的棋子"——对方根本不知道你在说哪两颗！
            </p>
            <p>
              这就是当前多模态AI的困境：模型能"看见"，但思考时<strong className="text-[#00E5FF]">抓不住想谈的对象</strong>。
              自然语言描述位置天生模糊，导致注意力漂移、结论错误。
            </p>
          </BeginnerCard>

          <BeginnerCard emoji="🎯" title="视觉原语 = 用手指着思考" icon={Target} color="#00E5FF">
            <p className="mb-3">
              DeepSeek的解法：<strong className="text-[#00E5FF]">别用语言描述位置，直接把坐标塞进推理链</strong>。
              点(Point)和边界框(Bounding Box)变成思维的基本单元。
            </p>
            <p>
              模型推理时就像有根<strong className="text-[#00E5FF]">手指在图上指着目标</strong>，
              指哪想哪、边指边想。坐标不再是答案，而是推理过程中的"锚点"。
            </p>
          </BeginnerCard>

          <BeginnerCard emoji="🗜️" title="7056倍压缩怎么做到的？" icon={Box} color="#ffb84d">
            <p className="mb-3">
              一张756×756的图片处理流程：<br/>
              1. ViT → <strong className="text-[#ffb84d]">2916</strong>个图像块token<br/>
              2. 3×3空间压缩 → <strong className="text-[#ffb84d]">324</strong>个token<br/>
              3. CSA压缩 → <strong className="text-[#ffb84d]">81</strong>个KV条目
            </p>
            <p>
              传统模型描述位置要用"靠近左上角边缘处有一个红色圆形物体"——
              <strong className="text-[#ffb84d]">上百个token</strong>。
              DeepSeek直接塞<code className="text-[#00E5FF]">(x:342, y:156)</code>——<strong className="text-[#ffb84d]">几个token完事</strong>。
            </p>
          </BeginnerCard>

          <BeginnerCard emoji="🏥" title="站在V4-Flash肩膀上" icon={Monitor} color="#4ECDC4">
            <p className="mb-3">
              多模态模型以<strong className="text-[#4ECDC4]">V4-Flash</strong>为语言主干：
              284B总参数，推理激活13B。视觉编码使用自研ViT，支持任意分辨率输入。
            </p>
            <p>
              核心创新不在算力堆砌，而在<strong className="text-[#4ECDC4]">底层思路改变</strong>：
              不堆算力改架构——从"看更多"到"指更准"。
            </p>
          </BeginnerCard>
        </div>
      </section>

      {/* ── 技术深度解析 ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20">
        <motion.h2
          variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }}
          className="font-heading text-[32px] font-semibold text-white mb-8"
        >
          🔬 技术深度解析
        </motion.h2>

        {/* Tab switcher */}
        <div className="flex gap-2 mb-8 flex-wrap">
          {[
            { key: 'vision', label: '👁️ 视觉原语', desc: '核心创新' },
            { key: 'training', label: '🎓 训练流程', desc: '四类任务+四步训练' },
            { key: 'results', label: '📊 性能对比', desc: '11项基准测试' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-5 py-3 rounded-xl font-body text-[14px] transition-all duration-200 cursor-pointer ${
                activeTab === tab.key
                  ? 'bg-[#00E5FF] text-[#050B14] font-semibold'
                  : 'bg-[rgba(255,255,255,0.05)] text-[#8B9EB0] hover:bg-[rgba(255,255,255,0.1)] hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab: 视觉原语 */}
        {activeTab === 'vision' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* 压缩对比 */}
            <div className="liquid-glass rounded-2xl p-8 mb-8">
              <h3 className="font-heading text-[22px] font-semibold text-white mb-2 flex items-center gap-2">
                <BarChart3 size={22} className="text-[#00E5FF]" />
                视觉Token压缩对比（800×800图片）
              </h3>
              <p className="text-[#8B9EB0] text-[14px] mb-8">KV Cache Entries（越少越好）</p>
              <CompressionBar label="DeepSeek-V4-Flash + 视觉原语" tokens={90} color="#00E5FF" maxTokens={1100} />
              <CompressionBar label="Claude Sonnet 4.6" tokens={870} color="#8B9EB0" maxTokens={1100} />
              <CompressionBar label="Gemini-3-Flash" tokens={1100} color="#8B9EB0" maxTokens={1100} />
              <div className="mt-6 p-4 rounded-xl bg-[rgba(0,229,255,0.08)] border border-[rgba(0,229,255,0.15)]">
                <p className="text-[#00E5FF] font-body text-[14px] flex items-center gap-2">
                  <Lightbulb size={16} />
                  DeepSeek比竞品少用<strong className="font-heading text-[18px] mx-1">90%~92%</strong>的视觉token，同时保持精确的指代能力
                </p>
              </div>
            </div>

            {/* 两种原语 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <motion.div variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }}
                className="liquid-glass rounded-2xl p-6" style={{ borderTop: '3px solid #3D8BFF' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#3D8BFF15] flex items-center justify-center">
                    <Crosshair size={24} className="text-[#3D8BFF]" />
                  </div>
                  <h3 className="font-heading text-[20px] font-semibold text-white">边界框 &lt;|box|&gt;</h3>
                </div>
                <p className="text-[#8B9EB0] font-body text-[14px] leading-[1.7] mb-4">
                  用于需要<strong className="text-white">定位和尺寸信息</strong>的对象。输出格式：
                </p>
                <div className="bg-[#0A1628] rounded-lg p-4 font-mono text-[13px] text-[#00E5FF] leading-relaxed overflow-x-auto">
                  &lt;|ref|&gt; 熊 &lt;|/ref|&gt;&lt;|box|&gt;[[452,23,804,411]]&lt;|/box|&gt;
                </div>
                <p className="text-[#8B9EB0] text-[13px] mt-3">
                  适用场景：目标检测、空间关系推理、物体计数
                </p>
              </motion.div>

              <motion.div variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }}
                className="liquid-glass rounded-2xl p-6" style={{ borderTop: '3px solid #00E5FF' }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#00E5FF15] flex items-center justify-center">
                    <Focus size={24} className="text-[#00E5FF]" />
                  </div>
                  <h3 className="font-heading text-[20px] font-semibold text-white">点坐标 &lt;|point|&gt;</h3>
                </div>
                <p className="text-[#8B9EB0] font-body text-[14px] leading-[1.7] mb-4">
                  用于<strong className="text-white">更抽象的空间指代</strong>，如迷宫探索轨迹或曲线追踪路径。
                </p>
                <div className="bg-[#0A1628] rounded-lg p-4 font-mono text-[13px] text-[#00E5FF] leading-relaxed overflow-x-auto">
                  &lt;|point|&gt;(x:156, y:342)&lt;|/point|&gt;
                </div>
                <p className="text-[#8B9EB0] text-[13px] mt-3">
                  适用场景：迷宫导航、路径追踪、点标注
                </p>
              </motion.div>
            </div>

            {/* 压缩流程 */}
            <div className="liquid-glass rounded-2xl p-8">
              <h3 className="font-heading text-[22px] font-semibold text-white mb-6 flex items-center gap-2">
                <Layers size={22} className="text-[#ffb84d]" />
                756×756 图片压缩全流程
              </h3>
              <div className="flex flex-wrap items-center gap-4 justify-center">
                {[
                  { label: '原始图片', value: '756×756', tokens: '571,536 像素', color: '#8B9EB0' },
                  { label: 'ViT处理', value: '→', tokens: '2,916 tokens', color: '#3D8BFF' },
                  { label: '3×3空间压缩', value: '→', tokens: '324 tokens', color: '#00E5FF' },
                  { label: 'CSA注意力', value: '→', tokens: '81 KV entries', color: '#ffb84d' },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-heading text-[18px] font-semibold" style={{ color: step.color }}>{step.tokens}</div>
                      <div className="text-[12px] text-[#8B9EB0]">{step.label}</div>
                    </div>
                    {i < 3 && <ArrowRight size={20} className="text-[#8B9EB0] opacity-50" />}
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <span className="inline-block px-4 py-2 rounded-full bg-[rgba(255,184,77,0.1)] border border-[rgba(255,184,77,0.2)] text-[#ffb84d] font-heading text-[16px]">
                  总压缩比: 571,536 → 81 = <strong>7,056倍</strong>
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab: 训练流程 */}
        {activeTab === 'training' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* 四类训练任务 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  title: '计数任务', sample: '10万+ 样本', desc: '粗粒度（"图里有多少人"）和细粒度（"穿蓝色衣服的人有几个"）。粗粒度学"批量锁定"，细粒度学逐一扫描核对。',
                  icon: BarChart3, color: '#3D8BFF'
                },
                {
                  title: '空间推理与VQA', sample: 'GQA + CLEVR', desc: '大量利用自然场景和可控合成场景生成多跳推理样本，每步都用边界框锁定涉及的对象。',
                  icon: Brain, color: '#00E5FF'
                },
                {
                  title: '迷宫导航', sample: '46万条', desc: 'DFS/Prim/Kruskal生成矩形/圆形/六边形迷宫。专门设计"表面可解但实际无解"迷宫训练鲁棒性。',
                  icon: GitBranch, color: '#ffb84d'
                },
                {
                  title: '路径追踪', sample: '12.5万条', desc: '贝塞尔曲线交叉追踪。关键挑战：交叉歧义消解。所有曲线颜色相同的测试版本防止颜色取巧。',
                  icon: TrendingUp, color: '#4ECDC4'
                },
              ].map((task, i) => (
                <motion.div
                  key={i} variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }}
                  className="liquid-glass rounded-2xl p-6" style={{ borderTop: `3px solid ${task.color}` }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${task.color}15` }}>
                      <task.icon size={20} style={{ color: task.color }} />
                    </div>
                    <div>
                      <h3 className="font-heading text-[18px] font-semibold text-white">{task.title}</h3>
                      <span className="text-[12px] font-mono" style={{ color: task.color }}>{task.sample}</span>
                    </div>
                  </div>
                  <p className="text-[#8B9EB0] font-body text-[14px] leading-[1.7]">{task.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* 训练流程：四步 */}
            <div className="liquid-glass rounded-2xl p-8">
              <h3 className="font-heading text-[22px] font-semibold text-white mb-6 flex items-center gap-2">
                <Zap size={22} className="text-[#00E5FF]" />
                训练流程：先分家，再合体
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { step: '①', title: '专家化训练', desc: '边界框数据→FTwG专家\n点坐标数据→FTwP专家\n避免两种模态互相干扰', color: '#3D8BFF' },
                  { step: '②', title: '强化学习', desc: 'GRPO算法\n格式奖励+质量奖励+精度奖励\n三路并行奖励设计', color: '#00E5FF' },
                  { step: '③', title: '统一RFT', desc: '两个专家的rollout数据\n从预训练模型重新初始化\n得到统一模型F', color: '#ffb84d' },
                  { step: '④', title: 'OPD蒸馏', desc: '学生模型自己生成轨迹\n最小化与专家分布的KL散度\n弥合性能差距', color: '#4ECDC4' },
                ].map((s, i) => (
                  <motion.div
                    key={i} variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }}
                    className="rounded-xl p-5 text-center" style={{ background: `${s.color}08`, border: `1px solid ${s.color}20` }}
                  >
                    <div className="font-heading text-[36px] font-bold mb-2" style={{ color: s.color }}>{s.step}</div>
                    <h4 className="font-heading text-[16px] font-semibold text-white mb-2">{s.title}</h4>
                    <p className="text-[#8B9EB0] font-body text-[13px] leading-[1.6] whitespace-pre-line">{s.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab: 性能结果 */}
        {activeTab === 'results' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {/* 性能对比表 */}
            <div className="liquid-glass rounded-2xl p-8 mb-8">
              <h3 className="font-heading text-[22px] font-semibold text-white mb-6 flex items-center gap-2">
                <Award size={22} className="text-[#ffb84d]" />
                11项基准测试对比
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-[rgba(255,255,255,0.1)]">
                      <th className="py-3 px-4 text-[#8B9EB0] font-body text-[14px]">基准测试</th>
                      <th className="py-3 px-4 text-[#00E5FF] font-body text-[14px] font-semibold">DS-V4-Flash</th>
                      <th className="py-3 px-4 text-[#8B9EB0] font-body text-[14px]">GPT-5.4</th>
                      <th className="py-3 px-4 text-[#8B9EB0] font-body text-[14px]">Gemini-3-Flash</th>
                      <th className="py-3 px-4 text-[#8B9EB0] font-body text-[14px]">Claude-Sonnet-4.6</th>
                      <th className="py-3 px-4 text-[#8B9EB0] font-body text-[14px]">Qwen3-VL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { task: 'Pixmo-Count', ds: '89.2%', gpt: '76.6%', gemini: '88.2%', claude: '68.7%', qwen: '—', highlight: true },
                      { task: 'DS_Finegrained_Counting', ds: '88.7%', gpt: '—', gemini: '—', claude: '—', qwen: '87.2%', highlight: true },
                      { task: 'MIHBench', ds: '85.3%', gpt: '—', gemini: '—', claude: '—', qwen: '—', highlight: true },
                      { task: 'SpatialMQA', ds: '69.4%', gpt: '—', gemini: '—', claude: '—', qwen: '—', highlight: true },
                      { task: 'DS_Maze_Navigation', ds: '66.9%', gpt: '50.6%', gemini: '49.4%', claude: '48.9%', qwen: '—' },
                      { task: 'DS_Path_Tracing', ds: '56.7%', gpt: '46.5%', gemini: '41.4%', claude: '—', qwen: '—' },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)]">
                        <td className="py-3 px-4 font-body text-[14px] text-white">{row.task}</td>
                        <td className={`py-3 px-4 font-mono text-[14px] ${row.highlight ? 'text-[#00E5FF] font-semibold' : 'text-[#00E5FF]'}`}>{row.ds}</td>
                        <td className="py-3 px-4 font-mono text-[14px] text-[#8B9EB0]">{row.gpt}</td>
                        <td className="py-3 px-4 font-mono text-[14px] text-[#8B9EB0]">{row.gemini}</td>
                        <td className="py-3 px-4 font-mono text-[14px] text-[#8B9EB0]">{row.claude}</td>
                        <td className="py-3 px-4 font-mono text-[14px] text-[#8B9EB0]">{row.qwen}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[#8B9EB0] text-[13px] mt-4 italic">
                所有frontier模型均通过API评测，使用统一提示词。绿色高亮 = 该项第一。
              </p>
            </div>

            {/* 关键突破 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }}
                className="liquid-glass rounded-2xl p-6" style={{ borderLeft: '4px solid #00E5FF' }}>
                <h4 className="font-heading text-[18px] font-semibold text-white mb-3">🎯 拓扑推理大幅领先</h4>
                <p className="text-[#8B9EB0] text-[14px] leading-[1.7] mb-4">
                  迷宫导航<strong className="text-[#00E5FF]">66.9%</strong> vs GPT-5.4的<strong className="text-white">50.6%</strong>——
                  提升约17个百分点。路径追踪<strong className="text-[#00E5FF]">56.7%</strong> vs GPT-5.4的<strong className="text-white">46.5%</strong>。
                </p>
                <p className="text-[#8B9EB0] text-[13px]">
                  论文指出："所有frontier模型在拓扑推理上均表现欠佳"——这是行业性短板。
                </p>
              </motion.div>

              <motion.div variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }}
                className="liquid-glass rounded-2xl p-6" style={{ borderLeft: '4px solid #ffb84d' }}>
                <h4 className="font-heading text-[18px] font-semibold text-white mb-3">🏆 计数任务第一</h4>
                <p className="text-[#8B9EB0] text-[14px] leading-[1.7] mb-4">
                  Pixmo-Count <strong className="text-[#ffb84d]">89.2%</strong> 超过Gemini-3-Flash的88.2%。
                  细粒度计数 <strong className="text-[#ffb84d]">88.7%</strong> 超过Qwen3-VL的87.2%。
                </p>
                <p className="text-[#8B9EB0] text-[13px]">
                  两类计数策略（批量锁定 vs 逐一扫描）分别训练是关键。
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </section>

      {/* ── 实测能力 ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-20">
        <motion.h2
          variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }}
          className="font-heading text-[32px] font-semibold text-white mb-8"
        >
          🧪 识图模式实测（用户反馈）
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { emoji: '🏛️', title: '认东西', desc: '博物馆随手拍不认识的玉器，DeepSeek描述纹饰、材质，推断是18世纪乾隆"痕都斯坦风格"。查了一下，结果对了。', icon: Eye, color: '#3D8BFF' },
            { emoji: '🧩', title: '做逻辑题', desc: '脑内拼立方体的空间推理题。快速模式答错，开深度思考后花了4分钟答对。视觉推理跟文本推理一样——得给它时间"想"。', icon: Brain, color: '#00E5FF' },
            { emoji: '😹', title: '读表情包', desc: '多数模型能识别"图里有一只猫"但不理解"为什么好笑"。DeepSeek能同时识别人是谁、猫的表情什么意思、笑点在哪。', icon: Sparkles, color: '#ffb84d' },
            { emoji: '💻', title: '截图转代码', desc: '技术文档截图丢进去，提取文字、还原表格、生成可交互HTML——连原网页跳转按钮都保留。最实用的功能。', icon: Code, color: '#4ECDC4' },
          ].map((item, i) => (
            <motion.div
              key={i} variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }}
              className="liquid-glass rounded-2xl p-6" style={{ borderTop: `3px solid ${item.color}` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${item.color}15` }}>
                  <item.icon size={20} style={{ color: item.color }} />
                </div>
                <h3 className="font-heading text-[18px] font-semibold text-white">{item.emoji} {item.title}</h3>
              </div>
              <p className="text-[#8B9EB0] font-body text-[14px] leading-[1.7]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 liquid-glass rounded-xl p-4 text-center text-[#8B9EB0] text-[14px]">
          <span className="text-[#00E5FF]">⚠️ 当前限制：</span>纯视觉理解，不能生图，不处理视频。只负责"看懂"。
        </div>
      </section>

      {/* ── 技术启示 ── */}
      <section className="max-w-[1200px] mx-auto px-6 pb-24">
        <motion.h2
          variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }}
          className="font-heading text-[32px] font-semibold text-white mb-8"
        >
          💡 技术启示与意义
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: '不堆算力，改思路', desc: '文本时代靠MoE把推理成本打骨折，识图时代靠视觉原语把token消耗压到竞品1/10。套路一样：不堆算力，改底层思路。', color: '#3D8BFF' },
            { title: '路线意义大于功能', desc: '多模态烧钱——GPT-4o处理高清图几百token起步，大规模商用成本压不住。DeepSeek证明不堆算力也能做多模态。', color: '#00E5FF' },
            { title: '从"看更多"到"指更准"', desc: '传统方案让模型"看得更清楚"（高分辨率切割）。DeepSeek指出：精确的空间指代能力，可以弥补视觉token不足。', color: '#ffb84d' },
          ].map((item, i) => (
            <motion.div
              key={i} variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }}
              className="liquid-glass rounded-2xl p-6" style={{ borderLeft: `4px solid ${item.color}` }}
            >
              <h4 className="font-heading text-[18px] font-semibold text-white mb-3">{item.title}</h4>
              <p className="text-[#8B9EB0] font-body text-[14px] leading-[1.7]">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 引用来源 */}
        <motion.div
          variants={fadeIn} whileInView="visible" initial="hidden" viewport={{ once: true }}
          className="mt-12 liquid-glass rounded-2xl p-8 text-center"
        >
          <h3 className="font-heading text-[20px] font-semibold text-white mb-4">📚 参考资料</h3>
          <div className="flex flex-wrap justify-center gap-6 text-[14px]">
            <a href="https://github.com/deepseek-ai/Thinking-with-Visual-Primitives" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#00E5FF] hover:underline">
              <Code size={16} /> GitHub: Thinking-with-Visual-Primitives
            </a>
            <a href="https://github.com/deepseek-ai/Thinking-with-Visual-Primitives/blob/main/Thinking_with_Visual_Primitives.pdf" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#00E5FF] hover:underline">
              <FileText size={16} /> 技术报告PDF
            </a>
            <a href="https://mp.weixin.qq.com/s/DJmueVykR9uhZMjj8jfogw" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#8B9EB0] hover:text-[#00E5FF] transition-colors">
              <BookOpen size={16} /> 未来协议文章
            </a>
            <a href="https://mp.weixin.qq.com/s/2ounFVjR9t6QHSwjKC13ew" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#8B9EB0] hover:text-[#00E5FF] transition-colors">
              <BookOpen size={16} /> 机器之心文章
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
