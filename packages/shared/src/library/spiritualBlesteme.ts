import type { Lesson } from "../domain.js"

// Modulul 3: "Ce moștenești și ce nu"
// Course ID: spiritual_c3_blessings
// Surse: GTY RON-1354, Nolan Emotional Baggage 01-04 (cf. .research/nolan-emotional-baggage/)
// Stare: in_review

export const blestemL1: Lesson = {
  id: "spirit_blestem_l1", courseId: "spiritual_c3_blessings", order: 1,
  title: "Ce este un blestem în Biblie?", estMinutes: 12,
  anchorRefs: ["Deuteronomul 28", "Proverbele 26:2", "Galateni 3:13"], memoryVerseRef: "Galateni 3:13",
  steps: [
    { id: "sb1_1", type: "hook", order: 1, bubbles: [{ from: "guide", text: "Nu orice serie de necazuri este dovada unui blestem. În Biblie, blestemul apare în cadrul legământului, al judecății și al cuvintelor rostite; nu este o explicație automată pentru tot ce merge rău." }]},
    { id: "sb1_2", type: "scripture", order: 2, scripture: { text: "Cum sare vrabia încoace și încolo și cum zboară rândunica, așa nu nimerește blestemul neîntemeiat.", ref: "Proverbele 26:2" } },
    { id: "sb1_3", type: "truth_simple", order: 3, bubbles: [{ from: "guide", text: "Cuvintele pot răni și păcatul are consecințe, dar nu fiecare insultă primește putere magică. Credinciosul nu trăiește căutând permanent o formulă ascunsă care îi controlează viața." }]},
    { id: "sb1_4", type: "choice", order: 4, choice: { prompt: "De ce te temi?", options: [
      { id: "sb1a", label: "Cineva a rostit ceva rău asupra mea.", branchStepId: "sb1_b_words" },
      { id: "sb1b", label: "Necazurile repetate par un tipar.", branchStepId: "sb1_b_pattern" },
      { id: "sb1c", label: "Mi s-a spus că am un blestem ascuns.", branchStepId: "sb1_b_told" },
    ]}},
    { id: "sb1_b_words", type: "how_god_helps", order: 90, bubbles: [{ from: "guide", text: "Nu primi cuvântul omului ca verdict mai mare decât Evanghelia. Poți respinge minciuna fără un ritual de panică." }]},
    { id: "sb1_b_pattern", type: "how_god_helps", order: 91, bubbles: [{ from: "guide", text: "Un tipar cere cercetare: alegeri, mediu, traumă, nedreptate, boală și dimensiune spirituală. Repetiția singură nu pune diagnosticul." }]},
    { id: "sb1_b_told", type: "how_god_helps", order: 92, bubbles: [{ from: "guide", text: "Emanus nu confirmă diagnostice spirituale prin ecran. Cere temeiul biblic și implică oameni maturi care te cunosc." }]},
    { id: "sb1_5", type: "scripture", order: 5, scripture: { text: "Hristos ne-a răscumpărat din blestemul Legii, făcându-Se blestem pentru noi.", ref: "Galateni 3:13" } },
    { id: "sb1_6", type: "prayer", order: 6, bubbles: [{ from: "guide", text: "«Iisuse, îmi așez siguranța în lucrarea Ta, nu în frica unor cuvinte ascunse. Condu-mă în adevăr și pocăință, nu în superstiție.»" }]},
    { id: "sb1_7", type: "memory_verse", order: 7, scripture: { text: "Hristos ne-a răscumpărat din blestemul Legii.", ref: "Galateni 3:13" } },
  ],
}

