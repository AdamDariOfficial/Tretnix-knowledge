# RITO Studio START — Lovable Project Knowledge

## Project identity

Project: `RITO Studio START`
Family: Tretnix Beauty & Wellness v1.1
Plan: START only
Concept status: fictional portfolio demo, not a real business

RITO Studio is a demonstrative Beauty & Care Atelier in Padova with the tagline:

> La bellezza, nel suo ritmo.

The website must feel airy, tactile, elegant, contemporary, intimate and precise. It must not look like a SaaS landing page, a generic AI template, a pink beauty template, a medical clinic or a copy of Forno Lume.

Public-facing work is designed and developed by Tretnix. Do not mention Lovable or other internal tools as creators.

## Canonical references

Follow the repository root `AGENTS.md` and these versioned documents:

```text
docs/PRODUCT.md
docs/DESIGN.md
docs/CONTENT.md
docs/ROUTES.md
docs/ANIMATIONS.md
docs/TESTING.md
docs/DECISIONS.md
```

Use the current approved task after these sources. Do not reinterpret the family from chat history.

## Authorized scope

Build only RITO Studio START:

- premium mobile-first one-page website;
- real routes for `/`, `/privacy`, `/cookie` and 404;
- same-page anchors `#trattamenti`, `#metodo`, `#studio`, `#contatti`;
- configured external/demo booking or contact action;
- static content and local configuration;
- no backend.

START sections, in canonical order:

```text
StickyHeader
Hero
IntroStatement
EditorialServiceList
RitualFeature
MethodStrip
StudioEditorial
GalleryRail
BookingCTA
PracticalInfo
Footer
```

Privacy and cookie pages may use clearly marked placeholders. The demo must not transmit personal data.

## Explicit exclusions

Do not:

- begin RITO Studio BUSINESS or BUSINESS PLUS;
- add treatment-detail routes, team routes, a native booking flow or a management system;
- add Supabase, authentication, database tables, server functions or migrations;
- create contact forms that submit data;
- use real customer data;
- publish, deploy, connect a domain or modify production infrastructure;
- alter the approved product scope, copy system or visual identity;
- install dependencies without a concrete documented need.

A prepared BUSINESS prompt is not authorization to start BUSINESS.

## Target users and conversion

The family serves appointment-based local businesses such as hair salons, barber shops, beauty centres, nail studios, spas, massage and small wellness studios.

START must improve trust, clarity and qualified booking intent. It must explain treatment categories and method without pretending to be a complete booking or management platform.

Primary CTAs:

- `Prenota il tuo rituale`
- `Scopri i trattamenti`
- `Trova il trattamento giusto`
- `Conosci il metodo`

Booking behavior must use configured `demo`, external or contact behavior. Never pretend that a demo action completed a real reservation.

## Demo content

Use only the approved fictional data:

```text
Brand: RITO Studio
Descriptor: Beauty & Care Atelier
Tagline: La bellezza, nel suo ritmo.
Location label: Padova · su appuntamento
Email: ciao@ritostudio.example
Phone: +39 049 000 0000
Hours:
- martedì–venerdì 09:00–19:00
- sabato 09:00–17:00
- domenica–lunedì chiuso
```

Do not invent reviews, ratings, awards, medical claims, guarantees, staff credentials or real addresses.

Voice: calm, precise, concrete, sensory and contemporary. Use short sentences, realistic benefits and process details. Avoid exaggerated luxury, “best version of you”, guaranteed results, therapeutic claims and generic spa clichés.

## Visual identity

Core palette:

```css
--color-canvas: #F6F4EF;
--color-surface: #E8E1D8;
--color-ink: #1B1A18;
--color-muted: #746E67;
--color-accent: #6A3F4B;
```

Typography:

- editorial/display: Newsreader;
- interface/body: Manrope.

Preserve a porcelain, ink and burgundy character with mineral, tactile imagery. Use details of hands, hair, skin, tools, materials and calm interiors without invasive before/after imagery.

