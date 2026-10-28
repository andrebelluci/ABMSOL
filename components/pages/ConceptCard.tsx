import Link from 'next/link'
import { conceptLabel, type Concept } from '@/lib/content/concepts'

export function ConceptCard({ concept }: { concept: Concept }) {
  return (
    <article
      className="concept-row"
      data-cursor="card"
      data-cursor-label="Ver o conceito"
      data-cursor-theme="dark"
    >
      <p className="font-mono text-label uppercase text-mint">{conceptLabel}</p>
      <p className="is-muted mt-3 font-mono text-label uppercase">
        {concept.index} {concept.kind}
      </p>
      <h3 className="mt-3 text-h2">{concept.name}</h3>
      <p className="is-muted mt-4 max-w-xl text-body" data-cursor-avoid="">
        {concept.challenge}
      </p>
      <Link
        href={`/portfolio/${concept.slug}/`}
        className="mt-6 inline-flex min-h-12 items-center text-mint"
        data-cursor="link"
        data-cursor-label="Ver o conceito"
        data-cursor-theme="dark"
      >
        Ver o conceito
      </Link>
    </article>
  )
}
