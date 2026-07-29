import type { Lesson } from "../domain.js"

/*
 * UMBLAREA - lectiile 4-7. Continuare la umblareA.ts.
 *
 * Acelasi ton: narativ, dar cu stacheta ridicata. Omul de aici are experienta,
 * deci intram in text, in context si in metoda fara sa ne cerem scuze.
 * Ce nu facem, nici aici: verset citat gol, jargon nedesfacut, performanta spirituala.
 */

export const umblareL4: Lesson = {
  id: "umblare_l4",
  courseId: "path_umblare",
  order: 4,
  title: "Timpul cu El, nu raportul de la job",
  estMinutes: 11,
  anchorRefs: ["Ioan 15:4-5", "Apocalipsa 2:2-4", "Marcu 1:35"],
  memoryVerseRef: "Ioan 15:5",
  steps: [
    {
      id: "u4_1",
      type: "hook",
      order: 1,
      bubbles: [
        {
          from: "guide",
          text: "Doi oameni pot face exact aceleasi lucruri: se roaga dimineata, citesc, merg duminica, dau bani. Unul e viu. Celalalt e obosit si nu stie de ce.",
        },
        {
          from: "guide",
          text: "Diferenta nu e in program. E in ce cauta fiecare cand se apuca de program.",
        },
      ],
    },
    {
      id: "u4_2",
      type: "scripture",
      order: 2,
      scripture: {
        text: "R\u0103mane\u021bi \u00een Mine \u0219i Eu voi r\u0103mane \u00een voi. Cine r\u0103mane \u00een Mine \u0219i \u00een cine r\u0103man Eu aduce mult\u0103 road\u0103; c\u0103ci desp\u0103r\u021bi\u021bi de Mine nu pute\u021bi face nimic.",
        ref: "Ioan 15:5",
      },
    },
    {
      id: "u4_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Verbul \u00abramaneti\u00bb e meno in greaca: a locui, a sta, a rama pus. Se folosea pentru cineva care se muta intr-o casa, nu care trece in vizita.",
        },
        {
          from: "guide",
          text: "Si uita-te ce nu-i cere mladitei. Nu-i cere sa produca. Ii cere sa stea lipita. Rodul nu e sarcina ei, e consecinta.",
        },
        {
          from: "guide",
          text: "Aici se rupe la cei mai harnici dintre noi: am luat rodul ca pe o obligatie personala si am uitat lipirea. De aici epuizarea in slujire.",
        },
      ],
    },
    {
      id: "u4_4",
      type: "how_god_helps",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Bisericii din Efes, Iisus ii spune lucruri pe care oricare dintre noi le-ar pune pe perete: stiu faptele tale, osteneala ta, ca ai rabdare si nu suferi pe cei rai.",
        },
        {
          from: "guide",
          text: "Si apoi: \u00abdar ce am impotriva ta este ca ti-ai parasit dragostea dintai\u00bb. Deci se poate ca totul sa functioneze si relatia sa fie rece.",
        },
        {
          from: "guide",
          text: "Ce le cere e ciudat de blând: \u00abadu-ti aminte de unde ai cazut\u00bb. Nu \u00abmunceste mai mult\u00bb. Aminteste-ti cum era la inceput, si fa iar lucrurile de atunci.",
        },
      ],
    },
    {
      id: "u4_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Comparatia cu casnicia deranjeaza pe unii, dar e a Lui, nu a noastra - Mireasa, Mirele, legamant. Si e cea mai exacta.",
        },
        {
          from: "guide",
          text: "Doi oameni casatoriti douazeci de ani nu se mai despart de obicei dintr-o cearta. Se despart pentru ca n-au mai stat impreuna niciodata fara un motiv practic.",
        },
        {
          from: "guide",
          text: "Iar rugaciunea in care doar raportezi si ceri e exact asta: comunicare de logistica, in casa. Necesara, dar nu e intimitate.",
        },
      ],
    },
    {
      id: "u4_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Iisus Se trezea \u00abdis-de-dimineata, cand era intuneric\u00bb si Se ducea intr-un loc pustiu. El, care era una cu Tatal.",
        },
        {
          from: "guide",
          text: "Deci timpul cu Tatal nu e o cârjă pentru cei slabi. E felul in care functioneaza un Fiu.",
        },
      ],
    },
    {
      id: "u4_7",
      type: "step",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Azi, un lucru pe care nu-l faci de obicei: stai cu El zece minute fara sa ceri nimic si fara sa citesti nimic. Doar spune-I de ce Il iubesti.",
        },
        {
          from: "guide",
          text: "O sa ti se para nefolositor, poate chiar stânjenitor. Asa se simte prima seara in care doi oameni casatoriti se uita unul la altul fara sa vorbeasca despre facturi.",
        },
      ],
    },
    {
      id: "u4_8",
      type: "quiz",
      order: 8,
      quiz: {
        question: "Ce ii cere Iisus mladitei?",
        options: [
          { text: "Sa aduca rod", correct: false },
          { text: "Sa rama lipita de vita", correct: true },
          { text: "Sa se stradiuasca mai mult in anii slabi", correct: false },
        ],
        explanation:
          "Rodul nu e o comanda data mladitei, e ce iese din lipire. Cand inversam ordinea, ajungem harnici si secati.",
      },
    },
    {
      id: "u4_9",
      type: "memory_verse",
      order: 9,
      scripture: {
        text: "Cine r\u0103mane \u00een Mine \u0219i \u00een cine r\u0103man Eu aduce mult\u0103 road\u0103.",
        ref: "Ioan 15:5",
      },
    },
    {
      id: "u4_10",
      type: "journal",
      order: 10,
      journalPrompt:
        "Ce facai la inceput, cand era proaspat, si nu mai faci? Scrie un lucru. Ala e drumul inapoi, nu un efort nou.",
    },
  ],
}

