import { Reveal } from '@/components/sections/Reveal'
import { ServiceRow } from '@/components/sections/ServiceRow'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { services, servicesSection } from '@/lib/content/services'

export function Services() {
  return (
    <section
      id="servicos"
      className="home-section home-anchor"
      data-cursor-theme="dark"
    >
      <Reveal>
        <div className="mx-auto w-full max-w-page py-[8vw] pl-10 pr-4 lg:px-8 xl:max-w-page-wide">
          <div data-reveal data-cursor-avoid="">
            <SectionHeading
              index={servicesSection.index}
              label={servicesSection.label}
              title={servicesSection.title}
            >
              {servicesSection.lead}
            </SectionHeading>
          </div>
          {services.map((service) => (
            <ServiceRow key={service.id} service={service} />
          ))}
          <div data-reveal>
            <a
              href="/servicos/"
              className="mt-10 inline-flex min-h-12 items-center text-mint"
              data-cursor="link"
              data-cursor-label="Serviços"
              data-cursor-theme="dark"
            >
              Abrir a página de serviços
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
