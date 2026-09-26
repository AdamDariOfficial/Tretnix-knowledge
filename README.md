# Tretnix Knowledge

Fonte canonica per identità, decisioni, standard tecnici, repository, procedure operative e adattatori degli strumenti Tretnix.

**Versione:** 1.15
**Aggiornato:** 26 settembre 2026
**Stato:** operativo
**Visibilità corrente:** repository GitHub pubblica durante il completamento dell’audit e del consolidamento Tretnix
**Visibilità successiva:** passaggio a privata soltanto dopo completamento del ciclo, verifica delle dipendenze di accesso e nuova conferma esplicita del proprietario (`TRX-DEC-031`)

---

## 1. Scopo

`tretnix-knowledge` impedisce che il workflow attivo ChatGPT + Codex, le superfici opzionali o gli strumenti storici mantengano versioni contraddittorie di Tretnix.

La repository conserva ciò che deve rimanere stabile e verificabile:

- identità e posizionamento di Tretnix;
- modello operativo;
- standard tecnici condivisi;
- decisioni approvate;
- inventario dei repository;
- procedure di audit;
- adattatori sintetici per gli strumenti;
- kit di configurazione per i repository;
- skill operative riutilizzabili e validate.

GitHub conserva la verità versionata. Le chat aiutano a ragionare, ma non sostituiscono la documentazione canonica.

---

## 2. Principio guida

> Memory ricorda chi siamo. Knowledge descrive ciò che sappiamo. Instructions stabiliscono le regole. Skills stabiliscono come lavoriamo. GitHub conserva la verità.

---

## 3. Struttura

```text
tretnix-knowledge/
├── README.md
├── AGENTS.md
├── TRETNIX_MASTER_CONTEXT.md
├── DEVELOPMENT_STANDARDS.md
├── UX_UI_QUALITY_SYSTEM.md
├── DECISIONS.md
├── REPOSITORY_INDEX.md
├── HOSPITALITY_FAMILY.md
├── BEAUTY_WELLNESS_FAMILY.md
├── PROFESSIONAL_SERVICES_FAMILY.md
├── HOME_LOCAL_SERVICES_FAMILY.md
├── PORTFOLIO_AND_VERTICALS.md
├── CASE_STUDY_STANDARD.md
├── CURRENT_STATE.md
├── CHAT_RETENTION_AND_HANDOFF.md
├── SOURCE_ARTIFACT_REGISTER.md
├── DEVELOPMENT_OS.md
├── BACKUP_AND_DISASTER_RECOVERY.md
├── tretnix.project.json
├── .gitignore
│
├── .github/
│   └── workflows/
│       └── knowledge-validation.yml
│
├── scripts/
│   ├── validate_knowledge.py
│   └── validate_knowledge.ps1
│
├── schemas/
│   ├── tretnix-project.schema.json
│   ├── tretnix-task.schema.json
│   └── tretnix-evidence.schema.json
│
├── tools/
│   └── tretnix/
│       ├── tretnix.mjs
│       └── tests/
│
├── compiled/
│   ├── README.md
│   ├── CHATGPT_PROJECT_INSTRUCTIONS.md
│   ├── CHATGPT_PROJECT_INSTRUCTIONS_COMPACT.md
│   ├── CHATGPT_KNOWLEDGE_ROUTER.md
│   ├── CHATGPT_WORKSTREAM_PLAYBOOK.md
│   ├── CODEX_GLOBAL_AGENTS.md
│   ├── CODEX_SETUP.md
│   ├── LOVABLE_WORKSPACE_KNOWLEDGE.md
│   └── CURSOR_USER_RULES.md
│
├── skills/
│   ├── CONTROLLED_CHANGE_PACKAGE.md
│   ├── TASK_ADMISSION.md
│   ├── READ_ONLY_REVIEW.md
│   ├── RELEASE_FREEZE.md
│   └── SECURITY_RETEST.md
│
├── family-kits/
├── case-studies/
├── operations/
├── source-artifacts/
├── templates/
└── project-kits/
```

La struttura abbreviata mostra i contratti correnti senza duplicare l'intero albero. I contenuti sotto `family-kits/`, `templates/` e `project-kits/` restano versionati e validati dalle rispettive regole.

---
## 4. Documenti canonici e responsabilità

