import { iosuaChapter, teaching } from "./iosuaHelpers.js"
import { iosuaPassage } from "./iosuaText.js"
import { IOSUA_STATUSES } from "./iosuaPublication.js"

export const IOSUA_8 = iosuaChapter({
  number: 8,
  title: "Iosua 8 — Cucerirea cetății Ai și altarul de pe muntele Ebal",
  summary:
    "După rezolvarea păcatului lui Acan, DOMNUL îi dă lui Iosua un plan de vicleșug militar prin care Ai este cucerită și arsă. Apoi Iosua zidește un altar pe muntele Ebal și citește întreaga Lege înaintea poporului adunat între Ebal și Garizim.",
  literaryContext:
    "Contrastul cu capitolul anterior este deliberat: după înfrângere din pricina păcatului, urmează biruință imediată după curățire. Capitolul se încheie cu o reafirmare liturgică a legământului, arătând că fără gândul la Lege, nicio biruință militară nu are sens deplin.",
  historicalContext:
    "Muntele Ebal și muntele Garizim străjuiesc valea Sihemului, în centrul țării; Moise poruncise deja în Deuteronom 27 ca aici să fie rostite binecuvântările și blestemele legământului, imediat după intrarea în Canaan.",
  units: [
    {
      id: "iosua-8-1-13",
      ref: "Iosua 8:1-13",
      heading: "Planul de vicleșug militar împotriva cetății Ai",
      text: iosuaPassage(8, 1, 13),
      teaching: teaching(
        "DOMNUL îi spune lui Iosua: „Nu te teme și nu te înspăimânta... Iată, dau în mâinile tale pe împăratul cetății Ai”. Cuvintele reiau formula încurajării din Iosua 1, semn că legământul cu Iosua rămâne în picioare după rezolvarea crizei anterioare.",
        "De data aceasta, DOMNUL permite explicit ca prada și vitele cetății să fie luate de Israel pentru sine — spre deosebire de Ierihon, unde totul fusese dat spre nimicire. Fiecare cetate are propriile ei condiții, stabilite direct de DOMNUL, nu după un șablon fix.",
        "Strategia constă într-o ambuscadă: o parte a armatei se ascunde în spatele cetății, în timp ce Iosua conduce un grup care se preface că fuge înaintea oamenilor din Ai, atrâgându-i departe de cetate.",
      ),
      crossRefs: ["Iosua 1:9", "Iosua 7:26"],
      forYourHeart:
        "După ce păcatul este curățit, Dumnezeu redă curajul și promisiunea Lui de biruință rămâne în picioare, chiar dacă detaliile planului se schimbă.",
    },
    {
      id: "iosua-8-14-29",
      ref: "Iosua 8:14-29",
      heading: "Căderea cetății Ai și moartea împăratului ei",
      text: iosuaPassage(8, 14, 29),
      teaching: teaching(
        "Împăratul cetății Ai iese în grabă la luptă împotriva lui Israel, „fără să știe că i se întinsese o cursă pe dos de cetate” — încrederea excesivă după victoria anterioară împotriva lui Israel îl face vulnerabil.",
        "La porunca DOMNULUI, Iosua înt inde spre cetate sulița pe care o ținea în mână — semnalul pentru ambuscada ascunsă să atace și să dea foc cetății. Israel prinde astfel oamenii din Ai între două fronturi, iar „niciunul n-a scăpat, niciunul n-a rămas”.",
        "Împăratul cetății Ai este prins viu și adus la Iosua, apoi spânzurat de un copac până seara; trupul său este apoi aruncat la intrarea cetății, sub o grămadă mare de pietre — aceeași mărturie publică de judecată văzută deja la Acan.",
      ),
      crossRefs: ["Iosua 7:25-26", "Deuteronom 21:22-23"],
      forYourHeart:
        "Încrederea născută dintr-o biruință trecută poate orbi față de o cursă nouă; vigilența trebuie reînnoită la fiecare bătălie.",
    },
    {
      id: "iosua-8-30-35",
      ref: "Iosua 8:30-35",
      heading: "Altarul de pe muntele Ebal și citirea Legii",
      text: iosuaPassage(8, 30, 35),
      teaching: teaching(
        "Iosua zidește un altar DOMNULUI, Dumnezeului lui Israel, pe muntele Ebal, exact cum poruncise Moise: din pietre întregi, necioplite cu fierul. Aduce arderi de tot și jertfe de mulțumire, împlinind cu exactitate porunca din Deuteronom 27:4-6.",
        "Acolo, înaintea fiilor lui Israel, Iosua scrie pe pietre o copie a Legii lui Moise, iar întregul popor — bărbați, femei, copii, străini — este așezat pe cei doi munți, jumătate spre Garizim, jumătate spre Ebal, exact cum poruncise Moise pentru rostirea binecuvântărilor și blestemelor.",
        "Textul încheie cu o afirmație solemnă: Iosua a citit toate cuvintele Legii, „nimic din tot ce poruncise Moise n-a lăsat Iosua necitit înaintea întregii adunări a lui Israel”, inclusiv femeile, copiii și străinii care mergeau în mijlocul lor.",
      ),
      crossRefs: ["Deuteronom 27:1-8", "Deuteronom 31:11-12"],
      forYourHeart:
        "Chiar în toiul campaniilor militare, Iosua face timp pentru închinare și pentru citirea integrală a Cuvântului înaintea întregului popor, inclusiv a celor mai mici.",
    },
  ],
  prayer:
    "Doamne, mulțumim că după curățirea de păcat, ne redai curajul și promisiunea biruinței.\n\nPăzește-ne de încrederea oarbă născută din victoriile trecute, care ne poate face ținte ușoare pentru o cursă nouă.\n\nÎnvață-ne, ca și Iosua, să facem loc închinării și Cuvântului Tău chiar în mijlocul lucrărilor celor mai grele.\n\nȘi ajută-ne să nu lăsăm nimic din Cuvântul Tău necitit înaintea celor din casele noastre. Amin.",
  status: IOSUA_STATUSES[8],
})
