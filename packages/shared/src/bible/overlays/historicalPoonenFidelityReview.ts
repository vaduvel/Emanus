import type { ExplainedBookOverlay, ExplainedOverlayChapter } from "../explainedOverlay.js"

const judgesTranscript = ".research/poonen-through-the-bible-OT/transcripts/judges-ruth.txt"
const estherTranscript = ".research/poonen-through-the-bible-OT/transcripts/nehemiah-esther.txt"

function restoreJudecatori4(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 4) return chapter
  return {
    ...chapter,
    title: "Debora și Barac — Dumnezeu ridică o femeie când nu găsește un bărbat",
    summary:
      "Israel este apăsat de Iabin și Sisera, iar Dumnezeu o ridică pe Debora, prorociță și judecătoare. Explicația subliniază rânduiala conducerii masculine în biserică, dar și faptul că Dumnezeu nu este limitat de lipsa bărbaților disponibili: când nu a găsit un bărbat, a ridicat o femeie. Debora este astfel și o încurajare pentru surori să fie pe deplin disponibile lui Dumnezeu.",
    units: chapter.units.map((unit) => {
      if (unit.from !== 1 || unit.to !== 24) return unit
      return {
        ...unit,
        heading: "Debora: o încurajare pentru femeia disponibilă lui Dumnezeu",
        teaching:
          "Dumnezeu a rânduit bărbații pentru conducerea bisericii. Totuși, cartea Judecătorilor arată ceva important despre libertatea lui Dumnezeu de a folosi pe cine găsește disponibil. În vremea aceea, când nu a găsit un bărbat care să se ridice la nevoie, Dumnezeu a ridicat o femeie: Debora.\n\nAceasta este o încurajare pentru toate surorile. O femeie nu trebuie să gândească: «Dumnezeu nu mă poate folosi». Dumnezeu caută oameni predați Lui, iar când găsește o persoană disponibilă, o poate folosi puternic pentru scopurile Sale.\n\nDebora nu este prezentată ca o persoană de mâna a doua. Ea este prorociță, judecă Israelul și transmite lui Barac cuvântul lui Dumnezeu. Barac trebuie să răspundă acelui cuvânt și să meargă la luptă.\n\nLecția este dublă: rânduiala lui Dumnezeu nu trebuie aruncată, dar nici Dumnezeu nu trebuie pus într-o cutie ca și cum nu ar putea ridica o femeie atunci când bărbații pe care îi caută nu sunt disponibili. Disponibilitatea înaintea lui Dumnezeu contează enorm.",
        source: {
          kind: "poonen",
          transcript: judgesTranscript,
          anchor:
            "Judges ... God has appointed men to be leaders in the church ... when God couldn't find a man, He found a woman called Deborah ... encouragement to all the sisters",
        },
        explanationKind: "exposition",
        forYourHeart:
          "Nu spune că Dumnezeu nu te poate folosi. Fii disponibil Lui; El știe unde și cum să-ți folosească viața.",
      }
    }),
  }
}

function restoreEstera1(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 1) return chapter
  return {
    ...chapter,
    summary:
      "Estera este singura carte a Bibliei în care Numele lui Dumnezeu nu apare. Explicația leagă aceasta de starea iudeilor care au rămas în Persia în loc să plătească prețul întoarcerii la Ierusalim. Dumnezeu nu Se identifică public cu compromisul lor, dar continuă să lucreze în ascuns și să-i îngrijească.",
    units: chapter.units.map((unit) => {
      if (unit.from !== 1 || unit.to !== 22) return unit
      return {
        ...unit,
        heading: "Numele lui Dumnezeu lipsește, dar Dumnezeu lucrează în ascuns",
        teaching:
          "Estera este cartea în care Numele lui Dumnezeu nu apare. Acești iudei trăiau încă în Persia. Spre deosebire de cei care plătiseră prețul să iasă din Babilon și să se întoarcă la Ierusalim pentru mărturia lui Dumnezeu, ei rămăseseră într-un loc de confort și compromis.\n\nDe aceea Dumnezeu nu Se identifică public cu ei prin Numele Său în carte. Totuși, El nu îi abandonează. Dumnezeu lucrează în spatele scenei, controlează împrejurările și le poartă de grijă chiar în slăbiciunea lor.\n\nAici este o lecție serioasă pentru credincios. Dumnezeu poate avea grijă și de un copil al Lui care trăiește pentru confort, bani sau interes propriu; grija Lui nu înseamnă însă că aprobă compromisul. Este cu totul altceva să trăiești acolo unde Dumnezeu te protejează în mila Lui și să trăiești acolo unde El Se poate identifica public cu mărturia ta.\n\nCartea va arăta tocmai această lucrare ascunsă: Numele nu este scris, dar mâna Lui se vede în felul în care evenimentele se potrivesc unele cu altele.",
        source: {
          kind: "poonen",
          transcript: estherTranscript,
          anchor:
            "Esther ... name of God never appears ... Jews who did not want to pay the price to come out ... God does not publicly identify himself with the people in Esther ... but he cares for them",
        },
        explanationKind: "exposition",
      }
    }),
  }
}

