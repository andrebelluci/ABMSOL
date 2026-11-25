import { notFound } from 'next/navigation'

import { BlogCategoryNav } from '@/components/blog/BlogCategoryNav'
import { Breadcrumbs, breadcrumbsJsonLd } from '@/components/blog/Breadcrumbs'
import { BlogPostCard } from '@/components/blog/BlogPostCard'
import {
  blogBreadcrumbs,
  blogEnabled,
  getPublishedBlogPosts,
} from '@/lib/blog'
import { createMetadata, SITE_URL } from '@/lib/seo'

export const metadata = createMetadata({
  title: 'Blog: presença, sites e sistemas | ABMSOL',
  description:
    'Artigos da ABMSOL sobre Google, IAs, sites e sistemas. Sem métrica inventada de cliente.',
  path: '/blog/',
})

export default function BlogIndexPage() {
  if (!blogEnabled()) notFound()

  const posts = getPublishedBlogPosts()
  const crumbs = blogBreadcrumbs([])

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
        <p className="mt-8 font-mono text-label uppercase text-mint">Blog</p>
        <h1 className="mt-3 max-w-3xl text-h2">Presença, site e sistema, por escrito.</h1>
        <p className="is-muted mt-4 max-w-2xl text-lead" data-cursor-avoid="">
          Textos úteis sobre aparecer no Google e nas IAs, sem inventar resultado de
          cliente. Novos artigos entram pela pasta <code>content/blog</code>, a
          partir do arquivo modelo.
        </p>

        <div className="blog-layout mt-12">
          <div className="blog-layout-main">
            {posts.length === 0 ? (
              <p className="is-muted text-body">Nenhum artigo publicado ainda.</p>
            ) : (
              <div className="flex flex-col gap-14">
                {posts.map((post) => (
                  <BlogPostCard key={post.slug} post={post} />
                ))}
              </div>
            )}
          </div>
          <aside className="blog-layout-aside">
            <BlogCategoryNav />
          </aside>
        </div>
      </div>
    </main>
  )
}
