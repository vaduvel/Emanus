import type { Lesson } from "../domain.js"

/*
 * Camera 9 — Legătura ruptă (path_legatura), partea B: lecțiile 5—7.
 *
 * Continuarea lui legaturaA.ts. Antetul complet, cu motivele camerei, regulile
 * de siguranță și regula textului biblic, se află acolo. Aici notez doar ce
 * este specific acestei jumătăți.
 *
 * Lecția 5 este cea mai delicată din tot drumul. Separă trei lucruri pe care
 * limba română le amestecă într-un singur cuvânt: iertarea (între om și
 * Dumnezeu, nu are nevoie de acordul celuilalt), împăcarea (are nevoie de doi)
 * și încrederea (se reclădește în timp, prin fapte). Fără separarea aceasta,
 * un om care a fost rănit grav aude „iartă" și înțelege „întoarce-te", ceea ce
 * nu scrie nicăieri în Scriptură. Nu se modifică formularea din lecția 5 fără
 * revizie pastorală.
 *
 * Lecția 7 se termină fără împăcare, intenționat. Un drum care promite că
 * celălalt se va întoarce ar minți jumătate dintre oamenii care îl parcurg.
 * Aici se face și trecerea către Drumul Emaus, la capătul parcursului.
 */

export const legaturaL5: Lesson = {
  id: "legatura_l5",
  courseId: "path_legatura",
  order: 5,
  title: "Iertarea nu este același lucru cu întoarcerea",
  estMinutes: 9,
  anchorRefs: ["Coloseni 3:13", "Matei 6:12"],
  memoryVerseRef: "Coloseni 3:13",
  steps: [
    {
      id: "lg5_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Am ajuns la cuvântul de care te-ai temut de când ai intrat pe ușa asta." },
        { from: "guide", text: "Îl spunem, dar îl spunem întreg. Nu pe jumătate, cum se spune de obicei." }
      ]
    },
    {
      id: "lg5_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Mulți oameni nu se împotrivesc iertării. Se împotrivesc a ce cred ei că înseamnă iertarea." },
        { from: "guide", text: "Cred că înseamnă să spui că a fost în regulă. Să uiți. Să te întorci la masa aceea și să te porți ca înainte." },
        { from: "guide", text: "Nu înseamnă niciunul dintre lucrurile astea." }
      ]
    },
    {
      id: "lg5_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Să le așezăm separat, pentru că sunt trei lucruri diferite și le amestecăm mereu." },
        { from: "guide", text: "Iertarea: renunți să mai ceri plată pentru ce ți s-a făcut. Se face între tine și Dumnezeu și nu are nevoie de acordul celuilalt." },
        { from: "guide", text: "Împăcarea: relația se reia. Are nevoie de doi oameni și de o schimbare reală din partea celui care a rănit." },
        { from: "guide", text: "Încrederea: se reclădește în timp, prin fapte repetate. Nu se dă înapoi cu o propoziție." },
        { from: "guide", text: "Poți să ierți astăzi și să nu te împaci niciodată. Nu ești un creștin pe jumătate dacă faci așa." }
      ]
    },
    {
      id: "lg5_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea are două greșeli aici, și merg în direcții opuse." },
        { from: "guide", text: "Una spune: «Dacă ai iertat cu adevărat, te întorci». Asta trimite oameni înapoi în locuri care îi distrug." },
        { from: "guide", text: "Cealaltă spune: «Nu ierta niciodată, ține minte tot». Asta lasă omul legat de faptă pentru tot restul vieții." },
        { from: "guide", text: "Scriptura taie prin mijloc: iartă, ca să fii liber. Și păzește-te, ca să fii întreg." }
      ]
    },
    {
      id: "lg5_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: iertarea nu îl eliberează întâi pe el. Te eliberează întâi pe tine." },
        { from: "guide", text: "Cât timp aștepți plata, ești legat de omul care ți-o datorează. Iertarea taie sfoara aceea." }
      ]
    },
    {
      id: "lg5_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Nu ți se cere să găsești în tine o putere de iertare pe care nu o ai." },
        { from: "guide", text: "Ți se cere să privești cât ți s-a iertat ție și să dai mai departe dintr-un vas care a fost umplut deja." },
        { from: "guide", text: "De aceea versetul nu zice «iartă ca să fii bun», ci «cum v-a iertat Hristos, așa iertați-vă și voi»." }
      ]
    },
    {
      id: "lg5_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Îngăduiți-vă unii pe alții și, dacă unul are pricină să se plângă de altul, iertați-vă unul pe altul. Cum v-a iertat Hristos, așa iertați-vă și voi.",
        ref: "Coloseni 3:13"
      },
      bubbles: [
        { from: "guide", text: "Observă că versetul nu neagă plângerea: «dacă unul are pricină să se plângă». Deci există pricină. Este reală." },
        { from: "guide", text: "Nu ți se cere să spui că nu s-a întâmplat nimic. Ți se cere să nu mai ceri plată pentru ce s-a întâmplat." }
      ]
    },
    {
      id: "lg5_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "și ne iartă nouă greșelile noastre, precum și noi iertăm greșiților noștri",
        ref: "Matei 6:12"
      },
      bubbles: [
        { from: "guide", text: "Este singura cerere din Tatăl nostru în care ne legăm singuri de o măsură." },
        { from: "guide", text: "O spunem de ani de zile fără să ne uităm la ea. Uită-te astăzi." }
      ]
    },
    {
      id: "lg5_9",
      type: "name_struggle",
      order: 9,
      bubbles: [
        { from: "guide", text: "Ce anume nu poți ierta? Nu omul întreg. Fapta." },
        { from: "guide", text: "Cu cât este mai exact ce numești, cu atât este mai ușor de dus la Dumnezeu." },
        { from: "guide", text: "Și dacă astăzi nu poți spune «iert», spune «vreau să pot». Este un început cinstit, și El îl primește." }
      ]
    },
    {
      id: "lg5_10",
      type: "quiz",
      order: 10,
      quiz: {
        question: "Care afirmație este adevărată despre iertare?",
        options: [
          { text: "Dacă ai iertat, ești obligat să reiei relația ca înainte", correct: false },
          { text: "Poți să ierți și să păstrezi în același timp o limită sănătoasă", correct: true },
          { text: "Iertarea înseamnă că fapta nu a fost gravă", correct: false }
        ],
        explanation: "Iertarea, împăcarea și încrederea sunt trei lucruri diferite. Iertarea se face între tine și Dumnezeu și te eliberează. Împăcarea are nevoie de doi. Încrederea se clădește în timp, prin fapte. A ierta nu te obligă să te întorci într-un loc care te rănește."
      }
    },
    {
      id: "lg5_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Cum v-a iertat Hristos, așa iertați-vă și voi.",
        ref: "Coloseni 3:13"
      },
      bubbles: [
        { from: "guide", text: "Măsura nu ești tu. Măsura este El." }
      ]
    },
    {
      id: "lg5_12",
      type: "prayer",
      order: 12,
      bubbles: [
        { from: "guide", text: "«Doamne, Îți aduc fapta aceasta. Nu mai cer plată pentru ea. Nu știu dacă ne vom mai vedea vreodată la aceeași masă și Te las pe Tine cu asta. Eliberează-mă. Amin.»" }
      ]
    },
    {
      id: "lg5_13",
      type: "journal",
      order: 13,
      journalPrompt: "Scrie fapta pe care o ierți astăzi, cât poți de exact. Sub ea scrie o singură limită pe care o păstrezi. Amândouă pot sta pe aceeași pagină.",
      reward: { xp: 0, axisDeltas: { relationships: 1 } }
    }
  ]
}

