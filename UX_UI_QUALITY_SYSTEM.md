# Tretnix UX/UI Quality System

**Versione:** 1.1
**Aggiornato:** 5 settembre 2026
**Stato:** canonico quando applicato insieme a `TRX-DEC-034` e revisionato sul branch dedicato
**Ambito:** tutti i progetti Tretnix, salvo eccezioni documentate
**Obiettivo principale:** impedire che una UI tecnicamente corretta venga considerata completata quando presenta incoerenze visuali, spacing casuale, gerarchia debole, componenti incompleti o segnali di AI slop.

---

## 0. Baseline, fonti e limiti

Questa proposta è stata preparata contro la baseline corrente verificata della repository:

```text
Repository: AdamDariOfficial/Tretnix-knowledge
Branch: main
Commit: b5f9e60a026a4ab7155914fe26d854d801e24d2b
Commit date: 10 agosto 2026
```

Fonti Tretnix considerate:

```text
DEVELOPMENT_STANDARDS.md v1.7 — 27 luglio 2026
DECISIONS.md v1.9 — 27 luglio 2026
TRETNIX_MASTER_CONTEXT.md v1.5 — 26 luglio 2026
TRX-DEC-008 — standard tecnici condivisi, identità cliente preservata
TRX-DEC-009 — audit read-only prima delle correzioni trasversali
TRX-DEC-010 — fonte canonica scelta per pattern
TRX-DEC-013 — non dichiarare verifiche non eseguite
TRX-DEC-015 — Codex come agente operativo principale
TRX-DEC-016/017 — un writer, checkpoint e prima review read-only
TRX-DEC-032 — Controlled Change Package
```

Fonte esterna principale:

```text
Designmotion — Design System Blueprint
11 pagine
File locale analizzato: design-system-blueprint.pdf
SHA-256: 9da396915dccfb6588dc391fc99055571170d2024c4f377479703879ad654df5
```

Sono stati inoltre analizzati i 63 pattern pubblici Designmotion disponibili al momento della revisione.

### Regola di provenienza

Designmotion è una **fonte di input**, non una nuova autorità Tretnix.

Nessuna regola viene adottata perché “Designmotion lo dice”. Ogni principio viene:

1. confrontato con le decisioni Tretnix;
2. classificato per applicabilità;
3. adattato quando troppo rigido o troppo estetico;
4. rifiutato come standard globale quando rischia di appiattire l'identità cliente;
5. trasformato, quando utile, in criterio verificabile Tretnix.

Non versionare o redistribuire il PDF esterno salvo diritto esplicito. Il documento Tretnix conserva soltanto principi derivati e provenienza.

---

# 1. Perché questo sistema esiste

Tretnix aveva già standard forti per:

- responsive;
- routing;
- history;
- accessibility;
- focus;
- reduced motion;
- error states;
- sicurezza;
- test;
- build;
- browser QA;
- review e controllo Git.

Questi standard sono necessari ma non sufficienti a garantire qualità visuale.

Un prodotto può superare:

```text
typecheck
lint
test
build
routing
keyboard
focus
overflow
reduced motion
```

e avere comunque:

- spacing incoerente;
- type scale disordinata;
- allineamenti quasi corretti;
- container con larghezze divergenti;
- card e pill usate senza necessità;
- hierarchy piatta;
- componenti visivamente simili ma non identici;
- immagini con crop mediocre;
- motion non armonizzato;
- schermate che sembrano assemblate da pattern generici;
- UI che “funziona” ma non sembra progettata.

Il ciclo Impeccable ha mostrato il limite di affidarsi a un reviewer esterno per concetti non ancora formalizzati abbastanza nella Knowledge Tretnix.

Da questo momento il principio è:

> **Tretnix definisce cosa significa qualità UX/UI. Gli strumenti possono assistere, rilevare o implementare; non definiscono il livello di qualità al posto di Tretnix.**

---

# 2. Modello di qualità: Correct → Consistent → Crafted

Una UI Tretnix non è completata soltanto perché funziona.

## 2.1 `CORRECT`

La superficie:

- svolge il task;
- preserva dati e sicurezza;
- funziona nelle route previste;
- gestisce keyboard e focus;
- è responsive;
- non presenta overflow o clipping involontario;
- gestisce stati e errori pertinenti;
- rispetta reduced motion;
- supera le verifiche tecniche richieste.

## 2.2 `CONSISTENT`

La superficie:

- usa il design system del progetto;
- usa token e scale intenzionali;
- mantiene spacing coerente;
- mantiene type hierarchy coerente;
- allinea componenti equivalenti;
- mantiene variants/states coerenti;
- evita valori one-off non motivati;
- segue lo stesso linguaggio iconografico e di motion;
- conserva identità e regole del progetto.

## 2.3 `CRAFTED`

La superficie:

- ha gerarchia percettiva chiara;
- presenta ritmo e composizione intenzionali;
- non appare assemblata automaticamente;
- non presenta ripetizioni decorative inutili;
- non usa UI chrome per compensare grouping debole;
- mantiene densità adeguata al task;
- usa immagini, tipografia, spazio e movimento con intenzione;
- elimina difetti piccoli ma percepibili;
- resiste a una review visuale full-page a più viewport.

Il gate finale è:

```text
UI_CORRECTNESS_PASS
+
UI_SYSTEM_CONSISTENCY_PASS
+
UI_VISUAL_CRAFT_PASS
=
UI_QUALITY_GATE_PASS
```

Nessuno dei tre gate sostituisce gli altri.

---

# 3. Livelli normativi

Questo documento usa cinque livelli.

## 3.1 `MUST`

Regola obbligatoria salvo eccezione documentata.

Una violazione confermata è un finding da correggere o da registrare come eccezione approvata.

## 3.2 `SHOULD`

Default forte.

Può essere derogato quando il progetto ha una motivazione visuale, tecnica, di accessibilità o di prodotto migliore.

## 3.3 `CONDITIONAL`

Diventa obbligatorio **quando esiste quella superficie o quel pattern**.

Esempio:

```text
IF the project contains a data table
THEN the Tretnix Data Table Contract applies.
```

## 3.4 `SIGNAL`

Non è automaticamente un difetto.

Richiede revisione visuale esplicita perché è frequentemente associato a:

- AI slop;
- design non intenzionale;
- drift del design system;
- inconsistenza.

## 3.5 `REFERENCE_ONLY`

Principio o tecnica utile da conoscere ma **non normativa**.

`REJECT_GLOBAL` può essere usato nel pattern register per idee che non devono mai essere trasformate in standard trasversali pur potendo essere valide in un singolo progetto.

---

# 4. Principio supremo: sistema condiviso, identità distinta

Le regole condivise possono uniformare:

- qualità;
- coerenza;
- accessibilità;
- responsive;
- stati;
- semantica;
- struttura dei token;
- disciplina delle scale;
- motion safety;
- QA;
- interaction logic.

NON devono uniformare automaticamente:

- palette;
- font;
- art direction;
- composizione;
- fotografia;
- radius;
- shadow style;
- grid esatto;
- carattere del motion;
- densità;
- tono;
- linguaggio visuale.

Quindi:

```text
Tretnix grammar = shared
Client accent = project/family specific
```

Il sistema deve eliminare casualità, non differenze intenzionali.

---

# 5. Foundations Contract

## 5.1 Design tokens

### MUST

Un progetto non banale DEVE avere una fonte intenzionale per i valori visuali ripetuti.

Quando il progetto usa un design system strutturato, preferire:

```text
primitive
↓
semantic
↓
component
```