export const blestemL2: Lesson = {
  id: "spirit_blestem_l2", courseId: "spiritual_c3_blessings", order: 2,
  title: "Ce se transmite între generații?", estMinutes: 13,
  anchorRefs: ["Exodul 20:5-6", "Ezechiel 18:19-20", "1 Petru 1:18-19"], memoryVerseRef: "Ezechiel 18:20",
  steps: [
    { id: "sb2_1", type: "hook", order: 1, bubbles: [{ from: "guide", text: "Familiile transmit consecințe, răni, obiceiuri, credințe și modele de relaționare. Dar Biblia nu spune că un copil poartă automat vina morală a strămoșului." }]},
    { id: "sb2_2", type: "scripture", order: 2, scripture: { text: "Fiul nu va purta nelegiuirea tatălui său, și tatăl nu va purta nelegiuirea fiului său.", ref: "Ezechiel 18:20" } },
    { id: "sb2_3", type: "truth_simple", order: 3, bubbles: [{ from: "guide", text: "Consecința poate traversa generații fără ca vina să se moștenească identic. În Hristos, trecutul familiei poate fi numit și întrerupt; nu devine identitatea sau sentința ta." }]},
    { id: "sb2_4", type: "choice", order: 4, choice: { prompt: "Ce tipar recunoști?", options: [
      { id: "sb2a", label: "Dependență, violență sau abandon.", branchStepId: "sb2_b_harm" },
      { id: "sb2b", label: "Frică, rușine sau control.", branchStepId: "sb2_b_inner" },
      { id: "sb2c", label: "Practici spirituale străine de Hristos.", branchStepId: "sb2_b_occult" },
    ]}},
    { id: "sb2_b_harm", type: "how_god_helps", order: 90, bubbles: [{ from: "guide", text: "Ruperea tiparului cere siguranță, limite, adevăr, vindecare și uneori intervenție legală sau tratament — nu doar o declarație." }]},
    { id: "sb2_b_inner", type: "how_god_helps", order: 91, bubbles: [{ from: "guide", text: "Aceste tipare se pot învăța profund. Rugăciunea și terapia competentă pot lucra împreună fără competiție." }]},
    { id: "sb2_b_occult", type: "how_god_helps", order: 92, bubbles: [{ from: "guide", text: "Poți renunța la practica pe care ai cunoscut-o fără să inventezi o listă de păcate ale strămoșilor pe care nu le cunoaști." }]},
    { id: "sb2_5", type: "step", order: 5, bubbles: [{ from: "guide", text: "Scrie: «ce am primit», «ce aleg să nu continui» și «ce practică nouă pun în loc». Nu te acuza pentru originea ta; asumă următorul pas." }]},
    { id: "sb2_6", type: "prayer", order: 6, bubbles: [{ from: "guide", text: "«Tată, Îți aduc istoria familiei mele. Vindecă ce m-a rănit, iartă ce am continuat eu și învață-mă un drum nou în Hristos.»" }]},
    { id: "sb2_7", type: "memory_verse", order: 7, scripture: { text: "Fiul nu va purta nelegiuirea tatălui său.", ref: "Ezechiel 18:20" } },
  ],
}

export const blestemL3: Lesson = {
  id: "spirit_blestem_l3", courseId: "spiritual_c3_blessings", order: 3,
  title: "Practici oculte și renunțare", estMinutes: 14,
  anchorRefs: ["Deuteronomul 18:9-14", "Faptele 19:18-20", "Coloseni 1:13-14"], memoryVerseRef: "Coloseni 1:13",
  steps: [
    { id: "sb3_1", type: "hook", order: 1, bubbles: [{ from: "guide", text: "Astrologia, divinația, chemarea spiritelor și magia promit cunoaștere sau control fără încredere în Dumnezeu. Biblia nu le tratează ca jocuri neutre." }]},
    { id: "sb3_2", type: "scripture", order: 2, scripture: { text: "El ne-a izbăvit de sub puterea întunericului și ne-a strămutat în Împărăția Fiului dragostei Lui.", ref: "Coloseni 1:13" } },
    { id: "sb3_3", type: "truth_simple", order: 3, bubbles: [{ from: "guide", text: "Renunțarea înseamnă să numești practica reală, să te întorci de la ea și să alegi domnia lui Iisus. Nu este magie inversă și nu cere să inventezi contacte pe care nu le-ai avut." }]},
    { id: "sb3_4", type: "choice", order: 4, choice: { prompt: "Unde te afli?", options: [
      { id: "sb3a", label: "Am practicat conștient ceva ocult.", branchStepId: "sb3_b_known" },
      { id: "sb3b", label: "Am participat fără să înțeleg.", branchStepId: "sb3_b_unknown" },
      { id: "sb3c", label: "Mă tem de un obiect sau loc.", branchStepId: "sb3_b_object" },
    ]}},
    { id: "sb3_b_known", type: "how_god_helps", order: 90, bubbles: [{ from: "guide", text: "Mărturisește practica pe nume, renunță la ea și închide accesul concret. Nu ai nevoie de limbaj spectaculos." }]},
    { id: "sb3_b_unknown", type: "how_god_helps", order: 91, bubbles: [{ from: "guide", text: "Poți aduce înaintea lui Dumnezeu ceea ce știi acum. Eliberarea nu depinde de memoria perfectă a fiecărui detaliu." }]},
    { id: "sb3_b_object", type: "how_god_helps", order: 92, bubbles: [{ from: "guide", text: "Un obiect nu este mai puternic decât Hristos. Îndepărtarea lui poate exprima ruperea de practică, dar nu este ritual care Îl obligă pe Dumnezeu." }]},
    { id: "sb3_5", type: "step", order: 5, bubbles: [{ from: "guide", text: "Numește doar practicile reale. Oprește-le, îndepărtează accesul și spune unui credincios matur care poate rămâne lângă tine fără panică." }]},
    { id: "sb3_6", type: "prayer", order: 6, bubbles: [{ from: "guide", text: "«Doamne Iisuse, renunț la ___. Aleg să Îți aparțin și să caut adevărul și ajutorul numai sub domnia Ta. Închide ce am deschis și învață-mă ascultarea.»" }]},
    { id: "sb3_7", type: "memory_verse", order: 7, scripture: { text: "El ne-a izbăvit de sub puterea întunericului.", ref: "Coloseni 1:13" } },
  ],
}

