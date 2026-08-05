import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_15 = deuteronomChapter({
  number: 15,
  title: "Deuteronom 15 — Anul dezlegării, și o mână deschisă pentru cel sărac",
  summary:
    "La fiecare șapte ani, datoriile dintre israeliteți trebuie lăsate; robii evrei trebuie eliberați și încărcați cu daruri, nu trimiși cu mâna goală. Moise cere o mână largă deschisă către cel sărac, fără calcul egoist în fața anului de dezlegare care se apropie, și încheie capitolul cu regula întâi pentru primele-născute ale turmelor.",
  literaryContext:
    "Acest capitol dezvoltă grija socială deja începută în capitolul 14 pentru Levit, orfan și văduvă, adăugând un sistem economic radical de restaurare periodică: anul de dezlegare și eliberarea robilor evrei, care preveneau acumularea permanentă a sărăciei generaționale.",
  historicalContext:
    "În lumea antică, datoria neplătită putea duce la sclavie permanentă și la o clasă săracă fără speranță de eliberare. Legea lui Israel introduce un ciclu de șapte ani care resetează datoriile și eliberează robii, înrădăcinat în însuși ritmul Sabatului.",
  units: [
    {
      id: "deuteronom-15-1-6",
      ref: "Deuteronom 15:1-6",
      heading: "Anul dezlegării, și o țară fără săraci",
      text: deuteronomPassage(15, 1, 6),
      teaching: teaching(
        "La fiecare șapte ani, orice dator israelit trebuie lăsat liber: „să lași să se șteargă orice datorie pe care o are aproapele tău”. Față de străini nu se aplică această lege, dar între frații legământului, banii nu pot deveni o povară permanentă.",
        "Făgăduința este idealistă, dar clar condiționată: „nu va fi niciun sărac în mijlocul tău”, „dacă vei asculta glasul DOMNULUI”. Belșugul țării, împreună cu ascultarea de această resetare periodică a datoriilor, ar trebui să elimine sărăcia structurală.",
      ),
      words: [
        {
          original: "שמיטה",
          transliteration: "shemita",
          language: "ebraica",
          meaning:
            "dezlegare, lăsare, eliberare (a datoriilor). Termenul dezvoltă aceeași rădăcină folosită și pentru anul sabatic al pământului în Leviticul 25.",
        },
      ],
      crossRefs: ["Leviticul 25:1-7", "Exod 23:10-11", "Matei 6:12"],
      forYourHeart:
        "Datoriile neînchipuit de mari pe care alții le au față de tine — fie financiare, fie morale — pot fi lăsate periodic, cum ți-a lăsat Dumnezeu datoria ta.",
    },
    {
      id: "deuteronom-15-7-11",
      ref: "Deuteronom 15:7-11",
      heading: "O mână deschisă, fără calcul egoist",
      text: deuteronomPassage(15, 7, 11),
      teaching: teaching(
        "Legea anticipează o tentație naturală: când anul dezlegării se apropie, ar putea fi tentant să nu împrumuți celui în nevoie, ca să nu pierzi banii. Legea interzice explicit acest calcul: „să nu ai o inimă rea pentru fratele tău lipsit și să nu-i dai nimic”.",
        "Chemarea este de a dărui liber și cu inimă bună: „să deschizi larg mâna ta și să-i împrumuți cu mâna larg deschisă ce-i este de nevoie”. Fraza care încheie capitolul — „n-au să lipsească săracii din țară” — este echilibrată realist cu porunca practică de generozitate continuă.",
      ),
      words: [
        {
          original: "פתח תפתח את-ידך",
          transliteration: "patoach tiftach et-yadekha",
          language: "ebraica",
          meaning:
            "să deschizi larg mâna ta (repetare pentru intensitate). Formula descrie generozitatea deșirată, fără calcul, care nu se oprește la un minimum necesar.",
        },
      ],
      crossRefs: ["Proverbe 19:17", "2 Corinteni 9:6-7", "1 Ioan 3:17"],
      forYourHeart:
        "Nu calcula înainte de a dărui cât vei pierde; deschide larg mâna ta și lasă lui Dumnezeu grija recompensei.",
    },
    {
      id: "deuteronom-15-12-18",
      ref: "Deuteronom 15:12-18",
      heading: "Eliberarea robului, încărcat cu daruri",
      text: deuteronomPassage(15, 12, 18),
      teaching: teaching(
        "Robul evreu, bărbat sau femeie, trebuie eliberat în anul al șaptelea de robie, și nu cu mâna goală: „să-i dai daruri din turma ta, din aria ta și din teascul tău”. Legea previne aici sclavia permanentă și o eliberare care ar lăsa persoana fără resurse pentru un nou start.",
        "Motivul dării generoase este chiar amintirea robiei lui Israel: „amintește-ți că și tu ai fost rob în țara Egiptului și DOMNUL, Dumnezeul tău, te-a izbăvit”. Fiecare eliberare este chemată să imite eliberarea originală pe care Israel a primit-o gratuit.",
      ),
      words: [
        {
          original: "האניק תעניק לו",
          transliteration: "ha'aniq ta'anik lo",
          language: "ebraica",
          meaning:
            "să-i pui daruri din belșug (repetare pentru intensitate). Metafora pentru încărcarea cu daruri a celui eliberat, ca să aibă un start economic real.",
        },
      ],
      crossRefs: ["Exod 21:1-6", "Leviticul 25:39-41", "Deuteronom 5:15"],
      forYourHeart:
        "Eliberarea unui om nu se termină cu semnul liberării; ea trebuie însoțită de resurse reale pentru un nou început.",
    },
    {
      id: "deuteronom-15-19-23",
      ref: "Deuteronom 15:19-23",
      heading: "Primul-născut, consacrat DOMNULUI",
      text: deuteronomPassage(15, 19, 23),
      teaching: teaching(
        "Fiecare mascul întâi-născut din vite și oi trebuie consacrat DOMNULUI și mâncat în fiecare an în fața Lui, la locul ales, în familie. Aceasta repetă principiul deja stabilit în Exod 13, extins aici în contextul zeciuielilor și darurilor din capitolele precedente.",
        "O excepție practică este menționată: animalul cu vreun cusur, șchiop sau orb, nu poate fi jertfit DOMNULUI, ci este mâncat acasă, ca hrană obișnuită, cu excepția sângelui care trebuie tot vărsat pe pământ.",
      ),
      words: [
        {
          original: "תקדיש ליהוה",
          transliteration: "taqdish la-YHWH",
          language: "ebraica",
          meaning:
            "să-l consacri/sfințești DOMNULUI. Consacrarea primului-născut din turme reflectă tema mai largă a întâietății date lui Dumnezeu în tot ce primește poporul.",
        },
      ],
      crossRefs: ["Exod 13:11-13", "Numeri 18:15-17", "Deuteronom 12:15-19"],
      forYourHeart:
        "Recunoaște lui Dumnezeu întâietățile vieții tale, nu doar rămășițele pe care nu le mai vrei.",
    },
  ],
  prayer:
    "Doamne, Tu ne-ai eliberat gratuit din robie; învață-ne să eliberăm la fel de generos pe cei datori nouă.\n\nDă-ne o mână deschisă către cel sărac, fără calcul egoist.\n\nÎnvață-ne să încărcăm cu daruri pe cei pe care îi eliberăm, ca să aibă un nou început real.\n\nȘi primește întâietățile vieții noastre, consacrate Ție. Amin.",
  status: DEUTERONOM_STATUSES[15],
})
