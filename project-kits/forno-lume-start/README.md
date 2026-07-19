# Forno Lume START — Agent Foundation Kit

This kit is the Tretnix Knowledge copy of the agent configuration for:

```text
forno-lume-START
```

It supports Cursor and Codex through the same root `AGENTS.md`.

## Current state

- initial foundation merged into the project repository;
- authoritative technical-closure baseline: `d15f639267dfdd57194536154abfa1d0ff3b4542`;
- audit, remediation and technical closure completed;
- production verification completed successfully by the project owner;
- project documented and frozen.

Further source changes require a confirmed bug, confirmed regression, security issue or explicitly approved product requirement. Backlog items do not authorize optional cleanup.

## Files

```text
AGENTS.md
.cursorignore
.cursor/rules/00-project-overview.mdc
```

## Synchronization procedure

Do not overwrite the project blindly.

From a clean local repository:

```bash
git switch main
git pull --ff-only
git switch -c chore/update-agent-foundation
```

Compare the kit with the project:

```bash
git diff --no-index AGENTS.md <path-to-kit>/AGENTS.md
git diff --no-index .cursor/rules/00-project-overview.mdc <path-to-kit>/.cursor/rules/00-project-overview.mdc
```

Preserve the Lovable block at the top of the project `AGENTS.md`.

After copying only the approved documentation changes:

```bash
git status --short
git diff --check
git diff
```

Use a pull request and a normal merge. Do not rewrite published Lovable history.

## Next operational use

1. keep Forno Lume START closed and frozen;
2. use the kit only as synchronized project context;
3. reopen source work only for an allowed trigger and an explicitly approved task;
4. audit Forno Lume BUSINESS as the next active Hospitality repository;
5. treat BUSINESS routing, gallery, lightbox and higher-plan patterns as candidates until its own audit and remediation are complete.
