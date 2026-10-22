# Fase 01 — Design system

> Executar com `/phase-executor`. Ler apenas `docs/BRIEF.md`, `docs/DIFFERENTIATION.md`, este arquivo e `AGENTS.md`. Regras ativas: `abmsol-design`, `abmsol-motion-perf`, `abmsol-content`.
> **Sem páginas, sem chrome, sem hero, sem seções.**

## Escopo

| Arquivo | Ação |
|---------|------|
| `app/globals.css` | Tokens CSS (`--c-navy-900/800/700`, `--c-gold`, `--c-mint`, `--c-ink`, `--c-ink-muted`, `--c-paper`), foco `:focus-visible` menta, `::selection`, reduced-motion global, remover tokens antigos (`--gold`, `--off-white`, etc.) |
| `tailwind.config.ts` | Mapear tokens; breakpoints `375/768/1280/1920`; escala fluida de tipografia; remover cores/fontes do scaffold |
| `app/layout.tsx` | `next/font/google`: Syne, Instrument Sans e JetBrains Mono (3 famílias; **sem Rajdhani**), subset latin, `display: swap`; remover Cormorant/DM Sans |
| `components/ui/` | Primitivos: `Button`, `Label`, `Section`, `SectionHeading` (Server Components) |
| `public/logo/mark.svg`, `mark-lockup.svg`, `mark-simple.svg` | Derivar do vetor oficial em `docs/assets/` (não reconstruir) e criar a versão simplificada |
| `components/brand/Wordmark.tsx` | **Criar** (Server Component): wordmark "ABMSOL" como **SVG inline em curvas** (`role="img"`, `aria-label`, `<title>`), derivado de `abmsol_svg.svg` |
| `components/sun/sun-geometry.ts` | Geometria única do sol (20 nós, 4 raios cardeais) extraída do mesmo vetor |
| `lib/brand.ts` | Conferir dados; e-mail permanece vazio até P4 |
| `app/_design/page.tsx` | Rota interna **noindex** que mostra tokens, escala e componentes (removida na fase 06) |
| `scripts/check-contrast.mjs` | Calcula contraste dos pares texto/fundo |
| `design-system/MASTER.md` | Resumo dos tokens (opcional) |

**Não tocar:** hero, seções, header/footer (fases 02–04).

## Decisões a fechar nesta fase
- **Tipografia (D):** montar em `/_design` amostras lado a lado de Syne, Instrument Sans e JetBrains Mono (h1, rótulo, corpo) e, para o wordmark, **A: Rajdhani em texto vivo** vs **B: SVG em curvas**, informando o **peso real em KB** de cada opção. O padrão é B; **quem decide A ou B é o André** (explicar de forma simples e esperar a escolha antes de travar). Se A vencer, o teto de fontes é reavaliado e o BRIEF atualizado.
- **Marca pequena (E):** `mark-simple.svg` (anel + 4 raios + 4 nós) é a marca do header, do favicon, do avatar e do ícone OG; altura mínima 28–32 px no header.
- Valores de `--c-navy-800`, `--c-navy-700`, `--c-ink`, `--c-ink-muted`, `--c-paper` (nunca `#000`/`#FFF`), validados por script.
- Vetor oficial **já recebido** em `docs/assets/` (ver BRIEF § Logo): limpar o SVG (metadados Inkscape, mm → viewBox simples), gerar `mark.svg`, `mark-lockup.svg` (wordmark em curvas) e `mark-simple.svg`; propor a versão simplificada para aprovação do André.

## Critérios de aceite
- [ ] Script: 100% dos pares texto/fundo ≥ 4,5:1 (≥ 3:1 em texto grande e UI); dourado sobre `paper` **não** usado como texto.
- [ ] Fontes ≤ 90 KB woff2 no total (3 famílias; medir no `out/`); o KB da Rajdhani (opção A) é só informado nas amostras.
- [ ] `Wordmark` renderiza "ABMSOL" como SVG inline em curvas, menta, fiel à logo, com `role="img"` e `aria-label="ABMSOL"`; nenhuma Rajdhani no `next/font` (salvo decisão A do André).
- [ ] **`mark-simple.svg` renderizado em 32, 48 e 110 px**, legível (anel, 4 raios e 4 nós distinguíveis); capturas em `docs/screenshots/mark-simple-{32,48,110}.png` anexadas ao relatório da fase.
- [ ] Amostras A/B do wordmark em `/_design` com KB reais e **decisão do André registrada** no `LOOP_STATE.md`.
- [ ] `rg '#[0-9a-fA-F]{3,6}' app components` só encontra tokens em `globals.css` e SVGs de marca.
- [ ] Nenhuma referência a Cormorant, DM Sans, `off-white`, `gold-pale` etc.
- [ ] `/_design` mostra tokens e componentes, com `noindex`.
- [ ] `mark.svg` e `mark-simple.svg` legíveis em 16, 32 e 512 px.

## Skills
`ui-ux-pro-max`, `frontend-design`; documentação oficial do `next/font`.

## QA
`npm run build` · `npm run lint` · `/qa-static-export`

## Referências
- `docs/BRIEF.md` (Tipografia, Sistema de Cores, Logo, NEVER USE)
- `docs/DIFFERENTIATION.md`
