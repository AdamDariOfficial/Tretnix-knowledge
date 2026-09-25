# Tretnix Current State

**Versione:** 1.19
**Aggiornato:** 24 settembre 2026
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
| Baseline `main` corrente verificata | `e76b626355d5c3aed8a8b2c2905d4f1bde0090d2` (`VR`, `main` remoto verificato il 24 settembre 2026) |
| Baseline precedente CCP v1.2 | `01bf3a6c07f26c0bd39a1a3685ce62eef4f91a70`, merge PR `#30` — `docs: formalize CCP operator workflow v1.2` |
| ChatGPT workstream enforcement | PR `#31` merged; source `d2446f6ec344a838b3398632804ebf912c90a645`; merge `e76b626355d5c3aed8a8b2c2905d4f1bde0090d2` |
| Adapter ChatGPT versionati | full + compact instructions, `CHATGPT_KNOWLEDGE_ROUTER.md`, `CHATGPT_WORKSTREAM_PLAYBOOK.md`; tutti derivati dalla Knowledge, non fonti autonome |
| Controlled Change Package | procedura canonica v1.2: one-ZIP/one-block, `Apply` → `Validate` → owner review → exact stage → `Verify-Staged`; stage/commit/push/PR/merge/deploy restano gate separati |
| Development OS | tooling condiviso merged e operativo nella Knowledge; cache/evidence locali sotto `.tretnix/` non sostituiscono Git o l'autorità owner |
| Prima adozione applicativa Development OS | RITO Studio BUSINESS PLUS PR `#4` merged il 20 settembre 2026; manifest, static validator e ignore `.tretnix/` sono versionati nel repository applicativo |
| Evidenza | `VR` per commit, PR e contenuti versionati; gli esiti locali restano distinti dalle verifiche runtime/deploy non rieseguite in questa riconciliazione |
| Visibilità | pubblica temporaneamente secondo `TRX-DEC-031` |

La PR `#31` formalizza il comportamento operativo di ChatGPT: capability e autorizzazione sono gate distinti; un'operazione non supportata nella sessione viene marcata `UNSUPPORTED_IN_CURRENT_SESSION` e non viene ritentata in loop. PR, merge e cancellazione branch restano gate indipendenti. Il router e il playbook in `compiled/` aiutano ChatGPT a trovare le fonti canoniche e ad applicare il workstream senza duplicare la Knowledge nei Project Sources.

L'adozione Development OS in RITO Studio BUSINESS PLUS non rende automaticamente conclusi browser, backend, staging o produzione: questi restano gate del progetto e devono essere documentati con evidenza propria. Tretnix.com resta un workstream separato.

La baseline pre-implementazione `94c5cb7818faaad0f82e14279d03ce76bf19d971` e le baseline intermedie Development OS restano provenance storica nella cronologia Git, non riferimenti operativi correnti.

---

## 2.1 Backup & Disaster Recovery

| Campo | Valore |
|---|---|
| Architettura target | approvata da `TRX-DEC-042`; provider cloud aggiornato da `TRX-DEC-043` |
| Sorgente live transitoria | `C:\Users\adamd\Desktop\Coding\Tretnix` |
| Workspace target | `T:\Tretnix`, non ancora migrato |
| SSD esterno | acquisto differito fino al primo incasso Tretnix utile |
| Kopia LOCAL | non configurato |
| Kopia CLOUD | Cloudflare R2 Standard, EU jurisdiction |
| Scheduling cloud | ogni 1 ora |
| Retention cloud | 24 latest / 0 hourly / 30 daily / 12 weekly / 12 monthly / 3 annual |
| Compressione | `zstd` |
| Exclusion policy | `node_modules`, `dist`, `build`, `coverage`, `.vite`, `.cache` verificate |
| Snapshot cloud | PASS, circa 6,7 GB nella UI Kopia |
| Restore cloud | `RECOVERY VERIFIED`, completato in 11m 35s |
| Restore filesystem | 19.906 file; 3.583 directory ricorsive più root; circa 6,27 GiB |
| Repository Git | 11/11 recuperate; `git fsck --full` exit `0` |
| Backblaze B2 | `DECOMMISSIONED` il 16 settembre 2026; repository legacy svuotato, bucket eliminato, application key revocata e cache locale rimossa |
| Disaster recovery complessivo | `IMPLEMENTATION PENDING`; restore locale e workspace definitivo ancora mancanti |
| Evidenza runtime | `HR`: screenshot Kopia e output PowerShell/Git forniti direttamente nella sessione del 16 settembre 2026; svuotamento B2, rimozione cache e restore-test verificati da output shell; eliminazione bucket e revoca application key confermate dall'owner; policy e stato diventano `VR` dopo merge |

