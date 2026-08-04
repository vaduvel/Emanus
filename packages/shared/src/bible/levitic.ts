import type { BibleBook } from "./types.js"
import { LEVITIC_1 } from "./levitic1.js"

/*
 * Cartea Levitic.
 *
 * Capitolele scrise sunt importate aici și așezate în lista `chapters`, ca să
 * nu fie nevoie de atins index.ts la fiecare capitol nou.
 */

export { LEVITIC_1 }

export const LEVITIC: BibleBook = {
  id: "levitic",
  name: "Levitic",
  testament: "vt",
  order: 3,
  blurb:
    "Cartea apropierii de Dumnezeu. În ebraică se numește „Și a chemat”, fiindcă începe cu un glas care iese din cortul abia ridicat. Aici se arată cum poate veni un om păcătos înaintea unui Dumnezeu sfânt, ce costă apropierea și cine o plătește.",
  chapters: [LEVITIC_1],
}