// --- Lecții noi bazate pe transcrierea Nolan Emotional Baggage 01-04 ---
// Sursa: Allen Nolan, Cornerstone Fellowship, seria "Emotional Baggage (Sins of the Parents)"
// Transcrieri verificate în .research/nolan-emotional-baggage/transcripts/
// Contținutul este rescris în română; nu este traducere sau citat direct din predică.

export const blestemL4: Lesson = {
  id: "spirit_blestem_l4", courseId: "spiritual_c3_blessings", order: 4,
  title: "De ce se repetă tiparele", estMinutes: 13,
  anchorRefs: ["Exodul 20:5", "Ezechiel 18:20", "Ioan 3:20-21", "Romani 8:15"], memoryVerseRef: "Ezechiel 18:20",
  steps: [
    {
      id: "sb4_1", type: "hook", order: 1,
      bubbles: [{ from: "guide", text: "Mulți oameni repetă exact ce au jurat să nu facă niciodată. Nu pentru că așa sunt făcuți, ci pentru că ceea ce au văzut acasă le-a modelat fără voia lor ce înseamnă ‘normal’." }],
    },
    {
      id: "sb4_2", type: "scripture", order: 2,
      scripture: { text: "Fiul nu va purta nelegiuirea tatălui său, și tatăl nu va purta nelegiuirea fiului său.", ref: "Ezechiel 18:20" },
    },
    {
      id: "sb4_3", type: "truth_simple", order: 3,
      bubbles: [
        { from: "guide", text: "Exodul 20:5 spune că Dumnezeu pedepsește copiii pentru păcatul părinților până la generația a treia și a patra. Mulți înteleg greșit: că Dumnezeu îi ține vinovați pe copii pentru ce au făcut părinții." },
        { from: "guide", text: "Dar Ezechiel 18 lămurește limpede: Dumnezeu nu pedepsește pe nimeni pentru păcatul altuia. Fiul nu poartă vina tatălui." },
        { from: "guide", text: "Atunci ce înseamnă Exodul 20? Dumnezeu pedepsește copiii care comit aceleași păcate pe care le-au învățat de la părinți. Nu primesc iertare automată pentru că ‘așa au văzut acasă’." },
        { from: "guide", text: "Păcatul are o dinamică de grup. Când cineva păcătuiește, nu se rănește numai pe sine — îi afectează pe toți cei legați de el, mai ales copiii. Copiii nu sunt vinovați, dar simt consecințele." },
        { from: "guide", text: "Copiii care cresc într-o casă disfuncțională ajung să creadă că disfuncționalul este normalul. De aceea repetă, fără să âși dea seama, același tipar." },
        { from: "guide", text: "Ioan 3:20 spune că tot cel ce face răul urăște lumina. Tiparele ascunse supraviețuiesc în întuneric. Primul pas spre rupere este să aduci la lumină — pentru tine, nu pentru toți — ce s-a întâmplat și cum te-a afectat." },
      ],
    },
    {
      id: "sb4_4", type: "choice", order: 4,
      choice: {
        prompt: "Ce tipar recunoști în familia ta?",
        options: [
          { id: "sb4a", label: "Dependențe sau violență.", branchStepId: "sb4_b_harm" },
          { id: "sb4b", label: "Frică, tăcere sau rușine cronică.", branchStepId: "sb4_b_fear" },
          { id: "sb4c", label: "Nu recunosc niciun tipar.", branchStepId: "sb4_b_none" },
        ],
      },
    },
    { id: "sb4_b_harm", type: "how_god_helps", order: 90, bubbles: [{ from: "guide", text: "Dumnezeu nu te pedepsește pentru ce au făcut părinții tăi. Însă îi cere să iei o decizie acum: repet sau rup? Cu El, poi rupe." }]},
    { id: "sb4_b_fear", type: "how_god_helps", order: 91, bubbles: [{ from: "guide", text: "Frica învățată se poate dezvăța. Duhul pe care l-ați primit nu este un duh de teamă, ci de putere, dragoste și cuminte (Romani 8:15)." }]},
    { id: "sb4_b_none", type: "how_god_helps", order: 92, bubbles: [{ from: "guide", text: "Este posibil să nu fi identificat încă tiparele. Nu te grăbi. Un pastor, un consilier creștin sau un prieten matur te poate ajuta să le distingi." }]},
    {
      id: "sb4_5", type: "step", order: 5,
      bubbles: [{ from: "guide", text: "Scrie un singur tipar pe care l-ai văzut în familie și pe care îl recunoști și în tine. Nu ca autoosndă, ci ca prim pas de conștientizare." }],
    },
    {
      id: "sb4_6", type: "prayer", order: 6,
      bubbles: [{ from: "guide", text: "«Doamne, aduc la lumină ceea ce am învățat în familie fără să aleg. Arată-mi adevărul și dă-mi curajul să nu repet ce a adus durere.»" }],
    },
    {
      id: "sb4_7", type: "memory_verse", order: 7,
      scripture: { text: "Fiul nu va purta nelegiuirea tatălui său.", ref: "Ezechiel 18:20" },
    },
  ],
}

