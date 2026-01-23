"use client"

export default function Expertise() {
  const technologies = [
    {
      name: 'AWS',
      icon: '/aws-logo.png',
      description: 'Cloud Infrastructure',
    },
    {
      name: 'Kubernetes',
      icon: '/kubernetes-logo.png',
      description: 'Container Orchestration',
    },
    {
      name: 'Jenkins',
      icon: '/jenkins-logo.png',
      description: 'CI/CD Automation',
    },
    {
      name: 'GitHub',
      icon: '/github-logo.png',
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
              <div className="flex justify-center mb-4">
                <img src={tech.icon} alt={tech.name} className="w-16 h-16 object-contain" />
              </div>
              <h3 className="text-lg font-semibold text-blue-100 mb-2">{tech.name}</h3>
              <p className="text-sm text-blue-200">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
