# 23 — Conținutul Porților: inventar, verdict și plan de scriere

Documentul de rutare cere conținut, nu doar rutare. Fișierul ăsta ține evidența:
ce ușă are conținut propriu, ce ușă intră într-un parcurs generic și ce ușă e
rutată greșit.

**Are prioritate `docs/22-siguranta.md`.** Orice conflict între documentul de
rutare și docs/22 se rezolvă în favoarea docs/22.

Ramura de lucru: `agent/porti-continut-v1`.
Codul: `packages/shared/src/paths/`.

---

## 1. Formatul obligatoriu de lecție

Sursa de adevăr e `packages/shared/src/domain.ts`. Orice lecție nouă respectă
exact tipurile de acolo. Nu se inventează câmpuri.

```ts
Lesson {
  id, courseId, order, title, estMinutes,
  anchorRefs: string[], memoryVerseRef, badgeId?,
  safety?: { topic: LessonSafetyTopic, notice: string },
  steps: LessonStep[]
}

LessonStep {
  id, type, order,
  bubbles?: { from: "guide", text }[],
  choice?: { prompt, options: ChoiceOption[] },
  multiChoice?: { prompt, options, minSelections?, maxSelections? },
  response?: { prompt, placeholder?, required?, minLength? },
  quiz?: { question, options: { text, correct }[], explanation },
  scripture?: { text, ref },
  journalPrompt?,
  reward?: Reward
}
```

Cele 17 tipuri de pas, în ordinea din `LESSON_STEP_ORDER`:
`check_in`, `hook`, `choice`, `multi_choice`, `reflection`, `declaration`,
`name_struggle`, `world_vs_truth`, `scripture`, `truth_simple`, `quiz`,
`how_god_helps`, `step`, `memory_verse`, `prayer`, `journal`, `reward`.

Convenții de fișier, respectate de toate parcursurile existente:

- Un fișier de parcurs exportă **doar** lecții și, opțional, un array de lecții și
  unul de practici. Nu importă `PathDef` — ar face import circular.
- `PathDef` se asamblează în `paths/index.ts`.
- `practices[i]` e ziua care urmează după `lessons[i]`. Indexurile sunt aliniate.
- Importă tipurile cu `from "../domain.js"`, cu extensia `.js`.
- Prefix stabil de id pe parcurs: `g1_1`, `g1_2`, … pentru lecția 1 din `greutate`.
- 10-14 pași pe lecție, `estMinutes` 10-13.
- Fiecare fișier începe cu un bloc de comentariu care spune: camera, minciuna,
  ordinea și de ce e așa, regulile de siguranță aplicate.
- Diacritice complete. `rusineA.ts` e fără diacritice din motive istorice; nu se
  copiază obiceiul în fișiere noi.

---

## 2. Inventarul celor 31 de uși

| Ușă | Cameră | Parcurs | Verdict |
|---|---|---|---|
| `rusine` | c1 | path_acasa (7) | Acoperită dedicat |
| `avort` | c1 | path_acasa (7) | Generic — are nevoie de conținut propriu |
| `infidelitate` | c1 | path_acasa (7) | Generic — are nevoie de conținut propriu |
| `pornografie` | c1 | path_acasa (7) | Generic — are nevoie de conținut propriu |
| `prea_departe` | c1 | path_acasa (7) | Acoperită acceptabil |
| `neiertare` | c2 | path_neiertare (9) | Acoperită dedicat |
| `doliu` | c2 | path_neiertare (9) | **Rutare greșită — D2** |
| `boala` | c2 | path_neiertare (9) | **Rutare greșită — D2** |
| `de_ce_permis` | c2 | path_neiertare (9) | **Rutare greșită — D2** |
| `divort` | c2 | path_neiertare (9) | **Rutare greșită — D2** |
| `indoiala` | c3 | path_temelie (3) | Subțire — D3 |
| `nu_inteleg` | c3 | path_temelie (3) | Subțire — D3 |
| `biblia_inventata` | c3 | path_temelie (3) | Subțire — D3 |
| `alte_credinte` | c3 | path_temelie (3) | Subțire — D3 |
| `perete` | c4 | path_aproape (7) | Acoperită dedicat |
| `uscaciune` | c4 | path_aproape (7) | Acoperită acceptabil |
| `flacara` | c4 | path_aproape (7) | Acoperită acceptabil |
| `cum_citesc` | c4 | path_aproape (7) | Generic — e o cerere de metodă, nu o rană |
| `dependenta` | c5 | path_schimbare (7) | Acoperită dedicat |
| `recadere` | c5 | path_schimbare (7) | Acoperită dedicat |
| `furie` | c5 | path_schimbare (7) | De reevaluat — e o rană relațională |
| `anxietate` | **c8** | **path_greutate (7)** | **Reparată pe ramura asta — D1** |
| `tristete` | **c8** | **path_greutate (7)** | **Reparată pe ramura asta — D1** |
| `merit` | c6 | path_har (7) | Acoperită dedicat |
| `obisnuinta` | c6 | path_har (7) | Acoperită acceptabil |
| `frica_pedeapsa` | c6 | path_har (7) | Acoperită acceptabil |
| `epuizat_slujire` | c6 | path_har (7) | Generic — are nevoie de conținut propriu |
| `singuratate` | c7 | path_impreuna (7) | Acoperită dedicat |
| `familie_respinge` | c7 | path_impreuna (7) | Acoperită acceptabil |
| `respins_biserica` | c7 | path_impreuna (7) | Acoperită acceptabil |
| `nou_venit` | c7 | path_impreuna (7) | Generic — e o nevoie practică, nu o rană |

