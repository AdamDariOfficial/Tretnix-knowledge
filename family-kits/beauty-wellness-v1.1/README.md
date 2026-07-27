# Tretnix — Beauty & Wellness Family

**Concept portfolio:** RITO Studio
**Versione:** 1.1
**Data:** 27 luglio 2026
**Stato:** preparazione parallela START autorizzata; implementazione subordinata ai gate di attivazione

Questa cartella definisce la famiglia Beauty & Wellness e il primo progetto RITO Studio START.

## Gate operativo

`TRX-DEC-033` autorizza RITO Studio START a procedere in una corsia separata rispetto alla chiusura di Tretnix e Hospitality.

Sono autorizzati:

- preparazione del Project Knowledge;
- configurazione degli strumenti;
- attivazione manuale dell'abbonamento;
- bootstrap controllato della repository START;
- implementazione START dopo il completamento dei gate registrati in `docs/STATUS.md`.

Non sono autorizzati:

- RITO Studio BUSINESS;
- RITO Studio BUSINESS PLUS;
- backend, autenticazione o booking nativo nello START;
- dati reali di clienti;
- pubblicazione, deploy, dominio o infrastruttura di produzione senza gate esplicito.

La presenza dei prompt non costituisce autorizzazione automatica all'esecuzione.

## Repository previsti

- `rito-studio-START`
- `rito-studio-BUSINESS`

`rito-studio-BUSINESS` non deve essere creato o sviluppato nella fase corrente. BUSINESS PLUS richiede una decisione separata.

I nomi sono approvati come concept portfolio. Marchio, denominazione e dominio restano non verificati e non devono essere usati per un cliente reale senza controlli.

## Documenti fondamentali

- `docs/PRODUCT.md`
- `docs/DESIGN.md`
- `docs/CONTENT.md`
- `docs/ROUTES.md`
- `docs/ANIMATIONS.md`
- `docs/TESTING.md`
- `docs/DECISIONS.md`
- `docs/START_BUSINESS_CONTRACT.md`
- `docs/COMMERCIAL_OFFER.md`
- `docs/VERTICAL_ADAPTERS.md`
- `docs/CLIENT_DISCOVERY.md`
- `docs/ASSET_PLAN.md`
- `docs/REPOSITORY_BOOTSTRAP.md`
- `docs/PRELAUNCH_READINESS_REVIEW.md`
- `docs/STATUS.md`
- `docs/APPROVAL.md`

## Adattatori compilati

- `compiled/LOVABLE_START_PROJECT_KNOWLEDGE.md`: contenuto da sincronizzare nel Project Knowledge del solo progetto START.

Workspace Knowledge e Project Knowledge non devono essere confusi: le regole condivise restano nel workspace, mentre scope, identità, route e vincoli RITO vivono nell'adattatore specifico.

## Prompt e procedure pronte

- `prompts/LOVABLE_START_PROMPT.md`
- `prompts/LOVABLE_BUSINESS_PROMPT.md`
- `prompts/CODEX_START_READ_ONLY_AUDIT.md`
- `prompts/CODEX_BUSINESS_CONSOLIDATION.md`
- `prompts/IMPECCABLE_START_REVIEW.md`
- `prompts/IMPECCABLE_BUSINESS_PARITY_REVIEW.md`
- `checklists/SUBSCRIPTION_ACTIVATION_RUNBOOK.md`
- `checklists/START_FREEZE_CHECKLIST.md`
- `checklists/BUSINESS_FREEZE_CHECKLIST.md`

Usare il prompt START soltanto dopo i gate di `docs/STATUS.md`. Non usare il prompt BUSINESS nella fase corrente.

## Regola fondamentale

RITO Studio è il concept portfolio usato per dimostrare la famiglia. Non è un template rigido da duplicare senza adattamento.

La famiglia condivide qualità tecnica, architettura dei contenuti, logica di conversione, accessibilità, responsive e processo START → BUSINESS. Ogni cliente reale deve conservare una propria identità visuale, fotografica e verbale.
