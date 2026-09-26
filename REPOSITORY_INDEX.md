# Tretnix Repository Index

**Versione:** 2.9
**Aggiornato:** 25 settembre 2026
**Stato dell’inventario:** completo rispetto agli otto repository attualmente dichiarati

Questo indice descrive il ruolo noto dei repository. Non sostituisce l’audit del codice.

---

## 1. Regole dell’inventario

`REPOSITORY_INDEX.md` è l'inventario trasversale dei repository: identifica risorse reali, relazioni, ruolo canonico e checkpoint auditati. Non è il registro live dei gate operativi e non sostituisce `CURRENT_STATE.md` o lo status locale del progetto.

Ogni repository deve registrare, quando applicabile:

- nome;
- categoria;
- piano;
- URL;
- deploy;
- stato sintetico;
- branch principale;
- commit auditato o regola esplicita per risolverlo;
- relazione con altri progetti;
- ruolo canonico;
- informazioni confermate;
- aspetti da verificare;
- problemi già conosciuti;
- accessi disponibili;
- data dell'ultimo audit.

L'inventario è completo soltanto rispetto al manifest approvato. Per `Tretnix-knowledge` il commit `main` corrente non viene hardcodeato nell'indice stesso: deve essere risolto da Git, perché ogni merge che modifica questo file cambierebbe il valore da registrare.

---
# 2. Repository attuali

## 2.1 Tretnix.com

### Identificazione

| Campo | Valore |
|---|---|
| Nome | `tretnix` |
| Categoria | sito istituzionale con area amministrativa e Intelligence Inbox |
| Piano | INTERNO |
| Repository | `https://github.com/AdamDariOfficial/tretnix.git` |
| Deploy pubblico | `https://tretnix.com` |
| Stato | sorgente corrente con Portfolio V1, backend Cloudflare e Intelligence Inbox/connectors merged |
| Branch principale | `main` |
| Main corrente verificato | `d860da0c3a1e121582ebe29f6f68e21da350392a` |
| Ultima pull request merged | `#11` — `feat: connect Intelligence producers to central inbox` |
| Ultima riconciliazione | 24 settembre 2026 — Git/PR; production runtime non riverificato live |

### Relazione con altri progetti

È il sito istituzionale Tretnix e il sistema interno che ospita anche il flusso Intelligence. Non deriva dai prodotti Forno Lume o RITO Studio.

### Sequenza recente verificata

- PR `#8`: Portfolio V1 e backend Cloudflare con D1, R2, Native AdminAuth e rate limiting;
- PR `#9`: preparazione production route-free con risorse production registrate, senza Worker creation, migrations, secrets, routing o cutover;
- PR `#10`: foundation protetta `/admin/intelligence`, persistenza D1 e human-review workflow;
- PR `#11`: ingest firmato producer-agnostic, nonce/replay protection, audit append-only e connector Daily Tech Watch/TikTok.

La PR `#11` registra staging migration `0005_intelligence_ingest.sql`, Worker version
`90a32d8d-b2f4-4858-b260-7d1a0cbb211d`, deployment
`a096e626-8906-4276-991f-efcf7c62060a` e i relativi smoke/security/transport gate come PASS.
Questa riconciliazione non riesegue il deploy.

### Production boundary

Le PR `#10` e `#11` dichiarano esplicitamente production/public routing non toccati. La PR `#9`
prepara il percorso production senza eseguirne i gate finali. Non inferire quindi Worker production,
migration, secret provisioning, DNS o cutover da questi merge: richiedono evidenza separata.

### Ruolo canonico dichiarato

- brand aziendale;
- posizionamento premium e boutique;
- esperienza istituzionale;
- componenti e pattern del sito Tretnix;
- area amministrativa;
- gestione contatti;
- Intelligence Inbox e human-review surface, limitatamente al comportamento verificato nel repository.

Architettura, auth o pattern Intelligence non diventano automaticamente standard condivisi soltanto perché presenti in questo repository; l'eventuale promozione segue le decisioni Knowledge.

---

