> **Herdado do boilerplate.** No ABMSOL valem os vetos do BRIEF (MotionSites, Origin Kit, Motion AI Kit, registries pagos, gpt-taste, 21st sem aprovação).

# Ferramentas de design e componentes para agentes

Catálogo de bibliotecas, MCPs e CLIs disponíveis neste boilerplate para **pesquisa**, **instalação** e **inspiração** durante INTAKE, brief e implementação.

**Setup rápido:** `npm run tools:setup`  
**Sugestões automáticas:** `docs/prompts/ai-tools-suggestions.md` — o brief-architect apresenta no chat conforme o INTAKE  
**Config MCP:** `.cursor/mcp.json` (commitável — chaves em `.env.local`)  
**Registries shadcn:** `components.json`

---

## Visão geral

| Ferramenta | Tipo | Custo | Momento no loop | MCP / CLI |
|------------|------|-------|-----------------|-----------|
| **GSAP** | Motion (já no stack) | Grátis | Fases 02–04 | Skills locais |
| **Motion AI Kit** | Motion docs + CSS springs | Motion+ | Brief / motion | `npx motion-ai` |
| **Three.js** | WebGL 3D | Grátis | Hero / assinatura 3D | `three` (npm) |
| **React Bits Pro** | Shaders, backgrounds, Agent Kit | Pro | Brief premium+ | shadcn MCP + `@reactbits-*` |
| **21st.dev** | Catálogo React/Tailwind | Freemium | Pesquisa UI | MCP `21st` + `21st` CLI |
| **Uiverse** | Inspiração CSS (referência) | Grátis | INTAKE / referências | Manual |
| **Origin Kit** | Componentes stack-aware | API key | Implementação | MCP `originkit` |
| **Skiper UI** | Componentes shadcn premium | Pro | Chrome / micro-interações | shadcn MCP + `@skiper-ui` |
| **Cult UI** | Motion + texturas | Grátis (OSS) | Hero / seções | shadcn MCP + `@cult-ui` |
| **Unlumen UI** | Registry shadcn Pro | Pro | UI polish | shadcn MCP + `@unlumen-ui` |
| **GetLayers** | 3D, gradientes, vídeo BG | Lifetime | Hero cinematográfico | Plugin (ver abaixo) |
| **MotionSites** | 500+ prompts de design | Freemium | Brief / direção visual | MCP `motionsites` |
| **ui-ux-pro-max** | Design system (CSV/Python) | Grátis | brief-architect | Skill local |
| **shadcn MCP** | Busca/instala em registries | Grátis | Todas as fases | MCP `shadcn` |

---

## Setup

### 1. Automático (recomendado)

```bash
npm run tools:setup
```

- Verifica `components.json` e `.cursor/mcp.json`
- Copia `.env.example` → `.env.local` se não existir
- Opcional: `npx @21st-dev/cli init --client cursor --write` (se CLI instalado e logado)
- Opcional: `npx motion-ai@latest` (interativo — Motion docs MCP)

### 2. Habilitar MCP no Cursor

1. **Settings → MCP** — ativar servidores do projeto (`shadcn`, `21st`, `originkit`, `motionsites`)
2. Preencher `.env.local` com chaves dos serviços Pro
3. Reiniciar Cursor ou recarregar janela se tools não aparecerem

### 3. Chaves (`.env.local`)

