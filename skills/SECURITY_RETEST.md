# Security Retest

**Stato:** candidate riutilizzabile; canonica dopo review e merge
**Versione:** 1.0
**Aggiornato:** 14 settembre 2026
**Ambito:** remediation e retest di finding security o data

---

## 1. Obiettivo

Mantenere una catena verificabile tra finding, remediation, regression test e retest senza trasformare un controllo statico o una cache in prova di sicurezza live.

## 2. Registro finding

Ogni finding conserva un ID stabile e:

- severità e livello di evidenza;
- repository, baseline, file/route/risorsa;
- scenario riproducibile e impatto;
- controllo atteso e causa confermata o probabile;
- remediation autorizzata;
- regression test associato;
- stato: `OPEN`, `REMEDIATION_PREPARED`, `RETEST_PENDING`, `RETEST_PASSED`, `RETEST_FAILED`, `NOT_ASSESSABLE`, `ACCEPTED_RISK`.

Non cambiare ID quando il finding passa di stato.

## 3. Retest

Il retest deve partire dalla baseline esatta che contiene la remediation e ripetere:

1. riproduzione originale;
2. test negativo e positivo pertinenti;
3. regression test automatici disponibili;
4. controllo di auth/authz, RLS, storage, CSRF, rate limit o provider boundary applicabile;
5. gate live separato quando il finding dipende da backend, staging o production.

Un cache hit è ammesso soltanto per validator locale deterministico sul fingerprint identico. Non chiude finding che dipendono da stato esterno, credenziali, policy live, rete o giudizio umano.

Una modifica classificata security/data deve soddisfare le capability minime del manifest; capability mancanti, path sensibili presenti, preflight fallito o cache non affidabile producono `FAIL`. Context source sensibili vengono rifiutate prima della lettura.

## 4. Vincoli

Non esporre secret, non indebolire auth/RLS, non applicare migration o production write e non eseguire deploy senza autorizzazione specifica. Se manca accesso, registrare `NOT_ASSESSABLE`, non `PASSED`.

## 5. Output

Per ogni ID riportare baseline, remediation diff, comandi ed exit code, evidenza live/manuale, esito, rischio residuo e gate successivo.
