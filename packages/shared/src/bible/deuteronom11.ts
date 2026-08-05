import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicat\u0103 pe unit\u0103\u021bi de sens.
 */

export const DEUTERONOM_11 = deuteronomChapter({
  number: 11,
  title: "Deuteronom 11 \u2014 O binecuv\u00entare \u0219i un blestem puse \u00cnaintea ta",
  summary:
    "Moise \u00cencheie sec\u021biunea de exhortare cer\u00nd poporului s\u0103-\u0219i aminteasc\u0103 cu ochii lor ce a f\u0103cut DOMNUL \u00cn Egipt \u0219i cu Dathan \u0219i Abiram, s\u0103 \u00celve\u021be c\u0103 \u021bara f\u0103g\u0103duit\u0103 depinde de ploaia trimis\u0103 de DOMNUL, nu de irigare omeneasc\u0103 precum \u00cn Egipt, \u0219i s\u0103 lege cuvintele Legii de inim\u0103, de m\u0103n\u0103 \u0219i de u\u0219ile casei. Capitolul se \u00cncheie cu punerea binecuv\u00ent\u0103rii \u0219i a blestemului \u00cnaintea poporului, pe mun\u021bii Garizim \u0219i Ebal.",
  literaryContext:
    "Acest capitol \u00cncheie \u00cntreaga sec\u021biune exhortativ\u0103 (capitolele 5-11) care preg\u0103te\u0219te trecerea la codul legilor propriu-zise (capitolele 12-26). El repet\u0103 \u0219i \u00cnt\u0103re\u0219te temele deja \u00cnt\u00clnite: Shema, iubirea, aducerea aminte, \u0219i adaug\u0103 o imagine geografic\u0103 nou\u0103 \u2014 alegerea \u00cnsu\u0219i \u00cntre binecuv\u00entare \u0219i blestem.",
  historicalContext:
    "Egiptul depindea de irigarea artificial\u0103 din Nil, prin canale \u0219i \u00cnv\u00e2rtitoare de ap\u0103. Canaanul, dimpotriv\u0103, depindea direct de ploaia trimis\u0103 din cer, f\u0103r\u0103 posibilitatea de control omenesc \u2014 fapt care lega direct bel\u0219ugul \u021b\u0103rii de credincio\u0219ia poporului fa\u021b\u0103 de DOMNUL.",
  units: [
    {
      id: "deuteronom-11-1-7",
      ref: "Deuteronom 11:1-7",
      heading: "Ochii vo\u0219tri au v\u0103zut",
      text: deuteronomPassage(11, 1, 7),
      teaching: teaching(
        "Moise se adreseaz\u0103 acum genera\u021biei care a v\u0103zut cu propriii ochi minunile din Egipt \u0219i pustie \u2014 nu prin poveste transmis\u0103, ci prin experien\u021b\u0103 direct\u0103: \u201eochii vo\u0219tri au v\u0103zut toate lucr\u0103rile mari pe care le-a f\u0103cut DOMNUL\u201d.",
        "Amintirea includ \u0219i judecata asupra lui Dathan \u0219i Abiram, care \u201es-au deschis \u0219i i-a \u00cnghi\u021bit p\u0103m\u00entul, cu casele lor\u201d \u2014 o judecat\u0103 v\u0103zut\u0103 de \u00centregul Israel (Numeri 16), martor la ce se \u00cnt\u00e2mpl\u0103 celor care se r\u0103scoal\u0103 \u00cempotriva slujitorului aleas al lui Dumnezeu.",
      ),
      words: [
        {
          original: "\u05e2\u05d9\u05e0\u05d9\u05db\u05dd \u05d4\u05e8\u05d0\u05d5\u05aa",
          transliteration: "eineikhem ha-root",
          language: "ebraica",
          meaning:
            "ochii vo\u0219tri care au v\u0103zut. Formula subliniaz\u0103 diferen\u021ba dintre a\u0219a genera\u021bie martor\u0103 direct\u0103 \u0219i genera\u021biile viitoare care vor \u00cnv\u0103\u021ba doar prin transmitere.",
        },
      ],
      crossRefs: ["Numeri 16:28-33", "Exod 14:26-31", "Deuteronom 4:9"],
      forYourHeart:
        "Ce ai v\u0103zut cu ochii t\u0103i din lucrarea lui Dumnezeu este o comoar\u0103 pe care ai datoria s\u0103 o transmi\u021bi celor care nu au v\u0103zut.",
    },
    {
      id: "deuteronom-11-8-12",
      ref: "Deuteronom 11:8-12",
      heading: "O \u021bar\u0103 pe care o \u00cengrije\u0219te DOMNUL, nu o irigare omeneasc\u0103",
      text: deuteronomPassage(11, 8, 12),
      teaching: teaching(
        "Contrastul dintre Egipt \u0219i \u021bara f\u0103g\u0103duit\u0103 este f\u0103cut expres: \u201e\u021bara \u00cen care intri... nu este ca \u021bara Egiptului... unde sem\u0103nai s\u0103m\u00enta \u0219i o udai cu m\u00na ta, ca pe o gr\u0103din\u0103 de legume\u201d. Canaanul nu poate fi controlat prin munca omeneasc\u0103 singur\u0103; el depinde de cer.",
        "Descrierea culmineaz\u0103 \u00cntr-o afirma\u021bie plin\u0103 de intimitate: \u201eeste o \u021bar\u0103 de care \u00cengrije\u0219te DOMNUL, Dumnezeul t\u0103u; ochii DOMNULUI, Dumnezeului t\u0103u, sunt necurmat asupra ei, de la \u00cnceputul p\u00en\u0103 la sf\u00er\u0219itul anului\u201d. Aceast\u0103 grij\u0103 continu\u0103, nu punctual\u0103, este \u00cens\u0103\u0219i via\u021ba \u021b\u0103rii f\u0103g\u0103duite.",
      ),
      words: [
        {
          original: "\u05d0\u05e8\u05e5 \u05d3\u05e8\u05e9 \u05d0\u05aa\u05d4 \u05d9\u05d4\u05d5\u05d4",
          transliteration: "eretz dorosh otah YHWH",
          language: "ebraica",
          meaning:
            "o \u021bar\u0103 de care se \u00cngrije\u0219te/o caut\u0103 DOMNUL. Descrie leg\u0103tura intim\u0103 dintre teritoriul f\u0103g\u0103duin\u021bei \u0219i grija personal\u0103 a lui Dumnezeu pentru el.",
        },
      ],
      crossRefs: ["Deuteronom 8:7-10", "Psalmul 65:9-13", "Iacov 5:7"],
      forYourHeart:
        "Dumnezeu \u00cngrije\u0219te via\u021ba ta cu aceea\u0219i necurmat\u0103 aten\u021bie \u2014 de la \u00cnceputul p\u00en\u0103 la sf\u00er\u0219itul fiec\u0103rei zile.",
    },
    {
      id: "deuteronom-11-13-21",
      ref: "Deuteronom 11:13-21",
      heading: "Ploaia binecuv\u00ent\u0103rii, \u0219i cuvinte legate de inim\u0103",
      text: deuteronomPassage(11, 13, 21),
      teaching: teaching(
        "Ascultarea din inim\u0103 \u0219i suflet primesc r\u0103spuns direct din cer: \u201eVoi da \u021b\u0103rii voastre ploaie la vreme, ploaie timpurie \u0219i ploaie t\u00erzie\u201d. Dar avertismentul urmeaz\u0103 imediat: dac\u0103 inima se abate \u0219i se \u00cnchin\u0103 altor dumnezei, \u201eDOMNUL va \u00cncuia cerurile \u0219i nu va mai fi ploaie\u201d.",
        "Aceea\u0219i chemare din Deuteronom 6:6-9 se repet\u0103 aici, aproape identic: \u201epune\u021bi \u00cn inima \u0219i \u00cn sufletul vostru aceste cuvinte... \u00cnv\u0103\u021ba\u021bi-le copiilor vo\u0219tri... leag\u0103-le pe m\u00na ta \u0219i pe frunte, \u0219i scrie-le pe u\u0219ile casei tale\u201d. Repetarea nu este redundant\u0103; arat\u0103 c\u00e2t de esen\u021bial\u0103 este aceast\u0103 practic\u0103 zilnic\u0103.",
      ),
      words: [
        {
          original: "\u05de\u05dc\u05e7\u05d5\u05e9 \u05d5\u05de\u05dc\u05e7\u05d5\u05e9",
          transliteration: "malqosh umalqosh",
          language: "ebraica",
          meaning:
            "ploaie timpurie \u0219i t\u00erzie. Ciclul ploilor \u00cn Canaan era esen\u021bial pentru recolt\u0103, \u0219i era legat direct de credincio\u0219ia poporului fa\u021b\u0103 de leg\u0103m\u00ent.",
        },
      ],
      crossRefs: ["Deuteronom 6:6-9", "1 \u00cempara\u021bi 17:1", "Iacov 5:17-18"],
      forYourHeart:
        "P\u0103ze\u0219te-\u021bi inima de idoli ascun\u0219i; ei pot \u00cncuia cerul binecuv\u00ent\u0103rii f\u0103r\u0103 s\u0103-\u021bi dai seama de unde vine seceta.",
    },
    {
      id: "deuteronom-11-22-25",
      ref: "Deuteronom 11:22-25",
      heading: "Fiecare loc pe care va c\u0103lca talpa piciorului vostru",
      text: deuteronomPassage(11, 22, 25),
      teaching: teaching(
        "F\u0103g\u0103duin\u021ba de biruin\u021b\u0103 este condi\u021bionat\u0103 clar de ascultare: \u201edac\u0103 ve\u021bi p\u0103zi cu grij\u0103 toate aceste porunci... DOMNUL va izgoni dinaintea voastr\u0103 toate aceste neamuri\u201d. Nu doar teritoriul din f\u0103g\u0103duin\u021ba ini\u021bial\u0103, ci \u201eorice loc pe care va c\u0103lca talpa piciorului vostru\u201d va fi al lor.",
        "Aceast\u0103 promisiune se \u00cncheie cu asigurarea psihologic\u0103 cea mai important\u0103 pentru o o\u0219tire care \u00cnfrunt\u0103 neamuri mai mari: \u201enimeni nu va putea sta \u00cnaintea voastr\u0103... DOMNUL... va pune frica \u0219i groaza de voi peste toat\u0103 \u021bara pe care ve\u021bi c\u0103lca-o\u201d.",
      ),
      words: [
        {
          original: "\u05db\u05e3-\u05e8\u05d2\u05dc\u05db\u05dd",
          transliteration: "kaf-raglekhem",
          language: "ebraica",
          meaning:
            "talpa piciorului vostru. Expresie care descrie f\u0103g\u0103duin\u021ba \u00cn m\u0103sur\u0103 nelimitat\u0103: fiecare pas de ascultare este un pas spre mo\u0219tenire.",
        },
      ],
      crossRefs: ["Iosua 1:3", "Deuteronom 7:23-24", "Iosua 1:5"],
      forYourHeart:
        "Fiecare pas de ascultare deschide mo\u0219tenire nou\u0103; nu te limita la ce ai primit deja.",
    },
    {
      id: "deuteronom-11-26-32",
      ref: "Deuteronom 11:26-32",
      heading: "Binecuv\u00entare \u0219i blestem, pe Garizim \u0219i Ebal",
      text: deuteronomPassage(11, 26, 32),
      teaching: teaching(
        "Moise pune \u00cnaintea poporului o alegere clar\u0103, f\u0103r\u0103 loc de neutralitate: \u201eIat\u0103, pun ast\u0103zi \u00cnaintea voastr\u0103 binecuv\u00entarea \u0219i blestemul\u201d. Binecuv\u00entarea pentru ascultare, blestemul pentru abaterea spre al\u021bi dumnezei \u2014 aceea\u0219i tem\u0103 va fi dezvoltat\u0103 pe larg \u00cn capitolele 27-28.",
        "Geografia este anun\u021bat\u0103 dinainte: binecuv\u00entarea va fi rostit\u0103 pe muntele Garizim, blestemul pe muntele Ebal, dincolo de Iordan, \u00cn \u021bara canaani\u021bilor. Aceasta va fi o ceremonie public\u0103, vizibil\u0103, nu doar o rostire abstract\u0103.",
      ),
      words: [
        {
          original: "\u05d1\u05e8\u05db\u05d4 \u05d5\u05e7\u05dc\u05dc\u05d4",
          transliteration: "berakha uqlala",
          language: "ebraica",
          meaning:
            "binecuv\u00entare \u0219i blestem. Cele dou\u0103 c\u0103i puse \u00cnaintea poporului, tem\u0103 major\u0103 care va fi dezvoltat\u0103 \u00cn detaliu \u00cn Deuteronom 27-28.",
        },
      ],
      crossRefs: ["Deuteronom 27:11-13", "Deuteronom 28:1-2", "Iosua 8:33-34"],
      forYourHeart:
        "Nu exist\u0103 pozi\u021bie neutr\u0103 \u00cnaintea lui Dumnezeu; fiecare via\u021b\u0103 alege \u00cntre binecuv\u00entare \u0219i blestem prin ascultarea sau abaterea ei.",
    },
  ],
  prayer:
    "Doamne, ne aducem aminte cu ochii credin\u021bei de tot ce ai f\u0103cut pentru p\u0103rin\u021bii no\u0219tri.\n\nD\u0103-ne ploaia binecuv\u00ent\u0103rii Tale la vreme, \u0219i p\u0103ze\u0219te-ne de idolii care ar \u00cncuia cerul.\n\nLeag\u0103 cuvintele Tale de inima noastr\u0103, de m\u00na noastr\u0103 \u0219i de u\u0219ile caselor noastre.\n\n\u0218i ajut\u0103-ne s\u0103 alegem cu limpezime binecuv\u00entarea, nu blestemul, \u00cn fiecare zi a vie\u021bii noastre. Amin.",
  status: DEUTERONOM_STATUSES[11],
})
