# Tretnix Knowledge — Obsidian Home

Questo documento è un indice di navigazione non autoritativo. GitHub e i documenti canonici versionati restano la fonte di verità; questa pagina non duplica, modifica o sostituisce decisioni, standard o stato approvati.

## Start here

- [Repository overview](README.md) — scopo, struttura e ordine di autorità.
- [Tretnix Master Context](TRETNIX_MASTER_CONTEXT.md) — identità e modello operativo stabile.
- [Decision Log](DECISIONS.md) — decisioni approvate e relative motivazioni.
- [Development Standards](DEVELOPMENT_STANDARDS.md) — regole tecniche condivise.
- [UX/UI Quality System](UX_UI_QUALITY_SYSTEM.md) — standard condivisi di qualità UX/UI.
- [Current State](CURRENT_STATE.md) — snapshot operativo trasversale e livelli di evidenza.
- [Repository Index](REPOSITORY_INDEX.md) — inventario dei repository e relazioni.
- [Portfolio and Verticals](PORTFOLIO_AND_VERTICALS.md) — verticali, lifecycle e gate.

## Product families

- [Hospitality](HOSPITALITY_FAMILY.md)
- [Beauty & Wellness](BEAUTY_WELLNESS_FAMILY.md)
- [Professional Services](PROFESSIONAL_SERVICES_FAMILY.md)
- [Home & Local Services](HOME_LOCAL_SERVICES_FAMILY.md)

## Family kits

- [Beauty & Wellness v1.1](family-kits/beauty-wellness-v1.1/README.md)
- [Professional Services v1.0](family-kits/professional-services-v1.0/README.md)
- [Home & Local Services v1.0](family-kits/home-local-services-v1.0/README.md)

I documenti family alla root definiscono governance e indice; i kit contengono le specifiche complete versionate.

## Operations and reusable procedures

- [Development sequence](operations/development-launch-2026-07-25/DEVELOPMENT_SEQUENCE.md)
- [Subscription and first-build checklist](operations/development-launch-2026-07-25/SUBSCRIPTION_AND_FIRST_BUILD_CHECKLIST.md)
- [Development start handoff](operations/development-launch-2026-07-25/TRETNIX_DEVELOPMENT_START_HANDOFF_2026-07-25.md)
- [New-chat start message](operations/development-launch-2026-07-25/TRETNIX_NEW_CHAT_START_MESSAGE_2026-07-25.md)
- [Controlled Change Package](skills/CONTROLLED_CHANGE_PACKAGE.md)

## Templates and project adapters

- [Read-only audit template](templates/READ_ONLY_AUDIT.md)
- [Controlled implementation task template](templates/CONTROLLED_IMPLEMENTATION_TASK.md)
- [Controlled Change Package manifest template](templates/CONTROLLED_CHANGE_PACKAGE_MANIFEST.md)
- [Read-only diff review template](templates/READ_ONLY_DIFF_REVIEW.md)
- [Forno Lume START project kit](project-kits/forno-lume-start/README.md)
- [Compiled tool adapters](compiled/README.md)

I template sono basi riutilizzabili; i project kit sono adattamenti per repository specifici; gli adapter compilati derivano sempre dalle fonti canoniche.

## Historical and derived material

- [Knowledge consolidation audit](audits/KNOWLEDGE_CONSOLIDATION_2026-07-26.md)
- [Development pack ingestion audit](audits/DEVELOPMENT_PACK_INGESTION_2026-07-26.md)
- [Controlled Change Package validation audit](audits/CONTROLLED_CHANGE_PACKAGE_VALIDATION_2026-07-27.md)
- [Impeccable parallel audit — Pass 1](audits/IMPECCABLE_PARALLEL_PASS_1_2026-07-26.md)
- [Impeccable parallel audit — Pass 2](audits/IMPECCABLE_PARALLEL_PASS_2_2026-07-26.md)
- [Source Artifact Register](SOURCE_ARTIFACT_REGISTER.md)
- [Source artifacts](source-artifacts/2026-07-25-development-pack/README.md)
- [Compiled adapters](compiled/README.md)

Gli audit conservano evidenze storiche. I source artifact preservano provenienza e snapshot e non competono con i documenti correnti. I file in `compiled/` sono derivati e non sono fonti autonome.

## Local Obsidian setup

- Aprire la root del repository `Tretnix-knowledge` come vault.
- La directory `.obsidian/` è intenzionalmente locale e ignorata da Git.
- Non è richiesto alcun community plugin.
- Le funzionalità integrate utili includono File Explorer, Search, Quick Switcher, Backlinks, Outgoing Links, Outline e Bookmarks.
- Graph è opzionale e secondario rispetto alla struttura canonica.
- Bases non fa parte di questa implementazione.
- Per i nuovi collegamenti mantenere il formato Markdown relativo usato in questa pagina.

## Editing workflow

Leggere e navigare è consentito dalla root del vault. Prima di modificare, seguire le [repository instructions](AGENTS.md): verificare lo stato Git, usare una branch non `main`, mantenere un solo writer, ispezionare il diff, eseguire il validatore e sottoporre il risultato a review. Stage, commit e push restano checkpoint Git espliciti e separati.
