import type { Lesson } from "../domain.js"

/*
 * Parcursul "Greutate" — pentru ușile `anxietate` și `tristete`.
 *
 * CAMERA: c8 — "Nu mai am putere / mi-e frică tot timpul"
 * MINCIUNA: "Dacă aș avea destulă credință, aș fi bine."
 * PROMISIUNEA: nu-ți promitem că trece; îți promitem că nu ești vinovat că doare
 *              și că nu mergi singur prin asta.
 *
 * DE CE EXISTĂ SEPARAT:
 * Până acum ușile `anxietate` și `tristete` cădeau în `path_schimbare`, a cărui
 * minciună de cameră este "Sunt defect, asta sunt", alături de `dependenta`,
 * `recadere`, `pornografie` și `furie`. Adică omul care intra cu anxietate sau cu
 * depresie primea, din prima secundă, mesajul că problema lui e caracterul.
 * docs/22-siguranta.md §1 interzice exact asta: "Nu punem vina pe om. Anxietatea,
 * tristetea, epuizarea, insomnia pot avea cauze medicale." Parcursul acesta le
 * scoate din camera greșită și le dă o cameră proprie.
 *
 * REGULI NENEGOCIABILE ÎN ACEST PARCURS (docs/22 §1, §3, §11):
 * 1. Nu se pune vina pe om pentru un simptom care poate fi medical.
 * 2. Nu se promite vindecarea. Nicăieri, nici măcar implicit.
 * 3. Medicul, psihologul și tratamentul NU sunt prezentate ca lipsă de credință.
 * 4. Oriunde se atinge gândul de a-ți face rău, numerele apar în ACELAȘI pas și
 *    înaintea oricărui verset: 112, 116 123, iar pentru minori 116 111.
 * 5. Lecțiile marcate `safety.topic: "mental_health"` primesc ecranul separat de
 *    avertizare, înainte de prima bulă (docs/22 §2).
 * 6. Nicio lecție nu se termină fără un pas concret pentru azi și niciuna nu e
 *    fundătură: lecția 7 face puntea mai departe.
 *
 * VOCEA: Emanus. Fără nume de om. Nu se preface că citește ce scrie utilizatorul.
 * MĂSURARE: `reward.xp` rămâne 0 peste tot (docs/22 §8). Nu se afișează scor.
 *
 * ORDINEA: durere recunoscută → cap și corp separate → nevoia fizică → plânsul
 * are voie în Biblie → Iisus a spus-o cu gura Lui → ce faci mâine → ziua grea
 * care revine.
 *
 * Fișierul exportă doar lecții. `PathDef` se asamblează în paths/index.ts.
 */

