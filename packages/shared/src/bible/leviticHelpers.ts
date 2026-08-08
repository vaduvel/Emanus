import type { BibleChapter, BibleExplanationKind, BibleUnit, WordStudy } from "./types.js"
import { leviticPassage, leviticVerseCount } from "./leviticText.js"
import { leviticStatus } from "./leviticPublication.js"

/*
 * Ajutoarele cărții Levitic.
 *
 * Același tipar ca la Exod: textul biblic stă separat, în leviticText.ts
 * (fișierele leviticTextN.ts), iar aici se adună unitățile de sens și se
 * verifică să acopere capitolul de la primul până la ultimul verset.
 *
 * Proveniența legacy este o sinteză editorială Emanus verificată în raport cu
 * materialul Through The Bible al lui Zac Poonen, textul biblic și trimiterile
 * indicate. Orice unitate care are deja o clasificare/sursă explicită o păstrează.
 */

const LEVITIC_LEGACY_EXPLANATION_SOURCE =
  "Emanus legacy synthesis — Zac Poonen, Through The Bible: Leviticus + biblical text/cross-references"
const HEBREW_WORD_SOURCE = "WLC-OSHB"
const TEXTUAL_OVERVIEW_SOURCE =
  "Emanus — rezumat textual după textul biblic; fără doctrină adăugată"

type TextualCorrection = {
  heading: string
  teaching: string
}

const LEVITIC_18_TEXTUAL_CORRECTIONS: Record<string, TextualCorrection> = {
  "1-5": {
    heading: "Să nu urmați practicile Egiptului și Canaanului",
    teaching:
      "Versetele 1–5 introduc capitolul prin formula «Eu sunt DOMNUL Dumnezeul vostru» și prin contrastul dintre poruncile lui Dumnezeu și practicile Egiptului și Canaanului. Israelului i se cere să păzească hotărârile și legile date aici. Versetul 5 leagă păzirea lor de viață. Explicația rămâne la această afirmație textuală și nu construiește din ea, fără o sursă aprobată, o schemă despre justificare, mântuire sau împlinirea Legii în Noul Testament.",
  },
  "6-18": {
    heading: "Interdicții privind relațiile sexuale între rude apropiate",
    teaching:
      "Versetele 6–18 enumeră relații sexuale interzise între rude apropiate și în cadrul unor relații de familie. Formula repetată «să nu descoperi goliciunea» introduce fiecare caz. Textul identifică persoane și grade de rudenie concrete: mamă, soția tatălui, soră, nepoată, mătușă, nora, cumnata și alte relații apropiate. Explicația nu adaugă afirmații psihologice, juridice moderne sau concluzii despre consimțământ care nu sunt formulate în acest pasaj; asemenea aplicații trebuie argumentate separat din surse potrivite.",
  },
  "19-20": {
    heading: "Două interdicții suplimentare",
    teaching:
      "Versetele 19–20 interzic apropierea sexuală de o femeie în timpul necurăției ei menstruale și relația sexuală cu soția aproapelui. Al doilea caz este descris explicit ca o faptă prin care cel care o comite se spurcă. Explicația păstrează aceste două interdicții distincte fără să adauge aplicații pastorale sau generalizări care depășesc formularea textului.",
  },
  "21-21": {
    heading: "Interdicția legată de Moloh",
    teaching:
      "Versetul 21 interzice darea urmașilor lui Moloh și leagă această faptă de profanarea Numelui lui Dumnezeu. Pasajul nu dezvoltă aici mecanismul ritualului și nu justifică analogii moderne; de aceea explicația se limitează la interdicția explicită și la legătura pe care textul o face cu Numele lui Dumnezeu.",
  },
  "22-23": {
    heading: "Interdicțiile din versetele 22–23",
    teaching:
      "Versetele 22–23 interzic relația sexuală între un bărbat și un alt bărbat, formulată prin comparația cu relația cu o femeie, și interzic relațiile sexuale cu animale, atât pentru bărbat, cât și pentru femeie. Textul folosește termeni de evaluare negativă pentru aceste fapte. Explicația nu adaugă teorii despre orientare, identitate, ritualuri de templu, ordinea creației sau aplicații eclesiale decât atunci când acestea sunt susținute separat de o sursă doctrinară aprobată.",
  },
  "24-30": {
    heading: "Neîntinarea și avertismentul privind țara",
    teaching:
      "Versetele 24–30 reiau avertismentul: practicile enumerate au întinat neamurile și țara, iar textul descrie țara ca vărsându-și locuitorii. Israel este avertizat că aceeași consecință îl privește dacă repetă aceleași fapte. Capitolul se încheie cu cererea de a păzi poruncile lui Dumnezeu și de a nu practica obiceiurile descrise. Explicația nu transformă această imagine într-o doctrină despre geografie, politică modernă sau mecanisme spirituale ale teritoriilor.",
  },
}

