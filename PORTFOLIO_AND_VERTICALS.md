# Tretnix Portfolio and Verticals

**Versione:** 1.0
**Aggiornato:** 26 luglio 2026
**Stato:** canonico per mappa del portfolio, lifecycle e gate; le specifiche di famiglia restano nei documenti dedicati

---

## 1. Scopo

Questo documento registra:

- i verticali Tretnix approvati o in preparazione;
- la relazione tra famiglia, piano e progetto concreto;
- gli stati operativi ammessi;
- i gate che autorizzano consumo di crediti, creazione di repository, pubblicazione e passaggio di piano;
- ciò che è confermato, pianificato o ancora non formalizzato.

Non sostituisce:

- la specifica completa di una famiglia;
- la documentazione locale di un progetto;
- lo stato dettagliato nel repository del progetto;
- le GitHub Issues;
- un’autorizzazione esplicita del fondatore.

---

## 2. Definizioni

### Verticale

Una famiglia commerciale e progettuale rivolta a un insieme coerente di attività, bisogni, contenuti e pattern.

### Piano

Il livello dell’offerta:

- `START`;
- `BUSINESS`;
- `BUSINESS PLUS`;
- `CUSTOM`;
- `INTERNO`.

### Progetto

Un’implementazione concreta appartenente a un verticale e a un piano, con identità, specifica, repository, stato e verifiche propri.

### Baseline approvata

Il commit o pacchetto documentale da cui deriva il lavoro successivo. Una baseline non si identifica tramite il solo nome di una chat o di un file storico.

---

## 3. Lifecycle standard

Gli stati operativi ammessi sono:

```text
DISCOVERY
SPECIFICATION_DRAFT
SPECIFICATION_APPROVED
PREPARATION_COMPLETE
IMPLEMENTATION_NOT_STARTED
IMPLEMENTATION_ACTIVE
QA_ACTIVE
RELEASED
FROZEN
ARCHIVED
```

Regole:

- ogni stato deve avere una fonte e una data;
- `PREPARATION_COMPLETE` non autorizza automaticamente l’implementazione;
- `IMPLEMENTATION_NOT_STARTED` vieta di descrivere il progetto come esistente, costruito o pubblicato;
- `RELEASED` richiede evidenza di deploy e verifica;
- `FROZEN` consente modifiche soltanto per bug, regressioni, sicurezza o requisiti approvati;
- un progetto pianificato non viene inserito tra le repository attuali finché la repository non esiste realmente;
- una demo non viene presentata come cliente reale.

---

## 4. Portfolio corrente

| Verticale | Stato della famiglia | Progetti confermati | Stato operativo |
|---|---|---|---|
| Food & Hospitality | operativo e documentato | Forno Lume START; Forno Lume BUSINESS | START congelato; BUSINESS verificato fino al Package C, Package D separato |
| Beauty & Wellness | specifica v1.1 approvata e congelata; governance canonica parziale in repository | RITO Studio START | `PREPARATION_COMPLETE`; `IMPLEMENTATION_NOT_STARTED` |
| Professional Services | famiglia e pacchetto di preparazione segnalati nelle conversazioni di progetto; contenuti completi non ancora acquisiti nella baseline verificata | nessuna repository dichiarata | non autorizzata all’implementazione |
| Home & Local Services | famiglia e pacchetto di preparazione segnalati nelle conversazioni di progetto; contenuti completi non ancora acquisiti nella baseline verificata | nessuna repository dichiarata | non autorizzata all’implementazione |

Le ultime due righe registrano l’esistenza del lavoro dichiarato, non ne ricostruiscono requisiti, copy o design senza i relativi artefatti sorgente.

---

## 5. Food & Hospitality

La famiglia Food & Hospitality è documentata in:

```text
HOSPITALITY_FAMILY.md
```

Stato sintetico:

```text
Forno Lume START
└── RELEASED + FROZEN
    └── Forno Lume BUSINESS
        └── RELEASED fino al Package C
            └── Package D separato e pendente
```

Le baseline, i pattern canonici e le policy demo sono registrati nei documenti esistenti. Questo documento non li duplica.

