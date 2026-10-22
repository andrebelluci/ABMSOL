# Prompt — Fase 0 (rodar no workspace pai `www/`)

Cole o bloco abaixo em um novo chat no Cursor, aberto em `D:\andre\Projetos\www`. Edite a seção "Decisões" antes de enviar.

---

```text
Contexto: vamos construir o site novo da ABMSOL — Soluções Digitais. O projeto vive em `ABMSOL/` (pasta irmã de `_ClienteBase/` e `dharmalabs/`). Estou no workspace pai `www/`. Responda sempre em português do Brasil.

ESCOPO E SEGURANÇA
- Escreva e edite arquivos SOMENTE dentro de `ABMSOL/`.
- `_ClienteBase/`, `dharmalabs/` e os outros projetos são SOMENTE LEITURA (referência). Não altere nem apague nada neles.
- Siga `ABMSOL/.cursor/rules/protecao-arquivos.mdc`: nada de exclusão recursiva ampla, git destrutivo ou comandos fora de `ABMSOL/`.
- Rode comandos com `working_directory` em `ABMSOL/`.

LEIA ANTES DE QUALQUER AÇÃO (nesta ordem)
1. `ABMSOL/docs/brief-original.md`
2. `ABMSOL/docs/PLAN.md`  (plano aprovado: arquitetura, Sol-Índice, design system, orçamento de performance, fases 0–7)
3. `ABMSOL/AGENTS.md`, `ABMSOL/docs/USAGE.md`, `ABMSOL/docs/SKILLS.md`, `ABMSOL/docs/phases/README.md`
4. `ABMSOL/LOOP_STATE.md`
Referência de padrão (somente leitura): `BarbaraBelluci/` e `_ClienteBase/`.
NÃO copie chrome, cursor, header ou hero de outros clientes (regra anti-clone do AGENTS.md).

DECISÕES (edite antes de enviar; o que ficar assim vale como aprovado)
- D1 Tipografia: A (Syne + Instrument Sans + JetBrains Mono)
- D2 Headline: "Tecnologia que funciona. Do suporte do dia a dia ao site premium."
- D3 Voz: "nós" (estúdio) no corpo; "eu" na seção "Quem assina"
- D4 Analytics: Umami
- D5 Bárbara e Miguel: apenas origem do nome (A·B·M + SOL), sem fotos, sem nome completo do Miguel
- D6 Diagnóstico gratuito: checklist rápido por WhatsApp, escopo limitado (detalhar no brief)
- D7 URL: `*.vercel.app` com noindex até o domínio final
- D8 Conceitos: 1 site premium, 1 institucional, 1 sistema/painel (marcas fictícias, rótulo "Projeto conceito")
- D9 Remover dependências: three, @types/three, axios, react-hook-form, zod, vanilla-tilt
- D10 @playwright/test: não instalar (usar só o Playwright MCP para validar)
- WhatsApp: 17991446829  → `5517991446829`
- Já decidido: sem preços ("solicite uma proposta"), sem formulário, sem banner de cookies, sem WebGL, só PT-BR, Next 14 com `output: 'export'`.

TAREFA: executar SOMENTE a FASE 0 do PLAN.md (§5). Não implemente design, hero, seções nem páginas.
1. `npm install` em `ABMSOL/`.
2. Remover as dependências de D9 e o código que dependa delas (`lib/three.ts`, `types/vanilla-tilt.d.ts`, etc.). Garantir que `npm run build` continue verde.
3. Remover do scaffold o que o plano descarta: `components/layout/LoadingScreen.tsx`, `WhatsAppChat.tsx`, `components/legal/CookieConsent.tsx` (e referências em `AppShell`/`layout`). Ajustar `lib/contact.ts` com o número acima e `lib/brand.ts`/`lib/site.ts` para o nome ABMSOL vir de um único lugar (`site.config.json`).
4. Criar 3 regras em `ABMSOL/.cursor/rules/`: `abmsol-design.mdc`, `abmsol-motion-perf.mdc`, `abmsol-content.mdc`, derivadas de PLAN.md §3, §4 e das regras de conteúdo do brief (zero placeholder, proibido inventar depoimento/cliente/métrica, rótulo "Projeto conceito"). Frontmatter correto (description, alwaysApply).
5. Preencher `ABMSOL/docs/INTAKE.md` a partir do brief e do PLAN.md. Tudo que depende de mim e não foi decidido acima fica listado como PENDENTE na seção de bloqueios, sem inventar conteúdo.
6. Rodar `/brief-architect` (gera BRIEF.md, DIFFERENTIATION.md e phases/*.md) e depois `/brief-reviewer`. Aplicar as skills `frontend-design`, `design-taste-frontend` e `ui-ux-pro-max`. Seção "AI Tools" do BRIEF: apenas o que o PLAN permite (sem WebGL, sem registries pagos).
7. Atualizar `ABMSOL/LOOP_STATE.md`.

CRITÉRIO DE ACEITE (verifique e mostre a evidência de cada item)
- `npm run build` e `npm run lint` verdes em `ABMSOL/`.
- `package.json` sem three, axios, react-hook-form, zod, vanilla-tilt.
- `rg -i "cliente base|meu-cliente|exemplo.com.br" ABMSOL --glob '!node_modules' --glob '!docs/prompts/**'` sem resultados relevantes.
- 3 regras `abmsol-*` criadas e válidas.
- `INTAKE.md` sem `[PREENCHER]`; pendências em lista explícita.
- Relatório do `brief-reviewer` = aprovado (ou lista de correções feitas e reaprovado).
- Nenhum arquivo alterado fora de `ABMSOL/` (confira com `git status` nos outros repositórios).

AO TERMINAR
Pare. Entregue: resumo do que foi feito, lista do que ainda preciso fornecer (logo em vetor, fotos do André, texto de "Quem assina", etc.), e peça minha aprovação do BRIEF.md antes da Fase 1. Não avance de fase sozinho.
```
