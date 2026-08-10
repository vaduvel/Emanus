#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const manifestPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first-manifest.json")
const beDir = path.join(ROOT, "docs", "data", "biblia-emanus")
const ledgerPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-embedded-quote-fix-ledger.json")

function fail(message) { console.error(`[NT embedded quote fixer] ${message}`); process.exit(1) }
function stable(value) { return JSON.stringify(value, null, 2) + "\n" }
function sha256(value) { return crypto.createHash("sha256").update(value).digest("hex") }
function normToken(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "")
}
function words(value) {
  return [...String(value ?? "").matchAll(/[\p{L}\p{N}]+/gu)]
    .map((match) => normToken(match[0]))
    .filter(Boolean)
}
function tokenizeWithOffsets(value) {
  return [...String(value ?? "").matchAll(/[\p{L}\p{N}]+/gu)]
    .map((match) => ({ raw: match[0], norm: normToken(match[0]), start: match.index, end: match.index + match[0].length }))
    .filter((token) => token.norm)
}
function levenshteinTokens(a, b) {
  const previous = Array.from({ length: b.length + 1 }, (_, index) => index)
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i]
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = Math.min(
        current[j - 1] + 1,
        previous[j] + 1,
        previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      )
    }
    for (let j = 0; j < current.length; j += 1) previous[j] = current[j]
  }
  return previous[b.length]
}
function overlapRatio(a, b) {
  const counts = new Map()
  for (const token of a) counts.set(token, (counts.get(token) ?? 0) + 1)
  let overlap = 0
  for (const token of b) {
    const count = counts.get(token) ?? 0
    if (count > 0) {
      overlap += 1
      counts.set(token, count - 1)
    }
  }
  return overlap / Math.max(a.length, b.length, 1)
}
function extractQuotes(value) {
  const out = []
  for (const pattern of [/„([^”]+)”/gu, /«([^»]+)»/gu, /"([^"]+)"/gu]) {
    let match
    while ((match = pattern.exec(value))) {
      const quote = match[1].trim()
      if (words(quote).length >= 5) out.push(quote)
    }
  }
  return [...new Set(out)]
}
function textFields(chapter) {
  const fields = [
    [chapter, "summary"], [chapter, "literaryContext"], [chapter, "historicalContext"], [chapter, "prayer"],
  ]
  for (const unit of chapter.units ?? []) {
    fields.push([unit, "teaching"], [unit, "forYourHeart"])
  }
  return fields.filter(([owner, key]) => typeof owner?.[key] === "string" && owner[key].trim())
}
function bestCandidate(quote, rawChapter) {
  const q = words(quote)
  if (q.length < 5) return null
  const tokens = tokenizeWithOffsets(rawChapter)
  if (tokens.length < q.length) return null
  const maxEdits = q.length >= 16 ? 2 : 1
  const widthDelta = q.length >= 10 ? 2 : 1
  const candidates = []
  for (let width = Math.max(5, q.length - widthDelta); width <= q.length + widthDelta; width += 1) {
    for (let start = 0; start + width <= tokens.length; start += 1) {
      const slice = tokens.slice(start, start + width)
      const candidateTokens = slice.map((token) => token.norm)
      const distance = levenshteinTokens(q, candidateTokens)
      if (distance > maxEdits) continue
      const score = 1 - distance / Math.max(q.length, candidateTokens.length)
      const overlap = overlapRatio(q, candidateTokens)
      if (score < 0.88 || overlap < 0.8) continue
      const raw = rawChapter.slice(slice[0].start, slice.at(-1).end)
      candidates.push({ raw, score, overlap, distance, start, width })
    }
  }
  candidates.sort((a, b) => b.score - a.score || b.overlap - a.overlap || a.distance - b.distance || a.start - b.start)
  if (!candidates.length) return null
  const best = candidates[0]
  const secondDistinct = candidates.find((candidate) => candidate.raw !== best.raw)
  if (secondDistinct && best.score - secondDistinct.score < 0.08 && best.overlap - secondDistinct.overlap < 0.08) return null
  return best
}

if (!fs.existsSync(corpusDir) || !fs.existsSync(manifestPath)) fail("final corpus/manifest missing")
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"))
const beByChapter = new Map()
for (const file of fs.readdirSync(beDir).filter((name) => /^[A-Z0-9]{3}\.\d+\.json$/.test(name))) {
  const be = JSON.parse(fs.readFileSync(path.join(beDir, file), "utf8"))
  if (be.translation !== "BE" || !Array.isArray(be.verses)) continue
  beByChapter.set(`${be.bookId}.${be.chapter}`, be.verses.map((verse) => verse.text).join(" "))
}

const ledger = []
const skipped = []
const files = fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()
for (const file of files) {
  const full = path.join(corpusDir, file)
  const book = JSON.parse(fs.readFileSync(full, "utf8"))
  let changed = false
  for (const chapter of book.chapters ?? []) {
    const rawBe = beByChapter.get(`${book.bookId}.${chapter.number}`)
    if (!rawBe) fail(`missing BE ${book.bookId}.${chapter.number}`)
    const normalizedBe = words(rawBe).join(" ")
    for (const [owner, key] of textFields(chapter)) {
      let value = owner[key]
      for (const quote of extractQuotes(value)) {
        const normalizedQuote = words(quote).join(" ")
        if (normalizedBe.includes(normalizedQuote)) continue
        const candidate = bestCandidate(quote, rawBe)
        if (!candidate || candidate.raw === quote) {
          skipped.push({ bookId: book.id, chapter: chapter.number, field: key, quote, reason: "no-unique-high-confidence-same-chapter-match" })
          continue
        }
        if (!value.includes(quote)) continue
        value = value.split(quote).join(candidate.raw)
        changed = true
        ledger.push({
          bookId: book.id,
          canonicalBookId: book.bookId,
          chapter: chapter.number,
          field: key,
          before: quote,
          after: candidate.raw,
          tokenDistance: candidate.distance,
          score: Number(candidate.score.toFixed(4)),
          overlap: Number(candidate.overlap.toFixed(4)),
        })
      }
      owner[key] = value
    }
  }
  if (changed) fs.writeFileSync(full, stable(book), "utf8")
}

// Rebind manifest book digests after deterministic reader-copy edits.
for (const entry of manifest.books ?? []) {
  const file = files.find((name) => name.endsWith(`-${entry.id}.json`))
  if (!file) fail(`manifest book file missing for ${entry.id}`)
  const raw = fs.readFileSync(path.join(corpusDir, file), "utf8")
  entry.sha256 = sha256(raw)
  const parsed = JSON.parse(raw)
  entry.units = (parsed.chapters ?? []).reduce((sum, chapter) => sum + (chapter.units?.length ?? 0), 0)
}
fs.writeFileSync(manifestPath, stable(manifest), "utf8")
fs.writeFileSync(ledgerPath, stable({
  schema: "emanus-nt-embedded-quote-fix-ledger-v1",
  policy: "Only unique same-chapter Biblia Emanus candidates with <=1 token edit (<=2 for long quotes), >=0.88 sequence score and >=0.80 token overlap are replaced. Ambiguous/non-Bible quotations remain untouched and blocked for manual classification.",
  fixed: ledger.length,
  skipped: skipped.length,
  fixes: ledger,
  unresolvedCandidates: skipped,
}), "utf8")
console.log(`NT embedded quote conservative autofix: ${ledger.length} fixed / ${skipped.length} left untouched.`)