Il cloud recovery è stato verificato con restore reale in directory isolata e confronto delle repository Git. Questo non autorizza `DISASTER RECOVERY VERIFIED` per l'intera architettura: il gate finale richiede ancora SSD esterno, migrazione verificata a `T:\Tretnix`, Kopia LOCAL, restore locale e nuova verifica cloud dalla sorgente definitiva.

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
| Parent BUSINESS frozen storico | `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9` |
| Bootstrap validato storico | `bdfcb81b5c7051d20306327009bbe0a5fcf62d1e` |
| Candidate di integrazione | `a2c3c8dbffece8e0a7be2656e3c01ef367981eef` |
| Main / merge corrente | `3f1659d7c5ab51c4167eb31d51ee3d9b19239eb6` |
| Pull request | `#1` — `feat: finalize Forno Lume Business Plus`, merged il 7 settembre 2026 |
| Scope PR | 87 file nel candidate approvato |
| Stato | `IMPLEMENTATION_MERGED / SECURITY_CLOSEOUT_PASS_RECORDED / PRODUCTION_NOT_AUTHORIZED` |
| Package D BUSINESS | resta separato; non assorbito né autorizzato dal progetto PLUS |
| Evidenza | `VR` per lineage, commit, PR e contenuti versionati; staging/security è registrato nella PR `#1` e non è stato rieseguito live in questa riconciliazione |

Il bootstrap `bdfcb81...` resta una tappa storica del lineage, ma non è più la baseline prodotto corrente. La PR `#1` integra il candidate BUSINESS PLUS completo con prenotazioni, eventi pubblici, richieste per eventi privati, hero management, admin mobile-first e architettura live Cloudflare con D1, R2, Durable Objects/WebSocket, rate limiting e Native AdminAuth.

La PR `#1` registra come evidenza di closeout staging/security:

- verdict `SECURITY_CLOSEOUT_PASS`;
- Worker version `980acef3-e0c1-4a72-9cad-a7a0352b8c8f`;
- Worker tag `fl-security-2c91ea4c2c4e138d`;
- candidate fingerprint `2c91ea4c2c4e138d3a2a640b1d87dc9bb64cb0e98d6f96cdc5f97da4cf041f12`;
- direct security headers PASS;
- HTTP → HTTPS entry routes PASS;
- browser CSP PASS;
- G21 runtime PASS;
- Trivy PASS;
- source secret scan PASS;
- final ZAP adjudication PASS.

Questi risultati sono evidenza versionata del ciclo chiuso nella PR; questa riconciliazione Knowledge non li sostituisce con una nuova verifica live.

La produzione resta esplicitamente fuori scope: la PR non autorizza né prova production deploy, DNS, migration, secret rotation o admin reprovisioning. Qualunque attivazione production richiede un gate separato con evidenza diretta.

---

## 5. Tretnix.com