export type LeviticUnitInput = {
  verses: [number, number]
  heading: string
  teaching: string
  explanationKind?: BibleExplanationKind
  explanationSource?: string
  words?: WordStudy[]
  wordSource?: string
  crossRefs?: string[]
  forYourHeart?: string
}

export type LeviticChapterInput = {
  number: number
  title: string
  summary: string
  literaryContext: string
  historicalContext: string
  units: LeviticUnitInput[]
  prayer: string
}

export function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

function levitic18Correction(unit: LeviticUnitInput): TextualCorrection | undefined {
  const [from, to] = unit.verses
  return LEVITIC_18_TEXTUAL_CORRECTIONS[`${from}-${to}`]
}

export function leviticChapter(input: LeviticChapterInput): BibleChapter {
  const expectedLast = leviticVerseCount(input.number)
  let expectedNext = 1

  const units: BibleUnit[] = input.units.map((unit) => {
    const [from, to] = unit.verses
    if (from !== expectedNext || to < from || to > expectedLast) {
      throw new Error(
        `[Levitic ${input.number}] interval invalid ${from}-${to}; se aștepta de la ${expectedNext} până la ${expectedLast}.`,
      )
    }
    expectedNext = to + 1

    const correction = input.number === 18 ? levitic18Correction(unit) : undefined
    if (input.number === 18 && !correction) {
      throw new Error(`[Levitic 18] lipsește corecția textuală pentru unitatea ${from}-${to}.`)
    }

    if (correction) {
      return {
        id: `levitic-${input.number}-${from}-${to}`,
        ref: `Levitic ${input.number}:${from}-${to}`,
        heading: correction.heading,
        text: leviticPassage(input.number, from, to),
        teaching: correction.teaching,
        explanationKind: "textual-overview",
        explanationSource: TEXTUAL_OVERVIEW_SOURCE,
      }
    }

    return {
      id: `levitic-${input.number}-${from}-${to}`,
      ref: `Levitic ${input.number}:${from}-${to}`,
      heading: unit.heading,
      text: leviticPassage(input.number, from, to),
      teaching: unit.teaching,
      explanationKind: unit.explanationKind ?? "exposition",
      explanationSource: unit.explanationSource ?? LEVITIC_LEGACY_EXPLANATION_SOURCE,
      words: unit.words,
      wordSource:
        unit.words && unit.words.length > 0
          ? unit.wordSource ?? HEBREW_WORD_SOURCE
          : unit.wordSource,
      crossRefs: unit.crossRefs,
      forYourHeart: unit.forYourHeart,
    }
  })

  if (expectedNext !== expectedLast + 1) {
    throw new Error(
      `[Levitic ${input.number}] capitol incomplet; acoperirea se oprește la versetul ${expectedNext - 1} din ${expectedLast}.`,
    )
  }

  const textualOnly = input.number === 18

  return {
    id: `levitic-${input.number}`,
    bookId: "levitic",
    number: input.number,
    title: textualOnly ? "Levitic 18 — Interdicții privind practicile sexuale și cultice" : input.title,
    summary: textualOnly
      ? "Capitolul cere Israelului să nu urmeze practicile Egiptului și Canaanului și enumeră interdicții privind relațiile sexuale între rude, adulterul, relația cu Moloh, relațiile sexuale între bărbați și relațiile cu animale. Finalul avertizează că practicile enumerate întinează țara și că Israel va suporta aceeași judecată dacă le repetă."
      : input.summary,
    literaryContext: textualOnly
      ? "Levitic 18 face parte din secțiunea de porunci adresate vieții comunității lui Israel. Capitolul este construit printr-o introducere despre ascultarea de poruncile DOMNULUI, o serie de interdicții și un avertisment final care reia motivul neîntinării."
      : input.literaryContext,
    historicalContext: textualOnly
      ? "Explicația nu afirmă practici istorice concrete ale Egiptului sau Canaanului decât dacă sunt documentate de o sursă aprobată. Textul însuși atribuie neamurilor și țării întinarea prin faptele enumerate; detaliile istorico-religioase suplimentare sunt ținute în afara overview-ului textual."
      : input.historicalContext,
    units,
    prayer: textualOnly
      ? "Doamne, ajută-ne să citim acest capitol cu fidelitate față de text, fără să-i adăugăm afirmații pe care nu le face și fără să-i ascundem interdicțiile. Dă-ne înțelepciune pentru a separa textul biblic de aplicațiile doctrinare care trebuie argumentate separat. Amin."
      : input.prayer,
    status: leviticStatus(input.number),
  }
}