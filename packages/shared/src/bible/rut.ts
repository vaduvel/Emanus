import type { BibleBook } from "./types.js"
import { RUT_1 } from "./rut1.js"
import { RUT_2 } from "./rut2.js"
import { RUT_3 } from "./rut3.js"
import { RUT_4 } from "./rut4.js"

export { RUT_1, RUT_2, RUT_3, RUT_4 }

export const RUT: BibleBook = {
  id: "rut",
  name: "Rut",
  testament: "vt",
  order: 8,
  blurb:
    "Povestea unei femei moabite care Îl alege pe Dumnezeul lui Israel, rămâne credincioasă Naomei și este primită prin răscumpărarea lui Boaz în linia lui David.",
  chapters: [RUT_1, RUT_2, RUT_3, RUT_4],
}
