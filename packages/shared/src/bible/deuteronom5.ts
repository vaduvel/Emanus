import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicat\u0103 pe unit\u0103\u021bi de sens.
 */

export const DEUTERONOM_5 = deuteronomChapter({
  number: 5,
  title: "Deuteronom 5 \u2014 Decalogul rostit din nou, pentru o genera\u021bie nou\u0103",
  summary:
    "Moise adun\u0103 tot Israelul \u0219i repet\u0103 Cele Zece Porunci date la Horeb, amintind fricii \u0219i cererii poporului ca el s\u0103 fie mijlocitor \u00eentre ei \u0219i DOMNUL. Capitolul se \u00eencheie cu chemarea de a merge \u00een toate poruncile lui Dumnezeu, \u201eca s\u0103 v\u0103 fie bine\u201d.",
  literaryContext:
    "Aceasta este a doua rostire a Decalogului din Scriptur\u0103, dup\u0103 cea din Exod 20. Deosebirile mici dintre cele dou\u0103 versiuni \u2014 mai ales la porunca Sabatului \u2014 arat\u0103 c\u0103 aceea\u0219i lege este predicat\u0103 din nou, cu accente potrivite unei genera\u021bii care se preg\u0103te\u0219te s\u0103 intre \u00een \u021bar\u0103, nu doar copiat\u0103 mecanic.",
  historicalContext:
    "Genera\u021bia c\u0103reia i se adreseaz\u0103 Moise nu era, \u00cen mare parte, prezent\u0103 la Horeb ca adul\u021bi; mul\u021bi erau copii sau nu se n\u0103scuser\u0103 \u00cenc\u0103. Totu\u0219i Moise le spune: \u201eDOMNUL a f\u0103cut acest leg\u0103m\u00ent cu noi, cu to\u021bi cei care sunt aici ast\u0103zi\u201d, ar\u0103t\u00end c\u0103 leg\u0103m\u00entul se \u00cempropriaz\u0103 de fiecare genera\u021bie, nu doar de cea care l-a v\u0103zut cu ochii.",
  units: [
    {
      id: "deuteronom-5-1-5",
      ref: "Deuteronom 5:1-5",
      heading: "Un leg\u0103m\u00ent \u00celsu\u0219it, nu doar auzit",
      text: deuteronomPassage(5, 1, 5),
      teaching: teaching(
        "Moise deschide capitolul cu o chemare la aten\u021bie deplin\u0103: \u201eAscult\u0103, Israel, \u00cenv\u0103\u021b\u0103turile \u0219i poruncile pe care vi le spun ast\u0103zi, ca s\u0103 le \u00cenv\u0103\u021ba\u021bi \u0219i s\u0103 le p\u0103zi\u021bi \u0219i s\u0103 le face\u021bi\u201d. Trei verbe \u00cen \u0219ir \u2014 a \u00cenv\u0103\u021ba, a p\u0103zi, a face \u2014 arat\u0103 c\u0103 ascultarea adev\u0103rat\u0103 trece dincolo de cunoa\u0219tere spre p\u0103zire \u0219i \u00cenf\u0103ptuire.",
        "Versetul 3 este surprinz\u0103tor de direct: \u201eDOMNUL n-a f\u0103cut acest leg\u0103m\u00ent numai cu p\u0103rin\u021bii no\u0219tri, ci cu noi to\u021bi care suntem aici ast\u0103zi \u0219i suntem \u00cen via\u021b\u0103\u201d. Leg\u0103m\u00entul de la Horeb nu este o istorie \u00cendep\u0103rtat\u0103 pentru genera\u021bia nou\u0103; este propriul lor leg\u0103m\u00ent, la fel cum r\u0103m\u00ene \u0219i pentru cei ce citesc acum aceste cuvinte.",
      ),
      words: [
        {
          original: "\u05e9\u05de\u05e2 \u05d9\u05e9\u05e8\u05d0\u05dc",
          transliteration: "shema Yisrael",
          language: "ebraica",
          meaning:
            "Ascult\u0103, Israel. Formula de chemare la aten\u021bie deplin\u0103, care va deveni celebr\u0103 mai ales prin repetarea ei \u00cen Deuteronom 6:4.",
        },
      ],
      crossRefs: ["Exod 19:5-6", "Deuteronom 6:4", "Evrei 8:8-10"],
      forYourHeart:
        "Leg\u0103m\u00entul lui Dumnezeu nu este o poveste veche pentru tine; este chiar leg\u0103m\u00entul t\u0103u, ast\u0103zi.",
    },
    {
      id: "deuteronom-5-6-10",
      ref: "Deuteronom 5:6-10",
      heading: "Niciun alt dumnezeu, niciun chip cioplit",
      text: deuteronomPassage(5, 6, 10),
      teaching: teaching(
        "Prima porunc\u0103 se \u00celtemeiaz\u0103 pe un fapt istoric, nu pe o cerere abstract\u0103: \u201eEu sunt DOMNUL, Dumnezeul t\u0103u, care te-am scos din \u021bara Egiptului, din casa robiei\u201d. Ascultarea nu este cerut\u0103 de un st\u0103p\u00en necunoscut, ci de Cel care a izb\u0103vit deja poporul.",
        "Interzicerea chipurilor cioplite este direct legat\u0103 de gelozia lui Dumnezeu, deja explicat\u0103 \u00cen capitolul precedent. Pedeapsa se \u00centinde \u201ep\u00en\u0103 la al treilea \u0219i al patrulea neam\u201d, dar mila \u201ep\u00en\u0103 la al miilea neam\u201d celor ce iubesc pe Dumnezeu \u0219i p\u0103zesc poruncile Lui \u2014 disproportia arat\u0103 c\u0103 mila DOMNULUI \u00centrece cu mult m\u00enia Lui.",
      ),
      words: [
        {
          original: "\u05d0\u05dc \u05e7\u05e0\u05d0",
          transliteration: "El qana",
          language: "ebraica",
          meaning:
            "Dumnezeu gelos. Aceea\u0219i r\u0103d\u0103cin\u0103 ca \u00cen Deuteronom 4:24; gelozia lui Dumnezeu este r\u00evna dreapt\u0103 a unui leg\u0103m\u00ent exclusiv, nu o pornire omeneasc\u0103.",
        },
      ],
      crossRefs: ["Exod 20:2-6", "Deuteronom 4:23-24", "Ioan 14:15"],
      forYourHeart:
        "Ascultarea ta nu este cerut\u0103 de un str\u0103in; este r\u0103spunsul firesc c\u0103tre Cel care te-a izb\u0103vit deja.",
    },
    {
      id: "deuteronom-5-11-15",
      ref: "Deuteronom 5:11-15",
      heading: "Numele DOMNULUI, \u0219i odihna care aminte\u0219te de robie",
      text: deuteronomPassage(5, 11, 15),
      teaching: teaching(
        "Porunca despre Numele DOMNULUI opre\u0219te folosirea lui \u00een de\u0219ert, \u201ec\u0103ci DOMNUL nu va l\u0103sa nepedepsit pe cel ce va lua \u00een de\u0219ert Numele Lui\u201d. Numele lui Dumnezeu nu este o formul\u0103 magic\u0103 sau o expresie oarecare; el poart\u0103 aceea\u0219i sfin\u021benie ca \u0219i Persoana pe care o nume\u0219te.",
        "Porunca Sabatului aici are un temei diferit de cel din Exod 20:11 (odihna lui Dumnezeu la crea\u021bie): \u201eaminte\u0219te-\u021bi c\u0103 ai fost rob \u00cen \u021bara Egiptului \u0219i DOMNUL... te-a scos de acolo\u201d. Sabatul din Deuteronom este \u00celv\u0103\u021bat ca amintire a eliber\u0103rii din robie \u2014 odihna dat\u0103 unui popor de sclavi care nu avea niciodat\u0103 odihn\u0103.",
        "Porunca include expres \u201erobul t\u0103u, roaba ta... ca \u0219i tine\u201d \u0219i vitele: odihna Sabatului nu este un privilegiu al st\u0103p\u00enilor, ci un dar care se \u00celtinde peste toat\u0103 casa \u0219i peste to\u021bi cei care muncesc \u00cen ea.",
      ),
      words: [
        {
          original: "\u05d5\u05d6\u05db\u05e8\u05ea\u05d0 \u05db\u05d9-\u05e2\u05d1\u05d3 \u05d4\u05d9\u05d9\u05ea\u05d0",
          transliteration: "vezakharta ki-eved hayita",
          language: "ebraica",
          meaning:
            "\u0219i \u00eeaminte\u0219te-\u021bi c\u0103 ai fost rob. Temeiul special al Sabatului \u00cen Deuteronom: odihna ca amintire practic\u0103 a eliber\u0103rii din robie.",
        },
      ],
      crossRefs: ["Exod 20:8-11", "Exod 20:2", "Deuteronom 15:15"],
      forYourHeart:
        "Odihna ta nu este doar un drept c\u00e2\u0219tigat; este o amintire a eliber\u0103rii pe care ai primit-o gratuit de la Dumnezeu.",
    },
    {
      id: "deuteronom-5-16-21",
      ref: "Deuteronom 5:16-21",
      heading: "De la cinstirea p\u0103rin\u021bilor la st\u0103p\u00enirea poftei",
      text: deuteronomPassage(5, 16, 21),
      teaching: teaching(
        "Poruncile despre om \u00cen leg\u0103tur\u0103 cu semenul lui \u00cencep chiar \u00cen cas\u0103: \u201eCinste\u0219te pe tat\u0103l t\u0103u \u0219i pe mama ta... ca s\u0103-\u021bi fie bine \u0219i s\u0103 tr\u0103ie\u0219ti mult\u0103 vreme\u201d. Aceasta este singura porunc\u0103 din Decalog legat\u0103 direct de o f\u0103g\u0103duin\u021b\u0103, semn al importan\u021bei ei pentru \u00centreaga structur\u0103 social\u0103.",
        "Interzicerile care urmeaz\u0103 \u2014 crima, adulterul, furtul, m\u0103rturia mincinoas\u0103 \u2014 protejeaz\u0103 via\u021ba, c\u0103snicia, avutul \u0219i adev\u0103rul \u00cen ordinea social\u0103 a leg\u0103m\u00entului. Ultima porunc\u0103, \u00cempotriva poftei, se \u00celtinde \u00cen interiorul omului \u00cens\u0103\u0219i: nu doar fapta, ci dorin\u021ba nes\u0103turat\u0103 este oprit\u0103.",
      ),
      words: [
        {
          original: "\u05dc\u05d0 \u05ea\u05d7\u05de\u05d3",
          transliteration: "lo tachmod",
          language: "ebraica",
          meaning:
            "s\u0103 nu pofte\u0219ti. Unica porunc\u0103 din Decalog care nu vizeaz\u0103 o fapt\u0103 exterioar\u0103, ci starea l\u0103untric\u0103 a inimii \u00celsu\u0219i.",
        },
      ],
      crossRefs: ["Exod 20:12-17", "Efeseni 6:1-3", "Romani 7:7"],
      forYourHeart:
        "Legea lui Dumnezeu nu se opre\u0219te la fapt\u0103; ea ajunge la r\u0103d\u0103cina dorin\u021bei din inima ta.",
    },
    {
      id: "deuteronom-5-22-27",
      ref: "Deuteronom 5:22-27",
      heading: "O fric\u0103 care cere un mijlocitor",
      text: deuteronomPassage(5, 22, 27),
      teaching: teaching(
        "Poporul \u00cei\u0219i aminte\u0219te propria lor spaim\u0103 la Horeb: \u201eDOMNUL, Dumnezeul nostru, ne-a ar\u0103tat m\u0103rirea Lui... noi am auzit glasul Lui din mijlocul focului\u201d, \u0219i au tras concluzia \u201ecine dintre oameni... ar putea s\u0103 tr\u0103iasc\u0103?\u201d. Prezen\u021ba nemijlocit\u0103 a lui Dumnezeu era prea \u00celfrico\u0219\u0103toare de \u00celdurat.",
        "De aceea poporul cere: \u201eDu-te tu \u0219i ascult\u0103 tot ce-\u021bi va spune DOMNUL, Dumnezeul nostru, \u0219i spune-ne-l tu \u00enapoi\u201d. Nevoia unui mijlocitor \u00centre un Dumnezeu sf\u00ent \u0219i un popor care nu poate purta prezen\u021ba Lui direct\u0103 este recunoscut\u0103 chiar de popor, \u0219i preg\u0103te\u0219te calea pentru \u00celt\u0103rirea slujbei preo\u021be\u0219ti \u0219i, mai t\u00erziu, pentru Mijlocitorul deplin.",
      ),
      words: [
        {
          original: "\u05de\u05aa\u05d5\u05da \u05d4\u05d0\u05e9",
          transliteration: "mitokh ha-esh",
          language: "ebraica",
          meaning:
            "din mijlocul focului. Descrie locul de unde a auzit Israel glasul DOMNULUI la Horeb, repetat de mai multe ori \u00cen aceste capitole.",
        },
      ],
      crossRefs: ["Exod 20:18-19", "Evrei 12:18-21", "1 Timotei 2:5"],
      forYourHeart:
        "Nevoia unui mijlocitor \u00centre tine \u0219i sfin\u021benia lui Dumnezeu nu este sl\u0103biciune; este smerenie recunoscut\u0103 corect.",
    },
    {
      id: "deuteronom-5-28-33",
      ref: "Deuteronom 5:28-33",
      heading: "O inim\u0103 dorit\u0103, \u0219i o cale de urmat",
      text: deuteronomPassage(5, 28, 33),
      teaching: teaching(
        "DOMNUL prime\u0219te cererea poporului \u0219i o nume\u0219te bun\u0103: \u201eAu spus bine tot ce \u021bi-au spus\u201d. Dar apoi rostirea Lui deschide o dorin\u021b\u0103 mai profund\u0103, spus\u0103 aproape ca un suspin: \u201eO, de-ar avea ei mereu o inim\u0103 ca aceasta, ca s\u0103 se team\u0103 de Mine \u0219i s\u0103 p\u0103zeasc\u0103 poruncile Mele!\u201d. Frica sf\u00ent\u0103 de la Horeb era autentic\u0103, dar Dumnezeu \u0219tia deja c\u0103 nu va \u021bine.",
        "Capitolul se \u00cencheie cu o chemare simpl\u0103 \u0219i hot\u0103r\u00etoare: \u201es\u0103 mearg\u0103 pe toat\u0103 calea pe care v-a poruncit-o DOMNUL, Dumnezeul vostru, ca s\u0103 tr\u0103i\u021bi \u0219i s\u0103 v\u0103 fie bine\u201d. Nu exist\u0103 abatere \u00een dreapta sau \u00cen st\u00enga; calea leg\u0103m\u00entului este una singur\u0103, dat\u0103 pentru binele celor care o urmeaz\u0103.",
      ),
      words: [
        {
          original: "\u05de\u05d9-\u05d9\u05ea\u05df \u05d5\u05d4\u05d9\u05d4 \u05dc\u05d1\u05d1\u05dd \u05d6\u05d4",
          transliteration: "mi-yiten vehaya levavam ze",
          language: "ebraica",
          meaning:
            "o, de-ar fi/de-ar da cineva ca inima lor s\u0103 fie aceasta. Expresie de dorin\u021b\u0103 profund\u0103, ar\u0103t\u00end c\u0103 statornicia inimii, nu doar frica de o clip\u0103, este ceea ce dore\u0219te Dumnezeu.",
        },
      ],
      crossRefs: ["Deuteronom 29:4", "Ieremia 31:33", "Ezechiel 36:26-27"],
      forYourHeart:
        "Dumnezeu nu se satur\u0103 cu o fric\u0103 de o clip\u0103; dore\u0219te o inim\u0103 statornic\u0103, care s\u0103-L urmeze pe deplin, mereu.",
    },
  ],
  prayer:
    "Doamne, Tu ne-ai izb\u0103vit \u00cenainte de a ne cere ascultarea; ajut\u0103-ne s\u0103 r\u0103spundem din recuno\u0219tin\u021b\u0103, nu din fric\u0103 goal\u0103.\n\nD\u0103-ne o inim\u0103 statornic\u0103, nu doar o \u00celfrico\u0219are trec\u0103toare \u00cen fa\u021ba sfin\u021beniei Tale.\n\n\u00cenva\u021b\u0103-ne s\u0103 p\u0103str\u0103m odihna Ta ca pe o amintire a eliber\u0103rii, nu ca pe o povar\u0103.\n\n\u0218i \u021bine-ne pe calea pe care ne-ai poruncit-o, f\u0103r\u0103 abatere \u00een dreapta sau \u00cen st\u00enga. Amin.",
  status: DEUTERONOM_STATUSES[5],
})
