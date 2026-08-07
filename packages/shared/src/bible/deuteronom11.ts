import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_11 = deuteronomChapter({
  number: 11,
  title: "Deuteronom 11 — O binecuvîntare și un blestem puse înaintea ta",
  summary:
    "Moise Încheie secțiunea de exhortare cerând poporului să-și amintească cu ochii lor ce a făcut DOMNUL în Egipt și cu Dathan și Abiram, să învețe că țara făgăduită depinde de ploaia trimisă de DOMNUL, nu de irigare omenească precum în Egipt, și să lege cuvintele Legii de inimă, de mănă și de ușile casei. Capitolul se încheie cu punerea binecuvîntării și a blestemului înaintea poporului, pe munții Garizim și Ebal.",
  literaryContext:
    "Acest capitol încheie întreaga secțiune exhortativă (capitolele 5-11) care pregătește trecerea la codul legilor propriu-zise (capitolele 12-26). El repetă și întărește temele deja întîlnite: Shema, iubirea, aducerea aminte, și adaugă o imagine geografică nouă — alegerea însuși între binecuvîntare și blestem.",
  historicalContext:
    "Egiptul depindea de irigarea artificială din Nil, prin canale și învârtitoare de apă. Canaanul, dimpotrivă, depindea direct de ploaia trimisă din cer, fără posibilitatea de control omenesc — fapt care lega direct belșugul țării de credincioșia poporului față de DOMNUL.",
  units: [
    {
      id: "deuteronom-11-1-7",
      ref: "Deuteronom 11:1-7",
      heading: "Ochii voștri au văzut",
      text: deuteronomPassage(11, 1, 7),
      teaching: teaching(
        "Moise se adresează acum generației care a văzut cu propriii ochi minunile din Egipt și pustie — nu prin poveste transmisă, ci prin experiență directă: „ochii voștri au văzut toate lucrările mari pe care le-a făcut DOMNUL”.",
        "Amintirea includ și judecata asupra lui Dathan și Abiram, care „s-au deschis și i-a înghițit pămîntul, cu casele lor” — o judecată văzută de Întregul Israel (Numeri 16), martor la ce se întâmplă celor care se răscoală Împotriva slujitorului aleas al lui Dumnezeu.",
      ),
      words: [
        {
          original: "עיניכם הראו֪",
          transliteration: "eineikhem ha-root",
          language: "ebraica",
          meaning:
            "ochii voștri care au văzut. Formula subliniază diferența dintre așa generație martoră directă și generațiile viitoare care vor învăța doar prin transmitere.",
        },
      ],
      crossRefs: ["Numeri 16:28-33", "Exod 14:26-31", "Deuteronom 4:9"],
      forYourHeart:
        "Ce ai văzut cu ochii tăi din lucrarea lui Dumnezeu este o comoară pe care ai datoria să o transmiți celor care nu au văzut.",
    },
    {
      id: "deuteronom-11-8-12",
      ref: "Deuteronom 11:8-12",
      heading: "O țară pe care o Îngrijește DOMNUL, nu o irigare omenească",
      text: deuteronomPassage(11, 8, 12),
      teaching: teaching(
        "Contrastul dintre Egipt și țara făgăduită este făcut expres: „țara În care intri... nu este ca țara Egiptului... unde semănai sămînta și o udai cu mâna ta, ca pe o grădină de legume”. Canaanul nu poate fi controlat prin munca omenească singură; el depinde de cer.",
        "Descrierea culminează într-o afirmație plină de intimitate: „este o țară de care Îngrijește DOMNUL, Dumnezeul tău; ochii DOMNULUI, Dumnezeului tău, sunt necurmat asupra ei, de la începutul pînă la sfîrșitul anului”. Această grijă continuă, nu punctuală, este Însăși viața țării făgăduite.",
      ),
      words: [
        {
          original: "ארץ דרש א֪ה יהוה",
          transliteration: "eretz dorosh otah YHWH",
          language: "ebraica",
          meaning:
            "o țară de care se îngrijește/o caută DOMNUL. Descrie legătura intimă dintre teritoriul făgăduinței și grija personală a lui Dumnezeu pentru el.",
        },
      ],
      crossRefs: ["Deuteronom 8:7-10", "Psalmul 65:9-13", "Iacov 5:7"],
      forYourHeart:
        "Dumnezeu îngrijește viața ta cu aceeași necurmată atenție — de la începutul pînă la sfîrșitul fiecărei zile.",
    },
    {
      id: "deuteronom-11-13-21",
      ref: "Deuteronom 11:13-21",
      heading: "Ploaia binecuvîntării, și cuvinte legate de inimă",
      text: deuteronomPassage(11, 13, 21),
      teaching: teaching(
        "Ascultarea din inimă și suflet primesc răspuns direct din cer: „Voi da țării voastre ploaie la vreme, ploaie timpurie și ploaie tîrzie”. Dar avertismentul urmează imediat: dacă inima se abate și se închină altor dumnezei, „DOMNUL va încuia cerurile și nu va mai fi ploaie”.",
        "Aceeași chemare din Deuteronom 6:6-9 se repetă aici, aproape identic: „puneți în inima și în sufletul vostru aceste cuvinte... învățați-le copiilor voștri... leagă-le pe mâna ta și pe frunte, și scrie-le pe ușile casei tale”. Repetarea nu este redundantă; arată cât de esențială este această practică zilnică.",
      ),
      words: [
        {
          original: "מלקוש ומלקוש",
          transliteration: "malqosh umalqosh",
          language: "ebraica",
          meaning:
            "ploaie timpurie și tîrzie. Ciclul ploilor în Canaan era esențial pentru recoltă, și era legat direct de credincioșia poporului față de legămînt.",
        },
      ],
      crossRefs: ["Deuteronom 6:6-9", "1 Împarați 17:1", "Iacov 5:17-18"],
      forYourHeart:
        "Păzește-ți inima de idoli ascunși; ei pot încuia cerul binecuvîntării fără să-ți dai seama de unde vine seceta.",
    },
    {
      id: "deuteronom-11-22-25",
      ref: "Deuteronom 11:22-25",
      heading: "Fiecare loc pe care va călca talpa piciorului vostru",
      text: deuteronomPassage(11, 22, 25),
      teaching: teaching(
        "Făgăduința de biruință este condiționată clar de ascultare: „dacă veți păzi cu grijă toate aceste porunci... DOMNUL va izgoni dinaintea voastră toate aceste neamuri”. Nu doar teritoriul din făgăduința inițială, ci „orice loc pe care va călca talpa piciorului vostru” va fi al lor.",
        "Această promisiune se încheie cu asigurarea psihologică cea mai importantă pentru o oștire care înfruntă neamuri mai mari: „nimeni nu va putea sta înaintea voastră... DOMNUL... va pune frica și groaza de voi peste toată țara pe care veți călca-o”.",
      ),
      words: [
        {
          original: "כף-רגלכם",
          transliteration: "kaf-raglekhem",
          language: "ebraica",
          meaning:
            "talpa piciorului vostru. Expresie care descrie făgăduința în măsură nelimitată: fiecare pas de ascultare este un pas spre moștenire.",
        },
      ],
      crossRefs: ["Iosua 1:3", "Deuteronom 7:23-24", "Iosua 1:5"],
      forYourHeart:
        "Fiecare pas de ascultare deschide moștenire nouă; nu te limita la ce ai primit deja.",
    },
    {
      id: "deuteronom-11-26-32",
      ref: "Deuteronom 11:26-32",
      heading: "Binecuvîntare și blestem, pe Garizim și Ebal",
      text: deuteronomPassage(11, 26, 32),
      teaching: teaching(
        "Moise pune înaintea poporului o alegere clară, fără loc de neutralitate: „Iată, pun astăzi înaintea voastră binecuvîntarea și blestemul”. Binecuvîntarea pentru ascultare, blestemul pentru abaterea spre alți dumnezei — aceeași temă va fi dezvoltată pe larg în capitolele 27-28.",
        "Geografia este anunțată dinainte: binecuvîntarea va fi rostită pe muntele Garizim, blestemul pe muntele Ebal, dincolo de Iordan, în țara canaaniților. Aceasta va fi o ceremonie publică, vizibilă, nu doar o rostire abstractă.",
      ),
      words: [
        {
          original: "ברכה וקללה",
          transliteration: "berakha uqlala",
          language: "ebraica",
          meaning:
            "binecuvîntare și blestem. Cele două căi puse înaintea poporului, temă majoră care va fi dezvoltată în detaliu în Deuteronom 27-28.",
        },
      ],
      crossRefs: ["Deuteronom 27:11-13", "Deuteronom 28:1-2", "Iosua 8:33-34"],
      forYourHeart:
        "Nu există poziție neutră înaintea lui Dumnezeu; fiecare viață alege între binecuvîntare și blestem prin ascultarea sau abaterea ei.",
    },
  ],
  prayer:
    "Doamne, ne aducem aminte cu ochii credinței de tot ce ai făcut pentru părinții noștri.\n\nDă-ne ploaia binecuvîntării Tale la vreme, și păzește-ne de idolii care ar încuia cerul.\n\nLeagă cuvintele Tale de inima noastră, de mâna noastră și de ușile caselor noastre.\n\nȘi ajută-ne să alegem cu limpezime binecuvîntarea, nu blestemul, în fiecare zi a vieții noastre. Amin.",
  status: DEUTERONOM_STATUSES[11],
})
