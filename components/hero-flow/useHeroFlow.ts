'use client'

import { useCallback, useEffect, useReducer, useRef } from 'react'

import {
  trackHeroFlowNeed,
  trackHeroFlowProfile,
  trackHeroFlowStart,
} from '@/lib/analytics'
import type { NeedId, ProfileId } from '@/lib/content/hero-flow/steps'

export type HeroFlowState =
  | { step: 'idle' }
  | { step: 'profile' }
  | { step: 'need'; profileId: ProfileId }
  | { step: 'result'; profileId: ProfileId; needId: NeedId }

type Action =
  | { type: 'open' }
  | { type: 'openNeed'; profileId: ProfileId }
  | { type: 'close' }
  | { type: 'back' }
  | { type: 'chooseProfile'; profileId: ProfileId }
  | { type: 'chooseNeed'; needId: NeedId }
  | { type: 'redo' }

type Entry = 'button' | 'link'

const PROFILE_HASH: Record<ProfileId, string> = {
  comecando: '#caminho-comecando',
  'site-fraco': '#caminho-site-fraco',
  'negocio-solido': '#caminho-negocio-solido',
}

const HASH_PROFILE = Object.fromEntries(
  Object.entries(PROFILE_HASH).map(([id, hash]) => [hash, id as ProfileId]),
) as Record<string, ProfileId>

function reducer(state: HeroFlowState, action: Action): HeroFlowState {
  switch (action.type) {
    case 'open':
      return { step: 'profile' }
    case 'openNeed':
      return { step: 'need', profileId: action.profileId }
    case 'close':
      return { step: 'idle' }
    case 'chooseProfile':
      return { step: 'need', profileId: action.profileId }
    case 'chooseNeed':
      if (state.step !== 'need') return state
      return { step: 'result', profileId: state.profileId, needId: action.needId }
    case 'back':
      if (state.step === 'need') return { step: 'profile' }
      if (state.step === 'result') return { step: 'need', profileId: state.profileId }
      return state
    case 'redo':
      return { step: 'profile' }
    default:
      return state
  }
}

function syncHeroFlags(state: HeroFlowState) {
  const hero = document.querySelector<HTMLElement>('[data-hero]')
  if (!hero) return
  const active = state.step !== 'idle'
  if (active) hero.setAttribute('data-hero-flow', '1')
  else hero.removeAttribute('data-hero-flow')
  if (state.step === 'result') hero.setAttribute('data-hero-flow-result', '1')
  else hero.removeAttribute('data-hero-flow-result')
  window.dispatchEvent(
    new CustomEvent('hero-flow-change', { detail: { active, step: state.step } }),
  )
}

function clearHeroFlags() {
  const hero = document.querySelector<HTMLElement>('[data-hero]')
  if (!hero) return
  hero.removeAttribute('data-hero-flow')
  hero.removeAttribute('data-hero-flow-result')
  window.dispatchEvent(new CustomEvent('hero-flow-change', { detail: { active: false, step: 'idle' } }))
}

/** Ignora scroll-behavior: smooth do CSS (html e data-scroll-behavior). */
function jumpTo(y: number) {
  const html = document.documentElement
  const prev = html.style.scrollBehavior
  html.style.scrollBehavior = 'auto'
  window.scrollTo(0, y)
  html.style.scrollBehavior = prev
}

function lockScroll() {
  jumpTo(0)
  document.documentElement.setAttribute('data-scroll-lock', '')
  window.dispatchEvent(new CustomEvent('abmsol:scroll-lock', { detail: true }))
}

function unlockScroll() {
  document.documentElement.removeAttribute('data-scroll-lock')
  window.dispatchEvent(new CustomEvent('abmsol:scroll-lock', { detail: false }))
}

function clearHash() {
  const { pathname, search } = window.location
  window.history.replaceState(null, '', `${pathname}${search}`)
}

function pushHash(hash: string) {
  const { pathname, search } = window.location
  if (window.location.hash === hash) return
  window.history.pushState(null, '', `${pathname}${search}${hash}`)
}

function parseHash(raw: string): { kind: 'profile' } | { kind: 'need'; profileId: ProfileId } | null {
  const hash = (!raw ? '' : raw.startsWith('#') ? raw : `#${raw}`).toLowerCase()
  if (hash === '#caminho') return { kind: 'profile' }
  const profileId = HASH_PROFILE[hash]
  if (profileId) return { kind: 'need', profileId }
  return null
}

