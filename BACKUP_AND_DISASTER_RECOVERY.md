# Tretnix Backup & Disaster Recovery

**Versione:** 1.0
**Aggiornato:** 16 settembre 2026
**Stato:** architettura approvata; implementazione e recovery test pendenti
**Ambito:** intera cartella padre Tretnix, repository locali e materiale operativo non versionato

---

## 1. Obiettivo

Tretnix deve poter essere recuperata anche in caso di perdita totale del computer principale, del workspace operativo o di entrambi.

La protezione non riguarda soltanto il codice. La cartella padre Tretnix contiene anche documenti commerciali, brand, loghi, asset originali, materiale operativo, Knowledge, repository Git, evidence, script e altri file che possono non esistere su GitHub.

Nessun singolo computer o supporto fisico deve essere l'unica copia di dati Tretnix non ricostruibili.

---

## 2. Architettura approvata

L'architettura target è:

```text
                           GitHub
                              ▲
                              │ Git
                              │
                       T:\Tretnix
                    SSD esterno live
                       /         \
                      /           \
                     ▼             ▼
                  Kopia          Kopia
                  LOCAL          CLOUD
                     │             │
                     ▼             ▼
               SSD interno    Backblaze B2
                              EU Central
```

Principi:

- `T:\Tretnix` diventa il workspace operativo canonico soltanto dopo una migrazione verificata;
- GitHub resta la fonte tecnica ufficiale per codice e documentazione versionata;
- Kopia è il software di backup e crea due repository indipendenti;
- il repository Kopia LOCAL vive sull'SSD interno del PC ed è destinato al fast recovery;
- il repository Kopia CLOUD vive su Backblaze B2 ed è destinato al disaster recovery off-site;
- Backblaze B2 è storage remoto del repository Kopia, non un secondo software di backup;
- il cloud non deve dipendere dal repository Kopia locale e non deve essere una semplice copia di esso.

Non usare il flusso:

```text
Tretnix → Kopia locale → copia del repository locale nel cloud
```

Usare invece:

```text
                     ┌── Kopia LOCAL ──► SSD interno
T:\Tretnix ─────────┤
                     └── Kopia CLOUD ──► Backblaze B2
```

I due repository devono poter fallire indipendentemente.

---

## 3. Workspace operativo

### Target

Il workspace target è:

```text
T:\Tretnix\
```

L'SSD esterno è il supporto live. Il disco interno non deve diventare un secondo working tree usato normalmente.

La migrazione deve avvenire per copia e verifica, non con un cut/paste distruttivo. Il workspace precedente viene conservato temporaneamente fino al completamento delle verifiche e del primo ciclo di backup.

### File system e lettera unità

Su Windows:

- usare NTFS;
- assegnare una lettera stabile `T:`;
- evitare hub USB non affidabili;
- preferire collegamento diretto a una porta adeguata;
- non scollegare il supporto durante operazioni Git, installazioni o scritture.

### Cifratura del workspace

La preferenza è BitLocker To Go quando l'edizione Windows in uso lo supporta.

La recovery key deve essere conservata fuori dal workspace Tretnix e fuori dall'unico computer operativo.

La scelta di un'alternativa di cifratura richiede verifica separata se BitLocker To Go non è disponibile.

---

## 4. Hardware raccomandato

La capacità raccomandata per il workspace è 4 TB salvo che un audit reale dimostri che 2 TB offrono margine sufficiente.

Scelta corrente:

- **Samsung Portable SSD T9 4 TB** quando il computer supporta USB 3.2 Gen 2x2 / 20 Gbps e il vantaggio prestazionale è realmente utilizzabile;
- **Samsung T7 Shield 4 TB** quando il computer è limitato a USB 3.2 Gen 2 / 10 Gbps o quando il T9 non offre un beneficio concreto.

Questi modelli sono una raccomandazione di implementazione, non un vincolo architetturale permanente. Prima dell'acquisto devono essere verificati:

- capacità attuale della cartella Tretnix;
- crescita prevista;
- porte e velocità reali del computer;
- compatibilità Windows;
- disponibilità e prezzo correnti.

---

