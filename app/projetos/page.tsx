import { ConceptCard } from '@/components/pages/ConceptCard'
import { concepts, conceptsSection } from '@/lib/content/concepts'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Projetos conceito do estúdio | ABMSOL',
  description:
    'Três projetos conceito: site premium, site institucional e sistema. Nenhum é cliente real e nenhum traz resultado inventado.',
  path: '/projetos/',
  ogImage: '/images/og-image.webp',
})

export default function ProjetosPage() {
  return (
    <main className="px-4 py-16 lg:px-8" data-cursor-theme="dark">
      <div className="mx-auto w-full max-w-page xl:max-w-page-wide">
        <p className="font-mono text-label uppercase text-mint">Projetos</p>
        <h1 className="mt-3 max-w-3xl text-h2">{conceptsSection.title}</h1>
        <p className="is-muted mt-4 max-w-2xl text-lead" data-cursor-avoid="">
          {conceptsSection.lead}
        </p>
        <p className="mt-6 font-mono text-label uppercase text-mint">
          {concepts.length} projetos conceito
        </p>
        <div className="mt-12 flex flex-col gap-16">
          {concepts.map((concept) => (
            <ConceptCard key={concept.slug} concept={concept} />
          ))}
        </div>
      </div>
    </main>
  )
}
