"use client"

export default function Recognitions() {
  return (
    <section className="px-6 py-16 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-100 mb-12">🏅 Recognitions</h2>
        <div className="bg-gradient-to-br from-blue-900/80 to-slate-900 rounded-lg p-8 border border-blue-700 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-start gap-8">
            <div className="flex-shrink-0">
              <img 
                src="/datadog-logo.png" 
                alt="Datadog" 
                className="h-32 w-auto object-contain"
              />
            </div>
            <div className="flex-1">
              <p className="text-blue-200 text-sm uppercase tracking-wide mb-2 font-bold">Observability Day 2024</p>
              <h3 className="text-2xl font-semibold text-blue-100 mb-4">Choice of the Day Award</h3>
              <p className="text-blue-200 leading-relaxed">
                Last year, I led the implementation of Datadog across the Beyond Banking platform, with a strong focus on Itaú Shop 2.0, significantly improving observability, monitoring, and operational insights. This initiative was recognized internally at Itaú, earning first place at the Observability Day as the "Choice of the Day," highlighting the quality of the implementation, the real-world use cases presented, and the measurable impact on reliability and operational excellence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
