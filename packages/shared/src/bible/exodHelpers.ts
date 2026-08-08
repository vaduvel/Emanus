import type { BibleChapter, BibleExplanationKind, BibleUnit, WordStudy } from "./types.js"
import { exodPassage, exodVerseCount } from "./exodText.js"
import { exodStatus } from "./exodPublication.js"

/*
 * Helperi pentru cartea Exod.
 * Textul biblic vine din exodText.ts și nu se scrie de mână în fișierele de capitol.
 * Helperul verifică acoperirea: unitățile trebuie să meargă din verset în verset,
 * fără goluri și fără suprapuneri, până la ultimul verset al capitolului.
 *
 * Proveniența legacy este declarată transparent: explicațiile existente sunt o
 * sinteză editorială Emanus verificabilă în raport cu materialul Through The Bible
 * al lui Zac Poonen, textul biblic și trimiterile indicate. Eticheta NU afirmă că
 * Poonen a comentat individual fiecare verset din fiecare unitate.
 */

const EXOD_LEGACY_EXPLANATION_SOURCE =
  "Emanus legacy synthesis — Zac Poonen, Through The Bible: Exodus + biblical text/cross-references"
const HEBREW_WORD_SOURCE = "WLC-OSHB"
const TEXTUAL_OVERVIEW_SOURCE =
  "Emanus — rezumat textual după textul biblic; fără doctrină adăugată"

type TextualCorrection = {
  heading: string
  teaching: string
}

const EXOD_21_TEXTUAL_CORRECTIONS: Record<string, TextualCorrection> = {
  "1-6": {
    heading: "Robul evreu și ieșirea în al șaptelea an",
    teaching:
      "Versetele 1–6 reglementează situația robului evreu. După șase ani de slujire, el trebuie să iasă liber în al șaptelea an fără plată. Textul precizează și ce se întâmplă cu soția și copiii în diferite situații familiale. Dacă robul declară că își iubește stăpânul, soția și copiii și nu dorește să plece, alegerea este formalizată prin ceremonia descrisă la ușă. Pasajul descrie o instituție juridică a Israelului antic și nu formulează aici o poruncă generală pentru relațiile de muncă sau pentru viața creștină.",
  },
  "7-11": {
    heading: "Protecțiile juridice pentru slujnica vândută",
    teaching:
      "Versetele 7–11 tratează cazul unei fete vândute ca slujnică într-o gospodărie. Textul limitează dreptul stăpânului asupra ei: nu poate fi vândută unui popor străin după ce nu și-a respectat angajamentul față de ea; dacă este destinată fiului, trebuie tratată potrivit statutului unei fiice; iar dacă bărbatul își ia o altă soție, nu îi poate reduce hrana, îmbrăcămintea și drepturile conjugale. Dacă aceste obligații nu sunt împlinite, ea trebuie lăsată să plece fără plată.",
  },
  "12-17": {
    heading: "Omorul, intenția, răpirea și atacul împotriva părinților",
    teaching:
      "Versetele 12–17 disting între omorul intenționat și moartea produsă fără premeditare. Pentru cazul fără premeditare este prevăzut un loc de scăpare; pentru uciderea făcută cu viclenie nu este oferită protecție la altar. Pasajul mai prevede pedeapsa pentru lovirea părinților, pentru răpirea și vânzarea unei persoane și pentru blestemarea tatălui sau a mamei. Explicația se limitează la aceste distincții juridice explicite ale textului.",
  },
  "18-27": {
    heading: "Vătămarea corporală, despăgubirea și limitele răzbunării",
    teaching:
      "Versetele 18–27 reglementează mai multe cazuri de vătămare. Cel care rănește un alt om și îl ține la pat trebuie să despăgubească timpul pierdut și vindecarea. Sunt prevăzute reguli pentru lovirea robilor, pentru rănirea unei femei însărcinate în timpul unei încăierări și pentru principiul proporționalității exprimat prin formule precum «viață pentru viață, ochi pentru ochi, dinte pentru dinte». Textul mai spune că vătămarea gravă a ochiului sau dintelui unui rob duce la eliberarea lui. Aceste versete sunt prezentate ca legislație a legământului, fără a le transforma într-o aplicație pastorală modernă nesusținută de o sursă aprobată.",
  },
  "28-32": {
    heading: "Boul care ucide și răspunderea proprietarului",
    teaching:
      "Versetele 28–32 tratează răspunderea când un bou ucide un om. Dacă animalul nu era cunoscut ca periculos, boul este omorât, iar proprietarul nu poartă aceeași vină. Dacă însă boul obișnuia să împungă, proprietarul fusese avertizat și nu l-a păzit, textul îi atribuie o răspundere mult mai gravă. Sunt date reguli și pentru răscumpărarea vieții proprietarului și pentru cazul în care victima este un rob sau o roabă. Explicația nu adaugă tipologie la suma de treizeci de sicli și nu o leagă aici de un alt pasaj decât dacă o sursă doctrinară aprobată o face explicit.",
  },
  "33-36": {
    heading: "Groapa neacoperită și paguba produsă de animale",
    teaching:
      "Versetele 33–36 reglementează pagubele produse printr-o groapă lăsată neacoperită și situația în care un bou omoară boul altuia. În primul caz, cel responsabil de groapă trebuie să despăgubească proprietarul animalului. În al doilea, despăgubirea diferă după cum animalul periculos era sau nu cunoscut ca atare. Ideea explicită a textului este stabilirea răspunderii și a despăgubirii în aceste cazuri concrete.",
  },
}

