# NODO Servizi — Routes and Information Architecture

**Famiglia:** Home & Local Services  
**Versione:** 1.0  
**Stato:** approvato come baseline di preparazione

## 1. Principi

- Mobile-first.
- Nuove route dall'alto, reset immediato.
- Nessuno smooth scroll al cambio route.
- Direct URL, refresh, back e forward.
- 404 reale.
- Servizi, aree e CTA centralizzati.
- Nessun preventivo automatico.
- Nessun upload v1.
- Route e claim condizionati ai dati reali.

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
#servizi
#metodo
#lavori
#area
#contatti
```

## Home

```text
1. StickyHeader
2. Hero
3. PositioningStatement
4. ServiceIndex
5. ProcessSteps
6. TrustRegister
7. ProjectScenarios
8. CoverageSection
9. QuoteCTA
10. PracticalInfo
11. Footer
```

## Regole

- demo mode;
- niente form reale;
- niente upload;
- niente telefono/WhatsApp reali;
- lavori demo dichiarati;
- niente mappa;
- niente emergency badge.

## 3. BUSINESS

## Route principali

```text
/
/servizi
/servizi/:slug
/settori
/settori/:slug
/lavori
/lavori/:slug
/azienda
/aree-servite
/richiedi-preventivo
/faq
/contatti
/privacy
/cookie
/note-legali
/*
```

## Route opzionali

```text
/pronto-intervento
/manutenzione-programmata
/area-clienti
```

Solo con servizio reale e approvato.

## 4. Responsabilità

### `/servizi`

Indice, categorie, problemi e CTA.

### `/servizi/:slug`

Scope, inclusioni, esclusioni, sopralluogo, qualifiche, tempi, lavori.

### `/settori`

Tipologie cliente/immobile reali.

### `/lavori`

Progetti autorizzati, filtri, contesto.

### `/lavori/:slug`

Scope, vincoli, risultato, immagini, privacy.

### `/azienda`

Storia, team, metodo, sicurezza, qualifiche.

### `/aree-servite`

Comuni, province, condizioni, trasferte. Testo e liste; mappa solo se utile e corretta.

### `/richiedi-preventivo`

Lead qualification senza upload nella v1.

### `/pronto-intervento`

Solo se vero: orari, area, condizioni, limiti e CTA.

### `/area-clienti`

Hidden/external/demo nella BUSINESS v1.

## 5. Navigazione

### START

```text
Servizi
Metodo
Lavori
Area
Contatti
Richiedi un sopralluogo
```

### BUSINESS

```text
Servizi
Settori
Lavori
Azienda
Aree servite
FAQ
Contatti
Richiedi preventivo
```

Pronto intervento solo se reale.

### Mobile

- label;
- focus trap;
- Escape;
- focus return;
- chiusura;
- scroll lock;
- CTA non invasiva.

## 6. Configurazione

```ts
type LeadMode = "call" | "whatsapp" | "external" | "request" | "demo";
type EmergencyMode = "disabled" | "call" | "external";

interface CoverageArea {
  name: string;
  type: "city" | "province" | "radius" | "custom";
  conditions?: string;
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
    whatsapp?: string;
  };
  lead: {
    mode: LeadMode;
    externalUrl?: string;
    endpoint?: string;
    demoMode: boolean;
  };
  emergency: {
    mode: EmergencyMode;
    hours?: string;
    conditions?: string;
  };
  coverage: CoverageArea[];
  qualifications: VerifiedClaim[];
  seo: {
    siteUrl: string;
    defaultTitle: string;
    defaultDescription: string;
    locale: "it_IT";
  };
}
```

## 7. Richiesta

Campi minimi:

- servizio;
- contesto;
- zona;
- problema/obiettivo;
- tempistica;
- contatto;
- consenso.

Non chiedere:

- documenti;
- dati sensibili;
- pagamento;
- foto v1;
- dati catastali;
- credenziali;
- descrizioni pericolose estese.

## 8. Scroll/focus

- top immediato;
- anchor con offset;
- main focus appropriato;
- history verificata;
- niente smooth route reset.

## 9. SEO e structured data

- LocalBusiness subtype appropriato;
- HomeAndConstructionBusiness o subtype solo se corretto;
- Service;
- Person;
- Article;
- BreadcrumbList.

Nessun rating senza dati reali. Aree servite coerenti.

## 10. Acceptance criteria

- Nessuna route bianca.
- Slug invalidi → 404.
- Richiesta demo non trasmette.
- Lavori/certificazioni condizionali.
- Area coerente.
- Drawer accessibile.
- Nuove route dall'alto.
- Nessun link demo reale.
