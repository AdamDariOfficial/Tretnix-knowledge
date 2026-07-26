# Development Pack Ingestion — 25 July 2026

Questa cartella registra la provenienza del pacchetto usato per avviare il ciclo di sviluppo Tretnix del 25 luglio 2026.

## Stato

```text
SOURCE_ACQUIRED
MANIFEST_VERIFIED
TEXT_CONTENT_INGESTED
BINARY_ARCHIVE_STORED_OFF_REPOSITORY
```

## Contenuti

- `MANIFEST.json`: manifest originale del pacchetto;
- `ORIGINAL_README.md`: README originale;
- `historical-source-of-truth/`: snapshot non canonico incluso nel pacchetto;
- le specifiche attive sono state spostate in `family-kits/`;
- i documenti di avvio sono stati spostati in `operations/development-launch-2026-07-25/`.

## Regola di autorità

Non usare `historical-source-of-truth/` come fonte corrente. L'ordine di autorità resta:

1. `DECISIONS.md` alla root;
2. `DEVELOPMENT_STANDARDS.md` alla root;
3. documenti canonici di famiglia e family kit;
4. documentazione del progetto;
5. task approvato;
6. codice e deploy verificati.

## Integrità

SHA-256 dell'archivio originale ricevuto:

```text
ebae0ebda463dbd7efcc29d56d102cdbc136c29625018bf28ac88dc5ebceca4d
```

Il file ZIP originale non è duplicato nella repository. Conservarne una copia offline.

I file importati dal pacchetto sono conservati integralmente. Alcuni Markdown originali usano spazi finali intenzionali per hard line break; `.gitattributes` esclude esclusivamente queste directory dal controllo generico `git diff --check`. I manifest sorgente sono calcolati sui byte `LF`: quando il checkout usa `CRLF`, la verifica normalizza esclusivamente `CRLF → LF` prima di confrontare dimensioni e SHA-256.
