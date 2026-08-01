import type { Lesson, LessonStep } from "../domain.js"

/*
 * Cursul zero „Fundamentul”.
 * Sursa editorială: docs/06-curs-fundamentul.md.
 *
 * Reguli: pornește de la viața omului, identitate înainte de datorie,
 * Învierea este coloana portantă, iar decizia nu primește XP sau insignă.
 * Textele biblice scurte trebuie armonizate cu traducerea licențiată înainte
 * de publicarea finală.
 */

type FoundationInput = {
  id: string
  order: number
  title: string
  minutes?: number
  refs: string[]
  memoryRef: string
  checkIn: string
  hook: string[]
  choicePrompt: string
  choices: string[]
  struggle: string[]
  scriptureText: string
  scriptureRef: string
  truth: string[]
  quizQuestion: string
  quizWrongA: string
  quizCorrect: string
  quizWrongB: string
  quizExplanation: string
  help: string[]
  step: string
  prayer: string
  journal: string
  memoryText: string
}

function bubbles(...text: string[]) {
  return text.map((line) => ({ from: "guide" as const, text: line }))
}

function makeFoundationLesson(input: FoundationInput): Lesson {
  const p = input.id.replace("fund_", "f")
  const steps: LessonStep[] = [
    {
      id: `${p}_check`, type: "check_in", order: 1,
      choice: {
        prompt: input.checkIn,
        options: [
          { id: `${p}ci_a`, label: "Sunt aici și pot continua." },
          { id: `${p}ci_b`, label: "Îmi este greu, dar vreau să ascult." },
          { id: `${p}ci_c`, label: "Nu știu încă ce simt." },
        ],
      },
    },
    { id: `${p}_hook`, type: "hook", order: 2, bubbles: bubbles(...input.hook) },
    {
      id: `${p}_choice`, type: "choice", order: 3,
      choice: {
        prompt: input.choicePrompt,
        options: input.choices.map((label, index) => ({ id: `${p}c_${index + 1}`, label })),
      },
    },
    { id: `${p}_struggle`, type: "name_struggle", order: 4, bubbles: bubbles(...input.struggle) },
    {
      id: `${p}_word`, type: "scripture", order: 5,
      scripture: { text: input.scriptureText, ref: input.scriptureRef },
    },
    { id: `${p}_truth`, type: "truth_simple", order: 6, bubbles: bubbles(...input.truth) },
    {
      id: `${p}_quiz`, type: "quiz", order: 7,
      quiz: {
        question: input.quizQuestion,
        options: [
          { text: input.quizWrongA, correct: false },
          { text: input.quizCorrect, correct: true },
          { text: input.quizWrongB, correct: false },
        ],
        explanation: input.quizExplanation,
      },
    },
    { id: `${p}_help`, type: "how_god_helps", order: 8, bubbles: bubbles(...input.help) },
    { id: `${p}_step`, type: "step", order: 9, bubbles: bubbles(input.step) },
    { id: `${p}_prayer`, type: "prayer", order: 10, bubbles: bubbles(input.prayer) },
    { id: `${p}_journal`, type: "journal", order: 11, journalPrompt: input.journal },
    {
      id: `${p}_memory`, type: "memory_verse", order: 12,
      scripture: { text: input.memoryText, ref: input.memoryRef },
    },
  ]
  return {
    id: input.id,
    courseId: "lib_fundamentul",
    order: input.order,
    title: input.title,
    estMinutes: input.minutes ?? 8,
    anchorRefs: input.refs,
    memoryVerseRef: input.memoryRef,
    steps,
  }
}

