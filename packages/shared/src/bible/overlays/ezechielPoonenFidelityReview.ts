import type { ExplainedBookOverlay, ExplainedOverlayChapter } from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/ezekiel.txt"

function restoreEzechiel16(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 16) return chapter

  return {
    ...chapter,
    summary:
      "Ierusalimul este descris ca unul găsit, spălat, îmbrăcat și binecuvântat de Dumnezeu, dar care devine necredincios. Spre final, Sodoma este folosită ca avertisment. Explicația urmărită aici arată rădăcinile păcatului Sodomei din Ezechiel 16:49: mândrie, lene, lăcomie și lipsa grijii pentru cei săraci și nevoiași. Acestea sunt legate direct de păcatul sexual: păcatul sexual este rezultatul final, iar cele patru rădăcini pregătesc terenul pentru el.",
    units: chapter.units.map((unit) => {
      if (unit.from !== 44 || unit.to !== 58) return unit
      return {
        ...unit,
        heading: "Rădăcinile Sodomei: mândrie, lene, lăcomie și lipsa grijii pentru alții",
        teaching:
          "Când oamenii se gândesc la Sodoma, se gândesc de obicei imediat la păcatul sexual. Ezechiel 16:49 ne duce însă la rădăcinile care au pregătit acel rezultat: mândrie, lene, belșug folosit pentru sine și lipsa grijii pentru cel sărac și nevoiaș.\n\nExistă o legătură strânsă între mândrie și păcatul sexual. Există o legătură strânsă între lene și păcatul sexual. Există o legătură strânsă între lăcomie și păcatul sexual. Și există o legătură strânsă între lipsa preocupării pentru alți oameni și păcatul sexual. Dacă omul vrea să lupte serios cu pofta, nu trebuie să privească numai la momentul căderii, ci și la aceste rădăcini din viața lui.\n\nSmerenia taie rădăcina mândriei. Munca și disciplina taie terenul lenei. Cumpătarea în mâncare învață trupul că nu fiecare dorință trebuie satisfăcută. Grija practică pentru alții scoate omul din centrul propriei plăceri. Acestea nu sunt subiecte separate de curăția sexuală; ele fac parte din aceeași luptă pentru o viață curată.\n\nDe aceea diagnosticul lui Ezechiel este mai adânc decât simpla condamnare a rezultatului final. Dumnezeu arată ce fel de viață a hrănit căderea Sodomei, ca omul să poată judeca rădăcina înainte ca ea să producă rodul rău.",
        source: {
          kind: "poonen",
          transcript,
          anchor:
            "Ezekiel 16:49 ... Sodom's sins were pride, laziness, gluttony, not helping the poor ... that was the ultimate result ... close connection between pride/laziness/gluttony/lack of concern for other people and sexual sin",
        },
        explanationKind: "exposition",
        forYourHeart:
          "Dacă vrei curăție, nu lupta numai cu ultimul simptom. Judecă mândria, lenea, lipsa de cumpătare și nepăsarea față de alții.",
      }
    }),
  }
}

function restoreEzechiel28(chapter: ExplainedOverlayChapter): ExplainedOverlayChapter {
  if (chapter.number !== 28) return chapter

  return {
    ...chapter,
    title: "Ezechiel 28 — Satan în spatele regelui Tirului, Edenul dintâi și căderea prin mândrie",
    summary:
      "Capitolul vorbește despre conducătorul Tirului și, în explicația urmărită aici, descoperă în spatele regelui pe Satan. Versetele 11–19 descriu frumusețea, înțelepciunea și poziția lui înainte de cădere. El fusese într-un Eden anterior Edenului lui Adam; acel Eden dintâi este legat de lumea de dinaintea pustiirii descrise în Geneza 1:2. Satan a devenit diavol prin mândrie: inima i s-a înălțat din cauza frumuseții lui și înțelepciunea i s-a stricat din cauza strălucirii lui.",
    units: chapter.units.map((unit) => {
      if (unit.from !== 11 || unit.to !== 19) return unit
      return {
        ...unit,
        heading: "Satan, Edenul dintâi și mândria care l-a făcut să cadă",
        teaching:
          "În spatele regelui Tirului, pasajul îl descoperă pe Satan. El fusese în Eden, acoperit cu pietre prețioase, în poziție înaltă înaintea lui Dumnezeu. Aici vedem ceva din starea lui înainte de a deveni diavolul.\n\nEdenul din versetul 13 este un Eden anterior celui în care apar Adam și Eva. În această explicație, Geneza 1:2 descrie o judecată care a pustiit lumea dintâi și a șters acel Eden original, după care Dumnezeu a pregătit lumea pentru Adam. Ezechiel 28 privește înapoi la acea stare anterioară a lui Satan.\n\nCauza căderii este spusă în versetul 17: inima i s-a înălțat din cauza frumuseții și înțelepciunea i s-a corupt din cauza strălucirii. Darurile lui Dumnezeu au devenit motiv de mândrie. Aici este avertismentul: frumusețea, capacitatea, poziția sau orice dar spiritual pot deveni chiar terenul căderii dacă omul începe să se admire pe sine.\n\nIsaia 14 arată aceeași mișcare prin cele cinci «eu voi». Ezechiel 28 arată rădăcina din inimă: mândria. Satan nu a început printr-un păcat exterior grosolan; a început când s-a înălțat în propria lui frumusețe. De aceea smerenia este o protecție esențială pentru orice om care primește daruri de la Dumnezeu.",
        source: {
          kind: "poonen",
          transcript,
          anchor:
            "Ezekiel 28 ... prince/king of Tyre was Satan ... Satan was first in Eden ... that was another Eden before the Eden in Genesis 3 ... Genesis 1:2 there was a flood which wiped out the original Eden ... verse 17 his heart was filled with pride",
        },
        explanationKind: "exposition",
        words: [],
        forYourHeart:
          "Nu te teme numai de slăbiciunile tale; păzește-te și de mândria care poate crește tocmai din lucrurile frumoase și bune pe care Dumnezeu ți le-a dat.",
      }
    }),
  }
}

export function restoreEzechielPoonenFidelity(book: ExplainedBookOverlay): ExplainedBookOverlay {
  return {
    ...book,
    chapters: book.chapters.map((chapter) => restoreEzechiel28(restoreEzechiel16(chapter))),
  }
}
