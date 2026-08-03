export const LUCA_SOURCE = {
  book: "Luca",
  scripture: {
    translation: "Cornilescu, ediția corectată (RCCV)",
    source: "https://github.com/seven1m/open-bibles/blob/master/ron-rccv.usfx.xml",
    sourceSha256: "4953ef0e119128659b9f667b9d75c625edf073511aada5b222216b44c6d24b55",
    importConfig: "docs/data/luca-rccv-import.json",
    generatedAtBuild: true,
    publicLaunchRights: "unresolved",
  },
  poonen: {
    officialThroughTheBible: "https://www.cfcindia.com/books/through-the-bible",
    officialVerseByVerse: "https://www.cfcindia.com/verse-by-verse/Luke",
    verifiedEpisodeCount: 24,
    controllingTheme: "Jesus Christ — the Spirit-filled Man",
    themes: [
      "the ministry of the Holy Spirit",
      "the faithful remnant",
      "the birth and baptism of Jesus",
      "miracles and teaching",
      "women who were blessed",
      "an enlarged heart for others",
      "parables with a message",
      "disciples and backsliders",
      "teaching on money",
      "Christ's return",
      "the last supper, cross and resurrection",
    ],
  },
  editorial: {
    status: "in_review",
    rawTranscriptCommitted: false,
    policy:
      "Explicația este redactare originală în română, controlată de textul biblic și orientată de temele sursei Poonen; nu reproduce sau traduce transcrieri protejate.",
  },
} as const
