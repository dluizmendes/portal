"use client"

const SKILLS = {
  'Cloud & Platforms': [
    { name: 'AWS (EKS, ECS, EC2, IAM, S3, Lambda, API Gateway)', level: 5, icon: '☁️' },
    { name: 'Azure', level: 2, icon: '☁️' },
    { name: 'GCP', level: 2, icon: '☁️' },
  ],
  'Containers & Orchestration': [
    { name: 'Kubernetes', level: 5, icon: '⛵' },
    { name: 'Docker', level: 5, icon: '🐋' },
  ],
  'Infrastructure as Code': [
    { name: 'Terraform', level: 5, icon: '🏗️' },
    { name: 'Crossplane', level: 4, icon: '🏗️' },
  ],
  'CI/CD & Automation': [
    { name: 'Jenkins', level: 4, icon: '🤖' },
    { name: 'GitHub Actions', level: 4, icon: '🔄' },
    { name: 'Azure DevOps', level: 3, icon: '🔄' },
    { name: 'Shell', level: 5, icon: '💻' },
    { name: 'PowerShell', level: 3, icon: '💻' },
  ],
  'Observability & Incident Management': [
    { name: 'Datadog', level: 5, icon: '📊' },
    { name: 'Prometheus', level: 4, icon: '📈' },
    { name: 'Grafana', level: 4, icon: '📊' },
    { name: 'New Relic', level: 3, icon: '📈' },
    { name: 'Graylog', level: 3, icon: '🔍' },
    { name: 'PagerDuty', level: 4, icon: '🚨' },
    { name: 'ServiceNow', level: 3, icon: '🎫' },
  ],
  'Reliability & Operations': [
    { name: 'SRE practices', level: 5, icon: '🎯' },
    { name: 'SLAs/SLOs/SLIs', level: 5, icon: '📊' },
    { name: 'Incident Response', level: 4, icon: '🚑' },
    { name: 'Runbooks', level: 4, icon: '📖' },
    { name: 'Chaos Engineering', level: 3, icon: '⚡' },
    { name: 'Load Testing', level: 4, icon: '⚙️' },
    { name: 'FinOps', level: 3, icon: '💰' },
  ],
}

function SkillRating({ level }: { level: number }) {
  return (
    <span className="text-sm text-amber-400 ml-2">
      {'★'.repeat(level)}{'☆'.repeat(5 - level)}
    </span>
  )
}

export default function Skills() {
  return (
    <section className="px-6 py-16 bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-100 mb-12">⚙️ Skills & Expertise</h2>
        <div className="space-y-8">
          {Object.entries(SKILLS).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xl font-semibold text-slate-100 mb-4">{category}</h3>
              <div className="flex flex-wrap gap-3">
                {items.map((skill) => (
                  <div
                    key={skill.name}
                    className="px-4 py-3 bg-slate-800 text-slate-300 rounded border border-slate-700 text-sm hover:border-blue-500 transition flex items-center"
                  >
                    <span className="mr-2 text-lg">{skill.icon}</span>
                    <span>{skill.name}</span>
                    <SkillRating level={skill.level} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
