# Tretnix Repository Index

**Versione:** 1.1
**Aggiornato:** 17 luglio 2026
**Stato dell’inventario:** completo rispetto ai quattro repository attualmente dichiarati

Questo indice descrive il ruolo noto dei repository. Non sostituisce l’audit del codice.

---

## 1. Regole dell’inventario

Ogni repository deve registrare:

- nome;
- categoria;
- piano;
- URL;
- deploy;
- stato;
- branch principale;
- commit auditato;
- relazione con altri progetti;
- ruolo canonico;
- informazioni confermate;
- aspetti da verificare;
- problemi già conosciuti;
- accessi disponibili;
- data dell’ultimo audit.

L’inventario è completo soltanto rispetto al manifest approvato.

---

# 2. Repository attuali

## 2.1 Tretnix.com

### Identificazione

| Campo | Valore |
|---|---|
| Nome | `tretnix` |
| Categoria | sito istituzionale con area amministrativa |
| Piano | INTERNO |
| Repository | `https://github.com/AdamDariOfficial/tretnix.git` |
| Deploy | `https://tretnix.com` |
| Stato | produzione |
| Branch principale | da verificare |
| Commit auditato | non ancora auditato |
| Ultimo audit | non eseguito |

### Relazione con altri progetti

È il sito istituzionale Tretnix. Non deriva da Forno Lume.

### Ruolo canonico dichiarato

- brand aziendale;
- posizionamento premium e boutique;
- esperienza istituzionale;
- componenti e pattern del sito Tretnix;
- area amministrativa;
- gestione dei contatti.

### Stato dichiarato

Completato. Rimangono revisioni di dettaglio:

- SEO;
- aspetti legali;
- colori.

Queste revisioni non sono considerate problemi gravi già confermati.

### Funzionalità note da verificare nel codice

- sito pubblico;
- form contatti;
- autenticazione;
- ruoli;
- area `/admin`;
- gestione progetti;
- impostazioni;
- analytics;
- contact requests;
- Supabase o Lovable Cloud.

### Problemi o aree già note

- navbar;
- scroll-spy;
- navigazione cross-route;
- autenticazione e ruoli;
- admin;
- analytics;
- contact requests;
- accessibilità;
- SEO;
- sicurezza Supabase.

### Ruolo canonico non ancora assegnabile

Non considerare automaticamente canonici:

- architettura;
- autenticazione;
- RLS;
- analytics;
- implementazione navbar;
- standard tecnici generali.

Questi aspetti richiedono audit.

---

## 2.2 Forno Lume START

### Identificazione

| Campo | Valore |
|---|---|
| Nome | `forno-lume-START` |
| Categoria | landing / sito Hospitality |
| Piano | START |
| Repository | `https://github.com/AdamDariOfficial/forno-lume-START.git` |
| Deploy | `https://forno-lume.tretnix.com` |
| Stato | produzione |
| Branch principale | `main` |
| Commit auditato | `39d58126abb2fa9b63070e047db06c8027aaef6f` |
| Ultimo audit | 17 luglio 2026 — audit statico read-only + controllo qualità |

### Relazione con altri progetti

È il progetto originale della famiglia Forno Lume.

Forno Lume BUSINESS deriva da questo progetto.

### Ruolo canonico dichiarato

Fonte iniziale per il verticale Hospitality START:

- identità visuale;
- tipografia;
- palette;
- animazioni;
- navbar;
- reveal;
- interazioni;
- responsive;
- qualità percepita.

### Identità nota

- atmosfera crema, terracotta, oliva e oro attenuato;
- titoli editoriali con Fraunces;
- testo e interfaccia con Inter;
- stile caldo, elegante e artigianale;
- non deve essere trasformato in un design SaaS generico.

I valori tecnici esatti devono essere verificati nel codice e documentati nel futuro design system del progetto.

### Stato verificato

- completato e deployato;
- foundation agent integrata in `main`;
- primo audit statico read-only completato;
- controllo qualità dell'audit completato;
- build, lint, typecheck e browser interattivo ancora da eseguire;
- prossimo passo: primo pacchetto di remediation controllato con Codex.

### Finding prioritari confermati

- attribuzione footer non conforme;
- ordine editoriale mobile errato in `AboutSection`;
- semantica/focus della navbar nascosta da correggere preservando il comportamento visuale;
- drawer mobile senza gestione tastiera completa;
- reduced motion incompleto per la FAQ.

### Aree ancora da controllare

- architettura;
- struttura componenti;
- animazioni;
- navbar hide/show;
- route e scroll;
- responsive;
- overflow;
- ordine mobile testo/immagine;
- componenti riutilizzabili;
- duplicazioni;
- accessibilità;
- SEO;
- test;
- build;
- preparazione alla duplicazione.

### Ruolo canonico non ancora assegnabile

START è fonte visuale dichiarata. I pattern tecnici possono diventare canonici soltanto dopo remediation e verifiche esecutive/manuali.

---

## 2.3 Forno Lume BUSINESS

### Identificazione

| Campo | Valore |
|---|---|
| Nome | `forno-lume-BUSINESS` |
| Categoria | sito multipagina Hospitality |
| Piano | BUSINESS |
| Repository | `https://github.com/AdamDariOfficial/forno-lume-BUSINESS.git` |
| Deploy | `https://forno-lume-business.tretnix.com` |
| Stato | produzione / revisione |
| Branch principale | da verificare |
| Commit auditato | non ancora auditato |
| Ultimo audit | non eseguito |