## 2.2 Forno Lume START

### Identificazione

| Campo | Valore |
|---|---|
| Nome | `forno-lume-START` |
| Categoria | landing / sito Hospitality |
| Piano | START |
| Repository | `https://github.com/AdamDariOfficial/forno-lume-START.git` |
| Deploy | `https://forno-lume.tretnix.com` |
| Stato | chiuso e congelato sulla baseline finale |
| Branch principale | `main` |
| Baseline tecnica storica | `d15f639267dfdd57194536154abfa1d0ff3b4542` |
| Main / baseline sorgente corrente | `2ed19ef9a4a886616bccd5aad2054c3027fec680` |
| Ancestor implementazione validato | `0730a759c6f8bb71f7ad3a3fb810ee8540e18556` |
| Pull request cross-family | `#17` |
| Baseline frozen storica final polish | `a817903923c1bbfe177d8b59e70a4aa1137b7ab1` |
| Ultimo ciclo | 10 settembre 2026 — quality/gallery reconciliation unita; Cloudflare post-merge SUCCESS; reduced-motion owner PASS |

### Relazione con altri progetti

È il progetto originale della famiglia Forno Lume e la fonte visuale/percepita START. Forno Lume BUSINESS deriva storicamente da questo progetto e riceve i miglioramenti START soltanto quando applicabili al proprio contratto multipagina.

### Ruolo canonico approvato

Baseline canonica per:

- qualità visuale Hospitality;
- qualità di tipografia e palette Hospitality;
- struttura premium single-page START;
- qualità responsive e transizioni tablet/desktop;
- comportamento percepito della navbar;
- sobrietà delle interazioni e hover;
- linguaggio del movimento e reduced motion;
- reveal editoriali sotto la fold;
- trattamento consent-gated della mappa e review surface opzionale con dati reali in produzione.

Gli esatti breakpoint o dettagli di implementazione restano project-specific e non devono essere copiati in BUSINESS senza verificare densità, routing e composizione.

### Identità nota

- atmosfera crema, terracotta, oliva e oro attenuato;
- titoli editoriali con Fraunces;
- testo e interfaccia con Inter;
- stile caldo, elegante e artigianale;
- non deve essere trasformato in un design SaaS generico.

### Chiusura corrente

- baseline sorgente corrente `2ed19ef9a4a886616bccd5aad2054c3027fec680`;
- PR cross-family `#17` unita su `main` dall'ancestor `0730a759c6f8bb71f7ad3a3fb810ee8540e18556`;
- baseline `a817903...`, PR `#14` e commit `0a104d...` preservati come evidenza storica final-polish;
- validation locale riportata: typecheck, lint con `0` errori e `6` warning Fast Refresh preesistenti, build client/SSR/Nitro, `git diff --check` e whitespace con exit `0`;
- browser QA finale approvato dal proprietario prima del merge;
- deploy Cloudflare post-merge della baseline `2ed19ef...`: SUCCESS; `prefers-reduced-motion` owner verification: PASS.

Ulteriori modifiche sorgente richiedono bug, regressione, sicurezza o requisito di prodotto approvato esplicitamente.

### Backlog START non bloccante

Registrato senza autorizzare implementazione:

- favicon personalizzata approvata;
- immagine social-preview orizzontale ottimizzata;
- test controllato di fault SSR 500;
- normalizzazione della policy dei line ending del repository;
- revisione dello scaffold shadcn inutilizzato;
- revisione del provider React Query inutilizzato;
- pulizia dei warning tecnici soltanto con controlli di regressione appropriati.

### Ambiti non canonici

START non è automaticamente canonico per routing multipagina, gallery/lightbox BUSINESS, sistemi amministrativi, autenticazione/autorizzazione, backend, database o storage. Questi ambiti restano governati dal repository pertinente.

---

## 2.3 Forno Lume BUSINESS

### Identificazione