Esempio:

```text
indigo.500
↓
action.primary
↓
button.primary.background
```

Non è obbligatorio avere tutti e tre i livelli in un microsito semplice, ma la semantica ripetuta non deve essere duplicata in valori grezzi sparsi.

### MUST NOT

- hard-code sistematicamente lo stesso significato visuale in componenti diversi;
- creare nuove tonalità quasi identiche senza motivo;
- bypassare token esistenti per comodità;
- trasformare ogni eccezione in un nuovo token.

### SIGNAL

- molti hex/rgb/hsl ripetuti fuori dai file token;
- utility arbitrarie ripetute;
- valori visuali duplicati con differenze minime;
- token con nomi puramente cromatici usati direttamente ovunque quando il significato è semantico.

---

## 5.2 Color system

### MUST

Il colore deve comunicare in modo coerente:

- brand;
- hierarchy;
- interaction;
- status;
- feedback.

Stati funzionali ripetuti DOVREBBERO usare token semantici, per esempio:

```text
background.primary
background.surface
text.primary
text.secondary
text.muted
border.default
action.primary
status.success
status.warning
status.error
status.info
focus.ring
```

I nomi concreti possono seguire lo stack esistente.

### MUST

- contrasto adeguato per contenuto e controllo;
- nessun significato essenziale affidato solo al colore;
- hover/focus/selected non devono rendere il contenuto meno leggibile;
- dark theme, se esiste, deve essere progettato come tema e non come inversione meccanica.

### SIGNAL

- “purple/blue SaaS gradient” senza giustificazione;
- glow neon generico;
- gradient text usato solo per far sembrare la UI “premium”;
- colori status che cambiano semantica tra pagine;
- superfici diverse con colori quasi uguali ma non tokenizzati.

---

## 5.3 Typography

### MUST

Ogni progetto deve definire una type hierarchy intenzionale.

Esempio semantico:

```text
display
h1
h2
h3
body-lg
body
body-sm
label
caption
```

I nomi e i livelli reali dipendono dal progetto.

### MUST

- font-size ripetuti devono derivare dalla scala;
- font weight deve avere una funzione;
- line-height deve essere leggibile e coerente;
- heading vicini non devono risultare quasi indistinguibili per errore;
- copy lungo deve mantenere una misura leggibile;
- valori responsivi devono preservare hierarchy e wrapping.

### SHOULD

Come riferimento, il Blueprint usa line-height più stretta per titoli e più ampia per body. Tretnix adotta il principio, non gli intervalli come obbligo universale.

### SIGNAL

- molte font-size one-off;
- 3–4 livelli visivamente quasi identici;
- titoli enormi usati come sostituto di una vera gerarchia;
- line-height troppo compressa su body;
- label/caption troppo piccoli per il contesto;
- font weight usato casualmente;
- mix di tracking/uppercase senza grammatica.

---

## 5.4 Spacing system

Questa è una delle aree più importanti del sistema.

### MUST

Il progetto DEVE avere una spacing scale intenzionale.

Default Tretnix consigliato quando non esiste già una scala approvata:

```text
4
8
12
16
24
32
48
64
96
```

Il progetto può usare una scala diversa.

### MUST

La distanza deve riflettere la relazione semantica:

```text
più vicini = più correlati
più lontani = separazione di gruppo/sezione
```

Componenti equivalenti devono usare spacing equivalenti salvo motivo documentabile.

### MUST NOT

- inventare gap/padding per ogni componente;
- correggere inconsistenze con margin casuali;
- usare lo stesso enorme spazio tra tutti i blocchi indipendentemente dalla gerarchia;
- comprimere componenti interni mentre gli spazi esterni risultano casuali.

### Eccezioni valide

Valori fuori scala possono essere corretti quando derivano da:

- safe area;
- border/hairline;
- optical alignment;
- aspect ratio;
- viewport calculation;
- media crop;
- browser behavior;
- geometry necessaria.

L'eccezione deve essere spiegabile.

### `SPACING AUDIT` obbligatorio per polish rilevante

1. estrarre valori di `gap`;
2. estrarre padding;
3. estrarre margin;
4. individuare valori one-off;
5. raggruppare per componente;
6. confrontare componenti equivalenti;
7. confrontare section rhythm;
8. verificare transizioni tra breakpoint;
9. distinguere optical correction da drift;
10. correggere soltanto incoerenze reali.

### SIGNAL

- `17px`, `23px`, `29px`, ecc. ripetuti senza sistema;
- componenti equivalenti con 20/22/24px senza motivo;
- section padding diverso a ogni route;
- card uguali con padding differente;
- CTA group con gap variabile arbitrariamente;
- alignment corretto solo tramite margin negativi non spiegati.

---

## 5.5 Grid, container e alignment

### MUST

Ogni progetto deve definire:

- strategia container;
- gutter;
- comportamento mobile;
- principali edge di allineamento;
- eccezioni intentional full-bleed/offset.

### SHOULD

Quando utile:

```text
mobile: 4-col conceptual grid
tablet: 8-col conceptual grid
desktop: 12-col conceptual grid
```

Non è un obbligo. Layout editoriali, landing, gallery ed experience possono usare griglie diverse.

### MUST

- elementi semanticamente correlati devono condividere edge quando la composizione lo richiede;
- break-out dal container deve essere intenzionale;
- alignment ottico può differire da alignment matematico quando documentabile.

### SIGNAL

- titoli di sezioni quasi allineati ma non identici;
- container max-width diversi senza motivo;
- CTA di una route spostate di pochi pixel rispetto a route equivalenti;
- card grid che cambia edge senza logica;
- layout centrato per default in tutte le sezioni.

---

## 5.6 Radius

### MUST

Se il progetto usa border radius, deve esistere una grammatica coerente.

Esempio:

```text
radius-sm
radius-md
radius-lg
radius-pill
```

Non tutti i livelli sono obbligatori.

### MUST NOT

- aggiungere radius casuali;
- usare pill per ogni elemento;
- usare huge radius come segnale generico di modernità;
- introdurre radius incoerenti tra componenti equivalenti.

### SIGNAL

- molte scale `6/7/8/10/12/14/16/20/24`;
- pill decorative senza funzione;
- nested rounded containers;
- radius forti su un brand che usa geometria netta.

---

## 5.7 Borders and dividers

### MUST

Bordi e divisori devono avere una funzione:

- boundary;
- state;
- grouping;
- affordance;
- separation.

### MUST NOT

Usare bordi per risolvere indiscriminatamente una gerarchia debole.

### SIGNAL

- ogni blocco è racchiuso;
- card dentro card;
- border + shadow + background su ogni superficie;
- separator duplicato da spazio già sufficiente.

### Divider reveal autonomy

Quando un separator editoriale viene animato all'ingresso:

- il divider è un target motion autonomo;
- il suo reveal usa soltanto opacità come default;
- non eredita translate/scale/clip dal contenuto adiacente;
- il refactor non può alterare neppure di un pixel il layout risultante;
- border geometry, spacing, grid e flow devono rimanere equivalenti prima e dopo la modifica;
- in reduced motion il divider è immediatamente visibile.

Un border con funzione di boundary, state o affordance non viene classificato automaticamente come
divider animato.

---

## 5.8 Elevation and shadows

### MUST

Le ombre, quando usate, devono appartenere a un modello coerente.

### SHOULD

Limitare i livelli a quelli realmente necessari.

### MUST NOT

- usare una shadow diversa per ogni card;
- alzare continuamente shadow/blur per “premium feel”;
- usare glow come sostituto di hierarchy.

