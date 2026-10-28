'use client'

import { useEffect } from 'react'
import { HOME_TRAIL } from '@/lib/home-trail'

export function Trail() {
  useEffect(() => {
    const trail = document.querySelector<HTMLElement>('[data-page-trail]')
    if (!trail) return

    const placeStops = () => {
      const height = document.documentElement.scrollHeight
      if (height <= 0) return
      HOME_TRAIL.forEach((item) => {
        const section = document.getElementById(item.id)
        const stop = trail.querySelector<HTMLElement>(`[data-trail-stop="${item.id}"]`)
        if (!section || !stop) return
        const top = section.getBoundingClientRect().top + window.scrollY
        stop.style.top = `${Math.min(96, Math.max(0, (top / height) * 100))}%`
      })
    }

    placeStops()
    window.addEventListener('resize', placeStops)

    let alive = true
    let release = () => {}
    void import('@/lib/gsap').then(({ gsap, mountGsap, ScrollTrigger }) => {
      if (!alive) return
      release = mountGsap(trail, () => {
        const motion = gsap.matchMedia()
        motion.add('(prefers-reduced-motion: no-preference)', () => {
          const progress = trail.querySelector('.page-trail-progress')
          if (progress) {
            gsap.fromTo(
              progress,
              { scaleY: 0 },
              {
                scaleY: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: document.documentElement,
                  start: 'top top',
                  end: 'bottom bottom',
                  scrub: true,
                },
              },
            )
          }

          HOME_TRAIL.forEach((item) => {
            const section = document.getElementById(item.id)
            const stop = trail.querySelector(`[data-trail-stop="${item.id}"] .page-trail-stop-on`)
            if (!section || !stop) return
            gsap.fromTo(
              stop,
              { opacity: 0 },
              {
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: section,
                  start: 'top 70%',
                  end: 'top 45%',
                  scrub: true,
                },
              },
            )
          })

          ScrollTrigger.refresh()
        })
      })
    })

    return () => {
      alive = false
      window.removeEventListener('resize', placeStops)
      release()
    }
  }, [])

  return null
}
