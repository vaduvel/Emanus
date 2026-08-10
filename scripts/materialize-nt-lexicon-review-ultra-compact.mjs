#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const dataDir = path.join(ROOT, "docs", "data", "biblia-explicata")
const packetPath = path.join(dataDir, "nt-lexicon-review-packet.jsonl")
const outputPath = path.join(dataDir, "nt-lexicon-review-ultra-compact.tsv")

if (!fs.existsSync(packetPath)) throw new Error("missing nt-lexicon-review-packet.jsonl")
const rows = fs.readFileSync(packetPath, "utf8").split(/\r?\n/u).filter(Boolean).map((line) => JSON.parse(line))
if (!rows.length) throw new Error("lexicon review packet is empty")

const clean = (value) => String(value ?? "").replace(/[\t\r\n]+/gu, " ").replace(/\s+/gu, " ").trim()
const lines = ["n\treviewId\tmeaningSha256\tref\toriginal\tmeaning\tevidence\tstrongLemma\tglossLocator"]
for (const row of rows) {
  const evidence = row.evidence ?? {}
  const evidenceKind = evidence.kind ?? "unknown"
  let strongLemma = ""
  let glossLocator = ""
  if (evidenceKind === "unique") {
    strongLemma = `${evidence.strongId ?? ""} ${evidence.canonicalLemma ?? ""}`.trim()
    glossLocator = `${evidence.briefGloss ?? ""} @ ${evidence.sourceLocator ?? ""}`.trim()
  } else if (evidenceKind === "ambiguous") {
    strongLemma = (evidence.candidates ?? []).map((candidate) => `${candidate.strongId}:${candidate.canonicalLemma}`).join(" || ")
    glossLocator = (evidence.candidates ?? []).map((candidate) => `${candidate.briefGloss}@${candidate.sourceLocator}`).join(" || ")
  } else {
    glossLocator = evidence.morphgntProblem ?? evidence.reason ?? "unmatched"
  }
  lines.push([
    row.n,
    clean(row.reviewId),
    clean(row.meaningSha256),
    clean(row.ref),
    clean(row.original),
    clean(row.meaning),
    clean(evidenceKind),
    clean(strongLemma),
    clean(glossLocator),
  ].join("\t"))
}
fs.writeFileSync(outputPath, lines.join("\n") + "\n", "utf8")
console.log(`NT lexicon ultra compact review table: ${rows.length} rows.`)
