import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicat\u0103 pe unit\u0103\u021bi de sens.
 */

export const DEUTERONOM_3 = deuteronomChapter({
  number: 3,
  title: "Deuteronom 3 \u2014 Og cel uria\u0219, \u021bara \u00eemp\u0103r\u021bit\u0103, \u0219i o rug\u0103ciune neascultat\u0103",
  summary:
    "Israel biruie\u0219te pe Og, \u00eemp\u0103ratul Basanului, ultimul dintre uria\u0219ii refaimi\u021bi. \u021cara cucerit\u0103 la r\u0103s\u0103rit de Iordan este \u00eemp\u0103r\u021bit\u0103 semin\u021biilor lui Ruben, Gad \u0219i jum\u0103t\u0103\u021bii semin\u021biei lui Manase. Moise \u00eel \u00eencurajeaz\u0103 pe Iosua pentru drumul care vine \u0219i \u00eeoi aminte\u0219te c\u0103, dup\u0103 ce a cerut s\u0103 vad\u0103 \u021bara bun\u0103, DOMNUL i-a refuzat cererea, \u00eeng\u0103duindu-i doar s\u0103 o priveasc\u0103 de pe munte.",
  literaryContext:
    "Capitolul acesta \u00eencheie recapitularea cuceririlor de la r\u0103s\u0103rit de Iordan, \u00eenceput\u0103 \u00een capitolul 2. Vine apoi o schimbare de ton: de la istoria cuceririi la o m\u0103rturisire personal\u0103 a lui Moise, singurul loc din carte \u00een care el vorbe\u0219te direct despre propria lui durere \u0219i dorin\u021b\u0103 neascultat\u0103.",
  historicalContext:
    "Basanul, \u00cenutul lui Og, era cunoscut pentru cet\u0103\u021bi \u00eent\u0103rite, cu por\u021bi de aram\u0103, \u0219i pentru statura uria\u0219\u0103 a locuitorilor lui. Patul de fier al lui Og, p\u0103strat la Raba amoni\u021bilor, era o dovad\u0103 vizibil\u0103 pentru genera\u021biile viitoare c\u0103 nu era o legend\u0103, ci un fapt istoric verificabil.",
  units: [
    {
      id: "deuteronom-3-1-11",
      ref: "Deuteronom 3:1-11",
      heading: "Og, ultimul dintre uria\u0219ii refaimi\u021bi",
      text: deuteronomPassage(3, 1, 11),
      teaching: teaching(
        "Og vine \u00eenaintea lui Israel \u201ecu tot poporul lui, ca s\u0103 ne bat\u0103 la Edrei\u201d \u2014 dar DOMNUL zice lui Moise ceea ce spusese \u0219i despre Sihon: \u201eNu te teme de el, c\u0103ci \u021bi l-am dat \u00een m\u00e2n\u0103\u201d. Fric\u0103 nu era o reac\u021bie f\u0103r\u0103 temei \u00eenainte un \u00eemp\u0103rat uria\u0219, dar cuv\u00e2ntul DOMNULUI o \u00eenl\u0103tur\u0103 dinainte de lupt\u0103.",
        "Textul \u00eensemneaz\u0103 cu grij\u0103 statura fizic\u0103 a acestui vr\u0103jma\u0219: patul lui de fier, de nou\u0103 co\u021bi lungime, era p\u0103strat p\u00e2n\u0103 \u00een vremea scrierii c\u0103r\u021bii la Raba amoni\u021bilor, ca m\u0103rturie material\u0103 pentru cine s-ar \u00eendoi de m\u0103rimea biruin\u021bei.",
        "Nimicirea este total\u0103, \u201en-am l\u0103sat pe nimeni cu via\u021b\u0103\u201d, iar \u0219aizeci de cet\u0103\u021bi \u00eent\u0103rite trec sub st\u0103p\u00e2nirea lui Israel. Aceast\u0103 biruin\u021b\u0103 asupra ultimului dintre refaimi\u021bi \u00eencheie amenin\u021barea unor neamuri legendare, pomenite deja din Geneza 14:5.",
      ),
      words: [
        {
          original: "\u05e8\u05e4\u05d0\u05d9\u05dd",
          transliteration: "Refaim",
          language: "ebraica",
          meaning:
            "refaimi\u021bi, neam vechi de statur\u0103 uria\u0219\u0103 din care f\u0103cea parte Og; termenul apare rar \u0219i este legat de amintiri str\u0103vechi din Canaan.",
        },
      ],
      crossRefs: ["Geneza 14:5", "Numeri 21:33-35", "Iosua 12:4-5"],
      forYourHeart:
        "C\u00e2t de mare este vr\u0103jma\u0219ul t\u0103u nu hot\u0103r\u0103\u0219te lupta; hot\u0103r\u0103\u0219te cuv\u00e2ntul lui Dumnezeu care spune \u201eei sunt da\u021bi \u00een m\u00e2na ta\u201d.",
    },
    {
      id: "deuteronom-3-12-17",
      ref: "Deuteronom 3:12-17",
      heading: "\u021cara \u00eemp\u0103r\u021bit\u0103 \u00eenainte de a fi cucerit\u0103 pe deplin",
      text: deuteronomPassage(3, 12, 17),
      teaching: teaching(
        "P\u0103m\u00e2ntul cucerit de la Arnon la Hermon este \u00eemp\u0103r\u021bit deja: rubeni\u021bilor \u0219i gadi\u021bilor, partea de sud; jum\u0103t\u0103\u021bii semin\u021biei lui Manase, Basanul, numit \u0219i \u201e\u021bara refaimi\u021bilor\u201d. Israel \u00eemparte \u021bara ca pe o mo\u0219tenire sigur\u0103, chiar \u00eenainte s\u0103 fi trecut m\u0103run\u021bit \u0219i restul Iordanului.",
        "Marea Iordanului este numit\u0103 aici \u201eMarea C\u00e2mpiei\u201d, \u0219i mun\u021bii Hermon primesc numele lor localnic dublu \u2014 Sirion pentru sidoni\u021bi, Senir pentru amori\u021bi. Textul \u00eent\u021belege c\u0103 aceea\u0219i geografie era numit\u0103 diferit de neamuri diferite, f\u0103r\u0103 s\u0103 \u00eencurce cititorii.",
      ),
      words: [
        {
          original: "\u05d9\u05dd \u05d4\u05e2\u05e8\u05d1\u05d4",
          transliteration: "Yam ha-Arava",
          language: "ebraica",
          meaning:
            "Marea C\u00e2mpiei, alt nume pentru Marea Moart\u0103. Geografia Deuteronomului folose\u0219te numiri locale, unele diferite de cele din alte c\u0103r\u021bi.",
        },
      ],
      crossRefs: ["Numeri 32:33-42", "Iosua 13:8-13"],
      forYourHeart:
        "Dumnezeu \u00eempart\u0103\u0219e\u0219te uneori mo\u0219tenirea \u00eenainte ca ea s\u0103 fie deplin cucerit\u0103 \u00cen fapt. F\u0103g\u0103duin\u021ba precede st\u0103p\u00e2nirea deplin\u0103.",
    },
    {
      id: "deuteronom-3-18-22",
      ref: "Deuteronom 3:18-22",
      heading: "Fra\u021bii care lupt\u0103 pentru fra\u021bii lor",
      text: deuteronomPassage(3, 18, 22),
      teaching: teaching(
        "De\u0219i au primit deja \u021bara lor la r\u0103s\u0103rit de Iordan, rubeni\u021bii, gadi\u021bii \u0219i cei din Manase primesc porunca s\u0103 treac\u0103 \u201e\u00cenarma\u021bi\u201d \u00cenaintea celorlal\u021bi fra\u021bi ai lor, p\u00e2n\u0103 c\u00e2nd \u0219i ace\u0219tia \u00eei\u0219i vor primi odihna \u0219i mo\u0219tenirea. Binecuv\u00e2ntarea primit\u0103 nu-i scute\u0219te de r\u0103spunderea fa\u021b\u0103 de fra\u021bii care nu au primit-o \u00eenc\u0103.",
        "Lui Iosua i se spune, \u00cen fa\u021ba \u00eentregii lucr\u0103ri care \u00cermeaz\u0103: \u201eOchii t\u0103i au v\u0103zut tot ce a f\u0103cut DOMNUL, Dumnezeul vostru, acestor doi \u00cempara\u021bi; DOMNUL va face la fel tuturor \u00cempar\u0103\u021biilor pe unde vei trece\u201d. Biruin\u021bele trecute nu sunt doar istorie; sunt temei pentru \u00cencredere \u00cen ce urmeaz\u0103.",
      ),
      words: [
        {
          original: "\u05d7\u05dc\u05d5\u05e6\u05d9\u05dd",
          transliteration: "chalutzim",
          language: "ebraica",
          meaning:
            "\u00cenarma\u021bi, \u00cen\u0219ir\u0103\u021bi de r\u0103zboi, cei care merg \u00cen fruntea o\u0219tirii; termenul descrie fra\u021bii chema\u021bi s\u0103 lupte pentru al\u021bii \u00cenainte de a se a\u0219eza \u00cen odihn\u0103.",
        },
      ],
      crossRefs: ["Numeri 32:16-32", "Iosua 1:12-15", "Iosua 22:1-4"],
      forYourHeart:
        "O binecuv\u00e2ntare primit\u0103 mai \u00cent\u00e2i nu te scute\u0219te de r\u0103spunderea fa\u021b\u0103 de fra\u021bii care \u0219i-o a\u0219teapt\u0103 pe a lor.",
    },
    {
      id: "deuteronom-3-23-29",
      ref: "Deuteronom 3:23-29",
      heading: "O rug\u0103ciune ascultat\u0103 pe jum\u0103tate",
      text: deuteronomPassage(3, 23, 29),
      teaching: teaching(
        "Moise \u00cei destinuie poporului chiar propria lui rug\u0103ciune: \u201eLas\u0103-m\u0103 s\u0103 trec \u0219i s\u0103 v\u0103d \u021bara cea bun\u0103 de dincolo de Iordan\u201d. Cel care a purtat poporul patruzeci de ani cere pentru sine un singur lucru \u2014 s\u0103 vad\u0103 \u00cempl\u00cenirea a ceea ce a a\u0219teptat toat\u0103 via\u021ba.",
        "R\u0103spunsul DOMNULUI este limpede \u0219i f\u0103r\u0103 loc de \u00cendoial\u0103: \u201eNu te ruga de mine \u00cen aceast\u0103 privin\u021b\u0103\u201d. Nici Moise, cel mai mare proroc al Vechiului Leg\u0103m\u00e2nt, nu prime\u0219te tot ce cere; cuv\u00e2ntul jurat la Meriba (Numeri 20:12) r\u0103m\u00e2ne \u00cen picioare, oric\u00e2t de mare ar fi cel care se roag\u0103.",
        "DOMNUL \u00cens\u0103 nu \u00cel las\u0103 pe Moise f\u0103r\u0103 nimic: \u201eSuie-te pe v\u00cerful Pisga \u0219i prive\u0219te cu ochii t\u0103i\u201d. Vedeea de la distan\u021b\u0103 nu este \u00cempl\u00cenirea deplin\u0103, dar este o \u00cendurare real\u0103 \u2014 \u0219i este \u0219i clipa \u00cen care Iosua prime\u0219te public porunca de a duce lucrarea la bun sf\u00e2r\u0219it: \u201e\u00cencurajeaz\u0103-l, \u00cent\u0103re\u0219te-l, c\u0103ci el va trece \u00cenaintea acestui popor\u201d.",
      ),
      words: [
        {
          original: "\u05d0\u05dc-\u05ea\u05d5\u05e1\u05e3 \u05d3\u05d1\u05e8 \u05d0\u05dc\u05d9",
          transliteration: "al-tosef daber elai",
          language: "ebraica",
          meaning:
            "nu mai continua s\u0103 vorbe\u0219ti c\u0103tre Mine \u00cen privin\u021ba aceasta. R\u0103spunsul definitiv al DOMNULUI, care \u00cencheie o cerere repetat\u0103, dar nu \u00celtoarce iubirea Lui fa\u021b\u0103 de Moise.",
        },
      ],
      crossRefs: ["Numeri 20:7-12", "Deuteronom 34:1-4", "Deuteronom 31:7-8"],
      forYourHeart:
        "Un \u201enu\u201d de la Dumnezeu la o rug\u0103ciune sincer\u0103 nu \u00celseamn\u0103 c\u0103 te-a p\u0103r\u0103sit; poate \u00celsemna doar c\u0103 \u021bi-a preg\u0103tit o alt\u0103 m\u0103sur\u0103 de \u00celdurare, \u0219i o lucrare pentru altcineva.",
    },
  ],
  prayer:
    "Doamne, Tu \u00cell\u0103turi frica noastr\u0103 \u00celainte de a intra \u00cen lupt\u0103, oric\u00e2t de mare ar fi vr\u0103jma\u0219ul.\n\n\u00cenva\u021b\u0103-ne s\u0103 lupt\u0103m pentru fra\u021bii no\u0219tri, chiar dup\u0103 ce am primit deja binecuv\u00e2ntarea noastr\u0103.\n\n\u0218i c\u00e2nd r\u0103spunzi \u201enu\u201d la o rug\u0103ciune a noastr\u0103, d\u0103-ne \u00celcredere c\u0103 preg\u0103te\u0219ti totu\u0219i o \u00celdurare \u0219i o lucrare pentru altcineva. Amin.",
  status: DEUTERONOM_STATUSES[3],
})
