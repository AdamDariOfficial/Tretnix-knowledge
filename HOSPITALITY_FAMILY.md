# Tretnix Hospitality Family

**Versione:** 1.4
**Aggiornato:** 4 settembre 2026
**Stato:** canonico per la famiglia Forno Lume

---

## 1. Scopo

Questo documento raccoglie il contratto approvato, le policy e lo stato verificato della famiglia Hospitality Tretnix.

La famiglia attuale è:

```text
Forno Lume START
↓
Forno Lume BUSINESS
↓
Forno Lume BUSINESS PLUS
```

Forno Lume START e Forno Lume BUSINESS sono demo pubbliche Tretnix. Non rappresentano un ristorante realmente esistente.

---

## 2. Fonti canoniche per pattern

La fonte canonica viene scelta per singolo pattern, non per repository intera.

### Forno Lume START

Baseline tecnica storica:

```text
d15f639267dfdd57194536154abfa1d0ff3b4542
```

Baseline sorgente frozen corrente:

```text
a817903923c1bbfe177d8b59e70a4aa1137b7ab1
implementation commit: 0a104d7525644fca5f594d7092b574b8f3997f79
pull request: #14
finalized: 28 August 2026
post-merge deployment verification: not verified
```

È la fonte canonica approvata per:

- identità visuale Hospitality;
- palette crema, terracotta, oliva e oro attenuato;
- tipografia Fraunces e Inter;
- atmosfera calda, elegante e artigianale;
- qualità responsive;
- struttura premium single-page START;
- comportamento percepito della navbar;
- comportamento percepito di drawer e FAQ;
- sobrietà delle interazioni;
- Reveal, hover e linguaggio del movimento;
- qualità mobile;
- comportamento responsive finalizzato tra telefono, tablet e desktop;
- map consent e proporzioni responsive;
- review surface opzionale: dati autentici in produzione, fixture fittizie soltanto in development;
- densità navbar e breakpoint scelti in base al contenuto reale della singola variante.

Il ciclo finale START del 27–28 agosto è il riferimento percepito più recente. I breakpoint esatti, la struttura single-page e le CTA specifiche non sono automaticamente obbligatori per BUSINESS: devono essere adattati alla sua architettura multipagina e verificati visivamente.

### Forno Lume BUSINESS

Baseline storica verificata dopo il Package C:

```text
main: 15a8bf4de41bc1657a79f58699859a015ee7820d
implementation commit: f85e351
pull request: #5
production verified in that cycle: https://forno-lume-business.tretnix.com
```

Baseline frozen storica pre-polish:

```text
main: 389bd1eec59fe8680cb1d6e685fac77e6c7c0df9
implementation commit: 3a8ffe226170adab417c3c78dba287be6d39b96f
pull request: #11
final branch: feat/forno-lume-gallery-swipe-slider
visual approval: gallery swipe/lightbox + reserved indicator lane
post-merge deployment verification: not performed
```

Baseline frozen corrente dopo il final polish:

```text
main: 9bc33cd5737af7763fe9c61ddc52eb7a606fafea
implementation commit: a77ea376686c0a87f37e91d5f06670e773683700
pull request: #12
working branch: fix/start-final-polish-parity (deleted after merge)
automated validation: Controlled Change Package v2.4.3 reported passed
owner browser QA: approved
post-merge deployment verification: not performed
```

È la fonte tecnica approvata, limitatamente ai pattern chiusi e verificati, per:

- architettura multipagina Hospitality pubblica;
- drawer e lightbox accessibili;
- gallery/lightbox con swipe intenzionale, controlli precedente/successivo e reserved indicator lane;
- focus trap, inertness, Escape, focus iniziale e focus return;
- body scroll lock e cleanup del lifecycle;
- route reset immediato e scroll restoration della history;
- direct URL, refresh, Back e Forward;
- navigazione intenzionale smooth tra categorie del menu con reduced-motion e history/hash preservati;
- ordine editoriale mobile senza duplicazione DOM;
- responsive Hospitality BUSINESS adattato alla densità multipagina;
- CTA/contact choice e hover coerenti con l'identità Hospitality;
- fallback runtime router-wide;
- pagina 404 con metadata e status HTTP corretti;
- policy demo `noindex, follow`;
- JSON-LD non commerciale e route-aware;
- pattern di attribuzione Tretnix nel footer.

