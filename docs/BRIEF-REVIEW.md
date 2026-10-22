# Brief Review — APROVADO (com ressalvas menores)

Revisão feita em 20/10/2026 seguindo `.cursor/skills/brief-reviewer/SKILL.md`, sobre `INTAKE.md`, `BRIEF.md`, `DIFFERENTIATION.md`, `docs/phases/01..06`, `docs/prompts/niche/servicos.md` e `AGENTS.md`.

## Resumo
O brief cobre chrome, hero, stack, fases e AI Tools, e respeita o PLAN aprovado e as decisões D1 a D10. Não há falha crítica. As ressalvas são desvios documentados do boilerplate e pendências que dependem do André.

## Passou
- **Chrome e anti-clone:** `DIFFERENTIATION.md` tem cursor (cursor-nó), scrollbar, nav mobile (Trail Index sheet), header, footer, hero, loading (nenhum) e transições. Cada item cita o que **não** copiar (Projeto A, Projetos B, C, D, E, Projeto F, Projeto G).
- **Hero:** archetype nomeado (`typographic-statement`, slot B) com seção `Hero Composition`, ASCII, motion por tempo, mobile e `Explicitly NOT`. Fase 03 espelha o BRIEF e não contém split + carrossel.
- **Visual Style Stack:** 1 dominante (editorial/asymmetric) + 2 suportes + disciplina; descartados listados com motivo. Sem estilos conflitantes.
- **Nicho:** nenhum efeito vetado em "servicos" (sem liquid, sem WebGL).
- **Técnico:** Next.js 16 export (atualizado na rodada 2), mobile-first, `prefers-reduced-motion`, sem vídeo no hero.
- **Fases:** existem `01` a `06`, com escopo fechado, critérios de parada e skills; a fase 02 cobre chrome; nenhuma pede "site inteiro".
- **Completude:** páginas batem com o INTAKE; keyword e schema definidos; logo status **C**; SEO básico na fase 06; blog = NÃO coerente com `features`.
- **Copy anti-slop:** seção `Copy Tone`, frases banidas e CTAs específicos.
- **AI Tools:** seção completa (sugestões, aprovadas, proibidas, registries, setup); fases 02 a 04 só citam ferramentas aprovadas; WebGL/Pro vetados.
- **Awwwards:** ambição declarada (`awwwards-lite`), 3 referências analisadas com `REFERENCE-LOG.md` preenchido, slot documentado com override de 4 eixos, motion com coreografia nomeada.

## Falhou (corrigir no architect)
- Nenhum item **[CRÍTICO]**.

### Ressalvas [MENOR] (todas registradas e sem bloqueio)
1. **Legal diferente do boilerplate.** O checklist pede "termos, privacidade e cookies na fase 05". O BRIEF substitui por: apenas `/privacidade/`, sem termos e sem banner de cookies, conforme PLAN §1.2 e §4.7 (Umami sem cookies, sem formulário). Override explícito no BRIEF § Legal. Reavaliar termos se surgir contrato online.
2. **Nav mobile.** O PLAN §2.4 descreve "painel de tela cheia marinho". O BRIEF o detalha como "Trail Index sheet" (sobe do rodapé, ocupa a viewport abaixo do header) para se distinguir do overlay stagger do Projeto A. **Peço sua confirmação no aprovar do BRIEF.**
3. **Referências.** As 3 analisadas são do architect (Linear, Resend, Vercel), vistas só no primeiro viewport. As do André (P9) devem substituir ou complementar.
4. **Slot B repetido** com Projeto B (nicho estética). Override com 4 eixos (paleta, display font, nav, assinatura/cursor).
5. **`design-taste-frontend`:** o arquivo `SKILL.md` está ilegível (binário) no projeto e no `_ClienteBase`. As regras anti-slop foram aplicadas a partir do `brief-architect`, do PLAN §2.5 e de `abmsol-content.mdc`. Reinstalar a skill quando possível.
6. **ui-ux-pro-max** sugeriu padrão "FAQ/Documentation Landing", estilo "Vibrant & Block-based" e Satoshi/General Sans. Override explícito no BRIEF (só a paleta navy+dourado foi aproveitada).
7. **Nicho `servicos`** sugere contadores (anos/clientes) e `localSeoStrong: true`. Descartado: contadores seriam métrica inventada; JSON-LD local entra na fase 06 sem a flag.
8. **Diagnóstico gratuito (D6):** escopo é **proposta** até o André validar (P10); o site não promete prazo antes disso.

## Riscos de clone
- Baixo. Nenhum projeto do anti-clone compartilha paleta, tipografia, cursor ou nav. O único ponto de contato é o slot B (override documentado) e a presença de dourado (Projeto F usa dourado em cursor; aqui o dourado é trilha/semântica e o fundo é marinho).

## Próximo passo
Aprovação humana do `BRIEF.md` (e do item 2 acima). Depois, `/phase-executor` na fase 01.
