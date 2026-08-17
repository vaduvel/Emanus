/**
 * Legătura dintre un verset din Scriptura și unitatea din Biblia explicată.
 *
 * Funcțiile din acest fișier sunt intenționat independente de React și DOM.
 * Astfel, aceeași regulă poate fi folosită de reader, de căutare și de audituri:
 * un verset aparține unei unități numai dacă este în intervalul ei inclusiv.
 */

export interface ExplanationUnitRangeLike {
  id: string
  ref: string
  verseStart?: number
  verseEnd?: number
}

export type ExplanationFallbackStrategy = "none" | "previous" | "next" | "nearest"

export type ExplanationRangeSource = "explicit" | "reference"

export type ExplanationRangeIssue =
  | "missing-range"
  | "partial-explicit-range"
  | "non-integer-range"
  | "range-starts-before-one"
  | "reversed-range"

export interface ExplanationRange<T extends ExplanationUnitRangeLike> {
  unit: T
  start: number
  end: number
  source: ExplanationRangeSource
  sourceIndex: number
}

export interface InvalidExplanationRange<T extends ExplanationUnitRangeLike> {
  unit: T
  issue: ExplanationRangeIssue
  sourceIndex: number
}

export interface ExplanationMappingOptions {
  /**
   * Unitățile publicate au verseStart/verseEnd. Parsarea referinței rămâne o
   * plasă de siguranță explicită pentru conținutul legacy și importurile NT.
   */
  allowReferenceRange?: boolean
  /**
   * Implicit, un gol nu este legat de o explicație vecină. Strategiile de
   * fallback oferă doar o țintă de navigare și păstrează statusul `gap`.
   */
  fallback?: ExplanationFallbackStrategy
}

export type VerseExplanationStatus = "matched" | "overlap" | "gap" | "invalid-verse"

export type VerseExplanationResolutionKind = "direct" | "fallback" | "none"

export interface VerseExplanationResolution<T extends ExplanationUnitRangeLike> {
  verse: number
  status: VerseExplanationStatus
  resolution: VerseExplanationResolutionKind
  /** Unitatea aleasă determinist; null când nu există o asociere permisă. */
  unit: T | null
  range: ExplanationRange<T> | null
  /** Toate unitățile care conțin direct versetul. Sunt mai multe la overlap. */
  matches: ExplanationRange<T>[]
  /** Unități cu intervale corupte sau absente, ignorate la asociere. */
  invalidRanges: InvalidExplanationRange<T>[]
}

export type ExplanationSelectionCoverage = "empty" | "none" | "partial" | "complete"

export interface VerseExplanationSelection<T extends ExplanationUnitRangeLike> {
  /** Versete unice, ordonate canonic. */
  verses: number[]
  results: VerseExplanationResolution<T>[]
  coverage: ExplanationSelectionCoverage
  hasOverlap: boolean
  /** Primul verset selectat este ancora de navigare a selecției. */
  primary: VerseExplanationResolution<T> | null
  /** Toate unitățile care conțin direct cel puțin un verset selectat. */
  matchedUnits: T[]
  /** Câte o alegere per verset, inclusiv fallback-urile cerute explicit. */
  resolvedUnits: T[]
  uncoveredVerses: number[]
}

const REFERENCE_RANGE = /:(\d+)(?:\s*[-–—]\s*(\d+))?\s*$/u

function rangeIssue(start: number, end: number): ExplanationRangeIssue | null {
  if (!Number.isInteger(start) || !Number.isInteger(end)) return "non-integer-range"
  if (start < 1) return "range-starts-before-one"
  if (end < start) return "reversed-range"
  return null
}

function parseReferenceRange(ref: string): readonly [number, number] | null {
  const match = ref.match(REFERENCE_RANGE)
  if (!match) return null
  const start = Number(match[1])
  const end = Number(match[2] ?? match[1])
  return rangeIssue(start, end) === null ? [start, end] : null
}

export function explanationRanges<T extends ExplanationUnitRangeLike>(
  units: readonly T[],
  options: Pick<ExplanationMappingOptions, "allowReferenceRange"> = {},
): { ranges: ExplanationRange<T>[]; invalidRanges: InvalidExplanationRange<T>[] } {
  const allowReferenceRange = options.allowReferenceRange ?? true
  const ranges: ExplanationRange<T>[] = []
  const invalidRanges: InvalidExplanationRange<T>[] = []

  units.forEach((unit, sourceIndex) => {
    const hasStart = unit.verseStart !== undefined
    const hasEnd = unit.verseEnd !== undefined

    if (hasStart !== hasEnd) {
      invalidRanges.push({ unit, issue: "partial-explicit-range", sourceIndex })
      return
    }

    if (hasStart && hasEnd) {
      const start = unit.verseStart as number
      const end = unit.verseEnd as number
      const issue = rangeIssue(start, end)
      if (issue) invalidRanges.push({ unit, issue, sourceIndex })
      else ranges.push({ unit, start, end, source: "explicit", sourceIndex })
      return
    }

    const parsed = allowReferenceRange ? parseReferenceRange(unit.ref) : null
    if (parsed) {
      ranges.push({ unit, start: parsed[0], end: parsed[1], source: "reference", sourceIndex })
      return
    }

    invalidRanges.push({ unit, issue: "missing-range", sourceIndex })
  })

  return { ranges, invalidRanges }
}

