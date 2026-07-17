# Controlled Implementation Task

Use this template for Codex, Cursor Agent, Lovable or another implementation agent.

## Context

Describe:

- repository;
- branch/base commit;
- project role;
- affected feature;
- related approved decisions;
- canonical visual or technical reference.

## Objective

State one measurable result.

## Confirmed cause or current evidence

Provide only verified evidence. Distinguish hypotheses.

## Allowed scope

List:

- files or areas that may change;
- behavior that may change;
- tests or documentation that may be added.

## Constraints

Typical constraints:

- do not modify unrelated copy, design or functionality;
- do not add dependencies unless approved;
- do not update unrelated dependencies or lockfiles;
- preserve client identity;
- preserve direct URL, refresh, back and forward;
- respect reduced motion;
- do not deploy;
- do not modify production data;
- do not weaken authentication, authorization or RLS;
- one writer only.

## Acceptance criteria

Define observable criteria for:

- functionality;
- responsive behavior;
- accessibility;
- routing/history;
- security;
- visual preservation.

## Required verification

Use only repository-defined commands.

Record:

- typecheck;
- lint;
- tests;
- build;
- browser widths;
- keyboard;
- reduced motion;
- console;
- network;
- direct URL;
- refresh;
- back and forward.

## Required output

The agent must report:

1. objective;
2. root cause;
3. plan used;
4. files changed;
5. implementation summary;
6. commands executed;
7. results;
8. unavailable checks;
9. manual checks remaining;
10. regression risk;
11. final diff summary;
12. final `git status --short`.

## Prohibited actions

- direct work on `main`;
- concurrent writer;
- commit or push unless explicitly requested;
- force push;
- destructive Git commands;
- deployment;
- DNS changes;
- production database changes;
- secret exposure;
- unapproved scope expansion.
