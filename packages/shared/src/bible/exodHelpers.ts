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
const EXOD_21_POONEN_SOURCE =
  "Zac Poonen — Through The Bible: Exodus (Exod 21:2-6, slujirea din dragoste) + biblical text/cross-references"
const EXOD_21_EDITORIAL_SOURCE =
  "Emanus editorial exegesis — Exod 21 + biblical text/cross-references"
const HEBREW_WORD_SOURCE = "WLC-OSHB"

type ExplanationCorrection = {
  heading?: string
  teaching?: string
}

const EXOD_21_CORRECTIONS: Record<string, ExplanationCorrection> = {
  "7-11": {
    teaching:
      "Urmează rânduiala despre fata vândută de tatăl ei ca slujnică. Este printre locurile cele mai grele din carte, și nu se cade îmblânzit. Legea nu laudă situația; o reglementează și îi pune limite celui care are putere asupra ei.\n\nDacă stăpânul nu o mai vrea, textul nu-i îngăduie să o vândă unui popor străin. Dacă este destinată fiului, trebuie tratată potrivit statutului unei fiice. Iar dacă bărbatul își ia o altă femeie, nu are voie să-i micșoreze cele trei lucruri enumerate de text: hrana, îmbrăcămintea și «onah».\n\nSe cuvine precizie la al treilea termen. În tradiția iudaică și în multe traduceri, «onah» este înțeles ca drept conjugal; sensul exact al cuvântului este însă disputat, fiind propuse și alte explicații. De aceea nu îl lărgim până la afirmația că versetul ar defini în mod direct o datorie generală de afecțiune sau de atenție emoțională. Lucrul sigur este că textul îi interzice bărbatului să-i retragă femeii obligațiile concrete enumerate.\n\nȘi vezi încheierea: dacă nu-i dă aceste trei lucruri, ea iese slobodă, fără plată. Puterea stăpânului nu este fără margini; neîmplinirea obligațiilor prevăzute de lege duce la eliberarea ei.",
  },
  "12-17": {
    teaching:
      "Cine lovește un om și-l omoară să fie pedepsit cu moartea. Dar îndată se face o deosebire mare: textul distinge uciderea făcută cu viclenie și intenție de cazul în care omul nu a stat la pândă, iar celălalt a ajuns în mâna lui. Iată un principiu limpede al judecății: nu se cântărește numai rezultatul, ci și intenția.\n\nPentru cel care a ucis cu vicleșug și cu gând hotărât nu este scăpare nici măcar la altar. Locul sfânt nu devine ascunziș pentru uciderea voită. Mai târziu, episodul lui Ioab prins de coarnele altarului poate fi citit alături de această rânduială.\n\nUrmează apoi fapte cărora textul le atașează pedeapsa capitală: lovirea tatălui sau a mamei, răpirea unui om și vânzarea ori deținerea lui, și blestemarea tatălui sau a mamei. Exod 21:16 este deosebit de important: răpirea unui om pentru a-l transforma în marfă nu este autorizată de această lege, ci condamnată sever.\n\nLa versetul despre blestemarea părinților nu se cade să restrângem cuvântul la un singur scenariu, ca și cum ar însemna numai abandonarea unui părinte bătrân. Textul vorbește despre blestemarea sau tratarea cu dispreț grav a tatălui ori a mamei; aplicațiile pastorale trebuie să pornească de aici, nu să înlocuiască sensul poruncii.",
  },
  "18-27": {
    teaching:
      "Dacă doi se ceartă și unul rămâne la pat, cel care a lovit trebuie să plătească timpul pierdut și îngrijirea necesară vindecării. Dreptatea din pasaj nu se oprește la pedepsirea vinovatului, ci cere și repararea pierderii suferite de cel vătămat.\n\nUrmează locul greu despre robul lovit de stăpân. Nu trebuie să pretindem că lumea din jur nu cunoștea deloc sancțiuni pentru vătămarea sclavilor; colecții juridice antice precum legile lui Hammurabi au și ele astfel de cazuri, adesea evaluate diferit după statutul social. Lucrul pe care îl putem spune direct din Exod este că stăpânul nu are putere juridică nelimitată: moartea robului aduce pedeapsă, iar vătămarea ochiului sau a dintelui duce la eliberare.\n\nLa mijloc stă pricina femeii însărcinate lovite în încăierare, apoi formula «viață pentru viață, ochi pentru ochi, dinte pentru dinte». În cadrul juridic al pasajului, formula cere proporționalitate: sancțiunea nu trebuie să depășească răul judecat. Când Domnul Isus citează această formulă în Matei 5, El nu autorizează răzbunarea personală, ci îi cheamă pe ucenici dincolo de revendicarea personală a represaliilor.\n\nȘi vezi cum se încheie unitatea: dacă stăpânul scoate ochiul robului sau îi sparge un dinte, robul iese liber. Nu numim aceasta, fără o sursă explicită, «sămânța sfârșitului robiei»; spunem mai exact ceea ce face legea aici: pune o limită reală puterii stăpânului și leagă vătămarea gravă de pierderea dreptului lui asupra robului.",
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

function rangeKey(from: number, to: number): string {
  return `${from}-${to}`
}

function explanationSourceFor(
  chapterNumber: number,
  from: number,
  to: number,
  unit: ExodUnitInput,
): string {
  if (unit.explanationSource) return unit.explanationSource
  if (chapterNumber !== 21) return EXOD_LEGACY_EXPLANATION_SOURCE
  return from === 1 && to === 6 ? EXOD_21_POONEN_SOURCE : EXOD_21_EDITORIAL_SOURCE
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

    const correction = input.number === 21 ? EXOD_21_CORRECTIONS[rangeKey(from, to)] : undefined

    return {
      id: `exod-${input.number}-${from}-${to}`,
      ref:
        from === to
          ? `Exod ${input.number}:${from}`
          : `Exod ${input.number}:${from}-${to}`,
      heading: correction?.heading ?? unit.heading,
      text: exodPassage(input.number, from, to),
      teaching: correction?.teaching ?? unit.teaching,
      explanationKind: unit.explanationKind ?? "exposition",
      explanationSource: explanationSourceFor(input.number, from, to, unit),
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

  const historicalContext =
    input.number === 21
      ? "Exod 21:2–6 tratează cazul robului evreu și îi limitează slujirea la șase ani, dacă el nu alege apoi să rămână. Nu trebuie extinsă această regulă asupra tuturor formelor de robie pomenite în Pentateuh. Colecțiile juridice din Orientul Apropiat antic cunosc și ele cazuri despre robi, vătămări, boi periculoși și despăgubiri, adesea cu sancțiuni diferențiate după statut. De aceea nu pretindem unicitate acolo unde nu o putem demonstra. Exod 21 are însă propriile limite explicite asupra puterii: răpirea unui om este pedepsită sever, vătămarea robului poate duce la eliberarea lui, iar formula «ochi pentru ochi» cere proporționalitate în judecată."
      : input.historicalContext

  return {
    id: `exod-${input.number}`,
    bookId: "exod",
    number: input.number,
    title: input.title,
    summary: input.summary,
    literaryContext: input.literaryContext,
    historicalContext,
    units,
    prayer: input.prayer,
    status: exodStatus(input.number),
  }
}
