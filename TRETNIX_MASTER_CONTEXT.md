# Tretnix Master Context

**Versione:** 1.2
**Aggiornato:** 20 luglio 2026
**Stato:** canonico

---

## 1. Identità di Tretnix

Tretnix è uno studio software boutique orientato a:

- attività locali;
- professionisti;
- microimprese;
- piccole e medie imprese;
- clienti B2B che richiedono una soluzione digitale curata e personalizzata.

Tretnix progetta e sviluppa:

- siti web;
- landing page;
- siti multipagina;
- gestionali;
- dashboard;
- CRM;
- web application;
- sistemi software personalizzati;
- automazioni e strumenti digitali su misura.

### Posizionamento

Il posizionamento deve rimanere:

- premium;
- boutique;
- elegante;
- minimale;
- professionale;
- affidabile;
- chiaro;
- personalizzato.

Tretnix non deve apparire come:

- una web agency economica;
- un servizio generico basato su template senza personalizzazione;
- un prodotto SaaS indistinto;
- un brand crypto, broker o forex;
- un’attività che vende semplicemente “siti fatti dall’intelligenza artificiale”.

### Comunicazione pubblica

Nei siti, nei materiali commerciali e nei prodotti per i clienti la formulazione corretta è:

> Tretnix progetta e sviluppa questi sistemi software.

ChatGPT, Lovable, Cursor, Codex, Claude Code e altri strumenti sono strumenti interni di produzione. Non sono presentati pubblicamente come autori del lavoro.

---

## 2. Obiettivo del sistema operativo di sviluppo

Tretnix deve costruire un processo di sviluppo:

- efficiente;
- controllabile;
- documentato;
- scalabile;
- ripetibile;
- versionato;
- indipendente da un singolo fornitore;
- adatto a progetti reali per clienti.

Il sistema deve evitare il puro “vibe coding” non controllato.

Il risultato desiderato è una pipeline nella quale:

1. un’esigenza viene trasformata in una specifica;
2. i vincoli sono espliciti;
3. il progetto conserva regole e decisioni;
4. gli strumenti conoscono il proprio ruolo;
5. il codice rimane su GitHub;
6. i diff vengono revisionati;
7. build e test vengono eseguiti realmente;
8. le modifiche non richieste vengono evitate;
9. i rischi vengono dichiarati;
10. lo stato e i task non vengono confusi con la conoscenza permanente.

---

## 3. Metodo di lavoro del fondatore

Il fondatore di Tretnix ha esperienza di sviluppo tradizionale e attualmente utilizza soprattutto:

- Lovable;
- GitHub;
- specifiche dettagliate;
- controllo visuale;
- test manuali;
- debugging iterativo assistito.

L’obiettivo non è tornare necessariamente a scrivere manualmente ogni riga, ma aumentare il controllo tecnico:

- capire quali file vengono modificati;
- leggere i diff;
- distinguere sintomi e cause;
- evitare patch fragili;
- mantenere progetti complessi;
- recuperare progressivamente familiarità con il codice;
- non dipendere completamente da Lovable;
- verificare realmente il risultato.

L’introduzione di nuovi strumenti deve quindi essere graduale, concreta e comprensibile.

---

## 4. Ruolo degli strumenti

### ChatGPT — strategia e coordinamento

ChatGPT viene usato per:

- strategia;
- organizzazione aziendale;
- offerte e pricing;
- brief cliente;
- specifiche;
- criteri di accettazione;
- UX e copy;
- preparazione dei prompt;
- revisione dei report;
- documentazione;
- confronto tra alternative;
- coordinamento del processo.

ChatGPT non sostituisce il repository, i test o la revisione del codice.

### Lovable — costruzione rapida

Lovable viene usato per:

- prima costruzione visuale e funzionale;
- pagine;
- componenti;
- responsive;
- animazioni;
- collegamento iniziale a Lovable Cloud o Supabase;
- prototipi;
- iterazioni rapide;
- evoluzione di siti e webapp sulla base di specifiche.

