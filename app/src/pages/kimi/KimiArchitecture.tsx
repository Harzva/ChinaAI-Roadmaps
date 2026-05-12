import { useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Cpu,
  Zap,
  BrainCircuit,
  GitBranch,
  Network,
  Compass,
  Bot,
  Eye,
  Target,
  AlertTriangle,
  ChevronRight,
  Terminal,
  GitMerge } from 'lucide-react'
import ParticleCanvas from '@/components/ParticleCanvas'

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }) }

const muonIterations = [
  { iter: 1, convergence: '0.85', stage: '快速收敛' },
  { iter: 2, convergence: '0.94', stage: '快速收敛' },
  { iter: 3, convergence: '0.97', stage: '快速收敛' },
  { iter: 4, convergence: '0.985', stage: '快速收敛' },
  { iter: 5, convergence: '0.992', stage: '快速收敛' },
  { iter: 6, convergence: '0.996', stage: '快速收敛' },
  { iter: 7, convergence: '0.998', stage: '快速收敛' },
  { iter: 8, convergence: '0.999', stage: '快速收敛' },
  { iter: 9, convergence: '0.9995', stage: '精确稳定' },
  { iter: 10, convergence: '0.9998', stage: '精确稳定' },
]

const muonCoefficients = [
  { letter: 'a', formula: 'a = 1 / (2\u00B7\u221A3)', purpose: '控制初始步长幅度', value: '0.2887' },
  { letter: 'b', formula: 'b = 1 / (2\u00B7\u221A3)', purpose: '平衡收敛速度与稳定性', value: '0.2887' },
  { letter: 'c', formula: 'c = 1 - 1/\u221A3', purpose: '阻尼因子防止震荡', value: '0.4226' },
]

const moeExperts = [
  { id: 'E1', domain: '数学推理', specialty: '数值计算、公式推导' },
  { id: 'E2', domain: '代码生成', specialty: '算法实现、调试优化' },
  { id: 'E3', domain: '语言理解', specialty: '语义分析、情感识别' },
  { id: 'E4', domain: '知识检索', specialty: '事实问答、百科查询' },
  { id: 'E5', domain: '逻辑推理', specialty: '因果分析、链条推理' },
  { id: 'E6', domain: '创意写作', specialty: '文案生成、故事创作' },
  { id: 'E7', domain: '多语言', specialty: '翻译、跨语言理解' },
  { id: 'E8', domain: '长文本', specialty: '文档摘要、信息提取' },
]

const agenticLoop = [
  { step: '感知', icon: Eye, desc: '接收用户输入，解析意图与上下文', color: '#4ECDC4' },
  { step: '规划', icon: Target, desc: '分解任务，制定执行策略与工具链', color: '#45B7D1' },
  { step: '执行', icon: Zap, desc: '调用工具/API，获取中间结果', color: '#96CEB4' },
  { step: '记忆', icon: BrainCircuit, desc: '存储上下文，反馈优化下一轮', color: '#FFEAA7' },
]

