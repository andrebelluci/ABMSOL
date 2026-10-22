# Fase 02 — Chrome (TEMPLATE)

> **Não executar este arquivo.** O brief-architect personaliza para `02-chrome.md`.  
> Base: `docs/DIFFERENTIATION.md`.

## Escopo

| Arquivo | Ação |
|---------|------|
| `components/layout/LoadingScreen.tsx` | Boot / intro conforme DIFFERENTIATION |
| `components/layout/CustomCursor.tsx` | Desktop only; labels opcionais |
| `components/providers/SmoothScroll.tsx` | Lenis + integração ScrollTrigger |
| `components/layout/Header.tsx` | **Criar** — nav desktop + trigger mobile |
| `components/layout/Footer.tsx` | **Criar** — NAP, links, redes |
| `components/layout/AppShell.tsx` | Orquestrar chrome |
| `components/layout/WhatsAppChat.tsx` | FAB + link `lib/whatsapp.ts` |
| `app/globals.css` | Scrollbar custom, seleção, grain opcional |

**Substituir** o scaffold default — não entregar chrome genérico do boilerplate.

## DIFFERENTIATION (copiar do BRIEF)

```
- Cursor: [...]
- Scrollbar: [...]
- Nav mobile: [...]
- Header: [...]
- Footer: [...]
- Loading: [...]
```

## Critérios de aceite

- [ ] Chrome único vs anti-clone do INTAKE
- [ ] Mobile sem cursor custom
- [ ] WhatsApp funcional com mensagem padrão
- [ ] Header/footer em todas as rotas via AppShell

## QA

`npm run build` · testar 375px e 1440px · `/qa-static-export`
