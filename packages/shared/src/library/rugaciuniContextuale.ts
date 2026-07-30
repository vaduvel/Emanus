import type { Lesson, LessonStep } from "../domain.js"

/*
 * Rugăciuni pentru ritmul zilei.
 * Aceste lecții nu transformă „Tatăl nostru” într-o formulă pentru orice
 * situație. Șablonul dat de Iisus rămâne în timpul așezat de rugăciune;
 * aici omul învață să întoarcă momentele concrete ale zilei spre Dumnezeu.
 * Exemplele sunt puncte de pornire, nu incantații și nu garanții.
 */

type DailyPrayerInput = {
  id: string
  order: number
  title: string
  refs: string[]
  memoryRef: string
  opening: string[]
  prompt: string
  options: string[]
  scriptureText: string
  scriptureRef: string
  teaching: string[]
  model: string
  practice: string
  journal: string
  memoryText: string
}

const bubbles = (...text: string[]) => text.map((line) => ({ from: "guide" as const, text: line }))

function makeDailyPrayer(input: DailyPrayerInput): Lesson {
  const p = input.id.replace("rug_context_", "rc")
  const steps: LessonStep[] = [
    { id: `${p}_hook`, type: "hook", order: 1, bubbles: bubbles(...input.opening) },
    {
      id: `${p}_choice`, type: "choice", order: 2,
      choice: {
        prompt: input.prompt,
        options: input.options.map((label, index) => ({ id: `${p}c_${index + 1}`, label })),
      },
    },
    {
      id: `${p}_word`, type: "scripture", order: 3,
      scripture: { text: input.scriptureText, ref: input.scriptureRef },
    },
    { id: `${p}_truth`, type: "truth_simple", order: 4, bubbles: bubbles(...input.teaching) },
    {
      id: `${p}_quiz`, type: "quiz", order: 5,
      quiz: {
        question: "Ce urmărește această rugăciune?",
        options: [
          { text: "Să-L oblig pe Dumnezeu să facă ce am planificat.", correct: false },
          { text: "Să aduc momentul real înaintea Lui și să mă așez sub voia Lui.", correct: true },
          { text: "Să spun o formulă fără să-mi implic inima.", correct: false },
        ],
        explanation: "Rugăciunea creștină nu controlează realitatea prin cuvinte; ea vorbește cu Tatăl, cere, mulțumește, ascultă și se supune.",
      },
    },
    { id: `${p}_model`, type: "prayer", order: 6, bubbles: bubbles("Exemplu — schimbă-l în cuvintele tale:", input.model) },
    { id: `${p}_practice`, type: "step", order: 7, bubbles: bubbles(input.practice) },
    { id: `${p}_journal`, type: "journal", order: 8, journalPrompt: input.journal },
    {
      id: `${p}_memory`, type: "memory_verse", order: 9,
      scripture: { text: input.memoryText, ref: input.memoryRef },
    },
  ]
  return {
    id: input.id,
    courseId: "lib_rug_context",
    order: input.order,
    title: input.title,
    estMinutes: 6,
    anchorRefs: input.refs,
    memoryVerseRef: input.memoryRef,
    steps,
  }
}

