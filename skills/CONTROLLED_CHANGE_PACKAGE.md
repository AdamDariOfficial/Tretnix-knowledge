# Controlled Change Package

**Stato:** procedura riutilizzabile approvata
**Versione:** 1.2
**Aggiornato:** 20 settembre 2026
**Ambito:** modifiche non banali preparate fuori dal working tree canonico, in una o più repository Tretnix

---

## 1. Scopo

Consegnare una modifica controllata, revisionabile, ripetibile e facile da eseguire senza comprimere i gate di autorità.

Il default operatore è:

```text
download ZIP
→ un solo blocco PowerShell
→ localizzazione ZIP
→ verifica SHA-256
→ estrazione automatica
→ Apply
→ Validate
→ QA aggregato quando richiesto
→ review finale owner
→ exact stage
→ Verify-Staged
→ commit
→ push
→ pull request
→ merge/deploy soltanto dopo i rispettivi gate
```

`Apply`, `Validate` e `Verify-Staged` restano responsabilità separate. Il fatto che un unico blocco orchestri i primi passaggi non autorizza quelli successivi.

`Set-ExecutionPolicy -Scope Process Bypass` può essere usato soltanto per il processo PowerShell corrente. Non deve modificare policy persistenti dell'utente o del computer.

---

## 2. Quando usarlo

Usare il Controlled Change Package quando almeno una condizione è vera:

- la modifica coinvolge più file o repository;
- la baseline esatta deve essere protetta;
- il lavoro è stato preparato in una chat, ambiente isolato o checkout diverso;
- la copia manuale aumenterebbe il rischio di errore;
- una precedente esecuzione potrebbe essersi fermata a metà;
- installazione, typecheck o build possono generare file;
- servono log, checksum, fixture di recovery o una matrice degli exit code;
- commit, push, PR, deploy o migrazioni devono restare sotto controllo umano separato.

Una modifica banale eseguita direttamente in un working tree pulito può usare il normale workflow di branch, diff e verifica.

---

## 3. Struttura minima

```text
controlled-change-package/
├── README.md
├── manifest.json
├── CHECKSUMS.sha256
├── Apply-<TaskName>.ps1
├── Validate-<TaskName>.ps1
├── Verify-Staged-<TaskName>.ps1
├── payload/
│   └── <contenuto autorizzato e manifest-bound>
└── runtime/ o validation-logs/  # derivati locali, mai copiati nel repository
```

Il package può contenere report o checklist QA. I file runtime restano confinati al package o a un path locale ignorato approvato.

---

## 4. Manifest e binding obbligatori

Per ogni repository il manifest registra almeno:

- nome e repository remoto atteso;
- regola di risoluzione del percorso locale;
- source branch e commit SHA ammesso o insieme chiuso di SHA;
- target branch;
- allowlist esatta dei file modificati, creati o eliminati;
- hash baseline quando necessario per exact-state recovery;
- SHA-256 del payload e hash finali autorizzati;
- file generati ammessi per recovery;
- validator e staged-state contract di ciascuno;
- QA manuali/live richiesti o non richiesti;
- esclusioni esplicite, incluse stage, commit, push, PR, merge, deploy e migration.

`CHECKSUMS.sha256`, manifest e payload devono essere mutuamente coerenti. Il package rifiuta file payload mancanti, extra o con hash inatteso.

Il commit Git identifica l'albero sorgente. Gli hash finali identificano il candidate autorizzato prima che esista un nuovo commit.

---

## 5. One-ZIP / one-block operator flow

La consegna standard richiede all'owner soltanto di scaricare lo ZIP e incollare un unico blocco PowerShell fornito insieme al package.

Il blocco DEVE:

1. localizzare un solo archivio compatibile nel percorso previsto, normalmente `Downloads`;
2. rifiutare ambiguità tra più candidati;
3. verificare l'esatto SHA-256 dello ZIP prima dell'estrazione;
4. estrarre in una directory temporanea o package-specifica pulita;
5. verificare la struttura minima e i checksum interni;
6. impostare l'ExecutionPolicy soltanto a `Scope Process` quando necessario;
7. eseguire `Apply` e, soltanto se questo passa, `Validate`;
8. fermarsi prima di `git add`, commit, push, PR, merge, deploy o migration.

L'owner non deve estrarre manualmente lo ZIP o eseguire frammenti separati se il package supporta questo flusso.

---

## 6. Requisiti di Apply

`Apply-<TaskName>.ps1` DEVE:

