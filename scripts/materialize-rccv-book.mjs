#!/usr/bin/env node

import { createHash } from "node:crypto"
import { readFile, writeFile } from "node:fs/promises"
import process from "node:process"

const configPath = process.argv[2]
if (!configPath) {
  throw new Error("Utilizare: node scripts/materialize-rccv-book.mjs <config.json>")
}

const config = JSON.parse(await readFile(configPath, "utf8"))
const response = await fetch(config.sourceUrl)
if (!response.ok) {
  throw new Error(`Sursa RCCV nu a putut fi descărcată: ${response.status} ${response.statusText}`)
}
const xml = await response.text()
const digest = createHash("sha256").update(xml).digest("hex")
if (digest !== config.sourceSha256) {
  throw new Error(`SHA-256 RCCV neașteptat: ${digest}; se aștepta ${config.sourceSha256}`)
}

const start = xml.indexOf(`<book id="${config.bookId}"`)
if (start < 0) throw new Error(`Sursa RCCV nu conține cartea ${config.bookId}.`)
let end = xml.indexOf('<book id="', start + 1)
if (end < 0) end = xml.length
const segment = xml.slice(start, end)

function decodeEntities(value) {
  return value
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
}

const chapters = []
const chapterRegex = /<c id="(\d+)"\s*\/>((?:(?!<c id=").)*?)(?=<c id="\d+"\s*\/>|<\/book>|$)/gs
for (const chapterMatch of segment.matchAll(chapterRegex)) {
  const number = Number(chapterMatch[1])
  const verses = []
  const verseRegex = /<v id="(\d+)"\s*\/?>(.*?)(?=<v id="|$)/gs
  for (const verseMatch of chapterMatch[2].matchAll(verseRegex)) {
    const verseNumber = Number(verseMatch[1])
    const clean = decodeEntities(verseMatch[2].replace(/<[^>]+>/g, " "))
      .replace(/\s+/g, " ")
      .trim()
    verses[verseNumber] = clean
  }
  chapters[number] = verses
}

if (chapters.length - 1 !== config.verseCounts.length) {
  throw new Error(
    `${config.bookName}: s-au detectat ${chapters.length - 1} capitole; se așteptau ${config.verseCounts.length}.`,
  )
}

let total = 0
for (let chapter = 1; chapter <= config.verseCounts.length; chapter += 1) {
  const expected = config.verseCounts[chapter - 1]
  const actual = (chapters[chapter]?.length ?? 1) - 1
  if (actual !== expected) {
    throw new Error(`${config.bookName} ${chapter}: ${actual} versete; se așteptau ${expected}.`)
  }
  for (let verse = 1; verse <= expected; verse += 1) {
    if (!chapters[chapter][verse]) {
      throw new Error(`${config.bookName} ${chapter}:${verse}: text lipsă.`)
    }
  }
  total += actual
}

function quoted(value) {
  return JSON.stringify(value)
}

const lines = [`export const ${config.constant}: readonly (readonly string[])[] = [`, "  [],"]
for (let chapter = 1; chapter <= config.verseCounts.length; chapter += 1) {
  lines.push("  [", '    "",')
  for (let verse = 1; verse <= config.verseCounts[chapter - 1]; verse += 1) {
    lines.push(`    ${quoted(chapters[chapter][verse])},`)
  }
  lines.push("  ],")
}
lines.push(
  "]",
  "",
  `export function ${config.bookSlug}VerseCount(chapter: number): number {`,
  `  return ${config.constant}[chapter]?.length ? ${config.constant}[chapter].length - 1 : 0`,
  "}",
  "",
  `export function ${config.bookSlug}Passage(chapter: number, from: number, to: number): string {`,
  `  const verses = ${config.constant}[chapter]`,
  `  const last = ${config.bookSlug}VerseCount(chapter)`,
  "  if (!verses || from < 1 || to < from || to > last) {",
  `    throw new Error(\`[${config.bookName}] interval invalid \${chapter}:\${from}-\${to}; capitolul are \${last} versete.\`)`,
  "  }",
  '  return verses.slice(from, to + 1).join(" ")',
  "}",
  "",
)

await writeFile(config.output, `${lines.join("\n")}\n`, "utf8")
console.log(
  `${config.bookName}: ${config.verseCounts.length} capitole, ${total} versete RCCV materializate în ${config.output}.`,
)
