> **PRECONDITION — DO NOT USE BEFORE ACTIVATION**
>
> Use this prompt only after the subscriptions are active, the correct Lovable workspace is recorded, `rito-studio-START` is ready for synchronization, and the user has explicitly authorized implementation.

# Lovable Prompt — RITO Studio START

## Context

Build the START version of a new Tretnix Beauty & Wellness family.

The fictional portfolio concept is:

```text
RITO Studio
Beauty & Care Atelier
Tagline: La bellezza, nel suo ritmo.
Location: Padova
```

This is a demonstrative concept, not a real business. It must not submit personal data or link to a real salon.

Read and follow these project documents as the source of truth:

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

Create a production-quality, premium, mobile-first one-page website that presents RITO Studio, explains the treatment categories, communicates its method and leads users toward a configured booking/contact action.

The result must feel airy, tactile, elegant and contemporary. It must not look like a SaaS landing page, a generic AI template, a pink beauty template or a variation of Forno Lume.

## Scope

Implement:

```text
/
/privacy
/cookie
/404
```

Home sections:

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

Use the exact approved Italian copy from `docs/CONTENT.md`.

## Architecture

- Use the existing Lovable default stack unless there is a concrete reason not to.
- Use TypeScript.
- Keep client data in centralized typed configuration.
- Keep services and opening hours in structured data.
- Do not duplicate contact data across components.
- Do not add a backend.
- Do not add authentication.
- Do not add Supabase.
- Do not add an admin panel.
- Do not add a booking engine.
- Do not add dependencies unless required by an approved behavior.
- Do not update unrelated dependencies.
- Keep components focused and understandable.

Suggested structure:

```text
src/
├── components/
│   ├── layout/
│   ├── sections/
│   ├── ui/
│   └── motion/
├── config/
│   └── siteConfig.ts
├── data/
│   └── services.ts
├── pages/
├── hooks/
└── styles/
```

Adapt to the generated stack without forcing unnecessary folders.

## Visual direction

Use these tokens:

```text
canvas: #F6F4EF
surface: #E8E1D8
ink: #1B1A18
muted: #746E67
accent: #6A3F45
accent strong: #4E2E33
line: #CEC6BC
white: #FFFEFB
```

Typography:

```text
Display: Newsreader 400/500, italic 400 only when useful
Body/UI: Manrope 400/500/600
```

Rules:

- Rectangular buttons with 2–4px radius.
- No pill buttons.
- No glassmorphism.
- No gradient text.
- No glow.
- No purple SaaS styling.
- Almost no shadows.
- Avoid uniform card grids.
- Use editorial rows and separators for services.
- Use real whitespace, not empty cards.
- Use asymmetrical layouts.
- Do not use a custom cursor.
- Do not use parallax.
- Do not use autoplay video.
- Do not add decorative hover effects to PracticalInfo.

## Photography

Use high-quality placeholder imagery appropriate to the direction:

- hands and professional gestures;
- hair, skin and material details;
- studio environment;
- tools in use;
- natural skin texture;
- soft, mineral color grading.

Avoid:

- obviously generated hands;
- plastic skin;
- spa stones and leaves as a cliché;
- generic smiling stock portraits;
- floating products;
- repeated near-identical images.

If suitable images cannot be sourced, use stable local placeholders with explicit aspect ratios and document that final photography is pending. Do not make unsupported claims about image licensing.

## Header

- Sticky, stable header.
- Do not hide it on scroll.
- Solid canvas surface.
- Add a subtle bottom border after scrolling.
- Desktop links: Trattamenti, Metodo, Studio, Contatti.
- Primary CTA: Prenota.
- Mobile drawer must support keyboard, Escape, focus trap and focus return.
- Lock body scrolling without causing layout shift.

## Hero

Desktop:

- asymmetrical 55/45 composition;
- text on the left;
- vertical image on the right;
- eyebrow;
- large headline;
- short body;
- primary and secondary CTA;
- microcopy “Padova · Solo su appuntamento”.

Mobile order:

```text
eyebrow
headline
body
CTA
image
microcopy
```