export const legaturaL6: Lesson = {
  id: "legatura_l6",
  courseId: "path_legatura",
  order: 6,
  title: "Vorbește cu el, nu despre el",
  estMinutes: 8,
  anchorRefs: ["Matei 18:15"],
  memoryVerseRef: "Matei 18:15",
  steps: [
    {
      id: "lg6_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Până acum am lucrat înăuntru. Astăzi ieșim afară, la o singură conversație." },
        { from: "guide", text: "Nu astăzi, dacă nu ești gata. Dar să știi cum se face." }
      ]
    },
    {
      id: "lg6_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Când cineva ne rănește, aproape niciodată nu mergem la el. Mergem la altcineva." },
        { from: "guide", text: "Îi povestim unei prietene, unui frate, unui coleg. Și de fiecare dată când povestim, mai punem un strat." },
        { from: "guide", text: "După zece povestiri, omul din capul nostru nu mai seamănă cu omul adevărat. Și cu omul din capul nostru nu se poate împăca nimeni." }
      ]
    },
    {
      id: "lg6_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Iisus dă o regulă foarte simplă și foarte greu de ținut: întâi singuri, doar voi doi." },
        { from: "guide", text: "Nu pe grup. Nu de față cu copiii. Nu cu încă doi martori aduși de la început, ca să ai sprijin." },
        { from: "guide", text: "Motivul nu este delicatețe. Este că un om care nu are public are unde să se retragă fără să se facă de râs. Iar cine nu se poate retrage, se apără." }
      ]
    },
    {
      id: "lg6_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea zice: «Adună dovezi, spune-le și altora, ai nevoie de susținere»." },
        { from: "guide", text: "Iisus zice: du-te singur, întâi. Nu pentru că ești singur pe lume, ci pentru că scopul nu este să câștigi disputa." },
        { from: "guide", text: "Scopul este scris chiar în verset: «ai câștigat pe fratele tău». Nu procesul. Omul." }
      ]
    },
    {
      id: "lg6_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: o conversație sinceră de zece minute face mai mult decât zece luni de tăcere demnă." },
        { from: "guide", text: "Dar numai dacă intri în ea ca să îl câștigi pe el, nu ca să ai dreptate." }
      ]
    },
    {
      id: "lg6_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Nu trebuie să mergi cu discursul pregătit și nici cu curajul făcut." },
        { from: "guide", text: "Cere-I doar două lucruri: momentul potrivit și primele trei propoziții. Restul se așază singur." },
        { from: "guide", text: "Și dacă omul nu ascultă, nu ai eșuat. Versetul însuși lasă loc pentru varianta asta." }
      ]
    },
    {
      id: "lg6_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Dacă fratele tău a păcătuit împotriva ta, du-te și mustră-l între tine și el singur. Dacă te ascultă, ai câștigat pe fratele tău.",
        ref: "Matei 18:15"
      },
      bubbles: [
        { from: "guide", text: "«Du-te» — mișcarea este a ta, chiar dacă fapta a fost a lui." },
        { from: "guide", text: "«Între tine și el singur» — fără audiență, fără ecran, fără martori aduși din prima." },
        { from: "guide", text: "«Dacă te ascultă» — deci se poate să nu te asculte. Nici asta nu este în mâna ta." }
      ]
    },
    {
      id: "lg6_8",
      type: "name_struggle",
      order: 8,
      bubbles: [
        { from: "guide", text: "Cui i-ai povestit ultima dată despre el?" },
        { from: "guide", text: "Și câți oameni știu acum despre rana asta, înaintea omului care a făcut-o?" },
        { from: "guide", text: "Nu ca să te simți vinovat. Ca să vezi câte uși ai deschis în altă direcție decât cea care ar rezolva." }
      ]
    },
    {
      id: "lg6_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Care este primul pas dat de Iisus în Matei 18:15?",
        options: [
          { text: "Să spui la doi-trei oameni de încredere ce s-a întâmplat", correct: false },
          { text: "Să mergi singur la el și să vorbești între patru ochi", correct: true },
          { text: "Să aștepți să vină el, pentru că el a greșit", correct: false }
        ],
        explanation: "Iisus îl trimite pe cel rănit, nu pe cel vinovat, și îl trimite singur. Ceilalți pași din capitol vin abia dacă acesta nu reușește. Ordinea nu este întâmplătoare: protejează demnitatea celui care a greșit și ține cearta mică."
      }
    },
    {
      id: "lg6_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "du-te și mustră-l între tine și el singur. Dacă te ascultă, ai câștigat pe fratele tău.",
        ref: "Matei 18:15"
      },
      bubbles: [
        { from: "guide", text: "Ține minte scopul: «ai câștigat pe fratele tău». Nu «ai dovedit»." }
      ]
    },
    {
      id: "lg6_11",
      type: "prayer",
      order: 11,
      bubbles: [
        { from: "guide", text: "«Doamne, dă-mi ziua potrivită și primele trei propoziții. Vreau să îl câștig pe el, nu să câștig eu. Amin.»" }
      ]
    },
    {
      id: "lg6_12",
      type: "journal",
      order: 12,
      journalPrompt: "Scrie primele trei propoziții pe care i le-ai spune dacă ai vorbi cu el mâine. Niciuna să nu înceapă cu «tu».",
      reward: { xp: 0, axisDeltas: { relationships: 1 } }
    }
  ]
}

