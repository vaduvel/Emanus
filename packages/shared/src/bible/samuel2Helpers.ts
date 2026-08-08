import type { BibleChapter, BibleUnit } from "./types.js"

const SAMUEL2_EXPLANATION_SOURCE = "Zac Poonen — Through The Bible: 2 Samuel"
const HEBREW_WORD_SOURCE = "WLC-OSHB"
const TEXTUAL_SOURCE =
  "Emanus — rezumat textual după narațiunea din 2 Samuel; fără doctrină adăugată"

type TextualCorrection = {
  heading: string
  teaching: string
}

type TextualChapterMetadata = {
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  prayer: string
}

const TEXTUAL_CORRECTIONS: Record<number, Record<string, TextualCorrection>> = {
  10: {
    "1-8": {
      heading: "Solii lui David sunt umiliți, iar amoniții se pregătesc de război",
      teaching:
        "Versetele 1–8 relatează cum David trimite soli pentru a-l mângâia pe Hanun după moartea tatălui său. Căpeteniile amonite interpretează solia ca pe o încercare de spionaj, iar Hanun îi umilește pe slujitorii lui David tăindu-le jumătate din barbă și hainele. David le spune să rămână la Ierihon până le va crește barba. Amoniții, înțelegând că au devenit urâți înaintea lui David, angajează trupe arameene și se pregătesc de război. Overview-ul descrie succesiunea faptelor fără să construiască din ea o doctrină generală despre suspiciune sau relații interpersonale.",
    },
    "9-19": {
      heading: "Lupta pe două fronturi și înfrângerea arameilor",
      teaching:
        "Versetele 9–19 descriu cum Ioab vede că lupta se desfășoară din două direcții, alege oameni pentru confruntarea cu arameii și îi încredințează lui Abișai restul trupelor împotriva amoniților. Cei doi stabilesc să se ajute reciproc dacă unul dintre fronturi devine prea puternic. Ioab își încurajează oamenii și lasă rezultatul în mâna DOMNULUI. Arameii fug, apoi amoniții se retrag în cetate. După o nouă mobilizare arameeană, David îi învinge, iar regii care îi slujeau lui Hadadezer fac pace cu Israelul. Narațiunea aparține războaielor regatului și nu este convertită într-un model pentru violență sau strategie modernă.",
    },
  },
  20: {
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
  },
}

const TEXTUAL_METADATA: Record<number, TextualChapterMetadata> = {
  10: {
    title: "2 Samuel 10 — Solii umiliți și războiul cu amoniții și arameii",
    summary:
      "David trimite soli de mângâiere la Hanun, dar aceștia sunt tratați ca spioni și umiliți. Amoniții angajează aramei, iar războiul se desfășoară pe două fronturi. Israel câștigă, iar aliații aramei ai lui Hadadezer ajung să facă pace.",
    literaryContext:
      "Capitolul urmează gestului de bunătate din capitolul 9, dar transcriptul Poonen nu dezvoltă separat episodul. De aceea explicația rămâne la narațiune, fără aplicații doctrinare adăugate.",
    historicalContext:
      "Acțiunea descrie relațiile dintre casa lui David, amoniți și regatele arameene. Overview-ul nu transformă conflictul militar într-un model pentru conflicte contemporane.",
    prayer:
      "Doamne, ajută-ne să citim această narațiune fără să transformăm războiul și strategiile personajelor în reguli pe care textul nu le formulează. Amin.",
  },
  20: {
    title: "2 Samuel 20 — Răscoala lui Șeba și asediul cetății Abel",
    summary:
      "Șeba cheamă Israelul la răscoală împotriva lui David. Amasa întârzie mobilizarea, Ioab îl ucide și continuă urmărirea. Șeba se refugiază în Abel-Bet-Maaca; o femeie din cetate negociază cu Ioab, Șeba este ucis, iar oastea se retrage. Capitolul se încheie cu o listă de dregători.",
    literaryContext:
      "Capitolul continuă tensiunea dintre Iuda și celelalte seminții de la sfârșitul capitolului 19. Transcriptul Poonen nu dezvoltă separat episodul, de aceea explicația rămâne la narațiune.",
    historicalContext:
      "Acțiunea urmărește răscoala lui Șeba, schimbarea comenzii militare și asediul cetății Abel-Bet-Maaca. Overview-ul nu completează narațiunea cu reconstrucții juridice sau morale nesusținute de o sursă aprobată.",
    prayer:
      "Doamne, ajută-ne să citim această narațiune fără să justificăm violența personajelor și fără să transformăm concluziile noastre în afirmații ale textului. Amin.",
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
  const correctionMap = TEXTUAL_CORRECTIONS[chapterNumber]
  if (correctionMap) {
    const range = unitRange(unit)
    const correction = range ? correctionMap[range] : undefined
    if (!correction) {
      throw new Error(
        `[2 Samuel ${chapterNumber}] lipsește corecția textuală pentru ${unit.ref}.`,
      )
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
  const metadata = TEXTUAL_METADATA[input.number]
  return {
    id: `2-samuel-${input.number}`,
    bookId: "2-samuel",
    number: input.number,
    title: metadata?.title ?? input.title,
    summary: metadata?.summary ?? input.summary,
    literaryContext: metadata?.literaryContext ?? input.literaryContext,
    historicalContext: metadata?.historicalContext ?? input.historicalContext,
    units: input.units.map((unit) => normalizeUnit(unit, input.number)),
    prayer: metadata?.prayer ?? input.prayer,
    status: input.status,
  }
}

export { teaching }