### SIGNAL

- box-shadow one-off ripetute;
- hover lift su tutto;
- superfici che sembrano galleggiare senza relazione spaziale.

---

## 5.9 Icons

### MUST

Il progetto deve usare un linguaggio iconografico coerente.

Una libreria primaria è consigliata; custom icon o eccezioni di brand sono consentite se otticamente coerenti.

### SHOULD

Scala di riferimento possibile:

```text
16 inline
20 default
24 navigation/action
32 feature
48 large illustration/icon
```

Non è normativa.

### MUST

Il target interattivo deve essere adeguato anche quando l'icona visuale è piccola. Come default pratico, puntare a circa `44×44 CSS px` per controlli touch principali salvo componenti/contesti in cui un altro sizing accessibile è più appropriato.

### SIGNAL

- stroke width diversa senza motivo;
- icone da set diversi visibilmente incompatibili;
- icona decorative su ogni label;
- icon button senza accessible name;
- dimensioni quasi uguali ma non sistematiche.

---

## 5.10 Images and media

### MUST

Per ogni ruolo visuale importante definire:

- aspect ratio o comportamento;
- crop strategy;
- `object-position` quando necessario;
- comportamento mobile;
- loading;
- alt;
- dimensioni per evitare layout shift.

### MUST

Il crop deve preservare il soggetto e l'intento, non soltanto riempire il box.

### SIGNAL

- volti/tagli importanti fuori frame;
- stessa immagine con crop incoerente tra route;
- aspect ratio scelti casualmente;
- immagini stock con trattamento non coerente;
- placeholder o gradienti usati per mascherare asset deboli.

---

# 6. Component Anatomy Contract

Ogni componente condiviso deve avere:

```text
purpose
anatomy
variants
sizes (se necessari)
states
responsive behavior
accessibility behavior
content rules
exceptions
```

Non serve un documento separato per ogni componente: queste informazioni possono vivere in codice, story, documentazione progetto o design system.

## 6.1 State matrix

Per ogni componente interattivo devono essere valutati gli stati applicabili:

```text
default
hover
focus-visible
active / pressed
selected
disabled
readonly
loading
pending
success
warning
error / invalid
empty
```

Non tutti sono obbligatori per ogni componente.

### Button baseline

```text
default          MUST
hover            MUST where pointer interaction exists
focus-visible    MUST
pressed/active   MUST
disabled         CONDITIONAL
loading          CONDITIONAL for async action
destructive      CONDITIONAL
```

### Input baseline

```text
default          MUST
focus            MUST
filled           MUST
invalid          MUST when validation exists
disabled         CONDITIONAL
readonly         CONDITIONAL
pending          CONDITIONAL
success          only if meaningful
```

### MUST

Stati equivalenti devono avere linguaggio visuale coerente.

### MUST NOT

- nascondere focus perché “brutto”;
- cambiare layout durante hover/focus se non necessario;
- usare disabled come unica spiegazione di impossibilità quando serve una reason;
- mostrare spinner senza proteggere duplicate submit quando l'azione lo richiede.

---

# 7. Interaction and Affordance Contract

## 7.1 Clickability

Un elemento interattivo deve essere riconoscibile tramite almeno uno dei segnali appropriati:

- semantica nativa;
- label;
- shape;
- contrasto;
- affordance;
- posizione;
- cursor come supporto, non unica indicazione.

Non rendere intera UI “cliccabile” senza gerarchia.

## 7.2 Feedback

Ogni azione significativa deve produrre feedback proporzionato:

```text
immediate local state
or
loading/pending
or
success/error
or
navigation
```

Il silenzio è accettabile solo se il risultato è immediatamente evidente.

## 7.3 Reversibility

Per azioni reversibili valutare:

```text
perform
→ feedback
→ undo
```

prima di usare modali di conferma pervasive.

Per azioni ad alto impatto o irreversibili usare protezioni proporzionate.

---

# 8. Forms Contract

## 8.1 Field anatomy

Quando applicabile:

```text
label
control
hint
validation/status
error
```

Placeholder non sostituisce automaticamente la label.

## 8.2 Validation timing

### MUST

Non mostrare un errore come se fosse già colpa dell'utente prima che abbia avuto un'opportunità ragionevole di completare il dato.

Strategia default:

```text
first validation:
blur / submit / completion boundary

after known error:
faster revalidation while correcting
```

Il tipo di field può richiedere comportamento diverso.

## 8.3 Submit

### MUST

- impedire duplicate submission quando rilevante;
- mostrare pending state;
- mantenere o ripristinare input dopo errore secondo il rischio;
- spiegare errori action-oriented;
- dare feedback di successo quando non è già ovvio.

## 8.4 Input specialized contracts

Sono `CONDITIONAL`:

- password;
- OTP;
- date/date-range;
- masked input;
- file upload;
- color picker;
- range;
- search/combo;
- stepper/wizard.

Ogni specialized input deve applicare il relativo pattern register e le regole di accessibilità/prodotto del progetto.

---

# 9. Feedback Hierarchy

La superficie di feedback non è intercambiabile.

## 9.1 Default decision table

| Necessità | Superficie predefinita |
|---|---|
| Errore di un singolo field | inline vicino al field |
| Validazione di un gruppo | inline summary + field state quando utile |
| Successo breve non critico | toast o feedback locale |
| Problema persistente di pagina | banner/panel inline |
| Stato persistente | badge/status text |
| Decisione obbligatoria | dialog/modal solo se realmente blocking |
| Errore che blocca il contenuto | error state nel contenuto con recovery |
| Nessun dato | empty state contestuale |

### MUST NOT

- usare toast come unico posto per errore critico;
- mostrare errori permanenti in superfici effimere;
- usare dialog per feedback che non richiede una decisione;
- usare badge come decorazione priva di semantica.

---

# 10. Overlay Hierarchy

Prima di scegliere l'overlay, rispondere:

```text
Is it blocking?
How much context must remain visible?
How much content exists?
Is it multi-step?
Is it mobile dominant?
Can it be a normal page?
Is dismissal safe?
Does it modify critical data?
```

## 10.1 Default

```text
popover
= piccola informazione/azione contestuale

dropdown/menu
= scelta o comando compatto

bottom sheet
= azione contestuale mobile con reachability utile

drawer
= contenuto più ampio mantenendo contesto

modal/dialog
= decisione o task che richiede focus temporaneo

page
= contenuto complesso, persistente, deep-linkable o multi-step
```

### MUST

Gli overlay pertinenti devono gestire:

- focus iniziale;
- focus trap quando necessario;
- `Escape` quando appropriato;
- ritorno focus;
- scroll lock;
- background inert/semantics quando previsto;
- mobile viewport;
- nested overlays con estrema cautela.

---

# 11. Navigation Contract

La navigazione deve derivare dal task, non da pattern SaaS predefiniti.

## 11.1 MUST

- direct URL, refresh, Back, Forward preservati;
- route reset secondo decisioni Tretnix;
- focus/navigation behavior coerente;
- active state comprensibile;
- mobile navigation completa e raggiungibile;
- route importanti non devono dipendere da gesture non scopribili.

## 11.2 MUST NOT

- imporre bottom navigation a ogni mobile app;
- imporre sidebar a ogni desktop;
- duplicare route/action in troppi posti senza gerarchia;
- usare nav item come badge decorativi.

---

# 12. Search Contract — CONDITIONAL

Quando esiste search:

### MUST valutare

