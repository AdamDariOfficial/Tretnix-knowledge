# Tretnix Read-Only Repository Audit

**Versione:** 1.1
**Aggiornato:** 17 luglio 2026
**Scopo:** analizzare un repository senza applicare correzioni

---

## 1. Obiettivo

L’audit iniziale deve:

1. mappare il progetto;
2. verificare il comportamento;
3. classificare problemi e rischi;
4. distinguere differenze intenzionali da incoerenze tecniche;
5. confrontare progetti correlati;
6. identificare pattern candidati;
7. proporre un piano di intervento;
8. evitare modifiche premature.

L’audit non autorizza l’implementazione.

Un solo agente esegue l’audit sul working tree. Eventuali seconde opinioni devono partire dallo stesso commit e produrre un report separato, non modifiche.

---

## 2. Dati del manifest

Compilare prima di iniziare.

| Campo | Valore |
|---|---|
| Repository | |
| URL | |
| Categoria | |
| Piano | |
| Stato | |
| Deploy | |
| Branch analizzata | |
| Commit SHA | |
| Data audit | |
| Auditor / strumento | |
| Package manager | |
| Runtime | |
| Accesso repository | sì / no |
| Accesso deploy | sì / no |
| Accesso Supabase | nessuno / read-only / altro |
| Credenziali necessarie | |
| Esclusioni | |

L’audit è valido rispetto al commit indicato.

---

## 3. Perimetro della sola lettura

### Consentito

- leggere tutti i file versionati;
- cercare riferimenti;
- ispezionare cronologia e configurazioni;
- installare dipendenze soltanto se già previsto dal task e senza aggiornare il lockfile;
- eseguire comandi non distruttivi;
- eseguire typecheck, lint, test e build già configurati;
- avviare il progetto localmente;
- generare artefatti locali temporanei;
- usare il browser;
- analizzare il deploy pubblico;
- eseguire audit automatici non distruttivi;
- confrontare repository e branch.

### Vietato

- modificare o formattare sorgenti;
- applicare fix;
- aggiornare dipendenze;
- cambiare lockfile;
- creare commit o push;
- aprire PR con modifiche;
- applicare migrazioni;
- modificare database o storage;
- modificare policy Supabase;
- modificare variabili d’ambiente;
- effettuare deploy;
- modificare DNS;
- inviare dati reali non necessari;
- eseguire operazioni distruttive;
- usare credenziali di produzione non necessarie.

Se installazione o build modificano file locali:

1. registrare il cambiamento;
2. non includerlo come intervento;
3. ripristinare il working tree;
4. verificare `git status`.

---

## 4. Livelli di evidenza

Ogni finding deve usare un solo livello principale.

### EC — Confermato dal codice

Il comportamento è dimostrabile direttamente dai file.

### EE — Confermato dall’esecuzione

Il problema è stato riprodotto tramite comando, browser o deploy.

### PR — Probabile

Il codice suggerisce fortemente il problema, ma manca una riproduzione completa.

### PT — Potenziale

Esiste uno scenario plausibile che richiede verifica.

### VM — Verifica manuale necessaria

Il controllo non può essere completato automaticamente.

### NV — Non valutabile

Mancano accessi, configurazioni, dati o credenziali.

Non usare “vulnerabilità confermata” per un finding PT o PR.

---

## 5. Categorie

Assegnare una categoria principale:

1. sicurezza;
2. bug funzionale;
3. regressione;
4. problema architetturale;
5. responsive;
6. accessibilità;
7. performance;
8. qualità TypeScript;
9. duplicazione e manutenzione;
10. dipendenze;
11. error handling;
12. autenticazione;
13. autorizzazione;
14. Supabase / migrazioni / RLS / storage;
15. test;
16. build;
17. deploy;
18. SEO;
19. differenza stilistica intenzionale;
20. incoerenza tecnica da uniformare;
21. miglioramento opzionale;
22. documentazione mancante.

Una differenza stilistica intenzionale non deve essere classificata come bug.

---

## 6. Severità

### Critica

Possibile:

- accesso non autorizzato grave;
- esposizione di segreti;
- compromissione o perdita di dati;
- bypass completo di autorizzazione;
- operazione distruttiva;
- indisponibilità totale.

### Alta

Possibile:

- accesso improprio significativo;
- blocco di un flusso principale;
- regressione importante;
- vulnerabilità concretamente sfruttabile;
- build o deploy inaffidabile;
- grave problema di accessibilità.

### Media

- flusso secondario compromesso;
- incoerenza rilevante;
- rischio di regressione significativo;
- debito architetturale;
- responsive o accessibilità problematici;
- performance percepibile.

### Bassa

- impatto circoscritto;
- qualità;
- manutenzione;
- coerenza;
- comportamento non bloccante.

### Opzionale

Miglioramento non necessario per correttezza o sicurezza.

---

## 7. Fasi dell’audit

## Fase A — Baseline

1. verificare working tree;
2. registrare branch e commit;
3. identificare package manager;
4. leggere `README`;
5. leggere `package.json`;
6. leggere file di configurazione;
7. mappare cartelle;
8. identificare entry point;
9. identificare hosting e backend;
10. annotare documentazione presente.

Comandi indicativi non distruttivi:

```bash
git status --short
git branch --show-current
git rev-parse HEAD
git log -1 --oneline
git ls-files
```

---

## Fase B — Mappa tecnica

Documentare:

- framework;
- runtime;
- package manager;
- routing;
- layout;
- componenti;
- hook;
- state management;
- styling;
- animazioni;
- dati e configurazioni;
- form;
- API;
- Supabase;
- autenticazione;
- autorizzazione;
- storage;
- analytics;
- test;
- build;
- deploy.

Produrre una mappa dei flussi principali.

---

## Fase C — Audit statico

Verificare:

### Architettura

- responsabilità;
- dipendenze;
- separazione;
- configurazione;
- duplicazioni;
- dead code;
- astrazioni premature;
- accoppiamento.

### TypeScript

- `any`;
- cast;
- nullability;
- tipi esterni;
- tipi database;
- errori soppressi;
- configurazione strict.

### Routing

- route;
- fallback;
- 404;
- direct URL;
- hash;
- query;
- redirect;
- scroll restoration;
- cross-route links.

### UI e responsive

- navbar;
- drawer;
- overflow;
- breakpoint;
- fixed e sticky;
- ordine editoriale mobile;
- touch target;
- viewport;
- lightbox;
- modali.

### Animazioni

- stato iniziale;
- observer;
- route reset;
- reveal;
- hover;
- reduced motion;
- cleanup;
- performance;
- coerenza con progetti correlati.

### Accessibilità

- heading;
- landmark;
- label;
- focus;
- tastiera;
- dialog;
- immagini;
- contrasto;
- reduced motion.

### Performance

- bundle;
- immagini;
- font;
- render;
- richieste;
- lazy loading;
- listener;
- observer;
- dipendenze.

### Error handling

- loading;
- errori;
- empty state;
- retry;
- validazione;
- logging;
- fallback.

---

## Fase D — Comandi

Individuare i comandi esistenti.

Eseguire soltanto quelli configurati:

```bash
npm run typecheck
npm run lint
npm run test
npm run build
```

Adattare al package manager del repository.

Per ogni comando registrare:

- comando;
- eseguito sì/no;
- exit code;
- risultato;
- errori;
- file eventualmente generati;
- limiti.

Non inventare successo quando lo script non esiste.

---

## Fase E — Esecuzione locale

Quando possibile verificare:

- avvio;
- route;
- console;
- richieste di rete;
- form;
- navbar;
- drawer;
- animazioni;
- responsive;
- overflow;
- direct URL;
- refresh;
- back;
- forward;
- errore;
- empty state;
- loading;
- tastiera;
- reduced motion.

L’assenza di un errore visibile non dimostra automaticamente l’assenza di un problema.

---

## Fase F — Deploy pubblico

Verificare:

- HTTPS;
- dominio;
- redirect;
- route dirette;
- refresh;
- status code;
- 404;
- asset;
- canonical;
- title;
- description;
- Open Graph;
- favicon;
- robots;
- sitemap;
- console;
- network;
- caching;
- layout mobile;
- differenze rispetto al locale.

Non eseguire azioni che creano dati reali senza necessità.

---

## Fase G — Backend e sicurezza

Quando esistono Supabase o Lovable Cloud, verificare:

### Segreti

- `.env` versionati;
- chiavi client;
- service-role;
- log;
- configurazioni pubbliche.

### Autenticazione

- login;
- logout;
- refresh sessione;
- expiry;
- reset password;
- accesso diretto;
- redirect.

### Autorizzazione

- ruoli;
- route guard;
- verifica backend;
- escalation;
- metadata;
- RPC;
- admin.

### Migrazioni

- ordine;
- completezza;
- drift;
- constraint;
- indici;
- trigger;
- funzioni.

### RLS

- RLS abilitata;
- SELECT;
- INSERT;
- UPDATE;
- DELETE;
- anon;
- authenticated;
- admin;
- ownership;
- join;
- viste;
- policy permissive.

### Funzioni

- `SECURITY DEFINER`;
- `search_path`;
- identità;
- privilegi;
- input;
- SQL dinamico.

### Storage

- bucket;
- policy;
- path;
- ownership;
- upload;
- download;
- delete;
- MIME;
- dimensioni;
- rendering anonimo;
- URL firmati.

L’accesso assente deve essere registrato come NV, non colmato con supposizioni.

---

## Fase H — Confronto con standard Tretnix

Verificare:

- attribuzione Tretnix;
- niente riferimenti pubblici agli strumenti interni;
- mobile-first;
- ordine editoriale mobile;
- route reset immediato;
- reveal nel viewport;
- reduced motion;
- preservazione dell’identità cliente;
- sicurezza;
- documentazione;
- verifiche.

---

## 8. Formato obbligatorio di ogni finding

```md
## [ID] Titolo

- Repository:
- Commit:
- Categoria:
- Severità:
- Evidenza:
- File / route / tabella / area:
- Righe:
- Comportamento previsto:
- Comportamento attuale:
- Riproduzione:
- Causa confermata o probabile:
- Impatto tecnico:
- Impatto utente:
- Impatto operativo o commerciale:
- Scenario di sicurezza:
- Soluzione consigliata:
- Alternative:
- Dipendenze:
- Rischio di regressione:
- Controlli automatici:
- Controlli manuali:
- Fonte canonica desiderata:
- Stato:
```

### ID consigliati

```text
TRX-SEC-001
TRX-ROUTE-001
FLS-ANIM-001
FLS-RESP-001
FLB-REG-001
```

---

## 9. Registro dei pattern canonici

Per ogni pattern confrontato:

```md
## Pattern

- Nome:
- Categoria:
- Repository candidati:
- File confrontati:
- Comportamento percepito:
- Differenze:
- Fonte visuale proposta:
- Fonte tecnica proposta:
- Motivazione:
- Elementi da preservare:
- Correzioni necessarie:
- Riutilizzabilità:
- Livello di confidenza:
- Approvazione richiesta:
```

Una fonte visuale e una fonte tecnica possono essere differenti.

---

## 10. Output dell’audit

### Audit di un singolo repository

Produrre:

1. executive summary;
2. manifest;
3. mappa tecnica;
4. comandi eseguiti;
5. finding per severità;
6. rischi non valutabili;
7. documenti mancanti;
8. test mancanti;
9. pattern migliori presenti;
10. priorità consigliate.

### Audit trasversale

Produrre:

1. inventario completo;
2. mappe tecniche;
3. problemi classificati;
4. confronto tra progetti correlati;
5. pattern migliori;
6. incoerenze;
7. componenti candidati;
8. standard estraibili;
9. documenti mancanti;
10. skill mancanti;
11. piano di correzione;
12. ordine di intervento.

Struttura suggerita:

