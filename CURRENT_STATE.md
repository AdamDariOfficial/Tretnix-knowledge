# Tretnix Current State

**Versione:** 1.8
**Aggiornato:** 13 agosto 2026
**Stato:** snapshot operativo trasversale; aggiornare quando cambia un gate, una baseline o una fase

---

## 1. Livelli di evidenza

| Codice | Significato |
|---|---|
| `VR` | verificato in repository o artefatto versionato identificabile |
| `VD` | verificato nel deploy e registrato |
| `HR` | riportato in handoff, chat o output utente, non ancora riconciliato completamente |
| `NV` | non verificabile con gli accessi disponibili |

---

## 2. Tretnix Knowledge

| Campo | Valore |
|---|---|
| Repository | `https://github.com/AdamDariOfficial/Tretnix-knowledge.git` |
| `main` verificato | `996d6b8` — merge PR #8, Controlled Change Package formalizzato |
| Snapshot canonico ricevuto | `Tretnix-knowledge-de29f4f3.zip` |
| Development pack | acquisito, verificato, estratto e integrato in `main` |
| Family kit | Beauty v1.1, Professional v1.0 e Home v1.0 presenti |
| Visibilità | pubblica temporaneamente secondo `TRX-DEC-031` |
| Validazione knowledge | PowerShell validator `PASSED` dopo il merge `996d6b8` |
| Evidenza | `VR` per commit, archive e contenuti versionati |
| Controlled Change Package | canonico in `main` da `996d6b8`; `Apply → Validate` è il metodo standard per cambi non banali esterni |

La precedente fase di consolidamento è confluita in `main`. I riferimenti al branch `docs/consolidate-tretnix-state-2026-07-26` e al primo commit `9ff9546` restano nella cronologia Git e nel registro degli artefatti, ma non rappresentano più lo stato operativo corrente.

---

## 3. Forno Lume START

| Campo | Valore |
|---|---|
| Repository | `forno-lume-START` |
| Baseline di chiusura | `d15f639267dfdd57194536154abfa1d0ff3b4542` |
| Stato | completato, verificato, documentato e congelato |
| Evidenza | `VR` + `VD` |

Interventi ammessi: bug, regressione, sicurezza o requisito approvato.

**Branch locale finale:** `fix/impeccable-final-polish`. Installazione congelata, typecheck, lint e build risultano superati dopo le correzioni browser-QA. Il browser QA conclusivo, commit, push, PR e merge restano pendenti. Evidenza: `HR` finché branch e commit finali non vengono registrati nel repository canonico.

---

## 4. Forno Lume BUSINESS

| Campo | Valore |
|---|---|
| Repository | `forno-lume-BUSINESS` |
| Baseline storica Package C | `15a8bf4de41bc1657a79f58699859a015ee7820d` |
| Baseline di chiusura frozen | `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9` |
| Commit implementazione finale | `3a8ffe226170adab417c3c78dba287be6d39b96f` |
| Pull request finale | `#11` |
| Branch finale | `feat/forno-lume-gallery-swipe-slider` |
| Package A, B, B2 e C | completati e uniti |
| Package D | pendente, separato e non autorizzato dal completamento del Package C |
| Stato complessivo | baseline corrente approvata e congelata; Package D resta separato |
| Evidenza | `VR` per repository, commit, PR e merge; approvazione visuale del proprietario; deploy post-merge non verificato |

Chiusura registrata il 10 agosto 2026. Il candidate finale comprende la gallery/lightbox con swipe e reserved indicator lane approvati visivamente. La validation locale registrata prima del push ha confermato installazione con lockfile congelato, TypeScript, ESLint con `0` errori e `8` warning `react-refresh/only-export-components` preesistenti, build Vite client/SSR e build Nitro Cloudflare. Il commit `3a8ffe226170adab417c3c78dba287be6d39b96f` è stato pubblicato sulla branch finale e unito con PR `#11`; il merge commit risultante è `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9`.

Il deploy post-merge della baseline frozen non è stato verificato in questa chiusura e non va dichiarato come eseguito.

Ulteriori modifiche alla baseline BUSINESS congelata richiedono un bug confermato, una regressione confermata, un problema di sicurezza o un requisito di prodotto approvato esplicitamente. Il Package D resta pendente e separato secondo `TRX-DEC-020`; questa chiusura non lo autorizza né lo annulla.

Dopo il merge della presente registrazione Knowledge, Forno Lume BUSINESS PLUS può essere creato o remixato esclusivamente dal parent frozen `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9`, non dalla branch di lavoro, dal commit pre-merge `3a8ffe226170adab417c3c78dba287be6d39b96f` o da baseline precedenti. Questo parent gate non modifica lo stato separato e pendente del Package D.

---

## 4.1 Forno Lume BUSINESS PLUS

