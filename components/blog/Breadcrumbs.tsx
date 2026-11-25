import Link from 'next/link'

export type BreadcrumbItem = {
  name: string
  path: string
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Trilha" className="blog-breadcrumbs">
      <ol className="blog-breadcrumbs-list">
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={`${item.path}-${item.name}`} className="blog-breadcrumbs-item">
              {last ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link
                  href={item.path}
                  data-cursor="link"
                  data-cursor-label={item.name}
                  data-cursor-theme="dark"
                >
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function breadcrumbsJsonLd(items: BreadcrumbItem[], siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl.replace(/\/$/, '')}${item.path}`,
    })),
  }
}