export const umblareL5: Lesson = {
  id: "umblare_l5",
  courseId: "path_umblare",
  order: 5,
  title: "Linistea si postul, fara performanta",
  estMinutes: 11,
  anchorRefs: ["Matei 6:6", "Matei 6:16-18", "Isaia 58:6-7"],
  memoryVerseRef: "Matei 6:6",
  steps: [
    {
      id: "u5_1",
      type: "hook",
      order: 1,
      bubbles: [
        {
          from: "guide",
          text: "Postul a ajuns la noi doua lucruri deodata: ori o dieta cu eticheta religioasa, ori o metoda de a-L convinge pe Dumnezeu sa faca ce vrem noi.",
        },
        { from: "guide", text: "Nu e niciuna din ele. Si ce este, de fapt, e mult mai simplu." },
      ],
    },
    {
      id: "u5_2",
      type: "scripture",
      order: 2,
      scripture: {
        text: "Ci tu, cand te rogi, intr\u0103 \u00een c\u0103m\u0103ru\u021ba ta, \u00eencuie-\u021bi u\u0219a \u0219i roag\u0103-te Tat\u0103lui t\u0103u, care este \u00een ascuns.",
        ref: "Matei 6:6",
      },
    },
    {
      id: "u5_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Cuvantul pentru \u00abcamaruta\u00bb - tameion - insemna camara, magazia unde se tinea mancarea si banii. Cea mai putin spirituala incapere din casa, si singura care se incuia.",
        },
        {
          from: "guide",
          text: "Deci nu-ti cere o capela. Iti cere un loc in care nu te vede nimeni. Toata regula e: sa nu ai public.",
        },
      ],
    },
    {
      id: "u5_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Despre post, Iisus nu spune \u00abdaca postiti\u00bb, ci \u00abcand postiti\u00bb. Il presupune. Si totusi singura instructiune pe care o da e despre fata: spala-te, unge-te, sa nu se vada.",
        },
        {
          from: "guide",
          text: "Iar prin Isaia spune ce post nu-I place: cel in care te chinui pe tine si continui sa-ti asupreesti oamenii. Postul pe care il alege El sfarseste cu \u00abpainea impartita cu cel flamand\u00bb.",
        },
        {
          from: "guide",
          text: "Deci postul nu e o plata. Nu cumperi nimic si nu forezi mana Lui. E o mutare de foame: iei o dorinta puternica si o pui pe masa, ca sa se auda alta.",
        },
      ],
    },
    {
      id: "u5_5",
      type: "how_god_helps",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Si e o parte care nu se spune de la amvon: linistea scoate la suprafata ce era acolo tot timpul. In primele minute de tacere nu vine Dumnezeu, vine lista.",
        },
        {
          from: "guide",
          text: "Ce ai amanat, cine te-a supărat, de ce ti-e frica. Asta nu e o dovada ca nu poti - e chiar folosul. Aia e apa tulbure care s-a ridicat pentru ca ai stat pe loc.",
        },
      ],
    },
    {
      id: "u5_6",
      type: "step",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Pasul de azi, si el e mic pe hartie: o ora fara telefon, treaz, cu El. Nu neaparat fara mancare - fara zgomot.",
        },
        {
          from: "guide",
          text: "Cand vine lista, nu o alunga. Scrie-o pe o hartie si spune-I \u00abastea sunt\u00bb. Apoi taci.",
        },
      ],
    },
    {
      id: "u5_7",
      type: "world_vs_truth",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Si o precizare care conteaza mai mult decat pare: postul de mancare nu e pentru toata lumea. Daca ai o boala, iei tratament, ai avut tulburari de alimentatie, esti insarcinata sau alaptezi, vorbesti mai intai cu medicul.",
        },
        {
          from: "guide",
          text: "Dumnezeu nu Se apropie mai mult de un om care si-a facut rau. Poti posti de altele: de ecran, de cumparaturi, de stiri, de dreptatea ta intr-o cearta.",
        },
      ],
    },
    {
      id: "u5_8",
      type: "quiz",
      order: 8,
      quiz: {
        question: "Ce face postul?",
        options: [
          { text: "Il convinge pe Dumnezeu sa raspunda", correct: false },
          { text: "Imi taie o foame ca sa se audă alta", correct: true },
          { text: "Imi plateste greselile din urma", correct: false },
        ],
        explanation:
          "Nimic din ce facem nu cumpara ceva de la El - asta e harul. Postul nu-L mișca pe Dumnezeu, ne mișca pe noi: da la o parte zgomotul ca sa se audă ce era dedesubt.",
      },
    },
    {
      id: "u5_9",
      type: "memory_verse",
      order: 9,
      scripture: {
        text: "Roag\u0103-te Tat\u0103lui t\u0103u, care este \u00een ascuns.",
        ref: "Matei 6:6",
      },
    },
    {
      id: "u5_10",
      type: "journal",
      order: 10,
      journalPrompt: "Ce a ieseit la suprafata in liniste? Scrie lista, fara sa o comentezi.",
    },
  ],
}

