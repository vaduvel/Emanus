import type { ExplainedBookOverlay, ExplainedOverlayChapter } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/isaiah.txt"

function restoreIsaia7(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 7) return chapter

  return {
    ...chapter,
    title: "Isaia 7 — Fecioara va naște un Fiu: Emanuel, Dumnezeu cu noi",
    summary:
      "În mijlocul crizei lui Ahaz, Dumnezeu dă casei lui David un semn: o fecioară va rămâne însărcinată și va naște un Fiu, iar Numele Lui va fi Emanuel — Dumnezeu cu noi. Aceasta este profeția Vechiului Testament despre nașterea lui Isus dintr-o fecioară: o femeie necăsătorită, fără relații cu un bărbat, va avea un Fiu.",
    units: chapter.units.map((unit) => {
      if (unit.from !== 10 || unit.to !== 17) return unit

      return {
        ...unit,
        heading: "Fecioara va naște pe Emanuel — profeția despre nașterea lui Isus",
        teaching:
          "Ahaz refuză să ceară semnul oferit de Dumnezeu, iar DOMNUL spune că El Însuși va da un semn casei lui David: «Iată, fecioara va fi însărcinată, va naște un Fiu și-I va pune numele Emanuel».\n\nAceasta este profeția din Vechiul Testament despre nașterea lui Isus din fecioară. O fecioară — o femeie necăsătorită, fără relații cu un bărbat — avea să nască un Fiu. Împlinirea este nașterea lui Isus.\n\nNumele Emanuel înseamnă «Dumnezeu cu noi». Nu este numai o promisiune că Dumnezeu va trimite ajutor de la distanță; în Hristos, Dumnezeu vine să fie cu noi.\n\nCasa lui David era amenințată și Ahaz privea la puterile politice din jur. Semnul îl chema să privească mai sus: planul lui Dumnezeu pentru Mesia nu putea fi anulat de regii pe care Ahaz îi vedea și de care se temea.",
        source: {
          kind: "poonen",
          transcript,
          anchor:
            "Isaiah 7:14 ... a virgin will be with child and bear a son ... this is the prophecy in the Old Testament that a virgin and unmarried woman without having any relations with a man would have a son ... Emmanuel",
        },
        explanationKind: "exposition",
        words: [
          {
            original: "הָעַלְמָה",
            transliteration: "ha-almah",
            language: "ebraica",
            meaning: "fecioara din profeția nașterii lui Isus",
            verseRef: "Isaia 7:14",
            lexicalSource: "WLC-OSHB",
          },
          {
            original: "עִמָּנוּ אֵל",
            transliteration: "Immanu El",
            language: "ebraica",
            meaning: "Dumnezeu cu noi",
            verseRef: "Isaia 7:14",
            lexicalSource: "WLC-OSHB",
          },
        ],
        forYourHeart:
          "Când amenințarea vizibilă pare să controleze viitorul, adu-ți aminte de Emanuel: planul lui Dumnezeu este mai mare decât puterile de care te temi.",
      }
    }),
  }
}

export function restoreIsaia7PoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map(restoreIsaia7),
  }
}
