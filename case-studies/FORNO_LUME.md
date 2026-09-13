# Forno Lume — Canonical Portfolio Concept Dossier

**Versione:** 1.0
**Aggiornato:** 11 settembre 2026
**Stato:** candidato editoriale canonico; integrazione Tretnix.com non autorizzata da questo documento

---

## 1. Identity e publication status

| Campo | Valore |
|---|---|
| Concept | Forno Lume |
| Verticale | Food & Hospitality |
| Publication type | `portfolio_concept` |
| Concept flag | `is_concept = true` |
| Piani rappresentati | START + BUSINESS |
| Piano escluso | BUSINESS PLUS |
| Badge consigliato | Concept Tretnix |
| Natura | demo portfolio Tretnix; non è un ristorante reale né un incarico cliente |

Forno Lume dimostra come una stessa identità Hospitality possa partire da una presenza single-page focalizzata e crescere in un'esperienza multipagina più profonda senza diventare un redesign estraneo.

## 2. Concept, audience e sfida

### Concept

Una presenza digitale calda, premium e artigianale per un'attività Hospitality, costruita attorno a menu, atmosfera, scelta del canale di prenotazione e contenuti fotografici.

### Audience

- ristoranti, pizzerie, bistrot ed enoteche indipendenti;
- attività locali che vogliono presentare identità, proposta e informazioni pratiche con chiarezza;
- visitatori mobile che cercano menu, contatti, posizione e modalità di prenotazione.

### Design challenge

Tradurre il carattere conviviale e materico dell'Hospitality in un'interfaccia riconoscibile, mantenendo rapidi i percorsi verso menu e contatto. La variante BUSINESS deve aggiungere profondità informativa senza perdere il ritmo, la palette e il linguaggio di interazione approvati nello START.

### Obiettivo

Rendere immediatamente comprensibili proposta, atmosfera e canali di contatto; permettere poi a chi desidera più dettaglio di esplorare menu, storia, galleria e informazioni pratiche su route dedicate.

## 3. Strategia ed evoluzione START → BUSINESS

```text
START
esperienza Hospitality single-page
↓
BUSINESS
architettura informativa multipagina più profonda
```

### Ruolo START

START concentra in un'unica home hero, presentazione, menu preview, gallery rail, informazioni pratiche, FAQ, mappa on-demand e azioni di prenotazione/contatto. È la baseline visuale e percepita della famiglia: crema, terracotta, oliva, oro attenuato, Fraunces + Inter, composizione editoriale mobile-first e motion sobrio.

### Evoluzione BUSINESS

BUSINESS conserva l'identità START e aggiunge route dedicate per `/menu`, `/chi-siamo`, `/galleria` e `/contatti`, oltre alle pagine legali e alla 404. Il menu categorizzato migliora la consultazione; la galleria completa aggiunge categorie e lightbox accessibile; routing, history e focus sono trattati come parte del percorso, non come dettaglio decorativo.

BUSINESS non viene raccontato come un secondo concept: è l'evoluzione informativa e funzionale dello stesso Forno Lume.

## 4. Problem e solution

### Problem

Un'esperienza Hospitality può perdere personalità quando comprime tutte le informazioni in blocchi generici, oppure diventare dispersiva quando aggiunge pagine senza una gerarchia coerente. Menu, atmosfera e prenotazione devono restare facili da trovare su mobile.

### Solution

Forno Lume usa un'identità editoriale calda, contenuti centralizzati e percorsi di conversione espliciti. START offre una lettura continua e compatta; BUSINESS distribuisce i contenuti più profondi su route dedicate, preservando componenti, motion e tono della stessa famiglia.

## 5. Features, modules e user journey

### Features confermate

- single-page START mobile-first con anchor e pagine legali reali;
- architettura BUSINESS multipagina;
- menu preview nello START e menu categorizzato nel BUSINESS;
- scelta configurata dei canali di prenotazione e contatto;
- mappa Google caricata soltanto dopo scelta esplicita;
- gallery rail in home;
- galleria BUSINESS categorizzata con lightbox;
- review surface typed `demo/authentic`, con fixture demo esplicite nel candidate corrente;
- route reset, direct URL, refresh e gestione Back/Forward;
- drawer e overlay con tastiera, Escape e focus return;
- metadata demo `noindex, follow` e structured data non commerciale;
- attribuzione `Progettato e sviluppato da Tretnix`.

