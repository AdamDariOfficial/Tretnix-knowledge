# Tretnix Decision Log

**Versione:** 1.10
**Aggiornato:** 13 agosto 2026

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
- Forno Lume BUSINESS è stato il repository Hospitality successivo a START per audit e remediation controllata.
- Dopo i Package A, B, B2 e C, i pattern BUSINESS elencati in `TRX-DEC-020` sono approvati; il Package D e le funzionalità future restano separati e non automaticamente canonici.
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

---

## TRX-DEC-020 — Contratto Hospitality e fonti canoniche per pattern

**Stato:** approvata
**Data:** 25 luglio 2026
**Sostituisce parzialmente:** le conseguenze temporanee di `TRX-DEC-018` relative allo stato candidato di BUSINESS
**Ambito:** famiglia Hospitality Tretnix
**Repository interessati:** `forno-lume-START`, `forno-lume-BUSINESS` e futuri repository Hospitality correlati

### Contesto

Forno Lume START definisce l’identità e il comportamento percepito della famiglia. Forno Lume BUSINESS ha completato i Package A, B, B2 e C, introducendo implementazioni tecniche più robuste senza alterare involontariamente l’esperienza approvata.

### Decisione

La fonte canonica viene assegnata per singolo pattern:

- START è canonico per identità visuale, tipografia, palette, qualità responsive, navbar percepita, drawer e FAQ percepiti, interazioni, motion e reveal editoriali;
- BUSINESS, sulla baseline `15a8bf4de41bc1657a79f58699859a015ee7820d`, è canonico per i pattern già chiusi relativi ad accessibilità di drawer e lightbox, routing e history, ordine editoriale mobile, fallback runtime, 404, policy demo, JSON-LD generico e attribuzione footer.

Il contratto Hospitality richiede parità visuale e interattiva percepita con START, consentendo miglioramenti tecnici in accessibilità, routing, lifecycle, focus management, reduced motion, componentizzazione, type safety, error handling e metadata.

### Motivazione

Una repository può essere la migliore fonte visuale mentre un’altra contiene l’implementazione tecnica più robusta. Separare i ruoli evita sia regressioni visive sia la copia di limiti tecnici.

### Conseguenze

- Non copiare automaticamente l’intera implementazione di START.
- Non modificare in BUSINESS identità, ritmo o motion percepita senza requisito approvato.
- Preservare testo prima dell’immagine nelle sezioni editoriali mobile.
- Preservare route reset immediato, history restoration, direct URL e refresh.
- Preservare Reveal nel viewport e reduced motion.
- Preservare focus trap, Escape, inertness, scroll lock e focus return nei dialog.
- Il Package D rimane separato e non è autorizzato dal completamento del Package C.

### Fonte operativa

I dettagli verificati sono documentati in `HOSPITALITY_FAMILY.md`.

---

## TRX-DEC-021 — Policy delle demo: noindex e structured data non commerciale

**Stato:** approvata
**Data:** 25 luglio 2026
**Ambito:** demo pubbliche Tretnix che non rappresentano attività reali, a partire dalla famiglia Forno Lume

### Contesto

Le demo Tretnix devono essere consultabili da clienti e visitatori, ma non devono essere interpretate dai motori di ricerca come aziende, sedi, offerte o attività locali reali.

### Decisione

Le demo pubbliche non reali devono:

- emettere `noindex, follow` su tutte le route pubbliche;
- permettere al crawler di leggere il meta `noindex`;
- evitare sitemap destinate a pubblicizzare route demo non indicizzabili;
- non pubblicare `Restaurant`, `LocalBusiness`, `Organization` commerciale fittizia o altri schemi commerciali con dati non verificati;
- non pubblicare indirizzi, coordinate, telefono, orari, prezzi, offerte, recensioni, rating, prenotazioni o menu fittizi come dati strutturati;
- non usare `FAQPage`, `Menu`, `MenuSection` o `MenuItem` per cercare rich result;
- usare soltanto markup generico e non ingannevole, quando utile.

Sono consentiti:

- `WebSite`;
- `WebPage`;
- `AboutPage`;
- `CollectionPage`;
- `ContactPage`.

### Motivazione

