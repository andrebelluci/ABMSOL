# Integridade do repositório — ABMSOL (antes da Fase 00)

> Investigação **somente leitura** em 21/10/2026. Nada foi executado, carregado, instalado, compilado ou removido. O `.dll` só teve os bytes lidos (hash, cabeçalho, entropia).
> Nenhuma correção foi aplicada. Aguardando decisão do André.

## Resumo e grau de risco

| # | Achado | Risco | Observação |
|---|--------|-------|------------|
| 1 | `components/legal/scene2d.dll`: blob opaco, **não é PE**, sem referências, mesmo hash em 10 projetos | **Médio** (higiene/procedência); baixo de execução | Origem anterior ao boilerplate; procedência desconhecida |
| 2 | 3 skills com `SKILL.md` ilegível (corrompidas) | **Médio** | `design-taste-frontend`, `gsap-core`, `gsap-scrolltrigger` (a 4ª divergente, `vercel-react-best-practices`, ver §4) |
| 3 | Scripts/MCP que baixam e executam código externo sem versão fixa | **Médio** | `npx -y …@latest`, MCP remotos; sem `pre/postinstall` |
| 4 | Repositórios com o binário no histórico | **Baixo** | Todos privados |

## 1. Origem do `scene2d.dll`

- **ABMSOL:** o repositório Git local está **sem commits** (`main` sem histórico) e o arquivo está **não rastreado**; portanto `git log --follow` não retorna nada e **não há histórico do ABMSOL a limpar**. O arquivo veio da cópia do `_ClienteBase` pelo `new-client`.
- **Boilerplate `_ClienteBase`** (origin `github.com/andrebelluci/_ClienteBase`, privado): `git log --follow` mostra **um único commit**, `934534d` (2026-07-21, autor `andrebelluci`, "Consolida Cliente Base como boilerplate Next.js com loop de agentes"), `Bin 0 -> 23552 bytes`. Os commits anteriores (2026-06-07 a 2026-06-09, projeto original "vitta-dermatologia") **não** continham o arquivo; ele entrou na consolidação.
- **Propagação:** mesmo arquivo (SHA-256 idêntico) em `ABMSOL`, `DivinaPele`, `DraWendyMendes`, `ElianeBorges`, `NajoyClinica`, `OhmMicrofones`, `SpinEstetica`, `VirgoEsteticaEBeleza` e `_ClienteBase`. Em `NajoyClinica` (commit `fc005b7`, 2026-08-04) e `OhmMicrofones` (`5bf7882`, 2026-07-22) ele **já está commitado e enviado** ao GitHub (privados). `AllSucos`/`LimaCitrus` e `dharmalabs`/`BarbaraBelluci` não o possuem.
- **Data de modificação do arquivo:** 2023-07-08 00:54:08, **anterior** ao boilerplate (jun/2026). Foi copiado de algum lugar de fora do repositório (a data é preservada na cópia). O momento e a origem exatos dessa cópia **não são recuperáveis pelo Git**.
- **Conclusão (item 3):** veio do boilerplate `_ClienteBase`, não foi criado no ABMSOL. A origem anterior (pasta ou projeto de 2023) é desconhecida.

Outros binários (`.dll .exe .so .dylib .node .bin`, `.msi .bat .cmd .ps1 .sh .vbs .jar .wasm .scr`) fora de `node_modules`: **nenhum** no ABMSOL; no `_ClienteBase` rastreado, só este `.dll`.

Referências a `scene2d` no ABMSOL (`rg -uu`, exceto `node_modules`/`.next`): **apenas documentação** (`LOOP_STATE.md`, `docs/INTAKE.md`, `docs/CHANGELOG-REVISAO.md`). Nenhuma em `package.json`, `next.config.*`, `.cursor/`, `scripts/`, nem em código-fonte. Nada importa ou carrega o arquivo.

## 2. Hash e tipo

| Campo | Valor |
|-------|-------|
| Caminho | `components/legal/scene2d.dll` |
| Tamanho | 23.552 bytes (46 × 512) |
| SHA-256 | `9DD51466B84BA17566B3E98A4CB4AE8E99830478D21CAAC091FE34E4A1622A21` |
| MD5 | `D693AAE534B9D98E49CE975C4F38F5E1` |
| Primeiros bytes | `AE E3 48 5C C0 F0 D7 28 1D 77 09 A0 …` |
| Cabeçalho `MZ` (4D 5A)? | **Não** |
| Entropia | 7,993 bits/byte (aparência de dados cifrados/comprimidos/aleatórios) |
| Strings legíveis | Nenhuma coerente (nem "This program", nem nomes de DLL/exports) |

