'use client'

import Lenis from 'lenis'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { gsap, registerGSAP, ScrollTrigger } from '@/lib/gsap'

function allowLenis() {
  return (
    window.matchMedia('(pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.classList.add('js')
    if (!allowLenis()) return

    registerGSAP()

    let lenis: Lenis | null = null
    let alive = true
    let idleId = 0
    let timeoutId = 0

    const tick = (time: number) => {
      lenis?.raf(time * 1000)
    }

    const cancelIdle = () => {
      if (idleId && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleId)
      }
      if (timeoutId) window.clearTimeout(timeoutId)
      idleId = 0
      timeoutId = 0
    }

    const destroy = () => {
      cancelIdle()
      if (!alive) return
      alive = false
      gsap.ticker.remove(tick)
      lenis?.destroy()
      lenis = null
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }

    const start = () => {
      if (!alive || !allowLenis() || lenis) return
      lenis = new Lenis({
        duration: 1.05,
        lerp: 0.09,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
      })
      document.documentElement.classList.add('lenis', 'lenis-smooth')
      lenis.on('scroll', ScrollTrigger.update)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      ScrollTrigger.refresh()
      if (document.documentElement.hasAttribute('data-nav-open')) lenis.stop()
    }

    const onNav = (event: Event) => {
      if (!(event instanceof CustomEvent) || !lenis) return
      if (event.detail === true) lenis.stop()
      else lenis.start()
    }

    if (typeof window.requestIdleCallback === 'function') {
      idleId = window.requestIdleCallback(start)
    } else {
      timeoutId = window.setTimeout(start, 1)
    }

    const pointer = window.matchMedia('(pointer: fine)')
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const stopIfNeeded = () => {
      if (!allowLenis()) destroy()
    }
    pointer.addEventListener('change', stopIfNeeded)
    motion.addEventListener('change', stopIfNeeded)
    window.addEventListener('abmsol:nav', onNav)

    return () => {
      pointer.removeEventListener('change', stopIfNeeded)
      motion.removeEventListener('change', stopIfNeeded)
      window.removeEventListener('abmsol:nav', onNav)
      destroy()
    }
  }, [])

  useEffect(() => {
    if (!allowLenis()) return
    registerGSAP()
    ScrollTrigger.refresh()
  }, [pathname])

  return <>{children}</>
}
