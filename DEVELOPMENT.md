# Emanus — Development

Monorepo pnpm + TypeScript. Backend Express + Prisma; frontend web React ca **PWA**; mobil prin **Capacitor** (iOS + Android) din același build web.

## Structură
```
packages/
  shared/   # @emanus/shared — model de date (sursa de adevăr, §7) + CategoryConfig
  db/       # @emanus/db — schema Prisma (Postgres)
apps/
  api/      # @emanus/api — Express API (in-memory în Faza 1)
  web/      # @emanus/web — React PWA (Vite) + player de lecție
  mobile/   # @emanus/mobile — shell Capacitor (App Store / Play Store)
```

## Cerințe
- Node >= 20, pnpm >= 9
- (Faza 1.5+) PostgreSQL pentru Prisma
- (mobil) Xcode pentru iOS, Android Studio pentru Android

## Pornire rapidă (Faza 1 — fără DB)
```bash
pnpm install
pnpm --filter @emanus/shared build   # tipurile partajate (necesare pentru api + web)

# în două terminale:
pnpm dev:api   # API pe :3000
pnpm dev:web   # PWA pe :5173 (proxy /api -> :3000)
```
Deschide http://localhost:5173 — se încarcă prima lecție din API.

## Endpoints (Faza 1)
- `GET /health`
- `GET /public/first-lesson`
- `GET /categories`
- `GET /categories/:id/tree`
- `GET /lessons/:id`
- `POST /lessons/:id/progress`

## Mobil (iOS & Android)
Vezi `apps/mobile/README.md`. Pe scurt: `build web` → `cap add ios/android` → `cap sync` → deschide în Xcode/Android Studio.

## Următorii pași (roadmap, workbook §16)
1. Cablare Prisma/Postgres + migrare + import seed în DB.
2. Player complet pe cele 12 beat-uri + ramificații (branching pe `choice`).
3. Gamificare + radar 6 axe + dashboard.
4. Onboarding + diagnostic + prima lecție publică + deep links.
5. Comunitate + moderare + protocol de criză.
6. Replicare pe restul categoriilor prin `CategoryConfig`.
