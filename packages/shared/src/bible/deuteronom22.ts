import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_22 = deuteronomChapter({
  number: 22,
  title: "Deuteronom 22 — Grijă pentru aproapele, ordine în creație, curăție în familie",
  summary:
    "Moise cere grijă activă pentru bunurile rătăcite ale fratelui, așază mai multe rânduieli privind viața cotidiană și reglementează acuzațiile sexuale și relațiile interzise în dreptul Israelului antic. Pasajele despre agresiune trebuie citite cu grijă: textul distinge vinovăția de victimizare, iar regulile juridice antice nu devin criterii moderne pentru a învinovăți o victimă.",
  literaryContext:
    "Acest capitol trece de la legile familiale din capitolul 21 la o serie mai largă de rânduieli de ordine socială și morală. Capitolul alătură grija pentru bunul aproapelui, siguranța casei, practici agricole și vestimentare, precum și cazuri juridice privind sexualitatea; textul nu spune că toate aceste porunci au o singură explicație simbolică.",
  historicalContext:
    "Cazurile juridice din a doua parte aparțin structurii civile a Israelului antic. Ele trebuie explicate în cadrul acelei lumi și al formulării exacte a textului, fără a transforma procedurile probatorii antice în standarde moderne pentru evaluarea consimțământului sau a traumelor și fără a deduce motive cultice acolo unde pasajul nu le precizează.",
  units: [
    {
      id: "deuteronom-22-1-4",
      ref: "Deuteronom 22:1-4",
      heading: "Grijă activă pentru bunul rătăcit al fratelui",
      text: deuteronomPassage(22, 1, 4),
      teaching: teaching(
        "Legea interzice indiferența față de bunurile pierdute ale altuia: «să nu te prefaci că nu le vezi», ci să le duci înapoi proprietarului sau să le păstrezi până când acesta le caută.",
        "Grija se extinde și la animalul căzut pe drum: omul nu trebuie să treacă nepăsător pe lângă situația pe care o poate îndrepta. Accentul imediat al textului este responsabilitatea concretă față de aproapele.",
      ),
      words: [
        {
          original: "לֹא תִתְעַלֵּם",
          transliteration: "lo tit'alem",
          language: "ebraica",
          meaning:
            "să nu te ascunzi / să nu te faci că nu vezi. Verbul descrie refuzul de a ignora deliberat responsabilitatea față de bunul pierdut al aproapelui.",
        },
      ],
      crossRefs: ["Exod 23:4-5", "Luca 10:30-37", "Iacov 2:15-16"],
      forYourHeart:
        "Nu transforma faptul că o nevoie nu este a ta în motiv pentru a te preface că nu o vezi.",
    },
    {
      id: "deuteronom-22-5-12",
      ref: "Deuteronom 22:5-12",
      heading: "Rânduieli diferite pentru viața de fiecare zi",
      text: deuteronomPassage(22, 5, 12),
      teaching: teaching(
        "Versetele așază una lângă alta mai multe porunci: îmbrăcămintea asociată bărbatului și femeii, cruțarea păsării-mamă, parapetul acoperișului, amestecul semințelor, jugul dintre bou și măgar, țesătura din lână și in și ciucurii hainei. Se cuvine să nu le forțăm într-o singură explicație pe care capitolul nu o dă.",
        "Unele rânduieli au o rațiune practică evidentă în text — de pildă parapetul previne vărsarea de sânge, iar porunca despre cuib cruță pasărea-mamă. Pentru celelalte, explicația trebuie să rămână prudentă și să nu transforme ipotezele istorice sau simbolice în doctrină sigură.",
      ),
      words: [
        {
          original: "לֹא־תִקַּח הָאֵם עַל־הַבָּנִים",
          transliteration: "lo tiqqah ha'em al habanim",
          language: "ebraica",
          meaning:
            "să nu iei mama împreună cu puii. Este formularea interdicției din cazul cuibului întâlnit pe drum.",
        },
      ],
      crossRefs: ["Deuteronom 22:8", "Leviticul 19:19", "Numeri 15:38-39"],
      forYourHeart:
        "Când textul nu explică toate motivele unei porunci, este mai cinstit să păstrăm limita textului decât să transformăm o ipoteză într-o certitudine.",
    },
    {
      id: "deuteronom-22-13-21",
      ref: "Deuteronom 22:13-21",
      heading: "O acuzație gravă intră într-o procedură publică de judecată",
      text: deuteronomPassage(22, 13, 21),
      teaching: teaching(
        "Pasajul descrie un caz juridic al Israelului antic în care un soț își acuză soția proaspăt căsătorită și familia ei aduce înaintea bătrânilor ceea ce textul numește «semnele fecioriei». Dacă acuzația este declarată falsă, bărbatul este pedepsit și amendat pentru numele rău scos femeii.",
        "Dacă verdictul este opus, textul prevede pedeapsa capitală a acelei legislații. Acest cadru trebuie redat fără cosmetizare, dar nu trebuie transformat într-o metodă medicală modernă de «verificare a virginității»: anatomia sau sângerarea nu pot demonstra în mod sigur istoricul sexual al unei persoane.",
      ),
      words: [
        {
          original: "וְהוֹצִיאוּ אֶת־בְּתוּלֵי הַנַּעֲרָ",
          transliteration: "vehotzi'u et-betulei hana'arah",
          language: "ebraica",
          meaning:
            "să aducă semnele fecioriei fetei. Este limbajul juridic al cazului descris de text; nu trebuie echivalat cu un test medical modern sigur al istoricului sexual.",
        },
      ],
      crossRefs: ["Deuteronom 24:1", "Matei 1:19", "1 Timotei 5:19"],
      forYourHeart:
        "Acuzațiile care pot distruge viața unui om cer cercetare și responsabilitate, nu rușinare publică pe baza presupunerilor.",
    },
    {
      id: "deuteronom-22-22-27",
      ref: "Deuteronom 22:22-27",
      heading: "Adulterul și agresiunea sunt tratate ca situații moral diferite",
      text: deuteronomPassage(22, 22, 27),
      teaching: teaching(
        "Textul distinge adulterul de cazul fetei logodite prinsă cu forța pe câmp. În al doilea caz spune explicit că fetei nu trebuie să i se facă nimic și compară agresiunea cu un omor: vinovăția este a agresorului, nu a victimei.",
        "Cazul anterior, petrecut în cetate, folosește faptul că fata «n-a strigat» în logica probatorie a acelei legislații antice. Această formulare nu trebuie folosită astăzi pentru a concluziona că lipsa unui strigăt înseamnă consimțământ. Frica, amenințarea, înghețul traumatic, incapacitatea sau alte împrejurări pot face o victimă să nu strige. Standardul modern trebuie să fie consimțământul liber, nu o simplă reacție fizică presupusă.",
      ),
      words: [
        {
          original: "וְאֵין מוֹשִׁיעַ לָהּ",
          transliteration: "ve'ein moshia lah",
          language: "ebraica",
          meaning:
            "și nu era nimeni s-o scape. În cazul de pe câmp, textul subliniază lipsa ajutorului și declară victima nevinovată.",
        },
      ],
      crossRefs: ["Deuteronom 21:14", "Leviticul 20:10", "2 Samuel 13:12-14"],
      forYourHeart:
        "Nu transforma reacția unei victime în proces împotriva ei. Constrângerea este vina agresorului.",
    },
    {
      id: "deuteronom-22-28-30",
      ref: "Deuteronom 22:28-30",
      heading: "Fata ne-logodită și limita impusă bărbatului care a smerit-o",
      text: deuteronomPassage(22, 28, 30),
      teaching: teaching(
        "Versetele 28-29 descriu un alt caz, cu o fată ne-logodită, folosind verbul ebraic care poate avea sensul de a apuca sau prinde. Interpretarea exactă a gradului de constrângere în raport cu cazul din Exod 22:16-17 este discutată, de aceea explicația nu trebuie să afirme mai mult decât permite formularea: bărbatul este făcut răspunzător financiar și nu primește dreptul de a o abandona după ce a smerit-o.",
        "Această sancțiune civilă din Israelul antic nu este o poruncă modernă prin care o victimă a agresiunii sexuale ar trebui obligată să se căsătorească cu agresorul ei. Capitolul se încheie apoi cu interdicția relației cu nevasta tatălui, păstrând o graniță familială explicită.",
      ),
      words: [
        {
          original: "לֹא־יְגַלֶּה כְּנַף אָבִיו",
          transliteration: "lo yegalleh kenaf aviv",
          language: "ebraica",
          meaning:
            "să nu descopere învelitoarea tatălui său. Expresie eufemistică pentru interzicerea relației sexuale cu nevasta tatălui.",
        },
      ],
      crossRefs: ["Exod 22:16-17", "Leviticul 18:8", "1 Corinteni 5:1"],
      forYourHeart:
        "Un text juridic antic nu trebuie folosit pentru a împinge o victimă modernă într-o relație nesigură cu agresorul ei.",
    },
  ],
  prayer:
    "Doamne, învață-ne să nu trecem nepăsători pe lângă nevoia aproapelui.\n\nDă-ne cinste față de text, ca să nu transformăm ipotezele în porunci și nici legile vechiului Israel în instrumente de rănire a victimelor.\n\nDă-ne dreptate, discernământ și grijă pentru cel vulnerabil. Amin.",
  status: DEUTERONOM_STATUSES[22],
})
