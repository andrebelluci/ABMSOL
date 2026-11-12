import { MarkRay } from '@/components/brand/MarkRay'
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
          01 — Estúdio de tecnologia · Rio Preto (SP)
        </p>
        <h1 className="hero-title mt-4 font-display text-display text-ink" data-cursor-avoid="">
          Tecnologia que funciona.
        </h1>
        <p className="hero-line hero-line-lead mt-4 max-w-[28ch] text-lead text-ink" data-cursor-avoid="">
          Do suporte do dia a dia ao site premium.
        </p>
        <p className="hero-line hero-line-body mt-3 max-w-[34ch] text-body text-ink-muted">
          Site, sistema e suporte com um parceiro só.
        </p>
        <div className="hero-line hero-line-cta mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <WhatsAppLink source="hero" message={WHATSAPP_MESSAGES.site}>
            Falar no WhatsApp
          </WhatsAppLink>
          <a
            href="#como-trabalhamos"
            className="inline-flex min-h-12 items-center text-mint"
            data-cursor="link"
            data-cursor-label="Como trabalhamos"
            data-cursor-theme="dark"
          >
            Como trabalhamos →
          </a>
        </div>
      </div>
      <PageTrail />
      <SunEnhance />
    </section>
  )
}
