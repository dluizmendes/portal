'use client'

import { useEffect, useRef } from 'react'

export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    let rafId = 0

    const handleScroll = () => {
      if (!element) return

      const scrollY = window.scrollY
      const elementTop = element.getBoundingClientRect().top + scrollY
      const elementBottom = elementTop + element.offsetHeight

      // Only apply parallax if element is in viewport
      if (scrollY < elementBottom && scrollY + window.innerHeight > elementTop) {
        const offset = (scrollY - elementTop) * speed
        element.style.transform = `translateY(${offset}px)`
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [speed])

  return ref
}

export function useParallax3D(intensity: number = 10) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!element) return

      const rect = element.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height

      const rotateX = (y - 0.5) * intensity
      const rotateY = (x - 0.5) * intensity * -1

      element.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
    }

    const handleMouseLeave = () => {
      if (element) {
        element.style.transform = 'rotateX(0) rotateY(0) translateZ(0)'
      }
    }

    element.addEventListener('mousemove', handleMouseMove)
    element.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      element.removeEventListener('mousemove', handleMouseMove)
      element.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [intensity])

  return ref
}
