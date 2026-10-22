# Fase 02 — Chrome

> Executar com `/phase-executor`. Ler `docs/BRIEF.md`, `docs/DIFFERENTIATION.md`, este arquivo e `AGENTS.md`. **Reescrever o scaffold**: não entregar chrome genérico do boilerplate.
> Pré-requisito: fase 01 concluída (tokens e primitivos).

## Escopo

| Arquivo | Ação |
|---------|------|
| `components/layout/Header.tsx` | **Criar**: barra fina sólida, `mark-simple` (≥ 28–32 px) + wordmark SVG, atributos `data-cursor-*`, 4 links + botão WhatsApp, nó menta no link ativo |
| `components/layout/MobileNav.tsx` | **Criar** (client): Trail Index sheet (ver DIFFERENTIATION), focus trap, `Esc`, retorno de foco |
| `components/layout/Footer.tsx` | **Criar**: assinatura da trilha, WhatsApp, "Rio Preto (SP) · atendimento online", link `/privacidade/`; e-mail só se P4 |
| (cursor) | **Não implementar o cursor nesta fase** (vai para a 03b). Remover o `CustomCursor` do boilerplate do `AppShell` se ainda houver referência. Apenas **adicionar atributos `data-cursor`, `data-cursor-label`, `data-cursor-theme`, `data-cursor-avoid`** em links, botões, menu, WhatsApp e seções |
| `components/layout/WhatsAppBar.tsx` | **Criar** (client): barra inferior no mobile, surge depois do hero e some no CTA final; sem widget flutuante |
| `components/ui/WhatsAppLink.tsx` | **Criar** (client leve): link `wa.me` com `?text=` e evento `whatsapp_click` (stub até a fase 06) |
| `components/providers/SmoothScroll.tsx` | Lenis só `pointer: fine` e sem reduced-motion; integra ScrollTrigger; scroll nativo no mobile |
| `components/layout/AppShell.tsx` | Orquestrar chrome (skip link, Header, MobileNav, Footer, WhatsAppBar); **sem cursor** |
| `app/globals.css` | Scrollbar (trilho marinho, thumb dourado 8 px), classe `html.js`, skip link |
| `lib/whatsapp.ts` | Mensagens contextuais por serviço/seção |

**Não tocar:** hero (03a), seções (04), páginas internas (05), `components/cursor/` (03b).

## DIFFERENTIATION (resumo)
```
- Cursor: **adiado para a 03b**; aqui só o contrato de atributos `data-cursor-*` (ver DIFFERENTIATION F3)
- Scrollbar: track navy-900, thumb gold 8px/4px
- Nav mobile: Trail Index sheet (painel do rodapé, trilha dourada vertical, nós numerados 01–04, WhatsApp fixo)
- Header: barra fina sólida, sem glass; `mark-simple` ≥ 28–32 px (a troca/cross-fade a partir do sol vem na 03a)
- Mobile nav: gatilho com rótulo **"Menu"**, `aria-expanded`, `inert` no fundo, **esconde a `WhatsAppBar`** ao abrir; `clip-path` testado com CPU 4×/6× e fallback para opacidade
- Page transitions: fade de **entrada** via `template.tsx` (≤ 250 ms), sem `exit`/`AnimatePresence`
- Footer: trilha termina no núcleo; WhatsApp primário
- Loading: nenhum
```

## Critérios de aceite
- [ ] Chrome diferente do anti-clone listado no INTAKE (checar matriz em DIFFERENTIATION).
- [ ] Navegação 100% por teclado (Tab, Shift+Tab, Esc); focus trap no `MobileNav`; skip link funciona.
- [ ] Alvos de toque ≥ 48×48 px; CLS do header = 0.
- [ ] **Sem** cursor custom e **sem** Lenis em emulação mobile (375 px, `pointer: coarse`).
- [ ] WhatsApp funcional: URL `https://wa.me/5517991446829?text=...` com mensagem codificada.
- [ ] `prefers-reduced-motion`: nav sem animação de movimento; transição de rota desligada.
- [ ] Trail Index sheet: `aria-expanded` no gatilho "Menu", `inert` no fundo, `WhatsAppBar` oculta quando aberto; com CPU 4× e 6× (Cursor Browser (MCP `cursor-ide-browser`)) o `clip-path` não passa de 50 ms por frame, senão usar fallback de opacidade.
- [ ] `template.tsx` aplica só fade de entrada ≤ 250 ms; `rg "AnimatePresence" app components` sem `exit` de rota.
- [ ] Atributos `data-cursor*` presentes em todos os elementos interativos do chrome (`rg "data-cursor" components/layout`).
- [ ] Header/footer em todas as rotas via `AppShell`; nenhuma referência a `LoadingScreen`, `WhatsAppChat`, `CookieConsent`.
- [ ] `'use client'` apenas em `MobileNav`, `WhatsAppBar`, `WhatsAppLink`, `SmoothScroll`.

## Skills
`gsap-next-motion`, `gsap-react`, `frontend-design`. Regra `abmsol-motion-perf`.

## QA
`npm run build` · `npm run lint` · testar 375 px e 1440 px · Cursor Browser (MCP `cursor-ide-browser`) (Tab/Esc, emulação mobile) · `/qa-static-export`

## Referências
- `docs/BRIEF.md` (Chrome Identity, Mobile-First)
- `docs/DIFFERENTIATION.md`
