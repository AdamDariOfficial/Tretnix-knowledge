# RITO Studio — Canonical Portfolio Concept Dossier

**Versione:** 1.0
**Aggiornato:** 11 settembre 2026
**Stato:** candidato editoriale canonico; integrazione Tretnix.com non autorizzata da questo documento

---

## 1. Identity e publication status

| Campo | Valore |
|---|---|
| Concept | RITO Studio |
| Descriptor | Beauty & Care Atelier |
| Tagline | La bellezza, nel suo ritmo. |
| Verticale | Beauty & Wellness |
| Publication type | `portfolio_concept` |
| Concept flag | `is_concept = true` |
| Piani rappresentati | START + BUSINESS |
| Piano escluso | BUSINESS PLUS |
| Badge consigliato | Concept Tretnix |
| Natura | demo portfolio Tretnix; non è un salone, atelier o cliente reale |

RITO Studio esplora una presenza digitale Beauty & Wellness tattile, editoriale e contemporanea. Il dossier unisce START e BUSINESS in una sola storia di evoluzione, preservando la stessa identità porcellana/inchiostro/borgogna.

## 2. Concept, audience e sfida

### Concept

La cura personale viene presentata come un rituale consapevole, preciso e contemporaneo. RITO evita estetica rosa stereotipata, linguaggio medicale, trasformazioni miracolose e lusso ostentato.

### Audience

- hair salon e barber shop;
- beauty e nail studio;
- spa, massaggiatori e piccoli studi wellness;
- visitatori che vogliono comprendere trattamenti, metodo, ambiente e canali di prenotazione.

Il concept mostra più aree di servizio per dimostrare modularità; un adattamento reale seleziona soltanto categorie e moduli pertinenti.

### Design challenge

Costruire un'esperienza premium e intima senza ricorrere a cliché Beauty, mantenendo semplice la scoperta dei trattamenti. BUSINESS deve aumentare profondità e scelta senza perdere la composizione ariosa, la fotografia tattile e il ritmo controllato dello START.

### Obiettivo

Far comprendere rapidamente identità, offerta e modalità di contatto; offrire poi un catalogo trattamento più profondo, informazioni sullo studio, galleria, FAQ e contatti su route dedicate.

## 3. Strategia ed evoluzione START → BUSINESS

```text
START
esperienza one-page editoriale focalizzata
↓
BUSINESS
scoperta trattamenti e contenuti multipagina ampliati
```

### Ruolo START

START organizza hero, categorie di trattamento, rituale/metodo, studio, gallery rail, booking CTA e informazioni pratiche in una home mobile-first, con `/privacy`, `/cookie` e 404 reali. Definisce palette porcellana/inchiostro/borgogna, Newsreader + Manrope, composizione asimmetrica, card ridotte e motion misurato.

### Evoluzione BUSINESS

BUSINESS conserva identità e componenti della famiglia e aggiunge:

- `/trattamenti` con filtri e dettagli query-driven;
- `/studio` con contenuti specifici e fascia pratica/conversione;
- `/galleria` con filtri e lightbox;
- `/faq` e `/contatti`;
- metadata route-specific e gestione coerente di route, query, history e focus.

Il dettaglio trattamento vive nella route catalogo, per esempio `/trattamenti?categoria=hair&trattamento=taglio-essenziale`. L'apertura crea un ingresso history controllato; la navigazione interna aggiorna la query senza moltiplicare inutilmente gli step della history. Le route `/team` e `/prenota` non appartengono al BUSINESS base corrente.

## 4. Problem e solution

### Problem

Un sito Beauty può diventare una griglia ripetitiva di card o affidarsi a cliché visuali che indeboliscono identità e fiducia. Allo stesso tempo, un catalogo più profondo deve restare leggibile e navigabile su mobile senza introdurre un booking nativo inesistente.

### Solution

RITO usa una composizione editoriale tattile, un catalogo denso ma leggibile e un modello di dettaglio query-driven. START crea una narrazione focalizzata; BUSINESS separa trattamenti, studio, galleria, FAQ e contatti in percorsi dedicati, mantenendo centralizzati i canali di conversione.

## 5. Features, modules e user journey

### Features confermate

