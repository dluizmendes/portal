'use client'

interface SkeletonProps {
  variant?: 'text' | 'title' | 'card' | 'avatar' | 'button'
  width?: string
  height?: string
  count?: number
  pulse?: boolean
  className?: string
}

export default function Skeleton({
  variant = 'text',
  width = '100%',
  height,
  count = 1,
  pulse = true,
  className = '',
}: SkeletonProps) {
  const getSkeletonStyles = () => {
    const baseHeight = height || '1rem'
    const baseClasses = `skeleton ${pulse ? 'skeleton-pulse' : ''} ${className}`

    switch (variant) {
      case 'title':
        return {
          baseClasses: `${baseClasses} skeleton-title`,
          width: width || '80%',
          height: height || '1.5rem',
        }
      case 'card':
        return {
          baseClasses: `${baseClasses} skeleton-card`,
          width: width || '100%',
          height: height || '200px',
        }
      case 'avatar':
        return {
          baseClasses: `${baseClasses} skeleton-avatar`,
          width: width || '48px',
          height: height || '48px',
        }
      case 'button':
        return {
          baseClasses: `${baseClasses} skeleton-button`,
          width: width || '120px',
          height: height || '2.5rem',
        }
      default:
        return {
          baseClasses: `${baseClasses} skeleton-text`,
          width: width || '100%',
          height: baseHeight,
        }
    }
  }

  const styles = getSkeletonStyles()

  if (count > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className={styles.baseClasses}
            style={{
              width: styles.width,
              height: styles.height,
            }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={styles.baseClasses}
      style={{
        width: styles.width,
        height: styles.height,
      }}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="bg-slate-800 rounded-lg p-6 space-y-4">
      <Skeleton variant="title" />
      <div className="space-y-2">
        <Skeleton variant="text" />
        <Skeleton variant="text" width="90%" />
        <Skeleton variant="text" width="80%" />
      </div>
      <Skeleton variant="button" />
    </div>
  )
}

export function SkeletonGrid({ columns = 3, count = 3 }: { columns?: number; count?: number }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${columns} gap-4`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
