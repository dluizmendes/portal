"use client"
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { LogIn, LogOut, Search } from 'lucide-react'
import { useCommandPalette } from './CommandPaletteProvider'
import { useLocale } from './LocaleContext'

export default function Header() {
  const { data: session } = useSession()
  const { setOpen: openPalette } = useCommandPalette()
  const { locale, setLocale, t } = useLocale()
  
  const navItems = [
    { label: t('about'), href: '#about' },
    { label: t('experience'), href: '#experience' },
    { label: t('education'), href: '#education' },
    { label: t('contact'), href: '#contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-950/90 backdrop-blur border-b border-slate-800 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-slate-200">Douglas Mendes</Link>
        <nav className="flex gap-3 md:gap-6 text-xs md:text-sm flex-wrap items-center">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-slate-400 hover:text-slate-200 transition-transform duration-200 hover:-translate-y-0.5"
            >
              {item.label}
            </a>
          ))}
          <button
            onClick={() => openPalette(true)}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md transition-all duration-200 text-slate-200 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg hover:shadow-emerald-500/10"
            title="Command Palette (Cmd/Ctrl + K)"
          >
            <Search className="w-4 h-4" />
            <span className="hidden md:inline">{t('command')}</span>
          </button>
          <button
            onClick={() => setLocale(locale === 'en' ? 'pt-BR' : 'en')}
            className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md transition-all duration-200 text-slate-200 text-sm hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg hover:shadow-emerald-500/10"
            title={locale === 'en' ? 'Português' : 'English'}
          >
            {locale === 'en' ? '🇺🇸' : '🇧🇷'}
            <span className="hidden md:inline">{locale === 'en' ? 'EN' : 'PT'}</span>
          </button>
          {session && (
            <>
              <Link href="/dash" className="text-emerald-400 hover:text-emerald-300 transition font-medium">
                {t('dashboard')}
              </Link>
              <Link href="/dash/language" className="text-emerald-400 hover:text-emerald-300 transition font-medium">
                {t('language')}
              </Link>
              <Link href="/interview-notes" className="text-emerald-400 hover:text-emerald-300 transition font-medium">
                {t('interviewNotes')}
              </Link>
            </>
          )}
          {session ? (
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md transition-all duration-200 text-slate-200 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">{t('logout')}</span>
            </button>
          ) : (
            <button
              onClick={() => signIn('github')}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md transition-all duration-200 text-slate-200 hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden md:inline">{t('login')}</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
