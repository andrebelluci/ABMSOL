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
      <h1 className="font-display text-section-title font-semibold tracking-tight text-text">
        Blog
      </h1>
      <ul className="mt-10 space-y-8">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-text/10 pb-8">
            <Link
              href={`${BLOG_ROUTE}/${post.slug}`}
              className="group block"
            >
              <h2 className="font-display text-xl font-semibold text-text group-hover:text-accent">
                {post.title}
              </h2>
              {post.description && (
                <p className="mt-2 text-text-muted">{post.description}</p>
              )}
              {post.publishedAt && (
                <p className="mt-2 text-xs uppercase tracking-widest text-text-muted">
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
