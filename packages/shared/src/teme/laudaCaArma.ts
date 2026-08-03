import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 7 din docs/41-module-teme-poonen.md: "Lauda ca armă".
 * Temele 25-30.
 *
 * Sursa: Zac Poonen, "Basic Christian Teachings", capitolele 25-30 (cfcindia.com).
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

const COURSE_ID = "teme_c7_lauda"

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
        prompt: "Ce cânți tu, de obicei?",
        options: [
          { id: `${p}c1`, label: "Cântecul vechi: mă plâng." },
          { id: `${p}c2`, label: "Depinde cum îmi merge." },
          { id: `${p}c3`, label: "Vreau să învăț cântarea cea nouă." },
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
        "Cel ce aduce mulțumiri ca jertfă Mă proslăvește și își pregătește calea ca să-i arăt mântuirea Mea.",
        "Dumnezeu deschide ușa, dar noi Îi facem loc prin laudă.",
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

export const LAUDA_CA_ARMA_LESSONS: Lesson[] = [
  make({
    id: "lauda_l1",
    order: 1,
    title: "Credința și lauda",
    refs: ["Psalmul 106:11-12", "Psalmul 22:3", "Evrei 2:12-13", "Filipeni 2:14"],
    ref: "Psalmul 106:12",
    hook: "Când un om are credință, Îl va lăuda pe Dumnezeu. Când este în necredință, va cârti, se va plânge, va critica și va fi nemulțumit.",
    word: "Atunci au crezut în cuvintele Lui și au cântat laudele Lui.",
    truth: [
      "Israeliții au putut să-L laude pe Dumnezeu abia după ce au văzut pe egipteni înecați înaintea ochilor lor. Ei trăiau prin vedere: după ce se rezolva totul, după ce furtuna s-a potolit, atunci lăudau. Asta poate face oricine; și un păgân mulțumește când i s-au rezolvat toate problemele.",
      "Noi umblăm prin credință. Putem crede Cuvântul înainte de a vedea vrăjmașii înecați. Putem să-L lăudăm pe Dumnezeu cu vrăjmașii încă în fața noastră, cum spunea David: Tu îmi întinzi masă în fața potrivnicilor mei.",
      "Cu cât cârtești și te plângi mai mult, cu atât îți mărești singur necazul. Amărăciunea pe care o ții în inimă te distruge: îți distruge trupul, sufletul, duhul și legătura cu Dumnezeu.",
      "Dumnezeu este un Împărat mare și nu șade pe un scaun ieftin, de argint sau de aur; ar fi prea ieftin pentru El. Este scris: Tu ești sfânt, Tu care locuiești în mijlocul laudelor lui Israel - astăzi, ale Bisericii.",
      "Deci cum Îi facem lui Dumnezeu un tron? Prin laudele noastre. Lauda este tronul pe care șade Dumnezeu ca Împărat. De aceea cerul este un loc de laudă neîntreruptă.",
      "Vrei ca Dumnezeu să locuiască în inima ta? Pregătește-I un tron. Vrei să locuiască în casa ta? Pregătește-I un tron și acolo.",
      "Este vorba de duhul laudei, nu neapărat de cuvinte. Nu putem lăuda cu vorbe douăzeci și patru de ore. Dar putem scoate cu totul din viața noastră cârtirea, plângerea și nemulțumirea, pentru că ele dărâmă tronul pe care ar trebui să șadă Dumnezeu.",
      "Când cârtești, când te mânii și te enervezi, pregătești de fapt un tron pentru Satana. Sunt două tronuri pe care le poți face în viața și în casa ta: unul al laudei și unul al nemulțumirii.",
    ],
    wrongA: "Voi lăuda după ce Dumnezeu îmi rezolvă problema.",
    right: "Lauda vine din credință și merge înaintea izbăvirii, nu după ea.",
    wrongB: "Lauda înseamnă să spui cuvinte frumoase la adunare.",
    explanation:
      "Sub Vechiul Legământ se lăuda prin vedere. Noi umblăm prin credință și putem lăuda în mijlocul necazului, crezând că Dumnezeu este pe tron.",
    step: "Alege un lucru de care te-ai plâns azi și mulțumește-I lui Dumnezeu pentru el, cu inima.",
    prayer: "Doamne, iartă-mi cârtirea. Îți pregătesc un tron de laudă în inima și în casa mea.",
    journal: "Ce plângere repeți de săptămâni întregi?",
    memory: "Atunci au crezut în cuvintele Lui și au cântat laudele Lui.",
  }),
  make({
    id: "lauda_l2",
    order: 2,
    title: "Răstignirea și lauda",
    refs: ["Psalmul 22:22", "Psalmul 118:24", "Romani 6:6", "Galateni 2:20"],
    ref: "Psalmul 118:24",
    hook: "Răstignirea lui Isus a fost cel mai mare rău săvârșit vreodată pe pământ - și cel mai bun lucru care s-a întâmplat vreodată pe pământ.",
    word: "Aceasta este ziua pe care a făcut-o Domnul; să ne bucurăm și să ne veselim în ea.",
    truth: [
      "Lauda nu este o tehnică. Dacă o încerci ca tehnică, îți spun de pe acum că va da greș. Tehnica este ceva pe care îl folosim egoist, ca pe o descântare. Nu vorbesc despre cuvinte, ci despre lauda care vine dintr-o inimă care crede în puterea, în dragostea și în înțelepciunea lui Dumnezeu.",
      "Psalmul 22 este un psalm al crucii. Începe cu: Dumnezeul Meu, Dumnezeul Meu, pentru ce M-ai părăsit? La versetul 3 vorbește despre Dumnezeu așezat pe laudele poporului Său, iar la versetul 16 despre mâinile și picioarele străpunse.",
      "Și tocmai din poziția aceea răstignită, Isus îi cheamă pe frații Lui mai mici - pe tine și pe mine - să I Se alăture în a-I pregăti Tatălui un tron de laudă.",
      "Dacă cel mai mare rău făcut vreodată a fost întors de Dumnezeu în cel mai mare bine, spune-mi: ce ți-ar putea face ție oamenii, ca Dumnezeu să nu poată întoarce spre bine? Totul este mai mic decât aceea.",
      "Ce făceau tâlharii când atârnau pe cruce? Nu lăudau pe Dumnezeu; blestemau. Isus, dimpotrivă, Și-a întins palmele și Și-a așezat picioarele ca să poată fi bătute cuiele mai ușor. Era fericit. A suferit? Da, a simțit durerea la fel ca noi. Dar era fericit că făcea voia Tatălui Său.",
      "Mai știi pe cineva care a fost răstignit pe aceeași cruce cu Isus? Nu tâlharii, de o parte și de alta. Scriptura spune: omul nostru cel vechi a fost răstignit împreună cu El; și: am fost răstignit împreună cu Hristos.",
      "Lauda este un duh. Nu o poți aprinde duminică dimineața pentru două ore și stinge când ajungi acasă. Dacă zici aleluia în adunare și după-amiaza țipi la soția ta, nu ai duhul laudei; ai o formă.",
      "Sunt oameni care spun că Îl iubesc pe Isus în același duh în care L-a sărutat Iuda în Ghetsimani.",
      "Este ușor să spui: aceasta este ziua pe care a făcut-o Domnul, când primești o mărire de salariu sau o casă mai bună. Să o spui în ziua în care ești răstignit cere credință. Care este ziua pe care nu a făcut-o Domnul? Diavolul nu face nicio zi.",
    ],
    wrongA: "Lauda este o metodă care funcționează dacă o repeți.",
    right: "Lauda adevărată izvorăște dintr-o viață răstignită împreună cu Hristos.",
    wrongB: "Poți lăuda duminică și trăi altfel în restul săptămânii.",
    explanation:
      "În amândouă psalmii crucii, lauda apare în mijlocul răstignirii. Numai murind față de viața mea egoistă pot intra în duhul laudei.",
    step: "Spune-I lui Dumnezeu, în ziua ta cea mai grea: aceasta este ziua pe care ai făcut-o Tu.",
    prayer: "Doamne, am fost răstignit împreună cu Tine. Nu vreau o laudă de suprafață, ci una din inimă.",
    journal: "În ce zi ți-a fost imposibil să mulțumești? Ce ai fi putut spune atunci?",
    memory: "Aceasta este ziua pe care a făcut-o Domnul; să ne bucurăm și să ne veselim în ea.",
  }),
  make({
    id: "lauda_l3",
    order: 3,
    title: "Lauda îl scoate afară pe Satana",
    refs: ["Isaia 61:1-3", "Psalmul 8:2", "Matei 21:15-16", "1 Ioan 2:6"],
    ref: "Isaia 61:3",
    hook: "Duhul de apăsare nu este de la Dumnezeu. Este o haină pe care încearcă să ți-o pună diavolul. Scutur-o de pe tine.",
    word: "Să le dau o cunună în loc de cenușă, un untdelemn de bucurie în locul plânsului, o haină de laudă în locul unui duh mâhnit.",
    truth: [
      "Isus a venit să dea drumul celor robiți și să dea haina de laudă în locul duhului de apăsare. Nu doar scoate afară duhul acela și te lasă gol - te și îmbracă cu laudă, ca să nu se întoarcă.",
      "Nu este voia lui Dumnezeu ca noi să fim deznădăjduiți sau prost dispuși. Poate veni ca o ispită; noi trebuie să o scuturăm. Spune: în Numele lui Isus, mă împotrivesc ție, Satano; sângele lui Isus m-a curățat, nu mă mai poți învinui.",
      "Este scris: cine zice că rămâne în El trebuie să trăiască așa cum a trăit Isus. A fost Isus vreodată deznădăjduit sau prost dispus? Niciodată. Dar în fiecare zi Își lua crucea.",
      "Când copiii strigau în Templu: Osana Fiului lui David, preoții cei mai de seamă nu au putut suferi zgomotul. Ei credeau că singurul fel de a te închina este în tăcere și cu solemnitate, ca la o înmormântare. Sunt și azi oameni care gândesc la fel.",
      "Cred din toată inima că există și o laudă în tăcere. Dar există și laudă cu strigăte de bucurie: strigați de bucurie către Domnul. Ai văzut cum se ridică un stadion când echipa a câștigat? Atunci de ce nu sunt creștinii tulburați de bucurie că Isus le-a iertat păcatele și l-a biruit pe diavol?",
      "Isus a răspuns criticilor cu Psalmul 8: din gura pruncilor și a copiilor de țâță Ți-ai scos o întăritură, ca să amuțești pe vrăjmaș. Prin laudă se astupă gura diavolului.",
      "Diavolul urăște lauda. De aceea îi face pe oameni posomorâți și cârtitori: așa poate domni în viețile și în casele lor. Nu poate sta în cer, unde toți îngerii strigă laudă; și nu poate sta într-o casă în care se laudă Dumnezeu.",
      "Satana izbutește în două feluri: ori oprește cu totul lauda, ori, unde nu poate, îi face pe oameni nesinceri, ca să spună din gură ce nu este în inimă.",
      "Israeliții au strigat tare la vițelul de aur și l-au numit Domnul; Moise și Iosua au auzit de departe. Dar nu era laudă adevărată: era curvie în mijlocul ei.",
    ],
    wrongA: "Închinarea adevărată este numai în tăcere și cu solemnitate.",
    right: "Și lauda în tăcere, și strigătul de bucurie sunt primite; ce contează este sinceritatea inimii.",
    wrongB: "Deznădejdea este o încercare pe care Dumnezeu ne-o trimite.",
    explanation:
      "Lauda sinceră, dintr-o viață sfântă, are putere să astupe gura vrăjmașului. Lauda goală nu are nicio putere.",
    step: "Când vine apăsarea azi, spune cu glas tare o laudă și nu-i da loc.",
    prayer: "Doamne, ia de pe mine haina de întristare și îmbracă-mă cu haina de laudă.",
    journal: "Unde a intrat posomorârea în casa ta și a alungat bucuria?",
    memory: "O haină de laudă în locul unui duh mâhnit.",
  }),
  make({
    id: "lauda_l4",
    order: 4,
    title: "Cântarea cea nouă",
    refs: ["Apocalipsa 14:3", "1 Tesaloniceni 5:18", "Efeseni 5:20", "1 Timotei 2:1"],
    ref: "1 Tesaloniceni 5:18",
    hook: "Dacă te-ai hotărât să te muți în Franța pentru tot restul vieții, ce ai face înainte de plecare? Ai învăța franceză. Limba cerului este lauda. Este bine să o învățăm de aici.",
    word: "Mulțumiți lui Dumnezeu pentru toate lucrurile; căci aceasta este voia lui Dumnezeu, în Hristos Isus, cu privire la voi.",
    truth: [
      "În Apocalipsa sunt șapte priviri spre cer. În fiecare dintre ele, oamenii și îngerii Îl laudă pe Dumnezeu, și de multe ori se spune limpede: cu glas tare.",
      "Nu este niciun înger așezat acolo posomorât sau îngrijorat de ce se va întâmpla mâine cu lumea. Toți Îl laudă pe Dumnezeu, pentru că știu că El este pe tron. Îngeri posomorâți vei găsi doar în iad.",
      "Cu cât ești mai posomorât, cu atât aduci duhul iadului în viața ta. Cu cât ești mai vesel, recunoscând că Dumnezeu este pe tron, cu atât aduci duhul cerului în viața ta, în casa ta și în adunarea ta.",
      "Poți spune: când ajung în cer, o să încep să laud. Atunci de ce a venit Duhul Sfânt? A venit ca să ne pregătească pentru cer și ca să ne învețe limba cerului înainte să ajungem acolo.",
      "Despre cei o sută patruzeci și patru de mii se spune că au cântat o cântare nouă pe care nimeni altcineva nu o putea învăța - și au învățat-o cât erau pe pământ.",
      "Care este cântarea cea veche? Cea pe care o cântă toată lumea: cârtirea și plângerea împotriva oamenilor și a împrejurărilor. Strofa întâi, strofa a doua, strofa a treia - toate la fel: cineva a făcut ceva, ceva a mers rău, cutare m-a înșelat, vremurile sunt grele.",
      "În Noul Testament ni se spune să mulțumim întotdeauna. Pentru câte lucruri să mulțumești? Pentru toate. Cum poți mulțumi pentru ceva ce nu pare deloc bun? Pentru că crezi că Dumnezeu face ca toate lucrurile să lucreze împreună spre binele tău.",
      "Este ca un filtru de apă: orice apă murdară ai turna în el, la capăt iese apă curată. Așa lucrează făgăduința că toate lucrurile lucrează spre bine.",
      "Trei locuri ne arată cât de larg este: în toate împrejurările, în orice vreme, pentru toate lucrurile și pentru toți oamenii.",
      "Și tocmai de aceea cântarea cea nouă se învață numai pe pământ: în cer nu mai sunt împrejurări grele, nici oameni greu de suportat, nici încercări.",
    ],
    wrongA: "Voi învăța să laud când voi ajunge în cer.",
    right: "Cântarea cea nouă se poate învăța numai aici, în împrejurări grele și cu oameni grei.",
    wrongB: "Mulțumim pentru lucrurile bune și tăcem la cele rele.",
    explanation:
      "Duhul Sfânt a venit să aducă în inimile, în casele și în adunările noastre atmosfera cerului, care este atmosfera laudei.",
    step: "Numește azi trei lucruri grele și mulțumește-I lui Dumnezeu pentru fiecare.",
    prayer: "Doamne, învață-mă limba cerului acum, cât mai sunt aici, unde este greu.",
    journal: "Care este strofa ta preferată din cântarea cea veche?",
    memory: "Mulțumiți lui Dumnezeu pentru toate lucrurile.",
  }),
  make({
    id: "lauda_l5",
    order: 5,
    title: "Lauda aduce izbăvire",
    refs: ["Psalmul 50:23", "2 Cronici 20:6-12", "2 Cronici 20:22", "Iacov 1:5"],
    ref: "Psalmul 50:23",
    hook: "Dumnezeu va face izbăvirea, dar nu o poate face până nu Îi deschizi calea. Iar calea se deschide prin laudă.",
    word: "Cine aduce mulțumiri ca jertfă, acela Mă proslăvește, și celui ce veghează asupra căii lui, aceluia îi voi arăta mântuirea lui Dumnezeu.",
    truth: [
      "Dumnezeu îngăduie ca Satana să-Și năcăjească copiii. De ce? Focul este primejdios, dar focul curăță aurul. Așa folosește Dumnezeu încercările ca să ne curețe - dar trebuie să răspundem cum se cuvine.",
      "Felul potrivit de a răspunde, dacă ai credință, este duhul laudei: Doamne, sufer, dar nu-mi pierd credința. Tu ești pe tron, diavolul a fost învins la cruce, păcatele mele sunt iertate, și Tu faci ca toate să lucreze spre binele meu.",
      "Sunt multe situații din care am fi fost izbăviți dacă L-am fi lăudat pe Dumnezeu în loc să ne plângem de oameni și de diavol. Lauda este semnul credinței.",
      "Numai rugăciunea nu ne scoate din orice situație. Este bine să te rogi la strâmtoare, dar pe lângă rugăciune trebuie să învățăm să lăudăm. Ne rugăm până ajungem în locul în care nu mai trebuie să ne rugăm: avem mărturia în inimă că Dumnezeu ne-a auzit. Atunci ne oprim din cerut și începem să mulțumim.",
      "Când Iosafat a fost înconjurat de o mulțime de vrăjmași, a chemat tot Iuda la post și la rugăciune. În rugăciunea lui a mărturisit trei lucruri: neputința, lipsa de înțelepciune și credința. Este ușor să spunem primele două, dar dacă ne oprim acolo nu se întâmplă nimic.",
      "Rugăciunea lui este un tipar: întâi a lăudat suveranitatea lui Dumnezeu; apoi și-a adus aminte ce a făcut Dumnezeu în trecut; apoi I-a amintit făgăduința din Cuvânt; apoi că noi suntem moștenirea Lui, cumpărată; apoi că nu are putere; apoi că nu are înțelepciune; și la urmă: dar ochii noștri sunt îndreptați spre Tine.",
      "Când ești la strâmtoare, uită-te înapoi peste viața ta și adu-ți aminte de câte ori ai crezut că nu mai este ieșire și Dumnezeu a făcut o cale. Asta aprinde credința.",
      "Este bine să știi pe de rost făgăduințele Scripturii, ca să le poți spune în rugăciune. Sunt ca lemnele puse pe foc: fără ele, focul credinței arde slab.",
      "Au ieșit lăudându-L pe Domnul, fără arcuri și săgeți, cu un cor înaintea oștirii. Și când au început să cânte și să laude, Domnul a deschis ușa izbăvirii, iar vrăjmașii au fost zdrobiți. Ba mai mult, Israel s-a îmbogățit cu prada lor.",
    ],
    wrongA: "Este de ajuns să mărturisesc că sunt slab și neputincios.",
    right: "Neputință plus încredere: ochii noștri sunt îndreptați spre Tine.",
    wrongB: "Rugăciunea singură este de ajuns; lauda vine la sfârșit.",
    explanation:
      "A spune doar că ești bun de nimic nu este smerenie, ci necredință. Iosafat a mărturisit neputința și apoi a crezut, și atunci a lucrat Dumnezeu.",
    step: "Ia o problemă nerezolvată și roagă-te după tiparul lui Iosafat, terminând cu mulțumire.",
    prayer: "Doamne, nu am nici putere, nici înțelepciune, dar ochii mei sunt îndreptați spre Tine. Îți mulțumesc dinainte.",
    journal: "Amintește-ți trei izbăviri din trecut. Ce îți spun ele despre ziua de azi?",
    memory: "Cine aduce mulțumiri ca jertfă, acela Mă proslăvește.",
  }),
  make({
    id: "lauda_l6",
    order: 6,
    title: "Lauda deschide uși închise",
    refs: ["2 Corinteni 12:9", "2 Cronici 20:15-17", "Iona 2:9-10", "Faptele Apostolilor 16:25-26"],
    ref: "2 Corinteni 12:9",
    hook: "Când ești biruit de păcat, spui că este pentru că ești slab. Nu, prietene. Este pentru că ești tare.",
    word: "Puterea Mea în slăbiciune este făcută desăvârșită.",
    truth: [
      "Dumnezeu îngăduie să ajungem în situații în care ne vedem cu totul neputincioși. Când a vorbit despre rugăciune, Isus a înfățișat Biserica precum o văduvă săracă și neputincioasă, năcăjită de un potrivnic. Așa suntem.",
      "Numai oamenii slabi pot lăuda pe Dumnezeu. Cei tari se laudă pe ei înșiși. Omul tare are păreri tari, spune vorbe înțepătoare și judecă repede pe alții.",
      "Du-te într-un spital și uită-te la un om cu tuburi în gură și în nas, care abia poate vorbi. Acela este un om slab. Nu-l vezi criticând pe nimeni. Abia când se face bine începe să dea vina pe doctori, pe rude și pe vrăjmași.",
      "Când te cerți și te iei la dispută cu oamenii, ești slab sau tare? Ești tare - iar oamenii tari sunt ținte ușoare pentru Satana. Așa a câștigat lupta cu Eva.",
      "De aceea a așteptat Isus când a auzit că Lazar este bolnav. Cât era bolnav, Lazar mai era încă puțin tare. Când a slăbit de tot și a murit, atunci l-a înviat Dumnezeu.",
      "Sunt trei feluri de credincioși. Cei care au multă încredere în ei înșiși - nu pot face nicio lucrare veșnică pentru Dumnezeu. Cei care nu au încredere nici în ei, nici în Dumnezeu - și aceștia sunt nefolositori. Și cei care nu au nicio încredere în ei înșiși, dar au toată încrederea în Dumnezeu - numai aceștia Îi sunt de folos.",
      "Când au spus: nu avem putere, nu știm ce să facem, dar ochii noștri sunt îndreptați spre Tine, atunci a vorbit Dumnezeu prin prooroc: lupta nu este a voastră, ci a lui Dumnezeu; nu voi veți lupta, ci stați pe loc și veți vedea izbăvirea Domnului.",
      "Iona a stat trei zile și trei nopți în pântecele peștelui zbătându-se. Abia după aceea a început să se roage. Așa facem și noi: întâi încercăm noi, săptămâni întregi, și abia când nu mai merge nimic, ne rugăm.",
      "S-a rugat, s-a rugat, și tot nu s-a întâmplat nimic. Apoi a spus: cu glas de mulțumire Îți voi aduce jertfe. Și abia atunci a poruncit Domnul peștelui să-l verse pe uscat.",
      "Pavel și Sila, închiși la temniță, în loc să doarmă sau să cârtească, lăudau pe Domnul. Și pe când cântau, s-au deschis ușile temniței.",
      "Cheia gurii oricărui pește este în mâna lui Dumnezeu, și cheia oricărei uși de temniță. Nu este ușă pe care Domnul să nu o poată deschide.",
    ],
    wrongA: "Sunt biruit pentru că sunt prea slab.",
    right: "Ești biruit pentru că ești încă tare în tine însuți; puterea lui Dumnezeu se desăvârșește în slăbiciune.",
    wrongB: "Să spun că sunt bun de nimic este smerenie.",
    explanation:
      "Iona a fost scos când a început să mulțumească. Ușile temniței s-au deschis când Pavel și Sila cântau. Lauda deschide ușa izbăvirii.",
    step: "Recunoaște-ți neputința într-un lucru anume și spune-I lui Dumnezeu că aștepți izbăvirea de la El.",
    prayer: "Doamne, mă las slab în mâinile Tale. Îți mulțumesc chiar acum, înainte să văd ușa deschisă.",
    journal: "Unde te-ai ținut tare și de aceea ai fost biruit?",
    memory: "Puterea Mea în slăbiciune este făcută desăvârșită.",
  }),
]
