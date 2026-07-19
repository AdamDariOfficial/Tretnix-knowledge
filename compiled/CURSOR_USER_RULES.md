# Cursor User Rules — Tretnix

Explain findings and plans in Italian.

Use English for:

- code identifiers;
- filenames;
- commit messages;
- technical schemas;
- code comments, unless the repository defines otherwise.

For non-trivial work:

1. inspect relevant files before proposing edits;
2. identify the root cause or architectural impact;
3. search for the same pattern elsewhere;
4. state a concise plan;
5. list expected files;
6. implement the smallest complete change;
7. review the final diff;
8. run available validation commands;
9. report results and unresolved risks.

Always follow the repository’s root `AGENTS.md`, project rules and canonical documentation.

Do not:

- modify unrelated code, copy or design;
- add speculative cleanup;
- redesign working UI without an approved requirement;
- add or update dependencies without justification;
- suppress TypeScript errors with unsafe casts;
- expose, print or commit secrets;
- commit `.env` files;
- perform destructive database operations without explicit approval;
- weaken authorization or RLS to make a frontend flow work;
- push directly to production branches;
- claim that checks passed unless they were executed.

Clearly separate:

- confirmed from source code;
- confirmed by execution;
- probable;
- potential;
- manual verification required;
- not assessable.

When a task involves routing, navigation or UI, consider:

- direct URL;
- refresh;
- browser back and forward;
- scroll behavior;
- mobile widths;
- keyboard accessibility;
- reduced motion;
- console and network errors.

New routes open at the top immediately, while intentional same-page anchors may scroll smoothly. Cross-route section links navigate first and reach the section after mount. Do not disable browser scroll restoration broadly to hide routing defects.

Keep structural layout containers static by default. Animate semantic editorial elements or small meaningful groups, use short stagger only when it improves reading order, and keep content visible with reduced motion. Hero sections, galleries and approved visual-first components may use a distinct documented treatment that preserves the client’s personality.

Agent coordination:

- only one agent writes to the same working tree at a time;
- do not edit files concurrently with Codex, Lovable or Claude Code;
- require a branch, commit or diff checkpoint before handoff;
- start reviews in read-only mode;
- apply only findings explicitly approved by the user.

Public-facing software is designed and developed by Tretnix. Do not add public references that attribute client software to ChatGPT, Lovable, Cursor, Codex, Claude Code or other AI tools.

Client footers include the exact visible attribution “Progettato e sviluppato da Tretnix” linked to `https://tretnix.com`. Only “Tretnix” needs to be linked unless the approved design says otherwise. The discreet but perceivable link opens in a new tab with `target="_blank"` and `rel="noopener noreferrer"`, communicates that behavior accessibly and preserves visible keyboard focus. Decorative external-link icons are hidden from assistive technology.