function overlapPriority<T extends ExplanationUnitRangeLike>(
  left: ExplanationRange<T>,
  right: ExplanationRange<T>,
): number {
  const spanDifference = (left.end - left.start) - (right.end - right.start)
  return spanDifference || left.sourceIndex - right.sourceIndex
}

function previousRange<T extends ExplanationUnitRangeLike>(
  ranges: readonly ExplanationRange<T>[],
  verse: number,
): ExplanationRange<T> | null {
  return ranges
    .filter((candidate) => candidate.end < verse)
    .sort((left, right) => right.end - left.end || right.start - left.start || left.sourceIndex - right.sourceIndex)[0] ?? null
}

function nextRange<T extends ExplanationUnitRangeLike>(
  ranges: readonly ExplanationRange<T>[],
  verse: number,
): ExplanationRange<T> | null {
  return ranges
    .filter((candidate) => candidate.start > verse)
    .sort((left, right) => left.start - right.start || left.end - right.end || left.sourceIndex - right.sourceIndex)[0] ?? null
}

function fallbackRange<T extends ExplanationUnitRangeLike>(
  ranges: readonly ExplanationRange<T>[],
  verse: number,
  strategy: ExplanationFallbackStrategy,
): ExplanationRange<T> | null {
  if (strategy === "none") return null
  const previous = previousRange(ranges, verse)
  const next = nextRange(ranges, verse)
  if (strategy === "previous") return previous
  if (strategy === "next") return next
  if (!previous) return next
  if (!next) return previous

  // La distanțe egale rămânem în urmă, în direcția firească a lecturii.
  return verse - previous.end <= next.start - verse ? previous : next
}

export function resolveVerseExplanation<T extends ExplanationUnitRangeLike>(
  units: readonly T[],
  verse: number,
  options: ExplanationMappingOptions = {},
): VerseExplanationResolution<T> {
  const { ranges, invalidRanges } = explanationRanges(units, options)

  if (!Number.isInteger(verse) || verse < 1) {
    return {
      verse,
      status: "invalid-verse",
      resolution: "none",
      unit: null,
      range: null,
      matches: [],
      invalidRanges,
    }
  }

  const matches = ranges
    .filter((candidate) => candidate.start <= verse && verse <= candidate.end)
    .sort(overlapPriority)

  if (matches.length > 0) {
    const range = matches[0]
    return {
      verse,
      status: matches.length === 1 ? "matched" : "overlap",
      resolution: "direct",
      unit: range.unit,
      range,
      matches,
      invalidRanges,
    }
  }

  const range = fallbackRange(ranges, verse, options.fallback ?? "none")
  return {
    verse,
    status: "gap",
    resolution: range ? "fallback" : "none",
    unit: range?.unit ?? null,
    range,
    matches: [],
    invalidRanges,
  }
}

function uniqueUnits<T extends ExplanationUnitRangeLike>(units: Array<T | null>): T[] {
  const seen = new Set<T>()
  return units.filter((unit): unit is T => {
    if (!unit || seen.has(unit)) return false
    seen.add(unit)
    return true
  })
}

export function resolveVerseExplanationSelection<T extends ExplanationUnitRangeLike>(
  units: readonly T[],
  selectedVerses: readonly number[],
  options: ExplanationMappingOptions = {},
): VerseExplanationSelection<T> {
  const verses = [...new Set(selectedVerses)].sort((left, right) => left - right)
  const results = verses.map((verse) => resolveVerseExplanation(units, verse, options))
  const directlyCovered = results.filter((result) => result.matches.length > 0).length
  const coverage: ExplanationSelectionCoverage = results.length === 0
    ? "empty"
    : directlyCovered === 0
      ? "none"
      : directlyCovered === results.length
        ? "complete"
        : "partial"

  return {
    verses,
    results,
    coverage,
    hasOverlap: results.some((result) => result.status === "overlap"),
    primary: results[0] ?? null,
    matchedUnits: uniqueUnits(results.flatMap((result) => result.matches.map((match) => match.unit))),
    resolvedUnits: uniqueUnits(results.map((result) => result.unit)),
    uncoveredVerses: results.filter((result) => result.matches.length === 0).map((result) => result.verse),
  }
}