| Variável | Serviço |
|----------|---------|
| `API_KEY_21ST` | [21st.dev/settings/api-keys](https://21st.dev/settings/api-keys) |
| `ORIGINKIT_API_KEY` | [mcp.originkit.dev](https://mcp.originkit.dev/) |
| `SKIPER_LICENSE_KEY` | [skiper-ui.com](https://skiper-ui.com/) (Polar) |
| `UNLUMEN_LICENSE_KEY` | [unlumen-ui-docs](https://unlumen-ui-docs.vercel.app/docs/mcp) |
| `REACTBITS_LICENSE_KEY` | [pro.reactbits.dev](https://pro.reactbits.dev/docs/installation) |

---

## Por ferramenta

### GSAP + ScrollTrigger (stack padrão)

Já integrado. Skills: `gsap-next-motion`, `gsap-react`, `cinematic-scroll` (ScrollTrigger: documentação oficial).

- Registrar em `lib/gsap.ts`
- Desktop-only com `gsap.matchMedia()` (`min-width: 1280px`)
- Sempre `prefers-reduced-motion`

### Motion AI Kit (motion.dev)

Docs Motion, busca de exemplos, editor de transições, geração de CSS spring.

```bash
npx motion-ai@latest
```

Escolha **Cursor** no prompt. Motion+ desbloqueia exemplos premium e MotionScore.  
Docs: [motion.dev/docs/ai-kit-install](https://motion.dev/docs/ai-kit-install)

**Quando usar:** micro-interações React (Framer Motion já no stack), springs CSS, auditoria de performance Motion.

### Three.js

```bash
# já no package.json após npm install
import { createDisposableRenderer } from '@/lib/three'
```

- **Quando:** INTAKE marca WebGL; hero com cena 3D leve; produto artesanal com profundidade
- **Evitar:** clínica/médico salvo brief explícito; mobile — poster/canvas estático
- Docs: [threejs.org](https://threejs.org/)
- Helper: `lib/three.ts` (renderer com cleanup para React)

### shadcn MCP + registries (`components.json`)

Um MCP (`shadcn`) enxerga **todos** os registries configurados:

| Namespace | Uso típico |
|-----------|------------|
| `@cult-ui` | Hero dithering, texturas, motion surfaces — **grátis** |
| `@skiper-ui` | Dynamic island, cursor trail, detalhes premium |
| `@unlumen-ui` | Glow, efeitos Pro shadcn |
| `@reactbits-starter` | Backgrounds, shaders (plano starter) |
| `@reactbits-pro` | Blocks, Application UI, **Agent Kit** |

**Exemplos de prompt no Cursor:**

- *"Liste componentes @cult-ui com textura"*
- *"Instale @skiper-ui/skiper18 para cursor trail no chrome"*
- *"Monte landing com blocks @reactbits-pro — hero, pricing, FAQ"*

**CLI manual:**

```bash
npx shadcn@latest add @cult-ui/hero-dithering
npx shadcn@latest add @reactbits-starter/mono-waves-tw
```

### React Bits Pro — Agent Kit

Skills, prompts e recipes para páginas inteiras (SaaS, agency, fintech).

- Docs: [pro.reactbits.dev/docs/agent-kit](https://pro.reactbits.dev/docs/agent-kit)
- Requer `REACTBITS_LICENSE_KEY` + registries no `components.json`
- **brief-architect:** citar recipe/skill se ambição awwwards-lite+

### 21st.dev

Catálogo amplo de componentes React — busca, geração e instalação.

```bash
npx @21st-dev/cli@latest login
npx @21st-dev/cli@latest init --client cursor --write
npx @21st-dev/cli@latest search "pricing bento"
npx @21st-dev/cli@latest add <slug>
```

MCP: endpoint `https://21st.dev/api/mcp` (já em `.cursor/mcp.json`).

### Uiverse (inspiração — sem MCP)

Referência visual de micro-componentes CSS. **Não instalar pacote** — transcrever ideia para Tailwind/GSAP do projeto.

- Guia design systems: [uiverse.io/design/how-to-use-design-systems](https://uiverse.io/design/how-to-use-design-systems)
- **INTAKE:** colar URLs em "Referências (URLs + o que roubar)"

### Origin Kit MCP

Componentes Framer-safe, busca por stack.

- URL: `https://mcp.originkit.dev/mcp`
- Auth: `ORIGINKIT_API_KEY`
- Tools: `list_components`, `get_component`, `search`, `fetch`

### GetLayers

3D scenes, gradientes interativos, seções motion, vídeos cinematográficos.

- **Cursor:** seguir [getlayers.ai/mcp](https://www.getlayers.ai/mcp) — plugin + OAuth (requer assinatura Full Stack)
- Não usa `mcp.json` estático — instalação via marketplace do cliente

### MotionSites MCP

500+ prompts de design premium para evitar "AI slop".

- MCP HTTP (OAuth): já em `.cursor/mcp.json` como `motionsites`
- Free: 3 prompts; pago: catálogo completo
- **brief-architect:** pedir prompt alinhado ao nicho antes de fixar hero

### ui-ux-pro-max (local)

Design system por nicho — paleta, tipografia, anti-patterns.

```powershell
python .cursor/skills/ui-ux-pro-max/scripts/search.py "clinic premium" --design-system --persist -p "Cliente" --stack nextjs -f markdown
```

---

## Matriz: quando usar no loop

| Fase | Ferramentas recomendadas |
|------|--------------------------|
| **INTAKE** | Uiverse URLs, MotionSites prompt, referências Awwwards, `intake:portfolio` |
| **brief-architect** | ui-ux-pro-max, MotionSites, 21st search, React Bits Agent Kit recipe |
| **01 design-system** | ui-ux-pro-max, shadcn (tokens base) |
| **02 chrome** | Skiper UI, Cult UI, 21st |
| **03 hero** | Cult UI, React Bits shaders, GetLayers, Three.js, GSAP |
| **04 sections** | 21st, React Bits blocks, Origin Kit |
| **06 polish** | Motion AI Kit (MotionScore; fora de uso no ABMSOL), doc. oficial do Next/React |

### Restrições por nicho (AGENTS.md)

| Nicho | Three.js / WebGL | Shaders React Bits | Liquid |
|-------|------------------|-------------------|--------|
| médico, clínica | ❌ | ⚠️ só background sutil | ❌ |
| estética | ❌ default | ⚠️ | morph SVG ok |
| gastronomia | ⚠️ se brief | ✅ | ✅ |
| artesanal | ⚠️ | ✅ | ⚠️ |

O **brief-architect** gera seção **AI Tools** no BRIEF. O **phase-executor** só instala o que o BRIEF lista.

Para pedir sugestões **antes** do brief: *"Li o INTAKE — quais ferramentas você sugere?"* (usa `ai-tools-suggestions.md`).

---

## Troubleshooting MCP

| Problema | Solução |
|----------|---------|
| shadcn sem tools | `npx clear-npx-cache`, reativar MCP, confirmar `components.json` na raiz |
| 401 em registry Pro | Chave em `.env.local`; reiniciar Cursor |
| 21st sem auth | `npx @21st-dev/cli login` + `API_KEY_21ST` |
| motionsites / originkit | OAuth ou Bearer no browser na primeira conexão |
| Motion AI Kit ausente | Rodar `npx motion-ai@latest` separadamente |

Logs Cursor: **View → Output → MCP: project-***

---

## Links rápidos

- [Motion AI Kit](https://motion.dev/docs/ai-kit-install)
- [Three.js](https://threejs.org/)
- [React Bits Agent Kit](https://pro.reactbits.dev/docs/agent-kit)
- [21st MCP](https://help.21st.dev/ai/mcp)
- [Uiverse design systems](https://uiverse.io/design/how-to-use-design-systems)
- [Origin Kit MCP](https://mcp.originkit.dev/)
- [Skiper UI](https://skiper-ui.com/)
- [Cult UI](https://www.cult-ui.com/)
- [Unlumen MCP](https://unlumen-ui-docs.vercel.app/docs/mcp)
- [GetLayers MCP](https://www.getlayers.ai/mcp)
- [MotionSites MCP](https://motionsites.ai/mcp)
