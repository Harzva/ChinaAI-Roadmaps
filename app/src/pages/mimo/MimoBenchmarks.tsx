import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Trophy,
  Zap,
  Crown,
  ArrowUpRight,
  Star,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Target,
  Flame,
  Award
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

interface BenchmarkRow {
  name: string;
  mimo7b: number;
  mimo7brl: number;
  o1mini: string;
  gpt4o: string;
  highlight?: 'mimo7brl';
}

const MimoBenchmarks = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [sortConfig, setSortConfig] = useState<{ key: 'name' | 'mimo7b' | 'mimo7brl'; direction: 'asc' | 'desc' } | null>(null);

  const benchmarks: BenchmarkRow[] = [
    { name: 'AIME 2025', mimo7b: 32.1, mimo7brl: 55.4, o1mini: '~50', gpt4o: '—', highlight: 'mimo7brl' },
    { name: 'LiveCodeBench', mimo7b: 38.5, mimo7brl: 49.3, o1mini: '~45', gpt4o: '43.2', highlight: 'mimo7brl' },
    { name: 'GPQA Diamond', mimo7b: 41.2, mimo7brl: 54.4, o1mini: '~50', gpt4o: '53.6', highlight: 'mimo7brl' },
    { name: 'MATH', mimo7b: 45.2, mimo7brl: 62.8, o1mini: '56.7', gpt4o: '72.6' },
  ];

  const sortedBenchmarks = [...benchmarks].sort((a, b) => {
    if (!sortConfig) return 0;
    const aVal = a[sortConfig.key];
    const bVal = b[sortConfig.key];
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    }
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortConfig.direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return 0;
  });

  const handleSort = (key: 'name' | 'mimo7b' | 'mimo7brl') => {
    if (sortConfig?.key === key) {
      setSortConfig({ key, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' });
    } else {
      setSortConfig({ key, direction: 'desc' });
    }
  };

  const SortIcon = ({ columnKey }: { columnKey: 'name' | 'mimo7b' | 'mimo7brl' }) => {
    if (sortConfig?.key !== columnKey) return <ChevronDown className="w-3 h-3 text-white/20" />;
    return sortConfig.direction === 'asc'
      ? <ChevronUp className="w-3 h-3 text-[#FF6900]" />
      : <ChevronDown className="w-3 h-3 text-[#FF6900]" />;
  };

  const numericMax = Math.max(...benchmarks.map(r => Math.max(r.mimo7b, r.mimo7brl)));
  const getBarWidth = (val: number) => `${(val / numericMax) * 100}%`;

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
            MiMo <span className="text-[#FF6900]">性能基准</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 max-w-3xl mx-auto font-body"
          >
            7B 参数挑战大模型推理性能极限
          </motion.p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-24 space-y-24">
        {/* ========== Benchmark 表格 ========== */}
        <section>
          <SectionTitle index={1}>Benchmark 对比</SectionTitle>
          <motion.p custom={2} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/60 mb-8 max-w-3xl">
            以下数据展示了 MiMo-7B 和 MiMo-7B-RL 在推理类 Benchmark 上与 o1-mini 和 GPT-4o 的对比。MiMo-7B-RL 在多个推理任务上超越了 o1-mini。
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
                        <button onClick={() => handleSort('mimo7b')} className="flex items-center gap-1 mx-auto text-white/70 font-heading font-semibold hover:text-white/90 transition-colors">
                          MiMo-7B <SortIcon columnKey="mimo7b" />
                        </button>
                      </th>
                      <th className="text-center py-4 px-4">
                        <button onClick={() => handleSort('mimo7brl')} className="flex items-center gap-1 mx-auto text-[#FF6900] font-heading font-semibold hover:text-[#FF8533] transition-colors">
                          MiMo-7B-RL <SortIcon columnKey="mimo7brl" />
                          <Trophy className="w-3.5 h-3.5 text-[#FF6900]" />
                        </button>
                      </th>
                      <th className="text-center py-4 px-4 text-white/70 font-heading font-semibold">
                        o1-mini
                      </th>
                      <th className="text-center py-4 px-4 text-white/70 font-heading font-semibold">
                        GPT-4o
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedBenchmarks.map((row) => (
                      <tr key={row.name} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                        <td className="py-5 px-4">
                          <div className="font-medium text-white">{row.name}</div>
                          <div className="text-white/30 text-xs mt-0.5">
                            {row.name === 'AIME 2025' && '数学竞赛推理'}
                            {row.name === 'LiveCodeBench' && '实时编程挑战'}
                            {row.name === 'GPQA Diamond' && '研究生级科学问答'}
                            {row.name === 'MATH' && '数学问题求解'}
                          </div>
                        </td>
                        <td className="py-5 px-4">
                          <div className="text-center">
                            <span className="font-mono font-bold text-white/80">{row.mimo7b}%</span>
                            <div className="w-full h-1.5 rounded-full bg-white/10 mt-2 overflow-hidden">
                              <div className="h-full rounded-full bg-white/30 transition-all" style={{ width: getBarWidth(row.mimo7b) }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-4 relative">
                          {row.highlight && (
                            <div className="absolute inset-0 bg-[#FF6900]/5 rounded-lg border border-[#FF6900]/20 pointer-events-none" />
                          )}
                          <div className="text-center relative z-10">
                            <span className="font-mono font-bold text-[#FF6900]">{row.mimo7brl}%</span>
                            <div className="w-full h-1.5 rounded-full bg-white/10 mt-2 overflow-hidden">
                              <div className="h-full rounded-full bg-[#FF6900] transition-all" style={{ width: getBarWidth(row.mimo7brl) }} />
                            </div>
                          </div>
                        </td>
                        <td className="py-5 px-4 text-center">
                          <span className="font-mono font-bold text-white/80">{row.o1mini}</span>
                          {row.o1mini.startsWith('~') && (
                            <span className="block text-white/30 text-[10px] mt-1">近似值</span>
                          )}
                        </td>
                        <td className="py-5 px-4 text-center">
                          <span className="font-mono font-bold text-white/80">{row.gpt4o === '—' ? '—' : `${row.gpt4o}%`}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </motion.div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { label: 'AIME 提升', value: '+23.3%', desc: 'RL 训练效果', icon: TrendingUp },
              { label: 'LiveCode', value: '+10.8%', desc: '代码推理', icon: Target },
              { label: 'GPQA 提升', value: '+13.2%', desc: '科学问答', icon: Award },
              { label: 'MATH 提升', value: '+17.6%', desc: '数学能力', icon: BarChart3 },
            ].map((stat, idx) => (
              <motion.div
                key={stat.label}
                custom={idx + 4}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="liquid-glass rounded-xl p-4 text-center">
                  <stat.icon className="w-5 h-5 text-[#FF6900] mx-auto mb-2" />
                  <div className="text-xl font-bold text-[#FF6900] font-heading">{stat.value}</div>
                  <div className="text-white/50 text-xs">{stat.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ========== 7B 超越 o1-mini ========== */}
        <section>
          <SectionTitle index={2}>7B 超越 o1-mini</SectionTitle>
          <motion.p custom={3} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/60 mb-8 max-w-3xl">
            MiMo-7B-RL 用仅 70 亿参数，在推理任务上超越了参数量大数倍的 o1-mini，证明了架构创新和训练方法的重要性。
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div custom={3} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="text-center h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#FF6900]/10 rounded-full blur-2xl" />
                <div className="w-14 h-14 rounded-2xl bg-[#FF6900]/20 flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-7 h-7 text-[#FF6900]" />
                </div>
                <div className="text-3xl font-bold text-[#FF6900] font-heading mb-1">3/4</div>
                <div className="text-white/50 text-sm">推理任务超越</div>
                <p className="text-white/40 text-xs mt-2">在 4 项推理基准中有 3 项超越 o1-mini</p>
              </GlassCard>
            </motion.div>
            <motion.div custom={4} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="text-center h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#FF6900]/10 rounded-full blur-2xl" />
                <div className="w-14 h-14 rounded-2xl bg-[#FF6900]/20 flex items-center justify-center mx-auto mb-4">
                  <Flame className="w-7 h-7 text-[#FF6900]" />
                </div>
                <div className="text-3xl font-bold text-[#FF6900] font-heading mb-1">55.4%</div>
                <div className="text-white/50 text-sm">AIME 2025 最高分</div>
                <p className="text-white/40 text-xs mt-2">比 o1-mini 高 5.4 个百分点</p>
              </GlassCard>
            </motion.div>
            <motion.div custom={5} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="text-center h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-[#FF6900]/10 rounded-full blur-2xl" />
                <div className="w-14 h-14 rounded-2xl bg-[#FF6900]/20 flex items-center justify-center mx-auto mb-4">
                  <Star className="w-7 h-7 text-[#FF6900]" />
                </div>
                <div className="text-3xl font-bold text-[#FF6900] font-heading mb-1">7B</div>
                <div className="text-white/50 text-sm">参数量</div>
                <p className="text-white/40 text-xs mt-2">vs o1-mini 的数百亿参数</p>
              </GlassCard>
            </motion.div>
          </div>

          <motion.div custom={6} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <GlassCard>
              <h4 className="font-heading font-semibold mb-4 flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5 text-[#FF6900]" />
                为什么 7B 能超越大模型？
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: '架构创新', desc: '混合注意力 5:1 + MTP 推测解码，让小模型拥有大模型的信息处理能力', icon: Zap },
                  { title: 'RL 训练优化', desc: '真实环境强化学习训练，模型在实战中学会推理而非死记硬背', icon: Target },
                  { title: '多教师蒸馏', desc: 'MOPD 从多个大模型教师中汲取精华，小模型浓缩了多位专家的智慧', icon: Star },
                  { title: '专注推理', desc: 'MiMo 针对推理任务专项优化，在推理领域做到了「小而精」', icon: Flame },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                    <div className="w-8 h-8 rounded-lg bg-[#FF6900]/20 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-[#FF6900]" />
                    </div>
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

        {/* ========== 性价比之王 ========== */}
        <section>
          <SectionTitle index={3}>性价比之王</SectionTitle>
          <motion.p custom={4} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-white/60 mb-8 max-w-3xl">
            MiMo-7B 系列证明了：参数量不是唯一标准。通过架构创新和高效训练，7B 参数模型可以达到大模型的推理水平，而部署成本却大幅降低。
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div custom={4} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6900]/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#FF6900]" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">推理成本对比</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-[#FF6900]" />
                      <span className="text-white/80 text-sm">MiMo-7B-RL</span>
                    </div>
                    <div className="text-right">
                      <div className="text-[#FF6900] font-bold font-mono">低成本</div>
                      <div className="text-white/40 text-xs">7B 参数</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white/40" />
                      <span className="text-white/60 text-sm">o1-mini</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white/60 font-mono">中成本</div>
                      <div className="text-white/40 text-xs">数百B 参数</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-white/[0.03] border border-white/5">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white/30" />
                      <span className="text-white/50 text-sm">GPT-4o</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white/50 font-mono">高成本</div>
                      <div className="text-white/40 text-xs">超大参数</div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
            <motion.div custom={5} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <GlassCard className="h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#FF6900]/20 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-[#FF6900]" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold">性能/成本比</h3>
                </div>
                <div className="p-5 rounded-xl bg-[#FF6900]/10 border border-[#FF6900]/20 text-center mb-4">
                  <div className="text-5xl font-bold text-[#FF6900] font-heading mb-2">Top 1</div>
                  <div className="text-white/60 text-sm">推理性能/参数比</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">每参数推理能力</span>
                    <span className="text-[#FF6900] font-mono font-bold">行业领先</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-[#FF6900]" style={{ width: '95%' }} />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">部署硬件要求</span>
                    <span className="text-green-400 font-mono">单卡可跑</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-green-400" style={{ width: '20%' }} />
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Summary */}
          <motion.div custom={6} variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <GlassCard className="border-l-4 border-l-[#FF6900]">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#FF6900]/20 flex items-center justify-center flex-shrink-0">
                  <Flame className="w-6 h-6 text-[#FF6900]" />
                </div>
                <div>
                  <h4 className="font-heading font-semibold text-lg mb-2">小模型，大智慧</h4>
                  <p className="text-white/60 text-sm leading-relaxed">
                    MiMo-7B-RL 的成功证明，通过精心设计的架构（混合注意力、MTP、MOPD 蒸馏）和高效的训练策略（真实环境 RL、R3 路由回放），7B 参数的小模型完全可以在推理任务上挑战甚至超越参数量大数十倍的大模型。这对于企业部署和端侧应用具有重大意义——不再需要昂贵的 GPU 集群，单张消费级显卡就能运行顶尖的推理模型。
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default MimoBenchmarks;
