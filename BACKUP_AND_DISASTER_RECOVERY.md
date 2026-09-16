# Tretnix Backup & Disaster Recovery

**Versione:** 1.2
**Aggiornato:** 16 settembre 2026
**Stato:** Kopia CLOUD / Cloudflare R2 recovery verificato; workspace portabile e Kopia LOCAL ancora pendenti
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
               SSD interno    Cloudflare R2
                              EU jurisdiction
```

Principi:

- `T:\Tretnix` diventa il workspace operativo canonico soltanto dopo una migrazione verificata;
- GitHub resta la fonte tecnica ufficiale per codice e documentazione versionata;
- Kopia crea due repository indipendenti;
- il repository Kopia LOCAL vive sull'SSD interno del PC ed è destinato al fast recovery;
- il repository Kopia CLOUD vive su Cloudflare R2 ed è destinato al disaster recovery off-site;
- R2 è storage remoto del repository Kopia, non un secondo software di backup;
- il cloud non deve dipendere dal repository Kopia locale e non deve essere una semplice copia di esso.

Non usare il flusso:

```text
Tretnix → Kopia locale → copia del repository locale nel cloud
```

Usare invece:

```text
                     ┌── Kopia LOCAL ──► SSD interno
T:\Tretnix ─────────┤
                     └── Kopia CLOUD ──► Cloudflare R2
