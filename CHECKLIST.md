# Checklist — novo projeto

## Setup

- [ ] Rodar `npm run new:client -- NomeDoCliente` em `_ClienteBase` (ou copiar manualmente)
- [ ] Atualizar `site.config.json` (url, features)
- [x] ~~`npm run tools:setup`~~ removido no ABMSOL (sem MCPs de terceiros; `.cursor/mcp.json` vazio)
- [ ] Cursor → Settings → MCP → ativar servidores do projeto
- [ ] Resetar `LOOP_STATE.md` para o novo cliente
- [ ] Ler `docs/USAGE.md`

## Loop de criação

- [ ] Preencher `docs/INTAKE.md` (análise externa + `npm run intake:portfolio`)
- [ ] Rodar `/brief-architect`
- [ ] Rodar `/brief-reviewer` — corrigir se rejeitado
- [ ] Aprovar `docs/BRIEF.md` e `docs/DIFFERENTIATION.md`
- [ ] Fase 01 → QA
- [ ] Fase 02 (chrome único) → QA
- [ ] Fase 03 (hero) → QA
- [ ] Fase 04 (seções home) → QA
- [ ] Fase 05 (páginas internas) → QA
- [ ] Fase 06 (polish) → QA
- [ ] Showcase: `docs/DESIGN.md` + README + vídeo (`docs/GITHUB-SHOWCASE.md`)

- [ ] Python instalado (ui-ux-pro-max)
- [ ] Skills em `.agents/skills/` presentes após duplicar (ou rodar comandos em `docs/SKILLS.md`)

## Mockup dharmalabs

- [ ] `slug` em `site.config.json` = pasta em `mockups/leads/`
- [ ] `npm run deploy:mockup`
- [ ] Testar `https://dharmalabs.com.br/{slug}/?skip_intro=1`

## Produção

- [ ] `npm run build` (sem `NEXT_PUBLIC_BASE_PATH`)
- [ ] Enviar `out/` para o `public_html` do domínio