```text
query state
input clear
loading
result count/context
keyboard
recent queries when useful
zero results
filtered zero results
error
pagination/infinite result behavior
highlighting only when useful
URL persistence when navigation/history benefits
```

### MUST NOT

- confondere zero data con zero search results;
- lasciare l'utente senza recovery;
- rifare query remota per ogni keystroke senza ragione;
- nascondere filtri attivi.

---

# 13. Filtering Contract — CONDITIONAL

Definire:

- available filters;
- active filters;
- reset;
- count;
- URL/state persistence;
- mobile surface;
- empty result behavior.

Filter chips sono appropriati quando filtri e stato sono leggibili; non sono obbligo universale.

---

# 14. Data Table Contract — CONDITIONAL

Quando esiste una data table, definire esplicitamente:

```text
column meaning
column alignment
numeric alignment
sorting
selection
bulk actions
row actions
density
sticky header/columns
overflow strategy
responsive strategy
loading
empty
error
pagination
long values
truncation / disclosure
keyboard where applicable
```

### MUST

- colonne numeriche comparabili devono essere facilmente scansionabili;
- overflow mobile deve essere intenzionale;
- informazioni essenziali non devono sparire senza alternativa;
- table-like data non deve diventare una pila di card solo perché mobile, se ciò distrugge comparabilità.

---

# 15. Data Visualization Contract — CONDITIONAL

## MUST

Un grafico non deve intenzionalmente amplificare o ridurre differenze senza motivazione.

Verificare:

- chart type;
- domain/scale;
- baseline;
- labels;
- units;
- tooltip;
- missing data;
- zero;
- positive/negative;
- color semantics;
- accessibility fallback;
- responsive readability.

### MUST NOT

Usare un grafico soltanto perché rende la dashboard più “ricca”.

---

# 16. Loading, Empty, Error and Partial States

## 16.1 State model

Ogni flusso asincrono valuta:

```text
idle
pending/loading
success
empty
partial
error
retry
timeout/unavailable
offline where relevant
```

Non tutti sono visibili in ogni flusso.

## 16.2 Loading decision

Preferire:

```text
immediate update
→ if action is local and safe

optimistic UI
→ if reversible, low-risk, high success probability

spinner/simple progress
→ if structure is unknown or wait is short

skeleton
→ if structure is predictable and delay warrants it

determinate progress
→ if measurable and user benefits from progress
```

### MUST

Loading non deve cambiare drasticamente layout senza necessità.

---

# 17. Microcopy Contract

Il copy UI deve essere:

- specifico;
- action-oriented;
- coerente con il tono del progetto;
- comprensibile senza conoscere l'implementazione.

Preferire:

```text
Salva modifiche
```

rispetto a:

```text
Conferma
```

quando “Conferma” non dice cosa accadrà.

Errori devono evitare:

```text
Something went wrong
```

quando è possibile descrivere recovery più utile.

La specificità non autorizza a cambiare copy approvato fuori scope.

---

# 18. Responsive Visual Quality

Gli standard Tretnix esistenti restano autoritativi.

## MUST verificare almeno

```text
360
390
430
768
desktop rappresentativo
```

## SHOULD aggiungere quando la superficie lo richiede

```text
1024
1440
1920
mobile landscape
200% zoom
```

### Visual QA responsive deve guardare anche

- rhythm, non solo overflow;
- line breaks;
- headline width;
- card density;
- image crop;
- container/gutter;
- sticky layering;
- CTA grouping;
- component equivalence;
- touch spacing;
- disclosure behavior.

“Non overflowa” non equivale a “è ben progettato”.

---

# 19. Accessibility as Visual Quality

Accessibility non è un gate separato dal craft.

## MUST

- focus-visible percepibile;
- contrasto;
- keyboard;
- logical order;
- semantic labels;
- touch target adeguati;
- reduced motion;
- non-color semantics;
- zoom;
- overlay focus;
- alt/media behavior.

### MUST NOT

Sacrificare accessibilità per “pulire” visivamente il design.

---

# 20. Motion System

## 20.1 Purpose

Ogni animazione deve avere almeno una funzione:

```text
guide attention
show relationship
confirm state change
preserve spatial context
support hierarchy
add brand character without blocking
```

Se non ha funzione, deve essere giustificata come polish non invasivo.

## 20.2 Motion tokens

Quando il progetto usa motion ripetuto, definire token/scale.

Default di partenza, non legge universale:

```text
micro      ~100ms
small      ~150–220ms
medium     ~220–320ms
large      ~320–450ms
orchestration up to ~500ms when non-blocking and justified
```

I numeri sono adattamento di riferimento, non override della specifica di famiglia.

## 20.3 Easing vocabulary

Default concettuale:

```text
enter/appear → ease-out family
move/resize  → ease-in-out family
exit/leave   → ease-in family
```

La curva concreta può essere brand-specific.

## 20.4 MUST

- `prefers-reduced-motion`;
- contenuto utilizzabile senza animazione;
- reveal sotto fold quando entra realmente in viewport;
- divider editoriali rivelati come target autonomi con opacity-only e geometria invariata;
- no smooth reset di route;
- no animation-induced hidden content;
- no whole-section heavy reveal come default;
- no layout shift cosmetico.

## 20.5 SIGNAL

- spring su ogni interazione;
- scale/translate hover su ogni card;
- fade+blur+translate identico su ogni sezione;
- scroll animation usata perché “fa moderno”;
- decorative background motion dominante.

---

# 21. Visual Hierarchy Contract

Ogni viewport deve avere una lettura prioritaria.

## MUST poter rispondere

1. Qual è l'elemento più importante?
2. Qual è l'azione principale?
3. Cosa viene dopo?
4. Quali elementi sono supporto?
5. La gerarchia deriva dal contenuto o da chrome decorativo?

## SIGNAL

- titolo, subtitle, card title e body quasi uguali;
- CTA primaria e secondaria indistinguibili;
- troppi elementi “primary”;
- ogni sezione ha identico peso;
- hierarchy ottenuta solo con box e shadow;
- heading enormi ma contenuto non prioritizzato.

---

# 22. AI Slop Prevention Rubric

Questa sezione è normativa come **sistema di segnali**, non come divieto estetico assoluto.

Ogni signal deve essere valutato nel contesto della superficie:

```text
Persuade
Operate
Read
Experience
```

Un pattern appropriato in un CRM può essere slop in un sito beauty editoriale.

## 22.1 Structural slop signals

### `SLOP-001 — Excessive cardization`

Molto contenuto viene trasformato in card senza che la card comunichi una boundary, un'azione o un'entità reale.

### `SLOP-002 — Nested container syndrome`

Card dentro card, panel dentro panel, border dentro background senza necessità informativa.

### `SLOP-003 — Repeated feature-grid formula`

Ripetizione di:

```text
icon
heading
paragraph
```

in griglie uniformi anche quando i contenuti hanno natura differente.

### `SLOP-004 — Section-template repetition`

Sezioni diverse usano la stessa composizione con contenuto sostituito.

### `SLOP-005 — Center-everything`

Hero, sezioni, CTA, testimonials e footer sono tutti centrati senza ragione editoriale.

### `SLOP-006 — Uniform rhythm`

Tutte le sezioni hanno lo stesso padding verticale e lo stesso peso, eliminando gerarchia.

### `SLOP-007 — SaaS shell leakage`

Sidebar/card/pill/data-chrome compare in superfici non-SaaS perché è il default dello strumento.

---

## 22.2 Decorative slop signals

### `SLOP-008 — Pill abuse`

Badge/pill decorative prive di stato, filtro, tag o funzione.

