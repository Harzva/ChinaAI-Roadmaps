import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router'
import { ChevronLeft, ChevronRight, Circle } from 'lucide-react'

interface SectionItem {
  id: string
  label: string
  el: HTMLElement
}

export default function SectionNav() {
  const [sections, setSections] = useState<SectionItem[]>([])
  const [activeId, setActiveId] = useState<string | null>(null)
  const [collapsed, setCollapsed] = useState(false)
  const [visible, setVisible] = useState(false)
  const location = useLocation()
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Scan for h2 headings on each route change and assign IDs
  useEffect(() => {
    // Small delay to allow page content to mount
    const timer = setTimeout(() => {
      const main = document.querySelector('main')
      if (!main) return

      const headings = main.querySelectorAll('h2')
      const items: SectionItem[] = []

      headings.forEach((heading, i) => {
        const id = `section-nav-${i}`
        if (!heading.id) {
          heading.id = id
        }
        items.push({
          id: heading.id,
          label: heading.textContent?.trim() || `Section ${i + 1}`,
          el: heading,
        })
      })

      setSections(items)
      setVisible(items.length > 1)
      setActiveId(null)
    }, 100)

    return () => clearTimeout(timer)
  }, [location.pathname])

  // IntersectionObserver to track active section
  useEffect(() => {
    if (sections.length === 0) return

    observerRef.current?.disconnect()

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((e) => e.isIntersecting)
        if (visibleEntries.length > 0) {
          // Pick the one closest to top of viewport
          const topmost = visibleEntries.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
          )
          setActiveId(topmost.target.id)
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    )

    sections.forEach((s) => observer.observe(s.el))
    observerRef.current = observer

    return () => observer.disconnect()
  }, [sections])

  const scrollToSection = useCallback((item: SectionItem) => {
    item.el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [])

  if (!visible || sections.length < 2) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="hidden lg:block fixed right-4 top-1/2 -translate-y-1/2 z-40"
      style={{ width: collapsed ? 44 : 200 }}
    >
      <div
        className="liquid-glass rounded-[12px] p-3 transition-all duration-300"
        style={{ border: '1px solid rgba(0,229,255,0.15)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          {!collapsed && (
            <span className="text-[11px] font-body uppercase tracking-[0.1em] text-[#8B9EB0] pl-1">
              目录
            </span>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-[rgba(0,229,255,0.1)] transition-colors cursor-pointer ml-auto"
            aria-label={collapsed ? 'Expand section nav' : 'Collapse section nav'}
          >
            {collapsed ? (
              <ChevronLeft size={14} className="text-[#00E5FF]" />
            ) : (
              <ChevronRight size={14} className="text-[#00E5FF]" />
            )}
          </button>
        </div>

        {/* Section list */}
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.25 }}
              className="flex flex-col gap-1"
            >
              {sections.map((item) => {
                const isActive = activeId === item.id
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item)}
                    className={`relative text-left px-2 py-1.5 rounded-[6px] text-[12px] font-body leading-[1.4] transition-all duration-200 cursor-pointer group ${
                      isActive
                        ? 'text-[#00E5FF] bg-[rgba(0,229,255,0.08)]'
                        : 'text-[#8B9EB0] hover:text-white hover:bg-[rgba(255,255,255,0.04)]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Circle
                        size={6}
                        className={`flex-shrink-0 transition-all duration-200 ${
                          isActive
                            ? 'text-[#00E5FF] fill-[#00E5FF]'
                            : 'text-[#8B9EB0] group-hover:text-white'
                        }`}
                      />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {isActive && (
                      <motion.div
                        layoutId="section-indicator"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-[#00E5FF] rounded-full"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </button>
                )
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed dots indicator */}
        {collapsed && (
          <div className="flex flex-col items-center gap-2 py-1">
            {sections.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item)}
                className="w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer"
                style={{
                  background:
                    activeId === item.id
                      ? '#00E5FF'
                      : 'rgba(139,158,176,0.4)',
                  boxShadow:
                    activeId === item.id
                      ? '0 0 6px rgba(0,229,255,0.6)'
                      : 'none',
                }}
                aria-label={item.label}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
