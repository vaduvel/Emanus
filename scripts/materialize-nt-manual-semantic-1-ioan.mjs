#!/usr/bin/env node
import { spawnSync } from "node:child_process"

await import("./materialize-nt-manual-semantic-1-ioan-final.mjs")
await import("./bind-nt-tit-filimon-presemantic-snapshots.mjs")
await import("./materialize-nt-manual-semantic-tit-filimon-final.mjs")
await import("./prepare-nt-semantic-ledger-filimon-quote-rebind.mjs")
await import("./materialize-nt-manual-semantic-iacov.mjs")
await import("./fix-nt-1-timotei-transcript-source-range.mjs")
await import("./bind-nt-1-timotei-presemantic-snapshots.mjs")
await import("./fix-nt-1-timotei-materializer-marker.mjs")
await import("./materialize-nt-manual-semantic-1-timotei.mjs")
await import("./restore-nt-1-timotei-materializer-marker.mjs")

const wave2ReviewPack = spawnSync("python3", ["scripts/materialize_nt_addressable_wave2_review_pack.py"], { stdio: "inherit" })
if (wave2ReviewPack.status !== 0) {
  console.error(`[addressable semantic wave 2 review pack] exited with status ${wave2ReviewPack.status}`)
  process.exit(wave2ReviewPack.status ?? 1)
}
const wave2UnitFiles = spawnSync("python3", ["scripts/materialize_nt_addressable_wave2_unit_review_files.py"], { stdio: "inherit" })
if (wave2UnitFiles.status !== 0) {
  console.error(`[addressable semantic wave 2 unit files] exited with status ${wave2UnitFiles.status}`)
  process.exit(wave2UnitFiles.status ?? 1)
}

const mateiRomanianFix = spawnSync("python3", ["scripts/fix_nt_matei_direct_romanian.py"], { stdio: "inherit" })
if (mateiRomanianFix.status !== 0) {
  console.error(`[Matei reviewed Romanian normalization] exited with status ${mateiRomanianFix.status}`)
  process.exit(mateiRomanianFix.status ?? 1)
}
const mateiDirectCountFix = spawnSync("python3", ["scripts/fix_nt_matei_direct_review_counts.py"], { stdio: "inherit" })
if (mateiDirectCountFix.status !== 0) {
  console.error(`[Matei direct semantic review totals] exited with status ${mateiDirectCountFix.status}`)
  process.exit(mateiDirectCountFix.status ?? 1)
}
const mateiDirectReview = spawnSync("python3", ["scripts/materialize_nt_manual_semantic_matei_direct.py"], { stdio: "inherit" })
if (mateiDirectReview.status !== 0) {
  console.error(`[Matei direct semantic review] exited with status ${mateiDirectReview.status}`)
  process.exit(mateiDirectReview.status ?? 1)
}

const twoCorRomanianFix = spawnSync("python3", ["scripts/fix_nt_addressable_wave1_2cor_romanian.py"], { stdio: "inherit" })
if (twoCorRomanianFix.status !== 0) {
  console.error(`[2 Corinthians wave1 Romanian fix] exited with status ${twoCorRomanianFix.status}`)
  process.exit(twoCorRomanianFix.status ?? 1)
}

const romansQuoteSnapshotFix = spawnSync("python3", ["scripts/fix_nt_addressable_wave1_romans_quote_snapshot.py"], { stdio: "inherit" })
if (romansQuoteSnapshotFix.status !== 0) {
  console.error(`[Romans wave1 quote snapshot fix] exited with status ${romansQuoteSnapshotFix.status}`)
  process.exit(romansQuoteSnapshotFix.status ?? 1)
}

const oneCorQuoteSnapshotFix = spawnSync("python3", ["scripts/fix_nt_addressable_wave1_1cor_quote_snapshots.py"], { stdio: "inherit" })
if (oneCorQuoteSnapshotFix.status !== 0) {
  console.error(`[1 Corinthians wave1 quote snapshot fix] exited with status ${oneCorQuoteSnapshotFix.status}`)
  process.exit(oneCorQuoteSnapshotFix.status ?? 1)
}

const waveDiagnostic = spawnSync("python3", ["scripts/diagnose_nt_addressable_wave1_presemantic_v2.py"], { stdio: "inherit" })
if (waveDiagnostic.status === 0) {
  const addressableWave = spawnSync("python3", ["scripts/run_nt_addressable_wave1_materializer.py"], { stdio: "inherit" })
  if (addressableWave.status !== 0) {
    console.error(`[addressable semantic wave 1] materializer launcher exited with status ${addressableWave.status}`)
    process.exit(addressableWave.status ?? 1)
  }
} else if (waveDiagnostic.status === 42) {
  console.log("Addressable semantic wave 1: approval deferred until diagnostic snapshot drift is manually reconciled.")
} else {
  console.error(`[addressable semantic wave 1] diagnostic v2 exited with status ${waveDiagnostic.status}`)
  process.exit(waveDiagnostic.status ?? 1)
}

await import("./prepare-nt-semantic-ledger-1-ioan-final.mjs")
