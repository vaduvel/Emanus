import type { Lesson } from "../domain.js"

/*
 * Pildele lui Iisus — Cursul 2: „Ce e Împărăția și cine intră", fișele 1-3.
 * (docs/16-modul-pilde.md §Cursul 2)
 *
 * Cursul ăsta cere cea mai multă grijă la contextul cultural (docs/16,
 * ordinea de scriere). De aceea fiecare fișă are două propoziții de context,
 * nu o lecție de istorie (regula 4).
 *
 * Regula 5: subiectul e Împărăția, nu tehnici de viață reușită.
 * Regula 3: nu alegorizăm detaliile — nici păsările, nici pietrele, nici
 * cantitatea de aluat.
 */

export const pildaSemanatorul: Lesson = {
  id: "pilda_semanatorul",
  courseId: "parables_c2_imparatia",
  order: 1,
  title: "Semănătorul",
  estMinutes: 12,
  anchorRefs: ["Matei 13:1-23", "Matei 13:19", "Matei 13:23"],
  memoryVerseRef: "Matei 13:23",
  steps: [
    {
      id: "i1_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "E singura pildă pe care Iisus o explică în amănunt, cu gura Lui. Deci aici nu avem ce inventa — avem ce citit cu atenție." },
        { from: "guide", text: "Un om iese să semene. Aceeași sămânță, aceeași mână, patru feluri de pământ." },
      ],
    },
    {
      id: "i1_2",
      type: "name_struggle",
      order: 2,
      bubbles: [
        { from: "guide", text: "Cui i-a fost spusă: unei mulțimi mari, de pe o corabie, lângă mare. Oameni care veniseră din toate motivele posibile — unii pentru vindecare, unii din curiozitate, unii ca să-L prindă cu vorba." },
        { from: "guide", text: "Deci pilda descrie exact ce se întâmpla pe malul acela în timp ce vorbea. Ascultătorii erau, în acel moment, cele patru feluri de pământ." },
      ],
    },
    {
      id: "i1_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        { from: "guide", text: "Două propoziții de context: acolo se semăna cu mâna, aruncând, înainte de a ara. De asta cad semințe și pe drum și în spini — nu pentru că semănătorul era neatent, ci pentru că așa se semăna." },
        { from: "guide", text: "Punctul principal: același cuvânt, patru feluri de pământ. Diferența e în sol, nu în sămânță și nici în mâna care a arunca-o." },
      ],
    },
    {
      id: "i1_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "Când un om aude Cuvântul Împărăției și nu-l înțelege, vine cel rău și răpește ce a fost semănat în inima lui.",
        ref: "Matei 13:19",
      },
      bubbles: [
        { from: "guide", text: "Cele patru feluri, pe scurt, așa cum le explică El: drumul bătătorit — se aude și nu se înțelege; pietrele — se primește cu bucurie și nu are rădăcină; spinii — grijile și bogățiile înnăbușă; pământul bun — aude, înțelege, rodește." },
      ],
    },
    {
      id: "i1_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        { from: "guide", text: "Prima citire greșită: „dacă nu rodește, semănătorul a greșit — nu s-a spus bine, nu s-a explicat frumos”." },
        { from: "guide", text: "În pildă, semănătorul face un singur lucru și îl face bine. Nu e vina Lui că un pământ e bătătorit. Asta scoate o povară uriașă de pe orice om care a vorbit despre Iisus și n-a fost primit." },
        { from: "guide", text: "A doua citire greșită, mai grea: „eu sunt pământ cu spini, aia e, așa am fost făcut”. Solul nu e o sentință. Un pământ se lucrează: drumul se sapă, pietrele se scot, spinii se taie. Nimeni nu se naște pământ bun." },
      ],
    },
    {
      id: "i1_6",
      type: "choice",
      order: 6,
      choice: {
        prompt: "Cinstit, ce se întâmplă cel mai des cu ce citești sau auzi?",
        options: [
          { id: "i1c_a", label: "Aud și nu înțeleg mai nimic." },
          { id: "i1c_b", label: "Mă aprind repede și mă sting repede." },
          { id: "i1c_c", label: "Înțeleg, dar grijile înghit tot." },
        ],
      },
    },
    {
      id: "i1_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        { from: "guide", text: "Dacă auzi și nu înțelegi: nu e o problemă de inteligență. Un drum bătătorit s-a făcut tare pentru că a fost călcat mult — de dezamăgiri, de vorbe goale auzite în copilărie. Se sapă. Întreabă direct, chiar în lecție, ce nu înțelegi." },
        { from: "guide", text: "Dacă te aprinzi și te stingi: nu îți lipsește entuziasmul, îți lipsește rădăcina. Rădăcina se face în întuneric, unde nu se vede — adică în zilele obișnuite, singur cu El, fără martori." },
        { from: "guide", text: "Dacă grijile înghit tot: spinii nu se ucid cu putere de voință. Se taie unul pe săptămână. Alege un singur lucru care îți mănâncă liniștea și pune-l în mâna Lui, cu nume, azi." },
      ],
    },
    {
      id: "i1_8",
      type: "quiz",
      order: 8,
      quiz: {
        question: "Unde e diferența între cele patru cazuri?",
        options: [
          { text: "În sămânță — unele semințe sunt mai bune", correct: false },
          { text: "În sol — aceeași sămânță, patru feluri de pământ", correct: true },
          { text: "În felul în care a semănat omul", correct: false },
        ],
        explanation:
          "Matei 13. Iisus explică singur pilda și toată explicația e despre inimă, nu despre sămânță.",
      },
    },
    {
      id: "i1_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        { from: "guide", text: "Limita cinstită: pilda nu ne spune de ce un om ajunge drum și altul pământ bun, și nu ne dă dreptul să punem eticheta pe cineva — nici pe noi. Ce sol ești azi nu e ce sol vei fi la anul." },
        { from: "guide", text: "Și nu ne spune cât timp ia lucrarea pământului. În agricultură, niciodată nu e o zi." },
      ],
    },
    {
      id: "i1_10",
      type: "journal",
      order: 10,
      journalPrompt:
        "Scrie ce anume îți înnăbușă acum ce ai înțeles despre Dumnezeu. Un lucru, cu numele lui.",
    },
    {
      id: "i1_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Cel ce a primit sămânța în pământ bun este cel care aude Cuvântul și-l înțelege.",
        ref: "Matei 13:23",
      },
    },
  ],
}