1. usare `Set-StrictMode` e gestione rigorosa degli errori;
2. verificare Git e gli strumenti realmente necessari;
3. risolvere ogni repository senza ambiguità e verificare l'identità del remote;
4. verificare source branch, base commit e working tree;
5. rifiutare file staged e stati fuori allowlist;
6. creare o riprendere soltanto la target branch autorizzata;
7. verificare checksum interni e binding manifest/payload prima di scrivere;
8. applicare soltanto operazioni in allowlist;
9. verificare hash finali e changed-file set esatto;
10. essere idempotente sullo stato finale;
11. riconoscere stati parziali soltanto tramite identità/hash esatti;
12. fermarsi su stati inattesi senza cleanup distruttivo;
13. non eseguire stage, commit, push, PR, merge, deploy o migration;
14. stampare il checkpoint successivo soltanto dopo il successo.

### Windows PowerShell 5.1

Quando il package supporta Windows PowerShell 5.1:

- ogni output nativo o helper con cardinalità `0/1/N` deve essere normalizzato esplicitamente con array semantics, per esempio `@(Invoke-Git ...)`;
- non assumere che `(Invoke-Git ...)[0]` operi su una collezione: una singola stringa indicizzata restituisce il primo carattere;
- quando una variabile è immediatamente seguita da `:`, usare `${relative}: ...` o una forma equivalente non ambigua;
- evitare sintassi o API disponibili soltanto in PowerShell 7 quando non esiste fallback 5.1.

Output normale scritto su `stderr` da Git o altri processi nativi non è un errore se l'exit code è `0`.

---

## 7. Requisiti di Validate

`Validate-<TaskName>.ps1` DEVE:

1. verificare identità repository, branch, base commit e candidate prima dei comandi;
2. verificare che lo stage sia nello stato previsto dal contratto pre-stage;
3. creare log CCP con timestamp in un path confinato fuori dal candidate;
4. usare soltanto validator realmente presenti e dichiarati;
5. registrare comando, exit code e output consentito;
6. continuare sui gate indipendenti quando serve una matrice aggregata completa;
7. individuare file generati e ripristinare soltanto quelli pre-approvati dopo averne conservato il diff;
8. ricontrollare candidate hash e working tree dopo ogni validator che può toccare file;
9. eseguire `git diff --check` sul diff non staged;
10. controllare esplicitamente file testuali untracked;
11. restituire non-zero se fallisce un gate obbligatorio;
12. distinguere `PASS`, `FAILED`, `UNAVAILABLE`, `UNVERIFIED` e `NOT_REQUIRED`;
13. non fare stage o mutazioni remote.

Lint semantico e formattazione sono gate distinti. Un formatter globale non viene eseguito per nascondere errori lint senza scope esplicito.

---

## 8. Audit, parity e QA aggregato

Prima di chiedere la review finale all'owner, completare sul candidate intero tutti gli audit, parity check e controlli read-only richiesti e disponibili. Non frammentare la review owner in checkpoint intermedi quando il lavoro può essere completato senza una decisione umana.

Browser, backend live, staging e produzione restano gate distinti. Un package può aggregarne il reporting, ma non trasformare un controllo non eseguito in `PASS`.

Se serve un browser harness temporaneo:

- deve vivere soltanto in un path ignorato e confinato;
- non può usare dati cliente reali o secret non necessari;
- la creazione e il cleanup devono stare in `try/finally` o equivalente;
- dopo il cleanup lo stato Git deve coincidere con quello atteso;
- un harness residuo blocca il closeout automatico.

---

## 9. Commit identity e candidate identity

Prima del commit, il candidate non possiede una nuova commit identity.

La sua identità read-only deve essere espressa tramite:

```text
base commit
+ exact changed-file allowlist
+ final per-file hashes
(+ eventuale tree/fingerprint deterministico)
```

Non inventare o anticipare un commit SHA. Dopo il commit, verificare che il tree/changed-file set del commit corrisponda al candidate revisionato prima del push o della PR.

---

## 10. Staged-state contract e Verify-Staged

Ogni validator dichiara uno staged-state contract:

- `allowed`: può essere eseguito con staged files;
- `forbidden`: deve essere eseguito soltanto prima dello stage;
- `not_applicable`: non dipende dallo stato staged.

Dopo la review owner, lo stage è un gate esplicito e contiene soltanto i file approvati.

`Verify-Staged-<TaskName>.ps1` DEVE verificare almeno:

- branch e base commit ancora attesi;
- staged allowlist esatta;
- zero modifiche unstaged;
- zero untracked non autorizzati;
- hash finali del candidate;
- `git diff --cached --check` con le opzioni whitespace richieste dal repository;
- validator post-stage soltanto quando il loro staged-state contract lo consente.

