# Emanus — Development

Monorepo pnpm + TypeScript. Backend Express + Prisma; frontend (web React) vine în PR separat.

## Structură
```
packages/
  shared/   # @emanus/shared — model de date (sursa de adevăr, workbook §7) + CategoryConfig
  db/       # @emanus/db — schema Prisma (Postgres)
apps/
  api/      # @emanus/api — Express API (in-memory în Faza 1)
```

## Cerințe
- Node >= 20
- pnpm >= 9
- (Faza 1.5+) PostgreSQL, pentru Prisma

## Pornire rapidă (Faza 1 — fără DB)
```bash
pnpm install
pnpm --filter @emanus/shared build   # construiește tipurile partajate
pnpm dev                             # pornește API-ul pe :3000
```

## Endpoints disponibile (Faza 1)
- `GET  /health`
- `GET  /public/first-lesson`         → prima lecție (gratis, fără cont)
- `GET  /categories`                  → cele 7 categorii + config
- `GET  /categories/:id/tree`         → module → cursuri → lecții
- `GET  /lessons/:id`                  → lecția cu pași
- `POST /lessons/:id/progress`         → status + reward (XP/insignă/axe)

Exemplu:
```bash
curl localhost:3000/public/first-lesson
curl localhost:3000/categories/teens12_18/tree
```

## Următorii pași (roadmap, workbook §16)
1. Cablare Prisma/Postgres + migrare + import seed în DB.
2. Player de lecție (frontend web) pe cele 12 beat-uri + ramificații.
3. Gamificare + radar 6 axe + dashboard.
4. Onboarding + diagnostic + prima lecție publică + deep links.
5. Comunitate + moderare + protocol de criză.
6. Replicare pe restul categoriilor prin `CategoryConfig`.
