#!/usr/bin/env node
import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const TARGET = path.join(ROOT, "scripts/materialize-nt-manual-semantic-1-timotei.mjs")
const OLD = '      "a woman can pray and prophesy",'
const NEW = '      "women to pray and prophesy",'

if (!fs.existsSync(TARGET)) {
  console.error("[1 Timotei marker fix] materializer missing")
  process.exit(1)
}
const source = fs.readFileSync(TARGET, "utf8")
const oldCount = source.split(OLD).length - 1
const newCount = source.split(NEW).length - 1
if (oldCount === 1 && newCount === 0) {
  fs.writeFileSync(TARGET, source.replace(OLD, NEW), "utf8")
  console.log("1 Timotei marker fix: aligned one semantic integrity marker to an exact single-segment transcript phrase.")
} else if (oldCount === 0 && newCount === 1) {
  console.log("1 Timotei marker fix: exact transcript marker already aligned.")
} else {
  console.error(`[1 Timotei marker fix] unexpected marker state old=${oldCount} new=${newCount}`)
  process.exit(1)
}
