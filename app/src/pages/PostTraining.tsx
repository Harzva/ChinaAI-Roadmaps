import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import {
  GraduationCap,
  GitMerge,
  BrainCircuit,
  ArrowRight,
  ArrowDown,
  Sparkles,
  MessageSquare,
  Star,
  RefreshCw,
  Target,
  BookOpen,
  GitBranch,
  Network,
  Shirt,
  Zap,
  Repeat,
  Clock,
  Briefcase,
  Users,
  Merge,
  Crosshair,
  ThumbsUp,
  TrendingUp,
  RotateCcw,
  Brain,
  Award,
  ChevronRight,
} from 'lucide-react';

/* ─────────── scroll-reveal helpers ─────────── */
const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

const staggerContainer = {
  initial: {},
  whileInView: {},
  viewport: { once: true, amount: 0.15 },
  transition: { staggerChildren: 0.12 },
};

/* ─────────── Beginner Card ─────────── */
function BeginnerCard({
  icon,
  title,
  emoji,
  children,
  accent = '#00E5FF',
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  emoji: string;
  children: React.ReactNode;
  accent?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className="liquid-glass rounded-xl p-6 md:p-8 relative overflow-hidden"
      style={{ borderTop: `3px solid ${accent}` }}
    >
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
        >
          <div style={{ color: accent }}>{icon}</div>
        </div>
        <h3 className="font-heading text-[20px] font-semibold text-white">
          {emoji} {title}
        </h3>
      </div>
      <div className="text-[15px] text-[#8B9EB0] leading-[1.8]">{children}</div>
    </motion.div>
  );
}

/* ─────────── Flow Node ─────────── */
interface FlowNodeProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  items?: string[];
  accent: string;
  index: number;
}

function FlowNode({ icon, title, subtitle, items, accent, index }: FlowNodeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      }}
      className="liquid-glass rounded-xl p-6 min-w-[220px]"
    >
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
        style={{ background: `${accent}15`, border: `1px solid ${accent}30` }}
      >
        <div style={{ color: accent }}>{icon}</div>
      </div>
      <h4 className="font-heading text-[18px] font-semibold text-white mb-1">{title}</h4>
      <p className="text-[13px] text-[#8B9EB0] mb-3">{subtitle}</p>
      {items && items.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="text-[12px] font-mono px-2 py-1 rounded"
              style={{ background: `${accent}10`, color: accent, border: `1px solid ${accent}20` }}
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
}

