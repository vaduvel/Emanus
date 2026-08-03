import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 1 din docs/41-module-teme-poonen.md: "Originea răului și puterea alegerii".
 * Temele 1-5 din seria de bază a lui Zac Poonen.
 *
 * Sursa: Zac Poonen, "Basic Christian Teachings", capitolele 1-5 (cfcindia.com).
 * Conținutul este tradus fidel din textul autorului: ideile, doctrina, argumentele
 * și ilustrațiile îi aparțin lui și sunt păstrate ca atare, fără modificare.
 * Vezi docs/42-sursa-si-atribuire-poonen.md pentru nota de drepturi de autor.
 *
 * Stare: in_review. Nu devine public înaintea reviziei umane finale.
 */

type Input = {
  id: string
  order: number
  title: string
  refs: string[]
  ref: string
  hook: string
  word: string
  truth: string[]
  wrongA: string
  wrongB: string
  right: string
  explanation: string
  step: string
  prayer: string
  journal: string
  memory: string
}

const COURSE_ID = "teme_c1_origine"

const b = (...text: string[]) => text.map((line) => ({ from: "guide" as const, text: line }))

function make(i: Input): Lesson {
  const p = i.id.replace(/_/g, "")
  const steps: LessonStep[] = [
    { id: `${p}h`, type: "hook", order: 1, bubbles: b(i.hook) },
    {
      id: `${p}c`,
      type: "choice",
      order: 2,
      choice: {
        prompt: "Unde te așezi acum?",
        options: [
          { id: `${p}c1`, label: "Nu m-am gândit niciodată la asta." },
          { id: `${p}c2`, label: "M-am întrebat, dar n-am avut răspuns." },
          { id: `${p}c3`, label: "Vreau să înțeleg temeinic." },
        ],
      },
    },
    { id: `${p}s`, type: "scripture", order: 3, scripture: { text: i.word, ref: i.ref } },
    { id: `${p}t`, type: "truth_simple", order: 4, bubbles: b(...i.truth) },
    {
      id: `${p}q`,
      type: "quiz",
      order: 5,
      quiz: {
        question: "Care este răspunsul așezat?",
        options: [
          { text: i.wrongA, correct: false },
          { text: i.right, correct: true },
          { text: i.wrongB, correct: false },
        ],
        explanation: i.explanation,
      },
    },
    {
      id: `${p}a`,
      type: "how_god_helps",
      order: 6,
      bubbles: b(
        "Dumnezeu nu ți-a arătat aceste lucruri ca să te lase singur cu ele.",
        "Hristos a venit nu doar să ne arate ce este bine, ci și să ne ajute să alegem binele.",
      ),
    },
    { id: `${p}p`, type: "step", order: 7, bubbles: b(i.step) },
    { id: `${p}r`, type: "prayer", order: 8, bubbles: b(i.prayer) },
    { id: `${p}j`, type: "journal", order: 9, journalPrompt: i.journal },
    { id: `${p}m`, type: "memory_verse", order: 10, scripture: { text: i.memory, ref: i.ref } },
  ]
  return {
    id: i.id,
    courseId: COURSE_ID,
    order: i.order,
    title: i.title,
    estMinutes: 9,
    anchorRefs: i.refs,
    memoryVerseRef: i.ref,
    steps,
  }
}