export const fund_l1 = makeFoundationLesson({
  id: "fund_l1", order: 1, title: "Nu ești o întâmplare",
  refs: ["Geneza 1:27", "Isaia 43:7", "Efeseni 2:10"], memoryRef: "Efeseni 2:10",
  checkIn: "Cum ești, cu adevărat, azi?",
  hook: [
    "Poți avea un program plin și totuși să te întrebi dacă prezența ta schimbă ceva.",
    "Întrebarea «de ce exist?» nu este slăbiciune. Este una dintre întrebările pentru care ai fost făcut.",
  ],
  choicePrompt: "Unde te doare cel mai mult întrebarea despre valoarea ta?",
  choices: ["Simt că sunt de prisos.", "Valorez doar când produc ceva.", "Nu m-am gândit niciodată serios."],
  struggle: [
    "Lumea îți pune valoarea în rezultate, imagine, bani sau în aprobarea altora.",
    "Când acestea se clatină, pare că se clatină și dreptul tău de a exista.",
  ],
  scriptureText: "Noi suntem lucrarea Lui, zidiți în Hristos Isus pentru faptele bune pregătite de Dumnezeu.",
  scriptureRef: "Efeseni 2:10",
  truth: [
    "Nu ești fabricat și nici tolerat. Ești voit.",
    "Dumnezeu nu te-a creat pentru că Îi lipsea un angajat. Te-a creat pentru părtășie; slujirea crește din relație.",
  ],
  quizQuestion: "De unde începe valoarea omului?",
  quizWrongA: "Din cât de folositor este.", quizCorrect: "Din faptul că este creat și voit de Dumnezeu.",
  quizWrongB: "Din părerea majorității despre el.",
  quizExplanation: "Darurile și faptele au rost, dar nu produc valoarea persoanei. Ele cresc dintr-o valoare deja primită.",
  help: [
    "Dumnezeu te cheamă pe nume înainte să-I dovedești ceva.",
    "Limita cinstită: credința nu răspunde fiecărei întrebări despre felul în care s-a format lumea. Aici răspundem la altceva: Cui îi aparții.",
  ],
  step: "O dată astăzi, spune cu voce tare: «Am fost voit de Dumnezeu; nu trebuie să-mi câștig dreptul de a exista.»",
  prayer: "Doamne, dacă este adevărat că m-ai vrut, ajută-mă să primesc asta și să trăiesc din ea.",
  journal: "Când te-ai simțit ultima dată de prisos și ce ai fi avut nevoie să auzi?",
  memoryText: "Noi suntem lucrarea Lui, zidiți în Hristos Isus pentru faptele bune.",
})

export const fund_l2 = makeFoundationLesson({
  id: "fund_l2", order: 2, title: "Ce s-a rupt, de fapt",
  refs: ["Geneza 3:1-10", "Romani 5:12", "Luca 19:10"], memoryRef: "Geneza 3:9",
  checkIn: "Când greșești, te apropii de Dumnezeu sau te ascunzi?",
  hook: [
    "Prima minciună din istorie nu a fost doar despre un fruct. A fost despre caracterul lui Dumnezeu.",
    "Șarpele a sugerat că Dumnezeu ține ceva bun ascuns. Omul a ales să creadă minciuna și să trăiască fără încredere.",
  ],
  choicePrompt: "Ce imagine a lui Dumnezeu apare în tine când ai greșit?",
  choices: ["Un judecător care așteaptă să mă pedepsească.", "Cineva dezamăgit, de care trebuie să fug.", "Un Tată căruia pot să-I spun adevărul."],
  struggle: [
    "Păcatul este mai mult decât încălcarea unei reguli. Este ruperea încrederii și alegerea de a conduce viața fără Dumnezeu.",
    "Fapta este reală și gravă; totuși omul care se ascunde rămâne căutat.",
  ],
  scriptureText: "Domnul Dumnezeu l-a chemat pe om și i-a zis: «Unde ești?»",
  scriptureRef: "Geneza 3:9",
  truth: [
    "După cădere, primul cuvânt auzit de omul ascuns este o întrebare care îl caută.",
    "Dumnezeu știa locul. Întrebarea era invitația de a ieși din ascundere și de a spune adevărul.",
  ],
  quizQuestion: "Ce s-a rupt în inima omului la cădere?",
  quizWrongA: "Doar alimentația lui.", quizCorrect: "Încrederea și părtășia cu Dumnezeu.",
  quizWrongB: "Puterea lui de a mai fi găsit vreodată.",
  quizExplanation: "Păcatul a adus vină, rușine și moarte, dar Dumnezeu a venit să caute omul ascuns.",
  help: [
    "Iisus spune că a venit să caute și să mântuiască ce era pierdut.",
    "Dumnezeu nu numește răul bine, dar nici nu așteaptă să te repari înainte să ieși din ascunzătoare.",
  ],
  step: "Numește înaintea lui Dumnezeu un singur lucru pe care ai încercat să-l ascunzi. Fără scuze și fără discurs.",
  prayer: "Doamne, sunt aici. Tu știi unde m-am ascuns. Dă-mi curaj să spun adevărul și să mă întorc.",
  journal: "Ce te face să te ascunzi: frica de pedeapsă, rușinea sau dorința de a păstra controlul?",
  memoryText: "Domnul Dumnezeu l-a chemat pe om și i-a zis: «Unde ești?»",
})

