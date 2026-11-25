'use client'

import { useMemo, useRef } from 'react'

import { NoCharacter, type NoJointProgress, type NoPose } from '@/components/hero-flow/NoCharacter'
import { NoSceneSeed } from '@/components/hero-flow/NoSceneSeed'
import { NoSceneShop } from '@/components/hero-flow/NoSceneShop'
import { NoSceneWindow } from '@/components/hero-flow/NoSceneWindow'
import { useNoPose } from '@/components/hero-flow/useNoPose'
import type { HeroFlowState } from '@/components/hero-flow/useHeroFlow'

export type NoSceneId = 'seed' | 'window' | 'shop' | 'none'

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
 * Cena SVG por perfil nos passos need/result (Etapa 4).
 * seed = comecando · window = site-fraco · shop = negocio-solido.
 */
function sceneFor(state: HeroFlowState): NoSceneId {
  if (state.step !== 'need' && state.step !== 'result') return 'none'
  if (state.profileId === 'comecando') return 'seed'
  if (state.profileId === 'site-fraco') return 'window'
  if (state.profileId === 'negocio-solido') return 'shop'
  return 'none'
}

/** Palco do Nó: mesmo SVG em desktop/mobile, acima do sol dimado. */
export function NoStage({ state }: { state: HeroFlowState }) {
  const ref = useRef<HTMLDivElement>(null)
  const pose = useMemo(() => poseFor(state), [state])
  const progress = useMemo(() => progressFor(state), [state])
  const scene = useMemo(() => sceneFor(state), [state])

  useNoPose(ref, pose, scene)

  if (state.step === 'idle') return null

  const profile =
    state.step === 'need' || state.step === 'result' ? state.profileId : 'none'

  return (
    <div
      ref={ref}
      className="no-stage"
      data-no-stage
      data-no-pose={pose}
      data-no-scene={scene}
      data-no-profile={profile}
    >
      {scene === 'seed' ? <NoSceneSeed /> : null}
      {scene === 'window' ? <NoSceneWindow /> : null}
      {scene === 'shop' ? <NoSceneShop /> : null}
      <NoCharacter progress={progress} />
    </div>
  )
}