Se un validator è `forbidden`, NON rilanciarlo dopo `git add`. Il suo PASS pre-stage resta valido soltanto se `Verify-Staged` dimostra che lo stage contiene esattamente lo stesso candidate revisionato e che non esistono delta unstaged/untracked.

`Verify-Staged` non esegue `git add` automaticamente.

---

## 11. Exact-state resumability

Il package distingue almeno:

- baseline pulita;
- target branch creata senza payload;
- applicazione parziale esatta;
- candidate completo;
- stato staged verificabile quando previsto;
- stato inatteso.

Una ripresa è ammessa soltanto quando ogni file già modificato coincide con una delle identità esplicitamente autorizzate. Non usare euristiche come "sembra già applicato".

Uno stato inatteso produce stop non distruttivo e report sufficiente alla diagnosi.

---

## 12. File generati e temporary state

Un file generato può essere ripristinato soltanto quando:

- è dichiarato nel manifest;
- il task non modifica intenzionalmente le sue sorgenti in modo incompatibile;
- il diff viene salvato prima del ripristino;
- non è staged quando il recovery lo richiede;
- lo stato Git è univoco.

Runtime, log e harness temporanei devono restare fuori dall'allowlist del candidate e in path ignorati/confinati.

---

## 13. Confini di sicurezza

Il package NON DEVE:

- copiare, stampare o archiviare valori `.env`, token o credenziali;
- modificare file fuori allowlist;
- normalizzare l'intera repository senza autorizzazione;
- aggiornare dipendenze durante task non correlati;
- indebolire autenticazione, autorizzazione o RLS;
- eseguire automaticamente stage, commit, push, PR, merge, deploy o migration;
- modificare DNS, secret, provisioning o dati production;
- dichiarare browser/backend/staging/production riusciti senza prova diretta.

---

## 14. Package self-test prima della consegna

Prima di consegnare lo ZIP verificare e registrare:

- struttura del package e assenza di file extra inattesi;
- binding manifest/payload;
- SHA-256 di ogni payload e dell'archivio finale;
- hash finali autorizzati;
- sensitive/forbidden-file scan;
- forbidden-action scan degli script;
- static syntax review di `Apply`, `Validate`, `Verify-Staged` e runner operatore;
- compatibilità con il runtime PowerShell dichiarato;
- fixture baseline pulita;
- fixture branch-created-only;
- fixture partial/resume exact-state;
- fixture candidate completo/idempotenza;
- fixture unexpected-state che deve fallire chiuso;
- fixture staged verification coerente con lo staged-state contract;
- whitespace checks richiesti;
- controlli non eseguibili nell'ambiente di preparazione, marcati senza inventare PASS.

Un self-test su PowerShell 7 non dimostra da solo la compatibilità Windows PowerShell 5.1. Se 5.1 non è disponibile nell'ambiente di preparazione, eseguire static review compatibile 5.1 e richiedere il primo run reale come evidence separata.

---

## 15. Flusso umano obbligatorio

```text
specifica approvata
→ preparazione package
→ package self-test
→ one-block Apply + Validate
→ QA aggregato/read-only richiesto
→ una review finale owner
→ exact stage
→ Verify-Staged
→ commit locale autorizzato
→ push autorizzato
→ PR autorizzata
→ staging/migration test quando applicabili
→ merge autorizzato
→ deploy autorizzato
```

Ogni freccia che attraversa un gate di autorità richiede il relativo permesso. Un PASS precedente non autorizza il successivo.

---

## 16. Pull request capability

La creazione diretta di una PR tramite integrazione è una capability dinamica, non una proprietà permanente del workflow.

Al gate PR:

1. verificare repository, base, head, SHA e assenza di una PR equivalente;
2. provare la creazione diretta soltanto se il tool corrente dichiara la capability e il gate è autorizzato;
3. se il tool rifiuta per permessi/capability, non aggirare il controllo;
4. fornire all'owner link diretto di creazione PR, titolo e body completi;
5. dopo la creazione owner, verificare la PR effettiva prima di procedere.

Ricontrollare la capability dopo aggiornamenti degli strumenti/permessi e periodicamente nei cicli lunghi. Un errore storico, incluso un `403 Resource not accessible by integration`, descrive quella sessione e non una limitazione eterna.

---

## 17. Report richiesto

Il report finale registra:

- repository, remote, source branch e base SHA;
- candidate identity e target branch;
- package/ZIP SHA-256 e payload binding;
- changed-file set e hash finali;
- stati di resume incontrati;
- comandi, exit code e validator staged-state contract;
- file generati/harness temporanei e relativo cleanup;
- audit/parity/QA completati;
- controlli non eseguiti o non disponibili;
- esito `Verify-Staged` quando eseguito;
- stato separato di stage, commit, push, PR, migration, merge e deploy.
