# Tretnix Beauty & Wellness Family

**Versione:** 1.2
**Aggiornato:** 13 agosto 2026
**Stato:** canonico per governance e indice; specifica completa acquisita in `family-kits/beauty-wellness-v1.1/`

---

## 1. Scopo

Questo documento è l'indice canonico della famiglia Beauty & Wellness. La specifica completa, i prompt e le checklist sono versionati in:

```text
family-kits/beauty-wellness-v1.1/
```

Non duplicare o ricostruire da memoria i dettagli presenti nel family kit. In caso di conflitto:

1. prevalgono le decisioni Tretnix trasversali;
2. seguono gli standard condivisi;
3. seguono `family-kits/beauty-wellness-v1.1/docs/DECISIONS.md` e gli altri documenti approvati del kit;
4. lo stato operativo corrente prevale soltanto per i gate e le transizioni, non per reinterpretare la specifica.

---

## 2. Baseline approvata e lineage corrente

| Campo | Valore |
|---|---|
| Famiglia | Beauty & Wellness |
| Concept portfolio | `RITO Studio` |
| Descriptor | `Beauty & Care Atelier` |
| Tagline | `La bellezza, nel suo ritmo.` |
| Specifica famiglia | `v1.1`, approvata 25 luglio 2026 |
| RITO START | repository reale; `main` verificato a `34c13cd78255b7ac009533790329cada74ae9d8a` |
| RITO BUSINESS | repository reale; `main` verificato a `b95a63c6127d2bc1dd396d74b2dd25f87b952226` |
| RITO BUSINESS PLUS | repository reale; remote `main` verificato a `eba1a2a91fd3a531b4a4667d038b631758d0a664`; sviluppo/live staging successivi ancora da integrare |
| Stato famiglia | START e BUSINESS implementati; BUSINESS PLUS esplicitamente autorizzato e in chiusura tecnica/staging; freeze del lineage riportato dal candidate PLUS, con allineamento documentale dei parent ancora pendente |

La specifica Beauty & Wellness v1.1 continua a governare identità, design e principi della famiglia. Il dettaglio dello stato di ciascun progetto vive nel relativo repository e in `CURRENT_STATE.md`; non ricostruirlo da questa baseline storica.

Naming e dominio del concept non risultano verificati per l'uso con un cliente reale.

---

## 3. Cliente ideale e perimetro

La famiglia serve principalmente:

- parrucchieri;
- barber shop;
- centri estetici;
- nail studio;
- spa;
- massaggiatori;
- piccoli studi wellness.

L'evoluzione prevista è:

```text
sito
→ prenotazioni
→ clienti
→ pacchetti e fidelity
→ gestionale
```

START e BUSINESS v1 non includono agenda live, pagamenti, fidelity, CRM o gestionale. Questi ambiti appartengono a BUSINESS PLUS, CUSTOM o a un task futuro approvato.

Il concept è modulare: un cliente reale usa soltanto categorie e moduli pertinenti. Non è obbligato a offrire contemporaneamente Hair, Skin, Nails e Wellness.

---

## 4. Identità approvata

Direzione:

- ariosa;
- tattile;
- elegante;
- contemporanea;
- intima senza essere fragile;
- premium senza cliché rosa o medicali.

Baseline visuale:

- palette porcellana, inchiostro e borgogna;
- tipografia `Newsreader` per il display;
- tipografia `Manrope` per UI e testo;
- composizione asimmetrica;
- fotografia tattile e autentica;
- uso limitato delle card;
- nessun cursore personalizzato;
- nessun glassmorphism, gradient text generico o estetica SaaS.

I token esatti, la scala tipografica, le spaziature, i componenti e i criteri visuali sono in:

```text
family-kits/beauty-wellness-v1.1/docs/DESIGN.md
```

La fotografia, gli asset minimi, i rapporti e i brief sono in:

```text
family-kits/beauty-wellness-v1.1/docs/ASSET_PLAN.md
```

---

## 5. START

`RITO Studio START` è:

- statico;
- mobile-first;
- one-page;
- senza backend;
- senza autenticazione;
- senza database;
- senza booking nativo;
- con privacy, cookie e 404;
- con CTA verso telefono, WhatsApp, provider esterno o modalità demo configurata.

Route previste:

```text
/
/privacy
/cookie
/*
```

Anchor previsti:

```text
#trattamenti
#metodo
#studio
#contatti
```

L'ordine esatto delle sezioni, il copy completo e i dati demo sono in:

```text
family-kits/beauty-wellness-v1.1/docs/ROUTES.md
family-kits/beauty-wellness-v1.1/docs/CONTENT.md
```

---

## 6. BUSINESS

`RITO Studio BUSINESS` deve derivare dal commit canonico dello START congelato e può aggiungere:

- catalogo trattamenti;
- dettaglio trattamento;
- studio;
- team;
- galleria;
- FAQ;
- contatti;
- prenotazione configurabile;
- SEO route-specific.

Booking mode supportati:

```text
external
whatsapp
request
demo
```

BUSINESS non include di default agenda live, pagamenti, account, pacchetti, fidelity o gestionale.

Le route e il contratto di eredità sono in:

```text
family-kits/beauty-wellness-v1.1/docs/ROUTES.md
family-kits/beauty-wellness-v1.1/docs/START_BUSINESS_CONTRACT.md
```

---

## 7. Motion

Il linguaggio di animazione deve essere raffinato, controllato e accessibile:

