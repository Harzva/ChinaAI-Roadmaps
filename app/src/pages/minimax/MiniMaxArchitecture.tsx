import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Cpu,
  GitBranch,
  TrendingUp,
  Lightbulb,
  ChevronRight,
  ArrowRight,
  Layers,
  Target,
  BarChart3,
  Sparkles,
  CircleDot
} from 'lucide-react';
import ParticleCanvas from '@/components/ParticleCanvas';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } })
};

const SectionTitle = ({ children, index }: { children: React.ReactNode; index: number }) => (
  <motion.div custom={index} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-6">
    <div className="w-1 h-8 rounded-full bg-[#ffb84d]" />
    <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">{children}</h2>
  </motion.div>
);

const GlassCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`liquid-glass rounded-2xl p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

const MiniMaxArchitecture = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [activeTab, setActiveTab] = useState<'lightning' | 'flash' | 'standard'>('lightning');

  const attentionData = {
    lightning: { name: 'Lightning Attention', train: '-15%', infer: '-20%+', mem: 'Low', score: 9.5 },
    flash: { name: 'FlashAttention', train: 'Baseline', infer: 'Baseline', mem: 'Medium', score: 8.0 },
    standard: { name: '标准 Attention', train: '+30%', infer: '+50%', mem: 'High', score: 5.0 },
  };

  const ropetSteps = [
    { icon: GitBranch, label: 'Read', desc: '读取环境状态与任务描述', color: '#ffb84d' },
    { icon: CircleDot, label: 'Observe', desc: '观察关键信息与约束条件', color: '#ffcc80' },
    { icon: Lightbulb, label: 'Plan', desc: '制定多步行动计划', color: '#ffb84d' },
    { icon: Zap, label: 'Execute', desc: '执行工具调用与操作', color: '#ffcc80' },
    { icon: TrendingUp, label: 'Train', desc: 'RL反馈优化策略', color: '#ffb84d' },
  ];

  return (
    <div className="min-h-screen bg-[#050B14] text-white font-body">
      {/* ========== HERO ========== */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ParticleCanvas />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050B14] z-[1]" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-[#ffb84d]/20 text-[#ffb84d] text-sm font-mono border border-[#ffb84d]/30">
                MiniMax
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 text-white/70 text-sm font-mono border border-white/20">
                Technical Deep Dive
              </span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
          >
            MiniMax <span className="text-[#ffb84d]">架构解析</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-body"
          >
            Lightning Attention · MoE架构 · ROPET Agent框架
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-24 space-y-24">
        {/* ========== Lightning Attention ========== */}
        <section>
          <SectionTitle index={1}>Lightning Attention</SectionTitle>
          <motion.p custom={2} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/60 mb-8 max-w-3xl">
            Lightning Attention 是 MiniMax 自研的新一代注意力机制，从根本上替代了 FlashAttention，在训练和推理阶段均实现了显著的性能提升。
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <GlassCard>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#ffb84d]/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#ffb84d]" />
                </div>
                <h3 className="font-heading text-lg font-semibold">核心原理</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                Lightning Attention 通过重新设计注意力计算管线，消除了 FlashAttention 中冗余的内存读写操作。采用分块感知计算策略，使注意力头的计算与通信充分重叠，从而实现了接近理论峰值的硬件利用率。
              </p>
            </GlassCard>
            <GlassCard>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#ffb84d]/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-[#ffb84d]" />
                </div>
                <h3 className="font-heading text-lg font-semibold">实际效果</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-xl bg-[#ffb84d]/10 border border-[#ffb84d]/20">
                  <div className="text-3xl font-bold text-[#ffb84d] font-heading">-15%</div>
                  <div className="text-white/50 text-sm mt-1">训练时间</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-[#ffb84d]/10 border border-[#ffb84d]/20">
                  <div className="text-3xl font-bold text-[#ffb84d] font-heading">-20%+</div>
                  <div className="text-white/50 text-sm mt-1">推理延迟</div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Comparison Table */}
          <motion.div custom={3} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <GlassCard>
              <h3 className="font-heading text-lg font-semibold mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#ffb84d]" />
                注意力机制对比
              </h3>
              <div className="flex gap-2 mb-6 flex-wrap">
                {(['lightning', 'flash', 'standard'] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === key
                        ? 'bg-[#ffb84d] text-black'
                        : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
                    }`}
                  >
                    {attentionData[key].name}
                  </button>
                ))}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4 text-white/50 font-medium">指标</th>
                      {(['lightning', 'flash', 'standard'] as const).map((key) => (
                        <th key={key} className={`text-center py-3 px-4 font-heading font-semibold ${key === 'lightning' ? 'text-[#ffb84d]' : 'text-white/70'}`}>
                          {attentionData[key].name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-white/60">训练速度</td>
                      <td className="py-3 px-4 text-center text-[#ffb84d] font-mono font-semibold">快 15%</td>
                      <td className="py-3 px-4 text-center text-white/60 font-mono">Baseline</td>
                      <td className="py-3 px-4 text-center text-white/60 font-mono">慢 30%</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-white/60">推理速度</td>
                      <td className="py-3 px-4 text-center text-[#ffb84d] font-mono font-semibold">快 20%+</td>
                      <td className="py-3 px-4 text-center text-white/60 font-mono">Baseline</td>
                      <td className="py-3 px-4 text-center text-white/60 font-mono">慢 50%</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-white/60">内存占用</td>
                      <td className="py-3 px-4 text-center text-green-400 font-mono">Low</td>
                      <td className="py-3 px-4 text-center text-yellow-400 font-mono">Medium</td>
                      <td className="py-3 px-4 text-center text-red-400 font-mono">High</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-white/60">综合评分</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#ffb84d]/20 text-[#ffb84d] font-mono font-bold">
                          9.5
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/10 text-white/70 font-mono font-bold">
                          8.0
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-white/10 text-white/70 font-mono font-bold">
                          5.0
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* ========== MoE 架构 ========== */}
        <section>
          <SectionTitle index={2}>MoE 架构（M2.5）</SectionTitle>
          <motion.p custom={3} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/60 mb-8 max-w-3xl">
            MiniMax M2.5 采用稀疏 Mixture-of-Experts（MoE）架构，在保持强大表达能力的同时，实现了高效的推理计算。
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div custom={3} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="text-center h-full">
                <div className="w-14 h-14 rounded-2xl bg-[#ffb84d]/20 flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-7 h-7 text-[#ffb84d]" />
                </div>
                <div className="text-4xl font-bold text-[#ffb84d] font-heading mb-1">456B</div>
                <div className="text-white/50 text-sm">总参数量</div>
                <p className="text-white/40 text-xs mt-2">总专家参数规模</p>
              </GlassCard>
            </motion.div>
            <motion.div custom={4} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="text-center h-full">
                <div className="w-14 h-14 rounded-2xl bg-[#ffb84d]/20 flex items-center justify-center mx-auto mb-4">
                  <Cpu className="w-7 h-7 text-[#ffb84d]" />
                </div>
                <div className="text-4xl font-bold text-[#ffb84d] font-heading mb-1">45.6B</div>
                <div className="text-white/50 text-sm">激活参数量</div>
                <p className="text-white/40 text-xs mt-2">每次前向传播仅需 10% 参数</p>
              </GlassCard>
            </motion.div>
            <motion.div custom={5} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="text-center h-full">
                <div className="w-14 h-14 rounded-2xl bg-[#ffb84d]/20 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-7 h-7 text-[#ffb84d]" />
                </div>
                <div className="text-4xl font-bold text-[#ffb84d] font-heading mb-1">56</div>
                <div className="text-white/50 text-sm">专家数量</div>
                <p className="text-white/40 text-xs mt-2">路由选择 Top-K 专家激活</p>
              </GlassCard>
            </motion.div>
          </div>

          <motion.div custom={6} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <GlassCard>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#ffb84d]/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles className="w-5 h-5 text-[#ffb84d]" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold mb-2">MoE 架构优势</h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    MoE（混合专家）架构通过将模型参数划分为多个专家子网络，每次推理仅激活部分专家，实现了「大模型性能，小模型成本」的效果。MiniMax M2.5 的 456B 总参数中只有 45.6B 被激活，推理成本降低约 90%，同时在复杂任务上保持了与稠密大模型相当的性能水平。
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* ========== ROPET Agent 框架 ========== */}
        <section>
          <SectionTitle index={3}>ROPET Agent 框架</SectionTitle>
          <motion.p custom={4} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/60 mb-8 max-w-3xl">
            ROPET 是 MiniMax 专为 Agent 智能体设计的循环决策框架，覆盖从信息读取到策略优化的完整闭环。
          </motion.p>

          <div className="flex flex-col md:flex-row gap-4 mb-10">
            {ropetSteps.map((step, idx) => (
              <motion.div
                key={step.label}
                custom={idx + 4}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex-1 flex flex-col items-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${step.color}20`, border: `1px solid ${step.color}40` }}
                >
                  <step.icon className="w-7 h-7" style={{ color: step.color }} />
                </div>
                <div className="text-center">
                  <h4 className="font-heading font-bold text-white mb-1">{step.label}</h4>
                  <p className="text-white/50 text-xs leading-relaxed">{step.desc}</p>
                </div>
                {idx < ropetSteps.length - 1 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2">
                    <ChevronRight className="w-4 h-4 text-white/20" />
                  </div>
                )}
                <div className="md:hidden my-2">
                  <ArrowRight className="w-4 h-4 text-white/20 rotate-90" />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div custom={8} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <GlassCard>
              <h4 className="font-heading font-semibold mb-3 flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-[#ffb84d]" />
                循环强化学习
              </h4>
              <p className="text-white/60 text-sm leading-relaxed">
                ROPET 的核心创新在于最后一个环节 Train：每次 Agent 任务执行完成后，系统会自动收集执行轨迹和结果反馈，通过强化学习（RL）持续优化策略网络。这意味着 Agent 不是静态的，而是会随着使用不断进化，越用越聪明。这种「执行-反馈-优化」的闭环机制，使 MiniMax Agent 在复杂多步任务中表现出强大的自适应能力。
              </p>
            </GlassCard>
          </motion.div>
        </section>

        {/* ========== CISPO 优化器 ========== */}
        <section>
          <SectionTitle index={4}>CISPO 优化器</SectionTitle>
          <motion.p custom={5} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/60 mb-8 max-w-3xl">
            CISPO（Confidence Interval Policy Optimization）是 MiniMax 自研的 RL 训练稳定器，专门解决大规模语言模型强化训练中的不稳定性问题。
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div custom={5} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ffb84d]/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-[#ffb84d]" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">置信区间策略优化</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  CISPO 引入统计置信区间来控制策略更新的幅度，避免传统 PPO 算法中因单步更新过大导致的训练崩溃。通过动态调整学习率和策略约束，CISPO 确保每次更新都在「安全区间」内进行。
                </p>
                <div className="space-y-2">
                  {['训练稳定性提升 3×', '消除奖励黑客问题', '支持长程 RL 训练'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-white/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ffb84d]" />
                      {item}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
            <motion.div custom={6} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ffb84d]/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-[#ffb84d]" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">RL 训练稳定器</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  传统 RLHF 训练常常面临奖励坍塌、模式崩溃等问题。CISPO 通过置信区间的统计约束，为策略梯度提供了"安全护栏"，使得模型能够在探索新策略和利用已知策略之间找到最优平衡点。
                </p>
                <div className="p-4 rounded-xl bg-[#ffb84d]/10 border border-[#ffb84d]/20">
                  <div className="text-xs text-[#ffb84d] font-mono mb-1">核心公式思路</div>
                  <div className="text-sm text-white/80 font-mono">
                    update = clip(∇policy, lower_CI, upper_CI)
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* ========== 小白科普 ========== */}
        <section>
          <SectionTitle index={5}>小白科普</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div custom={6} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="border-l-4 border-l-[#ffb84d]">
                <div className="flex items-center gap-3 mb-3">
                  <Lightbulb className="w-6 h-6 text-[#ffb84d]" />
                  <h3 className="font-heading text-lg font-semibold">Lightning Attention = 闪电</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  Flash Attention 已经够快了，但 Lightning Attention 比它更快——就像闪电比闪光灯更快一样！这个名字取得很形象：Flash（闪光）是肉眼可见的，但 Lightning（闪电）是自然界真正的速度之王。Lightning Attention 在训练时快 15%，推理时快 20% 以上。
                </p>
              </GlassCard>
            </motion.div>
            <motion.div custom={7} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="border-l-4 border-l-[#ffb84d]">
                <div className="flex items-center gap-3 mb-3">
                  <Cpu className="w-6 h-6 text-[#ffb84d]" />
                  <h3 className="font-heading text-lg font-semibold">ROPET = 机器人五环</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  ROPET 的五个步骤（Read→Observe→Plan→Execute→Train）就像奥运五环一样环环相扣。Read 是「读题」，Observe 是「审题」，Plan 是「列计划」，Execute 是「动手做」，Train 是「复盘学习」。每完成一圈，Agent 就变聪明一点，这就是智能体的自我进化！
                </p>
              </GlassCard>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MiniMaxArchitecture;
