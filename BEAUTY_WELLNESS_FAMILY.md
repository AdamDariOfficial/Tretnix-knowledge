# Tretnix Beauty & Wellness Family

**Versione:** 1.0
**Aggiornato:** 26 luglio 2026
**Stato:** canonico per governance, stato e gate; specifica visuale e contenutistica completa da acquisire dal development pack v1.1

---

## 1. Scopo

Questo documento conserva il contratto operativo confermato della famiglia Beauty & Wellness e impedisce che l’avvio del primo progetto dipenda esclusivamente da una chat.

Non ricostruisce dettagli mancanti della specifica `v1.1`. Palette, tipografia, immagini, copy, route, sezioni, componenti e motion devono essere importati dai file sorgente approvati prima dell’implementazione.

---

## 2. Fonte approvata

La fonte dichiarata è la specifica:

```text
Beauty & Wellness v1.1
```

contenuta o referenziata nel pacchetto:

```text
TRETNIX_NEW_CHAT_DEVELOPMENT_PACK_2026-07-25.zip
TRETNIX_DEVELOPMENT_START_HANDOFF_2026-07-25.md
```

Stato della specifica:

- approvata;
- congelata;
- destinata al primo progetto `RITO Studio START`;
- non sostituibile con una ricostruzione da memoria;
- non ancora presente integralmente nella baseline verificata di questa repository.

L’assenza dei byte sorgente è registrata in `SOURCE_ARTIFACT_REGISTER.md`.

---

## 3. Principi della famiglia

Beauty & Wellness deve rispettare l’identità generale Tretnix:

- premium;
- elegante;
- minimale;
- professionale;
- affidabile;
- chiara;
- personalizzata.

La famiglia non deve essere trasformata in:

- una landing generica intercambiabile;
- un’estetica SaaS;
- un template economico non personalizzato;
- una copia visuale di Hospitality;
- un progetto che attribuisce pubblicamente il prodotto agli strumenti interni.

Le differenze visuali intenzionali rispetto agli altri verticali devono essere preservate. Gli standard tecnici condivisi restano obbligatori.

---

## 4. Primo progetto

### RITO Studio START

| Campo | Valore |
|---|---|
| Verticale | Beauty & Wellness |
| Piano | START |
| Ruolo | primo progetto della famiglia |
| Preparazione | `PREPARATION_COMPLETE` |
| Implementazione | `IMPLEMENTATION_NOT_STARTED` |
| Repository | non dichiarata perché non ancora creata |
| Deploy | non dichiarato perché non ancora creato |
| BUSINESS | non autorizzato |

Questa tabella descrive uno stato, non autorizza una transizione.

---

## 5. Gate di avvio

Prima di qualsiasi chiamata a Lovable devono essere presenti due autorizzazioni esplicite:

```text
LOVABLE_SUBSCRIPTION_CONFIRMED
RITO_STUDIO_START_AUTHORIZED
```

Interpretazione:

1. il fondatore conferma che l’abbonamento Lovable è attivo;
2. il fondatore autorizza esplicitamente l’avvio di `RITO Studio START`.

Non dedurre i gate da:

- una domanda generica;
- una conversazione precedente;
- la disponibilità tecnica dello strumento;
- la presenza del development pack;
- lo stato `PREPARATION_COMPLETE`;
- un’autorizzazione riferita a un altro progetto.

---

## 6. Azioni vietate prima dei gate

Finché entrambi i gate non risultano soddisfatti:

- non creare progetti Lovable;
- non inviare prompt di implementazione a Lovable;
- non consumare crediti;
- non creare repository remote;
- non eseguire push;
- non pubblicare deploy;
- non creare domini o sottodomini;
- non iniziare BUSINESS;
- non modificare la specifica congelata;
- non proporre redesign fuori specifica come se fossero requisiti approvati.

Sono consentiti:

- lettura;
- inventario;
- consolidamento documentale;
- verifica della completezza degli artefatti;
- preparazione offline di task e checklist che non attivano strumenti esterni.

---

## 7. Requisiti del primo handoff di implementazione

Il primo incarico autorizzato deve includere:

1. contesto della famiglia;
2. nome e piano del progetto;
3. versione esatta della specifica;
4. elenco dei file realmente letti;
5. stato iniziale;
6. obiettivo circoscritto;
7. vincoli visuali, tecnici e commerciali;
8. criteri di accettazione;
9. verifiche obbligatorie;
10. output richiesto;
11. azioni vietate;
12. checkpoint Git e stato finale consentito.

L’agente non deve chiedere di ridefinire decisioni già presenti nei file sorgente. Deve invece segnalare con precisione un eventuale file mancante o una contraddizione.

---

## 8. Passaggio START → BUSINESS

`RITO Studio BUSINESS` non può iniziare finché `RITO Studio START` non è:

- implementato;
- verificato;
- approvato visualmente e funzionalmente;
- documentato;
- consolidato tecnicamente;
- congelato su una baseline Git identificabile.

BUSINESS deve preservare gli elementi approvati di START ed espandere il prodotto. Non deve nascere come redesign indipendente.

---

## 9. Aspetti non ancora acquisiti

Nella baseline verificata della knowledge repository non sono disponibili integralmente:

- target e perimetro dettagliato della famiglia;
- struttura esatta delle pagine o sezioni;
- copy approvato;
- palette;
- tipografia;
- asset e trattamento fotografico;
- motion language;
- responsive specification;
- CTA e dati di configurazione;
- differenze definitive tra START e BUSINESS;
- criteri visuali completi di accettazione.

Questi elementi non devono essere inventati. Devono essere copiati o trasformati in documentazione canonica a partire dal development pack approvato.

---

## 10. Criterio di chiusura della migrazione

La famiglia può essere considerata indipendente dalle chat quando:

- i due artefatti sorgente risultano archiviati o integralmente estratti;
- la specifica v1.1 è presente in forma verificabile;
- non rimangono decisioni soltanto conversazionali;
- gli adattatori degli strumenti puntano ai file canonici;
- lo stato del progetto è aggiornato;
- eventuali task sono in GitHub Issues o roadmap.
