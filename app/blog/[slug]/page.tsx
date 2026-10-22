import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { getBlogPost, getBlogSlugs } from '@/lib/content'
import { BLOG_ROUTE } from '@/lib/legal'
import { SITE_FEATURES } from '@/lib/site-features'
import { createMetadata } from '@/lib/seo'

/** Slug interno para satisfazer `output: export` quando blog está desligado. */
const BLOG_DISABLED_SLUG = '__blog_disabled__'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  if (!SITE_FEATURES.blog) {
    return [{ slug: BLOG_DISABLED_SLUG }]
  }
  return getBlogSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  if (!SITE_FEATURES.blog || params.slug === BLOG_DISABLED_SLUG) return {}
  const post = getBlogPost(params.slug)
  if (!post) return {}
  return createMetadata({
    title: post.title,
    description: post.description ?? post.title,
    path: `${BLOG_ROUTE}/${post.slug}`,
  })
}

export default async function BlogPostPage(props: PageProps) {
  const params = await props.params;
  if (!SITE_FEATURES.blog || params.slug === BLOG_DISABLED_SLUG) notFound()

  const post = getBlogPost(params.slug)
  if (!post) notFound()

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-24">
      <header className="mb-10 border-b border-text/10 pb-8">
        <p className="text-xs uppercase tracking-widest text-text-muted">
          Blog
        </p>
        <h1 className="mt-3 font-display text-section-title font-semibold tracking-tight text-text">
          {post.title}
        </h1>
        {post.publishedAt && (
          <p className="mt-4 text-sm text-text-muted">
            {new Date(post.publishedAt).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        )}
      </header>
      <div className="prose-legal space-y-4 text-base leading-relaxed text-text">
        <ReactMarkdown>{post.body}</ReactMarkdown>
      </div>
      <p className="mt-12 text-sm text-text-muted">
        <Link href={BLOG_ROUTE} className="underline-offset-4 hover:underline">
          ← Todos os posts
        </Link>
      </p>
    </article>
  )
}
