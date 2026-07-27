# Emanus

**Emanus = Emanuel** („Dumnezeu cu noi" — Isaia 7:14; Matei 1:23) **+ Emaus** (Luca 24).

> **Dumnezeu cu tine, pe drumul vieții tale** — care te învață cum să aplici Scriptura în viața de zi cu zi, ca să înțelegi cum se biruie lumea prin Iisus (Ioan 16:33; 1 Ioan 5:4–5).

Nu un curs *despre* Dumnezeu, ci relația cu Dumnezeu trăită zilnic, de toată familia. Destinația: **din orfan → în fiu iubit pe veci și mântuit.** „Cuvântul din Biblie este adevărul."

**`docs/00-DIRECTIE.md` este sursa unică de adevăr.** Când orice alt document pare să-l contrazică, `00` are prioritate.

---

## Model de venit — decis

**Nu cerem bani nimănui, pentru nimic.** Singurul venit sunt **donațiile** (plus, eventual, asociați/parteneri). Fără paywall, fără conținut blocat, fără abonament, fără freemium. Vezi `DECISIONS.md` D-009 și `00-DIRECTIE.md` §12.

> Notă: `docs/01-raport-viabilitate.md` §9–§10 descrie încă scenarii de freemium și licențiere către biserici. Acele secțiuni sunt **istorice** (analiză de piață), nu decizii active.

---

## Documentele

| Fișier | Conținut |
|---|---|
| `docs/00-DIRECTIE.md` | **Direcția canonică — sursă unică de adevăr.** Teza, ritualul zilnic, retenția cu har, Ușa nu unghiul, ascultarea înainte de învățătură, ecosistemul |
| `docs/01-raport-viabilitate.md` | Analiză de viabilitate 2026: piață, distribuție creator-led, riscuri (secțiunile de monetizare = istoric) |
| `docs/02-programa-curriculum.md` | Programa & cursurile pe cele 7 categorii de vârstă + cele 6 axe |
| `docs/03-workbook-implementare.md` | Workbook de implementare (build spec) — arhitectură, gamificare, chat, comunitate, siguranță |
| `docs/04-lectie-pilot.md` | Lecția pilot: „Simt că nu sunt de ajuns” |
| `docs/08-continut-bebelusi.md` | Conținut Bebeluși 0–5 (format dublu copil+părinte) |
| `docs/09-continut-copii.md` | Conținut Copii 6–11 |
| `docs/10-continut-femei.md` | Conținut Femei |
| `docs/11-continut-barbati.md` | Conținut Bărbați |
| `docs/12-continut-parinti.md` | Conținut Părinți |
| `docs/13-continut-bunici.md` | Conținut Bunici |
| `docs/Emanus — Mapare lecții…md` | Maparea temelor / playlisturilor |
| `docs/Emanus — Ritmul zilnic & Rugăciunea…md` | Ritualul zilnic + antrenorul de rugăciune |
| `docs/Emanus — Studiu de caz hope.study…md` | Studiu de caz: player conversațional |
| `adolescenti/` | Traseul complet Adolescenți 12–18 (05–07: traseu, cursul 1.1, cursurile 2.1–6.1) |
| `bebelusi-0-5/` `copii-6-11/` `femei/` `barbati/` `parinti/` `bunici/` | Foldere editoriale pe categorie |
| `DECISIONS.md` | Registrul deciziilor (D-001…) |
| `DEVELOPMENT.md` | Cum rulezi local (API, web, DB) |

---

## Cele 7 categorii × 6 axe

**Categorii:** Bebeluși (0–5) · Copii (6–11) · Adolescenți (12–18) · Femei · Bărbați · Părinți · Bunici.

**Cele 6 axe de creștere:**
1. `identity` — Identitate
2. `emotional_peace` — Pace emoțională
3. `relationships` — Relații
4. `living_faith` — Credință vie
5. `character` — Caracter
6. `freedom` — Libertate

Ierarhia din cod: Categorie → Modul (pe axă) → Curs → Lecție (5–7 min) → 12 beat-uri. Numărul de cursuri și lecții per categorie diferă între documente; **sursa de adevăr pentru numere este `docs/02-programa-curriculum.md`**, nu acest README.

Separat de axe, ritualul zilnic e structurat pe **cele 6 organe ale relației**: Prezența, Vorbirea, Ascultarea, Încrederea, Umblarea, Comuniunea (`00-DIRECTIE.md` §8). Cele două cadre nu se contopesc.

---

## Formatul lecțiilor

**Player de chat conversațional**, 12 beat-uri: `check_in → hook → choice → name_struggle → world_vs_truth → scripture → truth_simple → quiz → how_god_helps → step → memory_verse+prayer → journal+reward`.

Variante editoriale pe vârstă:
- **Standard (adolescenți / adulți / bunici):** 💥 Cârligul → 🧠 Cutia de știință → 🔄 Minciuna→Adevărul → 📖 Adevărul (Scriptură) → 🎯 Pasul (24–48h) → 📓 Jurnal.
- **Copii 6–11:** 💥 Cârligul → ✨ Știai că? → 🔄 Unii cred→Adevărul → 📖 Din Biblie → 🎯 Pasul → 📓 Jurnal.
- **Bebeluși 0–5 (dublu):** 💥 De ce contează → 🧠 Pentru părinte → 🔄 Minciună→Adevăr → 📖 Din Biblie → 🎯 Activitate cu cel mic → 📓 Jurnal de părinte.

---

## Principii de calitate

- Fără clișee, fără culpabilizare.
- Identitate înainte de datorie; har la cădere, nu pedeapsă.
- Se pleacă de la viața reală / știință / cultură, apoi Scriptura ca adevăr mai ascuțit.
- Personaj-ghid: „Daniel”. Nu se dă niciodată drept Dumnezeu; duce mereu la Cuvânt și afară, în Biserică.
- Distribuție: creator-led (TikTok + influenceri creștini), NU prin biserici.
- Linii de criză (workbook §15): **112**, **116 111** (Telefonul Copilului), **116 123** (suport emoțional).

---

## Stack

pnpm workspace · TypeScript strict · React + Vite (PWA) · Express + Prisma · Supabase Postgres · Capacitor (shell mobil). Vezi `DEVELOPMENT.md`.
