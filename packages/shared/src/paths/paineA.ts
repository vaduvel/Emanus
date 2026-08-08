import type { Lesson } from "../domain.js"

/*
 * Camera 10 — Pâinea (path_paine), partea A: lecțiile 1—4.
 *
 * Minciuna camerei: „Valorez cât aduc în casă."
 *
 * De ce există această cameră
 * ---------------------------
 * În taxonomia ușilor (docs/24) există un grup mare de etichete care nu
 * vorbesc despre credință, despre relații sau despre o pierdere, ci despre
 * bani și despre muncă: rămas fără loc de muncă, datorii, două joburi și tot
 * nu ajunge, rușinea de a cere ajutor, teama de facturi, epuizarea care nu
 * trece, invidia pe cel care are mai mult, sentimentul că ești un eșec pentru
 * familia ta. Toate se sprijină pe aceeași minciună: că omul valorează cât
 * produce.
 *
 * Este singura cameră în care pericolul cel mai mare nu vine din lume, ci din
 * biserică. Există o predicare care spune că, dacă ai credință destulă,
 * Dumnezeu îți dă bani. Când omul rămâne fără bani, învățătura aceea îl lasă
 * cu două răni în loc de una: sărăcia și verdictul că nu a crezut destul.
 * Drumul acesta refuză explicit învățătura aceea, în lecțiile 2 și 4.
 *
 * Ce nu promite drumul
 * --------------------
 * 1. Nu promite bani, loc de muncă sau ieșirea din datorii.
 * 2. Nu spune că sărăcia este semn de păcat și nici că este semn de sfințenie.
 * 3. Nu cere nimănui să rămână într-un loc de muncă abuziv.
 * 4. Nu folosește puncte, procente sau niveluri (docs/22 §8).
 *
 * Siguranță (docs/22)
 * -------------------
 * Disperarea financiară este una dintre cauzele frecvente ale gândurilor de
 * a-ți face rău. Lecția 4 poartă câmpul safety și numerele: 112 pentru
 * urgență, 116 123 pentru linia de sprijin emoțional, 116 111 pentru copii.
 *
 * Regula textului biblic
 * ----------------------
 * Fiecare verset a fost verificat cuvânt cu cuvânt după Cornilescu 1924
 * înainte de a fi scris aici. Nu se scrie Scriptură din memorie.
 *
 * Ordinea pașilor respectă LESSON_STEP_ORDER din domain.ts.
 */

