'use client'

import Lenis from 'lenis'
import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

function shouldUseSmoothScroll(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.matchMedia('(max-width: 1023px)').matches) return false
  return true
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useReducedMotion()
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    if (prefersReducedMotion || !shouldUseSmoothScroll()) {
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      return
    }

    const lenis = new Lenis({
      duration: 1.05,
      lerp: 0.09,
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    })

    lenisRef.current = lenis
    document.documentElement.classList.add('lenis', 'lenis-smooth')

    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    const onResize = () => {
      if (!shouldUseSmoothScroll()) {
        lenis.destroy()
        lenisRef.current = null
        document.documentElement.classList.remove('lenis', 'lenis-smooth')
      }
    }

    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      lenis.destroy()
      lenisRef.current = null
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }
  }, [prefersReducedMotion])

  return <>{children}</>
}