### Modules

- hero e posizionamento;
- presentazione/atmosfera;
- menu e categorie;
- percorso `come funziona`;
- recensioni dimostrative controllate;
- gallery rail e gallery explorer;
- FAQ;
- informazioni pratiche e orari;
- mappa privacy-aware;
- booking/contact choice;
- privacy, cookie e 404.

### Workflow / user journey

1. Comprendere proposta e atmosfera nel primo viewport.
2. Esplorare piatti, menu e racconto editoriale.
3. Valutare spazi e dettagli tramite la galleria.
4. Consultare informazioni pratiche o attivare la mappa consapevolmente.
5. Scegliere WhatsApp o telefono per la prenotazione, oppure il canale di contatto disponibile.
6. Nel BUSINESS, approfondire menu, storia, galleria e contatti tramite route dedicate mantenendo history e focus coerenti.

## 6. Customizations

- nome, descriptor, tono e contenuti dell'attività;
- palette e fotografia entro la direzione Hospitality approvata;
- voci, categorie e struttura del menu;
- canali di prenotazione e contatto;
- orari, area e comportamento della mappa;
- gallery e categorie fotografiche;
- modalità recensioni `demo` o `authentic` con dati verificati;
- metadata e dati strutturati attivabili soltanto con dati cliente reali e approvati.

## 7. Decisioni tecniche, responsive e accessibilità

### Technical decisions

- React 19, TypeScript, TanStack Start/Router, Vite, Tailwind CSS 4 e componenti Radix UI;
- configurazioni centralizzate per sito, menu, pagine e galleria;
- rendering client/SSR e build Nitro per Cloudflare Pages;
- JSON-LD generico, route-aware e non commerciale nella demo;
- caricamento on-demand dell'embed mappa;
- modalità recensioni discriminata `demo/authentic`.

### Responsive / accessibility

- sviluppo mobile-first;
- ordine editoriale testo → immagine dove applicabile;
- gallery rail con scroll nativo e descrizione accessibile;
- route nuove aperte dall'alto e history preservata;
- focus visibile e gestione del focus nei drawer/dialog;
- lightbox con Escape, focus trap, ritorno al trigger e controlli precedente/successivo;
- immagini con dimensioni/rapporti dichiarati nelle superfici verificate;
- mappa alternativa tramite link esterno anche senza JavaScript.

Queste sono decisioni e verifiche di implementazione; non equivalgono a una certificazione di accessibilità.

### Motion

Reveal editoriali granulari accompagnano la lettura senza animare grandi strutture come blocchi unici. Hover e focus restano separati dai transform di ingresso. `prefers-reduced-motion` mantiene contenuti e funzionalità disponibili e rimuove il movimento non essenziale.

## 8. Content e trust policy

- Forno Lume è una demo portfolio Tretnix e non rappresenta un'attività esistente.
- Nessun risultato commerciale, testimonianza autentica, premio o partnership viene attribuito al concept.
- Le recensioni correnti sono fixture sintetiche marcate come contenuto dimostrativo; il ramo `authentic` richiede dati cliente verificati.
- Le route demo usano `noindex, follow`.
- I dati strutturati non descrivono un ristorante, indirizzo, offerta, review o rating fittizi.
- L'attribuzione pubblica resta Tretnix; gli strumenti interni non fanno parte del racconto pubblico.

## 9. Validation evidence e demo URLs

### Baseline corrente del 10 settembre 2026

