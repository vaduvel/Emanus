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

## Publicarea conținutului

Conținutul editorial rămâne versionat în Git, dar aplicația de producție îl
livrează din Supabase:

- `content_manifests` păstrează catalogul activ, versionat atomic;
- `content_lessons` păstrează fiecare lecție separat;
- browserul descarcă numai lecția deschisă și o păstrează pentru offline;
- fișierele din `packages/shared/src/paths` și `packages/shared/src/library`
  rămân sursa editorială și fallback-ul local verificabil.

Prima configurare:

```bash
supabase login
supabase link --project-ref <PROJECT_REF>
supabase db push
pnpm content:publish
```

După orice modificare de curs:

```bash
pnpm generate:content-manifest
pnpm validate:content-release
pnpm content:publish
```

`content:publish` cere `SUPABASE_URL` și
`SUPABASE_SECRET_KEY`/`SUPABASE_SERVICE_ROLE_KEY` în `.env`. Cheia secretă nu
intră niciodată în `apps/web`. CI verifică manifestul, toate țintele de ramură
și payload-urile obligatorii înainte ca un release să poată fi publicat.

## Endpoints (Faza 1)
- `GET /health`
- `GET /public/first-lesson`
- `GET /categories`
- `GET /categories/:id/tree`
- `GET /lessons/:id`
- `POST /lessons/:id/progress`

## Mobil (iOS & Android)
Vezi `apps/mobile/README.md`: `build web` → `cap add ios/android` → `cap sync` → deschide în Xcode/Android Studio.

## Starea runtime

1. Player conversațional: ramuri, selecție unică/multiplă, quiz, răspuns liber,
   declarație, reluare după închiderea aplicației.
2. Conținut: release atomic Supabase, cache la deschiderea lecției, fallback
   local și audit editorial automat.
3. Navigare: `Azi · Biblia · Întreabă · Ai mei · Eu`.
4. Fără XP, streak, nivel sau scor spiritual în experiența activă.
5. Comunitatea și mentoratul rămân blocate până există operare umană și
   proceduri de siguranță reale.
