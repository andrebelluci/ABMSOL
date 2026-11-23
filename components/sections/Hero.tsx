import { MarkRay } from '@/components/brand/MarkRay'
import { HeroFlowMount } from '@/components/hero-flow/HeroFlowMount'
import { SunEnhance } from '@/components/sun/SunEnhance'
import { SunFigure } from '@/components/sun/SunFigure'
import { PageTrail } from '@/components/sun/PageTrail'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { WHATSAPP_MESSAGES } from '@/lib/whatsapp'

export function Hero() {
  return (
    <section
      id="hero"
      data-hero=""
      className="hero"
      data-cursor-theme="dark"
    >
      <SunFigure />
      <MarkRay place="hero" />
      <div className="hero-copy">
        <p className="hero-line font-mono text-label uppercase text-mint">
          01 · Presença digital · Rio Preto (SP)
        </p>
        <h1 className="hero-title mt-4 font-display text-display text-ink" data-cursor-avoid="">
          Sua empresa some no Google e nas IAs?
        </h1>
        <p className="hero-line hero-line-lead mt-4 max-w-[34ch] text-lead text-ink" data-cursor-avoid="">
          Se a busca e o ChatGPT não te citam, o cliente também não te acha.
        </p>
        <p className="hero-line hero-line-body mt-3 max-w-[38ch] text-body text-ink-muted">
          Site, conteúdo e presença para você aparecer onde a pessoa pergunta, no Brasil e nas ferramentas que ela já usa.
        </p>
        <div className="hero-line hero-line-cta mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <div className="hero-cta-whatsapp">
            <WhatsAppLink source="hero" message={WHATSAPP_MESSAGES.presenca}>
              Falar no WhatsApp
            </WhatsAppLink>
          </div>
          <HeroFlowMount />
        </div>
      </div>
      <PageTrail />
      <SunEnhance />
    </section>
  )
}
