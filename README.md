# Fran Camargo · Portfólio

Portfólio, Front-End Developer e UI/UX Specialist.

## Stack

React 19 · TypeScript · Vite · React Router · lucide-react

## Estrutura

```text
src/
  App.tsx            Header, rotas e tema claro/escuro
  pages/             HomePage (projetos) e AboutMePage (sobre mim)
  components/        ProjectsSection, ProjectCard (+ modal), SelectMenu,
                     SiteFooter, ThemeToggle, BrandIcons
  data/profile.ts    Dados pessoais, stack e lista de projetos
  index.css          Reset e estilos base
  App.css            Modal do currículo
  styles/            Design system do portfólio
public/
  404.html           Redirect de SPA para o GitHub Pages
```

## Como executar

```bash
npm install
npm run dev
```

Build de produção: `npm run build` (saída em `dist/`).

## Deploy

O workflow em `.github/workflows/deploy-pages.yml` publica no GitHub Pages a cada push na branch `main`.
O caminho base fica em `vite.config.ts` (`base`); o roteador usa o mesmo valor automaticamente.
