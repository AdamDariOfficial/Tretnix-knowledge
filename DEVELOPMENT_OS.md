# Tretnix Development OS

**Versione:** 1.4
**Aggiornato:** 18 settembre 2026
**Stato:** v1 e enablement del pilot applicativo merged nella Knowledge; gate tooling verificato per questo ciclo, prima adozione applicativa in corso

---

## 1. Scopo

Tretnix Development OS compila in modo deterministico le fonti canoniche e lo stato Git necessari a un task. Riduce riletture, ricostruzioni manuali e validazioni duplicate senza trasferire autorità alla cache o al tooling.

Principio:

> automatizzare raccolta, selezione, verifica e reporting; non automatizzare l'autorità.

Git e i documenti canonici restano fonti della verità. Cache, context pack ed evidence sono derivati locali e ricostruibili.

## 2. Architettura v1

```text
fonti canoniche + repository progetto
                ↓
       tretnix.project.json
          ↙             ↘
context resolver       preflight
       ↓                  ↓
TASK_CONTEXT.md     repo fingerprint
          ↘             ↙
        implementazione Codex
                ↓
       validazione delta-first
          ↙             ↘
 validation cache    nuova esecuzione
          ↘             ↙
     evidence.json + report.md
                ↓
          review + owner gate
```

La v1 usa Node ESM e soltanto moduli standard. Non introduce package, lockfile, servizio remoto, database, daemon, vector store, embeddings, dashboard o orchestrazione autonoma.

## 3. Project manifest e task descriptor

Ogni repository adottato dichiara `tretnix.project.json`, verificato a runtime dal contratto pubblicato in [`schemas/tretnix-project.schema.json`](./schemas/tretnix-project.schema.json) e dalle invarianti Tretnix dichiarate in `x-tretnix-semantics`. Il validator dependency-free interpreta soltanto il vocabolario usato dai tre contratti locali, senza riferimenti remoti. `doctor` verifica anche che gli schema del progetto coincidano con i contratti del runtime, non soltanto che siano JSON validi. Il manifest indica identità, source allowlist, mapping dei tag, comandi reali, classi supportate, capability minime, validator e gate. Campi aggiuntivi, path assoluti/traversal, omissioni di safety action o capability insufficienti vengono rifiutati.

Il task descriptor usa [`schemas/tretnix-task.schema.json`](./schemas/tretnix-task.schema.json). È un indice machine-readable della specifica: non sostituisce requisiti umani complessi e non amplia scope o permessi.

Per un'applicazione separata, `doctor`, `context` e `validate` ricevono `--knowledge <checkout Knowledge canonico>`: `--repo` resta la root dell'identità, del fingerprint e delle fonti applicative; schema e template provengono dalla Knowledge. La root Knowledge deve essere una root Git reale, senza alias, con remote `origin` della Knowledge canonica e contratti pubblicati compatibili con il runtime. La verifica del remote non certifica approvazione owner o autenticità del checkout: l'operatore conferma l'autorità della fonte. Il default sullo stesso repository è ammesso soltanto per il dogfood della Knowledge identificata dal suo remote, non per applicazioni con copie dei contratti. Nessuna ricerca di directory sorelle, fetch di schema o copia di `schemas/`, `templates/` e tooling nell'applicazione. L'assenza della root produce `MISSING_KNOWLEDGE_ROOT`; contratti diversi o template non conformi bloccano context/validation. `$schema` è metadata descrittivo: il runtime usa i nomi canonici fissi, senza seguirlo come percorso o URL. Il manifest non persiste percorsi assoluti della Knowledge.

I template sono:

- [`templates/TRETNIX_PROJECT_MANIFEST.json`](./templates/TRETNIX_PROJECT_MANIFEST.json);
- [`templates/TRETNIX_TASK_DESCRIPTOR.json`](./templates/TRETNIX_TASK_DESCRIPTOR.json);
- [`templates/TRETNIX_EVIDENCE_SCHEMA.json`](./templates/TRETNIX_EVIDENCE_SCHEMA.json).

## 4. Context resolution e context cache

Il resolver costruisce `.tretnix/runtime/TASK_CONTEXT.md` con contenuto deterministico. Ogni blocco registra path, SHA-256, commit Knowledge quando applicabile, heading estratti e motivo di inclusione.

Layer:

1. manifest, task descriptor, decisioni locali approvate (`sources.local_decisions`), `AGENTS.md`, status e adapter compatti;
2. fonti mappate ai tag del task;
3. fonti richieste esplicitamente dal descriptor.

Un tag senza mapping, un file assente o un heading assente produce `MISSING_CONTEXT`; una fonte fuori allowlist o sensibile viene rifiutata prima della lettura. Manifest, task, fonti e output sono confinati alla root reale e rifiutano catene aliasate tramite symlink/junction/reparse point, anche interne al repository.

La chiave della context cache è SHA-256 della serializzazione canonica di:

- commit Knowledge;
- SHA-256 del manifest;
- SHA-256 del task descriptor;
- hash di `AGENTS.md` e status;
- hash ordinati delle fonti e degli heading selezionati;
- tag ordinati;
- versione del resolver.

Il task descriptor è incluso oltre al minimo della master spec perché il suo contenuto appare nel pack: ometterlo consentirebbe un riuso non equivalente.

Un hit richiede anche metadata v1, versione resolver, chiave e hash del pack coerenti. Cache corrotta o con contratto vecchio viene rifiutata e ricostruita. Timestamp e mtime non partecipano all'equivalenza.

## 5. Repository fingerprint

Per un albero pulito il fingerprint comprende:

- `HEAD`;
- SHA-256 del manifest;
- hash o assenza dei lockfile dichiarati;
- versione del contratto fingerprint.

In ogni stato include inoltre path e SHA-256 dei byte reali di tutti i tracked file non sensibili rilevanti (assenza esplicita per file eliminati). La scansione lineare privilegia correttezza e semplicità: Git può normalizzare LF/CRLF come equivalenti, il fingerprint no. La durata del preflight consente di misurarne il costo; non si usano mtime come prova di equivalenza.

Per un albero dirty comprende inoltre, in campi distinti:

- diff binario staged rispetto a `HEAD`;
- diff binario unstaged rispetto all'index;
- path e SHA-256 ordinati dei file untracked non ignorati;
- presenza nominale/reale e metadata, mai contenuto, di path sensibili o aliasati.

`.tretnix/` e `.git/` sono esclusi. Prima di qualsiasi lettura/hash di input exact-state o diff di contenuto vengono valutati path nominale, realpath e ogni componente della catena con soli metadata. La presenza di un path sensibile o aliasato tramite symlink/junction/reparse point, anche interno al repository, interrompe entrambi i diff binari (sentinel `null`), rende la cache non eleggibile e genera un'issue di preflight. Un target reale sensibile resta classificato sensibile. Il contenuto di `.env`, credenziali, chiavi, certificati e prefix sensibili dichiarati non viene letto né hashato, neppure se dichiarato come lockfile. Gli input non leggibili sono rappresentati con path, realpath relativo, componenti aliasati, presenza e hash `null`: non si legge un secret per ottenere equivalenza exact-state. Staged, unstaged e untracked restano distinguibili; in stato non sicuro i candidati unstaged sono raccolti tramite metadata Git, senza diff worktree. I file generati dichiarati vengono segnalati; output tipici non dichiarati sono issue di preflight e non vengono ripristinati automaticamente.

## 6. Delta-first validation e validation cache

Le classi v1 sono `docs_only`, `frontend`, `backend`, `security_or_data` e `release_or_infra`. Il piano usa l'unione di tutte le classi osservate sui path e della classe richiesta: il descriptor può aggiungere capability, mai sottrarle. Security + release richiede entrambe, anche quando i prefix si sovrappongono. Ogni repository dichiara quali supporta e le capability minime; il runtime applica floor conservativi e fallisce se i validator selezionati non li coprono. Un path ambiguo aggiunge `security_or_data`. `docs_only` come classe rappresentativa è ammessa soltanto quando ogni path è inequivocabilmente documentale e non sono richiesti controlli aggiuntivi.

Il manifest di `Tretnix-knowledge` abilita intenzionalmente soltanto `docs_only`, `security_or_data` e `release_or_infra`: non trasforma il repository documentale in un'applicazione. I repository applicativi possono abilitare `frontend` e `backend` soltanto dichiarando prefix, capability minime e validator pertinenti; una classe richiesta ma non configurata fallisce senza eseguire validator sostitutivi.

La chiave di un validator è SHA-256 della serializzazione canonica di:

- repository fingerprint;
- validator ID;
- comando esatto selezionato per la piattaforma;
- versione runtime pertinente;
- versione del contratto cache;
- versione del contratto del validator.
- classi effettive, capability richieste e validator selezionati nel piano.

