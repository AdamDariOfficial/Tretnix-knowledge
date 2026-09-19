# Tretnix Development OS CLI

**Versione:** 1.4
**Aggiornato:** 18 settembre 2026
**Stato:** CLI v1 ed enablement del pilot applicativo merged nella Knowledge; prima adozione applicativa in corso, non completata

Il CLI è Node ESM dependency-free e scrive esclusivamente output derivati sotto `.tretnix/`.

I merge nella Knowledge sono registrati in `CURRENT_STATE.md`: v1 base con PR `#22`, enablement applicativo con PR `#27`. Il gate tooling Knowledge è stato verificato; il pilot su RITO Studio BUSINESS PLUS è `IN PROGRESS` e l'adozione nel repository applicativo resta da completare. Il dogfood su questa Knowledge non costituisce pilot applicativo; l'adozione richiede checkpoint stabile e gate del progetto. Adattare il task descriptor di esempio a obiettivo, scope, classe e branch effettivi prima dell'uso; i descriptor locali possono restare sotto `.tretnix/runtime/`.

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

Per un'applicazione con checkout Knowledge separato, eseguire il CLI da quella Knowledge senza copiarne schema, template o sorgenti nell'applicazione:

```powershell
node tools/tretnix/tretnix.mjs doctor --repo <app> --knowledge <Knowledge>
node tools/tretnix/tretnix.mjs context --repo <app> --task <descriptor-relativo-app> --knowledge <Knowledge>
node tools/tretnix/tretnix.mjs validate --repo <app> --task <descriptor-relativo-app> --knowledge <Knowledge>
node tools/tretnix/tretnix.mjs evidence --repo <app> --knowledge <Knowledge>
```

`--repo` conserva identità/fingerprint e containment dei sorgenti applicativi; `--knowledge` seleziona la root Git reale dei contratti e delle fonti Knowledge, senza alias. Il tooling verifica il remote `origin` canonico e la corrispondenza dei contratti; l'operatore verifica l'autorità del checkout. Il default locale supporta soltanto il dogfood del repository Knowledge identificato dal remote, non applicazioni con copie dei contratti. Root assente: `MISSING_KNOWLEDGE_ROOT`. Non si cercano directory sorelle e non si scaricano schema. `$schema` resta metadata, senza risoluzione come path/URL. `preflight` non richiede fonti Knowledge; `evidence` applicativo richiede la stessa root esplicita usata da `validate`.

Prima del bootstrap, aggiungere `.tretnix/` al `.gitignore` radice tracciato tramite normale modifica revisionata. Git deve confermare che la regola vincente ignora l'intera directory; ignore globali o `.git/info/exclude`, ignore dei soli figli e runtime tracciato sono rifiutati. `RUNTIME_NOT_IGNORED` blocca ogni writer OS prima di creare output o avviare validator. `doctor` segnala il requisito senza scrivere: è utilizzabile prima che `.tretnix/` esista. Nessun comando modifica automaticamente `.gitignore`.

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

La grammar argv è chiusa: un solo script Node `.js/.mjs/.cjs` (opzionalmente `--test`/`--check`), il profilo Node `.ts` ristretto descritto sotto, un solo `.py`, `-File` PowerShell locale (opzionalmente `-NoProfile -ExecutionPolicy Bypass`) e forme Git read-only esplicite. Package script ammessi sono risolti all'argv interno verificato, senza shell/lifecycle hook. Flag arbitrari, eval concatenati, module/preload/loader/import injection e profili sconosciuti sono rifiutati; `allowed_executables` non amplia le grammar implementate. Script locali autorizzati restano soggetti a review, non un sandbox.

Ogni child cache letto è verificato autonomamente per containment lessicale/reale, assenza di alias e regular-file. `.tretnix/` e le directory critiche cache/runtime/evidence devono essere directory reali nel namespace canonico: symlink/junction/reparse point, anche interni al repository, bloccano letture cache, scritture e cleanup con errore esplicito e preservano i sorgenti. Prima di letture/hash exact-state di tracked, untracked, lockfile e manifest vengono valutati path nominale, realpath e ogni componente della catena. Path sensibili o aliasati usano soltanto metadata/sentinel con hash `null`, rendono lo stato non cache-eligible e interrompono entrambi i diff di contenuto. Un target reale sensibile resta classificato sensibile. Raw stdout/stderr dei validator restano transitori: cache/evidence conservano metadata, digest dell'output e risultati, non log raw. Eventuali log legacy sono confinati ma non letti; `cache clear` li elimina.

## Profili applicativi

I profili applicativi ammessi sono soltanto `tsc --noEmit`, `eslint .`, `vite build` e `node --experimental-strip-types <unico-file-locale.ts>`. I tre package bin vengono eseguiti dal Node corrente usando target fissi in `node_modules/typescript/bin/tsc`, `node_modules/eslint/bin/eslint.js`, `node_modules/vite/bin/vite.js`, dopo verifica di dipendenza dichiarata, identità/versione/bin installati e containment senza alias. Nessuna risoluzione PATH, shim `.bin`, fallback globale o installazione. Layout installati con symlink/junction falliscono chiusi; la grammar non supporta executable arbitrari.

`bun run <script-esatto>` e gli altri package wrapper già ammessi risolvono l'argv interno senza richiedere il package manager né eseguire hook lifecycle. `doctor` prepara senza eseguire: distingue `PASS`, `UNAVAILABLE`, `UNSAFE`, `MALFORMED`. Node TS usa il Node corrente con verifica del supporto al flag. Le capability dichiarate diventano effettive solo entro il ceiling del profilo fisso (TSC `typecheck`, ESLint `lint`, Vite build `build`, Git diff check `whitespace`) oppure con `reviewed_script` revisionato, vincolato a `validator_id`, path locale confinato, SHA-256 canonico e insieme esatto di capability. Per questo solo hash i byte CRLF sono convertiti in memoria a LF; lone CR, encoding, newline finale e ogni altro byte restano significativi. Il manifest non costituisce una review automatica dello script: un cambio significativo di questi campi o della sorgente richiede nuova approvazione. Questa equivalenza EOL non modifica il fingerprint e non rende riusabili script locali, package script o bin TSC/ESLint/Vite: input ignorati/transitivi possono variare e i risultati conservano `reusable: false`. Solo il Git diff check ammesso conserva HIT su stato Git pulito equivalente; con modifiche locali viene rieseguito perché attributi/configurazioni Git non fingerprintati possono influenzarlo. Nessun floor delle classi viene ridotto. Reviewed-script contract: `1.2.0`; resolver: `1.3.0`; validation cache: `1.4.0`; fingerprint: `1.2.1`; schema: v1.

Ogni validator deve lasciare invariato lo stato applicativo ammesso. Il fingerprint viene verificato prima di eseguire o riusare un risultato, dopo ogni esecuzione e prima di scrivere evidence; lo script attestato viene ricontrollato per hash prima e dopo l'esecuzione. `APPLICATION_STATE_DRIFT` interrompe la run senza nuova evidence corrente e lascia le modifiche visibili per la review. Un validator che genera output tracciati o non ignorati deve essere adattato prima dell'adozione.

L'evidence registra identità e digest dei contratti Knowledge e ricontrolla le fonti `knowledge:` sul replay. Un report con validator nuovi che dipendono da file ignorati non può essere ripresentato con `evidence`: eseguire nuovamente `validate`. Anche evidenze storiche senza identità Knowledge richiedono nuova validation. Lo schema evidence v1 aggiunge un campo opzionale per preservare la lettura storica; il replay richiede il nuovo campo.

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
