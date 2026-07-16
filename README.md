# Tretnix Knowledge

Fonte canonica per identità, decisioni, standard tecnici, repository, procedure operative e adattatori degli strumenti Tretnix.

**Versione:** 1.1  
**Aggiornato:** 16 luglio 2026  
**Stato:** operativo iniziale  
**Visibilità consigliata:** repository GitHub privato

---

## 1. Scopo

`tretnix-knowledge` impedisce che ChatGPT, Lovable, Cursor, Claude Code o altri strumenti mantengano versioni contraddittorie di Tretnix.

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
├── .gitignore
│
├── compiled/
│   ├── README.md
│   ├── CHATGPT_PROJECT_INSTRUCTIONS.md
│   ├── LOVABLE_WORKSPACE_KNOWLEDGE.md
│   └── CURSOR_USER_RULES.md
│
├── templates/
│   ├── READ_ONLY_AUDIT.md
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

- `AGENTS.md`;
- `.cursorignore`;
- regola Cursor iniziale.

### `project-kits/forno-lume-start`

Contiene la configurazione già adattata al progetto pilota Forno Lume START.

Il kit deve essere copiato nella root del repository `forno-lume-START` tramite branch dedicata. Non modifica il sito o il comportamento runtime.

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
- kit di adozione.

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

Per il progetto pilota usare:

```text
project-kits/forno-lume-start/
```

### Claude Code

Non è una dipendenza necessaria della prima fase. Verrà aggiunto soltanto dopo aver verificato quanto Cursor copre il processo Tretnix.

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
chore/add-cursor-adapters
audit/add-new-repository
```

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
| Adattatore di uno strumento | `compiled/` |
| Base riutilizzabile | `templates/` |
| Configurazione pronta per un progetto | `project-kits/` |
| Stato di un progetto | repository del progetto, `docs/STATUS.md` |
| Attività futura | GitHub Issue o `docs/ROADMAP.md` |
| Bug rilevato | audit o GitHub Issue |

---

## 12. Adozione iniziale

La prima adozione rimane:

```text
ChatGPT + Lovable + GitHub + Cursor
```

Ordine operativo:

1. mantenere questa repository privata;
2. copiare le istruzioni ChatGPT nel progetto Tretnix;
3. copiare la Workspace Knowledge in Lovable;
4. installare Cursor;
5. impostare le User Rules;
6. aprire `forno-lume-START`;
7. copiare il project kit tramite branch dedicata;
8. eseguire il primo audit in sola lettura;
9. revisionare il report;
10. correggere una sola categoria alla volta;
11. trasformare procedure verificate in skill;
12. valutare Claude Code soltanto quando emergerà un bisogno concreto.

---

## 13. Limitazioni

Questa versione documenta le informazioni già definite e prepara gli strumenti, ma non sostituisce l’audit dei repository.

Gli aspetti tecnici non ancora verificati nel codice devono restare marcati come:

- da verificare;
- probabili;
- noti per segnalazione;
- non ancora auditati.

Non dichiarare una vulnerabilità, una build riuscita o un comportamento del codice come confermato senza evidenza.
