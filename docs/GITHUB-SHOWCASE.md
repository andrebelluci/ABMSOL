# GitHub & showcase — apresentação profissional

> Categoria **4** do ecossistema Awwwards: o código não basta — a **entrega** conta para GitHub, portfólio, recrutadores e jurados.

Isso **não** é skill de desenvolvimento. É checklist **pós-projeto** (após fase 06).

## Para que serve

| Objetivo | Por que importa |
|----------|-----------------|
| **GitHub / portfólio** | Recrutadores e devs avaliam README + demo antes do código |
| **Case study Awwwards** | Jurados veem contexto, processo e referências |
| **Dharmalabs / leads** | Mockup com narrativa vende melhor que só URL |
| **Submissão SOTD** | Site + documentação + vídeo de qualidade |

**Não substitui** o site em si — complementa.

---

## Checklist de entrega

### README.md do repositório

- [ ] Hero visual: screenshot ou GIF do site (não só texto)
- [ ] Link **live** + link **mockup** dharmalabs se aplicável
- [ ] Stack em 1 linha (Next 14, GSAP, Lenis…)
- [ ] Seção **Design** linkando para `docs/DESIGN.md`
- [ ] Comandos: `npm install`, `npm run dev`, `npm run build`
- [ ] Créditos: cliente, fotos, fontes licenciadas
- [ ] Badge opcional: Lighthouse, deploy status

### docs/DESIGN.md

- [ ] Preencher template `docs/DESIGN.md`
- [ ] Conceito nomeado (não "site moderno")
- [ ] Tabela de referências com URLs
- [ ] Chrome explicado (cursor, hero, motion)
- [ ] Decisões técnicas (por que static export)

### Vídeo / GIF demo

- [ ] Gravação **1080p**, 30–60s, mostrando scroll + interações
- [ ] Desktop + trecho mobile (5–10s)
- [ ] Sem áudio ou música discreta
- [ ] Hospedar: YouTube (unlisted), Vimeo, ou GIF no README (&lt; 10MB)
- [ ] Ferramentas: OBS, ScreenToGif, Cleanshot

### Repositório GitHub

- [ ] `.gitignore` sem `node_modules`, `.env`, `out/` (ou publicar `out/` só se repo demo)
- [ ] Topics: `nextjs`, `gsap`, `tailwindcss`, `awwwards-inspired`, nicho (`healthcare`, `food`, etc.)
- [ ] Licença clara se código público
- [ ] **Não** commitar assets pesados sem LFS — WebP comprimido

### Awwwards (se submeter)

- [ ] URL live estável
- [ ] Case study: conceito, desafio, solução, stack
- [ ] Créditos de equipe
- [ ] Mobile testado em dispositivo real
- [ ] Performance aceitável (não precisa 100, mas sem jank)

---

## Quando fazer no loop

```
Fases 01–06 → site pronto → QA verde
    → preencher DESIGN.md
    → gravar vídeo
    → atualizar README do repo
    → (opcional) submeter Awwwards
```

Pode pedir ao agente: *"Preencha docs/DESIGN.md a partir do BRIEF e DIFFERENTIATION"* — **sem** rodar automaticamente em cada fase (economia de tokens).

---

## README — bloco sugerido (copiar)

```markdown
## Preview

![Demo](./docs/assets/demo.gif)

[Ver site ao vivo](https://...) · [Case study / DESIGN.md](./docs/DESIGN.md)

## Stack

Next.js 14 · TypeScript · Tailwind · GSAP · Lenis · Framer Motion

## Design

Conceito: **[Nome]** — [uma linha]

Documentação completa em [docs/DESIGN.md](./docs/DESIGN.md).
```

Crie `docs/assets/` para screenshots e GIFs (não vão para `out/` do Next).

---

## O que **não** fazer

- README só com bullet points genéricos
- Screenshot de template / placeholder óbvio
- Repo sem link live
- Vídeo tremido ou só hero estática
- Copiar DESIGN.md idêntico entre clientes

---

## Relação com agentes

| Momento | Ação |
|---------|------|
| brief-architect | Pode esboçar "Concept name" que vira DESIGN.md depois |
| Fase 06 | Mencionar preencher DESIGN.md na checklist |
| Pós-launch | Você grava vídeo; agente ajuda a redigir README/DESIGN |

MCP Playwright: opcional para capturar screenshots para o README.