Solo validator locali, deterministici, dichiarati cacheable e conclusi con exit code `0` possono produrre un hit. Metadata, digest dell'output e digest/contratto del risultato devono essere completi e coerenti. Raw stdout/stderr restano transitori nel processo e non vengono persistiti: un validator può stampare credenziali anche quando tutti i suoi input sono locali, quindi conservarne i log renderebbe impossibile la garanzia di esclusione dalla cache. Non si usa un secret scanner euristico. Ogni child cache consumato viene verificato autonomamente per containment lessicale/reale e regular-file prima della lettura; un escape fallisce chiuso, senza ricostruzione sul path pericoloso. Anche eventuali log legacy vengono confinati ma mai letti. `cache clear` rimuove i residui del vecchio contratto. Se l'equivalenza non è dimostrabile il comando viene eseguito. Modifiche security-sensitive riclassificano il task in modo conservativo; una prova di classe irrilevante non viene selezionata come sostituto.

I comandi sono tokenizzati ed eseguiti senza shell con grammar argv chiusa: il profilo Node preesistente accetta un solo script locale `.js/.mjs/.cjs`, opzionalmente `--test` o `--check`; il nuovo profilo `.ts` è descritto sotto; Python accetta un solo `.py`; PowerShell `-File` locale, opzionalmente preceduto dall'esatta coppia `-NoProfile -ExecutionPolicy Bypass`; Git soltanto le forme read-only esplicite nel runtime. Flag arbitrari, inline/eval concatenati, module/preload/loader/import injection, wrapper interpreter ed executable sconosciuti sono rifiutati. Un package script ammesso viene risolto all'argv interno verificato ed eseguito direttamente, senza shell o lifecycle hook. Non sono ammessi argomenti inoltrati agli script. Ogni validator ha un timeout: timeout, comando assente o policy violation producono evidence non-PASS. Script locali autorizzati restano codice soggetto a review, non un sandbox.

Browser, rete, backend live, staging, produzione, DNS, secret state, migrazioni remote, security review dipendenti da stato esterno e verifiche umane non sono prove riusabili. Restano `UNVERIFIED` finché non vengono eseguite direttamente.

### Profili applicativi locali

I profili aggiuntivi sono esattamente `tsc --noEmit`, `eslint .`, `vite build` e `node --experimental-strip-types <unico-file-locale.ts>`. Quest'ultimo richiede che il Node corrente supporti il flag. Nessun altro flag, target, server Vite, preload, loader, import injection o argomento inoltrato è ammesso. I package script, incluso `bun run <script-esatto>`, sono ispezionati senza avviare il package manager; hook `pre*`/`post*` non vengono eseguiti.

TSC/ESLint/Vite richiedono rispettivamente dipendenze dichiarate `typescript`, `eslint`, `vite`, installate sotto `node_modules/<package>/`. Nome, versione e bin metadata vengono controllati; i soli target ammessi sono `typescript/bin/tsc`, `eslint/bin/eslint.js`, `vite/bin/vite.js`. Ogni componente e target deve essere locale, regular-file dove richiesto e senza alias/reparse point. Si eseguono direttamente con `process.execPath`, senza shim `.bin`, ricerca PATH, fallback globale o installazione. Dipendenze/bin assenti producono `UNAVAILABLE`; installazioni con symlink, comprese quelle che richiedono layout aliasati, falliscono chiuse. Dipendenze, configurazioni e codice caricati restano soggetti a review: non vengono sandboxati.

Tutti gli script locali (Node JS/TS, Python e PowerShell), anche se invocati tramite package script, e TSC/ESLint/Vite non riusano la validation cache: il fingerprint non copre i loro possibili input ignorati/transitivi. `deterministic` e `cacheable` dichiarati non prevalgono su `cacheSafe: false` del profilo runtime. Ogni validation li riesegue; i metadata dei risultati restano con `reusable: false` e l'evidence non è rigenerabile come prova riusabile. L'esatta forma Git `git -c core.whitespace=cr-at-eol diff --check` conserva MISS → HIT soltanto con albero Git pulito; su un albero modificato viene rieseguita, poiché attributi/configurazioni Git locali non rappresentati nel fingerprint possono influenzare il risultato.

