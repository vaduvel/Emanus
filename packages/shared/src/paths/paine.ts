import type { Lesson } from "../domain.js"
import { paineL1, paineL2, paineL3, paineL4 } from "./paineA.js"
import { paineL5, paineL6, paineL7 } from "./paineB.js"

/*
 * Camera 10 — Pâinea (path_paine).
 *
 * Minciuna camerei: „Valorez cât aduc în casă."
 *
 * Aici se adună cele șapte lecții scrise în paineA.ts (1—4) și paineB.ts
 * (5—7) și tot aici stau practicile drumului. Împărțirea în două fișiere este
 * pur tehnică, la fel ca la suferință și la legătură.
 *
 * Arcul celor șapte lecții
 * ------------------------
 * 1. Cât valorez — se numește minciuna și se desparte valoarea de producție
 *    (Luca 12:15).
 * 2. Pâinea de azi — cererea este pe o zi, nu pe un an; aici se respinge
 *    explicit învățătura că o credință destul de mare aduce bani
 *    (Matei 6:11, Matei 6:34).
 * 3. Pentru cine muncesc — se schimbă destinatarul muncii, nu numărul de ore
 *    (Coloseni 3:23-24).
 * 4. Când nu ajunge — lipsa, rușinea și cererea de ajutor; lecția poartă
 *    câmpul safety și numerele de urgență (Matei 6:33).
 * 5. Frica de mâine — promisiunea nu este despre sumă, ci despre prezență
 *    (Evrei 13:5, 1 Petru 5:7).
 * 6. Oboseala care nu trece — epuizarea, odihna și trimiterea la medic
 *    (Matei 11:28).
 * 7. Ce rămâne când nu mai produc — se închide bucla deschisă în lecția 1
 *    (Isaia 41:10, Luca 12:15).
 *
 * Lecția 4 nu se citește înaintea lecției 2: cine ajunge la lipsă fără să fi
 * auzit întâi că lipsa nu este verdict duhovnicesc va citi «căutați mai întâi»
 * ca pe o condiție de îndeplinit pentru bani.
 */

export { paineL1, paineL2, paineL3, paineL4 } from "./paineA.js"
export { paineL5, paineL6, paineL7 } from "./paineB.js"

export const PAINE_LESSONS: Lesson[] = [
  paineL1,
  paineL2,
  paineL3,
  paineL4,
  paineL5,
  paineL6,
  paineL7
]

/*
 * Practicile sunt aliniate pe index cu PAINE_LESSONS: practica[i] aparține
 * lecției[i]. Niciuna nu cere bani și niciuna nu cere ca situația financiară
 * să se fi schimbat — altfel ar fi imposibile exact pentru oamenii cărora le
 * este scris drumul. Practica 4 este singura care cere un telefon către un om.
 */
export const PAINE_PRACTICES: string[] = [
  "Astăzi spune-i cuiva din casă un lucru bun despre el care nu are legătură cu ce aduce sau cu ce face.",
  "Astăzi fă socoteala doar pentru ziua de azi. Când îți fuge mintea la luna viitoare, spune cu voce tare: «astăzi».",
  "Astăzi fă o singură sarcină nevăzută la fel de bine ca și cum ar verifica-o cineva.",
  "Astăzi spune unei singure persoane de încredere cum stai cu banii. Nu ca să ceri, ci ca să nu mai duci singur.",
  "Astăzi, când începe socoteala de noapte, ridică-te, scrie fraza pe o hârtie și las-o pe masă până dimineață.",
  "Astăzi oprește-te treizeci de minute fără să faci nimic util. Dacă apare vinovăția, las-o să treacă și rămâi pe scaun.",
  "Astăzi dă familiei tale un lucru care nu costă bani: o oră fără telefon, o plimbare, o întrebare pusă până la capăt."
]
