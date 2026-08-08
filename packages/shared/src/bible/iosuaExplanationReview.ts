import type { BibleChapter, BibleUnit } from "./types.js"

const REVIEW_SOURCE =
  "Emanus canonical exegesis — Iosua + Geneza 15; Deuteronom 9; canonical cross-references; legacy editorial source retained internally where supported"

function replaceUnit(chapter: BibleChapter, unitId: string, patch: Partial<BibleUnit>): BibleChapter {
  return {
    ...chapter,
    units: chapter.units.map((unit) => (unit.id === unitId ? { ...unit, ...patch } : unit)),
  }
}

function reviewChapter6(chapter: BibleChapter): BibleChapter {
  let reviewed: BibleChapter = {
    ...chapter,
    summary:
      "DOMNUL anunță că Ierihonul este dat în mâna lui Iosua înainte ca zidul să cadă. Israel urmează rânduiala primită, cetatea cade, Rahab și casa ei sunt cruțate potrivit jurământului, iar lucrurile puse deoparte nu trebuie luate pentru câștig personal. Capitolul conține și judecata severă asupra locuitorilor Ierihonului; explicația creștină poate folosi tipologic lupta împotriva păcatului, dar nu transformă această campanie unică din istoria legământului într-o autorizație pentru violență religioasă astăzi.",
    literaryContext:
      "Iosua 6 vine după trecerea Iordanului, circumcizie, Paște și întâlnirea lui Iosua cu Căpetenia oștirii DOMNULUI. Narațiunea pune inițiativa la Dumnezeu: Iosua nu inventează strategia și nu-L cheamă pe Dumnezeu să binecuvânteze un plan deja făcut. O lectură creștină tradițională a folosit cucerirea Canaanului ca imagine a luptei împotriva păcatului; această tipologie poate sluji pastoral numai dacă rămâne distinctă de sensul istoric al războiului relatat.",
    historicalContext:
      "Narațiunea prezintă Ierihonul în cadrul judecății asupra Canaanului și al promisiunii țării. Geneza 15:16 subliniază că judecata amoriților este amânată timp de generații; Deuteronom 9:4–6 spune explicit că Israel nu primește țara datorită propriei dreptăți, ci în legătură cu răutatea popoarelor și cu promisiunea făcută patriarhilor. Rahab arată în chiar relatarea Ierihonului că hotarul nu este o teorie a superiorității etnice: o canaanită care se alipește de Dumnezeul lui Israel este cruțată și intră în popor. Mai târziu, Israel și Iuda sunt judecate și scoase din țară pentru propriile lor păcate. Aceste observații explică felul în care canonul însuși încadrează războiul; ele nu fac moartea oamenilor ușoară și nu oferă bisericii un mandat modern de a reproduce campania.",
  }

  reviewed = replaceUnit(reviewed, "iosua-6-1-5", {
    heading: "«Am dat Ierihonul în mâna ta» — inițiativa și promisiunea sunt ale DOMNULUI",
    teaching: [
      "Ierihonul este închis, zidul este încă în picioare, iar DOMNUL vorbește despre cetate ca fiind deja dată în mâna lui Iosua. În sensul imediat, aceasta este promisiunea lui Dumnezeu pentru o bătălie precisă din cucerirea Canaanului. Nu este o formulă prin care orice credincios poate declara dinainte că orice proiect sau conflict personal îi este garantat.",
      "Israel trebuie totuși să urmeze rânduiala primită. Promisiunea nu produce pasivitate, iar ascultarea nu este prezentată ca tehnică magică pentru dărâmarea zidurilor; inițiativa, porunca și rezultatul sunt atribuite DOMNULUI.",
      "În lectura creștină, victoria lui Hristos asupra păcatului și a puterilor răului poate oferi o aplicație tipologică: credinciosul luptă din temeiul lucrării deja împlinite de Hristos. Dar aceasta este o aplicație canonică, nu sensul lexical al expresiei «am dat Ierihonul» și nici dovada că Canaanul ar însemna în mod direct «viața creștină biruitoare» în fiecare detaliu.",
      "Noul Testament mută conflictul bisericii departe de cucerirea oamenilor: lupta nu este împotriva cărnii și sângelui, iar chemarea la omorârea păcatului este îndreptată spre faptele firii din noi. Tocmai aceasta este limita necesară a oricărei tipologii de război spiritual.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: REVIEW_SOURCE,
    crossRefs: ["Coloseni 2:13-15", "Romani 8:13", "Galateni 5:24", "Efeseni 6:10-18"],
    forYourHeart:
      "Nu transforma o promisiune dată lui Iosua pentru Ierihon într-o garanție pentru orice plan al tău. În lupta cu păcatul, pornește de la lucrarea lui Hristos și ascultă de ceea ce Scriptura îți cere cu adevărat.",
  })

  reviewed = replaceUnit(reviewed, "iosua-6-6-14", {
    heading: "Trâmbițele și marșul sunt ascultare în această narațiune, nu o formulă spirituală",
    teaching: [
      "Preoții, chivotul, trâmbițele și poporul urmează zi după zi ordinea primită. Narațiunea nu explică trâmbițele ca mecanism prin care sunetul produce căderea zidului. Ele fac parte din rânduiala poruncită de Dumnezeu.",
      "O aplicație creștină poate lega mărturisirea credinței de texte precum Apocalipsa 12:11, dar nu trebuie să transforme trâmbițele din Iosua într-o tehnică universală prin care anumite cuvinte obligă lumea spirituală să răspundă. Fapte 19 avertizează tocmai împotriva folosirii Numelui lui Isus ca formulă desprinsă de o viață supusă Lui.",
      "Iacov 4:7 păstrează ordinea sănătoasă: supunere față de Dumnezeu și împotrivire față de diavol. Cuvintele corecte nu înlocuiesc ascultarea, iar ritualul exterior nu poate compensa o conștiință care refuză adevărul.",
      "Cele șase zile în care nimic vizibil nu se schimbă arată cel puțin răbdarea ascultării: Israel nu primește libertatea de a inventa o cale mai rapidă. Nu deducem însă o lege că Dumnezeu va face întotdeauna omul să repete o acțiune un număr fix de zile înainte de intervenție.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: REVIEW_SOURCE,
    crossRefs: ["Apocalipsa 12:11", "Iacov 4:7", "Fapte 19:13-16"],
    forYourHeart:
      "Credința nu este o parolă spusă corect. Întreabă mai întâi dacă viața ta este supusă lui Dumnezeu, nu dacă ai găsit formula potrivită.",
  })

  reviewed = replaceUnit(reviewed, "iosua-6-15-21", {
    heading: "Căderea Ierihonului și judecata pe care explicația nu trebuie nici s-o ascundă, nici s-o transforme în mandat modern",
    teaching: [
      "În ziua a șaptea, zidul cade, iar textul spune fără ocol că cetatea este pusă sub `herem`, iar oameni și animale sunt loviți cu sabia. Nu cosmetizăm scena și nu înlocuim moartea oamenilor cu o metaforă spirituală.",
      "Canonul oferă câteva limite importante pentru înțelegerea acestei judecăți. Geneza 15:16 prezintă o judecată amânată timp de generații. Deuteronom 9:4–6 interzice Israelului să concluzioneze că primește țara pentru propria lui dreptate. Rahab este cruțată în același capitol, iar mai târziu Israel și Iuda sunt ele însele judecate și exilate. Așadar textul nu susține o doctrină a superiorității etnice a Israelului.",
      "Unele predici au folosit analogia unei intervenții chirurgicale care oprește răspândirea gangrenei. O asemenea imagine poate încerca să descrie caracterul judiciar al episodului, dar nu este argumentul textului și nu rezolvă de una singură toate întrebările morale ridicate de moartea copiilor și a celorlalți locuitori. Emanus nu o folosește ca scurtătură care transformă o scenă grea într-una simplă.",
      "Pentru biserică, Efeseni 6:12 stabilește o limită decisivă: lupta creștină nu este împotriva cărnii și sângelui. Romani 12 poruncește să nu ne răzbunăm și să biruim răul prin bine. De aceea Iosua 6 nu poate fi folosit drept autorizație pentru război religios, persecuție sau violență împotriva adversarilor creștinului.",
      "Tipologic, severitatea episodului poate chema cititorul să nu facă pace cu păcatul din sine. Dar chiar această aplicație trebuie întoarsă spre propria pocăință, nu spre etichetarea altor oameni drept «canaaniți» care trebuie eliminați.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: REVIEW_SOURCE,
    crossRefs: ["Geneza 15:16", "Deuteronom 9:4-6", "Iosua 6:22-25", "2 Împărați 17:7-23", "Efeseni 6:12", "Romani 12:17-21"],
    forYourHeart:
      "Lasă severitatea textului să te cheme la pocăință, nu să-ți dea un nume religios pentru ura față de oameni. Vrăjmașul pe care Noul Testament îți cere să-l iubești nu devine un «Ierihon» de distrus.",
  })

  return reviewed
}

function reviewChapter7(chapter: BibleChapter): BibleChapter {
  let reviewed: BibleChapter = {
    ...chapter,
    summary:
      "Acan ia din lucrurile puse sub `herem`, iar narațiunea descrie încălcarea ca păcat al lui Israel în cadrul solidarității legământului. După înfrângerea de la Ai, DOMNUL cere îndepărtarea lucrului interzis, Acan este identificat și mărturisește ce a luat. Finalul, în care Acan, bunurile și casa lui sunt aduse în Valea Acor și urmează pedeapsa, este unul dintre pasajele dificile ale cărții: explicația nu presupune fără text nici inocența, nici complicitatea membrilor familiei și nu transformă episodul într-o regulă de pedeapsă colectivă pentru comunitățile moderne.",
    literaryContext:
      "După Ierihon, capitolul arată că promisiunea țării nu înseamnă că Israel poate ignora porunca legământului. Contrastul cu Ai este construit explicit de narator prin încălcarea lucrurilor puse sub `herem`. Solidaritatea corporativă este reală în poveste, dar trebuie explicată în cadrul legământului lui Israel, nu transformată automat în afirmația că Dumnezeu pedepsește astăzi orice comunitate pentru păcatul secret al unei singure persoane.",
  }

  reviewed = replaceUnit(reviewed, "iosua-7-1-5", {
    heading: "Un om ia lucrul interzis, iar narațiunea vorbește despre încălcarea lui Israel",
    teaching: [
      "Versetul 1 începe la plural — «fiii lui Israel au încălcat» — și apoi îl numește pe Acan ca omul care a luat din lucrurile puse sub `herem`. Acesta este limbajul solidarității de legământ: fapta unui membru este tratată ca o încălcare care afectează tabăra.",
      "Această structură nu autorizează însă ideea că orice nenorocire suferită de o biserică, familie sau națiune trebuie explicată prin existența unui «Acan ascuns». Scriptura însăși respinge formulele simpliste care deduc păcatul secret din orice suferință, iar Iosua 7 relatează un caz în care Dumnezeu dezvăluie explicit cauza.",
      "Iscoadele subestimează Aiul și recomandă o forță mică. Textul nu spune explicit că păcatul lor a fost faptul că nu s-au rugat din nou; problema revelată de Dumnezeu este încălcarea lucrului pus deoparte. Putem observa încrederea omenească a raportului, dar nu o transformăm în cauza pe care naratorul nu o numește.",
      "Treizeci și șase de oameni mor, iar curajul poporului se topește. Capitolul refuză ideea că păcatul este complet privat; în același timp, nu ne permite să identificăm vina personală a fiecăruia care a suferit consecințele.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: REVIEW_SOURCE,
    crossRefs: ["Iosua 6:17-19", "Ezechiel 18:20", "Ioan 9:1-3", "1 Corinteni 12:26"],
    forYourHeart:
      "Păcatul tău poate răni oameni care nu l-au ales. Dar nu folosi asta ca să explici automat suferința altuia printr-un păcat ascuns pe care doar îl bănuiești.",
  })

  reviewed = replaceUnit(reviewed, "iosua-7-6-15", {
    heading: "Rugăciunea lui Iosua primește un răspuns precis: există o încălcare care trebuie scoasă la lumină",
    teaching: [
      "Iosua și bătrânii se smeresc înaintea chivotului, iar Iosua întreabă de ce a fost trecut Iordanul dacă poporul urma să fie dat în mâna amoriților. Dumnezeu nu îi condamnă rugăciunea ca atare, dar îi spune să se ridice deoarece există o problemă concretă care cere acțiune.",
      "Răspunsul numește mai multe aspecte ale faptei: au încălcat legământul, au luat din lucrurile puse sub `herem`, au furat, au mințit și au pus obiectele între bunurile lor. Criza nu se rezolvă prin intensificarea emoției religioase în timp ce lucrul interzis rămâne ascuns.",
      "Procesul de identificare merge de la popor la seminție, familie, casă și om. Textul nu ne spune că acest ritm a fost creat special pentru a-i oferi lui Acan mai multe ocazii de mărturisire, deși el ar fi putut mărturisi înainte să fie indicat. Nu transformăm o posibilă intenție pastorală într-un fapt narativ.",
      "Într-o comunitate modernă, acest episod nu autorizează vânătoarea de vinovați prin sorți sau presupunerea că un lider poate reproduce procedura lui Iosua. Metoda aparține unei revelații și unei ordini de legământ precise.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: REVIEW_SOURCE,
    crossRefs: ["Iosua 7:10-15", "Proverbe 28:13", "1 Ioan 1:8-9"],
    forYourHeart:
      "Rugăciunea nu este refugiu împotriva adevărului. Dacă Dumnezeu ți-a făcut limpede ce trebuie mărturisit și îndreptat, încă o oră de cuvinte nu înlocuiește pasul de ascultare.",
  })

  reviewed = replaceUnit(reviewed, "iosua-7-16-26", {
    heading: "Acan mărturisește; finalul cu familia lui trebuie lăsat la greutatea și limitele textului",
    teaching: [
      "Acan este identificat și Iosua îi cere să dea slavă DOMNULUI și să spună ce a făcut. El mărturisește succesiunea: a văzut, a poftit, a luat și a ascuns. Obiectele sunt găsite exact unde spune. Nu este nevoie să numim mărturisirea «pocăință sinceră» în sens deplin; textul consemnează adevărul spus după identificare, nu descrie în detaliu starea inimii lui.",
      "Finalul este dificil. Iosua 7 spune că Acan, fiii și fiicele lui, animalele, cortul și tot ce avea sunt aduse în vale, apoi folosește forme de plural pentru lapidare și ardere. Textul nu explică dacă membrii familiei știau de obiectele ascunse sub cort și nu spune explicit că fiecare era complice. De aceea nu afirmăm nici că erau cu siguranță inocenți, nici că erau cu siguranță vinovați.",
      "Deuteronom 24:16 spune că părinții nu trebuie omorâți pentru copii și copiii nu trebuie omorâți pentru părinți; fiecare să moară pentru propriul păcat. Această regulă face cu atât mai important să nu inventăm o doctrină simplă de «vină ereditară» din Iosua 7. Relația exactă dintre cele două texte și rolul familiei lui Acan rămâne o întrebare interpretativă reală.",
      "Ceea ce capitolul afirmă fără ambiguitate este că Acan a încălcat porunca, că lucrul ascuns a adus consecințe comunitare și că judecata marchează gravitatea încălcării la începutul cuceririi. Nu folosim scena pentru a legitima pedepsirea copiilor sau rudelor unui vinovat în biserică ori în societatea modernă.",
      "Valea primește numele Acor, legat de rădăcina pentru «tulburare». Osea 2:15 va transforma tocmai Valea Acor într-o «ușă a speranței», arătând că în canon locul judecății nu este ultimul cuvânt asupra poporului.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: REVIEW_SOURCE,
    crossRefs: ["Deuteronom 24:16", "Ezechiel 18:20", "Osea 2:15"],
    forYourHeart:
      "Mărturisește înainte ca ceea ce ascunzi să rănească și mai mult. Dar când judeci păcatul altuia, nu pune pe rudele lui o vină pe care Scriptura nu ți-a dat dreptul s-o atribui.",
  })

  return reviewed
}

function reviewChapter10(chapter: BibleChapter): BibleChapter {
  let reviewed: BibleChapter = {
    ...chapter,
    literaryContext:
      "Capitolul 10 continuă direct jurământul față de Gabaon din capitolul 9. Când gabaoniții sunt atacați, Israel îi apără chiar dacă jurământul fusese obținut prin înșelăciune. Narațiunea leagă campania din sud de fidelitatea față de jurământ și de promisiunea lui Dumnezeu pentru cucerire. O aplicație creștină despre lupta împotriva păcatului rămâne tipologică; războiul fizic din text nu devine model pentru relația bisericii cu adversarii ei.",
    historicalContext:
      "Capitolul descrie o coaliție de regi și o campanie militară severă. Relatarea despre soare și lună afirmă că ziua luptei a fost prelungită într-un mod extraordinar; pasajul nu explică mecanismul fizic, de aceea Emanus nu alege o teorie astronomică și nu folosește legende moderne despre o «zi pierdută» ca dovadă. Limbajul de victorie totală din acest capitol trebuie citit împreună cu capitolele următoare, care încă enumeră teritorii și populații rămase; rezumatele de campanie nu trebuie transformate într-o afirmație că fiecare canaanit din sud dispăruse deja din țară.",
  }

  reviewed = replaceUnit(reviewed, "iosua-10-16-27", {
    heading: "Regii învinși sub picioare: gest militar antic, nu scenariu pentru tratarea adversarilor creștinului",
    teaching: [
      "Cei cinci regi se ascund în peșteră, sunt ținuți acolo până la încheierea urmăririi și apoi sunt aduși înaintea oștirii. Căpeteniile pun picioarele pe grumazurile lor, un gest public de înfrângere și supunere, iar Iosua îl folosește pentru a întări curajul oamenilor înaintea campaniilor următoare.",
      "Narațiunea continuă cu execuția regilor și expunerea trupurilor până seara. Nu spiritualizăm scena ca să facem să dispară violența istorică și nu o imităm în relațiile moderne.",
      "O lectură tipologică poate muta imaginea spre supunerea păcatului și a puterilor răului sub domnia lui Hristos. Dar Efeseni 6:12 precizează că lupta bisericii nu este împotriva cărnii și sângelui, iar Romani 12 cere binecuvântare, lipsă de răzbunare și biruirea răului prin bine.",
      "Așadar expresii precum «pune vrăjmașul sub picioare» trebuie aplicate cu mare grijă. Creștinul nu primește din acest gest permisiunea de a umili, domina sau răni persoana care i se opune. Aplicarea sigură privește păcatul, răul și supunerea finală a tuturor puterilor lui Hristos.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: REVIEW_SOURCE,
    crossRefs: ["Efeseni 6:12", "Romani 8:13", "Romani 12:17-21", "1 Corinteni 15:24-28"],
    forYourHeart:
      "Este ușor să citești un text de biruință și să te gândești la oamenii pe care ai vrea să-i vezi înfrânți. Noul Testament întoarce mai întâi lupta spre păcatul din tine și spre răul pe care trebuie să-l biruiești fără să urăști omul.",
  })

  reviewed = replaceUnit(reviewed, "iosua-10-28-43", {
    heading: "Campania din sud este judecată în narațiune, dar nu o teorie a superiorității etnice și nu un mandat pentru biserică",
    teaching: [
      "Finalul capitolului trece printr-o succesiune rapidă de cetăți, regi și execuții. Formulele «n-a lăsat să scape pe nimeni» și «a nimicit tot ce avea suflare» trebuie lăsate la severitatea lor; explicația nu înlocuiește oamenii uciși cu simple simboluri ale păcatului.",
      "În același timp, canonul refuză o lectură etnică triumfalistă. Deuteronom 9:4–6 spune că Israel nu primește țara datorită dreptății sale. Mai târziu, Israel și Iuda sunt ele însele judecate și exilate. Rahab și gabaoniții arată deja că relația cu Dumnezeul lui Israel și cu legământul poate traversa originea etnică.",
      "Capitolele următoare încă vorbesc despre pământ rămas de luat și despre populații care nu au fost izgonite. De aceea rezumatul militar al lui Iosua 10 nu trebuie citit ca o statistică demografică exhaustivă despre fiecare locuitor al Canaanului după această campanie.",
      "O analogie medicală despre amputarea unui țesut bolnav poate fi folosită omiletic pentru a descrie ideea de judecată, dar nu este justificarea oferită explicit de text și nu trebuie folosită pentru a face moral ușoară moartea oamenilor. Argumentele canonice sigure sunt întârzierea judecății din Geneza 15, avertismentul din Deuteronom 9 și faptul că Dumnezeu judecă ulterior și Israelul.",
      "Aplicarea pentru biserică nu este cucerirea adversarilor. Noul Testament poruncește omorârea faptelor trupului, lupta spirituală și iubirea vrăjmașilor. A transforma campania din sud într-un model de violență religioasă ar trece peste aceste limite explicite.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: REVIEW_SOURCE,
    crossRefs: ["Geneza 15:16", "Deuteronom 9:4-6", "Iosua 13:1", "Iosua 15:63", "Romani 8:13", "Efeseni 6:12", "Matei 5:43-48"],
    forYourHeart:
      "Nu lua dintr-un război al vechiului legământ o scuză pentru cruzime. Dacă vrei să iei severitatea lui în serios, începe prin a nu cruța păcatul din tine și prin a refuza ura față de omul din fața ta.",
  })

  return reviewed
}

function reviewChapter11(chapter: BibleChapter): BibleChapter {
  let reviewed: BibleChapter = {
    ...chapter,
    summary:
      "O mare coaliție din nord, cu numeroși cai și care, se adună împotriva lui Israel. DOMNUL îi spune lui Iosua să nu se teamă, Israel atacă, carele sunt arse, caii sunt dezafectați, iar principalele centre ale coaliției sunt înfrânte. Capitolul rezumă apoi această fază a cuceririi și spune că țara a avut odihnă de război. Rezumatul nu înseamnă că fiecare teritoriu și fiecare populație fuseseră deja ocupate sau eliminate; chiar Iosua 13 începe spunând că rămăsese încă mult pământ de luat.",
    literaryContext:
      "După campania din sud, capitolul 11 încheie marile campanii inițiale din nord și pregătește rezumatele și împărțirea țării. Formula «țara s-a odihnit de război» descrie încheierea acestei faze majore, nu sfârșitul tuturor conflictelor posibile: cartea va enumera imediat regiuni rămase și seminții care nu îi vor izgoni pe toți locuitorii.",
    historicalContext:
      "Huțorul/Hazor este prezentat în text drept capul acestor regate, iar caii și carele dau coaliției o forță militară considerabilă. Dumnezeu îi poruncește lui Iosua să dezafecteze caii și să ardă carele. Este rezonabil să observăm că Israel nu trebuie să-și construiască încrederea pe resursele militare ale vrăjmașului, mai ales în lumina Deuteronom 17 și Psalmul 20, dar Iosua 11 nu explică explicit motivul tehnic al poruncii. Explicația păstrează distincția dintre ceea ce spune textul și aplicația canonică.",
  }

  reviewed = replaceUnit(reviewed, "iosua-11-1-15", {
    heading: "O coaliție mult mai mare, dar aceeași cerință: Iosua să urmeze porunca primită",
    teaching: [
      "Coaliția din nord este descrisă ca foarte numeroasă și bine echipată cu cai și care. DOMNUL îi spune lui Iosua să nu se teamă și îi promite victoria în confruntarea aceasta precisă. Nu extindem promisiunea într-o regulă că orice credincios care se simte «depășit numeric» va câștiga conflictul pe care și l-a ales.",
      "Porunca privind caii și carele este executată. Deuteronom 17:16 avertizează viitorul rege al Israelului să nu înmulțească pentru sine cai, iar Psalmul 20 contrastează încrederea în care și cai cu încrederea în Numele DOMNULUI. Aceste texte fac plauzibilă o aplicație despre sursa încrederii, dar motivul exact al dezafectării cailor din Iosua 11 nu este explicat în propoziție și nu trebuie prezentat ca certitudine istorică dedusă.",
      "Versetele insistă că Iosua a făcut potrivit poruncii primite prin Moise. Accentul narațiunii cade pe fidelitatea față de cuvântul legământului, nu pe disprețul față de tehnologie ca atare. Biblia nu învață că folosirea unei tehnologii mai avansate este în sine necredință.",
      "Pentru cititorul creștin, întrebarea legitimă este unde își pune încrederea, nu dacă trebuie să distrugă instrumentele moderne ale altora. Resursele pot fi folosite fără să devină dumnezei, iar lipsa lor nu garantează automat credința.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: REVIEW_SOURCE,
    crossRefs: ["Deuteronom 17:16", "Psalmul 20:7", "Proverbe 21:31"],
    forYourHeart:
      "Nu confunda resursa cu salvatorul. Poți folosi instrumente bune fără să le dai locul încrederii care Îi aparține lui Dumnezeu.",
  })

  reviewed = replaceUnit(reviewed, "iosua-11-16-23", {
    heading: "Împietrirea, judecata și «odihna de război» trebuie citite împreună cu restul cărții",
    teaching: [
      "Rezumatul spune că Iosua a luat țara în sensul marilor campanii descrise și că regii s-au ridicat la luptă. În același timp, Iosua 13:1 va spune explicit că rămăsese încă foarte mult pământ de luat, iar alte capitole menționează locuitori neizgoniți. «A luat toată țara» este un rezumat al dominației militare și al fazei de cucerire, nu afirmația că fiecare localitate fusese deja ocupată fără excepție.",
      "Versetul 20 atribuie DOMNULUI împietrirea inimilor lor pentru a ieși la luptă și a ajunge sub judecata stabilită. Există un ecou puternic cu Faraon: Scriptura poate vorbi atât despre împietrirea omului, cât și despre împietrirea judiciară a lui Dumnezeu. Nu concluzionăm de aici că Dumnezeu transformă oameni moral inocenți în răi împotriva voinței lor doar pentru a-i putea condamna.",
      "Geneza 15:16 și Deuteronom 9:4–6 așază această judecată într-un context mai larg al răutății popoarelor și al unei judecăți amânate. Iar istoria ulterioară arată că Israel nu este imun: același Dumnezeu îl judecă atunci când persistă în nelegiuire.",
      "«Țara s-a odihnit de război» marchează încheierea marilor campanii ale acestei secțiuni. Nu înseamnă că de aici înainte nu mai există niciun conflict, după cum chiar restul cărții arată. Odihna este reală în cadrul narațiunii, dar trebuie definită de contextul ei.",
      "Nici împietrirea, nici judecata Canaanului nu oferă cititorului permisiunea de a declara adversarii săi moderni drept oameni pe care Dumnezeu i-a împietrit ca să fie distruși. O asemenea pretenție ar lua asupra noastră un verdict revelat pe care textul nu ni l-a dat.",
    ].join("\n\n"),
    explanationKind: "exposition",
    explanationSource: REVIEW_SOURCE,
    crossRefs: ["Geneza 15:16", "Exod 9:12", "Deuteronom 9:4-6", "Iosua 13:1", "Iosua 15:63", "Romani 9:17-24"],
    forYourHeart:
      "Nu folosi doctrina împietririi ca să încetezi să vezi un om în adversarul tău. Verdictul asupra inimii altuia Îi aparține lui Dumnezeu; ție îți aparține ascultarea de ceea ce ți-a poruncit.",
  })

  return reviewed
}

export function reviewIosuaExplanations(chapters: BibleChapter[]): BibleChapter[] {
  return chapters.map((chapter) => {
    if (chapter.number === 6) return reviewChapter6(chapter)
    if (chapter.number === 7) return reviewChapter7(chapter)
    if (chapter.number === 10) return reviewChapter10(chapter)
    if (chapter.number === 11) return reviewChapter11(chapter)
    return chapter
  })
}