| Campo | Valore |
|---|---|
| Repository | `tretnix` |
| Deploy pubblico | `https://tretnix.com` |
| Branch principale | `main` |
| Main corrente verificato | `d860da0c3a1e121582ebe29f6f68e21da350392a` (`VR`, 24 settembre 2026) |
| Ultimo merge | PR `#11` — `feat: connect Intelligence producers to central inbox` |
| Stato sorgente | Portfolio V1 + backend Cloudflare + Intelligence Inbox/connectors merged |
| Produzione recente | PR `#10` e `#11` dichiarano esplicitamente produzione/public routing non toccati; il cutover production non viene considerato provato da questa riconciliazione |
| Evidenza | `VR` per Git/PR; staging runtime riportato nelle PR, non rieseguito live in questo pass |

Sequenza recente verificata in GitHub:

- PR `#8` — Portfolio V1 e backend Cloudflare con D1, R2, Native AdminAuth e rate limiting;
- PR `#9` — preparazione production route-free; registra D1 `tretnix-production`, R2 `tretnix-media-production` e namespace rate-limit, mantenendo Worker creation, migrations, secrets, routing e cutover come gate separati;
- PR `#10` — foundation protetta `/admin/intelligence`, D1 inbox/review events e human-review workflow; produzione non toccata;
- PR `#11` — ingest firmato producer-agnostic, nonce/replay protection, audit append-only, integrazione Daily Tech Watch e TikTok; produzione non toccata.

La PR `#11` registra staging migration `0005_intelligence_ingest.sql`, Worker version `90a32d8d-b2f4-4858-b260-7d1a0cbb211d`, deployment `a096e626-8906-4276-991f-efcf7c62060a`, smoke/E2E security e trasporto reale dei producer come PASS. Questa Knowledge registra l'evidenza versionata ma non dichiara una nuova verifica live del deploy.

La superficie production corrente non deve essere mutata per effetto di questa riconciliazione. Production Worker, migrations, secrets, routing, DNS e cutover restano autorizzazioni separate quando non esiste prova versionata di un gate successivo.

---

## 6. Beauty & Wellness / RITO Studio — stato corrente

| Campo | Valore |
|---|---|
| Specifica famiglia | `family-kits/beauty-wellness-v1.1/` |
| START | `AdamDariOfficial/rito-studio-START`, `main@2ab4dc46ef06fa006560c6d721b28be2cb9a7fa6`, ancestor validato `8fe09095eafb6be8083ddc8b8b7d79f2a21db483`, PR `#17` |
| START historical lineage | tag annotato `family-start-v1.0` → `74ee03c4d39a974872f94f53d14ec2873815ccf7` preservato come evidenza storica |
| BUSINESS | `AdamDariOfficial/rito-studio-BUSINESS`, `main@3f0ff4d3ed8e675725d8d640c305ab61d47217d7`, ancestor validato `ccb50d7b7c6ffbeba96d33b02615a0f428018116`, PR `#10` |
| BUSINESS PLUS | `AdamDariOfficial/rito-studio-BUSINESS-PLUS`, `main@70a2317dcbcb98368ae8cab856308d51f9f681e7` verificato il 24 settembre 2026 (`VR`) |
| Tag PLUS storico | `family-business-plus-v1.0` preservato sul checkpoint storico `a0ce8a2a4fb758e2d16bd5cb794e91d14f7726b5`; non rappresenta il `main` corrente |
| Development OS PLUS | adozione merged con PR `#4` il 20 settembre 2026; manifest, static validator e `.tretnix/` ignore versionati |
| Parity pubblica PLUS | PR `#5` merged; riconciliazione shared public surfaces e browser QA registrati |
| Hero/admin refinement | PR `#6` merged; hero carousel e `/admin/hero`; nessuna migrazione/deploy eseguiti da quella PR |
| Staging/security closeout | PR `#7` merged; `security-closeout-v1.0.6`, staging Worker `e19570f7-88b0-423a-a571-dd0c49b30f86`, migration `0003_hero_management.sql` applicata in staging e runtime QA registrato PASS |
| Production readiness | PR `#8` merged; source/tooling/runbook fail-closed preparati senza production mutation |
| Production preflight remediation | PR `#9` formatting-only e PR `#10` admin identity fail-closed merged |
| Produzione PLUS | `NOT AUTHORIZED / NO PRODUCTION MUTATION VERIFIED` |
| Evidenza | `VR` per commit, PR e documentazione versionata; staging/runtime è registrato nel closeout PR `#7`; production non è certificata |

