#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const TARGET = path.join(ROOT, "scripts/materialize-nt-manual-semantic-1-timotei.mjs")
const SPEC = path.join(ROOT, "docs/data/biblia-explicata/nt-semantic-review-spec/15-1-timotei.json")
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

if (!fs.existsSync(SPEC)) {
  console.error("[1 Timotei marker fix] review spec missing")
  process.exit(1)
}
let spec = fs.readFileSync(SPEC, "utf8")
const OLD_ROMANIAN = "Un convertit nou trebuie protejat de poziția care poate hrăni mândria, iar mărturia în afara bisericii trebuie să fie de asemenea curată."
const NEW_ROMANIAN = "Un convertit nou trebuie protejat de poziția care poate hrăni mândria, iar cei care nu fac parte din biserică trebuie să aibă, de asemenea, o mărturie bună despre el."
const oldRomanianCount = spec.split(OLD_ROMANIAN).length - 1
const newRomanianCount = spec.split(NEW_ROMANIAN).length - 1
if (oldRomanianCount === 1 && newRomanianCount === 0) {
  spec = spec.replace(OLD_ROMANIAN, NEW_ROMANIAN)
  console.log("1 Timotei marker fix: rewrote the reviewed 3:1-7 witness sentence to avoid the Romanian audit false positive.")
} else if (oldRomanianCount === 0 && newRomanianCount === 1) {
  console.log("1 Timotei marker fix: reviewed 3:1-7 witness sentence already normalized.")
} else {
  console.error(`[1 Timotei marker fix] unexpected Romanian witness state old=${oldRomanianCount} new=${newRomanianCount}`)
  process.exit(1)
}
fs.writeFileSync(SPEC, spec, "utf8")
