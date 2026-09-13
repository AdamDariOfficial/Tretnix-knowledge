# Tretnix Case Study Standard

**Versione:** 1.0
**Aggiornato:** 11 settembre 2026
**Stato:** canonico per dossier portfolio e case study cliente

---

## 1. Scopo

Questo standard definisce come Tretnix prepara, verifica e pubblica dossier riutilizzabili per il portfolio. Il dossier è la fonte editoriale e di integrazione; non sostituisce il repository del progetto, le evidenze di deploy o l'autorizzazione a modificare Tretnix.com.

Ogni affermazione deve distinguere chiaramente capacità progettata, comportamento verificato, risultato misurato ed evidenza mancante.

## 2. Tipi di pubblicazione

### `portfolio_concept`

Progetto dimostrativo ideato e sviluppato da Tretnix per mostrare una direzione di prodotto o un verticale.

```text
publication_type = portfolio_concept
is_concept = true
```

Regole:

- dichiarare che si tratta di un concept/demo Tretnix;
- non presentare il concept come cliente, incarico o attività reale;
- descrivere valore previsto, architettura e capacità, non risultati commerciali conseguiti;
- mantenere visibili limiti di evidenza, dati demo e provenienza asset.

### `client_case_study`

Progetto realizzato per un cliente reale con autorizzazione alla pubblicazione.

```text
publication_type = client_case_study
is_concept = false
```

Regole:

- verificare identità del cliente, consenso editoriale e perimetro pubblicabile;
- attribuire metriche, testimonianze e risultati soltanto a evidenze approvate;
- indicare periodo, metodo di misurazione e limiti dei dati;
- rimuovere informazioni riservate o personali non necessarie.

Il passaggio da `portfolio_concept` a `client_case_study` non è automatico: richiede dati reali, autorizzazione e una nuova revisione del dossier.

## 3. Integrità pubblica

Un dossier Tretnix non deve:

- inventare fatturato, lead, prenotazioni, conversioni, ROI, risparmi di tempo o altri outcome misurati;
- inventare testimonianze, premi, certificazioni, partnership, credenziali o garanzie;
- inventare indirizzi, denominazioni legali, contatti o altri dati aziendali reali;
- dichiarare certificazione di accessibilità; è ammesso descrivere decisioni e verifiche eseguite;
- dichiarare verificata una licenza asset quando fonte, copyright o liberatoria non sono documentati;
- attribuire pubblicamente il lavoro a strumenti interni di produzione.

Tretnix resta il designer e sviluppatore pubblico. Per un concept usare wording esplicito come `Concept Tretnix` o `Demo portfolio Tretnix`.

Le recensioni sintetiche visibili in una demo restano fixture dimostrative secondo `TRX-DEC-040`: modalità typed `demo`, wording neutro, nessuna attribuzione o URL di piattaforma e nessun dato strutturato commerciale. Il ramo `authentic` è riservato a recensioni cliente verificate.

## 4. Evidenza e linguaggio

Usare uno dei seguenti livelli per le affermazioni materiali:

| Livello | Uso |
|---|---|
| confermato dal sorgente | comportamento, configurazione o contenuto presente nel commit indicato |
| confermato dall'esecuzione | comando o QA realmente eseguito con risultato registrato |
| confermato nel deploy | origine e versione distribuita verificate |
| riportato | evidenza fornita in un handoff approvato ma non riprodotta nel dossier |
| limite noto | informazione mancante, non verificata o non pubblicabile |

Verbi come `consente`, `rende disponibile`, `organizza`, `espone` e `riduce i passaggi necessari` possono descrivere una capacità osservabile. Verbi come `ha aumentato`, `ha ridotto del`, `ha generato` o `ha convertito` richiedono evidenza misurata.

`impact_points` descrive esclusivamente valore progettuale o di workflow supportato dall'implementazione. Esempio sicuro:

> Riduce i passaggi necessari per trovare il canale di prenotazione.

Esempi non ammessi senza evidenza cliente:

```text
+37% prenotazioni
riduce del 50% il tempo di gestione
ha aumentato le conversioni
```

## 5. Schema canonico del dossier

Ogni dossier deve includere:

