# STORIQ — AI Coding Context

## Stack
- Astro.js v5 (SSG, static output only)
- Tailwind CSS v4 (via @tailwindcss/vite)
- Vanilla JavaScript (no React/Vue/Svelte)
- GitHub Pages deployment via GitHub Actions

## Rules
- Bahasa Indonesia untuk semua UI text dan copywriting
- Mobile-first responsive design (min-width breakpoints)
- No server-side code — everything runs client-side
- API keys stored in localStorage, never sent to any server we control
- Copywriting style: storytelling educational, santai, mudah dipahami pemula
- All links internal to the site must use `import.meta.env.BASE_URL` prefix

## File Conventions
- Components: `src/components/PascalCase.astro`
- Scripts: `src/scripts/kebab-case.js`
- Data: `src/data/kebab-case.json`
- Pages: `src/pages/lowercase.astro`

## Brand
- Primary: navy-800 (#111d35) backgrounds, white text
- Accent: blue-500 (#3b82f6) for CTAs and highlights
- Target: pemula / content creator / marketer Indonesia

## Don'ts
- No npm packages for things vanilla JS can do
- No frontend frameworks — use Astro with vanilla JS in `<script>` tags
- No inline styles — use Tailwind utility classes
- No build artifacts committed to git
