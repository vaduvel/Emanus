import { leviticChapter, teaching } from "./leviticHelpers.js"

/*
 * Cartea Levitic, explicată pe unități de sens.
 *
 * Textul biblic: păstrat separat în leviticText.ts (fișierele leviticTextN.ts).
 * Explicația: scrisă pentru Emanus după cercetarea textului. Nu se copiază
 * formularea niciunui predicator sau comentator.
 */

export const LEVITIC_20 = leviticChapter({
  number: 20,
  title: "Levitic 20 — Cât de greu atârnă păcatul",
  summary:
    "Ce a fost oprit la capitolul 18 este așezat aici cu pedeapsă: darea copiilor lui Moloh, întoarcerea la cei care cheamă duhuri, blestemarea părinților, preacurvia și legăturile oprite. Se spune și ce se întâmplă când poporul întoarce ochii și nu face nimic. La sfârșit se întoarce chemarea: fiți sfinți, căci Eu, Domnul, sunt sfânt, și Eu v-am despărțit de celelalte popoare.",
  literaryContext:
    "Ia aminte că acest capitol este oglinda capitolului 18: acolo s-a spus ce să nu se facă, aici se spune ce se întâmplă dacă se face. Între ele stă capitolul 19, despre viața de zi cu zi. Și vezi cum se încheie: nu cu osndă, ci cu o chemare la sfințenie și cu amintirea că Dumnezeu i-a scos afară dintre popoare. Osnda nu este ultimul cuvânt nici aici.",
  historicalContext:
    "Israelul era, în vremea aceea, și popor și țară și adunare, toate într-una; legile lui erau și legi de stat. De aceea unele păcate aveau aici pedeapsă de moarte, ca în orice așezământ de țară din vremea aceea. Se cade spus lămurit: hotărârile acelea au fost date poporului aceluia, sub așezământul acela, și nu au fost lăsate în mâna adunării de azi. Biserica nu are sabie; are Cuvântul, mustrarea și chemarea la pocăință.",
  units: [
    {
      verses: [1, 5],
      heading: "Când poporul întoarce ochii",
      teaching: teaching(
        "Întâiul lucru judecat este darea copiilor lui Moloh. Ia aminte însă la ce se adaugă îndată: dacă poporul își întoarce ochii de la omul acela și nu face nimic, Dumnezeu Însuși își întoarce fața împotriva lui și împotriva casei lui. Nu numai fapta este judecată; și tăcerea celor care au știut și au tăcut.",
        "Și vezi cât de greu atârnă lucrul acesta înaintea lui Dumnezeu. Unde se face rău unui copil, cel mai lesne păcat este al vecinului care spune că nu este treaba lui. În adunările noastre s-au acoperit lucruri grele tocmai cu vorba aceasta.",
        "Ia seama pentru ce se spune că lucrul acela spurca locul sfânt și Numele Lui: fiindcă se făcea în numele închinării. Când răul se face sub acoperirea credinței, se lovește și în cel călcat și în Numele lui Dumnezeu.",
        "Și ține minte că Dumnezeu nu a lăsat lucrul la voia adunării: dacă oamenii tac, spune El, Eu voi lucra. Cine nu apără pe cel mic nu scăpă fiindcă a tăcut frumos.",
      ),
      words: [
        {
          original: "ואם העלם יעלימו את עיניהם",
          transliteration: "veim halem ialimu et eineihem",
          language: "ebraica",
          meaning:
            "dacă își vor întoarce ochii. Și tăcerea este judecată.",
        },
        {
          original: "ושמתי אני את פני באיש ההוא",
          transliteration: "vesamti ani et panai baiș hahu",
          language: "ebraica",
          meaning:
            "Și Eu Îmi voi întoarce fața împotriva omului aceluia. Dacă oamenii tac, lucrează El.",
        },
        {
          original: "לטמא את מקדשי",
          transliteration: "letame et mikdași",
          language: "ebraica",
          meaning:
            "ca să spurce locul Meu sfânt. Răul făcut în numele închinării.",
        },
      ],
      crossRefs: ["Iacov 4:17", "Proverbe 24:11-12", "Matei 18:6", "Ezechiel 34:2-4", "1 Corinteni 5:2"],
      forYourHeart:
        "Cel mai lesne păcat este al celui care spune că nu este treaba lui. Ce știi și taci?",
    },
    {
      verses: [6, 8],
      heading: "Cine își caută liniștea în altă parte",
      teaching: teaching(
        "Cine se întoarce la cei care cheamă duhuri și la ghicitori va fi tăiat din popor. Ia aminte la cuvântul folosit: se desfrânează după ei. Dumnezeu nu socotește lucrul o greșeală de nesocotință, ci o necredincioșie: omul își duce nădejdea și întrebarea la altcineva.",
        "Și vezi ce urmează îndată, în locul unei alte amenințări: sfințiți-vă și fiți sfinți, căci Eu sunt Domnul, Dumnezeul vostru. Iar apoi cuvântul cel mai bun din capitol: Eu sunt Domnul care vă sfințesc. Se cere sfințenie și, în aceeași suflare, se făgăduiește că El o lucrează.",
        "Ia seama că aici stă deosebirea dintre lege și har, chiar în Vechiul Testament. Nu se spune numai fiți sfinți; se spune și Eu vă sfințesc. Cine încearcă să se curețe singur ostenește și cade; cine se dă în mâna Lui este curățit.",
        "Și ține minte că la ghicitori merge, de cele mai multe ori, omul îngrijorat, nu omul rău. Frica și durerea îl duc acolo. De aceea nu se cade să fie arătat cu degetul cel care a mers, ci să fie chemat înapoi la Cel care sfințește.",
      ),
      words: [
        {
          original: "לזנות אחריהם",
          transliteration: "liznot ahareihem",
          language: "ebraica",
          meaning:
            "să se desfrâneze după ei. O necredincioșie, nu o simplă nesocotință.",
        },
        {
          original: "והתקדשתם והייתם קדשים",
          transliteration: "vehitkadiștem vihiitem kedoșim",
          language: "ebraica",
          meaning:
            "sfințiți-vă și fiți sfinți. Pus în locul unei alte amenințări.",
        },
        {
          original: "אני יהוה מקדשכם",
          transliteration: "ani Domnul mekadișhem",
          language: "ebraica",
          meaning:
            "Eu sunt Domnul care vă sfințesc. Cuvântul cel mai bun din capitol.",
        },
      ],
      crossRefs: ["1 Tesaloniceni 5:23-24", "Filipeni 2:13", "Isaia 8:19", "Evrei 13:20-21", "Ioan 15:5"],
      forYourHeart:
        "Se cere sfințenie și, în aceeași suflare, El făgăduiește că o lucrează El.",
    },
    {
      verses: [9, 16],
      heading: "Pedepse grele, și Cel care le-a luat asupra Lui",
      teaching: teaching(
        "Urmează șirul cel greu: cine blestemă pe tatăl sau pe mama lui, preacurvia, legăturile oprite în casă, faptele pomenite la capitolul 18 — toate cu pedeapsă de moarte. Ia aminte că nu putem citi lucrurile acestea ca și când ar fi date nouă ca lege. Israelul era și țară, iar acestea erau legile țării aceleia. Adunarea de azi nu are sabie; are Cuvântul și chemarea la pocăință.",
        "Și vezi totuși ce ne învață ele și astăzi: cât de greu atârnă păcatul înaintea lui Dumnezeu. Ne-am obișnuit să socotim aceste lucruri slăbiciuni, greșeli de tinerețe, întâmplări. Dumnezeu le-a socotit vrednice de moarte. Cine nu vede greutatea nu înțelege nici prețul Crucii.",
        "Ia seama la ce se spune de fiecare dată: sângele lui va fi asupra lui. Vina stătea pe capul celui care făcuse. Iar la Golgota s-a făcut lucrul cel mai neaașteptat: vina noastră a stătut pe capul Altuia, și osnda pe care o cerea legea aceasta a căzut peste El.",
        "Și ține minte cum a lucrat Domnul Iisus când I-au adus o femeie prinsă în preacurvie, cu litera acestui capitol în gură. Nu a zis că legea greșește și nu a zis că fapta nu este păcat. A spus două lucruri: cine este fără păcat să arunce întâi, și du-te și să nu mai păcătuiești. Așa se ține și greutatea păcatului și mila, într-o singură mână.",
      ),
      words: [
        {
          original: "אביו ואמו קלל",
          transliteration: "aviv veimo kilel",
          language: "ebraica",
          meaning:
            "a blestemat pe tatăl și pe mama lui. Nu o vorbă grea, ci o lepădare.",
        },
        {
          original: "דמיו בו",
          transliteration: "damav bo",
          language: "ebraica",
          meaning:
            "sângele lui va fi asupra lui. La Golgota, vina noastră a stătut pe Altul.",
        },
        {
          original: "מות יומת",
          transliteration: "mot iumat",
          language: "ebraica",
          meaning:
            "să fie dat morții. Legea unei țări de atunci, nu a adunării de azi.",
        },
      ],
      crossRefs: ["Ioan 8:7-11", "Romani 6:23", "Isaia 53:5-6", "Galateni 3:13", "Romani 8:1"],
      forYourHeart:
        "Cine nu vede greutatea păcatului nu înțelege nici prețul Crucii.",
    },
    {
      verses: [17, 21],
      heading: "Ce rămâne fără rod",
      teaching: teaching(
        "Pentru alte fapte nu se cere moartea, ci tăierea din popor sau o altă urmare: vor rămâne fără copii, își vor purta fărădelegea, vor muri fără rod. Ia aminte că nu toate păcatele au fost măsurate la fel. Dumnezeu deosebește, și noi îi punem pe toți într-o grămadă.",
        "Și vezi ce fel de urmare este pomenită aici: nu o lovitură pe loc, ci o viață care nu rodește. Sunt păcate care nu se plătesc îndată, dar usucă încet: casa rămâne, și bucuria nu mai vine în ea. Cine seamănă în carne culege stricăciune, scrie Pavel, cu alte vorbe, același lucru.",
        "Ia seama că nu se cade să întoarcem versetul acesta împotriva oamenilor fără copii. Scriptura spune în alt loc lămurit că nu orice lipsă este pedeapsă, iar Domnul Iisus a oprit tocmai socoteala aceasta când au întrebat despre orbul din naștere. Aici se vorbește despre o urmare hotărâtă de Dumnezeu într-un caz anume, nu despre o regulă pentru toată lumea.",
        "Și ține minte că rodul cel mai de preț nu se numără în copii, ci în viață schimbată. Un om poate avea casa plină și să fie uscăciune, și poate fi singur și să rodească în mulți. Rodul îl dă vița, nu mândria noastră.",
      ),
      words: [
        {
          original: "ונכרתו לעיני בני עמם",
          transliteration: "venihretu leeinei benei amam",
          language: "ebraica",
          meaning:
            "vor fi tăiați înaintea ochilor poporului lor. Nu toate au fost măsurate la fel.",
        },
        {
          original: "ערירים ימתו",
          transliteration: "aririm iamutu",
          language: "ebraica",
          meaning:
            "vor muri fără rod. O viață care nu rodește, nu o lovitură pe loc.",
        },
        {
          original: "עונם ישאו",
          transliteration: "avonam isau",
          language: "ebraica",
          meaning:
            "își vor purta fărădelegea. Ce nu se plătește îndată usucă încet.",
        },
      ],
      crossRefs: ["Galateni 6:7-8", "Ioan 9:2-3", "Isaia 56:4-5", "Ioan 15:4-5", "Proverbe 13:15"],
      forYourHeart:
        "Sunt păcate care nu lovesc îndată, dar usucă încet. Ce se usucă în tine?",
    },
    {
      verses: [22, 24],
      heading: "Țara nu ține pe cine face la fel",
      teaching: teaching(
        "Să păziți toate legile Mele, ca să nu vă verse țara afară. Ia aminte că se întoarce vorba de la capitolul 18: țara nu ține pe cine face faptele acelea, oricine ar fi el. Poporul lui Dumnezeu nu era apărat de urmări fiindcă era al Lui. Cel ce se numește al Lui este judecat întâi.",
        "Și vezi pricina pentru care se făcea scăderea popoarelor de acolo: fiindcă au făcut lucrurile acelea, și Dumnezeu le-a urât. Nu se spune că le-a urât pe ele, ci faptele lor. Deosebirea aceasta nu se cade uitată când vorbim despre oameni.",
        "Ia seama la făgăduința pusă îndată după amenințare: vă voi da țara lor și o veți stăpâni, țara în care curge lapte și miere. Dumnezeu nu încheie cu frica. Și aici, și la capitolul 18, după vorba grea urmează o făgăduință.",
        "Și ține minte cuvântul: Eu sunt Domnul, Dumnezeul vostru, care v-am despărțit de celelalte popoare. Nu poporul s-a deosebit prin osteneala lui; El i-a deosebit. Sfințenia începe cu o lucrare a Lui, nu cu o hotărâre a noastră.",
      ),
      words: [
        {
          original: "ולא תקיא אתכם הארץ",
          transliteration: "velo taki etkem haareț",
          language: "ebraica",
          meaning:
            "și țara să nu vă verse afară. Nici pe voi nu vă ține, dacă faceți la fel.",
        },
        {
          original: "ואקץ בם",
          transliteration: "vaakuț bam",
          language: "ebraica",
          meaning:
            "și Mi-a fost scârbă de ele. De fapte, nu de făptura omului.",
        },
        {
          original: "אשר הבדלתי אתכם מן העמים",
          transliteration: "așer hivdalti etkem min haamim",
          language: "ebraica",
          meaning:
            "care v-am despărțit de popoare. El i-a deosebit, nu osteneala lor.",
        },
      ],
      crossRefs: ["1 Petru 4:17", "Romani 2:11", "1 Petru 2:9", "Ioan 15:16", "Evrei 12:14"],
      forYourHeart:
        "Nu ne-am deosebit noi; El ne-a deosebit. Sfințenia începe cu lucrarea Lui.",
    },
    {
      verses: [25, 27],
      heading: "Deosebirea de fiecare zi, și încheierea",
      teaching: teaching(
        "La sfârșit se întoarce rânduiala despre făpturi curate și necurate, de la capitolul 11. Ia aminte pentru ce este pusă aici: ca deosebirea să se vadă în fiecare zi, la masă, nu numai în lucrurile mari. Un popor învață sfințenia din lucruri mărunte, care se repetă.",
        "Și vezi încheierea întregii părți: să-Mi fiți sfinți, căci Eu, Domnul, sunt sfânt, și v-am despărțit de popoare ca să fiți ai Mei. Nu se spune să fiți sfinți ca să vă deosebiți de oameni, ci fiindcă sunteți ai Lui. Ținta nu este despărțirea, ci înrudirea cu El.",
        "Ia seama că și rânduielile acestea de masă nu ne mai leagă; s-a spus lămurit în Noul Testament. Ce rămâne este învățătura din ele: cine nu deosebește în lucruri mici nu deosebește nici în lucruri mari.",
        "Și ține minte ultimul verset, care se întoarce la ghicitori și la cei care cheamă duhuri. Capitolul începe cu Moloh și se încheie cu duhurile: de la început până la sfârșit, primejdia cea mai mare a poporului a fost să caute la altcineva ce numai Dumnezeu putea da.",
      ),
      words: [
        {
          original: "והבדלתם בין הבהמה הטהרה לטמאה",
          transliteration: "vehivdaltem bein habehema hatehora latemea",
          language: "ebraica",
          meaning:
            "să deosebiți între vita curată și cea necurată. Deosebirea de fiecare zi.",
        },
        {
          original: "והייתם לי קדשים",
          transliteration: "vihiitem li kedoșim",
          language: "ebraica",
          meaning:
            "să-Mi fiți sfinți. Ținta este înrudirea cu El, nu despărțirea de oameni.",
        },
        {
          original: "אוב או ידעני",
          transliteration: "ov o iideoni",
          language: "ebraica",
          meaning:
            "cel care cheamă duhuri sau ghicitorul. Capitolul se încheie unde a început.",
        },
      ],
      crossRefs: ["Marcu 7:18-19", "1 Petru 1:15-16", "Luca 16:10", "Coloseni 2:20-22", "Ieremia 17:5-7"],
      forYourHeart:
        "Cine nu deosebește în lucruri mici nu deosebește nici în lucruri mari.",
    },
  ],
  prayer:
    "Doamne, ne-ai arătat cât de greu atârnă păcatul, și cât de mare este mila Ta.\n\nMulțumim că osnda pe care o cerea legea a căzut peste Fiul Tău, nu peste noi.\n\nNu ne lăsa să tăcem când cineva slab este călcat în picioare.\n\nTu ești Domnul care ne sfințește; lucrează Tu ce noi nu putem lucra. Amin."
})
