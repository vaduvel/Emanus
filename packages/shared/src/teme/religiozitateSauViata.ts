import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 4 din docs/41-module-teme-poonen.md: "Religiozitate sau viață".
 * Temele 13-16.
 *
 * Sursa: Zac Poonen, "Basic Christian Teachings", capitolele 13-16 (cfcindia.com).
 * Tradus fidel din textul autorului. Vezi docs/42-sursa-si-atribuire-poonen.md.
 * Stare: in_review.
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

const COURSE_ID = "teme_c4_religiozitate"

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
        prompt: "Fii cinstit cu tine acum:",
        options: [
          { id: `${p}c1`, label: "Cred că sunt mai mult religios." },
          { id: `${p}c2`, label: "Nu știu să fac deosebirea." },
          { id: `${p}c3`, label: "Vreau viață, nu formă." },
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
        "Dumnezeu nu cere întâi sfințenie. Cere întâi cinste.",
        "Cel care recunoaște ce este în inima lui poate fi dus mai departe de Duhul Sfânt.",
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

export const RELIGIOZITATE_SAU_VIATA_LESSONS: Lesson[] = [
  make({
    id: "relig_l1",
    order: 1,
    title: "Religiozitate și viață duhovnicească",
    refs: ["2 Timotei 3:1-5", "2 Corinteni 11:14", "2 Corinteni 3:6", "Ioan 6:63"],
    ref: "2 Timotei 3:5",
    hook: "În zilele din urmă vor fi mulți care au o formă de evlavie, dar îi tăgăduiesc puterea. Deosebirea dintre a fi religios și a fi duhovnicesc este una de care depinde totul.",
    word: "Având doar o formă de evlavie, dar tăgăduindu-i puterea.",
    truth: [
      "Dacă cineva vrea să otrăvească pe altul, nu-i dă un pahar plin de otravă, ci un pahar de lapte cu două-trei picături. Este de ajuns. Așa face și Satana: nu vine propovăduind păcatul pe față. Vine ca un înger de lumină.",
      "Când vine ca leu, ca balaur sau ca șarpe, îl recunoaștem. Ne poate speria, dar nu ne poate înșela. Când vine ca înger de lumină, atunci putem fi înșelați.",
      "Religiozitatea este omenească; viața duhovnicească este de sus, dumnezeiască. Legea nu putea face pe nimeni duhovnicesc, pentru că cerea doar potrivirea cu niște măsuri din afară.",
      "Un om poate merge regulat la adunări, poate împlini tot ce cere adunarea lui pe dinafară, poate fi chiar bătrân sau membru în conducere, și să nu fie deloc duhovnicesc. Ar fi echivalentul fariseilor din vremea lui Isus: împlineau tot pe dinafară, dar nu-L iubeau pe Dumnezeu cu toată inima. Iubeau banii.",
      "Oamenii religioși se pot ruga, pot citi Biblia zilnic, pot posti nopți întregi, pot da zeciuială și pot împărți broșuri, și în același timp pot căuta cinstea de la oameni, pot trăi pentru ei înșiși, pot iubi banii și pot bârfi. Nu par să vadă contrazicerea.",
      "Dacă te interesează mai mult părerea oamenilor despre tine decât părerea lui Dumnezeu, se prea poate, prietene, că ești doar religios.",
      "Un om duhovnicesc ține mai mult la părerea lui Dumnezeu despre viața lui decât la părerea tuturor oamenilor. Felul în care se poartă cu soția și cu copiii acasă cântărește mai mult pentru el decât dacă predică duminică dimineața.",
      "Dacă îți pregătești cu multă grijă predica de duminică, dar nu ai grijă cum îi vorbești soției tale acasă, ești probabil doar religios.",
    ],
    wrongA: "Cine face multe lucrări creștine este duhovnicesc.",
    right: "Deosebirea o fac prioritățile și inima, nu activitățile.",
    wrongB: "Religiozitatea înseamnă doctrină greșită.",
    explanation:
      "Poți lua litera Scripturii și să o împlinești până la ultimul amănunt, și să fii doar un om religios. Trebuie mai mult: o inimă întoarsă spre Dumnezeu.",
    step: "Întreabă-te azi, la o singură faptă bună pe care o faci: o fac pentru ochii oamenilor sau pentru Dumnezeu?",
    prayer: "Doamne, nu vreau să placi oamenilor. Vreau să-Ți plac Ție. Arată-mi unde am doar formă.",
    journal: "Ce faci cu grijă când te văd oamenii și neglijezi când nu te vede nimeni?",
    memory: "Având doar o formă de evlavie, dar tăgăduindu-i puterea.",
  }),
  make({
    id: "relig_l2",
    order: 2,
    title: "Minimul sau maximul pentru Domnul",
    refs: ["Matei 5:21-28", "2 Timotei 3:5", "Evrei 8:6"],
    ref: "Matei 5:22",
    hook: "Un salariat lucrează pentru leafă și numără orele. Un fiu rămâne și după program, dacă este de lucru. Aceeași deosebire este între a fi rob și a fi fiu.",
    word: "Dar Eu vă spun că oricine se mânie pe fratele său va cădea sub pedeapsa judecății.",
    truth: [
      "Sub vechea înțelegere, omul era ca un rob. Un rob nu-și poate numi stăpânul tată. De aceea iudeii nu-L puteau numi pe Dumnezeu Tată. Când a venit Isus, i-a strâns pe ucenici și i-a învățat să se roage: Tatăl nostru care ești în ceruri.",
      "A fi fiu al lui Dumnezeu este mai mult decât a fi rob al lui Dumnezeu și mai mult decât a fi prieten al lui Dumnezeu. Avraam a fost numit prietenul lui Dumnezeu. Dar dacă un om bogat spune acesta este prietenul meu și acesta este fiul meu, știi cine primește moștenirea.",
      "Un rob se gândește la minimul pe care trebuie să-l facă. Un fiu se gândește la maximul pe care îl poate face ca să-i placă tatălui său.",
      "De aceea, în Predica de pe munte, Isus arată duhul din spatele poruncilor. Să nu ucizi - acesta este minimul. Care este maximul? Să nu te mânii nici măcar pe fratele tău. De unde vine uciderea? Din mânie.",
      "La fel cu preacurvia. Sub Lege, se cerea ferirea de faptă. Acesta era minimul. Fiul se gândește la ce este în spate: să nu fiu necurat nici în gânduri și în atitudini.",
      "Legătura noastră cu Hristos este ca a unei mirese cu mirele ei. Aceasta este creștinismul adevărat: este o căsătorie, nu o religie. Nu este închinarea la o carte, ci unirea cu o Persoană. Oamenii religioși se închină unei cărți.",
      "Gândiți-vă la doi logodnici care se iubesc mult. Când au prilejul să fie împreună, se gândesc la timpul minim? Se uită la ceas și spun: gata, zece minute, ajunge? Nu, li se pare că nici cinci ore nu ajung. Când își scriu, scriu o jumătate de pagină? Poate scriu douăzeci și cinci de pagini, și a doua zi încă douăzeci și cinci.",
    ],
    wrongA: "Datoria mea este să nu încalc poruncile.",
    right: "Fiul se întreabă care este maximul pe care îl poate face ca să-I placă Tatălui.",
    wrongB: "Dumnezeu cere de la fiecare același minim.",
    explanation:
      "Adevărata viață duhovnicească este rodul unei legături de dragoste cu Hristos. Religiozitatea este o legătură formală, de rob față de stăpân.",
    step: "Ia o poruncă pe care o ții pe dinafară și întreabă-te ce ar însemna maximul în privința ei.",
    prayer: "Doamne, nu vreau să Îți slujesc cu duh de rob. Fă-mă fiu, care caută ce Îți place cel mai mult.",
    journal: "Unde te-ai mulțumit cu minimul în umblarea ta cu Dumnezeu?",
    memory: "Oricine se mânie pe fratele său va cădea sub pedeapsa judecății.",
  }),
  make({
    id: "relig_l3",
    order: 3,
    title: "Fiu sau slujitor",
    refs: ["Luca 9:23", "Matei 6:9-13", "Geneza 3:7", "Geneza 3:21"],
    ref: "Luca 9:23",
    hook: "Un om poate fi religios și totuși cu totul egoist, gândindu-se mereu la câștigul lui. Când devine duhovnicesc, se gândește la ce câștigă Dumnezeu.",
    word: "Dacă voiește cineva să vină după Mine, să se lepede de sine, să-și ia crucea în fiecare zi și să Mă urmeze.",
    truth: [
      "În rugăciunea pe care a învățat-o Isus sunt șase cereri. Cele dintâi trei privesc pe Dumnezeu: Numele Lui, Împărăția Lui, voia Lui. Următoarele trei ne privesc pe noi: pâinea, iertarea, izbăvirea. Așa se roagă cine pune întâi slava lui Dumnezeu.",
      "Cercetează-ți rugăciunile din ultimul an. Pentru ce ai cerut de fapt? Dacă ești cinstit, vei descoperi cât de mult se învârt în jurul tău și al familiei tale.",
      "Un om religios face fapte religioase ca să-și liniștească conștiința, dar în mijlocul vieții lui, pe tron, stă tot EUL. De aceea a spus Isus că nu poți fi ucenicul Lui dacă nu-ți iei crucea și nu te lepezi de tine în fiecare zi.",
      "Un om poate merge la șase-șapte adunări pe săptămână, poate merge în evanghelizare, poate fi chiar lucrător cu timp deplin, și să fie doar religios.",
      "Omul religios gândește așa când vine la Hristos: ce pot lua eu de la Domnul? Iertare? Da, vreau. Vindecare? Aș vrea. Cerul? Îl vreau. Binecuvântare materială? Mi-ar plăcea mult. Ungere ca să fiu un predicator mare și vestit? Aș vrea și asta.",
      "Un om duhovnicesc nu se întreabă ce poate primi de la Domnul, ci: ce poate primi Domnul de la mine? Ce poate scoate El din această singură viață pământească a mea?",
      "Doi oameni pot sta unul lângă altul în aceeași adunare și nu-i poți deosebi, pentru că este o chestiune de atitudine a inimii. Motivul hotărăște dacă lucrul este duhovnicesc, nu fapta.",
      "Când a păcătuit, Adam s-a acoperit cu frunze de smochin. Frunzele de smochin sunt chipul religiozității, cu care omul încearcă să arate bine înaintea lui Dumnezeu și a oamenilor. Când a văzut Isus un smochin plin de frunze și fără rod, l-a blestemat. Este un blestem peste religiozitate.",
      "Dumnezeu i-a luat lui Adam frunzele și i-a dat o îmbrăcăminte de piele, junghiind un animal. Este chipul lui Dumnezeu care ne dă firea Lui, firea lui Hristos.",
    ],
    wrongA: "Cine face mai multă lucrare are inima mai bună.",
    right: "Motivul, nu fapta, arată dacă lucrul este duhovnicesc; întrebarea este cine stă pe tron.",
    wrongB: "Lepădarea de sine este pentru cei chemați în slujire.",
    explanation:
      "Isus și fariseii mergeau la aceeași sinagogă, citeau aceeași Scriptură și predicau. Deosebirea nu era în fapte, ci în inimă.",
    step: "Scrie ultimele cinci lucruri pe care I le-ai cerut lui Dumnezeu și numără câte erau pentru tine.",
    prayer: "Doamne, vreau să Te bucuri Tu de viața mea, nu doar eu de darurile Tale. Ia-mă în stăpânire cu totul.",
    journal: "Ce ai cere de la Dumnezeu dacă nu ai mai cere nimic pentru tine?",
    memory: "Să se lepede de sine, să-și ia crucea în fiecare zi și să Mă urmeze.",
  }),
  make({
    id: "relig_l4",
    order: 4,
    title: "A zecea poruncă",
    refs: ["Exodul 20:17", "Romani 7:7-8", "Romani 8:2", "Filipeni 3:6"],
    ref: "Romani 7:7",
    hook: "Nouă dintre cele zece porunci pot fi ținute de oricine, fără ajutorul Duhului Sfânt. A zecea, nu. Și tocmai de aceea a fost dată.",
    word: "N-aș fi cunoscut pofta, dacă Legea nu mi-ar fi spus: Să nu poftești!",
    truth: [
      "Legea a fost dată ca să dea pe față păcatul și ca să încerce omul: câți se vor mulțumi cu o neprihănire din afară, care aduce cinstea oamenilor, și câți vor căuta pe Dumnezeu pentru curăția dinăuntru.",
      "Fariseii curățau partea de afară a paharului. Dumnezeu vede inima și vrea curățată partea dinăuntru.",
      "Fariseii aveau învățătura corectă. Isus le-a spus chiar ucenicilor să facă ce învață ei, dar să nu se ia după faptele lor. Deci poți avea toată învățătura corectă și să fii doar religios.",
      "Să nu ai alți dumnezei, să nu-ți faci idoli, să nu iei Numele Lui în deșert, să ții ziua de odihnă, să cinstești pe tatăl și pe mama ta, să nu ucizi, să nu preacurvești, să nu furi, să nu mărturisești strâmb - acestea sunt nouă, și orice om le poate ține cu puterea lui.",
      "A zecea nu privește ce se vede: să nu poftești casa aproapelui tău, nici nevasta lui. Nimeni nu poate afla din afară dacă ai ținut-o sau nu.",
      "Pavel spunea că, după neprihănirea din Lege, era fără vină. Ce înseamnă? Că a ținut toate zece? Nu, a ținut nouă. A zecea nu o putea ține nimeni.",
      "Și Pavel a fost cinstit. A spus: când a venit porunca aceasta, am descoperit în inima mea tot felul de pofte. Credeam că trăiesc, dar eram mort în păcat.",
      "De ce a dat Dumnezeu o poruncă pe care știa că nimeni n-o poate ține? Ca să vadă câți oameni vor fi cinstiți și vor recunoaște că aici rămân sub măsură.",
      "Dumnezeu nu-ți cere să fii întâi sfânt; nimeni nu poate. Nu-ți cere nici să fii întâi iubitor sau smerit, pentru că toate acestea cer timp. Un singur lucru poți fi chiar azi, și acela este cel dintâi pas spre viața duhovnicească: cinstea.",
    ],
    wrongA: "Primul pas spre sfințenie este să te străduiești mai mult.",
    right: "Primul pas este cinstea: să recunoști ce este cu adevărat în inima ta.",
    wrongB: "Cine ține poruncile pe dinafară este primit de Dumnezeu.",
    explanation:
      "Fariseilor le-a spus, cu ironie: n-am venit pentru cei sănătoși. Nu îi ajută pe cei nesinceri. Tocmai fiindcă Pavel a fost cinstit, a aflat puterea Duhului care îl izbăvește chiar și de pofta din inimă.",
    step: "Spune-I lui Dumnezeu, pe nume, o poftă din inima ta pe care nu ai mărturisit-o niciodată.",
    prayer: "Doamne, în mine este tot felul de poftă. Iartă-mă, curăță-mă cu sângele Tău și umple-mă cu Duhul Tău. Nu vreau să mai fiu nesincer.",
    journal: "Ce râvnești în taină, din ce este al altuia?",
    memory: "N-aș fi cunoscut pofta, dacă Legea nu mi-ar fi spus: Să nu poftești!",
  }),
]
