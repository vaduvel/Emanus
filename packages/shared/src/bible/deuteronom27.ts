import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_27 = deuteronomChapter({
  number: 27,
  title: "Deuteronom 27 — Legea scrisă pe piatră, blestemele rostite cu glas tare",
  summary:
    "Moise poruncește ridicarea unor pietre tencuite cu Legea scrisă deslușit, zidirea unui altar pe muntele Ebal, împărțirea semințiilor între Garizim și Ebal, și proclamarea a doisprezece blesteme asupra păcatelor ascunse, confirmate public de întregul popor prin „Amin”.",
  literaryContext:
    "Acest capitol deschide secțiunea finală a legământului (27-30), trecând de la legile practice la ceremonia publică de confirmare a legământului la intrarea în țara promisă, pregătind seria mai lungă de binecuvântări și blesteme din capitolul 28.",
  historicalContext:
    "Muntele Ebal și muntele Garizim străjuiesc valea Sihemului, locul unde Avraam a primit prima făgăduință în Canaan; ceremonia de la intrarea în țară lega astfel simbolic legământul lui Moise cu legământul patriarhal.",
  units: [
    {
      id: "deuteronom-27-1-8",
      ref: "Deuteronom 27:1-8",
      heading: "Legea scrisă deslușit pe pietre, altarul din pietre necioplite",
      text: deuteronomPassage(27, 1, 8),
      teaching: teaching(
        "La intrarea în țară, Israel trebuie să ridice pietre mari tencuite cu var și să scrie pe ele toate cuvintele Legii „foarte deslușit” — legământul nu rămâne o tradiție orală vagă, ci devine text public, vizibil pentru toți.",
        "Altarul de pe muntele Ebal trebuie construit din pietre necioplite, „peste care să nu fi ridicat fierul” — un altar simplu, nelucrat de om, arată că jertfa și bucuria înaintea DOMNULUI nu depind de măiestrie umană sofisticată.",
      ),
      words: [
        {
          original: "באר היטב",
          transliteration: "be'er heitev",
          language: "ebraica",
          meaning:
            "foarte deslușit/clar. Cerința explicită ca legea scrisă să fie lizibilă și clară pentru întregul popor, nu ascunsă sau accesibilă doar unei elite.",
        },
      ],
      crossRefs: ["Iosua 8:30-32", "Exod 20:25", "2 Regi 22:8-11"],
      forYourHeart:
        "Adevărul lui Dumnezeu este menit să fie clar și accesibil pentru toți, nu ascuns în tradiție vagă sau limbaj obscur.",
    },
    {
      id: "deuteronom-27-9-10",
      ref: "Deuteronom 27:9-10",
      heading: "Astăzi ai ajuns poporul DOMNULUI",
      text: deuteronomPassage(27, 9, 10),
      teaching: teaching(
        "Moise și preoții leviți declară solemn întregului Israel: „Taci și ascultă, Israele! Astăzi ai ajuns poporul DOMNULUI, Dumnezeului tău”. Acest moment de tranziție — la marginea intrării în țară — este marcat ca o naștere de identitate colectivă.",
        "Cerința imediată urmează identitatea: „să asculți de glasul DOMNULUI... și să împlinească poruncile”. Identitatea de popor al DOMNULUI nu este separată de ascultare; ele sunt legate indisolubil.",
      ),
      words: [
        {
          original: "הסכת ושמע ישראל",
          transliteration: "haskket ushma Yisra'el",
          language: "ebraica",
          meaning:
            "taci și ascultă, Israel. Chemare solemnă la atenție deplină înainte de o declarație de identitate națională cu implicații permanente.",
        },
      ],
      crossRefs: ["Exod 19:5-6", "Deuteronom 26:18", "1 Petru 2:9-10"],
      forYourHeart:
        "Identitatea ta ca popor al lui Dumnezeu vine mereu legată de chemarea la ascultare activă, nu doar de un statut pasiv.",
    },
    {
      id: "deuteronom-27-11-13",
      ref: "Deuteronom 27:11-13",
      heading: "Semințiile împărțite între binecuvântare și blestem",
      text: deuteronomPassage(27, 11, 13),
      teaching: teaching(
        "Semințiile sunt împărțite pe cele două munți care străjuiesc valea: Simeon, Levi, Iuda, Isahar, Iosif și Beniamin pe Garizim pentru binecuvântare, iar Ruben, Gad, Așer, Zabulon, Dan și Neftali pe Ebal pentru blestem — o împreună dramatică vizuală a alegerii care stă înaintea lui Israel.",
        "Această geografie simbolică face din legământ nu doar un text de citit, ci o experiență fizică trăită împreună — națiunea întreagă, împărțită pe cele două versante, aude și vede consecințele alegerii morale puse înainte.",
      ),
      words: [
        {
          original: "הר גריזים והר עיבל",
          transliteration: "har Gerizim vehar Eival",
          language: "ebraica",
          meaning:
            "muntele Garizim și muntele Ebal. Cei doi munți din valea Sihemului, unul rodnic și verde, celălalt sterp și gol — contrastul geografic reflectă vizual contrastul dintre binecuvântare și blestem.",
        },
      ],
      crossRefs: ["Iosua 8:33-35", "Geneza 12:6-7", "Ioan 4:20"],
      forYourHeart:
        "Alegerea dintre binecuvântare și blestem nu este abstractă; consecințele ei se văd și se trăiesc concret.",
    },
    {
      id: "deuteronom-27-14-26",
      ref: "Deuteronom 27:14-26",
      heading: "Cele doisprezece blesteme, confirmate public prin „Amin”",
      text: deuteronomPassage(27, 14, 26),
      teaching: teaching(
        "Leviții rostesc cu glas tare doisprezece blesteme, majoritatea vizate păcatele ascunse — chipul cioplit pus într-un loc ascuns, mutatul hotarului, rătăcirea orbului, culcatul în taină cu diverse rude, lovirea aproapelui în ascuns, mituirea pentru a ucide un nevinovat — fapte pe care nimeni altul nu le-ar putea vedea sau pedepsi legal.",
        "La fiecare blestem, „tot poporul să răspundă și să zică: Amin!” — o confirmare publică repetată de doisprezece ori, care arată că fiecare israelit se angajează personal că aceste păcate secrete, invizibile ochiului uman, rămân vizibile pentru DOMNUL și supuse judecății Lui.",
      ),
      words: [
        {
          original: "ארור האיש אשר יעשה פסל ומסכה ... ושם בסתר",
          transliteration: "arur ha'ish asher ya'aseh fesel umasekhah... vesam basater",
          language: "ebraica",
          meaning:
            "blestemat să fie omul care va face un chip cioplit... și-l va pune într-un loc ascuns. Primul și cel mai lung dintre blesteme, subliniind că idolatria în taină nu scapă de privirea DOMNULUI, chiar dacă scapă de cea a semenilor.",
        },
      ],
      crossRefs: ["Numeri 5:22", "1 Corinteni 14:16", "Galateni 3:10"],
      forYourHeart:
        "Păcatele pe care le faci în taină, crezând că nimeni nu vede, rămân complet vizibile înaintea lui Dumnezeu.",
    },
  ],
  prayer:
    "Doamne, învață-ne să prețuim Cuvântul Tău ca fiind clar și accesibil, nu ascuns sau complicat fără rost.\n\nAjută-ne să trăim identitatea de popor al Tău legată de ascultare reală, nu doar de un titlu.\n\nDă-ne discernământ în fața alegerii dintre binecuvântare și blestem, și curaj să alegem bine.\n\nȘi amintește-ne mereu că nimic din ce facem în taină nu îți este ascuns Tie. Amin.",
  status: DEUTERONOM_STATUSES[27],
})