### Relazione con altri progetti

Deriva da Forno Lume START.

Deve preservarne identità e linguaggio di animazione, espandendo struttura e contenuti.

### Ruolo canonico candidato

- architettura multipagina Hospitality;
- configurazione centralizzata;
- navigazione tra route;
- galleria e lightbox;
- espansione START → BUSINESS.

Il ruolo canonico tecnico deve essere confermato tramite audit.

### Route previste

```text
/
/menu
/chi-siamo
/galleria
/contatti
/privacy
/cookie
404
```

### Identità da preservare

- palette;
- Fraunces;
- Inter;
- atmosfera;
- immagini;
- composizione approvata;
- linguaggio di animazione dello START.

### Aree da controllare

- confronto visuale e tecnico con START;
- animazioni mancanti o alterate;
- route reset;
- navbar;
- configurazione centralizzata;
- SEO multipagina;
- lightbox `100dvh`;
- ordine editoriale mobile;
- navigazione;
- direct URL;
- refresh;
- back e forward;
- regressioni introdotte durante l’espansione.

---


## 2.4 Tretnix Knowledge

### Identificazione

| Campo | Valore |
|---|---|
| Nome | `Tretnix-knowledge` |
| Categoria | repository operativo e documentale interno |
| Piano | INTERNO |
| Repository | `https://github.com/AdamDariOfficial/Tretnix-knowledge.git` |
| Deploy | non applicabile |
| Stato | operativo |
| Branch principale | `main` |
| Commit auditato | repository ispezionata il 17 luglio 2026 |
| Ultimo audit | revisione documentale per integrazione Codex |

### Ruolo canonico

- identità e posizionamento Tretnix;
- decisioni approvate;
- standard condivisi;
- indice dei repository;
- template e procedure;
- adattatori per ChatGPT, Lovable, Cursor e Codex;
- kit di configurazione dei progetti.

### Regole

- è la fonte canonica trasversale;
- non contiene bug temporanei o task correnti dei progetti;
- ogni modifica significativa usa branch, diff e pull request;
- deve tornare privata dopo le operazioni che richiedono accesso pubblico, salvo decisione diversa.

---

# 3. Mappa delle relazioni

```text
Tretnix.com
└── sito istituzionale e sistema amministrativo interno

Forno Lume START
└── fonte visuale Hospitality START
    └── Forno Lume BUSINESS
        └── futuro BUSINESS PLUS
```

---

# 4. Registro iniziale dei pattern candidati

| Pattern | Repository candidato | Stato |
|---|---|---|
| Brand Tretnix | `tretnix` | dichiarato, da documentare |
| Esperienza istituzionale premium | `tretnix` | da auditare |
| Identità Hospitality | `forno-lume-START` | dichiarato |
| Tipografia Hospitality | `forno-lume-START` | dichiarato, valori da verificare |
| Animazioni Hospitality | `forno-lume-START` | da auditare |
| Navbar Hospitality | `forno-lume-START` | da auditare |
| Responsive Hospitality | `forno-lume-START` | da auditare |
| Architettura multipagina Hospitality | `forno-lume-BUSINESS` | candidato |
| Configurazione centralizzata | `forno-lume-BUSINESS` | candidato |
| Lightbox | `forno-lume-BUSINESS` | candidato, da verificare |
| Admin | `tretnix` | candidato, da auditare |
| Autenticazione e ruoli | nessuna fonte assegnata | da auditare |
| RLS e sicurezza Supabase | nessuna fonte assegnata | da auditare |
| Test | nessuna fonte assegnata | da inventariare |
| Git workflow | `tretnix-knowledge` | standard condiviso |
| Agent handoff | `tretnix-knowledge` | standard condiviso |
| Codex workflow | `tretnix-knowledge` | approvato, pilota su START |

---

# 5. Ordine operativo aggiornato

1. configurare Codex e verificarne la lettura delle istruzioni;
2. preparare il task di remediation prioritario per `forno-lume-START`;
3. implementare una categoria alla volta;
4. revisionare il diff in sola lettura;
5. completare build, lint e verifiche browser;
6. estrarre i pattern tecnici confermati;
7. auditare `forno-lume-BUSINESS`;
8. confrontare START ↔ BUSINESS;
9. auditare `tretnix`;
10. aggiornare il registro dei pattern canonici.

Le vulnerabilità critiche o alte rilevate devono essere segnalate immediatamente e prioritarizzate.

---

# 6. Template per una nuova repository

```md
## Nome progetto

### Identificazione

| Campo | Valore |
|---|---|
| Nome | |
| Categoria | sito / landing / gestionale / dashboard / CRM / template / progetto interno |
| Piano | START / BUSINESS / BUSINESS PLUS / CUSTOM / INTERNO |
| Repository | |
| Deploy | |
| Stato | in sviluppo / staging / produzione / archiviato |
| Branch principale | |
| Commit auditato | |
| Ultimo audit | |

### Relazione con altri progetti

Descrivere progetto originale, derivazione, template o riferimento.

### Ruolo canonico dichiarato

Specificare se rappresenta un riferimento per componenti, animazioni, settore, UX o architettura.

### Informazioni confermate

-

### Aspetti da verificare

-

### Problemi già conosciuti

-

### Accessi disponibili

- repository:
- deploy:
- ambiente locale:
- Supabase:
- analytics:
- hosting:

### Esclusioni dall’audit

-
```
