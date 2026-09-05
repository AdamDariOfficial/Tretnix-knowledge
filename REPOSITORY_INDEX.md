# Tretnix Repository Index

**Versione:** 2.2
**Aggiornato:** 5 settembre 2026
**Stato dell’inventario:** completo rispetto agli otto repository attualmente dichiarati

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
| Stato | chiuso e congelato sulla baseline finale |
| Branch principale | `main` |
| Baseline tecnica storica | `d15f639267dfdd57194536154abfa1d0ff3b4542` |
| Baseline sorgente frozen corrente | `a817903923c1bbfe177d8b59e70a4aa1137b7ab1` |
| Commit final polish | `0a104d7525644fca5f594d7092b574b8f3997f79` |
| Pull request finale | `#14` |
| Ultimo ciclo | 28 agosto 2026 — final polish, validation locale riportata, browser QA approvato dal proprietario, merge PR #14; deploy post-merge della nuova baseline non verificato |

### Relazione con altri progetti

È il progetto originale della famiglia Forno Lume e la fonte visuale/percepita START. Forno Lume BUSINESS deriva storicamente da questo progetto e riceve i miglioramenti START soltanto quando applicabili al proprio contratto multipagina.

### Ruolo canonico approvato

Baseline canonica per:

- qualità visuale Hospitality;
- qualità di tipografia e palette Hospitality;
- struttura premium single-page START;
- qualità responsive e transizioni tablet/desktop;
- comportamento percepito della navbar;
- sobrietà delle interazioni e hover;
- linguaggio del movimento e reduced motion;
- reveal editoriali sotto la fold;
- trattamento consent-gated della mappa e review surface opzionale con dati reali in produzione.

Gli esatti breakpoint o dettagli di implementazione restano project-specific e non devono essere copiati in BUSINESS senza verificare densità, routing e composizione.

### Identità nota

- atmosfera crema, terracotta, oliva e oro attenuato;
- titoli editoriali con Fraunces;
- testo e interfaccia con Inter;
- stile caldo, elegante e artigianale;
- non deve essere trasformato in un design SaaS generico.

### Chiusura corrente

- baseline sorgente frozen `a817903923c1bbfe177d8b59e70a4aa1137b7ab1`;
- PR finale `#14` unita su `main`;
- commit implementazione `0a104d7525644fca5f594d7092b574b8f3997f79`;
- validation locale riportata: typecheck, lint con `0` errori e `6` warning Fast Refresh preesistenti, build client/SSR/Nitro, `git diff --check` e whitespace con exit `0`;
- browser QA finale approvato dal proprietario prima del merge;
- deploy post-merge della baseline `a817903...`: non verificato in questa riconciliazione.

Ulteriori modifiche sorgente richiedono bug, regressione, sicurezza o requisito di prodotto approvato esplicitamente.

### Backlog START non bloccante

Registrato senza autorizzare implementazione:

- favicon personalizzata approvata;
- immagine social-preview orizzontale ottimizzata;
- test controllato di fault SSR 500;
- normalizzazione della policy dei line ending del repository;
- revisione dello scaffold shadcn inutilizzato;
- revisione del provider React Query inutilizzato;
- pulizia dei warning tecnici soltanto con controlli di regressione appropriati.

### Ambiti non canonici

START non è automaticamente canonico per routing multipagina, gallery/lightbox BUSINESS, sistemi amministrativi, autenticazione/autorizzazione, backend, database o storage. Questi ambiti restano governati dal repository pertinente.

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
| Stato | completato, finalizzato e congelato sulla baseline corrente; Package D pendente e separato |
| Branch principale | `main` |
| Baseline storica Package C | `15a8bf4de41bc1657a79f58699859a015ee7820d` |
| Baseline frozen pre-polish | `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9` |
| Baseline frozen corrente | `9bc33cd5737af7763fe9c61ddc52eb7a606fafea` |
| Commit implementazione final polish | `a77ea376686c0a87f37e91d5f06670e773683700` |
| Pull request final polish | `#12` |
| Ultimo ciclo verificato | 4 settembre 2026 — final polish parity/adaptation, CCP v2.4.3 riportato verde, browser QA approvato, merge PR #12; deploy post-merge non verificato |

### Relazione con altri progetti

Deriva da Forno Lume START.

Preserva identità e linguaggio di animazione Hospitality, espandendo struttura, contenuti e routing multipagina. Il repository BUSINESS PLUS già esistente conserva il lineage storico dalla baseline `389bd1...`; il nuovo freeze BUSINESS non lo riallinea automaticamente.

### Ruolo canonico approvato per i pattern chiusi

Sulla baseline frozen corrente, BUSINESS è fonte tecnica approvata per i pattern chiusi e verificati:

