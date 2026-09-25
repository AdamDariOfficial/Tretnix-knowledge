# Forno Lume START — Agent Foundation Kit

This kit is the Tretnix Knowledge reference copy for the agent configuration of:

```text
forno-lume-START
```

It supports Cursor and Codex through the same root `AGENTS.md`. The project repository remains authoritative for its own current files and implementation state.

## Current state

- project repository current `main`: `2ed19ef9a4a886616bccd5aad2054c3027fec680`;
- validated implementation ancestor for the 10 September reconciliation: `0730a759c6f8bb71f7ad3a3fb810ee8540e18556`;
- cross-family reconciliation: PR `#17`, merged;
- historical technical-closure baseline: `d15f639267dfdd57194536154abfa1d0ff3b4542`;
- historical final-polish freeze: `a817903923c1bbfe177d8b59e70a4aa1137b7ab1`;
- project remains released and frozen;
- Cloudflare post-merge SUCCESS and owner `prefers-reduced-motion` PASS are recorded in the canonical Knowledge for the current baseline.

The historical closure SHA remains provenance. It must not be presented as the current `main` baseline.

Further source changes require a confirmed bug, confirmed regression, security issue or explicitly approved product requirement. Backlog items do not authorize optional cleanup.

## Files

```text
AGENTS.md
.cursorignore
.cursor/rules/00-project-overview.mdc
```

## Synchronization procedure

Do not overwrite the project blindly and do not use this kit as a substitute for inspecting the current project repository.

From a clean local project repository:

```bash
git switch main
git pull --ff-only
git switch -c chore/update-agent-foundation
```

Compare the project with this kit before copying anything:

```bash
git diff --no-index AGENTS.md <path-to-kit>/AGENTS.md
git diff --no-index .cursor/rules/00-project-overview.mdc <path-to-kit>/.cursor/rules/00-project-overview.mdc
```

Preserve the Lovable history block where it exists. If the project has advanced beyond the baseline recorded here, stop and reconcile the kit against the newer project state rather than forcing this copy into the repository.

After copying only approved documentation changes:

```bash
git status --short
git diff --check
git diff
```

Use a pull request and a normal merge. Do not rewrite published Lovable history.

## Next operational use

1. keep Forno Lume START closed and frozen;
2. use the kit as synchronized project context, not as an independent authority;
3. reopen START source work only for an allowed trigger and an explicitly approved task;
4. use `HOSPITALITY_FAMILY.md` for the current START → BUSINESS → BUSINESS PLUS family contract;
5. treat Package D and later scopes as separate gates requiring their own audit, approval and verification.
