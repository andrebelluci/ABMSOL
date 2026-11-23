import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { serviceDetails, servicesPage } from '@/lib/content/services-page'
import {
  visibilityFacts,
  visibilityLevers,
} from '@/lib/content/visibility'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Aparecer no Google e nas IAs | Serviços ABMSOL',
  description:
    'Site, presença no Google (SEO e Meu Negócio) e nas IAs, sistemas, suporte, plano mensal e ajuda básica no Instagram. Rio Preto e online no Brasil.',
  path: '/servicos/',
  ogImage: '/images/og-image.webp',
})

export default function ServicosPage() {
  return (
    <main className="px-4 py-16 lg:px-8" data-cursor-theme="dark">
      <div className="mx-auto w-full max-w-page xl:max-w-page-wide">
        <p className="font-mono text-label uppercase text-mint">{servicesPage.label}</p>
        <h1 className="mt-3 max-w-3xl text-h2" data-cursor-avoid="">
          {servicesPage.title}
        </h1>
        <p className="is-muted mt-4 max-w-2xl text-lead" data-cursor-avoid="">
          {servicesPage.lead}
        </p>

        <section className="mt-16 border-t border-line pt-12" aria-labelledby="tese-title">
          <p className="font-mono text-label uppercase text-mint">Presença</p>
          <h2 id="tese-title" className="mt-3 max-w-3xl text-h2">
            {servicesPage.thesisTitle}
          </h2>
          <p className="is-muted mt-4 max-w-2xl text-lead" data-cursor-avoid="">
            {servicesPage.thesisLead}
          </p>

          <ul className="visibility-facts mt-10">
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

          <div className="visibility-levers mt-14">
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

          <div className="mt-10">
            <WhatsAppLink source="servicos-presenca" message={servicesPage.message}>
              {servicesPage.cta}
            </WhatsAppLink>
          </div>
        </section>

        <section className="mt-20 border-t border-line pt-12" aria-labelledby="oferta-title">
          <p className="font-mono text-label uppercase text-mint">Oferta</p>
          <h2 id="oferta-title" className="mt-3 max-w-3xl text-h2">
            {servicesPage.offerTitle}
          </h2>
          <p className="is-muted mt-4 max-w-2xl text-lead" data-cursor-avoid="">
            {servicesPage.offerLead}
          </p>

          <div className="mt-12 flex flex-col gap-16">
            {serviceDetails.map((service) => (
              <article key={service.id} className="service-page-row max-w-2xl">
                <p className="font-mono text-label uppercase text-mint">{service.index}</p>
                <h3 className="mt-3 text-h2">{service.title}</h3>
                <p className="is-muted mt-4 text-body" data-cursor-avoid="">
                  {service.body}
                </p>
                <WhatsAppLink
                  source="servicos"
                  message={service.message}
                  service={service.id}
                  variant="text"
                  className="mt-6"
                >
                  {service.cta}
                </WhatsAppLink>
              </article>
            ))}
          </div>
        </section>

        <article className="mt-20 max-w-2xl border-t border-line pt-12">
          <h2 className="text-h2">{servicesPage.localTitle}</h2>
          <p className="is-muted mt-4 text-body" data-cursor-avoid="">
            {servicesPage.localBody}
          </p>
        </article>
      </div>
    </main>
  )
}