export const greutateL1: Lesson = {
  id: "greutate_l1",
  courseId: "path_greutate",
  order: 1,
  title: "Nu ești slab pentru că te doare",
  estMinutes: 11,
  anchorRefs: ["Psalmul 34:18", "2 Corinteni 1:8-9"],
  memoryVerseRef: "Psalmul 34:18",
  safety: {
    topic: "mental_health",
    notice:
      "Ce urmează atinge anxietatea, tristețea grea și epuizarea. Poți opri oricând și poți reveni. Dacă acum ești în pericol sau te gândești să îți faci rău, apasă aici.",
  },
  steps: [
    {
      id: "g1_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum ești azi? Nu răspunsul pe care îl dai la serviciu." }],
    },
    {
      id: "g1_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Dacă ai deschis ușa asta, probabil ai auzit deja propoziția: «roagă-te mai mult și o să-ți treacă».",
        },
        {
          from: "guide",
          text: "Și probabil te-ai rugat. Și n-a trecut. Iar de atunci cari două lucruri, nu unul: greutatea, și vina că mai ai greutatea.",
        },
        { from: "guide", text: "Începem prin a lăsa jos al doilea lucru." },
      ],
    },
    {
      id: "g1_3",
      type: "choice",
      order: 3,
      choice: {
        prompt: "Ce te apasă mai tare acum?",
        options: [
          {
            id: "g1_frica",
            label: "Frica. Nu-mi dă pace nici când nu e nimic.",
            feedback: "Bine. Rămânem la asta, fără să-ți cerem s-o oprești la comandă.",
          },
          {
            id: "g1_gol",
            label: "Golul. Nu mai simt nimic, nici bun, nici rău.",
            feedback: "Golul e mai greu de povestit decât durerea. E la fel de real.",
          },
          {
            id: "g1_epuizare",
            label: "Epuizarea. Mă trezesc deja obosit.",
            feedback: "Oboseala care nu trece după somn nu e lene. Ține minte asta.",
          },
          {
            id: "g1_toate",
            label: "Toate, pe rând, în aceeași zi.",
            feedback: "Atunci mergem încet. Nu e nimic de recuperat aici.",
          },
        ],
      },
    },
    {
      id: "g1_4",
      type: "name_struggle",
      order: 4,
      bubbles: [
        { from: "guide", text: "Hai să numim minciuna, ca s-o vezi în față." },
        { from: "guide", text: "«Dacă aș avea destulă credință, aș fi bine.»" },
        {
          from: "guide",
          text: "Propoziția asta se spune des și nu e în Biblie. Nicăieri. Ea nu vindecă pe nimeni, doar mută vina pe cel care oricum abia se ține.",
        },
      ],
    },
    {
      id: "g1_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Lumea îți spune: e în capul tău, treci peste. Unii creștini îți spun: e păcat sau lipsă de credință.",
        },
        {
          from: "guide",
          text: "Adevărul e mai simplu și mult mai puțin acuzator: anxietatea, tristețea care nu trece, epuizarea și insomnia pot avea cauze medicale. Tiroidă, anemie, un medicament, o depresie, o traumă veche.",
        },
        {
          from: "guide",
          text: "De aceea ți-o spunem din prima lecție, nu din ultima: mergi la medic sau la psiholog. Nu e trădare și nu e lipsă de credință. Un om cu piciorul rupt se roagă și merge la ortoped. Nu alege între ele.",
        },
        {
          from: "guide",
          text: "Iar dacă acum te gândești să îți faci rău, oprește lecția aici. 112. Sau 116 123, gratuit, non-stop. Dacă ai sub 18 ani, 116 111. Nu ești singur. Sună. Ne întoarcem la drum când ești în siguranță.",
        },
      ],
    },
    {
      id: "g1_6",
      type: "scripture",
      order: 6,
      scripture: {
        text: "Domnul este aproape de cei cu inima înfrântă și mântuiește pe cei cu duhul zdrobit.",
        ref: "Psalmul 34:18",
      },
    },
    {
      id: "g1_7",
      type: "truth_simple",
      order: 7,
      bubbles: [
        { from: "guide", text: "Uită-te unde stă Dumnezeu în versetul ăsta. Nu deasupra. Aproape." },
        {
          from: "guide",
          text: "Nu scrie «Domnul îi repară imediat pe cei cu inima înfrântă». Scrie că e aproape de ei. Prezența vine înaintea rezolvării, și uneori vine fără ea.",
        },
        {
          from: "guide",
          text: "«Duh zdrobit» nu înseamnă om păcătos. În psalmi înseamnă om făcut bucăți. Nu ești certat în versetul ăsta. Ești căutat.",
        },
      ],
    },
    {
      id: "g1_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "Ca să nu crezi că ești o excepție rușinoasă: Pavel scrie despre el însuși că a fost «apăsat peste măsură de mult, mai presus de puterile noastre, așa că nici nu mai trăgeam nădejde de viață».",
        },
        {
          from: "guide",
          text: "Omul care a scris jumătate din Noul Testament a ajuns să nu mai spere că trăiește. Și nu se scuză pentru asta, nu-și cere iertare, nu ascunde.",
        },
        {
          from: "guide",
          text: "Dacă lui i s-a permis să pună propoziția aia într-o scrisoare care se citește de două mii de ani, ție ți se permite s-o simți marți dimineața.",
        },
      ],
    },
    {
      id: "g1_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Ai o perioadă foarte grea și te programezi la medic pentru asta. Ce înseamnă?",
        options: [
          { text: "Că nu am destulă credință", correct: false },
          {
            text: "Că fac exact ce e de făcut: mă îngrijesc de ceva ce poate fi medical",
            correct: true,
          },
          { text: "Că trebuie să aleg între rugăciune și tratament", correct: false },
        ],
        explanation:
          "Nicăieri nu ți se cere să alegi între a te ruga și a te trata. Luca, cel care a scris o evanghelie și Faptele Apostolilor, era medic de meserie. Rugăciunea și consultația încap în aceeași zi.",
      },
    },
    {
      id: "g1_10",
      type: "step",
      order: 10,
      bubbles: [
        { from: "guide", text: "Pasul de azi e mic, pentru că azi n-ai putere de unul mare." },
        { from: "guide", text: "Spune cu voce tare, o dată: «Mă doare. Nu sunt vinovat că mă doare.»" },
        {
          from: "guide",
          text: "Și, dacă n-ai făcut-o deja, deschide telefonul și pune-ți o alarmă cu ora la care suni mâine la medic sau la un psiholog. Nu suna acum dacă nu poți. Doar pune ora.",
        },
      ],
    },
    {
      id: "g1_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Domnul este aproape de cei cu inima înfrântă.",
        ref: "Psalmul 34:18",
      },
    },
    {
      id: "g1_12",
      type: "prayer",
      order: 12,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, nu vin cu putere, vin cu ce a mai rămas. Nu-Ți cer să-mi explici. Îți cer să fii aproape, așa cum ai spus că ești de cei zdrobiți. Și dă-mi mâine putere cât pentru un singur pas. Amin.",
        },
      ],
    },
    {
      id: "g1_13",
      type: "journal",
      order: 13,
      journalPrompt: "Ce ți s-a spus despre starea ta și te-a rănit? Scrie propoziția aici, o dată.",
      reward: { xp: 0 },
    },
  ],
}