## 5. GitHub

GitHub continua a conservare la versione tecnica ufficiale di:

- codice;
- cronologia;
- commit;
- branch;
- tag;
- pull request;
- release;
- documentazione e decisioni versionate.

Il sistema di backup non sostituisce GitHub.

GitHub non viene però considerato backup sufficiente dell'intera cartella padre Tretnix, perché non conserva automaticamente file commerciali, brand asset, file ignorati, `.env`, modifiche non committate, commit locali non pushati, stash e altri artefatti locali.

---

## 6. Repository Git locali nel backup

Le repository locali NON vengono escluse integralmente dal backup cloud soltanto perché esistono su GitHub.

Devono essere conservati quando presenti e rilevanti:

- source code;
- `.git`;
- modifiche non committate;
- commit locali non pushati;
- branch locali;
- stash;
- file untracked rilevanti;
- documentazione;
- script;
- configurazioni locali necessarie al recovery.

L'obiettivo è poter recuperare l'ultimo stato operativo reale, non soltanto l'ultimo stato già pubblicato su GitHub.

---

## 7. Esclusioni

Il cloud non deve sprecare spazio per dati sicuramente rigenerabili.

Candidati iniziali all'esclusione, previa verifica:

```text
**/node_modules/**
**/dist/**
**/build/**
**/coverage/**
**/.vite/**
**/.cache/**
```

Una directory ignorata da Git NON è automaticamente esclusa dal backup.

Non escludere automaticamente:

```text
.git
.env
.wrangler
.supabase
evidence
fixtures
```

Queste directory o file devono essere classificati con audit project-specific prima di una decisione di esclusione.

La policy di esclusione deve privilegiare sicurezza e recuperabilità rispetto a piccoli risparmi di storage.

---

## 8. Secrets e file di ambiente

Secrets e `.env`:

- non devono essere committati su GitHub;
- non devono essere inclusi nella Knowledge pubblica;
- non devono essere inclusi in Controlled Change Package o log;
- possono essere conservati nei repository Kopia cifrati quando necessari al recovery;
- non devono essere stampati dai processi di verifica.

Le credenziali necessarie al recovery devono essere conservate separatamente dal workspace.

Almeno i seguenti elementi devono essere recuperabili indipendentemente dal PC e dall'SSD Tretnix:

- recovery key del workspace cifrato;
- password del repository Kopia LOCAL;
- password del repository Kopia CLOUD;
- recovery dell'account Backblaze;
- GitHub recovery codes;
- eventuali token di reconnect Kopia, trattati come secrets.

---

## 9. Backup locale — Kopia LOCAL

Sorgente:

```text
T:\Tretnix
```

Destinazione:

```text
repository Kopia dedicato sull'SSD interno del PC
```

Scopo:

- recupero rapido da cancellazioni accidentali;
- recupero da working tree danneggiati;
- ripristino rapido se l'SSD esterno si guasta ma il PC rimane disponibile.

Configurazione iniziale proposta:

```text
snapshot: ogni 30–60 minuti
retention: più breve del cloud
```

Baseline iniziale di retention:

- 48 snapshot recenti;
- 48 orari;
- 14 giornalieri;
- 8 settimanali;
- 3 mensili.

La retention può essere adattata dopo dati reali di crescita e capacità disponibile.

Il backup locale non è considerato off-site perché appartiene allo stesso failure domain del computer.

---

## 10. Backup cloud — Kopia CLOUD → Backblaze B2

Sorgente:

```text
T:\Tretnix
```

Destinazione:

```text
Kopia CLOUD
→ Backblaze B2
→ regione EU Central
```

Backblaze B2 conserva il repository Kopia cifrato. Kopia esegue snapshot, deduplicazione, compressione e cifratura prima dello storage remoto secondo la propria configurazione.

Configurazione iniziale:

- bucket privato dedicato a Tretnix;
- regione EU Central;
- application key dedicata e limitata al bucket;
- connessione Kopia tramite endpoint S3-compatible di B2;
- nessuna master key nelle automazioni;
- Object Lock non attivato nella prima fase.

Frequenza iniziale proposta:

