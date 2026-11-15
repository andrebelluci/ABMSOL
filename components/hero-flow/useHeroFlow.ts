'use client'

import { useCallback, useEffect, useReducer } from 'react'

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
  | { type: 'close' }
  | { type: 'back' }
  | { type: 'chooseProfile'; profileId: ProfileId }
  | { type: 'chooseNeed'; needId: NeedId }
  | { type: 'redo' }

function reducer(state: HeroFlowState, action: Action): HeroFlowState {
  switch (action.type) {
    case 'open':
      return { step: 'profile' }
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
      if (state.step === 'profile') return { step: 'idle' }
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
  // Ao sair do fluxo, o ScrollTrigger reassume opacity/y sem ficar preso no dim.
  if (!active) {
    void import('@/lib/gsap').then(({ ScrollTrigger }) => {
      ScrollTrigger.refresh()
    })
  }
}

function clearHeroFlags() {
  const hero = document.querySelector<HTMLElement>('[data-hero]')
  if (!hero) return
  hero.removeAttribute('data-hero-flow')
  hero.removeAttribute('data-hero-flow-result')
  window.dispatchEvent(new CustomEvent('hero-flow-change', { detail: { active: false, step: 'idle' } }))
}

export function useHeroFlow() {
  const [state, dispatch] = useReducer(reducer, { step: 'idle' })

  useEffect(() => {
    syncHeroFlags(state)
  }, [state])

  useEffect(() => () => clearHeroFlags(), [])

  useEffect(() => {
    if (state.step === 'idle') return
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      event.preventDefault()
      dispatch({ type: 'back' })
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [state.step])

  const open = useCallback(() => {
    trackHeroFlowStart()
    dispatch({ type: 'open' })
  }, [])

  const close = useCallback(() => dispatch({ type: 'close' }), [])
  const back = useCallback(() => dispatch({ type: 'back' }), [])
  const redo = useCallback(() => dispatch({ type: 'redo' }), [])

  const chooseProfile = useCallback((profileId: ProfileId) => {
    trackHeroFlowProfile(profileId)
    dispatch({ type: 'chooseProfile', profileId })
  }, [])

  const chooseNeed = useCallback((needId: NeedId) => {
    dispatch({ type: 'chooseNeed', needId })
  }, [])

  // Analytics for need must fire with profileId from current state at click time.
  const chooseNeedTracked = useCallback(
    (needId: NeedId) => {
      if (state.step !== 'need') return
      trackHeroFlowNeed(state.profileId, needId)
      chooseNeed(needId)
    },
    [state, chooseNeed],
  )

  return {
    state,
    open,
    close,
    back,
    redo,
    chooseProfile,
    chooseNeed: chooseNeedTracked,
  }
}
