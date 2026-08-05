import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicat\u0103 pe unit\u0103\u021bi de sens.
 */

export const DEUTERONOM_6 = deuteronomChapter({
  number: 6,
  title: "Deuteronom 6 \u2014 Ascult\u0103, Israel: iubirea care na\u0219te ascultare",
  summary:
    "Moise rostesc Shema, m\u0103rturisirea central\u0103 a credin\u021bei lui Israel: DOMNUL este unul singur, \u0219i El trebuie iubit cu toat\u0103 inima, cu tot sufletul \u0219i cu toat\u0103 puterea. Poporul este chemat s\u0103 nu-L uite pe Dumnezeu \u00cen bel\u0219ugul \u021b\u0103rii f\u0103g\u0103duite, s\u0103 nu-L ispiteasc\u0103 \u0219i s\u0103 \u00cenve\u021be pe copiii lor tot ce a f\u0103cut DOMNUL pentru ei.",
  literaryContext:
    "Versetul 4 al acestui capitol \u2014 Shema Yisrael \u2014 va deveni cea mai rostit\u0103 confesiune de credin\u021b\u0103 din \u00celtreaga istorie a lui Israel, spus\u0103 diminea\u021ba \u0219i seara, p\u0103n\u0103 \u00cen ziua de ast\u0103zi. Domnul Iisus \u00cens\u0103\u0219i o cite\u0103z\u0103 ca cea mai mare porunc\u0103 (Marcu 12:29-30).",
  historicalContext:
    "Popoarele canaanite din \u021bara pe care Israel o va cuceri \u00cenchinau mai mul\u021bi dumnezei, fiecare cu rolul lui \u00cen agricultur\u0103, r\u0103zboi sau fertilitate. Declara\u021bia \u201eDOMNUL este una\u201d nu era doar o formul\u0103 religioas\u0103 abstract\u0103, ci o respingere radical\u0103 a \u00celtregului sistem religios pe care Israel avea s\u0103-l \u00cent\u00elneasc\u0103 \u00cen Canaan.",
  units: [
    {
      id: "deuteronom-6-1-3",
      ref: "Deuteronom 6:1-3",
      heading: "Porunci date pentru zile lungi \u00cen \u021bara f\u0103g\u0103duit\u0103",
      text: deuteronomPassage(6, 1, 3),
      teaching: teaching(
        "Scopul poruncilor este spus limpede la \u00celceput: \u201eca s\u0103 tr\u0103i\u021bi mult\u103 vreme \u00cen \u021bara pe care o ve\u021bi lua \u00cen st\u0103p\u00enire\u201d. Legea nu este dat\u0103 pentru \u00cengreunarea vie\u021bii, ci pentru prelungirea ei, \u0219i pentru bel\u0219ugul \u201e\u00cen \u021bara \u00cen care curge lapte \u0219i miere\u201d.",
        "Formula \u201es\u0103 asculta\u021bi \u0219i s\u0103 pazi\u021bi cu grij\u0103\u201d, repetat\u0103 aici, arat\u0103 din nou c\u0103 ascultarea biblic\u0103 este mai mult dec\u00et acord intelectual; este p\u0103zire activ\u0103 \u00cen via\u021ba de zi cu zi.",
      ),
      words: [
        {
          original: "\u05d0\u05e8\u05e5 \u05d6\u05d1\u05ea \u05d7\u05dc\u05d1 \u05d5\u05d3\u05d1\u05e9",
          transliteration: "eretz zavat chalav udevash",
          language: "ebraica",
          meaning:
            "\u021bar\u0103 \u00cen care curge lapte \u0219i miere. Expresia clasic\u0103 pentru bel\u0219ugul \u021b\u0103rii f\u0103g\u0103duite, repetat\u0103 de multe ori \u00cen Pentateuh.",
        },
      ],
      crossRefs: ["Exod 3:8", "Deuteronom 4:40"],
      forYourHeart:
        "Poruncile lui Dumnezeu nu-\u021bi \u00cengreuneaz\u0103 via\u021ba; sunt date pentru bel\u0219ugul \u0219i lungimea zilelor tale.",
    },
    {
      id: "deuteronom-6-4-9",
      ref: "Deuteronom 6:4-9",
      heading: "Shema: DOMNUL este unul, \u0219i inima \u00cent\u0103rit\u0103 dup\u0103 El",
      text: deuteronomPassage(6, 4, 9),
      teaching: teaching(
        "\u201eAscult\u0103, Israel! DOMNUL, Dumnezeul nostru, este singurul DOMN\u201d \u2014 aceast\u0103 declara\u021bie scurt\u0103 este piatra de temelie a monoteismului biblic. \u00centr-o lume plin\u0103 de al\u021bi zei, Israel m\u0103rturise\u0219te un singur Dumnezeu, o singur\u0103 loialitate.",
        "Din aceast\u0103 unicitate decurge porunca cea mai mare: \u201es\u0103 iube\u0219ti pe DOMNUL, Dumnezeul t\u0103u, cu toat\u0103 inima ta, cu tot sufletul t\u0103u \u0219i cu toat\u0103 puterea ta\u201d. Domnul Iisus va numi aceasta cea mai mare porunc\u0103 din toat\u0103 Legea (Marcu 12:29-30), \u0219i pe ea se \u00celtemeiaz\u0103 toat\u0103 celelalte.",
        "Iubirea aceasta nu r\u0103m\u00ene teoretic\u0103: cuvintele trebuie s\u0103 fie \u201e\u00cen inima ta\u201d, \u00celv\u0103\u021bate copiilor, vorbite \u201eacas\u0103... pe drum... c\u00end te culci... c\u00end te scoli\u201d, purtate pe mn\u0103 \u0219i pe frunte, scrise pe u\u0219ile casei. \u00celtreaga via\u021b\u0103, \u00cen fiecare clip\u0103 \u0219i fiecare loc, este chemat\u0103 s\u0103 fie \u00cempregnat\u0103 de cuv\u00entul lui Dumnezeu.",
      ),
      words: [
        {
          original: "\u05e9\u05de\u05e2 \u05d9\u05e9\u05e8\u05d0\u05dc \u05d9\u05d4\u05d5\u05d4 \u05d0\u05dc\u05d4\u05d9\u05e0\u05d5 \u05d9\u05d4\u05d5\u05d4 \u05d0\u05d7\u05d3",
          transliteration: "Shema Yisrael, YHWH Eloheinu, YHWH echad",
          language: "ebraica",
          meaning:
            "Ascult\u0103, Israel: DOMNUL, Dumnezeul nostru, DOMNUL este unul. Cea mai important\u0103 confesiune de credin\u021b\u0103 a Vechiului Leg\u0103m\u00ent, rostit\u0103 zilnic de fiecare evreu practicant.",
        },
      ],
      crossRefs: ["Marcu 12:29-30", "Deuteronom 11:18-20", "Iacov 2:19"],
      forYourHeart:
        "Nu exist\u0103 col\u021b din via\u021ba ta \u2014 acas\u0103, pe drum, c\u00end te culci sau c\u00end te scoli \u2014 care s\u0103 fie prea mic pentru cuv\u00entul lui Dumnezeu.",
    },
    {
      id: "deuteronom-6-10-15",
      ref: "Deuteronom 6:10-15",
      heading: "Bel\u0219ugul care poate na\u0219te uitare",
      text: deuteronomPassage(6, 10, 15),
      teaching: teaching(
        "Moise avertizeaz\u0103 despre un pericol care nu vine din pustie sau r\u0103zboi, ci din bel\u0219ug: cet\u0103\u021bi pe care nu le-ai zidit, vii pe care nu le-ai s\u0103dit, f\u00ent\u00eni pe care nu le-ai s\u0103pat. \u201eSocote\u0219te-te s\u0103ul, ca nu cumva... s\u0103-L ui\u021bi pe DOMNUL\u201d. Prosperitatea nemeritat\u0103 poate na\u0219te o amnezie spiritual\u0103 mai periculoas\u0103 dec\u00et suferin\u021ba.",
        "Alergarea dup\u0103 al\u021bi dumnezei \u201edintre dumnezeii popoarelor \u00cenconjur\u0103toare\u201d este numit\u0103 direct ca provocare a m\u00eniei lui Dumnezeu: \u201ec\u0103ci DOMNUL, Dumnezeul t\u0103u, este un Dumnezeu gelos \u00cen mijlocul t\u0103u\u201d. Aceea\u0219i gelozie amintit\u0103 \u00cen Decalog r\u0103m\u00ene temeiul avertismentului.",
      ),
      words: [
        {
          original: "\u05e4\u05df-\u05aa\u05e9\u05db\u05d7",
          transliteration: "pen-tishkach",
          language: "ebraica",
          meaning:
            "ca nu cumva s\u0103 ui\u021bi. Formul\u0103 de avertisment repetat\u0103 de multe ori \u00cen Deuteronom, legat\u0103 mai ales de pericolul bel\u0219ugului.",
        },
      ],
      crossRefs: ["Deuteronom 8:11-14", "Proverbe 30:8-9", "Osea 13:6"],
      forYourHeart:
        "Bel\u0219ugul pe care nu l-ai muncit tu s\u0103 nu-\u021bi devin\u0103 prilej de uitare a Celui care \u021bi l-a dat.",
    },
    {
      id: "deuteronom-6-16-19",
      ref: "Deuteronom 6:16-19",
      heading: "Nu ispiti pe DOMNUL, ci fa\u021b ce este drept",
      text: deuteronomPassage(6, 16, 19),
      teaching: teaching(
        "\u201eS\u0103 nu ispiti\u021bi pe DOMNUL, Dumnezeul vostru, cum L-a\u021bi ispitit la Masa\u201d \u2014 aducere direct\u0103 aminte de c\u00erteala de la Masa (Exod 17:1-7), c\u00end poporul a cerut ap\u0103 punde\u00end la \u00celdoial\u0103 prezen\u021ba lui Dumnezeu. Domnul Iisus \u00cens\u0103\u0219i va cita acest verset \u00cen ispitirea din pustie (Matei 4:7).",
        "R\u0103spunsul cerut este simplu \u0219i cuprinz\u0103tor: \u201es\u0103 face\u021bi ce este bine \u0219i pl\u0103cut \u00cenaintea DOMNULUI\u201d. Nu este suficient s\u0103 evita\u021bi ispitirea lui Dumnezeu; trebuie tr\u0103it\u0103 activ dreptatea Lui, ca s\u0103 fie luat\u0103 \u00cen st\u0103p\u00enire \u021bara f\u0103g\u0103duit\u0103.",
      ),
      words: [
        {
          original: "\u05dc\u05d0 \u05aa\u05e0\u05e1\u05d5 \u05d0\u05aa-\u05d9\u05d4\u05d5\u05d4",
          transliteration: "lo tenasu et-YHWH",
          language: "ebraica",
          meaning:
            "s\u0103 nu ispiti\u021bi pe DOMNUL. Citat de Domnul Iisus \u00cen Matei 4:7 c\u00end a respins ispita diavolului de a se arunca de pe Templu.",
        },
      ],
      crossRefs: ["Exod 17:1-7", "Matei 4:7", "1 Corinteni 10:9"],
      forYourHeart:
        "Nu cere semne care s\u0103 for\u021beze m\u00na lui Dumnezeu; tr\u0103ie\u0219te dreptatea Lui \u0219i las\u0103-L s\u0103-\u0219i \u00cempline\u0103sc\u0103 f\u0103g\u0103duin\u021ba.",
    },
    {
      id: "deuteronom-6-20-25",
      ref: "Deuteronom 6:20-25",
      heading: "Ce vei r\u0103spunde fiului t\u0103u",
      text: deuteronomPassage(6, 20, 25),
      teaching: teaching(
        "Capitolul se \u00cencheie cu o \u00celtreb\u0103 pe care Moise o pune \u00cen gura copiilor viitori: \u201eCe \u00celseamn\u0103 aceste \u00celv\u0103\u021b\u0103turi, legi \u0219i porunci pe care vi le-a dat DOMNUL, Dumnezeul nostru?\u201d. Legea nu este dat\u0103 pentru a fi \u021binut\u0103 secret\u0103; este menit\u0103 s\u0103 trezeasc\u0103 curiozitate \u0219i \u00celtreb\u0103ri \u00cen genera\u021bia care vine.",
        "R\u0103spunsul p\u0103rin\u021bilor trebuie s\u0103 fie povestea izb\u0103virii: \u201eEram robi ai lui Faraon \u00cen Egipt, \u0219i DOMNUL ne-a scos din Egipt cu putere\u201d. Legea nu se \u00celv\u0103\u021b\u0103 \u00cen abstract, ci ca \u0219i r\u0103spuns la ceea ce Dumnezeu a f\u0103cut deja pentru eliberarea poporului Lui.",
      ),
      words: [
        {
          original: "\u05de\u05d4-\u05d4\u05e2\u05d3\u05aa \u05d5\u05d4\u05d7\u05e7\u05d9\u05dd",
          transliteration: "ma ha-edot vehachuqim",
          language: "ebraica",
          meaning:
            "ce \u00celseamn\u0103 m\u0103rturiile \u0219i hot\u0103r\u00erile. \u00celtrebarea imaginat\u0103 a copilului, care preg\u0103te\u0219te \u00celv\u0103\u021b\u0103tura viitoarelor genera\u021bii prin poveste, nu prin memorare seac\u0103.",
        },
      ],
      crossRefs: ["Exod 12:26-27", "Deuteronom 4:9", "Psalmul 78:5-7"],
      forYourHeart:
        "Preg\u0103te\u0219te-te s\u0103 r\u0103spunzi copiilor t\u0103i cu povestea izb\u0103virii, nu doar cu regulile, c\u00end te vor \u00celtreba de ce cre\u0219ti a\u0219a.",
    },
  ],
  prayer:
    "Doamne, Tu e\u0219ti unul, \u0219i noi \u00celv\u0103\u021b\u0103m s\u0103 Te iubim cu toat\u0103 inima, cu tot sufletul \u0219i cu toat\u0103 puterea.\n\nP\u0103ze\u0219te-ne de uitarea pe care bel\u0219ugul o poate na\u0219te \u00cen inimile noastre.\n\nD\u0103-ne \u00cenv\u0103\u021b\u0103tura care s\u0103 treac\u0103 la copiii no\u0219tri, prin poveste, nu doar prin regul\u0103.\n\n\u0218i ajut\u0103-ne s\u0103 facem ce este bine \u0219i pl\u0103cut \u00cenaintea Ta, f\u0103r\u0103 s\u0103 Te ispitim. Amin.",
  status: DEUTERONOM_STATUSES[6],
})
