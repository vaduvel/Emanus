import type { Lesson } from "../domain.js"

/*
 * Camera 10 — Pâinea (path_paine), partea B: lecțiile 5—7.
 *
 * Continuarea lui paineA.ts. Antetul complet, cu motivele camerei, refuzul
 * explicit al învățăturii prosperității și regulile de siguranță, se află
 * acolo. Aici notez doar ce este specific acestei jumătăți.
 *
 * Lecția 6 vorbește despre epuizare. Nu o tratează ca pe o problemă
 * duhovnicească și nu o rezolvă cu „rugă-te mai mult". Omul epuizat are
 * nevoie întâi de somn, de mâncare și de o zi liberă, iar dacă oboseala nu
 * trece după odihnă, are nevoie de medic. Textul spune asta pe față, pentru că
 * depresia și epuizarea se îmbracă des în aceeași haină.
 *
 * Lecția 7 închide drumul fără să promită că situația financiară se schimbă.
 * Închide altceva: legătura dintre valoarea omului și ce produce el. De aici
 * se face trecerea către Drumul Emaus, la capătul parcursului.
 */

export const paineL5: Lesson = {
  id: "paine_l5",
  courseId: "path_paine",
  order: 5,
  title: "Frica de mâine",
  estMinutes: 8,
  anchorRefs: ["Evrei 13:5", "1 Petru 5:7"],
  memoryVerseRef: "Evrei 13:5",
  steps: [
    {
      id: "pn5_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Ai observat că frica de bani nu vine ziua, când muncești?" },
        { from: "guide", text: "Vine seara, când se face liniște, și în prima secundă după ce te trezești." }
      ]
    },
    {
      id: "pn5_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Frica asta are un obicei: nu se oprește la ce se poate întâmpla. Merge până la capăt." },
        { from: "guide", text: "Începe cu «dacă pierd contractul» și ajunge, în două minute, la «dacă rămânem în stradă și copiii mă vor urî»." },
        { from: "guide", text: "Și tu stai în pat și plătești, cu somnul tău, o factură care nu a venit și poate nu va veni niciodată." }
      ]
    },
    {
      id: "pn5_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Uită-te la felul în care este construit versetul din Evrei. Are două jumătăți și mulți citesc doar prima." },
        { from: "guide", text: "Prima jumătate spune: nu fiți iubitori de bani, mulțumiți-vă cu ce aveți. Dacă te oprești aici, sună a mustrare." },
        { from: "guide", text: "A doua jumătate spune de ce se poate așa ceva: «căci El Însuși a zis: Nicidecum n-am să te las»." },
        { from: "guide", text: "Deci mulțumirea nu stă pe suma din cont. Stă pe o promisiune despre prezență, nu despre bani." }
      ]
    },
    {
      id: "pn5_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea îți spune că scăparea de frică este o sumă: când voi avea atât, mă liniștesc." },
        { from: "guide", text: "Dar oamenii care au ajuns la suma aceea îți vor spune, dacă sunt cinstiți, că frica nu a plecat. Și-a schimbat doar obiectul." },
        { from: "guide", text: "Frica nu se vindecă prin cantitate. Se vindecă prin Cineva care rămâne și când cantitatea scade." }
      ]
    },
    {
      id: "pn5_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: nu ți s-a promis că nu vei pierde nimic. Ți s-a promis că nu vei fi lăsat." },
        { from: "guide", text: "Sunt două promisiuni foarte diferite. Prima nu a fost făcută niciodată. A doua nu a fost încălcată niciodată." }
      ]
    },
    {
      id: "pn5_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Există o muncă practică pe care o poți face cu frica, seara: o dai jos, în cuvinte." },
        { from: "guide", text: "Nu «nu te mai gândi», pentru că nu funcționează. Ci «o spun cu voce tare și o las acolo»." },
        { from: "guide", text: "Petru folosește un cuvânt fizic: aruncați. Nu «analizați», nu «suportați». Aruncați, ca pe un sac de pe umeri." }
      ]
    },
    {
      id: "pn5_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Să nu fiți iubitori de bani. Mulțumiți-vă cu ce aveți, căci El Însuși a zis: «Nicidecum n-am să te las, cu niciun chip nu te voi părăsi.»",
        ref: "Evrei 13:5"
      },
      bubbles: [
        { from: "guide", text: "Citește încă o dată finalul. Sunt două negații puse una peste alta, ca să nu rămână loc de «dar dacă»." },
        { from: "guide", text: "«Nicidecum» și «cu niciun chip». Nu este o promisiune politicoasă." }
      ]
    },
    {
      id: "pn5_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Și aruncați asupra Lui toate îngrijorările voastre, căci El Însuși îngrijește de voi.",
        ref: "1 Petru 5:7"
      },
      bubbles: [
        { from: "guide", text: "«Toate» include și grijile mici și rușinoase: rata, ghiozdanul care trebuie cumpărat, cadoul pe care nu îl poți lua." },
        { from: "guide", text: "Nu există categorie de griji prea măruntă pentru El și nici prea murdară." }
      ]
    },
    {
      id: "pn5_9",
      type: "name_struggle",
      order: 9,
      bubbles: [
        { from: "guide", text: "Care este propoziția pe care ți-o spui noaptea? Cea de la capătul șirului." },
        { from: "guide", text: "Scoate-o la lumină. Frica spusă cu voce tare, ziua, are altă mărime decât frica șoptită noaptea." }
      ]
    },
    {
      id: "pn5_10",
      type: "quiz",
      order: 10,
      quiz: {
        question: "Pe ce se sprijină îndemnul de a te mulțumi cu ce ai, în Evrei 13:5?",
        options: [
          { text: "Pe faptul că lucrurile se vor rezolva financiar", correct: false },
          { text: "Pe promisiunea lui Dumnezeu că nu te va părăsi", correct: true },
          { text: "Pe ideea că banii nu sunt importanți", correct: false }
        ],
        explanation: "Versetul nu spune că banii nu contează și nu promite că vei avea destui. Leagă mulțumirea de prezența lui Dumnezeu: «Nicidecum n-am să te las». Temelia este o Persoană, nu o sumă."
      }
    },
    {
      id: "pn5_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Nicidecum n-am să te las, cu niciun chip nu te voi părăsi.",
        ref: "Evrei 13:5"
      },
      bubbles: [
        { from: "guide", text: "Spune-l dimineața, înainte să te ridici din pat. Este răspunsul dat propoziției de noapte." }
      ]
    },
    {
      id: "pn5_12",
      type: "prayer",
      order: 12,
      bubbles: [
        { from: "guide", text: "«Doamne, Îți las socoteala pe care o fac în fiecare noapte. Nu Îți cer să îmi arăți cifrele, ci să rămâi. Amin.»" }
      ]
    },
    {
      id: "pn5_13",
      type: "journal",
      order: 13,
      journalPrompt: "Scrie frica ta de mâine, dusă până la capăt, exact cum sună noaptea. Sub ea scrie: «Nicidecum n-am să te las.»",
      reward: { xp: 0, axisDeltas: { emotional_peace: 1 } }
    }
  ]
}