- architettura multipagina Hospitality;
- drawer e lightbox accessibili;
- gallery/lightbox con swipe intenzionale, fallback tramite controlli precedente/successivo e reserved indicator lane;
- navigazione tra route, direct URL, refresh, Back e Forward;
- route reset e scroll restoration;
- smooth navigation intenzionale delle categorie menu con reduced-motion e hash/history preservati;
- ordine editoriale mobile senza duplicazione DOM;
- responsive multipagina Hospitality;
- CTA/contact choice e hover verificati nel final polish;
- fallback runtime e pagina 404;
- policy demo `noindex, follow`;
- JSON-LD generico e route-aware;
- attribuzione Tretnix nel footer.

La baseline `9bc33cd5737af7763fe9c61ddc52eb7a606fafea` sostituisce `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9` come riferimento sorgente frozen corrente. `389bd1...` resta la baseline frozen storica pre-polish.

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
- linguaggio di animazione dello START adattato alla variante BUSINESS.

### Stato verificato dei package

- Package A: completato e unito;
- Package B: completato e unito;
- micro-fix “L'incontro”: completato e unito;
- Package B2: completato e unito;
- Package C: completato, unito, costruito e verificato in produzione nel relativo ciclo;
- finalizzazione gallery/lightbox: completata e unita con PR `#11`;
- final polish parity/adaptation: completato, validato, approvato e unito con PR `#12`;
- Package D: pendente, separato e non autorizzato dal final polish;
- baseline BUSINESS frozen corrente: `9bc33cd5737af7763fe9c61ddc52eb7a606fafea`.

La configurazione Cloudflare Pages verificata durante il ciclo precedente usa Bun, `bun.lock`, output `dist` e il preset Nitro `cloudflare-pages`. I dettagli sono registrati in `HOSPITALITY_FAMILY.md`. Il deploy post-merge della nuova baseline frozen non è stato verificato.

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

## 2.5 RITO Studio START

### Identificazione

| Campo | Valore |
|---|---|
| Nome | `rito-studio-START` |
| Categoria | sito Beauty & Wellness START |
| Piano | START |
| Repository | `https://github.com/AdamDariOfficial/rito-studio-START.git` |
| Deploy | non riconciliato in questa revisione Knowledge |
| Stato | implementato e in evoluzione controllata; `main` verificato dopo il polish method/footer/FAQ; nessun nuovo freeze/tag creato dal task del 5 settembre |
| Branch principale | `main` |
| Commit verificato | `96e73492313e37689a1785b1e2762fff7611e828` |
| Commit applicativo polish | `d235346ae19e9aa33f7306070a439a13a7a4507b` |
| Pull request polish | `#12` |
| Ultima verifica repository | 5 settembre 2026 |

### Ruolo nel lineage

Implementation truth corrente di RITO Studio START per i nuovi interventi autorizzati. L'avanzamento di START a `96e734...` non riscrive retroattivamente il lineage già esistente di BUSINESS e BUSINESS PLUS: il parent storico `34c13cd...` registrato dai discendenti rimane evidenza del loro lineage finché un gate separato non autorizza un riallineamento.

---

## 2.6 RITO Studio BUSINESS

### Identificazione

| Campo | Valore |
|---|---|
| Nome | `rito-studio-BUSINESS` |
| Categoria | sito multipagina Beauty & Wellness |
| Piano | BUSINESS |
| Repository | `https://github.com/AdamDariOfficial/rito-studio-BUSINESS.git` |
| Deploy | non riconciliato in questa revisione Knowledge |
| Stato | implementato; `main` verificato; freeze `b95a63c…` riportato dal candidate PLUS, con documentazione parent da riallineare |
| Branch principale | `main` |
| Commit verificato | `b95a63c6127d2bc1dd396d74b2dd25f87b952226` |
| Ultima verifica repository | 13 agosto 2026 |

### Ruolo nel lineage

Fonte di riferimento Beauty & Wellness BUSINESS e parent del candidate BUSINESS PLUS. Il candidate PLUS registra `b95a63c…` come frozen; la documentazione BUSINESS contiene ancora evidenza precedente che non dichiara quel freeze nello stesso pass. Preservare le differenze visuali intenzionali rispetto ad Hospitality e chiudere la riconciliazione parent prima di promuovere lo stato a canonico trasversale definitivo.

---

## 2.7 RITO Studio BUSINESS PLUS

### Identificazione

| Campo | Valore |
|---|---|
| Nome | `rito-studio-BUSINESS-PLUS` |
| Categoria | sito + consultation workflow + mini-admin Beauty & Wellness |
| Piano | BUSINESS PLUS |
| Repository | `https://github.com/AdamDariOfficial/rito-studio-BUSINESS-PLUS.git` |
| Produzione | non autorizzata |
| Staging | backend live Cloudflare attivo; chiusura E2E pendente |
| Branch principale remota | `main` |
| Commit remoto verificato | `eba1a2a91fd3a531b4a4667d038b631758d0a664` |
| Working branch riportata | `feat/rito-business-plus-complete` con delta controllato non ancora integrato |
| Stato auth | Native RITO AdminAuth in debugging: ramo di rifiuto normale verificato, login valido/sessione non ancora certificati |
| Ultima riconciliazione | 13 agosto 2026 |

