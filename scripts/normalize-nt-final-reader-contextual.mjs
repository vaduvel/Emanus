#!/usr/bin/env node

// Final, sentence-bound reader-copy corrections. The earlier normalizer only
// touches forms that are unambiguous everywhere. This pass is intentionally
// limited to inspected fields so Romanian homographs never receive a global
// replacement merely because they look similar without diacritics.

import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const DATA = path.join(ROOT, "docs", "data", "biblia-explicata")
const CORPUS = path.join(DATA, "nt-final-source-first")
const BOOK_PATH = path.join(CORPUS, "04-ioan.json")
const MANIFEST_PATH = path.join(DATA, "nt-final-source-first-manifest.json")
const REPORT_PATH = path.join(DATA, "nt-final-reader-contextual-review.json")

function fail(message) {
  console.error(`[NT final reader contextual] ${message}`)
  process.exit(1)
}

function sha(value) {
  return `sha256:${crypto.createHash("sha256").update(String(value ?? "")).digest("hex")}`
}

function stripRomanianDiacritics(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[șȘ]/g, (match) => match === "Ș" ? "S" : "s")
    .replace(/[țȚ]/g, (match) => match === "Ț" ? "T" : "t")
    .replace(/[ăâĂÂ]/g, (match) => match === match.toUpperCase() ? "A" : "a")
    .replace(/[îÎ]/g, (match) => match === "Î" ? "I" : "i")
    .normalize("NFC")
}

