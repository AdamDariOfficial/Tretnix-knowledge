# Tretnix Master Context

**Versione:** 1.12
**Aggiornato:** 26 settembre 2026
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

Il fondatore di Tretnix ha esperienza di sviluppo tradizionale e attualmente usa soprattutto ChatGPT per strategia e review, Codex per il lavoro sul repository, GitHub come checkpoint versionato, specifiche dettagliate, controllo visuale, test manuali e debugging iterativo assistito.

L’obiettivo non è tornare necessariamente a scrivere manualmente ogni riga, ma aumentare il controllo tecnico:

- capire quali file vengono modificati;
- leggere i diff;
- distinguere sintomi e cause;
- evitare patch fragili;
- mantenere progetti complessi;
- recuperare progressivamente familiarità con il codice;
- non dipendere da un singolo tool o provider;
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

### Lovable — provenance storica

Lovable non appartiene più al workflow operativo corrente. I repository, commit, package, prompt, gate e snapshot prodotti durante il suo utilizzo restano documentati come provenance storica e non vengono riscritti o cancellati. Un riferimento storico a Lovable non costituisce autorizzazione a riattivarlo, consumare crediti o modificare un progetto esterno.

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

### Cursor — superficie opzionale/manuale

Cursor può essere usato come editor, terminale e superficie manuale per Git e diff. Non è una dipendenza del processo e non coincide con il writer. La responsabilità e i gate umani restano separati dallo strumento usato per visualizzare il repository.

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

### Backend e provider infrastrutturali

Tretnix non adotta un unico provider backend obbligatorio per tutti i progetti. La scelta dipende dal fit reale del prodotto.

Provider e stack possibili includono, quando pertinenti:

- Supabase/PostgreSQL per database relazionale, Auth, RLS, storage e realtime gestiti;
- Cloudflare Workers, D1, Durable Objects e servizi collegati per workload edge/serverless e realtime coordinato;
- infrastruttura dedicata o self-hosted soltanto quando operatività, controllo o costi la giustificano.

Il provider è infrastruttura interna, non identità pubblica del prodotto. L'architettura preferita separa:

```text
UI / routes
↓
application use cases
↓
domain + purpose-specific contracts
↓
infrastructure adapters / composition
↓
provider
```

RITO Studio BUSINESS PLUS usa attualmente Cloudflare per il fit del backend live e del realtime senza polling. Questa scelta non obbliga Forno Lume o futuri clienti allo stesso provider.

Non introdurre astrazioni multi-provider speculative. Isolare soltanto dipendenze proprietarie concrete e mantenere equivalenti i confini di sicurezza. Nessun agente deve indebolire autenticazione, autorizzazione, RLS quando presente, CSRF, rate limiting o persistenza solo per eliminare un errore visibile nel frontend.

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

### Provenance dei flussi precedenti

I flussi Lovable già conclusi restano ricostruibili tramite Git, decisioni, source artifact e documentazione project-specific. Non sono un percorso operativo attivo. Cursor e altri editor restano superfici opzionali; un revisore specialistico può intervenire dopo un checkpoint, mai come secondo writer contemporaneo.

Flusso vietato:

```text
Richiesta del cliente
↓
Agente modifica direttamente la produzione
↓
Deploy senza revisione
```

---

### Tretnix Intelligence — modello operativo ricorrente

Tretnix Intelligence è il sistema interno che trasforma sorgenti monitorate in review package strutturati per decisione umana.

Il modello operativo approvato è staging-first:

```text
sorgente monitorata
↓
discovery / acquisizione
↓
preprocessing deterministico
↓
semantic batch bounded
↓
dedup / confronto / candidate update
↓
review package
↓
Tretnix Intelligence Inbox staging
↓
human review
↓
eventuale formalizzazione Knowledge separata
```

Il runtime ricorrente usa un daemon persistente avviato dal task Windows `Tretnix Intelligence`. L'automazione può arrivare fino alla staging Inbox, ma non può approvare o rifiutare elementi al posto dell'owner, modificare automaticamente la Tretnix Knowledge o attivare la produzione.

Un ciclo senza nuovi input è valido. Una model call reale avviene soltanto quando esiste lavoro semanticamente eleggibile; il limite resta una call per batch e non esiste fallback per singolo video. Gli errori successivi a una call consumata devono preservarne gli artefatti e privilegiare recovery deterministica rispetto a un nuovo consumo.

Il runbook operativo è versionato in:

`operations/tretnix-intelligence/OPERATIONAL_RUNBOOK.md`

La decisione normativa è `TRX-DEC-044`.


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

Lo stato dettagliato appartiene al repository del progetto. Quando serve coordinare più repository, `CURRENT_STATE.md` conserva soltanto uno snapshot trasversale sintetico, datato e classificato per evidenza.

### Tasks

Descrivono ciò che deve ancora essere fatto.

Status e task appartengono ai repository o al project tracking, non alla memory permanente. La knowledge trasversale non deve diventare una cronologia infinita di task.

### Source artifacts

Pacchetti, handoff, allegati e snapshot necessari devono essere registrati in `SOURCE_ARTIFACT_REGISTER.md`. Citare il nome di un file in una chat non equivale ad averne acquisito il contenuto.

### Chat handoff

Le chat possono essere cancellate soltanto dopo il gate definito in `CHAT_RETENTION_AND_HANDOFF.md`. Decisioni, specifiche, stato, task, evidenze e allegati devono essere trasferiti alle rispettive fonti canoniche.

---

## 7. Fonte unica della verità e ruoli documentali

La fonte canonica trasversale è:

```text
tretnix-knowledge
```

“Fonte canonica” non significa che ogni file possa descrivere tutto. I ruoli sono separati:

```text
TRETNIX_MASTER_CONTEXT.md
= identità, modello operativo, tool roles e principi stabili

DECISIONS.md
= scelte approvate e loro motivazione

DEVELOPMENT_STANDARDS.md
= regole tecniche e operative condivise

REPOSITORY_INDEX.md
= inventario, identità, relazioni e checkpoint auditati dei repository

CURRENT_STATE.md
= snapshot trasversale datato; non sostituisce lo stato locale e non auto-certifica il proprio main

PORTFOLIO_AND_VERTICALS.md
= mappa dei verticali, lifecycle e gate condivisi

documenti *_FAMILY.md + family-kits/
= governance e specifiche di famiglia

repository del progetto
= prodotto, architettura, sicurezza, stato dettagliato, roadmap, issue e codice verificabile
```

`TRETNIX_MASTER_CONTEXT.md` non registra baseline operative correnti, priorità temporanee o gate runtime di singoli progetti. Quando una risposta dipende dallo stato attuale, leggere `CURRENT_STATE.md`, `REPOSITORY_INDEX.md` e soprattutto il repository interessato.

Ogni repository di progetto mantiene progressivamente il proprio contesto locale:

```text
AGENTS.md
.cursor/
.codex/        # solo quando serve configurazione condivisa verificata
.claude/       # solo se Claude Code viene realmente adottato
docs/
```

`AGENTS.md` è il punto di ingresso comune per Codex e per gli altri agenti compatibili. Non creare file duplicati con le stesse regole senza una necessità reale.

### Precedenza

1. decisioni approvate;
2. standard condivisi;
3. documenti specifici del progetto;
4. specifica approvata del task;
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

Le famiglie attualmente documentate sono:

- Food & Hospitality — Forno Lume;
- Beauty & Wellness — RITO Studio;
- Professional Services — QUADRA Studio;
- Home & Local Services — NODO Servizi.

Le specifiche e i gate di famiglia sono nei documenti `*_FAMILY.md`, in `PORTFOLIO_AND_VERTICALS.md` e nei relativi `family-kits/`. Baseline, PR, deploy e gate correnti non vengono duplicati in questo Master Context: usare `CURRENT_STATE.md`, `REPOSITORY_INDEX.md` e il repository del progetto.

### Principio di evoluzione

Un progetto di piano superiore non deve necessariamente essere ridisegnato da zero.

La famiglia Hospitality segue il lineage:

```text
Forno Lume START
↓
Forno Lume BUSINESS
↓
Forno Lume BUSINESS PLUS
```

La famiglia Beauty & Wellness segue:

```text
RITO Studio START
↓
RITO Studio BUSINESS
↓
RITO Studio BUSINESS PLUS
```

I piani superiori preservano l'identità approvata del parent e aggiungono soltanto architettura, contenuti e funzionalità autorizzati. Un gate START non autorizza automaticamente BUSINESS o BUSINESS PLUS.

---

## 9. Ruoli stabili dei repository di riferimento

| Repository/famiglia | Ruolo stabile |
|---|---|
| `tretnix` | sito istituzionale, brand Tretnix, area amministrativa e superfici interne approvate |
| `forno-lume-START` | riferimento visuale e single-page Hospitality START |
| `forno-lume-BUSINESS` | riferimento multipagina Hospitality per i pattern verificati nel proprio scope |
| `forno-lume-BUSINESS-PLUS` | reference project-specific Hospitality per funzionalità e backend di piano superiore; non standard trasversale automatico |
| `rito-studio-START` | riferimento Beauty & Wellness START |
| `rito-studio-BUSINESS` | riferimento multipagina Beauty & Wellness nel proprio scope |
| `rito-studio-BUSINESS-PLUS` | reference project-specific per consultation/admin/backend e relativi pattern verificati; non standard trasversale automatico |

Una repository non diventa canonica per ogni aspetto. Il ruolo di un pattern deriva da decisioni, qualità verificata, scope e adozione documentata.

Per baseline, gate e stato corrente usare le fonti temporali appropriate, non questo documento.

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
| Architettura multipagina Hospitality | `forno-lume-BUSINESS`, approvato fino al Package C |
| Drawer, lightbox, routing, error handling e demo SEO | `forno-lume-BUSINESS`, approvati nei pattern verificati |
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

## 14. Adozione del workflow

La storia dell'adozione iniziale — Cursor, Lovable, primo pilot Forno Lume, introduzione Codex, Development OS e successive riconciliazioni — resta ricostruibile tramite Git, `DECISIONS.md`, audit e source artifacts.

Il toolchain operativo corrente è quello definito da `TRX-DEC-041`:

```text
ChatGPT = strategia, specifica, coordinamento e review
Codex   = writer/validator operativo principale
GitHub  = fonte versionata e checkpoint
Cursor  = superficie opzionale/manuale
Lovable = provenance storica salvo nuova autorizzazione esplicita
```

Development OS è un layer deterministico locale. La sua adozione in un repository non autorizza Git remoto, browser, backend, staging o produzione.

Questo Master Context non conserva lo stato di rollout corrente: usare `DEVELOPMENT_OS.md`, `CURRENT_STATE.md` e il repository applicativo.

## 15. Priorità operative

Le priorità correnti non sono conoscenza stabile e non vengono mantenute in questo documento.

Usare:

- `CURRENT_STATE.md` per coordinamento trasversale datato;
- issue/roadmap/PR del repository per lavoro operativo;
- documentazione project-specific per gate e stato dettagliato;
- `PORTFOLIO_AND_VERTICALS.md` per lifecycle e dipendenze tra piani.

Una priorità riportata in chat non modifica automaticamente questi gate.

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