RITO Studio START e BUSINESS restano congelati sulle baseline del 10 settembre e conservano le differenze intenzionali già documentate. Il tag PLUS storico preserva il freeze precedente e non viene spostato per inseguire `main`.

La sequenza PLUS corrente è verificata tramite PR `#4`–`#10`:

1. adozione Development OS;
2. parity START/BUSINESS → PLUS;
3. hero/admin refinement;
4. formalizzazione staging/security closeout;
5. production-readiness source/tooling;
6. correzione formatting del production preflight;
7. fail-closed dell'identità admin production tramite `RITO_ADMIN_EMAIL` esplicita.

La PR `#7` registra staging runtime QA, AdminAuth, protected hero write, Consultation E2E e targeted security regression come PASS; l'OSV refresh conserva soltanto il debito LOW già accettato `RITO-SEC-007`. La PR dichiara esplicitamente production `NOT TESTED / NOT CERTIFIED / NOT AUTHORIZED`.

Le PR `#8`–`#10` preparano e irrigidiscono il gate production ma non eseguono migration, Worker deploy, DNS/custom-domain changes, secret provisioning/rotation, production data mutation o freeze/tag. Il prossimo gate production richiede ancora gli input legali/controller/privacy previsti e prove dirette delle operazioni effettivamente autorizzate.

Cloudflare resta una scelta provider-specifica per questo progetto e non un vincolo automatico della famiglia Beauty & Wellness.

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

1. trattare `Tretnix-knowledge main@e76b626355d5c3aed8a8b2c2905d4f1bde0090d2` come baseline canonica di partenza finché un merge successivo non la sostituisce;
2. mantenere Tretnix.com sul workstream separato: `main@d860da0c3a1e121582ebe29f6f68e21da350392a` include Intelligence Inbox/connectors, ma production routing/cutover resta un gate distinto se non esiste evidenza successiva;
3. mantenere Forno Lume START congelato su `2ed19ef9a4a886616bccd5aad2054c3027fec680`;
4. mantenere Forno Lume BUSINESS congelato su `ccea04cb0bb50e2624fe505bf7d3f25890b7d456` e Package D separato;
5. trattare Forno Lume BUSINESS PLUS `main@3f1659d7c5ab51c4167eb31d51ee3d9b19239eb6` come implementazione merged con security closeout registrato, senza autorizzare production;
6. mantenere RITO Studio START e BUSINESS congelati sulle baseline registrate;
7. trattare RITO Studio BUSINESS PLUS `main@70a2317dcbcb98368ae8cab856308d51f9f681e7` come baseline sorgente corrente; Development OS, parity, hero, staging/security e production-readiness source sono merged, mentre production resta non autorizzata;
8. non avviare Professional Services o Home & Local Services senza i rispettivi gate;
9. aggiornare questa Knowledge quando cambiano baseline, gate, PR, validation o stato di deploy verificato.

---

## 10. Cancellazione chat

Il vecchio development-pack/governance closeout non è più un gate operativo aperto. La cancellazione di chat segue ora `CHAT_RETENTION_AND_HANDOFF.md`.

Prima di eliminare una chat che contiene lavoro Tretnix verificare almeno:

- che decisioni, baseline, PR e stati operativi ancora rilevanti siano formalizzati nella Knowledge o nel repository progetto corretto;
- che file o allegati unici siano stati trasferiti in una fonte versionata o in un archivio deliberatamente conservato;
- che non restino credenziali, evidence o handoff esistenti soltanto nella conversazione;
- che il workstream attivo abbia un checkpoint Git o un handoff sufficiente a riprenderlo senza ricostruzioni speculative.

Una chat resta contesto secondario: non sostituisce una decisione approvata, la cronologia Git o lo stato documentato del repository.

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
