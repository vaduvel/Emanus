import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_14 = deuteronomChapter({
  number: 14,
  title: "Deuteronom 14 — Un popor sfânt, deosebit până și în ce pune pe masă",
  summary:
    "Moise interzice practicile de doliu păgâne, stabilește lista animalelor curate și necurate pentru hrană, și rezumă sistemul zeciuielilor: una anuală mâncată în bucurie înaintea DOMNULUI, alta la fiecare trei ani pentru Levit, orfan, văduvă și străin.",
  literaryContext:
    "Acest capitol arată că sfințenia legământului nu se limitează la închinare, ci se întinde în cele mai obișnuite gesturi ale vieții — doliul și mesele zilnice. Israel este chemat să fie deosebit în tot ce face, nu doar în ritual.",
  historicalContext:
    "Popoarele înconjurătoare practicau ritualuri de doliu care includeau tunsul în frunte și cresturile pe trup, considerate acte de venerare a morților sau de împietrire față de zeitățile lumii de dincolo. Legile alimentare separau Israel și din punct de vedere social de neamurile păgâne.",
  units: [
    {
      id: "deuteronom-14-1-2",
      ref: "Deuteronom 14:1-2",
      heading: "Fii ai DOMNULUI, nu plângeți ca neamurile",
      text: deuteronomPassage(14, 1, 2),
      teaching: teaching(
        "Israel este numit direct „fiii DOMNULUI, Dumnezeului vostru”, temei pentru interzicerea unor practici de doliu păgâne: „să nu vă faceți cresturi și să nu vă radeți în frunte pentru un mort”. Identitatea de fiu al lui Dumnezeu schimbă chiar felul în care se plânge un mort.",
        "Temeiul rămâne același din capitolul 7: „tu ești un popor sfânt pentru DOMNUL, Dumnezeul tău”. Sfințenia nu este doar pentru zilele de sărbătoare; ea trebuie să marcheze inclusiv felul în care Israel își trăiește durerea.",
      ),
      words: [
        {
          original: "בנים אתם ליהוה אלהיכם",
          transliteration: "banim atem la-YHWH Eloheikhem",
          language: "ebraica",
          meaning:
            "fii sunteți voi ai DOMNULUI, Dumnezeul vostru. Identitatea filială a poporului este temeiul practic pentru interzicerea unor obiceiuri de doliu păgâne.",
        },
      ],
      crossRefs: ["Leviticul 19:28", "Deuteronom 7:6", "1 Tesaloniceni 4:13"],
      forYourHeart:
        "Identitatea ta de fiu al lui Dumnezeu schimbă felul în care îți trăiești chiar durerea și pierderea.",
    },
    {
      id: "deuteronom-14-3-8",
      ref: "Deuteronom 14:3-8",
      heading: "Animale curate și necurate",
      text: deuteronomPassage(14, 3, 8),
      teaching: teaching(
        "Lista animalelor terestre curate include boul, oaia, capra, cerbul, căprioara și alte animale sălbatice cu copite despicate care rumegă. Criteriul dublu — copită despicată și rumegare — este repetat de mai multe ori, arătând importanța lui în distincția dintre curat și necurat.",
        "Cămila, iepurele și porcul sunt numite direct ca necurate, fiecare pentru că încalcă unul din cele două criterii. Interdicția porcului, poate cea mai cunoscută dintre toate, se întemeiază pe faptul că are copita despicată dar nu rumegă.",
      ),
      words: [
        {
          original: "מפרסת פרסה ומעלה גרה",
          transliteration: "mafreset parsa uma'ala gera",
          language: "ebraica",
          meaning:
            "cu copita despicată și care rumegă. Criteriul dublu pentru animalele terestre curate, folosit consecvent în această lege și în Leviticul 11.",
        },
      ],
      crossRefs: ["Leviticul 11:1-8", "Fapte 10:9-16", "Coloseni 2:16"],
      forYourHeart:
        "Distincția curat/necurat era o disciplină zilnică de sfințenie; pentru creștini, aceasta a fost înlocuită de o sfințenie interioară mai profundă.",
    },
    {
      id: "deuteronom-14-9-21",
      ref: "Deuteronom 14:9-21",
      heading: "Pești, păsări, și o hrană fără mizerie",
      text: deuteronomPassage(14, 9, 21),
      teaching: teaching(
        "Regula pentru vietuitoarele de apă este simplă: cele cu solzi și înotătoare sunt curate, restul necurate. Lista păsărilor necurate cuprinde în special răpitoarele și necrofagele — vulturul, uliul, corbul, bufnița — păsări care se hrănesc din stricăciune sau cadavre.",
        "Trei porunci finale înnoiesc principiul separării: nu se mâncă nimic din stârvuri (dar se pot da străinului sau vinde străinului, care nu are aceeași chemare la sfințenie), și „să nu fierbi un ied în laptele mamei lui” — o interzicere care pregătește și separarea mai largă dintre carne și lapte în tradiția iudaică.",
      ),
      words: [
        {
          original: "לא־תבשל גדי בחלב אמו",
          transliteration: "lo-tevashel gedi bachalav imo",
          language: "ebraica",
          meaning:
            "să nu fierbi un ied în laptele mamei lui. Interdicție repetată și în Exod 23:19 și 34:26, poate legată de un ritual canaanit de fertilitate.",
        },
      ],
      crossRefs: ["Leviticul 11:9-19", "Exod 23:19", "Exod 34:26"],
      forYourHeart:
        "Separarea de ceea ce este necurat era și o mărturie zilnică că apartenența ta la Dumnezeu pătrunde chiar în cele mai obișnuite gesturi ale vieții.",
    },
    {
      id: "deuteronom-14-22-29",
      ref: "Deuteronom 14:22-29",
      heading: "Zeciuiala bucuriei, și zeciuiala pentru cei nevoiași",
      text: deuteronomPassage(14, 22, 29),
      teaching: teaching(
        "Prima zeciuială anuală este mâncată chiar de dăruitor, în prezența DOMNULUI: „ca să înveți să te temi întotdeauna de DOMNUL, Dumnezeul tău”. Cei care locuiesc prea departe de locul ales pot converti zeciuiala în bani, și să cumpere acolo tot ce le place inima — „boi, oi, vin, băuturi tari” — pentru un ospăț de bucurie sfântă.",
        "La fiecare trei ani, această zeciuială este păstrată acasă, „ca să vină Levitul... orfanul... văduva” și să mănânce până se satură. Sistemul de zeciuieli îmbină bucuria de a te bucura în fața DOMNULUI cu grija concretă pentru cei fără susținere proprie.",
      ),
      words: [
        {
          original: "למען תלמד ליראה את־יהוה",
          transliteration: "lema'an tilmad lyir'a et-YHWH",
          language: "ebraica",
          meaning:
            "ca să înveți să te temi de DOMNUL. Scopul teologic al zeciuielii anuale: nu doar susținere materială, ci formă de învățătură practică a fricii sfinte de Dumnezeu.",
        },
      ],
      crossRefs: ["Deuteronom 26:12-15", "Numeri 18:21-24", "2 Corinteni 9:7"],
      forYourHeart:
        "Dăruirea ta poate fi și o școală a fricii sfinte de Dumnezeu, nu doar o obligație de îndeplinit.",
    },
  ],
  prayer:
    "Doamne, Tu ne-ai numit fii ai Tăi; învață-ne să trăim deosebit în tot ce facem, chiar în durere.\n\nÎnvață-ne separarea de ce este necurat, ca mărturie a apartenenței noastre la Tine.\n\nDă-ne bucurie în dăruire, și o inimă largă pentru cei fără susținere.\n\nȘi învață-ne să ne temem de Tine în fiecare zeciuială pe care o dăm. Amin.",
  status: DEUTERONOM_STATUSES[14],
})
