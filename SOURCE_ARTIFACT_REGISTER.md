# Tretnix Source Artifact Register

**Versione:** 1.4
**Aggiornato:** 13 agosto 2026
**Stato:** operativo; development pack del 25 luglio acquisito ed estratto

---

## 1. Scopo

Questo registro distingue:

- artefatti effettivamente acquisiti e verificati;
- contenuti estratti e resi versionabili;
- snapshot storici non canonici;
- file binari conservati fuori dalla repository;
- blocchi che impediscono la cancellazione sicura delle chat.

Un nome citato in chat non costituisce acquisizione. Un artefatto è acquisito quando origine, checksum, contenuto e destinazione sono registrati.

---

## 2. Tretnix Knowledge

### Baseline e snapshot della patch di governance

| Campo | Valore |
|---|---|
| Repository | `https://github.com/AdamDariOfficial/Tretnix-knowledge.git` |
| Branch sorgente | `main` |
| Commit baseline originario prima del consolidamento | `60ac030d0c231443f1879c9bafc46f2626769f3d` |
| Primo commit storico di consolidamento | `9ff9546` sul branch `docs/consolidate-tretnix-state-2026-07-26` |
| Commit canonico verificato dopo l’ingestione | `de29f4f3bde0b4f91266505fd73d128f74d11e3f` |
| Snapshot ricevuto | `Tretnix-knowledge-de29f4f3.zip` |
| SHA-256 snapshot | `3cf34a6f145a1834d211f65917950dc92e940f259d7585f16342d1bb00730032` |
| Dimensione snapshot | `296459` byte |
| File versionati nello snapshot | `128` |
| File Markdown nello snapshot | `118` |
| Stato verifica | archive leggibile, struttura inventariata e baseline usata per la patch esterna |

La patch di governance associata deve essere applicata esclusivamente a un working tree pulito sul commit `de29f4f3bde0b4f91266505fd73d128f74d11e3f`. Il commit risultante deve essere registrato dopo il merge. I riferimenti a `9ff9546` restano storici e non descrivono più lo stato corrente di `main`.

---



### Controlled Change Package formalization

| Campo | Valore |
|---|---|
| Nome logico | `tretnix-controlled-change-process-formalization.zip` |
| Data | 27 luglio 2026 |
| SHA-256 | `b970255efb3bd4303d5b6f4ca327800b88280dddd4588a3c74f4d414183e3e10` |
| Contenuti importati | skill, manifest template e decisione formalizzata |
| Destinazioni canoniche | `skills/CONTROLLED_CHANGE_PACKAGE.md`, `templates/CONTROLLED_CHANGE_PACKAGE_MANIFEST.md`, `TRX-DEC-032` |
| ZIP binario | conservazione offline; non necessario nel repository dopo l’estrazione |


---

## 3. Development pack acquisito

### Archivio originale

| Campo | Valore |
|---|---|
| Nome ricevuto | `TRETNIX_NEW_CHAT_DEVELOPMENT_PACK_2026-07-25(2).zip` |
| Nome logico | `TRETNIX_NEW_CHAT_DEVELOPMENT_PACK_2026-07-25.zip` |
| Data contenuto | 25 luglio 2026 |
| SHA-256 archivio ricevuto | `ebae0ebda463dbd7efcc29d56d102cdbc136c29625018bf28ac88dc5ebceca4d` |
| Dimensione osservata | circa 308 KiB |
| File contenuti | 96 |
| Righe testuali Markdown/JSON | 16.891 |
| Stato manifest | verificato |
| Stato estrazione | completata |
| Stato contenuti testuali | acquisiti integralmente; i manifest sorgente vengono verificati sui byte normalizzati `CRLF → LF` |
| Stato ZIP binario | non duplicato nel Git repository; conservarne una copia offline |

### Handoff separato

| Campo | Valore |
|---|---|
| Nome ricevuto | `TRETNIX_DEVELOPMENT_START_HANDOFF_2026-07-25(2).md` |
| Nome logico | `TRETNIX_DEVELOPMENT_START_HANDOFF_2026-07-25.md` |
| SHA-256 | `ac323c9f8591251f3b8a632b2ef956a868c9f78878c5fb38eb434fc73383eb0a` |
| Confronto con la copia nello ZIP | identico byte per byte |
| Destinazione versionata | `operations/development-launch-2026-07-25/` |

