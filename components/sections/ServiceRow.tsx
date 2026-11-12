import { MarkRay } from '@/components/brand/MarkRay'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { services } from '@/lib/content/services'
import { cn } from '@/lib/utils'

type Service = (typeof services)[number]

function ServiceMark({ id }: { id: Service['id'] }) {
  const common = {
    viewBox: '0 0 64 64',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    'aria-hidden': true as const,
    className: 'service-mark',
  }
  if (id === 'suporte') {
    return (
      <svg {...common}>
        <circle cx="32" cy="32" r="4" />
        <path d="M32 8v12M32 44v12M8 32h12M44 32h12" />
      </svg>
    )
  }
  if (id === 'plano') {
    return (
      <svg {...common}>
        <circle cx="32" cy="32" r="16" />
        <circle cx="32" cy="32" r="3" />
      </svg>
    )
  }
  return (
    <svg {...common}>
      <circle cx="14" cy="44" r="3" />
      <circle cx="32" cy="18" r="3" />
      <circle cx="50" cy="40" r="3" />
      <path d="M16 42 30 20M34 20l14 18" />
    </svg>
  )
}

export function ServiceRow({ service }: { service: Service }) {
  return (
    <article
      className={cn('service-row', service.align === 'end' && 'service-row-end')}
    >
      <MarkRay place={service.align === 'end' ? 'start' : 'end'} />
      <p className="service-index" aria-hidden="true" data-reveal>
        {service.index}
      </p>
      <div className="service-copy" data-reveal>
        <ServiceMark id={service.id} />
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