export const paineL1: Lesson = {
  id: "paine_l1",
  courseId: "path_paine",
  order: 1,
  title: "Cât valorez",
  estMinutes: 7,
  anchorRefs: ["Luca 12:15"],
  memoryVerseRef: "Luca 12:15",
  steps: [
    {
      id: "pn1_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Înainte de orice, o întrebare simplă: cum ai răspunde dacă cineva te-ar întreba acum cine ești?" },
        { from: "guide", text: "Aproape toți începem cu ce facem. Cu meseria, cu firma, cu funcția. Sau, dacă nu mai avem, cu ce am fost." }
      ]
    },
    {
      id: "pn1_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Există un moment pe care îl știu mulți bărbați și multe femei din țara asta." },
        { from: "guide", text: "Stai în mașină, în fața blocului, cu motorul oprit, și nu urci încă. Nu pentru că ai treabă. Ci pentru că nu știi cum să intri cu mâinile goale." },
        { from: "guide", text: "Nimeni nu ți-a cerut nimic în seara aia. Dar tu simți că trebuie să vii cu ceva, ca să ai dreptul să stai la masa aceea." }
      ]
    },
    {
      id: "pn1_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Minciuna camerei acesteia este scurtă: valorez cât aduc în casă." },
        { from: "guide", text: "Se învață devreme și se învață fără cuvinte. Din felul în care se vorbea acasă despre unchiul care nu avea serviciu. Din liniștea de la masă în lunile grele." },
        { from: "guide", text: "Iar dacă o crezi, se întâmplă un lucru crud: în lunile bune nu te bucuri, pentru că știi că trebuie să ții ritmul. Iar în lunile slabe nu te odihnești, pentru că simți că nu ai voie." }
      ]
    },
    {
      id: "pn1_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea măsoară omul în cifre: salariu, mașină, metri pătrați, cât ai strâns până la vârsta ta." },
        { from: "guide", text: "Și are un fel foarte politicos de a o face. Nu îți spune niciodată «nu valorezi». Îți spune doar «și cu ce te ocupi?» și tace după răspuns." },
        { from: "guide", text: "Iisus spune limpede că viața omului nu stă în ce are. Nu că banii sunt răi. Ci că nu acolo stă viața." }
      ]
    },
    {
      id: "pn1_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul simplu al acestei camere: valoarea ta a fost stabilită înainte să produci ceva." },
        { from: "guide", text: "Un copil de o zi nu aduce nimic în casă și nimeni nu se întreabă dacă merită să fie hrănit." },
        { from: "guide", text: "Ce era adevărat despre tine atunci nu s-a schimbat pentru că ai crescut și ai învățat să faci facturi." }
      ]
    },
    {
      id: "pn1_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Dumnezeu nu Se uită la tine ca la un angajat pe care Îl ține atâta timp cât aduce profit." },
        { from: "guide", text: "El te-a chemat pe nume, nu pe funcție. Și nu S-a răzgândit în lunile în care nu ai adus nimic." },
        { from: "guide", text: "De aceea putem vorbi despre bani fără panică. Pentru că nu banii țin socoteala cine ești." }
      ]
    },
    {
      id: "pn1_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Vedeți și păziți-vă de orice fel de lăcomie de bani; căci viața cuiva nu stă în belșugul avuției lui.",
        ref: "Luca 12:15"
      },
      bubbles: [
        { from: "guide", text: "Observă că avertismentul nu este dat unui om bogat. Este dat unuia care se certa pe o moștenire, adică unuia care se simțea nedreptățit." },
        { from: "guide", text: "Lăcomia nu înseamnă doar «vreau mult». Înseamnă și «nu pot trăi fără atât»." }
      ]
    },
    {
      id: "pn1_8",
      type: "name_struggle",
      order: 8,
      bubbles: [
        { from: "guide", text: "Numește cifra ta. Toți avem una." },
        { from: "guide", text: "Suma sub care simți că nu mai ești om întreg. Sau lucrul pe care, dacă nu îl poți da familiei tale, îți spui că ai dat greș." },
        { from: "guide", text: "Scrie-o în minte, cinstit. Ce nu numim, nu putem duce nicăieri." }
      ]
    },
    {
      id: "pn1_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Ce spune Luca 12:15 despre viața omului?",
        options: [
          { text: "Că sărăcia este mai sfântă decât bogăția", correct: false },
          { text: "Că viața cuiva nu stă în belșugul avuției lui", correct: true },
          { text: "Că cine muncește destul nu va duce lipsă", correct: false }
        ],
        explanation: "Iisus nu laudă sărăcia și nu condamnă munca. Mută doar centrul: viața nu se măsoară în ce ai strâns. Avertismentul este dat unui om care se simțea nedreptățit la împărțirea unei moșteniri, nu unui bogat mulțumit."
      }
    },
    {
      id: "pn1_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "viața cuiva nu stă în belșugul avuției lui",
        ref: "Luca 12:15"
      },
      bubbles: [
        { from: "guide", text: "Șapte cuvinte. Repetă-le mâine dimineață, înainte să deschizi aplicația de bancă." }
      ]
    },
    {
      id: "pn1_11",
      type: "prayer",
      order: 11,
      bubbles: [
        { from: "guide", text: "«Doamne, m-am obișnuit să mă cântăresc în bani. Arată-mi cât valorez fără ei. Amin.»" }
      ]
    },
    {
      id: "pn1_12",
      type: "journal",
      order: 12,
      journalPrompt: "Scrie trei lucruri adevărate despre tine care rămân adevărate și dacă mâine ai rămâne fără venit. Nu treci niciun lucru pe care îl faci pentru bani.",
      reward: { xp: 0, axisDeltas: { identity: 1 } }
    }
  ]
}

