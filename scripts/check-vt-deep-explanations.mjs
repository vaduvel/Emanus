#!/usr/bin/env node

import { VT_EXPLAINED_FULL_OVERLAYS } from "../packages/shared/dist/bible/overlays/fullCoverage.js"

const TARGET_BOOK_ORDERS = new Set([19, 20, 21, 22, 23, 24, 25, 26, 27])

function fail(message) {
  throw new Error(`[VT deep explanations] ${message}`)
}

const targets = VT_EXPLAINED_FULL_OVERLAYS.filter((book) => TARGET_BOOK_ORDERS.has(book.order))
if (targets.length !== 9) {
  fail(`se așteptau 9 cărți Psalmii–Daniel, găsite ${targets.length}`)
}

let checkedChapters = 0
let checkedUnits = 0
const genericFallbacks = []

for (const book of targets) {
  for (const chapter of book.chapters) {
    if (book.order === 19 && chapter.number < 126) continue

    checkedChapters += 1
    if (!chapter.units.length) {
      fail(`${book.name} ${chapter.number}: capitol fără explicații`)
    }

    const sorted = [...chapter.units].sort((a, b) => a.from - b.from || a.to - b.to)
    let expected = 1
    for (const unit of sorted) {
      checkedUnits += 1
      if (unit.from !== expected) {
        fail(`${book.name} ${chapter.number}: acoperire discontinuă, așteptat versetul ${expected}, găsit ${unit.from}`)
      }
      if (unit.to < unit.from) {
        fail(`${book.name} ${chapter.number}: interval invalid ${unit.from}-${unit.to}`)
      }
      expected = unit.to + 1

      if (
        unit.source?.kind === "biblia-emanus" &&
        unit.teaching.trim() === chapter.summary.trim()
      ) {
        genericFallbacks.push(`${book.name} ${chapter.number}:${unit.from}-${unit.to}`)
      }
    }
  }
}

if (genericFallbacks.length) {
  fail(
    `au rămas ${genericFallbacks.length} intervale pe rezumat generic: ${genericFallbacks.join(", ")}`,
  )
}

console.log(
  `VT deep explanations OK: Psalmii 126–150 + Proverbe–Daniel; ${checkedChapters} capitole / ${checkedUnits} unități; niciun interval nu mai folosește rezumatul generic al capitolului.`,
)
