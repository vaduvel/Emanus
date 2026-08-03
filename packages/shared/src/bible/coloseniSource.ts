export const COLOSENI_SOURCE = {
  book: "Coloseni",
  scripture: {
    translation: "Cornilescu, ediția corectată (RCCV)",
    source: "https://github.com/seven1m/open-bibles/blob/f257a3559025c3f873b48a75019f53a9354ed7de/ron-rccv.usfx.xml",
    sourceSha256: "3849c8be03a39ab4042408f8589895e24ee5ac36967054e63e692fb2f9e2c591",
    importConfig: "docs/data/coloseni-rccv-import.json",
    generatedAtBuild: true,
    publicLaunchRights: "unresolved",
  },
  poonen: {
    officialVerseByVerse: "https://www.cfcindia.com/verse-by-verse/Colossians",
    manifest: "docs/data/coloseni-poonen-source.json",
    verifiedEpisodeCount: 4,
    themes: [
      "supremația și suficiența lui Hristos",
      "răscumpărare și împăcare prin cruce",
      "Hristos în voi, nădejdea slavei",
      "plinătatea credinciosului în Hristos",
      "respingerea filozofiei, legalismului și ascetismului religios",
      "omul nou și viața de sus",
      "relații familiale sub domnia lui Hristos",
      "rugăciune, înțelepciune și mărturie",
    ],
  },
  editorial: {
    status: "in_review",
    rawTranscriptCommitted: false,
    policy: "Explicația este redactată în română pe baza studiilor verse-by-verse și a transcrierilor Zac Poonen, păstrând sensul doctrinar fără traducere sau copiere 1:1 și fără doctrină inventată de Emanus.",
  },
} as const