export const fund_l3 = makeFoundationLesson({
  id: "fund_l3", order: 3, title: "De ce simt că-mi lipsește ceva",
  refs: ["Romani 3:23", "Ioan 4:13-14", "Psalmul 42:1-2"], memoryRef: "Psalmul 42:2",
  checkIn: "Ce ai urmărit mult timp, sperând că îți va aduce pace?",
  hook: [
    "Uneori primești lucrul pe care l-ai dorit și descoperi că golul a rămas.",
    "Poți schimba relația, orașul, telefonul sau cariera fără să schimbi setea de dedesubt.",
  ],
  choicePrompt: "Cu ce încerci cel mai des să umpli golul?",
  choices: ["Muncă, bani sau performanță.", "Relații și aprobarea oamenilor.", "Distracție, telefon sau alte refugii."],
  struggle: [
    "Lumea spune că îți mai lipsește un lucru pe care îl poți obține.",
    "Scriptura spune că setea cea mai adâncă este după Cineva, nu după încă ceva.",
  ],
  scriptureText: "Sufletul meu însetează după Dumnezeu, după Dumnezeul cel viu.",
  scriptureRef: "Psalmul 42:2",
  truth: [
    "Golul nu dovedește că ești defect. Arată că ai fost făcut pentru părtășie cu Dumnezeu.",
    "Păcatul ne-a lipsit de slava Lui; de aceea niciun lucru creat nu poate purta greutatea întregii noastre speranțe.",
  ],
  quizQuestion: "Ce poate satisface setea cea mai adâncă a omului?",
  quizWrongA: "Următoarea realizare importantă.", quizCorrect: "Relația vie cu Dumnezeu.",
  quizWrongB: "Să nu mai simtă nimic.",
  quizExplanation: "Lucrurile bune rămân daruri, dar devin poveri când le cerem să fie Dumnezeu pentru noi.",
  help: [
    "Iisus nu te ceartă pentru că ți-e sete. El oferă apă vie.",
    "Asta nu înseamnă că depresia, trauma sau boala dispar printr-o formulă. Ajutorul medical și relațional poate fi necesar și bun.",
  ],
  step: "Scrie un lucru despre care ai crezut că te va împlini și care nu a putut duce această greutate.",
  prayer: "Dumnezeule viu, am căutat în multe locuri. Îndreaptă setea mea spre Tine și ajută-mă să primesc și ajutorul de care am nevoie.",
  journal: "Ce lucru bun ai transformat, fără să vrei, în sursa principală a identității sau păcii tale?",
  memoryText: "Sufletul meu însetează după Dumnezeu, după Dumnezeul cel viu.",
})

export const fund_l4 = makeFoundationLesson({
  id: "fund_l4", order: 4, title: "Ce ne separă",
  refs: ["Romani 3:23", "Fapte 3:19", "1 Ioan 1:9"], memoryRef: "1 Ioan 1:9",
  checkIn: "Simți apropiere, distanță sau teamă când te gândești la Dumnezeu?",
  hook: [
    "Uneori spunem că Dumnezeu este departe, dar păstrăm strâns lucrul de care ne cheamă să ne desprindem.",
    "Pocăința nu este spectacol religios. Este întoarcerea cu fața spre Cel de care ai fugit.",
  ],
  choicePrompt: "Ce recunoști cel mai limpede între tine și Dumnezeu?",
  choices: ["Necredință sau neîncredere.", "Mândrie și dorința de control.", "Un păcat pe care nu vreau încă să-l las.", "Nu știu; am nevoie să mi se arate."],
  struggle: [
    "Păcatul, necredința, mândria și neascultarea nu sunt etichete pentru rușinare. Sunt nume pentru lucruri care rup părtășia.",
    "Nu trebuie să repari totul într-o seară. Dar poți înceta să numești întunericul lumină.",
  ],
  scriptureText: "Dacă ne mărturisim păcatele, El este credincios și drept ca să ne ierte și să ne curățească.",
  scriptureRef: "1 Ioan 1:9",
  truth: [
    "Mărturisirea nu Îl informează pe Dumnezeu. Te aduce pe tine în adevăr.",
    "Pocăința nu cumpără iertarea; întinde mâna spre iertarea oferită de Hristos.",
  ],
  quizQuestion: "Ce este pocăința?",
  quizWrongA: "Să te urăști suficient de mult.", quizCorrect: "O schimbare a minții și direcției, întoarsă spre Dumnezeu.",
  quizWrongB: "Să nu mai greșești niciodată înainte să vii.",
  quizExplanation: "Pocăința numește răul și schimbă direcția, dar puterea și iertarea vin de la Dumnezeu.",
  help: [
    "Dumnezeu dă har celor smeriți. A cere ajutor este deja o ieșire din mândrie.",
    "Dacă mărturisirea implică o faptă penală, abuz sau pericol, pocăința include oprirea răului și căutarea ajutorului real, nu ascunderea lui religioasă.",
  ],
  step: "Alege un singur lucru și spune-I lui Dumnezeu pe nume ce este și ce alegi să faci diferit.",
  prayer: "Doamne, nu vreau să mă mai ascund după explicații. Îți mărturisesc ce știi deja și cer iertare și putere pentru o direcție nouă.",
  journal: "Care este primul pas verificabil al întoarcerii tale?",
  memoryText: "Dacă ne mărturisim păcatele, El este credincios și drept ca să ne ierte.",
})

