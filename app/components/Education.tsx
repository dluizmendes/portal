"use client"

const EDUCATION = [
  {
    title: 'Postgraduate Degree in Site Reliability Engineering',
    issuer: 'PUC Minas',
    year: 'Completed',
  },
  {
    title: 'Bachelor\'s Degree in Information Systems',
    issuer: 'PUC Minas',
    year: 'Completed',
  },
]

// ...existing code...
const CERTIFICATIONS = [
  { 
    title: 'CNPA: Certified Cloud Native Platform Engineering Associate', 
    issuer: 'CNCF', 
    year: '2025', 
    badge: '/cnpa-badge-cert.png',
    description: 'Cloud-native platform engineering and modern infrastructure practices.'
  },
  { 
    title: 'AWS Solutions Architect, Associate', 
    issuer: 'AWS', 
    year: '2022', 
    badge: '/aws-architect-badge.png',
    description: 'Design and deploy AWS infrastructure solutions.'
  },
  { 
    title: 'AWS Cloud Practitioner', 
    issuer: 'AWS', 
    year: '2022', 
    badge: '/aws-practitioner-badge.png',
    description: 'Foundational knowledge of AWS cloud services and best practices.'
  },
  { 
    title: 'Certified Kubernetes Administrator (CKA)', 
    issuer: 'CNCF', 
    year: '2021', 
    badge: '/cka-badge.png',
    description: 'Expert-level Kubernetes cluster management and orchestration.'
  },
  { 
    title: 'Google Cloud Associate Cloud Engineer', 
    issuer: 'Google Cloud', 
    year: '2020', 
    badge: '/gcp-badge.png',
    description: 'Deploy and manage Google Cloud infrastructure and applications.'
  },
  { 
    title: 'Oracle Cloud Infrastructure Architect Associate', 
    issuer: 'Oracle', 
    year: '2020', 
    badge: '/oracle-badge.png',
    description: 'Design and implement Oracle Cloud Infrastructure solutions.'
  },
]

export default function Education() {
  return (
    <section id="education" className="px-6 py-16 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-100 mb-12">🎓 Education & Certifications</h2>
        
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-slate-100 mb-6">📚 Degrees</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                <p className="text-blue-400 text-sm uppercase tracking-wide mb-2">{edu.year}</p>
                <h4 className="text-lg font-semibold text-slate-100 mb-2">{edu.title}</h4>
                <p className="text-slate-400 text-sm">{edu.issuer}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-blue-100 mb-6">🏆 Certifications</h3>
          <div className="space-y-4">
            {CERTIFICATIONS.map((cert, idx) => (
              <div key={idx} className="bg-gradient-to-br from-blue-900/80 to-slate-900 rounded-lg p-6 border border-blue-700 shadow-lg flex gap-6">
                <div className="flex-shrink-0">
                  <img src={cert.badge} alt={cert.title} className="h-24 w-24 object-contain" />
                </div>
                <div className="flex-1">
                  <p className="text-blue-200 text-sm uppercase tracking-wide mb-1 font-bold">{cert.year}</p>
                  <h4 className="text-lg font-semibold text-blue-100 mb-2">{cert.title}</h4>
                  <p className="text-blue-200 text-sm mb-2">{cert.description}</p>
                  <p className="text-blue-300 text-xs font-medium">{cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