La baseline BUSINESS `9bc33cd5737af7763fe9c61ddc52eb7a606fafea` è il riferimento frozen corrente. La baseline `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9` resta il riferimento frozen storico pre-polish.

Il final polish parity/adaptation autorizzato il 28 agosto 2026 è stato implementato, validato localmente, approvato visivamente dal proprietario e unito con PR `#12` il 4 settembre 2026. Il Package D resta separato e pendente secondo `TRX-DEC-020` e non è autorizzato da questa chiusura.

Il repository Forno Lume BUSINESS PLUS già esistente conserva il lineage verificato dal parent storico `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9`. Il nuovo freeze BUSINESS non riscrive né invalida retroattivamente quel lineage; un eventuale riallineamento futuro di PLUS richiede una decisione e un gate separati.

### Forno Lume BUSINESS PLUS

Bootstrap tecnico verificato:

```text
frozen BUSINESS parent: 389bd1eec59fe8680cb1d6e685fac77e6c7c0df9
first PLUS commit: 54751867c9bfe30a34cf5081409317e53ca0ee67
remix merge commit: 6dd30ec251a2c808de3692fb4e7cf43a4f10e2f6
validated bootstrap HEAD: bdfcb81b5c7051d20306327009bbe0a5fcf62d1e
branch: main
browser QA: not performed
deployment: not performed
```

Il primo commit PLUS deriva direttamente dal frozen BUSINESS richiesto e il checkpoint `bdfcb81b5c7051d20306327009bbe0a5fcf62d1e` conserva tale ancestry. Il remix non ha modificato i sorgenti applicativi: il delta rispetto al frozen parent è limitato a `package.json`, `bun.lock` e `README.md`. La variazione di `package.json` fissa `@Lovable.dev/vite-tanstack-config` a `2.9.1`; installazione con lockfile congelato, TypeScript, lint e build sono stati eseguiti sul checkpoint bootstrap.

BUSINESS PLUS non è ancora fonte canonica per nuovi pattern e non è una baseline prodotto completata. Lo scope prodotto resta da definire e approvare. Fino a quel gate, preserva integralmente i pattern canonici START/BUSINESS pertinenti e non assorbe il Package D BUSINESS.

---

## 3. Hospitality Interaction Contract

Forno Lume START definisce il comportamento percepito. Forno Lume BUSINESS può usare implementazioni tecniche migliori purché non introducano differenze visuali o interattive involontarie.

### Identità da preservare

- palette;
- tipografia;
- ritmo;
- trattamento fotografico;
- composizione approvata;
- drawer e FAQ percepiti;
- Reveal e hover;
- motion percepita;
- qualità mobile.

### Miglioramenti tecnici ammessi

- accessibilità;
- routing;
- history e scroll restoration;
- focus management;
- lifecycle e cleanup;
- reduced motion;
- componentizzazione;
- type safety;
- error handling;
- metadata e status HTTP.

### Regole di interazione

- Mobile-first.
- Nessun overflow orizzontale involontario.
- Nelle sezioni editoriali mobile: testo prima, immagine dopo.
- Hero, gallerie e componenti visual-first documentati possono fare eccezione.
- Non duplicare il DOM soltanto per cambiare ordine responsive.
- Le nuove route si aprono immediatamente dall’alto, senza smooth scroll.
- Back e Forward preservano la corretta posizione della history.
- Direct URL e refresh devono funzionare.
- I Reveal sotto la fold iniziano entrando nel viewport.
- I container strutturali rimangono normalmente statici; si animano elementi editoriali semantici o piccoli gruppi significativi.
- `prefers-reduced-motion` mantiene tutti i contenuti visibili e funzionali.
- Hover e focus non devono interferire con il transform dei Reveal.
- Drawer, lightbox e altri dialog devono preservare focus, Escape, inertness, scroll lock e focus return.
- Le superfici pubbliche di recensioni o rating non devono presentare dati fittizi come recensioni reali o come dati Google autentici. Fixture fittizie sono consentite soltanto in preview development non pubblicata come dato reale.
- I breakpoint responsive sono scelti in base alla composizione e alla densità effettiva: un breakpoint corretto per START non viene copiato automaticamente in BUSINESS.