export const fund_l5 = makeFoundationLesson({
  id: "fund_l5", order: 5, title: "Dumnezeu nu este împotriva ta",
  refs: ["Romani 8:31-32", "Iacov 1:13-17", "Luca 15:11-24"], memoryRef: "Romani 8:32",
  checkIn: "Ți se pare că Dumnezeu este pentru tine, împotriva ta sau departe?",
  hook: [
    "Mulți oameni nu L-au respins pe Dumnezeu. Au respins imaginea unui șef ceresc care așteaptă să-i prindă.",
    "Crucea nu arată un Dumnezeu cu brațele încrucișate, ci un Dumnezeu care a venit până la noi.",
  ],
  choicePrompt: "Ce te face să te îndoiești cel mai mult de bunătatea Lui?",
  choices: ["Suferința pe care nu a oprit-o.", "Reguli pe care nu le înțeleg.", "Vinovăția mea.", "Rugăciuni care par fără răspuns."],
  struggle: [
    "Iubirea reală poate fi refuzată. De aceea libertatea este posibilă și răul este real.",
    "Dar libertatea omului nu Îl face pe Dumnezeu indiferent: El intră în suferință și poartă costul salvării.",
  ],
  scriptureText: "El, care n-a cruțat nici chiar pe Fiul Său, ci L-a dat pentru noi toți, cum nu ne va da împreună cu El toate lucrurile?",
  scriptureRef: "Romani 8:32",
  truth: [
    "Crucea este dovada direcției inimii lui Dumnezeu.",
    "Nu înțelegem fiecare suferință și nu pretindem că o putem explica. Știm însă că Dumnezeu nu a rămas în afara durerii.",
  ],
  quizQuestion: "Care este dovada centrală că Dumnezeu nu a rămas indiferent?",
  quizWrongA: "Faptul că oamenii buni nu suferă niciodată.", quizCorrect: "Faptul că L-a dat pe Fiul Său pentru noi.",
  quizWrongB: "Faptul că explicăm fiecare tragedie.",
  quizExplanation: "Creștinismul nu oferă o explicație simplistă pentru orice durere; arată spre Dumnezeu venit în trup, răstignit și înviat.",
  help: [
    "Iacov spune că Dumnezeu nu ispitește pe nimeni și că darurile bune vin de la El.",
    "Poți aduce înaintea Lui și revolta, nu doar cuvintele cuminți. Psalmii fac asta fără să cosmetizeze durerea.",
  ],
  step: "Spune-I lui Dumnezeu, fără limbaj religios, lucrul concret care te face să crezi că este împotriva ta.",
  prayer: "Tată, nu înțeleg tot ce ai îngăduit. Privesc spre Iisus și Te rog să-mi arăți bunătatea Ta chiar în locul durerii mele.",
  journal: "Ce imagine despre Dumnezeu porți din familie, biserică sau suferință și cum se compară cu Iisus?",
  memoryText: "El n-a cruțat nici chiar pe Fiul Său, ci L-a dat pentru noi toți.",
})

