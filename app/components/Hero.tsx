"use client"

export default function Hero() {
  return (
    <section id="about" className="pt-32 pb-8 px-6 min-h-screen flex items-center bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-2 tracking-tight">
          Douglas Luiz <span className="text-blue-300">Mendes</span>
        </h1>
        <p className="text-lg text-slate-400 mb-6">🌍 Brazil - Remotely</p>
        <p className="text-xl md:text-2xl text-slate-400 mb-8">
          Cloud-Native Platform Engineering Associate & Kubernetes Certified
        </p>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Site Reliability Engineer focused on building resilient, observable, and automated infrastructure.
          Experienced with cloud platforms, containerization, and infrastructure-as-code.
        </p>
      </div>
    </section>
  )
}
