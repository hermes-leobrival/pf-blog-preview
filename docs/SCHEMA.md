# Schéma du frontmatter et correspondance EmDash

Les fichiers `content/*.md` sont la source de vérité. `python3 tools/build_site.py` régénère les pages HTML à la racine (Python 3 standard, aucun réseau, aucune dépendance). Les sources viennent de `data/public-sources.json`.

## Champs

| Champ | Valeurs | Rôle |
|---|---|---|
| slug, title, summary | texte | identité et aperçu |
| meta_title, meta_description (+ `_variant_b`) | texte | balises de la page, variante B non testée |
| level | tofu, mofu, bofu | proposition |
| category | texte | proposition |
| reader_question, related_queries_hypotheses | texte, liste | hypothèses éditoriales, non rendues |
| sources | liste d'IDs `Sxx` | doit correspondre aux citations du corps |
| related_articles | liste de slugs | maillage |
| status | draft, scheduled, published | état éditorial |
| reviewed | true, false | première revue éditoriale terminée |
| review_stage | texte | avancement de la revue |
| security_review | pending, passed | revue sécurité |
| preview_visible | true, false | exposé pour relecture. Ce n'est pas une validation |
| scheduled_publish_at | date ou null | date prévue, null tant qu'inconnue |
| published_at | date ou null | date réelle de publication, jamais inventée ni posée au build |
| created_at, updated_at | date | suivi |

## Règles vérifiées par le build
- `published` exige `published_at`, `reviewed: true` et `security_review: passed`.
- `scheduled` exige `scheduled_publish_at`.
- `draft` exige `published_at: null`.
- Un brouillon reste visible en prévisualisation sans être publié.
- Les sources citées dans le corps doivent être exactement celles de `sources`.
- Le texte est échappé en HTML. Seuls les liens `[texte](slug.md)` internes et les citations `(S01)` deviennent des liens.

## Correspondance EmDash (collection `posts`)
| Frontmatter | EmDash |
|---|---|
| slug, title | slug, title |
| summary | excerpt |
| meta_title, meta_description | champs ajoutés du même nom |
| category | taxonomie category |
| level, reader_question | champs ajoutés |
| sources, related_articles | champ JSON ou relation, et liens dans le contenu |
| status, published_at | status et published_at système |
| scheduled_publish_at | date de planification système |
| reviewed, review_stage, security_review, preview_visible | champs ajoutés |
| created_at, updated_at | created_at, updated_at système |
| corps Markdown | content (Portable Text), conversion à écrire à l'import |

EmDash exige le rendu serveur (Node.js ou Cloudflare). Docker n'est pas exigé par le produit.
