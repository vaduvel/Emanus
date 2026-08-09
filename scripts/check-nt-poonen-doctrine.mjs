#!/usr/bin/env node

import fs from "node:fs"
import path from "node:path"

const ROOT = process.cwd()
const corpusDir = path.join(ROOT, "docs", "data", "biblia-explicata", "nt-final-source-first")
function fail(message) { console.error(`[NT Poonen doctrine gate] ${message}`); process.exit(1) }
function norm(text) { return String(text ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[„”«»"'’]/g, "").replace(/\s+/g, " ") }
function loadCorpus() {
  if (!fs.existsSync(corpusDir)) fail("missing nt-final-source-first corpus")
  const books = new Map()
  for (const file of fs.readdirSync(corpusDir).filter((name) => name.endsWith(".json")).sort()) {
    const book = JSON.parse(fs.readFileSync(path.join(corpusDir, file), "utf8")); books.set(book.id, book)
  }
  return books
}
function chapterText(books, bookId, chapterNumber) {
  const book = books.get(bookId); if (!book) fail(`missing book ${bookId}`)
  const chapter = book.chapters.find((entry) => entry.number === chapterNumber); if (!chapter) fail(`missing ${bookId} ${chapterNumber}`)
  return norm([chapter.title, chapter.summary, chapter.literaryContext, chapter.historicalContext, ...(chapter.units ?? []).flatMap((unit) => [unit.heading, unit.teaching, unit.forYourHeart]), chapter.prayer].filter(Boolean).join("\n"))
}
function allOf(text, patterns, label) { for (const pattern of patterns) if (!pattern.test(text)) fail(`${label}: missing required source-first concept ${pattern}`) }
function anyOf(text, patterns, label) { if (!patterns.some((pattern) => pattern.test(text))) fail(`${label}: none of required source-first concepts found: ${patterns.join(" OR ")}`) }
function noneOf(text, patterns, label) { for (const pattern of patterns) if (pattern.test(text)) fail(`${label}: diluting/contradicting pattern detected ${pattern}`) }

const books = loadCorpus(); if (books.size !== 27) fail(`books ${books.size}/27`)
const assertions = []
function check(bookId, chapter, fn) { const label = `${bookId} ${chapter}`; fn(chapterText(books, bookId, chapter), label); assertions.push(label) }

check("2-tesaloniceni", 2, (t, l) => {
  allOf(t, [/apostaz|lepadarea de credinta/, /antihrist|omul faradelegii/, /strangerea|adunarea/, /mai intai|inainte/, /iub.*adevar|adevar.*iub/], l)
  anyOf(t, [/nu trebuie.*ideea.*disparea.*inainte.*antihrist/, /antihrist.*inainte.*strangerea/], l)
  noneOf(t, [/o posibila lectura/, /interpretari diferite/], l)
})
check("1-timotei", 2, (t, l) => { allOf(t, [/femei|femeia/, /autoritate|invatator|invata/, /barbat/, /ruga|proroc/], l); noneOf(t, [/doar o norma culturala/, /nu mai este valabil/, /o posibila lectura/, /interpretari diferite/], l) })
check("1-timotei", 3, (t, l) => allOf(t, [/prezbiter|supraveghetor/, /famil|casa/, /bani|lacom|castig/, /caracter|fara repros|cumpatat/], l))
check("2-timotei", 4, (t, l) => { allOf(t, [/predic|propovadui.*cuvant/, /gadil|urech/, /standard/, /multim|ucenic/], l); noneOf(t, [/adaptam standardul/, /standardul.*relativ/], l) })
check("evrei", 2, (t, l) => allOf(t, [/om|omeneasc|asemenea fratilor/, /ispit/, /sufer/, /fara pacat/], l))
check("evrei", 5, (t, l) => allOf(t, [/invatat ascultarea/, /sufer/, /matur|hrana tare/], l))
check("evrei", 6, (t, l) => { allOf(t, [/desavars|matur/, /cadere|cad/, /avertis/], l); noneOf(t, [/avertisment.*ipotetic/, /nu se poate cadea/], l) })
check("evrei", 10, (t, l) => allOf(t, [/calea noua si vie|cale noua.*vie/, /ascult/, /pacat.*voit|pacatul voit/, /credinta/], l))
check("evrei", 11, (t, l) => { allOf(t, [/credinta/, /unii.*izbav|eliber/, /altii|altele/, /inviere mai buna|mai buna/], l); noneOf(t, [/credinta.*garanteaza.*confort/, /credinta.*garanteaza.*prosper/], l) })
check("iacov", 2, (t, l) => allOf(t, [/credinta/, /fapte/, /moart/], l))
check("1-petru", 2, (t, l) => { allOf(t, [/supun|autoritat/, /sufer.*nedrept|nedrept.*sufer/, /hristos/, /model|exempl|urmeaz/], l); noneOf(t, [/victim/, /abuz/, /raportarea/, /protectie juridica/], l) })
check("1-petru", 3, (t, l) => { allOf(t, [/sot|sotii|sotiile/, /supun/, /cinste|onoare/, /sufer.*drept|dreptate/], l); noneOf(t, [/victim/, /abuz/, /consimtam/, /protectie juridica/], l) })
check("2-petru", 2, (t, l) => allOf(t, [/invatatori falsi|falsii invatatori/, /sexual|senzual|imoral/, /bani|castig|lacom|plata/, /balaam/], l))
check("1-ioan", 4, (t, l) => allOf(t, [/isus.*venit in trup|venit in trup/, /duh/, /dragoste/, /om real|omeneasc|ascult/], l))
check("iuda", 1, (t, l) => {
  allOf(t, [/har/, /pacat|destrabal/, /egipt/, /salvat|scos/, /pierit|nimicit|necredin/], l)
  // Positive source assertion: a good beginning does NOT make falling impossible.
  anyOf(t, [/inceput bun.*nu.*imposibil.*cad/, /siguranta falsa.*inceput bun.*imposibil.*cad/, /salvat.*egipt.*pierit/], l)
})
check("apocalipsa", 7, (t, l) => { allOf(t, [/necazul cel mare|marele necaz/, /multim/, /miel/], l); anyOf(t, [/biserica.*nu primeste promisiunea.*evita.*necaz/, /credincios.*prin.*necaz/, /vin din necazul cel mare/], l) })
check("apocalipsa", 13, (t, l) => { allOf(t, [/antihrist/, /fiara/, /inchinare/, /semn/], l); anyOf(t, [/biserica trebuie sa fie pregatita/, /credincios.*pregatit/, /nu.*presupunerea.*antihrist.*nu va fi vazut/], l) })
check("apocalipsa", 17, (t, l) => allOf(t, [/babilon/, /desfranat|curva/, /relig/, /putere|bogat|lume/], l))
check("apocalipsa", 18, (t, l) => allOf(t, [/iesiti.*babilon|iesiti din ea/, /bogat|comerci|piata/, /sistem/], l))
check("apocalipsa", 20, (t, l) => allOf(t, [/o mie de ani|1000 de ani|mileniu/, /satan/, /domn.*hristos|hristos.*domn/, /judec/], l))

for (const [bookId, book] of books) for (const chapter of book.chapters) {
  noneOf(chapterText(books, bookId, chapter.number), [/o posibila lectura/, /o interpretare posibila/, /crestinii interpreteaza diferit/, /exista mai multe interpretari/, /nu impunem aceasta interpretare/, /poonen/, /christian fellowship/, /sermonindex/], `${bookId} ${chapter.number}`)
}
console.log(`NT Poonen doctrine gate OK: ${assertions.length} critical chapter assertions passed.`)
console.log("Distinctive source doctrines and anti-dilution constraints are present in the final 27-book corpus.")
