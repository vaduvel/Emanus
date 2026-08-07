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

export const NUMERI_15 = numeriChapter({
  number: 15,
  title: "Numeri 15 — Legi pentru țara în care veți intra",
  summary:
    "Imediat după sentința celor patruzeci de ani, DOMNUL vorbește despre jertfele care se vor aduce într-o zi în țara făgăduită, despre iertarea greșelii din neștiință și despre gravitatea păcatului cu voință sfidătoare, ilustrată imediat prin cazul celui prins strângând lemne în Sabat. Capitolul se încheie cu porunca ciucurilor cu fir albastru, semn permanent de aducere-aminte a poruncilor DOMNULUI.",
  literaryContext:
    "Contrastul cu capitolul anterior este izbitor: după ce generația de la Sinai tocmai fusese condamnată să moară în pustie, DOMNUL vorbește aici despre „când veți intra în țara locuințelor voastre”, ca și cum intrarea ar fi încă sigură. Făgăduința nu a fost anulată pentru popor în întregime, ci amânată pentru o generație viitoare; legile date aici sunt tocmai dovada acestei siguranțe.",
  historicalContext:
    "Cazul omului prins strângând lemne în Sabat este singura relatare narativă de la mijlocul capitolului, plasată între două secțiuni legislative pentru a ilustra concret distincția între greșeala din neștiință și păcatul cu voință sfidătoare descrisă imediat înainte.",
  units: [
    {
      id: "numeri-15-1-16",
      ref: "Numeri 15:1-16",
      heading: "Jertfele din țara pe care Eu v-o dau",
      text: numeriPassage(15, 1, 16),
      teaching: teaching(
        "Formularea DOMNULUI este remarcabil de încrezătoare: „când veți intra în țara locuințelor voastre, pe care Eu vi o dau”. La doar câteva versete după sentința celor patruzeci de ani, DOMNUL continuă să vorbească despre viitorul acela ca despre un fapt sigur — doar că va fi trăit de o altă generație.",
        "Legile detaliază proporția exactă a darurilor de cereale și băutură care însoțeau fiecare jertfă prin foc, după mărimea animalului: o zecime de efă pentru un miel, două zecimi pentru un berbec, trei zecimi pentru un taur, cu ulei și vin în proporție crescătoare. Fiecare jertfă era însoțită de o dăruire completă — nu doar animalul, ci și hrana și băutura zilei.",
        "Secțiunea se încheie cu o afirmație importantă: „o singură orânduială pentru adunare și pentru străinul care locuiește la voi... cum sunteți voi, așa va fi și străinul înaintea DOMNULUI”. Legea nu făcea deosebire de origine în fața altarului.",
      ),
      words: [],
      crossRefs: ["Levitic 23:13", "Numeri 28:5-8", "Efeseni 2:19"],
      forYourHeart:
        "Chiar în mijlocul unei judecăți grele, Dumnezeu continuă să vorbească despre viitorul Făgăduinței Sale ca despre un fapt sigur — poate nu pentru tine astăzi, dar pentru cei care vin după tine.",
    },
    {
      id: "numeri-15-17-21",
      ref: "Numeri 15:17-21",
      heading: "Prinosul din prima maia",
      text: numeriPassage(15, 17, 21),
      teaching: teaching(
        "O nouă poruncă vine pentru vremea recoltei: „din prima voastră maia să aduceți o turtă ca prinos”, la fel cum se aducea prinosul din arie. Fiecare frământare a pâinii zilnice începea, simbolic, cu o parte dată DOMNULUI mai întâi.",
        "Această poruncă despre pâinea zilnică, nu doar despre jertfele de la altar, arată că sfințenia era chemată să pătrundă în cea mai obișnuită activitate a casei — frământarea aluatului — nu doar în ceremoniile centrale ale Cortului.",
      ),
      words: [],
      crossRefs: ["Deuteronom 26:2", "Romani 11:16"],
      forYourHeart:
        "Sfințenia nu se limitează la momentele solemne de închinare; ea poate pătrunde chiar în cea mai obișnuită activitate zilnică, ca frământarea pâinii.",
    },
    {
      id: "numeri-15-22-29",
      ref: "Numeri 15:22-29",
      heading: "Greșeala din neștiință: iertare pentru adunare și pentru o singură persoană",
      text: numeriPassage(15, 22, 29),
      teaching: teaching(
        "Legea distinge cu grijă între greșeala colectivă și cea individuală. Dacă „toată adunarea” greșește din neștiință, fără să-și dea seama, aduce un taur pentru ardere-de-tot și un țap pentru păcat, iar preotul face ispășire pentru toată adunarea; „i se va ierta”.",
        "Dacă este vorba de o singură persoană, aceasta aduce doar o capră de un an, o jertfă mai mică, potrivită unei singure vieți. În ambele cazuri, legea este aceeași pentru băștinaș și pentru străin: „o singură lege pentru cel ce păcătuiește din neștiință”.",
        "Elementul cheie al acestei secțiuni este cuvântul „din neștiință”, repetat de șapte ori. Ispășirea este oferită tocmai pentru greșelile făcute fără intenție sau cunoștință, nu pentru un păcat asumat cu bună-știință.",
      ),
      words: [
        {
          original: "בִּשְׁגָגָה",
          transliteration: "bishgagah",
          language: "ebraica",
          meaning:
            "din neștiință, din greșeală nein intenționată. Termenul acoperea o greșeală făcută fără cunoștință sau intenție, spre deosebire de păcatul cu „mână înaltă” din unitatea următoare.",
        },
      ],
      crossRefs: ["Levitic 4:1-3", "Luca 23:34", "1 Timotei 1:13"],
      forYourHeart:
        "Dumnezeu face deosebire clară între neglijența din neștiință și răzvrătirea conștientă; caută iertare cu încredere pentru prima, dar nu confunda cea de-a doua cu ea.",
    },
    {
      id: "numeri-15-30-31",
      ref: "Numeri 15:30-31",
      heading: "Voința sfidătoare: hulă fără iertare",
      text: numeriPassage(15, 30, 31),
      teaching: teaching(
        "În contrast direct cu neștiința, legea numește păcatul „cu voință sfidătoare” ca fiind o hulă directă la adresa DOMNULUI: „persoana aceea Îli hultește pe DOMNUL”. Nu este vorba doar de încălcarea unei reguli, ci de un dispreț conștient față de Cel care a dat regula.",
        "Pedeapsa — „persoana aceea va fi nimicită din mijlocul poporului său” — nu are alternativă de jertfă sau ispășire ca în cazul greșelii din neștiință. Cazul care urmează imediat, al omului prins strângând lemne în Sabat, va ilustra concret această categorie de păcat.",
      ),
      words: [
        {
          original: "בְּיָד רָמָה",
          transliteration: "beyad ramah",
          language: "ebraica",
          meaning:
            "cu mână înaltă, cu voință sfidătoare. Expresia denumește un act comis fără frică sau rușine, deschis și conștient, opusul complet al greșelii din neștiință.",
        },
      ],
      crossRefs: ["Evrei 10:26-27", "Marcu 3:29"],
      forYourHeart:
        "Există o diferență reală între a greși fără să știi și a alege conștient să disprețuiști cuvântul lui Dumnezeu. Examinează-ți inima cu sinceritate înainte de a numi o alegere „greșeală nevinovată”.",
    },
    {
      id: "numeri-15-32-36",
      ref: "Numeri 15:32-36",
      heading: "Omul care a strâns lemne în Sabat",
      text: numeriPassage(15, 32, 36),
      teaching: teaching(
        "Imediat după legea despre păcatul cu voință sfidătoare, textul plasează un caz concret: un om este găsit „strângând lemne în ziua Sabatului”. Sabatul fusese deja poruncit limpede în Exod 20 și 31; acest om nu putea pretenții neștiință.",
        "Chiar Moise și Aaron nu știu ce să facă imediat — „l-au pus sub pază, pentru că nu se hotărâse încă ce trebuia să i se facă” — și așteaptă cuvântul direct al DOMNULUI. Chiar și cei mai mari conducători nu improvizează o pedeapsă fără poruncă clară.",
        "Răspunsul DOMNULUI este definitiv: „omul acesta să fie dat la moarte”, iar „toată adunarea” execută sentința împreună, nu doar câțiva. Severitatea acestei aplicări arată cât de serios era considerat un act deschis de dispreț față de o poruncă deja limpede rostită.",
      ),
      words: [],
      crossRefs: ["Exod 31:14-15", "Exod 35:2-3", "Ioan 5:9-10"],
      forYourHeart:
        "Când porunca lui Dumnezeu este deja limpede, alegerea de a o încălca deschis are consecințe diferite de o greșeală făcută din nevinovăție.",
    },
    {
      id: "numeri-15-37-41",
      ref: "Numeri 15:37-41",
      heading: "Ciucurii cu fir albastru — o amintire purtată mereu",
      text: numeriPassage(15, 37, 41),
      teaching: teaching(
        "Capitolul se încheie cu o poruncă pentru întregul popor, purtată zilnic la colțurile hainelor: ciucuri cu un fir albastru, ca și cei condamnați la o greșeală sau la păcat să aibă mereu înaintea ochilor un semn de aducere-aminte, „ca, privindu-l, să vă aduceți aminte de toate poruncile DOMNULUI și să le împliniți”.",
        "Scopul este apărarea de rătăcire: „să nu urmați poftelor inimilor voastre și ochilor voștri care vă duc la infidelitate” — exact ceea ce se întâmplase deja de două ori în capitolele precedente: pofta pentru carne și frica de uriași, amândouă născute din a urma inima și ochii în locul cuvântului DOMNULUI.",
        "Capitolul se încheie cu formula solemnă: „Eu sunt DOMNUL, Dumnezeul vostru, care v-am scos din țara Egiptului ca să fiu Dumnezeul vostru”. Chiar după sentința de patruzeci de ani, DOMNUL Însăși își reafirmă legământul cu poporul, ancorat în aceeași izbăvire din Egipt care nu poate fi ștearsă de eșecul de la Cadeș.",
      ),
      words: [
        {
          original: "צִיצִת",
          transliteration: "tzitzit",
          language: "ebraica",
          meaning:
            "ciucuri, franjuri. Purtate la colțurile hainelor, încă din vremea aceasta, ca amintire vizuală permanentă a poruncilor DOMNULUI, purtată până astăzi în rugăciunea evreiască.",
        },
      ],
      crossRefs: ["Deuteronom 22:12", "Matei 9:20", "Matei 23:5"],
      forYourHeart:
        "Un semn vizibil, purtat zilnic, poate ține trează amintirea poruncilor lui Dumnezeu într-o inimă predispusă să urmeze pofte trecătoare.",
    },
  ],
  prayer:
    "Doamne, mulțumesc-Ți că Făgăduința Ta rămâne sigură chiar și după eșecul meu; ea așteaptă doar generația care Te va urma cu credință.\n\nÎnvață-mă să deosebesc greșeala din neștiință de răzvrătirea conștientă, și dă-mi smerenia de a căuta ispășire când greșesc fără să știu.\n\nPăzește-mă de a urma poftele inimii și ochilor mei în locul cuvântului Tău.\n\nȘi dă-mi un semn statornic, ca ciucurii de altădată, care să-mi aducă mereu aminte de poruncile Tale. Amin.",
  status: NUMERI_STATUSES[15],
})
