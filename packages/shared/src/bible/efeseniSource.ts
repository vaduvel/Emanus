export const EFESENI_SOURCE = {
  book: "Efeseni",
  scripture: {
    translation: "Cornilescu, ediția corectată (RCCV)",
    source: "https://github.com/seven1m/open-bibles/blob/f257a3559025c3f873b48a75019f53a9354ed7de/ron-rccv.usfx.xml",
    sourceSha256: "3849c8be03a39ab4042408f8589895e24ee5ac36967054e63e692fb2f9e2c591",
    importConfig: "docs/data/efeseni-rccv-import.json",
    generatedAtBuild: true,
    publicLaunchRights: "unresolved",
  },
  poonen: {
    officialVerseByVerse: "https://www.cfcindia.com/verse-by-verse/Ephesians",
    manifest: "docs/data/efeseni-poonen-source.json",
    verifiedEpisodeCount: 7,
    themes: [
      "viața în Hristos",
      "alegerea pentru sfințenie și înfiere",
      "revelația inimii și puterea învierii",
      "mântuirea prin har pentru fapte bune",
      "un singur om nou și templul lui Dumnezeu",
      "unitatea și maturitatea trupului lui Hristos",
      "umblarea în dragoste, lumină și înțelepciune",
      "familia sub caracterul lui Hristos",
      "armura lui Dumnezeu și rugăciunea",
    ],
  },
  editorial: {
    status: "in_review",
    rawTranscriptCommitted: false,
    policy: "Explicația este redactată în română pe baza studiilor verse-by-verse și a transcrierilor Zac Poonen, păstrând sensul doctrinar fără traducere sau copiere 1:1 și fără doctrină inventată de Emanus.",
  },
} as const
