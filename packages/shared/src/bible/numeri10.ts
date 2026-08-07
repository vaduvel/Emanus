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

export const NUMERI_10 = numeriChapter({
  number: 10,
  title: "Numeri 10 — Trâmbițele de argint și pornirea de la Sinai",
  summary:
    "După aproape un an de popas la Sinai, tabăra pornește în sfârșit la drum. Capitolul începe cu rânduiala celor două trâmbițe de argint, continuă cu ordinea exactă de marș a celor douăsprezece seminții, cuprinde invitația lui Moise către Hobab și se încheie cu chivotul mergând înaintea poporului și cu cele două rugăciuni scurte ale lui Moise, la pornire și la popas.",
  literaryContext:
    "Acest capitol încheie întreaga secțiune începută în capitolul întâi — recensământul, așezarea taberei, sfințirea altarului, punerea deoparte a leviților, norul călăuzitor — și o transformă în mișcare. Tot ce a fost rânduit static într-un an de ședere la Sinai este acum pus în practică: tabăra chiar pornește, exact în ordinea stabilită în capitolul doi.",
  historicalContext:
    "Data este precisă: în al doilea an, luna a doua, ziua a douăzecea — la aproape exact un an de la ieșirea din Egipt. Hobab, socrul lui Moise, apare aici cu numele de fiu al lui Reuel madianitul; tradiția identifică această familie cu Ietro din Exod 18, cunoștința pustiei fiindu-i extrem de prețioasă unui popor care nu mai călătorise niciodată prin acele locuri.",
  units: [
    {
      id: "numeri-10-1-10",
      ref: "Numeri 10:1-10",
      heading: "Două trâmbițe de argint bătut",
      text: numeriPassage(10, 1, 10),
      teaching: teaching(
        "Fiecare sunet avea un înțeles precis: amândouă trâmbițele chemau întreaga adunare la intrarea Cortului; una singură chema doar căpeteniile; semnalele de alarmă anunțau pornirea, pe rând, a taberelor așezate la răsărit, apoi la sud. Un singur instrument putea transmite mesaje diferite, după numărul de trâmbițe folosite și felul în care sunau.",
        "Sunetul trâmbițelor nu era rezervat doar mișcării taberei: el însoțea și războiul — „vă veți aduce aminte înaintea DOMNULUI și veți fi izbăviți de vrăjmașii voștri” — și bucuria sărbătorilor și a lunilor noi. Același sunet putea însemna chemare la adunare, semnal de plecare, strigăt de război sau cântare de sărbătoare, după momentul în care era folosit.",
        "Fraza care încheie unitatea explică rostul adânc al trâmbițelor: „ele vor fi o aducere aminte de voi înaintea Dumnezeului vostru”. Nu erau doar semnale practice pentru organizarea taberei, ci un mijloc prin care poporul își amintea că DOMNUL își amintea de el.",
      ),
      words: [
        {
          original: "חֲצוֹצְרֹת כֶסֶף",
          transliteration: "chatzotzerot kesef",
          language: "ebraica",
          meaning:
            "trâmbițe de argint. Spre deosebire de cornul de berbec (șofar), aceste trâmbițe erau instrumente lucrate special, rezervate exclusiv preoților, fiilor lui Aaron, pentru semnalele oficiale ale taberei.",
        },
      ],
      crossRefs: ["Numeri 31:6", "2 Împarați 11:14", "1 Corinteni 14:8"],
      forYourHeart:
        "Un singur glas al lui Dumnezeu poate însemna chemare, avertizare sau bucurie, după momentul în care îl auzi. Învață să recunoști ce anume ți se cere în fiecare clipă.",
    },
    {
      id: "numeri-10-11-13",
      ref: "Numeri 10:11-13",
      heading: "Norul se ridică: prima pornire",
      text: numeriPassage(10, 11, 13),
      teaching: teaching(
        "După aproape un an de ședere la Sinai — timp în care s-a construit Cortul, s-a făcut recensământul, s-au sfințit leviții și s-a serbat Paștele — norul se ridică în sfârșit „în al doilea an, în luna a doua, în ziua a douăzecea”. Data precisă marchează sfârșitul unei etape lungi de pregătire și începutul călătoriei propriu-zise.",
        "Textul notează simplu: „astfel au pornit pentru prima dată, după porunca DOMNULUI dată prin Moise”. Toată pregătirea din capitolele anterioare — tabăra așezată, ordinea de marș stabilită, leviții împărțiți pe sarcini — nu a fost teorie; a fost exact ce s-a întâmplat în această clipă.",
      ),
      words: [],
      crossRefs: ["Exod 40:36-37", "Numeri 9:17-18"],
      forYourHeart:
        "Pregătirea îndelungată nu este timp pierdut; ea devine temelia mișcării de care ai nevoie când, în sfârșit, vine ziua pornirii.",
    },
    {
      id: "numeri-10-14-28",
      ref: "Numeri 10:14-28",
      heading: "Ordinea de marș: exact ca în rânduiala stabilită",
      text: numeriPassage(10, 14, 28),
      teaching: teaching(
        "Ordinea de marș urmează exact tiparul stabilit în capitolul doi: întâi steagul lui Iuda, cu Isahar și Zabulon; apoi gherșoniții și merariții purtând Cortul coborât; apoi steagul lui Ruben, cu Simeon și Gad; apoi chehatiții purtând Sfântul Lăcaș pe umeri; apoi steagul lui Efraim, cu Manase și Beniamin; și în final steagul lui Dan, strângând toate taberele, cu Așer și Neftali.",
        "Merită observată poziția chehatiților: ei poartă „Sfântul Lăcaș” — lucrurile cele mai sfinte — dar înaintea sosirii lor, „celelalte lucruri ale Cortului se ridicau până la sosirea lor”. Cortul propriu-zis era deja ridicat înainte ca ei să ajungă cu obiectele cele mai sfinte, astfel încât acestea să fie așezate direct în locul lor rânduit, fără să stea expuse în așteptare.",
        "O ordine stabilită cu mult timp înainte, în liniștea capitolului doi, se dovedește acum întocmai respectată în mijlocul mișcării și al mulțimii. Planificarea din vreme a taberei devine, la pornire, singura garanție a ordinii.",
      ),
      words: [],
      crossRefs: ["Numeri 2:1-31", "Numeri 4:15", "1 Corinteni 14:40"],
      forYourHeart:
        "O ordine bine stabilită dinainte nu înăbușă mișcarea; ea o face posibilă fără haos, chiar și când mii de oameni pornesc în același timp.",
    },
    {
      id: "numeri-10-29-32",
      ref: "Numeri 10:29-32",
      heading: "„Ne vei fi ca un ochi” — invitația către Hobab",
      text: numeriPassage(10, 29, 32),
      teaching: teaching(
        "Moise îi cere lui Hobab, socrul lui, să rămână cu poporul, promițându-i să-i facă bine, „căci DOMNUL a făgăduit binele pentru Israel”. Hobab refuză întâi, dorind să se întoarcă „în țara mea și la rudele mele”, dar Moise stăruie cu o motivație surprinzător de practică: „tu știi cum trebuie să tăbărâm în pustie și ne vei fi ca un ochi”.",
        "Este o mărturisire uimitoare: Israel are norul care îl călăuzește și chivotul care îl merge înainte, și totuși Moise prețuiește și cunoștința pământească a lui Hobab despre pustie. Călăuzirea supranaturală a lui Dumnezeu nu înlătură nevoia de înțelepciune omenească; îl împlinește.",
      ),
      words: [],
      crossRefs: ["Exod 18:1-27", "Judecători 1:16", "Judecători 4:11"],
      forYourHeart:
        "A fi călăuzit de Dumnezeu nu înseamnă să disprețuiești sfatul și experiența oamenilor pe care ți i-a pus în cale.",
    },
    {
      id: "numeri-10-33-36",
      ref: "Numeri 10:33-36",
      heading: "Chivotul înainte și cele două rugăciuni ale lui Moise",
      text: numeriPassage(10, 33, 36),
      teaching: teaching(
        "În această primă călătorie, chivotul legământului „a mers înaintea lor cale de trei zile, ca să le caute un loc de odihnă”. Nu era doar un obiect purtat în mijlocul taberei, după ordinea obișnuită din capitolul doi, ci mergea în frunte, căutând calea cea mai bună pentru popor.",
        "La fiecare pornire, Moise rostea: „Ridică-Te, DOMNULE, și să se împrăștie vrăjmașii Tăi, și cei ce Te urăsc să fugă dinaintea Feței Tale!” — iar la fiecare popas: „Întoarce-Te, DOMNULE, la zecile de mii de mii ale lui Israel!” Două rugăciuni scurte, rostite de nenumărate ori pe drum, care însoțeau fiecare pas al taberei cu recunoașterea prezenței DOMNULUI.",
        "Aceste două versete scurte au fost păstrate în cartea de rugăciune a lui Israel de-a lungul secolelor și sunt rostite până astăzi în sinagogi la scoaterea și așezarea Sulului Legii — semn că chiar și o rugăciune de câteva cuvinte, rostită cu credință la momentul potrivit, poate dăinui mult mai mult decât evenimentul care a prilejuit-o.",
      ),
      words: [
        {
          original: "קוּמָה יְהוָה",
          transliteration: "kumah Adonai",
          language: "ebraica",
          meaning:
            "Ridică-Te, DOMNULE. Chemarea presupune o prezență reală a DOMNULUI, strâns legată de chivot, care „Se ridică” și „Se întoarce” odată cu mișcarea lui în fruntea taberei.",
        },
      ],
      crossRefs: ["Psalmul 68:1", "Psalmul 132:8", "Iosua 3:3-4"],
      forYourHeart:
        "O rugăciune scurtă, rostită cu credință la fiecare pornire și la fiecare popas al vieții tale, poate ține locul unei teologii întregi despre prezența lui Dumnezeu cu tine pe drum.",
    },
  ],
  prayer:
    "Doamne, învață-mă să recunosc glasul Tău, oricât de diferite ar fi chemările pe care mi le adresezi în fiecare zi.\n\nDă-mi răbdarea de a mă pregăti îndelung înainte de a porni, și credința de a porni imediat când norul Tău se ridică.\n\nÎnvață-mă să prețuiesc și sfatul oamenilor pe care mi i-ai pus în cale, fără să-mi întemeiez toată încrederea doar pe ei.\n\nRidică-Te, DOMNULE, înaintea mea în fiecare pornire, și întoarce-Te la mine, cu poporul Tău, la fiecare popas. Amin.",
  status: NUMERI_STATUSES[10],
})