export const greutateL2: Lesson = {
  id: "greutate_l2",
  courseId: "path_greutate",
  order: 2,
  title: "Frica din cap și greutatea din corp",
  estMinutes: 12,
  anchorRefs: ["Filipeni 4:6-7", "Psalmul 94:19"],
  memoryVerseRef: "Psalmul 94:19",
  safety: {
    topic: "mental_health",
    notice:
      "Ce urmează atinge simptomele fizice ale anxietății și ale depresiei. Poți opri oricând și poți reveni. Dacă acum ești în pericol sau te gândești să îți faci rău, apasă aici.",
  },
  steps: [
    {
      id: "g2_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Bine că te-ai întors. Cum ai dormit?" }],
    },
    {
      id: "g2_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Azi despărțim două lucruri pe care le amestecăm mereu: frica din cap și greutatea din corp.",
        },
        { from: "guide", text: "Nu se rezolvă la fel. Și niciunul nu se rezolvă cu vină." },
      ],
    },
    {
      id: "g2_3",
      type: "name_struggle",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Frica din cap sună într-un fel: «dacă?». Dacă mă îmbolnăvesc. Dacă mă lasă. Dacă pierd slujba. Dacă am spus ceva greșit acum trei zile.",
        },
        {
          from: "guide",
          text: "Greutatea din corp nu sună deloc. E doar apăsare în piept, mâini reci, somn rupt la trei dimineața, inimă care bate fără motiv, stomac strâns.",
        },
        {
          from: "guide",
          text: "Cei mai mulți oameni le au pe amândouă și își reproșează amândouă. Iar al doilea reproș e complet nedrept.",
        },
      ],
    },
    {
      id: "g2_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Lumea zice: gândește pozitiv. Unii creștini zic: nu te îngrijora, scrie în Biblie.",
        },
        {
          from: "guide",
          text: "Amândouă cer același lucru imposibil — să te oprești din simțit, la comandă.",
        },
        {
          from: "guide",
          text: "Corpul nu ascultă de comenzi. Corpul ascultă de somn, de mâncare, de mișcare, de tratament și de timp. Dacă ai simptome fizice de mai bine de două săptămâni, du-le la medic, nu doar la rugăciunea de seară. Le poți duce în ambele locuri. Medicul nu e opțional.",
        },
      ],
    },
    {
      id: "g2_5",
      type: "scripture",
      order: 5,
      scripture: {
        text: "Nu vă îngrijorați de nimic, ci în orice lucru aduceți cererile voastre la cunoștința lui Dumnezeu, prin rugăciuni și cereri, cu mulțumiri. Și pacea lui Dumnezeu, care întrece orice pricepere, vă va păzi inimile și gândurile în Hristos Iisus.",
        ref: "Filipeni 4:6-7",
      },
    },
    {
      id: "g2_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Versetul ăsta ți-a fost aruncat de multe ori ca o palmă. Uită-te ce scrie de fapt.",
        },
        {
          from: "guide",
          text: "Nu scrie «nu simți». Scrie «aduceți». E o mutare, nu o interdicție. Iei grija din mâna ta și o pui în altă mână. Poți face mutarea asta și când tremuri.",
        },
        {
          from: "guide",
          text: "Și nu promite că îți dispare problema. Promite pază pentru inimă și gânduri în timp ce problema e încă acolo. E altă promisiune decât ți s-a vândut.",
        },
      ],
    },
    {
      id: "g2_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Pavel scrie asta din închisoare, nu de pe o plajă. Omul care spune «nu vă îngrijorați» nu avea nimic sub control și nu știa dacă iese viu.",
        },
        {
          from: "guide",
          text: "Deci nu e sfat de la cineva căruia îi merge bine. E o metodă de la cineva care n-avea nicio ieșire.",
        },
      ],
    },
    {
      id: "g2_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Când gândurile se frământă cu grămada înăuntrul meu, mângâierile Tale îmi înviorează sufletul.",
        ref: "Psalmul 94:19",
      },
    },
    {
      id: "g2_9",
      type: "truth_simple",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "«Cu grămada.» Psalmul nu se preface. Nu spune că omul credincios are un singur gând, ordonat și liniștit.",
        },
        { from: "guide", text: "Spune că peste grămada aia vine mângâiere. Nu în locul ei. Peste ea." },
      ],
    },
    {
      id: "g2_10",
      type: "quiz",
      order: 10,
      quiz: {
        question:
          "Te trezești la trei dimineața cu inima bătând tare, a treia noapte la rând. Care e primul lucru de făcut?",
        options: [
          { text: "Să mă rog mai mult și să nu spun nimănui", correct: false },
          {
            text: "Să notez ce se întâmplă, să merg la medic și să mă rog în același timp",
            correct: true,
          },
          { text: "Să caut ce păcat ascuns am", correct: false },
        ],
        explanation:
          "Bătăile de inimă, insomnia și apăsarea în piept sunt simptome fizice. Se duc la medic. Rugăciunea nu se oprește, dar nu ține locul unei consultații. Iar căutarea unui păcat ascuns, la trei dimineața, nu vindecă pe nimeni.",
      },
    },
    {
      id: "g2_11",
      type: "step",
      order: 11,
      bubbles: [
        { from: "guide", text: "Pasul de azi are două jumătăți: una pentru cap, una pentru corp." },
        {
          from: "guide",
          text: "Pentru cap: ia o hârtie și scrie fiecare «dacă?» care te-a bântuit azi, câte unul pe rând. Când termini, citește lista cu voce tare și spune după fiecare: «asta o duc la Dumnezeu, n-o mai duc eu prin noapte.»",
        },
        {
          from: "guide",
          text: "Pentru corp: alege un singur lucru pentru diseară. Culcare cu o oră mai devreme, o plimbare de zece minute sau telefonul lăsat în altă cameră. Unul, nu trei.",
        },
      ],
    },
    {
      id: "g2_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "Când gândurile se frământă cu grămada înăuntrul meu, mângâierile Tale îmi înviorează sufletul.",
        ref: "Psalmul 94:19",
      },
    },
    {
      id: "g2_13",
      type: "prayer",
      order: 13,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, Îți aduc lista, nu liniștea. N-am liniște de dat. Ține Tu ce am scris, ca să pot dormi eu. Și ajută-mă să fac diseară lucrul mic pe care l-am ales. Amin.",
        },
      ],
    },
    {
      id: "g2_14",
      type: "journal",
      order: 14,
      journalPrompt: "Care «dacă?» revine cel mai des?",
      reward: { xp: 0 },
    },
  ],
}