Il markup strutturato deve descrivere entità reali e verificabili. Presentare una demo come attività commerciale reale sarebbe ingannevole e danneggerebbe qualità, affidabilità e indicizzazione.

### Conseguenze

- Il JSON-LD deve essere route-aware, deterministico e privo di duplicazioni.
- Gli `@id`, URL, nomi e description devono essere coerenti con la route e il dominio reale della demo.
- La serializzazione deve essere sicura.
- Un futuro cliente può abilitare una entità commerciale soltanto con dati reali, verificati, approvati e senza placeholder.
- Non promettere rich result per tipi generici.

### Fonte operativa

La mappatura Hospitality e i dati vietati sono documentati in `HOSPITALITY_FAMILY.md`.

---

## TRX-DEC-022 — Snapshot canonico e patch verificabile per modifiche esterne

**Stato:** approvata
**Data:** 26 luglio 2026
**Ambito:** tutti i repository Tretnix e gli handoff tra chat, agenti o ambienti differenti

### Contesto

Una patch preparata da una copia presunta, incompleta o non allineata può applicarsi al repository sbagliato, sovrascrivere decisioni più recenti o produrre un diff tecnicamente valido ma semanticamente obsoleto.

Questo rischio aumenta quando chi prepara la modifica non opera direttamente nel working tree canonico verificato.

### Decisione

Quando una modifica multi-file, documentale o strutturale viene preparata fuori dal working tree canonico, la baseline DEVE essere acquisita da un commit esatto e pulito tramite `git archive`.

Il checkpoint minimo comprende:

- repository e branch sorgente;
- hash completo del commit;
- working tree pulito;
- archivio generato direttamente da `HEAD`;
- perimetro approvato della modifica.

Comando di riferimento:

```text
git archive --format=zip --output="<repository>-<short-hash>.zip" HEAD
```

La modifica viene preparata su una copia isolata dell’archivio e consegnata come:

- patch applicabile;
- report dei file modificati e dei controlli realmente eseguiti;
- facoltativamente, ZIP completo risultante come riferimento non canonico.

Prima della consegna, la patch DEVE essere verificata su una seconda estrazione pulita della stessa baseline mediante:

- `git apply --check`;
- applicazione effettiva della patch;
- controllo whitespace del diff;
- confronto del set di file modificati;
- confronto tra albero validato e albero preparato.

Nel repository reale, l’applicazione resta manuale e controllata: diff non staged, staging esplicito, diff cached, commit, push, pull request e merge avvengono come passaggi separati.

### Motivazione

Lo snapshot rende la baseline immutabile e identificabile. La seconda applicazione dimostra che la patch non dipende accidentalmente dall’ambiente in cui è stata generata.

Separare applicazione, staging, commit, push e merge conserva il controllo umano e limita gli errori di perimetro.

### Conseguenze

- Non generare patch riutilizzabili da allegati storici o copie non verificate.
- Non assumere che il nome di un file o una conversazione identifichi l’HEAD corrente.
- Preservare la policy dei line ending del repository; nei repository CRLF usare controlli compatibili come `core.whitespace=cr-at-eol` quando necessario.
- Dichiarare separatamente controlli documentali, test applicativi, build, browser check e verifiche di deployment.
- La validazione della patch non sostituisce i test richiesti dal repository modificato.
- La produzione di una patch non autorizza staging, commit, push, pull request, merge o deploy.
- Gli artefatti derivati non diventano fonte canonica finché la modifica non viene integrata nel repository ufficiale.

### Applicabilità

Il workflow è obbligatorio quando:

- la patch viene preparata fuori dal working tree verificato dell’utente;
- il lavoro passa tra chat, agenti o ambienti differenti;
- la baseline esatta è essenziale;
- la modifica interessa più file o documenti canonici.

Una correzione minima eseguita direttamente in un working tree pulito e controllato può evitare l’archive, ma mantiene branch dedicata, diff review, verifiche e approvazione umana.

---

## TRX-DEC-023 — Cancellazione delle chat soltanto dopo formalizzazione verificata

**Stato:** approvata
**Data:** 26 luglio 2026
**Ambito:** tutte le chat, gli handoff e gli allegati Tretnix

### Contesto

Le chat possono contenere decisioni, specifiche, stato, task e allegati che non esistono ancora in una fonte versionata. Cancellarle prima della migrazione può rendere impossibile ricostruire il lavoro.

