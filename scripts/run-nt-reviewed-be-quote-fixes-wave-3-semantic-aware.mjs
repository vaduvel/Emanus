#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"

const ROOT = process.cwd()
const wavePath = path.join(ROOT, "scripts", "apply-nt-reviewed-be-quote-fixes-wave-3.mjs")
const bookPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first", "23-1-ioan.json")

const obsoleteFix = '  { bookId: "1-ioan", canonicalBookId: "1JN", chapter: 1, field: "units[1].teaching", before: "dacă zicem că nu avem păcat, ne înșelăm", after: "Dacă spunem că nu avem păcat, ne amăgim pe noi înșine" }\n'
const obsoleteFixWithComma = '  { bookId: "1-ioan", canonicalBookId: "1JN", chapter: 1, field: "units[1].teaching", before: "dacă zicem că nu avem păcat, ne înșelăm", after: "Dacă spunem că nu avem păcat, ne amăgim pe noi înșine" },\n'

if (!fs.existsSync(wavePath)) throw new Error(`missing ${wavePath}`)
const original = fs.readFileSync(wavePath, "utf8")
let patched = original
let semanticSupersedesLegacyFix = false

if (fs.existsSync(bookPath)) {
  const book = JSON.parse(fs.readFileSync(bookPath, "utf8"))
  const chapter = (book.chapters ?? []).find((item) => item.number === 1)
  const unit = chapter?.units?.[1]
  const semantic = unit?.sourceFidelity?.semanticReview
  const teaching = String(unit?.teaching ?? "")
  semanticSupersedesLegacyFix =
    unit?.id === "1-ioan-1-5-10-source-first" &&
    semantic?.status === "approved-against-transcript" &&
    typeof semantic?.reviewedTeachingSha256 === "string" &&
    !teaching.includes("dacă zicem că nu avem păcat, ne înșelăm")
}

if (semanticSupersedesLegacyFix) {
  if (patched.includes(obsoleteFix)) {
    patched = patched.replace(obsoleteFix, "")
  } else if (patched.includes(obsoleteFixWithComma)) {
    patched = patched.replace(obsoleteFixWithComma, "")
  } else {
    throw new Error("1 Ioan legacy wave-3 quote fix changed unexpectedly; refusing to bypass it")
  }
  console.log("NT reviewed BE quote fixes wave 3: 1 Ioan 1:8 legacy exact-fix superseded by approved transcript-semantic rewrite.")
}

try {
  if (patched !== original) fs.writeFileSync(wavePath, patched, "utf8")
  const url = pathToFileURL(wavePath)
  url.searchParams.set("semanticAware", semanticSupersedesLegacyFix ? "1" : "0")
  await import(url.href)
} finally {
  if (patched !== original) fs.writeFileSync(wavePath, original, "utf8")
}
