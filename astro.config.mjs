import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://andrean-lp.github.io',
  base: '/storiq/',
  vite: {
    plugins: [tailwindcss()],
  },
});
