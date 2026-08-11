#!/usr/bin/env node

await import("./rebind-nt-semantic-conservative-quote-fixes.mjs")
await import("./apply-nt-reviewed-be-quote-fixes-wave-1.mjs")
await import("./apply-nt-reviewed-be-quote-fixes-wave-2.mjs")
await import("./run-nt-reviewed-be-quote-fixes-wave-3-semantic-aware.mjs")
await import("./rebind-nt-semantic-postquote-wave1.mjs")
await import("./rebind-nt-semantic-postquote-matei.mjs")
await import("./apply-nt-embedded-quote-final-review.mjs")
await import("./check-nt-semantic-final-hash-consistency.mjs")
await import("./finalize-nt-source-traceability-metadata.mjs")
