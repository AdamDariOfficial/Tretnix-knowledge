# Tretnix Intelligence — Operational Runbook

**Versione:** 1.0
**Aggiornato:** 26 settembre 2026
**Stato:** runbook canonico per operatività staging; activation runtime classificata in `CURRENT_STATE.md`
**Ambito:** runtime Tretnix Intelligence ricorrente, Windows Scheduled Task, staging Inbox, human-review boundary

---

## 1. Scopo

Questo runbook descrive come verificare, osservare e mettere in sicurezza Tretnix Intelligence dopo l'attivazione ricorrente su staging.

Non autorizza production, scritture automatiche nella Tretnix Knowledge, decisioni automatiche di review, migration o deploy.

---

## 2. Architettura operativa

```text
Windows Scheduled Task
Tretnix Intelligence
AtLogOn / IgnoreNew
↓
LONG_RUNNING_DAEMON
↓
discovery
↓
acquisizione
↓
codex_preprocess.py
↓
semantic batch bounded per creator
↓
candidate / provenance update
↓
review package
↓
staging Inbox sync
↓
PENDING HUMAN REVIEW
```

Il daemon è intenzionalmente long-running. Lo stato sano del task è normalmente `Running`, non un exit code terminale.

---

## 3. Invarianti obbligatorie

```text
scheduled adapter = codex_preprocess.py
max_semantic_calls_per_batch = 1
per-video semantic fallback = disabled
human review = mandatory
Knowledge automatic write = disabled
production mutation = disabled
```

Quando l'automazione ricorrente è attiva, la configurazione canonica deve inoltre mantenere coerenti:

```text
intelligence.auto_batch_enabled = true
inbox_sync.enabled = true
inbox_sync.auto_sync_enabled = true
```

---

## 4. Scheduler contract

```text
Name: Tretnix Intelligence
Execution model: LONG_RUNNING_DAEMON
Trigger: AtLogOn
MultipleInstancesPolicy: IgnoreNew
Restart policy: 3 attempts / 5 minutes
Execution time limit: unlimited
```

Un errore `AccessDenied` durante il readback del task NON equivale a task assente. Lo stato deve essere classificato `UNKNOWN / ACCESS_REQUIRED` e il controllo deve fallire chiuso.

---

## 5. Health check

Verificare:

- una sola task scheduler;
- task enabled e `Running` durante il daemon;
- una sola radice logica daemon;
- heartbeat/log/state progression;
- completamento dei cicli interni;
- assenza di restart/crash loop;
- assenza di `legacy_analyzer.py`;
- nessun backlog bloccato anomalo.

Su Windows possono essere visibili due PID padre→figlio per launcher virtualenv e interprete Python: non costituiscono due daemon se appartengono alla stessa radice scheduler.

---

## 6. Ciclo normale

### NOOP

Se non esistono nuovi input:

- discovery completata;
- nessun job duplicato;
- model calls 0;
- staging writes 0;
- daemon continua a funzionare.

Non creare input artificiale per testare il sistema.

### ACTIVE

Se esistono nuovi input reali:

1. discovery;
2. preprocessing;
3. determinazione dell'eleggibilità semantic batch;
4. al massimo una model call per batch;
5. candidate/provenance update;
6. review package;
7. sync soltanto di package nuovi o materialmente cambiati;
8. item remoto ancora `pending`.

---

## 7. Semantic-call boundary

Una model call reale è ammessa soltanto quando esiste un batch semanticamente eleggibile e irrisolto.

Obblighi:

- una call massima per batch;
- nessun fallback per singolo video;
- nessun replay di lavoro già `covered/completed`;
- raw provider artifact preservato;
- usage registrato;
- duplicate `knowledge_ref` normalizzati deterministicamente;
- provenance aggiuntiva conservata;
- unresolved/malformed Knowledge refs ancora fail-closed.

Se una call è stata consumata e fallisce un passaggio downstream, non rilanciarla automaticamente. Preservare gli artefatti e privilegiare recovery deterministica.

---

## 8. Canonical payload / hash

Python producer e JavaScript server devono condividere lo stesso contratto canonico.

- integer-valued float convergono alla rappresentazione JavaScript attesa;
- `0.0` e casi equivalenti non producono hash divergenti;
- NaN e ±Infinity vengono rifiutati;
- canonical bytes e SHA-256 coincidono cross-language per le fixture approvate.

Non indebolire il controllo hash per aggirare una divergenza.

---

## 9. Staging Inbox sync

Destinazione automatica autorizzata:

```text
tretnix-staging
```