| Progetto | Main corrente | Ancestor implementazione validato | PR | Cloudflare post-merge |
|---|---|---|---|---|
| Forno Lume START | `2ed19ef9a4a886616bccd5aad2054c3027fec680` | `0730a759c6f8bb71f7ad3a3fb810ee8540e18556` | `#17` | SUCCESS |
| Forno Lume BUSINESS | `ccea04cb0bb50e2624fe505bf7d3f25890b7d456` | `fb72a1459cbc6bc5292f1e74f47295f2396fdc0a` | `#14` | SUCCESS |

Il task di riconciliazione registra Knowledge validation PASS, deploy Cloudflare riusciti sui merge SHA e verifica owner di `prefers-reduced-motion` riuscita su entrambe le demo. I commit e le configurazioni sono confermati nei repository; il 11 settembre 2026 una richiesta HTTP read-only ha restituito `200` per entrambi gli URL. L'HTTP 200 conferma la raggiungibilità corrente, non sostituisce l'evidenza provider del commit distribuito.

### Demo URLs confermati

- START: <https://forno-lume.tretnix.com>
- BUSINESS: <https://forno-lume-business.tretnix.com>

## 10. Known evidence limits

- Nessun dato commerciale o outcome cliente è disponibile: non misurare né inferire conversioni, prenotazioni o fatturato.
- Forno Lume non è un ristorante reale; recapiti e contenuti operativi sono demo.
- Le fonti fotografiche BUSINESS sono registrate in `docs/ASSET_PROVENANCE.md`; licenza applicabile, requisiti di attribuzione e riuso su Tretnix.com devono essere ricontrollati al momento della selezione media.
- Lo screenshot plan non costituisce approvazione degli asset.
- Package D resta separato e pendente.
- BUSINESS PLUS è escluso dal dossier e il suo lineage storico non viene reinterpretato.

## 11. Tretnix.com-ready `Project` mapping

```yaml
slug: forno-lume
title: Forno Lume
category: Food & Hospitality
badge: Concept Tretnix
short_description: >-
  Concept Hospitality Tretnix che evolve da un'esperienza single-page calda e
  editoriale a un sito multipagina per menu, storia, galleria e contatti.
overview: >-
  Forno Lume mostra l'evoluzione coerente di una presenza digitale Hospitality:
  START concentra proposta, atmosfera e contatto in una home mobile-first;
  BUSINESS aggiunge profondità informativa e route dedicate preservando identità,
  motion e qualità di interazione.
problem: >-
  Rendere menu, atmosfera e canali di prenotazione immediatamente accessibili senza
  ridurre l'identità a un template generico o disperdere i contenuti nella variante
  multipagina.
solution: >-
  Un sistema editoriale warm-premium con contenuti centralizzati, percorsi di
  contatto espliciti, gallery progressiva e architettura START → BUSINESS coerente.
audience: >-
  Ristoranti, pizzerie, bistrot ed enoteche indipendenti che vogliono presentare
  proposta, atmosfera e informazioni pratiche con un'esperienza mobile curata.
features:
  - Esperienza START single-page mobile-first
  - Architettura BUSINESS multipagina
  - Menu preview e menu categorizzato
  - Gallery rail e galleria con filtri/lightbox
  - Scelta dei canali di prenotazione e contatto
  - Mappa caricata solo dopo consenso esplicito
  - Routing, history, focus e reduced motion
  - Demo SEO e structured data non commerciale
impact_points:
  - Riduce i passaggi necessari per trovare menu e canale di prenotazione
  - Mantiene riconoscibile la stessa identità nel passaggio da START a BUSINESS
  - Separa la consultazione rapida dalla profondità informativa delle route dedicate
  - Permette di esplorare spazi e proposta senza interrompere il percorso di contatto
modules:
  - Hero e posizionamento
  - Menu e categorie
  - Racconto del locale
  - Review surface demo/authentic
  - Gallery rail e gallery explorer
  - FAQ e informazioni pratiche
  - Mappa privacy-aware
  - Booking/contact choice
  - Privacy, Cookie e 404
workflow_steps:
  - Comprendere proposta e atmosfera
  - Esplorare menu e contenuti
  - Valutare galleria e informazioni pratiche
  - Scegliere il canale di prenotazione o contatto
customizations:
  - Identità, copy e fotografia
  - Menu, categorie e contenuti
  - Canali di prenotazione e contatto
  - Orari, area e mappa
  - Gallery e recensioni autentiche verificate
  - Metadata e structured data cliente
tech_stack:
  - React 19
  - TypeScript
  - TanStack Start e TanStack Router
  - Vite
  - Tailwind CSS 4
  - Radix UI
  - Nitro / Cloudflare Pages
is_concept: true
is_visible: false
is_featured: false
sort_order: 100
```

