import type { Lesson } from "../domain.js"
import { legaturaL1, legaturaL2, legaturaL3, legaturaL4 } from "./legaturaA.js"
import { legaturaL5, legaturaL6, legaturaL7 } from "./legaturaB.js"

/*
 * Camera 9 — Legătura ruptă (path_legatura).
 *
 * Minciuna camerei: „Cu ei nu se mai poate."
 *
 * Aici se adună cele șapte lecții scrise în legaturaA.ts (1—4) și legaturaB.ts
 * (5—7) și tot aici stau practicile drumului. Împărțirea în două fișiere este
 * doar tehnică, la fel ca la suferință: un singur fișier ar depăși limita la
 * care scrierea automată riscă să fie tăiată la mijloc, iar un fișier tăiat la
 * mijloc trece de review pentru că arată întreg.
 *
 * Arcul celor șapte lecții
 * ------------------------
 * 1. Zidul dintre noi — recunoști că există și afli că răspunzi doar de
 *    jumătatea ta (Romani 12:18).
 * 2. Partea mea de zid — îți vezi partea, fără să iei vina întreagă
 *    (Matei 5:23-24).
 * 3. Cuvintele care rup — cum se vorbește într-o ceartă (Iacov 1:19-20,
 *    Efeseni 4:31-32).
 * 4. Când nu întorc lovitura — lanțul răspunsului (1 Petru 3:9).
 * 5. Iertarea nu este același lucru cu întoarcerea — iertare, împăcare și
 *    încredere, separate (Coloseni 3:13, Matei 6:12).
 * 6. Vorbește cu el, nu despre el — conversația între patru ochi (Matei 18:15).
 * 7. Ce rămâne când celălalt nu vine — capătul cinstit (Galateni 6:2,
 *    Romani 12:18).
 *
 * Ordinea nu este întotdeauna obligatorie, dar 5 nu se citește înaintea lui 3:
 * cine ajunge la iertare fără să fi trecut prin cuvinte și prin lovitura
 * neîntoarsă citește iertarea ca pe o obligație, nu ca pe o eliberare.
 */

export { legaturaL1, legaturaL2, legaturaL3, legaturaL4 } from "./legaturaA.js"
export { legaturaL5, legaturaL6, legaturaL7 } from "./legaturaB.js"

export const LEGATURA_LESSONS: Lesson[] = [
  legaturaL1,
  legaturaL2,
  legaturaL3,
  legaturaL4,
  legaturaL5,
  legaturaL6,
  legaturaL7
]

/*
 * Practicile sunt aliniate pe index cu LEGATURA_LESSONS: practica[i] aparține
 * lecției[i]. Fiecare se poate face astăzi, în câteva minute, și niciuna nu cere
 * prezența sau acordul celuilalt om — pentru că celălalt om nu este în mâna
 * celui care parcurge drumul. Practica 6 este singura care cere o abținere, nu
 * o faptă; a fost lăsată așa intenționat.
 */
export const LEGATURA_PRACTICES: string[] = [
  "Astăzi nu repari nimic. Scrie doar un nume și o propoziție: ce s-a rupt.",
  "Astăzi spune o propoziție despre partea ta, fără «dar» în ea. Dacă nu poți să i-o spui lui, spune-o cu voce tare când ești singur.",
  "Astăzi ascultă o singură conversație până la capăt, fără să îți pregătești răspunsul în timp ce celălalt vorbește.",
  "Astăzi, când vine lovitura, numără trei secunde în tăcere și binecuvântează-l în gând înainte să răspunzi.",
  "Astăzi iartă în rugăciune un lucru mic și nu anunța pe nimeni că ai făcut-o.",
  "Astăzi nu vorbi despre el cu nimeni altcineva. Nici măcar o dată, nici măcar pe scurt.",
  "Astăzi poartă o sarcină a cuiva: un drum, un telefon, o oră din timpul tău. Nu neapărat a lui."
]
