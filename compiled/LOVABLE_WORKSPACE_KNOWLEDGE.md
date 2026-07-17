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
3. verify the affected behavior in the browser;
4. report changed files, checks performed, results and remaining risks.

Never claim that typecheck, lint, tests, build or browser checks passed unless they were actually executed.

## TypeScript and code quality

- Use TypeScript.
- Preserve strict type safety where supported.
- Avoid `any`.
- Do not suppress errors with unsafe casts.
- Validate untrusted external data.
- Handle `null`, `undefined`, loading, error and empty states explicitly.
- Keep components focused and reusable.
- Avoid duplicated business logic.
- Centralize repeated configuration and business information.
- Do not add dependencies without a concrete need.
- Do not update unrelated dependencies or lockfiles.
- Do not modify generated files manually unless necessary and documented.

## Responsive and accessibility

- Build mobile-first.
- Prevent unintended horizontal overflow.
- Verify at least 360px, 390px, 430px, 768px and desktop.
- Ensure adequate touch targets.
- Preserve visible keyboard focus.
- Use semantic headings, landmarks, links, buttons and form labels.
- Support keyboard interaction for drawers, dialogs, lightboxes, FAQ and custom controls.
- Respect `prefers-reduced-motion`.

In editorial sections on mobile, show text before the image.

Exceptions:

- hero sections;
- galleries;
- documented visual-first components.

Do not duplicate markup only to change responsive order.

## Routing and scroll

- New routes open at the top.
- Route reset is immediate, never smooth.
- Preserve direct URL, refresh, browser back and browser forward behavior.
- For cross-route section links, navigate first and scroll only after the destination is mounted.
- Do not introduce fragile timing or hard-coded offsets.
- Do not apply a global scroll reset that breaks correct history restoration.

## Navbar

Verify:

- initial state;
- hide/show behavior;
- mobile drawer;
- active route;
- scroll-spy;
- cross-route links;
- focus;
- Escape handling;
- body scroll lock;
- reduced motion.

Avoid flashes, jumps and layout shift.

## Animation

- Animations must feel refined, restrained and consistent.
- Below-the-fold reveals start only when entering the viewport.
- Avoid flashing already-animated content during route changes.
- Keep content visible when motion is reduced or unavailable.
- Preserve the approved animation language between related START, BUSINESS and BUSINESS PLUS projects.
- Technical improvements may change implementation but must preserve the approved perceived behavior.

## Security and Supabase

- Never expose secrets.
- Never commit `.env` files.
- Never put service-role keys in client code.
- Client-side role checks are not security controls.
- Validate authorization on the backend.
- Review RLS for protected and client-accessible data.
- Do not weaken RLS merely to remove a frontend error.
- Apply schema changes through versioned migrations.
- Review `SECURITY DEFINER` functions, `search_path`, parameters and privileges.
- Review storage bucket visibility and `storage.objects` policies.
- Do not tighten storage policies in a way that breaks intentionally public media in anonymous or incognito sessions.
- Do not perform destructive database operations without explicit approval.

## Testing and completion

Use existing repository commands. When available, run:

- typecheck;
- lint;
- tests;
- build.

Do not invent missing scripts.

For affected flows verify:

- happy path;
- invalid input;
- loading;
- error;
- empty state;
- direct URL;
- refresh;
- back and forward;
- responsive;
- keyboard;
- reduced motion;
- console and network errors.

## Git and scope

- Keep `main` deployable.
- Use focused branches and commits for manual development.
- Do not work on the same files concurrently from Lovable, Codex, Cursor Agent, Claude Code or another editor.
- Before handoff, sync to GitHub and provide a branch or commit checkpoint.
- A technical reviewer starts in read-only mode and does not overwrite Lovable output automatically.
- Do not change unrelated code, copy or design.
- Do not perform deployment, DNS, production database or destructive operations without explicit approval.

## Footer attribution

Every Tretnix client project includes a discreet footer attribution:

“Progettato e sviluppato da Tretnix”

linked to:

https://tretnix.com

## Project-specific knowledge

Workspace knowledge contains only rules shared across projects.

Project Knowledge must define the specific project’s:

- purpose;
- target users;
- plan;
- routes;
- architecture;
- database;
- visual identity;
- approved animations;
- project-specific constraints;
- relation to other projects;
- current canonical references.

When project-specific knowledge intentionally differs from a workspace default, follow the more specific documented project rule.
