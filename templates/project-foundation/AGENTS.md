# Tretnix Project Agent Instructions

These instructions apply to Codex, Cursor Agent, Lovable, Claude Code and any other agent working in this repository.

## Read first

Before non-trivial work:

1. read this file;
2. inspect the repository structure;
3. read relevant project documentation;
4. read the approved task;
5. inspect the implementation before proposing changes.

Do not assume that missing documentation is permission to redesign or restructure the project.

## Source precedence

When guidance conflicts, use:

1. approved decisions;
2. shared Tretnix development standards;
3. project-specific documentation;
4. the approved current task;
5. behavior confirmed in code and deployment;
6. assumptions or past conversations that still need formalization.

## Agent coordination

- Only one writer may modify the same working tree at a time.
- Do not edit concurrently with another agent or Lovable.
- Work on a dedicated branch, not `main`.
- Require a branch, commit or diff checkpoint before handoff.
- A reviewer starts in read-only mode.
- Do not apply review findings until the user approves them.
- Preserve published Lovable-connected history.

## Working method

For non-trivial changes:

1. identify the real objective;
2. trace the affected behavior and data flow;
3. distinguish symptoms from root causes;
4. search for related implementations;
5. evaluate regressions;
6. state a concise plan;
7. list expected files;
8. implement the smallest complete approved solution;
9. review the final diff;
10. run available checks;
11. report results and remaining risks.

## Scope control

Do not:

- modify unrelated functionality;
- rewrite working architecture without justification;
- change unrelated copy;
- redesign unrelated UI;
- install or update dependencies without need;
- modify generated files manually without reason;
- perform speculative cleanup;
- silently change established behavior.

Preserve intentional client-specific identity:

- palette;
- typography;
- tone;
- composition;
- photography;
- visual personality.

## TypeScript and architecture

- Preserve strict type safety where supported.
- Avoid `any` and unsafe casts.
- Validate untrusted external data.
- Handle loading, error and empty states explicitly.
- Keep components focused.
- Avoid duplicated business logic.
- Centralize repeated configuration.
- Follow repository patterns unless they are the subject of the approved task.

## Responsive and accessibility

- Work mobile-first.
- Prevent unintended horizontal overflow.
- Verify 360px, 390px, 430px, 768px and desktop when UI is affected.
- In editorial mobile sections, text precedes the image.
- Hero sections, galleries and documented visual-first sections may be exceptions.
- Do not duplicate markup only to change responsive order.
- Preserve semantic structure, keyboard access and visible focus.
- Respect `prefers-reduced-motion`.

## Routing, scroll and animation

- New routes open at the top without smooth scrolling.
- Preserve direct URL, refresh, back and forward behavior.
- Cross-route section links navigate before scrolling.
- Below-the-fold reveals start when entering the viewport.
- Avoid flashes, jumps and layout shift.
- Preserve approved animation language between related project tiers.

## Security

- Never expose or print secrets.
- Never commit `.env` files.
- Never place service-role keys in client code.
- Client-side guards are not authorization controls.
- Do not weaken RLS to hide a frontend error.
- Use versioned migrations.
- Do not perform destructive database, storage, deployment or DNS actions without explicit approval.
- Cloud agents receive only the minimum credentials and network access required.

## Validation

Use repository-defined commands.

When available, run:

- typecheck;
- lint;
- tests;
- build.

Do not invent missing commands or claim success without execution.

For relevant flows verify:

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

## Reporting

Report:

1. objective;
2. confirmed cause or architectural impact;
3. implementation;
4. files changed;
5. commands and checks actually executed;
6. results;
7. unavailable checks;
8. unresolved issues;
9. regression risk;
10. manual tests still required;
11. final Git status.

Clearly distinguish confirmed findings, probable findings, potential risks and non-assessable areas.

## Tretnix public identity

Public-facing software is designed and developed by Tretnix.

Do not add public references attributing the product to internal tools.

Client projects include a discreet footer attribution:

“Progettato e sviluppato da Tretnix”

linked to:

```text
https://tretnix.com
```
