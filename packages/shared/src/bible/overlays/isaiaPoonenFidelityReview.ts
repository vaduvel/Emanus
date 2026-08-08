import type { ExplainedBookOverlay, ExplainedOverlayChapter } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/isaiah.txt"

function restoreIsaia14(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 14) return chapter

  return {
    ...chapter,
    title: "Isaia 14 — Lucifer, cele cinci «eu voi» și calea opusă a lui Hristos",
    summary:
      "Capitolul vorbește despre căderea puterii Babilonului, iar în versetele 12–15 explicația urmărită aici îl vede pe Lucifer, steaua dimineții care fusese în cer și care s-a ridicat prin voia proprie. De cinci ori apare hotărârea «eu voi». Această răzvrătire este pusă în contrast cu Hristos, Care a venit din cer nu ca să facă voia Sa, ci voia Tatălui și Care a spus: «nu cum voiesc Eu, ci cum voiești Tu». Babilonul spiritual se construiește pe «eu voi»; calea lui Hristos este renunțarea la voia proprie în supunere față de Dumnezeu.",
    units: chapter.units.map((unit) => {
      if (unit.from !== 12 || unit.to !== 15) return unit
      return {
        ...unit,
        heading: "Lucifer și cele cinci «eu voi» — rădăcina Babilonului",
        teaching:
          "Versetele 12–15 descoperă că în spatele mândriei Babilonului stă Lucifer, steaua dimineții, cel care fusese în cer și a căzut. Punctul central este repetarea voii proprii: «mă voi sui», «îmi voi ridica scaunul de domnie», «voi ședea», «mă voi sui», «voi fi ca Cel Preaînalt». De cinci ori apare «eu voi».\n\nAici este rădăcina răzvrătirii: creatura își face propria voie centrul și vrea să ocupe locul care aparține lui Dumnezeu. Din această rădăcină se construiește Babilonul — religia și viața în care omul spune în esență: «eu voi face ce vreau eu».\n\nHristos este exact opusul. El a venit din cer nu ca să facă voia Sa, ci voia Celui care L-a trimis. În Ghetsimani spune: «nu cum voiesc Eu, ci cum voiești Tu». De aceea fiecare om merge, în fond, pe una dintre cele două căi: calea lui Lucifer, «eu voi», sau calea lui Hristos, «nu voia mea, ci a Ta».\n\nCăderea lui Lucifer arată unde duce înălțarea voii proprii: cel care vrea să se urce mai presus este coborât. Biruința spirituală începe când omul încetează să-și apere voia ca pe un drept suprem și o supune voii lui Dumnezeu.",
        source: {
          kind: "poonen",
          transcript,
          anchor:
            "Isaiah 14:12 ... Lucifer star of the morning ... notice the five times he said I will ... John 6:38 I came from heaven not to do my own will ... not as I will but as thou wilt ... Babylon is built on I will",
        },
        explanationKind: "exposition",
        words: [
          {
            original: "הֵילֵל בֶּן־שָׁחַר",
            transliteration: "helel ben-shahar",
            language: "ebraica",
            meaning: "strălucitor / steaua dimineții; în explicația acestui pasaj, Lucifer înainte de căderea lui",
            verseRef: "Isaia 14:12",
            lexicalSource: "WLC-OSHB",
          },
        ],
        forYourHeart:
          "Întrebarea simplă este: cine conduce — «eu voi» sau «voia Ta»? Calea lui Hristos începe acolo unde propria voie încetează să mai fie stăpânul vieții.",
      }
    }),
  }
}

export function restoreIsaiaPoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map(restoreIsaia14),
  }
}
