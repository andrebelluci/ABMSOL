'use client'

import { useEffect, useRef } from 'react'

function place(progress: number) {
  if (progress < 0.2) {
    const t = progress / 0.2
    return { opacity: t, y: 48 * (1 - t) }
  }
  if (progress > 0.78) {
    const t = (progress - 0.78) / 0.22
    return { opacity: 1 - t, y: -36 * t }
  }
  return { opacity: 1, y: 0 }
}

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
            gsap.set(item, { opacity: 0, y: 48 })
            const proxy = { p: 0 }
            const tween = gsap.to(proxy, {
              p: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: item,
                start: 'top 96%',
                end: 'bottom 4%',
                scrub: true,
              },
              onUpdate: () => gsap.set(item, place(proxy.p)),
            })
            gsap.set(item, place(tween.scrollTrigger?.progress ?? 0))
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