### `SLOP-009 — Generic gradient text`

Gradient text come “premium effect” senza relazione col brand.

### `SLOP-010 — Generic glow`

Glow viola/blu/neon introdotto senza art direction.

### `SLOP-011 — Big-radius everywhere`

Radius grandi e morbidi su ogni container indipendentemente dal brand.

### `SLOP-012 — Hover-lift everywhere`

Ogni card si alza/scala al passaggio del mouse.

### `SLOP-013 — Decorative icon saturation`

Icona su ogni titolo, label e stat per riempire spazio.

### `SLOP-014 — Abstract-blob hero`

Blob/mesh/gradient generico usato come sostituto di art direction.

---

## 22.3 System slop signals

### `SLOP-015 — Arbitrary spacing`

Valori one-off frequenti non riconducibili alla spacing scale.

### `SLOP-016 — Arbitrary typography`

Font size/weight/line-height cambiano senza ruolo semantico.

### `SLOP-017 — Token bypass`

Componenti equivalenti ricreano colori, radius o shadows invece di riusare il sistema.

### `SLOP-018 — Almost-the-same components`

Button, card, input o badge quasi uguali ma con piccole differenze accidentali.

### `SLOP-019 — Unexplained layout drift`

Route analoghe hanno container, gutter o header spacing differenti.

### `SLOP-020 — Z-index escalation`

Numeri arbitrariamente alti per correggere stacking senza modello.

---

## 22.4 Content-composition slop signals

### `SLOP-021 — Generic hero composition`

Hero intercambiabile con prodotti di categorie diverse.

### `SLOP-022 — Visual proof without proof`

Numeri, badge, “trusted by”, rating o logos usati come decorazione senza evidenza reale.

### `SLOP-023 — Decorative density`

Elementi aggiunti per “riempire” anziché supportare task o brand.

### `SLOP-024 — Excessive chrome`

Troppi border, labels, badges, separators e controls rendono una superficie semplice artificialmente “productized”.

---

## 22.5 Come classificare un signal

Ogni signal viene marcato:

```text
NOT_PRESENT
PRESENT_INTENTIONAL
PRESENT_ACCEPTABLE
PRESENT_NEEDS_REVIEW
CONFIRMED_SLOP
NOT_APPLICABLE
```

Solo `CONFIRMED_SLOP` è un finding da correggere.

### Per confermare AI slop il reviewer deve indicare

- dove appare;
- perché è generico nel contesto;
- quale decisione/progetto contraddice;
- quale comportamento o identità preservare;
- soluzione minima;
- rischio della correzione.

Non basta dire:

```text
"sembra AI"
```

---

# 23. Visual Precision Audit

Questa è la parte che impedisce un nuovo “Impeccable pass senza polish reale”.

## 23.1 Audit statico

Quando tecnicamente possibile, raccogliere:

```text
colors
font sizes
font weights
line heights
letter spacing
gap
padding
margin
radius
border widths
shadows
z-index
transition durations
easing
container widths
breakpoints
```

Produrre frequenze e cluster.

### I valori unici NON sono automaticamente errori

Sono candidate signal.

Il reviewer deve distinguere:

```text
token
legitimate exception
optical correction
derived value
accidental one-off
```

## 23.2 Audit computed/browser

Su route rappresentative verificare computed styles di componenti equivalenti.

Esempi:

```text
all primary buttons
all section headings
all form controls
all cards of same family
all nav items
all status badges
```

Confrontare:

- height;
- padding;
- typography;
- radius;
- border;
- shadow;
- focus;
- responsive behavior.

## 23.3 Full-page visual traversal

Per route importanti non basta una viewport capture.

Serve una review full-page o traversal sistematica che osservi:

```text
entry rhythm
hero-to-content transition
section sequence
spacing
repetition
image cadence
CTA cadence
footer transition
sticky/fixed layers
```

---

# 24. Visual QA Gate

## 24.1 Evidence levels

Ogni controllo deve essere uno tra:

```text
PASS_EXECUTED
FAIL_EXECUTED
MANUAL_VERIFY
NOT_APPLICABLE
NOT_EXECUTABLE
```

Non usare “PASS” senza evidenza.

## 24.2 Required visual QA checklist

### Foundations

- token use;
- spacing scale;
- type hierarchy;
- radius grammar;
- icon language;
- elevation;
- container/grid.

### Components

- equivalent variants;
- states;
- controls;
- CTA hierarchy;
- inputs;
- badges;
- cards/panels.

### Responsive

- 360;
- 390;
- 430;
- 768;
- representative desktop;
- intermediate width when risk exists;
- no overflow;
- no clipping;
- correct wrapping;
- image crop;
- sticky/fixed.

### Craft

- full-page rhythm;
- alignment;
- grouping;
- density;
- repetition;
- AI slop signals;
- image treatment;
- empty/loading/error polish.

### Accessibility

- focus;
- keyboard;
- contrast;
- zoom;
- reduced motion;
- touch.

### Behavior

- route;
- Back/Forward;
- direct URL;
- overlay behavior;
- async feedback.

---

# 25. UI Quality Gate statuses

Usare stati espliciti:

```text
UI_AUDIT_NOT_STARTED
UI_AUDIT_COMPLETE
UI_REMEDIATION_APPROVED
UI_REMEDIATION_IMPLEMENTED
UI_AUTOMATED_CHECKS_PASS
UI_FUNCTIONAL_BROWSER_QA_PASS
UI_VISUAL_SYSTEM_AUDIT_PASS
UI_VISUAL_CRAFT_QA_PASS
UI_QUALITY_GATE_PASS
```

`UI_QUALITY_GATE_PASS` richiede i gate applicabili precedenti.

Un audit non autorizza remediation.

---

# 26. Project Design System Contract

Ogni nuovo progetto non banale deve definire, direttamente nel repository o nel family kit applicabile, almeno:

```text
1. Identity / art-direction constraints
2. Color primitives and semantic roles
3. Typography scale
4. Spacing scale
5. Container / gutter / grid logic
6. Radius grammar
7. Border grammar
8. Elevation / shadow grammar
9. Icon strategy
10. Component variants
11. Component state expectations
12. Motion language and tokens
13. Image treatment
14. Responsive behavior
15. Exceptions
```

Non è obbligatorio creare un file separato se queste informazioni esistono già in documenti canonici chiaramente identificabili.

### Regola anti-frammentazione

> Non creare documentazione nuova quando una sezione breve in un documento già canonico è sufficiente.

Per una famiglia con `DESIGN.md` completo, il Project Design System Contract può essere una sezione di quel documento.

---

# 27. Template incorporato — Project Design System

```markdown
# <Project> — Design System Contract

## Authority
- Family:
- Plan:
- Approved design source:
- Baseline:
- Exceptions:

## Visual identity
- Desired character:
- Forbidden generic directions:
- Photography / imagery:
- Composition:

## Colors
- Primitive palette:
- Semantic roles:
- Status colors:
- Theme behavior:

## Typography
- Fonts:
- Roles:
- Scale:
- Weights:
- Line-height:
- Measure:

## Spacing
- Base:
- Scale:
- Section rhythm:
- Optical exceptions:

## Layout
- Containers:
- Gutters:
- Grid:
- Full-bleed exceptions:

## Shape
- Radius:
- Borders:
- Elevation:

## Icons
- Primary set:
- Sizes:
- Custom exceptions:

## Motion
- Character:
- Duration scale:
- Easing:
- Reveal:
- Reduced motion:

## Components
- Button variants:
- Inputs:
- Cards/panels:
- Navigation:
- Overlays:
- Project-specific components:

## States
- loading:
- empty:
- error:
- retry:
- offline/timeout where applicable:

## Responsive
- 360:
- 390:
- 430:
- 768:
- desktop:
- special intermediate behavior:

## Exceptions
- <explicit intentional deviation>
```

