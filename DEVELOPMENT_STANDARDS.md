# Tretnix Development Standards

**Versione:** 1.1
**Aggiornato:** 17 luglio 2026
**Ambito:** tutti i progetti Tretnix, salvo eccezioni documentate

Le parole **DEVE**, **NON DEVE**, **DOVREBBE** e **PUÒ** esprimono il livello di obbligatorietà.

---

## 1. Principi generali

Ogni progetto Tretnix DEVE essere:

- comprensibile;
- mantenibile;
- sicuro;
- responsive;
- accessibile;
- versionato;
- verificabile;
- coerente con i requisiti approvati.

Gli strumenti devono assistere lo sviluppo, non sostituire il controllo tecnico.

### Regole fondamentali

- Identificare la causa reale prima di applicare una patch.
- Evitare modifiche estranee al task.
- Preferire la soluzione più piccola ma completa.
- Preservare ciò che funziona.
- Non riscrivere architetture senza una motivazione documentata.
- Non dichiarare test o build riusciti senza averli eseguiti.
- Separare fatti confermati, ipotesi e verifiche mancanti.
- Non presentare gli strumenti interni come autori pubblici del software.

---

## 2. Analisi prima dell’implementazione

Per modifiche non banali l’agente o lo sviluppatore DEVE:

1. leggere i file rilevanti;
2. identificare entry point, componenti, hook, provider e utility coinvolti;
3. tracciare il flusso dei dati e degli eventi;
4. distinguere sintomo e causa;
5. cercare lo stesso pattern nel repository;
6. valutare impatto e regressioni;
7. proporre un piano sintetico;
8. elencare i file previsti.

NON DEVE:

- iniziare da una sostituzione casuale;
- modificare file non analizzati;
- aggiungere cleanup non richiesti;
- cambiare copy o design estranei;
- installare dipendenze per comodità senza giustificazione.

---

## 3. Git e GitHub

### Branch

Lo sviluppo manuale NON DEVE avvenire direttamente su `main`.

Pattern consigliati:

```text
feature/*
fix/*
audit/*
refactor/*
docs/*
chore/*
```

`main` DEVE rappresentare una versione distribuibile.

### Commit

I commit DEVONO essere:

- focalizzati;
- descrittivi;
- privi di segreti;
- privi di file generati non necessari;
- privi di modifiche estranee.

Esempi:

```text
fix: restore route scroll position
feat: add gallery category navigation
docs: record mobile editorial order
audit: document navbar findings
```

### Pull request

Per interventi significativi usare una pull request con:

- contesto;
- obiettivo;
- elenco delle modifiche;
- controlli eseguiti;
- screenshot quando utili;
- rischi;
- test manuali rimanenti.

### Agenti, Lovable e branch principale

La sincronizzazione GitHub di Lovable deve essere verificata prima di applicare protezioni che potrebbero interromperla.

Regole obbligatorie:

- un solo agente o ambiente scrive sugli stessi file alla volta;
- Lovable, Codex, Cursor Agent e Claude Code non devono modificare contemporaneamente lo stesso working tree;
- ogni handoff deve partire da un branch, commit o diff identificabile;
- il revisore deve iniziare in sola lettura;
- i finding del revisore non vengono applicati automaticamente;
- non lavorare direttamente su `main`;
- non riscrivere la cronologia pubblicata di un progetto collegato a Lovable;
- non usare force push, rebase, amend o squash su commit già sincronizzati quando può compromettere la history Lovable.

---

## 4. TypeScript

- Usare TypeScript in modalità rigorosa quando supportata.
- Evitare `any`.
- Non sopprimere errori con cast insicuri senza motivazione.
- Preferire tipi espliciti per dati esterni, API e database.
- Validare dati non fidati a runtime.
- Mantenere allineati i tipi Supabase con lo schema effettivo.
- Non usare `as unknown as` come soluzione permanente.
- Gestire esplicitamente `null`, `undefined` e stati incompleti.
- Rimuovere import, variabili e rami morti.
- Non duplicare enum o costanti in più file senza una fonte centrale.

---

## 5. Architettura e componenti

### Componenti

I componenti DEVONO avere responsabilità chiare.

Estrarre un componente condiviso quando:

- il comportamento è realmente ripetuto;
- l’API è stabile;
- l’estrazione riduce duplicazioni;
- non appiattisce l’identità del cliente.

Non creare astrazioni generiche premature.

### Logica

