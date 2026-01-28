'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type Locale = 'en' | 'pt-BR'

const translations = {
  en: {
    // Header & Nav
    home: 'Home',
    about: 'About',
    experience: 'Experience',
    education: 'Education',
    contact: 'Contact',
    skills: 'Skills',
    projects: 'Projects',
    dashboard: 'Dashboard',
    interviewNotes: 'Interview Notes',
    insights: 'Insights',
    login: 'Login',
    logout: 'Logout',
    command: 'Command',
    theme: 'Theme',

    // Hero
    heroTitle: 'Douglas Luiz',
    heroSubtitle: 'Cloud-Native Platform Engineering Associate & Kubernetes Certified',
    heroLocation: '🌍 Brazil - Remotely',
    heroDescription: 'Site Reliability Engineer focused on building resilient, observable, and automated infrastructure. Experienced with cloud platforms, containerization, and infrastructure-as-code.',

    // Terminal
    terminalHelp: 'Available commands:\nhelp                Show this help\nskills              Highlight core skills\nexperience          Recent roles\ncontact             How to reach me\nclear               Clear the screen\nrandom              Surprise command',
    terminalSkills: 'Cloud/K8s: AWS, EKS, ECS, K8s, Docker\nIaC: Terraform, Crossplane\nCI/CD: GitHub Actions, Jenkins\nObservability: Datadog, Prometheus, Grafana\nSRE: SLOs/SLIs, Incident Response, Chaos Engineering',
    terminalExperience: 'Itaú Unibanco - Sr SRE (2022-Now)\nZUP / Itaú Shop - Sr SRE (2021-2022)\nGrupo Mult (BMG) - DevOps (2020-2021)\nAvenue Code - SRE (2017-2020)',
    terminalContact: 'Email: douglas@example.com\nLinkedIn: https://linkedin.com/in/dluizmendes\nGitHub: https://github.com/dluizmendes',
    terminalAutomating: 'Automating toil... ✅',
    terminalChaos: 'Chaos experiment passed. 🧪',
    terminalShipping: 'SLOs green. Shipping with confidence. 🚀',
    terminalMTTR: 'MTTR trending down. 📉',
    terminalKubernetes: 'Kubernetes pods are happy. 🐳',
    terminalCommandNotFound: 'Command not found',
    terminalTypeHelp: 'Type "help" to see available commands.',

    // Radar Chart
    radarProfile: 'Profile focused on reliability and cloud-native platforms: Kubernetes and IaC as foundation, SRE practices with SLOs/SLIs, CI/CD automation and comprehensive observability.',
    radarSkillLabel: 'Skill Radar',

    // Skills section
    skillsTitle: '⚙️ Skills & Expertise',
    skillCloud: 'Cloud & Platforms',
    skillContainers: 'Containers & Orchestration',
    skillIaC: 'Infrastructure as Code',
    skillCICD: 'CI/CD & Automation',
    skillObservability: 'Observability & Incident Management',
    skillReliability: 'Reliability & Operations',

    // Expertise
    expertiseTitle: '🚀 Expertise in the Modern Ecosystem',
    expertiseDesc: 'Deep hands-on experience with industry-leading technologies for cloud-native infrastructure, containerization, and automation.',

    // Analytics
    analyticsTitle: 'Portfolio Analytics',
    analyticsDesc: 'Powered by Vercel Analytics for real visitor insights.',
    analyticsPageviews: 'Visitors (30d)',
    analyticsAvgTime: 'Avg time on page',
    analyticsBounceRate: 'Bounce rate',
    analyticsTopGeo: 'Top geo',
    analyticsTrafficTrend: 'Traffic trend (mock)',

    // GitHub Activity
    githubActivityTitle: 'GitHub Activity',
    githubLoading: 'Loading activity...',
    githubError: 'Failed to load activity',
    githubNone: 'No recent activity.',
    githubPush: 'Push',

    // Other
    footerBuilt: 'Built with Next.js and Tailwind CSS',
    footerDeveloped: 'Developed and deployed with GitHub Actions',
    footerCredit: 'Crafted with Copilot, Coffee and Claude Code',
  },
  'pt-BR': {
    // Header & Nav
    home: 'Início',
    about: 'Sobre',
    experience: 'Experiência',
    education: 'Educação',
    contact: 'Contato',
    skills: 'Habilidades',
    projects: 'Projetos',
    dashboard: 'Dashboard',
    interviewNotes: 'Notas de Entrevista',
    insights: 'Insights',
    login: 'Entrar',
    logout: 'Sair',
    command: 'Comando',
    theme: 'Tema',

    // Hero
    heroTitle: 'Douglas Luiz',
    heroSubtitle: 'Cloud-Native Platform Engineering Associate & Kubernetes Certified',
    heroLocation: '🌍 Brasil - Remoto',
    heroDescription: 'Site Reliability Engineer focado em construir infraestrutura resiliente, observável e automatizada. Experiência com plataformas cloud, containerização e infraestrutura como código.',

    // Terminal
    terminalHelp: 'Comandos disponíveis:\nhelp                Mostra esta ajuda\nskills              Habilidades principais\nexperience          Papéis recentes\ncontact             Como me contatar\nclear               Limpa a tela\nrandom              Comando surpresa',
    terminalSkills: 'Cloud/K8s: AWS, EKS, ECS, K8s, Docker\nIaC: Terraform, Crossplane\nCI/CD: GitHub Actions, Jenkins\nObservabilidade: Datadog, Prometheus, Grafana\nSRE: SLOs/SLIs, Incident Response, Chaos Engineering',
    terminalExperience: 'Itaú Unibanco - Sr SRE (2022-Atual)\nZUP / Itaú Shop - Sr SRE (2021-2022)\nGrupo Mult (BMG) - DevOps (2020-2021)\nAvenue Code - SRE (2017-2020)',
    terminalContact: 'Email: douglas@example.com\nLinkedIn: https://linkedin.com/in/dluizmendes\nGitHub: https://github.com/dluizmendes',
    terminalAutomating: 'Automatizando toil... ✅',
    terminalChaos: 'Experimento de chaos passou. 🧪',
    terminalShipping: 'SLOs verdes. Fazendo deploy com confiança. 🚀',
    terminalMTTR: 'MTTR em queda. 📉',
    terminalKubernetes: 'Pods do Kubernetes felizes. 🐳',
    terminalCommandNotFound: 'Comando não encontrado',
    terminalTypeHelp: 'Digite "help" para ver os comandos disponíveis.',

    // Radar Chart
    radarProfile: 'Perfil focado em confiabilidade e plataformas cloud-native: Kubernetes e IaC como base, práticas SRE com SLOs/SLIs, automação de CI/CD e observabilidade completa.',
    radarSkillLabel: 'Radar de Habilidades',

    // Skills section
    skillsTitle: '⚙️ Habilidades & Expertise',
    skillCloud: 'Cloud & Plataformas',
    skillContainers: 'Containers & Orquestração',
    skillIaC: 'Infraestrutura como Código',
    skillCICD: 'CI/CD & Automação',
    skillObservability: 'Observabilidade & Gerenciamento de Incidentes',
    skillReliability: 'Confiabilidade & Operações',

    // Expertise
    expertiseTitle: '🚀 Expertise no Ecossistema Moderno',
    expertiseDesc: 'Experiência prática profunda com tecnologias líderes da indústria para infraestrutura cloud-native, containerização e automação.',

    // Analytics
    analyticsTitle: 'Portfolio Analytics',
    analyticsDesc: 'Powered by Vercel Analytics para métricas reais de visitantes.',
    analyticsPageviews: 'Visitantes (30d)',
    analyticsAvgTime: 'Tempo médio na página',
    analyticsBounceRate: 'Taxa de rejeição',
    analyticsTopGeo: 'Geo principal',
    analyticsTrafficTrend: 'Tendência de tráfego (mockado)',

    // GitHub Activity
    githubActivityTitle: 'Atividade GitHub',
    githubLoading: 'Carregando atividade...',
    githubError: 'Falha ao carregar atividade',
    githubNone: 'Nenhuma atividade recente.',
    githubPush: 'Push',
    // Other
    footerBuilt: 'Construído com Next.js e Tailwind CSS',
    footerDeveloped: 'Desenvolvido e deployado com GitHub Actions',
    footerCredit: 'Criado com Copilot, Café e Claude Code',
  },
}

type TranslationKey = keyof typeof translations.en

type LocaleContextValue = {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
}

const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('en')

  useEffect(() => {
    const stored = typeof window !== 'undefined' && (localStorage.getItem('locale') as Locale | null)
    if (stored && ['en', 'pt-BR'].includes(stored)) {
      setLocale(stored)
    }
  }, [])

  const handleSetLocale = (newLocale: Locale) => {
    setLocale(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  const t = (key: TranslationKey): string => {
    return translations[locale][key] || translations.en[key] || ''
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale: handleSetLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const ctx = useContext(LocaleContext)
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider')
  return ctx
}
