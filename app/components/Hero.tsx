"use client"

import { useEffect, useRef } from 'react'
import { useLocale } from './LocaleContext'

export default function Hero() {
  const { t } = useLocale()
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let raf = 0
    const update = () => {
      const el = parallaxRef.current
      if (!el) return
      const offset = window.scrollY * 0.15
      el.style.transform = `translate3d(0, ${offset}px, 0)`
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])
  
  return (
    <section id="about" className="pt-32 pb-8 px-6 min-h-screen flex items-center bg-slate-950 text-slate-100 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div ref={parallaxRef} className="max-w-4xl mx-auto text-center will-change-transform relative z-10">
        <h1 className="text-5xl md:text-7xl font-bold mb-2 tracking-tight fade-in-down">
          {t('heroTitle')} <span className="text-blue-300 bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">Mendes</span>
        </h1>
        <p className="text-lg text-slate-400 mb-6 fade-in-down" style={{ animationDelay: '100ms' }}>
          {t('heroLocation')} <span className="inline-block animate-bounce" style={{ animationDelay: '200ms' }}>🚀</span>
        </p>
        <p className="text-xl md:text-2xl text-slate-400 mb-8 fade-in-down" style={{ animationDelay: '200ms' }}>
          {t('heroSubtitle')}
        </p>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed fade-in-down" style={{ animationDelay: '300ms' }}>
          {t('heroDescription')}
        </p>
      </div>
    </section>
  )
}
