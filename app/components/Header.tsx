"use client"
import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { LogIn, LogOut, Search, Menu, X } from 'lucide-react'
import { useCommandPalette } from './CommandPaletteProvider'
import { useLocale } from './LocaleContext'

export default function Header() {
  const { data: session } = useSession()
  const { setOpen: openPalette } = useCommandPalette()
  const { locale, setLocale, t } = useLocale()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const navItems = [
    { label: t('about'), href: '#about' },
    { label: t('experience'), href: '#experience' },
    { label: t('education'), href: '#education' },
    { label: t('contact'), href: '#contact' },
  ]

  const closeMenu = () => setMobileMenuOpen(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-950/90 backdrop-blur border-b border-slate-800/50 z-50 fade-in-down">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-slate-200 hover:text-cyan-400 transition-colors duration-300 group">
          <span className="inline-block group-hover:-rotate-6 transition-transform duration-300">🚀</span>
          {' '}Douglas Mendes
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-6 text-sm items-center">
          {navItems.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              className="text-slate-400 hover:text-cyan-400 transition-all duration-300 relative group"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <span className="relative">
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </span>
            </a>
          ))}
          <button
            onClick={() => openPalette(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 rounded-md transition-all duration-300 text-slate-200 hover:shadow-lg hover:shadow-cyan-500/30 group"
            title="Command Palette (Cmd/Ctrl + K)"
          >
            <Search className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
          </button>
          <button
            onClick={() => setLocale(locale === 'en' ? 'pt-BR' : 'en')}
            className="px-2 py-1.5 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 rounded-md transition-all duration-300 text-slate-200 text-sm hover:shadow-lg hover:shadow-cyan-500/20 group"
            title={locale === 'en' ? 'Português' : 'English'}
          >
            <span className="inline-block group-hover:rotate-12 transition-transform duration-300">{locale === 'en' ? '🇺🇸' : '🇧🇷'}</span>
          </button>
          {session && (
            <>
              <Link href="/spending" className="text-emerald-400 hover:text-emerald-300 transition-all duration-300 font-medium relative group">
                {t('spending')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/language" className="text-emerald-400 hover:text-emerald-300 transition-all duration-300 font-medium relative group">
                {t('language')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/interview-notes" className="text-emerald-400 hover:text-emerald-300 transition-all duration-300 font-medium relative group">
                {t('interviewNotes')}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </>
          )}
          {session ? (
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-red-900/50 to-red-800/50 hover:from-red-800 hover:to-red-700 rounded-md transition-all duration-300 text-slate-200 hover:shadow-lg hover:shadow-red-500/30 group"
            >
              <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
            </button>
          ) : (
            <Link 
              href="/auth/signin"
              className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-900/50 to-emerald-800/50 hover:from-emerald-800 hover:to-emerald-700 rounded-md transition-all duration-300 text-slate-200 hover:shadow-lg hover:shadow-emerald-500/30 group"
            >
              <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          )}
        </nav>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => setLocale(locale === 'en' ? 'pt-BR' : 'en')}
            className="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md transition text-slate-200 text-sm"
          >
            {locale === 'en' ? '🇺🇸' : '🇧🇷'}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-md transition text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800/50 animate-in fade-in slide-in-from-top-2 duration-300">
          <nav className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-3">
            {navItems.map((item, idx) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="text-slate-300 hover:text-cyan-400 transition-all duration-300 py-2 relative group stagger-enter"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                {item.label}
                <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
            <button
              onClick={() => { openPalette(true); closeMenu() }}
              className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-700 hover:to-slate-600 rounded-md transition-all duration-300 text-slate-200 text-left hover:shadow-lg hover:shadow-cyan-500/20 group"
            >
              <Search className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              {t('command')}
            </button>
          {session && (
            <>
              <Link href="/spending" onClick={closeMenu} className="text-emerald-400 hover:text-emerald-300 transition-all duration-300 py-2 relative group">
                {t('spending')}
                <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/language" onClick={closeMenu} className="text-emerald-400 hover:text-emerald-300 transition-all duration-300 py-2 relative group">
                {t('language')}
                <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/interview-notes" onClick={closeMenu} className="text-emerald-400 hover:text-emerald-300 transition-all duration-300 py-2 relative group">
                {t('interviewNotes')}
                <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-emerald-400 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </>
          )}
            {session ? (
              <button
                onClick={() => { signOut(); closeMenu() }}
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-900/50 to-red-800/50 hover:from-red-800 hover:to-red-700 rounded-md transition-all duration-300 text-slate-200 text-left hover:shadow-lg hover:shadow-red-500/20 group"
              >
                <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
                {t('logout')}
              </button>
            ) : (
              <Link
                href="/auth/signin"
                onClick={closeMenu}
                className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-emerald-900/50 to-emerald-800/50 hover:from-emerald-800 hover:to-emerald-700 rounded-md transition-all duration-300 text-slate-200 text-left hover:shadow-lg hover:shadow-emerald-500/20 group"
              >
                <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                {t('login')}
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
