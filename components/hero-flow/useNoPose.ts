'use client'

import { useEffect, useRef, type RefObject } from 'react'

import type { NoPose } from '@/components/hero-flow/NoCharacter'
import type { NoSceneId } from '@/components/hero-flow/NoStage'
import { POSES, paintPose, type Pose } from '@/components/hero-flow/rig'

type TweenVars = Record<string, unknown>
type GsapApi = {
  set: (target: object, vars: TweenVars) => void
  to: (target: object, vars: TweenVars) => { kill: () => void }
  timeline: (vars?: TweenVars) => {
    to: (target: object, vars: TweenVars, position?: number | string) => unknown
    set: (target: object, vars: TweenVars, position?: number | string) => unknown
    kill: () => void
  }
  killTweensOf: (target: object) => void
}

const GOLD = '#dca931'
const MINT = '#73d9b1'

function killStageTweens(gsap: GsapApi, root: HTMLElement, cur: Pose) {
  gsap.killTweensOf(cur)
  gsap.killTweensOf(root)
  root.querySelectorAll('[data-no-el]').forEach((el) => gsap.killTweensOf(el))
}

// Devolve a função que para tudo. Sem rotation/transformOrigin/scale do GSAP nos membros.
function runPose(gsap: GsapApi, root: HTMLElement, cur: Pose, pose: NoPose, reduced: boolean) {
  const paint = () => paintPose(root, cur)
  const stop = () => gsap.killTweensOf(cur)
  gsap.killTweensOf(cur)

  const breathe = (base: Pose) =>
    gsap.to(cur, {
      armL: base.armL + 2,
      armR: base.armR - 2,
      duration: 1.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      onUpdate: paint,
    })

  if (reduced) {
    Object.assign(cur, pose === 'walk' ? POSES.idle : POSES[pose])
    paint()
    return stop
  }

  if (pose === 'wave') {
    gsap.to(cur, {
      ...POSES.wave,
      duration: 0.55,
      ease: 'power2.out',
      onUpdate: paint,
      onComplete: () =>
        gsap.to(cur, {
          elbowR: 0,
          duration: 0.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: 5,
          onUpdate: paint,
        }),
    })
  } else if (pose === 'walk') {
    let n = 0
    const step = (to: Pose) =>
      gsap.to(cur, {
        ...to,
        duration: 0.45,
        ease: 'sine.inOut',
        onUpdate: paint,
        onComplete: () => {
          if (++n < 6) step(to === POSES.walkA ? POSES.walkB : POSES.walkA)
          else
            gsap.to(cur, {
              ...POSES.idle,
              duration: 0.5,
              ease: 'power2.out',
              onUpdate: paint,
              onComplete: () => breathe(POSES.idle),
            })
        },
      })
    step(POSES.walkA)
  } else {
    const target = POSES[pose]
    gsap.to(cur, {
      ...target,
      duration: 0.55,
      ease: 'power2.out',
      onUpdate: paint,
      onComplete: () => breathe(target),
    })
  }
  return stop
}

function playSeedScene(gsap: GsapApi, root: HTMLElement, reduced: boolean) {
  const trail = root.querySelector('[data-no-seed-trail]')
  const knot = root.querySelector('[data-no-seed-knot]')
  const node = root.querySelector('[data-no-seed-node]')
  if (!trail || !knot) return () => undefined

  gsap.set(knot, { scale: reduced ? 1 : 0, transformOrigin: '50% 50%' })
  gsap.set(trail, { strokeDasharray: 1, strokeDashoffset: 1 })
  if (node) gsap.set(node, { opacity: 0 })

  if (reduced) {
    gsap.set(knot, { scale: 1 })
    gsap.set(trail, { strokeDashoffset: 0 })
    if (node) gsap.set(node, { opacity: 1 })
    return () => undefined
  }

  const tl = gsap.timeline()
  tl.to(knot, { scale: 1, duration: 0.35, ease: 'back.out(1.6)' })
  tl.to(trail, { strokeDashoffset: 0, duration: 0.9, ease: 'power1.inOut' }, '-=0.05')
  if (node) tl.to(node, { opacity: 1, duration: 0.25 }, '-=0.2')
  return () => tl.kill()
}

function playWindowScene(gsap: GsapApi, root: HTMLElement, reduced: boolean) {
  const win = root.querySelector('[data-no-window]')
  const frame = root.querySelectorAll('[data-no-window-frame], [data-no-window-bar]')
  const dots = root.querySelectorAll('[data-no-window-dot]')
  const lines = root.querySelectorAll('[data-no-window-line]')
  if (!win) return () => undefined

  gsap.set(win, {
    rotation: reduced ? 0 : -14,
    svgOrigin: '84 114',
  })
  gsap.set(frame, { stroke: GOLD })
  gsap.set(dots, { stroke: GOLD, fill: GOLD })
  gsap.set(lines, { opacity: reduced ? 1 : 0, stroke: MINT })

  if (reduced) {
    gsap.set(win, { rotation: 0, svgOrigin: '84 114' })
    gsap.set(frame, { stroke: MINT })
    gsap.set(dots, { stroke: MINT, fill: MINT })
    gsap.set(lines, { opacity: 1 })
    return () => undefined
  }

  const tl = gsap.timeline()
  tl.to(win, { rotation: 2, duration: 0.45, ease: 'power2.out', svgOrigin: '84 114' })
  tl.to(win, { rotation: 0, duration: 0.15, ease: 'power1.out', svgOrigin: '84 114' })
  tl.to(frame, { stroke: MINT, duration: 0.3, ease: 'power1.out' }, '-=0.05')
  tl.to(dots, { stroke: MINT, fill: MINT, duration: 0.3, ease: 'power1.out' }, '<')
  tl.to(lines, { opacity: 1, duration: 0.25, stagger: 0.06 }, '-=0.1')
  return () => tl.kill()
}

