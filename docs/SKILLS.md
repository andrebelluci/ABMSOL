# Skills — catálogo do boilerplate

Skills em `.cursor/skills/` (loop) e `.agents/skills/` (ecossistema instalado). Invoque com `/nome-da-skill`.

## Fluxo do loop

```
INTAKE → brief-architect → brief-reviewer → [você aprova]
    → phase-executor (1 fase) → qa-static-export → repetir
```

**Docs de briefing:** `hero-archetypes.md` (composição hero) · `visual-style-matrix.md` (estilo dominante + suportes) · **`brief-awwwards.md`** (impacto, referências, slots) · `portfolio-hero-slots.md` · **`ai-tools-suggestions.md`** (INTAKE → ferramentas sugeridas).

## Skills do loop (`.cursor/skills/`)

| Skill | Função | Quando |
|-------|--------|--------|
| **brief-architect** | INTAKE → BRIEF + DIFFERENTIATION + phases | Antes de código |
| **brief-reviewer** | Valida brief | Após architect |
| **phase-executor** | 1 fase por sessão | Brief aprovado |
| **qa-static-export** | build + lint + checklist | Após cada fase |
| **ui-ux-pro-max** | Design system (Python/CSV) | Architect / fase 01 |
| **gsap-next-motion** | GSAP + Lenis neste repo | Fases 02–04 |

## Skills instaladas (`.agents/skills/`)

| Skill | Função | Quando |
|-------|--------|--------|
| ~~gsap-core~~ | **Fora de uso no ABMSOL** (corrompida, quarentena); usar a documentação oficial do GSAP | — |
| **gsap-react** | useGSAP, cleanup | Componentes animados |
| ~~gsap-scrolltrigger~~ | **Fora de uso no ABMSOL** (corrompida, quarentena); usar a documentação oficial do ScrollTrigger | — |
| **cinematic-scroll** | Narrativa scroll-driven, capítulos | Hero narrativo, produtos-artesanal |
| ~~design-taste-frontend~~ | **Removida do ABMSOL** (SKILL.md corrompido; ver `docs/CHANGELOG-REVISAO.md`) | — |
| **frontend-design** | Direção estética intencional (Anthropic) | Architect + fases 01–03 |
| **gpt-taste** | Copy/marketing AIDA + GSAP editorial | Só nichos criativos (ver abaixo) |
| ~~vercel-react-best-practices~~ | **Fora de uso no ABMSOL** (hash divergente, quarentena); usar BRIEF/PLAN §4.4 e a documentação oficial | — |

### design-taste-frontend — copy e anti-IA?

**Parcialmente sim.** O foco principal é **layout e UI** (tipografia, cores, cards, motion). Mas inclui regras de **texto de interface** que combatem cara de IA:

- Proíbe clichês: *Elevate, Seamless, Unleash, Next-Gen, Transforme seu negócio…*
- Proíbe nomes genéricos (*Acme, Nexus, SmartFlow*)
- Headlines assimétricas, não hero centrada genérica
- Dados orgânicos, não `99.99%` redondo

**No loop:**

| Agente | Uso |
|--------|-----|
| **brief-architect** | Aplica regras ao escrever headlines/CTAs no `BRIEF.md` |
| **brief-reviewer** | Rejeita copy com filler words |
| **phase-executor** | Fases 03–05 — textos em componentes e `lib/*.ts` |

Para **copy longa** (blog, manifesto, sobre), o brief do intake ainda manda — a skill evita que o agente *invente* frases de marketing genéricas nos componentes.

> Copy puramente editorial: INTAKE + **`gpt-taste`** (nichos criativos) ou só design-taste (clínica/médico).

### frontend-design (Anthropic) — instalada

Escolhe direção estética **intencional** por projeto; evita os 3 “looks default” de IA. Use no **brief-architect** e fases 01–03. Complementa `DIFFERENTIATION.md`.

### gpt-taste (Leonxlnx) — instalada

Copy **marketing** + AIDA + GSAP editorial forte. **Só** quando o BRIEF marcar `Copy engine: gpt-taste` (gastronomia, artesanal). **Não** em clínica/médico — conflita com chrome sóbrio.

### ui-ux-pro-max

Design system (paleta, tipografia, anti-patterns por nicho). Complementa, não substitui `DIFFERENTIATION.md`.

```powershell
python .cursor/skills/ui-ux-pro-max/scripts/search.py "clinic premium" --design-system --persist -p "Cliente" --stack nextjs -f markdown
```