### Decisione

Una chat Tretnix può essere cancellata soltanto dopo aver trasferito e verificato ogni informazione rilevante nella destinazione canonica appropriata.

Il gate minimo comprende:

- decisioni registrate;
- specifiche integrali versionate;
- stato corrente registrato;
- task e bug trasferiti alle issue o alla roadmap;
- repository, branch e commit identificati;
- allegati essenziali acquisiti o archiviati con checksum;
- adattatori degli strumenti sincronizzati;
- handoff completo;
- prova che una nuova sessione possa ricostruire correttamente il lavoro dai file.

### Conseguenze

- Archiviare, invece di cancellare, quando rimane un artefatto non acquisito.
- Non usare la memory del modello come sostituto della repository.
- Non conservare branch, PR, bug e gate momentanei nella memory permanente.
- Usare `CHAT_RETENTION_AND_HANDOFF.md` come procedura operativa.
- Usare `SOURCE_ARTIFACT_REGISTER.md` per allegati e pacchetti.

---

## TRX-DEC-024 — Lifecycle esplicito e distinzione tra preparazione e autorizzazione

**Stato:** approvata
**Data:** 26 luglio 2026
**Ambito:** tutti i verticali e progetti Tretnix

### Decisione

Ogni progetto deve usare stati espliciti e non ambigui. In particolare:

```text
PREPARATION_COMPLETE
```

non significa:

```text
IMPLEMENTATION_AUTHORIZED
```

Un progetto in `IMPLEMENTATION_NOT_STARTED` non deve essere descritto come costruito, pubblicato o dotato di repository se tali risorse non esistono.

### Conseguenze

- Ogni transizione registra fonte, data e gate.
- Le risorse remote non vengono create per anticipare una possibile autorizzazione.
- `REPOSITORY_INDEX.md` separa repository attuali e progetti pianificati.
- `PORTFOLIO_AND_VERTICALS.md` contiene il lifecycle condiviso.

---

## TRX-DEC-025 — Gate Lovable per RITO Studio START

**Stato:** approvata
**Data:** 26 luglio 2026
**Ambito:** Beauty & Wellness e `RITO Studio START`

### Contesto

La preparazione di `RITO Studio START` è completa, ma l’implementazione non è iniziata.

### Decisione

Prima di qualsiasi chiamata a Lovable devono essere presenti entrambi i gate:

1. conferma esplicita che l’abbonamento Lovable è attivo;
2. autorizzazione esplicita ad avviare `RITO Studio START`.

Finché manca un gate è vietato:

- creare il progetto Lovable;
- consumare crediti;
- creare o modificare repository remote per il progetto;
- pubblicare;
- iniziare BUSINESS;
- reinterpretare o ridisegnare fuori dalla specifica Beauty & Wellness v1.1.

### Conseguenze

- Il development pack può essere letto e consolidato offline.
- Nessun agente deduce l’autorizzazione da conversazioni precedenti o dallo stato `PREPARATION_COMPLETE`.
- Il primo task autorizzato deve citare versione della specifica, gate, criteri di accettazione, verifiche e checkpoint.

---

## TRX-DEC-026 — Registrare i progetti pianificati senza inventare repository o deploy

**Stato:** approvata
**Data:** 26 luglio 2026
**Ambito:** inventario, portfolio, comunicazione e report

### Decisione

Un progetto pianificato può essere registrato con nome, verticale, piano, stato e gate, ma non deve ricevere URL, repository, deploy, branch, commit o verifiche inventati.

### Conseguenze

- `RITO Studio START` resta nella sezione dei progetti pianificati finché la repository non esiste.
- Professional Services e Home & Local Services non ricevono specifiche ricostruite senza i file sorgente.
- I report distinguono `VR`, `VD`, `HR` e `NV` come definito in `CURRENT_STATE.md`.

---

## TRX-DEC-027 — Raccomandazione del modello prima di ogni incarico Codex

**Stato:** approvata
**Data:** 26 luglio 2026
**Ambito:** task Codex Tretnix

### Decisione

Prima di ogni incarico Codex, ChatGPT deve indicare:

- il modello consigliato tra quelli effettivamente disponibili;
- la motivazione rispetto a complessità, profondità di analisi, rischio e costo;
- eventuali limiti o alternativa.

Il nome di un modello non viene fissato permanentemente nei documenti canonici, perché disponibilità e capacità possono cambiare.

### Conseguenze

- Il task registra la raccomandazione e la data.
- La scelta del modello non sostituisce specifica, scope, verifiche o review.
- Un modello più potente non autorizza autonomia, accessi o operazioni più ampie.

---

## TRX-DEC-028 — Stato trasversale sintetico, stato locale dettagliato

**Stato:** approvata
**Data:** 26 luglio 2026
**Ambito:** knowledge repository e repository di progetto

### Decisione

`CURRENT_STATE.md` può conservare uno snapshot trasversale sintetico necessario al coordinamento, con data e livello di evidenza.

Lo stato dettagliato, la cronologia, i task e i bug restano nel repository del progetto, nelle issue, nelle pull request e nei commit.

### Conseguenze

- Non trasformare `CURRENT_STATE.md` in un diario completo.
- Aggiornare o rimuovere gli stati superati.
- Usare Git per la cronologia.
- Non elevare un handoff riportato a fatto verificato senza evidenza tecnica.

---

## TRX-DEC-029 — Specifiche complete dei verticali come family kit versionati

**Stato:** approvata
**Data:** 26 luglio 2026
**Ambito:** Beauty & Wellness, Professional Services, Home & Local Services e futuri verticali

### Contesto

Riepiloghi trasversali e chat non sono sufficienti a ricostruire copy, design, route, motion, testing, prompt e checklist di una famiglia.

### Decisione

Le specifiche complete approvate vengono conservate in directory versionate sotto:

```text
family-kits/<family>-v<version>/
```

Ogni family kit deve mantenere almeno:

- manifest;
- README;
- prodotto;
- design;
- contenuti;
- route;
- animazioni;
- testing;
- decisioni locali;
- stato e approvazione;
- contratto START → BUSINESS;
- prompt;
- checklist.

I documenti `*_FAMILY.md` alla root restano indici e contratti di governance. Non duplicano integralmente il kit.

### Conseguenze

- Gli agenti leggono il family kit applicabile prima di implementare.
- Una nuova versione usa una directory distinta o una modifica versionata esplicita.
- I prompt versionati non costituiscono autorizzazione automatica all'esecuzione.
- Le decisioni trasversali prevalgono sulle copie locali obsolete.
- Un progetto cliente copia nel proprio repository soltanto il contesto necessario e approvato.

---

## TRX-DEC-030 — Conservazione estratta degli artefatti e separazione degli snapshot storici

**Stato:** approvata
**Data:** 26 luglio 2026
**Ambito:** pacchetti, handoff, ZIP e snapshot Tretnix

### Decisione

Quando un archivio contiene documenti leggibili già estratti e versionabili:

- conservare checksum e manifest dell'archivio originale;
- versionare i contenuti testuali necessari;
- non duplicare automaticamente ZIP binari ridondanti nel repository;
- conservare almeno una copia offline dell'originale;
- isolare gli snapshot storici in `source-artifacts/`;
- marcare chiaramente che gli snapshot storici non sono fonti canoniche correnti.

### Motivazione

Questo mantiene provenienza e auditabilità senza creare fonti concorrenti o gonfiare il repository con copie binarie dello stesso contenuto.

### Conseguenze

- `SOURCE_ARTIFACT_REGISTER.md` registra origine, nome logico, SHA-256, contenuti importati e file non duplicati.
- Le specifiche attive vengono spostate in `family-kits/` e gli handoff operativi in `operations/`.
- Gli agenti non devono leggere `historical-source-of-truth/` come baseline corrente.
- La cancellazione delle chat resta subordinata al merge e alla prova di ricostruzione.

---

## TRX-DEC-031 — Visibilità pubblica temporanea della knowledge repository

**Stato:** approvata
**Data:** 26 luglio 2026
**Ambito:** repository `Tretnix-knowledge`, audit e accessi degli strumenti

### Contesto

Durante il completamento dell’audit multi-repository e del consolidamento documentale, l’accesso pubblico consente agli strumenti autorizzati di leggere la knowledge repository e le altre repository pubbliche senza dipendere da integrazioni private non ancora verificate.