export const rug_context_l1 = makeDailyPrayer({
  id: "rug_context_l1", order: 1, title: "Mulțumesc pentru o zi nouă",
  refs: ["Plângerile 3:22-23", "Psalmul 118:24", "Psalmul 5:3"], memoryRef: "Plângerile 3:22-23",
  opening: [
    "Primele minute ale dimineții sunt luate repede de telefon, grabă sau teamă.",
    "Rugăciunea de dimineață nu neagă greul; primește ziua ca pe un dar înainte ca ziua să devină o listă.",
  ],
  prompt: "Care este primul lucru care îți ocupă mintea dimineața?",
  options: ["Grijile zilei.", "Telefonul și mesajele.", "Oboseala.", "Mulțumirea."],
  scriptureText: "Bunătățile Domnului nu s-au sfârșit; îndurările Lui se înnoiesc în fiecare dimineață.",
  scriptureRef: "Plângerile 3:22-23",
  teaching: [
    "Nu mulțumești pentru că totul este ușor. Mulțumești pentru că mila Lui a ajuns și în această dimineață.",
    "Înainte să ceri ceva, numește trei daruri concrete: respirația, un om, o hrană, o nouă ocazie de a iubi.",
  ],
  model: "Tată, Îți mulțumesc pentru viață și pentru mila Ta nouă. Nu știu tot ce aduce ziua, dar o primesc din mâna Ta. Deschide-mi ochii pentru binele pe care l-ai pus deja lângă mine.",
  practice: "Mâine, înainte de telefon, numește cu voce tare trei lucruri pentru care mulțumești.",
  journal: "Care sunt cele trei daruri concrete pe care le-ai observat astăzi?",
  memoryText: "Îndurările Lui se înnoiesc în fiecare dimineață.",
})

export const rug_context_l2 = makeDailyPrayer({
  id: "rug_context_l2", order: 2, title: "Încredințez ziua și planurile mele",
  refs: ["Proverbe 3:5-6", "Iacov 4:13-15", "Psalmul 143:8"], memoryRef: "Proverbe 3:5-6",
  opening: [
    "A binecuvânta ziua nu înseamnă să declari că nimic rău nu se poate întâmpla.",
    "Înseamnă să-I încredințezi lui Dumnezeu planurile, întâlnirile și întreruperile, fără să pretinzi controlul.",
  ],
  prompt: "Ce îți este cel mai greu să-I încredințezi astăzi?",
  options: ["Programul meu.", "O conversație.", "Un rezultat important.", "Ceva ce nu pot controla."],
  scriptureText: "Încrede-te în Domnul din toată inima și nu te sprijini pe priceperea ta; recunoaște-L în toate căile tale.",
  scriptureRef: "Proverbe 3:5-6",
  teaching: [
    "Poți cere direcție și succes, dar adaugi sincer: «facă-se voia Ta». Aceasta nu este resemnare, ci încredere.",
    "Dumnezeu poate conduce și printr-o ușă închisă, o întârziere sau sfatul unui om matur.",
  ],
  model: "Doamne, Îți încredințez programul meu, întâlnirile și lucrul pe care îl doresc. Dă-mi înțelepciune, păzește-mă de grabă și schimbă-mi direcția dacă planul meu nu este bun.",
  practice: "Privește calendarul zilei și roagă-te pe nume pentru cele mai importante trei momente.",
  journal: "La ce rezultat trebuie să renunți pentru a putea asculta de Dumnezeu?",
  memoryText: "Recunoaște-L în toate căile tale, și El îți va netezi cărările.",
})

export const rug_context_l3 = makeDailyPrayer({
  id: "rug_context_l3", order: 3, title: "Binecuvântează lucrul mâinilor mele",
  refs: ["Psalmul 90:17", "Coloseni 3:23-24", "Proverbe 16:3"], memoryRef: "Psalmul 90:17",
  opening: [
    "Munca poate deveni idol, povară sau loc de slujire.",
    "Rugăciunea pentru muncă nu cere doar promovare; cere caracter, pricepere și folos pentru alții.",
  ],
  prompt: "De ce ai nevoie cel mai mult în munca ta?",
  options: ["Pricepere și concentrare.", "Răbdare cu oamenii.", "O ușă de lucru.", "Odihnă și limite sănătoase."],
  scriptureText: "Întărește lucrarea mâinilor noastre; da, întărește lucrarea mâinilor noastre.",
  scriptureRef: "Psalmul 90:17",
  teaching: [
    "Dumnezeu este interesat și de lucrul obișnuit: masa pregătită, copilul îngrijit, șurubul strâns, raportul scris corect.",
    "Binecuvântarea nu justifică exploatarea sau lipsa odihnei. Sabatul ne amintește că nu suntem ceea ce producem.",
  ],
  model: "Doamne, întărește lucrul mâinilor mele. Dă-mi pricepere, cinste și răbdare. Ferește-mă să-mi fac identitate din rezultate și folosește munca mea pentru binele oamenilor.",
  practice: "Înaintea următoarei sarcini, oprește-te zece secunde și dedic-o lui Dumnezeu.",
  journal: "Cum poate munca ta de astăzi să slujească o persoană concretă?",
  memoryText: "Întărește lucrarea mâinilor noastre.",
})

