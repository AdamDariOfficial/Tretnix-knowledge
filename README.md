# Tretnix Knowledge

Fonte canonica per identità, decisioni, standard tecnici, repository, procedure operative e adattatori degli strumenti Tretnix.

**Versione:** 1.6
**Aggiornato:** 26 luglio 2026
**Stato:** operativo
**Visibilità osservata:** repository GitHub pubblica al 26 luglio 2026
**Visibilità desiderata:** da confermare dal proprietario; non dedurre la scelta dai documenti storici

---

## 1. Scopo

`tretnix-knowledge` impedisce che ChatGPT, Lovable, Cursor, Codex, Claude Code o altri strumenti mantengano versioni contraddittorie di Tretnix.

La repository conserva ciò che deve rimanere stabile e verificabile:

- identità e posizionamento di Tretnix;
- modello operativo;
- standard tecnici condivisi;
- decisioni approvate;
- inventario dei repository;
- procedure di audit;
- adattatori sintetici per gli strumenti;
- kit di configurazione per i repository;
- in futuro, skill riutilizzabili.

GitHub conserva la verità versionata. Le chat aiutano a ragionare, ma non sostituiscono la documentazione canonica.

---

## 2. Principio guida

> Memory ricorda chi siamo. Knowledge descrive ciò che sappiamo. Instructions stabiliscono le regole. Skills stabiliscono come lavoriamo. GitHub conserva la verità.

---

## 3. Struttura

```text
tretnix-knowledge/
├── README.md
├── TRETNIX_MASTER_CONTEXT.md
├── DEVELOPMENT_STANDARDS.md
├── DECISIONS.md
├── REPOSITORY_INDEX.md
├── HOSPITALITY_FAMILY.md
├── BEAUTY_WELLNESS_FAMILY.md
├── PROFESSIONAL_SERVICES_FAMILY.md
├── HOME_LOCAL_SERVICES_FAMILY.md
├── PORTFOLIO_AND_VERTICALS.md
├── CURRENT_STATE.md
├── CHAT_RETENTION_AND_HANDOFF.md
├── SOURCE_ARTIFACT_REGISTER.md
├── .gitignore
│
├── audits/
│   ├── KNOWLEDGE_CONSOLIDATION_2026-07-26.md
│   └── DEVELOPMENT_PACK_INGESTION_2026-07-26.md
│
├── family-kits/
│   ├── beauty-wellness-v1.1/
│   ├── professional-services-v1.0/
│   └── home-local-services-v1.0/
│
├── operations/
│   └── development-launch-2026-07-25/
│
├── source-artifacts/
│   └── 2026-07-25-development-pack/
│
├── compiled/
│   ├── README.md
│   ├── CHATGPT_PROJECT_INSTRUCTIONS.md
│   ├── LOVABLE_WORKSPACE_KNOWLEDGE.md
│   ├── CURSOR_USER_RULES.md
│   ├── CODEX_GLOBAL_AGENTS.md
│   └── CODEX_SETUP.md
│
├── templates/
│   ├── READ_ONLY_AUDIT.md
│   ├── CONTROLLED_IMPLEMENTATION_TASK.md
│   ├── READ_ONLY_DIFF_REVIEW.md
│   └── project-foundation/
│       ├── AGENTS.md
│       ├── .cursorignore
│       └── .cursor/
│           └── rules/
│               └── 00-project-overview.mdc
│
└── project-kits/
    └── forno-lume-start/
        ├── README.md
        ├── AGENTS.md
        ├── .cursorignore
        └── .cursor/
            └── rules/
                └── 00-project-overview.mdc
```

---

## 4. Documenti canonici

