# Fase 03b — Cursor-nó v2 e Sol interativo (camada 2) — PÓS-LANÇAMENTO

> Executar com `/phase-executor` **depois da Fase 06** (site no ar) e **antes da submissão ao Awwwards**. Ler `docs/BRIEF.md` (Hero Composition, Animações, Custom Cursor), `docs/DIFFERENTIATION.md` (Custom Cursor F1–F9), este arquivo e `AGENTS.md`.
> Pré-requisitos: fases 00 a 06. **Justificativa:** a interação por ponteiro é a parte de maior risco (contraste, desempenho, acessibilidade) e não bloqueia o lançamento; o site já funciona com camadas 0/1.
> Premissa de custo: as fases 02, 04 e 05 já deixaram os atributos `data-cursor-*`; esta fase **só adiciona código novo e isolado**.

## Escopo

| Arquivo | Ação |
|---------|------|
| `components/cursor/CursorProvider.tsx` | **Criar** (client): provider, ticker compartilhado, listener delegado único (`pointermove`/`pointerover`), leitura de `data-cursor*` via `closest()` |
| `components/cursor/Cursor.tsx` | **Criar**: núcleo + anel (1:1 com o ponteiro), satélite com pílula, linha-trilha |
| `components/cursor/useCursorState.ts` | **Criar**: estados F2, temas F4, colocação do satélite F5, fallbacks F8 |
| `components/sun/SunCircuit.tsx` | **Estender**: energização do raio mais próximo, pulso menta até o nó, rótulo mono; nós seguem **sem tab stop** e `aria-hidden` |
| `components/sun/useSunTier.ts` | **Estender**: camada 2 + sonda de FPS (~500 ms, frame médio > 24 ms rebaixa) |
| `components/layout/AppShell.tsx` | Montar `<CursorProvider>` (lazy, `dynamic import`) |
| `app/globals.css` | Esconder cursor nativo **só** quando o cursor custom está ativo (classe no `<html>`), nunca em campos de texto |

**Não tocar:** conteúdo, seções, páginas; só adicionar atributos faltantes se a auditoria F9 achar algum.

## Especificação
Implementar **F1 a F9** de `docs/DIFFERENTIATION.md` (princípios, estados, contrato de atributos, temas, satélite, linha-trilha, desempenho, ativação/fallbacks, aceite). Nada do cursor deve existir fora de `components/cursor/` e dos atributos.

## Critérios de aceite
- [ ] Todos os itens de **F9** (contraste do rótulo ≥ 4,5:1 e do anel ≥ 3:1; anel ≤ 28 px sobre texto; sem `mix-blend-mode`/blur/transparência no texto do cursor; nativo restaurado nos 5 casos de F8; FPS ≥ 55 com CPU 4×).
- [ ] Sonda de FPS rebaixa a camada e restaura o cursor nativo com CPU 6× (`Emulation.setCPUThrottlingRate`).
- [ ] Ativação só em `(pointer: fine) and (hover: hover) and (min-width: 1280px)`, sem reduced-motion, `forced-colors` ou `saveData`.
- [ ] Sol: pulso menta com atraso por distância, rótulo mono, clique leva à seção; **sem alterar** a navegação por teclado (sol segue `aria-hidden`, sem tab stop).
- [ ] JS adicional (cursor + camada 2) ≤ 12 KB gzip, lazy; LCP/CLS/INP da home inalterados (comparar com o baseline da fase 06).
- [ ] Remover `components/cursor/` não quebra o build (isolamento).
- [ ] Revisão visual em 1280 e 1920 px com Cursor Browser (MCP `cursor-ide-browser`) (capturas em `docs/screenshots/`).
- [ ] Preparação Awwwards: lista de pendências de acabamento (sem prometer prêmio).

## Skills
gsap-react, rontend-design. GSAP core, ticker e desempenho: documentação oficial do GSAP (gsap.com/docs: `gsap.context`, `matchMedia`, ScrollTrigger, `useGSAP`).

## QA
`npm run build` · `npm run lint` · medição no Cursor Browser (PerformanceObserver) + Lighthouse manual do André (mobile e desktop) · Cursor Browser (MCP `cursor-ide-browser`) (CPU 4×/6×, reduced-motion, teclado, campos de formulário) · `/qa-static-export`

## Referências
- `docs/DIFFERENTIATION.md` (Custom Cursor F1–F9) · `docs/BRIEF.md` · `docs/phases/03a-hero-sol.md`
