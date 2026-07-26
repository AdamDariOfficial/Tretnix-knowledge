# NODO Servizi — Repository Bootstrap

**Versione:** 1.0  
**Stato:** procedura pronta; repository non creati

## 1. Repository

```text
nodo-servizi-START
nodo-servizi-BUSINESS
```

## 2. Documenti

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

## 4. START

```text
specifica
→ Lovable
→ GitHub
→ stop Lovable
→ audit
→ finding approvati
→ fix
→ QA
→ PR
→ merge
→ tag home-services-start-v1.0
```

## 5. Commit

```text
docs: add approved Home Services START specification
feat: build initial NODO Servizi START
fix: address approved START audit findings
polish: refine approved Home Services details
docs: freeze Home Services START baseline
```

## 6. BUSINESS

Derivare dal commit START.

```text
feat: derive NODO BUSINESS from START baseline
feat: add service and sector routes
feat: add projects and coverage routes
feat: add qualified quote request
fix: address BUSINESS consolidation findings
docs: freeze Home Services BUSINESS baseline
```

## 7. Tag

```text
home-services-start-v1.0
home-services-business-v1.0
```

## 8. Gate

Prima START:

- abbonamenti;
- workspace;
- saldo;
- comando;
- STATUS `IMPLEMENTATION_AUTHORIZED`.

Prima BUSINESS:

- SHA/tag START;
- QA;
- contratto;
- autorizzazione.

## 9. Remote

Nessun repository remoto durante preparazione.