```

I due repository devono poter fallire indipendentemente.

### Fase transitoria corrente

Fino all'acquisto e alla migrazione dell'SSD esterno, la sorgente live rimane:

```text
C:\Users\adamd\Desktop\Coding\Tretnix
```

Kopia CLOUD parte direttamente da questa sorgente transitoria. La presenza del backup cloud verificato non rende ancora completo il disaster recovery target, perché `T:\Tretnix` e Kopia LOCAL non sono stati implementati.

---

## 3. Workspace operativo

### Target

Il workspace target resta:

```text
T:\Tretnix\
```

L'SSD esterno sarà il supporto live. Il disco interno non deve diventare un secondo working tree usato normalmente.

La migrazione deve avvenire per copia e verifica, non con un cut/paste distruttivo. Il workspace precedente viene conservato temporaneamente fino al completamento delle verifiche e del primo ciclo di backup locale e cloud dal nuovo percorso.

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

## 4. Hardware e capacità

L'audit operativo del 16 settembre 2026 ha misurato circa 9,5 GB per la cartella padre Tretnix prima delle exclusion di backup; lo snapshot cloud ottimizzato è risultato circa 6,7 GB nella UI Kopia.

Con queste dimensioni, 2 TB offrono oggi un margine molto ampio. 4 TB restano una scelta possibile soltanto se un audit futuro di crescita, asset o workload ne giustifica il costo.

Modelli di riferimento:

- **Samsung Portable SSD T9** quando il computer supporta USB 3.2 Gen 2x2 / 20 Gbps e il vantaggio prestazionale è realmente utilizzabile;
- **Samsung T7 Shield** quando il computer è limitato a USB 3.2 Gen 2 / 10 Gbps o quando il T9 non offre un beneficio concreto.

L'acquisto dell'SSD esterno è intenzionalmente differito fino al primo incasso Tretnix utile. Prima dell'acquisto devono essere riverificati capacità, crescita prevista, porte del computer, disponibilità e prezzo correnti.

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

## 7. Exclusion policy verificata

La policy cloud verificata esclude soltanto dati rigenerabili:

```text
**/node_modules/**
**/dist/**
**/build/**
**/coverage/**
**/.vite/**
**/.cache/**
```

Il restore test R2 ha confermato che le directory corrispondenti eventualmente ricreate risultano vuote: `0` file e `0` byte di contenuto ripristinato per i path controllati.

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

La policy di esclusione privilegia sicurezza e recuperabilità rispetto a piccoli risparmi di storage.

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
- recovery dell'account Cloudflare;
- GitHub recovery codes;
- credenziali S3/API necessarie a riconnettere Kopia CLOUD, trattate come secrets.

Non registrare nella Knowledge account ID, Access Key ID, Secret Access Key, token o password.

---

## 9. Backup locale — Kopia LOCAL

Sorgente target:

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

Stato corrente: **NON CONFIGURATO**, intenzionalmente differito insieme all'acquisto e alla migrazione dell'SSD esterno.

---

## 10. Backup cloud — Kopia CLOUD → Cloudflare R2

### Sorgente corrente

```text
C:\Users\adamd\Desktop\Coding\Tretnix
```

Dopo la migrazione verificata, la sorgente diventerà:

```text
T:\Tretnix
```

### Destinazione e configurazione

```text
Kopia CLOUD
→ Cloudflare R2 Standard
→ EU jurisdiction
```

Configurazione verificata:

- bucket privato dedicato `tretnix-kopia-cloud-dr`;
- jurisdiction `EU`;
- Development URL pubblico disabilitato;
- nessun custom domain;
- token/API credential dedicato con accesso limitato al bucket;
- connessione Kopia tramite endpoint S3-compatible R2 EU;
- region override `auto`;
- TLS verification attiva;
- Object Lock non attivato nella prima fase;
- compressione `zstd`;
- repository Kopia cifrato con i parametri raccomandati del client.

### Frequenza e retention operative

```text
snapshot: ogni 1 ora
```

Retention cloud:

- 24 snapshot recenti;
- 0 retention oraria aggiuntiva;
- 30 giornalieri;
- 12 settimanali;
- 12 mensili;
- 3 annuali.

La frequenza oraria sostituisce la proposta iniziale ogni 2 ore ed è il comportamento operativo verificato.

### Provider precedente

Backblaze B2 era il provider approvato per la prima implementazione. Lo snapshot cloud era stato creato, ma il restore reale è stato bloccato dai cap del piano non a pagamento su download e transazioni Class B. Per questo il provider attivo è stato sostituito con Cloudflare R2.

Il repository B2 non è più il repository Kopia CLOUD canonico. Il 16 settembre 2026 la copia legacy è stata dismessa dopo il completamento del cutover documentale e della verifica R2: tutte le versioni degli oggetti B2 sono state eliminate, il bucket `tretnix-kopia-cloud-dr` è stato eliminato, la relativa application key è stata revocata e la cache locale di autenticazione B2 è stata rimossa.

La directory temporanea `C:\Users\adamd\Desktop\Tretnix-R2-Restore-Test` è stata eliminata soltanto dopo il completamento delle verifiche di recovery. La dismissione B2 non ha modificato né cancellato il repository Kopia CLOUD attivo su Cloudflare R2.

---

## 11. Failure domains e recovery

### Computer guasto, SSD esterno integro

Collegare l'SSD a un altro computer compatibile, sbloccarlo e ripristinare i prerequisiti dell'ambiente.

### SSD esterno guasto, computer integro

Quando Kopia LOCAL sarà configurato, ripristinare `T:\Tretnix` dal repository locale.

### Computer e SSD esterno persi o distrutti

Usare Kopia su un nuovo computer, riconnettere il repository Kopia CLOUD su Cloudflare R2 e ripristinare l'ultimo snapshot valido.

### Errore umano o corruzione logica

Ripristinare una versione precedente senza sostituire alla cieca dati correnti non coinvolti.

GitHub rimane un ulteriore livello di recupero per codice e storia versionata.

---

## 12. Recovery verification

Un backup non è considerato verificato soltanto perché lo snapshot termina senza errori.

Il 16 settembre 2026 è stato eseguito un restore cloud reale e isolato da Cloudflare R2 verso:

```text
C:\Users\adamd\Desktop\Tretnix-R2-Restore-Test
```

Evidenze operative osservate:

- snapshot ottimizzato: circa 6,7 GB nella UI Kopia;
- estimate pre-snapshot: 19.906 file, 3.584 directory, `0` errori;
- restore completato da Kopia in 11m 35s;
- filesystem ripristinato: 19.906 file, 3.583 directory ricorsive più la root, circa 6,27 GiB misurati da PowerShell;
- exclusion policy verificata: i path esclusi controllati contengono `0` file e `0` byte;
- 11 repository `.git` recuperate;
- 10 repository con branch e HEAD corrispondenti alla sorgente;
- repository TikTok correttamente ripristinata come repository unborn su `feature/tiktok-marketing-intelligence`, con 14 righe di stato identiche tra sorgente e restore;
- `git fsck --full` ha restituito exit code `0` su tutte le 11 repository; gli oggetti dangling riportati da Git non costituiscono corruzione;
- working state dirty/untracked confrontato e coerente sui repository verificati.

Stato cloud:

```text
KOPIA CLOUD / CLOUDFLARE R2: RECOVERY VERIFIED
```

Questo gate NON autorizza ancora:

```text
DISASTER RECOVERY VERIFIED
```

per l'intera architettura Tretnix. Il gate complessivo richiede ancora:

1. acquisto e configurazione dell'SSD esterno;
2. migrazione verificata a `T:\Tretnix`;
3. configurazione Kopia LOCAL;
4. snapshot locale;
5. restore locale isolato e verificato;
6. nuovo controllo cloud dal workspace definitivo quando la sorgente cambia.

---

## 13. Sequenza di implementazione

### Completato

1. audit read-only della cartella padre Tretnix;
2. misura della dimensione reale e identificazione dei dati rigenerabili;
3. installazione e configurazione Kopia;
4. definizione e verifica delle exclusion;
5. configurazione Kopia CLOUD su Cloudflare R2 EU;
6. snapshot cloud ottimizzato;
7. restore cloud reale in directory isolata;
8. verifica filesystem, exclusion e repository Git;
9. dismissione controllata del repository legacy Backblaze B2, del bucket e della relativa application key dopo il cutover R2 verificato.

### Pendente quando viene acquistato l'SSD

1. verificare nuovamente capacità e porte del computer;
2. acquistare l'SSD appropriato;
3. configurare NTFS, lettera `T:` e cifratura;
4. copiare Tretnix senza eliminare l'originale;
5. verificare integrità e repository;
6. spostare la sorgente Kopia CLOUD al workspace definitivo soltanto dopo verifica;
7. configurare Kopia LOCAL verso l'SSD interno;
8. eseguire snapshot e restore locale di prova;
9. eseguire un restore cloud dal workspace definitivo;
10. soltanto dopo entrambi i restore verificati dichiarare `DISASTER RECOVERY VERIFIED`.

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

- architettura target: **APPROVATA**;
- sorgente live transitoria: `C:\Users\adamd\Desktop\Coding\Tretnix`;
- workspace `T:\Tretnix`: **NON ANCORA MIGRATO**;
- SSD esterno: **ACQUISTO DIFFERITO FINO AL PRIMO INCASSO TRETNIX UTILE**;
- Kopia LOCAL: **NON CONFIGURATO**;
- Cloudflare R2 / Kopia CLOUD: **CONFIGURATO**;
- frequenza cloud: **OGNI 1 ORA**;
- retention cloud: **24 latest / 0 hourly / 30 daily / 12 weekly / 12 monthly / 3 annual**;
- compressione cloud: **zstd**;
- exclusion policy: **VERIFICATA**;
- snapshot cloud: **PASS**;
- restore cloud: **RECOVERY VERIFIED**;
- repository Git nel restore: **11/11 recuperate e leggibili; `git fsck` exit 0**;
- Backblaze B2: **DECOMMISSIONED IL 16 SETTEMBRE 2026; DATI, BUCKET, APPLICATION KEY E CACHE LOCALE RIMOSSI**;
- restore locale: **NON ESEGUITO**;
- disaster recovery complessivo: **IMPLEMENTATION PENDING / NON ANCORA VERIFICATO**.

Non dichiarare `DISASTER RECOVERY VERIFIED` fino a evidenza diretta del restore locale e del restore cloud sul workspace definitivo.
