# Tretnix Current State

**Versione:** 1.5
**Aggiornato:** 27 luglio 2026
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
| `main` verificato | `996d6b8` — merge PR #8, Controlled Change Package formalizzato |
| Snapshot canonico ricevuto | `Tretnix-knowledge-de29f4f3.zip` |
| Development pack | acquisito, verificato, estratto e integrato in `main` |
| Family kit | Beauty v1.1, Professional v1.0 e Home v1.0 presenti |
| Visibilità | pubblica temporaneamente secondo `TRX-DEC-031` |
| Validazione knowledge | PowerShell validator `PASSED` dopo il merge `996d6b8` |
| Evidenza | `VR` per commit, archive e contenuti versionati |
| Controlled Change Package | canonico in `main` da `996d6b8`; `Apply → Validate` è il metodo standard per cambi non banali esterni |

La precedente fase di consolidamento è confluita in `main`. I riferimenti al branch `docs/consolidate-tretnix-state-2026-07-26` e al primo commit `9ff9546` restano nella cronologia Git e nel registro degli artefatti, ma non rappresentano più lo stato operativo corrente.

---

## 3. Forno Lume START

| Campo | Valore |
|---|---|
| Repository | `forno-lume-START` |
| Baseline di chiusura | `d15f639267dfdd57194536154abfa1d0ff3b4542` |
| Stato | completato, verificato, documentato e congelato |
| Evidenza | `VR` + `VD` |

Interventi ammessi: bug, regressione, sicurezza o requisito approvato.

**Branch locale finale:** `fix/impeccable-final-polish`. Installazione congelata, typecheck, lint e build risultano superati dopo le correzioni browser-QA. Il browser QA conclusivo, commit, push, PR e merge restano pendenti. Evidenza: `HR` finché branch e commit finali non vengono registrati nel repository canonico.

---

## 4. Forno Lume BUSINESS

| Campo | Valore |
|---|---|
| Baseline Package C | `15a8bf4de41bc1657a79f58699859a015ee7820d` |
| Package A, B, B2 e C | completati e uniti |
| Package D | pendente e separato |
| Stato complessivo | produzione; non ancora dichiarato completamente congelato |
| Evidenza | `VR` + `VD` |

**Branch locale finale:** `fix/impeccable-final-polish`. Installazione congelata, typecheck, lint e build risultano superati; il browser QA conclusivo, commit, push, PR e merge restano pendenti. Package D resta separato. Evidenza: `HR` fino alla registrazione del checkpoint finale.

---

## 5. Tretnix.com

| Campo | Valore |
|---|---|
| Repository | `tretnix` |
| Deploy | `https://tretnix.com` |
| Stato | produzione, remediation controllata |
| Evidenza dello stato recente | `HR` |

Stato operativo riportato e ancora da riconciliare completamente con le evidenze del repository:

- CF-1 risulta unito; registrare PR, merge commit e controlli eseguiti;
- investigare il mismatch `data-tsd-source` in sola lettura;
- dopo la diagnosi usare una sola branch `fix/impeccable-homepage-optimization` per CF-2, CF-3, CF-4 e CF-5;
- usare un solo writer, reviewer read-only in parallelo e una sola pull request finale;
- mantenere CF-6 rinviato finché non esistono asset definitivi;
- indicare il modello Codex consigliato prima di ogni incarico.

Servono PR, branch, commit completo, output dei controlli e report hydration per elevare i singoli elementi da `HR` a `VR`.

**Branch locale finale:** `fix/impeccable-final-polish`, derivata dal checkpoint Pass 2 già pubblicato. Installazione congelata, typecheck, lint e build risultano superati dopo le correzioni browser-QA. Restano browser QA conclusivo, commit/push della branch finale e test della migrazione Supabase in staging. Nessuna migrazione è stata applicata. Evidenza: `HR`.

---

## 6. Beauty & Wellness

| Campo | Valore |
|---|---|
| Specifica | `family-kits/beauty-wellness-v1.1/` |
| Concept | RITO Studio |
| Primo progetto | RITO Studio START |
| Stato | `PARALLEL_PREPARATION_AUTHORIZED / IMPLEMENTATION_GATE_PENDING` |
| Repository | non creata |
| Parallelismo START | approvato da `TRX-DEC-033` |
| Implementazione START | subordinata a conferma abbonamento, workspace, saldo e comando esplicito |
| BUSINESS / BUSINESS PLUS | non autorizzati |
| Evidenza | `VR` per specifica e decisione; `HR` per configurazione manuale degli strumenti finché non registrata nel progetto |

Gate mancanti prima del primo intervento Lovable:

```text
LOVABLE_SUBSCRIPTION_CONFIRMED
LOVABLE_WORKSPACE_AND_BALANCE_CONFIRMED
RITO_STUDIO_START_IMPLEMENTATION_COMMAND
RITO_STUDIO_START_REPOSITORY_READY
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

1. applicare, validare, revisionare e unire la patch di governance preparata sulla baseline `de29f4f3…`;
2. sincronizzare `main` ed eseguire la prova di ricostruzione senza chat;
3. riconciliare CF-1 nel repository `tretnix` con PR, merge commit e controlli;
4. investigare `data-tsd-source` in sola lettura;
5. eseguire CF-2, CF-3, CF-4 e CF-5 nella sola branch `fix/impeccable-homepage-optimization` con una PR finale;
6. mantenere CF-6 rinviato finché non esistono asset definitivi;
7. mantenere Forno Lume START congelato salvo scope esplicitamente approvato;
8. trattare Forno Lume BUSINESS e Package D soltanto dopo la stabilizzazione della baseline precedente;
9. attivare gli abbonamenti soltanto quando deciso;
10. avviare esclusivamente RITO Studio START dopo entrambi i gate;
11. non iniziare RITO Studio BUSINESS prima del freeze START.

---

## 10. Cancellazione chat

Il development pack e le tre specifiche non sono più un blocco documentale dopo il merge.

Prima di cancellare tutte le chat devono comunque essere completati:

- merge della patch di governance aggiornata;
- sincronizzazione locale di `main`;
- prova di bootstrap in una nuova sessione;
- conservazione offline dello ZIP originale del development pack e dello snapshot `de29f4f3…` usato per la patch;
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
