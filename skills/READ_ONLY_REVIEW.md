# Read-Only Review

**Stato:** procedura canonica nella Knowledge, merged con Development OS v1; adozione applicativa soggetta ai gate del progetto
**Versione:** 1.1
**Aggiornato:** 15 settembre 2026
**Ambito:** diff review, audit post-implementazione e seconda opinione

---

## 1. Obiettivo

Revisionare un diff identificabile senza modificarlo. Il reviewer usa la stessa baseline, la specifica approvata, i criteri di accettazione e l'evidence disponibile.

## 2. Vincoli

Il reviewer non modifica, formatta, installa, ripristina, stagea, committa, pusha, apre o unisce PR, deploya o applica migration. I finding non vengono corretti automaticamente.

## 3. Classificazione dell'evidenza

Ogni finding usa una delle classi:

- confermato dal codice;
- confermato dall'esecuzione;
- confermato nel deploy;
- probabile;
- potenziale;
- verifica manuale richiesta;
- fuori perimetro;
- non valutabile.

Un accordo tra agenti non è evidenza tecnica. Le dichiarazioni di test vengono accettate soltanto con comando, stato esatto ed exit code.

L'evidence Development OS è valida soltanto per il fingerprint registrato. Cache hit dimostra un controllo locale deterministico sullo stato identico; non dimostra browser, backend live, staging, production o review umana.

## 4. Output

Per ogni finding indicare ID, severità, evidenza, file/riga, comportamento attuale e atteso, impatto, raccomandazione, rischio di regressione, verifica necessaria e classificazione scope.

Concludere con:

- scope e baseline revisionati;
- comandi non distruttivi realmente eseguiti;
- finding confermati e non confermati;
- validazioni mancanti;
- stato Git finale invariato;
- decisione owner richiesta: `APPROVATO`, `RIFIUTATO`, `DA VERIFICARE`, `FUORI PERIMETRO` o `MIGLIORAMENTO FUTURO`.

Questa procedura consolida i template storici [`../templates/READ_ONLY_AUDIT.md`](../templates/READ_ONLY_AUDIT.md) e [`../templates/READ_ONLY_DIFF_REVIEW.md`](../templates/READ_ONLY_DIFF_REVIEW.md), che restano formati dettagliati applicabili.
