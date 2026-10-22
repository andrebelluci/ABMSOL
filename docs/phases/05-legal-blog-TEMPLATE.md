# Fase 05 — Legal, cookies e blog (TEMPLATE)

> Personalizar por projeto. **Legal + cookies = sempre.** Blog só se `site.config.json` → `features.blog: true`.

## Escopo (sempre)

| Arquivo | Ação |
|---------|------|
| `content/legal/termos-de-uso.md` | Conteúdo adaptado ao cliente |
| `content/legal/politica-de-privacidade.md` | LGPD + cookies |
| `lib/legal.ts` | Rotas e constantes |
| `lib/content.ts` | Loader markdown (legal + blog) |
| `components/legal/LegalPageLayout.tsx` | Layout prose |
| `components/legal/CookieConsent.tsx` | Banner LGPD |
| `app/termos-de-uso/page.tsx` | Página estática |
| `app/politica-de-privacidade/page.tsx` | Página estática |
| `components/layout/Footer.tsx` | Links Termos · Privacidade (+ Blog se ativo) |
| `components/layout/AppShell.tsx` | Montar `CookieConsent` |

## Escopo (se `features.blog: true`)

| Arquivo | Ação |
|---------|------|
| `content/blog/*.md` | Mín. 1 post placeholder |
| `lib/blog.ts` | `getBlogPosts()`, `getPostBySlug()` |
| `app/blog/page.tsx` | Lista |
| `app/blog/[slug]/page.tsx` | Post + `generateStaticParams` |

## Escopo one-page (ajustar por projeto)

| Arquivo | Ação |
|---------|------|
| `lib/paths.ts` | Âncoras + rotas legais |
| `components/layout/Header.tsx` | Scroll spy / links |

## Critério de parada

- [ ] `npm run build` passa
- [ ] `npm run lint` passa
- [ ] `/termos-de-uso/` e `/politica-de-privacidade/` renderizam
- [ ] Cookie banner aparece, aceite persiste, link para privacidade
- [ ] Footer com links legais
- [ ] Se blog: `/blog/` + 1 post acessível
- [ ] `generate-sitemap.js` inclui novas rotas

## Referências

- `docs/prompts/legal-seo-blog.md`
- `docs/BRIEF.md` — Legal, Features
