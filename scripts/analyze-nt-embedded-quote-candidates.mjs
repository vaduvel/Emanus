#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
const beDir = path.join(ROOT, "docs", "data", "biblia-emanus")
const outputPath = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-embedded-quote-candidates.json")

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
    .map((match) => ({ norm: normToken(match[0]), start: match.index, end: match.index + match[0].length }))
    .filter((token) => token.norm)
}
function lcsLength(a, b) {
  const previous = new Array(b.length + 1).fill(0)
  for (let i = 1; i <= a.length; i += 1) {
    const current = new Array(b.length + 1).fill(0)
    for (let j = 1; j <= b.length; j += 1) {
      current[j] = a[i - 1] === b[j - 1] ? previous[j - 1] + 1 : Math.max(previous[j], current[j - 1])
    }
    for (let j = 0; j <= b.length; j += 1) previous[j] = current[j]
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
  return [
    ["summary", chapter.summary], ["literaryContext", chapter.literaryContext], ["historicalContext", chapter.historicalContext], ["prayer", chapter.prayer],
    ...(chapter.units ?? []).flatMap((unit, index) => [[`units[${index}].teaching`, unit.teaching], [`units[${index}].forYourHeart`, unit.forYourHeart]]),
  ].filter(([, value]) => typeof value === "string" && value.trim())
}
function topCandidates(quote, rawChapter) {
  const q = words(quote)
  const tokens = tokenizeWithOffsets(rawChapter)
  const candidates = []
  const delta = Math.min(5, Math.max(2, Math.floor(q.length * 0.3)))
  for (let width = Math.max(5, q.length - delta); width <= Math.min(tokens.length, q.length + delta); width += 1) {
    for (let start = 0; start + width <= tokens.length; start += 1) {
      const slice = tokens.slice(start, start + width)
      const candidateTokens = slice.map((token) => token.norm)
      const lcs = lcsLength(q, candidateTokens)
      const lcsRatio = lcs / Math.max(q.length, candidateTokens.length)
      const overlap = overlapRatio(q, candidateTokens)
      const lengthRatio = Math.min(q.length, candidateTokens.length) / Math.max(q.length, candidateTokens.length)
      const score = 0.55 * lcsRatio + 0.35 * overlap + 0.10 * lengthRatio
      if (score < 0.45) continue
      candidates.push({
        raw: rawChapter.slice(slice[0].start, slice.at(-1).end),
        score: Number(score.toFixed(4)),
        lcsRatio: Number(lcsRatio.toFixed(4)),
        overlap: Number(overlap.toFixed(4)),
        lengthRatio: Number(lengthRatio.toFixed(4)),
        start,
        width,
      })
    }
  }
  const unique = new Map()
  for (const candidate of candidates.sort((a, b) => b.score - a.score || b.lcsRatio - a.lcsRatio || b.overlap - a.overlap)) {
    if (!unique.has(candidate.raw)) unique.set(candidate.raw, candidate)
    if (unique.size >= 3) break
  }
  return [...unique.values()]
}

if (!fs.existsSync(corpusDir)) throw new Error("missing final NT corpus")
const beByKey = new Map()
for (const file of fs.readdirSync(beDir).filter((name) => /^[A-Z0-9]{3}\.\d+\.json$/.test(name))) {
  const be = JSON.parse(fs.readFileSync(path.join(beDir, file), "utf8"))
  if (be.translation === "BE" && Array.isArray(be.verses)) beByKey.set(`${be.bookId}.${be.chapter}`, be.verses.map((verse) => verse.text).join(" "))
}

const findings = []
for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
  const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8"))
  for (const chapter of book.chapters ?? []) {
    const rawBe = beByKey.get(`${book.bookId}.${chapter.number}`)
    if (!rawBe) throw new Error(`missing BE ${book.bookId}.${chapter.number}`)
    const normalizedBe = words(rawBe).join(" ")
    for (const [field, value] of textFields(chapter)) {
      for (const quote of extractQuotes(value)) {
        if (normalizedBe.includes(words(quote).join(" "))) continue
        const candidates = topCandidates(quote, rawBe)
        findings.push({
          bookId: book.id,
          canonicalBookId: book.bookId,
          chapter: chapter.number,
          field,
          quote,
          wordCount: words(quote).length,
          best: candidates[0] ?? null,
          alternatives: candidates.slice(1),
          bestMargin: candidates.length >= 2 ? Number((candidates[0].score - candidates[1].score).toFixed(4)) : null,
        })
      }
    }
  }
}

const strongCandidates = findings.filter((finding) => finding.best && finding.best.score >= 0.72 && (finding.bestMargin == null || finding.bestMargin >= 0.05))
fs.writeFileSync(outputPath, JSON.stringify({
  schema: "emanus-nt-embedded-quote-candidates-v1",
  policy: "Diagnostic only. Candidate scores compare each unresolved quoted span with contiguous Biblia Emanus text from the same canonical chapter. This report never edits reader copy or clears a publication blocker by itself.",
  count: findings.length,
  strongCandidateCount: strongCandidates.length,
  findings,
}, null, 2) + "\n", "utf8")
console.log(`NT embedded quote candidates: ${findings.length} unresolved / ${strongCandidates.length} strong diagnostic candidates.`)
