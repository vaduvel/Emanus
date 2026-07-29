import type { Lesson } from "../domain.js"
import { DOCTRINE_HAR_PART_A } from "./doctrineHar.js"

/*
 * Cursul „Religie sau credință — ce mă mântuiește?", lecțiile 4-6.
 * (docs/15 §Cursul 2)
 *
 * Lecția 4 e locul cel mai delicat din tot produsul. Se scrie despre
 * suficiența lui Hristos și despre accesul direct la Tatăl — NU despre sfinți
 * ca practică, NU despre icoane, NU despre ce face cineva în biserica lui.
 * Nicio propoziție despre ce ar trebui să înceteze omul să facă.
 */

export const harD_l4: Lesson = {
  id: "har_d_l4",
  courseId: "doctrine_c2_har",
  order: 4,
  title: "Cine mă aude când mă rog",
  estMinutes: 11,
  anchorRefs: ["1 Timotei 2:5", "Evrei 4:16", "Matei 27:51"],
  memoryVerseRef: "Evrei 4:16",
  steps: [
    {
      id: "hd4_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Foarte mulți oameni se roagă cu senzația că vorbesc într-o anticameră. Că mesajul trebuie să treacă prin cineva, pe undeva, și că ei sunt prea mici ca să fie ascultați direct." },
        { from: "guide", text: "Aici nu discutăm obiceiuri și nu spunem nimic despre biserica în care ai crescut. Vorbim despre un singur lucru: cine te aude." },
      ],
    },
    {
      id: "hd4_2",
      type: "name_struggle",
      order: 2,
      bubbles: [
        { from: "guide", text: "Frica de dedesubt, spusă cinstit: „Eu, așa cum sunt, cu ce am făcut săptămâna asta, n-am cum să stau de vorbă cu Dumnezeu. Îmi trebuie cineva mai curat decât mine care să pună o vorbă bună."" },
        { from: "guide", text: "Frica asta e cinstită. Are și un răspuns, și răspunsul s-a văzut într-o zi anume." },
      ],
    },
    {
      id: "hd4_3",
      type: "scripture",
      order: 3,
      bubbles: [
        { from: "guide", text: "În Templu era o perdea grea, care despărțea locul cel mai sfânt de restul. Nimeni nu trecea dincolo. Un singur om, o singură dată pe an, cu sânge." },
        { from: "guide", text: "Când Iisus a murit, s-a întâmplat asta:" },
      ],
      scripture: {
        text: "Și îndată perdeaua dinlăuntrul Templului s-a rupt în două, de sus până jos.",
        ref: "Matei 27:51",
      },
    },
    {
      id: "hd4_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        { from: "guide", text: "De sus până jos. Nu de jos în sus. Nu s-a urcat cineva să o taie — a fost ruptă din partea Lui." },
        { from: "guide", text: "Și n-a fost cusută înapoi. Ceea ce ținea oamenii la distanță a fost înlăturat de El, nu de noi." },
      ],
    },
    {
      id: "hd4_5",
      type: "scripture",
      order: 5,
      scripture: {
        text: "Căci este un singur Dumnezeu și este un singur mijlocitor între Dumnezeu și oameni: Omul Isus Hristos.",
        ref: "1 Timotei 2:5",
      },
      bubbles: [
        { from: "guide", text: "„Mijlocitor" e, în greacă, *mesites*: cel care stinge o datorie între două părți și garantează cu el însuși." },
        { from: "guide", text: "Motivul pentru care e Unul singur nu e că Dumnezeu ar fi zgârcit cu accesul. E că numai Unul a plătit." },
      ],
    },
    {
      id: "hd4_6",
      type: "scripture",
      order: 6,
      scripture: {
        text: "Să ne apropiem dar cu deplină încredere de scaunul harului, ca să căpătăm milă și să găsim har, ca să fim ajutați la vreme de nevoie.",
        ref: "Evrei 4:16",
      },
      bubbles: [
        { from: "guide", text: "„Cu deplină încredere" traduce *parrhesia*: dreptul de a vorbi deschis, cum vorbește un cetățean, nu cum șoptește un străin care cere o favoare." },
        { from: "guide", text: "Și tronul și-a schimbat numele. Nu e scaunul judecății. E scaunul harului. Cine șade pe el te-a văzut deja, și tot te cheamă." },
      ],
    },
    {
      id: "hd4_7",
      type: "choice",
      order: 7,
      choice: {
        prompt: "Când te rogi, cum ți se pare că ești primit?",
        options: [
          { id: "hd4c_a", label: "Ca un străin care deranjează." },
          { id: "hd4c_b", label: "Ca un vinovat care își cere iertare a suta oară." },
          { id: "hd4c_c", label: "Nu știu. De obicei nu mă gândesc, doar spun cuvintele." },
        ],
      },
    },
    {
      id: "hd4_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        { from: "guide", text: "Ce se schimbă practic: poți vorbi cu El acum, cu numele tău, în limba în care gândești, fără formulă și fără să găsești pe cineva care să te recomande." },
        { from: "guide", text: "Și încă ceva: Duhul Sfânt mijlocește pentru credincioși, iar Iisus Însuși trăiește ca să se roage pentru ei. Deci nu ești singurul care vorbește despre tine în cerul acela." },
      ],
    },
    {
      id: "hd4_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Ce arată ruperea perdelei din Templu?",
        options: [
          { text: "Că Dumnezeu S-a mâniat și a distrus Templul", correct: false },
          { text: "Că drumul spre El a fost deschis din partea Lui, prin moartea lui Iisus", correct: true },
          { text: "Că nu mai are rost să ne rugăm deloc", correct: false },
        ],
        explanation:
          "Perdeaua despărțea. Ruperea ei, de sus până jos, spune cine a făcut primul pas: El.",
      },
    },
    {
      id: "hd4_10",
      type: "how_god_helps",
      order: 10,
      bubbles: [
        { from: "guide", text: "Limita cinstită, și o spunem clar: aici nu-ți spunem ce să lași, ce să arunci sau unde să nu mai mergi. Nu e treaba noastră și n-am fi cinstiți dacă am pretinde altceva." },
        { from: "guide", text: "Un singur lucru spunem, și ăsta e scris: nu e nevoie să găsești pe cineva care să pună o vorbă bună pentru tine. Perdeaua s-a rupt — poți vorbi direct, chiar acum, cu numele tău." },
      ],
    },
    {
      id: "hd4_11",
      type: "prayer",
      order: 11,
      bubbles: [
        { from: "guide", text: "Dacă vrei, spune-o cu voce tare, o dată: „Doamne, vin așa cum sunt. Nu am pe nimeni care să pună o vorbă bună pentru mine și înțeleg că nici nu am nevoie. Iisus a plătit. Vorbesc cu Tine."" },
      ],
    },
    {
      id: "hd4_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "Să ne apropiem dar cu deplină încredere de scaunul harului, ca să căpătăm milă și să găsim har.",
        ref: "Evrei 4:16",
      },
    },
  ],
}

