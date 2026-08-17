import type { Lesson } from "../domain.js"

/*
 * DUPĂ DIVORȚ — drum propriu pentru ușa `divort`. Lecțiile 1-3.
 * Continuarea: `divortB.ts` (lecțiile 4-7, DIVORT_LESSONS, DIVORT_PRACTICES).
 *
 * DE CE EXISTĂ (docs/23 §3, o parte din defectul D2): ușa `divort` cădea în
 * camera 2, "Când nu poți ierta". Adică omul care spunea "am trecut printr-un
 * divorț" primea din prima zi un drum despre iertare. Uneori e exact ce trebuie.
 * De cele mai multe ori nu e: pe primul loc stă pierderea, sau vina, sau frica
 * de ce urmează — iar a-i spune omului "problema ta e că nu ierți" înainte să-l
 * întrebi ce îl doare este exact ce interzice docs/22 §1.
 *
 * DE CE DRUM PROPRIU ȘI NU O CAMERĂ NOUĂ: divorțul nu e un tipar spiritual, e o
 * situație. Din ea pot ieși patru răni diferite (rușine, neiertare, singurătate,
 * epuizare) și fiecare are deja camera ei. Ce nu are nimeni altcineva e câmpul
 * de mine doctrinar: Matei 19, Maleahi 2, recăsătorirea, locul în biserică.
 * De asta ușa primește `pathId` direct, iar lecția 7 trimite omul în camera
 * rănii care i-a rămas (docs/21 §7 pct. 5).
 *
 * REGULA DE AUR A DRUMULUI: nu știm cine a plecat, nu știm cine a greșit și nu
 * întrebăm. Nu există niciun pas care să ceară omului să declare de partea cui
 * e vina. Același drum trebuie să fie citibil și de cel părăsit, și de cel care
 * a plecat, și de cel care a fugit dintr-o casă periculoasă.
 */

