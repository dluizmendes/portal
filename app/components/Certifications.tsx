"use client"

export default function Certifications() {
  return (
    <section className="px-6 py-16 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-100 mb-12">🏆 Recent Achievements</h2>
        
        <div className="bg-slate-800/50 rounded-lg p-8 border border-slate-700">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {/* Certification Badge */}
            <div className="flex-shrink-0 text-center">
              <div className="text-6xl mb-4">🎖️</div>
              <p className="text-sm text-slate-400">CNCF Credential</p>
            </div>

            {/* Certification Details */}
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-slate-100 mb-2">
                CNPA: Certified Cloud Native Platform Engineering Associate
              </h3>
              <p className="text-slate-400 mb-4">
                Certified by the Cloud Native Computing Foundation (CNCF) for expertise in cloud-native platform engineering, 
                Kubernetes, and modern containerized infrastructure practices.
              </p>
              <a
                href="https://www.credly.com/earner/earned/badge/9ed701ca-54d0-4ba6-ba85-415071ff2c39"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium"
              >
                🔗 Verify Credential
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
