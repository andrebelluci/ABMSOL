'use client'

import { useEffect, useRef, useState } from 'react'
import { Group, PerspectiveCamera } from 'three'

import {
  PLATE_TILT,
  SUN_DEPTH_URL,
  fitCamera,
  lightStage,
  loadSun,
  makeRenderer,
  resizeRenderer,
} from '@/components/sun/sun-stage'

type Box = { top: number; left: number; width: number; height: number }

function centerBox(): Box {
  const size = Math.min(window.innerWidth, window.innerHeight) * 0.5
  return {
    top: (window.innerHeight - size) / 2,
    left: (window.innerWidth - size) / 2,
    width: size,
    height: size,
  }
}

function startBox(): Box {
  const sun = document.querySelector<HTMLElement>('[data-sun-root]')
  if (!sun) return centerBox()
  const rect = sun.getBoundingClientRect()
  const visible = rect.width > 80 && rect.bottom > 80 && rect.top < window.innerHeight - 40
  if (!visible) return centerBox()
  return { top: rect.top, left: rect.left, width: rect.width, height: rect.height }
}

export function SunPassScene({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [box, setBox] = useState<Box>(startBox)
  const [opacity, setOpacity] = useState(1)

  const doneRef = useRef(onDone)
  doneRef.current = onDone

  useEffect(() => {
    const sun = document.querySelector<HTMLElement>('[data-sun-root]')
    sun?.classList.add('is-passing')
    const move = requestAnimationFrame(() => {
      requestAnimationFrame(() => setBox(centerBox()))
    })
    const fade = window.setTimeout(() => setOpacity(0), 1080)
    const done = window.setTimeout(() => doneRef.current(), 1480)
    return () => {
      cancelAnimationFrame(move)
      window.clearTimeout(fade)
      window.clearTimeout(done)
      sun?.classList.remove('is-passing')
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let dead = false
    let frame = 0
    const bag: { stop?: () => void } = {}

    const run = async () => {
      const renderer = makeRenderer(canvas)
      if (!renderer.getContext()) {
        renderer.dispose()
        return
      }
      const stage = new Group()
      const world = new Group()
      stage.add(world)
      lightStage(stage)
      const camera = new PerspectiveCamera(30, 1, 10, 20000)
      fitCamera(camera, 0.86)
      let model: Group
      try {
        model = await loadSun(SUN_DEPTH_URL)
      } catch {
        renderer.dispose()
        return
      }
      if (dead) {
        renderer.dispose()
        return
      }
      world.add(model)
      const started = performance.now()
      const observer = new ResizeObserver(() => resizeRenderer(renderer, camera, canvas))
      observer.observe(canvas)
      const tick = (now: number) => {
        if (dead) return
        frame = requestAnimationFrame(tick)
        const t = Math.min(1, (now - started) / 1200)
        const eased = 1 - (1 - t) ** 3
        world.rotation.x = PLATE_TILT.x + (0.16 - PLATE_TILT.x) * eased
        world.rotation.y = PLATE_TILT.y + (1.42 - PLATE_TILT.y) * eased
        renderer.render(stage, camera)
      }
      resizeRenderer(renderer, camera, canvas)
      frame = requestAnimationFrame(tick)
      bag.stop = () => {
        cancelAnimationFrame(frame)
        observer.disconnect()
        renderer.dispose()
      }
    }

    void run()
    return () => {
      dead = true
      bag.stop?.()
    }
  }, [])

  return (
    <div
      className="sun-pass"
      style={{
        top: box.top,
        left: box.left,
        width: box.width,
        height: box.height,
        opacity,
      }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="sun-pass-canvas" />
    </div>
  )
}
