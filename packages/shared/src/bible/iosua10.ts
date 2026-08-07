import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

export const IOSUA_10 = iosuaChapter({
  number: 10,
  title: "Iosua 10 — Campania din sud și ziua cea lungă",
  summary:
    "Cinci împărați amoriți se unesc împotriva Gabaonului, pentru că acesta încheiase pace cu Israel. Iosua vine în ajutorul gabaoniților, DOMNUL luptă cu pietre de piatră din cer, iar soarele stă nemișcat pe cer până poporul își răzbună vrăjmașii. Campania se încheie cu cucerirea întregului sud al Canaanului.",
  literaryContext:
    "Consecința directă a legământului cu Gabaon din capitolul 9 se vede aici: Israel este obligat să apere un popor cu care abia încheiase pace, chiar dacă înșelător. Minunea soarelui stă la loc central în amintirea biblică a acestei cărți.",
  historicalContext:
    "Coaliția celor cinci împărați amoriți — din Ierusalim, Hebron, Iarmut, Lachiș și Eglon — controla regiunea muntoasă din sudul Canaanului. Înfrângerea lor deschide calea pentru cucerirea întregului sud.",
  units: [
    {
      id: "iosua-10-1-15",
      ref: "Iosua 10:1-15",
      heading: "Coaliția celor cinci împărați și ziua când soarele s-a oprit",
      text: iosuaPassage(10, 1, 15),
      teaching: teaching(
        "Adoni-țedec, împăratul Ierusalimului, se teme de Gabaon, „o cetate mare, ca una din cetățile împărătești”, care făcuse pace cu Israel, și cheamă patru alți împărați să atace Gabaonul împreună — pedeapsa pentru alianța lor cu Israel.",
        "Gabaoniții cer ajutor de la Iosua, invocând legământul: „nu părăsi pe robii tăi, sui-te repede la noi”. Iosua răspunde imediat, iar DOMNUL îi spune: „Nu te teme de ei, căci î-am dat în mâinile tale și niciunul din ei nu va putea sta împotriva ta”.",
        "DOMNUL Se luptă vizibil pentru Israel: aruncă din cer pietre mari de piatră asupra vrăjmașilor în fugă, „și au murit mai mulți de pietrele de piatră decât ucișiți de fiii lui Israel cu sabia”. Apoi Iosua cere DOMNULUI înaintea lui Israel: „Soare, oprește-te asupra Gabaonului și tu, lună, asupra văii Aialonului!”, iar soarele stă nemișcat aproape o zi întreagă, „căci DOMNUL lupta pentru Israel”.",
      ),
      crossRefs: ["Iosua 9:15", "Habacuc 3:11"],
      forYourHeart:
        "Când te legi printr-un legământ, chiar imperfect, Dumnezeu te poate chema să-l aperi cu prețul luptei — dar El însuși luptă pentru cei care ascultă.",
    },
    {
      id: "iosua-10-16-27",
      ref: "Iosua 10:16-27",
      heading: "Cei cinci împărați ascunși în peșteră și pedepsirea lor",
      text: iosuaPassage(10, 16, 27),
      teaching: teaching(
        "Cei cinci împărați fug și se ascund într-o peșteră la Macheda. Iosua poruncește să fie rostogolite pietre mari la gura peșterii și să fie lăsați oameni de pază, în timp ce restul armatei continuă urmărirea vrăjmașilor rămași — disciplină t actică care nu lasă lucrarea neterminată la jumătate.",
        "După încheierea urmăririi, Iosua poruncește căpeteniilor soldaților să pună piciorul pe grumazul celor cinci împărați, spunând: „Nu vă temeți și nu vă înspăimântați, întăriți-vă și îmbărbătați-vă, căci așa va face DOMNUL tuturor vrăjmașilor voștri împotriva cărora vă luptați” — gestul simbolic devine o învățătură pentru întreaga oaste.",
        "Cei cinci împărați sunt omorâți, spânzurați pe cinci copaci până seara, apoi trupurile lor sunt aruncate înapoi în peștera în care se ascunseseră, iar gura peșterii este acoperită cu pietre mari, „până în ziua de azi”.",
      ),
      crossRefs: ["Iosua 8:29", "Deuteronom 20:3-4"],
      forYourHeart:
        "Nu lăsa lucrarea începută la jumătate din pricina fricii; încheie ce ai început, cu încrederea că DOMNUL luptă pentru tine.",
    },
    {
      id: "iosua-10-28-43",
      ref: "Iosua 10:28-43",
      heading: "Cucerirea întregului sud al Canaanului",
      text: iosuaPassage(10, 28, 43),
      teaching: teaching(
        "Textul înregistrează în succesiune rapidă cucerirea unei serii întregi de cetăți: Macheda, Libna, Lachiș, Eglon, Hebron, Debir — fiecare cu formula repetată „n-a lăsat pe nimeni cu viață”, subliniind caracterul de judecată divină totală, nu de război obișnuit de prădăciune.",
        "La Lachiș, împăratul Ghezerului vine în ajutorul cetății, dar este învins la rândul lui — fiecare încercare de coaliție împotriva lui Israel eșuează, împlinind promisiunea că niciun om nu va putea sta împotriva lui Israel cât timp DOMNUL este cu el.",
        "Rezumatul final este solemn: „Iosua a bătut toată țara... n-a lăsat să scape nimeni... căci DOMNUL, Dumnezeul lui Israel, lupta pentru Israel”. Campania se încheie cu întoarcerea întregii oști la tabăra de la Ghilgal, locul de plecare și de închinare.",
      ),
      crossRefs: ["Deuteronom 7:1-2", "Iosua 11:23"],
      forYourHeart:
        "Biruințele repetate nu sunt rodul strategiei omenești, ci al faptului că DOMNUL însuși luptă pentru poporul Său ascultător.",
    },
  ],
  prayer:
    "Doamne, Tu ești Cel care lupți pentru poporul Tău, chiar oprind soarele în loc când este nevoie.\n\nDă-ne curajul de a nu ne teme și de a nu ne înspăimânta înaintea vrăjmașilor vieții noastre.\n\nÎnvață-ne să terminăm ce am început în ascultare de Tine, fără să lăsăm lucrarea la jumătate.\n\nȘi mulțumim că nicio coaliție împotriva copiilor Tăi nu poate stărui când Tu ești de partea lor. Amin.",
  status: IOSUA_STATUSES[10],
})
