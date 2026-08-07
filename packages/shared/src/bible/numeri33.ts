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

export const NUMERI_33 = numeriChapter({
  number: 33,
  title: "Numeri 33 — Cronica popasurilor și porunca cuceririi",
  summary:
    "Moise scrie, la porunca DOMNULUI, cronica întregii călătorii prin pustie — patruzeci de ani îndesați într-o listă de popasuri. Capitolul se încheie cu porunca solemnă dată înainte de trecerea Iordanului: izgonirea completă a locuitorilor Canaanului, altfel ei vor deveni „niște spini în ochi și niște ghimpi în coaste”.",
  literaryContext:
    "Această listă de popasuri funcționează ca un rezumat oficial al Cărții Numeri, o mărturie scrisă despre credincioșia DOMNULUI care a călăuzit poporul prin toate aceste locuri, de la robie la pragul țării făgăduite. Ea pregătește tranziția către instrucțiunile finale din Numeri 34-36 și către cartea Deuteronom.",
  historicalContext:
    "Moartea lui Aaron pe muntele Hor, în al patruzecilea an de la ieșirea din Egipt, marchează sfârșitul unei generații și punctul în care călătoria se apropie de final; Israel se afla deja aproape de intrarea în Canaan, la câmpiile Moabului.",
  units: [
    {
      id: "numeri-33-1-4",
      ref: "Numeri 33:1-4",
      heading: "Introducere: cronica scrisă din porunca DOMNULUI",
      text: numeriPassage(33, 1, 4),
      teaching: teaching(
        "Moise „a scris locurile lor de plecare, popas după popas, după porunca DOMNULUI” — aceasta nu este o simplă listă geografică, ci un act de ascultare și mărturie, păstrat pentru generațiile viitoare ca dovadă a călăuzirii DOMNULUI prin fiecare etapă a pustiei.",
        "Amintirea ieșirii „cu mână înaltă, sub ochii tuturor egiptenilor” și a judecăților DOMNULUI „împotriva zeilor lor” reconfirmă încă o dată, la finalul cărții, că această călătorie a fost întotdeauna o demonstrație a supremației DOMNULUI asupra puterilor Egiptului.",
      ),
      words: [],
      crossRefs: ["Exod 12:37-42", "Exod 12:12"],
      forYourHeart:
        "Păstrarea în scris a călăuzirii lui Dumnezeu prin viață este un dar pentru cei ce vor veni după noi, o mărturie a credincioșiei Lui prin fiecare etapă.",
    },
    {
      id: "numeri-33-5-14",
      ref: "Numeri 33:5-14",
      heading: "De la Rameses la Refidim",
      text: numeriPassage(33, 5, 14),
      teaching: teaching(
        "Fiecare popas este notat cu simplitate: „Au pornit din... și au tăbărât la...”, o formulă repetată constant care arată că fiecare etapă, oricât de mică aparent, a fost demnă de a fi înregistrată înaintea DOMNULUI.",
        "Locuri deja cunoscute din Exod — Sucot, Etam, Pi-Hahirot, Marea Roșie, Mara, Elim, pustia Sin, Refidim — sunt trecute în revistă rapid, ca o hartă concentrată a primelor luni de libertate, incluzând și locul unde „porporul nu a avut apă de băut”, o amintire a încercării timpurii a credinței lor.",
      ),
      words: [],
      crossRefs: ["Exod 15:22-27", "Exod 17:1-7"],
      forYourHeart:
        "Fiecare etapă a vieții noastre, chiar cele care ni se par nesemnificative, face parte dintr-o poveste mai mare pe care Dumnezeu o ține minte cu grijă.",
    },
    {
      id: "numeri-33-15-26",
      ref: "Numeri 33:15-26",
      heading: "De la Sinai la Machilot",
      text: numeriPassage(33, 15, 26),
      teaching: teaching(
        "După popasul lung la Sinai — locul legământului și al primirii Legii — călătoria continuă printr-o serie de locuri care nu mai apar în alte pasaje biblice: Chibrot-Hataava, Hațerot, Ritma, Rimon-Pereț, Libna, Risa, Kehelata, muntele Șefer, Harada, Machilot.",
        "Această lungă listă de nume necunoscute cititorului modern ne amintește că marea majoritate a celor patruzeci de ani în pustie a fost formată din etape obișnuite, fără evenimente dramatice consemnate, dar totuși sub călăuzirea continuă a DOMNULUI.",
      ),
      words: [],
      crossRefs: ["Exod 19:1-2"],
      forYourHeart:
        "Nu toate etapele credinței sunt marcate de evenimente dramatice; multe sunt simple popasuri de înaintare tăcută sub ochiul lui Dumnezeu.",
    },
    {
      id: "numeri-33-27-37",
      ref: "Numeri 33:27-37",
      heading: "De la Tahat la muntele Hor",
      text: numeriPassage(33, 27, 37),
      teaching: teaching(
        "Lista continuă prin Tahat, Terah, Mitca, Hașmona, Moserot, Bene-Iaacan, Hor-Hagidgad, Iotbata, Abrona, Ețion-Geber, până la pustia Țin, adică Cadeș — locul unde iscoadele fuseseră trimise și unde generația necredincioasă a fost condamnată la patruzeci de ani de umblărie.",
        "De la Cadeș, poporul ajunge la muntele Hor, la marginea țării Edomului — loc care va deveni scena unui alt eveniment solemn, moartea marelui preot Aaron.",
      ),
      words: [],
      crossRefs: ["Numeri 13:26", "Numeri 20:1"],
      forYourHeart:
        "Călătoria noastră cu Dumnezeu trece adesea prin aceleași locuri ale trecutului, dar cu o inimă schimbată față de cea cu care am pornit prima dată.",
    },
    {
      id: "numeri-33-38-40",
      ref: "Numeri 33:38-40",
      heading: "Moartea lui Aaron",
      text: numeriPassage(33, 38, 40),
      teaching: teaching(
        "Aaron moare pe muntele Hor „în al patruzecilea an de la ieșirea fiilor lui Israel din țara Egiptului”, la o sută douăzeci și trei de ani — o precizare cronologică exactă care marchează sfârșitul erei preoției sale și, simbolic, sfârșitul unei întregi generații.",
        "Menționarea imediată a împăratului Aradului canaanit, care „a auzit de sosirea fiilor lui Israel”, semnalează că lumea din jur încă privea Israel ca pe o forță de temut, chiar în timp ce poporul încă plângea moartea marelui său preot.",
      ),
      words: [],
      crossRefs: ["Numeri 20:22-29"],
      forYourHeart:
        "Moartea unui slujitor credincios este un moment de doliu real, dar viața și chemarea poporului lui Dumnezeu continuă dincolo de pierderea lui.",
    },
    {
      id: "numeri-33-41-49",
      ref: "Numeri 33:41-49",
      heading: "De la Țalmona la câmpiile Moabului",
      text: numeriPassage(33, 41, 49),
      teaching: teaching(
        "Ultimele popasuri — Țalmona, Punon, Obot, Iie-Abarim la hotarul Moabului, Dibon-Gad, Almon-Diblataim, munții Abarim — duc poporul până în câmpiile Moabului, „lângă Iordan, în fața Ierihonului”, chiar locul unde se află acum întreaga carte Numeri în momentul ei final.",
        "Această ultimă tabără, „de la Bet-Ieșimot până la Abel-Șitim”, este și locul de unde va începe cartea Deuteronom, unde Moise își va ține ultimele cuvântări înainte de moartea sa. Textul notează, fără explicație, o schimbare a numelui locului Iie-Abarim în „Iim” la trecerea de la un verset la altul — o particularitate a textului sursă pe care o semnalăm, fără să o corectăm.",
      ),
      words: [],
      crossRefs: ["Deuteronom 1:1-5"],
      forYourHeart:
        "Chiar la finalul unei călătorii lungi, Dumnezeu știe exact unde ne aduce, pregătind deja pasul următor înainte ca noi să-l vedem.",
    },
    {
      id: "numeri-33-50-56",
      ref: "Numeri 33:50-56",
      heading: "Porunca cuceririi și împărțirii țării",
      text: numeriPassage(33, 50, 56),
      teaching: teaching(
        "DOMNUL dă porunca finală înainte de trecerea Iordanului: izgonirea completă a locuitorilor Canaanului și nimicirea „tuturor icoanelor de piatră”, „tuturor chipurilor turnate” și a „tuturor înălțimilor” — o curățire radicală a țării de orice formă de idolatrie.",
        "Avertismentul este direct și grafic: dacă nu izgonesc pe locuitori, aceștia vor fi „ca niște spini în ochi și ca niște ghimpi în coaste” care vor hărțui poporul în propria lui țară. Împărțirea țării prin sorți, proporțional cu numărul familiilor, arată încă o dată grija DOMNULUI pentru o dreptate echitabilă.",
      ),
      words: [],
      crossRefs: ["Iosua 23:12-13"],
      forYourHeart:
        "Compromisul cu ceea ce trebuia înlăturat complet din viața noastră se transformă mai târziu în sursă de durere continuă, la fel cum spinii și ghimpii nu pot fi ignorați.",
    },
  ],
  prayer:
    "Doamne, învață-mă să țin minte cu recunoștință fiecare etapă a călăuzirii Tale în viața mea, chiar și cele care par obișnuite și lipsite de însemnătate.\n\nDă-mi curajul să nu las nimic din vechea idolatrie sau compromis în viața mea, ca nu cumva să devină mai târziu spini în ochi și ghimpi în coaste.\n\nMulțumescu-Ți pentru fiecare slujitor credincios pe care l-ai pus în viața mea și învață-mă să continui înainte cu încredere, chiar după ce ei nu mai sunt cu mine. Amin.",
  status: NUMERI_STATUSES[33],
})
