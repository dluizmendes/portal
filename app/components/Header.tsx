"use client"
import { useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
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
    <header className="fixed top-0 left-0 right-0 bg-slate-950/90 backdrop-blur border-b border-slate-800 z-50">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-slate-200">Douglas Mendes</Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-4 text-sm items-center">
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
            className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md transition-all duration-200 text-slate-200 hover:-translate-y-0.5 active:translate-y-0"
            title="Command Palette (Cmd/Ctrl + K)"
          >
            <Search className="w-4 h-4" />
          </button>
          <button
            onClick={() => setLocale(locale === 'en' ? 'pt-BR' : 'en')}
            className="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md transition-all duration-200 text-slate-200 text-sm hover:-translate-y-0.5 active:translate-y-0"
            title={locale === 'en' ? 'Português' : 'English'}
          >
            {locale === 'en' ? '🇺🇸' : '🇧🇷'}
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
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md transition-all duration-200 text-slate-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => signIn('github')}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md transition-all duration-200 text-slate-200 hover:-translate-y-0.5 active:translate-y-0"
            >
              <LogIn className="w-4 h-4" />
            </button>
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
        <div className="lg:hidden bg-slate-900 border-b border-slate-800">
          <nav className="max-w-5xl mx-auto px-4 py-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className="text-slate-300 hover:text-slate-100 transition py-2"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => { openPalette(true); closeMenu() }}
              className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-md transition text-slate-200 text-left"
            >
              <Search className="w-4 h-4" />
              {t('command')}
            </button>
            {session && (
              <>
                <Link href="/dash" onClick={closeMenu} className="text-emerald-400 hover:text-emerald-300 transition py-2">
                  {t('dashboard')}
                </Link>
                <Link href="/dash/language" onClick={closeMenu} className="text-emerald-400 hover:text-emerald-300 transition py-2">
                  {t('language')}
                </Link>
                <Link href="/interview-notes" onClick={closeMenu} className="text-emerald-400 hover:text-emerald-300 transition py-2">
                  {t('interviewNotes')}
                </Link>
              </>
            )}
            {session ? (
              <button
                onClick={() => { signOut(); closeMenu() }}
                className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-md transition text-slate-200 text-left"
              >
                <LogOut className="w-4 h-4" />
                {t('logout')}
              </button>
            ) : (
              <button
                onClick={() => { signIn('github'); closeMenu() }}
                className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 rounded-md transition text-slate-200 text-left"
              >
                <LogIn className="w-4 h-4" />
                {t('login')}
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
