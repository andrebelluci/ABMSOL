import { ConceptCard } from '@/components/pages/ConceptCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { concepts, conceptsSection } from '@/lib/content/concepts'

export function Concepts() {
  return (
    <section id="projetos" className="home-section home-anchor" data-cursor-theme="dark">
      <div className="mx-auto w-full max-w-page py-[8vw] pl-10 pr-4 lg:px-8 xl:max-w-page-wide">
        <div data-cursor-avoid="">
          <SectionHeading
            index={conceptsSection.index}
            label={conceptsSection.label}
            title={conceptsSection.title}
          >
            {conceptsSection.lead}
          </SectionHeading>
        </div>
        <div className="mt-12 flex flex-col gap-16">
          {concepts.map((concept) => (
            <ConceptCard key={concept.slug} concept={concept} />
          ))}
        </div>
      </div>
    </section>
  )
}