- La logica di business non deve essere duplicata nelle view.
- Configurazioni ripetute devono essere centralizzate.
- Hook condivisi devono avere dipendenze e lifecycle prevedibili.
- Evitare effetti con responsabilità multiple.
- Evitare stato derivato duplicato.
- Stabilizzare query key e dipendenze degli hook.
- Distinguere dati server, stato UI e configurazione statica.

### Dipendenze

Una nuova dipendenza DEVE:

- risolvere un problema reale;
- essere compatibile con lo stack;
- essere mantenuta;
- non duplicare una capacità già presente;
- essere giustificata nel report o nella PR.

Non aggiornare dipendenze durante un task non correlato.

---

## 6. Coordinamento degli agenti

### Un solo writer

Durante un task, un solo agente o sviluppatore ha il ruolo di writer sul working tree.

Gli altri strumenti possono:

- leggere;
- revisionare il diff;
- produrre finding;
- proporre verifiche.

Non possono applicare modifiche finché non ricevono un task approvato.

### Checkpoint obbligatorio

Ogni passaggio tra strumenti DEVE produrre almeno uno tra:

- commit;
- branch;
- diff salvato;
- pull request;
- report con commit e stato Git.

Il nuovo agente DEVE conoscere:

- branch;
- commit base;
- specifica approvata;
- file modificati;
- controlli già eseguiti;
- controlli mancanti.

### Revisione indipendente

La prima revisione di una modifica DEVE essere in sola lettura.

Il revisore deve classificare ogni osservazione come:

- confermata;
- probabile;
- potenziale;
- verifica manuale richiesta;
- fuori perimetro;
- non valutabile.

Ogni finding deve essere deciso da una persona come:

- approvato;
- rifiutato;
- da verificare;
- fuori perimetro;
- miglioramento futuro.

### Codex locale e cloud

Per il lavoro ordinario DOVREBBE essere preferito Codex locale nell'IDE quando serve controllo immediato.

Codex Cloud PUÒ essere usato per task isolati o più lunghi quando:

- il repository e il branch sono identificati;
- l'ambiente di setup è documentato;
- non sono presenti credenziali di produzione non necessarie;
- l'accesso di rete è limitato al minimo;
- il risultato viene revisionato come diff o pull request.

L'esecuzione in cloud non sostituisce il controllo del diff, i test né l'approvazione umana.

---

## 7. Configurazione e contenuti

Informazioni ripetute come:

- contatti;
- orari;
- indirizzi;
- link social;
- CTA;
- voci di menu;
- categorie;
- dati del cliente;

DOVREBBERO vivere in configurazioni centralizzate quando appropriato.

Evitare:

- valori duplicati;
- stringhe divergenti;
- URL sparsi;
- contenuti hard-coded in molti componenti;
- chiavi segrete in configurazioni client.

---

## 8. Responsive

Ogni progetto DEVE essere sviluppato mobile-first.

### Larghezze minime da controllare

- 360 px;
- 390 px;
- 430 px;
- 768 px;
- desktop rappresentativo.

### Regole

- Nessun overflow orizzontale involontario.
- Nessun contenuto importante deve essere tagliato.
- I touch target devono essere adeguati.
- Elementi fixed e sticky devono rispettare viewport e safe area.
- Evitare altezze rigide fragili.
- Preferire `dvh` quando serve rappresentare l’altezza dinamica mobile.
- Verificare testi lunghi, zoom e contenuti localizzati.
- Non duplicare markup soltanto per cambiare l’ordine responsive.

### Ordine editoriale mobile

Nelle sezioni editoriali:

```text
testo
immagine
```

Eccezioni:

- hero;
- gallerie;
- elementi visual-first documentati.

L’alternanza desktop può essere preservata tramite layout e proprietà di ordine accessibili.

---

## 9. Routing, navigazione e scroll

### Cambio route

Una nuova route DEVE aprirsi dall’alto.

Il reset DEVE essere immediato, non smooth.

### Link a sezioni

Per una sezione nella route corrente:

- usare scroll controllato quando appropriato;
- rispettare header e focus;
- evitare offset hard-coded fragili.

Per una sezione in un’altra route:

1. navigare alla route;
2. attendere che la destinazione sia montata;
3. scorrere alla sezione;
4. gestire refresh e accesso diretto;
5. evitare race condition.

### History

Verificare:

- browser back;
- browser forward;
- direct URL;
- refresh;
- query string;
- hash;
- route non esistenti;
- redirect.

Non applicare un reset globale che distrugga la corretta scroll restoration della history senza una decisione esplicita.

### Navbar

Verificare:

- stato iniziale;
- hide/show;
- menu mobile;
- focus;
- route attiva;
- scroll-spy;
- link cross-route;
- chiusura del drawer;
- blocco dello scroll;
- `Escape`;
- click esterno;
- riduzione del movimento.

La navbar non deve provocare salti, flash o layout shift.

---

## 10. Animazioni

Le animazioni DEVONO essere:

- raffinate;
- controllate;
- coerenti;
- non invasive;
- compatibili con accessibilità e performance.

### Reveal

Gli elementi sotto la fold devono attivarsi entrando nel viewport.

Evitare:

- animazioni già concluse prima della visibilità;
- flash del contenuto;
- replay casuali;
- elementi invisibili senza fallback;
- observer duplicati non gestiti.

### Route

Il reset di route non deve essere smooth.

Le transizioni non devono mostrare lo scorrimento della pagina precedente.

### Reduced motion

Rispettare `prefers-reduced-motion`.

Quando il movimento è ridotto:

- il contenuto deve restare visibile;
- le transizioni devono essere eliminate o abbreviate;
- nessuna funzionalità deve dipendere dall’animazione.

### Coerenza tra piani correlati

START, BUSINESS e BUSINESS PLUS dello stesso verticale devono conservare il linguaggio di animazione approvato, salvo miglioramenti tecnici che preservino il comportamento percepito.

---

## 11. Accessibilità

Obiettivo minimo: conformità pratica ai principi WCAG 2.2 livello AA per i flussi rilevanti.

### Struttura

- Un solo `h1` principale per pagina, salvo motivazione semantica.
- Gerarchia degli heading coerente.
- Landmark appropriati.
- Link e pulsanti usati secondo la loro funzione.
- Etichette associate ai campi.

### Tastiera

Ogni interazione deve essere utilizzabile da tastiera:

- navbar;
- drawer;
- FAQ;
- dialog;
- lightbox;
- form;
- menu;
- caroselli;
- controlli personalizzati.

### Focus

- Focus visibile.
- Focus iniziale e ritorno del focus nei dialog.
- Nessun focus intrappolato accidentalmente.
- Gestione di `Escape` dove prevista.

### Immagini e media

- `alt` significativo oppure vuoto per immagini decorative.
- Evitare testo importante incorporato soltanto nelle immagini.
- Controlli accessibili per media e lightbox.

### Contrasto

Testo, icone e controlli devono avere contrasto sufficiente, preservando il brand del cliente senza sacrificarne l’uso.

---

## 12. Form, stati ed errori

Ogni flusso asincrono DEVE considerare:

- idle;
- loading;
- successo;
- errore;
- empty state;
- retry;
- timeout o indisponibilità quando rilevante.

### Form

- Validazione client per UX.
- Validazione server per sicurezza.
- Errori specifici e comprensibili.
- Prevenzione dell’invio duplicato.
- Feedback di successo.
- Conservazione dei dati quando appropriato.
- Protezione da abuso per endpoint pubblici.
- Non esporre dettagli interni dell’errore.

---

## 13. Performance

Verificare:

- dimensione bundle;
- immagini;
- font;
- lazy loading;
- code splitting;
- richieste duplicate;
- query non necessarie;
- listener non rimossi;
- observer duplicati;
- layout shift;
- render ripetuti;
- animazioni costose;
- dipendenze pesanti.

### Immagini

- Dimensioni adeguate.
- Formati moderni quando supportati.
- `width` e `height` o aspect ratio.
- Lazy loading sotto la fold.
- Preload soltanto per asset realmente critici.

### Font

- Caricare soltanto pesi necessari.
- Evitare blocchi di rendering non necessari.
- Preservare la tipografia approvata del cliente.

---

## 14. Sicurezza generale

- Non committare `.env`.
- Non mostrare segreti nei prompt, log o screenshot.
- Non inserire service-role key nel client.
- Non affidare la sicurezza ai controlli frontend.
- Applicare principio del minimo privilegio.
- Validare input e output.
- Non fidarsi di ruoli o ID forniti dal client.
- Non usare informazioni sensibili in URL o analytics.
- Verificare dipendenze e configurazioni.
- Non eseguire operazioni distruttive senza approvazione esplicita.

---

## 15. Supabase e Lovable Cloud

### Migrazioni

Le modifiche allo schema DEVONO avvenire tramite migrazioni versionate.

Una migrazione deve considerare:

- compatibilità;
- rollback o piano di recupero;
- dati esistenti;
- indici;
- constraint;
- trigger;
- funzioni;
- RLS;
- deployment order.

Non modificare manualmente lo schema di produzione senza registrare la modifica.

