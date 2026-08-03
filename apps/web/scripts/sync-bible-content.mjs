import { readFileSync } from "node:fs"
import { resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { createClient } from "@supabase/supabase-js"
import { BIBLE_BOOKS, BIBLE_TRANSLATION } from "@emanus/shared/bible"

const here = fileURLToPath(new URL(".", import.meta.url))
const root = resolve(here, "../../..")
const dryRun = process.argv.includes("--dry-run")

function readEnvFile(path) {
  try {
    const entries = {}
    for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
      const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
      if (!match) continue
      let value = match[2]
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      entries[match[1]] = value
    }
    return entries
  } catch {
    return {}
  }
}

const env = {
  ...readEnvFile(resolve(root, ".env")),
  ...readEnvFile(resolve(root, "apps/web/.env.local")),
  ...process.env,
}

function normalize(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim()
}

function chunks(items, size = 100) {
  const result = []
  for (let index = 0; index < items.length; index += size) result.push(items.slice(index, index + size))
  return result
}

function validateSource() {
  const ids = new Set()
  let chapters = 0
  let units = 0
  for (const book of BIBLE_BOOKS) {
    if (ids.has(book.id)) throw new Error(`ID duplicat: ${book.id}`)
    ids.add(book.id)
    const chapterNumbers = new Set()
    for (const chapter of book.chapters) {
      chapters += 1
      if (chapter.bookId !== book.id) throw new Error(`${chapter.id}: bookId gresit`)
      if (chapterNumbers.has(chapter.number)) throw new Error(`${book.id}: capitol duplicat ${chapter.number}`)
      chapterNumbers.add(chapter.number)
      if (ids.has(chapter.id)) throw new Error(`ID duplicat: ${chapter.id}`)
      ids.add(chapter.id)
      for (const unit of chapter.units) {
        units += 1
        if (ids.has(unit.id)) throw new Error(`ID duplicat: ${unit.id}`)
        ids.add(unit.id)
      }
    }
  }
  return { books: BIBLE_BOOKS.length, chapters, units }
}

const totals = validateSource()
if (dryRun) {
  console.log(`Sursa Bibliei este valida: ${totals.books} carti, ${totals.chapters} capitole, ${totals.units} unitati.`)
  process.exit(0)
}

const url = env.SUPABASE_URL || env.VITE_SUPABASE_URL
const secret = env.SUPABASE_SECRET_KEY || env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !secret) {
  throw new Error("Lipsesc SUPABASE_URL si SUPABASE_SECRET_KEY/SUPABASE_SERVICE_ROLE_KEY.")
}

const supabase = createClient(url, secret, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
})

function fail(label, error) {
  if (error) throw new Error(`${label}: ${error.message}`)
}

const stamp = new Date().toISOString()

for (const book of BIBLE_BOOKS) {
  const { error: bookError } = await supabase.from("bible_books").upsert({
    id: book.id,
    name: book.name,
    testament: book.testament,
    book_order: book.order,
    blurb: book.blurb,
    translation: BIBLE_TRANSLATION,
    updated_at: stamp,
  })
  fail(`Cartea ${book.id}`, bookError)

  for (const chapter of book.chapters) {
    const { error: chapterError } = await supabase.from("bible_chapters").upsert({
      id: chapter.id,
      book_id: chapter.bookId,
      chapter_number: chapter.number,
      title: chapter.title,
      summary: chapter.summary,
      literary_context: chapter.literaryContext,
      historical_context: chapter.historicalContext,
      prayer: chapter.prayer,
      status: chapter.status,
      updated_at: stamp,
    })
    fail(`Capitolul ${chapter.id}`, chapterError)

    const rows = chapter.units.map((unit, unitOrder) => ({
      id: unit.id,
      chapter_id: chapter.id,
      unit_order: unitOrder,
      ref: unit.ref,
      heading: unit.heading,
      bible_text: unit.text,
      teaching: unit.teaching,
      words: unit.words ?? [],
      cross_refs: unit.crossRefs ?? [],
      for_your_heart: unit.forYourHeart ?? null,
      search_text: normalize([
        book.name,
        chapter.title,
        chapter.summary,
        unit.ref,
        unit.heading,
        unit.text,
        unit.teaching,
        unit.forYourHeart ?? "",
        ...(unit.crossRefs ?? []),
        ...(unit.words ?? []).flatMap((word) => [word.original, word.transliteration, word.meaning]),
      ].join(" ")),
      updated_at: stamp,
    }))

    for (const batch of chunks(rows)) {
      const { error } = await supabase.from("bible_units").upsert(batch)
      fail(`Unitatile din ${chapter.id}`, error)
    }

    const { data: existing, error: listError } = await supabase
      .from("bible_units")
      .select("id")
      .eq("chapter_id", chapter.id)
    fail(`Inventarul din ${chapter.id}`, listError)
    const currentIds = new Set(rows.map((row) => row.id))
    const staleIds = (existing ?? []).map((row) => String(row.id)).filter((id) => !currentIds.has(id))
    for (const batch of chunks(staleIds)) {
      const { error } = await supabase.from("bible_units").delete().in("id", batch)
      fail(`Curatarea din ${chapter.id}`, error)
    }
  }

  console.log(`${book.name}: ${book.chapters.length} capitole sincronizate.`)
}

console.log(`Gata: ${totals.books} carti, ${totals.chapters} capitole, ${totals.units} unitati.`)