export const divortL1: Lesson = {
  id: "divort_l1",
  courseId: "path_divort",
  order: 1,
  title: "Un doliu fără înmormântare",
  estMinutes: 12,
  anchorRefs: ["Psalmul 34:18", "Isaia 54:6"],
  memoryVerseRef: "Psalmul 34:18",
  safety: {
    topic: "mental_health",
    notice:
      "Ce urmează atinge pierderea și despărțirea. Poți opri oricând și poți reveni. Dacă acum ești în pericol sau te gândești să îți faci rău, cere ajutor acum.",
  },
  steps: [
    {
      id: "d1_1",
      type: "check_in",
      order: 1,
      choice: {
        prompt: "Ce doare cel mai tare azi? Nu te întrebăm nimic despre cine a greșit.",
        options: [
          {
            id: "d1_c_pierdere",
            label: "Pierderea. Mi-e dor de ce era.",
            feedback: "Atunci ești în doliu, chiar dacă nimeni nu i-a spus așa.",
          },
          {
            id: "d1_c_vina",
            label: "Vina. Cred că eu am stricat.",
            feedback: "Vom ajunge acolo în lecția 4, și o vom lua cinstit, nu ca să te liniștim.",
          },
          {
            id: "d1_c_furie",
            label: "Furia. Nu pot să trec peste ce mi s-a făcut.",
            feedback: "E o reacție normală la o nedreptate. Nu îți cerem azi să ierți.",
          },
          {
            id: "d1_c_frica",
            label: "Frica. Nu știu ce urmează.",
            feedback: "Bani, casă, singurătate, bătrânețe. Sunt frici reale, nu lipsă de credință.",
          },
          {
            id: "d1_c_copii",
            label: "Copiii.",
            feedback: "Lecția 6 e despre ei. Până atunci: faptul că ți-e grijă nu e un semn rău.",
          },
        ],
      },
    },
    {
      id: "d1_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Divorțul e un doliu la care nu vine nimeni cu mâncare." },
        {
          from: "guide",
          text: "Nu se face parastas, nu primești condoleanțe, nu îți ia nimeni o zi liberă. Iar omul e încă în viață, undeva, și asta e mai greu, nu mai ușor.",
        },
      ],
    },
    {
      id: "d1_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        { from: "guide", text: "Ai pierdut mai mult decât o persoană." },
        {
          from: "guide",
          text: "Ai pierdut viitorul pe care ți-l imaginaserăi. Rutina. Jumătate din prieteni. Poate casa. Poate biserica. Poate felul în care te vedeai pe tine.",
        },
        {
          from: "guide",
          text: "Când cineva îți spune «hai, că doar te-ai despărțit», numără tu în gând câte lucruri au plecat odată cu el.",
        },
      ],
    },
    {
      id: "d1_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "Domnul este aproape de cei cu inima înfrântă și mântuiește pe cei cu duhul zdrobit.",
        ref: "Psalmul 34:18",
      },
    },
    {
      id: "d1_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Citește încă o dată versetul ăsta și uită-te ce condiție pune. Niciuna.",
        },
        {
          from: "guide",
          text: "Nu scrie «aproape de cei nevinovați». Nu scrie «aproape de cei care au încercat destul». Scrie «aproape de cei cu inima înfrântă».",
        },
        { from: "guide", text: "Criteriul e că ești zdrobit, nu că ai dreptate." },
      ],
    },
    {
      id: "d1_6",
      type: "world_vs_truth",
      order: 6,
      bubbles: [
        { from: "guide", text: "Ce se spune: «ai scăpat, mergi mai departe, ești încă tânăr»." },
        {
          from: "guide",
          text: "Ce scrie: Dumnezeu nu grăbește doliul și nu-i pune termen. Vorbește despre femeia părăsită cu o delicatețe pe care rar o auzi de la oameni:",
        },
      ],
      scripture: {
        text: "Căci Domnul te chemă înapoi ca pe o femeie părăsită și cu inima întristată, ca pe o nevastă din tinerețe care a fost alungată, zice Dumnezeul tău.",
        ref: "Isaia 54:6",
      },
    },
    {
      id: "d1_7",
      type: "truth_simple",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Observă ce nu face textul: nu întreabă de ce a fost alungată și nu-i cere să se explice înainte de a fi chemată înapoi.",
        },
        {
          from: "guide",
          text: "Iar Dumnezeu folosește imaginea asta ca să vorbească despre El Însuși. Știe despre ce vorbește. Și El a fost părăsit de poporul cu care făcuse legământ.",
        },
      ],
    },
    {
      id: "d1_8",
      type: "quiz",
      order: 8,
      quiz: {
        question: "Ce condiție pune Psalmul 34:18 ca Dumnezeu să fie aproape?",
        options: [
          { text: "Să fii partea nevinovată", correct: false },
          { text: "Să fi încercat tot ce se putea ca să salvezi căsnicia", correct: false },
          { text: "Niciuna. Doar să fii zdrobit.", correct: true },
        ],
        explanation:
          "Apropierea Lui nu e un premiu pentru cine câștigă procesul. E răspunsul Lui la o inimă ruptă, indiferent cum a ajuns ruptă.",
      },
    },
    {
      id: "d1_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "Un lucru practic, înainte de orice altceva. După o despărțire, corpul o ia razna: nu dormi, nu mănânci sau mănânci prea mult, ești obosit tot timpul.",
        },
        {
          from: "guide",
          text: "Dacă asta ține de săptămâni, mergi la medic sau la psiholog. Dacă îți trece prin cap să îți faci rău, nu rămâne singur: pentru pericol imediat sună la 112, iar pentru sprijin emoțional poți încerca 116 123 și poți merge la camera de gardă.",
        },
        { from: "guide", text: "Nu e lipsă de credință. E îngrijire, ca la orice altă rană." },
      ],
    },
    {
      id: "d1_10",
      type: "step",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "Un singur lucru azi: spune-I cu voce tare ce ai pierdut. Nu ce ți s-a făcut — ce ai pierdut.",
        },
        {
          from: "guide",
          text: "«Am pierdut...» și completează. Sună ciudat prima dată. E prima oară când îi dai pierderii numele corect.",
        },
      ],
    },
    {
      id: "d1_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Domnul este aproape de cei cu inima înfrântă.",
        ref: "Psalmul 34:18",
      },
    },
    {
      id: "d1_12",
      type: "prayer",
      order: 12,
      bubbles: [
        {
          from: "guide",
          text: "«Nu știu ce să-Ți cer. Știu doar că s-a rupt ceva și că nu pot să-l lipesc la loc. Stai aici cu mine.»",
        },
      ],
    },
    {
      id: "d1_13",
      type: "journal",
      order: 13,
      journalPrompt:
        "Scrie tot ce ai pierdut. Nu doar persoana — și lucrurile mici: o zi din săptămână, un obicei, un loc unde nu mai mergi. Lasă lista neterminată.",
      bubbles: [{ from: "guide", text: "Răspunsul este opțional. Nu scrie nimic ce nu vrei să rămână salvat pe dispozitivul tău." }],
      reward: { xp: 0 },
    },
  ],
}