---

## 6. Beauty & Wellness

La famiglia Beauty & Wellness usa come specifica approvata la versione `v1.1` definita nel development pack del 25 luglio 2026.

Regole già confermate:

- la specifica `v1.1` è approvata e congelata;
- il primo progetto è `RITO Studio START`;
- non reinterpretare liberamente identità, struttura, copy, responsive o motion;
- non iniziare `BUSINESS` prima dell’approvazione, verifica e congelamento di `START`;
- il passaggio a un piano superiore è evolutivo, non un redesign estraneo;
- i dettagli completi devono essere acquisiti dal development pack, non ricostruiti da memoria o chat parziali.

Il contratto operativo disponibile è in:

```text
BEAUTY_WELLNESS_FAMILY.md
```

---

## 7. RITO Studio START

### Identificazione

| Campo | Valore |
|---|---|
| Nome progetto | `RITO Studio START` |
| Verticale | Beauty & Wellness |
| Piano | START |
| Stato preparazione | `PREPARATION_COMPLETE` |
| Stato implementazione | `IMPLEMENTATION_NOT_STARTED` |
| Repository remota | non creata / non dichiarata |
| Deploy | non creato / non dichiarato |
| Lovable project | non creato |

### Gate obbligatori prima dell’avvio

Entrambi i gate devono essere soddisfatti:

1. il fondatore conferma che l’abbonamento Lovable è attivo;
2. il fondatore autorizza esplicitamente l’avvio di `RITO Studio START`.

Finché manca anche un solo gate, è vietato:

- creare il progetto Lovable;
- consumare crediti Lovable;
- creare o modificare repository remote per il progetto;
- pubblicare una demo o un deploy;
- iniziare `RITO Studio BUSINESS`;
- sostituire la specifica approvata con un redesign o con requisiti inventati.

### Avvio autorizzato

Dopo i due gate, il task di avvio deve comunque registrare:

- specifica e versione sorgente;
- baseline documentale;
- obiettivo del primo pass;
- vincoli;
- criteri di accettazione;
- verifiche;
- output richiesto;
- checkpoint Git previsto;
- stato iniziale e stato finale consentito.

---

## 8. Evoluzione dei piani

Pattern generale:

```text
specifica approvata
↓
START
↓
verifica, remediation e approvazione
↓
freeze della baseline START
↓
BUSINESS
↓
verifica, remediation e approvazione
↓
BUSINESS PLUS, quando previsto
```

Principi:

- il piano superiore deriva dalla baseline approvata del piano precedente;
- identità, palette, tipografia, trattamento visivo, motion e componenti approvati vengono preservati;
- architettura informativa, route, contenuti, SEO e funzionalità possono espandersi;
- correzioni tecniche trasferibili devono essere verificate per pattern;
- non dichiarare una repository intera canonica per ogni aspetto;
- ogni nuovo piano usa un task e una branch separati.

---

## 9. Separazione tra stato, decisione e specifica

| Informazione | Destinazione canonica |
|---|---|
| decisione permanente | `DECISIONS.md` |
| mappa dei verticali e lifecycle | questo documento |
| specifica di famiglia | documento della famiglia |
| progetto/repository esistente | `REPOSITORY_INDEX.md` |
| stato trasversale sintetico | `CURRENT_STATE.md` |
| stato dettagliato del progetto | repository del progetto, `docs/STATUS.md` |
| task, bug e finding aperti | GitHub Issues / audit / roadmap |
| artefatti sorgente non ancora acquisiti | `SOURCE_ARTIFACT_REGISTER.md` |

---

## 10. Criterio di completezza

Una famiglia è completamente migrata fuori dalle chat soltanto quando:

- la specifica integrale è versionata;
- le decisioni sono registrate;
- il primo progetto e il suo stato sono registrati;
- i gate sono espliciti;
- gli artefatti sorgente sono accessibili e verificabili;
- i task residui sono in issue o roadmap;
- gli adattatori degli strumenti sono sincronizzati.

La sola presenza del nome del verticale non soddisfa questo criterio.
