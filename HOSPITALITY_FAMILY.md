# Tretnix Hospitality Family

**Versione:** 1.0
**Aggiornato:** 25 luglio 2026
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
futuro Forno Lume BUSINESS PLUS
```

Forno Lume START e Forno Lume BUSINESS sono demo pubbliche Tretnix. Non rappresentano un ristorante realmente esistente.

---

## 2. Fonti canoniche per pattern

La fonte canonica viene scelta per singolo pattern, non per repository intera.

### Forno Lume START

Baseline sorgente di chiusura:

```text
d15f639267dfdd57194536154abfa1d0ff3b4542
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
- qualità mobile.

### Forno Lume BUSINESS

Baseline verificata dopo il Package C:

```text
main: 15a8bf4de41bc1657a79f58699859a015ee7820d
implementation commit: f85e351
pull request: #5
production: https://forno-lume-business.tretnix.com
```

È la fonte tecnica approvata, limitatamente ai pattern chiusi e verificati, per:

- architettura multipagina Hospitality pubblica;
- drawer e lightbox accessibili;
- focus trap, inertness, Escape, focus iniziale e focus return;
- body scroll lock e cleanup del lifecycle;
- route reset immediato e scroll restoration della history;
- direct URL, refresh, Back e Forward;
- ordine editoriale mobile senza duplicazione DOM;
- fallback runtime router-wide;
- pagina 404 con metadata e status HTTP corretti;
- policy demo `noindex, follow`;
- JSON-LD non commerciale e route-aware;
- pattern di attribuzione Tretnix nel footer.

BUSINESS non è ancora congelato come repository completa: il Package D rimane separato e pendente.

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

### Package D — pendente

Deve essere gestito in una chat e in un task separati. Il completamento del Package C non autorizza modifiche del Package D.

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

- START rimane chiuso e congelato salvo bug, regressione, sicurezza o requisito approvato.
- BUSINESS può essere modificato soltanto nel perimetro del Package D o di un nuovo task esplicito.
- I pattern già approvati non devono essere indeboliti o reinterpretati.
- Ogni nuova modifica deve dichiarare controlli automatici e browser realmente eseguiti.
