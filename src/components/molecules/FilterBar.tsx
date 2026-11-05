import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CategoryTag } from '@/components/atoms/CategoryTag';
import { Input } from '@/components/ui/input';

type Props = { categories: string[]; total: number };

/** Molécule (îlot React) : filtre par catégorie et recherche. Agit sur les `.js-post` de la page. */
export default function FilterBar({ categories, total }: Props) {
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
    <div className="flex flex-wrap items-center gap-x-4 gap-y-4 px-4 py-4 lg:px-[38px] lg:py-[29px]">
      <span className="font-medium">Filtrer par catégorie</span>
      <span id="result-count" className="text-text-tertiary">
        {total} {total > 1 ? 'résultats' : 'résultat'}
      </span>
      <fieldset className="m-0 flex min-w-0 basis-full flex-wrap gap-2 border-0 p-0 lg:basis-auto">
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
      <label
        htmlFor="post-search"
        className="relative order-first w-full lg:order-none lg:ml-auto lg:w-[288px]"
      >
        <span className="sr-only">Rechercher</span>
        <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher…"
          className="h-12 rounded-lg bg-transparent pl-12 text-base"
        />
      </label>
    </div>
  );
}
