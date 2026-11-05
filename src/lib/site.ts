import sources from '@/data/sources.json';

export const SITE_NAME = 'Plugin Factory';
export const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const href = (path = '') => `${base}/${path}`.replace(/\/+$/, '/');

export type Source = {
  id: string;
  title: string;
  urls: string[];
  author: string;
  display: boolean;
  kind: string;
};
const byId = new Map<string, Source>((sources as Source[]).map((s) => [s.id, s]));
/** Liens visibles : approfondissements utiles et études d'appui seulement. Le registre complet reste privé. */
export const publicLinks = (ids: string[]) =>
  ids.map((i) => byId.get(i)).filter((s): s is Source => !!s && s.display);

export const STATUS_LABEL = {
  draft: 'Brouillon',
  scheduled: 'Planifié',
  published: 'Publié',
} as const;
export const fmtDate = (d: Date | null) =>
  d
    ? new Intl.DateTimeFormat('fr-FR', {
        dateStyle: 'long',
        timeZone: 'UTC',
      }).format(d)
    : 'non publié';
