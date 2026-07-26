# Tretnix Chat Retention and Handoff

**Versione:** 1.0
**Aggiornato:** 26 luglio 2026
**Stato:** canonico

---

## 1. Principio

Le chat sono superfici di ragionamento e coordinamento. Non sono la fonte permanente di decisioni, specifiche, stato, task o prove tecniche.

Una chat può essere cancellata senza perdita operativa soltanto dopo che ogni informazione rilevante è stata trasferita alla destinazione corretta e verificata.

---

## 2. Gate di cancellazione

Prima di cancellare una chat Tretnix, verificare:

- [ ] ogni decisione approvata è in `DECISIONS.md` o nel decision log locale;
- [ ] ogni standard condiviso è in `DEVELOPMENT_STANDARDS.md`;
- [ ] ogni specifica completa è versionata;
- [ ] ogni stato corrente è in `CURRENT_STATE.md` o nel repository del progetto;
- [ ] ogni repository, baseline, branch e deploy citati sono registrati;
- [ ] ogni task o bug residuo è in GitHub Issues, audit o roadmap;
- [ ] ogni finding conserva evidenza e severità;
- [ ] ogni artefatto allegato necessario è archiviato o estratto in forma verificabile;
- [ ] ogni handoff contiene il prossimo passo e i gate mancanti;
- [ ] gli adattatori degli strumenti sono sincronizzati;
- [ ] la memory permanente contiene soltanto informazioni stabili;
- [ ] una nuova sessione può ricostruire correttamente il lavoro usando repository e file, senza la chat.

Se anche un punto essenziale fallisce, archiviare la chat ma non cancellarla ancora.

---

## 3. Destinazione delle informazioni

| Informazione emersa in chat | Destinazione |
|---|---|
| identità e modello operativo | `TRETNIX_MASTER_CONTEXT.md` |
| scelta approvata | `DECISIONS.md` |
| regola tecnica condivisa | `DEVELOPMENT_STANDARDS.md` |
| famiglia/verticale | documento della famiglia e `PORTFOLIO_AND_VERTICALS.md` |
| repository e relazione | `REPOSITORY_INDEX.md` |
| stato trasversale | `CURRENT_STATE.md` |
| stato specifico | `docs/STATUS.md` nel repository del progetto |
| task o bug | GitHub Issue / roadmap |
| finding | audit versionato |
| specifica di implementazione | file task versionato |
| allegato sorgente | repository, release, artifact storage o registro artefatti |
| prompt globale di uno strumento | `compiled/` |
| preferenza stabile del fondatore | memory, soltanto se realmente durevole |

---

## 4. Informazioni da non conservare nella memory permanente

Non usare la memory permanente per:

- branch corrente;
- PR aperte;
- SHA temporanei non canonici;
- bug o finding aperti;
- task successivo;
- stato di un abbonamento;
- crediti disponibili;
- esito ancora non verificato di build o deploy;
- gate momentanei;
- modello scelto per un singolo incarico;
- cronologie estese.

Queste informazioni cambiano e appartengono a GitHub o ai file di stato.

---

## 5. Handoff minimo obbligatorio

Ogni chat operativa che viene sostituita deve produrre un handoff con:

```text
Repository:
Branch:
Base commit completo:
Current commit completo:
Working tree:
Project state:
Completed work:
Evidence:
Checks executed:
Checks not executed:
Open findings:
Approved next task:
Missing gates:
Prohibited actions:
Canonical files updated:
Source artifacts:
```

Regole:

- usare hash completi;
- distinguere riportato da verificato;
- non scrivere “completato” senza evidenza;
- non lasciare decisioni soltanto nel testo dell’handoff;
- trasformare i task in issue quando il progetto è già operativo;
- registrare i file realmente letti.

---

## 6. Cancellazione, archiviazione e nuovi thread

### Cancellare

Usare quando il gate di cancellazione è completamente soddisfatto e non serve conservare la conversazione come prova o sorgente.

### Archiviare

Usare quando:

- il lavoro è concluso ma alcuni allegati non sono ancora migrati;
- un handoff esiste ma deve essere verificato;
- la chat contiene contesto potenzialmente utile non ancora classificato.

### Aprire un nuovo thread

Il nuovo thread deve iniziare dai file canonici e da un handoff breve. Non deve chiedere al fondatore di ripetere decisioni già documentate.

---

## 7. Allegati e pacchetti

Un nome di file citato in una chat non equivale a un artefatto archiviato.

Per ogni pacchetto essenziale registrare:

- nome esatto;
- data;
- checksum, quando disponibile;
- origine;
- contenuti;
- stato di acquisizione;
- documenti canonici derivati;
- eventuali elementi ancora non migrati.

Usare `SOURCE_ARTIFACT_REGISTER.md`.

---

## 8. Verifica di indipendenza dalle chat

Prima della cancellazione definitiva, eseguire una prova:

1. aprire una nuova sessione senza affidarsi alla chat storica;
2. fornire repository, branch e file canonici;
3. chiedere di riepilogare identità, stato, gate e prossimo task;
4. confrontare il risultato con il handoff;
5. correggere eventuali lacune nella repository;
6. ripetere finché non rimangono dipendenze sostanziali.

Non usare la sola capacità del modello di “ricordare” come prova di completezza.

---

## 9. Stato corrente della migrazione chat

Al 26 luglio 2026:

- Hospitality è ampiamente formalizzato;
- il workflow Codex e patch esterne è formalizzato;
- Beauty & Wellness e RITO hanno governance e gate formalizzati con questo aggiornamento;
- lo stato operativo Tretnix.com è registrato come handoff riportato, ma richiede riconciliazione con PR e commit;
- il development pack del 25 luglio è citato ma non presente integralmente nella baseline verificata;
- Professional Services e Home & Local Services non sono ancora documentati integralmente.

Di conseguenza, le chat contenenti gli unici byte di quei pacchetti non devono essere cancellate finché gli artefatti non vengono acquisiti.
