import Link from 'next/link'

import { blogPostPath, formatBlogDate, type BlogPost } from '@/lib/blog'

export function BlogRelated({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null

  return (
    <section className="blog-related" aria-labelledby="blog-related-title">
      <h2 id="blog-related-title" className="font-mono text-label uppercase text-mint">
        Continue lendo
      </h2>
      <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={blogPostPath(post.slug)}
              className="blog-related-card"
              data-cursor="link"
              data-cursor-label={post.title}
              data-cursor-theme="dark"
            >
              <span className="font-display text-lead font-semibold text-ink">
                {post.title}
              </span>
              <span className="is-muted mt-2 block text-body">{post.description}</span>
              <span className="is-muted mt-3 block font-mono text-label">
                {formatBlogDate(post.publishedAt)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