export default function KimiArchitecture() {
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
            <Cpu size={16} className="text-[#FF6B6B]" />
            <span className="text-sm text-[#FF6B6B] font-medium">Technical Deep Dive</span>
          </motion.div>
          <motion.h1
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="font-heading text-5xl font-bold text-white mb-4 md:text-6xl"
          >
            Kimi <span className="text-[#FF6B6B]">架构解析</span>
          </motion.h1>
          <motion.p
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="mx-auto max-w-2xl text-lg text-slate-400"
          >
            MoE万亿参数 · Muon优化器 · Agentic Intelligence框架
          </motion.p>
        </div>
      </section>

      {/* ===== NEWTON-SCHULZ ITERATION FORMULA ===== */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
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
              <Terminal size={22} className="text-[#FF6B6B]" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-white">Muon优化器 · Newton-Schulz迭代</h2>
          </div>
          <p className="mb-6 text-slate-400">
            Muon优化器通过Newton-Schulz五次迭代公式对梯度进行正交归一化，替代传统Adam中的逐元素更新。
            核心公式将任意矩阵快速映射到正交流形：
          </p>
          <div className="mb-8 rounded-xl bg-slate-900/80 border border-slate-700/50 p-6 font-mono text-sm leading-relaxed text-slate-300">
            <div className="text-[#4ECDC4] mb-2">// Newton-Schulz五次迭代 — Muon核心</div>
            <div className="text-[#FFEAA7]">X<sub>0</sub> = G / ||G||<sub>F</sub></div>
            <div className="mt-2 text-slate-400">for k = 0 to N-1:</div>
            <div className="pl-4 text-[#FF6B6B]">
              X<sub>k+1</sub> = b·X<sub>k</sub> + c·X<sub>k</sub>·(a·I - X<sub>k</sub><sup>T</sup>·X<sub>k</sub>)
            </div>
            <div className="mt-3 text-[#96CEB4]">// 其中 (a,b,c) 为预计算系数，确保三次收敛</div>
          </div>

          {/* Coefficient Table */}
          <h3 className="font-heading text-xl font-semibold text-white mb-4">Newton-Schulz 系数</h3>
          <div className="mb-8 overflow-hidden rounded-xl border border-slate-700/50">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/80 text-slate-300">
                <tr>
                  <th className="px-5 py-3 font-mono">系数</th>
                  <th className="px-5 py-3">公式</th>
                  <th className="px-5 py-3">数值</th>
                  <th className="px-5 py-3">作用</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {muonCoefficients.map((row) => (
                  <tr key={row.letter} className="bg-slate-900/40 hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3 font-mono text-[#FF6B6B] font-bold">{row.letter}</td>
                    <td className="px-5 py-3 font-mono text-slate-300">{row.formula}</td>
                    <td className="px-5 py-3 font-mono text-[#4ECDC4]">{row.value}</td>
                    <td className="px-5 py-3 text-slate-400">{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Iteration Convergence Table */}
          <h3 className="font-heading text-xl font-semibold text-white mb-4">10次迭代收敛过程</h3>
          <div className="overflow-hidden rounded-xl border border-slate-700/50">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-800/80 text-slate-300">
                <tr>
                  <th className="px-5 py-3">迭代次数</th>
                  <th className="px-5 py-3">收敛度</th>
                  <th className="px-5 py-3">阶段</th>
                  <th className="px-5 py-3">可视化</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {muonIterations.map((row) => (
                  <tr key={row.iter} className="bg-slate-900/40 hover:bg-slate-800/40 transition-colors">
                    <td className="px-5 py-3 font-mono text-white">{row.iter}</td>
                    <td className="px-5 py-3 font-mono text-[#4ECDC4]">{row.convergence}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`inline-flex rounded-full px-3 py-0.5 text-xs font-medium ${
                          row.stage === '快速收敛'
                            ? 'bg-[#4ECDC4]/15 text-[#4ECDC4]'
                            : 'bg-[#FFEAA7]/15 text-[#FFEAA7]'
                        }`}
                      >
                        {row.stage}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="h-2 w-40 overflow-hidden rounded-full bg-slate-700/50">
                        <motion.div
                          className={`h-full rounded-full ${
                            row.stage === '快速收敛' ? 'bg-[#4ECDC4]' : 'bg-[#FFEAA7]'
                          }`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${parseFloat(row.convergence) * 100}%` }}
                          transition={{ delay: row.iter * 0.08, duration: 0.6 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* ===== MOE ARCHITECTURE ===== */}
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
              <Network size={22} className="text-[#4ECDC4]" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-white">MoE 架构</h2>
          </div>

          <div className="mb-8 grid gap-6 md:grid-cols-3">
            {[
              { label: '总参数量', value: '1T', sub: '1 Trillion', color: '#FF6B6B' },
              { label: '激活参数', value: '32B', sub: '每轮前向传播', color: '#4ECDC4' },
              { label: '专家数量', value: '256+', sub: '细粒度专家', color: '#FFEAA7' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-6 text-center"
              >
                <div className="font-heading text-4xl font-bold" style={{ color: stat.color }}>
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-slate-400">{stat.label}</div>
                <div className="text-xs text-slate-500">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Routing Mechanism */}
          <div className="mb-8 rounded-xl bg-slate-900/60 border border-slate-700/50 p-6">
            <h3 className="font-heading text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <GitBranch size={20} className="text-[#4ECDC4]" />
              路由机制 · Top-K 专家选择
            </h3>
            <div className="font-mono text-sm leading-loose text-slate-300 space-y-1">
              <div className="text-slate-500">// 门控网络计算每个专家的权重</div>
              <div>
                gating_scores = softmax(router(<span className="text-[#FF6B6B]">hidden_state</span>))
              </div>
              <div>topk_weights, topk_indices = topk(gating_scores, <span className="text-[#4ECDC4]">k=8</span>)</div>
              <div className="text-slate-500 mt-2">// 负载均衡损失：确保专家均匀使用</div>
              <div>
                aux_loss = <span className="text-[#FFEAA7]">&alpha;</span> &times;{' '}
                <span className="text-[#96CEB4]">load_balance(router_probs, actual_load)</span>
              </div>
            </div>
          </div>

          {/* Expert List */}
          <h3 className="font-heading text-xl font-semibold text-white mb-4">专家分工示意</h3>
          <div className="grid gap-3 md:grid-cols-2">
            {moeExperts.map((expert) => (
              <div
                key={expert.id}
                className="flex items-start gap-3 rounded-lg border border-slate-700/40 bg-slate-900/40 p-4 hover:border-[#4ECDC4]/30 transition-colors"
              >
                <div className="rounded-md bg-[#4ECDC4]/10 px-2 py-1 font-mono text-xs text-[#4ECDC4]">
                  {expert.id}
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">{expert.domain}</div>
                  <div className="text-xs text-slate-400">{expert.specialty}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ===== AGENTIC INTELLIGENCE ===== */}
        <motion.div
          custom={2}
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
            <h2 className="font-heading text-3xl font-bold text-white">Agentic Intelligence 框架</h2>
          </div>

          {/* Agentic Loop */}
          <div className="mb-10 grid gap-4 md:grid-cols-4">
            {agenticLoop.map((item, idx) => (
              <div key={item.step} className="relative">
                <div
                  className="rounded-xl border border-slate-700/50 bg-slate-900/60 p-5 text-center"
                  style={{ borderColor: `${item.color}30` }}
                >
                  <div
                    className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${item.color}20` }}
                  >
                    <item.icon size={24} style={{ color: item.color }} />
                  </div>
                  <div className="font-heading text-lg font-semibold text-white">{item.step}</div>
                  <div className="mt-2 text-xs text-slate-400 leading-relaxed">{item.desc}</div>
                </div>
                {idx < 3 && (
                  <div className="hidden md:flex absolute -right-3 top-1/2 z-10 items-center justify-center">
                    <ChevronRight size={20} className="text-slate-600" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Tool Calling Architecture */}
          <div className="rounded-xl bg-slate-900/60 border border-slate-700/50 p-6">
            <h3 className="font-heading text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <GitMerge size={20} className="text-[#96CEB4]" />
              工具调用架构
            </h3>
            <div className="space-y-3">
              {[
                { tool: 'Web Search', desc: '实时信息检索，获取最新知识' },
                { tool: 'Code Interpreter', desc: '执行Python代码，进行数据计算' },
                { tool: 'File Operations', desc: '读写文件，处理长文档' },
                { tool: 'API Integration', desc: '调用外部服务，扩展能力边界' },
              ].map((t) => (
                <div
                  key={t.tool}
                  className="flex items-center gap-4 rounded-lg border border-slate-700/40 bg-slate-900/40 p-4"
                >
                  <div className="rounded-md bg-[#96CEB4]/10 px-3 py-1.5 font-mono text-xs text-[#96CEB4]">
                    {t.tool}
                  </div>
                  <span className="text-sm text-slate-300">{t.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ===== QK-CLIP ===== */}
        <motion.div
          custom={3}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="liquid-glass mb-16 rounded-2xl border border-slate-700/50 p-8"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="rounded-lg bg-[#FFEAA7]/15 p-2.5">
              <AlertTriangle size={22} className="text-[#FFEAA7]" />
            </div>
            <h2 className="font-heading text-3xl font-bold text-white">QK-Clip · 稳定MoE训练</h2>
          </div>
          <p className="mb-6 text-slate-400">
            QK-Clip（Query-Key Clipping）是Kimi团队提出的关键技术，用于解决大规模MoE训练中的数值不稳定问题。
            通过对注意力机制中的Query和Key矩阵进行裁剪，防止梯度爆炸，确保训练稳定。
          </p>
          <div className="rounded-xl bg-slate-900/80 border border-slate-700/50 p-6 font-mono text-sm leading-relaxed text-slate-300">
            <div className="text-[#FFEAA7] mb-2">// QK-Clip 核心逻辑</div>
            <div className="text-slate-500">// 限制Q·K^T乘积的幅度范围</div>
            <div>
              scaled_qk = (Q @ K.T) / sqrt(d_k)
            </div>
            <div className="text-[#FF6B6B] mt-1">
              clipped_qk = clip(scaled_qk, min=-clip_value, max=clip_value)
            </div>
            <div className="mt-1">
              attn_weights = softmax(clipped_qk)
            </div>
            <div className="mt-3 text-[#4ECDC4]">
              // 效果：消除训练发散风险，支持万亿参数稳定训练
            </div>
          </div>
        </motion.div>

        {/* ===== PLAIN EXPLANATION ===== */}
        <motion.div
          custom={4}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid gap-6 md:grid-cols-2"
        >
          {/* Muon = Compass */}
          <div className="liquid-glass rounded-2xl border border-[#FF6B6B]/20 p-6">
            <div className="mb-4 flex items-center gap-3">
              <Compass size={24} className="text-[#FF6B6B]" />
              <h3 className="font-heading text-xl font-bold text-white">Muon = 指南针</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              把Muon优化器想象成一个<strong className="text-slate-200">指南针</strong>：传统优化器（如AdamW）像在地图上随意试探每一步的方向，
              而Muon通过正交归一化确保每一步都指向真正"最优"的方向——就像指南针始终指向北方，
              <span className="text-[#FF6B6B]">不会重复探索同一个错误方向</span>。
              这使得训练速度提升约2倍，同时达到更好的最终效果。
            </p>
          </div>

          {/* Agentic = AI with Hands & Feet */}
          <div className="liquid-glass rounded-2xl border border-[#96CEB4]/20 p-6">
            <div className="mb-4 flex items-center gap-3">
              <Bot size={24} className="text-[#96CEB4]" />
              <h3 className="font-heading text-xl font-bold text-white">Agentic = 有手有脚的AI</h3>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              传统AI像一位<strong className="text-slate-200">只能动嘴的顾问</strong>，能回答问题但不能行动。
              Agentic Intelligence给AI装上了"手脚"——让它能够自主搜索网页、执行代码、读写文件、调用API。
              就像一个<span className="text-[#96CEB4]">能自己查资料、做计算、写报告的实习生</span>，
              独立完成复杂的多步骤任务。
            </p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-10 text-center text-sm text-slate-500">
        <p className="font-mono">Kimi Architecture Analysis · Built with React + Tailwind CSS</p>
      </footer>
    </div>
  )
}
