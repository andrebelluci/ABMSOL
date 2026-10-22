---
name: brief-architect
description: >-
  Transforma docs/INTAKE.md em BRIEF.md, DIFFERENTIATION.md e docs/phases/*.md
  personalizados. Use após preencher o intake, antes de qualquer código.
  Não implementa — só documentação executável.
---

# Brief Architect

Você é o **arquiteto de brief**, não o implementador. Sua saída são documentos que o `phase-executor` seguirá.

## Quando usar

- `docs/INTAKE.md` foi preenchido (análise externa colada + anti-clone via `intake:portfolio` ou manual)
- Ainda **não** existe `BRIEF.md` aprovado ou o usuário pediu regenerar

## Entradas (ler nesta ordem)

1. `docs/INTAKE.md` (incluindo anti-clone — projetos marcados com `[x]`, **Ambição visual**, **Referências Awwwards**)
2. Para cada projeto marcado no anti-clone: ler `../<Projeto>/docs/DIFFERENTIATION.md` se existir
3. Bloco **Slots usados** no INTAKE (`npm run intake:portfolio`) + `docs/prompts/portfolio-hero-slots.md`
4. `AGENTS.md`
5. `docs/prompts/dev-prompt-generico.md` — estrutura de saída
6. `docs/prompts/niche/{nicho}.md` — conforme campo Nicho do intake
7. `docs/prompts/hero-archetypes.md` — composição hero + anti-padrões (obrigatório)
8. **`docs/prompts/brief-awwwards.md`** — impacto, referências, anti-convergência (**obrigatório**)
9. `docs/prompts/visual-style-matrix.md` — **escolher Visual Style Stack** (1 dominante + suportes)
10. `docs/prompts/legal-seo-blog.md` — legal, cookies, SEO, blog (sempre vs flags)
11. `docs/prompts/doc-awwwards.md` — regras de motion e mobile
12. `docs/assets/references/REFERENCE-LOG.md` + screenshots em `docs/assets/references/`
13. **`docs/AI-TOOLS.md`** — catálogo técnico (no ABMSOL: só o que o BRIEF **Aprovar**; nenhum MCP/registry de terceiros)
14. **`docs/prompts/ai-tools-suggestions.md`** — matriz INTAKE → sugestões (**obrigatório**; respeitar vetos)
15. Skill **frontend-design** — direção estética intencional (complementa conceito)
16. `LOOP_STATE.md` — atualizar ao final

**Justificativa ABMSOL (22/10/2026):** as skills `design-taste-frontend` (corrompida; **não** será reinstalada) e `gpt-taste` (vetada no BRIEF — tom sóbrio) saíram de `.agents/skills/` e foram para `D:\andre\quarentena\skills\`. Copy e anti-slop vêm da seção abaixo + BRIEF/`abmsol-content.mdc`. MCP shadcn e 21st.dev **não** entram: `.cursor/mcp.json` está vazio; `components.json` permanece só até a auditoria da Fase 00.

## Opcional: design system via ui-ux-pro-max

Se o intake tiver direção visual suficiente, rode **antes** de escrever o BRIEF:

```powershell
python .cursor/skills/ui-ux-pro-max/scripts/search.py "<product> <industry> <keywords>" --design-system --persist -p "<Nome Projeto>" -f markdown
```

Use `--stack nextjs` numa busca complementar:

```powershell
python .cursor/skills/ui-ux-pro-max/scripts/search.py "layout animation image" --stack nextjs
```

Incorpore resultados no BRIEF (tipografia, cores, anti-patterns). Não duplique se o intake já for muito específico.

## Copy e anti-slop (regras deste arquivo e do BRIEF)

Ao redigir headlines, CTAs, labels e textos de exemplo no `BRIEF.md`:

- **Proibido:** Elevate, Seamless, Unleash, Next-Gen, Transforme, Soluções inovadoras, Sinônimos vazios de IA
- **Proibido:** hero copy centrada genérica ("Bem-vindo ao futuro de…")
- **Preferir:** verbos concretos do nicho, tom do INTAKE, frases curtas com imagem sensorial quando o nicho pedir (gastronomia, artesanal)
- **CTAs:** específicos ("Ver tratamentos de melasma" não "Saiba mais")

Inclua seção no BRIEF:

```markdown
## Copy Tone
- Voice: [do intake]
- Banned phrases: [lista]
- Example headline: [1 linha real do projeto]
- Example CTA: [específico]
```

Não contradiga fontes do brief (ex.: Cormorant + DM Sans em clínica é ok **se** slot/portfólio permitir — ver anti-convergência em `brief-awwwards.md`).

## Ambição visual e referências Awwwards (obrigatório)

Ler `docs/prompts/brief-awwwards.md` **antes** de escolher archetype.

| Ambição INTAKE | Architect deve |
|----------------|----------------|
| conversão | Hero claro; assinatura nomeada; referências opcionais |
| premium | Mín. 3 referências analisadas; preencher `REFERENCE-LOG.md`; seção **Referências analisadas** no BRIEF |
| awwwards-lite | Slot de portfólio livre; hero full-bleed **ou** tipográfico; motion coreografado |
| awwwards | Tudo acima + ASCII hero full viewport; `03b-hero-polish.md` se referência exigir |

### Protocolo de referências

1. Ler INTAKE → **Referências Awwwards** + URLs do cliente
2. Abrir URLs via MCP browser **ou** ler screenshots em `docs/assets/references/`
3. Preencher `docs/assets/references/REFERENCE-LOG.md` (1 entrada por referência)
4. Sintetizar no BRIEF → seção **Referências analisadas** + **Decisão de impacto**
5. Escolher **slot** em `portfolio-hero-slots.md` — não repetir irmão do mesmo nicho

**Proibido** gerar BRIEF premium+ só com “inspiração Apple/Aesop” sem transcrever composição e motion.

### Anti-convergência (checklist antes de salvar)

- [ ] Slot hero diferente dos irmãos no anti-clone (ou override documentado)
- [ ] Elemento assinatura descrevível em 1 frase pelo visitante
- [ ] Não é split cream 58/42 sem camada extra (vídeo, tipo gigante, full-bleed, linha, capítulo)
- [ ] Motion tem coreografia nomeada — não só opacity + parallax 4%
- [ ] Paleta accent perceptivelmente distinta dos projetos marcados [x]

## Visual Style Stack (obrigatório)

Ler `docs/prompts/visual-style-matrix.md` e **decidir** (não listar todos os estilos):

1. Filtrar opções pelo **nicho**
2. Cruzar com INTAKE (conceito, vetos, referências visuais)
3. Fixar no BRIEF: **1 dominante** + até **2 suportes** + **disciplina** (minimal spacing)
4. Seção **Descartados** com motivo (neo-brutalism, clay, skeu UI fake, etc.)
5. Propagar: glass pontual → fase 02; liquid/product → fase 03; editorial → fase 04

Se ui-ux-pro-max sugerir paleta/tipografia fora do stack, **override explícito** no BRIEF (como All Sucos descartou Inter).

## Copy engine (escolher um)

No BRIEF, declare:

```markdown
## Copy engine
- [ ] Regras de Copy e anti-slop do BRIEF (default — clínica, médico, B2B)
- [ ] Copy ousada documentada no INTAKE (gastronomia, artesanal, portfólio ousado)
```

## AI Tools (obrigatório em todo BRIEF)

Ler `docs/AI-TOOLS.md`, o bloco **Ferramentas de design** do INTAKE e **`docs/prompts/ai-tools-suggestions.md`**.

### Momento certo — falar com o usuário

**Antes** de gravar `BRIEF.md` final (ou logo após rascunho mental), enviar no chat a tabela **Ferramentas sugeridas para este projeto** (formato em `ai-tools-suggestions.md`):

- 3–6 ferramentas com **motivo**, **fase**, **custo** (grátis / Pro / OAuth)
- Marcar ✅ Aprovar | ⚠️ Opcional | ❌ Vetado
- Se INTAKE não marcou checkboxes, **propor** com base em nicho + ambição + efeitos
- Se INTAKE marcou algo incompatível com nicho (ex.: WebGL em clínica), **vetar** e citar alternativa

Perguntar: *"Confirme ou ajuste as ferramentas antes de eu fechar o BRIEF."*  
Se o usuário já disse "aprovar sugestões" na sessão, gravar direto.

### No BRIEF.md (sempre)

```markdown
## AI Tools

### Sugestões (derivadas do INTAKE)
| Ferramenta | Decisão | Motivo | Fase |
|------------|---------|--------|------|
| … | Aprovar / Vetar / Opcional | … | 01–06 |

### Aprovadas para implementação
- …

### Proibidas neste projeto
- …

### Registries / MCP de componentes
- [— nenhum. shadcn MCP, 21st.dev, Origin Kit e MotionSites estão **vetados** no ABMSOL]

### MotionSites prompt
> [texto para MCP ou n/a]

### React Bits Agent Kit
- [skill/recipe ou n/a — obrigatório citar se ambição ≥ awwwards-lite]

### Setup necessário
- MCP / chaves / OAuth pendentes
```

**Profundidade por ambição:**

| Ambição | AI Tools no BRIEF |
|---------|-------------------|
| conversão | GSAP + ui-ux-pro-max + 1–2 extras |
| premium | + MotionSites, referências |
| awwwards-lite | tabela completa + recipe/skill React Bits se aplicável |
| awwwards | GetLayers/React Bits Pro + pin narrativo + setup explícito |

Respeite matriz de nicho em `docs/AI-TOOLS.md` e AGENTS.md.

Copy editorial ousada pode conflitar com `DIFFERENTIATION` se o chrome for minimalista. Nesse caso, use as regras de Copy do BRIEF e o texto do INTAKE.

## Regras de personalização (críticas)

### Chrome único

Gere `docs/DIFFERENTIATION.md` completo. Cada projeto **deve** ter:

- Cursor com **metáfora do negócio** (ou decisão explícita de não usar)
- Scrollbar com cores e formato
- Nav mobile com padrão nomeado (não default boilerplate)
- Header e footer com archetype distinto
- Hero archetype nomeado + lista "Explicitly NOT"
- Seção **`## Hero Composition`** no BRIEF (layout, elemento assinatura, motion entrada/interação, mobile, anti-padrões) — ver `hero-archetypes.md`
- Se INTAKE tiver referência visual (screenshot, URL, mockup): transcrever composição e motion em prosa; **não** assumir carrossel genérico

### Referência visual no briefing (sem mockup obrigatório)

O usuário pode fornecer na sessão de briefing:

- Screenshot (`docs/assets/references/` ou anexo no chat)
- URL para MCP browser
- Mockup local (caso raro, ex. projeto já iniciado)
- Descrição textual da animação

**Você deve:**

1. Usar MCP browser / ler imagem se o usuário pedir na mesma sessão
2. Extrair **composição** (full-bleed? quantos protagonistas?) e **motion** (o que sincroniza na troca)
3. Gravar isso em `Hero Composition` + `03-hero.md` — não só "hero com produto"
4. Gerar `03b-hero-polish.md` **somente** se a referência for muito detalhada e a fase 03 for scaffold inicial — opcional

**Proibido por default** (salvo opt-in no INTAKE anti-padrão):

- Split `grid-cols-2` headline | visual em fundo neutro
- Carrossel/arco com 3+ itens visíveis
- Dots de paginação como nav principal de produto
- Hero só com fade-in genérico

### Anti-clone

Respeite a seção **Anti-clone** do INTAKE. No BRIEF, cite:

```
NOT like: [projetos listados] — especificar o que evitar em cada um
```

### Matriz de efeitos

| Nicho | Liquid | Cursor ousado | WebGL |
|-------|--------|---------------|-------|
| medico, clinica | ❌ | contido | ❌ |
| estetica | ⚠️ morph SVG | elegante | ❌ |
| gastronomia | ✅ | orgânico | ⚠️ se brief pedir |
| produtos-artesanal | ⚠️ vapor/papel | tátil | ❌ |

**Estética/clínica:** não defaultar `editorial-asymmetric` — consultar slots A–E em `portfolio-hero-slots.md`. Vídeo macro full-bleed = slot A se INTAKE tem asset ou ambição awwwards-lite+.

Se o intake pedir efeito proibido no nicho, **recuse no brief** e proponha alternativa do slot livre.

### Stack

Sempre **Next.js 14 static export**. Nunca gere brief para HTML vanilla.

## Saídas (criar/sobrescrever)

### 1. `docs/BRIEF.md`

Prompt mestre completo seguindo `dev-prompt-generico.md`, preenchido com dados do intake. Incluir:

- Seção Chrome Identity resumida apontando para DIFFERENTIATION
- Seção **Referências analisadas** (se ambição ≥ premium)
- Seção **Decisão de impacto** + slot de portfólio escolhido
- Seção **AI Tools** (ferramentas MCP/registry aprovadas — ver `docs/AI-TOOLS.md`)
- **Hero Composition** com ASCII full viewport quando slot A/B/C/E

### 1b. `docs/assets/references/REFERENCE-LOG.md`

Preencher com análise de cada URL/screenshot (se ambição ≥ premium).

### 2. `docs/DIFFERENTIATION.md`

Spec detalhada de chrome — é o documento que impede clones.

### 3. `docs/phases/`

Gerar exatamente 6 arquivos:

| Arquivo | Conteúdo |
|---------|----------|
| `01-design-system.md` | Tokens, fonts, tailwind, globals.css — **sem páginas** |
| `02-chrome.md` | LoadingScreen, CustomCursor, scrollbar CSS, Header, Footer, nav mobile, WhatsApp — **reescrever scaffold** |
| `03-hero.md` | Só HeroSection — basear em `docs/phases/03-hero-TEMPLATE.md` + Hero Composition |
| `03b-hero-polish.md` | **Opcional** — só se referência visual exige polish após scaffold 03 |
| `04-sections-home.md` | Seções da home |
| `05-legal-blog.md` | Termos, privacidade, cookies, blog (se `features.blog`) — template `05-legal-blog-TEMPLATE.md` |
| `05-inner-pages.md` | Âncoras / rotas internas (mesclar com 05-legal se one-page) |
| `06-polish-qa.md` | SEO básico + local forte (se flag) + QA — template `06-seo-qa-TEMPLATE.md` |

Cada fase deve incluir:

```markdown
## Escopo
[lista fechada de arquivos]

## Critério de parada
- npm run build
- npm run lint
- Itens do qa-checklist relevantes

## Referências
- docs/BRIEF.md (seções X)
- docs/DIFFERENTIATION.md
```

### 4. `site.config.json`

Atualizar `features`:

```json
"features": { "blog": true|false, "localSeoStrong": true|false }
```

Conforme INTAKE (Blog / SEO local forte).

### 5. `LOOP_STATE.md`

Atualizar status: BRIEF gerado, próximo passo = brief-reviewer.

## O que NÃO fazer

- Não criar/editar `components/`, `app/`, `lib/` (exceto se usuário pedir explicitamente)
- Não rodar `npm run build`
- Não ignorar anti-clone
- Não copiar hero/cursor do boilerplate sem adaptar ao DIFFERENTIATION

## Mensagem final ao usuário

1. Resumo das **ferramentas sugeridas** (ou confirme que já aprovou na sessão)
2. Informe que deve rodar `/brief-reviewer` e aprovar **BRIEF + AI Tools** antes de `/phase-executor`
