# Deploy na Vercel

Produção padrão para todos os sites gerados a partir do `_ClienteBase`.

## Pré-requisitos

1. Conta na [Vercel](https://vercel.com) (time `andrebelluci`)
2. CLI autenticado: `npx vercel@latest login`
3. `npm ci` e `npm run build` passando localmente

## Deploy rápido

Na pasta do cliente:

```bash
npm run deploy:vercel
```

O script lê o `slug` de `site.config.json` e usa como nome do projeto na Vercel (evita erro com pastas em PascalCase).

Na **primeira vez**, o CLI pergunta:

| Pergunta | Resposta sugerida |
|----------|-------------------|
| Link to existing project? | `N` (novo) ou `Y` (se já existir) |
| Project name | `slug` de `site.config.json` (ex.: `najoy-clinica`) |
| Directory | `.` (Enter) |

URL típica: **https://\<slug\>.vercel.app**

## O que o projeto já traz

- `vercel.json` — Next.js + `npm ci` + `npm run build`
- `next.config.js` — `output: 'export'` (static export em `out/`)
- **Não** definir `NEXT_PUBLIC_BASE_PATH` na Vercel (só para GitHub Pages / mockup dharmalabs)

## Domínio customizado

1. Painel Vercel → projeto → **Settings → Domains**
2. Adicionar domínio (ex.: `www.cliente.com.br`)
3. Configurar DNS no registrador (CNAME ou A conforme instruções)
4. Atualizar `site.config.json` → `url` com o domínio final

## CI automático (opcional)

Conectar o repositório GitHub no painel Vercel: cada push na `main` republica automaticamente — mesmo fluxo usado em Vanessa Fumagalli e NAJOY.

## GitHub Pages (legado)

Alguns projetos antigos têm `.github/workflows/deploy-pages.yml`. A Vercel é o destino de produção atual; GitHub Pages pode coexistir para preview, mas não é obrigatório.

## Troubleshooting

| Problema | Solução |
|----------|---------|
| Build falha na Vercel | Rodar `npm run build` local; corrigir erros antes do deploy |
| Assets 404 | Verificar se `NEXT_PUBLIC_BASE_PATH` **não** está setado na Vercel |
| Projeto errado | Apagar `.vercel/` e rodar `npm run deploy:vercel` de novo |
| `npm ci` falha | Commitar `package-lock.json` atualizado |
