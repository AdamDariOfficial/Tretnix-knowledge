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

## Agent coordination

- Only one writer may modify the same working tree at a time.
- Do not edit concurrently with Lovable, Cursor Agent, Claude Code or another Codex task.
- Start from a clean branch, not `main`.
- Require a branch, commit or diff checkpoint before handoff.
- A reviewer starts in read-only mode.
- Do not apply review findings until the user approves them.
- Never rewrite published Lovable-connected history.
- Do not force push, rebase, amend or squash already-pushed commits when it can damage Lovable history.

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
10. final Git status.

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
