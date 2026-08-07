import type { ExplainedBookOverlay, ExplainedOverlayChapter, ExplainedOverlayUnit } from "./explainedOverlay.js"

export interface ChapterNarrative {
  title: string
  summary: string
}

export type VerseCounts = Readonly<Record<number, number>>

const narrativeSource = {
  kind: "biblia-emanus" as const,
  note: "explicație textuală a capitolului, fără doctrină adăugată" as const,
}

function uncoveredRanges(lastVerse: number, units: readonly ExplainedOverlayUnit[]): Array<[number, number]> {
  const ranges = units
    .map((unit) => [Math.max(1, unit.from), Math.min(lastVerse, unit.to)] as [number, number])
    .filter(([from, to]) => from <= to)
    .sort((a, b) => a[0] - b[0])

  const gaps: Array<[number, number]> = []
  let cursor = 1
  for (const [from, to] of ranges) {
    if (from > cursor) gaps.push([cursor, from - 1])
    cursor = Math.max(cursor, to + 1)
  }
  if (cursor <= lastVerse) gaps.push([cursor, lastVerse])
  return gaps
}

/**
 * Completează numai golurile lăsate de transcript.
 * - unitățile Poonen existente rămân neschimbate;
 * - golurile primesc doar explicație textuală din Biblia Emanus;
 * - nu introduce doctrină, tipologie sau aplicații în golurile sursei;
 * - fiecare verset al fiecărui capitol ajunge acoperit de cel puțin o unitate.
 */
export function completeOverlayCoverage(
  book: ExplainedBookOverlay,
  verseCounts: VerseCounts,
  narratives: Readonly<Record<number, ChapterNarrative>>,
): ExplainedBookOverlay {
  const chapters: ExplainedOverlayChapter[] = book.chapters.map((chapter) => {
    const lastVerse = verseCounts[chapter.number]
    const narrative = narratives[chapter.number]
    if (!lastVerse) throw new Error(`[${book.name} ${chapter.number}] lipsește numărul de versete.`)
    if (!narrative) throw new Error(`[${book.name} ${chapter.number}] lipsește explicația textuală.`)

    const gaps = uncoveredRanges(lastVerse, chapter.units)
    const fillers: ExplainedOverlayUnit[] = gaps.map(([from, to]) => ({
      from,
      to,
      heading: narrative.title,
      teaching: narrative.summary,
      source: narrativeSource,
    }))

    return {
      ...chapter,
      title: chapter.title || narrative.title,
      summary:
        chapter.summary.includes("Transcriptul Poonen nu îl dezvoltă separat")
          ? narrative.summary
          : chapter.summary,
      units: [...chapter.units, ...fillers].sort((a, b) => a.from - b.from || a.to - b.to),
    }
  })

  return {
    ...book,
    coverageMode: "full",
    chapters,
  }
}

export function assertVerseCompleteOverlay(
  book: ExplainedBookOverlay,
  verseCounts: VerseCounts,
): ExplainedBookOverlay {
  book.chapters.forEach((chapter) => {
    const lastVerse = verseCounts[chapter.number]
    if (!lastVerse) throw new Error(`[${book.name} ${chapter.number}] lipsește numărul de versete.`)
    const gaps = uncoveredRanges(lastVerse, chapter.units)
    if (gaps.length) {
      throw new Error(
        `[${book.name} ${chapter.number}] intervale neexplicate: ${gaps
          .map(([from, to]) => `${from}-${to}`)
          .join(", ")}.`,
      )
    }
  })
  return book
}
