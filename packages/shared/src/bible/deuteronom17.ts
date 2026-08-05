import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicat\u0103 pe unit\u0103\u021bi de sens.
 */

export const DEUTERONOM_17 = deuteronomChapter({
  number: 17,
  title: "Deuteronom 17 \u2014 Cercetare temeinic\u0103, \u0219i un rege sub Legea lui Dumnezeu",
  summary:
    "Moise cere cercetare temeinic\u0103 \u00cn cazurile de idolatrie, cu m\u0103rturia a doi sau trei martori, \u0219i \u00cnndrum\u0103 cazurile grele c\u0103tre preo\u021bi \u0219i judec\u0103tori la locul ales. Capitolul se \u00nncheie cu legea regelui: ales de DOMNUL, dintre fra\u021bi, care nu-\u0219i \u00cnmul\u021be\u0219te cai, neveste sau argint, \u0219i care trebuie s\u0103-\u0219i copieze \u0219i s\u0103 citeasc\u0103 zilnic Legea.",
  literaryContext:
    "Acest capitol dezvolt\u0103 tema justi\u021biei din finalul capitolului 16, extinz\u00end-o de la judec\u0103tori locali la sistemul judiciar central \u0219i, \u00cn cele din urm\u0103, la conducerea suprem\u0103 a na\u021biunii \u2014 regele, care este \u0219i el, ca to\u021bi ceilal\u021bi, supus Legii lui Dumnezeu.",
  historicalContext:
    "Legea regelui este remarcabil\u0103 \u00cn contextul Orientului Antic: regii vecini se considerau reprezentan\u021bi divini absolu\u021bi, f\u0103r\u0103 vreo lege scris\u0103 mai sus dec\u00et voin\u021ba lor. Israel prime\u0219te aici, cu secole \u00cnainte de a avea vreun rege, o limitare constitu\u021bional\u0103 a puterii regale sub autoritatea Legii scrise.",
  units: [
    {
      id: "deuteronom-17-1",
      ref: "Deuteronom 17:1",
      heading: "Nicio jertf\u0103 cu cusur",
      text: deuteronomPassage(17, 1, 1),
      teaching: teaching(
        "Legea repet\u0103 aici principiul deja stabilit \u00cn capitolul 15: \u201es\u0103 nu jertfe\u0219ti DOMNULUI... un bou sau un miel care are vreun cusur sau vreo meteahn\u0103, c\u0103ci ar fi o ur\u00nciune pentru DOMNUL\u201d. Aceast\u0103 repetare arat\u0103 c\u00et de important era pentru Moise ca poporul s\u0103 nu ofere lui Dumnezeu doar r\u0103m\u0103\u0219i\u021bele.",
      ),
      words: [
        {
          original: "\u05aa\u05d5\u05e2\u05d1\u05aa \u05d9\u05d4\u05d5\u05d4",
          transliteration: "to'avat YHWH",
          language: "ebraica",
          meaning:
            "o ur\u00nciune pentru DOMNUL. Termen folosit \u00cn Deuteronom pentru p\u0103cate care sunt \u00cn mod special respingente pentru caracterul sf\u00nt al lui Dumnezeu.",
        },
      ],
      crossRefs: ["Deuteronom 15:21", "Leviticul 22:19-25", "Maleahi 1:8"],
      forYourHeart:
        "Ce-i dai lui Dumnezeu ar trebui s\u0103 fie ce ai mai bun, nu ce nu-\u021bi mai serve\u0219te \u021bie.",
    },
    {
      id: "deuteronom-17-2-7",
      ref: "Deuteronom 17:2-7",
      heading: "Idolatria cercetat\u0103 temeinic, cu doi sau trei martori",
      text: deuteronomPassage(17, 2, 7),
      teaching: teaching(
        "C\u00end se aude de un om sau o femeie care s-a \u00cnchinat \u201esoarelui, lunii sau vreunei stele de pe cer\u201d, legea cere o cercetare serioas\u0103: \u201es\u0103 cercetezi bine lucrul, s\u0103-l vezi cu de-am\u0103nuntul, \u0219i dac\u0103 se afl\u0103 adev\u0103rat, sigur\u201d. Zvonul nu era suficient pentru o sentin\u021b\u0103 capital\u0103.",
        "Principiul martorilor \u2014 \u201epe m\u0103rturia a doi sau trei martori s\u0103 fie omor\u00et cel vinovat de moarte, iar nu pe m\u0103rturia unui singur martor\u201d \u2014 protejeaz\u0103 via\u021ba de acuza\u021bii singulare \u0219i nedovedite. Martorii \u00cn\u0219i\u0219i trebuie s\u0103 \u00nceap\u0103 executarea, o m\u0103sur\u0103 care descuraja m\u0103rturia mincinoas\u0103.",
      ),
      words: [
        {
          original: "\u05e2\u05dc-\u05e4\u05d9 \u05e9\u05e0\u05d9\u05dd \u05e2\u05d3\u05d9\u05dd \u05d0\u05d5 \u05e9\u05dc\u05e9\u05d4 \u05e2\u05d3\u05d9\u05dd",
          transliteration: "al-pi shnayim edim o shlosha edim",
          language: "ebraica",
          meaning:
            "pe m\u0103rturia a doi sau trei martori. Principiul juridic care va fi citat \u0219i de Domnul Isus \u0219i de apostoli \u00cn Noul Testament pentru confirmarea faptelor.",
        },
      ],
      crossRefs: ["Deuteronom 19:15", "Matei 18:16", "2 Corinteni 13:1"],
      forYourHeart:
        "Nu judeca pe baz\u0103 de zvon; cercetarea temeinic\u0103 \u0219i dovezile solide protejeaz\u0103 dreptatea, nu o \u00cnt\u00erzie.",
    },
    {
      id: "deuteronom-17-8-13",
      ref: "Deuteronom 17:8-13",
      heading: "Cazurile grele, la locul ales",
      text: deuteronomPassage(17, 8, 13),
      teaching: teaching(
        "Pentru cazurile prea grele pentru judec\u0103torii locali \u2014 \u201epricini de ucis, de judecat\u0103, de r\u0103ni\u201d \u2014 legea prevede o instan\u021b\u0103 superioar\u0103 la locul ales, format\u0103 din preo\u021bi levi\u021bi \u0219i judec\u0103torul de atunci: \u201eei \u00cn\u0219i vor cerceta pricina \u0219i \u021bi-o vor spune\u201d.",
        "Ascultarea de aceast\u0103 verdict este obligatorie \u0219i sever\u0103: \u201eomul care, din \u00cnndr\u0103zneal\u0103, nu va ascult\u0103 de preot... sau de judec\u0103tor, omul acela s\u0103 moar\u0103\u201d. Un sistem judiciar func\u021bional cere supunere fa\u021b\u0103 de verdict, nu doar accesul la judecat\u0103.",
      ),
      words: [
        {
          original: "\u05d5\u05d1\u05d0\u05aa \u05d0\u05dc-\u05d4\u05d9\u05e9\u05d9\u05dd \u05d5\u05d0\u05dc-\u05d4\u05e9\u05e4\u05d8",
          transliteration: "uvata el-hakohanim ve'el-hashofet",
          language: "ebraica",
          meaning:
            "s\u0103 te \u00cnnfa\u021bi\u0219ezi la preo\u021bi \u0219i la judec\u0103torul de atunci. Formula descrie sistemul de recurs pentru cazurile care nu se pot rezolva la nivel local.",
        },
      ],
      crossRefs: ["Exod 18:22-26", "Deuteronom 16:18", "2 Cronici 19:8-10"],
      forYourHeart:
        "Nu orice problem\u0103 se rezolv\u0103 singur; cazurile grele au nevoie de \u00cnn\u021belepciune mai mare, la care s\u0103 te supui cu smerenie.",
    },
    {
      id: "deuteronom-17-14-20",
      ref: "Deuteronom 17:14-20",
      heading: "Legea regelui, supus \u0219i el Legii scrise",
      text: deuteronomPassage(17, 14, 20),
      teaching: teaching(
        "Legea regelui anticipeaz\u0103 dorin\u021ba viitoare a lui Israel de a avea un rege \u201eca toate neamurile de \u00cmprejur\u201d, dar impune limite str\u00emte: regele trebuie ales de DOMNUL, s\u0103 fie \u201edintre fra\u021bii t\u0103i\u201d, nu str\u0103in, \u0219i s\u0103 nu-\u0219i \u00cnmul\u021beasc\u0103 cai, neveste sau argint \u0219i aur \u2014 cele trei mijloace clasice de acumulare a puterii absolute.",
        "Cea mai remarcabil\u0103 cerin\u021b\u0103 este scrisul: regele trebuie s\u0103-\u0219i \u201escrie o cop\u021bie a acestei legi\u201d \u0219i \u201es-o citeasc\u0103 \u00cn toate zilele vie\u021bii lui, ca s\u0103 \u00cnve\u021be a se teme de DOMNUL, Dumnezeul lui... \u0219i s\u0103 nu se \u00cnal\u021be mai pe sus de fra\u021bii lui\u201d. Regele lui Israel nu este mai sus de Lege, ci sub ea, ca orice alt israelit.",
      ),
      words: [
        {
          original: "\u05dc\u05d1\u05dc\u05aa\u05d9 \u05d2\u05d1\u05d4-\u05dc\u05d1\u05d1\u05d5 \u05de\u05d0\u05d7\u05d9\u05d5",
          transliteration: "levilti gvoh-levavo me'echav",
          language: "ebraica",
          meaning:
            "ca s\u0103 nu se \u00cnal\u021be inima lui mai pe sus de fra\u021bii lui. Scopul copierii \u0219i cititului zilnic al Legii de c\u0103tre rege: p\u0103zirea de m\u00endrie \u0219i de \u00cnstr\u0103inarea puterii de popor.",
        },
      ],
      crossRefs: ["1 Samuel 8:4-9", "1 Regi 10:26-11:4", "Psalmul 119:97-98"],
      forYourHeart:
        "Autoritatea pe care o ai peste al\u021bii nu te scoate de sub Legea lui Dumnezeu; ea trebuie s\u0103 te fac\u0103 mai smerit, nu mai \u00cnalt.",
    },
  ],
  prayer:
    "Doamne, \u00cenva\u021b\u0103-ne s\u0103-\u021bi d\u0103m ce-i mai bun, nu r\u0103m\u0103\u0219i\u021bele vie\u021bii noastre.\n\nD\u0103-ne \u00cnn\u021belepciune s\u0103 cercet\u0103m temeinic \u00cnainte de a judeca, \u0219i smerenie s\u0103 ne supunem verdictelor drepte.\n\nRidic\u0103 peste noi conduc\u0103tori care se supun Legii Tale, nu se \u00cnal\u021b\u0103 mai pe sus de fra\u021bii lor.\n\n\u0218i \u00nva\u021b\u0103-ne \u0219i pe noi s\u0103 citim zilnic Cuv\u00entul T\u0103u, ca s\u0103 ne temem \u00cntotdeauna de Tine. Amin.",
  status: DEUTERONOM_STATUSES[17],
})
