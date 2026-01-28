'use client'

import { useLocale } from './LocaleContext'

export default function Footer() {
  const { t } = useLocale()

  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="max-w-5xl mx-auto px-6 py-8 text-center text-sm text-slate-500">
        <p>{t('footerBuilt')}</p>
        <p className="mt-2 text-xs text-slate-600">{t('footerDeveloped')}</p>
        <p className="mt-1 text-xs text-slate-600">{t('footerCredit')}</p>
      </div>
    </footer>
  )
}