export const blestemL5: Lesson = {
  id: "spirit_blestem_l5", courseId: "spiritual_c3_blessings", order: 5,
  title: "Iertarea care te vindecă pe tine", estMinutes: 13,
  anchorRefs: ["Evrei 12:15", "Romani 12:19", "Matei 18:21-22", "Efeseni 4:31-32"], memoryVerseRef: "Evrei 12:15",
  steps: [
    {
      id: "sb5_1", type: "hook", order: 1,
      bubbles: [{ from: "guide", text: "Dacă nu ierți, nu îl pedepsești pe cel care te-a rănit. Îl pedepsești pe tine. Amărăciunea este o otravă pe care o bei tu, nu el." }],
    },
    {
      id: "sb5_2", type: "scripture", order: 2,
      scripture: { text: "Vedeți să nu se ivească vreo rădăcină de amărăciune care să vă tulbure și să întineze pe mulți.", ref: "Evrei 12:15" },
    },
    {
      id: "sb5_3", type: "truth_simple", order: 3,
      bubbles: [
        { from: "guide", text: "Amărăciunea este mânie nerezolvată. Nu mânie ieșită la suprafață — cea care stă înăuntru și crește. Scriptura o compara cu rădăcina: înainte să o vezi la suprafață, ea deja se răspândește sub pământ." },
        { from: "guide", text: "O rădăcină de amărăciune întinează pe mulți. Nu rămâne în tine — iește în cuvintele tale, în modul în care îl privești pe celălalt, în cum âți crești copiii." },
        { from: "guide", text: "De ce este greu să ierți? Pentru că suntem făcuți după chipul unui Dumnezeu drept. Dorința de dreptate este sădită în noi. Vrem ca cel care ne-a rănit să plătească. Asta nu este rău în sine." },
        { from: "guide", text: "Problema este că noi nu suntem calificați să facem dreptate. Firea păcătoasă ne strică judecata. De aceea Scriptura spune: răzbunarea este a Mea, zice Domnul. Nu însearămnă că El nu face dreptate — înseamnă că El o face mai bine decât putem noi." },
        { from: "guide", text: "Iertarea nu înseamnă că ce s-a făcut a fost normal. Nu înseamnă că omul acela merită încrederea ta. Nu înseamnă că trebuie să-l suni și să-i spui. Iertarea înseamnă să eliberezi otrava din tine." },
        { from: "guide", text: "Iertarea este o decizie, nu un sentiment. Sentimentul vine în timp, după decizie." },
      ],
    },
    {
      id: "sb5_4", type: "choice", order: 4,
      choice: {
        prompt: "Unde ești cu iertarea?",
        options: [
          { id: "sb5a", label: "Nu pot să iert — e prea greu.", branchStepId: "sb5_b_hard" },
          { id: "sb5b", label: "Am iertat cu vorba, dar simt amărăciune.", branchStepId: "sb5_b_half" },
          { id: "sb5c", label: "Nu știu dacă ce mi s-a făcut merită iertat.", branchStepId: "sb5_b_doubt" },
        ],
      },
    },
    { id: "sb5_b_hard", type: "how_god_helps", order: 90, bubbles: [{ from: "guide", text: "Poți începe cu: ‘Doamne, nu pot să iert din puterea mea. Te rog Tu să faci asta prin mine.’ Rugăciunea asta deschide ușa." }]},
    { id: "sb5_b_half", type: "how_god_helps", order: 91, bubbles: [{ from: "guide", text: "Amărăciunea care rămâne arată că iertarea n-a ajuns încă în adânc. Roagă-L pe Dumnezeu să ajungă la rădăcină, nu doar la suprafață." }]},
    { id: "sb5_b_doubt", type: "how_god_helps", order: 92, bubbles: [{ from: "guide", text: "Orice rău merită iertat — nu pentru că era mic, ci pentru că tu meriți să fii liber. Dumnezeu nu te cere să minițalizezi rănile; te cheamă să nu le porți pe veci." }]},
    {
      id: "sb5_5", type: "step", order: 5,
      bubbles: [{ from: "guide", text: "Rostește azi în rugăciune: ‘Aleg să iert pe ___ pentru ___. Nu înseamnă că a fost normal. Las dreptatea în mâna Ta, Doamne.’" }],
    },
    {
      id: "sb5_6", type: "prayer", order: 6,
      bubbles: [{ from: "guide", text: "«Doamne, ridică din mine rădăcina de amărăciune. Eliberează-mă de greutatea pe care am purtat-o. Fac dreptatea Ta, nu a mea.»" }],
    },
    {
      id: "sb5_7", type: "memory_verse", order: 7,
      scripture: { text: "Vedeți să nu se ivească vreo rădăcină de amărăciune care să vă tulbure și să întineze pe mulți.", ref: "Evrei 12:15" },
    },
  ],
}