export const legaturaL7: Lesson = {
  id: "legatura_l7",
  courseId: "path_legatura",
  order: 7,
  title: "Ce rămâne când celălalt nu vine",
  estMinutes: 9,
  anchorRefs: ["Galateni 6:2", "Romani 12:18"],
  memoryVerseRef: "Galateni 6:2",
  steps: [
    {
      id: "lg7_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Ultima lecție. Și trebuie să fie cinstită, altfel tot drumul nu a valorat nimic." },
        { from: "guide", text: "Se poate să fi făcut tot ce scrie aici și omul să nu vină." }
      ]
    },
    {
      id: "lg7_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Ai cerut iertare și ți s-a răspuns cu tăcere. Sau cu o vorbă și mai rece decât tăcerea." },
        { from: "guide", text: "Și acum stai cu întrebarea: atunci la ce a fost bun tot ce am făcut?" },
        { from: "guide", text: "Să îți spun exact la ce." }
      ]
    },
    {
      id: "lg7_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Primul lucru: partea ta de zid nu mai este în picioare. Aceea era treaba ta și s-a terminat." },
        { from: "guide", text: "Al doilea: nu mai duci în tine plata pe care i-o cereai. Ai lăsat-o jos. Se simte în somn și în piept." },
        { from: "guide", text: "Al treilea: ușa a rămas deschisă din partea ta. Dacă el se întoarce peste zece ani, nu găsește zid." },
        { from: "guide", text: "Astea trei sunt ale tale și nu ți le poate lua răspunsul lui." }
      ]
    },
    {
      id: "lg7_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea măsoară reușita după rezultat: v-ați împăcat sau nu." },
        { from: "guide", text: "Dumnezeu măsoară ascultarea: ai făcut ce atârnă de tine sau nu." },
        { from: "guide", text: "Sunt două examene diferite. Tu ai dat unul singur, și l-ai dat." }
      ]
    },
    {
      id: "lg7_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: nu ești responsabil de răspunsul nimănui. Ești responsabil de întinderea mâinii." },
        { from: "guide", text: "Poți să stai în pace chiar dacă relația nu s-a vindecat. Nu este o înfrângere ascunsă. Este o limită cinstită." }
      ]
    },
    {
      id: "lg7_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Și dacă rămâi cu o legătură pe care nu o poți repara, nu rămâi singur cu ea." },
        { from: "guide", text: "Dumnezeu nu ne-a lăsat să ne cărăm poverile în tăcere, fiecare a lui. Ne-a pus unii lângă alții tocmai pentru așa ceva." },
        { from: "guide", text: "Poate că omul care nu vine te învață să lași pe altcineva să te ajute. Nu era planul tău, dar nu este o pierdere." }
      ]
    },
    {
      id: "lg7_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Purtați-vă sarcinile unii altora și veți împlini astfel Legea lui Hristos.",
        ref: "Galateni 6:2"
      },
      bubbles: [
        { from: "guide", text: "Sarcina nu se stinge. Se poartă. Și nu singur." },
        { from: "guide", text: "Uneori vindecarea nu vine din partea celui care a rănit, ci din partea celui care a rămas." }
      ]
    },
    {
      id: "lg7_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Dacă este cu putință, întrucât atârnă de voi, trăiți în pace cu toți oamenii.",
        ref: "Romani 12:18"
      },
      bubbles: [
        { from: "guide", text: "Ne întoarcem de unde am plecat, dar acum versetul sună altfel." },
        { from: "guide", text: "La început l-ai citit ca pe o datorie. Astăzi îl citești ca pe o eliberare." }
      ]
    },
    {
      id: "lg7_9",
      type: "name_struggle",
      order: 9,
      bubbles: [
        { from: "guide", text: "Spune, în gând, cum stau lucrurile astăzi. Fără să înfrumusețezi și fără să înnegrești." },
        { from: "guide", text: "«Am făcut partea mea. El nu a venit încă. Îl las în mâinile lui Dumnezeu și nu închid ușa.»" },
        { from: "guide", text: "Dacă nu este adevărat încă, spune ce este adevărat. Dumnezeu lucrează cu adevărul, nu cu formula." }
      ]
    },
    {
      id: "lg7_10",
      type: "quiz",
      order: 10,
      quiz: {
        question: "Ai făcut partea ta și celălalt nu răspunde. Ce urmează?",
        options: [
          { text: "Ai eșuat și trebuie să încerci până cedează", correct: false },
          { text: "Ți-ai împlinit partea; răspunsul lui nu este în mâna ta", correct: true },
          { text: "Trebuie să închizi ușa definitiv, ca să nu suferi", correct: false }
        ],
        explanation: "Romani 12:18 îți dă o porție limitată: cât atârnă de tine. Când ai făcut-o, ai terminat ce ți se cerea, chiar dacă relația nu s-a refăcut. Ușa poate rămâne deschisă fără ca tu să stai în prag toată viața."
      }
    },
    {
      id: "lg7_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Purtați-vă sarcinile unii altora și veți împlini astfel Legea lui Hristos.",
        ref: "Galateni 6:2"
      },
      bubbles: [
        { from: "guide", text: "Ce nu se poate repara, se poate purta. Și se poate purta împreună." }
      ]
    },
    {
      id: "lg7_12",
      type: "prayer",
      order: 12,
      bubbles: [
        { from: "guide", text: "«Doamne, am făcut cât a atârnat de mine. Îl las pe el în mâinile Tale și îmi iau mâinile de pe el. Dă-mi pace și ține-mi ușa deschisă. Amin.»" }
      ]
    },
    {
      id: "lg7_13",
      type: "journal",
      order: 13,
      journalPrompt: "Recitește prima propoziție pe care ai scris-o în lecția 1. Sub ea scrie unde ești astăzi, după șapte lecții. Nu trebuie să fie o poveste frumoasă. Trebuie să fie a ta.",
      reward: { xp: 0, axisDeltas: { relationships: 1 } }
    }
  ]
}
