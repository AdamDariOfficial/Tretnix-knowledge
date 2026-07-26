# RITO Studio — Testing and Verification

**Famiglia:** Beauty & Wellness  
**Versione:** 1.0  
**Stato:** approvato; nessun controllo ancora eseguito

## 1. Regola di evidenza

Non dichiarare superati typecheck, lint, test, build, browser check, accessibilità o deploy se non eseguiti.

Per ogni controllo registrare:

- comando o procedura;
- ambiente;
- data;
- risultato;
- errore;
- limite;
- artefatti prodotti.

## 2. Comandi

Eseguire soltanto gli script realmente presenti nel repository.

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Adattare al package manager rilevato.

Se uno script non esiste:

```text
non disponibile
```

Non inventarlo.

## 3. Viewport obbligatori

- 360 px;
- 390 px;
- 430 px;
- 768 px;
- desktop rappresentativo;
- desktop ampio.

## 4. START — matrice funzionale

### Header

- logo;
- link anchor;
- CTA;
- sticky;
- drawer;
- `Escape`;
- focus return;
- body scroll lock.

### Hero

- nessun layout shift;
- testo leggibile;
- CTA raggiungibili;
- immagine con dimensioni dichiarate;
- nessun overflow.

### Trattamenti

- righe leggibili;
- eventuale espansione da tastiera;
- nessuna card tagliata;
- contenuti da configurazione.

### Gallery

- immagini responsive;
- alt;
- lazy loading;
- nessun salto di layout.

### CTA e contatti

- modalità demo non invia dati;
- placeholder chiaramente dimostrativi;
- link esterni non puntano a servizi reali non approvati;
- informazioni pratiche senza hover inutili.

### Legal e 404

- route dirette;
- refresh;
- link footer;
- pagina 404.

## 5. BUSINESS — matrice funzionale

### Routing

- tutte le route;
- direct URL;
- refresh;
- back;
- forward;
- route inesistente;
- slug trattamento inesistente;
- reset scroll immediato.

### Catalogo trattamenti

- filtri;
- categorie;
- link;
- dati mancanti;
- prezzi opzionali;
- durata;
- servizi correlati.

### Team

- profilo completo;
- immagine mancante;
- specializzazioni;
- CTA filtrata.

### Booking adapter

#### `external`

- URL valido;
- apertura prevedibile;
- label che dichiara il passaggio al provider.

#### `whatsapp`

- numero validato;
- messaggio codificato;
- fallback desktop;
- nessun dato sensibile nell'URL oltre a quanto approvato.

#### `request`

- label;
- validazione;
- errori;
- loading;
- double submit;
- consenso;
- endpoint indisponibile;
- successo;
- privacy;
- rate limiting lato backend, se reale.

#### `demo`

- nessun dato trasmesso;
- conferma chiara;
- network verificata.

### Gallery/lightbox

- click;
- tastiera;
- frecce;
- `Escape`;
- focus trap;
- focus return;
- `100dvh`;
- orientamento mobile.

### FAQ

- tastiera;
- focus;
- aria;
- apertura/chiusura;
- reduced motion;
- nessun auto-scroll.

## 6. Accessibilità

- landmark;
- un `h1` principale per pagina;
- gerarchia heading;
- alt;
- label form;
- error summary quando necessario;
- focus visibile;
- focus order;
- contrasto;
- touch target;
- dialog;
- drawer;
- lightbox;
- reduced motion;
- zoom 200%;
- navigazione solo tastiera.

Obiettivo pratico: WCAG 2.2 AA per i flussi rilevanti.

## 7. Responsive

Verificare:

- nessun overflow orizzontale;
- nessun contenuto tagliato;
- CTA non sovrapposte;
- immagini non deformate;
- footer;
- drawer;
- testi lunghi;
- prezzi lunghi;
- nomi professionisti lunghi;
- safe area;
- tastiera virtuale nel booking;
- mobile editorial order: testo prima dell'immagine, salvo eccezioni documentate.

## 8. Motion

- hero;
- reveal viewport;
- replay;
- reduced motion;
- route change;
- drawer;
- FAQ;
- lightbox;
- performance;
- observer cleanup;
- contenuto visibile senza JavaScript, quando applicabile.

## 9. SEO pubblico

- title;
- description;
- canonical;
- Open Graph;
- favicon;
- robots;
- sitemap;
- 404;
- status code;
- URL leggibili;
- structured data appropriati;
- nessun rating inventato;
- dati demo non confondibili con attività reale.

## 10. Performance

- immagini dimensionate;
- formati moderni;
- lazy load;
- hero ottimizzata;
- font e pesi limitati;
- layout shift;
- richieste duplicate;
- bundle;
- console;
- network;
- errori runtime.

## 11. Sicurezza e privacy

### START

- nessun form reale in demo;
- nessun segreto client;
- nessun dato reale;
- nessun analytics senza consenso.

### BUSINESS request mode

- validazione server;
- anti-spam;
- rate limiting;
- consenso;
- minimizzazione dati;
- retention documentata;
- accesso minimo;
- log senza dati sensibili;
- nessuna service role nel client.

## 12. QA comparativa START ↔ BUSINESS

Confrontare affiancati:

- palette;
- tipografia;
- navbar;
- footer;
- pulsanti;
- spacing;
- hero;
- trattamento immagini;
- service list;
- reveal;
- hover;
- drawer;
- CTA;
- mobile;
- attribuzione Tretnix.

Test finale:

```text
Nascondendo nome e logo, START e BUSINESS devono sembrare parte della stessa famiglia.
```

## 13. Report richiesto

```md
## Verification report

- Commit:
- Ambiente:
- Comandi disponibili:
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
- Limiti:
- Test manuali rimanenti:
```