- hero con entrata coordinata;
- reveal sotto la fold al momento dell'ingresso nel viewport;
- image reveal sobrio;
- hover senza layout shift;
- drawer e navbar accessibili;
- gallery e lightbox BUSINESS controllate;
- route reset immediato;
- `prefers-reduced-motion` rispettato;
- nessun parallax invasivo, counter, marquee o replay casuale.

La specifica completa è in:

```text
family-kits/beauty-wellness-v1.1/docs/ANIMATIONS.md
```

---

## 8. Integrità dei contenuti

Sono vietati:

- recensioni inventate;
- metriche o risultati inventati;
- certificazioni non verificate;
- attività reali fittizie;
- prezzi non approvati;
- invio di dati personali nella demo;
- riferimenti pubblici agli strumenti interni.

La demo deve dichiarare il proprio stato e non trasmettere dati. Il copy approvato e le regole demo sono in `docs/CONTENT.md` del family kit.

---

## 9. Lifecycle operativo corrente

Il gate Lovable originario per avviare RITO Studio START è storico ed è stato soddisfatto/superato dal lineage reale successivo. Non deve essere interpretato come blocco corrente di START, BUSINESS o del BUSINESS PLUS separatamente autorizzato.

Per il lavoro corrente:

- preservare la specifica Beauty & Wellness v1.1 e le baseline verificate;
- usare i documenti del repository RITO BUSINESS PLUS per scope, sicurezza, live backend e gate di staging;
- trattare le dichiarazioni di freeze dei parent come evidenza da riallineare nei rispettivi repository prima di promuoverle a stato canonico trasversale definitivo;
- non estendere automaticamente lo scope PLUS a CRM, pagamenti, agenda o altre funzionalità non approvate;
- non autorizzare produzione per inferenza;
- mantenere Cloudflare come provider del candidate corrente senza trasformarlo in dipendenza di dominio o standard obbligatorio della famiglia;
- completare debugging ed E2E prima del successivo boundary-hardening architetturale.

### Gate storico START — soddisfatto e preservato come evidenza

Il gate originario richiedeva, prima della prima chiamata a Lovable:

```text
LOVABLE_SUBSCRIPTION_CONFIRMED
RITO_STUDIO_START_AUTHORIZED
```

Il runbook richiedeva inoltre:

- piano e rinnovo registrati;
- workspace corretto;
- saldo crediti verificato;
- ricarica automatica indesiderata disabilitata;
- repository START creato;
- specifica v1.1 copiata;
- branch iniziale;
- `STATUS.md` portato a `IMPLEMENTATION_AUTHORIZED`;
- prompt START revisionato;
- backend, auth, database e upload confermati fuori scope.

Finché quei gate mancavano, era vietato:

- creare il progetto Lovable;
- consumare crediti;
- creare repository remote;
- pubblicare;
- iniziare BUSINESS;
- reinterpretare la specifica.

Runbook e checklist storici:

```text
family-kits/beauty-wellness-v1.1/checklists/SUBSCRIPTION_ACTIVATION_RUNBOOK.md
operations/development-launch-2026-07-25/SUBSCRIPTION_AND_FIRST_BUILD_CHECKLIST.md
```

Queste condizioni restano evidenza del processo di avvio e non vengono cancellate dalla progressione successiva del prodotto. Lo stato corrente è quello registrato in `CURRENT_STATE.md` e nei repository RITO.

---

## 10. Pipeline approvata

```text
specifica Beauty v1.1
→ repository rito-studio-START
→ Lovable START
→ sincronizzazione GitHub
→ stop Lovable
→ Impeccable detector e critique read-only
→ approvazione manuale dei finding
→ applicazione dei soli finding approvati
→ Codex audit e consolidamento
→ verifiche disponibili
→ browser QA
→ freeze START
→ SHA + tag beauty-start-v1.0
→ BUSINESS derivato dallo START
```

Lovable, Codex e altri agenti non devono modificare contemporaneamente gli stessi file.

---

## 11. Verifiche

Eseguire soltanto comandi realmente configurati e registrare per ciascuno comando, exit code, risultato e limiti.

Matrice minima:

- 360 px;
- 390 px;
- 430 px;
- 768 px;
- desktop;
- overflow;
- tastiera e focus;
- contrasto;
- reduced motion;
- direct URL;
- refresh;
- back e forward;
- console e rete;
- immagini e layout shift;
- legal pages;
- 404;
- metadata;
- attribuzione Tretnix.

Specifiche complete:

```text
family-kits/beauty-wellness-v1.1/docs/TESTING.md
family-kits/beauty-wellness-v1.1/checklists/START_FREEZE_CHECKLIST.md
family-kits/beauty-wellness-v1.1/checklists/BUSINESS_FREEZE_CHECKLIST.md
```

---

## 12. Adattatori e prompt

Il kit contiene adattatori per:

- Hair Salon;
- Barber Shop;
- Beauty Centre;
- Nail Studio;
- Spa;
- Massage / Wellness Studio.

Contiene inoltre prompt approvati per Lovable, Codex e Impeccable. Questi prompt sono input operativi versionati, non autorizzazioni automatiche all'esecuzione.

---

## 13. Criterio di indipendenza dalle chat

La famiglia è documentalmente ricostruibile dalla repository quando questa modifica è unita a `main`, perché sono presenti:

- specifica completa;
- decisioni locali;
- design;
- contenuti;
- route;
- motion;
- testing;
- prompt;
- checklist;
- manifest e checksum sorgente;
- handoff di sviluppo.

Restano nelle chat o nelle issue soltanto task e stati successivi non ancora formalizzati.
