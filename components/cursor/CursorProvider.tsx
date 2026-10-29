'use client'

import { useEffect, useRef } from 'react'
import { Cursor } from '@/components/cursor/Cursor'
import { placeSatellite, readCursorHit, type CursorHit, type Slot } from '@/components/cursor/useCursorState'
import { gsap } from '@/lib/gsap'
import { startFpsProbe } from '@/lib/pointer-layer'

export function CursorProvider() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ring = root.querySelector<HTMLElement>('.cursor-ring')
    const core = root.querySelector<HTMLElement>('.cursor-core')
    const sat = root.querySelector<HTMLElement>('.cursor-sat')
    const pill = root.querySelector<HTMLElement>('.cursor-pill')
    const line = root.querySelector<SVGLineElement>('line')
    const svg = root.querySelector<SVGSVGElement>('.cursor-line')
    if (!ring || !core || !sat || !pill || !line || !svg) return

    let x = 0
    let y = 0
    let sx = 0
    let sy = 0
    let tx = 0
    let ty = 0
    let slot: Slot = 0
    let anchorX = 0
    let anchorY = 0
    let inside = false
    let pressed = false
    let hit: CursorHit = readCursorHit(null)
    let avoid: DOMRect[] = []
    let nodes: DOMRect[] = []
    let textRect: DOMRect | null = null
    let targetEl: HTMLElement | null = null
    const pillSize = { w: 0, h: 0 }

    const fitLine = () => {
      svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`)
    }

    const refresh = () => {
      avoid = [...document.querySelectorAll<HTMLElement>('[data-cursor-avoid]')].map((el) => el.getBoundingClientRect())
      nodes = [...document.querySelectorAll<HTMLElement>('[data-sun-node]')].map((el) => el.getBoundingClientRect())
      if (targetEl) textRect = targetEl.getBoundingClientRect()
    }

    const show = (next: CursorHit) => {
      hit = next
      const visible = inside && next.mode !== 'hidden'
      document.documentElement.classList.toggle('cursor-on', visible)
      root.hidden = !visible
      root.dataset.mode = next.mode
      root.dataset.theme = next.theme
      root.dataset.sat = next.label && visible ? '1' : '0'
      if (pill.textContent !== next.label) pill.textContent = next.label
      targetEl = next.target
      textRect = next.target ? next.target.getBoundingClientRect() : null
      if (!next.label || !visible) return
      pillSize.w = Math.max(pill.offsetWidth, Math.ceil(next.label.length * 7.5 + 24))
      pillSize.h = Math.max(pill.offsetHeight, 24)
      const placed = placeSatellite({
        x,
        y,
        width: pillSize.w,
        height: pillSize.h,
        slot,
        anchorX,
        anchorY,
        avoid,
        text: textRect,
      })
      slot = placed.slot
      anchorX = placed.anchorX
      anchorY = placed.anchorY
      sx = placed.x
      sy = placed.y
      sat.style.transform = `translate3d(${Math.round(sx)}px,${Math.round(sy)}px,0)`
    }

    const paintPointer = () => {
      core.style.transform = `translate3d(${x}px,${y}px,0)`
      let rx = x
      let ry = y
      if (hit.mode === 'node' && hit.node?.hasAttribute('data-sun-node')) {
        const rect = hit.node.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        if (Math.hypot(x - cx, y - cy) <= 12) {
          rx = cx
          ry = cy
        }
      }
      const scale = pressed ? 0.85 : 1
      ring.style.transform = `translate3d(${rx}px,${ry}px,0) scale(${scale})`
    }

    const onMove = (event: PointerEvent) => {
      x = event.clientX
      y = event.clientY
      inside = true
      const next = readCursorHit(event.target)
      if (
        next.mode !== hit.mode ||
        next.label !== hit.label ||
        next.theme !== hit.theme ||
        next.target !== hit.target
      ) {
        show(next)
      } else if (root.hidden && next.mode !== 'hidden') {
        show(next)
      }
      paintPointer()
    }

    const onLeave = (event: PointerEvent) => {
      if (event.relatedTarget) return
      inside = false
      document.documentElement.classList.remove('cursor-on')
      root.hidden = true
    }

    const onDown = () => {
      pressed = true
      paintPointer()
    }
    const onUp = () => {
      pressed = false
      paintPointer()
    }

    const onFocus = (event: FocusEvent) => {
      show(readCursorHit(event.target))
    }

    const tick = () => {
      if (!inside || hit.mode === 'hidden' || root.hidden) {
        line.style.opacity = '0'
        return
      }
      if (hit.label && pillSize.w > 0) {
        const placed = placeSatellite({
          x,
          y,
          width: pillSize.w,
          height: pillSize.h,
          slot,
          anchorX,
          anchorY,
          avoid,
          text: textRect,
        })
        slot = placed.slot
        anchorX = placed.anchorX
        anchorY = placed.anchorY
        sx += (placed.x - sx) * 0.28
        sy += (placed.y - sy) * 0.28
        sat.style.transform = `translate3d(${Math.round(sx)}px,${Math.round(sy)}px,0)`
      }

      let best: { x: number; y: number; d: number } | null = null
      for (const rect of nodes) {
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const d = Math.hypot(x - cx, y - cy)
        if (d <= 120 && (!best || d < best.d)) best = { x: cx, y: cy, d }
      }
      if (!best) {
        line.style.opacity = '0'
        tx = x
        ty = y
        return
      }
      tx += (best.x - tx) * 0.28
      ty += (best.y - ty) * 0.28
      line.setAttribute('x1', String(x))
      line.setAttribute('y1', String(y))
      line.setAttribute('x2', String(tx))
      line.setAttribute('y2', String(ty))
      line.style.opacity = '1'
    }

    fitLine()
    refresh()
    const stopProbe = startFpsProbe()
    gsap.ticker.add(tick)
    document.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerout', onLeave)
    document.addEventListener('pointerdown', onDown, { passive: true })
    document.addEventListener('pointerup', onUp, { passive: true })
    document.addEventListener('pointercancel', onUp, { passive: true })
    document.addEventListener('focusin', onFocus)
    const onResize = () => {
      fitLine()
      refresh()
    }
    window.addEventListener('scroll', refresh, { passive: true, capture: true })
    window.addEventListener('resize', onResize)

    return () => {
      stopProbe()
      gsap.ticker.remove(tick)
      document.documentElement.classList.remove('cursor-on')
      document.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerout', onLeave)
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointercancel', onUp)
      document.removeEventListener('focusin', onFocus)
      window.removeEventListener('scroll', refresh, true)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <Cursor rootRef={rootRef} />
}
