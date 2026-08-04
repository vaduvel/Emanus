import { leviticChapter, teaching } from "./leviticHelpers.js"

/*
 * Cartea Levitic, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în leviticText.ts (fișierele leviticTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const LEVITIC_22 = leviticChapter({
  number: 22,
  title: "Levitic 22 — Nici mâinile murdare, nici darul stricat",
  summary:
    "Două jumătăți: întâi cine se apropie de lucrurile sfinte și cine mâncă din ele, apoi ce fel de dar se primește la altar. Se cere jertfă fără defect, nu una la care omul și-ar da seama că scăpa ieftin. Și se încheie cu Numele: Eu sunt Domnul care vă sfințesc, care v-am scos din țara Egiptului.",
  literaryContext:
    "Ia aminte la așezarea celor două părți: cel care aduce și ce se aduce. Nu ajunge una fără cealaltă. Un om curat cu un dar stricat nu este primit, și un dar fără defect adus cu mâini spurcate nu este primit. Și vezi cum se încheie: nu cu o amenințare, ci cu ieșirea din Egipt — se cere sfințenie de la un popor răscumpărat, nu de la unul care își câștigă scăparea.",
  historicalContext:
    "Preoții nu aveau țarină; trăiau din partea cuvenită din jertfe, și din ea mânca toată casa lor: femeia, copiii, robii născuți în casă. De aceea se spune lămurit cine mâncă și cine nu: nu era o socoteală de cinste, ci de pâine de fiecare zi. Iar în privința jertfelor, obiceiul lumii de atunci era să se aleagă pentru dumnezei animalul cel mai slab din stână. Israelului i s-a cerut tocmai pe dos.",
  units: [
    {
      verses: [1, 9],
      heading: "Cu mâini curate se atinge omul de lucruri sfinte",
      teaching: teaching(
        "Preotul care era necurat nu se atingea de lucrurile sfinte până nu se curățea. Ia aminte că necurățiile pomenite aici sunt lucruri de fiecare zi: o boală, o atingere de un mort, o întâmplare a trupului. Nu erau păcate. Dar nu se intra la lucrurile sfinte ca și când nu s-ar fi întâmplat nimic.",
        "Și vezi că se dă și calea de întoarcere, nu numai oprirea: se spală, așteaptă până seara, și apoi mâncă. Dumnezeu nu a lepădat pe nimeni pentru o necurăție; a rânduit o spălare și o răbdare.",
        "Ia seama la vorba grea: cine se apropia în starea aceea era tăiat dinaintea Lui. Nu fiindcă Dumnezeu ar fi asprit peste măsură, ci fiindcă lucrurile sfinte nu se iau în ușor. Pavel scrie același lucru despre masa Domnului: să se cerceteze omul înainte de a mânca.",
        "Și ține minte că la noi curățirea nu se face prin spălarea trupului, ci prin mărturisire și prin sângele Lui. Nu ne oprim de la masa Lui pentru că suntem păcătoși, ci ne apropiem curățiți; ceea ce nu se cade este să venim nesocotind, cu păcatul ținut cu bună știință în mână.",
      ),
      words: [
        {
          original: "וינזרו מקדשי בני ישראל",
          transliteration: "veinazru mikodșei benei Israel",
          language: "ebraica",
          meaning:
            "să se țină deoparte de lucrurile sfinte ale copiilor lui Israel.",
        },
        {
          original: "ורחץ בשרו במים",
          transliteration: "verahhaț besaro bamaim",
          language: "ebraica",
          meaning:
            "să-și spele trupul în apă. S-a dat și calea de întoarcere.",
        },
        {
          original: "ושמרו את משמרתי",
          transliteration: "veșamru et mișmarti",
          language: "ebraica",
          meaning:
            "să păzească ce le-am dat în păstrare. Lucrurile sfinte nu se iau în ușor.",
        },
      ],
      crossRefs: ["1 Corinteni 11:27-29", "1 Ioan 1:9", "Evrei 10:22", "Psalmi 24:3-4", "Iacov 4:8"],
      forYourHeart:
        "Nu ne oprim de la masa Lui fiindcă suntem păcătoși; ne apropiem curățiți.",
    },
    {
      verses: [10, 16],
      heading: "Cine mâncă din partea sfântă",
      teaching: teaching(
        "Din partea sfântă mânca numai casa preotului: cei născuți în casa lui și cei cumpărați de el, nu oaspetele și nu ziliierul. Ia aminte care era măsura: nu meritul, ci apartenența la casa lui. Nu se mânca din partea aceea fiindcă omul lucrase pentru ea, ci fiindcă era al casei.",
        "Și vezi cum se leagă aici de noi: nu mâncăm din cele ale lui Dumnezeu pentru ce am făcut, ci pentru că am fost făcuți ai casei Lui. Pavel scrie tocmai așa: nu mai suntem străini și oaspeți, ci oameni din casa lui Dumnezeu.",
        "Ia seama la rânduiala pentru fata preotului: dacă se mărită afară din preoție, nu mai mâncă din partea sfântă; iar dacă rămâne văduvă sau lepădată, fără copii, și se întoarce în casa tatălui ei, mâncă iarăși. Dumnezeu a rânduit un loc de întors pentru femeia rămasă singură. Nu era lăsată să se descurce.",
        "Și ține minte ce se cerea de la cel care mâncase din greșeală: aducea înapoi lucrul și mai adăuga a cincea parte. Nu se încheia socoteala cu vorba nu am știut; se îndrepta ce se putea îndrepta. Iar Zacheu a făcut același lucru, din inimă, fără să i se ceară.",
      ),
      words: [
        {
          original: "וכל זר לא יאכל קדש",
          transliteration: "vehol zar lo iohal kodeș",
          language: "ebraica",
          meaning:
            "nimeni străin de casă să nu mânce din partea sfântă.",
        },
        {
          original: "יליד ביתו",
          transliteration: "ielid beito",
          language: "ebraica",
          meaning:
            "născut în casa lui. Măsura era apartenența, nu meritul.",
        },
        {
          original: "ויסף חמשיתו עליו",
          transliteration: "veiasaf hamișito alav",
          language: "ebraica",
          meaning:
            "să mai adauge a cincea parte. Nu se încheia cu nu am știut.",
        },
      ],
      crossRefs: ["Efeseni 2:19", "Luca 19:8", "Ioan 1:12", "Rut 1:8-9", "Galateni 4:7"],
      forYourHeart:
        "Nu mâncăm din cele ale Lui pentru ce am făcut, ci pentru că am fost făcuți ai casei Lui.",
    },
    {
      verses: [17, 25],
      heading: "Jertfa fără defect, și socoteala ieftină",
      teaching: teaching(
        "Jertfa trebuia să fie fără defect: nici oarbă, nici cu ceva frnt, nici cu răni, nici cu neg, nici cu râie. Ia aminte de ce se înșiră atât de amănunțit: fiindcă omul știe să aleagă pentru Dumnezeu tocmai vita de care voia să se scape. Se dovedește milostiv cu stâna lui și socoate că Dumnezeu nu bagă de seamă.",
        "Și vezi că tocmai lucrul acesta i-a mustrat Dumnezeu prin Maleahi, la multă vreme după aceea: aduceți ce este șchiop și bolnav; încercați să duceți așa ceva dregătorului vostru, și vedeți dacă vă primește. Dumnezeu nu primește ce nu se cade dat nici unui om cu putere.",
        "Ia seama la miezul lucrului: nu se cerea o vită scumpă, ci una bună. La jertfa de bunăvoie se îngăduia mai mult, iar cel sărac aducea două turturele. Nu mărimea darului era cântărită, ci dacă omul Îi dă ce este bun sau ce îi prisosește.",
        "Și ține minte spre Cine arătau toate: Mielul fără defect și fără pată. Fiecare cercetare a vitei înainte de altar spunea același lucru: va veni Unul în care nu se va afla nimic de îndreptat. Și a venit.",
      ),
      words: [
        {
          original: "תמים יהיה לרצון",
          transliteration: "tamim ihie lerațon",
          language: "ebraica",
          meaning:
            "să fie fără defect, ca să fie primită.",
        },
        {
          original: "כל אשר בו מום לא תקריבו",
          transliteration: "kol așer bo mum lo takrivu",
          language: "ebraica",
          meaning:
            "ce are un defect să nu-l aduceți. Nu se aduce ce voiai să arunci.",
        },
        {
          original: "לא לרצון יהיה לכם",
          transliteration: "lo lerațon ihie lahem",
          language: "ebraica",
          meaning:
            "nu va fi primită pentru voi. Socoteala ieftină nu se primește.",
        },
      ],
      crossRefs: ["Maleahi 1:8", "1 Petru 1:19", "Evrei 9:14", "2 Samuel 24:24", "Luca 2:24"],
      forYourHeart:
        "Nu mărimea darului este cântărită, ci dacă Îi dai ce este bun sau ce îți prisosește.",
    },
    {
      verses: [26, 30],
      heading: "Șapte zile lângă mamă",
      teaching: teaching(
        "Vițelul, mielul și iedul rămâneau șapte zile lângă mama lor, și abia din ziua a opta se puteau aduce. Și nu se junghia vaca ori oaia împreună cu puiul ei în aceeași zi. Ia aminte câtă milă este într-o lege despre jertfe: Dumnezeu a pus o măsură chiar în felul în care se lua o vită din stână.",
        "Și vezi că legea Lui nu învață pe om să se împătrită la inimă nici față de o făptură necuvântătoare. Cel drept are milă de vita lui, spune Proverbele. Cine se învață să fie fără milă cu animalele nu rămâne multă vreme milos cu oamenii.",
        "Ia seama la rânduiala jertfei de mulțumire: se mânca în aceeași zi, și nu se ținea nimic pentru dimineața. S-a spus și la capitolul șapte. Mulțumirea nu se pune la păstrare; se aduce în ziua în care s-a primit darul.",
        "Și ține minte că ziua a opta se întoarce iarăși, ca la Levitic 9 și ca la tăierea împrejur: ziua de după săptămâna plină, ziua începutului nou. Domnul a înviat în ziua aceea, și ce era doar un semn s-a făcut începutul unei vieți noi.",
      ),
      words: [
        {
          original: "שבעת ימים תחת אמו",
          transliteration: "șivat iamim tahat imo",
          language: "ebraica",
          meaning:
            "șapte zile să rămână lângă mama lui.",
        },
        {
          original: "לא תשחטו ביום אחד",
          transliteration: "lo tișhatu beiom ehad",
          language: "ebraica",
          meaning:
            "să nu junghiați mama și puiul în aceeași zi.",
        },
        {
          original: "ביום ההוא יאכל",
          transliteration: "baiom hahu iehal",
          language: "ebraica",
          meaning:
            "în aceeași zi să se mânce. Mulțumirea nu se pune la păstrare.",
        },
      ],
      crossRefs: ["Proverbe 12:10", "Deuteronomul 22:6-7", "Levitic 7:15", "Levitic 9:1", "Luca 24:1"],
      forYourHeart:
        "Mulțumirea nu se pune deoparte pentru mâine. Se aduce în ziua în care ai primit.",
    },
    {
      verses: [31, 33],
      heading: "Nu se spurcă Numele, ci se sfințește",
      teaching: teaching(
        "Încheierea strânge tot capitolul: păziți poruncile Mele și le împliniți; să nu spurcați Numele Meu cel sfânt, ca să fiu sfințit în mijlocul copiilor lui Israel. Ia aminte ce se pune alături: felul în care se aduce jertfa și cinstea Numelui Lui. Se poate spurca un Nume prin felul în care I se aduce un dar.",
        "Și vezi că lucrul cel mai greu nu este ce cred oamenii despre noi, ci ce ajung să creadă despre Dumnezeu privind la noi. Pavel scrie că Numele Lui era hulit între popoare din pricina celor care se lăudau cu legea. Purtăm un Nume care nu este al nostru.",
        "Ia seama la ultimul temei dat: Eu sunt Domnul care vă sfințesc, care v-am scos din țara Egiptului ca să fiu Dumnezeul vostru. Întâi răscumpărarea, apoi sfințenia. Nu se cere de la robi să-și câștige ieșirea; se cere de la cei ieșiți să trăiască după Cel care i-a scos.",
        "Și ține minte că această încheiere este aceeași cu începutul rugăciunii pe care ne-a învățat-o Domnul Iisus: sfințească-se Numele Tău. Nu începem cu ce ne trebuie; începem cu Numele Lui.",
      ),
      words: [
        {
          original: "ולא תחללו את שם קדשי",
          transliteration: "velo tehalelu et șem kodși",
          language: "ebraica",
          meaning:
            "să nu spurcați Numele Meu cel sfânt.",
        },
        {
          original: "ונקדשתי בתוך בני ישראל",
          transliteration: "venikdaști betoh benei Israel",
          language: "ebraica",
          meaning:
            "ca să fiu sfințit în mijlocul copiilor lui Israel.",
        },
        {
          original: "המוציא אתכם מארץ מצרים",
          transliteration: "hamoți etkem meereț Mițraim",
          language: "ebraica",
          meaning:
            "care v-am scos din țara Egiptului. Întâi răscumpărarea, apoi sfințenia.",
        },
      ],
      crossRefs: ["Matei 6:9", "Romani 2:24", "1 Petru 1:15-16", "Ezechiel 36:23", "Tit 2:11-12"],
      forYourHeart:
        "Nu ce cred oamenii despre tine atârnă greu, ci ce ajung să creadă despre El privind la tine.",
    },
  ],
  prayer:
    "Doamne, nu ne lăsa să ne apropiem de lucrurile Tale cu mâini nespălate și cu inimă nesocotită.\n\nȘi nu ne lăsa să-ți aducem ce nu ne mai trebuie.\n\nÎnvață-ne să mulțumim în ziua în care primim, nu mâine.\n\nSfințească-se Numele Tău în mijlocul nostru, Doamne, care ne-ai scos din robie. Amin."
})
