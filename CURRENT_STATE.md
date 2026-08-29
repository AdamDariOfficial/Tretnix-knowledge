# Tretnix Current State

**Versione:** 1.9
**Aggiornato:** 28 agosto 2026
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
| Baseline `main` verificata per questa riconciliazione | `d8c024ea57285371ce29c3e853b2f760390dc461` |
| Snapshot canonico ricevuto | `Tretnix-knowledge-de29f4f3.zip` |
| Development pack | acquisito, verificato, estratto e integrato in `main` |
| Family kit | Beauty v1.1, Professional v1.0 e Home v1.0 presenti |
| Visibilità | pubblica temporaneamente secondo `TRX-DEC-031` |
| Validazione knowledge | `scripts/validate_knowledge.py` e CI `Knowledge validation`; rieseguire sul candidate della presente riconciliazione |
| Evidenza | `VR` per commit, archive e contenuti versionati |
| Controlled Change Package | canonico in `main` da `996d6b8`; `Apply → Validate` è il metodo standard per cambi non banali esterni |

La precedente fase di consolidamento è confluita in `main`. I riferimenti al branch `docs/consolidate-tretnix-state-2026-07-26` e al primo commit `9ff9546` restano nella cronologia Git e nel registro degli artefatti, ma non rappresentano più lo stato operativo corrente.

---

## 3. Forno Lume START

| Campo | Valore |
|---|---|
| Repository | `forno-lume-START` |
| Baseline tecnica storica | `d15f639267dfdd57194536154abfa1d0ff3b4542` |
| Baseline sorgente frozen corrente | `a817903923c1bbfe177d8b59e70a4aa1137b7ab1` |
| Commit implementazione final polish | `0a104d7525644fca5f594d7092b574b8f3997f79` |
| Pull request finale | `#14` |
| Stato | completato, finalizzato e congelato |
| Evidenza | `VR` per commit, PR e merge; `HR` per validation locale e browser QA riportati dal proprietario; deploy post-merge della baseline `a817903...` non verificato |

La baseline `a817903923c1bbfe177d8b59e70a4aa1137b7ab1` sostituisce `d15f639...` come riferimento sorgente frozen corrente. `d15f639...` resta la baseline storica della chiusura tecnica del 18 luglio 2026.

Il ciclo finale del 27–28 agosto ha consolidato remediation UX, responsive/tablet layout, map consent e proporzioni, interazioni/hover, review surface opzionale con fixture solo development e densità navbar. L'ultimo validator riportato dal proprietario ha registrato typecheck, lint con `0` errori e `6` warning Fast Refresh preesistenti, build client/SSR/Nitro, diff check e whitespace con exit code `0`; il browser QA finale è stato approvato dal proprietario prima del merge della PR `#14`. Non è disponibile evidenza di una verifica del deploy post-merge della nuova baseline.

Interventi ammessi: bug, regressione, sicurezza o requisito approvato esplicitamente.

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
| Stato complessivo | baseline `389bd1...` resta il riferimento frozen pre-polish; il 28 agosto 2026 è stato approvato un task separato di parity/adaptation del final polish START; Package D resta separato |
| Evidenza | `VR` per repository, commit, PR e merge; approvazione visuale del proprietario; deploy post-merge non verificato |

Chiusura registrata il 10 agosto 2026. Il candidate finale comprende la gallery/lightbox con swipe e reserved indicator lane approvati visivamente. La validation locale registrata prima del push ha confermato installazione con lockfile congelato, TypeScript, ESLint con `0` errori e `8` warning `react-refresh/only-export-components` preesistenti, build Vite client/SSR e build Nitro Cloudflare. Il commit `3a8ffe226170adab417c3c78dba287be6d39b96f` è stato pubblicato sulla branch finale e unito con PR `#11`; il merge commit risultante è `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9`.

Il deploy post-merge della baseline frozen non è stato verificato in questa chiusura e non va dichiarato come eseguito.

Il 28 agosto 2026 il proprietario ha approvato un nuovo requisito di prodotto: portare in BUSINESS i miglioramenti finali dello START quando applicabili, adattandoli alla struttura multipagina e preservando i pattern tecnici BUSINESS già verificati. Questa autorizzazione non implica una copia meccanica dei breakpoint o dei componenti START e non autorizza il Package D. `389bd1...` resta la baseline frozen di riferimento finché il nuovo candidate non viene implementato, validato, approvato visivamente e unito.

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

1. mantenere Forno Lume START congelato sulla baseline `a817903923c1bbfe177d8b59e70a4aa1137b7ab1`;
2. applicare a Forno Lume BUSINESS il task approvato di parity/adaptation del final polish START partendo dalla baseline `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9`, preservando routing, gallery/lightbox e differenze multipagina intenzionali;
3. validare il candidate BUSINESS con script repository-defined, browser QA responsive/accessibilità e review manuale prima di commit, push, PR e nuovo freeze;
4. mantenere il Package D BUSINESS separato e pendente: il task di final polish non lo autorizza né lo assorbe;
5. non modificare retroattivamente il lineage già esistente di Forno Lume BUSINESS PLUS, che continua a derivare dal parent `389bd1...`; eventuale riallineamento futuro richiede un gate separato;
6. proseguire Tretnix.com e RITO Studio soltanto nei rispettivi perimetri già autorizzati e con evidenza propria;
7. aggiornare questa Knowledge dopo il nuovo merge BUSINESS con SHA, PR, validation e gate realmente completati.

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
