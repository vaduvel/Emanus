import type { Lesson } from "../domain.js"

/* Pildele — Cursul 4: bani, moarte și ce rămâne. Fișele 1-3. */

export const pildaBogatulNebun: Lesson = {
  id: "pilda_bogatul_nebun", courseId: "parables_c4_vesnicia", order: 1,
  title: "Bogatul nebun", estMinutes: 10,
  anchorRefs: ["Luca 12:13-21", "Luca 12:15"], memoryVerseRef: "Luca 12:15",
  steps: [
    { id: "e1_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Un om Îi cere lui Iisus să arbitreze o moștenire. Iisus refuză să intre în împărțeală și spune o poveste despre un om căruia i-a rodit țarina peste măsură." },
      { from: "guide", text: "Problema nu începe în hambar. Începe în propoziția pe care omul și-o spune singur: «ai multe bunătăți strânse pentru mulți ani»." },
    ]},
    { id: "e1_2", type: "name_struggle", order: 2, bubbles: [
      { from: "guide", text: "Cui i-a fost spusă: mulțimii, după ce cineva a încercat să-L folosească pe Iisus ca să câștige o ceartă de familie despre bani." },
      { from: "guide", text: "Două propoziții de context: moștenirea pământului ținea familia în viață și disputele puteau rupe casa. Hambarele mari erau semn de siguranță într-o lume în care o recoltă proastă însemna foame." },
    ]},
    { id: "e1_3", type: "scripture", order: 3, scripture: { text: "Vedeți și păziți-vă de orice fel de lăcomie de bani; căci viața cuiva nu stă în belșugul avuției lui.", ref: "Luca 12:15" } },
    { id: "e1_4", type: "truth_simple", order: 4, bubbles: [
      { from: "guide", text: "Punctul principal: viața nu poate fi depozitată. Omul a calculat recolta, spațiul și anii — dar a lăsat în afara calculului faptul că viața lui nu-i aparținea." },
      { from: "guide", text: "Textul nu-l numește nebun fiindcă a avut mult. Îl numește nebun fiindcă a făcut din mult răspunsul la întrebarea «suflete, de ce mai ai nevoie?»." },
    ]},
    { id: "e1_5", type: "world_vs_truth", order: 5, bubbles: [
      { from: "guide", text: "Citirea greșită: «Dumnezeu e împotriva economiilor și a planurilor». Pilda nu condamnă planificarea. Condamnă planul în care tu ești singurul beneficiar, iar Dumnezeu și aproapele nu există." },
      { from: "guide", text: "Alta: «dacă ai bani, ești omul din pildă». Nu suma îl demască, ci locul în care și-a pus viața." },
    ]},
    { id: "e1_6", type: "choice", order: 6, choice: { prompt: "Ce promiți, fără să vrei, că banii vor face pentru tine?", options: [
      { id: "e1a", label: "Că nu-mi va mai fi frică." }, { id: "e1b", label: "Că voi conta în ochii oamenilor." }, { id: "e1c", label: "Că voi putea, în sfârșit, să mă odihnesc." },
    ]}},
    { id: "e1_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Un singur lucru: ia ultima cheltuială făcută doar ca să te simți în siguranță sau văzut. Nu te condamna. Scrie ce sperai să cumpere, dincolo de obiect." },
      { from: "guide", text: "Apoi fă un gest mic în direcția opusă: păstrează, dăruiește sau renunță — nu ca taxă spirituală, ci ca să-i amintești inimii că ea nu locuiește într-un hambar." },
    ]},
    { id: "e1_8", type: "how_god_helps", order: 8, bubbles: [
      { from: "guide", text: "Limita cinstită: pilda nu spune că sărăcia e virtute și nu îți cere să ignori chiria, datoriile sau copiii. Administrarea responsabilă nu este lăcomie." },
      { from: "guide", text: "Nu spune nici când va muri cineva. Tensiunea ei este mai simplă: dacă ți s-ar lua mâine tot ce ai strâns, ce din tine ar mai rămâne bogat față de Dumnezeu?" },
    ]},
    { id: "e1_9", type: "memory_verse", order: 9, scripture: { text: "Viața cuiva nu stă în belșugul avuției lui.", ref: "Luca 12:15" } },
  ],
}