**Interpretação:** apesar da extensão `.dll`, o arquivo **não é um executável PE válido**. É um blob opaco de alta entropia. Sem o cabeçalho `MZ`, o Windows não o carregaria como DLL, e nada no projeto o referencia. Isso reduz o risco de execução, mas não explica o que é (pode ser um blob cifrado, dado aleatório ou resto de outro arquivo). **Não** foi aberto em disassembler nem enviado a serviço externo.

## 3. Comparação com o boilerplate

O arquivo do ABMSOL é **byte a byte idêntico** ao de `_ClienteBase` (mesmo SHA-256) e o `_ClienteBase` local está no mesmo commit do remoto (`450c111`). Ou seja, o ABMSOL herdou o arquivo do boilerplate; ele não é uma alteração local. Não há versão "anterior limpa" no histórico do boilerplate: o arquivo nunca existiu antes de `934534d`.

## 4. Skills × `skills-lock.json`

O `computedHash` do lock é o **SHA-256 da pasta da skill**: concatenação, em ordem alfabética, de `caminho-relativo` + `conteúdo` de cada arquivo (algoritmo reproduzido e validado com `frontend-design`, que bate).

| Skill (`.agents/skills`) | Resultado | Detalhe |
|--------------------------|-----------|---------|
| `cinematic-scroll` | OK | — |
| `frontend-design` | OK | — |
| `gpt-taste` | OK | — |
| `gsap-react` | OK | — |
| `design-taste-frontend` | **DIVERGE** | `SKILL.md` ilegível: 7.832 de 21.537 bytes são caracteres de controle; trechos de SVG com bytes trocados. O Git o trata como binário |
| `gsap-core` | **DIVERGE** | `SKILL.md` ilegível (6.224 de 15.046 bytes de controle); cabeçalho `77 1C 01 …` em vez de `---` |
| `gsap-scrolltrigger` | **DIVERGE** | `SKILL.md` ilegível (4.722 de 18.686 bytes de controle) |
| `vercel-react-best-practices` | **DIVERGE** | `AGENTS.md` (108 KB) está em **uma linha só**, com 6 bytes de controle; os demais arquivos parecem íntegros. Não foi possível isolar o arquivo divergente sem a fonte original |

- Resultado idêntico no `_ClienteBase` (mesmos hashes de pasta) e em 9 projetos; `AllSucos`/`LimaCitrus` também divergem, com **conteúdo diferente** nas mesmas skills, de **mesmo tamanho** (indício de que o dano é do processo de cópia/armazenamento, e não de uma edição pontual).
- As três corrompidas entraram no commit `934534d` do boilerplate já como `Bin` (não são texto).
- **Impacto:** `gsap-core` e `gsap-scrolltrigger` são citadas nas fases 03a, 04 e 03b; o agente não consegue ler esses `SKILL.md`. A nota anterior ("só a design-taste está ilegível") estava **incompleta**.
- **Varredura de conteúdo suspeito** (`curl`, `wget`, `iex`, `eval`, `base64`, `child_process`, "ignore previous instructions", URLs de `.sh/.ps1/.exe/.zip`) em `.agents/` e `.cursor/`: **sem ocorrências maliciosas** nos arquivos legíveis. O único URL nos arquivos corrompidos é `http://www.w3.org/2000/svg` (namespace SVG). As skills de `.cursor/skills/` não constam no lock e não puderam ser validadas por hash.
- Observação: `.cursor/skills/brief-architect` e `brief-reviewer` aparecem como modificadas no `_ClienteBase` (working tree), ou seja, o boilerplate local tem alterações não commitadas nelas.

## 5. Scripts e superfícies de execução externa

`package.json` **não tem** `preinstall`, `install`, `postinstall` nem `prepare`.

