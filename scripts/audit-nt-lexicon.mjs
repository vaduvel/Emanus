#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ledgerPath = path.join(process.cwd(), "docs", "data", "biblia-explicata", "nt-lexicon-review-ledger.json")

await import("./check-nt-lexicon-evidence-preflight.mjs")
if (fs.existsSync(ledgerPath)) {
  const ledger = JSON.parse(fs.readFileSync(ledgerPath, "utf8"))
  if (ledger.schema !== "emanus-nt-lexicon-review-ledger-v2" || ledger.status !== "frozen" || !Array.isArray(ledger.decisions)) {
    console.error("[NT lexicon audit] existing review ledger is invalid; refusing to skip materialization")
    process.exit(1)
  }
  console.log(`NT lexicon review ledger already frozen with ${ledger.decisions.length} decisions; continuing with audits.`)
} else {
  await import("./materialize-nt-lexicon-review-ledger.mjs")
}
await import("./audit-nt-lexicon-core.mjs")
await import("./materialize-nt-lexicon-review-packet.mjs")
await import("./materialize-nt-lexicon-review-compact.mjs")
await import("./materialize-nt-lexicon-review-ultra-compact.mjs")
await import("./audit-nt-final-publication-waves.mjs")
await import("./review-nt-final-publication-findings.mjs")
await import("./check-nt-final-publication-review.mjs")
await import("./audit-nt-final-romanian-wave.mjs")
await import("./mine-nt-romanian-diacritic-candidates.mjs")
await import("./summarize-nt-romanian-diacritic-candidates.mjs")
await import("./summarize-nt-romanian-diacritic-token-list.mjs")
await import("./inspect-nt-final-romanian-contextual.mjs")
