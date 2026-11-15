'use client'

import dynamic from 'next/dynamic'

const HeroFlow = dynamic(
  () => import('@/components/hero-flow/HeroFlow').then((mod) => mod.HeroFlow),
  {
    ssr: false,
    loading: () => (
      <span className="inline-flex min-h-12 items-center text-mint opacity-70">
        Descobrir meu caminho →
      </span>
    ),
  },
)

/** Carrega o fluxo depois do paint; o H1 e o WhatsApp genérico ficam fora deste chunk. */
export function HeroFlowMount() {
  return <HeroFlow />
}
