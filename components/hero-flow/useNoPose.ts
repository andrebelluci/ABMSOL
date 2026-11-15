'use client'

import { useEffect, useRef, type RefObject } from 'react'

import type { NoPose } from '@/components/hero-flow/NoCharacter'

type TweenVars = Record<string, number | string>
type GsapApi = {
  set: (target: object, vars: TweenVars) => void
  to: (target: object, vars: TweenVars & { duration?: number; ease?: string }) => { kill: () => void }
  timeline: (vars?: { repeat?: number; yoyo?: boolean }) => {
    to: (
      target: object,
      vars: TweenVars & { duration?: number; ease?: string },
      position?: number | string,
    ) => unknown
    kill: () => void
  }
  killTweensOf: (target: object) => void
}

const POSES: Record<NoPose, Record<string, number>> = {
  idle: {
    'data-no-torso': 0,
    'data-no-neck': 0,
    'data-no-arm-l': 0,
    'data-no-arm-r': 0,
    'data-no-elbow-l': 0,
    'data-no-elbow-r': 0,
    'data-no-forearm-l': 0,
    'data-no-forearm-r': 0,
    'data-no-leg-l': 0,
    'data-no-leg-r': 0,
    'data-no-knee-l': 0,
    'data-no-knee-r': 0,
  },
  wave: {
    'data-no-torso': -2,
    'data-no-neck': 6,
    'data-no-arm-l': 8,
    'data-no-arm-r': -28,
    'data-no-elbow-l': 4,
    'data-no-elbow-r': -70,
    'data-no-forearm-l': 0,
    'data-no-forearm-r': -40,
    'data-no-leg-l': 4,
    'data-no-leg-r': -4,
    'data-no-knee-l': 0,
    'data-no-knee-r': 0,
  },
  walk: {
    'data-no-torso': 3,
    'data-no-neck': -2,
    'data-no-arm-l': 22,
    'data-no-arm-r': -22,
    'data-no-elbow-l': 18,
    'data-no-elbow-r': 18,
    'data-no-forearm-l': 8,
    'data-no-forearm-r': 8,
    'data-no-leg-l': -18,
    'data-no-leg-r': 16,
    'data-no-knee-l': 14,
    'data-no-knee-r': -8,
  },
  arrive: {
    'data-no-torso': 0,
    'data-no-neck': 0,
    'data-no-arm-l': 6,
    'data-no-arm-r': -6,
    'data-no-elbow-l': 10,
    'data-no-elbow-r': 10,
    'data-no-forearm-l': 0,
    'data-no-forearm-r': 0,
    'data-no-leg-l': -2,
    'data-no-leg-r': 2,
    'data-no-knee-l': 4,
    'data-no-knee-r': 4,
  },
}

const JOINT_ATTRS = Object.keys(POSES.idle)

function killStageTweens(gsap: GsapApi, root: HTMLElement) {
  gsap.killTweensOf(root)
  JOINT_ATTRS.forEach((attr) => {
    const el = root.querySelector(`[${attr}]`)
    if (el) gsap.killTweensOf(el)
  })
  root.querySelectorAll('[data-no-seed-trail], [data-no-seed-knot], [data-no-seed-node]').forEach((el) => {
    gsap.killTweensOf(el)
  })
}

function applyPose(gsap: GsapApi, root: HTMLElement, pose: NoPose, reduced: boolean) {
  const map = POSES[pose]
  const duration = reduced ? 0 : 0.55
  Object.entries(map).forEach(([attr, rotation]) => {
    const el = root.querySelector(`[${attr}]`)
    if (!el) return
    gsap.killTweensOf(el)
    const vars = { rotation, transformOrigin: '0px 0px' }
    if (reduced || duration === 0) gsap.set(el, vars)
    else gsap.to(el, { ...vars, duration, ease: 'power2.out' })
  })
}

function startIdleBreath(gsap: GsapApi, root: HTMLElement, reduced: boolean) {
  const torso = root.querySelector('[data-no-torso]')
  const neck = root.querySelector('[data-no-neck]')
  if (!torso || reduced) return () => undefined
  const tl = gsap.timeline({ repeat: -1, yoyo: true })
  tl.to(torso, { scaleY: 1.03, duration: 1.4, ease: 'sine.inOut', transformOrigin: '0px 0px' }, 0)
  if (neck) tl.to(neck, { y: -1.2, duration: 1.4, ease: 'sine.inOut' }, 0)
  return () => {
    tl.kill()
    gsap.set(torso, { scaleY: 1, y: 0 })
    if (neck) gsap.set(neck, { y: 0 })
  }
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
 * GSAP só via import dinâmico no fluxo.
 * Idle (breath) e tweens do palco são kill ao desmontar, ao fechar o fluxo
 * e quando o palco sai de vista (IntersectionObserver).
 */
export function useNoPose(stageRef: RefObject<HTMLElement | null>, pose: NoPose, showSeed: boolean) {
  const breathStop = useRef<(() => void) | null>(null)
  const seedStop = useRef<(() => void) | null>(null)
  const gsapRef = useRef<GsapApi | null>(null)
  const visibleRef = useRef(true)
  const poseRef = useRef(pose)
  poseRef.current = pose

  const stopAll = (root: HTMLElement | null) => {
    breathStop.current?.()
    breathStop.current = null
    seedStop.current?.()
    seedStop.current = null
    if (root && gsapRef.current) killStageTweens(gsapRef.current, root)
  }

  const runPose = (api: GsapApi, root: HTMLElement) => {
    if (!visibleRef.current) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    breathStop.current?.()
    breathStop.current = null
    applyPose(api, root, poseRef.current, reduced)
    if (poseRef.current === 'idle' || poseRef.current === 'arrive') {
      breathStop.current = startIdleBreath(api, root, reduced)
    }
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
      runPose(api, stageRef.current)
    })

    return () => {
      alive = false
      stopAll(stageRef.current)
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

  // Pausa idle/tweens quando o palco sai da viewport; retoma ao voltar.
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
        runPose(api, root)
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