export const greutateL3: Lesson = {
  id: "greutate_l3",
  courseId: "path_greutate",
  order: 3,
  title: "Ilie a primit mai întâi somn și mâncare",
  estMinutes: 11,
  anchorRefs: ["1 Regi 19:3-9"],
  memoryVerseRef: "1 Regi 19:7",
  safety: {
    topic: "mental_health",
    notice:
      "În lecția asta citim o pagină din Biblie în care un om Îi cere lui Dumnezeu să-i ia viața. Poți opri oricând și poți reveni. Dacă acum ești în pericol sau te gândești să îți faci rău, apasă aici.",
  },
  steps: [
    {
      id: "g3_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Ai mâncat ceva azi? Întrebarea nu e retorică." }],
    },
    {
      id: "g3_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Azi citim o pagină din Biblie care se predică rar, pentru că nu se termină cu o lecție frumoasă.",
        },
        {
          from: "guide",
          text: "Un profet ajunge la capătul puterilor. Iar primul răspuns al lui Dumnezeu n-a fost o predică.",
        },
      ],
    },
    {
      id: "g3_3",
      type: "world_vs_truth",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Înainte să citim: în pagina asta omul Îi cere lui Dumnezeu să-i ia viața. Dacă gândul ăsta e și al tău acum, oprește aici. 112. Sau 116 123, gratuit, non-stop. Dacă ai sub 18 ani, 116 111. Sună întâi. Citim după.",
        },
      ],
    },
    {
      id: "g3_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "A plecat în pustie cale de o zi și a cerut să moară, zicând: «Destul! Acum, Doamne, ia-mi sufletul, căci nu sunt mai bun decât părinții mei.» S-a culcat și a adormit sub un ienupăr.",
        ref: "1 Regi 19:4-5",
      },
    },
    {
      id: "g3_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Ca să înțelegi cât de ciudat e momentul: cu câteva zile înainte, Ilie tocmai văzuse focul căzând din cer, în fața a sute de oameni. Cea mai mare zi din viața lui.",
        },
        {
          from: "guide",
          text: "Prăbușirea a venit după victorie, nu după eșec. Dacă și ție ți-a venit valul într-o perioadă în care «totul era bine», nu ești defect. Așa se întâmplă des.",
        },
      ],
    },
    {
      id: "g3_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Acum uită-te ce face Dumnezeu. Și, mai ales, în ce ordine." },
        {
          from: "guide",
          text: "Nu-l ceartă. Nu-i spune «unde ți-e credința». Nu-i amintește de focul de acum trei zile. Îl lasă să doarmă. Trimite pe cineva cu o turtă coaptă și un ulcior cu apă. Îl lasă să doarmă a doua oară. Îi mai dă o dată de mâncare.",
        },
        {
          from: "guide",
          text: "Abia după somn, mâncare, somn și mâncare, urmează conversația. Patruzeci de zile mai târziu.",
        },
      ],
    },
    {
      id: "g3_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Scoală-te și mănâncă, fiindcă drumul pe care-l ai de făcut este prea lung pentru tine.",
        ref: "1 Regi 19:7",
      },
    },
    {
      id: "g3_8",
      type: "truth_simple",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "«Drumul este prea lung pentru tine.» Dumnezeu îi dă dreptate. Nu-i spune că exagerează.",
        },
        {
          from: "guide",
          text: "Prima teologie pe care i-a dat-o a fost o pâine. Dacă Dumnezeu a început cu somn și mâncare, nici tu n-ai voie să sari peste ele ca să treci direct la partea spirituală.",
        },
      ],
    },
    {
      id: "g3_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Care a fost primul răspuns al lui Dumnezeu pentru un om care voia să moară?",
        options: [
          { text: "O mustrare pentru lipsă de credință", correct: false },
          { text: "Somn, apă și mâncare, de două ori", correct: true },
          { text: "O misiune nouă, imediat", correct: false },
        ],
        explanation:
          "Îngrijirea corpului n-a fost o etapă de mai jos, pe care Dumnezeu o tolerează. A fost primul lucru pe care l-a făcut, înainte de orice discuție.",
      },
    },
    {
      id: "g3_10",
      type: "step",
      order: 10,
      bubbles: [
        { from: "guide", text: "Pasul de azi e literalmente pasul lui Ilie." },
        {
          from: "guide",
          text: "Mănâncă ceva cald, chiar dacă nu ți-e foame. Bea un pahar cu apă. Și, dacă poți, culcă-te devreme diseară. Nu e o metaforă și nu e o amânare a lucrurilor serioase. Astea sunt lucrurile serioase, azi.",
        },
        {
          from: "guide",
          text: "Dacă nu mănânci de zile întregi sau nu dormi de zile întregi, spune-i asta unui medic. E un simptom, nu un defect de caracter.",
        },
      ],
    },
    {
      id: "g3_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Scoală-te și mănâncă, fiindcă drumul pe care-l ai de făcut este prea lung pentru tine.",
        ref: "1 Regi 19:7",
      },
    },
    {
      id: "g3_12",
      type: "prayer",
      order: 12,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, nu-Ți cer azi să-mi explici. Îți cer ce i-ai dat lui: odihnă și ceva de mâncare. Poartă-mă până mâine. Amin.",
        },
      ],
    },
    {
      id: "g3_13",
      type: "journal",
      order: 13,
      journalPrompt: "De ce anume are nevoie corpul tău în seara asta, concret?",
      reward: { xp: 0 },
    },
  ],
}

