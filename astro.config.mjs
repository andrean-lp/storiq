import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://storiq-id.pages.dev',
  vite: {
    plugins: [tailwindcss()],
  },
});
