# Controlled Implementation Task

Use this template for Codex, Cursor Agent, Lovable or another implementation agent.

## Task admission

Record:

- recommendation date;
- recommended model and reason;
- current project lifecycle state;
- required external/cost gates;
- evidence that each gate is satisfied;
- allowed final state.

If a required gate is missing, stop before implementation.


## Delivery mode

Choose one:

- direct controlled edit in the verified working tree;
- `git apply` patch tied to an exact archive;
- Controlled Change Package with separate `Apply` and `Validate` scripts.

Use the Controlled Change Package for non-trivial multi-file or multi-repository work prepared outside the canonical checkout. Record the target branch, allowed base SHA, allowlist, validation commands and excluded remote/database actions.

## Context

Describe:

- repository;
- branch/base commit;
- project role;
- affected feature;
- related approved decisions;
- canonical visual or technical reference.


## Family specification

- family:
- family-kit path and version:
- root `*_FAMILY.md` read:
- task-relevant kit files read:
- local decision log reviewed:
- historical source snapshots excluded as baseline: yes / no

A ready prompt inside a family kit does not satisfy the authorization gate by itself.

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
12. initial and final lifecycle state;
13. gate evidence used;
14. final `git status --short`.

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
- unapproved scope expansion;
- paid-tool use without a gate;
- creation of unapproved remote resources;
- treating preparation as implementation authorization;
- beginning a higher plan without approval.
