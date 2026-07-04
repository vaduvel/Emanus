# DECISIONS — Emanus

Arhitectural Decision Record. Conform workbook §4 („o singură bază de cod, comportament diferit prin `CategoryConfig`") și regulii: dacă un detaliu lipsește, se alege opțiunea cea mai simplă/standard și se notează aici.

## D-001 · Stack
- **Monorepo** cu pnpm workspaces + TypeScript peste tot.
- **Backend:** Node + TypeScript + Express (endorsat de workbook §14). Prisma + PostgreSQL pentru persistență.
- **Shared domain package** (`@emanus/shared`) = sursa unică de adevăr pentru tipuri (workbook §7). Backend + frontend le importă.
- **Frontend:** **un singur codebase web-first — React (Vite) ca PWA**, care acoperă web + mobil. Vezi D-007 pentru împachetarea în aplicații iOS/Android.
- Motiv: standard, ușor de rulat pe M1, aliniat cu §14, și ideal pentru conținut de tip chat scriptat cu deep links.

## D-002 · Engine FIX + config
- `LessonStep` cu cele 14 tipuri din §6 este parte din engine-ul comun.
- Categoriile se adaugă prin `CategoryConfig` (date), nu cod nou (regula de aur §4).

## D-003 · API rulabil din prima zi (in-memory)
- Pentru Faza 1, API-ul servește conținut dintr-un store **in-memory** încărcat din `apps/api/src/seed/*.json`.
- Prisma/Postgres (Supabase) se cablează în Faza 1.5 (schema există deja). Motiv: feedback rapid fără infra.

## D-004 · Seed conținut
- Seed inclus: Adolescenți → Modul 1 (`identity`) → Curs 1.1 „Cine sunt eu, de fapt?".
- **L1 „Nu ești ce zic like-urile" = conținut complet** (din workbook §13).
- **L2–L6 = doar metadate + pași DRAFT.** Conținutul integral trebuie importat din sursa aprobată (pagina „Cursul 1.1" din Notion). NU se inventează teologie/versete (workbook §18).

## D-005 · Guardrails moștenite din workbook §15/§18
- Biblia = adevărul; versetele-ancoră aprobate nu se schimbă.
- Protocol de criză (112 / 116 111 / 116 123), moderare comunitate, GDPR minori — de implementat în Fazele 4–5.
- Fără reclame/tracking pe minori.

## D-006 · Jocuri (mini-scene)
- În afara scope-ului PR-ului de fundație. Vor fi un tip nou `interactive_scene` în `LessonStep`, livrat cu HTML5 (Phaser/PixiJS) — nu Unreal (cerințe <2s / offline / deep links, §15). Rulează nativ în PWA. Spec separat.

## D-007 · PWA + mobil (iOS & Android)
**Cerință:** produsul trebuie să fie PWA, să meargă pe web și mobil, și să existe ca aplicație iOS și Android.

**Decizie:** un singur codebase React (Vite) construit ca **PWA** (manifest + service worker), împachetat pentru magazine cu **Capacitor**.
- **Web + Android install:** PWA acoperă foarte bine (installable, offline pe lecția curentă, push).
- **Play Store:** Capacitor (sau TWA) împachetează același cod ca APK/AAB.
- **App Store (iOS):** Capacitor împachetează pentru submit în App Store. Necesar fiindcă PWA pe iOS are limitări (instalare doar din Safari, push abia din iOS 16.4+ și restrâns, fără background real).
- **Offline:** service worker cache-uiește app shell + lecția curentă (§15).
- **Deep links:** rute web + Universal Links (iOS) / App Links (Android) (§1).

**De ce NU React Native/Flutter:** aplicația e conținut de tip chat scriptat + web games HTML5, nu UI nativ greu. PWA + Capacitor = un singur cod, mentenanță minimă.

**Structură:** `apps/web` (React PWA) + `apps/mobile` (shell Capacitor).

## D-008 · Supabase (Postgres gestionat)
**Context:** avem cont și proiect Supabase.

**Decizie:** Supabase = baza de date Postgres a platformei, accesată prin **Prisma**.
- `DATABASE_URL` = conexiune *pooled* (PgBouncer, port 6543) pentru runtime.
- `DIRECT_URL` = conexiune directă (port 5432) pentru migrări Prisma (`directUrl` în schema).
- Secretele stau doar în `.env` (gitignored) / în mediul agentului desktop; niciodată în cod sau în client.

**Opțional în fazele următoare (de decis):**
- **Supabase Auth** pentru Google/OTP/email (§14) — economisește mult față de JWT propriu.
- **Supabase Storage** (S3-compatible) pentru media lecțiilor (§14).
- **RLS (Row Level Security)** pentru jurnalele private și datele minorilor (§15).

## D-009 · Monetizare — donații-first (nu paywall dur)
**Context:** workbook §7 sugera freemium (conversie 3–8%) + donații + pay-it-forward. Fondatorul a decis modelul principal: **donații**, nu paywall clasic.

**Decizie — accesul la conținut e liber; susținerea e prin dăruire:**
- **Tot conținutul de bază rămâne gratuit.** Fără lecții blocate în spatele plății. Motiv: se potrivește misiunii (Evanghelia nu se vinde) și culturii RO/evanghelice (așteptarea că un mesaj de credință e gratis; românul plătește greu abonamente).
- **Donații** recurente și one-time, opționale, niciodată intruzive. Prompt discret după momente de valoare (final de lecție/modul/certificat), nu popup agresiv.
- **Pay-it-forward:** un donator poate „plăti mai departe" acces/sprijin pentru altcineva (mecanism nativ cultural în comunitățile de credință). Se leagă de `parentLink`/referral din §1.
- **Fără reclame și fără tracking, mai ales pe minori** (non-negociabil, D-005 / §18). Donațiile sunt singura logică de venit pe zona de minori.

**De susținut tehnic (faze ulterioare, Faza 7):**
- Integrare procesator de plăți (ex. Stripe) pentru donații recurente/one-time; chitanțe.
- Model de date: `Donation` (userId?, amount, currency, recurring, status, forwardedToUserId?), `SupporterState` (badge de susținător, opțional și discret).
- Transparență: pagină „unde merg banii" pentru încredere.

**Upside comercial (din discuția de strategie):** cea mai bună țintă de venit e **diaspora română** (willingness-to-pay mai mare) + potențial export/licențiere; piața internă rămâne pe donații + impact.

**Ce NU facem:** paywall dur pe lecții, abonament obligatoriu ca să continui un curs, reclame, vânzare de date.
