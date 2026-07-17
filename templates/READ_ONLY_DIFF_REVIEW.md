# Read-only Diff Review

## Context

Review the current branch against the approved base branch or commit.

Provide:

- repository;
- base branch/commit;
- current branch/commit;
- approved task;
- acceptance criteria.

## Objective

Find only defects, regressions, security issues, missing validation or task non-compliance introduced by the current diff.

## Constraints

This is a read-only review.

Do not:

- modify files;
- format files;
- install dependencies;
- change the lockfile;
- commit;
- push;
- deploy;
- apply migrations;
- fix findings automatically.

## Review areas

Verify:

- compliance with the approved task;
- unrelated changes;
- root-cause alignment;
- functional correctness;
- TypeScript safety;
- responsive regressions;
- accessibility;
- routing and history;
- animation lifecycle;
- reduced motion;
- security;
- Supabase/RLS when present;
- missing tests;
- validation claims;
- documentation affected by the change.

## Evidence levels

Use:

- confirmed from source code;
- confirmed by execution;
- confirmed in deployment;
- probable;
- potential;
- manual verification required;
- not assessable.

## Finding format

For every finding include:

1. ID;
2. category;
3. severity;
4. evidence;
5. file and line range;
6. current behavior;
7. expected behavior;
8. cause;
9. impact;
10. recommendation;
11. regression risk;
12. required verification;
13. scope classification.

Scope classification:

- in scope;
- outside scope;
- future improvement.

## Required output

Return:

1. review scope;
2. commands executed;
3. confirmed findings;
4. probable/potential findings;
5. rejected or unsupported claims;
6. missing validation;
7. final Git status.

Do not apply fixes.

The user will classify each finding as:

```text
APPROVATO
RIFIUTATO
DA VERIFICARE
FUORI PERIMETRO
MIGLIORAMENTO FUTURO
```
