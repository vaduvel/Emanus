import type { Lesson, LessonStep } from "../domain.js"

/**
 * Modulul 10 din docs/41-module-teme-poonen.md: "Tatal, intelepciunea si banii".
 * Temele 43-48.
 *
 * Sursa: Zac Poonen, "Basic Christian Teachings", capitolele 43-48 (cfcindia.com).
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

const COURSE_ID = "teme_c10_tatal_banii"

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
        prompt: "Unde te gasesti?",
        options: [
          { id: `${p}c1`, label: "Sunt nelinistit si ma tem de ziua de maine." },
          { id: `${p}c2`, label: "Alerg dupa mai mult, fara sa recunosc." },
          { id: `${p}c3`, label: "Vreau sa asez lucrurile la locul lor." },
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
        "Isus a spus: nu va voi lasa orfani. Duhul Sfant vine sa te incredinteze ca Dumnezeu iti este Tata.",
        "Dumnezeu da cu darnicie si fara mustrare, celui ce cere cu credinta.",
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

export const TATAL_SI_BANII_LESSONS: Lesson[] = [
  make({
    id: "bani_l1",
    order: 1,
    title: "Nu esti orfan",
    refs: ["Ioan 14:18", "Ioan 1:18", "Matei 6:26", "Matei 6:9"],
    ref: "Ioan 14:18",
    hook: "Lumea este plina de orfani duhovnicesti: oameni care nu-L au pe Dumnezeu ca Tata. De aici vine toata nelinistea.",
    word: "Nu va voi lasa orfani; Ma voi intoarce la voi.",
    truth: [
      "Un orfan este cel care nu are tata si mama. Este mare deosebire intre un copil crescut in dragostea unui tata si a unei mame si un copil care n-a avut niciodata asa ceva.",
      "Cand lipseste dragostea aceasta, omul se apara mereu. Simte ca lumea este impotriva lui. Ajunge inchis in sine, deznadajduit, invidios pe cei care au mai mult, stapanitor in prietenii. Poate ramane asa si la patruzeci sau cincizeci de ani.",
      "Duhovniceste, lumea este plina de orfani, fiindca oamenii nu-L au pe Dumnezeu ca Tata. De aceea se lupta, se apara, sunt stapanitori. Iubesc banii fiindca sunt nesiguri; nu au un Tata ceresc.",
      "Isus a cautat mereu sa-i faca pe ucenici sa inteleaga ca Dumnezeu este un Tata iubitor. I-a invatat sa se roage: Tatal nostru. Nimeni din Vechiul Testament nu se putea ruga asa.",
      "Nimeni n-a vazut vreodata pe Dumnezeu; Fiul ni L-a facut cunoscut. Este ca un copil care n-a vazut niciodata un elefant si i se cere sa-l deseneze; nimeni nu s-ar gandi la o trompa. Asa sunt si parerile oamenilor despre Dumnezeu: toate gresite. Numai Cel venit din cer ne poate spune cum este Dumnezeu.",
      "Cei mai multi si-L inchipuie pe Dumnezeu ca pe un politist care sta la colt si asteapta sa te prinda cu o greseala. De frica aceasta se folosesc preoti si predicatori, spunand ca trebuie sa-L imblanzesti dand bani.",
      "Care tata umbla sa scoata bani de la copiii lui mici? Un tata cauta mereu sa-i ajute: sa-i hraneasca, sa-i imbrace, sa-i dea invatatura, si nu primeste nimic in schimb. Asa este Dumnezeu.",
      "Isus a spus: uitati-va la pasarile cerului, cine le hraneste? Cate pasari moarte de foame vezi pe drum? Aproape niciuna. Si nu sunteti voi cu mult mai de pret decat ele?",
      "Cand esti nelinistit, devii iritabil si lovesti inapoi in cei despre care banuiesti ca te lovesc. Cel care este in siguranta in Dumnezeu nu se tulbura de ce spun oamenii.",
      "Daca pe drum latra un caine de dupa poarta, te apuci sa te certi cu el? Tot atat de fara minte este sa te certi cu cine te acuza sau raspandeste povesti despre tine. Cand Il numeau capetenia dracilor, Isus i-a lasat in pace.",
    ],
    wrongA: "Dumnezeu sta cu ochii pe mine, gata sa ma pedepseasca.",
    right: "Dumnezeu iti este Tata: te iubeste, te cunoaste si Se ingrijeste de tine.",
    wrongB: "Ca sa ma primeasca Dumnezeu, trebuie sa dau bani.",
    explanation:
      "Toata nelinistea, teama si incordarea vin din faptul ca traim ca niste orfani, desi avem un Tata.",
    step: "Cand cineva te vorbeste de rau azi, lasa-l in pace, ca pe cainele de dupa poarta.",
    prayer: "Doamne, da-mi incredintarea ca imi esti Tata si scoate din mine nelinistea de orfan.",
    journal: "Unde te aperi, fiindca simti ca nu are cine sa te apere?",
    memory: "Nu va voi lasa orfani; Ma voi intoarce la voi.",
  }),
  make({
    id: "bani_l2",
    order: 2,
    title: "Dumnezeu iti poate da intelepciune",
    refs: ["Iacov 1:5", "Iacov 1:6-7", "Matei 7:11", "Proverbe 18:24"],
    ref: "Iacov 1:5",
    hook: "Este mare deosebire intre a sti Biblia si a-L cunoaste pe Dumnezeu. Intelepciunea nu este cunoasterea unei carti, ci a lui Dumnezeu.",
    word: "Daca vreunuia dintre voi ii lipseste intelepciunea, s-o ceara de la Dumnezeu, care da tuturor cu mana larga si fara mustrare, si ea ii va fi data.",
    truth: [
      "Dumnezeu a facut pregatire pentru fiecare nevoie a noastra. I-a dat lui Adam foamea si i-a dat si hrana; i-a dat setea si i-a dat si apa; i-a dat nevoia de odihna si a randuit noaptea.",
      "Ce invatam din asta? Ca daca este in inima noastra o dorinta pusa de Dumnezeu si inca neimplinita, undeva exista si implinirea ei.",
      "Una dintre cele mai mari nevoi ale noastre este sa nu ne mai simtim singuri. Poti locui intr-o casa cu multi copii si sa te simti singur. Poti fi intr-o biserica mare si sa te simti singur.",
      "Daca vrei sa-ti gasesti raspunsul la singuratate numai in prieteni, vei fi dezamagit intr-o zi. Este un prieten mai apropiat decat un frate.",
      "Un orfan care are o nevoie merge la un unchi ca un cersetor si nu stie daca va fi ajutat. Dar un copil isi poate cere orice de la tatal lui. Cand ai un tata, esti in siguranta.",
      "Cand L-ai gasit pe Dumnezeu ca Tata, nu mai poti fi singur niciodata, fiindca legatura este mereu deschisa. Il poti chema oriunde ai fi. El stie nevoia ta inainte sa I-o spui.",
      "Ce este intelepciunea? Este altceva decat cunostinta. Poti sti chimie si sa ai probleme; poti sti Biblia si sa ai probleme. Sunt atatia oameni cu multa cunostinta biblica si totusi nelinistiti, certareti, invidiosi.",
      "Intelepciunea este cunoasterea lui Dumnezeu, care ne ajuta sa gasim o dezlegare practica la o problema anume.",
      "Inchipuie-ti ca ai fost despartit de tatal tau douazeci si cinci de ani si ai citit o carte despre viata lui. Stii despre el, dar nu-l cunosti. Un copil care a crescut cinci ani langa tatal lui, fara nicio carte, il cunoaste mai bine. Multi citesc Biblia ca pe o biografie a Tatalui, fara sa-L cunoasca pe Tatal.",
      "Daca voi, care sunteti rai, stiti sa dati daruri bune copiilor vostri, cu cat mai mult Tatal vostru din ceruri. Ceri o lingura, iti da o galeata; si nu te va certa niciodata, nu-ti va spune: cum de nu stii singur?",
      "Este o singura conditie: sa ceri cu credinta. Daca nu ceri cu credinta, nu vei primi. Poate tocmai de aceea n-ai gasit inca dezlegarea. Nu te ruga in general; spune lucrul anume.",
    ],
    wrongA: "Cunostinta Bibliei imi dezleaga problemele practice.",
    right: "Intelepciunea este cunoasterea lui Dumnezeu care aduce o dezlegare practica; se cere si se primeste prin credinta.",
    wrongB: "Dumnezeu ma va certa daca vin cu lucruri marunte.",
    explanation:
      "Dumnezeu da cu mana larga si fara mustrare - dar celui ce cere crezand.",
    step: "Numeste azi, in rugaciune, un lucru anume si cere dezlegare, crezand.",
    prayer: "Doamne, nu vreau doar sa stiu despre Tine. Vreau sa Te cunosc si sa primesc intelepciune de la Tine.",
    journal: "Ce problema ai purtat singur, fara sa I-o ceri Lui anume?",
    memory: "Daca vreunuia dintre voi ii lipseste intelepciunea, s-o ceara de la Dumnezeu.",
  }),
  make({
    id: "bani_l3",
    order: 3,
    title: "Dumnezeu si banii sunt doi stapani",
    refs: ["Luca 16:13", "Luca 16:14", "Matei 23:3"],
    ref: "Luca 16:13",
    hook: "Cei doi stapani din vorbele lui Isus nu sunt Dumnezeu si Satana. Sunt Dumnezeu si Mamona.",
    word: "Nicio sluga nu poate sluji la doi stapani. Nu puteti sluji lui Dumnezeu si lui Mamona.",
    truth: [
      "Daca cei doi stapani ar fi Dumnezeu si Satana, nici n-ar mai fi nevoie sa vorbim despre asta. Toata lumea stie ca nu poti sluji la amandoi.",
      "Cei doi stapani de aici sunt Dumnezeu si Mamona - banii si bogatiile. Si ce spune despre ei? Pe unul il vei uri si pe celalalt il vei iubi; de unul te vei lipi si pe celalalt il vei nesocoti.",
      "Banii sunt un slujitor bun, dar un stapan ingrozitor. La fel este si focul. Focul tinut sub stapanire pe aragaz este un slujitor minunat; scapat de sub stapanire, arde toata casa.",
      "Nu suntem impotriva banilor, cum nu suntem impotriva focului. Dar cine umbla cu foc trebuie sa fie cu bagare de seama. Esti tu la fel de atent cu banii pe cat esti cu focul? Ar trebui sa fii si mai atent, fiindca banii sunt mai primejdiosi.",
      "Nu propovaduim viata de pustnic sau de calugar. Dumnezeu n-a chemat pe toti sa lase slujba; poate unul din o mie este chemat la lucrarea cu norma intreaga. Ceilalti nouasute nouazeci si noua muncesc - dar trebuie sa stie sa umble cu banii.",
      "Inchipuie-ti o femeie care are un slujitor in gradina si ajunge sa-l iubeasca mai mult decat pe sotul ei. Ceva s-a stricat. Nu inseamna ca trebuie sa dea afara gradinarul, ci sa-l tina la locul lui.",
      "Poti sa spui ca legatura ta cu Dumnezeu si cu banii este asa: pe unul il urasti si pe celalalt il iubesti?",
      "Nu poti avea o pozitie neutra fata de bani, cum nu poti avea fata de Satana. Ori ii iubesti, ori ii urasti.",
      "Fariseii aveau invatatura curata si erau peste masura de religiosi. Dar este scris ca iubeau banii - si tocmai asta dovedea ca il urau pe Dumnezeu.",
      "Dumnezeu si Mamona sunt ca cei doi poli ai unui magnet: daca esti atras de unul, esti respins de celalalt.",
      "Care este atunci dezlegarea? Uita-te la Isus. A muncit ca tamplar si Si-a castigat painea, dar nu Se lipise de ea. Spune-I: Doamne, vreau sa am fata de lucruri aceeasi inima pe care ai avut-o Tu.",
    ],
    wrongA: "Cei doi stapani sunt Dumnezeu si Satana.",
    right: "Cei doi stapani sunt Dumnezeu si banii; nu poti fi neutru fata de ei.",
    wrongB: "Ca sa fii curat, trebuie sa scapi de bani.",
    explanation:
      "Banii sunt un slujitor bun si un stapan ingrozitor. Tine-i la locul de slujitor.",
    step: "Uita-te azi la o cheltuiala si intreaba: cine porunceste aici, eu sau banii?",
    prayer: "Doamne, vreau sa Te iubesc pe Tine si sa tin banii la locul de sluga.",
    journal: "Ce hotarare ai luat in ultima vreme pornind de la bani, nu de la Dumnezeu?",
    memory: "Nu puteti sluji lui Dumnezeu si lui Mamona.",
  }),
  make({
    id: "bani_l4",
    order: 4,
    title: "Iubirea de bani",
    refs: ["1 Timotei 6:10", "1 Timotei 6:9", "Deuteronom 8:18", "Geneza 13"],
    ref: "1 Timotei 6:10",
    hook: "Nu banii sunt radacina tuturor relelor, ci iubirea de bani. Si nu scapi de ea predicand impotriva ei.",
    word: "Caci iubirea de bani este radacina tuturor relelor.",
    truth: [
      "Daca nu asezam lucrul acesta la locul lui, nu vom creste niciodata. Cred ca aceasta este una dintre pricinile de capetenie pentru care multi credinciosi raman ca niste copii care nu se mai fac mari.",
      "Cum putem ajunge sa-L iubim pe Dumnezeu mai mult decat banii? Predicand mereu impotriva banilor? Nu merge. O predica negativa naste doar farisei, care isi inchipuie ca ei urasc banii si ca ceilalti nu sunt ca ei.",
      "Ganditi-va la o fata indragostita de un tanar care nu este bun. Parintii ii spun sa-l lase; nu se intampla nimic. Se intalnesc pe ascuns, si dragostea ei creste.",
      "Apoi, intr-o zi, intalneste un alt tanar, mai bun in toate privintele. Deodata inima i se umple de dragoste pentru acesta si nu mai vrea sa-l vada pe cel dintai. Ce n-au izbutit parintii in ani, a izbutit acest om intr-o clipa.",
      "Asa se scoate afara dragostea de bani: inima trebuie umpluta cu o alta dragoste. Este ca lumina care alunga intunericul dintr-o odaie.",
      "Deci nu predicam un mesaj negativ. Il inaltam pe Hristos. Cand vezi cine este El cu adevarat si Il iubesti cu toata inima, lipirea de bani dispare de la sine.",
      "Dar daca fata spune ca-l iubeste pe al doilea si in ascuns tot ii scrie celui dintai? Este o prefacatorie. Aceasta este starea multor credinciosi: duminica dimineata cantam Domnului cantari ca niste scrisori de dragoste, iar toata saptamana alergam dupa cel dintai.",
      "Te bucuri peste masura cand primesti pe neasteptate multi bani? Tanjesti sa faci tot mai multi? Daca da, atunci iubesti banii si slujesti lui Mamona.",
      "Nu este niciun rau in a castiga mult. Poti avea un venit mare si sa-L iubesti pe Dumnezeu. Nu conta cat castigi, ci daca alergi dupa bani.",
      "Multi cred, din nechibzuinta, ca daca au mai multi bani, este semn ca Dumnezeu i-a binecuvantat. Unii chiar isi doresc sa castige la loterie. Loteriile sunt unul dintre mijloacele Satanei de a-i atrage pe oameni la inchinarea inaintea banilor: castigi din dezamagirea altor o suta de mii de oameni. Crezi ca Isus ar cumpara un bilet de loterie?",
      "Binecuvantarea lui Dumnezeu nu se vede in lucrurile materiale. Isus a fost sarac si a fost cel mai binecuvantat. Petru a spus: argint si aur n-am. Pavel a fost sarac si a muncit cu mainile.",
      "Avraam n-a umblat sa se imbogateasca si Dumnezeu l-a binecuvantat. Lot a vrut sa se imbogateasca; s-a dus in Sodoma si s-a nimicit pe sine. Balaam a vrut sa se imbogateasca predicand si si-a pierdut chemarea. Ghehazi a vrut sa se imbogateasca si a mostenit lepra. Iuda a vrut niste bani si s-a pierdut. Dima putea fi ca Pavel, dar a alergat dupa bani.",
    ],
    wrongA: "Banii sunt radacina tuturor relelor.",
    right: "Iubirea de bani este radacina; se scoate afara doar cand inima este umpluta cu dragostea pentru Hristos.",
    wrongB: "Cine are mai multi bani este mai binecuvantat de Dumnezeu.",
    explanation:
      "Nu conteaza cat castigi, ci daca alergi dupa bani. Lumina alunga intunericul; dragostea noua o alunga pe cea veche.",
    step: "Cere-I azi lui Dumnezeu sa-ti arate frumusetea lui Hristos, nu doar sa-ti taie pofta.",
    prayer: "Doamne Isuse, vreau sa Te iubesc cu toata inima si sa fiu izbavit de raul iubirii de bani.",
    journal: "Ce te-a bucurat mai tare in ultima luna: un castig sau Dumnezeu?",
    memory: "Iubirea de bani este radacina tuturor relelor.",
  }),
  make({
    id: "bani_l5",
    order: 5,
    title: "Da inapoi ce este al altora",
    refs: ["Matei 22:21", "Luca 19:8", "Romani 13:8", "1 Timotei 6:9"],
    ref: "Matei 22:21",
    hook: "Isus n-a spus intai: dati lui Dumnezeu. A spus intai: dati Cezarului. Intai dreptate, apoi credinciosie.",
    word: "Dati dar Cezarului ce este al Cezarului, si lui Dumnezeu ce este al lui Dumnezeu.",
    truth: [
      "Satana nu ne spune de la inceput unde duce drumul. Ne da mai intai un pic din gustul bogatiei, cum face cel care vinde droguri: da la inceput putin, pe gratis, unui copil la scoala. Dupa ce a prins gustul, vrea mai mult.",
      "Multi credinciosi si-au vandut dreptul de intai nascut pentru un blid de linte, ca Esau. Ganditi-va ce parere de rau vor avea in vesnicie.",
      "Un om cu judecata nu alearga dupa avere peste nevoile lui, asa cum nu sare de la etajul zece. Cel care sare isi spune: altii s-au ranit, eu nu ma voi rani.",
      "Sunt doua lucruri care te scapa. Cel dintai: dreptatea in bani. Da inapoi ce este al altora. Aici Cezar inseamna un alt om sau statul.",
      "Daca ai imprumutat bani, nu-i da lui Dumnezeu; Dumnezeu nu-i vrea. Da-i inapoi celui de la care i-ai luat, chiar daca au trecut douazeci si cinci de ani.",
      "Poate n-au fost imprumutati, ci furati: un lucru de la birou, un medicament de la spital, o carte pe care n-ai mai dat-o inapoi, o unealta. Da-le inapoi. Ai calatorit cu trenul fara bilet? Plateste drumul acela.",
      "La fel si cu statul. Daca ai ascuns cat ai castigat, socoteste si da inapoi. Daca ai trecut lucruri prin vama fara sa platesti, sau, si mai rau, ai dat mita vamesului, socoteste taxa si plateste-o statului. Mita nu inseamna ca ai platit statului; aceia au intrat in buzunarul lui.",
      "Zacheu a spus: dau inapoi impatrit. S-a gandit si la dobanda. Iar pentru cei carora nu le mai stia adresa, a spus: dau saracilor. Asa sa faci si tu: bisericii sau saracilor.",
      "Chiar daca datoria este foarte mare, nu te descuraja. Incepe cu putin in fiecare luna. Dumnezeu te binecuvanteaza din ziua in care incepi sa platesti, nu dupa ce ai terminat de platit. El vede inima gata sa indrepte lucrurile.",
      "Nu foloseste la nimic sa ai in casa o placuta cu Dumnezeu sa binecuvanteze casa aceasta, daca in casa aceea sunt lucruri luate pe nedrept. Scriptura spune: sa nu datorati nimanui nimic.",
      "Daca ai fie si un singur ban castigat pe nedrept, banul acela va fi un blestem pentru tine si pentru copiii tai. Nu vei fi gata pentru venirea Domnului daca n-ai asezat lucrurile aici, pe pamant.",
    ],
    wrongA: "Ce am luat pe nedrept pot da lui Dumnezeu, ca sa se acopere.",
    right: "Intai dai inapoi omului sau statului ce este al lui; abia apoi dai lui Dumnezeu.",
    wrongB: "Daca datoria este prea mare, nu are rost sa incep.",
    explanation:
      "Dumnezeu nu primeste banii Cezarului. El vede inima gata sa indrepte, chiar daca plata tine cincisprezece ani.",
    step: "Scrie azi o lista cu tot ce datorezi cuiva si incepe cu cea dintai plata, oricat de mica.",
    prayer: "Doamne, arata-mi tot ce tin pe nedrept si da-mi curajul sa dau inapoi.",
    journal: "Ce nu ai dat inapoi si ai socotit ca s-a uitat?",
    memory: "Dati Cezarului ce este al Cezarului, si lui Dumnezeu ce este al lui Dumnezeu.",
  }),
  make({
    id: "bani_l6",
    order: 6,
    title: "A da totul lui Dumnezeu",
    refs: ["Luca 16:11", "Ioan 17:10", "1 Corinteni 10:26", "Deuteronom 8:18"],
    ref: "Ioan 17:10",
    hook: "In Vechiul Testament era zece la suta, fiindca erau slujitori. Noi nu suntem slujitori, ci mireasa. Sotii au cont comun.",
    word: "Tot ce este al Meu este al Tau, si ce este al Tau este al Meu.",
    truth: [
      "Sa nu datorati nimanui nimic. Feriti-va de imprumuturi cat se poate. Fiti multumiti cu ce va da Dumnezeu si traiti in venitul acela. Reclamele spun: cumpara acum, plateste mai tarziu. Iata alta deviza: strange acum si cumpara mai tarziu.",
      "Cand iei un imprumut pentru o casa sau pentru o masina, ai ceva de aratat pentru banii aceia; daca nu poti plati, ti se ia lucrul. Dar cand te imprumuti pentru ceva care se duce - de pilda o nunta - intri in robie.",
      "Robia credinciosilor fata de Mamona se vede cel mai limpede la nunti: lacomia si cautarea cinstei se arata fara rusine. Ganditi-va la obiceiul zestrei. Cine cere zestre inainte de a sti daca aceasta este fata pe care i-o da Dumnezeu face de rusine Numele lui Hristos.",
      "Nu este niciun rau intr-o nunta frumoasa, daca ai din ce. Isus Insusi a facut vin la o nunta. Dar sa te imprumuti ca sa faci o nunta mare si sa ramai dator ani de zile este un inceput fara minte. Te temi de ce vor spune oamenii? Intreaba-te ce va spune Dumnezeu.",
      "Dupa dreptate vine credinciosia: da lui Dumnezeu ce este al lui Dumnezeu. Cat inseamna asta? In Vechiul Testament, zece la suta. Isus a spus: daca nu te lepezi de tot ce ai, nu poti fi ucenicul Meu. Tot inseamna o suta la suta.",
      "Ce ai zice de o sotie care spune sotului: iti dau zece la suta din venitul meu, restul il dau altcuiva? Este aceasta o legatura de tovarasie?",
      "In Vechiul Testament oamenii nu erau logoditi cu Dumnezeu cum suntem noi cu Hristos. Erau slujitori, iar un slujitor poate da zece la suta. Stapanul si sluga au conturi deosebite; sotul si sotia au cont comun.",
      "Isus i-a spus Tatalui: tot ce este al Meu este al Tau. Asa spunem si noi: Doamne, tot ce am este al Tau. Si El ce raspunde? Tot ce este al Meu este si al vostru.",
      "Al Domnului este pamantul cu tot ce este pe el. Odata ce vezi lucrul acesta, nu-ti mai inchipui ca-I faci lui Dumnezeu o mare favoare cand Ii dai; Ii dai ce este al Lui.",
      "Domnul este Cel ce-ti da putere sa castigi bogatii. Puteai fi paralizat, puteai fi bolnav, puteai fi slab la minte si n-ai fi castigat nimic.",
      "A da o suta la suta nu inseamna sa dai tot pentru lucrare si sa traiesti pe strada. Dumnezeu vrea sa ai casa cuviincioasa, hrana, imbracaminte si scoala pentru copii. Inseamna sa recunosti ca esti un ispravnic care umbla cu banii Altuia si sa-L intrebi: Doamne, cat sa cheltuiesc pentru mine?",
      "Daca n-ati fost credinciosi in bogatiile nedrepte, cine va va incredinta adevaratele bogatii? Cand suntem credinciosi, Dumnezeu ne da in schimb bogatiile cerului: descoperire in Cuvantul Lui si asemanare cu Hristos.",
    ],
    wrongA: "Zeciuiala de zece la suta implineste ce cere Dumnezeu.",
    right: "Totul este al Lui; noi suntem ispravnici si Il intrebam cat sa cheltuim pentru noi.",
    wrongB: "A da totul inseamna sa ramai fara casa si fara hrana.",
    explanation:
      "Multi sunt saraci duhovniceste tocmai fiindca nu sunt nici drepti, nici credinciosi in bani.",
    step: "Fa azi socoteala unei cheltuieli si intreaba-L pe Dumnezeu daca este de trebuinta.",
    prayer: "Doamne, tot ce am este al Tau. Invata-ma sa nu risipesc si sa dau socoteala cu bucurie.",
    journal: "Ce cheltuiala ai face altfel daca ai sti ca umbli cu banii lui Dumnezeu?",
    memory: "Tot ce este al Meu este al Tau, si ce este al Tau este al Meu.",
  }),
]