export const pildaBogatulLazar: Lesson = {
  id: "pilda_bogatul_lazar", courseId: "parables_c4_vesnicia", order: 2,
  title: "Bogatul și Lazăr", estMinutes: 11,
  anchorRefs: ["Luca 16:19-31", "Luca 16:29"], memoryVerseRef: "Luca 16:29",
  steps: [
    { id: "e2_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Un om bogat îmbrăcat în purpură petrece în fiecare zi. La poarta lui zace Lazăr, bolnav și flămând. Cei doi mor, iar pozițiile se răstoarnă." },
      { from: "guide", text: "Pilda nu începe după moarte. Începe la o poartă pe lângă care cineva a trecut în fiecare zi." },
    ]},
    { id: "e2_2", type: "name_struggle", order: 2, bubbles: [
      { from: "guide", text: "Cui i-a fost spusă: fariseilor descriși cu câteva versete înainte drept iubitori de bani, care Îl batjocoreau pe Iisus." },
      { from: "guide", text: "Două propoziții de context: purpura și inul subțire erau hainele elitei, iar ospățul zilnic era lux, nu masă obișnuită. Lazăr stătea chiar la poartă — bogatul nu putea spune că nu știa." },
    ]},
    { id: "e2_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Punctul principal: omul care a avut Cuvântul și l-a ignorat în persoana celui de la poartă nu va fi schimbat de un spectacol mai mare. Nici măcar de un mort întors la viață." },
      { from: "guide", text: "Lazăr e singurul personaj din pildele lui Iisus care primește un nume. Omul fără nume pe pământ este cunoscut de Dumnezeu; omul cunoscut de toți rămâne fără nume în poveste." },
    ]},
    { id: "e2_4", type: "scripture", order: 4, scripture: { text: "Au pe Moise și pe proroci; să asculte de ei.", ref: "Luca 16:29" }, bubbles: [
      { from: "guide", text: "Nu le lipsea informația. Le lipsea ascultarea de ceea ce știau deja despre dreptate, milă și aproapele." },
    ]},
    { id: "e2_5", type: "world_vs_truth", order: 5, bubbles: [
      { from: "guide", text: "Citirea greșită: «pilda este o hartă tehnică a lumii de după moarte». Iisus folosește imagini cunoscute ascultătorilor ca să țină o oglindă celor vii; scopul nu este să măsoare distanțe în veșnicie." },
      { from: "guide", text: "Alta: «Lazăr e salvat fiindcă a fost sărac, bogatul e pierdut fiindcă a fost bogat». Textul nu spune asta. Punctul vizibil este poarta: unul a fost în fața celuilalt, iar mila n-a trecut pragul." },
    ]},
    { id: "e2_6", type: "choice", order: 6, choice: { prompt: "Care e «poarta» pe lângă care treci des?", options: [
      { id: "e2a", label: "Un om pe care îl văd, dar îl evit." }, { id: "e2b", label: "O nevoie despre care spun că nu e treaba mea." }, { id: "e2c", label: "Nu știu încă. Vreau să observ." },
    ]}},
    { id: "e2_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Astăzi nu rezolva sărăcia lumii. Oprește-te la o singură poartă: întreabă un om de ce are nevoie, oferă o masă sau caută serviciul potrivit care poate ajuta." },
      { from: "guide", text: "Ajutorul cinstit are limite. Nu da bani dacă te pune în pericol și nu intra singur într-o situație nesigură. Mila nu cere inconștiență." },
    ]},
    { id: "e2_8", type: "how_god_helps", order: 8, bubbles: [
      { from: "guide", text: "Limita cinstită: pilda lasă o prăpastie și nu o îndulcim. Dar Emanus nu folosește pilda ca să declare unde este o persoană anume după moarte." },
      { from: "guide", text: "Nici nu explică toate cauzele sărăciei și nu spune că orice om cu resurse este vinovat. Te întreabă doar ce face iubirea ta când nevoia are un chip și stă la poarta ta." },
    ]},
    { id: "e2_9", type: "memory_verse", order: 9, scripture: { text: "Au pe Moise și pe proroci; să asculte de ei.", ref: "Luca 16:29" } },
  ],
}