### Row Level Security

Per tabelle esposte al client:

- verificare che RLS sia abilitata;
- definire policy per operazione;
- evitare policy eccessivamente permissive;
- testare utenti anonimi, autenticati e amministratori;
- verificare join e viste;
- non sostituire RLS con condizioni frontend.

### Autenticazione e autorizzazione

- L’autenticazione verifica chi è l’utente.
- L’autorizzazione verifica cosa può fare.
- Un route guard client migliora UX, ma non protegge i dati.
- I ruoli devono essere verificati lato backend.
- Evitare escalation tramite metadata modificabili dall’utente.
- Verificare session expiry, refresh, logout e accesso diretto.

### Funzioni

Per funzioni `SECURITY DEFINER`:

- impostare un `search_path` sicuro;
- validare l’identità;
- limitare i privilegi;
- verificare parametri;
- evitare SQL dinamico non sicuro;
- documentare perché la funzione richiede privilegi elevati.

### Storage

Verificare:

- bucket pubblici e privati;
- policy su `storage.objects`;
- percorso degli oggetti;
- ownership;
- upload;
- download;
- delete;
- MIME type;
- dimensione;
- rendering anonimo e in incognito;
- URL firmati;
- rischio di enumerazione.

Non irrigidire le policy in modo da rompere media che devono essere pubblicamente renderizzati.

---

## 16. Test e verifica

Ogni repository DOVREBBE definire comandi espliciti per:

- typecheck;
- lint;
- test;
- build.

Un agente NON DEVE inventare un comando mancante né dichiararlo superato.

### Matrice minima manuale

- desktop;
- 360 px;
- 390 px;
- 430 px;
- 768 px;
- tastiera;
- reduced motion;
- direct URL;
- refresh;
- back;
- forward;
- console;
- rete;
- stato vuoto;
- errore;
- caricamento.

### Test automatici

Priorità:

1. logica critica;
2. autorizzazione;
3. form e validazione;
4. routing;
5. componenti interattivi;
6. regressioni già avvenute.

---

## 17. Build e deploy

Prima del deploy:

- working tree controllato;
- diff revisionato;
- typecheck eseguito;
- lint eseguito;
- test eseguiti quando presenti;
- build eseguita;
- variabili d’ambiente verificate;
- migrazioni pianificate;
- route dirette verificate;
- fallback e 404 verificate;
- asset e metadata verificati;
- staging controllato.

### Rischi da controllare

- differenze tra locale e produzione;
- route SPA non configurate;
- redirect;
- caching;
- variabili mancanti;
- dominio e canonical;
- migrazioni non applicate;
- RLS incoerente;
- asset case-sensitive;
- dipendenze native;
- lockfile modificato;
- header di sicurezza;
- errori runtime in produzione.

---

## 18. SEO e aspetti pubblici

Per siti pubblici verificare:

- title;
- description;
- canonical;
- Open Graph;
- favicon;
- robots;
- sitemap;
- heading;
- dati strutturati quando appropriati;
- URL leggibili;
- status code;
- pagina 404;
- redirect;
- immagini social;
- contenuti duplicati;
- pagine legali richieste.

Il contenuto legale deve essere revisionato professionalmente quando necessario. Un agente non deve presentare un testo generico come consulenza legale definitiva.

---

## 19. Attribuzione Tretnix

Ogni progetto cliente attuale e futuro DEVE includere nel footer una firma discreta:

> Progettato e sviluppato da Tretnix

collegata a:

```text
https://tretnix.com
```

L’implementazione deve:

- essere accessibile;
- non competere con il brand del cliente;
- non usare riferimenti pubblici agli strumenti interni;
- preservare il layout del footer.

---

## 20. Documentazione locale

Ogni repository dovrà progressivamente adottare:

```text
README.md
AGENTS.md
docs/PRODUCT.md
docs/ARCHITECTURE.md
docs/DESIGN_SYSTEM.md
docs/ANIMATIONS.md
docs/DATABASE.md
docs/SECURITY.md
docs/TESTING.md
docs/DECISIONS.md
docs/STATUS.md
docs/ROADMAP.md
```

Non è necessario creare documenti vuoti. Introdurli quando esiste contenuto utile e verificato.

---

## 21. Report finale di un intervento

Ogni intervento non banale deve riportare:

- obiettivo;
- causa;
- soluzione;
- file modificati;
- dipendenze introdotte;
- migrazioni;
- controlli realmente eseguiti;
- risultati;
- problemi non risolti;
- rischio di regressione;
- controlli manuali ancora necessari.
