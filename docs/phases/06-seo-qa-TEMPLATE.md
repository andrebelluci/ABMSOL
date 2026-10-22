# Fase 06 — SEO, local e QA (TEMPLATE)

> SEO básico **sempre**. JsonLd local reforçado se `features.localSeoStrong: true`.

## Escopo (sempre)

| Arquivo | Ação |
|---------|------|
| `lib/seo.ts` | Revisar `createMetadata()` |
| `app/layout.tsx` | Metadata global |
| `lib/schema.ts` | Schema Organization / LocalBusiness |
| `components/seo/JsonLd.tsx` | JsonLd na layout (usa `lib/schema.ts`) |
| `public/robots.txt` | Sitemap URL |
| `public/llms.txt` | Descrição do site |
| `scripts/generate-sitemap.js` | Todas as rotas estáticas |
| `public/images/og.webp` | OG image |

## Escopo (`localSeoStrong: true`)

| Arquivo | Ação |
|---------|------|
| `components/seo/JsonLdLocalBusiness.tsx` | NAP, horários, `areaServed`, `sameAs`, geo se houver |
| Seções home | Menção natural da cidade (sem stuffing) |
| Metadata | Keywords locais do BRIEF |

## Deploy

- [ ] `site.config.json` → `url` com domínio real (ou manter `*.vercel.app` até DNS)
- [ ] `npm run deploy:vercel` — produção na Vercel
- [ ] Conferir live: `https://<slug>.vercel.app`

## QA

- [ ] `npm run build` + `npm run lint`
- [ ] `out/sitemap.xml` com home + legais (+ blog)
- [ ] Rich Results Test — JsonLd válido
- [ ] OG / Twitter cards
- [ ] `qa-static-export`

## Referências

- `docs/prompts/legal-seo-blog.md`
- `docs/BRIEF.md` — SEO
