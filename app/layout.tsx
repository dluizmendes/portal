import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import Providers from './providers'

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
        <Providers>
          {children}
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
