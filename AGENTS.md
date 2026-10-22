# AGENTS — Regras do projeto

Este arquivo é lido por todos os agentes. Não implemente código sem passar pelo loop documentado em `docs/USAGE.md`.

## Stack (sem exceções)

- **Next.js 16** App Router + TypeScript (upgrade pela fase 00; nunca voltar para a 14)
- **Export estático** (`output: 'export'` em `next.config.js`)
- **Tailwind CSS** — cores via CSS custom properties em `globals.css`
- **GSAP + ScrollTrigger** — registrar em `lib/gsap.ts`, cleanup com `gsap.context()`
- **Framer Motion** — transições de página e micro-interações React
- **Lenis** — smooth scroll via `SmoothScroll` provider
- **Lucide React** — ícones (nunca emoji como ícone de UI)
- Deploy: **Vercel** (`npm run deploy:vercel`) — produção padrão; `npm run deploy:mockup` só se dharmalabs estiver ativo

## Estrutura de pastas

```
app/           → rotas
components/    → layout/, sections/, ui/, seo/
lib/           → dados, site.ts, seo.ts, gsap.ts
content/       → markdown (blog, se aplicável)
public/        → images/, video/
docs/          → INTAKE, BRIEF, phases (loop de criação)
design-system/ → MASTER.md (gerado por ui-ux-pro-max, se usado)
```

## Loop obrigatório

1. Preencher `docs/INTAKE.md`
2. Rodar skill **brief-architect** → gera `BRIEF.md`, `DIFFERENTIATION.md`, `phases/*.md`
3. Rodar skill **brief-reviewer** → relatório de aprovação/rejeição
4. **Humano aprova** o brief
5. Rodar **phase-executor** — **uma fase por sessão**
6. Rodar **qa-static-export** após cada fase

Agentes de implementação **não leem** `INTAKE.md` — só `BRIEF.md` + fase atual.

## Anti-clone (portfólio)

Cada projeto deve ter chrome único (cursor, scrollbar, nav mobile, header, footer, hero).
O usuário lista manualmente em `INTAKE.md` projetos que **não** devem ser copiados.
Nunca reutilize `CustomCursor`, `Header` ou `HeroSection` de outro cliente sem reescrever conforme `DIFFERENTIATION.md`.

**Anti-convergência:** `docs/prompts/brief-awwwards.md` + `portfolio-hero-slots.md` — não repetir o mesmo hero cream/editorial no mesmo nicho.

## Chrome padrão do boilerplate

Os componentes em `components/layout/` são **scaffold**, não produto final.
Na fase `02-chrome.md`, reescreva ou substitua conforme o brief — não entregue o default sem justificativa.

## Motion e acessibilidade

- Sempre `prefers-reduced-motion`
- Custom cursor: desktop only (`pointer: fine`)
- Vídeo de background: desligado no mobile (poster only)
- `100dvh` com fallback `100vh`
- Touch targets ≥ 48×48px
- GSAP desktop-only: `gsap.matchMedia()` com `min-width: 1280px`

## NEVER USE (global)

- Inter, Roboto, Arial como fonte principal
- Hero genérica: headline centralizada + botão CTA abaixo
- Gradiente roxo/azul em fundo branco
- Cards com `border-radius` grande + `drop-shadow` juntos
- Carrosséis/sliders para conteúdo principal
- Cores hardcoded — sempre variáveis CSS
- `'use client'` em componentes que podem ser Server Components
- Copiar chrome de outros projetos sem brief explícito

## Skills disponíveis

Ver `docs/SKILLS.md`. Ordem típica:

| Momento | Skill |
|---------|-------|
| Brief / design system | `brief-architect`, `ui-ux-pro-max`, `frontend-design` |
| Validação do brief | `brief-reviewer` |
| Implementação | `phase-executor` |
| QA | `qa-static-export` |
| Motion GSAP | `gsap-next-motion`, `gsap-react` + documentação oficial do GSAP (`gsap-core` e `gsap-scrolltrigger` estão fora de uso: corrompidas, em quarentena) |
| Scroll narrativo | `cinematic-scroll` |
| Copy | Copy Tone e NEVER USE do BRIEF (`gpt-taste` vetada, em quarentena) |
| Performance | orçamento do BRIEF/PLAN §4.4 + documentação oficial do Next/React (`vercel-react-best-practices` fora de uso, em quarentena) |
| Showcase pós-launch | `docs/GITHUB-SHOWCASE.md`, `docs/DESIGN.md` |

## Ferramentas MCP e registries (design / componentes)

Setup de MCPs: **nenhum servidor no projeto** (`.cursor/mcp.json` vazio). Validação visual: **Cursor Browser** (`cursor-ide-browser`). Catálogo histórico: `docs/AI-TOOLS.md` (não instalar o que o BRIEF vetou).

- **Vetados:** shadcn MCP, 21st.dev, Origin Kit, MotionSites, Motion AI Kit (`@latest`), WebGL/Three, GetLayers, registries pagos.
- **`components.json`:** permanece até a auditoria da Fase 00; não aciona MCP.

Agentes de implementação usam ferramentas listadas na seção **AI Tools** do `BRIEF.md` — não instalar libs fora do brief.

**Sugestões proativas:** ao discutir `docs/INTAKE.md` (mesmo antes do brief), ler `docs/prompts/ai-tools-suggestions.md` e apresentar tabela resumida de ferramentas recomendadas. O **brief-architect** confirma e grava no BRIEF.

## SEO

- `createMetadata()` de `lib/seo.ts`
- JsonLd em `components/seo/`
- Sitemap: estender `scripts/generate-sitemap.js`
- Alt text como se a foto final já existisse
