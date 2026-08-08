import type { ExplainedBookOverlay, ExplainedOverlayChapter } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/ezekiel.txt"

function restoreEzechiel14(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 14) return chapter

  return {
    ...chapter,
    units: chapter.units.map((unit) => {
      if (unit.from !== 6 || unit.to !== 11) return unit

      return {
        ...unit,
        heading: "Când omul refuză adevărul, Dumnezeu poate lăsa amăgirea să devină judecată",
        teaching:
          "Bătrânii aveau idoli în inimă, iar Dumnezeu îi cheamă mai întâi să se pocăiască și să se întoarcă de la idolii lor. În acest context vin cuvintele grele despre profetul amăgit.\n\nVersetele 6–11 arată că Dumnezeu Însuși poate lăsa profeții falși să fie amăgiți. Versetul 9 spune că, dacă profetul este amăgit și vorbește, Dumnezeu l-a lăsat în acea amăgire și îl va judeca.\n\nAceasta se leagă de 2 Tesaloniceni 2: omul care nu iubește adevărul ajunge să creadă minciuna. Când Dumnezeu îți arată adevărul despre propriul păcat și tu îl refuzi, pericolul este să ajungi să crezi chiar justificarea pe care ai preferat-o.\n\nDe aceea iubirea adevărului este o protecție spirituală. Nu este suficient să spui că vrei călăuzire de la Dumnezeu dacă în inimă ai decis deja ce răspuns vei accepta. Idolul din inimă și refuzul adevărului pregătesc terenul pentru amăgire.",
        source: {
          kind: "poonen",
          transcript,
          anchor:
            "Ezekiel 14:3 ... idols in their hearts ... verses 6 to 11 ... God himself allows these false prophets to be deceived ... if a prophet is deceived and gives a message anyway",
        },
        explanationKind: "exposition",
        forYourHeart:
          "Cere-I lui Dumnezeu nu doar un răspuns, ci dragoste pentru adevăr — inclusiv atunci când adevărul te judecă pe tine.",
      }
    }),
  }
}

export function restoreEzechiel14PoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return { ...book, chapters: book.chapters.map(restoreEzechiel14) }
}
