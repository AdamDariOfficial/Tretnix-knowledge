# Controlled Change Package Validation — 27 luglio 2026

**Versione:** 1.0
**Aggiornato:** 27 luglio 2026
**Stato:** procedura validata sul ciclo Impeccable; browser e backend restano gate separati

---

## 1. Obiettivo

Valutare se il workflow PowerShell separato `Apply` + `Validate` può diventare una skill Tretnix riutilizzabile.

---

## 2. Evidenza operativa

Il workflow è stato usato sulle repository:

- `tretnix`;
- `forno-lume-START`;
- `forno-lume-BUSINESS`.

Ha gestito:

- verifica di branch, SHA, working tree e hash;
- creazione e ripresa di branch dedicate;
- applicazione limitata ai file approvati;
- errori PowerShell dovuti a output nativo su `stderr`;
- array vuoti in Windows PowerShell 5.1;
- ripresa da applicazione parziale;
- file generato `src/routeTree.gen.ts` con diff diagnostico e ripristino;
- distinzione tra lint semantico e Prettier globale;
- hotfix TypeScript mirati senza formattazione massiva;
- log timestampati e matrice degli exit code.

---

## 3. Controlli automatici osservati

Dopo il Pass 2, il polish finale e le correzioni emerse dal browser QA, le tre repository hanno restituito exit code `0` per:

```text
bun install --frozen-lockfile
bun run typecheck
bun run lint
bun run build
```

I warning Fast Refresh e tooling rimasti erano non bloccanti e non sono stati nascosti con refactoring fuori scope.

---

## 4. Gate non sostituiti

Il workflow non dimostra automaticamente:

- correttezza visuale nel browser;
- responsive e tastiera;
- reduced motion;
- comportamento backend;
- RLS e storage;
- migrazioni in staging;
- deploy o produzione.

Il browser QA ha infatti rilevato difetti che typecheck, lint e build non potevano individuare. Questo conferma la necessità di mantenere i gate separati.

---

## 5. Finding principali

### Confermati

- L’allowlist e gli hash impediscono copie manuali fuori perimetro.
- L’idempotenza consente riprese sicure dopo un’interruzione.
- Il controllo dell’exit code evita falsi errori dovuti a `stderr` informativo.
- Il ripristino controllato dei file generati evita rumore nel diff.
- La matrice completa rende verificabile ciò che è passato e ciò che è fallito.
- La separazione tra applicazione, validazione e operazioni Git/remoto preserva il controllo umano.

### Limiti

- `git diff --check` da solo non analizza i file untracked. Durante la formalizzazione, alcuni trailing whitespace sono emersi soltanto dopo `git add` tramite `git diff --cached --check`.
- Il processo è stato quindi corretto imponendo tre gate distinti: diff non staged, scansione dei file testuali untracked e diff staged prima del commit.
- Un pacchetto preparato su una baseline errata deve fermarsi, non adattarsi automaticamente.
- I pacchetti richiedono manutenzione e test delle proprie fixture.
- Non sono necessari per modifiche piccole eseguite direttamente in una branch pulita.

---

## 6. Decisione proposta e approvata

Formalizzare il workflow come `skills/CONTROLLED_CHANGE_PACKAGE.md` e registrarlo in `TRX-DEC-032`.