export const fund_l6 = makeFoundationLesson({
  id: "fund_l6", order: 6, title: "Cineva a plătit în locul tău", minutes: 10,
  refs: ["1 Petru 2:24", "2 Corinteni 5:21", "1 Corinteni 15:14-20"], memoryRef: "1 Petru 2:24",
  checkIn: "Ai încercat să te repari singur și ai ajuns din nou în același loc?",
  hook: [
    "Nu poți ieși dintr-o groapă trăgându-te în sus de propria haină.",
    "Evanghelia nu spune că omul a urcat până la Dumnezeu. Spune că Dumnezeu a coborât până la om.",
  ],
  choicePrompt: "Cum ai încercat cel mai des să plătești pentru greșelile tale?",
  choices: ["Prin fapte bune și promisiuni.", "Pedepsindu-mă și refuzând iertarea.", "Prefăcându-mă că nu a fost grav.", "Nu m-am gândit la asta."],
  struggle: [
    "Vinovăția reală nu dispare prin comparație și nici prin uitare.",
    "Dreptatea cere ca răul să fie luat în serios; dragostea a ales să poarte costul.",
  ],
  scriptureText: "El a purtat păcatele noastre în trupul Său, pe lemn, pentru ca noi să trăim pentru neprihănire.",
  scriptureRef: "1 Petru 2:24",
  truth: [
    "Iisus nu a venit doar să dea un exemplu moral. A purtat păcatul și a murit în locul nostru.",
    "Coloana portantă este Învierea: dacă Hristos nu a înviat, credința este zadarnică; dacă a înviat, moartea nu a avut ultimul cuvânt.",
  ],
  quizQuestion: "Pe ce eveniment stă sau cade credința creștină?",
  quizWrongA: "Pe faptul că toți creștinii explică la fel Geneza.", quizCorrect: "Pe moartea și Învierea reală a lui Iisus.",
  quizWrongB: "Pe faptul că oamenii religioși sunt întotdeauna buni.",
  quizExplanation: "Pavel spune direct că fără Înviere credința este zadarnică. Creștinismul își leagă speranța de un eveniment, nu doar de o idee.",
  help: [
    "Cel fără păcat a luat locul celor vinovați, pentru ca ei să primească viață nouă.",
    "Limita cinstită: există întrebări istorice și filosofice care merită cercetate. Credința nu cere să te prefaci că nu le ai.",
  ],
  step: "Citește Luca 24. Observă întrebările, îndoiala, masa și felul în care Iisus Se face cunoscut.",
  prayer: "Iisuse, nu mă pot salva singur. Dacă ai murit și ai înviat pentru mine, ajută-mă să primesc ce ai făcut.",
  journal: "Ce datorie încerci încă să plătești singur înaintea lui Dumnezeu?",
  memoryText: "El a purtat păcatele noastre în trupul Său, pe lemn.",
})

export const fund_l7 = makeFoundationLesson({
  id: "fund_l7", order: 7, title: "Poți spune da acum", minutes: 10,
  refs: ["Romani 3:23", "Ioan 3:16", "Fapte 3:19", "Romani 10:9-10", "Ioan 1:12"], memoryRef: "Ioan 1:12",
  checkIn: "După ce ai parcurs până aici, unde ești față de Iisus?",
  hook: [
    "Nu există o formulă magică și nici o emoție obligatorie.",
    "Există o Persoană care te cheamă și un răspuns pe care nimeni nu-l poate da în locul tău.",
  ],
  choicePrompt: "Care răspuns este cel mai cinstit acum?",
  choices: ["Vreau să-I spun da lui Iisus acum.", "Vreau, dar încă nu înțeleg.", "Nu sunt pregătit acum."],
  struggle: [
    "Poate te temi că promiți ceva ce nu vei putea ține. Sau că nu simți suficient.",
    "Mântuirea nu începe cu puterea promisiunii tale, ci cu fidelitatea Celui care te cheamă.",
  ],
  scriptureText: "Tuturor celor ce L-au primit și cred în Numele Lui le-a dat dreptul să devină copii ai lui Dumnezeu.",
  scriptureRef: "Ioan 1:12",
  truth: [
    "Răspunsul cuprinde patru mișcări: recunoaște nevoia, crede în Iisus, întoarce-te și primește-L.",
    "Poți spune «nu încă» fără presiune. Dumnezeu nu are nevoie de o decizie smulsă de frică.",
  ],
  quizQuestion: "Ce face o rugăciune de întoarcere adevărată?",
  quizWrongA: "Cuvintele exacte și pronunția lor perfectă.", quizCorrect: "Încrederea sinceră pusă în Iisus și întoarcerea spre El.",
  quizWrongB: "O emoție foarte puternică, obligatorie.",
  quizExplanation: "Rugăciunea exprimă credința; nu este o incantație. Iisus mântuiește, nu formula.",
  help: [
    "Dacă vrei să spui da, poți vorbi cu El în cuvintele tale chiar acum.",
    "Dacă nu înțelegi, continuă să întrebi și vorbește cu un creștin matur. Dacă nu ești pregătit, nimic nu se publică și nu primești presiune.",
  ],
  step: "Alege răspunsul cinstit. Dacă spui da, spune rugăciunea următoare rar și oprește-te unde ai nevoie de propriile cuvinte.",
  prayer: "Iisuse, recunosc că am păcătuit și că am nevoie de Tine. Cred că ai murit și ai înviat. Mă întorc spre Tine, primesc iertarea Ta și Îți încredințez viața mea. Învață-mă să Te urmez.",
  journal: "Ce te apropie de Iisus și ce întrebare sau teamă te ține încă la distanță?",
  memoryText: "Tuturor celor ce L-au primit le-a dat dreptul să devină copii ai lui Dumnezeu.",
})

