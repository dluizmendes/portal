"use client"

export default function Expertise() {
  const technologies = [
    { name: 'AWS', icon: '☁️', description: 'Cloud Infrastructure' },
    { name: 'Kubernetes', icon: '⛵', description: 'Container Orchestration' },
    { name: 'Jenkins', icon: '🤖', description: 'CI/CD Automation' },
    { name: 'GitHub Actions', icon: '⚡', description: 'Workflow Automation' },
  ]

  return (
    <section className="px-6 py-16 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-100 mb-4 text-center">
          🚀 Expertise in the Modern Ecosystem
        </h2>
        <p className="text-center text-slate-400 mb-12 max-w-2xl mx-auto">
          Deep hands-on experience with industry-leading technologies for cloud-native 
          infrastructure, containerization, and automation.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech) => (
            <div
              key={tech.name}
              className="bg-slate-800/50 rounded-lg p-6 text-center border border-slate-700 hover:border-blue-500 transition"
            >
              <div className="text-5xl mb-4">{tech.icon}</div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">{tech.name}</h3>
              <p className="text-sm text-slate-400">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
