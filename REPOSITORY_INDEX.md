# Tretnix Repository Index

**Versione:** 1.8
**Aggiornato:** 10 agosto 2026
**Stato dell’inventario:** completo rispetto ai cinque repository attualmente dichiarati

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

Handoff operativo più recente disponibile, ancora da riconciliare completamente con commit e pull request:

- `CF-1`, accessibilità del form contatti, riportato come unito e verificato;
- PR, merge commit e output dei controlli CF-1 da registrare;
- mismatch hydration relativo a `data-tsd-source` da investigare in sola lettura;
- `CF-2`, `CF-3`, `CF-4` e `CF-5` da gestire insieme nella branch `fix/impeccable-homepage-optimization`;
- un solo writer, reviewer read-only in parallelo e una sola pull request finale;
- `CF-6` rinviato finché non esistono asset definitivi.

Questi elementi hanno evidenza `HR` in `CURRENT_STATE.md`. Non dichiarare chiusura verificata finché non sono registrati PR, branch, SHA, output dei controlli e report hydration.

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
| Stato | baseline corrente approvata e congelata; Package D pendente e separato |
| Branch principale | `main` |
| Baseline storica Package C | `15a8bf4de41bc1657a79f58699859a015ee7820d` |
| Baseline di chiusura frozen | `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9` |
| Commit implementazione finale | `3a8ffe226170adab417c3c78dba287be6d39b96f` |
| Pull request finale | `#11` |
| Ultimo ciclo verificato | 10 agosto 2026 — finalizzazione gallery/lightbox, validation locale, push, merge PR #11; deploy post-merge non verificato |

### Relazione con altri progetti

Deriva da Forno Lume START.

Deve preservarne identità e linguaggio di animazione, espandendo struttura e contenuti.

### Ruolo canonico approvato per i pattern chiusi

Sulla baseline di chiusura frozen, BUSINESS è fonte tecnica approvata per i pattern chiusi e verificati:

- architettura multipagina Hospitality;
- drawer e lightbox accessibili;
- gallery/lightbox con swipe intenzionale, fallback tramite controlli precedente/successivo e reserved indicator lane;
- navigazione tra route, direct URL, refresh, Back e Forward;
- route reset e scroll restoration;
- ordine editoriale mobile senza duplicazione DOM;
- fallback runtime e pagina 404;
- policy demo `noindex, follow`;
- JSON-LD generico e route-aware;
- attribuzione Tretnix nel footer.

La baseline BUSINESS corrente è congelata su `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9`. Il Package D resta separato e pendente secondo `TRX-DEC-020` e non è autorizzato da questa chiusura. Le funzionalità del successivo BUSINESS PLUS devono derivare dal parent frozen registrato senza alterare lo stato del Package D.

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
- finalizzazione gallery/lightbox: completata, validata, pubblicata e unita con PR `#11`;
- Package D: pendente, separato e non autorizzato dal completamento del Package C;
- baseline BUSINESS frozen: `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9`.

La configurazione Cloudflare Pages verificata durante il ciclo precedente usa Bun, `bun.lock`, output `dist` e il preset Nitro `cloudflare-pages`. I dettagli sono registrati in `HOSPITALITY_FAMILY.md`. Il deploy post-merge della baseline frozen non è stato verificato in questa chiusura.

---


## 2.4 Forno Lume BUSINESS PLUS

### Identificazione

| Campo | Valore |
|---|---|
| Nome | `forno-lume-BUSINESS-PLUS` |
| Categoria | sito multipagina Hospitality — bootstrap del piano superiore |
| Piano | BUSINESS PLUS |
| Repository | `https://github.com/AdamDariOfficial/forno-lume-BUSINESS-PLUS.git` |
| Deploy | non eseguito |
| Stato | bootstrap derivato dal frozen BUSINESS e validato automaticamente; scope prodotto pendente |
| Branch principale | `main` |
| Parent BUSINESS frozen | `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9` |
| Primo commit PLUS | `54751867c9bfe30a34cf5081409317e53ca0ee67` |
| Merge bootstrap | `6dd30ec251a2c808de3692fb4e7cf43a4f10e2f6` |
| Checkpoint bootstrap validato | `bdfcb81b5c7051d20306327009bbe0a5fcf62d1e` |
| Ultimo audit | 10 agosto 2026 — lineage, delta remix, frozen install, typecheck, lint, build e cleanup EOL verificati; browser QA/deploy non eseguiti |

