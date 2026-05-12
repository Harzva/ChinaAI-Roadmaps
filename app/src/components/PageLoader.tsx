import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router'

export default function PageLoader() {
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const location = useLocation()

  useEffect(() => {
    setLoading(true)
    setProgress(0)

    // Simulate progress ramp-up
    const progressTimer = setTimeout(() => setProgress(70), 50)
    const finishTimer = setTimeout(() => {
      setProgress(100)
      const hideTimer = setTimeout(() => setLoading(false), 300)
      return () => clearTimeout(hideTimer)
    }, 500)

    return () => {
      clearTimeout(progressTimer)
      clearTimeout(finishTimer)
    }
  }, [location])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-[#00E5FF] z-[100]"
          initial={{ width: '0%', opacity: 1 }}
          animate={{ width: `${progress}%`, opacity: progress >= 100 ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{
            boxShadow: '0 0 8px rgba(0,229,255,0.6), 0 0 16px rgba(0,229,255,0.3)',
          }}
        />
      )}
    </AnimatePresence>
  )
}
