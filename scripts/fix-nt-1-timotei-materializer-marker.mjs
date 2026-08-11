#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const TARGET = path.join(ROOT, "scripts/materialize-nt-manual-semantic-1-timotei.mjs")
const REPLACEMENTS = [
  {
    old: '      "a woman can pray and prophesy",',
    next: '      "women to pray and prophesy",',
    label: "women pray/prophesy",
  },
  {
    old: '      "rich in this present world",',
    next: '      "those who are rich are rich only in this present world",',
    label: "rich in present world",
  },
]

if (!fs.existsSync(TARGET)) {
  console.error("[1 Timotei marker fix] materializer missing")
  process.exit(1)
}
let source = fs.readFileSync(TARGET, "utf8")
for (const replacement of REPLACEMENTS) {
  const oldCount = source.split(replacement.old).length - 1
  const newCount = source.split(replacement.next).length - 1
  if (oldCount === 1 && newCount === 0) {
    source = source.replace(replacement.old, replacement.next)
    console.log(`1 Timotei marker fix: aligned ${replacement.label} to an exact single-segment transcript phrase.`)
  } else if (oldCount === 0 && newCount === 1) {
    console.log(`1 Timotei marker fix: ${replacement.label} already aligned.`)
  } else {
    console.error(`[1 Timotei marker fix] unexpected ${replacement.label} state old=${oldCount} new=${newCount}`)
    process.exit(1)
  }
}

const OLD_SOURCE_ID = "vbv-1timothy"
const REAL_SOURCE_ID = "vbv-1-tim"
const oldSourceIdCount = source.split(OLD_SOURCE_ID).length - 1
const realSourceIdCount = source.split(REAL_SOURCE_ID).length - 1
if (oldSourceIdCount === 4 && realSourceIdCount === 0) {
  source = source.split(OLD_SOURCE_ID).join(REAL_SOURCE_ID)
  console.log(`1 Timotei marker fix: aligned 4 provenance checks to exact regenerated sourceId ${REAL_SOURCE_ID}.`)
} else if (oldSourceIdCount === 0 && realSourceIdCount === 4) {
  console.log(`1 Timotei marker fix: provenance sourceId already aligned to ${REAL_SOURCE_ID}.`)
} else {
  console.error(`[1 Timotei marker fix] unexpected provenance sourceId state old=${oldSourceIdCount} real=${realSourceIdCount}`)
  process.exit(1)
}

fs.writeFileSync(TARGET, source, "utf8")