export const greutateL4: Lesson = {
  id: "greutate_l4",
  courseId: "path_greutate",
  order: 4,
  title: "Psalmii au voie să spună «până când»",
  estMinutes: 10,
  anchorRefs: ["Psalmul 13:1-2", "Psalmul 88:18", "Psalmul 42:5"],
  memoryVerseRef: "Psalmul 42:5",
  steps: [
    {
      id: "g4_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "A patra zi. Cum e azi față de luni?" }],
    },
    {
      id: "g4_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Ți s-a spus vreodată, direct sau printre rânduri, că un creștin adevărat nu se plânge?",
        },
        {
          from: "guide",
          text: "Aproape o treime din Psalmi sunt plângeri. Dumnezeu le-a pus în carte. Nu le-a tăiat la corectură.",
        },
      ],
    },
    {
      id: "g4_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Până când, Doamne, mă vei uita neîncetat? Până când Îți vei ascunde Fața de mine? Până când voi avea sufletul plin de griji și inima plină de necaz în fiecare zi?",
        ref: "Psalmul 13:1-2",
      },
    },
    {
      id: "g4_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Patru «până când» într-o singură respirație. Omul care scrie asta Îl acuză pe Dumnezeu că l-a uitat.",
        },
        {
          from: "guide",
          text: "Și textul ăsta se cântă în templu. Adică: plângerea nu era un accident intim, era liturghie. Se spunea cu voce tare, împreună.",
        },
      ],
    },
    {
      id: "g4_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Lumea spune: nu te mai văita. Unii creștini spun: mulțumește în toate, deci taci.",
        },
        {
          from: "guide",
          text: "Biblia face altceva. Îți dă cuvintele pentru plângere. Îți arată cum se face, ca să n-o faci singur și pe ascuns.",
        },
      ],
    },
    {
      id: "g4_6",
      type: "scripture",
      order: 6,
      scripture: {
        text: "Ai depărtat de la mine pe prieteni și pe tovarăși; și cei de aproape ai mei s-au făcut nevăzuți.",
        ref: "Psalmul 88:18",
      },
    },
    {
      id: "g4_7",
      type: "truth_simple",
      order: 7,
      bubbles: [
        { from: "guide", text: "Ăsta e ultimul verset din Psalmul 88. Ultimul. Nu urmează nimic." },
        {
          from: "guide",
          text: "Psalmul se termină în întuneric, fără răsturnare, fără «dar Domnul m-a scos». Și Dumnezeu l-a lăsat exact așa în Biblie.",
        },
        {
          from: "guide",
          text: "Dacă ziua ta se termină fără concluzie frumoasă, ai un psalm care arată exact ca ziua ta. N-ai ieșit din carte.",
        },
      ],
    },
    {
      id: "g4_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Pentru ce te mâhnești, suflete, și gemi înăuntrul meu? Nădăjduiește în Dumnezeu, căci iarăși Îl voi lăuda; El este mântuirea mea și Dumnezeul meu.",
        ref: "Psalmul 42:5",
      },
    },
    {
      id: "g4_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "Observă cui vorbește. Nu lui Dumnezeu. Își vorbește lui însuși: «pentru ce te mâhnești, suflete».",
        },
        {
          from: "guide",
          text: "E diferența dintre a-ți asculta starea și a-i vorbi. Nu-și interzice mâhnirea și nu se ceartă. Îi pune o întrebare și îi spune încotro să se uite.",
        },
        {
          from: "guide",
          text: "Și mai observă ceva: propoziția asta se repetă de trei ori în psalmi, pentru că n-a funcționat din prima. E o practică, nu un truc.",
        },
      ],
    },
    {
      id: "g4_10",
      type: "quiz",
      order: 10,
      quiz: {
        question: "Psalmul 88 se termină în întuneric, fără rezolvare. De ce contează asta?",
        options: [
          { text: "Pentru că e o greșeală rămasă în text", correct: false },
          {
            text: "Pentru că arată că ai voie să fii înaintea lui Dumnezeu și fără final fericit",
            correct: true,
          },
          { text: "Pentru că ne învață să nu ne mai rugăm", correct: false },
        ],
        explanation:
          "Dumnezeu a păstrat în Biblie o rugăciune care nu se rezolvă. Asta îți spune că nu ești obligat să închei fiecare zi cu o concluzie luminoasă ca să fii primit.",
      },
    },
    {
      id: "g4_11",
      type: "step",
      order: 11,
      bubbles: [
        { from: "guide", text: "Pasul de azi: scrie-ți propriul psalm. Trei rânduri, atât." },
        {
          from: "guide",
          text: "Rândul unu începe cu «Până când». Rândul doi spune un lucru adevărat și urât despre cum e acum. Rândul trei nu trebuie să repare nimic — poate fi doar «și totuși aici sunt».",
        },
        {
          from: "guide",
          text: "Citește-le cu voce tare. Nu le corecta ca să sune credincios.",
        },
      ],
    },
    {
      id: "g4_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "Pentru ce te mâhnești, suflete, și gemi înăuntrul meu? Nădăjduiește în Dumnezeu.",
        ref: "Psalmul 42:5",
      },
    },
    {
      id: "g4_13",
      type: "prayer",
      order: 13,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, nu vin cu mulțumiri azi. Vin cu «până când». Îmi ajunge că am voie să vin așa. Ascultă rândurile mele urâte, că sunt singurele adevărate pe care le am acum. Amin.",
        },
      ],
    },
    {
      id: "g4_14",
      type: "journal",
      order: 14,
      journalPrompt: "Scrie aici cele trei rânduri ale tale.",
      reward: { xp: 0 },
    },
  ],
}

