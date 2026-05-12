import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Brain,
  Layers,
  Zap,
  BookOpen,
  Cpu,
  ArrowRight,
  GitCompare,
  Target,
  Sparkles,
  Lightbulb,
} from 'lucide-react'
import ParticleCanvas from '@/components/ParticleCanvas'

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
}

const glassCard =
  'liquid-glass rounded-2xl p-6 md:p-8 border border-white/10 backdrop-blur-xl bg-white/[0.03]'

const sectionTitle = 'font-heading text-2xl md:text-3xl font-bold text-white mb-4'

const accentText = 'text-[#22c55e] font-semibold'

const GlmArchitecture = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
            <Brain className="w-10 h-10 text-[#22c55e]" />
            <span className="font-mono text-sm text-[#22c55e] tracking-widest uppercase">
              GLM Architecture
            </span>
          </div>
          <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-white/90 to-[#22c55e] bg-clip-text text-transparent">
            GLM 架构解析
          </h1>
          <p className="font-body text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            自回归空白填空 · DSA动态稀疏注意力 · MoE架构
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="#autoregressive"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#22c55e] text-black font-semibold hover:bg-[#16a34a] transition-colors"
            >
              探索架构
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </section>

      {/* ====== 自回归空白填空 ====== */}
      <section id="autoregressive" className="relative z-10 px-6 py-20">
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
              <GitCompare className="w-8 h-8 text-[#22c55e]" />
              <h2 className={sectionTitle}>自回归空白填空（Autoregressive Blank Infilling）</h2>
            </div>
            <p className="font-body text-white/60 text-lg max-w-3xl">
              GLM的核心创新——统一自然语言理解与生成的预训练范式
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
              <Layers className="w-8 h-8 text-[#22c55e] mb-4" />
              <h3 className="font-heading text-xl font-bold mb-3">原理解释</h3>
              <p className="font-body text-white/70 leading-relaxed">
                GLM采用自回归空白填空（Autoregressive Blank Infilling）作为核心预训练目标。模型需要理解上下文信息，并以自回归方式逐步填充被掩码的文本片段，实现<strong className={accentText}>统一预训练</strong>。
              </p>
            </motion.div>
            <motion.div
              className={glassCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeIn}
            >
              <BookOpen className="w-8 h-8 text-[#22c55e] mb-4" />
              <h3 className="font-heading text-xl font-bold mb-3">核心公式</h3>
              <div className="bg-black/40 rounded-xl p-5 font-mono text-sm border border-[#22c55e]/20">
                <p className="text-[#22c55e] mb-2"># 掩码预测</p>
                <p className="text-white/90">[M] = [BLANK]</p>
                <p className="text-white/90 mt-2">input = [x1, x2, [M], x4, x5]</p>
                <p className="text-[#22c55e] mt-1">→ predict [M] autoregressively</p>
              </div>
            </motion.div>
          </div>

          {/* 对比表格 */}
          <motion.div
            className={glassCard}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            variants={fadeIn}
          >
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-6 h-6 text-[#22c55e]" />
              <h3 className="font-heading text-xl font-bold">GLM vs BERT vs GPT 对比</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full font-body text-left">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="pb-3 pr-6 text-white/50 font-medium">特性</th>
                    <th className="pb-3 pr-6 text-white/50 font-medium">BERT</th>
                    <th className="pb-3 pr-6 text-white/50 font-medium">GPT</th>
                    <th className="pb-3 text-[#22c55e] font-medium">GLM</th>
                  </tr>
                </thead>
                <tbody className="text-white/80">
                  <tr className="border-b border-white/5">
                    <td className="py-4 pr-6 font-medium">预训练范式</td>
                    <td className="py-4 pr-6">掩码语言模型</td>
                    <td className="py-4 pr-6">自回归生成</td>
                    <td className="py-4 text-[#22c55e]">自回归空白填空</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 pr-6 font-medium">理解能力</td>
                    <td className="py-4 pr-6 text-yellow-400">强</td>
                    <td className="py-4 pr-6 text-white/40">弱</td>
                    <td className="py-4 text-[#22c55e]">强</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 pr-6 font-medium">生成能力</td>
                    <td className="py-4 pr-6 text-white/40">弱</td>
                    <td className="py-4 pr-6 text-yellow-400">强</td>
                    <td className="py-4 text-[#22c55e]">强</td>
                  </tr>
                  <tr className="border-b border-white/5">
                    <td className="py-4 pr-6 font-medium">统一框架</td>
                    <td className="py-4 pr-6">
                      <span className="text-red-400">否</span>
                    </td>
                    <td className="py-4 pr-6">
                      <span className="text-red-400">否</span>
                    </td>
                    <td className="py-4">
                      <span className="text-[#22c55e]">是</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 font-medium">适用任务</td>
                    <td className="py-4 pr-6">仅理解类</td>
                    <td className="py-4 pr-6">仅生成类</td>
                    <td className="py-4 text-[#22c55e]">理解+生成</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== DSA 动态稀疏注意力 ====== */}
      <section id="dsa" className="relative z-10 px-6 py-20">
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
              <Zap className="w-8 h-8 text-[#22c55e]" />
              <h2 className={sectionTitle}>DSA 动态稀疏注意力</h2>
            </div>
            <p className="font-body text-white/60 text-lg max-w-3xl">
              Dynamic Sparse Attention — 根据输入内容动态调整注意力模式
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              className={glassCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={1}
              variants={fadeIn}
            >
              <Cpu className="w-8 h-8 text-[#22c55e] mb-4" />
              <h3 className="font-heading text-lg font-bold mb-2">核心原理</h3>
              <p className="font-body text-white/70 text-sm leading-relaxed">
                DSA根据输入序列的语义重要性动态调整注意力分布，重要token获得更密集的注意力计算，次要token则被稀疏化处理，大幅降低计算冗余。
              </p>
            </motion.div>

            <motion.div
              className={glassCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={2}
              variants={fadeIn}
            >
              <Sparkles className="w-8 h-8 text-[#22c55e] mb-4" />
              <h3 className="font-heading text-lg font-bold mb-2">计算效率</h3>
              <div className="font-mono text-4xl font-bold text-[#22c55e] mb-2">30%+</div>
              <p className="font-body text-white/70 text-sm leading-relaxed">
                相比标准注意力机制，DSA可降低超过30%的计算量，同时保持模型性能不受影响。
              </p>
            </motion.div>

            <motion.div
              className={glassCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={3}
              variants={fadeIn}
            >
              <Layers className="w-8 h-8 text-[#22c55e] mb-4" />
              <h3 className="font-heading text-lg font-bold mb-2">长上下文支持</h3>
              <p className="font-body text-white/70 text-sm leading-relaxed">
                DSA使GLM高效处理更长的上下文窗口，支持复杂文档分析、代码理解和多轮对话。
              </p>
            </motion.div>
          </div>

          <motion.div
            className={glassCard}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            variants={fadeIn}
          >
            <h3 className="font-heading text-xl font-bold mb-4">DSA 工作流程</h3>
            <div className="grid sm:grid-cols-4 gap-4">
              {[
                { step: '01', title: '输入分析', desc: '分析输入序列的语义结构' },
                { step: '02', title: '重要性评估', desc: '评估每个token的重要性' },
                { step: '03', title: '稀疏模式生成', desc: '动态生成注意力稀疏模式' },
                { step: '04', title: '高效计算', desc: '仅计算重要token的注意力' },
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

      {/* ====== MoE 架构 ====== */}
      <section id="moe" className="relative z-10 px-6 py-20">
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
              <Cpu className="w-8 h-8 text-[#22c55e]" />
              <h2 className={sectionTitle}>MoE 架构（GLM-4.5 / GLM-5）</h2>
            </div>
            <p className="font-body text-white/60 text-lg max-w-3xl">
              Mixture of Experts — 混合专家架构，用更少激活参数实现更强性能
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
              <h3 className="font-heading text-xl font-bold mb-6">关键参数</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl border border-[#22c55e]/20">
                  <div className="flex items-center gap-3">
                    <Layers className="w-5 h-5 text-[#22c55e]" />
                    <span className="font-body text-white/70">总参数量</span>
                  </div>
                  <span className="font-mono text-2xl font-bold text-[#22c55e]">355B</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl border border-[#22c55e]/20">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-[#22c55e]" />
                    <span className="font-body text-white/70">激活参数量</span>
                  </div>
                  <span className="font-mono text-2xl font-bold text-[#22c55e]">32B</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl border border-[#22c55e]/20">
                  <div className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-[#22c55e]" />
                    <span className="font-body text-white/70">激活比例</span>
                  </div>
                  <span className="font-mono text-2xl font-bold text-[#22c55e]">~9%</span>
                </div>
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
              <h3 className="font-heading text-xl font-bold mb-6">MoE 架构优势</h3>
              <div className="space-y-4">
                {[
                  { icon: Zap, text: '路由机制动态选择最相关的专家处理每个输入' },
                  { icon: Layers, text: '总参数355B但仅激活32B，大幅降低推理成本' },
                  { icon: Brain, text: '异步RL架构实现高效的后训练优化' },
                  { icon: Sparkles, text: '专家专业化使模型在各领域表现更优' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-black/20 rounded-lg">
                    <item.icon className="w-5 h-5 text-[#22c55e] mt-0.5 shrink-0" />
                    <span className="font-body text-white/70 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            className={glassCard}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={3}
            variants={fadeIn}
          >
            <h3 className="font-heading text-xl font-bold mb-4">异步RL架构</h3>
            <p className="font-body text-white/70 leading-relaxed mb-4">
              GLM-4.5/5 引入了<strong className={accentText}>异步强化学习</strong>（Asynchronous RL）架构，将训练与推理过程解耦，
              通过离线策略梯度优化实现高效的后训练对齐。这种设计使模型能够在保持高性能的同时，
              大幅降低训练资源消耗。
            </p>
            <div className="grid sm:grid-cols-3 gap-4 mt-6">
              {[
                { label: '训练效率', value: '2x+', desc: '相比同步RL' },
                { label: '策略优化', value: 'Offline', desc: '离线策略梯度' },
                { label: '对齐效果', value: 'SOTA', desc: '行业领先水平' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#22c55e]/10 rounded-xl p-4 text-center border border-[#22c55e]/20"
                >
                  <div className="font-mono text-2xl font-bold text-[#22c55e]">{stat.value}</div>
                  <div className="font-heading text-sm font-bold mt-1">{stat.label}</div>
                  <div className="font-body text-white/50 text-xs mt-1">{stat.desc}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====== 小白科普 ====== */}
      <section id="layman" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className={`${glassCard} border-[#22c55e]/30`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
            variants={fadeIn}
          >
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-8 h-8 text-[#22c55e]" />
              <h2 className={sectionTitle}>小白科普：什么是自回归填空？</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="font-body text-white/80 leading-relaxed mb-4">
                  自回归空白填空可以理解为<strong className={accentText}>高级版"完形填空"</strong>：
                </p>
                <div className="bg-black/40 rounded-xl p-5 border border-white/10 mb-4">
                  <p className="font-body text-white/90 leading-relaxed">
                    "春天来了，小草从[M]里钻了出来。"
                  </p>
                  <p className="font-body text-[#22c55e] mt-2 font-semibold">
                    → 填"土"/"泥土"（既理解上下文，又生成答案）
                  </p>
                </div>
                <p className="font-body text-white/70 leading-relaxed">
                  GLM的核心优势正是在于这个统一的框架——它不需要为理解和生成分别训练两个模型，
                  一个模型就能同时胜任<strong className={accentText}>阅读理解</strong>和<strong className={accentText}>文本创作</strong>两类任务。
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-black/30 rounded-xl p-5 border border-white/5">
                  <h4 className="font-heading text-sm font-bold text-[#22c55e] mb-2">
                    BERT 的做法（仅理解）
                  </h4>
                  <p className="font-body text-white/60 text-sm">
                    只预测被掩盖的单个词，不涉及生成连贯文本
                  </p>
                </div>
                <div className="bg-black/30 rounded-xl p-5 border border-white/5">
                  <h4 className="font-heading text-sm font-bold text-[#22c55e] mb-2">
                    GPT 的做法（仅生成）
                  </h4>
                  <p className="font-body text-white/60 text-sm">
                    只能从左到右生成文本，对已有文本的深度理解较弱
                  </p>
                </div>
                <div className="bg-[#22c55e]/10 rounded-xl p-5 border border-[#22c55e]/30">
                  <h4 className="font-heading text-sm font-bold text-[#22c55e] mb-2">
                    GLM 的做法（理解+生成）
                  </h4>
                  <p className="font-body text-white/80 text-sm">
                    既理解上下文语义，又以自回归方式生成完整内容
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="relative z-10 h-20" />
    </div>
  )
}

export default GlmArchitecture
