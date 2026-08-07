import {
  assertCompleteOverlay,
  transcriptFocusedChapters,
  type ExplainedBookOverlay,
  type ExplainedOverlayChapter,
} from "../explainedOverlay.js"

const transcript = ".research/poonen-through-the-bible-OT/transcripts/chronicles-ezra.txt"
const p = (anchor: string) => ({ kind: "poonen" as const, transcript, anchor })
const n = { kind: "biblia-emanus" as const, note: "rezumat narativ fără doctrină adăugată" as const }

const focused: Record<number, ExplainedOverlayChapter> = {
  1: {
    number: 1,
    title: "De la Adam la Edom: genealogia așază Israelul în istoria întregii omeniri",
    summary: "Cronici începe cu Adam și urmărește ramurile omenirii până la Avraam, Isaac, Esau și conducătorii Edomului. Înainte de istoria lui David, cartea își fixează poporul într-o memorie care începe cu omenirea întreagă.",
    units: [
      {
        from: 1, to: 1,
        heading: "Adam — începutul unei liste de persoane cunoscute pe nume",
        teaching: "Poonen observă că primele nouă capitole pot părea doar liste, dar numele individuale transmit ceva important: Dumnezeu nu vorbește doar despre mase anonime. El cunoaște persoana, familia și istoria fiecăruia. Transcriptul aplică această idee credinciosului: numele nu se pierde într-o statistică, iar Dumnezeu cunoaște drumul vieții în detaliu.",
        source: p("first nine chapters ... God is interested in individuals"),
        forYourHeart: "Genealogia pe care tu nici nu o cunoști în întregime nu Îl încurcă pe Dumnezeu. Nu ești un număr într-o mulțime înaintea Lui.",
      },
      {
        from: 2, to: 23,
        heading: "De la Set și Noe la familiile răspândite după potop",
        teaching: "Lista merge de la urmașii lui Adam la Noe și apoi la ramurile lui Sem, Ham și Iafet. Cronici comprimă aici o istorie foarte largă în nume și linii de familie, pregătind trecerea de la întreaga omenire la familia prin care va fi urmărită povestea lui Israel.",
        source: n,
      },
      {
        from: 24, to: 34,
        heading: "Linia lui Sem ajunge la Avraam, apoi la Ismael, Isaac și fiii Cheturei",
        teaching: "Genealogia restrânge treptat cadrul: de la Sem ajunge la Avraam și apoi enumeră descendenții lui prin Ismael, Chetura și Isaac. Iacov și Esau apar împreună în această memorie, înainte ca următoarele versete să urmărească mai ales ramura lui Esau.",
        source: n,
      },
      {
        from: 35, to: 42,
        heading: "Esau și locuitorii Seirului",
        teaching: "Sunt enumerați fiii lui Esau și apoi familiile lui Seir. Cartea păstrează astfel numele popoarelor înrudite cu Israelul, nu doar linia care va conduce la David. Genealogia funcționează ca hartă de rudenie și memorie istorică, nu ca listă de personaje fără legătură.",
        source: n,
      },
      {
        from: 43, to: 54,
        heading: "Regii și căpeteniile Edomului înainte ca Israel să aibă împărat",
        teaching: "Finalul capitolului enumeră regii care au domnit în Edom și apoi căpeteniile edomite. Secțiunea închide ramura lui Esau înainte ca următorul capitol să se întoarcă la fiii lui Israel și, în mod special, la Iuda.",
        source: n,
      },
    ],
  },
  2: {
    number: 2,
    title: "De la fiii lui Israel la Iuda și familia din care va veni David",
    summary: "Genealogia se mută de la cei doisprezece fii ai lui Israel spre Iuda, Pereț, Hețron și familia lui Isai. Ramurile lui Caleb și Ierahmeel arată că linia lui David este urmărită fără a șterge celelalte familii ale seminției.",
    units: [
      { from: 1, to: 2, heading: "Cei doisprezece fii ai lui Israel", teaching: "Capitolul începe cu numele celor doisprezece fii ai lui Israel. Această listă scurtă fixează cadrul tribal al istoriei care urmează înainte ca atenția să se concentreze asupra seminției lui Iuda.", source: n },
      { from: 3, to: 17, heading: "Iuda, Pereț și linia care ajunge la Isai și David", teaching: "Narațiunea genealogică nu ascunde episoadele dificile legate de familia lui Iuda, apoi urmărește linia prin Pereț și Hețron până la Boaz, Obed, Isai și fiii lui. David apare astfel într-o familie concretă, nu izolat de istoria precedentă a lui Iuda.", source: n },
      { from: 18, to: 24, heading: "Ramura lui Caleb, fiul lui Hețron", teaching: "Lista urmărește o ramură a casei lui Hețron prin Caleb, soțiile și copiii lui și leagă familia de mai multe localități și case. Aceste versete păstrează memoria ramurilor care nu intră direct în linia regală a lui David.", source: n },
      { from: 25, to: 41, heading: "Familia lui Ierahmeel", teaching: "O secțiune amplă urmărește descendenții lui Ierahmeel. Numele, căsătoriile și succesiunile arată interesul cronicarului pentru continuitatea familiilor, inclusiv acolo unde povestirea istorică obișnuită oferă foarte puține detalii despre aceste persoane.", source: n },
      { from: 42, to: 55, heading: "Alte ramuri ale lui Caleb și familiile așezate în Iuda", teaching: "Ultima parte adună descendenți ai lui Caleb și familii legate de localități și meșteșuguri, inclusiv familii de cărturari. Capitolul se încheie cu o imagine mai largă a lui Iuda decât simpla linie regală.", source: n },
    ],
  },
  3: {
    number: 3,
    title: "Casa lui David: de la fiii născuți la Hebron la linia de după exil",
    summary: "Cronici urmărește fiii lui David, succesiunea regilor lui Iuda și apoi familia lui Ieconia după căderea monarhiei. Genealogia regală continuă chiar când tronul vizibil nu mai există.",
    units: [
      { from: 1, to: 9, heading: "Fiii lui David la Hebron și Ierusalim", teaching: "Primii nouă versete enumeră fiii lui David născuți în cele două etape majore ale domniei lui: Hebron și Ierusalim. Solomon apare între fiii născuți la Ierusalim, dar lista păstrează și ceilalți fii ai casei lui David.", source: n },
      { from: 10, to: 16, heading: "Succesiunea de la Solomon până la exil", teaching: "Linia regală este urmărită de la Solomon prin regii lui Iuda până la Iosia și fiii lui. Genealogia comprimă aici mai multe secole de istorie monarhică într-o succesiune care conduce spre criza exilului.", source: n },
      { from: 17, to: 24, heading: "Descendenții lui Ieconia după pierderea tronului", teaching: "După exil, lista nu se oprește. Sunt enumerați descendenții lui Ieconia și generațiile următoare, ceea ce păstrează memoria casei lui David chiar într-o perioadă în care familia nu mai domnește ca înainte la Ierusalim.", source: n },
    ],
  },
  4: {
    number: 4,
    title: "Familiile lui Iuda și Simeon, cu rugăciunea lui Iabeț în mijlocul listelor",
    summary: "Capitolul continuă genealogii și așezări din Iuda și Simeon. În mijlocul lor, două versete se opresc asupra lui Iabeț și rugăciunii lui, apoi lista revine la familii, meșteșuguri și extinderea teritorială.",
    units: [
      { from: 1, to: 8, heading: "Ramuri ale lui Iuda și familii legate de cetăți", teaching: "Primele versete adună mai multe ramuri genealogice ale lui Iuda și le leagă de familii și localități. Stilul este condensat și presupune o comunitate pentru care aceste nume păstrau identitate și apartenență.", source: n },
      {
        from: 9, to: 10,
        heading: "Iabeț: durerea și o rugăciune pentru o viață lărgită de Dumnezeu",
        teaching: "Poonen observă jocul dintre numele Iabeț și durerea menționată de mama lui, apoi subliniază că omul devine cunoscut printr-o rugăciune: cere binecuvântare, lărgirea hotarului, mâna lui Dumnezeu și păzire de rău. El aplică spiritual cererea ca dorință de creștere și de puterea lui Dumnezeu. Textul nu spune că orice suferință produce automat maturitate și nici că această rugăciune garantează prosperitate materială.",
        source: p("Jabez ... more honorable ... pain and suffering ... enlarge my border"),
        words: [{ original: "יַעְבֵּץ", transliteration: "Ya'beț", language: "ebraica", meaning: "numele este legat în verset printr-un joc de cuvinte de rădăcina asociată durerii/tristeții; textul însuși explică numirea prin «l-am născut cu durere».", verseRef: "1 Cronici 4:9", lexicalSource: "WLC-OSHB" }],
        forYourHeart: "Poți cere lui Dumnezeu creștere fără să transformi rugăciunea într-o tehnică de obținere a confortului. Cere ca mâna Lui să fie cu tine și ca răul să nu te stăpânească.",
      },
      { from: 11, to: 23, heading: "Familii, meșteșugari și așezări ale lui Iuda", teaching: "După Iabeț, genealogia revine la familii asociate cu localități, meșteșuguri și slujbe. Cronicarul păstrează nu doar conducători, ci și memoria unor comunități care au lucrat și au locuit în teritoriul lui Iuda.", source: n },
      { from: 24, to: 33, heading: "Seminția lui Simeon și cetățile ei", teaching: "Versetele enumeră descendenți ai lui Simeon și cetățile în care au locuit. Așezările sunt prezentate în legătură strânsă cu teritoriul lui Iuda, reflectând poziția istorică a seminției.", source: n },
      { from: 34, to: 43, heading: "Familiile lui Simeon caută pășuni și se extind", teaching: "Ultima parte descrie lideri de familie și migrații pentru găsirea pășunilor. Unele grupuri ajung până în zona Seirului, iar cronicarul le păstrează memoria până în vremea lui Ezechia.", source: n },
    ],
  },
  5: {
    number: 5,
    title: "Ruben, Gad și jumătate din Manase: genealogie, luptă și exil",
    summary: "Semințiile de la est de Iordan sunt urmărite prin genealogii și teritorii, dar capitolul leagă puterea lor militară de rugăciune și încheie cu necredincioșia care le conduce în exil.",
    units: [
      { from: 1, to: 10, heading: "Ruben pierde întâietatea, iar descendenții lui se așază spre răsărit", teaching: "Capitolul amintește că Ruben era întâiul născut, dar dreptul de întâietate a fost afectat de păcatul lui, în timp ce genealogia și așezările seminției continuă să fie păstrate. Lista urmărește conducători și teritorii până la războaiele purtate spre răsărit.", source: n },
      { from: 11, to: 17, heading: "Gad și familiile lui în Galaad și Basan", teaching: "Sunt enumerați capi de familie ai lui Gad și zonele în care locuiau. Genealogia este legată de registrele făcute în timpul unor regi ai lui Iuda și Israel, arătând interesul cronicarului pentru documentarea comunităților de dincolo de Iordan.", source: n },
      { from: 18, to: 22, heading: "Luptători numeroși strigă către Dumnezeu în război", teaching: "Ruben, Gad și jumătate din Manase sunt descriși printr-o armată bine pregătită. Totuși, explicația victoriei din text nu se oprește la echipare: în luptă strigă către Dumnezeu, iar ajutorul primit este legat de încrederea lor în El.", source: n },
      { from: 23, to: 26, heading: "Puterea nu împiedică apostazia și exilul", teaching: "Jumătatea seminției lui Manase este descrisă ca numeroasă și puternică, dar finalul capitolului spune că aceste seminții au fost necredincioase și au mers după dumnezeii popoarelor. Cronicarul leagă apoi deportarea lor de această ruptură de legământ.", source: n },
    ],
  },
  6: {
    number: 6,
    title: "Levi: linia preoțească, cântăreții și cetățile slujitorilor sanctuarului",
    summary: "Cel mai amplu capitol genealogic urmărește familiile lui Levi, linia marelui preot, cântăreții organizați pentru slujire și cetățile date leviților în mijlocul celorlalte seminții.",
    units: [
      { from: 1, to: 15, heading: "De la Levi la linia preoțească ce ajunge până la exil", teaching: "Capitolul începe cu fiii lui Levi și urmărește o linie preoțească prin Aaron și urmașii lui până la Iehoțadac, dus în exil. Genealogia leagă astfel slujirea sanctuarului de marile rupturi istorice ale poporului.", source: n },
      { from: 16, to: 30, heading: "Familiile lui Gherșom, Chehat și Merari", teaching: "Sunt enumerate cele trei mari ramuri levitice și descendenții lor. Lista pregătește explicația funcțiilor pe care membrii acestor familii le vor avea în organizarea cultului și a cântării.", source: n },
      { from: 31, to: 48, heading: "David așază cântăreți înaintea cortului", teaching: "După așezarea chivotului, David organizează slujirea prin cântare. Heman, Asaf și Etan sunt urmăriți genealogic, iar familiile lor apar în roluri distincte înaintea sanctuarului, în timp ce ceilalți leviți sunt puși la celelalte slujbe ale locașului.", source: n },
      { from: 49, to: 53, heading: "Aaron și fiii lui la altar și în Locul Preasfânt", teaching: "O secțiune scurtă delimitează responsabilitatea preoților urmași ai lui Aaron: arderea jertfelor și tămâiei și slujirea legată de ispășire. Genealogia acestei linii este reluată pentru a fixa responsabilitatea preoțească distinctă.", source: n },
      { from: 54, to: 81, heading: "Cetățile leviților răspândite printre seminții", teaching: "Finalul capitolului enumeră cetățile și pășunile date familiilor levitice în teritoriile diferitelor seminții. Levi nu apare concentrat într-un singur teritoriu, ci cu așezări răspândite în mijlocul lui Israel.", source: n },
    ],
  },
  7: {
    number: 7,
    title: "Genealogiile semințiilor nordice și memoria familiilor lor",
    summary: "Issahar, Beniamin, Neftali, Manase, Efraim și Așer sunt urmărite prin familii, conducători și numere de luptători. În genealogia lui Efraim apare și o scurtă poveste de pierdere înainte ca linia să ajungă la Iosua.",
    units: [
      { from: 1, to: 5, heading: "Issahar și oamenii numărați pentru război", teaching: "Descendenții lui Issahar sunt grupați pe familii și sunt legați de numărul oamenilor viteji disponibili în generațiile lor. Genealogia combină astfel identitatea de familie cu responsabilitatea publică a seminției.", source: n },
      { from: 6, to: 12, heading: "Beniamin și familiile lui", teaching: "Sunt prezentate ramuri beniamite și numărul oamenilor înregistrați ca viteji. Lista este mai scurtă decât genealogia beniamită din capitolul următor, care va concentra atenția asupra familiei lui Saul.", source: n },
      { from: 13, to: 19, heading: "Neftali și Manase", teaching: "Neftali este menționat pe scurt, apoi genealogia se extinde asupra lui Manase și a familiilor sale. Numele femeilor și relațiile de familie sunt păstrate alături de liniile masculine, oferind detalii pe care narațiunea regilor nu le urmărește de obicei.", source: n },
      { from: 20, to: 29, heading: "Efraim: o pierdere de familie, un fiu numit Beria și linia până la Iosua", teaching: "În mijlocul genealogiei lui Efraim este relatată moartea unor fii uciși de oamenii din Gat, jalea tatălui și nașterea unui copil numit într-un context de nenorocire. Lista continuă apoi până la Iosua și enumeră teritorii legate de seminție.", source: n },
      { from: 30, to: 40, heading: "Așer și capii familiilor sale", teaching: "Ultima secțiune urmărește familia lui Așer și încheie prin descrierea capilor de familie ca oameni aleși și viteji. Cronicarul păstrează atât relațiile genealogice, cât și dimensiunea comunitară și militară a seminției.", source: n },
    ],
  },
  8: {
    number: 8,
    title: "Beniamin și casa lui Saul înainte de relatarea morții regelui",
    summary: "Capitolul dezvoltă genealogia lui Beniamin și se încheie concentrându-se asupra familiei din Gabaon care ajunge la Chiș, Saul, Ionatan și urmașii lor.",
    units: [
      { from: 1, to: 28, heading: "Familiile lui Beniamin și așezările lor", teaching: "Cronicarul enumeră numeroase ramuri beniamite, capi de familie și localități. Lista pregătește trecerea de la identitatea seminției la familia concretă a primului împărat al Israelului.", source: n },
      { from: 29, to: 32, heading: "Familia din Gabaon", teaching: "Atenția se restrânge la tatăl Gabaonului, soția și fiii lui. Această familie formează cadrul genealogic imediat din care va fi introdusă casa lui Saul.", source: n },
      { from: 33, to: 40, heading: "De la Chiș și Saul la Ionatan și generațiile următoare", teaching: "Saul și fiii lui sunt așezați în genealogie înainte ca următorul capitol istoric să descrie moartea regelui. Linia lui Ionatan continuă prin Merib-Baal și urmașii lui, arătând că familia nu dispare din memorie odată cu sfârșitul domniei lui Saul.", source: n },
    ],
  },
  9: {
    number: 9,
    title: "Comunitatea de după exil: locuitori, preoți, leviți și păzitori ai porților",
    summary: "După genealogii, Cronici enumeră oamenii care locuiesc din nou în Ierusalim și responsabilitățile din jurul templului. Capitolul se încheie repetând genealogia lui Saul ca tranziție spre povestirea istorică.",
    units: [
      { from: 1, to: 9, heading: "Exilul este amintit, apoi sunt numiți cei întorși la Ierusalim", teaching: "Capitolul leagă deportarea de necredincioșie, apoi se mută spre cei care se așază din nou în cetățile lor și în Ierusalim. Sunt enumerați oameni din Iuda, Beniamin, Efraim și Manase, astfel încât revenirea este prezentată prin persoane și familii concrete.", source: n },
      { from: 10, to: 13, heading: "Preoții și responsabilitatea Casei lui Dumnezeu", teaching: "O listă de preoți îi identifică prin familii și îi descrie prin responsabilitatea slujirii în Casa lui Dumnezeu. Cronicarul acordă atenție restaurării instituțiilor de închinare odată cu restaurarea comunității.", source: n },
      { from: 14, to: 16, heading: "Leviții care locuiesc la Ierusalim", teaching: "Sunt numiți leviți din mai multe familii, continuând imaginea unei comunități în care slujirea templului este organizată prin oameni identificați și responsabilități transmise.", source: n },
      { from: 17, to: 27, heading: "Păzitorii porților și slujba lor de încredere", teaching: "Păzitorii porților sunt prezentați prin familii și posturi. Textul leagă această slujbă de generații anterioare și de responsabilitatea de a veghea intrările și încăperile Casei lui Dumnezeu.", source: n },
      { from: 28, to: 34, heading: "Vasele, făina, mirodeniile și cântarea", teaching: "Alți leviți primesc răspundere pentru vase, provizii, mirodenii și preparate, iar cântăreții sunt descriși ca dedicați slujbei lor. Detaliile fac vizibilă munca zilnică necesară pentru funcționarea închinării comunitare.", source: n },
      { from: 35, to: 44, heading: "Genealogia lui Saul pregătește capitolul morții lui", teaching: "Capitolul revine la familia din Gabaon și urmărește linia până la Saul și Ionatan. Repetiția genealogiei creează legătura directă dintre lunga introducere a cărții și prima narațiune istorică amplă din capitolul 10.", source: n },
    ],
  },
  10: {
    number: 10,
    title: "Moartea lui Saul încheie o domnie și deschide drumul spre David",
    summary: "Filistenii îl înving pe Israel pe muntele Ghilboa; Saul și fiii lui mor, iar trupurile sunt expuse și apoi recuperate de oamenii din Iabeș. Cronicarul încheie cu propria evaluare teologică a morții regelui.",
    units: [
      { from: 1, to: 7, heading: "Saul și fiii lui cad pe muntele Ghilboa", teaching: "Lupta se întoarce împotriva lui Israel, fiii lui Saul sunt uciși, iar regele este grav rănit. Saul îi cere purtătorului de arme să-l omoare, acesta refuză, iar Saul cade în propria sabie. Când oamenii din vale văd înfrângerea, își părăsesc cetățile.", source: n },
      { from: 8, to: 12, heading: "Filistenii expun trupurile, iar oamenii din Iabeș le recuperează", teaching: "Filistenii găsesc trupul lui Saul, îi iau armele și îi expun capul și trupurile ca simbol al victoriei. Oamenii din Iabeș-Galaad află ce s-a întâmplat, recuperează rămășițele și le îngroapă, apoi postesc șapte zile.", source: n },
      { from: 13, to: 14, heading: "Cronicarul explică sfârșitul lui Saul prin necredincioșie și lipsa căutării DOMNULUI", teaching: "Ultimele două versete nu lasă moartea lui Saul numai la nivel militar. Ele amintesc necredincioșia lui, abaterea de la cuvânt și consultarea unei chemătoare de morți, apoi spun că nu L-a căutat pe DOMNUL. Narațiunea trece de aici la transferul împărăției către David.", source: n },
    ],
  },
  11: {
    number: 11,
    title: "David este uns peste tot Israelul și Ierusalimul devine cetatea lui",
    summary: "Semințiile îl recunosc pe David la Hebron, Ierusalimul este cucerit, iar lista vitejilor arată comunitatea de oameni care i-au susținut domnia.",
    units: [
      { from: 1, to: 3, heading: "Tot Israelul îl recunoaște pe David la Hebron", teaching: "Oamenii vin la David și invocă rudenia, conducerea lui din trecut și cuvântul DOMNULUI despre păstorirea lui Israel. Bătrânii încheie legământ cu el la Hebron, iar David este uns împărat peste tot Israelul.", source: n },
      { from: 4, to: 9, heading: "Ierusalimul este cucerit și numit cetatea lui David", teaching: "David și Israel merg la Ierusalim, ocupat de iebusiți. După cucerire, cetatea devine centrul domniei, iar Ioab primește poziție de conducere pentru rolul lui în atac. Textul leagă creșterea lui David de faptul că DOMNUL oștirilor era cu el.", source: n },
      { from: 10, to: 14, heading: "Vitejii întăresc domnia lui David", teaching: "Lista vitejilor începe cu oameni cunoscuți pentru acte militare remarcabile. Cronicarul spune că acești oameni l-au sprijinit pe David împreună cu tot Israelul pentru a-l face împărat, conectând curajul lor cu consolidarea domniei.", source: n },
      { from: 15, to: 19, heading: "Trei viteji aduc apă din Betleem, iar David o varsă înaintea DOMNULUI", teaching: "Trei dintre viteji străpung tabăra filisteană pentru a aduce apa dorită de David. Regele refuză însă să o bea, considerând că ar însemna să consume simbolic sângele oamenilor care și-au riscat viața, și o varsă înaintea DOMNULUI.", source: n },
      { from: 20, to: 25, heading: "Abișai și Benaia între vitejii de seamă", teaching: "Abișai și Benaia sunt descriși prin fapte de curaj care i-au făcut cunoscuți între viteji. Benaia ajunge și responsabil peste garda personală a lui David, arătând legătura dintre credibilitatea câștigată și responsabilitatea primită.", source: n },
      { from: 26, to: 47, heading: "Lista vitejilor păstrează numele oamenilor din jurul tronului", teaching: "Capitolul se încheie cu o listă lungă de luptători din regiuni și familii diferite. Domnia lui David nu este prezentată ca lucrarea izolată a unui singur om, ci înconjurată de o comunitate de oameni ale căror nume sunt păstrate.", source: n },
    ],
  },
  12: {
    number: 12,
    title: "Oamenii se alătură lui David înainte și după recunoașterea publică a domniei lui",
    summary: "Războinici din mai multe seminții vin la David în vremea fugii și apoi la Hebron. Capitolul culminează cu o adunare mare care îl face împărat într-o atmosferă de unitate și bucurie.",
    units: [
      { from: 1, to: 7, heading: "Beniamiți și oameni pricepuți cu arcul vin la David la Țiclag", teaching: "Primii susținători enumerați vin în perioada în care David era încă restricționat din cauza lui Saul. Sunt descriși prin îndemânarea cu armele și provin chiar și din seminția lui Beniamin, casa din care venea Saul.", source: n },
      { from: 8, to: 15, heading: "Gadiți puternici trec Iordanul și se alătură lui David", teaching: "Oameni din Gad sunt descriși ca luptători experimentați care trec Iordanul și îi pun pe fugă pe cei din văi. Imaginea accentuează hotărârea și capacitatea militară a grupurilor care vin spre David în perioada formării domniei lui.", source: n },
      {
        from: 16, to: 18,
        heading: "Amasai recunoaște că Dumnezeu este cu David",
        teaching: "Poonen contrastează oamenii care se alipesc de David după succes cu cei care îl recunosc în vremea peșterii și a persecuției. Amasai declară pace și sprijin pentru că vede că Dumnezeul lui David îl ajută. Aplicația transcriptului este discernământul spiritual, dar aceasta nu devine permisiune pentru cultul personalității: criteriul nu este carisma sau popularitatea unui lider, ci rodul, adevărul și aprobarea lui Dumnezeu.",
        source: p("joined David when he was being persecuted ... Amasai ... your God helps you"),
        forYourHeart: "Nu confunda aprobarea mulțimii cu aprobarea lui Dumnezeu. Dar nici nu te lega de un om doar fiindcă se declară persecutat; cercetează adevărul și rodul.",
      },
      { from: 19, to: 22, heading: "Oameni din Manase se alătură lui David la Țiclag", teaching: "Când David se desprinde de contextul filistean, oameni din Manase vin la el și devin căpetenii în oaste. Textul descrie cum ajutorul primit crește până când tabăra lui devine foarte mare.", source: n },
      { from: 23, to: 40, heading: "Semințiile vin la Hebron cu inimă hotărâtă să-l facă împărat", teaching: "O listă amplă numără oamenii pregătiți de luptă veniți din semințiile lui Israel. Finalul subliniază unitatea de intenție și bucuria: oamenii stau cu David, aduc hrană din multe regiuni și participă la recunoașterea publică a domniei lui.", source: n },
    ],
  },
  13: {
    number: 13,
    title: "Un plan aprobat de mulți nu poate înlocui felul poruncit de Dumnezeu",
    summary: "David consultă liderii și adună poporul pentru a aduce chivotul, dar transportarea lui pe un car nou se termină prin moartea lui Uza. Chivotul rămâne apoi în casa lui Obed-Edom.",
    units: [
      {
        from: 1, to: 4,
        heading: "David își consultă conducătorii",
        teaching: "Poonen remarcă faptul că David se consultă cu căpeteniile și cu liderii, iar adunarea recunoaște împreună că planul este bun. Pentru el aceasta contrastează cu liderul care spune unilateral «am decis, voi executați». Consultarea nu transformă majoritatea în autoritate supremă și nu înlocuiește porunca lui Dumnezeu; chiar povestea chivotului arată că un consens bun poate folosi o metodă greșită dacă nu este cercetat Cuvântul.",
        source: p("David consulted ... every leader ... true godly man will not do things single-handedly"),
      },
      { from: 5, to: 8, heading: "Chivotul este pus pe un car nou în mijlocul unei mari sărbători", teaching: "Israel adună chivotul de la Chiriat-Iearim și îl pune pe un car nou, în timp ce David și poporul cântă și sărbătoresc. Bucuria și amploarea adunării nu elimină problema metodei folosite pentru transportul obiectului sfânt.", source: n },
      { from: 9, to: 14, heading: "Uza moare, David se teme, iar chivotul rămâne la Obed-Edom", teaching: "Când boii se poticnesc, Uza întinde mâna spre chivot și moare. David este tulburat și se teme să ducă imediat chivotul la el, astfel încât îl lasă în casa lui Obed-Edom timp de trei luni. Narațiunea va fi reluată în capitolul 15, unde transportul este reorganizat.", source: n },
    ],
  },
  14: {
    number: 14,
    title: "David este întărit ca împărat și întreabă de două ori înaintea luptei cu filistenii",
    summary: "Hiram îl ajută să-și construiască o casă, familia lui crește, iar două atacuri filistene primesc două răspunsuri tactice diferite după ce David Îl întreabă pe Dumnezeu.",
    units: [
      { from: 1, to: 2, heading: "David recunoaște că domnia lui este întărită pentru Israel", teaching: "Hiram din Tir trimite materiale și meșteri pentru casa lui David. Regele înțelege din stabilizarea domniei că DOMNUL l-a întărit ca împărat și că împărăția este înălțată pentru poporul Israel, nu doar pentru prestigiul lui personal.", source: n },
      { from: 3, to: 7, heading: "Familia lui David crește la Ierusalim", teaching: "Capitolul enumeră soții și copii ai lui David născuți la Ierusalim. Cronici notează această creștere familială fără a transforma toate alegerile matrimoniale ale regelui în norme pentru cititor.", source: n },
      { from: 8, to: 12, heading: "La primul atac, David întreabă și primește porunca să urce", teaching: "Când filistenii află că David a fost uns peste tot Israelul, pornesc împotriva lui. David Îl întreabă pe Dumnezeu dacă să urce și primește răspuns afirmativ; victoria este asociată cu intervenția lui Dumnezeu, iar idolii rămași sunt arși.", source: n },
      { from: 13, to: 17, heading: "La al doilea atac, David întreabă din nou și primește o strategie diferită", teaching: "Filistenii revin, iar David nu presupune că victoria precedentă îi dă automat aceeași strategie. El întreabă din nou și primește o altă direcție de mișcare. Narațiunea încheie spunând că faima lui se răspândește, iar frica de el ajunge peste neamuri.", source: n },
    ],
  },
  15: {
    number: 15,
    title: "Chivotul este adus din nou, de data aceasta prin leviți și cu o slujire organizată",
    summary: "David corectează transportarea chivotului, cheamă leviții să se sfințească și organizează cântăreții și păzitorii. Procesiunea ajunge la Ierusalim cu bucurie, în timp ce Mical îl privește pe David cu dispreț.",
    units: [
      { from: 1, to: 2, heading: "David recunoaște că leviții trebuie să poarte chivotul", teaching: "După eșecul capitolului 13, David pregătește locul pentru chivot și declară că nimeni în afară de leviți nu trebuie să-l poarte. Corectarea metodei apare explicit înainte de noua procesiune.", source: n },
      { from: 3, to: 15, heading: "Leviții sunt chemați, se sfințesc și poartă chivotul după poruncă", teaching: "David adună urmașii lui Aaron și familiile levitice, le amintește că prima încercare eșuase pentru că nu căutaseră pe Dumnezeu după rânduiala stabilită și le cere să se sfințească. Chivotul este apoi purtat pe umeri cu drugi, conform poruncii amintite de text.", source: n },
      { from: 16, to: 24, heading: "Cântăreți, instrumente și păzitori sunt organizați pentru procesiune", teaching: "Conducătorii leviților aleg cântăreți și instrumentiști, iar alte persoane primesc roluri de pază și conducere. Bucuria procesiunii este susținută de o organizare concretă a slujirii, nu doar de spontaneitate.", source: n },
      { from: 25, to: 29, heading: "Chivotul intră cu bucurie, iar Mical îl disprețuiește pe David", teaching: "David, bătrânii și conducătorii aduc chivotul din casa lui Obed-Edom, jertfesc și se bucură. În timp ce David dansează și cântă, Mical îl vede de la fereastră și îl disprețuiește în inima ei, iar această notă încheie procesiunea.", source: n },
    ],
  },
  16: {
    number: 16,
    title: "Chivotul este așezat, iar David organizează mulțumirea și slujirea continuă",
    summary: "După așezarea chivotului, poporul primește binecuvântare și hrană, leviții sunt rânduiți înaintea lui, iar o cântare extinsă cheamă Israelul și neamurile să vestească lucrările DOMNULUI.",
    units: [
      { from: 1, to: 6, heading: "Jertfe, binecuvântare și slujitori înaintea chivotului", teaching: "Chivotul este pus în cortul pregătit de David, sunt aduse jertfe, iar regele binecuvântează poporul și împarte hrană. Apoi sunt rânduiți leviți pentru pomenire, laudă și mulțumire înaintea chivotului.", source: n },
      { from: 7, to: 22, heading: "Cântarea amintește legământul și lucrările lui Dumnezeu", teaching: "Prima parte a cântării cheamă la mulțumire, proclamarea Numelui și căutarea DOMNULUI, apoi amintește legământul și ocrotirea oferită părinților în peregrinările lor. Memoria istorică devine material de închinare.", source: n },
      { from: 23, to: 36, heading: "Toate neamurile sunt chemate să audă slava DOMNULUI", teaching: "Cântarea se lărgește spre întregul pământ: neamurile sunt chemate să audă mântuirea și slava DOMNULUI, iar creația este invitată să se bucure înaintea Lui. Finalul cere izbăvire și adunare dintre neamuri și se încheie cu binecuvântare.", source: n },
      { from: 37, to: 43, heading: "Închinarea continuă prin oameni rânduiți pentru slujbe zilnice", teaching: "David lasă slujitori înaintea chivotului și păstrează în același timp slujirea de la locașul din Gabaon. Sunt menționați Asaf, Obed-Edom, Țadoc, preoții, cântăreții și jertfele regulate, după care poporul se întoarce acasă.", source: n },
    ],
  },
  17: {
    number: 17,
    title: "David vrea să-I zidească o casă lui Dumnezeu, dar Dumnezeu promite să-i zidească lui o casă",
    summary: "Planul lui David pentru templu primește un răspuns neașteptat: nu el va construi casa, iar Dumnezeu îi promite o dinastie și un urmaș care va zidi templul. David răspunde printr-o rugăciune de uimire și mulțumire.",
    units: [
      { from: 1, to: 6, heading: "Nathan aprobă inițial planul, apoi primește un alt cuvânt", teaching: "David îi spune lui Nathan că el locuiește într-o casă de cedru în timp ce chivotul stă sub un cort. Nathan îi răspunde inițial favorabil, dar în aceeași noapte Dumnezeu îi dă mesajul care schimbă direcția planului: David nu este cel care va zidi casa.", source: n },
      { from: 7, to: 15, heading: "Dumnezeu amintește ce a făcut pentru David și promite continuitatea casei lui", teaching: "Mesajul începe nu cu realizările lui David, ci cu ceea ce Dumnezeu a făcut: l-a luat de la oi, l-a însoțit și i-a dat un nume. Apoi promisiunea se mută spre viitor: un urmaș va zidi Casa, iar Dumnezeu va întări tronul și casa lui David.", source: n },
      { from: 16, to: 27, heading: "«Cine sunt eu?» — David răspunde promisiunii prin rugăciune", teaching: "David intră înaintea DOMNULUI și întreabă cine este el și casa lui pentru a fi aduși până aici. Rugăciunea recunoaște unicitatea lui Dumnezeu, izbăvirea lui Israel și cere ca promisiunea rostită să fie întărită, astfel încât Numele lui Dumnezeu să fie mărit.", source: n },
    ],
  },
  18: {
    number: 18,
    title: "Victoriile lui David, darurile dedicate și administrația împărăției",
    summary: "David învinge mai multe puteri vecine, primește tribut și dedică bogății DOMNULUI. Capitolul se încheie cu o imagine a conducerii lui: dreptate pentru popor și responsabilități împărțite între slujitori.",
    units: [
      { from: 1, to: 8, heading: "Filistenii, Moabul și puterile din nord sunt învinse", teaching: "Capitolul rezumă campanii împotriva filistenilor, Moabului, lui Hadarezer și sirienilor. Sunt enumerate teritorii, care și obiecte de aramă, iar textul repetă că DOMNUL îl ajuta pe David oriunde mergea.", source: n },
      { from: 9, to: 11, heading: "Darurile primite sunt dedicate DOMNULUI", teaching: "Când Tou află de înfrângerea lui Hadarezer, trimite daruri prin fiul său. David dedică DOMNULUI aceste daruri împreună cu argintul și aurul luate de la alte popoare, așezând câștigurile războiului în cadrul slujirii sale regale.", source: n },
      { from: 12, to: 13, heading: "Edomul este supus și ocupat", teaching: "Abișai este menționat în legătură cu victoria asupra edomiților, iar garnizoane sunt așezate în Edom. Textul repetă aceeași afirmație despre ajutorul DOMNULUI dat lui David în campaniile sale.", source: n },
      { from: 14, to: 17, heading: "David face dreptate, iar conducerea este împărțită între slujitori", teaching: "Rezumatul domniei spune că David făcea judecată și dreptate întregului popor. Apoi sunt numiți Ioab, Iehoșafat, Țadoc, Abimelec, Șavșa și alți slujitori, arătând structura administrativă din jurul regelui.", source: n },
    ],
  },
  19: {
    number: 19,
    title: "O intenție de bunătate este interpretată ca spionaj și declanșează război",
    summary: "David trimite soli să-l mângâie pe Hanun după moartea tatălui său, dar conducătorii amoniți îi umilesc. Amon cumpără ajutor sirian, iar conflictul se extinde până la înfrângerea coaliției.",
    units: [
      { from: 1, to: 5, heading: "Solii trimiși pentru mângâiere sunt umiliți", teaching: "David vrea să arate bunătate lui Hanun pentru relația avută cu tatăl lui, dar sfetnicii amoniți interpretează solia ca spionaj. Oamenii lui David sunt bărbieriți și li se taie hainele într-un gest de rușinare, iar regele îi lasă să stea la Ierihon până le crește barba.", source: n },
      { from: 6, to: 15, heading: "Amon angajează sirieni, iar Ioab împarte frontul cu Abișai", teaching: "Conștienți că l-au provocat pe David, amoniții cumpără sprijin militar sirian. Ioab găsește armate în față și în spate și împarte forțele cu Abișai, stabilind ca unul să-l ajute pe celălalt dacă frontul devine prea puternic. Sirienii fug, iar amoniții se retrag în cetate.", source: n },
      { from: 16, to: 19, heading: "Sirienii cheamă întăriri, dar sunt învinși și fac pace cu David", teaching: "După prima înfrângere, sirienii aduc forțe de dincolo de râu. David adună Israelul și îi învinge din nou, iar slujitorii lui Hadarezer fac pace și nu mai vor să ajute pe amoniți.", source: n },
    ],
  },
  20: {
    number: 20,
    title: "Raba este cucerită, iar războaiele cu filistenii continuă împotriva urmașilor uriașilor",
    summary: "Ioab conduce campania împotriva Rabei, iar David primește coroana și prada cetății. Finalul capitolului adună trei confruntări cu războinici filisteni de statură neobișnuită.",
    units: [
      { from: 1, to: 3, heading: "Ioab cucerește Raba, iar David preia coroana și prada", teaching: "La vremea ieșirii împăraților la război, Ioab conduce armata și cucerește Raba, în timp ce David rămâne la Ierusalim. Regele vine apoi, ia coroana și scoate pradă din cetate. Cronici relatează campania într-o formă concentrată.", source: n },
      { from: 4, to: 8, heading: "Trei lupte cu războinici filisteni din neamul uriașilor", teaching: "Ultimele versete enumeră lupte purtate de Sibecai, Elhanan și Ionatan împotriva unor războinici filisteni legați de neamul uriașilor. Lista încheie secțiunea de războaie prin numele oamenilor care au purtat aceste confruntări alături de casa lui David.", source: n },
    ],
  },
  21: {
    number: 21,
    title: "Recensământul lui David, urgia și altarul de pe aria lui Ornan",
    summary: "David poruncește numărarea poporului în ciuda împotrivirii lui Ioab. După recunoașterea păcatului vine o urgie, dar locul în care David vede îngerul, mijlocește și ridică un altar va deveni crucial pentru templu.",
    units: [
      { from: 1, to: 6, heading: "David poruncește recensământul, iar Ioab se împotrivește", teaching: "Textul introduce episodul spunând că Satana s-a ridicat împotriva lui Israel și l-a împins pe David spre numărare. Ioab întreabă de ce regele vrea să aducă vină asupra poporului, dar porunca regală prevalează; Levi și Beniamin nu sunt incluși în numărul final.", source: n },
      { from: 7, to: 13, heading: "David mărturisește păcatul și trebuie să aleagă între trei pedepse", teaching: "Dumnezeu este nemulțumit de faptă, iar David mărturisește că a păcătuit și a lucrat nebunește. Prorocul Gad îi aduce trei posibilități de judecată; David spune că preferă să cadă în mâna DOMNULUI, a Cărui îndurare este mare, decât în mâna oamenilor.", source: n },
      { from: 14, to: 17, heading: "Urgia lovește Israelul, iar David cere ca vina să cadă asupra lui", teaching: "O urgie lovește poporul, iar îngerul ajunge spre Ierusalim. David și bătrânii se smeresc, iar regele spune că el a poruncit numărarea și întreabă ce au făcut oile, cerând ca mâna să fie asupra lui și a casei lui, nu asupra poporului.", source: n },
      { from: 18, to: 27, heading: "David cumpără aria lui Ornan și ridică un altar", teaching: "Prin Gad, David primește porunca să ridice un altar pe aria lui Ornan. Deși proprietarul vrea să-i ofere locul și animalele, David insistă să plătească prețul, spunând că nu va aduce DOMNULUI ceva ce nu îl costă. Jertfa este primită, iar focul coboară peste altar.", source: n },
      { from: 28, to: 30, heading: "Locul răspunsului devine locul la care David continuă să aducă jertfe", teaching: "După ce vede că Dumnezeu îi răspunde pe aria lui Ornan, David continuă să jertfească acolo. Cortul și altarul vechi erau la Gabaon, dar frica produsă de sabia îngerului îl face să nu meargă acolo în acel moment; capitolul următor va identifica aria drept locul Casei DOMNULUI.", source: n },
    ],
  },
  22: {
    number: 22,
    title: "David pregătește lucrarea pe care nu el o va termina",
    summary: "Dumnezeu nu îi dă lui David sarcina construirii templului, dar David adună materiale, organizează lucrătorii și îl pregătește pe Solomon pentru responsabilitate.",
    units: [{
      from: 1,
      to: 19,
      heading: "Poți susține cu toată inima o slujire dată altuia",
      teaching: "Poonen revine la una dintre temele lui preferate din viața lui David: Dumnezeu îi spune că nu el va zidi casa, dar David nu se retrage ofensat. Pregătește fier, lemn, piatră, aur, argint și oameni pentru ca Solomon să poată lucra. Lecția transcriptului este generozitatea față de o lucrare care nu îți va purta numele. David îi spune apoi generației următoare să-și pună inima și sufletul în căutarea DOMNULUI.",
      source: p("chapter 22 ... not going to build the house ... made all the preparation ... set your heart and soul"),
      forYourHeart: "Poți lucra cu bucurie pentru ceva ce altcineva va inaugura? Împărăția lui Dumnezeu este mai mare decât dreptul nostru de a primi creditul final.",
    }],
  },
  23: {
    number: 23,
    title: "Leviții sunt numărați și organizați pentru slujirea unei Case stabile",
    summary: "La bătrânețe, David îl face pe Solomon împărat și organizează leviții. Pentru că chivotul și sanctuarul vor avea un loc stabil, o parte din sarcinile de transport sunt înlocuite de slujbe permanente de ajutor, pază și laudă.",
    units: [
      { from: 1, to: 5, heading: "David îl pune pe Solomon împărat și numără leviții pentru mai multe slujbe", teaching: "Capitolul începe cu Solomon așezat ca împărat și cu adunarea conducătorilor și leviților. Numărul leviților este împărțit între slujirea Casei, dregători și judecători, păzitori și oameni dedicați laudei prin instrumente pregătite de David.", source: n },
      { from: 6, to: 23, heading: "Familiile lui Gherșom, Chehat și Merari sunt împărțite pe case părintești", teaching: "David organizează leviții potrivit celor trei mari ramuri și enumeră familiile lor. Numele fixează structura prin care slujirea va fi distribuită în generația templului.", source: n },
      { from: 24, to: 32, heading: "Odată cu odihna chivotului, leviții primesc responsabilități adaptate templului", teaching: "David explică faptul că DOMNUL a dat odihnă poporului și că chivotul nu va mai trebui purtat din loc în loc. Leviții sunt rânduiți să-i ajute pe urmașii lui Aaron, să îngrijească curțile și obiectele, să participe la curățire și să stea dimineața și seara pentru laudă și mulțumire.", source: n },
    ],
  },
  24: {
    number: 24,
    title: "Douăzeci și patru de cete preoțești și împărțirea slujirii prin sorți",
    summary: "Urmașii lui Aaron sunt organizați în cete pentru slujirea sanctuarului, iar apoi sunt împărțite și celelalte familii levitice. Tragerea la sorți distribuie ordinea fără a transforma rangul familiei în privilegiu arbitrar.",
    units: [
      { from: 1, to: 5, heading: "Urmașii lui Eleazar și Itamar sunt organizați pentru slujbă", teaching: "După amintirea morții lui Nadab și Abihu fără fii, linia preoțească continuă prin Eleazar și Itamar. Țadoc și Ahimelec îi ajută pe David să împartă familiile, iar numărul mai mare de capi din linia lui Eleazar este reflectat în cete.", source: n },
      { from: 6, to: 19, heading: "Sorții stabilesc ordinea celor douăzeci și patru de cete", teaching: "Un levit consemnează numele în prezența regelui și conducătorilor, iar ordinea cetelor este stabilită prin sorți. Textul enumeră toate cele douăzeci și patru de poziții și spune că aceasta era rânduiala intrării lor în Casa DOMNULUI.", source: n },
      { from: 20, to: 31, heading: "Și celelalte familii levitice primesc ordinea lor", teaching: "Ultima parte enumeră alte ramuri levitice și capii lor, apoi spune că și aceștia au tras la sorți înaintea lui David, a lui Țadoc și a conducătorilor. Organizarea cultului este astfel distribuită prin familii și responsabilități definite.", source: n },
    ],
  },
  25: {
    number: 25,
    title: "Cântăreții sunt organizați pentru slujire, instruire și prorocie prin muzică",
    summary: "David și căpeteniile oștirii separă familiile lui Asaf, Heman și Iedutun pentru slujire muzicală. Oamenii sunt instruiți, iar douăzeci și patru de grupe primesc ordinea prin sorți.",
    units: [
      { from: 1, to: 7, heading: "Asaf, Heman și Iedutun slujesc prin cântare și instrumente", teaching: "Capitolul leagă muzica de slujire înaintea lui Dumnezeu și folosește limbajul prorociei pentru activitatea familiilor lui Asaf, Heman și Iedutun. Sunt enumerați fiii lor, iar totalul celor instruiți și pricepuți pentru cântare este de două sute optzeci și opt.", source: n },
      { from: 8, to: 31, heading: "Douăzeci și patru de grupe primesc ordinea prin sorți", teaching: "Cei mici și cei mari, învățătorii și ucenicii sunt incluși în tragerea la sorți. Versetele enumeră pe rând cele douăzeci și patru de grupe, fiecare asociată cu doisprezece oameni, stabilind o rotație organizată a slujirii muzicale.", source: n },
    ],
  },
  26: {
    number: 26,
    title: "Păzitorii porților, vistieriile și dregătorii leviți",
    summary: "Organizarea templului continuă cu păzitorii intrărilor și administrarea comorilor, apoi se extinde la leviți puși în slujbe administrative și judiciare în afara sanctuarului.",
    units: [
      { from: 1, to: 19, heading: "Familiile păzitorilor primesc porțile prin sorți", teaching: "Sunt enumerate familiile lui Core și Merari care asigură paza, cu observații despre puterea și priceperea unor membri. Sorții distribuie porțile de răsărit, nord, sud și apus, precum și alte puncte de acces ale complexului.", source: n },
      { from: 20, to: 28, heading: "Vistieriile păstrează darurile și lucrurile închinate", teaching: "O altă ramură levitică primește răspunderea vistieriilor Casei și a lucrurilor închinate din războaie și daruri. Sunt amintiți Samuel, Saul, Abner, Ioab și alții prin bunurile dedicate pentru întreținerea Casei DOMNULUI.", source: n },
      { from: 29, to: 32, heading: "Leviți sunt puși peste treburi administrative și judecată", teaching: "Finalul capitolului îi așază pe unii leviți în afara activității templului propriu-zis, ca dregători și judecători pentru treburile lui Israel. Responsabilitatea se extinde astfel de la poarta sanctuarului la administrarea comunității.", source: n },
    ],
  },
  27: {
    number: 27,
    title: "Armata, semințiile și averea regală sunt administrate prin responsabilități distribuite",
    summary: "Ultimul capitol de organizare înaintea discursului lui David prezintă cetele militare lunare, conducătorii semințiilor, administratorii proprietăților regelui și sfetnicii apropiați.",
    units: [
      { from: 1, to: 15, heading: "Douăsprezece cete militare slujesc pe rând câte o lună", teaching: "Armata este organizată în douăsprezece divizii, fiecare cu douăzeci și patru de mii de oameni și un conducător pentru o lună din an. Lista stabilește o rotație anuală în locul unei mobilizări permanente a întregii forțe.", source: n },
      { from: 16, to: 24, heading: "Conducătorii semințiilor și recensământul rămas neterminat", teaching: "Sunt numiți responsabili pentru mai multe seminții, apoi cronicarul revine la problema numărării poporului. David nu îi numărase pe cei mai tineri, iar Ioab nu terminase recensământul deoarece mânia venise peste Israel din cauza lui.", source: n },
      { from: 25, to: 31, heading: "Câmpurile, viile, turmele și depozitele regelui au administratori distincti", teaching: "Proprietățile regale sunt împărțite între oameni responsabili de comori, ogoare, vii, măslini, vite, cămile și turme. Detaliile arată infrastructura economică din spatele curții lui David.", source: n },
      { from: 32, to: 34, heading: "Sfetnicii și oamenii apropiați încheie lista conducerii", teaching: "Capitolul se încheie cu oameni care aveau roluri de sfat, educație și comandă, între care Ionatan, Ahitofel, Hușai, Iehoiada, Abiatar și Ioab. Organizarea împărăției este prezentată ca o rețea de responsabilități, nu ca activitatea singulară a regelui.", source: n },
    ],
  },
  28: {
    number: 28,
    title: "David îi încredințează lui Solomon planul și responsabilitatea",
    summary: "Înaintea conducătorilor, David explică alegerea lui Solomon și îi transmite planurile pentru templu și organizarea slujirii.",
    units: [{
      from: 1,
      to: 21,
      heading: "Chemarea altuia nu este o pierdere pentru tine",
      teaching: "Poonen citește capitolul 28 în continuitate cu pregătirea lui David: regele spune public că Dumnezeu l-a ales pe Solomon pentru lucrarea pe care el însuși ar fi dorit să o facă. David transferă planuri, resurse și încurajare. Accentul rămâne pe disponibilitatea de a pregăti următorul slujitor, nu pe păstrarea controlului până la moarte.",
      source: p("chapter 28 ... he chose my son Solomon ... I prepared all these things"),
    }],
  },
  29: {
    number: 29,
    title: "David dă din averea lui și recunoaște că totul vine de la Dumnezeu",
    summary: "David oferă din propriile comori pentru templu, poporul dă de bunăvoie, iar rugăciunea lui recunoaște că bogăția, puterea și chiar darurile aduse vin din mâna lui Dumnezeu.",
    units: [
      {
        from: 1, to: 9,
        heading: "Afecțiunea pentru casa lui Dumnezeu se vede și în ceea ce ești gata să dai",
        teaching: "Transcriptul leagă capitolul 29 de pregătirile lui David și de faptul că el nu cere poporului ceva ce refuză să facă personal. Dă din propriile comori și apoi îi vede pe conducători oferind de bunăvoie. Generozitatea nu cumpără favoarea lui Dumnezeu; ea arată unde este așezată inima.",
        source: p("chapter 29 ... gave such a lot of gold and silver and bronze"),
      },
      {
        from: 10,
        to: 30,
        heading: "«Din mâna Ta am primit și din mâna Ta Îți dăm»",
        teaching: "Rugăciunea finală a lui David pune limita oricărei mândrii în dărnicie: ceea ce poporul aduce îi aparține deja lui Dumnezeu. Cronici încheie viața lui David nu prin templul construit de el, ci printr-o generație pregătită și prin recunoașterea stăpânirii lui Dumnezeu.",
        source: p("David ... temple ... prepared ... before he died"),
        forYourHeart: "Când dai timp, bani sau muncă, amintește-ți că nu Îl faci dator pe Dumnezeu. Întorci din ceea ce ai primit deja.",
      },
    ],
  },
}

const CRONICI1_OVERLAY: ExplainedBookOverlay = {
  bookId: "1-cronici",
  bibleEmanusBookId: "1CH",
  name: "1 Cronici",
  testament: "vt",
  order: 13,
  transcript,
  status: "in_review",
  coverageMode: "transcript-focused",
  chapters: transcriptFocusedChapters("1 Cronici", 29, focused),
}

export const CRONICI1_EXPLAINED = assertCompleteOverlay(CRONICI1_OVERLAY, 29)
