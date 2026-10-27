import Link from 'next/link'
import type { MarkdownDocument } from '@/lib/content'

type LegalPageLayoutProps = {
  document: MarkdownDocument
  children: React.ReactNode
}

export function LegalPageLayout({ document, children }: LegalPageLayoutProps) {
  const dateLabel = document.updatedAt ?? document.publishedAt

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-24">
      <header className="mb-10 border-b border-line pb-8">
        <h1 className="text-h2 text-ink">
          {document.title}
        </h1>
        {document.description && (
          <p className="is-muted mt-3 text-lead">{document.description}</p>
        )}
        {dateLabel && (
          <p className="is-muted mt-4 text-sm">
            Atualizado em{' '}
            {new Date(dateLabel).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        )}
      </header>
      <div className="prose-legal space-y-4 text-body leading-relaxed text-ink">
        {children}
      </div>
      <p className="is-muted mt-12 text-sm">
        <Link href="/" className="underline-offset-4 hover:underline">
          Voltar ao início
        </Link>
      </p>
    </article>
  )
}
