'use client'

import dynamic from 'next/dynamic'

import { heroFlowUi } from '@/lib/content/hero-flow/steps'

const HeroFlow = dynamic(
  () => import('@/components/hero-flow/HeroFlow').then((mod) => mod.HeroFlow),
  {
    ssr: false,
    loading: () => (
      <button
        type="button"
        className="hero-flow-open-btn"
        disabled
        aria-hidden="true"
        tabIndex={-1}
      >
        {heroFlowUi.openLabel}
      </button>
    ),
  },
)

/** Carrega o fluxo depois do paint; o H1 e o WhatsApp genérico ficam fora deste chunk. */
export function HeroFlowMount() {
  return <HeroFlow />
}