export const ORIGINEA_RAULUI_LESSONS: Lesson[] = [
  make({
    id: "origine_l1",
    order: 1,
    title: "Originea răului",
    refs: ["Ezechiel 28:12-15", "1 Ioan 3:8", "Geneza 1:1"],
    ref: "Ezechiel 28:15",
    hook: "Cum a început răul într-o lume creată de un Dumnezeu desăvârșit de bun și plin de înțelepciune? De ce a îngăduit Dumnezeu ca răul să existe și să se răspândească atât de mult?",
    word: "Ai fost fără prihană în căile tale, din ziua când ai fost făcut, până în ziua când s-a găsit nelegiuirea în tine.",
    truth: [
      "Mintea noastră nu ne poate spune singură cum este Dumnezeu. Un câine nu poate înțelege un om, pentru că omul este mai sus decât el în rândul făptu­rilor. La fel, nu-L putem înțelege pe Dumnezeu dacă nu ni Se descoperă El însuși. Și S-a descoperit, în Cuvântul Său.",
      "Dumnezeu i-a creat pe îngeri și pe oameni cu voie liberă. Spre deosebire de stele, plante și copaci, ei pot alege dacă ascultă sau nu. De aceea o stea sau un copac nu pot deveni rele: nu au libertatea de a alege.",
      "Dumnezeu ar fi putut face omul ca pe un robot, care nu greșește niciodată, dar ascultă orbește. Nu a vrut așa. Un robot nu poate fi copilul nimănui. Orice tată ar spune: mai bine un fiu neascultător al meu, decât un robot ascultător.",
      "Între îngeri era unul care era căpetenie: Lucifer. A fost creat desăvârșit în înțelepciune și frumusețe și i s-a dat o poziție înaltă. Dar au început să se ridice în el gânduri de mândrie, de răzvrătire și de nemulțumire față de locul pe care i-l rânduise Dumnezeu.",
      "Răul începe întotdeauna în inimă. Chiar și o crimă este întâi plangita în inimă și abia apoi iese în faptă. Așa a fost și cu Lucifer. Dar de îndată ce răul s-a ridicat în inima lui, Dumnezeu l-a văzut, și l-a alungat din prezența Sa.",
      "Răul nu este în afara controlului lui Dumnezeu. Este ceva ce El a știut că vine, a îngăduit, a primit și pentru care a pregătit o rezolvare. Rezolvarea este în Isus Hristos.",
    ],
    wrongA: "Dumnezeu a creat răul ca să ne încerce.",
    right: "Răul a apărut din libertatea de a alege, pe care Dumnezeu a dat-o ca să poată avea copii, nu roboți.",
    wrongB: "Răul există pentru că Dumnezeu nu îl poate opri.",
    explanation:
      "Voia liberă este cea dintâi condiție pentru ca cineva să fie o ființă morală. Fără ea nu există nici bine ales, nici copii ai lui Dumnezeu, ci doar mașini care se supun.",
    step: "Scrie în câteva rânduri răspunsul tău de până acum la întrebarea de ce există răul și compară-l cu ce ai citit azi.",
    prayer: "Doamne, nu Te pot înțelege cu mintea mea. Descoperă-mi-Te Tu, așa cum ai făcut-o în Cuvântul Tău.",
    journal: "Ce te-a făcut până acum să te îndoiești de bunătatea lui Dumnezeu?",
    memory: "Ai fost fără prihană în căile tale, până în ziua când s-a găsit nelegiuirea în tine.",
  }),
  make({
    id: "origine_l2",
    order: 2,
    title: "Dumnezeu face răul să lucreze spre bine",
    refs: ["1 Ioan 3:8", "Romani 8:28", "Geneza 50:20"],
    ref: "1 Ioan 3:8",
    hook: "Dacă răul a început cu căderea lui Lucifer, de ce nu l-a nimicit Dumnezeu pe loc? De ce nu îl distruge pe Satana, ca să nu mai fim chinuiți?",
    word: "Fiul lui Dumnezeu S-a arătat ca să nimicească lucrările diavolului.",
    truth: [
      "Înțelepciunea lui Dumnezeu este ca un ocean, iar mintea noastră este ca o cană mică. Încape puțin din ea. Dar cu puținul acela putem înțelege ceva.",
      "Dacă viața pe pământ ar fi fost ușoară și comodă, oamenii nu s-ar mai gândi la veșnicie. Omul nu a fost făcut doar pentru scurta lui viață de aici. Trupul piere, dar sufletul dinăuntru nu moare niciodată.",
      "Dumnezeu este atât de puternic încât poate face până și răul să lucreze la împlinirea scopurilor Sale. Nu El a creat răul. Dar când îngerii și omul au ales răul, Dumnezeu a hotărât să îl folosească pentru scopurile Lui.",
      "Poonen povestește despre un om de afaceri care se depărtase de Dumnezeu pe măsură ce îi mergea bine. Bătrânii bisericii au încercat șase ani să-l întoarcă, fără folos. Apoi un șarpe veninos l-a mușcat pe cel mai mic dintre fiii lui, și copilul s-a îmbrolnăvit greu.",
      "Când doctorii au pierdut orice nădejde, tatăl a chemat un bătrân al bisericii să se roage. Iar acela s-a rugat așa: mulțumesc că ai trimis șarpele acesta să muște copilul, pentru că ce n-am putut eu în șase ani, a făcut șarpele într-o clipă. Acum vindecă-l, și dă ca familia asta să nu mai aibă nevoie de alți șerpi ca să-și aducă aminte de Tine.",
      "Mușcătura de șarpe este rea. Dar în cazul acela Dumnezeu a folosit-o spre bine. La fel se întâmplă și cu bolile: sunt oameni care nu s-au gândit la Dumnezeu patruzeci de ani și încep să se gândească abia în spital.",
      "Am pornit cu toții în viață cu un ghem de ață înfășurat frumos. Cu anii, l-am încurcat în zece mii sau zece milioane de noduri. Vestea bună este că Isus Hristos poate dezlega fiecare nod.",
    ],
    wrongA: "Suferința este întotdeauna pedeapsă pentru un păcat anume.",
    right: "Dumnezeu nu face răul, dar îl poate întoarce spre bine și îl folosește ca să ne întoarcă la El.",
    wrongB: "Dacă Dumnezeu ar fi bun, nu ar îngădui nicio suferință.",
    explanation:
      "Nu se spune că răul este bun. Se spune că Dumnezeu este atât de puternic încât poate scoate bine din ceea ce Satana a făcut spre distrugere. Așa Îl face de rușine pe cel rău, iar și iar.",
    step: "Numește un lucru greu din viața ta și întreabă-te cinstit dacă te-a apropiat sau te-a depărtat de Dumnezeu.",
    prayer: "Doamne Isuse, Tu ai venit să nimicești lucrările diavolului. Nimicește-le și în viața mea.",
    journal: "Ce nod din ghemul vieții tale ți se pare cel mai imposibil de dezlegat?",
    memory: "Fiul lui Dumnezeu S-a arătat ca să nimicească lucrările diavolului.",
  }),
  make({
    id: "origine_l3",
    order: 3,
    title: "Puterea alegerii",
    refs: ["Geneza 2:16-17", "Geneza 3:1-7", "Evrei 5:14"],
    ref: "Geneza 2:16",
    hook: "De ce se poartă unii oameni ca animalele? Pentru că îi interesează doar nevoile trupului și viața de aici, nu și lucrurile lui Dumnezeu și veșnicia.",
    word: "Poți să mănânci după plăcere din orice pom din grădină; dar din pomul cunoștinței binelui și răului să nu mănânci.",
    truth: [
      "Faptul că suntem mai deștepți decât animalele nu ne face neapărat mai buni decât ele. Este mare deosebire între a fi mai deștept și a fi mai bun. Oameni învățați și inteligenți sunt adesea robi ai lăcomiei, ai poftei, ai mâniei și ai egoismului.",
      "În om este o parte mai adâncă decât mintea și decât sufletul: duhul. Duhul este cel care ne face conștienți că există Dumnezeu. Niciun animal nu are așa ceva.",
      "Ca să afli dacă fiul tău este ascultător, nu-i spui: fă tot ce vrei până ne întoarcem. Îi spui: poți face orice în casa asta, în afară de un singur lucru. Abia o singură opreliștea arată dacă ascultă sau nu.",
      "Așa a făcut și Dumnezeu. I-a așezat pe Adam și pe Eva într-o grădină și le-a spus că pot mânca din orice pom, afară de unul singur. Nu a plantat o mie de pomi și le-a interzis nouă sute nouăzeci și nouă. Ar fi fost greu. Nu a fost așa.",
      "Ispita este necesară ca omul să devină sfânt. Când spune nu ispitei, devine sfânt. Când spune da, păcătuiește. Alegerea aceea era necesară.",
      "Este mare deosebire între nevinovăție și sfințenie. Nevinovăția se vede la un prunc: nu știe nici binele, nici răul. Adam, deși era ca un om în toată firea, era într-un fel ca un prunc. Trebuia să aleagă să refuze răul și să-L aleagă pe Dumnezeu, ca să ajungă bărbat duhovnicesc și matur.",
      "De fiecare dată când spui nu unei ispite, îți clădești caracterul. Omul care ești astăzi este rezultatul tuturor hotărârilor pe care le-ai luat până acum. Nu putem face nimic în privința trecutului, dar putem face ceva în privința viitorului.",
    ],
    wrongA: "Dacă aș fi ferit de ispite, aș fi un om mai bun.",
    right: "Caracterul se clădește tocmai prin ispita atrăgătoare căreia îi spui nu.",
    wrongB: "Alegerile mici de azi nu contează pentru cine voi fi.",
    explanation:
      "Nu există virtute în alegerea binelui dacă nu există și o alegere alternativă, la fel de atrăgătoare. De aceea pomul oprit era frumos, nu hidos.",
    step: "Alege o ispită concretă căreia să-i spui nu astăzi, cu bună știință, și observă ce se clădește în tine.",
    prayer: "Doamne, nu pot schimba anii trecuți, dar vreau să fac ceva cu cei care vin. Ajută-mă să aleg ce Îți place Ție.",
    journal: "Care hotărâre din trecutul tău te-a format cel mai mult, în bine sau în rău?",
    memory: "Poți să mănânci din orice pom din grădină; dar din pomul acela să nu mănânci.",
  }),
  make({
    id: "origine_l4",
    order: 4,
    title: "Păcatul vine din necredință",
    refs: ["Geneza 3:1-6", "Evrei 3:18-19", "Romani 14:23"],
    ref: "Evrei 3:19",
    hook: "Adam și Eva au păcătuit, în fond, pentru că nu au crezut că Dumnezeu este bun, că îi iubește și că poruncile Lui sunt spre binele lor.",
    word: "Vedem dar că n-au putut să intre din pricina necredinței lor.",
    truth: [
      "Așa vine Satana întotdeauna. Când ispitește pe cineva la rău, nu-i spune niciodată despre urmări. Când ispitește pe un om la prima băutură, nu-i spune cum va ajunge rob băuturii, cum își va risipi banii, cum își va distruge familia. Îi spune doar că îi va face plăcere.",
      "Ispita oferă întotdeauna o plăcere oprită. Dar omul cu judecată se gândește la urmări. Dacă te gândești la ce va ieși din fapta ta, sunt multe lucruri pe care nu le vei face.",
      "Adam și Eva au luat în ziua aceea o hotărâre cu urmări pentru toată viața, nu doar pentru ei, ci și pentru copiii și nepoții lor. Toate hotărârile noastre au urmări. Culegem ce semănăm. Și invers: dacă semeni bine, copiii tăi vor culege rodul bun.",
      "Dumnezeu i-a iubit. Le dăduse trupul, sănătatea, viața, grădina, și i-i dăduse unul altuia. Ar fi trebuit să gândească: Dumnezeu este atât de bun, dacă ne oprește de la ceva, trebuie să fie pentru un motiv foarte bun. Dacă ar fi avut credința aceasta, nu s-ar fi rătăcit.",
      "Păcatul începe cu necredința în dragostea desăvârșită a lui Dumnezeu. De acolo vine neascultarea. De aceea, în Biblie, credința în Dumnezeu și ascultarea de poruncile Lui merg întotdeauna împreună. La fel merg împreună și necredința, și neascultarea.",
      "Când copiii sunt mici, nu vor să meargă la școală. Uneori plâng. Poate cred că tata și mama sunt aspri. Dar noi știm ce este bine pentru ei. La fel, dacă putem crede în Dumnezeu, vom înțelege că tot ce ne spune este spre binele nostru.",
    ],
    wrongA: "Păcatul este în primul rând o faptă rea pe dinafară.",
    right: "Păcatul începe cu necredința că Dumnezeu este bun și că poruncile Lui sunt spre binele meu.",
    wrongB: "Dacă m-aș strădui mai mult, aș înceta să păcătuiesc.",
    explanation:
      "Neascultarea este rodul necredinței, așa cum ascultarea este rodul credinței. Cine crede cu adevărat că tot ce a oprit Dumnezeu îi face rău, se va bucura să se ferească de toate.",
    step: "Numește o poruncă a lui Dumnezeu pe care o ocolești și întreabă-te ce anume nu crezi despre bunătatea Lui în punctul acela.",
    prayer: "Doamne Isuse, ajută-mă să las tot ce îmi spui să las și să fac tot ce îmi spui să fac. Cred că ești un Dumnezeu bun.",
    journal: "În ce parte a vieții tale te porți ca și cum Dumnezeu ți-ar vrea răul?",
    memory: "N-au putut să intre din pricina necredinței lor.",
  }),
  make({
    id: "origine_l5",
    order: 5,
    title: "Rolul conștiinței",
    refs: ["Luca 11:34-36", "1 Ioan 1:9", "1 Timotei 4:2"],
    ref: "Luca 11:34",
    hook: "Cel mai mare dar pe care l-a așezat Dumnezeu în lăuntrul omului este ceva la care ne gândim rar. Și fiindcă îl trecem cu vederea, aduce multă suferință în viața noastră.",
    word: "Ochiul este lumina trupului tău. Dacă ochiul tău este sănătos, tot trupul tău este plin de lumină.",
    truth: [
      "Conștiința ne arată unde rămânem sub măsura lui Dumnezeu. Nu este o călăuză desăvârșită, dar este cea dintâi. Conștiința copiilor mici este foarte gingașă: unui copil îi este greu să mintă fără să i se citească pe față.",
      "Pe măsură ce creștem, omorâm atât de mult glasul acesta încât poate veni o zi când mințim fără să clipim. Atunci putem spune că ne-a murit conștiința.",
      "Conștiința este ca durerea. Puțini își dau seama ce mare binecuvântare este durerea. Ea ne spune că ceva nu este în regulă. Dacă îți intră un cui în talpă, durerea te face să te așezi și să-l scoți; altfel piciorul s-ar infecta.",
      "Gândiți-vă la cei bolnavi de lepră. Lepra ucide nervii și distruge simțirea pielii. Un lepros poate călca pe un cui și să nu știe. Poonen spune că a auzit de leproși cărora șobolanii le-au ros degetele de la picioare în timpul nopții, iar ei n-au simțit nimic. Este oare o stare bună aceea în care nu simți durere?",
      "Dacă nesocotești glasul conștiinței, nu moare dintr-o dată. Dar după o vreme nu te va mai mustra deloc. Atunci ne îmbrolnăvim de lepră duhovnicească: nu mai simțim nimic la păcat.",
      "Isus a spus să ne păstrăm conștiința așa cum ne păstrăm ochii. Pe trup putem purta praf zile întregi fără să pățim ceva. Dar un singur fir de praf în ochi îl poate vătăma repede. De aceea a făcut Dumnezeu ochiul să fie spălat neîncetat de lacrimi, de mii de ori pe zi.",
      "A păstra conștiința curată înseamnă: când ai greșit, recunoști și îndrepți. Dacă ai rănit pe cineva, mergi și-i ceri iertare. Dacă ai păcătuit împotriva lui Dumnezeu, Îi mărturisești. Doar cel care își dă seama că este bolnav merge la doctor.",
    ],
    wrongA: "Dacă nu mă mai mustră conștiința, înseamnă că sunt în regulă.",
    right: "Conștiința este ca durerea: când nu mai simte, nu e semn de sănătate, ci de amorțire.",
    wrongB: "Faptele bune și daniile îmi pot curăța conștiința.",
    explanation:
      "Nicio faptă bună și niciun ban dat săracilor nu curăță conștiința de păcat. Doar recunoașterea, mărturisirea și iertarea primită de la Hristos o fac.",
    step: "Adu-ți aminte de un lucru pe care conștiința ți l-a semnalat și l-ai trecut cu vederea. Recunoaște-l azi și, dacă ai rănit pe cineva, îndreaptă.",
    prayer: "Doamne, trezește-mi conștiința acolo unde am amorțit-o și dă-mi curajul să îndrept ce am stricat.",
    journal: "La ce lucru nu te mai mustră conștiința, deși știi că ar trebui?",
    memory: "Dacă ochiul tău este sănătos, tot trupul tău este plin de lumină.",
  }),
]