---

## 4. Stato dei package BUSINESS

### Package A — completato e unito

- drawer mobile accessibile;
- lightbox accessibile;
- focus trap;
- inertness;
- Escape;
- focus iniziale e focus return;
- body scroll lock;
- cleanup e gestione resize.

### Package B — completato e unito

- ordine editoriale mobile testo → immagine;
- nuove route dall’alto;
- Back e Forward con scroll restoration;
- direct URL, refresh e history preservati;
- hash menu e navigazione nativa;
- Reveal sotto la fold attivati nel viewport;
- nessuna duplicazione DOM responsive.

### Micro-fix “L’incontro” — completato e unito

- DOM e mobile: testo, CTA, immagine;
- desktop: immagine a sinistra e testo a destra;
- nessuna duplicazione DOM.

### Package B2 — completato e unito

- motion identity estesa alle route pubbliche;
- Reveal granulari per eyebrow, heading, copy, CTA e immagini;
- variante immagini;
- easing `cubic-bezier(0.22, 1, 0.36, 1)`;
- motion principalmente tramite opacity e translateY;
- hover separato dal transform dei Reveal;
- reduced motion;
- Navbar animata tramite opacity, translate e transform;
- sticky “Proposte signature” preservato;
- policy con corpo statico;
- FAQ e ContactActions animate individualmente;
- drawer mobile sincronizzato visivamente con START;
- active state mobile discreto;
- nessun overflow nelle viewport controllate.

### Package C — completato, unito e verificato in produzione

- attribuzione Tretnix nel footer;
- fallback runtime italiano router-wide;
- recovery action manuale senza loop automatici;
- 404 con title, description, `noindex, follow` e status HTTP 404;
- configurazione esplicita della natura demo;
- rimozione del JSON-LD commerciale fittizio;
- JSON-LD generico e route-aware;
- gerarchia degli heading corretta;
- sole correzioni di contrasto confermate;
- build Cloudflare Pages riuscita con Bun e lockfile congelato.

Verifiche registrate:

- ESLint mirato sui file modificati con `prettier/prettier` disabilitato;
- `tsc --noEmit`;
- build client, SSR, Nitro e Cloudflare Pages;
- `git diff --check`;
- HTTP 200 delle route pubbliche e HTTP 404 della not-found;
- metadata, robots, canonical e JSON-LD;
- responsive a 360, 390, 430, 768 e 1440 px;
- assenza di overflow;
- navigazione client, direct URL, refresh, Back e Forward;
- drawer, FAQ, lightbox, focus e reduced motion;
- fallback runtime, recovery e sanitizzazione dell’errore server;
- verifica finale del dominio di produzione da parte del proprietario.

Il lint globale non è registrato come superato: il checkout Windows contiene CRLF mentre la regola Prettier attuale si aspetta LF, oltre a warning preesistenti. Non normalizzare globalmente line ending o formattazione senza task dedicato.

### Final polish parity/adaptation — completato, validato, approvato e unito

Il task approvato il 28 agosto 2026 è stato completato partendo dalla baseline frozen pre-polish `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9`.

Il ciclo ha adattato a BUSINESS i miglioramenti START pertinenti senza trasformare la variante multipagina in una copia meccanica dello START. Il risultato conserva routing, history, drawer/lightbox, gallery e differenze multipagina intenzionali.

Chiusura registrata:

```text
implementation commit: a77ea376686c0a87f37e91d5f06670e773683700
pull request: #12
merge commit / frozen main: 9bc33cd5737af7763fe9c61ddc52eb7a606fafea
merged: 4 September 2026
```

