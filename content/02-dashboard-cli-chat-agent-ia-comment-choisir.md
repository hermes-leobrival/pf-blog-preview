---
slug: dashboard-cli-chat-agent-ia-comment-choisir
title: "Dashboard, CLI ou chat avec un agent IA : comment choisir ?"
title_variant_b: "Trois questions pour choisir entre dashboard, ligne de commande et conversation"
meta_title: "Dashboard, CLI ou chat IA : choisir selon l'usage | Plugin Factory"
meta_title_variant_b: "Quelle interface pour quel usage avec un agent IA ? | Plugin Factory"
meta_description: "Action répétable, besoin de comparer, niveau de risque : trois questions pour choisir entre tableau de bord, commande et conversation, avec les mods de Claude Code en exemple."
meta_description_variant_b: "Faut-il un dashboard, une commande ou un chat ? Une grille de décision en trois critères, avec ses sources et ses limites."
summary: "Trois critères pour choisir une interface usage par usage : répétabilité, besoin de comparer, risque. Les mods de Claude Code servent de cas central."
level: mofu  # proposition
category: "Solutions"  # proposition
reader_question: "pour tel usage dans mon équipe, quelle interface choisir ?"
related_queries_hypotheses:
  - "dashboard ou CLI agent IA"
  - "agent IA et tableau de bord"
sources:
  - S05
  - S09
  - S11
  - S13
  - S14
  - S16
  - S17
related_articles:
  - ia-supprime-pas-interface-la-deplace
  - pi-pi-durable-mods-claude-code-qui-controle-agent
status: draft  # draft | scheduled | published
reviewed: false  # première revue éditoriale terminée ? (visible en prévisualisation ne veut pas dire validé)
review_stage: first_review_in_progress
security_review: pending
preview_visible: true  # exposé pour relecture seulement
scheduled_publish_at: null  # date prévue, inconnue tant que non décidée
published_at: null  # date réelle de publication, jamais inventée
created_at: 2026-11-05
updated_at: 2026-11-05
author: null  # à décider
---
En bref : on choisit usage par usage, avec trois questions. L'action est-elle répétable et bien définie ? Faut-il comparer plusieurs éléments pour décider ? L'action est-elle risquée ? Dashboard, commande et conversation se complètent ; le contrôle se règle (mods, modes de permission) mais ne disparaît pas.

Une fois l'enjeu posé dans [l'article 1](ia-supprime-pas-interface-la-deplace.md), reste la question pratique : pour tel usage dans votre équipe, qu'est-ce qui convient ?

Du côté de la commande, l'argument est simple. Un agent n'a pas besoin de l'interface d'un humain : il lui faut des commandes, des sorties structurées, un accès programmatique. Un billet défend cette ligne en proposant des interfaces graphiques pour les humains et des CLI, API et outils MCP pour les agents, tout en écrivant que les GUI ne disparaissent pas (S13).

Du côté de l'écran, un autre billet, publié par un éditeur concerné, distingue le « quoi » et le « pourquoi » : le dashboard donne l'état d'ensemble, les résumés d'erreurs, les contrôles de cycle de vie ; le terminal sert à comprendre pourquoi quelque chose se comporte ainsi, avec les sorties brutes (S14). Deux points de vue, qui se recoupent plus qu'ils ne s'opposent.

Voici une grille de travail, qui est une synthèse de rédaction, pas un résultat d'étude. Première question : l'action est-elle répétable et bien définie ? Alors elle est candidate à une commande ou à une phrase. Deuxième question : faut-il comparer plusieurs éléments à la fois pour décider ? Alors une vue persistante garde son utilité ; c'est ce que suggère l'étude de [l'article 1](ia-supprime-pas-interface-la-deplace.md), avec ses limites (S11). Troisième question : l'action est-elle risquée ou difficile à annuler ? Alors il faut un point de validation et une trace, quel que soit le support.

Contrepoint, à ne pas confondre avec les mods : les modes de permission de Claude Code montrent que le contrôle se règle, il ne se supprime pas. Claude Code en propose plusieurs : Manual (default), acceptEdits, plan, auto, dontAsk, bypassPermissions. En mode auto, un second modèle relit les actions à la place de l'utilisateur ; sur les offres Pro, Max et Team, c'est le mode de démarrage. Les règles deny bloquent dans tous les modes, y compris bypassPermissions (S16, documentation Anthropic). Le contrôle humain action par action recule donc d'un cran au profit d'un contrôle automatisé, avec des règles que l'équipe fixe elle-même. Cela ne montre pas que le contrôle disparaît ni que les interfaces de supervision deviennent inutiles : cela montre qu'on déplace où il s'exerce.

Le cas central : les mods de Claude Code, introduits le 1er octobre 2026. Ce sont de petites fonctions TypeScript, livrées dans des plugins, qui peuvent réécrire un prompt, bloquer ou réécrire un appel d'outil et même dessiner des panneaux, boutons et champs dans l'interface (S05, S17). L'interface ne disparaît pas : elle devient fabriquée à la demande, dans l'outil. Une analyse indépendante parle d'un harnais qui ne pointe plus seulement de l'agent vers la machine mais aussi de l'agent vers l'attention de l'humain (S09).

Une réserve de fond : ces extensions ne sont pas isolées et agissent avec les droits de l'utilisateur (S17). On les compare dans [l'article 3](pi-pi-durable-mods-claude-code-qui-controle-agent.md).
