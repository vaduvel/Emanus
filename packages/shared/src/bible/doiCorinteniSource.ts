export const DOI_CORINTENI_SOURCE = {
  book: "2 Corinteni",
  scripture: {
    translation: "Cornilescu, ediția corectată (RCCV)",
    source: "https://github.com/seven1m/open-bibles/blob/f257a3559025c3f873b48a75019f53a9354ed7de/ron-rccv.usfx.xml",
    sourceSha256: "3849c8be03a39ab4042408f8589895e24ee5ac36967054e63e692fb2f9e2c591",
    importConfig: "docs/data/2-corinteni-rccv-import.json",
    generatedAtBuild: true,
    publicLaunchRights: "unresolved",
  },
  poonen: {
    officialVerseByVerse: "https://www.cfcindia.com/verse-by-verse/2-Corinthians",
    manifest: "docs/data/2-corinteni-poonen-source.json",
    verifiedEpisodeCount: 12,
    themes: [
      "mângâiere prin suferință",
      "restaurare după disciplină",
      "slava noului legământ",
      "comoara în vase de lut",
      "noua creație și împăcare",
      "dărnicie liberă și transparentă",
      "autoritate pentru zidire",
      "putere desăvârșită în slăbiciune",
    ],
  },
  editorial: {
    status: "in_review",
    rawTranscriptCommitted: false,
    policy: "Explicația este redactată în română pe baza studiilor verse-by-verse și a transcrierilor Zac Poonen, păstrând sensul doctrinar fără traducere sau copiere 1:1 și fără doctrină inventată de Emanus.",
  },
} as const
