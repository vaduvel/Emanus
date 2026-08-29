import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 11 din docs/41-module-teme-poonen.md: "Casa: soț, soție, copii".
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
        prompt: "Cum este în casa ta?",
        options: [
          { id: `${p}c1`, label: "Trăim în aceeași casă, dar departe." },
          { id: `${p}c2`, label: "Arăt cu degetul spre celălalt." },
          { id: `${p}c3`, label: "Vreau să încep cu partea mea." },
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
        question: "Care este răspunsul așezat?",
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
        "Dumnezeu este cea mai puternică legătură din univers. Când El ține doi oameni împreună, nimeni nu-i poate despărți.",
        "Când ne judecăm pe noi și umblăm în lumină, avem părtășie unul cu altul.",
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
    title: "Dumnezeu leagă soțul și soția",
    refs: ["Matei 19:4-6", "Geneza 2:18", "Geneza 2:24", "1 Ioan 1:7"],
    ref: "Geneza 2:24",
    hook: "De ce n-a făcut Dumnezeu pe Adam și pe Eva deodată? Fiindcă avea ceva de învățat pe amândoi.",
    word: "De aceea va lăsa omul pe tatăl său și pe mama sa și se va lipi de nevasta sa, și se vor face un singur trup.",
    truth: [
      "Fariseii L-au întrebat pe Isus dacă este îngăduit să-ți lași nevasta. El le-a răspuns: n-ați citit că la început i-a făcut parte bărbătească și parte femeiască? Deci, ce a împreunat Dumnezeu, omul să nu despartă.",
      "Moise îngăduise despărțirea, dar era o rânduială vremelnică. Isus a spus: dacă vrei să știi voia desăvârșită a lui Dumnezeu, întoarce-te la început.",
      "Și între creștini sunt multe căsnicii nefericite. Nu s-au despărțit cu acte, dar s-au despărțit cu duhul. Poți locui în aceeași casă douăzeci de ani și să trăiți ca doi oameni singuri.",
      "Nu Adam I-a cerut lui Dumnezeu o soție. Dumnezeu a spus: nu este bine ca omul să fie singur; îi voi face un ajutor potrivit pentru el.",
      "De ce nu i-a făcut deodată? Când Adam a deschis ochii, pe cine a văzut cel dintâi? Pe Dumnezeu. Nu avea nicio soție. Mult mai târziu i s-a dat una.",
      "Iar când Eva a primit viață și a deschis ochii, pe cine a văzut? Nu pe Adam - el dormea în altă parte a grădinii. L-a văzut pe Dumnezeu, și abia mai târziu a fost adusă la Adam.",
      "Ce voia Dumnezeu să-i învețe pe amândoi? Un singur lucru: Eu trebuie să fiu cel dintâi în viața voastră, în toată vremea.",
      "Când Dumnezeu Însuși este între soț și soție, când fiecare Îl pune pe Domnul cel dintâi în viața lui, cei doi sunt lipiți unul de altul. Dumnezeu este cea mai tare legătură din univers. Nici diavolul, nici împrejurările, nici sărăcia, nici lumea întreagă nu-i pot despărți.",
      "Când Dumnezeu nu este acolo, oamenii sunt ținuți împreună de alte puteri, care nu sunt destul de tari. La tineri, adesea este frumusețea. Frumusețea nu ține o căsnicie cincizeci de ani. Sau o slujbă bună, o familie bună, bani mulți, o zestre. Nu țin niciodată.",
      "Deci, dacă ești soț, nu căuta să fii tu cel dintâi în inima soției tale; Domnul trebuie să fie cel dintâi. Iar dacă ești soție, Domnul trebuie să fie cel dintâi în inima soțului tău, și tu a doua.",
      "Ce se poate așeza între voi? Părinții. Este scris: va lăsa omul pe tatăl său și pe mama sa. Trebuie să lași înainte de a te lipi. Nu înseamnă să nu-i îngrijești - trebuie să-i cinstești până în ultima zi - dar trebuie să te desprinzi cu inima.",
    ],
    wrongA: "O căsnicie se ține cu dragostea dintre cei doi.",
    right: "Se ține prin Dumnezeu așezat între ei, cel dintâi în inima fiecăruia.",
    wrongB: "A lăsa pe tată și pe mamă înseamnă să nu-i mai îngrijești.",
    explanation:
      "Dacă încerci să te lipești fără să fi lăsat, nu veți fi niciodată una.",
    step: "Așază azi un sfert de ceas numai cu Dumnezeu, înainte de orice discuție în casă.",
    prayer: "Doamne, fii Tu cel dintâi în inima mea, ca să pot fi una cu omul de lângă mine.",
    journal: "Ce s-a așezat între voi: părinții, slujba, copiii, banii?",
    memory: "Ce a împreunat Dumnezeu, omul să nu despartă.",
  }),
  make({
    id: "casa_l2",
    order: 2,
    title: "Ce are de făcut fiecare",
    refs: ["Efeseni 5:22-33", "1 Timotei 3:5", "Geneza 3:12"],
    ref: "Efeseni 5:25",
    hook: "Nicăieri în Scriptură nu scrie: bărbaților, faceți-vă soțiile să vi se supună. Și nici: femeilor, faceți-i pe soți să vă iubească.",
    word: "Bărbaților, iubiți-vă nevestele cum a iubit și Hristos Biserica.",
    truth: [
      "Să-ți cinstești părinții? Negreșit. Dar să nu-i lași să se așeze între tine și soțul sau soția ta. Să te îngrijești de copii? Da. Dar să nu-i iubești mai mult decât vă iubiți unul pe altul. Mulți părinți fac asta și nu ascultă de Dumnezeu.",
      "Nicio legătură din Biblie nu este atât de apropiată ca cea dintre soț și soție. Bărbatul este capul nevestei - nu ca șeful unei organizații, care poate să nu aibă niciun interes pentru cei din ea, ci ca un cap față de trupul său, care se îngrijește de fiecare mădular.",
      "Nici tată și fiu, nici mamă și fiică nu sunt zugrăviți așa. Numai soțul și soția. Aceasta este apropierea pe care o vrea Dumnezeu.",
      "Chiar și dacă iubești slujirea mai mult, îți dărâmi căsnicia. Am spus că Domnul trebuie să fie cel dintâi - dar nu confunda pe Domnul cu lucrarea Domnului. Sunt oameni care își lasă soțiile deoparte spunând: fac lucrarea Domnului. Sfârșitul este că se dărâmă și căsnicia, și lucrarea.",
      "Gândește-te la o casă cu trei caturi. Temelia este dragostea desăvârșită a lui Dumnezeu arătată în Hristos. Catul întâi este umblarea ta personală cu Dumnezeu. Catul al doilea este legătura cu soțul sau soția. Catul al treilea este slujirea și biserica.",
      "Este scris despre un prezbiter: dacă cineva nu știe să-și cârmuiască bine casa lui, cum va îngriji de Biserica lui Dumnezeu? Deci casa vine întâi.",
      "Aici a năruit diavolul pe mulți: i-a făcut să se piardă în lucrare, iar copiii le-au ajuns nepocăiți și acasă se ceartă cu soțiile. Un asemenea om ar face bine să se lase de slujire și să stea acasă să-și clădească legăturile.",
      "Nu spun că soția ta trebuie să fie duhovnicească înainte de a-L sluji pe Domnul. Dar inima ta față de ea o poți stăpâni: să fie o dragoste desăvârșită, chiar dacă ea ar fi cel mai rău om din lume.",
      "Ce înseamnă să-ți iubești soția cum a iubit Hristos Biserica? Să fii gata să-i speli picioarele; să faci treburile murdare pentru ea. De câte ori iartă Hristos Biserica? De milioane de ori. De câte ori trebuie să ierte un soț? Tot așa.",
      "Iar femeilor li se spune să fie supuse bărbatului, cum este Biserica supusă lui Hristos - nu cu ceartă și în silă, ci cu bucurie, în toate. Afară de cazul în care ți se cere ceva împotriva Cuvântului lui Dumnezeu; atunci trebuie să asculți de Dumnezeu.",
      "Primejdia este că bărbații iau versetul acesta și-l folosesc ca pe un ciocan în capul soțiilor. Băgați de seamă: Scriptura nu-i spune bărbatului să obțină supunerea, ci să iubească. Iar soția citește ce are de făcut bărbatul în loc să citească ce are ea de făcut. Atunci este învălmășeală.",
      "Așa a fost și în Eden: Adam a arătat cu degetul spre Eva și, pe ocolite, spre Dumnezeu; Eva a arătat cu degetul spre șarpe. Cât timp vă învinuiți unul pe altul și îl învinuiți pe diavolul, veți fi dați afară din rai.",
      "Care a fost păcatul lui Adam? Nu și-a luat locul de cap al casei. Când Eva mânca din rod, trebuia să-i spună: nu este bine. A stat tăcut. Iar când soția nu-și ia locul de ajutor, ci hotărăște ca un conducător, deschide ușa Satanei.",
    ],
    wrongA: "Datoria mea este să-l fac pe celălalt să-și facă datoria.",
    right: "Datoria mea este numai partea mea: să iubesc sau să mă supun.",
    wrongB: "Lucrarea Domnului trece înaintea casei.",
    explanation:
      "Rânduiala este: Dumnezeu, apoi casa mea, apoi lucrarea lui Dumnezeu.",
    step: "Nu spune azi niciun cuvânt despre ce are de făcut celălalt; fă numai partea ta.",
    prayer: "Doamne, iartă-mă că am cerut de la celălalt. Ajută-mă să-mi fac partea mea.",
    journal: "Ce parte a ta ai lăsat nefăcută, uitându-te la partea celuilalt?",
    memory: "Bărbaților, iubiți-vă nevestele cum a iubit și Hristos Biserica.",
  }),
  make({
    id: "casa_l3",
    order: 3,
    title: "Creșterea copiilor în frica de Dumnezeu",
    refs: ["Maleahi 2:14-15", "Proverbe 22:6", "Efeseni 6:4", "Geneza 1:28"],
    ref: "Proverbe 22:6",
    hook: "Este ușor să ai copii. Să-i crești în frica de Dumnezeu este lucrarea unei vieți.",
    word: "Învață pe copil calea pe care trebuie s-o urmeze, și când va îmbătrâni nu se va abate de la ea.",
    truth: [
      "Cele dintâi cuvinte spuse de Dumnezeu lui Adam și Evei au fost: creșteți și înmulțiți-vă. Copiii lor trebuiau să poarte mai departe chipul lui Dumnezeu în neamul următor.",
      "În ultima pagină a Vechiului Testament, Domnul spune două lucruri. Cel dintâi: nevasta tinereții tale este tovarășa ta și soția ta prin legământ, și tu ai fost necredincios față de ea.",
      "Câți soți pot spune cinstit că soția le este cel mai bun prieten? Așa ar trebui să fie. Căsnicia este un legământ.",
      "Al doilea lucru: ce caută Dumnezeu prin unirea voastră? O sămânță dumnezeiască - copii care să ducă chipul Lui în neamul următor.",
      "Cum au ieșit copiii tăi arată cum ai trăit tu în casa ta. Este scris: învață pe copil calea pe care trebuie s-o urmeze, și la bătrânețe nu se va abate de la ea. Băgați de seamă: nu spune calea duhovnicească; spune calea pe care îl înveți tu.",
      "De ce aleargă copiii tăi după bani? Fiindcă așa i-ai crescut. De ce caută mărire în lume? Fiindcă asta ai vrut pentru ei. Poți să vorbești frumos duhovnicește și să fii prezbiter în biserică; dacă ei sunt lumești, ia tu vina asupra ta.",
      "Când iei vina asupra ta, Dumnezeu te poate ajuta - chiar și dacă ei au plecat deja de acasă.",
      "Nu spun că trebuie să ajungă lucrători cu vremea întreagă sau predicatori. Aceea este o chemare deosebită. Dar toți trebuie să fie născuți din nou și ucenici ai lui Isus, fie că sunt asistente, învățători sau ingineri.",
      "Copiii trebuie să vadă în părinți pentru ce trăiesc. Dacă ai trăit pentru bani, iar duminică ai vorbit frumos în biserică, nu-i învinovăți pe ei că fac ce te-au văzut făcând acasă.",
      "De ce s-a rătăcit Iuda? Probabil că a fost și el închinat Domnului la Templu, ca prunc. Dar apoi a fost crescut pentru lume. Poate că aducea de la școală un creion care nu era al lui, și părinții treceau cu vederea.",
      "Când treci cu vederea furtișagurile mici și minciunile mici, îl înveți să fie hoț și mincinos când va crește. Începe cu un creion și poate sfârși cu jefuirea unei bănci.",
      "Ce trebuie să-i spui atunci copilului? Dacă ți-a luat cineva creionul, asta nu-ți dă voie să iei al altuia. Mâine să-l dai înapoi și să spui: îmi pare rău că l-am luat.",
      "Sunt două lucruri pe care trebuie să le dăm copiilor: învățătură și disciplină. Învățătura nu înseamnă doar poveștile lui Iosif și ale lui David, ci și temeiurile dreptății, cinstirea părinților și a celor bătrâni. Cine le va învăța pe fetițe cuviința în îmbrăcăminte și purtare, dacă nu părinții? Altfel le vor învăța de la televizor.",
    ],
    wrongA: "Copiii se strică singuri, din pricina lumii de afară.",
    right: "Copiii merg pe calea pe care i-am învățat noi; vina o luăm noi și Dumnezeu ne ajută.",
    wrongB: "Scopul este ca ei să ajungă lucrători cu vremea întreagă.",
    explanation:
      "Dacă faci partea întâi a versetului, partea a doua vine de la sine.",
    step: "Îndreaptă azi un lucru mic la copilul tău, fără să-l treci cu vederea.",
    prayer: "Doamne, ia vina de la mine și dă-mi har să-i cresc în frica de Tine.",
    journal: "Ce văd copiii că este cel mai de preț pentru tine?",
    memory: "Învață pe copil calea pe care trebuie s-o urmeze.",
  }),
  make({
    id: "casa_l4",
    order: 4,
    title: "Cinstea, nuiaua și rugăciunea pe nume",
    refs: ["Efeseni 6:1-4", "Proverbe 22:15", "Faptele Apostolilor 5:29", "Geneza 9:22"],
    ref: "Efeseni 6:2",
    hook: "Dumnezeu le-a dat copiilor o singură poruncă. Nu zece. Una singură, și cu o făgăduință.",
    word: "Cinstește pe tatăl tău și pe mama ta - aceasta este cea dintâi poruncă însoțită de o făgăduință.",
    truth: [
      "Făgăduința este: ca să fii fericit și să trăiești multă vreme pe pământ. Nu este vorba ca ei să fie deștepți, sănătoși sau bogați; este vorba de bine duhovnicesc.",
      "Ce înseamnă să trăiască multă vreme? Isus a trăit treizeci și trei de ani. Înseamnă să împlinească planul lui Dumnezeu pentru viața lor, fie că mor la douăzeci sau la o sută de ani. Nu strica planul acela punându-le în cap alte prețuri.",
      "Părinților li se spune: nu întărâtați la mânie pe copiii voștri. Nu-i sâcâiți și nu-i certați zi și noapte, ci creșteți-i în învățătura și în mustrarea Domnului.",
      "Nebunia este lipită de inima copilului, dar nuiaua certării o dezlipește de el. Orice copil se naște așa, fie că este copilul unui necredincios, fie al unei perechi temătoare de Dumnezeu.",
      "Nebunia este în inimă, dar nuiaua se pune la spate și scoate nebunia din inimă. Aceasta este calea lui Dumnezeu; mai bine urmeaz-o decât învățăturile psihologilor de azi. Uitați-vă ce se întâmplă în Apus: copii care se răscoală împotriva părinților.",
      "Pentru ce să folosim nuiaua? Când nu ascultă de acea singură poruncă: să-și cinstească părinții.",
      "Dacă sparg din nebăgare de seamă un lucru scump, să-i pedepsești? Este fără minte. Dacă au făcut-o din răzvrătire și mânie, atunci da; dar nu pentru o întâmplare. Și noi facem greșeli fără să vrem.",
      "Dacă ești fiu sau fiică: cinstește-ți tatăl și mama, chiar de ai șaptezeci și cinci de ani. Cinstește-i până mori. Ascultarea ține cât timp ești în casa lor. Isus a ascultat de Iosif și de Maria cât a stat acasă; după botez, a cinstit-o pe mama Lui, dar la Cana i-a spus să nu se amestece în lucrarea Lui.",
      "Cât timp ești sub autoritatea lor, ascultă - afară de cazul când ți se cere să calci Cuvântul lui Dumnezeu; atunci trebuie să ascultăm mai mult de Dumnezeu decât de oameni.",
      "Cinstirea ține toată viața: să nu vorbești niciodată de rău despre ei. Vei vedea slăbiciuni la părinții tăi; acoperă-le.",
      "De ce a fost blestemat Ham? Fiindcă a văzut goliciunea tatălui său și, în loc s-o acopere, s-a dus și a spus altora. Roagă-te pentru ei, dar ține ascuns - afară de cazul când ceri sfat unui frate cu frica de Dumnezeu, ca să fii ajutat.",
      "Când începe îndreptarea? De îndată ce copilul înțelege ce îi spui, poate pe la un an, un an și jumătate. Cu cât începi mai devreme, cu atât termini mai devreme: pe la treisprezece ani n-ar mai trebui să fie nevoie de nuia.",
      "Cel mai mare lucru pe care îl puteți face ca soț și soție este să fiți uniți. Nu vă dezbinați la pedepsirea copiilor. Când părinții sunt dezbinați, diavolul intră prin crăpătura aceea. Și fiți pildă: nu le cereți ce nu faceți voi înșivă.",
      "Și încă ceva: rugați-vă pentru copiii voștri pe nume, în fiecare zi, pentru fiecare, toată viața voastră.",
    ],
    wrongA: "Trebuie să-mi ascult părinții toată viața, orice mi-ar cere.",
    right: "Îi asculți cât ești sub acoperișul lor și îi cinstești toată viața; dar mai presus de toți asculți de Dumnezeu.",
    wrongB: "Copiii trebuie pedepsiți și pentru greșelile din nebăgare de seamă.",
    explanation:
      "Cinstirea și unitatea părinților închid ușa prin care intră vrăjmașul în casă.",
    step: "Roagă-te azi, pe nume, pentru fiecare copil al tău - și pentru părinții tăi.",
    prayer: "Doamne, învață-mă să cinstesc și să cresc în frica de Tine tot ce mi-ai încredințat.",
    journal: "Ce slăbiciune a părinților tăi ai povestit-o altora?",
    memory: "Cinstește pe tatăl tău și pe mama ta.",
  }),
]
