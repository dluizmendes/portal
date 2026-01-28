'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { Search, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const commands = [
  { label: 'Home', action: '/' },
  { label: 'About', action: '#about' },
  { label: 'Experience', action: '#experience' },
  { label: 'Education', action: '#education' },
  { label: 'Contact', action: '#contact' },
  { label: 'Skills', action: '#skills' },
  { label: 'Projects', action: '#projects' },
  { label: 'Dashboard', action: '/dash' },
  { label: 'Spending (private)', action: '/dash/spending' },
  { label: 'Language (private)', action: '/dash/language' },
  { label: 'Interview Notes', action: '/interview-notes' },
]

type CommandPaletteContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
}

const CommandPaletteContext = createContext<CommandPaletteContextValue | undefined>(undefined)

export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIdx, setSelectedIdx] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((prev) => !prev)
        setSelectedIdx(0)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const filtered = useMemo(() => {
    if (!query) return commands
    return commands.filter((cmd) => cmd.label.toLowerCase().includes(query.toLowerCase()))
  }, [query])

  useEffect(() => {
    setSelectedIdx(0)
  }, [query])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIdx((prev) => (prev + 1) % filtered.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIdx((prev) => (prev - 1 + filtered.length) % filtered.length)
    } else if (e.key === 'Enter' && filtered.length > 0) {
      e.preventDefault()
      go(filtered[selectedIdx].action)
    }
  }

  const go = (action: string) => {
    setOpen(false)
    if (action.startsWith('#')) {
      document.querySelector(action)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push(action)
    }
  }

  const palette = open
    ? createPortal(
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-24 px-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative w-full max-w-lg bg-slate-900 text-slate-100 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-800">
              <Search className="w-4 h-4 text-slate-500" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Buscar ou ir para..."
                className="w-full bg-transparent outline-none text-sm placeholder:text-slate-500"
              />
              <button
                onClick={() => setOpen(false)}
                className="text-slate-500 hover:text-slate-200 transition-transform duration-200 hover:scale-105"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {filtered.map((cmd, idx) => (
                <button
                  key={cmd.label}
                  onClick={() => go(cmd.action)}
                  className={`w-full text-left px-4 py-3 text-sm flex justify-between items-center transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                    idx === selectedIdx
                      ? 'bg-emerald-600/30 border-l-2 border-emerald-400'
                      : 'hover:bg-slate-800'
                  }`}
                >
                  <span>{cmd.label}</span>
                  <span className="text-[11px] text-slate-500">{cmd.action}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <div className="px-4 py-3 text-sm text-slate-500">Nada encontrado</div>
              )}
            </div>
            <div className="px-4 py-3 border-t border-slate-800 text-[11px] text-slate-500 flex items-center gap-2">
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">⌘</kbd>
              <span>+</span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">K</kbd>
              <span className="mx-1">•</span>
              <span>↑↓ para navegar</span>
              <span className="mx-1">•</span>
              <span className="ml-auto text-slate-600">Esc para fechar</span>
            </div>
          </div>
        </div>,
        document.body
      )
    : null

  return (
    <CommandPaletteContext.Provider value={{ open, setOpen }}>
      {children}
      {palette}
    </CommandPaletteContext.Provider>
  )
}

export function useCommandPalette() {
  const ctx = useContext(CommandPaletteContext)
  if (!ctx) throw new Error('useCommandPalette must be used within CommandPaletteProvider')
  return ctx
}
