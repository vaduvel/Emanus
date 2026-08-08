import type { ExplainedBookOverlay, ExplainedOverlayUnit } from "../explainedOverlay.js"

const REVIEWED_2_19_25: ExplainedOverlayUnit = {
  from: 19,
  to: 25,
  heading: "Apa vindecată la Ierihon și judecata de la Betel",
  teaching:
    "Primele două episoade după primirea mantiei arată că autoritatea lui Elisei nu este un titlu pe care și-l proclamă. La Ierihon, oamenii îi spun că apa este rea și țara neroditoare; Elisei cere un vas nou cu sare, aruncă sarea la izvor și rostește cuvântul DOMNULUI. Textul atribuie vindecarea lui Dumnezeu, nu proprietăților magice ale sării.\n\nApoi Elisei urcă spre Betel, iar un grup de `ne'arim qetannim` iese din cetate și îl batjocorește: «suie-te, pleșuvule!» Expresia ebraică nu trebuie forțată într-o imagine sigură de copii foarte mici. `Na'ar` poate desemna de la copil la tânăr/slujitor, iar `qatan` înseamnă mic/tânăr/mai puțin însemnat. Traducerile diferă între «copii», «băieți» și «tineri». Lucrul sigur este că textul descrie un grup suficient de mare încât patruzeci și doi dintre ei vor fi loviți.\n\nBetelul nu este un fundal neutru. Ieroboam ridicase acolo unul dintre vițeii de aur și făcuse cetatea centru al unui cult rival față de Ierusalim. Nu rezultă că fiecare tânăr din scenă era preot idolatru și nu inventăm aceasta; contextul însă arată că batjocura profetului vine dintr-un loc deja marcat în narațiunea Regilor de respingerea rânduielii lui Dumnezeu.\n\n«Suie-te» poate suna cititorului ca o batjocură a ridicării lui Ilie, povestită cu câteva versete mai devreme, dar textul nu explică gluma și nu prezentăm această legătură ca sigură. La fel, faptul că îl numesc «pleșuv» este insultă; nu avem nevoie să inventăm că pleșuvia ar fi fost un semn ritual sau o acuzație precisă.\n\nElisei se întoarce, îi vede și îi blestemă «în Numele DOMNULUI». Două ursoaice ies din pădure și `vatebaqnah` patruzeci și doi dintre ei — verbul înseamnă a sfâșia/despica/maul. Textul nu spune «au omorât patruzeci și doi», de aceea nu transformăm automat rănirea gravă în 42 de decese; dar nici nu o îndulcim. Este prezentată ca o judecată teribilă care urmează blestemului profetic.\n\nNici acest episod nu este mandat pentru slujitorii creștini să cheme vătămare peste cei care îi batjocoresc. Chiar în capitolul anterior al aceleiași cărți, Poonen amintește că Isus i-a mustrat pe Iacov și Ioan când au vrut să repete focul lui Ilie asupra samaritenilor. Noul Legământ cere binecuvântarea celor care blestemă și încredințarea judecății lui Dumnezeu.\n\nAșadar păstrăm ambele lucruri: batjocorirea profetului lui Dumnezeu nu este tratată în text ca o glumă inocentă, iar judecata care urmează este reală; dar slujitorul lui Hristos nu primește de aici permisiunea de a pedepsi fizic pe cei care îl insultă.",
  source: {
    kind: "biblia-emanus",
    note: "exegeză canonică: 2 Împărați 2:19-25, WLC-OSHB și contextul Betelului; Poonen este folosit numai pentru contrastul explicit al duhului Noului Legământ din 2 Împărați 1/Luca 9",
  },
  explanationKind: "exposition",
  words: [
    {
      original: "נְעָרִים קְטַנִּים",
      transliteration: "ne'arim qetannim",
      language: "ebraica",
      meaning: "băieți/tineri mici sau tineri; expresia nu fixează singură o vârstă foarte mică",
      verseRef: "2 Împărați 2:23",
      lexicalSource: "WLC-OSHB",
    },
    {
      original: "וַתְּבַקַּעְנָה",
      transliteration: "vatebaqnah",
      language: "ebraica",
      meaning: "le-au sfâșiat/despicat grav; textul nu folosește aici verbul obișnuit «a omorî»",
      verseRef: "2 Împărați 2:24",
      lexicalSource: "WLC-OSHB",
    },
  ],
  forYourHeart:
    "Nu lua în râs lucrurile lui Dumnezeu, dar nici nu folosi onoarea lui Dumnezeu ca pretext pentru răzbunarea ta. Hristos te cheamă să lași judecata în mâna Lui.",
}

export function reviewImparati2Explanations(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) =>
      chapter.number === 2
        ? {
            ...chapter,
            units: chapter.units.map((unit) =>
              unit.from === 19 && unit.to === 25 ? REVIEWED_2_19_25 : unit,
            ),
          }
        : chapter,
    ),
  }
}
