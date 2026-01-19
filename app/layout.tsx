import type { Metadata } from 'next'
import './globals.css'
import Header from './components/Header'
import Hero from './components/Hero'
import Expertise from './components/Expertise'
import Certifications from './components/Certifications'
import CurrentWork from './components/CurrentWork'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Education from './components/Education'
import Contact from './components/Contact'

export const metadata: Metadata = {
  title: 'Douglas Mendes - SRE',
  description: 'Senior Site Reliability Engineer with 8+ years of experience in cloud-native platforms, Kubernetes, and infrastructure automation.',
  icons: {
    icon: '/favicon.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  )
}
