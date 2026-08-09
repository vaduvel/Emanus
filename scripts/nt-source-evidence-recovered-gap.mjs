const JOHN_URL = "https://www.cfcindia.com/verse-by-verse/John"
const johnRanges = [
  [1,1,1,1,18],[2,1,19,3,15],[3,3,16,4,42],[4,4,43,6,25],
  [5,6,26,7,13],[6,7,14,8,11],[7,8,12,8,47],[8,8,48,10,13],
  [9,10,14,11,53],[10,11,54,13,11],[11,13,12,14,6],[12,14,6,14,31],
  [13,15,1,16,12],[14,16,13,17,16],[15,17,17,19,27],[16,19,28,21,25],
].map(([n, sc, sv, ec, ev]) => ({
  id: `ev-recovered-ioan-official-${String(n).padStart(3,"0")}`,
  sourceId: "legacy-poonen-john",
  sourceUrl: JOHN_URL,
  officialSeriesUrl: JOHN_URL,
  sourceTitle: "Verse By Verse - John",
  locator: `Episode ${n}: John ${sc}:${sv}-${ec}:${ev}`,
  evidenceKind: "official-source-coverage",
  verificationLevel: "source-locator-reviewed",
  claimSummary: `Pagina oficială CFC fixează episodul ${n} din studiul Ioan la intervalul ${sc}:${sv}-${ec}:${ev}.`,
  coverageStartChapter: sc, coverageStartVerse: sv, coverageEndChapter: ec, coverageEndVerse: ev,
}))

const TITUS_URL = "https://www.cfcindia.com/verse-by-verse/Titus"
const titusRanges = [
  [1,1,1,2,10],
  [2,2,11,3,15],
].map(([n, sc, sv, ec, ev]) => ({
  id: `ev-recovered-tit-official-${String(n).padStart(3,"0")}`,
  sourceId: "legacy-poonen-titus",
  sourceUrl: TITUS_URL,
  officialSeriesUrl: "https://www.cfcindia.com/verse-by-verse",
  sourceTitle: "Verse By Verse - Titus",
  locator: `Episode ${n}: Titus ${sc}:${sv}-${ec}:${ev}`,
  evidenceKind: "official-source-coverage",
  verificationLevel: "source-locator-reviewed",
  claimSummary: `Seria oficială CFC fixează episodul ${n} din studiul Tit la intervalul ${sc}:${sv}-${ec}:${ev}.`,
  coverageStartChapter: sc, coverageStartVerse: sv, coverageEndChapter: ec, coverageEndVerse: ev,
}))

export const NT_SOURCE_EVIDENCE_RECOVERED_GAP = [...johnRanges, ...titusRanges]
