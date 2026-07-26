# Tretnix — Development Start Handoff

**Data:** 25 luglio 2026  
**Scopo:** iniziare lo sviluppo in una nuova chat pulita senza perdere decisioni, specifiche, vincoli e ordine operativo.  
**Stato complessivo:** `PREPARATION_COMPLETE / IMPLEMENTATION_NOT_STARTED`

## 1. Regola iniziale inderogabile

La nuova chat non deve creare progetti Lovable, consumare crediti, modificare repository remoti o avviare sviluppo finché l'utente non dichiara esplicitamente entrambe le condizioni:

1. l'abbonamento Lovable previsto è stato attivato;
2. è autorizzato l'avvio di `RITO Studio START`.

Una frase generica come “procedi” prima di queste due conferme non deve essere interpretata come autorizzazione a chiamare Lovable.

## 2. Fonte di verità

Applicare questa precedenza:

1. decisioni approvate;
2. standard di sviluppo condivisi;
3. documentazione specifica della famiglia;
4. task approvato corrente;
5. comportamento confermato nel codice e nel deployment;
6. conversazioni precedenti non ancora formalizzate.

File autorevoli inclusi:

- `01_SOURCE_OF_TRUTH/DECISIONS.md`
- `01_SOURCE_OF_TRUTH/DEVELOPMENT_STANDARDS.md`
- `01_SOURCE_OF_TRUTH/REPOSITORY_INDEX.md`
- `01_SOURCE_OF_TRUTH/TRETNIX_MASTER_CONTEXT.md`
- `01_SOURCE_OF_TRUTH/READ_ONLY_AUDIT.md`
- `01_SOURCE_OF_TRUTH/PREVIOUS_HANDOFF.md`

## 3. Identità Tretnix

Tretnix è una software boutique premium che progetta e sviluppa:

- siti e landing page;
- siti multipagina;
- dashboard;
- CRM;
- gestionali;
- web application;
- software personalizzato;
- automazioni aziendali.

Tretnix deve risultare elegante, minimale, professionale, affidabile, chiara e su misura.

Non deve essere presentata come:

- agenzia economica o generica;
- SaaS indistinto;
- brand crypto, broker o forex;
- servizio che attribuisce pubblicamente il lavoro a strumenti AI.

Gli strumenti interni non vengono citati nell'interfaccia pubblica.

Attribution cliente:

> Progettato e sviluppato da Tretnix

collegata a:

`https://tretnix.com`

## 4. Famiglie preparate

### Beauty & Wellness

```text
Concept: RITO Studio
Descriptor: Beauty & Care Atelier
Tagline: La bellezza, nel suo ritmo.
Package: TRETNIX_BEAUTY_WELLNESS_PRELAUNCH_v1.1_2026-07-25.zip
Status: PREPARATION_READY
```

Evoluzione:

```text
sito → prenotazioni → clienti → pacchetti/fidelity → gestionale
```

### Professional Services

```text
Concept: QUADRA Studio
Descriptor: Consulenza professionale
Tagline: Chiarezza per decisioni solide.
Package: TRETNIX_PROFESSIONAL_SERVICES_PRELAUNCH_v1.0_2026-07-25.zip
Status: PREPARATION_READY
```

Evoluzione:

```text
sito → lead qualificati → portale cliente → documenti/pratiche → CRM
```

### Home & Local Services

```text
Concept: NODO Servizi
Descriptor: Interventi, impianti e manutenzione
Tagline: Il lavoro fatto bene, dal primo contatto.
Package: TRETNIX_HOME_LOCAL_SERVICES_PRELAUNCH_v1.0_2026-07-25.zip
Status: PREPARATION_READY
```

Evoluzione:

```text
sito → richieste/preventivi → sopralluoghi → calendario tecnici → gestionale
```

## 5. Deliverable del mese intensivo

Priorità:

```text
1. RITO Studio START
2. RITO Studio BUSINESS
3. QUADRA Studio START
4. QUADRA Studio BUSINESS
5. NODO Servizi START
```

Stretch goal:

```text
6. NODO Servizi BUSINESS
```

La qualità, il QA e il freeze dei deliverable precedenti hanno priorità sullo stretch goal.

## 6. Primo progetto

Il primo progetto è esclusivamente:

```text
RITO Studio START
```

Repository previsto:

```text
rito-studio-START
```

Non creare ancora `rito-studio-BUSINESS`. BUSINESS deve derivare dal commit/tag canonico dello START.

## 7. Gate prima dell'avvio

Prima di chiamare Lovable:

- [ ] utente conferma abbonamento attivo;
- [ ] utente autorizza esplicitamente `RITO Studio START`;
- [ ] piano e data di rinnovo registrati;
- [ ] workspace corretto identificato;
- [ ] saldo crediti verificato;
- [ ] ricarica automatica indesiderata disabilitata;
- [ ] repository `rito-studio-START` creato;
- [ ] documentazione Beauty v1.1 inserita;
- [ ] branch iniziale definito;
- [ ] `STATUS.md` aggiornato a `IMPLEMENTATION_AUTHORIZED`;
- [ ] nessun altro agente modifica gli stessi file;
- [ ] prompt START letto integralmente;
- [ ] backend, auth, database e upload confermati fuori scope.

Se uno dei gate manca, fermarsi e indicare esattamente cosa manca.

## 8. Pipeline RITO START

```text
specifica Beauty v1.1
→ creazione repository START
→ Lovable prima costruzione
→ controllo diff e file
→ sincronizzazione GitHub
→ stop Lovable
→ Impeccable detector
→ Impeccable critique read-only
→ classificazione manuale finding
→ applicazione dei soli finding approvati
→ Codex audit/consolidamento
→ typecheck/lint/test/build disponibili
→ browser QA
→ freeze START
→ commit SHA + tag beauty-start-v1.0
```

## 9. Regole Lovable

- Usare il prompt `LOVABLE_START_PROMPT.md` contenuto nel package Beauty.
- Non semplificare o reinterpretare lo scope senza approvazione.
- Non aggiungere Supabase, auth, database, form reale o booking engine.
- Non pubblicare il progetto automaticamente.
- Non creare BUSINESS.
- Non aggiungere dipendenze senza necessità concreta.
- Non dichiarare test superati senza eseguirli.
- Registrare progetto, workspace, messaggi, consumo crediti e output.
- Fermare Lovable prima dell'audit Codex.

## 10. Standard tecnici non negoziabili

- Mobile-first.
- Nessun overflow orizzontale involontario.
- Nelle sezioni editoriali mobile il testo precede l'immagine.
- Hero e componenti visual-first documentati possono essere eccezioni.
- Nuove route aperte dall'alto senza smooth scrolling.
- Reveal below-the-fold quando entra nel viewport.
- `prefers-reduced-motion` rispettato.
- Browser back, forward, refresh e direct URL preservati.
- Palette, tipografia, tono e personalità della famiglia preservati.
- Auth, autorizzazione e RLS non vengono indebolite per nascondere errori frontend.
- Nessun cambiamento di copy o funzione non correlato.
- Nessuna dipendenza o redesign senza motivazione.

## 11. Verifiche obbligatorie

Eseguire solo comandi realmente presenti.

Registrare separatamente:

- typecheck;
- lint;
- test;
- build.

Per ciascuno:

- comando esatto;
- eseguito/non disponibile;
- exit code;
- risultato;
- limiti.

Browser QA minima:

- 360 px;
- 390 px;
- 430 px;
- 768 px;
- desktop;
- overflow;
- tastiera e focus;
- contrasto;
- reduced motion;
- direct URL;
- refresh;
- back/forward;
- console;
- network;
- immagini e layout shift;
- legal pages;
- 404;
- metadata;
- attribution Tretnix.

## 12. Freeze START → BUSINESS

Prima di BUSINESS:

- registrare SHA e tag START;
- finalizzare `DESIGN.md`;
- finalizzare `ANIMATIONS.md`;
- compilare `START_BUSINESS_CONTRACT.md`;
- completare matrice di parità;
- autorizzazione esplicita dell'utente.

BUSINESS eredita identità e comportamenti dello START. Può espandere route e contenuti, non reinterpretare liberamente palette, font, hero, pulsanti, motion, fotografia o personalità.

## 13. Prima risposta richiesta nella nuova chat

Dopo aver letto il pacchetto, la nuova chat deve:

1. confermare quali file sono stati realmente letti;
2. dichiarare lo stato `PREPARATION_COMPLETE / IMPLEMENTATION_NOT_STARTED`;
3. riepilogare il primo progetto e i gate mancanti;
4. non chiamare Lovable;
5. attendere la conferma esplicita dell'attivazione.

## 14. Verità sullo stato attuale

Già completato:

- strategia;
- tre famiglie;
- scope START/BUSINESS;
- copy;
- design;
- route;
- motion;
- testing specification;
- prompt;
- adapter;
- discovery;
- asset plan;
- repository plan;
- checklist.

Non ancora eseguito:

- acquisto abbonamenti;
- repository delle nuove famiglie;
- sviluppo;
- build;
- test;
- browser QA;
- Impeccable;
- audit Codex sul nuovo codice;
- deploy;
- freeze/tag.

## 15. Sicurezza contro perdita di contesto

Non basarsi sul ricordo della chat eliminata. Usare i file inclusi nel pacchetto come fonte. Qualsiasi nuova decisione deve essere formalizzata nei documenti e nel decision log.
