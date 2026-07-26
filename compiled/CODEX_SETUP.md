# Codex Setup — Tretnix

## Purpose

Codex is the primary repository agent for controlled implementation and validation. Cursor remains the IDE and human control surface. GitHub remains the official source.

## Supported Tretnix entry points

Preferred initial setup:

1. install the Codex IDE extension in Cursor;
2. sign in with the approved ChatGPT account;
3. install `compiled/CODEX_GLOBAL_AGENTS.md` as `~/.codex/AGENTS.md`;
4. open a repository that already contains a root `AGENTS.md`;
5. verify instruction loading in read-only mode;
6. begin with local work on a dedicated branch.

Codex app or Codex Cloud may be used later for isolated or longer tasks.

## Initial verification prompt

```text
Do not modify any file.

Read the global and repository AGENTS.md instructions.

Summarize:

1. the instruction precedence;
2. the allowed current scope;
3. Git and handoff rules;
4. security restrictions;
5. validation reporting requirements;
6. public Tretnix attribution rules.

List the instruction files you used.

Then report the output of:
git branch --show-current
git status --short
```

The working tree must remain unchanged.

## Model recommendation and task admission

Before each Codex assignment, ChatGPT records:

- recommendation date;
- currently available model recommended;
- reason based on complexity, risk and cost;
- alternative or limitation when relevant.

Before Codex starts, the task records:

- repository and full base commit;
- initial project state;
- required external or cost gates and their evidence;
- approved scope;
- acceptance criteria;
- prohibited actions.

A model choice does not authorize push, deploy, external spending or scope expansion.

## Controlled implementation workflow

```text
approved task
↓
clean branch
↓
Codex implementation
↓
diff review
↓
read-only independent review
↓
human decision
↓
approved corrections only
↓
validation
↓
pull request
```

## Default safety position

For ordinary local tasks:

- do not use full-access or unrestricted execution unless necessary;
- approve destructive or external operations explicitly;
- do not expose production credentials;
- do not enable broad network access without a task-specific reason;
- do not let multiple agents write to the same files.

## Cloud use

Before a Codex Cloud task:

- select the intended repository and branch or commit;
- define the setup script;
- verify that secrets are not required or are scoped minimally;
- keep agent internet access disabled or limited unless necessary;
- require a diff or pull request for review;
- never allow automatic production deployment from the first task.

## Output requirement

Every implementation report must include:

- recommendation date and model used;
- branch and base commit;
- initial and final project state;
- gate evidence;
- objective;
- root cause;
- files changed;
- commands executed;
- results;
- unavailable checks;
- manual checks;
- remaining risks;
- final `git status --short`.

## Prepared verticals

Before the first task for RITO, QUADRA or NODO:

1. verify the applicable family-kit version;
2. read its `README.md`, `docs/STATUS.md`, `docs/APPROVAL.md`, `docs/DECISIONS.md` and the task-relevant product/design/content/routes/testing files;
3. list the files actually read;
4. verify the required state transition and gates;
5. reject historical source snapshots as an implementation baseline.
