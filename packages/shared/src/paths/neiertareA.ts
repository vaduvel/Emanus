import type { Lesson } from "../domain.js"

/*
 * Parcursul "Neiertare" — lecțiile 1-3 (pașii 1-3 din schelet).
 * Reguli: docs/20-parcursuri-personal-generalizate.md §6.
 * Fără întrebări de diagnostic. Afirmații, nu formulare.
 */

export const neiertareL1: Lesson = {
  id: "neiertare_l1",
  courseId: "path_neiertare",
  order: 1,
  title: "Ce ți s-a făcut a fost real",
  estMinutes: 9,
  anchorRefs: ["Psalm 34:18", "Psalm 56:8"],
  memoryVerseRef: "Psalm 34:18",
  steps: [
    {
      id: "n1_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Bine că ești aici. Sunt Daniel." },
        { from: "guide", text: "Înainte de orice — cum ești azi?" },
      ],
    },
    {
      id: "n1_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Ai intrat aici pentru că e cineva pe care nu poți să-l ierți." },
        {
          from: "guide",
          text: "Nu îți cer numele lui și nu îți cer povestea. Tu le știi. Eu am altceva de spus.",
        },
      ],
    },
    {
      id: "n1_3",
      type: "name_struggle",
      order: 3,
      bubbles: [
        { from: "guide", text: "Primul lucru e ăsta, și vreau să-l auzi limpede:" },
        { from: "guide", text: "Ce ți s-a făcut a fost real. A fost greșit. Și te-a costat." },
      ],
    },
    {
      id: "n1_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Poate ți s-a spus «iartă și treci peste». Poate ți s-a spus «era și el om», sau «nu mai scormoni».",
        },
        {
          from: "guide",
          text: "Oamenii spun asta ca să se termine discuția, nu ca să te vindece. Iar tu ai rămas cu lucrul ăla în piept și cu impresia că și Dumnezeu ți-l trece cu vederea.",
        },
        { from: "guide", text: "Nu ți-l trece cu vederea." },
      ],
    },
    {
      id: "n1_5",
      type: "scripture",
      order: 5,
      scripture: {
        text: "Domnul este aproape de cei cu inima zădrobită și mântuiește pe cei cu duhul zdrobit.",
        ref: "Psalm 34:18",
      },
    },
    {
      id: "n1_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "David a scris asta fugind de un rege care voia să-l omoare, după ce fusese trădat de oameni din casa lui. Nu e o vorbă frumoasă de pe un magnet de frigider. E scrisă de un om căruia i se făcuse nedreptate ani de zile.",
        },
        { from: "guide", text: "Și spune că Dumnezeu nu stă departe când ești sfărâmat. Se apropie." },
      ],
    },
    {
      id: "n1_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Tu numeri pașii vieții mele de pribeag; pune-mi lacrimile în burduful Tău: nu sunt ele scrise în cartea Ta?",
        ref: "Psalm 56:8",
      },
    },
    {
      id: "n1_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "Imaginea din versetul ăsta e ciudată și de asta e bună: un om strânge lacrimile altcuiva într-un vas și le păstrează.",
        },
        {
          from: "guide",
          text: "Adică: nimic din ce ai plâns nu s-a pierdut. Nimeni nu ți-a spus «exagerezi» acolo sus. S-a ținut socoteală de fiecare.",
        },
      ],
    },
    {
      id: "n1_9",
      type: "truth_simple",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "Deci să fim înțeleși de la început: drumul ăsta nu începe cu «nu a fost așa de grav».",
        },
        { from: "guide", text: "Începe cu: a fost grav, Și El a văzut tot." },
      ],
    },
    {
      id: "n1_10",
      type: "step",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "Pasul de azi, și e singurul: nu ierta pe nimeni astăzi. Nu îți cer asta și nici nu e vremea.",
        },
        {
          from: "guide",
          text: "Astăzi doar spune-I lui Dumnezeu, cu voce tare, ce ți s-a făcut. Nu frumos. Așa cum a fost. Poți în mașină, poți în bucătărie. Un minut.",
        },
      ],
    },
    {
      id: "n1_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Domnul este aproape de cei cu inima zădrobită.",
        ref: "Psalm 34:18",
      },
    },
    {
      id: "n1_12",
      type: "prayer",
      order: 12,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, nu vin să-ți spun că sunt bine. Nu sunt. M-a durut și încă mă doare. Tu ai văzut tot și n-ai uitat nimic. Nu-ți cer încă să pot ierta. Îți cer doar să fii aproape, așa cum ai spus că ești. Amin.",
        },
      ],
    },
    {
      id: "n1_13",
      type: "journal",
      order: 13,
      journalPrompt:
        "Ce s-a întâmplat? Scrie cu cuvintele tale. Nu citește nimeni — dar peste două săptămâni ți-l arăt ție.",
      reward: { xp: 0 },
    },
  ],
}

