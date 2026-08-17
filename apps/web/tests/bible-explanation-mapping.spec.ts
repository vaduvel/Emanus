import { readdir, readFile } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import { expect, test } from "@playwright/test"
import {
  explanationRanges,
  resolveVerseExplanation,
  resolveVerseExplanationSelection,
  type ExplanationUnitRangeLike,
} from "../src/bible/explanationMapping"

function unit(id: string, verseStart?: number, verseEnd?: number, ref = `Test 1:${verseStart ?? "?"}-${verseEnd ?? "?"}`): ExplanationUnitRangeLike {
  return { id, ref, verseStart, verseEnd }
}

test.describe("asocierea versetului cu Biblia explicată", () => {
  test("include începutul, mijlocul și finalul fiecărui interval", () => {
    const units = [unit("one", 1, 1), unit("passage", 3, 5), unit("last", 29, 31)]

    expect(resolveVerseExplanation(units, 3)).toMatchObject({
      status: "matched",
      resolution: "direct",
      unit: { id: "passage" },
      range: { start: 3, end: 5 },
    })
    expect(resolveVerseExplanation(units, 4).unit?.id).toBe("passage")
    expect(resolveVerseExplanation(units, 5).unit?.id).toBe("passage")
    expect(resolveVerseExplanation(units, 31)).toMatchObject({
      status: "matched",
      resolution: "direct",
      unit: { id: "last" },
      range: { start: 29, end: 31 },
    })
  })

  test("un gol nu primește implicit explicația vecină, iar fallback-ul rămâne etichetat", () => {
    const units = [unit("before", 1, 3), unit("after", 6, 8)]

    expect(resolveVerseExplanation(units, 4)).toMatchObject({
      status: "gap",
      resolution: "none",
      unit: null,
      matches: [],
    })
    expect(resolveVerseExplanation(units, 4, { fallback: "previous" })).toMatchObject({
      status: "gap",
      resolution: "fallback",
      unit: { id: "before" },
    })
    expect(resolveVerseExplanation(units, 4, { fallback: "next" }).unit?.id).toBe("after")
    expect(resolveVerseExplanation(units, 4, { fallback: "nearest" }).unit?.id).toBe("before")
    expect(resolveVerseExplanation(units, 5, { fallback: "nearest" }).unit?.id).toBe("after")

    // După ultimul interval, `nearest` poate naviga înapoi, fără a pretinde
    // că versetul este acoperit direct de explicație.
    expect(resolveVerseExplanation(units, 9, { fallback: "nearest" })).toMatchObject({
      status: "gap",
      resolution: "fallback",
      unit: { id: "after" },
      matches: [],
    })
  })

  test("suprapunerile sunt raportate și aleg determinist intervalul cel mai specific", () => {
    const units = [unit("wide", 18, 27), unit("specific", 27, 29)]
    const result = resolveVerseExplanation(units, 27)

    expect(result.status).toBe("overlap")
    expect(result.resolution).toBe("direct")
    expect(result.unit?.id).toBe("specific")
    expect(result.matches.map((match) => match.unit.id)).toEqual(["specific", "wide"])
  })

  test("intervalele invalide sunt ignorate și diagnosticate fără asociere falsă", () => {
    const units = [
      unit("reversed", 8, 4),
      unit("partial", 3, undefined),
      unit("fractional", 1.5, 2),
      unit("zero", 0, 2),
      unit("missing", undefined, undefined, "referință fără verset"),
      unit("valid", 10, 12),
    ]
    const result = resolveVerseExplanation(units, 2, { allowReferenceRange: false })

    expect(result).toMatchObject({ status: "gap", resolution: "none", unit: null })
    expect(result.invalidRanges.map(({ unit: invalid, issue }) => [invalid.id, issue])).toEqual([
      ["reversed", "reversed-range"],
      ["partial", "partial-explicit-range"],
      ["fractional", "non-integer-range"],
      ["zero", "range-starts-before-one"],
      ["missing", "missing-range"],
    ])
    expect(resolveVerseExplanation(units, 0).status).toBe("invalid-verse")
    expect(resolveVerseExplanation(units, 2.5).status).toBe("invalid-verse")
  })

  test("intervalele NT pot fi legate explicit sau, controlat, din referință", () => {
    const ntUnits = [
      unit("mat-1-10", undefined, undefined, "Matei 1:1–10"),
      unit("mat-11-17", 11, 17, "Matei 1:11-17"),
      unit("mat-18-25", undefined, undefined, "Matei 1:18-25"),
    ]

    expect(resolveVerseExplanation(ntUnits, 1)).toMatchObject({
      unit: { id: "mat-1-10" },
      range: { start: 1, end: 10, source: "reference" },
    })
    expect(resolveVerseExplanation(ntUnits, 10).unit?.id).toBe("mat-1-10")
    expect(resolveVerseExplanation(ntUnits, 11)).toMatchObject({
      unit: { id: "mat-11-17" },
      range: { source: "explicit" },
    })
    expect(resolveVerseExplanation(ntUnits, 25).unit?.id).toBe("mat-18-25")

    const strict = resolveVerseExplanation(ntUnits, 5, { allowReferenceRange: false })
    expect(strict).toMatchObject({ status: "gap", unit: null })
    expect(strict.invalidRanges.map(({ unit: invalid }) => invalid.id)).toEqual(["mat-1-10", "mat-18-25"])
  })

  test("selecția multiplă este ordonată, deduplicată și rezolvată pentru toate versetele", () => {
    const units = [unit("first", 1, 3), unit("second", 4, 6)]
    const selection = resolveVerseExplanationSelection(units, [5, 2, 2, 8])

    expect(selection.verses).toEqual([2, 5, 8])
    expect(selection.coverage).toBe("partial")
    expect(selection.primary?.verse).toBe(2)
    expect(selection.primary?.unit?.id).toBe("first")
    expect(selection.matchedUnits.map(({ id }) => id)).toEqual(["first", "second"])
    expect(selection.resolvedUnits.map(({ id }) => id)).toEqual(["first", "second"])
    expect(selection.uncoveredVerses).toEqual([8])

    const samePassage = resolveVerseExplanationSelection(units, [3, 1, 2])
    expect(samePassage.coverage).toBe("complete")
    expect(samePassage.matchedUnits.map(({ id }) => id)).toEqual(["first"])
    expect(resolveVerseExplanationSelection(units, []).coverage).toBe("empty")
  })
})

