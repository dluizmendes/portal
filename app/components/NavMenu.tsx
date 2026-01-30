'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Wallet, Languages, FileText, Home } from 'lucide-react'

interface NavLink {
  href: string
  label: string
  icon: React.ReactNode
}

const navLinks: NavLink[] = [
  {
    href: '/',
    label: 'Home',
    icon: <Home className="w-5 h-5" />,
  },
  {
    href: '/spending',
    label: 'Gastos',
    icon: <Wallet className="w-5 h-5" />,
  },
  {
    href: '/language',
    label: 'English',
    icon: <Languages className="w-5 h-5" />,
  },
  {
    href: '/interview-notes',
    label: 'Interview Notes',
    icon: <FileText className="w-5 h-5" />,
  },
]

export default function NavMenu() {
  const pathname = usePathname()

  return (
    <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href))

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition border-b-2 ${
                  isActive
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-slate-400 hover:text-slate-100'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
