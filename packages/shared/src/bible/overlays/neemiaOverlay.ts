import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/nehemiah-esther.txt"
const p = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })
const n = { kind: "biblia-emanus" as const, note: "rezumat narativ fără doctrină adăugată" as const }

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "Neemia întreabă de Ierusalim, plânge, postește și se roagă",
    summary: "Neemia trăiește într-o poziție de încredere la curtea persană, dar poartă în inimă starea Ierusalimului. Când află că zidurile sunt dărâmate, răspunsul lui este jale, post și rugăciune.",
    units: [{
      from: 1, to: 11,
      heading: "Lucrarea începe cu o povară, nu cu o funcție",
      teaching: "Poonen insistă asupra preocupării lui Neemia. Hanani nu îi impune subiectul; Neemia întreabă cum este Ierusalimul. Când află starea cetății, plânge pentru ceva ce nu privește confortul lui personal, ci onoarea Numelui lui Dumnezeu. Transcriptul contrastează postul pentru propriile nevoi cu postul născut din dorința ca Dumnezeu să fie onorat în poporul Său. Neemia nu era un «lucrător cu normă întreagă», ci un om credincios într-o slujbă seculară.",
      source: p("Nehemiah ... has a concern ... sat down and wept ... fasted and prayed"),
      forYourHeart: "Înainte să întrebi ce rol ai putea primi, întreabă ce stare a poporului lui Dumnezeu te face să te rogi chiar dacă nu îți aduce niciun avantaj personal.",
    }],
  },
  2: {
    number: 2,
    title: "Neemia simte frica, se roagă scurt și face pasul",
    summary: "Împăratul observă tristețea lui Neemia. El se teme, dar vorbește, cere permisiunea de a merge la Ierusalim, apoi inspectează zidurile fără să-și publice imediat planul.",
    units: [
      {
        from: 1, to: 10,
        heading: "Frica simțită nu trebuie să devină frica după care acționezi",
        teaching: "Poonen apreciază onestitatea lui Neemia: textul spune că s-a temut foarte mult. El nu pretinde că omul credincios nu mai simte frica; diferența este că Neemia nu lasă frica să decidă. Face o rugăciune scurtă și răspunde împăratului. Transcriptul distinge prudența de acțiunea condusă de necredință.",
        source: p("he was afraid ... we will feel fear ... must never act on fear"),
        forYourHeart: "Curajul nu înseamnă absența senzației de frică. Înseamnă să nu-i dai fricii ultimul cuvânt asupra ascultării.",
      },
      {
        from: 11, to: 20,
        heading: "Inspectează înainte să anunțe și adună oameni care au aceeași povară",
        teaching: "Ajuns la Ierusalim, Neemia nu face reclamă imediată proiectului. Inspectează zidurile noaptea cu puțini oameni și spune că nu le dezvăluise încă ce pusese Dumnezeu în inima lui. Poonen vede aici discreție și discernământ: nu orice plan trebuie anunțat înainte să fie înțeles și nu orice mulțime este potrivită pentru începutul unei lucrări. Când Sanbalat și Tobia îl batjocoresc, Neemia nu abandonează mandatul primit.",
        source: p("I did not tell anyone what God was putting into my mind ... gathered a few who had a burden"),
      },
    ],
  },
  3: {
    number: 3,
    title: "Zidul este împărțit în porțiuni: «lângă el», fără goluri",
    summary: "Neemia organizează refacerea zidului pe familii și grupuri, astfel încât fiecare să lucreze la o porțiune concretă.",
    units: [{
      from: 1, to: 32,
      heading: "Liderii și oamenii lucrează cu mâinile lor",
      teaching: "Poonen citește capitolul 3 ca dovadă a capacității lui Neemia de a organiza și motiva fără să se ridice deasupra lucrătorilor. Marele preot lucrează, familiile lucrează, apar și fiicele lui Șalum. Transcriptul observă repetarea «lângă el / lângă ei»: lucrarea este distribuită astfel încât zidul să nu rămână cu goluri. Conducerea nu este doar supraveghere de pe scaun, ci participare și coordonare.",
      source: p("chapter 3 ... everybody's got their job ... next to him ... without a gap"),
      forYourHeart: "O comunitate nu se zidește numai prin câțiva oameni vizibili. Întrebarea sănătoasă este: care este porțiunea mea și cu cine lucrez umăr la umăr?",
    }],
  },
  4: {
    number: 4,
    title: "Batjocura și amenințarea cresc, dar zidul continuă",
    summary: "Sanbalat și aliații lui ridiculizează lucrarea și apoi pregătesc atacul. Oamenii se roagă, pun strajă și continuă să zidească pregătiți pentru apărare.",
    units: [{
      from: 1, to: 23,
      heading: "Rugăciune, vigilență și muncă în același timp",
      teaching: "Poonen prezintă opoziția ca parte repetată a restaurării Ierusalimului: batjocură, descurajare, amenințare și încercarea de a opri. Neemia nu răspunde prin abandon și nici prin spiritualitate pasivă; poporul se roagă și pune strajă. Lucrarea continuă în timp ce pericolul este luat în serios. Opoziția nu dovedește singură că o lucrare este de la Dumnezeu, dar nici nu este motiv suficient pentru a o abandona când mandatul este clar.",
      source: p("opposition ... devil ... hinder me and harass me"),
      forYourHeart: "Nu pune rugăciunea împotriva responsabilității practice. Uneori credința înseamnă să te rogi și să pui strajă.",
    }],
  },
  5: {
    number: 5,
    title: "Neemia confruntă exploatarea din interior și refuză avantajele funcției",
    summary: "Criza nu mai vine numai din exterior: iudeii mai săraci sunt apăsați de propriii frați. Neemia cere restituire și renunță la drepturile economice pe care funcția de guvernator i le permitea.",
    units: [
      {
        from: 1, to: 13,
        heading: "Nu poți zidi zidul lui Dumnezeu în timp ce îți exploatezi fratele",
        teaching: "Textul arată că o lucrare publică de restaurare poate ascunde nedreptate economică în interior. Neemia îi confruntă pe dregători și cere restituirea. Transcriptul nu permite ca lupta împotriva adversarilor externi să devină scuză pentru a ignora felul în care oamenii vulnerabili sunt tratați în comunitate.",
        source: n,
      },
      {
        from: 14, to: 19,
        heading: "Neemia nu cere hrana guvernatorului",
        teaching: "Poonen se oprește explicit la exemplul financiar al lui Neemia. Deși muncește intens și are dreptul la o alocație de guvernator, nu o cere, pentru că povara asupra poporului era deja mare. Transcriptul îl descrie ca om ospitalier care slujește pe cheltuiala lui. Aceasta este mărturia unei alegeri personale într-un context concret, nu o regulă că slujitorii creștini nu pot primi niciodată susținere materială; Noul Testament recunoaște și dreptul lucrătorului la sprijin.",
        source: p("chapter 5 ... I did not demand the governor's food allowance"),
        forYourHeart: "Dreptul tău poate fi real și totuși dragostea să te cheme uneori să renunți la el pentru binele celor apăsați.",
      },
    ],
  },
  6: {
    number: 6,
    title: "«Fac o lucrare mare și nu pot coborî»",
    summary: "Adversarii încearcă să-l scoată pe Neemia din lucrare prin întâlniri, zvonuri și intimidare religioasă. Zidul este terminat în cincizeci și două de zile.",
    units: [
      {
        from: 1, to: 14,
        heading: "Nu fiecare invitație la discuție merită timpul lucrării",
        teaching: "Poonen citează răspunsul lui Neemia: «fac o lucrare mare și nu pot coborî». Sanbalat îl cheamă repetat, apoi folosește zvonul și presiunea. Neemia discerne că unele discuții nu caută adevărul, ci distragerea sau frica. Aceasta nu justifică refuzul oricărei critici; Neemia răspunde acuzației și cercetează amenințarea, dar nu abandonează însărcinarea pentru negocieri fără rost.",
        source: p("I'm doing a great work and I cannot come down for all these useless discussions"),
        forYourHeart: "Discernământul include și alegerea conversațiilor în care nu intri. Nu orice provocare are dreptul la orele tale.",
      },
      {
        from: 15, to: 19,
        heading: "Zidul este încheiat în cincizeci și două de zile",
        teaching: "Poonen contrastează durata scurtă a lucrării lui Neemia cu anii în care zidul rămăsese neterminat. Povara, organizarea, cooperarea și perseverența schimbă situația. Textul spune chiar că adversarii recunosc că lucrarea fusese făcută cu ajutorul lui Dumnezeu.",
        source: p("wall was completed in 52 days"),
      },
    ],
  },
  7: {
    number: 7,
    title: "După zid, Neemia organizează porțile și verifică cine aparține comunității întoarse",
    summary: "Zidul este terminat, dar cetatea este încă slab populată. Neemia pune păzitori și conducători, apoi găsește registrul primei întoarceri din exil și îl folosește pentru a așeza comunitatea în continuitatea ei istorică.",
    units: [
      { from: 1, to: 4, heading: "Porțile, straja și o cetate încă aproape goală", teaching: "După terminarea zidului, Neemia îi pune pe Hanani și Hanania peste Ierusalim, iar porțile nu trebuie deschise fără măsuri de pază. Textul adaugă problema următoare: cetatea era largă, dar oamenii erau puțini și casele încă nu erau reconstruite suficient.", source: n },
      { from: 5, to: 65, heading: "Registrul primei întoarceri păstrează familiile și verifică slujirea preoțească", teaching: "Neemia spune că Dumnezeu îi pune în inimă să adune conducătorii și poporul după genealogii și găsește registrul celor care se întorseseră mai întâi cu Zorobabel. Lista păstrează familiile, cetățile, preoții, leviții și slujitorii templului. Unele familii preoțești nu își pot dovedi genealogia și sunt oprite de la lucrurile preasfinte până la o clarificare autorizată.", source: n },
      { from: 66, to: 72, heading: "Numărul comunității și darurile pentru lucrare", teaching: "După liste, textul oferă totalul adunării, al slujitorilor și al animalelor și consemnează darurile oferite pentru lucrare de dregător, capii familiilor și restul poporului. Registrul nu este doar statistică, ci include și contribuția comunității restaurate.", source: n },
      { from: 73, to: 73, heading: "Fiecare grup se așază în cetățile sale", teaching: "Capitolul se încheie spunând că preoții, leviții, păzitorii, cântăreții, slujitorii templului și restul lui Israel se așază în cetățile lor. Această propoziție pregătește adunarea din luna a șaptea și citirea Legii din capitolul următor.", source: n },
    ],
  },
  8: {
    number: 8,
    title: "Ezra citește Cartea, iar poporul înțelege",
    summary: "După zidire, atenția comunității se mută spre Cuvânt. Ezra citește Legea, leviții o explică, iar oamenii răspund prin închinare, înțelegere și sărbătoare.",
    units: [{
      from: 1, to: 18,
      heading: "Zidurile nu sunt finalul: comunitatea trebuie formată de Cuvânt",
      teaching: "Poonen face trecerea rapidă la Ezra din capitolul 8. După organizarea cetății, restaurarea nu este completă fără Cuvântul lui Dumnezeu. Textul subliniază nu numai citirea, ci și explicarea astfel încât poporul să înțeleagă. «Bucuria DOMNULUI este tăria voastră» apare într-un context de auzire a Legii și de chemare de la plâns la o zi sfântă de bucurie.",
      source: p("we read about Ezra in chapter 8"),
    }],
  },
  9: {
    number: 9,
    title: "Poporul își mărturisește păcatul în lumina istoriei harului lui Dumnezeu",
    summary: "Legea este citită, poporul postește și își mărturisește păcatele. Rugăciunea lungă trece prin istoria lui Israel și contrastează fidelitatea lui Dumnezeu cu repetatele răzvrătiri ale poporului.",
    units: [{
      from: 1, to: 38,
      heading: "Mărturisirea nu ascunde istoria și nu uită mila",
      teaching: "Transcriptul menționează în mod direct mărturisirea din capitolul 9. Rugăciunea nu rescrie trecutul pentru a proteja reputația poporului: numește răzvrătirea și încăpățânarea, dar repetă și mila, răbdarea și purtarea de grijă a lui Dumnezeu. Pocăința sănătoasă vede ambele lucruri.",
      source: p("Nehemiah and the people confessing their sin in chapter 9"),
      forYourHeart: "Mărturisirea nu înseamnă să spui că totul a fost rău și nici să minimalizezi răul. Spune adevărul despre păcat în lumina adevărului despre mila lui Dumnezeu.",
    }],
  },
  10: {
    number: 10,
    title: "Legământul mărturisit în capitolul 9 primește nume, semnături și obligații concrete",
    summary: "Conducătorii, leviții și preoții pecetluiesc legământul, iar restul poporului se alătură jurământului. Angajamentele privesc fidelitatea față de Lege, ritmul sabatic și susținerea regulată a Casei lui Dumnezeu.",
    units: [
      { from: 1, to: 27, heading: "Numele celor care pecetluiesc legământul", teaching: "Capitolul începe cu Neemia și continuă prin preoți, leviți și conducători care își pun numele pe legământ. După rugăciunea colectivă din capitolul 9, comunitatea nu rămâne la o mărturisire anonimă: textul păstrează persoanele care asumă public hotărârea.", source: n },
      { from: 28, to: 31, heading: "Poporul se alătură jurământului și numește domenii concrete de ascultare", teaching: "Restul poporului — inclusiv familiile și cei care se separaseră de practicile popoarelor din jur pentru Legea lui Dumnezeu — se alătură jurământului. Sunt numite concret ascultarea de porunci, căsătoriile în cadrul identității legământului și refuzul comerțului în Sabat și în zilele sfinte. Contextul post-exilic al căsătoriilor nu devine o regulă rasială sau o comandă creștină generală de divorț.", source: n },
      { from: 32, to: 39, heading: "Casa lui Dumnezeu primește o susținere regulată, nu numai entuziasm ocazional", teaching: "Ultima parte stabilește contribuții pentru slujirea templului, lemnul altarului, primele roade, întâii născuți și zeciuieli. Preoții și leviții primesc responsabilități de colectare și păstrare, iar concluzia rezumă intenția comunității: să nu părăsească Casa Dumnezeului lor.", source: n },
    ],
  },
  11: {
    number: 11,
    title: "Ierusalimul este repopulat prin conducători, sorți și oameni care se oferă de bunăvoie",
    summary: "După refacerea zidului și reînnoirea legământului, cetatea are nevoie de locuitori. O parte din popor este așezată în Ierusalim, iar capitolul enumeră familiile din cetate și apoi satele în care rămân celelalte comunități.",
    units: [
      { from: 1, to: 2, heading: "Unul din zece este așezat în Ierusalim, iar voluntarii sunt binecuvântați", teaching: "Conducătorii locuiesc în Ierusalim, iar pentru restul poporului sunt trași sorți astfel încât unul din zece să locuiască în cetatea sfântă. Textul notează separat pe cei care se oferă de bunăvoie și spune că poporul îi binecuvântează.", source: n },
      { from: 3, to: 24, heading: "Familiile, preoții, leviții și slujitorii care locuiesc în cetate", teaching: "O listă amplă păstrează locuitori din Iuda și Beniamin, preoți, leviți, păzitori și slujitori ai templului. Sunt menționate și responsabilități concrete, inclusiv conducerea slujirii din Casă, rugăciunea și cântarea, astfel încât repopularea cetății este și o reorganizare a vieții comunitare.", source: n },
      { from: 25, to: 36, heading: "Restul lui Iuda și Beniamin locuiește în cetăți și sate", teaching: "Finalul mută privirea în afara Ierusalimului și enumeră așezările lui Iuda și Beniamin. Comunitatea restaurată nu se reduce la capitală; cronicarul păstrează și distribuția familiilor în teritoriul din jur.", source: n },
    ],
  },
  12: {
    number: 12,
    title: "Preoții și leviții sunt numiți, iar zidul este dedicat cu două coruri și mare bucurie",
    summary: "Capitolul leagă memoria generațiilor de preoți și leviți de momentul public al dedicării zidului. Două procesiuni merg pe zid, se întâlnesc la Casa lui Dumnezeu, iar apoi sunt organizate contribuțiile pentru slujirea continuă.",
    units: [
      { from: 1, to: 26, heading: "Familiile preoțești și levitice păstrează continuitatea slujirii", teaching: "Prima jumătate a capitolului enumeră preoții și leviții din generația întoarcerii cu Zorobabel și din generațiile următoare. Listele includ capi de familie și oameni responsabili de laudă și pază, legând dedicarea zidului de continuitatea comunității care slujește.", source: n },
      { from: 27, to: 30, heading: "Pentru dedicare sunt adunați leviții și cântăreții, iar comunitatea se curăță", teaching: "La dedicarea zidului, leviții sunt căutați în locurile lor și aduși la Ierusalim pentru o sărbătoare cu mulțumiri, cântări și instrumente. Preoții și leviții se curăță și curățesc poporul, porțile și zidul înaintea procesiunii.", source: n },
      { from: 31, to: 43, heading: "Două coruri merg pe zid și bucuria Ierusalimului se aude de departe", teaching: "Neemia urcă pe zid conducătorii și organizează două mari coruri de mulțumire care merg în direcții opuse pe zid împreună cu conducători, preoți și instrumentiști. Ele ajung la Casa lui Dumnezeu, sunt aduse jertfe, iar textul spune că Dumnezeu le dăduse o mare bucurie și că veselia Ierusalimului se auzea de departe.", source: n },
      { from: 44, to: 47, heading: "După sărbătoare, slujirea este susținută prin contribuții și părți rânduite", teaching: "În aceeași zi sunt puși oameni peste încăperile pentru daruri, prime roade și zeciuieli. Poporul se bucură de preoți și leviți și le dă părțile rânduite, iar cântăreții și păzitorii își păstrează slujbele după rânduielile stabilite.", source: n },
    ],
  },
  13: {
    number: 13,
    title: "Neemia se întoarce și găsește din nou dezordine în templu și cetate",
    summary: "După o perioadă de absență, Neemia descoperă compromisuri privind încăperile templului, zeciuielile, Sabatul și căsătoriile cu popoarele din jur. El intervine ferm pentru a restabili rânduiala legământului.",
    units: [
      {
        from: 1, to: 14,
        heading: "Camera templului nu poate deveni spațiu privat pentru relațiile celui puternic",
        teaching: "Poonen compară fermitatea lui Neemia cu curățirea templului făcută mai târziu de Iisus. Neemia găsește o încăpere importantă pusă la dispoziția lui Tobia și o golește. Ideea transcriptului este că relațiile și influența nu trebuie să ocupe spațiul rezervat slujirii lui Dumnezeu. Acțiunea fizică din cadrul guvernării lui Neemia nu devine permisiune pentru violență sau evacuări arbitrare în biserică.",
        source: p("chapter 13 ... inside the temple ... put their unconverted relatives there ... chased them all out"),
      },
      {
        from: 15, to: 31,
        heading: "Reforma trebuie păzită după entuziasmul inițial",
        teaching: "Capitolul arată cât de repede pot reveni vechile practici: comerțul în Sabat, neglijarea slujitorilor și alianțele de familie contrare legământului. Neemia organizează din nou. Ca și în Ezra, căsătoriile sunt tratate în cadrul identității religioase post-exilice și nu oferă o bază pentru rasism sau o comandă creștină generală de divorț.",
        source: p("Nehemiah sets a lot of things in order"),
        forYourHeart: "O reformă nu se păstrează singură. După schimbarea mare vin obiceiurile mici prin care adevărul trebuie protejat zi de zi.",
      },
    ],
  },
}

const NEEMIA_OVERLAY: ExplainedBookOverlay = {
  bookId: "neemia",
  bibleEmanusBookId: "NEH",
  name: "Neemia",
  testament: "vt",
  order: 16,
  transcript,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("Neemia", 13, focused),
}

export const NEEMIA_EXPLAINED = assertCompleteOverlay(NEEMIA_OVERLAY, 13)
