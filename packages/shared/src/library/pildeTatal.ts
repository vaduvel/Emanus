import type { Lesson } from "../domain.js"

/*
 * Pildele lui Iisus — Cursul 1: „Cine e Tatăl", fișele 1-3.
 * (docs/16-modul-pilde.md §Cursul 1)
 *
 * Fiecare fișă respectă cele patru câmpuri obligatorii din docs/16, în ordine:
 *  - `audience`  — cui i-a spus-o Iisus și ce se întâmpla atunci (pas 2)
 *  - `main_point` — un singur punct principal (pas truth_simple)
 *  - `misread`   — citirea greșită, scrisă în forma ei cea mai atrăgătoare
 *  - `honest_limit` — ce nu spune pilda și unde ne oprim
 *
 * Reguli: o pildă, un punct. Nu alegorizăm detaliile (regula 3).
 * Nu transformăm nicio pildă în promisiune personală (regula 6).
 */

export const pildaRisipitor: Lesson = {
  id: "pilda_risipitor",
  courseId: "parables_c1_tatal",
  order: 1,
  title: "Fiul risipitor — și fratele care a rămas acasă",
  estMinutes: 12,
  anchorRefs: ["Luca 15:11-32", "Luca 15:1-2", "Luca 15:20"],
  memoryVerseRef: "Luca 15:20",
  steps: [
    {
      id: "p1_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "E cea mai cunoscută pildă din lume și, probabil, cea mai greșit citită." },
        { from: "guide", text: "Aproape toți am înțeles-o ca pe o poveste cu un băiat rău care s-a îndreptat. Nu e asta. Și se vede din prima propoziție a capitolului — cea pe care nimeni nu o citește." },
      ],
    },
    {
      id: "p1_2",
      type: "scripture",
      order: 2,
      scripture: {
        text: "Toți vameșii și păcătoșii se apropiau de Isus să-L audă. Și fariseii și cărturarii murmurau și ziceau: „Omul acesta primește pe păcătoși și mănâncă cu ei."",
        ref: "Luca 15:1-2",
      },
      bubbles: [
        { from: "guide", text: "Asta e situația în care se spune pilda. Cui i-a fost spusă? Nu risipitorilor. Celor care murmurau că Iisus stă la masă cu oameni ca risipitorul." },
        { from: "guide", text: "Deci ținta pildei nu e fratele mic. E fratele mare. Ține minte asta — schimbă tot finalul." },
      ],
    },
    {
      id: "p1_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Când era încă departe, tatăl său l-a văzut și i s-a făcut milă de el, a alergat de a căzut pe grumazul lui și l-a sărutat mult.",
        ref: "Luca 15:20",
      },
      bubbles: [
        { from: "guide", text: "Două propoziții de context, ca să nu-i scape țepii: în lumea aceea, un bărbat bătrân și respectat nu alerga niciodată. Ca să alergi trebuia să-ți ridici haina lungă și să-ți arăți picioarele — o rușine publică." },
        { from: "guide", text: "Tatăl a luat rușinea aceea asupra lui, în văzul satului, înainte să audă un singur cuvânt de la fiul lui." },
      ],
    },
    {
      id: "p1_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        { from: "guide", text: "Punctul principal, unul singur: Tatăl aleargă și îmbrățișează înainte de discurs. Haina, inelul și masa vin înaintea oricărei fapte bune." },
        { from: "guide", text: "Și ceva ce mai ales nu se observă: băiatul avea un plan. Voia să ceară să fie primit ca argat, ca să-și plătească datoria muncind. Oferta lui e întreruptă. Tatăl nu o acceptă." },
      ],
    },
    {
      id: "p1_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        { from: "guide", text: "Citirea greșită, în forma ei cea mai frumoasă: „Dacă te îndrepți și îți ceri iertare cum trebuie, Dumnezeu te primește înapoi." Așa am înțeles-o și eu." },
        { from: "guide", text: "Numai că în text tatăl aleargă când băiatul e încă departe, cu discursul nespus și cu mirosul de porci pe el. Nu s-a mișcat pentru că băiatul s-a îndreptat. Băiatul nici nu se îndreptase — se întorcea de foame." },
      ],
    },
    {
      id: "p1_6",
      type: "scripture",
      order: 6,
      scripture: {
        text: "Iată, eu îți slujesc ca un rob de atâția ani și niciodată nu ]i-am călcat porunca; și mie niciodată nu mi-ai dat măcar un ied să mă veselesc cu amicii mei.",
        ref: "Luca 15:29",
      },
      bubbles: [
        { from: "guide", text: "Aici ajunge pilda, de fapt. Fratele mare a stat acasă toată viața și vorbește ca un angajat: ți-am slujit, n-am călcat porunca, nu mi-ai dat." },
        { from: "guide", text: "Nu era departe cu picioarele. Era departe cu inima, și n-a știut. Și pilda se termină fără să ne spună dacă a intrat în casă — pentru că asta era întrebarea lăsată fariseilor de la masă." },
      ],
    },
    {
      id: "p1_7",
      type: "choice",
      order: 7,
      choice: {
        prompt: "Cinstit: cu care dintre cei doi te-ai recunoscut acum?",
        options: [
          { id: "p1c_a", label: "Cu cel mic. Am fost departe și mi-e rușine." },
          { id: "p1c_b", label: "Cu cel mare. Am fost corect și sunt secătuit și supărat." },
          { id: "p1c_c", label: "Cu amândoi, în zile diferite." },
        ],
      },
    },
    {
      id: "p1_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        { from: "guide", text: "Dacă ești cel mic: nu e nevoie să vii cu un plan de plată. Planul tău de argat va fi întrerupt oricum. Vii așa cum ești, iar hainele se dau la intrare." },
        { from: "guide", text: "Dacă ești cel mare: nu ți se cere să muncești mai mult. Ți se spune ce i-a spus tatălui: „tot ce am eu e al tău". Ai trăit ca un angajat în casa în care erai fiu. Asta se poate schimba azi." },
      ],
    },
    {
      id: "p1_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Cui i-a spus Iisus pilda asta?",
        options: [
          { text: "Unor tineri care plecaseră de acasă", correct: false },
          { text: "Fariseilor și cărturarilor care murmurau că mănâncă cu păcătoși", correct: true },
          { text: "Ucenicilor, în particular", correct: false },
        ],
        explanation:
          "Luca 15:1-2. De aceea pilda are un al doilea fiu și de aceea se termină cu el, afară, la ușă.",
      },
    },
    {
      id: "p1_10",
      type: "how_god_helps",
      order: 10,
      bubbles: [
        { from: "guide", text: "Limita cinstită: pilda nu promite că tatăl tău pământesc va face la fel, și nu spune că relațiile rupte cu oamenii se refac așa. Vorbește despre Dumnezeu, nu despre familia ta." },
        { from: "guide", text: "Și nu ne spune ce a făcut fratele mare. Textul se oprește acolo, și noi ne oprim unde se oprește el." },
      ],
    },
    {
      id: "p1_11",
      type: "journal",
      order: 11,
      journalPrompt:
        "Scrie ce discurs de argat ți-ai pregătit tu — ce crezi că trebuie să spui sau să faci înainte să fii primit. Doar tu îl citești.",
    },
    {
      id: "p1_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "Când era încă departe, tatăl său l-a văzut și i s-a făcut milă de el, a alergat de a căzut pe grumazul lui.",
        ref: "Luca 15:20",
      },
    },
  ],
}

