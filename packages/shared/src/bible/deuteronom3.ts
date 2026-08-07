import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_3 = deuteronomChapter({
  number: 3,
  title: "Deuteronom 3 — Og cel uriaș, țara împărțită, și o rugăciune neascultată",
  summary:
    "Israel biruiește pe Og, împăratul Basanului, ultimul dintre uriașii refaimiți. Ȝara cucerită la răsărit de Iordan este împărțită semințiilor lui Ruben, Gad și jumătății seminției lui Manase. Moise îl încurajează pe Iosua pentru drumul care vine și îoi amintește că, după ce a cerut să vadă țara bună, DOMNUL i-a refuzat cererea, îngăduindu-i doar să o privească de pe munte.",
  literaryContext:
    "Capitolul acesta încheie recapitularea cuceririlor de la răsărit de Iordan, începută în capitolul 2. Vine apoi o schimbare de ton: de la istoria cuceririi la o mărturisire personală a lui Moise, singurul loc din carte în care el vorbește direct despre propria lui durere și dorință neascultată.",
  historicalContext:
    "Basanul, Înutul lui Og, era cunoscut pentru cetăți întărite, cu porți de aramă, și pentru statura uriașă a locuitorilor lui. Patul de fier al lui Og, păstrat la Raba amoniților, era o dovadă vizibilă pentru generațiile viitoare că nu era o legendă, ci un fapt istoric verificabil.",
  units: [
    {
      id: "deuteronom-3-1-11",
      ref: "Deuteronom 3:1-11",
      heading: "Og, ultimul dintre uriașii refaimiți",
      text: deuteronomPassage(3, 1, 11),
      teaching: teaching(
        "Og vine înaintea lui Israel „cu tot poporul lui, ca să ne bată la Edrei” — dar DOMNUL zice lui Moise ceea ce spusese și despre Sihon: „Nu te teme de el, căci ți l-am dat în mână”. Frică nu era o reacție fără temei înainte un împărat uriaș, dar cuvântul DOMNULUI o înlătură dinainte de luptă.",
        "Textul însemnează cu grijă statura fizică a acestui vrăjmaș: patul lui de fier, de nouă coți lungime, era păstrat până în vremea scrierii cărții la Raba amoniților, ca mărturie materială pentru cine s-ar îndoi de mărimea biruinței.",
        "Nimicirea este totală, „n-am lăsat pe nimeni cu viață”, iar șaizeci de cetăți întărite trec sub stăpânirea lui Israel. Această biruință asupra ultimului dintre refaimiți încheie amenințarea unor neamuri legendare, pomenite deja din Geneza 14:5.",
      ),
      words: [
        {
          original: "רפאים",
          transliteration: "Refaim",
          language: "ebraica",
          meaning:
            "refaimiți, neam vechi de statură uriașă din care făcea parte Og; termenul apare rar și este legat de amintiri străvechi din Canaan.",
        },
      ],
      crossRefs: ["Geneza 14:5", "Numeri 21:33-35", "Iosua 12:4-5"],
      forYourHeart:
        "Cât de mare este vrăjmașul tău nu hotărăște lupta; hotărăște cuvântul lui Dumnezeu care spune „ei sunt dați în mâna ta”.",
    },
    {
      id: "deuteronom-3-12-17",
      ref: "Deuteronom 3:12-17",
      heading: "Ȝara împărțită înainte de a fi cucerită pe deplin",
      text: deuteronomPassage(3, 12, 17),
      teaching: teaching(
        "Pământul cucerit de la Arnon la Hermon este împărțit deja: rubeniților și gadiților, partea de sud; jumătății seminției lui Manase, Basanul, numit și „țara refaimiților”. Israel împarte țara ca pe o moștenire sigură, chiar înainte să fi trecut mărunțit și restul Iordanului.",
        "Marea Iordanului este numită aici „Marea Câmpiei”, și munții Hermon primesc numele lor localnic dublu — Sirion pentru sidoniți, Senir pentru amoriți. Textul întțelege că aceeași geografie era numită diferit de neamuri diferite, fără să încurce cititorii.",
      ),
      words: [
        {
          original: "ים הערבה",
          transliteration: "Yam ha-Arava",
          language: "ebraica",
          meaning:
            "Marea Câmpiei, alt nume pentru Marea Moartă. Geografia Deuteronomului folosește numiri locale, unele diferite de cele din alte cărți.",
        },
      ],
      crossRefs: ["Numeri 32:33-42", "Iosua 13:8-13"],
      forYourHeart:
        "Dumnezeu împartășește uneori moștenirea înainte ca ea să fie deplin cucerită În fapt. Făgăduința precede stăpânirea deplină.",
    },
    {
      id: "deuteronom-3-18-22",
      ref: "Deuteronom 3:18-22",
      heading: "Frații care luptă pentru frații lor",
      text: deuteronomPassage(3, 18, 22),
      teaching: teaching(
        "Deși au primit deja țara lor la răsărit de Iordan, rubeniții, gadiții și cei din Manase primesc porunca să treacă „Înarmați” Înaintea celorlalți frați ai lor, până când și aceștia îiși vor primi odihna și moștenirea. Binecuvântarea primită nu-i scutește de răspunderea față de frații care nu au primit-o încă.",
        "Lui Iosua i se spune, În fața întregii lucrări care Îrmează: „Ochii tăi au văzut tot ce a făcut DOMNUL, Dumnezeul vostru, acestor doi Împarați; DOMNUL va face la fel tuturor Împarățiilor pe unde vei trece”. Biruințele trecute nu sunt doar istorie; sunt temei pentru Încredere În ce urmează.",
      ),
      words: [
        {
          original: "חלוצים",
          transliteration: "chalutzim",
          language: "ebraica",
          meaning:
            "Înarmați, Înșirăți de război, cei care merg În fruntea oștirii; termenul descrie frații chemați să lupte pentru alții Înainte de a se așeza În odihnă.",
        },
      ],
      crossRefs: ["Numeri 32:16-32", "Iosua 1:12-15", "Iosua 22:1-4"],
      forYourHeart:
        "O binecuvântare primită mai Întâi nu te scutește de răspunderea față de frații care și-o așteaptă pe a lor.",
    },
    {
      id: "deuteronom-3-23-29",
      ref: "Deuteronom 3:23-29",
      heading: "O rugăciune ascultată pe jumătate",
      text: deuteronomPassage(3, 23, 29),
      teaching: teaching(
        "Moise Îi destinuie poporului chiar propria lui rugăciune: „Lasă-mă să trec și să văd țara cea bună de dincolo de Iordan”. Cel care a purtat poporul patruzeci de ani cere pentru sine un singur lucru — să vadă ÎmplÎnirea a ceea ce a așteptat toată viața.",
        "Răspunsul DOMNULUI este limpede și fără loc de Îndoială: „Nu te ruga de mine În această privință”. Nici Moise, cel mai mare proroc al Vechiului Legământ, nu primește tot ce cere; cuvântul jurat la Meriba (Numeri 20:12) rămâne În picioare, oricât de mare ar fi cel care se roagă.",
        "DOMNUL Însă nu Îl lasă pe Moise fără nimic: „Suie-te pe vÎrful Pisga și privește cu ochii tăi”. Vedeea de la distanță nu este ÎmplÎnirea deplină, dar este o Îndurare reală — și este și clipa În care Iosua primește public porunca de a duce lucrarea la bun sfârșit: „Încurajează-l, Întărește-l, căci el va trece Înaintea acestui popor”.",
      ),
      words: [
        {
          original: "אל-תוסף דבר אלי",
          transliteration: "al-tosef daber elai",
          language: "ebraica",
          meaning:
            "nu mai continua să vorbești către Mine În privința aceasta. Răspunsul definitiv al DOMNULUI, care Încheie o cerere repetată, dar nu întoarce iubirea Lui față de Moise.",
        },
      ],
      crossRefs: ["Numeri 20:7-12", "Deuteronom 34:1-4", "Deuteronom 31:7-8"],
      forYourHeart:
        "Un „nu” de la Dumnezeu la o rugăciune sinceră nu înseamnă că te-a părăsit; poate însemna doar că ți-a pregătit o altă măsură de îndurare, și o lucrare pentru altcineva.",
    },
  ],
  prayer:
    "Doamne, Tu înlături frica noastră înainte de a intra În luptă, oricât de mare ar fi vrăjmașul.\n\nÎnvață-ne să luptăm pentru frații noștri, chiar după ce am primit deja binecuvântarea noastră.\n\nȘi când răspunzi „nu” la o rugăciune a noastră, dă-ne încredere că pregătești totuși o îndurare și o lucrare pentru altcineva. Amin.",
  status: DEUTERONOM_STATUSES[3],
})