- one-page START con anchor, pagine legali e 404;
- BUSINESS multipagina con route dedicate;
- filtri trattamento e dettaglio accessibile governato dalla query;
- gallery rail START/BUSINESS e galleria completa con filtri/lightbox;
- booking configurato tramite WhatsApp + telefono nel BUSINESS;
- contatto generale tramite email + telefono nel BUSINESS;
- `BrandHomeLink` condiviso da header e footer;
- route focus, direct URL, refresh e Back/Forward;
- overlay con focus management, Escape e ritorno al trigger;
- review surface typed `demo/authentic` con fixture demo neutre;
- `noindex, follow` e structured data non commerciale;
- coppia legale Privacy/Cookie e attribuzione Tretnix;
- comportamento ridotto per `prefers-reduced-motion`.

### Modules

- hero e posizionamento;
- categorie e catalogo trattamenti;
- dettaglio trattamento query-driven;
- rituale e metodo;
- studio e informazioni pre-visita;
- review surface demo/authentic;
- gallery rail e gallery explorer;
- FAQ;
- booking/contact adapter;
- privacy, cookie e 404.

### Workflow / user journey

1. Comprendere identità, area di servizio e azione principale.
2. Scoprire categorie e trattamenti.
3. Aprire un dettaglio nella stessa route catalogo mantenendo contesto e history.
4. Approfondire studio, galleria o FAQ.
5. Scegliere WhatsApp/telefono per la prenotazione o email/telefono per il contatto.
6. Tornare ai risultati o navigare con Back/Forward senza perdere il percorso.

## 6. Customizations

- selezione delle categorie Hair, Skin, Nails e Wellness realmente pertinenti;
- brand, descriptor, tagline e tono;
- palette, tipografia e direzione fotografica;
- catalogo, prezzi, durate e approfondimenti opzionali;
- canali booking e contact;
- studio, accessibilità, location e informazioni pre-visita;
- gallery e recensioni autentiche verificate;
- metadata, analytics consent-aware e structured data cliente dopo approvazione.

## 7. Decisioni tecniche, responsive e accessibilità

### Technical decisions

- React 19, TypeScript, TanStack Start/Router, Vite, Tailwind CSS 4 e Radix UI;
- configurazione sito e contenuti centralizzati;
- catalogo trattamento che alimenta filtri, righe e dialog query-driven;
- route metadata centralizzati nel BUSINESS;
- build Nitro per Cloudflare Pages;
- review mode discriminata `demo/authentic`;
- structured data limitato a schemi non commerciali accurati.

### Responsive / accessibility

- mobile-first e ordine editoriale controllato;
- card ridotte al minimo in favore di liste e composizioni editoriali;
- filtri orizzontali con scroll nativo su mobile;
- route interne compattate senza comprimere touch target o gerarchia;
- focus visibile, drawer con contenimento/ritorno e body scroll lock;
- trattamento query-driven con focus trap, Escape e ritorno al trigger;
- lightbox con controlli tastiera e ritorno del focus;
- route focus che non interferisce con un modal aperto;
- legal pair Privacy/Cookie non separabile nel footer.

Queste scelte non costituiscono una certificazione di accessibilità.

### Motion

Il motion è editoriale, tattile e trattenuto: reveal nel viewport, transizioni brevi, gallery controllata e nessun autoplay. I divider usano reveal autonomo di sola opacità. `prefers-reduced-motion` elimina movimento e sweep non essenziali mantenendo disponibili contenuti e azioni dirette.

## 8. Content e trust policy

- RITO Studio è un concept Tretnix e non rappresenta un'attività reale.
- Nessun claim medico, credenziale, premio, risultato commerciale o garanzia viene inventato.
- Le recensioni demo sono fixture typed, neutre, senza attribuzione o URL di piattaforme; il ramo `authentic` è riservato a dati cliente verificati.
- Nessun form demo trasmette dati personali e nessuna azione finge una prenotazione completata.
- Tutte le route demo usano `noindex, follow`.
- Structured data commerciale, review, rating e aggregate rating restano esclusi.
- Tretnix è l'unico designer e sviluppatore attribuito pubblicamente.

## 9. Asset provenance boundary

Per gli asset RITO registrati nei repository START e BUSINESS:

```text
upstream source: unknown dove documentato
license: unverified
copyright ownership: unverified
model release scope: unverified
```

La cronologia prova l'introduzione dei file e il loro uso, non la fonte upstream né un diritto di riuso. Questo limite non è risolto dal dossier: prima di usare immagini RITO su Tretnix.com occorre sostituirle con asset approvati oppure chiudere fonte, licenza, copyright e liberatorie.

