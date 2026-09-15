# Tretnix Master Context

**Versione:** 1.9
**Aggiornato:** 14 settembre 2026
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

CURRENT_STATE.md
= indice trasversale sintetico, non sostitutivo degli status locali

SOURCE_ARTIFACT_REGISTER.md
= artefatti, checksum, ingestione e fonti residue

family-kits/
= specifiche complete e versionate dei verticali
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

Il primo verticale operativo è Food & Hospitality.

La mappa corrente comprende inoltre:

- Beauty & Wellness, con specifica `v1.1` completa in `family-kits/beauty-wellness-v1.1/` e lineage reale `RITO Studio START → BUSINESS → BUSINESS PLUS`; START è frozen su `main@2ab4dc46ef06fa006560c6d721b28be2cb9a7fa6`, BUSINESS è frozen e riconciliato su `main@3f0ff4d3ed8e675725d8d640c305ab61d47217d7`, mentre il tag START precedente e lo stato BUSINESS PLUS restano governati come lineage/gate separati;
- Professional Services, con specifica `v1.0` completa in `family-kits/professional-services-v1.0/` e concept `QUADRA Studio`;
- Home & Local Services, con specifica `v1.0` completa in `family-kits/home-local-services-v1.0/` e concept `NODO Servizi`.

La mappa, il lifecycle e i gate sono in `PORTFOLIO_AND_VERTICALS.md`.

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

START definisce il linguaggio visuale e di interazione approvato. BUSINESS espande architettura informativa, route, contenuti e funzionalità. I pattern verificati nei Package A, B, B2 e C sono approvati nel perimetro documentato; il Package D e gli ambiti futuri restano separati.

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

Stato verificato corrente:

- completato;
- rimediato;
- tecnicamente chiuso e riconciliato sulla baseline sorgente `2ed19ef9a4a886616bccd5aad2054c3027fec680`;
- deploy Cloudflare post-merge della baseline corrente registrato come SUCCESS;
- verifica owner di `prefers-reduced-motion` registrata come PASS;
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
- riferimento tecnico approvato per i pattern multipagina verificati fino al Package C.

Stato verificato corrente:

- Package A, B, micro-fix “L'incontro”, B2 e C completati e uniti;
- baseline sorgente corrente su `main`: `ccea04cb0bb50e2624fe505bf7d3f25890b7d456`;
- build Cloudflare Pages completata tramite Bun e lockfile;
- deploy di produzione verificato dal proprietario il 25 luglio 2026;
- deploy Cloudflare post-merge del 10 settembre: SUCCESS;
- Package D ancora pendente e separato;
- repository parent congelato sulla baseline corrente.

Route previste:

- `/`;
- `/menu`;
- `/chi-siamo`;
- `/galleria`;
- `/contatti`;
- `/privacy`;
- `/cookie`;
- pagina 404.

Pattern approvati fino al Package C:

- conservazione dell’identità START con implementazione tecnica migliorata;
- accessibilità di drawer e lightbox;
- route reset, history restoration, direct URL e refresh;
- ordine editoriale mobile;
- motion e reduced motion coerenti con START;
- fallback runtime e 404;
- demo `noindex, follow`;
- JSON-LD generico e non commerciale;
- attribuzione Tretnix nel footer.

I dettagli del contratto e delle policy sono in `HOSPITALITY_FAMILY.md`.

### RITO Studio START

Ruolo:

- primo progetto Beauty & Wellness;
- baseline canonica START per identità, composizione, comportamento condiviso e nuovi confronti START → BUSINESS;
- piano START chiuso e congelato.

Stato verificato corrente:

```text
FROZEN
main: 2ab4dc46ef06fa006560c6d721b28be2cb9a7fa6
validated ancestor: 8fe09095eafb6be8083ddc8b8b7d79f2a21db483
PR: #17
post-merge Cloudflare: SUCCESS
owner reduced-motion verification: PASS
```

