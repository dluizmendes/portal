"use client"

export default function BlogPreview(){
  const posts = [
    {title: 'Reducing MTTR with Runbooks', href:'#'},
    {title: 'Migrating to EKS', href:'#'},
    {title: 'Safe Terraform Practices', href:'#'},
  ]

  return (
    <section id="blog" className="py-16 bg-slate-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-slate-900">From the blog</h2>
        <ul className="mt-6 space-y-3">
          {posts.map(p=> (
            <li key={p.title}>
              <a href={p.href} className="text-slate-700 hover:text-slate-900">{p.title}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
