import type { BibleChapter, BibleUnit } from "./types.js"

const IMPARATI1_EXPLANATION_SOURCE = "Zac Poonen — Through The Bible: 1 Kings"
const HEBREW_WORD_SOURCE = "WLC-OSHB"
const TEXTUAL_SOURCE =
  "Emanus — rezumat textual după narațiunea din 1 Împărați; fără doctrină adăugată"

const IMPARATI1_20_TEXTUAL_TEACHING =
  "Capitolul 20 relatează două războaie dintre Ahab și Ben-Hadad, regele Aramului. La primul asediu, cererile lui Ben-Hadad cresc de la argint, aur și familie la dreptul de a cerceta casele și de a lua ce îi place. Un proroc îi vestește lui Ahab că DOMNUL va da mulțimea în mâna lui, iar Israel câștigă lupta. Anul următor, slujitorii lui Ben-Hadad susțin că Dumnezeul lui Israel ar fi un dumnezeu al munților; o nouă înfrângere a arameilor contrazice această afirmație. Ben-Hadad cere apoi milă, iar Ahab încheie un legământ cu el și îl lasă să plece. Finalul capitolului prezintă un proroc care îl confruntă pe Ahab printr-o scenă judiciară și îi vestește consecința pentru faptul că l-a eliberat pe omul pe care mesajul profetic îl declarase dat spre nimicire. Overview-ul consemnează aceste evenimente fără să transforme războiul, succesul militar sau verdictul profetic într-o regulă pentru violență ori conducere modernă."

function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

function normalizeUnit(unit: BibleUnit, chapterNumber: number): BibleUnit {
  if (chapterNumber === 20) {
    return {
      ...unit,
      heading: "Cele două războaie cu Ben-Hadad și confruntarea lui Ahab",
      teaching: IMPARATI1_20_TEXTUAL_TEACHING,
      explanationKind: "textual-overview",
      explanationSource: TEXTUAL_SOURCE,
      words: undefined,
      wordSource: undefined,
      crossRefs: undefined,
      forYourHeart: undefined,
    }
  }

  return {
    ...unit,
    explanationKind: unit.explanationKind ?? "exposition",
    explanationSource: unit.explanationSource ?? IMPARATI1_EXPLANATION_SOURCE,
    wordSource:
      unit.words && unit.words.length > 0
        ? unit.wordSource ?? HEBREW_WORD_SOURCE
        : unit.wordSource,
  }
}

export function imparati1Chapter(input: {
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: BibleUnit[]
  prayer: string
  status: "draft" | "in_review" | "published"
}): BibleChapter {
  const textualOnly = input.number === 20
  return {
    id: `1-imparati-${input.number}`,
    bookId: "1-imparati",
    number: input.number,
    title: textualOnly
      ? "1 Împărați 20 — Ahab, Ben-Hadad și cele două războaie cu Aramul"
      : input.title,
    summary: textualOnly
      ? "Ben-Hadad atacă Samaria, dar Israel primește de două ori biruință asupra arameilor. După a doua înfrângere, Ahab îl cruță pe Ben-Hadad și încheie un legământ cu el. Un proroc îl confruntă apoi pentru această decizie și îi vestește judecata."
      : input.summary,
    literaryContext: textualOnly
      ? "Capitolul se află în narațiunea domniei lui Ahab și pregătește confruntările din capitolele următoare. Transcriptul Poonen nu dezvoltă amplu capitolul, de aceea explicația rămâne la desfășurarea textului."
      : input.literaryContext,
    historicalContext: textualOnly
      ? "Narațiunea descrie conflictele dintre regatul lui Israel și Aram. Overview-ul nu transformă războaiele sau judecata profetică din acest context într-un model pentru conflicte contemporane."
      : input.historicalContext,
    units: input.units.map((unit) => normalizeUnit(unit, input.number)),
    prayer: textualOnly
      ? "Doamne, ajută-ne să citim această narațiune fără să transformăm succesul militar sau judecata din contextul ei într-o autorizație pentru violență modernă. Amin."
      : input.prayer,
    status: input.status,
  }
}

export { teaching }