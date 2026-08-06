import { judecatoriChapter, teaching } from "./judecatoriHelpers.js"
import { judecatoriStatus } from "./judecatoriPublication.js"

/* Judecători 3 — text Biblia Emanus; explicație originală Emanus după cercetarea textului și a transcrierii Through The Bible. */
export const JUDECATORI_3 = judecatoriChapter({
  number: 3,
  title: "Judecători 3 — Otniel, Ehud și Șamgar: Dumnezeu ridică izbăvitori neașteptați",
  summary:
    "Neamurile rămase pun la încercare ascultarea lui Israel, dar poporul ajunge să se amestece cu ele și să slujească idolilor lor. DOMNUL ridică pe Otniel, apoi pe Ehud și pe Șamgar. Trei izbăvitori foarte diferiți arată că puterea eliberării vine de la Dumnezeu, nu dintr-un tipar omenesc al eroului.",
  literaryContext:
    "După rezumatul ciclului din capitolul 2, capitolul 3 oferă primele trei exemple concrete. Otniel prezintă ciclul în forma lui cea mai simplă; povestirea lui Ehud îl dezvoltă prin ironie narativă și răsturnarea puterii; Șamgar apare într-un singur verset, dar confirmă aceeași inițiativă divină.",
  historicalContext:
    "Căsătoriile între clanuri aveau rol politic și economic, de aceea amestecul descris aici însemna și acceptarea cultelor locale. Ehud era beniamit și stângaci sau limitat la mâna stângă; tocmai ceea ce putea părea o particularitate marginală devine parte din izbăvire. Ostiul de plug al lui Șamgar era o unealtă agricolă grea, nu o armă regală.",
  units: [
    {
      verses: [1, 6],
      heading: "Încercarea ascultării devine conviețuire, alianță și închinare străină",
      teaching: teaching(
        "Neamurile rămase trebuiau să pună la încercare ascultarea lui Israel și să învețe noua generație realitatea luptei. Dar Israel nu rămâne distinct în credincioșie; locuiește, se înrudește și ajunge să slujească dumnezeilor celor din jur.",
        "Apropierea de oameni nu este condamnată ca atare. Problema este abandonarea legământului și preluarea închinării care contrazice Cuvântul lui Dumnezeu. Relația devine compromis atunci când pentru a o păstra trebuie să părăsești adevărul.",
        "Căderea nu începe în ziua în care apare robia, ci în ziua în care diferența dintre poporul lui Dumnezeu și idolii culturii încetează să mai conteze.",
      ),
      crossRefs: ["Deuteronom 7:1-6", "Psalmul 106:34-39", "2 Corinteni 6:14-18"],
      forYourHeart:
        "În ce relație, avantaj sau obicei ai început să numești «normal» ceva care te îndepărtează treptat de ascultarea față de Dumnezeu?",
    },
    {
      verses: [7, 11],
      heading: "Otniel: Duhul DOMNULUI peste un om credincios înainte de a fi cunoscut",
      teaching: teaching(
        "Israel uită pe DOMNUL, ajunge în robie, strigă, iar Dumnezeu ridică pe Otniel. Inițiativa este din nou a harului: izbăvitorul nu se autopropune și poporul nu își produce singur salvarea.",
        "Duhul DOMNULUI vine peste Otniel și îl califică să judece și să lupte. Transcrierea subliniază că informația, certificatul sau entuziasmul nu pot înlocui lucrarea Duhului. Slujirea adevărată cere caracter format în ascuns și putere primită de la Dumnezeu.",
        "Otniel fusese deja credincios într-o însărcinare concretă lângă Caleb. Dumnezeu nu începe formarea lui în ziua când devine judecător; slujirea publică descoperă o credincioșie cultivată înainte.",
      ),
      words: [
        {
          original: "שֹׁפֵט",
          transliteration: "șofet",
          language: "ebraica",
          meaning:
            "judecător, cârmuitor sau izbăvitor. În această carte, judecătorul nu este numai magistrat, ci omul ridicat de Dumnezeu pentru a elibera și a conduce poporul.",
        },
      ],
      crossRefs: ["Judecători 1:12-15", "Zaharia 4:6", "Fapte 1:8"],
      forYourHeart:
        "Nu disprețui însărcinarea mică și nevăzută. Dumnezeu poate pregăti prin ea caracterul de care va fi nevoie când responsabilitatea va deveni publică.",
    },
    {
      verses: [12, 30],
      heading: "Ehud: slăbiciunea aparentă și răsturnarea unei puteri care părea sigură",
      teaching: teaching(
        "După o nouă cădere, Moabul stăpânește Israelul optsprezece ani. Poporul așteaptă mult înainte să strige, deși robia era reală din prima zi. Omul se poate obișnui chiar și cu ceea ce îl distruge.",
        "Ehud nu corespunde imaginii convenționale a războinicului. Particularitatea mâinii lui îi permite să ascundă arma acolo unde nu era așteptată. Dumnezeu nu este limitat de ceea ce ceilalți socotesc inconvenient sau lipsă.",
        "Narațiunea descrie o ucidere în contextul unui conflict antic și al judecății asupra unui asupritor; nu oferă un model pentru violență privată, răzbunare sau atentat religios. Centrul teologic este mărturisirea lui Ehud către popor: «DOMNUL a dat în mâinile voastre pe vrăjmașii voștri». Izbăvirea este atribuită lui Dumnezeu.",
      ),
      crossRefs: ["Judecători 2:16-18", "1 Corinteni 1:27-29", "Romani 12:19-21"],
      forYourHeart:
        "Nu aștepta ani întregi până să strigi către Dumnezeu. Numește robia cât este încă la început și adu înaintea Lui chiar slăbiciunea pe care ai încercat să o ascunzi.",
    },
    {
      verses: [31, 31],
      heading: "Șamgar: o unealtă obișnuită în mâna unui om disponibil",
      teaching: teaching(
        "Șamgar primește numai un verset, dar nu o izbăvire mai puțin reală. El folosește un otic de plug, unealta pe care o avea la îndemână, și devine izbăvitor al lui Israel.",
        "Cartea nu spune că toți slujitorii trebuie să aibă aceeași vizibilitate, aceeași durată a lucrării sau aceleași resurse. Dumnezeu poate lucra printr-o viață descrisă într-un capitol întreg sau într-o singură propoziție.",
        "Puterea lui Dumnezeu nu transformă unealta într-un talisman. Accentul rămâne pe omul ridicat la vremea lui și pe DOMNUL care izbăvește.",
      ),
      crossRefs: ["Exod 4:2", "1 Samuel 17:40-50", "2 Corinteni 4:7"],
      forYourHeart:
        "Ce ai deja în mână? Nu amâna ascultarea până când vei primi instrumentele, statutul sau vizibilitatea altcuiva.",
    },
  ],
  prayer:
    "Doamne, păzește-ne de apropierea care ne cere să părăsim adevărul și de obișnuința cu robia.\n\nUmple-ne cu Duhul Tău și formează-ne credincioși în lucrurile mici.\n\nFolosește slăbiciunile și uneltele noastre obișnuite pentru scopurile Tale, fără să căutăm slava eroului.\n\nÎnvață-ne să spunem în orice izbăvire: DOMNUL a făcut aceasta. Amin.",
  status: judecatoriStatus(3),
})
