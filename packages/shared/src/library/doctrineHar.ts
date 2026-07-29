import type { Lesson } from "../domain.js"

/*
 * Biblioteca · raftul „Întrebări mari"
 * Cursul „Religie sau credință — ce mă mântuiește?"  (docs/15 §Cursul 2)
 *
 * REGULA DE TON, nenegociabilă în tot fișierul:
 * se corectează înțelegerea, niciodată instituția. Nu apar cuvintele ortodox,
 * penticostal, baptist, catolic, adventist, sectă, pocăit — nici ca laudă, nici
 * ca reproș. Nicio lecție nu compară confesiuni și nicio lecție nu spune omului
 * să plece de unde este.
 *
 * Fiecare lecție are, obligatoriu, o propoziție de limită cinstită: ce nu știm
 * sau ce nu ținem noi de aici. Fără ea, un om care gândește nu ne crede.
 *
 * Autorul: Emanus. Sursa: Biblia. (docs/22 §10.1)
 */

export const harD_l1: Lesson = {
  id: "har_d_l1",
  courseId: "doctrine_c2_har",
  order: 1,
  title: "Sunt creștin din naștere",
  estMinutes: 10,
  anchorRefs: ["Ioan 3:1-7", "Ioan 1:12-13", "Iacov 2:19"],
  memoryVerseRef: "Ioan 1:12",
  steps: [
    {
      id: "hd1_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Aici nu se corectează nimeni. Se pune o întrebare care rămâne, de obicei, nepusă." },
        { from: "guide", text: "Cei mai mulți oameni din țara asta ar spune, fără să se gândească: sunt creștin. Din familie, de la botez, de la bunici." },
        { from: "guide", text: "Întrebarea nu e dacă e adevărat. Întrebarea e dacă asta e tot." },
      ],
    },
    {
      id: "hd1_2",
      type: "choice",
      order: 2,
      choice: {
        prompt: "Ce ai răspunde tu, cinstit, dacă te-ar întreba cineva de ce ești creștin?",
        options: [
          { id: "hd1c_a", label: "Așa am fost crescut. Asta suntem în familia mea." },
          { id: "hd1c_b", label: "Cred în Dumnezeu, dar nu m-am gândit niciodată la asta." },
          { id: "hd1c_c", label: "S-a întâmplat ceva între mine și El, la un moment dat." },
        ],
      },
    },
    {
      id: "hd1_3",
      type: "name_struggle",
      order: 3,
      bubbles: [
        { from: "guide", text: "Obiecția, în forma ei cea mai tare, sună așa: „Eu cred în Dumnezeu de când mă știu. Am fost botezat, mă închin, țin sărbătorile. Ce vrei mai mult de la mine?"" },
        { from: "guide", text: "Și e o întrebare corectă. Nimeni nu are dreptul să o trateze de sus." },
      ],
    },
    {
      id: "hd1_4",
      type: "scripture",
      order: 4,
      bubbles: [
        { from: "guide", text: "Cel mai religios om din Ierusalim a venit noaptea la Iisus, ca să nu-l vadă nimeni. Îl chema Nicodim. Era învățător al Legii, membru în consiliul care conducea poporul." },
        { from: "guide", text: "Nu era un om rău. Nu era departe de Dumnezeu. Era, pe hârtie, cel mai aproape." },
      ],
      scripture: {
        text: "Adevărat, adevărat îți spun că, dacă un om nu se naște din nou, nu poate vedea Împărăția lui Dumnezeu.",
        ref: "Ioan 3:3",
      },
    },
    {
      id: "hd1_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Nicodim a înțeles exact ce înțelegi și tu prima dată: cum să mă nasc din nou? Doar nu intru înapoi în burta mamei." },
        { from: "guide", text: "Iisus i-a răspuns că nu vorbește despre naștere din carne, ci din Duh. Adică despre o viață nouă, primită, nu despre o corectură făcută de tine." },
        { from: "guide", text: "Și uite unde bate: a doua naștere nu se moștenește. Prima se moștenește — familia, sângele, tradiția. A doua, nu." },
      ],
    },
    {
      id: "hd1_6",
      type: "scripture",
      order: 6,
      bubbles: [
        { from: "guide", text: "Ioan spune asta încă mai limpede, la începutul evangheliei lui." },
      ],
      scripture: {
        text: "Dar tuturor celor ce L-au primit, adică celor ce cred în Numele Lui, le-a dat dreptul să se facă copii ai lui Dumnezeu; născuți nu din sânge, nici din voia firii lor, nici din voia vreunui om, ci din Dumnezeu.",
        ref: "Ioan 1:12-13",
      },
    },
    {
      id: "hd1_7",
      type: "truth_simple",
      order: 7,
      bubbles: [
        { from: "guide", text: "„Nici din sânge" — nu prin cine ți-e neam. „Nici din voia vreunui om" — nu pentru că a hotărât cineva pentru tine când erai mic." },
        { from: "guide", text: "Cuvântul grecesc pentru „a primit" e *elabon*: a lua ceva ce ți se întinde. Presupune două mâini. Ale Lui, care dau. Și ale tale, care iau." },
        { from: "guide", text: "Iacov scrie undeva o propoziție care sperie: și dracii cred că este un Dumnezeu, și tremură. Deci a crede că El există nu e încă o relație. E doar o informație corectă." },
      ],
    },
    {
      id: "hd1_8",
      type: "quiz",
      order: 8,
      quiz: {
        question: "Ce spune Iisus lui Nicodim, în esență?",
        options: [
          { text: "Că religia lui e greșită și trebuie să treacă la alta", correct: false },
          { text: "Că e nevoie de o viață nouă, primită de la Dumnezeu, nu de o apartenență moștenită", correct: true },
          { text: "Că trebuie să se străduiască mai mult decât până acum", correct: false },
        ],
        explanation:
          "Iisus nu i-a spus să plece de unde e și nu i-a spus să se străduiască mai mult. I-a spus că are nevoie de ceva ce nu-și poate da singur.",
      },
    },
    {
      id: "hd1_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        { from: "guide", text: "Partea bună: nașterea din nou nu e un examen. Nimeni nu se naște prin efort — nici prima dată, nici a doua." },
        { from: "guide", text: "Se cere. Se primește. Iar Cel care o dă a venit deja până la tine, noaptea, ca la Nicodim, ca să nu-ți fie rușine." },
        { from: "guide", text: "Și limita cinstită, ca să nu-ți vindem certitudini false: nu putem citi în inima nimănui. Nu-ți spunem noi dacă s-a întâmplat sau nu la tine. Îți spunem doar unde se pune întrebarea — între tine și El." },
      ],
    },
    {
      id: "hd1_10",
      type: "step",
      order: 10,
      bubbles: [
        { from: "guide", text: "Un lucru azi, nu zece: citește Ioan 3, primele opt versete. Doar atât. Și, dacă te ajută, întreabă-L direct: „Doamne, dacă asta îmi lipsește, arată-mi."" },
      ],
    },
    {
      id: "hd1_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Dar tuturor celor ce L-au primit, adică celor ce cred în Numele Lui, le-a dat dreptul să se facă copii ai lui Dumnezeu.",
        ref: "Ioan 1:12",
      },
    },
  ],
}

