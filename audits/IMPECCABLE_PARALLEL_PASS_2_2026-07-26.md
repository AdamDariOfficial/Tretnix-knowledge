# Tretnix Parallel Impeccable Pass 2

**Data:** 26 luglio 2026
**Stato:** patch locale pronta per revisione; non integrata, non deployata e non applicata a Supabase
**Snapshot analizzati:** `tretnix-main`, `forno-lume-START-main`, `forno-lume-BUSINESS-main`, `Tretnix-knowledge-main`

## 1. Contesto

Il Pass 1 aveva corretto navigazione, reduced motion, focus, metadata, favicon e policy demo senza redesign. Il Pass 2 ha riesaminato i diff contro gli snapshot originali e ha dato priorità a correttezza funzionale, sicurezza dei flussi pubblici, gestione degli errori e completezza SEO.

Forno Lume START resta una baseline approvata. Il permesso esplicito del fondatore consente in questo task miglioramenti confermati anche sui progetti congelati, purché non alterino identità, copy o comportamento corretto.

## 2. Obiettivo

Preparare una patch revisionabile che:

- completi la remediation tecnica di Tretnix.com;
- non introduca regressioni visuali nei due progetti Hospitality;
- corregga incongruenze confermate tra client e RLS;
- rimuova configurazioni locali sensibili dagli artefatti;
- migliori error handling e metadata senza redesign;
- distingua chiaramente verifiche eseguite e verifiche bloccate.

## 3. Tretnix.com — interventi del Pass 2

### 3.1 Igiene delle variabili d’ambiente

- rimosso `.env` dallo snapshot di lavoro e dagli artefatti distribuibili;
- aggiunte regole `.gitignore` per `.env` e varianti;
- aggiunto `.env.example` privo di valori;
- verificati soltanto i nomi delle variabili: non è stata rilevata una variabile service-role nello snapshot ricevuto;
- nessun valore è riportato nel report o negli artefatti.

La rimozione dal repository Git reale e l’eventuale rotazione delle chiavi devono essere decise verificando la cronologia remota. Le publishable key Supabase non sono trattate come service-role key, ma il file locale non deve essere versionato.

### 3.2 Routing e movimento

- il comportamento CSS globale è passato da smooth a immediato;
- lo smooth scroll resta esplicito soltanto nei link interni controllati;
- il reset di route non eredita più uno smooth globale;
- `prefers-reduced-motion` continua a forzare movimento immediato e contenuto visibile.

### 3.3 Navbar mobile e tablet

- chiusura con `Escape` e ritorno del focus al trigger;
- chiusura al click esterno;
- chiusura automatica al passaggio al breakpoint desktop `1024px`;
- riferimenti DOM separati per trigger e pannello;
- aggiunto `aria-haspopup` senza trasformare la navigazione in un menu ARIA applicativo.

### 3.4 Analytics e RLS

Finding confermato dal codice:

- il client invia `contact_form_submit`;
- la policy RLS esistente non ammette questo valore;
- l’errore viene silenziato dal tracker e l’evento non viene registrato.

È stata aggiunta una migrazione versionata che:

- include `contact_form_submit` nella whitelist;
- limita `viewport_width` a un intervallo plausibile;
- revoca l’INSERT generico ad `anon` e `authenticated`;
- concede INSERT soltanto sulle colonne previste dal client;
- applica lo stesso principio alle richieste di contatto;
- impedisce ai client pubblici di impostare direttamente identificatori, stato e timestamp.

Il payload del form non invia più `status`; il valore `new` resta gestito dal default del database e verificato dalla policy.

**Limite:** la migrazione non è stata applicata né testata contro un progetto Supabase reale. Prima del merge richiede review SQL, ambiente di staging e test anon/auth/admin. Le policy limitano forma e colonne dei payload, ma non costituiscono rate limiting: analytics e form pubblico richiedono ancora una strategia anti-abuso lato edge/server prima di aumentare il traffico commerciale.

### 3.5 Error handling dei case study

- le funzioni dati pubbliche ora propagano gli errori Supabase invece di convertirli in liste vuote o `not found`;
- homepage e indice case study distinguono errore di caricamento da stato vuoto;
- lo skeleton non resta permanente dopo un errore;
- il dettaglio mantiene il dato SSR se un refresh client fallisce;
- i fetch client sono cancellabili durante unmount o cambio route.

### 3.6 SEO tecnico