Validation locale riportata dal proprietario per il Controlled Change Package v2.4.3:

- 6/6 fixture recovery/idempotency superate;
- TypeScript superato;
- ESLint exit `0`, con `0` errori e `8` warning `react-refresh/only-export-components` preesistenti;
- build Vite client e SSR superata;
- build Nitro Cloudflare module superata;
- UX invariants superati;
- diff, staged state, untracked whitespace e final payload state superati;
- browser QA finale approvato dal proprietario su responsive, menu smooth-scroll, CTA/contatti, gallery/lightbox e layout finale.

Il deploy post-merge della nuova baseline non è stato verificato. La baseline è quindi frozen come sorgente approvata; non viene dichiarato un nuovo gate di produzione.

### Package D — pendente e separato

Package D resta separato e pendente. `TRX-DEC-020` stabilisce che non è autorizzato dal completamento del Package C né dal task di final polish parity/adaptation. Qualsiasi esecuzione richiede un task esplicitamente autorizzato.

### BUSINESS PLUS — bootstrap verificato e scope pendente

Il parent gate è stato soddisfatto: il repository BUSINESS PLUS deriva dal frozen BUSINESS `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9` e il primo commit PLUS `54751867c9bfe30a34cf5081409317e53ca0ee67` ha quel commit come parent diretto.

Checkpoint bootstrap validato:

```text
bdfcb81b5c7051d20306327009bbe0a5fcf62d1e
```

Verifiche automatizzate eseguite sul checkpoint:

- installazione Bun con lockfile congelato;
- TypeScript `tsc --noEmit`;
- ESLint con exit `0`, `0` errori e `8` warning `react-refresh/only-export-components`;
- build Vite client e SSR;
- build Nitro Cloudflare module;
- classificazione del solo residuo `src/routeTree.gen.ts` come EOL-only e ripristino;
- working tree finale pulita.

Non sono stati eseguiti browser QA o deploy.

La descrizione/README ereditati possono contenere wording START e non definiscono lo scope BUSINESS PLUS. La specifica prodotto PLUS deve essere definita e approvata prima di qualsiasi implementazione funzionale. La nuova variante deve preservare identità, palette, tipografia, atmosfera e qualità percepita della famiglia Hospitality, espandendo soltanto lo scope approvato per BUSINESS PLUS.

Il Package D di BUSINESS resta pendente e separato secondo `TRX-DEC-020`; il bootstrap PLUS non lo autorizza, non lo annulla e non lo assorbe.

---

## 5. Policy demo e indicizzazione

Le demo Hospitality devono essere pubblicamente consultabili ma non devono essere presentate ai motori di ricerca come attività locali reali.

### Robots

Tutte le route pubbliche della demo devono emettere:

```html
<meta name="robots" content="noindex, follow">
```

Regole:

- il crawler deve poter leggere il meta `noindex`;
- non usare un `robots.txt` che blocchi la scansione delle route interessate;
- 404 e pagine legali sono incluse;
- direct URL, refresh e navigazione client devono restare coerenti;
- non pubblicizzare route demo in sitemap destinate all’indicizzazione.

### Dati strutturati vietati nella demo

Non pubblicare:

- `Restaurant`;
- `LocalBusiness`;
- `Organization` commerciale fittizia;
- `PostalAddress`;
- `GeoCoordinates`;
- `telephone` come contatto commerciale strutturato;
- `openingHours`;
- `priceRange`;
- `aggregateRating`;
- `review`;
- `Offer`;
- `Menu`;
- `MenuSection`;
- `MenuItem`;
- `FAQPage` usato per cercare rich result.

Non serializzare come dati strutturati indirizzi, coordinate, telefono, orari, prezzi, recensioni, stelle, prenotazioni o offerte fittizie.

### Dati strutturati consentiti

Sono consentiti esclusivamente tipi generici e non ingannevoli:

- `WebSite`;
- `WebPage`;
- `AboutPage`;
- `CollectionPage`;
- `ContactPage`.

