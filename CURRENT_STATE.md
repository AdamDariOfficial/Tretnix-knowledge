# Tretnix Current State

**Versione:** 1.0
**Aggiornato:** 26 luglio 2026
**Stato:** snapshot operativo trasversale; aggiornare quando cambia un gate, una baseline o una fase

---

## 1. Scopo

Questo file riduce la dipendenza dalle chat per lo stato corrente dei progetti principali.

Non sostituisce:

- `DECISIONS.md` per le decisioni permanenti;
- `REPOSITORY_INDEX.md` per l’inventario;
- `docs/STATUS.md` nei singoli repository;
- GitHub Issues per task e bug;
- commit, pull request e deploy come evidenza tecnica.

---

## 2. Livelli di evidenza dello stato

| Codice | Significato |
|---|---|
| `VR` | verificato nella repository o in un artefatto versionato identificabile |
| `VD` | verificato nel deploy dal proprietario e registrato nei documenti canonici |
| `HR` | riportato in un handoff o in una chat di progetto, ma non ancora riconciliato con commit/PR |
| `NV` | non verificabile con gli accessi o gli artefatti disponibili |

Uno stato `HR` non deve essere trasformato in fatto tecnico più forte senza commit, diff, PR o esecuzione.

---

## 3. Tretnix Knowledge

| Campo | Valore |
|---|---|
| Repository | `https://github.com/AdamDariOfficial/Tretnix-knowledge.git` |
| Branch baseline analizzata | `main` |
| Commit baseline completo | `60ac030d0c231443f1879c9bafc46f2626769f3d` |
| Contenuto baseline | 23 file, 6.175 righe |
| Evidenza | `VR` |
| Visibilità osservata il 26 luglio 2026 | pubblica |
| Visibilità consigliata nei documenti precedenti | privata |

La scelta tra visibilità pubblica e privata resta una decisione del proprietario. Questo aggiornamento non modifica le impostazioni GitHub.

---

## 4. Forno Lume START

| Campo | Valore |
|---|---|
| Repository | `forno-lume-START` |
| Baseline di chiusura | `d15f639267dfdd57194536154abfa1d0ff3b4542` |
| Stato | completato, rimediato, verificato, documentato e congelato |
| Evidenza | `VR` + `VD` nei documenti canonici |

Azioni ammesse:

- bug confermato;
- regressione confermata;
- sicurezza;
- requisito di prodotto approvato.

Il backlog opzionale non autorizza nuove modifiche.

---

## 5. Forno Lume BUSINESS

| Campo | Valore |
|---|---|
| Baseline `main` registrata dopo Package C | `15a8bf4de41bc1657a79f58699859a015ee7820d` |
| Package A | completato e unito |
| Package B | completato e unito |
| Micro-fix “L'incontro” | completato e unito |
| Package B2 | completato e unito |
| Package C | completato, unito, costruito e verificato in produzione |
| Package D | pendente, separato e non implicito |
| Evidenza | `VR` + `VD` nei documenti canonici |

BUSINESS non è ancora dichiarato congelato come repository completa.

---

## 6. Tretnix.com

### Stato generale

| Campo | Valore |
|---|---|
| Repository | `tretnix` |
| Deploy | `https://tretnix.com` |
| Stato generale | produzione, remediation controllata |
| Audit trasversale completo | non registrato come completato nella knowledge baseline |

### Handoff operativo più recente disponibile

Le seguenti informazioni sono `HR`, non ancora riconciliate con il repository in questa attività:

- `CF-1`, accessibilità del form contatti, è riportato come implementato e verificato;
- la relativa pull request è riportata come ancora da unire;
- dopo il merge occorre sincronizzare `main` in locale;
- occorre verificare il working tree pulito;
- il mismatch di hydration relativo agli attributi `data-tsd-source` deve essere investigato in sola lettura;
- gli altri finding approvati devono procedere uno per branch;
- prima di ogni incarico Codex deve essere indicato il modello consigliato e il motivo.

Dati ancora mancanti per elevare lo stato a `VR`:

- numero o URL della pull request CF-1;
- branch;
- commit completo;
- output delle verifiche;
- esito del merge;
- baseline locale sincronizzata;
- report dell’indagine hydration.

Finché questi dati non sono registrati, non dichiarare il merge o la chiusura di CF-1 come verificati dalla knowledge repository.

---

## 7. Beauty & Wellness

| Campo | Valore |
|---|---|
| Specifica | Beauty & Wellness `v1.1` |
| Stato specifica | approvata e congelata, riportata nel development pack |
| Primo progetto | `RITO Studio START` |
| Preparazione | `PREPARATION_COMPLETE` |
| Implementazione | `IMPLEMENTATION_NOT_STARTED` |
| Evidenza | `HR` per i dettagli del pack; governance registrata canonicamente |

Gate mancanti:

```text
LOVABLE_SUBSCRIPTION_CONFIRMED
RITO_STUDIO_START_AUTHORIZED
```

Prima di entrambi i gate non creare progetti Lovable, non consumare crediti, non creare repository remote, non pubblicare e non iniziare BUSINESS.

---

## 8. Professional Services

| Campo | Valore |
|---|---|
| Famiglia | dichiarata come preparata in un pacchetto recente |
| Specifica integrale nella repository | assente |
| Repository di progetto | nessuna dichiarata |
| Implementazione autorizzata | no |
| Evidenza | `HR` / `NV` per i dettagli |

Non inventare contenuti o requisiti finché il pacchetto non viene acquisito.

---

## 9. Home & Local Services

| Campo | Valore |
|---|---|
| Famiglia | dichiarata come preparata in un pacchetto recente |
| Specifica integrale nella repository | assente |
| Repository di progetto | nessuna dichiarata |
| Implementazione autorizzata | no |
| Evidenza | `HR` / `NV` per i dettagli |

Non inventare contenuti o requisiti finché il pacchetto non viene acquisito.

---

## 10. Ordine operativo corrente

1. integrare questa patch nella repository canonica dopo review;
2. acquisire nella repository i byte o il contenuto integrale del development pack del 25 luglio;
3. completare e verificare il merge CF-1 nel repository `tretnix`;
4. sincronizzare e verificare `main` pulito;
5. investigare `data-tsd-source` in sola lettura;
6. continuare i finding Tretnix.com uno per branch;
7. mantenere Forno Lume START congelato;
8. trattare Package D di BUSINESS separatamente;
9. avviare `RITO Studio START` soltanto dopo entrambi i gate;
10. aggiornare questo file quando uno stato cambia.

---

## 11. Regola di aggiornamento

Quando uno stato cambia, registrare almeno:

- data;
- repository;
- branch;
- commit completo o PR;
- evidenza;
- verifiche realmente eseguite;
- prossimo gate;
- task trasferiti alle issue.

Rimuovere gli stati superati invece di accumulare cronologie indefinite. La cronologia resta in Git.