- aggiunti `robots.txt` e `sitemap.xml` per le route pubbliche stabili;
- completati canonical, `og:url` e metadata Twitter per indice e dettaglio case study;
- non è stata creata un’immagine social definitiva: rientra nella chiusura commerciale CF-6.

## 4. Forno Lume START e BUSINESS

Il confronto statico del Pass 2 non ha prodotto ulteriori modifiche visuali ad alta confidenza.

Confermato:

- palette, Fraunces/Inter, container, gutter e linguaggio dei reveal rimangono coerenti;
- focus e reduced motion introdotti nel Pass 1 sono circoscritti e non cambiano l’esperienza standard;
- START mantiene la policy demo `noindex, follow` e dati strutturati non commerciali;
- BUSINESS mantiene la propria architettura multipagina e i pattern tecnici approvati.

Non sono stati cambiati spacing, immagini, composizione o animazioni sulla base della sola lettura. Il polish visuale definitivo richiede browser QA sui deploy aggiornati.

## 4.1 Finding rinviato: visibilità Storage

La policy `public read project images` concede SELECT anonimo a tutti gli oggetti del bucket `project-images`, mentre la tabella `project_media` limita correttamente i record ai progetti visibili. Questo può rendere enumerabili o firmabili anche asset caricati ma non ancora collegati a un progetto pubblico. Non è stata applicata una correzione automatica perché il formato dei percorsi e i dati già presenti non sono verificabili: restringere la policy senza inventario live potrebbe rompere immagini pubblicate o preview amministrative. Richiede audit Storage in staging e migrazione dedicata. Evidenza: `PR` dal codice, non verificata sul backend live.

## 5. Verifiche realmente eseguite

### Superate

- confronto ricorsivo contro gli snapshot originali;
- parsing sintattico tramite TypeScript compiler API di 245 file `.ts`/`.tsx`;
- zero diagnostiche sintattiche;
- parsing di 17 file JSON standard;
- parsing dei tre `tsconfig.json` da parte del compilatore TypeScript fino al blocco dipendenze;
- controllo strutturale dei tre file CSS principali;
- parsing XML della sitemap;
- assert statici su `.env`, `.gitignore`, migrazione, payload contatti, scroll e navbar;
- ricerca di riferimenti pubblici visibili agli strumenti interni;
- verifica statica del mismatch tra enum analytics e policy RLS.

### Tentate ma bloccate

`tsc --noEmit`, `npm run lint` e `npm run build` sono stati eseguiti nei tre repository. Tutti si arrestano prima dei controlli applicativi perché gli snapshot non includono le dipendenze:

```text
TS2688: Cannot find type definition file for 'vite/client'.
sh: 1: eslint: not found
sh: 1: vite: not found
```

Il package registry e la navigazione browser esterna sono bloccati nell’ambiente corrente. Non sono quindi dichiarati superati:

- typecheck completo;
- lint;
- build;
- test automatici;
- QA visuale locale o live;
- smoke test produzione;
- applicazione e test della migrazione Supabase;
- audit Lighthouse o axe.

## 6. Acceptance criteria prima del merge

1. applicare la patch in una branch dedicata di ciascun repository;
2. verificare che `.env` non sia tracciato e valutare la cronologia Git;
3. installare le dipendenze con il lockfile esistente;
4. eseguire `typecheck`, `lint` e `build`;
5. revisionare e applicare la migrazione prima in staging;
6. testare analytics per tutti i tipi evento, incluso `contact_form_submit`;
7. testare il form contatti come anonimo, autenticato e amministratore;
8. verificare che un client pubblico non possa impostare `status`, `created_at`, `updated_at` o `id`;
9. verificare navbar, hash, Back/Forward, direct URL, resize, click esterno ed `Escape`;
10. verificare error, empty, loading e retry dei case study;
11. eseguire QA a 360, 390, 430, 768, 1024 e 1440 px;
12. eseguire reduced-motion e tastiera;
13. eseguire l’ultimo passaggio Impeccable visuale sui deploy aggiornati;
14. registrare PR, commit, comandi, risultati e smoke test nella knowledge repository.

## 7. Stato conclusivo

Il Pass 2 è una **patch locale pronta per integrazione controllata**, non una chiusura definitiva. Tretnix.com dispone ora di una remediation più completa; START e BUSINESS mantengono le baseline visuali senza modifiche speculative. Il freeze definitivo resta subordinato a build, browser QA, test Supabase e verifica dei deploy.
