# Fase 05 — Páginas internas e conceitos

> Executar com `/phase-executor`. Ler `docs/BRIEF.md` (Páginas, Legal), `docs/DIFFERENTIATION.md`, este arquivo e `AGENTS.md`.
> Pré-requisito: fases 01 a 04. Uma ou poucas rotas por execução se o escopo crescer.

## Escopo

| Rota | Arquivo | Observações |
|------|---------|-------------|
| `/servicos/` | `app/servicos/page.tsx` | 3 grupos em detalhe + suporte local (São José do Rio Preto), sem preço |
| `/portfolio/<slug>/` ×3 | `app/portfolio/[slug]/page.tsx` | `generateStaticParams()` obrigatório; 1 premium, 1 institucional, 1 sistema/painel (P8); rótulo "Projeto conceito" na página e no card |
| `/sobre/` | `app/sobre/page.tsx` | Quem assina (P2/P3), origem do nome A·B·M + SOL **só com autorização de Bárbara (P14)** e sem foto/nome completo do Miguel (D5), método |
| `/contato/` | `app/contato/page.tsx` | Compositor de mensagem de WhatsApp (serviço + contexto, sem formulário/servidor); e-mail alternativo só se P4 |
| `/privacidade/` | `app/privacidade/page.tsx` | Renomear `politica-de-privacidade`; markdown renderizado no servidor; sem cookies, sem formulário |
| 404 | `app/not-found.tsx` | Assinatura visual: sol "desconectado" + trilha que reconecta ao voltar |
| Conceitos | `lib/content/concepts.ts`, `components/pages/*` | Marcas fictícias; licença em `docs/assets/LICENSES.md` |

### Limpeza do scaffold (obrigatória nesta fase)
- Remover `app/blog/**`, `content/blog/`, `app/termos-de-uso/**`, `content/legal/termos-de-uso.md`, rotas `/politica-de-privacidade` antigas (substituídas por `/privacidade`), `components/legal/` não usados e `lib/legal.ts`/`lib/site-features.ts` se ficarem sem uso.
- Confirmar com o André antes de excluir qualquer arquivo com conteúdo próprio; seguir `protecao-arquivos.mdc` (um arquivo por pedido explícito).

## Critérios de aceite
- [ ] **Cursor (contrato):** links, botões, cartões de portfólio, formulário de contato e CTAs WhatsApp com `data-cursor*` (DIFFERENTIATION F3); `data-cursor="hide"` em campos de texto; sem código de cursor (vem na 03b).
- [ ] Texto de privacidade em `/privacidade/` sem prometer conformidade legal (usar "boas práticas de privacidade"); revisão jurídica segue em P5.
- [ ] `out/` contém as 8 rotas (`ls out/**/index.html`): `/`, `/servicos`, `/portfolio/<3>`, `/sobre`, `/contato`, `/privacidade`, mais 404.
- [ ] Cada conceito tem "Projeto conceito" na página e no card; imagens com licença registrada.
- [ ] `/contato` gera a URL `https://wa.me/5517991446829?text=…` correta (teste via Cursor Browser (MCP `cursor-ide-browser`)).
- [ ] Metadata por página via `createMetadata()`; `generateStaticParams` em toda rota dinâmica; `notFound()` tratado.
- [ ] Nenhuma menção a cookies/banner/formulário na `/privacidade`; nenhuma promessa de prazo do diagnóstico antes de P10.
- [ ] Sem `/blog` e sem `/termos-de-uso` no build; sitemap coerente.
- [ ] Zero placeholder; zero marca real de terceiros.

## Skills
`frontend-design`. Regra `abmsol-content`.

## QA
`npm run build` (conferir contagem de páginas) · `npm run lint` · `/qa-static-export`

## Referências
- `docs/BRIEF.md` (Páginas, Legal e compliance, Diagnóstico gratuito)
- `docs/DIFFERENTIATION.md`
