import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Zap,
  Layers,
  GitMerge,
  Route,
  Lightbulb,
  ArrowRight,
  BarChart3,
  Cpu,
  Timer,
  Users,
  Sparkles,
  Target
} from 'lucide-react';
import ParticleCanvas from '@/components/ParticleCanvas';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } })
};

const SectionTitle = ({ children, index }: { children: React.ReactNode; index: number }) => (
  <motion.div custom={index} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-center gap-3 mb-6">
    <div className="w-1 h-8 rounded-full bg-[#FF6900]" />
    <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">{children}</h2>
  </motion.div>
);

const GlassCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`liquid-glass rounded-2xl p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

const MimoArchitecture = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [showVisual, setShowVisual] = useState<'swa' | 'ga'>('swa');

  const mtpSteps = [
    { step: 1, label: '输入 Token', desc: '模型接收当前输入序列', color: '#FF6900' },
    { step: 2, label: '并行预测', desc: '同时预测多个未来 token', color: '#FF8533' },
    { step: 3, label: '验证筛选', desc: '用主模型验证候选 token', color: '#FF6900' },
    { step: 4, label: '接受输出', desc: '接受正确的 token 序列', color: '#FF8533' },
  ];

  const distillTeachers = [
    { name: '教师 A', specialty: '代码推理', color: '#FF6900' },
    { name: '教师 B', specialty: '数学推导', color: '#FF8533' },
    { name: '教师 C', specialty: '逻辑分析', color: '#FFA366' },
    { name: '学生模型', specialty: '综合能力', color: '#FF6900', isStudent: true },
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
              <span className="px-3 py-1 rounded-full bg-[#FF6900]/20 text-[#FF6900] text-sm font-mono border border-[#FF6900]/30">
                MiMo
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
            MiMo <span className="text-[#FF6900]">架构解析</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-body"
          >
            混合注意力 5:1 · MTP 推测解码 · MOPD 多教师蒸馏
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-24 space-y-24">
        {/* ========== 混合注意力 ========== */}
        <section>
          <SectionTitle index={1}>混合注意力（SWA:GA = 5:1）</SectionTitle>
          <motion.p custom={2} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/60 mb-8 max-w-3xl">
            MiMo 创新性地采用混合注意力机制，将滑动窗口注意力（SWA）与全局注意力（GA）按 5:1 比例混合，实现长文本高效处理与全局信息捕获的最佳平衡。
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div custom={2} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="text-center h-full">
                <div className="w-14 h-14 rounded-2xl bg-[#FF6900]/20 flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-7 h-7 text-[#FF6900]" />
                </div>
                <div className="text-4xl font-bold text-[#FF6900] font-heading mb-1">5:1</div>
                <div className="text-white/50 text-sm">SWA:GA 比例</div>
                <p className="text-white/40 text-xs mt-2">滑动窗口 : 全局注意力</p>
              </GlassCard>
            </motion.div>
            <motion.div custom={3} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="text-center h-full">
                <div className="w-14 h-14 rounded-2xl bg-[#FF6900]/20 flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-7 h-7 text-[#FF6900]" />
                </div>
                <div className="text-4xl font-bold text-[#FF6900] font-heading mb-1">-80%</div>
                <div className="text-white/50 text-sm">KV Cache 降低</div>
                <p className="text-white/40 text-xs mt-2">内存占用大幅减少</p>
              </GlassCard>
            </motion.div>
            <motion.div custom={4} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="text-center h-full">
                <div className="w-14 h-14 rounded-2xl bg-[#FF6900]/20 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-[#FF6900]" />
                </div>
                <div className="text-4xl font-bold text-[#FF6900] font-heading mb-1">2×</div>
                <div className="text-white/50 text-sm">长文本吞吐提升</div>
                <p className="text-white/40 text-xs mt-2">处理长文档更高效</p>
              </GlassCard>
            </motion.div>
          </div>

          <motion.div custom={5} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <GlassCard>
              <h3 className="font-heading text-lg font-semibold mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#FF6900]" />
                混合注意力工作原理
              </h3>
              <div className="flex gap-2 mb-6 flex-wrap">
                <button
                  onClick={() => setShowVisual('swa')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    showVisual === 'swa'
                      ? 'bg-[#FF6900] text-white'
                      : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
                  }`}
                >
                  滑动窗口注意力 (SWA)
                </button>
                <button
                  onClick={() => setShowVisual('ga')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    showVisual === 'ga'
                      ? 'bg-[#FF6900] text-white'
                      : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80'
                  }`}
                >
                  全局注意力 (GA)
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-white/[0.03] border border-white/5">
                  {showVisual === 'swa' ? (
                    <>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full bg-[#FF6900]" />
                        <h4 className="font-medium text-white/90">滑动窗口注意力</h4>
                      </div>
                      <p className="text-white/50 text-sm leading-relaxed mb-3">
                        每个 token 只关注固定窗口大小（如 4096）内的邻近 token，而非全部历史。这大幅减少了 KV Cache 的内存占用。
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-6 h-6 rounded-sm ${
                              i >= 8 ? 'bg-white/10' : 'bg-[#FF6900]/40'
                            }`}
                            title={`Token ${i + 1}`}
                          />
                        ))}
                      </div>
                      <p className="text-white/30 text-xs mt-2">橙色 = 参与注意力计算</p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full bg-[#FF8533]" />
                        <h4 className="font-medium text-white/90">全局注意力</h4>
                      </div>
                      <p className="text-white/50 text-sm leading-relaxed mb-3">
                        每个全局注意力头可以看到完整的输入序列，捕获远距离的语义依赖关系，确保模型不会遗漏关键信息。
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div key={i} className="w-6 h-6 rounded-sm bg-[#FF8533]/40" />
                        ))}
                      </div>
                      <p className="text-white/30 text-xs mt-2">全部 token 参与注意力</p>
                    </>
                  )}
                </div>
                <div className="p-5 rounded-xl bg-[#FF6900]/10 border border-[#FF6900]/20">
                  <h4 className="font-medium text-[#FF6900] mb-3">5:1 混合策略</h4>
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    在 MiMo 的注意力层中，每 6 个注意力头中有 5 个使用滑动窗口注意力，1 个使用全局注意力。这种不对称设计兼顾了效率与效果：大部分计算专注于局部上下文，少数「侦察兵」头负责全局信息整合。
                  </p>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex-1 h-8 rounded bg-[#FF6900]/30 flex items-center justify-center text-xs text-[#FF6900] font-mono">
                        SWA
                      </div>
                    ))}
                    <div className="flex-1 h-8 rounded bg-[#FF8533]/30 flex items-center justify-center text-xs text-[#FF8533] font-mono">
                      GA
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* ========== MTP 多Token预测 ========== */}
        <section>
          <SectionTitle index={2}>MTP 多 Token 预测</SectionTitle>
          <motion.p custom={3} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/60 mb-8 max-w-3xl">
            MTP（Multi-Token Prediction）让模型一次性预测多个未来 token，配合推测解码技术实现推理加速。
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div custom={3} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6900]/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-[#FF6900]" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">核心原理</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  传统模型每次只预测 1 个 token，然后将其加入输入继续预测。MTP 则让模型一次性预测多个（如 4 个）未来 token，然后用主模型并行验证这些候选 token，将验证通过的 token 批量接受。
                </p>
                <div className="p-4 rounded-xl bg-[#FF6900]/10 border border-[#FF6900]/20">
                  <div className="text-xs text-[#FF6900] font-mono mb-2">推测解码流程</div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <span className="w-5 h-5 rounded-full bg-[#FF6900]/20 text-[#FF6900] flex items-center justify-center text-xs font-mono">1</span>
                      小模型快速生成候选序列
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <span className="w-5 h-5 rounded-full bg-[#FF6900]/20 text-[#FF6900] flex items-center justify-center text-xs font-mono">2</span>
                      大模型并行验证候选 token
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/70">
                      <span className="w-5 h-5 rounded-full bg-[#FF6900]/20 text-[#FF6900] flex items-center justify-center text-xs font-mono">3</span>
                      接受匹配 token，拒绝处回退
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
            <motion.div custom={4} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="h-full text-center">
                <div className="flex items-center gap-3 mb-4 justify-center">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6900]/20 flex items-center justify-center">
                    <Timer className="w-5 h-5 text-[#FF6900]" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">加速效果</h3>
                </div>
                <div className="text-5xl font-bold text-[#FF6900] font-heading mb-2">2.6×</div>
                <div className="text-white/50 text-sm mb-4">推测解码加速比</div>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 text-left">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-white/50">传统解码</span>
                    <span className="text-white/70 font-mono">1×</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10 mb-3">
                    <div className="h-full rounded-full bg-white/30" style={{ width: '38%' }} />
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-[#FF6900]">MTP 推测解码</span>
                    <span className="text-[#FF6900] font-mono font-bold">2.6×</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-[#FF6900]" style={{ width: '100%' }} />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* MTP Steps Flow */}
          <motion.div custom={5} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <GlassCard>
              <h4 className="font-heading font-semibold mb-6 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FF6900]" />
                MTP 工作流程
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {mtpSteps.map((s, idx) => (
                  <div key={s.step} className="relative">
                    <div
                      className="p-4 rounded-xl border text-center"
                      style={{ backgroundColor: `${s.color}10`, borderColor: `${s.color}30` }}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 text-sm font-bold font-mono"
                        style={{ backgroundColor: `${s.color}20`, color: s.color }}
                      >
                        {s.step}
                      </div>
                      <div className="font-medium text-white/90 text-sm mb-1">{s.label}</div>
                      <div className="text-white/40 text-xs">{s.desc}</div>
                    </div>
                    {idx < mtpSteps.length - 1 && (
                      <div className="hidden lg:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                        <ArrowRight className="w-4 h-4 text-white/20" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* ========== MOPD 多教师蒸馏 ========== */}
        <section>
          <SectionTitle index={3}>MOPD 多教师蒸馏</SectionTitle>
          <motion.p custom={4} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/60 mb-8 max-w-3xl">
            MOPD（Multi-teacher Online Policy Distillation）是 MiMo 独创的蒸馏技术，通过多个专家教师同时指导一个学生模型，解决模型合并时的能力互斥问题。
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div custom={4} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6900]/20 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#FF6900]" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">核心原理</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  传统蒸馏通常只有一个教师模型，难以将多种专业能力同时传递给学生。MOPD 引入多个专家教师，每个教师擅长不同领域（代码、数学、逻辑等），通过在线策略协调机制，让学生模型同时学习多位专家的精华。
                </p>
                <div className="p-4 rounded-xl bg-[#FF6900]/10 border border-[#FF6900]/20">
                  <div className="text-xs text-[#FF6900] font-mono mb-2">解决的核心问题</div>
                  <p className="text-white/60 text-sm">
                    模型合并时不同能力之间的「互斥效应」——两个各有所长的模型合并后，往往一个能力变强另一个变弱。MOPD 通过蒸馏而非合并来融合能力。
                  </p>
                </div>
              </GlassCard>
            </motion.div>
            <motion.div custom={5} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6900]/20 flex items-center justify-center">
                    <GitMerge className="w-5 h-5 text-[#FF6900]" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">蒸馏架构</h3>
                </div>
                <div className="space-y-3">
                  {distillTeachers.map((t) => (
                    <div
                      key={t.name}
                      className={`flex items-center gap-3 p-3 rounded-lg border ${
                        t.isStudent
                          ? 'bg-[#FF6900]/10 border-[#FF6900]/30'
                          : 'bg-white/[0.03] border-white/5'
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: `${t.color}20`, color: t.color }}
                      >
                        {t.isStudent ? 'S' : 'T'}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-white/90">{t.name}</div>
                        <div className="text-white/40 text-xs">{t.specialty}</div>
                      </div>
                      {!t.isStudent && (
                        <div className="flex items-center gap-1 text-xs text-[#FF6900]">
                          <ArrowRight className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* ========== R3 路由回放 ========== */}
        <section>
          <SectionTitle index={4}>R3 路由回放</SectionTitle>
          <motion.p custom={5} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/60 mb-8 max-w-3xl">
            R3（Route Replay and Rectification）是 MiMo 专为 MoE 架构在 RL 训练中设计的路由一致性保持技术。
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div custom={5} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6900]/20 flex items-center justify-center">
                    <Route className="w-5 h-5 text-[#FF6900]" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">路由不一致问题</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  MoE 模型在强化学习（RL）训练中面临一个独特挑战：路由不一致。由于 RL 会改变模型的策略分布，导致 token 被路由到不同的专家，破坏了训练稳定性，造成专家负载失衡和性能下降。
                </p>
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="text-red-400 text-sm font-medium">症状</span>
                  </div>
                  <ul className="text-white/50 text-xs space-y-1">
                    <li>• 专家负载严重失衡</li>
                    <li>• 部分专家「饿死」不被使用</li>
                    <li>• RL 训练后期性能反而下降</li>
                  </ul>
                </div>
              </GlassCard>
            </motion.div>
            <motion.div custom={6} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6900]/20 flex items-center justify-center">
                    <Lightbulb className="w-5 h-5 text-[#FF6900]" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">R3 解决方案</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  R3 通过「路由回放与校正」机制，记录并回放训练初期的健康路由模式，同时在线校正偏离过大的路由决策，确保 MoE 在 RL 训练全过程中保持路由一致性。
                </p>
                <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    <span className="text-green-400 text-sm font-medium">R3 核心步骤</span>
                  </div>
                  <ul className="text-white/50 text-xs space-y-1">
                    <li>• 记录 SFT 阶段的健康路由分布</li>
                    <li>• RL 训练时回放参考路由模式</li>
                    <li>• 在线校正偏离过大的路由</li>
                    <li>• 保持专家负载均衡</li>
                  </ul>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MimoArchitecture;
