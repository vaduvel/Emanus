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

const waveDiagnostic = spawnSync("python3", ["scripts/diagnose_nt_addressable_wave1_presemantic.py"], { stdio: "inherit" })
if (waveDiagnostic.status === 0) {
  const addressableWave = spawnSync("python3", ["scripts/materialize_nt_manual_semantic_addressable_wave_1.py"], { stdio: "inherit" })
  if (addressableWave.status !== 0) {
    console.error(`[addressable semantic wave 1] materializer exited with status ${addressableWave.status}`)
    process.exit(addressableWave.status ?? 1)
  }
} else if (waveDiagnostic.status === 42) {
  console.log("Addressable semantic wave 1: approval deferred until diagnostic snapshot drift is manually reconciled.")
} else {
  console.error(`[addressable semantic wave 1] diagnostic exited with status ${waveDiagnostic.status}`)
  process.exit(waveDiagnostic.status ?? 1)
}

await import("./prepare-nt-semantic-ledger-1-ioan-final.mjs")
