# Tretnix Repository Index

**Versione:** 1.5
**Aggiornato:** 26 luglio 2026
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

Il sito è in produzione e in remediation controllata.

Handoff operativo più recente disponibile, ancora da riconciliare con commit e pull request:

- `CF-1`, accessibilità del form contatti, riportato come implementato e verificato;
- pull request CF-1 riportata come ancora da unire;
- sincronizzazione di `main` e verifica working tree pulito da eseguire dopo il merge;
- mismatch hydration relativo a `data-tsd-source` da investigare in sola lettura;
- finding successivi da trattare uno per branch.

Questi elementi hanno evidenza `HR` in `CURRENT_STATE.md`. Non dichiarare merge o chiusura verificati finché non sono registrati PR, branch, SHA e output dei controlli.

Restano inoltre aree di revisione su SEO, aspetti legali e colori.

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
| Stato | produzione; Package A, B, B2 e C completati; Package D pendente |
| Branch principale | `main` |
| Baseline verificata Package C | `15a8bf4de41bc1657a79f58699859a015ee7820d` |
| Commit implementazione Package C | `f85e351` |
| Ultimo ciclo verificato | 25 luglio 2026 — remediation controllata, merge PR #5 e verifica produzione |

### Relazione con altri progetti

Deriva da Forno Lume START.

Deve preservarne identità e linguaggio di animazione, espandendo struttura e contenuti.

### Ruolo canonico approvato per i pattern chiusi

Sulla baseline verificata del Package C, BUSINESS è fonte tecnica approvata per:

- architettura multipagina Hospitality;
- drawer e lightbox accessibili;
- navigazione tra route, direct URL, refresh, Back e Forward;
- route reset e scroll restoration;
- ordine editoriale mobile senza duplicazione DOM;
- fallback runtime e pagina 404;
- policy demo `noindex, follow`;
- JSON-LD generico e route-aware;
- attribuzione Tretnix nel footer.

Rimangono separati e non automaticamente canonici gli ambiti del Package D e qualsiasi funzionalità futura non ancora verificata.

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

### Stato verificato dei package

- Package A: completato e unito;
- Package B: completato e unito;
- micro-fix “L'incontro”: completato e unito;
- Package B2: completato e unito;
- Package C: completato, unito, costruito e verificato in produzione;
- Package D: pendente e da gestire separatamente.

La configurazione Cloudflare Pages verificata usa Bun, `bun.lock`, output `dist` e il preset Nitro `cloudflare-pages`. I dettagli sono registrati in `HOSPITALITY_FAMILY.md`.

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
| Baseline precedente | `60ac030d0c231443f1879c9bafc46f2626769f3d` |
| Primo commit di consolidamento | `9ff9546` sul branch `docs/consolidate-tretnix-state-2026-07-26` |
| Commit canonico finale | da registrare dopo merge |
| Ultimo audit | consolidamento documentale e ingestione development pack il 26 luglio 2026 |

### Ruolo canonico

- identità e posizionamento Tretnix;
- decisioni approvate;
- standard condivisi;
- indice dei repository;
- template e procedure;
- adattatori per ChatGPT, Lovable, Cursor e Codex;
- kit di configurazione dei progetti;
- family kit completi Beauty, Professional e Home;
- manifest, handoff e provenienza degli artefatti sorgente.

### Regole

- è la fonte canonica trasversale;
- non contiene bug temporanei o task correnti dei progetti;
- ogni modifica significativa usa branch, diff e pull request;
- la visibilità osservata il 26 luglio 2026 è pubblica;
- la preferenza precedente per una repository privata non deve essere trattata come impostazione già applicata;
- la visibilità definitiva richiede decisione esplicita del proprietario.

---

# 3. Mappa delle relazioni

