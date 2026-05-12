import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Eye,
  Brain,
  Wrench,
  BarChart3,
  ArrowRight,
  Monitor,
  Hand,
  Globe,
  Code2,
  Search,
  PenTool,
  Zap,
  Layers,
  Sparkles,
  Cpu,
  ChevronRight,
  Bot,
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

const GlmMultimodal = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const multimodalBenchmarks = [
    {
      name: 'MMMU',
      icon: Brain,
      desc: '多学科多模态理解',
      glm4v: 56.2,
      gpt4v: 69.1,
      qwen: 64.2,
    },
    {
      name: 'MMBench',
      icon: BarChart3,
      desc: '综合视觉理解',
      glm4v: 78.5,
      gpt4v: 86.4,
      qwen: 82.5,
    },
    {
      name: 'TextVQA',
      icon: Eye,
      desc: '图像文字问答',
      glm4v: 78.2,
      gpt4v: 87.5,
      qwen: 81.3,
    },
  ]

  const tools = [
    { icon: Code2, name: '代码解释器', desc: '执行Python代码进行数据分析' },
    { icon: Search, name: '网页搜索', desc: '实时检索互联网信息' },
    { icon: PenTool, name: '绘图工具', desc: '生成图表和可视化内容' },
    { icon: Globe, name: '知识检索', desc: '查询结构化知识库' },
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
            <Eye className="w-10 h-10 text-[#22c55e]" />
            <span className="font-mono text-sm text-[#22c55e] tracking-widest uppercase">
              GLM Multimodal
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-[#22c55e] bg-clip-text text-transparent">
            GLM 多模态解析
          </h1>
          <p className="font-body text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            GLM-4V · 跨具身基础模型 · 工具调用
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="#glm4v"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#22c55e] text-black font-semibold hover:bg-[#16a34a] transition-colors"
            >
              探索多模态
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ====== GLM-4V ====== */}
      <section id="glm4v" className="relative z-10 px-6 py-20">
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
              <Eye className="w-8 h-8 text-[#22c55e]" />
              <h2 className={sectionTitle}>GLM-4V 视觉语言模型</h2>
            </div>
            <p className="font-body text-white/60 text-lg">
              融合视觉感知与语言理解的多模态大模型
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Layers, title: '视觉理解', desc: '分析图片、识别物体、理解场景关系并描述图像细节。' },
              { icon: Brain, title: '图文融合', desc: '视觉与语言深度融合，实现跨模态信息整合。' },
              { icon: Sparkles, title: '多场景应用', desc: '支持OCR、图表分析、文档理解、视觉问答等任务。' },
            ].map((item, idx) => (
              <motion.div key={item.title} className={glassCard} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={idx + 1} variants={fadeIn}>
                <item.icon className="w-8 h-8 text-[#22c55e] mb-4" />
                <h3 className="font-heading text-lg font-bold mb-2">{item.title}</h3>
                <p className="font-body text-white/70 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div className={glassCard} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={4} variants={fadeIn}>
            <h3 className="font-heading text-xl font-bold mb-6">GLM-4V 架构特点</h3>
            <div className="grid sm:grid-cols-4 gap-4">
              {[
                { step: '01', title: '图像编码', desc: 'Vision Encoder提取视觉特征' },
                { step: '02', title: '特征对齐', desc: '视觉-语言特征投影对齐' },
                { step: '03', title: '融合推理', desc: '跨模态注意力机制融合' },
                { step: '04', title: '文本生成', desc: '自回归生成回答文本' },
              ].map((item) => (
                <div key={item.step} className="bg-black/30 rounded-xl p-4 border border-white/5 hover:border-[#22c55e]/30 transition-colors">
                  <span className="font-mono text-xs text-[#22c55e] mb-2 block">{item.step}</span>
                  <h4 className="font-heading text-sm font-bold mb-1">{item.title}</h4>
                  <p className="font-body text-white/60 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== 跨具身基础模型 ====== */}
      <section id="embodied" className="relative z-10 px-6 py-20">
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
              <Bot className="w-8 h-8 text-[#22c55e]" />
              <h2 className={sectionTitle}>跨具身基础模型</h2>
            </div>
            <p className="font-body text-white/60 text-lg">
              CogAgent / CogVLM — 视觉感知+行动执行的智能体架构
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              { icon: Monitor, title: 'CogAgent', desc: '具备视觉感知和行动执行能力的大模型智能体，能"看懂"屏幕界面并执行点击、填写等操作。', items: ['高精度GUI元素识别和定位', '模拟鼠标点击、键盘输入等操作', '低延迟实时响应', '支持复杂多步骤任务'] },
              { icon: Cpu, title: 'CogVLM', desc: '开源视觉语言基础模型，通过视觉专家模块设计，在不牺牲NLP性能前提下实现强大的图像理解能力。', items: ['视觉专家模块不干扰语言能力', '深度视觉-语言特征融合', '支持高分辨率图像输入', '在VQA基准上表现优异'] },
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                className={glassCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx + 1}
                variants={fadeIn}
              >
                <div className="flex items-center gap-3 mb-4">
                  <card.icon className="w-8 h-8 text-[#22c55e]" />
                  <h3 className="font-heading text-xl font-bold">{card.title}</h3>
                </div>
                <p className="font-body text-white/70 leading-relaxed mb-4 text-sm">
                  {card.desc}
                </p>
                <div className="space-y-2">
                  {card.items.map((text, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-black/20 rounded-lg">
                      <Zap className="w-4 h-4 text-[#22c55e] shrink-0" />
                      <span className="font-body text-white/70 text-sm">{text}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className={glassCard}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            variants={fadeIn}
          >
            <h3 className="font-heading text-xl font-bold mb-4">支持多种具身平台</h3>
            <p className="font-body text-white/70 leading-relaxed mb-6 text-sm">
              CogAgent/CogVLM的跨具身设计可适配多种物理和虚拟平台。
            </p>
            <div className="grid sm:grid-cols-4 gap-4">
              {[
                { icon: Monitor, name: '桌面 GUI', desc: 'Windows / macOS / Linux' },
                { icon: Globe, name: '网页浏览器', desc: '自动化网页操作' },
                { icon: Hand, name: '移动设备', desc: 'Android / iOS 控制' },
                { icon: Bot, name: '机器人', desc: '具身智能机器人' },
              ].map((p) => (
                <div key={p.name} className="bg-black/30 rounded-xl p-4 text-center border border-white/5 hover:border-[#22c55e]/30 transition-colors">
                  <p.icon className="w-8 h-8 text-[#22c55e] mx-auto mb-2" />
                  <h4 className="font-heading text-sm font-bold">{p.name}</h4>
                  <p className="font-body text-white/50 text-xs mt-1">{p.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== All Tools 框架 ====== */}
      <section id="tools" className="relative z-10 px-6 py-20">
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
              <Wrench className="w-8 h-8 text-[#22c55e]" />
              <h2 className={sectionTitle}>All Tools 框架</h2>
            </div>
            <p className="font-body text-white/60 text-lg">
              代码解释器、搜索、绘图等工具调用 · Function Calling 架构
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              className={glassCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeIn}
            >
              <h3 className="font-heading text-xl font-bold mb-4">内置工具集</h3>
              <p className="font-body text-white/70 text-sm leading-relaxed mb-6">
                GLM 的 All Tools 框架提供了一系列即插即用的工具，模型可以根据用户需求自动选择并调用合适的工具完成任务。
              </p>
              <div className="space-y-3">
                {tools.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center gap-4 p-4 bg-black/30 rounded-xl border border-white/5 hover:border-[#22c55e]/20 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#22c55e]/10 flex items-center justify-center shrink-0">
                      <tool.icon className="w-5 h-5 text-[#22c55e]" />
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-bold">{tool.name}</h4>
                      <p className="font-body text-white/50 text-xs mt-0.5">{tool.desc}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20 ml-auto" />
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className={glassCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeIn}
            >
              <h3 className="font-heading text-xl font-bold mb-4">Function Calling 架构</h3>
              <p className="font-body text-white/70 text-sm leading-relaxed mb-4">
                GLM 支持标准化的 Function Calling 接口，使开发者能够定义自定义函数供模型调用，
                实现与外部系统的深度集成。
              </p>
              <div className="bg-black/40 rounded-xl p-5 border border-[#22c55e]/20 font-mono text-sm mb-4">
                <p className="text-[#22c55e] mb-2">// Function Calling 示例</p>
                <p className="text-white/70">
                  <span className="text-purple-400">functions</span> = [{'{'}
                </p>
                <p className="text-white/70 pl-4">
                  "name": <span className="text-green-400">"get_weather"</span>,
                </p>
                <p className="text-white/70 pl-4">
                  "parameters": {'{'}
                  <span className="text-green-400">"city"</span>: string {'}'}
                </p>
                <p className="text-white/70">{'}'}</p>
                <p className="text-[#22c55e] mt-2">// GLM 自动解析并调用</p>
              </div>
              <div className="space-y-2">
                {[
                  '模型自动识别何时需要调用工具',
                  '支持多工具串联调用（Chain of Tools）',
                  '结构化输出便于程序化处理',
                  '支持用户自定义函数注册',
                ].map((text, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Zap className="w-3 h-3 text-[#22c55e] mt-1 shrink-0" />
                    <span className="font-body text-white/60 text-xs">{text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div className={`${glassCard} border-[#22c55e]/30`} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3} variants={fadeIn}>
            <div className="flex items-start gap-4">
              <Sparkles className="w-8 h-8 text-[#22c55e] shrink-0 mt-1" />
              <div>
                <h3 className="font-heading text-lg font-bold mb-2">All Tools 核心优势</h3>
                <p className="font-body text-white/70 leading-relaxed">
                  All Tools使GLM从对话模型进化为能<strong className={accentText}>主动行动</strong>的智能助手。模型能主动规划、调用工具、获取信息并完成任务。这种<strong className={accentText}>工具增强的推理</strong>大幅拓展了大模型的应用边界。
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== BENCHMARK ====== */}
      <section id="benchmark" className="relative z-10 px-6 py-20">
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
              <BarChart3 className="w-8 h-8 text-[#22c55e]" />
              <h2 className={sectionTitle}>多模态 Benchmark 对比</h2>
            </div>
            <p className="font-body text-white/60 text-lg">
              GLM-4V 在主流视觉语言评测中的表现
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
                      GLM-4V
                    </th>
                    <th className="pb-4 pr-6 text-white/40 font-medium text-sm uppercase tracking-wider">
                      GPT-4V
                    </th>
                    <th className="pb-4 text-white/40 font-medium text-sm uppercase tracking-wider">
                      Qwen-VL
                    </th>
                  </tr>
                </thead>
                <tbody className="text-white/90">
                  {multimodalBenchmarks.map((row, idx) => (
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
                      <td className="py-5 pr-6 font-mono font-bold text-[#22c55e]">
                        {row.glm4v.toFixed(1)}
                      </td>
                      <td className="py-5 pr-6 font-mono text-white/40">{row.gpt4v.toFixed(1)}</td>
                      <td className="py-5 font-mono text-white/40">{row.qwen.toFixed(1)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { name: 'MMMU', icon: Brain, desc: '多学科多模态理解大学级别问题，涵盖科学、工程、人文等领域' },
              { name: 'MMBench', icon: BarChart3, desc: '综合性视觉理解评测，包含多种视觉感知和推理子任务' },
              { name: 'TextVQA', icon: Eye, desc: '图像中的文字理解和问答，测试 OCR 和推理结合能力' },
            ].map((item, idx) => (
              <motion.div
                key={item.name}
                className={glassCard}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={idx + 2}
                variants={fadeIn}
              >
                <div className="flex items-center gap-2 mb-3">
                  <item.icon className="w-5 h-5 text-[#22c55e]" />
                  <h4 className="font-heading text-sm font-bold">{item.name}</h4>
                </div>
                <p className="font-body text-white/60 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====== SUMMARY ====== */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div className={`${glassCard} border-[#22c55e]/30 text-center`} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} variants={fadeIn}>
            <Eye className="w-12 h-12 text-[#22c55e] mx-auto mb-4" />
            <h2 className="font-heading text-2xl font-bold mb-3">多模态能力总结</h2>
            <p className="font-body text-white/70 max-w-2xl mx-auto leading-relaxed">
              GLM-4V配合CogAgent/CogVLM的具身智能和All Tools框架，已发展为能够<strong className={accentText}>感知视觉</strong>、<strong className={accentText}>理解环境</strong>并<strong className={accentText}>执行行动</strong>的完整多模态AI系统，为自动化办公、智能客服、机器人控制等场景提供强大支撑。
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="relative z-10 h-20" />
    </div>
  )
}

export default GlmMultimodal
