# Compiled Tool Adapters

Questa cartella contiene versioni sintetiche e pronte da copiare dei documenti canonici Tretnix.

## Regola di sincronizzazione

I file in questa cartella non sono fonti autonome.

Quando cambia una decisione o uno standard:

1. aggiornare il documento canonico;
2. identificare gli adattatori coinvolti;
3. aggiornare gli adattatori;
4. copiare la nuova versione nello strumento;
5. verificare che stato, gate e source artifacts non siano rimasti soltanto in chat;
6. verificare che gli adattatori puntino alla versione corretta dei `family-kits/`;
7. registrare la modifica tramite Git.

## File

- `CHATGPT_PROJECT_INSTRUCTIONS.md`: versione completa delle istruzioni del progetto ChatGPT Tretnix.
- `CHATGPT_PROJECT_INSTRUCTIONS_COMPACT.md`: adattatore entro il limite di 8.000 caratteri del campo Project Instructions.
- `LOVABLE_WORKSPACE_KNOWLEDGE.md`: adapter storico, conservato per provenance; non workflow attivo.
- `CURSOR_USER_RULES.md`: preferenze opzionali per chi usa Cursor come superficie manuale.
- `CODEX_GLOBAL_AGENTS.md`: istruzioni globali da installare in `~/.codex/AGENTS.md`.
- `CODEX_SETUP.md`: procedura di configurazione e verifica di Codex.

Gli adapter attivi sono ChatGPT e Codex secondo `TRX-DEC-041`. Development OS v1 compila contesto ed evidence a partire dalle fonti canoniche; non rende autonomi gli adapter.

Gli adapter attivi riportano le garanzie della remediation Gate B: decisioni locali nel Layer A, unione conservativa dei controlli, fingerprint dei byte tracked, containment senza alias dei singoli child cache e del namespace runtime, metadata/sentinel senza letture per input exact-state sensibili o aliasati, raw output non persistito e rifiuto dell'evidence stale. Lovable/Cursor restano classificati rispettivamente come storico/opzionale e non vengono promossi a workflow attivo.

Il contesto specifico dei singoli progetti non deve essere inserito indiscriminatamente negli adattatori globali. I gate trasversali restano globali; specifiche complete restano nei `family-kits/`; stato dettagliato e task restano nei file del progetto. Dopo il merge di una modifica canonica, sincronizzare manualmente le copie presenti nelle impostazioni degli strumenti.


## Procedura riutilizzabile

La procedura canonica per applicare e validare modifiche non banali preparate fuori dal working tree è in `../skills/CONTROLLED_CHANGE_PACKAGE.md`. Gli adattatori sintetizzano la regola, ma non sostituiscono la skill canonica.

## Adattatori specifici di progetto

Gli adattatori specifici non appartengono a questa cartella globale. Vivono nel relativo family kit, per esempio:

- `../family-kits/beauty-wellness-v1.1/compiled/LOVABLE_START_PROJECT_KNOWLEDGE.md`.

Questi file devono essere sincronizzati nel Project Knowledge del singolo progetto e non nel Workspace Knowledge.