export const paineL2: Lesson = {
  id: "paine_l2",
  courseId: "path_paine",
  order: 2,
  title: "Pâinea de azi",
  estMinutes: 8,
  anchorRefs: ["Matei 6:11", "Matei 6:34"],
  memoryVerseRef: "Matei 6:11",
  steps: [
    {
      id: "pn2_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Astăzi vorbim despre calendar, nu despre sumă." },
        { from: "guide", text: "Cei mai mulți oameni nu se prăbușesc sub facturile de luna asta. Se prăbușesc sub facturile pe care și le imaginează pentru anul viitor." }
      ]
    },
    {
      id: "pn2_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Ai făcut vreodată socoteala aceea, noaptea, în cap?" },
        { from: "guide", text: "Aduni tot ce ai de plătit până în decembrie, scazi tot ce ai de încasat, și rămâi cu o gaură care nu se închide." },
        { from: "guide", text: "Iar dimineața te trezești obosit de o luptă pe care nu ai purtat-o. Ai purtat-o doar în cap, cu o zi care nu venise încă." }
      ]
    },
    {
      id: "pn2_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Uită-te cum ne-a învățat Iisus să cerem. Nu «dă-ne pâinea pe un an». Nici «dă-ne siguranța»." },
        { from: "guide", text: "«Pâinea noastră cea de toate zilele dă-ne-o nouă astăzi.» Cerere pe o zi." },
        { from: "guide", text: "Nu pentru că Dumnezeu ar fi zgârcit. Ci pentru că un om care primește pe o zi rămâne legat de Cel care dă. Un om care primește pe zece ani uită repede de unde a venit." }
      ]
    },
    {
      id: "pn2_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Aici trebuie spus ceva pe față, pentru că se predică des și face mult rău." },
        { from: "guide", text: "Nu este adevărat că, dacă ai credință destulă, Dumnezeu îți dă bani. Nu scrie asta nicăieri." },
        { from: "guide", text: "Învățătura aceea are un preț ascuns: când omul rămâne fără bani, rămâne și cu verdictul că nu a crezut destul. Două răni în loc de una." },
        { from: "guide", text: "Adevărul este mai simplu și mai greu: ni se promite pâinea de azi, nu belșugul de mâine." }
      ]
    },
    {
      id: "pn2_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: ai de dus o singură zi." },
        { from: "guide", text: "Puterea pentru ziua de mâine încă nu ți-a fost dată, pentru că mâine nu a venit. De aceea o cauți acum și nu o găsești." }
      ]
    },
    {
      id: "pn2_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Poporul care a mers prin pustie a primit hrană zi de zi. Ce strângeau peste măsură, pentru siguranță, se strica până dimineața." },
        { from: "guide", text: "A fost o școală lungă de patruzeci de ani pentru o lecție de o propoziție: Dumnezeu dă azi." },
        { from: "guide", text: "Nu este o școală plăcută. Dar nimeni nu a murit de foame în ea." }
      ]
    },
    {
      id: "pn2_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Pâinea noastră cea de toate zilele dă-ne-o nouă astăzi",
        ref: "Matei 6:11"
      },
      bubbles: [
        { from: "guide", text: "Trei cuvinte fac toată diferența: «de toate zilele» și «astăzi»." },
        { from: "guide", text: "Este pâine, nu tort. Este de azi, nu de la an la an. Și este «noastră», nu «a mea» — se cere la plural, pentru toată casa și pentru vecin." }
      ]
    },
    {
      id: "pn2_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Nu vă îngrijorați dar de ziua de mâine; căci ziua de mâine se va îngrijora de ea însăși. Ajunge zilei necazul ei.",
        ref: "Matei 6:34"
      },
      bubbles: [
        { from: "guide", text: "Observă că nu se spune «nu vei avea necaz». Se spune că fiecare zi vine cu porția ei și că ajunge." },
        { from: "guide", text: "Îngrijorarea nu face altceva decât să mute necazul de mâine în ziua de azi. Așa ajungi să duci două zile deodată." }
      ]
    },
    {
      id: "pn2_9",
      type: "name_struggle",
      order: 9,
      bubbles: [
        { from: "guide", text: "Care este luna de care ți-e frică? Nu ziua de azi. Luna aceea, undeva în față." },
        { from: "guide", text: "Spune-i pe nume. «Mi-e frică de ianuarie.» Sau «Mi-e frică de ziua în care expiră contractul»." }
      ]
    },
    {
      id: "pn2_10",
      type: "quiz",
      order: 10,
      quiz: {
        question: "Ce ne învață Iisus să cerem în Matei 6:11?",
        options: [
          { text: "Belșug, ca să nu mai ducem grija banilor", correct: false },
          { text: "Pâinea de astăzi, adică ce ne trebuie pentru ziua de azi", correct: true },
          { text: "Nimic material; rugăciunea este doar pentru suflet", correct: false }
        ],
        explanation: "Rugăciunea Domnului cuprinde pâinea, deci nevoile zilnice sunt un subiect potrivit pentru rugăciune. Dar cererea este pentru astăzi. Nu ni se promite un depozit pentru zece ani, ci hrană pentru ziua în care suntem."
      }
    },
    {
      id: "pn2_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Pâinea noastră cea de toate zilele dă-ne-o nouă astăzi",
        ref: "Matei 6:11"
      },
      bubbles: [
        { from: "guide", text: "Cuvântul de sprijin este «astăzi». Nu ți se cere să duci mai mult." }
      ]
    },
    {
      id: "pn2_12",
      type: "prayer",
      order: 12,
      bubbles: [
        { from: "guide", text: "«Doamne, îmi iau mâinile de pe luna care încă nu a venit. Dă-mi pâinea de azi și somn pentru noaptea asta. Amin.»" }
      ]
    },
    {
      id: "pn2_13",
      type: "journal",
      order: 13,
      journalPrompt: "Scrie ce ai nevoie astăzi, doar pentru astăzi. Nu pentru luna viitoare. Dacă îți vine să scrii o sumă mare, întreabă-te din câte zile este făcută.",
      reward: { xp: 0, axisDeltas: { living_faith: 1 } }
    }
  ]
}