| Campo | Valore |
|---|---|
| Nome | `forno-lume-BUSINESS` |
| Categoria | sito multipagina Hospitality |
| Piano | BUSINESS |
| Repository | `https://github.com/AdamDariOfficial/forno-lume-BUSINESS.git` |
| Deploy | `https://forno-lume-business.tretnix.com` |
| Stato | completato, finalizzato e congelato sulla baseline corrente; Package D pendente e separato |
| Branch principale | `main` |
| Baseline storica Package C | `15a8bf4de41bc1657a79f58699859a015ee7820d` |
| Baseline frozen pre-polish | `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9` |
| Main / baseline sorgente corrente | `ccea04cb0bb50e2624fe505bf7d3f25890b7d456` |
| Ancestor implementazione validato | `fb72a1459cbc6bc5292f1e74f47295f2396fdc0a` |
| Pull request cross-family | `#14` |
| Baseline frozen storica final polish | `9bc33cd5737af7763fe9c61ddc52eb7a606fafea` |
| Ultimo ciclo verificato | 10 settembre 2026 — quality/gallery reconciliation unita; Cloudflare post-merge SUCCESS; reduced-motion owner PASS |

### Relazione con altri progetti

Deriva da Forno Lume START.

Preserva identità e linguaggio di animazione Hospitality, espandendo struttura, contenuti e routing multipagina. Il repository BUSINESS PLUS già esistente conserva il lineage storico dalla baseline `389bd1...`; il nuovo freeze BUSINESS non lo riallinea automaticamente.

### Ruolo canonico approvato per i pattern chiusi

Sulla baseline frozen corrente, BUSINESS è fonte tecnica approvata per i pattern chiusi e verificati:

- architettura multipagina Hospitality;
- drawer e lightbox accessibili;
- gallery/lightbox con swipe intenzionale, fallback tramite controlli precedente/successivo e reserved indicator lane;
- navigazione tra route, direct URL, refresh, Back e Forward;
- route reset e scroll restoration;
- smooth navigation intenzionale delle categorie menu con reduced-motion e hash/history preservati;
- ordine editoriale mobile senza duplicazione DOM;
- responsive multipagina Hospitality;
- CTA/contact choice e hover verificati nel final polish;
- fallback runtime e pagina 404;
- policy demo `noindex, follow`;
- JSON-LD generico e route-aware;
- attribuzione Tretnix nel footer.

La baseline `ccea04cb0bb50e2624fe505bf7d3f25890b7d456` è il riferimento sorgente frozen corrente. `9bc33cd...` resta il freeze storico final-polish e `389bd1...` il freeze storico pre-polish.

### Route previste

```text
/
/menu
/chi-siamo
/galleria
/contatti
/privacy
/cookie
404
```

### Identità da preservare

- palette;
- Fraunces;
- Inter;
- atmosfera;
- immagini;
- composizione approvata;
- linguaggio di animazione dello START adattato alla variante BUSINESS.

### Stato verificato dei package

- Package A: completato e unito;
- Package B: completato e unito;
- micro-fix “L'incontro”: completato e unito;
- Package B2: completato e unito;
- Package C: completato, unito, costruito e verificato in produzione nel relativo ciclo;
- finalizzazione gallery/lightbox: completata e unita con PR `#11`;
- final polish parity/adaptation: completato, validato, approvato e unito con PR `#12`;
- Package D: pendente, separato e non autorizzato dal final polish;
- baseline BUSINESS frozen corrente: `ccea04cb0bb50e2624fe505bf7d3f25890b7d456`.

La configurazione Cloudflare Pages verificata durante il ciclo precedente usa Bun, `bun.lock`, output `dist` e il preset Nitro `cloudflare-pages`. I dettagli sono registrati in `HOSPITALITY_FAMILY.md`. Per la baseline corrente `ccea04cb0bb50e2624fe505bf7d3f25890b7d456`, il deploy post-merge risulta `SUCCESS` nell'evidenza approvata del task.

---


## 2.4 Forno Lume BUSINESS PLUS

### Identificazione

