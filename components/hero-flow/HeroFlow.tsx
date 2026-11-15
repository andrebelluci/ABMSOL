'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { HeroFlowOptions } from '@/components/hero-flow/HeroFlowOptions'
import { HeroFlowResult } from '@/components/hero-flow/HeroFlowResult'
import { NoStage } from '@/components/hero-flow/NoStage'
import { useHeroFlow } from '@/components/hero-flow/useHeroFlow'
import {
  heroFlowUi,
  needs,
  profiles,
  type NeedId,
  type ProfileId,
} from '@/lib/content/hero-flow/steps'

function stepTitle(state: ReturnType<typeof useHeroFlow>['state']) {
  if (state.step === 'profile') return heroFlowUi.stepProfile
  if (state.step === 'need') return heroFlowUi.stepNeed
  return null
}

/**
 * Painel + palco sobem via portal para [data-hero], irmãos do sol —
 * nunca descendentes de .hero-copy (GSAP aplica opacity no scroll).
 */
export function HeroFlow() {
  const { state, open, close, back, redo, chooseProfile, chooseNeed } = useHeroFlow()
  const layoutRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const [heroHost, setHeroHost] = useState<HTMLElement | null>(null)

  useEffect(() => {
    setHeroHost(document.querySelector<HTMLElement>('[data-hero]'))
  }, [])

  useEffect(() => {
    if (state.step === 'idle') return
    const hero = heroHost
    if (!hero) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // Alinha o hero abaixo do header (scroll-margin), mantendo o H1 na vista.
    hero.scrollIntoView({ block: 'start', behavior: reduced ? 'auto' : 'smooth' })

    // Shell começa logo abaixo do H1 (evita o display cruzar cartões/Nó).
    const placeShell = () => {
      const shell = document.querySelector<HTMLElement>('[data-hero-flow-shell]')
      const h1 = hero.querySelector<HTMLElement>('.hero-title')
      if (!shell || !h1) return
      const gap = window.matchMedia('(min-width: 1280px)').matches ? 20 : 12
      const top = h1.getBoundingClientRect().bottom - hero.getBoundingClientRect().top + gap
      shell.style.paddingTop = `${Math.max(0, Math.round(top))}px`
    }
    placeShell()
    const raf = requestAnimationFrame(placeShell)
    const h1 = hero.querySelector('.hero-title')
    const ro = h1 ? new ResizeObserver(placeShell) : null
    if (h1 && ro) ro.observe(h1)
    window.addEventListener('resize', placeShell)
    titleRef.current?.focus()
    return () => {
      cancelAnimationFrame(raf)
      ro?.disconnect()
      window.removeEventListener('resize', placeShell)
    }
  }, [state.step, heroHost])

  const title = stepTitle(state)
  const active = state.step !== 'idle'

  const panel = active ? (
    <div className="hero-flow-shell" data-hero-flow-shell="">
      {/* Scrim: azul da página → transparente; não cobre o sol à direita. */}
      <div className="hero-flow-scrim" aria-hidden="true" />
      <div
        ref={layoutRef}
        className="hero-flow-layout"
        role="region"
        aria-labelledby="hero-flow-title"
      >
        <div className="hero-flow-panel">
          {title ? (
            <header>
              <p className="font-mono text-label uppercase text-mint">{title.index}</p>
              <h2
                id="hero-flow-title"
                ref={titleRef}
                tabIndex={-1}
                className="mt-2 font-display text-lead font-semibold text-ink outline-none"
                aria-live="polite"
              >
                {title.title}
              </h2>
            </header>
          ) : null}

          {state.step === 'profile' ? (
            <>
              <HeroFlowOptions
                options={profiles}
                onChoose={(id) => chooseProfile(id as ProfileId)}
              />
              <div className="mt-6">
                <button type="button" className="hero-flow-text-btn" onClick={close}>
                  {heroFlowUi.closeLabel}
                </button>
              </div>
            </>
          ) : null}

          {state.step === 'need' ? (
            <>
              <HeroFlowOptions
                options={needs}
                onChoose={(id) => chooseNeed(id as NeedId)}
              />
              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                <button type="button" className="hero-flow-text-btn" onClick={back}>
                  {heroFlowUi.backLabel}
                </button>
                <button type="button" className="hero-flow-text-btn" onClick={close}>
                  {heroFlowUi.closeLabel}
                </button>
              </div>
            </>
          ) : null}

          {state.step === 'result' ? (
            <>
              <h2
                id="hero-flow-title"
                ref={titleRef}
                tabIndex={-1}
                className="sr-only outline-none"
                aria-live="polite"
              >
                {heroFlowUi.resultEyebrow}
              </h2>
              <HeroFlowResult
                profileId={state.profileId}
                needId={state.needId}
                onBack={back}
                onRedo={redo}
                onClose={close}
              />
            </>
          ) : null}
        </div>

        <NoStage state={state} />
      </div>
    </div>
  ) : null

  return (
    <>
      {state.step === 'idle' ? (
        <button
          type="button"
          className="inline-flex min-h-12 items-center text-mint"
          data-cursor="link"
          data-cursor-label={heroFlowUi.openLabel}
          data-cursor-theme="dark"
          onClick={open}
        >
          {heroFlowUi.openLabel}
        </button>
      ) : null}

      {panel && heroHost ? createPortal(panel, heroHost) : null}
    </>
  )
}
