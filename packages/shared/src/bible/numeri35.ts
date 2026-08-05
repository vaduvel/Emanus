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

export const NUMERI_35 = numeriChapter({
  number: 35,
  title: "Numeri 35 — Cetățile leviților și cetățile de scăpare",
  summary:
    "DOMNUL rezolvă două nevoi legale distincte: leviții, care nu au primit teritoriu propriu, primesc 48 de cetăți cu pășuni în mijlocul celorlalte seminții, iar șase dintre acestea devin cetăți de scăpare pentru cei care ucid din greșeală, cu legi precise care distinge între omor cu intenție și moarte accidentală.",
  literaryContext:
    "Această lege împlinește promisiunea din Numeri 18:20-24 că leviții vor trăi din slujirea DOMNULUI, nu dintr-o moștenire teritorială proprie, și extinde principiile de dreptate și viață sfântă din Exod 21:12-14 într-un sistem legal complet, aplicabil pe întreg teritoriul cucerit.",
  historicalContext:
    "Cetățile de scăpare erau o soluție unică în lumea antică la răzbunarea de sânge (obicei răspândit în culturile vecine), oferind un loc de refugiu legal până la judecată dreaptă, în loc să lase familiile să se răzbune direct și necontrolat.",
  units: [
    {
      id: "numeri-35-1-8",
      ref: "Numeri 35:1-8",
      heading: "Cetățile leviților și pășunile lor",
      text: numeriPassage(35, 1, 8),
      teaching: teaching(
        "DOMNUL poruncește fiilor lui Israel să dea leviților „cetăți în care să locuiască” și pășuni întinse în jurul lor pentru vitele și averile lor — pentru că leviții nu aveau propriul teritoriu, DOMNUL Se îngrijește concret ca ei să aibă case și mijloace de trai, împrăștiați în mijlocul celorlalte seminții.",
        "Cele patruzeci și opt de cetăți — date proporțional, „mai multe de la cei mai numeroși și mai puține de la cei mai puțini” — însemnau că prezența leviților, cu învățătura și slujirea lor, era răspândită în toată țara, nu concentrată într-un singur loc.",
      ),
      words: [],
      crossRefs: ["Numeri 18:20-24", "Iosua 21:1-8"],
      forYourHeart:
        "Dumnezeu Se îngrijește concret de nevoile celor care își dedică viața slujirii Lui, chiar când ei nu au o moștenire proprie precum ceilalți.",
    },
    {
      id: "numeri-35-9-15",
      ref: "Numeri 35:9-15",
      heading: "Institurea cetăților de scăpare",
      text: numeriPassage(35, 9, 15),
      teaching: teaching(
        "Şase dintre cele patruzeci și opt de cetăți levitice devin cetăți de scăpare — trei dincolo de Iordan, trei în Canaan — unde „să poată fugi ucigașul care a ucis pe cineva din greșeală”, protejat de „răzbunătorul sângelui” până la o judecată dreaptă înaintea adunării.",
        "Aceste cetăți erau disponibile „pentru fiii lui Israel, pentru străin și pentru cel ce locuiește printre ei” — protecția legală nu era limitată doar la israeliți, arătând o dreptate fără discriminare etnică într-un principiu legal remarcabil pentru epoca lui.",
      ),
      words: [],
      crossRefs: ["Deuteronom 19:1-10", "Iosua 20:1-9"],
      forYourHeart:
        "Dreptatea lui Dumnezeu oferă întotdeauna o cale de protecție înainte de judecată, fără să facă diferență între localnic și străin.",
    },
    {
      id: "numeri-35-16-21",
      ref: "Numeri 35:16-21",
      heading: "Uciderea intenționată: pedeapsa cu moartea",
      text: numeriPassage(35, 16, 21),
      teaching: teaching(
        "Legea distinge clar uciderea intenționată: cu o unealtă de fier, cu o piatră care poate ucide, cu o unealtă de lemn, sau prin împingere și lovire „din ură” sau „din dușmănie” — orice acțiune care implică intenția de a ucide este pedepsită cu moartea, fără excepție și fără protecția cetății de scăpare.",
        "Legiuirea, formulată concret cu exemple de unelte și motivații, arată că dreptatea DOMNULUI nu se baza pe o definiție abstractă a crimei, ci pe examinarea reală a intenției din spatele actului.",
      ),
      words: [],
      crossRefs: ["Exod 21:12-14"],
      forYourHeart:
        "Dumnezeu vede dincolo de fapta exterioară, direct în intenția inimii, și judecă după ce se află cu adevărat în spatele fiecărei fapte.",
    },
    {
      id: "numeri-35-22-25",
      ref: "Numeri 35:22-25",
      heading: "Uciderea din greșeală: protecția cetății de scăpare",
      text: numeriPassage(35, 22, 25),
      teaching: teaching(
        "Dacă moartea are loc „fără dușmănie” sau „fără să fi stat la pândă” — un accident real, fără intenție de rău — adunarea trebuie să judece între cel ce a lovit și răzbunătorul sângelui, și să-l izbăvească pe ucigaș din mâna răzbunării personale, trimițându-l înapoi în cetatea de scăpare.",
        "Protecția are o limită clară: „până la moartea marelui preot care a fost uns cu uleiul cel sfânt” — o legătură remarcabilă între eliberarea ucigașului și viața marelui preot, arătând că acesta din urmă avea un rol de mediere între poporul păcătos și restabilirea deplină a păcii.",
      ),
      words: [],
      crossRefs: ["Evrei 9:11-15"],
      forYourHeart:
        "Dumnezeu știe să facă diferența între greșeală fără intenție și rău premeditat, oferind adevărat refugiu celor care nu au căutat să facă rău.",
    },
    {
      id: "numeri-35-26-29",
      ref: "Numeri 35:26-29",
      heading: "Limitele protecției cetății de scăpare",
      text: numeriPassage(35, 26, 29),
      teaching: teaching(
        "Protecția cetății de scăpare are o condiție strictă: ucigașul trebuie să rămână înăuntrul hotarelor ei. Dacă iese și răzbunătorul sângelui îl găsește afară, îl poate ucide fără a fi vinovat de sânge — scăparea nu era o eliberare necondiționată, ci un legământ de rămânere sub protecție până la momentul stăbilit.",
        "După moartea marelui preot, însă, ucigașul se poate întoarce liber „în țara moștenirii sale” — un moment de eliberare completă și definitivă, legat simbolic de moartea celui care mijlocea între Dumnezeu și popor.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Refugiul pe care Dumnezeu ni-l oferă vine cu condiții de rămânere sub protecția Lui; a părăsi acest loc de scăpare înainte de vreme ne expune la pericol.",
    },
    {
      id: "numeri-35-30-34",
      ref: "Numeri 35:30-34",
      heading: "Regulile mărturiei și sfințenia țării",
      text: numeriPassage(35, 30, 34),
      teaching: teaching(
        "Legea cere garanții procesuale ferme: „un singur martor nu va putea depune mărturie” pentru condamnarea la moarte, iar răscumpărarea bănească pentru viața unui ucigaș vinovat este interzisă categoric — viața omenească nu putea fi înlocuită cu bani, indiferent de statutul social al celui vinovat.",
        "Motivația teologică din final este profundă: „sângele spurcă țara” și nu se poate face ispășire pentru sângele nevărsat încă decis decât prin sângele celui vinovat, pentru că DOMNUL „Eu sunt DOMNUL care locuiesc în mijlocul fiilor lui Israel” — sfințenia țării era direct legată de prezența DOMNULUI în mijlocul poporului.",
      ),
      words: [],
      crossRefs: ["Deuteronom 19:15", "Geneza 9:5-6"],
      forYourHeart:
        "Prezența lui Dumnezeu într-o comunitate cere sfințenie autentică; nedreptatea și sângele nevărsat după dreptate spurcă locul în care El locuiește.",
    },
  ],
  prayer:
    "Doamne, mulțumescu-Ți că Te îngrijești concret de cei care își dedică viața slujirii Tale, chiar când ei nu au o moștenire proprie precum ceilalți.\n\nÎnvață-mă să văd dincolo de fapta exterioară, direct în intenția inimii, și dă-mi înțelepciunea de a face diferența între greșeală și rău premeditat.\n\nAjută-mă să rămân sub protecția Ta, fără să ies din locul de scăpare pe care mi l-ai dat, și să trăiesc cu sfințenie în prezența Ta. Amin.",
  status: NUMERI_STATUSES[35],
})
