import { notFound } from 'next/navigation'

import { BlogCategoryNav } from '@/components/blog/BlogCategoryNav'
import { Breadcrumbs, breadcrumbsJsonLd } from '@/components/blog/Breadcrumbs'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import {
  blogBreadcrumbs,
  blogCategoryPath,
  blogEnabled,
  getBlogPostsByCategory,
} from '@/lib/blog'
import { blogCategories, getBlogCategory } from '@/lib/content/blog/categories'
import { createMetadata, SITE_URL } from '@/lib/seo'

type PageProps = {
  params: Promise<{ category: string }>
}

export function generateStaticParams() {
  if (!blogEnabled()) return [{ category: '__disabled__' }]
  return blogCategories.map((category) => ({ category: category.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { category: categorySlug } = await params
  const category = getBlogCategory(categorySlug)
  return createMetadata({
    title: `${category?.label ?? 'Categoria'} | Blog ABMSOL`,
    description: category?.description ?? 'Artigos do blog da ABMSOL.',
    path: blogCategoryPath(categorySlug),
  })
}

export default async function BlogCategoryPage({ params }: PageProps) {
  if (!blogEnabled()) notFound()
  const { category: categorySlug } = await params
  const category = getBlogCategory(categorySlug)
  if (!category) notFound()

  const posts = getBlogPostsByCategory(category.slug)
  const crumbs = blogBreadcrumbs([
    { name: category.label, path: blogCategoryPath(category.slug) },
  ])

  return (
    <main className="blog-page px-4 py-16 lg:px-8" data-cursor-theme="dark">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbsJsonLd(crumbs, SITE_URL)),
        }}
      />
      <div className="mx-auto w-full max-w-page xl:max-w-page-wide">
        <Breadcrumbs items={crumbs} />
        <p className="mt-8 font-mono text-label uppercase text-mint">Categoria</p>
        <h1 className="mt-3 max-w-3xl text-h2">{category.label}</h1>
        <p className="is-muted mt-4 max-w-2xl text-lead" data-cursor-avoid="">
          {category.description}
        </p>

        <div className="blog-layout mt-12">
          <div className="blog-layout-main">
            {posts.length === 0 ? (
              <p className="is-muted text-body">Nenhum artigo nesta categoria ainda.</p>
            ) : (
              <div className="flex flex-col gap-14">
                {posts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
          <aside className="blog-layout-aside">
            <BlogCategoryNav activeCategory={category.slug} />
          </aside>
        </div>
      </div>
    </main>
  )
}
