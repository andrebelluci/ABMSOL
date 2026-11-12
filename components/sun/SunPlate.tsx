'use client'

import { useEffect, useRef } from 'react'
import { Box3, Group, PerspectiveCamera, Vector3 } from 'three'

import { PLATE_TILT, SUN_DEPTH_URL, fitCamera, lightStage, loadSun, makeRenderer, resizeRenderer } from '@/components/sun/sun-stage'

export function SunPlate() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const root = canvas?.closest<HTMLElement>('[data-sun-root]')
    if (!canvas || !root) return

    let dead = false
    let frame = 0
    const bag: { stop?: () => void } = {}

    const run = async () => {
      const renderer = makeRenderer(canvas)
      if (!renderer.getContext()) {
        renderer.dispose()
        return
      }
      const world = new Group()
      const stage = new Group()
      stage.add(world)
      lightStage(stage)
      const camera = new PerspectiveCamera(28, 1, 10, 20000)
      fitCamera(camera, 0.7)

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
      const bounds = new Box3().setFromObject(model)
      const center = bounds.getCenter(new Vector3())
      const size = bounds.getSize(new Vector3())
      model.position.sub(center)
      const radius = Math.max(size.x, size.y) * 0.62
      const half = (camera.fov * Math.PI) / 360
      const distance = radius / Math.tan(half)
      camera.position.set(distance * 0.2, distance * 0.14, distance * 0.96)
      camera.near = Math.max(1, distance / 80)
      camera.far = distance * 8
      camera.lookAt(0, 0, 0)
      camera.updateProjectionMatrix()

      const pointer = { x: 0, y: 0 }
      const tilt = { x: PLATE_TILT.x, y: PLATE_TILT.y }
      let visible = true
      const hero = root.closest<HTMLElement>('[data-hero]')

      const onPointer = (event: PointerEvent) => {
        pointer.x = event.clientX / window.innerWidth - 0.5
        pointer.y = event.clientY / window.innerHeight - 0.5
      }

      const render = (now: number) => {
        if (dead) return
        frame = requestAnimationFrame(render)
        if (!visible || document.hidden) return
        const time = now / 1000
        const scroll = Number(hero?.style.getPropertyValue('--sun-scroll') || 0)
        const drift = Math.sin(time * 0.55) * 0.46
        const bob = Math.sin(time * 0.7) * 0.16
        tilt.y += (PLATE_TILT.y + drift + pointer.x * 0.85 + scroll * 1.35 - tilt.y) * 0.07
        tilt.x += (PLATE_TILT.x + bob + pointer.y * 0.36 - scroll * 0.42 - tilt.x) * 0.07
        world.rotation.x = tilt.x
        world.rotation.y = tilt.y
        world.rotation.z = Math.sin(time * 0.38) * 0.08
        world.position.y = Math.sin(time * 0.5) * 36 - scroll * 90
        renderer.render(stage, camera)
      }

      resizeRenderer(renderer, camera, canvas)
      world.rotation.set(PLATE_TILT.x, PLATE_TILT.y, 0)
      renderer.render(stage, camera)
      root.classList.add('is-plate')

      const observer = new ResizeObserver(() => resizeRenderer(renderer, camera, canvas))
      observer.observe(root)
      const seen = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting
      })
      if (hero) seen.observe(hero)
      window.addEventListener('pointermove', onPointer, { passive: true })
      frame = requestAnimationFrame(render)

      bag.stop = () => {
        cancelAnimationFrame(frame)
        observer.disconnect()
        seen.disconnect()
        window.removeEventListener('pointermove', onPointer)
        root.classList.remove('is-plate')
        renderer.dispose()
      }
    }

    void run()
    return () => {
      dead = true
      bag.stop?.()
    }
  }, [])

  return <canvas ref={canvasRef} className="sun-plate" aria-hidden="true" />
}
