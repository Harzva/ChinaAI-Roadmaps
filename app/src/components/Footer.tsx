import { Github, ArrowUpRight, BookOpen } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="w-full border-t border-[rgba(255,255,255,0.05)] bg-[#050B14]">
      <div className="max-w-[1280px] mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-heading text-[16px] font-semibold text-[#0055FF]">
            ChinaAI Roadmaps
          </span>
          <p className="text-[13px] text-[#8B9EB0]">
            国内 AI 公司技术路线、论文下载与专题归档
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="https://github.com/Harzva/ChinaAI-Roadmaps"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[14px] text-[#8B9EB0] hover:text-[#00E5FF] transition-colors"
          >
            <Github size={16} />
            GitHub
          </a>
          <a
            href="downloads.html"
            className="flex items-center gap-1 text-[14px] text-[#8B9EB0] hover:text-[#00E5FF] transition-colors"
          >
            <BookOpen size={16} />
            论文下载 <ArrowUpRight size={14} />
          </a>
        </div>

        <p className="text-[12px] text-[#8B9EB0] opacity-60">
          基于公开论文与技术报告整理 · 仅供学习交流
        </p>
      </div>
    </footer>
  )
}
