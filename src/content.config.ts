import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Dossier lu : content/ par défaut. PARITY_CONTENT sert uniquement aux mesures visuelles locales.
const base = process.env.PARITY_CONTENT ?? './content';

const date = z.coerce.date();

const schema = z
  .object({
    slug: z.string(),
    title: z.string(),
    title_variant_b: z.string().optional(),
    meta_title: z.string(),
    meta_title_variant_b: z.string().optional(),
    meta_description: z.string(),
    meta_description_variant_b: z.string().optional(),
    summary: z.string(),
    level: z.enum(['tofu', 'mofu', 'bofu']),
    category: z.string(),
    reader_question: z.string().optional(),
    related_queries_hypotheses: z.array(z.string()).default([]),
    sources: z.array(z.string().regex(/^S\d\d$/)).default([]),
    related_articles: z.array(z.string()).default([]),
    status: z.enum(['draft', 'scheduled', 'published']),
    reviewed: z.boolean(),
    review_stage: z.string().optional(),
    security_review: z.enum(['pending', 'passed']),
    preview_visible: z.boolean(),
    scheduled_publish_at: date.nullable(),
    published_at: date.nullable(),
    created_at: date,
    updated_at: date,
    author: z.string().nullable().optional(),
  })
  .superRefine((a, ctx) => {
    const fail = (message: string) => ctx.addIssue({ code: 'custom', message });
    if (a.status === 'published') {
      if (!a.published_at) fail('published exige published_at');
      if (!a.reviewed || a.security_review !== 'passed')
        fail('published exige reviewed true et security_review passed');
    } else if (a.published_at) {
      fail('published_at doit rester null tant que status != published');
    }
    if (a.status === 'scheduled' && !a.scheduled_publish_at) fail('scheduled exige scheduled_publish_at');
  });

const articles = defineCollection({
  loader: glob({ pattern: '[0-9]*.md', base }),
  schema,
});

export const collections = { articles };