export const harD_l5: Lesson = {
  id: "har_d_l5",
  courseId: "doctrine_c2_har",
  order: 5,
  title: "Atunci ce rost au faptele bune",
  estMinutes: 10,
  anchorRefs: ["Efeseni 2:10", "Iacov 2:17", "Ioan 15:5"],
  memoryVerseRef: "Efeseni 2:10",
  steps: [
    {
      id: "hd5_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Dacă nu mă mântuie faptele, atunci de ce să mai fac ceva? Întrebarea asta apare la toată lumea, mai devreme sau mai târziu. Și are un răspuns simplu." },
        { from: "guide", text: "Faptele nu sunt plata de intrare. Sunt rodul. Și rodul nu e opțional: e semnul că ceva viu s-a întâmplat." },
      ],
    },
    {
      id: "hd5_2",
      type: "scripture",
      order: 2,
      scripture: {
        text: "Căci noi suntem lucrarea Lui și am fost zidiți în Hristos Isus pentru faptele bune pe care le-a pregătit Dumnezeu mai înainte, ca să umblăm în ele.",
        ref: "Efeseni 2:10",
      },
      bubbles: [
        { from: "guide", text: "Uită-te la ordine. Versetul dinainte spunea: nu prin fapte. Și imediat după: pentru fapte bune." },
        { from: "guide", text: "Nu prin ele intri. Pentru ele ai fost făcut. Două lucruri diferite, în două versete lipite." },
      ],
    },
    {
      id: "hd5_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        { from: "guide", text: "Iacov spune că o credință fără fapte e moartă. Pavel spune că faptele nu mântuiesc. Par că se bat cap în cap." },
        { from: "guide", text: "Nu se bat. Pavel vorbește despre cum intri. Iacov, despre cum se vede că ai intrat." },
        { from: "guide", text: "Un pom nu devine pom pentru că face fructe. Face fructe pentru că e pom. Dar un pom care nu face niciodată nimic, ani și ani, ridică o întrebare cinstită despre rădăcină." },
      ],
    },
    {
      id: "hd5_4",
      type: "choice",
      order: 4,
      choice: {
        prompt: "De ce faci, de obicei, lucrurile bune pe care le faci?",
        options: [
          { id: "hd5c_a", label: "Ca să fiu în regulă. Să nu am probleme cu Dumnezeu." },
          { id: "hd5c_b", label: "Ca să fiu văzut bine de oameni. Recunosc." },
          { id: "hd5c_c", label: "Pentru că mi se rupe inima când văd omul în fața mea." },
        ],
      },
    },
    {
      id: "hd5_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        { from: "guide", text: "Două case pot arăta identic din stradă și pot avea temelii diferite. Doi oameni pot face același bine — unul ca să-și plătească datoria, unul pentru că datoria i-a fost ștearsă." },
        { from: "guide", text: "Primul obosește și ajunge să fie dur cu alții. Al doilea nu obosește la fel, și are răbdare, pentru că știe de unde a fost scos." },
      ],
    },
    {
      id: "hd5_6",
      type: "scripture",
      order: 6,
      scripture: {
        text: "Eu sunt Vița, voi sunteți mlădițele. Cine rămâne în Mine și în cine rămân Eu aduce multă roadă; căci despărțiți de Mine nu puteți face nimic.",
        ref: "Ioan 15:5",
      },
      bubbles: [
        { from: "guide", text: "Verbul „a rămâne" e *meno*: a locui, a sta acolo, nu a trece în vizită." },
        { from: "guide", text: "O mlădiță nu se sfortează să facă struguri. Stați lipită de viță și asta se întâmplă. Efortul ei e să nu se rupă." },
      ],
    },
    {
      id: "hd5_7",
      type: "quiz",
      order: 7,
      quiz: {
        question: "Cum se împacă Pavel și Iacov?",
        options: [
          { text: "Nu se împacă, Biblia se contrazice", correct: false },
          { text: "Pavel vorbește despre cum intri, Iacov despre cum se vede că ai intrat", correct: true },
          { text: "Iacov scrie pentru cei mai buni, Pavel pentru începători", correct: false },
        ],
        explanation:
          "Amândoi spun că relația adevărată se vede. Diferența e că unul răspunde la întrebarea „cum sunt primit", celălalt la întrebarea „de unde știu că e real".",
      },
    },
    {
      id: "hd5_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        { from: "guide", text: "Limita cinstită: nu-ți dăm un număr. Nu există „atâtea fapte pe săptămână" și nimeni nu-ți poate măsura credința după cât face. Oamenii bolnavi, obosiți sau închiși în casă nu sunt mai puțin ai Lui." },
        { from: "guide", text: "Întrebarea nu e cât. E din ce. Dintr-o datorie sau dintr-un dar." },
      ],
    },
    {
      id: "hd5_9",
      type: "step",
      order: 9,
      bubbles: [
        { from: "guide", text: "Azi: fă un lucru bun despre care nu află nimeni. Nici pe telefon, nici povestit seara. Doar tu și El. Testul cel mai simplu pentru motivul din spate." },
      ],
    },
    {
      id: "hd5_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Căci noi suntem lucrarea Lui și am fost zidiți în Hristos Isus pentru faptele bune.",
        ref: "Efeseni 2:10",
      },
    },
  ],
}

