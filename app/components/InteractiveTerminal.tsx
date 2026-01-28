'use client'

import { useEffect, useRef, useState } from 'react'
import { useLocale } from './LocaleContext'

const PROMPT = 'douglas@portfolio:~$'

export default function InteractiveTerminal() {
  const { t } = useLocale()
  const [history, setHistory] = useState<string[]>([])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize with translated help text
  useEffect(() => {
    setHistory([t('terminalTypeHelp')])
  }, [t])

  const getResponse = (cmd: string): string => {
    const c = cmd.trim().toLowerCase()
    switch (c) {
      case 'help':
        return t('terminalHelp')
      case 'skills':
        return t('terminalSkills')
      case 'experience':
        return t('terminalExperience')
      case 'contact':
        return t('terminalContact')
      case 'clear':
        return ''
      case 'random':
        const options = [
          t('terminalAutomating'),
          t('terminalChaos'),
          t('terminalShipping'),
          t('terminalMTTR'),
          t('terminalKubernetes'),
        ]
        return options[Math.floor(Math.random() * options.length)]
      default:
        return c ? `${t('terminalCommandNotFound')}: ${cmd}\n${t('terminalTypeHelp')}` : ''
    }
  }

  useEffect(() => {
    const c = containerRef.current
    if (c) c.scrollTop = c.scrollHeight
  }, [history])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const response = getResponse(input)
    setHistory((prev) => {
      const next = [...prev, `${PROMPT} ${input}`]
      if (response === '' && input.trim().toLowerCase() === 'clear') return [t('terminalTypeHelp')]
      if (response) next.push(response)
      return next
    })
    setInput('')
  }

  return (
    <section className="px-6 py-12" id="terminal">
      <div className="max-w-4xl mx-auto bg-slate-900/80 border border-slate-800 rounded-xl shadow-lg overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-slate-800 bg-slate-900">
          <span className="w-3 h-3 rounded-full bg-red-500" />
          <span className="w-3 h-3 rounded-full bg-amber-400" />
          <span className="w-3 h-3 rounded-full bg-emerald-500" />
          <span className="ml-3 text-sm text-slate-400">Interactive Terminal</span>
        </div>
        <div
          ref={containerRef}
          className="p-4 font-mono text-sm text-slate-100 space-y-1 min-h-[260px] max-h-[320px] md:max-h-[380px] bg-slate-950 overflow-y-auto"
        >
          {history.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap">{line}</div>
          ))}
          <form onSubmit={onSubmit} className="flex items-center gap-2">
            <span className="text-emerald-400">{PROMPT}</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-slate-100"
              placeholder="Type a command"
            />
          </form>
          <div ref={bottomRef} />
        </div>
      </div>
    </section>
  )
}
