// @ts-check

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { remarkArticle } from './src/lib/remark-article.ts';

const base = process.env.SITE_BASE ?? '/pf-blog-preview';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://hermes-leobrival.github.io',
  base,
  trailingSlash: 'always',
  integrations: [react()],
  markdown: { remarkPlugins: [[remarkArticle, { base }]] },
  vite: { plugins: [tailwindcss()] },
});
