import type { BibleChapter, BibleUnit } from "./types.js"

const IMPARATI1_EXPLANATION_SOURCE = "Zac Poonen — Through The Bible: 1 Kings"
const HEBREW_WORD_SOURCE = "WLC-OSHB"
const TEXTUAL_SOURCE =
  "Emanus — rezumat textual după narațiunea din 1 Împărați; fără doctrină adăugată"

const TEXTUAL_CHAPTERS: Record<
  number,
  { heading: string; teaching: string; title: string; summary: string; literaryContext: string; historicalContext: string; prayer: string }
> = {
  14: {
    heading: "Boala fiului lui Ieroboam, mesajul lui Ahia și domnia lui Roboam",
    teaching:
      "Capitolul 14 relatează boala fiului lui Ieroboam și trimiterea soției regelui, deghizată, la profetul Ahia. DOMNUL îi descoperă lui Ahia cine vine, iar profetul vestește judecata asupra casei lui Ieroboam și moartea copilului, despre care textul spune că în el s-a găsit ceva bun înaintea DOMNULUI. Femeia se întoarce, iar copilul moare când intră în cetate. Narațiunea trece apoi la Roboam și la Iuda, unde sunt descrise practici idolatre, invazia lui Șișac și luarea comorilor templului și ale palatului. Roboam înlocuiește scuturile de aur cu scuturi de aramă, iar capitolul încheie cu războaiele dintre Roboam și Ieroboam și cu moartea lui Roboam. Overview-ul consemnează aceste fapte fără să deducă din moartea copilului o regulă despre suferința copiilor și fără să transforme deghizarea, pierderea aurului sau idolatria într-o schemă pastorală nesusținută de o sursă aprobată.",
    title: "1 Împărați 14 — Mesajul lui Ahia și declinul din Israel și Iuda",
    summary:
      "Soția lui Ieroboam merge deghizată la Ahia din cauza bolii fiului ei. Profetul vestește judecata asupra casei lui Ieroboam, iar copilul moare. A doua parte descrie păcatul lui Iuda sub Roboam, invazia lui Șișac, pierderea comorilor și sfârșitul domniei lui Roboam.",
    literaryContext:
      "Capitolul continuă urmările cultului instituit de Ieroboam și apoi mută narațiunea spre Iuda. Transcriptul Poonen nu dezvoltă amplu capitolul, de aceea explicația rămâne la desfășurarea textului.",
    historicalContext:
      "Ahia este profetul care îi vestise anterior lui Ieroboam primirea celor zece seminții. Restul capitolului alternează între casa lui Ieroboam și domnia lui Roboam, fără ca overview-ul să adauge reconstrucții istorice care nu sunt necesare pentru înțelegerea narațiunii.",
    prayer:
      "Doamne, ajută-ne să citim acest capitol fără să folosim suferința unui copil pentru acuzații simpliste și fără să adăugăm textului explicații pe care nu le oferă. Amin.",
  },
  20: {
    heading: "Cele două războaie cu Ben-Hadad și confruntarea lui Ahab",
    teaching:
      "Capitolul 20 relatează două războaie dintre Ahab și Ben-Hadad, regele Aramului. La primul asediu, cererile lui Ben-Hadad cresc de la argint, aur și familie la dreptul de a cerceta casele și de a lua ce îi place. Un proroc îi vestește lui Ahab că DOMNUL va da mulțimea în mâna lui, iar Israel câștigă lupta. Anul următor, slujitorii lui Ben-Hadad susțin că Dumnezeul lui Israel ar fi un dumnezeu al munților; o nouă înfrângere a arameilor contrazice această afirmație. Ben-Hadad cere apoi milă, iar Ahab încheie un legământ cu el și îl lasă să plece. Finalul capitolului prezintă un proroc care îl confruntă pe Ahab printr-o scenă judiciară și îi vestește consecința pentru faptul că l-a eliberat pe omul pe care mesajul profetic îl declarase dat spre nimicire. Overview-ul consemnează aceste evenimente fără să transforme războiul, succesul militar sau verdictul profetic într-o regulă pentru violență ori conducere modernă.",
    title: "1 Împărați 20 — Ahab, Ben-Hadad și cele două războaie cu Aramul",
    summary:
      "Ben-Hadad atacă Samaria, dar Israel primește de două ori biruință asupra arameilor. După a doua înfrângere, Ahab îl cruță pe Ben-Hadad și încheie un legământ cu el. Un proroc îl confruntă apoi pentru această decizie și îi vestește judecata.",
    literaryContext:
      "Capitolul se află în narațiunea domniei lui Ahab și pregătește confruntările din capitolele următoare. Transcriptul Poonen nu dezvoltă amplu capitolul, de aceea explicația rămâne la desfășurarea textului.",
    historicalContext:
      "Narațiunea descrie conflictele dintre regatul lui Israel și Aram. Overview-ul nu transformă războaiele sau judecata profetică din acest context într-un model pentru conflicte contemporane.",
    prayer:
      "Doamne, ajută-ne să citim această narațiune fără să transformăm succesul militar sau judecata din contextul ei într-o autorizație pentru violență modernă. Amin.",
  },
}

function teaching(...paragraphs: string[]): string {
  return paragraphs.join("\n\n")
}

function normalizeUnit(unit: BibleUnit, chapterNumber: number): BibleUnit {
  const correction = TEXTUAL_CHAPTERS[chapterNumber]
  if (correction) {
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
  const correction = TEXTUAL_CHAPTERS[input.number]
  return {
    id: `1-imparati-${input.number}`,
    bookId: "1-imparati",
    number: input.number,
    title: correction?.title ?? input.title,
    summary: correction?.summary ?? input.summary,
    literaryContext: correction?.literaryContext ?? input.literaryContext,
    historicalContext: correction?.historicalContext ?? input.historicalContext,
    units: input.units.map((unit) => normalizeUnit(unit, input.number)),
    prayer: correction?.prayer ?? input.prayer,
    status: input.status,
  }
}

export { teaching }