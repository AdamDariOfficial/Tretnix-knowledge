# Tretnix Professional Services Family

**Versione:** 1.0
**Aggiornato:** 26 luglio 2026
**Stato:** canonico per governance e indice; specifica completa acquisita in `family-kits/professional-services-v1.0/`

---

## 1. Baseline approvata

| Campo | Valore |
|---|---|
| Famiglia | Professional Services |
| Concept portfolio | `QUADRA Studio` |
| Descriptor | `Consulenza professionale` |
| Tagline | `Chiarezza per decisioni solide.` |
| Versione | `1.0` |
| Data approvazione | 25 luglio 2026 |
| Stato | `PREPARATION_COMPLETE / IMPLEMENTATION_NOT_STARTED` |
| Repository previsto START | `quadra-studio-START` |
| Repository previsto BUSINESS | `quadra-studio-BUSINESS` |
| Repository realmente creati | nessuno al momento della baseline |

Naming e dominio non sono verificati per un cliente reale.

---

## 2. Perimetro

Cliente ideale:

- commercialisti;
- avvocati;
- consulenti;
- architetti;
- ingegneri e studi tecnici;
- professionisti B2B;
- boutique advisory;
- piccoli studi multidisciplinari.

Evoluzione:

```text
sito
→ lead qualificati
→ portale cliente
→ documenti e pratiche
→ CRM e workflow
```

START e BUSINESS v1 non includono portale, autenticazione, upload, gestione documentale o CRM.

---

## 3. Identità

Direzione:

- autorevole;
- precisa;
- sobria;
- strutturata;
- editoriale;
- professionale senza estetica bancaria generica.

Baseline:

- carta, inchiostro e verde profondo;
- `Source Serif 4` per display;
- `IBM Plex Sans` per corpo e UI;
- griglia editoriale;
- linee, indici e gerarchie leggibili;
- motion sobrio;
- niente corporate blue generico, fintech glow, parallax, counter, marquee o cursore custom.

Fonte completa:

```text
family-kits/professional-services-v1.0/docs/DESIGN.md
family-kits/professional-services-v1.0/docs/ANIMATIONS.md
```

---

## 4. START

START è one-page, statico e senza backend. Include privacy, cookie, note legali e 404.

Obiettivi:

- rendere leggibili competenze complesse;
- spiegare metodo e specializzazioni;
- qualificare il primo contatto;
- mostrare prove reali e verificabili;
- evitare raccolta prematura di dati sensibili.

Lead mode previsti:

```text
external
email
request
demo
```

Nella demo non vengono inviati dati.

---

## 5. BUSINESS

BUSINESS deriva dal commit canonico START e può aggiungere:

- competenze e relativi dettagli;
- settori;
- studio;
- professionisti;
- insight o contenuti;
- richiesta qualificata;
- SEO route-specific.

Route come casi, pubblicazioni, eventi o area clienti sono condizionali e devono esistere soltanto con contenuti o funzioni reali.

Sono vietati case study, qualifiche, iscrizioni ad albi, lingue, certificazioni o anni di esperienza inventati.

---

## 6. Riservatezza e dati

Il primo contatto deve applicare il principio del minimo dato. Non chiedere:

- documenti;
- credenziali;
- dati sanitari;
- dettagli legali o fiscali riservati;
- informazioni finanziarie sensibili;
- allegati nella v1.

Ogni futuro portale o workflow documentale richiede un progetto separato di sicurezza, privacy, autorizzazione e retention.

---

## 7. Gate

La baseline è approvata ma non autorizza:

- progetto Lovable;
- consumo crediti;
- repository remoto;
- backend;
- pubblicazione;
- raccolta dati;
- BUSINESS prima del freeze START.

L'avvio richiede abbonamenti attivi, workspace e saldo registrati, repository pronto, comando esplicito e `STATUS.md` su `IMPLEMENTATION_AUTHORIZED`.

---

## 8. Fonti complete

```text
family-kits/professional-services-v1.0/
├── docs/
├── prompts/
├── checklists/
├── MANIFEST.json
└── README.md
```

Il kit include prodotto, design, copy completo, route, motion, testing, decisioni, contratto START → BUSINESS, offerta commerciale, adattatori verticali, discovery, asset plan, bootstrap repository, prompt e checklist.

---

## 9. Verifica e freeze

Applicare la matrice Tretnix condivisa e il testing specifico del kit. BUSINESS può iniziare soltanto dopo:

- audit e QA START;
- baseline SHA;
- tag;
- contratto di eredità compilato;
- nuova autorizzazione.

La specifica completa è indipendente dalle chat dopo il merge di questa integrazione.
