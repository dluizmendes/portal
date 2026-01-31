'use client'

import { useEffect, useState } from 'react'
import Skeleton, { SkeletonCard } from './Skeleton'

export default function SkeletonExample() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simular carregamento de dados
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <section className="px-6 py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-4xl mx-auto">
          <Skeleton variant="title" className="mb-8" />
          <div className="grid gap-6 md:grid-cols-2">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        </div>
      </section>
    )
  }

  return null
}
