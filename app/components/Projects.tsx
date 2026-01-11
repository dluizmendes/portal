"use client"

function ProjectCard({ title, desc, tech, url }: { title: string; desc: string; tech: string[]; url?: string }) {
  return (
    <article className="p-6 bg-white border rounded-lg shadow-sm">
      <h3 className="font-semibold text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600 mt-2">{desc}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tech.map((t) => (
          <span key={t} className="text-xs bg-slate-100 px-2 py-1 rounded">{t}</span>
        ))}
      </div>
      {url && (
        <a href={url} className="mt-4 inline-block text-sm text-blue-600">View →</a>
      )}
    </article>
  )
}

export default function Projects() {
  const items = [
    { title: 'Infra as code', desc: 'Reusable Terraform modules for multi-account AWS.', tech: ['Terraform', 'AWS'], url: '#' },
    { title: 'K8s Platform', desc: 'Self-service Kubernetes platform with GitOps.', tech: ['Kubernetes', 'ArgoCD'], url: '#' },
    { title: 'Observability', desc: 'Metrics and tracing for critical services.', tech: ['Prometheus', 'Grafana'], url: '#' },
  ]

  return (
    <section id="projects" className="py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-slate-900">Projects</h2>
        <div className="mt-6 grid gap-6 grid-cols-1 md:grid-cols-2">
          {items.map((it) => (
            <ProjectCard key={it.title} title={it.title} desc={it.desc} tech={it.tech} url={it.url} />
          ))}
        </div>
      </div>
    </section>
  )
}
