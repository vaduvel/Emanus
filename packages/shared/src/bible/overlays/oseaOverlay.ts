import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const sourceUrl = "https://www.cfcindia.com/through-the-bible/hosea-joel"
const p = (section: string) => ({ kind: "poonen-official" as const, sourceUrl, section })
const n = {
  kind: "biblia-emanus" as const,
  note: "rezumat narativ fără doctrină adăugată" as const,
}

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "Viața profetului devine imaginea infidelității lui Israel",
    summary: "Osea primește o însărcinare familială dureroasă prin care mesajul despre adulterul spiritual al lui Israel devine personal și vizibil.",
    units: [{
      from: 1, to: 11,
      heading: "Hosea's Training",
      teaching: "Tema oficială Poonen pentru începutul cărții este «pregătirea lui Osea». Textul îl introduce într-o chemare care îl face să simtă în propria viață ceva din durerea legământului trădat. Emanus nu transformă această însărcinare profetică unică într-o poruncă pentru cineva de a intra într-o relație nesigură ori abuzivă pentru a demonstra o lecție spirituală.",
      source: p("Hosea's Training"),
    }],
  },
  2: {
    number: 2,
    title: "Adulter spiritual, disciplină și promisiunea unei noi logodne",
    summary: "Israel aleargă după alți iubiți, dar Dumnezeu descrie atât consecințele infidelității, cât și chemarea spre restaurare.",
    units: [{
      from: 1, to: 23,
      heading: "Israel's Spiritual Adultery",
      teaching: "Poonen rezumă această parte prin «adulterul spiritual al lui Israel». Limbajul conjugal explică idolatria ca infidelitate de legământ, nu ca simplă schimbare de preferință religioasă. Finalul capitolului întoarce însă imaginea spre restaurare: Dumnezeu vorbește din nou despre logodire în dreptate, milă și credincioșie.",
      source: p("Israel's Spiritual Adultery"),
      words: [{
        original: "חֶסֶד",
        transliteration: "hesed",
        language: "ebraica",
        meaning: "bunătate statornică, iubire loială de legământ; apare în promisiunea noii relații din Osea 2:19.",
        verseRef: "Osea 2:19",
        lexicalSource: "WLC-OSHB",
      }],
    }],
  },
  3: {
    number: 3,
    title: "Iubirea reluată și perioada de așteptare a lui Israel",
    summary: "Osea primește porunca de a iubi din nou femeia necredincioasă, iar gestul devine o imagine a felului în care Israel va trece prin lipsire înainte de a se întoarce la DOMNUL.",
    units: [
      {
        from: 1, to: 3,
        heading: "Osea o aduce înapoi și cere fidelitate",
        teaching: "Textul spune că Osea este trimis din nou spre femeia iubită, deși ea fusese necredincioasă. El plătește un preț pentru ea și îi cere o perioadă de fidelitate, fără alți bărbați. Acțiunea profetului este prezentată explicit ca semn al iubirii DOMNULUI față de Israel în timp ce poporul se îndreaptă spre alți dumnezei.",
        source: n,
      },
      {
        from: 4, to: 5,
        heading: "Fără rege și cult, apoi întoarcere",
        teaching: "Explicația dată de text mută imaginea de la familia profetului la istoria lui Israel: poporul va rămâne o vreme fără împărat, căpetenie, jertfă și obiectele cultice enumerate. După această perioadă, textul anunță întoarcerea spre DOMNUL și căutarea bunătății Lui.",
        source: n,
      },
    ],
  },
  4: {
    number: 4,
    title: "Lipsa cunoașterii lui Dumnezeu și răspunderea liderilor",
    summary: "Capitolul trece de la imaginea familiei profetului la o acuzație directă împotriva poporului și a preoților.",
    units: [{
      from: 1, to: 19,
      heading: "The Judgement of God",
      teaching: "Tema Poonen pentru secțiunea de mijloc este judecata lui Dumnezeu. Osea 4 arată de ce: adevărul, mila și cunoașterea lui Dumnezeu lipsesc, iar liderii religioși contribuie la degradare. «Poporul Meu piere din lipsă de cunoștință» nu este laudă pentru acumularea de informație; contextul este cunoașterea lui Dumnezeu care produce fidelitate morală.",
      source: p("The Judgement of God"),
    }],
  },
  5: {
    number: 5,
    title: "Conducătorii sunt chemați la judecată, iar alianțele nu vindecă rana",
    summary: "Preoții, casa regală și poporul sunt confruntați pentru necredincioșie. Când rana devine vizibilă, Israel caută ajutor politic, dar capitolul spune că soluția aceea nu îl poate vindeca.",
    units: [
      {
        from: 1, to: 7,
        heading: "Preoții, casa împăratului și Efraim sunt confruntați",
        teaching: "Capitolul începe chemând la ascultare tocmai grupurile cu răspundere publică: preoții, casa lui Israel și casa împăratului. Textul spune că necredincioșia lor nu este ascunsă de Dumnezeu, că faptele îi țin departe de întoarcere și că până și căutarea religioasă cu turme și cirezi nu Îl găsește pe DOMNUL atunci când relația a fost trădată.",
        source: n,
      },
      {
        from: 8, to: 15,
        heading: "Asiria vede rana, dar nu o poate vindeca",
        teaching: "A doua parte sună alarma pentru apropierea judecății. Efraim își vede boala și Iuda rana, dar răspunsul lui Efraim este să alerge la Asiria. Textul spune direct că împăratul căutat nu poate vindeca rana. Capitolul se încheie cu retragerea lui Dumnezeu până când vina este recunoscută și fața Lui este căutată în necaz.",
        source: n,
      },
    ],
  },
  6: {
    number: 6,
    title: "«Milă voiesc, nu jertfă»",
    summary: "Întoarcerea superficială este confruntată, iar Dumnezeu spune că dorește iubire statornică și cunoașterea Lui mai mult decât ritual.",
    units: [{
      from: 1, to: 11,
      heading: "Ritualul nu înlocuiește hesed",
      teaching: "În centrul acuzației apare 6:6: Dumnezeu dorește bunătate statornică și cunoașterea Lui, nu jertfă folosită ca substitut pentru acestea. Iisus va cita versetul în Evanghelii. Textul nu desființează prin aceasta toate formele de închinare; condamnă ritualul separat de caracter și milă.",
      source: p("Israel's Spiritual Adultery"),
      words: [{
        original: "חֶסֶד חָפַצְתִּי",
        transliteration: "hesed hafațti",
        language: "ebraica",
        meaning: "«milă/iubire statornică am dorit»; accentul cade pe fidelitatea de legământ, nu pe ritualul gol.",
        verseRef: "Osea 6:6",
        lexicalSource: "WLC-OSHB",
      }],
    }],
  },
  7: {
    number: 7,
    title: "Dumnezeu vrea să vindece, dar răul continuă să iasă la suprafață",
    summary: "Osea descrie o societate în care intriga, minciuna și alianțele externe continuă chiar sub disciplină. Refrenul capitolului este că Israel nu se întoarce cu adevărat spre Dumnezeu.",
    units: [
      {
        from: 1, to: 7,
        heading: "Cuptorul intrigii și căderea conducătorilor",
        teaching: "Când Dumnezeu vorbește despre vindecare, textul spune că tocmai atunci se descoperă din nou nelegiuirea. Imaginea cuptorului descrie răul care arde în interiorul cercului politic: minciuna îl înveselește pe împărat, conducătorii sunt prinși în excese, iar judecătorii și împărații cad. Ultima observație a secțiunii este că niciunul nu Îl cheamă pe Dumnezeu.",
        source: n,
      },
      {
        from: 8, to: 12,
        heading: "Amestec printre popoare și ajutor căutat în Egipt și Asiria",
        teaching: "Efraim este descris prin două imagini: o turtă neîntoarsă și o pasăre fără pricepere. Puterea lui este consumată fără ca el să observe, iar răspunsul politic este să cheme Egiptul și să alerge în Asiria. Textul insistă că aceste mișcări nu echivalează cu întoarcerea la DOMNUL.",
        source: n,
      },
      {
        from: 13, to: 16,
        heading: "Strigăt fără întoarcere din inimă",
        teaching: "Finalul capitolului pune alături dorința lui Dumnezeu de a-i scăpa și minciunile prin care poporul continuă să I se împotrivească. Ei se bocesc pentru grâu și must, dar textul precizează că nu strigă către Dumnezeu din inimă. Chiar când se întorc, direcția întoarcerii nu este spre Cel Preaînalt.",
        source: n,
      },
    ],
  },
  8: {
    number: 8,
    title: "Legământ încălcat, idoli făcuți de mâini și vântul care devine furtună",
    summary: "Israel pretinde că Îl cunoaște pe Dumnezeu, dar își organizează conducerea, închinarea și alianțele fără El. Capitolul urmărește consecințele acestei rupturi până la pierderea lucrurilor în care poporul se încredea.",
    units: [
      {
        from: 1, to: 6,
        heading: "«Te cunoaștem», dar legământul și binele sunt lepădate",
        teaching: "Începutul pune în contrast declarația religioasă a lui Israel — că Îl cunoaște pe Dumnezeu — cu faptele enumerate imediat: legământul este călcat, binele este lepădat, conducătorii sunt instalați fără Dumnezeu, iar argintul și aurul devin idoli. Vițelul Samariei este numit lucrare omenească și nu Dumnezeu.",
        source: n,
      },
      {
        from: 7, to: 10,
        heading: "Semănatul vântului și cumpărarea alianțelor",
        teaching: "Imaginea centrală spune că semănatul vântului produce o recoltă de furtună. Lipsa rodului și pierderea lui către străini sunt puse lângă dispersarea printre neamuri. Efraim caută Asiria și plătește pentru prietenii politice, dar textul spune că această strategie nu oprește apăsarea care vine.",
        source: n,
      },
      {
        from: 11, to: 14,
        heading: "Altarele se înmulțesc, iar Legea ajunge străină",
        teaching: "Ultimele versete arată contradicția unei religiozități abundente: Efraim ridică multe altare, dar acestea devin locuri ale păcatului, iar poruncile Legii sunt privite ca ceva străin. Jertfele continuă, însă textul spune că nu sunt primite; concluzia este că Israel L-a uitat pe Cel ce l-a făcut.",
        source: n,
      },
    ],
  },
  9: {
    number: 9,
    title: "Sărbătoarea se transformă în exil, iar vechile răzvrătiri reapar",
    summary: "Osea descrie pierderea bucuriei, a țării și a rodului ca rezultat al infidelității. Memoria lui Baal-Peor și Ghibea arată că degradarea prezentă continuă un tipar vechi de răzvrătire.",
    units: [
      {
        from: 1, to: 6,
        heading: "Praznice fără țară și pâine care nu mai intră în Casa DOMNULUI",
        teaching: "Capitolul începe oprind bucuria festivă a lui Israel pentru că infidelitatea a ajuns să marcheze chiar locurile belșugului. Textul descrie pierderea recoltei, plecarea din țară și imposibilitatea unei vieți cultice normale în exil. Întrebarea «ce veți face în zilele de praznic?» subliniază pierderea a ceea ce fusese tratat ca sigur.",
        source: n,
      },
      {
        from: 7, to: 9,
        heading: "Ziua răsplătirii și ostilitatea față de proroc",
        teaching: "Venirea pedepsei este pusă lângă disprețul față de proroc și întinderea de lațuri pe căile lui. Textul compară stricăciunea cu zilele Ghibei și spune că nelegiuirea nu este uitată. Mesagerul incomod este atacat tocmai în timp ce avertismentul lui se apropie de împlinire.",
        source: n,
      },
      {
        from: 10, to: 17,
        heading: "De la primii struguri la Baal-Peor și pierderea rodului",
        teaching: "Dumnezeu își amintește începutul lui Israel ca pe găsirea unor struguri în pustiu, apoi amintește ruptura de la Baal-Peor. Secțiunea urmărește consecința prin imaginea rodului care dispare și prin împrăștierea printre neamuri. Finalul leagă această stare de faptul că poporul nu a ascultat.",
        source: n,
      },
    ],
  },
  10: {
    number: 10,
    title: "Rodul folosit pentru altare și chemarea de a desțeleni un ogor nou",
    summary: "Prosperitatea lui Israel a hrănit idolatria, iar inima împărțită este găsită vinovată. În mijlocul verdictului apare o chemare clară de a semăna dreptate și de a-L căuta pe DOMNUL.",
    units: [
      {
        from: 1, to: 8,
        heading: "Cu cât mai mult rod, cu atât mai multe altare",
        teaching: "Israel este comparat cu o vie roditoare, dar rodul nu duce la fidelitate: pe măsură ce prosperitatea crește, cresc și altarele și stâlpii idolești. Textul numește inima împărțită și arată prăbușirea lucrurilor în care poporul se sprijinea — altar, idol și chiar împărat. Înălțimile ajung acoperite de spini și mărăcini.",
        source: n,
      },
      {
        from: 9, to: 11,
        heading: "Ghibea este amintită, iar Efraim ajunge sub jug",
        teaching: "Osea revine la zilele Ghibei ca reper al unui păcat vechi care nu a fost cu adevărat părăsit. Imaginea se schimbă apoi spre munca agricolă: Efraim, obișnuit cu treieratul, este pus sub jug, iar Iuda și Iacov apar în aceeași imagine a aratului și grăpatului.",
        source: n,
      },
      {
        from: 12, to: 15,
        heading: "Semănați dreptate, nu mai mâncați rodul minciunii",
        teaching: "Versetul 12 formulează chemarea pozitivă a capitolului: semănarea potrivită cu dreptatea, secerarea îndurării, desțelenirea unui ogor nou și căutarea DOMNULUI. Textul o contrastează imediat cu ceea ce Israel făcuse deja: arase răul, secerase nelegiuirea și se încrezuse în puterea militară. Ultimele versete anunță că această încredere nu va proteja cetățile sau împăratul.",
        source: n,
      },
    ],
  },
  11: {
    number: 11,
    title: "Iubirea lui Dumnezeu pentru fiul care s-a depărtat",
    summary: "Dumnezeu își amintește chemarea lui Israel din Egipt și vorbește cu o tandrețe care stă lângă judecata meritată.",
    units: [{
      from: 1, to: 12,
      heading: "The Love of God for Israel",
      teaching: "Ultima temă oficială Poonen pentru Osea este «iubirea lui Dumnezeu pentru Israel». Capitolul 11 este una dintre expresiile cele mai puternice ale acestei teme: poporul se depărtează, dar Dumnezeu vorbește despre compasiunea Lui și despre refuzul de a acționa ca un om dominat de mânie. Dragostea nu neagă sfințenia și consecințele; explică de ce judecata nu este ultimul cuvânt al cărții.",
      source: p("The Love of God for Israel"),
    }],
  },
  12: {
    number: 12,
    title: "Iacov, balanțele false și chemarea de a păstra bunătatea și dreptatea",
    summary: "Capitolul pune istoria lui Iacov lângă prezentul lui Efraim. Chemarea la întoarcere contrastează cu negoțul înșelător, alianțele și autosuficiența unei prosperități declarate nevinovate.",
    units: [
      {
        from: 1, to: 6,
        heading: "Iacov este amintit pentru a chema Israelul la întoarcere",
        teaching: "Efraim este descris alergând după vânt și negociind cu Asiria și Egiptul. Apoi textul se întoarce la istoria lui Iacov: nașterea, lupta și întâlnirea de la Betel sunt aduse în memorie înainte de porunca explicită adresată urmașilor lui: întoarce-te la Dumnezeul tău, păstrează bunătatea și dreptatea și așteaptă-L pe Dumnezeu.",
        source: n,
      },
      {
        from: 7, to: 14,
        heading: "Cumpăna mincinoasă și memoria profeților",
        teaching: "Efraim apare ca negustor cu balanțe false, în timp ce se laudă că bogăția lui nu dovedește nicio vină. Dumnezeu răspunde reamintind identitatea Lui de la ieșirea din Egipt, lucrarea prin proroci și istoria lui Iacov care a slujit pentru o femeie. Finalul spune că mânia provocată de Efraim nu rămâne fără răspuns.",
        source: n,
      },
    ],
  },
  13: {
    number: 13,
    title: "Idolatria face puterea să dispară, iar Israel uită de singurul său Mântuitor",
    summary: "Efraim trece de la influență la dispariție prin idolatrie. Dumnezeu amintește că El singur este Mântuitorul cunoscut din Egipt, în timp ce prosperitatea, monarhia și răzvrătirea nu pot opri judecata.",
    units: [
      {
        from: 1, to: 8,
        heading: "De la greutate în Israel la rouă care dispare",
        teaching: "Capitolul spune că Efraim avusese cândva greutate, dar păcatul legat de Baal este urmat de o degradare continuă. Idolii sunt lucrări ale meșterilor, iar cei care se alipesc de ei sunt comparați cu norul dimineții, roua, pleava și fumul — lucruri care dispar repede. În contrast, Dumnezeu Se identifică drept Dumnezeul cunoscut din Egipt și singurul Mântuitor, apoi amintește că poporul L-a uitat după ce s-a săturat.",
        source: n,
      },
      {
        from: 9, to: 14,
        heading: "Împăratul nu poate salva, iar moartea este chemată în fața lui Dumnezeu",
        teaching: "Textul numește împotrivirea față de Dumnezeu drept cauza pieirii și întreabă unde este împăratul care ar putea salva cetățile. Monarhia, cerută cândva de popor, apare aici sub judecată. Nelegiuirea lui Efraim este păstrată, imaginea durerilor nașterii descrie criza, iar versetul 14 aduce limbajul răscumpărării din puterea Locuinței morților și al izbăvirii de la moarte.",
        source: n,
      },
      {
        from: 15, to: 16,
        heading: "Vântul de răsărit și căderea Samariei",
        teaching: "Finalul revine la verdict. Chiar dacă Efraim este descris ca roditor, vântul de răsărit usucă izvoarele și golește vistieria. Ultimul verset numește răzvrătirea Samariei și descrie violența cuceririi care vine; textul o prezintă ca judecată istorică, nu ca model de comportament pentru cititor.",
        source: n,
      },
    ],
  },
  14: {
    number: 14,
    title: "Întoarce-te la DOMNUL; vindecarea apostaziei și iubirea oferită de bunăvoie",
    summary: "Cartea se încheie cu o chemare explicită la întoarcere și cu promisiunea lui Dumnezeu de vindecare și rodire.",
    units: [{
      from: 1, to: 9,
      heading: "Judecata nu anulează invitația finală",
      teaching: "Osea nu se termină cu adulterul sau cu pedeapsa, ci cu «întoarce-te». Dumnezeu promite să vindece abaterea și să iubească de bunăvoie. Aceasta închide exact arcul tematic Poonen: pregătirea profetului, adulterul spiritual, judecata și iubirea neschimbătoare a lui Dumnezeu.",
      source: p("The Love of God for Israel"),
      forYourHeart: "Când Dumnezeu numește păcatul, scopul chemării nu este să te țină în rușine, ci să te întorci la El.",
    }],
  },
}

const OSEA_OVERLAY: ExplainedBookOverlay = {
  bookId: "osea",
  bibleEmanusBookId: "HOS",
  name: "Osea",
  testament: "vt",
  order: 28,
  transcript: sourceUrl,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("Osea", 14, focused),
}

export const OSEA_EXPLAINED = assertCompleteOverlay(OSEA_OVERLAY, 14)
