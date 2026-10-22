# Validação — o que o Cursor Browser realmente faz

> Teste em 22/10/2026, **sem instalar nada**, na aba `http://localhost:3000/` (viewId `c5333b`). Ferramenta: MCP `cursor-ide-browser` (`browser_cdp`, `browser_take_screenshot`, `browser_press_key`, `browser_snapshot`). Nenhum `@playwright/test`, nenhum Lighthouse CLI.

## Capacidades verificadas nesta sessão

| Capacidade | Resultado | Como foi verificado |
|------------|-----------|---------------------|
| Redimensionar viewport | **Sim** | `Emulation.setDeviceMetricsOverride` → `innerWidth×innerHeight` passou de 804×602 para **375×667**, `devicePixelRatio` 2 |
| Screenshot | **Sim** | `browser_take_screenshot` (PNG). O arquivo foi para o temp do Cursor, não para `docs/screenshots/` do repo |
| `prefers-reduced-motion` | **Sim** | `Emulation.setEmulatedMedia` `features: [{name:"prefers-reduced-motion", value:"reduce"}]` → `matchMedia(...).matches === true` |
| Throttling de CPU | **Sim** | `Emulation.setCPUThrottlingRate` `rate:4`: loop de 50 ms fez **32.153** iterações; com `rate:1`, **169.887** (~5×). Rate 6 não foi medido, mas o comando aceita o parâmetro |
| `getComputedStyle` / DOM | **Sim** | `Runtime.evaluate`: h1 existe; cor `rgb(28, 26, 23)` |
| `Performance.getMetrics` | **Sim** | Métricas de processo (FMP, DCL, heap, layout). **Não** devolve LCP/CLS/INP do Web Vitals |
| Teclado (`Tab`, `Esc`) | **Sim (schema)** | `browser_press_key` existe; não exercitado nesta sonda |
| Snapshot de acessibilidade | **Sim (schema)** | `browser_snapshot` (árvore a11y) |
| Lighthouse | **Não** | `Lighthouse.collect` → *wasn't found*. Sem domínio Lighthouse neste CDP |
| Trace/perfil como relatório | **Incerto** | `Tracing.start` / `Tracing.end` não falharam, mas **não** geraram arquivo de trace utilizável nesta sonda. Não usar como substituto do Lighthouse |
| Amostragem de pixels compositados | **Não** | Não há ferramenta que devolva RGBA da tela sob o glifo (SVG por baixo do h1). Screenshot é inspecionável visualmente pelo agente |
| JS off | **Não testado** | Fallback: André desliga JS no Chrome |
| axe-core | **Não** | Não injetar scripts de terceiros sem aprovação |

Emulação de dispositivo **dura só o turno**; ao terminar o teste foram chamados `Emulation.clearDeviceMetricsOverride`, mídia resetada, CPU `rate:1`, browser destrava.

## Critério de aceite → ferramenta → como verificar → fallback (André)

| Critério (BRIEF / fases) | Ferramenta do agente | Como verificar | Fallback manual (André) |
|--------------------------|----------------------|----------------|-------------------------|
| Layout 375 / 768 / 1280 / 1920 | `Emulation.setDeviceMetricsOverride` + screenshot | Conferir `innerWidth` via `Runtime.evaluate`, capturar | Redimensionar a janela / DevTools device mode |
| LCP ≤ 2,0 s, CLS ≤ 0,02, INP | `PerformanceObserver` no `Runtime.evaluate` (LCP/CLS/long tasks) **depois** que a medição for instrumentada no `out/` | Não usar Lighthouse do MCP (inexistente). `Performance.getMetrics` só tem FMP/DCL | **Lighthouse mobile no Chrome** (mediana de 5, 4G lenta, CPU 4×) em `out/` e na Vercel; PageSpeed Insights |
| Contraste de pares CSS (fase 01) | Script local `check-contrast.mjs` (não é o browser) | Pares tokenizados | Conferir no DevTools |
| Contraste do h1 **sobre o sol** (fase 03a) | Cálculo analítico + screenshot + `getComputedStyle` | O agente **não** amostra pixels compositados | Conta-gotas do DevTools na pior posição das trilhas |
| FPS / CPU 4× e 6× | `Emulation.setCPUThrottlingRate` + loop/`PerformanceObserver` | Comparar iterações ou frame médio > 24 ms | Performance monitor do Chrome |
| `prefers-reduced-motion` | `Emulation.setEmulatedMedia` | `matchMedia` + screenshot sem motion | Emulate CSS no DevTools |
| Teclado (Tab, Esc, `inert`, focus trap) | `browser_press_key` + `browser_snapshot` | Percorrer a árvore a11y | Teclado real |
| Navegação sem o sol (`aria-hidden`) | snapshot + Tab | Sol fora da ordem de foco | Teclado real |
| Lighthouse Perf/A11y/BP/SEO = 100 | **Não disponível ao agente** | — | **André** gera o HTML em `docs/qa/` |
| axe sem sérios/críticos | **Não disponível** | — | axe DevTools / extensão, pelo André |

## Ajustes feitos nos critérios

- **Lighthouse** deixa de ser obrigação do agente. O agente mede o que o CDP permite (viewport, CPU, reduced-motion, screenshot, PerformanceObserver quando instrumentado). Lighthouse/PageSpeed = André.
- **Amostragem de pixels** do h1 sobre as trilhas deixa de ser "script de PNG". Passa a ser cálculo analítico + captura + conta-gotas humano se houver dúvida.
- Tetos numéricos (LCP, CLS, INP, orçamento) **não mudam**; só o *quem mede o quê*.

## Data real do `scene2d.dll`

Arquivo em `D:\andre\quarentena\scene2d.dll` (não aberto, não executado):

| Campo | Valor |
|-------|-------|
| `LastWriteTime` | **8 de julho de 2023, 00:54:08** (UTC−3) |
| `LastWriteTimeUtc` | 8 de julho de 2023, 03:54:08 UTC |
| Componentes | ano=2023, mês=7, dia=8, hora=0, minuto=54 |
| Cultura do Windows | `pt-BR`; o display `07/08/2023` neste PC está em formato mês/dia, por isso a data **não** é 7 de agosto |

SHA-256 inalterado: `9DD51466B84BA17566B3E98A4CB4AE8E99830478D21CAAC091FE34E4A1622A21`.
