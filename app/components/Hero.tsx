"use client"

export default function Hero() {
  return (
    <section id="about" className="pt-32 pb-16 px-6 min-h-screen flex items-center">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-slate-100 mb-2 tracking-tight">
          Douglas Luiz <span className="text-blue-300">Mendes</span>
        </h1>
        <p className="text-lg text-slate-400 mb-6">🌍 Brazil - Remotely</p>
        <p className="text-xl md:text-2xl text-slate-400 mb-8">
          Cloud-Native Platform Engineering Associate & Kubernetes Certified
        </p>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8">
          Site Reliability Engineer focused on building resilient, observable, and automated infrastructure.
          Experienced with cloud platforms, containerization, and infrastructure-as-code.
        </p>
        <a
          href="/(Dez_25) Douglas - Site Reliability Engineer (pdf) (1).pdf"
          download
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Download CV
        </a>
      </div>
    </section>
  )
}
