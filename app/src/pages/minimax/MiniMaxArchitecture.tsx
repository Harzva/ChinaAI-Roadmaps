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
  CircleDot,
  Eye,
  Code2,
  Network
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

  const [activeTab, setActiveTab] = useState<'msa' | 'moba' | 'full'>('msa');

  const attentionData = {
    msa: { name: 'MSA', train: '1/20 compute', infer: '9×/15×+', mem: 'Sparse', score: 9.6 },
    moba: { name: 'MoBA/DSA类动态稀疏', train: 'Block sparse', infer: 'Dynamic', mem: 'Medium', score: 8.5 },
    full: { name: '全注意力', train: 'O(n²)', infer: 'High latency', mem: 'High', score: 5.0 },
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
            MSA稀疏注意力 · 1M上下文 · 原生多模态 · MiniMax Code
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-24 space-y-24">
        {/* ========== MiniMax Sparse Attention ========== */}
        <section>
          <SectionTitle index={1}>MiniMax Sparse Attention</SectionTitle>
          <motion.p custom={2} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/60 mb-8 max-w-3xl">
            M3 的核心注意力路线是 MSA（MiniMax Sparse Attention）。它把 1M 上下文的难题拆成两部分：先用动态稀疏找到关键 KV，再用更适合 GPU 的访存顺序把剩余连接算快。
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <GlassCard>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#ffb84d]/20 flex items-center justify-center">
                  <Network className="w-5 h-5 text-[#ffb84d]" />
                </div>
                <h3 className="font-heading text-lg font-semibold">核心原理</h3>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">
                MSA 通过更精细的 KV 分块提升有效上下文覆盖，同时采用 KV outer gather Q 的算子组织方式，使每个 KV 块尽量只读一次，降低随机访存和重复加载带来的实际延迟。
              </p>
            </GlassCard>
            <GlassCard>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#ffb84d]/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-[#ffb84d]" />
                </div>
                <h3 className="font-heading text-lg font-semibold">官方披露效果</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-xl bg-[#ffb84d]/10 border border-[#ffb84d]/20">
                  <div className="text-3xl font-bold text-[#ffb84d] font-heading">1/20</div>
                  <div className="text-white/50 text-sm mt-1">1M下每token计算量</div>
                </div>
                <div className="text-center p-4 rounded-xl bg-[#ffb84d]/10 border border-[#ffb84d]/20">
                  <div className="text-3xl font-bold text-[#ffb84d] font-heading">9×/15×</div>
                  <div className="text-white/50 text-sm mt-1">prefill / decode加速</div>
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
                {(['msa', 'moba', 'full'] as const).map((key) => (
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
                      {(['msa', 'moba', 'full'] as const).map((key) => (
                        <th key={key} className={`text-center py-3 px-4 font-heading font-semibold ${key === 'msa' ? 'text-[#ffb84d]' : 'text-white/70'}`}>
                          {attentionData[key].name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-white/60">百万上下文成本</td>
                      <td className="py-3 px-4 text-center text-[#ffb84d] font-mono font-semibold">1/20 compute</td>
                      <td className="py-3 px-4 text-center text-white/60 font-mono">动态稀疏</td>
                      <td className="py-3 px-4 text-center text-white/60 font-mono">O(n²)</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-white/60">Prefill / Decode</td>
                      <td className="py-3 px-4 text-center text-[#ffb84d] font-mono font-semibold">9× / 15×+</td>
                      <td className="py-3 px-4 text-center text-white/60 font-mono">取决于块命中</td>
                      <td className="py-3 px-4 text-center text-white/60 font-mono">长输入高延迟</td>
                    </tr>
                    <tr className="border-b border-white/5">
                      <td className="py-3 px-4 text-white/60">KV读取</td>
                      <td className="py-3 px-4 text-center text-green-400 font-mono">连续、低重复</td>
                      <td className="py-3 px-4 text-center text-yellow-400 font-mono">Medium</td>
                      <td className="py-3 px-4 text-center text-red-400 font-mono">High</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 text-white/60">综合评分</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-[#ffb84d]/20 text-[#ffb84d] font-mono font-bold">
                          9.6
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

        {/* ========== M3 Frontier Agent 三件套 ========== */}
        <section>
          <SectionTitle index={2}>M3 Frontier Agent 三件套</SectionTitle>
          <motion.p custom={3} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/60 mb-8 max-w-3xl">
            M3 的定位不是单项模型升级，而是把 Coding Frontier+、1M 上下文窗口、原生多模态三类能力放在同一个开放权重模型中协同工作。
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div custom={3} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="text-center h-full">
                <div className="w-14 h-14 rounded-2xl bg-[#ffb84d]/20 flex items-center justify-center mx-auto mb-4">
                  <Code2 className="w-7 h-7 text-[#ffb84d]" />
                </div>
                <div className="text-4xl font-bold text-[#ffb84d] font-heading mb-1">Coding</div>
                <div className="text-white/50 text-sm">Frontier+</div>
                <p className="text-white/40 text-xs mt-2">面向仓库级修复、终端操作和长期工具轨迹</p>
              </GlassCard>
            </motion.div>
            <motion.div custom={4} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="text-center h-full">
                <div className="w-14 h-14 rounded-2xl bg-[#ffb84d]/20 flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-7 h-7 text-[#ffb84d]" />
                </div>
                <div className="text-4xl font-bold text-[#ffb84d] font-heading mb-1">1M</div>
                <div className="text-white/50 text-sm">上下文窗口</div>
                <p className="text-white/40 text-xs mt-2">MSA 支撑长日志、长仓库、长论文级记忆</p>
              </GlassCard>
            </motion.div>
            <motion.div custom={5} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="text-center h-full">
                <div className="w-14 h-14 rounded-2xl bg-[#ffb84d]/20 flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-7 h-7 text-[#ffb84d]" />
                </div>
                <div className="text-4xl font-bold text-[#ffb84d] font-heading mb-1">Native</div>
                <div className="text-white/50 text-sm">多模态</div>
                <p className="text-white/40 text-xs mt-2">图像、视频、桌面状态进入同一语义空间</p>
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
                    对 Coding Agent 来说，这三项能力不能拆开看：长程开发需要 1M 级上下文承接仓库、日志和多轮反馈；多模态负责理解截图、论文图表和桌面界面；Coding 能力决定工具调用、测试修复和最终提交质量。
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* ========== ROPET Agent 框架 ========== */}
        <section>
          <SectionTitle index={3}>MiniMax Code 与 Agent 闭环</SectionTitle>
          <motion.p custom={4} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/60 mb-8 max-w-3xl">
            M3 同步更新了 MiniMax Code。它把模型能力落到开发者日常：读项目、计划修改、执行命令、查看报错、继续修复，并在长上下文中保留完整任务轨迹。
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
                MiniMax Code 的关键不在单次生成代码，而在长时间闭环：读取上下文、观察环境、规划下一步、执行工具调用，再根据测试和用户反馈修正。M3 的长上下文和多模态能力正是为这种闭环提供底座。
              </p>
            </GlassCard>
          </motion.div>
        </section>

        {/* ========== CISPO 优化器 ========== */}
        <section>
          <SectionTitle index={4}>从 CISPO / Forge RL 到交互式训练</SectionTitle>
          <motion.p custom={5} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/60 mb-8 max-w-3xl">
            M1/M2.5 阶段的 CISPO 与 Forge RL 让 MiniMax 聚焦真实环境强化学习；M3 进一步强调交互式用户模拟器，让模型学习多轮协作、需求补充、失败修正和长程任务切换。
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
                  CISPO 引入统计置信区间来控制策略更新幅度，Forge RL 负责大规模真实环境训练。M3 在此基础上强化交互式训练，让模型面对更接近真实开发协作的多轮任务。
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
                  Coding Agent 的训练目标正在从「一次生成正确代码」转向「持续完成长期协作任务」。这需要模型能记住前文状态、评估工具失败、接受反馈并重新规划。
                </p>
                <div className="p-4 rounded-xl bg-[#ffb84d]/10 border border-[#ffb84d]/20">
                  <div className="text-xs text-[#ffb84d] font-mono mb-1">核心公式思路</div>
                  <div className="text-sm text-white/80 font-mono">
                    loop = plan → execute → verify → revise
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
                  <h3 className="font-heading text-lg font-semibold">MSA = 给长上下文装索引</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  1M 上下文不是把书全摊在桌上让模型逐页看，而是先快速定位哪些 KV 块可能相关，再对关键部分精算。MSA 的价值就是让模型在很长的材料里更快找到真正要看的位置。
                </p>
              </GlassCard>
            </motion.div>
            <motion.div custom={7} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="border-l-4 border-l-[#ffb84d]">
                <div className="flex items-center gap-3 mb-3">
                  <Cpu className="w-6 h-6 text-[#ffb84d]" />
                  <h3 className="font-heading text-lg font-semibold">MiniMax Code = 长程开发同事</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">
                  它不是只回答“这段代码怎么写”，而是围绕一个项目持续工作：读仓库、理解报错、改文件、跑测试、复盘失败，再继续下一轮。这正是 M3 三件套要服务的场景。
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
