---
name: qa-static-export
description: >-
  QA pós-fase para sites Next.js static export: build, lint e checklist
  manual. Use após phase-executor. Playwright só se usuário pedir.
disable-model-invocation: true
---

# QA Static Export

Validação leve após cada fase. Não implementa features — verifica e reporta.

## Comandos (rodar)

```bash
npm run build
npm run lint
```

Se falhar, reportar erros com arquivo:linha e sugerir correção mínima.

## Checklist

Ler e marcar itens relevantes de `docs/prompts/qa-checklist.md` conforme a fase:

| Fase | Foco do checklist |
|------|-------------------|
| 01 | Build, cores/tokens, layout base |
| 02 | Chrome, cursor, scrollbar, nav, motion |
| 03 | Hero, vídeo mobile, animação load |
| 04–05 | Seções, rotas, SEO parcial |
| 06 | SEO completo, sitemap, deploy |

Cruzar com `docs/DIFFERENTIATION.md` na fase 02+.

## Relatório

```markdown
# QA — Fase [XX]

## Build: [PASS | FAIL]
## Lint: [PASS | FAIL]

## Checklist
- [x] item
- [ ] item — [observação]

## Anti-clone visual (manual)
[O chrome parece distinto do boilerplate default?]

## Ações sugeridas
1. ...

## Playwright
Não executado automaticamente. Use MCP se precisar debug visual pontual.
```

## Atualizar LOOP_STATE.md

Registrar QA da fase. Se FAIL, bloquear próxima fase até corrigir.