export const harD_l2: Lesson = {
  id: "har_d_l2",
  courseId: "doctrine_c2_har",
  order: 2,
  title: "Sunt un om bun",
  estMinutes: 10,
  anchorRefs: ["Efeseni 2:8-9", "Isaia 64:6", "Tit 3:5"],
  memoryVerseRef: "Efeseni 2:8-9",
  steps: [
    {
      id: "hd2_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Aproape toți oamenii au în cap o balanță. Pe un taler, ce am făcut bine. Pe celălalt, ce am făcut rău. Iar la sfârșit se cântărește." },
        { from: "guide", text: "Nimeni nu ne-a învățat asta la școală. Și totuși o avem toți. E cea mai răspândită credință de pe pământ." },
      ],
    },
    {
      id: "hd2_2",
      type: "name_struggle",
      order: 2,
      bubbles: [
        { from: "guide", text: "Obiecția, cinstit: „N-am omorât pe nimeni. Ajut oameni. Sunt mai bun decât mulți care stau în biserică. De ce n-ar conta asta?"" },
        { from: "guide", text: "Răspunsul scurt: contează. Doar nu la ce credeai că contează." },
      ],
    },
    {
      id: "hd2_3",
      type: "choice",
      order: 3,
      choice: {
        prompt: "Dacă ar exista balanța, unde crezi că ai sta acum?",
        options: [
          { id: "hd2c_a", label: "Puțin peste mijloc. Mă descurc." },
          { id: "hd2c_b", label: "Nu știu. Depinde de zi." },
          { id: "hd2c_c", label: "Rău. De asta evit să mă gândesc." },
        ],
      },
    },
    {
      id: "hd2_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        { from: "guide", text: "Problema balanței nu e că e prea severă. E că nu există." },
        { from: "guide", text: "Gândește-te la o datorie. Dacă ai de dat cincizeci de mii și duci lunar o mie, ești un om corect. Dar datoria nu se stinge, ci doar scade. Iar dacă cineva a plătit-o deja, integral, ce faci tu cu plățile de-acum?" },
        { from: "guide", text: "Aici e toată lecția. Nu că faptele tale sunt prea mici. Că datoria a fost deja plătită, de altcineva, în întregime." },
      ],
    },
    {
      id: "hd2_5",
      type: "scripture",
      order: 5,
      scripture: {
        text: "Căci prin har ați fost mântuiți, prin credință. Și asta nu vine de la voi, ci este darul lui Dumnezeu. Nu prin fapte, ca să nu se laude nimeni.",
        ref: "Efeseni 2:8-9",
      },
      bubbles: [
        { from: "guide", text: "„Har" e un cuvânt tocit. În greacă e *charis*: un bine făcut cuiva care nu l-a meritat și nu-l poate plăti înapoi." },
        { from: "guide", text: "Și mai e o vorbă acolo, la final: „ca să nu se laude nimeni". Dumnezeu a aranjat lucrurile așa încât nimeni să nu ajungă acolo cu nasul pe sus." },
      ],
    },
    {
      id: "hd2_6",
      type: "world_vs_truth",
      order: 6,
      bubbles: [
        { from: "guide", text: "Lumea spune: fii bun, ca să fii primit." },
        { from: "guide", text: "Scriptura spune: ai fost primit, ca să poți fi bun — din alt motiv, nu de frică și nu ca să-ți cumperi liniștea." },
        { from: "guide", text: "Aceleași fapte. Cu totul altă temelie dedesubt." },
      ],
    },
    {
      id: "hd2_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "El ne-a mântuit nu pentru faptele făcute de noi în neprihănire, ci pentru mila Lui.",
        ref: "Tit 3:5",
      },
      bubbles: [
        { from: "guide", text: "Isaia merge chiar mai departe și spune că faptele noastre bune, luate ca plată, sunt ca o haină murdară. Nu ca să ne umilească: ca să ne scoată din negociere." },
        { from: "guide", text: "Un om care negociază nu poate primi un dar. Îl transformă, fără să vrea, în tranzacție." },
      ],
    },
    {
      id: "hd2_8",
      type: "quiz",
      order: 8,
      quiz: {
        question: "De ce spune Scriptura că mântuirea nu vine din fapte?",
        options: [
          { text: "Pentru că faptele bune nu au valoare", correct: false },
          { text: "Pentru că e un dar, iar un dar plătit nu mai e dar", correct: true },
          { text: "Pentru că Dumnezeu nu se uită la ce facem", correct: false },
        ],
        explanation:
          "Faptele contează enorm — dar ca rod, nu ca plată. Despre asta e lecția a cincea din cursul ăsta.",
      },
    },
    {
      id: "hd2_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        { from: "guide", text: "Dacă ai trăit ani pe balanță, vestea asta obosește înainte să bucure. E normal. Omul care a plătit mult timp singur nu se relaxează într-o zi." },
        { from: "guide", text: "Limita cinstită: harul nu explică de ce unii oameni par să primească mai ușor decât alții, și nu-ți spunem că înțelegem noi asta. Ce spunem e ce e scris: cine vine nu e dat afară." },
      ],
    },
    {
      id: "hd2_10",
      type: "step",
      order: 10,
      bubbles: [
        { from: "guide", text: "Azi, un singur lucru: spune-I o rugăciune în care nu-ți enumeri nici meritele, nici scuzele. Doar cine ești și ce ai nevoie. E mai greu decât pare." },
      ],
    },
    {
      id: "hd2_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Căci prin har ați fost mântuiți, prin credință. Și asta nu vine de la voi, ci este darul lui Dumnezeu.",
        ref: "Efeseni 2:8",
      },
    },
  ],
}

