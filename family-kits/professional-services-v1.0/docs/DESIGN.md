# QUADRA Studio — Design Direction

**Famiglia:** Professional Services  
**Versione:** 1.0  
**Stato:** approvato come baseline di preparazione

## 1. Direzione

QUADRA Studio deve risultare:

- autorevole;
- preciso;
- sobrio;
- strutturato;
- contemporaneo;
- umano senza informalità eccessiva;
- premium senza ostentazione;
- leggibile anche con contenuti complessi.

Parole guida:

```text
ordine
criterio
responsabilità
chiarezza
misura
continuità
```

## 2. Differenza dalle altre famiglie

| Famiglia | Linguaggio |
|---|---|
| Hospitality | caldo, editoriale, artigianale |
| Beauty & Wellness | arioso, tattile, intimo |
| Professional Services | preciso, strutturato, autorevole |
| Home Services | concreto, diretto, operativo |

Professional Services non deve riutilizzare palette, tipografia o ritmo di Forno Lume o RITO Studio.

## 3. Palette

| Token | Valore | Uso |
|---|---:|---|
| `--color-canvas` | `#F4F1EA` | sfondo principale |
| `--color-surface` | `#E5E0D6` | sezioni e pannelli |
| `--color-ink` | `#171A18` | testo principale |
| `--color-muted` | `#626760` | testo secondario |
| `--color-accent` | `#24483D` | CTA e segni identitari |
| `--color-accent-strong` | `#17352D` | hover e superfici scure |
| `--color-signal` | `#A37B3E` | micro-dettagli selettivi |
| `--color-line` | `#C6C0B5` | griglia e separatori |
| `--color-white` | `#FFFEFA` | superfici e testo inverso |

### Regole

- Il verde profondo è identitario, non decorativo.
- Il segnale ocra appare solo su indici, focus o dettagli editoriali.
- Niente corporate blue automatico.
- Niente gradient text.
- Niente glow.
- Contrasto da verificare sul codice reale.

## 4. Tipografia

### Display ed editoriale

```text
Source Serif 4
weights: 400, 500, 600
italic: uso molto selettivo
```

### Corpo e interfaccia

```text
IBM Plex Sans
weights: 400, 500, 600
```

### Scala indicativa

```text
display-xl: clamp(3.1rem, 7vw, 7rem)
h1: clamp(2.8rem, 6vw, 5.8rem)
h2: clamp(2.1rem, 4.2vw, 4rem)
h3: clamp(1.4rem, 2.1vw, 2rem)
body-lg: clamp(1.05rem, 1.3vw, 1.25rem)
body: 1rem
small: 0.875rem
index: 0.75rem
```

### Regole

- Niente testo minuscolo come segnale di prestigio.
- Uppercase solo per label brevi.
- Paragrafi tra 48 e 72 caratteri per riga.
- Numeri tabulari quando si mostrano dati reali.
- Citazioni e note non devono sembrare clausole illeggibili.

## 5. Griglia e spaziatura

```text
base unit: 4px
content max-width: 1360px
reading max-width: 760px
mobile gutter: 20px
tablet gutter: 32px
desktop gutter: 48px
section gap mobile: 80–104px
section gap desktop: 128–168px
```

La griglia può essere visivamente suggerita da linee e allineamenti, mai sovrapposta come decorazione continua.

## 6. Superfici, bordi e forme

- Radius: `0–4px`.
- Pulsanti rettangolari.
- Bordi 1px.
- Ombre minime e funzionali.
- Tabelle e indici leggibili.
- Nessun glassmorphism.
- Nessuna card flottante generica.
- Nessun pattern a scacchiera ripetuto senza funzione.

## 7. Pulsanti e link

### Primary

- sfondo accent strong;
- testo white;
- altezza minima 48px;
- bordo visibile;
- focus ring chiaro;
- hover senza spostamento.

### Secondary

- sfondo trasparente;
- bordo ink o accent;
- testo conciso.

### Link editoriali

- underline o indicatore lineare;
- freccia massima 4px;
- destinazione chiara;
- niente “Scopri di più” ripetuto senza contesto.

## 8. Navbar

