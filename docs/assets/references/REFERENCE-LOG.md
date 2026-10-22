# Reference Log — ABMSOL

> Analisadas pelo brief-architect em 20/10/2026 via navegador (viewport estreito, ~625 px de largura). Observação limitada ao primeiro viewport e à estrutura de cabeçalhos. **Não são as referências do André** (pendência P9): servem de apoio técnico até ele enviar as dele. Nenhuma foi copiada.

---

## Linear — https://linear.app

- **O que roubar:** hero **text-first**: h1 alinhado à esquerda, entrelinha apertada, subtítulo em cinza médio, nenhum elemento antes do texto. O LCP é o h1. Marca e navegação mínimas (logo, "Log in", botão sólido, menu).
- **Motion:** o hero carrega sem barreira de loading; a interface do produto entra abaixo do texto. Nada atrasa a leitura.
- **Tipografia / cor:** sans geométrica, fundo quase preto, contraste alto no h1, acento ausente no hero. Rótulos curtos.
- **O que NÃO copiar:** paleta neutra sem marca, mockup de produto como visual (a ABMSOL não vende um app), o tom "SaaS para times".
- **Traduzido para este projeto:** h1 como LCP, alinhado à esquerda, visível antes de qualquer animação; o sol entra depois do primeiro paint sem deslocar o texto (CLS ≤ 0,02).

## Resend — https://resend.com

- **O que roubar:** disciplina de espaço: poucas palavras, muito respiro, título display com contraste de peso, botão e link secundário próximos.
- **Motion:** objeto 3D (cubo) animado acima do título.
- **Tipografia / cor:** serif display clara sobre preto; subtítulo cinza.
- **O que NÃO copiar:** **hero centralizada** e **objeto 3D/WebGL** (vetados no plano), faixa de depoimentos com nomes de terceiros (a ABMSOL não tem prova real), pílula de anúncio acima do título.
- **Traduzido para este projeto:** referência **negativa**. Mostra o que o Sol-Índice evita: composição centrada e decorativa. A ABMSOL usa assimetria e um objeto que **serve à navegação**.

## Vercel — https://vercel.com

- **O que roubar:** **um único emblema geométrico** como assinatura do hero (o triângulo); subtítulo em fonte mono; dois botões de peso diferente (primário sólido claro, secundário contornado).
- **Motion:** emblema estático com halo suave; sem carrossel.
- **Tipografia / cor:** grotesca compacta no h1, mono no subtítulo, preto absoluto.
- **O que NÃO copiar:** halo/glow branco ao redor do emblema, composição centralizada, preto absoluto, dezenas de links no rodapé.
- **Traduzido para este projeto:** um objeto-assinatura único (o sol) com rótulos em JetBrains Mono; diferença: o sol é **interativo e navegável** (raios = seções) e assimétrico (sangra pela borda direita), com marinho em vez de preto.

---

## Decisão final do architect

- **Slot escolhido:** B — `typographic-statement` (no pool estética o B é de Projeto B; ABMSOL é outra família, ver override no BRIEF).
- **Archetype:** `typographic-statement` com assinatura **Sol-Índice** (SVG).
- **Por que não é split cream genérico:** fundo marinho, tipo display Syne ocupando ~65% da largura, sol SVG interativo que sangra pela borda e é sobreposto pelo h1, rótulos mono numerados e trilha que continua pela página. Sem foto, sem caixa offset, sem fundo cream.
