'use client'

import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useSunTier } from '@/components/sun/useSunTier'
import { gsap, mountGsap } from '@/lib/gsap'

const SunLayer2 = dynamic(() => import('@/components/sun/SunLayer2').then((mod) => mod.SunLayer2), {
  ssr: false,
})

function fadeSunOnScroll(root: HTMLElement, hero: HTMLElement) {
  gsap.to(root, {
    opacity: 0,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'bottom 92%',
      end: 'bottom 40%',
      scrub: true,
    },
  })
}

export function SunCircuit() {
  const tier = useSunTier()

  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-sun-root]')
    const hero = document.querySelector<HTMLElement>('[data-hero]')
    if (!root || !hero) return

    const observer = new IntersectionObserver(([entry]) => {
      hero.classList.toggle('is-onscreen', entry.isIntersecting)
    })
    observer.observe(hero)

    const release = mountGsap(root, () => {
      const motion = gsap.matchMedia()
      motion.add('(prefers-reduced-motion: no-preference)', () => {
        fadeSunOnScroll(root, hero)
      })
    })

    return () => {
      observer.disconnect()
      release()
    }
  }, [])

  if (tier !== 2) return null
  return <SunLayer2 />
}
