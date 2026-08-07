import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_9 = deuteronomChapter({
  number: 9,
  title: "Deuteronom 9 — Nu pentru dreptatea ta, ci pentru răutatea celorlalți și jurământul dat părinților",
  summary:
    "Moise amintește poporului că nu propria lui dreptate le va da țara, ci nelegiuirea neamurilor și credincioșia lui Dumnezeu față de legământul cu părinții. Ca dovadă, retrăiește înaintea lor păcatul vițelului de aur, mânia care aproape a nimicit poporul, și cele patruzeci de zile de mijlocire care au întors mânia lui Dumnezeu.",
  literaryContext:
    "Acest capitol continuă tema din capitolul 8: pericolul de a crede că vrednicia proprie este temeiul binecuvântării. Aici accentul se mută de la belșugul viitor la trecutul răzvrătirii, folosind chiar cel mai grav păcat al poporului — vițelul de aur — ca argument Împotriva oricărei lăudăroșenii cu vrednicia.",
  historicalContext:
    "Episodul vițelului de aur (Exod 32) s-a petrecut chiar în timp ce Moise era pe munte primind tablele Legii. Moise însuși a spart tablele scrise cu degetul lui Dumnezeu și a mijlocit patruzeci de zile și patruzeci de nopți fără să mănânce sau să bea, ca să oprească nimicirea poporului.",
  units: [
    {
      id: "deuteronom-9-1-6",
      ref: "Deuteronom 9:1-6",
      heading: "Nu pentru dreptatea ta",
      text: deuteronomPassage(9, 1, 6),
      teaching: teaching(
        "Înainte de a intra în țara cu „cetăți mari, Întărite până la cer” și uriași anachimi, Moise înlătură orice temei fals pentru biruință: „să nu zici în inima ta... pentru dreptatea mea m-a adus DOMNUL să iau în stăpânire această țară”.",
        "Temeiul biruinței este dublu, și niciunul nu ține de vrednicia lui Israel: „din pricina răutății acestor neamuri te izgonește DOMNUL... și ca să împlinească cuvântul pe care l-a jurat părinților tăi”. Judecata asupra altora și credincioșia față de legământul vechi, nu meritul lui Israel, sunt cauzele reale.",
        "Concluzia este tăioasă: „să știi că nu pentru dreptatea ta ți dă DOMNUL țara aceasta, căci ești un popor cu grumazul țeapăn”. Nicio națiune și niciun credincios nu poate privi darurile lui Dumnezeu ca pe o răsplată câștigată.",
      ),
      words: [
        {
          original: "עם-קשה-ערף",
          transliteration: "am-qshe-oref",
          language: "ebraica",
          meaning:
            "popor cu grumazul țeapăn/Încăpățânat. Expresie folosită prima dată în Exod 32:9 despre Israel la vițelul de aur, repetată aici ca mărturie continuă.",
        },
      ],
      crossRefs: ["Exod 32:9", "Romani 11:6", "Efeseni 2:8-9"],
      forYourHeart:
        "Nu privești darurile lui Dumnezeu ca pe o răsplată câștigată; ele vin din credincioșia Lui, nu din vrednicia ta.",
    },
    {
      id: "deuteronom-9-7-14",
      ref: "Deuteronom 9:7-14",
      heading: "Vițelul de aur, și mânia care aproape a nimicit poporul",
      text: deuteronomPassage(9, 7, 14),
      teaching: teaching(
        "Moise cere poporului să-și amintească, fără înfrumusețare: „din ziua când ai ieșit din țara Egiptului... ați fost răzvrătiți Împotriva DOMNULUI”. Chiar la Horeb, în timp ce Moise primea tablele Legii scrise „cu degetul lui Dumnezeu”, poporul își făcuse un vițel topit.",
        "Mânia DOMNULUI este descrisă fără nicio atenuare: „lăsaserăți-Mă să-i nimicesc și să le șterg numele de sub ceruri”, cu oferta de a face din Moise însuși un neam „mai puternic și mai numeros”. Această oferta era, de fapt, o încercare a inimii lui Moise, nu o intenție finală.",
      ),
      words: [
        {
          original: "באצבע אלהים",
          transliteration: "be-etzba Elohim",
          language: "ebraica",
          meaning:
            "cu degetul lui Dumnezeu. Expresie care descrie scrierea directă, fără mijlocitor uman, a Celor Zece Porunci pe table de piatră.",
        },
      ],
      crossRefs: ["Exod 32:1-10", "Exod 31:18", "Psalmul 106:19-23"],
      forYourHeart:
        "Chiar în timp ce primești cel mai mare dar de la Dumnezeu, inima poate fi deja Îndepărtată de El. Fii treaz asupra propriei răzvrătiri.",
    },
    {
      id: "deuteronom-9-15-21",
      ref: "Deuteronom 9:15-21",
      heading: "Tablele sparte, vițelul ars, și patruzeci de zile de mijlocire",
      text: deuteronomPassage(9, 15, 21),
      teaching: teaching(
        "Moise își amintește propria lui reacție la vederea păcatului: „am sfărâmat cele două table Înaintea ochilor voștri”. Gestul acesta nu este furie oarbă; este o dramatizare vizibilă a legământului deja rupt de popor prin păcatul lor.",
        "Mijlocirea lui Moise este descrisă cu amănunte care arată costul ei real: „am căzut cu fața la pământ Înaintea DOMNULUI, patruzeci de zile și patruzeci de nopți, cum am făcut mai întâi, căci mă temeam de mânia și furia DOMNULUI”. Nu este o rugăciune ușoară, ci un post lung, fără mâncare și băutură, dus la limita puterilor umane.",
        "Nici vițelul de aur nu este lăsat necorectat: „am luat vițelul... l-am ars în foc, l-am sfărâmat și l-am pisat bine, până s-a făcut ca praful, și am aruncat praful lui în pârâul care se cobora din munte”. Nimicirea idolului este totală, fără să lase nicio fărâmă care să poată deveni obiect de venerare.",
      ),
      words: [
        {
          original: "ארבעים יום וארבעים לילה",
          transliteration: "arbaim yom vearbaim layla",
          language: "ebraica",
          meaning:
            "patruzeci de zile și patruzeci de nopți. Perioadă simbolică de Încercare și mijlocire, aceeași durată ca postul lui Iisus în pustie (Matei 4:2).",
        },
      ],
      crossRefs: ["Exod 32:19-20", "Exod 34:28", "Matei 4:1-2"],
      forYourHeart:
        "Mijlocirea reală pentru alții are un cost; nu este o rugăciune fugară, ci o predare stăruitoare.",
    },
    {
      id: "deuteronom-9-22-29",
      ref: "Deuteronom 9:22-29",
      heading: "Un șir de răzvrătiri, și o rugăciune pentru numele lui Dumnezeu",
      text: deuteronomPassage(9, 22, 29),
      teaching: teaching(
        "Moise adaugă la vițelul de aur și alte locuri ale răzvrătirii — Tabera, Masa, Chibrot-Hataava, și mai grav decât toate, refuzul de a intra în țara făgăduită de la Cades-Barnea. Tiparul răzvrătirii nu este un accident izolat, ci o istorie repetată.",
        "Rugăciunea lui Moise, redată aici în citate directe, se întemeiază nu pe vrednicia poporului, ci pe legământul cu părinții și pe reputația lui Dumnezeu înaintea neamurilor: „Egiptenii vor zice: DOMNUL nu putea să-i ducă în țara pe care le-o făgăduise”. Moise se roagă pentru numele lui Dumnezeu, nu doar pentru poporul lui.",
      ),
      words: [
        {
          original: "עמך ונחל֪ך",
          transliteration: "amkha venachalatekha",
          language: "ebraica",
          meaning:
            "poporul Tău și moștenirea Ta. Formula folosită de Moise în mijlocire, arătând că se roagă pentru poporul care Îi aparține lui Dumnezeu, nu pentru un neam obișnuit.",
        },
      ],
      crossRefs: ["Exod 17:1-7", "Numeri 11:1-3", "Exod 32:11-13"],
      forYourHeart:
        "Când te rogi pentru cei căzuți, adu înaintea lui Dumnezeu nu vrednicia lor, ci legământul și numele Lui.",
    },
  ],
  prayer:
    "Doamne, nu ne lăudați cu dreptatea noastră; știm că vine numai din credincioșia Ta.\n\nAmintește-ne cât de repede putem cădea, chiar în timp ce primim cele mai mari daruri de la Tine.\n\nDă-ne o mijlocire stăruitoare pentru cei căzuți, ca cea a lui Moise.\n\nȘi apără numele Tău în mijlocul nostru, chiar când noi înșine ne batem joc de el prin răzvrătirea noastră. Amin.",
  status: DEUTERONOM_STATUSES[9],
})
