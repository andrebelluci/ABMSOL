import { MarkRay } from '@/components/brand/MarkRay'
import { Reveal } from '@/components/sections/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import {
  visibilityFacts,
  visibilityLevers,
  visibilitySection,
} from '@/lib/content/visibility'

export function Visibility() {
  return (
    <section
      id="visibilidade"
      className="home-section home-anchor"
      data-cursor-theme="dark"
    >
      <MarkRay place="section" />
      <Reveal>
        <div className="mx-auto w-full max-w-page py-[8vw] pl-10 pr-4 lg:px-8 xl:max-w-page-wide">
          <div data-reveal data-cursor-avoid="">
            <SectionHeading
              index={visibilitySection.index}
              label={visibilitySection.label}
              title={visibilitySection.title}
            >
              {visibilitySection.lead}
            </SectionHeading>
          </div>

          <ul className="visibility-facts mt-12" data-reveal>
            {visibilityFacts.map((fact) => (
              <li key={fact.id} className="visibility-fact">
                <p className="visibility-fact-value" aria-hidden>
                  {fact.value}
                </p>
                <div className="visibility-fact-copy">
                  <p className="text-body text-ink" data-cursor-avoid="">
                    <span className="sr-only">{fact.value} </span>
                    {fact.label}
                  </p>
                  <a
                    href={fact.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="visibility-fact-source"
                    data-cursor="link"
                    data-cursor-label="Fonte"
                    data-cursor-theme="dark"
                  >
                    Fonte: {fact.source}
                  </a>
                </div>
              </li>
            ))}
          </ul>

          <div className="visibility-levers mt-16" data-reveal>
            <p className="font-mono text-label uppercase text-mint">
              O que dá para melhorar
            </p>
            <ul className="mt-6 grid gap-6 sm:grid-cols-2">
              {visibilityLevers.map((lever) => (
                <li key={lever.id} className="visibility-lever">
                  <h3 className="font-display text-lead font-semibold text-ink">
                    {lever.title}
                  </h3>
                  <p className="is-muted mt-2 text-body" data-cursor-avoid="">
                    {lever.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
            <WhatsAppLink source="visibilidade" message={visibilitySection.message}>
              {visibilitySection.cta}
            </WhatsAppLink>
            <a
              href="/servicos/"
              className="inline-flex min-h-12 items-center text-mint"
              data-cursor="link"
              data-cursor-label="Serviços"
              data-cursor-theme="dark"
            >
              Ver serviços e a tese completa
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