Lovable non deve essere autorizzato a reinterpretare liberamente requisiti, identità o sicurezza.

### GitHub — fonte ufficiale

GitHub conserva:

- codice;
- cronologia;
- branch;
- pull request;
- issue;
- documentazione;
- decisioni;
- release;
- ripristino in caso di errore.

GitHub è la memoria tecnica verificabile.

### Cursor — ambiente tecnico e controllo umano

Cursor è:

- IDE principale;
- ambiente per aprire e leggere i repository;
- terminale;
- superficie per Git e diff;
- ambiente per verifiche locali;
- punto di controllo nel quale il fondatore approva o rifiuta modifiche.

Cursor non coincide con l'agente che esegue il task. Può ospitare Cursor Agent o l'estensione Codex, ma la responsabilità umana rimane separata.

### Codex — agente operativo sul repository

Codex viene adottato come agente principale per:

- comprendere repository esistenti;
- implementare task circoscritti;
- modificare più file mantenendo il contesto;
- eseguire comandi disponibili;
- aggiungere o aggiornare test quando approvato;
- controllare il diff;
- preparare una pull request;
- lavorare localmente nell'IDE o in un ambiente cloud isolato.

Codex deve leggere l’`AGENTS.md` globale e quello del repository. Non lavora direttamente su `main`, non usa credenziali di produzione non necessarie e non opera contemporaneamente sugli stessi file insieme a un altro agente.

### Claude Code — specialista opzionale

Claude Code verrà valutato dopo il pilot operativo con Codex.

Possibili impieghi:

- audit profondi;
- sicurezza;
- Supabase e RLS;
- migrazioni;
- refactoring estesi;
- revisione indipendente;
- automazioni da terminale.

Non deve essere acquistato o introdotto soltanto per duplicare ciò che Codex e il workflow attuale svolgono adeguatamente.

### Supabase / Lovable Cloud — backend

Rappresentano:

- database;
- autenticazione;
- autorizzazione;
- storage;
- trigger;
- funzioni;
- Row Level Security;
- dati applicativi.

Nessun agente deve indebolire il backend solo per eliminare un errore visibile nel frontend.

---

## 5. Pipeline operativa

### Flusso locale controllato

```text
Cliente o idea
↓
ChatGPT
↓
Brief, specifica, vincoli e criteri di accettazione
↓
GitHub
↓
Branch e checkpoint iniziale
↓
Cursor
↓
Controllo umano del repository
↓
Codex
↓
Analisi o prima implementazione
↓
Diff o commit verificabile
↓
Revisione in sola lettura
↓
Decisione umana sui finding
↓
Codex o intervento manuale per le sole correzioni approvate
↓
Typecheck, lint, test, build e browser
↓
Pull request
↓
QA
↓
Produzione
```

### Flusso con Lovable

```text
ChatGPT
↓
Specifica approvata
↓
Lovable
↓
Costruzione o iterazione visuale
↓
GitHub
↓
Checkpoint
↓
Cursor + Codex
↓
Consolidamento tecnico e validazione
↓
Revisione indipendente quando necessaria
↓
Pull request
```

Claude Code può essere inserito come revisore specialistico dopo un checkpoint, non come secondo autore contemporaneo.

Flusso vietato:

```text
Richiesta del cliente
↓
Agente modifica direttamente la produzione
↓
Deploy senza revisione
```

---

## 6. Modello della conoscenza

### Memory

Ricorda informazioni sintetiche e stabili:

- identità;
- obiettivi generali;
- preferenze di lavoro;
- strumenti principali.

Non contiene bug, task, schemi completi o cronologie estese.

### Knowledge

Descrive ciò che è attualmente valido:

- servizi;
- offerte;
- architetture;
- design system;
- standard;
- struttura dei progetti.

### Instructions

Stabiliscono le regole obbligatorie:

- mobile-first;
- niente modifiche estranee;
- sicurezza;
- controllo dei diff;
- test realmente eseguiti;
- niente riferimenti pubblici agli strumenti interni.

### Skills

Descrivono procedure ricorrenti:

- audit;
- bug fix;
- nuova pagina;
- responsive review;
- pre-deploy;
- RLS review;
- START → BUSINESS.

Le skill devono derivare da procedure già provate, non essere create in massa prima dell’uso reale.

### Decisions

Registrano una scelta approvata e il motivo.

### Status

Descrive lo stato corrente di un progetto.

### Tasks

Descrivono ciò che deve ancora essere fatto.

Status e task appartengono ai repository o al project tracking, non alla memory permanente.

---

## 7. Fonte unica della verità

La fonte canonica trasversale è:

```text
tretnix-knowledge
```

Ogni repository di progetto dovrà progressivamente contenere soltanto il contesto locale:

```text
AGENTS.md
.cursor/
.codex/        # solo quando serve configurazione condivisa verificata
.claude/       # solo se Claude Code viene realmente adottato
docs/
```

`AGENTS.md` è il punto di ingresso comune per Codex e per gli altri agenti compatibili. Non creare file duplicati con le stesse regole senza una necessità reale.

La separazione prevista è:

```text
tretnix-knowledge
= identità, standard e procedure condivise

repository del progetto
= prodotto, architettura, design, sicurezza e stato specifici

GitHub Issues
= task e bug operativi
```

### Precedenza

1. decisioni approvate;
2. standard condivisi;
3. documenti specifici del progetto;
4. specifica del task;
5. codice e deploy verificati;
6. conversazioni da formalizzare.

---

## 8. Modello delle offerte e dei progetti

Tretnix utilizza livelli di offerta:

- START;
- BUSINESS;
- BUSINESS PLUS;
- CUSTOM;
- INTERNO.

Il primo verticale concreto è Food & Hospitality.

### Principio di evoluzione

Un progetto di piano superiore non deve necessariamente essere ridisegnato da zero.

Nel caso della famiglia Forno Lume:

```text
Forno Lume START
↓
Forno Lume BUSINESS
↓
futuro Forno Lume BUSINESS PLUS
```

START definisce il linguaggio visuale e di interazione approvato. BUSINESS espande architettura informativa, route, contenuti e funzionalità, ma i relativi pattern tecnici restano candidati fino al completamento del proprio audit e della propria remediation.

---

## 9. Progetti canonici iniziali

### Tretnix.com

Ruolo:

- sito istituzionale;
- riferimento per il brand Tretnix;
- esperienza premium e boutique;
- riferimento per componenti istituzionali;
- area amministrativa;
- gestione contatti.

Stato dichiarato:

- completato e in produzione;
- restano revisioni di dettaglio su SEO, aspetti legali e colori;
- richiede audit tecnico e di sicurezza prima di essere considerato riferimento tecnico generale.

Aree note da controllare:

- navbar;
- scroll-spy;
- navigazione cross-route;
- autenticazione;
- ruoli;
- admin;
- analytics;
- contact requests;
- accessibilità;
- SEO;
- sicurezza Supabase.

### Forno Lume START

Ruolo:

- riferimento canonico per la qualità visuale Hospitality;
- riferimento canonico per tipografia e palette Hospitality;
- riferimento canonico per la struttura premium single-page START;
- riferimento canonico per qualità responsive e comportamento percepito della navbar;
- riferimento canonico per sobrietà delle interazioni, linguaggio del movimento e reveal editoriali sotto la fold.

Stato verificato:

- completato;
- rimediato;
- tecnicamente chiuso sulla baseline sorgente `d15f639267dfdd57194536154abfa1d0ff3b4542`;
- verificato in produzione dal proprietario del progetto;
- documentato;
- congelato.

Ulteriori modifiche sorgente richiedono:

- un bug confermato;
- una regressione confermata;
- un problema di sicurezza;
- un requisito di prodotto approvato esplicitamente.

La presenza di elementi nel backlog non autorizza pulizia opzionale o nuove modifiche.

Il ruolo canonico non si estende automaticamente a routing multipagina, gallerie e lightbox, funzionalità BUSINESS o BUSINESS PLUS, sistemi amministrativi, autenticazione, autorizzazione, backend, database o storage. Questi ambiti devono essere valutati nel repository pertinente.

