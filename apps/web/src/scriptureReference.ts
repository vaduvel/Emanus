const BOOK_IDS: Record<string, string> = {
  "1 ioan": "1-ioan",
  "1 tesaloniceni": "1-tesaloniceni",
  "2 corinteni": "2-corinteni",
  "2 timotei": "2-timotei",
  eclesiastul: "eclesiastul",
  evrei: "evrei",
  habacuc: "habacuc",
  iacov: "iacov",
  ieremia: "ieremia",
  ioan: "ioan",
  isaia: "isaia",
  luca: "luca",
  matei: "matei",
  proverbele: "proverbe",
  psalmul: "psalmi",
  psalmii: "psalmi",
  romani: "romani",
}

function normalizedBookName(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/gu, "")
    .trim()
    .toLocaleLowerCase("ro-RO")
}

export function scriptureUrlForReference(reference: string): string | null {
  const match = reference.trim().match(/^(.+?)\s+(\d+):(\d+)(?:[-–]\d+)?$/u)
  if (!match) return null
  const bookId = BOOK_IDS[normalizedBookName(match[1])]
  const chapter = Number(match[2])
  const verse = Number(match[3])
  if (!bookId || !Number.isSafeInteger(chapter) || !Number.isSafeInteger(verse)) return null
  return `/biblia/${bookId}/${chapter}?verset=${verse}`
}