export const rug_context_l4 = makeDailyPrayer({
  id: "rug_context_l4", order: 4, title: "Mulțumesc pentru hrană",
  refs: ["1 Timotei 4:4-5", "Matei 6:11", "Ioan 6:11"], memoryRef: "1 Timotei 4:4",
  opening: [
    "Rugăciunea înainte de masă nu transformă hrana printr-o formulă magică.",
    "Ea încetinește pofta suficient cât să recunoști Darul, munca din spatele Lui și oamenii care nu au destul.",
  ],
  prompt: "Ce uiți cel mai ușor când te așezi la masă?",
  options: ["Să mulțumesc.", "Pe cei care au muncit.", "Pe cei fără hrană.", "Să mănânc cu măsură."],
  scriptureText: "Orice făptură a lui Dumnezeu este bună și nimic nu este de lepădat dacă se ia cu mulțumiri.",
  scriptureRef: "1 Timotei 4:4",
  teaching: [
    "Mulțumirea sfințește momentul prin recunoașterea Celui care dă, nu prin puterea unei fraze.",
    "«Pâinea noastră» ne leagă de ceilalți: cerem și pentru masa aproapelui, nu doar pentru farfuria noastră.",
  ],
  model: "Tată, Îți mulțumesc pentru această hrană, pentru mâinile care au pregătit-o și pentru puterea de a o primi. Dă pâine celor care nu au și arată-mi cum pot împărți.",
  practice: "La următoarea masă, mulțumește pentru un om concret implicat în drumul hranei până la tine.",
  journal: "Cu cine poți împărți hrană, bani sau timp în săptămâna aceasta?",
  memoryText: "Orice făptură a lui Dumnezeu este bună dacă se ia cu mulțumiri.",
})

export const rug_context_l5 = makeDailyPrayer({
  id: "rug_context_l5", order: 5, title: "Îmi aduc familia înaintea Ta",
  refs: ["Iosua 24:15", "Efeseni 4:2-3", "Coloseni 3:12-14"], memoryRef: "Coloseni 3:14",
  opening: [
    "A binecuvânta familia nu înseamnă să controlezi alegerile fiecăruia prin rugăciune.",
    "Înseamnă să-i aduci pe nume înaintea lui Dumnezeu și să ceri ca tu să devii primul răspuns la rugăciunea pentru pace.",
  ],
  prompt: "Pentru ce are familia ta nevoie de rugăciune acum?",
  options: ["Pace și împăcare.", "Protecție și sănătate.", "Credință.", "Înțelepciune într-o decizie."],
  scriptureText: "Mai presus de toate, îmbrăcați-vă cu dragostea, care este legătura desăvârșirii.",
  scriptureRef: "Coloseni 3:14",
  teaching: [
    "Nu orice familie arată la fel. Dumnezeu vede persoana singură, familia monoparentală, căsnicia rănită și copilul plecat.",
    "Rugăciunea nu acoperă abuzul. Dacă există pericol, protecția și ajutorul real sunt pași de credincioșie.",
  ],
  model: "Tată, îi aduc înaintea Ta pe cei din casa mea. Dă-ne adevăr fără cruzime, iertare fără ascunderea răului și dragoste care se vede. Începe cu mine și arată-mi pasul meu de pace.",
  practice: "Roagă-te pe nume pentru fiecare persoană, apoi fă un gest concret de ascultare, ajutor sau împăcare.",
  journal: "Care este partea ta de responsabilitate în atmosfera casei?",
  memoryText: "Mai presus de toate, îmbrăcați-vă cu dragostea.",
})

