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

export const NUMERI_20 = numeriChapter({
  number: 20,
  title: "Numeri 20 — Apele Meriba, moartea Mariei și a lui Aaron",
  summary:
    "După aproape patruzeci de ani, poporul revine la Cadeș: Maria moare acolo, iar lipsa apei aduce aceeași cârtire veche. De data aceasta însă, Moise nu doar vorbește stâncii cum îi poruncise DOMNUL, ci o lovește de două ori cu mânie — și plătește această neascultare cu interdicția de a intra în țara făgăduită. Capitolul se încheie cu refuzul Edomului de a lăsa Israelul să treacă și cu moartea lui Aaron pe muntele Hor.",
  literaryContext:
    "Marchează sfârșitul celor patruzeci de ani de rătăcire: aproape toată generația condamnată la Cadeș în capitolul paisprezece a murit, iar textul trece direct la moartea celor doi lideri principali ai exodului — Maria și Aaron — marcând o schimbare de gardă la marginea intrării în Canaan.",
  historicalContext:
    "Apele Meriba de aici, la finalul rătăcirii, poartă același nume ca locul din Exod 17, la începutul călătoriei — un ecou care arată cât de puțin se schimbase inima poporului în patruzeci de ani. Psalmul 106:32-33 explică faptul că poporul „L-au amărât duhul, iar Moise a vorbit în pripa buzelor lui”, arătând că provocarea poporului a fost cea care l-a dus pe Moise la păcat.",
  units: [
    {
      id: "numeri-20-1-5",
      ref: "Numeri 20:1-5",
      heading: "Moartea Mariei și cârtirea veche pentru lipsa apei",
      text: numeriPassage(20, 1, 5),
      teaching: teaching(
        "Textul trece direct de la sfârșitul rătăcirii la sosirea în pustia Țin, la Cadeș, cu o singură propoziție scurtă, aproape rece: „acolo a murit Maria și a fost îngropată acolo”. Prima dintre cei trei conducători principali ai exodului își încheie viața chiar la marginea rătăcirii, fără să vadă țara făgăduită.",
        "Lipsa apei aduce imediat aceeași cârtire veche, aproape cuvânt cu cuvânt ca cea de la Refidim, patruzeci de ani înainte: „o, de am fi murit când au murit frații noștri înaintea DOMNULUI!” O generație întreagă murise în pustie tocmai din pricina necredinței, dar copiii lor repetă acum aceeași cârtire.",
      ),
      words: [],
      crossRefs: ["Exod 17:1-3", "Miheia 6:4"],
      forYourHeart:
        "Tiparele de necredință se pot transmite de la o generație la alta, chiar și după ce prima generație a suportat consecințe grele pentru ele.",
    },
    {
      id: "numeri-20-6-8",
      ref: "Numeri 20:6-8",
      heading: "Slava DOMNULUI și porunca de a vorbi stâncii",
      text: numeriPassage(20, 6, 8),
      teaching: teaching(
        "Ca și de multe ori înainte, Moise și Aaron cad cu fața la pământ înaintea DOMNULUI, iar slava Lui se arată imediat — nu ca judecată, ci ca întâmpinare a nevoii poporului. DOMNUL nu se mânie de data aceasta pe cârtire, ci dă imediat o soluție.",
        "Porunca este precisă: „ia toiagul... vorbiți stâncii sub ochii lor și ea își va da apele”. Diferența față de Exod 17, unde DOMNUL poruncise să se lovească stânca, este esențială: de data aceasta trebuia doar vorbit, nu lovit.",
      ),
      words: [],
      crossRefs: ["Exod 17:5-6", "1 Corinteni 10:4"],
      forYourHeart:
        "DOMNUL răspunde adesea nevoii poporului Său înainte să le judece cârtirea, arătând o răbdare care nu trebuie confundată cu îngăduință față de neascultarea ulterioară.",
    },
    {
      id: "numeri-20-9-11",
      ref: "Numeri 20:9-11",
      heading: "Moise lovește stânca de două ori, cu mânie",
      text: numeriPassage(20, 9, 11),
      teaching: teaching(
        "Moise ia toiagul cum i se poruncise, dar cuvintele lui către popor trădează deja o schimbare față de poruncă: „ascultați, răzvrătiților! Vom putea NOI oare să vă scoatem apă din stânca aceasta?” Moise își atribuie sieși și lui Aaron puterea de a scoate apa, nu DOMNULUI.",
        "Apoi, în loc să vorbească stâncii cum i se poruncise, „a lovit stânca de două ori cu toiagul său”. Apa iese oricum, din harul DOMNULUI care nu lasă poporul să sufere pentru greșeala conducătorilor, dar neascultarea lui Moise este deja săvârșită.",
      ),
      words: [],
      crossRefs: ["Psalmul 106:32-33"],
      forYourHeart:
        "Chiar cei mai credincioși slujitori pot ceda unei mânii vechi acumulate, mai ales după zeci de ani de purtat presiunea unui popor cârtitor.",
    },
    {
      id: "numeri-20-12-13",
      ref: "Numeri 20:12-13",
      heading: "Sentința: Moise și Aaron nu vor duce adunarea în țară",
      text: numeriPassage(20, 12, 13),
      teaching: teaching(
        "Sentința DOMNULUI este directă și grea: „pentru că nu ați avut credință în Mine ca să Mă sfințiți în ochii fiilor lui Israel, de aceea nu veți duce această adunare în țara pe care le-o dau!” Același Moise care mijlocise pentru popor de atâtea ori nu va vedea el însuși țara făgăduită.",
        "Păcatul nu era doar nesupunerea la o instrucțiune tehnică, ci ceva mai profund: Moise nu L-a „sfințit” pe DOMNUL înaintea poporului, atribuindu-și lui și lui Aaron acțiunea care aparținea numai DOMNULUI. Locul acesta a purtat de acum numele Meriba, „cearta”, aceeași denumire de la Refidim.",
      ),
      words: [
        {
          original: "מְרִיבָה",
          transliteration: "Merivah",
          language: "ebraica",
          meaning:
            "cearta, împotrivirea. Numele repetat la două evenimente separate de patruzeci de ani arată că rezistența față de DOMNUL a fost o temă recurentă, nu un incident izolat.",
        },
      ],
      crossRefs: ["Deuteronom 32:51", "Iacov 3:1"],
      forYourHeart:
        "Conducătorii spirituali poartă o răspundere sporită față de a-L sfinți pe DOMNUL înaintea celor pe care îi conduc; alunecarea de a-și atribui glorie ține să fie luată în serios chiar și după o viață întreagă de slujire fidelă.",
    },
    {
      id: "numeri-20-14-17",
      ref: "Numeri 20:14-17",
      heading: "Solia către împăratul Edomului",
      text: numeriPassage(20, 14, 17),
      teaching: teaching(
        "Moise trimite soli la Edom, numind poporul „fratele tău Israel” — o amintire a legăturii de sânge dintre Iacov și Esau, strămoșii lor. Cererea este rezonabilă și respectuoasă: doar trecere pe Drumul Împărătesc, fără să atingă ogoare, vii sau fântâni.",
        "Solia recapitulează pe scurt istoria întregii călătorii: coborarea în Egipt, chinul de acolo, strigătul către DOMNUL și izbăvirea prin Îngerul Său. Această recapitulare arată că Israel Însăși înțelegea întreaga istorie recentă ca lucrare directă a DOMNULUI, nu întâmplare.",
      ),
      words: [],
      crossRefs: ["Geneza 25:23-26", "Deuteronom 2:4-6"],
      forYourHeart:
        "O cerere făcută cu respect și cu smerenie — recunoscând relația și cerând doar ce este necesar — nu garantează întotdeauna un răspuns bun din partea celor din jur.",
    },
    {
      id: "numeri-20-18-21",
      ref: "Numeri 20:18-21",
      heading: "Refuzul Edomului",
      text: numeriPassage(20, 18, 21),
      teaching: teaching(
        "Răspunsul Edomului este imediat și ostil: „nu vei trece pe la mine, altfel îți voi ieși în întâmpinare cu sabia!” Chiar și după ce Israel oferă să plătească pentru orice apă folosită, răspunsul rămâne același categoric refuz.",
        "Edomul își susține cuvântul cu forța: „i-a ieșit în întâmpinare cu un popor numeros și cu mână puternică”. Fără să mai insiste, „Israel s-a abătut de la el” — o alegere de înțelepciune, evitând un conflict cu propriile rude, chiar dacă nedreptatea le fusese făcută.",
      ),
      words: [],
      crossRefs: ["Judecătorii 11:17", "Amos 1:11"],
      forYourHeart:
        "Uneori înțelepciunea stă în a te retrage dintr-o confruntare posibilă, chiar când ai dreptul de partea ta, încredințându-i lui Dumnezeu dreptatea finală.",
    },
    {
      id: "numeri-20-22-26",
      ref: "Numeri 20:22-26",
      heading: "Sosirea la muntele Hor și vestea morții lui Aaron",
      text: numeriPassage(20, 22, 26),
      teaching: teaching(
        "Toată adunarea pornind din Cadeș ajunge la muntele Hor, la hotarul Edomului, unde DOMNUL vorbește din nou lui Moise și lui Aaron împreună. Vestea este directă: „Aaron va fi adăugat la poporul său”, aceeași pedeapsă din cauza răzvrătirii de la apele Meriba, la fel ca a lui Moise.",
        "Instrucțiunea DOMNULUI este simbolică și solemnă: hainele preoțești ale lui Aaron trec direct pe fiul său Eleazar, chiar înainte de moartea lui Aaron, arătând continuitatea neabătută a preoției, indiferent de moartea persoanei care o poartă.",
      ),
      words: [],
      crossRefs: ["Exod 29:29-30", "Evrei 7:23-24"],
      forYourHeart:
        "O slujire consacrată lui Dumnezeu continuă dincolo de viața unei singure persoane; instituția rămâne statornică, chiar când purtătorii ei trec.",
    },
    {
      id: "numeri-20-27-29",
      ref: "Numeri 20:27-29",
      heading: "Moartea lui Aaron și plânsul de treizeci de zile",
      text: numeriPassage(20, 27, 29),
      teaching: teaching(
        "Moise ascultă exact porunca DOMNULUI: se suie pe muntele Hor împreună cu Aaron și Eleazar „în sub ochii întregii adunări”, îl dezbracă pe Aaron de hainele preoțești și le îmbracă pe Eleazar, chiar înainte ca Aaron să moară.",
        "Moartea lui Aaron pe vârful muntelui, urmată de coborârea lui Moise și Eleazar fără el, este una dintre cele mai tăcute și solemne scene din carte. „Toată casa lui Israel l-a plâns pe Aaron timp de treizeci de zile” — aceeași durată de doliu care va fi acordată mai târziu și lui Moise (Deuteronom 34:8), un semn al cinstei egale purtate amândurora.",
      ),
      words: [],
      crossRefs: ["Deuteronom 34:8", "Numeri 33:38-39"],
      forYourHeart:
        "Ascultarea deplină uneori cere să duci până la capăt o lucrare grea și dureroasă — pregătind pentru moarte pe cineva drag — exact cum a poruncit Dumnezeu, fără să scoți din drum.",
    },
  ],
  prayer:
    "Doamne, iartă-mă pentru fiecare dată când am încercat să-mi atribui mie însumi ce se cuvenea numai Numelui Tău.\n\nPăzește-mă de mânia acumulată în ani de slujire grea, ca să nu cad exact când viața mea de credincioșie pare aproape împlinită.\n\nÎnvață-mă înțelepciunea de a mă abăte uneori dintr-o confruntare, încredințându-ție dreptatea finală.\n\nÎți mulțumesc că slujirea Ta continuă statornică dincolo de viața fiecărui slujitor pe care îl chemi la Tine. Amin.",
  status: NUMERI_STATUSES[20],
})
