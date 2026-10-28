'use client'

import { useEffect } from 'react'
import { gsap, mountGsap } from '@/lib/gsap'

function revealSun(root: HTMLElement, hero: HTMLElement) {
  gsap.fromTo(
    root,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
      onComplete: () => {
        document.documentElement.setAttribute('data-sun-draw', 'done')
        gsap.set(root, { clearProps: 'opacity' })
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
      },
    },
  )
}

export function SunCircuit() {
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
        revealSun(root, hero)
      })
    })

    return () => {
      observer.disconnect()
      release()
    }
  }, [])

  return null
}