export const harD_l3: Lesson = {
  id: "har_d_l3",
  courseId: "doctrine_c2_har",
  order: 3,
  title: "Dacă țin poruncile",
  estMinutes: 10,
  anchorRefs: ["Galateni 3:24", "Iacov 2:10", "Romani 3:20"],
  memoryVerseRef: "Galateni 3:24",
  steps: [
    {
      id: "hd3_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Întrebarea vine în două feluri. Unii o pun cu speranță: dacă țin poruncile, ajung în rai, nu? Alții, cu ironie: deci degeaba mă mai străduiesc?" },
        { from: "guide", text: "Amândoi au nevoie de același lucru: să înțeleagă la ce a fost dată Legea." },
      ],
    },
    {
      id: "hd3_2",
      type: "truth_simple",
      order: 2,
      bubbles: [
        { from: "guide", text: "Cele zece porunci nu sunt o scară. Sunt o oglindă." },
        { from: "guide", text: "O scară te ridică. O oglindă îți arată ce ai pe față. Nu te spală, dar fără ea nu știi că ai nevoie de spălat." },
      ],
    },
    {
      id: "hd3_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Căci nimeni nu va fi socotit neprihănit înaintea Lui prin faptele Legii, deoarece prin Lege vine cunoștința deplină a păcatului.",
        ref: "Romani 3:20",
      },
      bubbles: [
        { from: "guide", text: "Adică: rolul Legii e să-ți arate limpede unde stai, nu să te ducă sus." },
      ],
    },
    {
      id: "hd3_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "Astfel, Legea ne-a fost un îndrumător spre Hristos, ca să fim socotiți neprihăniți prin credință.",
        ref: "Galateni 3:24",
      },
      bubbles: [
        { from: "guide", text: "Cuvântul din greacă e *paidagogos*. În casele de atunci era sclavul care ducea copilul la școală și îl păzea pe drum. Nu era profesorul. Îl aducea la profesor." },
        { from: "guide", text: "Legea face exact asta: te duce până la ușă. Apoi te lasă cu Cineva." },
      ],
    },
    {
      id: "hd3_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        { from: "guide", text: "Iacov spune un lucru care închide subiectul: cine calcă o singură poruncă e vinovat față de toată Legea." },
        { from: "guide", text: "Sună dur, până înțelegi imaginea: nu e o listă din care bifezi cât poți. E ca un geam. Nu-l spargi „parțial"." },
      ],
    },
    {
      id: "hd3_6",
      type: "choice",
      order: 6,
      choice: {
        prompt: "Ce simți când auzi asta?",
        options: [
          { id: "hd3c_a", label: "Descurajare. Atunci n-are rost nimic." },
          { id: "hd3c_b", label: "Ușurare. Nu mai trebuie să mă prefac." },
          { id: "hd3c_c", label: "Nedreptate. Mi se pare prea mult." },
        ],
      },
    },
    {
      id: "hd3_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        { from: "guide", text: "Iisus a făcut standardul chiar mai greu, nu mai ușor: a mutat porunca din mâini în inimă. Nu doar să nu ucizi — nici să urăști. Nu doar să nu comiți adulter — nici să nu poftești." },
        { from: "guide", text: "De ce ar face asta? Ca să scoată din discuție ideea că cineva se descurcă singur. Nimeni nu ține poruncile în inimă. Nici cel mai bun om pe care îl știi." },
        { from: "guide", text: "Iar apoi a spus ceva ce nu spusese nimeni: n-am venit să desființez Legea, am venit s-o împlinesc. El a ținut-o. În locul nostru." },
      ],
    },
    {
      id: "hd3_8",
      type: "quiz",
      order: 8,
      quiz: {
        question: "La ce folosește Legea, potrivit lui Pavel?",
        options: [
          { text: "Ca listă de condiții pentru a intra în rai", correct: false },
          { text: "Ca oglindă care arată nevoia și ca îndrumător spre Hristos", correct: true },
          { text: "Ca ceva vechi, care nu mai are nicio treabă cu noi", correct: false },
        ],
        explanation:
          "Legea rămâne bună și sfântă. Doar că nu e o scară. Îndreptarea vieții vine după ce ai fost primit, nu ca preț de intrare.",
      },
    },
    {
      id: "hd3_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        { from: "guide", text: "Limita cinstită: asta nu înseamnă că poruncile nu mai contează sau că poți trăi oricum. Cine spune asta nu a citit ce urmează în aceleași epistole." },
        { from: "guide", text: "Înseamnă doar că ordinea e alta: primit, apoi schimbat. Nu schimbat, apoi primit." },
      ],
    },
    {
      id: "hd3_10",
      type: "step",
      order: 10,
      bubbles: [
        { from: "guide", text: "Azi: ia o poruncă pe care crezi c-o ții bine. Întreabă-te dacă o ții și în gânduri, nu doar în fapte. Nu ca să te chinui — ca să vezi de ce ai nevoie de har și tu, nu doar vecinul." },
      ],
    },
    {
      id: "hd3_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Astfel, Legea ne-a fost un îndrumător spre Hristos, ca să fim socotiți neprihăniți prin credință.",
        ref: "Galateni 3:24",
      },
    },
  ],
}

export const DOCTRINE_HAR_PART_A: Lesson[] = [harD_l1, harD_l2, harD_l3]