export type ExodUnitInput = {
  verses: readonly [number, number]
  heading: string
  teaching: string
  explanationKind?: BibleExplanationKind
  explanationSource?: string
  words?: readonly WordStudy[]
  wordSource?: string
  crossRefs?: readonly string[]
  forYourHeart?: string
}

export type ExodChapterInput = {
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: readonly ExodUnitInput[]
  prayer: string
}

/** Leagă paragrafele explicației cu rând liber între ele. */
export function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

function exod21Correction(unit: ExodUnitInput): TextualCorrection | undefined {
  const [from, to] = unit.verses
  return EXOD_21_TEXTUAL_CORRECTIONS[`${from}-${to}`]
}

export function exodChapter(input: ExodChapterInput): BibleChapter {
  const expectedLast = exodVerseCount(input.number)
  let expectedNext = 1

  const units: BibleUnit[] = input.units.map((unit) => {
    const [from, to] = unit.verses
    if (from !== expectedNext || to < from || to > expectedLast) {
      throw new Error(
        `[Exod ${input.number}] interval invalid ${from}-${to}; se aștepta de la ${expectedNext} până la ${expectedLast}.`,
      )
    }
    expectedNext = to + 1

    const correction = input.number === 21 ? exod21Correction(unit) : undefined
    if (input.number === 21 && !correction) {
      throw new Error(`[Exod 21] lipsește corecția textuală pentru unitatea ${from}-${to}.`)
    }

    if (correction) {
      return {
        id: `exod-${input.number}-${from}-${to}`,
        ref:
          from === to
            ? `Exod ${input.number}:${from}`
            : `Exod ${input.number}:${from}-${to}`,
        heading: correction.heading,
        text: exodPassage(input.number, from, to),
        teaching: correction.teaching,
        explanationKind: "textual-overview",
        explanationSource: TEXTUAL_OVERVIEW_SOURCE,
      }
    }

    return {
      id: `exod-${input.number}-${from}-${to}`,
      ref:
        from === to
          ? `Exod ${input.number}:${from}`
          : `Exod ${input.number}:${from}-${to}`,
      heading: unit.heading,
      text: exodPassage(input.number, from, to),
      teaching: unit.teaching,
      explanationKind: unit.explanationKind ?? "exposition",
      explanationSource: unit.explanationSource ?? EXOD_LEGACY_EXPLANATION_SOURCE,
      words: unit.words ? [...unit.words] : undefined,
      wordSource:
        unit.words && unit.words.length > 0
          ? unit.wordSource ?? HEBREW_WORD_SOURCE
          : unit.wordSource,
      crossRefs: unit.crossRefs ? [...unit.crossRefs] : undefined,
      forYourHeart: unit.forYourHeart,
    }
  })

  if (expectedNext - 1 !== expectedLast) {
    throw new Error(
      `[Exod ${input.number}] capitol incomplet; acoperirea se oprește la versetul ${expectedNext - 1} din ${expectedLast}.`,
    )
  }

  const textualOnly = input.number === 21

  return {
    id: `exod-${input.number}`,
    bookId: "exod",
    number: input.number,
    title: textualOnly ? "Exod 21 — Rânduieli despre persoane, vătămări și răspundere" : input.title,
    summary: textualOnly
      ? "Capitolul cuprinde rânduieli juridice despre robii evrei, protecția unei slujnice, omor și vătămare corporală, răspunderea pentru animale periculoase și despăgubirea pentru pagube. Explicația păstrează nivelul textual al acestor cazuri și nu transformă legislația Israelului antic în aplicații doctrinare moderne."
      : input.summary,
    literaryContext: textualOnly
      ? "Exod 21 deschide seria de rânduieli care urmează Decalogului. Textul este alcătuit în principal din cazuri juridice de tip «dacă… atunci…», care precizează consecințe și despăgubiri pentru situații concrete din viața comunității."
      : input.literaryContext,
    historicalContext: textualOnly
      ? "Capitolul aparține cadrului juridic al Israelului antic. Explicația nu presupune că fiecare instituție descrisă aici este idealizată sau prescrisă direct societăților moderne; ea descrie ce reglementează pasajul și lasă dezvoltările doctrinare numai surselor aprobate."
      : input.historicalContext,
    units,
    prayer: textualOnly
      ? "Doamne, ajută-ne să citim cu atenție aceste rânduieli, fără să adăugăm textului ceea ce nu spune și fără să ascundem ceea ce spune. Dă-ne înțelepciune să deosebim cadrul juridic al pasajului de aplicațiile care trebuie argumentate separat. Amin."
      : input.prayer,
    status: exodStatus(input.number),
  }
}