### Relazione con altri progetti

Deriva direttamente dalla baseline frozen di Forno Lume BUSINESS `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9`. Il primo commit PLUS `54751867c9bfe30a34cf5081409317e53ca0ee67` ha quel frozen SHA come parent diretto.

Non deriva dal commit pre-merge gallery, da una working tree intermedia o da una baseline BUSINESS precedente.

### Stato del bootstrap

Il delta rispetto al frozen BUSINESS è limitato a:

- `package.json`;
- `bun.lock`;
- `README.md`.

Non risultano modifiche ai sorgenti applicativi nel remix. `package.json` fissa `@Lovable.dev/vite-tanstack-config` a `2.9.1`; il lockfile riflette il bootstrap Lovable e il README è stato aggiunto dal progetto remixato.

Controlli eseguiti e superati sul checkpoint `bdfcb81b5c7051d20306327009bbe0a5fcf62d1e`:

- `bun install --frozen-lockfile`;
- `bun run typecheck`;
- `bun run lint` con `0` errori e `8` warning;
- `bun run build` con build client, SSR e Nitro Cloudflare module;
- verifica ancestry verso `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9`;
- classificazione `src/routeTree.gen.ts` come residuo EOL-only e ripristino;
- working tree finale pulita.

Browser QA e deploy non sono stati eseguiti.

### Ruolo canonico

BUSINESS PLUS non è ancora fonte canonica per nuovi pattern. Il checkpoint `bdfcb81b5c7051d20306327009bbe0a5fcf62d1e` è un bootstrap tecnico validato e costituisce la base operativa iniziale per definire lo scope prodotto PLUS.

Fino all'approvazione dello scope e alla successiva implementazione/verifica:

- preservare i pattern canonici START/BUSINESS pertinenti;
- non reinterpretare il README/descrizione START ereditati come specifica attiva PLUS;
- non assorbire o riaprire il Package D BUSINESS;
- non dichiarare browser QA, deploy o completamento prodotto.

---

## 2.5 Tretnix Knowledge

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
| Commit canonico verificato | `de29f4f3bde0b4f91266505fd73d128f74d11e3f` |
| Snapshot usato per la patch esterna | `Tretnix-knowledge-de29f4f3.zip` |
| SHA-256 snapshot | `3cf34a6f145a1834d211f65917950dc92e940f259d7585f16342d1bb00730032` |
| Commit della patch di governance | da registrare dopo merge |
| Ultima revisione | 26 luglio 2026 — baseline post-ingestione e preparazione governance/validazione |

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
- la visibilità corrente è pubblica durante audit e consolidamento secondo `TRX-DEC-031`;
- durante la fase pubblica non contiene segreti, dati personali non necessari, dati cliente riservati o accessi di produzione;
- il passaggio a privata richiede completamento del ciclo, verifica delle dipendenze di accesso e conferma esplicita del proprietario;
- la validazione locale e CI non sostituisce la diff review umana.

---

# 3. Mappa delle relazioni

```text
Tretnix.com
└── sito istituzionale e sistema amministrativo interno

Forno Lume START
└── baseline canonica visuale e single-page Hospitality START
    └── Forno Lume BUSINESS
        └── Forno Lume BUSINESS PLUS — bootstrap `bdfcb81b5c7051d20306327009bbe0a5fcf62d1e`

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

1. applicare, validare e unire la patch Tretnix Knowledge preparata sulla baseline `de29f4f3…`;
2. sincronizzare `main`, registrare il nuovo commit canonico ed eseguire la prova di ricostruzione senza chat;
3. riconciliare CF-1 con PR, merge commit e verifiche nel repository `tretnix`;
4. investigare `data-tsd-source` in sola lettura;
5. eseguire CF-2, CF-3, CF-4 e CF-5 nella sola branch `fix/impeccable-homepage-optimization`, con un writer e una PR finale;
6. mantenere CF-6 rinviato finché non esistono asset definitivi;
7. mantenere `forno-lume-START` congelato salvo scope approvato e trattare BUSINESS/Package D soltanto dopo la stabilizzazione precedente;
8. avviare esclusivamente `RITO Studio START` dopo entrambi i gate;
9. non iniziare RITO Studio BUSINESS prima del freeze START;
10. aggiornare il registro dei pattern canonici soltanto quando nuovi pattern vengono verificati.

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
