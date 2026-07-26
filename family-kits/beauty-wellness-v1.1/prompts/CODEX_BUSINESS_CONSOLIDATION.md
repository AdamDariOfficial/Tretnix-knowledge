# Codex Prompt — RITO Studio BUSINESS Consolidation

## Context

RITO Studio BUSINESS derives from the canonical START commit recorded in `docs/START_BUSINESS_CONTRACT.md`.

## Objective

Audit first, then implement only approved technical corrections that consolidate BUSINESS while preserving START identity.

## Constraints

- Do not redesign.
- Do not change copy outside approved fixes.
- Do not add backend in demo mode.
- Do not weaken authentication, authorization or RLS if a real integration exists.
- Do not add dependencies without a concrete reason.
- Do not modify unrelated files.
- Preserve route, refresh, back and forward behavior.
- Preserve mobile text-before-image order.
- Respect reduced motion.

## Required process

1. Record branch, commit and working tree.
2. Read all docs.
3. Compare START and BUSINESS pattern by pattern.
4. Produce findings before edits.
5. Wait for or use only explicitly approved findings.
6. Apply the smallest complete corrections on a dedicated branch.
7. Review the diff.
8. Run existing typecheck, lint, tests and build.
9. Report browser and manual checks separately.

## Output

- confirmed cause;
- implementation;
- files changed;
- dependencies;
- exact checks and results;
- parity changes;
- risks;
- remaining manual verification.
