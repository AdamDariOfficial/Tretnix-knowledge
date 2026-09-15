# Tretnix Development OS CLI

**Versione:** 1.1
**Aggiornato:** 15 settembre 2026
**Stato:** candidate sperimentale fino al pilot approvato

Il CLI è Node ESM dependency-free e scrive esclusivamente output derivati sotto `.tretnix/`.

## Comandi

```powershell
node tools/tretnix/tretnix.mjs doctor --repo .
node tools/tretnix/tretnix.mjs preflight --repo .
node tools/tretnix/tretnix.mjs preflight --repo . --require-clean
node tools/tretnix/tretnix.mjs context --repo . --task templates/TRETNIX_TASK_DESCRIPTOR.json
node tools/tretnix/tretnix.mjs validate --repo . --task templates/TRETNIX_TASK_DESCRIPTOR.json
node tools/tretnix/tretnix.mjs evidence --repo .
node tools/tretnix/tretnix.mjs cache status --repo .
node tools/tretnix/tretnix.mjs cache clear --repo .
```

`doctor` verifica runtime, Git, corrispondenza effettiva schema/runtime e validità dei template, identity e disponibilità dei comandi dichiarati. `preflight` raccoglie remote, branch, HEAD, staged/unstaged/untracked, sensitive path nominali/reali e alias, file generati e fingerprint dei byte reali, inclusi i tracked LF/CRLF normalizzati da Git. `context` esegue prima il preflight, applica source allowlist/containment, include `local_decisions` nel Layer A e genera un pack deterministico. `validate` esegue preflight, context quando esiste un task, unione conservativa delle classi osservate/richieste e cache exact-state. `evidence` confronta repository/remote, branch, HEAD, fingerprint e identità manifest/task prima di rigenerare il report più recente: `STALE_EVIDENCE` richiede nuova validation e preserva JSON/report storici. `cache clear` elimina soltanto context e validation cache, non evidence.

## Output locali

```text
.tretnix/
├── cache/
│   ├── context/<key>/
│   └── validation/<key>/
├── evidence/<run-id>/
│   ├── evidence.json
│   └── report.md
└── runtime/
    ├── TASK_CONTEXT.md
    ├── context.json
    ├── preflight.json
    └── latest-evidence.json
```

La directory è gitignored. I validator sono tokenizzati, eseguiti senza shell e limitati a profili locali/read-only, con timeout. Nessun comando esegue stage, commit, push, PR, merge, deploy, publish, migration, DNS, infrastructure/provisioning, secret mutation o production write.

La grammar argv è chiusa: un solo script Node (opzionalmente `--test`/`--check`), un solo `.py`, `-File` PowerShell locale (opzionalmente `-NoProfile -ExecutionPolicy Bypass`) e forme Git read-only esplicite. Package script ammessi sono risolti all'argv interno verificato, senza shell/lifecycle hook. Flag arbitrari, eval concatenati, module/preload/loader/import injection e profili sconosciuti sono rifiutati; `allowed_executables` non amplia le grammar implementate. Script locali autorizzati restano soggetti a review, non un sandbox.

Ogni child cache letto è verificato autonomamente per containment lessicale/reale, assenza di alias e regular-file. `.tretnix/` e le directory critiche cache/runtime/evidence devono essere directory reali nel namespace canonico: symlink/junction/reparse point, anche interni al repository, bloccano letture cache, scritture e cleanup con errore esplicito e preservano i sorgenti. Prima di letture/hash exact-state di tracked, untracked, lockfile e manifest vengono valutati path nominale, realpath e ogni componente della catena. Path sensibili o aliasati usano soltanto metadata/sentinel con hash `null`, rendono lo stato non cache-eligible e interrompono entrambi i diff di contenuto. Un target reale sensibile resta classificato sensibile. Raw stdout/stderr dei validator restano transitori: cache/evidence conservano metadata, digest dell'output e risultati, non log raw. Eventuali log legacy sono confinati ma non letti; `cache clear` li elimina.

## Exit code

- `0`: comando completato; per `validate`, nessun validator automatico è fallito;
- `1`: input, schema, source, cache non recuperabile o validator fallito;
- `2`: `doctor` o `preflight` ha rilevato un requisito non soddisfatto.

Un exit code `0` non converte gate manuali/live in `PASS`: consultarli in `evidence.json`.

## Test

```powershell
node --test tools/tretnix/tests/tretnix.test.mjs
```

I test usano repository Git temporanei e coprono schema validi/invalidi, cache, staged/unstaged/untracked, EOL, path con spazi, containment/symlink, wrapper vietati, timeout, evidence e CLI end-to-end. Non modificano repository di progetto esterni.

`Tretnix-knowledge` abilita intenzionalmente solo classi adatte a un repository documentale. `frontend` e `backend` restano classi runtime disponibili per manifest applicativi che dichiarano prefix, capability e validator reali; se una classe non è configurata il planner fallisce in sicurezza.

## Controlled Change Package

Preflight, fingerprint, source hash, digest dell'output ed evidence possono essere allegati a un Controlled Change Package sullo stesso exact state. La conservazione controllata dei log nel CCP resta separata e non abilita raw output nella cache Development OS. `Apply`, `Validate`, payload allowlist/hash, diff review e gate live/manuali restano separati secondo `skills/CONTROLLED_CHANGE_PACKAGE.md`; il CLI non li autorizza né li sostituisce.
