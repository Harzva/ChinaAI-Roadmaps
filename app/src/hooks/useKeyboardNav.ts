import { useEffect } from 'react'
import { useNavigate } from 'react-router'

export function useKeyboardNav() {
  const navigate = useNavigate()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't trigger when typing in inputs
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
        return
      }

      switch (e.key.toLowerCase()) {
        case 'h':
          e.preventDefault()
          navigate('/')
          break
        case 'd':
          e.preventDefault()
          navigate('/deepseek')
          break
        case 'k':
          e.preventDefault()
          navigate('/kimi')
          break
        case 'g':
          e.preventDefault()
          navigate('/glm')
          break
        case 'x':
          e.preventDefault()
          navigate('/minimax')
          break
        case 'o':
          e.preventDefault()
          navigate('/mimo')
          break
        case '/':
          e.preventDefault()
          window.scrollTo({ top: 0, behavior: 'smooth' })
          break
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [navigate])
}
