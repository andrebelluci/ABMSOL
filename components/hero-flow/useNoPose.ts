'use client'

import { useEffect, useRef, type RefObject } from 'react'

import type { NoPose } from '@/components/hero-flow/NoCharacter'
import { POSES, paintPose, type Pose } from '@/components/hero-flow/rig'

type TweenVars = Record<string, unknown>
type GsapApi = {
  set: (target: object, vars: TweenVars) => void
  to: (target: object, vars: TweenVars) => { kill: () => void }
  timeline: (vars?: TweenVars) => {
    to: (target: object, vars: TweenVars, position?: number | string) => unknown
    kill: () => void
  }
  killTweensOf: (target: object) => void
}

function killStageTweens(gsap: GsapApi, root: HTMLElement, cur: Pose) {
  gsap.killTweensOf(cur)
  gsap.killTweensOf(root)
  root
    .querySelectorAll('[data-no-seed-trail], [data-no-seed-knot], [data-no-seed-node]')
    .forEach((el) => gsap.killTweensOf(el))
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

/**
 * GSAP só via import dinâmico. Poses via proxy (atributo transform=rotate),
 * kill ao desmontar / fora de vista; seed mantém o tween de cena.
 */
export function useNoPose(stageRef: RefObject<HTMLElement | null>, pose: NoPose, showSeed: boolean) {
  const poseStop = useRef<(() => void) | null>(null)
  const seedStop = useRef<(() => void) | null>(null)
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
    seedStop.current?.()
    seedStop.current = null
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
    if (!showSeed) {
      seedStop.current?.()
      seedStop.current = null
      return
    }
    let alive = true
    void import('@/lib/gsap').then(({ gsap, registerGSAP }) => {
      if (!alive || !stageRef.current || !visibleRef.current) return
      registerGSAP()
      const api = gsap as unknown as GsapApi
      gsapRef.current = api
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      seedStop.current?.()
      seedStop.current = playSeedScene(api, stageRef.current, reduced)
    })
    return () => {
      alive = false
      seedStop.current?.()
      seedStop.current = null
    }
  }, [showSeed, stageRef])

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
        if (showSeed) {
          const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
          seedStop.current?.()
          seedStop.current = playSeedScene(api, root, reduced)
        }
      },
      { threshold: 0.05 },
    )
    io.observe(root)
    return () => {
      io.disconnect()
      stopAll(root)
    }
  }, [stageRef, showSeed])
}
