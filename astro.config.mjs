import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://davidarthurcole.me',
  outDir: './docs',
  integrations: [vue(), tailwind()],
});
