import type { ExplainedBookOverlay, ExplainedOverlayChapter } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/isaiah.txt"

function restoreIsaia10(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 10) return chapter
  return {
    ...chapter,
    summary:
      "Isaia descrie Asiria ca instrument al judecății și apoi anunță că puterea ei va fi zdrobită. Asiria este și un tip al Antihristului. În versetul 27, jugul este nimicit prin ungere: uleiul vorbește despre ungerea Duhului Sfânt, iar aplicația este că jugul păcatului și al diavolului este rupt prin puterea Duhului.",
    units: chapter.units.map((unit) => {
      if (unit.from === 5 && unit.to === 19) {
        return {
          ...unit,
          heading: "Asiria, instrumentul mândru și tipul Antihristului",
          teaching:
            "Asiria este nuiaua pe care Dumnezeu o folosește pentru judecată, dar împăratul ei se laudă ca și cum totul s-ar fi făcut prin propria putere. Securea începe să se laude împotriva Celui care o mânuiește, iar de aceea instrumentul ajunge el însuși sub judecata lui Dumnezeu.\n\nAsiria este și un tip al Antihristului. Puterea care se ridică împotriva poporului lui Dumnezeu și se înalță în mândrie prefigurează puterea finală a Antihristului. Oricât de mare pare, ea rămâne un instrument limitat de suveranitatea lui Dumnezeu și va fi distrusă la vremea hotărâtă.\n\nAceasta este o lecție și pentru orice om folosit de Dumnezeu: faptul că Dumnezeu te folosește nu îți dă dreptul să-ți atribui lucrarea Lui. Când instrumentul începe să creadă că puterea îi aparține, mândria îl așază pe drumul Asiriei.",
          source: {
            kind: "poonen",
            transcript,
            anchor: "Isaiah 10 ... destruction of Assyria which is a type of the anti-Christ",
          },
          explanationKind: "exposition",
        }
      }
      if (unit.from === 20 && unit.to === 27) {
        return {
          ...unit,
          heading: "Jugul este nimicit prin ungere",
          teaching:
            "Rămășița se întoarce la DOMNUL, iar puterea Asiriei este frântă. Versetul 27 spune că povara este luată de pe umăr și jugul de pe gât, iar jugul este nimicit prin ungere.\n\nImaginea uleiului vorbește despre ungere. Aceasta este una dintre marile lecții spirituale ale pasajului: jugul păcatului și jugul diavolului nu sunt rupte prin puterea firească a omului, ci prin ungerea Duhului Sfânt.\n\nOmul poate încerca să se elibereze prin hotărâri, disciplină și efort, dar victoria spirituală adevărată cere puterea Duhului. Așa cum jugul Asiriei este distrus, ungerea lui Dumnezeu rupe stăpânirea care ținea omul legat.\n\nDe aceea nu trebuie să fim mulțumiți doar cu informație biblică sau cu o formă religioasă. Avem nevoie de realitatea Duhului Sfânt asupra vieții noastre, pentru ca jugurile care nu cedează puterii omenești să fie rupte.",
          source: {
            kind: "poonen",
            transcript,
            anchor:
              "Isaiah 10:27 ... the yoke will be destroyed by the anointing ... fatness means oil ... oil refers to anointing",
          },
          explanationKind: "exposition",
          words: [
            {
              original: "וְחֻבַּל עֹל מִפְּנֵי־שָׁמֶן",
              transliteration: "vechubal ol mipnei-shamen",
              language: "ebraica",
              meaning: "jugul este nimicit prin ungere; uleiul este aplicat aici ungerii Duhului Sfânt",
              verseRef: "Isaia 10:27",
              lexicalSource: "WLC-OSHB",
            },
          ],
          forYourHeart:
            "Nu încerca să rupi prin fire ceea ce poate fi rupt numai prin puterea Duhului. Caută ungerea, nu doar efortul.",
        }
      }
      return unit
    }),
  }
}

