"use client"

export default function Certifications() {
  return (
    <section className="px-6 py-16 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-100 mb-12">🏆 Recent Achievements</h2>
        
        <div className="bg-gradient-to-br from-blue-900/80 to-slate-900 rounded-lg p-8 border border-blue-700 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {/* Certification Badge */}
            <div className="flex-shrink-0 text-center">
              <img src="/cnpa-badge.png" alt="CNPA Badge" className="mx-auto mb-4 w-24 h-24 object-contain" />
              <p className="text-sm text-blue-200 font-semibold">CNCF Credential</p>
              <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded bg-blue-700 text-blue-100 font-bold">2025</span>
            </div>

            {/* Certification Details */}
            <div className="flex-1">
              <h3 className="text-2xl font-semibold text-blue-100 mb-2">
                CNPA: Certified Cloud Native Platform Engineering Associate
              </h3>
              <p className="text-blue-200 mb-4">
                Certified by the Cloud Native Computing Foundation (CNCF) for expertise in cloud-native platform engineering, 
                Kubernetes, and modern containerized infrastructure practices.
              </p>
              <a
                href="https://www.credly.com/earner/earned/badge/9ed701ca-54d0-4ba6-ba85-415071ff2c39"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium shadow"
              >
                <span className="mr-2">🔗</span>Verify Credential
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
