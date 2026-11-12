'use client'

import { useEffect } from 'react'
import { gsap, mountGsap } from '@/lib/gsap'

function fadeSunOnScroll(root: HTMLElement, hero: HTMLElement) {
  const copy = hero.querySelector<HTMLElement>('.hero-copy')
  const scroll = { p: 0 }
  gsap.to(scroll, {
    p: 1,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
    onUpdate: () => hero.style.setProperty('--sun-scroll', scroll.p.toFixed(4)),
  })
  gsap.to(root, {
    y: 140,
    ease: 'none',
    scrollTrigger: {
      trigger: hero,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })
  if (copy) {
    gsap.fromTo(
      copy,
      { y: 0, opacity: 1 },
      {
        y: -28,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'center center',
          end: 'bottom top',
          scrub: true,
        },
      },
    )
  }
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
      hero.style.removeProperty('--sun-scroll')
    }
  }, [])

  return null
}
