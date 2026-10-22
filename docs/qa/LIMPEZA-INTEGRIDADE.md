# Limpeza de integridade — ABMSOL (22/10/2026)

> Aplicada **somente no ABMSOL**. Nenhum binário foi aberto ou executado. Não houve `npm install`, build, download, `@latest`, reescrita de histórico nem primeiro commit. `_ClienteBase` e os demais projetos foram só lidos. A Fase 00 **não** foi iniciada: ela só começa depois que você revisar este relatório (gate P15).

## 1. Ações realizadas

| # | Ação | Arquivos | Antes → Depois | Resultado |
|---|------|----------|----------------|-----------|
| 1 | `scene2d.dll` movido sem abrir | `components/legal/scene2d.dll` → `D:\andre\quarentena\scene2d.dll` | **Antes e depois idênticos:** SHA-256 `9DD51466B84BA17566B3E98A4CB4AE8E99830478D21CAAC091FE34E4A1622A21`, 23.552 bytes, data do arquivo 2023-07-08 00:54:08 | ✅ Origem não existe mais; `rg scene2d` fora de `docs/` e `LOOP_STATE.md` = **nenhuma referência** (código, `package.json`, configs, scripts). `components/legal/` ficou só com `LegalPageLayout.tsx` |
| 2 | `.gitignore` | `.gitignore` | Acrescentado bloco "Binarios nativos": `*.dll *.exe *.so *.dylib *.node *.msi *.scr`. Depois: 787 B, `dec185df…35e0` | ✅ |
| 3 | MCP do projeto | `.cursor/mcp.json` | Antes: 531 B com `shadcn` (autostart `npx -y shadcn@latest mcp`), `21st`, `originkit`, `motionsites` (Supabase). Depois: 23 B, `{ "mcpServers": {} }`, `d8e397af…de02` | ✅ Sem servidores; JSON validado. **Aviso:** o Playwright MCP **não** está no `~/.cursor/mcp.json` global (lá só existe `21st-dev-magic`). Nesta sessão há um browser embutido do Cursor (`cursor-ide-browser`), mas o BRIEF e as fases citam "Playwright MCP" para validação. Se quiser validar com Playwright, configure-o você; não instalei nada |
| 4 | `package.json` | `package.json` | Removidas só as 3 entradas `tools:setup`, `tools:setup:motion`, `tools:setup:21st`. Depois: 1.620 B, `2ae65c9e…f3d5`. Scripts restantes: `dev, dev:clean, generate:images, prebuild, build, prestart, start, lint, sitemap, deploy:vercel, deploy:mockup, new:client, intake:portfolio, download:assets` | ✅ JSON válido; nada mais alterado. O arquivo `scripts/setup-agent-tools.mjs` (com `@latest`) **continua no disco**, sem nenhum script que o chame |
| 5 | Skills para quarentena | `.agents/skills/{design-taste-frontend, gsap-core, gsap-scrolltrigger, vercel-react-best-practices}` → `D:\andre\quarentena\skills\` | Hash de pasta idêntico antes/depois: design-taste `d68e8201…`, gsap-core `7143e636…`, gsap-scrolltrigger `fbf55b10…`, vercel `29f19c8f…` (76 arquivos). `skills-lock.json` **não editado** (ainda lista as 8 skills originais) | ✅ Em `.agents/skills/` restaram: `cinematic-scroll`, `frontend-design`, `gpt-taste`, `gsap-react` (as 4 com hash OK) |
| 5b | Documentação ajustada | `AGENTS.md`, `docs/SKILLS.md`, `docs/BRIEF.md` (AI Tools), `docs/phases/00, 01, 03a, 03b, 04, 06`, `docs/PLAN.md`, `docs/AI-TOOLS.md`, `LOOP_STATE.md` | — | ✅ Onde dependia das skills, passou a usar a **documentação oficial do GSAP** (`gsap.context`, `matchMedia`, ScrollTrigger, `useGSAP`; ticker e desempenho na 03b) e as regras do BRIEF/PLAN §4.4 e a documentação do Next/React. Comandos `npx skills add …` em `docs/SKILLS.md` ficaram comentados com "NÃO EXECUTAR sem aprovação". Reinstalação registrada no `LOOP_STATE.md` como pendência futura |
| 6 | Baseline de instruções | `docs/qa/BASELINE-INSTRUCOES.sha256` | 46 arquivos de `.cursor/rules`, `.cursor/skills` e `.agents/skills` (restantes), formato `sha256sum` | ✅ Gerado após a limpeza |
| 9 | Git (sem commit) | — | `git status`: 0 commits, 0 arquivos staged, 29 entradas não rastreadas | ✅ ver §4 |

## 2. Item 7 — diff read-only das skills `.cursor/skills` no `_ClienteBase`

O working tree do `_ClienteBase` tem 3 arquivos **modificados e não commitados** em relação ao HEAD (`450c111`):

| Arquivo | Mudança vs HEAD | Avaliação |
|---------|-----------------|-----------|
| `brief-architect/SKILL.md` (+138/−18) | Nova ordem de leitura (INTAKE com anti-clone, `portfolio-hero-slots.md`, `brief-awwwards.md`, `AI-TOOLS.md`, `ai-tools-suggestions.md`); seção "Ambição visual e referências Awwwards"; checklist anti-convergência; seção "AI Tools" obrigatória no BRIEF (sugestões, aprovadas, proibidas, registries, MotionSites, React Bits) | Texto de fluxo. Sem `curl`/`wget`/`eval`/`base64`/URLs executáveis (busca feita no diff) |
| `brief-reviewer/SKILL.md` (+19) | Dois blocos de checklist: "AI Tools" e "Awwwards e anti-convergência" | Idem |
| `phase-executor/SKILL.md` (+3/−1) | Passa a ler a seção "AI Tools" do BRIEF e menciona usar MCP **shadcn/21st** nas fases 02–04 conforme o BRIEF | Texto de fluxo; **conflita com os vetos do ABMSOL** (MCPs removidos) |

**Comparação com o ABMSOL:** `brief-architect`, `brief-reviewer` e `phase-executor` do ABMSOL são **idênticos byte a byte** (SHA-256) às versões do **working tree** do `_ClienteBase` (as versões modificadas, não as do HEAD). Ou seja, o ABMSOL herdou as edições locais, não commitadas, do boilerplate. Ponto de atenção: o `brief-architect` ainda manda ler as skills `design-taste-frontend` e `gpt-taste`, e o `phase-executor` fala em shadcn/21st. Eu **não** editei esses arquivos (não pedido; alteraria o baseline). Fica como pendência (§5).

## 3. Item 8 — varredura de texto com ≥ 1% de bytes de controle ou UTF-8 inválido

Escopo: todos os 24 projetos sob `www/` (excluídos `node_modules`, `.next`, `.git`), extensões `.md .mdx .ts .tsx .js .jsx .mjs .cjs .json .css .scss .html .svg .txt .yml`. Resultado completo em `D:\andre\quarentena\scan-result.json`.

| Classificação | Projetos | Arquivos |
|---------------|----------|----------|
| **Isolado (só skills; `.dll` fora do escopo de texto)** | `_ClienteBase`, `DivinaPele`, `DraWendyMendes`, `ElianeBorges`, `NajoyClinica`, `OhmMicrofones`, `SpinEstetica`, `VanessaFumagalli`, `VirgoEsteticaEBeleza` | 3 em cada: `.agents/skills/{design-taste-frontend,gsap-core,gsap-scrolltrigger}/SKILL.md` (26% a 43% de controle, UTF-8 inválido), mesmos hashes em todos |
| **Limpo (0 arquivos)** | `ABMSOL` (após a quarentena), `BarbaraBelluci`, `BeatrizeTiago2026`, `cardflow`, `DocePele`, `GaneshaPServicos`, `participantesici`, `Pelle`, `VittaDermatologia`, `VoBelluciApp`, `vo_belluci_gestao_v1`, `_AgencyOS` | 0 |
| **Disseminado** | `AllSucos` e `LimaCitrus` (listas idênticas: LimaCitrus é uma cópia sem `.git`) | **48 cada** |
| Derivado do disseminado | `dharmalabs` | 1: `public/mockups/leads/allsucos/public/products/laranja/Main.js` (cópia de arquivo do AllSucos) |

**Detalhe do disseminado (AllSucos, 48 arquivos):**
- 3 skills `SKILL.md` corrompidas (mesmo padrão, mas **conteúdo diferente** das cópias do boilerplate) e `vercel-react-best-practices/AGENTS.md` (61% de controle).
- **Documentação do projeto corrompida:** `docs/BRIEF.md`, `docs/INTAKE.md`, `docs/prompts/doc-awwwards.md`, `docs/phases/03b-hero-polish.md` (28% a 41%) e `docs/phases/05-legal-blog.md` (100% de controle).
- **Arquivos fora do lugar:** `docs/phases/` contém pastas que não pertencem a ela (`Alphabets`, `Arrows`, `Fraktur`, `Latin`, `Script/Regular/formatters/…`, `Size1..6` etc.) com `Main.js` e `fontdata*.js` (aparência de dados de fontes matemáticas e de formatadores do ESLint). Há `Main.js` também em `public/products/laranja/`, `out/products/laranja/`, `content/`, `docs/assets/images/Regular/` e `.cursor/skills/ui-ux-pro-max/data/stacks/`.
- Interpretação: o AllSucos/LimaCitrus sofreu **dano de armazenamento/extração** (conteúdo trocado entre arquivos e pastas), muito além das skills. É um problema **separado** do ABMSOL. O AllSucos tem Git (`08f1d2e`); não investiguei se o dano está commitado.

**Conclusão:** no conjunto, o problema é **isolado nas skills (e no `.dll`) para o boilerplate e seus 8 derivados**, e **disseminado só no AllSucos/LimaCitrus**.

## 4. Item 9 — `git status` e o que seria commitado (nenhum commit feito)

- Repositório sem commits; **0 arquivos staged**; 29 entradas não rastreadas (`.agents/`, `.cursor/`, `.env.example`, `.eslintrc.json`, `.gitignore`, `AGENTS.md`, `CHECKLIST.md`, `LOOP_STATE.md`, `README.md`, `app/`, `components.json`, `components/`, `content/`, `design-system/`, `docs/`, `lib/`, `next-env.d.ts`, `next.config.js`, `package-lock.json`, `package.json`, `postcss.config.js`, `public/`, `scripts/`, `site.config.json`, `skills-lock.json`, `tailwind.config.ts`, `tsconfig.json`, `types/`, `vercel.json`).
- `git add -n -A .` (simulação, nada staged): **180 arquivos**.
- **Binários:** nenhum `.dll .exe .so .dylib .node .bin .msi .scr .zip .7z .wasm`. Os únicos arquivos com bytes NUL são imagens legítimas: `docs/assets/logo_ig.{jpg,png}`, `public/images/hero-poster.{jpg,webp}`, `public/images/logo/og-default.jpg`, `public/images/og-image.webp`. As 3 últimas são resíduos do boilerplate (`hero-poster`, `og-*`) e devem ser substituídas na Fase 01/06.

## 5. Correções para depois (SEM tocar nesses repositórios agora)

**`_ClienteBase` (boilerplate, privado)**
1. Remover `components/legal/scene2d.dll` num commit novo (não reescrever histórico).
2. Adicionar `*.dll *.exe *.so *.dylib *.node *.msi *.scr` ao `.gitignore`.
3. Reinstalar as skills corrompidas (`gsap-core`, `gsap-scrolltrigger`; `design-taste-frontend` só se você decidir) **somente após verificar fonte e hash de pasta**; investigar `vercel-react-best-practices/AGENTS.md`.
4. Decidir o que fazer com as 3 edições não commitadas em `brief-architect`, `brief-reviewer` e `phase-executor` (commitar ou descartar) e remover as referências a `design-taste-frontend` e a shadcn/21st.
5. Remover do `package.json` os scripts `tools:setup*` (`@latest`) e do `.cursor/mcp.json` os MCPs de terceiros (principalmente `motionsites`).
6. Descobrir por que as cópias corromperam antes de gerar novos projetos a partir dele.

**`NajoyClinica` e `OhmMicrofones` (privados)**
1. Remover `scene2d.dll` num commit novo (já está commitado e enviado: `fc005b7` e `5bf7882`).
2. Substituir/remover as 3 skills corrompidas (também commitadas como binárias) e atualizar o `.gitignore`.
3. Mesmas observações de `package.json` e MCP, se herdadas.

**Outros (fora do escopo pedido)**: `AllSucos`/`LimaCitrus` (dano disseminado, §3) e `dharmalabs` (1 arquivo copiado).

## 6. Pendências restantes

| Item | Dono |
|------|------|
| **Gate:** revisar este relatório antes de liberar a Fase 00 | André |
| `skills-lock.json` ainda lista as 4 skills em quarentena; decidir se atualiza (não editei, como pedido) | André |
| `brief-architect` e `phase-executor` (cópias do ABMSOL) ainda citam `design-taste-frontend`/`gpt-taste` e shadcn/21st; ajustar quando você autorizar editar essas skills | André |
| ~~Playwright MCP não configurado~~ → **resolvido (22/10/2026):** André autorizou o Cursor Browser (`cursor-ide-browser`) para validação; BRIEF, PLAN, DIFFERENTIATION, INTAKE e fases 02, 03a, 03b, 05 e 06 atualizados | — |
| `scripts/setup-agent-tools.mjs` (com `@latest`) e `components.json` (shadcn) ainda existem; decidir remoção | André |
| Reinstalar skills GSAP / vercel: **só com sua aprovação**, após verificar fonte e hash | André |
| Quarentena em `D:\andre\quarentena\` (dll, skills, `scan-result.json`) mantida; excluir quando você decidir | André |
| Repositório privado; **não publicar sem cópia saneada** (docs herdados citam nomes de clientes, P20) | André |
| P16 (wordmark) na Fase 01; P18 e P19 ações suas | André |
| Primeiro commit do ABMSOL não feito | André (após gate) |
