#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first-manifest.json")
const beDir = path.join(ROOT, "docs", "data", "biblia-emanus")
const ledgerPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-embedded-quote-reviewed-fix-ledger.json")

function fail(message) { console.error(`[NT reviewed BE quote fixes] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function norm(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .toLowerCase()
    .replace(/[„”«»"'’.,;:!?()[\]{}—–-]/gu, " ")
    .replace(/\s+/gu, " ")
    .trim()
}
function resolveField(chapter, field) {
  const match = /^units\[(\d+)\]\.(teaching|forYourHeart)$/.exec(field)
  if (match) {
    const unit = chapter.units?.[Number(match[1])]
    if (!unit) fail(`missing ${field}`)
    return { owner: unit, key: match[2], unit }
  }
  if (!["title", "summary", "literaryContext", "historicalContext", "prayer"].includes(field)) fail(`unsupported field ${field}`)
  return { owner: chapter, key: field, unit: null }
}

const FIXES = [
  { bookId: "matei", canonicalBookId: "MAT", chapter: 14, field: "literaryContext", before: "Cu adevărat, Tu ești Fiul lui Dumnezeu.", after: "Tu ești cu adevărat Fiul lui Dumnezeu" },
  { bookId: "matei", canonicalBookId: "MAT", chapter: 16, field: "units[1].teaching", before: "voi cine ziceți că sunt?", after: "voi cine spuneți că sunt" },
  { bookId: "matei", canonicalBookId: "MAT", chapter: 17, field: "units[0].teaching", before: "sculați-vă, nu vă temeți", after: "Ridicați-vă și nu vă temeți" },
  { bookId: "matei", canonicalBookId: "MAT", chapter: 25, field: "units[2].teaching", before: "Acești foarte neînsemnați frați ai Mei", after: "acești foarte mici frați ai Mei" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 1, field: "units[8].teaching", before: "Dacă voiești, poți să mă curățești", after: "Dacă vrei, poți să mă curățești" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 3, field: "units[0].teaching", before: "să vadă dacă-l va vindeca în ziua Sabatului, ca să-L poată învinui", after: "să vadă dacă îl va vindeca în ziua de sabat, ca să-L poată acuza" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 3, field: "units[2].teaching", before: "Iuda Iscarioteanul, care L-a și vândut", after: "Iuda Iscarioteanul, care l-a trădat și el" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 4, field: "units[2].teaching", before: "vine Satana îndată și ia Cuvântul semănat în ei", after: "vine îndată Satan și ia Cuvântul semănat în ei" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 4, field: "units[2].teaching", before: "aud Cuvântul, îl primesc și fac rod: unul treizeci, altul șaizeci și altul o sută", after: "aud Cuvântul, îl primesc și aduc rod: unul treizeci, altul șaizeci, iar altul o sută" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 5, field: "units[1].teaching", before: "credința ta te-a mântuit; du-te în pace și fii tămăduită de boala ta", after: "credința ta te-a vindecat. Du-te în pace și fii vindecată de suferința ta" },
  { bookId: "romani", canonicalBookId: "ROM", chapter: 11, field: "units[2].teaching", before: "Stai prin credință; nu te îngâmfa, ci teme-te.", after: "stai prin credință. Nu fi trufaș, ci teme-te" },
  { bookId: "1-corinteni", canonicalBookId: "1CO", chapter: 16, field: "units[2].teaching", before: "tot ce faceți să fie făcut în dragoste", after: "tot ce faci să fie făcut în dragoste" },
  { bookId: "coloseni", canonicalBookId: "COL", chapter: 1, field: "units[4].teaching", before: "Hristos în voi, nădejdea slavei", after: "Hristos în voi, speranța slavei" },
]

if (!fs.existsSync(corpusDir) || !fs.existsSync(manifestPath)) fail("final corpus/manifest missing")
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const files = fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()
const ledger = []

for (const fix of FIXES) {
  const file = files.find((name) => name.endsWith(`-${fix.bookId}.json`))
  if (!file) fail(`missing book ${fix.bookId}`)
  const full = path.join(corpusDir, file)
  const book = JSON.parse(fs.readFileSync(full, "utf8"))
  if (book.bookId !== fix.canonicalBookId) fail(`${fix.bookId}: canonical book mismatch`)
  const chapter = book.chapters?.find((item) => item.number === fix.chapter)
  if (!chapter) fail(`${fix.bookId} ${fix.chapter}: chapter missing`)

  const beFile = path.join(beDir, `${fix.canonicalBookId}.${fix.chapter}.json`)
  if (!fs.existsSync(beFile)) fail(`missing BE ${fix.canonicalBookId}.${fix.chapter}`)
  const be = JSON.parse(fs.readFileSync(beFile, "utf8"))
  const beText = norm((be.verses ?? []).map((verse) => verse.text).join(" "))
  if (!beText.includes(norm(fix.after))) fail(`${fix.bookId} ${fix.chapter} ${fix.field}: reviewed replacement is not exact same-chapter BE wording: ${fix.after}`)

  const { owner, key, unit } = resolveField(chapter, fix.field)
  const value = owner[key]
  if (typeof value !== "string") fail(`${fix.bookId} ${fix.chapter} ${fix.field}: target not string`)
  const occurrences = value.split(fix.before).length - 1

  if (occurrences === 0 && unit?.sourceFidelity?.reviewState === "reviewed-against-raw-transcript") {
    ledger.push({
      ...fix,
      beforeSha256: `sha256:${sha256(fix.before)}`,
      afterSha256: `sha256:${sha256(fix.after)}`,
      verification: "superseded-by-raw-transcript-editorial-review",
      sourceFidelityPolicy: unit.sourceFidelity.policy,
      note: "The old quote no longer exists because the complete unit was deliberately rewritten from pinned raw transcript evidence. The fresh embedded-quote audit validates the replacement unit independently.",
    })
    continue
  }

  if (occurrences !== 1) fail(`${fix.bookId} ${fix.chapter} ${fix.field}: expected exactly one old quote, found ${occurrences}`)
  owner[key] = value.replace(fix.before, fix.after)
  fs.writeFileSync(full, stable(book), "utf8")
  ledger.push({
    ...fix,
    beforeSha256: `sha256:${sha256(fix.before)}`,
    afterSha256: `sha256:${sha256(fix.after)}`,
    verification: "reviewed-exact-same-chapter-biblia-emanus",
  })
}

for (const entry of manifest.books ?? []) {
  const file = files.find((name) => name.endsWith(`-${entry.id}.json`))
  if (!file) fail(`manifest book missing ${entry.id}`)
  const raw = fs.readFileSync(path.join(corpusDir, file), "utf8")
  entry.sha256 = sha256(raw)
  const parsed = JSON.parse(raw)
  entry.units = (parsed.chapters ?? []).reduce((sum, chapter) => sum + (chapter.units?.length ?? 0), 0)
}
fs.writeFileSync(manifestPath, stable(manifest), "utf8")
fs.writeFileSync(ledgerPath, stable({
  schema: "emanus-nt-embedded-quote-reviewed-fix-ledger-v2",
  policy: "Every direct replacement is rejected unless its normalized wording exists in the same current Biblia Emanus chapter. A legacy quote-fix may be marked superseded only when the exact target unit carries reviewed-against-raw-transcript sourceFidelity; the fresh quote audit then evaluates the rewritten copy independently.",
  count: ledger.length,
  fixes: ledger,
}), "utf8")
console.log(`NT reviewed BE quote fixes: ${ledger.length}/${FIXES.length}.`)
