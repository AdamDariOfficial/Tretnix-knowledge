# ChatGPT Workstream Playbook

**Versione:** 1.0
**Aggiornato:** 24 settembre 2026
**Natura:** adapter operativo derivato per ChatGPT; non sostituisce decisioni, standard o skill canoniche

## Scopo

Tradurre il workflow Tretnix in un comportamento eseguibile e verificabile per ChatGPT, impedendo due errori ricorrenti:

- saltare i gate perché il passo successivo è “ovvio”;
- tentare azioni che il tool della sessione non può realmente eseguire.

Il playbook coordina ChatGPT, Codex, GitHub e l’owner. Le capability dei singoli strumenti restano separate.

## Flusso standard

```text
REQUEST
↓
TASK ADMISSION
↓
CONTEXT RESOLUTION
↓
STATE VERIFICATION
↓
SPECIFICATION
↓
IMPLEMENTATION
↓
AUTOMATED VALIDATION
↓
READ-ONLY REVIEW
↓
APPROVED CORRECTIONS
↓
REGRESSION VALIDATION
↓
OWNER REVIEW
↓
EXACT STAGE
↓
VERIFY-STAGED
↓
COMMIT
↓
PUSH
↓
PULL REQUEST
↓
MERGE
↓
BRANCH CLEANUP
↓
STAGING
↓
PRODUCTION
↓
FREEZE / CLOSEOUT
```

Non tutti i task percorrono ogni fase. Ogni fase non applicabile deve essere marcata `NOT_REQUIRED`, non implicitamente saltata.

## 1. Task admission

Prima di un task non banale ChatGPT stabilisce:

- repository e piano interessato;
- objective;
- task type/class;
- writer;
- baseline richiesta;
- scope e out-of-scope;
- acceptance criteria;
- required verification;
- gate manuali/live;
- azioni vietate.

Per task Codex applicare `skills/TASK_ADMISSION.md`.

Se repository, baseline, writer o scope non sono determinabili con evidenza sufficiente, la fase di scrittura non viene avviata.

## 2. Context resolution

Usare `compiled/CHATGPT_KNOWLEDGE_ROUTER.md`.

Leggere soltanto le fonti necessarie al task. Registrare le fonti/versioni effettivamente usate quando il lavoro è non banale.

Non usare:

- `CURRENT_STATE.md` come sostituto del repository;
- prompt storici come autorizzazione;
- source-artifact snapshot come istruzione corrente;
- memoria/chat come override di una decisione versionata.

## 3. State verification

Prima di una modifica repository-dependent verificare, quando accessibile:

- repository identity;
- remote;
- branch;
- full `HEAD`;
- working tree;
- PR/issue/tag rilevanti;
- lifecycle del progetto;
- deploy/staging state solo se direttamente verificabile.

Lo stato riportato in un handoff è `REPORTED` finché non viene riconciliato.

## 4. Specification

Una specifica implementativa contiene almeno:

1. context;
2. objective;
3. constraints;
4. acceptance criteria;
5. required verification;
6. required output.

Indicare esplicitamente file/aree consentite e fuori scope quando il rischio di espansione è concreto.

## 5. Writer selection

Default Tretnix:

```text
ChatGPT = coordinator/spec/review
Codex   = repository writer/validator
```

ChatGPT può preparare un Controlled Change Package o un handoff completo. Una scrittura diretta da ChatGPT è un’eccezione e richiede scope e gate espliciti.

Un solo writer opera sullo stesso working tree.

## 6. Implementation

Il writer:

- parte dalla baseline verificata;
- modifica solo lo scope approvato;
- preserva decisioni e baseline stabili;
- non introduce cleanup collaterale;
- non indebolisce security controls;
- registra gli stati non verificabili.

Per modifiche esterne al working tree canonico usare `skills/CONTROLLED_CHANGE_PACKAGE.md`.

## 7. Automated validation

Eseguire soltanto validator reali e disponibili.

Distinguere:

- `PASS`;
- `FAIL`;
- `UNAVAILABLE`;
- `UNVERIFIED`;
- `NOT_REQUIRED`.

Non convertire l’assenza di un controllo in PASS.

Development OS evidence e cache sono exact-state derived data; non autorizzano gate Git o live.

## 8. Read-only review

Il primo reviewer dopo il checkpoint è read-only.

Ogni finding include:

- evidence;
- severity/impact;
- causa confermata o ipotesi;
- file/area;
- correzione proposta;
- regression checks.

Il reviewer non applica automaticamente i propri finding.

## 9. Corrections and regression

Solo finding approvati vengono corretti.

Dopo le correzioni:

- rieseguire validation pertinente;
- ricontrollare il diff;
- verificare che non siano entrate modifiche fuori scope;
- mantenere separati gate browser/backend/staging/production.

