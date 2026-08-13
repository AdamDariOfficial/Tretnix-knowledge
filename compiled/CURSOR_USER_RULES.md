# Cursor User Rules — Tretnix

Explain findings and plans in Italian.

Use English for:

- code identifiers;
- filenames;
- commit messages;
- technical schemas;
- code comments, unless the repository defines otherwise.

For non-trivial work:

1. inspect relevant files before proposing edits;
2. identify the root cause or architectural impact;
3. search for the same pattern elsewhere;
4. state a concise plan;
5. list expected files;
6. implement the smallest complete change;
7. review the final diff;
8. run available validation commands;
9. report results and unresolved risks.

Always follow the repository’s root `AGENTS.md`, project rules and canonical documentation.

Do not:

- modify unrelated code, copy or design;
- add speculative cleanup;
- redesign working UI without an approved requirement;
- add or update dependencies without justification;
- suppress TypeScript errors with unsafe casts;
- expose, print or commit secrets;
- commit `.env` files;
- perform destructive database operations without explicit approval;
- weaken authorization or RLS to make a frontend flow work;
- push directly to production branches;
- claim that checks passed unless they were executed.

Clearly separate:

- confirmed from source code;
- confirmed by execution;
- probable;
- potential;
- manual verification required;
- not assessable.

When a task involves routing, navigation or UI, consider:

- direct URL;
- refresh;
- browser back and forward;
- scroll behavior;
- mobile widths;
- keyboard accessibility;
- reduced motion;
- console and network errors.

New routes open at the top immediately, while intentional same-page anchors may scroll smoothly. Cross-route section links navigate first and reach the section after mount. Do not disable browser scroll restoration broadly to hide routing defects.

Keep structural layout containers static by default. Animate semantic editorial elements or small meaningful groups, use short stagger only when it improves reading order, and keep content visible with reduced motion. Hero sections, galleries and approved visual-first components may use a distinct documented treatment that preserves the client’s personality.

Agent coordination:

- only one agent writes to the same working tree at a time;
- do not edit files concurrently with Codex, Lovable or Claude Code;
- require a branch, commit or diff checkpoint before handoff;
- start reviews in read-only mode;
- apply only findings explicitly approved by the user.

Public-facing software is designed and developed by Tretnix. Do not add public references that attribute client software to ChatGPT, Lovable, Cursor, Codex, Claude Code or other AI tools.

Client footers include the exact visible attribution “Progettato e sviluppato da Tretnix” linked to `https://tretnix.com`. Only “Tretnix” needs to be linked unless the approved design says otherwise. The discreet but perceivable link opens in a new tab with `target="_blank"` and `rel="noopener noreferrer"`, communicates that behavior accessibly and preserves visible keyboard focus. Decorative external-link icons are hidden from assistive technology.

For public demos that are not real businesses, use `noindex, follow` on every public route and do not publish fictional commercial structured data. Allow only accurate generic `WebSite`, `WebPage`, `AboutPage`, `CollectionPage` and `ContactPage` markup, rendered deterministically and without route duplication.

## Project state and handoff

- Treat `PREPARATION_COMPLETE` and `IMPLEMENTATION_AUTHORIZED` as different states.
- Do not invent a repository, branch, deploy or verification for a planned project.
- Verify explicit gates before actions that consume credits, create remote resources, push, publish, deploy or start a higher plan.
- Keep one writer and create a Git checkpoint before handoff.
- Record decisions, status, tasks and source artifacts in their canonical files before a chat is deleted.
- Report handoff claims as unverified until reconciled with commit, PR or execution evidence.
- For RITO Studio, do not infer a higher-plan authorization from START. Historical START gates remain evidence, while current work follows the explicit plan-specific gate and repository documentation.

## Infrastructure provider boundaries

Choose infrastructure by project fit. Cloudflare, Supabase/PostgreSQL and future dedicated or self-hosted infrastructure are implementation providers, not part of the application/domain contract.

Keep concrete provider-specific SDKs, bindings and runtime types near infrastructure adapters or the composition boundary when that separation solves a real dependency. Do not build speculative multi-cloud layers or alternate-provider adapters without a concrete requirement.

RITO Studio BUSINESS PLUS currently uses Cloudflare for its live/staging architecture. This does not make Cloudflare mandatory for Forno Lume or future Tretnix projects.

## Family kits and historical sources

For prepared verticals, use the versioned files under `family-kits/` and the corresponding root `*_FAMILY.md`. Do not reconstruct design, copy, routes or acceptance criteria from chat memory.

Treat `source-artifacts/**/historical-source-of-truth/` as read-only provenance. Never use it as the current baseline for edits.


## Controlled Change Package

Per modifiche non banali preparate fuori dal checkout verificato, preferisci il pacchetto `Apply` + `Validate`. Controlla SHA, branch, allowlist, hash, diff non staged, file testuali untracked e, dopo lo stage esplicito, `git diff --cached --check`; mantieni commit, push, PR, deploy e migrazioni come passaggi umani separati.

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
