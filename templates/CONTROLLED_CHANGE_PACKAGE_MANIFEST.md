# Controlled Change Package Manifest

Usare questo template per descrivere un pacchetto di modifica controllata Tretnix.

## Package

- package name:
- task identifier:
- prepared date:
- prepared by:
- package version:
- CCP procedure version:
- objective:
- target branch:
- operator delivery: one ZIP / one PowerShell block
- related decisions:
- related specification:

## Package integrity

- ZIP filename:
- ZIP SHA-256:
- internal checksum file:
- manifest/payload binding:
- payload extra-file policy: fail closed

## Repositories

Per ogni repository:

- display name:
- remote repository identity:
- accepted remote forms:
- local path resolution rule:
- source branch:
- allowed base SHA:
- target branch:
- candidate identity rule: base SHA + exact allowlist + final hashes
- package manager/runtime:
- generated files allowed for recovery:
- ignored runtime/harness paths:
- migrations included as files:
- migrations executed automatically: no
- deploy executed automatically: no

## File allowlist

| Repository | Path | Operation | Baseline SHA-256 / base identity | Final SHA-256 |
|---|---|---|---|---|
| | | modify / create / delete | | |

## Validation commands and staged-state contract

| Repository | Validator / Command | Required | Staged-state contract | Notes |
|---|---|---:|---|---|
| | | yes / no | allowed / forbidden / not_applicable | |

## QA aggregation

- audit/parity required before owner review:
- browser QA:
- backend/RLS:
- responsive widths:
- keyboard:
- reduced motion:
- staging:
- production:
- temporary browser harness rule: ignored/constrained path + finally cleanup + post-cleanup Git check

## Explicit exclusions and gates

- automatic stage: no
- automatic commit: no
- automatic push: no
- automatic pull request: no
- automatic merge: no
- automatic deploy: no
- database migration execution: no
- DNS mutation: no
- secret/provisioning mutation: no
- production writes: no
- unrelated formatting: no
- dependency updates: no unless explicitly scoped

## Recovery states

- clean base:
- branch created only:
- known partial application by exact hashes:
- complete candidate:
- staged candidate verification:
- generated-file recovery:
- unexpected state behavior: stop without destructive cleanup

## Package self-test evidence

- archive integrity:
- manifest/payload match:
- internal checksums:
- sensitive-file scan:
- forbidden-action scan:
- static syntax review:
- Windows PowerShell 5.1 compatibility review/run:
- clean-base fixture:
- branch-created-only fixture:
- resumability fixture:
- complete/idempotent fixture:
- unexpected-state negative fixture:
- staged verification fixture:
- unstaged whitespace check:
- untracked text whitespace scan:
- staged whitespace check:
- checks not executable in preparation environment:

## PR capability

- direct PR creation capability checked at gate:
- current observation/date:
- fallback when unavailable: verified base/head/SHA + direct PR link + title/body + owner creates + post-create verification
- observation is time-bound and must be rechecked after tool/permission changes: yes

## Required final report

- initial repository/remote/branch/SHA;
- package ZIP SHA-256;
- candidate identity and final changed-file list;
- Apply result;
- Validate matrix;
- audit/parity/QA result;
- warnings and unavailable checks;
- owner review result;
- Verify-Staged result;
- separate stage/commit/push/PR/migration/merge/deploy state.