Una validation ammette un solo fingerprint applicativo: il runtime ricontrolla lo stato prima di ogni validator/cache HIT, dopo ogni esecuzione e immediatamente prima dell'evidence. I validator devono lasciare invariato lo stato del repository. Una mutazione produce `APPLICATION_STATE_DRIFT`, interrompe la run senza nuova evidence corrente e non viene ripristinata automaticamente. Per gli script con `reviewed_script`, il digest attestato viene ricontrollato prima e dopo l'esecuzione. Questi controlli preservano l'equivalenza pratica senza promettere locking del filesystem.

Le capability dichiarate non bastano a soddisfare i floor: TSC prova solo `typecheck`, ESLint solo `lint`, Vite build solo `build`, Git diff check solo `whitespace`. Uno script locale può attestare capability semantiche soltanto tramite `reviewed_script` nel manifest, soggetto a review dell'owner e vincolato a ID del validator, path confinato, SHA-256 dei byte dello script e insieme esatto di capability. Un cambio di identità, path, byte o capability richiede una nuova review e dichiarazione; l'attestazione non rende la cache riusabile e non dimostra da sola la correttezza semantica dello script. Il piano, i gate e l'evidence usano solo capability effettive. Il contratto della validation cache passa a `1.4.0` per il cambiamento delle condizioni di riuso/prova; resolver `1.3.0`, fingerprint `1.2.1` e schema v1 restano invariati.

L'evidence registra il commit, il remote e il digest dei sei contratti Knowledge; `validate` verifica che contratti e fonti `knowledge:` del context restino identici prima e dopo i validator. `evidence --knowledge <checkout>` ricontrolla queste identità e gli hash delle fonti prima di ripresentare un report applicativo. Una run con validator dipendenti da stato locale ignorato non è ripresentabile: richiede nuova `validate`. Il campo di identità Knowledge è additivo nello schema evidence v1; evidenze storiche prive del campo restano leggibili ma non ripresentabili.

## 7. Evidence

Ogni `validate` significativo genera sotto `.tretnix/evidence/<run-id>/`:

- `evidence.json`, secondo [`schemas/tretnix-evidence.schema.json`](./schemas/tretnix-evidence.schema.json);
- `report.md` derivato dagli stessi dati;
- metadata dei risultati, senza raw stdout/stderr o riferimenti a log persistiti.

L'evidence registra timestamp, preflight, fingerprint, stato Git, identità/hash di manifest e task, tutte le fonti context effettive con hash/versione, piano e capability, validator eseguiti o non eseguiti, comandi, exit code, cache hit/miss/rejection, gate automatici e ogni gate manuale/live. Schema e validator runtime controllano anche le strutture annidate e rifiutano proprietà, digest, path, timestamp, stati o metadata incoerenti. Gate richiesti non verificati restano `UNVERIFIED`; quelli non richiesti sono `NOT_REQUIRED`. `PASS` descrive soltanto i gate dichiarati e superati; un gate richiesto ancora aperto produce `REVIEW_REQUIRED`, un fallimento o comando indisponibile produce `FAIL`. `evidence` confronta repository/remote, branch, HEAD, fingerprint e identità manifest/task correnti prima di rigenerare il report: un mismatch produce `STALE_EVIDENCE`, exit non-zero e richiesta di nuova validation, preservando JSON/report storici.

## 8. Confini di automazione

Il tooling può scrivere soltanto sotto `.tretnix/`. Non esegue automaticamente:

- stage, commit, push, pull request o merge;
- deploy, migration, DNS o provisioning;
- mutation di secret o dati production;
- cleanup di file sorgente o generati.

I validator vengono selezionati da una allowlist del manifest e non passano da `shell:true`. Profili sicuri limitano Git a comandi read-only e impediscono wrapper banali per stage/commit/push/PR/merge/deploy/publish/migration/DNS/infrastruttura/secret/production. Il manifest e gli script locali restano comunque soggetti a diff review: il tooling non è un sandbox per codice già autorizzato nel repository.

`.tretnix/` e le directory critiche cache/runtime/evidence devono essere directory reali nel namespace canonico, oppure essere create direttamente se assenti. Un symlink/junction/reparse point verso un'altra directory, anche interna al repository, provoca errore esplicito prima di letture cache, scritture o cleanup. `cache clear` elimina soltanto `.tretnix/cache/` dopo questa verifica e preserva sorgenti, runtime ed evidence. Nessuna cache supera decisioni, standard, documentazione di progetto o Git.

## 9. Adozione e gate

