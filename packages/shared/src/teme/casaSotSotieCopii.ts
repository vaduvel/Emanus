import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 11 din docs/41-module-teme-poonen.md: "Casa: sot, sotie, copii".
 * Temele 49-52.
 *
 * Sursa: Zac Poonen, "Basic Christian Teachings", capitolele 49-52 (cfcindia.com).
 * Tradus fidel din textul autorului. Vezi docs/42-sursa-si-atribuire-poonen.md.
 * Stare: in_review.
 */

type Input = {
  id: string
  order: number
  title: string
  refs: string[]
  ref: string
  hook: string
  word: string
  truth: string[]
  wrongA: string
  wrongB: string
  right: string
  explanation: string
  step: string
  prayer: string
  journal: string
  memory: string
}

const COURSE_ID = "teme_c11_casa"

const b = (...text: string[]) => text.map((line) => ({ from: "guide" as const, text: line }))

function make(i: Input): Lesson {
  const p = i.id.replace(/_/g, "")
  const steps: LessonStep[] = [
    { id: `${p}h`, type: "hook", order: 1, bubbles: b(i.hook) },
    {
      id: `${p}c`,
      type: "choice",
      order: 2,
      choice: {
        prompt: "Cum este in casa ta?",
        options: [
          { id: `${p}c1`, label: "Traim in aceeasi casa, dar departe." },
          { id: `${p}c2`, label: "Arat cu degetul spre celalalt." },
          { id: `${p}c3`, label: "Vreau sa incep cu partea mea." },
        ],
      },
    },
    { id: `${p}s`, type: "scripture", order: 3, scripture: { text: i.word, ref: i.ref } },
    { id: `${p}t`, type: "truth_simple", order: 4, bubbles: b(...i.truth) },
    {
      id: `${p}q`,
      type: "quiz",
      order: 5,
      quiz: {
        question: "Care este raspunsul asezat?",
        options: [
          { text: i.wrongA, correct: false },
          { text: i.right, correct: true },
          { text: i.wrongB, correct: false },
        ],
        explanation: i.explanation,
      },
    },
    {
      id: `${p}a`,
      type: "how_god_helps",
      order: 6,
      bubbles: b(
        "Dumnezeu este cea mai puternica legatura din univers. Cand El tine doi oameni impreuna, nimeni nu-i poate desparti.",
        "Cand ne judecam pe noi si umblam in lumina, avem partasie unul cu altul.",
      ),
    },
    { id: `${p}p`, type: "step", order: 7, bubbles: b(i.step) },
    { id: `${p}r`, type: "prayer", order: 8, bubbles: b(i.prayer) },
    { id: `${p}j`, type: "journal", order: 9, journalPrompt: i.journal },
    { id: `${p}m`, type: "memory_verse", order: 10, scripture: { text: i.memory, ref: i.ref } },
  ]
  return {
    id: i.id,
    courseId: COURSE_ID,
    order: i.order,
    title: i.title,
    estMinutes: 9,
    anchorRefs: i.refs,
    memoryVerseRef: i.ref,
    steps,
  }
}

