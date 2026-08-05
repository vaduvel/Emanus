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

export const NUMERI_31 = numeriChapter({
  number: 31,
  title: "Numeri 31 — Răzbunarea împotriva Madianului",
  summary:
    "DOMNUL poruncește ultima misiune a lui Moise: răzbunarea împotriva Madianului pentru cursă pusă la Baal-Peor. Doisprezece mii de bărbați înving fără pierderi, dar Moise se mânie că femeile au fost lăsate vii și poruncește judecata lor. Capitolul se încheie cu o împărțire minuțioasă a prăzii între luptători, adunare și leviți.",
  literaryContext:
    "Acest capitol împlinește direct porunca dată în Numeri 25:16-18, după cursă pusă lui Israel la Baal-Peor prin sfatul lui Balaam. Este și ultima acțiune majoră condusă de Moise: imediat după împlinirea răzbunării, DOMNUL îi va spune lui Moise să se sui pe Abarim ca să moară (Numeri 27:12-14, 31:2).",
  historicalContext:
    "Războiul de răzbunare nu era motivat de expansiune teritorială, ci de o încălcare specifică: madianiții au folosit ademenirea sexuală și religioasă ca armă de război împotriva lui Israel, o strategie considerată la fel de periculoasă ca un atac direct cu sabia.",
  units: [
    {
      id: "numeri-31-1-2",
      ref: "Numeri 31:1-2",
      heading: "Porunca DOMNULUI de răzbunare",
      text: numeriPassage(31, 1, 2),
      teaching: teaching(
        "DOMNUL dă o poruncă directă și clară lui Moise: „răzbună pe fiii lui Israel împotriva madianiților; după aceea vei fi adăugat la poporul tău”. Această legătură directă — misiunea finală urmată imediat de moarte — arată că Moise știa că timpul lui ca conducător se încheia odată cu această ultimă sarcină.",
      ),
      words: [],
      crossRefs: ["Numeri 25:16-18", "Numeri 27:12-14"],
      forYourHeart:
        "Chiar în preajma sfârșitului unei chemări, Dumnezeu poate cere o ultimă lucrare importantă, care încheie cu credincioșie o misiune începută mult mai înainte.",
    },
    {
      id: "numeri-31-3-6",
      ref: "Numeri 31:3-6",
      heading: "Mobilizarea celor 12.000",
      text: numeriPassage(31, 3, 6),
      teaching: teaching(
        "Moise transmite porunca DOMNULUI cu limbaj de război sfânt: „să îplinească răzbunarea DOMNULUI împotriva Madianului”. Câte o mie de bărbați din fiecare seminție — 12.000 în total, număr egal din toate cele douăsprezece seminții — asigură că această acțiune era a întregului Israel, nu doar a unei seminții afectate direct.",
        "Fineas, fiul preotului Eleazar — același care a oprit urgia la Baal-Peor — merge cu ei, avand „uneltele Sfântului Lăcaș și trâmbițele de alarmă”, semnalând că acest război era condus sub autoritate și binecuvântare preoțească, nu doar militară.",
      ),
      words: [],
      crossRefs: ["Numeri 25:6-9"],
      forYourHeart:
        "Când răspunsul împotriva răului vine în unitate din toate părțile poporului, el are forță și binecuvântare mult mai mare decât un răspuns parțial.",
    },
    {
      id: "numeri-31-7-12",
      ref: "Numeri 31:7-12",
      heading: "Victoria și prada",
      text: numeriPassage(31, 7, 12),
      teaching: teaching(
        "Victoria este totală: toți cei cinci împărați ai Madianului — Evi, Rekem, Ţur, Hur, Reba — sunt uciși, iar Balaam Însăși „a fost ucis cu sabia”, primind în final judecata pe care blestemele lui nu au putut-o împiedica; profețiile lui despre distrugerea vrăjmașilor lui Israel s-au împlinit chiar asupra propriei sale vieți.",
        "Femeile, copiii și toate averile sunt luate ca pradă, iar cetățile și taberele madianite sunt arse cu foc — o distrugere completă a infrastructurii după modelul războiului sfânt, care va fi urmat mai târziu și în cucerirea Canaanului.",
      ),
      words: [],
      crossRefs: ["Numeri 24:14-17", "2 Petru 2:15-16"],
      forYourHeart:
        "Cel care caută să-i corupă pe alții pentru profit personal, cum a făcut Balaam, ajunge în cele din urmă prins în propria lui plasă de rău.",
    },
    {
      id: "numeri-31-13-18",
      ref: "Numeri 31:13-18",
      heading: "Mânia lui Moise și porunca judecății",
      text: numeriPassage(31, 13, 18),
      teaching: teaching(
        "Moise se mânie pe căpeteniile oștirii pentru că au lăsat vii femeile madianite — exact aceleași femei care, „la sfatul lui Balaam”, i-au ademenit pe fiii lui Israel la Baal-Peor, cauzând urgia care ucisese 24.000 de oameni în Numeri 25.",
        "Porunca lui Moise, dură și tulburătoare pentru cititorul modern, urma logica războiului sfânt în acest context specific: femeile responsabile de ademenirea idolatră și sexuală nu puteau rămâne în mijlocul lui Israel fără riscul repetării aceleiași tragedii care amenințase întreg poporul.",
      ),
      words: [],
      crossRefs: ["Numeri 25:1-9"],
      forYourHeart:
        "Sfatul care a cauzat o dată pierzarea poporului lui Dumnezeu nu poate fi tratat cu îngăduință a doua oară, fără riscul repetării aceleiași pierzanii.",
    },
    {
      id: "numeri-31-19-24",
      ref: "Numeri 31:19-24",
      heading: "Curățirea rituală după război",
      text: numeriPassage(31, 19, 24),
      teaching: teaching(
        "Cei ce s-au întâlnit cu moartea în război trebuiau să stea „șapte zile afară din tabără” și să se curețe la zilele a treia și a șaptea, după legea deja stabilită despre contactul cu morții (Numeri 19). Chiar și hainele, uneltele și vasele capturate necesitau curățire.",
        "Preotul Eleazar detaliază procedura pentru metale: cele care rezistă la foc — aur, argint, aramă, fier, cositor, plumb — se trec prin foc și apoi prin apa de curățire, iar cele care nu rezistă la foc se curăță doar prin apă, arătând că nici prada de război nu putea fi folosită fără să fie întâi sfințită înaintea DOMNULUI.",
      ),
      words: [],
      crossRefs: ["Numeri 19:11-19"],
      forYourHeart:
        "Nici câștigurile obținute prin biruință nu pot fi folosite fără discernământ; ele trebuie mai întâi curățite și sfințite înaintea DOMNULUI.",
    },
    {
      id: "numeri-31-25-31",
      ref: "Numeri 31:25-31",
      heading: "Rânduiala împărțirii prăzii",
      text: numeriPassage(31, 25, 31),
      teaching: teaching(
        "DOMNUL stabilește o împărțire echilibrată a prăzii: jumătate pentru luptătorii care au mers la război, jumătate pentru întreaga adunare care a rămas în tabără. Din fiecare jumătate se prelevă un tribut către DOMNUL și către leviți — un suflet din cinci sute de la luptători, unul din cincizeci de la adunare.",
        "Această proporție diferită — tribut mai mare de la luptători (1/500) față de adunare (1/50, care sună mai mare, dar se aplică la o jumătate mai mare) — arată grijă pentru echitate: cei care au riscat viața în luptă primesc o parte mai mare din pradă, dar toți contribuie la susținerea leviilor și închinării DOMNULUI.",
      ),
      words: [],
      crossRefs: ["Numeri 18:21-24"],
      forYourHeart:
        "Chiar în împărțirea binecuvântărilor, un loc trebuie rezervat totdeauna pentru susținerea slujirii DOMNULUI și a celor care o poartă.",
    },
    {
      id: "numeri-31-32-41",
      ref: "Numeri 31:32-41",
      heading: "Numărătoarea totală și partea leviților",
      text: numeriPassage(31, 32, 41),
      teaching: teaching(
        "Cifrele finale sunt uluitoare: 675.000 de oi, 72.000 de taurini, 61.000 de măgari și 32.000 de tinere femei madianite care nu cunoscuseră împreunarea cu bărbat. Această abundență de pradă arată că Madianul era o națiune înstărită, iar victoria lui Israel a fost totală și decisivă.",
        "Din jumătatea luptătorilor, tributul pentru DOMNUL a fost precis calculat: 675 de oi, 72 de taurini, 61 de măgari și 32 de suflete, transmis toate prin Moise către preotul Eleazar — o evidență exactă, fără nicio abatere de la porunca DOMNULUI.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Precizia și corectitudinea în gestionarea binecuvântărilor materiale sunt o formă de fidelitate față de DOMNUL, la fel de importantă ca fidelitatea în lucrurile spirituale.",
    },
    {
      id: "numeri-31-42-47",
      ref: "Numeri 31:42-47",
      heading: "Jumătatea adunării și tributul către leviți",
      text: numeriPassage(31, 42, 47),
      teaching: teaching(
        "Jumătatea cuvenită întregii adunări — cei care nu au mers la război — este identică numeric cu jumătatea luptătorilor, arătând că tot poporul participă egal la binecuvântarea victoriei, indiferent dacă a luptat direct sau nu.",
        "Din această jumătate, Moise a luat una din cincizeci pentru leviții „care păzeau Cortul DOMNULUI” — confirmând încă o dată că slujirea continuă la Cort era susținută din binecuvântările întregului popor, nu doar dintr-o parte a lui.",
      ),
      words: [],
      crossRefs: ["Numeri 18:21-24"],
      forYourHeart:
        "Cei care nu participă direct la o luptă pot totuși împărtăși binecuvântarea ei, pentru că victoria aparține întregului popor al lui Dumnezeu, nu doar celor de pe front.",
    },
    {
      id: "numeri-31-48-52",
      ref: "Numeri 31:48-52",
      heading: "Ofranda de aur a căpeteniilor",
      text: numeriPassage(31, 48, 52),
      teaching: teaching(
        "Căpeteniile oștirii se apropie de Moise cu o veste remarcabilă: „nu lipsește niciun om dintre noi” — o victorie completă, fără nicio pierdere de viață israelită. Ca răspuns de recunoștință, aduc de bunăvoie obiectele de aur găsite ca pradă „ca să se facă ispășire pentru sufletele noastre înaintea DOMNULUI”.",
        "Această ofrandă voluntară, pe lângă tributul deja stabilit prin poruncă, arată recunoștință spontană: căpeteniile nu doar ascultă porunca, ci răspund cu generozitate personală pentru protecția miraculoasă primită în luptă.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Protecția fără pierderi într-o încercare grea merită un răspuns de recunoștință care merge dincolo de simpla ascultare, către generozitate spontană.",
    },
    {
      id: "numeri-31-53-54",
      ref: "Numeri 31:53-54",
      heading: "Concluzia: aducere aminte înaintea DOMNULUI",
      text: numeriPassage(31, 53, 54),
      teaching: teaching(
        "Capitolul se încheie simplu: oamenii de război „luaseră fiecare pradă pentru sine”, dar aurul căpeteniilor a fost dus în Cortul Întâlnirii „ca aducere aminte pentru fiii lui Israel înaintea DOMNULUI” — un semn permanent al biruinței dăruite de DOMNUL, păstrat în chiar locul închinării.",
      ),
      words: [],
      crossRefs: ["Exod 30:16"],
      forYourHeart:
        "Biruințele pe care Dumnezeu ni le dă merită să fie ținute minte permanent înaintea Lui, ca mărturie a credincioșiei Lui către generațiile care vor veni.",
    },
  ],
  prayer:
    "Doamne, dă-mi înțelepciunea să recunosc că sfatul care a cauzat o dată pierzarea trebuie tratat cu seriozitate deplină, nu cu îngăduință repetată.\n\nÎnvață-mă să gestionez cu precizie și corectitudine binecuvântările pe care mi le dăruiești, fără să uit partea rezervată slujirii Tale.\n\nMulțumescu-Ți pentru fiecare biruință fără pierdere pe care mi-ai dăruit-o și învață-mă să răspund cu recunoștință generoasă, nu doar cu ascultare formală. Amin.",
  status: NUMERI_STATUSES[31],
})