### cinematic-scroll

Pair com a documentação oficial do ScrollTrigger. Use em nichos narrativos (Barbara, AllSucos com jornada de scroll). O `brief-architect` deve citar no BRIEF quando o hero for capítulo/pin.

### vercel-react-best-practices — FORA DE USO (quarentena; reinstalar só com aprovação do André)

Fase 06: RSC, bundles, waterfalls.

### Ferramentas MCP e registries — `docs/AI-TOOLS.md`

Setup (`tools:setup` removido no ABMSOL) · Config: `.cursor/mcp.json` + `components.json`  
**Sugestões por INTAKE:** `docs/prompts/ai-tools-suggestions.md` (brief-architect fala no chat antes do BRIEF)

| Ferramenta | Integração |
|------------|------------|
| shadcn MCP | Cult UI, Skiper, Unlumen, React Bits via registries |
| 21st.dev | MCP + `npx @21st-dev/cli` |
| MotionSites | MCP OAuth — prompts de design no brief |
| Origin Kit | MCP HTTP — componentes stack-aware |
| Motion AI Kit | `npx motion-ai` — docs Motion |
| GetLayers | Plugin OAuth — 3D / vídeo BG |
| Three.js | `lib/three.ts` — WebGL se BRIEF aprovar |
| Uiverse | Inspiração manual (INTAKE URLs) |

O **brief-architect** gera seção **AI Tools** no BRIEF. O **phase-executor** só instala o que o BRIEF lista.

### WebGL / Three.js

Helper em `lib/three.ts`. Guia de nicho: `docs/prompts/niche/webgl-experimental.md`. Só sob brief explícito. Preferir `css-motion-patterns.md` antes de WebGL em clínica/médico.

### Padrões CSS / clip-path

`docs/prompts/css-motion-patterns.md` — scrollbar, page transition, text reveal (sem skill extra).

---

## GitHub & Awwwards showcase (item 4)

**Não é skill** — é entrega pós-projeto:

- `docs/GITHUB-SHOWCASE.md` — checklist README, vídeo, topics
- `docs/DESIGN.md` — case study / filosofia visual

Válido para portfólio GitHub, recrutadores e submissão Awwwards. Rode **após** fase 06.

---

## Mapa por fase

| Fase | Skills |
|------|--------|
| Pré-código | brief-architect, ui-ux-pro-max, **frontend-design**, MCPs em `docs/AI-TOOLS.md` |
| Validação | brief-reviewer |
| 01 design-system | phase-executor, ui-ux-pro-max, frontend-design |
| 02 chrome | phase-executor, gsap-next-motion, gsap-react |
| 03a/03b hero | phase-executor, gsap-react, doc. oficial do GSAP, cinematic-scroll, frontend-design, **AI Tools do BRIEF** |
| 04–05 seções | phase-executor, gsap-react, doc. oficial do GSAP, cinematic-scroll |
| 06 polish | phase-executor, qa-static-export, doc. oficial do Next/React |
| **Pós-launch** | Preencher `DESIGN.md` + `GITHUB-SHOWCASE.md` (manual) |

\* `gpt-taste` só se BRIEF autorizar (não clínica/médico default)

---

## Reinstalar em projeto duplicado

```bash
# NÃO EXECUTAR no ABMSOL sem aprovação do André (verificar fonte e hash antes):
# npx skills add https://github.com/greensock/gsap-skills --skill gsap-react --skill gsap-scrolltrigger --skill gsap-core -y
npx skills add https://github.com/MustBeSimo/cinematic-scroll-skill -y
# npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices -y
# (design-taste-frontend: NÃO será reinstalada, decisão do André)
npx skills add https://github.com/anthropics/skills --skill frontend-design -y
npx skills add https://github.com/Leonxlnx/taste-skill --skill gpt-taste -y
```

---

## Opcional futuro (não instalado)

| Skill | Motivo |
|-------|--------|
| `image-to-code` (taste-skill) | Moodboard → implementação |
| `redesign-existing-projects` | Auditar site legado antes de refazer |
| gsap-awwwards-website (eng0) | Stack Vite/React 19 — diverge do Next 14 export |

---

## Playwright MCP

Sob demanda — não faz parte do loop automático.

---

## Referências

- [Cursor — Agent Skills](https://cursor.com/docs/skills)
- [agentskills.io](https://agentskills.io/)
