# Tretnix Decision Log

**Versione:** 1.0  
**Aggiornato:** 16 luglio 2026

Questo file contiene decisioni approvate. Non contiene proposte, task o bug.

Ogni decisione rimane valida finché non viene sostituita esplicitamente da una nuova decisione.

---

## TRX-DEC-001 — Comunicazione pubblica degli strumenti interni

**Stato:** approvata  
**Data:** 13 luglio 2026  
**Ambito:** tutti i progetti e la comunicazione Tretnix

### Decisione

Nei contenuti pubblici, nei siti dei clienti e nella comunicazione commerciale non presentare ChatGPT, Lovable, Cursor, Claude Code o altri strumenti come sviluppatori o autori del prodotto.

La formulazione di riferimento è:

> Tretnix progetta e sviluppa questi sistemi software.

### Motivazione

Gli strumenti fanno parte del processo interno. Il valore pubblico è la progettazione, la responsabilità, la verifica e la consegna di Tretnix.

### Conseguenze

- Nessun badge “made with AI”.
- Nessun copy che descriva il software come generato automaticamente.
- Le documentazioni tecniche private possono citare gli strumenti quando utile.

---

## TRX-DEC-002 — GitHub come fonte tecnica ufficiale

**Stato:** approvata  
**Data:** 16 luglio 2026  
**Ambito:** tutti i progetti

### Decisione

GitHub conserva la versione ufficiale del codice, della documentazione e delle decisioni versionate.

Le chat non sono la fonte definitiva.

### Motivazione

Le conversazioni possono essere incomplete, non sincronizzate o difficili da verificare. GitHub offre cronologia, diff, branch e ripristino.

### Conseguenze

- Le decisioni importanti devono essere documentate.
- I task temporanei devono vivere in issue o roadmap.
- Le modifiche devono essere revisionabili tramite diff.

---

## TRX-DEC-003 — Ordine editoriale mobile

**Stato:** approvata  
**Data:** 13 luglio 2026  
**Ambito:** siti Tretnix e progetti cliente

### Decisione

Nelle sezioni editoriali su mobile:

```text
testo
immagine
```

### Eccezioni

- hero;
- gallerie;
- componenti realmente visual-first documentati.

### Motivazione

L’alternanza immagine/testo su schermi piccoli crea un flusso di lettura incoerente.

### Conseguenze

- Il desktop può mantenere composizioni alternate.
- Non duplicare markup soltanto per cambiare ordine.
- Preservare semantica e focus order.

---

## TRX-DEC-004 — Reset dello scroll al cambio route

**Stato:** approvata  
**Data:** 13 luglio 2026  
**Ambito:** applicazioni e siti multipagina

### Decisione

Quando si apre una nuova route, la pagina deve partire dall’alto con reset immediato.

Non usare smooth scroll per il reset della route.

### Motivazione

Lo smooth scroll può mostrare movimenti indesiderati, attivare reveal prematuramente e rendere la navigazione incoerente.

### Conseguenze

- I link interni alla stessa pagina possono usare un comportamento diverso.
- Back e forward devono essere verificati separatamente.
- Non distruggere la history restoration corretta senza analisi.

---

## TRX-DEC-005 — Reveal sotto la fold

**Stato:** approvata  
**Data:** 13 luglio 2026  
**Ambito:** siti con animazioni di ingresso

### Decisione

I reveal sotto la fold devono iniziare quando l’elemento entra nel viewport.

Devono evitare:

- animazione già conclusa;
- flash;
- contenuto permanentemente invisibile;
- attivazione durante un reset di route non percepito.

### Motivazione

L’animazione deve accompagnare la lettura reale.

### Conseguenze

- Gestire correttamente observer e stato iniziale.
- Rispettare `prefers-reduced-motion`.
- Il contenuto deve essere disponibile anche senza animazione.

---

## TRX-DEC-006 — Attribuzione Tretnix

**Stato:** approvata  
**Data:** 13 luglio 2026  
**Ambito:** progetti cliente attuali e futuri

### Decisione

Inserire nel footer una firma discreta:

> Progettato e sviluppato da Tretnix

con collegamento a:

```text
https://tretnix.com
```

### Motivazione

L’attribuzione rafforza portfolio, riconoscibilità e acquisizione senza compromettere il brand del cliente.

### Conseguenze

- La firma deve essere accessibile.
- Non deve dominare il footer.
- Deve adattarsi all’identità del progetto.

---

## TRX-DEC-007 — Evoluzione START → BUSINESS

**Stato:** approvata  
**Data:** 11 luglio 2026  
**Ambito:** famiglie di template Tretnix

### Decisione

Il piano BUSINESS deriva dal progetto START approvato.

Deve preservare:

- identità;
- palette;
- tipografia;
- linguaggio di animazione;
- immagini e trattamento visivo;
- ritmo;
- dettagli approvati.

Deve espandere:

- architettura informativa;
- route;
- contenuti;
- SEO;
- navigazione;
- funzionalità.

### Motivazione

Il piano superiore rappresenta un’evoluzione, non un prodotto visivamente estraneo.

### Conseguenze

- Non ridisegnare da zero.
- Non sostituire il carattere del progetto con estetica SaaS generica.
- Le correzioni tecniche possono essere trasferite tra i piani dopo verifica.

---

## TRX-DEC-008 — Standard tecnici condivisi, identità cliente preservata

**Stato:** approvata  
**Data:** 16 luglio 2026  
**Ambito:** tutti i repository

### Decisione

Uniformare:

- qualità del codice;
- sicurezza;
- routing;
- scroll;
- responsive;
- accessibilità;
- gestione delle animazioni;
- documentazione;
- test;
- processo di verifica;
- attribuzione Tretnix.

Preservare quando intenzionali:

- palette;
- font;
- tono;
- brand;
- composizione;
- trattamento fotografico;
- personalità.

### Motivazione

Un design system tecnico non deve rendere tutti i clienti visivamente uguali.

---

## TRX-DEC-009 — Audit in sola lettura prima delle correzioni trasversali

**Stato:** approvata  
**Data:** 16 luglio 2026  
**Ambito:** repository esistenti

### Decisione

Il primo passaggio su un repository esistente è un audit in sola lettura.

Prima di applicare correzioni trasversali:

1. inventariare;
2. mappare;
3. classificare;
4. confrontare;
5. identificare la fonte canonica del pattern;
6. definire il piano prioritario.

### Motivazione

Modificare subito può introdurre regressioni e uniformare pattern sbagliati.

### Conseguenze

- Nessuna correzione durante il primo audit.
- Le vulnerabilità critiche vengono segnalate immediatamente, ma la correzione passa comunque attraverso un intervento controllato.
- Analizzare una repository e una categoria alla volta quando si passa all’implementazione.

---

## TRX-DEC-010 — Fonte canonica scelta per pattern

**Stato:** approvata  
**Data:** 16 luglio 2026  
**Ambito:** confronto tra repository

### Decisione

Non dichiarare un’intera repository canonica per ogni aspetto.

La fonte canonica viene scelta per singolo pattern.

### Motivazione

Un progetto può essere eccellente visivamente ma avere un’implementazione tecnica migliorabile.

### Conseguenze

Per ogni pattern registrare:

- candidati;
- differenze;
- fonte proposta;
- motivazione;
- qualità tecnica;
- comportamento da preservare;
- correzioni necessarie;
- livello di confidenza.

---

## TRX-DEC-011 — Ruoli distinti degli strumenti

**Stato:** approvata  
**Data:** 16 luglio 2026  
**Ambito:** sistema operativo Tretnix

### Decisione

Assegnare ruoli distinti:

```text
ChatGPT = strategia, specifiche e coordinamento
Lovable = costruzione rapida visuale e full-stack
GitHub = fonte ufficiale
Cursor = ambiente tecnico quotidiano
Claude Code = specialista opzionale
```

### Motivazione

Nessun singolo strumento deve possedere tutto il processo o tutta la conoscenza.

---

## TRX-DEC-012 — Adozione graduale degli strumenti

**Stato:** approvata  
**Data:** 16 luglio 2026  
**Ambito:** processo interno

### Decisione

La prima integrazione usa:

```text
ChatGPT + Lovable + GitHub + Cursor
```

Claude Code, MCP, automazioni e subagenti vengono introdotti soltanto dopo aver verificato un bisogno reale.

### Motivazione

Automatizzare o complicare un processo non ancora stabile moltiplica gli errori.

---

## TRX-DEC-013 — Controlli dichiarati solo se realmente eseguiti

**Stato:** approvata  
**Data:** 16 luglio 2026  
**Ambito:** tutti i report tecnici

### Decisione

Non dichiarare che typecheck, lint, test, build, audit o verifiche browser sono riusciti se non sono stati realmente eseguiti.

### Conseguenze

Ogni report deve distinguere:

- eseguito e superato;
- eseguito e fallito;
- non disponibile;
- non eseguibile nell’ambiente;
- ancora da verificare manualmente.

---

## TRX-DEC-014 — Sicurezza backend non sostituibile dal frontend

**Stato:** approvata  
**Data:** 16 luglio 2026  
**Ambito:** Supabase, Lovable Cloud e backend futuri

### Decisione

Controlli frontend, route guard e visibilità UI non sostituiscono autorizzazione backend e RLS.

Non indebolire RLS soltanto per eliminare un errore nel frontend.

### Motivazione

Il client è controllabile dall’utente e non costituisce un confine di sicurezza.

### Conseguenze

- Le modifiche allo schema passano tramite migrazioni.
- Ruoli e accesso ai dati vengono verificati lato backend.
- Le policy vengono testate per utenti anonimi, autenticati e amministratori.