interface RuntimeChapter {
  number: number
  verses?: Array<{ number: number }>
  units: ExplanationUnitRangeLike[]
}

interface RuntimeBook {
  id: string
  name: string
  chapters: RuntimeChapter[]
}

test("audit exhaustiv: toate intervalele materializate folosesc aceeași regulă inclusivă", async ({}, testInfo) => {
  const booksDirectory = fileURLToPath(new URL("../public/biblia-emanus/books/", import.meta.url))
  const files = (await readdir(booksDirectory)).filter((file) => file.endsWith(".json")).sort()
  const invalidRanges: string[] = []
  const resolutionErrors: string[] = []
  const gaps: string[] = []
  const overlaps: string[] = []
  let chapterCount = 0
  let verseCount = 0
  let unitCount = 0

  for (const file of files) {
    const book = JSON.parse(await readFile(`${booksDirectory}/${file}`, "utf8")) as RuntimeBook
    for (const chapter of book.chapters) {
      chapterCount += 1
      unitCount += chapter.units.length
      const parsed = explanationRanges(chapter.units, { allowReferenceRange: false })
      invalidRanges.push(...parsed.invalidRanges.map(({ unit: invalid, issue }) => `${book.id} ${chapter.number} ${invalid.ref}: ${issue}`))

      for (const { number } of chapter.verses ?? []) {
        verseCount += 1
        const result = resolveVerseExplanation(chapter.units, number, {
          allowReferenceRange: false,
          fallback: "nearest",
        })

        if (result.status === "gap") gaps.push(`${book.name} ${chapter.number}:${number}`)
        if (result.status === "overlap") overlaps.push(`${book.name} ${chapter.number}:${number}`)
        if (result.resolution === "direct") {
          if (!result.range || result.range.start > number || result.range.end < number) {
            resolutionErrors.push(`${book.name} ${chapter.number}:${number}: asociere directă în afara intervalului`)
          }
        } else if (chapter.units.length > 0) {
          if (result.resolution !== "fallback") {
            resolutionErrors.push(`${book.name} ${chapter.number}:${number}: fallback nearest absent`)
          }
        } else {
          if (result.resolution !== "none") {
            resolutionErrors.push(`${book.name} ${chapter.number}:${number}: capitol fără unități a primit o asociere`)
          }
        }
      }
    }
  }

  await testInfo.attach("bible-explanation-coverage.json", {
    body: JSON.stringify({
      books: files.length,
      chapters: chapterCount,
      verses: verseCount,
      units: unitCount,
      gaps: gaps.length,
      overlaps: overlaps.length,
      gapExamples: gaps.slice(0, 20),
      overlapExamples: overlaps.slice(0, 20),
    }, null, 2),
    contentType: "application/json",
  })

  expect(files).toHaveLength(66)
  expect(chapterCount).toBeGreaterThan(1_100)
  expect(verseCount).toBeGreaterThan(30_000)
  expect(invalidRanges).toEqual([])
  expect(resolutionErrors).toEqual([])
  expect(gaps).toEqual([])
  expect(overlaps).toEqual([])
})
