# Fase 06 — medições locais

28/10/2026. Branch `fase-00-next16`. Export estático servido em `http://127.0.0.1:3018` e conferido no Cursor Browser. O servidor foi encerrado depois da medição.

Lighthouse (mediana de 5, mobile, quatro rotas), INP, axe, Rich Results e Tab real ficam com o André. Esta nota não inventa essas notas.

## Build

`npm run lint` exit 0. `npm run build` exit 0: 10 páginas estáticas, sem `/_design`, sem blog e sem termos. `sitemap.xml` com 8 URLs. `out/index.html` traz `noindex, nofollow`, o h1 "Tecnologia que funciona." e `mark.svg` no HTML (a página lê sem JavaScript).

JSON-LD da home: `ProfessionalService`, `WebSite`, três `Service`. Sem `FAQPage` (P13 ainda aberto) e sem `Review`.

## Orçamento (`check-budget.mjs`, tetos do PLAN §4.4)

| Página | JS gzip | CSS gzip | Fontes | Imagens | Transferência |
|--------|---------|----------|--------|---------|---------------|
| `/` | 156,3 KB | 5,7 KB | 92,4 KB | 21,1 KB | 284,0 KB |
| `/servicos/` | 153,9 KB | 5,7 KB | 92,4 KB | 21,1 KB | 278,9 KB |
| `/sobre/` | 153,9 KB | 5,7 KB | 92,4 KB | 21,1 KB | 278,8 KB |
| `/portfolio/atelier-norte/` | 153,9 KB | 5,7 KB | 92,4 KB | 21,1 KB | 278,6 KB |

Tetos (JS 170, CSS 35, fontes 110, imagem 200, transferência 700) passaram. Contraste mínimo medido: 8,08:1.

Metas não atingidas, sem esconder: JS da home 156,3 KB (meta 130) e fontes 92,4 KB (meta 90). O Rajdhani do wordmark entra nas fontes. O polyfill `noModule` não entra na conta de JS.

## Rolagem horizontal

`scrollWidth - clientWidth` = 0 em 375, 390, 768, 1280 e 1920 nas quatro rotas: `/`, `/servicos/`, `/sobre/`, `/portfolio/atelier-norte/`.

## Reduced motion

Com `prefers-reduced-motion: reduce`, a home não marca `data-sun-draw`, não aplica Lenis, e o h1 e o desenho do sol permanecem no HTML.

## LCP e CLS

Nesta passagem o webview não devolveu entradas de `largest-contentful-paint` e o observador injetado antes do carregamento não chegou a gravar. Sem mediana de 5 e sem número de LCP/CLS nesta nota.

## Deploy

A publicação é a integração Git da Vercel, no mesmo esquema dos outros projetos. O script `deploy-vercel.mjs` não foi executado. O Umami continua de fora até P11 (id e URL do script). Em 28/10/2026 o HTML no ar ainda estava em `https://abmsol.vercel.app` com `noindex`. O canônico passou a `https://abmsol.com.br` na fase 07.
