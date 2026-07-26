# NODO Servizi — Design Direction

**Famiglia:** Home & Local Services  
**Versione:** 1.0  
**Stato:** approvato come baseline di preparazione

## 1. Direzione

NODO deve risultare:

- concreto;
- affidabile;
- diretto;
- ordinato;
- tecnico senza essere freddo;
- locale senza sembrare amatoriale;
- premium senza ostentazione;
- orientato alla conversione.

Parole guida:

```text
presenza
competenza
ordine
protezione
continuità
verifica
```

## 2. Differenza dalle altre famiglie

| Famiglia | Linguaggio |
|---|---|
| Hospitality | sensoriale e artigianale |
| Beauty | tattile e intimo |
| Professional | preciso e autorevole |
| Home Services | operativo, concreto e rassicurante |

## 3. Palette

| Token | Valore | Uso |
|---|---:|---|
| `--color-canvas` | `#F3F1EB` | sfondo |
| `--color-surface` | `#DEDCD3` | sezioni |
| `--color-ink` | `#161A1B` | testo |
| `--color-muted` | `#636967` | secondario |
| `--color-accent` | `#174A55` | CTA e identità |
| `--color-accent-strong` | `#0E353E` | hover/scuro |
| `--color-signal` | `#D28A2D` | azioni e dettagli |
| `--color-line` | `#C5C3BA` | bordi |
| `--color-white` | `#FFFEFA` | testo inverso |

### Regole

- Il giallo/arancio è segnale, non colore dominante.
- Niente rosso urgenza come default.
- Niente blu corporate generico.
- Nessun gradient text o glow.
- Contrasto da verificare.

## 4. Tipografia

### Display

```text
Archivo
weights: 500, 600, 700
```

### Corpo/UI

```text
Inter
weights: 400, 500, 600
```

### Scala

```text
display-xl: clamp(3rem, 7vw, 6.8rem)
h1: clamp(2.7rem, 6vw, 5.4rem)
h2: clamp(2rem, 4vw, 3.8rem)
h3: clamp(1.35rem, 2vw, 1.9rem)
body-lg: clamp(1.05rem, 1.3vw, 1.22rem)
body: 1rem
small: 0.875rem
label: 0.75rem
```

Titoli chiari, non compressi. Numeri e dati leggibili.

## 5. Griglia e spazio

```text
base unit: 4px
content max-width: 1360px
reading max-width: 720px
mobile gutter: 20px
tablet gutter: 32px
desktop gutter: 48px
section gap mobile: 72–96px
section gap desktop: 112–152px
```

Più denso delle famiglie editoriali, ma mai affollato.

## 6. Forme

- Radius 2–6px.
- Pulsanti rettangolari.
- Bordi visibili.
- Ombre limitate.
- Immagini con angoli quasi netti.
- Nessun glassmorphism.
- Niente card flottanti tutte uguali.
- Sezioni operative possono usare superfici robuste.

## 7. Pulsanti

### Primary

- accent strong;
- testo white;
- altezza minima 50px;
- focus ring;
- label esplicita: “Richiedi un sopralluogo”, non “Scopri”.

### Signal

- signal su ink o viceversa;
- solo per CTA importanti;
- non usarlo su ogni elemento.

### Secondary

- bordo;
- sfondo trasparente;
- nessuno spostamento layout.

## 8. Navbar

### START

- sticky;
- logo;
- Servizi, Metodo, Lavori, Area, Contatti;
- CTA “Richiedi un sopralluogo”;
- telefono solo se reale;
- bordo dopo scroll;
- niente hide;
- drawer accessibile.

### BUSINESS

Preserva identità e comportamento. Può aggiungere menu servizi, senza mega-menu prematuro.

## 9. Hero

### Desktop

Composizione 55/45:

- eyebrow con area;
- headline;
- descrizione;
- CTA primaria e secondaria;
- dati operativi;
- immagine reale di lavoro.

### Mobile

```text
eyebrow
headline
body
CTA
microdati
immagine
```

### Vietato

- badge “24/7” finto;
- numeri di recensioni;
- timer;
- popup urgenza;
- lavoratore stock con pollice;
- parete di icone;
- hero da marketplace.

## 10. Fotografia

### Soggetti

- tecnico reale;
- lavoro in corso;
- dettaglio strumento;
- risultato;
- veicolo o attrezzatura;
- sopralluogo;
- team;
- ambiente servito.

### Estetica

- luce naturale;
- colori realistici;
- ordine;
- sicurezza;
- DPI adeguato;
- nessun volto o targa senza consenso.

### Da evitare

- stock generico;
- cantieri non propri;
- dispositivi di protezione usati male;
- mani o strumenti deformati;
- prima/dopo senza contesto;
- immagini che suggeriscono servizi non offerti;
- casa perfetta irreale come unica prova.

## 11. Componenti distintivi

- `ServiceIndex`: righe servizio con problema e risultato.
- `OperationalStrip`: area, orari, modalità, tempi di risposta reali.
- `ProcessSteps`: richiesta, contatto, sopralluogo, lavoro, verifica.
- `TrustRegister`: certificazioni/prove solo verificate.
- `ProjectGrid`: lavori reali con contesto.
- `CoverageMapText`: comuni/zone in testo, non mappa falsa.
- `QuoteCTA`: richiesta preventivo/sopralluogo.
- `SafetyNotice`: note tecniche e urgenze reali.
- `TretnixAttribution`.

## 12. Iconografia

- icone lineari o pittogrammi tecnici;
- uso funzionale;
- niente casette, chiavi inglesi e fulmini ripetuti ovunque;
- preferire testo, numeri, segni.

## 13. Adattamento cliente

Possono cambiare:

- palette;
- font;
- densità;
- foto;
- tono;
- service index;
- CTA;
- urgenza.

Devono restare:

- chiarezza;
- area;
- prova;
- processo;
- accessibilità;
- lead qualification;
- START → BUSINESS.

## 14. Anti-pattern

- sito “artigiano economico”;
- rosso emergenza;
- pulsanti lampeggianti;
- badge 24/7;
- recensioni fake;
- certificazioni fake;
- stock;
- prezzi fasulli;
- card identiche;
- mappe decorative;
- popup aggressivi;
- moduli troppo lunghi;
- quiz preventivo finto;
- custom cursor;
- parallax;
- contatori;
- loghi fornitori senza consenso;
- claim “migliori della zona”.

## 15. Criteri visuali

- Senza logo appare affidabile e operativo.
- Non sembra marketplace, SaaS o impresa improvvisata.
- Servizi leggibili.
- CTA chiara.
- Area visibile.
- Prove controllate.
- Mobile 360 senza overflow.
- Focus e contrasto verificabili.
