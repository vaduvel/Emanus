export const UNU_TESALONICENI_SOURCE = {
  book: "1 Tesaloniceni",
  scripture: {
    translation: "Cornilescu, ediția corectată (RCCV)",
    source: "https://github.com/seven1m/open-bibles/blob/f257a3559025c3f873b48a75019f53a9354ed7de/ron-rccv.usfx.xml",
    sourceSha256: "3849c8be03a39ab4042408f8589895e24ee5ac36967054e63e692fb2f9e2c591",
    importConfig: "docs/data/1-tesaloniceni-rccv-import.json",
    generatedAtBuild: true,
    publicLaunchRights: "unresolved",
  },
  poonen: {
    officialVerseByVerse: "https://www.cfcindia.com/verse-by-verse/1-Thessalonians",
    manifest: "docs/data/1-tesaloniceni-poonen-source.json",
    verifiedEpisodeCount: 2,
    themes: [
      "lucrarea credinței, osteneala dragostei și răbdarea nădejdii",
      "Evanghelia primită cu putere și viață schimbată",
      "slujire curată fără lingușire sau câștig",
      "sfințire, curăție sexuală și respectarea trupului altuia",
      "dragoste frățească, muncă liniștită și responsabilitate",
      "nădejde în înviere și venirea Domnului",
      "trezvie în așteptarea zilei Domnului",
      "discernământ, pace comunitară și sfințire deplină",
    ],
  },
  editorial: {
    status: "in_review",
    rawTranscriptCommitted: false,
    policy: "Explicația este redactată în română pe baza studiilor verse-by-verse și a transcrierilor Zac Poonen, păstrând sensul doctrinar fără traducere sau copiere 1:1 și fără doctrină inventată de Emanus.",
  },
} as const
