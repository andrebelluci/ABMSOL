import Image from 'next/image'
import Link from 'next/link'

import {
  blogPostPath,
  formatBlogDate,
  type BlogPost,
} from '@/lib/blog'
import { getBlogCategory, getBlogSubcategory } from '@/lib/content/blog/categories'

export function BlogPostCard({ post }: { post: BlogPost }) {
  const category = getBlogCategory(post.category)
  const subcategory = post.subcategory
    ? getBlogSubcategory(post.category, post.subcategory)
    : undefined

  return (
    <article className="blog-card">
      <Link
        href={blogPostPath(post.slug)}
        className="blog-card-media"
        data-cursor="link"
        data-cursor-label={post.title}
        data-cursor-theme="dark"
      >
        <Image
          src={post.cover}
          alt={post.coverAlt}
          width={720}
          height={480}
          className="blog-card-image"
        />
      </Link>
      <div className="blog-card-copy">
        <p className="font-mono text-label uppercase text-mint">
          {category?.label}
          {subcategory ? ` · ${subcategory.label}` : ''}
        </p>
        <h2 className="mt-3 font-display text-lead font-semibold text-ink">
          <Link
            href={blogPostPath(post.slug)}
            data-cursor="link"
            data-cursor-label={post.title}
            data-cursor-theme="dark"
          >
            {post.title}
          </Link>
        </h2>
        <p className="is-muted mt-3 text-body" data-cursor-avoid="">
          {post.description}
        </p>
        <p className="is-muted mt-4 font-mono text-label">
          {formatBlogDate(post.publishedAt)} · {post.readingMinutes} min
        </p>
      </div>
    </article>
  )
}
