import type { ExplainedOverlayChapter } from "../explainedOverlay.js"

const n = {
  kind: "biblia-emanus" as const,
  note: "rezumat narativ fără doctrină adăugată" as const,
}

export const PROVERBE_TEXTUAL_CHAPTERS: Readonly<Record<number, ExplainedOverlayChapter>> = {
  11: {
    number: 11,
    title: "Integritate, generozitate și viață comunitară",
    summary: "Cântarul fals, mândria și câștigul nedrept sunt puse în contrast cu integritatea și dreptatea. Generozitatea este descrisă ca aducând bine atât celui care dă, cât și comunității, în timp ce încrederea în bogăție nu poate salva.",
    units: [
      { from: 1, to: 15, heading: "Integritatea cântarului, smerenia și siguranța care nu vine din bogăție", teaching: "Capitolul începe cu cântarul fals și continuă prin contraste între mândrie și smerenie, integritatea celui drept și stricăciunea celui necredincios. Bogăția nu poate salva în ziua judecății, iar comunitatea suferă când oamenii răi conduc sau când un om intră nechibzuit în garanții pentru altul.", source: n },
      { from: 16, to: 31, heading: "Generozitatea, binele făcut altuia și rodul caracterului", teaching: "A doua parte pune bunătatea, dreptatea și generozitatea lângă cruzime, lăcomie și încredere în averi. Cel care udă pe alții este el însuși înviorat, iar cel care caută binele găsește bunăvoință; finalul afirmă că atât dreptatea, cât și răul produc roade care se întorc asupra omului.", source: n },
    ],
  },
  12: {
    number: 12,
    title: "Cuvintele și munca dezvăluie caracterul",
    summary: "Proverbele vorbesc despre iubirea disciplinei, hărnicie, grijă față de animale și stabilitatea celui drept. Cuvintele pot fi sabie sau vindecare, iar minciuna și lenevia nu au aceeași durată ca adevărul și munca serioasă.",
    units: [
      { from: 1, to: 14, heading: "Disciplina, munca și cuvintele care produc rod", teaching: "Iubirea mustrării este pusă lângă dorința de a învăța, iar omul drept este descris prin stabilitate, muncă și grijă chiar față de animale. Vorbirea reapare ca test al caracterului: cuvintele răului întind curse, în timp ce gura celui drept îl poate scoate din necaz și omul culege rodul propriilor cuvinte și fapte.", source: n },
      { from: 15, to: 28, heading: "Ascultarea sfatului, adevărul și limba care vindecă", teaching: "Nebunul își consideră imediat calea corectă, în timp ce omul înțelept ascultă sfatul și nu transformă orice ofensă într-o reacție publică. Vorbirea pripită este comparată cu loviturile sabiei, dar limba înțeleptului vindecă; adevărul rămâne, minciuna are viață scurtă, iar hărnicia și dreptatea sunt asociate cu viața.", source: n },
    ],
  },
  13: {
    number: 13,
    title: "Disciplina, dorințele și anturajul",
    summary: "Capitolul leagă ascultarea de corectare de înțelepciune și arată că speranța amânată poate îmbolnăvi inima. Cel care umblă cu înțelepții devine înțelept, iar disciplina responsabilă este legată de iubire.",
    units: [
      { from: 1, to: 12, heading: "Ascultarea, paza gurii și dorința amânată", teaching: "Fiul înțelept primește disciplina, iar omul care își păzește gura își păzește viața. Leneșul dorește fără rod, în timp ce harnicul are parte de belșug; bogăția rapidă se micșorează, iar speranța amânată este descrisă ca durere a inimii, în contrast cu dorința împlinită.", source: n },
      { from: 13, to: 25, heading: "Cuvântul, compania și disciplina care formează", teaching: "Disprețuirea cuvântului aduce consecințe, în timp ce învățătura înțeleptului este izvor de viață. Capitolul insistă că anturajul formează: cel care umblă cu înțelepții devine înțelept, iar însoțitorul nebunilor suferă. Finalul leagă moștenirea, disciplina și hrana de responsabilitatea față de generația următoare.", source: n },
    ],
  },
  14: {
    number: 14,
    title: "Calea care pare dreaptă",
    summary: "Înțelepciunea construiește casa, iar nebunia o dărâmă, în timp ce frica de DOMNUL aduce siguranță. Capitolul vorbește despre mânie, compasiune față de sărac, martor adevărat și drumul care pare drept omului dar poate sfârși în moarte.",
    units: [
      { from: 1, to: 18, heading: "Casa construită prin înțelepciune și drumul care trebuie verificat", teaching: "Înțelepciunea este descrisă ca zidind casa, iar nebunia ca dărâmând-o cu propriile mâini. Capitolul trece prin vorbire, muncă, martori și prudență și ajunge la avertismentul că există o cale care pare dreaptă omului, dar al cărei sfârșit este moartea; aparența personală nu este un criteriu suficient pentru adevăr.", source: n },
      { from: 19, to: 35, heading: "Compasiunea, răbdarea și frica de DOMNUL", teaching: "A doua parte contrastează disprețul față de sărac cu bunătatea față de cel lipsit, munca reală cu vorbirea goală și mânia grabnică cu răbdarea. Frica de DOMNUL este numită încredere puternică și izvor de viață, iar felul în care cineva tratează pe cel sărac este legat direct de atitudinea lui față de Creator.", source: n },
    ],
  },
  15: {
    number: 15,
    title: "Răspunsul blând și ochii DOMNULUI",
    summary: "Un răspuns blând poate opri mânia, în timp ce vorbirea aspră o aprinde. Dumnezeu vede pretutindeni, primește rugăciunea celor drepți și prețuiește mai mult o masă simplă cu dragoste decât belșugul cu ură.",
    units: [
      { from: 1, to: 17, heading: "Limba, corectarea și o masă simplă cu dragoste", teaching: "Capitolul începe cu puterea răspunsului blând de a potoli mânia și cu contrastul dintre limba înțeleaptă și vorbirea nebunească. Ochii DOMNULUI văd pretutindeni, iar primirea corectării este asociată cu viața. Pacea relațiilor este pusă mai presus de belșug: mai bine puține legume cu dragoste decât un ospăț bogat însoțit de ură.", source: n },
      { from: 18, to: 33, heading: "Răbdarea, sfatul și smerenia înaintea onoarei", teaching: "Omul mânios provoacă certuri, în timp ce cel răbdător le poate liniști. Planurile au nevoie de sfat, cuvântul potrivit la vreme aduce bucurie, iar DOMNUL este aproape de rugăciunea celui drept. Ultimele proverbe leagă disciplina de înțelepciune și spun că smerenia vine înaintea onoarei.", source: n },
    ],
  },
  16: {
    number: 16,
    title: "Planurile omului și suveranitatea lui Dumnezeu",
    summary: "Omul își pregătește planurile, dar DOMNUL cântărește duhurile și îndrumă pașii. Mândria precede căderea, cuvintele bune au putere, iar stăpânirea de sine este pusă mai presus de cucerirea unei cetăți.",
    units: [
      { from: 1, to: 16, heading: "Planificarea omului sub cântărirea și conducerea DOMNULUI", teaching: "Omul își pregătește răspunsurile și planurile, dar DOMNUL cântărește motivele și hotărăște pașii. Capitolul nu condamnă planificarea, ci autonomia ei: lucrările trebuie încredințate lui Dumnezeu, iar mândria este descrisă ca premergând ruinării. Înțelepciunea și priceperea sunt apoi puse mai presus de aur și argint.", source: n },
      { from: 17, to: 33, heading: "Drumul drept, cuvintele bune și stăpânirea de sine", teaching: "A doua jumătate vorbește despre evitarea răului, păzirea sufletului și cuvintele plăcute care pot vindeca. Există din nou o cale care pare dreaptă și totuși duce spre moarte, iar omul violent și bârfitorul despart relații. Stăpânirea de sine este pusă mai presus de cucerirea unei cetăți, iar chiar sorțul este așezat sub stăpânirea DOMNULUI.", source: n },
    ],
  },
  17: {
    number: 17,
    title: "Pacea casei și folosirea cuvintelor",
    summary: "O bucată uscată cu pace este preferabilă unei case pline de carne și ceartă. Capitolul vorbește despre prietenie în necaz, pericolul disputei, mita, inima veselă și înțelepciunea de a-ți ține limba.",
    units: [
      { from: 1, to: 14, heading: "Pacea valorează mai mult decât belșugul unei case pline de ceartă", teaching: "Capitolul începe alegând o bucată uscată cu pace în locul unei case pline de ospețe și certuri. DOMNUL este prezentat ca Cel care încearcă inimile, iar acoperirea greșelilor este legată de căutarea dragostei, în timp ce repetarea lor desparte prietenii. Cearta este comparată cu o breșă într-un dig: este mai ușor de oprit înainte să izbucnească.", source: n },
      { from: 15, to: 28, heading: "Prietenul în necaz, inima veselă și tăcerea înțeleptului", teaching: "A numi răul bine și binele rău este condamnat, iar prietenul adevărat este descris ca iubind în orice vreme. Inima veselă este asociată cu binele trupului, pe când duhul zdrobit usucă puterea. Finalul revine la vorbire: chiar și omul nebun poate părea înțelept când tace și își ține buzele.", source: n },
    ],
  },
  18: {
    number: 18,
    title: "Izolare, vorbire și puterea limbii",
    summary: "Cel care se izolează pentru propriile dorințe respinge sfatul, iar nebunul preferă să-și spună părerea decât să înțeleagă. Viața și moartea sunt puse în puterea limbii, iar prietenia adevărată poate fi mai apropiată decât rudenia.",
    units: [
      { from: 1, to: 12, heading: "Izolarea egoistă și cuvintele care sapă sau protejează", teaching: "Capitolul avertizează asupra omului care se separă pentru a-și urma dorințele și nu mai primește înțelepciune comună. Nebunul este interesat mai mult să-și exprime opinia decât să înțeleagă, iar cuvintele pot deveni ape adânci, bârfă sau cursă. În contrast, Numele DOMNULUI este descris ca turn puternic, iar smerenia precede onoarea.", source: n },
      { from: 13, to: 24, heading: "Ascultarea înainte de răspuns și limba care poate aduce viață sau moarte", teaching: "A răspunde înainte să asculți este numit nebunie și rușine. Darurile pot deschide uși, iar primul care își prezintă cauza pare drept până vine celălalt și îl cercetează. Capitolul culminează cu puterea limbii asupra vieții și morții și cu imaginea prietenului care poate rămâne mai apropiat decât un frate.", source: n },
    ],
  },
  19: {
    number: 19,
    title: "Caracterul valorează mai mult decât averea",
    summary: "Integritatea săracului este preferată limbii stricate, iar graba fără cunoaștere duce la greșeală. Capitolul discută prietenia interesată, disciplina copiilor, mila față de sărac și planurile care trebuie așezate sub sfatul DOMNULUI.",
    units: [
      { from: 1, to: 15, heading: "Integritatea, graba și relațiile modelate de avere", teaching: "Este preferat săracul care umblă în integritate omului cu vorbire strâmbă, iar zelul fără cunoaștere și graba sunt prezentate ca pericole. Capitolul observă realist că bogăția atrage prieteni, iar sărăcia îi poate îndepărta, fără să declare această reacție bună. Mărturia mincinoasă, mânia și lenevia sunt apoi puse în contrast cu priceperea și caracterul.", source: n },
      { from: 16, to: 29, heading: "Porunca, mila, disciplina și planurile sub sfatul DOMNULUI", teaching: "Păzirea poruncii este legată de păzirea vieții, iar mila față de sărac este descrisă ca un împrumut făcut DOMNULUI. Disciplina copilului trebuie orientată spre formare, nu spre distrugere, iar omul mânios care nu învață va repeta consecințele. Multe planuri există în inima omului, dar sfatul DOMNULUI este cel care rămâne.", source: n },
    ],
  },
  20: {
    number: 20,
    title: "Cumpătare, onestitate și discernământ",
    summary: "Vinul poate batjocori, greutățile false sunt urâte de Dumnezeu, iar omul trebuie să fie atent la garanții și câștig dobândit prin înșelăciune. Planurile bune cer sfat, iar duhul omului este descris ca o lampă care cercetează interiorul.",
    units: [
      { from: 1, to: 15, heading: "Cumpătarea, hărnicia și măsurile drepte", teaching: "Vinul și băutura tare sunt descrise ca putând înșela și stârni conflictul, iar evitarea certurilor este asociată cu onoarea. Leneșul nu ară la vreme și apoi nu are ce culege, iar sfatul din inima omului trebuie scos la lumină cu discernământ. Greutățile și măsurile false sunt repetat numite urâte înaintea lui Dumnezeu.", source: n },
      { from: 16, to: 30, heading: "Sfatul, bârfa, răzbunarea și lumina care cercetează interiorul", teaching: "Capitolul avertizează asupra garanțiilor pripite, a pâinii câștigate prin înșelăciune și a omului care umblă cu bârfe. Planurile sunt întărite prin sfat, iar răzbunarea personală este înlocuită de așteptarea după DOMNUL. Duhul omului este comparat cu o lampă care cercetează interiorul, iar corectarea dureroasă este prezentată ca putând curăța răul.", source: n },
    ],
  },
  21: {
    number: 21,
    title: "Dreptatea este mai importantă decât ritualul",
    summary: "Inima regelui este în mâna DOMNULUI, iar omul își poate considera calea dreaptă deși Dumnezeu cântărește inima. A face dreptate și judecată este mai plăcut decât jertfa, iar hărnicia și generozitatea sunt contrapuse lăcomiei și lenei.",
    units: [
      { from: 1, to: 15, heading: "Inima regelui, motivele omului și dreptatea mai presus de jertfă", teaching: "Capitolul începe cu imaginea inimii regelui în mâna DOMNULUI și cu omul care își poate considera calea corectă, deși Dumnezeu cântărește inima. A face dreptate și judecată este declarat mai plăcut decât jertfa, iar planurile celui harnic sunt puse în contrast cu graba, minciuna și câștigul nedrept.", source: n },
      { from: 16, to: 31, heading: "Plăcerea, lăcomia și limitele înțelepciunii omenești înaintea DOMNULUI", teaching: "Cel care părăsește calea priceperii ajunge într-o comunitate a morții, iar iubirea plăcerii și a luxului poate consuma resursele vieții. Omul drept observă și învață, cel rău își întărește fața, iar finalul pune pregătirea omului la locul ei: calul poate fi pregătit pentru luptă, dar izbăvirea aparține DOMNULUI.", source: n },
    ],
  },
  23: {
    number: 23,
    title: "Pofte, bani și disciplina inimii",
    summary: "Fiul este avertizat să nu fie dominat de pofta mesei celor puternici și să nu-și epuizeze viața alergând după bogăție. Capitolul cere ascultare de părinți, adevăr, autocontrol sexual și evitarea beției care deformează percepția.",
    units: [
      { from: 1, to: 18, heading: "Poftele, bogăția care zboară și inima pusă pe adevăr", teaching: "Capitolul începe la masa unui conducător, unde pofta trebuie ținută sub control și aparența generozității trebuie evaluată cu discernământ. Bogăția este descrisă ca putându-și face aripi și dispărea, iar energia omului nu trebuie consumată în goana după ea. Înțelepciunea, disciplina și adevărul sunt apoi prezentate ca lucruri care merită cumpărate și păstrate.", source: n },
      { from: 19, to: 35, heading: "Autocontrolul, ascultarea și beția care deformează judecata", teaching: "Fiul este chemat să-și îndrepte inima și să nu se alăture celor dominați de mâncare și băutură. Ascultarea de părinți și bucuria lor sunt puse lângă evitarea seducției, iar finalul descrie efectele beției prin ochi tulburați, cuvinte stricate, pierderea percepției și dorința de a relua ciclul.", source: n },
    ],
  },
  24: {
    number: 24,
    title: "Nu invidia pe cei răi",
    summary: "Casa se construiește prin înțelepciune, iar puterea adevărată cere cunoaștere și sfat. Textul cere să nu te bucuri de căderea vrăjmașului, să salvezi pe cel dus la moarte și să nu răspunzi cu răzbunare; finalul arată ogorul leneșului.",
    units: [
      { from: 1, to: 18, heading: "Casa zidită prin înțelepciune și responsabilitatea de a nu abandona pe cel dus la moarte", teaching: "Fiul este avertizat să nu invidieze oamenii răi și să nu dorească societatea lor. Casa se zidește prin înțelepciune și se umple prin cunoaștere, iar victoria cere sfat. Capitolul cere intervenție pentru cei duși spre moarte și refuză scuza «n-am știut», apoi avertizează să nu te bucuri când cade vrăjmașul.", source: n },
      { from: 19, to: 34, heading: "Nu răspunde răului prin imitație; ogorul leneșului arată rezultatul neglijenței", teaching: "A doua parte repetă să nu te mânii din cauza celor răi și cere respect față de autoritatea legitimă, fără asociere cu răzvrătirea nechibzuită. Judecata imparțială și răspunsul adevărat sunt lăudate, iar răzbunarea personală este respinsă. Finalul privește ogorul leneșului, unde spinii și zidul prăbușit arată cum neglijența acumulată produce sărăcie.", source: n },
    ],
  },
  25: {
    number: 25,
    title: "Proverbele lui Solomon copiate de oamenii lui Ezechia",
    summary: "Colecția vorbește despre limite, cuvinte potrivite, relația cu conducătorii și autocontrol. Gloria lucrurilor ascunse este pusă lângă responsabilitatea de a cerceta, iar lipsa stăpânirii de sine este comparată cu o cetate fără ziduri.",
    units: [
      { from: 1, to: 14, heading: "Cercetarea, locul potrivit înaintea regelui și cuvântul spus la vreme", teaching: "Introducerea atribuie această colecție oamenilor lui Ezechia care au copiat proverbele lui Solomon. Dumnezeu este asociat cu taina, iar regii cu cercetarea, în timp ce curățarea răului din jurul conducerii întărește tronul. Omul este sfătuit să nu se înalțe singur înaintea regelui, iar cuvântul potrivit la vreme și mustrarea înțeleaptă sunt descrise ca lucruri prețioase.", source: n },
      { from: 15, to: 28, heading: "Răbdarea, măsura și stăpânirea de sine", teaching: "Răbdarea și limba blândă pot învinge rezistența, iar chiar lucrurile bune precum mierea trebuie primite cu măsură. Vizitele excesive, mărturia falsă și încrederea într-un om necredincios sunt avertismente relaționale. Finalul compară omul fără stăpânire de sine cu o cetate ale cărei ziduri au fost dărâmate.", source: n },
    ],
  },
  26: {
    number: 26,
    title: "Nebunia, lenevia și bârfa se întrețin singure",
    summary: "Capitolul descrie nepotrivirea onoarei pentru nebun, dificultatea de a răspunde nebuniei și autoînșelarea leneșului. A doua parte urmărește felul în care bârfa și vorbirea prefăcută alimentează certurile.",
    units: [
      { from: 1, to: 14, heading: "Nebunul, răspunsul potrivit și leneșul care se vede mai înțelept decât ceilalți", teaching: "Onoarea este la fel de nepotrivită pentru nebun precum zăpada vara, iar proverbele despre răspunsul dat nebunului cer discernământ: uneori nu trebuie să intri în logica lui, alteori trebuie să-i arăți nebunia ca să nu se creadă înțelept. Leneșul este descris inventând pericole și întorcându-se în pat ca ușa în balamale.", source: n },
      { from: 15, to: 28, heading: "Amestecul în certuri și cuvintele care întrețin focul", teaching: "Leneșul ajunge atât de pasiv încât îi este greu să-și ducă mâna la gură și totuși se consideră mai înțelept decât cei care pot răspunde. A te amesteca într-o ceartă străină este comparat cu apucarea unui câine de urechi, iar bârfa este combustibilul fără de care focul conflictului se stinge. Ura poate fi ascunsă prin vorbire dulce, dar înșelăciunea va ieși la lumină.", source: n },
    ],
  },
  27: {
    number: 27,
    title: "Ziua de mâine, mustrarea unui prieten și administrarea atentă",
    summary: "Capitolul avertizează împotriva laudei de sine și a presupunerii că ziua de mâine este garantată. Prietenia sinceră poate răni pentru bine, iar finalul cere cunoașterea stării turmelor și administrarea atentă a resurselor.",
    units: [
      { from: 1, to: 14, heading: "Nu te lăuda cu mâine și primește rănile credincioase ale unui prieten", teaching: "Ziua de mâine nu este sub controlul omului, iar lauda propriei persoane este înlocuită cu evaluarea venită din afară. Mânia și gelozia sunt prezentate ca puteri distructive, în timp ce mustrarea deschisă și rănile făcute cu credincioșie de un prieten pot fi mai bune decât o iubire ascunsă sau sărutările unui dușman.", source: n },
      { from: 15, to: 27, heading: "Fierul ascute fierul, caracterul este testat de laudă și resursele trebuie cunoscute", teaching: "Conflictul repetitiv al casei este comparat cu picurarea continuă, iar prietenia sănătoasă este ilustrată prin fierul care ascute fierul. După cum apa reflectă fața, inima omului îl reflectă pe om, iar lauda testează caracterul. Finalul devine foarte practic: averea nu durează pentru totdeauna, de aceea starea turmelor și a resurselor trebuie cunoscută și administrată.", source: n },
    ],
  },
  28: {
    number: 28,
    title: "Curajul celui drept și pericolul câștigului nedrept",
    summary: "Capitolul contrastează omul rău care fuge fără urmăritor cu cel drept care are curaj. Legea, mărturisirea păcatului, conducerea dreaptă, munca și generozitatea sunt legate de stabilitatea vieții.",
    units: [
      { from: 1, to: 14, heading: "Dreptatea, Legea și mărturisirea păcatului", teaching: "Cel rău fuge fără să fie urmărit, iar cel drept este comparat cu un leu curajos. Instabilitatea unei țări este legată de conducere, iar înțelegerea dreptății de căutarea DOMNULUI. Integritatea săracului este pusă peste bogăția câștigată strâmb, iar capitolul afirmă că ascunderea păcatului nu prosperă, în timp ce mărturisirea și părăsirea lui găsesc milă.", source: n },
      { from: 15, to: 28, heading: "Conducerea, munca, generozitatea și bogăția câștigată în grabă", teaching: "Conducătorul rău este descris ca prădător al celor lipsiți, iar câștigul nedrept și graba după bogăție sunt repetat avertizate. Omul care își lucrează pământul are hrană, cel care urmărește deșertăciuni ajunge în lipsă, iar generozitatea față de sărac este opusă închiderii ochilor la nevoia lui.", source: n },
    ],
  },
  29: {
    number: 29,
    title: "Corectarea, conducerea și frica de oameni",
    summary: "Refuzul repetat al mustrării duce la o rupere greu de reparat. Conducerea dreaptă aduce bucurie, disciplina formează, iar frica de oameni este numită cursă în contrast cu încrederea în DOMNUL.",
    units: [
      { from: 1, to: 14, heading: "Mustrarea refuzată, dreptatea conducătorului și disciplina", teaching: "Omul care își înțepenește gâtul după multe mustrări ajunge la o prăbușire bruscă, iar poporul se bucură când cei drepți cresc și geme sub conducerea răului. Capitolul vorbește despre iubirea înțelepciunii, risipa prin imoralitate, mita și felul în care un rege care judecă drept pe săraci își întărește tronul.", source: n },
      { from: 15, to: 27, heading: "Disciplina, lipsa viziunii și cursa fricii de oameni", teaching: "Nuiaua și mustrarea sunt prezentate în contextul formării, în timp ce copilul lăsat fără limite aduce rușine; disciplina nu autorizează abuzul sau violența arbitrară. Acolo unde nu există viziune sau descoperire, poporul se destramă, iar finalul numește frica de oameni o cursă și încrederea în DOMNUL un loc de siguranță.", source: n },
    ],
  },
  30: {
    number: 30,
    title: "Cuvintele lui Agur: limitele omului, Cuvântul curat și observația atentă a lumii",
    summary: "Agur își mărturisește limitele și pune întrebări despre Creator, apoi afirmă curăția Cuvântului lui Dumnezeu. Rugăciunea pentru nici sărăcie, nici bogăție este urmată de serii numerice care observă lăcomia, creația și comportamentul uman.",
    units: [
      { from: 1, to: 17, heading: "Smerenia înaintea Creatorului și rugăciunea pentru adevăr și suficiență", teaching: "Agur începe recunoscând că nu posedă înțelepciunea prin el însuși și pune întrebări care ridică privirea spre Creator și spre Fiul Lui. Cuvântul lui Dumnezeu este numit curat și nu trebuie completat arbitrar. Rugăciunea personală cere îndepărtarea minciunii și o viață nici în sărăcie, nici în bogăție, pentru ca omul să nu uite pe Dumnezeu sau să fie împins spre furt.", source: n },
      { from: 18, to: 33, heading: "Lucruri prea minunate, făpturi mici și avertismentul împotriva mândriei care produce ceartă", teaching: "A doua jumătate folosește serii de câte trei și patru observații: căi greu de urmărit în creație și relații, situații sociale greu de purtat, lucruri mici care arată înțelepciune și făpturi care se mișcă impunător. Finalul revine la autocontrol: dacă te-ai înălțat nebunește, pune mâna la gură, deoarece stoarcerea mâniei produce ceartă așa cum presiunea produce rezultate inevitabile în celelalte imagini.", source: n },
    ],
  },
}
