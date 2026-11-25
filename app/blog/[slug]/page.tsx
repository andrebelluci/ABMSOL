import Image from 'next/image'
import { notFound } from 'next/navigation'

import { BlogAuthorCard } from '@/components/blog/BlogAuthorCard'
import { BlogMarkdown } from '@/components/blog/BlogMarkdown'
import { BlogRelated } from '@/components/blog/BlogRelated'
import { BlogSources } from '@/components/blog/BlogSources'
import { Breadcrumbs, breadcrumbsJsonLd } from '@/components/blog/Breadcrumbs'
import {
  blogBreadcrumbs,
  blogCategoryPath,
  blogEnabled,
  blogPostPath,
  blogSubcategoryPath,
  formatBlogDate,
  getBlogPost,
  getPublishedBlogPosts,
  getRelatedBlogPosts,
  resolveBlogAuthor,
} from '@/lib/blog'
import { blogArticleJsonLd } from '@/lib/blog-schema'
import { getBlogCategory, getBlogSubcategory } from '@/lib/content/blog/categories'
import { createMetadata, SITE_URL } from '@/lib/seo'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  if (!blogEnabled()) return [{ slug: '__blog_disabled__' }]
  const posts = getPublishedBlogPosts()
  if (posts.length === 0) return [{ slug: '__blog_empty__' }]
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) {
    return createMetadata({
      title: 'Artigo | ABMSOL',
      description: 'Artigo do blog da ABMSOL.',
      path: blogPostPath(slug),
    })
  }

  return createMetadata({
    title: `${post.title} | ABMSOL`,
    description: post.description,
    path: blogPostPath(post.slug),
    ogImage: post.cover,
  })
}

export default async function BlogPostPage({ params }: PageProps) {
  if (!blogEnabled()) notFound()
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const author = resolveBlogAuthor(post)
  const category = getBlogCategory(post.category)
  const subcategory = post.subcategory
    ? getBlogSubcategory(post.category, post.subcategory)
    : undefined
  const related = getRelatedBlogPosts(post)

  const crumbItems = [
    {
      name: category?.label ?? post.category,
      path: blogCategoryPath(post.category),
    },
    ...(subcategory && post.subcategory
      ? [
          {
            name: subcategory.label,
            path: blogSubcategoryPath(post.category, post.subcategory),
          },
        ]
      : []),
    { name: post.title, path: blogPostPath(post.slug) },
  ]
  const crumbs = blogBreadcrumbs(crumbItems)

  return (
    <main className="blog-page px-4 py-16 lg:px-8" data-cursor-theme="dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbsJsonLd(crumbs, SITE_URL)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogArticleJsonLd(post)),
        }}
      />

      <article className="mx-auto w-full max-w-3xl">
        <Breadcrumbs items={crumbs} />

        <header className="mt-8">
          <p className="font-mono text-label uppercase text-mint">
            {category?.label}
            {subcategory ? ` · ${subcategory.label}` : ''}
          </p>
          <h1 className="mt-3 text-h2" data-cursor-avoid="">
            {post.title}
          </h1>
          <p className="is-muted mt-4 text-lead" data-cursor-avoid="">
            {post.description}
          </p>
          <p className="is-muted mt-4 font-mono text-label">
            {formatBlogDate(post.publishedAt)}
            {post.updatedAt ? ` · atualizado em ${formatBlogDate(post.updatedAt)}` : ''}
            {` · ${post.readingMinutes} min de leitura`}
          </p>
        </header>

        <figure className="blog-cover mt-10">
          <Image
            src={post.cover}
            alt={post.coverAlt}
            width={1200}
            height={800}
            className="blog-cover-image"
            priority
          />
        </figure>

        <div className="mt-10">
          <BlogMarkdown body={post.body} />
        </div>

        <div className="mt-12">
          <BlogSources sources={post.sources} />
        </div>

        <div className="mt-12 border-t border-line pt-10">
          <BlogAuthorCard author={author} />
        </div>

        <div className="mt-16">
          <BlogRelated posts={related} />
        </div>
      </article>
    </main>
  )
}