export const greutateL5: Lesson = {
  id: "greutate_l5",
  courseId: "path_greutate",
  order: 5,
  title: "Ghetsimani",
  estMinutes: 11,
  anchorRefs: ["Matei 26:36-46", "Evrei 4:15"],
  memoryVerseRef: "Matei 26:38",
  safety: {
    topic: "mental_health",
    notice:
      "Lecția atinge întristarea foarte grea și frica de moarte. Poți opri oricând și poți reveni. Dacă acum ești în pericol sau te gândești să îți faci rău, apasă aici.",
  },
  steps: [
    {
      id: "g5_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum ești? Un cuvânt e de ajuns." }],
    },
    {
      id: "g5_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Dacă tot ce am spus până acum ți se pare o îngăduință pentru oameni slabi, azi ne uităm la Cineva pe care nu-L poți acuza de lipsă de credință.",
        },
        { from: "guide", text: "O grădină, noaptea, cu câteva ore înainte de arestare." },
      ],
    },
    {
      id: "g5_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Sufletul Meu este cuprins de o întristare de moarte; rămâneți aici și vegheați împreună cu Mine.",
        ref: "Matei 26:38",
      },
    },
    {
      id: "g5_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "«Întristare de moarte.» Adică: mă doare atât de tare încât simt că mă omoară. Iisus a spus-o cu gura Lui.",
        },
        {
          from: "guide",
          text: "Și n-a spus-o în rugăciune, singur, unde n-aude nimeni. A spus-o la trei prieteni, cu voce tare. Le-a cerut să rămână.",
        },
      ],
    },
    {
      id: "g5_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Lumea zice: ține-te tare, nu arăta. Unii creștini zic: dacă ai pace de la Dumnezeu, nu ajungi acolo.",
        },
        {
          from: "guide",
          text: "Atunci ar trebui să-L judeci pe Iisus în grădina aia. Nimeni n-o face. Deci propoziția e falsă, nu tu ești.",
        },
      ],
    },
    {
      id: "g5_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Mai e ceva. S-a rugat de trei ori ca paharul să treacă de la El. Adică a cerut, insistent, să nu treacă prin ce urma.",
        },
        {
          from: "guide",
          text: "A cere să fii scutit nu e lipsă de credință. Rugăciunea Lui s-a terminat cu «totuși facă-se voia Ta», dar n-a început așa. A început cu «dacă este cu putință, ia paharul acesta».",
        },
        {
          from: "guide",
          text: "Ai voie și tu să începi cu «ia asta de la mine». Nu trebuie să sari direct la resemnare ca să fii primit.",
        },
      ],
    },
    {
      id: "g5_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Căci n-avem un Mare Preot care să n-aibă milă de slăbiciunile noastre, ci Unul care în toate lucrurile a fost ispitit ca și noi, dar fără păcat.",
        ref: "Evrei 4:15",
      },
    },
    {
      id: "g5_8",
      type: "truth_simple",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "«Mare Preot» era omul care intra o dată pe an în locul cel mai sfânt, în numele întregului popor. Aici înseamnă: Cel care te reprezintă înaintea lui Dumnezeu.",
        },
        {
          from: "guide",
          text: "Iar textul spune că Cel care te reprezintă știe pe pielea Lui ce e slăbiciunea. Nu ți-o explică din afară.",
        },
        {
          from: "guide",
          text: "Și mai spune ceva important: «fără păcat». Ce a simțit El în grădină n-a fost păcat. Nici la tine nu e.",
        },
      ],
    },
    {
      id: "g5_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Iisus a cerut de trei ori ca paharul să treacă de la El. Ce arată asta?",
        options: [
          { text: "Că a avut o clipă de necredință", correct: false },
          { text: "Că e permis să ceri să fii scutit de ce te doare", correct: true },
          { text: "Că rugăciunea repetată e lipsă de încredere", correct: false },
        ],
        explanation:
          "A cerut, a insistat și abia apoi a spus «facă-se voia Ta». Ordinea contează: cererea sinceră vine prima, nu resemnarea grăbită.",
      },
    },
    {
      id: "g5_10",
      type: "step",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "Pasul de azi e cel mai greu de până acum, pentru că nu e singur.",
        },
        {
          from: "guide",
          text: "Alege un om. Unul. Și trimite-i o propoziție adevărată despre cum ești. Nu tot. O propoziție. De exemplu: «trec printr-o perioadă grea și n-am spus nimănui».",
        },
        {
          from: "guide",
          text: "Iisus le-a cerut la trei oameni să rămână treji lângă El. Ei au adormit, și tot i-a cerut. Merită cerut chiar dacă omul nu se ridică la înălțime.",
        },
      ],
    },
    {
      id: "g5_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Sufletul Meu este cuprins de o întristare de moarte; rămâneți aici și vegheați împreună cu Mine.",
        ref: "Matei 26:38",
      },
    },
    {
      id: "g5_12",
      type: "prayer",
      order: 12,
      bubbles: [
        {
          from: "guide",
          text: "Doamne Iisuse, Tu ai fost în grădina aia. Nu-Ți explic ce simt, știi. Îți cer să iei paharul, dacă se poate. Iar dacă nu se poate, rămâi Tu treaz lângă mine, că oamenii adorm. Amin.",
        },
      ],
    },
    {
      id: "g5_13",
      type: "journal",
      order: 13,
      journalPrompt: "Cui i-ai scris? Sau: ce te-a oprit să scrii?",
      reward: { xp: 0 },
    },
  ],
}

