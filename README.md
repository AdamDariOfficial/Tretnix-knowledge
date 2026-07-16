# Tretnix Knowledge

Versione iniziale della fonte canonica per identità, decisioni, standard tecnici, repository e procedure operative di Tretnix.

**Versione:** 1.0  
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
- in futuro, template e skill riutilizzabili.

GitHub conserva la verità versionata. Le chat aiutano a ragionare, ma non sostituiscono la documentazione canonica.

---

## 2. Principio guida

> Memory ricorda chi siamo. Knowledge descrive ciò che sappiamo. Instructions stabiliscono le regole. Skills stabiliscono come lavoriamo. GitHub conserva la verità.

---

## 3. File presenti

| File | Funzione | Natura |
|---|---|---|
| [`TRETNIX_MASTER_CONTEXT.md`](./TRETNIX_MASTER_CONTEXT.md) | Contesto aziendale e operativo complessivo | Descrittiva |
| [`DEVELOPMENT_STANDARDS.md`](./DEVELOPMENT_STANDARDS.md) | Regole tecniche trasversali | Normativa |
| [`DECISIONS.md`](./DECISIONS.md) | Decisioni approvate e motivazioni | Normativa |
| [`REPOSITORY_INDEX.md`](./REPOSITORY_INDEX.md) | Inventario e ruolo dei progetti | Descrittiva |
| [`templates/READ_ONLY_AUDIT.md`](./templates/READ_ONLY_AUDIT.md) | Procedura standard di audit senza modifiche | Operativa |

---

## 4. Ordine di autorità

Quando due fonti sembrano contraddirsi, usare questo ordine:

1. decisioni approvate in `DECISIONS.md`;
2. standard normativi in `DEVELOPMENT_STANDARDS.md`;
3. documentazione specifica del singolo repository;
4. specifica approvata del task corrente;
5. implementazione verificata nel codice e nel deploy;
6. conversazioni e memoria, usate per recuperare contesto da formalizzare.

Una chat non modifica automaticamente una decisione canonica. Una nuova decisione deve essere registrata e versionata.

---

## 5. Separazione delle responsabilità

### Questa repository contiene

- conoscenza stabile;
- regole condivise;
- decisioni;
- procedure ricorrenti;
- indice dei progetti;
- modelli riutilizzabili.

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

## 6. Uso con gli strumenti

### ChatGPT

Usare questa repository per:

- strategia;
- specifiche;
- criteri di accettazione;
- confronto tra report;
- revisione degli audit;
- documentazione;
- preparazione dei task.

ChatGPT coordina il lavoro, ma le decisioni definitive devono essere riportate qui.

### Lovable

Usare contenuti compilati e sintetici derivati da questi file:

- regole globali di workspace;
- knowledge specifica del progetto;
- specifiche di feature;
- criteri di accettazione.

Non copiare indiscriminatamente tutto il master context dentro ogni progetto Lovable.

### Cursor

Uso iniziale consigliato:

- IDE principale;
- lettura del repository;
- terminale;
- controllo dei diff;
- audit;
- debugging;
- typecheck, lint, test e build;
- implementazioni circoscritte.

Ogni progetto dovrà progressivamente includere:

```text
AGENTS.md
.cursor/rules/
.cursorignore
docs/
```

### Claude Code

Non è una dipendenza necessaria della prima fase. Potrà essere aggiunto per:

- audit indipendenti;
- RLS e sicurezza;
- migrazioni;
- refactoring estesi;
- secondo reviewer tecnico.

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

## 7. Modalità di aggiornamento

Ogni modifica significativa deve:

1. essere eseguita in una branch dedicata;
2. modificare soltanto i documenti pertinenti;
3. indicare perché il contenuto cambia;
4. evitare duplicazioni;
5. aggiornare la data o la versione quando necessario;
6. essere revisionata tramite diff;
7. essere unita solo dopo approvazione.

Esempi di branch:

```text
docs/update-development-standards
docs/add-hospitality-patterns
docs/record-route-scroll-decision
audit/add-new-repository
```

---

## 8. Regole per aggiungere nuovi contenuti

Prima di aggiungere una nuova informazione, chiedere:

- è stabile oppure temporanea?
- vale per tutti i progetti oppure per uno solo?
- è una regola, una decisione, uno stato o un task?
- esiste già in un altro file?
- è confermata oppure ancora da verificare?
- deve diventare canonica oppure è soltanto un’osservazione?

### Destinazione corretta

| Tipo di informazione | Destinazione |
|---|---|
| Identità e modello operativo | `TRETNIX_MASTER_CONTEXT.md` |
| Regola tecnica condivisa | `DEVELOPMENT_STANDARDS.md` |
| Scelta approvata | `DECISIONS.md` |
| Repository o relazione tra progetti | `REPOSITORY_INDEX.md` |
| Procedura ricorrente | `templates/` o futura `skills/` |
| Stato di un progetto | repository del progetto, `docs/STATUS.md` |
| Attività futura | GitHub Issue o `docs/ROADMAP.md` |
| Bug rilevato | audit o GitHub Issue |

---

## 9. Adozione iniziale

La prima adozione deve rimanere semplice:

```text
ChatGPT + Lovable + GitHub + Cursor
```

Ordine operativo:

1. pubblicare questa repository privata;
2. installare Cursor;
3. aprire `forno-lume-START`;
4. aggiungere le istruzioni locali senza modificare il sito;
5. eseguire il primo audit in sola lettura;
6. revisionare il report;
7. correggere una sola categoria alla volta;
8. trasformare le procedure realmente funzionanti in skill;
9. estendere il sistema a `forno-lume-BUSINESS`;
10. estenderlo a `tretnix`;
11. valutare Claude Code soltanto quando emergerà un bisogno concreto.

---

## 10. Limitazioni della versione 1

Questa prima versione documenta le informazioni già definite. Non sostituisce l’audit dei repository.

Gli aspetti tecnici non ancora verificati nel codice sono esplicitamente marcati come:

- da verificare;
- probabili;
- noti per segnalazione;
- non ancora auditati.

Non dichiarare una vulnerabilità, una build riuscita o un comportamento del codice come confermato senza evidenza.
