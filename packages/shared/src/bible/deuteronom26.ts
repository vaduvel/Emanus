import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_26 = deuteronomChapter({
  number: 26,
  title: "Deuteronom 26 — Primele roade, zeciuiala împoșită, legământul reciproc împlinit",
  summary:
    "Moise cere aducerea primelor roade cu o mărturisire istorică a răscumpărării, zeciuiala celui de-al treilea an împoșită celor vulnerabili, și încheie cu declarația reciprocă a legământului între DOMNUL și Israel.",
  literaryContext:
    "Acest capitol încheie secțiunea legilor practice (12-26) cu două ritualuri liturgice care rezumă întreaga relație de legământ — recunoștință pentru răscumpărare și generozitate concretă — înainte de trecerea către blestemele și binecuvântările din 27-28.",
  historicalContext:
    "Mărturisirea liturgică „Tatăl meu era un aramean rătăcitor” rezumă istoria patriarhală și izbăvirea din Egipt într-o formulă că fiecare israelit trebuia să o repete personal, făcând din istoria națională o memorie trăită individual, nu doar o cunoaștere abstractă.",
  units: [
    {
      id: "deuteronom-26-1-11",
      ref: "Deuteronom 26:1-11",
      heading: "Primele roade, cu mărturisirea istoriei răscumpărării",
      text: deuteronomPassage(26, 1, 11),
      teaching: teaching(
        "Când israelitul aduce primele roade la locul ales de DOMNUL, el trebuie să spună cu voce tare toată istoria: „Tatăl meu era un aramean rătăcitor... Egiptenii ne-au chinuit... DOMNUL ne-a scos din Egipt cu mână tare”. Darul nu este tăcut, ci însoțit de memorie vorbită.",
        "Formula se încheie cu bucurie împărtășită: „să te bucuri, tu, levitul și străinul care este în mijlocul tău”. Recunoștința pentru binecuvântare nu se trăiește izolat, ci împărtășit cu cei care nu au pământ propriu — levitul și străinul.",
      ),
      words: [
        {
          original: "ארמי אבד אבי",
          transliteration: "Arammi oved avi",
          language: "ebraica",
          meaning:
            "tatăl meu era un aramean rătăcitor/gata să piară. Formula deschide mărturisirea liturgică, rezumând fragilitatea originară a poporului înainte de intervenția răscumpărătoare a DOMNULUI.",
        },
      ],
      crossRefs: ["Geneza 47:9", "Exod 3:7-8", "Ioan 4:35-36"],
      forYourHeart:
        "Recunoștința adevărată nu este tăcută; ea își spune cu voce tare povestea răscumpărării și o împarte cu cei din jur.",
    },
    {
      id: "deuteronom-26-12-15",
      ref: "Deuteronom 26:12-15",
      heading: "Zeciuiala celui de-al treilea an, mărturisită fără abătere",
      text: deuteronomPassage(26, 12, 15),
      teaching: teaching(
        "Zeciuiala anului al treilea este destinată explicit levitului, străinului, orfanului și văduvei, „și ei vor mânca în porțile tale și se vor sătura”. Mărturisirea care o însoțește insistă că nimic nu a fost ținut pentru sine, nici folosit necurat, nici dat pentru un mort.",
        "Rugăciunea finală — „privește din locașul Tău cel sfânt... și binecuvântează pe poporul Tău Israel” — arată că ascultarea în zeciuială nu este doar procedură legală, ci dă celui care ascultă încrederea de a cere deschis binecuvântarea lui Dumnezeu.",
      ),
      words: [
        {
          original: "מעשר שנת השלישית",
          transliteration: "ma'aser shenat hashlishit",
          language: "ebraica",
          meaning:
            "zeciuiala anului al treilea. Ciclu special de zeciuială destinat direct celor fără moștenire de pământ — levitul, străinul, orfanul, văduva — nu adusă la sanctuar, ci lăsată în localitate.",
        },
      ],
      crossRefs: ["Deuteronom 14:28-29", "Numeri 18:21-24", "Maleahi 3:10"],
      forYourHeart:
        "Ascultarea materială făcută cu integritate îți dă dreptul să vii înaintea lui Dumnezeu cu încredere și să-I ceri deschis binecuvântarea.",
    },
    {
      id: "deuteronom-26-16-19",
      ref: "Deuteronom 26:16-19",
      heading: "Legământul reciproc, declarat de amândouă părțile",
      text: deuteronomPassage(26, 16, 19),
      teaching: teaching(
        "Capitolul se încheie cu o formulă remarcabilă de legământ mutual: „astăzi ai făcut pe DOMNUL să-ți declare că El va fi Dumnezeul tău” și „astăzi DOMNUL te-a făcut să-I declari că vei fi un popor al Lui”. Ambele părți se angajează reciproc, printr-un act verbal solemn.",
        "Scopul declarat al acestui legământ este poziția unică a lui Israel: „să-ți dea întâietate în slavă, în nume și în cinste mai presus de toate popoarele” și să fie „un popor sfânt pentru DOMNUL”. Aleasa nu este un privilegiu gratuit, ci vine cu ascultarea deplină din inimă și suflet.",
      ),
      words: [
        {
          original: "האמרת 250 האמירך",
          transliteration: "heemarta / heemirkha",
          language: "ebraica",
          meaning:
            "ai declarat / DOMNUL te-a declarat. Jocul verbal reciproc, folosind aceeași rădăcină pentru ambele direcții ale legământului — declarația lui Israel și declarația DOMNULUI, unite într-un singur act de angajament.",
        },
      ],
      crossRefs: ["Exod 19:5-6", "1 Petru 2:9", "Ieremia 31:33"],
      forYourHeart:
        "Legământul cu Dumnezeu nu este unilateral; El se angajează față de tine la fel de solemn cum te angajezi și tu față de El.",
    },
  ],
  prayer:
    "Doamne, învață-ne să spunem cu voce tare povestea răscumpărării Tale în viața noastră, nu să o ținem tăcută.\n\nDă-ne integritate în ascultarea materială, ca să venim înaintea Ta cu încredere.\n\nAjută-ne să înțelegem că legământul cu Tine este reciproc, și Tu Te angajezi față de noi la fel cum ne ceri să ne angajăm față de Tine.\n\nȘi fă-ne un popor sfânt, din inimă și suflet, nu doar din procedură. Amin.",
  status: DEUTERONOM_STATUSES[26],
})