export const umblareL6: Lesson = {
  id: "umblare_l6",
  courseId: "path_umblare",
  order: 6,
  title: "Cand nu simt nimic si merg oricum",
  estMinutes: 12,
  anchorRefs: ["Psalm 13:1-6", "Habacuc 3:17-18", "Evrei 11:1"],
  memoryVerseRef: "Habacuc 3:18",
  steps: [
    {
      id: "u6_1",
      type: "hook",
      order: 1,
      bubbles: [
        {
          from: "guide",
          text: "Vine o perioada, la toti cei care merg mult, in care nu simti nimic. Te rogi si e ca in perete. Citesti si e text.",
        },
        {
          from: "guide",
          text: "Si atunci apare cea mai obosita intrebare din viata de credinta: daca nu simt, mai e real?",
        },
      ],
    },
    {
      id: "u6_2",
      type: "scripture",
      order: 2,
      scripture: {
        text: "Pan\u0103 cand, Doamne, m\u0103 vei uita ne\u00eencetat? Pan\u0103 cand \u00ce\u021bi vei ascunde Fa\u021ba de mine?",
        ref: "Psalm 13:1",
      },
    },
    {
      id: "u6_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Asta e in Biblie. Nu intr-un jurnal personal, ci in cartea de cantari a poporului lui Dumnezeu - se cânta cu voce tare, in adunare.",
        },
        {
          from: "guide",
          text: "Deci nu exista in creștinism obligația sa pari bine. Cine ti-a spus ca intrebarea asta e lipsa de credinta nu a citit psalmii.",
        },
        {
          from: "guide",
          text: "Si uita-te la structura psalmului: patru versete de plangere, apoi \u00abeu ma increed in bunatatea Ta\u00bb. Nu se schimbase nimic in situatie intre versete. S-a schimbat unde se uita.",
        },
      ],
    },
    {
      id: "u6_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Am invatat, fara sa ne dam seama, ca simtirea e dovada. Daca m-a atins la cantare, a fost Dumnezeu. Daca nu, S-a depărtat.",
        },
        {
          from: "guide",
          text: "Dar simtirea e ca vremea: reala si trecatoare. Un legamant nu se masoara pe vreme. Nimeni nu-si desface casnicia in ziua in care se trezeste fara fluturi.",
        },
      ],
    },
    {
      id: "u6_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Totusi, cand nu simti nimic, treci trei lucruri prin cap, in ordinea asta. Unu: e ceva stiut, amanat? (lectia trecuta) Atunci nu e tacere, e o usa inchisa de mine.",
        },
        {
          from: "guide",
          text: "Doi: sunt epuizat, nedormit, bolnav? Ilie a vrut sa moara, iar Dumnezeu i-a dat sa doarma si sa manance inainte de orice discutie. Foarte des, uscaciunea e trupul, nu duhul.",
        },
        {
          from: "guide",
          text: "Trei: dacă nu e niciuna, atunci e ceea ce oamenii vechi numeau tacerea care creste. El Se retrage un pas ca sa nu mai umbli dupa senzatie, ci dupa El.",
        },
      ],
    },
    {
      id: "u6_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Habacuc scrie la capatul unui dezastru agricol, adica al economiei intregi: nici smochinul nu inflorese, nici via nu da rod, nu mai sunt oi in staul.",
        },
        {
          from: "guide",
          text: "Si continua: \u00abeu totusi ma voi bucura in Domnul\u00bb. Nu \u00abin ce mi-a dat\u00bb. In El. Ala e omul pe care nu-l mai poti falimenta.",
        },
      ],
    },
    {
      id: "u6_7",
      type: "step",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Azi faci exact ce ai face daca ai simti. Aceeasi zece minute, acelasi paragraf citit, aceeasi vorba spusa cu voce tare.",
        },
        {
          from: "guide",
          text: "Si ai voie sa-I spui adevarul: \u00abnu simt nimic si totusi sunt aici\u00bb. Propozitia asta e o forma de credinta mai mare decat lacrimile.",
        },
      ],
    },
    {
      id: "u6_8",
      type: "world_vs_truth",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "Un lucru de spus limpede, ca sa nu-ti faci rau: daca nu simti nimic de luni de zile, nu dormi, nu mananci, nu-ti mai place nimic din ce iubeai sau ai gânduri de a-ti face rau - asta nu e o etapa spirituala.",
        },
        {
          from: "guide",
          text: "Asta se numeste depresie si are nevoie de un medic, exact ca o pneumonie. Nu e lipsa de credinta si nu se rezolva postind mai mult. Ceri ajutor - si Dumnezeu nu Se supara, El vindeca si prin oameni.",
        },
      ],
    },
    {
      id: "u6_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Ce e o perioada in care nu simti nimic?",
        options: [
          { text: "Semn ca Dumnezeu S-a depărtat", correct: false },
          { text: "Poate fi neascultare, epuizare sau o tacere care creste - se verifica in ordinea asta", correct: true },
          { text: "Semn ca n-am fost niciodata credincios", correct: false },
        ],
        explanation:
          "Nu una din trei la nimereala. Se verifica in ordine: ceva stiut si amanat, apoi trupul si oboseala, apoi tacerea prin care El te muta de la senzatie la Persoana.",
      },
    },
    {
      id: "u6_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Eu \u00eens\u0103 m\u0103 voi bucura \u00een Domnul, m\u0103 voi bucura \u00een Dumnezeul mantuirii mele.",
        ref: "Habacuc 3:18",
      },
    },
    {
      id: "u6_11",
      type: "journal",
      order: 11,
      journalPrompt:
        "Scrie-I ce simti azi, fara sa infrumusetezi si fara sa te scuzi. Psalmul 13 a fost pus in Biblie exact ca sa ai voie la asta.",
    },
  ],
}

