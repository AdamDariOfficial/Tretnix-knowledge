# QUADRA Studio — Animation Language

**Famiglia:** Professional Services  
**Versione:** 1.0  
**Stato:** approvato come baseline di preparazione

## 1. Obiettivo

Il movimento comunica:

- ordine;
- precisione;
- continuità;
- attenzione;
- controllo.

Non comunica:

- spettacolo;
- tecnologia fine a sé stessa;
- urgenza;
- gamification;
- lusso artificiale.

## 2. Token

```css
--motion-duration-fast: 160ms;
--motion-duration-ui: 240ms;
--motion-duration-reveal: 520ms;
--motion-duration-hero: 680ms;

--motion-ease-ui: cubic-bezier(0.2, 0.75, 0.2, 1);
--motion-ease-reveal: cubic-bezier(0.22, 1, 0.36, 1);
```

Stagger massimo:

```text
50–70ms
totale consigliato: massimo 210ms
```

## 3. Hero

Sequenza:

1. eyebrow;
2. headline per blocchi o righe;
3. body e CTA;
4. indice o principi;
5. immagine con fade e traslazione minima.

Vincoli:

- niente split per lettera;
- niente attese scenografiche;
- niente scale superiori a 1.015;
- headline leggibile senza JavaScript;
- nessun layout shift.

## 4. Reveal

Pattern:

```text
opacity: 0 → 1
translateY: 14px → 0
duration: 520ms
once: true
```

Per linee e separatori è ammessa una crescita orizzontale breve, ma non deve ritardare il contenuto.

Attivazione reale nel viewport. Fallback visibile.

## 5. Indici e liste

- righe expertise: lieve variazione di sfondo o linea;
- numeri: nessuna rotazione;
- frecce: massimo 4px;
- niente accordion se il contenuto può restare leggibile;
- niente hover su elementi non interattivi.

## 6. Immagini

- fade e translate minima;
- scale hover massimo 1.015;
- nessun parallax nella baseline;
- niente maschere elaborate ripetute.

## 7. Navbar e drawer

### Navbar

- sticky stabile;
- bordo dopo lo scroll;
- 160–240ms;
- non nascondere su scroll.

### Drawer

- 260–320ms;
- pannello solido;
- focus trap;
- Escape;
- focus return;
- scroll lock;
- reduced motion immediato.

## 8. BUSINESS

### Filtri

- aggiornamento immediato;
- niente animazioni che fanno perdere posizione;
- stato attivo leggibile.

### FAQ

- apertura controllata;
- niente auto-scroll;
- reduced motion immediato.

### Form qualificazione

- progressione discreta;
- nessuna gamification;
- errori senza shake;
- focus sull'errore;
- transizioni 160–240ms.

### Case e insight

- nessun carosello automatico;
- nessun conteggio animato;
- route transition non necessaria.

## 9. Route

Il reset route è immediato e non smooth.

Se in futuro si introduce una transizione:

- massimo 160ms;
- non mostrare la pagina precedente durante il reset;
- non bloccare input;
- testare direct URL e history.

## 10. Reduced motion

Con `prefers-reduced-motion: reduce`:

- contenuto visibile;
- niente translate o scale;
- niente stagger;
- drawer e dialog immediati o con fade minima;
- nessuna funzione dipendente dal motion.

## 11. Performance

- transform e opacity;
- observer condiviso;
- cleanup;
- niente listener scroll non controllati;
- niente librerie aggiuntive senza necessità;
- niente animazioni di layout continue.

## 12. Anti-pattern

- smooth route reset;
- marquee;
- numeri animati;
- cursore custom;
- linee infinite decorative;
- parallax;
- hover su informazioni legali;
- reveal terminato prima del viewport;
- contenuto invisibile;
- shake sugli errori;
- transizioni fintech.

## 13. Acceptance criteria

- Tutto è leggibile senza motion.
- Reveal in viewport.
- Nessun replay casuale.
- Reduced motion completo.
- START e BUSINESS condividono token e comportamento.
- Mobile senza jank evidente.