export const pildaNeghina: Lesson = {
  id: "pilda_neghina",
  courseId: "parables_c2_imparatia",
  order: 2,
  title: "Grâul și neghina",
  estMinutes: 10,
  anchorRefs: ["Matei 13:24-30", "Matei 13:29-30"],
  memoryVerseRef: "Matei 13:30",
  steps: [
    {
      id: "i2_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Un om seamănă grâu bun. Peste noapte, vine un dușman și seamănă neghină între grâu. Când răsar amândouă, robii vin cu o propunere foarte logică: să mergem să smulgem neghina." },
        { from: "guide", text: "Răspunsul stăpânului e „nu”. Și motivul lui e cel mai important lucru din pildă." },
      ],
    },
    {
      id: "i2_2",
      type: "scripture",
      order: 2,
      scripture: {
        text: "Nu, ca nu cumva, smulgând neghina, să smulgeți și grâul împreună cu ea. Lăsați-le să crească amândouă împreună până la vremea secerișului.",
        ref: "Matei 13:29-30",
      },
      bubbles: [
        { from: "guide", text: "Două propoziții de context: neghina de care se vorbește semăna atât de bine cu grâul încât, până la spic, nici un țăran nu le deosebea sigur. Iar rădăcinile se încurcau în pământ." },
        { from: "guide", text: "Deci ce spune stăpânul nu e o vorbă blândă. E o observație agricolă exactă: dacă tragi de una, iese și cealaltă." },
      ],
    },
    {
      id: "i2_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        { from: "guide", text: "Punctul principal: separarea nu e treaba noastră și nu e acum. Are cine să o facă și are un moment al ei." },
        { from: "guide", text: "Iar cine face curățenie prea devreme nu scoate răul din lume — scoate și grâu." },
      ],
    },
    {
      id: "i2_4",
      type: "name_struggle",
      order: 4,
      bubbles: [
        { from: "guide", text: "Cui i-a fost spusă: aceeași mulțime, aceeași zi cu semănătorul. Oameni care trăiau sub ocupație și care așteptau un Mesia care să facă, întâi de toate, curățenie: să dea afară romanii și pe cei care colaborau cu ei." },
        { from: "guide", text: "Iar El le spune că Împărăția crește în același lan cu răul, o vreme. Nu era ce voiau să audă." },
      ],
    },
    {
      id: "i2_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        { from: "guide", text: "Citirea greșită, și cea care a făcut cel mai mult rău între credincioși: „trebuie curățită adunarea de cei nevrednici, ca să rămână numai cei adevărați”." },
        { from: "guide", text: "Stăpânul spune, cu gura lui, exact invers: lăsați-le să crească împreună. Și motivul nu e că nu contează diferența, ci că mâna noastră nu e sigură." },
        { from: "guide", text: "Atenție: pilda nu desființează disciplina și nu spune că orice se poate tolera oriunde. Vorbește despre judecata finală a unui om — aceea nu ne aparține." },
      ],
    },
    {
      id: "i2_6",
      type: "choice",
      order: 6,
      choice: {
        prompt: "Ce te apasă mai mult din pilda asta?",
        options: [
          { id: "i2c_a", label: "Mă mânie că răul rămâne nepedepsit." },
          { id: "i2c_b", label: "Mă tem că eu sunt neghina." },
          { id: "i2c_c", label: "Am fost dat la o parte de cineva care făcea „curățenie”." },
        ],
      },
    },
    {
      id: "i2_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        { from: "guide", text: "Dacă te mânie că răul rămâne: pilda nu spune că se trece cu vederea. Spune că se amână. Există un secerș, și răbdarea de acum nu e nepăsare, e ferire de pagubă." },
        { from: "guide", text: "Dacă te temi că ești neghina: uită-te cine pune întrebarea. Neghina din pildă nu se întreabă nimic și nu vrea să fie grâu. Frica asta e, ea însăși, un semn." },
        { from: "guide", text: "Dacă ai fost smuls de mâna cuiva: pilda e de partea ta, limpede. Cine te-a scos a făcut exact ce stăpânul a interzis." },
      ],
    },
    {
      id: "i2_8",
      type: "quiz",
      order: 8,
      quiz: {
        question: "De ce nu se smulge neghina imediat?",
        options: [
          { text: "Pentru că nu contează diferența dintre ele", correct: false },
          { text: "Ca să nu fie smuls și grâul — rădăcinile sunt încurcate", correct: true },
          { text: "Pentru că robii erau prea puțini", correct: false },
        ],
        explanation:
          "Matei 13:29. Motivul e dat în text și e practic: mâna care curăță prea devreme face pagubă.",
      },
    },
    {
      id: "i2_9",
      type: "how_god_helps",
      order: 9,
      bubbles: [
        { from: "guide", text: "Limita cinstită: pilda nu ne dă o hartă a secerișului și nu ne spune cine e cine. Tocmai asta e ideea. Dacă ieșim de aici știind cine e neghina din jurul nostru, am citit-o invers." },
      ],
    },
    {
      id: "i2_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Lăsați-le să crească amândouă împreună până la vremea secerișului.",
        ref: "Matei 13:30",
      },
    },
  ],
}