### Forno Lume BUSINESS

Ruolo:

- evoluzione multipagina di START;
- espansione della famiglia Hospitality;
- riferimento candidato per l’architettura multipagina.

Stato dichiarato:

- deployato;
- prossimo repository Hospitality attivo per audit;
- deve essere confrontato sistematicamente con START;
- è soltanto candidato per routing multipagina, gallerie e lightbox e funzionalità di piano superiore;
- nessun suo pattern è approvato come canonico prima del completamento di audit e remediation;
- può contenere regressioni introdotte durante l’espansione.

Route previste:

- `/`;
- `/menu`;
- `/chi-siamo`;
- `/galleria`;
- `/contatti`;
- `/privacy`;
- `/cookie`;
- pagina 404.

Aree da controllare:

- conservazione dell’identità;
- animazioni mancanti o alterate;
- route reset;
- navbar;
- configurazione centralizzata;
- SEO multipagina;
- lightbox `100dvh`;
- ordine editoriale mobile;
- direct URL;
- refresh;
- back e forward;
- regressioni.

---

## 10. Principio di uniformazione

Non uniformare indiscriminatamente l’identità visiva dei clienti.

### Da uniformare

- qualità del codice;
- sicurezza;
- routing;
- scroll;
- accessibilità;
- responsive;
- trattamento delle animazioni;
- documentazione;
- test;
- verifica;
- attribuzione Tretnix;
- gestione degli errori;
- processo Git;
- standard Supabase.

### Da preservare quando intenzionale

- palette;
- font;
- tono;
- brand;
- composizione;
- trattamento fotografico;
- personalità del cliente;
- ritmo visuale specifico.

Una differenza stilistica intenzionale non è automaticamente un’incoerenza tecnica.

---

## 11. Fonti canoniche per pattern

Una repository non diventa necessariamente canonica per ogni aspetto.

Un pattern deve essere scelto considerando:

1. decisioni già approvate;
2. ruolo del progetto;
3. qualità tecnica;
4. comportamento nel deploy;
5. accessibilità;
6. responsive;
7. assenza di regressioni;
8. riutilizzabilità;
9. manutenzione;
10. coerenza commerciale.

Esempi iniziali:

| Pattern | Candidato iniziale |
|---|---|
| Brand istituzionale | `tretnix` |
| Qualità visuale, tipografia e palette Hospitality | `forno-lume-START` |
| Struttura premium single-page START | `forno-lume-START` |
| Responsive, navbar percepita, interazioni, motion e reveal Hospitality | `forno-lume-START` |
| Architettura multipagina Hospitality | `forno-lume-BUSINESS`, candidato da auditare |
| Gallerie, lightbox e funzionalità di piano superiore | `forno-lume-BUSINESS`, candidato da auditare |
| Evoluzione START → BUSINESS | confronto tra START e BUSINESS |
| Sicurezza Supabase | da determinare tramite audit |
| Standard tecnici generali | da estrarre dopo il confronto |

L’approvazione di un pattern percepito non rende automaticamente canonica ogni scelta implementativa interna del repository sorgente.

---

## 12. Formato standard dei task

Ogni task tecnico deve contenere:

1. contesto;
2. obiettivo;
3. vincoli;
4. criteri di accettazione;
5. verifiche obbligatorie;
6. output richiesto.

Esempio sintetico:

```text
Context:
Forno Lume BUSINESS deriva da Forno Lume START.

Objective:
Correggere l’ordine delle sezioni editoriali su mobile.

Constraints:
Non modificare copy, desktop, hero o gallery.
Non duplicare markup soltanto per cambiare ordine.

Acceptance criteria:
Testo prima dell’immagine sotto 768px.
Nessun overflow.
Desktop invariato.

Verification:
Typecheck, lint, build e controllo delle sezioni correlate.

Output:
Causa, file modificati, implementazione, verifiche e rischi.
```

Prompt vaghi come “sistemami il sito” o “migliora il responsive” non sono accettabili.

