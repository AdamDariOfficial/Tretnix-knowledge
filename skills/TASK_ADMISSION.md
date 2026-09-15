# Task Admission

**Stato:** candidate riutilizzabile; canonica dopo review e merge
**Versione:** 1.0
**Aggiornato:** 14 settembre 2026
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
