import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { services } from '@/lib/content/services'
import { cn } from '@/lib/utils'

type Service = (typeof services)[number]

export function ServiceRow({ service }: { service: Service }) {
  return (
    <article
      className={cn('service-row', service.align === 'end' && 'service-row-end')}
    >
      <p className="service-index" aria-hidden="true" data-reveal>
        {service.index}
      </p>
      <div className="service-copy" data-reveal>
        <h3 className="service-title text-h2">{service.title}</h3>
        <p className="is-muted mt-4 max-w-md text-body" data-cursor-avoid="">
          {service.body}
        </p>
        {'href' in service ? (
          <a
            href={service.href}
            className="mt-8 inline-flex min-h-12 items-center text-mint"
            data-cursor="link"
            data-cursor-label={service.cta}
            data-cursor-theme="dark"
          >
            {service.cta}
          </a>
        ) : (
          <WhatsAppLink
            source="servicos"
            message={service.message}
            service={service.service}
            className="mt-8"
          >
            {service.cta}
          </WhatsAppLink>
        )}
      </div>
    </article>
  )
}