export const divortL2: Lesson = {
  id: "divort_l2",
  courseId: "path_divort",
  order: 2,
  title: "Ce a spus Iisus, de fapt",
  estMinutes: 13,
  anchorRefs: ["Matei 19:3-9", "Maleahi 2:13-16"],
  memoryVerseRef: "Matei 19:8",
  steps: [
    {
      id: "d2_1",
      type: "check_in",
      order: 1,
      choice: {
        prompt: "Ți s-a citat vreun verset în față?",
        options: [
          {
            id: "d2_c_oprire",
            label: "Da, ca să mă oprească",
            feedback: "Atunci ai dreptul să vezi versetul întreg, nu doar bucata care s-a folosit.",
          },
          {
            id: "d2_c_dupa",
            label: "Da, după, ca să mă condamne",
            feedback: "Asta doare altfel. Luăm astăzi exact versetele acelea.",
          },
          {
            id: "d2_c_teama",
            label: "Nu, dar mi-e teamă să deschid Biblia",
            feedback: "E un motiv întemeiat de teamă. Hai să le citim împreună, cu tot cu context.",
          },
          {
            id: "d2_c_nu",
            label: "Nu",
            feedback: "Bine. Atunci le vezi întâi întregi, nu în varianta cu care se lovește.",
          },
        ],
      },
    },
    {
      id: "d2_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Două texte se folosesc cel mai des împotriva omului divorțat." },
        {
          from: "guide",
          text: "Matei 19 și Maleahi 2. Le luăm pe amândouă, întregi. Nu ca să le înmuiem — ca să vezi ce spun cu adevărat, pentru că ce spun e altceva decât ce ai auzit.",
        },
      ],
    },
    {
      id: "d2_3",
      type: "scripture",
      order: 3,
      bubbles: [{ from: "guide", text: "Începe cu întrebarea care I se pune. Ea e cheia:" }],
      scripture: {
        text: "Fariseii au venit la El și, ca să-L ispitească, I-au zis: «Este îngăduit unui bărbat să-și lase nevasta pentru orice pricină?»",
        ref: "Matei 19:3",
      },
    },
    {
      id: "d2_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        { from: "guide", text: "Trei lucruri, care schimbă tot înțelesul." },
        {
          from: "guide",
          text: "Întâi: textul spune limpede că întrebarea era o capcană. «Ca să-L ispitească.» Nu voiau un răspuns pastoral, voiau un motiv de acuzare.",
        },
        {
          from: "guide",
          text: "Al doilea: «pentru orice pricină» era un termen tehnic. Era o dispută aprinsă între școlile rabinice, iar cea permisivă accepta motive ca mâncarea arsă sau o femeie mai frumoasă văzută în piață.",
        },
        {
          from: "guide",
          text: "Al treilea: «unui bărbat». Doar bărbatul putea. Femeia rămânea pe drum, fără venit și fără apărare.",
        },
      ],
    },
    {
      id: "d2_5",
      type: "scripture",
      order: 5,
      scripture: {
        text: "Iisus le-a răspuns: «Din pricina împietririi inimilor voastre a îngăduit Moise să vă lăsați nevestele; dar de la început n-a fost așa.»",
        ref: "Matei 19:8",
      },
    },
    {
      id: "d2_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "«Din pricina împietririi inimilor voastre.» Legea lui Moise cerea un act scris. Nu ca să facă divorțul ușor — ca femeia să aibă o hârtie în mână și să nu poată fi acuzată mai târziu.",
        },
        {
          from: "guide",
          text: "Era o protecție pentru cel slab, nu o permisiune pentru cel puternic. Iar Iisus, răspunzând, ridică ștacheta pentru bărbat. Nu o coboară pentru femeie.",
        },
        {
          from: "guide",
          text: "Textul ăsta a fost dat ca să oprească un bărbat să-și arunce nevasta din capriciu. Folosit ca să lovești pe cineva deja aruncat, e întors exact pe dos.",
        },
      ],
    },
    {
      id: "d2_7",
      type: "scripture",
      order: 7,
      bubbles: [{ from: "guide", text: "Al doilea text. Se citește de obicei doar jumătate din el:" }],
      scripture: {
        text: "Domnul a fost martor între tine și nevasta din tinerețea ta, căreia acum nu-i ești credincios... Căci Eu urăsc despărțirea, zice Domnul, Dumnezeul lui Israel, și pe cel ce își acoperă haina cu silnicie.",
        ref: "Maleahi 2:14-16",
      },
    },
    {
      id: "d2_8",
      type: "truth_simple",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "Către cine vorbește? Către bărbații care își lăsau nevestele din tinerețe ca să ia altele. Nu către cel lăsat.",
        },
        {
          from: "guide",
          text: "Și uită-te ce stă lângă «urăsc despărțirea», în aceeași propoziție: «și pe cel ce își acoperă haina cu silnicie». Silnicie înseamnă violență.",
        },
        {
          from: "guide",
          text: "Dumnezeu urăște și ruperea, și violența din care se rupe. Cine citește doar prima jumătate a versetului îl folosește împotriva a jumătate din oamenii pentru care a fost scris.",
        },
        {
          from: "guide",
          text: "O notă de onestitate: partea asta e printre cele mai greu de tradus din tot Vechiul Testament. Deschide-ți Biblia la Maleahi 2:16 și citește nota de subsol, dacă are.",
        },
      ],
    },
    {
      id: "d2_9",
      type: "world_vs_truth",
      order: 9,
      bubbles: [
        { from: "guide", text: "Ce se spune: «Dumnezeu urăște divorțul, deci Dumnezeu te urăște pe tine»." },
        {
          from: "guide",
          text: "Ce scrie: Dumnezeu urăște ruperea pentru că vede ce lasă în urmă. Urăște ce ți s-a făcut ție. A urî o boală nu înseamnă a urî bolnavul.",
        },
      ],
    },
    {
      id: "d2_10",
      type: "quiz",
      order: 10,
      quiz: {
        question: "Ce întrebau fariseii în Matei 19:3?",
        options: [
          { text: "Dacă divorțul e vreodată posibil", correct: false },
          { text: "Dacă un bărbat își poate lăsa nevasta pentru orice motiv", correct: true },
          { text: "Dacă o femeie divorțată mai poate intra în Templu", correct: false },
        ],
        explanation:
          "Întrebarea era despre limitele capriciului bărbatului, într-o cultură în care femeia nu avea niciun drept. Răspunsul lui Iisus o apără pe ea.",
      },
    },
    {
      id: "d2_11",
      type: "multi_choice",
      order: 11,
      multiChoice: {
        prompt: "Ce ți s-a spus, dintre lucrurile astea? Bifează ce ai auzit.",
        options: [
          { id: "d2_m_uraste", label: "Că Dumnezeu urăște divorțul, deci și pe tine" },
          { id: "d2_m_rugat", label: "Că dacă te rugai mai mult, nu se întâmpla" },
          { id: "d2_m_slujire", label: "Că nu mai poți sluji nicăieri" },
          { id: "d2_m_adulter", label: "Că dacă te recasătorești, trăiești în adulter" },
          { id: "d2_m_copii", label: "Că le-ai stricat viața copiilor" },
          { id: "d2_m_nimic", label: "Nimic din astea" },
        ],
      },
    },
    {
      id: "d2_12",
      type: "how_god_helps",
      order: 12,
      bubbles: [
        {
          from: "guide",
          text: "Dacă ai bifat ceva mai sus, reține atât: un verset folosit ca să zdrobească un om zdrobit e folosit împotriva scopului pentru care a fost scris.",
        },
        {
          from: "guide",
          text: "Asta nu înseamnă că tot ce s-a spus e greșit și că tu n-ai nicio parte. Înseamnă că partea ta se stabilește înaintea lui Dumnezeu, nu în gura cuiva. Facem asta în lecția 4.",
        },
      ],
    },
    {
      id: "d2_13",
      type: "memory_verse",
      order: 13,
      scripture: {
        text: "«Din pricina împietririi inimilor voastre a îngăduit Moise... dar de la început n-a fost așa.»",
        ref: "Matei 19:8",
      },
    },
    {
      id: "d2_14",
      type: "prayer",
      order: 14,
      bubbles: [
        {
          from: "guide",
          text: "«Nu vreau să Îmi îndoi cuvintele ca să-mi convină. Vreau să văd ce spui Tu, nu ce mi s-a spus în numele Tău.»",
        },
      ],
    },
    {
      id: "d2_15",
      type: "journal",
      order: 15,
      journalPrompt:
        "Scrie versetul care ți-a fost aruncat în față și cine ți l-a spus. Atât. Mâine nu faci nimic cu el.",
      reward: { xp: 0 },
    },
  ],
}

