"use client"

const FOCUS_ITEMS = [
  {
    status: 'current',
    title: 'Ensuring reliability at Itaú',
    icon: '🎯',
  },
  {
    status: 'completed',
    title: 'Ensured end-to-end observability using Datadog',
    icon: '✓',
  },
  {
    status: 'completed',
    title: 'Strengthened engineering teams with SRE best practices',
    icon: '✓',
  },
]

export const CURRENT_WORK = {
  title: 'Current Focus',
}

export default function CurrentWork() {
  return (
    <section className="px-6 py-12 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <p className="text-slate-400 text-sm uppercase tracking-wide mb-6">Focus Areas</p>
        <div className="space-y-3">
          {FOCUS_ITEMS.map((item, idx) => (
            <div key={idx} className="border border-slate-700 rounded-lg p-4 bg-slate-900/50">
              <div className="flex items-start gap-3">
                <span className={`text-2xl flex-shrink-0 ${item.status === 'completed' ? 'text-green-400' : 'text-blue-400'}`}>
                  {item.icon}
                </span>
                <div className="flex-1">
                  <p className="text-slate-100 font-medium">{item.title}</p>
                  {item.status === 'completed' && (
                    <p className="text-xs text-green-400 mt-1">Completed</p>
                  )}
                  {item.status === 'current' && (
                    <p className="text-xs text-blue-400 mt-1">In Progress</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
