# Tretnix Master Context

**Versione:** 1.0  
**Aggiornato:** 16 luglio 2026  
**Stato:** canonico iniziale

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

ChatGPT, Lovable, Cursor, Claude Code e altri strumenti sono strumenti interni di produzione. Non sono presentati pubblicamente come autori del lavoro.

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

### Cursor — ambiente tecnico quotidiano

Cursor è lo strumento aggiuntivo da introdurre per primo.

Deve diventare:

- IDE principale;
- ambiente per aprire e leggere i repository;
- terminale;
- strumento di audit;
- supporto al debugging;
- revisore dei diff;
- ambiente per typecheck, lint, test e build;
- ponte tra Lovable e un processo Git più professionale.

Nella prima fase Cursor non deve essere usato come agente completamente autonomo.

### Claude Code — specialista opzionale

Claude Code verrà valutato dopo l’adozione di Cursor.

Possibili impieghi:

- audit profondi;
- sicurezza;
- Supabase e RLS;
- migrazioni;
- refactoring estesi;
- revisione indipendente;
- automazioni da terminale.

Non deve essere acquistato o introdotto soltanto per duplicare ciò che Cursor già svolge adeguatamente.

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

```text
Cliente o idea
↓
ChatGPT
↓
Brief, specifica, vincoli e criteri di accettazione
↓
Lovable
↓
Prima costruzione visuale e funzionale
↓
GitHub
↓
Repository ufficiale
↓
Cursor
↓
Analisi, consolidamento, debugging, test e build
↓
Claude Code, soltanto quando necessario
↓
Revisione indipendente o intervento specialistico
↓
Pull request
↓
Revisione del diff
↓
Staging
↓
QA
↓
Produzione
```

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
CLAUDE.md
.cursor/
.claude/
docs/
```

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

START definisce il linguaggio visuale e di interazione. BUSINESS espande architettura informativa, route, contenuti e funzionalità.

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

- riferimento canonico Hospitality START;
- fonte iniziale per identità visuale;
- tipografia;
- palette;
- navbar;
- animazioni;
- reveal;
- responsive;
- interazioni.

Stato dichiarato:

- completato;
- deployato;
- deve diventare una base tecnica pulita per i piani superiori.

Aree da controllare:

- architettura;
- componenti;
- navbar hide/show;
- route e scroll;
- responsive;
- overflow;
- ordine mobile;
- animazioni;
- accessibilità;
- SEO;
- duplicazioni;
- test;
- build;
- preparazione alla duplicazione.

### Forno Lume BUSINESS

Ruolo:

- evoluzione multipagina di START;
- espansione della famiglia Hospitality;
- riferimento candidato per l’architettura multipagina.

Stato dichiarato:

- deployato;
- deve essere confrontato sistematicamente con START;
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
| Identità Hospitality | `forno-lume-START` |
| Animazioni Hospitality | `forno-lume-START`, previa verifica |
| Architettura multipagina Hospitality | `forno-lume-BUSINESS`, previa verifica |
| Evoluzione START → BUSINESS | confronto tra START e BUSINESS |
| Sicurezza Supabase | da determinare tramite audit |
| Standard tecnici generali | da estrarre dopo il confronto |

Un progetto può essere fonte visuale canonica ma richiedere una correzione tecnica prima dell’estrazione del pattern.

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

- pubblicare `tretnix-knowledge`;
- mantenere ChatGPT, Lovable e GitHub;
- introdurre Cursor;
- non introdurre ancora automazioni o MCP.

### Fase 2 — Progetto pilota

- aprire `forno-lume-START` in Cursor;
- aggiungere `AGENTS.md`;
- aggiungere una regola Cursor iniziale;
- aggiungere `.cursorignore`;
- non modificare il sito;
- eseguire l’audit in sola lettura.

### Fase 3 — Primo intervento controllato

- revisionare l’audit;
- scegliere una categoria;
- creare una branch;
- implementare una correzione circoscritta;
- controllare il diff;
- eseguire i controlli;
- aprire una pull request.

### Fase 4 — Consolidamento

- trasformare la procedura verificata in una skill;
- confrontare START e BUSINESS;
- analizzare Tretnix.com;
- estrarre standard confermati.

### Fase 5 — Specializzazione

- valutare Claude Code;
- aggiungere RLS review;
- aggiungere pre-deploy;
- valutare test browser e automazioni.

---

## 15. Priorità corrente

La priorità attuale non è correggere immediatamente tutte le repository.

È:

1. creare la fonte canonica minima;
2. introdurre Cursor senza alterare il metodo esistente;
3. auditare Forno Lume START in sola lettura;
4. revisionare i risultati;
5. intervenire una categoria alla volta;
6. estendere progressivamente il sistema.

---

## 16. Non obiettivi della fase iniziale

Non sono priorità immediate:

- collegare molti MCP;
- acquistare ogni strumento disponibile;
- creare numerosi subagenti;
- automatizzare i deploy;
- consentire scrittura sul database di produzione;
- uniformare tutti i siti visivamente;
- riscrivere repository già funzionanti;
- creare decine di skill teoriche;
- introdurre processi Git eccessivamente complessi.

La complessità deve essere aggiunta solo quando risolve un problema reale.
