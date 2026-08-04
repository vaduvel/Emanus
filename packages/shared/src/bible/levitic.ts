import type { BibleBook } from "./types.js"
import { LEVITIC_1 } from "./levitic1.js"
import { LEVITIC_2 } from "./levitic2.js"
import { LEVITIC_3 } from "./levitic3.js"
import { LEVITIC_4 } from "./levitic4.js"
import { LEVITIC_5 } from "./levitic5.js"
import { LEVITIC_6 } from "./levitic6.js"
import { LEVITIC_7 } from "./levitic7.js"
import { LEVITIC_8 } from "./levitic8.js"
import { LEVITIC_9 } from "./levitic9.js"
import { LEVITIC_10 } from "./levitic10.js"

/*
 * Cartea Levitic.
 *
 * Capitolele scrise sunt importate aici și așezate în lista `chapters`, ca să
 * nu fie nevoie de atins index.ts la fiecare capitol nou.
 */

export {
  LEVITIC_1,
  LEVITIC_2,
  LEVITIC_3,
  LEVITIC_4,
  LEVITIC_5,
  LEVITIC_6,
  LEVITIC_7,
  LEVITIC_8,
  LEVITIC_9,
  LEVITIC_10,
}

export const LEVITIC: BibleBook = {
  id: "levitic",
  name: "Levitic",
  testament: "vt",
  order: 3,
  blurb:
    "Cartea apropierii de Dumnezeu. În ebraică se numește „Și a chemat”, fiindcă începe cu un glas care iese din cortul abia ridicat. Aici se arată cum poate veni un om păcătos înaintea unui Dumnezeu sfânt, ce costă apropierea și cine o plătește.",
  chapters: [
    LEVITIC_1,
    LEVITIC_2,
    LEVITIC_3,
    LEVITIC_4,
    LEVITIC_5,
    LEVITIC_6,
    LEVITIC_7,
    LEVITIC_8,
    LEVITIC_9,
    LEVITIC_10,
  ],
}
