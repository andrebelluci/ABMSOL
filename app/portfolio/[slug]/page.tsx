import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { conceptLabel, concepts, getConcept } from '@/lib/content/concepts'
import { createMetadata } from '@/lib/seo'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return concepts.map((concept) => ({ slug: concept.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const concept = getConcept(slug)
  if (!concept) return {}

  return {
    ...createMetadata({
      title: concept.seoTitle,
      description: concept.seoDescription,
      path: `/portfolio/${concept.slug}/`,
      ogImage: '/images/og-image.webp',
    }),
  }
}

export default async function ConceptPage({ params }: PageProps) {
  const { slug } = await params
  const concept = getConcept(slug)
  if (!concept) notFound()

  return (
    <main className="px-4 py-16 lg:px-8" data-cursor-theme="dark">
      <article
        className="mx-auto w-full max-w-page xl:max-w-page-wide"
        data-cursor="card"
        data-cursor-label={concept.name}
        data-cursor-theme="dark"
      >
        <p className="font-mono text-label uppercase text-mint">{conceptLabel}</p>
        <p className="is-muted mt-4 font-mono text-label uppercase">
          {concept.index} {concept.kind}
        </p>
        <h1 className="mt-3 max-w-3xl text-h2">{concept.name}</h1>
        <p className="is-muted mt-6 max-w-2xl text-lead" data-cursor-avoid="">
          {concept.challenge}
        </p>
        <p className="is-muted mt-6 max-w-2xl text-body" data-cursor-avoid="">
          Esta peça mostra um caminho de design. Não houve cliente, depoimento nem número de resultado.
        </p>
        <Link
          href="/#projetos"
          className="mt-10 inline-flex min-h-12 items-center text-mint"
          data-cursor="link"
          data-cursor-label="Projetos"
          data-cursor-theme="dark"
        >
          Voltar aos conceitos
        </Link>
      </article>
    </main>
  )
}
