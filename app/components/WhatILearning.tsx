'use client'

import { useState } from 'react'
import { useParallax3D } from './useParallax'

interface LearningPath {
  id: string
  title: string
  description: string
  progress: number
  target: string
  category: 'certification' | 'framework' | 'specialty'
  topics: string[]
  resources: Resource[]
  estimatedCompletion?: string
  icon: string
}

interface Resource {
  title: string
  type: 'course' | 'book' | 'docs' | 'practice'
  url?: string
}

const LEARNING_PATHS: LearningPath[] = [
  {
    id: 'aws-sa-pro',
    icon: '🏗️',
    title: 'AWS Solutions Architect Professional',
    description: 'Deep dive into AWS architecture, multi-account strategies, and enterprise-scale solutions',
    progress: 65,
    target: 'AWS Certification',
    category: 'certification',
    estimatedCompletion: 'Q2 2026',
    topics: [
      'Multi-account AWS strategies',
      'Advanced VPC & networking',
      'Cost optimization',
      'Security & compliance',
      'Disaster recovery',
      'High availability patterns',
    ],
    resources: [
      {
        title: 'AWS Official Exam Guide',
        type: 'docs',
        url: 'https://aws.amazon.com/certification/certified-solutions-architect-professional/',
      },
      {
        title: 'A Cloud Guru - SA Pro Course',
        type: 'course',
      },
      {
        title: 'AWS Well-Architected Review',
        type: 'practice',
      },
      {
        title: 'AWS Whitepapers',
        type: 'docs',
      },
    ],
  },
  {
    id: 'system-design',
    icon: '🎯',
    title: 'System Design & Architecture',
    description: 'Advanced patterns for scalable, resilient distributed systems',
    progress: 45,
    target: 'Technical Mastery',
    category: 'specialty',
    estimatedCompletion: 'Q3 2026',
    topics: [
      'Load balancing strategies',
      'Database sharding & scaling',
      'Cache strategies (Redis, CDN)',
      'Message queues & async processing',
      'Microservices patterns',
      'Event sourcing & CQRS',
    ],
    resources: [
      {
        title: 'Designing Data-Intensive Applications',
        type: 'book',
      },
      {
        title: 'System Design Interview',
        type: 'course',
      },
      {
        title: 'AWS Architecture Center',
        type: 'docs',
        url: 'https://aws.amazon.com/architecture/',
      },
      {
        title: 'High Scalability Blog',
        type: 'docs',
      },
    ],
  },
  {
    id: 'well-architected',
    icon: '✨',
    title: 'AWS Well-Architected Framework Deep Dive',
    description: 'Master the 6 pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, Sustainability',
    progress: 70,
    target: 'Framework Expertise',
    category: 'framework',
    estimatedCompletion: 'Q1 2026',
    topics: [
      'Operational excellence practices',
      'Security best practices',
      'Reliability patterns',
      'Performance optimization',
      'Cost optimization strategies',
      'Sustainability considerations',
    ],
    resources: [
      {
        title: 'AWS Well-Architected Framework',
        type: 'docs',
        url: 'https://aws.amazon.com/architecture/well-architected/',
      },
      {
        title: 'AWS Well-Architected Tool',
        type: 'practice',
        url: 'https://console.aws.amazon.com/wellarchitected/',
      },
      {
        title: 'AWS Well-Architected Workload Reviews',
        type: 'practice',
      },
      {
        title: 'AWS Workshops',
        type: 'course',
      },
    ],
  },
]

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
      <div
        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

function LearningCard({ path }: { path: LearningPath }) {
  const [expanded, setExpanded] = useState(false)
  const parallaxRef = useParallax3D(8)

  const categoryColors = {
    certification: 'border-amber-200 bg-amber-50 dark:bg-amber-900/20 dark:border-amber-700',
    framework: 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-700',
    specialty: 'border-purple-200 bg-purple-50 dark:bg-purple-900/20 dark:border-purple-700',
  }

  const categoryBadgeColors = {
    certification: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100',
    framework: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
    specialty: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
  }

  const categoryLabel = {
    certification: '🎖️ Certification',
    framework: '📚 Framework',
    specialty: '🚀 Specialty',
  }

  return (
    <div
      ref={parallaxRef}
      className={`rounded-lg border-2 p-6 transition-all duration-300 elevate-on-hover parallax-card ${categoryColors[path.category]}`}
      style={{ perspective: '1000px' }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{path.icon}</span>
            <span className={`text-xs font-semibold px-2 py-1 rounded ${categoryBadgeColors[path.category]}`}>
              {categoryLabel[path.category]}
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{path.title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{path.description}</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-700 dark:text-slate-300">Progress</span>
          <span className="text-blue-600 dark:text-blue-400 font-bold">{path.progress}%</span>
        </div>
        <ProgressBar progress={path.progress} />
        {path.estimatedCompletion && (
          <div className="text-xs text-slate-600 dark:text-slate-400">
            ⏱️ Est. completion: <span className="font-semibold">{path.estimatedCompletion}</span>
          </div>
        )}
      </div>

      {/* Topics Preview */}
      <div className="mb-4">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Key Topics</h4>
        <div className="flex flex-wrap gap-2">
          {path.topics.slice(0, 3).map((topic, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
            >
              {topic}
            </span>
          ))}
          {path.topics.length > 3 && (
            <span className="text-xs px-2 py-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
              +{path.topics.length - 3} more
            </span>
          )}
        </div>
      </div>

      {/* Expandable Details */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full mt-4 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-slate-300/30 dark:hover:bg-slate-600/30 rounded transition-all duration-300 group"
      >
        <span className="inline-block group-hover:translate-x-1 transition-transform duration-300">
          {expanded ? '▼ Hide resources' : '▶ View all topics & resources'}
        </span>
      </button>

      {expanded && (
        <div className="mt-4 space-y-4 border-t-2 border-slate-300 dark:border-slate-600 pt-4">
          {/* All Topics */}
          <div>
            <h5 className="font-semibold text-slate-700 dark:text-slate-300 text-sm mb-2">All Topics</h5>
            <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
              {path.topics.map((topic, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span>✓</span> {topic}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h5 className="font-semibold text-slate-700 dark:text-slate-300 text-sm mb-2">Resources</h5>
            <div className="space-y-2">
              {path.resources.map((resource, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 text-sm p-2 rounded bg-slate-200/50 dark:bg-slate-700/50"
                >
                  <span className="text-lg">
                    {resource.type === 'course' && '🎓'}
                    {resource.type === 'book' && '📖'}
                    {resource.type === 'docs' && '📚'}
                    {resource.type === 'practice' && '⚙️'}
                  </span>
                  <div className="flex-1">
                    {resource.url ? (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {resource.title}
                      </a>
                    ) : (
                      <span>{resource.title}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function WhatILearning() {
  const overallProgress = Math.round(
    LEARNING_PATHS.reduce((sum, path) => sum + path.progress, 0) / LEARNING_PATHS.length
  )

  return (
    <section id="learning" className="px-6 py-16 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            📚 What I'm Learning
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Continuous improvement through structured learning and hands-on practice.
          </p>
        </div>

        {/* Overall Progress */}
        <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-700 elevate-on-hover">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              <span className="pulse-soft">📊</span>
              Overall Learning Progress
            </span>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">{overallProgress}%</span>
          </div>
          <ProgressBar progress={overallProgress} />
        </div>

        {/* Learning Paths Grid */}
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {LEARNING_PATHS.map((path) => (
            <LearningCard key={path.id} path={path} />
          ))}
        </div>
      </div>
    </section>
  )
}
