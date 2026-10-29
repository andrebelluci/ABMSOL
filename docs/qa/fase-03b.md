# Fase 03b — cursor-nó e sol camada 2

29/10/2026. Branch `fase-00-next16`. Export estático conferido em `http://127.0.0.1:3018/`.

## O que entrou

- Cursor-nó em `components/cursor/`, carregado só com ponteiro fino, hover, largura ≥ 1280 px, sem reduced-motion, `forced-colors` ou `saveData`.
- Núcleo e anel seguem o ponteiro. A pílula e a linha até o nó do sol é que suavizam.
- Os quatro raios cardeais acendem no desktop. O pulso menta vai até um alvo visível e o clique leva à seção. Os alvos ficam `aria-hidden` e fora da ordem do Tab.
- Sonda de FPS: média acima de 24 ms por 500 ms tira o cursor e volta o sol para a camada 1.

## Medido

- `npm run lint` e `npm run build` PASS. Orçamento das páginas dentro dos tetos. Transferência da home 285,3 KB.
- Os dois pedaços novos (cursor + camada 2) ficam em torno de 4 KB gzip, abaixo do teto de 12 KB.
- No viewport 1280×800: link, texto e nó trocam o anel; a pílula cabe na tela; campo de texto e saída da janela devolvem o cursor nativo.

## Ainda com o André

- FPS com CPU 4× e o rebaixo automático com CPU 6×. A medição automática travou nesse passo e foi interrompida.
- Um passe de mouse real no desktop, em 1280 e 1920, para ver o pulso e o rótulo em cima do sol.
- Lighthouse da home depois do deploy, para confirmar que o celular não mudou (o cursor não carrega lá).