---

# 28. Surface-specific rules

Il reviewer deve prima classificare la superficie.

## 28.1 `Persuade`

Homepage, landing, vendita.

Priorità:

- hierarchy;
- trust;
- specificity;
- CTA;
- visual differentiation;
- art direction;
- editorial rhythm;
- proof reale;
- no generic landing formula.

AI slop tolerance: bassa.

## 28.2 `Operate`

Dashboard, CRM, gestionale.

Priorità:

- task completion;
- density;
- states;
- data legibility;
- keyboard;
- feedback;
- tables/search/filter;
- predictable system.

Card, badge, tabs e sidebars possono essere corretti se realmente funzionali.

AI slop viene valutato rispetto a efficienza e consistenza, non contro estetica SaaS in sé.

## 28.3 `Read`

Editoriale/documentazione.

Priorità:

- typography;
- measure;
- navigation;
- scan;
- hierarchy;
- reading rhythm;
- anchors;
- content continuity.

## 28.4 `Experience`

Portfolio/immersive.

Priorità:

- art direction;
- motion;
- composition;
- performance;
- accessibility fallback;
- intentional deviations.

Può rompere la griglia più spesso, ma non può rompere usabilità, reduced motion o accesso al contenuto.

---

# 29. Existing-project rollout

TRX-DEC-009 resta obbligatoria.

Per ogni repository esistente:

```text
READ-ONLY INVENTORY
↓
DESIGN SYSTEM EXTRACTION
↓
UI QUALITY AUDIT
↓
FINDING CLASSIFICATION
↓
HUMAN APPROVAL
↓
CONTROLLED REMEDIATION
↓
AUTOMATED CHECKS
↓
FUNCTIONAL QA
↓
VISUAL QA
```

## 29.1 Audit finding schema

Ogni finding:

```text
ID
category
severity
evidence type
route/component
source file(s)
current behavior
expected behavior
root cause
impact
canonical rule
identity to preserve
minimal fix
regression risk
verification
status
```

## 29.2 Classification

```text
CONFIRMED
PROBABLE
POTENTIAL
MANUAL_VERIFY
INTENTIONAL
LEGACY_ACCEPTED
OUT_OF_SCOPE
NOT_APPLICABLE
```

## 29.3 Decision

```text
APPROVED
REJECTED
VERIFY_FIRST
FUTURE
EXCEPTION
```

Nessuna modifica durante il primo audit.

---

# 30. Frozen baselines

Una baseline congelata non viene riaperta automaticamente quando questo standard evolve.

È consentito:

- audit read-only;
- registrare gap;
- valutare rischio;
- usare finding per progetti futuri.

Modifica solo con:

- bug/regression;
- requisito esplicito;
- security/accessibility issue approvata;
- quality rebaseline autorizzata.

Non normalizzare retrofit cosmetici soltanto per aumentare uno score.

---

# 31. New-project workflow

Per un nuovo progetto:

```text
Approved product/family specification
↓
Project Design System Contract
↓
Applicable pattern selection
↓
Implementation
↓
Static conformance check
↓
Functional QA
↓
Visual system audit
↓
Visual craft QA
↓
UI quality gate
```

Il polish non è un “ultimo comando”.

Deve essere incorporato durante l'implementazione e verificato alla fine.

---

# 32. Automatable UI Checks

L'automazione deve cercare **evidenza**, non giudicare gusto.

## 32.1 Static checks candidati

- raw colors fuori token files;
- arbitrary Tailwind values;
- spacing value frequency;
- font-size frequency;
- radius frequency;
- shadow frequency;
- z-index frequency;
- transition duration frequency;
- duplicate component style values;
- token bypass;
- hard-coded viewport offsets;
- missing focus styles in custom interactive elements quando rilevabile;
- image dimensions/aspect declarations;
- component variant duplication.

## 32.2 Runtime/browser checks candidati

- horizontal overflow;
- clipped interactive controls;
- touch target measurement;
- focus visibility;
- scroll lock;
- route reset;
- Back/Forward;
- computed-style comparison;
- element alignment;
- sticky overlap;
- text wrapping;
- zoom;
- reduced motion;
- screenshots.

## 32.3 Human-only / human-led

- premium feel;
- art direction;
- AI slop;
- hierarchy quality;
- optical balance;
- crop quality;
- section rhythm;
- appropriateness;
- brand personality;
- visual restraint.

Un agente può proporre; il gate visuale finale richiede giudizio umano o evidenza review esplicitamente approvata.

---

# 33. Impeccable and external reviewers

Impeccable non è più definito come “la fase che rimuove AI slop”.

Ruolo corretto:

```text
Tretnix UX/UI Quality System
= authority

Impeccable / UX Engine / other reviewer
= optional evidence source

Codex / developer
= implementation

browser/static harness
= objective checks

human reviewer
= final contextual visual judgment
```

### MUST

Un pass di Impeccable non sostituisce:

- spacing audit;
- system extraction;
- full-page visual traversal;
- design token consistency;
- visual craft gate.

Se Impeccable non segnala un difetto, il difetto può comunque esistere.

---

# 34. Ethical UX

## MUST NOT

Usare principi psicologici per:

- manufactured urgency;
- hidden opt-out;
- disguised destructive actions;
- cancellation friction intenzionale;
- dark consent;
- costi nascosti;
- dati visualmente distorti;
- ansia artificiale da incompletezza;
- CTA ingannevoli.

UX psychology può migliorare:

- chiarezza;
- discoverability;
- confidence;
- progress;
- comprehension.

Non manipolazione.

---

# 35. Pattern register — Designmotion → Tretnix

Legenda:

```text
ADOPT_SHARED   = principio incorporato nello standard condiviso
ADAPT_SHARED   = principio condiviso ma valori/forma restano contestuali
CONDITIONAL    = contratto obbligatorio solo se il pattern esiste
REFERENCE_ONLY = utile come riferimento, non normativa
REJECT_GLOBAL  = non trasformare in regola Tretnix trasversale
```

