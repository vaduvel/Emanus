import { mkdir, readFile, rename, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const outputDir = path.join(root, "apps/web/public/biblia-emanus")
const booksDir = path.join(outputDir, "books")
const publicationModule = path.join(root, "packages/shared/dist/bible/publicationBibleFinal.js")
const needsFile = path.join(root, "apps/web/src/data/bible-needs.json")

function normalize(value) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
}

async function writeJson(file, value) {
  const temporary = `${file}.tmp`
  await writeFile(temporary, `${JSON.stringify(value)}\n`, "utf8")
  await rename(temporary, file)
}

let publication
try {
  publication = await import(`${pathToFileURL(publicationModule).href}?reader=${Date.now()}`)
} catch (error) {
  throw new Error(
    "Nu pot materializa readerul Biblia Emanus. Rulează mai întâi build-ul @emanus/shared.",
    { cause: error },
  )
}

const books = publication.PUBLICATION_BIBLE_BOOKS
if (!Array.isArray(books) || books.length !== 66) {
  throw new Error(`[Bible reader] se așteptau 66 de cărți, găsite ${books?.length ?? 0}.`)
}

const otBooks = books.filter((book) => book.testament === "vt")
const ntBooks = books.filter((book) => book.testament === "nt")
if (otBooks.length !== 39 || ntBooks.length !== 27) {
  throw new Error(`[Bible reader] canon incomplet: VT ${otBooks.length}/39, NT ${ntBooks.length}/27.`)
}

const needs = JSON.parse(await readFile(needsFile, "utf8"))
await rm(outputDir, { recursive: true, force: true })
await mkdir(booksDir, { recursive: true })

const catalogBooks = []
const needResults = Object.fromEntries(needs.map((need) => [need.id, []]))

for (const book of books) {
  if (book.translation !== publication.BIBLIA_EMANUS_TRANSLATION) {
    throw new Error(`[Bible reader] ${book.name} nu este legată de textul publicat Biblia Emanus.`)
  }

  await writeJson(path.join(booksDir, `${book.id}.json`), book)
  catalogBooks.push({
    id: book.id,
    name: book.name,
    testament: book.testament,
    order: book.order,
    blurb: book.blurb,
    translation: book.translation,
    chapters: book.chapters.map(({ id, bookId, number, title, summary, status }) => ({
      id,
      bookId,
      number,
      title,
      summary,
      status,
    })),
  })

  for (const chapter of book.chapters) {
    for (const unit of chapter.units) {
      const searchable = normalize(`${unit.heading} ${unit.text} ${unit.teaching} ${unit.forYourHeart ?? ""}`)
      for (const need of needs) {
        const results = needResults[need.id]
        if (results.length >= 12 || !need.terms.some((term) => searchable.includes(normalize(term)))) continue
        results.push({
          bookId: book.id,
          bookName: book.name,
          chapter: chapter.number,
          ref: unit.ref,
          heading: unit.heading,
        })
      }
    }
  }
}

await writeJson(path.join(outputDir, "catalog.json"), {
  schemaVersion: 1,
  translation: publication.BIBLIA_EMANUS_TRANSLATION,
  bookCount: books.length,
  chapterCount: books.reduce((total, book) => total + book.chapters.length, 0),
  books: catalogBooks,
})
await writeJson(path.join(outputDir, "needs.json"), { schemaVersion: 1, results: needResults })

console.log(`[Bible reader] materializate ${books.length} cărți (VT 39 + NT 27) în ${path.relative(root, outputDir)}.`)
