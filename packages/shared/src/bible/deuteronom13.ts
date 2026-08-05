import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicat\u0103 pe unit\u0103\u021bi de sens.
 */

export const DEUTERONOM_13 = deuteronomChapter({
  number: 13,
  title: "Deuteronom 13 \u2014 C\u00end ademenirea vine dintr-un semn, dintr-o cas\u0103 sau dintr-o cetate",
  summary:
    "Moise avertizeaz\u0103 poporul \u00cempotriva a trei surse de ademenire spre idolatrie: un proroc mincinos care face un semn adev\u0103rat, o persoan\u0103 apropiat\u0103 din familie sau prietenie, \u0219i o cetate \u00cntreag\u0103 care se \u00cnclin\u0103 spre al\u021bi dumnezei. \u00cen toate cele trei cazuri, apropierea sau adev\u0103rul par\u021bial al semnului nu \u00cnl\u0103tur\u0103 vinov\u0103\u021bia, ci cere o loialitate mai mare fa\u021b\u0103 de DOMNUL dec\u00et fa\u021b\u0103 de orice rela\u021bie sau minune.",
  literaryContext:
    "Acest capitol continu\u0103 direct avertismentul din finalul capitolului 12 \u00cempotriva imit\u0103rii practicilor idolatre, ar\u0103t\u00end \u00cn detaliu cele mai periculoase c\u0103i prin care idolatria s-ar putea infiltra \u00cn Israel: prin autoritate religioas\u0103 fals\u0103, prin rela\u021bii personale intime, \u0219i prin conformarea social\u0103 a unei \u00cntregi comunit\u0103\u021bi.",
  historicalContext:
    "Prorocii \u0219i cei care t\u0103lm\u0103ceau vise erau figuri respectate \u00cn lumea antic\u0103, iar un semn sau o minune \u00cnf\u0103ptuit\u0103 real d\u0103dea autoritate imediat\u0103 vorbelor lor. Legea lui Israel refuz\u0103 acest criteriu ca test suficient al adev\u0103rului, cer\u00nd \u00cn schimb conformitatea cu Cuv\u00entul deja dat la Horeb.",
  units: [
    {
      id: "deuteronom-13-1-5",
      ref: "Deuteronom 13:1-5",
      heading: "Un semn adev\u0103rat, un mesaj mincinos",
      text: deuteronomPassage(13, 1, 5),
      teaching: teaching(
        "Legea preg\u0103te\u0219te dinainte pentru un caz tulbur\u0103tor: un proroc sau un t\u0103lm\u0103citor de vise care d\u0103 un semn sau o minune, \u201eiar semnul sau minunea despre care \u021bi-a vorbit se \u00cnt\u00empl\u0103\u201d, dar apoi \u00cencearc\u0103 s\u0103 \u00cndrepte poporul spre al\u021bi dumnezei. Adev\u0103rul unui semn nu \u00cnseamn\u0103 automat adev\u0103rul mesajului care \u00cnl \u00cnso\u021be\u0219te.",
        "Textul dezv\u0103luie scopul teologic al unei asemenea \u00celt\u00empl\u0103ri: \u201eDOMNUL, Dumnezeul vostru, v\u0103 pune la \u00cncercare, ca s\u0103 vad\u0103 dac\u0103 iubi\u021bi pe DOMNUL, Dumnezeul vostru, cu toat\u0103 inima voastr\u0103 \u0219i cu tot sufletul vostru\u201d. \u00cencerc\u0103rile de acest fel nu sunt \u00cnt\u00empl\u0103toare; ele descoper\u0103 loialitatea real\u0103 a inimii.",
        "Pedeapsa cerut\u0103 este cea mai sever\u0103: moartea, \u201ec\u0103ci a c\u0103utat s\u0103 v\u0103 abat\u0103 de la DOMNUL, Dumnezeul vostru, care v-a scos din \u021bara Egiptului \u0219i v-a izb\u0103vit din casa robiei\u201d. Ademenirea spre idolatrie este considerat\u0103 tr\u0103dare a leg\u0103m\u00entului fundamental, nu o simpl\u0103 eroare de \u00cnv\u0103\u021b\u0103tur\u0103.",
      ),
      words: [
        {
          original: "\u05de\u05e0\u05e1\u05d4 \u05d9\u05d4\u05d5\u05d4 \u05d0\u05aa\u05db\u05dd",
          transliteration: "menase YHWH etkhem",
          language: "ebraica",
          meaning:
            "DOMNUL v\u0103 pune la \u00cncercare. Aceea\u0219i r\u0103d\u0103cin\u0103 ca \u00cn Deuteronom 8:2, ar\u0103t\u00end c\u0103 \u00cncerc\u0103rile lui Dumnezeu au scopul de a descoperi loialitatea real\u0103 a inimii.",
        },
      ],
      crossRefs: ["Matei 24:24", "2 Tesaloniceni 2:9-10", "1 Ioan 4:1"],
      forYourHeart:
        "Un semn adev\u0103rat nu confirm\u0103 automat un mesaj adev\u0103rat; testeaz\u0103 orice \u00celv\u0103\u021b\u0103tur\u0103 prin ceea ce Dumnezeu a spus deja.",
    },
    {
      id: "deuteronom-13-6-11",
      ref: "Deuteronom 13:6-11",
      heading: "C\u00end ademenirea vine dintr-o rela\u021bie apropiat\u0103",
      text: deuteronomPassage(13, 6, 11),
      teaching: teaching(
        "Cazul se \u00cnt\u0103re\u0219te prin intimitate: \u201edac\u0103 fratele t\u0103u, fiul mamei tale, sau fiul t\u0103u, sau fiica ta, sau nevasta pe care o iube\u0219ti, sau prietenul t\u0103u pe care-l iube\u0219ti ca via\u021ba ta\u201d \u00cncearc\u0103 s\u0103 te ademeneasc\u0103 \u00cn tain\u0103 spre al\u021bi dumnezei. Apropierea \u0219i afec\u021biunea, oric\u00e2t de fireasc\u0103, nu justific\u0103 abaterea de la DOMNUL.",
        "Porunca este dur\u0103, dar consecvent\u0103 cu principiul din capitolul 6: \u201es\u0103 nu-l ascul\u021bi... m\u00na ta s\u0103 fie cea mai \u00cnt\u00e2i \u00cnmpotriva lui\u201d, ca judecata s\u0103 fie public\u0103 \u0219i clar\u0103, \u201eca s\u0103 nu se mai fac\u0103 un lucru a\u0219a de r\u0103u \u00cen mijlocul vostru\u201d. Adev\u0103rata dragoste pentru un membru de familie nu-l poate \u00cnso\u021bi \u00cen tr\u0103dare.",
      ),
      words: [
        {
          original: "\u05d1\u05e1\u05aa\u05e8",
          transliteration: "beseter",
          language: "ebraica",
          meaning:
            "\u00cen tain\u0103, \u00cn secret. Ademenirea descris\u0103 aici nu este public\u0103, ci ascuns\u0103, folosindu-se de intimitatea unei rela\u021bii de \u00cncredere.",
        },
      ],
      crossRefs: ["Deuteronom 6:5", "Matei 10:37", "Luca 14:26"],
      forYourHeart:
        "Iubirea pentru cel mai drag om nu te scute\u0219te de responsabilitatea de a refuza ademenirea lui spre p\u0103cat.",
    },
    {
      id: "deuteronom-13-12-18",
      ref: "Deuteronom 13:12-18",
      heading: "O cetate \u00cntreag\u0103 ademenit\u0103",
      text: deuteronomPassage(13, 12, 18),
      teaching: teaching(
        "Ultimul \u0219i cel mai grav caz este colectiv: \u201eni\u0219te oameni r\u0103i\u201d care \u00cnt\u00e2rn\u0103 pe locuitorii unei cet\u0103\u021bi \u00cntregi s\u0103 slujeasc\u0103 altor dumnezei. Israel este chemat s\u0103 cerceteze cu grij\u0103, \u201es\u0103 \u00cntrebi, s\u0103 cercetezi \u0219i s\u0103 te informezi bine\u201d, \u00cnainte de a ac\u021biona pe baza unui zvon.",
        "Dac\u0103 lucrul este adev\u0103rat, judecata cerut\u0103 este nimicirea total\u0103 a cet\u0103\u021bii \u0219i a tot ce este \u00cn ea, ca \u201enimicire des\u0103v\u00er\u0219it\u0103\u201d f\u0103r\u0103 s\u0103 se p\u0103streze nimic pentru sine, ca \u201eDOMNUL S\u0103-\u0219i \u00cntoarc\u0103 de la m\u00nia Lui\u201d. Aceast\u0103 asprime arat\u0103 gravitatea idolatriei colective care ar putea corupe \u00cntregul popor.",
      ),
      words: [
        {
          original: "\u05d3\u05e8\u05e9 \u05d5\u05d7\u05e7\u05e8 \u05d5\u05e9\u05d0\u05dc \u05d4\u05d9\u05d8\u05d1",
          transliteration: "darosh vechaqor ushe'al heitev",
          language: "ebraica",
          meaning:
            "s\u0103 cerce\u021bi, s\u0103 investighezi \u0219i s\u0103 \u00cntrebi bine. Trei verbe de cercetare temeinic\u0103, ar\u0103t\u00end c\u0103 judecata sever\u0103 nu se \u00cntemeiaz\u0103 pe zvon, ci pe adev\u0103r verificat.",
        },
      ],
      crossRefs: ["Deuteronom 17:4", "Iosua 7:1-26", "1 Corinteni 5:6-7"],
      forYourHeart:
        "Verific\u0103 adev\u0103rul temeinic \u00cnainte de a judeca; dar c\u00end idolatria coruple o \u00cntreag\u0103 comunitate, r\u0103spunsul trebuie s\u0103 fie tot a\u0219a de temeinic.",
    },
  ],
  prayer:
    "Doamne, \u00cenva\u021b\u0103-ne s\u0103 nu confund\u0103m un semn adev\u0103rat cu un mesaj adev\u0103rat.\n\nD\u0103-ne curajul s\u0103 refuz\u0103m ademenirea, chiar c\u00end vine de la cei mai apropia\u021bi de noi.\n\nP\u0103ze\u0219te comunit\u0103\u021bile noastre de conformarea colectiv\u0103 spre idolatrie.\n\n\u0218i \u00cenva\u021b\u0103-ne s\u0103 iubim adev\u0103rul mai mult dec\u00et orice rela\u021bie sau minune. Amin.",
  status: DEUTERONOM_STATUSES[13],
})