Mappatura Forno Lume BUSINESS:

| Route | Tipo pagina |
|---|---|
| `/` | `WebPage` |
| `/menu` | `WebPage` |
| `/chi-siamo` | `AboutPage` |
| `/galleria` | `CollectionPage` |
| `/contatti` | `ContactPage` |
| `/privacy` | `WebPage` |
| `/cookie` | `WebPage` |

Il grafo deve usare:

- dominio reale della demo;
- `@id` stabili;
- URL della route corrente;
- `isPartOf` verso il nodo `WebSite`;
- nome e description coerenti con metadata e contenuto visibile;
- rendering deterministico tra server e client;
- lifecycle route-aware senza duplicazioni o residui della route precedente;
- serializzazione sicura, escapando almeno `<` quando il framework non lo gestisce già.

Non promettere rich result per i tipi generici.

### Progetti cliente reali

Un futuro progetto cliente può attivare una entità commerciale soltanto quando:

- `isDemo` è `false`;
- l’entità commerciale è abilitata esplicitamente;
- tutti i dati sono reali, verificati e approvati;
- non vengono usati placeholder;
- il markup è coerente con contenuto e funzionalità effettive.

---

## 6. Pattern footer Tretnix

Testo visibile esatto:

> Progettato e sviluppato da Tretnix

Collegamento:

```text
https://tretnix.com
```

Requisiti:

- collegare la sola parola “Tretnix”, salvo diversa approvazione esplicita;
- `target="_blank"`;
- `rel="noopener noreferrer"`;
- indicatore esterno sobrio;
- icona decorativa con `aria-hidden="true"`;
- focus visibile;
- link riconoscibile senza affidarsi soltanto al colore;
- contrasto WCAG 2.2 AA;
- peso visuale discreto e coerente con il cliente;
- nessun riferimento pubblico agli strumenti interni.

---

## 7. Baseline di deploy Cloudflare Pages

START e BUSINESS restano nello stesso standard infrastrutturale Cloudflare Pages.

Configurazione verificata per BUSINESS al 25 luglio 2026:

```text
Production branch: main
Root directory: /
Build system: version 3
Build command: bun install --frozen-lockfile && bun run build
Build output directory: dist
BUN_VERSION: 1.3.14
SKIP_DEPENDENCY_INSTALL: 1
```

La build TanStack Start/Nitro ha rilevato il preset `cloudflare-pages` e ha generato:

```text
dist/
├── assets/
├── _worker.js/
├── _routes.json
├── _headers
└── _redirects
```

Cloudflare Pages ha rilevato `dist/_worker.js`, compilato il modulo SSR e pubblicato asset e sito. `_worker.js` è parte dell’output avanzato di Pages e non implica la creazione di un progetto Worker separato.

Regole operative:

- `bun.lock` è il lockfile autorevole;
- evitare `npm install --force` o `--legacy-peer-deps` per nascondere conflitti;
- Preview deve usare la stessa toolchain prima del prossimo ciclo PR;
- aggiornare la versione Bun soltanto tramite modifica deliberata e nuova verifica;
- non cambiare Pages → Workers senza requisito tecnico confermato e decisione esplicita.

---

## 8. Riapertura e modifiche future

- START rimane chiuso e congelato sulla baseline `a817903923c1bbfe177d8b59e70a4aa1137b7ab1` salvo bug, regressione, sicurezza o requisito approvato.
- BUSINESS rimane chiuso e congelato sulla baseline `9bc33cd5737af7763fe9c61ddc52eb7a606fafea`; `389bd1...` resta la baseline frozen storica pre-polish.
- Il Package D BUSINESS resta un perimetro separato e pendente e richiede autorizzazione esplicita.
- BUSINESS PLUS conserva il lineage storico già verificato da `389bd1...`; un eventuale riallineamento alla baseline BUSINESS corrente richiede un gate separato.
- I pattern già approvati non devono essere indeboliti o reinterpretati.
- Ogni nuova modifica deve dichiarare controlli automatici e browser realmente eseguiti.