| File | Funzione | Natura |
|---|---|---|
| [`TRETNIX_MASTER_CONTEXT.md`](./TRETNIX_MASTER_CONTEXT.md) | Identità, modello operativo, tool roles e principi stabili; non conserva baseline correnti di progetto | Descrittiva stabile |
| [`DEVELOPMENT_STANDARDS.md`](./DEVELOPMENT_STANDARDS.md) | Regole tecniche trasversali | Normativa |
| [`UX_UI_QUALITY_SYSTEM.md`](./UX_UI_QUALITY_SYSTEM.md) | Standard UX/UI, consistenza visuale, anti-AI-slop e Visual QA | Normativa |
| [`DECISIONS.md`](./DECISIONS.md) | Decisioni approvate e motivazioni | Normativa |
| [`REPOSITORY_INDEX.md`](./REPOSITORY_INDEX.md) | Inventario, identità, relazioni e checkpoint auditati; non è lo status live | Descrittiva |
| [`CURRENT_STATE.md`](./CURRENT_STATE.md) | Snapshot trasversale datato; non sostituisce `docs/STATUS.md` e non auto-certifica il proprio `main` | Operativa e temporale |
| [`PORTFOLIO_AND_VERTICALS.md`](./PORTFOLIO_AND_VERTICALS.md) | Mappa dei verticali, lifecycle e gate di avvio | Normativa e descrittiva |
| [`HOSPITALITY_FAMILY.md`](./HOSPITALITY_FAMILY.md) | Contratto, policy e baseline verificate della famiglia Hospitality | Normativa e descrittiva |
| [`BEAUTY_WELLNESS_FAMILY.md`](./BEAUTY_WELLNESS_FAMILY.md) | Indice e governance Beauty & Wellness | Normativa e descrittiva |
| [`PROFESSIONAL_SERVICES_FAMILY.md`](./PROFESSIONAL_SERVICES_FAMILY.md) | Indice e governance Professional Services | Normativa e descrittiva |
| [`HOME_LOCAL_SERVICES_FAMILY.md`](./HOME_LOCAL_SERVICES_FAMILY.md) | Indice e governance Home & Local Services | Normativa e descrittiva |
| [`CASE_STUDY_STANDARD.md`](./CASE_STUDY_STANDARD.md) | Standard per portfolio concept e client case study | Normativa e descrittiva |
| [`CHAT_RETENTION_AND_HANDOFF.md`](./CHAT_RETENTION_AND_HANDOFF.md) | Gate per handoff e cancellazione sicura delle chat | Normativa e operativa |
| [`BACKUP_AND_DISASTER_RECOVERY.md`](./BACKUP_AND_DISASTER_RECOVERY.md) | Workspace portabile, backup locale/cloud e recovery Tretnix | Normativa e operativa |
| [`SOURCE_ARTIFACT_REGISTER.md`](./SOURCE_ARTIFACT_REGISTER.md) | Registro di artefatti, checksum, ingestione e fonti residue | Operativa |
| [`DEVELOPMENT_OS.md`](./DEVELOPMENT_OS.md) | Contratto e adozione del layer deterministico Development OS | Normativa e operativa |
| [`skills/CONTROLLED_CHANGE_PACKAGE.md`](./skills/CONTROLLED_CHANGE_PACKAGE.md) | Applicazione e validazione controllata di modifiche esterne | Operativa e normativa |

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

### Istruzioni locali e validazione

Il file [`AGENTS.md`](./AGENTS.md) definisce i confini operativi per gli agenti che lavorano direttamente su questa repository.