export const rug_context_l6 = makeDailyPrayer({
  id: "rug_context_l6", order: 6, title: "Călătorește cu mine",
  refs: ["Psalmul 121:7-8", "Iacov 4:15", "Fapte 27:21-26"], memoryRef: "Psalmul 121:8",
  opening: [
    "Poți cere protecție la drum fără să transformi rugăciunea într-o poliță care garantează lipsa accidentelor.",
    "Credința se roagă și apoi își pune centura, conduce treaz și respectă limitele.",
  ],
  prompt: "Ce aduci înaintea lui Dumnezeu când pleci la drum?",
  options: ["Teama de accident.", "Graba.", "O călătorie lungă.", "O persoană care călătorește."],
  scriptureText: "Domnul te va păzi la plecare și la venire, de acum și până în veac.",
  scriptureRef: "Psalmul 121:8",
  teaching: [
    "Paza lui Dumnezeu este mai mare decât confortul nostru și nu ne scutește de responsabilitate.",
    "Putem cere drum bun, discernământ, răbdare și prezența Lui chiar când planul se schimbă.",
  ],
  model: "Doamne, Îți încredințez plecarea și venirea mea. Dă-mi atenție, răbdare și înțelepciune. Păzește-i pe cei de pe drum și ajută-mă să nu pun pe nimeni în pericol prin grabă.",
  practice: "Înainte să pleci, verifică practic siguranța și roagă-te pentru ceilalți oameni de pe drum, nu doar pentru tine.",
  journal: "Ce obicei de grabă sau neatenție trebuie schimbat ca rugăciunea ta să fie însoțită de responsabilitate?",
  memoryText: "Domnul te va păzi la plecare și la venire.",
})

export const rug_context_l7 = makeDailyPrayer({
  id: "rug_context_l7", order: 7, title: "Îți spun cererile și nevoile mele",
  refs: ["Filipeni 4:6-7", "Matei 7:7-11", "1 Petru 5:7"], memoryRef: "1 Petru 5:7",
  opening: [
    "Dumnezeu nu este deranjat de nevoile tale concrete.",
    "Poți cere pâine, lucru, ajutor, un răspuns sau o ușă; rugăciunea devine matură când lasă și răspunsul în mâna Lui.",
  ],
  prompt: "Ce fel de nevoie porți acum?",
  options: ["Una materială.", "O decizie.", "O relație.", "O povară pe care nu o pot numi ușor."],
  scriptureText: "Aruncați asupra Lui toate îngrijorările voastre, căci El Însuși îngrijește de voi.",
  scriptureRef: "1 Petru 5:7",
  teaching: [
    "Cererea specifică nu este lipsă de credință. Spune ce ai nevoie și de ce.",
    "Apoi cere înțelepciune pentru partea ta: un telefon, un buget, o consultație, o împăcare sau răbdarea de a aștepta.",
  ],
  model: "Tată, am nevoie de ajutor în această situație. Îți cer concret ceea ce îmi lipsește. Dacă răspunsul Tău arată altfel decât sper, ține-mă aproape și arată-mi pasul de făcut astăzi.",
  practice: "Scrie cererea într-o propoziție, partea ta într-o propoziție și numele unui om căruia îi poți cere ajutor.",
  journal: "Ce ceri, ce poți face și ce trebuie să lași în mâna lui Dumnezeu?",
  memoryText: "Aruncați asupra Lui toate îngrijorările voastre, căci El îngrijește de voi.",
})

