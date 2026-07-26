# RITO Studio — Repository Bootstrap

**Versione:** 1.0  
**Stato:** procedura pronta; repository non ancora creati

## 1. Repository previsti

```text
rito-studio-START
rito-studio-BUSINESS
```

Naming alternativo, se si preferisce il prefisso di famiglia:

```text
beauty-rito-START
beauty-rito-BUSINESS
```

Non cambiare naming dopo l'avvio senza aggiornare documentazione, deploy e riferimenti.

## 2. START — struttura documentale iniziale

```text
README.md
AGENTS.md
docs/
├── PRODUCT.md
├── DESIGN.md
├── CONTENT.md
├── ROUTES.md
├── ANIMATIONS.md
├── TESTING.md
├── DECISIONS.md
├── STATUS.md
├── COMMERCIAL_OFFER.md
├── VERTICAL_ADAPTERS.md
├── ASSET_PLAN.md
└── START_BUSINESS_CONTRACT.md
```

Aggiungere file tecnici reali soltanto dopo la generazione del progetto.

## 3. Branch

```text
main
feature/initial-build
fix/*
audit/*
polish/*
docs/*
```

`main` deve rappresentare una versione distribuibile. Coordinare Lovable e interventi locali: non modificare gli stessi file contemporaneamente.

## 4. Sequenza START

```text
specifica approvata
→ creazione progetto Lovable
→ prima costruzione
→ sincronizzazione GitHub
→ stop Lovable
→ diff e audit
→ finding approvati
→ correzioni su branch
→ QA
→ PR
→ merge
→ tag family-start-v1.0
```

## 5. Commit iniziali consigliati

```text
docs: add approved Beauty START specification
feat: build initial RITO Studio START
fix: address approved START audit findings
polish: refine approved visual details
docs: record canonical START baseline
```

Non dichiarare questi commit esistenti finché non vengono realmente creati.

## 6. Tag freeze

```text
family-start-v1.0
family-business-v1.0
```

Ogni tag deve avere:

- commit SHA;
- data;
- report verifiche;
- screenshot principali;
- limitazioni note;
- contratto START → BUSINESS aggiornato.

## 7. BUSINESS

BUSINESS deve nascere dal commit canonico START o da una copia verificabile dello stesso. Non avviare un progetto vuoto reinterpretando il brief.

## 8. Protezioni e sincronizzazione

Prima di applicare branch protection verificare come Lovable sincronizza il repository. Non introdurre regole che blocchino il flusso senza test.

## 9. Segreti e ambienti

START non richiede segreti. Non creare `.env` fittizi né aggiungere Supabase.

BUSINESS richiede variabili solo se viene attivata una vera integrazione. In tal caso:

- documentare ogni variabile;
- non committare valori;
- usare minimo privilegio;
- separare demo, staging e produzione.

## 10. Metadati repository

Descrizione START:

```text
Premium mobile-first Beauty & Wellness portfolio concept by Tretnix. Static START website for RITO Studio.
```

Descrizione BUSINESS:

```text
Multipage evolution of the RITO Studio Beauty & Wellness START concept, designed and developed by Tretnix.
```

Non citare strumenti interni nelle descrizioni pubbliche.