| # | Pattern | Status Tretnix | Area | Regola canonica proposta |
|---:|---|---|---|---|
| 1 | Animation Timing | `ADAPT_SHARED` | Motion | Usare una scala intenzionale di durate; i valori esatti sono default di progetto, non costanti universali. |
| 2 | Charts That Lie | `ADOPT_SHARED` | Data visualization | La rappresentazione non deve distorcere i dati; tipo di grafico, scala e baseline devono essere motivati dal significato del dato. |
| 3 | Date Pickers | `CONDITIONAL` | Forms | Se esiste selezione data/range, definire input, tastiera, mobile, preset, validazione, timezone e stati. |
| 4 | Design System Kit | `ADOPT_SHARED` | Foundations | Ogni progetto deve avere foundations e component rules esplicite; evitare valori visuali inventati ad hoc. |
| 5 | Doherty Threshold | `ADAPT_SHARED` | Feedback | Il sistema deve dare feedback rapido; soglie temporali precise sono euristiche, non gate rigidi. |
| 6 | Drag and Drop | `CONDITIONAL` | Interaction | Se presente, definire affordance, stato di trascinamento, destinazioni, tastiera o alternativa accessibile, errori e annullamento. |
| 7 | Dropdown Design | `CONDITIONAL` | Components | Se presente, definire selezione, focus, tastiera, stato attivo, ricerca quando necessaria, mobile e overflow. |
| 8 | Easing Curves | `ADAPT_SHARED` | Motion | Usare easing coerenti col significato del movimento; evitare curve arbitrarie componente per componente. |
| 9 | Empty States | `ADOPT_SHARED` | States | Distinguere first-run, zero data, zero results, filtro senza risultati, permessi e stato non disponibile. |
| 10 | Error States | `ADOPT_SHARED` | States | L'errore deve spiegare cosa è successo, impatto, recovery e azione successiva quando possibile. |
| 11 | Form Field States | `ADOPT_SHARED` | Forms | Ogni field deve definire gli stati applicabili: default, focus, filled, invalid, disabled, readonly, pending e altri pertinenti. |
| 12 | Golden Ratio | `REFERENCE_ONLY` | Composition | Può essere ispirazione compositiva; non è una legge Tretnix né una misura automatica di qualità o premium feel. |
| 13 | Grid System | `ADAPT_SHARED` | Layout | Ogni progetto deve avere logica di container, gutter e allineamento; il numero di colonne resta contestuale. |
| 14 | Input Masking | `CONDITIONAL` | Forms | Se usato, non deve ostacolare paste, editing, autofill, screen reader o valore canonico. |
| 15 | Loading States System | `ADOPT_SHARED` | States | Scegliere tra immediate feedback, skeleton, progress, optimistic UI e blocking state in base a durata, prevedibilità e rischio. |
| 16 | Navigation Patterns | `CONDITIONAL` | Navigation | La navigazione deriva da IA, superficie e frequenza d'uso; bottom tabs/sidebar non sono default universali Tretnix. |
| 17 | Notification System | `ADOPT_SHARED` | Feedback | Scegliere la superficie di feedback in base a persistenza, severità, necessità di azione e contesto. |
| 18 | Peak-End Rule | `REFERENCE_ONLY` | UX psychology | Utile come lente sul journey; non deve sostituire test, evidenza o qualità distribuita lungo l'intero flusso. |
| 19 | Proximity Rule | `ADOPT_SHARED` | Visual hierarchy | La distanza deve riflettere la relazione semantica; non usare card, bordi o divisori per compensare grouping debole. |
| 20 | Range Sliders | `CONDITIONAL` | Components | Se presenti, definire valore corrente, step, min/max, hit area, tastiera, precisione e alternative quando necessarie. |
| 21 | Search Experience System | `CONDITIONAL` | Search | Se esiste search, trattarla come flusso: query, loading, recenti, risultati, zero-results, errori, keyboard e cancellazione. |
| 22 | Serial Position | `ADAPT_SHARED` | Information hierarchy | Usare ordine e prominenza in modo intenzionale; non applicare formule rigide senza considerare il task. |
| 23 | Shadow Elevation | `ADAPT_SHARED` | Foundations | Le ombre, quando usate, devono derivare da un modello di elevation coerente col brand; evitare box-shadow one-off. |
| 24 | Star Rating | `CONDITIONAL` | Components | Se presente, definire semantica, precisione, input/output, focus, tastiera, touch target e stato readonly. |
| 25 | Stepper Wizard | `CONDITIONAL` | Flows | Usarlo solo quando riduce realmente complessità; definire progress, salvataggio, back, validation e recovery. |
| 26 | Tabs System | `CONDITIONAL` | Navigation | Se presenti, definire semantica, keyboard, selected state, overflow mobile, deep-linking quando utile e contenuto persistente. |
| 27 | Toast Notifications | `CONDITIONAL` | Feedback | Usare toast solo per feedback transitorio non bloccante; non nascondere errori o decisioni importanti in messaggi effimeri. |
| 28 | Toggle Anatomy | `CONDITIONAL` | Components | Definire label, stato, focus, target, feedback e gestione async; optimistic update solo quando rischio e reversibilità lo consentono. |
| 29 | Tooltip Design | `CONDITIONAL` | Components | I tooltip sono supporto secondario, non deposito di informazioni essenziali; devono funzionare con focus e dismiss. |
| 30 | Visual Hierarchy | `ADOPT_SHARED` | Visual quality | Dimensione, peso, contrasto, spacing, posizione e composizione devono esprimere priorità reali, non decorazione casuale. |
| 31 | Z-Index Mastery | `ADOPT_SHARED` | Foundations | Usare livelli/elevation intenzionali; evitare escalation numerica arbitraria e stacking context non compresi. |
| 32 | Zeigarnik Effect | `REFERENCE_ONLY` | UX psychology | Non usare incompletezza deliberata per manipolare; qualsiasi uso deve servire chiarezza o progress reale. |
| 33 | Focus States | `ADOPT_SHARED` | Accessibility | Ogni elemento interattivo deve avere focus percepibile; usare focus-visible e gestire correttamente apertura/chiusura degli overlay. |
| 34 | Swipe Actions | `CONDITIONAL` | Mobile interaction | Se presenti, mantenere discoverability e alternativa accessibile; azioni distruttive richiedono protezioni adeguate. |
| 35 | Undo UX | `ADOPT_SHARED` | Destructive actions | Per azioni reversibili valutare undo/soft-delete prima di conferme invasive; irreversibilità e rischio governano la scelta. |
| 36 | Bottom Sheets | `CONDITIONAL` | Overlays | Usarli su mobile quando preservano contesto e reachability; non sostituiscono automaticamente modal o pagina. |
| 37 | Form Validation Timing | `ADOPT_SHARED` | Forms | Non mostrare errori prematuri mentre l'utente sta ancora completando l'input; dopo errore noto la revalidation può essere più immediata. |
| 38 | Microcopy | `ADOPT_SHARED` | Content UX | Label, CTA, hint, errori e conferme devono descrivere azione, stato o conseguenza con linguaggio specifico. |
| 39 | Optimistic UI | `ADOPT_SHARED` | Async UX | Consentita solo quando probabilità di successo, reversibilità e costo dell'errore sono compatibili; non su operazioni critiche non recuperabili. |
| 40 | Gradient Design | `REFERENCE_ONLY` | Visual style | Tecnica visuale opzionale e brand-specific; gradienti/glow generici sono anche un segnale di AI slop. |
| 41 | Skeleton Loading | `CONDITIONAL` | States | Usare skeleton quando la struttura è prevedibile e l'attesa lo giustifica; altrimenti preferire feedback più semplice. |
| 42 | Color Picker UX | `CONDITIONAL` | Specialized input | Se presente, definire modello colore, contrasto, alpha, keyboard, history/swatches e valore canonico. |
| 43 | File Upload UX | `CONDITIONAL` | Forms | Se presente, definire selezione, drag/drop, progress, errori per file, retry, limiti, preview e sicurezza. |
| 44 | Password Field UX | `CONDITIONAL` | Auth forms | Non ostacolare password manager, paste o autofill; definire reveal, errori e requisiti realmente necessari. |
| 45 | Command Palette | `CONDITIONAL` | Power-user UX | Usarla solo per prodotti densi/power user; deve avere search, keyboard, grouping e azioni non ambigue. |
| 46 | Filter Chips | `CONDITIONAL` | Filtering | Usarli per filtri visibili e gestibili; dataset complessi possono richiedere un sistema più strutturato. |
| 47 | OTP Input | `CONDITIONAL` | Auth forms | Gestire paste/autofill come valore unico, focus progressivo, resend, timeout, errori e accessibilità. |
| 48 | Pagination | `CONDITIONAL` | Data navigation | Scegliere offset/cursor/infinite in base al dato; preservare URL/state e navigazione quando serve. |
| 49 | Accordion Disclosure | `CONDITIONAL` | Disclosure | Usare semantica corretta, aria-expanded, keyboard, stato e motion non bloccante; evitare contenuto essenziale irraggiungibile. |
| 50 | Data Table | `CONDITIONAL` | Data display | Se presente, definire sorting, selection, density, numeric alignment, sticky behavior, overflow, responsive strategy, loading/empty/error. |
| 51 | Card Hover Anatomy | `REFERENCE_ONLY` | Visual style | Hover/lift non è segno automatico di qualità; applicarlo solo se comunica interattività e appartiene al linguaggio del progetto. |
| 52 | Modal Hierarchy | `ADOPT_SHARED` | Overlays | Prima scegliere il livello di interruzione necessario; modal, drawer, popover, sheet e pagina non sono intercambiabili. |
| 53 | Icon Design Rules | `ADAPT_SHARED` | Foundations | Usare un linguaggio iconografico coerente; dimensioni/stroke esatti restano design-system specifici. |
| 54 | Landing Page Skeleton | `REFERENCE_ONLY` | Persuade | È un framework possibile, non una struttura obbligatoria; evitare landing intercambiabili e ripetizione formulaica. |
| 55 | Scroll-Driven Animations | `CONDITIONAL` | Motion | Consentite solo con beneficio reale, performance adeguata, fallback e reduced motion; mai requisito per accedere al contenuto. |
| 56 | Design Tokens | `ADOPT_SHARED` | Foundations | Usare livelli primitive → semantic → component quando il progetto ne beneficia; evitare bypass sistematici dei token. |
| 57 | Color Accessibility | `ADOPT_SHARED` | Accessibility | Il colore non deve essere unico vettore semantico; contrasto e stati devono rimanere comprensibili. |
| 58 | Gestalt Laws | `ADOPT_SHARED` | Composition | Usare proximity, similarity, common region e continuità come principi di grouping, non come formule rigide. |
| 59 | Border Radius | `ADAPT_SHARED` | Foundations | Definire una scala/grammatica coerente; valori e tono restano legati al brand. |
| 60 | Dark Mode | `CONDITIONAL` | Themes | Se previsto, progettare token e stati per entrambi i temi; non limitarsi a invertire colori. |
| 61 | Von Restorff Effect | `REFERENCE_ONLY` | UX psychology | La prominenza può guidare l'attenzione, ma non deve manipolare o creare CTA artificialmente dominanti. |
| 62 | Perfect Card | `REFERENCE_ONLY` | Visual style | Nessun set di padding/radius/shadow rende una card automaticamente premium; valutare necessità e relazione col contenuto. |
| 63 | Depth Layers | `REFERENCE_ONLY` | Visual style | Elevation, parallax e glow sono strumenti opzionali; non devono diventare firma generica o sostituire gerarchia reale. |

