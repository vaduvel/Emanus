import type { ExplainedBookOverlay, ExplainedOverlayChapter } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/psalms.txt"

function restorePsalm32(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 32) return chapter

  return {
    ...chapter,
    title: "Psalmul 32 — Fericirea iertării, păcatul acoperit și curățirea adusă prin sângele lui Isus",
    summary:
      "David vorbește despre fericirea omului a cărui fărădelege este iertată și al cărui păcat este acoperit. Tăcerea asupra păcatului îl usucă pe om, dar mărturisirea aduce iertare. Explicația păstrează contrastul predicat în materialul-sursă: în Vechiul Legământ era iertare și acoperire a păcatului; curățirea păcatului a venit după moartea lui Isus, prin sângele Lui. După iertare, omul este chemat să primească învățătura și călăuzirea lui Dumnezeu și să nu mai fie încăpățânat.",
    units: chapter.units.map((unit) => {
      if (unit.from !== 1 || unit.to !== 5) return unit
      return {
        ...unit,
        heading: "Iertat și acoperit — iar sângele lui Isus aduce curățirea",
        teaching:
          "Psalmul începe cu fericirea omului a cărui fărădelege este iertată și al cărui păcat este acoperit. David descrie apoi ce s-a întâmplat cât timp a tăcut: puterea i se usca și mâna lui Dumnezeu apăsa asupra lui. Când și-a recunoscut păcatul și nu și-a mai ascuns nelegiuirea, a primit iertare.\n\nAici explicația face un contrast important între Vechiul și Noul Legământ. În Vechiul Legământ găsim iertare și acoperirea păcatului. Curățirea păcatului a venit după moartea lui Isus: sângele lui Isus ne curățește. Jertfele vechi arătau înainte spre lucrarea deplină care avea să fie făcută prin Hristos.\n\nDe aceea, pentru creștin, vestea bună nu este numai că vina este iertată și acoperită, ci că sângele lui Isus curățește de păcat. Nu trebuie să ne întoarcem de la realitatea Noului Legământ la umbra celui vechi.\n\nDrumul spre această libertate începe cu adevărul înaintea lui Dumnezeu. David nu mai ascunde, nu mai justifică și nu mai păstrează păcatul în tăcere; îl mărturisește. Dumnezeu răspunde prin iertare, iar omul iertat poate merge mai departe sub călăuzirea Lui.",
        source: {
          kind: "poonen",
          transcript,
          anchor:
            "Psalm 32 ... whose sin is covered, not cleansed ... There's no cleansing of sin in the Old Covenant ... There's forgiveness and covering. Cleansing came only after Jesus died. The blood of Jesus cleanses us.",
        },
        explanationKind: "exposition",
        forYourHeart:
          "Nu ascunde păcatul înaintea lui Dumnezeu. Mărturisește-l, primește iertarea și trăiește în curățirea pe care sângele lui Isus o aduce în Noul Legământ.",
      }
    }),
  }
}

export function restorePsalmiPoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map(restorePsalm32),
  }
}
