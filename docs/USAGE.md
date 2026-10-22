# Como usar o loop de criação

Guia para criar sites premium com `_ClienteBase` sem repetir o mesmo visual em todos os clientes.

## Visão geral

```
INTAKE (você) → brief-architect → brief-reviewer → você aprova
    → phase-executor (1 fase/sessão) → qa-static-export → repetir
```

**Não copie** os arquivos de `docs/prompts/` para cada projeto. Eles ficam no boilerplate como biblioteca. Cada projeto novo recebe apenas o que o loop **gera**: `BRIEF.md`, `DIFFERENTIATION.md`, `phases/*.md`.

---

## Passo 1 — Novo projeto

**Recomendado** — script que copia sem `node_modules`, `.git`, builds e reseta estado do loop:

```bash
cd _ClienteBase
npm run new:client -- MeuCliente
# opcional: --slug meu-cliente --no-install --no-git
```

O destino padrão é `../MeuCliente/` (pasta irmã em `www/`).

**Manual** — se preferir copiar no Explorer:

```bash
cp -r _ClienteBase MeuCliente   # ou copiar no Explorer
cd MeuCliente
npm install
```

Depois de criar (script ou manual):

- Revisar `site.config.json` (name, slug, url) — o script já preenche name/slug
- Rodar `npm run tools:setup` e ativar MCPs no Cursor — ver `docs/AI-TOOLS.md`
- Rodar `npm run intake:portfolio` — lista anti-clone a partir dos projetos em `www/`
- Resetar `LOOP_STATE.md` se copiou manualmente
- Esvaziar `docs/BRIEF.md` e `docs/DIFFERENTIATION.md` se copiou manualmente
- Apagar `docs/phases/*.md` gerados anteriormente (manter só `README.md` e `*-TEMPLATE.md`)

---

## Passo 2 — Intake

1. Analise o site/nicho com outra IA — `docs/prompts/research-brief-comet.md`.
2. **(Recomendado se premium+)** Pesquisa de referências Awwwards — `docs/prompts/research-references-awwwards.md`.
3. Abra `docs/INTAKE.md`.
4. Cole a análise na seção indicada.
5. Preencha **Ambição visual** (conversão | premium | awwwards-lite | awwwards).
6. Cole referências Awwwards na seção dedicada (se ambição ≥ premium).
7. Rode `npm run intake:portfolio` — preenche anti-clone **e slots usados** com projetos irmãos em `www/` (revise os `[x]`).
8. Preencha **Hero — composição e motion** (obrigatório) — ver `docs/prompts/hero-archetypes.md` e `portfolio-hero-slots.md`.
9. Marque **Ferramentas de design** no INTAKE se já souber — ou deixe vazio; o **brief-architect** sugere na sessão (ver `docs/prompts/ai-tools-suggestions.md`).
10. Referência visual: screenshot em `docs/assets/references/`, URL, ou peça ao brief-architect abrir via MCP na sessão de briefing.
11. Rascunhe chrome (cursor, scrollbar, nav mobile) se já tiver ideia.

Ver também: `docs/prompts/brief-awwwards.md` (impacto e anti-convergência).

---

## Passo 3 — Brief Architect

No Cursor Agent, invoque:

```
/brief-architect
```

Ou diga: *"Leia docs/INTAKE.md e execute a skill brief-architect"*.

**No chat (antes de gravar o BRIEF):** o architect apresenta **Ferramentas sugeridas para este projeto** — tabela com motivo, fase e custo. Confirme ou ajuste; depois ele grava a seção **AI Tools** no `BRIEF.md`. Matriz: `docs/prompts/ai-tools-suggestions.md`.

**Saída esperada:**

| Arquivo | Conteúdo |
|---------|----------|
| `docs/BRIEF.md` | Prompt mestre completo para o projeto |
| `docs/DIFFERENTIATION.md` | Chrome único (cursor, scroll, nav, header, footer, hero) |
| `docs/phases/01-design-system.md` | Fase 1 |
| `docs/phases/02-chrome.md` | Loading, cursor, scroll, header, footer, nav mobile |
| `docs/phases/03-hero.md` | Hero apenas |
| `docs/phases/04-sections-home.md` | Demais seções da home |
| `docs/phases/05-inner-pages.md` | Páginas internas |
| `docs/phases/06-polish-qa.md` | SEO, performance, deploy |
| `design-system/MASTER.md` | _(opcional)_ se rodou ui-ux-pro-max |

O architect pode rodar `ui-ux-pro-max` na fase de design system — ver `docs/SKILLS.md`.

**Não implemente código nesta etapa.**

---

## Passo 4 — Brief Reviewer

```
/brief-reviewer
```

Revise o relatório. Se **rejeitado**, volte ao architect com as correções listadas.

Checklist que o reviewer valida:

