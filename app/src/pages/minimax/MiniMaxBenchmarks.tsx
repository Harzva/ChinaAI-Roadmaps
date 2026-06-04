import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  Zap,
  Trophy,
  ArrowUpRight,
  Cpu,
  Activity,
  ChevronDown,
  ChevronUp,
  Star
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

interface BenchmarkRow {
  name: string;
  m3: number;
  reference: string;
  unit: string;
  note: string;
}

type SortConfig = { key: keyof BenchmarkRow; direction: 'asc' | 'desc' } | null;

const SortIcon = ({ columnKey, sortConfig }: { columnKey: keyof BenchmarkRow; sortConfig: SortConfig }) => {
  if (sortConfig?.key !== columnKey) return <ChevronDown className="w-3 h-3 text-white/20" />;
  return sortConfig.direction === 'asc'
    ? <ChevronUp className="w-3 h-3 text-[#ffb84d]" />
    : <ChevronDown className="w-3 h-3 text-[#ffb84d]" />;
};

const MiniMaxBenchmarks = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [sortConfig, setSortConfig] = useState<SortConfig>(null);

  const benchmarks: BenchmarkRow[] = [
    { name: 'SWE-Bench Pro', m3: 59.0, reference: '复杂代码修复', unit: '%', note: '官方披露 M3 在该项超过 GPT-5.5 与 Gemini 3.1 Pro，接近 Claude Opus 4.7。' },
    { name: 'Terminal-Bench 2.1', m3: 66.0, reference: '终端任务', unit: '%', note: '衡量模型在 shell、项目环境和命令执行链路中的问题解决能力。' },
    { name: 'BrowseComp', m3: 83.5, reference: '网页检索', unit: '%', note: '官方表格中高于 Claude Opus 4.7 的 79.3。' },
    { name: 'KernelBench Hard', m3: 28.8, reference: 'CUDA/Triton优化', unit: '%', note: '对应长程内核优化场景，官方案例给出 24 小时、1959 次工具调用的闭环优化。' },
    { name: 'MCP Atlas', m3: 74.2, reference: '工具/协议任务', unit: '%', note: '体现 Agent 调用外部工具和协议接口的稳定性。' },
  ];

  const sortedBenchmarks = [...benchmarks].sort((a, b) => {
    if (!sortConfig) return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  const handleSort = (key: keyof BenchmarkRow) => {
    if (sortConfig?.key === key) {
      setSortConfig({ key, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortConfig({ key, direction: 'desc' });
    }
  };

  const maxValue = Math.max(...benchmarks.map((row) => row.m3));

  const getBarWidth = (val: number) => `${(val / maxValue) * 100}%`;

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
                Benchmarks
              </span>
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-4 tracking-tight"
          >
            MiniMax <span className="text-[#ffb84d]">性能基准</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-body"
          >
            M3 在 Coding、终端、搜索、工具协议和内核优化上的官方 Benchmark
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-24 space-y-24">
        {/* ========== Benchmark 表格 ========== */}
        <section>
          <SectionTitle index={1}>Benchmark 对比</SectionTitle>
          <motion.p custom={2} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/60 mb-8 max-w-3xl">
            M3 的评测重点从单轮问答转向长程 Agent：代码仓库修复、终端执行、网页检索、工具协议和底层内核优化。下表保留官方披露指标，并把每项指标映射到实际开发场景。
          </motion.p>

          <motion.div custom={3} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <GlassCard>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-4">
                        <button onClick={() => handleSort('name')} className="flex items-center gap-1 text-white/50 font-medium hover:text-white/80 transition-colors">
                          Benchmark <SortIcon columnKey="name" sortConfig={sortConfig} />
                        </button>
                      </th>
                      <th className="text-center py-4 px-4">
                        <button onClick={() => handleSort('m3')} className="flex items-center gap-1 mx-auto text-[#ffb84d] font-heading font-semibold hover:text-[#ffcc80] transition-colors">
                          MiniMax M3 <SortIcon columnKey="m3" sortConfig={sortConfig} />
                          <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-[#ffb84d]/20 text-[#ffb84d]">NEW</span>
                        </button>
                      </th>
                      <th className="text-center py-4 px-4">
                        <button onClick={() => handleSort('reference')} className="flex items-center gap-1 mx-auto text-white/70 font-heading font-semibold hover:text-white/90 transition-colors">
                          场景 <SortIcon columnKey="reference" sortConfig={sortConfig} />
                        </button>
                      </th>
                      <th className="text-left py-4 px-4 text-white/50 font-medium">解读</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedBenchmarks.map((row) => (
                      <tr key={row.name} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                        <td className="py-5 px-4">
                          <div className="font-medium text-white">{row.name}</div>
                          <div className="text-white/30 text-xs mt-0.5">
                            Agent / Coding Evaluation
                          </div>
                        </td>
                        <td className="py-5 px-4">
                          <div className="text-center">
                            <span className="font-mono font-bold text-[#ffb84d]">{row.m3}{row.unit}</span>
                            <div className="w-full h-1.5 rounded-full bg-white/10 mt-2 overflow-hidden">
                              <div className="h-full rounded-full bg-[#ffb84d] transition-all" style={{ width: getBarWidth(row.m3) }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-4">
                          <span className="text-white/70 text-sm">{row.reference}</span>
                        </td>
                        <td className="py-5 px-4 text-white/50 text-xs leading-relaxed max-w-[320px]">
                          {row.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </motion.div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: 'SWE-Bench Pro', value: '59.0%', desc: '复杂代码修复', icon: BarChart3 },
              { label: 'Terminal-Bench', value: '66.0%', desc: '终端任务', icon: Cpu },
              { label: 'BrowseComp', value: '83.5%', desc: '网页检索', icon: Activity },
              { label: 'Claw-Eval', value: 'Top', desc: '端到端Agent', icon: TrendingUp },
            ].map((stat, _idx) => (
              <motion.div
                key={stat.label}
                custom={_idx + 4}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="liquid-glass rounded-xl p-4 text-center">
                  <stat.icon className="w-5 h-5 text-[#ffb84d] mx-auto mb-2" />
                  <div className="text-xl font-bold text-[#ffb84d] font-heading">{stat.value}</div>
                  <div className="text-white/50 text-xs">{stat.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========== 性价比突出 ========== */}
        <section>
          <SectionTitle index={2}>性价比突出</SectionTitle>
          <motion.p custom={3} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/60 mb-8 max-w-3xl">
            M3 的成本重点不只是单价，而是长程 Agent 在读仓库、扫日志、跑测试和多轮修复时会消耗大量 token。1M 上下文和 MSA 的组合，让长上下文成本可控。
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div custom={3} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="text-center h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#ffb84d]/10 rounded-full blur-2xl" />
                <div className="w-14 h-14 rounded-2xl bg-[#ffb84d]/20 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-7 h-7 text-[#ffb84d]" />
                </div>
                <div className="text-4xl font-bold text-[#ffb84d] font-heading mb-1">1M</div>
                <div className="text-white/50 text-sm mb-2">上下文窗口</div>
                <p className="text-white/40 text-xs">长仓库、长日志、长论文同线程处理</p>
              </GlassCard>
            </motion.div>
            <motion.div custom={4} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="text-center h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#ffb84d]/10 rounded-full blur-2xl" />
                <div className="w-14 h-14 rounded-2xl bg-[#ffb84d]/20 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-7 h-7 text-[#ffb84d]" />
                </div>
                <div className="text-4xl font-bold text-[#ffb84d] font-heading mb-1">1/20</div>
                <div className="text-white/50 text-sm mb-2">每token计算量</div>
                <p className="text-white/40 text-xs">官方披露的百万上下文优化指标</p>
              </GlassCard>
            </motion.div>
            <motion.div custom={5} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="text-center h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#ffb84d]/10 rounded-full blur-2xl" />
                <div className="w-14 h-14 rounded-2xl bg-[#ffb84d]/20 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-[#ffb84d]" />
                </div>
                <div className="text-4xl font-bold text-[#ffb84d] font-heading mb-1">100T+</div>
                <div className="text-white/50 text-sm mb-2">多模态数据管线</div>
                <p className="text-white/40 text-xs">官方披露的训练数据扩展量级</p>
              </GlassCard>
            </motion.div>
          </div>

          <motion.div custom={6} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <GlassCard>
              <h4 className="font-heading font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-[#ffb84d]" />
                为什么 M3 更适合长程 Agent？
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'MSA 长上下文', desc: '百万级上下文下减少不必要注意力连接，同时优化KV块读取路径' },
                  { title: '原生多模态', desc: '图片、视频、论文图表和桌面状态不再只是外接插件，而是进入统一训练空间' },
                  { title: 'MiniMax Code', desc: '模型能力直接服务仓库级开发、测试、调试和多轮任务修正' },
                  { title: '交互式训练', desc: '通过用户模拟器学习需求补充、方案讨论、反馈修正和任务切换' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <ArrowUpRight className="w-4 h-4 text-[#ffb84d] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium text-white/90 text-sm">{item.title}</div>
                      <div className="text-white/50 text-xs mt-1">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        </section>

        {/* ========== 真实环境 RL 优势 ========== */}
        <section>
          <SectionTitle index={3}>真实环境 RL 优势</SectionTitle>
          <motion.p custom={4} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/60 mb-8 max-w-3xl">
            M3 的评测和案例强调长时间闭环：不是一次性回答，而是持续计划、执行、验证、修正。官方披露的内核优化与论文复现案例正对应这种工作模式。
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div custom={4} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ffb84d]/20 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-[#ffb84d]" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">真实环境训练</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-4">
                  官方案例中，M3 在 FP8 GEMM 优化任务中从不可用的 Triton 骨架开始，持续约 24 小时执行 benchmark 和工具调用，最终将 Hopper FP8 硬件峰值利用率推进到 71.3%。
                </p>
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-medium text-sm">真实任务优势</span>
                  </div>
                  <p className="text-white/60 text-xs">
                    长程任务的关键是能否保持上下文、定位失败原因、继续实验并接受反馈。M3 的 MSA 与交互式训练正服务这一点。
                  </p>
                </div>
              </GlassCard>
            </motion.div>
            <motion.div custom={5} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#ffb84d]/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#ffb84d]" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">模拟环境 vs 真实环境</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <span className="text-red-400 font-medium text-sm">单轮代码生成</span>
                    </div>
                    <p className="text-white/50 text-xs">一次输出很难覆盖仓库结构、测试反馈、日志和用户变更</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-green-400 font-medium text-sm">长程Agent闭环（M3）</span>
                    </div>
                    <p className="text-white/50 text-xs">持续读取、执行、验证和修正，更接近真实开发协作</p>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-[#ffb84d]/10 border border-[#ffb84d]/20 text-center">
                  <div className="text-2xl font-bold text-[#ffb84d] font-heading">71.3%</div>
                  <div className="text-white/50 text-xs mt-1">官方案例中的FP8峰值利用率</div>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MiniMaxBenchmarks;
