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
- Pentru Faza 1, API-ul servește conținut dintr-un store **in-memory** încărcat din seed-ul partajat.
- Prisma/Postgres (Supabase) s-a cablat în Faza 1.5. Store-ul comută automat: dacă `DATABASE_URL` e setat, citește din DB; altfel in-memory.

## D-004 · Seed conținut
- Seed inclus: Adolescenți → Modul 1 (`identity`) → Curs 1.1 „Cine sunt eu, de fapt?".
- **L1 „Nu ești ce zic like-urile" = conținut complet** (din workbook §13), inclusiv un pas de ramificație (`l1_branch_c`).
- **L2–L6 = doar metadate + pași DRAFT.** Conținutul integral trebuie importat din sursa aprobată (pagina „Cursul 1.1" din Notion). NU se inventează teologie/versete (workbook §18).

## D-005 · Guardrails moștenite din workbook §15/§18
- Biblia = adevărul; versetele-ancoră aprobate nu se schimbă.
- Protocol de criză (112 / 116 111 / 116 123), moderare comunitate, GDPR minori — de implementat în Fazele 4–5.
- Fără reclame/tracking pe minori.

## D-006 · Jocuri (mini-scene)
- În afara scope-ului fundației. Vor fi un tip nou `interactive_scene` în `LessonStep`, livrat cu HTML5 (Phaser/PixiJS) — nu Unreal (cerințe <2s / offline / deep links, §15). Rulează nativ în PWA. Spec separat.

## D-007 · PWA + mobil (iOS & Android)
**Decizie:** un singur codebase React (Vite) construit ca **PWA** (manifest + service worker), împachetat pentru magazine cu **Capacitor**.
- **Web + Android install:** PWA (installable, offline pe lecția curentă, push).
- **Play Store / App Store:** Capacitor împachetează același cod. Pe iOS e necesar fiindcă PWA are limitări (push restrâns, fără background real).
- **De ce NU React Native/Flutter:** conținut de tip chat scriptat + web games HTML5, nu UI nativ greu. PWA + Capacitor = un singur cod, mentenanță minimă.
- **Structură:** `apps/web` (React PWA) + `apps/mobile` (shell Capacitor).

## D-008 · Supabase (Postgres gestionat)
**Decizie:** Supabase = baza de date Postgres a platformei, accesată prin **Prisma**.
- `DATABASE_URL` = conexiune *pooled* (PgBouncer, port 6543) pentru runtime.
- `DIRECT_URL` = conexiune directă (port 5432) pentru migrări Prisma (`directUrl` în schema).
- Secretele stau doar în `.env` (gitignored) / în mediul agentului desktop; niciodată în cod sau în client.

**Opțional în fazele următoare (de decis):** Supabase Auth (Google/OTP/email, §14); Supabase Storage pentru media (§14); RLS pentru jurnalele private și datele minorilor (§15).

## D-009 · Monetizare — donații-first (nu paywall dur)
**Decizie — accesul la conținut e liber; susținerea e prin dăruire:**
- **Tot conținutul de bază rămâne gratuit.** Fără lecții blocate în spatele plății (misiune + cultură RO/evanghelică).
- **Donații** recurente și one-time, discrete, după momente de valoare; niciodată popup agresiv.
- **Pay-it-forward:** un donator poate plăti acces/sprijin pentru altcineva.
- **Fără reclame și fără tracking, mai ales pe minori** (§18).
- **Upside comercial:** diaspora română + potențial export/licențiere; piața internă pe donații + impact.
- Suport tehnic (Faza 7): procesator de plăți (ex. Stripe), model `Donation`, pagină „unde merg banii".

## D-010 · Utilizator demo + gamificare (Faza 3, pre-auth)
**Context:** Auth real vine în Faza 4 (§9). Faza 3 (gamificare + radar + dashboard) are nevoie de un „user" ca să persiste XP/streak/insigne și scorurile de creștere.

**Decizie:**
- Fără auth încă: cererile folosesc un utilizator identificat prin header `x-user-id`; dacă lipsește, se folosește `demo-user` (constanta `DEMO_USER_ID` din `@emanus/shared`). La prima atingere, user + GamState + GrowthScore baseline se creează automat.
- **Gamificare (§8):** XP +10/lecție; bonus +20 la absolvire de modul (dedus din reward cu `certificateId`/`unlocksModuleId`); nivel la fiecare 100 XP (`levelForXp`).
- **Streak:** zile consecutive; aceeași zi nu incrementează; grace de 1 zi; 2+ zile lipsă → reset la 1.
- **Radar (§10):** 6 axe, baseline implicit 20; `axisDeltas` din reward se adaugă la `current` (clamp 0..100). Reevaluarea formală (0.5*selfReport+0.3*moduleReview+0.2*behaviorSignal) rămâne pentru diagnostic/review (Faza 4).
- Engine-ul (XP/streak/growth/dashboard) stă în `@emanus/shared` (pur, testabil); persistența (DB sau in-memory) doar apelează funcțiile pure.

**Endpoints noi:** `POST /lessons/:id/progress` (aplică reward real), `GET /me/dashboard`, `GET /me/growth`.

**De înlocuit în Faza 4:** `demo-user` → utilizator real din Supabase Auth (D-008).
