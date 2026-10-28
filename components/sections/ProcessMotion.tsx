'use client'

import { useEffect } from 'react'

export function ProcessMotion() {
  useEffect(() => {
    const root = document.getElementById('como-trabalhamos')
    if (!root) return
    let alive = true
    let release = () => {}

    void import('@/lib/gsap').then(({ gsap, mountGsap }) => {
      if (!alive) return
      release = mountGsap(root, () => {
        const motion = gsap.matchMedia()
        motion.add('(prefers-reduced-motion: no-preference)', () => {
          gsap.utils.toArray<HTMLElement>('[data-process-step]', root).forEach((step) => {
            const node = step.querySelector('.process-node-on')
            if (!node) return
            gsap.fromTo(
              node,
              { opacity: 0 },
              {
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                  trigger: step,
                  start: 'top 75%',
                  end: 'top 40%',
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