export const greutateL6: Lesson = {
  id: "greutate_l6",
  courseId: "path_greutate",
  order: 6,
  title: "Ce faci mâine dimineață",
  estMinutes: 11,
  anchorRefs: ["Matei 6:34", "Plângerile lui Ieremia 3:22-23"],
  memoryVerseRef: "Plângerile lui Ieremia 3:22-23",
  steps: [
    {
      id: "g6_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Penultima zi. Cum ești acum?" }],
    },
    {
      id: "g6_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Până acum am vorbit despre ce e adevărat. Azi vorbim despre ce faci mâine la ora opt.",
        },
        {
          from: "guide",
          text: "Pentru că adevărul care nu ajunge într-o dimineață concretă se evaporă până joi.",
        },
      ],
    },
    {
      id: "g6_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Nu vă îngrijorați dar de ziua de mâine; căci ziua de mâine se va îngrijora de ea însăși. Ajunge zilei necazul ei.",
        ref: "Matei 6:34",
      },
    },
    {
      id: "g6_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "«Ajunge zilei necazul ei.» Iisus nu spune că mâine e senin. Spune că azi are deja destul.",
        },
        {
          from: "guide",
          text: "E o permisiune, nu o interdicție: ai voie să micșorezi orizontul la o singură zi. Când ești în starea asta, planurile pe șase luni nu sunt maturitate, sunt încă o povară.",
        },
      ],
    },
    {
      id: "g6_5",
      type: "scripture",
      order: 5,
      scripture: {
        text: "Bunătățile Domnului nu s-au sfârșit, îndurările Lui nu sunt la capăt, ci se înnoiesc în fiecare dimineață. Și credincioșia Ta este atât de mare!",
        ref: "Plângerile lui Ieremia 3:22-23",
      },
    },
    {
      id: "g6_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Versetul ăsta e pus pe cești și pe tablouri. Aproape nimeni nu spune de unde e.",
        },
        {
          from: "guide",
          text: "E scris în ruinele Ierusalimului, după asediu, foamete și deportare. Cartea se numește «Plângeri». Cu două versete mai sus, același om scrie «mi-am zis: s-a dus puterea mea de nădejde în Domnul».",
        },
        {
          from: "guide",
          text: "Deci nu e optimism. E un om care nu mai spera, decis să numere ce a mai rămas dimineața. Porția e pe o zi. Ca mana în pustie: nu se putea strânge pentru toată săptămâna.",
        },
      ],
    },
    {
      id: "g6_7",
      type: "multi_choice",
      order: 7,
      multiChoice: {
        prompt: "Alege două lucruri pentru mâine dimineață. Două, nu cinci.",
        minSelections: 1,
        maxSelections: 2,
        options: [
          {
            id: "g6_somn",
            label: "Mă culc la o oră fixă diseară",
            feedback: "Somnul nu e partea neimportantă. La Ilie a fost prima.",
          },
          {
            id: "g6_mancare",
            label: "Mănânc dimineața, chiar dacă nu mi-e foame",
            feedback: "Corpul nu negociază. Îi dai combustibil, apoi discuți cu el.",
          },
          {
            id: "g6_lumina",
            label: "Ies zece minute afară, la lumină",
            feedback: "Zece minute. Nu o oră. Cât poți duce mâine.",
          },
          {
            id: "g6_medic",
            label: "Sun la medic sau la psiholog",
            feedback: "Ăsta e cel mai bun lucru din listă dacă nu l-ai făcut încă.",
          },
          {
            id: "g6_om",
            label: "Scriu unui om o propoziție adevărată",
            feedback: "Una singură. Nu trebuie să povestești tot.",
          },
          {
            id: "g6_psalm",
            label: "Citesc Psalmul 13, cu voce tare",
            feedback: "Patru «până când» și un final care nu forțează nimic.",
          },
        ],
      },
    },
    {
      id: "g6_8",
      type: "reflection",
      order: 8,
      response: {
        prompt: "La ce oră faci primul lucru din cele două?",
        placeholder: "De exemplu: 8:30",
        required: false,
      },
    },
    {
      id: "g6_9",
      type: "world_vs_truth",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "Repetăm un lucru, pentru că se uită repede: dacă iei un tratament sau mergi la terapie, asta nu e lipsă de credință și nu e un pas înapoi.",
        },
        {
          from: "guide",
          text: "Nu opri niciun tratament pentru că ți-a spus cineva că «acum ai credință». Discuția asta se poartă cu medicul care ți l-a dat, nu cu un om de la biserică și nu cu o aplicație.",
        },
      ],
    },
    {
      id: "g6_10",
      type: "quiz",
      order: 10,
      quiz: {
        question: "De ce contează că «se înnoiesc în fiecare dimineață» e scris în cartea Plângeri?",
        options: [
          { text: "Pentru că arată că autorul avea o zi bună", correct: false },
          {
            text: "Pentru că e scris de un om în ruine, care numără doar porția de azi",
            correct: true,
          },
          { text: "Pentru că promite că mâine se rezolvă totul", correct: false },
        ],
        explanation:
          "Nu e o promisiune că se termină greul. E o porție pe o zi, primită de un om care nu mai spera. Atât ți se cere să iei și ție: ziua de mâine, nu anul viitor.",
      },
    },
    {
      id: "g6_11",
      type: "step",
      order: 11,
      bubbles: [
        {
          from: "guide",
          text: "Pasul de azi: pune o alarmă la ora pe care ai scris-o și scrie în ea cele două lucruri alese.",
        },
        {
          from: "guide",
          text: "Dacă mâine faci doar unul din două, e reușită, nu eșec. Ține minte propoziția asta pentru mâine seară.",
        },
      ],
    },
    {
      id: "g6_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "Îndurările Lui nu sunt la capăt, ci se înnoiesc în fiecare dimineață.",
        ref: "Plângerile lui Ieremia 3:22-23",
      },
    },
    {
      id: "g6_13",
      type: "prayer",
      order: 13,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, nu-Ți cer puterea pentru tot ce urmează. Îți cer porția de mâine dimineață. Trezește-mă și ajută-mă să fac lucrul mic pe care l-am scris. Amin.",
        },
      ],
    },
    {
      id: "g6_14",
      type: "journal",
      order: 14,
      journalPrompt: "Care dintre cele două ți se pare cel mai greu și de ce?",
      reward: { xp: 0 },
    },
  ],
}

