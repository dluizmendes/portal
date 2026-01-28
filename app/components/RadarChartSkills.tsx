'use client'

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts'
import { useLocale } from './LocaleContext'

const data = [
  { subject: 'Cloud', A: 90, fullMark: 100 },
  { subject: 'Kubernetes', A: 95, fullMark: 100 },
  { subject: 'IaC', A: 92, fullMark: 100 },
  { subject: 'CI/CD', A: 88, fullMark: 100 },
  { subject: 'Observability', A: 90, fullMark: 100 },
  { subject: 'SRE/Resilience', A: 94, fullMark: 100 },
]

export default function RadarChartSkills() {
  const { t } = useLocale()
  
  return (
    <div className="w-full h-96 min-h-[460px] bg-slate-900/60 border border-slate-800 rounded-xl p-5">
      <p className="text-sm text-slate-300 mb-4 leading-relaxed">
        {t('radarProfile')}
      </p>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis dataKey="subject" stroke="#cbd5e1" tick={{ fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={{ fontSize: 10 }} />
          <Radar name="Skill" dataKey="A" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.3} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
