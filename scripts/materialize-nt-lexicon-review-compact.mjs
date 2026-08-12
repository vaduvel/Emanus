#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const dataDir = path.join(ROOT, "docs", "data", "biblia-explicata")
const packetPath = path.join(dataDir, "nt-lexicon-review-packet.jsonl")
const outputPath = path.join(dataDir, "nt-lexicon-review-compact.jsonl")

if (!fs.existsSync(packetPath)) throw new Error("missing nt-lexicon-review-packet.jsonl")
const rows = fs.readFileSync(packetPath, "utf8").split(/\r?\n/u).filter(Boolean).map((line) => JSON.parse(line))
if (!rows.length) throw new Error("lexicon review packet is empty")

const compact = rows.map((row) => {
  const evidence = row.evidence ?? {}
  if (evidence.kind === "unique") {
    return {
      n: row.n,
      reviewId: row.reviewId,
      meaningSha256: row.meaningSha256,
      bookId: row.bookId,
      chapter: row.chapter,
      ref: row.ref,
      original: row.original,
      meaning: row.meaning,
      evidenceKind: "unique",
      strongId: evidence.strongId,
      lemma: evidence.canonicalLemma,
      gloss: evidence.briefGloss,
      sourceLocator: evidence.sourceLocator,
      matchKind: evidence.matchKind,
    }
  }
  if (evidence.kind === "ambiguous") {
    return {
      n: row.n,
      reviewId: row.reviewId,
      meaningSha256: row.meaningSha256,
      bookId: row.bookId,
      chapter: row.chapter,
      ref: row.ref,
      original: row.original,
      meaning: row.meaning,
      evidenceKind: "ambiguous",
      candidates: (evidence.candidates ?? []).map((candidate) => ({
        strongId: candidate.strongId,
        lemma: candidate.canonicalLemma,
        gloss: candidate.briefGloss,
        sourceLocator: candidate.sourceLocator,
        matchKind: candidate.matchKind,
      })),
    }
  }
  return {
    n: row.n,
    reviewId: row.reviewId,
    meaningSha256: row.meaningSha256,
    bookId: row.bookId,
    chapter: row.chapter,
    ref: row.ref,
    original: row.original,
    meaning: row.meaning,
    evidenceKind: "unmatched",
    reason: evidence.morphgntProblem ?? evidence.reason ?? "unmatched",
  }
})

fs.writeFileSync(outputPath, compact.map((row) => JSON.stringify(row)).join("\n") + "\n", "utf8")
console.log(`NT lexicon compact review stream: ${compact.length} rows.`)