export const greutateL7: Lesson = {
  id: "greutate_l7",
  courseId: "path_greutate",
  order: 7,
  title: "Ziua grea care va reveni",
  estMinutes: 11,
  anchorRefs: ["Ioan 16:33", "Romani 8:38-39", "Psalmul 42:5"],
  memoryVerseRef: "Romani 8:38-39",
  safety: {
    topic: "mental_health",
    notice:
      "Lecția vorbește despre revenirea zilelor grele. Poți opri oricând și poți reveni. Dacă acum ești în pericol sau te gândești să îți faci rău, apasă aici.",
  },
  steps: [
    {
      id: "g7_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Ultima zi din drumul ăsta. Cum ești?" }],
    },
    {
      id: "g7_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Îți spun de pe acum, ca să nu crezi că ai dat greș: o să revină. Poate poimâine, poate în noiembrie.",
        },
        {
          from: "guide",
          text: "Nu-ți promitem că trece. N-avem dreptul să-ți promitem asta și nici nu ți-ar folosi. Îți dăm altceva: un plan pentru ziua în care revine.",
        },
      ],
    },
    {
      id: "g7_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "O zi grea după șapte zile de drum nu anulează drumul. Nu înseamnă că n-a fost adevărat nimic din ce ai făcut.",
        },
        { from: "guide", text: "Înseamnă doar că ești un om, într-o lume ruptă, cu un corp care obosește." },
      ],
    },
    {
      id: "g7_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "În lume veți avea necazuri; dar îndrăzniți, Eu am biruit lumea.",
        ref: "Ioan 16:33",
      },
    },
    {
      id: "g7_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Prima jumătate se citește rar de la amvon: «în lume veți avea necazuri». Nu «s-ar putea». Veți.",
        },
        {
          from: "guide",
          text: "Iisus n-a promis scutire. A promis că necazul nu are ultimul cuvânt. Sunt două lucruri complet diferite și numai al doilea e adevărat.",
        },
      ],
    },
    {
      id: "g7_6",
      type: "scripture",
      order: 6,
      scripture: {
        text: "Căci sunt bine încredințat că nici moartea, nici viața, nici îngerii, nici stăpânirile, nici puterile, nici lucrurile de acum, nici cele viitoare, nici înălțimea, nici adâncimea, nici o altă făptură nu vor fi în stare să ne despartă de dragostea lui Dumnezeu, care este în Iisus Hristos, Domnul nostru.",
        ref: "Romani 8:38-39",
      },
    },
    {
      id: "g7_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Citește lista încă o dată. Nu scrie «nimic nu te va durea». Scrie «nimic nu te va despărți».",
        },
        {
          from: "guide",
          text: "«Adâncimea» din listă e cuvântul pentru locul cel mai de jos. Adică fundul, inclusiv fundul tău. E trecut anume, ca să nu crezi că ai coborât undeva unde dragostea Lui nu mai are acces.",
        },
        {
          from: "guide",
          text: "Într-o zi grea nu ești mai puțin iubit. Ești doar mai puțin capabil să simți asta. Nu e același lucru.",
        },
      ],
    },
    {
      id: "g7_8",
      type: "declaration",
      order: 8,
      bubbles: [
        { from: "guide", text: "Spune cu voce tare, chiar dacă nu simți nimic în timp ce spui:" },
        {
          from: "guide",
          text: "«Azi mă doare. Nu sunt vinovat că mă doare. Nu sunt singur și nu sunt departe de Dumnezeu. Fac un singur lucru azi și atât îmi ajunge.»",
        },
      ],
    },
    {
      id: "g7_9",
      type: "reflection",
      order: 9,
      response: {
        prompt:
          "Scrie-ți planul de zi grea, în trei rânduri: un lucru pentru corp, un om pe care îl anunți, o propoziție pe care ți-o spui.",
        placeholder:
          "1. Mănânc și mă culc devreme. 2. Îi scriu lui ... . 3. «Nu sunt vinovat că mă doare.»",
        required: false,
      },
    },
    {
      id: "g7_10",
      type: "quiz",
      order: 10,
      quiz: {
        question: "Peste trei săptămâni ai o zi la fel de grea ca la început. Ce înseamnă?",
        options: [
          { text: "Că drumul n-a folosit la nimic", correct: false },
          {
            text: "Că am o zi grea și un plan pentru ea, spre deosebire de acum șapte zile",
            correct: true,
          },
          { text: "Că trebuie să reiau totul de la zero, în rușine", correct: false },
        ],
        explanation:
          "Diferența nu e că nu mai vin zile grele. Diferența e că știi ce faci în ele, știi pe cine anunți și știi că nu ești vinovat de ele.",
      },
    },
    {
      id: "g7_11",
      type: "step",
      order: 11,
      bubbles: [
        {
          from: "guide",
          text: "Pasul de azi: pune planul de mai sus undeva unde ajungi în cinci secunde. Notițele din telefon, un bilet în portofel, pe frigider.",
        },
        {
          from: "guide",
          text: "Și trimite-i omului de la rândul doi un mesaj scurt azi, cât ești bine: «dacă îți scriu într-o zi «e o zi grea», înseamnă că am nevoie să-mi răspunzi. Atât.»",
        },
        {
          from: "guide",
          text: "Drumul ăsta se închide, dar nu te lăsăm în aer. Mai departe e «Umblarea» — cum arată viața de zi cu zi după ce ai ieșit din groapă. O găsești pe ecranul de final, împreună cu celelalte drumuri.",
        },
      ],
    },
    {
      id: "g7_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "Nimic nu va fi în stare să ne despartă de dragostea lui Dumnezeu, care este în Iisus Hristos, Domnul nostru.",
        ref: "Romani 8:38-39",
      },
    },
    {
      id: "g7_13",
      type: "prayer",
      order: 13,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, nu-Ți cer să nu mai vină zilele grele. Îți cer să nu mă lași singur în ele. Adu-mi aminte, când nu mai țin minte nimic, că nimic nu mă desparte de Tine. Nici ziua de mâine. Amin.",
        },
      ],
    },
    {
      id: "g7_14",
      type: "journal",
      order: 14,
      journalPrompt: "Ce e altfel azi față de ziua întâi?",
      reward: { xp: 0 },
    },
  ],
}

export const GREUTATE_LESSONS: Lesson[] = [
  greutateL1,
  greutateL2,
  greutateL3,
  greutateL4,
  greutateL5,
  greutateL6,
  greutateL7,
]

/*
 * Practicile stau pe aceleași poziții ca lecțiile (index cu index), la fel ca în
 * celelalte parcursuri. Sunt scurte intenționat: în starea asta, o practică lungă
 * devine încă o datorie neîndeplinită.
 */
export const GREUTATE_PRACTICES: string[] = [
  "Spune o dată, cu voce tare: «Mă doare. Nu sunt vinovat că mă doare.»",
  "Diseară: telefonul în altă cameră și culcare cu o oră mai devreme.",
  "Mănâncă ceva cald și bea un pahar cu apă, chiar dacă nu ți-e foame.",
  "Scrie trei rânduri care încep cu «Până când» și lasă-le nerezolvate.",
  "Spune-i unui om o propoziție adevărată despre cum ești.",
  "Fă primul dintre cele două lucruri alese, la ora pe care ai scris-o.",
  "Citește-ți planul de zi grea, o dată, cu voce tare.",
]
