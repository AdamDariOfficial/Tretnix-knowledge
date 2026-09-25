# Tretnix Portfolio and Verticals

**Versione:** 1.4
**Aggiornato:** 25 settembre 2026
**Stato:** canonico per portfolio, lifecycle e gate; le specifiche complete sono nei documenti e family kit dedicati

---

## 1. Scopo

Questo documento registra:

- verticali approvati;
- concept portfolio;
- piani e progetti previsti;
- lifecycle;
- gate di implementazione;
- relazione tra START, BUSINESS e livelli successivi.

Non sostituisce i family kit, gli status locali, le issue o un'autorizzazione esplicita.

---

## 2. Lifecycle

```text
DISCOVERY
SPECIFICATION_DRAFT
SPECIFICATION_APPROVED
PREPARATION_COMPLETE
IMPLEMENTATION_NOT_STARTED
IMPLEMENTATION_AUTHORIZED
IMPLEMENTATION_ACTIVE
QA_ACTIVE
RELEASED
FROZEN
ARCHIVED
```

Regole:

- ogni stato ha data e fonte;
- `PREPARATION_COMPLETE` non equivale a `IMPLEMENTATION_AUTHORIZED`;
- un progetto pianificato non riceve repository, deploy o verifiche inventati;
- `RELEASED` richiede deploy e verifica;
- `FROZEN` consente soltanto bug, regressioni, sicurezza o requisiti approvati;
- una demo non viene presentata come cliente reale.

---

## 3. Portfolio corrente

| Verticale | Concept | Specifica | Progetti | Stato lifecycle sintetico |
|---|---|---|---|---|
| Food & Hospitality | Forno Lume | `HOSPITALITY_FAMILY.md`; `case-studies/FORNO_LUME.md` | START; BUSINESS; BUSINESS PLUS | START e BUSINESS rilasciati/frozen; BUSINESS PLUS esiste con gate propri; stato corrente in `CURRENT_STATE.md` |
| Beauty & Wellness | RITO Studio | `family-kits/beauty-wellness-v1.1/`; `case-studies/RITO_STUDIO.md` | START; BUSINESS; BUSINESS PLUS | START e BUSINESS rilasciati/frozen; BUSINESS PLUS esiste con gate propri; stato corrente in `CURRENT_STATE.md` |
| Professional Services | QUADRA Studio | `family-kits/professional-services-v1.0/` | START; BUSINESS | `PREPARATION_COMPLETE / IMPLEMENTATION_NOT_STARTED` |
| Home & Local Services | NODO Servizi | `family-kits/home-local-services-v1.0/` | START; BUSINESS | `PREPARATION_COMPLETE / IMPLEMENTATION_NOT_STARTED` |

Le specifiche dei verticali sono baseline di prodotto e design, non autorizzazioni operative. Prompt Lovable, subscription runbook e altri materiali del ciclo iniziale restano provenance storica salvo ri-autorizzazione esplicita.

Baseline, PR, deploy e gate correnti appartengono a `CURRENT_STATE.md`, `REPOSITORY_INDEX.md` e soprattutto ai repository interessati.

---
## 4. Food & Hospitality

```text
Forno Lume START — RELEASED + FROZEN `2ed19ef...`
└── Forno Lume BUSINESS — RELEASED + FROZEN `ccea04c...`
    └── Package D separato e pendente
```

La riconciliazione del 10 settembre ha deploy Cloudflare post-merge registrato come SUCCESS per entrambi i parent. Il dossier canonico [`case-studies/FORNO_LUME.md`](case-studies/FORNO_LUME.md) rappresenta START + BUSINESS come un solo `portfolio_concept`; non include BUSINESS PLUS e non autorizza l'integrazione Tretnix.com.

Fonte:

```text
HOSPITALITY_FAMILY.md
```

---

## 5. Beauty & Wellness

| Campo | Valore |
|---|---|
| Concept | `RITO Studio` |
| Descriptor | `Beauty & Care Atelier` |
| Tagline | `La bellezza, nel suo ritmo.` |
| START | repository reale; baseline frozen corrente da risolvere nelle fonti di stato |
| BUSINESS | repository reale; baseline frozen corrente da risolvere nelle fonti di stato |
| BUSINESS PLUS | repository reale con lifecycle e gate separati |

Lineage:

```text
RITO Studio START
→ RITO Studio BUSINESS
→ RITO Studio BUSINESS PLUS
```

I parent e i tag storici restano provenance e non vengono riscritti retroattivamente. Lo stato di staging, security, production-readiness o deploy di BUSINESS PLUS non viene duplicato qui: usare `CURRENT_STATE.md`, `REPOSITORY_INDEX.md` e il repository PLUS.

Il dossier canonico [`case-studies/RITO_STUDIO.md`](case-studies/RITO_STUDIO.md) rappresenta il perimetro portfolio documentato nel dossier stesso e non autorizza modifiche o pubblicazione su Tretnix.com.

L'evoluzione futura verso prenotazioni, clienti, pacchetti/fidelity o gestionale richiede scope e gate propri.

