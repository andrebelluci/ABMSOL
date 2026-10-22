'use client'

import { useEffect, useRef } from 'react'
import { gsap, registerGSAP } from '@/lib/gsap'

type CursorMode = 'default' | 'link' | 'scanner' | 'video'

const LERP = 0.12
const SIZE_DEFAULT = 28
const SIZE_LINK = 48
const SIZE_SCANNER_OUTER = 60
const SIZE_SCANNER_INNER = 40

function resolveCursorMode(el: HTMLElement | null): {
  mode: CursorMode
  label: string
} {
  if (!el) return { mode: 'default', label: '' }

  if (el.closest('[data-cursor-video], video')) {
    return { mode: 'video', label: '' }
  }

  if (el.closest('[data-cursor-profile]')) {
    return { mode: 'scanner', label: 'PERFIL' }
  }

  if (
    el.closest(
      '[data-cursor-image], [data-cursor-view], img, picture, [data-placeholder]'
    )
  ) {
    return { mode: 'scanner', label: 'EXPLORE' }
  }

  if (
    el.closest('a, button, [role="button"], input[type="submit"], [data-cursor-hover]')
  ) {
    return { mode: 'link', label: 'VER' }
  }

  return { mode: 'default', label: '' }
}

function PlayIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 text-[var(--cursor-fg)]"
      aria-hidden="true"
    >
      <path fill="currentColor" d="M9 7.5v9l7.5-4.5L9 7.5z" />
    </svg>
  )
}

export function CustomCursor() {
  const rootRef = useRef<HTMLDivElement>(null)
  const boxRef = useRef<HTMLDivElement>(null)
  const innerRingRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const playRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches
    if (isTouch) return

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    registerGSAP()
    document.body.classList.add('custom-cursor-active')

    const root = rootRef.current
    const box = boxRef.current
    const innerRing = innerRingRef.current
    const fill = fillRef.current
    const label = labelRef.current
    const play = playRef.current

    if (!root || !box || !innerRing || !fill || !label || !play) {
      return
    }

    const pos = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    let mode: CursorMode = 'default'
    const lerp = prefersReduced ? 1 : LERP

    gsap.set(root, {
      x: 0,
      y: 0,
      xPercent: -50,
      yPercent: -50,
      force3D: true,
    })

    gsap.set(box, { width: SIZE_DEFAULT, height: SIZE_DEFAULT })
    gsap.set(innerRing, {
      width: SIZE_SCANNER_INNER,
      height: SIZE_SCANNER_INNER,
    })

    const applyMode = (next: CursorMode, nextLabel: string) => {
      if (mode === next && nextLabel === label.textContent) return
      mode = next

      const duration = prefersReduced ? 0 : 0.22
      const ease = 'power1.out'

      const isScanner = next === 'scanner'
      const isLink = next === 'link'
      const isVideo = next === 'video'

      const outerSize = isScanner
        ? SIZE_SCANNER_OUTER
        : isLink || isVideo
          ? SIZE_LINK
          : SIZE_DEFAULT

      gsap.to(box, {
        width: outerSize,
        height: outerSize,
        duration,
        ease,
        overwrite: true,
      })

      gsap.to(innerRing, {
        width: isScanner ? SIZE_SCANNER_INNER : SIZE_DEFAULT,
        height: isScanner ? SIZE_SCANNER_INNER : SIZE_DEFAULT,
        opacity: isScanner ? 1 : 0,
        duration,
        ease,
        overwrite: true,
      })

      gsap.to(fill, {
        opacity: isLink ? 0.18 : 0,
        duration,
        ease,
        overwrite: true,
      })

      gsap.to(label, {
        opacity: isLink || isScanner ? 1 : 0,
        duration: duration * 0.85,
        ease,
        overwrite: true,
      })

      gsap.to(play, {
        opacity: isVideo ? 1 : 0,
        duration,
        ease,
        overwrite: true,
      })

      label.textContent = nextLabel
    }

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX
      target.y = e.clientY
    }

    const onOver = (e: MouseEvent) => {
      const { mode: nextMode, label: nextLabel } = resolveCursorMode(
        e.target as HTMLElement
      )
      applyMode(nextMode, nextLabel)
    }

    const tick = () => {
      pos.x += (target.x - pos.x) * lerp
      pos.y += (target.y - pos.y) * lerp
      gsap.set(root, {
        x: pos.x,
        y: pos.y,
        force3D: true,
      })
    }

    applyMode('default', '')

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    gsap.ticker.add(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      gsap.ticker.remove(tick)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden mix-blend-difference md:block"
      aria-hidden="true"
    >
      <div
        ref={boxRef}
        className="relative"
        style={{ width: SIZE_DEFAULT, height: SIZE_DEFAULT }}
      >
        <div
          ref={fillRef}
          className="absolute inset-0 rounded-full bg-[var(--cursor-fg)] opacity-0"
        />

        <div className="absolute inset-0 rounded-full border-[1.5px] border-[var(--cursor-fg)]" />

        <div
          ref={innerRingRef}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--cursor-fg)] opacity-0"
          style={{ width: SIZE_SCANNER_INNER, height: SIZE_SCANNER_INNER }}
        />

        <div
          ref={playRef}
          className="absolute inset-0 flex items-center justify-center opacity-0"
        >
          <PlayIcon />
        </div>

        <span
          ref={labelRef}
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-sans text-[10px] font-semibold uppercase leading-none tracking-[0.16em] text-[var(--cursor-fg)] opacity-0 antialiased"
        />
      </div>
    </div>
  )
}
