import { leviticChapter, teaching } from "./leviticHelpers.js"

/*
 * Cartea Levitic, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în leviticText.ts (fișierele leviticTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const LEVITIC_21 = leviticChapter({
  number: 21,
  title: "Levitic 21 — Măsura cerută de la cel care slujeste",
  summary:
    "Rânduieli pentru preoți: cum se ating de morți, cum se ține jalea, cu cine se însoară, și o măsură mai strânsă pentru marele preot. La sfârșit se vorbește despre cei cu o lipsă în trup: nu se apropie ca să aducă jertfa, dar mâncă din pâinea sfântă, ca toți ceilalți. Se repetă de mai multe ori: Eu sunt Domnul care îi sfințesc.",
  literaryContext:
    "Ia aminte că după două capitole către tot poporul se întoarce vorba către preoți. Nu întâmplător în această ordine: întâi sfințenia în casele oamenilor, apoi măsura celor care slujesc. Și vezi că nu se cere mai multă lucrare de la preot, ci mai multă luare-aminte la felul în care trăiește. Cine stă înaintea altora este cercetat mai de aproape.",
  historicalContext:
    "În popoarele din jur, jalea se ținea cu tăieturi în carne, cu păr ras în chipuri anume și cu barba scurtată; erau semne legate de închinarea la morți. Preotul lui Israel nu avea voie să se țină de ele. Și se cade știut că preoția se moștenea; un om născut cu o lipsă în trup rămânea preot prin naștere și trăia din darurile aduse la cort, chiar dacă nu se apropia de altar. Nu era lepădat din casa lui și nu era lăsat fără pâine.",
  units: [
    {
      verses: [1, 6],
      heading: "Jalea, dar nu ca a popoarelor",
      teaching: teaching(
        "Preotul nu se atingea de un mort, afară de rudele lui cele mai apropiate: mama, tatăl, fiul, fiica, fratele și sora nemăritată. Ia aminte că nu i s-a oprit jalea. I s-a oprit numai îndeletnicirea cu morții altora, fiindcă avea de intrat la cort. Dumnezeu nu a cerut nimănui să nu-și plângă morții.",
        "Și vezi ce este oprit lămurit: părul ras în chipuri anume, marginile bărbii tăiate, tăieturile în carne. Toate erau semne de jale luate de la popoarele care se închinau morților. Cine crede în viață nu jelește ca cel fără nădejde; plânge, dar altfel.",
        "Ia seama la pricina dată: fiindcă aduc jertfele Domnului, pâinea Dumnezeului lor. Sunt sfinți pentru El. Nu se spune că sunt mai buni decât ceilalți; se spune că sunt puși deoparte pentru o lucrare anume.",
        "Și ține minte că Domnul Iisus a plâns la mormntul lui Lazăr, măcar că știa ce avea să facă îndată. Sfințenia nu usucă lacrimile. Pavel scrie să nu ne întristam ca cei fără nădejde — nu să nu ne întristam.",
      ),
      words: [
        {
          original: "לנפש לא יטמא בעמיו",
          transliteration: "lanefeș lo itama beamav",
          language: "ebraica",
          meaning:
            "să nu se spurce pentru un mort din poporul lui. Jalea nu i-a fost oprită.",
        },
        {
          original: "לא יקרחה קרחה בראשם",
          transliteration: "lo ikrehu korha beroșam",
          language: "ebraica",
          meaning:
            "să nu-și radă capul în chipuri anume. Semne luate de la închinarea la morți.",
        },
        {
          original: "לחם אלהיהם",
          transliteration: "lehem Eloheihem",
          language: "ebraica",
          meaning:
            "pâinea Dumnezeului lor. Pricina pentru care erau puși deoparte.",
        },
      ],
      crossRefs: ["Ioan 11:35", "1 Tesaloniceni 4:13", "Deuteronomul 14:1", "Romani 12:15", "2 Corinteni 1:3-4"],
      forYourHeart:
        "Sfințenia nu usucă lacrimile. Nu ne întristăm ca cei fără nădejde, dar ne întristăm.",
    },
    {
      verses: [7, 9],
      heading: "Casa celui care slujeste",
      teaching: teaching(
        "Preotul nu se însura cu o femeie desfrânată sau lepădată de bărbatul ei. Ia aminte că lucrul acesta nu vorbește de dispreț față de femei; în același capăt de carte se cere de la preot o viață mai strânsă decât de la oricine altcineva. Se cerea o casă la vedere, fără pricină de vorbă, fiindcă el mijlocea pentru toți.",
        "Și vezi același lucru în Noul Testament, unde se cere ca cel pus într-o slujbă să fie fără pată în casa lui și să aibă mărturie bună și de la cei de afară. Nu darurile îl așează pe un om în slujbă, ci felul în care trăiește.",
        "Ia seama la versetul greu despre fiica preotului. Nu se cade să-l citim ca o lege pentru noi; era o hotărâre a țării aceleia, iar adunarea de azi nu are sabie. Ce rămâne este învățătura: păcatul din casa celui care slujeste lovește și în lucrarea lui, și în cei care se uitau la el.",
        "Și ține minte că Dumnezeu nu a cerut copiilor preotului să fie fără greș, și nu îi osndește părinții pentru fiecare alegere a copiilor lor mari. Ai lui Aaron au căzut greu, și el a rămas preot. Se cere să fie casa ținută curat, nu să fie fără durere.",
      ),
      words: [
        {
          original: "אשה זנה וחללה",
          transliteration: "ișa zona vahalala",
          language: "ebraica",
          meaning:
            "femeie desfrânată sau pusă la o parte. Se cerea o casă fără pricină de vorbă.",
        },
        {
          original: "קדש הוא לאלהיו",
          transliteration: "kadoș hu lelohav",
          language: "ebraica",
          meaning:
            "este sfânt pentru Dumnezeul lui. Pus deoparte, nu socotit mai bun.",
        },
        {
          original: "אני יהוה מקדשכם",
          transliteration: "ani Domnul mekadișhem",
          language: "ebraica",
          meaning:
            "Eu sunt Domnul care vă sfințesc. Se repetă în tot capitolul.",
        },
      ],
      crossRefs: ["1 Timotei 3:2-5", "Tit 1:6-7", "Iacov 3:1", "1 Samuel 2:12", "Luca 12:48"],
      forYourHeart:
        "Nu darurile îl așează pe un om în slujbă, ci felul în care trăiește în casa lui.",
    },
    {
      verses: [10, 12],
      heading: "Marele preot nu iese din locul sfânt",
      teaching: teaching(
        "De la marele preot se cere mai mult: să nu-și lase părul în neorânduială, să nu-și rupă hainele, să nu se atingă de niciun mort, nici de tatăl și nici de mama lui, și să nu iasă din locul sfânt. Ia aminte cât de greu era lucrul acesta: nici la mormntul părinților lui. Slujba lui nu se oprește nici când i se rupe inima.",
        "Și vezi pricina: untdelemnul ungerii Dumnezeului lui este asupra lui. Nu se cere pentru că ar fi fără simțire, ci pentru că poartă o lucrare care nu se poate întrerupe. În ziua ispășirii, tot poporul atârna de el.",
        "Ia seama că tocmai ce era oprit aici a făcut marele preot din vremea Domnului Iisus: și-a rupt hainele când L-a auzit vorbind. Cel care avea poruncă să nu-și rupă haina a rupt-o împotriva Celui care avea să fie adevăratul Mare Preot.",
        "Și ține minte cum se împlinesce lucrul acesta în Noul Testament: avem un Mare Preot care nu iese din locul sfânt și nu încheie niciodată mijlocirea, fiindcă nu moare. Nu se schimbă și nu se întrerupe; trăiește pururea ca să mijlocească pentru noi.",
      ),
      words: [
        {
          original: "את ראשו לא יפרע",
          transliteration: "et roșo lo ifra",
          language: "ebraica",
          meaning:
            "să nu-și lase capul în neorânduială. Semnul obișnuit al jalei.",
        },
        {
          original: "ומן המקדש לא יצא",
          transliteration: "umin hamikdaș lo iețe",
          language: "ebraica",
          meaning:
            "să nu iasă din locul sfânt. Lucrarea nu se întrerupe.",
        },
        {
          original: "נזר שמן משחת אלהיו עליו",
          transliteration: "nezer șemen mișhat Elohav alav",
          language: "ebraica",
          meaning:
            "cununa untdelemnului ungerii Dumnezeului lui este asupra lui.",
        },
      ],
      crossRefs: ["Evrei 7:24-25", "Matei 26:65", "Evrei 4:14-15", "Evrei 9:24", "Romani 8:34"],
      forYourHeart:
        "Avem un Mare Preot care nu iese din locul sfânt și nu încheie niciodată mijlocirea.",
    },
    {
      verses: [13, 15],
      heading: "Sămânța nu se spurcă în poporul lui",
      teaching: teaching(
        "Marele preot se însura cu o fecioară din poporul lui, nu cu o văduvă, nu cu o femeie lepădată, nu cu una căzută. Ia aminte că măsura aceasta nu era pusă pe capul femeilor, ci pe capul lui: răspunderea alegerii era a celui pus în slujbă.",
        "Și vezi încheierea: ca să nu spurce sămânța lui în poporul lui. Ce se făcea în casa lui trecea la copii și, prin ei, la slujba de mâine. Alegerile cuiva care slujeste nu se opresc la el.",
        "Ia seama că nu se învață aici că văduvele sau femeile lepădate ar fi mai puțin primite de Dumnezeu. Toată Scriptura spune împotrivă: El este apărătorul văduvei. Aici se vorbește despre o singură slujbă anume, nu despre prețuirea unui om.",
        "Și ține minte că, în Noul Testament, toți cei ai Lui sunt numiți preoție sfântă, și mireasa Lui este făcută curată nu prin trecutul ei, ci prin sângele Lui. Ce se cerea acolo în chip trupesc se face aici printr-o spălare.",
      ),
      words: [
        {
          original: "אשה בבתוליה יקח",
          transliteration: "ișa bivtuleha ikaă",
          language: "ebraica",
          meaning:
            "să ia o femeie fecioară. Răspunderea alegerii era a lui.",
        },
        {
          original: "מעמיו יקח אשה",
          transliteration: "meamav ikaă ișa",
          language: "ebraica",
          meaning:
            "din poporul lui să ia femeie. Nu dintre popoarele închinate idolilor.",
        },
        {
          original: "ולא יחלל זרעו",
          transliteration: "velo ihalel zaro",
          language: "ebraica",
          meaning:
            "ca să nu spurce sămânța lui. Alegerile lui treceau la copii.",
        },
      ],
      crossRefs: ["1 Petru 2:9", "Efeseni 5:25-27", "Psalmi 68:5", "Iacov 1:27", "2 Corinteni 11:2"],
      forYourHeart:
        "Alegerile cuiva care slujeste nu se opresc la el; trec la copiii lui.",
    },
    {
      verses: [16, 21],
      heading: "Cel cu o lipsă în trup nu se apropie de altar",
      teaching: teaching(
        "Se înșiră lipsurile trupești pentru care un om din sămânța lui Aaron nu se apropia să aducă jertfele: orb, șchiop, cu fața stricată, cu mâna sau piciorul frnt, cocoșat, pitic, cu boală la ochi și celelalte. Ia aminte ce nu spune textul: nu spune că omul acela ar fi vinovat, și nu spune că lipsa lui ar fi păcat.",
        "Și vezi ce învăța lucrul acesta poporul. Jertfa trebuia să fie fără defect, și cel care o aducea trebuia să fie fără defect: tot ce se apropia de altar arăta spre Cineva fără pată. Nu era o socoteală despre trupurile oamenilor, ci un semn despre Mielul care avea să vină.",
        "Ia seama că tocmai pe cei lăsați afară de rânduiala aceasta i-a chemat întâi Domnul Iisus: orbii, șchiopii, cei cu mâna uscată. În pilda Lui despre cină, ei sunt cei aduși înăuntru de pe ulițe. Ce nu putea intra atunci a fost chemat la masă mai târziu.",
        "Și ține minte că se cade să spunem lămurit ce nu învață capitolul acesta: nimeni nu este prețuit de Dumnezeu după trupul lui, și nicio boală nu îl scoate din dragostea Lui. Aici se vorbește numai despre o slujbă la altarul din vremea aceea, nu despre prețul unui om.",
      ),
      words: [
        {
          original: "כל איש אשר בו מום",
          transliteration: "kol iș așer bo mum",
          language: "ebraica",
          meaning:
            "orice om care are o lipsă în trup. Nu se spune că ar fi vinovat.",
        },
        {
          original: "לא יקרב להקריב",
          transliteration: "lo ikrav lehakriv",
          language: "ebraica",
          meaning:
            "să nu se apropie ca să aducă. O rânduială despre altar, nu despre prețul lui.",
        },
        {
          original: "את לחם אלהיו",
          transliteration: "et lehem Elohav",
          language: "ebraica",
          meaning:
            "jertfele Dumnezeului lui. Tot ce se apropia de altar arăta spre Mielul fără pată.",
        },
      ],
      crossRefs: ["Matei 11:5", "Luca 14:13", "Luca 14:21", "1 Petru 1:19", "Ioan 9:2-3"],
      forYourHeart:
        "Tocmai cei lăsați afară de rânduiala aceasta au fost chemați întâi la masa Lui.",
    },
    {
      verses: [22, 24],
      heading: "Dar din pâinea sfântă mâncă",
      teaching: teaching(
        "Și vine cuvântul cel mai bun al capitolului: mâncă din pâinea Dumnezeului lui, din cea preasfântă și din cea sfântă. Ia aminte ce se spune aici. Omul cu o lipsă în trup nu se apropia de altar, dar nu era scos de la masă. Nu slujea, dar mânca alături de frații lui, din același dar.",
        "Și vezi cum se păzeste aici cinstea lui: nu i s-a luat pâinea și nu i s-a luat numele. Se ținea în casă și era hrănit din ce se aducea la cort. Dumnezeu nu ține pe nimeni afară din familia Lui pentru ceva ce nu a putut alege.",
        "Ia seama la încheiere: Eu sunt Domnul care îi sfințesc. De patru ori în capitolul acesta se întoarce vorba aceasta. Nu rânduielile îi făceau sfinți, ci El.",
        "Și ține minte că în Noul Testament ușa s-a deschis și mai larg: în Hristos, cel slăbit este pus în slujbă, și tocmai prin slăbiciunea lui se arată puterea Lui. Ce era atunci o oprire s-a făcut aici o ușă.",
      ),
      words: [
        {
          original: "לחם אלהיו יאכל",
          transliteration: "lehem Elohav iohal",
          language: "ebraica",
          meaning:
            "să mânce din pâinea Dumnezeului lui. Nu slujea, dar nu era scos de la masă.",
        },
        {
          original: "מקדשי הקדשים",
          transliteration: "mikodșei hakodașim",
          language: "ebraica",
          meaning:
            "din cele preasfinte. Partea cea mai de preț nu i-a fost luată.",
        },
        {
          original: "אני יהוה מקדשם",
          transliteration: "ani Domnul mekadșam",
          language: "ebraica",
          meaning:
            "Eu sunt Domnul care îi sfințesc. Nu rânduielile, ci El.",
        },
      ],
      crossRefs: ["2 Corinteni 12:9-10", "1 Corinteni 1:27-29", "Ioan 6:37", "Romani 15:7", "Psalmi 23:5"],
      forYourHeart:
        "Nu i s-a luat nici pâinea, nici numele. Pe cine ții tu departe de masă?",
    },
  ],
  prayer:
    "Doamne, mulțumim că avem un Mare Preot care nu iese niciodată din locul sfânt.\n\nPăzește casele celor care slujesc și ține-i în curat, fără fățărnicie.\n\nIar pe cei care se socotesc nevrednici să se apropie, adună-i la masa Ta.\n\nTu ești Domnul care ne sfințește; nu rânduielile noastre. Amin."
})