| File | Funzione | Natura |
|---|---|---|
| [`TRETNIX_MASTER_CONTEXT.md`](./TRETNIX_MASTER_CONTEXT.md) | Contesto aziendale e operativo complessivo | Descrittiva |
| [`DEVELOPMENT_STANDARDS.md`](./DEVELOPMENT_STANDARDS.md) | Regole tecniche trasversali | Normativa |
| [`DECISIONS.md`](./DECISIONS.md) | Decisioni approvate e motivazioni | Normativa |
| [`REPOSITORY_INDEX.md`](./REPOSITORY_INDEX.md) | Inventario e ruolo dei progetti | Descrittiva |
| [`HOSPITALITY_FAMILY.md`](./HOSPITALITY_FAMILY.md) | Contratto, policy e baseline verificate della famiglia Hospitality | Normativa e descrittiva |
| [`BEAUTY_WELLNESS_FAMILY.md`](./BEAUTY_WELLNESS_FAMILY.md) | Indice e governance Beauty & Wellness | Normativa e descrittiva |
| [`PROFESSIONAL_SERVICES_FAMILY.md`](./PROFESSIONAL_SERVICES_FAMILY.md) | Indice e governance Professional Services | Normativa e descrittiva |
| [`HOME_LOCAL_SERVICES_FAMILY.md`](./HOME_LOCAL_SERVICES_FAMILY.md) | Indice e governance Home & Local Services | Normativa e descrittiva |
| [`PORTFOLIO_AND_VERTICALS.md`](./PORTFOLIO_AND_VERTICALS.md) | Mappa dei verticali, lifecycle e gate di avvio | Normativa e descrittiva |
| [`CURRENT_STATE.md`](./CURRENT_STATE.md) | Snapshot operativo trasversale con livelli di evidenza | Operativa e temporale |
| [`CHAT_RETENTION_AND_HANDOFF.md`](./CHAT_RETENTION_AND_HANDOFF.md) | Gate per handoff e cancellazione sicura delle chat | Normativa e operativa |
| [`SOURCE_ARTIFACT_REGISTER.md`](./SOURCE_ARTIFACT_REGISTER.md) | Registro di artefatti, checksum, ingestione e fonti residue | Operativa |
| [`templates/READ_ONLY_AUDIT.md`](./templates/READ_ONLY_AUDIT.md) | Procedura standard di audit senza modifiche | Operativa |

---

## 5. Contenuti compilati

La cartella [`compiled/`](./compiled/) contiene versioni sintetiche derivate dai documenti canonici e pronte da copiare nelle impostazioni degli strumenti.

Questi file sono **adattatori**, non fonti autonome.

Quando cambia una decisione o uno standard:

1. aggiornare prima il documento canonico;
2. aggiornare successivamente gli adattatori coinvolti;
3. evitare di modificare soltanto la copia presente nello strumento.

---

## 6. Template e project kit

### `templates/project-foundation`

Contiene la base generica da adattare ai nuovi repository:

- `AGENTS.md`, letto anche da Codex;
- `.cursorignore`;
- regola Cursor iniziale.

I template operativi condivisi includono inoltre:

- `READ_ONLY_AUDIT.md`;
- `CONTROLLED_IMPLEMENTATION_TASK.md`;
- `READ_ONLY_DIFF_REVIEW.md`.

### `project-kits/forno-lume-start`

Contiene la configurazione adattata al progetto pilota Forno Lume START.

La foundation iniziale è già stata integrata nel repository del progetto. Il kit rimane la copia di riferimento da sincronizzare tramite branch dedicata quando cambiano le istruzioni; non modifica il sito o il comportamento runtime.

### `family-kits/`

Contiene le specifiche complete approvate dei verticali preparati:

- Beauty & Wellness v1.1;
- Professional Services v1.0;
- Home & Local Services v1.0.

Ogni kit conserva documenti, prompt, checklist e manifest. I prompt non autorizzano automaticamente l'esecuzione.

### `operations/development-launch-2026-07-25/`

Contiene sequenza, checklist, handoff e messaggio di bootstrap per il primo ciclo di sviluppo.

### `source-artifacts/`

Conserva manifest, provenienza e snapshot storici. Le copie storiche non competono con i documenti canonici correnti.

---

## 7. Ordine di autorità

Quando due fonti sembrano contraddirsi, usare questo ordine:

1. decisioni approvate in `DECISIONS.md`;
2. standard normativi in `DEVELOPMENT_STANDARDS.md`;
3. documentazione specifica del singolo repository;
4. specifica approvata del task corrente;
5. implementazione verificata nel codice e nel deploy;
6. conversazioni e memoria, usate per recuperare contesto da formalizzare.

