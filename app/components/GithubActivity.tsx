'use client'

import { useEffect, useState } from 'react'
import { Github, Loader2 } from 'lucide-react'

type Event = {
  type: 'push' | 'create' | string
  repo?: string
  time?: string
  commits?: string[]
  ref?: string
}

type Response = {
  events: Event[]
  error?: string
}

function formatDate(iso?: string) {
  if (!iso) return ''
  const d = new Date(iso)
  return d.toLocaleString()
}

export default function GithubActivity() {
  const [data, setData] = useState<Response | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    fetch('/api/github/activity')
      .then((res) => res.json())
      .then((json: Response) => {
        if (!active) return
        setData(json)
      })
      .catch(() => {
        if (!active) return
        setData({ events: [], error: 'Falha ao carregar atividade' })
      })
      .finally(() => active && setLoading(false))
    return () => {
      active = false
    }
  }, [])

  return (
    <section className="px-6 py-12" id="github">
      <div className="max-w-4xl mx-auto bg-slate-900/70 border border-slate-800 rounded-xl p-6 shadow">
        <div className="flex items-center gap-2 mb-4">
          <Github className="w-5 h-5 text-slate-200" />
          <h3 className="text-lg font-semibold text-slate-100">GitHub Activity</h3>
        </div>
        {loading ? (
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <Loader2 className="w-4 h-4 animate-spin" />
            Carregando atividade...
          </div>
        ) : data?.error ? (
          <p className="text-sm text-red-400">{data.error}</p>
        ) : data?.events?.length ? (
          <div className="space-y-3">
            {data.events.map((ev, idx) => (
              <div key={idx} className="border border-slate-800 rounded-lg p-4 bg-slate-950/60">
                <p className="text-slate-100 text-sm font-semibold">
                  {ev.type === 'push' && 'Push'}
                  {ev.type === 'create' && 'Create'}
                  {ev.type !== 'push' && ev.type !== 'create' && ev.type}
                </p>
                <p className="text-slate-300 text-sm">{ev.repo}</p>
                <p className="text-slate-500 text-xs mb-2">{formatDate(ev.time)}</p>
                {ev.commits && ev.commits.length > 0 && (
                  <ul className="text-xs text-slate-300 space-y-1">
                    {ev.commits.map((c, i) => (
                      <li key={i}>• {c}</li>
                    ))}
                  </ul>
                )}
                {ev.ref && <p className="text-xs text-slate-400">Ref: {ev.ref}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400">Nenhuma atividade recente.</p>
        )}
      </div>
    </section>
  )
}
