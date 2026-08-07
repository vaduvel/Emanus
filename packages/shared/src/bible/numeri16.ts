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

export const NUMERI_16 = numeriChapter({
  number: 16,
  title: "Numeri 16 — Răscoala lui Core, Datan și Abiram",
  summary:
    "Core, un levit, se ridică împotriva preoției lui Aaron, împreună cu Datan și Abiram din seminția lui Ruben și două sute cincizeci de fruntași. DOMNUL desparte judecata în două forme: pământul își deschide gura și-i înghite pe Core, Datan și Abiram cu tot ce este al lor, iar un foc mistuie pe cei două sute cincizeci de bărbați. A doua zi, poporul cârtește din nou, iar o urgie ucide paisprezece mii șapte sute, oprită doar prin ispășirea grăbită a lui Aaron.",
  literaryContext:
    "După răzvrătirea poporului împotriva conducerii lui Moise în capitolul paisprezece, aceasta este o răzvrătire mai întâi religioasă decât politică — o contestare a distincției rânduite de DOMNUL între leviți și preoți. Faptul că poporul cârtește din nou imediat după judecata asupra lui Core arată cât de superficială fusese pocăința lor de la Horma.",
  historicalContext:
    "Răzvrătirea lui Core este citată în Iuda 11 ca exemplu al celor care pier în „răzvrătirea lui Core”, iar cadelnițele bătute în foițe pentru îmbrăcarea altarului au rămas un semn vizibil permanent, amintind fiecărui închinător viitor de prețul acestei încălcări a granițelor rânduite de DOMNUL.",
  units: [
    {
      id: "numeri-16-1-11",
      ref: "Numeri 16:1-11",
      heading: "„De ce vă ridicați voi mai presus de adunarea DOMNULUI?”",
      text: numeriPassage(16, 1, 11),
      teaching: teaching(
        "Core, un levit din familia lui Chehat, se unește cu Datan, Abiram și On din seminția lui Ruben și cu două sute cincizeci de fruntași ai adunării pentru a contesta autoritatea lui Moise și Aaron. Argumentul lor sună aproape evlavios: „toată adunarea, toți sunt sfinți și DOMNUL este în mijlocul lor. De ce vă ridicați voi mai presus de adunarea DOMNULUI?”",
        "Moise cade din nou cu fața la pământ — același gest al cărui pattern îl văzusem și în fața răzvrătirii poporului — și propune un test decisiv: cădelnițe cu tămâie înaintea DOMNULUI, care va arăta „cine este al Lui și cine este sfânt”. Nu Moise decide cine are dreptate, ci lasă pe DOMNUL Însăși să răspundă.",
        "Mustrarea lui Moise dezvăluie miezul problemei: levitiții primiseră deja un privilegiu unic — apropierea de Cortul DOMNULUI, distinctă de restul adunării — și totuși căutau și preoția. „Este oare puțin lucru pentru voi...?” întreabă Moise, arătând că nemulțumirea lui Core nu venea din lipsă, ci din lăcomie pentru o poziție care nu-i fusese dată.",
      ),
      words: [],
      crossRefs: ["Iuda 1:11", "Evrei 5:4", "1 Petru 5:5-6"],
      forYourHeart:
        "Nemulțumirea față de rolul primit poate îmbrăca un limbaj aparent spiritual — „toți sunteți sfinți” — dar rădăcina ei este adesea lăcomia pentru o poziție care nu ți-a fost dată.",
    },
    {
      id: "numeri-16-12-15",
      ref: "Numeri 16:12-15",
      heading: "Datan și Abiram: „Nu ne suim!”",
      text: numeriPassage(16, 12, 15),
      teaching: teaching(
        "Chemați de Moise, Datan și Abiram refuză pur și simplu să vină: „nu ne suim!” Acuzația lor răstoarnă complet realitatea: numesc Egiptul „o țară în care curge lapte și miere” — termenul rezervat pentru Canaan — și îl acuză pe Moise că vrea „să se facă stăpân peste ei”, cu toate că el nu ceruse niciodată această poziție pentru sine.",
        "Moise, mâniat, aduce înaintea DOMNULUI o apărare simplă și personală: „nu le-am luat nici măcar un măgar și nu i-am făcut niciunuia dintre ei vreun rău”. După patruzeci de ani de conducere fără avantaj personal, această acuzație de tiranie era o răsturnare completă a adevărului.",
      ),
      words: [],
      crossRefs: ["1 Samuel 12:3-5", "Fapte 20:33"],
      forYourHeart:
        "Cei care refuză să fie și să se supună unei chemări legitime găsesc adesea cel mai ușor să răstoarne acuzația și să numească tiranie ceea ce este de fapt slujire jertfitoare.",
    },
    {
      id: "numeri-16-16-22",
      ref: "Numeri 16:16-22",
      heading: "Slava DOMNULUI și mijlocirea lui Moise și Aaron",
      text: numeriPassage(16, 16, 22),
      teaching: teaching(
        "Testul cu cădelnițele are loc: Core adună „toată adunarea” împotriva lui Moise și Aaron la intrarea Cortului Întâlnirii, și „slava DOMNULUI S-a arătat întregii adunări” — nu ca să confirme pretențiile lui Core, ci ca introducere a judecății.",
        "DOMNUL propune să-i mistuie „într-o clipă” pe toți cei din adunare, dar Moise și Aaron cad din nou cu fața la pământ și mijlocesc: „un singur om a păcătuit și Te-ai mâniat pe toată adunarea?” Această mijlocire pentru cei care tocmai îi atacaseră arată același caracter pe care Moise îl arătase deja de două ori la Sinai și la Cadeș.",
      ),
      words: [],
      crossRefs: ["Numeri 14:19", "Ezechiel 18:20"],
      forYourHeart:
        "Un conducător după inima lui Dumnezeu mijlocește chiar pentru cei care i s-au împotrivit, deosebind vinovăția individuală de răspunderea colectivă.",
    },
    {
      id: "numeri-16-23-30",
      ref: "Numeri 16:23-30",
      heading: "Semnul cerut: o lucrare neobișnuită",
      text: numeriPassage(16, 23, 30),
      teaching: teaching(
        "DOMNUL răspunde mijlocirii cu o depărtare, nu cu o nimicire totală: „depărtați-vă de jur împrejurul locuinței lui Core, Datan și Abiram”. Judecata se va concentra doar asupra răzvrătiților și familiilor lor, nu asupra întregii adunări.",
        "Moise propune un semn fără precedent, care să dovedească dincolo de orice îndoială că el nu acționase din proprie inițiativă: dacă oamenii aceștia mor „cum mor toți oamenii”, DOMNUL nu l-a trimis; dar dacă pământul „își va deschide gura” și-i va înghiți de vii, atunci toți vor ști că acești oameni L-au disprețuit pe DOMNUL.",
      ),
      words: [],
      crossRefs: ["Deuteronom 11:6", "Psalmul 106:17"],
      forYourHeart:
        "Judecata lui Dumnezeu vine adesea diferențiată, țintând cu precizie vinovăția reală și cruțând pe cei care se depărtează la timp de rău.",
    },
    {
      id: "numeri-16-31-35",
      ref: "Numeri 16:31-35",
      heading: "Pământul se despică; focul mistuie cei două sute cincizeci",
      text: numeriPassage(16, 31, 35),
      teaching: teaching(
        "Judecata vine imediat ce Moise termină de vorbit: „pământul s-a despicat sub ei... i-a înghițit pe ei, casele lor, pe toți oamenii lui Core și toate averile lor”. Nimic din ce aparținea răzvrătiților nu a rămas — o judecată totală asupra unei răzvrătiri care ceruse totul pentru sine.",
        "Groaza scenei se vede în reacția imediată a întregului popor: „să nu ne înghiță și pe noi pământul!” Cei două sute cincizeci de bărbați care aduseseră tămâie — cei care căutaseră poziția preoției fără să fi fost chemați la ea — sunt mistuiți de un foc separat, distinct de pământul care i-a înghițit pe conducătorii răzvrătirii.",
      ),
      words: [],
      crossRefs: ["Levitic 10:2", "Iuda 1:11"],
      forYourHeart:
        "A căuta o poziție sfântă fără chemarea lui Dumnezeu poartă un risc real; apropierea de lucrurile sfinte cere ascultare, nu doar dorință.",
    },
    {
      id: "numeri-16-36-40",
      ref: "Numeri 16:36-40",
      heading: "Cădelnițele devin un semn permanent",
      text: numeriPassage(16, 36, 40),
      teaching: teaching(
        "Cădelnițele de aramă folosite de cei două sute cincizeci de bărbați nu sunt aruncate, ci bătute în foițe pentru îmbrăcarea altarului, „ca aducere aminte pentru fiii lui Israel”. Sfințenia acestor cădelnițe — pentru că fuseseră aduse înaintea DOMNULUI, chiar dacă nelegitim — le făcea potrivite doar pentru un scop de avertisment permanent.",
        "Scopul explicit al acestui semn era prevenirea: „ca niciun străin care nu este din neamul lui Aaron să nu se apropie să ardă tămâie înaintea DOMNULUI, ca să nu ajungă ca Core și ca ceata lui”. Fiecare închinător viitor, privind altarul, avea înaintea ochilor prețul plătit pentru încălcarea granițelor rânduite de DOMNUL.",
      ),
      words: [],
      crossRefs: ["Numeri 3:10", "Evrei 5:4"],
      forYourHeart:
        "Dumnezeu transformă uneori chiar instrumentele unui păcat într-un semn permanent de avertisment, pentru binele generatiilor viitoare.",
    },
    {
      id: "numeri-16-41-50",
      ref: "Numeri 16:41-50",
      heading: "Cârtirea repetată și mijlocirea grăbită a lui Aaron",
      text: numeriPassage(16, 41, 50),
      teaching: teaching(
        "Incredibil, chiar a doua zi după această judecată fără precedent, „toată adunarea fiilor lui Israel a cârtit împotriva lui Moise și împotriva lui Aaron, zicând: voi ați omorât poporul DOMNULUI!” Poporul răstoarnă complet judecata dreaptă a DOMNULUI, atribuindu-i-o lui Moise și Aaron ca pe o crimă.",
        "O urgie începe imediat printre popor, dar Moise acționează fără întârziere: „ia cădelnița, pune foc în ea de pe altar, pune tămâie pe ea și du-te repede la adunare și fă ispășire pentru ei”. Aaron aleargă „în mijlocul adunării” și „a stat între cei morți și cei vii, și urgia s-a oprit”.",
        "Imaginea lui Aaron stând „între cei morți și cei vii”, cu tămâia arzând în mână, este una dintre cele mai puternice imagini de mijlocire din Vechiul Testament: chiar preotul care fusese ținta unei răzvrătiri devine cel care și-a pus viața între popor și moarte, pentru a-l opri urgia. Paisprezece mii șapte sute au murit înainte de a se opri, un număr care arată gravitatea acestei noi răzvrătiri.",
      ),
      words: [],
      crossRefs: ["1 Cronici 21:16-17", "Evrei 7:25"],
      forYourHeart:
        "Chiar după cea mai clară dovadă a judecății lui Dumnezeu, inima omenească poate aluneca imediat înapoi la cârtire; ai nevoie de un mijlocitor care să stea între tine și consecințele păcatului tău, așa cum a stat Aaron.",
    },
  ],
  prayer:
    "Doamne, păzește-mă de a căuta o poziție sau o cinste pe care nu mi-ai dat-o, sub masca unui limbaj aparent spiritual.\n\nÎnvață-mă să mijlocesc, ca Moise și Aaron, chiar pentru cei care mi se împotrivesc, deosebind vinovăția reală de mânia grabă.\n\nÎți mulțumesc că ai pus între mine și moarte un Mijlocitor mai mare decât Aaron, care stă mereu „între cei morți și cei vii” pentru mine.\n\nPăzește-mi inima de a aluneca înapoi la cârtire imediat după ce am văzut dovada limpede a lucrării Tale. Amin.",
  status: NUMERI_STATUSES[16],
})