| Campo | Valore |
|---|---|
| Nome | `forno-lume-BUSINESS-PLUS` |
| Categoria | sito multipagina Hospitality + companion admin |
| Piano | BUSINESS PLUS |
| Repository | `https://github.com/AdamDariOfficial/forno-lume-BUSINESS-PLUS.git` |
| Produzione | non autorizzata dalla PR di integrazione |
| Branch principale | `main` |
| Parent BUSINESS frozen storico | `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9` |
| Bootstrap validato storico | `bdfcb81b5c7051d20306327009bbe0a5fcf62d1e` |
| Candidate di integrazione | `a2c3c8dbffece8e0a7be2656e3c01ef367981eef` |
| Main corrente verificato | `3f1659d7c5ab51c4167eb31d51ee3d9b19239eb6` |
| Pull request | `#1` — `feat: finalize Forno Lume Business Plus`, merged il 7 settembre 2026 |
| Stato | implementazione merged; `SECURITY_CLOSEOUT_PASS` registrato; production non autorizzata |
| Ultima riconciliazione | 24 settembre 2026 — Git/PR/source; nessuna nuova verifica live |

### Relazione con altri progetti

Deriva dal frozen BUSINESS storico `389bd1eec59fe8680cb1d6e685fac77e6c7c0df9`. Il bootstrap
`bdfcb81...` resta parte del lineage ma non è più la baseline prodotto corrente.

### Stato prodotto corrente

La PR `#1` integra 87 file del candidate BUSINESS PLUS e include:

- prenotazioni;
- eventi pubblici;
- richieste eventi privati;
- hero management;
- companion admin mobile-first;
- profilo repository `local | live`;
- Cloudflare Worker, D1, R2, Durable Objects/WebSocket;
- Workers Rate Limiting;
- Native AdminAuth;
- tooling, migrations e hardening per staging.

La PR registra `SECURITY_CLOSEOUT_PASS`, Worker version
`980acef3-e0c1-4a72-9cad-a7a0352b8c8f`, Worker tag `fl-security-2c91ea4c2c4e138d` e fingerprint
`2c91ea4c2c4e138d3a2a640b1d87dc9bb64cb0e98d6f96cdc5f97da4cf041f12`, oltre a direct
security headers, HTTP → HTTPS entry routes, browser CSP, G21 runtime, Trivy, source secret scan
e final ZAP adjudication registrati come PASS.

### Production boundary e ruolo canonico

La PR non autorizza production deploy, DNS, migration, secret rotation o admin reprovisioning.
BUSINESS PLUS non viene quindi descritto come production-certified.

Il repository è una reference project-specific per i pattern chiusi nel proprio scope. Native
AdminAuth, realtime, reservation architecture e altri pattern non diventano automaticamente standard
Tretnix condivisi senza una promozione canonica separata.

Package D BUSINESS resta separato e non viene assorbito retroattivamente.

---

## 2.5 RITO Studio START

### Identificazione

| Campo | Valore |
|---|---|
| Nome | `rito-studio-START` |
| Categoria | sito Beauty & Wellness START |
| Piano | START |
| Repository | `https://github.com/AdamDariOfficial/rito-studio-START.git` |
| Deploy | Cloudflare SUCCESS sul merge SHA del 10 settembre 2026 |
| Stato | rilasciato, riconciliato e congelato sulla baseline corrente |
| Branch principale | `main` |
| Baseline applicativa pre-closure | `523958b51e0d952c963380e6d384365b286953ca` |
| Main / baseline sorgente corrente | `2ab4dc46ef06fa006560c6d721b28be2cb9a7fa6` |
| Ancestor implementazione validato | `8fe09095eafb6be8083ddc8b8b7d79f2a21db483` |
| Pull request cross-family | `#17` |
| Tag annotato storico | `family-start-v1.0` → `74ee03c4d39a974872f94f53d14ec2873815ccf7` |
| Commit candidate final interaction polish | `2774df1054b149d9c88f02f8301cfd7883d2d200` |
| Pull request final interaction polish | `#13` |
| Pull request documentation closure | `#14` |
| Ultima verifica repository | 10 settembre 2026; reduced-motion owner PASS |

