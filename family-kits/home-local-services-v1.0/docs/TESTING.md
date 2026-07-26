# NODO Servizi — Testing and Verification

**Famiglia:** Home & Local Services  
**Versione:** 1.0  
**Stato:** specifica approvata; nessun controllo implementativo eseguito

## 1. Regola

Non dichiarare superato ciò che non è stato eseguito.

Registrare commit, ambiente, comando, exit code, risultato, limiti.

## 2. Comandi

Solo script esistenti:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

## 3. Viewport

- 360;
- 390;
- 430;
- 768;
- desktop;
- desktop ampio.

## 4. START

### Header

- sticky;
- anchor;
- CTA;
- drawer;
- Escape;
- focus;
- scroll lock.

### Hero

- servizio/area/CTA;
- no layout shift;
- testo lungo;
- immagine.

### Servizi/processo

- righe;
- dati;
- leggibilità;
- no card clipping.

### Lavori demo

- disclaimer;
- immagini;
- nessuna falsa prova.

### Area

- testo;
- wrapping comuni;
- no map fake.

### CTA

- demo no request;
- no real contact;
- feedback.

### Legal/404

- route;
- refresh;
- footer.

## 5. BUSINESS

### Routing

- route;
- slug;
- direct URL;
- refresh;
- history;
- top reset.

### Servizi

- scope;
- inclusioni/esclusioni;
- tempi/prezzi condizionali;
- qualifiche.

### Lavori

- permessi;
- privacy;
- indirizzi;
- alt;
- filtri.

### Aree

- comuni;
- condizioni;
- duplicati;
- SEO;
- no claim fuori copertura.

### Lead adapter

#### call/whatsapp/external

- dati validi;
- label;
- URL;
- comportamento desktop/mobile.

#### request

- minimizzazione;
- validazione;
- consenso;
- loading/error;
- double submit;
- backend/rate limit;
- no upload v1.

#### demo

- zero request;
- zero storage;
- network verificata.

### Emergenza

- route nascosta se disabled;
- orari/area reali;
- no badge falso;
- safety notice.

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
- touch;
- zoom;
- reduced motion;
- lightbox;
- link telefono.

WCAG 2.2 AA pratica.

## 7. Responsive

- no overflow;
- telefoni/email/comuni;
- CTA sticky;
- immagini;
- footer;
- mobile order;
- safe area;
- tastiera virtuale;
- form.

## 8. Privacy/sicurezza

### START

- no network;
- no real data;
- no secrets;
- analytics assenti/consentiti.

### BUSINESS request

- validazione server;
- anti-spam;
- rate limit;
- minimizzazione;
- consent;
- retention;
- least privilege;
- log;
- no service role;
- no upload.

### BUSINESS PLUS

Upload/calendario richiederanno audit auth, storage, RLS, malware/MIME, dimensioni, retention.

## 9. SEO

- title;
- description;
- canonical;
- OG;
- robots;
- sitemap;
- status;
- 404;
- structured data;
- area;
- no rating;
- no 24/7 falso.

## 10. Performance

- immagini;
- font;
- lazy;
- CLS;
- bundle;
- requests;
- console;
- network;
- listener/observer.

## 11. QA START ↔ BUSINESS

- palette;
- typography;
- navbar;
- buttons;
- service index;
- process;
- trust;
- projects;
- area;
- CTA;
- footer;
- motion;
- mobile;
- attribution.

Hidden-logo test obbligatorio.

## 12. Report

```md
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
