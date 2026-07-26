# Tretnix Home & Local Services Family

**Versione:** 1.0
**Aggiornato:** 26 luglio 2026
**Stato:** canonico per governance e indice; specifica completa acquisita in `family-kits/home-local-services-v1.0/`

---

## 1. Baseline approvata

| Campo | Valore |
|---|---|
| Famiglia | Home & Local Services |
| Concept portfolio | `NODO Servizi` |
| Descriptor | `Interventi, impianti e manutenzione` |
| Tagline | `Il lavoro fatto bene, dal primo contatto.` |
| Versione | `1.0` |
| Data approvazione | 25 luglio 2026 |
| Stato | `PREPARATION_COMPLETE / IMPLEMENTATION_NOT_STARTED` |
| Repository previsto START | `nodo-servizi-START` |
| Repository previsto BUSINESS | `nodo-servizi-BUSINESS` |
| Repository realmente creati | nessuno al momento della baseline |

Naming e dominio non sono verificati per un cliente reale.

---

## 2. Perimetro

Cliente ideale:

- elettricisti;
- idraulici;
- imprese edili;
- serramentisti;
- climatizzazione;
- fotovoltaico;
- giardinieri;
- imprese di pulizie;
- manutentori e installatori.

Evoluzione:

```text
sito
→ richieste e preventivi
→ sopralluoghi
→ calendario tecnici
→ gestionale
```

START e BUSINESS v1 non includono preventivo automatico, upload, calendario, assegnazione tecnici, pagamenti, account o CRM.

---

## 3. Identità

Direzione:

- concreta;
- affidabile;
- diretta;
- ordinata;
- tecnica senza essere fredda;
- locale senza sembrare amatoriale;
- premium senza ostentazione;
- orientata alla conversione.

Baseline visuale:

- canvas `#F3F1EB`;
- surface `#DEDCD3`;
- ink `#161A1B`;
- accent `#174A55`;
- signal `#D28A2D` usato con moderazione;
- `Archivo` per display;
- `Inter` per corpo e UI;
- forme nette, bordi visibili, ombre limitate;
- nessun rosso urgenza dominante, marketplace look, badge 24/7 finto, glassmorphism o glow.

Fonte completa:

```text
family-kits/home-local-services-v1.0/docs/DESIGN.md
family-kits/home-local-services-v1.0/docs/ANIMATIONS.md
```

---

## 4. START

START è one-page, statico e senza backend. Include:

- servizi principali;
- processo operativo;
- prove reali o scenari demo dichiarati;
- area servita;
- CTA telefono, WhatsApp, provider esterno o demo;
- privacy, cookie, note legali e 404.

Route:

```text
/
/privacy
/cookie
/note-legali
/*
```

Anchor:

```text
#servizi
#metodo
#lavori
#area
#contatti
```

Nella demo non usare telefono, WhatsApp, lavori, certificazioni, recensioni, aree o claim come se fossero reali.

---

## 5. BUSINESS

BUSINESS deriva dal commit canonico START e può aggiungere:

- pagine servizio;
- settori;
- lavori reali autorizzati;
- azienda e team;
- aree servite;
- FAQ;
- richiesta preventivo o sopralluogo qualificata;
- SEO locale route-specific.

Lead mode:

```text
call
whatsapp
external
request
demo
```

Route come `/pronto-intervento`, `/manutenzione-programmata` e `/area-clienti` sono opzionali e si attivano soltanto quando il servizio o la funzione esistono realmente.

---

## 6. Integrità e sicurezza

Sono vietati:

- badge 24/7 fittizi;
- tempi di risposta inventati;
- recensioni o rating inventati;
- certificazioni non verificate;
- lavori non propri;
- aree servite non reali;
- prezzi o preventivi fasulli;
- invio dati nella demo;
- upload nella v1;
- richieste di dati catastali, documenti, credenziali o dati sensibili nel primo contatto.

Le fotografie devono essere autorizzate e non esporre volti, targhe, indirizzi o dettagli sensibili senza consenso.

---

## 7. Gate

La baseline approvata non autorizza:

- progetto Lovable;
- consumo crediti;
- repository remoto;
- backend;
- pubblicazione;
- BUSINESS prima del freeze START.

L'avvio richiede abbonamenti attivi, workspace e saldo registrati, repository pronto, comando esplicito e `STATUS.md` su `IMPLEMENTATION_AUTHORIZED`.

---

## 8. Fonti complete

```text
family-kits/home-local-services-v1.0/
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
