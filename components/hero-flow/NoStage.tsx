'use client'

import { useMemo, useRef } from 'react'

import { NoCharacter, type NoJointProgress, type NoPose } from '@/components/hero-flow/NoCharacter'
import { NoSceneSeed } from '@/components/hero-flow/NoSceneSeed'
import { useNoPose } from '@/components/hero-flow/useNoPose'
import type { HeroFlowState } from '@/components/hero-flow/useHeroFlow'

function poseFor(state: HeroFlowState): NoPose {
  if (state.step === 'profile') return 'wave'
  if (state.step === 'need') return 'walk'
  if (state.step === 'result') return 'arrive'
  return 'idle'
}

function progressFor(state: HeroFlowState): NoJointProgress {
  if (state.step === 'result') return 'result'
  if (state.step === 'need') return 'need'
  return 'profile'
}

/**
 * Cena SVG só para “começando” (Etapa 3).
 * site-fraco / negocio-solido: mesmo Nó (pose + juntas), sem semente/trilha.
 */
function showSeedScene(state: HeroFlowState): boolean {
  if (state.step !== 'need' && state.step !== 'result') return false
  return state.profileId === 'comecando'
}

/** Palco do Nó: mesmo SVG em desktop/mobile, acima do sol dimado. */
export function NoStage({ state }: { state: HeroFlowState }) {
  const ref = useRef<HTMLDivElement>(null)
  const pose = useMemo(() => poseFor(state), [state])
  const progress = useMemo(() => progressFor(state), [state])
  const withSeed = useMemo(() => showSeedScene(state), [state])

  useNoPose(ref, pose, withSeed)

  if (state.step === 'idle') return null

  const scene =
    state.step === 'need' || state.step === 'result' ? state.profileId : 'none'

  return (
    <div
      ref={ref}
      className="no-stage"
      data-no-stage
      data-no-pose={pose}
      data-no-scene={withSeed ? 'seed' : 'none'}
      data-no-profile={scene}
    >
      {withSeed ? <NoSceneSeed /> : null}
      <NoCharacter progress={progress} />
    </div>
  )
}
