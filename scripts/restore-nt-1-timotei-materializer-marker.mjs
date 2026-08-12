#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const TARGET = path.join(ROOT, "scripts/materialize-nt-manual-semantic-1-timotei.mjs")
if (!fs.existsSync(TARGET)) {
  console.error("[1 Timotei marker restore] materializer missing")
  process.exit(1)
}
let source = fs.readFileSync(TARGET, "utf8")
const replacements = [
  {
    patched: '      "women to pray and prophesy",',
    original: '      "a woman can pray and prophesy",',
    label: "women pray/prophesy",
  },
  {
    patched: '      "those who are rich are rich only in this present world",',
    original: '      "rich in this present world",',
    label: "rich in present world",
  },
]
for (const replacement of replacements) {
  const patchedCount = source.split(replacement.patched).length - 1
  const originalCount = source.split(replacement.original).length - 1
  if (patchedCount === 1 && originalCount === 0) {
    source = source.replace(replacement.patched, replacement.original)
  } else {
    console.error(`[1 Timotei marker restore] unexpected ${replacement.label} state patched=${patchedCount} original=${originalCount}`)
    process.exit(1)
  }
}
const PATCHED_SOURCE_ID = "vbv-1-tim"
const ORIGINAL_SOURCE_ID = "vbv-1timothy"
const patchedSourceIdCount = source.split(PATCHED_SOURCE_ID).length - 1
const originalSourceIdCount = source.split(ORIGINAL_SOURCE_ID).length - 1
if (patchedSourceIdCount === 4 && originalSourceIdCount === 0) {
  source = source.split(PATCHED_SOURCE_ID).join(ORIGINAL_SOURCE_ID)
} else {
  console.error(`[1 Timotei marker restore] unexpected provenance state patched=${patchedSourceIdCount} original=${originalSourceIdCount}`)
  process.exit(1)
}
fs.writeFileSync(TARGET, source, "utf8")
console.log("1 Timotei marker restore: transient validator patches restored after successful materialization.")
