import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_13 = deuteronomChapter({
  number: 13,
  title: "Deuteronom 13 — Cînd ademenirea vine dintr-un semn, dintr-o casă sau dintr-o cetate",
  summary:
    "Moise avertizează poporul Împotriva a trei surse de ademenire spre idolatrie: un proroc mincinos care face un semn adevărat, o persoană apropiată din familie sau prietenie, și o cetate întreagă care se înclină spre alți dumnezei. În toate cele trei cazuri, apropierea sau adevărul parțial al semnului nu înlătură vinovăția, ci cere o loialitate mai mare față de DOMNUL decît față de orice relație sau minune.",
  literaryContext:
    "Acest capitol continuă direct avertismentul din finalul capitolului 12 Împotriva imitării practicilor idolatre, arătînd în detaliu cele mai periculoase căi prin care idolatria s-ar putea infiltra în Israel: prin autoritate religioasă falsă, prin relații personale intime, și prin conformarea socială a unei întregi comunități.",
  historicalContext:
    "Prorocii și cei care tălmăceau vise erau figuri respectate în lumea antică, iar un semn sau o minune înfăptuită real dădea autoritate imediată vorbelor lor. Legea lui Israel refuză acest criteriu ca test suficient al adevărului, cerând în schimb conformitatea cu Cuvîntul deja dat la Horeb.",
  units: [
    {
      id: "deuteronom-13-1-5",
      ref: "Deuteronom 13:1-5",
      heading: "Un semn adevărat, un mesaj mincinos",
      text: deuteronomPassage(13, 1, 5),
      teaching: teaching(
        "Legea pregătește dinainte pentru un caz tulburător: un proroc sau un tălmăcitor de vise care dă un semn sau o minune, „iar semnul sau minunea despre care ți-a vorbit se întîmplă”, dar apoi Încearcă să îndrepte poporul spre alți dumnezei. Adevărul unui semn nu înseamnă automat adevărul mesajului care înl însoțește.",
        "Textul dezvăluie scopul teologic al unei asemenea întâmplări: „DOMNUL, Dumnezeul vostru, vă pune la încercare, ca să vadă dacă iubiți pe DOMNUL, Dumnezeul vostru, cu toată inima voastră și cu tot sufletul vostru”. Încercările de acest fel nu sunt întîmplătoare; ele descoperă loialitatea reală a inimii.",
        "Pedeapsa cerută este cea mai severă: moartea, „căci a căutat să vă abată de la DOMNUL, Dumnezeul vostru, care v-a scos din țara Egiptului și v-a izbăvit din casa robiei”. Ademenirea spre idolatrie este considerată trădare a legămîntului fundamental, nu o simplă eroare de învățătură.",
      ),
      words: [
        {
          original: "מנסה יהוה א֪כם",
          transliteration: "menase YHWH etkhem",
          language: "ebraica",
          meaning:
            "DOMNUL vă pune la încercare. Aceeași rădăcină ca în Deuteronom 8:2, arătînd că încercările lui Dumnezeu au scopul de a descoperi loialitatea reală a inimii.",
        },
      ],
      crossRefs: ["Matei 24:24", "2 Tesaloniceni 2:9-10", "1 Ioan 4:1"],
      forYourHeart:
        "Un semn adevărat nu confirmă automat un mesaj adevărat; testează orice învățătură prin ceea ce Dumnezeu a spus deja.",
    },
    {
      id: "deuteronom-13-6-11",
      ref: "Deuteronom 13:6-11",
      heading: "Cînd ademenirea vine dintr-o relație apropiată",
      text: deuteronomPassage(13, 6, 11),
      teaching: teaching(
        "Cazul se întărește prin intimitate: „dacă fratele tău, fiul mamei tale, sau fiul tău, sau fiica ta, sau nevasta pe care o iubești, sau prietenul tău pe care-l iubești ca viața ta” încearcă să te ademenească în taină spre alți dumnezei. Apropierea și afecțiunea, oricât de firească, nu justifică abaterea de la DOMNUL.",
        "Porunca este dură, dar consecventă cu principiul din capitolul 6: „să nu-l asculți... mâna ta să fie cea mai întâi înmpotriva lui”, ca judecata să fie publică și clară, „ca să nu se mai facă un lucru așa de rău În mijlocul vostru”. Adevărata dragoste pentru un membru de familie nu-l poate însoți În trădare.",
      ),
      words: [
        {
          original: "בס֪ר",
          transliteration: "beseter",
          language: "ebraica",
          meaning:
            "În taină, în secret. Ademenirea descrisă aici nu este publică, ci ascunsă, folosindu-se de intimitatea unei relații de încredere.",
        },
      ],
      crossRefs: ["Deuteronom 6:5", "Matei 10:37", "Luca 14:26"],
      forYourHeart:
        "Iubirea pentru cel mai drag om nu te scutește de responsabilitatea de a refuza ademenirea lui spre păcat.",
    },
    {
      id: "deuteronom-13-12-18",
      ref: "Deuteronom 13:12-18",
      heading: "O cetate întreagă ademenită",
      text: deuteronomPassage(13, 12, 18),
      teaching: teaching(
        "Ultimul și cel mai grav caz este colectiv: „niște oameni răi” care întârnă pe locuitorii unei cetăți întregi să slujească altor dumnezei. Israel este chemat să cerceteze cu grijă, „să întrebi, să cercetezi și să te informezi bine”, înainte de a acționa pe baza unui zvon.",
        "Dacă lucrul este adevărat, judecata cerută este nimicirea totală a cetății și a tot ce este în ea, ca „nimicire desăvîrșită” fără să se păstreze nimic pentru sine, ca „DOMNUL Să-și întoarcă de la mânia Lui”. Această asprime arată gravitatea idolatriei colective care ar putea corupe întregul popor.",
      ),
      words: [
        {
          original: "דרש וחקר ושאל היטב",
          transliteration: "darosh vechaqor ushe'al heitev",
          language: "ebraica",
          meaning:
            "să cerceți, să investighezi și să întrebi bine. Trei verbe de cercetare temeinică, arătînd că judecata severă nu se întemeiază pe zvon, ci pe adevăr verificat.",
        },
      ],
      crossRefs: ["Deuteronom 17:4", "Iosua 7:1-26", "1 Corinteni 5:6-7"],
      forYourHeart:
        "Verifică adevărul temeinic înainte de a judeca; dar cînd idolatria coruple o întreagă comunitate, răspunsul trebuie să fie tot așa de temeinic.",
    },
  ],
  prayer:
    "Doamne, Învață-ne să nu confundăm un semn adevărat cu un mesaj adevărat.\n\nDă-ne curajul să refuzăm ademenirea, chiar cînd vine de la cei mai apropiați de noi.\n\nPăzește comunitățile noastre de conformarea colectivă spre idolatrie.\n\nȘi Învață-ne să iubim adevărul mai mult decît orice relație sau minune. Amin.",
  status: DEUTERONOM_STATUSES[13],
})
