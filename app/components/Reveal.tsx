'use client'

import { useEffect, useRef, useState } from 'react'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  variant?: 'default' | 'up' | 'down' | 'left' | 'right' | 'scale' | 'depth'
  duration?: number
  threshold?: number
}

export default function Reveal({
  children,
  delay = 0,
  variant = 'default',
  duration = 700,
  threshold = 0.15,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.disconnect()
          }
        })
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  const getVariantClasses = () => {
    const baseClasses = `transition-all ease-out transform`
    const visibleClasses = `opacity-100`
    const hiddenClasses = `opacity-0`

    switch (variant) {
      case 'up':
        return `${baseClasses} ${visible ? `${visibleClasses} translate-y-0` : `${hiddenClasses} translate-y-6`}`
      case 'down':
        return `${baseClasses} ${visible ? `${visibleClasses} translate-y-0` : `${hiddenClasses} -translate-y-6`}`
      case 'left':
        return `${baseClasses} ${visible ? `${visibleClasses} translate-x-0` : `${hiddenClasses} -translate-x-6`}`
      case 'right':
        return `${baseClasses} ${visible ? `${visibleClasses} translate-x-0` : `${hiddenClasses} translate-x-6`}`
      case 'scale':
        return `${baseClasses} ${visible ? `${visibleClasses} scale-100` : `${hiddenClasses} scale-95`}`
      case 'depth':
        return `${baseClasses} ${visible ? 'depth-enter' : 'opacity-0'}`
      default:
        return `${baseClasses} ${visible ? `${visibleClasses} translate-y-0` : `${hiddenClasses} translate-y-6`}`
    }
  }

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms`, transitionDuration: `${duration}ms` }}
      className={getVariantClasses()}
    >
      {children}
    </div>
  )
}
