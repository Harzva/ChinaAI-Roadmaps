import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Image,
  Eye,
  Brain,
  Layers,
  Zap,
  Bot,
  Camera,
  ScanEye,
  ArrowRight,
  Sparkles,
  Monitor,
  FileImage,
  Shapes,
  Trophy,
  Lightbulb,
} from 'lucide-react'
import ParticleCanvas from '@/components/ParticleCanvas'

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

const pretrainingStages = [
  {
    stage: 'Stage 1',
    name: '视觉基础',
    desc: '图像-文本对齐训练，建立视觉表征',
    tokens: '2B',
    color: '#4ECDC4',
  },
  {
    stage: 'Stage 2',
    name: '高分辨率适应',
    desc: '引入高分辨率图像，提升细节感知',
    tokens: '500M',
    color: '#45B7D1',
  },
  {
    stage: 'Stage 3',
    name: '多任务混合',
    desc: 'OCR/VQA/检测等多任务联合训练',
    tokens: '1B',
    color: '#96CEB4',
  },
  {
    stage: 'Stage 4',
    name: '指令微调',
    desc: '对齐人类偏好，提升对话质量',
    tokens: '200M',
    color: '#FFEAA7',
  },
]

const visionAgentSteps = [
  { step: '看图', icon: Camera, desc: '接收图像输入，编码视觉特征', color: '#FF6B6B' },
  { step: '理解', icon: Brain, desc: '解析图像内容，提取关键信息', color: '#4ECDC4' },
  { step: '推理', icon: ScanEye, desc: '结合知识库进行深度推理', color: '#45B7D1' },
  { step: '行动', icon: Zap, desc: '调用工具执行操作或生成回复', color: '#96CEB4' },
]

const benchmarkData = [
  { name: 'MMMU', k25v: 68.5, gpt4v: 69.1, claude3v: 66.3, qwen: 64.2, desc: '大学级多学科理解', icon: Brain },
  { name: 'MMBench', k25v: 85.2, gpt4v: 86.4, claude3v: 84.1, qwen: 82.5, desc: '综合视觉能力评测', icon: Layers },
  { name: 'MathVista', k25v: 72.1, gpt4v: 74.5, claude3v: 70.8, qwen: 68.9, desc: '数学图表推理', icon: Shapes },
  { name: 'OCRBench', k25v: 85.6, gpt4v: 88.2, claude3v: 86.5, qwen: 84.1, desc: '光学字符识别', icon: FileImage },
]