### START

- sticky;
- superficie canvas;
- wordmark a sinistra;
- navigazione essenziale;
- CTA “Richiedi un confronto”;
- bordo inferiore dopo lo scroll;
- nessun hide-on-scroll;
- drawer mobile solido e accessibile.

### BUSINESS

Preserva:

- wordmark;
- altezza;
- font;
- CTA;
- drawer;
- focus;
- comportamento scroll.

Può aggiungere un menu strutturato, ma non un mega-menu nella prima versione salvo necessità dimostrata.

## 9. Hero START

### Desktop

Composizione 60/40:

- testo principale;
- eyebrow;
- headline;
- introduzione;
- CTA;
- indice delle aree o microprincipi;
- immagine architettonica, ritratto ambientato o dettaglio di lavoro.

### Mobile

```text
eyebrow
headline
body
CTA
indice
immagine
```

### Vietato

- hero centrata generica;
- mockup dashboard;
- skyline aziendale;
- stretta di mano;
- bilancia della giustizia;
- martelletto;
- calcolatrice come simbolo principale;
- foto di persone che indicano grafici;
- claim assoluti.

## 10. Fotografia e grafica

### Soggetti

- studio reale;
- materiali e documenti privi di dati;
- dettagli di lavoro;
- riunione reale e naturale;
- ritratti ambientati;
- architettura;
- libri o strumenti pertinenti;
- planimetrie e tavole solo con diritti e dati protetti.

### Estetica

- luce naturale;
- toni neutri;
- composizione ordinata;
- profondità;
- persone credibili;
- niente pose pubblicitarie evidenti.

### Grafica

Sono ammessi:

- diagrammi semplici;
- timeline;
- indici numerati;
- mappe concettuali;
- linee e moduli.

Non devono fingere dati o performance.

## 11. Componenti distintivi

- `ExpertiseIndex`: elenco numerato con descrizioni e link.
- `PrinciplesLedger`: principi su griglia lineare, non card.
- `EngagementPath`: percorso in quattro fasi.
- `SectorMatrix`: matrice settori/competenze.
- `ScenarioBrief`: scenario dimostrativo, non case study fittizio.
- `CaseBrief`: solo casi reali autorizzati.
- `InsightIndex`: articoli e note organizzati.
- `QualificationCTA`: ingresso alla richiesta strutturata.
- `ProfessionalDisclosure`: iscrizioni, ruoli e note solo verificati.
- `TretnixAttribution`: firma discreta.

## 12. Iconografia

- icone lineari essenziali;
- uso ridotto;
- preferire numeri, testo e segni;
- nessuna icona decorativa per ogni servizio;
- vietati martelletti, bilance, lampadine, razzi e target generici salvo significato reale.

## 13. Adattamento cliente

La famiglia non impone un'identità unica.

Possono cambiare:

- palette;
- font;
- fotografia;
- densità;
- linguaggio;
- componenti selezionati.

Devono restare:

- chiarezza;
- gerarchia;
- leggibilità;
- accessibilità;
- sistema di qualificazione;
- processo START → BUSINESS.

Una volta approvato lo START del cliente, BUSINESS ne eredita l'identità.

## 14. Anti-pattern

- corporate blue generico;
- sito da banca;
- hero con skyline;
- strette di mano;
- card identiche;
- contatori inventati;
- loghi cliente senza consenso;
- badge “leader” o “top” non dimostrabili;
- frasi come “soluzioni a 360 gradi”;
- gergo privo di contenuto;
- sezione “perché noi” con claim indistinguibili;
- animazioni fintech;
- cursore custom;
- menu eccessivamente complessi;
- form che chiede subito documenti o dettagli riservati;
- dark mode obbligatoria usata per sembrare tecnologici.

## 15. Criteri visuali

- Senza logo il sito appare Professional Services premium.
- Non sembra Beauty, Hospitality, fintech o SaaS.
- Le competenze sono leggibili senza card uniformi.
- La fotografia supporta autorevolezza senza cliché.
- La griglia è percepibile ma non rigida.
- Mobile 360 px non presenta overflow.
- Focus, contrasto e touch target sono verificabili.
