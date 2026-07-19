# Tretnix Decision Log

**Versione:** 1.2
**Aggiornato:** 20 luglio 2026

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

## TRX-DEC-004 — Navigazione tra route, anchor e scroll

**Stato:** approvata
**Data:** 13 luglio 2026
**Aggiornata:** 20 luglio 2026
**Ambito:** applicazioni e siti multipagina
**Repository interessati:** tutti i repository con routing o navigazione a sezioni

### Contesto

Reset di route, anchor intenzionali e ripristino della posizione nella history rispondono a intenzioni diverse. Una gestione globale usata per mascherare un difetto può rompere direct URL, refresh, back e forward.

### Decisione

Quando si apre una nuova route, la pagina deve partire dall’alto con reset immediato.

Non usare smooth scroll per il reset della route.

La navigazione intenzionale verso un anchor nella stessa pagina può usare smooth scroll. Un link a una sezione in un’altra route deve prima completare la navigazione e il mount della destinazione, poi raggiungere la sezione prevista.

### Motivazione

Lo smooth scroll può mostrare movimenti indesiderati, attivare reveal prematuramente e rendere la navigazione incoerente.

### Conseguenze

- Direct URL, refresh, back e forward restano comportamenti obbligatori da preservare e verificare.
- Il reset di una nuova route non definisce il comportamento degli anchor intenzionali.
- La destinazione cross-route non deve dipendere da timing fragili.

### Guida all’implementazione

- Distinguere nuova route, anchor same-page e anchor cross-route.
- Per i link cross-route, trasportare l’intento della sezione e applicarlo quando la destinazione è disponibile.
- Gestire header, focus e offset senza valori hard-coded fragili.
- Verificare accesso diretto all’URL con hash quando supportato.

### Esclusioni e limitazioni

- Non disabilitare globalmente la scroll restoration del browser per nascondere un difetto di routing.
- Non usare smooth scroll per il reset di una nuova route.
- La strategia tecnica dipende dal router del repository e deve essere verificata localmente.

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
**Aggiornata:** 20 luglio 2026
**Ambito:** progetti cliente attuali e futuri
**Repository interessati:** tutti i siti e prodotti pubblici destinati ai clienti

### Contesto

La firma Tretnix deve sostenere riconoscibilità e acquisizione senza confondersi con il brand del cliente. Il collegamento esterno deve essere percepibile, sicuro, accessibile e coerente tra i progetti.

### Decisione

Inserire nel footer una firma discreta:

> Progettato e sviluppato da Tretnix

con collegamento a:

```text
https://tretnix.com
```

Salvo diversa approvazione esplicita del design, è sufficiente collegare la sola parola “Tretnix”. Il collegamento apre in una nuova scheda con `target="_blank"` e `rel="noopener noreferrer"` e comunica in modo accessibile tale comportamento.

### Motivazione

L’attribuzione rafforza portfolio, riconoscibilità e acquisizione senza compromettere il brand del cliente.

### Conseguenze

- La firma non è opzionale.
- Il link deve essere chiaramente percepibile come interattivo, pur restando discreto.
- L’interazione deve preservare la visibilità del focus da tastiera.
- La firma non deve dominare il footer e deve adattarsi all’identità del progetto.

### Guida all’implementazione

- Mantenere esattamente il testo visibile “Progettato e sviluppato da Tretnix”.
- Collegare “Tretnix” a `https://tretnix.com`, salvo diversa approvazione del design.
- Includere un’indicazione accessibile che il link apre una nuova scheda.
- È approvata un’icona esterna sobria, come `ArrowUpRight`.
- Nascondere alle tecnologie assistive le icone puramente decorative.

### Esclusioni e limitazioni

- Non trasformare l’attribuzione in un elemento dominante rispetto all’identità del cliente.
- Non rimuovere l’attribuzione perché assente da una singola implementazione precedente.
- Non sostituire il testo approvato senza una decisione esplicita.

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
---

## TRX-DEC-015 — Codex come agente operativo principale sul repository

**Stato:** approvata
**Data:** 17 luglio 2026
**Ambito:** sistema operativo Tretnix