export function useHeroFlow() {
  const [state, dispatch] = useReducer(reducer, { step: 'idle' })
  const stateRef = useRef(state)
  const savedY = useRef(0)

  useEffect(() => {
    stateRef.current = state
  }, [state])
  const entryRef = useRef<Entry>('button')
  const openBtnRef = useRef<HTMLButtonElement | null>(null)
  const ignoreHash = useRef(false)

  const restoreFocus = useCallback(() => {
    if (entryRef.current === 'link') {
      const h1 = document.querySelector<HTMLElement>('.hero-title')
      if (h1) {
        if (!h1.hasAttribute('tabindex')) h1.setAttribute('tabindex', '-1')
        h1.focus()
      }
      return
    }
    const btn =
      openBtnRef.current ??
      [...document.querySelectorAll('button')].find((b) =>
        (b.textContent || '').includes('Descobrir meu caminho'),
      )
    btn?.focus()
  }, [])

  const exitFlow = useCallback(() => {
    const y = savedY.current
    unlockScroll()
    ignoreHash.current = true
    clearHash()
    dispatch({ type: 'close' })
    // Lenis recomeça no unlock; dois rAF + fallback garantem o jumpTo após o start.
    const restore = () => {
      jumpTo(y)
      void import('@/lib/gsap').then(({ ScrollTrigger }) => {
        ScrollTrigger.refresh()
      })
      restoreFocus()
      ignoreHash.current = false
    }
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        restore()
        if (Math.abs(window.scrollY - y) > 1) {
          window.setTimeout(restore, 50)
        }
      })
    })
  }, [restoreFocus])

  useEffect(() => {
    syncHeroFlags(state)
  }, [state])

  useEffect(
    () => () => {
      clearHeroFlags()
      unlockScroll()
    },
    [],
  )

  const openFromHash = useCallback((hash: string) => {
    const parsed = parseHash(hash)
    if (!parsed) return false
    if (stateRef.current.step === 'idle') {
      savedY.current = window.scrollY
      entryRef.current = 'link'
      trackHeroFlowStart('link')
      lockScroll()
    }
    if (parsed.kind === 'profile') dispatch({ type: 'open' })
    else dispatch({ type: 'openNeed', profileId: parsed.profileId })
    return true
  }, [])

  useEffect(() => {
    openFromHash(window.location.hash)

    const onHash = () => {
      if (ignoreHash.current) return
      if (!window.location.hash) {
        if (stateRef.current.step !== 'idle') exitFlow()
        return
      }
      openFromHash(window.location.hash)
    }

    const onPop = () => {
      if (ignoreHash.current) return
      if (!window.location.hash) {
        if (stateRef.current.step !== 'idle') exitFlow()
        return
      }
      openFromHash(window.location.hash)
    }

    window.addEventListener('hashchange', onHash)
    window.addEventListener('popstate', onPop)
    return () => {
      window.removeEventListener('hashchange', onHash)
      window.removeEventListener('popstate', onPop)
    }
  }, [exitFlow, openFromHash])

  useEffect(() => {
    if (state.step === 'idle') return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      exitFlow()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state.step, exitFlow])

  useEffect(() => {
    if (state.step === 'idle') return
    const header = document.querySelector('header')
    if (!header) return
    const onClick = (event: Event) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (target.closest('a, button')) exitFlow()
    }
    header.addEventListener('click', onClick)
    return () => header.removeEventListener('click', onClick)
  }, [state.step, exitFlow])

  const open = useCallback(() => {
    savedY.current = window.scrollY
    entryRef.current = 'button'
    trackHeroFlowStart('button')
    lockScroll()
    pushHash('#caminho')
    dispatch({ type: 'open' })
  }, [])

  const close = useCallback(() => exitFlow(), [exitFlow])
  const back = useCallback(() => dispatch({ type: 'back' }), [])
  const redo = useCallback(() => dispatch({ type: 'redo' }), [])

  const chooseProfile = useCallback((profileId: ProfileId) => {
    trackHeroFlowProfile(profileId)
    dispatch({ type: 'chooseProfile', profileId })
  }, [])

  const chooseNeedTracked = useCallback((needId: NeedId) => {
    if (stateRef.current.step !== 'need') return
    const { profileId } = stateRef.current as { step: 'need'; profileId: ProfileId }
    trackHeroFlowNeed(profileId, needId)
    dispatch({ type: 'chooseNeed', needId })
  }, [])

  return {
    state,
    open,
    close,
    back,
    redo,
    chooseProfile,
    chooseNeed: chooseNeedTracked,
    openBtnRef,
  }
}
