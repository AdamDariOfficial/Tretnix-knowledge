# RITO Studio — Status

**Data:** 13 agosto 2026
**Famiglia:** Beauty & Wellness
**Versione specifica:** 1.1
**Stato complessivo:** lineage RITO START/BUSINESS implementato; BUSINESS PLUS autorizzato in staging; auth/realtime/E2E e riconciliazione documentale parent ancora aperti; produzione PLUS non autorizzata

## Riconciliazione corrente — 13 agosto 2026

```text
RITO_START_REPOSITORY_REAL
RITO_BUSINESS_REPOSITORY_REAL
RITO_BUSINESS_PLUS_REPOSITORY_REAL
BUSINESS_PLUS_AUTHORIZED
BUSINESS_PLUS_STAGING_ACTIVE
NATIVE_ADMIN_AUTH_DEBUGGING
CONSULTATION_LIVE_E2E_PENDING
PRODUCTION_PLUS_NOT_AUTHORIZED
PARENT_STATUS_RECONCILIATION_PENDING
```

Il candidate BUSINESS PLUS registra i parent `34c13cd78255b7ac009533790329cada74ae9d8a` e `b95a63c6127d2bc1dd396d74b2dd25f87b952226` come freeze del lineage corrente. I documenti locali START/BUSINESS contengono ancora registrazioni precedenti non completamente allineate; questo gap deve essere corretto nei parent con task separati e non viene nascosto dalla Knowledge.

Lo stato dettagliato del lavoro PLUS vive nel repository `rito-studio-BUSINESS-PLUS`; questo file resta un indice della famiglia.

## Snapshot storico del gate START — 27 luglio 2026

Le sezioni storiche sottostanti descrivono il gate di avvio originario e vengono preservate come evidenza. Non rappresentano il gate operativo corrente e non annullano le autorizzazioni successive di BUSINESS o BUSINESS PLUS.

```text
PARALLEL_PREPARATION_AUTHORIZED
```

`TRX-DEC-033` autorizza RITO Studio START a procedere in parallelo alla chiusura di Tretnix e Hospitality, usando repository, chat e writer separati.

Questa autorizzazione non attiva automaticamente Lovable e non autorizza BUSINESS o BUSINESS PLUS.

## Autorizzato ora

- sincronizzare ChatGPT Project Instructions e fonti Beauty;
- sincronizzare Cursor User Rules;
- sincronizzare Lovable Workspace Knowledge;
- preparare e sincronizzare il Project Knowledge START;
- attivare manualmente Lovable Pro;
- registrare workspace, saldo, data di attivazione e rinnovo;
- preparare il bootstrap controllato di `rito-studio-START`;
- pianificare e avviare START dopo il completamento dei gate seguenti.

## Gate mancanti prima del primo intervento Lovable

```text
LOVABLE_SUBSCRIPTION_CONFIRMED
LOVABLE_WORKSPACE_AND_BALANCE_CONFIRMED
RITO_STUDIO_START_IMPLEMENTATION_COMMAND
RITO_STUDIO_START_REPOSITORY_READY
```

Quando tutti i gate sono verificati, aggiornare lo stato a:

```text
IMPLEMENTATION_AUTHORIZED
```

## Non autorizzato

- creare o sviluppare RITO Studio BUSINESS;
- creare o sviluppare BUSINESS PLUS;
- pubblicare o deployare il concept;
- collegare un dominio;
- abilitare database, autenticazione o integrazioni;
- applicare migrazioni;
- usare dati reali di un cliente;
- modificare gli stessi file contemporaneamente da Lovable e un altro writer;
- reinterpretare o copiare l'identità Hospitality.

## Baseline approvata

- Concept portfolio: `RITO Studio`
- Descriptor: `Beauty & Care Atelier`
- Tagline: `La bellezza, nel suo ritmo.`
- START: statico, one-page, senza backend
- BUSINESS: multipagina, derivato dal commit canonico START e non autorizzato nella fase corrente
- Booking START: demo o canale esterno configurato
- Identità: porcellana, inchiostro, borgogna; Newsreader + Manrope
- Attribuzione: `Progettato e sviluppato da Tretnix`
- Project Knowledge: `compiled/LOVABLE_START_PROJECT_KNOWLEDGE.md`

## Completato

- posizionamento e cliente ideale;
- scope START e BUSINESS;
- roadmap futura;
- direzione visuale e motion;
- copy START e architettura contenuti BUSINESS;
- route e booking adapters;
- offerta commerciale senza prezzi imposti;
- adattatori per sottocategoria;
- questionario cliente;
- piano asset e brief fotografici;
- struttura repository;
- prompt START e BUSINESS;
- prompt di audit e review;
- checklist di attivazione e freeze;
- revisione di readiness;
- Workspace Knowledge condiviso;
- Project Knowledge START preparato;
- autorizzazione al parallelismo START.

## Non ancora verificato o eseguito

- conferma acquisto e rinnovo Lovable;
- registrazione workspace e saldo iniziale;
- verifica legale naming e dominio;
- creazione repository START;
- creazione progetto Lovable START;
- implementazione;
- typecheck, lint, test e build;
- browser QA e accessibilità;
- review Impeccable;
- audit tecnico;
- deploy;
- freeze START.