```text
snapshot: ogni 2 ore
```

Retention cloud iniziale:

- 24 snapshot recenti;
- 30 giornalieri;
- 12 settimanali;
- 12 mensili;
- 3 annuali.

Retention, costo e frequenza devono essere rivalutati usando lo spazio effettivamente occupato dopo il primo mese.

---

## 11. Failure domains e recovery

### Computer guasto, SSD esterno integro

Collegare l'SSD a un altro computer compatibile, sbloccarlo e ripristinare i prerequisiti dell'ambiente.

### SSD esterno guasto, computer integro

Ripristinare `T:\Tretnix` dal repository Kopia LOCAL.

### Computer e SSD esterno persi o distrutti

Usare Kopia su un nuovo computer, riconnettere il repository Kopia CLOUD su Backblaze B2 e ripristinare l'ultimo snapshot valido.

### Errore umano o corruzione logica

Ripristinare una versione precedente senza sostituire alla cieca dati correnti non coinvolti.

GitHub rimane un ulteriore livello di recupero per codice e storia versionata.

---

## 12. Recovery verification

Un backup non è considerato verificato soltanto perché lo snapshot termina senza errori.

Prima di dichiarare il sistema pronto devono essere eseguiti almeno:

1. restore locale in una directory isolata;
2. restore cloud in una directory isolata;
3. controllo di file commerciali, brand, loghi e asset critici;
4. controllo delle repository Git recuperate;
5. verifica di `.git`, HEAD, remote e stato locale;
6. verifica della presenza dei secrets necessari senza mostrarne il contenuto;
7. verifica che nessun deploy, migration o production write sia stato eseguito.

Stato prima del test:

```text
BACKUP ARCHITECTURE APPROVED / IMPLEMENTATION PENDING
```

Dopo configurazione ma prima dei restore test:

```text
BACKUP CONFIGURED / RECOVERY NOT YET VERIFIED
```

Soltanto dopo restore locale e cloud riusciti con evidenza:

```text
DISASTER RECOVERY VERIFIED
```

---

## 13. Sequenza di implementazione

1. eseguire audit read-only della cartella padre Tretnix;
2. misurare dimensione reale, repository, directory pesanti e dati rigenerabili;
3. verificare le porte del computer;
4. acquistare l'SSD appropriato;
5. configurare NTFS, lettera `T:` e cifratura;
6. copiare Tretnix senza eliminare l'originale;
7. verificare integrità e repository;
8. configurare Kopia LOCAL verso l'SSD interno;
9. creare il bucket Backblaze B2 EU Central;
10. configurare Kopia CLOUD direttamente verso B2;
11. applicare la exclusion policy verificata;
12. eseguire uno snapshot locale e uno cloud;
13. eseguire restore locale di prova;
14. eseguire restore cloud di prova;
15. verificare i risultati;
16. soltanto dopo il recovery verificato rimuovere il vecchio workspace ridondante quando non più necessario.

---

## 14. Operazioni vietate e limiti

La configurazione di backup non autorizza automaticamente:

- stage;
- commit;
- push;
- pull request;
- merge;
- deploy;
- migration;
- modifica DNS;
- provisioning produttivo;
- secret mutation;
- production write.

Gli script di backup, restore e verifica non devono mostrare secrets.

Il sistema deve fallire in modo sicuro quando trova una destinazione, credenziale, repository o stato non riconosciuto.

---

## 15. Stato corrente

Al 16 settembre 2026:

- architettura: **APPROVATA**;
- workspace `T:\Tretnix`: **NON ANCORA MIGRATO**;
- SSD esterno: **DA SELEZIONARE DOPO AUDIT DEL PC E DELLA DIMENSIONE**;
- Kopia LOCAL: **NON CONFIGURATO**;
- Backblaze B2 / Kopia CLOUD: **NON CONFIGURATO**;
- restore locale: **NON ESEGUITO**;
- restore cloud: **NON ESEGUITO**;
- disaster recovery complessivo: **NON ANCORA VERIFICATO**.

Non dichiarare `DISASTER RECOVERY VERIFIED` fino a evidenza diretta dei restore test.