---

## 13. Metodo operativo degli agenti

### Analisi

1. leggere i file rilevanti;
2. tracciare il comportamento;
3. identificare la causa;
4. cercare lo stesso pattern altrove;
5. valutare l’impatto;
6. proporre un piano;
7. indicare i file coinvolti.

### Implementazione

1. applicare la soluzione più piccola ma completa;
2. evitare modifiche non richieste;
3. preservare il comportamento corretto;
4. mantenere type safety;
5. non aggiungere dipendenze inutili;
6. aggiornare test e documenti pertinenti.

### Verifica

1. controllare il diff;
2. eseguire typecheck;
3. eseguire lint;
4. eseguire test;
5. eseguire build;
6. controllare browser, console e rete;
7. verificare responsive;
8. verificare direct URL, refresh, back e forward;
9. controllare edge case;
10. dichiarare ciò che non è stato possibile verificare.

### Report

1. causa;
2. implementazione;
3. file modificati;
4. controlli eseguiti;
5. risultati;
6. rischi;
7. test manuali rimanenti.

---

## 14. Piano di adozione

### Fase 1 — Fondamenta

Stato: completata.

- pubblicare `tretnix-knowledge`;
- configurare ChatGPT;
- introdurre Cursor;
- aggiungere foundation e regole al progetto pilota.

### Fase 2 — Audit del progetto pilota

Stato: audit statico e controllo qualità completati.

- auditare `forno-lume-START` in sola lettura;
- correggere severità ed evidenze del report;
- mantenere separati bug confermati, rischi, scelte intenzionali e controlli mancanti.

### Fase 3 — Introduzione di Codex

Stato: approvata.

- installare Codex nell'ambiente Cursor o usare l'app;
- configurare le istruzioni globali;
- verificare che Codex legga `AGENTS.md`;
- usare Forno Lume START per il primo intervento controllato;
- mantenere un solo writer;
- revisionare il diff prima delle correzioni successive.

### Fase 4 — Primo intervento controllato

Stato: completata su Forno Lume START.

- task e remediation approvati completati;
- chiusura tecnica verificata sulla baseline `d15f639267dfdd57194536154abfa1d0ff3b4542`;
- produzione verificata dal proprietario del progetto;
- repository documentato e congelato.

### Fase 5 — Consolidamento

Stato: attiva.

- auditare `forno-lume-BUSINESS` come prossimo repository Hospitality;
- confrontare BUSINESS con la baseline canonica START;
- trasformare procedure verificate in skill;
- auditare Tretnix.com;
- estrarre standard confermati;
- configurare Lovable quando disponibile.

### Fase 6 — Specializzazione

- valutare Claude Code quando emerge un bisogno concreto;
- aggiungere RLS review;
- aggiungere pre-deploy;
- valutare test browser, Codex Cloud e automazioni dopo aver stabilizzato il processo.

## 15. Priorità corrente

La priorità attuale è:

1. mantenere Forno Lume START chiuso e congelato salvo bug, regressioni, sicurezza o requisiti di prodotto approvati;
2. auditare Forno Lume BUSINESS come prossimo repository Hospitality attivo;
3. confrontare BUSINESS con i soli pattern canonici assegnati a START;
4. valutare indipendentemente routing multipagina, gallerie, lightbox e funzionalità di piano superiore;
5. approvare pattern BUSINESS soltanto dopo audit, remediation e verifiche;
6. proseguire il consolidamento delle procedure Tretnix già verificate.

---

## 16. Non obiettivi della fase iniziale

Non sono priorità immediate:

- collegare molti MCP;
- acquistare ogni strumento disponibile senza un ruolo e un bisogno verificato;
- creare numerosi subagenti;
- automatizzare i deploy;
- consentire scrittura sul database di produzione;
- uniformare tutti i siti visivamente;
- riscrivere repository già funzionanti;
- creare decine di skill teoriche;
- introdurre processi Git eccessivamente complessi.

La complessità deve essere aggiunta solo quando risolve un problema reale.
