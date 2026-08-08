import type { ExplainedBookOverlay, ExplainedOverlayChapter } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/proverbs.txt"

function restoreProverbe23(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 23) return chapter

  return {
    ...chapter,
    title: "Proverbe 23 — Autocontrolul și avertismentul împotriva vinului fermentat",
    summary:
      "Capitolul avertizează împotriva poftelor, iubirii de bogăție, beției și seducției. În versetul 31 omul este chemat să nu privească vinul când este roșu și se mișcă în pahar — vinul puternic fermentat, alcoolic. Isus cunoștea această Scriptură; de aceea vinul pe care l-a băut și vinul pe care l-a făcut la Cana nu era acest tip de vin fermentat.",
    units: chapter.units.map((unit) => {
      if (unit.from !== 29 || unit.to !== 35) return unit

      return {
        ...unit,
        heading: "Nu privi vinul fermentat care mușcă în cele din urmă ca șarpele",
        teaching:
          "Proverbul descrie omul prins de vin: vaiuri, certuri, răni, ochi tulburi, pierderea echilibrului și dorința de a se întoarce din nou la băutură după ce se trezește.\n\nVersetul 31 spune să nu privești vinul când este roșu, când se mișcă în pahar și alunecă ușor. Este vorba despre vinul foarte fermentat, alcoolic. La urmă el mușcă asemenea unui șarpe și înțeapă asemenea unei vipere.\n\nIsus cunoștea acest cuvânt din Proverbe. De aceea acesta nu era tipul de vin pe care îl bea și nu era tipul de vin pe care l-a făcut la Cana.\n\nÎnțelepciunea nu întreabă cât de aproape poți merge de marginea pierderii stăpânirii de sine. Ea vede dinainte unde duce băutura și refuză ceea ce, în cele din urmă, mușcă și robește.",
        source: {
          kind: "poonen",
          transcript,
          anchor:
            "Proverbs 23:31 ... must not even look on the wine when it is red, when it is moving in the cup ... this highly fermented type of wine, alcohol. That's not the type of wine he made in Cana, and that's not the type of wine he drank.",
        },
        explanationKind: "exposition",
        words: [
          {
            original: "יַיִן",
            transliteration: "yayin",
            language: "ebraica",
            meaning: "vin; în explicația acestui pasaj, vinul roșu și fermentat împotriva căruia avertizează proverbul",
            verseRef: "Proverbe 23:31",
            lexicalSource: "WLC-OSHB",
          },
        ],
        forYourHeart:
          "Nu te juca cu ceea ce îți poate lua stăpânirea de sine. Înțelepciunea vede mușcătura de la capăt înainte să ridice paharul.",
      }
    }),
  }
}

export function restoreProverbe23PoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map(restoreProverbe23),
  }
}
