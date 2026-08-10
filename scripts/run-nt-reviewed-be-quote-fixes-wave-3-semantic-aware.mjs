#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"

const ROOT = process.cwd()
const wavePath = path.join(ROOT, "scripts", "apply-nt-reviewed-be-quote-fixes-wave-3.mjs")

const guards = [
  {
    label: "1 Ioan 1:8",
    bookFile: "23-1-ioan.json",
    chapter: 1,
    unitIndex: 1,
    unitId: "1-ioan-1-5-10-source-first",
    obsoleteBefore: "dacă zicem că nu avem păcat, ne înșelăm",
    fixLine: '  { bookId: "1-ioan", canonicalBookId: "1JN", chapter: 1, field: "units[1].teaching", before: "dacă zicem că nu avem păcat, ne înșelăm", after: "Dacă spunem că nu avem păcat, ne amăgim pe noi înșine" }',
  },
  {
    label: "Tit 1:13",
    bookFile: "17-tit.json",
    chapter: 1,
    unitIndex: 2,
    unitId: "tit-1-10-14",
    obsoleteBefore: "ca să fie sănătoși în credință",
    fixLine: '  { bookId: "tit", canonicalBookId: "TIT", chapter: 1, field: "units[2].teaching", before: "ca să fie sănătoși în credință", after: "pentru ca ei să fie sănătoși în credință" }',
  },
  {
    label: "Filimon 17",
    bookFile: "18-filimon.json",
    chapter: 1,
    unitIndex: 3,
    unitId: "filimon-1-17-22",
    obsoleteBefore: "Primește-l ca pe mine însumi",
    fixLine: '  { bookId: "filimon", canonicalBookId: "PHM", chapter: 1, field: "units[3].teaching", before: "Primește-l ca pe mine însumi", after: "primește-l așa cum m-ai primi pe mine" }',
  },
]

if (!fs.existsSync(wavePath)) throw new Error(`missing ${wavePath}`)
const original = fs.readFileSync(wavePath, "utf8")
let patched = original
const superseded = []

for (const guard of guards) {
  const bookPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first", guard.bookFile)
  if (!fs.existsSync(bookPath)) continue
  const book = JSON.parse(fs.readFileSync(bookPath, "utf8"))
  const chapter = (book.chapters ?? []).find((item) => item.number === guard.chapter)
  const unit = chapter?.units?.[guard.unitIndex]
  const semantic = unit?.sourceFidelity?.semanticReview
  const teaching = String(unit?.teaching ?? "")
  const semanticSupersedesLegacyFix =
    unit?.id === guard.unitId &&
    semantic?.status === "approved-against-transcript" &&
    typeof semantic?.reviewedTeachingSha256 === "string" &&
    !teaching.includes(guard.obsoleteBefore)

  if (!semanticSupersedesLegacyFix) continue

  const candidates = [`${guard.fixLine}\n`, `${guard.fixLine},\n`]
  let removed = false
  for (const candidate of candidates) {
    if (patched.includes(candidate)) {
      patched = patched.replace(candidate, "")
      removed = true
      break
    }
  }
  if (!removed) {
    throw new Error(`${guard.label} legacy wave-3 quote fix changed unexpectedly; refusing to bypass it`)
  }
  superseded.push(guard.label)
  console.log(`NT reviewed BE quote fixes wave 3: ${guard.label} legacy exact-fix superseded by approved transcript-semantic reader copy.`)
}

try {
  if (patched !== original) fs.writeFileSync(wavePath, patched, "utf8")
  const url = pathToFileURL(wavePath)
  url.searchParams.set("semanticAware", superseded.length ? superseded.join(",") : "0")
  await import(url.href)
} finally {
  if (patched !== original) fs.writeFileSync(wavePath, original, "utf8")
}
