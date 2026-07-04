# DECISIONS — Emanus

Arhitectural Decision Record. Conform workbook §4 („o singură bază de cod, comportament diferit prin `CategoryConfig`") și regulii: dacă un detaliu lipsește, se alege opțiunea cea mai simplă/standard și se notează aici.

## D-001 · Stack
- **Monorepo** cu pnpm workspaces + TypeScript peste tot.
- **Backend:** Node + TypeScript + Express (endorsat de workbook §14). Prisma + PostgreSQL pentru persistență.
- **Shared domain package** (`@emanus/shared`) = sursa unică de adevăr pentru tipuri (workbook §7). Backend + (viitor) frontend le importă.
- **Frontend:** web-first cu React (Vite) în PR-ul următor (deep links din TikTok, prima lecție fără cont). React Native ulterior.
- Motiv: standard, ușor de rulat pe M1, aliniat cu §14.

## D-002 · Engine FIX + config
- `LessonStep` cu cele 14 tipuri din §6 este parte din engine-ul comun.
- Categoriile se adaugă prin `CategoryConfig` (date), nu cod nou (regula de aur §4).

## D-003 · API rulabil din prima zi (in-memory)
- Pentru Faza 1, API-ul servește conținut dintr-un store **in-memory** încărcat din `apps/api/src/seed/*.json`.
- Prisma/Postgres se cablează în Faza 1.5 (schema există deja). Motiv: feedback rapid fără infra.

## D-004 · Seed conținut
- Seed inclus: Adolescenți → Modul 1 (`identity`) → Curs 1.1 „Cine sunt eu, de fapt?".
- **L1 „Nu ești ce zic like-urile" = conținut complet** (din workbook §13).
- **L2–L6 = doar metadate + pași DRAFT.** Conținutul integral trebuie importat din sursa aprobată (pagina „Cursul 1.1" din Notion). NU se inventează teologie/versete (workbook §18).

## D-005 · Guardrails moștenite din workbook §15/§18
- Biblia = adevărul; versetele-ancoră aprobate nu se schimbă.
- Protocol de criză (112 / 116 111 / 116 123), moderare comunitate, GDPR minori — de implementat în Fazele 4–5.
- Fără reclame/tracking pe minori.

## D-006 · Jocuri (mini-scene)
- În afara scope-ului acestui PR. Vor fi un tip nou `interactive_scene` în `LessonStep`, livrat cu HTML5 (Phaser/PixiJS) — nu Unreal (cerințe <2s / offline / deep links, §15). Spec separat.