export const pildaOaia: Lesson = {
  id: "pilda_oaia",
  courseId: "parables_c1_tatal",
  order: 2,
  title: "Oaia pierdută",
  estMinutes: 9,
  anchorRefs: ["Luca 15:3-7", "Ezechiel 34:16"],
  memoryVerseRef: "Luca 15:5",
  steps: [
    {
      id: "p2_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Aceeași masă, același murmur, aceeași zi. Pilda asta e prima din trei și răspunde la aceeași acuzație: de ce stă cu oameni ca ăștia." },
      ],
    },
    {
      id: "p2_2",
      type: "scripture",
      order: 2,
      scripture: {
        text: "Care om dintre voi, dacă are o sută de oi și pierde pe una din ele, nu lasă pe celelalte nouăzeci și nouă pe islaz și se duce după cea pierdută până când o găsește?",
        ref: "Luca 15:4",
      },
      bubbles: [
        { from: "guide", text: "„Până când o găsește." Nu „cât are timp", nu „dacă merită efortul"." },
      ],
    },
    {
      id: "p2_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        { from: "guide", text: "Punctul principal: păstorul lasă nouăzeci și nouă și caută una până o găsește. Căutarea pornește de la el." },
        { from: "guide", text: "Și, când o găsește, textul spune că o pune pe umeri. O oaie rătăcită nu știe drumul înapoi. De aceea nu e trimisă acasă — e purtată." },
      ],
    },
    {
      id: "p2_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Citirea greșită, cea de care am trăit mulți dintre noi: „Dacă te-ai rătăcit, treaba ta e să găsești drumul înapoi. Dumnezeu te așteaptă acasă."" },
        { from: "guide", text: "În pildă, oaia nu se întoarce. Nu face nimic corect. Singurul lucru care se întâmplă din partea ei e că se lasă ridicată." },
      ],
    },
    {
      id: "p2_5",
      type: "scripture",
      order: 5,
      scripture: {
        text: "Voi căuta pe cea pierdută, voi aduce înapoi pe cea rătăcită, voi lega pe cea rănită și voi întări pe cea slăbită.",
        ref: "Ezechiel 34:16",
      },
      bubbles: [
        { from: "guide", text: "Iisus nu inventa o imagine nouă. Fariseii de la masă știau versetul ăsta pe de rost. Se spune acolo despre Dumnezeu Însuși, și toate verbele sunt ale Lui." },
      ],
    },
    {
      id: "p2_6",
      type: "choice",
      order: 6,
      choice: {
        prompt: "Cum ți-ai explicat până acum starea în care ești?",
        options: [
          { id: "p2c_a", label: "M-am rătăcit și nu știu drumul înapoi." },
          { id: "p2c_b", label: "Știu drumul, dar nu am putere." },
          { id: "p2c_c", label: "Cred că nu mă caută nimeni." },
        ],
      },
    },
    {
      id: "p2_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        { from: "guide", text: "Ce se schimbă practic: nu trebuie să aduni putere ca să te întorci. Faptul că azi ai deschis lecția asta e deja semnul că s-a mișcat Cineva înaintea ta." },
        { from: "guide", text: "Un singur lucru ține de tine: să nu te zbați când te ridică." },
      ],
    },
    {
      id: "p2_8",
      type: "quiz",
      order: 8,
      quiz: {
        question: "Ce face oaia în pildă?",
        options: [
          { text: "Se întoarce singură, după ce se pocăiește", correct: false },
          { text: "Nimic — e căutată, găsită și purtată pe umeri", correct: true },
          { text: "Strigă până e auzită", correct: false },
        ],
        explanation:
          "Toate verbele de acțiune din pildă sunt ale păstorului. Asta e întreaga miză.",
      },
    },
    {
      id: "p2_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        { from: "guide", text: "Limita cinstită: pilda nu spune că nu contează ce faci mai departe și nu spune că toți oamenii sunt găsiți împotriva voinței lor. Vorbește despre cine începe căutarea, nu despre tot restul drumului." },
      ],
    },
    {
      id: "p2_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Și, după ce a găsit-o, o pune pe umeri și se întoarce acasă bucurându-se.",
        ref: "Luca 15:5",
      },
    },
  ],
}

