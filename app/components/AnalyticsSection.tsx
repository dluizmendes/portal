'use client'

const metrics = [
  { label: 'Pageviews (30d)', value: '12.4k', delta: '+18%' },
  { label: 'Avg time on page', value: '2m 45s', delta: '+6%' },
  { label: 'Bounce rate', value: '38%', delta: '-4%' },
  { label: 'Top geo', value: 'Brazil (42%)', delta: '' },
]

const timeline = [50, 62, 58, 71, 69, 80, 92, 88, 95, 102, 110]

export default function AnalyticsSection() {
  return (
    <section className="px-6 py-12" id="analytics">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-wide text-slate-500">Insights</p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Portfolio Analytics (mock)</h2>
          <p className="text-sm text-slate-500">Use como placeholder; pode conectar Vercel Analytics depois.</p>
        </div>
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {metrics.map((m) => (
            <div key={m.label} className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <p className="text-xs text-slate-500">{m.label}</p>
              <p className="text-xl font-semibold text-slate-900 dark:text-slate-100">{m.value}</p>
              {m.delta && <p className="text-xs text-emerald-400">{m.delta}</p>}
            </div>
          ))}
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4">
          <p className="text-sm text-slate-500 mb-3">Traffic trend (mock)</p>
          <div className="h-32 flex items-end gap-2">
            {timeline.map((v, idx) => (
              <div
                key={idx}
                className="flex-1 bg-gradient-to-t from-emerald-500/40 to-emerald-400/70 rounded"
                style={{ height: `${(v / Math.max(...timeline)) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