```text
audit/
├── 00-AUDIT-MANIFEST.md
├── 01-EXECUTIVE-SUMMARY.md
├── 02-REPOSITORY-INVENTORY.md
├── 03-TECHNICAL-MAPS.md
├── 04-SECURITY-FINDINGS.md
├── 05-FUNCTIONAL-FINDINGS.md
├── 06-ARCHITECTURE-FINDINGS.md
├── 07-RESPONSIVE-ACCESSIBILITY.md
├── 08-CROSS-PROJECT-COMPARISON.md
├── 09-CANONICAL-PATTERN-REGISTER.md
├── 10-SHARED-COMPONENT-CANDIDATES.md
├── 11-KNOWLEDGE-EXTRACTION.md
├── 12-MISSING-DOCS-AND-SKILLS.md
├── 13-REMEDIATION-PLAN.md
└── 14-INTERVENTION-ORDER.md
```

---

## 11. Prioritizzazione

Ordine predefinito:

1. vulnerabilità critiche;
2. vulnerabilità alte;
3. perdita o corruzione dati;
4. blocchi funzionali principali;
5. rischi di build o deploy;
6. autorizzazione e RLS;
7. regressioni;
8. routing e navigazione;
9. responsive e accessibilità;
10. architettura e duplicazioni;
11. performance;
12. SEO;
13. miglioramenti opzionali.

Le dipendenze tra interventi possono modificare l’ordine, ma devono essere spiegate.

---

## 12. Prompt pronto per Codex, Cursor Agent o Claude Code

```text
Read the entire repository and do not modify any file.

Follow the Tretnix read-only audit procedure.

Before analysis:
- record the repository, branch and commit;
- inspect the package manager and available scripts;
- verify that the working tree is clean;
- state which access levels are available.

Audit:
- architecture;
- component structure;
- routing;
- scroll restoration;
- navbar;
- animation architecture;
- responsive behavior;
- overflow;
- accessibility;
- TypeScript quality;
- duplication;
- dependencies;
- performance;
- error handling;
- authentication;
- authorization;
- Supabase;
- migrations;
- Row Level Security;
- storage;
- security;
- missing tests;
- build;
- deployment risks;
- compliance with Tretnix decisions and standards.

Classify findings as:
- security issue;
- functional bug;
- regression;
- architectural problem;
- responsive or accessibility issue;
- intentional stylistic difference;
- technical inconsistency to standardize;
- optional improvement.

For every finding include:
- unique ID;
- repository and commit;
- file or area;
- evidence level;
- current behavior;
- expected behavior;
- confirmed or probable cause;
- impact;
- severity;
- recommended solution;
- regression risk;
- required validation;
- canonical source, when known.

Distinguish:
- confirmed from code;
- confirmed by execution;
- probable;
- potential;
- manual verification required;
- not assessable.

You may run existing non-destructive typecheck, lint, test and build commands.
Do not invent missing commands.
Do not claim a check passed unless it was executed.
Do not modify, format, generate, delete, commit, push, migrate or deploy anything.

Return the report in chat only.
```

---

## 13. Controllo qualità del report

Dopo il primo audit, un secondo passaggio read-only DEVE:

- verificare file e linee citate;
- correggere severità sproporzionate;
- separare configurazione confermata da comportamento runtime inferito;
- distinguere scelte visuali e contenuti demo dai bug;
- rifiutare claim non supportati;
- elencare build, test e controlli browser mancanti;
- confermare che il working tree sia ancora pulito.

Il revisore non deve applicare fix.

---

## 14. Checklist conclusiva

Prima di chiudere l’audit:

- [ ] branch e commit registrati;
- [ ] working tree verificato;
- [ ] package manager verificato;
- [ ] script inventariati;
- [ ] architettura mappata;
- [ ] route mappate;
- [ ] build eseguita o limite dichiarato;
- [ ] deploy verificato o limite dichiarato;
- [ ] backend verificato o NV dichiarato;
- [ ] ogni finding ha evidenza;
- [ ] severità distinta dalla categoria;
- [ ] differenze stilistiche preservate;
- [ ] nessun file modificato;
- [ ] `git status` finale controllato;
- [ ] piano prioritario prodotto.
