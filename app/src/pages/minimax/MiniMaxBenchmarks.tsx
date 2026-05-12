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
  m1: number;
  m25: number;
  gpt4o: number;
  claude35: number;
  unit: string;
}

const MiniMaxBenchmarks = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [sortConfig, setSortConfig] = useState<{ key: keyof BenchmarkRow; direction: 'asc' | 'desc' } | null>(null);

  const benchmarks: BenchmarkRow[] = [
    { name: 'MMLU', m1: 72.5, m25: 78.2, gpt4o: 87.2, claude35: 88.7, unit: '%' },
    { name: 'HumanEval', m1: 68.5, m25: 75.2, gpt4o: 90.2, claude35: 92.0, unit: '%' },
    { name: 'MBPP', m1: 65.2, m25: 72.8, gpt4o: 86.5, claude35: 87.3, unit: '%' },
    { name: 'GSM8K', m1: 82.1, m25: 88.5, gpt4o: 95.3, claude35: 96.4, unit: '%' },
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

  const SortIcon = ({ columnKey }: { columnKey: keyof BenchmarkRow }) => {
    if (sortConfig?.key !== columnKey) return <ChevronDown className="w-3 h-3 text-white/20" />;
    return sortConfig.direction === 'asc'
      ? <ChevronUp className="w-3 h-3 text-[#ffb84d]" />
      : <ChevronDown className="w-3 h-3 text-[#ffb84d]" />;
  };

  const maxValues = benchmarks.reduce((acc, row) => ({
    m1: Math.max(acc.m1, row.m1),
    m25: Math.max(acc.m25, row.m25),
    gpt4o: Math.max(acc.gpt4o, row.gpt4o),
    claude35: Math.max(acc.claude35, row.claude35),
  }), { m1: 0, m25: 0, gpt4o: 0, claude35: 0 });

  const getBarWidth = (val: number, max: number) => `${(val / max) * 100}%`;

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
            全面评测 M1 与 M2.5 在主流 Benchmark 上的表现
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-24 space-y-24">
        {/* ========== Benchmark 表格 ========== */}
        <section>
          <SectionTitle index={1}>Benchmark 对比</SectionTitle>
          <motion.p custom={2} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/60 mb-8 max-w-3xl">
            以下数据展示了 MiniMax M1 和 M2.5 在主流学术 Benchmark 上与 GPT-4o 和 Claude-3.5 的性能对比。M2.5 在各项任务上均有显著提升。
          </motion.p>

          <motion.div custom={3} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <GlassCard>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-4 px-4">
                        <button onClick={() => handleSort('name')} className="flex items-center gap-1 text-white/50 font-medium hover:text-white/80 transition-colors">
                          Benchmark <SortIcon columnKey="name" />
                        </button>
                      </th>
                      <th className="text-center py-4 px-4">
                        <button onClick={() => handleSort('m1')} className="flex items-center gap-1 mx-auto text-[#ffb84d] font-heading font-semibold hover:text-[#ffcc80] transition-colors">
                          M1 <SortIcon columnKey="m1" />
                        </button>
                      </th>
                      <th className="text-center py-4 px-4">
                        <button onClick={() => handleSort('m25')} className="flex items-center gap-1 mx-auto text-[#ffb84d] font-heading font-semibold hover:text-[#ffcc80] transition-colors">
                          M2.5 <SortIcon columnKey="m25" />
                          <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded bg-[#ffb84d]/20 text-[#ffb84d]">NEW</span>
                        </button>
                      </th>
                      <th className="text-center py-4 px-4">
                        <button onClick={() => handleSort('gpt4o')} className="flex items-center gap-1 mx-auto text-white/70 font-heading font-semibold hover:text-white/90 transition-colors">
                          GPT-4o <SortIcon columnKey="gpt4o" />
                        </button>
                      </th>
                      <th className="text-center py-4 px-4">
                        <button onClick={() => handleSort('claude35')} className="flex items-center gap-1 mx-auto text-white/70 font-heading font-semibold hover:text-white/90 transition-colors">
                          Claude-3.5 <SortIcon columnKey="claude35" />
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedBenchmarks.map((row, _idx) => (
                      <tr key={row.name} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                        <td className="py-5 px-4">
                          <div className="font-medium text-white">{row.name}</div>
                          <div className="text-white/30 text-xs mt-0.5">
                            {row.name === 'MMLU' && '多学科知识理解'}
                            {row.name === 'HumanEval' && '代码生成能力'}
                            {row.name === 'MBPP' && '编程问题解决'}
                            {row.name === 'GSM8K' && '数学推理'}
                          </div>
                        </td>
                        <td className="py-5 px-4">
                          <div className="text-center">
                            <span className="font-mono font-bold text-white/80">{row.m1}{row.unit}</span>
                            <div className="w-full h-1.5 rounded-full bg-white/10 mt-2 overflow-hidden">
                              <div className="h-full rounded-full bg-white/30 transition-all" style={{ width: getBarWidth(row.m1, maxValues.m1) }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-4">
                          <div className="text-center">
                            <span className="font-mono font-bold text-[#ffb84d]">{row.m25}{row.unit}</span>
                            <div className="w-full h-1.5 rounded-full bg-white/10 mt-2 overflow-hidden">
                              <div className="h-full rounded-full bg-[#ffb84d] transition-all" style={{ width: getBarWidth(row.m25, maxValues.m25) }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-4">
                          <div className="text-center">
                            <span className="font-mono font-bold text-white/80">{row.gpt4o}{row.unit}</span>
                            <div className="w-full h-1.5 rounded-full bg-white/10 mt-2 overflow-hidden">
                              <div className="h-full rounded-full bg-white/30 transition-all" style={{ width: getBarWidth(row.gpt4o, maxValues.gpt4o) }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-4">
                          <div className="text-center">
                            <span className="font-mono font-bold text-white/80">{row.claude35}{row.unit}</span>
                            <div className="w-full h-1.5 rounded-full bg-white/10 mt-2 overflow-hidden">
                              <div className="h-full rounded-full bg-white/30 transition-all" style={{ width: getBarWidth(row.claude35, maxValues.claude35) }} />
                            </div>
                          </div>
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
              { label: 'MMLU 提升', value: '+5.7%', desc: '知识理解', icon: BarChart3 },
              { label: 'HumanEval 提升', value: '+6.7%', desc: '代码能力', icon: Cpu },
              { label: 'MBPP 提升', value: '+7.6%', desc: '编程解题', icon: Activity },
              { label: 'GSM8K 提升', value: '+6.4%', desc: '数学推理', icon: TrendingUp },
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
            MiniMax M2.5 在保持强大性能的同时，推理成本极具竞争力，是企业和开发者的性价比之选。
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div custom={3} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="text-center h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#ffb84d]/10 rounded-full blur-2xl" />
                <div className="w-14 h-14 rounded-2xl bg-[#ffb84d]/20 flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="w-7 h-7 text-[#ffb84d]" />
                </div>
                <div className="text-4xl font-bold text-[#ffb84d] font-heading mb-1">$1/hr</div>
                <div className="text-white/50 text-sm mb-2">GPU 推理成本</div>
                <p className="text-white/40 text-xs">业界最具竞争力的推理定价</p>
              </GlassCard>
            </motion.div>
            <motion.div custom={4} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="text-center h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#ffb84d]/10 rounded-full blur-2xl" />
                <div className="w-14 h-14 rounded-2xl bg-[#ffb84d]/20 flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-7 h-7 text-[#ffb84d]" />
                </div>
                <div className="text-4xl font-bold text-[#ffb84d] font-heading mb-1">Top 3</div>
                <div className="text-white/50 text-sm mb-2">性能/成本比</div>
                <p className="text-white/40 text-xs">同等价格下性能最优</p>
              </GlassCard>
            </motion.div>
            <motion.div custom={5} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="text-center h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#ffb84d]/10 rounded-full blur-2xl" />
                <div className="w-14 h-14 rounded-2xl bg-[#ffb84d]/20 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-7 h-7 text-[#ffb84d]" />
                </div>
                <div className="text-4xl font-bold text-[#ffb84d] font-heading mb-1">10×</div>
                <div className="text-white/50 text-sm mb-2">成本优势</div>
                <p className="text-white/40 text-xs">相比同等性能模型</p>
              </GlassCard>
            </motion.div>
          </div>

          <motion.div custom={6} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <GlassCard>
              <h4 className="font-heading font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-[#ffb84d]" />
                为什么 MiniMax 性价比最优？
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'MoE 架构降本', desc: '45.6B 激活参数实现 456B 总参数的表达能力，推理成本仅为稠密模型的 10%' },
                  { title: 'Lightning Attention', desc: '推理速度快 20%+，同样的硬件资源可以服务更多请求' },
                  { title: '自研推理引擎', desc: '专为 MiniMax 模型优化的推理框架，极致的内存和计算效率' },
                  { title: '弹性扩缩容', desc: '智能调度系统根据负载自动扩缩容，避免资源浪费' },
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
            MiniMax 采用真实编程环境进行强化学习训练，而非模拟环境。这一策略使模型在真实世界任务中表现更优。
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
                  MiniMax 的 RL 训练在真实的编程环境中进行，模型可以直接执行代码、观察运行结果、调试错误。这种「真枪实弹」的训练方式让模型学会了处理真实世界中的各种边界情况和意外错误。
                </p>
                <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-medium text-sm">真实任务优势</span>
                  </div>
                  <p className="text-white/60 text-xs">
                    在真实编程任务上，MiniMax M2.5 的表现优于在模拟环境训练的同等规模模型，特别是在处理复杂错误和边界情况时。
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
                      <span className="text-red-400 font-medium text-sm">模拟环境训练</span>
                    </div>
                    <p className="text-white/50 text-xs">在预设场景中学习，遇到真实错误时容易「不知所措」</p>
                  </div>
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                      <span className="text-green-400 font-medium text-sm">真实环境训练（MiniMax）</span>
                    </div>
                    <p className="text-white/50 text-xs">在真实 IDE 中编程，直面真实错误，学会真正解决问题</p>
                  </div>
                </div>
                <div className="mt-4 p-3 rounded-lg bg-[#ffb84d]/10 border border-[#ffb84d]/20 text-center">
                  <div className="text-2xl font-bold text-[#ffb84d] font-heading">+15%</div>
                  <div className="text-white/50 text-xs mt-1">真实任务表现提升</div>
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