export const CASA_SOT_SOTIE_COPII_LESSONS: Lesson[] = [
  make({
    id: "casa_l1",
    order: 1,
    title: "Dumnezeu leaga sotul si sotia",
    refs: ["Matei 19:4-6", "Geneza 2:18", "Geneza 2:24", "1 Ioan 1:7"],
    ref: "Geneza 2:24",
    hook: "De ce n-a facut Dumnezeu pe Adam si pe Eva deodata? Fiindca avea ceva de invatat pe amandoi.",
    word: "De aceea va lasa omul pe tatal sau si pe mama sa si se va lipi de nevasta sa, si se vor face un singur trup.",
    truth: [
      "Fariseii L-au intrebat pe Isus daca este ingaduit sa-ti lasi nevasta. El le-a raspuns: n-ati citit ca la inceput i-a facut parte barbateasca si parte femeiasca? Deci, ce a impreunat Dumnezeu, omul sa nu desparta.",
      "Moise ingaduise despartirea, dar era o randuiala vremelnica. Isus a spus: daca vrei sa stii voia desavarsita a lui Dumnezeu, intoarce-te la inceput.",
      "Si intre crestini sunt multe casnicii nefericite. Nu s-au despartit cu acte, dar s-au despartit cu duhul. Poti locui in aceeasi casa douazeci de ani si sa traiti ca doi oameni singuri.",
      "Nu Adam I-a cerut lui Dumnezeu o sotie. Dumnezeu a spus: nu este bine ca omul sa fie singur; ii voi face un ajutor potrivit pentru el.",
      "De ce nu i-a facut deodata? Cand Adam a deschis ochii, pe cine a vazut cel dintai? Pe Dumnezeu. Nu avea nicio sotie. Mult mai tarziu i s-a dat una.",
      "Iar cand Eva a primit viata si a deschis ochii, pe cine a vazut? Nu pe Adam - el dormea in alta parte a gradinii. L-a vazut pe Dumnezeu, si abia mai tarziu a fost adusa la Adam.",
      "Ce voia Dumnezeu sa-i invete pe amandoi? Un singur lucru: Eu trebuie sa fiu cel dintai in viata voastra, in toata vremea.",
      "Cand Dumnezeu Insusi este intre sot si sotie, cand fiecare Il pune pe Domnul cel dintai in viata lui, cei doi sunt lipiti unul de altul. Dumnezeu este cea mai tare legatura din univers. Nici diavolul, nici imprejurarile, nici saracia, nici lumea intreaga nu-i pot desparti.",
      "Cand Dumnezeu nu este acolo, oamenii sunt tinuti impreuna de alte puteri, care nu sunt destul de tari. La tineri, adesea este frumusetea. Frumusetea nu tine o casnicie cincizeci de ani. Sau o slujba buna, o familie buna, bani multi, o zestre. Nu tin niciodata.",
      "Deci, daca esti sot, nu cauta sa fii tu cel dintai in inima sotiei tale; Domnul trebuie sa fie cel dintai. Iar daca esti sotie, Domnul trebuie sa fie cel dintai in inima sotului tau, si tu a doua.",
      "Ce se poate aseza intre voi? Parintii. Este scris: va lasa omul pe tatal sau si pe mama sa. Trebuie sa lasi inainte de a te lipi. Nu inseamna sa nu-i ingrijesti - trebuie sa-i cinstesti pana in ultima zi - dar trebuie sa te desprinzi cu inima.",
    ],
    wrongA: "O casnicie se tine cu dragostea dintre cei doi.",
    right: "Se tine prin Dumnezeu asezat intre ei, cel dintai in inima fiecaruia.",
    wrongB: "A lasa pe tata si pe mama inseamna sa nu-i mai ingrijesti.",
    explanation:
      "Daca incerci sa te lipesti fara sa fi lasat, nu veti fi niciodata una.",
    step: "Asaza azi un sfert de ceas numai cu Dumnezeu, inainte de orice discutie in casa.",
    prayer: "Doamne, fii Tu cel dintai in inima mea, ca sa pot fi una cu omul de langa mine.",
    journal: "Ce s-a asezat intre voi: parintii, slujba, copiii, banii?",
    memory: "Ce a impreunat Dumnezeu, omul sa nu desparta.",
  }),
  make({
    id: "casa_l2",
    order: 2,
    title: "Ce are de facut fiecare",
    refs: ["Efeseni 5:22-33", "1 Timotei 3:5", "Geneza 3:12"],
    ref: "Efeseni 5:25",
    hook: "Nicaieri in Scriptura nu scrie: barbatilor, faceti-va sotiile sa vi se supuna. Si nici: femeilor, faceti-i pe soti sa va iubeasca.",
    word: "Barbatilor, iubiti-va nevestele cum a iubit si Hristos Biserica.",
    truth: [
      "Sa-ti cinstesti parintii? Negresit. Dar sa nu-i lasi sa se aseze intre tine si sotul sau sotia ta. Sa te ingrijesti de copii? Da. Dar sa nu-i iubesti mai mult decat va iubiti unul pe altul. Multi parinti fac asta si nu asculta de Dumnezeu.",
      "Nicio legatura din Biblie nu este atat de apropiata ca cea dintre sot si sotie. Barbatul este capul nevestei - nu ca seful unei organizatii, care poate sa nu aiba niciun interes pentru cei din ea, ci ca un cap fata de trupul sau, care se ingrijeste de fiecare madular.",
      "Nici tata si fiu, nici mama si fiica nu sunt zugraviti asa. Numai sotul si sotia. Aceasta este apropierea pe care o vrea Dumnezeu.",
      "Chiar si daca iubesti slujirea mai mult, iti darami casnicia. Am spus ca Domnul trebuie sa fie cel dintai - dar nu confunda pe Domnul cu lucrarea Domnului. Sunt oameni care isi lasa sotiile deoparte spunand: fac lucrarea Domnului. Sfarsitul este ca se darama si casnicia, si lucrarea.",
      "Gandeste-te la o casa cu trei caturi. Temelia este dragostea desavarsita a lui Dumnezeu aratata in Hristos. Catul intai este umblarea ta personala cu Dumnezeu. Catul al doilea este legatura cu sotul sau sotia. Catul al treilea este slujirea si biserica.",
      "Este scris despre un prezbiter: daca cineva nu stie sa-si carmuiasca bine casa lui, cum va ingriji de Biserica lui Dumnezeu? Deci casa vine intai.",
      "Aici a naruit diavolul pe multi: i-a facut sa se piarda in lucrare, iar copiii le-au ajuns nepocaiti si acasa se cearta cu sotiile. Un asemenea om ar face bine sa se lase de slujire si sa stea acasa sa-si cladeasca legaturile.",
      "Nu spun ca sotia ta trebuie sa fie duhovniceasca inainte de a-L sluji pe Domnul. Dar inima ta fata de ea o poti stapani: sa fie o dragoste desavarsita, chiar daca ea ar fi cel mai rau om din lume.",
      "Ce inseamna sa-ti iubesti sotia cum a iubit Hristos Biserica? Sa fii gata sa-i speli picioarele; sa faci treburile murdare pentru ea. De cate ori iarta Hristos Biserica? De milioane de ori. De cate ori trebuie sa ierte un sot? Tot asa.",
      "Iar femeilor li se spune sa fie supuse barbatului, cum este Biserica supusa lui Hristos - nu cu cearta si in sila, ci cu bucurie, in toate. Afara de cazul in care ti se cere ceva impotriva Cuvantului lui Dumnezeu; atunci trebuie sa asculti de Dumnezeu.",
      "Primejdia este ca barbatii iau versetul acesta si-l folosesc ca pe un ciocan in capul sotiilor. Bagati de seama: Scriptura nu-i spune barbatului sa obtina supunerea, ci sa iubeasca. Iar sotia citeste ce are de facut barbatul in loc sa citeasca ce are ea de facut. Atunci este invalmasala.",
      "Asa a fost si in Eden: Adam a aratat cu degetul spre Eva si, pe ocolite, spre Dumnezeu; Eva a aratat cu degetul spre sarpe. Cat timp va invinuiti unul pe altul si il invinuiti pe diavolul, veti fi dati afara din rai.",
      "Care a fost pacatul lui Adam? Nu si-a luat locul de cap al casei. Cand Eva manca din rod, trebuia sa-i spuna: nu este bine. A stat tacut. Iar cand sotia nu-si ia locul de ajutor, ci hotaraste ca un conducator, deschide usa Satanei.",
    ],
    wrongA: "Datoria mea este sa-l fac pe celalalt sa-si faca datoria.",
    right: "Datoria mea este numai partea mea: sa iubesc sau sa ma supun.",
    wrongB: "Lucrarea Domnului trece inaintea casei.",
    explanation:
      "Randuiala este: Dumnezeu, apoi casa mea, apoi lucrarea lui Dumnezeu.",
    step: "Nu spune azi niciun cuvant despre ce are de facut celalalt; fa numai partea ta.",
    prayer: "Doamne, iarta-ma ca am cerut de la celalalt. Ajuta-ma sa-mi fac partea mea.",
    journal: "Ce parte a ta ai lasat nefacuta, uitandu-te la partea celuilalt?",
    memory: "Barbatilor, iubiti-va nevestele cum a iubit si Hristos Biserica.",
  }),
  make({
    id: "casa_l3",
    order: 3,
    title: "Cresterea copiilor in frica de Dumnezeu",
    refs: ["Maleahi 2:14-15", "Proverbe 22:6", "Efeseni 6:4", "Geneza 1:28"],
    ref: "Proverbe 22:6",
    hook: "Este usor sa ai copii. Sa-i cresti in frica de Dumnezeu este lucrarea unei vieti.",
    word: "Invata pe copil calea pe care trebuie s-o urmeze, si cand va imbatrani nu se va abate de la ea.",
    truth: [
      "Cele dintai cuvinte spuse de Dumnezeu lui Adam si Evei au fost: cresteti si inmultiti-va. Copiii lor trebuiau sa poarte mai departe chipul lui Dumnezeu in neamul urmator.",
      "In ultima pagina a Vechiului Testament, Domnul spune doua lucruri. Cel dintai: nevasta tineretii tale este tovarasa ta si sotia ta prin legamant, si tu ai fost necredincios fata de ea.",
      "Cati soti pot spune cinstit ca sotia le este cel mai bun prieten? Asa ar trebui sa fie. Casnicia este un legamant.",
      "Al doilea lucru: ce cauta Dumnezeu prin unirea voastra? O samanta dumnezeiasca - copii care sa duca chipul Lui in neamul urmator.",
      "Cum au iesit copiii tai arata cum ai trait tu in casa ta. Este scris: invata pe copil calea pe care trebuie s-o urmeze, si la batranete nu se va abate de la ea. Bagati de seama: nu spune calea duhovniceasca; spune calea pe care il inveti tu.",
      "De ce alearga copiii tai dupa bani? Fiindca asa i-ai crescut. De ce cauta marire in lume? Fiindca asta ai vrut pentru ei. Poti sa vorbesti frumos duhovniceste si sa fii prezbiter in biserica; daca ei sunt lumesti, ia tu vina asupra ta.",
      "Cand iei vina asupra ta, Dumnezeu te poate ajuta - chiar si daca ei au plecat deja de acasa.",
      "Nu spun ca trebuie sa ajunga lucratori cu vremea intreaga sau predicatori. Aceea este o chemare deosebita. Dar toti trebuie sa fie nascuti din nou si ucenici ai lui Isus, fie ca sunt asistente, invatatori sau ingineri.",
      "Copiii trebuie sa vada in parinti pentru ce traiesc. Daca ai trait pentru bani, iar duminica ai vorbit frumos in biserica, nu-i invinovati pe ei ca fac ce te-au vazut facand acasa.",
      "De ce s-a ratacit Iuda? Probabil ca a fost si el inchinat Domnului la Templu, ca prunc. Dar apoi a fost crescut pentru lume. Poate ca aducea de la scoala un creion care nu era al lui, si parintii treceau cu vederea.",
      "Cand treci cu vederea furtisagurile mici si minciunile mici, il inveti sa fie hot si mincinos cand va creste. Incepe cu un creion si poate sfarsi cu jefuirea unei banci.",
      "Ce trebuie sa-i spui atunci copilului? Daca ti-a luat cineva creionul, asta nu-ti da voie sa iei al altuia. Maine sa-l dai inapoi si sa spui: imi pare rau ca l-am luat.",
      "Sunt doua lucruri pe care trebuie sa le dam copiilor: invatatura si disciplina. Invatatura nu inseamna doar povestile lui Iosif si ale lui David, ci si temeiurile dreptatii, cinstirea parintilor si a celor batrani. Cine le va invata pe fetite cuviinta in imbracaminte si purtare, daca nu parintii? Altfel le vor invata de la televizor.",
    ],
    wrongA: "Copiii se strica singuri, din pricina lumii de afara.",
    right: "Copiii merg pe calea pe care i-am invatat noi; vina o luam noi si Dumnezeu ne ajuta.",
    wrongB: "Scopul este ca ei sa ajunga lucratori cu vremea intreaga.",
    explanation:
      "Daca faci partea intai a versetului, partea a doua vine de la sine.",
    step: "Indreapta azi un lucru mic la copilul tau, fara sa-l treci cu vederea.",
    prayer: "Doamne, ia vina de la mine si da-mi har sa-i cresc in frica de Tine.",
    journal: "Ce vad copiii ca este cel mai de pret pentru tine?",
    memory: "Invata pe copil calea pe care trebuie s-o urmeze.",
  }),
  make({
    id: "casa_l4",
    order: 4,
    title: "Cinstea, nuiaua si rugaciunea pe nume",
    refs: ["Efeseni 6:1-4", "Proverbe 22:15", "Faptele Apostolilor 5:29", "Geneza 9:22"],
    ref: "Efeseni 6:2",
    hook: "Dumnezeu le-a dat copiilor o singura porunca. Nu zece. Una singura, si cu o fagaduinta.",
    word: "Cinsteste pe tatal tau si pe mama ta - aceasta este cea dintai porunca insotita de o fagaduinta.",
    truth: [
      "Fagaduinta este: ca sa fii fericit si sa traiesti multa vreme pe pamant. Nu este vorba ca ei sa fie destepti, sanatosi sau bogati; este vorba de bine duhovnicesc.",
      "Ce inseamna sa traiasca multa vreme? Isus a trait treizeci si trei de ani. Inseamna sa implineasca planul lui Dumnezeu pentru viata lor, fie ca mor la douazeci sau la o suta de ani. Nu strica planul acela punandu-le in cap alte preturi.",
      "Parintilor li se spune: nu intaratati la manie pe copiii vostri. Nu-i sacaiti si nu-i certati zi si noapte, ci cresteti-i in invatatura si in mustrarea Domnului.",
      "Nebunia este lipita de inima copilului, dar nuiaua certarii o dezlipeste de el. Orice copil se naste asa, fie ca este copilul unui necredincios, fie al unei perechi tematoare de Dumnezeu.",
      "Nebunia este in inima, dar nuiaua se pune la spate si scoate nebunia din inima. Aceasta este calea lui Dumnezeu; mai bine urmeaz-o decat invataturile psihologilor de azi. Uitati-va ce se intampla in Apus: copii care se rascoala impotriva parintilor.",
      "Pentru ce sa folosim nuiaua? Cand nu asculta de acea singura porunca: sa-si cinsteasca parintii.",
      "Daca sparg din nebagare de seama un lucru scump, sa-i pedepsesti? Este fara minte. Daca au facut-o din razvratire si manie, atunci da; dar nu pentru o intamplare. Si noi facem greseli fara sa vrem.",
      "Daca esti fiu sau fiica: cinsteste-ti tatal si mama, chiar de ai saptezeci si cinci de ani. Cinsteste-i pana mori. Ascultarea tine cat timp esti in casa lor. Isus a ascultat de Iosif si de Maria cat a stat acasa; dupa botez, a cinstit-o pe mama Lui, dar la Cana i-a spus sa nu se amestece in lucrarea Lui.",
      "Cat timp esti sub autoritatea lor, asculta - afara de cazul cand ti se cere sa calci Cuvantul lui Dumnezeu; atunci trebuie sa ascultam mai mult de Dumnezeu decat de oameni.",
      "Cinstirea tine toata viata: sa nu vorbesti niciodata de rau despre ei. Vei vedea slabiciuni la parintii tai; acopera-le.",
      "De ce a fost blestemat Ham? Fiindca a vazut goliciunea tatalui sau si, in loc s-o acopere, s-a dus si a spus altora. Roaga-te pentru ei, dar tine ascuns - afara de cazul cand ceri sfat unui frate cu frica de Dumnezeu, ca sa fii ajutat.",
      "Cand incepe indreptarea? De indata ce copilul intelege ce ii spui, poate pe la un an, un an si jumatate. Cu cat incepi mai devreme, cu atat termini mai devreme: pe la treisprezece ani n-ar mai trebui sa fie nevoie de nuia.",
      "Cel mai mare lucru pe care il puteti face ca sot si sotie este sa fiti uniti. Nu va dezbinati la pedepsirea copiilor. Cand parintii sunt dezbinati, diavolul intra prin crapatura aceea. Si fiti pilda: nu le cereti ce nu faceti voi insiva.",
      "Si inca ceva: rugati-va pentru copiii vostri pe nume, in fiecare zi, pentru fiecare, toata viata voastra.",
    ],
    wrongA: "Trebuie sa-mi ascult parintii toata viata, orice mi-ar cere.",
    right: "Ii asculti cat esti sub acoperisul lor si ii cinstesti toata viata; dar mai presus de toti asculti de Dumnezeu.",
    wrongB: "Copiii trebuie pedepsiti si pentru greselile din nebagare de seama.",
    explanation:
      "Cinstirea si unitatea parintilor inchid usa prin care intra vrajmasul in casa.",
    step: "Roaga-te azi, pe nume, pentru fiecare copil al tau - si pentru parintii tai.",
    prayer: "Doamne, invata-ma sa cinstesc si sa cresc in frica de Tine tot ce mi-ai incredintat.",
    journal: "Ce slabiciune a parintilor tai ai povestit-o altora?",
    memory: "Cinsteste pe tatal tau si pe mama ta.",
  }),
]