function playShopScene(gsap: GsapApi, root: HTMLElement, reduced: boolean) {
  const dust = root.querySelectorAll('[data-no-shop-dust]')
  const lamp = root.querySelector('[data-no-shop-lamp]')
  const sign = root.querySelector('[data-no-shop-sign]')
  const halo = root.querySelector('[data-no-shop-halo]')
  if (!lamp || !sign || !halo) return () => undefined

  gsap.set(dust, { opacity: reduced ? 0 : 0.7, y: 0 })
  gsap.set(lamp, { stroke: reduced ? MINT : GOLD, fill: 'none' })
  gsap.set(sign, { stroke: reduced ? MINT : GOLD })
  gsap.set(halo, { opacity: reduced ? 0.45 : 0, stroke: MINT })

  if (reduced) {
    gsap.set(dust, { opacity: 0 })
    gsap.set(lamp, { stroke: MINT })
    gsap.set(sign, { stroke: MINT })
    gsap.set(halo, { opacity: 0.45 })
    return () => undefined
  }

  const tl = gsap.timeline()
  tl.to(dust, {
    y: -10,
    opacity: 0,
    duration: 0.45,
    stagger: 0.12,
    ease: 'power1.out',
  })
  tl.to([lamp, sign], { stroke: MINT, duration: 0.35, ease: 'power2.out' }, '-=0.05')
  tl.to(halo, { opacity: 0.45, duration: 0.4, ease: 'power1.out' }, '-=0.25')
  return () => tl.kill()
}

function playScene(
  gsap: GsapApi,
  root: HTMLElement,
  scene: NoSceneId,
  reduced: boolean,
) {
  switch (scene) {
    case 'seed':
      return playSeedScene(gsap, root, reduced)
    case 'window':
      return playWindowScene(gsap, root, reduced)
    case 'shop':
      return playShopScene(gsap, root, reduced)
    default:
      return () => undefined
  }
}

/**
 * GSAP só via import dinâmico. Poses via proxy (atributo transform=rotate),
 * kill ao desmontar / fora de vista; cena SVG via playScene.
 */
export function useNoPose(
  stageRef: RefObject<HTMLElement | null>,
  pose: NoPose,
  scene: NoSceneId,
) {
  const poseStop = useRef<(() => void) | null>(null)
  const sceneStop = useRef<(() => void) | null>(null)
  const gsapRef = useRef<GsapApi | null>(null)
  const visibleRef = useRef(true)
  const poseRef = useRef(pose)
  const curRef = useRef<Pose>({ ...POSES.idle })

  useEffect(() => {
    poseRef.current = pose
  }, [pose])

  const stopAll = (root: HTMLElement | null) => {
    poseStop.current?.()
    poseStop.current = null
    sceneStop.current?.()
    sceneStop.current = null
    if (root && gsapRef.current) killStageTweens(gsapRef.current, root, curRef.current)
  }

  const startPose = (api: GsapApi, root: HTMLElement) => {
    if (!visibleRef.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    poseStop.current?.()
    poseStop.current = runPose(api, root, curRef.current, poseRef.current, reduced)
  }

  useEffect(() => {
    const root = stageRef.current
    if (!root) return
    let alive = true

    void import('@/lib/gsap').then(({ gsap, registerGSAP }) => {
      if (!alive || !stageRef.current) return
      registerGSAP()
      const api = gsap as unknown as GsapApi
      gsapRef.current = api
      startPose(api, stageRef.current)
    })

    return () => {
      alive = false
      stopAll(root)
      gsapRef.current = null
    }
  }, [pose, stageRef])

  useEffect(() => {
    if (scene === 'none') {
      sceneStop.current?.()
      sceneStop.current = null
      return
    }
    let alive = true
    void import('@/lib/gsap').then(({ gsap, registerGSAP }) => {
      if (!alive || !stageRef.current || !visibleRef.current) return
      registerGSAP()
      const api = gsap as unknown as GsapApi
      gsapRef.current = api
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      sceneStop.current?.()
      sceneStop.current = playScene(api, stageRef.current, scene, reduced)
    })
    return () => {
      alive = false
      sceneStop.current?.()
      sceneStop.current = null
    }
  }, [scene, stageRef])

  useEffect(() => {
    const root = stageRef.current
    if (!root) return

    const io = new IntersectionObserver(
      ([entry]) => {
        const next = entry.isIntersecting
        if (next === visibleRef.current) return
        visibleRef.current = next
        const api = gsapRef.current
        if (!api) return
        if (!next) {
          stopAll(root)
          return
        }
        startPose(api, root)
        if (scene !== 'none') {
          const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          sceneStop.current?.()
          sceneStop.current = playScene(api, root, scene, reduced)
        }
      },
      { threshold: 0.05 },
    )
    io.observe(root)
    return () => {
      io.disconnect()
      stopAll(root)
    }
  }, [stageRef, scene])
}
