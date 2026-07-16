# Forno Lume START — Agent Instructions

These instructions apply to any agent or AI-assisted tool working in this repository.

## Project identity

Forno Lume START is:

- a completed and deployed Hospitality START website;
- the initial canonical visual reference for the Tretnix Hospitality family;
- the source project from which Forno Lume BUSINESS was evolved;
- the pilot repository for the Tretnix controlled development workflow.

Repository:

```text
https://github.com/AdamDariOfficial/forno-lume-START.git
```

Deployment:

```text
https://forno-lume.tretnix.com
```

## Current phase

The first task is a read-only audit.

Unless an approved task explicitly authorizes implementation:

- do not modify source files;
- do not format files;
- do not update dependencies;
- do not change the lockfile;
- do not create migrations;
- do not deploy;
- do not apply fixes.

Non-destructive typecheck, lint, test, build and local browser checks are allowed when configured.

## Visual identity to preserve

The approved identity is warm, elegant, artisanal and premium.

Known visual references include:

- cream, terracotta, olive and muted gold;
- Fraunces for editorial headings;
- Inter for body text and interface;
- refined and restrained motion;
- hospitality-focused imagery and composition.

Exact tokens and implementation must be confirmed from the repository before documentation or extraction.

Do not:

- convert the project into a generic SaaS aesthetic;
- replace its visual personality with Tretnix institutional branding;
- redesign approved sections without a specific requirement;
- remove approved details because a simpler layout is easier to implement.

## Canonical role and limitations

Forno Lume START is the declared visual reference for:

- Hospitality START identity;
- typography;
- palette;
- navbar behavior;
- reveal language;
- interactions;
- responsive quality.

It is not automatically the technical canonical source for every implementation.

Before copying a pattern into BUSINESS or another project:

1. inspect the implementation;
2. verify behavior in the deployment;
3. assess accessibility and responsive behavior;
4. identify technical defects;
5. preserve the approved perceived behavior;
6. improve implementation only through an approved task.

A visual canonical source and a technical canonical source may differ.

## Known Tretnix decisions

### Mobile editorial order

On mobile:

```text
text
image
```

Exceptions:

- hero;
- gallery;
- documented visual-first elements.

Do not duplicate markup only to change order.

### Route and scroll

- New routes open at the top.
- Route reset is immediate, not smooth.
- Preserve direct URL, refresh, browser back and forward behavior.
- Cross-route section links navigate before scrolling.

### Reveals

- Below-the-fold reveals start when entering the viewport.
- Avoid flashes and already-completed reveals.
- Respect `prefers-reduced-motion`.
- Content must remain visible without animation.

### Footer attribution

Include a discreet link:

“Progettato e sviluppato da Tretnix”

to:

```text
https://tretnix.com
```

### START → BUSINESS

Forno Lume BUSINESS must preserve the approved START identity and animation language while expanding routes, content, navigation and functionality.

## Areas that require audit

Inspect without assuming a defect:

- architecture;
- component structure;
- routing;
- scroll behavior;
- navbar hide/show;
- animation architecture;
- responsive behavior;
- horizontal overflow;
- mobile text/image order;
- accessibility;
- TypeScript quality;
- duplication;
- dependencies;
- performance;
- error handling;
- SEO;
- tests;
- build;
- deployment risks;
- preparation for reuse by higher plans.

## Working method

For non-trivial work:

1. read this file;
2. inspect repository structure and scripts;
3. identify affected files and flows;
4. distinguish symptoms from root causes;
5. search for related patterns;
6. state a concise plan;
7. implement only when authorized;
8. review the diff;
9. run available checks;
10. report evidence, results and risks.

## Scope control

Do not:

- modify unrelated functionality;
- change copy without approval;
- redesign unrelated UI;
- install dependencies without need;
- perform speculative cleanup;
- suppress TypeScript errors with unsafe casts;
- change client identity for technical uniformity.

## Responsive and accessibility

When UI is affected, verify:

- 360px;
- 390px;
- 430px;
- 768px;
- desktop;
- keyboard;
- focus;
- reduced motion;
- touch targets;
- overflow;
- fixed and sticky elements.

## Validation

Use repository-defined scripts.

Do not invent commands.

Record each command as:

- executed and passed;
- executed and failed;
- unavailable;
- not executable in the environment;
- manual verification still required.

## Security

- Never expose secrets.
- Never commit `.env` files.
- Never perform destructive database, storage, deployment or DNS actions without explicit approval.
- If Supabase files exist, inspect them but do not assume backend access that is not available.

## Reporting

For every finding or intervention report:

- repository and commit;
- file or area;
- evidence level;
- current behavior;
- expected behavior;
- cause;
- impact;
- severity;
- recommendation;
- regression risk;
- required checks.

Clearly separate confirmed, probable, potential, manual and non-assessable findings.

## Public identity

Public-facing software is designed and developed by Tretnix.

Do not add public references attributing the product to AI tools.
