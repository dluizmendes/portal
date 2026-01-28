"use client"

import { useLocale } from './LocaleContext'

export default function Hero() {
  const { t } = useLocale()
  
  return (
    <section id="about" className="pt-32 pb-8 px-6 min-h-screen flex items-center bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto text-center">
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
