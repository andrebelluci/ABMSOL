# Fases de implementação

Arquivos `01-*.md` … `06-*.md` são **gerados pelo brief-architect** após você preencher `docs/INTAKE.md`.

- `01-design-system-TEMPLATE.md` · `02-chrome-TEMPLATE.md` · `03-hero-TEMPLATE.md` · `04-sections-home-TEMPLATE.md` · `05-inner-pages-TEMPLATE.md` — seeds do architect; **não** executar diretamente
- `05-legal-blog-TEMPLATE.md` — blog/legal quando `features.blog`
- `03b-cursor-e-sol-interativo.md` — **ABMSOL:** cursor-nó v2 + sol camada 2, pós-lançamento

Não crie fases manualmente — o architect quebra o `BRIEF.md` em lotes executáveis pelo `phase-executor`.

## Ordem padrão

| Arquivo | Escopo |
|---------|--------|
| `00-upgrade-next16.md` | **ABMSOL:** upgrade para Next 16 antes de tudo |
| `01-design-system.md` | `globals.css`, tokens, tipografia, `tailwind.config`, fontes |
| `02-chrome.md` | Loading, cursor, scrollbar, header, footer, nav mobile, WhatsApp |
| `03a-hero-sol.md` | HeroSection + Sol-Índice camadas 0/1 (03b: cursor e camada 2, pós-lançamento) |
| `04-sections-home.md` | Demais seções da home, uma instrução por bloco |
| `05-inner-pages.md` | Rotas internas + `generateStaticParams` |
| `06-polish-qa.md` | SEO, sitemap, JsonLd, performance, deploy |

Cada fase deve terminar com: `npm run build` + `npm run lint` + checklist QA.
