# Task Admission

**Stato:** procedura canonica nella Knowledge, merged con Development OS v1; adozione applicativa soggetta ai gate del progetto
**Versione:** 1.2
**Aggiornato:** 16 settembre 2026
**Ambito:** task Codex Tretnix non banali

---

## 1. Trigger

Usare prima di assegnare a Codex un task non banale. L'ammissione riduce ambiguità; non sostituisce la specifica e non autorizza gate esterni.

## 2. Verifiche obbligatorie

Registrare:

- repository, remote, branch e full `HEAD`;
- stato Git iniziale e writer esclusivo;
- stato lifecycle e gate applicabili;
- decisioni, standard, `AGENTS.md`, status e fonti specifiche;
- data e modello Codex raccomandato tra quelli realmente disponibili, con motivazione di rischio, complessità e costo;
- scope consentito ed esclusioni;
- acceptance criteria osservabili;
- classi di rischio e validation;
- azioni vietate.

Se repository, baseline, writer, scope o gate necessario non sono determinabili, classificare `NOT_ADMITTED` e fermare la fase di scrittura.

Quando il repository adotta Development OS, verificare inoltre `doctor` e `preflight`, mapping dei tag, source allowlist, task class supportata e capability minime. Un context pack o cache hit non amplia scope o autorizzazioni.

Per la prima adozione applicativa, adattare `templates/TRETNIX_PROJECT_MANIFEST.json` e `templates/TRETNIX_TASK_DESCRIPTOR.json` dalla Knowledge, senza copiarne `schemas/`, `templates/` o tooling nel progetto. Eseguire inizialmente solo `doctor --repo <app> --knowledge <checkout-Knowledge-canonico>`: il comando non scrive e può segnalare `RUNTIME_NOT_IGNORED` prima che `.tretnix/` esista. Prima di preflight/context/validate/evidence/cache clear, aggiungere `.tretnix/` al `.gitignore` radice tracciato con normale modifica Git revisionata; ignore globali/locali non garantiscono portabilità e vengono rifiutati. Il tooling non modifica `.gitignore`. Passare la stessa root Knowledge esplicita a context, validate ed evidence; la root applicativa resta separata e nessun path assoluto viene persistito nel manifest. Revisionare gli script locali e dichiarare `reviewed_script` con ID, path, SHA-256 e capability esatte: le sole etichette nel manifest non provano capability; l'attestazione non abilita riuso della cache. Un'evidence con validator dipendenti da stato ignorato richiede nuova validation per essere aggiornata. Dichiarare validator reali, capability e classi supportate prima del pilot: la sola validità strutturale del template non costituisce adozione.

Ammettere solo validator che lasciano invariato lo stato applicativo tracciato/untracked della run; una mutazione interrompe la validation con `APPLICATION_STATE_DRIFT` e richiede review dello stato rimasto, senza nuova evidence corrente.

## 3. Output

Produrre un descriptor conforme a [`../schemas/tretnix-task.schema.json`](../schemas/tretnix-task.schema.json) e mantenere nella specifica umana i dettagli non rappresentabili senza perdita.

Classificazione task:

- `docs_only` soltanto con allowlist inequivocabile;
- `frontend` per UI, route client e asset integration;
- `backend` per API e logica server;
- `security_or_data` per auth, autorizzazione, dati, migrazioni e ambiguità ad alto impatto;
- `release_or_infra` per release, CI, provider e configurazioni di rilascio.

## 4. Gate

`PREPARATION_COMPLETE` non equivale a `IMPLEMENTATION_AUTHORIZED`. Modello, context pack o prompt pronto non autorizzano push, PR, deploy, migration, DNS, spesa, provisioning, secret o production write.

## 5. Handoff

Il report di ammissione indica chiaramente `ADMITTED`, `NOT_ADMITTED` o `REVIEW_REQUIRED`, le evidenze usate e il prossimo gate umano.