### Ruolo nel lineage

È la baseline canonica Beauty & Wellness START corrente sulla main del 10 settembre. Il tag
annotato remoto `family-start-v1.0`, che dereferenzia a `74ee03c4d39a974872f94f53d14ec2873815ccf7`,
resta evidenza storica immutabile del lineage.

I parent START storici già registrati nei repository BUSINESS e BUSINESS PLUS restano evidenza
del lineage precedente e non vengono riscritti retroattivamente. La riconciliazione BUSINESS
del 10 settembre 2026 ha usato il tag START frozen previsto dal relativo task; i confronti futuri
devono partire dalla baseline corrente approvata, salvo un task storico che identifichi esplicitamente
un diverso checkpoint.

---

## 2.6 RITO Studio BUSINESS

### Identificazione

| Campo | Valore |
|---|---|
| Nome | `rito-studio-BUSINESS` |
| Categoria | sito multipagina Beauty & Wellness |
| Piano | BUSINESS |
| Repository | `https://github.com/AdamDariOfficial/rito-studio-BUSINESS.git` |
| Deploy | Cloudflare SUCCESS sul merge SHA del 10 settembre 2026 |
| Stato | rilasciato, riconciliato e congelato sulla baseline corrente |
| Branch principale | `main` |
| Baseline storica registrata prima del public-parity pass | `b95a63c6127d2bc1dd396d74b2dd25f87b952226` |
| Commit `main` remoto verificato corrente | `3f0ff4d3ed8e675725d8d640c305ab61d47217d7` |
| Ancestor implementazione validato | `ccb50d7b7c6ffbeba96d33b02615a0f428018116` |
| Ultima pull request verificata | `#10` — cross-family quality reconciliation |
| Ultima verifica repository | 10 settembre 2026; reduced-motion owner PASS |

### Ruolo nel lineage

È il repository BUSINESS operativo esistente e non deve essere ricreato. La riconciliazione
contro lo START frozen è stata completata e unita in `main@3f0ff4d3ed8e675725d8d640c305ab61d47217d7`.

Restano intenzionali finché una decisione successiva non le modifica: architettura multipagina,
dettaglio trattamento query-driven, assenza delle route `/team` e `/prenota`, booking tramite
WhatsApp + telefono e contatto tramite email + telefono. La documentazione BUSINESS contiene
riferimenti storici a precedenti baseline START/BUSINESS: restano lineage e non devono essere
reinterpretati come baseline correnti né riscritti nel lineage storico di BUSINESS PLUS.

---

## 2.7 RITO Studio BUSINESS PLUS

### Identificazione

| Campo | Valore |
|---|---|
| Nome | `rito-studio-BUSINESS-PLUS` |
| Categoria | sito + consultation workflow + mini-admin Beauty & Wellness |
| Piano | BUSINESS PLUS |
| Repository | `https://github.com/AdamDariOfficial/rito-studio-BUSINESS-PLUS.git` |
| Produzione | `NOT AUTHORIZED` |
| Staging | closeout staging/security formalizzato in PR `#7`; production resta separata |
| Branch principale | `main` |
| Main corrente verificato | `70a2317dcbcb98368ae8cab856308d51f9f681e7` (`VR`, 24 settembre 2026) |
| Tag annotato storico | `family-business-plus-v1.0` preservato sul checkpoint storico `a0ce8a2a4fb758e2d16bd5cb794e91d14f7726b5` |
| Development OS | adozione merged con PR `#4` |
| Parity | PR `#5` merged |
| Hero/admin | PR `#6` merged |
| Staging/security | PR `#7` merged, `security-closeout-v1.0.6` |
| Production readiness | PR `#8` merged |
| Preflight remediation | PR `#9` e `#10` merged |
| Ultima riconciliazione | 24 settembre 2026 — Git/PR; nessuna production mutation verificata |

### Stato verificato

La sequenza PR `#4`–`#10` ha portato il repository oltre il vecchio freeze `a0ce8a2...`:

- PR `#4`: adozione Tretnix Development OS;
- PR `#5`: parity delle shared public surfaces contro BUSINESS;
- PR `#6`: hero carousel e `/admin/hero`;
- PR `#7`: formalizzazione post-merge staging/security closeout;
- PR `#8`: source/tooling/runbook di production readiness;
- PR `#9`: correzione formatting del production preflight;
- PR `#10`: provisioning admin production fail-closed senza `RITO_ADMIN_EMAIL`.

La PR `#7` registra staging Worker `e19570f7-88b0-423a-a571-dd0c49b30f86`, migration
`0003_hero_management.sql` applicata e verificata in staging, runtime QA, AdminAuth, protected hero
write, Consultation E2E e targeted security regression come PASS. L'OSV refresh conserva soltanto
il debito LOW già accettato `RITO-SEC-007`.

### Production boundary

PR `#8`–`#10` preparano il gate ma non eseguono production migration, Worker deploy, DNS/custom-domain
changes, secret provisioning/rotation o production data mutation. Production resta non testata/non
certificata/non autorizzata finché i gate reali non vengono eseguiti con evidenza diretta.

### Ruolo canonico

RITO PLUS può essere usato come reference project-specific per i pattern effettivamente chiusi e
verificati. Native AdminAuth, realtime, hero management o production tooling diventano standard
trasversali soltanto tramite decisione/adoption separata.

---

## 2.8 Tretnix Knowledge

### Identificazione

| Campo | Valore |
|---|---|
| Nome | `Tretnix-knowledge` |
| Categoria | repository operativo e documentale interno |
| Piano | INTERNO |
| Repository | `https://github.com/AdamDariOfficial/Tretnix-knowledge.git` |
| Deploy | non applicabile |
| Stato | operativo; CCP v1.2, ChatGPT workstream e Development OS versionati |
| Branch principale | `main` |
| Commit corrente | risolvere da Git al momento del task; l'indice non hardcodea il proprio `main` |
| Checkpoint governance storico | PR `#31` — ChatGPT workstream enforcement |
| Checkpoint state reconciliation storico | PR `#32` — current state + Forno START kit reconciliation |
| Development OS adoption applicativa | RITO Studio BUSINESS PLUS PR `#4`, merged il 20 settembre 2026 |
| Snapshot storico usato per la patch di governance del 26 luglio | `Tretnix-knowledge-de29f4f3.zip` |
| SHA-256 snapshot storico | `3cf34a6f145a1834d211f65917950dc92e940f259d7585f16342d1bb00730032` |
| Ultima riconciliazione inventario | 25 settembre 2026 |

### Ruolo canonico

- identità e modello operativo stabile tramite `TRETNIX_MASTER_CONTEXT.md`;
- decisioni approvate tramite `DECISIONS.md`;
- standard condivisi;
- inventario dei repository;
- snapshot trasversale tramite `CURRENT_STATE.md`;
- template e procedure;
- adapter derivati per ChatGPT e Codex, con Cursor opzionale e Lovable preservato come provenance storica;
- manifest, schema, CLI, cache ed evidence del Development OS;
- skill operative, incluso Controlled Change Package v1.2;
- kit di configurazione dei progetti;
- family kit;
- manifest, handoff e provenienza degli artefatti sorgente.

### Regole

- è la fonte canonica trasversale, ma ogni documento conserva un ruolo specifico;
- gli adapter in `compiled/` sono derivati e non fonti autonome;
- l'indice non sostituisce lo stato operativo del repository progetto;
- non contiene bug temporanei o task correnti dei progetti;
- ogni modifica significativa usa branch, diff e pull request;
- la visibilità corrente resta governata da `TRX-DEC-031`;
- durante la fase pubblica non contiene segreti, dati personali non necessari, dati cliente riservati o accessi di produzione;
- la validazione locale e CI non sostituisce la diff review umana.

---
# 3. Mappa delle relazioni

