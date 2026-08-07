import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_25 = deuteronomChapter({
  number: 25,
  title: "Deuteronom 25 — Măsură dreaptă, datorie de familie, memorie împotriva răului",
  summary:
    "Moise limitează pedeapsa corporală, cere grijă pentru animalul care muncește, reglementează datoria de cumnat pentru păstrarea numelui, pedepsește intervenția indecentă într-o încleștare, cere greutăți și măsuri exacte, și cere memoria răului făcut de Amalec.",
  literaryContext:
    "Acest capitol încheie seria legilor practice de ordine socială înainte de trecerea către riturile de aducere a primelor roade din capitolul 26, unind dreptatea judiciară, grija pentru continuitatea familiei și onestitatea comercială într-un singur fir de integritate.",
  historicalContext:
    "Datoria de cumnat (leviratul) asigura continuarea numelui și moștenirea de pământ a bărbatului mort fără fii, o preocupare centrală într-o societate unde identitatea familială și moștenirea teritorială erau strict legate. Amintirea lui Amalec este o poruncă istorică specifică, nu un șablon etnic general.",
  units: [
    {
      id: "deuteronom-25-1-3",
      ref: "Deuteronom 25:1-3",
      heading: "Pedeapsa corporală, limitată la patruzeci de lovituri",
      text: deuteronomPassage(25, 1, 3),
      teaching: teaching(
        "Judecata dreaptă achită pe cel drept și condamnă pe cel vinovat, dar chiar și pedeapsa corporală aplicată celui vinovat are o limită clară: nu mai mult de patruzeci de lovituri, „ca nu cumva... fratele tău să fie înjosit sub ochii tăi”.",
        "Termenul folosit este semnificativ: „fratele tău”, nu simplu „vinovatul”. Chiar în executarea pedepsei legale, demnitatea umană a celui pedepsit rămâne o grijă explicită a legii, nu un detaliu de neglijat.",
      ),
      words: [
        {
          original: "ארבעים יכנו לא יוסיף",
          transliteration: "arba'im yakkenu lo yosif",
          language: "ebraica",
          meaning:
            "să-l bată patruzeci, să nu adauge. Limita explicită pusă pedepsei corporale, care protejează demnitatea celui pedepsit chiar în cadrul unei sancțiuni legitime.",
        },
      ],
      crossRefs: ["2 Corinteni 11:24", "Leviticul 19:15", "Proverbe 17:26"],
      forYourHeart:
        "Chiar și când cineva a greșit și merită consecințe, demnitatea lui de om rămâne o graniță pe care n-o poți trece.",
    },
    {
      id: "deuteronom-25-4",
      ref: "Deuteronom 25:4",
      heading: "Boul care treieră nu se înfometează",
      text: deuteronomPassage(25, 4, 4),
      teaching: teaching(
        "O poruncă scurtă, dar cu ecou canonic profund: „să nu legi gura boului când treieră”. Animalul care muncește trebuie lăsat să se hrănească din rodul muncii lui, fără să fie înfometat de lăcomia stăpânului.",
        "Apostolul Pavel folosește această poruncă pentru a argumenta dreptul lucrătorilor Evangheliei de a fi susținuți din munca lor — principiul compasiunii față de cel care muncește se extinde dincolo de sensul agricol literal.",
      ),
      words: [
        {
          original: "לא תחסם שור בדישו",
          transliteration: "lo tachsom shor bedisho",
          language: "ebraica",
          meaning:
            "să nu legi gura boului când treieră. Interdicția lipsirii forțată a celui care muncește de rodul propriei munci, aplicată aici la animal, dar cu implicații mai largi.",
        },
      ],
      crossRefs: ["1 Corinteni 9:9-10", "1 Timotei 5:18", "Proverbe 12:10"],
      forYourHeart:
        "Cel care muncește pentru tine — om sau animal — are dreptul să se bucure de o parte din rodul muncii lui.",
    },
    {
      id: "deuteronom-25-5-10",
      ref: "Deuteronom 25:5-10",
      heading: "Datoria de cumnat, pentru păstrarea numelui",
      text: deuteronomPassage(25, 5, 10),
      teaching: teaching(
        "Când un bărbat moare fără fii, cumnatul său are datoria să o ia pe văduvă de nevastă, „ca să împlinească față de ea datoria de cumnat” — primul fiu născut va purta numele fratelui mort, „ca numele lui să nu fie șters din Israel”.",
        "Dacă cumnatul refuză, procedura publică la poarta cetății — descălțarea, scuiparea în față, numele de rușine „Casa celui descălțat” — este o consecință socială pentru cel care refuză responsabilitatea față de familia extinsă, fără a-l forța legal s-o facă.",
      ),
      words: [
        {
          original: "יבמה",
          transliteration: "yibbem",
          language: "ebraica",
          meaning:
            "să facă datoria de cumnat/levirat. Rădăcina termenului tehnic pentru căsătoria cu văduva fratelui, menită să continue numele și moștenirea celui mort fără fii.",
        },
      ],
      crossRefs: ["Rut 4:1-10", "Geneza 38:8-10", "Matei 22:24-28"],
      forYourHeart:
        "Responsabilitatea față de familia extinsă — chiar când nu ești obligat legal — este o măsură a caracterului tău.",
    },
    {
      id: "deuteronom-25-11-12",
      ref: "Deuteronom 25:11-12",
      heading: "Intervenția indecentă, pedepsită sever",
      text: deuteronomPassage(25, 11, 12),
      teaching: teaching(
        "Când doi oameni se bat, intervenția unei femei care încearcă să-și scape bărbatul printr-un gest indecent este pedepsită sever — legea nu tolerează depășirea limitelor decenței nici în mijlocul unei situații tensionate de conflict.",
        "Această lege scurtă, dificilă pentru cititorul modern, arată că nici circumstanțele extreme — dorința de a apăra pe cel iubit — nu justifică orice metodă; demnitatea și decența au granițe care nu se anulează din motive aparent bune.",
      ),
      words: [
        {
          original: "והחזיקה במבשיו",
          transliteration: "vehezikah bemevushav",
          language: "ebraica",
          meaning:
            "și-l va apuca de părțile rușinoase. Expresie eufemistică pentru gestul indecent care declanșează pedeapsa severă din text.",
        },
      ],
      crossRefs: ["1 Corinteni 13:5", "Romani 12:17"],
      forYourHeart:
        "Scopul bun nu justifică orice mijloc; decența și demnitatea au limite care rămân valabile chiar în conflict.",
    },
    {
      id: "deuteronom-25-13-19",
      ref: "Deuteronom 25:13-19",
      heading: "Greutăți și măsuri exacte, memoria împotriva răului lui Amalec",
      text: deuteronomPassage(25, 13, 19),
      teaching: teaching(
        "Legea interzice două seturi de greutăți sau măsuri — una pentru când vinzi, alta pentru când cumperi — cerând o singură greutate exactă și dreaptă. „Oricine face aceste lucruri... este o urâciune înaintea DOMNULUI”, pentru că înșelăciunea comercială este furt mascat, nu doar viclenie de afaceri.",
        "Capitolul se încheie cu porunca de a-și aduce aminte de atacul laș al lui Amalec — lovirea celor slăbiți din urma coloanei, „fără nicio frică de Dumnezeu” — și de a șterge pomenirea acestui rău odată ce Israel va avea odihnă. Memoria răului nefăcut cu teamă de Dumnezeu este păstrată ca avertisment istoric, nu ca șablon pentru violență modernă.",
      ),
      words: [
        {
          original: "איפה שלמה וצדקה",
          transliteration: "eifah shlemah vetzedeq",
          language: "ebraica",
          meaning:
            "o efă exactă și dreaptă. Cererea de onestitate comercială exactă, fără manipulare în favoarea propriului câștig în detrimentul celuilalt.",
        },
      ],
      crossRefs: ["Proverbe 11:1", "Exod 17:8-16", "1 Samuel 15:2-3"],
      forYourHeart:
        "Onestitatea în lucrurile mici — cântărirea, măsurarea, tranzacțiile zilnice — este o măsură reală a integrității tale înaintea lui Dumnezeu.",
    },
  ],
  prayer:
    "Doamne, învață-ne să păstrăm demnitatea celuilalt chiar și când trebuie să aplicăm consecințe drepte.\n\nDă-ne grijă pentru cel care muncește și responsabilitate față de familia noastră extinsă.\n\nAjută-ne să respectăm limitele decenței, chiar în mijlocul conflictului, și să fim oneste în toate tranzacțiile noastre.\n\nȘi dă-ne înțelepciune să ținem minte răul din trecut fără să-l transformăm în scuză pentru răzbunare proprie. Amin.",
  status: DEUTERONOM_STATUSES[25],
})
