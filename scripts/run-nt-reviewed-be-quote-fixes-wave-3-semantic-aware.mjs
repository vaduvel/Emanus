#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import { pathToFileURL } from "node:url"

const ROOT = process.cwd()
const wavePath = path.join(ROOT, "scripts", "apply-nt-reviewed-be-quote-fixes-wave-3.mjs")

const guards = [
  {
    label: "1 Ioan 1:8",
    kind: "exact",
    bookFile: "23-1-ioan.json",
    chapter: 1,
    unitIndex: 1,
    unitId: "1-ioan-1-5-10-source-first",
    obsoleteBefore: "dacă zicem că nu avem păcat, ne înșelăm",
    fixLine: '  { bookId: "1-ioan", canonicalBookId: "1JN", chapter: 1, field: "units[1].teaching", before: "dacă zicem că nu avem păcat, ne înșelăm", after: "Dacă spunem că nu avem păcat, ne amăgim pe noi înșine" }',
  },
  {
    label: "Tit 1:13",
    kind: "exact",
    bookFile: "17-tit.json",
    chapter: 1,
    unitIndex: 2,
    unitId: "tit-1-10-14",
    obsoleteBefore: "ca să fie sănătoși în credință",
    fixLine: '  { bookId: "tit", canonicalBookId: "TIT", chapter: 1, field: "units[2].teaching", before: "ca să fie sănătoși în credință", after: "pentru ca ei să fie sănătoși în credință" }',
  },
  {
    label: "Filimon 17",
    kind: "exact",
    bookFile: "18-filimon.json",
    chapter: 1,
    unitIndex: 3,
    unitId: "filimon-1-17-22",
    obsoleteBefore: "Primește-l ca pe mine însumi",
    fixLine: '  { bookId: "filimon", canonicalBookId: "PHM", chapter: 1, field: "units[3].teaching", before: "Primește-l ca pe mine însumi", after: "primește-l așa cum m-ai primi pe mine" }',
  },
  {
    label: "Fapte 24",
    kind: "exact",
    bookFile: "05-fapte.json",
    chapter: 24,
    unitIndex: 2,
    unitId: "fapte-24-22-27",
    obsoleteBefore: "Acum pleacă; te voi chema când voi avea timp.",
    fixLine: '  { bookId: "fapte", canonicalBookId: "ACT", chapter: 24, field: "units[2].teaching", before: "Acum pleacă; te voi chema când voi avea timp.", after: "Deocamdată du-te; când voi găsi un prilej, te voi chema." }',
  },
  {
    label: "Filipeni 2",
    kind: "exact",
    bookFile: "11-filipeni.json",
    chapter: 2,
    unitIndex: 2,
    unitId: "filipeni-2-12-18",
    obsoleteBefore: "Duceți până la capăt mântuirea",
    fixLine: '  { bookId: "filipeni", canonicalBookId: "PHP", chapter: 2, field: "units[2].teaching", before: "Duceți până la capăt mântuirea", after: "duceți până la capăt propria voastră mântuire" }',
  },
  {
    label: "Coloseni 2",
    kind: "exact",
    bookFile: "12-coloseni.json",
    chapter: 2,
    unitIndex: 4,
    unitId: "coloseni-2-20-23",
    obsoleteBefore: "nu lua, nu gusta, nu atinge",
    fixLine: '  { bookId: "coloseni", canonicalBookId: "COL", chapter: 2, field: "units[4].teaching", before: "nu lua, nu gusta, nu atinge", after: "Nu atinge, nu gusta, nu pipăi" }',
  },
  {
    label: "Matei 11:1-15 paraphrase wrapper",
    kind: "unquote",
    bookFile: "01-matei.json",
    chapter: 11,
    unitIndex: 0,
    unitId: "matei-11-1-15",
    quote: "Ferice de acela pentru care Eu nu voi fi un prilej de poticnire",
    fixLine: '  { bookId: "matei", canonicalBookId: "MAT", chapter: 11, field: "units[0].teaching", quote: "Ferice de acela pentru care Eu nu voi fi un prilej de poticnire" }',
  },
  {
    label: "Matei 14:22-33 paraphrase wrapper",
    kind: "unquote",
    bookFile: "01-matei.json",
    chapter: 14,
    unitIndex: 2,
    unitId: "matei-14-22-33",
    quote: "Eu sunt; nu vă temeți",
    fixLine: '  { bookId: "matei", canonicalBookId: "MAT", chapter: 14, field: "units[2].teaching", quote: "Eu sunt; nu vă temeți" }',
  },
  {
    label: "Matei 26:1-16 paraphrase wrapper",
    kind: "unquote",
    bookFile: "01-matei.json",
    chapter: 26,
    unitIndex: 0,
    unitId: "matei-26-1-16",
    quote: "Pe săraci îi aveți totdeauna",
    fixLine: '  { bookId: "matei", canonicalBookId: "MAT", chapter: 26, field: "units[0].teaching", quote: "Pe săraci îi aveți totdeauna" }',
  },
  {
    label: "Matei 26:31-46 paraphrase wrapper",
    kind: "unquote",
    bookFile: "01-matei.json",
    chapter: 26,
    unitIndex: 2,
    unitId: "matei-26-31-46",
    quote: "Duhul este plin de râvnă, dar carnea este neputincioasă",
    fixLine: '  { bookId: "matei", canonicalBookId: "MAT", chapter: 26, field: "units[2].teaching", quote: "Duhul este plin de râvnă, dar carnea este neputincioasă" }',
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
  const targetAbsent = guard.kind === "exact"
    ? !teaching.includes(guard.obsoleteBefore)
    : ![`„${guard.quote}”`, `«${guard.quote}»`, `"${guard.quote}"`].some((form) => teaching.includes(form))
  const semanticSupersedesLegacyFix =
    unit?.id === guard.unitId &&
    semantic?.status === "approved-against-transcript" &&
    /^sha256:[0-9a-f]{64}$/i.test(String(semantic?.reviewedTeachingSha256 ?? "")) &&
    targetAbsent

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
    // A previous successful run may already have removed this legacy operation.
    // Keep the guard idempotent, but only when the current unit still proves the
    // same transcript-reviewed semantic replacement.
    if (!semanticSupersedesLegacyFix) {
      throw new Error(`${guard.label} legacy wave-3 quote fix changed unexpectedly; refusing to bypass it`)
    }
    console.log(`NT reviewed BE quote fixes wave 3: ${guard.label} legacy quote operation already superseded.`)
  }
  superseded.push(guard.label)
  console.log(`NT reviewed BE quote fixes wave 3: ${guard.label} legacy quote operation superseded by approved hash-bound transcript-semantic reader copy.`)
}

try {
  if (patched !== original) fs.writeFileSync(wavePath, patched, "utf8")
  const url = pathToFileURL(wavePath)
  url.searchParams.set("semanticAware", superseded.length ? superseded.join(",") : "0")
  await import(url.href)
} finally {
  if (patched !== original) fs.writeFileSync(wavePath, original, "utf8")
}
