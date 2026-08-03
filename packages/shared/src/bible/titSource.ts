export const TIT_SOURCE = {
  book: "Tit",
  scripture: {
    translation: "Cornilescu, ediția corectată (RCCV/VDCC)",
    canonicalSource: "https://github.com/seven1m/open-bibles/blob/master/ron-rccv.usfx.xml",
    extractionFallback: "https://github.com/MaatheusGois/bible/blob/main/versions/ro/cornilescu/tt/tt.json",
    publicLaunchRights: "unresolved",
  },
  poonen: {
    officialBook: "https://www.cfcindia.com/books/through-the-bible",
    officialAudio: "https://www.cfcindia.com/bible",
    officialVerseByVerse: "https://www.cfcindia.com/verse-by-verse/Titus",
    themes: [
      "working together despite differences",
      "godliness",
      "qualifications for elders",
      "healthy doctrine",
      "concluding exhortations",
    ],
  },
  editorial: {
    status: "in_review",
    rawTranscriptCommitted: false,
    policy:
      "Explicația este o sinteză românească originală a textului biblic și a temelor declarate de Zac Poonen; nu este traducere sau reproducere a comentariului.",
  },
} as const
