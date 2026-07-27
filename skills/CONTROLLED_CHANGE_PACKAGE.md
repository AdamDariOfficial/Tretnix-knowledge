# Controlled Change Package

**Stato:** procedura riutilizzabile approvata
**Versione:** 1.1
**Aggiornato:** 27 luglio 2026
**Ambito:** modifiche non banali preparate fuori dal working tree canonico, in una o più repository Tretnix

---

## 1. Scopo

Consegnare una modifica controllata, revisionabile e ripetibile attraverso due script espliciti:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\Apply-<TaskName>.ps1
.\Validate-<TaskName>.ps1
```

`Set-ExecutionPolicy -Scope Process Bypass` vale soltanto per il processo PowerShell corrente. Non deve modificare la policy dell’utente o del computer.

Il pacchetto separa rigidamente:

```text
applicazione locale
→ validazione automatica
→ QA manuale/backend
→ commit
→ push
→ pull request
→ staging
→ merge e deploy
```

Nessun passaggio successivo è implicito.

---

## 2. Quando usarlo

Usare il Controlled Change Package quando almeno una condizione è vera:

- la modifica coinvolge più file o repository;
- la baseline esatta deve essere protetta;
- il lavoro è stato preparato in una chat, ambiente isolato o checkout diverso;
- la copia manuale dei file aumenterebbe il rischio di errore;
- una precedente esecuzione potrebbe essersi fermata a metà;
- installazione, typecheck o build possono generare file;
- servono log, checksum e una matrice degli exit code;
- commit, push, deploy o migrazioni devono restare sotto controllo umano separato.

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
├── payload/
│   └── <soli file autorizzati>
└── eventuali report e checklist QA
```

Le cartelle runtime, per esempio `validation-logs/` e `recovery-logs/`, restano nel pacchetto e non vengono copiate nei repository di progetto.

---

## 4. Manifest obbligatorio

Per ogni repository il manifest deve registrare:

- nome leggibile;
- URL remoto atteso;
- regola di risoluzione del percorso locale;
- branch sorgente;
- commit SHA ammesso o insieme chiuso di SHA ammessi;
- branch di destinazione;
- file modificati, creati o eliminati;
- SHA-256 di ogni payload;
- file generati che possono essere ripristinati;
- comandi di validazione già definiti dal repository;
- esclusioni esplicite, incluse migrazioni e deploy.

Il commit Git identifica crittograficamente l’intero albero sorgente. Gli hash dei payload identificano lo stato finale autorizzato.

---

## 5. Requisiti dello script Apply

`Apply-<TaskName>.ps1` DEVE:

1. usare gestione rigorosa degli errori;
2. verificare Git e gli strumenti necessari;
3. risolvere ogni repository senza ambiguità;
4. verificare remote, branch, commit e working tree;
5. rifiutare modifiche staged o non autorizzate;
6. creare o riprendere la branch dedicata;
7. copiare o eliminare soltanto file in allowlist;
8. verificare gli SHA-256 finali;
9. controllare che Git riporti soltanto file autorizzati;
10. essere idempotente;
11. riconoscere stati parziali conosciuti soltanto tramite hash esatti;
12. fermarsi su qualunque stato inatteso senza cleanup distruttivo;
13. non eseguire stage, commit, push, merge, deploy o migrazioni;
14. stampare il comando successivo soltanto dopo il successo.

Output normale scritto su `stderr` da Git, Bun o altri processi nativi non deve essere trattato come errore quando l’exit code è `0`.

Windows PowerShell 5.1 deve gestire esplicitamente insiemi vuoti, con un elemento o con più elementi.

---

## 6. Requisiti dello script Validate

`Validate-<TaskName>.ps1` DEVE:

1. verificare branch e perimetro del working tree prima dei comandi;
2. creare una directory log con timestamp;
3. usare soltanto comandi già definiti dal repository;
4. eseguire, quando disponibili:

```text
installazione con lockfile congelato
typecheck TypeScript
lint semantico
test
build di produzione
```

