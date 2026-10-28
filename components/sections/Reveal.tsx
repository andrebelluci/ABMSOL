'use client'

import { useEffect, useRef } from 'react'

export function Reveal({ children }: { children: React.ReactNode }) {
  const scope = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = scope.current
    if (!root) return
    let alive = true
    let release = () => {}

    void import('@/lib/gsap').then(({ gsap, mountGsap }) => {
      if (!alive) return
      release = mountGsap(root, () => {
        const motion = gsap.matchMedia()
        motion.add('(prefers-reduced-motion: no-preference)', () => {
          gsap.utils.toArray<HTMLElement>('[data-reveal]', root).forEach((item) => {
            gsap.fromTo(
              item,
              { opacity: 0, y: 28 },
              {
                opacity: 1,
                y: 0,
                duration: 0.45,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: item,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
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

  return <div ref={scope}>{children}</div>
}