export const rug_context_l8 = makeDailyPrayer({
  id: "rug_context_l8", order: 8, title: "Cer întărire și vindecare",
  refs: ["Iacov 5:13-16", "2 Corinteni 12:8-10", "Psalmul 103:1-5"], memoryRef: "2 Corinteni 12:9",
  opening: [
    "Biblia ne învață să cerem vindecare, nu să pretindem că o controlăm.",
    "Uneori Dumnezeu vindecă repede, alteori prin tratament și oameni, iar alteori răspunsul rămâne dureros de neînțeles.",
  ],
  prompt: "Pentru ce ai nevoie de întărire sau vindecare?",
  options: ["Pentru trup.", "Pentru minte și emoții.", "Pentru o rană relațională.", "Pentru cineva drag."],
  scriptureText: "Harul Meu îți este de ajuns, căci puterea Mea în slăbiciune este făcută desăvârșită.",
  scriptureRef: "2 Corinteni 12:9",
  teaching: [
    "A cere vindecare este biblic. A promite în numele lui Dumnezeu un rezultat pe care El nu l-a promis este periculos.",
    "Rugăciunea merge împreună cu medicul, tratamentul, consilierea și sprijinul comunității; nu le înlocuiește.",
  ],
  model: "Doamne Iisuse, Îți cer vindecare și milă. Dă înțelepciune medicilor și oamenilor care ajută, putere pentru următorul pas și har dacă drumul este lung. Păzește-mă de rușine și de promisiuni false.",
  practice: "Roagă-te specific și notează următorul pas real de îngrijire sau persoana pe care trebuie să o contactezi.",
  journal: "Ce înseamnă să speri în Dumnezeu fără să negi realitatea trupului sau a durerii?",
  memoryText: "Harul Meu îți este de ajuns, căci puterea Mea se arată în slăbiciune.",
})

export const rug_context_l9 = makeDailyPrayer({
  id: "rug_context_l9", order: 9, title: "Păzește-mă de rău",
  refs: ["Matei 6:13", "Iacov 4:7-8", "Efeseni 6:10-18"], memoryRef: "Iacov 4:7",
  opening: [
    "Iisus ne-a învățat să cerem izbăvire de cel rău. Nu este o parte rușinoasă sau imaginară a rugăciunii.",
    "Dar protecția biblică nu este panică, superstiție sau căutarea unui demon în spatele fiecărei probleme.",
  ],
  prompt: "Unde ai nevoie de protecție și discernământ?",
  options: ["În fața unei ispite repetate.", "După implicare în ocultism.", "Într-un mediu apăsător.", "Din cauza fricii de atac spiritual."],
  scriptureText: "Supuneți-vă lui Dumnezeu. Împotriviți-vă diavolului, și el va fugi de la voi.",
  scriptureRef: "Iacov 4:7",
  teaching: [
    "Ordinea este importantă: întâi supunere față de Dumnezeu, apoi împotrivire. Autoritatea nu este spectacol, ci apartenență la Hristos.",
    "Renunță explicit la practicile oculte și caută sprijinul unor credincioși maturi. Nu diagnostica singur orice simptom; boala și trauma au nevoie și de evaluare competentă.",
  ],
  model: "Doamne Iisuse, mă supun Ție și renunț la orice lucru pe care îl știu împotriva voii Tale. Păzește-mi mintea și casa, rupe puterea minciunii și dă-mi curaj să mă împotrivesc răului prin adevăr, ascultare și ajutorul comunității.",
  practice: "Numește ispita sau practica de care te desprinzi și contactează un credincios matur dacă lupta te depășește.",
  journal: "Ce pas de supunere concretă trebuie să vină înaintea cuvintelor de împotrivire?",
  memoryText: "Supuneți-vă lui Dumnezeu. Împotriviți-vă diavolului.",
})

