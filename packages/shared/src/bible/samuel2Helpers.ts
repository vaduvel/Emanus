import type { BibleChapter, BibleUnit } from "./types.js"

const SAMUEL2_EXPLANATION_SOURCE = "Zac Poonen — Through The Bible: 2 Samuel"
const HEBREW_WORD_SOURCE = "WLC-OSHB"
const TEXTUAL_SOURCE =
  "Emanus — rezumat textual după narațiunea din 2 Samuel; fără doctrină adăugată"

type TextualCorrection = {
  heading: string
  teaching: string
}

const SAMUEL2_20_TEXTUAL_CORRECTIONS: Record<string, TextualCorrection> = {
  "1-13": {
    heading: "Răscoala lui Șeba și uciderea lui Amasa",
    teaching:
      "Versetele 1–13 relatează cum Șeba, fiul lui Bicri, cheamă semințiile lui Israel să se despartă de David, în timp ce oamenii lui Iuda rămân cu regele. David îi cere lui Amasa să strângă oamenii lui Iuda într-un termen stabilit, dar acesta întârzie. David îi trimite apoi pe Abișai și pe oamenii lui să-l urmărească pe Șeba. Pe drum, Ioab îl întâmpină pe Amasa, îl apucă de barbă ca și cum ar vrea să-l sărute și îl lovește mortal cu sabia. Trupul lui Amasa este mutat de pe drum, iar oamenii continuă urmărirea. Overview-ul descrie aceste fapte fără să transforme acțiunile lui Ioab într-o lecție generală despre conducere sau rivalitate.",
  },
  "14-26": {
    heading: "Asediul cetății Abel-Bet-Maaca și moartea lui Șeba",
    teaching:
      "Versetele 14–22 descriu urmărirea lui Șeba până la Abel-Bet-Maaca. Oastea lui Ioab ridică un val împotriva cetății și începe să lovească zidul. O femeie numită în text «înțeleaptă» cere să vorbească cu Ioab și îl întreabă de ce vrea să distrugă o cetate din Israel. Ioab răspunde că ținta lui este Șeba și promite să plece dacă acesta este predat. Femeia vorbește cetății, capul lui Șeba este aruncat peste zid, iar Ioab încetează asediul. Versetele 23–26 încheie capitolul cu lista unor dregători ai lui David. Explicația nu adaugă o doctrină despre pedeapsă colectivă sau negociere care nu este formulată de pasaj.",
  },
}

function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

function unitRange(unit: BibleUnit): string | undefined {
  const match = unit.ref.match(/:(\d+)(?:-(\d+))?$/)
  if (!match) return undefined
  return `${match[1]}-${match[2] ?? match[1]}`
}

function normalizeUnit(unit: BibleUnit, chapterNumber: number): BibleUnit {
  if (chapterNumber === 20) {
    const range = unitRange(unit)
    const correction = range ? SAMUEL2_20_TEXTUAL_CORRECTIONS[range] : undefined
    if (!correction) {
      throw new Error(`[2 Samuel 20] lipsește corecția textuală pentru ${unit.ref}.`)
    }
    return {
      ...unit,
      heading: correction.heading,
      teaching: correction.teaching,
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
    explanationSource: unit.explanationSource ?? SAMUEL2_EXPLANATION_SOURCE,
    wordSource:
      unit.words && unit.words.length > 0
        ? unit.wordSource ?? HEBREW_WORD_SOURCE
        : unit.wordSource,
  }
}

export function samuel2Chapter(input: {
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
    id: `2-samuel-${input.number}`,
    bookId: "2-samuel",
    number: input.number,
    title: textualOnly ? "2 Samuel 20 — Răscoala lui Șeba și asediul cetății Abel" : input.title,
    summary: textualOnly
      ? "Șeba cheamă Israelul la răscoală împotriva lui David. Amasa întârzie mobilizarea, Ioab îl ucide și continuă urmărirea. Șeba se refugiază în Abel-Bet-Maaca; o femeie din cetate negociază cu Ioab, Șeba este ucis, iar oastea se retrage. Capitolul se încheie cu o listă de dregători."
      : input.summary,
    literaryContext: textualOnly
      ? "Capitolul continuă tensiunea dintre Iuda și celelalte seminții de la sfârșitul capitolului 19. Transcriptul Poonen nu dezvoltă separat episodul, de aceea explicația rămâne la narațiune."
      : input.literaryContext,
    historicalContext: textualOnly
      ? "Acțiunea urmărește răscoala lui Șeba, schimbarea comenzii militare și asediul cetății Abel-Bet-Maaca. Overview-ul nu completează narațiunea cu reconstrucții juridice sau morale nesusținute de o sursă aprobată."
      : input.historicalContext,
    units: input.units.map((unit) => normalizeUnit(unit, input.number)),
    prayer: textualOnly
      ? "Doamne, ajută-ne să citim această narațiune fără să justificăm violența personajelor și fără să transformăm concluziile noastre în afirmații ale textului. Amin."
      : input.prayer,
    status: input.status,
  }
}

export { teaching }