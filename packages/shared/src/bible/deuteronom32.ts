import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 */

export const DEUTERONOM_32 = deuteronomChapter({
  number: 32,
  title: "Deuteronom 32 — Cântarea lui Moise: Stânca desăvârșită, poporul îngrășat, judecata și mila",
  summary:
    "Cântarea profetică a lui Moise invocă cerul și pământul ca martori, recapitulează grija Domnului pentru Israel ca o pasăre care își apără puii, denunță apostazia lui Ieșurun îngrășat, anunță judecata reținută doar de grija pentru Numele Domnului, și se încheie cu mila și victoria finală, urmate de anunțul morții lui Moise pe muntele Nebo.",
  literaryContext:
    "Această cântare, poruncită în capitolul 31 ca martoră permanentă, rezumă în formă poetică întreaga teologie a legământului din Deuteronom — alegere, grijă, apostazie, judecată și restaurare — chiar înainte de moartea lui Moise și de intrarea propriu-zisă în țară.",
  historicalContext:
    "Structura acestei cântări are paralele cu poezia acuzatoare (rib) din tratatele legământului antic, unde o parte lezată își recapitulează cazul înaintea unor martori cosmici — aici cerul și pământul — pentru a documenta legitimitatea judecății care va urma.",
  units: [
    {
      id: "deuteronom-32-1-4",
      ref: "Deuteronom 32:1-4",
      heading: "Invocarea cerului și pământului, Stânca desăvârșită",
      text: deuteronomPassage(32, 1, 4),
      teaching: teaching(
        "Cântarea se deschide cu o invocare solemnă: „Ascultați, ceruri, și voi vorbi! Auzi, pământule, cuvintele gurii mele!” — martorii cosmici deja stabiliți în capitolul 30 sunt chemați din nou să asculte mărturia care va urma.",
        "Titlul central al lui Dumnezeu în această cântare este „Stânca” — „lucrările Lui sunt desăvârșite... El este drept și curat”. Această imagine de stabilitate absolută contrastează puternic cu inconstanța pe care poporul o va arăta în versetele următoare.",
      ),
      words: [
        {
          original: "הַצּוּר תָּמִים פָּעֳלוֹ",
          transliteration: "hatsur tamim pa'alo",
          language: "ebraica",
          meaning:
            "Stânca, lucrarea Lui este desăvârșită. Titlul central al cântării, care afirmă stabilitatea și integritatea morală absolută a lui Dumnezeu, contrastul principal cu inconstanța umană descrisă mai departe.",
        },
      ],
      crossRefs: ["Psalmul 18:2", "1 Corinteni 10:4", "Isaia 1:2"],
      forYourHeart:
        "Când totul în jurul tău pare instabil, ține minte că Dumnezeu este Stânca ale cărei lucrări sunt desăvârșite și drepte.",
    },
    {
      id: "deuteronom-32-5-14",
      ref: "Deuteronom 32:5-14",
      heading: "Grija Domnului, ca vulturul care își apără puii",
      text: deuteronomPassage(32, 5, 14),
      teaching: teaching(
        "Contrastul este imediat: „ei s-au stricat față de El... generație rea și sucită”, dar întrebarea retorică rămâne fără răspuns bun pentru popor: „nu este El tatăl tău, Care te-a cumpărat, Care te-a făcut?”",
        "Imaginea centrală a grijii divine este vulturul: „ca vulturul care își scutură cuibul, care plutește peste puii săi, își întinde aripile, îi ia și îi poartă pe penele sale”. Israel a fost hrănit cu „miere din stâncă” și „cel mai bun grâu” — un belșug care nu a venit din efort propriu, ci din îngrijirea directă a Domnului.",
      ),
      words: [
        {
          original: "כְּנֶשֶׁר יָעִיר קִנּוֹ",
          transliteration: "kenesher ya'ir qino",
          language: "ebraica",
          meaning:
            "ca vulturul care își scutură cuibul. Imagine tandră și puternică deopotrivă a grijii divine — un părinte care își pregătește puii pentru zbor, dar îi și susține direct atunci când au nevoie.",
        },
      ],
      crossRefs: ["Exodul 19:4", "Isaia 40:31", "Matei 23:37"],
      forYourHeart:
        "Belșugul de care te bucuri nu vine doar din efortul tău; el este rodul grijii statornice a lui Dumnezeu pentru tine.",
    },
    {
      id: "deuteronom-32-15-18",
      ref: "Deuteronom 32:15-18",
      heading: "Ieșurun îngrășat, care părăsește Stânca mântuirii sale",
      text: deuteronomPassage(32, 15, 18),
      teaching: teaching(
        "Numele poetic „Ieșurun” (cel drept, iubitul) face contrastul mai dureros: „Ieșurun s-a îngrășat și a zvârlit din picioare... l-a părăsit pe Dumnezeu, Ziditorul său”. Belșugul primit a devenit ocazia părăsirii, nu a recunoștinței.",
        "Idolatria este descrisă direct ca ingratitudine față de originea proprie: „ai părăsit Stânca ce te-a născut și l-ai uitat pe Dumnezeul Care te-a adus pe lume”. Uitarea propriei origini spirituale este rădăcina practică a oricărei apostazii.",
      ),
      words: [
        {
          original: "צוּר יְלָדְךָ תֶּשִׁי",
          transliteration: "tsur yeladkha teshi",
          language: "ebraica",
          meaning:
            "ai uitat Stânca ce te-a născut. Formula care identifică uitarea propriei origini spirituale — nu ignoranța, ci uitarea activă — ca rădăcină practică a idolatriei descrise în continuare.",
        },
      ],
      crossRefs: ["Osea 13:6", "Deuteronom 8:10-14", "Ieremia 2:32"],
      forYourHeart:
        "Belșugul poate deveni fie ocazia recunoștinței, fie ocazia uitării lui Dumnezeu; alege să nu uiți de unde vine binele tău.",
    },
    {
      id: "deuteronom-32-19-27",
      ref: "Deuteronom 32:19-27",
      heading: "Mânia dreaptă, reținută de grija pentru Numele Domnului",
      text: deuteronomPassage(32, 19, 27),
      teaching: teaching(
        "Mânia Domnului este descrisă cu imagini puternice — foc care „va arde până în adâncul locuinței morților”, molimă, colți de fiare — ca reacție dreaptă la o generație „în care nu este credincioșie”.",
        "Surprinzător, judecata este limitată nu de lipsa de motiv, ci de grija pentru cum va fi interpretată: „M-am temut de ocara vrăjmașului, ca nu cumva potrivnicii lor să se amăgească și să zică: «Mâna noastră cea înaltă a făcut toate acestea, și nu DOMNUL!»” Chiar disciplina divină este guvernată de grija pentru adevărul cunoscut despre El în lume.",
      ),
      words: [
        {
          original: "לוּלֵי כַּעַס אוֹיֵב אָגוּר",
          transliteration: "lulei ka'as oyev agur",
          language: "ebraica",
          meaning:
            "de n-ar fi fost grija de ocara vrăjmașului. Motivul surprinzător al limitării judecății — nu mila față de vinovați în sine, ci grija ca vrăjmașii să nu tragă concluzii false despre puterea Domnului.",
        },
      ],
      crossRefs: ["Numeri 14:13-16", "Ezechiel 36:22-23", "Romani 9:22"],
      forYourHeart:
        "Numele lui Dumnezeu este legat de cum te vede lumea trăind; consecvența ta poate proteja sau păta mărturia despre El.",
    },
    {
      id: "deuteronom-32-28-35",
      ref: "Deuteronom 32:28-35",
      heading: "Un neam fără pricepere, judecata rezervată lui Dumnezeu",
      text: deuteronomPassage(32, 28, 35),
      teaching: teaching(
        "Poporul este descris ca fiind „fără judecată” — incapabil să înțeleagă că propriile înfrângeri vin din faptul că „Stânca lor” i-a vândut, nu din slăbiciunea reală a vrăjmașilor: „cum ar putea urmări unul singur o mie... dacă nu i-ar fi vândut Stânca lor?”",
        "Concluzia teologică fundamentală este dată explicit: „a Mea este răzbunarea și răsplătirea”. Judecata dreaptă nu este delegată oamenilor pentru a se răzbuna privat, ci este rezervată exclusiv lui Dumnezeu, care cunoaște timpul potrivit: „ziua nenorocirii lor este aproape”.",
      ),
      words: [
        {
          original: "לִי נָקָם וְשִׁלֵּם",
          transliteration: "li naqam veshillem",
          language: "ebraica",
          meaning:
            "a Mea este răzbunarea și răsplătirea. Principiul care rezervă judecata dreaptă exclusiv lui Dumnezeu, interzicând vendeta privată — citat direct în Romani 12:19.",
        },
      ],
      crossRefs: ["Romani 12:19", "Evrei 10:30", "Psalmul 94:1"],
      forYourHeart:
        "Nu îți este dat să te răzbuni singur pe nedreptățile suferite; lasă judecata dreaptă în mâinile Celui care o face la timpul potrivit.",
    },
    {
      id: "deuteronom-32-36-43",
      ref: "Deuteronom 32:36-43",
      heading: "Mila care urmează judecata, victoria finală, bucuria neamurilor",
      text: deuteronomPassage(32, 36, 43),
      teaching: teaching(
        "După judecată vine mila: „DOMNUL va judeca pe poporul Său și va avea milă de slujitorii Săi, când va vedea că puterea le este dusă”. Neputința completă a poporului devine ocazia intervenției miloase a Domnului, nu abandonarea lui.",
        "Cântarea culminează cu afirmația de unicitate absolută: „Eu, Eu sunt El, și nu este alt Dumnezeu afară de Mine! Eu dau moartea și Eu dau viața”, urmată de chemarea neamurilor să se bucure alături de poporul Său — victoria finală a Domnului aduce o bucurie care se extinde dincolo de Israel.",
      ),
      words: [
        {
          original: "רְאוּ עַתָּה כִּי אֲנִי אֲנִי הוּא",
          transliteration: "re'u atah ki ani ani hu",
          language: "ebraica",
          meaning:
            "vedeți acum că Eu, Eu sunt El. Formula de auto-revelare care afirmă unicitatea absolută a Domnului, temelia încrederii finale a cântării în puterea Lui de a da atât moartea, cât și viața.",
        },
      ],
      crossRefs: ["Isaia 43:10-11", "Romani 15:10", "Apocalipsa 6:10"],
      forYourHeart:
        "Neputința ta completă nu este sfârșitul speranței; ea poate fi chiar ocazia în care mila lui Dumnezeu intervine cel mai clar.",
    },
    {
      id: "deuteronom-32-44-52",
      ref: "Deuteronom 32:44-52",
      heading: "Cântarea ca mărturie vie, anunțul morții lui Moise pe Nebo",
      text: deuteronomPassage(32, 44, 52),
      teaching: teaching(
        "Moise încheie recitarea cântării cu un îndemn practic: „puneți-vă în inimă toate cuvintele... căci nu este un cuvânt deșert pentru voi, ci este însăși viața voastră”. Cântarea nu este doar artă poetică, ci substanță vitală pentru supraviețuirea spirituală a poporului.",
        "Capitolul se încheie cu anunțul direct al morții lui Moise pe muntele Nebo, drept consecință a păcatului de la Meriba: „pentru că ați păcătuit împotriva Mea... nu M-ați sfințit”. Chiar cel mai mare conducător al legământului rămâne sub aceleași standarde de sfințenie ca întregul popor.",
      ),
      words: [
        {
          original: "כִּי לֹא־דָבָר רֵק הוּא מִכֶּם כִּי־הוּא חַיֵּיכֶם",
          transliteration: "ki lo-davar req hu mikem ki-hu chayeikhem",
          language: "ebraica",
          meaning:
            "căci nu este un cuvânt deșert pentru voi, ci este însăși viața voastră. Afirmația care leagă direct ascultarea de Cuvântul dat de supraviețuirea reală a poporului, nu doar de o respectare formală și exterioară.",
        },
      ],
      crossRefs: ["Numeri 20:12", "Deuteronom 34:4", "Matei 4:4"],
      forYourHeart:
        "Cuvântul lui Dumnezeu nu este o formalitate goală pentru tine; pune-l în inimă, căci el este însăși viața ta.",
    },
  ],
  prayer:
    "Doamne, Tu ești Stânca ale cărei lucrări sunt desăvârșite; ajută-ne să nu uităm niciodată de unde vine binele nostru.\n\nFerește-ne de îngrășarea inimii care duce la părăsirea Ta în vremuri de belșug.\n\nÎnvață-ne să lăsăm judecata dreaptă în mâinile Tale, fără să căutăm răzbunare proprie.\n\nȚi mulțumim că mila Ta urmează judecata, și că Cuvântul Tău este pentru noi însăși viața. Amin.",
  status: DEUTERONOM_STATUSES[32],
})