/* ─────────── Flow Arrow ─────────── */
function FlowArrow({ direction = 'horizontal' }: { direction?: 'horizontal' | 'vertical' }) {
  if (direction === 'vertical') {
    return (
      <div className="flex items-center justify-center py-2">
        <div className="relative w-[1px] h-[40px]">
          <svg width="2" height="40" className="overflow-visible">
            <line
              x1="1"
              y1="0"
              x2="1"
              y2="35"
              stroke="#00E5FF"
              strokeWidth="1.5"
              strokeDasharray="4 3"
              opacity="0.6"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-14"
                dur="0.8s"
                repeatCount="indefinite"
              />
            </line>
          </svg>
          <ArrowDown
            size={14}
            className="absolute left-1/2 -translate-x-1/2 top-[30px] text-[#00E5FF]"
            style={{ opacity: 0.6 }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center px-2">
      <div className="relative w-[60px] h-[20px]">
        <svg width="60" height="20" className="overflow-visible">
          <line
            x1="0"
            y1="10"
            x2="50"
            y2="10"
            stroke="#00E5FF"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.6"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-14"
              dur="0.8s"
              repeatCount="indefinite"
            />
          </line>
        </svg>
        <ArrowRight
          size={14}
          className="absolute right-0 top-1/2 -translate-y-1/2 text-[#00E5FF]"
          style={{ opacity: 0.6 }}
        />
      </div>
    </div>
  );
}

/* ─────────── Reasoning Mode Card ─────────── */
interface ReasoningCardProps {
  mode: string;
  contextWindow: string;
  outputStyle: string;
  responseFormat: string;
  scenario: string;
  example: string;
  accent: string;
  index: number;
}

function ReasoningCard({
  mode,
  contextWindow,
  outputStyle,
  responseFormat,
  scenario,
  example,
  accent,
  index,
}: ReasoningCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
      }}
      className="relative liquid-glass rounded-xl overflow-hidden transition-all duration-400"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderTop: `3px solid ${accent}`,
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered
          ? `0 12px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 20px ${accent}15`
          : undefined,
      }}
    >
      <div className="p-6">
        <h3 className="font-heading text-[22px] font-semibold text-white mb-4">{mode}</h3>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-[12px] font-mono text-[#8B9EB0] w-[80px] flex-shrink-0 pt-0.5">
              上下文窗口
            </span>
            <span className="text-[15px] font-mono text-white">{contextWindow}</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[12px] font-mono text-[#8B9EB0] w-[80px] flex-shrink-0 pt-0.5">
              典型输出
            </span>
            <span className="text-[15px] text-white">{outputStyle}</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[12px] font-mono text-[#8B9EB0] w-[80px] flex-shrink-0 pt-0.5">
              响应格式
            </span>
            <span className="text-[14px] text-white font-mono">{responseFormat}</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-[12px] font-mono text-[#8B9EB0] w-[80px] flex-shrink-0 pt-0.5">
              适用场景
            </span>
            <span className="text-[15px] text-[#8B9EB0]">{scenario}</span>
          </div>
        </div>
      </div>

      {/* Hover example overlay */}
      <motion.div
        initial={false}
        animate={{
          height: hovered ? 'auto' : 0,
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="overflow-hidden"
      >
        <div className="px-6 pb-6">
          <div
            className="rounded-lg p-4 border"
            style={{ background: `${accent}08`, borderColor: `${accent}20` }}
          >
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare size={14} style={{ color: accent }} />
              <span className="text-[12px] font-mono" style={{ color: accent }}>
                响应示例
              </span>
            </div>
            <p className="text-[13px] text-[#8B9EB0] leading-relaxed">{example}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────── Teacher Data ─────────── */
const teachers = [
  { name: 'Math', score: 95, learned: 88, color: '#3D8BFF' },
  { name: 'Code', score: 92, learned: 85, color: '#00E5FF' },
  { name: 'Agent', score: 87, learned: 80, color: '#FF6B6B' },
  { name: 'Instruction', score: 90, learned: 90, color: '#ffb84d' },
  { name: 'General', score: 85, learned: 82, color: '#4ECDC4' },
];

/* ─────────── PostTraining Page ─────────── */
export default function PostTraining() {
  return (
    <div className="relative min-h-[100dvh] bg-[#050B14]">
      {/* ─── Page Header ─── */}
      <section className="relative pt-32 pb-16 px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-[13px] text-[#8B9EB0] mb-6">
              <Link to="/" className="hover:text-[#00E5FF] transition-colors">
                首页
              </Link>
              <span>/</span>
              <span className="text-[#00E5FF]">后训练</span>
            </div>

            <h1 className="font-heading text-[48px] font-bold text-white tracking-tight mb-4">
              后训练
            </h1>
            <p className="text-[#8B9EB0] text-[20px] max-w-[600px] leading-relaxed">
              专家蒸馏系统与多模式推理，从领域专家到统一通用模型的精密锻造
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Beginner-Friendly Section ─── */}
      <section className="relative py-[60px] px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div className="mb-10" {...fadeInUp}>
            <div className="flex items-center gap-3 mb-3">
              <span className="section-label">[ 小白看懂后训练 ]</span>
              <span className="text-[18px]">🎓</span>
            </div>
            <h2 className="font-heading text-[32px] font-semibold text-white mb-4">
              用生活比喻，秒懂后训练
            </h2>
            <p className="text-[16px] text-[#8B9EB0] max-w-[640px]">
              后训练听起来很抽象？把这些概念和上学、上班的经验联系起来，一下就明白了。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1: 后训练 = 职业培训 */}
            <BeginnerCard
              icon={<GraduationCap size={20} />}
              title="后训练 = 职业培训"
              emoji="💼"
              accent="#3D8BFF"
              delay={0.1}
            >
              <p className="mb-3">
                如果把预训练比作「从小学到大学的通识教育」，后训练就是「职业培训」。
              </p>
              <p className="mb-2 text-white">DeepSeek-V4 的后训练分两阶段：</p>
              <ol className="space-y-2 mb-3 list-decimal list-inside">
                <li>
                  <strong className="text-white">专家培养</strong> = 送 AI 去「专项培训班」：数学班、编程班、Agent 班...
                  <div className="mt-1 text-[14px]">
                    每个班有专门的老师（<strong className="text-white">GRM = 生成式奖励模型</strong>），告诉 AI "这道题做得好不好"。
                  </div>
                </li>
                <li>
                  <strong className="text-white">能力整合</strong> = 把各个培训班学到的技能，整合到一个「全能员工」身上。
                  <div className="mt-1 text-[14px]">
                    用 <strong className="text-white">OPD（On-Policy Distillation）</strong>让学生模型向 10+ 位专家老师学习。
                  </div>
                </li>
              </ol>
              <div className="flex items-center gap-2 mt-3">
                <Briefcase size={16} className="text-[#3D8BFF]" />
                <Users size={16} className="text-[#3D8BFF]" />
                <Merge size={16} className="text-[#3D8BFF]" />
                <span className="text-[14px]">就像一个人先学好各个专业技能，再融会贯通成为全栈工程师！</span>
              </div>
            </BeginnerCard>

            {/* Card 2: GRM = AI 给自己当老师 */}
            <BeginnerCard
              icon={<Star size={20} />}
              title="GRM = AI 给自己当老师"
              emoji="👨‍🏫"
              accent="#00E5FF"
              delay={0.2}
            >
              <p className="mb-3">
                传统的奖励模型就像一个「打分员」——只能给个分数（0~100分）。
              </p>
              <div className="rounded-lg p-4 mb-3" style={{ background: 'rgba(0,229,255,0.08)', borderLeft: '3px solid #00E5FF' }}>
                <p className="text-white">
                  <strong>GRM（生成式奖励模型）</strong> 就像一个「点评家」——不仅给分，还能写评语：
                </p>
                <p className="mt-2 italic">
                  "这道题的解法第三步有个小错误，建议用更简洁的三角函数公式..."
                </p>
              </div>
              <p className="mb-3">
                更厉害的是，GRM 本身就是 actor（执行者），自己给自己打分自己改进。
              </p>
              <div className="flex items-center gap-2">
                <RefreshCw size={16} className="text-[#00E5FF]" />
                <Target size={16} className="text-[#00E5FF]" />
                <span className="text-[14px]">就像顶级运动员既是选手又是自己的教练！</span>
              </div>
            </BeginnerCard>

            {/* Card 3: OPD = 跟多位名师学习 */}
            <BeginnerCard
              icon={<BookOpen size={20} />}
              title="OPD = 跟多位名师学习"
              emoji="📖"
              accent="#3D8BFF"
              delay={0.3}
            >
              <p className="mb-3">
                <strong className="text-white">OPD（On-Policy Distillation）</strong> = 一个学生向多位名师学习的过程。
              </p>
              <div className="space-y-2 mb-3">
                <p>
                  <span className="text-white">传统蒸馏</span> = 学生只看老师最终的答案（logits），模仿结果。
                </p>
                <p>
                  <span className="text-white">OPD</span> = 学生看老师完整的「解题思路分布」（完整词表的 logit 分布），用 reverse KL 散度来学习。
                </p>
              </div>
              <div className="rounded-lg p-4 mb-3" style={{ background: 'rgba(61,139,255,0.08)', borderLeft: '3px solid #3D8BFF' }}>
                <p className="text-white mb-2">就像：</p>
                <ul className="space-y-1 text-[14px]">
                  <li className="flex items-start gap-2">
                    <GitBranch size={14} className="mt-1 flex-shrink-0 text-[#3D8BFF]" />
                    <span>传统 = 抄学霸的 final answer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Network size={14} className="mt-1 flex-shrink-0 text-[#3D8BFF]" />
                    <span>OPD = 看学霸草稿纸上<strong className="text-white">所有的思考过程</strong>，理解 "为什么选 A 而不是 B"</span>
                  </li>
                </ul>
              </div>
              <p className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#3D8BFF]" />
                <span>覆盖数学、编程、Agent、指令遵循等 <strong className="text-white">10+ 个领域</strong>！</span>
              </p>
            </BeginnerCard>

            {/* Card 4: Quick Instruction = 快速换装 */}
            <BeginnerCard
              icon={<Shirt size={20} />}
              title="Quick Instruction = 快速换装"
              emoji="⚡"
              accent="#00E5FF"
              delay={0.4}
            >
              <p className="mb-3">
                想象你是一个客服，每天面对不同客户要换不同制服：
              </p>
              <ul className="space-y-2 mb-3">
                <li className="flex items-start gap-2">
                  <Zap size={16} className="mt-1 flex-shrink-0 text-[#00E5FF]" />
                  <span><strong className="text-white">系统提示</strong> = 制服（告诉 AI "你现在是一个编程助手"）</span>
                </li>
                <li className="flex items-start gap-2">
                  <Repeat size={16} className="mt-1 flex-shrink-0 text-[#00E5FF]" />
                  <span><strong className="text-white">用户消息</strong> = 客户的问题</span>
                </li>
              </ul>
              <p className="mb-3">
                传统方式 = 每次见新客户都要去更衣室从头换一身制服（重新计算整个系统提示的 KV）。
              </p>
              <div className="rounded-lg p-4 mb-3" style={{ background: 'rgba(0,229,255,0.08)', borderLeft: '3px solid #00E5FF' }}>
                <p className="text-white">
                  <strong>Quick Instruction</strong> = 把制服挂在门后，直接套上就能用！通过特殊 token 复用系统提示的 KV Cache，避免重复计算。
                </p>
              </div>
              <p className="flex items-center gap-2">
                <Clock size={16} className="text-[#00E5FF]" />
                <span>在 API 高频调用场景下，prefill 速度提升 <strong className="text-[#00E5FF]">1.92×</strong>！</span>
              </p>
            </BeginnerCard>
          </div>
        </div>
      </section>

      {/* ─── Two-Stage Distillation Flow ─── */}
      <section className="relative py-[80px] px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div className="mb-14" {...fadeInUp}>
            <span className="section-label block mb-3">[ 两阶段蒸馏 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-3">
              从专家到统一模型：两阶段蒸馏
            </h2>
            <p className="text-[17px] text-[#8B9EB0] max-w-[640px] leading-relaxed">
              先培养各领域专家，再通过策略蒸馏整合为统一通用模型，实现专业性与通用性的双重突破
            </p>
          </motion.div>

          {/* Desktop flow layout */}
          <div className="hidden lg:block">
            {/* Main flow row */}
            <div className="flex items-start justify-center gap-0 mb-8">
              <FlowNode
                icon={<GraduationCap size={24} />}
                title="Specialist Training"
                subtitle="领域专家培养"
                items={['SFT 监督微调', 'GRPO 策略优化']}
                accent="#3D8BFF"
                index={0}
              />
              <div className="flex items-center pt-16">
                <FlowArrow direction="horizontal" />
              </div>
              <FlowNode
                icon={<GitMerge size={24} />}
                title="On-Policy Distillation"
                subtitle="10+ 教师模型整合"
                items={['Reverse KL', 'On-Policy 采样']}
                accent="#00E5FF"
                index={1}
              />
              <div className="flex items-center pt-16">
                <FlowArrow direction="horizontal" />
              </div>
              <FlowNode
                icon={<BrainCircuit size={24} />}
                title="Unified Model"
                subtitle="最终通用模型"
                items={['统一推理', '多模态输出']}
                accent="#00F0FF"
                index={2}
              />
            </div>

            {/* Formula panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="liquid-glass rounded-xl p-8 max-w-[600px] mx-auto"
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles size={18} className="text-[#00E5FF]" />
                <span className="text-[13px] font-mono text-[#00E5FF]">OPD 损失函数</span>
              </div>
              <div className="liquid-glass rounded-lg p-6 border-l-[3px] border-l-[#00E5FF]">
                <p className="text-[18px] font-mono text-white text-center leading-relaxed">
                  L<sub className="text-[#8B9EB0]">OPD</sub>({' '}
                  <span className="text-[#00E5FF]">θ</span> ) = Σ w<sub>i</sub> · D<sub>KL</sub>({' '}
                  π<span className="text-[#00E5FF]">θ</span> ‖ π<sub>Ei</sub>)
                </p>
              </div>
              <p className="text-[14px] text-[#8B9EB0] text-center mt-4">
                通过逆向 KL 散度对齐策略分布，加权融合多位专家知识
              </p>
            </motion.div>
          </div>

          {/* Mobile vertical flow layout */}
          <div className="lg:hidden space-y-0">
            <FlowNode
              icon={<GraduationCap size={24} />}
              title="Specialist Training"
              subtitle="领域专家培养"
              items={['SFT 监督微调', 'GRPO 策略优化']}
              accent="#3D8BFF"
              index={0}
            />
            <FlowArrow direction="vertical" />
            <FlowNode
              icon={<GitMerge size={24} />}
              title="On-Policy Distillation"
              subtitle="10+ 教师模型整合"
              items={['Reverse KL', 'On-Policy 采样']}
              accent="#00E5FF"
              index={1}
            />
            <FlowArrow direction="vertical" />
            <FlowNode
              icon={<BrainCircuit size={24} />}
              title="Unified Model"
              subtitle="最终通用模型"
              items={['统一推理', '多模态输出']}
              accent="#00F0FF"
              index={2}
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="liquid-glass rounded-xl p-6 mt-8"
            >
              <div className="flex items-center gap-3 mb-4">
                <Sparkles size={18} className="text-[#00E5FF]" />
                <span className="text-[13px] font-mono text-[#00E5FF]">OPD 损失函数</span>
              </div>
              <div className="liquid-glass rounded-lg p-4 border-l-[3px] border-l-[#00E5FF]">
                <p className="text-[16px] font-mono text-white text-center leading-relaxed">
                  L<sub className="text-[#8B9EB0]">OPD</sub>({' '}
                  <span className="text-[#00E5FF]">θ</span> ) = Σ w<sub>i</sub> · D<sub>KL</sub>({' '}
                  π<span className="text-[#00E5FF]">θ</span> ‖ π<sub>Ei</sub>)
                </p>
              </div>
              <p className="text-[13px] text-[#8B9EB0] text-center mt-3">
                通过逆向 KL 散度对齐策略分布，加权融合多位专家知识
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Reasoning Mode Matrix ─── */}
      <section className="relative py-[80px] px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div className="mb-14" {...fadeInUp}>
            <span className="section-label block mb-3">[ 推理模式 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-3">
              三种推理模式，适配不同认知负载
            </h2>
            <p className="text-[17px] text-[#8B9EB0] max-w-[640px] leading-relaxed">
              从日常任务到探索边界，三种模式精准匹配不同深度思考需求
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            {...staggerContainer}
          >
            <ReasoningCard
              mode="Non-think"
              contextWindow="8K"
              outputStyle="短"
              responseFormat="` ` 总结"
              scenario="日常任务、简单问答、快速响应场景"
              example="直接给出简洁结论，无需展开思考过程，适合高频低认知负载的日常交互"
              accent="#8B9EB0"
              index={0}
            />
            <ReasoningCard
              mode="Think (High)"
              contextWindow="128K"
              outputStyle="中等"
              responseFormat="` ` 思考+总结"
              scenario="复杂求解、逻辑推理、代码生成"
              example="先展示详细推理链条与中间步骤，再给出最终结论，平衡深度与效率"
              accent="#3D8BFF"
              index={1}
            />
            <ReasoningCard
              mode="Think Max"
              contextWindow="384K"
              outputStyle="长"
              responseFormat="系统提示+思考+总结"
              scenario="探索边界、研究分析、深度创作"
              example="在系统级提示框架下进行多轮自我修正与验证，输出全面深入的分析报告"
              accent="#00E5FF"
              index={2}
            />
          </motion.div>

          {/* Comparison table */}
          <motion.div
            className="mt-16 liquid-glass rounded-xl overflow-hidden"
            {...fadeInUp}
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-[rgba(61,139,255,0.15)]">
                    <th className="text-left px-6 py-4 text-[13px] font-medium text-white tracking-wide">
                      特性
                    </th>
                    <th className="text-center px-6 py-4 text-[13px] font-medium text-[#8B9EB0] tracking-wide">
                      Non-think
                    </th>
                    <th className="text-center px-6 py-4 text-[13px] font-medium text-[#3D8BFF] tracking-wide">
                      Think (High)
                    </th>
                    <th className="text-center px-6 py-4 text-[13px] font-medium text-[#00E5FF] tracking-wide">
                      Think Max
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: '上下文窗口', v1: '8K', v2: '128K', v3: '384K' },
                    { label: '典型输出长度', v1: '短', v2: '中等', v3: '长' },
                    { label: '思考深度', v1: '无', v2: '深度', v3: '极限' },
                    { label: '首 token 延迟', v1: '极低', v2: '低', v3: '中等' },
                    { label: '适用场景', v1: '日常', v2: '复杂', v3: '探索' },
                  ].map((row, i) => (
                    <tr
                      key={row.label}
                      className="border-t border-[rgba(255,255,255,0.05)] transition-colors hover:bg-[rgba(61,139,255,0.05)]"
                      style={{ background: i % 2 === 0 ? '#0A1628' : '#0D1B2E' }}
                    >
                      <td className="px-6 py-4 text-[14px] text-[#8B9EB0] font-body">
                        {row.label}
                      </td>
                      <td className="px-6 py-4 text-center text-[14px] font-mono text-white">
                        {row.v1}
                      </td>
                      <td className="px-6 py-4 text-center text-[14px] font-mono text-[#3D8BFF]">
                        {row.v2}
                      </td>
                      <td className="px-6 py-4 text-center text-[14px] font-mono text-[#00E5FF]">
                        {row.v3}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          NEW SECTIONS BELOW
          ═══════════════════════════════════════════════════════════ */}

      {/* ─── Section A: Distillation Quality Monitor ─── */}
      <section className="relative py-[100px] px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div className="mb-14" {...fadeInUp}>
            <span className="section-label block mb-3">[ 蒸馏质量监控 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-3">
              教师-学生学习进度
            </h2>
            <p className="text-[17px] text-[#8B9EB0] max-w-[640px] leading-relaxed">
              5 位领域专家教师向 V4 学生模型传授知识，实时追踪知识迁移效率
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="liquid-glass rounded-xl p-8 lg:p-10"
          >
            {/* Teacher row */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap size={18} className="text-[#3D8BFF]" />
                <span className="text-[14px] font-semibold text-[#3D8BFF]">教师模型（专家能力分）</span>
              </div>
              <div className="space-y-4">
                {teachers.map((teacher, i) => (
                  <motion.div
                    key={teacher.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-[13px] text-white w-[100px] font-medium">{teacher.name}</span>
                    <div className="flex-1 h-[20px] rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${teacher.score}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.15 + 0.3, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ background: teacher.color }}
                      />
                    </div>
                    <span className="text-[13px] font-mono w-[40px] text-right" style={{ color: teacher.color }}>
                      {teacher.score}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Animated flow lines connecting teachers to student */}
            <div className="relative h-[40px] mb-6 hidden lg:block">
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                {teachers.map((teacher, i) => {
                  const xStart = (i + 0.5) / teachers.length;
                  return (
                    <motion.path
                      key={teacher.name}
                      d={`M ${xStart * 100}% 0 Q ${xStart * 100}% 30 50% 35`}
                      fill="none"
                      stroke={teacher.color}
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      opacity="0.4"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: i * 0.15 + 0.5 }}
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="-14"
                        dur="1s"
                        repeatCount="indefinite"
                      />
                    </motion.path>
                  );
                })}
              </svg>
            </div>

            {/* Student row */}
            <div className="pt-6 border-t border-[rgba(255,255,255,0.05)]">
              <div className="flex items-center gap-2 mb-4">
                <BrainCircuit size={18} className="text-[#00E5FF]" />
                <span className="text-[14px] font-semibold text-[#00E5FF]">学生模型 V4（知识吸收率）</span>
              </div>
              <div className="space-y-4">
                {teachers.map((teacher, i) => (
                  <motion.div
                    key={teacher.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 + 0.3 }}
                    className="flex items-center gap-4"
                  >
                    <span className="text-[13px] text-white w-[100px] font-medium">{teacher.name}</span>
                    <div className="flex-1 h-[20px] rounded-full bg-[rgba(255,255,255,0.05)] overflow-hidden relative">
                      {/* Background teacher score for comparison */}
                      <div
                        className="absolute inset-y-0 rounded-full opacity-20"
                        style={{ width: `${teacher.score}%`, background: teacher.color }}
                      />
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${teacher.learned}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: i * 0.15 + 0.6, ease: 'easeOut' }}
                        className="h-full rounded-full relative z-10"
                        style={{ background: teacher.color }}
                      />
                    </div>
                    <span className="text-[13px] font-mono w-[40px] text-right" style={{ color: teacher.color }}>
                      {teacher.learned}
                    </span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-lg bg-[rgba(0,229,255,0.03)] border border-[rgba(0,229,255,0.1)]">
                <p className="text-[13px] text-[#8B9EB0]">
                  <span className="text-[#00E5FF] font-semibold">浅底柱</span> = 教师原始能力分；
                  <span className="text-[#00E5FF] font-semibold">实心柱</span> = 学生已吸收比例。
                  Instruction 领域吸收率最高（90%），Agent 领域仍有提升空间（80%）。
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section B: RL Training Loop Diagram ─── */}
      <section className="relative py-[100px] px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div className="mb-14" {...fadeInUp}>
            <span className="section-label block mb-3">[ 强化学习循环 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-3">
              RL 训练闭环
            </h2>
            <p className="text-[17px] text-[#8B9EB0] max-w-[640px] leading-relaxed">
              Actor 生成回答 → GRM 评估质量 → 计算奖励 → 策略更新 → Actor 迭代优化
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="liquid-glass rounded-xl p-8 lg:p-12"
          >
            <div className="flex flex-col items-center">
              {/* Circular diagram */}
              <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px]">
                <svg viewBox="0 0 360 360" className="w-full h-full">
                  {/* Outer circle */}
                  <circle cx="180" cy="180" r="160" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  
                  {/* Animated arrows */}
                  {[
                    { start: -90, end: -10, color: '#3D8BFF', delay: 0 },
                    { start: -10, end: 70, color: '#00E5FF', delay: 0.3 },
                    { start: 70, end: 150, color: '#FF6B6B', delay: 0.6 },
                    { start: 150, end: 270, color: '#ffb84d', delay: 0.9 },
                  ].map((arc, i) => (
                    <motion.path
                      key={i}
                      d={describeArc(180, 180, 160, arc.start, arc.end)}
                      fill="none"
                      stroke={arc.color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.8 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: arc.delay }}
                    >
                      <animate
                        attributeName="stroke-dashoffset"
                        from="0"
                        to="-20"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </motion.path>
                  ))}

                  {/* Arrow heads */}
                  {[
                    { angle: -10, color: '#00E5FF' },
                    { angle: 70, color: '#FF6B6B' },
                    { angle: 150, color: '#ffb84d' },
                    { angle: 270, color: '#3D8BFF' },
                  ].map((ah, i) => {
                    const rad = (ah.angle * Math.PI) / 180;
                    const x = 180 + 160 * Math.cos(rad);
                    const y = 180 + 160 * Math.sin(rad);
                    return (
                      <polygon
                        key={i}
                        points={`${x},${y} ${x - 8 * Math.cos(rad - 0.3)},${y - 8 * Math.sin(rad - 0.3)} ${x - 8 * Math.cos(rad + 0.3)},${y - 8 * Math.sin(rad + 0.3)}`}
                        fill={ah.color}
                      />
                    );
                  })}
                </svg>

                {/* Step nodes positioned around circle */}
                <div className="absolute inset-0">
                  {/* Actor */}
                  <TooltipNode
                    angle={-90}
                    distance={160}
                    icon={<Brain size={18} />}
                    label="Actor"
                    tooltip="生成回答：学生模型（V4）根据当前策略生成回答"
                    color="#3D8BFF"
                  />
                  {/* Generate Response */}
                  <TooltipNode
                    angle={-10}
                    distance={160}
                    icon={<MessageSquare size={18} />}
                    label="生成回答"
                    tooltip="采样输出：从模型分布中解码出完整回答序列"
                    color="#00E5FF"
                  />
                  {/* GRM Evaluation */}
                  <TooltipNode
                    angle={70}
                    distance={160}
                    icon={<Crosshair size={18} />}
                    label="GRM 评估"
                    tooltip="评估质量：生成式奖励模型对回答进行细粒度评估"
                    color="#FF6B6B"
                  />
                  {/* Reward Signal */}
                  <TooltipNode
                    angle={150}
                    distance={160}
                    icon={<ThumbsUp size={18} />}
                    label="奖励信号"
                    tooltip="计算奖励：基于评估结果计算标量奖励值"
                    color="#ffb84d"
                  />
                  {/* Policy Update */}
                  <TooltipNode
                    angle={210}
                    distance={140}
                    icon={<RotateCcw size={18} />}
                    label="策略更新"
                    tooltip="策略更新：PPO/GRPO 根据奖励梯度更新模型参数"
                    color="#4ECDC4"
                  />
                </div>

                {/* Center label */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="text-center"
                  >
                    <div className="text-[14px] font-mono text-[#00E5FF] mb-1">RL Loop</div>
                    <div className="text-[11px] text-[#8B9EB0]">闭环迭代优化</div>
                  </motion.div>
                </div>
              </div>

              {/* Bottom labels */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[600px]">
                {[
                  { icon: Brain, label: 'Actor', desc: '生成回答', color: '#3D8BFF' },
                  { icon: Crosshair, label: 'GRM', desc: '评估质量', color: '#FF6B6B' },
                  { icon: TrendingUp, label: 'Reward', desc: '计算奖励', color: '#ffb84d' },
                  { icon: RefreshCw, label: 'Update', desc: '策略更新', color: '#4ECDC4' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.0 + i * 0.1 }}
                    className="flex items-center gap-2"
                  >
                    <item.icon size={14} style={{ color: item.color }} />
                    <span className="text-[13px] text-[#8B9EB0]">{item.label}</span>
                    <ChevronRight size={10} className="text-[#8B9EB0]" />
                    <span className="text-[12px] text-white">{item.desc}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Section C: Post-Training Evolution Table ─── */}
      <section className="relative py-[100px] px-6">
        <div className="max-w-[1280px] mx-auto">
          <motion.div className="mb-14" {...fadeInUp}>
            <span className="section-label block mb-3">[ 后训练进化 ]</span>
            <h2 className="font-heading text-[36px] font-semibold text-white mb-3">
              后训练阶段演进
            </h2>
            <p className="text-[17px] text-[#8B9EB0] max-w-[640px] leading-relaxed">
              从 SFT 监督微调到 GRM 生成式奖励，五个阶段层层递进，锻造统一通用模型
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7 }}
            className="liquid-glass rounded-xl overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="bg-[rgba(61,139,255,0.15)]">
                    <th className="text-left px-5 py-4 text-[13px] font-medium text-white tracking-wide sticky left-0 bg-[rgba(61,139,255,0.15)] z-10">阶段</th>
                    <th className="text-left px-4 py-4 text-[13px] font-medium text-white tracking-wide">方法</th>
                    <th className="text-center px-4 py-4 text-[13px] font-medium text-white tracking-wide">数据量</th>
                    <th className="text-left px-4 py-4 text-[13px] font-medium text-white tracking-wide">目标</th>
                    <th className="text-left px-4 py-4 text-[13px] font-medium text-white tracking-wide">结果</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { stage: 'SFT', method: '监督微调', data: '100K', goal: '学习基本格式', result: 'Base→Chat', color: '#3D8BFF' },
                    { stage: 'RM', method: '奖励模型', data: '50K', goal: '学会判断好坏', result: '偏好对齐', color: '#00E5FF' },
                    { stage: 'RL', method: 'PPO/DPO', data: '迭代', goal: '优化策略', result: '能力提升', color: '#FF6B6B' },
                    { stage: 'OPD', method: '多教师蒸馏', data: '500K', goal: '整合专家', result: '统一能力', color: '#ffb84d' },
                    { stage: 'GRM', method: '生成式奖励', data: '100K', goal: '细粒度评估', result: '精准改进', color: '#4ECDC4' },
                  ].map((row, i) => {
                    const isOdd = i % 2 === 0;
                    const rowBg = isOdd ? '#0A1628' : '#0D1B2E';
                    return (
                      <motion.tr
                        key={row.stage}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className="group transition-colors hover:bg-[rgba(61,139,255,0.06)]"
                        style={{ background: rowBg }}
                      >
                        <td className="px-5 py-4 sticky left-0 z-10 group-hover:bg-[rgba(61,139,255,0.06)] transition-colors" style={{ background: 'inherit' }}>
                          <span
                            className="text-[14px] font-bold font-mono px-2 py-1 rounded"
                            style={{ background: `${row.color}15`, color: row.color, border: `1px solid ${row.color}30` }}
                          >
                            {row.stage}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-[14px] text-white">{row.method}</td>
                        <td className="px-4 py-4 text-center text-[14px] font-mono text-[#00E5FF]">{row.data}</td>
                        <td className="px-4 py-4 text-[14px] text-[#8B9EB0]">{row.goal}</td>
                        <td className="px-4 py-4 text-[14px] text-white">
                          <span className="flex items-center gap-1.5">
                            <Award size={12} style={{ color: row.color }} />
                            {row.result}
                          </span>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Stage flow visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
          >
            {['SFT', 'RM', 'RL', 'OPD', 'GRM'].map((stage, i) => (
              <div key={stage} className="flex items-center gap-2">
                <div className="liquid-glass rounded-lg px-4 py-2 text-center">
                  <span className="text-[14px] font-mono text-white">{stage}</span>
                </div>
                {i < 4 && (
                  <svg width="24" height="12" className="flex-shrink-0">
                    <line x1="0" y1="6" x2="18" y2="6" stroke="#00E5FF" strokeWidth="1" strokeDasharray="3 2" opacity="0.5">
                      <animate attributeName="stroke-dashoffset" from="0" to="-10" dur="1s" repeatCount="indefinite" />
                    </line>
                    <polygon points="18,6 14,3 14,9" fill="#00E5FF" opacity="0.5" />
                  </svg>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Bottom spacer ─── */}
      <div className="h-20" />
    </div>
  );
}

/* ─────────── Helper: Arc path for SVG ─────────── */
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? '0' : '1';
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

/* ─────────── Tooltip Node for RL diagram ─────────── */
function TooltipNode({
  angle,
  distance,
  icon,
  label,
  tooltip,
  color,
}: {
  angle: number;
  distance: number;
  icon: React.ReactNode;
  label: string;
  tooltip: string;
  color: string;
}) {
  const [hovered, setHovered] = useState(false);
  const rad = (angle * Math.PI) / 180;
  const x = 50 + (distance / 360) * 50 * Math.cos(rad);
  const y = 50 + (distance / 360) * 50 * Math.sin(rad);

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{ left: `${x}%`, top: `${y}%` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-transform duration-300"
        style={{
          background: `${color}15`,
          border: `2px solid ${color}`,
          transform: hovered ? 'scale(1.15)' : 'scale(1)',
          boxShadow: hovered ? `0 0 20px ${color}40` : 'none',
        }}
      >
        <div style={{ color }}>{icon}</div>
      </div>
      <div className="text-[10px] md:text-[11px] text-center mt-1 font-medium whitespace-nowrap" style={{ color }}>
        {label}
      </div>

      {/* Tooltip */}
      {hovered && (
        <motion.div
          initial={{ opacity: 0, y: 5, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-[180px] p-3 rounded-lg z-20"
          style={{ background: 'rgba(10,22,40,0.95)', border: `1px solid ${color}40` }}
        >
          <p className="text-[12px] text-[#8B9EB0] leading-relaxed">{tooltip}</p>
        </motion.div>
      )}
    </div>
  );
}