```text
Tretnix.com — main `d860da0c3a1e121582ebe29f6f68e21da350392a`
└── sito istituzionale + backend Cloudflare + Intelligence Inbox/connectors

Forno Lume START — frozen `2ed19ef9a4a886616bccd5aad2054c3027fec680`
└── baseline canonica visuale e single-page Hospitality START
    └── Forno Lume BUSINESS — frozen `ccea04cb0bb50e2624fe505bf7d3f25890b7d456`
        └── Forno Lume BUSINESS PLUS — main `3f1659d7c5ab51c4167eb31d51ee3d9b19239eb6`, lineage storico da `389bd1...`, production non autorizzata

Beauty & Wellness v1.1
└── RITO Studio START — frozen `2ab4dc46ef06fa006560c6d721b28be2cb9a7fa6`; historical tag `family-start-v1.0` preserved
    └── RITO Studio BUSINESS — frozen `3f0ff4d3ed8e675725d8d640c305ab61d47217d7`
        └── RITO Studio BUSINESS PLUS — main `70a2317dcbcb98368ae8cab856308d51f9f681e7`; historical `family-business-plus-v1.0` preserved; production non autorizzata

Professional Services v1.0
└── QUADRA Studio START
    └── pianificato, non implementato e privo di repository
        └── QUADRA Studio BUSINESS dopo freeze START

Home & Local Services v1.0
└── NODO Servizi START
    └── pianificato, non implementato e privo di repository
        └── NODO Servizi BUSINESS dopo freeze START
```

---

# 4. Registro iniziale dei pattern candidati

| Pattern | Repository candidato | Stato |
|---|---|---|
| Brand Tretnix | `tretnix` | dichiarato, da documentare |
| Esperienza istituzionale premium | `tretnix` | da auditare |
| Intelligence Inbox / human review | `tretnix` | implementato e merged; promozione a standard condiviso non implicita |
| Qualità visuale Hospitality | `forno-lume-START` | canonico sulla baseline corrente |
| Tipografia e palette Hospitality | `forno-lume-START` | canonico |
| Struttura premium single-page START | `forno-lume-START` | canonico |
| Motion e reveal editoriali Hospitality | `forno-lume-START` | canonico per il comportamento percepito |
| Navbar Hospitality | `forno-lume-START` | canonico per il comportamento percepito |
| Responsive Hospitality | `forno-lume-START` | canonico |
| Architettura multipagina Hospitality | `forno-lume-BUSINESS` | canonico sulla baseline frozen corrente |
| Routing, history e scroll multipagina | `forno-lume-BUSINESS` | canonico per il pattern verificato |
| Drawer e lightbox accessibili | `forno-lume-BUSINESS` | canonico per il pattern verificato |
| Error fallback, 404, demo SEO e JSON-LD | `forno-lume-BUSINESS` | canonico per il pattern verificato |
| Hospitality BUSINESS PLUS live backend/admin | `forno-lume-BUSINESS-PLUS` | project-specific merged; security closeout registrato; production non autorizzata; non ancora standard trasversale |
| Qualità visuale Beauty & Wellness START | `rito-studio-START` | canonico sulla baseline `2ab4dc4...`; tag storico preservato |
| Architettura multipagina Beauty & Wellness | `rito-studio-BUSINESS` | riferimento riconciliato su `main@3f0ff4d...` |
| Native AdminAuth + realtime BUSINESS PLUS | `rito-studio-BUSINESS-PLUS` | staging/security closeout registrato; production non certificata; promozione trasversale separata |
| Hero management Beauty & Wellness PLUS | `rito-studio-BUSINESS-PLUS` | project-specific merged e staging-verified nel closeout registrato |
| Funzionalità di piano superiore oltre il Package C | `forno-lume-BUSINESS` | Package D resta separato e non autorizzato |
| Git workflow | `tretnix-knowledge` | standard condiviso |
| ChatGPT workstream | `tretnix-knowledge` | router/playbook + adapter enforcement merged con PR `#31` |
| Codex workflow | `tretnix-knowledge` | approvato |
| Development OS | `tretnix-knowledge` | tooling canonico; prima adozione applicativa merged in RITO Studio BUSINESS PLUS PR `#4` |