export const paineL3: Lesson = {
  id: "paine_l3",
  courseId: "path_paine",
  order: 3,
  title: "Pentru cine muncesc",
  estMinutes: 8,
  anchorRefs: ["Coloseni 3:23-24"],
  memoryVerseRef: "Coloseni 3:23",
  steps: [
    {
      id: "pn3_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Astăzi nu vorbim despre bani. Vorbim despre orele în care îi câștigi." },
        { from: "guide", text: "Pentru mulți oameni, partea cea mai grea nu este lipsa. Este să te duci de opt ani într-un loc unde nimeni nu observă ce faci bine." }
      ]
    },
    {
      id: "pn3_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Cunosc două feluri de oboseală și nu seamănă între ele." },
        { from: "guide", text: "Una vine din muncă multă. Se vindecă prin somn." },
        { from: "guide", text: "Cealaltă vine din muncă nevăzută. Aceea nu se vindecă prin somn, pentru că nu mușchii sunt obosiți, ci sufletul." }
      ]
    },
    {
      id: "pn3_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Munca nu este pedeapsă. Omul avea de lucru înainte să existe păcatul în lume. Ce s-a stricat este spinul din muncă, nu munca." },
        { from: "guide", text: "Asta schimbă întrebarea. Nu «cum scap de muncă», ci «cui îi predau munca asta»." },
        { from: "guide", text: "Iar Pavel scrie propoziția aceasta unor oameni care nu aveau nici salariu, nici drepturi, nici posibilitatea de a-și schimba locul de muncă. Nu este o vorbă de birou." }
      ]
    },
    {
      id: "pn3_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea îți spune să muncești pentru recunoaștere: pentru șef, pentru promovare, pentru ochii celor care te-au văzut cândva mic." },
        { from: "guide", text: "Problema este că recunoașterea nu vine niciodată în cantitatea potrivită. Sau nu vine deloc, sau vine și nu ține." },
        { from: "guide", text: "Scriptura mută destinatarul, nu munca: aceleași ore, alt Cui." }
      ]
    },
    {
      id: "pn3_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: nicio muncă făcută cinstit nu este pierdută, chiar dacă nimeni de aici nu o vede." },
        { from: "guide", text: "Există un Martor la fiecare tură de noapte." }
      ]
    },
    {
      id: "pn3_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Când muncești ca pentru Domnul, se schimbă două lucruri, și niciunul nu este salariul." },
        { from: "guide", text: "Primul: nu mai depinzi de dispoziția șefului ca să știi dacă ziua ta a valorat ceva." },
        { from: "guide", text: "Al doilea: nu mai poți lucra de mântuială când nu te vede nimeni, pentru că Cineva vede oricum. Este o libertate care vine la pachet cu o exigență." }
      ]
    },
    {
      id: "pn3_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Orice faceți, să faceți din toată inima, ca pentru Domnul, nu ca pentru oameni, ca unii care știți că veți primi de la Domnul răsplata moștenirii.",
        ref: "Coloseni 3:23-24"
      },
      bubbles: [
        { from: "guide", text: "«Orice faceți» — nu doar slujirea din biserică. Și schimbul de la fabrică, și vasele, și raportul de luni." },
        { from: "guide", text: "«Nu ca pentru oameni» — nu înseamnă că oamenii nu contează. Înseamnă că nu ei stabilesc cât a valorat ziua ta." }
      ]
    },
    {
      id: "pn3_8",
      type: "name_struggle",
      order: 8,
      bubbles: [
        { from: "guide", text: "Care este partea din munca ta pe care nu o vede nimeni?" },
        { from: "guide", text: "Poate rufele. Poate temele făcute cu copilul. Poate curățenia făcută corect într-un loc unde nimeni nu verifică." },
        { from: "guide", text: "Numește-o. Astăzi are un Martor." }
      ]
    },
    {
      id: "pn3_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Ce schimbă Coloseni 3:23 în felul în care privim munca?",
        options: [
          { text: "Ne cere să muncim mai mult decât ceilalți", correct: false },
          { text: "Schimbă destinatarul muncii: o faci ca pentru Domnul, nu ca pentru oameni", correct: true },
          { text: "Spune că munca lumească nu are valoare spirituală", correct: false }
        ],
        explanation: "Versetul nu cere ore în plus și nu împarte munca în sfântă și lumească. Mută destinatarul. Aceleași ore, aceeași meserie, dar predate Domnului — și de aceea nici nedreptățite până la capăt, nici pierdute."
      }
    },
    {
      id: "pn3_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Orice faceți, să faceți din toată inima, ca pentru Domnul, nu ca pentru oameni",
        ref: "Coloseni 3:23"
      },
      bubbles: [
        { from: "guide", text: "Spune-l mâine dimineață, înainte să intri în tură." }
      ]
    },
    {
      id: "pn3_11",
      type: "prayer",
      order: 11,
      bubbles: [
        { from: "guide", text: "«Doamne, îți dau ziua de lucru de mâine. Dacă nu o vede nimeni, o vezi Tu, și îmi ajunge. Amin.»" }
      ]
    },
    {
      id: "pn3_12",
      type: "journal",
      order: 12,
      journalPrompt: "Scrie o sarcină pe care o faci mâine și pe care nu o va lăuda nimeni. Scrie sub ea: «pentru Domnul». Apoi fă-o la fel de bine ca și cum ar fi verificat-o cineva.",
      reward: { xp: 0, axisDeltas: { character: 1 } }
    }
  ]
}

