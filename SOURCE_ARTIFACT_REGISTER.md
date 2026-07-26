# Tretnix Source Artifact Register

**Versione:** 1.0
**Aggiornato:** 26 luglio 2026
**Stato:** operativo

---

## 1. Scopo

Questo registro distingue:

- artefatti effettivamente disponibili e verificati;
- file citati ma non acquisiti;
- snapshot storici;
- documenti canonici derivati;
- blocchi che impediscono la cancellazione sicura delle chat.

Il nome di un allegato non dimostra che il suo contenuto sia conservato nella repository.

---

## 2. Baseline Tretnix Knowledge analizzata

| Campo | Valore |
|---|---|
| Repository | `https://github.com/AdamDariOfficial/Tretnix-knowledge.git` |
| Branch | `main` |
| Commit completo | `60ac030d0c231443f1879c9bafc46f2626769f3d` |
| Data acquisizione | 26 luglio 2026 |
| File | 23 |
| Righe | 6.175 |
| Metodo disponibile | download dei file raw dalla tree pubblica |
| `git archive` originale | non disponibile nell’ambiente di questa attività |
| Manifest SHA-256 locale | generato per i 23 file acquisiti |

Questa baseline è identificata dal commit, ma la patch prodotta da questa attività deve essere revisionata e applicata manualmente nel working tree canonico.

---

## 3. Snapshot storici caricati nella sessione

| Artefatto | Data contenuto | Stato | Uso consentito |
|---|---|---|---|
| `READ_ONLY_AUDIT(2).md` | 16 luglio 2026 | storico, superato dalla repository corrente | confronto soltanto |
| `DECISIONS(2).md` | 16 luglio 2026 | storico, superato | confronto soltanto |
| `REPOSITORY_INDEX(2).md` | 16 luglio 2026 | storico, superato | confronto soltanto |
| `TRETNIX_MASTER_CONTEXT(2).md` | 16 luglio 2026 | storico, superato | confronto soltanto |
| `DEVELOPMENT_STANDARDS(2).md` | 16 luglio 2026 | storico, superato | confronto soltanto |

Non usare questi file come baseline di una patch destinata a `main`.

---

## 4. Development pack del 25 luglio 2026

### `TRETNIX_NEW_CHAT_DEVELOPMENT_PACK_2026-07-25.zip`

| Campo | Valore |
|---|---|
| Citato in handoff | sì |
| Dichiarato fonte approvata | sì |
| Byte disponibili nella baseline analizzata | no |
| Checksum disponibile | no |
| Contenuto integrale verificato in questa attività | no |
| Dipendenze note | Beauty & Wellness v1.1; RITO Studio START; preparazione dei verticali successivi |
| Stato | `REQUIRED_SOURCE_NOT_INGESTED` |

### `TRETNIX_DEVELOPMENT_START_HANDOFF_2026-07-25.md`

| Campo | Valore |
|---|---|
| Citato in handoff | sì |
| Dichiarato da leggere integralmente | sì |
| Contenuto disponibile nella baseline analizzata | no |
| Contenuto integrale verificato in questa attività | no |
| Stato | `REQUIRED_SOURCE_NOT_INGESTED` |

### Conseguenza

Non cancellare la chat o il luogo che contiene l’unica copia di questi artefatti finché:

1. i file non vengono recuperati;
2. viene calcolato un checksum;
3. vengono archiviati in una posizione approvata;
4. i contenuti canonici vengono estratti;
5. le eventuali discrepanze vengono revisionate;
6. questo registro viene aggiornato.

---

## 5. Informazioni recuperate dagli handoff

Sono state formalizzate, con il corretto livello di evidenza:

- Beauty & Wellness `v1.1` approvata e congelata;
- `RITO Studio START` come primo progetto;
- `PREPARATION_COMPLETE`;
- `IMPLEMENTATION_NOT_STARTED`;
- doppio gate Lovable;
- divieto di progetto, crediti, repository, pubblicazione e BUSINESS prima dei gate;
- stato operativo riportato di CF-1 e indagine `data-tsd-source`;
- esistenza dichiarata di materiali per Professional Services e Home & Local Services.

Non sono stati inventati i dettagli non disponibili.

---

## 6. Procedura di acquisizione

Per acquisire un artefatto:

1. copiare il file originale senza modificarlo;
2. registrare data e origine;
3. calcolare SHA-256;
4. inventariare il contenuto;
5. distinguere fonte approvata, bozza e output generato;
6. estrarre decisioni, standard, specifiche, stato e task nei file corretti;
7. mantenere il sorgente quando necessario per auditabilità;
8. aggiornare questo registro;
9. aprire una pull request documentale.

Directory suggerita, solo dopo approvazione della policy sui file binari:

```text
source-artifacts/
└── 2026-07-25-development-pack/
```

Alternativa preferibile per file grandi: GitHub Release privata o storage documentale controllato, con checksum e link nel registro.
