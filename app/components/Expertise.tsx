"use client"

export default function Expertise() {
  const technologies = [
    {
      name: 'AWS',
      icon: (
        <svg width="50" height="50" viewBox="0 0 40 40" fill="none"><ellipse cx="20" cy="20" rx="18" ry="14" fill="#232F3E"/><path d="M13 25c2 2 8 2 10 0" stroke="#FF9900" strokeWidth="2" strokeLinecap="round"/><ellipse cx="20" cy="18" rx="7" ry="5" fill="#FF9900"/></svg>
      ),
      description: 'Cloud Infrastructure',
    },
    {
      name: 'Kubernetes',
      icon: (
        <svg width="50" height="50" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="18" fill="#326CE5"/><path d="M20 10v20M10 20h20" stroke="#fff" strokeWidth="2"/><circle cx="20" cy="20" r="4" fill="#fff"/></svg>
      ),
      description: 'Container Orchestration',
    },
    {
      name: 'Jenkins',
      icon: (
        <svg width="50" height="50" viewBox="0 0 40 40" fill="none"><ellipse cx="20" cy="20" rx="18" ry="14" fill="#D24939"/><circle cx="20" cy="20" r="6" fill="#fff"/><ellipse cx="20" cy="28" rx="8" ry="3" fill="#fff"/></svg>
      ),
      description: 'CI/CD Automation',
    },
    {
      name: 'GitHub Actions',
      icon: (
        <svg width="50" height="50" viewBox="0 0 40 40" fill="none"><rect x="4" y="4" width="32" height="32" rx="8" fill="#24292F"/><circle cx="28" cy="28" r="4" fill="#2EA44F"/><rect x="12" y="12" width="16" height="4" rx="2" fill="#fff"/></svg>
      ),
      description: 'Workflow Automation',
    },
  ];

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
              className="bg-gradient-to-br from-slate-800 to-blue-900 rounded-lg p-6 text-center border border-blue-700 hover:border-blue-400 transition shadow-lg"
            >
              <div className="flex justify-center mb-4">{tech.icon}</div>
              <h3 className="text-lg font-semibold text-blue-100 mb-2">{tech.name}</h3>
              <p className="text-sm text-blue-200">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
