import type { BlogSource } from '@/lib/blog'

export function BlogSources({ sources }: { sources: BlogSource[] }) {
  if (sources.length === 0) return null

  return (
    <section className="blog-sources" aria-labelledby="blog-sources-title">
      <h2 id="blog-sources-title" className="font-mono text-label uppercase text-mint">
        Fontes
      </h2>
      <ul className="mt-4 space-y-3">
        {sources.map((source) => (
          <li key={source.url}>
            <a
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="blog-source-link"
              data-cursor="link"
              data-cursor-label="Fonte"
              data-cursor-theme="dark"
            >
              {source.title}
              {source.date ? ` · ${source.date}` : ''}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
