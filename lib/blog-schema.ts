import type { BlogPost } from '@/lib/blog'
import { blogPostPath, resolveBlogAuthor } from '@/lib/blog'
import { SITE_URL } from '@/lib/site'

export function blogArticleJsonLd(post: BlogPost) {
  const author = resolveBlogAuthor(post)
  const url = `${SITE_URL}${blogPostPath(post.slug)}`

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: [`${SITE_URL}${post.cover}`],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.role,
      image: `${SITE_URL}${author.photo}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ABMSOL',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo/mark.svg`,
      },
    },
    mainEntityOfPage: url,
    inLanguage: 'pt-BR',
  }
}
