import { Rss, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CategoryTag } from '@/components/atoms/CategoryTag';
import { Input } from '@/components/ui/input';

type Props = { categories: string[]; total: number; rssHref: string };

/** Molécule (îlot React) : filtre par catégorie et recherche. Agit sur les `.js-post` de la page. */
export default function FilterBar({ categories, total, rssHref }: Props) {
  const [active, setActive] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  useEffect(() => {
    let n = 0;
    document.querySelectorAll<HTMLElement>('.js-post').forEach((el) => {
      const ok = (!active || el.dataset.category === active) && (!q || (el.dataset.title ?? '').includes(q));
      el.hidden = !ok;
      if (ok) n += 1;
    });
    const out = document.getElementById('result-count');
    if (out) out.textContent = `${n} ${n > 1 ? 'résultats' : 'résultat'}`;
  }, [active, q]);

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-4 px-4 pb-4 pt-6 lg:px-10 lg:pb-4 lg:pt-10">
      <span className="text-sm font-medium">Filtrer par catégorie</span>
      <span id="result-count" className="text-sm text-text-tertiary">
        {total} {total > 1 ? 'résultats' : 'résultat'}
      </span>
      <fieldset className="m-0 flex min-w-0 basis-full flex-wrap gap-2 border-0 p-0 lg:ml-2 lg:basis-auto">
        <legend className="sr-only">Catégories</legend>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(active === c ? null : c)}
          >
            <CategoryTag active={active === c} className="cursor-pointer">
              {c}
            </CategoryTag>
          </button>
        ))}
      </fieldset>
      <div className="order-first flex w-full items-center gap-4 lg:order-none lg:ml-auto lg:w-auto">
        <label htmlFor="post-search" className="relative min-w-0 flex-1 lg:w-[306px] lg:flex-none">
          <span className="sr-only">Rechercher</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher…"
            className="h-[50px] rounded-lg bg-transparent pl-12 text-base"
          />
        </label>
        <a
          href={rssHref}
          aria-label="Flux RSS"
          className="flex size-[50px] shrink-0 items-center justify-center rounded-lg border border-border text-text-tertiary hover:bg-surface-header focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <Rss className="size-4" />
        </a>
      </div>
    </div>
  );
}