La validazione locale su Windows non richiede Python:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate_knowledge.ps1
git -c core.whitespace=cr-at-eol diff --check
```

Dopo lo stage, prima del commit:

```powershell
git -c core.whitespace=cr-at-eol diff --cached --check
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate_knowledge.ps1
```

Il validatore include anche i file testuali untracked, non coperti da `git diff --check`.

Quando Python è disponibile, il validatore cross-platform equivalente rimane:

```text
python scripts/validate_knowledge.py
```

Il workflow `.github/workflows/knowledge-validation.yml` usa Python 3.13 e Node 22 sulle pull request e sui push a `main`. Esegue sia `scripts/validate_knowledge.py` sia `node --test tools/tretnix/tests/tretnix.test.mjs`. I validator locali PowerShell/Python restano equivalenti per il contratto Knowledge e non sostituiscono la review umana.


### `skills/`

Contiene procedure riutilizzabili già validate sul lavoro reale. Il Controlled Change Package v1.2 usa un flusso one-ZIP/one-block per localizzazione, checksum, estrazione, `Apply` e `Validate`, poi si ferma prima dei gate Git/remoti. Dopo una sola review finale owner, lo stage esatto viene controllato da `Verify-Staged` prima del commit.

Sequenza logica:

```text
one-block: ZIP → SHA-256 → extract → Apply → Validate
→ QA aggregato quando richiesto
→ owner review
→ exact stage
→ Verify-Staged
→ commit → push → PR → merge/deploy nei gate separati
```

Ogni validator dichiara se accetta file staged. Un validator che li vieta non viene rilanciato dopo `git add`; la verifica staged usa allowlist esatta, zero unstaged/untracked, hash finali e cached whitespace check.

### `templates/project-foundation`

Contiene la base generica da adattare ai nuovi repository:

- `AGENTS.md`, letto anche da Codex;
- `.cursorignore`;
- regola Cursor iniziale.

I template operativi condivisi includono inoltre:

- `READ_ONLY_AUDIT.md`;
- `CONTROLLED_IMPLEMENTATION_TASK.md`;
- `CONTROLLED_CHANGE_PACKAGE_MANIFEST.md`;
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

### `operations/tretnix-intelligence/`

Contiene il runbook operativo della pipeline Tretnix Intelligence ricorrente su staging: scheduler/daemon, health check, semantic-call boundary, staging sync, human-review boundary, fail-closed e recovery. Non contiene secret e non autorizza production o Knowledge write automatici.


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

Usare questa repository per strategia, specifiche, criteri di accettazione, coordinamento e review.

Configurazione derivata:

```text
Project Instructions
= compiled/CHATGPT_PROJECT_INSTRUCTIONS_COMPACT.md
  oppure compiled/CHATGPT_PROJECT_INSTRUCTIONS.md quando il limite lo consente

Project Sources
= compiled/CHATGPT_KNOWLEDGE_ROUTER.md
+ compiled/CHATGPT_WORKSTREAM_PLAYBOOK.md
```

Gli adapter sono derivati. Le fonti canoniche restano nella Knowledge e nei repository progetto; non duplicarle stabilmente nei Project Sources.

### Lovable

`compiled/LOVABLE_WORKSPACE_KNOWLEDGE.md` resta un adapter storico per provenance dei progetti precedenti. Non appartiene al workflow operativo corrente e non autorizza riattivazione, consumo crediti o pubblicazione.

### Cursor

L'uso è opzionale. Quando Cursor viene scelto come editor manuale, usare:

```text
compiled/CURSOR_USER_RULES.md
```

nelle User Rules globali.

Cursor non è una dipendenza del processo; può offrire editor, terminale, diff e Git. Il gate umano non dipende dall'IDE.

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

### Development OS

[`DEVELOPMENT_OS.md`](./DEVELOPMENT_OS.md) definisce manifest, context resolution, fingerprint, validation cache ed evidence. Il CLI è in `tools/tretnix/` e scrive soltanto output locali ignorati sotto `.tretnix/`. L'adozione in un progetto richiede manifest e gate propri; Tretnix.com non viene modificato o pilotato automaticamente.

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
7. superare i controlli disponibili e pertinenti;
8. essere unita solo dopo approvazione.

Per questa repository, prima del commit eseguire almeno su Windows:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate_knowledge.ps1
git -c core.whitespace=cr-at-eol diff --check
git status --short
```

Per **questa repository**, il validator Knowledge supporta esplicitamente anche file staged. Dopo `git add`, può quindi essere ripetuto insieme a:

```powershell
git -c core.whitespace=cr-at-eol diff --cached --check
```

Questa è una proprietà del validator Knowledge, non una regola universale: i CCP seguono lo staged-state contract dichiarato per ciascun validator.

Su ambienti con Python è ammesso il comando equivalente:

```text
python scripts/validate_knowledge.py
```

Dichiarare soltanto controlli realmente eseguiti.

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
| Dossier portfolio o case study cliente | `case-studies/`, secondo `CASE_STUDY_STANDARD.md` |
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
ChatGPT + Codex + GitHub
```

Cursor resta editor/superficie manuale opzionale. Lovable resta storico/provenance; altri reviewer sono opzionali e intervengono soltanto dopo un checkpoint.

Ordine operativo:

1. ChatGPT prepara una specifica approvabile;
2. GitHub registra branch, task e checkpoint;
3. Codex esegue l'analisi o l'implementazione circoscritta nel working tree verificato;
4. l'owner controlla stato, diff ed evidence nella superficie scelta;
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
- nessun editor, agente o reviewer modifica contemporaneamente gli stessi file del writer.

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
