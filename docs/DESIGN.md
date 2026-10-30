# DESIGN — ABMSOL

> Case study do site no ar. Não entra no build. A submissão ao Awwwards ficou de fora: o passo seguinte é refinar o que já foi construído.

## Conceito

**Nome do conceito:** Sol-Índice

**Em uma frase:** um sol de circuitos, em marinho, que se desenha e serve de índice do site.

**O que este site não é:**
- Landing de clínica, com foto, halo e botão no centro.
- Vitrine com cubo 3D, depoimentos em faixa ou hero partida em duas colunas neutras.
- Menu hambúrguer genérico, cursor de lente, gota ou halo dourado.
- Vidro, blur, loading screen ou WebGL.

A frase que o visitante deve conseguir repetir: o site em que um sol de circuito funciona como menu.

## Referências estéticas

| Referência | URL | O que foi absorvido |
|------------|-----|---------------------|
| Linear | https://linear.app | Título à esquerda, visível no primeiro paint, sem tela de carregamento |
| Resend | https://resend.com | Poucas palavras e muito espaço. A hero centralizada e o objeto 3D foram recusados |
| Vercel | https://vercel.com | Um emblema geométrico só, rótulo mono, dois botões de pesos diferentes. O halo branco e o centro da página foram recusados |

As referências de outros clientes ficam fora deste arquivo, de propósito. O vocabulário visual sai da logo: trilha dourada, nó, menta quando algo está verificado.

## Decisões de chrome

- **Cursor:** cursor-nó, só no desktop com ponteiro fino e largura a partir de 1280 px. Núcleo e anel seguem o mouse; a pílula com o rótulo fica ao lado. Perto de um nó do sol, uma linha dourada liga os dois. Some em campo de texto, quando o ponteiro sai da janela ou quando a taxa de quadros cai.
- **Scrollbar / scroll:** no desktop, trilho marinho e polegar dourado. No celular, a barra nativa. O progresso da página é a trilha vertical à esquerda, com um nó por seção.
- **Nav mobile:** Trail Index. Um painel sobe do rodapé com quatro itens numerados, ligados por uma trilha. O botão diz "Menu".
- **Hero:** frase tipográfica à esquerda e o sol sangrando pela direita. O título fica por cima do desenho. Não há foto nem vídeo.

## Tipografia e cor

```
Display: Syne — títulos, porque o peso editorial segura a frase sem precisar de foto
Body: Instrument Sans — texto corrido
Mono: JetBrains Mono — índices (01, 02) e rótulos
Wordmark: Rajdhani Medium — só o nome ABMSOL no header, como na logo

Marinho #0B173F — fundo
Marfim #F3EEE4 — texto
Dourado #DCA931 — trilha, marca, ação em andamento
Menta #73D9B1 — nó verificado, foco, link secundário
```

O dourado e o menta são código, não enfeite: dourado é caminho, menta é etapa conferida.

## Motion

| Momento | Técnica | Intenção |
|---------|---------|----------|
| Abertura | Nenhuma tela de loading. O título já está no HTML | A primeira leitura não espera o JavaScript |
| Hero | O desenho do sol é a imagem principal. No desktop, o raio mais próximo acende e um pulso menta corre até o nó | O sol é índice, não ilustração parada |
| Scroll | O sol grande some e a trilha da página avança | A marca continua como progresso, sem encolher até virar ícone |
| Ponteiro | GSAP ticker único, só `transform` e opacidade | O cursor conta a mesma história da trilha |

Lenis só com ponteiro fino e sem redução de movimento. Reduced-motion deixa o sol estático e o cursor nativo.

## Arquitetura técnica

- **Framework:** Next.js 16, App Router, export estático, barra no fim da URL.
- **Deploy:** Vercel. Endereço canônico `https://abmsol.com.br`.
- **Performance:** no celular, a medição limpa de 29/10/2026 ficou em 76. O que limita é o JavaScript do framework na abertura. O cursor e a camada interativa do sol não entram nessa conta: não carregam no celular.

## Acessibilidade

- `prefers-reduced-motion` desliga a camada interativa.
- Contraste medido no build: marfim sobre marinho 15:1, menta sobre marinho 10:1, dourado sobre marinho 8:1.
- Alvos de toque com pelo menos 48 px.
- O sol é reforço do mouse: `aria-hidden`, nós fora da ordem do Tab. O caminho por teclado é o header e o menu.

## Créditos

- **Estúdio:** ABMSOL — Soluções Digitais, Rio Preto (SP)
- **Desenvolvimento:** André Belluci
- **Fotos:** ainda sem foto de quem assina. O site não usa imagem de estoque no lugar.

## Links

- **Live:** https://abmsol.com.br
- **Vídeo demo:** ainda não gravado
