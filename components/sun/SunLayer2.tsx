'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { SUN_CARDINAL_NODES, SUN_RAYS, SUN_VIEWBOX, sunLocalToViewBox } from '@/components/sun/sun-geometry'
import { gsap, mountGsap } from '@/lib/gsap'
import { startFpsProbe } from '@/lib/pointer-layer'

const VB_W = 1535.6068
const VB_H = 1547.5811

const SUN_TARGETS = [
  { id: 'servicos', href: '/servicos/', label: '01 SERVIÇOS', place: 'n', node: SUN_CARDINAL_NODES[0], ray: SUN_RAYS[0] },
  { id: 'projetos', href: '/#projetos', label: '02 PROJETOS', place: 'e', node: SUN_CARDINAL_NODES[1], ray: SUN_RAYS[1] },
  { id: 'sobre', href: '/sobre/', label: '04 SOBRE', place: 'w', node: SUN_CARDINAL_NODES[2], ray: SUN_RAYS[2] },
  { id: 'como', href: '/#como-trabalhamos', label: '03 COMO TRABALHAMOS', place: 's', node: SUN_CARDINAL_NODES[3], ray: SUN_RAYS[3] },
] as const

function percent(x: number, y: number) {
  const point = sunLocalToViewBox(x, y)
  return { left: `${(point.x / VB_W) * 100}%`, top: `${(point.y / VB_H) * 100}%` }
}

