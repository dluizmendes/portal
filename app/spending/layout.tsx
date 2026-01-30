'use client'

import Header from '@/app/components/Header'

export default function SpendingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <div className="pt-16">
        {children}
      </div>
    </>
  )
}
