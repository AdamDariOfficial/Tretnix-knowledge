# Tretnix Current State

**Versione:** 1.15
**Aggiornato:** 15 settembre 2026
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
| Baseline `main` verificata | `5f9a7a1d669cea8b0165832017e81f24a94480f5` |
| Snapshot canonico ricevuto | `Tretnix-knowledge-de29f4f3.zip` |
| Development pack | acquisito, verificato, estratto e integrato in `main` |
| Family kit | Beauty v1.1, Professional v1.0 e Home v1.0 presenti |
| Visibilità | pubblica temporaneamente secondo `TRX-DEC-031` |
| Validazione knowledge | GitHub Knowledge Validation sulla PR `#22`: PASS (`VR`, check `validate` completato con `success` sul source commit); la reconciliation post-merge richiede validation locale sul proprio diff |
| Evidenza | `VR` per commit, archive e contenuti versionati |
| Controlled Change Package | canonico in `main` da `996d6b8`; `Apply → Validate` è il metodo standard per cambi non banali esterni |
| Development OS v1 | merged e canonico nella Knowledge; tooling utilizzabile su questo repository |
| Pull request Development OS | `#22` — `feat: add Tretnix Development OS v1`, merged il 15 settembre 2026 (`VR`, Git e API GitHub) |
| Source commit Development OS | `0e5a9f03e1cd2774af4d40aeb441157bbda65446` |
| Merge commit Development OS | `5f9a7a1d669cea8b0165832017e81f24a94480f5` |
| Branch storico Development OS | `codex/development-os-v1`, eliminato locale e remoto dopo merge (`VR`, branch locali e `ls-remote`) |
| Final independent Gate B pre-merge | `APPROVE_FOR_COMMIT` (`HR`, esito riportato dall'owner nel task di closeout) |
| Suite finale pre-merge | `69/69 PASS` (`HR`, esito riportato dall'owner; il dogfood post-merge è un'esecuzione distinta) |
| Working tree post-merge | verificato clean all'avvio su `main@5f9a7a1d669cea8b0165832017e81f24a94480f5`, uguale a `origin/main` dopo fetch (`VR`) |
| Rollout applicativo | sperimentale e pending; prossimo gate: pilot controllato su un repository applicativo con checkpoint stabile e autorizzazione esplicita |

Development OS v1 introduce manifest, context resolver/cache, fingerprint, validation planner/cache, evidence e quattro procedure operative, ora presenti in `main`. Gli output `.tretnix/` sono locali e ignorati. Il dogfood sul repository Knowledge non costituisce pilot applicativo né adozione automatica su altri repository. Git, Knowledge e autorità owner restano superiori a cache ed evidence; Tretnix.com resta nel workstream separato ed è escluso da questo closeout.

La baseline pre-implementazione `94c5cb7818faaad0f82e14279d03ce76bf19d971` resta provenance del merge Development OS, non la baseline operativa corrente.

La riconciliazione cross-family è confluita storicamente in `main@c693dcc25979a93afab3c8cfcdb43f943baee187`; le baseline precedenti restano nella cronologia Git e nel registro degli artefatti.

---

## 3. Forno Lume START

| Campo | Valore |
|---|---|
| Repository | `forno-lume-START` |
| Baseline tecnica storica | `d15f639267dfdd57194536154abfa1d0ff3b4542` |
| Main / baseline sorgente corrente | `2ed19ef9a4a886616bccd5aad2054c3027fec680` |
| Ancestor implementazione validato | `0730a759c6f8bb71f7ad3a3fb810ee8540e18556` |
| Pull request cross-family | `#17` |
| Baseline frozen storica final polish | `a817903923c1bbfe177d8b59e70a4aa1137b7ab1` |
| Stato | rilasciato, riconciliato e congelato sulla baseline del 10 settembre |
| Evidenza | `VR` per commit, ancestry, PR e merge; `VD` per deploy Cloudflare SUCCESS sul merge SHA; verifica owner `prefers-reduced-motion` PASS |

La baseline `2ed19ef9a4a886616bccd5aad2054c3027fec680` sostituisce `a817903...` come riferimento sorgente corrente. `a817903...` resta il freeze storico final polish e `d15f639...` resta la baseline storica della chiusura tecnica del 18 luglio 2026.

Il ciclo del 27–28 agosto resta evidenza storica. La riconciliazione cross-family del 10 settembre ha consolidato i pattern qualità/gallery sull'ancestor `0730a759...` e li ha uniti con PR `#17`. Il deploy Cloudflare sul merge SHA è registrato come SUCCESS e la verifica owner di `prefers-reduced-motion` come PASS.

Interventi ammessi: bug, regressione, sicurezza o requisito approvato esplicitamente.

---

## 4. Forno Lume BUSINESS

| Campo | Valore |
|---|---|
| Repository | `forno-lume-BUSINESS` |
| Baseline storica Package C | `15a8bf4de41bc1657a79f58699859a015ee7820d` |
| Baseline frozen pre-polish | `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9` |
| Main / baseline sorgente corrente | `ccea04cb0bb50e2624fe505bf7d3f25890b7d456` |
| Ancestor implementazione validato | `fb72a1459cbc6bc5292f1e74f47295f2396fdc0a` |
| Pull request cross-family | `#14` |
| Baseline frozen storica final polish | `9bc33cd5737af7763fe9c61ddc52eb7a606fafea` |
| Commit implementazione storico final polish | `a77ea376686c0a87f37e91d5f06670e773683700` |
| Pull request storica final polish | `#12` |
| Branch di lavoro final polish | `fix/start-final-polish-parity`, eliminata dopo il merge |
| Package A, B, B2 e C | completati e uniti |
| Final polish parity/adaptation | completato, validato, approvato visivamente e unito |
| Package D | pendente, separato e non autorizzato dal final polish |
| Stato complessivo | rilasciato, riconciliato e congelato sulla baseline del 10 settembre; Package D separato |
| Evidenza | `VR` per commit, ancestry, PR e merge; `VD` per deploy Cloudflare SUCCESS sul merge SHA; verifica owner `prefers-reduced-motion` PASS |

Il ciclo final-polish parity/adaptation del 4 settembre resta evidenza storica. La riconciliazione cross-family è stata implementata su `fb72a1459cbc6bc5292f1e74f47295f2396fdc0a` e unita in `main` con PR `#14`; `ccea04cb0bb50e2624fe505bf7d3f25890b7d456` è la baseline sorgente BUSINESS corrente.

La validation locale riportata per il Controlled Change Package v2.4.3 ha registrato 6/6 fixture di recovery/idempotenza superate, TypeScript, ESLint con `0` errori e `8` warning `react-refresh/only-export-components` preesistenti, build client/SSR/Nitro, invarianti UX, diff/whitespace e stato payload finale con exit code `0`. Il browser QA finale responsive/interattivo è stato approvato dal proprietario prima del merge. Queste evidenze restano `HR` perché derivano da output locale e approvazione del proprietario, non da un gate CI o deploy verificato direttamente in questa riconciliazione.

Le baseline `389bd1...` e `9bc33cd...` restano rispettivamente freeze storici pre-polish e final-polish. Il deploy Cloudflare della baseline corrente `ccea04c...` è registrato come SUCCESS.

Ulteriori modifiche alla baseline BUSINESS congelata richiedono un bug confermato, una regressione confermata, un problema di sicurezza o un requisito di prodotto approvato esplicitamente. Il Package D resta pendente e separato secondo `TRX-DEC-020`; né il final polish né la riconciliazione del 10 settembre lo autorizzano, annullano o assorbono.

Forno Lume BUSINESS PLUS conserva il lineage già verificato dal parent storico `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9`. Le baseline BUSINESS successive non riscrivono retroattivamente quel lineage; un eventuale riallineamento di PLUS richiede un gate separato.

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
| START | `AdamDariOfficial/rito-studio-START`, `main@2ab4dc46ef06fa006560c6d721b28be2cb9a7fa6`, ancestor validato `8fe09095eafb6be8083ddc8b8b7d79f2a21db483`, PR `#17` |
| START historical lineage | tag annotato `family-start-v1.0` → `74ee03c4d39a974872f94f53d14ec2873815ccf7` preservato come evidenza storica |
| BUSINESS | `AdamDariOfficial/rito-studio-BUSINESS`, `main@3f0ff4d3ed8e675725d8d640c305ab61d47217d7`, ancestor validato `ccb50d7b7c6ffbeba96d33b02615a0f428018116`, PR `#10` |
| BUSINESS PLUS | `AdamDariOfficial/rito-studio-BUSINESS-PLUS`, remote `main` verificato a `eba1a2a91fd3a531b4a4667d038b631758d0a664` |
| Working branch PLUS riportata | `feat/rito-business-plus-complete` con delta controllato ancora non integrato |
| Backend live PLUS | staging Cloudflare con D1 + Durable Objects + rate limiting + Native RITO AdminAuth |
| Auth staging | login nativo diretto raggiungibile; rifiuto credenziali non valide nel ramo normale; credenziale corretta ancora rifiutata, sessione non certificata |
| E2E live | `/consulenza` → D1 → admin realtime/reconnect ancora da chiudere con evidenza diretta |
| Produzione PLUS | `NOT AUTHORIZED` |
| Deploy parent | Cloudflare SUCCESS sui merge SHA START e BUSINESS; verifica owner `prefers-reduced-motion` PASS |
| Evidenza | `VR` per commit, ancestry, PR e merge dei parent; `VD` per deploy Cloudflare post-merge; provenienza asset upstream/licenze/copyright/model release RITO ancora sconosciuta o non verificata |
| Lineage/freeze reconciliation | START e BUSINESS sono riconciliati e frozen sulle baseline del 10 settembre. I parent e tag storici già registrati restano evidenza del lineage e non vengono riscritti retroattivamente. |

Il ciclo del 5–6 settembre e il tag `family-start-v1.0` restano evidenza storica. Il pass cross-family
del 10 settembre è stato unito in START con PR `#17` e in BUSINESS con PR `#10`, producendo le
baseline correnti indicate nella tabella.

Gli output del ciclo precedente riportati dal proprietario registrano `git diff --check`, lint con
`0` errori e `6` warning Fast Refresh ereditati, build client/SSR/Nitro e browser QA finale
approvato; restano evidenza storica `HR`. Per il ciclo cross-family corrente, commit, ancestry, PR
e merge sono `VR`; deploy Cloudflare sui merge SHA e verifica owner reduced-motion sono registrati
come superati.

RITO Studio BUSINESS è ora riconciliato sulla baseline `3f0ff4d3...`. Restano intenzionali il
dettaglio trattamento query-driven, l'assenza delle route `/team` e `/prenota`, booking tramite
WhatsApp + telefono e contatto tramite email + telefono. Il repository non deve essere ricreato.

`TRX-DEC-033` resta un gate storico di avvio. `TRX-DEC-038` e `TRX-DEC-039` governano i pattern
condivisi finali relativi ai divider editoriali e alla coppia legale `Privacy` + `Cookie`. Questo
aggiornamento non autorizza modifiche a RITO Studio BUSINESS PLUS.

La scelta Cloudflare resta provider-specifica per il fit del candidate PLUS e segue
`TRX-DEC-035`; non costituisce un vincolo per l'intera famiglia Beauty & Wellness.

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

1. mantenere Development OS v1 merged e operativo nella Knowledge; prossimo gate di adozione: pilot controllato su un repository applicativo soltanto con checkpoint stabile e autorizzazione esplicita;
2. mantenere Tretnix.com nel workstream e working tree separati;
3. mantenere Forno Lume START congelato sulla baseline `2ed19ef9a4a886616bccd5aad2054c3027fec680`;
4. mantenere Forno Lume BUSINESS congelato sulla baseline `ccea04cb0bb50e2624fe505bf7d3f25890b7d456`; riaprirlo soltanto per bug, regressione, sicurezza o requisito approvato;
5. mantenere il Package D BUSINESS separato e pendente: il final polish completato non lo autorizza né lo assorbe;
6. non modificare retroattivamente il lineage di Forno Lume BUSINESS PLUS;
7. mantenere RITO Studio START e BUSINESS congelati sulle baseline registrate, preservando le differenze intenzionali;
8. non riallineare o modificare RITO Studio BUSINESS PLUS per effetto di questo gate;
9. aggiornare questa Knowledge quando cambiano baseline, gate, PR, validation o stato di deploy verificato.

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
