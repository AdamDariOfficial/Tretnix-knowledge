# Tretnix Repository Index

**Versione:** 1.2
**Aggiornato:** 20 luglio 2026
**Stato dell’inventario:** completo rispetto ai quattro repository attualmente dichiarati

Questo indice descrive il ruolo noto dei repository. Non sostituisce l’audit del codice.

---

## 1. Regole dell’inventario

Ogni repository deve registrare:

- nome;
- categoria;
- piano;
- URL;
- deploy;
- stato;
- branch principale;
- commit auditato;
- relazione con altri progetti;
- ruolo canonico;
- informazioni confermate;
- aspetti da verificare;
- problemi già conosciuti;
- accessi disponibili;
- data dell’ultimo audit.

L’inventario è completo soltanto rispetto al manifest approvato.

---

# 2. Repository attuali

## 2.1 Tretnix.com

### Identificazione

| Campo | Valore |
|---|---|
| Nome | `tretnix` |
| Categoria | sito istituzionale con area amministrativa |
| Piano | INTERNO |
| Repository | `https://github.com/AdamDariOfficial/tretnix.git` |
| Deploy | `https://tretnix.com` |
| Stato | produzione |
| Branch principale | da verificare |
| Commit auditato | non ancora auditato |
| Ultimo audit | non eseguito |

### Relazione con altri progetti

È il sito istituzionale Tretnix. Non deriva da Forno Lume.

### Ruolo canonico dichiarato

- brand aziendale;
- posizionamento premium e boutique;
- esperienza istituzionale;
- componenti e pattern del sito Tretnix;
- area amministrativa;
- gestione dei contatti.

### Stato dichiarato

Completato. Rimangono revisioni di dettaglio:

- SEO;
- aspetti legali;
- colori.

Queste revisioni non sono considerate problemi gravi già confermati.

### Funzionalità note da verificare nel codice

- sito pubblico;
- form contatti;
- autenticazione;
- ruoli;
- area `/admin`;
- gestione progetti;
- impostazioni;
- analytics;
- contact requests;
- Supabase o Lovable Cloud.

### Problemi o aree già note

- navbar;
- scroll-spy;
- navigazione cross-route;
- autenticazione e ruoli;
- admin;
- analytics;
- contact requests;
- accessibilità;
- SEO;
- sicurezza Supabase.

### Ruolo canonico non ancora assegnabile

Non considerare automaticamente canonici:

- architettura;
- autenticazione;
- RLS;
- analytics;
- implementazione navbar;
- standard tecnici generali.

Questi aspetti richiedono audit.

---

## 2.2 Forno Lume START

### Identificazione

| Campo | Valore |
|---|---|
| Nome | `forno-lume-START` |
| Categoria | landing / sito Hospitality |
| Piano | START |
| Repository | `https://github.com/AdamDariOfficial/forno-lume-START.git` |
| Deploy | `https://forno-lume.tretnix.com` |
| Stato | chiuso, verificato e congelato |
| Branch principale | `main` |
| Baseline di chiusura | `d15f639267dfdd57194536154abfa1d0ff3b4542` |
| Ultimo audit | 18 luglio 2026 — ciclo completo di audit, remediation e chiusura tecnica |

### Relazione con altri progetti

È il progetto originale della famiglia Forno Lume.

Forno Lume BUSINESS deriva da questo progetto.

### Ruolo canonico approvato

Baseline canonica per:

- qualità visuale Hospitality;
- qualità di tipografia e palette Hospitality;
- struttura premium single-page START;
- qualità responsive;
- comportamento percepito della navbar;
- sobrietà delle interazioni;
- linguaggio del movimento;
- reveal editoriali sotto la fold.

### Identità nota

- atmosfera crema, terracotta, oliva e oro attenuato;
- titoli editoriali con Fraunces;
- testo e interfaccia con Inter;
- stile caldo, elegante e artigianale;
- non deve essere trasformato in un design SaaS generico.

I valori tecnici esatti devono essere verificati nel codice e documentati nel futuro design system del progetto.

### Chiusura verificata

- completato;
- rimediato;
- tecnicamente chiuso sulla baseline `d15f639267dfdd57194536154abfa1d0ff3b4542`;
- verificato in produzione dal proprietario del progetto;
- documentato;
- congelato.

