export const FAPTE_SOURCE = {
  book: "Faptele Apostolilor",
  scripture: {
    translation: "Cornilescu, ediția corectată (RCCV)",
    source:
      "https://github.com/seven1m/open-bibles/blob/f257a3559025c3f873b48a75019f53a9354ed7de/ron-rccv.usfx.xml",
    sourceSha256: "3849c8be03a39ab4042408f8589895e24ee5ac36967054e63e692fb2f9e2c591",
    importConfig: "docs/data/fapte-rccv-import.json",
    generatedAtBuild: true,
    publicLaunchRights: "unresolved",
  },
  poonen: {
    officialThroughTheBible: "https://www.cfcindia.com/books/through-the-bible",
    officialVerseByVerse: "https://www.cfcindia.com/verse-by-verse/Acts",
    manifest: "docs/data/fapte-poonen-source.json",
    verifiedEpisodeCount: 14,
    controllingTheme: "Nașterea și răspândirea Bisericii",
    themes: [
      "puterea și călăuzirea Duhului Sfânt",
      "mărturia despre învierea lui Isus",
      "nașterea și viața Bisericii",
      "Evanghelia dusă peste granițe",
      "harul lui Dumnezeu pentru neamuri",
      "caracterul și integritatea lucrătorului",
      "ucenicie, conducere și misiune",
      "suveranitatea lui Dumnezeu în prigoană",
    ],
  },
  editorial: {
    status: "in_review",
    rawTranscriptCommitted: false,
    policy:
      "Explicația este redactată în română pe baza studiilor verse-by-verse și a transcrierilor Zac Poonen, păstrând fidel sensul doctrinar și firul explicației, fără traducere sau copiere 1:1 și fără interpretări doctrinare inventate de Emanus.",
  },
} as const