---

# 36. Decisioni derivanti dal Blueprint

## 36.1 Adottare

Dal Blueprint:

- semantic colors;
- type scale intenzionale;
- spacing scale;
- component states;
- icon consistency;
- motion vocabulary;
- design-system checklist.

## 36.2 Adattare

Non adottare come valori globali obbligatori:

- palette esempio;
- type scale esatta;
- 4px come vincolo matematico assoluto;
- 12 colonne sempre;
- stroke icon 2px sempre;
- 24×24 sempre;
- timing 100/200/300/400/500 come legge;
- un solo icon set senza eccezioni.

## 36.3 Colmare gap non coperti dal Blueprint

Tretnix mantiene o aggiunge:

- mobile-first;
- route/history;
- full-page visual QA;
- safe area;
- zoom;
- reduced motion;
- long/localized copy;
- source precedence;
- controlled changes;
- security;
- baseline freeze;
- anti-AI-slop;
- human visual gate;
- project identity preservation.

---

# 37. Anti-fragmentation rule for the Knowledge repository

Questa formalizzazione deve produrre il minor numero di fonti normative possibile.

## Struttura target raccomandata

### Nuovo file canonico unico

```text
UX_UI_QUALITY_SYSTEM.md
```

Contiene:

- foundations;
- visual quality;
- states;
- interaction;
- pattern register;
- AI slop;
- QA;
- rollout;
- project design-system template.

### Aggiornamenti minimi

```text
DECISIONS.md
DEVELOPMENT_STANDARDS.md
README.md
compiled/CHATGPT_PROJECT_INSTRUCTIONS.md
compiled/CODEX_GLOBAL_AGENTS.md
compiled/CURSOR_USER_RULES.md
compiled/LOVABLE_WORKSPACE_KNOWLEDGE.md
SOURCE_ARTIFACT_REGISTER.md   # provenance only
```

Nessun file separato per ogni pattern.

Nessuna directory con 63 documenti.

Creare una skill dedicata soltanto dopo che la procedura di audit è stata provata su progetti reali, in coerenza col Master Context.

---

# 38. Governance

L'autorità di questo documento deriva da `TRX-DEC-034`.

Le modifiche future a questo sistema DEVONO:

- preservare `TRX-DEC-008`, quindi qualità condivisa senza appiattire l'identità cliente;
- rispettare `TRX-DEC-009` sui repository esistenti;
- scegliere fonti e pattern secondo `TRX-DEC-010`;
- non dichiarare verifiche non eseguite secondo `TRX-DEC-013`;
- usare un solo writer e review read-only secondo il workflow Tretnix;
- usare il Controlled Change Package quando previsto da `TRX-DEC-032`;
- evitare frammentazione documentale non necessaria.

## 38.1 Adapter

Gli adapter ChatGPT, Codex, Cursor e Lovable devono ricevere soltanto una sintesi operativa di questo sistema.

La fonte completa resta:

```text
UX_UI_QUALITY_SYSTEM.md
```

Non duplicare integralmente il documento negli adapter.

## 38.2 Skill future

Non creare una skill UX/UI dedicata finché la procedura non è stata provata su almeno:

- una superficie `Persuade`;
- una superficie `Operate`.

Dopo i pilot, una skill può essere formalizzata solo se riduce lavoro ripetitivo senza introdurre una seconda fonte di verità.

---

# 39. Acceptance criteria del sistema

Il sistema è considerato applicabile quando:

1. spacing ha regole e audit verificabili;
2. typography ha scala e criteri di coerenza;
3. token discipline è formalizzata;
4. component states sono formalizzati;
5. feedback e overlay hierarchy sono formalizzati;
6. pattern specializzati sono `CONDITIONAL`;
7. AI slop ha signal IDs espliciti;
8. visual QA è distinto da functional QA;
9. full-page traversal è richiesto quando pertinente;
10. automated evidence e human judgment sono distinti;
11. identità cliente è protetta;
12. baseline frozen sono protette;
13. repository esistenti restano read-only-first;
14. external reviewers non sono single point of failure;
15. gli adapter restano sintetici.

---

# 40. Definition of success

Il sistema ha successo se, su un progetto reale, un reviewer non può più chiudere il task dicendo soltanto:

```text
no overflow
build passes
keyboard works
```

Deve anche poter dimostrare:

```text
spacing belongs to a coherent system
typography belongs to a coherent hierarchy
repeated components are actually consistent
full-page rhythm was inspected
AI-slop signals were evaluated
visual exceptions are intentional
project identity was preserved
```

La qualità visuale diventa quindi un requisito verificabile Tretnix, non una speranza affidata al comando di polish di un tool esterno.
