# Sugestões de ferramentas — a partir do INTAKE

> O **brief-architect** lê este arquivo e **deve falar com o usuário** antes de fechar o BRIEF.  
> Catálogo técnico: `docs/AI-TOOLS.md` · setup: `npm run tools:setup`

## Quando sugerir (momento certo)

| Momento | Quem | O que fazer |
|---------|------|-------------|
| Usuário preenche INTAKE no chat | Qualquer agente | Ler seções Meta, Nicho, Ambição, Efeitos, Hero — responder com tabela **Sugestões preliminares** (este doc) |
| INTAKE completo, antes do BRIEF | **brief-architect** | Tabela **Sugestões do architect** no chat + seção completa no `BRIEF.md` |
| Brief aprovado | **phase-executor** | Usar só **AI Tools** aprovadas — não re-sugerir |
| Fase 06 | phase-executor | Motion AI Kit (auditoria) se motion pesado no brief |

**Regra:** nunca listar todas as ferramentas. Sugerir **3–6 itens** com motivo, fase e custo (grátis / Pro / OAuth).

---

## Árvore de decisão (ordem)

1. **Nicho** — vetos (clínica ≠ WebGL default)
2. **Ambição visual** — profundidade da sugestão
3. **Efeitos no INTAKE** — liquid, pin, vídeo, WebGL
4. **Hero archetype / slot** — qual registry ou motion stack
5. **Checkboxes INTAKE** — respeitar vetos; se vazio, architect propõe
6. **Referências** — se URL menciona shader/3D/editorial, citar ferramenta que traduz

---

## Por ambição visual

| Ambição | Mínimo no BRIEF | Sugerir também (se nicho permitir) |
|---------|-----------------|-------------------------------------|
| **conversão** | GSAP, ui-ux-pro-max, shadcn base | 21st (busca cards), Cult UI pontual |
| **premium** | + MotionSites prompt, referências MCP browser | Cult UI, 21st, Framer Motion (stack) |
| **awwwards-lite** | + seção AI Tools completa, recipe React Bits ou Cult hero | Skiper (chrome), React Bits starter, cinematic-scroll |
| **awwwards** | + GetLayers ou React Bits Pro shaders, MotionSites, pin/GSAP narrativo | Agent Kit recipe, Origin Kit, Three.js só nichos criativos |

---

## Por nicho (defaults)

### médico · clínica · estética

| Ferramenta | Sugestão | Motivo |
|------------|----------|--------|
| GSAP | ✅ sempre | Motion contido, pin leve, reveals |
| ui-ux-pro-max | ✅ sempre | Paleta/tipo por nicho clínico |
| Cult UI | ⚠️ pontual | Texturas/dither sutis — não hero agressivo |
| MotionSites | ✅ se premium+ | Direção anti-slop no brief |
| Skiper UI | ⚠️ chrome | Cursor trail só se DIFFERENTIATION pedir |
| React Bits shaders | ❌ default | Cara de “tech demo” em clínica |
| Three.js / GetLayers 3D | ❌ | Vetado — usar vídeo macro + GSAP |
| gpt-taste | ❌ | Copy editorial sóbria (design-taste) |

**Alternativa se INTAKE pede WebGL:** vídeo full-bleed (slot A) + máscara GSAP + poster mobile.

### gastronomia · produtos-artesanal

| Ferramenta | Sugestão | Motivo |
|------------|----------|--------|
| GSAP + cinematic-scroll | ✅ | Jornada, pin, storytelling |
| gpt-taste | ✅ se artesanal/gastro | Copy AIDA + motion editorial |
| Cult UI | ✅ | Texturas, morph, calor visual |
| React Bits Pro | ✅ awwwards-lite+ | Backgrounds líquidos/shaders |
| GetLayers | ⚠️ | Vídeo BG cinematográfico |
| Three.js | ⚠️ | Só hero assinatura + desktop |
| MotionSites | ✅ | Prompt “food editorial cinematic” |
| 21st | ✅ | Cards produto, bento |

### serviços · outro

Avaliar INTAKE caso a caso. Default: GSAP + ui-ux-pro-max + 21st + Cult UI se B2B criativo.

---

## Por efeito marcado no INTAKE

| Efeito INTAKE | Ferramenta sugerida | Fase |
|---------------|---------------------|------|
| Liquid / morph SVG | GSAP, Cult UI (`morph-surface`), React Bits `-tw` backgrounds | 03–04 |
| Pin scroll / capítulo | GSAP, `cinematic-scroll` skill | 03–04 |
| Vídeo background hero | Stack nativo + GetLayers (opcional) | 03 |
| WebGL / Three.js | `lib/three.ts`, React Bits 3D, GetLayers | 03 (desktop) |
| Chrome único (cursor) | Skiper UI, Cult UI, GSAP | 02 |
| Só inspiração visual | Uiverse URLs → traduzir Tailwind/GSAP | INTAKE refs |
| Design system do zero | ui-ux-pro-max Python | 01 |
| Evitar convergência | MotionSites prompt + `portfolio-hero-slots` | brief |

---

## Por slot de hero (portfólio)

| Slot | Ferramentas que ajudam |
|------|------------------------|
| A vídeo full-bleed | GetLayers, GSAP máscara, vídeo nativo |
| B tipográfico | Motion AI Kit (springs), GSAP split text |
| C full-bleed imagem | Cult UI texturas, parallax GSAP |
| D editorial + assinatura | Skiper micro, Framer, **evitar** só split cream |
| E capítulo scroll | cinematic-scroll, GSAP pin, React Bits blocks |

---

## Formato da mensagem ao usuário (brief-architect)

Antes de pedir revisão do BRIEF, enviar no chat:

```markdown
## Ferramentas sugeridas para este projeto

Com base no INTAKE ([nicho], ambição **[X]**, efeitos: [lista]):

| Ferramenta | Uso | Fase | Custo | Status |
|------------|-----|------|-------|--------|
| GSAP | Coreografia hero + scroll | 02–04 | Grátis | ✅ Aprovar |
| MotionSites | Prompt direção visual | Brief | OAuth | ✅ Aprovar |
| React Bits `@reactbits-starter/…` | Background hero | 03 | Pro | ⚠️ Precisa chave |
| Three.js | — | — | — | ❌ Vetado (clínica) |

**Setup:** `npm run tools:setup` · chaves em `.env.local`

Confirme ou ajuste antes de eu gravar o BRIEF final (ou diga "aprovar sugestões").
```

Se o usuário não respondeu, gravar BRIEF com sugestões como **proposta** e marcar `LOOP_STATE.md`: aguardando confirmação AI Tools.

---

## Template no BRIEF.md (sempre obrigatório)

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

### Registries shadcn
- `@cult-ui`, `@reactbits-starter`, …

### MotionSites prompt
> [texto gerado para MCP]

### React Bits Agent Kit (se awwwards-lite+)
- Skill/recipe: [ex. recipe-saas-homepage] ou n/a

### Setup necessário
- [ ] MCP shadcn ativo
- [ ] Chaves: REACTBITS_LICENSE_KEY, …
- [ ] OAuth: motionsites
```

---

## Anti-padrões na sugestão

- Não sugerir **todas** as ferramentas “porque existem”
- Não sugerir Pro sem avisar **custo/chave**
- Não sugerir WebGL em clínica sem **override explícito** no INTAKE
- Não substituir **DIFFERENTIATION** por biblioteca genérica
- Preferir **GSAP + código próprio** antes de shader se conversão for prioridade
