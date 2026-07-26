# RITO Studio — Routes and Information Architecture

**Famiglia:** Beauty & Wellness  
**Versione:** 1.0  
**Stato:** approvato

## 1. Principi

- Mobile-first.
- Nuove route aperte dall'alto con reset immediato.
- Nessuno smooth scroll durante il cambio route.
- Back, forward, refresh e direct URL devono funzionare.
- Gli anchor interni possono usare scroll controllato.
- Le route devono essere semanticamente leggibili.
- La 404 è obbligatoria.
- Privacy e cookie restano route reali.
- Dati, menu e route metadata devono essere centralizzati.

## 2. START

## Route pubbliche

```text
/
/privacy
/cookie
/*
```

## Anchor nella home

```text
#trattamenti
#metodo
#studio
#contatti
```

## Home — ordine sezioni

```text
1. StickyHeader
2. Hero
3. IntroStatement
4. EditorialServiceList
5. RitualFeature
6. MethodStrip
7. StudioEditorial
8. GalleryRail
9. BookingCTA
10. PracticalInfo
11. Footer
```

## Regole START

- La CTA “Prenota” porta al canale configurato o a `#contatti`.
- Nessuna route di prenotazione nativa.
- Nessun form con trasmissione dati nella demo.
- Gallery senza lightbox obbligatoria nella prima build.
- Privacy e cookie possono contenere placeholder chiaramente segnalati come non definitivi.

## 3. BUSINESS

## Route pubbliche

```text
/
/trattamenti
/trattamenti/:slug
/studio
/team
/galleria
/prenota
/faq
/contatti
/privacy
/cookie
/*
```

## Route opzionali future

```text
/journal
/journal/:slug
/gift-card
/account
/admin
```

Non implementare le route future nella prima versione BUSINESS.

## 4. Responsabilità delle route

### `/`

- posizionamento;
- servizi principali;
- metodo;
- team teaser;
- gallery teaser;
- CTA;
- informazioni essenziali.

### `/trattamenti`

- elenco completo;
- filtri per categoria;
- ricerca opzionale soltanto se il catalogo è ampio;
- durata e prezzo base;
- link alle pagine dettaglio.

### `/trattamenti/:slug`

- dettagli;
- durata;
- prezzo;
- ideale per;
- cosa include;
- preparazione;
- aftercare;
- note;
- CTA prenotazione;
- servizi correlati.

Slug esempio:

```text
/trattamenti/rituale-viso-essenziale
```

### `/studio`

- filosofia;
- ambiente;
- metodo;
- prodotti;
- igiene;
- accessibilità;
- gallery editoriale.

### `/team`

- profili;
- competenze;
- servizi;
- eventuale filtro prenotazione.

### `/galleria`

- gallery categorizzata;
- lightbox accessibile;
- keyboard navigation;
- focus return;
- immagini con dimensioni dichiarate.

### `/prenota`

- funnel configurabile;
- external / whatsapp / request;
- demo mode;
- error, loading e success state;
- privacy e consenso.

### `/faq`

- domande complete;
- accordion accessibile;
- un solo pannello aperto per default oppure comportamento documentato;
- nessun auto-scroll invasivo.

### `/contatti`

- dati pratici;
- orari;
- canali;
- indicazioni;
- accessibilità;
- policy appuntamenti;
- CTA.

### `/privacy` e `/cookie`

- contenuti specifici del cliente da revisionare;
- nessuna dichiarazione di conformità legale automatica;
- metadata appropriati;
- accessibili dal footer.

### `404`

- messaggio coerente;
- link home;
- link trattamenti;
- nessun redirect automatico silenzioso.

## 5. Navigazione

### START desktop

```text
Trattamenti
Metodo
Studio
Contatti
Prenota
```

### BUSINESS desktop

```text
Trattamenti
Studio
Team
Galleria
FAQ
Contatti
Prenota
```

### Mobile

- pulsante menu con label accessibile;
- drawer con focus management;
- `Escape` chiude;
- il focus ritorna al trigger;
- click su route chiude il drawer;
- body scroll lock senza layout shift;
- CTA prenotazione presente ma non sovrapposta al contenuto.

## 6. Configurazione proposta

```ts
type BookingMode = "external" | "whatsapp" | "request" | "demo";

interface SiteConfig {
  brand: {
    name: string;
    descriptor: string;
    tagline: string;
  };
  contact: {
    city: string;
    address?: string;
    email: string;
    phone: string;
    whatsapp?: string;
  };
  booking: {
    mode: BookingMode;
    externalUrl?: string;
    requestEndpoint?: string;
    demoMode: boolean;
  };
  hours: OpeningHours[];
  social: SocialLink[];
  seo: {
    siteUrl: string;
    defaultTitle: string;
    defaultDescription: string;
    locale: "it_IT";
  };
}
```

I valori devono essere validati e non duplicati nei componenti.

## 7. Scroll e history

### Cambio route

```text
navigate
→ mount nuova route
→ reset immediato all'inizio
→ focus sul contenuto principale quando appropriato
```

Non usare `behavior: "smooth"`.

### Anchor nella stessa pagina

- compensare l'header;
- aggiornare focus quando necessario;
- non usare offset fragili duplicati;
- rispettare reduced motion.

### Back e forward

Non forzare sempre `scrollTo(0, 0)` durante navigazione history se questo distrugge un ripristino previsto. Il comportamento va testato e documentato.

## 8. Metadata

Ogni route BUSINESS deve definire:

- title;
- description;
- canonical;
- Open Graph;
- image social;
- indexability;
- structured data quando appropriato.

Non aggiungere `aggregateRating` senza recensioni reali e verificabili.

## 9. Acceptance criteria routing

- Nessuna route produce pagina bianca.
- Direct URL e refresh funzionano.
- La 404 intercetta slug inesistenti.
- Le anchor START raggiungono la sezione corretta.
- Il drawer mobile si chiude e ripristina il focus.
- La route nuova appare dall'alto senza smooth scroll.
- La navigazione non provoca flash di contenuto nascosto.
- Nessun link placeholder porta a un dominio reale non approvato.
