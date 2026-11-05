import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';
import { href, SITE_NAME } from '@/lib/site';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Flux RSS : uniquement les articles réellement publiés (les brouillons n'y figurent jamais). */
export async function GET(context: APIContext) {
  const origin = (context.site ?? new URL('http://localhost')).origin;
  const published = (await getCollection('articles'))
    .filter((a) => a.data.status === 'published' && a.data.published_at)
    .sort((a, b) => (b.data.published_at as Date).getTime() - (a.data.published_at as Date).getTime());
  const items = published
    .map((a) => {
      const link = `${origin}${href(`articles/${a.data.slug}`)}`;
      return `<item><title>${esc(a.data.title)}</title><link>${esc(link)}</link><guid>${esc(link)}</guid><pubDate>${(a.data.published_at as Date).toUTCString()}</pubDate><description>${esc(a.data.summary)}</description></item>`;
    })
    .join('');
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(SITE_NAME)}</title><link>${esc(origin + href())}</link><description>Blog ${esc(SITE_NAME)}</description><language>fr</language>${items}</channel></rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