Ulteriori modifiche sorgente richiedono:

- un bug confermato;
- una regressione confermata;
- un problema di sicurezza;
- un requisito di prodotto approvato esplicitamente.

La presenza di backlog non autorizza pulizia opzionale.

### Verifiche registrate

Eseguite e superate durante la chiusura tecnica:

- `bun run typecheck`;
- `bun run build`;
- build di produzione client;
- build di produzione SSR;
- build di produzione Nitro/Cloudflare;
- `git diff --check`;
- ESLint con la regola Prettier disabilitata: zero errori;
- verifica browser in produzione completata con successo dal proprietario del progetto.

Limitazioni note:

- il lint completo fallisce perché il checkout Windows usa CRLF mentre Prettier richiede LF;
- rimangono sei warning preesistenti `react-refresh/only-export-components` nei file scaffold shadcn;
- i warning non sono stati introdotti dalla remediation;
- non dichiarare il lint completo come superato.

### Backlog START non bloccante

Registrato senza autorizzare implementazione:

- favicon personalizzata approvata;
- immagine social-preview orizzontale ottimizzata;
- test controllato di fault SSR 500;
- normalizzazione della policy dei line ending del repository;
- revisione dello scaffold shadcn inutilizzato;
- revisione del provider React Query inutilizzato;
- pulizia dei warning tecnici soltanto con controlli di regressione appropriati.

Questi elementi non bloccano il lavoro su Forno Lume BUSINESS.

### Ambiti non canonici

START non è automaticamente canonico per:

- architettura di routing multipagina;
- gallerie e lightbox;
- funzionalità BUSINESS o BUSINESS PLUS;
- sistemi amministrativi;
- autenticazione e autorizzazione;
- architettura backend;
- database e storage.

Questi ambiti devono essere valutati indipendentemente nel repository pertinente.

---

## 2.3 Forno Lume BUSINESS

### Identificazione

| Campo | Valore |
|---|---|
| Nome | `forno-lume-BUSINESS` |
| Categoria | sito multipagina Hospitality |
| Piano | BUSINESS |
| Repository | `https://github.com/AdamDariOfficial/forno-lume-BUSINESS.git` |
| Deploy | `https://forno-lume-business.tretnix.com` |
| Stato | produzione / prossimo audit Hospitality attivo |
| Branch principale | da verificare |
| Commit auditato | non ancora auditato |
| Ultimo audit | non eseguito |

### Relazione con altri progetti

Deriva da Forno Lume START.

Deve preservarne identità e linguaggio di animazione, espandendo struttura e contenuti.

### Ruolo canonico candidato, non approvato

- architettura multipagina Hospitality;
- configurazione centralizzata;
- navigazione tra route;
- galleria e lightbox;
- espansione START → BUSINESS.

Il ruolo canonico tecnico deve essere confermato soltanto dopo audit, remediation e verifiche. Non assumere validi i pattern BUSINESS prima di tale chiusura.

### Route previste

```text
/
/menu
/chi-siamo
/galleria
/contatti
/privacy
/cookie
404
```

### Identità da preservare

- palette;
- Fraunces;
- Inter;
- atmosfera;
- immagini;
- composizione approvata;
- linguaggio di animazione dello START.

### Aree da controllare

- confronto visuale e tecnico con START;
- animazioni mancanti o alterate;
- route reset;
- navbar;
- configurazione centralizzata;
- SEO multipagina;
- lightbox `100dvh`;
- ordine editoriale mobile;
- navigazione;
- direct URL;
- refresh;
- back e forward;
- regressioni introdotte durante l’espansione.

---


## 2.4 Tretnix Knowledge

### Identificazione

| Campo | Valore |
|---|---|
| Nome | `Tretnix-knowledge` |
| Categoria | repository operativo e documentale interno |
| Piano | INTERNO |
| Repository | `https://github.com/AdamDariOfficial/Tretnix-knowledge.git` |
| Deploy | non applicabile |
| Stato | operativo |
| Branch principale | `main` |
| Commit auditato | repository ispezionata il 17 luglio 2026 |
| Ultimo audit | revisione documentale per integrazione Codex |

### Ruolo canonico

