# Plugin Factory blog (Astro + React + shadcn/ui)

Blog statique. Les articles sont les fichiers `content/*.md` (frontmatter = fiche CMS, voir `docs/SCHEMA.md` sur la branche `build-tooling`). Aucun secret, aucune note interne.

## Commandes
- `npm install` puis `npm run dev` / `npm run build` (sortie `dist/`, 100 % statique).
- `SITE_BASE=/ SITE_URL=https://exemple.fr npm run build` pour un autre chemin ou domaine. Défaut : `/pf-blog-preview`.
- `npm run check` (astro check), `npm run lint` (Biome), `npm run knip`.
- Hooks : Lefthook (Biome au commit, commitlint conventional commits). Releases : release-please (`.github/workflows/release-please.yml`).

## Structure (Atomic Design)
- `src/components/ui/` : shadcn/ui (button, badge, input, separator), tokens adaptés dans `src/styles/global.css`.
- `src/components/atoms/` : Eyebrow, CategoryTag, StatusBadge, CoverPanel.
- `src/components/molecules/` : ArticleCard, FilterBar (îlot React).
- `src/components/organisms/` : SiteHeader, SiteFooter, ArticleGrid, FurtherReading.
- `src/layouts/` : BaseLayout, ArticleLayout. `src/pages/` : index, articles/[slug].
- `src/content.config.ts` : schéma Zod du frontmatter et règles (published exige published_at, reviewed et security_review passed ; scheduled exige une date ; brouillon = noindex).
- `src/data/sources.json` : liens publics seulement (le registre complet reste privé).
- Les repères `(S01)` du Markdown restent pour la traçabilité mais ne sont pas affichés. Les liens publics sont en fin d'article ("Pour aller plus loin").

## Mesure visuelle
`scripts/compare.mjs` compare, avec Chrome et pixelmatch, la liste d'articles à la page de référence aux mêmes tailles (1440 et 390 px). Elle sert à mesurer des écarts, pas à prouver une copie à l'identique.

## Déploiement
Sortie statique : tout serveur de fichiers convient (nginx, Caddy, GitHub Pages). Docker n'est pas requis.
