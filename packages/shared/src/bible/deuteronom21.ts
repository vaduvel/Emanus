import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_21 = deuteronomChapter({
  number: 21,
  title: "Deuteronom 21 — Sânge nevinovat, familie, și fiul răzvrătit",
  summary:
    "Moise dă ritualul de curățire pentru o crimă nerezolvată, regulile pentru femeia captivă luată de nevastă, protecția dreptului de întâi-născut față de favoritismul părintesc, procedura pentru fiul îndărătnic și răzvrătit, și porunca de a nu lăsa peste noapte trupul celui executat.",
  literaryContext:
    "Acest capitol trece de la legile de război din capitolul 20 la o serie de legi despre familie și responsabilitate comunitară, arătând că dreptatea lui Israel se extinde de la câmpul de luptă la cele mai intime relații domestice.",
  historicalContext:
    "O crimă nerezolvată lăsa o comunitate întreagă sub o vinovăție colectivă nedefinită. Ritualul junincii oferea o cale de curățire formală înaintea DOMNULUI, chiar și atunci când vinovatul individual nu putea fi identificat.",
  units: [
    {
      id: "deuteronom-21-1-9",
      ref: "Deuteronom 21:1-9",
      heading: "Ritualul junincii pentru sângele nevinovat",
      text: deuteronomPassage(21, 1, 9),
      teaching: teaching(
        "Când un om omorât este găsit fără să se cunoască vinovatul, bătrânii cetății celei mai apropiate iau o juncă netrasă la jug, îi frâng gâtul într-o vale, și se spală pe mâini declarând: „mâinile noastre n-au vărsat sângele acesta”. Ritualul nu identifică vinovatul, ci curăță comunitatea de vinovăția colectivă nerezolvată.",
        "Preoții leviți intervin cu rugăciunea de iertare: „Iartă, DOAMNE, pe poporul Tău Israel... și nu încărca pe poporul Tău Israel cu sânge nevinovat!”. Comunitatea întreagă este responsabilă să nu tolereze sângele nevinovat nerăzbunat în mijlocul ei.",
      ),
      words: [
        {
          original: "ידינו לא שפכה את הדם הזה",
          transliteration: "yadeinu lo shafkhu et hadam hazeh",
          language: "ebraica",
          meaning:
            "mâinile noastre n-au vărsat sângele acesta. Declarația rituală de nevinovăție colectivă, care permite comunității să continue fără vinovăția nerezolvată a unei crime anonime.",
        },
      ],
      crossRefs: ["Geneza 4:10-11", "Numeri 35:33-34", "Matei 27:24"],
      forYourHeart:
        "Comunitatea ta este responsabilă pentru dreptatea din mijlocul ei, chiar și atunci când vinovatul individual rămâne necunoscut.",
    },
    {
      id: "deuteronom-21-10-14",
      ref: "Deuteronom 21:10-14",
      heading: "Femeia captivă, protejată de la exploatare",
      text: deuteronomPassage(21, 10, 14),
      teaching: teaching(
        "Femeia captivă de război luată ca nevastă trebuie să primească o lună de doliu pentru familia ei — cap ras, unghii tăiate, haine schimbate — înainte ca soțul să intre la ea. Această perioadă transformă o captură bruscă într-un proces cu demnitate minimă recunoscută.",
        "Dacă soțul nu o mai vrea, „nu vei putea s-o vinzi pe argint, nici s-o folosești ca roabă, pentru că ai smerit-o”. Legea limitează sever puterea absolută a cuceritorului asupra femeii captive, într-un context istoric unde ea nu avea, de regulă, nicio protecție.",
      ),
      words: [
        {
          original: "ועניתה",
          transliteration: "ve'initah",
          language: "ebraica",
          meaning:
            "ai smerit-o/ai umilit-o. Termenul folosit pentru actul căsătoriei cu femeia captivă, care creează pentru bărbat o obligație morală permanentă, nu doar un drept temporar.",
        },
      ],
      crossRefs: ["Numeri 31:9-18", "1 Corinteni 7:33-34"],
      forYourHeart:
        "Puterea pe care o ai asupra altcuiva vulnerabil creează responsabilitate, nu drept nelimitat de folosire.",
    },
    {
      id: "deuteronom-21-15-17",
      ref: "Deuteronom 21:15-17",
      heading: "Dreptul întâiului-născut, păzit de favoritism",
      text: deuteronomPassage(21, 15, 17),
      teaching: teaching(
        "Dacă un om are două neveste, una iubită și alta neiubită, și fiul întâi-născut este al celei neiubite, tatăl „nu va putea da dreptul de întâi-născut fiului celei iubite” doar din preferință personală. Dreptul obiectiv al întâiului-născut — parte dublă din avere — nu poate fi manipulat de favoritism emoțional.",
        "Această lege pare scrisă cu ecoul direct al propriei familii a lui Iacov în minte, unde favoritismul față de Iosif a creat gelozie și dezbinare fatală. Moise instituie o protecție obiectivă exact împotriva acelui tip de nedreptate familială.",
      ),
      words: [
        {
          original: "ראשית אנו",
          transliteration: "reshit ono",
          language: "ebraica",
          meaning:
            "pârga puterii lui. Expresia care justifică dreptul întâiului-născut — el este primul rod al vigorii tatălui, indiferent de sentimentele acestuia față de mama sa.",
        },
      ],
      crossRefs: ["Geneza 29:31-35", "Geneza 49:3-4", "1 Cronici 5:1-2"],
      forYourHeart:
        "Dreptatea obiectivă nu trebuie să cedeze în fața preferințelor personale, mai ales în deciziile care afectează pe alții.",
    },
    {
      id: "deuteronom-21-18-21",
      ref: "Deuteronom 21:18-21",
      heading: "Fiul îndărătnic și răzvrătit",
      text: deuteronomPassage(21, 18, 21),
      teaching: teaching(
        "Procedura pentru fiul care nu ascultă de părinți, „desfrânat și bețiv”, cere ca părinții împreună — nu unul singur — să-l aducă la bătrânii cetății. Autoritatea de a acuza nu este dată unui părinte izolat, ci necesită acordul amândurora.",
        "Severitatea sentinței — moartea prin lapidare — arată cât de grav era considerat pericolul unui fiu complet neascultător pentru stabilitatea socială și familială a lui Israel. Legea nu se aplica unei singure greșeli, ci unui pattern statornic de răzvrătire, deja pedepsit fără rezultat.",
      ),
      words: [
        {
          original: "סורר ומורה",
          transliteration: "sorer u-moreh",
          language: "ebraica",
          meaning:
            "îndărătnic și răzvrătit. Pereche de termeni care descrie o rebeliune statornică, nu o singură abatere, folosită și pentru a descrie rebeliunea lui Israel împotriva DOMNULUI.",
        },
      ],
      crossRefs: ["Proverbe 30:17", "Exod 21:15,17", "Psalmul 78:8"],
      forYourHeart:
        "Rebeliunea statornică, netratată, are consecințe grave; disciplina timpurie previne o cădere mult mai dureroasă.",
    },
    {
      id: "deuteronom-21-22-23",
      ref: "Deuteronom 21:22-23",
      heading: "Trupul celui spânzurat, îngropat în aceeași zi",
      text: deuteronomPassage(21, 22, 23),
      teaching: teaching(
        "Trupul celui executat și spânzurat pe lemn nu poate rămâne peste noapte: „să-l îngropi neapărat în aceeași zi”. Motivul dat este direct teologic: „cel spânzurat pe lemn este blestemat de Dumnezeu”, și un trup neîngropat ar spurca țara dată de DOMNUL ca moștenire.",
        "Acest verset este citat direct de apostolul Pavel în Galateni 3:13 pentru a explica moartea lui Hristos pe cruce: „Hristos ne-a răscumpărat din blestemul Legii, făcându-Se blestem pentru noi”. Formula veterotestamentară găsește aici o rezonanță canonică profundă.",
      ),
      words: [
        {
          original: "קללת אלהים תלוי",
          transliteration: "qilelat Elohim talui",
          language: "ebraica",
          meaning:
            "cel spânzurat este blestemul lui Dumnezeu. Formulă păstrată exact în textul ebraic, cu rezonanță canonică directă în interpretarea neotestamentară a crucii lui Hristos.",
        },
      ],
      crossRefs: ["Galateni 3:13", "Iosua 8:29", "Ioan 19:31"],
      forYourHeart:
        "Chiar și în judecata cea mai severă, legea lui Dumnezeu păzește demnitatea minimă a trupului; nimic din creația Lui nu este tratat cu indiferență totală.",
    },
  ],
  prayer:
    "Doamne, învață-ne să nu tolerăm nedreptatea nerezolvată din mijlocul nostru.\n\nDă-ne inimă dreaptă față de cei vulnerabili aflați sub puterea noastră.\n\nPăzește-ne de favoritism în deciziile care afectează pe alții, și dă-ne răbdare cu cei răzvrătiți, dar și curaj să-i disciplinăm la timp.\n\nÎți mulțumim că Hristos a purtat blestemul nostru pe lemn, ca noi să fim binecuvântați în El. Amin.",
  status: DEUTERONOM_STATUSES[21],
})