export const paineL6: Lesson = {
  id: "paine_l6",
  courseId: "path_paine",
  order: 6,
  title: "Oboseala care nu trece",
  estMinutes: 8,
  anchorRefs: ["Matei 11:28"],
  memoryVerseRef: "Matei 11:28",
  steps: [
    {
      id: "pn6_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Când ai avut ultima zi în care nu ai făcut nimic și nu te-ai simțit vinovat?" },
        { from: "guide", text: "Dacă nu îți amintești, lecția asta este scrisă pentru tine." }
      ]
    },
    {
      id: "pn6_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Există o oboseală care nu trece după concediu." },
        { from: "guide", text: "Dormi opt ore și te trezești la fel de gol. Nu mai ai chef de nimic, nici măcar de lucrurile care îți plăceau. Te enervezi din nimic." },
        { from: "guide", text: "Aceea nu mai este lene și nu este nici lipsă de credință. Este un om care a mers prea mult timp fără să se oprească." }
      ]
    },
    {
      id: "pn6_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Trebuie să fiu foarte clar aici, pentru că se greșește des în biserică." },
        { from: "guide", text: "Epuizarea nu se rezolvă cu «rugă-te mai mult». Un om epuizat are nevoie întâi de somn, de mâncare, de apă și de o zi liberă." },
        { from: "guide", text: "Dacă oboseala nu trece nici după ce te-ai odihnit câteva zile, sau dacă nu mai simți bucurie în nimic de săptămâni, mergi la medic. Depresia și epuizarea seamănă mult." },
        { from: "guide", text: "Rugăciunea nu înlocuiește medicul. Merg împreună." }
      ]
    },
    {
      id: "pn6_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea a făcut din epuizare o medalie. «Nu am avut o zi liberă de doi ani» se spune cu mândrie, nu cu îngrijorare." },
        { from: "guide", text: "Dumnezeu a așezat odihna în săptămână înainte ca omul să aibă nevoie de ea. Nu ca recompensă pentru muncă multă, ci ca ritm." },
        { from: "guide", text: "Cine nu se oprește singur va fi oprit într-o zi de trup. Trupul nu negociază." }
      ]
    },
    {
      id: "pn6_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: odihna nu se merită. Se primește." },
        { from: "guide", text: "Dacă ar trebui meritată, nu ai primi-o niciodată, pentru că mereu mai rămâne ceva de făcut." }
      ]
    },
    {
      id: "pn6_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Chemarea din Matei 11 nu este «veniți când vă puneți la punct»." },
        { from: "guide", text: "Este «veniți la Mine, toți cei trudiți și împovărați». Adică exact așa cum ești când nu mai poți." },
        { from: "guide", text: "Iar ce se dă nu este o listă de sfaturi. Este odihnă." }
      ]
    },
    {
      id: "pn6_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Veniți la Mine, toți cei trudiți și împovărați, și Eu vă voi da odihnă.",
        ref: "Matei 11:28"
      },
      bubbles: [
        { from: "guide", text: "Două cuvinte descriu două feluri de oameni: «trudiți», adică cei care muncesc mult, și «împovărați», adică cei cărora li s-a pus în spate." },
        { from: "guide", text: "«Toți» nu lasă pe nimeni afară. Nici pe cel care și-a făcut singur povara." }
      ]
    },
    {
      id: "pn6_8",
      type: "name_struggle",
      order: 8,
      bubbles: [
        { from: "guide", text: "Ce nu poți lăsa din mână nici pentru o zi?" },
        { from: "guide", text: "Și întreabă-te cinstit de ce: pentru că nu se poate fără tine, sau pentru că ți-e frică să vezi că se poate?" }
      ]
    },
    {
      id: "pn6_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Pe cine cheamă Iisus în Matei 11:28?",
        options: [
          { text: "Pe cei care și-au pus întâi viața în ordine", correct: false },
          { text: "Pe toți cei trudiți și împovărați, așa cum sunt", correct: true },
          { text: "Pe cei care muncesc mai mult decât alții", correct: false }
        ],
        explanation: "Chemarea nu are condiții prealabile. «Toți cei trudiți și împovărați» îi cuprinde și pe cei care s-au încărcat singuri. Odihna este dată, nu câștigată. Și, când oboseala nu trece după odihnă, se merge la medic — nu este o înfrângere duhovnicească."
      }
    },
    {
      id: "pn6_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Veniți la Mine, toți cei trudiți și împovărați, și Eu vă voi da odihnă.",
        ref: "Matei 11:28"
      },
      bubbles: [
        { from: "guide", text: "«Veniți», nu «reparați-vă și apoi veniți»." }
      ]
    },
    {
      id: "pn6_11",
      type: "prayer",
      order: 11,
      bubbles: [
        { from: "guide", text: "«Doamne, sunt gol pe dinăuntru și mi-e rușine să recunosc. Vin așa cum sunt. Dă-mi odihnă, și dă-mi curaj să mă opresc o zi. Amin.»" }
      ]
    },
    {
      id: "pn6_12",
      type: "journal",
      order: 12,
      journalPrompt: "Alege ziua în care te oprești și scrie data ei. Scrie și un singur lucru pe care îl amâni ca să fie posibilă.",
      reward: { xp: 0, axisDeltas: { emotional_peace: 1 } }
    }
  ]
}

