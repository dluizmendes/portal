'use client'

import { useEffect, useRef, useState } from 'react'

const PROMPT = 'douglas@portfolio:~$'

const HELP = `Available commands:
help                Show this help
skills              Highlight core skills
experience          Recent roles
contact             How to reach me
clear               Clear the screen
random              Surprise command`

const SKILLS = `Cloud/K8s: AWS, EKS, ECS, K8s, Docker
IaC: Terraform, Crossplane
CI/CD: GitHub Actions, Jenkins
Observability: Datadog, Prometheus, Grafana
SRE: SLOs/SLIs, Incident Response, Chaos Engineering`

const EXPERIENCE = `Itaú Unibanco - Sr SRE (2022-Now)
ZUP / Itaú Shop - Sr SRE (2021-2022)
Grupo Mult (BMG) - DevOps (2020-2021)
Avenue Code - SRE (2017-2020)`

const CONTACT = `Email: douglas@example.com
LinkedIn: https://linkedin.com/in/dluizmendes
GitHub: https://github.com/dluizmendes`

const RANDOM_LINES = [
  'Automating toil... ✅',
  'Chaos experiment passed. 🧪',
  'SLOs green. Shipping with confidence. 🚀',
  'MTTR trending down. 📉',
  'Kubernetes pods are happy. 🐳',
]

function getResponse(cmd: string): string {
  const c = cmd.trim().toLowerCase()
  switch (c) {
    case 'help':
      return HELP
    case 'skills':
      return SKILLS
    case 'experience':
      return EXPERIENCE
    case 'contact':
      return CONTACT
    case 'clear':
      return ''
    case 'random':
      return RANDOM_LINES[Math.floor(Math.random() * RANDOM_LINES.length)]
    default:
      return c ? `Command not found: ${cmd}\nType 'help' to see options.` : ''
  }
}

export default function InteractiveTerminal() {
  const [history, setHistory] = useState<string[]>(['Type "help" to see available commands.'])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const response = getResponse(input)
    setHistory((prev) => {
      const next = [...prev, `${PROMPT} ${input}`]
      if (response === '' && input.trim().toLowerCase() === 'clear') return ['Type "help" to see available commands.']
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
        <div className="p-4 font-mono text-sm text-slate-100 space-y-1 min-h-[260px] bg-slate-950">
          {history.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap">{line}</div>
          ))}
          <form onSubmit={onSubmit} className="flex items-center gap-2">
            <span className="text-emerald-400">{PROMPT}</span>
            <input
              autoFocus
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
