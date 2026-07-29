import type { Lesson } from "../domain.js"

/*
 * UMBLAREA - M7. A treia intrare in aplicatie. (docs/21)
 *
 * Pentru cine NU vine cu o rana, ci vine sa intareasca o relatie care exista deja.
 * Omul de aici se roaga de ani, a citit Biblia, a fost la biserica. Nu-i explicam
 * ce e harul si nu-l intrebam daca e sigur ca Dumnezeu exista.
 *
 * TONUL: narativ, ca in camere - dar cu stacheta ridicata. Presupunem experienta.
 * Putem intra in text, in context, in cuvantul din original, in metoda. Ce nu facem:
 * jargon nedesfacut si verset citat gol.
 *
 * Beat-uri: unde se rupe de fapt lucrul asta la un credincios cu experienta ·
 * ce facem toti din reflex · textul · ce zice de fapt (aici e didactica) ·
 * obiectia omului matur · pasul concret de azi · quiz · versetul · jurnal.
 */

export const umblareL1: Lesson = {
  id: "umblare_l1",
  courseId: "path_umblare",
  order: 1,
  title: "Rugaciunea nu e monolog",
  estMinutes: 11,
  anchorRefs: ["Ioan 10:27", "1 Regi 19:11-12", "Psalm 62:8"],
  memoryVerseRef: "Ioan 10:27",
  steps: [
    {
      id: "u1_1",
      type: "hook",
      order: 1,
      bubbles: [
        {
          from: "guide",
          text: "Tu te rogi. Nu e asta problema. Problema e alta si o recunosc putini: de multe ori termini de vorbit, spui amin, si te ridici fara sa fi ascultat nimic.",
        },
        {
          from: "guide",
          text: "Nu din nepasare. Din obisnuinta. Am invatat sa ne rugam ca la un ghiseu: depui cererea si pleci.",
        },
      ],
    },
    {
      id: "u1_2",
      type: "world_vs_truth",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Iar cand cineva zice \u00abmi-a vorbit Dumnezeu\u00bb, doua reflexe se aprind deodata: unul zice \u00absigur si-a imaginat\u00bb, celalalt zice \u00abde ce lui si nu mie\u00bb.",
        },
        {
          from: "guide",
          text: "Azi nu-ti cer sa auzi ceva spectaculos. Iti dau altceva, mai putin romantic si mult mai folositor: cum se recunoaste vocea Lui de gandurile tale.",
        },
      ],
    },
    {
      id: "u1_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Oile Mele ascult\u0103 glasul Meu; Eu le cunosc, \u0219i ele vin dup\u0103 Mine.",
        ref: "Ioan 10:27",
      },
    },
    {
      id: "u1_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Uita-te ce nu spune. Nu spune \u00aboile Mele aud un tunet\u00bb. Spune \u00abasculta glasul\u00bb - iar in greaca verbul e la timpul care arata ceva ce se face mereu, nu o data.",
        },
        {
          from: "guide",
          text: "Cu alte cuvinte: recunoasterea vocii se invata prin repetare. Ca vocea mamei tale la telefon, pe care o recunosti dupa o silaba, fara sa se prezinte.",
        },
      ],
    },
    {
      id: "u1_5",
      type: "how_god_helps",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Ilie a facut greseala pe care o facem toti. Il aseapta pe Dumnezeu in vant puternic, in cutremur, in foc. Dumnezeu n-a fost in niciunul.",
        },
        {
          from: "guide",
          text: "A venit intr-un \u00absusur bland si subtire\u00bb. In ebraica, expresia e ciudata pe romaneste: \u00abun sunet de liniste subtire\u00bb. Adica exact ce nu auzi cand esti cu radioul pornit in cap.",
        },
        {
          from: "guide",
          text: "Si observa cand se intampla: dupa ce Ilie a fost lasat sa doarma si sa manance. Dumnezeu nu i-a predicat unui om epuizat. L-a hranit intai.",
        },
      ],
    },
    {
      id: "u1_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Deci cum deosebesti? Trei filtre, in ordinea asta, si niciunul singur nu e de ajuns.",
        },
        {
          from: "guide",
          text: "Unu: contrazice Scriptura? Atunci nu e El, oricat de frumos suna. Dumnezeu nu Se contrazice ca sa-ti faca pe plac.",
        },
        {
          from: "guide",
          text: "Doi: ce lasa in urma? Vocea Lui aduce liniste chiar si cand te mustra. Acuzarea care te lasa mic, rusinat si fara ieseire nu e a Lui - e a celui care acuza ziua si noaptea.",
        },
        {
          from: "guide",
          text: "Trei: se confirma? In timp, prin Scriptura care iti iese in cale, prin oameni maturi care nu stiau ce te framanta, prin cum se aseaza lucrurile. Dumnezeu nu Se supara ca ceri confirmare - Ghideon a cerut de doua ori.",
        },
      ],
    },
    {
      id: "u1_7",
      type: "world_vs_truth",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Obiectia serioasa, si o pune cine chiar se roaga: \u00abbine, dar de unde stiu ca nu e vocea mea, care spune ce vreau sa aud?\u00bb",
        },
        {
          from: "guide",
          text: "Cinstit: uneori nu stii pe loc. De aia avem trei filtre si nu unul. Iar semnul cel mai bun e neplacut: vocea Lui iti cere de multe ori exact lucrul pe care nu voiai sa-l faci.",
        },
      ],
    },
    {
      id: "u1_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "Pasul de azi e mic si e greu: dupa ce termini de vorbit cu El, nu te ridica. Stai cinci minute fara sa ceri nimic.",
        },
        {
          from: "guide",
          text: "Nu ca sa auzi ceva. Ca sa nu mai fii singurul care vorbeste. Daca nu vine nimic, n-ai pierdut nimic - ai stat cinci minute cu Cineva care te iubeste.",
        },
      ],
    },
    {
      id: "u1_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Un gand care te lasa rusinat, mic si fara ieseire - de la cine vine?",
        options: [
          { text: "De la Dumnezeu, care ne mustra", correct: false },
          { text: "Nu de la El - mustrarea Lui lasa liniste si o ieseire", correct: true },
          { text: "Nu se poate sti niciodata", correct: false },
        ],
        explanation:
          "Si Dumnezeu mustra, dar mustrarea Lui vine cu un drum de urmat si cu pace la capat. Acuzarea care te lasa paralizat si fara nicio iesire nu are semnatura Lui.",
      },
    },
    {
      id: "u1_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Oile Mele ascult\u0103 glasul Meu; Eu le cunosc, \u0219i ele vin dup\u0103 Mine.",
        ref: "Ioan 10:27",
      },
    },
    {
      id: "u1_11",
      type: "journal",
      order: 11,
      journalPrompt:
        "Cand ti-ai dat seama ultima data ca ti-a vorbit? Scrie-o cu data, chiar daca nu esti sigur. Peste un an o vei citi altfel.",
    },
  ],
}

