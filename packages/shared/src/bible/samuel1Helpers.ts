import type { BibleChapter, BibleUnit } from "./types.js"

const SAMUEL1_EXPLANATION_SOURCE = "Zac Poonen — Through The Bible: 1 Samuel"
const HEBREW_WORD_SOURCE = "WLC-OSHB"
const TEXTUAL_SOURCE =
  "Emanus — rezumat textual după narațiunea din 1 Samuel; fără doctrină adăugată"

type TextualCorrection = {
  heading: string
  teaching: string
}

const TEXTUAL_CHAPTERS: Record<number, Record<string, TextualCorrection>> = {
  25: {
    "1-13": {
      heading: "Cererea lui David și refuzul lui Nabal",
      teaching:
        "Versetele 1–13 relatează moartea lui Samuel, mutarea lui David în pustiu și întâlnirea indirectă cu Nabal. David trimite zece tineri să ceară hrană după ce oamenii lui nu îi vătămseră pe păstorii lui Nabal. Nabal răspunde disprețuitor și refuză. Când mesajul ajunge la David, el le poruncește oamenilor să-și încingă săbiile și pornește cu aproximativ patru sute de oameni, în timp ce două sute rămân la bagaje. Explicația descrie escaladarea narațiunii fără a o transforma într-o regulă pastorală despre insultă și răzbunare.",
    },
    "14-35": {
      heading: "Abigail îl întâmpină pe David",
      teaching:
        "Versetele 14–35 descriu intervenția Abigailei. Un slujitor îi spune ce s-a întâmplat și amintește protecția pe care oamenii lui David o oferiseră păstorilor. Abigail pregătește hrană, pleacă fără să-i spună lui Nabal și îl întâlnește pe David. Ea își asumă vina în discurs, îi cere lui David să nu verse sânge și vorbește despre viitorul lui înaintea DOMNULUI. David recunoaște că venirea și sfatul ei l-au oprit, primește darul și o trimite acasă în pace.",
    },
    "36-44": {
      heading: "Moartea lui Nabal și căsătoria lui David cu Abigail",
      teaching:
        "Versetele 36–44 relatează întoarcerea Abigailei la Nabal, ospățul și beția lui, apoi reacția lui în dimineața următoare. Aproximativ zece zile mai târziu, textul spune că DOMNUL îl lovește pe Nabal și acesta moare. David binecuvântează pe DOMNUL pentru judecată și pentru faptul că fusese oprit de la rău, apoi trimite să o ceară pe Abigail de soție. Finalul notează și pe Ahinoam și faptul că Saul o dăduse pe Mical lui Palti.",
    },
  },
  27: {
    "1-12": {
      heading: "David se mută în teritoriul filistean",
      teaching:
        "Capitolul 27 relatează decizia lui David de a părăsi teritoriul lui Israel de teama lui Saul și de a merge la Achiș, regele Gatului, împreună cu cei șase sute de oameni și familiile lor. Achiș îi dă Țiclagul, iar Saul încetează să-l mai caute. Din Țiclag, David întreprinde raiduri împotriva gheșuriților, ghirziților și amaleciților și nu lasă supraviețuitori care să poată relata ce făcuse. Lui Achiș îi dă alte destinații pentru raiduri, iar Achiș ajunge să creadă că David s-a făcut urât propriului popor. Textul relatează aceste acțiuni; overview-ul nu le transformă în modele morale și nu afirmă aprobarea lor divină acolo unde pasajul nu o formulează.",
    },
  },
}

const TEXTUAL_CHAPTER_METADATA: Record<
  number,
  { title: string; summary: string; literaryContext: string; historicalContext: string; prayer: string }
> = {
  25: {
    title: "1 Samuel 25 — Nabal, Abigail și oprirea vărsării de sânge",
    summary:
      "David cere hrană de la Nabal, primește un refuz insultător și pornește înarmat împotriva casei lui. Abigail intervine cu hrană și cu un discurs de mijlocire, iar David renunță la plan. Nabal moare ulterior, iar David o ia pe Abigail de soție.",
    literaryContext:
      "Capitolul se află între cele două episoade în care David îl cruță pe Saul. Transcriptul Poonen nu dezvoltă separat episodul, de aceea explicația rămâne la desfășurarea narațiunii.",
    historicalContext:
      "Narațiunea se desfășoară în zona Carmelului, în timpul tunderii oilor. Overview-ul nu adaugă reconstrucții sociale sau juridice care nu sunt necesare pentru urmărirea textului.",
    prayer:
      "Doamne, ajută-ne să citim cu atenție această narațiune și să deosebim ceea ce textul relatează de aplicațiile care trebuie argumentate separat. Amin.",
  },
  27: {
    title: "1 Samuel 27 — David la Achiș și în Țiclag",
    summary:
      "David se refugiază la Achiș cu oamenii și familiile lor, primește Țiclagul și face raiduri în regiune. El îi oferă lui Achiș o relatare diferită despre țintele atacurilor, iar Achiș ajunge să aibă încredere în el.",
    literaryContext:
      "Capitolul descrie perioada petrecută de David în teritoriul filistean înaintea crizei din capitolele următoare. Transcriptul Poonen nu dezvoltă separat episodul, de aceea explicația rămâne la narațiune.",
    historicalContext:
      "Textul plasează acțiunea în Gat, Țiclag și zonele raidurilor menționate. Overview-ul nu transformă strategia lui David într-o poruncă sau într-un model moral general.",
    prayer:
      "Doamne, ajută-ne să nu numim poruncă ceea ce narațiunea doar consemnează și să nu atribuim aprobarea Ta unor acțiuni acolo unde textul nu o declară. Amin.",
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
  const correctionMap = TEXTUAL_CHAPTERS[chapterNumber]
  const range = unitRange(unit)
  const correction = correctionMap && range ? correctionMap[range] : undefined

  if (correctionMap) {
    if (!correction) {
      throw new Error(
        `[1 Samuel ${chapterNumber}] lipsește corecția textuală pentru unitatea ${unit.ref}.`,
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
    explanationSource: unit.explanationSource ?? SAMUEL1_EXPLANATION_SOURCE,
    wordSource:
      unit.words && unit.words.length > 0
        ? unit.wordSource ?? HEBREW_WORD_SOURCE
        : unit.wordSource,
  }
}

export function samuel1Chapter(input: {
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: BibleUnit[]
  prayer: string
  status: "draft" | "in_review" | "published"
}): BibleChapter {
  const metadata = TEXTUAL_CHAPTER_METADATA[input.number]
  return {
    id: `1-samuel-${input.number}`,
    bookId: "1-samuel",
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