La visibilità pubblica non deve essere interpretata come destinazione permanente né come autorizzazione a pubblicare informazioni riservate.

### Decisione

`Tretnix-knowledge` rimane pubblica durante il ciclo corrente di audit, consolidamento, verifica degli accessi e ricostruzione senza chat.

Il passaggio a privata avviene soltanto quando:

1. il ciclo corrente è dichiarato completo con evidenza;
2. le patch e gli audit necessari sono stati revisionati e uniti;
3. è stata verificata l’assenza di dipendenze operative da URL raw pubblici;
4. ChatGPT, Cursor, Codex, Lovable e gli altri strumenti necessari dispongono di un metodo di accesso approvato;
5. il proprietario conferma esplicitamente il cambio di visibilità.

Finché la repository è pubblica è vietato versionare:

- credenziali, token, cookie, chiavi o file di ambiente;
- dati personali non necessari;
- dati cliente riservati;
- accessi di produzione;
- screenshot, log o export contenenti informazioni sensibili;
- materiale commerciale confidenziale non destinato alla pubblicazione.

### Conseguenze

- `README.md`, `REPOSITORY_INDEX.md` e `CURRENT_STATE.md` distinguono visibilità corrente e visibilità successiva.
- Nessun agente deve rendere privata la repository automaticamente.
- Prima del cambio di visibilità deve essere eseguito un controllo delle dipendenze di accesso.
- Una futura scelta di mantenerla pubblica in modo permanente richiede una nuova decisione esplicita.
- La pubblicità temporanea non riduce i requisiti di branch, review, validazione e protezione dei dati.


---

## TRX-DEC-032 — Pacchetti controllati per applicazione e validazione

**Stato:** approvata
**Data:** 27 luglio 2026
**Ambito:** repository Tretnix e modifiche multi-repository

### Contesto

Durante il ciclo Impeccable su Tretnix, Forno Lume START e Forno Lume BUSINESS, i pacchetti PowerShell separati `Apply` e `Validate` hanno protetto le baseline, rilevato stati inattesi, consentito riprese sicure e prodotto evidenza completa dei controlli.

### Decisione

