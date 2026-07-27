# Controlled Change Package Manifest

Usare questo template per descrivere un pacchetto di modifica controllata Tretnix.

## Package

- package name:
- task identifier:
- prepared date:
- prepared by:
- package version:
- objective:
- target branch:
- related decisions:
- related specification:

## Repositories

Per ogni repository:

- display name:
- remote URL:
- local path rule:
- source branch:
- allowed base SHA:
- target branch:
- package manager:
- generated files allowed for recovery:
- migrations included as files:
- migrations executed automatically: no
- deploy executed automatically: no

## File allowlist

| Repository | Path | Operation | Baseline SHA-256 or base commit | Payload SHA-256 |
|---|---|---|---|---|
| | | modify / create / delete | | |

## Validation commands

| Repository | Command | Required | Notes |
|---|---|---:|---|
| | | yes / no | |

## Explicit exclusions

- stage:
- commit:
- push:
- pull request:
- merge:
- deploy:
- database migration execution:
- production writes:
- unrelated formatting:
- dependency updates:

## Recovery states

- clean base:
- branch created only:
- known partial application:
- complete application:
- generated-file recovery:
- unexpected state behavior: stop without destructive cleanup

## Acceptance evidence

- archive integrity:
- manifest/payload match:
- sensitive-file scan:
- clean-base fixture:
- resumability fixture:
- unstaged whitespace check:
- untracked text whitespace scan:
- staged whitespace check after `git add`:
- static syntax check:
- checks not executed in preparation environment:

## Required human QA

- browser:
- responsive widths:
- keyboard:
- reduced motion:
- backend/RLS:
- staging:
- production:

## Required final report

- initial SHA and branch;
- final changed-file list;
- Apply result;
- Validate matrix;
- warnings;
- manual QA result;
- remaining risks;
- commit/push/PR/migration/deploy state.