## 10. Validation evidence e demo URLs

### Baseline corrente del 10 settembre 2026

| Progetto | Main corrente | Ancestor implementazione validato | PR | Cloudflare post-merge |
|---|---|---|---|---|
| RITO Studio START | `2ab4dc46ef06fa006560c6d721b28be2cb9a7fa6` | `8fe09095eafb6be8083ddc8b8b7d79f2a21db483` | `#17` | SUCCESS |
| RITO Studio BUSINESS | `3f0ff4d3ed8e675725d8d640c305ab61d47217d7` | `ccb50d7b7c6ffbeba96d33b02615a0f428018116` | `#10` | SUCCESS |

Il task di riconciliazione registra Knowledge validation PASS, deploy Cloudflare riusciti sui merge SHA e verifica owner di `prefers-reduced-motion` riuscita su entrambe le demo. I commit e le configurazioni sono confermati nei repository; il 11 settembre 2026 una richiesta HTTP read-only ha restituito `200` per entrambi gli URL. L'HTTP 200 conferma la raggiungibilità corrente, non sostituisce l'evidenza provider del commit distribuito.

Il tag `family-start-v1.0` → `74ee03c4d39a974872f94f53d14ec2873815ccf7` resta evidenza storica immutabile del lineage START; non è reinterpretato come baseline sorgente corrente del 10 settembre.

### Demo URLs confermati

- START: <https://rito-studio.tretnix.com>
- BUSINESS: <https://rito-studio-business.tretnix.com>

## 11. Known evidence limits

- Provenienza upstream, licenze, copyright e model release degli asset RITO restano sconosciuti/non verificati dove documentato.
- Non sono disponibili risultati commerciali o outcome cliente.
- Naming, marchio e dominio del concept non sono verificati per un futuro cliente reale.
- Recapiti, prezzi e contenuti operativi della demo non sono credenziali aziendali reali.
- Lo screenshot plan non autorizza il riuso degli asset.
- BUSINESS PLUS, staging, backend, auth e consultation workflow non fanno parte del racconto completato.

## 12. Tretnix.com-ready `Project` mapping

```yaml
slug: rito-studio
title: RITO Studio
category: Beauty & Wellness
badge: Concept Tretnix
short_description: >-
  Concept Beauty & Wellness Tretnix che evolve da una one-page editoriale a un
  percorso multipagina per trattamenti, studio, galleria, FAQ e contatti.
overview: >-
  RITO Studio presenta la cura personale con un'identità tattile e contemporanea.
  START concentra il racconto in una home mobile-first; BUSINESS amplia la scoperta
  dei trattamenti con route dedicate e dettagli query-driven, preservando palette,
  tipografia, motion e demo integrity.
problem: >-
  Organizzare un'offerta Beauty articolata senza ricorrere a cliché visuali, card
  ripetitive o un booking nativo non disponibile, mantenendo il percorso chiaro su mobile.
solution: >-
  Un sistema editoriale porcellana, inchiostro e borgogna con catalogo trattamento
  query-driven, gallery progressiva e canali di prenotazione/contatto centralizzati.
audience: >-
  Hair salon, barber shop, beauty e nail studio, spa e professionisti wellness che
  desiderano presentare servizi, metodo e ambiente con una presenza digitale curata.
features:
  - Esperienza START one-page mobile-first
  - BUSINESS multipagina per trattamenti, studio, galleria, FAQ e contatti
  - Catalogo e dettaglio trattamento query-driven
  - Gallery rail e galleria con filtri/lightbox
  - Booking via WhatsApp e telefono
  - Contatto via email e telefono
  - Route focus, history e interazioni da tastiera
  - Demo noindex e structured data non commerciale
impact_points:
  - Riduce i passaggi tra scoperta del trattamento e scelta del canale di prenotazione
  - Mantiene il contesto del catalogo durante l'apertura dei dettagli
  - Separa approfondimento, studio e FAQ senza perdere l'identità dello START
  - Permette di adattare categorie e contenuti alle specializzazioni effettive
modules:
  - Hero e posizionamento
  - Categorie e catalogo trattamenti
  - Dettaglio query-driven
  - Rituale e metodo
  - Studio e informazioni pre-visita
  - Review surface demo/authentic
  - Gallery rail e gallery explorer
  - FAQ e contatti
  - Privacy, Cookie e 404
workflow_steps:
  - Comprendere identità e proposta
  - Filtrare e scegliere un trattamento
  - Consultare il dettaglio mantenendo il contesto
  - Esplorare studio, galleria e FAQ
  - Scegliere booking o contatto esterno
customizations:
  - Categorie e catalogo pertinenti al cliente
  - Brand, copy, palette e fotografia
  - Prezzi, durate e contenuti trattamento
  - Booking e contact channels
  - Studio, location e informazioni pratiche
  - Metadata, analytics e structured data cliente
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
sort_order: 110
```

