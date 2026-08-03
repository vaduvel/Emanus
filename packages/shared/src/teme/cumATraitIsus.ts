import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 9 din docs/41-module-teme-poonen.md: "Cum a trăit Isus".
 * Temele 35-42.
 *
 * Sursa: Zac Poonen, "Basic Christian Teachings", capitolele 35-42 (cfcindia.com).
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

const COURSE_ID = "teme_c9_cum_a_trait"

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
        prompt: "Cum este la tine?",
        options: [
          { id: `${p}c1`, label: "Nu m-am gândit așa niciodată." },
          { id: `${p}c2`, label: "Știu, dar nu trăiesc așa." },
          { id: `${p}c3`, label: "Vreau să calc pe urmele Lui." },
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
        "Duhul Sfânt nu-ți spune doar: fii ca El. Îți spune: lasă-Mă să te fac ca El.",
        "Din slavă în slavă, El ne preface în același chip.",
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

export const CUM_A_TRAIT_ISUS_LESSONS: Lesson[] = [
  make({
    id: "isus_l1",
    order: 1,
    title: "Isus a biruit păcatul",
    refs: ["Evrei 4:15", "Iacov 1:2", "Ioan 6:38", "1 Petru 4:1"],
    ref: "Iacov 1:2",
    hook: "Ispita nu este menită să ne ducă în păcat. Dimpotrivă: este menită să ne ducă la sfințenie.",
    word: "Frații mei, să priviți ca o mare bucurie când treceți prin felurite încercări.",
    truth: [
      "Noi nu suntem sfinți prin fire. Când ne naștem, suntem prin fire păcătoși. Chiar și Adam, când a fost făcut, nu era prin fire sfânt, ci nevinovat. Trebuia să-L aleagă pe Dumnezeu și să spună nu ispitei ca să devină sfânt.",
      "Sfințenia este ca sănătatea duhovnicească. De ce se duc oamenii la sală și ridică greutăți? Fiindcă știu că un trup sănătos vine numai dacă fiecare mușchi este pus la încercare, împotriva unei împotriviri.",
      "Un om căruia mușchii nu-i sunt puși la încercare rămâne un om moale și gras. La fel este și duhovnicește: avem nevoie de ceva care să ni se împotrivească și de biruință asupra lui.",
      "De aceea spune Scriptura: priviți ca o mare bucurie când treceți prin felurite încercări. Cine spune: nu vreau să dau ochii cu ispita, nu va fi niciodată un creștin voinic.",
      "Uimitor este că și Isus, cel fără păcat, a trebuit să fie ispitit. A fost ispitit în toate lucrurile ca și noi, dar n-a păcătuit niciodată.",
      "Dacă ar fi biruit ispita ca Dumnezeu, nu ar fi nimic mare în asta - și Scriptura spune că Dumnezeu nu poate fi ispitit. Ar fi ca un tată care conduce mașina cu optzeci de kilometri pe oră și-i spune băiatului: aleargă după mine.",
      "Adevărul este că a dat ochii cu ispita ca om și a biruit prin puterea Duhului Sfânt. Aceeași putere ne-o oferă și nouă. L-a biruit pe Satana spunându-i Cuvântul lui Dumnezeu; așa poți și tu.",
      "Care este miezul păcatului? Să-ți faci voia ta. Atunci care este miezul sfințeniei? Să te lepezi de voia ta și să faci voia lui Dumnezeu. Isus a spus: am venit din cer nu ca să fac voia Mea, ci voia Celui ce M-a trimis.",
      "În Ghetsimani a spus: nu cum voiesc Eu, ci cum voiești Tu. Și-a adus voia omenească ca jertfă neîntreruptă. Asta înseamnă că Isus n-a păcătuit niciodată: niciodată nu Și-a făcut voia Lui.",
      "Firea omenească este tocmai pe dos. Se vede la un copil mic: vrea să facă ce vrea el. Încăpățânarea aceea este păcat.",
    ],
    wrongA: "Cel mai bine este să nu dau ochii cu nicio ispită.",
    right: "Sfințenia crește tocmai prin a spune nu ispitei, în puterea Duhului.",
    wrongB: "Isus a biruit pentru că era Dumnezeu și nu putea păcătui.",
    explanation:
      "Isus este înaintemergătorul nostru: a alergat înaintea noastră ca om și ne spune: urmează-Mă.",
    step: "La cea dintâi ispită de azi, spune cu glas tare un cuvânt din Scriptură și nu discuta cu ea.",
    prayer: "Doamne, nu vreau să-mi fac voia mea. Dă-mi putere prin Duhul Tău să spun nu.",
    journal: "În ce loc ai crezut că ești prea slab ca să birui?",
    memory: "Să priviți ca o mare bucurie când treceți prin felurite încercări.",
  }),
  make({
    id: "isus_l2",
    order: 2,
    title: "Isus a făcut voia Tatălui",
    refs: ["Ioan 14:12", "Romani 8:3-4", "Evrei 6:1", "2 Corinteni 3:18"],
    ref: "Ioan 14:12",
    hook: "Isus a spus: cine crede în Mine va face și el lucrările pe care le fac Eu. Ori a spus adevărul, ori a mințit. Eu cred că a spus adevărul.",
    word: "Cine crede în Mine va face și el lucrările pe care le fac Eu.",
    truth: [
      "Ce lucrări a făcut Isus? Ne gândim îndată la învierea morților, la hrănirea celor cinci mii, la umblarea pe mare. Dar a mai făcut și altele: Și-a pus brațul pe umărul unui lepros, a mângâiat oameni căzuți în păcat, a iertat o femeie prinsă în preacurvie, i-a iertat pe cei care Îl numeau Beelzebul.",
      "Toate lucrările Lui se pot cuprinde într-o singură propoziție: a făcut voia Tatălui Său. Dacă Tatăl voia să umble pe apă, umbla pe apă. Dacă Tatăl voia să spele picioarele ucenicilor, le spăla.",
      "Deci când spune că putem face aceleași lucrări, înseamnă că putem împlini tot ce este voia Tatălui pentru noi. Dacă nu este voia Tatălui să înviezi morții, nu vei învia morți.",
      "Treizeci de ani Isus n-a hrănit cinci mii, n-a umblat pe apă și n-a vindecat pe nimeni - fiindcă nu era voia Tatălui. Și totuși în acei treizeci de ani a făcut voia Tatălui.",
      "Când au fost umpluți cu Duhul Sfânt la Rusalii, ucenicii au primit putere să facă aceleași lucrări de ascultare pe care le făcea Isus.",
      "Ce înseamnă lucrări mai mari? Înseamnă aducerea altora în viața aceasta. După trei ani și jumătate, Isus nu putuse face nici măcar pe doi dintre ucenici să fie una; toți se întrebau cine este cel mai mare. Astăzi, dacă doi oameni ajung una, este o lucrare mai mare - nu fiindcă noi am fi mai mari, ci fiindcă Duhul Sfânt locuiește acum în inimi.",
      "Ce nu putea face Legea, a făcut Dumnezeu: Și-a trimis Fiul într-o fire asemănătoare cu a păcatului, ca porunca Legii să fie împlinită în noi, care umblăm după Duhul.",
      "Dumnezeu nu ne-a făgăduit că vom fi fără păcat pe pământ. Nimeni n-a trăit așa în afară de Isus. Dar suntem chemați să mergem spre desăvârșire.",
      "Vorbirea Lui era cu totul curată. Niciun cuvânt murdar, niciun cuvânt deșert, nicio minciună. Nu-L puteai atrage în vorbe fără rost, nici în discuții despre răul altora.",
      "Folosea lucrurile materiale, dar nu le iubea. Sfințenia Lui era lăuntrică, nu se arăta prin mâncare deosebită, prin haine deosebite sau prin retragerea în pustie. Trăia între oameni, muncea, se îmbrăca și mânca la fel ca ei - și totuși în curăție.",
    ],
    wrongA: "Lucrările lui Isus înseamnă minuni spectaculoase.",
    right: "Lucrările lui Isus au fost lucrări de ascultare de voia Tatălui.",
    wrongB: "Putem ajunge fără păcat aici, pe pământ.",
    explanation:
      "Fiecare lucru care este în voia lui Dumnezeu pentru viața ta se poate face, prin puterea Duhului Sfânt.",
    step: "Întreabă-L azi pe Dumnezeu care este un singur lucru pe care vrea să-l faci - și fă-l.",
    prayer: "Doamne, nu vreau lucrări mari, ci ascultare. Arată-mi ce vrei Tu și dă-mi putere.",
    journal: "Ce faci pentru Dumnezeu fără să fi întrebat dacă El ți-a cerut?",
    memory: "Cine crede în Mine va face și el lucrările pe care le fac Eu.",
  }),
  make({
    id: "isus_l3",
    order: 3,
    title: "Isus i-a prețuit pe toți oamenii",
    refs: ["Ioan 1:14", "Psalmul 51:6", "Iacov 3:9", "Marcu 8:36"],
    ref: "Ioan 1:14",
    hook: "Sfințenia adevărată este dragoste desăvârșită. Dacă ai sfințenie fără dragoste, nu este sfințenia lui Hristos, ci a fariseilor.",
    word: "Plin de har și de adevăr.",
    truth: [
      "Mulți își închipuie sfințenia ca pe ceva uscat, țepăn și respingător. Poate fi o viață rânduită: îți plătești impozitele, te rogi, citești Biblia, dai zeciuială - și ești ca un schelet.",
      "Un schelet nu atrage pe nimeni. Dacă ai vedea noaptea, pe o stradă întunecată, un schelet venind spre tine, ai fugi. Așa erau fariseii; oamenilor le venea să fugă de ei.",
      "Dar nici fără oase nu se poate. Fără oase te-ai prăbuși ca o meduză. Unii sunt așa duhovnicește: se strecoară prin orice deschizătură, nu au încredințări, nu stau pentru adevăr. Nici asta nu este voia lui Dumnezeu.",
      "Ce face trupul frumos? Oasele acoperite cu carne. Așa și aici: nu numai adevărul, ci harul așezat peste adevăr face cuvintele frumoase.",
      "Isus nu era nici schelet, nici meduză. Avea tot adevărul și stătea pentru tot ce stătea Legea lui Dumnezeu, mai mult decât fariseii - dar oasele erau acoperite cu carne.",
      "Un om poate face fapte de dragoste fără să aibă dragoste în inimă; poate fi doar o purtare din afară, ca să impresioneze. Dragostea lui Isus venea din adâncul inimii.",
      "Gândurile și atitudinile noastre față de oameni răspândesc un miros pe care ceilalți îl simt. Cuvintele și faptele de dragoste nu prețuiesc nimic dacă gândurile față de acel om rămân critice și egoiste. Dumnezeu dorește adevărul în adâncul lăuntric.",
      "Dacă iubești un om, îl vei prețui. Isus a pus un preț foarte mare pe orice om. Nu conta dacă era învățat, deștept sau bogat. Este ușor să prețuiești oameni culți și bogați.",
      "Dar cerșetorul, cu hainele lui rupte, este și el făcut după chipul lui Dumnezeu? Dacă da, îl vei cinsti. Isus n-a făcut deosebire între bogat și sărac, învățat și neînvățat, om cinstit și păcătos.",
      "A vindecat mulți bolnavi care nu erau deloc interesați să primească altceva de la El. Așa era bunătatea Lui.",
      "Pentru că era gata să moară pentru ei, avea dreptul să predice împotriva păcatului cu atâta tărie. Le-a spus fariseilor: pui de năpârți. Poți spune și tu așa, dacă îi iubești atât cât să mori pentru ei; altfel, nu.",
    ],
    wrongA: "Sfințenia înseamnă să te ții departe de oameni păcătoși.",
    right: "Sfințenia adevărată este dragoste desăvârșită: adevărul acoperit cu har.",
    wrongB: "Dragostea înseamnă să nu spui niciodată lucruri dure.",
    explanation:
      "Nu avem dreptul să predicăm împotriva păcatului dacă nu suntem gata să facem ceva ca să-i scăpăm pe oameni de păcatul lor.",
    step: "Cinstește azi, cu vorba și cu privirea, un om pe care lumea îl trece cu vederea.",
    prayer: "Doamne, umple-mi inima cu dragostea Ta pentru oameni, nu doar gura cu vorbe.",
    journal: "Pe cine ai trecut cu vederea fiindcă nu-ți aduce niciun folos?",
    memory: "Plin de har și de adevăr.",
  }),
  make({
    id: "isus_l4",
    order: 4,
    title: "Oamenii înaintea lucrurilor",
    refs: ["Romani 5:5", "Tefania 3:17", "Marcu 12:37", "Luca 7:12-15"],
    ref: "Romani 5:5",
    hook: "Dumnezeu ne-a dat lucrurile ca să le folosim și oamenii ca să-i iubim. Lumea de azi iubește lucrurile și folosește oamenii. Este pe dos.",
    word: "Dragostea lui Dumnezeu a fost turnată în inimile noastre prin Duhul Sfânt care ne-a fost dat.",
    truth: [
      "Câți creștini ai întâlnit despre care, uitându-te la viața lor, ai putea spune că ei cred cu adevărat că Dumnezeu este mai important decât banii? Foarte, foarte puțini.",
      "Când banii ajung mai importanți decât Dumnezeu, ajung mai importanți și decât oamenii.",
      "Lumea este plină de fabrici și de birouri în care oamenii sunt folosiți pentru scopurile altora. Dar același lucru se întâmplă și în multe lucrări și biserici, unde conducători se folosesc de oameni ca să se înalțe pe ei înșiși.",
      "Iuda era casierul cetei. Banii pe care îi primeau nu veneau pentru Iuda, ci pentru lucrarea lui Isus. Iuda fura din ei. Și totuși Isus îl iubea pe Iuda. Era gata să piardă banii aceia, dacă ar fi putut câștiga sufletul lui.",
      "Care este dovada că ai fost umplut cu Duhul Sfânt? Dragostea lui Dumnezeu turnată în inimă prin Duhul Sfânt. Un semn al umplerii este că inima ta este plină de dragoste pentru oameni și ești așezat cu capul în sus, nu pe dos.",
      "Închipuie-ți că în atelierul de tâmplărie intră un copil din vecini și strică ceva scump pe care tocmai îl făcuse Isus. Crezi că ar fi strigat la el și l-ar fi alungat? Cred că l-ar fi luat în brațe și i-ar fi spus: nu-i nimic, fiule, mai fac unul.",
      "Este scris că Dumnezeu Se bucură de poporul Lui cu cântece de veselie. Se bucură de oameni nedesăvârșiți, care și-au arătat dorința după El cu toate lipsurile lor. Așa Se uită și Isus la ucenici.",
      "Norodul cel mult Îl asculta cu plăcere. Oamenii simțeau mireasma care ieșea din duhul Lui.",
      "Ne-am folosit multă vreme închipuirea pentru lucruri rele. Folosește-o acum ca să te pui în locul celor care suferă: în coliba aceea, lângă soțul acela greu, cu copilul acela problemă. Aceasta ar fi dovada dragostei tale.",
      "Când a văzut o văduvă la înmormântarea singurului ei fiu, a oprit tot alaiul și i-a dat băiatul înapoi. Minunea nu era ca să-Și arate puterea, ci dragostea lui Dumnezeu. Fiecare minune a lui Isus a izvorât din îndurare.",
      "Nu S-a supărat niciodată de ce I-au făcut sau I-au spus oamenii, nici când n-au făcut pentru El ce ar fi trebuit - fiindcă nu venise ca să fie slujit.",
    ],
    wrongA: "Minunile sunt dovada că cineva are Duhul lui Dumnezeu.",
    right: "Dovada umplerii cu Duhul este dragostea revărsată în inimă pentru oameni.",
    wrongB: "Este firesc să te superi când cineva îți strică ceva de valoare.",
    explanation:
      "Dacă umbli după minuni și nu ai îndurare, nu-L poți urma pe Isus. Fiecare minune a Lui a izvorât din îndurare.",
    step: "Pune-te azi, cu închipuirea, în locul unui om greu încercat pe care îl cunoști - și fă un lucru pentru el.",
    prayer: "Doamne, învață-mă să văd oamenii cum îi vezi Tu și lucrurile cum le vezi Tu.",
    journal: "Ce lucru material te-a supărat mai mult decât un om?",
    memory: "Dragostea lui Dumnezeu a fost turnată în inimile noastre prin Duhul Sfânt.",
  }),
  make({
    id: "isus_l5",
    order: 5,
    title: "Isus n-a fost pe placul oamenilor",
    refs: ["Matei 22:16", "Ioan 2:15", "Efeseni 4:26", "Luca 4:28-29"],
    ref: "Efeseni 4:26",
    hook: "Sunt lucruri pentru care nu trebuie să te mânii niciodată, și lucruri pentru care trebuie. Deosebirea o înveți din viața lui Isus.",
    word: "Mâniați-vă și nu păcătuiți.",
    truth: [
      "Sfințenia lui Isus a izvorât dintr-o viață de cugetare la Cuvântul lui Dumnezeu. La doisprezece ani știa destul cât să-i uimească pe învățații vremii - și atunci nu existau Biblii tipărite în case; doar sinagoga avea o copie scrisă de mână.",
      "El asculta cu luare-aminte. Se lepădase de puterile pe care le avea ca Dumnezeu; a crescut în înțelepciune ca noi. Numai așa putea să ne fie pildă.",
      "O cunoștință de suprafață a Bibliei se capătă ușor. Poți citi Biblia cum citești o carte de fizică. Dar să-L cunoști pe Dumnezeu prin Cuvântul Lui este cu totul altceva, și vine prin ascultare de ce ai văzut în Cuvânt.",
      "Mulți citesc Biblia doar ca să scoată predici. Este o deprindere primejdioasă: ajungi mai interesat de ce ai tu de spus altora decât de ce are Dumnezeu de spus ție.",
      "Cuvântul lui Dumnezeu este ca o sabie cu două tăișuri. Un tăiș trebuie să te taie pe tine, înainte să folosești celălalt tăiș în slujba altora.",
      "Isus n-a mers ca un cărturar ieșit de la vreo școală. A mers ca unul care a cugetat la Cuvântul lui Dumnezeu în ascuns și a auzit pe Dumnezeu vorbindu-I. A vorbit ca un prooroc, nu doar ca un predicator.",
      "Este o mare ispită pentru un predicator să caute să placă, mai ales dacă vrea să primească bani pentru predicarea lui. Dacă predici lucruri care supără, nu mai primești daruri și nu mai ești chemat.",
      "Chiar și vrăjmașii I-au spus: știm că ești cinstit și că înveți pe oameni adevărul, fără să-Ți pese de urmări, fără teamă și fără părtinire.",
      "Când Îl băteau, când Îi smulgeau părul din barbă, când Îl scuipau, nu Se mânia niciodată. Dar când a văzut Casa Tatălui Său spurcată de negustorie, a făcut un bici și i-a scos afară pe toți.",
      "Când nu S-a mâniat? Când Îl jigneau, Îl vorbeau de rău, Îl pălmuiau, Îl răstigneau. Când S-a mâniat? Când era necinstită Casa lui Dumnezeu, când erau năpăstuiți cei săraci, când nu I s-a îngăduit să vindece o mână uscată în ziua Sabatului.",
      "În lume este pe dos: oamenii se mânie când este vorba de ei și tac când Numele lui Dumnezeu este necinstit.",
      "Nu Și-a pierdut stăpânirea de sine și nici n-a fost diplomat. Nu le-a spus: domnilor, vă rog să vă mutați mesele. A răsturnat mesele și a împrăștiat banii.",
      "Sfințenia lui Isus I-a adus neînțelegere, împotrivire și prigoană. Dacă umbli în sfințenie adevărată, nu vei primi o medalie. Numără costul înainte de a porni.",
    ],
    wrongA: "Un om duhovnicesc nu se mânie niciodată.",
    right: "Nu ne mâniem când este vorba de noi, dar ne mâniem când Numele lui Dumnezeu și cei săraci sunt călcați în picioare.",
    wrongB: "Dacă ești sfânt, oamenii te vor prețui.",
    explanation:
      "Isus a fost urât tocmai fiindcă lumina Lui dădea pe față întunericul din oameni.",
    step: "Cercetează-te: la ce te-ai mâniat ultima dată? La tine sau la ce este al lui Dumnezeu?",
    prayer: "Doamne, iartă-mă că am căutat prea mult să plac oamenilor. Ajută-mă să-Ți plac Ție.",
    journal: "Unde ai tăcut ca să nu superi, când ar fi trebuit să vorbești?",
    memory: "Mâniați-vă și nu păcătuiți.",
  }),
  make({
    id: "isus_l6",
    order: 6,
    title: "Isus a ascultat de Tatăl",
    refs: ["Evrei 5:7-8", "Evrei 1:9", "Proverbe 23:17", "Ieremia 5:1"],
    ref: "Evrei 5:8",
    hook: "Stelele și planetele se mișcă de mii de ani fără să greșească o secundă. De ce? Fiindcă ascultă întocmai de Făcătorul lor.",
    word: "Măcar că era Fiu, a învățat să asculte prin lucrurile pe care le-a suferit.",
    truth: [
      "De ce este atâta harăbabură în lume și poate și în viața ta? Din pricina neascultării. Unde este ascultare de Dumnezeu, este rânduială și frumusețe; unde este neascultare, este haos și urâțenie.",
      "Crezi că este o povară pentru stele să se miște pe drumul rânduit lor? Unele sunt atât de departe de soare încât sunt înghețate tot anul, altele atât de aproape încât ard. Niciuna nu se plânge.",
      "Viața lui Isus a fost la fel. N-a dorit niciodată să meargă unde Tatăl Său nu voia să meargă.",
      "Frica de Domnul este un izvor de viață. Scriptura ne îndeamnă: rămâi toată ziua în frica de Domnul. Isus a trăit în frica aceasta.",
      "Este scris că a fost ascultat nu fiindcă era Fiul lui Dumnezeu, ci din pricina evlaviei Lui. Frica față de Tatăl a făcut ca rugăciunile Lui să fie ascultate.",
      "Cu cât viața ne este mai sfântă, cu atât rugăciunile ne sunt mai ascultate. Este scris că mare putere are rugăciunea fierbinte a celui neprihănit - nu a oricui. David a spus: dacă aș fi cugetat lucruri nelegiuite în inima mea, Domnul nu m-ar fi ascultat.",
      "Dacă ai o mie de necazuri, le poți birui pe toate o mie. Niciunul nu rămâne nedezlegat, dacă trăiești în evlavie, pentru că Dumnezeu ascultă rugăciunea celor ce se tem de El.",
      "Isus a fost uns cu untdelemnul bucuriei - nu fiindcă era Fiul lui Dumnezeu, ci, spune Scriptura, fiindcă a iubit neprihănirea și a urât fărădelegea. Cu cât iubim mai mult neprihănirea, cu atât se revarsă mai mult untdelemnul acesta și peste noi.",
      "Un singur om evlavios poate schimba o cetate. Ierusalimul ar fi fost cruțat pentru un singur om drept, dar nu s-a găsit niciunul. Sodoma ar fi fost cruțată pentru zece. O mie de oameni care fac compromis nu pot salva o cetate; un singur om evlavios poate.",
      "Când a vorbit în sinagoga din Nazaret, la cea dintâi predică, L-au întrerupt și au vrut să-L arunce de pe stâncă. Nici oamenii religioși nu prețuiesc sfințenia adevărată.",
    ],
    wrongA: "Rugăciunile mele sunt ascultate oricum aș trăi.",
    right: "Ascultarea și frica de Dumnezeu deschid drumul rugăciunii.",
    wrongB: "Numărul mare de credincioși salvează o cetate.",
    explanation:
      "Isus a fost ascultat din pricina evlaviei Lui. Aceeași cale ne este deschisă și nouă.",
    step: "Curăță-ți azi cugetul într-un lucru pe care îl știi de mult și îl amâni.",
    prayer: "Doamne, învață-mă să umblu toată ziua în frica de Tine și să iubesc neprihănirea.",
    journal: "Ce lucru îți mustră cugetul și nu l-ai îndreptat?",
    memory: "Măcar că era Fiu, a învățat să asculte prin lucrurile pe care le-a suferit.",
  }),
  make({
    id: "isus_l7",
    order: 7,
    title: "Vorbirea Lui era întotdeauna plină de dragoste",
    refs: ["Isaia 50:4", "Matei 12:34", "Matei 7:5", "Ioan 15:13"],
    ref: "Isaia 50:4",
    hook: "Mi-a dat o limbă de ucenic, ca să știu să înviorez cu vorba pe cel doborât de întristare. Gândiți-vă la o astfel de slujbă.",
    word: "Domnul Dumnezeu Mi-a dat o limbă iscusită, ca să știu să înviorez cu vorba pe cel doborât de întristare.",
    truth: [
      "Cea mai mare dovadă a dragostei mele pentru altul este că sunt gata să mor față de mine însumi, față de drepturile mele, față de bunul meu nume, în legătură cu acel om. Mai puțin de atât nu este dragoste.",
      "De aceea Isus nu S-a supărat niciodată pe oameni, chiar dacă erau necio pliți, încet la minte sau greșea u . Neorânduiala lor, încetineala lor, nepăsarea lor nu L-au scos niciodată din răbdare.",
      "De ce te scot pe tine din răbdare lucrurile acestea la alții? Fiindcă nu ești gata să mori față de tine însuți. Aceea este pricina.",
      "Dar nu trebuie să-l și îndreptăm? Ba da. Și Isus a îndreptat. De ce primeau oamenii îndreptarea de la Isus și nu de la farisei? Fiindcă vedeau că Isus îi iubește.",
      "Dacă sunt supărat pe un om, nu sunt în stare să-l îndrept. Trebuie să mă îndrept mai întâi pe mine. Scoate întâi bârna din ochiul tău.",
      "Un om desăvârșit poate răbda ușor pe cei nedesăvârșiți. Isus era desăvârșit; de aceea putea răbda. Noi, care suntem nedesăvârșiți, de ce nu-i putem răbda pe alții nedesăvârșiți? Tocmai pentru că suntem nedesăvârșiți.",
      "Când va mai conta lucrul acesta peste două mii de ani? Privește lucrurile din punctul de vedere al veșniciei.",
      "Uită-te la părinții care se enervează pe copiii lor. Îi iubesc destul cât să-i hrănească, să-i îmbrace și să-i dea la școală; dar când copilul le face un neajuns, se supără.",
      "Din prisosul inimii vorbește gura. De ce spun oamenii vorbe care rănesc, glume pe seama altora? Fiindcă nu sunt ca Hristos.",
      "Isus a știut să mustre tare. I-a spus lui Petru: înapoia Mea, Satano. Dar n-a spus-o din enervare, ci ca să-l ajute pe Petru să vadă că gândul acela era de la Satana.",
      "În trei ani, nu i-a vorbit niciodată pe la spate nici măcar despre Iuda. Dovada? La Cină, când a spus că unul dintre ei Îl va vinde, niciunul nu știa; toți au întrebat: nu cumva sunt eu?",
      "Mulți credincioși vorbesc pe la spate și bârfesc. Vorbesc despre umplerea cu Duhul, despre trăire deosebită și strigăte de laudă, dar n-au fost izbăviți de bârfă.",
      "Nu trebuie să fii predicator. Poate nu vei sta niciodată la amvon. Dar câți oameni obosiți îți ies în cale în fiecare zi? Ai un cuvânt pentru ei, sau doar vorbești despre politică și despre vreme?",
    ],
    wrongA: "Am dreptul să mă enervez când cineva lucrează prost.",
    right: "Dacă sunt enervat, nu sunt în stare să îndrept pe nimeni; întâi mă îndrept pe mine.",
    wrongB: "Bârfa este o slăbiciune mică, pe lângă păcatele mari.",
    explanation:
      "Isus a folosit limba ca să încurajeze și să îndrepte. Duhul Sfânt nu-ți spune doar să fii ca El, ci Se oferă să te facă așa.",
    step: "Spune azi un cuvânt de îmbărbătare unui om obosit, pe care nu l-ai fi băgat în seamă.",
    prayer: "Doamne, ia-mi limba în stăpânirea Ta de azi înainte. Vreau să înviorez, nu să rănesc.",
    journal: "Pe cine ai rănit cu o vorbă aruncată în treacăt?",
    memory: "Mi-a dat o limbă iscusită, ca să știu să înviorez cu vorba pe cel doborât.",
  }),
  make({
    id: "isus_l8",
    order: 8,
    title: "Blândețea și bunătatea Lui",
    refs: ["Matei 12:20", "Faptele Apostolilor 10:38", "Matei 5:45", "Luca 19:41"],
    ref: "Matei 12:20",
    hook: "Nu va frânge o trestie ruptă și nu va stinge un fitil care fumegă. Dacă ești ca o trestie zdrobită, Lui Îi pasă de tine.",
    word: "Nu va frânge o trestie ruptă și nu va stinge un fitil care fumegă.",
    truth: [
      "O trestie este un lucru mărunt și ieftin. Dacă este strivită, oricine o aruncă și ia alta. Isus nu face așa. Iar un fitil care abia mai arde, El îl înfl ăcăra din nou.",
      "Isus i-a iubit mai ales pe cei căzuți adânc în păcat, fiindcă aceștia sunt lepădați de toți. Femeia prinsă în preacurvie, tâlharul de pe cruce - la ei S-a dus să-i ridice.",
      "Cine se ferea de Isus? Cei mândri, cei fățarnici și cei care aveau un păcat ascuns și se temeau că-l va da pe față.",
      "Dragostea Lui nu era duioasă fără vlagă. A mustrat cu vorbe tari pe Petru; pe Iacov și Ioan când căutau locuri de cinste și când voiau să cheme foc peste samariteni; de șapte ori i-a mustrat pe ucenici pentru necredință. De ce? Fiindcă îi iubea.",
      "Binele veșnic al oamenilor conta pentru El mai mult decât părerea lor despre El. Era gata să-Și piardă bunul nume ca să ajute pe altul.",
      "Petru a rezumat toată lucrarea Lui într-o propoziție: umbla din loc în loc, făcea bine și vindeca pe toți cei apăsați de diavolul. Deci nu doar predica: făcea bine.",
      "Îi păsa și de nevoia trupească. Patru mii de oameni stătuseră cu El trei zile fără să mănânce, și El a spus: să le dăm de mâncare. De aceea ne-a învățat să cerem: pâinea noastră cea de toate zilele.",
      "Ce te oprește să iubești oameni disprețuiți de alții? Simțul tău de demnitate. Vrei un creștinism respectabil, cu oameni respectabili.",
      "Când făcea bine, nu Se aștepta niciodată să primească ceva în schimb. A dat pilda soarelui, care răsare peste cei răi și peste cei buni, și a ploii, care cade peste cei drepți și peste cei nedrepți. Ce așteaptă soarele în schimb? Nici măcar un mulțumesc.",
      "Așa se deosebește dragostea omenească de cea dumnezeiască: cea omenească merge mai departe doar dacă celălalt răspunde.",
      "Își folosea banii pentru două lucruri: să cumpere ce era de trebuință și să dea săracilor. Nu era bogat, și totuși găsea din ce să dea.",
      "A plâns deasupra Ierusalimului și abia după aceea a făcut biciul. Aceasta este cumpăna.",
      "La Isus nu trebuia să treci printr-un secretar. Nicodim putea veni în miez de noapte. Când ajungi atât de ocupat încât nu mai poți sta cu oameni obișnuiți, ești mai ocupat decât a fost Isus Hristos.",
      "O dată au adus bolnavi la El pe înserat, și a stat până târziu în noapte punându-Și mâinile peste ei. Nu socotea că timpul Lui este al Lui.",
    ],
    wrongA: "Cine iubește nu mustră niciodată.",
    right: "Tocmai fiindcă îi iubea, Isus a mustrat tare; binele lor veșnic conta mai mult decât părerea lor despre El.",
    wrongB: "Cine are lucrare mare are dreptul să fie greu de găsit.",
    explanation:
      "Minunile sunt primejdioase dacă nu sunt făcute din dragoste. Dragostea Lui S-a îngrijit, chiar în ultimele clipe, să aducă un tâlhar în Împărăție.",
    step: "Fă azi un bine cuiva care sigur nu îți poate întoarce nimic.",
    prayer: "Doamne, dă-mi dragostea Ta: să fac bine fără să aștept nimic și să fiu la îndemâna oamenilor.",
    journal: "Cine te-ar putea găsi azi, dacă ar avea nevoie de tine?",
    memory: "Nu va frânge o trestie ruptă și nu va stinge un fitil care fumegă.",
  }),
]