export const umblareL2: Lesson = {
  id: "umblare_l2",
  courseId: "path_umblare",
  order: 2,
  title: "Cum citesc Biblia ca sa aud, nu ca sa bifez",
  estMinutes: 12,
  anchorRefs: ["Iosua 1:8", "Psalm 1:2-3", "Luca 24:27", "2 Timotei 2:15"],
  memoryVerseRef: "Iosua 1:8",
  steps: [
    {
      id: "u2_1",
      type: "hook",
      order: 1,
      bubbles: [
        {
          from: "guide",
          text: "Ai citit Biblia. Poate ai si terminat-o o data. Si totusi sunt zile cand inchizi capitolul si nu ai luat nimic de acolo.",
        },
        {
          from: "guide",
          text: "Nu pentru ca textul e sec. Pentru ca l-am citit ca pe o sarcina de dus la capat, nu ca pe o scrisoare.",
        },
      ],
    },
    {
      id: "u2_2",
      type: "world_vs_truth",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Doua feluri de a citi greseit, si amandoua se poarta prin biserici. Primul: capitolele pe zi, cu bifa. Al doilea: deschid la nimereala si iau versetul care-mi iese in cale ca mesaj personal.",
        },
        {
          from: "guide",
          text: "Al doilea e mai periculos, fiindca pare mai spiritual. Cu metoda asta poti scoate din Biblie aproape orice - inclusiv lucruri care ti-au facut rau.",
        },
      ],
    },
    {
      id: "u2_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Cartea legii s\u0103 nu se dep\u0103rteze de gura ta; cuget\u0103 asupra ei zi \u0219i noapte.",
        ref: "Iosua 1:8",
      },
    },
    {
      id: "u2_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Cuvantul tradus \u00abcugeta\u00bb e hagah. In alte locuri, aceeasi rada descrie leul care mariae peste prada si porumbelul care geme. E un sunet scos incet, iar si iar.",
        },
        {
          from: "guide",
          text: "Deci nu \u00abcitesti mult\u00bb. Mesteci putin, mult timp. Un verset intors pe toate parti face mai mult decat trei capitole citite in viteza inainte de culcare.",
        },
      ],
    },
    {
      id: "u2_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Concret, patru intrebari, in ordinea asta. Prima e cea pe care o sarim toti." },
        {
          from: "guide",
          text: "1. Cui i s-a scris asta, si de ce? Orice verset are un destinatar. Promisiunea data lui Iosua inainte de o batalie nu e o garantie ca vei lua creditul.",
        },
        {
          from: "guide",
          text: "2. Ce spune despre Dumnezeu? Nu despre tine - despre El. Biblia e in primul rand descoperirea unei Persoane, nu un manual de dezvoltare personala.",
        },
        {
          from: "guide",
          text: "3. Ce spune despre om, deci si despre mine? Aici intra oglinda. Nu \u00abce imi place\u00bb, ci \u00abce ma priveste\u00bb.",
        },
        {
          from: "guide",
          text: "4. Ce fac azi cu asta? Un lucru. Daca nu iese nimic de facut, nu-i nimic - dar intreaba de fiecare data.",
        },
      ],
    },
    {
      id: "u2_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Pe drumul spre Emaus, doi oameni mergeau descurajati. Iisus, inviat, umbla langa ei si nu Se prezinta. Le explica Scripturile.",
        },
        {
          from: "guide",
          text: "Scrie ca \u00able-a talcuit, in toate Scripturile, ce era cu privire la El\u00bb. Deci firul care leaga Biblia nu e o lista de reguli. E o Persoana.",
        },
        {
          from: "guide",
          text: "De asta aplicatia se numeste Emanus. Emanuel - Dumnezeu cu noi. Si Emaus - drumul pe care ti se deschid ochii in mers, nu in sala de curs.",
        },
      ],
    },
    {
      id: "u2_7",
      type: "world_vs_truth",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Obiectia omului serios: \u00abdeci nu mai pot lua un verset personal? Mi-a vorbit prin versete de multe ori.\u00bb",
        },
        {
          from: "guide",
          text: "Poti, si asta e real. Doar in ordinea corecta: mai intai ce a vrut sa spuna acolo, apoi ce imi spune mie. Cand sarim primul pas, ne rugam de fapt cu propriile dorinte imbracate in text.",
        },
      ],
    },
    {
      id: "u2_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "Azi: un singur paragraf, nu un capitol. Trece-l prin cele patru intrebari, in scris. Zece minute.",
        },
        {
          from: "guide",
          text: "Daca vrei un loc de pornit, Ioan 15, primele zece versete. E despre a rama, si e exact ce facem noi aici.",
        },
      ],
    },
    {
      id: "u2_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Care e prima intrebare, inainte de \u00abce imi spune mie\u00bb?",
        options: [
          { text: "Ce simt cand citesc asta", correct: false },
          { text: "Cui i s-a scris si de ce", correct: true },
          { text: "Ce spun comentariile despre versetul asta", correct: false },
        ],
        explanation:
          "Fara destinatar si context, versetul devine ce vrem noi sa fie. Cu ele, devine ce a vrut Dumnezeu sa fie - si abia atunci te priveste cu adevarat.",
      },
    },
    {
      id: "u2_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Cuget\u0103 asupra ei zi \u0219i noapte, c\u0103utand s\u0103 faci tot ce este scris \u00een ea.",
        ref: "Iosua 1:8",
      },
    },
    {
      id: "u2_11",
      type: "journal",
      order: 11,
      journalPrompt:
        "Scrie paragraful pe care l-ai citit azi si un singur lucru pe care ai inteles despre Dumnezeu din el. Nu despre tine. Despre El.",
    },
  ],
}

