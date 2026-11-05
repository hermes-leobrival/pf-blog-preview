---
slug: ia-supprime-pas-interface-la-deplace
title: "L'IA ne supprime pas l'interface, elle la déplace"
title_variant_b: "Plus besoin de dashboard ? Ce que change vraiment l'IA conversationnelle"
meta_title: "Agents IA et interfaces : l'écran disparaît-il vraiment ? | Plugin Factory"
meta_title_variant_b: "Dashboard ou conversation : l'IA change l'interface, pas le besoin | Plugin Factory"
meta_description: "Parler à l'IA remplace-t-il les écrans ? Un tour d'horizon sourcé : ce qui est démontré, ce qui est seulement avancé, et ce que cela change pour les équipes."
meta_description_variant_b: "Commande, chat ou tableau de bord : l'interface se déplace plus qu'elle ne disparaît. Les preuves disponibles, leurs limites et les questions à se poser."
summary: "L'IA conversationnelle déplace l'interface plus qu'elle ne la supprime. Ce que les sources établissent, et ce qu'elles n'établissent pas."
level: tofu  # proposition
category: "Entreprise"  # proposition
reader_question: "l'écran va-t-il disparaître quand on peut tout demander à l'IA ?"
related_queries_hypotheses:
  - "fin des dashboards"
  - "CLI ou interface graphique avec un agent IA"
sources:
  - S03
  - S04
  - S11
related_articles:
  - dashboard-cli-chat-agent-ia-comment-choisir
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
En bref : l'IA conversationnelle déplace l'interface (on parle à la machine) plus qu'elle ne la supprime. Pour une action simple et répétée, une phrase ou une commande suffit ; pour comparer et décider sur un sujet complexe, une vue persistante garde son utilité. Les preuves mesurées sont rares et étroites, le reste relève de positions d'auteurs.

En 1984, l'ordinateur parle. Sur scène, le Macintosh se présente lui-même, et ce n'est pas un gadget : l'interface rend la machine accessible à des gens qui ne l'auraient jamais touchée. Léo Duff rattache ChatGPT à cette histoire : la vraie rupture, dit-il, c'est qu'il n'appartient plus à l'humain d'apprendre le langage de la machine, c'est à la machine d'apprendre le nôtre.

Si c'est vrai, une question suit. Dans une entreprise, des écrans de toute sorte ont été construits pour traduire ce que la machine sait faire : tableaux de bord, back-offices, formulaires. Que deviennent-ils quand on peut tout demander en une phrase ?

Eliott Meunier répond sans nuance : ne plus créer d'interface. Il a arrêté de développer des interfaces internes pour deux raisons, la dette de maintenance et la sécurité, et leur préfère une base de données, des automatisations et des commandes, avec une fiche process en markdown à la place d'une application. Il va plus loin : les interfaces et les SaaS vont disparaître au profit du chat et des API.

Cette thèse mérite d'être prise au sérieux et éprouvée. D'abord, elle mélange deux choses : supprimer une interface faite sur mesure (un dashboard maison) et supprimer toute interface. La première est crédible pour un usage répété et bien défini. La seconde ne suit pas : le chat est lui-même une interface, et la CLI aussi. On ne supprime pas l'interface, on la déplace.

Ensuite, ses preuves sont des cas vécus : une plateforme de leads, une réservation de chalet, un tableau de ventes remplacé par une commande. Ils sont instructifs et ne mesurent rien. Rien ne dit comment ils se comportent avec dix personnes qui doivent se mettre d'accord sur un chiffre.

Que sait-on d'un peu plus solide ? Une étude contrôlée (Figliè et al., prépublication arXiv, 2026) a comparé un assistant conversationnel et un dashboard sur des décisions d'exploitation industrielle. Les auteurs concluent, dans leur résumé, que le chat réduit la charge mentale et accélère les tâches peu exigeantes, que ces avantages diminuent quand la tâche se complexifie, et que les décisions complexes gardent un intérêt pour des représentations visuelles persistantes et inspectables. Prudence : un seul assistant, un seul dashboard, des données simulées, des managers de l'industrie recrutés en ligne. Ça ne dit pas ce qui vaut pour une agence web.

Ce qu'on peut défendre aujourd'hui : l'IA conversationnelle change qui parle à la machine et comment, mais ne dispense pas de choisir ce qu'on veut regarder. À vous de trier vos écrans de la semaine : lesquels servent à regarder (état, comparaison) et lesquels à faire une action répétable ? La réponse guide le choix décrit dans [l'article 2](dashboard-cli-chat-agent-ia-comment-choisir.md), et les garde-fous à prévoir sont dans [l'article 3](pi-pi-durable-mods-claude-code-qui-controle-agent.md).
