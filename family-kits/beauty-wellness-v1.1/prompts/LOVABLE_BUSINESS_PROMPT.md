# Lovable Prompt — RITO Studio BUSINESS

> **PRECONDITION**
>
> Do not run this prompt until RITO Studio START has passed QA, has a recorded canonical commit SHA and tag, and `docs/START_BUSINESS_CONTRACT.md` has been completed.

## Context

RITO Studio BUSINESS is the multipage evolution of the approved RITO Studio START project.

Canonical START source:

```text
repository: [REQUIRED]
commit SHA: [REQUIRED]
tag: family-start-v1.0
freeze report: [REQUIRED]
```

Read and follow all repository documentation. START is the visual source of truth. BUSINESS must add depth, routes, content and booking structure without redesigning the family.

## Objective

Expand the canonical START into a coherent multipage Beauty & Wellness website with treatment discovery, treatment details, studio, team, gallery, FAQ, contact and configurable booking.

## Preserve exactly unless a documented technical correction is required

- palette;
- fonts and weights;
- type scale;
- spacing rhythm;
- image treatment;
- button shapes and states;
- navbar and mobile drawer language;
- footer;
- hero personality;
- motion tokens;
- reveal and hover behavior;
- reduced motion;
- tone;
- mobile editorial order;
- Tretnix attribution.

Do not add glassmorphism, gradient text, pills, SaaS cards, custom cursor, parallax or a new visual theme.

## Routes

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
404
```

Do not add journal, gift cards, account or admin in this version.

## Content and data

Use structured, typed data for:

- treatment categories;
- treatments;
- team;
- gallery;
- FAQ;
- contact and hours;
- booking mode;
- SEO metadata.

Treatment detail fields:

```text
name
slug
category
shortDescription
fullDescription
duration
priceLabel
idealFor
includes
beforeAppointment
afterAppointment
contraindicationsNote
bookingMode
relatedServices
seoTitle
seoDescription
```

Do not invent medical claims, prices, certifications or reviews.

## Booking adapter

Support one configured mode:

```text
external
whatsapp
request
demo
```

For this portfolio implementation default to `demo` unless the approved task explicitly selects another mode.

`request` is a request to be confirmed, not live availability. If request mode is implemented for a real client, backend validation, anti-spam, rate limiting, privacy, retention and least privilege are required. Do not weaken RLS or rely on frontend-only security.

## Required route behavior

- new routes start at the top immediately;
- no smooth route reset;
- direct URL and refresh work;
- back and forward work;
- unknown treatment slugs produce an appropriate 404 state;
- anchor and focus behavior remain accessible;
- below-the-fold reveals trigger in the viewport;
- reduced motion keeps all content visible.

## Gallery and lightbox

- categories: Studio, Hair, Skin, Hands, Rituals;
- keyboard controls;
- Escape;
- focus trap and focus return;
- mobile `100dvh`;
- stable image dimensions;
- no autoplay.

## Acceptance criteria

1. BUSINESS is recognizably the same family as START with logo hidden.
2. BUSINESS adds information architecture, not decorative noise.
3. Every treatment is discoverable and has a valid detail route.
4. Booking behavior is honest and matches the configured adapter.
5. No backend is added in demo mode.
6. All routes support direct URL, refresh, back and forward.
7. Mobile 360px has no unintended overflow.
8. Keyboard and reduced motion behavior are complete.
9. Metadata is route-specific.
10. Tretnix attribution is preserved.

## Required verification and output

Run only existing commands. Report exact results for typecheck, lint, tests and build. Report browser checks actually executed, files modified, dependencies, limitations, regressions and remaining manual checks.

Do not claim parity or successful checks without evidence.
