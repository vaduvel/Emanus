import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 5 din docs/41-module-teme-poonen.md: "Faptele moarte și harul".
 * Temele 17-21.
 *
 * Sursa: Zac Poonen, "Basic Christian Teachings", capitolele 17-21 (cfcindia.com).
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

const COURSE_ID = "teme_c5_fapte_moarte"

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
        prompt: "Cum stai cu lucrul acesta?",
        options: [
          { id: `${p}c1`, label: "Nu m-am cercetat niciodată așa." },
          { id: `${p}c2`, label: "Recunosc ceva din mine aici." },
          { id: `${p}c3`, label: "Vreau să mă curăț de faptele moarte." },
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
        "Sângele lui Hristos nu ne curăță doar de păcate, ci și de faptele moarte, ca să slujim Dumnezeului celui viu.",
        "Sub har, păcatul nu mai are stăpânire peste tine.",
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

export const FAPTELE_MOARTE_SI_HARUL_LESSONS: Lesson[] = [
  make({
    id: "fmoarte_l1",
    order: 1,
    title: "Ce sunt faptele moarte",
    refs: ["Evrei 6:1", "Evrei 9:14", "2 Corinteni 9:7", "Deuteronomul 28:47"],
    ref: "Evrei 9:14",
    hook: "În Vechiul Testament sunt doar fapte bune și fapte rele. În Noul Testament mai apare ceva: faptele moarte. Și tocmai ele sunt cele mai înșelătoare.",
    word: "Cu cât mai mult sângele lui Hristos vă curăți cugetul vostru de faptele moarte, ca să slujiți Dumnezeului celui viu!",
    truth: [
      "Faptele firii pământești - curvia, cearta, gelozia, izbucnirile de mânie - sunt atât de vădit păcătoase încât conștiința ne spune îndată. Nu sunt primejdioase în sensul că nu ne pot înșela.",
      "Faptele moarte sunt mai înșelătoare. Sunt fapte care par bune pe dinafară, dar izvorăsc dintr-un motiv stricat. De aceea sunt ca niște haine murdare înaintea lui Dumnezeu.",
      "Este ca și cum un om plin de lepră ți-ar întinde un măr de cea mai bună calitate cu mâna lui bolnavă. Ai mânca mărul? Mărul poate fi bun, dar este atins de boala din mâna aceea. Așa este când aducem lui Dumnezeu ceva bun, dar molipsit de un motiv greșit.",
      "Poate fi o rugăciune, poate fi un cântec la o adunare, iar ținta ta să fie cinstea pentru tine. Ce este atunci - faptă bună sau rea? Este o faptă moartă.",
      "Se știe că sângele lui Isus ne curățește de orice păcat. Mai puțin se știe că sângele lui Hristos trebuie să ne curețe și de faptele moarte, înainte de a putea sluji Dumnezeului celui viu.",
      "Cea dintâi însușire a faptelor moarte: lucruri făcute fără bucurie. Făcute de silă, din nevoie sau de frica pedepsei. Ca un copil pus să-și facă tema cu amenințarea beței, care se așază posac la masă. Tema este un lucru bun, dar făcută silit.",
      "Așa dau mulți zeciuială: nu cu bucurie, ci pentru că li s-a spus că altfel vor fi pedepsiți cu vreo boală. Crezi că Îl interesează pe Dumnezeu asemenea tehnici prin care oamenii sunt siliți să dea bani? Departe de asta. Scriptura spune că Dumnezeu iubește pe cel ce dă cu bucurie.",
      "Israeliții au ajuns robi în mai multe rânduri fiindcă nu I-au slujit Domnului cu bucurie și cu inimă bună, pentru belșugul de bunuri pe care li-l dăduse.",
      "A doua însușire: lucruri făcute fără dragoste. Într-o casă de tineri căsătoriți, soția face totul din dragoste: gătește, spală, are grijă de casă. După douăzeci de ani, în aceeași casă, tot gătește, tot spală, dar nu mai este din dragoste.",
      "Ce a întrebat Domnul de trei ori pe Petru, când l-a așezat din nou? O singură întrebare: Mă iubești? A spus: dacă Mă iubiți, veți păzi poruncile Mele - nu dacă vă temeți de Mine. Ce se face din frică este faptă moartă. Ce se face din dragoste este faptă vie.",
    ],
    wrongA: "Faptele moarte sunt de fapt păcate pe față.",
    right: "Sunt fapte bune pe dinafară, izvorâte dintr-un motiv stricat: fără bucurie, fără dragoste.",
    wrongB: "Dacă lucrul făcut este bun, motivul nu contează.",
    explanation:
      "În Noul Testament sunt trei feluri de lucrări: bune, rele și moarte. De faptele moarte Scriptura ne cheamă să ne pocăim.",
    step: "Alege o lucrare pe care o faci pentru Dumnezeu și întreabă-te cinstit: o fac cu bucurie și din dragoste, sau de silă?",
    prayer: "Doamne, curățește-mi cugetul de faptele moarte, ca să pot sluji Dumnezeului celui viu.",
    journal: "Ce faci de mult timp din obișnuință, deși la început făceai din dragoste?",
    memory: "Sângele lui Hristos vă curăți cugetul vostru de faptele moarte.",
  }),
  make({
    id: "fmoarte_l2",
    order: 2,
    title: "Fără râvnă, fără credință, pentru cinste",
    refs: ["Apocalipsa 3:15-19", "Romani 12:11", "Romani 14:22", "Luca 16:15"],
    ref: "Apocalipsa 3:16",
    hook: "Lumea spune: mai bine ceva decât nimic. Domnul, se pare, nu crede asta. El spune: aș vrea să fii rece sau în clocot.",
    word: "Fiindcă ești căldicel, nici rece, nici în clocot, am să te vărs din gura Mea.",
    truth: [
      "A treia însușire a faptelor moarte: lucruri făcute fără râvnă. Domnul i-a spus adunării din Laodiceea: ești căldicel, nu ești aprins, ești cu jumătate de inimă. Aș vrea să fii ori rece, ori în clocot. Și la urmă a zis: fii plin de râvnă.",
      "Când Îl lauzi pe Domnul, unul spune aleluia și altul spune aleluia, și între cei doi poate fi o lume de deosebire. La unul iese din adâncul inimii; celălalt a rostit cuvântul potrivit. Nu este păcat să spui aleluia, dar la el este faptă moartă.",
      "Știi ce este o adunare de rugăciune moartă? Nu una în care s-au cerut lucruri păcătoase. S-au cerut lucruri bune, dar fără viață.",
      "În Vechiul Testament nu există expresia ascultarea credinței. Era doar ascultare. În Noul Testament, Pavel o repetă. Se spune că o credință fără fapte este moartă; putem spune și că faptele fără credință sunt moarte, pentru că fără credință este cu neputință să fim plăcuți lui Dumnezeu.",
      "La ce folosește o adunare de rugăciune de un ceas în care nu crezi niciun lucru pe care îl ceri? Un minut de rugăciune cu credință este mai primit înaintea lui Dumnezeu decât o noapte întreagă de rugăciune care este doar un obicei.",
      "Credința înseamnă și încredințare personală. Când faci ceva doar ca să imiți pe altul, sau numai fiindcă un om al lui Dumnezeu învață așa, fără încredințarea ta, este faptă moartă. Imitația aduce întotdeauna moarte.",
      "Israeliții au trecut Marea Roșie prin credință. Egiptenii i-au imitat și s-au înecat. Ce le-a adus imitația? Moartea. Este scris pentru avertizarea noastră.",
      "Dumnezeu nu vrea să fii ca altcineva; vrea să fii tu însuți. Te-a făcut cu firea ta, cu trecutul tău și cu creșterea ta. Fii mulțumitor și fă ce poți tu. Asta Îi este mult mai plăcut decât dacă încerci să imiți pe altul.",
      "A cincea însușire: lucrări făcute pentru câștig sau cinste personală. Domnul i-a spus celui din Sardes: ai numele că trăiești. Orice facem ca să impresionăm un om este faptă moartă. O lucrare vie se face ca să fie văzută de Dumnezeu, în ascuns, fără ca stânga să știe ce face dreapta.",
      "Nebucadnețar se plimba pe acoperișul palatului și spunea: iată ce împărăție mare am zidit eu. Când privești lucrarea ta și spui ce grozav este ce am făcut, zidești Babilon.",
    ],
    wrongA: "Cantitatea rugăciunii cântărește cel mai mult.",
    right: "Un minut de rugăciune cu credință prețuiește mai mult decât o noapte fără credință.",
    wrongB: "E bine să imit lucrarea unui om al lui Dumnezeu.",
    explanation:
      "Ce este înalt în ochii oamenilor este urăciune înaintea lui Dumnezeu. Nu forma lucrării hotărăște, ci râvna, credința și motivul din spatele ei.",
    step: "Fă astăzi o singură faptă bună despre care să nu afle nimeni.",
    prayer: "Doamne, aprinde-mă. Nu vreau să fiu căldicel și nu vreau să lucrez ca să fiu văzut.",
    journal: "Ce faci în viața ta duhovnicească doar din imitație, fără încredințare proprie?",
    memory: "Fiindcă ești căldicel, am să te vărs din gura Mea.",
  }),
  make({
    id: "fmoarte_l3",
    order: 3,
    title: "Din conștiință încărcată, din frică, pentru răsplată",
    refs: ["Romani 2:15", "Ioan 14:15", "Matei 19:27", "Matei 20:1-16"],
    ref: "Ioan 14:15",
    hook: "Sunt lucruri bune pe care le facem doar ca să ne liniștim conștiința, ca să scăpăm de frica pedepsei sau ca să primim o răsplată. Toate acestea sunt fapte moarte.",
    word: "Dacă Mă iubiți, veți păzi poruncile Mele.",
    truth: [
      "A șasea însușire: lucruri făcute doar ca să-ți liniștești conștiința. Dimineața îți spune conștiința că n-ai citit Biblia. Deschizi două minute, citești un psalm sau câteva proverbe și închizi. Conștiința s-a liniștit și poți pleca la lucru împăcat, poate și de teamă să nu pățești ceva pe drum. Aceasta nu este viață duhovnicească, este superstiție.",
      "Este ca și când pun oamenii Biblia sub pernă ca să aibă vise curate. Tot superstiție.",
      "Este însă o deosebire între acestea și disciplina. Nu citim Biblia doar când avem chef. Nu mergi la lucru doar când ai chef și nu-ți trimiți copiii la școală doar când ai chef. Disciplina este un lucru foarte bun în viața creștină. Dar una este disciplina și alta este să faci ceva doar ca să-ți amuțești conștiința.",
      "Un predicator te poate înfierbânta: milioane pier fără Hristos, tu de ce stai? Îți lași slujba și pleci fără chemare de la Dumnezeu, iar după o vreme ești doar amărât. Ai lucrat din emoția unei clipe sau ca să scapi de o conștiință vinovată.",
      "A șaptea însușire: lucruri făcute de frica judecății lui Dumnezeu. Așa i-a putut face Dumnezeu pe cei mai mulți israeliți să asculte: dacă nu asculți, vei fi blestemat în cetate și la câmp. Așa îi facem și noi pe copii să asculte.",
      "A asculta de frica pedepsei este mai bine decât neascultarea. Dar Isus a spus: dacă Mă iubiți, veți păzi poruncile Mele - nu: dacă nu vreți să fiți pedepsiți, păziți-le.",
      "Isus nu S-a ferit de minciună fiindcă S-ar fi temut că este prins, ci fiindcă minciuna Îl necinstește pe Tatăl și este împotriva firii lui Dumnezeu.",
      "A opta însușire: lucruri făcute ca să capăți o răsplată. Așa lucrăm cu copiii: dacă termini tema, îți dau o ciocolată.",
      "Petru L-a întrebat pe Isus: noi am lăsat totul și Te-am urmat, ce va fi cu noi? Iar Isus i-a răspuns cu pilda lucrătorilor viei. Cei dintâi s-au tocmit dinainte pentru plată. Cei din urmă au venit fără nicio învoială. Și tocmai ei au fost plătiți întâi, primind pentru un ceas cât au primit ceilalți pentru douăsprezece.",
      "Acolo răspundea Domnul la întrebarea lui Petru: dacă lucrezi gândindu-te la ce vei primi, vei fi cel din urmă. Dacă lucrezi cu bucurie, fără să te gândești la răsplată, vei fi cel dintâi.",
    ],
    wrongA: "Frica de pedeapsă este un motiv bun ca să ascult.",
    right: "Dumnezeu caută ascultarea care izvorăște din dragoste și mulțumire, nu din frică sau din pofta de răsplată.",
    wrongB: "Disciplina zilnică este ea însăși o faptă moartă.",
    explanation:
      "Faptele moarte sunt mai bune decât cele rele, dar Dumnezeu ne cheamă să ne pocăim și de ele. Calitatea înseamnă pentru El mult mai mult decât cantitatea.",
    step: "Înainte de următoarea ta faptură de ascultare, oprește-te și întreabă: o fac din frică, pentru răsplată sau din dragoste?",
    prayer: "Doamne, nu vreau să Îți slujesc de frică și nici pentru plată. Vreau să Te iubesc și de acolo să vină ascultarea.",
    journal: "Ce faci în viața ta creștină doar ca să nu te mustre conștiința?",
    memory: "Dacă Mă iubiți, veți păzi poruncile Mele.",
  }),
  make({
    id: "fmoarte_l4",
    order: 4,
    title: "Fără crucea zilnică și din gândirea mea",
    refs: ["2 Corinteni 4:10", "Matei 5:14", "Ioan 5:30", "Luca 10:38-42"],
    ref: "2 Corinteni 4:10",
    hook: "Slujirea ta este apă turnată dintr-un pahar sau este revărsarea unui pahar care se umple mereu? Este un râu care curge sau o pompă de mână?",
    word: "Purtăm întotdeauna cu noi, în trupul nostru, omorârea Domnului Isus, pentru ca și viața lui Isus să se arate în trupul nostru.",
    truth: [
      "A noua însușire a faptelor moarte: lucruri făcute fără purtarea crucii în fiecare zi.",
      "Dacă te întreb cine este lumina lumii, cei mai mulți ar răspunde: Isus. Dar Isus a spus: cât sunt în lume, sunt Lumina lumii. Iar în rugăciunea Lui a spus Tatălui: Eu nu mai sunt în lume. Ucenicilor le-a spus: voi sunteți lumina lumii.",
      "Oamenii din lume nu pot vedea viața lui Isus în Isus, pentru că El este în cer. Unde o pot vedea? În tine și în mine. Dacă nu o văd la noi, nu o vor vedea nicăieri: în felul cum reacționăm, cum umblăm cu banii, cum vorbim cu oamenii.",
      "Este mare deosebire între a turna apă dintr-un pahar și un pahar care este umplut până dă pe dinafară. Slujirea ta pentru Domnul este ceva ce torni sau este revărsarea unei vieți pline de viața lui Isus?",
      "La mulți creștini slujirea seamănă cu o pompă de mână: pompezi și iar pompezi și iese puțină apă. La Isus nu era așa; era o revărsare.",
      "Dacă doar ne stăpânim limba să nu vorbim cu mânie și fața să nu se posomorască, dar înăuntru clocotim, atunci nu facem decât stăpânire de sine, pe care o poate face și un păgân. Nu ai nevoie de Duhul Sfânt pentru asta. Duhul a venit să aducă o moarte înăuntru, ca din lăuntrul nostru să curgă bunătatea lui Isus, fără clocot înăuntru.",
      "A zecea însușire: lucruri care izvorăsc din gândirea noastră omenească. Cel mai bun exemplu este slujirea Martei în Betania. Isus și ucenicii erau flămânzi, și ea a socotit că este un lucru bun să facă de mâncare.",
      "Dar cel mai important lucru la un slujitor este să facă exact ce îi spune stăpânul său, nu ce i se pare lui potrivit.",
      "Despre Isus este scris că nu făcea nimic de la Sine. Aștepta să audă ce voia Tatăl, nu ce Îi venea Lui să facă.",
      "Avraam a vrut să-L ajute pe Dumnezeu și a ieșit un Ismael, care a adus multă încurcătură. Ismaelii sunt faptele moarte pe care le fac mulți creștini azi, dorind sincer să-L ajute pe Dumnezeu, dar fără să caute voia Lui.",
      "Ce să facem atunci - să stăm și să nu facem nimic? Dimpotrivă. Să-L căutăm pe Dumnezeu. Dacă Îl iubești, nu este nimic dacă greșești pe drum.",
    ],
    wrongA: "Orice lucru bun pe care îl văd de făcut este voia lui Dumnezeu.",
    right: "Slujitorul face ce îi spune Stăpânul, nu ce i se pare lui bun.",
    wrongB: "Stăpânirea de sine este dovada vieții lui Hristos în mine.",
    explanation:
      "Cuvântul lui Dumnezeu desparte sufletul de duh. Lucrările sufletești, izvorâte din rațiunea mea, sunt fapte moarte, oricât de bune ar părea.",
    step: "Înainte să începi următorul lucru bun, oprește-te și întreabă-L pe Dumnezeu dacă El ți l-a dat de făcut.",
    prayer: "Doamne, nu vreau să nasc Ismaeli. Învață-mă să aștept, ca Isus, să aud ce vrei Tu.",
    journal: "Ce ai început ca să-L ajuți pe Dumnezeu, fără să-L întrebi?",
    memory: "Purtăm în trupul nostru omorârea Domnului Isus, ca și viața Lui să se arate în noi.",
  }),
  make({
    id: "fmoarte_l5",
    order: 5,
    title: "Legea și harul",
    refs: ["Romani 6:14", "Evrei 4:16", "Matei 11:11", "Evrei 10:19-20"],
    ref: "Romani 6:14",
    hook: "Păcatul nu va mai stăpâni peste voi, pentru că nu sunteți sub Lege, ci sub har. Aici este, într-o singură propoziție, toată deosebirea dintre cele două legăminte.",
    word: "Căci păcatul nu va mai stăpâni asupra voastră, pentru că nu sunteți sub Lege, ci sub har.",
    truth: [
      "Cuvântul Lege închide în el vechea înțelegere a lui Dumnezeu cu Israel, cu toate rânduielile ei. Cuvântul har închide în el noua înțelegere prin Domnul Isus, cu tot ce cuprinde ea.",
      "Dovada este aceasta: când nu ești sub Lege, ci sub har, păcatul nu te poate stăpâni. Deci felul în care aflăm sub ce trăim nu este cercetarea regulilor pe care le ținem, ci o încercare mult mai adâncă: te stăpânește păcatul, sau îl stăpânești tu?",
      "Cine este mai mare, Moise sau Domnul Isus? Răspunsul este limpede. Atunci și legământul mijlocit prin Moise este cu atât mai prejos decât cel mijlocit prin Isus, cu cât Moise este mai prejos decât Isus.",
      "Urmarea este că, dacă Legea putea aduce pe oameni la o anumită măsură de viață, harul trebuie să-i aducă la una mai înaltă. Este deosebirea dintre o bicicletă și un avion. Amândouă te duc dintr-un loc în altul, dar între ele este o lume.",
      "În cortul din Vechiul Testament era o perdea groasă între Locul Sfânt și Locul Preasfânt. Nimeni nu putea trece dincolo. Marele preot intra o dată pe an, și aceea doar ca semn.",
      "Când a murit Isus pe Golgota, perdeaua s-a rupt în două, de sus până jos, arătând că acum calea spre Dumnezeu este deschisă. Dacă fără părtășie personală cu Dumnezeu oamenii ajungeau la o anumită măsură, cu atât mai înaltă ar trebui să fie a noastră, acum, dinăuntrul perdelei rupte.",
      "Ți-l poți închipui pe Ilie sau pe Ioan Botezătorul alergând după femei sau după bani? Nu. Și totuși ei nu aveau harul și intrarea slobodă pe care o avem noi.",
      "Isus a spus că Ioan Botezătorul era cel mai mare om născut până atunci. Și a adăugat: dar cel mai mic din Împărăția cerurilor este mai mare decât el. Adică cel mai înalt loc la care putea duce Legea este mai jos decât locul în care harul poate duce pe cel mai slab dintre copiii lui Dumnezeu.",
      "Voia lui Dumnezeu nu este ca doar câte un credincios ici și colo să se ridice mai sus decât Ioan Botezătorul, ci fiecare copil al Său venit sub har. Dar dacă vor și trăi așa este altă chestiune. Putința este dată.",
    ],
    wrongA: "Sub har am mai puține așteptări decât sub Lege.",
    right: "Sub har măsura este mai înaltă, și dovada este că păcatul nu mai are stăpânire.",
    wrongB: "Aflu sub ce trăiesc după câte reguli țin.",
    explanation:
      "Mila privește trecutul. Harul este puterea dată pentru zilele care vin. Perdeaua s-a rupt; intrarea este deschisă.",
    step: "Numește un păcat care te-a stăpânit și spune-I lui Dumnezeu că de azi vrei să trăiești sub har, nu sub Lege.",
    prayer: "Doamne, mulțumesc că perdeaua s-a rupt. Vreau să mă ridic la ce mi-ai dat sub har, nu să rămân jos.",
    journal: "Trăiești ca un om biruit sau ca un om biruitor? Unde se vede?",
    memory: "Păcatul nu va mai stăpâni asupra voastră, pentru că nu sunteți sub Lege, ci sub har.",
  }),
]
