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

const addressableWave = spawnSync("python3", ["scripts/materialize_nt_manual_semantic_addressable_wave_1.py"], { stdio: "inherit" })
if (addressableWave.status !== 0) {
  console.error(`[addressable semantic wave 1] materializer exited with status ${addressableWave.status}`)
  process.exit(addressableWave.status ?? 1)
}

await import("./prepare-nt-semantic-ledger-1-ioan-final.mjs")
