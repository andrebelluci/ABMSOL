'use client'

import { useEffect } from 'react'

export function SectionPass() {
  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('.home-section')]
    if (sections.length === 0) return
    let alive = true
    let release = () => {}

    void import('@/lib/gsap').then(({ gsap, mountGsap }) => {
      if (!alive) return
      release = mountGsap(document.body, () => {
        const motion = gsap.matchMedia()
        motion.add('(prefers-reduced-motion: no-preference)', () => {
          sections.forEach((section) => {
            const body = section.firstElementChild
            if (!(body instanceof HTMLElement)) return
            gsap.fromTo(
              body,
              { y: 72 },
              {
                y: -40,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: true,
                },
              },
            )
          })
        })
      })
    })

    return () => {
      alive = false
      release()
    }
  }, [])

  return null
}
