# Fase 06 — SEO, performance, QA e deploy

> Executar com `/phase-executor`, depois `/qa-static-export`. Ler `docs/BRIEF.md` (SEO, Critérios de qualidade), `docs/DIFFERENTIATION.md`, este arquivo e `AGENTS.md`.
> Pré-requisito: fases 01 a 05.

## Escopo (sempre)

| Arquivo | Ação |
|---------|------|
| `lib/seo.ts` | `createMetadata()` por página (título 50–60, descrição 140–160), canonical, OG 1200×630, Twitter; `noindex` controlado por variável de build (ex.: `NEXT_PUBLIC_NOINDEX=1` em `*.vercel.app`; o export estático não enxerga o host em runtime) |
| `app/layout.tsx` | Metadata global; remover `robots` fixo `noindex` apenas quando o domínio final for ativado (fase 07) |
| `lib/schema.ts`, `components/seo/JsonLd.tsx` | `ProfessionalService` (`areaServed` Rio Preto/SP + Brasil online), `Service` por serviço, `FAQPage` na home, `WebSite`; **sem** `Review` |
| `public/robots.txt`, `public/llms.txt` | Atualizar com dados finais |
| `scripts/generate-sitemap.js` | 8 URLs |
| `public/og.png` | Imagem OG (marinho + sol) |
| `lib/analytics.ts` + script Umami | `defer`, sem cookies; evento `whatsapp_click` (`source`, `service`) — depende de P11 |
| `vercel.json` | Cache `immutable` para assets e cabeçalhos de segurança |
| `scripts/check-budget.mjs` | Falha o build se um teto do orçamento for ultrapassado |
| `app/_design/**` | **Remover** |
| `docs/qa/` | Relatórios Lighthouse (mediana de 5, 4 rotas) |

## Deploy
- [ ] `site.config.json` → `url` permanece `*.vercel.app` com `noindex` (D7) até a fase 07.
- [ ] `npm run deploy:vercel`; conferir `https://abmsol.vercel.app`.

## Critérios de aceite
- [ ] Esta fase **fecha o lançamento** (00, 01, 02, 03a, 04, 05, 06). A **03b** (cursor-nó v2 + sol camada 2) roda depois, com o baseline de desempenho registrado aqui como referência.
- [ ] Nenhum texto do site afirma conformidade legal/certificação (`rg -i 'lgpd|certificad|conformidade' app lib components` revisado manualmente).
- [ ] Todos os tetos do BRIEF (LCP, CLS, INP, TBT, FCP, JS, CSS, fontes, transferência) cumpridos em `/`, `/servicos`, `/sobre` e 1 conceito (Lighthouse mobile, mediana de 5).
- [ ] `axe` sem problemas sérios/críticos; contraste AA; navegação por teclado completa.
- [ ] Rich Results Test sem erro; JSON-LD válido.
- [ ] `out/sitemap.xml` com 8 URLs; `*.vercel.app` responde com `noindex`.
- [ ] Rolagem horizontal = 0 em 375, 390, 768, 1280 e 1920 px; reduced-motion e JS desligado verificados.
- [ ] `/_design` removido; `rg -i 'lorem|placeholder|cliente x|cliente base'` = 0.
- [ ] `npm run build` e `npm run lint` verdes; deploy abre e o evento `whatsapp_click` aparece no Umami (se P11).

## Skills
`qa-static-export`, tetos do BRIEF/PLAN §4.4 e documentação oficial do Next/React (a skill `vercel-react-best-practices` está fora de uso), Cursor Browser (MCP `cursor-ide-browser`) (validação), `deploy:vercel`.

## QA
Rotina em `docs/prompts/qa-checklist.md` + checklists Awwwards/Developer Award do PLAN §6.3 e §6.4. Capturas em `docs/screenshots/`.

## Referências
- `docs/BRIEF.md` (SEO, Critérios de qualidade)
- `docs/PLAN.md` §4.4, §4.6, §4.7, §6
