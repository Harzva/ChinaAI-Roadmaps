import { Outlet } from 'react-router'
import { motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import SectionNav from './SectionNav'

export default function Layout() {
  return (
    <div className="min-h-[100dvh] bg-[#050B14] text-white">
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <Outlet />
      </motion.main>
      <Footer />
      <SectionNav />
    </div>
  )
}
