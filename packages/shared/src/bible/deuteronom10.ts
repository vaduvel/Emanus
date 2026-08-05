import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicat\u0103 pe unit\u0103\u021bi de sens.
 */

export const DEUTERONOM_10 = deuteronomChapter({
  number: 10,
  title: "Deuteronom 10 \u2014 Table noi, \u0219i o inim\u0103 care trebuie t\u0103iat\u0103 \u00cempreun\u0103",
  summary:
    "Dup\u0103 mijlocirea din capitolul precedent, DOMNUL porunce\u0219te table noi de piatr\u0103 \u0219i un chivot pentru p\u0103strarea lor. Moise aminte\u0219te moartea lui Aaron \u0219i alegerea Leviei ca semin\u021bie f\u0103r\u0103 mo\u0219tenire p\u0103m\u00enteasc\u0103, apoi rezum\u0103 \u00celtreaga cerere a lui Dumnezeu \u00cntr-o singur\u0103 \u00celtreb\u0103re \u0219i chemarea de a t\u0103ia inima \u00cempreun\u0103, nu doar trupul.",
  literaryContext:
    "Capitolul acesta este puntea dintre povestirea vi\u021belului de aur \u0219i chemarea final\u0103 la ascultare din capitolul 11. Versetul 12, \u201eCe cere DOMNUL, Dumnezeul t\u0103u, de la tine?\u201d, este una din marile rezum\u0103ri ale religiei biblice, citat\u0103 \u0219i \u00cen Mica 6:8.",
  historicalContext:
    "Chivotul leg\u0103m\u00entului, f\u0103cut din lemn de salc\u00em, avea s\u0103 poarte cele dou\u0103 table noi ale Legii p\u00en\u0103 \u00cen Templul lui Solomon. Semin\u021bia Leviei a fost aleas\u0103 s\u0103 slujeasc\u0103 \u00cen locul preo\u021biei \u0219i s\u0103 nu primeasc\u0103 mo\u0219tenire de p\u0103m\u00ent, ci s\u0103 aib\u0103 pe DOMNUL \u00cnsu\u0219i ca partea lor.",
  units: [
    {
      id: "deuteronom-10-1-5",
      ref: "Deuteronom 10:1-5",
      heading: "Table noi \u00cen locul celor sf\u0103r\u00emate",
      text: deuteronomPassage(10, 1, 5),
      teaching: teaching(
        "DOMNUL nu las\u0103 leg\u0103m\u00entul rupt f\u0103r\u0103 refacere: \u201et\u0103ie\u0219te dou\u0103 table de piatr\u0103, ca cele de mai \u00celainte, \u0219i suie-te la Mine pe munte\u201d. Table sf\u0103r\u00emate din pricina p\u0103catului poporului sunt \u00cellocuite, nu abandonate; leg\u0103m\u00entul continu\u0103.",
        "Moise \u00cel construie\u0219te un chivot de lemn de salc\u00em ca s\u0103 primeasc\u0103 tablele, pun\u00end acolo cuv\u00entul lui Dumnezeu \u201ecum a fost mai \u00celainte\u201d. Cuvintele scrise din nou sunt identice cu cele scrise prima dat\u0103; Legea nu se schimb\u0103 de la o versiune la alta, ci este restaurat\u0103 exact.",
      ),
      words: [
        {
          original: "\u05d0\u05e8\u05d5\u05df \u05e2\u05e6\u05d9 \u05e9\u05d8\u05d9\u05dd",
          transliteration: "aron atzei shitim",
          language: "ebraica",
          meaning:
            "chivot de lemn de salc\u00em. Materialul \u0219i construc\u021bia chivotului sunt descrise \u00cen detaliu \u0219i \u00cen Exod 25:10-16; aici este men\u021bionat sumar, ca fapt cunoscut deja.",
        },
      ],
      crossRefs: ["Exod 34:1-4", "Exod 25:10-16", "Evrei 9:4"],
      forYourHeart:
        "C\u00end leg\u0103m\u00entul t\u0103u cu Dumnezeu pare sf\u0103r\u00emat de p\u0103cat, El nu-l abandoneaz\u0103; \u00cel restaureaz\u0103, identic \u00cen adev\u0103r, prin poc\u0103in\u021b\u0103.",
    },
    {
      id: "deuteronom-10-6-9",
      ref: "Deuteronom 10:6-9",
      heading: "Moartea lui Aaron, \u0219i o semin\u021bie f\u0103r\u0103 mo\u0219tenire p\u0103m\u00enteasc\u0103",
      text: deuteronomPassage(10, 6, 9),
      teaching: teaching(
        "Textul insereaz\u0103 o nota\u021bie de c\u0103l\u0103torie \u0219i moartea lui Aaron la Moserah, unde fiul lui Eleazar \u00cel urmeaz\u0103 \u00cen slujba preo\u021bease. Chiar cel mai mare preot al leg\u0103m\u00entului nu tr\u0103ie\u0219te pentru totdeauna; slujba continu\u0103 dincolo de persoana care o \u00cendepline\u0219te la un moment dat.",
        "Levi este ales pentru o chemare unic\u0103: \u201es\u0103 duc\u0103 chivotul leg\u0103m\u00entului DOMNULUI, s\u0103 stea \u00cnaintea DOMNULUI ca s\u0103-I slujeasc\u0103 \u0219i s\u0103 binecuv\u00enteze \u00cen Numele Lui\u201d. De aceea nu prime\u0219te mo\u0219tenire de p\u0103m\u00ent \u00cempreun\u0103 cu fra\u021bii lui: \u201eDOMNUL este partea lui de mo\u0219tenire\u201d.",
      ),
      words: [
        {
          original: "\u05d9\u05d4\u05d5\u05d4 \u05d4\u05d5\u05d0 \u05e0\u05d7\u05dc\u05aa\u05d5",
          transliteration: "YHWH hu nachalato",
          language: "ebraica",
          meaning:
            "DOMNUL este mo\u0219tenirea lui. Formula folosit\u0103 despre semin\u021bia Levi, care nu prime\u0219te teritoriu, dar prime\u0219te ceva mai mare: pe \u00cnsu\u0219i Dumnezeu.",
        },
      ],
      crossRefs: ["Numeri 18:20", "Numeri 20:22-29", "Psalmul 16:5"],
      forYourHeart:
        "Uneori Dumnezeu nu \u021bi d\u0103 mo\u0219tenirea pe care o a\u0219tep\u021bi, ci pe El \u00cnsu\u0219i, care este mai mare dec\u00et orice mo\u0219tenire p\u0103m\u00enteasc\u0103.",
    },
    {
      id: "deuteronom-10-10-13",
      ref: "Deuteronom 10:10-13",
      heading: "Ce cere DOMNUL de la tine",
      text: deuteronomPassage(10, 10, 13),
      teaching: teaching(
        "Moise \u00cei\u0219i aminte\u0219te c\u0103 mijlocirea lui de patruzeci de zile s-a \u00cencheiat cu iertare: \u201eDOMNUL m-a ascultat \u0219i n-a voit s\u0103 te nimiceasc\u0103\u201d, iar apoi cu porunca de a merge \u00cenainte \u201eca s\u0103 iei \u00cen st\u0103p\u00enire \u021bara pe care am jurat p\u0103rin\u021bilor t\u0103i c\u0103 le-o voi da\u201d.",
        "Versetul 12 rezum\u0103 \u00celtreaga cerere a lui Dumnezeu \u00cntr-o \u00celtreb\u0103re memorabil\u0103: \u201eCe cere DOMNUL, Dumnezeul t\u0103u, de la tine, dec\u00et s\u0103 te temi de DOMNUL, Dumnezeul t\u0103u, s\u0103 mergi \u00cen toate c\u0103ile Lui, s\u0103-L iube\u0219ti \u0219i s\u0103-I slujeasc\u0103 cu toat\u0103 inima ta \u0219i cu tot sufletul t\u0103u\u201d? Religia biblic\u0103 se rezum\u0103 \u00cel patru mi\u0219c\u0103ri: fric\u0103 sf\u00ent\u0103, ascultare, iubire, slujire.",
      ),
      words: [
        {
          original: "\u05d5\u05e2\u05aa\u05d4 \u05d9\u05e9\u05e8\u05d0\u05dc \u05de\u05d4 \u05d9\u05d4\u05d5\u05d4 \u05e9\u05d0\u05dc \u05de\u05e2\u05de\u05da",
          transliteration: "veata Yisrael ma YHWH sho'el me'imakh",
          language: "ebraica",
          meaning:
            "\u0219i acum, Israel, ce cere DOMNUL de la tine. Formula devine tema central\u0103 a chem\u0103rii profetice, citat\u0103 \u0219i de Mica: \u201eCe cere DOMNUL de la tine: dec\u00et s\u0103 faci dreptate, s\u0103 iube\u0219ti mila \u0219i s\u0103 mergi smerit cu Dumnezeul t\u0103u\u201d.",
        },
      ],
      crossRefs: ["Mica 6:8", "Matei 22:37-38", "Deuteronom 6:4-5"],
      forYourHeart:
        "Religia ta nu se rezum\u0103 la reguli complicate; se rezum\u0103 la fric\u0103 sf\u0103nt\u0103, ascultare, iubire \u0219i slujire cu toat\u0103 inima.",
    },
    {
      id: "deuteronom-10-14-22",
      ref: "Deuteronom 10:14-22",
      heading: "T\u0103ia\u021bi \u00cempreun\u0103 inima voastr\u0103",
      text: deuteronomPassage(10, 14, 22),
      teaching: teaching(
        "Suveranitatea lui Dumnezeu este afirmat\u0103 \u00cn toat\u0103 amploarea ei: \u201eale DOMNULUI, Dumnezeului t\u0103u, sunt cerurile \u0219i cerurile cerurilor, p\u0103m\u00entul \u0219i tot ce este pe el\u201d. \u00celtr-un asemenea univers, alegerea p\u0103rin\u021bilor lui Israel din toate popoarele este pur\u0103 iubire, nu necesitate.",
        "Porunca central\u0103 este surprinz\u0103tor de intim\u0103: \u201es\u0103 t\u0103ia\u021bi \u00cempreun\u0103 inima voastr\u0103 [circumcizia inimii] \u0219i s\u0103 nu mai fi\u021bi cu grumazul \u021beap\u0103n\u201d. Circumcizia trupului, semnul leg\u0103m\u00entului exterior, este nimic f\u0103r\u0103 circumcizia inimii \u2014 tema care va fi dezvoltat\u0103 mai t\u00erziu de proroci \u0219i de apostolul Pavel.",
        "Chemarea final\u0103 este spre iubire practic\u0103, nu abstract\u0103: \u201eiubi\u021bi pe str\u0103in, c\u0103ci \u0219i voi a\u021bi fost str\u0103ini \u00cen \u021bara Egiptului\u201d. Dumnezeu \u00cns\u0103\u0219i \u201eface dreptate orfanului \u0219i v\u0103duvei \u0219i iube\u0219te pe str\u0103in\u201d, \u0219i cere aceea\u0219i inim\u0103 de la poporul S\u0103u.",
      ),
      words: [
        {
          original: "\u05d5\u05de\u05dc\u05aa\u05dd \u05d0\u05aa \u05e2\u05e8\u05dc\u05aa \u05dc\u05d1\u05d1\u05db\u05dd",
          transliteration: "umaltem et orlat levavkhem",
          language: "ebraica",
          meaning:
            "s\u0103 t\u0103ia\u021bi \u00cempreun\u0103 pielea inimii voastre. Metafor\u0103 pentru circumcizia inimii, dezvoltat\u0103 mai t\u00erziu \u00cen Ieremia 4:4 \u0219i Romani 2:29.",
        },
      ],
      crossRefs: ["Deuteronom 30:6", "Ieremia 4:4", "Romani 2:28-29"],
      forYourHeart:
        "Un semn exterior al leg\u0103m\u00entului, f\u0103r\u0103 o inim\u0103 schimbat\u0103, nu \u00celseamn\u0103 nimic. Cere lui Dumnezeu t\u0103ierea l\u0103untric\u0103.",
    },
  ],
  prayer:
    "Doamne, Tu restaurezi leg\u0103m\u00entul sf\u0103r\u00emat de p\u0103catul nostru, cuv\u00nt cu cuv\u00ent, identic \u00cen adev\u0103r.\n\n\u00cenva\u021b\u0103-ne c\u0103 cererea Ta se rezum\u0103 la fric\u0103 sf\u0103nt\u0103, ascultare, iubire \u0219i slujire cu toat\u0103 inima.\n\nT\u0103ie\u0219te \u00cempreun\u0103 inima noastr\u0103, nu doar semnul exterior al leg\u0103m\u00entului.\n\n\u0218i \u00cenva\u021b\u0103-ne s\u0103 iubim pe str\u0103in cum ne-ai iubit \u0219i pe noi c\u00end eram str\u0103ini. Amin.",
  status: DEUTERONOM_STATUSES[10],
})