### Decisione

Codex viene introdotto come agente operativo principale per il lavoro controllato sul repository.

Ruoli aggiornati:

```text
ChatGPT = strategia, specifiche, coordinamento e controllo qualità
Lovable = costruzione rapida visuale e full-stack
GitHub = fonte ufficiale e checkpoint
Cursor = IDE e superficie di controllo umano
Codex = analisi, implementazione, validazione e lavoro sul repository
Claude Code = revisore o specialista opzionale
```

Questa decisione amplia `TRX-DEC-011` e sostituisce la composizione iniziale indicata in `TRX-DEC-012`.

### Motivazione

Cursor Agent ha mostrato utilità, ma i limiti di utilizzo non devono bloccare il piano. Codex è disponibile nell'IDE, nel terminale, nell'app e in cloud, legge `AGENTS.md` e può lavorare sullo stesso repository mantenendo GitHub come fonte verificabile.

### Conseguenze

- Codex viene testato su Forno Lume START.
- Cursor rimane l'ambiente di supervisione, non la fonte della verità.
- Lovable mantiene il ruolo visuale e full-stack quando disponibile.
- Claude Code non viene introdotto finché non emerge un bisogno concreto.
- L'adozione non autorizza autonomia illimitata o accessi di produzione.

---

## TRX-DEC-016 — Un solo writer e handoff tramite checkpoint

**Stato:** approvata
**Data:** 17 luglio 2026
**Ambito:** tutti i task eseguiti con agenti

### Decisione

Un solo agente o sviluppatore modifica gli stessi file alla volta.

Ogni handoff tra ChatGPT, Lovable, Cursor Agent, Codex, Claude Code o altri strumenti deve avvenire tramite un checkpoint identificabile:

- branch;
- commit;
- diff;
- pull request;
- report riferito a commit e working tree.

### Motivazione

Agenti concorrenti possono sovrascrivere file, duplicare dipendenze, introdurre stili incompatibili e rendere difficile attribuire una regressione.

### Conseguenze

- Non avviare due writer sullo stesso working tree.
- Terminare una fase prima di iniziare la revisione successiva.
- Il nuovo agente deve conoscere commit base, task, diff e controlli eseguiti.
- GitHub rimane il meccanismo ufficiale di handoff.

---

## TRX-DEC-017 — Revisione iniziale in sola lettura e decisione umana

**Stato:** approvata
**Data:** 17 luglio 2026
**Ambito:** revisioni di diff, audit post-implementazione e seconda opinione

### Decisione

Il revisore deve iniziare in sola lettura e non correggere automaticamente il lavoro dell'autore.

Ogni finding viene classificato e sottoposto a decisione umana:

```text
APPROVATO
RIFIUTATO
DA VERIFICARE
FUORI PERIMETRO
MIGLIORAMENTO FUTURO
```

Solo i finding approvati diventano un task di modifica.

### Motivazione

Una seconda opinione non è una prova tecnica. Due agenti possono condividere la stessa assunzione errata o preferire implementazioni diverse senza che quella esistente sia difettosa.

### Conseguenze

- Separare autore e revisore.
- Richiedere evidenze da codice, esecuzione o browser.
- Rifiutare claim non supportati.
- Evitare che una review produca scope creep.
- Eseguire nuovamente i controlli dopo le correzioni approvate.

---

## TRX-DEC-018 — Chiusura e ruolo canonico di Forno Lume START

**Stato:** approvata
**Data:** 20 luglio 2026
**Ambito:** famiglia Hospitality Tretnix
**Repository interessati:** `forno-lume-START`, `forno-lume-BUSINESS` e futuri repository Hospitality correlati

### Contesto

Forno Lume START ha completato audit, remediation, chiusura tecnica, verifica in produzione da parte del proprietario del progetto e documentazione. La baseline sorgente autorevole della chiusura è `d15f639267dfdd57194536154abfa1d0ff3b4542`.

### Decisione

Forno Lume START è completato, rimediato, tecnicamente chiuso, verificato in produzione, documentato e congelato.

È il riferimento canonico approvato per:

- qualità visuale Hospitality;
- qualità di tipografia e palette Hospitality;
- struttura premium single-page START;
- qualità responsive;
- comportamento percepito della navbar;
- sobrietà delle interazioni;
- linguaggio del movimento;
- reveal editoriali sotto la fold.

Ulteriori modifiche sorgente richiedono un bug confermato, una regressione confermata, un problema di sicurezza o un requisito di prodotto approvato esplicitamente.

### Motivazione

Il ciclo di chiusura ha trasformato START da riferimento visuale iniziale a baseline verificata per gli aspetti elencati. Congelare la sorgente protegge tale baseline e impedisce che backlog o pulizie opzionali riaprano il progetto senza una necessità approvata.

### Conseguenze

- Il backlog residuo non autorizza implementazione.
- Forno Lume BUSINESS è il prossimo repository Hospitality attivo per audit.
- BUSINESS resta soltanto candidato per routing multipagina, gallerie e lightbox e funzionalità di piano superiore finché il proprio audit e la propria remediation non sono completi.
- I confronti futuri devono riferirsi alla baseline di chiusura identificata.

### Guida all’implementazione

- Preservare in BUSINESS e nei piani correlati i comportamenti percepiti assegnati canonicamente a START.
- Valutare separatamente l’implementazione tecnica di ogni pattern prima di trasferirla.
- Trattare gli elementi di backlog come contesto non bloccante, non come scope approvato.
- Documentare qualsiasi futura riapertura con causa confermata e task esplicito.

### Esclusioni e limitazioni

START non è automaticamente canonico per:

- architettura di routing multipagina;
- gallerie e lightbox;
- funzionalità BUSINESS o BUSINESS PLUS;
- sistemi amministrativi;
- autenticazione e autorizzazione;
- architettura backend;
- database e storage.

Questi ambiti devono essere valutati indipendentemente nel repository pertinente.

---

## TRX-DEC-019 — Granularità del motion editoriale

**Stato:** approvata
**Data:** 20 luglio 2026
**Ambito:** siti e interfacce Tretnix con motion editoriale
**Repository interessati:** tutti i repository di siti e prodotti cliente con animazioni

### Contesto

Animare container strutturali estesi come blocchi unici rende le pagine pesanti, indebolisce l’ordine di lettura e favorisce la copia meccanica di una stessa soluzione tra identità differenti. La granularità deve sostenere il contenuto e il carattere del cliente.

### Decisione

- I container strutturali di layout normalmente restano statici.
- Si animano elementi editoriali semantici o piccoli gruppi significativi.
- Intere sezioni estese non vengono animate come un unico blocco pesante.
- Uno stagger breve e controllato è ammesso soltanto quando migliora l’ordine di lettura.
- I reveal iniziano quando il contenuto entra nel viewport.
- Con reduced motion il contenuto resta visibile.
- Hero, gallerie e componenti visual-first approvati possono usare un trattamento distinto e documentato.
- Tempi e trattamento preservano la personalità visuale del cliente invece di essere copiati meccanicamente tra progetti.

### Motivazione

Il motion deve accompagnare comprensione, ritmo editoriale e qualità percepita senza ritardare o nascondere il contenuto.

### Conseguenze

- La struttura della pagina non dipende dall’animazione.
- I pattern condivisi definiscono principi e comportamento, non timing universali.
- `prefers-reduced-motion` resta un requisito funzionale e non un miglioramento opzionale.
- Questa decisione amplia `TRX-DEC-005` e applica al motion il principio di identità preservata di `TRX-DEC-008`.

### Guida all’implementazione

- Scegliere il più piccolo elemento semantico che esprime il reveal previsto.
- Limitare numero, distanza, durata e stagger delle transizioni.
- Documentare trattamenti distinti per hero, gallerie o componenti visual-first.
- Verificare viewport entry, contenuto iniziale, reduced motion, responsive e assenza di flash.

### Esclusioni e limitazioni

- Non esiste un timing unico obbligatorio per tutti i clienti.
- Le eccezioni visual-first non autorizzano animazioni invasive o contenuto inaccessibile.
- La decisione non impone una libreria o una specifica tecnica di animazione.
