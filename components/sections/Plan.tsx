import { Reveal } from '@/components/sections/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { planSection } from '@/lib/content/plan'

export function Plan() {
  return (
    <section id="plano" className="home-section home-anchor" data-cursor-theme="dark">
      <Reveal>
        <div
          className="mx-auto flex min-h-[100dvh] w-full max-w-page flex-col justify-start py-[8vw] pl-10 pr-4 lg:px-8 xl:max-w-page-wide"
          data-reveal
        >
          <div data-cursor-avoid="">
            <SectionHeading
              index={planSection.index}
              label={planSection.label}
              title={planSection.title}
            >
              {planSection.lead}
            </SectionHeading>
          </div>
          <ul className="plan-list">
            {planSection.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <WhatsAppLink
            source="plano"
            message={planSection.message}
            service="plano"
            variant="text"
            className="mt-10 self-start"
          >
            {planSection.cta}
          </WhatsAppLink>
        </div>
      </Reveal>
    </section>
  )
}