export function SunLayer2() {
  const hostRef = useRef<HTMLDivElement>(null)
  const [root, setRoot] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setRoot(document.querySelector<HTMLElement>('[data-sun-root]'))
  }, [])

  useEffect(() => {
    const host = hostRef.current
    const sun = root
    if (!host || !sun) return

    const rays = [...host.querySelectorAll<SVGLineElement>('.sun-ray')]
    const pulses = [...host.querySelectorAll<SVGLineElement>('.sun-pulse')]
    const labels = [...host.querySelectorAll<HTMLElement>('.sun-node-label')]
    const hits = [...host.querySelectorAll<HTMLElement>('.sun-node-hit')]
    const segments = SUN_TARGETS.map((item) => {
      const from = sunLocalToViewBox(item.ray.x1, item.ray.y1)
      const to = sunLocalToViewBox(item.ray.x2, item.ray.y2)
      return { x1: from.x, y1: from.y, x2: to.x, y2: to.y }
    })

    let active = -1
    let tween: gsap.core.Tween | null = null
    let box = sun.getBoundingClientRect()

    const cache = () => {
      box = sun.getBoundingClientRect()
      const scale = Math.min(box.width / VB_W, box.height / VB_H)
      if (scale <= 0) return
      const ox = (box.width - VB_W * scale) / 2
      const oy = (box.height - VB_H * scale) / 2
      const vis = {
        left: Math.max(box.left + box.width * 0.38, 24) - box.left,
        top: Math.max(24, box.top) - box.top,
        right: Math.min(window.innerWidth - 24, box.right) - box.left,
        bottom: Math.min(window.innerHeight - 24, box.bottom) - box.top,
      }
      const inside = (x: number, y: number) =>
        x >= vis.left && x <= vis.right && y >= vis.top && y <= vis.bottom
      segments.forEach((seg, index) => {
        const ax = ox + seg.x1 * scale
        const ay = oy + seg.y1 * scale
        const bx = ox + seg.x2 * scale
        const by = oy + seg.y2 * scale
        let best: { x: number; y: number } | null = inside(ax, ay) ? { x: ax, y: ay } : null
        for (let step = 1; step <= 24; step += 1) {
          const t = step / 24
          const x = ax + (bx - ax) * t
          const y = ay + (by - ay) * t
          if (inside(x, y)) best = { x, y }
        }
        const hit = hits[index]
        const label = labels[index]
        if (!hit || !label) return
        if (!best) {
          hit.hidden = true
          return
        }
        hit.hidden = false
        const x = ax + (best.x - ax) * 0.8
        const y = ay + (best.y - ay) * 0.8
        hit.style.left = `${x}px`
        hit.style.top = `${y}px`
        label.style.left = `${x}px`
        label.style.top = `${y}px`
      })
    }

    const clear = () => {
      if (active < 0) return
      active = -1
      tween?.kill()
      rays.forEach((line) => line.classList.remove('is-on'))
      pulses.forEach((line) => line.classList.remove('is-on'))
      labels.forEach((label) => label.setAttribute('data-on', '0'))
      sun.style.removeProperty('--sun-ray')
    }

    const energize = (index: number, remain: number) => {
      if (index === active) return
      active = index
      tween?.kill()
      rays.forEach((line, i) => line.classList.toggle('is-on', i === index))
      pulses.forEach((line, i) => line.classList.toggle('is-on', i === index))
      labels.forEach((label, i) => label.setAttribute('data-on', i === index ? '1' : '0'))
      sun.style.setProperty('--sun-ray', String(index))
      const pulse = pulses[index]
      if (!pulse) return
      tween = gsap.fromTo(
        pulse,
        { strokeDashoffset: 1 },
        {
          strokeDashoffset: 0,
          duration: 0.18 + remain * 0.62,
          ease: 'none',
          overwrite: true,
          onUpdate(this: gsap.core.Tween) {
            sun.style.setProperty('--sun-pulse', this.progress().toFixed(3))
          },
        },
      )
    }

    const onMove = (event: PointerEvent) => {
      const target = event.target
      const hero = sun.closest('[data-hero]')
      if (
        !(target instanceof Element) ||
        (!hero?.contains(target) && !host.contains(target)) ||
        target.closest('.hero-copy')
      ) {
        clear()
        return
      }
      const scale = Math.min(box.width / VB_W, box.height / VB_H)
      if (scale <= 0) return
      const ox = box.left + (box.width - VB_W * scale) / 2
      const oy = box.top + (box.height - VB_H * scale) / 2
      const px = event.clientX
      const py = event.clientY
      if (px < box.left - 24 || py < box.top - 24 || px > box.right + 24 || py > box.bottom + 24) {
        clear()
        return
      }
      const ux = (px - ox) / scale
      const uy = (py - oy) / scale
      const limit = 72 / scale
      let best = -1
      let bestD = limit
      let remain = 1
      segments.forEach((seg, index) => {
        const dx = seg.x2 - seg.x1
        const dy = seg.y2 - seg.y1
        const len2 = dx * dx + dy * dy
        const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((ux - seg.x1) * dx + (uy - seg.y1) * dy) / len2))
        const x = seg.x1 + t * dx
        const y = seg.y1 + t * dy
        const d = Math.hypot(ux - x, uy - y)
        if (d < bestD) {
          bestD = d
          best = index
          remain = 1 - t
        }
      })
      if (best < 0) clear()
      else energize(best, remain)
    }

    cache()
    const release = mountGsap(host, () => {
      const motion = gsap.matchMedia()
      motion.add('(pointer: fine) and (hover: hover) and (min-width: 1280px)', () => {
        const stopProbe = startFpsProbe()
        document.addEventListener('pointermove', onMove, { passive: true })
        window.addEventListener('scroll', cache, { passive: true, capture: true })
        window.addEventListener('resize', cache)
        return () => {
          stopProbe()
          tween?.kill()
          document.removeEventListener('pointermove', onMove)
          window.removeEventListener('scroll', cache, true)
          window.removeEventListener('resize', cache)
        }
      })
    })

    return () => release()
  }, [root])

  if (!root) return null

  return createPortal(
    <div ref={hostRef} className="sun-layer">
      <svg className="sun-layer-svg" viewBox={SUN_VIEWBOX} aria-hidden="true">
        {SUN_TARGETS.map((item) => {
          const from = sunLocalToViewBox(item.ray.x1, item.ray.y1)
          const to = sunLocalToViewBox(item.ray.x2, item.ray.y2)
          return (
            <g key={item.id}>
              <line className="sun-ray" x1={from.x} y1={from.y} x2={to.x} y2={to.y} />
              <line className="sun-pulse" pathLength={1} x1={from.x} y1={from.y} x2={to.x} y2={to.y} />
            </g>
          )
        })}
      </svg>
      {SUN_TARGETS.map((item) => {
        const at = percent(item.node.x, item.node.y)
        return (
          <a
            key={item.id}
            href={item.href}
            tabIndex={-1}
            className="sun-node-hit"
            style={at}
            data-sun-node=""
            data-cursor="node"
            data-cursor-label={item.label}
            data-cursor-theme="dark"
          />
        )
      })}
      {SUN_TARGETS.map((item) => {
        const at = percent(item.node.x, item.node.y)
        return (
          <span key={`${item.id}-label`} className="sun-node-label font-mono" data-place={item.place} data-on="0" style={at}>
            {item.label}
          </span>
        )
      })}
    </div>,
    root,
  )
}
