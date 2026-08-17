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
const LEVITIC_18_SOURCE =
  "Emanus editorial exegesis — Levitic 18 + WLC-OSHB/biblical cross-references; Zac Poonen, Through The Bible: Leviticus for the book-level holiness frame"
const HEBREW_WORD_SOURCE = "WLC-OSHB"

type ExplanationCorrection = {
  teaching: string
}

const LEVITIC_18_CORRECTIONS: Record<string, ExplanationCorrection> = {
  "6-18": {
    teaching:
      "Vine acum șirul cel lung: nimeni să nu se apropie de o rudă apropiată pentru a-i descoperi goliciunea, apoi sunt numite pe rând relațiile de rudenie interzise. Capitolul ridică limite tocmai în interiorul familiei, acolo unde apropierea și autoritatea pot fi folosite rău.\n\nCele mai multe formule sunt adresate bărbatului și îi spun lui ce nu are voie să facă. Nu trebuie să transformăm acest fapt într-o teorie pe care textul nu o enunță, dar nici să mutăm vina asupra celui constrâns. Levitic 18 nu oferă o taxonomie modernă a consimțământului; în schimb, narațiuni precum 2 Samuel 13 arată limpede că persoana siluită nu poartă vina agresorului.\n\nIa seama la termenii de evaluare pe care îi folosește textul pentru diferitele cazuri. Scriptura nu prezintă aceste relații ca simple nepotriviri sociale. În același timp, nu spunem că fiecare interdicție ar fi fost dată numai pentru că o victimă concretă fusese deja rănită; aceasta ar fi o explicație adăugată textului.\n\nPentru cititorul care a suferit abuz în familie, aplicația pastorală trebuie spusă fără echivoc: răul făcut prin constrângere aparține celui care îl face. Nu folosim o listă de interdicții adresate agresorului ca să încărcăm victima cu rușinea lui.",
  },
  "21-21": {
    teaching:
      "În mijlocul șirului apare interdicția de a-ți da urmașii lui Moloh și de a profana astfel Numele lui Dumnezeu. Se cuvine să păstrăm exactitatea: Levitic 18:21 spune să nu-ți dai sau să nu-ți treci urmașii lui Moloh; alte texte biblice descriu arderea copiilor în contexte de sacrificiu, dar nu trebuie să introducem mecanismul ritualului în acest verset ca și cum ar fi scris aici.\n\nEste totuși limpede că este vorba despre un rău făcut copilului sub acoperirea cultului. Tocmai aceasta face atât de gravă legătura cu profanarea Numelui: religia nu sfințește o faptă pe care Dumnezeu o interzice.\n\nNu inventăm nici motivul economic al ritualului — ploaie, rod sau câștig — dacă sursa nu îl demonstrează. Aplicația rămâne însă puternică: un părinte nu are voie să sacrifice binele copilului pentru ambiția, reputația sau interesul său și apoi să numească aceasta credincioșie.\n\nIar citirea creștină poate pune alături contrastul Evangheliei: Dumnezeu nu cere să-I câștigăm bunăvoința distrugându-ne copiii; El Însuși Își dă Fiul pentru mântuire. Aceasta este o legătură canonică cu Ioan 3:16, nu o pretinsă explicație lexicală a numelui Moloh.",
  },
  "22-23": {
    teaching:
      "Versetele 22–23 opresc fără ocol relația sexuală dintre un bărbat și un alt bărbat, formulată prin comparația cu relația cu o femeie, și relația sexuală cu un animal. Nu înmuiem evaluarea textului și nu redefinim interdicțiile ca să spună altceva decât spun. Noul Testament conține la rândul lui pasaje care tratează conduita sexuală între persoane de același sex, de aceea trimiterile canonice pot fi discutate deschis.\n\nTot la fel de important este să nu adăugăm textului ceea ce nu spune. Levitic 18 nu afirmă că omul care se luptă cu o ispită este din această cauză mai puțin om sau mai puțin chemat la pocăință și har decât alt păcătos. Scriptura face diferență între a numi păcatul și a urî omul. 1 Corinteni 6:9–11 pune avertismentul alături de vestea că oameni cu păcate reale au fost spălați și sfințiți.\n\nNu justificăm interdicția prin afirmația nedovedită că aceste două practici se făceau aici ca ritual de templu. Istoria așa-numitei prostituții sacre și legarea fiecărui act sexual interzis de cultul canaanit sunt mult mai discutate decât lăsa explicația veche să se înțeleagă. Levitic 18 însuși nu dă acesta ca motiv pentru versetele 22–23.\n\nDacă facem legătura cu ordinea creației din Geneza 1–2 sau cu argumentele lui Pavel, o prezentăm drept lectură canonică a Scripturii, nu drept motiv istoric inventat pentru faptul că versetele stau lângă interdicția despre Moloh.",
  },
  "24-30": {
    teaching:
      "La sfârșit se dă motivul judecății asupra neamurilor din țară: textul spune că ele s-au întinat prin aceste fapte, țara s-a întinat și este descrisă ca vărsându-și locuitorii. Imaginea este deliberat puternică; nu o reducem la simplă metaforă decorativă.\n\nȘi avertizarea pentru Israel este la fel de limpede: dacă va face aceleași lucruri, nici apartenența la poporul legământului nu îl va feri de judecată. Aceasta taie ideea că poruncile ar condamna o etnie și ar privilegia alta indiferent de faptă. Același pasaj care vorbește despre neamurile dinainte avertizează Israelul că poate ajunge sub aceeași sentință.\n\nÎn același timp, nu transformăm expresia «țara s-a întinat» într-o doctrină modernă despre spirite teritoriale, geografie mistică sau mecanisme politice pe care capitolul nu le explică. Ținem împreună exact cele două afirmații ale textului: păcatul întinează, iar judecata lui Dumnezeu îi scoate din țară pe cei care persistă în el.\n\nCapitolul se încheie cum a început: «Eu sunt DOMNUL Dumnezeul vostru». Sfințenia nu este o negociere cu obiceiurile Egiptului ori Canaanului, ci ascultarea de Dumnezeul care Își revendică poporul.",
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

function rangeKey(from: number, to: number): string {
  return `${from}-${to}`
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

    const correction =
      input.number === 18 ? LEVITIC_18_CORRECTIONS[rangeKey(from, to)] : undefined

    return {
      id: `levitic-${input.number}-${from}-${to}`,
      ref: `Levitic ${input.number}:${from}-${to}`,
      heading: unit.heading,
      text: leviticPassage(input.number, from, to),
      teaching: correction?.teaching ?? unit.teaching,
      explanationKind: unit.explanationKind ?? "exposition",
      explanationSource:
        unit.explanationSource ??
        (input.number === 18 ? LEVITIC_18_SOURCE : LEVITIC_LEGACY_EXPLANATION_SOURCE),
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

  const historicalContext =
    input.number === 18
      ? "Egiptul este lumea din care Israel ieșise, iar Canaanul este țara în care intra; textul îi interzice poporului să urmeze practicile lor. La versetul 21 apare Moloh. Alte pasaje biblice leagă sacrificarea copiilor de foc și de culturi idolatre, însă Levitic 18:21 însuși formulează interdicția ca darea/trecerea urmașilor lui Moloh, de aceea nu încărcăm versetul cu detalii rituale nedemonstrate. De asemenea, nu afirmăm ca fapt sigur că interdicțiile sexuale din capitol ar proveni din ritualuri de templu canaanite; asemenea reconstrucții istorice sunt disputate și nu sunt necesare pentru forța morală a textului."
      : input.historicalContext

  return {
    id: `levitic-${input.number}`,
    bookId: "levitic",
    number: input.number,
    title: input.title,
    summary: input.summary,
    literaryContext: input.literaryContext,
    historicalContext,
    units,
    prayer: input.prayer,
    status: leviticStatus(input.number),
  }
}