---

## 4. Contenuti importati

### Family kit completi

| Famiglia | Versione | Destinazione | Stato |
|---|---:|---|---|
| Beauty & Wellness | 1.1 | `family-kits/beauty-wellness-v1.1/` | completo |
| Professional Services | 1.0 | `family-kits/professional-services-v1.0/` | completo |
| Home & Local Services | 1.0 | `family-kits/home-local-services-v1.0/` | completo |

Ogni family kit conserva:

- `MANIFEST.json`;
- README;
- prodotto;
- design;
- contenuti;
- route;
- animazioni;
- testing;
- decisioni locali;
- stato e approvazione;
- contratto START → BUSINESS;
- offerta commerciale;
- vertical adapter;
- client discovery;
- asset plan;
- repository bootstrap;
- readiness review;
- prompt Lovable, Codex e Impeccable;
- checklist di attivazione e freeze.

### Documenti di lancio

Destinazione:

```text
operations/development-launch-2026-07-25/
```

Contenuti:

- `DEVELOPMENT_SEQUENCE.md`;
- `SUBSCRIPTION_AND_FIRST_BUILD_CHECKLIST.md`;
- `TRETNIX_DEVELOPMENT_START_HANDOFF_2026-07-25.md`;
- `TRETNIX_NEW_CHAT_START_MESSAGE_2026-07-25.md`.

### Manifest e snapshot storico

Destinazione:

```text
source-artifacts/2026-07-25-development-pack/
```

Contiene:

- manifest originale;
- README originale;
- registro di ingestione;
- copie storiche dei file `01_SOURCE_OF_TRUTH` del pacchetto.

Le copie storiche non sono fonti attive. Restano disponibili per audit e confronto; i documenti canonici alla root hanno precedenza. I contenuti importati sono conservati integralmente, ma il checkout Git può usare `CRLF` mentre i manifest sorgente sono calcolati su `LF`. La validazione converte soltanto `CRLF → LF` prima di confrontare dimensioni e SHA-256; `.gitattributes` esclude inoltre queste aree dai controlli generici sugli spazi finali Markdown intenzionali.

---

## 5. Archivi interni non duplicati

Il pack includeva anche tre ZIP di famiglia. Il loro contenuto è stato estratto e versionato integralmente. Gli archivi binari non vengono duplicati nel repository per evitare copie ridondanti.

| Archivio | SHA-256 dichiarato nel manifest |
|---|---|
| `TRETNIX_BEAUTY_WELLNESS_PRELAUNCH_v1.1_2026-07-25.zip` | `a5f32ad686bebf217eed48056dc59987522638756405a17f3825901a20730c8b` |
| `TRETNIX_PROFESSIONAL_SERVICES_PRELAUNCH_v1.0_2026-07-25.zip` | `b9886f59ca1ad6d4159f7e60e51308989a71ac35856dd8052320c51b4430dc52` |
| `TRETNIX_HOME_LOCAL_SERVICES_PRELAUNCH_v1.0_2026-07-25.zip` | `f45d655dfaa49b93c4670b185fae020515b6f0b5c5d246e2407b454ec9a585ba` |

Conservare almeno una copia offline dell'archivio principale originale. La repository conserva il contenuto leggibile e versionabile necessario al lavoro.

---

## 6. Snapshot storici del 16 luglio

I seguenti contenuti sono conservati esclusivamente come fonti storiche:

```text
source-artifacts/2026-07-25-development-pack/historical-source-of-truth/
```

Comprendono:

- `DECISIONS.md`;
- `DEVELOPMENT_STANDARDS.md`;
- `PREVIOUS_HANDOFF.md`;
- `READ_ONLY_AUDIT.md`;
- `REPOSITORY_INDEX.md`;
- `TRETNIX_MASTER_CONTEXT.md`.

Regole:

- non usarli come baseline di implementazione;
- non copiare decisioni superate sopra i documenti correnti;
- usarli soltanto per audit, provenienza e confronto;
- la root della repository e i family kit versionati rappresentano le fonti attive.