```text
Tretnix.com
└── sito istituzionale e sistema amministrativo interno

Forno Lume START
└── baseline canonica visuale e single-page Hospitality START
    └── Forno Lume BUSINESS
        └── futuro BUSINESS PLUS

Beauty & Wellness v1.1
└── RITO Studio START
    └── pianificato, non implementato e privo di repository
        └── RITO Studio BUSINESS dopo freeze START

Professional Services v1.0
└── QUADRA Studio START
    └── pianificato, non implementato e privo di repository
        └── QUADRA Studio BUSINESS dopo freeze START

Home & Local Services v1.0
└── NODO Servizi START
    └── pianificato, non implementato e privo di repository
        └── NODO Servizi BUSINESS dopo freeze START
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
| Architettura multipagina Hospitality | `forno-lume-BUSINESS` | canonico per i pattern verificati fino al Package C |
| Routing, history e scroll multipagina | `forno-lume-BUSINESS` | canonico per il pattern verificato |
| Drawer e lightbox accessibili | `forno-lume-BUSINESS` | canonico per il pattern verificato |
| Error fallback, 404, demo SEO e JSON-LD | `forno-lume-BUSINESS` | canonico per il pattern verificato |
| Funzionalità di piano superiore oltre il Package C | `forno-lume-BUSINESS` | da verificare nel Package D o in task successivi |
| Admin | `tretnix` | candidato, da auditare |
| Autenticazione e ruoli | nessuna fonte assegnata | da auditare |
| RLS e sicurezza Supabase | nessuna fonte assegnata | da auditare |
| Test | nessuna fonte assegnata | da inventariare |
| Git workflow | `tretnix-knowledge` | standard condiviso |
| Agent handoff | `tretnix-knowledge` | standard condiviso |
| Codex workflow | `tretnix-knowledge` | approvato, pilota su START |

---

# 5. Progetti pianificati senza repository

Questa sezione registra nomi e gate senza descrivere risorse remote inesistenti.

## 5.1 RITO Studio

| Campo | START | BUSINESS |
|---|---|---|
| Verticale | Beauty & Wellness | Beauty & Wellness |
| Repository previsto | `rito-studio-START` | `rito-studio-BUSINESS` |
| Stato | `PREPARATION_COMPLETE / IMPLEMENTATION_NOT_STARTED` | bloccato fino al freeze START |
| Repository reale | non creata | non creata |
| Specifica | `family-kits/beauty-wellness-v1.1/` | stessa famiglia, contratto START → BUSINESS |

Gate START: abbonamento Lovable confermato e autorizzazione esplicita a `RITO Studio START`, oltre al runbook operativo.

## 5.2 QUADRA Studio

| Campo | START | BUSINESS |
|---|---|---|
| Verticale | Professional Services | Professional Services |
| Repository previsto | `quadra-studio-START` | `quadra-studio-BUSINESS` |
| Stato | `PREPARATION_COMPLETE / IMPLEMENTATION_NOT_STARTED` | bloccato fino al freeze START |
| Repository reale | non creata | non creata |
| Specifica | `family-kits/professional-services-v1.0/` | stessa famiglia, contratto START → BUSINESS |

## 5.3 NODO Servizi

| Campo | START | BUSINESS |
|---|---|---|
| Verticale | Home & Local Services | Home & Local Services |
| Repository previsto | `nodo-servizi-START` | `nodo-servizi-BUSINESS` |
| Stato | `PREPARATION_COMPLETE / IMPLEMENTATION_NOT_STARTED` | stretch goal, bloccato fino al freeze START |
| Repository reale | non creata | non creata |
| Specifica | `family-kits/home-local-services-v1.0/` | stessa famiglia, contratto START → BUSINESS |

Per tutti i progetti: nessun URL, branch, commit, deploy, test o verifica viene registrato finché non esiste evidenza reale.

---

# 6. Ordine operativo aggiornato

1. completare la revisione del branch di consolidamento Tretnix Knowledge;
2. aprire e unire la pull request dopo diff review;
3. sincronizzare `main` e registrare il commit canonico finale;
4. eseguire una prova di ricostruzione senza chat;
5. riconciliare CF-1 con PR, branch, commit e verifiche nel repository `tretnix`;
6. investigare `data-tsd-source` in sola lettura;
7. proseguire i finding `tretnix` uno per branch;
8. mantenere `forno-lume-START` congelato e Package D separato;
9. avviare esclusivamente `RITO Studio START` dopo i gate;
10. aggiornare il registro dei pattern canonici quando nuovi pattern vengono verificati.

Le vulnerabilità critiche o alte rilevate devono essere segnalate immediatamente e prioritarizzate.

---

# 7. Template per una nuova repository

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