| Campo | Valore |
|---|---|
| Repository | `forno-lume-BUSINESS-PLUS` |
| Repository remoto | `https://github.com/AdamDariOfficial/forno-lume-BUSINESS-PLUS.git` |
| Branch principale | `main` |
| Parent BUSINESS frozen | `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9` |
| Primo commit PLUS | `54751867c9bfe30a34cf5081409317e53ca0ee67` |
| Merge bootstrap Lovable | `6dd30ec251a2c808de3692fb4e7cf43a4f10e2f6` |
| Checkpoint bootstrap validato | `bdfcb81b5c7051d20306327009bbe0a5fcf62d1e` |
| Stato | `BOOTSTRAP_VALIDATED / PRODUCT_SCOPE_PENDING` |
| Package D BUSINESS | pendente e separato; non assorbito né autorizzato dal progetto PLUS |
| Evidenza | `VR` per lineage Git, checkpoint, working tree e validation automatizzata; browser QA e deploy non eseguiti |

Il bootstrap è stato creato dal parent frozen BUSINESS richiesto. Il primo commit PLUS `54751867c9bfe30a34cf5081409317e53ca0ee67` ha come parent diretto `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9`; il checkpoint corrente `bdfcb81b5c7051d20306327009bbe0a5fcf62d1e` conserva quindi l'ancestry canonica richiesta.

Il delta bootstrap rispetto al frozen BUSINESS è limitato a `package.json`, `bun.lock` e `README.md`. In `package.json`, `@Lovable.dev/vite-tanstack-config` passa da `^2.7.1` a `2.9.1`; il lockfile viene aggiornato di conseguenza e `README.md` viene aggiunto dal remix. Non risultano modifiche ai sorgenti applicativi nel delta bootstrap.

Validation locale registrata il 10 agosto 2026 sul checkpoint `bdfcb81b5c7051d20306327009bbe0a5fcf62d1e`:

- `bun install --frozen-lockfile`: superato;
- `bun run typecheck`: superato;
- `bun run lint`: exit `0`, con `0` errori e `8` warning `react-refresh/only-export-components`;
- `bun run build`: superato per client, SSR e Nitro Cloudflare module;
- `src/routeTree.gen.ts`: residuo post-build classificato come solo EOL tramite `git diff --quiet --ignore-cr-at-eol`, quindi ripristinato;
- working tree finale: pulita.

Browser QA e deploy non sono stati eseguiti. Il checkpoint `bdfcb81b5c7051d20306327009bbe0a5fcf62d1e` è quindi un bootstrap tecnico validato, non una baseline prodotto BUSINESS PLUS completata.

La descrizione e il `README.md` ereditati dal remix contengono ancora wording storico START e non costituiscono la specifica attiva BUSINESS PLUS. Il Project Knowledge Lovable è stato configurato come guardrail operativo per identità PLUS, parent frozen, separazione del Package D e gate di implementazione; la specifica prodotto BUSINESS PLUS resta da definire e approvare prima di modifiche funzionali.

---

## 5. Tretnix.com

| Campo | Valore |
|---|---|
| Repository | `tretnix` |
| Deploy | `https://tretnix.com` |
| Stato | produzione, remediation controllata |
| Evidenza dello stato recente | `HR` |

Stato operativo riportato e ancora da riconciliare completamente con le evidenze del repository:

- CF-1 risulta unito; registrare PR, merge commit e controlli eseguiti;
- investigare il mismatch `data-tsd-source` in sola lettura;
- dopo la diagnosi usare una sola branch `fix/impeccable-homepage-optimization` per CF-2, CF-3, CF-4 e CF-5;
- usare un solo writer, reviewer read-only in parallelo e una sola pull request finale;
- mantenere CF-6 rinviato finché non esistono asset definitivi;
- indicare il modello Codex consigliato prima di ogni incarico.

Servono PR, branch, commit completo, output dei controlli e report hydration per elevare i singoli elementi da `HR` a `VR`.

**Branch locale finale:** `fix/impeccable-final-polish`, derivata dal checkpoint Pass 2 già pubblicato. Installazione congelata, typecheck, lint e build risultano superati dopo le correzioni browser-QA. Restano browser QA conclusivo, commit/push della branch finale e test della migrazione Supabase in staging. Nessuna migrazione è stata applicata. Evidenza: `HR`.

---

## 6. Beauty & Wellness / RITO Studio — stato corrente

