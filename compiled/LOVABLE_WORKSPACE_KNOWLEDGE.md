# Tretnix Workspace Knowledge

## Company identity

Tretnix is a boutique software studio creating websites, web applications, management systems, dashboards, CRM systems, automations and custom software.

Tretnix products must feel premium, elegant, minimal, professional, trustworthy, clear and tailored.

Do not use public-facing wording that presents AI tools as the creators or developers of the product. Client-facing software is designed and developed by Tretnix.

Do not impose Tretnix’s institutional visual identity on every client. Preserve each client’s intentional palette, typography, tone, composition, photography and personality.

## Working method

Before non-trivial changes:

1. inspect relevant code, components, hooks, providers, utilities and configuration;
2. identify the root cause or architectural impact;
3. search for the same pattern elsewhere;
4. define the smallest complete solution;
5. avoid unrelated cleanup, copy changes or redesigns.

After changes:

1. review the diff;
2. run available validation commands;
3. verify affected behavior in the browser;
4. report changed files, checks, results and remaining risks.

Never claim that typecheck, lint, tests, build, browser, deployment or migration checks passed unless they were actually executed.

### Source hierarchy

Before working, inspect the repository root `AGENTS.md`, project documentation and current code.

Use this precedence when instructions conflict:

1. approved decisions;
2. shared Tretnix standards;
3. project-specific documentation and `AGENTS.md`;
4. approved current task;
5. behavior verified in code and deployment;
6. previous chat context still requiring formalization.

Do not treat an earlier chat, generated prompt or draft as an approved permanent decision.

## TypeScript and code quality

- Use TypeScript and preserve strict type safety where supported.
- Avoid `any`, unsafe casts and error suppression.
- Validate untrusted external data.
- Handle `null`, `undefined`, loading, error and empty states explicitly.
- Keep components focused; centralize repeated configuration and business information.
- Avoid duplicated business logic.
- Do not add dependencies or update unrelated lockfiles without a concrete need.
- Do not modify generated files manually unless necessary and documented.

## Responsive and accessibility

- Build mobile-first and prevent unintended horizontal overflow.
- Verify at least 360px, 390px, 430px, 768px and desktop.
- Ensure adequate touch targets and visible keyboard focus.
- Use semantic headings, landmarks, links, buttons and labels.
- Support keyboard interaction for drawers, dialogs, lightboxes, FAQ and custom controls.
- Respect `prefers-reduced-motion`.
- In editorial mobile sections, show text before the image. Hero, gallery and documented visual-first components are exceptions.
- Do not duplicate markup only to change responsive order.

## Routing and scroll

- New routes open at the top with an immediate reset, never smooth.
- Same-page anchors may use controlled smooth scrolling.
- Preserve direct URL, refresh, browser Back and Forward.
- For cross-route section links, navigate first and scroll only after the destination is mounted.
- Do not use fragile timing, unexplained hard-coded offsets or broad scroll-restoration overrides.

## Navbar

Verify initial state, hide/show behavior, mobile drawer, active route, scroll-spy, cross-route links, keyboard focus, Escape, body scroll lock and reduced motion. Avoid flashes, jumps and layout shift.

## Animation

- Motion must feel refined, restrained and consistent.
- Animate semantic editorial elements or small meaningful groups, not large structural containers.
- Below-the-fold reveals start only when entering the viewport.
- Use short controlled stagger only when it improves reading order.
- Avoid flashing already-animated content during route changes.
- Keep content visible when motion is reduced or unavailable.
- Preserve the approved perceived motion language between related plans without copying another family’s visual identity.

## Security and backend providers

Choose the backend/provider by project fit. Cloudflare, Supabase/PostgreSQL and future dedicated or self-hosted infrastructure are internal implementation choices, not product identity.

Keep concrete provider-specific bindings and SDKs at infrastructure/composition boundaries when the project architecture requires it. Do not create speculative multi-provider layers or switch providers without an approved task.

RITO Studio BUSINESS PLUS currently uses Cloudflare for its live/staging architecture. This does not establish Cloudflare as the default for other Tretnix projects.