function restoreIsaia11(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 11) return chapter
  return {
    ...chapter,
    summary:
      "Din tulpina lui Isai vine Mesia, peste Care odihnește Duhul Sfânt în lucrarea Lui în șapte aspecte: Duhul DOMNULUI, înțelepciune, pricepere, sfat, putere, cunoaștere și frica de DOMNUL. El nu judecă după simpla vedere sau auzire. La venirea lui Hristos, în Mileniu, lupul și mielul vor locui împreună; iar spiritual această realitate începe deja în biserică, unde oameni cu naturi opuse pot trăi în părtășie sub domnia lui Hristos.",
    units: chapter.units.map((unit) => {
      if (unit.from === 1 && unit.to === 5) {
        return {
          ...unit,
          heading: "Mesia și lucrarea în șapte aspecte a Duhului Sfânt",
          teaching:
            "Din tulpina lui Isai iese Vlăstarul, Mesia, iar Duhul DOMNULUI Se odihnește peste El. Aici vedem lucrarea în șapte aspecte a Duhului Sfânt: Duhul DOMNULUI, duhul înțelepciunii, al priceperii, al sfatului, al puterii, al cunoașterii și al fricii de DOMNUL.\n\nFrica de DOMNUL Îl face atât de sensibil încât nu judecă numai după ceea ce văd ochii și nu hotărăște numai după ceea ce aud urechile. Acesta este discernământ spiritual. Aparența și primul raport nu sunt suficiente; Duhul lui Dumnezeu îl conduce pe om spre adevăr.\n\nAceeași nevoie există în slujire. Nu este suficientă inteligența naturală. Avem nevoie de Duhul în înțelepciune, pricepere, sfat, putere, cunoaștere și frica de Dumnezeu. Mesia este modelul slujitorului care trăiește și judecă prin Duhul.",
          source: {
            kind: "poonen",
            transcript,
            anchor:
              "Isaiah 11 ... spirit of wisdom understanding counsel strength knowledge and fear of the Lord ... sevenfold Holy Spirit ... never judge by what his eyes see or his ears hear",
          },
          explanationKind: "exposition",
          forYourHeart:
            "Nu te mulțumi să vezi și să auzi ca toți ceilalți. Cere ca Duhul lui Dumnezeu să-ți dea discernământ și frică de DOMNUL.",
        }
      }
      if (unit.from === 6 && unit.to === 9) {
        return {
          ...unit,
          heading: "Mileniul: lupul cu mielul — și realitatea care începe deja în biserică",
          teaching:
            "Versetele descriu vremea Mileniului, când Hristos va domni pe pământ. Lupul va locui cu mielul, leopardul se va culca lângă ied, vițelul și leul vor fi împreună, iar un copil îi va conduce. Creația va cunoaște pacea domniei lui Hristos.\n\nDar, spiritual vorbind, această realitate este deja adevărată în biserică. Fratele care prin fire seamănă cu un lup poate avea părtășie cu fratele care seamănă cu un miel și nu îl mai devorează. Hristos schimbă felul în care oamenii cu temperamente și trecuturi foarte diferite trăiesc împreună.\n\nCopilul care îi conduce vorbește și despre smerenia pe care Isus a pus-o în centrul Împărăției. Măreția în Împărăția lui Dumnezeu nu este dominație, ci smerenie și simplitate de copil.\n\nPacea viitoare a Mileniului și viața bisericii de acum au aceeași sursă: domnia lui Hristos. Acolo unde El conduce cu adevărat, natura care devora este pusă sub stăpânirea Lui.",
          source: {
            kind: "poonen",
            transcript,
            anchor:
              "Isaiah 11:6 ... in the Millennium the lion and wolf and lamb will lie down together when Christ comes again ... spiritually speaking it's already true in the church ... brother like a wolf can fellowship with brother like a lamb",
          },
          explanationKind: "exposition",
          forYourHeart:
            "Hristos nu te cheamă doar într-o biserică; te schimbă astfel încât să poți trăi în pace cu oameni pe care firea ta i-ar răni sau respinge.",
        }
      }
      return unit
    }),
  }
}

function restoreIsaia14(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 14) return chapter

  return {
    ...chapter,
    title: "Isaia 14 — Lucifer, cele cinci «eu voi» și calea opusă a lui Hristos",
    summary:
      "Capitolul vorbește despre căderea puterii Babilonului, iar în versetele 12–15 îl vedem pe Lucifer, steaua dimineții care fusese în cer și care s-a ridicat prin voia proprie. De cinci ori apare hotărârea «eu voi». Această răzvrătire este pusă în contrast cu Hristos, Care a venit din cer nu ca să facă voia Sa, ci voia Tatălui și Care a spus: «nu cum voiesc Eu, ci cum voiești Tu». Babilonul spiritual se construiește pe «eu voi»; calea lui Hristos este renunțarea la voia proprie în supunere față de Dumnezeu.",
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
            meaning: "strălucitor / steaua dimineții; Lucifer înainte de căderea lui",
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
    chapters: book.chapters.map((chapter) => restoreIsaia14(restoreIsaia11(restoreIsaia10(chapter)))),
  }
}