export default function KimiMultimodal() {
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
            <Image size={16} className="text-[#FF6B6B]" />
            <span className="text-sm text-[#FF6B6B] font-medium">Multimodal AI</span>
          </motion.div>
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="font-heading text-5xl font-bold text-white mb-4 md:text-6xl"
          >
            Kimi <span className="text-[#FF6B6B]">多模态解析</span>
          </motion.h1>
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mx-auto max-w-2xl text-lg text-slate-400"
          >
            Kimi-VL · K2.5V视觉Agent · 视觉原语
          </motion.p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        {/* ===== KIMI-VL ARCHITECTURE ===== */}
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
              <Eye size={22} className="text-[#FF6B6B]" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-white">Kimi-VL 架构</h2>
          </div>

          <p className="mb-6 text-slate-400">
            Kimi-VL采用经典的视觉编码器 + 大语言模型架构。视觉信号通过ViT编码器转换为视觉Token，
            与文本Token拼接后送入语言模型进行联合推理。
          </p>

          {/* Architecture Diagram */}
          <div className="mb-8 rounded-xl border border-slate-700/50 bg-slate-900/60 p-6">
            <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-6">
              {/* Input */}
              <div className="flex flex-col items-center">
                <div className="rounded-xl border border-[#FF6B6B]/30 bg-[#FF6B6B]/10 p-4">
                  <FileImage size={28} className="text-[#FF6B6B]" />
                </div>
                <span className="mt-2 text-xs text-slate-400">图像输入</span>
              </div>
              <ArrowRight size={20} className="text-slate-600 hidden md:block" />
              {/* Vision Encoder */}
              <div className="flex flex-col items-center">
                <div className="rounded-xl border border-[#4ECDC4]/30 bg-[#4ECDC4]/10 p-4">
                  <Monitor size={28} className="text-[#4ECDC4]" />
                </div>
                <span className="mt-2 text-xs text-slate-400">Vision Encoder (ViT)</span>
              </div>
              <ArrowRight size={20} className="text-slate-600 hidden md:block" />
              {/* Projector */}
              <div className="flex flex-col items-center">
                <div className="rounded-xl border border-[#45B7D1]/30 bg-[#45B7D1]/10 p-4">
                  <Layers size={28} className="text-[#45B7D1]" />
                </div>
                <span className="mt-2 text-xs text-slate-400">Projector</span>
              </div>
              <ArrowRight size={20} className="text-slate-600 hidden md:block" />
              {/* LLM */}
              <div className="flex flex-col items-center">
                <div className="rounded-xl border border-[#96CEB4]/30 bg-[#96CEB4]/10 p-4">
                  <Brain size={28} className="text-[#96CEB4]" />
                </div>
                <span className="mt-2 text-xs text-slate-400">LLM (Kimi)</span>
              </div>
              <ArrowRight size={20} className="text-slate-600 hidden md:block" />
              {/* Output */}
              <div className="flex flex-col items-center">
                <div className="rounded-xl border border-[#FFEAA7]/30 bg-[#FFEAA7]/10 p-4">
                  <Sparkles size={28} className="text-[#FFEAA7]" />
                </div>
                <span className="mt-2 text-xs text-slate-400">文本输出</span>
              </div>
            </div>
          </div>

          {/* Four-stage Pretraining */}
          <h3 className="font-heading text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <Layers size={20} className="text-[#4ECDC4]" />
            四阶段预训练流程
          </h3>
          <div className="grid gap-4 md:grid-cols-4">
            {pretrainingStages.map((s, idx) => (
              <motion.div
                key={s.stage}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                whileHover={{ y: -4 }}
                className="rounded-xl border p-5"
                style={{ borderColor: `${s.color}30`, backgroundColor: `${s.color}08` }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-xs" style={{ color: s.color }}>
                    {s.stage}
                  </span>
                  <span className="font-mono text-xs text-slate-500">{s.tokens}</span>
                </div>
                <h4 className="font-heading text-lg font-semibold text-white mb-1">{s.name}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
                <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-700/30">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: s.color }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${((idx + 1) / 4) * 100}%` }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ===== K2.5V VISION AGENT ===== */}
        <motion.div
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="liquid-glass mb-16 rounded-2xl border border-slate-700/50 p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-[#96CEB4]/15 p-2.5">
              <Bot size={22} className="text-[#96CEB4]" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-white">K2.5V 视觉Agent</h2>
          </div>

          <p className="mb-8 text-slate-400">
            K2.5V将Agentic Intelligence扩展至视觉领域，实现"看图→理解→推理→行动"的完整闭环。
            它不仅能描述图像，更能基于视觉信息执行复杂任务。
          </p>

          {/* Visual Agent Flow */}
          <div className="mb-8 grid gap-4 md:grid-cols-4">
            {visionAgentSteps.map((item, idx) => (
              <div key={item.step} className="relative">
                <motion.div
                  whileHover={{ y: -4 }}
                  className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-5 text-center"
                  style={{ borderColor: `${item.color}30` }}
                >
                  <div
                    className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${item.color}18` }}
                  >
                    <item.icon size={26} style={{ color: item.color }} />
                  </div>
                  <div className="font-heading text-lg font-semibold text-white">{item.step}</div>
                  <div className="mt-2 text-xs text-slate-400 leading-relaxed">{item.desc}</div>
                </motion.div>
                {idx < 3 && (
                  <div className="hidden md:flex absolute -right-2 top-1/2 z-10 items-center justify-center">
                    <ArrowRight size={18} className="text-slate-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Capabilities */}
          <h3 className="font-heading text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <ScanEye size={20} className="text-[#96CEB4]" />
            视觉Agent能力矩阵
          </h3>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { name: '视觉问答 (VQA)', desc: '基于图像内容回答开放式问题', level: 90 },
              { name: '图表解读', desc: '分析数据图表，提取趋势与洞察', level: 88 },
              { name: '文档OCR', desc: '识别扫描文档/手写文字', level: 92 },
              { name: 'UI自动化', desc: '理解界面元素，执行点击/输入', level: 85 },
              { name: '视觉推理', desc: '空间推理、物体关系分析', level: 82 },
              { name: '多图关联', desc: '跨多张图像进行信息整合', level: 80 },
            ].map((cap) => (
              <div
                key={cap.name}
                className="flex items-center gap-4 rounded-lg border border-slate-700/40 bg-slate-900/40 p-4"
              >
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{cap.name}</div>
                  <div className="text-xs text-slate-400">{cap.desc}</div>
                </div>
                <div className="w-20">
                  <div className="mb-1 text-right font-mono text-xs text-[#96CEB4]">{cap.level}</div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-slate-700/50">
                    <motion.div
                      className="h-full rounded-full bg-[#96CEB4]"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${cap.level}%` }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ===== BENCHMARK TABLE ===== */}
        <motion.div
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="liquid-glass mb-16 rounded-2xl border border-slate-700/50 p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-[#4ECDC4]/15 p-2.5">
              <Trophy size={22} className="text-[#4ECDC4]" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-white">视觉Benchmark对比</h2>
          </div>

          <div className="overflow-hidden rounded-xl border border-slate-700/50">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/80 text-slate-300">
                <tr>
                  <th className="px-5 py-4">Benchmark</th>
                  <th className="px-5 py-4 text-center">
                    <span className="text-[#FF6B6B]">K2.5V</span>
                  </th>
                  <th className="px-5 py-4 text-center text-slate-400">GPT-4V</th>
                  <th className="px-5 py-4 text-center text-slate-400">Claude-3V</th>
                  <th className="px-5 py-4 text-center text-slate-400">Qwen-VL</th>
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
                      <td className="px-5 py-4 text-center font-mono font-semibold text-[#FF6B6B]">
                        {row.k25v}%
                      </td>
                      <td className="px-5 py-4 text-center font-mono text-slate-300">{row.gpt4v}%</td>
                      <td className="px-5 py-4 text-center font-mono text-slate-400">{row.claude3v}%</td>
                      <td className="px-5 py-4 text-center font-mono text-slate-400">{row.qwen}%</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Visual Bars */}
          <div className="mt-8 space-y-5">
            {benchmarkData.map((row) => {
              const maxScore = Math.max(row.k25v, row.gpt4v, row.claude3v, row.qwen)
              return (
                <div key={row.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-sm font-medium text-white">{row.name}</span>
                    <span className="text-xs text-slate-500">{row.desc}</span>
                  </div>
                  <div className="grid gap-2 md:grid-cols-4">
                    {/* K2.5V */}
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-[#FF6B6B]">K2.5V</span>
                        <span className="font-mono font-semibold text-[#FF6B6B]">{row.k25v}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-700/50">
                        <motion.div
                          className="h-full rounded-full bg-[#FF6B6B]"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(row.k25v / maxScore) * 100}%` }}
                          transition={{ duration: 0.7 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                    {/* GPT-4V */}
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-slate-400">GPT-4V</span>
                        <span className="font-mono text-slate-300">{row.gpt4v}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-700/50">
                        <motion.div
                          className="h-full rounded-full bg-slate-500/60"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(row.gpt4v / maxScore) * 100}%` }}
                          transition={{ duration: 0.7 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                    {/* Claude-3V */}
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Claude-3V</span>
                        <span className="font-mono text-slate-400">{row.claude3v}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-700/50">
                        <motion.div
                          className="h-full rounded-full bg-slate-500/40"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(row.claude3v / maxScore) * 100}%` }}
                          transition={{ duration: 0.7 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                    {/* Qwen-VL */}
                    <div>
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-slate-400">Qwen-VL</span>
                        <span className="font-mono text-slate-400">{row.qwen}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-slate-700/50">
                        <motion.div
                          className="h-full rounded-full bg-slate-500/40"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${(row.qwen / maxScore) * 100}%` }}
                          transition={{ duration: 0.7 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* ===== PLAIN EXPLANATION ===== */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="liquid-glass rounded-2xl border border-[#FF6B6B]/20 p-8"
        >
          <div className="mb-4 flex items-center gap-3">
            <Lightbulb size={24} className="text-[#FFEAA7]" />
            <h3 className="font-heading text-2xl font-bold text-white">小白科普：VLM是什么？</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <p className="text-sm leading-relaxed text-slate-400 mb-4">
                <strong className="text-white">VLM（Vision Language Model）= 给AI装上眼睛</strong>。
                传统的大语言模型只能处理文字，就像一位盲人学者——知识渊博但看不到世界。
                VLM在语言模型基础上增加了视觉编码器，让AI能够：
              </p>
              <ul className="space-y-2">
                {[
                  '看懂照片里的物体和场景',
                  '解读图表中的数据趋势',
                  '识别文档中的印刷和手写文字',
                  '根据截图执行界面操作',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                    <Eye size={14} className="mt-0.5 shrink-0 text-[#FF6B6B]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-5">
              <div className="mb-4 flex items-center gap-2 text-sm font-medium text-white">
                <Camera size={16} className="text-[#4ECDC4]" />
                应用场景举例
              </div>
              <div className="space-y-3">
                {[
                  { scene: '拍照解题', desc: '拍一道数学题，AI识别并给出步骤' },
                  { scene: '文档数字化', desc: '扫描纸质文件，自动转为可编辑文本' },
                  { scene: '图表分析', desc: '上传销售报表，AI提取关键数据' },
                  { scene: '辅助驾驶', desc: '实时分析路况图像，预警风险' },
                ].map((app) => (
                  <div
                    key={app.scene}
                    className="flex items-center gap-3 rounded-lg border border-slate-700/30 bg-slate-800/40 p-3"
                  >
                    <span className="font-medium text-[#4ECDC4] text-sm">{app.scene}</span>
                    <span className="text-xs text-slate-400">{app.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-10 text-center text-sm text-slate-500">
        <p className="font-mono">Kimi Multimodal Analysis · Vision Language Model Deep Dive</p>
      </footer>
    </div>
  )
}
