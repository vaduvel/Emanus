import { leviticChapter, teaching } from "./leviticHelpers.js"

/*
 * Cartea Levitic, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în leviticText.ts (fișierele leviticTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const LEVITIC_23 = leviticChapter({
  number: 23,
  title: "Levitic 23 — Sărbătorile Domnului",
  summary:
    "Șapte sărbători așezate într-un an: ziua de odihnă, Paștele, azimile, pârga, Cincizecimea, ziua trâmbițelor, ziua ispășirii și sărbătoarea corturilor. Nu sunt sărbătorile poporului, ci ale Domnului: El le-a hotărât vremea și El a chemat la ele. Privite împreună, ele spun dinainte istoria mântuirii, de la Miel până la strângerea de la sfârșit.",
  literaryContext:
    "Ia aminte la cuvântul care se repetă de la început: sărbătorile Mele, adunări sfinte pe care le veți vesti la vremea lor. Și vezi cum începe șirul: nu cu Paștele, ci cu ziua de odihnă, care se ținea în fiecare săptămână. Întâi odihna, apoi sărbătorile. Iar la mai toate se spune: să nu faceți nicio lucrare de slugă. Poporul se oprește de la lucru ca să vadă ce a lucrat Dumnezeu.",
  historicalContext:
    "Sărbătorile erau legate de anul agricol al țării: pârga la începutul culesului de orz, Cincizecimea la grâu, corturile la strângerea din urmă, a viei și a livezii. Trei ori pe an bărbații mergeau la locul rânduit, iar drumurile Israelului se umpleau de oameni. Poporul acesta primise un calendar în care fiecare cules îi amintea cine dă rodul. Și tocmai la aceste sărbători s-au împlinit lucrurile cele mari: Domnul a fost jertfit la Paște și Duhul a fost turnat la Cincizecime.",
  units: [
    {
      verses: [1, 3],
      heading: "Întâi odihna, și abia apoi sărbătorile",
      teaching: teaching(
        "Înainte de șirul sărbătorilor de peste an se pomenește ziua de odihnă din fiecare săptămână: șase zile se lucrează, iar ziua a șaptea este odihnă, adunare sfântă, în toate locurile unde veți locui. Ia aminte la vorba din urmă: nu numai la cort, ci acasă, oriunde. Închinarea nu era ținută doar într-un loc.",
        "Și vezi că odihna este pusă înaintea tuturor sărbătorilor mari. Un popor care nu știe să se oprească o zi din șapte nu știe nici să sărbătorească. Cine nu se poate opri crede, în ascuns, că lumea atârnă de mâinile lui.",
        "Ia seama că se spune sărbătorile Domnului, nu ale poporului. Nu și-au ales ei vremurile de bucurie și nu și-au făcut ei calendarul. Dumnezeu a hotărât când se strâng și pentru ce. Închinarea nu se face după gustul nostru.",
        "Și ține minte ce a spus Domnul Iisus despre ziua aceasta: ziua de odihnă a fost făcută pentru om, nu omul pentru ziua de odihnă. Nu ne mai leagă litera ei, dar rămâne darul din ea: Dumnezeu Îi dă omului învoire să se oprească.",
      ),
      words: [
        {
          original: "מועדי יהוה",
          transliteration: "moadei Domnul",
          language: "ebraica",
          meaning:
            "vremurile hotărâte ale Domnului. Nu sărbătorile poporului.",
        },
        {
          original: "מקראי קדש",
          transliteration: "mikraei kodeș",
          language: "ebraica",
          meaning:
            "adunări sfinte, chemări. Poporul era chemat, nu se strângea de la sine.",
        },
        {
          original: "שבת שבתון",
          transliteration: "șabat șabaton",
          language: "ebraica",
          meaning:
            "odihnă deplină. Pusă înaintea tuturor sărbătorilor mari.",
        },
      ],
      crossRefs: ["Marcu 2:27", "Exod 20:8-11", "Evrei 4:9-10", "Coloseni 2:16-17", "Isaia 58:13-14"],
      forYourHeart:
        "Cine nu se poate opri o zi crede, în ascuns, că lumea atârnă de mâinile lui.",
    },
    {
      verses: [4, 8],
      heading: "Paștele și săptămâna azimilor",
      teaching: teaching(
        "În luna întâi, în a paisprezecea zi, spre seară, era Paștele Domnului, iar a doua zi începea sărbătoarea azimilor, șapte zile. Ia aminte la ordinea: întâi mielul junghiat, apoi viața fără aluat. Nu se cere curățirea înainte de miel; ea vine după.",
        "Și vezi cum se împlinesce lucrul acesta: Hristos, Paștele nostru, a fost jertfit, scrie Pavel; de aceea să prăznuim nu cu aluatul cel vechi, ci cu azimile curviei lăsate în urmă, cu pâine nedospită a curăției și a adevărului. Întâi Mielul, apoi viața nouă.",
        "Ia seama că aluatul se scotea din case, nu doar din pâine. Se umbla prin toată casa și se scotea afară tot ce era dospit. Așa se face și curățirea unui om: nu numai fapta cea mare, ci și lucrurile mici ținute în colțuri.",
        "Și ține minte că Domnul a fost jertfit chiar la vremea aceasta, nu întâmplător. Dumnezeu a așezat sărbătoarea cu mai bine de o mie de ani înainte, ca să se știe, când va veni ziua, spre ce arătase.",
      ),
      words: [
        {
          original: "פסח ליהוה",
          transliteration: "pesah laDomnul",
          language: "ebraica",
          meaning:
            "Paștele Domnului. Trecerea pe lângă casele acoperite de sânge.",
        },
        {
          original: "חג המצות",
          transliteration: "hag hamațot",
          language: "ebraica",
          meaning:
            "sărbătoarea azimilor. Viața fără aluat vine după miel.",
        },
        {
          original: "כל מלאכת עבדה לא תעשו",
          transliteration: "kol melehet avoda lo taasu",
          language: "ebraica",
          meaning:
            "să nu faceți nicio lucrare de slugă. Se opreau ca să vadă ce a lucrat El.",
        },
      ],
      crossRefs: ["1 Corinteni 5:7-8", "Ioan 1:29", "Exod 12:5-7", "1 Petru 1:18-19", "Marcu 14:12"],
      forYourHeart:
        "Întâi Mielul, apoi viața curată. Nu se cere curățirea ca preț de intrare.",
    },
    {
      verses: [9, 14],
      heading: "Pârga: întâiul snop ridicat",
      teaching: teaching(
        "Când intrau în țară și începeau culesul, aduceau la preot întâiul snop, iar el îl legăna înaintea Domnului. Și nu se mânca din rodul nou până nu se aducea partea aceasta. Ia aminte la rânduială: întâi se dă, și abia apoi se mâncă.",
        "Și vezi ce spune întâiul snop: dacă începutul culesului este al Lui, tot culesul este al Lui. Nu se dă o parte ca să fie lăsat restul în pace; se dă întâiul rod ca mărturie că tot țarina este a Lui.",
        "Ia seama la ziua în care se făcea: a doua zi după ziua de odihnă din săptămâna azimilor, adică întâia zi a săptămânii. În ziua aceea a înviat Domnul Iisus. Pavel Îl numește cel întâi rod dintre cei adormiți. Snopul acela ridicat înaintea Domnului Îl vestea pe El.",
        "Și ține minte ce nădejde este în cuvântul pârgă: unde este întâiul snop vine și tot culesul. Învierea Lui nu este o întâmplare singură; este începutul unui cules în care intră toți ai Lui.",
      ),
      words: [
        {
          original: "עמר ראשית קצירכם",
          transliteration: "omer reșit kețirhem",
          language: "ebraica",
          meaning:
            "snopul cel întâi al culesului vostru.",
        },
        {
          original: "להניף לפני יהוה",
          transliteration: "lehanif lifnei Domnul",
          language: "ebraica",
          meaning:
            "să fie legănat înaintea Domnului. Ridicat la vedere, ca mărturie.",
        },
        {
          original: "ממחרת השבת",
          transliteration: "mimahorat hașabat",
          language: "ebraica",
          meaning:
            "a doua zi după ziua de odihnă. În ziua aceea a înviat El.",
        },
      ],
      crossRefs: ["1 Corinteni 15:20-23", "Proverbe 3:9", "Romani 8:23", "Ioan 20:1", "Iacov 1:18"],
      forYourHeart:
        "Unde este întâiul snop vine și tot culesul. Învierea Lui nu rămâne singură.",
    },
    {
      verses: [15, 22],
      heading: "Cincizecimea, și miriștea lăsată pentru săraci",
      teaching: teaching(
        "Se numărau cincizeci de zile de la ziua pârgii, și atunci se aducea un dar nou: două pâini dospite, coapte din grâul cel nou. Ia aminte că aici, singura dată, se aduce pâine dospită — iar alături se aduce și o jertfă pentru păcat. Pâinile acelea ne închipuiesc pe noi, oameni în care se mai află aluat, primiți însă prin jertfă.",
        "Și vezi ce s-a întâmplat exact în ziua aceasta: la Cincizecime s-a turnat Duhul și s-au adăugat în aceeași zi vreo trei mii de suflete. Cele două pâini s-au împlinit într-o adunare în care au intrat și iudei și, mai târziu, popoarele.",
        "Ia seama la versetul pus la încheiere, care pare că nu se potrivește: când îți strângi holda, să nu culegi până la marginea țarinii și să lași pentru sărac și pentru străin. Se întoarce aici, în mijlocul sărbătorilor. Dumnezeu nu primește sărbătoarea unui om care nu lasă nimic pentru cel flămând.",
        "Și ține minte legătura: închinarea și mila stau într-un singur capitol. Cine cntă la sărbătoare și își culege țarina până la ultimul spic nu a înțeles nimic. Iacov scrie același lucru cu alte vorbe.",
      ),
      words: [
        {
          original: "וספרתם לכם שבע שבתות",
          transliteration: "usfartem lahem șeva șabatot",
          language: "ebraica",
          meaning:
            "să numărați șapte săptămâni. De aici numele Cincizecime.",
        },
        {
          original: "לחם תנופה שתים",
          transliteration: "lehem tenufa ștaim",
          language: "ebraica",
          meaning:
            "două pâini de legănat. Singura dată când se aduce pâine dospită.",
        },
        {
          original: "לעני ולגר תעזב אתם",
          transliteration: "leani velager taazov otam",
          language: "ebraica",
          meaning:
            "să le lași pentru sărac și pentru străin. În mijlocul sărbătorilor.",
        },
      ],
      crossRefs: ["Fapte 2:1-4", "Fapte 2:41", "Iacov 1:27", "Levitic 19:9-10", "Efeseni 2:14-16"],
      forYourHeart:
        "Dumnezeu nu primește sărbătoarea unui om care nu lasă nimic pentru cel flămând.",
    },
    {
      verses: [23, 32],
      heading: "Trâmbițele, și ziua în care nu se lucrează nimic",
      teaching: teaching(
        "În luna a șaptea, în ziua întâi, era ziua trâmbițelor: o zi de odihnă și de aducere-aminte, cu sunet de trâmbiță. Ia aminte ce făcea sunetul acela: strângea poporul și îl trezea. Nu se dădea o învățătură nouă; se chema la luare-aminte înaintea zilei celei grele.",
        "Și vezi că la zece zile după aceea venea ziua ispășirii, singura zi în care poporul își smerea sufletul și nu făcea nicio lucrare. De trei ori se spune aici: cine nu se va smeri va fi tăiat, și cine va lucra în ziua aceea va fi nimicit. Nicio zi din an nu este așa de apăsată asupra lucrului oprit.",
        "Ia seama pentru ce se cerea oprirea deplină: fiindcă în ziua aceea lucra numai marele preot, în locul în care nimeni altul nu intra. Poporul stătea afară și nu făcea nimic. Ispășirea nu se ajută cu mâna omului.",
        "Și ține minte că aici este chipul cel mai limpede al mântuirii prin har: într-o zi de post, cu mâinile lăsate în jos, un popor întreg primește iertare pentru lucrarea altuia. La Cruce s-a împlinit: s-a ispăvit, a zis El, și noi nu am adăugat nimic.",
      ),
      words: [
        {
          original: "זכרון תרועה",
          transliteration: "zihron terua",
          language: "ebraica",
          meaning:
            "aducere-aminte cu sunet de trâmbiță. O chemare la trezie.",
        },
        {
          original: "יום הכפרים",
          transliteration: "iom hakipurim",
          language: "ebraica",
          meaning:
            "ziua ispășirii. O singură zi în tot anul.",
        },
        {
          original: "ועניתם את נפשתיכם",
          transliteration: "veinitem et nafoșoteihem",
          language: "ebraica",
          meaning:
            "să vă smeriți sufletele. Oprirea de la sine, nu câștigarea unei răsplăți.",
        },
        {
          original: "כל מלאכה לא תעשו",
          transliteration: "kol melaha lo taasu",
          language: "ebraica",
          meaning:
            "să nu faceți nicio lucrare. Ispășirea nu se ajută cu mâna omului.",
        },
      ],
      crossRefs: ["Levitic 16:29-31", "Ioan 19:30", "Evrei 10:14", "Efeseni 2:8-9", "1 Corinteni 15:52"],
      forYourHeart:
        "Într-o zi cu mâinile lăsate în jos, un popor întreg primește iertare pentru lucrarea Altuia.",
    },
    {
      verses: [33, 44],
      heading: "Sărbătoarea corturilor: bucuria celor care își amintesc",
      teaching: teaching(
        "În a cincisprezecea zi a lunii a șaptea începea sărbătoarea corturilor, șapte zile, cu o a opta zi de adunare sfântă. Poporul lua ramuri de finic și de copaci frumoși, și ședea în colibe. Ia aminte la pricină: ca să știe urmașii că Dumnezeu i-a făcut să locuiască în colibe când i-a scos din Egipt.",
        "Și vezi înțelepciunea lucrului: după culesul cel mai bogat al anului, când casele erau plinq și hambarele grele, poporul ieșea din case și dormea într-o colibă de ramuri. Tocmai la bogăție se uită omul de unde a fost scos. Belsugul șterge amintirea mai lesne decât lipsa.",
        "Ia seama că este singura sărbătoare la care se spune de două ori să vă bucurați. Nu era o pomenire tristă a robiei, ci o bucurie: uite unde am ajuns și uite ce am fost. Cine își amintește de unde a fost scos nu-și pierde bucuria.",
        "Și ține minte că la sărbătoarea aceasta a strigat Domnul Iisus, în ziua de pe urmă, cea mare: dacă Îi este cuiva sete, să vină la Mine și să bea. În zilele acelea se turna apă înaintea Domnului, ca aducere-aminte a apei din stâncă. El a spus limpede că apa aceea era El.",
      ),
      words: [
        {
          original: "חג הסכות",
          transliteration: "hag hasukot",
          language: "ebraica",
          meaning:
            "sărbătoarea colibelor. Șapte zile sub ramuri.",
        },
        {
          original: "ושמחתם לפני יהוה",
          transliteration: "usmahtem lifnei Domnul",
          language: "ebraica",
          meaning:
            "să vă bucurați înaintea Domnului. Spus de două ori aici.",
        },
        {
          original: "למען ידעו דרתיכם",
          transliteration: "lemaan iedu doroteihem",
          language: "ebraica",
          meaning:
            "ca să știe urmașii voștri. Sărbătoarea era și învățătură.",
        },
        {
          original: "ביום השמיני מקרא קדש",
          transliteration: "baiom hașmini mikra kodeș",
          language: "ebraica",
          meaning:
            "în ziua a opta, adunare sfântă. Ziua începutului nou.",
        },
      ],
      crossRefs: ["Ioan 7:37-38", "Deuteronomul 16:14-15", "Deuteronomul 8:11-14", "Neemia 8:17", "Apocalipsa 7:9"],
      forYourHeart:
        "Belșugul șterge amintirea mai lesne decât lipsa. Ții minte de unde ai fost scos?",
    },
  ],
  prayer:
    "Doamne, Tu ai așezat vremurile și Tu ai chemat la ele; nu noi ne-am făcut sărbătorile.\n\nÎnvață-ne să ne oprim de la lucru și să privim la ce ai lucrat Tu.\n\nMulțumim că Mielul a fost junghiat și că întâiul snop a fost ridicat.\n\nSă nu uităm niciodată, în mijlocul belșugului, de unde ne-ai scos. Amin."
})
