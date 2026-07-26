# Subscription Activation Runbook

**Uso:** eseguire soltanto quando l'utente decide di acquistare gli abbonamenti

## A. Prima dell'acquisto

- [ ] Beauty 1.1 archiviata.
- [ ] Professional Services preparata.
- [ ] Home & Local Services preparata.
- [ ] Carta/metodo di pagamento disponibili.
- [ ] Data di inizio del mese intensivo scelta.
- [ ] Calendario personale sufficientemente libero.
- [ ] Repository e account GitHub accessibili.
- [ ] Nessun progetto Lovable Beauty creato in anticipo.

## B. Attivazione

- [ ] Attivare il piano ChatGPT/Codex previsto per un solo mese.
- [ ] Attivare Lovable Pro per un solo mese.
- [ ] Non attivare Lovable Business.
- [ ] Non acquistare piano annuale.
- [ ] Disattivare ricariche automatiche non desiderate.
- [ ] Registrare data e ora di attivazione.
- [ ] Registrare data di rinnovo o scadenza.
- [ ] Salvare ricevute e condizioni.

Le caratteristiche e i prezzi effettivi devono essere verificati nel giorno dell'acquisto; non affidarsi a informazioni vecchie.

## C. Workspace Lovable

- [ ] Selezionare il workspace di proprietà corretto.
- [ ] Registrare nome e ID workspace.
- [ ] Registrare piano e saldo iniziale.
- [ ] Verificare chi ha accesso.
- [ ] Non collegare connettori non necessari.
- [ ] Non abilitare database per START.

## D. GitHub

- [ ] Creare `rito-studio-START`.
- [ ] Inserire i documenti approvati.
- [ ] Registrare branch principale.
- [ ] Verificare sincronizzazione Lovable prima di protezioni.
- [ ] Non creare ancora BUSINESS come progetto indipendente vuoto.

## E. Avvio START

- [ ] Cambiare `STATUS.md` in `IMPLEMENTATION_AUTHORIZED`.
- [ ] Registrare comando esplicito dell'utente.
- [ ] Usare `prompts/LOVABLE_START_PROMPT.md`.
- [ ] Allegare i documenti fondamentali, se il flusso lo consente.
- [ ] Non chiedere a Lovable di reinterpretare il design.
- [ ] Non abilitare backend, auth o Supabase.
- [ ] Salvare ID progetto e prima risposta.
- [ ] Registrare consumo dopo il primo passaggio.

## F. Guardrail consumi

Distribuzione interna consigliata del budget Beauty:

```text
30% prima costruzione START
20% correzioni strutturali START
15% polish approvato START
20% espansione BUSINESS
10% correzioni BUSINESS
5% buffer
```

È un guardrail percentuale, non una promessa sul numero di crediti.

- [ ] Registrare consumo a fine giornata.
- [ ] Evitare prompt vaghi e iterazioni decorative.
- [ ] Fermare Lovable quando Codex o Impeccable analizzano gli stessi file.
- [ ] Non usare il buffer per redesign non approvati.

## G. Stop immediato

Fermare il flusso quando:

- Lovable aggiunge backend non richiesto;
- cambia identità;
- installa dipendenze non motivate;
- modifica scope;
- genera contenuti inventati;
- introduce problemi di sicurezza;
- il consumo è anomalo;
- due strumenti stanno modificando gli stessi file.
