import { MarkRay } from '@/components/brand/MarkRay'
import { Reveal } from '@/components/sections/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { finalCta } from '@/lib/content/cta'

export function FinalCta() {
  return (
    <section
      id="cta-final"
      className="home-section home-anchor"
      data-cursor-theme="dark"
      data-cta-final=""
    >
      <MarkRay place="section" />
      <Reveal>
        <div className="mx-auto flex min-h-[100dvh] w-full max-w-page flex-col justify-start py-[8vw] pl-10 pr-4 lg:px-8 xl:max-w-page-wide">
          <div data-reveal data-cursor-avoid="">
            <SectionHeading
              index={finalCta.index}
              label={finalCta.label}
              title={finalCta.title}
            >
              {finalCta.body}
            </SectionHeading>
          </div>
          <div data-reveal>
            <WhatsAppLink source="cta-final" message={finalCta.message} className="mt-10 self-start">
              {finalCta.cta}
            </WhatsAppLink>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
