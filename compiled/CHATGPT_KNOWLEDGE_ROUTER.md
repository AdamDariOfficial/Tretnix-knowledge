# ChatGPT Knowledge Router

**Versione:** 1.0
**Aggiornato:** 24 settembre 2026
**Natura:** adapter derivato per ChatGPT; non è una fonte canonica autonoma

## Scopo

Ridurre il contesto inutile e impedire che ChatGPT ricostruisca il lavoro leggendo indiscriminatamente tutta la Tretnix Knowledge.

Questo file non introduce nuove decisioni. Serve a scegliere le fonti canoniche minime necessarie per il task corrente.

## Regola di autorità

Quando esiste un conflitto, applicare sempre la precedenza canonica:

1. `DECISIONS.md`;
2. `DEVELOPMENT_STANDARDS.md` e altri standard normativi applicabili;
3. documentazione specifica del progetto;
4. specifica approvata del task corrente;
5. comportamento verificato in codice/deploy;
6. conversazioni ancora da formalizzare.

`CURRENT_STATE.md` è solo un indice trasversale datato. Non sostituisce `docs/STATUS.md`, commit, PR, issue, deploy evidence o stato Git del progetto.

Gli adapter sotto `compiled/` aiutano il tool, ma non prevalgono sulle fonti canoniche.

## Prima di un task non banale

1. Identificare il progetto/repository reale.
2. Identificare la classe del task.
3. Verificare branch, `HEAD`, working tree e lifecycle se il task dipende dallo stato corrente.
4. Selezionare solo le fonti necessarie.
5. Registrare versione/commit delle fonti usate quando disponibile.
6. Separare fatti confermati, stato riportato, ipotesi e prove mancanti.
7. Non leggere family kit, audit storici o source artifact non pertinenti “per sicurezza”.

## Routing per tipo di task

### Strategia Tretnix generale

Leggere, secondo necessità:

- `TRETNIX_MASTER_CONTEXT.md`;
- `DECISIONS.md`;
- `PORTFOLIO_AND_VERTICALS.md`.

Aggiungere `CURRENT_STATE.md` solo quando la domanda dipende dallo stato operativo corrente.

### Stato di un repository o workstream

Usare:

- repository del progetto;
- `AGENTS.md`;
- `docs/STATUS.md`, roadmap/issue/PR pertinenti;
- Git branch/commit/deploy evidence disponibili;
- `REPOSITORY_INDEX.md` per identità e relazione;
- `CURRENT_STATE.md` soltanto come indice e punto di confronto.

Se handoff/chat e repository divergono, il repository verificato ha priorità secondo l’ordine canonico applicabile.

### Implementazione tecnica

Usare:

- project `AGENTS.md`;
- specifica del task approvata;
- documentazione locale pertinente;
- `DEVELOPMENT_STANDARDS.md`;
- decisioni specificamente rilevanti.

Aggiungere `DEVELOPMENT_OS.md` e `skills/TASK_ADMISSION.md` solo quando il repository adotta o sta adottando Development OS.

### UX/UI

Usare:

- `UX_UI_QUALITY_SYSTEM.md`;
- family document applicabile;
- design/product/content docs del progetto o family kit;
- repository/deploy reale quando occorre verificare comportamento.

Non usare un’altra famiglia come identità visuale da copiare.

### Hospitality / Forno Lume

Usare:

- `HOSPITALITY_FAMILY.md`;
- solo i documenti Hospitality/Forno Lume pertinenti;
- repository Forno Lume del piano interessato;
- eventuali decisioni/standard trasversali necessari.

Non usare Beauty come fonte visuale.

### Beauty & Wellness / RITO Studio

Usare:

- `BEAUTY_WELLNESS_FAMILY.md`;
- versione applicabile sotto `family-kits/beauty-wellness-v1.1/`;
- repository RITO del piano interessato;
- project status e security docs correnti.

I prompt Lovable e i prelaunch runbook sono provenance se il task corrente non li riattiva esplicitamente.

### Professional Services

Usare:

- `PROFESSIONAL_SERVICES_FAMILY.md`;
- documenti pertinenti in `family-kits/professional-services-v1.0/`.

I documenti di prodotto/design restano baseline di famiglia; i runbook prelaunch storici non rappresentano automaticamente il workflow corrente.

### Home & Local Services

Usare:

- `HOME_LOCAL_SERVICES_FAMILY.md`;
- documenti pertinenti in `family-kits/home-local-services-v1.0/`.

Applicare la stessa distinzione tra baseline di famiglia e workflow storico.

### Sicurezza / auth / dati

Usare:

- `DEVELOPMENT_STANDARDS.md` per il contratto trasversale;
- project security/auth/data docs;
- `skills/SECURITY_RETEST.md` quando si tratta di retest;
- evidence e stato del repository interessato.

Non indebolire auth, authorization o RLS per nascondere errori frontend.

### Controlled Change Package

Usare:

- `skills/CONTROLLED_CHANGE_PACKAGE.md`;
- `templates/CONTROLLED_CHANGE_PACKAGE_MANIFEST.md`;
- specifica/task corrente;
- repository/baseline esatti.

Non ricostruire il CCP da una chat precedente se il contratto canonico è disponibile.

### Release / freeze / closeout

Usare:

- `skills/RELEASE_FREEZE.md`;
- project status;
- commit/tag/deploy evidence;
- decisioni specifiche applicabili.

Non convertire validation locale in prova di staging/production.

### Handoff o cancellazione chat

Usare:

- `CHAT_RETENTION_AND_HANDOFF.md`;
- `SOURCE_ARTIFACT_REGISTER.md`;
- repository/issue/PR che devono ricevere lo stato permanente.

### Provenance o ricostruzione storica

Usare:

- `SOURCE_ARTIFACT_REGISTER.md`;
- `source-artifacts/`;
- `audits/`;
- `operations/` datate.

Questi materiali spiegano ciò che è accaduto; non diventano istruzioni correnti per semplice presenza.

## Ambiguità di lifecycle

Non inventare una tassonomia formale di lifecycle in questo adapter. Se un file dichiara esplicitamente il proprio stato o ruolo, rispettare quella dichiarazione nel contesto dell'ordine di autorità.

Se il ruolo corrente/storico di un file non è esplicito:

- non assegnargli autorità operativa solo dal nome o dalla cartella;
- verificare il documento canonico, lo stato del progetto o la provenance pertinente;
- trattare prompt, audit, handoff e snapshot datati come contesto da verificare, non come autorizzazione corrente.

## Regola di sufficienza

Fermarsi quando le fonti selezionate sono sufficienti a:

- definire l’obiettivo;
- stabilire lo stato corrente necessario;
- conoscere i vincoli;
- definire acceptance criteria e validation;
- identificare i gate ancora aperti.

Più contesto non equivale automaticamente a migliore contesto.
