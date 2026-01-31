'use client'

interface FloatingOrbProps {
  delay?: number
  duration?: number
  size?: 'sm' | 'md' | 'lg'
  color?: 'cyan' | 'blue' | 'purple'
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

export function FloatingOrb({
  delay = 0,
  duration = 4,
  size = 'md',
  color = 'cyan',
  position = 'top-left',
}: FloatingOrbProps) {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-32 h-32',
    lg: 'w-48 h-48',
  }

  const colorClasses = {
    cyan: 'bg-cyan-500/10',
    blue: 'bg-blue-500/10',
    purple: 'bg-purple-500/10',
  }

  const positionClasses = {
    'top-left': '-top-12 -left-12',
    'top-right': '-top-12 -right-12',
    'bottom-left': '-bottom-12 -left-12',
    'bottom-right': '-bottom-12 -right-12',
  }

  return (
    <div
      className={`absolute ${sizeClasses[size]} ${colorClasses[color]} ${positionClasses[position]} rounded-full blur-3xl animate-pulse`}
      style={{
        animationDelay: `${delay}ms`,
        animationDuration: `${duration}s`,
      }}
    />
  )
}

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <FloatingOrb size="lg" color="cyan" position="top-left" delay={0} />
      <FloatingOrb size="md" color="blue" position="top-right" delay={1000} />
      <FloatingOrb size="lg" color="purple" position="bottom-left" delay={2000} />
      <FloatingOrb size="md" color="cyan" position="bottom-right" delay={1500} />
    </div>
  )
}

export function AnimatedDot({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-bounce"
      style={{
        animationDelay: `${delay}ms`,
      }}
    />
  )
}

export function AnimatedGradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-300% animate-gradient-flow">
      {children}
    </span>
  )
}

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: 'cyan' | 'blue' | 'white'
}

export function LoadingSpinner({ size = 'md', color = 'cyan' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  }

  const colorClasses = {
    cyan: 'border-cyan-500 border-t-cyan-300',
    blue: 'border-blue-500 border-t-blue-300',
    white: 'border-slate-300 border-t-slate-100',
  }

  return (
    <div
      className={`${sizeClasses[size]} ${colorClasses[color]} border-solid rounded-full animate-spin`}
    />
  )
}

interface PulseRingProps {
  delay?: number
}

export function PulseRing({ delay = 0 }: PulseRingProps) {
  return (
    <div className="relative w-12 h-12">
      <div className="absolute inset-0 bg-cyan-500 rounded-full animate-pulse" style={{ animationDelay: `${delay}ms` }} />
      <div
        className="absolute inset-2 bg-slate-950 rounded-full"
        style={{ animationDelay: `${delay + 500}ms` }}
      />
    </div>
  )
}
