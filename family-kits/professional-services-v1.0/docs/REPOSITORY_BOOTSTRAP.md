# QUADRA Studio — Repository Bootstrap

**Versione:** 1.0  
**Stato:** procedura pronta; repository non creati

## 1. Repository

```text
quadra-studio-START
quadra-studio-BUSINESS
```

Alternativa:

```text
professional-quadra-START
professional-quadra-BUSINESS
```

Non cambiare naming dopo avvio senza aggiornare riferimenti.

## 2. START — documenti

```text
README.md
AGENTS.md
docs/
├── PRODUCT.md
├── DESIGN.md
├── CONTENT.md
├── ROUTES.md
├── ANIMATIONS.md
├── TESTING.md
├── DECISIONS.md
├── STATUS.md
├── COMMERCIAL_OFFER.md
├── VERTICAL_ADAPTERS.md
├── CLIENT_DISCOVERY.md
├── ASSET_PLAN.md
└── START_BUSINESS_CONTRACT.md
```

## 3. Branch

```text
main
feature/initial-build
fix/*
audit/*
polish/*
docs/*
```

Lovable e strumenti locali non modificano contemporaneamente gli stessi file.

## 4. Sequenza START

```text
specifica
→ Lovable
→ GitHub
→ stop Lovable
→ audit
→ finding approvati
→ correzioni
→ QA
→ PR
→ merge
→ tag professional-start-v1.0
```

## 5. Commit consigliati

```text
docs: add approved Professional START specification
feat: build initial QUADRA Studio START
fix: address approved START audit findings
polish: refine approved Professional visual details
docs: freeze Professional START baseline
```

## 6. BUSINESS

Creare BUSINESS dal commit canonico START, tramite clone/remix controllato. Non da progetto vuoto.

```text
feat: derive QUADRA BUSINESS from START baseline
feat: add expertise and sector routes
feat: add professionals and insights
feat: add qualified consultation flow
fix: address BUSINESS consolidation findings
docs: freeze Professional BUSINESS baseline
```

## 7. Tag

```text
professional-start-v1.0
professional-business-v1.0
```

## 8. Gate

Prima di START:

- abbonamenti;
- workspace;
- saldo;
- comando esplicito;
- STATUS `IMPLEMENTATION_AUTHORIZED`.

Prima di BUSINESS:

- SHA START;
- tag;
- QA;
- contratto;
- nuova autorizzazione.

## 9. Remote

Nessun repository remoto viene creato durante la preparazione offline.
