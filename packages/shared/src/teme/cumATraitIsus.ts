import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 9 din docs/41-module-teme-poonen.md: "Cum a trait Isus".
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
          { id: `${p}c1`, label: "Nu m-am gandit asa niciodata." },
          { id: `${p}c2`, label: "Stiu, dar nu traiesc asa." },
          { id: `${p}c3`, label: "Vreau sa calc pe urmele Lui." },
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
        "Duhul Sfant nu-ti spune doar: fii ca El. Iti spune: lasa-Ma sa te fac ca El.",
        "Din slava in slava, El ne preface in acelasi chip.",
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
    title: "Isus a biruit pacatul",
    refs: ["Evrei 4:15", "Iacov 1:2", "Ioan 6:38", "1 Petru 4:1"],
    ref: "Iacov 1:2",
    hook: "Ispita nu este menita sa ne duca in pacat. Dimpotriva: este menita sa ne duca la sfintenie.",
    word: "Fratii mei, sa priviti ca o mare bucurie cand treceti prin felurite incercari.",
    truth: [
      "Noi nu suntem sfinti prin fire. Cand ne nastem, suntem prin fire pacatosi. Chiar si Adam, cand a fost facut, nu era prin fire sfant, ci nevinovat. Trebuia sa-L aleaga pe Dumnezeu si sa spuna nu ispitei ca sa devina sfant.",
      "Sfintenia este ca sanatatea duhovniceasca. De ce se duc oamenii la sala si ridica greutati? Fiindca stiu ca un trup sanatos vine numai daca fiecare muschi este pus la incercare, impotriva unei impotriviri.",
      "Un om caruia muschii nu-i sunt pusi la incercare ramane un om moale si gras. La fel este si duhovniceste: avem nevoie de ceva care sa ni se impotriveasca si de biruinta asupra lui.",
      "De aceea spune Scriptura: priviti ca o mare bucurie cand treceti prin felurite incercari. Cine spune: nu vreau sa dau ochii cu ispita, nu va fi niciodata un crestin voinic.",
      "Uimitor este ca si Isus, cel fara pacat, a trebuit sa fie ispitit. A fost ispitit in toate lucrurile ca si noi, dar n-a pacatuit niciodata.",
      "Daca ar fi biruit ispita ca Dumnezeu, nu ar fi nimic mare in asta - si Scriptura spune ca Dumnezeu nu poate fi ispitit. Ar fi ca un tata care conduce masina cu optzeci de kilometri pe ora si-i spune baiatului: alearga dupa mine.",
      "Adevarul este ca a dat ochii cu ispita ca om si a biruit prin puterea Duhului Sfant. Aceeasi putere ne-o ofera si noua. L-a biruit pe Satana spunandu-i Cuvantul lui Dumnezeu; asa poti si tu.",
      "Care este miezul pacatului? Sa-ti faci voia ta. Atunci care este miezul sfinteniei? Sa te lepezi de voia ta si sa faci voia lui Dumnezeu. Isus a spus: am venit din cer nu ca sa fac voia Mea, ci voia Celui ce M-a trimis.",
      "In Ghetsimani a spus: nu cum voiesc Eu, ci cum voiesti Tu. Si-a adus voia omeneasca ca jertfa neintrerupta. Asta inseamna ca Isus n-a pacatuit niciodata: niciodata nu Si-a facut voia Lui.",
      "Firea omeneasca este tocmai pe dos. Se vede la un copil mic: vrea sa faca ce vrea el. Incapatanarea aceea este pacat.",
    ],
    wrongA: "Cel mai bine este sa nu dau ochii cu nicio ispita.",
    right: "Sfintenia creste tocmai prin a spune nu ispitei, in puterea Duhului.",
    wrongB: "Isus a biruit pentru ca era Dumnezeu si nu putea pacatui.",
    explanation:
      "Isus este inaintemergatorul nostru: a alergat inaintea noastra ca om si ne spune: urmeaza-Ma.",
    step: "La cea dintai ispita de azi, spune cu glas tare un cuvant din Scriptura si nu discuta cu ea.",
    prayer: "Doamne, nu vreau sa-mi fac voia mea. Da-mi putere prin Duhul Tau sa spun nu.",
    journal: "In ce loc ai crezut ca esti prea slab ca sa birui?",
    memory: "Sa priviti ca o mare bucurie cand treceti prin felurite incercari.",
  }),
  make({
    id: "isus_l2",
    order: 2,
    title: "Isus a facut voia Tatalui",
    refs: ["Ioan 14:12", "Romani 8:3-4", "Evrei 6:1", "2 Corinteni 3:18"],
    ref: "Ioan 14:12",
    hook: "Isus a spus: cine crede in Mine va face si el lucrarile pe care le fac Eu. Ori a spus adevarul, ori a mintit. Eu cred ca a spus adevarul.",
    word: "Cine crede in Mine va face si el lucrarile pe care le fac Eu.",
    truth: [
      "Ce lucrari a facut Isus? Ne gandim indata la invierea mortilor, la hranirea celor cinci mii, la umblarea pe mare. Dar a mai facut si altele: Si-a pus bratul pe umarul unui lepros, a mangaiat oameni cazuti in pacat, a iertat o femeie prinsa in preacurvie, i-a iertat pe cei care Il numeau Beelzebul.",
      "Toate lucrarile Lui se pot cuprinde intr-o singura propozitie: a facut voia Tatalui Sau. Daca Tatal voia sa umble pe apa, umbla pe apa. Daca Tatal voia sa spele picioarele ucenicilor, le spala.",
      "Deci cand spune ca putem face aceleasi lucrari, inseamna ca putem implini tot ce este voia Tatalui pentru noi. Daca nu este voia Tatalui sa inviezi mortii, nu vei invia morti.",
      "Treizeci de ani Isus n-a hranit cinci mii, n-a umblat pe apa si n-a vindecat pe nimeni - fiindca nu era voia Tatalui. Si totusi in acei treizeci de ani a facut voia Tatalui.",
      "Cand au fost umpluti cu Duhul Sfant la Rusalii, ucenicii au primit putere sa faca aceleasi lucrari de ascultare pe care le facea Isus.",
      "Ce inseamna lucrari mai mari? Inseamna aducerea altora in viata aceasta. Dupa trei ani si jumatate, Isus nu putuse face nici macar pe doi dintre ucenici sa fie una; toti se intrebau cine este cel mai mare. Astazi, daca doi oameni ajung una, este o lucrare mai mare - nu fiindca noi am fi mai mari, ci fiindca Duhul Sfant locuieste acum in inimi.",
      "Ce nu putea face Legea, a facut Dumnezeu: Si-a trimis Fiul intr-o fire asemanatoare cu a pacatului, ca porunca Legii sa fie implinita in noi, care umblam dupa Duhul.",
      "Dumnezeu nu ne-a fagaduit ca vom fi fara pacat pe pamant. Nimeni n-a trait asa in afara de Isus. Dar suntem chemati sa mergem spre desavarsire.",
      "Vorbirea Lui era cu totul curata. Niciun cuvant murdar, niciun cuvant desert, nicio minciuna. Nu-L puteai atrage in vorbe fara rost, nici in discutii despre raul altora.",
      "Folosea lucrurile materiale, dar nu le iubea. Sfintenia Lui era launtrica, nu se arata prin mancare deosebita, prin haine deosebite sau prin retragerea in pustie. Traia intre oameni, muncea, se imbraca si manca la fel ca ei - si totusi in curatie.",
    ],
    wrongA: "Lucrarile lui Isus inseamna minuni spectaculoase.",
    right: "Lucrarile lui Isus au fost lucrari de ascultare de voia Tatalui.",
    wrongB: "Putem ajunge fara pacat aici, pe pamant.",
    explanation:
      "Fiecare lucru care este in voia lui Dumnezeu pentru viata ta se poate face, prin puterea Duhului Sfant.",
    step: "Intreaba-L azi pe Dumnezeu care este un singur lucru pe care vrea sa-l faci - si fa-l.",
    prayer: "Doamne, nu vreau lucrari mari, ci ascultare. Arata-mi ce vrei Tu si da-mi putere.",
    journal: "Ce faci pentru Dumnezeu fara sa fi intrebat daca El ti-a cerut?",
    memory: "Cine crede in Mine va face si el lucrarile pe care le fac Eu.",
  }),
  make({
    id: "isus_l3",
    order: 3,
    title: "Isus i-a pretuit pe toti oamenii",
    refs: ["Ioan 1:14", "Psalmul 51:6", "Iacov 3:9", "Marcu 8:36"],
    ref: "Ioan 1:14",
    hook: "Sfintenia adevarata este dragoste desavarsita. Daca ai sfintenie fara dragoste, nu este sfintenia lui Hristos, ci a fariseilor.",
    word: "Plin de har si de adevar.",
    truth: [
      "Multi isi inchipuie sfintenia ca pe ceva uscat, teapan si respingator. Poate fi o viata randuita: iti platesti impozitele, te rogi, citesti Biblia, dai zeciuiala - si esti ca un schelet.",
      "Un schelet nu atrage pe nimeni. Daca ai vedea noaptea, pe o strada intunecata, un schelet venind spre tine, ai fugi. Asa erau fariseii; oamenilor le venea sa fuga de ei.",
      "Dar nici fara oase nu se poate. Fara oase te-ai prabusi ca o meduza. Unii sunt asa duhovniceste: se strecoara prin orice deschizatura, nu au incredintari, nu stau pentru adevar. Nici asta nu este voia lui Dumnezeu.",
      "Ce face trupul frumos? Oasele acoperite cu carne. Asa si aici: nu numai adevarul, ci harul asezat peste adevar face cuvintele frumoase.",
      "Isus nu era nici schelet, nici meduza. Avea tot adevarul si statea pentru tot ce statea Legea lui Dumnezeu, mai mult decat fariseii - dar oasele erau acoperite cu carne.",
      "Un om poate face fapte de dragoste fara sa aiba dragoste in inima; poate fi doar o purtare din afara, ca sa impresioneze. Dragostea lui Isus venea din adancul inimii.",
      "Gandurile si atitudinile noastre fata de oameni raspandesc un miros pe care ceilalti il simt. Cuvintele si faptele de dragoste nu pretuiesc nimic daca gandurile fata de acel om raman critice si egoiste. Dumnezeu doreste adevarul in adancul launtric.",
      "Daca iubesti un om, il vei pretui. Isus a pus un pret foarte mare pe orice om. Nu conta daca era invatat, destept sau bogat. Este usor sa pretuiesti oameni culti si bogati.",
      "Dar cersetorul, cu hainele lui rupte, este si el facut dupa chipul lui Dumnezeu? Daca da, il vei cinsti. Isus n-a facut deosebire intre bogat si sarac, invatat si neinvatat, om cinstit si pacatos.",
      "A vindecat multi bolnavi care nu erau deloc interesati sa primeasca altceva de la El. Asa era bunatatea Lui.",
      "Pentru ca era gata sa moara pentru ei, avea dreptul sa predice impotriva pacatului cu atata tarie. Le-a spus fariseilor: pui de naparți. Poti spune si tu asa, daca ii iubesti atat cat sa mori pentru ei; altfel, nu.",
    ],
    wrongA: "Sfintenia inseamna sa te tii departe de oameni pacatosi.",
    right: "Sfintenia adevarata este dragoste desavarsita: adevarul acoperit cu har.",
    wrongB: "Dragostea inseamna sa nu spui niciodata lucruri dure.",
    explanation:
      "Nu avem dreptul sa predicam impotriva pacatului daca nu suntem gata sa facem ceva ca sa-i scapam pe oameni de pacatul lor.",
    step: "Cinsteste azi, cu vorba si cu privirea, un om pe care lumea il trece cu vederea.",
    prayer: "Doamne, umple-mi inima cu dragostea Ta pentru oameni, nu doar gura cu vorbe.",
    journal: "Pe cine ai trecut cu vederea fiindca nu-ti aduce niciun folos?",
    memory: "Plin de har si de adevar.",
  }),
  make({
    id: "isus_l4",
    order: 4,
    title: "Oamenii inaintea lucrurilor",
    refs: ["Romani 5:5", "Tefania 3:17", "Marcu 12:37", "Luca 7:12-15"],
    ref: "Romani 5:5",
    hook: "Dumnezeu ne-a dat lucrurile ca sa le folosim si oamenii ca sa-i iubim. Lumea de azi iubeste lucrurile si foloseste oamenii. Este pe dos.",
    word: "Dragostea lui Dumnezeu a fost turnata in inimile noastre prin Duhul Sfant care ne-a fost dat.",
    truth: [
      "Cati crestini ai intalnit despre care, uitandu-te la viata lor, ai putea spune ca ei cred cu adevarat ca Dumnezeu este mai important decat banii? Foarte, foarte putini.",
      "Cand banii ajung mai importanti decat Dumnezeu, ajung mai importanti si decat oamenii.",
      "Lumea este plina de fabrici si de birouri in care oamenii sunt folositi pentru scopurile altora. Dar acelasi lucru se intampla si in multe lucrari si biserici, unde conducatori se folosesc de oameni ca sa se inalte pe ei insisi.",
      "Iuda era casierul cetei. Banii pe care ii primeau nu veneau pentru Iuda, ci pentru lucrarea lui Isus. Iuda fura din ei. Si totusi Isus il iubea pe Iuda. Era gata sa piarda banii aceia, daca ar fi putut castiga sufletul lui.",
      "Care este dovada ca ai fost umplut cu Duhul Sfant? Dragostea lui Dumnezeu turnata in inima prin Duhul Sfant. Un semn al umplerii este ca inima ta este plina de dragoste pentru oameni si esti asezat cu capul in sus, nu pe dos.",
      "Inchipuie-ti ca in atelierul de tamplarie intra un copil din vecini si strica ceva scump pe care tocmai il facuse Isus. Crezi ca ar fi strigat la el si l-ar fi alungat? Cred ca l-ar fi luat in brate si i-ar fi spus: nu-i nimic, fiule, mai fac unul.",
      "Este scris ca Dumnezeu Se bucura de poporul Lui cu cantece de veselie. Se bucura de oameni nedesavarsiti, care si-au aratat dorinta dupa El cu toate lipsurile lor. Asa Se uita si Isus la ucenici.",
      "Norodul cel mult Il asculta cu placere. Oamenii simteau mireasma care iesea din duhul Lui.",
      "Ne-am folosit multa vreme inchipuirea pentru lucruri rele. Foloseste-o acum ca sa te pui in locul celor care sufera: in coliba aceea, langa sotul acela greu, cu copilul acela problema. Aceasta ar fi dovada dragostei tale.",
      "Cand a vazut o vaduva la inmormantarea singurului ei fiu, a oprit tot alaiul si i-a dat baiatul inapoi. Minunea nu era ca sa-Si arate puterea, ci dragostea lui Dumnezeu. Fiecare minune a lui Isus a izvorat din indurare.",
      "Nu S-a suparat niciodata de ce I-au facut sau I-au spus oamenii, nici cand n-au facut pentru El ce ar fi trebuit - fiindca nu venise ca sa fie slujit.",
    ],
    wrongA: "Minunile sunt dovada ca cineva are Duhul lui Dumnezeu.",
    right: "Dovada umplerii cu Duhul este dragostea revarsata in inima pentru oameni.",
    wrongB: "Este firesc sa te superi cand cineva iti strica ceva de valoare.",
    explanation:
      "Daca umbli dupa minuni si nu ai indurare, nu-L poti urma pe Isus. Fiecare minune a Lui a izvorat din indurare.",
    step: "Pune-te azi, cu inchipuirea, in locul unui om greu incercat pe care il cunosti - si fa un lucru pentru el.",
    prayer: "Doamne, invata-ma sa vad oamenii cum ii vezi Tu si lucrurile cum le vezi Tu.",
    journal: "Ce lucru material te-a suparat mai mult decat un om?",
    memory: "Dragostea lui Dumnezeu a fost turnata in inimile noastre prin Duhul Sfant.",
  }),
  make({
    id: "isus_l5",
    order: 5,
    title: "Isus n-a fost pe placul oamenilor",
    refs: ["Matei 22:16", "Ioan 2:15", "Efeseni 4:26", "Luca 4:28-29"],
    ref: "Efeseni 4:26",
    hook: "Sunt lucruri pentru care nu trebuie sa te maniii niciodata, si lucruri pentru care trebuie. Deosebirea o inveti din viata lui Isus.",
    word: "Maniati-va si nu pacatuiti.",
    truth: [
      "Sfintenia lui Isus a izvorat dintr-o viata de cugetare la Cuvantul lui Dumnezeu. La doisprezece ani stia destul cat sa-i uimeasca pe invatatii vremii - si atunci nu existau Biblii tiparite in case; doar sinagoga avea o copie scrisa de mana.",
      "El asculta cu luare-aminte. Se lepadase de puterile pe care le avea ca Dumnezeu; a crescut in intelepciune ca noi. Numai asa putea sa ne fie pilda.",
      "O cunostinta de suprafata a Bibliei se capata usor. Poti citi Biblia cum citesti o carte de fizica. Dar sa-L cunosti pe Dumnezeu prin Cuvantul Lui este cu totul altceva, si vine prin ascultare de ce ai vazut in Cuvant.",
      "Multi citesc Biblia doar ca sa scoata predici. Este o deprindere primejdioasa: ajungi mai interesat de ce ai tu de spus altora decat de ce are Dumnezeu de spus tie.",
      "Cuvantul lui Dumnezeu este ca o sabie cu doua taisuri. Un tais trebuie sa te taie pe tine, inainte sa folosesti celalalt tais in slujba altora.",
      "Isus n-a mers ca un carturar iesit de la vreo scoala. A mers ca unul care a cugetat la Cuvantul lui Dumnezeu in ascuns si a auzit pe Dumnezeu vorbindu-I. A vorbit ca un prooroc, nu doar ca un predicator.",
      "Este o mare ispita pentru un predicator sa caute sa placa, mai ales daca vrea sa primeasca bani pentru predicarea lui. Daca predici lucruri care supara, nu mai primesti daruri si nu mai esti chemat.",
      "Chiar si vrajmasii I-au spus: stim ca esti cinstit si ca inveti pe oameni adevarul, fara sa-Ti pese de urmari, fara teama si fara partinire.",
      "Cand Il bateau, cand Ii smulgeau parul din barba, cand Il scuipau, nu Se mania niciodata. Dar cand a vazut Casa Tatalui Sau spurcata de negustorie, a facut un bici si i-a scos afara pe toti.",
      "Cand nu S-a maniat? Cand Il jigneau, Il vorbeau de rau, Il pălmuiau, Il rastigneau. Cand S-a maniat? Cand era necinstita Casa lui Dumnezeu, cand erau napastuiti cei saraci, cand nu I s-a ingaduit sa vindece o mana uscata in ziua Sabatului.",
      "In lume este pe dos: oamenii se manie cand este vorba de ei si tac cand Numele lui Dumnezeu este necinstit.",
      "Nu Si-a pierdut stapanirea de sine si nici n-a fost diplomat. Nu le-a spus: domnilor, va rog sa va mutati mesele. A rasturnat mesele si a imprastiat banii.",
      "Sfintenia lui Isus I-a adus neintelegere, impotrivire si prigoana. Daca umbli in sfintenie adevarata, nu vei primi o medalie. Numara costul inainte de a porni.",
    ],
    wrongA: "Un om duhovnicesc nu se manie niciodata.",
    right: "Nu ne maniem cand este vorba de noi, dar ne maniem cand Numele lui Dumnezeu si cei saraci sunt calcati in picioare.",
    wrongB: "Daca esti sfant, oamenii te vor pretui.",
    explanation:
      "Isus a fost urat tocmai fiindca lumina Lui dadea pe fata intunericul din oameni.",
    step: "Cerceteaza-te: la ce te-ai maniat ultima data? La tine sau la ce este al lui Dumnezeu?",
    prayer: "Doamne, iarta-ma ca am cautat prea mult sa plac oamenilor. Ajuta-ma sa-Ti plac Tie.",
    journal: "Unde ai tacut ca sa nu superi, cand ar fi trebuit sa vorbesti?",
    memory: "Maniati-va si nu pacatuiti.",
  }),
  make({
    id: "isus_l6",
    order: 6,
    title: "Isus a ascultat de Tatal",
    refs: ["Evrei 5:7-8", "Evrei 1:9", "Proverbe 23:17", "Ieremia 5:1"],
    ref: "Evrei 5:8",
    hook: "Stelele si planetele se misca de mii de ani fara sa greseasca o secunda. De ce? Fiindca asculta intocmai de Facatorul lor.",
    word: "Macar ca era Fiu, a invatat sa asculte prin lucrurile pe care le-a suferit.",
    truth: [
      "De ce este atata harababura in lume si poate si in viata ta? Din pricina neascultarii. Unde este ascultare de Dumnezeu, este randuiala si frumusete; unde este neascultare, este haos si uratenie.",
      "Crezi ca este o povara pentru stele sa se miste pe drumul randuit lor? Unele sunt atat de departe de soare incat sunt inghetate tot anul, altele atat de aproape incat ard. Niciuna nu se plange.",
      "Viata lui Isus a fost la fel. N-a dorit niciodata sa mearga unde Tatal Sau nu voia sa mearga.",
      "Frica de Domnul este un izvor de viata. Scriptura ne indeamna: ramai toata ziua in frica de Domnul. Isus a trait in frica aceasta.",
      "Este scris ca a fost ascultat nu fiindca era Fiul lui Dumnezeu, ci din pricina evlaviei Lui. Frica fata de Tatal a facut ca rugaciunile Lui sa fie ascultate.",
      "Cu cat viata ne este mai sfanta, cu atat rugaciunile ne sunt mai ascultate. Este scris ca mare putere are rugaciunea fierbinte a celui neprihanit - nu a oricui. David a spus: daca as fi cugetat lucruri nelegiuite in inima mea, Domnul nu m-ar fi ascultat.",
      "Daca ai o mie de necazuri, le poti birui pe toate o mie. Niciunul nu ramane nedezlegat, daca traiesti in evlavie, pentru ca Dumnezeu asculta rugaciunea celor ce se tem de El.",
      "Isus a fost uns cu untdelemnul bucuriei - nu fiindca era Fiul lui Dumnezeu, ci, spune Scriptura, fiindca a iubit neprihanirea si a urat faradelegea. Cu cat iubim mai mult neprihanirea, cu atat se revarsa mai mult untdelemnul acesta si peste noi.",
      "Un singur om evlavios poate schimba o cetate. Ierusalimul ar fi fost crutat pentru un singur om drept, dar nu s-a gasit niciunul. Sodoma ar fi fost crutata pentru zece. O mie de oameni care fac compromis nu pot salva o cetate; un singur om evlavios poate.",
      "Cand a vorbit in sinagoga din Nazaret, la cea dintai predica, L-au intrerupt si au vrut sa-L arunce de pe stanca. Nici oamenii religiosi nu pretuiesc sfintenia adevarata.",
    ],
    wrongA: "Rugaciunile mele sunt ascultate oricum as trai.",
    right: "Ascultarea si frica de Dumnezeu deschid drumul rugaciunii.",
    wrongB: "Numarul mare de credinciosi salveaza o cetate.",
    explanation:
      "Isus a fost ascultat din pricina evlaviei Lui. Aceeasi cale ne este deschisa si noua.",
    step: "Curata-ti azi cugetul intr-un lucru pe care il stii de mult si il amani.",
    prayer: "Doamne, invata-ma sa umblu toata ziua in frica de Tine si sa iubesc neprihanirea.",
    journal: "Ce lucru iti mustra cugetul si nu l-ai indreptat?",
    memory: "Macar ca era Fiu, a invatat sa asculte prin lucrurile pe care le-a suferit.",
  }),
  make({
    id: "isus_l7",
    order: 7,
    title: "Vorbirea Lui era intotdeauna plina de dragoste",
    refs: ["Isaia 50:4", "Matei 12:34", "Matei 7:5", "Ioan 15:13"],
    ref: "Isaia 50:4",
    hook: "Mi-a dat o limba de ucenic, ca sa stiu sa inviorez cu vorba pe cel doborat de intristare. Ganditi-va la o astfel de slujba.",
    word: "Domnul Dumnezeu Mi-a dat o limba iscusita, ca sa stiu sa inviorez cu vorba pe cel doborat de intristare.",
    truth: [
      "Cea mai mare dovada a dragostei mele pentru altul este ca sunt gata sa mor fata de mine insumi, fata de drepturile mele, fata de bunul meu nume, in legatura cu acel om. Mai putin de atat nu este dragoste.",
      "De aceea Isus nu S-a suparat niciodata pe oameni, chiar daca erau necio pliti, incet la minte sau gresea u . Neoranduiala lor, incetineala lor, nepasarea lor nu L-au scos niciodata din rabdare.",
      "De ce te scot pe tine din rabdare lucrurile acestea la altii? Fiindca nu esti gata sa mori fata de tine insuti. Aceea este pricina.",
      "Dar nu trebuie sa-l si indreptam? Ba da. Si Isus a indreptat. De ce primeau oamenii indreptarea de la Isus si nu de la farisei? Fiindca vedeau ca Isus ii iubeste.",
      "Daca sunt suparat pe un om, nu sunt in stare sa-l indrept. Trebuie sa ma indrept mai intai pe mine. Scoate intai barna din ochiul tau.",
      "Un om desavarsit poate rabda usor pe cei nedesavarsiti. Isus era desavarsit; de aceea putea rabda. Noi, care suntem nedesavarsiti, de ce nu-i putem rabda pe altii nedesavarsiti? Tocmai pentru ca suntem nedesavarsiti.",
      "Cand va mai conta lucrul acesta peste doua mii de ani? Priveste lucrurile din punctul de vedere al vesniciei.",
      "Uita-te la parintii care se enerveaza pe copiii lor. Ii iubesc destul cat sa-i hraneasca, sa-i imbrace si sa-i dea la scoala; dar cand copilul le face un neajuns, se supara.",
      "Din prisosul inimii vorbeste gura. De ce spun oamenii vorbe care ranesc, glume pe seama altora? Fiindca nu sunt ca Hristos.",
      "Isus a stiut sa mustre tare. I-a spus lui Petru: inapoia Mea, Satano. Dar n-a spus-o din enervare, ci ca sa-l ajute pe Petru sa vada ca gandul acela era de la Satana.",
      "In trei ani, nu i-a vorbit niciodata pe la spate nici macar despre Iuda. Dovada? La Cina, cand a spus ca unul dintre ei Il va vinde, niciunul nu stia; toti au intrebat: nu cumva sunt eu?",
      "Multi credinciosi vorbesc pe la spate si barfesc. Vorbesc despre umplerea cu Duhul, despre traire deosebita si strigate de lauda, dar n-au fost izbaviti de barfa.",
      "Nu trebuie sa fii predicator. Poate nu vei sta niciodata la amvon. Dar cati oameni obositi iti ies in cale in fiecare zi? Ai un cuvant pentru ei, sau doar vorbesti despre politica si despre vreme?",
    ],
    wrongA: "Am dreptul sa ma enervez cand cineva lucreaza prost.",
    right: "Daca sunt enervat, nu sunt in stare sa indrept pe nimeni; intai ma indrept pe mine.",
    wrongB: "Barfa este o slabiciune mica, pe langa pacatele mari.",
    explanation:
      "Isus a folosit limba ca sa incurajeze si sa indrepte. Duhul Sfant nu-ti spune doar sa fii ca El, ci Se ofera sa te faca asa.",
    step: "Spune azi un cuvant de imbarbatare unui om obosit, pe care nu l-ai fi bagat in seama.",
    prayer: "Doamne, ia-mi limba in stapanirea Ta de azi inainte. Vreau sa inviorez, nu sa ranesc.",
    journal: "Pe cine ai ranit cu o vorba aruncata in treacat?",
    memory: "Mi-a dat o limba iscusita, ca sa stiu sa inviorez cu vorba pe cel doborat.",
  }),
  make({
    id: "isus_l8",
    order: 8,
    title: "Blandetea si bunatatea Lui",
    refs: ["Matei 12:20", "Faptele Apostolilor 10:38", "Matei 5:45", "Luca 19:41"],
    ref: "Matei 12:20",
    hook: "Nu va frange o trestie ruptă si nu va stinge un fitil care fumega. Daca esti ca o trestie zdrobita, Lui Ii pasa de tine.",
    word: "Nu va frange o trestie ruptă si nu va stinge un fitil care fumega.",
    truth: [
      "O trestie este un lucru marunt si ieftin. Daca este strivita, oricine o arunca si ia alta. Isus nu face asa. Iar un fitil care abia mai arde, El il infl acara din nou.",
      "Isus i-a iubit mai ales pe cei cazuti adanc in pacat, fiindca acestia sunt lepadati de toti. Femeia prinsa in preacurvie, talharul de pe cruce - la ei S-a dus sa-i ridice.",
      "Cine se ferea de Isus? Cei mandri, cei fatarnici si cei care aveau un pacat ascuns si se temeau ca-l va da pe fata.",
      "Dragostea Lui nu era duioasa fara vlaga. A mustrat cu vorbe tari pe Petru; pe Iacov si Ioan cand cautau locuri de cinste si cand voiau sa cheme foc peste samariteni; de sapte ori i-a mustrat pe ucenici pentru necredinta. De ce? Fiindca ii iubea.",
      "Binele vesnic al oamenilor conta pentru El mai mult decat parerea lor despre El. Era gata sa-Si piarda bunul nume ca sa ajute pe altul.",
      "Petru a rezumat toata lucrarea Lui intr-o propozitie: umbla din loc in loc, facea bine si vindeca pe toti cei apasati de diavolul. Deci nu doar predica: facea bine.",
      "Ii pasa si de nevoia trupeasca. Patru mii de oameni statusera cu El trei zile fara sa manance, si El a spus: sa le dam de mancare. De aceea ne-a invatat sa cerem: painea noastra cea de toate zilele.",
      "Ce te opreste sa iubesti oameni dispretuiti de altii? Simtul tau de demnitate. Vrei un crestinism respectabil, cu oameni respectabili.",
      "Cand facea bine, nu Se astepta niciodata sa primeasca ceva in schimb. A dat pilda soarelui, care rasare peste cei rai si peste cei buni, si a ploii, care cade peste cei drepti si peste cei nedrepti. Ce asteapta soarele in schimb? Nici macar un multumesc.",
      "Asa se deosebeste dragostea omeneasca de cea dumnezeiasca: cea omeneasca merge mai departe doar daca celalalt raspunde.",
      "Isi folosea banii pentru doua lucruri: sa cumpere ce era de trebuinta si sa dea saracilor. Nu era bogat, si totusi gasea din ce sa dea.",
      "A plans deasupra Ierusalimului si abia dupa aceea a facut biciul. Aceasta este cumpana.",
      "La Isus nu trebuia sa treci printr-un secretar. Nicodim putea veni in miez de noapte. Cand ajungi atat de ocupat incat nu mai poti sta cu oameni obisnuiti, esti mai ocupat decat a fost Isus Hristos.",
      "O data au adus bolnavi la El pe inserat, si a stat pana tarziu in noapte punandu-Si mainile peste ei. Nu socotea ca timpul Lui este al Lui.",
    ],
    wrongA: "Cine iubeste nu mustra niciodata.",
    right: "Tocmai fiindca ii iubea, Isus a mustrat tare; binele lor vesnic conta mai mult decat parerea lor despre El.",
    wrongB: "Cine are lucrare mare are dreptul sa fie greu de gasit.",
    explanation:
      "Minunile sunt primejdioase daca nu sunt facute din dragoste. Dragostea Lui S-a ingrijit, chiar in ultimele clipe, sa aduca un talhar in Imparatie.",
    step: "Fa azi un bine cuiva care sigur nu iti poate intoarce nimic.",
    prayer: "Doamne, da-mi dragostea Ta: sa fac bine fara sa astept nimic si sa fiu la indemana oamenilor.",
    journal: "Cine te-ar putea gasi azi, daca ar avea nevoie de tine?",
    memory: "Nu va frange o trestie ruptă si nu va stinge un fitil care fumega.",
  }),
]