export const paineL4: Lesson = {
  id: "paine_l4",
  courseId: "path_paine",
  order: 4,
  title: "Când nu ajunge",
  estMinutes: 9,
  anchorRefs: ["Matei 6:33"],
  memoryVerseRef: "Matei 6:33",
  safety: {
    topic: "mental_health",
    notice: "Dacă din cauza banilor ai ajuns să te gândești că ai tăi ar sta mai bine fără tine, spune cuiva astăzi. 112 în caz de urgență, 116 123 pentru linia de sprijin emoțional, 116 111 pentru copii. Datoria se poate reeșalona. Tu nu poți fi înlocuit."
  },
  steps: [
    {
      id: "pn4_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Lecția asta este pentru lunile în care socoteala nu se închide oricât ai învârti-o." },
        { from: "guide", text: "Dacă nu ești acolo acum, citește-o oricum. Vei cunoaște pe cineva care este." }
      ]
    },
    {
      id: "pn4_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Rușinea de bani este o rușine tăcută. Nu se spune la niciun grup." },
        { from: "guide", text: "Nu spui că ai amânat medicamentele. Nu spui de ce nu ai venit la nuntă. Spui că ai fost ocupat." },
        { from: "guide", text: "Și, pentru că nu spui, rămâi singur exact în luna în care ai cea mai mare nevoie de oameni." }
      ]
    },
    {
      id: "pn4_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Trebuie să spun un lucru clar aici, pentru că uneori disperarea din bani ajunge foarte departe." },
        { from: "guide", text: "Dacă ai ajuns să te gândești că familia ta ar sta mai bine fără tine, acela nu este un calcul. Este oboseala care a început să mintă." },
        { from: "guide", text: "Sună astăzi: 112 dacă este urgent, 116 123 dacă ai nevoie să vorbești cu cineva, 116 111 dacă ești copil." },
        { from: "guide", text: "Datoriile se reeșalonează. Casele se vând și se cumpără la loc. Tu nu ai înlocuitor la masa aceea." }
      ]
    },
    {
      id: "pn4_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea are un singur răspuns la lipsă: mai mult. Mai multe ore, al doilea job, un credit peste celălalt." },
        { from: "guide", text: "Iar unii creștini adaugă o povară deasupra: «dacă ai fi dat mai mult, ai fi primit mai mult». Nu răspunde nimeni pentru omul care rămâne apoi și fără bani, și fără credință." },
        { from: "guide", text: "Iisus nu promite belșug celor care caută Împărăția. Promite că cele necesare nu vor fi uitate." }
      ]
    },
    {
      id: "pn4_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: lipsa nu este dovada că Dumnezeu te-a părăsit." },
        { from: "guide", text: "Oameni credincioși au fost și bogați, și săraci, în aceeași carte. Contul nu este fișa ta de evaluare duhovnicească." }
      ]
    },
    {
      id: "pn4_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "De cele mai multe ori, ajutorul lui Dumnezeu în bani vine prin oameni. Nu prin plic găsit în cutia poștală." },
        { from: "guide", text: "Iar oamenii nu pot ajuta ce nu știu. De aceea rușinea costă atât de scump: taie exact canalul prin care venea ajutorul." },
        { from: "guide", text: "A cere ajutor nu este cerșit. Este să lași pe cineva să facă ce ai face și tu pentru el." }
      ]
    },
    {
      id: "pn4_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Căutați mai întâi Împărăția lui Dumnezeu și neprihănirea Lui, și toate aceste lucruri vi se vor da pe deasupra.",
        ref: "Matei 6:33"
      },
      bubbles: [
        { from: "guide", text: "«Toate aceste lucruri» se referă la ce se vorbise mai sus: mâncarea, băutura, îmbrăcămintea. Adică strictul necesar, nu confortul." },
        { from: "guide", text: "«Pe deasupra» înseamnă că nu sunt plata. Sunt ce se adaugă. Nu cumperi Împărăția cu credință ca să primești bani." }
      ]
    },
    {
      id: "pn4_8",
      type: "name_struggle",
      order: 8,
      bubbles: [
        { from: "guide", text: "Ce nu ai spus nimănui despre banii tăi?" },
        { from: "guide", text: "Suma pe care o datorezi. Faptul că ai împrumutat din nou. Că nu ai plătit întreținerea de trei luni." },
        { from: "guide", text: "Nu îți cer să o spui lumii. Îți cer să o spui, azi, unei singure persoane." }
      ]
    },
    {
      id: "pn4_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Ce promite Matei 6:33 celui care caută mai întâi Împărăția?",
        options: [
          { text: "Bogăție, dacă are destulă credință", correct: false },
          { text: "Că cele necesare i se vor da pe deasupra", correct: true },
          { text: "Că nu va mai avea niciodată griji materiale", correct: false }
        ],
        explanation: "Versetul vorbește despre hrană, băutură și îmbrăcăminte, adică despre strictul necesar, și le numește lucruri date «pe deasupra», nu răsplată pentru credință. Lipsa nu este dovada că ai crezut prea puțin."
      }
    },
    {
      id: "pn4_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Căutați mai întâi Împărăția lui Dumnezeu și neprihănirea Lui, și toate aceste lucruri vi se vor da pe deasupra.",
        ref: "Matei 6:33"
      },
      bubbles: [
        { from: "guide", text: "«Mai întâi» este despre ordine, nu despre cantitate." }
      ]
    },
    {
      id: "pn4_11",
      type: "prayer",
      order: 11,
      bubbles: [
        { from: "guide", text: "«Doamne, nu ajunge și mi-e rușine. Ridică-mi rușinea de pe umeri și trimite-mi un om căruia să îi pot spune. Amin.»" }
      ]
    },
    {
      id: "pn4_12",
      type: "journal",
      order: 12,
      journalPrompt: "Scrie numele unei singure persoane căreia îi poți spune cum stai cu banii. Sub el scrie ziua în care o suni.",
      reward: { xp: 0, axisDeltas: { living_faith: 1 } }
    }
  ]
}