Inviare soltanto package nuovi, materialmente cambiati ed eleggibili.

Dopo una mutation staging rilevante, il readback deve verificare identity, remote ID, disposition, producer, request nonce, timestamp, server-native payload hash, struttura payload, `review_status = pending`, review fields null e zero automatic human-review events.

---

## 10. Human-review boundary

L'automazione NON decide:

- `approve_as_candidate`;
- `reject`;
- `send_to_test`;
- `already_known`;
- `needs_more_evidence`.

Queste restano decisioni umane.

---

## 11. Knowledge boundary

La Tretnix Knowledge non viene scritta automaticamente dal runtime Intelligence.

```text
staging Inbox
↓
human review
↓
decisione esplicita
↓
formalizzazione Knowledge controllata
↓
Git diff / validation / review
```

Un candidate Intelligence non diventa decisione Tretnix soltanto perché è stato classificato o sincronizzato.

---

## 12. Fail-closed

Se lo stato diventa incerto:

1. impedire nuovi cicli se necessario;
2. disabilitare il task scheduler;
3. fermare il daemon se necessario;
4. ripristinare i flag automatici al checkpoint sicuro quando appropriato;
5. non cancellare evidence;
6. non ripetere una model call già consumata;
7. non tentare rollback cieco di sync staging riusciti;
8. classificare l'esito `REVIEW_REQUIRED`.

Safe-state di riferimento:

```text
scheduler disabled
auto_batch = false
inbox_sync.enabled = false
auto_sync = false
max_semantic_calls_per_batch = 1
```

---

## 13. Riattivazione dopo fail-closed

Prima della riattivazione:

- causa confermata;
- config diff revisionato;
- test/regressioni pertinenti PASS;
- scheduler definition verificata;
- nessun processo residuo concorrente;
- snapshot locale disponibile;
- staging baseline letta se il failure coinvolge sync;
- consumed semantic call auditata se presente.

Riattivare in un singolo workstream controllato con rollback esplicito.

---

## 14. Evidence

Le evidence locali devono vivere in path controllati e non versionati, per esempio:

```text
%LOCALAPPDATA%\Tretnix\controlled-change-backups\
```

Non inserire nei report pubblici token, secret, cookie, env sensibili, valori HMAC o credenziali.

Checkpoint activation riportato:

```text
intelligence-recurring-activation-030/20260925T142337Z
```

Manifest SHA-256 riportato:

```text
7A57D0BC8A337D1F481C63AED710D810507365CF7272B051CACB1B07387BCAFF
```

Questa evidence resta `HR` finché non viene verificata indipendentemente o riconciliata tramite artefatti versionati.

---

## 15. Baseline operativa riportata — 25 settembre 2026

Il closeout activation riporta:

```text
FULLY_AUTOMATED_STAGING_OPERATIONAL
ACTIVATION_PASS_FIRST_CYCLE_ACTIVE
```

Primo ciclo:

- 2 input TikTok reali;
- preprocess 2/2;
- 1 semantic batch;
- 1 model call reale;
- nessun fallback/retry;
- candidate count 18 → 18;
- solo `TTK-006` aggiornato;
- auto-sync 13/13;
- 6 mutation staging effettive;
- server-native readback 6/6;
- human-review boundary PASS;
- Knowledge writes 0;
- production mutations 0;
- validation finale riportata 141/141 PASS.

Questi numeri descrivono il checkpoint riportato, non una garanzia permanente di stato futuro.

---

## 16. Modifiche al runtime

Prima di modificare scheduled config, installer, daemon, preprocessing, semantic provider, canonical hash, candidate validation o Inbox sync, creare un nuovo checkpoint e trattare il cambiamento come task controllato.

Dopo una modifica significativa:

1. validation locale;
2. regressioni mirate;
3. controlled recurring-cycle su stato isolato;
4. activation/readback controllato quando richiesto.

---

## 17. Production boundary

Questo runbook riguarda **staging**.

Non autorizza production worker activation, production Inbox sync, production D1 write, migration, DNS, deploy o automatic Knowledge write.

La promotion production richiede un gate dedicato con rollback, sicurezza e readback propri.

---

## 18. Dipendenze operative esterne

Rischi normali da monitorare:

- disponibilità e comportamento TikTok;
- autenticazione/sessione della sorgente;
- disponibilità e limiti del modello;
- Cloudflare staging;
- rete locale;
- Windows Scheduled Task / sessione utente.

Un failure esterno non giustifica bypass di hash, review boundary, retry guard o security boundary.