---

## 7. Alias storici dei documenti canonici

Durante l’audit multi-repository sono comparsi nomi con suffisso `(2)` provenienti da download o caricamenti duplicati. Non rappresentano documenti canonici aggiuntivi né allegati obbligatori mancanti.

| Alias storico | Documento canonico corrente |
|---|---|
| `DECISIONS(2).md` | `DECISIONS.md` |
| `DEVELOPMENT_STANDARDS(2).md` | `DEVELOPMENT_STANDARDS.md` |
| `TRETNIX_MASTER_CONTEXT(2).md` | `TRETNIX_MASTER_CONTEXT.md` |
| `REPOSITORY_INDEX(2).md` | `REPOSITORY_INDEX.md` |
| `READ_ONLY_AUDIT(2).md` | `templates/READ_ONLY_AUDIT.md` |

Regole:

- usare sempre nome e percorso canonici nei nuovi task;
- trattare il suffisso `(2)` come alias storico, non come versione superiore;
- confrontare una copia esterna soltanto quando i suoi byte sono realmente disponibili;
- non creare file duplicati nella root per soddisfare un alias storico.

---

## 8. Informazioni ora recuperabili senza chat

Dopo il merge dell'integrazione sono recuperabili integralmente:

- portfolio Food & Hospitality, Beauty & Wellness, Professional Services e Home & Local Services;
- concept RITO, QUADRA e NODO;
- scope START e BUSINESS;
- copy, design, route, motion e testing dei tre nuovi verticali;
- prompt e checklist;
- gate di abbonamento e autorizzazione;
- pipeline del mese intensivo;
- regole START → BUSINESS;
- handoff di sviluppo;
- manifest e checksum del pacchetto.

---

## 9. Cancellazione delle chat

Il development pack non rappresenta più un blocco alla cancellazione delle chat dopo che:

1. questa integrazione è stata revisionata e unita a `main`;
2. `main` è stato sincronizzato localmente;
3. il working tree è pulito;
4. una nuova sessione ricostruisce correttamente RITO, QUADRA, NODO, i gate e l'ordine operativo usando soltanto la repository;
5. la copia offline dello ZIP originale è conservata.

Restano da formalizzare separatamente eventuali stati Tretnix.com successivi, branch, PR, finding o allegati non contenuti nel development pack.

---

## 10. Regola per future acquisizioni

Per ogni nuovo pacchetto:

1. conservare il file originale;
2. registrare origine, nome logico e SHA-256;
3. verificare il manifest;
4. estrarre i contenuti leggibili;
5. separare snapshot storici e fonti attive;
6. preservare integralmente i sorgenti e documentare l’eventuale normalizzazione dei line ending usata per verificare manifest e checksum;
7. isolare con `.gitattributes` soltanto gli spazi Markdown intenzionali degli artefatti importati;
8. evitare binari duplicati quando il contenuto è già versionato;
9. aggiornare documenti canonici e adattatori;
10. validare link, checksum e diff;
11. unire tramite pull request.

---

## 11. Riferimenti UX/UI esterni acquisiti

### Designmotion — Design System Blueprint e pattern library

| Campo | Valore |
|---|---|
| Data di acquisizione/analisi | 13 agosto 2026 |
| Artefatto ricevuto | `design-system-blueprint.pdf` |
| Nome logico | `Designmotion Design System Blueprint` |
| Pagine | `11` |
| SHA-256 osservato | `9da396915dccfb6588dc391fc99055571170d2024c4f377479703879ad654df5` |
| Pattern pubblici analizzati | `63` |
| Contenuto importato | principi derivati e classificazione Tretnix, non copia del materiale esterno |
| Destinazione canonica derivata | `UX_UI_QUALITY_SYSTEM.md` |
| Autorità | riferimento esterno; non fonte canonica autonoma |
| PDF binario | non versionato da questo package; conservare una copia offline se serve provenienza futura |

Il Blueprint e i pattern sono stati usati come input di confronto. Le regole Tretnix risultanti sono state adattate alle decisioni esistenti, in particolare alla preservazione dell'identità cliente e alla selezione canonica pattern-per-pattern.
