import {
  GENEZA,
  EXOD,
  LEVITIC,
  NUMERI,
  DEUTERONOM,
  IOSUA,
  RUT,
  SAMUEL1,
  SAMUEL2,
} from "../packages/shared/dist/bible/index.js"
import { IMPARATI1 } from "../packages/shared/dist/bible/imparati1.js"

const LEGACY_BOOKS = [
  GENEZA,
  EXOD,
  LEVITIC,
  NUMERI,
  DEUTERONOM,
  IOSUA,
  RUT,
  SAMUEL1,
  SAMUEL2,
  IMPARATI1,
]

const VALID_KINDS = new Set(["exposition", "textual-overview"])
const errors = []
let unitCount = 0
let expositionCount = 0
let textualOverviewCount = 0
let hebrewWordCount = 0

function fail(unit, message) {
  errors.push(`${unit.ref}: ${message}`)
}

for (const book of LEGACY_BOOKS) {
  for (const chapter of book.chapters) {
    for (const unit of chapter.units) {
      unitCount += 1

      if (!VALID_KINDS.has(unit.explanationKind)) {
        fail(unit, `explanationKind lipsă/invalid: ${String(unit.explanationKind)}`)
      } else if (unit.explanationKind === "exposition") {
        expositionCount += 1
      } else {
        textualOverviewCount += 1
      }

      if (typeof unit.explanationSource !== "string" || unit.explanationSource.trim().length === 0) {
        fail(unit, "explanationSource lipsește")
      }

      if (unit.explanationKind === "textual-overview") {
        if (typeof unit.forYourHeart === "string" && unit.forYourHeart.trim().length > 0) {
          fail(unit, "textual-overview nu poate conține forYourHeart")
        }
        if (Array.isArray(unit.words) && unit.words.length > 0) {
          fail(unit, "textual-overview nu poate conține studiu lexical")
        }
      }

      if (Array.isArray(unit.words)) {
        for (const word of unit.words) {
          if (word.language !== "ebraica") continue
          hebrewWordCount += 1
          if (unit.wordSource !== "WLC-OSHB") {
            fail(unit, `studiu ebraic fără wordSource=WLC-OSHB: ${String(unit.wordSource)}`)
            break
          }
        }
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`[vt-legacy-provenance] EROARE: ${errors.length} probleme`)
  for (const error of errors.slice(0, 100)) console.error(`- ${error}`)
  if (errors.length > 100) console.error(`- ... și încă ${errors.length - 100}`)
  process.exit(1)
}

console.log(
  `[vt-legacy-provenance] OK: ${LEGACY_BOOKS.length}/10 cărți, ${unitCount} unități, ` +
    `${expositionCount} exposition, ${textualOverviewCount} textual-overview, ` +
    `${hebrewWordCount} note ebraice cu WLC-OSHB.`,
)
