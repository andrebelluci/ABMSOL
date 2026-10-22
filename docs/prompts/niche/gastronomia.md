# Nicho: Gastronomia / bebidas / sucos (ex: AllSucos)

Constraints para o **brief-architect**. Combinar com `visual-style-matrix.md`.

**Stack típico:** Dominante = liquid glass ou product-duo · Suporte = skeu produto + glass chrome pontual · Descartar = neo-brutalism, clay, skeu UI fake.

## Conceito típico

- Energia, frescor, sabor, movimento
- Produto como herói visual
- Pode ser mais lúdico que clínica — sem virar infantil barato

## Chrome permitido

| Elemento | Direção |
|----------|---------|
| Cursor | ✅ Orgânico: gota, splash, blob que estica; cores do produto |
| Scrollbar | Grossa colorida, thumb com cor do sabor/linha |
| Nav mobile | Bottom sheet com categorias OU drawer com ícones de frutas estilizados |
| Hero | Produto imersivo ou editorial assimétrico — ver `hero-archetypes.md`; **evitar** split institucional e carrossel multi-item |
| Liquid | ✅ SVG morph, CSS blur blobs, simulação de líquido (sem WebGL pesado se possível) |

## Motion

- Marquee de sabores/ingredientes
- Pin scroll em linha de produtos
- Hover com "splash" sutil em cards
- Parallax em camadas (fruta frente/fundo)

## NEVER USE (nicho)

- Estética hospitalar ou corporativa B2B
- Paleta sóbria parchment (é para clínica)
- Hero estática só com texto
- Carrossel de garrafas/cards em arco (3+ visíveis) — usar `product-duo-immersive` se produto
- Split hero 2 colunas com fundo creme/corporativo
- Stock photo de smoothie genérico sem cor da marca

## Cuidados

- Performance: liquid SVG ok; WebGL só se brief pedir e com fallback mobile
- Acessibilidade: motion reduzido; não depender de cursor no mobile

## Schema

- `LocalBusiness` + `Restaurant` ou `FoodEstablishment` se aplicável