export const umblareL7: Lesson = {
  id: "umblare_l7",
  courseId: "path_umblare",
  order: 7,
  title: "Ce fac cu ce am primit",
  estMinutes: 11,
  anchorRefs: ["2 Corinteni 1:3-4", "Apocalipsa 12:11", "Matei 28:19-20"],
  memoryVerseRef: "2 Corinteni 1:4",
  steps: [
    {
      id: "u7_1",
      type: "hook",
      order: 1,
      bubbles: [
        {
          from: "guide",
          text: "Aici se termina drumul asta, si de obicei aici incepe cea mai mare frica: sa vorbesti altora despre El.",
        },
        {
          from: "guide",
          text: "Iar frica are un motiv corect. Ne-am imaginat ca a vorbi despre Dumnezeu inseamna a-i explica unui necunoscut de ce greseste.",
        },
      ],
    },
    {
      id: "u7_2",
      type: "scripture",
      order: 2,
      scripture: {
        text: "Dumnezeul oric\u0103rei mangaieri, care ne mangaie \u00een toate necazurile noastre, pentru ca, prin mangaierea cu care noi \u00eenșine sunt mangaia\u021bi de Dumnezeu, s\u0103 putem mangaia pe cei ce se afl\u0103 \u00een vreun necaz.",
        ref: "2 Corinteni 1:3-4",
      },
    },
    {
      id: "u7_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Cuvantul repetat aici e paraklesis - a chema pe cineva langa tine, ca sa-l ajuti. Din aceeasi radacina vine numele Duhului Sfant, Mangaietorul.",
        },
        {
          from: "guide",
          text: "Si observa mecanica versetului: primesti, ca sa dai. Nu \u00abai suferit, deci ai un capitol trist\u00bb. Ai fost mangaiat cu o mangaiere care acum e in mana ta si e a altcuiva.",
        },
        {
          from: "guide",
          text: "De aia nu poti da ce n-ai primit. Si de aia nu e nevoie sa fii teolog ca sa dai. Ai nevoie doar sa fi fost acolo.",
        },
      ],
    },
    {
      id: "u7_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "In Apocalipsa scrie cum au biruit: \u00abprin sangele Mielului si prin cuvantul marturisirii lor\u00bb. Doua lucruri, nu unul.",
        },
        {
          from: "guide",
          text: "Sangele e al Lui, e deja dat. Cuvantul marturisirii e al tau - povestea a ce ti-a facut, spusa cu voce tare. Aia e partea pe care nimeni nu o poate spune in locul tau.",
        },
        {
          from: "guide",
          text: "Iar marturia nu e o predica. Sunt trei propozitii: cum era, ce a facut El, cum e acum. Nimeni nu poate sa te contrazica pe asta.",
        },
      ],
    },
    {
      id: "u7_5",
      type: "how_god_helps",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Si la marea trimitere, uita-te ce cere de fapt: \u00abfaceti ucenici\u00bb, \u00abinvatati-i sa pazeasca\u00bb. Nu \u00abconvingeti\u00bb. Nu \u00abcastigati argumentul\u00bb.",
        },
        {
          from: "guide",
          text: "Un ucenic se face incet, langa cineva, in viata de zi cu zi. De aia cel mai des Dumnezeu nu te trimite la o mie de oameni, ci la unul care e deja langa tine.",
        },
        {
          from: "guide",
          text: "Si ultima propozitie e pentru frica: \u00abEu sunt cu voi in toate zilele\u00bb. Trimiterea si insotirea vin in acelasi verset. Nu te trimite singur.",
        },
      ],
    },
    {
      id: "u7_6",
      type: "step",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Azi: scrie-ti marturia in trei propozitii. Cum era. Ce a facut El. Cum e acum. Fara limbaj de biserica - asa cum i-ai povesti unui coleg.",
        },
        {
          from: "guide",
          text: "Si apoi un singur nume: cine e omul care are nevoie sa audă asta? Nu-l convinge de nimic. Intreaba-l ce mai face, si spune-i adevarul cand te intreaba pe tine.",
        },
      ],
    },
    {
      id: "u7_7",
      type: "world_vs_truth",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Si un lucru pe care il uita cei mai zeloși: nu ai voie sa foloseesti durerea altuia ca ocazie de predica. Cine plange are nevoie de cineva care sta jos langa el.",
        },
        {
          from: "guide",
          text: "Prietenii lui Iov au fost buni sapte zile, cat au tacut. S-au facut de rusine cand au inceput sa explice de ce sufera.",
        },
      ],
    },
    {
      id: "u7_8",
      type: "quiz",
      order: 8,
      quiz: {
        question: "Ce e marturia mea?",
        options: [
          { text: "Argumentele care dovedesc ca am dreptate", correct: false },
          { text: "Cum era, ce a facut El, cum e acum", correct: true },
          { text: "Ceva ce pot spune doar cei cu o poveste spectaculoasa", correct: false },
        ],
        explanation:
          "Nimeni nu te poate contrazice la ce ti s-a intamplat tie. Si nu e nevoie de spectaculos - un om care nu mai bea sau care si-a iertat tatal e o minune la fel de mare.",
      },
    },
    {
      id: "u7_9",
      type: "memory_verse",
      order: 9,
      scripture: {
        text: "Ne mangaie \u00een toate necazurile noastre, pentru ca s\u0103 putem mangaia pe cei ce se afl\u0103 \u00een vreun necaz.",
        ref: "2 Corinteni 1:4",
      },
    },
    {
      id: "u7_10",
      type: "journal",
      order: 10,
      journalPrompt:
        "Cele trei propozitii ale tale: cum era, ce a facut El, cum e acum. Si numele omului catre care mergi.",
    },
  ],
}

export const UMBLARE_B: Lesson[] = [umblareL4, umblareL5, umblareL6, umblareL7]
