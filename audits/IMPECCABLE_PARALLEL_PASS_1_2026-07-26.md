# Tretnix Parallel Impeccable Pass 1

**Data:** 26 luglio 2026
**Stato:** implementazione locale preparata; non ancora integrata in GitHub, deployata o verificata in produzione
**Snapshot analizzati:** `tretnix-main`, `forno-lume-START-main`, `forno-lume-BUSINESS-main`, `Tretnix-knowledge-main`

## 1. Obiettivo

Concludere il primo passaggio parallelo sui tre siti preservando le baseline approvate, ma correggendo anche nei progetti congelati i miglioramenti confermati, sicuri e non invasivi.

Principi applicati:

- nessun redesign;
- nessun cambio di copy estraneo;
- nessuna uniformazione visiva indiscriminata;
- preservazione di palette, font, layout e linguaggio di animazione approvati;
- priorità a sicurezza, correttezza, accessibilità, navigazione e segnali pubblici di professionalità;
- nessuna dichiarazione di build, typecheck o browser QA superati senza esecuzione completa.

## 2. Tretnix.com

### Implementato

- navigazione verso sezioni centralizzata con offset della navbar;
- sincronizzazione tra scroll, hash URL e browser history;
- gestione di `popstate` e `hashchange` per Back/Forward e accesso diretto;
- scroll immediato quando `prefers-reduced-motion` è attivo;
- breakpoint della navbar desktop spostato da `md` a `lg`, così i tablet usano il menu compatto;
- focus visibile globale e trattamento dedicato di `btn-ghost`;
- copertura globale reduced motion;
- token `text-subtle` aggiornato da `#687589` a `#74849C`;
- contrasto calcolato sul canvas `#020814` aumentato da circa `4.29:1` a circa `5.27:1`;
- canonical e Open Graph corretti da dominio Lovable a `https://tretnix.com`;
- rimossi dai sorgenti i riferimenti pubblici `tretnix.lovable.app` e `id-preview`;
- favicon Lovable sostituito da favicon Tretnix personalizzato in SVG e ICO;
- documentazione `DESIGN.md` e `.impeccable/design.json` riallineata alla nuova implementazione;
- aggiunto script esplicito `typecheck`.

### Non modificato intenzionalmente

- nessun redesign della homepage;
- nessuna variazione della palette master o del logo;
- nessuna modifica alle policy Supabase senza evidenza di accesso improprio;
- nessuna patch per `data-tsd-source`: la stringa non compare nei sorgenti e resta classificata come probabile iniezione esterna/dev-tool da verificare nel browser reale.

### Finding da gestire prima del merge

Lo snapshot contiene un file `.env` e `.gitignore` non lo esclude. Le variabili individuate sono riferite a URL, project ID e publishable key Supabase; non è stata rilevata una service-role key dai nomi. Il file non è stato cancellato perché il suo ruolo nella pipeline reale non è verificabile in questo ambiente. Gli ZIP ottimizzati consegnati escludono `.env`.

## 3. Forno Lume START

### Implementato

- mantenuta invariata la baseline visuale Hospitality;
- aggiunta copertura globale `prefers-reduced-motion`;
- aggiunto focus visibile globale coerente con la palette terracotta;
- aggiunto favicon Hospitality personalizzato in SVG e ICO;
- aggiunto `noindex, follow` globale, coerente con lo stato demo;
- uniformati privacy e cookie a `noindex, follow`;
- rimosso JSON-LD commerciale fittizio da ristorante reale (`Restaurant`, `PostalAddress`, telefono e orari);
- sostituito con schema generico `WebSite`/`WebPage` che identifica il progetto come concept dimostrativo.

### Preservato

- palette;
- Fraunces e Inter;
- spacing e container;
- layout editoriale;
- trattamento fotografico;
- animazioni normali e reveal;
- contenuti e identità del progetto.

## 4. Forno Lume BUSINESS

### Implementato

- mantenuta invariata l’evoluzione visuale di START;
- aggiunta copertura globale `prefers-reduced-motion`;
- aggiunto focus visibile globale coerente con la palette terracotta;
- favicon Lovable sostituito dal favicon Hospitality personalizzato in SVG e ICO;
- aggiunto script esplicito `typecheck`.

### Confermato staticamente

- palette, tipografia, container, gutter e linguaggio dei reveal sono già sostanzialmente coerenti con START;
- metadata demo/noindex e JSON-LD generico erano già impostati correttamente;
- non sono state applicate modifiche arbitrarie a spacing, palette o layout senza evidenza visuale runtime.

## 5. Verifiche realmente eseguite

### Superate

- parsing sintattico tramite TypeScript compiler API di 248 file `.ts`/`.tsx` complessivi;
- bilanciamento delle parentesi CSS nei tre repository;
- validità JSON di package e design manifest modificati;
- assert statici su favicon, metadata, noindex, schema demo, breakpoint navbar, token colore e rimozione dei riferimenti Lovable;
- controllo del diff senza output di errori whitespace.

### Tentate ma bloccate dall’ambiente

Il comando `tsc --noEmit` è stato avviato nei tre repository, ma non può completarsi perché gli snapshot non contengono le dipendenze installate e l’ambiente non riesce a scaricarle. Errore comune:

```text
TS2688: Cannot find type definition file for 'vite/client'.
```

Non sono quindi dichiarati superati:

- typecheck completo;
- lint;
- build;
- test automatici;
- browser QA locale;
- smoke test dei deploy;
- verifica live di Supabase/RLS.

## 6. Acceptance criteria per l’integrazione

Prima di considerare chiuso il passaggio:

1. applicare ogni patch su una branch dedicata del repository corretto;
2. installare le dipendenze con il package manager e lockfile esistenti;
3. eseguire `typecheck`, `lint` e `build`;
4. revisionare il diff, inclusi favicon e metadata;
5. verificare Tretnix.com a 360, 390, 430, 768, 1024 e 1440 px;
6. verificare navbar, hash, direct URL, refresh, Back e Forward;
7. verificare tastiera, focus ed `Escape`;
8. verificare `prefers-reduced-motion` attivo;
9. verificare START e BUSINESS senza overflow e senza regressioni visuali;
10. eseguire smoke test dopo il deploy;
11. eseguire l’ultimo passaggio Impeccable visuale sul deploy aggiornato;
12. registrare merge commit, comandi e risultati nella knowledge repository.

## 7. Stato conclusivo del passaggio

Il primo intervento parallelo è **preparato localmente**, ma non è ancora “definitivamente chiuso”. Le modifiche sono pronte per integrazione controllata; la chiusura definitiva richiede dipendenze, build e browser QA in un ambiente collegato ai repository e ai deploy reali.