| Script | Comando | Executa/baixa algo externo? |
|--------|---------|-----------------------------|
| `dev`, `dev:clean` | `next dev`, limpeza de `.next` | Não |
| `generate:images` / `prebuild` | `scripts/generate-images.mjs` (sharp, local) | Não |
| `build` | `next build && node scripts/generate-sitemap.js` | Não |
| `prestart` | verifica `out/index.html` | Não |
| **`start`** | `npx --yes serve@14 out -l 3000` | **Sim:** baixa `serve@14` do npm (versão major fixa) |
| `lint` | `next lint` | Não (removido no Next 16) |
| `sitemap` | `node scripts/generate-sitemap.js` | Não |
| **`deploy:vercel`** | `scripts/deploy-vercel.mjs` → `npx vercel …` | **Sim:** baixa/executa o CLI da Vercel |
| `deploy:mockup` | `scripts/deploy-mockup.js` (roda `npm run build`) | Indireto |
| **`new:client`** | `scripts/new-client.mjs` → `git init` + `npm install` | **Sim:** instala dependências |
| `intake:portfolio` | `scripts/sync-portfolio-intake.mjs` | Não verificado (leitura/escrita local) |
| **`tools:setup`, `:motion`, `:21st`** | `scripts/setup-agent-tools.mjs` → `npx -y motion-ai@latest`, `npx -y shadcn@latest`, `@21st-dev/cli` | **Sim, sem versão fixa** (`@latest`, `-y`) |
| `download:assets` | `scripts/download-assets.js` (lista vazia/comentada) | Só se a lista for preenchida |

Outros pontos:
- **`.cursor/mcp.json`** executa `npx -y shadcn@latest mcp` automaticamente ao abrir o projeto e aponta para 3 MCPs remotos: `21st.dev`, `mcp.originkit.dev` e **`xgdzyqfalbibzelpdpvr.supabase.co/functions/v1/mcp`** (função Supabase de terceiro, "motionsites", sem autenticação e sem identificação clara do dono).
- Os scripts `port-html-*.mjs`, `patch-asset-paths.mjs`, `sync-portfolio-intake.mjs` não foram lidos linha a linha; a busca por rede/exec (`http(s)://`, `child_process`, `exec`, `spawn`, `curl`, `wget`, `fetch(`, `eval(`) neles não achou nada além dos listados acima.

## Recomendações (nenhuma aplicada)

**`scene2d.dll` (risco médio, ação simples)**
1. **Quarentena fora do repositório:** mover o arquivo (sem abri-lo) para uma pasta fora de `www/`, por exemplo `D:\andre\quarentena\scene2d.dll`, guardando SHA-256 e este relatório. Não enviar a serviços externos sem sua decisão.
2. **Remover do ABMSOL:** como o repo do ABMSOL **não tem commits**, basta excluir o arquivo antes do primeiro commit. Não há histórico a limpar.
3. **Boilerplate e projetos:** remover do `_ClienteBase` num commit novo (e do `NajoyClinica` e `OhmMicrofones`, onde já está commitado). **Reescrever o histórico (`git filter-repo`) só se você quiser** apagar o binário também dos commits antigos; como os 3 repositórios são **privados** e o arquivo não é um PE, **não recomendo** reescrever agora (custo/risco de force-push maior que o benefício). Se algum dia o repositório ficar público, aí sim limpar o histórico antes.
4. Adicionar `*.dll`, `*.exe`, `*.so`, `*.dylib`, `*.node` ao `.gitignore` do boilerplate.

**Skills (risco médio)**
5. Reinstalar `gsap-core`, `gsap-scrolltrigger` e `design-taste-frontend` a partir da fonte (`greensock/gsap-skills`; para a última, a fonte atual deu 404), e conferir o hash da pasta com o algoritmo acima. Enquanto isso, a Fase 03a/03b não deve depender dessas skills; usar a documentação oficial do GSAP.
6. Investigar `vercel-react-best-practices/AGENTS.md` (arquivo de 1 linha, 6 bytes de controle) e, se não for essencial, remover.
7. Descobrir por que as cópias ficaram corrompidas (indício de problema na cópia/armazenamento do boilerplate) antes de gerar novos projetos a partir dele.

**Scripts e MCP (risco médio)**
8. Fixar versões (`motion-ai@x.y.z`, `shadcn@x.y.z`) ou desativar `tools:setup*`; manter `serve@14` e `vercel` apenas se necessário.
9. Revisar o MCP `motionsites` (Supabase de origem desconhecida): desativar por padrão neste projeto até conhecer o dono.

**Antes da Fase 00:** a fase pode seguir sem corrigir tudo, mas recomendo no mínimo (a) quarentena do `.dll` e (b) nenhuma execução de `tools:setup*` ou de MCPs remotos novos. Decisão sua.
