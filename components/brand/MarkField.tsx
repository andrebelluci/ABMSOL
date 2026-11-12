'use client'

import { useEffect } from 'react'

export function MarkField() {
  useEffect(() => {
    const root = document.querySelector('main')
    if (!root) return
    let alive = true
    let release = () => {}

    void import('@/lib/gsap').then(({ gsap, mountGsap }) => {
      if (!alive) return
      release = mountGsap(root, () => {
        const motion = gsap.matchMedia()
        motion.add('(prefers-reduced-motion: no-preference)', () => {
          gsap.utils.toArray<SVGSVGElement>('[data-mark-ray]', root).forEach((ray) => {
            const traces = ray.querySelectorAll<SVGPathElement>('.mark-trace')
            const nodes = ray.querySelectorAll<SVGCircleElement>('.mark-node')
            gsap.set(nodes, { opacity: 0 })
            traces.forEach((trace, index) => {
              const length = trace.getTotalLength()
              gsap.set(trace, { strokeDasharray: length, strokeDashoffset: length })
              gsap.to(trace, {
                strokeDashoffset: 0,
                ease: 'none',
                scrollTrigger: {
                  trigger: ray,
                  start: `top ${86 - index * 8}%`,
                  end: `center ${46 - index * 6}%`,
                  scrub: true,
                },
              })
            })
            gsap.to(nodes, {
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: ray,
                start: 'top 58%',
                end: 'center 42%',
                scrub: true,
              },
            })
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
