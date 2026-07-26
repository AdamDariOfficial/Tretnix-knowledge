> **PRECONDITION — DO NOT USE BEFORE ACTIVATION**
>
> Use only after subscriptions are active, the correct workspace is recorded, `quadra-studio-START` is ready, and the user explicitly authorizes implementation.

# Lovable Prompt — QUADRA Studio START

## Context

Build the START version of the Tretnix Professional Services family.

Fictional concept:

```text
QUADRA Studio
Consulenza professionale
Chiarezza per decisioni solide.
Padova
```

It is a portfolio demo, not a real professional firm. It must not collect or transmit data.

Read:

```text
docs/PRODUCT.md
docs/DESIGN.md
docs/CONTENT.md
docs/ROUTES.md
docs/ANIMATIONS.md
docs/TESTING.md
docs/DECISIONS.md
```

## Objective

Create a premium, sober, precise, mobile-first one-page site that explains the firm's positioning, competencies and method and guides visitors to a demo first-contact action.

It must not look like a bank, law cliché, consulting slide deck, fintech or SaaS landing page.

## Scope

```text
/
/privacy
/cookie
/note-legali
/404
```

Home:

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

Use the approved Italian copy.

## Architecture

- TypeScript.
- Static frontend.
- Central typed configuration.
- Structured expertise data.
- No backend.
- No Supabase.
- No auth.
- No database.
- No upload.
- No form transmission.
- No portal.
- No CMS.
- No dependencies without need.
- No unrelated updates.

## Visual

Colors:

```text
canvas #F4F1EA
surface #E5E0D6
ink #171A18
muted #626760
accent #24483D
accentStrong #17352D
signal #A37B3E
line #C6C0B5
white #FFFEFA
```

Fonts:

```text
Source Serif 4
IBM Plex Sans
```

Rules:

- grid and editorial alignment;
- rectangular buttons;
- radius 0–4px;
- borders;
- almost no shadows;
- no blue corporate default;
- no glass;
- no gradient;
- no glow;
- no pills;
- no uniform service cards;
- no custom cursor;
- no parallax;
- no counters;
- no autoplay.

## Photography

Use safe placeholders with explicit ratios:

- office architecture;
- work details;
- anonymous materials;
- natural meeting;
- environmental portrait.

Avoid handshake, skyline, scales, gavel, calculators, charts, stock teams and readable documents.

Do not claim licensing.

## Header

- sticky;
- stable;
- border after scroll;
- no hide;
- links: Competenze, Metodo, Studio, Contatti;
- CTA: Richiedi un confronto;
- accessible drawer;
- Escape, focus trap/return, scroll lock.

## Hero copy

- Eyebrow: `Consulenza professionale · Padova`
- Headline: `Le decisioni complesse richiedono un metodo chiaro.`
- Body: `Affianchiamo imprese e professionisti nell'analisi, nella pianificazione e nell'attuazione di scelte che richiedono competenze diverse e responsabilità precise.`
- Primary: `Parliamo del tuo progetto`
- Secondary: `Esplora le competenze`
- Microcopy: `Padova · Incontri su appuntamento`

Desktop 60/40. Mobile order: eyebrow, headline, body, CTA, index, image. Do not center everything.

## Positioning

Use exact copy from `CONTENT.md`.

## Expertise

Editorial numbered rows:

- Strategia e organizzazione
- Operazioni e governance
- Contratti e processi
- Progetti e trasformazione

No prices, metrics or fake outcomes.

## Method

Four phases:

- Inquadramento
- Priorità
- Percorso
- Verifica

Do not use generic boxed cards.

## Scenarios

Show the approved scenario list and the mandatory demo disclaimer. Never label them as real cases.

## Studio and principles

Use the approved copy and four principles:

- Chiarezza
- Responsabilità
- Riservatezza
- Continuità

## CTA

Demo mode only.

Message:

```text
Questa è una demo Tretnix. Nessuna informazione è stata inviata o memorizzata.
```

No form, upload, real email or calendar.

## Practical info

```text
Padova
Incontri su appuntamento
+39 049 000 0000
studio@quadra.example
```

No map.

## Footer

Include demo notice, legal links and:

```text
Progettato e sviluppato da Tretnix
```

linked to `https://tretnix.com`.

No public mention of internal tools.

## Motion

Follow `ANIMATIONS.md`:

- calm;
- reveal in viewport;
- once;
- no content hidden;
- reduced motion;
- no smooth route reset;
- no fintech effects.

## Responsive

Verify design for:

```text
360
390
430
768
desktop
```

No overflow. Text precedes images in editorial mobile sections. No duplicate markup solely for order.

## Accessibility

- one h1;
- headings;
- landmarks;
- focus;
- keyboard;
- drawer;
- contrast;
- alt;
- reduced motion.

## Integrity

Do not create:

- team;
- qualifications;
- cases;
- clients;
- logos;
- ratings;
- certifications;
- awards;
- statistics;
- real address;
- real contact.

## Acceptance criteria

1. Category, audience and CTA are clear.
2. Professional, not bank/SaaS.
3. Competencies use editorial rows.
4. Data centralized.
5. Demo transmits nothing.
6. No fake proof.
7. Works at 360px.
8. No overflow.
9. Drawer accessible.
10. Reveal in viewport.
11. Reduced motion usable.
12. Legal and 404 routes.
13. Attribution.
14. No internal tools public.
15. No backend/dependencies outside scope.

## Verification

Run only scripts that exist. Report exact results for typecheck, lint, tests, build and browser checks. Never claim an unexecuted check.

## Output

- summary;
- files;
- architecture;
- dependencies;
- commands/results;
- browser checks;
- limitations;
- manual checks;
- confirmation of no backend/data transmission.