Una chat non modifica automaticamente una decisione canonica. Una nuova decisione deve essere registrata e versionata.

---

## 8. Separazione delle responsabilità

### Questa repository contiene

- conoscenza stabile;
- regole condivise;
- decisioni;
- procedure ricorrenti;
- indice dei progetti;
- adattatori degli strumenti;
- template;
- kit di adozione;
- mappa trasversale dei verticali;
- uno snapshot sintetico dello stato quando serve a coordinare più repository;
- registro degli artefatti sorgente e della loro ingestione;
- specifiche complete dei verticali preparati;
- handoff e runbook di lancio versionati.

Lo snapshot trasversale non sostituisce lo stato dettagliato dei singoli progetti.

### I repository dei progetti contengono

- codice;
- configurazioni locali;
- documentazione specifica;
- stato corrente;
- roadmap;
- issue;
- test;
- migrazioni;
- istruzioni locali per gli agenti.

### GitHub Issues e project tracker contengono

- bug temporanei;
- task;
- attività ancora da eseguire;
- assegnazioni;
- priorità operative;
- scadenze.

Non inserire bug temporanei o task correnti nella knowledge permanente.

---

## 9. Uso con gli strumenti

### ChatGPT

Usare questa repository per:

- strategia;
- specifiche;
- criteri di accettazione;
- confronto tra report;
- revisione degli audit;
- documentazione;
- preparazione dei task.

Le istruzioni pronte da copiare sono in:

```text
compiled/CHATGPT_PROJECT_INSTRUCTIONS.md
```

### Lovable

Usare:

```text
compiled/LOVABLE_WORKSPACE_KNOWLEDGE.md
```

come base della Workspace Knowledge.

La Project Knowledge di ogni progetto deve contenere soltanto contesto e vincoli specifici.

### Cursor

Usare:

```text
compiled/CURSOR_USER_RULES.md
```

nelle User Rules globali.

Cursor resta l'IDE e il punto di controllo umano: editor, terminale, diff, Git e verifiche locali.

Per il progetto pilota usare:

```text
project-kits/forno-lume-start/
```

### Codex

Codex è l'agente operativo principale per il lavoro controllato sul repository:

- analisi del codebase;
- implementazioni circoscritte;
- modifiche multi-file;
- esecuzione dei comandi disponibili;
- preparazione e revisione del diff;
- attività locali nell'IDE o isolate in cloud.

Usare:

```text
compiled/CODEX_GLOBAL_AGENTS.md
compiled/CODEX_SETUP.md
```

Il file globale va installato come `~/.codex/AGENTS.md`. Ogni repository mantiene inoltre il proprio `AGENTS.md`, che ha il contesto specifico del progetto.

### Claude Code

Resta uno specialista opzionale e un possibile revisore indipendente per sicurezza, Supabase, migrazioni, refactoring estesi e debugging complesso. Non deve duplicare automaticamente Codex.

### GitHub

È la fonte ufficiale per:

- codice;
- cronologia;
- branch;
- pull request;
- issue;
- decisioni;
- documentazione;
- release.

---

## 10. Modalità di aggiornamento

Ogni modifica significativa deve:

1. essere eseguita in una branch dedicata;
2. modificare soltanto i documenti pertinenti;
3. indicare perché il contenuto cambia;
4. evitare duplicazioni;
5. aggiornare data o versione quando necessario;
6. essere revisionata tramite diff;
7. essere unita solo dopo approvazione.

Esempi:

```text
docs/update-development-standards
docs/add-hospitality-patterns
docs/record-route-scroll-decision
chore/add-codex-adapters
audit/add-new-repository
```

### Aggiornamenti preparati fuori dal working tree

Per modifiche multi-file, documentali o strutturali preparate in un’altra chat, da un altro agente o in un ambiente isolato, usare una baseline esatta invece di una copia presunta:

```text
git rev-parse HEAD
git archive --format=zip --output="<repository>-<short-hash>.zip" HEAD
```

La patch deve essere preparata sull’archive, verificata su una seconda estrazione pulita e applicata nel repository reale con diff, staging, commit, push, pull request e merge separati.