`sort_order: 100` è una proposta prudenziale e non vincolante; verificare l'ordine dei record esistenti prima dell'inserimento. `image_url` resta non assegnato finché cover e diritti d'uso non sono approvati.

## 12. SEO / social copy proposto

```text
SEO title: Forno Lume — Concept Food & Hospitality | Tretnix
Meta description: Un concept Tretnix che evolve da una presenza Hospitality single-page a un'esperienza multipagina per menu, galleria, storia e contatti.
Social title: Forno Lume — da START a BUSINESS
Social description: Identità calda, menu accessibile e percorsi di contatto chiari in un concept Food & Hospitality progettato da Tretnix.
Cover caption intent: L'identità editoriale warm-premium di Forno Lume, presentata come concept Tretnix.
```

## 13. Asset / screenshot plan

| Purpose | Source project | Route | Viewport / aspect ratio | Subject | Why it matters | Crop / focal requirements | Caption intent | Provenance status |
|---|---|---|---|---|---|---|---|---|
| Hero / cover | BUSINESS | `/` | 1440×960, 3:2 | Hero con brand, headline e immagine forno | Riassume identità e posizionamento | Preservare headline e gesto principale; niente browser chrome | Presentare il concept Hospitality e la continuità visuale | Sorgente Pexels registrata; licenza/riuso da ricontrollare |
| Mobile START | START | `/` | 390×844, portrait | Primo viewport e CTA booking | Mostra la priorità mobile e il percorso rapido | Nessun taglio su CTA, logo o headline | La proposta essenziale dello START | Asset repository; verifica riuso necessaria |
| Desktop START | START | `/` | 1440×1000, landscape | Composizione editoriale home con menu/gallery | Mostra il racconto single-page | Includere testo e immagine senza ridurre la leggibilità | Una presenza completa in una sola pagina | Asset repository; verifica riuso necessaria |
| BUSINESS depth | BUSINESS | `/menu` | 1440×1000, landscape | Categorie e voci menu | Dimostra la profondità multipagina | Rendere leggibili heading, categorie e struttura | Dal teaser alla consultazione completa | Sorgenti documentate; licenza/riuso da ricontrollare |
| Gallery interaction | BUSINESS | `/galleria` | 1280×900, 4:3 | Filtri e lightbox aperta | Mostra esplorazione e accessibilità dell'overlay | Focale sull'immagine, controlli e caption; nessun dato personale | Una galleria navigabile, non solo decorativa | Sorgenti documentate; licenza/riuso da ricontrollare |
| Conversion/contact | START o BUSINESS | `/` o `/contatti` | 390×844, portrait | Dialog scelta WhatsApp/telefono o contatti | Rende visibile la choice architecture | Includere trigger e opzioni, focus visibile se possibile | Un passaggio chiaro verso il contatto | UI proprietaria; contenuti demo da mantenere evidenti |
| Family detail | START | `/` | 1200×1200, 1:1 | Mappa non attiva con consenso esplicito | Evidenzia il comportamento privacy-aware | Mostrare messaggio, CTA di attivazione e fallback esterno | La mappa si carica solo dopo una scelta | UI proprietaria; nessun embed terzo nel frame iniziale |

Non generare o copiare questi asset senza il gate media della futura integrazione.

## 14. Future extensions excluded

- Package D BUSINESS;
- qualsiasi capacità o contenuto BUSINESS PLUS;
- booking nativo, disponibilità live, pagamenti, account o CRM;
- risultati commerciali e metriche cliente;
- pubblicazione automatica, featured placement, upload media o deploy Tretnix.com.
