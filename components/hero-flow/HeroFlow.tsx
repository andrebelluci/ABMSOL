'use client'

import { useEffect, useRef, useSyncExternalStore } from 'react'
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

function useHeroHost() {
  return useSyncExternalStore(
    () => () => undefined,
    () => document.querySelector<HTMLElement>('[data-hero]'),
    () => null,
  )
}

/**
 * Painel + palco em portal fixed (modo foco). placeShell usa h1.bottom - shell.top.
 */
export function HeroFlow() {
  const { state, open, close, back, redo, chooseProfile, chooseNeed, openBtnRef } = useHeroFlow()
  const titleRef = useRef<HTMLHeadingElement>(null)
  const heroHost = useHeroHost()

  useEffect(() => {
    if (state.step === 'idle') return
    const placeShell = () => {
      const shell = document.querySelector<HTMLElement>('[data-hero-flow-shell]')
      if (!shell) return
      // Mobile: H1 some (opacity 0); shell começa no topo sem medir o H1.
      if (window.matchMedia('(max-width: 1279px)').matches) {
        shell.style.paddingTop = '0'
        return
      }
      const h1 = document.querySelector<HTMLElement>('.hero-title')
      if (!h1) return
      const gap = 16
      // H1 em coords de documento (+ scrollY): independente do scroll no momento do cálculo.
      const top =
        h1.getBoundingClientRect().bottom +
        window.scrollY -
        shell.getBoundingClientRect().top +
        gap
      shell.style.paddingTop = `${Math.max(0, Math.round(top))}px`
    }
    placeShell()
    const raf = requestAnimationFrame(placeShell)
    const h1 = document.querySelector('.hero-title')
    const ro = h1 ? new ResizeObserver(placeShell) : null
    if (h1 && ro) ro.observe(h1)
    window.addEventListener('resize', placeShell)
    window.addEventListener('hero-flow-change', placeShell)
    void document.fonts.ready.then(placeShell)
    titleRef.current?.focus()
    return () => {
      cancelAnimationFrame(raf)
      ro?.disconnect()
      window.removeEventListener('resize', placeShell)
      window.removeEventListener('hero-flow-change', placeShell)
    }
  }, [state.step])

  const title = stepTitle(state)
  const active = state.step !== 'idle'

  const panel = active ? (
    <div className="hero-flow-shell" data-hero-flow-shell="">
      <div className="hero-flow-bar">
        <button
          type="button"
          className="hero-flow-exit"
          onClick={close}
          data-cursor="link"
          data-cursor-label={heroFlowUi.closeLabel}
          data-cursor-theme="dark"
        >
          {heroFlowUi.closeLabel}
        </button>
      </div>
      <div className="hero-flow-scrim" aria-hidden="true" />
      <div className="hero-flow-layout" role="region" aria-labelledby="hero-flow-title">
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
            <HeroFlowOptions
              options={profiles}
              onChoose={(id) => chooseProfile(id as ProfileId)}
            />
          ) : null}

          {state.step === 'need' ? (
            <>
              <HeroFlowOptions
                options={needs}
                grid
                onChoose={(id) => chooseNeed(id as NeedId)}
              />
              <div className="mt-6">
                <button type="button" className="hero-flow-text-btn" onClick={back}>
                  {heroFlowUi.backLabel}
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
          ref={openBtnRef}
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
