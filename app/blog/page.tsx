import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogPosts } from '@/lib/content'
import { BLOG_ROUTE } from '@/lib/legal'
import { SITE_FEATURES } from '@/lib/site-features'
import { createMetadata } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Blog',
  description: 'Artigos e novidades.',
  path: BLOG_ROUTE,
})

export default function BlogIndexPage() {
  if (!SITE_FEATURES.blog) notFound()

  const posts = getBlogPosts()

  return (
    <div className="mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-24">
      <h1 className="text-h2 text-ink">
        Blog
      </h1>
      <ul className="mt-10 space-y-8">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-line pb-8">
            <Link
              href={`${BLOG_ROUTE}/${post.slug}`}
              className="group block"
            >
              <h2 className="font-display text-[clamp(1.25rem,2vw,1.75rem)] font-semibold leading-tight text-ink group-hover:text-mint">
                {post.title}
              </h2>
              {post.description && (
                <p className="is-muted mt-2">{post.description}</p>
              )}
              {post.publishedAt && (
                <p className="is-muted mt-2 font-mono text-label uppercase">
                  {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                </p>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