export const paineL7: Lesson = {
  id: "paine_l7",
  courseId: "path_paine",
  order: 7,
  title: "Ce rămâne când nu mai produc",
  estMinutes: 9,
  anchorRefs: ["Isaia 41:10", "Luca 12:15"],
  memoryVerseRef: "Isaia 41:10",
  steps: [
    {
      id: "pn7_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Ultima lecție. Și nu se termină cu o rezolvare financiară, pentru că nu ți-o pot promite." },
        { from: "guide", text: "Se termină cu altceva, și ține mai mult." }
      ]
    },
    {
      id: "pn7_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Gândește-te la un om bătrân pe care îl iubești. Un bunic, o mătușă, un vecin." },
        { from: "guide", text: "De ani buni nu mai produce nimic. Nu aduce niciun ban în casă. Are nevoie de ajutor ca să se ridice de pe scaun." },
        { from: "guide", text: "Întreabă-te acum, cinstit: valorează mai puțin decât în anii în care muncea?" },
        { from: "guide", text: "Ai răspuns «nu» într-o secundă. Și cu asta ai dărâmat singur minciuna camerei acesteia." }
      ]
    },
    {
      id: "pn7_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Toată lumea aplică regula asta corect, dar numai altora." },
        { from: "guide", text: "Pentru bunicul tău știi că valoarea nu stă în producție. Pentru tine îți păstrezi altă măsură, mult mai aspră." },
        { from: "guide", text: "Nu este smerenie. Este o nedreptate pe care ți-o faci singur." }
      ]
    },
    {
      id: "pn7_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea îl scoate din joc pe cel care nu mai produce. Îl numește «inactiv» și trece mai departe." },
        { from: "guide", text: "Dumnezeu nu are categoria asta. Nu ține oameni activi și oameni inactivi." },
        { from: "guide", text: "El vorbește cu tine la fel în luna în care ai adus mult și în luna în care nu ai adus nimic." }
      ]
    },
    {
      id: "pn7_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul cu care închidem: ești ținut de mână, nu de rezultate." },
        { from: "guide", text: "Mâna care te ține nu s-a schimbat când ți-a scăzut salariul." }
      ]
    },
    {
      id: "pn7_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Uită-te la ce spune Isaia și observă cine face verbele." },
        { from: "guide", text: "«Eu te întăresc», «tot Eu îți vin în ajutor», «Eu te sprijin». Nu «adună-te», nu «fii tare»." },
        { from: "guide", text: "Singurul lucru cerut omului este să nu se teamă. Restul face Altcineva." }
      ]
    },
    {
      id: "pn7_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Nu te teme, căci Eu sunt cu tine; nu te uita cu îngrijorare, căci Eu sunt Dumnezeul tău; Eu te întăresc, tot Eu îți vin în ajutor. Eu te sprijin cu dreapta Mea biruitoare.",
        ref: "Isaia 41:10"
      },
      bubbles: [
        { from: "guide", text: "Versetul nu spune «nu vei avea probleme». Spune «Eu sunt cu tine»." },
        { from: "guide", text: "Este același fel de promisiune ca în Evrei 13: nu despre ce primești, ci despre Cine rămâne." }
      ]
    },
    {
      id: "pn7_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Vedeți și păziți-vă de orice fel de lăcomie de bani; căci viața cuiva nu stă în belșugul avuției lui.",
        ref: "Luca 12:15"
      },
      bubbles: [
        { from: "guide", text: "Ne întoarcem de unde am plecat, dar acum versetul nu mai sună a mustrare." },
        { from: "guide", text: "Sună a eliberare: dacă viața nu stă acolo, atunci nu se termină când banii se termină." }
      ]
    },
    {
      id: "pn7_9",
      type: "name_struggle",
      order: 9,
      bubbles: [
        { from: "guide", text: "Spune cu voce tare, chiar dacă nu o simți încă: «Nu valorez cât aduc în casă.»" },
        { from: "guide", text: "Repet-o mâine. Adevărul nu intră dintr-o dată, intră prin repetare, exact cum a intrat și minciuna." }
      ]
    },
    {
      id: "pn7_10",
      type: "quiz",
      order: 10,
      quiz: {
        question: "Ce promite Isaia 41:10 celui care se teme?",
        options: [
          { text: "Că nu va mai trece prin greutăți", correct: false },
          { text: "Că Dumnezeu este cu el, îl întărește și îl sprijină", correct: true },
          { text: "Că va primi înapoi tot ce a pierdut", correct: false }
        ],
        explanation: "Toate verbele de ajutor Îl au pe Dumnezeu ca subiect: Eu te întăresc, Eu îți vin în ajutor, Eu te sprijin. Nu se promite absența greutății, ci prezența Lui în ea."
      }
    },
    {
      id: "pn7_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Nu te teme, căci Eu sunt cu tine; nu te uita cu îngrijorare, căci Eu sunt Dumnezeul tău",
        ref: "Isaia 41:10"
      },
      bubbles: [
        { from: "guide", text: "Două porunci și două motive. Motivele sunt mai mari decât poruncile." }
      ]
    },
    {
      id: "pn7_12",
      type: "prayer",
      order: 12,
      bubbles: [
        { from: "guide", text: "«Doamne, m-am măsurat mult timp în ce aduc. Îmi iau măsura aceea de la ochi. Ține-mă de mână și în lunile slabe. Amin.»" }
      ]
    },
    {
      id: "pn7_13",
      type: "journal",
      order: 13,
      journalPrompt: "Recitește cifra pe care ai scris-o în lecția 1. Scrie sub ea ce ai învățat în cele șapte lecții. Apoi scrie un lucru bun pe care îl poți da familiei tale săptămâna asta și care nu costă niciun ban.",
      reward: { xp: 0, axisDeltas: { identity: 1 } }
    }
  ]
}
