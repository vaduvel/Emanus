import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicat\u0103 pe unit\u0103\u021bi de sens.
 */

export const DEUTERONOM_12 = deuteronomChapter({
  number: 12,
  title: "Deuteronom 12 \u2014 Un singur loc ales, nu locul care-\u021bi place \u021bie",
  summary:
    "\u00cencepe codul legilor propriu-zise cu porunca de a nimici toate locurile de \u00cenchinare canaanite \u0219i de a aduce jertfele numai \u00cn locul pe care DOMNUL \u00cnsu\u0219i \u00cel va alege. Israel poate m\u00cnca liber carne acas\u0103, dar cu excep\u021bia s\u00engelui, iar zeciuielile \u0219i jertfele trebuie duse la locul central. Capitolul se \u00cncheie cu avertismentul \u00cempotriva cercet\u0103rii felului \u00cen care neamurile se \u00cenchinau zeilor lor.",
  literaryContext:
    "Acesta este primul capitol al codului legilor (12-26), care aplic\u0103 \u00cn detaliu principiile deja predicate \u00cen capitolele exhortative. Tema centraliz\u0103rii cultului \u00centr-un singur loc ales de Dumnezeu va reveni constant \u00cn tot codul, ca principiu de unitate a \u00cnchin\u0103rii lui Israel.",
  historicalContext:
    "Canaani\u021bii \u00cenchinau la zeit\u0103\u021bile lor pe \u201edealuri \u00cnalte\u201d, sub copaci verzi, cu st\u00elpi de piatr\u0103 \u0219i idoli de lemn. Israel este chemat s\u0103 nimiceasc\u0103 total aceste locuri \u0219i s\u0103 nu-\u0219i \u00cenchipuiasc\u0103 un cult descentralizat, dup\u0103 modelul religiilor din jur, ci s\u0103 se adune \u00centr-un singur loc pe care DOMNUL \u00cnsu\u0219i \u00cel va alege, mai t\u00erziu identificat cu Ierusalimul.",
  units: [
    {
      id: "deuteronom-12-1-4",
      ref: "Deuteronom 12:1-4",
      heading: "Nimici\u021bi toate locurile lor de \u00cenchinare",
      text: deuteronomPassage(12, 1, 4),
      teaching: teaching(
        "Porunca este total\u0103 \u0219i f\u0103r\u0103 excep\u021bie: \u201es\u0103 nimici\u021bi toate locurile \u00cen care slujeau neamurile pe dumnezeii lor, pe mun\u021bii \u00celal\u021bi, pe dealuri \u0219i sub orice copac verde\u201d, \u0219i s\u0103 sf\u0103r\u00ame altarele, st\u00elpii de piatr\u0103, idolii de lemn \u0219i chipurile cioplite.",
        "Contrastul este f\u0103cut expres imediat: \u201es\u0103 nu face\u021bi a\u0219a fa\u021b\u0103 de DOMNUL, Dumnezeul vostru\u201d. Nimicirea locurilor idolatre nu \u00celseamn\u0103 c\u0103 se creeaz\u0103 multe locuri noi pentru DOMNUL \u00cen locul lor; \u00cenchinarea adev\u0103rat\u0103 este de un fel diferit \u0219i de o unitate diferit\u0103.",
      ),
      words: [
        {
          original: "\u05aa\u05d7\u05aa \u05db\u05dc-\u05e2\u05e5 \u05e8\u05e2\u05e0\u05df",
          transliteration: "tachat kol-etz ra'anan",
          language: "ebraica",
          meaning:
            "sub orice copac verde. Expresie folosit\u0103 frecvent \u00cen Vechiul Leg\u0103m\u00ent pentru locurile de \u00cenchinare idolatr\u0103, condamnate constant de proroci.",
        },
      ],
      crossRefs: ["Exod 34:13", "2 \u00cempara\u021bi 17:10-11", "Ieremia 3:6"],
      forYourHeart:
        "\u00cenchinarea adev\u0103rat\u0103 nu se \u00cnmul\u021be\u0219te \u00cen multe locuri f\u0103r\u0103 rost; ea are o unitate stabilit\u0103 de Dumnezeu \u00cnsu\u0219i.",
    },
    {
      id: "deuteronom-12-5-12",
      ref: "Deuteronom 12:5-12",
      heading: "Locul pe care \u00cel va ale DOMNUL pentru Numele S\u0103u",
      text: deuteronomPassage(12, 5, 12),
      teaching: teaching(
        "\u00cempotriva multiplic\u0103rii de locuri idolatre, DOMNUL alege un singur loc: \u201es\u0103 c\u0103uta\u021bi locul pe care \u00cel va alege DOMNUL, Dumnezeul vostru... ca s\u0103-\u0219i pun\u0103 Numele Lui acolo\u201d. Acest loc, neidentificat \u00cnc\u0103 \u00cen text, va fi mai t\u00erziu Ierusalimul.",
        "Acolo, \u0219i numai acolo, trebuie duse jertfele de tot felul, zeciuielile, darurile de m\u00en\u0103, juruin\u021bele \u0219i primele-n\u0103scute ale turmelor. Contrastul cu practica din pustie \u2014 \u201en-a\u021bi ajuns \u00celc\u0103 la odihna \u0219i mo\u0219tenirea pe care v-o d\u0103 DOMNUL\u201d \u2014 arat\u0103 c\u0103 acest sistem devine posibil abia c\u00end poporul se a\u0219eaz\u0103 stabil \u00cen \u021bar\u0103.",
      ),
      words: [
        {
          original: "\u05dc\u05e9\u05db\u05df \u05e9\u05de\u05d5 \u05e9\u05dd",
          transliteration: "leshaken shmo sham",
          language: "ebraica",
          meaning:
            "ca s\u0103-\u0219i a\u0219eze Numele S\u0103u acolo. Formula teologic\u0103 pentru locul central de \u00cenchinare, folosit\u0103 mai t\u00erziu direct pentru Templul lui Solomon.",
        },
      ],
      crossRefs: ["1 \u00cempara\u021bi 8:29", "2 Cronici 7:12", "Psalmul 132:13-14"],
      forYourHeart:
        "Adorarea ta nu este r\u0103spunderea ta singur\u0103; ea trebuie s\u0103 se adune \u00centr-un loc \u0219i o comunitate stabilit\u0103 de Dumnezeu.",
    },
    {
      id: "deuteronom-12-13-19",
      ref: "Deuteronom 12:13-19",
      heading: "Carne acas\u0103, dar niciodat\u0103 s\u00engele",
      text: deuteronomPassage(12, 13, 19),
      teaching: teaching(
        "Jertfele trebuie aduse doar la locul ales, dar via\u021ba de zi cu zi \u00cen restul \u021b\u0103rii nu este oprit\u0103: \u201epo\u021bi t\u0103ia \u0219i m\u00enca carne \u00cen toate cet\u0103\u021bile tale, oric\u00e2t vei pofti\u201d. Distinc\u021bia este clar\u0103: jertfa cult\u0103 se aduce la locul ales, hrana obi\u0219nuit\u0103 se poate lua acas\u0103.",
        "Interzicerea s\u00engelui, deja stabilit\u0103 din Leviticul 17:10-14, se repet\u0103 direct: \u201enumai s\u0103 nu m\u00enci s\u00engele; s\u0103-l torni pe p\u0103m\u00ent ca apa\u201d. S\u00engele reprezint\u0103 via\u021ba \u00cens\u0103\u0219i \u0219i r\u0103m\u00ne sfin\u021bit doar pentru DOMNUL.",
        "Grija pentru Levit este special\u0103: \u201es\u0103 te p\u0103ze\u0219ti s\u0103 nu la\u0219i pe levitul t\u0103u toat\u0103 vremea c\u00e2t vei fi \u00cen \u021bara ta\u201d. Cel care nu are mo\u0219tenire de p\u0103m\u00ent trebuie sus\u021binut activ de restul poporului.",
      ),
      words: [
        {
          original: "\u05d0\u05da \u05d4\u05d3\u05dd \u05dc\u05d0 \u05aa\u05d0\u05db\u05dc",
          transliteration: "akh ha-dam lo tokhal",
          language: "ebraica",
          meaning:
            "numai s\u00engele s\u0103 nu-l m\u00enci. Interzicere repetat\u0103 constant \u00cn Pentateuh, legat\u0103 de sfin\u021benia vie\u021bii pe care s\u00engele o reprezint\u0103.",
        },
      ],
      crossRefs: ["Leviticul 17:10-14", "Geneza 9:4", "Fapte 15:20"],
      forYourHeart:
        "Grija pentru cei f\u0103r\u0103 mo\u0219tenire proprie \u00cen mijlocul t\u0103u nu este op\u021bional\u0103; este parte a leg\u0103m\u00entului.",
    },
    {
      id: "deuteronom-12-20-28",
      ref: "Deuteronom 12:20-28",
      heading: "C\u00end \u021bara se va \u00cntinde",
      text: deuteronomPassage(12, 20, 28),
      teaching: teaching(
        "Legea preg\u0103te\u0219te dinainte pentru cre\u0219terea teritoriului: \u201ec\u00end DOMNUL \u00cn\u0219i va \u00cntinde \u021binuturile, cum \u021bi-a f\u0103g\u0103duit\u201d, \u0219i repet\u0103 aceea\u0219i \u00cng\u0103duin\u021b\u0103 pentru carnea obi\u0219nuit\u0103, cu aceea\u0219i interzicere a s\u00engelui.",
        "Ascultarea de toate poruncile este legat\u0103 direct de binele copiilor: \u201ep\u0103ze\u0219te \u0219i ascult\u0103 toate aceste lucruri... ca s\u0103-\u021bi fie bine, \u021bie \u0219i copiilor t\u0103i, pe urma ta, pe vecie, dac\u0103 vei face ce este bine \u0219i pl\u0103cut \u00cnaintea DOMNULUI\u201d.",
      ),
      words: [
        {
          original: "\u05db\u05d9-\u05d9\u05e8\u05d7\u05d9\u05d1 \u05d9\u05d4\u05d5\u05d4 \u05d0\u05aa-\u05d2\u05d1\u05dc\u05da",
          transliteration: "ki-yarchiv YHWH et-gvulekha",
          language: "ebraica",
          meaning:
            "c\u00end DOMNUL \u00cn\u0219i va \u00cntinde grani\u021bele. F\u0103g\u0103duin\u021b\u0103 de cre\u0219tere teritorial\u0103 pentru care legea preg\u0103te\u0219te din timp reguli practice.",
        },
      ],
      crossRefs: ["Deuteronom 19:8", "1 \u00cempara\u021bi 4:20-21", "Efeseni 3:20"],
      forYourHeart:
        "Dumnezeu preg\u0103te\u0219te dinainte reguli pentru cre\u0219terea pe care o va da; \u00cncrederea ta \u00cn El se \u00cnt\u00e2rzie s\u0103 preg\u0103teasc\u0103 pentru bel\u0219ug \u00cnainte de a-l vedea.",
    },
    {
      id: "deuteronom-12-29-32",
      ref: "Deuteronom 12:29-32",
      heading: "Nu \u00cencerca s\u0103 afli cum se \u00cenchinau ei",
      text: deuteronomPassage(12, 29, 32),
      teaching: teaching(
        "Avertismentul final al capitolului opre\u0219te chiar curiozitatea religioas\u0103: \u201es\u0103 nu cau\u021bi s\u0103 afli cum slujeau neamurile acestea dumnezeilor lor, ca s\u0103 faci \u0219i tu la fel\u201d. Nu doar practica idolatr\u0103 este oprit\u0103, ci \u0219i studiul curios care ar putea duce spre imitare.",
        "Capitolul se \u00cencheie cu porunca de nedep\u0103\u0219ire care va deveni un refren al c\u0103r\u021bii: \u201es\u0103 nu adaugi nimic la ea \u0219i s\u0103 nu scoate\u021bi nimic din ea\u201d, aceea\u0219i formul\u0103 de la Deuteronom 4:2. Legea DOMNULUI este complet\u0103 \u0219i suficient\u0103, f\u0103r\u0103 nevoia de completare din practicile p\u0103g\u00ne.",
      ),
      words: [
        {
          original: "\u05d0\u05d9\u05db\u05d4 \u05d9\u05e2\u05d1\u05d3\u05d5 \u05d4\u05d2\u05d5\u05d9\u05dd",
          transliteration: "eikha ya'avdu ha-goyim",
          language: "ebraica",
          meaning:
            "cum slujeau neamurile. Interdic\u021bia acoper\u0103 chiar curiozitatea de a cerceta practicile idolatre din dorin\u021b\u0103 de a le imita.",
        },
      ],
      crossRefs: ["Deuteronom 4:2", "Deuteronom 18:9", "Apocalipsa 22:18-19"],
      forYourHeart:
        "Nu orice curiozitate este nevinovat\u0103; unele c\u0103ut\u0103ri religioase te preg\u0103tesc, f\u0103r\u0103 s\u0103-\u021bi dai seama, spre imitare.",
    },
  ],
  prayer:
    "Doamne, \u00cnva\u021b\u0103-ne s\u0103 nimicim din via\u021ba noastr\u0103 toate locurile ascunse de \u00nchin\u0103ciune fals\u0103.\n\nAdun\u0103-ne \u00centr-un singur loc de \u00cnchinare adev\u0103rat\u0103, nu \u00cen multe c\u0103r\u0103ri alese de noi.\n\n\u00cenva\u021b\u0103-ne sfin\u021benia vie\u021bii, pe care s\u00engele o reprezint\u0103, \u0219i grija pentru cei f\u0103r\u0103 mo\u0219tenire.\n\n\u0218i p\u0103ze\u0219te-ne de curiozitatea care ne-ar duce spre imitarea practicilor care nu-\u021bi sunt pl\u0103cute. Amin.",
  status: DEUTERONOM_STATUSES[12],
})
