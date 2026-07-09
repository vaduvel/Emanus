# Emanus — Development

Monorepo pnpm + TypeScript. Backend Express + Prisma (Supabase Postgres); frontend web React ca **PWA**; mobil prin **Capacitor** (iOS + Android) din același build web.

## Structură
```
packages/
  shared/   # @emanus/shared — model de date (§7) + CategoryConfig + seed partajat
  db/       # @emanus/db — Prisma (schema + client + repo + seed) pentru Supabase
apps/
  api/      # @emanus/api — Express API (DB dacă DATABASE_URL e setat, altfel in-memory)
  web/      # @emanus/web — React PWA (Vite) + player de lecție
  mobile/   # @emanus/mobile — shell Capacitor (App Store / Play Store)
```

## Cerințe
- Node >= 20, pnpm >= 9
- PostgreSQL prin Supabase (vezi `packages/db/README.md`)
- (mobil) Xcode pentru iOS, Android Studio pentru Android

## Pornire rapidă (dev fără DB — in-memory)
```bash
pnpm install
pnpm --filter @emanus/shared build
pnpm dev:api   # API pe :3000 (in-memory dacă nu există DATABASE_URL)
pnpm dev:web   # PWA pe :5173 (proxy /api -> :3000)
```

## Cu Supabase (DB real)
```bash
cp .env.example .env            # completează DATABASE_URL + DIRECT_URL din Supabase
pnpm --filter @emanus/shared build
pnpm --filter @emanus/db generate
pnpm --filter @emanus/db migrate   # creează tabelele în Supabase
pnpm --filter @emanus/db seed      # populează categorii + conținut seed
pnpm dev:api                       # acum citește din Supabase
```
Detalii și unde găsești connection string-urile: `packages/db/README.md`.

## Endpoints (Faza 1)
- `GET /health`
- `GET /public/first-lesson`
- `GET /categories`
- `GET /categories/:id/tree`
- `GET /lessons/:id`
- `POST /lessons/:id/progress`

## Mobil (iOS & Android)
Vezi `apps/mobile/README.md`: `build web` → `cap add ios/android` → `cap sync` → deschide în Xcode/Android Studio.

## Următorii pași (roadmap, workbook §16)
1. ✅ Fundație: model de date, CategoryConfig, seed, API + PWA, DB Supabase.
2. Player complet pe cele 12 beat-uri + ramificații (branching pe `choice`).
3. Gamificare + radar 6 axe + dashboard.
4. Onboarding + diagnostic + prima lecție publică + deep links.
5. Comunitate + moderare + protocol de criză.
6. Replicare pe restul categoriilor prin `CategoryConfig`.