1. **Identity:** nome, descriptor/tagline quando approvati, verticale e ruolo.
2. **Publication status:** `publication_type`, `is_concept`, stato editoriale e autorizzazione alla pubblicazione.
3. **Concept:** tesi del progetto e differenziazione.
4. **Plans represented:** piani effettivamente inclusi ed esclusioni esplicite.
5. **Audience:** attività e utenti per cui è progettato.
6. **Design challenge:** problema progettuale, senza fingere un brief cliente.
7. **Objective:** risultato funzionale/editoriale desiderato.
8. **Strategy:** principi che collegano identità, contenuti, interazioni e conversione.
9. **START role:** baseline, architettura e scopo del piano iniziale.
10. **BUSINESS evolution:** profondità aggiunta senza presentarla come redesign indipendente.
11. **Problem and solution:** formulazioni riutilizzabili nel modello Tretnix.com.
12. **Features and modules:** capacità confermate e moduli editoriali/tecnici.
13. **Workflow / user journey:** sequenza osservabile del percorso.
14. **Customizations:** leve di adattamento a un futuro cliente reale.
15. **Technical decisions:** stack e decisioni architetturali rilevanti, senza changelog.
16. **Responsive / accessibility decisions:** mobile-first, tastiera, focus, overlay, route e altre decisioni supportate.
17. **Motion:** linguaggio, fallback e `prefers-reduced-motion`.
18. **Content / trust policy:** dati demo, recensioni, structured data, indicizzazione e attribuzione.
19. **Validation evidence:** commit, PR, controlli e deploy, con livello di evidenza.
20. **Demo URLs:** solo origini confermate, con data della verifica.
21. **Known evidence limits:** risultati, asset, licenze, browser o dati non verificati.
22. **Asset / screenshot requirements:** shot list per la successiva integrazione.
23. **Tretnix.com mapping:** valori proposti per il modello `Project`.
24. **SEO / social copy:** title, description, social copy e requisiti dell'immagine.
25. **Future extensions excluded:** funzionalità o piani non inclusi nel racconto completato.

## 6. Mappatura al modello `Project` di Tretnix.com

| Campo | Regola del dossier |
|---|---|
| `title` | nome pubblico, senza fingere un cliente |
| `slug` | stabile, minuscolo e leggibile |
| `category` | verticale semantico approvato |
| `short_description` | sintesi trasparente entro una card portfolio |
| `overview` | concept, piani rappresentati ed evoluzione |
| `problem` | sfida di design/prodotto, non problema dichiarato da un cliente inesistente |
| `solution` | risposta progettuale confermata |
| `audience` | attività e utenti target |
| `features` | capacità visibili o documentate |
| `impact_points` | valore intenzionale/osservabile, mai metriche inventate |
| `modules` | aree funzionali o editoriali |
| `workflow_steps` | percorso utente in ordine |
| `customizations` | leve di adattamento cliente |
| `tech_stack` | tecnologie confermate nei repository |
| `badge` | stato chiaro, per i concept `Concept Tretnix` |
| `is_concept` | `true` per `portfolio_concept`, `false` per case study cliente verificato |
| `is_visible` | `false` finché pubblicazione, media e contenuti non sono approvati |
| `is_featured` | `false` finché la selezione homepage non è autorizzata |
| `sort_order` | proposta non vincolante; verificare collisioni e ordine corrente durante l'integrazione |

Il modello corrente comprende anche `image_url` e `gradient`: il dossier non assegna un `image_url` prima della produzione/approvazione degli asset; l'integrazione deve definire media e fallback visuale senza inventare materiale.

## 7. Asset e screenshot

Ogni riga della shot list deve registrare:

```text
purpose
source project
route
viewport / aspect ratio
subject
why it matters
crop/focal requirements
caption intent
provenance status
```

Requisiti minimi per concept:

- hero/cover;
- START mobile;
- START desktop;
- profondità route/contenuto BUSINESS;
- interazione gallery;
- interazione conversione/contatto;
- dettaglio distintivo della famiglia.

Escludere browser o DevTools chrome non intenzionali, strumenti interni, interfacce admin/private, dati personali e claim di piattaforma fittizi. Screenshot e copie asset non vengono creati durante la sola preparazione del dossier.

## 8. SEO e social

Per ogni dossier preparare:

- title editoriale;
- meta description;
- social title;
- social description;
- alt/caption intent per il cover asset;
- stato concept/client espresso nella pagina, non affidato alla sola metadata.

La metadata non deve trasformare una demo in attività commerciale reale. La pubblicazione su Tretnix.com è distinta dalla policy `noindex, follow` delle demo prodotto: il case study può essere indicizzabile solo dopo il gate SEO del sito istituzionale.

## 9. Gate di integrazione

Prima dell'inserimento in Tretnix.com:

1. ricontrollare dossier e commit sorgente;
2. verificare URL demo e stato deploy;
3. approvare media, crop, alt e provenienza;
4. verificare categorie e ordinamento correnti;
5. controllare tutte le stringhe per claim non supportati;
6. creare o aggiornare dati soltanto con autorizzazione esplicita;
7. validare responsive, tastiera, lightbox, metadata e route del case study;
8. autorizzare separatamente visibilità, featured state e deploy.

L'esistenza di un dossier non autorizza modifiche applicative, migrazioni, upload, pubblicazione o deploy.
