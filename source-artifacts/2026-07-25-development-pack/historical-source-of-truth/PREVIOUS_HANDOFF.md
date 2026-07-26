# Tretnix — Handoff per la prossima chat

**Data:** 25 luglio 2026  
**Scopo:** riprendere il piano in una nuova chat del progetto Tretnix senza perdere decisioni, vincoli e ordine operativo.

## Repository ufficiali

1. `https://github.com/AdamDariOfficial/Tretnix-knowledge`
2. `https://github.com/AdamDariOfficial/tretnix`
3. `https://github.com/AdamDariOfficial/forno-lume-START`
4. `https://github.com/AdamDariOfficial/forno-lume-BUSINESS`

## Tretnix Knowledge

È stato preparato uno ZIP aggiornato proposto come versione `2.0`, da revisionare tramite diff prima di renderlo canonico. Include autenticazione gestita, hardening, Production Readiness Gate, backup e restore, RPO/RTO, incident response, osservabilità, connettori AI a minimo privilegio, Client Context Pack, SEO verificabile, `llms.txt` sperimentale, template e adattatori.

## Strategia strumenti per un mese intensivo

- ChatGPT/Codex ad alta capacità per un mese.
- Lovable Pro per un mese.
- Non Lovable Business.
- Nessun piano annuale.
- Nessuna ricarica automatica.
- Controllo quotidiano dei consumi.

### Ruoli

```text
ChatGPT = strategia, brief, specifiche e acceptance criteria
Lovable = costruzione visuale e funzionale rapida
GitHub = fonte ufficiale, branch, diff e PR
Codex = audit, consolidamento, debugging, test e refactoring
Impeccable = detector, critica visuale e rifinitura controllata
```

Lovable e Codex non devono modificare contemporaneamente gli stessi file.

### Flusso Git

```text
specifica approvata
→ Lovable costruisce
→ sincronizzazione GitHub
→ stop temporaneo a Lovable
→ audit Codex
→ branch dedicata
→ correzioni e test
→ PR
→ merge
→ Lovable riparte dalla versione aggiornata
```

## Nuove famiglie prioritarie

### Beauty & Wellness

Parrucchieri, barber shop, centri estetici, nail studio, spa, massaggiatori e piccoli studi wellness.

Evoluzione:

```text
sito → prenotazioni → clienti → pacchetti/fidelity → gestionale
```

### Professional Services

Commercialisti, avvocati, consulenti, architetti, studi tecnici e professionisti B2B.

Evoluzione:

```text
sito → lead qualificati → portale cliente → documenti/pratiche → CRM
```

### Home & Local Services

Elettricisti, idraulici, imprese edili, serramentisti, installatori, manutentori, giardinieri, pulizie, climatizzazione e fotovoltaico.

Evoluzione:

```text
sito → preventivi → sopralluoghi → calendario tecnici → gestionale
```

### Deliverable realistico del mese

```text
Beauty START
Beauty BUSINESS
Professional START
Professional BUSINESS
Home Services START
```

Stretch goal:

```text
Home Services BUSINESS
```

## Pipeline obbligatoria per ogni nuova famiglia

### Preparazione

Prima di attivare gli abbonamenti creare:

```text
docs/
├── PRODUCT.md
├── DESIGN.md
├── CONTENT.md
├── ROUTES.md
├── ANIMATIONS.md
├── TESTING.md
├── STATUS.md
└── DECISIONS.md
```

Definire cliente tipo, problema, obiettivi, START, BUSINESS, route, sezioni, copy, palette, tipografia, immagini, motion, anti-pattern e acceptance criteria.

### START

```text
Lovable costruisce START
↓
Impeccable detector
↓
Impeccable critique read-only
↓
revisione manuale
↓
polish solo sui finding approvati, una sezione alla volta
↓
QA tecnica e visuale
↓
commit/tag canonico
```

Impeccable deve essere usato sullo START prima di passare al BUSINESS.

### Freeze dello START

- registrare il commit canonico;
- eventuale tag `family-start-v1.0`;
- finalizzare `DESIGN.md`;
- finalizzare `ANIMATIONS.md`;
- creare `START_BUSINESS_CONTRACT.md`.

### Contratto START → BUSINESS

BUSINESS eredita:

- palette;
- font e pesi;
- scala tipografica;
- spacing;
- radius;
- container;
- trattamento immagini;
- pulsanti;
- navbar;
- footer;
- icone;
- reveal;
- hover;
- easing e duration;
- tono;
- CTA;
- comportamento mobile;
- atmosfera.

BUSINESS può espandere route, contenuti, navigazione, servizi, gallerie, case study, form e SEO.

BUSINESS non può reinterpretare liberamente palette, font, hero, button style, motion, trattamento fotografico o personalità.

### BUSINESS

```text
derivazione dal commit canonico START
↓
Lovable espande route e contenuti
↓
Codex consolida
↓
Impeccable confronta BUSINESS con START
↓
correzioni di divergenza approvate
↓
QA comparativa
↓
freeze BUSINESS
```

## Regola anti-effetto AI

Le famiglie condividono qualità tecnica, non la stessa estetica.

- Hospitality: caldo, editoriale, artigianale, sensoriale.
- Beauty: arioso, tattile, elegante e contemporaneo.
- Professional: autorevole, preciso, sobrio e strutturato.
- Home Services: concreto, affidabile, diretto e orientato alla conversione.

Evitare quando non motivato:

- gradient text generico;
- purple SaaS;
- glassmorphism indiscriminato;
- card tutte uguali;
- pill decorative;
- glow fintech;
- hero intercambiabili;
- icone ripetitive;
- copy vago;
- identico ritmo fra tutte le sezioni;
- animazioni invasive.

## Forno Lume START e BUSINESS

Non ricostruire BUSINESS da zero.

Procedura:

```text
1. congelare gli HEAD correnti
2. branch audit/impeccable-start
3. detector e critique read-only dello START
4. classificare i finding
5. applicare solo bug, accessibilità e miglioramenti approvati
6. QA completa dello START
7. registrare nuova baseline canonica
8. creare matrice START ↔ BUSINESS
9. trasferire token, componenti e comportamenti condivisi
10. critique BUSINESS orientata alla parità
11. correggere route per route
12. QA comparativa affiancata
```

Classificazione dei finding:

- bug responsive: correggere;
- accessibilità: correggere;
- genericità confermata: valutare;
- preferenza soggettiva: non applicare automaticamente;
- elemento identitario: preservare;
- redesign ampio: respingere;
- problema tecnico condiviso: trasferire con package controllato.

Matrice minima:

- palette;
- typography;
- navbar;
- footer;
- buttons;
- reveal;
- hover;
- spacing;
- images;
- mobile editorial order;
- route transitions;
- gallery/lightbox;
- legal pages;
- 404.

Test finale: nascondendo logo e nome, START e BUSINESS devono sembrare chiaramente appartenenti alla stessa famiglia.

## Ordine del mese intensivo

### Prima dell’attivazione

Preparare completamente i brief delle tre famiglie.

### Settimana 1

Beauty START + BUSINESS.

### Settimana 2

Professional START + BUSINESS.

### Settimana 3

Home Services START; BUSINESS se il ritmo lo consente.

### Settimana 4

QA, Impeccable, portfolio capture, screenshot e video, descrizioni commerciali, aggiornamento Tretnix, aggiornamento Tretnix-knowledge e registro dei pattern canonici.

## Verifiche obbligatorie

Per ogni progetto:

- diff;
- typecheck se esiste;
- lint se esiste;
- test se esistono;
- build;
- 360, 390, 430, 768 px e desktop;
- overflow;
- tastiera e focus;
- contrasto;
- reduced motion;
- direct URL;
- refresh;
- back e forward;
- console e rete;
- immagini e layout shift;
- pagine legali;
- 404;
- metadata demo;
- attribuzione Tretnix.

Non dichiarare controlli superati se non eseguiti.

## Primo messaggio consigliato nella nuova chat

> Riprendiamo dal file `TRETNIX_NEXT_CHAT_HANDOFF_2026-07-25.md`. Prima di attivare Codex e Lovable, voglio definire completamente la famiglia Beauty & Wellness: posizionamento, naming del concept, START, BUSINESS, route, direzione visuale, contenuti, motion, anti-pattern e acceptance criteria.

Obiettivo della nuova chat:

- scegliere il concept Beauty;
- creare `PRODUCT.md`;
- creare `DESIGN.md`;
- creare `CONTENT.md`;
- creare `ROUTES.md`;
- creare `ANIMATIONS.md`;
- definire acceptance criteria;
- preparare il primo prompt Lovable.