export const neiertareL2: Lesson = {
  id: "neiertare_l2",
  courseId: "path_neiertare",
  order: 2,
  title: "Dumnezeu n-a fost de partea lui",
  estMinutes: 10,
  anchorRefs: ["Geneza 3:1-5", "Ioan 10:10", "Romani 12:19"],
  memoryVerseRef: "Ioan 10:10",
  steps: [
    {
      id: "n2_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Bine că te-ai întors. Cum ești azi?" }],
    },
    {
      id: "n2_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Azi vorbim despre întrebarea pe care n-o spui cu voce tare: unde a fost Dumnezeu când s-a întâmplat.",
        },
        {
          from: "guide",
          text: "Și despre gândul care vine după ea: dacă a văzut și n-a oprit, înseamnă că a fost de acord.",
        },
      ],
    },
    {
      id: "n2_3",
      type: "name_struggle",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Poate n-ai spus-o niciodată așa. Dar undeva în tine e o suspiciune: că Dumnezeu te-a lăsat. Că poate așa ți-a trebuit. Că poate a fost o pedeapsă pentru ceva.",
        },
        { from: "guide", text: "Iar cu suspiciunea aia în tine, nu poți ierta pe nimeni. Pentru că de fapt Îl ții pe El de vină." },
      ],
    },
    {
      id: "n2_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Hai la începutul de tot. Prima minciună din istorie n-a fost despre un fruct.",
        },
        {
          from: "guide",
          text: "Șarpele n-a zis «mănâncă». A zis: «Dumnezeu știe că, în ziua când veți mânca, veți fi ca El». Adică: ține ceva de tine. Nu-ți vrea binele. Nu te iubește.",
        },
        { from: "guide", text: "Prima minciună a fost despre caracterul lui Dumnezeu. Și e încă în uz." },
      ],
    },
    {
      id: "n2_5",
      type: "scripture",
      order: 5,
      scripture: {
        text: "Hoțul nu vine decât să fure, să junghie și să prapădească. Eu am venit ca oile să aibă viață, și s-o aibă din belșug.",
        ref: "Ioan 10:10",
      },
    },
    {
      id: "n2_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Iisus împarte lumea în două mișcări, foarte simplu. Ce fură, ce distruge, ce omoară — nu e de la El. Ce dă viață — e de la El.",
        },
        {
          from: "guide",
          text: "Pune ce ți s-a făcut ție în una din cele două coloane. Nu e greu de încadrat.",
        },
      ],
    },
    {
      id: "n2_7",
      type: "quiz",
      order: 7,
      quiz: {
        question: "Ce ți s-a făcut — de unde a venit?",
        options: [
          { text: "De la Dumnezeu, ca să mă învețe ceva", correct: false },
          { text: "Dintr-o inimă de om, lăsată liberă să aleagă răul", correct: true },
          { text: "Din întâmplare, nu înseamnă nimic", correct: false },
        ],
        explanation:
          "Dumnezeu poate scoate ceva bun din orice. Dar asta nu înseamnă că El a comandat răul. Omul care ți-a făcut rău a ales singur, și Dumnezeu n-a fost de partea lui în clipa aia.",
      },
    },
    {
      id: "n2_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "E și un al doilea lucru, și ți-l spun pentru că pe unii îi eliberează mai mult decât orice:",
        },
        {
          from: "guide",
          text: "Dumnezeu nu i-a spus niciodată «nu-i nimic» celui care ți-a făcut rău. Pavel scrie: «Nu vă răzbunați singuri; a Mea este răzbunarea, Eu voi răsplăti».",
        },
        {
          from: "guide",
          text: "Nu ți se cere să renunți la dreptate. Ți se cere să predai dosarul cuiva care judecă mai bine decât tine. Și care nu obosește.",
        },
      ],
    },
    {
      id: "n2_9",
      type: "scripture",
      order: 9,
      scripture: {
        text: "Nu vă răzbunați singuri, preaiubiților, ci lăsați să se răzbune mânia lui Dumnezeu.",
        ref: "Romani 12:19",
      },
    },
    {
      id: "n2_10",
      type: "step",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "Pasul de azi: spune-I o singură propoziție. «Doamne, am crezut că ai fost de partea lui. Îmi retrag acuzația.»",
        },
        { from: "guide", text: "Dacă nu poți încă, spune-I asta: «Vreau să pot spune asta.» E de-ajuns pentru azi." },
      ],
    },
    {
      id: "n2_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Eu am venit ca oile să aibă viață, și s-o aibă din belșug.",
        ref: "Ioan 10:10",
      },
    },
    {
      id: "n2_12",
      type: "prayer",
      order: 12,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, am purtat gândul că Tu ai îngăduit și deci ai vrut. Astăzi îți spun că nu mai vreau să Te țin de vină. Arată-mi cine ești cu adevărat, nu cine mi s-a spus că ești. Amin.",
        },
      ],
    },
    {
      id: "n2_13",
      type: "journal",
      order: 13,
      journalPrompt: "Ce ai crezut până azi despre Dumnezeu, în legătură cu ce ți s-a întâmplat?",
      reward: { xp: 0 },
    },
  ],
}

