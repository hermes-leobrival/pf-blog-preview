---
slug: pi-pi-durable-mods-claude-code-qui-controle-agent
title: "Pi, Pi Durable, mods Claude Code : qui contrôle l'agent ?"
title_variant_b: "Avant de déployer des extensions d'agent : contrôle, traces, irréversible"
meta_title: "Contrôler un agent IA : Pi, Pi Durable et mods Claude Code | Plugin Factory"
meta_title_variant_b: "Extensions d'agent en entreprise : décider du contrôle avant la capacité | Plugin Factory"
meta_description: "Qui installe, qui valide, où est la trace, qu'est-ce qui reste irréversible ? Un cadre de décision à partir de Pi, Pi Durable et des mods de Claude Code."
meta_description_variant_b: "Avant de choisir un harnais ou des extensions d'agent, décidez du contrôle : droits, validation, journal, actions irréversibles."
summary: "Décider du contrôle avant la capacité : ce que Pi, Pi Durable et les mods de Claude Code permettent, et ce qu'il reste à cadrer côté entreprise."
level: bofu  # proposition
category: "Ingénierie"  # proposition
reader_question: "que faut-il cadrer avant de déployer un agent avec extensions pour mes équipes ?"
related_queries_hypotheses:
  - "mods Claude Code sécurité"
  - "Pi Durable"
sources:
  - S01
  - S02
  - S05
  - S17
related_articles:
  - ia-supprime-pas-interface-la-deplace
  - dashboard-cli-chat-agent-ia-comment-choisir
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
En bref : avant de comparer les capacités d'un harnais (Pi, Pi Durable) ou d'une extension (les mods de Claude Code), décidez qui peut installer, qui valide, où est la trace et ce qui reste irréversible. Les mods ne sont pas isolés et agissent avec les droits de l'utilisateur.

Vous avez décidé, après [l'article 2](dashboard-cli-chat-agent-ia-comment-choisir.md), que certains usages passent par un agent. Reste à le construire ou à l'adopter. Le mot « harnais » recouvre des choses différentes. Pour Earendil, c'est du stockage plus la machinerie qui fait tourner des conversations avec des LLM, les outils que ces modèles appellent et les environnements où ces outils s'exécutent (S02).

Deux familles d'exemples existent aujourd'hui, de nature différente. Pi est un noyau volontairement minimal : pas de mode plan, pas de sous-agents, pas de popups de permission dans le cœur ; on ajoute ce qu'on veut par extensions et paquets, et on exécute dans un conteneur ou avec son propre flux de confirmation (S01). Pi Durable, annoncé le 1er octobre 2026 comme paquet expérimental, ajoute des tâches avec points de reprise, la survie à un crash et plusieurs conversations en parallèle (S02). Les mods de Claude Code personnalisent un outil existant, avec des contrôles d'organisation (S05, S17).

Sur la sécurité, la documentation primaire dit des choses précises. Les mods ne sont pas isolés et s'exécutent avec les droits de l'utilisateur. Sans paramètres gérés, un mod peut approuver un appel qu'une règle ask demanderait ou qu'un hook PreToolUse a bloqué. Sur une machine gérée ou en offre Team ou Enterprise, un garde intégré (sec-default) empêche un mod d'approuver un appel refusé par une règle deny, sauf option explicite ; un administrateur peut aussi charger son propre mod en premier pour enregistrer chaque appel et limiter les mods autorisés (S17). Pi, de son côté, n'embarque pas de popups de permission et renvoie vers un conteneur ou un flux de confirmation construit par l'équipe (S01) : le contrôle revient à celui qui assemble le harnais.

D'où une règle de décision à discuter : avant de comparer les capacités, répondre à quatre questions. Qui peut installer une extension ? Qui valide l'action risquée ? Où est la trace ? Quelle action reste irréversible ? Une vue persistante pour superviser, comme évoqué dans [l'article 1](ia-supprime-pas-interface-la-deplace.md), fait partie des réponses, pas d'un luxe.

Limites à dire : aucune comparaison indépendante ni mesure de coût de ces approches n'a été trouvée ; les versions bougent vite (Pi 1.0 et les mods datent du 1er octobre, le changelog de Claude Code est à la version 2.1.318 du 4 novembre) ; la priorité donnée au contrôle est un jugement de rédaction appuyé sur de la documentation d'éditeur, non testé sur des équipes réelles.