export const harD_l6: Lesson = {
  id: "har_d_l6",
  courseId: "doctrine_c2_har",
  order: 6,
  title: "Ce înseamnă că e de ajuns",
  estMinutes: 11,
  anchorRefs: ["Ioan 19:30", "Evrei 10:14", "Coloseni 2:13-14"],
  memoryVerseRef: "Evrei 10:14",
  steps: [
    {
      id: "hd6_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Ultima lecție a cursului. Și cea care ia frica de la rădăcină: frica de a nu fi făcut destul." },
        { from: "guide", text: "E o frică liniștită. Nu te ține treaz noaptea, dar te ține încordat toată viața." },
      ],
    },
    {
      id: "hd6_2",
      type: "scripture",
      order: 2,
      bubbles: [
        { from: "guide", text: "Ultimul cuvânt al lui Iisus pe cruce, în greacă, e un singur cuvânt: *tetelestai*." },
        { from: "guide", text: "Se scria pe socoteli și pe înscrisurile de datorie, atunci, în lumea aceea. Însemna: plătit integral. Nu mai e nimic de dat." },
      ],
      scripture: {
        text: "Când a luat Isus oțetul, a zis: „S-a isprăvit!" Apoi Și-a plecat capul și Și-a dat sufletul.",
        ref: "Ioan 19:30",
      },
    },
    {
      id: "hd6_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        { from: "guide", text: "N-a spus „s-a terminat cu Mine", ca un om învins. A spus că lucrarea e încheiată, ca un om care și-a dus treaba până la capăt." },
        { from: "guide", text: "Și verbul e la un timp care, în greacă, spune ceva ce româna nu poate spune într-o vorbă: s-a făcut o dată și rămâne făcut. Nu se reia." },
      ],
    },
    {
      id: "hd6_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "Căci printr-o singură jertfă El a făcut desdesăvârșiți pentru totdeauna pe cei ce sunt sfințiți.",
        ref: "Evrei 10:14",
      },
      bubbles: [
        { from: "guide", text: "„O singură" și „pentru totdeauna" stau în aceeași propoziție. Autorul epistolei le pune împreună intenionat, pentru niște oameni obișnuiți cu jertfe repetate an de an." },
      ],
    },
    {
      id: "hd6_5",
      type: "scripture",
      order: 5,
      scripture: {
        text: "A șters zapisul cu poruncile lui, care stătea împotriva noastră și ne era potrivnic, și l-a nimicit pironindu-l pe cruce.",
        ref: "Coloseni 2:14",
      },
      bubbles: [
        { from: "guide", text: "„Zapisul" era înscrisul de datorie, scris de mână, semnat de datornic. Dovada că dai ceva." },
        { from: "guide", text: "Pavel spune că hârtia n-a fost ascunsă și n-a fost amânată. A fost bătută în cui, la vedere, pe cruce." },
      ],
    },
    {
      id: "hd6_6",
      type: "choice",
      order: 6,
      choice: {
        prompt: "Unde te prinzi cel mai des încercând să mai adaugi ceva?",
        options: [
          { id: "hd6c_a", label: "Când greșesc. Simt că trebuie să plătesc ceva înainte să mă rog." },
          { id: "hd6c_b", label: "Când mă compar cu alții care par mai buni." },
          { id: "hd6c_c", label: "Mereu. Nu știu să stau liniștit în ceva ce n-am plătit." },
        ],
      },
    },
    {
      id: "hd6_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        { from: "guide", text: "Ce rămâne de făcut, dacă s-a făcut deja tot? Rămâne primirea. Și, după ea, o viață întreagă trăită din alt loc: nu ca să fii primit, ci pentru că ești." },
        { from: "guide", text: "Iar când cazi — și vei cădea — nu te întorci ca un datornic prins. Te întorci ca un fiu care recunoaște. Datoria e altă discuție, închisă acum două mii de ani." },
      ],
    },
    {
      id: "hd6_8",
      type: "quiz",
      order: 8,
      quiz: {
        question: "Ce însemna *tetelestai* în limba de atunci?",
        options: [
          { text: "M-am predat", correct: false },
          { text: "Plătit integral, nu mai e nimic de dat", correct: true },
          { text: "Va urma", correct: false },
        ],
        explanation:
          "Se scria pe înscrisurile de datorie achitate. De aceea ultimul cuvânt de pe cruce nu e o înfrângere, e o chitanță.",
      },
    },
    {
      id: "hd6_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        { from: "guide", text: "Limita cinstită, la finalul cursului: nu ți-am răspuns la tot. Sunt lucruri în care creștinii înțeleg diferit și pe care nu le-am atins aici, intenționat." },
        { from: "guide", text: "Ce nu e diferit, și ce am încercat să spunem limpede în șase lecții, e că Hristos e de ajuns." },
      ],
    },
    {
      id: "hd6_10",
      type: "journal",
      order: 10,
      journalPrompt:
        "Scrie un lucru pe care ai încercat să-l plătești singur înaintea lui Dumnezeu. Doar îl scrii — nu-l citește nimeni.",
    },
    {
      id: "hd6_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Căci printr-o singură jertfă El a făcut desăvârșiți pentru totdeauna pe cei ce sunt sfințiți.",
        ref: "Evrei 10:14",
      },
    },
  ],
}

/** Cursul întreg, în ordine. */
export const DOCTRINE_HAR_LESSONS: Lesson[] = [
  ...DOCTRINE_HAR_PART_A,
  harD_l4,
  harD_l5,
  harD_l6,
]