export const neiertareL3: Lesson = {
  id: "neiertare_l3",
  courseId: "path_neiertare",
  order: 3,
  title: "De ce te ține și acum",
  estMinutes: 10,
  anchorRefs: ["Evrei 12:15", "Efeseni 4:26-27"],
  memoryVerseRef: "Evrei 12:15",
  steps: [
    {
      id: "n3_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum ești azi?" }],
    },
    {
      id: "n3_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Azi e ziua incomodă din parcursul ăsta. Până acum am vorbit despre ce ți s-a făcut. Azi vorbim despre ce s-a făcut în tine după aceea.",
        },
        { from: "guide", text: "Nu e același lucru și nu ai aceeași putere asupra lor." },
      ],
    },
    {
      id: "n3_3",
      type: "name_struggle",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Poate omul ăla doarme bine. Poate și-a văzut de viață. Poate a murit. Poate nici nu știe ce ți-a făcut.",
        },
        { from: "guide", text: "Iar tu îl cari cu tine de ani de zile. Îl iei la muncă. Îl iei în pat." },
      ],
    },
    {
      id: "n3_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "Luați seama ca nu cumva să răsară vreo rădăcină de amărăciune care să vă aducă tulburare, și mulți să fie întinați de ea.",
        ref: "Evrei 12:15",
      },
    },
    {
      id: "n3_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Cuvântul folosit acolo e rădăcină. Nu rană. O rană se închide. O rădăcină crește și scoate roade în altă parte decât unde a fost pusă.",
        },
        {
          from: "guide",
          text: "De asta te răstești la copil pentru un pahar vărsat. De asta nu mai ai încredere în nimeni. De asta ești obosit tot timpul.",
        },
        { from: "guide", text: "Și textul spune și cine plătește: «mulți». Nu el. Ai tăi." },
      ],
    },
    {
      id: "n3_6",
      type: "world_vs_truth",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Am crezut multă vreme că, dacă nu iert, îl țin pe el legat. Că dacă iert, îl las să scape.",
        },
        { from: "guide", text: "Uită-te la viața lui și uită-te la a ta. Care din voi doi e legat?" },
      ],
    },
    {
      id: "n3_7",
      type: "quiz",
      order: 7,
      quiz: {
        question: "Cine plătește prețul neiertării?",
        options: [
          { text: "Cel care mi-a greșit", correct: false },
          { text: "Eu și oamenii din jurul meu", correct: true },
          { text: "Nimeni, dacă nu vorbesc despre asta", correct: false },
        ],
        explanation:
          "Amărăciunea nu ajunge niciodată la cel care a făcut răul. Rămâne în tine și se scurge în oamenii pe care îi iubești.",
      },
    },
    {
      id: "n3_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Mâniați-vă și nu păcătuiți. Să n-apună soarele peste mânia voastră și să nu dați prilej diavolului.",
        ref: "Efeseni 4:26-27",
      },
    },
    {
      id: "n3_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "Observă ce nu spune Pavel: nu spune «nu vă mâniați». Mânia în fața nedreptății e sănătoasă. Iisus a răsturnat mese.",
        },
        {
          from: "guide",
          text: "Spune să nu-i dai voie să doarmă la tine în casă. Pentru că dacă rămâne peste noapte, a doua zi începe să plătească chirie și să mute mobila.",
        },
      ],
    },
    {
      id: "n3_10",
      type: "step",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "Pasul de azi: găsește un loc din viața ta unde rădăcina a scos deja roade. Un om asupra căruia te-ai descărcat și care n-avea nicio vină.",
        },
        { from: "guide", text: "Nu-i explica nimic. Doar cere-i iertare pentru data aia. Atât." },
      ],
    },
    {
      id: "n3_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Luați seama ca nu cumva să răsară vreo rădăcină de amărăciune.",
        ref: "Evrei 12:15",
      },
    },
    {
      id: "n3_12",
      type: "prayer",
      order: 12,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, nu mai vreau să plătească ai mei pentru ce mi-a făcut altcineva. Arată-mi unde a ajuns rădăcina asta în viața mea. Nu mă cruța. Amin.",
        },
      ],
    },
    {
      id: "n3_13",
      type: "journal",
      order: 13,
      journalPrompt: "Peste cine s-a scurs, din ce am înăuntru?",
      reward: { xp: 0 },
    },
  ],
}
