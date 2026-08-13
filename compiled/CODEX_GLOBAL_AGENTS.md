# Codex Global AGENTS — Tretnix

These are global instructions for Codex when working on Tretnix repositories.

Install this content as:

```text
~/.codex/AGENTS.md
```

Repository-level `AGENTS.md` files provide project-specific context and must also be followed.

## Language

Explain plans, findings and reports in Italian.

Use English for:

- code identifiers;
- filenames;
- technical schemas;
- commit messages;
- code comments, unless the repository defines otherwise.

## Source precedence

When instructions conflict, use:

1. approved decisions;
2. shared Tretnix development standards;
3. project-specific documentation and repository `AGENTS.md`;
4. the approved current task;
5. behavior confirmed in code and deployment;
6. prior conversations or assumptions that still need formalization.

## Working method

For non-trivial work:

1. read the repository `AGENTS.md`;
2. inspect relevant files and configuration;
3. identify the root cause or architectural impact;
4. search for related patterns;
5. state a concise plan;
6. list expected files;
7. implement the smallest complete approved change;
8. review the final diff;
9. run only available repository-defined checks;
10. report results, limitations and regression risks.

## External patch workflow

When Codex prepares a multi-file, documentation or structural patch outside the verified canonical working tree:

- require the exact repository, source branch, full commit hash, clean-state evidence and a ZIP produced with `git archive` from that commit;
- do not use a stale checkout, historical attachment or assumed repository state as the baseline;
- work on an isolated extraction and preserve encoding and line endings;
- generate a focused patch and a report of changed files and checks actually executed;
- validate the patch on a second pristine extraction with `git apply --check`, actual application, whitespace checks and exact tree comparison;
- report separately any typecheck, lint, tests, build, browser, security or deployment checks not executed.

Do not stage, commit, push, open or merge a pull request, or deploy unless that checkpoint is explicitly authorized. The generated ZIP is a reference artifact and does not become canonical until the change is merged into the official repository.

A minimal edit made directly in a verified clean working tree may skip the archive but still requires a dedicated branch, limited scope, diff review and relevant checks.

## Agent coordination

- Only one writer may modify the same working tree at a time.
- Do not edit concurrently with Lovable, Cursor Agent, Claude Code or another Codex task.
- Start from a clean branch, not `main`.
- Require a branch, commit or diff checkpoint before handoff.
- A reviewer starts in read-only mode.
- Do not apply review findings until the user approves them.
- Never rewrite published Lovable-connected history.
- Do not force push, rebase, amend or squash already-pushed commits when it can damage Lovable history.

## Task admission and project state

Before modifying files, verify that the task provides:

- repository and full base commit;
- current project state;
- required start or external-service gates;
- approved scope;
- acceptance criteria;
- required verification;
- prohibited actions.

`PREPARATION_COMPLETE` does not authorize implementation. A planned project has no repository, branch, deploy or validation until those resources actually exist.

Do not create paid-tool projects, consume credits, create remote repositories, push, publish, deploy or begin a higher plan unless explicitly authorized by the current task.

For RITO Studio, historical START activation gates do not block a later plan that has its own explicit approval. Never infer BUSINESS or BUSINESS PLUS authorization from START; verify the current plan-specific repository documentation and gate before editing.

The model recommendation is recorded by ChatGPT before assignment. It does not expand Codex permissions or scope.

## Infrastructure provider boundaries

Choose infrastructure by project fit. Cloudflare, Supabase/PostgreSQL and future dedicated or self-hosted infrastructure are implementation providers, not part of the application/domain contract.

Keep concrete provider-specific SDKs, bindings and runtime types near infrastructure adapters or the composition boundary when that separation solves a real dependency. Do not build speculative multi-cloud layers or alternate-provider adapters without a concrete requirement.

RITO Studio BUSINESS PLUS currently uses Cloudflare for its live/staging architecture. This does not make Cloudflare mandatory for Forno Lume or future Tretnix projects.

## Scope control

Do not:

- modify unrelated functionality, copy or design;
- perform speculative cleanup;
- add or update dependencies without a concrete reason;
- change the lockfile during an unrelated task;
- suppress TypeScript errors with unsafe casts;
- redesign an intentional client identity;
- create empty documentation files;
- deploy, modify DNS or change production data without explicit approval.

## Security

- Never expose, print or commit secrets.
- Never commit `.env` files.
- Never place service-role keys in client code.
- Client-side guards are not authorization controls.
- Never weaken RLS to hide a frontend error.
- Use versioned migrations.
- Use the least privilege necessary.
- Cloud tasks must not receive production credentials unless explicitly required and approved.
- Limit network access to what the task actually needs.

## Validation

Use repository-defined commands.

Do not invent missing scripts.

Record every check as:

- executed and passed;
- executed and failed;
- unavailable;
- not executable in the environment;
- manual verification required.

When relevant, consider:

- typecheck;
- lint;
- tests;
- build;
- direct URL;
- refresh;
- back and forward;
- responsive widths;
- keyboard;
- reduced motion;
- console;
- network.

## Reporting

Report:

1. objective;
2. confirmed cause or impact;
3. files changed;
4. implementation;
5. commands actually executed;
6. results;
7. checks not executed;
8. unresolved issues;
9. regression risk;
10. final Git status;
11. initial and final project state;
12. gate evidence used.

Clearly distinguish:

- confirmed from source code;
- confirmed by execution;
- confirmed in deployment;
- probable;
- potential;
- manual verification required;
- not assessable.

## Public identity

Public-facing software is designed and developed by Tretnix.

Do not add public references attributing client software to ChatGPT, Lovable, Cursor, Codex, Claude Code or other internal tools.

Client projects include a discreet footer attribution:

“Progettato e sviluppato da Tretnix”

linked to:

```text
https://tretnix.com
```

Only “Tretnix” needs to be linked unless the approved design says otherwise. The link must remain discreet but perceivable, open in a new tab with `target="_blank"` and `rel="noopener noreferrer"`, indicate the new-tab behavior accessibly and preserve visible keyboard focus. A restrained external-link icon is allowed; decorative icons must be hidden from assistive technology.

## Public demo indexing

For a public demo that is not a real business, emit `noindex, follow` on all public routes, including 404 and legal pages. Do not block the crawler from reading that directive. Do not publish fictional commercial structured data or fields. Allowed generic types are `WebSite`, `WebPage`, `AboutPage`, `CollectionPage` and `ContactPage` when accurate, deterministic, route-aware and safely serialized.

## Family kits

When a task belongs to a prepared vertical, inspect the applicable family kit before editing:

```text
family-kits/beauty-wellness-v1.1/
family-kits/professional-services-v1.0/
family-kits/home-local-services-v1.0/
```

Record the version and files used. A prompt inside a kit is an approved task template, not permission to run external tools, consume credits, create repositories, push or deploy.

Never use `source-artifacts/**/historical-source-of-truth/` as the current baseline. Current root decisions, standards and project-local documentation take precedence.


## Controlled Change Package

When an approved non-trivial patch is prepared outside the canonical checkout, use the repository package defined by `skills/CONTROLLED_CHANGE_PACKAGE.md`: strict `Apply`, separate `Validate`, exact allowlist and hashes, idempotent recovery, complete logs, checks for unstaged, untracked and staged whitespace, and no automatic stage, commit, push, merge, deployment or migration execution.

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