export const rug_context_l10 = makeDailyPrayer({
  id: "rug_context_l10", order: 10, title: "Stau înaintea Ta pentru altcineva",
  refs: ["1 Timotei 2:1-4", "Coloseni 1:9-12", "Luca 22:31-32"], memoryRef: "1 Timotei 2:1",
  opening: [
    "Mijlocirea nu înseamnă să-L convingi pe Dumnezeu să devină bun cu cineva.",
    "Înseamnă să porți omul înaintea Celui care îl iubește mai mult decât îl poți iubi tu.",
  ],
  prompt: "Pentru cine simți că trebuie să te rogi?",
  options: ["Un membru al familiei.", "Un om bolnav sau în criză.", "Cineva care nu crede.", "Un conducător sau o comunitate."],
  scriptureText: "Vă îndemn să faceți cereri, rugăciuni, mijlociri și mulțumiri pentru toți oamenii.",
  scriptureRef: "1 Timotei 2:1",
  teaching: [
    "Roagă-te specific: pentru adevăr, înțelepciune, protecție, pocăință, vindecare și oamenii potriviți în jurul persoanei.",
    "Nu folosi rugăciunea ca să controlezi deciziile altuia. Iubirea mijlocește și respectă faptul că persoana nu îți aparține.",
  ],
  model: "Tată, îl/o aduc înaintea Ta pe [nume]. Tu cunoști ce eu nu cunosc. Dă-i lumină, ajutor și oameni potriviți. Arată-mi dacă trebuie să vorbesc, să tac, să ofer ajutor sau să păstrez o limită sănătoasă.",
  practice: "Alege o persoană și roagă-te pentru ea șapte zile, fără să-i dai lecții și fără să încerci să forțezi rezultatul.",
  journal: "Ce parte din povara acestei persoane trebuie purtată în rugăciune și ce parte nu îți aparține?",
  memoryText: "Faceți rugăciuni și mijlociri pentru toți oamenii.",
})

export const rug_context_l11 = makeDailyPrayer({
  id: "rug_context_l11", order: 11, title: "Închei ziua în mâna Ta",
  refs: ["Psalmul 4:8", "Psalmul 139:23-24", "1 Ioan 1:9"], memoryRef: "Psalmul 4:8",
  opening: [
    "Seara, mintea reia ce ai greșit, ce nu ai terminat și ce s-ar putea întâmpla mâine.",
    "Rugăciunea de culcare nu este recitarea fricii. Este întoarcerea zilei în mâna Celui care rămâne treaz.",
  ],
  prompt: "Ce te ține cel mai des treaz?",
  options: ["Regretele zilei.", "Grija pentru mâine.", "Telefonul și agitația.", "Durerea sau singurătatea."],
  scriptureText: "Eu mă culc și adorm în pace, căci numai Tu, Doamne, îmi dai liniște deplină.",
  scriptureRef: "Psalmul 4:8",
  teaching: [
    "Privește ziua în patru mișcări: mulțumesc, îmi pare rău, ajută-mă, Îți încredințez.",
    "Dacă insomnia persistă, rugăciunea nu te învinovățește. Caută și evaluare medicală, ritm sănătos și ajutor pentru anxietate.",
  ],
  model: "Tată, Îți mulțumesc pentru binele de astăzi. Îți mărturisesc unde am greșit și primesc iertarea Ta. Îți încredințez oamenii, lucrul neterminat și ziua de mâine. Păzește-mă în noapte și dă-mi odihna de care am nevoie.",
  practice: "Pune telefonul deoparte cu cincisprezece minute înainte de somn și parcurge cele patru mișcări ale rugăciunii.",
  journal: "Pentru ce mulțumești, ce mărturisești și ce lași în mâna lui Dumnezeu în această seară?",
  memoryText: "Mă culc și adorm în pace, căci Tu îmi dai liniște.",
})

export const RUGACIUNI_CONTEXTUALE_LESSONS: Lesson[] = [
  rug_context_l1,
  rug_context_l2,
  rug_context_l3,
  rug_context_l4,
  rug_context_l5,
  rug_context_l6,
  rug_context_l7,
  rug_context_l8,
  rug_context_l9,
  rug_context_l10,
  rug_context_l11,
]
