# Blog ABMSOL

1. Copie `_modelo.md` e remova o `_` do nome (ex.: `meu-artigo.md`).
2. Preencha o frontmatter (categoria, subcategoria, autor, fontes).
3. Use `status: published` para aparecer no site.
4. Rode `npm run generate:blog` (ou `npm run dev` / `npm run build`, que já disparam isso).
5. Para atualizar sitemap e `llms.txt`: `npm run generate:seo` (também roda no `build`).
6. Categorias novas: edite `lib/content/blog/categories.ts`.
7. Autores novos: edite `lib/content/blog/authors.ts`.

Arquivos que começam com `_` nunca entram na vitrine. O índice gerado fica em `lib/content/blog/generated-posts.ts`.
