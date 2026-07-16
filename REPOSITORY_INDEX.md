# Tretnix Repository Index

**Versione:** 1.0  
**Aggiornato:** 16 luglio 2026  
**Stato dell’inventario:** completo rispetto ai tre repository attualmente dichiarati

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
| Branch principale | da verificare |
| Commit auditato | non ancora auditato |
| Ultimo audit | non eseguito |

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

### Stato dichiarato

- completato;
- deployato;
- deve diventare una base tecnica pulita per i piani superiori.

### Aree da controllare

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

START è fonte visuale dichiarata, ma l’implementazione tecnica dei pattern deve essere auditata prima di essere copiata.

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

---

# 5. Ordine iniziale degli audit

1. `forno-lume-START`;
2. `forno-lume-BUSINESS`;
3. confronto START ↔ BUSINESS;
4. `tretnix`;
5. registro dei pattern canonici;
6. piano di correzione;
7. implementazione una categoria alla volta.

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