---

# 5. Progetti pianificati senza repository

Questa sezione registra nomi e gate senza descrivere risorse remote inesistenti.

## 5.1 QUADRA Studio

| Campo | START | BUSINESS |
|---|---|---|
| Verticale | Professional Services | Professional Services |
| Repository previsto | `quadra-studio-START` | `quadra-studio-BUSINESS` |
| Stato | `PREPARATION_COMPLETE / IMPLEMENTATION_NOT_STARTED` | bloccato fino al freeze START |
| Repository reale | non creata | non creata |
| Specifica | `family-kits/professional-services-v1.0/` | stessa famiglia, contratto START → BUSINESS |

## 5.2 NODO Servizi

| Campo | START | BUSINESS |
|---|---|---|
| Verticale | Home & Local Services | Home & Local Services |
| Repository previsto | `nodo-servizi-START` | `nodo-servizi-BUSINESS` |
| Stato | `PREPARATION_COMPLETE / IMPLEMENTATION_NOT_STARTED` | stretch goal, bloccato fino al freeze START |
| Repository reale | non creata | non creata |
| Specifica | `family-kits/home-local-services-v1.0/` | stessa famiglia, contratto START → BUSINESS |

Per tutti i progetti: nessun URL, branch, commit, deploy, test o verifica viene registrato finché non esiste evidenza reale.

---

# 6. Ordine operativo aggiornato

1. mantenere Forno Lume START congelato sulla baseline `2ed19ef9a4a886616bccd5aad2054c3027fec680`;
2. mantenere Forno Lume BUSINESS congelato sulla baseline `ccea04cb0bb50e2624fe505bf7d3f25890b7d456` e Package D separato;
3. trattare Forno Lume BUSINESS PLUS `main@3f1659d7c5ab51c4167eb31d51ee3d9b19239eb6` come implementazione merged con security closeout registrato, senza autorizzare production;
4. mantenere RITO Studio START e BUSINESS congelati sulle baseline correnti e preservare i tag storici;
5. trattare RITO Studio BUSINESS PLUS `main@70a2317dcbcb98368ae8cab856308d51f9f681e7` come baseline sorgente corrente; production resta separata e non autorizzata;
6. mantenere Tretnix.com `main@d860da0c3a1e121582ebe29f6f68e21da350392a` nel proprio workstream e non inferire production cutover dai PR che dichiarano production non toccata;
7. risolvere da Git il ref reale di Tretnix Knowledge all'inizio di ogni task repository-dependent; questo indice non hardcodea il proprio `main` come baseline corrente;
8. non avviare QUADRA o NODO senza i rispettivi gate;
9. riconciliare nei documenti soltanto evidenze realmente ottenute e distinguere Git/source, staging e production;
10. aggiornare il registro dei pattern canonici soltanto quando una decisione ne promuove esplicitamente il ruolo.

Le vulnerabilità critiche o alte rilevate devono essere segnalate immediatamente e prioritarizzate.

---

# 7. Template per una nuova repository

```md
## Nome progetto

### Identificazione

| Campo | Valore |
|---|---|
| Nome | |
| Categoria | sito / landing / gestionale / dashboard / CRM / template / progetto interno |
| Piano | START / BUSINESS / BUSINESS PLUS / CUSTOM / INTERNO |
| Repository | |
| Deploy | |
| Stato | in sviluppo / staging / produzione / archiviato |
| Branch principale | |
| Commit auditato | |
| Ultimo audit | |

### Relazione con altri progetti

Descrivere progetto originale, derivazione, template o riferimento.

### Ruolo canonico dichiarato

Specificare se rappresenta un riferimento per componenti, animazioni, settore, UX o architettura.

### Informazioni confermate

-

### Aspetti da verificare

-

### Problemi già conosciuti

-

### Accessi disponibili

- repository:
- deploy:
- ambiente locale:
- Supabase:
- analytics:
- hosting:

### Esclusioni dall’audit

-
```