La procedura completa è definita in `DEVELOPMENT_STANDARDS.md`; la decisione approvata è `TRX-DEC-022`.

---

## 11. Regole per aggiungere nuovi contenuti

Prima di aggiungere una nuova informazione, chiedere:

- è stabile oppure temporanea?
- vale per tutti i progetti oppure per uno solo?
- è una regola, una decisione, uno stato o un task?
- esiste già in un altro file?
- è confermata oppure ancora da verificare?
- deve diventare canonica oppure è soltanto un’osservazione?

| Tipo di informazione | Destinazione |
|---|---|
| Identità e modello operativo | `TRETNIX_MASTER_CONTEXT.md` |
| Regola tecnica condivisa | `DEVELOPMENT_STANDARDS.md` |
| Scelta approvata | `DECISIONS.md` |
| Repository o relazione tra progetti | `REPOSITORY_INDEX.md` |
| Verticale, lifecycle e progetto pianificato | `PORTFOLIO_AND_VERTICALS.md` |
| Governance sintetica della famiglia | documento `*_FAMILY.md` |
| Specifica completa della famiglia | `family-kits/` |
| Handoff e runbook di lancio | `operations/` |
| Stato trasversale sintetico | `CURRENT_STATE.md` |
| Allegato o pacchetto sorgente | `SOURCE_ARTIFACT_REGISTER.md` |
| Procedura di handoff e cancellazione chat | `CHAT_RETENTION_AND_HANDOFF.md` |
| Adattatore di uno strumento | `compiled/` |
| Base riutilizzabile | `templates/` |
| Configurazione pronta per un progetto | `project-kits/` |
| Stato di un progetto | repository del progetto, `docs/STATUS.md` |
| Attività futura | GitHub Issue o `docs/ROADMAP.md` |
| Bug rilevato | audit o GitHub Issue |

---

## 12. Adozione operativa corrente

La pipeline di base diventa:

```text
ChatGPT + GitHub + Cursor + Codex
```

Lovable rientra nel flusso per costruzione e iterazione visuale quando disponibile. Claude Code rimane opzionale.

Ordine operativo:

1. ChatGPT prepara una specifica approvabile;
2. GitHub registra branch, task e checkpoint;
3. Cursor rimane l'ambiente di controllo umano;
4. Codex esegue l'analisi o l'implementazione circoscritta;
5. il diff viene revisionato prima di ulteriori modifiche;
6. un revisore parte in sola lettura;
7. i finding vengono approvati, rifiutati o rinviati;
8. soltanto i finding approvati vengono corretti;
9. typecheck, lint, test, build e browser vengono dichiarati solo se eseguiti;
10. la pull request viene unita solo dopo revisione umana.

Regole operative:

- prima di ogni incarico Codex, ChatGPT indica il modello consigliato e la motivazione senza fissare un modello permanente;
- un task che consuma crediti, crea risorse remote o pubblica richiede un gate esplicito;
- `PREPARATION_COMPLETE` non equivale ad autorizzazione di implementazione;
- un progetto pianificato non viene dichiarato repository o deploy finché non esiste;
- un solo agente scrive alla volta;
- ogni passaggio produce un checkpoint Git o un report;
- nessun agente lavora direttamente su `main`;
- nessun accesso di produzione viene concesso se non necessario;
- Codex Cloud è opzionale e deve usare branch o commit identificabili;
- Lovable, Codex, Cursor Agent e Claude Code non modificano contemporaneamente gli stessi file.

---

## 13. Limitazioni

Questa versione documenta le informazioni già definite e prepara gli strumenti, ma non sostituisce l’audit dei repository.

Gli aspetti tecnici non ancora verificati nel codice devono restare marcati come:

- da verificare;
- probabili;
- noti per segnalazione;
- non ancora auditati.

Non dichiarare una vulnerabilità, una build riuscita o un comportamento del codice come confermato senza evidenza.

Il development pack del 25 luglio è stato acquisito ed estratto. Prima di cancellare tutte le conversazioni resta obbligatorio applicare il gate di `CHAT_RETENTION_AND_HANDOFF.md`, verificare che non esistano allegati unici residui e completare una prova di ricostruzione da repository pulita.
