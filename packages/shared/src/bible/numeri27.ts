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

export const NUMERI_27 = numeriChapter({
  number: 27,
  title: "Numeri 27 — Fiicele lui Țelofhad și numirea lui Iosua",
  summary:
    "Cinci fiice curajoase cer o moștenire pentru familia tatălui lor mort fără fii, iar DOMNUL le dă dreptate și stabilește o lege permanentă a moștenirii. Apoi DOMNUL îi anunță lui Moise moartea sa viitoare pe muntele Abarim și îl îndrumă să-l numească solemn pe Iosua drept urmașul său înaintea întregii adunări.",
  literaryContext:
    "Acest capitol împleteaște două teme aparent separate — dreptatea pentru fiicele lui Țelofhad și pregătirea succesiunii conducerii — dar amândouă privesc spre viitorul lui Israel în țara făgăduită: cine va moșteni pământul și cine va conduce poporul când Moise nu va mai fi.",
  historicalContext:
    "Dreptul de moștenire prin linia bărbătească era norma în lumea antică din Orientul Apropiat; cererea fiicelor lui Țelofhad și răspunsul pozitiv al DOMNULUI reprezintă o ajustare notabilă a acestei norme, motivată explicit de dreptate față de o familie fără fii, nu de o schimbare generală a ordinii sociale.",
  units: [
    {
      id: "numeri-27-1-4",
      ref: "Numeri 27:1-4",
      heading: "Fiicele lui Țelofhad cer o moștenire",
      text: numeriPassage(27, 1, 4),
      teaching: teaching(
        "Mahla, Noa, Hogla, Milca și Țirța se înfățișează curajos „înaintea lui Moise, înaintea preotului Eleazar, înaintea căpeteniilor și înaintea întregii adunări” — o acțiune publică, nu o cerere ascunsă, într-o societate în care femeile nu aveau de obicei dreptul de a cere moștenire.",
        "Argumentul lor este simplu și drept: tatăl lor „a murit pentru propriul lui păcat” (probabil ca alți din generația pustiei), nu ca răzvrătit al lui Core, și nu a avut fii. Cererea lor nu este pentru privilegiu, ci pentru păstrarea numelui tatălui lor în mijlocul familiei: „de ce să piară numele tatălui nostru?”",
      ),
      words: [],
      crossRefs: ["Numeri 26:33", "Numeri 16:1-35"],
      forYourHeart:
        "Cererea dreaptă, adusă deschis și cu respect înaintea autorității potrivite, poate schimba legea însăși atunci când Dumnezeu o consideră dreaptă.",
    },
    {
      id: "numeri-27-5-7",
      ref: "Numeri 27:5-7",
      heading: "DOMNUL le dă dreptate",
      text: numeriPassage(27, 5, 7),
      teaching: teaching(
        "Moise nu decide de la sine, ci „a adus cauza lor înaintea DOMNULUI” — un exemplu de conducere care recunoaște limita propriei autorități și caută hotărârea finală la DOMNUL. Răspunsul este imediat și clar: „fiicele lui Țelofhad au dreptate.”",
        "DOMNUL nu doar aprobă cererea, ci poruncește acțiunea concretă: „să le dai neapărat o moștenire” și „să le strămuți moștenirea tatălui lor” — o transferare legală formală, nu doar o îngăduință verbală.",
      ),
      words: [],
      crossRefs: [],
      forYourHeart:
        "Dumnezeu ascultă și răspunde la cererile drepte ale celor care par lipsiți de putere în sistemul lor social; dreptatea Lui nu este limitată de convențiile omenești.",
    },
    {
      id: "numeri-27-8-11",
      ref: "Numeri 27:8-11",
      heading: "Legea permanentă a moștenirii",
      text: numeriPassage(27, 8, 11),
      teaching: teaching(
        "Cazul particular al fiicelor lui Țelofhad devine ocazia unei legi generale, permanente: o „orânduială de drept pentru fiii lui Israel” care stabilește ordinea succesiunii în absența fiilor — mai întâi fiicele, apoi frații, apoi frații tatălui, apoi ruda cea mai apropiată.",
        "Această lege arată că dreptatea individuală făcută pentru cinci femei anume a devenit un principiu care va proteja mulți alții în viitor — un exemplu de justiție particulară care se transformă în lege generală.",
      ),
      words: [],
      crossRefs: ["Numeri 36:1-9"],
      forYourHeart:
        "Un act de dreptate făcut pentru o singură familie poate deveni, prin voia lui Dumnezeu, o protecție permanentă pentru mulți alții care vor veni după ea.",
    },
    {
      id: "numeri-27-12-14",
      ref: "Numeri 27:12-14",
      heading: "Vestirea morții viitoare a lui Moise",
      text: numeriPassage(27, 12, 14),
      teaching: teaching(
        "DOMNUL îi spune direct lui Moise să se sui pe muntele Abarim și să privească țara făgăduită — dar doar să o privească, pentru că „după ce o vei privi, vei fi adăugat și tu la poporul tău, cum a fost adăugat fratele tău Aaron”.",
        "Motivul este reamintit fără înconjur: răzvrătirea de la Meriba, în pustia Țin (Numeri 20:1-13), când Moise nu a sfințit pe DOMNUL prin apă înaintea poporului. Consecința, anunțată cu ani înainte, se împlinește acum fără amânare sau schimbare.",
      ),
      words: [],
      crossRefs: ["Numeri 20:1-13", "Deuteronom 32:48-52", "Deuteronom 34:1-5"],
      forYourHeart:
        "Consecințele unei singure clipe de necredință în fața poporului pot dura o viață întreagă, chiar pentru un conducător la fel de credincios ca Moise.",
    },
    {
      id: "numeri-27-15-17",
      ref: "Numeri 27:15-17",
      heading: "Moise cere un păstor pentru popor",
      text: numeriPassage(27, 15, 17),
      teaching: teaching(
        "În loc să se plângă de propria soartă, Moise își îndreaptă imediat atenția către viitorul poporului: cere DOMNULUI, „Dumnezeul duhurilor oricărui trup”, să rânduiască un urmaș „pentru ca adunarea DOMNULUI să nu fie ca niște oi care nu au păstor”.",
        "Această grijă dezinteresată, chiar în fața propriei morți anunțate, arată caracterul unui conducător adevărat: nu își asigură propria continuitate sau propria succesiune familială, ci binele poporului dincolo de viața lui personală.",
      ),
      words: [],
      crossRefs: ["Ioan 10:11-14"],
      forYourHeart:
        "Un conducător adevărat se îngrijește de păstorirea poporului dincolo de propria viață, chiar în clipa în care află că sfârșitul lui se apropie.",
    },
    {
      id: "numeri-27-18-21",
      ref: "Numeri 27:18-21",
      heading: "DOMNUL îl alege pe Iosua",
      text: numeriPassage(27, 18, 21),
      teaching: teaching(
        "DOMNUL identifică pe Iosua, fiul lui Nun, ca „om în care este Duhul” — aceeași confirmare care fusese văzută deja de-a lungul întregii călătorii, prin credincioșia lui la Cadeș-Barnea. Numirea trebuia făcută public: „să-l pui să stea înaintea preotului Eleazar și înaintea întregii adunări”, cu „punerea mâinii” ca semn vizibil al transmiterii autorității.",
        "O diferență importantă este notată: Iosua nu va avea același acces direct la DOMNUL prin față în față precum Moise, ci „se va înfățișa înaintea preotului Eleazar, care va întreba pentru el hotărârea Urimului” — o conducere mediată prin preoție, deosebită de relația unică pe care Moise a avut-o cu DOMNUL.",
      ),
      words: [],
      crossRefs: ["Deuteronom 34:9", "Exod 33:11"],
      forYourHeart:
        "Fiecare conducător pe care Dumnezeu îl ridică primește o măsură proprie de autoritate și acces la El, potrivită chemării lui specifice, nu identică cu a predecesorului său.",
    },
    {
      id: "numeri-27-22-23",
      ref: "Numeri 27:22-23",
      heading: "Numirea publică a lui Iosua",
      text: numeriPassage(27, 22, 23),
      teaching: teaching(
        "Moise ascultă fără șovăire: „a făcut cum îi poruncise DOMNUL”, l-a luat pe Iosua și l-a așezat înaintea preotului Eleazar și înaintea întregii adunări, punându-și mâinile peste el și dându-i porunci, „așa cum vorbise DOMNUL prin Moise”.",
        "Acest gest simplu și public încheie capitolul cu o notare de continuitate: conducerea lui Israel nu se întrerupe la moartea unui om, ci trece înainte, prin voia expresă a DOMNULUI, către urmașul pe care El Însăși l-a pregătit.",
      ),
      words: [],
      crossRefs: ["Iosua 1:1-9"],
      forYourHeart:
        "Când încredințezi în ascultare deplină ceea ce Dumnezeu ți-a lăsat în grijă către cel pe care El l-a pregătit, continuitatea lucrării Lui este asigurată.",
    },
  ],
  prayer:
    "Doamne, dă-mi curajul fiicelor lui Țelofhad de a cere dreptate înaintea Ta, indiferent de convențiile lumii din jurul meu.\n\nÎnvață-mă să accept, ca Moise, consecințele propriilor mele greșeli fără cârtire, și totuși să continui să mă îngrijesc de cei din jurul meu până în ultima clipă.\n\nÎți mulțumesc că nu lași niciodată poporul Tău fără păstor și că pregătești mereu urmașul potrivit la timpul potrivit. Amin.",
  status: NUMERI_STATUSES[27],
})