Il tag annotato remoto `family-start-v1.0` → `74ee03c4d39a974872f94f53d14ec2873815ccf7`
resta evidenza storica del freeze precedente. La baseline del 10 settembre ha deploy Cloudflare
post-merge SUCCESS e verifica owner `prefers-reduced-motion` PASS.

### RITO Studio BUSINESS

Ruolo:

- evoluzione multipagina Beauty & Wellness dello START;
- repository operativo esistente, non da ricreare;
- fonte project-specific per catalogo e dettaglio trattamento query-driven, gallery/lightbox e routing multipagina RITO.

Stato corrente verificato:

```text
main: 3f0ff4d3ed8e675725d8d640c305ab61d47217d7
validated ancestor: ccb50d7b7c6ffbeba96d33b02615a0f428018116
PR: #10
post-merge Cloudflare: SUCCESS
owner reduced-motion verification: PASS
```

La riconciliazione del 10 settembre preserva le differenze BUSINESS intenzionali, incluse l'assenza delle
route `/team` e `/prenota`, il dettaglio trattamento query-driven, booking tramite WhatsApp +
telefono e contatto tramite email + telefono. Backend, database, auth, pagamenti e modifiche
BUSINESS PLUS richiedono gate separati.

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

## 14. Piano di adozione

### Fase 1 — Fondamenta

Stato: completata; descrive l'adozione storica iniziale.

- pubblicare `tretnix-knowledge`;
- configurare ChatGPT;
- introdurre una superficie locale di controllo, inizialmente Cursor;
- aggiungere foundation e regole al progetto pilota.

### Fase 2 — Audit del progetto pilota

Stato: audit statico e controllo qualità completati.

- auditare `forno-lume-START` in sola lettura;
- correggere severità ed evidenze del report;
- mantenere separati bug confermati, rischi, scelte intenzionali e controlli mancanti.

### Fase 3 — Introduzione di Codex

Stato: approvata.

- usare Codex tramite app, terminale o editor opzionale appropriato;
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

- preservare i pattern BUSINESS verificati nei Package A, B, B2 e C;
- aprire il Package D come task separato;
- mantenere il confronto con la baseline canonica START;
- trasformare procedure verificate in skill;
- auditare Tretnix.com;
- estrarre standard confermati;
- consolidare ChatGPT + Codex tramite Development OS v1 senza riattivare tool storici.

### Fase 6 — Portfolio e conservazione del contesto

Stato: documentazione acquisita; verifica finale in corso.

- development pack del 25 luglio acquisito, verificato ed estratto;
- Beauty v1.1, Professional v1.0 e Home v1.0 versionati come family kit;
- `RITO Studio START` e `RITO Studio BUSINESS` sono congelati e riconciliati sulle baseline del 10 settembre; BUSINESS PLUS resta separato;
- eseguire la prova di ricostruzione senza chat dopo il merge;
- conservare offline lo ZIP originale;
- usare `CURRENT_STATE.md` per lo stato trasversale e le issue per i task.

### Fase 7 — Specializzazione

- valutare Claude Code quando emerge un bisogno concreto;
- aggiungere RLS review;
- aggiungere pre-deploy;
- valutare test browser, Codex Cloud e automazioni dopo aver stabilizzato il processo.

## 15. Priorità corrente

La priorità attuale è:

1. completare e revisionare Development OS v1 nella Knowledge senza commit o pilot automatico;
2. sottoporre il candidate al gate owner/full diff review;
3. mantenere Tretnix.com nel workstream separato e non usarlo come pilot prima del checkpoint dedicato;
4. proseguire la riconciliazione e i finding Tretnix.com soltanto nel relativo repository;
5. mantenere Forno Lume START e BUSINESS chiusi e congelati, con Package D separato;
6. mantenere RITO Studio START e BUSINESS congelati sulle baseline correnti senza coinvolgere BUSINESS PLUS.

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
