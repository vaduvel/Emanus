import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_29 = deuteronomChapter({
  number: 29,
  title: "Deuteronom 29 — Legământul reînnoit în țara Moabului, pentru toți — prezenți și viitori",
  summary:
    "Moise reamintește minunile văzute și inima care încă nu percepe deplin, extinde legământul asupra generațiilor viitoare, avertizează împotriva idolatriei ascunse ca rădăcină de otravă, și încheie cu distincția dintre ce este ascuns și ce este descoperit.",
  literaryContext:
    "Acest capitol începe secțiunea finală a legământului în țara Moabului, distinct de cel de la Horeb, și pregătește apelul culminant din capitolul 30 la alegerea vieții, printr-o privire retrospectivă asupra istoriei răscumpărării și un avertisment ferm împotriva apostaziei individuale ascunse.",
  historicalContext:
    "Legământul în țara Moabului este semnificativ pentru că reprezintă o generație nouă — aceea care nu a fost prezentă la Horeb, dar a văzut minunile din pustie — înnoind angajamentul chiar înainte de intrarea în țara promisă.",
  units: [
    {
      id: "deuteronom-29-1-8",
      ref: "Deuteronom 29:1-8",
      heading: "Minunile văzute, inima care încă nu percepe",
      text: deuteronomPassage(29, 1, 8),
      teaching: teaching(
        "Moise reamintește minunile văzute cu ochii proprii în Egipt și în pustie — hrana care nu s-a împuținat, hainele care nu s-au învechit — dar constată direct: „DOMNUL nu v-a dat o inimă ca să pricepeți, nici ochi ca să vedeți, nici urechi ca să auziți, până în ziua de astăzi”.",
        "Acest verset surprinzător arată că martori direcți ai minunilor pot totuși rămâne fără înțelegere spirituală profundă — experiența senzorială, fără lucrarea internă a lui Dumnezeu în inimă, nu produce automat cunoștință reală de El.",
      ),
      words: [
        {
          original: "ולא-נתן יהוה לכם לב לדעת",
          transliteration: "velo natan YHWH lakhem lev lada'at",
          language: "ebraica",
          meaning:
            "și DOMNUL nu v-a dat o inimă ca să știți/percepeți. Constatarea directă că percepția spirituală profundă este un dar dat de Dumnezeu, nu doar rezultatul automat al experienței senzoriale a minunilor.",
        },
      ],
      crossRefs: ["Romani 11:8", "Ieremia 5:21", "Matei 13:14-15"],
      forYourHeart:
        "A vedea minunile lui Dumnezeu nu însceamănă automat a-L cunoaște profund; cere și lucrarea Lui în inima ta.",
    },
    {
      id: "deuteronom-29-9-15",
      ref: "Deuteronom 29:9-15",
      heading: "Legământul, extins asupra celor prezenți și asupra celor viitori",
      text: deuteronomPassage(29, 9, 15),
      teaching: teaching(
        "Toți sunt incluși în reînnoirea legământului — căpeteniile, bătrânii, pruncii, nevestele, străinul, „de la tăietorul tău de lemne până la scoaterea tău de apă”. Nici o categorie socială nu este exclusă din angajamentul cu DOMNUL.",
        "Cel mai remarcabil este extensia temporală: „atât cu cel ce este astăzi aici cu noi... cât și cu cel ce nu este astăzi aici cu noi”. Legământul îi obligă pe generațiile viitoare, care nu erau fizic prezente, dar sunt totuși parte a acordului încheiat în numele lor.",
      ),
      words: [
        {
          original: "ואת אשר איננו פה עמנו היום",
          transliteration: "ve'et asher einenu poh imanu hayom",
          language: "ebraica",
          meaning:
            "și cu cel ce nu este astăzi aici cu noi. Formula care extinde legământul către generațiile viitoare, incluzându-le în obligația de ascultare stabilită în acest moment istoric.",
        },
      ],
      crossRefs: ["Faptele Apostolilor 2:39", "Ieremia 31:31-33", "Deuteronom 5:2-3"],
      forYourHeart:
        "Legământul lui Dumnezeu nu se limitează la o singură generație; el ține și pentru cei care încă nu s-au născut.",
    },
    {
      id: "deuteronom-29-16-21",
      ref: "Deuteronom 29:16-21",
      heading: "Avertisment împotriva idolatriei ascunse, rădăcina de otravă",
      text: deuteronomPassage(29, 16, 21),
      teaching: teaching(
        "Moise avertizează explicit împotriva unei rădăcini individuale de apostazie — „să nu fie printre voi nicio rădăcină care să rodească otravă și pelin” — chiar dacă restul comunității este devotată legământului.",
        "Cel mai periculos caz descris este auto-înșelăciunea: cineva care aude blestemele și „se va binecuvânta în inima lui” zicând că va avea pace în propria încăpățânare. DOMNUL „nu va voi să-l ierte” pe unul ca acesta — încăpățânarea conștientă față de avertisment clar este tratată cu maximă seriozitate.",
      ),
      words: [
        {
          original: "שרש פרה ראש ולענה",
          transliteration: "shoresh poreh rosh vela'anah",
          language: "ebraica",
          meaning:
            "rădăcină care rodește otravă și pelin. Imagine botanică pentru apostazia care se dezvoltă ascuns, invizibil la suprafață, dar care roade și molipsește în profunzime.",
        },
      ],
      crossRefs: ["Evrei 12:15", "Iov 8:12-13", "Fapte 8:23"],
      forYourHeart:
        "Auto-înșelăciunea tăcută, care crede că va scăpa cu bine din încăpățânare, este cel mai periculos fel de îndepărtare de Dumnezeu.",
    },
    {
      id: "deuteronom-29-22-29",
      ref: "Deuteronom 29:22-29",
      heading: "Devastarea viitoare ca mărturie, lucrurile ascunse și cele descoperite",
      text: deuteronomPassage(29, 22, 29),
      teaching: teaching(
        "Generațiile viitoare, văzând țara arsă „ca la dărâmarea Sodomei”, vor întreba mirate: „pentru ce a făcut DOMNUL astfel acestei țări?” Iar răspunsul dat este clar: „pentru că au părăsit legământul DOMNULUI... să slujească alți dumnezei”. Devastarea nu este arbitrară, ci consecință previzibilă a apostaziei.",
        "Capitolul se încheie cu o distincție importantă: „lucrurile ascunse sunt ale DOMNULUI... iar lucrurile descoperite sunt ale noastre... ca să împlinim toate cuvintele acestei Legi”. Israel nu este chemat să speculeze asupra tainelor lui Dumnezeu, ci să asculte de ce a fost deja descoperit clar.",
      ),
      words: [
        {
          original: "הנסתרת... והנגלת",
          transliteration: "hannistarot ... vehanniglot",
          language: "ebraica",
          meaning:
            "lucrurile ascunse... și cele descoperite. Distincția care limitează responsabilitatea lui Israel la ce a fost revelat clar, fără a autoriza speculația teologică asupra tainelor nedescoperite.",
        },
      ],
      crossRefs: ["Geneza 19:24-25", "Romani 11:33", "1 Corinteni 4:6"],
      forYourHeart:
        "Chemarea ta nu este să dezlegi toate tainele lui Dumnezeu, ci să împlinești cu credincioșie ce ți-a fost deja descoperit clar.",
    },
  ],
  prayer:
    "Doamne, dă-ne o inimă care să priceapă cu adevărat, nu doar ochi care văd minunile Tale fără înțelegere.\n\nAjută-ne să înțelegem că legământul Tău ne ține legat de generațiile viitoare, nu doar de noi însine.\n\nPăzește-ne de rădăcinile ascunse de îndepărtare, și de încăpățânarea care crede că va scăpa nepedepsită.\n\nȘi învață-ne să ne mulțumim cu ce ne-ai descoperit clar, împlinindu-l cu credincioșie. Amin.",
  status: DEUTERONOM_STATUSES[29],
})
