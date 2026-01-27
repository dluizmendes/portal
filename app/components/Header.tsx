"use client"
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { LogIn, LogOut } from 'lucide-react'

export default function Header() {
  const { data: session } = useSession()
  
  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 bg-slate-950/90 backdrop-blur border-b border-slate-800 z-50">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-slate-200">Douglas Mendes</Link>
        <nav className="flex gap-4 md:gap-8 text-xs md:text-sm flex-wrap items-center">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-slate-400 hover:text-slate-200 transition">
              {item.label}
            </a>
          ))}
          {session && (
            <>
              <Link href="/dash" className="text-emerald-400 hover:text-emerald-300 transition font-medium">
                Dashboard
              </Link>
              <Link href="/interview-notes" className="text-emerald-400 hover:text-emerald-300 transition font-medium">
                Interview Notes
              </Link>
            </>
          )}
          {session ? (
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md transition text-slate-200"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:inline">Sair</span>
            </button>
          ) : (
            <button
              onClick={() => signIn('github')}
              className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md transition text-slate-200"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden md:inline">Login</span>
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}
