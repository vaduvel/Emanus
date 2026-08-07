import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/judges-ruth.txt"
const p = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })
const n = {
  kind: "biblia-emanus" as const,
  note: "rezumat narativ fără doctrină adăugată" as const,
}

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "După Iosua: cucerire neterminată și începutul compromisului",
    summary: "Judecători pornește imediat după victoriile lui Iosua, dar Israel nu duce ascultarea până la capăt și lasă popoare pe care trebuia să le izgonească.",
    units: [{
      from: 1, to: 36,
      heading: "Ascultarea incompletă pregătește robia care urmează",
      teaching: "Poonen introduce Judecători ca imagine a unei căderi rapide după o perioadă de biruință. Poporul ajunge să raționeze și să modifice porunca în loc să o urmeze. El aplică acest tipar compromisului spiritual: ceea ce refuzi să confrunți ajunge să conviețuiască cu tine și să te influențeze. Această aplicație nu transformă războaiele de cucerire ale lui Israel în model pentru violență sau eliminarea unor grupuri moderne; conflictul din Canaan aparține cadrului istoric al textului.",
      source: p("Judges ... backslidden state ... failed to conquer Canaan ... did not follow exactly what God said"),
    }],
  },
  2: {
    number: 2,
    title: "O generație care nu-L cunoștea pe DOMNUL și ciclul Judecătorilor",
    summary: "După moartea lui Iosua și a bătrânilor, se ridică o generație care nu-L cunoaște pe DOMNUL, iar cartea intră în cicluri de abatere, apăsare, strigăt și izbăvire.",
    units: [{
      from: 1, to: 23,
      heading: "Doctrina moștenită nu este același lucru cu a-L cunoaște pe Dumnezeu",
      teaching: "Poonen face din 2:10 cheia cărții: noua generație poate păstra numele și informația, dar nu cunoaște pe DOMNUL și lucrările Lui așa cum le cunoscuse generația anterioară. El avertizează împotriva dependenței de un fondator sau lider carismatic. Când oamenii plâng la mustrare, transcriptul observă că lacrimile și jertfele nu schimbă nimic dacă nu urmează o viață schimbată. Mai târziu, Poonen rezumă șapte cicluri de cădere și izbăvire.",
      source: p("chapter 2 verse 10 ... did not know the Lord ... seven cycles"),
      forYourHeart: "Credința generației dinainte poate să-ți dea limbaj, dar nu poate trăi în locul tău. Întrebarea este dacă Îl cunoști tu pe Dumnezeu.",
    }],
  },
  3: {
    number: 3,
    title: "Otniel, Ehud și Șamgar: izbăvitori ridicați după ce poporul strigă",
    summary: "Primele trei judecători arată tiparul cărții și accentul pe puterea dată de Dumnezeu.",
    units: [{
      from: 1, to: 31,
      heading: "Duhul DOMNULUI, nu certificatul, îl califică pe Otniel",
      teaching: "Poonen se oprește la 3:10: Duhul DOMNULUI vine peste Otniel și el judecă Israelul. Pentru transcript, calificarea slujirii nu este doar informația sau certificatul, ci lucrarea Duhului. El observă apoi cât de mult așteaptă Israel înainte să strige după ajutor și descrie pe Ehud și Șamgar ca alte instrumente prin care Dumnezeu aduce izbăvire. Narațiunile violente rămân acte din istoria judecătorilor și nu sunt metode pentru slujirea creștină modernă.",
      source: p("Othniel ... Spirit of the Lord came upon him ... Ehud ... Shamgar"),
    }],
  },
  4: {
    number: 4,
    title: "Debora și Barac într-o generație în care Dumnezeu caută un om disponibil",
    summary: "Israel ajunge din nou sub apăsare, iar Dumnezeu ridică pe Debora și îl cheamă pe Barac la luptă.",
    units: [{
      from: 1, to: 24,
      heading: "Dumnezeu o folosește pe Debora fără ca textul să-i micșoreze autoritatea profetică",
      teaching: "Poonen folosește Debora ca încurajare pentru femei și spune că Dumnezeu a ridicat-o într-o vreme în care nu găsea un bărbat de aceeași disponibilitate. El exprimă în transcript și convingerea sa despre conducerea masculină în biserică, bazată pe lectura lui din 1 Timotei. Acea poziție este interpretarea lui Poonen asupra rânduielii bisericești și nu trebuie confundată cu faptul explicit din Judecători 4: Debora este prorociță și judecă Israelul, iar Dumnezeu vorbește prin ea.",
      source: p("God couldn't find a man ... woman called Deborah ... encouragement to all the sisters"),
      forYourHeart: "Nu disprețui persoana prin care Dumnezeu spune adevărul doar pentru că nu se potrivește așteptării tale sociale.",
    }],
  },
  5: {
    number: 5,
    title: "Cântarea Deborei și a lui Barac: memoria izbăvirii și răspunsurile diferite ale semințiilor",
    summary: "După biruința din capitolul 4, Debora și Barac cântă despre intervenția DOMNULUI, despre cei care s-au oferit de bunăvoie, despre cei care au rămas deoparte și despre căderea lui Sisera.",
    units: [
      { from: 1, to: 5, heading: "Cântarea începe cu binecuvântarea DOMNULUI", teaching: "Debora și Barac deschid cântarea atribuind biruința DOMNULUI și binecuvântând disponibilitatea conducătorilor și a poporului. Imaginile despre Seir, Edom, pământul care se cutremură și norii care varsă apă așază lupta recentă într-un cadru mai larg al venirii lui Dumnezeu pentru poporul Său.", source: n },
      { from: 6, to: 11, heading: "Drumuri părăsite, sate golite și o generație care trebuia trezită", teaching: "Cântarea descrie starea de nesiguranță dinaintea izbăvirii: drumurile erau părăsite, călătorii mergeau pe căi ocolite și viața satelor se stingea. Debora își descrie ridicarea în această criză, iar apoi sunt chemați să povestească faptele drepte ale DOMNULUI la locurile unde din nou se poate auzi glasul oamenilor.", source: n },
      { from: 12, to: 18, heading: "Unii coboară la luptă, alții rămân între staule sau lângă corăbii", teaching: "Cântarea îi cheamă pe Debora și Barac la trezire și apoi trece în revistă răspunsul semințiilor. Efraim, Beniamin, Machir, Zabulon și Isahar sunt legați de mobilizare, în timp ce Ruben este descris în mari frământări fără a părăsi staulele, iar Galaad, Dan și Așer rămân în zonele lor. Textul păstrează memoria acestor răspunsuri diferite la aceeași criză.", source: n },
      { from: 19, to: 23, heading: "Bătălia de la Taanac, pârâul Chison și blestemul asupra Merozului", teaching: "Regii Canaanului sunt descriși luptând la Taanac, iar poezia spune că stelele și pârâul Chison au luptat împotriva lor. Merozul este apoi blestemat pentru că nu a venit în ajutor în această luptă. Aceste versuri aparțin cântării de război a Israelului din epocă și nu constituie un mandat pentru violență religioasă modernă.", source: n },
      { from: 24, to: 27, heading: "Iael și moartea lui Sisera", teaching: "Cântarea o numește binecuvântată pe Iael și reia poetic scena morții lui Sisera: laptele oferit, țărușul și lovitura fatală. Relatarea celebrează înfrângerea comandantului armatei asupritoare în cadrul războiului din Judecători; Emanus nu transferă metoda acestei narațiuni în etica relațiilor personale sau a conflictelor contemporane.", source: n },
      { from: 28, to: 31, heading: "Mama lui Sisera așteaptă un car care nu se mai întoarce", teaching: "Ultima strofă schimbă perspectiva spre casa lui Sisera, unde mama lui așteaptă la fereastră și își explică întârzierea prin presupusa împărțire a prăzii. Cântarea se încheie cerând ca vrăjmașii DOMNULUI să piară și cei ce Îl iubesc să fie ca soarele când se ridică în puterea lui, după care țara are odihnă patruzeci de ani.", source: n },
    ],
  },
  6: {
    number: 6,
    title: "Ghedeon: Duhul îl îmbracă pe omul care se simțea mic",
    summary: "Madian pustiește țara, iar Ghedeon este chemat și echipat pentru izbăvire.",
    units: [{
      from: 1, to: 40,
      heading: "«Duhul DOMNULUI l-a îmbrăcat pe Ghedeon»",
      teaching: "Poonen se oprește la 6:34 și la imaginea marginală: Duhul DOMNULUI îl «îmbracă» pe Ghedeon ca o haină. El folosește aceasta în aceeași linie cu Otniel și Samson: puterea pentru lucrare vine de la Dumnezeu. Ghedeon începe bine și va deveni un exemplu că un început bun și o experiență reală cu Duhul nu garantează un sfârșit bun.",
      source: p("chapter 6 ... Gideon ... Spirit of the Lord clothed Gideon like a dress"),
      words: [{ original: "וְרוּחַ יְהוָה לָבְשָׁה", transliteration: "ve-ruah YHWH laveșah", language: "ebraica", meaning: "«Duhul DOMNULUI l-a îmbrăcat»; verbul folosește imaginea îmbrăcării pentru echiparea lui Ghedeon.", verseRef: "Judecători 6:34", lexicalSource: "WLC-OSHB" }],
    }],
  },
  7: {
    number: 7,
    title: "Trei sute, vase de lut și lumina care se vede când vasul se sparge",
    summary: "Dumnezeu reduce armata lui Ghedeon, îl încurajează înaintea luptei și folosește trâmbițe, vase și făclii în noapte.",
    units: [{ from: 1, to: 25, heading: "Biruința trebuie să lase puțin spațiu pentru lauda omului", teaching: "Poonen urmărește selectarea celor trei sute, încurajarea dată lui Ghedeon prin ceea ce aude în tabăra vrăjmașă și vasele cu lumină înăuntru. El leagă imaginea vaselor sparte de 2 Corinteni 4: comoara în vase de lut și purtarea morții lui Iisus pentru ca viața Lui să se arate. Legătura paulină este aplicația lui Poonen; Judecători 7 în sine relatează strategia și biruința. Reducerea armatei are în text scopul explicit ca Israel să nu spună «mâna mea m-a izbăvit».", source: p("Gideon's army ... vessel with a light inside ... 2 Corinthians 4 7-10") }],
  },
  8: {
    number: 8,
    title: "Ghedeon refuză coroana, dar efodul lui devine idol",
    summary: "După victorie, Ghedeon declară că DOMNUL trebuie să domnească, dar cere aur și face un efod care devine cursă.",
    units: [{ from: 1, to: 35, heading: "Poți începe bine și totuși să nu rămâi până la capăt", teaching: "Poonen folosește finalul lui Ghedeon ca avertisment repetat: omul a început bine, a fost îmbrăcat de Duhul și folosit puternic, dar după victorie aurul primit devine un efod care ajunge idol. Transcriptul subliniază că lucrarea trecută nu ne scutește de nevoia de veghere prezentă.", source: p("chapter 8 verse 22 ... Gideon ... 1700 shekels of gold ... became an idol ... backslid"), forYourHeart: "Nu te hrăni cu povestea începutului tău bun. Întreabă ce face succesul de azi cu inima ta." }],
  },
  9: {
    number: 9,
    title: "Abimelec își ia puterea prin sânge, iar pilda lui Iotam îi anunță sfârșitul",
    summary: "Fiul lui Ghedeon, Abimelec, își cumpără sprijinul din Sihem, își ucide frații și este făcut împărat. Iotam scapă, rostește pilda copacilor și anunță ruptura care va veni între Abimelec și cei care l-au ridicat.",
    units: [
      { from: 1, to: 6, heading: "Șaptezeci de sicli, oameni de nimic și șaptezeci de frați uciși", teaching: "Abimelec merge la familia mamei lui din Sihem și transformă legătura de rudenie în argument pentru putere. Cu argint luat din casa lui Baal-Berit își angajează oameni, își ucide frații pe aceeași piatră și este proclamat împărat. Iotam, cel mai tânăr, scapă și rămâne singurul dintre frați care poate vorbi împotriva acestei instaurări.", source: n },
      { from: 7, to: 21, heading: "Pilda copacilor: spinul acceptă coroana pe care pomii roditori o refuză", teaching: "Iotam spune o parabolă în care măslinul, smochinul și vița refuză să-și abandoneze rodul pentru a domni peste copaci, iar spinul acceptă. Apoi aplică pilda direct celor din Sihem: dacă au lucrat cu adevăr față de casa lui Ghedeon, să se bucure de Abimelec; dacă nu, focul să iasă dintr-o parte împotriva celeilalte. Textul leagă astfel alegerea conducătorului de violența prin care a fost obținută puterea.", source: n },
      { from: 22, to: 29, heading: "Relația dintre Abimelec și Sihem începe să se destrame", teaching: "După trei ani, ostilitatea se instalează între Abimelec și conducătorii Sihemului. Oamenii cetății pun pândă pe drumuri, iar Gaal, fiul lui Ebed, câștigă încrederea lor și îl provoacă public pe Abimelec. Narațiunea urmărește cum alianța făcută prin sânge și interes începe să se întoarcă împotriva propriilor participanți.", source: n },
      { from: 30, to: 41, heading: "Zebul îl avertizează pe Abimelec, iar Gaal este alungat", teaching: "Zebul, conducătorul cetății, află cuvintele lui Gaal și trimite în ascuns lui Abimelec planul pentru atac. Dimineața, Gaal vede trupele coborând de pe munți, este împins de Zebul să-și susțină lauda și iese la luptă. Abimelec îl învinge, iar Gaal și oamenii lui sunt izgoniți din Sihem.", source: n },
      { from: 42, to: 49, heading: "Sihemul este distrus, iar turnul este ars peste cei refugiați în el", teaching: "Conflictul nu se oprește la alungarea lui Gaal. Abimelec atacă oamenii ieșiți la câmp, cucerește cetatea și o distruge. Cei care se refugiază în turnul Sihemului sunt încercuiți, iar Abimelec folosește ramuri pentru a-i da foc. Narațiunea descrie escaladarea brutală a luptei pentru putere; nu oferă un model legitim de pedepsire colectivă.", source: n },
      { from: 50, to: 57, heading: "La Tebeț, o piatră de moară pune capăt domniei lui Abimelec", teaching: "Abimelec repetă la Tebeț tactica folosită la Sihem, dar o femeie aruncă de pe turn o piatră de moară care îi zdrobește capul. El îi cere purtătorului de arme să-l omoare ca să nu se spună că a murit de mâna unei femei. Finalul capitolului interpretează căderea lui Abimelec și a Sihemului ca întoarcere asupra lor a răului făcut casei lui Ghedeon și a blestemului rostit de Iotam.", source: n },
    ],
  },
  10: {
    number: 10,
    title: "După Tola și Iair, Israel se întoarce din nou la idoli și ajunge sub apăsare",
    summary: "Doi judecători sunt menționați pe scurt, apoi cartea descrie o nouă cădere în idolatrie, apăsarea filistenilor și amoniților, mărturisirea poporului și pregătirea conflictului din Galaad.",
    units: [
      { from: 1, to: 5, heading: "Tola și Iair judecă Israelul între marile crize ale cărții", teaching: "Tola este ridicat după Abimelec și judecă Israelul douăzeci și trei de ani. După el vine Iair, descris prin cei treizeci de fii și cetățile lor, și judecă douăzeci și doi de ani. Narațiunea le acordă puține detalii, dar îi așază ca perioade reale de conducere între crizele mai amplu povestite.", source: n },
      { from: 6, to: 9, heading: "Israel slujește unei mulțimi de dumnezei și este zdrobit din două direcții", teaching: "Textul enumeră Baalii, Astarteile și dumnezeii mai multor popoare vecine pentru a arăta întinderea noii apostazii. Israel părăsește pe DOMNUL, iar filistenii și amoniții ajung să-l apese. Galaadul este lovit direct, apoi amenințarea trece Iordanul spre Iuda, Beniamin și Efraim.", source: n },
      { from: 10, to: 16, heading: "Mărturisirea păcatului este urmată de îndepărtarea dumnezeilor străini", teaching: "Copiii lui Israel mărturisesc că au păcătuit părăsind pe Dumnezeu. Răspunsul amintește izbăvirile anterioare și confruntă contradicția de a reveni la DOMNUL numai când dumnezeii aleși nu îi pot salva. Poporul spune apoi că acceptă disciplina, îndepărtează dumnezeii străini și slujește DOMNULUI; textul încheie această secțiune spunând că suferința lui Israel nu Îi este indiferentă.", source: n },
      { from: 17, to: 18, heading: "Amon se strânge la Galaad, iar cetățile caută un conducător", teaching: "Amoniții se adună în Galaad, iar Israel își așază tabăra la Mițpa. Conducătorii din Galaad ajung la întrebarea practică ce deschide capitolul următor: cine va începe lupta cu Amon și va deveni căpetenie peste locuitorii Galaadului?", source: n },
    ],
  },
  11: {
    number: 11,
    title: "Iefta este chemat înapoi din exil, negociază cu Amon și face un jurământ tragic",
    summary: "Iefta, respins mai înainte de frații săi, este chemat să conducă Galaadul. El încearcă să rezolve conflictul prin mesaje istorice, apoi merge la luptă și rostește un jurământ care umbrește victoria.",
    units: [
      { from: 1, to: 11, heading: "Cel alungat de familie este chemat când Galaadul are nevoie de un războinic", teaching: "Iefta este prezentat ca viteaz, dar și ca fiu al unei femei marginalizate, alungat de frații lui din moștenire. El trăiește în țara Tob până când bătrânii Galaadului vin să-i ceară ajutor împotriva lui Amon. Iefta le amintește că l-au urât și izgonit, iar întoarcerea lui este negociată până când este pus căpetenie și conducător.", source: n },
      { from: 12, to: 28, heading: "Înaintea luptei, Iefta răspunde pretenției teritoriale prin istoria Exodului", teaching: "Iefta trimite mai întâi soli împăratului amoniților și întreabă motivul atacului. Când primește revendicarea asupra teritoriului, el răspunde recapitulând traseul Israelului, refuzurile Edomului și Moabului și conflictul cu Sihon. Argumentul lui este că Israel nu luase țara lui Moab sau Amon în drumul său, iar disputa nu fusese ridicată în secolele anterioare. Împăratul amoniților nu primește răspunsul.", source: n },
      { from: 29, to: 33, heading: "Duhul DOMNULUI vine peste Iefta, iar el rostește un jurământ înaintea victoriei", teaching: "Textul spune că Duhul DOMNULUI vine peste Iefta și descrie traseul lui spre luptă. Înaintea confruntării, Iefta rostește un jurământ despre ceea ce va ieși din casa lui când se va întoarce în pace. Victoria asupra amoniților este apoi relatată separat, cu cetățile lovite și supunerea lor înaintea lui Israel.", source: n },
      { from: 34, to: 40, heading: "Fiica lui Iefta iese în întâmpinare, iar jurământul transformă victoria în jale", teaching: "Când Iefta se întoarce, singurul lui copil, fiica sa, îi iese înainte cu timpane și jocuri. Bucuria se transformă imediat în durere din cauza jurământului rostit. Ea cere timp să-și plângă fecioria împreună cu prietenele, iar narațiunea spune că Iefta împlinește jurământul făcut. Capitolul nu prezintă jurământul ca poruncă dată de Dumnezeu și nu îl transformă într-un model pentru promisiuni primejdioase sau vătămarea unei persoane.", source: n },
    ],
  },
  12: {
    number: 12,
    title: "Conflictul dintre Efraim și Galaad se termină la vadurile Iordanului",
    summary: "După războiul cu Amon, Efraim intră în conflict cu Iefta. O diferență de pronunție devine mijloc de identificare la Iordan, iar finalul capitolului trece rapid prin încă trei judecători.",
    units: [
      { from: 1, to: 7, heading: "O ceartă între seminții ajunge la luptă și la testul «Șibolet»", teaching: "Bărbații lui Efraim îl acuză pe Iefta că nu i-a chemat la luptă și îl amenință. Iefta răspunde că îi chemase fără să primească ajutor, iar conflictul escaladează într-o luptă internă. La vadurile Iordanului, pronunția cuvântului «Șibolet» este folosită pentru identificarea efraimiților fugari, iar textul consemnează pierderi foarte mari. Episodul descrie destrămarea internă a Israelului, nu un model pentru persecutarea oamenilor după limbă sau origine.", source: n },
      { from: 8, to: 15, heading: "Ibțan, Elon și Abdon închid seria de judecători de după Iefta", teaching: "După moartea lui Iefta, narațiunea îi prezintă pe Ibțan din Betleem, Elon din Zabulon și Abdon din Piraton. Detaliile sunt scurte și pun accent pe durata judecării și pe familiile lor. Aceste tranziții duc cartea spre ciclul lui Samson, fără a descrie o nouă mare izbăvire în aceste versete.", source: n },
    ],
  },
  13: {
    number: 13,
    title: "Samson este consacrat înainte de naștere și Duhul începe să-l miște",
    summary: "Un cuplu fără copii primește vestea nașterii unui nazireu care va începe izbăvirea lui Israel.",
    units: [{ from: 1, to: 25, heading: "Chemare și putere înaintea unei vieți care va rămâne amestecată", teaching: "Poonen introduce pe Samson ca al treisprezecelea judecător din carte și subliniază nazireatul și faptul că Duhul lui Dumnezeu începe să lucreze în el. Acest început extraordinar face cu atât mai grav declinul ulterior. Darul spiritual și chemarea nu sunt garanția caracterului matur.", source: p("13th Samson ... chapter 13 ... Nazarite ... spirit of God"), words: [{ original: "נְזִיר אֱלֹהִים", transliteration: "nezir Elohim", language: "ebraica", meaning: "nazireu/om consacrat lui Dumnezeu; separarea lui Samson este semn al chemării sale, nu o putere magică a părului.", verseRef: "Judecători 13:5", lexicalSource: "WLC-OSHB" }] }],
  },
  14: {
    number: 14,
    title: "Samson «s-a coborât» și viața lui începe să alterneze între putere și dorințe necontrolate",
    summary: "Samson dorește o femeie filisteancă, omoară un leu prin puterea Duhului și intră într-un șir de conflicte personale.",
    units: [{ from: 1, to: 20, heading: "Puterea spirituală nu compensează lipsa disciplinei în dorințe", teaching: "Poonen observă chiar formularea «Samson s-a coborât» și dezvoltă contrastul dintre Samson și Iosif în domeniul sexual. Transcriptul folosește limbaj foarte general despre femei; Emanus restrânge aplicația la problema explicită a lui Samson: el își lasă dorințele să-i conducă alegerile și caută repetat relații care îl duc spre compromis. Vina nu este pusă generic asupra femeilor; responsabilitatea pentru alegerile lui Samson îi aparține lui Samson.", source: p("Samson went down ... saw a woman ... contrast to Joseph") }],
  },
  15: {
    number: 15,
    title: "Răzbunarea lui Samson escaladează conflictul cu filistenii",
    summary: "O ruptură familială declanșează incendierea recoltelor, represalii și o nouă rundă de violență. Samson este predat de oamenii lui Iuda, dar scapă și lovește filistenii înainte de a striga către Dumnezeu din cauza setei.",
    units: [
      { from: 1, to: 8, heading: "O relație ruptă ajunge la incendiere și represalii succesive", teaching: "Samson află că soția lui fusese dată altui bărbat și răspunde printr-o acțiune care incendiază recoltele filistenilor. Filistenii răspund prin uciderea femeii și a tatălui ei, iar Samson răspunde din nou printr-o lovitură asupra lor. Textul prezintă un lanț de răzbunări care se amplifică; nu îl oferă ca procedură legitimă pentru conflicte personale.", source: n },
      { from: 9, to: 13, heading: "Trei mii de oameni din Iuda îl leagă pe Samson ca să-l predea", teaching: "Filistenii urcă în Iuda ca să-l prindă pe Samson, iar oamenii din Iuda vin în număr mare la stânca Etam. Ei îi spun că filistenii stăpânesc peste ei și cer să-l lege pentru a-l preda. Samson acceptă să fie legat după ce primește asigurarea că oamenii lui nu îl vor omorî ei înșiși.", source: n },
      { from: 14, to: 17, heading: "Funia se rupe, iar falca de măgar devine arma luptei", teaching: "Când Samson ajunge la filisteni, textul spune că Duhul DOMNULUI vine peste el, legăturile cedează și el folosește o falcă de măgar pentru a-i lovi. Numele locului păstrează memoria episodului. Acțiunea aparține conflictului militar din Judecători și nu este un model pentru violență personală.", source: n },
      { from: 18, to: 20, heading: "După victorie, Samson ajunge la limită și cere apă", teaching: "Puterea din luptă nu îl face pe Samson independent de nevoile trupului. Chinuit de sete, el strigă către DOMNUL și recunoaște izbăvirea primită, temându-se că va muri și va cădea în mâinile filistenilor. Dumnezeu deschide o sursă de apă, iar narațiunea notează apoi că Samson a judecat Israelul douăzeci de ani în vremea filistenilor.", source: n },
    ],
  },
  16: {
    number: 16,
    title: "Samson pierde libertatea după ce se joacă repetat cu limita consacrării",
    summary: "Relația cu Dalila ajunge la divulgarea secretului nazireatului, iar Samson este prins, orbit și adus în templul lui Dagon.",
    units: [{ from: 1, to: 31, heading: "O slujire puternică nu salvează automat o viață privată nevegheată", teaching: "Poonen încheie povestea lui Samson ca avertisment despre un om cu o lucrare extraordinară care este ruinat prin domeniul pe care nu l-a păzit. El subliniază contrastul dintre numărul oamenilor binecuvântați prin lucrare și starea personală a slujitorului. Finalul violent al lui Samson aparține războiului cu filistenii și nu este model pentru sinucidere, atac asupra civililor sau martiriu provocat. Aplicația sigură este nevoia de caracter și curăție alături de dar.", source: p("message of Samson ... wonderful ministry ... many people blessed"), forYourHeart: "Nu folosi rodul public ca dovadă că totul este sănătos în viața privată. Darul nu ține locul ascultării." }],
  },
  17: {
    number: 17,
    title: "Mica își face un sanctuar privat, iar un levit devine preotul casei lui",
    summary: "După ciclurile judecătorilor, cartea intră într-o serie de episoade fără un judecător central. Mica transformă argintul familiei într-un chip, își organizează propriul cult și angajează un levit, în timp ce narațiunea introduce refrenul că fiecare făcea ce-i plăcea.",
    units: [
      { from: 1, to: 6, heading: "Argintul furat se întoarce în casă și ajunge chip pentru sanctuarul lui Mica", teaching: "Mica mărturisește că luase argintul mamei sale și îl restituie. Mama consacră o parte din argint pentru un chip, iar Mica ajunge să aibă o casă de dumnezei, un efod, terafimi și un fiu pus preot. Versetul 6 oferă cadrul editorial al secțiunii: nu era împărat în Israel și fiecare făcea ce era drept în propriii ochi.", source: n },
      { from: 7, to: 13, heading: "Levitul caută un loc, iar Mica îl angajează ca preot personal", teaching: "Un tânăr levit din Betleem pleacă să caute unde să locuiască și ajunge la casa lui Mica. Mica îi oferă hrană, îmbrăcăminte și plată ca să-i fie preot. Finalul arată încrederea lui Mica în această aranjare: el presupune că DOMNUL îi va face bine pentru că are un levit ca preot, deși întregul sanctuar fusese organizat după inițiativa casei lui.", source: n },
    ],
  },
  18: {
    number: 18,
    title: "Seminția lui Dan caută teritoriu, ia idolii lui Mica și își întemeiază cultul la Dan",
    summary: "Dan trimite iscoade să caute o moștenire, găsește cetatea Laiș și revine cu o forță armată. Pe drum, oamenii iau obiectele de cult ale lui Mica și îl conving pe levit să devină preotul unei seminții întregi.",
    units: [
      { from: 1, to: 6, heading: "Cinci iscoade caută o moștenire și consultă preotul lui Mica", teaching: "Capitolul reia refrenul că nu era împărat în Israel și explică faptul că daniții încă își căutau o moștenire în care să se așeze. Cinci oameni sunt trimiși să cerceteze țara, recunosc glasul levitului în casa lui Mica și îi cer să întrebe dacă drumul lor va izbuti. Levitul le oferă un răspuns favorabil.", source: n },
      { from: 7, to: 13, heading: "Laișul este găsit liniștit și izolat, iar iscoadele cer acțiune imediată", teaching: "Iscoadele ajung la Laiș și observă o cetate liniștită, fără legături puternice cu vecinii care ar putea veni repede în ajutor. Întorși la frații lor, ei descriu țara drept foarte bună și îi îndeamnă să nu întârzie. Șase sute de oameni înarmați pornesc apoi spre nord.", source: n },
      { from: 14, to: 26, heading: "Daniții iau efodul, terafimii și chipul și îl conving pe levit să plece cu ei", teaching: "Cei cinci iscoade îi conduc pe oamenii înarmați la casa lui Mica și iau obiectele de cult. Când levitul întreabă ce fac, ei îi oferă un rol mai mare: să fie preotul unei seminții, nu doar al unei familii. Levitul acceptă. Mica îi urmărește și protestează că i-au luat dumnezeii și preotul, dar se întoarce când vede că grupul este mai puternic decât el.", source: n },
      { from: 27, to: 31, heading: "Laișul este cucerit și numit Dan, iar chipul lui Mica devine cult al seminției", teaching: "Daniții atacă Laișul, ard cetatea și o reconstruiesc sub numele Dan. Acolo așază chipul luat de la Mica și stabilesc o linie de preoți. Ultimul verset pune acest sanctuar în contrast temporal cu Casa lui Dumnezeu de la Șilo, arătând că aranjamentul religios al lui Mica nu a rămas o excentricitate privată, ci s-a extins la nivelul unei seminții.", source: n },
    ],
  },
  19: {
    number: 19,
    title: "Ghibea: ospitalitatea refuzată, abuzul unei femei și o crimă care zguduie Israelul",
    summary: "Un levit călătorește cu concubina lui și ajunge în Ghibea, cetate israelită. Noaptea se transformă într-o atrocitate sexuală și într-o moarte, iar reacția levitului pregătește războiul civil din capitolele următoare.",
    units: [
      { from: 1, to: 10, heading: "Levitul merge să-și aducă înapoi concubina și este întârziat de tatăl ei", teaching: "Narațiunea prezintă un levit din muntele lui Efraim a cărui concubină ajunsese în casa tatălui ei la Betleem. El merge să vorbească inimii ei și să o aducă înapoi. Tatăl femeii îl primește cu bucurie și îl reține mai multe zile prin ospitalitate, până când levitul insistă să pornească la drum spre seară.", source: n },
      { from: 11, to: 15, heading: "Călătorii trec de Iebus și aleg Ghibea, o cetate a lui Beniamin", teaching: "Slujitorul propune să rămână la Iebus, dar levitul preferă să ajungă într-o cetate a copiilor lui Israel. Ei ajung la Ghibea după apus și se așază în piață, însă nimeni nu îi primește inițial în casă. Alegerea unei cetăți israelite nu îi protejează de răul care urmează.", source: n },
      { from: 16, to: 21, heading: "Un bătrân străin de cetate îi primește în casa lui", teaching: "Un bătrân care se întorcea de la muncă află că levitul este din muntele lui Efraim, ca și el, și îi avertizează să nu rămână în piață. Îi primește în casă, le îngrijește animalele și le oferă hrană. Această ospitalitate formează contrastul imediat cu violența oamenilor care înconjoară casa.", source: n },
      { from: 22, to: 26, heading: "Mulțimea cere bărbatul, iar concubina este dată afară și abuzată până dimineața", teaching: "Oameni ai cetății înconjoară casa și cer ca levitul să fie scos la ei pentru a-l viola. Gazda încearcă să împiedice atacul, dar propune la rândul lui expunerea femeilor din casă. În cele din urmă concubina este scoasă, este abuzată sexual toată noaptea și cade dimineața la ușă. Narațiunea expune o prăbușire morală extremă; violența sexuală și sacrificarea unei victime pentru salvarea altora nu sunt aprobate prin simplul fapt că sunt relatate.", source: n },
      { from: 27, to: 30, heading: "Trupul femeii este trimis în Israel ca semn al atrocității", teaching: "Dimineața, levitul găsește femeia la prag, o pune pe măgar și se întoarce acasă. Apoi îi taie trupul și trimite bucățile în teritoriile lui Israel, provocând o reacție națională de groază și chemarea de a lua în considerare ce trebuie făcut. Gestul lui face parte din escaladarea întunecată a finalului cărții și nu este o practică legitimă de mobilizare sau tratare a unui trup omenesc.", source: n },
    ],
  },
  20: {
    number: 20,
    title: "Israel se strânge împotriva lui Beniamin, iar judecarea crimei devine război civil",
    summary: "Atrocitatea din Ghibea adună semințiile la Mițpa. Beniamin refuză să predea vinovații, Israel este înfrânt de două ori înainte de victoria finală, iar conflictul se transformă într-o devastare a propriei seminții.",
    units: [
      { from: 1, to: 7, heading: "Adunarea de la Mițpa ascultă relatarea levitului", teaching: "Semințiile se adună ca un singur om și cer să afle cum s-a petrecut nelegiuirea. Levitul relatează sosirea la Ghibea, atacul asupra lui și moartea concubinei, apoi explică trimiterea trupului în Israel. Adunarea primește astfel cazul care va declanșa acțiunea colectivă.", source: n },
      { from: 8, to: 17, heading: "Israel cere predarea oamenilor din Ghibea, dar Beniamin se mobilizează pentru război", teaching: "Adunarea hotărăște să acționeze împotriva Ghibei și trimite soli prin seminția lui Beniamin cerând predarea oamenilor vinovați. Beniamin refuză să asculte și își strânge luptătorii, inclusiv șapte sute de oameni aleși descriși prin precizia praștiei lor. Ceea ce începe ca judecarea unei crime locale devine astfel conflict între seminții.", source: n },
      { from: 18, to: 28, heading: "Două înfrângeri îi duc pe israeliți la plâns, post și o nouă întrebare înaintea DOMNULUI", teaching: "Israel întreabă cine să urce primul și primește răspunsul «Iuda», dar este înfrânt în prima zi. După încurajare și o nouă întrebare, este înfrânt din nou. Abia după a doua înfrângere întreaga adunare plânge, postește și aduce jertfe, iar textul îl menționează pe Fineas înaintea chivotului. Răspunsul pentru a treia zi anunță că Beniamin va fi dat în mâna lor.", source: n },
      { from: 29, to: 36, heading: "Ambuscada întoarce a treia bătălie împotriva lui Beniamin", teaching: "Israel așază oameni la pândă în jurul Ghibei și repetă aparent retragerea din zilele precedente. Beniamiții ies din cetate și cred că îi înving din nou, dar sunt atrași departe de Ghibea. Semnalul fumului și atacul ambuscadei schimbă cursul luptei, iar Beniamin își dă seama că dezastrul a ajuns asupra lui.", source: n },
      { from: 37, to: 48, heading: "Victoria se transformă într-o distrugere aproape totală a lui Beniamin", teaching: "Oamenii din pândă intră în Ghibea și îi dau foc, iar forțele lui Beniamin sunt lovite din mai multe direcții. Doar șase sute de bărbați ajung la stânca Rimon. Finalul descrie Israelul întorcându-se asupra cetăților lui Beniamin și trecând prin sabie oameni, animale și localități. Textul pregătește criza din capitolul 21: pedepsirea crimei a ajuns la marginea dispariției unei seminții. Devastarea este relatată istoric, nu prescrisă comunității creștine.", source: n },
    ],
  },
  21: {
    number: 21,
    title: "Israel încearcă să salveze seminția lui Beniamin prin noi acte de violență și constrângere",
    summary: "După războiul civil, israeliții descoperă că jurământul lor pune Beniamin în pericol de dispariție. Soluțiile adoptate la Iabeș-Galaad și Șilo arată cât de adâncă este dezordinea morală a epocii, înaintea ultimului refren al cărții.",
    units: [
      { from: 1, to: 7, heading: "Jurământul făcut la Mițpa creează o nouă criză după război", teaching: "Israel jurase să nu dea nicio fiică de soție unui beniamit. După devastarea seminției, poporul plânge înaintea lui Dumnezeu și întreabă de ce lipsește o seminție din Israel. Totuși jurământul lor rămâne în picioare, astfel încât problema supraviețuirii lui Beniamin este agravată chiar de propria hotărâre colectivă.", source: n },
      { from: 8, to: 15, heading: "Iabeș-Galaad este atacat pentru absența de la adunare, iar patru sute de fete sunt date beniaminților", teaching: "Adunarea constată că Iabeș-Galaad nu venise la Mițpa și trimite douăsprezece mii de oameni împotriva cetății. Narațiunea descrie uciderea locuitorilor și păstrarea a patru sute de fete necăsătorite, care sunt apoi date supraviețuitorilor lui Beniamin. Acțiunea este hotărârea adunării în încercarea de a rezolva propria criză; textul nu o prezintă ca model etic pentru protejarea unei comunități.", source: n },
      { from: 16, to: 24, heading: "Pentru bărbații rămași fără soții, bătrânii propun răpirea fetelor de la Șilo", teaching: "Cum cele patru sute de femei nu sunt suficiente, bătrânii caută o cale de a păstra jurământul fără ca Beniamin să dispară. Ei îi instruiesc pe bărbații rămași să se ascundă lângă sărbătoarea de la Șilo și să ia fete dintre cele care ies la joc. Planul evită formal ca părinții să le «dea» fiicele, dar o face prin constrângerea femeilor. Narațiunea arată o soluție omenească profund tulburătoare într-o epocă dezordonată; răpirea nu devine legitimă pentru că apare în text.", source: n },
      { from: 25, to: 25, heading: "Ultimul verset explică atmosfera întregului final al cărții", teaching: "Judecători se încheie repetând: nu era împărat în Israel și fiecare făcea ce era drept în propriii ochi. Refrenul nu transformă automat fiecare acțiune anterioară într-o poruncă divină; dimpotrivă, este cadrul literar în care cartea a relatat idolatria, abuzul, războiul între frați și soluțiile morale contradictorii ale ultimelor capitole.", source: n },
    ],
  },
}

const JUDECATORI_OVERLAY: ExplainedBookOverlay = {
  bookId: "judecatori",
  bibleEmanusBookId: "JDG",
  name: "Judecători",
  testament: "vt",
  order: 7,
  transcript,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("Judecători", 21, focused),
}

export const JUDECATORI_EXPLAINED = assertCompleteOverlay(JUDECATORI_OVERLAY, 21)