export const umblareL3: Lesson = {
  id: "umblare_l3",
  courseId: "path_umblare",
  order: 3,
  title: "Ascultarea in lucruri mici",
  estMinutes: 11,
  anchorRefs: ["Luca 16:10", "Ioan 14:21", "1 Samuel 15:22"],
  memoryVerseRef: "Ioan 14:21",
  steps: [
    {
      id: "u3_1",
      type: "hook",
      order: 1,
      bubbles: [
        {
          from: "guide",
          text: "Aproape toti asteptam chemarea mare. Sa ne spuna ce sa facem cu viata, cu slujba, cu tara.",
        },
        {
          from: "guide",
          text: "Si aproape toti avem pe undeva un lucru mic pe care ni l-a spus deja si nu l-am facut. Un telefon. O vorba de cerut iertare. O suma de dat inapoi.",
        },
      ],
    },
    {
      id: "u3_2",
      type: "scripture",
      order: 2,
      scripture: {
        text: "Cine este credincios \u00een cele mai mici lucruri este credincios \u0219i \u00een cele mari.",
        ref: "Luca 16:10",
      },
    },
    {
      id: "u3_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Nu e o vorba de intelepciune populara. Iisus o spune intr-un context despre bani, adica despre lucrul cel mai puin spiritual din lista.",
        },
        {
          from: "guide",
          text: "Mesajul e simplu si incomod: nu exista doua rafturi, unul cu lucruri sfinte si altul cu lucruri mici. Ascultarea se antreneaza in raftul de jos.",
        },
      ],
    },
    {
      id: "u3_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Aici sare o frica reala, si o are cine a fost intr-o biserica legalista: \u00abdaca incep sa masor ascultarea, ajung iar la reguli si la frica.\u00bb",
        },
        {
          from: "guide",
          text: "Diferenta e cine te priveste. Legalismul zice: fa, ca sa fii primit. Ascultarea zice: sunt deja primit, si de aia fac. Aceeasi fapta, alt loc de plecare.",
        },
      ],
    },
    {
      id: "u3_5",
      type: "scripture",
      order: 5,
      scripture: {
        text: "Cine are poruncile Mele \u0219i le p\u0103ze\u0219te, acela M\u0103 iube\u0219te; \u0219i Eu \u00eel voi iubi \u0219i M\u0103 voi ar\u0103ta lui.",
        ref: "Ioan 14:21",
      },
    },
    {
      id: "u3_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Citeste finalul inca o data: \u00abMa voi arata lui\u00bb. Nu \u00abil voi rasplati\u00bb. Nu \u00abil voi trece pe lista\u00bb.",
        },
        {
          from: "guide",
          text: "Ascultarea nu cumpara nimic. Ea deschide ochii. E ca geamul spalat - lumina era acolo si inainte.",
        },
        {
          from: "guide",
          text: "De aici vine si uscaciunea despre care se plang oamenii maturi. De multe ori nu e o taceere a Lui. E un lucru mic, stiut, amanat de luni de zile.",
        },
      ],
    },
    {
      id: "u3_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Saul a pierdut domnia pe o ascultare pe jumatate. A adus jertfe frumoase din ce trebuia nimicit, si a explicat foarte bine de ce.",
        },
        {
          from: "guide",
          text: "Samuel i-a raspuns: \u00abascultarea face mai mult decat jertfele\u00bb. Adica: nu-Mi da lucruri, da-Mi ce am cerut.",
        },
        {
          from: "guide",
          text: "Si observa ce e cel mai omenesc din toata scena: Saul chiar credea ca a ascultat. De asta avem nevoie de intrebarea de mai jos, nu de sentimente.",
        },
      ],
    },
    {
      id: "u3_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "Intrebarea de azi, si ea nu e retorica: ce mi-a spus deja si n-am facut?",
        },
        {
          from: "guide",
          text: "Nu cere alt indemn pana nu duci pe ala la capat. Iar daca e prea greu de facut singur, spune-I asa: \u00abvreau, dar nu pot; ajuta-ma azi\u00bb. Asta e o rugaciune la care se raspunde.",
        },
      ],
    },
    {
      id: "u3_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Cand nu simt nimic in relatia cu Dumnezeu, primul lucru de verificat e:",
        options: [
          { text: "Daca m-am rugat destul de mult", correct: false },
          { text: "Daca e un lucru stiut, mic, pe care il amaan", correct: true },
          { text: "Daca am pacatuit prea grav ca sa mai ma primeasca", correct: false },
        ],
        explanation:
          "Nu inseamna ca orice uscaciune vine din neascultare - uneori El tace ca sa ne creasca. Dar e primul lucru de verificat, si e cel mai des trecut cu vederea.",
      },
    },
    {
      id: "u3_10",
      type: "memory_verse",
      order: 10,
      scripture: {
        text: "Cine are poruncile Mele \u0219i le p\u0103ze\u0219te, acela M\u0103 iube\u0219te.",
        ref: "Ioan 14:21",
      },
    },
    {
      id: "u3_11",
      type: "journal",
      order: 11,
      journalPrompt:
        "Scrie lucrul mic pe care il amani. Doar propozitia, fara explicatii si fara sa te aperi. Explicatiile le stii deja.",
    },
  ],
}

export const UMBLARE_A: Lesson[] = [umblareL1, umblareL2, umblareL3]