Prima di ogni scrittura OS, inclusi preflight, context, validation, evidence e cache clear, Git deve confermare l'ignore dell'intera directory `.tretnix/` tramite il `.gitignore` radice tracciato. Ignore soltanto globali, `.git/info/exclude`, regole sui soli figli, negazioni della directory o runtime già tracciato sono insufficienti. `RUNTIME_NOT_IGNORED` interrompe il comando prima della creazione di directory/output e, per validation, prima dei validator. `doctor` controlla e segnala questa precondizione senza creare `.tretnix/`; il tooling non modifica `.gitignore` né rimuove sorgenti. Si usano le semantiche effettive Git: la regola vincente deve provenire dal `.gitignore` portabile del repository.

Nell'adozione applicativa, adattare il project manifest e il task descriptor dei template, dichiarare validator reali e floor delle classi, e aggiungere `.tretnix/` al `.gitignore` radice tramite normale modifica Git revisionata prima del bootstrap. Eseguire inizialmente soltanto `doctor --repo <app> --knowledge <Knowledge>`; gli altri comandi che scrivono diventano utilizzabili dopo la precondizione di ignore. Una preparazione tecnica valida non chiude il gate del pilot né abilita azioni Git o live.

La v1 base è stata implementata e unita in `Tretnix-knowledge` con PR `#22`: source `0e5a9f03e1cd2774af4d40aeb441157bbda65446`, merge storico `main@5f9a7a1d669cea8b0165832017e81f24a94480f5`; la closure documentale iniziale è confluita nella PR `#23`. L'enablement del pilot applicativo è stato unito con PR `#27`: source `89341884d6b320d7d8c002987b2c0c495f5bc7c7`, merge `main@7c12a6ba5a843c31d21de143344be79ac03ed4fc`. La verifica post-merge su quel main ha chiuso OR-01 con regressioni mirate e suite `93/93 PASS`; F-01 e F-02 restano chiusi. Manifest, procedure e tooling sono canonici nella Knowledge. Le ulteriori modifiche mantengono review e autorizzazioni separate per commit, push, PR e merge.

Il primo pilot applicativo è `IN PROGRESS` su RITO Studio BUSINESS PLUS, ma l'adozione nel repository applicativo non è ancora completata: `.tretnix/` deve entrare nel `.gitignore` radice tracciato con review, il manifest candidato deve essere finalizzato, poi vanno eseguiti doctor, preflight, context, validate ed evidence con la Knowledge canonica e misurate cache e limitazioni. Solo dopo si apre il gate parity/UI START/BUSINESS → PLUS. Il rollout generale resta sperimentale; nessun repository è automaticamente migrato o adottato. Il dogfood della Knowledge non completa il pilot applicativo. Tretnix.com resta nel workstream separato.

Le metriche locali disponibili sono numero e dimensione delle fonti, righe/byte del context pack, hit/miss, validator eseguiti o riusati, durata e errori. Non viene inviata telemetria.

## 10. Riferimenti operativi

- [`tools/tretnix/README.md`](./tools/tretnix/README.md)
- [`skills/TASK_ADMISSION.md`](./skills/TASK_ADMISSION.md)
- [`skills/READ_ONLY_REVIEW.md`](./skills/READ_ONLY_REVIEW.md)
- [`skills/RELEASE_FREEZE.md`](./skills/RELEASE_FREEZE.md)
- [`skills/SECURITY_RETEST.md`](./skills/SECURITY_RETEST.md)
- [`skills/CONTROLLED_CHANGE_PACKAGE.md`](./skills/CONTROLLED_CHANGE_PACKAGE.md)

## 11. Integrazione Controlled Change Package

Development OS può alimentare un CCP con identity/preflight, fingerprint, context source hashes, piano di validazione, digest dell'output ed evidence exact-state. Questi dati sono riutilizzabili soltanto sul fingerprint identico. La conservazione dei log prevista dal CCP resta una procedura separata e controllata, non abilita raw output nella cache Development OS.

Restano separati e manuali:

- manifest, allowlist e payload hash del package;
- applicazione idempotente tramite `Apply`;
- esecuzione e recovery tramite `Validate`;
- review dei diff unstaged/staged/untracked;
- browser, backend live, staging, production e owner gate;
- stage, commit, push, PR, merge, deploy e migration.

Development OS integra `TRX-DEC-032`; non duplica né indebolisce la procedura canonica.
