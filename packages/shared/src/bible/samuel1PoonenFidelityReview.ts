import type { BibleChapter, BibleUnit } from "./types.js"

const POONEN_1_SAMUEL_SOURCE =
  "Zac Poonen — Through The Bible: 1 Samuel, .research/poonen-through-the-bible-OT/transcripts/samuel-1.txt"

function replaceUnit(chapter: BibleChapter, unitId: string, patch: Partial<BibleUnit>): BibleChapter {
  return {
    ...chapter,
    units: chapter.units.map((unit) => (unit.id === unitId ? { ...unit, ...patch } : unit)),
  }
}

function restoreChapter16(chapter: BibleChapter): BibleChapter {
  return replaceUnit(chapter, "1-samuel-16-14-23", {
    heading: "Duhul DOMNULUI îl părăsește pe Saul — pierderea ungerii deschide drumul degenerării",
    teaching: [
      "Duhul DOMNULUI îl părăsește pe Saul și un duh rău îl stăpânește. Acesta este începutul unei degenerări care va deveni tot mai vizibilă în capitolele următoare.",
      "Saul fusese uns de Dumnezeu, dar prin neascultare ajunge să piardă ungerea. După aceea apare gelozia față de David, omul pe care Dumnezeu îl binecuvânta mai mult. Gelozia îl duce până la încercarea de a-l ucide pe David.",
      "Pierderea ungerii nu este prezentată ca un lucru mic. Când omul nu mai umblă sub lucrarea Duhului lui Dumnezeu, poate ajunge treptat sub influențe tot mai rele și poate face lucruri pe care odinioară nu și le-ar fi imaginat.",
      "David, în contrast, este omul peste care vine Duhul DOMNULUI. Capitolul pune astfel una lângă alta două direcții: un om care pierde ungerea prin neascultare și un om pe care Dumnezeu îl pregătește și îl unge pentru lucrarea viitoare.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: POONEN_1_SAMUEL_SOURCE,
    crossRefs: ["1 Samuel 15:22-23", "1 Samuel 16:13-14", "1 Samuel 18:9-11", "1 Samuel 28:7-8"],
    forYourHeart:
      "Nu trata ungerea lui Dumnezeu ca pe ceva garantat indiferent de felul în care trăiești. Păzește ascultarea și judecă gelozia înainte să te tragă mai departe.",
  })
}

function restoreChapter28(chapter: BibleChapter): BibleChapter {
  return replaceUnit(chapter, "1-samuel-28-7-25", {
    heading: "Saul ajunge la medium — degenerarea după pierderea ungerii",
    teaching: [
      "Saul, care cândva primise Duhul lui Dumnezeu și fusese uns ca rege, ajunge acum să caute o femeie care cheamă morții. Aceasta este una dintre cele mai triste trepte ale degenerării lui.",
      "Firul este important: Duhul lui Dumnezeu îl părăsește, Saul devine gelos pe David, este stăpânit de un duh rău, încearcă să-l omoare pe omul pe care Dumnezeu îl binecuvântează și, în cele din urmă, ajunge la medium în capitolul 28.",
      "Omul nu cade de obicei dintr-o singură mișcare de la ungere la ocultism. Neascultarea tolerată, gelozia și împotrivirea față de lucrarea lui Dumnezeu îl duc treptat mai jos.",
      "De aceea exemplul lui Saul este un avertisment: când Dumnezeu îți arată păcatul, oprește-te și pocăiește-te. Nu continua pe un drum în care fiecare pas face următorul compromis mai ușor.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: POONEN_1_SAMUEL_SOURCE,
    crossRefs: ["Levitic 19:31", "Deuteronom 18:10-12", "1 Samuel 16:14", "1 Samuel 18:9-11", "1 Cronici 10:13-14"],
    forYourHeart:
      "Nu aștepta ultima treaptă a căderii ca să iei păcatul în serios. Oprește degenerarea la primul pas de neascultare și gelozie.",
  })
}

export function restoreSamuel1PoonenFidelity(chapters: BibleChapter[]): BibleChapter[] {
  return chapters.map((chapter) => {
    if (chapter.number === 16) return restoreChapter16(chapter)
    if (chapter.number === 28) return restoreChapter28(chapter)
    return chapter
  })
}
