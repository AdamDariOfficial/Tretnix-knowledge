# Forno Lume START — Cursor Foundation Kit

Questo kit deve essere copiato nella root del repository:

```text
forno-lume-START
```

Contiene soltanto istruzioni e protezioni per gli strumenti. Non modifica il sito.

## File da copiare

```text
AGENTS.md
.cursorignore
.cursor/rules/00-project-overview.mdc
```

## Procedura consigliata

Nel repository locale:

```bash
git checkout main
git pull
git checkout -b chore/tretnix-agent-foundation
```

Copiare i tre elementi nella root, quindi controllare:

```bash
git status
git diff -- AGENTS.md .cursorignore .cursor/rules/00-project-overview.mdc
```

Dopo la revisione:

```bash
git add AGENTS.md .cursorignore .cursor/rules/00-project-overview.mdc
git commit -m "chore: add Tretnix agent foundation"
git push -u origin chore/tretnix-agent-foundation
```

Aprire una pull request e verificare che il diff contenga soltanto questi file.

## Cosa non fare in questa fase

- non modificare componenti;
- non correggere bug;
- non cambiare animazioni;
- non aggiornare dipendenze;
- non cambiare il lockfile;
- non effettuare deploy;
- non applicare migrazioni.

Dopo il merge si può eseguire l’audit in sola lettura usando `templates/READ_ONLY_AUDIT.md`.
