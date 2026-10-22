# Fase 05 — Páginas internas (TEMPLATE)

> **Não executar este arquivo.** O brief-architect personaliza para `05-inner-pages.md`.

## Escopo

Rotas listadas no BRIEF — uma ou poucas por execução se o escopo for grande.

| Rota | Arquivo |
|------|---------|
| `/contato/` | `app/contato/page.tsx` + formulário ou WhatsApp |
| `/sobre/` | `app/sobre/page.tsx` |
| `/[slug]/` dinâmico | `generateStaticParams()` obrigatório (`output: export`) |

**Padrão export estático:** toda rota dinâmica precisa de `generateStaticParams()`.  
Se `features.blog: false`, não criar posts em `content/blog/` (só `.gitkeep`).

## Componentes comuns

- `components/ui/PageHero.tsx` — título de página interna
- `components/pages/*` — grids, formulários, detalhes
- `lib/contact.ts` — dados de contato centralizados

## Critérios de aceite

- [ ] Metadata por página via `createMetadata()`
- [ ] Breadcrumbs se BRIEF pedir
- [ ] `generateStaticParams` em todas as rotas `[param]`
- [ ] 404 tratado com `notFound()`

## QA

`npm run build` — conferir contagem de páginas no log · `/qa-static-export`