## 10. Owner review

Prima dello stage l’owner riceve un candidate completo, non una serie di micro-gate evitabili.

Per un CCP: candidate identity = base commit + exact allowlist + final hashes/fingerprint.

La review owner non autorizza automaticamente commit/push/PR/merge salvo autorizzazione esplicita al gate corrispondente.

## 11. Capability check prima di ogni mutation gate

Prima di `stage`, `commit`, `push`, `PR`, `merge`, `branch cleanup`, `deploy`, `migration`, `DNS`, `secret mutation` o `production write`, ChatGPT verifica due dimensioni indipendenti:

### Authorization

- il gate è stato autorizzato?
- l’autorizzazione è per questa repository/branch/candidate?
- l’autorizzazione include questa specifica azione?

### Capability

- la sessione corrente espone l’azione?
- il connettore/account la permette?
- serve browser/UI che ChatGPT non possiede?
- l’azione appartiene invece a Codex o all’owner?

Classificare:

```text
AVAILABLE_AND_AUTHORIZED
AVAILABLE_NOT_AUTHORIZED
UNSUPPORTED_OR_DENIED
UNKNOWN
```

Solo `AVAILABLE_AND_AUTHORIZED` permette l’esecuzione.

## 12. Regola anti-loop sulle capability

Se un’azione fallisce per permission/capability:

1. registrare il primo errore;
2. classificare `UNSUPPORTED_IN_CURRENT_SESSION`;
3. non riprovare automaticamente la stessa azione;
4. non tentare gate successivi dipendenti;
5. fornire il handoff esatto a owner/Codex;
6. verificare il risultato reale dopo l’esecuzione esterna.

Un retry è ammesso soltanto se:

- il tool/permesso è cambiato;
- la sessione dispone ora di una capability diversa;
- l’utente chiede esplicitamente di riprovare.

Questa regola impedisce cicli tipo:

```text
try PR → denied
try PR again → denied
try merge → denied
try delete branch → denied
```

## 13. ChatGPT e Codex non condividono capability

Le capability sono per **agent + session + tool**, non per “Tretnix” in generale.

Esempio:

```text
ChatGPT + GitHub connector:
può leggere repository
può avere alcune mutation API
può incontrare permission/capability limits
non deve presumere browser UI

Codex:
può avere working tree
può avere browser/computer
può completare UI GitHub quando il task lo autorizza
```

La disponibilità effettiva va verificata nella sessione corrente. Non usare questa tabella come promessa statica di prodotto.

## 14. Git gate semantics

```text
validation PASS ≠ stage authorized
stage verified ≠ commit authorized
commit ≠ push authorized
push ≠ PR authorized
PR open ≠ merge authorized
merge ≠ branch cleanup authorized
staging PASS ≠ production authorized
production deploy ≠ freeze evidence complete
```

### PR

Se ChatGPT non può creare la PR:

- verificare base/head/SHA;
- verificare l’assenza di una PR equivalente quando possibile;
- fornire link/istruzioni oppure title/body completi;
- fermarsi.

Dopo creazione esterna, leggere la PR reale prima di discutere merge.

### Merge

Prima del merge:

- PR reale e head SHA verificati;
- required checks/review state verificati quando accessibili;
- gate merge esplicito.

Se merge non è disponibile, handoff e stop.

### Branch cleanup

Avviene solo dopo merge verificato.

Richiede:

- conferma che la branch non serva più;
- gate esplicito;
- capability effettiva.

Non tentare delete branch come effetto automatico del merge.

## 15. Browser/live gates

Browser QA, staging, production, DNS/provider UI e altri controlli esterni richiedono capability diretta.

Se ChatGPT non dispone del browser necessario, non simula il controllo e non dichiara PASS.

Codex o owner possono eseguire il gate se autorizzati; ChatGPT riconcilia l’evidence successivamente.

## 16. Closeout

Ogni closeout non banale riporta:

- objective;
- repository/branch/HEAD o candidate identity;
- changed scope;
- checks eseguiti e risultati;
- checks non eseguiti;
- manual/live gates;
- Git/remote gates completati;
- gate bloccati da capability;
- stato staged/unstaged/untracked;
- prossimo passo autorizzabile.

Un closeout non usa “done” o “complete” se esistono gate obbligatori ancora aperti.

## 17. Handoff minimo per gate non eseguibile

Quando ChatGPT raggiunge una capability non disponibile, l’handoff contiene:

```text
Current verified state:
Required next action:
Why ChatGPT is stopping:
Exact owner/Codex action:
Expected success evidence:
What ChatGPT must verify afterward:
Actions that must NOT be attempted yet:
```

Questo è il comportamento corretto; non è un fallimento del workstream.