- [ ] Chrome descrito e diferente do anti-clone
- [ ] Scrollbar e nav mobile com spec de cor/formato
- [ ] Hero archetype + **Hero Composition** no BRIEF (não só nome)
- [ ] **Referências analisadas** se ambição ≥ premium
- [ ] Slot de portfólio não repetido sem override (`brief-awwwards.md`)
- [ ] **Visual Style Stack** (1 dominante + suportes) — não buffet de estilos
- [ ] Fase 03 sem anti-padrão "hero boba" (split institucional, carrossel 5 itens)
- [ ] Efeitos proibidos do nicho respeitados
- [ ] Stack = Next.js 14 export (não HTML vanilla)
- [ ] Fases separadas (não "site inteiro")
- [ ] NEVER USE específico do cliente

---

## Passo 5 — Aprovação humana

Leia `docs/BRIEF.md` e `docs/DIFFERENTIATION.md`. Só avance se estiver alinhado.

Atualize `LOOP_STATE.md`:

```markdown
- **Brief aprovado em:** 2026-06-14
- **BRIEF aprovado (humano):** ✅
```

---

## Passo 6 — Implementação (uma fase por sessão)

```
/phase-executor
```

Diga qual fase: *"Execute docs/phases/02-chrome.md"*.

Regras:

- Uma fase por conversa (controle de tokens)
- O executor lê só `BRIEF.md` + `DIFFERENTIATION.md` + fase atual + `AGENTS.md`
- Não pule fases

Ordem:

1. `01-design-system.md`
2. `02-chrome.md` ← **aqui** o chrome deixa de ser o default do boilerplate
3. `03-hero.md`
4. `04-sections-home.md`
5. `05-inner-pages.md`
6. `06-polish-qa.md`

---

## Passo 7 — QA após cada fase

```
/qa-static-export
```

Ou manualmente:

```bash
npm run build
npm run lint
```

Depois, checklist em `docs/prompts/qa-checklist.md`.

**Playwright MCP:** só se você pedir correção pontual visual/comportamental — não roda automaticamente.

---

## Passo 8 — Deploy

### Produção (Vercel — padrão)

```bash
npm run deploy:vercel
```

Na primeira vez, o CLI pede confirmação do nome do projeto (use o `slug` de `site.config.json`, ex.: `najoy-clinica`). Depois, cada deploy republica em `https://<slug>.vercel.app` (ou domínio customizado configurado no painel).

Detalhes: `docs/DEPLOY-VERCEL.md`.

### Mockup dharmalabs (opcional)

Só se o servidor dharmalabs estiver ativo:

```bash
npm run deploy:mockup
```

---

## Recuperação via mockup (dharmalabs)

Quando o código-fonte se perdeu mas o export em `dharmalabs/public/mockups/leads/<slug>/` está bom:

1. Duplicar `_ClienteBase` → pasta do cliente
2. Editar `site.config.json` (slug igual ao mockup)
3. Copiar assets do mockup para `public/` quando faltarem localmente
4. Portar HTML do mockup:

```bash
# Gera components/<cliente>/landing-html.ts + LandingPage.tsx
node scripts/port-html-embed.mjs \
  ../dharmalabs/public/mockups/leads/<slug>/public/index.html \
  components/<cliente> \
  LandingPage
```

5. Ajustar paths com `scripts/patch-asset-paths.mjs` se necessário
6. Reimplementar shell/experiência (GSAP, Lenis) em `lib/<cliente>/` — o HTML embutido não traz React
7. Comparar `npm run dev` vs `https://dharmalabs.local/<slug>/`
8. Só rodar `npm run deploy:mockup` quando o dev bater com o mockup

Sites complexos (clínica com dezenas de rotas): preferir reconstrução por fases do loop em vez de só port-html.

---

## Passo 9 — Showcase (GitHub / Awwwards)

Após o site pronto. Ver `docs/GITHUB-SHOWCASE.md`.

1. Preencher `docs/DESIGN.md` (pode pedir ao agente usando BRIEF + DIFFERENTIATION)
2. Gravar vídeo demo 30–60s
3. Atualizar README do repositório com GIF + link live
4. _(opcional)_ Submeter Awwwards

Não faz parte das fases 01–06 — economiza tokens durante o build.

---

## Skills — quando usar

| Skill | Quando |
|-------|--------|
| `brief-architect` | Após INTAKE |
| `brief-reviewer` | Antes de aprovar brief |
| `ui-ux-pro-max` | Dentro do architect ou fase 01 (design system) |
| `gsap-next-motion` | Fases com animação (hero, seções) |
| `phase-executor` | Cada fase aprovada |
| `qa-static-export` | Após cada fase |

Skills externas opcionais: `docs/SKILLS.md`.

---

## Atualizar o boilerplate mestre

Melhorias em skills ou `docs/prompts/` faça em `_ClienteBase`. Projetos já duplicados **não** sincronizam automaticamente — copie manualmente o que mudou ou duplique de novo para o próximo cliente.

---

## Perguntas frequentes

**Preciso copiar `dev-prompt-generico.md` para cada cliente?**  
Não. O brief-architect usa os templates em `docs/prompts/` e gera `BRIEF.md` específico.

**Posso pular o reviewer?**  
Não recomendado — é barato em tokens e evita briefs genéricos.

**Posso pedir o site inteiro num prompt?**  
Não. Quebra o controle de qualidade e custo.
