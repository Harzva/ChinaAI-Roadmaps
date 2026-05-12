import { memo } from 'react'

interface HolographicTextProps {
  text: string
  className?: string
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3'
}

const HolographicText = memo(function HolographicText({ text, className = '', as: Tag = 'span' }: HolographicTextProps) {
  return (
    <Tag
      className={`relative inline-block ${className}`}
      style={{ textShadow: '0 0 10px currentColor' }}
      data-text={text}
    >
      {text}
      <span
        aria-hidden
        className="absolute left-0 top-0 w-full h-full pointer-events-none overflow-hidden"
        style={{
          color: 'inherit',
          clipPath: 'inset(0 100% 0 0)',
          animation: 'holographic-scan 4s infinite',
          filter: 'hue-rotate(90deg)',
          opacity: 0.6,
        }}
      >
        {text}
      </span>
    </Tag>
  )
})

export default HolographicText
