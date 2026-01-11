"use client"
import Link from 'next/link'

export default function Header() {
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
        <nav className="flex gap-8 text-sm">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="text-slate-400 hover:text-slate-200 transition">
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