function tokenPattern(token) {
  const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}(?![\\p{L}\\p{N}_])`, "gu")
}

// A replacement is either diacritics-only, which must preserve the stripped
// text exactly, or one of four explicitly reviewed spelling/grammar repairs.
// Each edit is bound to one chapter field and must match the expected count.
const OPERATIONS = [
  [1, "historicalContext", "răspicat ca toate", "răspicat că toate"],
  [1, "prayer", "mulțumim ca nu", "mulțumim că nu"],

  [2, "literaryContext", "aceeași slava se", "aceeași slavă se"],
  [2, "historicalContext", "lipsei la masa", "lipsei la masă"],
  [2, "historicalContext", "Vasele de piatra", "Vasele de piatră"],
  [2, "historicalContext", "Ioan tin de", "Ioan țin de"],
  [2, "historicalContext", "schimb de bani pentru jertfe și moneda.", "schimb de monedă pentru jertfe.", "reviewed-grammar"],
  [2, "historicalContext", "cat și ca Domn", "cât și ca Domn"],
  [2, "historicalContext", "apropierea Pastelor", "apropierea Paștelor"],
  [2, "historicalContext", "Tatălui Sau", "Tatălui Său"],
  [2, "prayer", "mulțumim ca începutul", "mulțumim că începutul"],
  [2, "prayer", "mai adânca, mai", "mai adâncă, mai"],

  [3, "summary", "Domnul ii vorbește", "Domnul îi vorbește"],
  [3, "literaryContext", "faptul ca Isus", "faptul că Isus"],
  [3, "literaryContext", "în fata noastră", "în fața noastră"],
  [3, "literaryContext", "Domnul Isus ii", "Domnul Isus îi"],
  [3, "literaryContext", "Nicodim ca problema", "Nicodim că problema"],
  [3, "prayer", "mulțumim ca nu", "mulțumim că nu"],
  [3, "prayer", "limpede ca avem", "limpede că avem"],
  [3, "prayer", "la lumina fără", "la lumină fără"],
  [3, "prayer", "noastră ca Tu", "noastră că Tu"],

  [4, "summary", "și vindeca de", "și vindecă de"],
  [4, "literaryContext", "o tema comuna", "o temă comună"],
  [4, "historicalContext", "veche și adânca", "veche și adâncă"],
  [4, "historicalContext", "Faptul ca Domnul", "Faptul că Domnul"],
  [4, "historicalContext", "arată ca chemarea", "arată că chemarea"],
  [4, "prayer", "mulțumim ca ai", "mulțumim că ai"],
  [4, "prayer", "nu pot tine inima", "nu pot ține inima"],
  [4, "prayer", "fără mascari", "fără măști", "reviewed-spelling"],

  [5, "summary", "Domnul Isus vindeca", "Domnul Isus vindecă"],
  [5, "literaryContext", "iudeilor fata de", "iudeilor față de"],
  [5, "literaryContext", "lucrarea făcuta", "lucrarea făcută"],
  [5, "historicalContext", "ochii la apa", "ochii la apă"],
  [5, "historicalContext", "în randuielile", "în rânduielile"],
  [5, "historicalContext", "Domnul spune ca Dumnezeu", "Domnul spune că Dumnezeu"],
  [5, "historicalContext", "Tatăl Sau", "Tatăl Său"],
  [5, "historicalContext", "în rand cu", "în rând cu"],
  [5, "prayer", "mulțumim ca mergi", "mulțumim că mergi"],
  [5, "prayer", "și ca nu Te", "și că nu Te"],
  [5, "prayer", "care ridica.", "care ridică."],
  [5, "prayer", "nu se bucura", "nu se bucură"],
  [5, "prayer", "viață, lumina", "viață, lumină"],

  [6, "summary", "pâinile, umbla pe", "pâinile, umblă pe"],
  [6, "historicalContext", "Pastile erau", "Paștile erau"],
  [6, "historicalContext", "legate de hrana", "legate de hrană"],
  [6, "prayer", "mulțumim ca nu", "mulțumim că nu"],

  [7, "summary", "învățătură Lui", "învățătura Lui"],
  [7, "literaryContext", "tensiunea fata de", "tensiunea față de"],
  [7, "literaryContext", "Ioan ne arată iarăși ca nimeni", "Ioan ne arată iarăși că nimeni"],
  [7, "historicalContext", "de recunostinta", "de recunoștință"],
  [7, "historicalContext", "de grija a", "de grijă a"],
  [7, "historicalContext", "capăta greutate", "capătă greutate"],
  [7, "prayer", "mulțumim ca nu", "mulțumim că nu"],
  [7, "prayer", "slava ușor văzuta", "slava ușor văzută"],
  [7, "prayer", "care judeca după", "care judecă după"],

  [8, "summary", "în fata noastră", "în fața noastră"],
  [8, "summary", "mila Domnului fata de", "mila Domnului față de"],
  [8, "summary", "chemarea la ramasul în Cuvânt", "chemarea de a rămâne în Cuvânt", "reviewed-grammar"],
  [8, "literaryContext", "o capcana intinsa", "o capcană întinsă"],
  [8, "literaryContext", "înainte ca sa se", "înainte ca să se"],
  [8, "historicalContext", "despre samanta lui", "despre sămânța lui"],
  [8, "historicalContext", "sunt simtite ca", "sunt simțite ca"],
  [8, "prayer", "mulțumim ca nu", "mulțumim că nu"],
  [8, "prayer", "inima plecata", "inima plecată"],

  [9, "summary", "Domnul Isus vindeca", "Domnul Isus vindecă"],
  [9, "summary", "la iveala atât", "la iveală atât"],
  [9, "summary", "credinței în omul vindecat, cat și", "credinței în omul vindecat, cât și"],
  [9, "summary", "care refuza lumina", "care refuză lumina"],
  [9, "literaryContext", "doar proclamata, ci", "doar proclamată, ci"],
  [9, "literaryContext", "pretind ca vad", "pretind că văd"],
  [9, "historicalContext", "de judecati pripite", "de judecăți pripite"],
  [9, "historicalContext", "o pedeapsa grea", "o pedeapsă grea"],
  [9, "historicalContext", "capăta o greutate", "capătă o greutate"],
  [9, "prayer", "mulțumim ca vezi", "mulțumim că vezi"],
  [9, "prayer", "o problema și", "o problemă și"],
  [9, "prayer", "îl chemI pe", "îl chemi pe", "reviewed-spelling"],
  [9, "prayer", "de judecati reci", "de judecăți reci"],
  [9, "prayer", "și noua curajul", "și nouă curajul"],
  [9, "prayer", "se lauda ca vede", "se laudă că vede"],
  [9, "prayer", "inima întreaga", "inima întreagă"],

  [10, "title", "și mana din", "și mâna din"],
  [10, "literaryContext", "adevăratul Pastor", "adevăratul Păstor"],
  [10, "literaryContext", "decât hoti sau", "decât hoți sau"],
  [10, "historicalContext", "Proorocii vorbiseră", "Prorocii vorbiseră", "reviewed-spelling"],
  [10, "historicalContext", "păstorii rai", "păstorii răi"],
  [10, "historicalContext", "capăta o forța", "capătă o forță"],
  [10, "historicalContext", "arată ca ascultătorii", "arată că ascultătorii"],
  [10, "historicalContext", "înțeles ca El", "înțeles că El"],
  [10, "prayer", "mulțumim ca ești", "mulțumim că ești"],
  [10, "prayer", "Păzește-ne în mana Ta", "Păzește-ne în mâna Ta"],
  [10, "prayer", "și în mana Tatălui", "și în mâna Tatălui"],
  [10, "prayer", "noastră slaba", "noastră slabă"],

  [11, "historicalContext", "Faptul ca Lazar", "Faptul că Lazăr"],
  [11, "historicalContext", "patru zile da", "patru zile dă"],
  [11, "historicalContext", "mai multa greutate", "mai multă greutate"],
  [11, "historicalContext", "frica fata de", "frica față de"],
  [11, "prayer", "mulțumim ca Tu", "mulțumim că Tu"],
  [11, "prayer", "Viața și ca nici", "Viața și că nici"],
  [11, "prayer", "în afară puterii", "în afara puterii"],
  [11, "prayer", "Mulțumim ca nu", "Mulțumim că nu"],
  [11, "prayer", "nădejdea ca jertfa", "nădejdea că jertfa"],

  [12, "summary", "încă o data la", "încă o dată la"],
  [12, "historicalContext", "arată ca orizontul", "arată că orizontul"],
  [12, "historicalContext", "pe fata arată", "pe față arată"],
  [12, "prayer", "mulțumim ca ai", "mulțumim că ai"],
  [12, "prayer", "și ca ai arătat", "și că ai arătat"],
  [12, "prayer", "arătat ca slava", "arătat că slava"],
  [12, "prayer", "prin jertfa.", "prin jertfă."],
  [12, "prayer", "moarte fata de", "moarte față de"],

  [13, "summary", "Domnul Isus spala", "Domnul Isus spală"],
  [13, "literaryContext", "fie văzuta nu", "fie văzută nu"],
  [13, "historicalContext", "slujirea făcuta", "slujirea făcută"],
  [13, "historicalContext", "sub umbra Pastilor", "sub umbra Paștilor"],
  [13, "prayer", "mulțumim ca ai", "mulțumim că ai"],
]

const TOKEN_OPERATIONS = [
  // In these chapter metadata fields, lower-case `sa` is only the subjunctive
  // marker. Possessive `Sa` remains untouched by the case-sensitive matcher.
  { chapters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], token: "sa", replacement: "să" },
  { chapters: [11, 12], token: "Lazar", replacement: "Lazăr" },
  { chapters: [3, 9, 13], token: "noua", replacement: "nouă" },
  { chapters: [11, 13], token: "pana", replacement: "până" },
  { chapters: [11, 13], token: "Sai", replacement: "Săi" },
  { chapters: [13], token: "Tai", replacement: "Tăi" },
]

const CHAPTER_FIELDS = ["title", "summary", "literaryContext", "historicalContext", "prayer"]

if (!fs.existsSync(BOOK_PATH) || !fs.existsSync(MANIFEST_PATH)) fail("missing final John corpus or manifest")
const rawBefore = fs.readFileSync(BOOK_PATH, "utf8")
const previous = fs.existsSync(REPORT_PATH) ? JSON.parse(fs.readFileSync(REPORT_PATH, "utf8")) : null
if (previous?.schema === "emanus-nt-final-reader-contextual-review-v1" && previous.afterBookSha256 === sha(rawBefore)) {
  console.log("NT final reader contextual review: already applied; 0 residual repairs.")
  process.exit(0)
}

const book = JSON.parse(rawBefore)
if (book.id !== "ioan") fail("expected Ioan final corpus")
const changes = []

function chapter(number) {
  const item = book.chapters.find((candidate) => Number(candidate.number) === number)
  if (!item) fail(`missing Ioan ${number}`)
  return item
}

function replaceExact(number, field, from, to, policy = "diacritics-only") {
  const target = chapter(number)
  const before = target[field]
  if (typeof before !== "string") fail(`Ioan ${number}.${field} is not text`)
  const matches = before.split(from).length - 1
  if (matches !== 1) fail(`Ioan ${number}.${field}: expected one exact '${from}', found ${matches}`)
  const after = before.replace(from, to)
  if (policy === "diacritics-only" && stripRomanianDiacritics(before) !== stripRomanianDiacritics(after)) {
    fail(`Ioan ${number}.${field}: ${from} -> ${to} changes more than diacritics`)
  }
  target[field] = after
  changes.push({ chapter: number, field, before: from, after: to, count: 1, policy })
}

for (const [number, field, from, to, policy] of OPERATIONS) replaceExact(number, field, from, to, policy)

for (const { chapters, token, replacement } of TOKEN_OPERATIONS) {
  for (const number of chapters) {
    const target = chapter(number)
    for (const field of CHAPTER_FIELDS) {
      const before = target[field]
      const pattern = tokenPattern(token)
      const count = [...before.matchAll(pattern)].length
      if (!count) continue
      const after = before.replace(pattern, replacement)
      if (stripRomanianDiacritics(before) !== stripRomanianDiacritics(after)) {
        fail(`Ioan ${number}.${field}: token ${token} replacement is not diacritics-only`)
      }
      target[field] = after
      changes.push({ chapter: number, field, before: token, after: replacement, count, policy: "diacritics-only, reviewed field" })
    }
  }
}

const rawAfter = JSON.stringify(book, null, 2) + "\n"
const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf8"))
const manifestBook = manifest.books?.find((item) => item.id === "ioan")
if (!manifestBook) fail("Ioan is missing from final source-first manifest")
manifestBook.sha256 = sha(rawAfter).slice("sha256:".length)

fs.writeFileSync(BOOK_PATH, rawAfter, "utf8")
fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + "\n", "utf8")
fs.writeFileSync(REPORT_PATH, JSON.stringify({
  schema: "emanus-nt-final-reader-contextual-review-v1",
  policy: "Sentence-bound final reader-copy review. Diacritics-only repairs must preserve normalized text; four reviewed grammar/spelling repairs are explicit and cannot expand beyond their listed location.",
  beforeBookSha256: sha(rawBefore),
  afterBookSha256: sha(rawAfter),
  replacementCount: changes.reduce((sum, item) => sum + item.count, 0),
  operationCount: changes.length,
  changes,
}, null, 2) + "\n", "utf8")
console.log(`NT final reader contextual review: ${changes.reduce((sum, item) => sum + item.count, 0)} repairs across ${changes.length} inspected locations.`)