export const pildaVamesul: Lesson = {
  id: "pilda_vamesul",
  courseId: "parables_c1_tatal",
  order: 3,
  title: "Vameșul și fariseul",
  estMinutes: 10,
  anchorRefs: ["Luca 18:9-14"],
  memoryVerseRef: "Luca 18:14",
  steps: [
    {
      id: "p3_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Pilda asta are, în text, adresa scrisă pe ea. Luca spune limpede cui i-a fost spusă: „unora care se încredeau în ei înșiși că sunt neprihăniți și disprețuiau pe ceilalți"." },
      ],
    },
    {
      id: "p3_2",
      type: "scripture",
      order: 2,
      scripture: {
        text: "Fariseul sta în picioare și a început să se roage în sine astfel: „Dumnezeule, Ți mulțumesc că nu sunt ca ceilalți oameni... Eu postesc de două ori pe săptămână, dau zeciuială din toate veniturile mele."",
        ref: "Luca 18:11-12",
      },
      bubbles: [
        { from: "guide", text: "Două propoziții de context: omul ăsta nu mințea. Chiar postea și chiar dădea. Pe hârtie, era cel mai bun om din clădire." },
        { from: "guide", text: "Iar vameșul de lângă el era, real, un colaborator al ocupantului și un hoț. Nimeni din sat nu i-ar fi dat dreptate." },
      ],
    },
    {
      id: "p3_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Vameșul sta departe și nu îndrăznea nici ochii să-și ridice spre cer, ci se bătea în piept și zicea: „Dumnezeule, ai milă de mine, păcătosul!"",
        ref: "Luca 18:13",
      },
      bubbles: [
        { from: "guide", text: "În greacă, ce spune el e mai tăios decât în traducere: *hilastheti moi* — „fie făcută ispașire pentru mine". Nu cere îngăduință. Cere să plătească altcineva." },
      ],
    },
    {
      id: "p3_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        { from: "guide", text: "Punctul principal, spus de Iisus în text: cel care nu îndrăznea să-și ridice ochii a plecat acasă socotit neprihănit. Celălalt, nu." },
        { from: "guide", text: "Amândoi s-au rugat. Diferența nu e cât de mult au vorbit. E din ce loc au vorbit: unul dintr-un bilanț, celălalt dintr-o nevoie." },
      ],
    },
    {
      id: "p3_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        { from: "guide", text: "Citirea greșită, cea blândă: „smerenia e o virtute recomandată, e frumos să fii modest"." },
        { from: "guide", text: "Textul e mult mai dur: omul cu bilanțul curat a plecat acasă **neiertat**. Nu i s-a scăzut o notă. A ieșit din clădire exact cum a intrat." },
      ],
    },
    {
      id: "p3_6",
      type: "choice",
      order: 6,
      choice: {
        prompt: "Când te rogi, cu ce începi de obicei?",
        options: [
          { id: "p3c_a", label: "Cu ce am făcut bine săptămâna asta." },
          { id: "p3c_b", label: "Cu ce am făcut rău și că iar am dat-o în bară." },
          { id: "p3c_c", label: "Cu comparația. Încep bine și ajung la alții." },
        ],
      },
    },
    {
      id: "p3_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        { from: "guide", text: "Vestea bună pentru varianta a doua: exact acolo stă vameșul. Rugăciunea care funcționează în pildă are șapte cuvinte și nicio realizare în ea." },
        { from: "guide", text: "Iar dacă te-ai recunoscut în prima sau în a treia: nu e nevoie să te pedepsești pentru asta. E nevoie doar să lași lista jos. Cel cu mâna plină nu are unde să primească nimic." },
      ],
    },
    {
      id: "p3_8",
      type: "quiz",
      order: 8,
      quiz: {
        question: "Cu ce a plecat acasă fariseul?",
        options: [
          { text: "Cu o răsplată mai mică", correct: false },
          { text: "Neiertat — exact cum venise", correct: true },
          { text: "Cu o mustrare, dar iertat", correct: false },
        ],
        explanation:
          "Iisus spune că vameșul a coborât acasă socotit neprihănit „mai degrabă decât celălalt". Nu e o clasare. E o despărțire.",
      },
    },
    {
      id: "p3_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        { from: "guide", text: "Limita cinstită: pilda nu spune că postul și dărnicia sunt rele. Spune ce se întâmplă când țin locul lui Dumnezeu. Și nu ne dă dreptul să ne uităm acum la alții și să le spunem „tu ești fariseul" — asta ar fi exact rugăciunea fariseului, cu alte cuvinte." },
      ],
    },
    {
      id: "p3_10",
      type: "prayer",
      order: 10,
      bubbles: [
        { from: "guide", text: "Spune-o o dată, cu voce tare, exact așa, fără să adaugi nimic: „Dumnezeule, ai milă de mine, păcătosul."" },
      ],
    },
    {
      id: "p3_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Eu vă spun că acesta s-a coborât acasă socotit neprihănit mai degrabă decât celălalt.",
        ref: "Luca 18:14",
      },
    },
  ],
}

/** Prima parte a cursului 1, în ordine. */
export const PILDE_TATAL_PART_A: Lesson[] = [pildaRisipitor, pildaOaia, pildaVamesul]
