import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_19 = deuteronomChapter({
  number: 19,
  title: "Deuteronom 19 — Cetăți de scăpare, hotare netulburate, și martori de încredere",
  summary:
    "Moise instituie cetățile de scăpare pentru ucigașul fără intenție, interzice deplasarea hotarelor aproapelui, și cere doi sau trei martori pentru orice acuzație, cu pedepsirea directă a martorului mincinos după principiul talionului.",
  literaryContext:
    "Acest capitol continuă seria de legi de justiție începută în capitolul 17, aplicând principiul cercetării temeinice la cazurile de omor și la protecția proprietății și integrității proceselor judiciare.",
  historicalContext:
    "Fără cetăți de scăpare, rudele victimei ar fi urmărit orice ucigaș, intenționat sau nu, într-un ciclu de răzbunare sângeroasă. Cetățile de scăpare ofereau un loc de judecată dreaptă înainte de orice pedeapsă.",
  units: [
    {
      id: "deuteronom-19-1-10",
      ref: "Deuteronom 19:1-10",
      heading: "Cetățile de scăpare pentru ucigașul fără intenție",
      text: deuteronomPassage(19, 1, 10),
      teaching: teaching(
        "Trei cetăți, cu drumuri pregătite și accesibile, trebuie puse deoparte pentru ca „orice ucigaș să poată fugi acolo” — dar exclusiv cel care a omorât „fără intenție și fără să-l fi urât mai înainte”. Exemplul dat este direct: fierul securii sare din coadă și ucide fără voia celui care lucra la pădure.",
        "Dacă DOMNUL va lărgi hotarele lui Israel, poporul trebuie să adauge încă trei cetăți, „ca să nu fie vărsat sânge nevinovat”. Sistemul de justiție trebuie să crească odată cu teritoriul, nu să rămână în urmă.",
      ),
      words: [
        {
          original: "בבלי דעת",
          transliteration: "bivli-da'at",
          language: "ebraica",
          meaning:
            "fără să știe, neintenționat. Criteriul juridic central care distinge ucigașul protejat de cetatea de scăpare de cel vinovat de omor cu intenție.",
        },
      ],
      crossRefs: ["Numeri 35:9-15", "Iosua 20:1-6", "Exod 21:13"],
      forYourHeart:
        "Dumnezeu face distincție între greșeala neintenționată și răul premeditat; nu toate căderile tale merită aceeași judecată.",
    },
    {
      id: "deuteronom-19-11-14",
      ref: "Deuteronom 19:11-14",
      heading: "Fără refugiu pentru ucigașul cu intenție, și hotare netulburate",
      text: deuteronomPassage(19, 11, 14),
      teaching: teaching(
        "Ucigașul care „îl urăște pe aproapele său, îl pândește” și îl ucide cu premeditare nu găsește protecție în cetatea de scăpare: bătrânii cetății sale trebuie să-l predea „răzbunătorului sângelui, ca să fie pus la moarte”. „Ochiul tău să n-aibă milă de el” — mila greșit direcționată ar corupe dreptatea.",
        "Legea trece apoi la o poruncă mai calmă: „să nu muti hotarul aproapelui tău”. Deplasarea semnelor de proprietate, pusă „de cei de demult”, este o formă de furt subtil, la fel de grav ca uciderea în sistemul de dreptate al lui Israel.",
      ),
      words: [
        {
          original: "לא תסיג גבול רעך",
          transliteration: "lo tasig gvul re'ekha",
          language: "ebraica",
          meaning:
            "să nu muți hotarul aproapelui tău. Interdicție care protejează proprietatea familială stabilită de generațiile anterioare, esențială pentru stabilitatea socială a lui Israel.",
        },
      ],
      crossRefs: ["Deuteronom 27:17", "Proverbe 22:28", "Proverbe 23:10-11"],
      forYourHeart:
        "Dreptatea adevărată nu se lasă înmuiată de milă greșit direcționată, dar respectă cu grijă ce este stabilit legitim de generațiile trecute.",
    },
    {
      id: "deuteronom-19-15-21",
      ref: "Deuteronom 19:15-21",
      heading: "Doi sau trei martori, și pedeapsa martorului mincinos",
      text: deuteronomPassage(19, 15, 21),
      teaching: teaching(
        "Legea repetă principiul deja cunoscut: „un singur martor nu va fi de ajuns împotriva unui om”. Orice acuzație trebuie confirmată de doi sau trei martori, cercetați cu de-amănuntul de judecători înaintea DOMNULUI.",
        "Martorul găsit mincinos primește exact pedeapsa pe care voia să o aducă asupra fratelui său — principiul talionului aplicat justiției false: „viață pentru viață, ochi pentru ochi, dinte pentru dinte”. Această lege limitează proporțional răspunderea judiciară, nu autorizează răzbunarea privată.",
      ),
      words: [
        {
          original: "עין בעין",
          transliteration: "ayin be'ayin",
          language: "ebraica",
          meaning:
            "ochi pentru ochi. Formula legii talionului, aplicată aici explicit martorului mincinos — pedeapsa să fie proporțională cu răul intenționat, nu mai mare.",
        },
      ],
      crossRefs: ["Deuteronom 17:6", "Matei 18:16", "Matei 5:38-39"],
      forYourHeart:
        "Mărturia mincinoasă nu este o vină mică; ea merită exact consecința pe care intenționa să o aducă asupra altuia.",
    },
  ],
  prayer:
    "Doamne, Tu faci distincție între greșeala fără voie și răul premeditat; învață-ne să judecăm cu aceeași înțelepciune.\n\nDă-ne respect pentru hotarele stabilite drept de alții, și fereastă-ne de a lua ce nu este al nostru.\n\nÎnvață-ne să nu acuzăm ușor, ci să cercetăm temeinic înainte de a vorbi împotriva altuia.\n\nȘi dă-ne integritate deplină în mărturia noastră, ca să nu aducem asupra altora ce n-am vrea pentru noi. Amin.",
  status: DEUTERONOM_STATUSES[19],
})
