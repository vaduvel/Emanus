import type { BibleBook } from "./types.js"
import { JUDECATORI_1 } from "./judecatori1.js"

export { JUDECATORI_1 } from "./judecatori1.js"

export const JUDECATORI: BibleBook = {
  id: "judecatori",
  name: "Judecători",
  testament: "vt",
  order: 7,
  blurb:
    "Cartea unei generații care a primit țara, dar nu a dus ascultarea până la capăt. Israel intră în cicluri de abatere, robie, strigăt și izbăvire, iar Dumnezeu ridică judecători în mijlocul unui popor în care fiecare ajunge să facă ce-i place.",
  chapters: [JUDECATORI_1],
}