`sort_order: 110` è una proposta non vincolante successiva a Forno Lume; verificare l'ordine reale prima dell'inserimento. `image_url` resta non assegnato finché la provenienza visuale non è risolta.

## 13. SEO / social copy proposto

```text
SEO title: RITO Studio — Concept Beauty & Wellness | Tretnix
Meta description: Un concept Tretnix che evolve da una one-page Beauty editoriale a un'esperienza multipagina per trattamenti, studio, galleria, FAQ e contatti.
Social title: RITO Studio — La bellezza, nel suo ritmo.
Social description: Un'identità tattile e contemporanea, con scoperta trattamenti query-driven e percorsi di contatto chiari.
Cover caption intent: RITO Studio, concept Beauty & Care Atelier progettato da Tretnix.
```

## 14. Asset / screenshot plan

| Purpose | Source project | Route | Viewport / aspect ratio | Subject | Why it matters | Crop / focal requirements | Caption intent | Provenance status |
|---|---|---|---|---|---|---|---|---|
| Hero / cover | BUSINESS | `/` | 1440×960, 3:2 | Hero, descriptor e immagine principale | Riassume identità e tono Beauty | Preservare headline, volto/gesto senza crop ambiguo e contrasto testo | Presentare il concept, non un'attività reale | Upstream unknown; license/copyright/model release unverified |
| Mobile START | START | `/` | 390×844, portrait | Hero e CTA principale | Mostra priorità mobile e composizione editoriale | CTA, brand e soggetto leggibili; evitare dettagli personali | La one-page focalizzata dello START | Upstream unknown; uso esterno non autorizzato |
| Desktop START | START | `/` | 1440×1000, landscape | Rituale/metodo o studio editoriale | Evidenzia spazio bianco e card restraint | Mantenere relazione testo-immagine e palette | Un racconto Beauty tattile e controllato | Upstream unknown; uso esterno non autorizzato |
| BUSINESS depth | BUSINESS | `/trattamenti?categoria=hair&trattamento=taglio-essenziale` | 1440×1000, landscape | Catalogo con dettaglio aperto | Dimostra query, gerarchia e profondità | Mostrare filtro, riga selezionata, titolo dialog e CTA senza dati personali | Dalla categoria al dettaglio senza perdere contesto | UI proprietaria; eventuale immagine con provenance irrisolta |
| Gallery interaction | BUSINESS | `/galleria` | 1280×900, 4:3 | Filtri e lightbox | Mostra esplorazione, focus e caption | Includere controlli e stato filtro; crop centrato sul gesto | Una galleria accessibile e categorizzata | Upstream unknown; license/copyright/model release unverified |
| Conversion/contact | BUSINESS | `/contatti` | 390×844, portrait | Scelta booking WhatsApp/telefono o contact email/telefono | Rende visibile la distinzione dei canali | Mostrare opzioni e focus visibile, senza recapiti personali reali | Due intenzioni, canali chiari | UI proprietaria; dati demo |
| Family detail | START o BUSINESS | `/` | 1200×1200, 1:1 | Tipografia Newsreader/Manrope, palette e dettaglio rituale | Evidenzia l'identità indipendente da Hospitality | Preservare materia, strumenti e contrasto; nessun claim medico | Porcellana, inchiostro e borgogna come sistema | Upstream unknown; sostituire o verificare prima dell'uso |

Non generare, copiare o pubblicare questi asset finché il gate di provenienza non è chiuso.

## 15. Future extensions excluded

- BUSINESS PLUS e ogni relativo staging/backend/auth/realtime;
- `/team`, `/prenota`, `/journal`, `/gift-card`, `/account` e `/admin`;
- agenda live, pagamenti, account, CRM, fidelity e gestione operativa;
- form che trasmettono dati personali nella demo;
- claim medici, risultati commerciali o metriche cliente;
- pubblicazione automatica, featured placement, upload media o deploy Tretnix.com.
