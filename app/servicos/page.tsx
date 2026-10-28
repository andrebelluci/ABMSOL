import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { serviceDetails, servicesPage } from '@/lib/content/services-page'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
    title: 'Sites, sistemas e suporte de TI em Rio Preto | ABMSOL',
    description:
      'Sites e sistemas, suporte de TI e plano mensal. Atendimento em Rio Preto (SP) e online em todo o Brasil. A proposta sai na conversa, sem preço no site.',
    path: '/servicos/',
    ogImage: '/images/og-image.webp',
  })

export default function ServicosPage() {
  return (
    <main className="px-4 py-16 lg:px-8" data-cursor-theme="dark">
      <div className="mx-auto w-full max-w-page xl:max-w-page-wide">
        <p className="font-mono text-label uppercase text-mint">Serviços</p>
        <h1 className="mt-3 max-w-3xl text-h2" data-cursor-avoid="">
          {servicesPage.title}
        </h1>
        <p className="is-muted mt-4 max-w-2xl text-lead" data-cursor-avoid="">
          {servicesPage.lead}
        </p>
        <div className="mt-16 flex flex-col gap-20">
          {serviceDetails.map((service) => (
            <article key={service.id} className="max-w-2xl">
              <p className="font-mono text-label uppercase text-mint">{service.index}</p>
              <h2 className="mt-3 text-h2">{service.title}</h2>
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
