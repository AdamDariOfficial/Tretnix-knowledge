# Tretnix Knowledge Repository Instructions

## Scope

These instructions apply to the entire `Tretnix-knowledge` repository.

This repository is a versioned governance, documentation and knowledge system. It is not an application repository. Changes must preserve authority, provenance, classification, auditability and the separation between stable knowledge and temporary project work.

## Required reading order

Before a material change, read:

1. `DECISIONS.md`;
2. `DEVELOPMENT_STANDARDS.md`;
3. `TRETNIX_MASTER_CONTEXT.md`;
4. the affected family, project or operation documents;
5. `CURRENT_STATE.md` for current gates and evidence levels;
6. `SOURCE_ARTIFACT_REGISTER.md` when an archive, attachment, handoff, checksum or historical filename is involved.

When sources conflict, apply the precedence defined by the canonical documents. Do not silently merge competing statements and do not elevate chat content to an approved fact without formalization.

## Classification

Store information according to its nature:

- approved choice and motivation → `DECISIONS.md`;
- shared mandatory technical rule → `DEVELOPMENT_STANDARDS.md`;
- stable identity and operating model → `TRETNIX_MASTER_CONTEXT.md`;
- repository inventory and relationships → `REPOSITORY_INDEX.md`;
- current cross-project gates and phases → `CURRENT_STATE.md`;
- source files, aliases, checksums and ingestion state → `SOURCE_ARTIFACT_REGISTER.md`;
- family governance → the relevant `*_FAMILY.md` document;
- complete family specification → `family-kits/`;
- handoff or launch procedure → `operations/`;
- historical source snapshot → `source-artifacts/`;
- temporary task or bug → project issue, roadmap, pull request or audit;
- tool adapter → `compiled/`, derived from canonical documents;
- reusable project instructions → `templates/` or an approved `project-kits/` directory.

Do not present proposals, memory, previous chat statements or unverified reports as approved facts.

## Editing boundaries

- Use one writer at a time.
- Do not work directly on `main`.
- Keep one coherent documentation update in one branch and one pull request when the scope is tightly related.
- Modify only files required by the approved scope.
- Prefer targeted edits over rewrites that erase history or intent.
- Do not delete superseded decisions; mark supersession explicitly.
- Do not edit a file in `compiled/` as an autonomous source. Update the canonical source first, then synchronize the adapter when relevant.
- Do not modify imported files covered by a manifest unless the source package is being intentionally re-ingested and the manifest is regenerated.
- Do not create empty or speculative documents, templates, skills, repositories or project kits.
- Do not add repository-specific implementation details to global standards unless they have been validated as reusable.
- Do not stage, commit, push, open a pull request, merge or change repository settings unless the user explicitly authorizes that exact action.

## Public repository safety

The repository remains public temporarily under `TRX-DEC-031` while the current audit and consolidation cycle is completed.

While it is public:

- never commit credentials, tokens, cookies, private keys, environment files or production access instructions;
- do not commit unnecessary personal data, private customer data or confidential commercial material;
- redact sensitive screenshots, logs and exports;
- prefer checksums and controlled references for large or sensitive artifacts;
- treat every committed file as publicly readable;
- do not change visibility automatically.

Before a future move to private, verify access for every required tool and obtain explicit owner confirmation.

## External patch requirements

For a patch prepared outside the canonical working tree:

- tie it to an exact commit and archive checksum;
- require a clean working tree and a non-`main` branch before application;
- abort on unexpected source content instead of guessing;
- validate with `git apply --check` before applying;
- apply without staging, committing, pushing or merging automatically;
- test on a second clean extraction of the same archive;
- review the resulting diff manually;
- follow `TRX-DEC-022` and the external patch workflow in `DEVELOPMENT_STANDARDS.md`.

## Validation

Before declaring a knowledge update ready, run:

```text
python scripts/validate_knowledge.py
git -c core.whitespace=cr-at-eol diff --check
git status --short
```

For an external patch, also verify:

```text
git apply --check <patch>
git diff --stat
git diff --name-only
```

Report only checks actually executed. Do not claim application, review, commit, push, merge, deployment or security success without evidence.
