# QUADRA Studio — Routes and Information Architecture

**Famiglia:** Professional Services  
**Versione:** 1.0  
**Stato:** approvato come baseline di preparazione

## 1. Principi

- Mobile-first.
- Nuove route aperte dall'alto con reset immediato.
- Nessuno smooth scroll al cambio route.
- Direct URL, refresh, back e forward devono funzionare.
- Anchor interni controllati e compatibili con header e focus.
- Metadata centralizzati.
- 404 reale.
- Contenuti regolamentati e note professionali verificabili.
- Nessun portale o upload implicito.

## 2. START

## Route

```text
/
/privacy
/cookie
/note-legali
/*
```

## Anchor

```text
#competenze
#metodo
#studio
#contatti
```

## Home — ordine

```text
1. StickyHeader
2. Hero
3. PositioningStatement
4. ExpertiseIndex
5. EngagementPath
6. ScenarioIndex
7. StudioEditorial
8. PrinciplesLedger
9. QualificationCTA
10. PracticalInfo
11. Footer
```

## Regole START

- CTA in demo mode.
- Nessun invio dati.
- Nessun file upload.
- Nessun team inventato.
- Scenari sempre dichiarati dimostrativi.
- Note legali placeholder non presentate come definitive.
- Nessuna area cliente.

## 3. BUSINESS

## Route principali

```text
/
/competenze
/competenze/:slug
/settori
/settori/:slug
/studio
/professionisti
/professionisti/:slug
/casi
/casi/:slug
/insight
/insight/:slug
/richiedi-consulenza
/contatti
/privacy
/cookie
/note-legali
/*
```

## Route opzionali configurabili

```text
/area-clienti
/pubblicazioni
/eventi
```

Non implementare route opzionali se mancano contenuti o funzioni reali.

## 4. Responsabilità

### `/`

Posizionamento, competenze principali, settori, metodo, studio, prove reali e CTA.

### `/competenze`

Indice, criteri di selezione, collegamenti ai settori e richiesta.

### `/competenze/:slug`

Problema, attività, perimetro, deliverable, limiti, professionisti e insight correlati.

### `/settori`

Contesti nei quali lo studio opera realmente.

### `/settori/:slug`

Esigenze tipiche, competenze, persone, casi e contenuti.

### `/studio`

Storia, metodo, organizzazione, sedi, principi e disclosure.

### `/professionisti`

Profili verificati con filtri minimi.

### `/professionisti/:slug`

Qualifiche, competenze, lingue, pubblicazioni e CTA.

### `/casi`

Solo casi autorizzati. Se non disponibili, rimuovere la route.

### `/casi/:slug`

Contesto, obiettivo, scope, approccio, risultato, limiti e autorizzazione.

### `/insight`

Indice per argomento, autore e data.

### `/insight/:slug`

Contenuto informativo, data revisione, autore e disclaimer.

### `/richiedi-consulenza`

Lead qualification con minimizzazione dati e demo mode.

### `/area-clienti`

Solo external/demo nella v1 BUSINESS. Nessuna auth nativa.

### `/contatti`

Sedi, accessibilità, appuntamenti, canali, disclosure.

### Legal e 404

Route reali, metadata, link footer, nessun redirect silenzioso.

## 5. Navigazione

### START desktop

```text
Competenze
Metodo
Studio
Contatti
Richiedi un confronto
```

### BUSINESS desktop

```text
Competenze
Settori
Studio
Professionisti
Insight
Contatti
Richiedi consulenza
```

`Casi` appare solo con contenuti reali. `Area clienti` appare solo se configurata.

### Mobile

- trigger con label;
- focus trap;
- Escape;
- focus return;
- chiusura su navigazione;
- scroll lock;
- CTA visibile ma non invasiva.

## 6. Configurazione proposta

```ts
type LeadMode = "external" | "email" | "request" | "demo";
type ClientAreaMode = "hidden" | "external" | "demo";

interface ProfessionalDisclosure {
  label: string;
  value: string;
  verified: boolean;
}

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
    certifiedEmail?: string;
  };
  lead: {
    mode: LeadMode;
    externalUrl?: string;
    requestEndpoint?: string;
    demoMode: boolean;
  };
  clientArea: {
    mode: ClientAreaMode;
    externalUrl?: string;
  };
  disclosures: ProfessionalDisclosure[];
  social: SocialLink[];
  seo: {
    siteUrl: string;
    defaultTitle: string;
    defaultDescription: string;
    locale: "it_IT";
  };
}
```

Configurazioni da validare. Nessun valore duplicato.

## 7. Lead request

Campi minimi:

- profilo;
- area;
- obiettivo breve;
- tempistica;
- nome;
- email/telefono;
- consenso.

Vietati nella prima richiesta:

- upload;
- codici fiscali;
- dati sanitari;
- dati giudiziari;
- credenziali;
- documenti;
- descrizioni riservate estese.

## 8. Scroll e focus

- nuova route: top immediato;
- anchor: offset header;
- focus sul main quando appropriato;
- history restoration testata;
- nessun smooth reset;
- nessun flash di contenuto nascosto.

## 9. Metadata e dati strutturati

Ogni route:

- title;
- description;
- canonical;
- Open Graph;
- indexability;
- autore e data per insight.

Structured data solo quando corretti:

- `ProfessionalService`;
- `LegalService`, se realmente pertinente;
- `AccountingService`, se supportato e corretto;
- `Person`;
- `Article`;
- `BreadcrumbList`.

Nessun `aggregateRating` senza dati reali.

## 10. Acceptance criteria

- Nessuna route bianca.
- 404 intercetta slug inesistenti.
- Casi e persone non esistono senza dati reali.
- Il drawer ripristina il focus.
- Il lead form non chiede documenti.
- Demo mode non trasmette dati.
- Route nuove aprono dall'alto.
- Nessun link placeholder punta a servizi reali non approvati.