export const divortL3: Lesson = {
  id: "divort_l3",
  courseId: "path_divort",
  order: 3,
  title: "Nu Dumnezeu ți-a rupt casa",
  estMinutes: 13,
  anchorRefs: ["1 Corinteni 7:15", "Iacov 1:17"],
  memoryVerseRef: "1 Corinteni 7:15",
  safety: {
    topic: "abuse",
    notice:
      "Ce urmează atinge abandonul și violența în căsnicie. Poți opri oricând și poți reveni. Dacă acum ești în pericol, sună 112.",
  },
  steps: [
    {
      id: "d3_1",
      type: "step",
      order: 1,
      bubbles: [
        { from: "guide", text: "Înainte de orice, numerele. Pentru pericol imediat sună la 112; celelalte servicii au roluri și programe diferite." },
        { from: "guide", text: "Pericol imediat: 112." },
        { from: "guide", text: "Violență în familie: 0800 500 333." },
        { from: "guide", text: "Pentru un copil în pericol: 119." },
        { from: "guide", text: "Nu ești singur. Sună. Ne întoarcem la drum când ești în siguranță." },
      ],
    },
    {
      id: "d3_2",
      type: "check_in",
      order: 2,
      choice: {
        prompt: "Ți-a trecut prin cap că Dumnezeu te pedepsește prin ce s-a întâmplat?",
        options: [
          {
            id: "d3_c_da",
            label: "Da, mă gândesc des la asta",
            feedback: "E gândul cel mai greu de scos. Luăm azi exact temelia lui.",
          },
          {
            id: "d3_c_uneori",
            label: "Uneori, noaptea",
            feedback: "Noaptea vin cele mai proaste explicații. Nu înseamnă că sunt adevărate.",
          },
          {
            id: "d3_c_nu",
            label: "Nu, dar nu înțeleg de ce a permis",
            feedback: "Sunt două întrebări diferite și azi o lămurim pe prima.",
          },
        ],
      },
    },
    {
      id: "d3_3",
      type: "hook",
      order: 3,
      bubbles: [
        { from: "guide", text: "Dumnezeu nu ți-a rupt casa." },
        {
          from: "guide",
          text: "A rupt-o cineva. Poate celălalt. Poate amândoi. Poate ani de lucruri mici pe care nu le-a văzut nimeni la timp. Dar deciziile le-au luat oameni, nu El.",
        },
      ],
    },
    {
      id: "d3_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "Orice ni se dă bun și orice dar desăvârșit este de sus, coborându-se de la Tatăl luminilor, în care nu este nici schimbare, nici umbră de mutare.",
        ref: "Iacov 1:17",
      },
    },
    {
      id: "d3_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Dumnezeu i-a dat omului o voință reală. Dacă ar fi anulat-o de fiecare dată când cineva alege greșit, n-ar mai fi existat nici iubire, pentru că iubirea silită nu e iubire.",
        },
        {
          from: "guide",
          text: "Prețul e că alegerea unui om poate distruge viața altuia. Nu e o scăpare din plan. E costul libertății, și El Îl plătește cu noi, nu de la distanță.",
        },
      ],
    },
    {
      id: "d3_6",
      type: "scripture",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Pavel scrie unei biserici pline de căsnicii în care un soț crezuse și celălalt nu. Știa exact despre ce vorbește:",
        },
      ],
      scripture: {
        text: "Dacă cel necredincios vrea să se despartă, să se despartă; în împrejurarea aceasta, fratele sau sora nu sunt legați: Dumnezeu ne-a chemat să trăim în pace.",
        ref: "1 Corinteni 7:15",
      },
    },
    {
      id: "d3_7",
      type: "truth_simple",
      order: 7,
      bubbles: [
        { from: "guide", text: "«Nu sunt legați.» Două cuvinte pe care mulți oameni nu le-au auzit niciodată rostite într-o biserică." },
        {
          from: "guide",
          text: "Cine e părăsit nu e ținut în lanțuri de Dumnezeu. Iar motivul dat de Pavel nu e juridic: «Dumnezeu ne-a chemat să trăim în pace».",
        },
      ],
    },
    {
      id: "d3_8",
      type: "truth_simple",
      order: 8,
      bubbles: [
        { from: "guide", text: "Și partea despre care se tace cel mai mult." },
        {
          from: "guide",
          text: "Dacă ai plecat dintr-o casă în care erai lovit, amenințat sau în care copiii erau în pericol, plecarea pentru siguranță nu te face vinovat de violența celuilalt și nu te obligă să te întorci. Creștinii formulează diferit ce înseamnă abuzul pentru legământ; asupra siguranței nu negociem.",
        },
        {
          from: "guide",
          text: "Iertarea nu înseamnă împăcare, iar împăcarea nu înseamnă întoarcere în pericol. Nimeni, niciodată, nu îți poate cere să te întorci acolo în numele lui Dumnezeu.",
        },
        {
          from: "guide",
          text: "Dacă asta e situația ta, numerele de la începutul lecției rămân valabile azi, nu «cândva».",
        },
      ],
    },
    {
      id: "d3_9",
      type: "world_vs_truth",
      order: 9,
      bubbles: [
        { from: "guide", text: "Ce se spune: «dacă te rugai mai mult, nu se întâmpla»." },
        {
          from: "guide",
          text: "Ce scrie: rugăciunea nu anulează voința altui om. Nici Dumnezeu nu Și-a forțat poporul să rămână când a plecat — a plâns după el. Asta nu e o slăbiciune a Lui și nu e o greșeală a ta.",
        },
      ],
    },
    {
      id: "d3_10",
      type: "quiz",
      order: 10,
      quiz: {
        question: "Ce spune 1 Corinteni 7:15 despre cel părăsit?",
        options: [
          { text: "Să facă orice ca să-l aducă înapoi pe celălalt", correct: false },
          { text: "Că nu e legat și că e chemat să trăiască în pace", correct: true },
          { text: "Că rămâne vinovat până la moartea celuilalt", correct: false },
        ],
        explanation:
          "Pavel eliberează, nu leagă. Iar criteriul pe care îl dă este pacea, nu menținerea formei cu orice preț.",
      },
    },
    {
      id: "d3_11",
      type: "reflection",
      order: 11,
      bubbles: [
        {
          from: "guide",
          text: "Un lucru sincer, înainte de a închide. Nu îți cerem să spui de partea cui e vina — nici azi, nici în lecțiile următoare.",
        },
      ],
      response: {
        prompt:
          "Dacă ești convins că Dumnezeu te pedepsește, scrie într-un rând pentru ce anume crezi că te pedepsește. Doar ca să iasă din cap pe hârtie.",
        placeholder: "Poți lăsa gol.",
        required: false,
        minLength: 3,
      },
    },
    {
      id: "d3_12",
      type: "how_god_helps",
      order: 12,
      bubbles: [
        {
          from: "guide",
          text: "Dacă ai scris un păcat real, nu îl micșora: numește-l, mărturisește-l, repară ce se poate repara și acceptă urmările pe care nu le poți șterge. Dar nu declara automat că păcatul celuilalt sau destrămarea căsniciei este măsura condamnării lui Dumnezeu asupra ta. În Hristos nu mai este condamnare; consecințele pământești și disciplina pot rămâne.",
        },
        {
          from: "guide",
          text: "Și dacă gândul ăsta revine noaptea, săptămână după săptămână, spune-i unui om real. Un păstor, un consilier, un medic. Nu unei aplicații.",
        },
      ],
    },
    {
      id: "d3_13",
      type: "memory_verse",
      order: 13,
      scripture: {
        text: "Fratele sau sora nu sunt legați: Dumnezeu ne-a chemat să trăim în pace.",
        ref: "1 Corinteni 7:15",
      },
    },
    {
      id: "d3_14",
      type: "prayer",
      order: 14,
      bubbles: [
        {
          from: "guide",
          text: "«Nu Tu ai făcut asta. Ajută-mă să nu Te mai acuz și să nu mă mai acuz pe mine pentru ce a ales altcineva.»",
        },
      ],
    },
    {
      id: "d3_15",
      type: "journal",
      order: 15,
      journalPrompt:
        "Scrie o listă cu două coloane: ce a fost alegerea mea și ce a fost alegerea altcuiva. Nu o termina azi.",
      reward: { xp: 0 },
    },
  ],
}
