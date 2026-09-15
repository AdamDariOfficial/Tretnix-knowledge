# Release Freeze

**Stato:** candidate riutilizzabile; canonica dopo review e merge
**Versione:** 1.0
**Aggiornato:** 14 settembre 2026
**Ambito:** candidate, release, baseline e freeze Tretnix

---

## 1. Obiettivo

Impedire che preparazione, validazione locale, merge, deploy e freeze vengano descritti come lo stesso stato.

## 2. Stati distinti

Registrare separatamente:

1. `CANDIDATE_PREPARED` — diff pronto, non implica validation;
2. `VERIFIED_LOCAL` — controlli locali realmente eseguiti con exit code;
3. `REVIEW_APPROVED` — full diff e gate owner completati;
4. `PR_OPENED` — PR esistente e identificata;
5. `MERGED` — merge commit verificato;
6. `DEPLOYED` — deploy e target verificati;
7. `FROZEN` — baseline SHA/tag dichiarati e residui registrati.

Uno stato non implica il successivo.

## 3. Evidence minima

Per ogni transizione registrare repository, branch, SHA, data, actor, comando o gate, exit code, PR/deploy quando applicabile, gate manuali residui e livello di evidenza.

Browser, backend, staging e production restano distinti. Una validation cache exact-state può provare soltanto un controllo locale cacheable sul fingerprint identico.

Quando Development OS è adottato, allegare preflight, fingerprint, validator eseguiti/non eseguiti e gate `UNVERIFIED`. Un report generato non eleva automaticamente `CANDIDATE_PREPARED` a `VERIFIED_LOCAL` o a uno stato successivo.

## 4. Sicurezza operativa

La procedura non crea tag, commit, push, PR, merge o deploy senza autorizzazione esplicita del relativo checkpoint. Non modifica migrazioni, DNS, secret o production data.

## 5. Output

Restituire stato massimo realmente provato, baseline, evidenze, controlli mancanti, residui, rischio e prossimo gate. Se un requisito del freeze manca, usare `FREEZE_NOT_PROVEN`.
