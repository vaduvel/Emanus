import { numeriChapter, teaching } from "./numeriHelpers.js"
import { numeriPassage } from "./numeriText.js"
import { NUMERI_STATUSES } from "./numeriPublication.js"

/*
 * Cartea Numeri, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în numeriText.ts (fișierele numeriTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const NUMERI_13 = numeriChapter({
  number: 13,
  title: "Numeri 13 — Doisprezece iscoade în țara Canaanului",
  summary:
    "Doisprezece fruntași, câte unul din fiecare seminție, sunt trimiși să iscodească țara făgăduită. Se întorc după patruzeci de zile cu roadele belșugului — dar și cu zece rapoarte de teamă și doar două glasuri de credință: al lui Caleb și, mai târziu, al lui Iosua.",
  literaryContext:
    "Capitolul urmează firesc după sosirea taberei în pustia Paran, menționată la finalul capitolului doisprezece. Este momentul de răscruce al întregii cărți: felul în care poporul va răspunde la rapoartele iscoadelor va determina patruzeci de ani de rătăcire în pustie, în locul unei intrări aproape imediate în țara făgăduită.",
  historicalContext:
    "Trimiterea iscoadelor pare să fi fost, după Deuteronom 1:22, o cerere venită din partea poporului, pe care DOMNUL a îngăduit-o. Cei doisprezece bărbați nu erau iscoade militare obișnuite, ci fruntași ai fiecărei seminții, alegeși tocmai pentru a avea autoritatea de a-și convinge tribul după întoarcere.",
  units: [
    {
      id: "numeri-13-1-3",
      ref: "Numeri 13:1-3",
      heading: "Porunca de a trimite câte un fruntaș din fiecare seminție",
      text: numeriPassage(13, 1, 3),
      teaching: teaching(
        "Porunca DOMNULUI este limpede: câte un bărbat din fiecare seminție, „fiecare fiind fruntaș printre ei”. Nu erau oameni oarecare, ci lideri recunoscuși, aleși tocmai pentru greutatea cuvântului lor înaintea tribului din care veneau.",
        "Deuteronom 1:22 arată că inițiativa venise de la popor, care ceruse iscoade înainte de a se sui în țară. DOMNUL îngăduie cererea, dar rezultatul va arăta cât de puțină nevoie era de fapt de o iscodire dinainte făgăduinței deja rostite.",
      ),
      words: [],
      crossRefs: ["Deuteronom 1:22-23", "Iosua 2:1"],
      forYourHeart:
        "Uneori Dumnezeu îngăduie o cerere a noastră pentru a ne arăta, prin roadele ei, cât de multă credință aveam sau nu în făgăduința deja primită.",
    },
    {
      id: "numeri-13-4-16",
      ref: "Numeri 13:4-16",
      heading: "Numele celor doisprezece — și noul nume al lui Iosua",
      text: numeriPassage(13, 4, 16),
      teaching: teaching(
        "Textul înregistrează cu grijă numele fiecărui fruntaș, seminție cu seminție. Printre ei apar două nume care vor deveni esențiale pentru restul cărții: „din seminția lui Iuda: Caleb, fiul lui Iefune” și „din seminția lui Efraim: Osea, fiul lui Nun”.",
        "Ultimul verset al unității cuprinde o schimbare mică, dar plină de sens: „lui Osea, fiul lui Nun, Moise i-a pus numele Iosua”. Numele Osea („izbăvire”) devine Iosua („DOMNUL izbăvește”) — o schimbare care leagă direct persoana lui de lucrarea pe care avea s-o împlinea mai târziu, conducând poporul în țara făgăduită.",
      ),
      words: [
        {
          original: "יְהוֹשׁוּעַע",
          transliteration: "Yehoshua",
          language: "ebraica",
          meaning:
            "Iosua, „DOMNUL este izbăvire”. Noul nume dat de Moise leagă numele lui Iosua direct de Numele DOMNULUI, spre deosebire de Osea, care însemna doar „izbăvire” fără această legătură explicită.",
        },
      ],
      crossRefs: ["Exod 17:9-14", "Numeri 27:18-23", "Fapte 7:45"],
      forYourHeart:
        "Un nume nou dat de Dumnezeu, sau prin slujitorul Său, poate marca începutul unei chemări mai mari decât ți-ai imaginat vreodată.",
    },
    {
      id: "numeri-13-17-20",
      ref: "Numeri 13:17-20",
      heading: "„Prindeți curaj” — instrucțiunile lui Moise",
      text: numeriPassage(13, 17, 20),
      teaching: teaching(
        "Instrucțiunile lui Moise sunt precise și cuprinzătoare: tăria sau slabiciunea popoarelor, numărul lor, calitatea țării, felul cetăților, rodnicia pământului. Nu era o excursie de plăcere, ci o evaluare strategică temeinică, cerută să acopere toate aspectele importante.",
        "Ultima poruncă este cea mai importantă, deși pare cel mai mic detaliu: „prindeți curaj și luați din roadele țării”. Moise știa că mai mult decât rapoartele exacte, avea nevoie de curajul celor trimiși. Din păcate, zece dintre cei doisprezece nu au adus înapoi acest curaj, oricât de multă informație ar fi strâns.",
      ),
      words: [],
      crossRefs: ["Iosua 1:6-9", "1 Corinteni 16:13"],
      forYourHeart:
        "Informația corectă nu este de ajuns; fără curajul credinței, chiar cele mai bune dovezi pot fi interpretate spre teamă, nu spre încredere.",
    },
    {
      id: "numeri-13-21-24",
      ref: "Numeri 13:21-24",
      heading: "Valea Eșcol: un singur ciorchine dus pe o prăjină",
      text: numeriPassage(13, 21, 24),
      teaching: teaching(
        "Iscoadele străbat toată țara, de la pustia Țin până la Rehob, aproape de Hamat, la marginea de nord. La Hebron întâlnesc pe uriașii Ahiman, Șeșai și Talmai, iar textul notează cu precizație istorică: „Hebronul fusese zidit cu șapte ani înainte de Țoanul Egiptului” — o cetate cu o vechime impresionantă.",
        "La valea Eșcol, doi bărbați trebuie să ducă un singur ciorchine de struguri pe o prăjină, atât de mare era. Împreună cu rodii și smochine, dovada belșugului țării era palpabilă, dusă fizic înapoi în tabără. Numele locului, Eșcol, rămâne legat pentru totdeauna de acest ciorchine.",
      ),
      words: [
        {
          original: "נַחַל אֶשְׁכּוֹל",
          transliteration: "nachal Eshkol",
          language: "ebraica",
          meaning:
            "valea ciorchinelui. Numele locului comemorează exact ce s-a întâmplat acolo, o dovadă vie și palpabilă a belșugului promis de DOMNUL.",
        },
      ],
      crossRefs: ["Deuteronom 8:7-9", "Ioan 15:8"],
      forYourHeart:
        "Dumnezeu îți oferă adesea dovezi palpabile ale belșugului Făgăduinței Lui; problema nu este lipsa dovezilor, ci felul în care le interpretăm.",
    },
    {
      id: "numeri-13-25-29",
      ref: "Numeri 13:25-29",
      heading: "Raportul: lapte și miere, dar popor puternic",
      text: numeriPassage(13, 25, 29),
      teaching: teaching(
        "După patruzeci de zile, iscoadele raportează înaintea întregii adunări la Cadeș: „cu adevărat este o țară în care curge lapte și miere, și iată roadele ei”. Până aici, raportul confirmă făgăduința DOMNULUI întocmai.",
        "Dar imediat urmează cuvântul care schimbă totul: „însă poporul care locuiește în țară este puternic, cetățile sunt fortificate și foarte mari; și am văzut acolo și pe fiii lui Anac”. Același grup de oameni relatează aceleași fapte, dar tonul se schimbă de la mărturie la avertisment.",
        "Descrierea geografică a locuitorilor țării — amaleciții în Negev, hetiții, iebusiții și amoriții la munte, canaaniții lângă mare și Iordan — este exactă și utilă, dar felul în care este prezentată pregătește deja terenul pentru descurajă și teamă.",
      ),
      words: [],
      crossRefs: ["Exod 3:8", "Deuteronom 1:24-28"],
      forYourHeart:
        "Același fapt poate fi spus în așa fel încât să zămislească credință sau teamă. Fii atent cum îți alegi cuvintele când împărtășești vești cu alții.",
    },
    {
      id: "numeri-13-30",
      ref: "Numeri 13:30",
      heading: "„Suntem cu totul în stare să o biruim”",
      text: numeriPassage(13, 30, 30),
      teaching: teaching(
        "În mijlocul fricii care începe să se răspândească, un singur glas se ridică în altă direcție: „Caleb a potolit poporul înaintea lui Moise și a zis: haideți să ne suim și să o luăm în stăpânire, căci suntem cu totul în stare să o biruim!” Aceeași informație despre uriași și cetăți fortificate, dar o concluzie total diferită.",
        "Curajul lui Caleb nu vine din ignorarea greutăților, ci din așezarea lor într-o perspectivă corectă: cetățile sunt într-adevăr fortificate, dar DOMNUL este mai mare decât orice fortificație. Acest glas singuratic îi va aduce lui Caleb, patruzeci și cinci de ani mai târziu, moștenirea la Hebron, chiar locul unde văzuse pentru prima dată uriașii.",
      ),
      words: [],
      crossRefs: ["Numeri 14:24", "Iosua 14:6-14"],
      forYourHeart:
        "Un singur glas de credință, chiar într-o mulțime de teamă, poate schimba destinul unei generații întregi — sau, cel puțin, poate schimba destinul celui care îndrăznește să-l rostească.",
    },
    {
      id: "numeri-13-31-33",
      ref: "Numeri 13:31-33",
      heading: "Zvonuri rele: „eram ca niște lăcuste”",
      text: numeriPassage(13, 31, 33),
      teaching: teaching(
        "Ceilalți zece iscoade resping direct glasul lui Caleb: „nu putem să ne suim împotriva poporului acestuia, căci este mai tare decât noi!” Dar nu se opresc aici; „au răspândit printre fiii lui Israel zvonuri rele”, exagerând dincolo de ce văzuseră cu adevărat.",
        "Afirmația că țara „își mănâncă locuitorii” contrazice chiar raportul lor anterior despre belșugul și rodnicia pământului — un semn clar de exagerare născută din frică, nu din observație corectă.",
        "Ultima propoziție rămâne cea mai revelatoare din tot capitolul: „în ochii noștri noi eram ca niște lăcuste, și tot așa eram și în ochii lor”. Iscoadele nu doar s-au văzut mici; au presupus, fără nicio dovadă, că exact așa își închipuiau și canaaniții că sunt. Teamă s-a hrănit din propria ei imaginație, nu din realitate.",
      ),
      words: [
        {
          original: "וַּנְהִי בְעֵינֵינוּ כַּחֲגָבִים",
          transliteration: "vanehi veeineinu kachagavim",
          language: "ebraica",
          meaning:
            "și am fost în ochii noștri ca niște lăcuste. Propoziția arată nu o observație obiectivă, ci o autoevaluare distorsionată de frică, extinsă apoi într-o presupunere nefondată despre percepția dușmanului.",
        },
      ],
      crossRefs: ["Numeri 14:36-37", "Evrei 3:19", "Proverbe 29:25"],
      forYourHeart:
        "Frica exagerează mereu; întreabă-te dacă ceea ce te întâmpina ca „imposibil” este chiar așa, sau doar imaginea pe care teamă ți-o construiește.",
    },
  ],
  prayer:
    "Doamne, dă-mi curajul lui Caleb de a vedea aceeași realitate și totuși să spun: „suntem în stare”, pentru că Tu ești cu noi.\n\nPăzește-mă să nu răspândesc zvonuri născute din frică, care exagerează dincolo de ceea ce am văzut cu adevărat.\n\nÎnvață-mă să nu mă văd ca o lăcusta înaintea greutăților, ci să văd greutățile înaintea măreției Tale.\n\nȘi dă-mi harul de a fi, ca Iosua, cel numit din nou, chemat să duc mai departe făgăduința Ta. Amin.",
  status: NUMERI_STATUSES[13],
})
