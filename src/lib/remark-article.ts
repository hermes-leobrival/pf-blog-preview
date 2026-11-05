import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

/** Liens internes `slug.md` -> `<base>/articles/slug/`, et retrait des repères (S01) du rendu public (ils restent dans le Markdown). */
export function remarkArticle({ base = '' } = {}) {
  return (tree: Root) => {
    visit(tree, 'link', (node) => {
      const m = /^([a-z0-9-]+)\.md$/.exec(node.url);
      if (m) node.url = `${base}/articles/${m[1]}/`;
    });
    visit(tree, 'text', (node) => {
      node.value = node.value.replace(/\s*\((?:S\d\d(?:[, ]+S\d\d)*)\)/g, '');
    });
  };
}
