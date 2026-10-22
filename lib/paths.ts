export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

/** Rota interna para `<Link>` — sem basePath (Next.js prefixa). */
export function route(path: string): string {
  if (!path || path === '/') return '/'
  return path.startsWith('/') ? path : `/${path}`
}

/** URL absoluta para `<a>`, pushState e export estático. */
export function href(path: string): string {
  const normalized = route(path)
  return basePath ? `${basePath}${normalized}` : normalized
}

export function asset(path: string): string {
  return href(path)
}
