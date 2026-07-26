# Tretnix Portfolio and Verticals

**Versione:** 1.1
**Aggiornato:** 26 luglio 2026
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

| Verticale | Concept | Specifica | Progetti | Stato |
|---|---|---|---|---|
| Food & Hospitality | Forno Lume | `HOSPITALITY_FAMILY.md` | START; BUSINESS | START congelato; BUSINESS verificato fino al Package C; Package D separato |
| Beauty & Wellness | RITO Studio | `family-kits/beauty-wellness-v1.1/` | START; BUSINESS | preparazione completa; implementazione non iniziata |
| Professional Services | QUADRA Studio | `family-kits/professional-services-v1.0/` | START; BUSINESS | preparazione completa; implementazione non iniziata |
| Home & Local Services | NODO Servizi | `family-kits/home-local-services-v1.0/` | START; BUSINESS | preparazione completa; implementazione non iniziata |

Le specifiche dei tre nuovi verticali sono approvate come baseline di preparazione. Non autorizzano automaticamente Lovable, repository remote, backend, deploy o raccolta dati.

---

## 4. Food & Hospitality

```text
Forno Lume START
└── RELEASED + FROZEN
    └── Forno Lume BUSINESS
        └── RELEASED fino al Package C
            └── Package D separato e pendente
```

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
| START previsto | `rito-studio-START` |
| BUSINESS previsto | `rito-studio-BUSINESS` |
| Primo deliverable | RITO Studio START |

Evoluzione:

```text
sito → prenotazioni → clienti → pacchetti/fidelity → gestionale
```

Fonti:

```text
BEAUTY_WELLNESS_FAMILY.md
family-kits/beauty-wellness-v1.1/
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

## 8. Ordine del mese intensivo

Priorità approvata:

```text
1. RITO Studio START
2. RITO Studio BUSINESS
3. QUADRA Studio START
4. QUADRA Studio BUSINESS
5. NODO Servizi START
```

Stretch goal:

```text
6. NODO Servizi BUSINESS
```

Qualità, QA e freeze dei deliverable precedenti hanno priorità sullo stretch goal.

---

## 9. Gate START

Prima di ogni nuovo START:

- abbonamenti necessari attivi;
- workspace e consumi verificati;
- comando esplicito riferito al progetto corretto;
- repository e branch iniziali identificati;
- specifica copiata e congelata;
- `STATUS.md` su `IMPLEMENTATION_AUTHORIZED`;
- scope e prompt revisionati;
- backend, auth, database, upload e raccolta dati confermati fuori scope quando previsto;
- nessun secondo agente sugli stessi file.

Per RITO valgono inoltre i due gate espliciti:

```text
LOVABLE_SUBSCRIPTION_CONFIRMED
RITO_STUDIO_START_AUTHORIZED
```

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

Beauty, Professional e Home soddisfano il criterio documentale dopo il merge di questa integrazione. L'implementazione resta non autorizzata finché i rispettivi gate non vengono soddisfatti.
