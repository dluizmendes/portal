import AnalyticsSection from '@/app/components/AnalyticsSection'
import GithubActivity from '@/app/components/GithubActivity'

export const metadata = {
  title: 'Insights - Dashboard',
}

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-6xl mx-auto py-16">
        <h1 className="text-3xl font-bold mb-6 px-6">📊 Insights</h1>
        <AnalyticsSection />
        <GithubActivity />
      </div>
    </div>
  )
}
