import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 13 din docs/41-module-teme-poonen.md: "Păcatele care ne distrug".
 * Temele 59, 60, 61, 62, 63, 65, 67.
 *
 * Sursa: Zac Poonen, "Basic Christian Teachings", capitolele 59-63, 65, 67 (cfcindia.com).
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

const COURSE_ID = "teme_c13_pacate"

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
        prompt: "Ce vezi în tine?",
        options: [
          { id: `${p}c1`, label: "Nu credeam că este păcat." },
          { id: `${p}c2`, label: "Știu că este, dar îl țin ascuns." },
          { id: `${p}c3`, label: "Vreau să fiu izbăvit de tot." },
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
        "Numele Isus înseamnă Mântuitor: El a venit să mântuiască pe poporul Lui de păcatele lor.",
        "Ferice de cei flămânzi și însetați după neprihănire, căci ei vor fi săturați.",
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

export const PACATELE_CARE_NE_DISTRUG_LESSONS: Lesson[] = [
  make({
    id: "pacat_l1",
    order: 1,
    title: "Fățărnicia",
    refs: ["Matei 1:21", "Matei 23:13", "Marcu 7:6", "Matei 25:1-13", "Faptele Apostolilor 5"],
    ref: "Marcu 7:6",
    hook: "Isus n-a vorbit niciodată așa unei curve sau unui ucigaș. Dar oamenilor religioși ai vremii Lui le-a spus: vai de voi, fățarnicilor.",
    word: "Norodul acesta Mă cinstește cu buzele, dar inima lui este departe de Mine.",
    truth: [
      "Vei chema Numele Lui Isus, pentru că El va mântui pe poporul Lui de păcatele sale. Dacă vrei să știi ce înseamnă a fi mântuit de păcat, trebuie să știi ce este păcatul.",
      "Dacă socotim ca păcat numai beția, jocurile de noroc și desfrânarea, atunci mulți oameni nici n-ar avea nevoie de Isus. Dar Isus a vorbit despre alte păcate, care nici nu sunt scrise în cele Zece Porunci.",
      "Păcatul nu este mai întâi pe dinafară. Un pom de mango rămâne pom de mango și dacă nu face roade. Păcatul este în inimă; din inimă ies gândurile rele, uciderile și preacurviile.",
      "Gândurile lui Dumnezeu despre păcat nu sunt gândurile noastre. Iar cel dintâi în rândul acestora este fățărnicia.",
      "În Vechiul Testament aproape că nu găsești osândirea fățărniciei. Prooroci vorbeau împotriva preacurviei, a idolilor, a lăcomiei. Dar când a venit Isus, El a vorbit mai mult decât orice împotriva fățărniciei.",
      "Pe femeia prinsă în preacurvie n-a vrut s-o ucidă cu pietre; i-a scăpat viața. Pe tâlharul de lângă El pe cruce l-a iertat. Dar pe cărturari și pe farisei i-a osândit pe față: vai de voi, fățarnicilor - de șapte ori în Matei 23 - și i-a numit pui de năpârci.",
      "De ce? Fiindcă ziceau lucruri frumoase cu buzele, în timp ce inima lor era departe de El. Ce aveau mai mult decât ei curvele și ucigașii? Nimic pe dinafară - dar erau cinstiți. Ucigașul nu se prefăcea că este sfânt.",
      "A fi fățarnic înseamnă a fi mincinos: să dai altora impresia că ești duhovnicesc când nu ești.",
      "Gândiți-vă la cele zece fecioare. Pe dinafară erau la fel: aceleași haine albe, aceleași candele aprinse. Deosebirea era înăuntru: cinci aveau untdelemn de rezervă. Viața din afară nu ne pregătește pentru venirea Domnului; trebuie să fie și o viață ascunsă cu Dumnezeu.",
      "Care a fost cel dintâi păcat judecat în biserica de la început? Nu uciderea, nici preacurvia. Anania și Safira n-au înșelat pe nimeni și n-au făcut rău nimănui; s-au prefăcut doar că sunt cu totul dăruiți Domnului. Și au murit.",
    ],
    wrongA: "Cele mai grele păcate sunt uciderea și preacurvia.",
    right: "Isus a așezat fățărnicia deasupra tuturor: prefacerea că ești sfânt când nu ești.",
    wrongB: "Dacă viața mea de afară este în rânduială, sunt gata pentru venirea Lui.",
    explanation:
      "Cinci fecioare au rămas afară tocmai fiindcă nu aveau viața ascunsă - vasul cu untdelemn.",
    step: "Spune azi cuiva un lucru adevărat despre tine, în loc de impresia pe care o lași de obicei.",
    prayer: "Doamne, nu mai vreau să joc teatru. Fă-mă același și acasă, și în adunare.",
    journal: "Unde lași impresia că ești mai duhovnicesc decât ești?",
    memory: "Norodul acesta Mă cinstește cu buzele, dar inima lui este departe de Mine.",
  }),
  make({
    id: "pacat_l2",
    order: 2,
    title: "Mândria",
    refs: ["Luca 18:9-14", "1 Petru 5:5", "1 Corinteni 4:7", "Filipeni 2:8"],
    ref: "1 Petru 5:5",
    hook: "Mândria l-a făcut pe diavol diavol. Până atunci era un înger desăvârșit. N-a trebuit nici o secundă.",
    word: "Dumnezeu stă împotriva celor mândri, dar celor smeriți le dă har.",
    truth: [
      "Este păcatul mai grav decât boala? Dacă Isus ți-ar spune: te scap ori de toate păcatele, ori de toate bolile - ce ai alege? Cei mai mulți ar alege sănătatea, fiindcă n-au înțeles cât de grav este păcatul.",
      "Pustiirea pe care o face păcatul în suflet nu se vede. Este ca la fumător: plămânii i se strică și el nu vede. Dacă ar vedea, s-ar lăsa.",
      "Isus a spus pilda celor doi oameni care s-au suit la Templu. Fariseul a spus: Dumnezeule, Îți mulțumesc că nu sunt ca ceilalți oameni. Vameșul a spus: Dumnezeule, ai milă de mine, păcătosul. Isus a spus că vameșul s-a pogorât acasă socotit neprihănit. Care a fost păcatul fariseului? Mândria.",
      "Dumnezeu stă împotriva celor mândri. Oriunde găsește mândrie, El luptă împotriva ei, fiindcă este împotriva firii Lui.",
      "Nouă nu ni se face silă de mândrie, fiindcă este parte din firea noastră. Suntem ca porcul care se tăvălește în mocirlă și i se pare bine. Dar Isus S-a smerit, S-a coborât din cer și S-a făcut rob, și a arătat astfel cum este firea lui Dumnezeu.",
      "Când ești mândru de ceva - de frumusețea ta, de mintea ta, de casa ta, de ce ai izbutit, de locul tău în societate, de neamul din care te tragi - este păcat. Nu este niciun rău în a fi frumos sau deștept; răul este să fii mândru de asta.",
      "Mulți vor să fie mântuiți de iad. Dar Biblia aproape că nu vorbește despre mântuirea de iad, ci despre mântuirea de păcat. Dacă ești mântuit de păcat, ești mântuit de iad de la sine.",
      "Ce lucru ai pe care să nu-l fi primit? Sănătatea, chipul, mintea, casa, slujba, locul tău - n-ai ales niciunul. Vei zice: am agonisit multe. Da, fiindcă Dumnezeu ți-a dat sănătate. Dacă erai paralizat sau orb, n-ai fi izbutit nimic.",
      "Și cunoștința Bibliei poate fi pricină de mândrie. Un predicator care se întoarce acasă și se felicită că este căutat pretutindeni este cel mai mare păcătos - nu pentru predică, ci pentru mândrie.",
      "Ori de câte ori privim de sus pe alții, suntem mândri. Gândiți-vă la fiul cel mare din pildă: se uita de sus la fratele lui. Poți fi mândru chiar și de sfințenia ta sau de biserica de care aparții.",
    ],
    wrongA: "Mândria nu este păcat, fiindcă nu este în cele Zece Porunci.",
    right: "Mândria este firea Satanei; Dumnezeu îi stă împotrivă oriunde o găsește.",
    wrongB: "Am ceva cu care mă pot lăuda pe drept.",
    explanation:
      "Ce lucru ai pe care să nu-l fi primit? Toate sunt daruri.",
    step: "Recunoaște azi, înaintea cuiva, un lucru la care ești mai slab decât el.",
    prayer: "Doamne, arată-mi unde este mândrie în mine și mântuiește-mă de ea.",
    journal: "Cu ce te-ai lăudat în gând săptămâna aceasta?",
    memory: "Dumnezeu stă împotriva celor mândri.",
  }),
  make({
    id: "pacat_l3",
    order: 3,
    title: "Egoismul",
    refs: ["Luca 10:30-37", "Luca 16:19-31", "Faptele Apostolilor 20:35", "Iacov 2:15-17"],
    ref: "Faptele Apostolilor 20:35",
    hook: "Preotul și levitul se grăbeau spre slujba de la Templu. Au trecut pe partea cealaltă a drumului și l-au lăsat acolo.",
    word: "Este mai ferice să dai decât să primești.",
    truth: [
      "Oamenii religioși pot fi uneori foarte egoiști. Poți fi destul de religios cât să fii preot sau episcop și să fii cu totul egoist.",
      "Ne naștem toți egoiști. Copiii nu știu de la sine să împartă jucăriile; se bat pentru cea mai mare bucată de prăjitură. Când creștem, nu ne mai batem așa de fățiș, dar tot o vrem; egoismul s-a făcut doar mai ascuns și mai iscusit.",
      "Dacă Isus te-a mântuit numai de jocuri de noroc și de beție, ce fel de mântuire este aceea? Îți pot arăta zece oameni din lume care nu fac nici ei asta, fără să-L aibă pe Hristos.",
      "Egoismul poate fi și în privința mântuirii: eu sunt mântuit, familia mea este mântuită, ceilalți nu mă privesc. Nu vorbesc de oameni de la zece mii de kilometri, ci de cei cu care lucrezi, de vecinii tăi, de rudele tale.",
      "Dacă spun că sunt părtaș firii lui Dumnezeu și sunt tot egoist, mă amăgesc singur, fiindcă firea lui Dumnezeu este cu totul lipsită de egoism. Isus n-a căutat niciodată ce era al Lui; a venit în întregime pentru alții.",
      "Cel care se gândește mereu la ce primește este un om egoist. Cel care se gândește să dea este cel căruia îi pasă de alții. Ce dă? Ce are el însuși - fie lucruri materiale, fie duhovnicești.",
      "Bogatul din pildă avea la poartă pe Lazăr, care îi era frate după Avraam. Trecea pe lângă el și nu l-a ajutat niciodată. A murit și s-a dus în iad. De ce? Fiindcă n-a avut credință.",
      "De unde știm că n-a avut credință? Iacov spune: dacă un frate este gol și lipsit de hrana zilnică, iar voi îi ziceți: duceți-vă în pace, și nu-i dați cele trebuincioase trupului, la ce folosește? O astfel de credință este moartă.",
      "Tot ce avem ne este dat de Dumnezeu, ca să se vadă dacă împărțim cu alții sau trăim numai pentru noi. Și tot așa este și duhovnicește: ce mi-a dat Dumnezeu mă face dator față de cei din jurul meu.",
      "Cel darnic va fi săturat, și cine udă pe alții va fi udat și el.",
    ],
    wrongA: "Egoismul este firesc și nu este păcat.",
    right: "Egoismul este păcat; firea lui Dumnezeu este cu totul lipsită de egoism.",
    wrongB: "Este mai ferice să primești decât să dai.",
    explanation:
      "Bogatul n-a mers în iad pentru bogăție, ci pentru că nu avea credință - iar dovada era că nu-i păsa de nimeni.",
    step: "Dă azi cuiva, fără să afle nimeni, ceva de care are nevoie.",
    prayer: "Doamne, scoate din mine viața trăită numai pentru mine.",
    journal: "Pe cine ai văzut în lipsă și ai trecut pe partea cealaltă?",
    memory: "Este mai ferice să dai decât să primești.",
  }),
  make({
    id: "pacat_l4",
    order: 4,
    title: "Ura",
    refs: ["1 Ioan 3:15", "Matei 15:18-19", "Matei 18:28", "Matei 5:6"],
    ref: "1 Ioan 3:15",
    hook: "Iată scanarea inimii tale: te bucuri puțin când aude că i s-a întâmplat ceva rău? Te întristezi puțin când afli că i-a mers bine?",
    word: "Oricine urăște pe fratele său este un ucigaș.",
    truth: [
      "Mulți nu socotesc ura ca păcat. Noul Testament spune: oricine urăște pe fratele său este un ucigaș. Atât de grav este. Poate n-ai prilejul să ucizi; poate te temi că vei fi prins. Dar nu te-ar deranja dacă l-ar lovi o nenorocire.",
      "Zici: eu nu urăsc pe nimeni. Atunci întreabă-te: cineva ți-a făcut rău, te-a înșelat, ți-a stricat numele, te-a împins la o parte la slujbă. Spui că l-ai iertat. Dar când auzi că i s-a întâmplat o nenorocire, simți o bucurie mică? Aceea arată că îl urăști.",
      "N-ai fi niciodată bucuros de o nenorocire căzută peste copilul tău. De ce te bucuri când cade peste omul pe care spui că l-ai iertat?",
      "Sau invers: auzi că i-a mers bine, că a fost înălțat în slujbă, și te simți puțin nemulțumit. Și asta arată că îl urăști. N-ai fi nemulțumit dacă fiul tău ar ieși cel dintâi în clasă; dar dacă iese fiul altuia?",
      "Aceasta este ca o scanare a inimii. La spital, scanarea arată ce nu se vede: doctorul spune că ai o umflătură acolo, chiar dacă tu te simți bine. Aici scanarea spune că ai o umflătură numită amărăciune. Scoate-o.",
      "Ura are mulți copii: amărăciunea, gelozia, mânia, duhul care nu iartă. Toți se nasc din mama aceasta.",
      "Dumnezeu este dragoste. Care este atunci firea Satanei? Ura. Când ai ură în inimă, ești în părtășie cu Satana, fie că știi, fie că nu.",
      "Îți poți stăpâni mânia și îți poți ține amărăciunea înăuntru - dar asta este ca o încuietoare: gunoiul rămâne. Dacă boala este înăuntru, te ucide chiar dacă nu se vede pe dinafară. Și cine știe dacă este acolo? Tu însuți.",
      "Isus a vorbit despre omul care l-a apucat de gât pe tovarășul său pentru o datorie mică, după ce lui i se iertase una uriașă. Nu este vorba să tai roada, ci să faci pomul bun.",
      "Din inimă ies gândurile rele și uciderile - acestea spurcă pe om. Rădăcina amărăciunii, rădăcina geloziei, rădăcina duhului care nu iartă - acestea trebuie curățate.",
      "Ferice de cei flămânzi și însetați după neprihănire, căci ei vor fi săturați. Nu ajunge o rugăciune slabă. Dacă ai afla că ai lepră, ai alerga din spital în spital. Când vei dori tot așa să fii izbăvit de ură, Isus te va izbăvi.",
    ],
    wrongA: "Cât timp nu arăt nimic pe dinafară, nu este păcat.",
    right: "Ura este ucidere în inimă; ea se vede după cum te bucuri sau te întristezi de ce li se întâmplă altora.",
    wrongB: "Este destul să-mi stăpânesc mânia.",
    explanation:
      "Nu tăia roada; fă pomul bun. Rădăcina trebuie curățată.",
    step: "Cere-I azi lui Dumnezeu binele - anume, pe nume - pentru omul care ți-a făcut rău.",
    prayer: "Doamne, curăță-mi inima de ură și de toți copiii ei.",
    journal: "A cui izbândă te-a întristat?",
    memory: "Oricine urăște pe fratele său este un ucigaș.",
  }),
  make({
    id: "pacat_l5",
    order: 5,
    title: "Necredința",
    refs: ["Marcu 4:40", "Evrei 3:12", "Romani 8:28", "Matei 10:29-31"],
    ref: "Evrei 3:12",
    hook: "Când Isus i-a mustrat pe ucenici, cea mai aspră mustrare a fost pentru un singur păcat: necredința.",
    word: "Luați seama dar, fraților, ca niciunul dintre voi să n-aibă o inimă rea și necredincioasă.",
    truth: [
      "Când furtuna umplea corabia, ucenicii L-au trezit: Învățătorule, nu-Ți pasă că pierim? El a certat vântul și le-a spus: cum de nu aveți credință?",
      "Necredința nu este socotită păcat de nimeni în lume. Trist este că nici credincioșii n-o socotesc păcat, ci o slăbiciune: n-am destulă credință, frate. Dar nu este slăbiciune; Isus a mustrat-o ca păcat.",
      "Este numită inimă rea și necredincioasă. Înțelegem că o inimă preacurvară este rea, sau una ucigașă. Dar cine spune că o inimă necredincioasă este o inimă rea? Și totuși așa scrie - și te poate face să te depărtezi de Dumnezeul cel viu.",
      "De șapte ori i-a mustrat Isus pe ucenici pentru necredință, chiar și după înviere. Nu că ar fi biruit celelalte păcate - se certau încă cine este cel mai mare. Dar El i-a mustrat pentru necredință.",
      "Necredința este păcat fiindcă este o jignire adusă lui Dumnezeu. Dacă tatăl tău ți-ar scrie că ți-a pus bani în cont pentru taxe, iar tu ai spune: nu sunt sigur că a făcut-o, poate mă amăgește - nu l-ai jigni?",
      "Crezi că, atunci când spune nicidecum n-am să te las, nicidecum nu te voi părăsi, chiar așa este? Crezi că toate lucrurile lucrează împreună spre binele celor ce iubesc pe Dumnezeu - inclusiv răul pe care ți-l fac oamenii? Dacă ai crede, nu l-ai mai urî pe acel om.",
      "De ce se tem atâția credincioși de diavolul? Fiindcă nu cred că a fost biruit la cruce. Scriptura spune că prin moarte a nimicit puterea diavolului. Dacă ai crede, nu te-ai mai teme nici de el, nici de vrăjitorie.",
      "Credința și frica sunt potrivnice. Nu pot locui în aceeași inimă. Când intră credința, iese frica - ca lumina care alungă întunericul.",
      "Iov a spus: El știe ce cale am urmat. Adică: Dumnezeu cunoaște orice amănunt din ce mi se întâmplă. Crezi asta?",
      "Nici o vrabie nu cade pe pământ fără știrea Tatălui vostru, iar vouă până și perii din cap vă sunt numărați. Nimeni nu-și poate număra perii din cap - dar Tatăl știe numărul lor.",
      "Când nu te încrezi în El, Îl jignești. Închipuie-ți că intri noaptea în camera copilului tău de patru ani și îl găsești treaz, speriat, spunând: mi-a fost frică să nu vii să-mi faci rău. Cum te-ai simți? Așa Se simte Dumnezeu când crezi că El îți va face rău.",
      "Să ținem minte aceste cinci: fățărnicia, mândria, egoismul, ura și necredința. Cere-I lui Isus să te mântuiască de toate cinci.",
    ],
    wrongA: "Necredința este doar o slăbiciune.",
    right: "Necredința este păcat: este o jignire adusă lui Dumnezeu, care a vorbit.",
    wrongB: "Pot avea în același timp și credință, și frică.",
    explanation:
      "Când intră credința, iese frica, așa cum lumina alungă întunericul.",
    step: "Ia azi o făgăduință din Cuvânt și spune-I: Doamne, o cred, așa cum ai spus.",
    prayer: "Doamne, iartă-mi necredința. Cred; ajută necredinței mele.",
    journal: "Ce ai spus Cuvântului lui Dumnezeu că nu se poate?",
    memory: "Să n-aibă niciunul dintre voi o inimă rea și necredincioasă.",
  }),
  make({
    id: "pacat_l6",
    order: 6,
    title: "Minciuna",
    refs: ["Ioan 8:44", "Matei 5:37", "Ieremia 3:13", "Geneza 3:4", "Apocalipsa 22:15"],
    ref: "Ioan 8:44",
    hook: "Cel dintâi păcat pomenit în Biblie și cel din urmă păcat pomenit în Biblie sunt același: minciuna.",
    word: "Ori de câte ori spune o minciună, vorbește din ale lui, căci este mincinos și tatăl minciunii.",
    truth: [
      "Isus le-a spus unora care crezuseră în El: voi aveți de tată pe diavolul. Este o credință doar cu mintea, care lasă omul copil al diavolului. Nu-i insulta; le spunea un adevăr, ca să poată fi izbăviți. Până nu recunoaștem ce suntem, Dumnezeu nu ne poate izbăvi.",
      "Cum Dumnezeu este dragoste și Satana este ură, tot așa Isus este adevărul și diavolul este mincinos. Când spui o minciună, îi dai Satanei inima și limba ta ca să nască un copil numit minciună.",
      "Isus a spus: felul vostru de vorbire să fie: da, da; nu, nu; ce trece peste acestea vine de la cel rău. Și a spus să nu jurăm deloc. Când un om jură, ce spune de fapt? Că de obicei minte, dar acum spune adevărul. Nu trebuie să fie nicio deosebire între ce spui sub jurământ și ce spui fără.",
      "Ce cere Dumnezeu de la noi când venim la El? Nu desăvârșirea, nu curăția, nu bunătatea - ci cinstea. Numai recunoaște-ți nelegiuirea, spune Domnul.",
      "Ce virtute avea femeia prinsă în preacurvie? Cinstea. Iar tâlharul de pe cruce a spus: noi primim răsplata cuvenită. Celălalt n-a vrut să recunoască. N-a mers în iad fiindcă era tâlhar, ci fiindcă era necinstit.",
      "Raiul nu este făcut pentru oameni desăvârșiți, ci pentru oameni cinstiți.",
      "Cel dintâi păcat pomenit în Biblie nu este al Evei, ci al Satanei: hotărât că nu veți muri. Aceasta este cea dintâi minciună: poți să nu asculți de Dumnezeu și nu vei fi pedepsit. Cu ea a înșelat el tot neamul omenesc până azi.",
      "Pentru că nu se aduce repede la îndeplinire hotărârea dată împotriva faptelor rele, de aceea este plină inima oamenilor de dorința să facă rău. Fiindcă Dumnezeu nu pedepsește îndată, oamenii cred că au scăpat. N-au scăpat; judecata încă n-a venit.",
      "Cel din urmă păcat pomenit în Biblie: afară sunt toți cei ce iubesc minciuna și trăiesc în minciună.",
      "Petru i-a spus lui Anania: pentru ce ai mințit pe Duhul Sfânt? Cel dintâi păcat judecat în biserica de la început a fost minciuna.",
      "De aceea, unul dintre cele mai însemnate lucruri pe care le avem de învățat pe copiii noștri este să nu mintă. Ei se nasc cu firea noastră și mint de mici. Trebuie să vadă la noi că ne ținem cuvântul, sau că le lămurim de ce n-am putut.",
      "Adevărul este o virtute pentru care trebuie să te lupți din toată inima. Duhul Sfânt este Duhul adevărului: cere-I să te umple și să omoare deprinderea minciunii în toată vorbirea ta.",
    ],
    wrongA: "Dumnezeu cere de la mine mai întâi curăția.",
    right: "Cel dintâi lucru pe care îl cere Dumnezeu este cinstea.",
    wrongB: "O minciună mică nu strică nimănui.",
    explanation:
      "Tâlharul iertat nu era mai bun, ci mai cinstit. Raiul este făcut pentru oameni cinstiți.",
    step: "Îndreaptă azi o vorbă pe care ai spus-o altfel decât a fost.",
    prayer: "Duhule al adevărului, umple-mă și scoate din vorbirea mea orice minciună.",
    journal: "Unde ai înfrumusețat adevărul în ultima vreme?",
    memory: "Este mincinos și tatăl minciunii.",
  }),
  make({
    id: "pacat_l7",
    order: 7,
    title: "Mânia",
    refs: ["Efeseni 4:26-27", "Marcu 3:5", "Geneza 4:6-7", "1 Samuel 18:7-8"],
    ref: "Efeseni 4:26",
    hook: "Este o mânie care nu este păcat și o mânie care este. Deosebirea stă într-un singur lucru: pentru cine te-ai mâniat.",
    word: "Mâniați-vă și nu păcătuiți. Să n-apună soarele peste mânia voastră.",
    truth: [
      "Când Isus a văzut în sinagogă lipsa de milă a fariseilor față de omul cu mâna uscată, S-a uitat la ei cu mânie, mâhnit de împietrirea inimii lor. Nu Și-a pierdut stăpânirea de sine; dacă Și-ar fi pierdut-o, n-ar fi fost mâhnit. Și când a văzut pe zarafi făcând bani în Numele credinței, i-a scos afară - iarăși fără să-Și piardă stăpânirea.",
      "Omul plin de Duhul este plin de înfrânare. El poate fi mâniat când vede oameni fără milă față de cei ce suferă sau oameni care fac bani în numele credinței. Mânia aceasta, care privește slava lui Dumnezeu și binele altora, nu este păcat.",
      "Dar mânia care mă privește pe mine - că m-a înșelat cineva, că mi-a stricat planurile, că m-a supărat - este întotdeauna păcat. Când L-au pălmuit pe Isus și I-au smuls părul din barbă, El nu S-a mâniat. I-a iertat.",
      "Apoi Scriptura spune: dacă totuși păcătuiești așa, vezi ca mânia să nu rămână la tine mai mult de douăsprezece ceasuri. Dumnezeu știe că mulți credincioși nu vor avea biruință asupra mâniei, fiindcă nu sunt destul de hotărâți - și le dă o măsură mai mică: să n-apună soarele.",
      "Pe atunci ziua ținea de la șase dimineața până la apus, iar noaptea de la apus până la răsărit. Deci cuvântul pentru noi este: să nu te culci cu mânia nedescurcată în inimă.",
      "Cât de grijulii sunt oamenii să se spele pe dinți înainte de culcare, ca să nu rămână firimituri care să le strice dinții. Cu cât mai mult ar trebui să veghem să nu rămână în inimă amărăciune necurățată când adormim. Soțul și soția să așeze lucrurile înainte de culcare.",
      "Ce să mai spunem despre credincioșii care poartă mânie și amărăciune zile, luni și ani? Trebuie să spunem că n-au frică de Dumnezeu și nu cinstesc Cuvântul Lui.",
      "Când lași mânia să rămână în inimă, dai prilej diavolului. Îi dai un loc de sprijin ca să te stăpânească și să aducă învălmășeală în viața ta.",
      "Cel dintâi păcat pomenit după ce omul a ieșit din Eden este mânia. Cain s-a mâniat foarte tare și i s-a posomorât fața. Când un om este mâniat, se vede pe fața lui; Dumnezeu ne-a făcut așa încât nu se poate ascunde.",
      "Domnul i-a spus: de ce te-ai mâniat? Dacă faci bine, nu vei fi bine primit? Păcatul pândește la ușă și dorința lui se ține după tine, dar tu să-l stăpânești. Aici este cea dintâi predică despre biruința asupra păcatului, ținută de Dumnezeu Însuși. Cain n-a ascultat și a ajuns ucigaș.",
      "Mânia lui a ieșit din gelozie: Dumnezeu îl binecuvânta pe Abel, cel mai tânăr, și el n-a putut răbda. Ești gelos pe cineva mai tânăr decât tine, pe care Domnul îl binecuvântează?",
      "La fel Saul: când femeile cântau că David a bătut zecile de mii, s-a mâniat foarte tare. A doua zi a venit peste el un duh rău și a aruncat cu sulița ca să-l ucidă pe David. Este primejdios să lași mânia să stăruie.",
      "Caută-L pe Dumnezeu din toată inima ca să fii cu totul izbăvit de mânie. De câte ori aluneci, strigă la El: Doamne, am păcătuit, izbăvește-mă cu totul.",
    ],
    wrongA: "Orice mânie este păcat.",
    right: "Mânia pentru slava lui Dumnezeu și binele altora nu este păcat; mânia pentru mine însumi este întotdeauna păcat.",
    wrongB: "Pot amâna împăcarea câteva zile.",
    explanation:
      "Măsura cea mai largă îngăduită este apusul soarelui. Dincolo de el, dai prilej diavolului.",
    step: "Nu te culca azi până nu așezi lucrul care a rămas nedescurcat.",
    prayer: "Doamne, izbăvește-mă cu totul de mânia care pornește din mine însumi.",
    journal: "Cu ce mânie te-ai culcat în ultima vreme?",
    memory: "Să n-apună soarele peste mânia voastră.",
  }),
]
