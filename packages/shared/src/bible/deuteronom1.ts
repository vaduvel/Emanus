import { deuteronomChapter, teaching } from "./deuteronomHelpers.js"
import { deuteronomPassage } from "./deuteronomText.js"
import { DEUTERONOM_STATUSES } from "./deuteronomPublication.js"

/*
 * Cartea Deuteronom, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în deuteronomText.ts (fișierele deuteronomTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const DEUTERONOM_1 = deuteronomChapter({
  number: 1,
  title: "Deuteronom 1 — O generație care începe să povestească drumul",
  summary:
    "În câmpia Moabului, în luna a unsprezecea a celui de-al patruzecilea an, Moise începe să rostească poporului întreaga lege pe care DOMNUL i-o dat. El privește înapoi la Horeb, la punerea judecătorilor, la trimiterea celor doisprezece cercetași în țara Canaanului și la răzvrătirea care a urmat rapoartelor lor. Generația care a ieșit din Egipt este oprită de la intrarea în țară, și doar Iosua și Caleb rămân dintre cei mari.",
  literaryContext:
    "Deuteronomul însuși înseamnă în grecește „al doilea legi”, dar în ebraică numele cărții, Devarim, vine chiar din primul ei cuvânt: „Cuvintele”. Nu este o repetare mecanică a legilor din Exod, Levitic și Numeri, ci o predică de rămas bun, rostită de un om de o sută douăzeci de ani unei generații noi, care nu a văzut Egiptul, dar care va intra în țara pe care părinții lor au pierdut-o din pricina necredinței. Capitolul 1 stabilește tonul întregii cărți: istoria este rostită nu ca informație, ci ca învățătură vie, pentru o generație care trebuie să aleagă altfel decât părinții ei.",
  historicalContext:
    "Patruzeci de ani au trecut de la Horeb (Sinai). Generația adultă care a ieșit din Egipt a murit în pustie, după cum DOMNUL a jurat la Cades-Barnea (Numeri 14:20-35). Israel se află acum în câmpia Moabului, la răsărit de Iordan, pregătit să intre în Canaan. Moise nu va trece Iordanul; cuvântul lui din această carte este ultima lui lucrare pentru poporul pe care l-a călăuzit patru decenii.",
  units: [
    {
      id: "deuteronom-1-1-8",
      ref: "Deuteronom 1:1-8",
      heading: "Cuvintele rostite înainte de a trece Iordanul",
      text: deuteronomPassage(1, 1, 8),
      teaching: teaching(
        "Cartea se deschide cu o însemnare geografică și cronologică aproape banală: locul, timpul, și faptul că Moise a vorbit „după tot ce-i poruncise DOMNUL să-i spună”. Nimic din ce va urma în această carte lungă nu este inițiativă personală a lui Moise; el rostea ce i se poruncise.",
        "Textul însemnează că de la Horeb la Cades-Barnea era un drum de unsprezece zile — și totuși Israel a petrecut patruzeci de ani între aceste două puncte. Distanța scurtă față de anii lungi de rătăcire arată limpede: nu geografia a fost problema, ci necredința.",
        "DOMNUL reînnoiește aici porunca inițială din Horeb: „Intrați în stăpânirea țării pe care am jurat-o părinților voștri”. Cuvântul acesta era valabil de patruzeci de ani; nu s-a schimbat. Ceea ce s-a schimbat este generația care îl ascultă.",
      ),
      words: [
        {
          original: "דברים",
          transliteration: "devarim",
          language: "ebraica",
          meaning:
            "cuvinte. Dă numele ebraic al cărții; întreaga carte este înțeleasă ca o rostire, un discurs de rămas bun, nu doar o listă de legi.",
        },
      ],
      crossRefs: ["Numeri 14:20-35", "Geneza 15:18-21"],
      forYourHeart:
        "Un drum scurt poate deveni ani de rătăcire atunci când inima nu crede. Distanța până la făgăduință nu este niciodată mai lungă decât necredința ta.",
    },
    {
      id: "deuteronom-1-9-18",
      ref: "Deuteronom 1:9-18",
      heading: "Judecători puși în fruntea unui popor înmulțit",
      text: deuteronomPassage(1, 9, 18),
      teaching: teaching(
        "Moise începe amintirea lui cu o povară, nu cu o victorie: „n-am putut singur să vă duc”. Recunoașterea neputinței personale este pragul de la care se ridică o rânduială nouă. Un popor înmulțit „ca stelele cerului” — făgăduința lui Avraam împlinită sub ochii lui — nu mai poate fi călăuzit de un singur om.",
        "Alegerea judecătorilor cere calități limpezi: „înțelepți, pricepuți și cunoscuți”, aleși chiar de către semințiile lor. Rânduiala nu este impusă de la Moise în jos, ci recunoscută din mijlocul poporului însuși — aceeași structură văzută deja în Exod 18:21-26.",
        "Porunca dată judecătorilor este fără echivoc: „să nu vă uitați la fața omului la judecată”, mic sau mare, străin sau băștinaș. Judecata este a lui Dumnezeu, iar cazurile prea grele se aduc înaintea lui Moise — nu ca pe o scăpare din răspundere, ci ca pe o rezervă pentru ce trece peste puterea omenească de înțelegere.",
      ),
      words: [
        {
          original: "לא-תכירו פנים",
          transliteration: "lo-takiru fanim",
          language: "ebraica",
          meaning:
            "să nu cunoașteți/părtiniți fața — să nu aveți părtinire. Formula standard pentru nepărtinirea cerută judecătorilor din Israel.",
        },
      ],
      crossRefs: ["Exod 18:21-26", "Geneza 15:5", "Numeri 11:16-17"],
      forYourHeart:
        "Recunoașterea că nu poți duce singur o răspundere nu este înfrângere, ci începutul unei rânduieli sănătoase.",
    },
    {
      id: "deuteronom-1-19-33",
      ref: "Deuteronom 1:19-33",
      heading: "Cercetașii, raportul și răzvrătirea de la Cades-Barnea",
      text: deuteronomPassage(1, 19, 33),
      teaching: teaching(
        "Ajunși la Cades-Barnea, poporul însuși cere iscoade: „Să trimitem înainte pe unii care să cerceteze țara”. Cei doisprezece se întorc și aduc din roadele țării, mărturisind că este bună — și totuși, chiar din raportul lor bun se naște frica și cârteala.",
        "Moise îi amintește poporului chiar propriile lui cuvinte de încurajare: „DOMNUL, Dumnezeul tău, care merge înaintea ta, se va lupta El însuși pentru voi”, așa cum a făcut în Egipt. Dar cuvintele bune nu au fost de-ajuns împotriva unei inimi care îndoia.",
        "Cârteala poporului este aspră și răstălmăcitoare: acuză pe DOMNUL că îi urăște, că i-a scos din Egipt ca să-i dea în mâna amoriților. Necredința nu este niciodată tăcută; ea preface iubirea lui Dumnezeu în ură, și izbăvirea în trădare.",
        "Versetul 32 spune totul în cinci cuvinte: „n-ați crezut pe DOMNUL, Dumnezeul vostru”. Păcatul de la Cades-Barnea nu a fost, la rădăcină, frică de război, ci necredință față de făgăduință.",
      ),
      words: [
        {
          original: "לא האמנתם",
          transliteration: "lo he’emantem",
          language: "ebraica",
          meaning:
            "n-ați crezut. Verbul de la care vine „amin”; miezul păcatului de la Cades-Barnea este descris direct ca lipsă de încredere, nu ca frică sau lipsă de curaj.",
        },
      ],
      crossRefs: ["Numeri 13:1-33", "Numeri 14:1-4", "Evrei 3:16-19"],
      forYourHeart:
        "Un raport corect despre binecuvântare poate fi întors împotriva ta de o inimă care nu crede. Verifică-ți inima, nu doar faptele, înainte de a cârti.",
    },
    {
      id: "deuteronom-1-34-40",
      ref: "Deuteronom 1:34-40",
      heading: "Jurământul care închide țara pentru o generație",
      text: deuteronomPassage(1, 34, 40),
      teaching: teaching(
        "Mânia DOMNULUI se aprinde și vine un jurământ fără întoarcere: „Niciunul din bărbații acestei generații rele nu va vedea țara cea bună”, afară de Caleb, care „a urmat întru totul pe DOMNUL”. Exact acest lucru îl deosebește pe Caleb de restul iscoadelor: nu curajul lui militar, ci statornicia inimii lui.",
        "Iosua este numit aici, înainte de finalul cărții, ca cel care va duce poporul în țară: „el o va împărți lui Israel de moștenire”. Continuitatea legământului nu se rupe pentru că o generație a căzut; Dumnezeu pregătește deja păstorul următor.",
        "Chiar copiii cei mici sunt scutiți de acest jurământ — „care nu cunosc încă azi ce este bine și ce este rău” — arătând că judecata lui Dumnezeu ține seama de răspunderea morală, nu pedepsește la întâmplare o generație întreagă fără distincție.",
      ),
      words: [
        {
          original: "מלא אחרי יהוה",
          transliteration: "mile’ aharei YHWH",
          language: "ebraica",
          meaning:
            "a urmat În totul pe DOMNUL, literal „a umplut după DOMNUL”. Expresia descrie o statornicie deplină, nedivizată, folosită anume pentru Caleb.",
        },
      ],
      crossRefs: ["Numeri 14:20-35", "Numeri 32:11-12", "Iosua 14:6-14"],
      forYourHeart:
        "Nu curajul tău în fața primejdiei te scapă, ci statornicia de a urma pe deplin pe DOMNUL, ca Caleb.",
    },
    {
      id: "deuteronom-1-41-46",
      ref: "Deuteronom 1:41-46",
      heading: "O pocăință târzie și o înfrângere care confirmă cuvântul",
      text: deuteronomPassage(1, 41, 46),
      teaching: teaching(
        "Poporul încearcă să repare greșeala prin proprii puteri: „Vom sui și vom lupta”, spun ei, după ce refuzaseră să facă exact acest lucru când DOMNUL le poruncise. DOMNUL însă nu mai este cu ei în această luptă inițiată din propria voință, și sunt bătuți de amoriți la Horma.",
        "Cuvântul lui Moise este limpede: „DOMNUL nu este în mijlocul vostru”. Pocăința adevărată nu înseamnă doar a încerca din nou aceeași faptă pe care ai refuzat-o mai înainte, ci a te întoarce la ascultarea de cuvântul care este dat în prezent, nu la cel care s-a închis deja.",
        "Capitolul se încheie cu poporul șezând la Cades „multe zile”, ca o imagine a anilor pierduți în pustie. Ceea ce ar fi putut fi un scurt drum de unsprezece zile s-a preschimbat, prin necredință, într-o ședere lungă, fără progres, înainte ca o generație nouă să fie pregătită să asculte altfel.",
      ),
      words: [
        {
          original: "אין יהוה בקרבכם",
          transliteration: "ein YHWH beqirbekhem",
          language: "ebraica",
          meaning:
            "DOMNUL nu este în mijlocul vostru. Explicația directă pentru înfrângerea de la Horma: prezența lui Dumnezeu, nu numărul sau curajul, hotărăște biruința.",
        },
      ],
      crossRefs: ["Numeri 14:39-45", "Numeri 21:1-3"],
      forYourHeart:
        "O pocăință care încearcă doar să repare fapta de ieri, fără să asculte cuvântul de azi, rămâne tot o faptă făcută fără DOMNUL.",
    },
  ],
  prayer:
    "Doamne, Tu ne-ai purtat de grăită chiar și când am ales necredința.\n\nÎnvață-ne să credem făgăduința Ta înainte de a cârti împotriva greutății drumului.\n\nDă-ne statornicia lui Caleb, nu doar curajul de o clipă.\n\nȘi învață-ne că pocăința adevărată ascultă cuvântul de azi, nu doar repară fapta de ieri. Amin.",
  status: DEUTERONOM_STATUSES[1],
})