export const pildaMustarul: Lesson = {
  id: "pilda_mustarul",
  courseId: "parables_c2_imparatia",
  order: 3,
  title: "Sămânța de muștar și aluatul",
  estMinutes: 9,
  anchorRefs: ["Matei 13:31-33", "Zaharia 4:10"],
  memoryVerseRef: "Matei 13:33",
  steps: [
    {
      id: "i3_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Două pilde scurte, spuse una după alta, cu același punct. O sămânță cât un grăunte de praf și o mână de aluat pus în făină." },
      ],
    },
    {
      id: "i3_2",
      type: "truth_simple",
      order: 2,
      bubbles: [
        { from: "guide", text: "Două propoziții de context: sămânța de muștar era, în vorbirea de atunci, imaginea standard pentru „cel mai mic lucru cu putință”. Iar aluatul nu se vede și nu se aude — lucrează pe dinlăuntru, peste noapte." },
        { from: "guide", text: "Punctul principal: Împărăția începe nevăzut și crește din interior. Nu se instalează cu zgomot, crește pe dedesubt până cuprinde totul." },
      ],
    },
    {
      id: "i3_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Împărăția cerurilor se aseamănă cu un aluat pe care l-a luat o femeie și l-a pus în trei măsuri de făină, până s-a dospit toată plămădeala.",
        ref: "Matei 13:33",
      },
      bubbles: [
        { from: "guide", text: "Nu alegorizăm detaliile: nu căutăm ce înseamnă femeia, ce înseamnă trei și ce înseamnă făina. Sunt decor de povestire. Punctul e unul: puțin, ascuns, și totuși schimbă toată plămădeala." },
      ],
    },
    {
      id: "i3_4",
      type: "name_struggle",
      order: 4,
      bubbles: [
        { from: "guide", text: "Cui i-a fost spusă: unor oameni care așteptau ca Împărăția să vină ca o răsturnare politică, cu armată și cu tron. Ei căutau un eveniment. El le arată un proces." },
        { from: "guide", text: "Și, în fața lor, dovada era ridicolă: doisprezece oameni de rând, pe malul unui lac, într-o provincie de margine." },
      ],
    },
    {
      id: "i3_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        { from: "guide", text: "Citirea greșită, foarte prezentă azi: „Dumnezeu lucrează prin lucruri mari și spectaculoase — dacă e de la El, se vede, se aude, umple săli”." },
        { from: "guide", text: "În cele două pilde, tot ce e de la El începe atât de mic încât îți vine să nu-l bagi în seamă. Iar aluatul lucrează tocmai când nimeni nu se uită." },
      ],
    },
    {
      id: "i3_6",
      type: "scripture",
      order: 6,
      scripture: {
        text: "Cine disprețuiește ziua începuturilor slabe?",
        ref: "Zaharia 4:10",
      },
      bubbles: [
        { from: "guide", text: "Întrebarea asta e pusă în Scriptură unor oameni care plângeau că templul rezidit era mai sărac decât cel de dinainte. Același tipar: început mic, disprețuit de martori." },
      ],
    },
    {
      id: "i3_7",
      type: "choice",
      order: 7,
      choice: {
        prompt: "Ce ți se pare prea mic în viața ta acum?",
        options: [
          { id: "i3c_a", label: "Credința mea. Nu simt aproape nimic." },
          { id: "i3c_b", label: "Ce fac pentru alții. Pare nesemnificativ." },
          { id: "i3c_c", label: "Schimbarea din mine. Merge prea încet." },
        ],
      },
    },
    {
      id: "i3_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        { from: "guide", text: "Dacă ai bifat prima: mărimea credinței nu e ce o face lucrătoare. Iisus a spus în alt loc că e de ajuns credință cât o sămânță de muștar. Nu ți se cere să simți mult, ți se cere să pui puținul în pământ." },
        { from: "guide", text: "Dacă ai bifat a doua: aluatul nu își vede lucrarea. O vede cel care taie pâinea, mai târziu." },
        { from: "guide", text: "Dacă ai bifat a treia: creșterea încet, pe dinlăuntru, e semnul lucrării Lui, nu al lipsei ei. Ce se face repede și cu zgomot se stinge la fel." },
      ],
    },
    {
      id: "i3_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Ce spun cele două pilde despre Împărăție?",
        options: [
          { text: "Că vine printr-un eveniment mare și văzut de toți", correct: false },
          { text: "Că începe nevăzut, mic, și crește din interior", correct: true },
          { text: "Că rămâne mereu mică și ascunsă", correct: false },
        ],
        explanation:
          "Matei 13:31-33. Începe mai mic decât se poate observa și ajunge să cuprindă toată plămădeala.",
      },
    },
    {
      id: "i3_10",
      type: "how_god_helps",
      order: 10,
      bubbles: [
        { from: "guide", text: "Limita cinstită: pildele nu ne spun cât timp ia creșterea și nu sunt o promisiune că orice lucru mic început de noi va ajunge mare. Vorbesc despre Împărăția Lui, nu despre planurile noastre." },
      ],
    },
    {
      id: "i3_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Un aluat pe care l-a luat o femeie și l-a pus în făină, până s-a dospit toată plămădeala.",
        ref: "Matei 13:33",
      },
    },
  ],
}

/** Prima parte a cursului 2, în ordine. */
export const PILDE_IMPARATIA_PART_A: Lesson[] = [
  pildaSemanatorul,
  pildaNeghina,
  pildaMustarul,
]