- identità e posizionamento Tretnix;
- decisioni approvate;
- standard condivisi;
- indice dei repository;
- template e procedure;
- adattatori per ChatGPT, Lovable, Cursor e Codex;
- kit di configurazione dei progetti.

### Regole

- è la fonte canonica trasversale;
- non contiene bug temporanei o task correnti dei progetti;
- ogni modifica significativa usa branch, diff e pull request;
- deve tornare privata dopo le operazioni che richiedono accesso pubblico, salvo decisione diversa.

---

# 3. Mappa delle relazioni

```text
Tretnix.com
└── sito istituzionale e sistema amministrativo interno

Forno Lume START
└── baseline canonica visuale e single-page Hospitality START
    └── Forno Lume BUSINESS
        └── futuro BUSINESS PLUS
```

---

# 4. Registro iniziale dei pattern candidati

| Pattern | Repository candidato | Stato |
|---|---|---|
| Brand Tretnix | `tretnix` | dichiarato, da documentare |
| Esperienza istituzionale premium | `tretnix` | da auditare |
| Qualità visuale Hospitality | `forno-lume-START` | canonico, baseline di chiusura verificata |
| Tipografia e palette Hospitality | `forno-lume-START` | canonico |
| Struttura premium single-page START | `forno-lume-START` | canonico |
| Motion e reveal editoriali Hospitality | `forno-lume-START` | canonico per il comportamento percepito |
| Navbar Hospitality | `forno-lume-START` | canonico per il comportamento percepito |
| Responsive Hospitality | `forno-lume-START` | canonico |
| Architettura multipagina Hospitality | `forno-lume-BUSINESS` | candidato |
| Configurazione centralizzata | `forno-lume-BUSINESS` | candidato |
| Lightbox | `forno-lume-BUSINESS` | candidato, da verificare |
| Funzionalità di piano superiore | `forno-lume-BUSINESS` | candidato, da verificare |
| Admin | `tretnix` | candidato, da auditare |
| Autenticazione e ruoli | nessuna fonte assegnata | da auditare |
| RLS e sicurezza Supabase | nessuna fonte assegnata | da auditare |
| Test | nessuna fonte assegnata | da inventariare |
| Git workflow | `tretnix-knowledge` | standard condiviso |
| Agent handoff | `tretnix-knowledge` | standard condiviso |
| Codex workflow | `tretnix-knowledge` | approvato, pilota su START |

---

# 5. Ordine operativo aggiornato

1. mantenere `forno-lume-START` chiuso e congelato;
2. auditare `forno-lume-BUSINESS` come prossimo repository Hospitality attivo;
3. confrontare BUSINESS con la baseline START `d15f639267dfdd57194536154abfa1d0ff3b4542`;
4. valutare indipendentemente routing multipagina, gallerie, lightbox e funzionalità di piano superiore;
5. rimediare soltanto finding approvati;
6. eseguire i controlli disponibili e la verifica manuale richiesta;
7. approvare eventuali pattern BUSINESS soltanto dopo la chiusura del relativo ciclo;
8. auditare `tretnix`;
9. aggiornare il registro dei pattern canonici.

Le vulnerabilità critiche o alte rilevate devono essere segnalate immediatamente e prioritarizzate.

---

# 6. Template per una nuova repository

```md
## Nome progetto

### Identificazione

| Campo | Valore |
|---|---|
| Nome | |
| Categoria | sito / landing / gestionale / dashboard / CRM / template / progetto interno |
| Piano | START / BUSINESS / BUSINESS PLUS / CUSTOM / INTERNO |
| Repository | |
| Deploy | |
| Stato | in sviluppo / staging / produzione / archiviato |
| Branch principale | |
| Commit auditato | |
| Ultimo audit | |

### Relazione con altri progetti

Descrivere progetto originale, derivazione, template o riferimento.

### Ruolo canonico dichiarato

Specificare se rappresenta un riferimento per componenti, animazioni, settore, UX o architettura.

### Informazioni confermate

-

### Aspetti da verificare

-

### Problemi già conosciuti

-

### Accessi disponibili

- repository:
- deploy:
- ambiente locale:
- Supabase:
- analytics:
- hosting:

### Esclusioni dall’audit

-
```
