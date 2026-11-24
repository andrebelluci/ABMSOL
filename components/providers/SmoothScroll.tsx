'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

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

    let alive = true
    let lenis: {
      destroy: () => void
      raf: (time: number) => void
      on: (event: 'scroll', callback: () => void) => void
      stop: () => void
      start: () => void
      scrollTo: (
        target: number | string | HTMLElement,
        options?: { immediate?: boolean },
      ) => void
    } | null = null
    let idleId = 0
    let timeoutId = 0
    let removeTicker = () => {}

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
      removeTicker()
      lenis?.destroy()
      lenis = null
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
    }

    const start = () => {
      if (!alive || !allowLenis() || lenis) return
      void Promise.all([import('lenis'), import('@/lib/gsap')]).then(([lenisMod, gsapMod]) => {
        if (!alive || !allowLenis() || lenis) return
        gsapMod.registerGSAP()
        const next = new lenisMod.default({
          duration: 1.05,
          lerp: 0.09,
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1,
        })
        lenis = next
        document.documentElement.classList.add('lenis', 'lenis-smooth')
        next.on('scroll', gsapMod.ScrollTrigger.update)
        gsapMod.gsap.ticker.add(tick)
        gsapMod.gsap.ticker.lagSmoothing(0)
        removeTicker = () => gsapMod.gsap.ticker.remove(tick)
        gsapMod.ScrollTrigger.refresh()
        if (
          document.documentElement.hasAttribute('data-nav-open') ||
          document.documentElement.hasAttribute('data-scroll-lock')
        ) {
          next.stop()
        }
      })
    }

    const onNav = (event: Event) => {
      if (!(event instanceof CustomEvent) || !lenis) return
      if (event.detail === true) lenis.stop()
      else if (!document.documentElement.hasAttribute('data-scroll-lock')) lenis.start()
    }

    const onLock = (event: Event) => {
      if (!(event instanceof CustomEvent) || !lenis) return
      if (event.detail === true) lenis.stop()
      else if (!document.documentElement.hasAttribute('data-nav-open')) lenis.start()
    }

    const onScrollTo = (event: Event) => {
      if (!(event instanceof CustomEvent)) return
      const top = typeof event.detail?.top === 'number' ? event.detail.top : 0
      if (lenis) {
        lenis.scrollTo(top)
        return
      }
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' })
    }

    window.addEventListener('abmsol:scroll-to', onScrollTo)

    if (!allowLenis()) {
      return () => {
        alive = false
        window.removeEventListener('abmsol:scroll-to', onScrollTo)
      }
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
    window.addEventListener('abmsol:scroll-lock', onLock)

    return () => {
      alive = false
      pointer.removeEventListener('change', stopIfNeeded)
      motion.removeEventListener('change', stopIfNeeded)
      window.removeEventListener('abmsol:nav', onNav)
      window.removeEventListener('abmsol:scroll-lock', onLock)
      window.removeEventListener('abmsol:scroll-to', onScrollTo)
      destroy()
    }
  }, [])

  useEffect(() => {
    if (!allowLenis()) return
    void import('@/lib/gsap').then(({ registerGSAP, ScrollTrigger }) => {
      registerGSAP()
      ScrollTrigger.refresh()
    })
  }, [pathname])

  return <>{children}</>
}
