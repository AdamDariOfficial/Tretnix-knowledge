<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# Forno Lume START — Agent Instructions

These instructions apply to Codex, Cursor Agent, Lovable, Claude Code and any other agent working in this repository.

## Project identity

Forno Lume START is:

- a completed and deployed Hospitality START website;
- the initial canonical visual reference for the Tretnix Hospitality family;
- the source project from which Forno Lume BUSINESS evolved;
- the pilot repository for the Tretnix controlled development workflow.

Repository:

```text
https://github.com/AdamDariOfficial/forno-lume-START.git
```

Deployment:

```text
https://forno-lume.tretnix.com
```

## Verified project state

Confirmed as of 17 July 2026:

- the agent foundation is merged into `main`;
- a static read-only audit was completed at commit `39d58126abb2fa9b63070e047db06c8027aaef6f`;
- the audit received an independent quality-control pass;
- no remediation has yet been approved or implemented;
- build, lint, typecheck and interactive browser verification are still required.

Implementation requires an explicit approved task.

## Source precedence

When guidance conflicts, use:

1. approved decisions;
2. shared Tretnix development standards;
3. project-specific documentation;
4. the approved current task;
5. behavior confirmed in code and deployment;
6. assumptions or past conversations that still need formalization.

## Agent coordination

- Only one writer may modify this working tree at a time.
- Do not edit concurrently with Lovable, Cursor Agent, Codex or Claude Code.
- Work on a dedicated branch, not `main`.
- Require a commit, branch or diff checkpoint before handoff.
- A reviewer starts in read-only mode.
- Do not apply review findings until approved.
- Never rewrite published Lovable-connected history.

## Visual identity to preserve

The approved identity is warm, elegant, artisanal and premium.

Known references include:

- cream, terracotta, olive and muted gold;
- Fraunces for editorial headings;
- Inter for body text and interface;
- refined and restrained motion;
- hospitality-focused imagery and composition.

Exact tokens and implementation must be confirmed from the repository before extraction.

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
- navbar perceived behavior;
- reveal language;
- interactions;
- responsive quality.

It is not automatically the technical canonical source for every implementation.

Before copying a pattern:

1. inspect the implementation;
2. verify behavior in deployment;
3. assess accessibility and responsive behavior;
4. identify technical defects;
5. preserve the approved perceived behavior;
6. improve implementation only through an approved task.

## Approved Tretnix decisions

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
- Preserve direct URL, refresh, browser back and forward.
- Cross-route section links navigate before scrolling.

### Reveals

- Below-the-fold reveals start when entering the viewport.
- Avoid flashes and already-completed reveals.
- Respect `prefers-reduced-motion`.
- Content remains visible without animation.

### Footer attribution

Include a discreet link:

“Progettato e sviluppato da Tretnix”

to:

```text
https://tretnix.com
```

### START → BUSINESS

Forno Lume BUSINESS preserves the approved START identity and motion language while expanding routes, content, navigation and functionality.

## Current approved backlog source

The authoritative remediation scope must come from an approved task based on the quality-controlled audit.

Known priority candidates are:

- footer attribution;
- mobile order in `AboutSection`;
- hidden navbar semantics and focus;
- mobile drawer keyboard behavior;
- FAQ reduced motion.

This list is context, not permission to modify all items together.

## Working method

For non-trivial work:

1. read this file;
2. inspect repository structure and scripts;
3. identify affected files and flows;
4. distinguish symptoms from root causes;
5. search for related patterns;
6. state a concise plan;
7. implement only the approved scope;
8. review the diff;
9. run available checks;
10. report evidence, results and risks.

## Scope control

Do not:

- modify unrelated functionality;
- change copy without approval;
- redesign unrelated UI;
- install or update dependencies without a concrete need;
- perform speculative cleanup;
- suppress TypeScript errors with unsafe casts;
- change client identity for technical uniformity;
- deploy or push unless explicitly requested.

## Responsive and accessibility

When UI is affected, verify:

- 360px;
- 390px;
- 430px;
- 768px;
- desktop;
- keyboard;
- visible focus;
- reduced motion;
- touch targets;
- overflow;
- fixed and sticky elements.

## Security

- Never expose secrets.
- Never commit `.env` files.
- Never place service-role keys in client code.
- Client-side guards are not authorization controls.
- Never weaken authorization or RLS to hide a frontend error.
- Use versioned migrations.
- Do not perform destructive database, storage, deployment or DNS actions without explicit approval.

## Validation

Use repository-defined scripts.

Do not invent commands.

Record each command as:

- executed and passed;
- executed and failed;
- unavailable;
- not executable in the environment;
- manual verification required.

For relevant flows consider:

- direct URL;
- refresh;
- browser back and forward;
- responsive widths;
- keyboard;
- reduced motion;
- console;
- network.

## Reporting

For every finding or intervention report include:

- repository and commit;
- file or area;
- evidence level;
- current behavior;
- expected behavior;
- confirmed or probable cause;
- impact;
- severity;
- recommendation;
- regression risk;
- required checks.

Clearly separate:

- confirmed from source code;
- confirmed by execution;
- confirmed in deployment;
- probable;
- potential;
- manual verification required;
- not assessable.

## Public identity

Public-facing software is designed and developed by Tretnix.

Do not add public references attributing the product to internal tools.