When Supabase is used:

- Never expose secrets, commit `.env`, or put service-role keys in client code.
- Client-side role checks are not security controls.
- Validate authorization on the backend and review RLS for protected and client-accessible data.
- Do not weaken RLS to hide frontend errors.
- Apply schema changes through versioned migrations.
- Review `SECURITY DEFINER`, `search_path`, parameters, privileges, buckets and `storage.objects` policies.
- Do not break intentionally public media in anonymous or incognito sessions.
- Do not perform destructive database operations without explicit approval.

## Testing and completion

Use only scripts present in the repository. When available, run typecheck, lint, tests and build.

For affected flows verify happy path, invalid input, loading, error, empty state, direct URL, refresh, Back/Forward, responsive behavior, keyboard, reduced motion, console errors and network errors.

## Git and scope

- Keep `main` deployable and use focused branches and commits.
- Do not let Lovable and another editor modify overlapping files concurrently.
- Before handoff, sync to GitHub and provide a branch or commit checkpoint.
- A technical reviewer starts read-only and does not overwrite Lovable output automatically.
- Do not change unrelated code, copy or design.
- Do not perform deployment, DNS, production database or destructive operations without explicit approval.

## Controlled changes

For non-trivial changes prepared outside the canonical working tree, use:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\Apply-<TaskName>.ps1
.\Validate-<TaskName>.ps1
```

The package verifies repository, remote, branch, commit, working tree, allowlist and hashes; applies only approved files; supports safe idempotent resume; preserves logs and exit codes; checks staged, unstaged and untracked whitespace; and separates automated checks from browser, backend, staging and production gates.

Successful validation does not authorize commit, push, migration or deploy. Manual diff review and explicit approval remain required.

## Lovable authorization boundaries

- Do not consume credits for exploratory or unrelated work.
- Do not publish, deploy, connect a production domain or modify production infrastructure without explicit authorization.
- Do not create or apply database migrations without an approved task and execution gate.
- Do not begin excluded plans or future variants unless Project Knowledge explicitly authorizes them.
- Preserve repository documentation and root `AGENTS.md`.
- Stop before editing overlapping files being changed by another writer.

## Footer attribution

Every Tretnix client project includes:

“Progettato e sviluppato da Tretnix”

linked to `https://tretnix.com`.

Only “Tretnix” normally needs to be linked. The link is discreet but perceivable, preserves visible keyboard focus and opens in a new tab with `target="_blank"` and `rel="noopener noreferrer"` when approved by the project design.

## Demo indexing

A public fictional demo uses `noindex, follow` on every public route, including legal pages and 404. Do not publish fictional local-business structured data such as address, geo, telephone, hours, prices, offers, reviews, ratings, reservations, `FAQPage`, `Menu` or similar commercial entities. Generic route-aware page metadata is allowed when accurate.

## Project-specific knowledge

Workspace Knowledge contains only shared rules.

Project Knowledge defines purpose, target users, plan, routes, architecture, database, visual identity, motion, constraints, relation to other projects and canonical references.

When a project-specific rule intentionally differs from a workspace default, follow the more specific documented rule.

The presence of a prepared prompt does not authorize execution. RITO START, BUSINESS and BUSINESS PLUS use separate plan-specific gates; historical START activation text does not block a later plan that has been explicitly authorized.

## UX/UI quality

For user-facing work, treat `UX_UI_QUALITY_SYSTEM.md` as the shared Tretnix UX/UI quality contract when available.

Before calling UI work complete:

- preserve the approved project and family identity;
- use intentional spacing, typography, color, radius and elevation systems;
- prefer semantic tokens for repeated functional meaning;
- keep equivalent components and applicable states consistent;
- distinguish functional correctness from design-system consistency and visual craft;
- review full-page rhythm, alignment and repeated patterns when the surface extends beyond one viewport;
- evaluate Tretnix AI-slop signals contextually rather than applying generic SaaS aesthetics;
- respect mobile-first, accessibility and reduced motion;
- do not claim visual polish passed without the required visual QA.

External UI reviewers are advisory evidence sources, not the source of truth.
