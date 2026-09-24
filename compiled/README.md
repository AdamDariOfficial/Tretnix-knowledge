# Compiled Tool Adapters

Questa cartella contiene adapter sintetici derivati dalle fonti canoniche Tretnix e pronti per le superfici operative degli strumenti.

## Regola di autorità

I file in `compiled/` non sono fonti autonome.

Quando cambia una decisione, uno standard o una skill:

1. aggiornare prima la fonte canonica;
2. identificare gli adapter coinvolti;
3. aggiornare gli adapter;
4. sincronizzare la copia usata dallo strumento;
5. verificare che nessuno stato/gate importante esista soltanto in chat;
6. registrare la modifica tramite Git.

Un adapter può tradurre una regola canonica nel comportamento specifico dello strumento, ma non può creare un’autorizzazione che la fonte canonica non concede.

## ChatGPT

- `CHATGPT_PROJECT_INSTRUCTIONS.md`: adapter completo per le istruzioni del progetto.
- `CHATGPT_PROJECT_INSTRUCTIONS_COMPACT.md`: versione compatta destinata ai limiti del campo Project Instructions.
- `CHATGPT_KNOWLEDGE_ROUTER.md`: routing task → fonti canoniche minime; evita letture indiscriminate della Knowledge.
- `CHATGPT_WORKSTREAM_PLAYBOOK.md`: workflow operativo ChatGPT, gate, capability checks e handoff a Codex/owner.

Per il progetto ChatGPT Tretnix:

```text
Project Instructions
= CHATGPT_PROJECT_INSTRUCTIONS_COMPACT.md
  oppure la versione completa quando il limite lo consente

Project Sources
= CHATGPT_KNOWLEDGE_ROUTER.md
+ CHATGPT_WORKSTREAM_PLAYBOOK.md
```

Non caricare nei Project Sources copie permanenti di `DECISIONS.md`, `DEVELOPMENT_STANDARDS.md`, family kit, `CURRENT_STATE.md` o altri canonici che ChatGPT può recuperare dalla Knowledge corrente: creerebbero una seconda copia soggetta a drift.

## Codex

- `CODEX_GLOBAL_AGENTS.md`: istruzioni globali da installare in `~/.codex/AGENTS.md`.
- `CODEX_SETUP.md`: configurazione e verifica.

Codex resta il repository writer/validator operativo primario quando il task lo autorizza.

## Adapter storici/opzionali

- `LOVABLE_WORKSPACE_KNOWLEDGE.md`: storico/provenance, non workflow attivo.
- `CURSOR_USER_RULES.md`: superficie opzionale/manuale.

## Capability-aware execution

Il workflow Tretnix non implica che ogni strumento possa eseguire ogni gate.

ChatGPT deve verificare capability e autorizzazione prima di una mutation. Un’azione rifiutata per permessi/capability viene marcata `UNSUPPORTED_IN_CURRENT_SESSION` e non viene ripetuta automaticamente. PR, merge e branch cleanup restano gate distinti.

Le capability di Codex sono separate: un browser disponibile a Codex non concede browser capability a ChatGPT, e una limitazione del GitHub connector di ChatGPT non viene trasferita automaticamente a Codex.

## Controlled Change Package

Per modifiche non banali preparate fuori dal working tree canonico usare `../skills/CONTROLLED_CHANGE_PACKAGE.md`.

Adapter e package non autorizzano automaticamente:

- stage;
- commit;
- push;
- pull request;
- merge;
- branch deletion;
- deploy;
- migration;
- DNS/secrets/production writes.

Development OS può fornire context/evidence exact-state, ma non sostituisce i gate di autorità.

## Contesto project-specific

Specifiche complete e stato dettagliato non appartengono agli adapter globali:

- family baseline → `../family-kits/`;
- stato e architettura correnti → repository del progetto;
- provenance → `../source-artifacts/`, `../audits/`, `../operations/`;
- procedure condivise → `../skills/`.

Dopo il merge di una modifica canonica o di un adapter, sincronizzare manualmente la copia presente nelle impostazioni dello strumento.
