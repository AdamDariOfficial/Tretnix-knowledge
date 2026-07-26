# NODO Servizi — Animation Language

**Famiglia:** Home & Local Services  
**Versione:** 1.0  
**Stato:** approvato come baseline di preparazione

## 1. Obiettivo

Motion:

- rapido ma non aggressivo;
- solido;
- prevedibile;
- funzionale;
- orientato alla lettura.

Non:

- emergenza artificiale;
- spettacolo;
- gamification;
- fintech;
- marketplace.

## 2. Token

```css
--motion-duration-fast: 150ms;
--motion-duration-ui: 220ms;
--motion-duration-reveal: 460ms;
--motion-duration-hero: 620ms;

--motion-ease-ui: cubic-bezier(0.2, 0.75, 0.2, 1);
--motion-ease-reveal: cubic-bezier(0.22, 1, 0.36, 1);
```

Stagger 40–60ms, massimo 180ms.

## 3. Hero

- eyebrow;
- headline a blocchi;
- body/CTA;
- dati;
- immagine.

Niente split lettere, timer, numeri animati o attese.

## 4. Reveal

```text
opacity 0 → 1
translateY 12px → 0
duration 460ms
once
```

Entrata reale nel viewport. Contenuto sempre accessibile.

## 5. Servizi

- linea/indicatore;
- variazione superficie;
- freccia massimo 4px;
- niente scale o bounce;
- niente hover su righe non cliccabili.

## 6. Processo

- progressione visiva discreta;
- nessuna animazione automatica continua;
- numeri statici;
- linee non devono ritardare il testo.

## 7. Lavori

- immagine scale massimo 1.015;
- overlay semplice;
- lightbox BUSINESS accessibile;
- nessun carosello automatico;
- nessun before/after slider obbligatorio.

## 8. Navbar/drawer

- sticky;
- bordo;
- 150–220ms;
- niente hide;
- drawer 240–300ms;
- focus trap, Escape, return, scroll lock.

## 9. Form BUSINESS

- transizioni brevi;
- focus errori;
- niente shake;
- niente progress bar gamificata;
- reduced motion immediato.

## 10. Route

Reset immediato, non smooth. Route transition non necessaria.

## 11. Reduced motion

- contenuto visibile;
- niente translate/scale;
- niente stagger;
- dialog/drawer immediati o fade minima;
- funzionalità invariata.

## 12. Performance

- transform/opacity;
- observer condiviso;
- cleanup;
- nessuna libreria nuova senza ragione;
- niente listener costosi;
- immagini lazy sotto fold.

## 13. Anti-pattern

- pulsanti lampeggianti;
- pulse “chiama ora”;
- counters;
- marquee;
- parallax;
- cursore;
- smooth reset;
- reveal prematuro;
- shake;
- hover decorativi su orari/aree;
- animazioni di mappa.

## 14. Acceptance

- leggibile senza motion;
- reveal in viewport;
- nessun replay;
- reduced motion;
- START/BUSINESS coerenti;
- mobile fluido.
