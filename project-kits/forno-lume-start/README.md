# Forno Lume START — Agent Foundation Kit

This kit is the Tretnix Knowledge copy of the agent configuration for:

```text
forno-lume-START
```

It supports Cursor and Codex through the same root `AGENTS.md`.

## Current state

- initial foundation merged into the project repository;
- audited commit: `39d58126abb2fa9b63070e047db06c8027aaef6f`;
- static read-only audit completed;
- audit quality control completed;
- controlled remediation not yet implemented.

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

1. configure Codex global instructions;
2. verify that Codex reads global and repository `AGENTS.md`;
3. prepare the first approved remediation task;
4. create a dedicated fix branch;
5. allow Codex to implement only that scope;
6. review the diff in read-only mode;
7. run available checks;
8. open a pull request after human approval.