Per modifiche non banali preparate fuori dal working tree canonico, Tretnix adotta il **Controlled Change Package**:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\Apply-<TaskName>.ps1
.\Validate-<TaskName>.ps1
```

Lo script `Apply` verifica repository, remote, branch, commit, working tree, allowlist e hash; applica soltanto i file approvati ed è idempotente.

Lo script `Validate` esegue i comandi già definiti dal repository, conserva log ed exit code, gestisce soltanto file generati pre-approvati e distingue i gate automatici dai controlli manuali.

Entrambi gli script non possono eseguire automaticamente stage, commit, push, pull request, merge, deploy o migrazioni database. Browser, backend, staging e produzione restano gate umani separati.

La procedura canonica vive in:

```text
skills/CONTROLLED_CHANGE_PACKAGE.md
```

### Conseguenze

- ChatGPT può preparare un pacchetto soltanto per uno scope approvato e una baseline identificabile.
- Il pacchetto deve includere manifest, hash, allowlist, esclusioni e istruzioni di ripresa.
- I comandi repository-specifici restano l’autorità per typecheck, lint, test e build.
- Un formatter globale non viene usato per nascondere errori lint senza approvazione esplicita.
- Una modifica piccola in un working tree verificato può continuare a usare il normale workflow di branch e diff.
- Il successo dei controlli automatici non autorizza implicitamente commit, push, migrazione o deploy.

---

## TRX-DEC-033 — Avvio parallelo controllato di RITO Studio START

**Stato:** approvata
**Data:** 27 luglio 2026
**Ambito:** famiglia Beauty & Wellness e chiusura Tretnix/Hospitality

### Contesto

Tretnix, Forno Lume START e Forno Lume BUSINESS hanno superato i controlli automatici dell'ultimo ciclo Impeccable, ma restano browser QA conclusivo, checkpoint Git finali e gate separati di staging o deploy.

Per ridurre i tempi senza perdere controllo, il lavoro sulla seconda famiglia può iniziare in una corsia separata, purché non interrompa la chiusura dei progetti già in corso e non anticipi piani non autorizzati.

### Decisione

RITO Studio START può entrare in preparazione e implementazione controllata in parallelo alla chiusura finale di Tretnix e Hospitality.

L'avvio effettivo del progetto Lovable e il consumo intenzionale di crediti richiedono ancora:

1. conferma esplicita che l'abbonamento Lovable sia attivo;
2. verifica del workspace corretto e del saldo iniziale;
3. un comando esplicito dell'utente per iniziare l'implementazione;
4. repository o procedura di sincronizzazione START definita.

Il parallelismo è limitato a **RITO Studio START**. RITO Studio BUSINESS e BUSINESS PLUS rimangono bloccati fino a un gate separato successivo alla stabilizzazione di START.

Il lavoro deve usare repository, branch, chat e writer separati. Nessun agente può modificare in parallelo gli stessi file usati da un altro strumento senza coordinamento.

### Vincoli

- La chiusura di Tretnix e Hospitality resta obbligatoria e non viene sostituita.
- Beauty & Wellness conserva identità, copy, palette, tipografia e motion distinti da Hospitality.
- START resta statico e one-page, senza backend, autenticazione o booking nativo.
- Non usare dati reali di clienti.
- Non pubblicare, deployare, collegare domini o attivare infrastruttura di produzione senza autorizzazione esplicita.
- La presenza di prompt e Project Knowledge non costituisce autorizzazione automatica all'esecuzione.
- Le modifiche non banali preparate fuori dal working tree seguono il Controlled Change Package.

### Conseguenze

- È autorizzata la preparazione del Project Knowledge, del bootstrap repository e degli input di implementazione START.
- L'abbonamento può essere attivato quando il proprietario decide di iniziare il mese operativo.
- Il gate operativo viene registrato in `family-kits/beauty-wellness-v1.1/docs/STATUS.md`.
- BUSINESS e BUSINESS PLUS non devono essere creati o sviluppati in questa fase.

---

## TRX-DEC-034 — UX/UI Quality System come standard trasversale

**Stato:** approvata
**Data:** 13 agosto 2026
**Ambito:** tutti i progetti Tretnix

### Contesto

I cicli di polish precedenti hanno dimostrato che correttezza tecnica, responsive e accessibilità non garantiscono da soli spacing coerente, gerarchia visuale, consistenza dei componenti o assenza di AI slop.

In particolare, un reviewer esterno può non rilevare difetti percettivi reali se tali difetti non sono descritti da un contratto Tretnix sufficientemente preciso e verificabile.

### Decisione

Adottare [`UX_UI_QUALITY_SYSTEM.md`](./UX_UI_QUALITY_SYSTEM.md) come standard condiviso per:

- foundations e disciplina del design system;
- visual consistency e precisione;
- spacing, typography, alignment, token e component states;
- interaction, feedback e overlay hierarchy;
- pattern specializzati applicabili;
- segnali contestuali di AI slop;
- visual QA e full-page traversal;
- distinzione tra correttezza, consistenza e craft.

Il sistema distingue `MUST`, `SHOULD`, `CONDITIONAL`, `SIGNAL` e `REFERENCE_ONLY`.

La qualità condivisa NON autorizza l'appiattimento dell'identità cliente. Palette, font, art direction, composizione, fotografia, densità e personalità restano specifiche quando intenzionali.

Impeccable, UX Engine o altri reviewer esterni possono produrre evidenza e finding, ma non sostituiscono lo standard Tretnix né il gate visuale.

### Conseguenze

- I nuovi progetti non banali definiscono un Project Design System Contract, anche come sezione di documentazione già esistente.
- I repository esistenti passano prima da audit read-only secondo `TRX-DEC-009`.
- Le baseline congelate non vengono riaperte automaticamente.
- Il polish visuale viene distinto dal solo functional/browser QA.
- Spacing e valori visuali ripetuti devono essere valutabili rispetto a scale e token intenzionali.
- Gli adapter degli strumenti ricevono una sintesi, non una copia integrale del documento.
- Non creare 63 documenti separati per i pattern: il registro resta consolidato nel documento canonico.
- Una skill UX/UI dedicata verrà valutata solo dopo pilot reali su superfici `Persuade` e `Operate`.
