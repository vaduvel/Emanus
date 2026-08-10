#!/usr/bin/env node

await import("./review-nt-source-derived-fidelity-core.mjs")
// TEMPORARY bridge for rerunning the older authorized recovery job. The
// permanent workflow owns the lexical step explicitly; remove this import
// after the final review reruns are complete.
await import("./review-nt-lexicon-editorial-fixes.mjs")
await import("./normalize-nt-final-romanian-wave.mjs")
await import("./normalize-nt-final-romanian-contextual.mjs")
