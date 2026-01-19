import type { Metadata } from 'next'
import '../globals.css'

export const metadata: Metadata = {
  title: 'SRE Tracker - AWS Decommissioning Dashboard',
  description: 'Dashboard for managing AWS resource decommissioning and API pentesting',
}

export default function DashLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        {children}
      </body>
    </html>
  )
}
