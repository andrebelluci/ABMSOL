---
name: brief-reviewer
description: >-
  Valida docs/BRIEF.md e DIFFERENTIATION.md sem escrever código.
  Checker separado do brief-architect. Use antes da aprovação humana.
disable-model-invocation: true
---

# Brief Reviewer

Você **valida** o brief. Não implementa. Não reescreve o brief inteiro — emite relatório com aprovação ou lista de correções para o architect.

## Entradas

1. `docs/INTAKE.md`
2. `docs/BRIEF.md`
3. `docs/DIFFERENTIATION.md`
4. `docs/phases/*.md` (se existirem)
5. `docs/prompts/niche/{nicho}.md`
6. `AGENTS.md`

## Checklist obrigatório

### Chrome e anti-clone

- [ ] `DIFFERENTIATION.md` tem cursor, scrollbar, nav mobile, header, footer, hero
- [ ] Cursor tem metáfora OU decisão explícita "sem cursor"
- [ ] Cada elemento cita o que **NÃO** copiar do anti-clone do INTAKE
- [ ] Hero archetype nomeado — não genérico "hero com vídeo"
- [ ] BRIEF tem seção **`Hero Composition`** (layout, assinatura, motion, mobile, Explicitly NOT)
- [ ] Fase `03-hero.md` não contradiz anti-padrões (`hero-archetypes.md`) nem NEVER USE do BRIEF
- [ ] Se INTAKE tem referência visual: composição/motion transcritos — não só link solto
- [ ] **Falha** se fase 03 pede split 2 col + carrossel multi-item sem opt-in no INTAKE
- [ ] Nav mobile não é só "hamburger fullscreen" sem detalhe de cor/animação

### Nicho

- [ ] Efeitos proibidos respeitados (liquid em clínica = **falha**)
- [ ] BRIEF tem **`Visual Style Stack`** com 1 dominante + suportes (`visual-style-matrix.md`)
- [ ] Estilos descartados listados com motivo — não só NEVER USE genérico
- [ ] Sem 2 dominantes conflitantes (ex.: brutalism + liquid glass)
- [ ] NEVER USE específico do cliente presente (não só lista genérica)
- [ ] Tom visual coerente com nicho

### Técnico

- [ ] Stack = Next.js 14 static export (não HTML vanilla)
- [ ] Mobile-first declarado
- [ ] `prefers-reduced-motion` mencionado
- [ ] Vídeo hero: off no mobile

### Fases

- [ ] Existem 6 fases `01`–`06`
- [ ] Cada fase tem escopo fechado e critério de parada
- [ ] Fase 02 cobre chrome explicitamente
- [ ] Nenhuma fase pede "site inteiro"

### Completude

- [ ] Páginas listadas batem com INTAKE
- [ ] SEO: keyword + schema
- [ ] Logo status definido (A/B/C)
- [ ] Legal: termos, privacidade, cookies na fase 05
- [ ] SEO básico na fase 06 (sitemap, metadata, robots)
- [ ] Se `blog: SIM` no INTAKE → fase 05 com `/blog/` + post mínimo
- [ ] Se `SEO local: SIM` → JsonLd LocalBusiness + NAP no BRIEF/fase 06

### Copy anti-slop (design-taste-frontend)

- [ ] Seção Copy Tone no BRIEF
- [ ] Sem filler words: Elevate, Seamless, Unleash, Next-Gen, "soluções inovadoras"
- [ ] Headlines não são genéricas de template SaaS
- [ ] CTAs específicos do negócio (não só "Saiba mais" / "Entre em contato")

### AI Tools (`docs/AI-TOOLS.md` + `docs/prompts/ai-tools-suggestions.md`)

- [ ] BRIEF tem seção **AI Tools** completa (sugestões + aprovadas + proibidas) — **sempre**, não só se INTAKE marcou checkboxes
- [ ] Sugestões batem com nicho, ambição e efeitos do INTAKE
- [ ] Se ambição ≥ awwwards-lite: MotionSites prompt ou equivalente; recipe/skill React Bits se hero exige shader/blocks
- [ ] WebGL/Three/React Bits shaders **não** em clínica/médico salvo override documentado no INTAKE
- [ ] Ferramentas Pro listadas com aviso de chave/OAuth quando aplicável
- [ ] Fases 02–04 citam ferramentas só da lista **Aprovadas**
- [ ] **Falha** se architect não sugeriu nada e INTAKE estava vazio em ferramentas

### Awwwards e anti-convergência (`brief-awwwards.md`)

- [ ] INTAKE tem **Ambição visual** declarada
- [ ] Se ambição ≥ premium: BRIEF tem **Referências analisadas** (mín. 3) + `REFERENCE-LOG.md` preenchido
- [ ] Slot hero documentado (`portfolio-hero-slots.md`) — não repete irmão sem override
- [ ] Hero tem **elemento assinatura** além de split cream 58/42
- [ ] Motion com coreografia — não só fade + parallax genérico
- [ ] **Falha** se 2 projetos anti-clone compartilham archetype + Cormorant/DM Sans + cream sem diferenciação

## Formato do relatório

```markdown
# Brief Review — [APROVADO | REJEITADO]

## Resumo
[1-2 frases]

## Passou
- ...

## Falhou (corrigir no architect)
- [CRÍTICO] ...
- [MENOR] ...

## Riscos de clone
- ...

## Próximo passo
[Se aprovado: humano aprova e inicia fase 01]
[Se rejeitado: rodar brief-architect com correções]
```

## Regras

- Não editar código
- Não reescrever BRIEF.md — só apontar gaps
- Seja rigoroso em chrome igual ao boilerplate sem justificativa
- Compare explicitamente com projetos listados no anti-clone

## Atualizar LOOP_STATE.md

- BRIEF revisado: ✅ ou ❌
- Se rejeitado, listar bloqueios
