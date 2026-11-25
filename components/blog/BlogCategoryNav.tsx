import Link from 'next/link'

import {
  blogCategoryPath,
  blogSubcategoryPath,
  getBlogCategoryLinks,
} from '@/lib/blog'

export function BlogCategoryNav({
  activeCategory,
  activeSubcategory,
}: {
  activeCategory?: string
  activeSubcategory?: string
}) {
  const categories = getBlogCategoryLinks()
  if (categories.length === 0) return null

  return (
    <nav className="blog-category-nav" aria-label="Categorias do blog">
      <p className="font-mono text-label uppercase text-mint">Categorias</p>
      <ul className="mt-4 space-y-4">
        {categories.map((category) => {
          const active = activeCategory === category.slug
          return (
            <li key={category.slug}>
              <Link
                href={blogCategoryPath(category.slug)}
                className={active && !activeSubcategory ? 'text-mint' : 'text-ink'}
                data-cursor="link"
                data-cursor-label={category.label}
                data-cursor-theme="dark"
              >
                {category.label}
                <span className="is-muted ml-2 font-mono text-label">{category.count}</span>
              </Link>
              {category.subcategories.some((sub) => sub.count > 0) ? (
                <ul className="mt-2 space-y-1 pl-3">
                  {category.subcategories
                    .filter((sub) => sub.count > 0)
                    .map((sub) => (
                      <li key={sub.slug}>
                        <Link
                          href={blogSubcategoryPath(category.slug, sub.slug)}
                          className={
                            activeCategory === category.slug &&
                            activeSubcategory === sub.slug
                              ? 'text-mint'
                              : 'is-muted'
                          }
                          data-cursor="link"
                          data-cursor-label={sub.label}
                          data-cursor-theme="dark"
                        >
                          {sub.label}
                          <span className="ml-2 font-mono text-label">{sub.count}</span>
                        </Link>
                      </li>
                    ))}
                </ul>
              ) : null}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
