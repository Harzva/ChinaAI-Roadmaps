import { Routes, Route, useLocation, Navigate } from 'react-router'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import PageLoader from './components/PageLoader'
import ScrollToTop from './components/ScrollToTop'

/* ─── Platform Home ─── */
import Home from './pages/Home'

/* ─── DeepSeek ─── */
import DeepSeekOverview from './pages/DeepSeekOverview'
import Architecture from './pages/Architecture'
import Benchmarks from './pages/Benchmarks'
import Efficiency from './pages/Efficiency'
import Infrastructure from './pages/Infrastructure'
import Training from './pages/Training'
import PostTraining from './pages/PostTraining'
import Multimodal from './pages/Multimodal'

/* ─── Kimi ─── */
import Kimi from './pages/Kimi'
import KimiArchitecture from './pages/kimi/KimiArchitecture'
import KimiBenchmarks from './pages/kimi/KimiBenchmarks'
import KimiEfficiency from './pages/kimi/KimiEfficiency'
import KimiMultimodal from './pages/kimi/KimiMultimodal'

/* ─── GLM ─── */
import Glm from './pages/Glm'
import GlmArchitecture from './pages/glm/GlmArchitecture'
import GlmBenchmarks from './pages/glm/GlmBenchmarks'
import GlmMultimodal from './pages/glm/GlmMultimodal'

/* ─── MiniMax ─── */
import Minimax from './pages/Minimax'
import MiniMaxArchitecture from './pages/minimax/MiniMaxArchitecture'
import MiniMaxBenchmarks from './pages/minimax/MiniMaxBenchmarks'

/* ─── MiMo ─── */
import Mimo from './pages/Mimo'
import MimoArchitecture from './pages/mimo/MimoArchitecture'
import MimoBenchmarks from './pages/mimo/MimoBenchmarks'

import { useKeyboardNav } from './hooks/useKeyboardNav'

export default function App() {
  const location = useLocation()
  useKeyboardNav()

  return (
    <>
      <PageLoader />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<Layout />}>
            {/* Platform Home */}
            <Route path="/" element={<Home />} />

            {/* DeepSeek Sub-site */}
            <Route path="/deepseek" element={<DeepSeekOverview />} />
            <Route path="/deepseek/architecture" element={<Architecture />} />
            <Route path="/deepseek/benchmarks" element={<Benchmarks />} />
            <Route path="/deepseek/efficiency" element={<Efficiency />} />
            <Route path="/deepseek/infrastructure" element={<Infrastructure />} />
            <Route path="/deepseek/training" element={<Training />} />
            <Route path="/deepseek/post-training" element={<PostTraining />} />
            <Route path="/deepseek/multimodal" element={<Multimodal />} />

            {/* Kimi Sub-site */}
            <Route path="/kimi" element={<Kimi />} />
            <Route path="/kimi/architecture" element={<KimiArchitecture />} />
            <Route path="/kimi/benchmarks" element={<KimiBenchmarks />} />
            <Route path="/kimi/efficiency" element={<KimiEfficiency />} />
            <Route path="/kimi/multimodal" element={<KimiMultimodal />} />

            {/* GLM Sub-site */}
            <Route path="/glm" element={<Glm />} />
            <Route path="/glm/architecture" element={<GlmArchitecture />} />
            <Route path="/glm/benchmarks" element={<GlmBenchmarks />} />
            <Route path="/glm/multimodal" element={<GlmMultimodal />} />

            {/* MiniMax Sub-site */}
            <Route path="/minimax" element={<Minimax />} />
            <Route path="/minimax/architecture" element={<MiniMaxArchitecture />} />
            <Route path="/minimax/benchmarks" element={<MiniMaxBenchmarks />} />

            {/* MiMo Sub-site */}
            <Route path="/mimo" element={<Mimo />} />
            <Route path="/mimo/architecture" element={<MimoArchitecture />} />
            <Route path="/mimo/benchmarks" element={<MimoBenchmarks />} />

            {/* Legacy redirects */}
            <Route path="/architecture" element={<Navigate to="/deepseek/architecture" replace />} />
            <Route path="/benchmarks" element={<Navigate to="/deepseek/benchmarks" replace />} />
            <Route path="/efficiency" element={<Navigate to="/deepseek/efficiency" replace />} />
            <Route path="/infrastructure" element={<Navigate to="/deepseek/infrastructure" replace />} />
            <Route path="/training" element={<Navigate to="/deepseek/training" replace />} />
            <Route path="/post-training" element={<Navigate to="/deepseek/post-training" replace />} />
            <Route path="/multimodal" element={<Navigate to="/deepseek/multimodal" replace />} />
            <Route path="/china-ai" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </AnimatePresence>
      <ScrollToTop />
    </>
  )
}