Do not copy Hospitality’s terracotta/olive identity, Fraunces/Inter typography or warm convivial composition.

## Layout and responsive behavior

- Mobile-first.
- No unintended horizontal overflow.
- Verify 360px, 390px, 430px, 768px, representative desktop and wide desktop.
- Editorial mobile sections show text before image.
- Hero, gallery and documented visual-first sections may be exceptions.
- Do not duplicate markup solely to change responsive order.
- Use declared image dimensions or stable aspect ratios to prevent layout shift.
- Keep spacing airy and consistent, not mechanically identical between every section.
- Avoid repetitive card grids when an editorial list or composition is more appropriate.

## Header and navigation

The header must support:

- initial and scrolled states;
- sticky behavior without layout shift;
- same-page anchor navigation;
- mobile drawer;
- visible focus;
- `Escape`;
- focus containment and focus return;
- outside click;
- body scroll lock;
- breakpoint changes;
- reduced motion.

New routes open at the top immediately. Same-page anchors may scroll smoothly. Preserve direct URL, refresh, Back and Forward behavior. Do not use fragile timeouts or global scroll overrides.

## Motion language

Motion communicates calm, precision, continuity and tactility.

Tokens:

```css
--motion-duration-fast: 180ms;
--motion-duration-ui: 280ms;
--motion-duration-reveal: 620ms;
--motion-duration-hero: 820ms;
--motion-ease-ui: cubic-bezier(0.2, 0.8, 0.2, 1);
--motion-ease-reveal: cubic-bezier(0.22, 1, 0.36, 1);
```

Use short stagger of 60–80ms with a recommended total no greater than 240ms.

Hero sequence: eyebrow, headline blocks/lines, body and CTA, then a minimal image scale from approximately `1.025` to `1`.

Below-the-fold content reveals only when entering the viewport. Prefer opacity plus approximately 20px vertical movement. Keep structural containers stable. Do not split text into individual letters, add parallax in START or hide content when JavaScript/motion is unavailable.

Respect `prefers-reduced-motion`.

## Components and data

Centralize:

- navigation;
- contact details;
- hours;
- treatment categories;
- CTA labels and destinations;
- route metadata;
- gallery assets;
- booking mode.

Use focused reusable components without turning the project into a generic design system. Do not introduce abstractions or dependencies without a concrete need.

Handle missing assets, loading errors and empty configuration explicitly. Do not silently invent fallback business facts.

## Accessibility

- Semantic landmarks and heading order.
- Real links for navigation and buttons for actions.
- Labels for controls.
- Visible `focus-visible`.
- Adequate touch targets.
- Keyboard support for drawer, FAQ and any custom controls.
- Meaningful alt text; decorative imagery uses empty alt.
- Content remains visible with reduced motion or unavailable animation.

## SEO and demo safety

Every public route in the fictional demo uses `noindex, follow`.

Do not publish fictional `LocalBusiness`, address, geo, telephone, opening hours, prices, offers, reviews, ratings, reservations, `FAQPage` or similar commercial structured data. Use only accurate route-aware title, description, canonical and social metadata where appropriate.

## Footer attribution

Include the discreet attribution:

> Progettato e sviluppato da Tretnix

Link only `Tretnix` to `https://tretnix.com`. Preserve visible keyboard focus. When opening a new tab, use `target="_blank"` and `rel="noopener noreferrer"` and provide accessible context.

## Completion criteria

Before calling START complete:

- all authorized sections and legal routes exist;
- content matches approved demo data and tone;
- mobile and desktop layouts have no unintended overflow;
- route reset, anchors, direct URL, refresh, Back and Forward work;
- header and drawer work by keyboard;
- reduced motion is respected;
- no backend or real-data submission exists;
- no BUSINESS scope was introduced;
- available typecheck, lint, tests and build were actually executed;
- browser QA results and remaining risks are reported.

Do not publish or deploy after validation. Wait for an explicit execution gate.
