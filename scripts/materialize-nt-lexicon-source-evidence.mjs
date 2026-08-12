#!/usr/bin/env node

await import("./materialize-nt-lexicon-source-evidence-v4.mjs")
await import("./resolve-nt-lexicon-explicit-lemma-notes.mjs")
await import("./resolve-nt-lexicon-tflsj-fallback.mjs")
await import("./resolve-nt-lexicon-reviewed-strong-aliases.mjs")
