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

export const NUMERI_26 = numeriChapter({
  number: 26,
  title: "Numeri 26 — Al doilea recensământ al lui Israel",
  summary:
    "După urgia de la Baal-Peor, DOMNUL poruncește un nou recensământ al generației care va intra în Canaan, seminție cu seminție. Recensământul pregătește împărțirea țării prin sorți și confirmă solemn că, din întreaga generație numărată la Sinai patruzeci de ani mai înainte, doar Caleb și Iosua au rămas în viață.",
  literaryContext:
    "Acest al doilea recensământ încheie simbolic era pustiei: generația necredinței de la Cadeș-Barnea (Numeri 13-14) este acum complet înlocuită de o generație nouă, născută sau crescută în pustie, care va intra efectiv în țara făgăduită. Structura reia deliberat forma primului recensământ din Numeri 1, dar rezultatele și scopul diferă: acum recensământul pregătește împărțirea moștenirii, nu organizarea taberei.",
  historicalContext:
    "Sistemul de împărțire prin sorți, combinat cu proporționalitatea mărimii teritoriului față de numărul de oameni, reflectă o înțelegere străveche a dreptății distributive: fiecare seminție primește un teritoriu proporțional cu nevoile ei, dar locația exactă este lăsată în mâna DOMNULUI prin sorți, nu în mâna negocierii omenești.",
  units: [
    {
      id: "numeri-26-1-4",
      ref: "Numeri 26:1-4",
      heading: "Porunca celui de-al doilea recensământ",
      text: numeriPassage(26, 1, 4),
      teaching: teaching(
        "Imediat „după urgie” de la Baal-Peor, DOMNUL poruncește un nou recensământ al bărbaților de la 20 de ani în sus, „buni de mers la război”. Momentul este semnificativ: după judecată vine numărarea, un pas către organizare și pregătire pentru cucerirea Canaanului.",
        "Moise și Eleazar — nu mai Aaron, care a murit la muntele Hor — conduc împreună acest recensământ în câmpiile Moabului, semnalând trecerea autorității preoțești la noua generație de conducători.",
      ),
      words: [],
      crossRefs: ["Numeri 1:1-3", "Numeri 20:28"],
      forYourHeart:
        "După judecată, Dumnezeu pregătește întotdeauna un pas înainte pentru poporul Său; numărarea de aici nu este pedeapsă, ci pregătire pentru moștenire.",
    },
    {
      id: "numeri-26-5-11",
      ref: "Numeri 26:5-11",
      heading: "Ruben și amintirea răscoalei lui Core",
      text: numeriPassage(26, 5, 11),
      teaching: teaching(
        "Recensământul familiilor lui Ruben include o paranteză istorică importantă: Datan și Abiram, strănepoți ai lui Ruben, „erau fruntașii adunării care s-au răzvrătit împotriva lui Moise și a lui Aaron în ceata lui Core”, înghițiți de pământ împreună cu cei două sute cincizeci de oameni.",
        "Detaliul remarcabil este adăugat imediat: „totuși fiii lui Core nu au murit.” Judecata a lovit exact pe cei răspunzători de răzvrătire, dar nu s-a întins automat asupra urmașilor lor — o distincție importantă între vinovăția personală și vina colectivă fără sfârșit.",
      ),
      words: [],
      crossRefs: ["Numeri 16:1-35", "1 Cronici 6:22-38", "Psalmul 106:17"],
      forYourHeart:
        "Judecata lui Dumnezeu este precisă asupra celor răspunzători direct de rău; ea nu se prelungește automat asupra descendenților care nu au participat la păcat.",
    },
    {
      id: "numeri-26-12-27",
      ref: "Numeri 26:12-27",
      heading: "Simeon, Gad, Iuda, Isahar și Zabulon",
      text: numeriPassage(26, 12, 27),
      teaching: teaching(
        "Cinci seminții sunt numărate în succesiune, fiecare cu familiile ei detaliate: Simeon (22.200), Gad (40.500), Iuda (76.500, cea mai numeroasă seminție), Isahar (64.300) și Zabulon (60.500). Textul menționează explicit că Er și Onan, fiii lui Iuda, „au murit în țara Canaan” înainte de intrarea în Egipt, o legătură directă cu istoria din Geneza 38.",
        "Creșterea seminției lui Iuda — devenită cea mai numeroasă dintre toate — pregătește tacit rolul ei de conducere care va urma în istoria lui Israel, culminând cu linia regală a lui David.",
      ),
      words: [],
      crossRefs: ["Geneza 38:1-10", "Geneza 49:8-10"],
      forYourHeart:
        "Fiecare seminție și familie este numărată individual înaintea DOMNULUI — nimeni nu se pierde în mulțimea generală a poporului.",
    },
    {
      id: "numeri-26-28-37",
      ref: "Numeri 26:28-37",
      heading: "Manase, Efraim și fiicele lui Ţelofhad",
      text: numeriPassage(26, 28, 37),
      teaching: teaching(
        "În mijlocul genealogiei lui Manase apare un detaliu care va deveni foarte important în capitolul 27: „Ţelofhad, fiul lui Hefer, nu a avut fii, ci numai fiice; iar numele fiicelor lui Ţelofhad erau Mahla, Noa, Hogla, Milca și Ţirța.” Această mențiune, plasată discret în mijlocul unei liste tehnice, pregătește cererea lor pentru moștenire.",
        "Manase (52.700) și Efraim (32.500), cei doi fii ai lui Iosif, sunt numărați separat ca seminții depline, împlinind binecuvântarea lui Iacov din Geneza 48, prin care fiecare a primit statutul unei seminții în sine.",
      ),
      words: [],
      crossRefs: ["Numeri 27:1-11", "Geneza 48:5-6"],
      forYourHeart:
        "Un detaliu discret plasat într-o genealogie tehnică poate pregăti în tăcere un moment de dreptate viitoare — nimic din Cuvântul lui Dumnezeu nu este pus fără rost.",
    },
    {
      id: "numeri-26-38-50",
      ref: "Numeri 26:38-50",
      heading: "Beniamin, Dan, Așer și Neftali",
      text: numeriPassage(26, 38, 50),
      teaching: teaching(
        "Ultimele patru seminții sunt numărate: Beniamin (45.600), Dan (64.400, printr-o singură familie mare, șuhamiiții), Așer (53.400, cu mențiunea unei fiice, Serah) și Neftali (45.400). Fiecare familie și-a păstrat identitatea distinctă după patruzeci de ani de călătorie prin pustie.",
        "Faptul că numele Serah, fiica lui Așer, este păstrat, ca și cel al fiicelor lui Ţelofhad, arată că recensământul, deși concentrat pe bărbații buni de război, nu ignoră identitățile femeilor importante din istoria familiilor.",
      ),
      words: [],
      crossRefs: ["Geneza 46:17"],
      forYourHeart:
        "Chiar într-un recensământ militar, Dumnezeu păstrează memoria fiecărei persoane importante, dincolo de scopul imediat al numărării.",
    },
    {
      id: "numeri-26-51",
      ref: "Numeri 26:51",
      heading: "Numărul total al lui Israel",
      text: numeriPassage(26, 51, 51),
      teaching: teaching(
        "Totalul final — 601.730 de bărbați buni de război — este surprinzător de apropiat de numărul din primul recensământ de la Sinai (603.550, Numeri 1:46), deși generația era complet diferită. Această stabilitate numerică arată grija continuă a DOMNULUI pentru păstrarea poporului Său, în ciuda pierderilor cauzate de răzvrătiri repetate.",
      ),
      words: [],
      crossRefs: ["Numeri 1:46"],
      forYourHeart:
        "Chiar după patruzeci de ani de judecăți și pierderi, DOMNUL a păstrat poporul Său aproape de numărul cu care a plecat din Sinai — dovadă a credincioșiei Lui continue.",
    },
    {
      id: "numeri-26-52-56",
      ref: "Numeri 26:52-56",
      heading: "Împărțirea țării prin sorți",
      text: numeriPassage(26, 52, 56),
      teaching: teaching(
        "DOMNUL stabilește principiul împărțirii moștenirii: proporțional cu numărul celor numărați — „celor mai numeroși să le dai o moștenire mai mare” — dar locația exactă a teritoriului fiecărei seminții se va decide „prin sorți”, nu prin alegerea sau negocierea oamenilor.",
        "Această combinație — proporționalitate stabilită după număr, dar locație decisă prin sorți — elimină posibilitatea disputelor și a favoritismului: fiecare seminție primește ce merită numeric, dar unde anume, decide DOMNUL prin mijlocul sorții.",
      ),
      words: [],
      crossRefs: ["Iosua 14:1-2", "Proverbe 16:33"],
      forYourHeart:
        "Când împreună proporționalitatea dreptății și suveranitatea lui Dumnezeu decid o moștenire, nu mai rămane loc pentru dispută sau invidie între frați.",
    },
    {
      id: "numeri-26-57-62",
      ref: "Numeri 26:57-62",
      heading: "Recensământul leviților și familia lui Aaron",
      text: numeriPassage(26, 57, 62),
      teaching: teaching(
        "Leviții sunt numărați separat, după cele trei familii principale: Gherșon, Chehat, Merari. Textul reamintește legătura de familie a lui Moise și Aaron: mama lor, Iochebed, era „fiica lui Levi, care i se născuse lui Levi în Egipt”, iar dintre fiii lui Aaron, Nadab și Abihu „au murit când au adus foc străin înaintea DOMNULUI”.",
        "Leviții, numărați 23.000 de la o lună în sus, „nu au fost numărați în mijlocul fiilor lui Israel, pentru că nu li s-a dat nicio moștenire în mijlocul fiilor lui Israel” — statutul lor rămane special, separat de împărțirea teritorială generală, pentru că moștenirea lor este slujirea la Cortul Întâlnirii.",
      ),
      words: [],
      crossRefs: ["Numeri 3:14-39", "Levitic 10:1-2"],
      forYourHeart:
        "O chemare specială pentru slujire poate înlocui moștenirea pământească obișnuită; slujirea DOMNULUI Însăși este o moștenire aparte.",
    },
    {
      id: "numeri-26-63-65",
      ref: "Numeri 26:63-65",
      heading: "Nicio generație veche, exceptand Caleb și Iosua",
      text: numeriPassage(26, 63, 65),
      teaching: teaching(
        "Concluzia recensământului confirmă solemn împlinirea sentinței de la Cadeș-Barnea: „printre aceștia nu a fost niciunul din bărbații numărați... în pustia Sinai”. DOMNUL zisese că vor muri în pustie, „și nu a rămas niciunul din ei, afară de Caleb, fiul lui Iefune, și Iosua, fiul lui Nun”.",
        "Aceste două excepții nu sunt întâmplătoare: Caleb și Iosua au fost singurii dintre cei doisprezece iscoade care au crezut făgăduința DOMNULUI în Numeri 14. Patruzeci de ani mai târziu, credința lor de atunci este răsplătită cu viață și cu privilegiul de a intra în țara pe care au crezut-o.",
      ),
      words: [],
      crossRefs: ["Numeri 14:6-9,30", "Numeri 32:11-12"],
      forYourHeart:
        "Credința păzită în ziua judecății de la Cadeș a fost răsplătită patruzeci de ani mai târziu; făgăduința lui Dumnezeu pentru cei credincioși nu are termen de expirare.",
    },
  ],
  prayer:
    "Doamne, mulțumescu-Ţi că, după orice judecată, pregătești întotdeauna un pas înainte pentru poporul Tău, spre moștenirea făgăduită.\n\nDă-mi înțelepciunea să văd că judecata Ta este precisă asupra vinovaților și nu se prelungește la nesfârșit asupra generațiilor nevinovate.\n\nÎnvață-mă să trăiesc precum Caleb și Iosua, cu o credință care rămane statornică chiar dacă făgăduința întârzie decenii întregi.\n\nȘi mulțumescu-Ţi că nicio persoană, nici măcar o fiică într-o genealogie tehnică, nu este uitată de Tine. Amin.",
  status: NUMERI_STATUSES[26],
})
