""use client"

import { useParallax } from './useParallax'"

const EXPERIENCES = [
  {
    title: 'Sr Site Reliability Engineer',
    company: 'Itaú Unibanco',
    period: '02/2022 - Present',
    highlights: [
      'Led SRE practices for Beyond Banking platforms (marketplace, icarros, tags) supporting high-availability consumer-facing applications',
      'Executed AWS account migration into Itaú\'s centralized cloud environment with compliance guardrails',
      'Led observability migration from Grafana to Datadog, redesigning metrics, alerts, and SLOs',
      'Implemented FinOps strategies reducing cloud costs by R$100K+ annually',
      'Strengthened platform resilience through load testing, capacity planning, and chaos engineering',
    ],
  },
  {
    title: 'Sr Site Reliability Engineer',
    company: 'ZUP Innovation (Itaú)',
    period: '03/2021 - 02/2022',
    highlights: [
      'Core SRE for Itaú Shop, a cloud-native marketplace embedded in Itaú\'s super-app',
      'Designed and bootstrapped AWS infrastructure using Terraform and Crossplane',
      'Owned Kubernetes environments with 1,000+ pods ensuring scalability and availability',
      'Exposed microservices securely via API Gateway',
      'Built and enhanced CI/CD pipelines with Jenkins for faster deployments',
    ],
  },
  {
    title: 'DevOps Engineer',
    company: 'Grupo Mult (BMG Bank)',
    period: '08/2020 - 03/2021',
    highlights: [
      'Built and maintained CI/CD pipelines using Azure DevOps',
      'Implemented DevSecOps practices with SonarQube and Nexus',
      'Migrated applications from on-premises to cloud-based pipelines',
      'Enabled product squads to deploy secure, scalable cloud applications',
    ],
  },
  {
    title: 'Site Reliability Engineer',
    company: 'Avenue Code',
    period: '10/2017 - 08/2020',
    highlights: [
      'Worked as SRE consultant for US Fortune 500 company on revenue-critical platforms',
      'Designed and implemented automation to reduce operational toil',
      'Supported global e-commerce platforms with high traffic and strict availability requirements',
      'Migrated observability stacks (Datadog ↔ New Relic) and implemented PagerDuty for 10+ teams',
    ],
  },
]

export default function Experience() {
  const parallaxRef = useParallax(0.3)

  return (
    <section id="experience" className="px-6 py-16 bg-slate-950 relative overflow-hidden">
      <div ref={parallaxRef} className="absolute inset-0 z-0">
        <div className="absolute -left-32 top-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute -right-32 bottom-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold text-slate-100 mb-12">💼 Experience</h2>
        <div className="space-y-8">
          {EXPERIENCES.map((exp, idx) => (
            <div
              key={idx}
              className="border-l-2 border-blue-500 pl-6 transition-all duration-500 hover:border-cyan-400 hover:pl-8"
              style={{
                animation: `stagger-enter 0.6s ease-out`,
                animationDelay: `${idx * 100}ms`,
              }}
            >
              <h3 className="text-xl font-semibold text-slate-100 group hover:text-cyan-300 transition-colors">{exp.title}</h3>
              <p className="text-blue-400 text-sm mb-1 group-hover:text-cyan-300 transition-colors">🏢 {exp.company}</p>
              <p className="text-slate-500 text-sm mb-4">{exp.period}</p>
              <ul className="space-y-2">
                {exp.highlights.map((highlight, i) => (
                  <li key={i} className="text-slate-300 flex items-start hover:text-slate-100 transition-colors">
                    <span className="text-blue-400 mr-3 group-hover:text-cyan-300 transition-colors">•</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