Do not center the entire hero.

## Booking behavior

This START build uses demo mode.

- The main CTA may scroll to the contact section or open a small contact-choice panel.
- It must not send data.
- It must not open a real WhatsApp number.
- It must not link to a real booking platform.
- When a demonstrative action is triggered, show clear feedback:

```text
Questa è una demo Tretnix. Nessun dato è stato inviato.
```

## Motion

Use the tokens and rules from `docs/ANIMATIONS.md`.

Required behavior:

- Hero entrance is calm and short.
- Below-the-fold reveals start when entering the viewport.
- Reveal once by default.
- No content may remain invisible.
- Respect `prefers-reduced-motion`.
- Use transform and opacity.
- Do not use smooth scroll for route changes.
- Internal anchor scrolling may be controlled and must account for the header.

## Responsive

Mobile-first.

Verify the implementation design for:

```text
360px
390px
430px
768px
desktop
```

Rules:

- no horizontal overflow;
- no clipped content;
- adequate touch targets;
- text precedes images in editorial mobile sections;
- hero is the documented exception only in visual emphasis, not content order;
- no duplicated markup only to change order;
- images preserve aspect ratio;
- fixed or sticky UI does not cover content.

## Accessibility

- One main h1.
- Correct heading hierarchy.
- Semantic landmarks.
- Visible focus.
- Buttons and links used correctly.
- Accessible drawer.
- Meaningful alt text or empty alt for decorative images.
- Sufficient contrast.
- Reduced motion.
- Keyboard access to all interactions.
- No text embedded only in images.

## Public/demo integrity

- Add a discreet footer line:

```text
Concept dimostrativo Tretnix — nessun servizio reale.
```

- Add:

```text
Progettato e sviluppato da Tretnix
```

linked to:

```text
https://tretnix.com
```

- Do not mention Lovable, ChatGPT, Codex or other internal tools publicly.
- Do not create reviews, ratings, certifications, awards or customer counts.
- Do not use real addresses or real contact details.
- Use the `.example` email from the content document.
- Legal pages are placeholders and must state that final client-specific legal review is required.

## Constraints

Do not:

- redesign the approved direction;
- change the copy without a concrete layout reason;
- add features outside START scope;
- add a database;
- add forms that transmit data;
- add booking slots;
- add pricing cards;
- add testimonial sliders;
- add a custom cursor;
- add automatic carousels;
- add heavy parallax;
- use the same layout rhythm for every section;
- make unrelated changes.

## Acceptance criteria

1. The first viewport clearly communicates service category, location and booking action.
2. The website feels premium Beauty & Wellness, not Hospitality or SaaS.
3. Services are not shown as a generic equal-card grid.
4. All repeated client data is centralized.
5. Demo actions do not transmit data.
6. There are no invented reviews or metrics.
7. The mobile experience is complete at 360px.
8. There is no unintended horizontal overflow.
9. The navigation and drawer are keyboard accessible.
10. Below-the-fold reveals trigger in the viewport.
11. Reduced motion leaves all content immediately usable.
12. Privacy, cookie and 404 routes exist.
13. The Tretnix attribution is present and discreet.
14. The public UI does not mention internal production tools.
15. No unapproved backend or dependency is introduced.

## Required verification

Run only scripts that actually exist.

Report separately:

```text
typecheck
lint
test
build
```

For each, state:

- executed or not available;
- command;
- result;
- errors.

Also perform and report:

- 360, 390, 430, 768 and desktop review;
- overflow;
- keyboard and focus;
- reduced motion;
- direct URL;
- refresh;
- browser back/forward where applicable;
- console;
- network;
- image layout shift;
- legal routes;
- 404;
- metadata;
- Tretnix attribution.

Do not claim a check passed unless it was executed.

## Required output

Return:

1. concise implementation summary;
2. files created or modified;
3. architecture decisions;
4. dependencies added, with justification;
5. commands executed and exact results;
6. browser checks executed;
7. known limitations;
8. manual checks still required;
9. confirmation that no backend or real data submission was introduced.
