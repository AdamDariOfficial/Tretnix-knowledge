# QUADRA Studio — Testing and Verification

**Famiglia:** Professional Services  
**Versione:** 1.0  
**Stato:** specifica approvata; nessun controllo implementativo ancora eseguito

## 1. Regola

Non dichiarare superati typecheck, lint, test, build, browser, accessibilità, SEO o sicurezza se non eseguiti.

Registrare:

- commit;
- ambiente;
- comando;
- exit code;
- risultato;
- limite;
- artefatti.

## 2. Comandi

Eseguire solo script esistenti:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Adattare al package manager. Uno script mancante è `non disponibile`.

## 3. Viewport

- 360 px;
- 390 px;
- 430 px;
- 768 px;
- desktop;
- desktop ampio.

## 4. START

### Header

- sticky;
- anchor;
- CTA;
- drawer;
- Escape;
- focus trap/return;
- scroll lock.

### Hero

- categoria, destinatari e CTA;
- nessun layout shift;
- testo lungo;
- immagine stabile.

### Expertise e metodo

- righe leggibili;
- link;
- nessuna card tagliata;
- dati centralizzati.

### Scenari

- disclaimer demo visibile;
- nessun risultato implicito.

### CTA

- demo non invia dati;
- nessun upload;
- messaggio chiaro.

### Legal e 404

- direct URL;
- refresh;
- footer;
- 404 reale.

## 5. BUSINESS

### Routing

- tutte le route;
- slug validi/invalidi;
- direct URL;
- refresh;
- back/forward;
- top reset.

### Competenze e settori

- filtri;
- relazioni;
- empty state;
- dati mancanti;
- link correlati.

### Professionisti

- qualifica verificata;
- immagine mancante;
- route inesistente;
- disclosure;
- nessun dato inventato.

### Casi

- autorizzazione;
- anonimizzazione;
- nessun caso fake;
- rimozione route se vuota.

### Insight

- autore;
- data;
- revisione;
- disclaimer;
- metadata.

### Lead adapter

#### `external`

- URL;
- etichetta;
- sicurezza apertura.

#### `email`

- indirizzo;
- subject;
- niente dati sensibili precompilati.

#### `request`

- minimizzazione;
- validazione;
- consenso;
- loading;
- errore;
- double submit;
- rate limiting backend;
- retention;
- no upload.

#### `demo`

- nessuna request;
- nessuna memorizzazione;
- network verificata.

### Area clienti

- hidden/external/demo;
- nessuna auth implicita;
- nessun dato reale.

## 6. Accessibilità

- landmark;
- h1;
- heading;
- focus;
- contrasto;
- tastiera;
- drawer;
- form;
- error summary;
- touch target;
- zoom 200%;
- reduced motion;
- tabelle e indici;
- link descrittivi.

Obiettivo pratico WCAG 2.2 AA.

## 7. Responsive

- niente overflow;
- testi lunghi;
- email e URL;
- nomi e qualifiche;
- tabelle;
- CTA;
- footer;
- mobile editorial order;
- safe area;
- tastiera virtuale.

## 8. Privacy e sicurezza

### START demo

- nessuna request;
- nessun dato reale;
- nessun secret;
- analytics assenti o consentiti.

### BUSINESS request

- validazione server;
- anti-spam;
- rate limiting;
- minimizzazione;
- consenso;
- retention;
- accesso minimo;
- log senza contenuti riservati;
- nessuna service role client;
- nessun upload v1.

### Portale futuro

Non valutabile finché non implementato. Richiederà audit dedicato di auth, autorizzazione, RLS, storage, logging e incident response.

## 9. SEO

- title;
- description;
- canonical;
- OG;
- favicon;
- robots;
- sitemap;
- status;
- 404;
- structured data;
- autore/data;
- nessun rating;
- demo non confondibile con studio reale.

## 10. Performance

- font limitati;
- immagini;
- lazy loading;
- CLS;
- bundle;
- listener;
- observer;
- richieste;
- console;
- network.

## 11. QA START ↔ BUSINESS

Confrontare:

- palette;
- typography;
- navbar;
- drawer;
- buttons;
- expertise index;
- method;
- images;
- spacing;
- reveal;
- hover;
- footer;
- practical info;
- mobile;
- attribution.

Test:

```text
Nascondendo nome e logo, START e BUSINESS devono appartenere chiaramente alla stessa famiglia.
```

## 12. Report

```md
## Verification report

- Commit:
- Environment:
- Typecheck:
- Lint:
- Test:
- Build:
- Browser:
- Responsive:
- Accessibility:
- Reduced motion:
- Direct URL:
- Refresh:
- Back/forward:
- Console:
- Network:
- Privacy/security:
- Limitations:
- Manual checks:
```
