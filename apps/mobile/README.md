# @emanus/mobile — shell Capacitor (iOS & Android)

Același codebase web (`apps/web`), împachetat ca aplicație nativă pentru App Store și Play Store (vezi `DECISIONS.md` D-007).

## Cerințe
- Pentru iOS: macOS + Xcode.
- Pentru Android: Android Studio + JDK.

## Pași
```bash
# 1) Construiește web-ul (generează apps/web/dist)
pnpm --filter @emanus/web build

# 2) Adaugă platformele (o singură dată)
pnpm --filter @emanus/mobile add:ios
pnpm --filter @emanus/mobile add:android

# 3) Copiază build-ul web în proiectele native
pnpm --filter @emanus/mobile sync

# 4) Deschide în IDE-ul nativ pentru rulare/semnare
pnpm --filter @emanus/mobile open:ios
pnpm --filter @emanus/mobile open:android
```

> La build-ul de mobil, setează `VITE_API_URL` (în `apps/web/.env`) către URL-ul public al API-ului — pe telefon nu există proxy-ul din dev.