### Architettura corrente

Il candidate live usa Cloudflare Workers, D1, Durable Objects/Hibernation WebSocket, rate limiting e secrets. D1 è la fonte persistente; il realtime è una notifica separata e non deve determinare retroattivamente il fallimento di una scrittura già committata.

Cloudflare è un provider infrastrutturale scelto per il fit di questo progetto, non un requisito del dominio Beauty & Wellness. Prima del freeze finale, dopo la chiusura funzionale, è previsto un gate separato di provider-boundary hardening secondo `TRX-DEC-035`.

BUSINESS PLUS non è ancora fonte canonica trasversale per Native AdminAuth o realtime finché login/session/logout, WebSocket authorization e `/consulenza` → D1 → realtime/reconnect non sono chiusi con evidenza.

---

## 2.8 Tretnix Knowledge

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
| Baseline `main` verificata prima di questa riconciliazione | `f288304016c245746ba9e7290241d0248acccab4` |
| Snapshot storico usato per la patch di governance del 26 luglio | `Tretnix-knowledge-de29f4f3.zip` |
| SHA-256 snapshot storico | `3cf34a6f145a1834d211f65917950dc92e940f259d7585f16342d1bb00730032` |
| Commit della patch di governance | da registrare dopo merge |
| Ultima revisione | 4 settembre 2026 — riconciliazione freeze Forno Lume BUSINESS preparata sulla baseline Knowledge `f288304016c245746ba9e7290241d0248acccab4`; nuovo commit canonico da registrare soltanto dopo review e merge |

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

Forno Lume START — frozen `a817903923c1bbfe177d8b59e70a4aa1137b7ab1`
└── baseline canonica visuale e single-page Hospitality START
    └── Forno Lume BUSINESS — frozen `9bc33cd5737af7763fe9c61ddc52eb7a606fafea`
        └── Forno Lume BUSINESS PLUS — bootstrap `bdfcb81b5c7051d20306327009bbe0a5fcf62d1e`, lineage storico da `389bd1...`

Beauty & Wellness v1.1
└── RITO Studio START — current `main` `96e73492313e37689a1785b1e2762fff7611e828`; historical BUSINESS parent `34c13cd…`
    └── RITO Studio BUSINESS — `b95a63c6127d2bc1dd396d74b2dd25f87b952226`
        └── RITO Studio BUSINESS PLUS — remote `main` `eba1a2a91fd3a531b4a4667d038b631758d0a664`, live staging/E2E in progress

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
| Qualità visuale Beauty & Wellness START | `rito-studio-START` | candidato di riferimento; current `main` verificato a `96e734...`; lineage storico dei piani superiori separato |
| Architettura multipagina Beauty & Wellness | `rito-studio-BUSINESS` | candidato di riferimento; riconciliazione parent status pendente |
| Native AdminAuth + realtime BUSINESS PLUS | `rito-studio-BUSINESS-PLUS` | candidate in staging; non canonico finché E2E/security gate restano aperti |
| Architettura multipagina Hospitality | `forno-lume-BUSINESS` | canonico sulla baseline frozen corrente |
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

## 5.1 QUADRA Studio

| Campo | START | BUSINESS |
|---|---|---|
| Verticale | Professional Services | Professional Services |
| Repository previsto | `quadra-studio-START` | `quadra-studio-BUSINESS` |
| Stato | `PREPARATION_COMPLETE / IMPLEMENTATION_NOT_STARTED` | bloccato fino al freeze START |
| Repository reale | non creata | non creata |
| Specifica | `family-kits/professional-services-v1.0/` | stessa famiglia, contratto START → BUSINESS |

## 5.2 NODO Servizi

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

1. mantenere Forno Lume START congelato sulla baseline `a817903923c1bbfe177d8b59e70a4aa1137b7ab1`;
2. mantenere Forno Lume BUSINESS congelato sulla baseline `9bc33cd5737af7763fe9c61ddc52eb7a606fafea`;
3. mantenere Package D BUSINESS separato e non autorizzato dal final polish;
4. non modificare il lineage esistente di Forno Lume BUSINESS PLUS senza gate separato;
5. proseguire RITO Studio BUSINESS PLUS e Tretnix.com soltanto nei rispettivi perimetri autorizzati;
6. riconciliare nei documenti progetto e Knowledge soltanto evidenze realmente ottenute;
7. aggiornare il registro dei pattern canonici quando cambiano baseline o gate verificati.

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