Ușile de explorare, în afara celor 31: `inceput` → path_temelie,
`umblare` → path_umblare, `nu_stiu` → path_temelie.

---

## 3. Defectele de rutare

### D1 — anxietatea și tristețea în camera "Sunt defect" **(reparat pe ramura asta)**

`anxietate` și `tristete` cădeau în c5, `path_schimbare`, a cărei minciună de
intrare este "Sunt defect, asta sunt", lângă `dependenta`, `recadere`,
`pornografie` și `furie`.

Asta intră direct în `docs/22-siguranta.md` §1: *"Nu punem vina pe om. Anxietatea,
tristetea, epuizarea, insomnia pot avea cauze medicale."* Parcursul spunea în
conținut că omul nu e defect, dar prima secundă — camera în care intra — spunea
invers.

**Reparat:** cameră nouă `c8` "Nu mai am putere / mi-e frică tot timpul",
minciuna "Dacă aș avea destulă credință, aș fi bine", parcurs `path_greutate`
cu 7 lecții noi în `packages/shared/src/paths/greutate.ts`.

### D2 — doliul și boala în camera "Când nu poți ierta"

`doliu`, `boala`, `de_ce_permis` și `divort` ajung în `path_neiertare`. Omul care
tocmai a îngropat pe cineva primește un drum de nouă lecții despre iertare.
Primele două lecții ale parcursului chiar vorbesc despre "nu El ți-a făcut asta",
deci intuiția a fost bună, dar restul de șapte nu sunt pentru el.

**De reparat, PR 1.** Există deja conținut scris pe `codex/nolan-short-courses`:
`packages/shared/src/paths/suferinta.ts` (7 lecții, `path_suferinta`) și
`packages/shared/src/paths/doorEntries.ts`, care rutau deja
`doliu`/`boala`/`de_ce_permis` către `suferinta_l1`. Se portă, nu se rescrie.

### D3 — camera 3 are trei lecții pentru patru întrebări diferite

`path_temelie` are 3 lecții și deservește patru uși plus două uși de explorare
plus rolul de `FALLBACK_PATH_ID`. "Nu știu dacă există Dumnezeu", "nu înțeleg ce
citesc", "Biblia e inventată" și "am crezut în energii și karma" sunt patru
discuții diferite.

### D4 — uși care nu sunt răni

`cum_citesc` și `nou_venit` sunt cereri practice, nu tipare spirituale. Ele
primesc acum un parcurs de șapte lecții pentru o întrebare care are nevoie de o
lecție și un instrument.

---

## 4. Ce s-a scris pe ramura asta

**`packages/shared/src/domain.ts`** — extindere strict aditivă, preluată din
`codex/nolan-short-courses`, retrocompatibilă cu tot ce există pe `main`:

- tipuri noi de pas: `multi_choice`, `reflection`, `declaration`
- `LessonSafetyTopic` și `Lesson.safety`, ca să se poată declara în date ecranul
  de avertizare cerut de docs/22 §2, nu într-un `if` din UI
- `LessonStep.multiChoice`, `LessonStep.response`, `ChoiceOption.feedback`
- `LessonAnswers`

**`packages/shared/src/paths/greutate.ts`** — `path_greutate`, 7 lecții:

| # | Titlu | Ancore | Siguranță |
|---|---|---|---|
| 1 | Nu ești slab pentru că te doare | Psalmul 34:18; 2 Corinteni 1:8-9 | `mental_health` |
| 2 | Frica din cap și greutatea din corp | Filipeni 4:6-7; Psalmul 94:19 | `mental_health` |
| 3 | Ilie a primit mai întâi somn și mâncare | 1 Regi 19:3-9 | `mental_health` |
| 4 | Psalmii au voie să spună «până când» | Psalmul 13; 88; 42:5 | — |
| 5 | Ghetsimani | Matei 26:36-46; Evrei 4:15 | `mental_health` |
| 6 | Ce faci mâine dimineață | Matei 6:34; Plângeri 3:22-23 | — |
| 7 | Ziua grea care va reveni | Ioan 16:33; Romani 8:38-39 | `mental_health` |

Deciziile doctrinare asumate în parcurs:

- Suferința **nu** se explică prin lipsa de credință a omului. Nicăieri.
- Vindecarea **nu** se promite. Nici direct, nici prin subînțeles.
- Medicul, psihologul și tratamentul **nu** sunt lipsă de credință. Lecția 6
  spune explicit să nu se oprească un tratament pentru că a spus cineva de la
  biserică sau o aplicație.
- Psalmul 88 se citeă așa cum e: se termină în întuneric, fără răsturnare.
- Ghetsimani se citește cu "fără păcat" din Evrei 4:15 alături, ca să fie limpede
  că întristarea de moarte nu e păcat.

**`packages/shared/src/paths/index.ts`** — camera `c8`, rerutarea celor două uși,
`pathGreutate` în `PATHS`. Nimic altceva nu s-a atins.

---

## 5. Ordinea de scriere pentru restul

1. **PR 1 — D2.** Portare `suferinta.ts` și `doorEntries.ts` de pe
   `codex/nolan-short-courses`, cameră nouă pentru doliu/boală/"de ce a permis",
   rerutare `doliu`, `boala`, `de_ce_permis`. `divort` se decide separat: e mai
   aproape de c1 decât de doliu.
2. **PR 2 — D3.** Extinderea camerei 3 de la 3 la 7 lecții, cu ramificație pe
   întrebarea de intrare: existență, text, credibilitate, alte credințe.
3. **PR 3 — conținut dedicat pentru ușile grele din c1**: `avort`,
   `infidelitate`, `pornografie`. Toate trei cer `safety` și pași separați.
4. **PR 4 — D4.** `cum_citesc` și `nou_venit` devin cursuri scurte în bibliotecă,
   nu parcursuri de șapte lecții.
5. **PR 5 — `epuizat_slujire`** și reevaluarea lui `furie`.
6. **PR 6 — `DOOR_ENTRY_OPTIONS` pentru toate cele 31 de uși**, ca playerul să nu
   reîntrebe ce a răspuns deja ușa.

---

## 6. Lista de verificare, aplicată pe fiecare lecție nouă

Preluată din `docs/22-siguranta.md` §11. O lecție nu intră în `main` dacă pică un
singur punct.

1. Nu pune vina pe om pentru un simptom care poate fi medical.
2. Nu folosește iertarea ca pretext pentru a rămâne în pericol.
3. Are avertisment separat dacă atinge un subiect greu.
4. Nu cere date personale.
5. Nu promite un rezultat.
6. Nu lasă niciun verset gol și niciun cuvânt bisericesc neexplicat.
7. Se termină cu un pas concret pentru azi.
8. Nu e fundătură.
9. Vocea nu are nume de om.

În plus, pentru orice lecție care atinge sănătatea mintală:

10. Numerele apar în același pas cu simptomul, înaintea oricărui verset:
    **112**, **116 123**, iar pentru minori **116 111**.
11. `reward.xp` rămâne **0**. Nu se afișează scor, nivel, streak sau procent
    (docs/22 §8).

---

## 7. Starea integrării runtime (2026-08-09)

Conținutul scris pe ramurile editoriale este conectat în runtime, fără să fie
duplicat sau rescris:

- 41 de uși explicite, grupate în 10 camere de orientare;
- variante distincte de lecții pentru doliu, boală, suferință fără explicație,
  avort, divorț, dependență, pornografie, respingere, nou-venit și înșelare;
- toate lecțiile variantelor sunt rezolvabile direct după navigare și refresh;
- fiecare parcurs activ are o punte contextuală către Drumul Emaus;
- răspunsurile de triaj, reflecție, declarație și multi-select rămân efemere;
- identitatea ușii și ID-urile lecțiilor terminate se sincronizează în Supabase;
- instalațiile Supabase nemigrate păstrează temporar sincronizarea veche, fără
  să blocheze aplicația; migrarea este în
  `supabase/migrations/202608090001_porti_runtime.sql`;
- parcursurile care cer aprobare pastorală sau clinică sunt conectate, dar nu
  pot fi pornite până când aprobările lor explicite sunt completate.

Contractul este verificat prin `pnpm check:porti` și rulează obligatoriu în CI.
