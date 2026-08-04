import type { BibleBook } from "./types.js"
import { EXOD_1 } from "./exod1.js"
import { EXOD_2 } from "./exod2.js"
import { EXOD_3 } from "./exod3.js"

/*
 * Cartea Exod (Ieșirea).
 *
 * Textul biblic: Cornilescu, editia corectata (RCCV), păstrat în exodText.ts.
 * Explicația stă în fișierele de capitol: exod1.ts, exod2.ts, exod3.ts, ...
 *
 * Fișierul acesta doar adună cartea. Fiecare capitol nou se importă aici și se
 * adaugă în lista `chapters`, ca să nu mai fie nevoie de atins index.ts — așa
 * nu se mai poate întâmpla să existe un capitol scris, dar necablat.
 */

export { EXOD_1 } from "./exod1.js"
export { EXOD_2 } from "./exod2.js"
export { EXOD_3 } from "./exod3.js"

export const EXOD: BibleBook = {
  id: "exod",
  name: "Exod",