'use client'

import { useState } from 'react'

// Card component for reusability
interface InterviewCard {
  id: string
  title: string
  descriptionPt: string
  descriptionEn: string
  tags: string[]
  section: string
}

interface CardProps {
  card: InterviewCard
  isExpanded: boolean
  onToggle: () => void
}

function Card({ card, isExpanded, onToggle }: CardProps) {
  const tagColors: { [key: string]: string } = {
    behavioral: 'bg-blue-900/40 text-blue-200',
    incident: 'bg-red-900/40 text-red-200',
    scale: 'bg-purple-900/40 text-purple-200',
    conflict: 'bg-orange-900/40 text-orange-200',
    leadership: 'bg-yellow-900/40 text-yellow-200',
    ownership: 'bg-green-900/40 text-green-200',
    automation: 'bg-cyan-900/40 text-cyan-200',
    communication: 'bg-indigo-900/40 text-indigo-200',
    reliability: 'bg-rose-900/40 text-rose-200',
  }

  return (
    <div className="border border-slate-700 rounded-lg p-6 bg-slate-800/50 hover:border-slate-600 transition">
      <button
        onClick={onToggle}
        className="w-full text-left flex items-start justify-between gap-4 cursor-pointer group"
      >
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-100 group-hover:text-blue-300 transition">
            {card.title}
          </h3>
          {isExpanded && (
            <p className="text-sm italic text-slate-400 mt-2 mb-4 font-light">
              {card.descriptionEn}
            </p>
          )}
        </div>
        <span className="text-2xl text-slate-400 group-hover:text-slate-300 flex-shrink-0 transition">
          {isExpanded ? '−' : '+'}
        </span>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-4 border-t border-slate-700 pt-4">
          <p className="text-slate-300 leading-relaxed text-sm">
            {card.descriptionEn}
          </p>

          <div className="flex flex-wrap gap-2">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  tagColors[tag] || 'bg-slate-700/50 text-slate-400'
                }`}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

// Interview notes data structure
const interviewData: { [key: string]: InterviewCard[] } = {
  'Strengths & Impact': [
    {
      id: 'reliability-1',
      title: 'Leadership in Platform Reliability',
      descriptionPt:
        'Implementei observabilidade end-to-end usando Datadog em uma plataforma de e-commerce com milhões de transações diárias. Reduzi MTTR em 60%, detectando incidentes em segundos em vez de minutos. Minha abordagem de instrumentação foi adotada como padrão em todos os times de engenharia, melhorando significativamente a visibilidade operacional.',
      descriptionEn:
        'Implemented Datadog observability across critical e-commerce platform, reducing MTTR by 60% and establishing observability standards across engineering teams.',
      tags: ['leadership', 'reliability', 'automation', 'scale'],
      section: 'Strengths & Impact',
    },
    {
      id: 'automation-1',
      title: 'Terraform Infrastructure Automation at Scale',
      descriptionPt:
        'Liderei a adoção de Terraform em um ambiente com 200+ recursos AWS. Criei uma estrutura modular que reduziu o tempo de provisionamento de dias para minutos e eliminou 95% dos erros de configuração manual. Treinei 4 times de engenharia nessa abordagem, criando documentação clara e exemplos reutilizáveis.',
      descriptionEn:
        'Led Terraform adoption across 200+ AWS resources, reducing provisioning time from days to minutes and establishing reusable infrastructure patterns.',
      tags: ['automation', 'ownership', 'leadership', 'scale'],
      section: 'Strengths & Impact',
    },
    {
      id: 'crossteam-1',
      title: 'Cross-Team Leadership in Critical Migration',
      descriptionPt:
        'Coordenei a migração de um sistema legado de 500GB para Kubernetes sem downtime. Trabalhei com times de produto, data science e infraestrutura simultaneamente. Meu papel foi traduzir requisitos técnicos para negócio e vice-versa, garantindo alinhamento total. O projeto foi 2 semanas mais rápido que o planejado.',
      descriptionEn:
        'Coordinated cross-team migration of legacy system to Kubernetes with zero downtime, aligning product, data science and infrastructure goals.',
      tags: ['leadership', 'communication', 'scale', 'ownership'],
      section: 'Strengths & Impact',
    },
    {
      id: 'incident-response-1',
      title: 'Critical Production Incident Management',
      descriptionPt:
        'Um erro em deploy causou degradação de 30% em performance durante pico de vendas. Orquestrei a resposta: identifiquei a causa em 8 minutos, reverrti em 3, e implementei verificações automáticas para evitar recorrência. Comunicação clara com negócio manteve confiança. Conduzi post-mortem focado em aprendizado, não culpa.',
      descriptionEn:
        'Led incident response during peak sales traffic, identifying and resolving 30% performance degradation in 11 minutes with clear stakeholder communication.',
      tags: ['incident', 'leadership', 'reliability', 'behavioral'],
      section: 'Strengths & Impact',
    },
  ],
  'Growth Areas': [
    {
      id: 'communication-1',
      title: 'Technical Communication to Non-Technical Stakeholders',
      descriptionPt:
        'Minha primeira experiência explicando decisões de arquitetura para o time de produto foi densa e cheia de jargão técnico. Percebi que perdi o público. Desde então, estudo comunicação clara: uso analogias, evito termos técnicos desnecessários e foco no "por quê" antes do "como". Continuo trabalhando nisso através de apresentações em meetups.',
      descriptionEn:
        'Improving communication of technical decisions to non-technical stakeholders through clearer language and focus on business impact.',
      tags: ['communication', 'behavioral', 'leadership'],
      section: 'Growth Areas',
    },
    {
      id: 'delegation-1',
      title: 'Delegate More, Assume Less',
      descriptionPt:
        'Tenho tendência de assumir problemas complexos diretamente em vez de delegar para o time crescer. Reconheço isso como oportunidade de desenvolvimento. Comecei a escolher deliberadamente 1-2 projetos por quarter para delegação estratégica, com suporte meu como mentor. Resultado: técnico júnior ganhou confiança e eu ganhei tempo para focus em roadmap estratégico.',
      descriptionEn:
        'Working on intentional delegation to develop team members and focus on strategic initiatives rather than solving every technical problem.',
      tags: ['leadership', 'behavioral', 'ownership'],
      section: 'Growth Areas',
    },
    {
      id: 'deepdive-1',
      title: 'Deepening Advanced Observability Expertise',
      descriptionPt:
        'Tenho experiência sólida em Datadog, mas quero dominar tópicos avançados como custom metrics, machine learning detection e otimização de custos. Completei cursos, contribuí com melhorias em scripts internos, e agora estou documentando best practices que vou apresentar para os times.',
      descriptionEn:
        'Deepening expertise in advanced observability topics: custom metrics, ML-based detection, and cost optimization.',
      tags: ['behavioral', 'reliability', 'automation'],
      section: 'Growth Areas',
    },
  ],
  'Disagreement & Decision Making': [
    {
      id: 'conflict-arch-1',
      title: 'Architectural Disagreement on Microservices',
      descriptionPt:
        'Discordava do diretor técnico sobre migrar tudo para microserviços "por causa da escala". Argumentei que nossa taxa de mudança não justificava a complexidade. Em vez de apenas reclamar, propus um framework de decisão baseado em dados: custo operacional, velocidade de deploy e redução de toil. Apresentei análise comparativa de 3 empresas semelhantes. Resultado: adotamos abordagem híbrida que resolveu o problema.',
      descriptionEn:
        'Disagreed on premature microservices migration; proposed data-driven framework and led team to hybrid solution.',
      tags: ['conflict', 'leadership', 'behavioral'],
      section: 'Disagreement & Decision Making',
    },
    {
      id: 'conflict-deadline-1',
      title: 'Deadline Pressure vs. Technical Quality',
      descriptionPt:
        'Recebi pressão para deployar sem testes de carga adequados em ambiente crítico. Não aceitei a trade-off cegamente. Propus: fazer testes acelerados (4 horas) em vez de completos (2 dias) para ganhar tempo, mantendo risco controlado. Depois monitorei agressivamente após deploy. Prazo atendido, risco mitigado, confiança mantida.',
      descriptionEn:
        'Pushed back on deploying without proper load testing; negotiated risk-aware approach with accelerated testing and aggressive monitoring.',
      tags: ['conflict', 'behavioral', 'reliability', 'ownership'],
      section: 'Disagreement & Decision Making',
    },
    {
      id: 'conflict-security-1',
      title: 'Security vs. Speed: Knowing When to Say No',
      descriptionPt:
        'Equipe de produto queria abrir acesso direto ao banco de dados para reports rápidos. Disse não e propus alternativa: expor dados via API com controles de acesso, levando 3 dias extra. Documentei os riscos da abordagem direta, não apenas proibi. Time entendeu o "por quê". Seis meses depois, isso preveniu uma violação quando um dev deixou credenciais expostas no GitHub.',
      descriptionEn:
        'Resisted direct database access for reporting; proposed secure API approach with proper access controls despite time pressure.',
      tags: ['conflict', 'leadership', 'reliability', 'behavioral'],
      section: 'Disagreement & Decision Making',
    },
    {
      id: 'conflict-resolved-1',
      title: 'I Changed My Mind After Listening to the Team',
      descriptionPt:
        'Eu havia decidido padronizar em uma ferramenta específica de CI/CD. Um engenheiro sênior mostrou que a alternativa era 40% mais rápida e tinha comunidade maior. Em vez de defender minha decisão, reconheci que estava errado e mudei. Isso fortaleceu a confiança do time na liderança e trouxe uma solução técnica superior.',
      descriptionEn:
        'Changed architectural decision after team demonstrated superior alternative; demonstrated intellectual humility and openness to better ideas.',
      tags: ['leadership', 'behavioral', 'communication'],
      section: 'Disagreement & Decision Making',
    },
  ],
  'Leadership & Ownership': [
    {
      id: 'leadership-project-1',
      title: 'Leadership of Critical Technical Project',
      descriptionPt:
        'Liderei a redesign de toda a infraestrutura de observabilidade em um ambiente com 150 microsserviços. Projeto de 4 meses, 8 pessoas, alta complexidade. Criei roadmap claro, estabeleci daily standups focados, e resolvi conflitos de prioridade entre times. Entreguei 2 semanas antes do prazo com zero incidentes relacionados à transição.',
      descriptionEn:
        'Led 4-month infrastructure redesign project across 8 people and 150 microservices; delivered 2 weeks early with zero transition incidents.',
      tags: ['leadership', 'ownership', 'scale', 'reliability'],
      section: 'Leadership & Ownership',
    },
    {
      id: 'leadership-reference-1',
      title: 'Established as Technical Reference for the Team',
      descriptionPt:
        'Fui designado como technical lead em arquitetura cloud. Criei uma série de 12 sessões de "tech talks" que cobriram tópicos de iniciante a avançado em AWS, Kubernetes e observabilidade. Documentei padrões técnicos, criei exemplos reproduzíveis e fui acessível para dúvidas. 95% do time completou a série; senioridade técnica média cresceu significativamente.',
      descriptionEn:
        'Established as technical reference for cloud architecture; created documentation, mentoring program, and 12-session tech talk series.',
      tags: ['leadership', 'ownership', 'communication', 'behavioral'],
      section: 'Leadership & Ownership',
    },
    {
      id: 'leadership-mentorship-1',
      title: 'Transformational Mentorship',
      descriptionPt:
        'Mentoreei um engenheiro junior que estava considerando deixar a empresa. Identificamos gaps específicos em Kubernetes e debugging avançado. Criei um plano: 6 meses com projetos progressivamente desafiadores. Hoje é senior engineer no time e liderou 2 iniciativas relevantes. Ele até começou a mentorear outros.',
      descriptionEn:
        'Mentored junior engineer through targeted skill development; helped grow from struggling to senior role, now mentoring others.',
      tags: ['leadership', 'ownership', 'behavioral', 'communication'],
      section: 'Leadership & Ownership',
    },
    {
      id: 'leadership-standards-1',
      title: 'Defend Technical Standards Without Being Pedantic',
      descriptionPt:
        'Notei que PRs não respeitavam padrões de logging estabelecidos. Em vez de reclamar ou fazer "review brutal", criei um documento explicativo: "Por que padronizamos logging assim?" com exemplos de incidentes reais que foram difíceis por falta de contexto. Depois, revisões foram construtivas. Compliance melhorou de 40% para 95% em 2 sprints.',
      descriptionEn:
        'Established and defended technical standards through education and context rather than enforcement; improved compliance from 40% to 95%.',
      tags: ['leadership', 'ownership', 'communication', 'behavioral'],
      section: 'Leadership & Ownership',
    },
    {
      id: 'leadership-difficult-1',
      title: 'Difficult Decisions Under Pressure',
      descriptionPt:
        'Durante um incident crítico de segurança, tive que decidir entre: (a) ficar offline enquanto investigava (prejuízo de negócio), ou (b) continuar com risco. Criei um plano C: desligar a feature afetada, reduzindo o escopo de exposição. Isso comprou tempo para investigação sem shutdown total. Decisão foi bem aceita porque comunicou incerteza honestamente e ofereceu alternativa.',
      descriptionEn:
        'Made difficult trade-off decision during security incident: scoped down feature instead of full shutdown, communicating risk clearly.',
      tags: ['leadership', 'behavioral', 'incident', 'reliability'],
      section: 'Leadership & Ownership',
    },
  ],
}

export default function InterviewNotes() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

  const toggleCard = (cardId: string) => {
    const newExpanded = new Set(expandedCards)
    if (newExpanded.has(cardId)) {
      newExpanded.delete(cardId)
    } else {
      newExpanded.add(cardId)
    }
    setExpandedCards(newExpanded)
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">Interview Notes</h1>
          <p className="text-slate-400">
            Personal reference guide for technical and behavioral interviews
          </p>
          <p className="text-xs text-slate-500 mt-4 italic">
            💡 Click any card to expand. This page is private and not indexed by search engines.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {Object.entries(interviewData).map(([sectionName, cards]) => (
            <section key={sectionName}>
              {/* Section Header */}
              <div className="mb-6 pb-4 border-b border-slate-700">
                <h2 className="text-2xl font-bold text-slate-100">{sectionName}</h2>
                <p className="text-sm text-slate-400 mt-2">
                  {sectionName === 'Strengths & Impact' &&
                    'Real impact and achievements that demonstrate value'}
                  {sectionName === 'Growth Areas' &&
                    'Areas of intentional development and learning'}
                  {sectionName === 'Disagreement & Decision Making' &&
                    'Technical conflicts, trade-offs, and decision-making examples'}
                  {sectionName === 'Leadership & Ownership' &&
                    'Leadership moments, formal and informal'}
                </p>
              </div>

              {/* Cards Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {cards.map((card) => (
                  <Card
                    key={card.id}
                    card={card}
                    isExpanded={expandedCards.has(card.id)}
                    onToggle={() => toggleCard(card.id)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-700 text-xs text-slate-500">
          <p>
            This page is a personal reference tool to help organize and recall experiences during
            interviews. All examples are based on real experiences but anonymized. This page is not
            indexed by search engines.
          </p>
        </div>
      </div>
    </main>
  )
}
