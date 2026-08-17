import type { ExplainedBookOverlay, ExplainedOverlayUnit } from "../explainedOverlay.js"

function correctUnit(
  bookOrder: number,
  chapterNumber: number,
  unit: ExplainedOverlayUnit,
): ExplainedOverlayUnit {
  if (
    bookOrder !== 18 ||
    chapterNumber !== 19 ||
    unit.explanationKind !== "textual-overview" ||
    unit.source.kind !== "biblia-emanus"
  ) {
    return unit
  }

  if (unit.from === 1 && unit.to === 22) {
    return {
      ...unit,
      heading: "Iov descrie cât de singur și zdrobit a ajuns",
      teaching:
        "Iov îi întreabă pe prietenii lui cât timp îl vor mai chinui prin cuvinte. El descrie starea în care se simte prins, lipsit de drum și de cinste, înconjurat de mânia lui Dumnezeu și părăsit de rude, cunoscuți, slujitori și chiar de cei apropiați. În mijlocul acestei izolări îi roagă pe prieteni să aibă milă de el în loc să-l urmărească prin acuzații.",
    }
  }

  if (unit.from === 28 && unit.to === 29) {
    return {
      ...unit,
      heading: "Iov îi avertizează pe acuzatorii lui că există judecată",
      teaching:
        "La sfârșitul capitolului, Iov se întoarce spre prietenii care caută motiv să-l urmărească și îi avertizează să se teamă de sabie. El afirmă că nelegiuirea atrage pedeapsă și că există o judecată de care trebuie să țină seama și acuzatorii lui.",
    }
  }

  return unit
}

export function applyFinalTextualGapCorrections(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) => ({
      ...chapter,
      units: chapter.units.map((unit) => correctUnit(book.order, chapter.number, unit)),
    })),
  }
}