Fonti:

```text
BEAUTY_WELLNESS_FAMILY.md
family-kits/beauty-wellness-v1.1/
CURRENT_STATE.md
REPOSITORY_INDEX.md
repository RITO del piano interessato
```

---
## 6. Professional Services

| Campo | Valore |
|---|---|
| Concept | `QUADRA Studio` |
| Descriptor | `Consulenza professionale` |
| Tagline | `Chiarezza per decisioni solide.` |
| START previsto | `quadra-studio-START` |
| BUSINESS previsto | `quadra-studio-BUSINESS` |

Evoluzione:

```text
sito → lead qualificati → portale cliente → documenti/pratiche → CRM
```

Fonti:

```text
PROFESSIONAL_SERVICES_FAMILY.md
family-kits/professional-services-v1.0/
```

---

## 7. Home & Local Services

| Campo | Valore |
|---|---|
| Concept | `NODO Servizi` |
| Descriptor | `Interventi, impianti e manutenzione` |
| Tagline | `Il lavoro fatto bene, dal primo contatto.` |
| START previsto | `nodo-servizi-START` |
| BUSINESS previsto | `nodo-servizi-BUSINESS` |

Evoluzione:

```text
sito → richieste/preventivi → sopralluoghi → calendario tecnici → gestionale
```

Fonti:

```text
HOME_LOCAL_SERVICES_FAMILY.md
family-kits/home-local-services-v1.0/
```

---

## 8. Sequenza storica del ciclo intensivo

La sequenza RITO → QUADRA → NODO registrata nel ciclo iniziale resta provenance storica, non priorità operativa corrente.

Le priorità attuali appartengono a `CURRENT_STATE.md`, issue/roadmap e task approvati. Non usare questa sezione per autorizzare l'avvio di un progetto.

---

## 9. Gate START corrente

Prima di ogni nuovo START:

- esiste un comando esplicito riferito al progetto e al piano corretti;
- repository creation, paid-tool use e servizi esterni sono autorizzati separatamente quando necessari;
- repository e baseline iniziali sono identificati prima della scrittura;
- la specifica/family kit applicabile è identificata e revisionata;
- `STATUS.md` passa a `IMPLEMENTATION_AUTHORIZED` soltanto dopo il gate owner;
- scope, out-of-scope, acceptance criteria e required verification sono espliciti;
- backend, auth, database, upload e raccolta dati restano fuori scope quando la specifica lo richiede;
- opera un solo writer sullo stesso working tree.

Il toolchain corrente segue `TRX-DEC-041`: ChatGPT coordina e revisiona, Codex è il writer operativo principale, GitHub è il checkpoint versionato. Lovable non è un prerequisito generale.

`TRX-DEC-025` resta provenance del ciclo storico RITO Studio START. Non costituisce un gate automatico per Professional Services, Home & Local Services o piani RITO successivi.

---
## 10. START → BUSINESS

```text
specifica approvata
→ START
→ Impeccable read-only
→ finding approvati
→ Codex e QA
→ freeze e tag START
→ contratto di eredità
→ autorizzazione BUSINESS
→ BUSINESS derivato dalla baseline START
→ consolidamento e parity review
→ QA comparativa
→ freeze BUSINESS
```

BUSINESS eredita identità, palette, tipografia, spacing, immagini, componenti, navbar, footer, pulsanti, motion, tono e comportamento mobile. Può espandere route, contenuti, SEO e funzionalità approvate.

Non ricostruire BUSINESS da un progetto vuoto e non applicare redesign indipendenti.

---

## 11. Separazione delle fonti

| Informazione | Destinazione |
|---|---|
| decisione trasversale | `DECISIONS.md` |
| standard condiviso | `DEVELOPMENT_STANDARDS.md` |
| mappa portfolio e lifecycle | questo documento |
| governance famiglia | documento `*_FAMILY.md` |
| specifica completa | `family-kits/` |
| repository reale | `REPOSITORY_INDEX.md` |
| stato trasversale | `CURRENT_STATE.md` |
| stato locale | repository progetto, `docs/STATUS.md` |
| task e bug | issue, PR, audit o roadmap |
| provenienza pacchetti | `SOURCE_ARTIFACT_REGISTER.md` |

---

## 12. Criterio di completezza

Una famiglia è indipendente dalle chat quando:

- specifica completa versionata;
- decisioni e gate registrati;
- concept e repository previsti documentati;
- prompt e checklist disponibili;
- manifest e provenienza registrati;
- stato aggiornato;
- task residui trasferiti fuori dalle chat;
- una nuova sessione ricostruisce correttamente il lavoro dai file.

Beauty, Professional e Home soddisfano il criterio documentale della rispettiva specifica. Per Beauty & Wellness i gate iniziali sono stati superati dal lineage RITO reale e lo stato corrente è quello dei repository e di `CURRENT_STATE.md`; per Professional Services e Home & Local Services l'implementazione resta non autorizzata finché i rispettivi gate non vengono soddisfatti.