| Campo | Valore |
|---|---|
| Specifica famiglia | `family-kits/beauty-wellness-v1.1/` |
| START | `AdamDariOfficial/rito-studio-START`, `main` verificato a `34c13cd78255b7ac009533790329cada74ae9d8a` |
| BUSINESS | `AdamDariOfficial/rito-studio-BUSINESS`, `main` verificato a `b95a63c6127d2bc1dd396d74b2dd25f87b952226` |
| BUSINESS PLUS | `AdamDariOfficial/rito-studio-BUSINESS-PLUS`, remote `main` verificato a `eba1a2a91fd3a531b4a4667d038b631758d0a664` |
| Working branch PLUS riportata | `feat/rito-business-plus-complete` con delta controllato ancora non integrato |
| Backend live PLUS | staging Cloudflare con D1 + Durable Objects + rate limiting + Native RITO AdminAuth |
| Auth staging | login nativo diretto raggiungibile; rifiuto credenziali non valide nel ramo normale; credenziale corretta ancora rifiutata, sessione non certificata |
| E2E live | `/consulenza` → D1 → admin realtime/reconnect ancora da chiudere con evidenza diretta |
| Produzione PLUS | `NOT AUTHORIZED` |
| Evidenza | `VR` per repository e HEAD remoti; evidenza operatore/staging da formalizzare nel repository PLUS prima della chiusura |
| Lineage/freeze reconciliation | Il candidate PLUS registra `START_FROZEN_34C13CD` e `BUSINESS_FROZEN_B95A63C`; i documenti locali dei due parent contengono ancora registrazioni precedenti non pienamente allineate. La riconciliazione documentale dei parent resta pendente e non blocca il debugging PLUS già autorizzato. |

`TRX-DEC-033` descrive il gate storico di avvio START del 27 luglio. Lo stato reale successivo di START, BUSINESS e BUSINESS PLUS lo ha superato; non deve essere usato per ribloccare retroattivamente il lavoro PLUS esplicitamente autorizzato. Il dettaglio operativo resta nei documenti del repository RITO BUSINESS PLUS.

La scelta Cloudflare è provider-specifica per il fit corrente e segue `TRX-DEC-035`; non costituisce un vincolo per l'intera famiglia Beauty & Wellness.

---

## 7. Professional Services

| Campo | Valore |
|---|---|
| Specifica | `family-kits/professional-services-v1.0/` |
| Concept | QUADRA Studio |
| Progetti previsti | START; BUSINESS |
| Stato | `PREPARATION_COMPLETE / IMPLEMENTATION_NOT_STARTED` |
| Repository | non create |
| Implementazione autorizzata | no |
| Evidenza | `VR` |

---

## 8. Home & Local Services

| Campo | Valore |
|---|---|
| Specifica | `family-kits/home-local-services-v1.0/` |
| Concept | NODO Servizi |
| Progetti previsti | START; BUSINESS |
| Stato | `PREPARATION_COMPLETE / IMPLEMENTATION_NOT_STARTED` |
| Repository | non create |
| Implementazione autorizzata | no |
| Evidenza | `VR` |

---

## 9. Ordine operativo

1. applicare, validare, revisionare e unire la patch di governance preparata sulla baseline `de29f4f3…`;
2. sincronizzare `main` ed eseguire la prova di ricostruzione senza chat;
3. riconciliare CF-1 nel repository `tretnix` con PR, merge commit e controlli;
4. investigare `data-tsd-source` in sola lettura;
5. eseguire CF-2, CF-3, CF-4 e CF-5 nella sola branch `fix/impeccable-homepage-optimization` con una PR finale;
6. mantenere CF-6 rinviato finché non esistono asset definitivi;
7. mantenere Forno Lume START congelato salvo scope esplicitamente approvato;
8. mantenere Forno Lume BUSINESS congelato sulla baseline `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9`;
9. usare Forno Lume BUSINESS PLUS dal checkpoint bootstrap validato `bdfcb81b5c7051d20306327009bbe0a5fcf62d1e` e definire/approvare lo scope prodotto prima di qualsiasi implementazione funzionale;
10. mantenere il Package D separato e pendente; eseguirlo soltanto con un task esplicitamente autorizzato;
11. attivare gli abbonamenti soltanto quando deciso;
12. mantenere RITO Studio START e BUSINESS sulle rispettive baseline verificate salvo task approvati;
13. proseguire RITO Studio BUSINESS PLUS soltanto nel perimetro autorizzato per chiudere Native AdminAuth, `/consulenza` live e realtime E2E; produzione non autorizzata;
14. eseguire il boundary hardening del provider soltanto dopo una baseline PLUS funzionante, come gate separato.

---

## 10. Cancellazione chat

Il development pack e le tre specifiche non sono più un blocco documentale dopo il merge.

Prima di cancellare tutte le chat devono comunque essere completati:

- merge della patch di governance aggiornata;
- sincronizzazione locale di `main`;
- prova di bootstrap in una nuova sessione;
- conservazione offline dello ZIP originale del development pack e dello snapshot `de29f4f3…` usato per la patch;
- formalizzazione degli stati Tretnix.com non presenti nel pack;
- trasferimento di eventuali allegati unici residui.

---

## 11. Regola di aggiornamento

Ogni cambiamento di stato registra:

- data;
- repository;
- branch;
- commit o PR;
- evidenza;
- verifiche realmente eseguite;
- prossimo gate.

Rimuovere gli stati superati; la cronologia resta in Git.