export const fund_l8 = makeFoundationLesson({
  id: "fund_l8", order: 8, title: "Ce urmează mâine", minutes: 9,
  refs: ["2 Corinteni 5:17", "Romani 8:15-16", "Ioan 13:34-35", "Matei 28:19"], memoryRef: "2 Corinteni 5:17",
  checkIn: "Ce simți când te gândești la ziua de mâine cu Dumnezeu?",
  hook: [
    "Viața nouă nu înseamnă că mâine nu vei mai avea lupte.",
    "Înseamnă că nu le mai porți ca un orfan care încearcă să-și câștige locul în familie.",
  ],
  choicePrompt: "Care este cea mai mare teamă după un început cu Dumnezeu?",
  choices: ["Că nu voi putea ține.", "Că voi cădea din nou.", "Că oamenii mă vor judeca.", "Nu știu ce să fac practic."],
  struggle: [
    "Lumea spune: ai luat o hotărâre, acum demonstrează.",
    "Evanghelia spune: ai fost primit, acum învață să umbli ca un copil iubit, împreună cu alții.",
  ],
  scriptureText: "Dacă este cineva în Hristos, este o făptură nouă; cele vechi s-au dus și toate s-au făcut noi.",
  scriptureRef: "2 Corinteni 5:17",
  truth: [
    "Nu trăiești ca să devii copil al lui Dumnezeu. Înveți să trăiești pentru că ai fost primit.",
    "Primele ritmuri sunt simple: vorbește cu El, citește Scriptura, caută o biserică sănătoasă și spune unui om de încredere.",
  ],
  quizQuestion: "Care este ordinea vieții creștine?",
  quizWrongA: "Te schimbi complet și apoi Dumnezeu te primește.", quizCorrect: "Dumnezeu te primește în Hristos și apoi te crește.",
  quizWrongB: "Primești iertarea și rămâi intenționat neschimbat.",
  quizExplanation: "Harul nu este nici plată pentru performanță, nici permisiune pentru nepăsare. Este începutul unei vieți noi cu Dumnezeu.",
  help: [
    "Duhul Sfânt nu te lasă să crești singur, iar Biserica nu este un accesoriu opțional, ci un trup de oameni în care înveți să iubești.",
    "Despre forma și momentul botezului există diferențe între creștini; vorbește cu o biserică locală sănătoasă. Aplicația nu înlocuiește păstorirea și comunitatea.",
  ],
  step: "În următoarele 24 de ore, spune unui om de încredere ce ai înțeles și citește primul capitol din Evanghelia după Ioan.",
  prayer: "Tată, Îți mulțumesc că nu mă primești ca pe un angajat, ci ca pe un copil. Dă-mi oameni, rădăcini și putere să merg cu Tine și mâine.",
  journal: "Care sunt cele trei ritmuri concrete pe care le vei începe: rugăciune, Scriptură și comunitate?",
  memoryText: "Dacă este cineva în Hristos, este o făptură nouă.",
})

export const FUNDAMENTUL_LESSONS: Lesson[] = [
  fund_l1,
  fund_l2,
  fund_l3,
  fund_l4,
  fund_l5,
  fund_l6,
  fund_l7,
  fund_l8,
]
