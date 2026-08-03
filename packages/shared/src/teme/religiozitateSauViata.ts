import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 4 din docs/41-module-teme-poonen.md: "Religiozitate sau viata".
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
          { id: `${p}c1`, label: "Cred ca sunt mai mult religios." },
          { id: `${p}c2`, label: "Nu stiu sa fac deosebirea." },
          { id: `${p}c3`, label: "Vreau viata, nu forma." },
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
        question: "Care este raspunsul asezat?",
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
        "Dumnezeu nu cere intai sfintenie. Cere intai cinste.",
        "Cel care recunoaste ce este in inima lui poate fi dus mai departe de Duhul Sfant.",
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
    title: "Religiozitate si viata duhovniceasca",
    refs: ["2 Timotei 3:1-5", "2 Corinteni 11:14", "2 Corinteni 3:6", "Ioan 6:63"],
    ref: "2 Timotei 3:5",
    hook: "In zilele din urma vor fi multi care au o forma de evlavie, dar ii tagaduiesc puterea. Deosebirea dintre a fi religios si a fi duhovnicesc este una de care depinde totul.",
    word: "Avand doar o forma de evlavie, dar tagaduindu-i puterea.",
    truth: [
      "Daca cineva vrea sa otraveasca pe altul, nu-i da un pahar plin de otrava, ci un pahar de lapte cu doua-trei picaturi. Este de ajuns. Asa face si Satana: nu vine propovaduind pacatul pe fata. Vine ca un inger de lumina.",
      "Cand vine ca leu, ca balaur sau ca sarpe, il recunoastem. Ne poate speria, dar nu ne poate insela. Cand vine ca inger de lumina, atunci putem fi inselati.",
      "Religiozitatea este omeneasca; viata duhovniceasca este de sus, dumnezeiasca. Legea nu putea face pe nimeni duhovnicesc, pentru ca cerea doar potrivirea cu niste masuri din afara.",
      "Un om poate merge regulat la adunari, poate implini tot ce cere adunarea lui pe dinafara, poate fi chiar batran sau membru in conducere, si sa nu fie deloc duhovnicesc. Ar fi echivalentul fariseilor din vremea lui Isus: implineau tot pe dinafara, dar nu-L iubeau pe Dumnezeu cu toata inima. Iubeau banii.",
      "Oamenii religiosi se pot ruga, pot citi Biblia zilnic, pot posti nopti intregi, pot da zeciuiala si pot imparti brosuri, si in acelasi timp pot cauta cinstea de la oameni, pot trai pentru ei insisi, pot iubi banii si pot barfi. Nu par sa vada contrazicerea.",
      "Daca te intereseaza mai mult parerea oamenilor despre tine decat parerea lui Dumnezeu, se prea poate, prietene, ca esti doar religios.",
      "Un om duhovnicesc tine mai mult la parerea lui Dumnezeu despre viata lui decat la parerea tuturor oamenilor. Felul in care se poarta cu sotia si cu copiii acasa cantareste mai mult pentru el decat daca predica duminica dimineata.",
      "Daca iti pregatesti cu multa grija predica de duminica, dar nu ai grija cum ii vorbesti sotiei tale acasa, esti probabil doar religios.",
    ],
    wrongA: "Cine face multe lucrari crestine este duhovnicesc.",
    right: "Deosebirea o fac prioritatile si inima, nu activitatile.",
    wrongB: "Religiozitatea inseamna doctrina gresita.",
    explanation:
      "Poti lua litera Scripturii si sa o implinesti pana la ultimul amanunt, si sa fii doar un om religios. Trebuie mai mult: o inima intoarsa spre Dumnezeu.",
    step: "Intreaba-te azi, la o singura fapta buna pe care o faci: o fac pentru ochii oamenilor sau pentru Dumnezeu?",
    prayer: "Doamne, nu vreau sa placi oamenilor. Vreau sa-Ti plac Tie. Arata-mi unde am doar forma.",
    journal: "Ce faci cu grija cand te vad oamenii si neglijezi cand nu te vede nimeni?",
    memory: "Avand doar o forma de evlavie, dar tagaduindu-i puterea.",
  }),
  make({
    id: "relig_l2",
    order: 2,
    title: "Minimul sau maximul pentru Domnul",
    refs: ["Matei 5:21-28", "2 Timotei 3:5", "Evrei 8:6"],
    ref: "Matei 5:22",
    hook: "Un salariat lucreaza pentru leafa si numara orele. Un fiu ramane si dupa program, daca este de lucru. Aceeasi deosebire este intre a fi rob si a fi fiu.",
    word: "Dar Eu va spun ca oricine se manie pe fratele sau va cadea sub pedeapsa judecatii.",
    truth: [
      "Sub vechea intelegere, omul era ca un rob. Un rob nu-si poate numi stapanul tata. De aceea iudeii nu-L puteau numi pe Dumnezeu Tata. Cand a venit Isus, i-a strans pe ucenici si i-a invatat sa se roage: Tatal nostru care esti in ceruri.",
      "A fi fiu al lui Dumnezeu este mai mult decat a fi rob al lui Dumnezeu si mai mult decat a fi prieten al lui Dumnezeu. Avraam a fost numit prietenul lui Dumnezeu. Dar daca un om bogat spune acesta este prietenul meu si acesta este fiul meu, stii cine primeste mostenirea.",
      "Un rob se gandeste la minimul pe care trebuie sa-l faca. Un fiu se gandeste la maximul pe care il poate face ca sa-i placa tatalui sau.",
      "De aceea, in Predica de pe munte, Isus arata duhul din spatele poruncilor. Sa nu ucizi - acesta este minimul. Care este maximul? Sa nu te manii nici macar pe fratele tau. De unde vine uciderea? Din manie.",
      "La fel cu preacurvia. Sub Lege, se cerea ferirea de fapta. Acesta era minimul. Fiul se gandeste la ce este in spate: sa nu fiu necurat nici in ganduri si in atitudini.",
      "Legatura noastra cu Hristos este ca a unei mirese cu mirele ei. Aceasta este crestinismul adevarat: este o casatorie, nu o religie. Nu este inchinarea la o carte, ci unirea cu o Persoana. Oamenii religiosi se inchina unei carti.",
      "Ganditi-va la doi logodnici care se iubesc mult. Cand au prilejul sa fie impreuna, se gandesc la timpul minim? Se uita la ceas si spun: gata, zece minute, ajunge? Nu, li se pare ca nici cinci ore nu ajung. Cand isi scriu, scriu o jumatate de pagina? Poate scriu douazeci si cinci de pagini, si a doua zi inca douazeci si cinci.",
    ],
    wrongA: "Datoria mea este sa nu incalc poruncile.",
    right: "Fiul se intreaba care este maximul pe care il poate face ca sa-I placa Tatalui.",
    wrongB: "Dumnezeu cere de la fiecare acelasi minim.",
    explanation:
      "Adevarata viata duhovniceasca este rodul unei legaturi de dragoste cu Hristos. Religiozitatea este o legatura formala, de rob fata de stapan.",
    step: "Ia o porunca pe care o tii pe dinafara si intreaba-te ce ar insemna maximul in privinta ei.",
    prayer: "Doamne, nu vreau sa Iti slujesc cu duh de rob. Fa-ma fiu, care cauta ce Iti place cel mai mult.",
    journal: "Unde te-ai multumit cu minimul in umblarea ta cu Dumnezeu?",
    memory: "Oricine se manie pe fratele sau va cadea sub pedeapsa judecatii.",
  }),
  make({
    id: "relig_l3",
    order: 3,
    title: "Fiu sau slujitor",
    refs: ["Luca 9:23", "Matei 6:9-13", "Geneza 3:7", "Geneza 3:21"],
    ref: "Luca 9:23",
    hook: "Un om poate fi religios si totusi cu totul egoist, gandindu-se mereu la castigul lui. Cand devine duhovnicesc, se gandeste la ce castiga Dumnezeu.",
    word: "Daca voieste cineva sa vina dupa Mine, sa se lepede de sine, sa-si ia crucea in fiecare zi si sa Ma urmeze.",
    truth: [
      "In rugaciunea pe care a invatat-o Isus sunt sase cereri. Cele dintai trei privesc pe Dumnezeu: Numele Lui, Imparatia Lui, voia Lui. Urmatoarele trei ne privesc pe noi: painea, iertarea, izbavirea. Asa se roaga cine pune intai slava lui Dumnezeu.",
      "Cerceteaza-ti rugaciunile din ultimul an. Pentru ce ai cerut de fapt? Daca esti cinstit, vei descoperi cat de mult se invart in jurul tau si al familiei tale.",
      "Un om religios face fapte religioase ca sa-si linisteasca constiinta, dar in mijlocul vietii lui, pe tron, sta tot EUL. De aceea a spus Isus ca nu poti fi ucenicul Lui daca nu-ti iei crucea si nu te lepezi de tine in fiecare zi.",
      "Un om poate merge la sase-sapte adunari pe saptamana, poate merge in evanghelizare, poate fi chiar lucrator cu timp deplin, si sa fie doar religios.",
      "Omul religios gandeste asa cand vine la Hristos: ce pot lua eu de la Domnul? Iertare? Da, vreau. Vindecare? As vrea. Cerul? Il vreau. Binecuvantare materiala? Mi-ar placea mult. Ungere ca sa fiu un predicator mare si vestit? As vrea si asta.",
      "Un om duhovnicesc nu se intreaba ce poate primi de la Domnul, ci: ce poate primi Domnul de la mine? Ce poate scoate El din aceasta singura viata pamanteasca a mea?",
      "Doi oameni pot sta unul langa altul in aceeasi adunare si nu-i poti deosebi, pentru ca este o chestiune de atitudine a inimii. Motivul hotaraste daca lucrul este duhovnicesc, nu fapta.",
      "Cand a pacatuit, Adam s-a acoperit cu frunze de smochin. Frunzele de smochin sunt chipul religiozitatii, cu care omul incearca sa arate bine inaintea lui Dumnezeu si a oamenilor. Cand a vazut Isus un smochin plin de frunze si fara rod, l-a blestemat. Este un blestem peste religiozitate.",
      "Dumnezeu i-a luat lui Adam frunzele si i-a dat o imbracaminte de piele, junghiind un animal. Este chipul lui Dumnezeu care ne da firea Lui, firea lui Hristos.",
    ],
    wrongA: "Cine face mai multa lucrare are inima mai buna.",
    right: "Motivul, nu fapta, arata daca lucrul este duhovnicesc; intrebarea este cine sta pe tron.",
    wrongB: "Lepadarea de sine este pentru cei chemati in slujire.",
    explanation:
      "Isus si fariseii mergeau la aceeasi sinagoga, citeau aceeasi Scriptura si predicau. Deosebirea nu era in fapte, ci in inima.",
    step: "Scrie ultimele cinci lucruri pe care I le-ai cerut lui Dumnezeu si numara cate erau pentru tine.",
    prayer: "Doamne, vreau sa Te bucuri Tu de viata mea, nu doar eu de darurile Tale. Ia-ma in stapanire cu totul.",
    journal: "Ce ai cere de la Dumnezeu daca nu ai mai cere nimic pentru tine?",
    memory: "Sa se lepede de sine, sa-si ia crucea in fiecare zi si sa Ma urmeze.",
  }),
  make({
    id: "relig_l4",
    order: 4,
    title: "A zecea porunca",
    refs: ["Exodul 20:17", "Romani 7:7-8", "Romani 8:2", "Filipeni 3:6"],
    ref: "Romani 7:7",
    hook: "Noua dintre cele zece porunci pot fi tinute de oricine, fara ajutorul Duhului Sfant. A zecea, nu. Si tocmai de aceea a fost data.",
    word: "N-as fi cunoscut pofta, daca Legea nu mi-ar fi spus: Sa nu poftesti!",
    truth: [
      "Legea a fost data ca sa dea pe fata pacatul si ca sa incerce omul: cati se vor multumi cu o neprihanire din afara, care aduce cinstea oamenilor, si cati vor cauta pe Dumnezeu pentru curatia dinauntru.",
      "Fariseii curatau partea de afara a paharului. Dumnezeu vede inima si vrea curatata partea dinauntru.",
      "Fariseii aveau invatatura corecta. Isus le-a spus chiar ucenicilor sa faca ce invata ei, dar sa nu se ia dupa faptele lor. Deci poti avea toata invatatura corecta si sa fii doar religios.",
      "Sa nu ai alti dumnezei, sa nu-ti faci idoli, sa nu iei Numele Lui in desert, sa tii ziua de odihna, sa cinstesti pe tatal si pe mama ta, sa nu ucizi, sa nu preacurvesti, sa nu furi, sa nu marturisesti stramb - acestea sunt noua, si orice om le poate tine cu puterea lui.",
      "A zecea nu priveste ce se vede: sa nu poftesti casa aproapelui tau, nici nevasta lui. Nimeni nu poate afla din afara daca ai tinut-o sau nu.",
      "Pavel spunea ca, dupa neprihanirea din Lege, era fara vina. Ce inseamna? Ca a tinut toate zece? Nu, a tinut noua. A zecea nu o putea tine nimeni.",
      "Si Pavel a fost cinstit. A spus: cand a venit porunca aceasta, am descoperit in inima mea tot felul de pofte. Credeam ca traiesc, dar eram mort in pacat.",
      "De ce a dat Dumnezeu o porunca pe care stia ca nimeni n-o poate tine? Ca sa vada cati oameni vor fi cinstiti si vor recunoaste ca aici raman sub masura.",
      "Dumnezeu nu-ti cere sa fii intai sfant; nimeni nu poate. Nu-ti cere nici sa fii intai iubitor sau smerit, pentru ca toate acestea cer timp. Un singur lucru poti fi chiar azi, si acela este cel dintai pas spre viata duhovniceasca: cinstea.",
    ],
    wrongA: "Primul pas spre sfintenie este sa te straduiesti mai mult.",
    right: "Primul pas este cinstea: sa recunosti ce este cu adevarat in inima ta.",
    wrongB: "Cine tine poruncile pe dinafara este primit de Dumnezeu.",
    explanation:
      "Fariseilor le-a spus, cu ironie: n-am venit pentru cei sanatosi. Nu ii ajuta pe cei nesinceri. Tocmai fiindca Pavel a fost cinstit, a aflat puterea Duhului care il izbaveste chiar si de pofta din inima.",
    step: "Spune-I lui Dumnezeu, pe nume, o pofta din inima ta pe care nu ai marturisit-o niciodata.",
    prayer: "Doamne, in mine este tot felul de pofta. Iarta-ma, curata-ma cu sangele Tau si umple-ma cu Duhul Tau. Nu vreau sa mai fiu nesincer.",
    journal: "Ce ravnesti in taina, din ce este al altuia?",
    memory: "N-as fi cunoscut pofta, daca Legea nu mi-ar fi spus: Sa nu poftesti!",
  }),
]
