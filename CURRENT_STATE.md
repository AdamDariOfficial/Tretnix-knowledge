# Tretnix Current State

**Versione:** 1.1
**Aggiornato:** 26 luglio 2026
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
| `main` osservato | versione 1.4, commit precedente al consolidamento |
| Branch di lavoro | `docs/consolidate-tretnix-state-2026-07-26` |
| Primo commit branch | `9ff9546` |
| Stato branch | pubblicato sul remoto secondo output Git fornito dall'utente |
| Pull request | non ancora aperta al momento dell'ultima verifica |
| Development pack | acquisito, verificato ed estratto |
| Evidenza | `VR` per artefatti locali; `HR` per stato remoto del branch |

Il branch contiene il primo consolidamento di 22 file. La presente integrazione aggiunge i family kit completi e deve essere committata sullo stesso branch prima di aprire la PR.

---

## 3. Forno Lume START

| Campo | Valore |
|---|---|
| Repository | `forno-lume-START` |
| Baseline di chiusura | `d15f639267dfdd57194536154abfa1d0ff3b4542` |
| Stato | completato, verificato, documentato e congelato |
| Evidenza | `VR` + `VD` |

Interventi ammessi: bug, regressione, sicurezza o requisito approvato.

---

## 4. Forno Lume BUSINESS

| Campo | Valore |
|---|---|
| Baseline Package C | `15a8bf4de41bc1657a79f58699859a015ee7820d` |
| Package A, B, B2 e C | completati e uniti |
| Package D | pendente e separato |
| Stato complessivo | produzione; non ancora dichiarato completamente congelato |
| Evidenza | `VR` + `VD` |

---

## 5. Tretnix.com

| Campo | Valore |
|---|---|
| Repository | `tretnix` |
| Deploy | `https://tretnix.com` |
| Stato | produzione, remediation controllata |
| Evidenza dello stato recente | `HR` |

Da riconciliare:

- CF-1 riportato come implementato e verificato;
- PR CF-1 da identificare e unire;
- `main` locale da sincronizzare;
- working tree da verificare pulito;
- `data-tsd-source` da investigare in sola lettura;
- finding successivi uno per branch;
- modello Codex consigliato prima di ogni incarico.

Servono PR, branch, commit completo, output dei controlli e report hydration per elevare lo stato a `VR`.

---

## 6. Beauty & Wellness

| Campo | Valore |
|---|---|
| Specifica | `family-kits/beauty-wellness-v1.1/` |
| Concept | RITO Studio |
| Primo progetto | RITO Studio START |
| Stato | `PREPARATION_COMPLETE / IMPLEMENTATION_NOT_STARTED` |
| Repository | non creata |
| Implementazione autorizzata | no |
| Evidenza | `VR` per la specifica e i gate |

Gate mancanti:

```text
LOVABLE_SUBSCRIPTION_CONFIRMED
RITO_STUDIO_START_AUTHORIZED
```

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

1. completare e revisionare l'integrazione del development pack sul branch corrente;
2. aprire la PR Tretnix Knowledge e verificare l'intero diff;
3. unire e sincronizzare `main`;
4. eseguire la prova di ricostruzione senza chat;
5. riconciliare CF-1 e hydration nel repository `tretnix`;
6. mantenere Forno Lume START congelato;
7. trattare Package D BUSINESS separatamente;
8. attivare gli abbonamenti soltanto quando deciso;
9. avviare esclusivamente RITO Studio START dopo i gate;
10. non iniziare BUSINESS prima del freeze START.

---

## 10. Cancellazione chat

Il development pack e le tre specifiche non sono più un blocco documentale dopo il merge.

Prima di cancellare tutte le chat devono comunque essere completati:

- merge della knowledge aggiornata;
- sincronizzazione locale di `main`;
- prova di bootstrap in una nuova sessione;
- conservazione offline dello ZIP originale;
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