5. registrare repository, comando, exit code e output completo;
6. continuare sugli altri repository per produrre una matrice completa;
7. individuare file generati dagli strumenti;
8. salvarne prima il diff e ripristinare soltanto quelli pre-approvati;
9. ricontrollare il working tree dopo ogni repository;
10. salvare e stampare il riepilogo finale;
11. restituire exit code non-zero se fallisce un gate obbligatorio;
12. distinguere chiaramente browser QA, backend QA, staging e produzione ancora mancanti;
13. verificare nel preflight la disponibilità di ogni runtime richiesto dai gate;
14. preferire un validatore nativo e portabile quando il runtime esterno non è parte garantita dell'ambiente;
15. non applicare il payload e scoprire soltanto dopo che l'unico validatore obbligatorio non può essere eseguito;
16. eseguire `git diff --check` sul diff non staged;
17. eseguire `git diff --cached --check` quando esiste uno stage;
18. controllare esplicitamente i file testuali untracked, perché i normali diff Git non li includono.

Quando una repository supporta più validatori equivalenti, il pacchetto deve selezionare automaticamente quello disponibile e registrare quale implementazione è stata eseguita. Un runtime mancante deve essere classificato come dipendenza assente, non come fallimento del contenuto.

Lint semantico e formattazione sono gate distinti. Non eseguire un formatter globale per far passare il lint senza approvazione esplicita dell’intero perimetro.

---

## 7. Ripresa e file generati

Il pacchetto distingue:

- baseline pulita;
- branch creata senza payload;
- payload applicato parzialmente in uno stato conosciuto;
- payload completo;
- stato inatteso.

Uno stato conosciuto può essere ripreso soltanto quando ogni file già modificato coincide con l’hash autorizzato.

Un file generato, come una route tree, può essere ripristinato soltanto quando:

- è dichiarato generato nel manifest;
- la modifica non cambia intenzionalmente le sue sorgenti;
- il diff viene salvato prima del ripristino;
- il file non è staged;
- lo stato Git è univoco.

---

## 8. Confini di sicurezza

Il pacchetto NON DEVE:

- copiare o mostrare valori `.env`;
- includere service-role key, token o credenziali;
- modificare file fuori allowlist;
- normalizzare l’intera repository senza autorizzazione;
- aggiornare dipendenze durante task non correlati;
- indebolire autenticazione, autorizzazione o RLS;
- eseguire automaticamente stage, commit, push, PR o merge;
- eseguire automaticamente deploy o migrazioni;
- dichiarare riusciti browser, database, staging o produzione quando sono stati eseguiti soltanto controlli statici.

---

## 9. Criteri di accettazione del pacchetto

Prima della consegna verificare:

- integrità dell’archivio;
- corrispondenza manifest/payload;
- hash di tutti i payload;
- assenza di `.env` e materiale sensibile;
- compatibilità con la versione PowerShell supportata;
- idempotenza sullo stato completo;
- almeno una prova su baseline pulita e una prova di ripresa in fixture isolate;
- assenza di errori whitespace nel diff non staged;
- assenza di errori whitespace nei file testuali untracked;
- dopo lo stage, assenza di errori in `git diff --cached --check`;
- lista esatta dei file modificabili;
- README con esclusioni e controlli non eseguiti.

---

## 10. Flusso umano obbligatorio

```text
specifica approvata
→ preparazione del pacchetto
→ verifica del pacchetto
→ Apply
→ ispezione di status e diff
→ Validate
→ QA browser/manuale/backend
→ ispezione finale del diff
→ stage esplicito dei soli file approvati
→ `git diff --cached --check` e nuova validazione
→ commit locale
→ push della branch
→ pull request
→ staging e test migrazioni, quando applicabili
→ merge e deploy dopo approvazione
```

---

## 11. Report richiesto

Il report finale registra:

- repository e SHA iniziali;
- branch di destinazione;
- obiettivo e perimetro;
- file modificati;
- riprese da stati parziali;
- comandi ed exit code;
- file generati ripristinati;
- warning mantenuti;
- QA manuali/backend completati;
- verifiche ancora pendenti;
- stato di commit, push, PR, migrazioni e deploy.
