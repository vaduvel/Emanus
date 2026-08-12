#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first-manifest.json")
const beDir = path.join(ROOT, "docs", "data", "biblia-emanus")
const ledgerPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-embedded-quote-reviewed-fix-wave-2-ledger.json")

function fail(message) { console.error(`[NT reviewed BE quote fixes wave 2] ${message}`); process.exit(1) }
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
  { bookId: "matei", canonicalBookId: "MAT", chapter: 2, field: "units[2].teaching", before: "El va fi chemat Nazarinean", after: "Va fi numit Nazarinean" },
  { bookId: "matei", canonicalBookId: "MAT", chapter: 7, field: "units[3].teaching", before: "nu v-am mai cunoscut", after: "Niciodată nu v-am cunoscut" },
  { bookId: "matei", canonicalBookId: "MAT", chapter: 19, field: "units[2].teaching", before: "Cine poate atunci să fie mântuit?", after: "Atunci cine poate fi mântuit?" },
  { bookId: "matei", canonicalBookId: "MAT", chapter: 23, field: "units[0].teaching", before: "faceți, dar nu faceți după faptele lor", after: "faceți, dar nu faceți faptele lor" },
  { bookId: "matei", canonicalBookId: "MAT", chapter: 24, field: "units[0].teaching", before: "Băgați de seamă să nu vă înșele cineva.", after: "Vedeți să nu vă rătăcească cineva" },
  { bookId: "matei", canonicalBookId: "MAT", chapter: 28, field: "units[0].teaching", before: "cu frică și cu mare bucurie", after: "cu frică și bucurie mare" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 5, field: "units[2].teaching", before: "Nu te teme; crede numai.", after: "Nu te teme, ci doar crede" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 6, field: "prayer", before: "Îndrăzniți, Eu sunt, nu vă temeți!", after: "Prindeți curaj! Eu sunt. Nu vă temeți!" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 6, field: "units[4].teaching", before: "Îndrăzniți! Eu sunt. Nu vă temeți!", after: "Prindeți curaj! Eu sunt. Nu vă temeți!" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 8, field: "units[0].teaching", before: "Mi-e milă de mulțime.", after: "Am compasiune față de mulțime" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 9, field: "units[0].teaching", before: "Acesta este Fiul Meu preaiubit; pe El să-L ascultați.", after: "Acesta este Fiul Meu preaiubit; ascultați de El!" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 12, field: "units[1].teaching", before: "Dați cezarului ce este al cezarului și lui Dumnezeu ce este al lui Dumnezeu.", after: "Dați înapoi Cezarului ce este al Cezarului, iar lui Dumnezeu ce este al lui Dumnezeu!" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 12, field: "units[1].teaching", before: "Eu sunt Dumnezeul lui Avraam, Isaac și Iacov", after: "Eu sunt Dumnezeul lui Avraam, Dumnezeul lui Isaac și Dumnezeul lui Iacov" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 13, field: "units[0].teaching", before: "Cine va răbda până la sfârșit va fi mântuit.", after: "cel care va răbda până la sfârșit va fi mântuit" },
  { bookId: "marcu", canonicalBookId: "MRK", chapter: 16, field: "units[0].teaching", before: "spuneți ucenicilor Lui și lui Petru", after: "spuneți-le ucenicilor Lui și lui Petru" }
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
  const semanticReviewed = unit?.sourceFidelity?.semanticReview?.status === "approved-against-transcript"
  const rawReviewed = unit?.sourceFidelity?.reviewState === "reviewed-against-raw-transcript"

  if (occurrences === 0 && (semanticReviewed || rawReviewed)) {
    ledger.push({
      ...fix,
      beforeSha256: `sha256:${sha256(fix.before)}`,
      afterSha256: `sha256:${sha256(fix.after)}`,
      verification: semanticReviewed ? "superseded-by-hash-bound-semantic-transcript-review" : "superseded-by-raw-transcript-editorial-review",
      ...(semanticReviewed ? { reviewedTeachingSha256: unit.sourceFidelity.semanticReview.reviewedTeachingSha256 } : {}),
      note: "The legacy quote target no longer exists in the exact transcript-reviewed unit. No replacement is applied; the downstream embedded-quote audit validates the reviewed copy independently.",
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
  schema: "emanus-nt-embedded-quote-reviewed-fix-wave-2-ledger-v1",
  policy: "Every direct replacement is fail-closed against exact normalized wording present in the same current provisional Biblia Emanus chapter. A legacy target may be skipped only when the exact unit is already bound to transcript review; all such reader-copy quotations are still rechecked by the downstream embedded-quote audit and again when the final canonical text is frozen.",
  count: ledger.length,
  fixes: ledger,
}), "utf8")
console.log(`NT reviewed BE quote fixes wave 2: ${ledger.length}/${FIXES.length}.`)
