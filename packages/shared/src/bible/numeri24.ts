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

export const NUMERI_24 = numeriChapter({
  number: 24,
  title: "Numeri 24 — Steaua din Iacov și ultimele profeții ale lui Balaam",
  summary:
    "Balaam renunță la ritualurile de ghicire și, sub Duhul lui Dumnezeu, rostește cea mai frumoasă dintre profețiile lui despre Israel. Furios, Balac îl trimite acasă, dar Balaam adaugă o ultimă profeție mesianică despre o stea și un sceptru care se vor ridica din Iacov, apoi vestiri scurte despre Amalec, cheniți și pop oarele din nord.",
  literaryContext:
    "Ultimul dintre cele patru orăcole ale lui Balaam și cel mai important din punct de vedere mesianic: „o stea răsare din Iacov și un sceptru se ridică din Israel” este citată în tradiția iudaică și creștină ca profeție despre un rege viitor, iar tradiția creștină o vede împlinită în Hristos.",
  historicalContext:
    "Amalec, cheniții, Asur și Eber, menționați în profețiile finale, erau popoare și grupuri reale din regiune pe care Israel le va întâlni de-a lungul istoriei sale — Amalec ca vrăjmaș permanent, cheniții ca aliați apropiați (precum socrul lui Moise, Ietro, era chenit), Asur ca imperiul asirian care avea să domine mai târziu Orientul Apropiat.",
  units: [
    {
      id: "numeri-24-1-2",
      ref: "Numeri 24:1-2",
      heading: "Duhul lui Dumnezeu vine peste Balaam",
      text: numeriPassage(24, 1, 2),
      teaching: teaching(
        "Balaam observă că, de două ori la rând, DOMNUL a binecuvântat Israel indiferent de ritual. Renunță la ceremoniile de descantec pe care le folosise înainte și „și-a întors fața spre pustie”, privind direct la tabăra lui Israel fără mediere rituală.",
        "Atunci, fără pregătire ceremonială, „Duhul lui Dumnezeu a venit peste el” — aceeași expresie folosită mai târziu pentru jude jud jud jecatorii lui Israel; Dumnezeu Îl folosește pe Balaam ca instrument profetic direct, dincolo de orice tehnică de ghicire.",
      ),
      words: [],
      crossRefs: ["Judecătorii 3:10"],
      forYourHeart:
        "Dumnezeu poate folosi orice instrument, chiar unul obișnuit să lucreze prin metode greșite, atunci când decide să-și descopere adevărul prin Duhul Său.",
    },
    {
      id: "numeri-24-3-9",
      ref: "Numeri 24:3-9",
      heading: "A treia profeție: frumusețea corturilor lui Israel",
      text: numeriPassage(24, 3, 9),
      teaching: teaching(
        "Balaam se descrie pe sine ca „omul cu ochii deschiși”, „cel ce aude cuvintele lui Dumnezeu”, „căzând la pământ, dar având ochii deschiși” — o descriere a experienței profetice ca o supunere totală fizică, unită cu o claritate spirituală totală.",
        "Frumusețea Israelului este descrisă în imagini de abundență și viață: văi, grădini lângă un râu, cedri lângă ape. Este exact opusul percepției lui Balac despre un popor amenințător — aici Israel este frumos, prosper, binecuvântat, cu un împărat care se va înălța „mai presus de Agag”.",
        "Orăcolul se încheie repetând formula din capitolul precedent: „Binecuvântat să fie cel ce te binecuvântează și blestemat cel ce te blestemă!” — ecoul direct al făgăduinței date lui Avraam în Geneza 12:3.",
      ),
      words: [],
      crossRefs: ["Geneza 12:3", "Geneza 49:9"],
      forYourHeart:
        "Prin ochii lui Dumnezeu, poporul Său nu este o amenințare de temut, ci o grădină vie, plină de frumusețe și binecuvântare, indiferent cum îl văd vrăjmașii.",
    },
    {
      id: "numeri-24-10-11",
      ref: "Numeri 24:10-11",
      heading: "Furia finală a lui Balac",
      text: numeriPassage(24, 10, 11),
      teaching: teaching(
        "Balac „a bătut din palme” de furie — un gest de exasperare totală. Aceasta este a treia binecuvântare pe care o aude în loc de blestem, iar el nu mai are răbdare: „fugi acum în țara ta!”, spunându-i că DOMNUL, nu el, l-a lipsit de cinstea promisă.",
        "Fără să realizeze, Balac confirmă el Însăși suveranitatea DOMNULUI asupra situației: recunoaște că nu Balaam a decis, ci Dumnezeu a controlat totul de la început până la sfârșit.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Furia omenească împotriva planului lui Dumnezeu nu îl schimbă, ci doar dovedește, prin propriile cuvinte ale celui furios, că planul Său a fost împlinit întocmai.",
    },
    {
      id: "numeri-24-12-14",
      ref: "Numeri 24:12-14",
      heading: "Vestirea zilelor din urmă",
      text: numeriPassage(24, 12, 14),
      teaching: teaching(
        "Balaam repetă principiul său constant — nu putea vorbi decât ce punea DOMNUL în gura lui — dar apoi oferă ceva neprevăzut: se oferă să vestească „ce va face poporul acesta poporului tău în zilele din urmă”, depășind cu mult cererea originală a lui Balac.",
        "Această formulă, „zilele din urmă”, semnalează că profeția care urmează nu este doar despre un conflict imediat, ci despre un plan pe termen lung al lui Dumnezeu pentru viitorul lui Israel și al popoarelor din jur.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Planurile lui Dumnezeu pentru poporul Său se întind mult dincolo de conflictul imediat pe care îl vedem în fața noastră astăzi.",
    },
    {
      id: "numeri-24-15-19",
      ref: "Numeri 24:15-19",
      heading: "A patra profeție: steaua din Iacov",
      text: numeriPassage(24, 15, 19),
      teaching: teaching(
        "Această ultimă profeție majoră este cea mai importantă din punct de vedere mesianic: „o stea răsare din Iacov și un sceptru se ridică din Israel”, un Stăpânitor care va zdrobi vrăjmașii — Moabul, Edomul, Seirul — și va domni cu putere.",
        "Balaam însuși recunoaște limita profeției sale: „îl văd, dar nu acum; îl privesc, dar nu de aproape” — vede un viitor îndepărtat, dincolo de propria lui viață. Tradiția iudaică și creștină au văzut în această stea și acest sceptru o prefigurare a unui rege mesianic, împlinită în cele din urmă în Hristos.",
      ),
      words: [],
      crossRefs: ["Matei 2:2", "Apocalipsa 22:16", "Geneza 49:10"],
      forYourHeart:
        "Chiar un profet păgân, fără să înțeleagă pe deplin, a fost folosit să vestească venirea unui Stăpânitor pe care doar credința îl poate vedea limpede astăzi.",
    },
    {
      id: "numeri-24-20-22",
      ref: "Numeri 24:20-22",
      heading: "Profețiile despre Amalec și cheniți",
      text: numeriPassage(24, 20, 22),
      teaching: teaching(
        "Balaam adaugă două vestiri scurte și sumbre: Amalec, care „era fruntea neamurilor”, va avea un sfârșit de pieire veșnică — confirmat mai târziu în istoria lui Israel prin conflictele repetate cu acest popor. Cheniții, deși au un „cuib tare” pe stancă, vor fi la rândul lor mistuiți când Asur îi va duce robi.",
        "Aceste profeții scurte arată că puterea sau siguranța pământească a unui popor — fie întâietatea lui Amalec, fie cuibul întărit al cheniților — nu oferă protecție finală împotriva judecății lui Dumnezeu.",
      ),
      words: [],
      crossRefs: ["Exod 17:14-16", "1 Samuel 15:2-3"],
      forYourHeart:
        "Nicio poziție de putere sau siguranță pământească nu poate feri un popor de judecata lui Dumnezeu, atunci când El a hotărât să o aducă.",
    },
    {
      id: "numeri-24-23-25",
      ref: "Numeri 24:23-25",
      heading: "Profeția finală și despărțirea",
      text: numeriPassage(24, 23, 25),
      teaching: teaching(
        "Ultima vestire vine cu un strigăt de groază: „Vai, cine va mai trăi când Dumnezeu va face aceste lucruri?” — corabii de pe țărmul Chitimului vor smeri Asur și Eber, dar „și ei vor pieri veșnic”. Nicio putere omenească, indiferent cât de dominantă, nu scapă în cele din urmă de judecata lui Dumnezeu.",
        "Capitolul se încheie simplu: „Balaam s-a sculat, a plecat și s-a întors în țara lui; iar Balac s-a dus și el pe drumul lui.” Fără blestem, fără recompensă, cei doi se despart — dar profețiile rostite răman valabile mult după această despărțire, indiferent de intențiile lor originale.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Cuvintele pe care Dumnezeu le-a pus în gura unui om răman valabile mult după ce oamenii implicați își despart drumurile și îuită momentul.",
    },
  ],
  prayer:
    "Doamne, dă-mi ochii deschiși ai lui Balaam, dar inima curată pe care el nu a avut-o întotdeauna, ca să văd frumusețea poporului Tău așa cum o vezi Tu.\n\nMulțumescu-Ţi pentru steaua care a răsărit din Iacov și sceptrul care s-a ridicat din Israel — Hristos, împlinirea acestei făgăduințe văzute de departe.\n\nÎnvață-mă să nu mă încred în puterea sau siguranța pământească, ci în judecata și în binecuvântarea Ta, care răman valabile dincolo de orice despărțire omenească. Amin.",
  status: NUMERI_STATUSES[24],
})