export const pildaIconomul: Lesson = {
  id: "pilda_iconomul_viclean", courseId: "parables_c4_vesnicia", order: 3,
  title: "Iconomul viclean", estMinutes: 11,
  anchorRefs: ["Luca 16:1-13", "Luca 16:13"], memoryVerseRef: "Luca 16:13",
  steps: [
    { id: "e3_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Un administrator află că va fi concediat. Înainte să predea registrele, reduce datoriile oamenilor față de stăpân, ca să aibă cine să-l primească după aceea. Stăpânul îi laudă priceperea." },
      { from: "guide", text: "Da, pilda e intenționat incomodă. Iisus nu laudă furtul. Laudă faptul că omul a înțeles că prezentul lui scurt decide unde va locui după ce pierde funcția." },
    ]},
    { id: "e3_2", type: "name_struggle", order: 2, bubbles: [
      { from: "guide", text: "Cui i-a fost spusă: ucenicilor, imediat după pildele lucrurilor pierdute și înainte ca fariseii iubitori de bani să înceapă să râdă de El." },
      { from: "guide", text: "Două propoziții de context: un iconom administra averea altuia și avea autoritate asupra contractelor, dar trebuia să dea socoteală. Datoriile în ulei și grâu erau enorme; schimbarea lor crea obligații sociale puternice." },
    ]},
    { id: "e3_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Punctul principal: folosește ce este temporar cu ochii la ce rămâne. Omul rău a avut măcar luciditatea de a acționa înainte ca fereastra să se închidă." },
      { from: "guide", text: "Banii sunt numiți «ai altuia» mai târziu în text. Îi administrezi o vreme. Nu îi iei cu tine." },
    ]},
    { id: "e3_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Citirea greșită: «Iisus spune să fii șmecher». Nu. Pilda folosește un om nedrept ca exemplu într-un singur punct: a văzut capătul și a acționat în lumina lui." },
      { from: "guide", text: "O pildă poate spune «învață această singură mișcare chiar de la omul acesta» fără să spună «devino ca el în toate»." },
    ]},
    { id: "e3_5", type: "scripture", order: 5, scripture: { text: "Nu puteți sluji lui Dumnezeu și lui Mamona.", ref: "Luca 16:13" }, bubbles: [
      { from: "guide", text: "Nu spune că nu poți avea bani. Spune că nu poți avea doi stăpâni. Un instrument poate sta în mână; un stăpân îți spune cine ești și ce să faci." },
    ]},
    { id: "e3_6", type: "choice", order: 6, choice: { prompt: "Când banii îți dau ordine, cum sună vocea lor?", options: [
      { id: "e3a", label: "Nu da, că nu vei avea destul." }, { id: "e3b", label: "Arată-le că ai reușit." }, { id: "e3c", label: "Mai mult, apoi te vei opri." },
    ]}},
    { id: "e3_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Alege o sumă mică pe care o administrezi conștient săptămâna asta: pentru o datorie, o nevoie reală sau un om. Nu valoarea e testul, ci cine dă ordinul." },
    ]},
    { id: "e3_8", type: "how_god_helps", order: 8, bubbles: [
      { from: "guide", text: "Limita cinstită: pilda nu oferă un buget universal, un procent obligatoriu și nici permisiunea de a înșela pentru o cauză bună. Nedreptatea rămâne nedreptate." },
      { from: "guide", text: "Tensiunea rămâne: oamenii pot fi foarte prevăzători pentru următorii cinci ani și complet nepregătiți pentru lucrurile care rămân după ei." },
    ]},
    { id: "e3_9", type: "memory_verse", order: 9, scripture: { text: "Nu puteți sluji lui Dumnezeu și lui Mamona.", ref: "Luca 16:13" } },
  ],
}

export const PILDE_VESNICIA_PART_A: Lesson[] = [pildaBogatulNebun, pildaBogatulLazar, pildaIconomul]
