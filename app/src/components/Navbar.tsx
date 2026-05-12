import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, Zap, BookOpen, Archive } from 'lucide-react'

/* ─── Nav group structure ─── */
const navGroups = [
  {
    label: 'DeepSeek',
    color: '#3D8BFF',
    path: '/deepseek',
    children: [
      { label: '架构解构', path: '/deepseek/architecture' },
      { label: '性能基准', path: '/deepseek/benchmarks' },
      { label: '效率分析', path: '/deepseek/efficiency' },
      { label: '系统底层', path: '/deepseek/infrastructure' },
      { label: '训练解析', path: '/deepseek/training' },
      { label: '后训练', path: '/deepseek/post-training' },
      { label: '多模态', path: '/deepseek/multimodal' },
    ],
  },
  {
    label: 'Kimi',
    color: '#FF6B6B',
    path: '/kimi',
    children: [
      { label: '架构解析', path: '/kimi/architecture' },
      { label: '性能基准', path: '/kimi/benchmarks' },
      { label: '效率分析', path: '/kimi/efficiency' },
      { label: '多模态', path: '/kimi/multimodal' },
    ],
  },
  {
    label: 'GLM',
    color: '#22c55e',
    path: '/glm',
    children: [
      { label: '架构解析', path: '/glm/architecture' },
      { label: '性能基准', path: '/glm/benchmarks' },
      { label: '多模态', path: '/glm/multimodal' },
    ],
  },
  {
    label: 'MiniMax',
    color: '#ffb84d',
    path: '/minimax',
    children: [
      { label: '架构解析', path: '/minimax/architecture' },
      { label: '性能基准', path: '/minimax/benchmarks' },
    ],
  },
  {
    label: 'MiMo',
    color: '#FF6900',
    path: '/mimo',
    children: [
      { label: '架构解析', path: '/mimo/architecture' },
      { label: '性能基准', path: '/mimo/benchmarks' },
    ],
  },
]

const resourceLinks = [
  { label: '论文下载', href: 'downloads.html', icon: BookOpen },
  { label: '专题归档', href: 'content/html/analysis_page.html', icon: Archive },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setOpenDropdown(null)
  }, [pathname])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          scrolled ? 'bg-[#050B14]/90 backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <Zap size={22} className="text-[#00E5FF] group-hover:scale-110 transition-transform" />
            <span className="font-heading text-[16px] font-semibold text-white tracking-tight hidden sm:inline">
              China<span className="text-[#00E5FF]">AI</span><span className="text-[12px] ml-1 opacity-60">Roadmaps</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navGroups.map((g) => {
              const isActive = pathname.startsWith(g.path)
              return (
                <div
                  key={g.label}
                  className="relative"
                  onMouseEnter={() => g.children.length > 0 && setOpenDropdown(g.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  {g.children.length > 0 ? (
                    <>
                      <button
                        className={`flex items-center gap-1 px-3 py-2 rounded-xl font-body text-[13px] transition-colors cursor-pointer ${
                          isActive ? 'text-white font-medium' : 'text-[#8B9EB0] hover:text-white'
                        }`}
                      >
                        <span style={isActive ? { color: g.color } : {}}>{g.label}</span>
                        <ChevronDown size={13} className={`transition-transform ${openDropdown === g.label ? 'rotate-180' : ''}`} />
                        {isActive && (
                          <motion.div
                            layoutId="activeNav"
                            className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                            style={{ background: g.color }}
                            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                          />
                        )}
                      </button>

                      <AnimatePresence>
                        {openDropdown === g.label && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-1 w-44 py-2 rounded-xl bg-[#0A1628]/95 backdrop-blur-xl border border-[rgba(255,255,255,0.08)] shadow-xl overflow-hidden"
                          >
                            {g.children.map((c) => (
                              <Link
                                key={c.path}
                                to={c.path}
                                className={`block px-4 py-2 font-body text-[13px] transition-colors ${
                                  pathname === c.path
                                    ? 'text-[#00E5FF] bg-[rgba(0,229,255,0.06)]'
                                    : 'text-[#8B9EB0] hover:text-white hover:bg-[rgba(255,255,255,0.04)]'
                                }`}
                              >
                                {c.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={g.path}
                      className={`relative flex items-center gap-1 px-3 py-2 rounded-xl font-body text-[13px] transition-colors ${
                        isActive ? 'text-white font-medium' : 'text-[#8B9EB0] hover:text-white'
                      }`}
                    >
                      <span style={isActive ? { color: g.color } : {}}>{g.label}</span>
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                          style={{ background: g.color }}
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </Link>
                  )}
                </div>
              )
            })}
            <div className="mx-2 h-5 w-px bg-white/10" />
            {resourceLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-body text-[13px] text-[#8B9EB0] hover:text-[#00E5FF] transition-colors"
                >
                  <Icon size={14} />
                  {link.label}
                </a>
              )
            })}
          </div>

          {/* Mobile hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-white p-2 cursor-pointer">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[70] bg-[#050B14] pt-20 px-6 lg:hidden overflow-y-auto"
          >
            <button onClick={() => setMobileOpen(false)} className="absolute top-5 right-6 text-white p-2 cursor-pointer">
              <X size={24} />
            </button>

            <Link to="/" onClick={() => setMobileOpen(false)} className="font-heading text-[24px] font-semibold text-white mb-8 block">
              平台首页
            </Link>

            {navGroups.map((g, _gi) => (
              <div key={g.label} className="mb-6">
                <Link to={g.path} onClick={() => setMobileOpen(false)} className="font-heading text-[18px] font-semibold mb-2 block" style={{ color: g.color }}>
                  {g.label}
                </Link>
                {g.children.length > 0 && (
                  <div className="pl-4 border-l border-[rgba(255,255,255,0.1)] space-y-1.5">
                    {g.children.map((c, ci) => (
                      <motion.div key={c.path} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + ci * 0.03 }}>
                        <Link to={c.path} onClick={() => setMobileOpen(false)} className={`font-body text-[14px] block py-1 ${pathname === c.path ? 'text-[#00E5FF]' : 'text-[#8B9EB0]'}`}>
                          {c.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="mt-8 pt-6 border-t border-[rgba(255,255,255,0.1)] space-y-3">
              {resourceLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 font-body text-[15px] text-[#8B9EB0] hover:text-[#00E5FF]"
                  >
                    <Icon size={17} />
                    {link.label}
                  </a>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