export const blestemL6: Lesson = {
  id: "spirit_blestem_l6", courseId: "spiritual_c3_blessings", order: 6,
  title: "Lanțul se poate rupe", estMinutes: 14,
  anchorRefs: ["Filipeni 3:12-14", "Efeseni 2:10", "Psalmi 68:6", "Isaia 43:18-19"], memoryVerseRef: "Filipeni 3:13",
  steps: [
    {
      id: "sb6_1", type: "hook", order: 1,
      bubbles: [{ from: "guide", text: "Pavel a făcut lucruri groaznice înainte de convertire. A prigonit, a ucis, a distrus familii. Și totuși a ajuns să scrie: ‘Uit ce este în urma mea și mă întind spre ce este înainte.’ Lanțul s-a rupt. Al tău poate fi rupt." }],
    },
    {
      id: "sb6_2", type: "scripture", order: 2,
      scripture: { text: "Uit ce este în urma mea și mă întind spre ce este înainte, alergând spre țintă, pentru premiul chemării cereti a lui Dumnezeu în Hristos Iisus.", ref: "Filipeni 3:13-14" },
    },
    {
      id: "sb6_3", type: "truth_simple", order: 3,
      bubbles: [
        { from: "guide", text: "Iată patru pași pe care Pavel îi descrie în Filipeni 3, și care sunt drumul de la trecut la vindecare." },
        { from: "guide", text: "Primul: recunoaște adevărul despre tine. Nu te preface că e bine când nu e. Negația întreține tiparele. Pavel spune: nu am ajuns la desăvârșire. Onestitatea față de tine însuți deschide ușa." },
        { from: "guide", text: "Al doilea: ia răspunderea pentru propria ta viață. Vine un moment când trecutul nu mai poate fi singurul vinovat. Da, ceea ce ți s-a făcut a contat. Dar acum ești adult și alegerile tale sunt ale tale." },
        { from: "guide", text: "Al treilea: pornește înainte. Pavel folosea un cuvânt grec care înseamnă a înainta cu hotărâre, fără să privești înapoi. A uita trecutul în sensul acesta nu înseamnă să-l ștergi din memorie — înseamnă să nu-l mai folosești ca scuză." },
        { from: "guide", text: "Al patrulea: concentrează-te pe ce a pregătit Dumnezeu pentru tine. Efeseni 2:10 spune că eti opera de artă a lui Dumnezeu, creat în Hristos Iisus pentru fapte bune pe care El le-a pregătit dinainte. Trecutul tău nu a anulat planul Lui." },
        { from: "guide", text: "Dacă toată familia ta era toxică, Psalmi 68:6 spune că Dumnezeu așază pe cei singuri în familie. Poți construi o familie sănătoasă acolo unde a euat cea veche." },
      ],
    },
    {
      id: "sb6_4", type: "choice", order: 4,
      choice: {
        prompt: "La care pas ești oprit?",
        options: [
          { id: "sb6a", label: "Nu pot să recunosc că am o problemă.", branchStepId: "sb6_b_admit" },
          { id: "sb6b", label: "Iau răspunderea, dar nu știu cum să merg înainte.", branchStepId: "sb6_b_forward" },
          { id: "sb6c", label: "Nu văd că Dumnezeu are un plan pentru viața mea.", branchStepId: "sb6_b_plan" },
        ],
      },
    },
    { id: "sb6_b_admit", type: "how_god_helps", order: 90, bubbles: [{ from: "guide", text: "Cel mai greu pas este primul. Închide ochii și spune: ‘Am o problemă pe care nu o pot rezolva singur.’ Dumnezeu lucrează din locul acesta." }]},
    { id: "sb6_b_forward", type: "how_god_helps", order: 91, bubbles: [{ from: "guide", text: "Uneori ‘a merge înainte’ înseamnă să cauți un consilier creștin profesionist. Nu este slabiciune — este înțelepciune." }]},
    { id: "sb6_b_plan", type: "how_god_helps", order: 92, bubbles: [{ from: "guide", text: "Planul Lui nu a dispărut cu trecutul tău. ‘Eu știu gândurile pe care le am cu privire la voi: gânduri de pace și nu de nenorocire.’ Ieremia 29:11." }]},
    {
      id: "sb6_5", type: "step", order: 5,
      bubbles: [{ from: "guide", text: "Scrie un singur lucru concret pe care îl faci începând de azi pentru a nu transmite mai departe tiparele primite. Un singur lucru." }],
    },
    {
      id: "sb6_6", type: "prayer", order: 6,
      bubbles: [{ from: "guide", text: "«Doamne, mă hotărăsc să nu mai fiu un verigă în lanțul acesta. Nu știu toți pașii, dar fac primul. Conduie-mă Tu spre ceea ce ai pregătit pentru mine în Hristos.»" }],
    },
    {
      id: "sb6_7", type: "memory_verse", order: 7,
      scripture: { text: "Uit ce este în urma mea și mă întind spre ce este înainte.", ref: "Filipeni 3:13" },
    },
  ],
}

export const SPIRITUAL_BLESTEM_PART_A: Lesson[] = [
  blestemL1,
  blestemL2,
  blestemL3,
  blestemL4,
  blestemL5,
  blestemL6,
]
