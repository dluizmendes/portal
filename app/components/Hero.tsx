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
    <section id="about" className="pt-32 pb-8 px-6 min-h-screen flex items-center bg-slate-950 text-slate-100">
      <div ref={parallaxRef} className="max-w-4xl mx-auto text-center will-change-transform">
        <h1 className="text-5xl md:text-7xl font-bold mb-2 tracking-tight">
          {t('heroTitle')} <span className="text-blue-300">Mendes</span>
        </h1>
        <p className="text-lg text-slate-400 mb-6">{t('heroLocation')}</p>
        <p className="text-xl md:text-2xl text-slate-400 mb-8">
          {t('heroSubtitle')}
        </p>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          {t('heroDescription')}
        </p>
      </div>
    </section>
  )
}
