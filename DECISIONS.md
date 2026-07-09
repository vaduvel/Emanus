# DECISIONS — Emanus

Arhitectural Decision Record. Conform workbook §4 („o singură bază de cod, comportament diferit prin `CategoryConfig`") și regulii: dacă un detaliu lipsește, se alege opțiunea cea mai simplă/standard și se notează aici.

## D-001 · Stack
- **Monorepo** cu pnpm workspaces + TypeScript peste tot.
- **Backend:** Node + TypeScript + Express (endorsat de workbook §14). Prisma + PostgreSQL pentru persistență.
- **Shared domain package** (`@emanus/shared`) = sursa unică de adevăr pentru tipuri (workbook §7). Backend + frontend le importă.
- **Frontend:** un singur codebase web-first — React (Vite) ca PWA, care acoperă web + mobil. Vezi D-007.
- Motiv: standard, ușor de rulat pe M1, aliniat cu §14, și ideal pentru conținut de tip chat scriptat cu deep links.

## D-002 · Engine FIX + config
- `LessonStep` cu cele 14 tipuri din §6 este parte din engine-ul comun.
- Categoriile se adaugă prin `CategoryConfig` (date), nu cod nou (regula de aur §4).

## D-003 · API rulabil din prima zi (in-memory)
- Pentru Faza 1, API-ul servește conținut dintr-un store in-memory încărcat din seed-ul partajat.
- Prisma/Postgres (Supabase) s-a cablat în Faza 1.5. Store-ul comută automat: dacă `DATABASE_URL` e setat, citește din DB; altfel in-memory.

## D-004 · Seed conținut
- Seed inclus: Adolescenți → Modul 1 (`identity`) → Curs 1.1 „Cine sunt eu, de fapt?".
- L1 „Nu ești ce zic like-urile" = conținut complet (din workbook §13), inclusiv un pas de ramificație (`l1_branch_c`).
- L2–L6 = doar metadate + pași DRAFT. Conținutul integral trebuie importat din sursa aprobată (pagina „Cursul 1.1" din Notion). NU se inventează teologie/versete (workbook §18).

## D-005 · Guardrails moștenite din workbook §15/§18
- Biblia = adevărul; versetele-ancoră aprobate nu se schimbă.
- Protocol de criză (112 / 116 111 / 116 123), moderare comunitate, GDPR minori — implementate începând cu Faza 5 (D-012).
- Fără reclame/tracking pe minori.

## D-006 · Jocuri (mini-scene)
- În afara scope-ului fundației. Vor fi un tip nou `interactive_scene` în `LessonStep`, livrat cu HTML5 (Phaser/PixiJS) — nu Unreal (cerințe <2s / offline / deep links, §15). Rulează nativ în PWA. Spec separat.

## D-007 · PWA + mobil (iOS & Android)
**Decizie:** un singur codebase React (Vite) construit ca PWA (manifest + service worker), împachetat pentru magazine cu Capacitor.
- Web + Android install: PWA (installable, offline pe lecția curentă, push).
- Play Store / App Store: Capacitor împachetează același cod. Pe iOS e necesar fiindcă PWA are limitări.
- De ce NU React Native/Flutter: conținut de tip chat scriptat + web games HTML5, nu UI nativ greu. PWA + Capacitor = un singur cod.
- Structură: `apps/web` (React PWA) + `apps/mobile` (shell Capacitor).

## D-008 · Supabase (Postgres gestionat)
**Decizie:** Supabase = baza de date Postgres a platformei, accesată prin Prisma.
- `DATABASE_URL` = conexiune pooled (PgBouncer, port 6543) pentru runtime.
- `DIRECT_URL` = conexiune directă (port 5432) pentru migrări Prisma (`directUrl` în schema).
- Secretele stau doar în `.env` (gitignored) / în mediul agentului desktop; niciodată în cod sau în client.

**Opțional în fazele următoare:** Supabase Auth (§14); Supabase Storage pentru media (§14); RLS pentru jurnalele private și datele minorilor (§15).

## D-009 · Monetizare — donații-first (nu paywall dur)
- Tot conținutul de bază rămâne gratuit. Fără lecții blocate în spatele plății.
- Donații recurente și one-time, discrete, după momente de valoare; niciodată popup agresiv.
- Pay-it-forward: un donator poate plăti acces/sprijin pentru altcineva.
- Fără reclame și fără tracking, mai ales pe minori (§18).
- Upside comercial: diaspora română + potențial export/licențiere.
- Suport tehnic (Faza 7): procesator de plăți (ex. Stripe), model `Donation`, pagină „unde merg banii".

## D-010 · Utilizator demo + gamificare (Faza 3, pre-auth)
- Fără auth încă: cererile folosesc un utilizator identificat prin header `x-user-id`; dacă lipsește, se folosește `demo-user` (`DEMO_USER_ID`). La prima atingere, user + GamState + GrowthScore baseline se creează automat.
- Gamificare (§8): XP +10/lecție; bonus +20 la absolvire de modul; nivel la fiecare 100 XP.
- Streak: zile consecutive; aceeași zi nu incrementează; grace de 1 zi; 2+ zile lipsă → reset la 1.
- Radar (§10): 6 axe, baseline implicit 20; `axisDeltas` din reward se adaugă la `current` (clamp 0..100).
- Engine-ul stă în `@emanus/shared` (pur, testabil); persistența doar apelează funcțiile pure.

## D-011 · Onboarding + diagnostic + deep links (Faza 4)
- Onboarding (client): categorie → profil anonim (nume + avatar) → consimțământ → diagnostic. La final `POST /users` → `id` (cuid) salvat în localStorage și trimis ca header `x-user-id` (înlocuiește `demo-user`).
- Diagnostic (§10): chestionar Likert 1–5, câte un enunț pe fiecare din cele 6 axe (`@emanus/shared/diagnostic.ts`). `POST /me/diagnostic` setează baseline = current pe GrowthScore.
- Deep links (hash): `#/lesson/:id`, `#/dashboard`, `#/onboarding`, `#/community`, `#/`. Fără router extern.
- Sesiune client (localStorage): `userId`, `category`, `onboarded`.

## D-012 · Comunitate + moderare + protocol de criză (Faza 5)
**Context:** §16.5 + §15/§18 — comunitate sigură, mai ales pentru minori.

**Decizie:**
- Model `CommunityPost` (deja în schemă) cu status `visible|pending|removed`.
- **Moderare automată** (motor pur în `@emanus/shared/moderation.ts`): normalizează textul (minuscule + fără diacritice) și verifică liste de cuvinte. Curat → `visible` (auto-publicat); vulgaritate → `pending` (verificare umană); ură/slur → `removed`; **limbaj de criză → `pending` + NU se publică, se afișează imediat resurse de ajutor**.
- **Protocol de criză** (§15): la semnale de autovătămare/suicid/abuz, aplicația afișează resurse: **112**, **116 111** (Telefonul Copilului), **116 123** (sprijin emoțional). Endpoint `GET /crisis`.
- Listele de cuvinte sunt un start MVP; de înlocuit/completat cu un serviciu dedicat + coadă de moderare umană.
- Fără reclame/tracking; postările pot fi anonime (anonName + avatar).

**Endpoints noi:** `GET /community?category=`, `POST /community`, `GET /crisis`.

**De rafinat:** dashboard de moderare umană (aprobă/respinge pending), raportare postări, rate limiting, RLS pentru datele minorilor.
