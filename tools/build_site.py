# Génère les pages HTML (racine du dépôt) depuis content/*.md et data/public-sources.json. Python 3 standard, aucun accès réseau.
# Usage : python3 tools/build_site.py [dossier_de_sortie]  (défaut : racine du dépôt)
import json,re,html,os,glob,sys
os.chdir(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..'))
S={r['id']:[r['id'],r['title'],'; '.join(r['urls']),r['author']] for r in json.load(open('data/public-sources.json'))}
OUT=sys.argv[1] if len(sys.argv)>1 else '.'
depth={"S01":"page lue en entier; source éditeur","S02":"page lue en entier; source éditeur","S03":"vidéo; thèse assumée d'un indépendant, pas une étude","S04":"vidéo de 2023, sponsorisée; contexte historique","S05":"annonce éditeur","S09":"analyse indépendante, lue en partie","S11":"préprint; résumé, introduction et méthode lus, résultats non lus en détail","S13":"point de vue, lu en grande partie","S14":"billet d'un éditeur concerné, lu en partie","S16":"documentation éditeur, lue en partie","S17":"documentation éditeur, lue par passages"}
def parse(path):
    t=open(path,encoding='utf-8').read(); _,fm,body=t.split('---\n',2); d={}; cur=None
    for line in fm.splitlines():
        if line.startswith('  - '): d[cur].append(json.loads(line[4:]) if line[4:].startswith('"') else line[4:].strip()); continue
        k,_,v=line.partition(':'); v=v.strip(); cur=k
        if v=='': d[k]=[]
        elif v.startswith('"'): d[k]=json.JSONDecoder().raw_decode(v)[0]
        else: d[k]=v.split('  #')[0].strip()
    d['paras']=[p for p in body.strip().split('\n') if p.strip()]; return d
arts=[parse(f) for f in sorted(glob.glob('content/[0-9]*.md'))]
slugs={a['slug'] for a in arts}
for a in arts:
    assert a['status'] in ('draft','scheduled','published'), a['slug']
    assert a['published_at']!='null' if a['status']=='published' else a['published_at']=='null', ('published_at',a['slug'])
    assert a['scheduled_publish_at']!='null' if a['status']=='scheduled' else True, ('scheduled',a['slug'])
    assert a['status']!='published' or (a['reviewed']=='true' and a['security_review']=='passed'), ('publication exige revue et sécurité',a['slug'])
    for r in a['related_articles']: assert r in slugs
E=html.escape
STATUS_FR={'draft':'brouillon','scheduled':'planifié','published':'publié'}
def inline(t):
    out=[];pos=0
    for m in re.finditer(r'\[([^\]]+)\]\(([a-z0-9-]+)\.md\)',t):
        assert m.group(2) in slugs
        out.append(E(t[pos:m.start()])+f'<a href="{m.group(2)}.html">{E(m.group(1))}</a>'); pos=m.end()
    out.append(E(t[pos:])); t=''.join(out)
    return re.sub(r'\((S\d\d(?:[, ]+S\d\d)*)\)',lambda m:'('+', '.join(f'<a href="sources.html#{c}">{c}</a>' for c in re.findall(r'S\d\d',m.group(1)))+')',t)
CSS="body{font:18px/1.65 Georgia,serif;max-width:44rem;margin:2rem auto;padding:0 1rem;color:#1a1a1a}.b{display:inline-block;background:#fff3cd;border:1px solid #e0c36a;padding:.1rem .5rem;border-radius:4px;font:600 .8rem sans-serif}h1{line-height:1.2}a{color:#0b4f9c}nav,footer{font:14px sans-serif}footer{border-top:1px solid #ccc;margin-top:3rem;padding-top:1rem}li{margin:.4rem 0}"
def page(title,desc,body):
    return f'<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>{E(title)}</title><meta name="description" content="{E(desc)}"><style>{CSS}</style></head><body><nav><a href="index.html">Brouillons</a> · <a href="sources.html">Sources</a></nav>{body}<footer>Brouillons en cours de relecture, non validés, au 5 novembre 2026. Cette page n\'est pas indexée volontairement.</footer></body></html>'
os.makedirs(OUT,exist_ok=True)
by={a['slug']:a for a in arts}
for a in arts:
    ids=sorted(set(re.findall(r'S\d\d',' '.join(a['paras']))))
    assert ids==sorted(a['sources']),(a['slug'],ids)
    st=STATUS_FR[a['status']]; pub=a['published_at'] if a['published_at']!='null' else 'non publié'; upd=a['updated_at']
    b=f'<p><span class="b">BROUILLON - EN RELECTURE</span></p><h1>{E(a["title"])}</h1><p><em>{E(a["summary"])}</em></p><p style="font:14px sans-serif">Catégorie proposée : {E(a["category"])} · Niveau proposé : {a["level"].upper()} · Statut : {st} · Publié le : {pub} · Mis à jour le {upd}</p>'
    b+=''.join(f'<p>{inline(p)}</p>' for p in a['paras'])
    b+='<h2>Sources citées</h2><ul>'+''.join(f'<li><a href="sources.html#{c}">{c}</a> : {E(S[c][1])} ({E(S[c][3])}) - {depth.get(c,"")}</li>' for c in ids)+'</ul>'
    b+='<h2>Dans la même série</h2><ul>'+''.join(f'<li><a href="{r}.html">{E(by[r]["title"])}</a></li>' for r in a['related_articles'])+'</ul>'
    open(f'{OUT}/{a["slug"]}.html','w',encoding='utf-8').write(page(a['meta_title'],a['meta_description'],b))
b='<p><span class="b">BROUILLONS - NON VALIDÉS</span></p><h1>Plugin Factory : brouillons de la série interfaces et agents</h1><p>Trois articles en relecture. Rien n\'est validé ni publié.</p><ol>'+''.join(f'<li><a href="{a["slug"]}.html">{E(a["title"])}</a><br><small>{E(a["summary"])}</small></li>' for a in arts)+'</ol>'
open(f'{OUT}/index.html','w',encoding='utf-8').write(page('Brouillons - Plugin Factory','Brouillons en relecture',b))
used=sorted({c for a in arts for c in a['sources']})
b='<h1>Sources</h1><p>Chaque source est donnée avec sa profondeur de lecture. Les sources éditeur et les vidéos ne sont pas des preuves indépendantes.</p><ul>'
for c in used:
    urls=[u.strip() for u in S[c][2].split(';')]
    b+=f'<li id="{c}"><strong>{c}</strong> : {E(S[c][1])}, {E(S[c][3])}. '+' '.join(f'<a href="{E(u)}" rel="noopener noreferrer">{E(u)}</a>' for u in urls)+f' - {depth.get(c,"")}</li>'
open(f'{OUT}/sources.html','w',encoding='utf-8').write(page('Sources','Sources des brouillons',b+'</ul>'))
print(OUT,'généré :',len(arts),'articles')