function restoreEstera2(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 2) return chapter
  return {
    ...chapter,
    summary:
      "Estera ajunge soția împăratului păgân Ahașveroș, iar Mardoheu descoperă un complot împotriva regelui. Explicația vede în alegerea căsătoriei un compromis: Mardoheu o încurajează pe Estera să se căsătorească cu un rege păgân, exact genul de compromis care apare când omul nu merge până la capăt în voia lui Dumnezeu.",
    units: chapter.units.map((unit) => {
      if (unit.from !== 1 || unit.to !== 23) return unit
      return {
        ...unit,
        heading: "Compromisul poate intra fără ca omul să creadă că face ceva rău",
        teaching:
          "Mardoheu are multe calități bune, dar aici îl încurajează pe Estera să ajungă soția unui împărat păgân. Aceasta este o zonă de compromis. Legea lui Dumnezeu separase poporul Lui de asemenea căsătorii cu neamurile păgâne, tocmai pentru pericolul îndepărtării de Dumnezeu.\n\nLucrul serios este că Mardoheu probabil nu simțea că face ceva greșit. Așa lucrează compromisul. Când omul refuză să meargă până la capăt cu Dumnezeu într-un domeniu, treptat începe să accepte în alte domenii lucruri pe care odinioară le-ar fi recunoscut drept greșite.\n\nTotuși Dumnezeu lucrează în mijlocul acestei situații. Mardoheu descoperă complotul împotriva regelui, informația este verificată și fapta lui este scrisă în cronici. Dumnezeu va folosi mai târziu chiar această consemnare pentru izbăvirea poporului.\n\nFaptul că Dumnezeu poate lucra printr-o situație amestecată nu transformă compromisul în voia Sa perfectă. El este atât de suveran încât poate purta de grijă oamenilor Lui chiar când ei nu au mers până la capăt cu El.",
        source: {
          kind: "poonen",
          transcript: estherTranscript,
          anchor:
            "Mordecai encouraged Esther to get married to this heathen king ... compromise ... when we compromise in one area ... without even our knowing it ... plot was investigated",
        },
        explanationKind: "exposition",
        forYourHeart:
          "Nu folosi faptul că Dumnezeu a întors o situație spre bine ca dovadă că orice alegere care te-a adus acolo a fost voia Lui perfectă.",
      }
    }),
  }
}

function restoreEstera8(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 8) return chapter
  return {
    ...chapter,
    units: chapter.units.map((unit) => {
      if (unit.from !== 1 || unit.to !== 17) return unit
      return {
        ...unit,
        heading: "Dumnezeu îi îngrijește și îi protejează chiar în starea lor de compromis",
        teaching:
          "Dumnezeu nu îi abandonase pe iudeii rămași în Persia. Chiar dacă nu plătiseră prețul întoarcerii la Ierusalim și chiar dacă în carte apar compromisuri, El îi iubește și îi protejează de moarte.\n\nPrin Estera și Mardoheu, Dumnezeu întoarce situația. Casa lui Haman ajunge la Estera, Mardoheu primește poziția de autoritate, iar un nou decret le permite iudeilor să se apere. Mâna lui Dumnezeu lucrează în spatele structurilor împărăției persane.\n\nAceasta arată bunătatea lui Dumnezeu față de copiii Lui slabi. El poate îngriji, proteja și salva chiar pe credinciosul care trăiește sub nivelul voii Sale perfecte. Dar această grijă nu trebuie folosită ca justificare pentru a rămâne în compromis. Mila Lui trebuie să ne conducă spre o predare mai deplină, nu spre confort spiritual.",
        source: {
          kind: "poonen",
          transcript: estherTranscript,
          anchor:
            "Esther ... God does not publicly identify himself with these people ... but he cares for them ... protected them from death",
        },
        explanationKind: "exposition",
      }
    }),
  }
}

export function restoreJudecatoriPoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return { ...book, chapters: book.chapters.map(restoreJudecatori4) }
}

export function restoreEsteraPoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) => restoreEstera8(restoreEstera2(restoreEstera1(chapter)))),
  }
}
