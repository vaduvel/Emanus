import type { Lesson } from "../domain.js"

/*
 * CAMERA 5 — partea a doua. Lectiile 5-7 din path_schimbare.
 *
 * ATENTIE, docs/22:
 *  - §1 NENEGOCIABIL: anxietatea, tristetea, insomnia, oboseala si iritabilitatea
 *    pot avea cauze medicale (tiroida, anemie, lipsa de somn, trauma, depresie
 *    clinica). Lectia 6 spune asta explicit si trimite la medic. Nu spunem
 *    niciodata omului ca starea lui vine din lipsa de credinta.
 *  - §2: lectia 5 si lectia 6 primesc avertisment la primul pas. Cand exista
 *    ecranul separat de avertisment in UI, pasul se muta acolo.
 *  - §0: "Emanus nu inlocuieste medicul, psihologul, poliția sau 112" — in `s5_1`
 *    si `s6_1`. Droguri: 0800 870 070. Jocuri: 0800 800 099. Sprijin: 116 123.
 */

export const schimbareL5: Lesson = {
  id: "schimbare_l5",
  courseId: "path_schimbare",
  order: 5,
  title: "Cand cazi din nou",
  estMinutes: 12,
  anchorRefs: ["Proverbe 24:16", "Luca 22:31-34", "1 Corinteni 10:13"],
  memoryVerseRef: "Proverbe 24:16",
  steps: [
    {
      id: "s5_1",
      type: "hook",
      order: 1,
      bubbles: [
        {
          from: "guide",
          text:
            "Lectia asta vorbeste despre cadere si despre rusinea de dupa. Poti opri oricand si poti reveni.",
        },
        {
          from: "guide",
          text:
            "Si ceva ce trebuie spus direct: dacă e vorba de alcool, droguri sau jocuri de noroc, ai nevoie si de ajutor omenesc, nu doar de lectii. Pentru alcool: medicul de familie, un psihiatru sau un serviciu de adictii. Pentru droguri: TelVerde 0800 870 070. Pentru jocuri: programul privat Joc Responsabil, 0800 800 099 (luni-vineri, 10:00-18:00). Sprijin psihologic: 116 123. Urgențe: 112.",
        },
        {
          from: "guide",
          text: "Emanus nu inlocuieste medicul, psihologul, poliția sau 112.",
        },
      ],
    },
    {
      id: "s5_2",
      type: "check_in",
      order: 2,
      bubbles: [{ from: "guide", text: "Cum esti azi?" }],
    },
    {
      id: "s5_3",
      type: "name_struggle",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text:
            "Ce distruge oamenii nu e caderea. E ce se intampla in urmatoarele douasprezece ore dupa ea.",
        },
        {
          from: "guide",
          text:
            "«Vezi, ti-am spus. Degeaba. Nu se schimba nimic. Cine te crezi?» Si urmeaza o saptamana in care nu te mai rogi, si de obicei o cadere mai mare.",
        },
        {
          from: "guide",
          text: "Caderea te da la o parte cu un pas. Ascunderea de dupa te scoate din drum.",
        },
      ],
    },
    {
      id: "s5_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "Cel neprihanit de sapte ori cade si se ridica, dar cei rai se prabusesc in nenorocire.",
        ref: "Proverbe 24:16",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Citește inca o data. Omul neprihanit — adica cel bun, cel pus la punct cu Dumnezeu — cade de sapte ori.",
        },
        {
          from: "guide",
          text:
            "Deci caderea nu il scoate din categorie. Ce il definește e a doua jumatate: se ridica. De fiecare data.",
        },
        {
          from: "guide",
          text: "Diferenta dintre el si celalalt nu e numarul de caderi. E ce face dupa.",
        },
      ],
    },
    {
      id: "s5_5",
      type: "scripture",
      order: 5,
      scripture: {
        text:
          "Simone, Simone, Satana v-a cerut sa va cearna ca grâul. Dar Eu M-am rugat pentru tine, ca sa nu se piarda credința ta; si dupa ce te vei intoarce la Dumnezeu, sa intarești pe fratii tai.",
        ref: "Luca 22:31-32",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Iisus i-a spus asta lui Petru INAINTE sa cada. Stia exact ce urmeaza — si Petru L-a negat de trei ori, ultima injurand.",
        },
        {
          from: "guide",
          text:
            "Si totusi nu i-a spus «poate nu vei cadea». I-a spus «dupa ce te vei intoarce». Se uita deja dincolo de cadere, la ce va face cu el dupa.",
        },
        {
          from: "guide",
          text:
            "Iar sarcina pe care i-o da e sa intareasca pe altii. Adica ce a trecut nu s-a pierdut, a devenit ceva de folos.",
        },
      ],
    },
    {
      id: "s5_6",
      type: "quiz",
      order: 6,
      quiz: {
        question: "Ce e cel mai periculos in cadere?",
        options: [
          { text: "Caderea in sine — dupa ea trebuie luat totul de la zero", correct: false },
          { text: "Rusinea si ascunderea de dupa, care taie legatura exact cand ai nevoie de ea", correct: true },
          { text: "Ca Dumnezeu Se retrage pentru o vreme", correct: false },
          { text: "Ca pierzi ce ai invatat", correct: false },
        ],
        explanation:
          "Iisus S-a rugat pentru Petru ca sa nu se piarda credința lui — nu ca sa nu cada. Petru a fost restabilit si i s-a dat o misiune. Iuda a facut ceva mai mic si nu s-a intors. Diferenta nu a fost gravitatea faptei, a fost intoarcerea.",
      },
    },
    {
      id: "s5_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Un protocol pentru urmatoarea cadere. Invata-l acum, cat esti limpede:",
        },
        {
          from: "guide",
          text: "1. In aceeași zi, nu duminica. Spune-I imediat, cu cuvinte simple. Fara pauza de pedeapsa.",
        },
        {
          from: "guide",
          text: "2. Fara reset. Nu reiei drumul de la lectia unu. Continui de unde erai.",
        },
        {
          from: "guide",
          text: "3. Uita-te la ora si la ce a fost inainte. Fiecare cadere iti arata o veriga pe care nu o vedeai.",
        },
        {
          from: "guide",
          text: "4. Spune-i omului tau. O propozitie: «am cazut, m-am intors». Atat.",
        },
      ],
    },
    {
      id: "s5_8",
      type: "truth_simple",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text:
            "Si o promisiune concreta, nu o incurajare: «Dumnezeu... nu va ingadui sa fiti ispitiți peste puterile voastre, ci va da si mijlocul sa ieșiți din ispita» (1 Corinteni 10:13).",
        },
        {
          from: "guide",
          text:
            "«Mijlocul sa ieșiți» — in greaca, un cuvant folosit pentru o trecere printre munti, o ieșire din strâmtoare.",
        },
        {
          from: "guide",
          text:
            "Exista o ieșire de fiecare data. De obicei e banala si o vezi doar dacă o cauti: pui telefonul in alta camera, ieși din casa, suni pe cineva, spui cu voce tare ce se intampla.",
        },
      ],
    },
    {
      id: "s5_9",
      type: "step",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi: scrie protocolul in trei rânduri, cu cuvintele tale, si pune-l unde il vezi. Nu ca sa il admiri — ca sa il ai la ora doua noaptea, cand nu gandești limpede.",
        },
      ],
    },
    {
      id: "s5_10",
      type: "prayer",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text:
            "«Doamne, cand cad, nu ma lasa sa fug de Tine. Vreau sa mă intorc in aceeași zi.»",
        },
      ],
    },
    {
      id: "s5_11",
      type: "journal",
      order: 11,
      journalPrompt:
        "Scrie ce iti spui de obicei dupa o cadere. Apoi scrie dedesubt: «de sapte ori cade si se ridica».",
    },
    {
      id: "s5_12",
      type: "memory_verse",
      order: 12,
      scripture: { text: "Cel neprihanit de sapte ori cade si se ridica.", ref: "Proverbe 24:16" },
    },
  ],
}

export const schimbareL6: Lesson = {
  id: "schimbare_l6",
  courseId: "path_schimbare",
  order: 6,
  title: "Cand frica si tristetea nu se opresc",
  estMinutes: 12,
  anchorRefs: ["1 Regi 19:4-9", "Psalmul 42:5", "Filipeni 4:6-7"],
  memoryVerseRef: "Psalmul 42:5",
  steps: [
    {
      id: "s6_1",
      type: "hook",
      order: 1,
      bubbles: [
        {
          from: "guide",
          text:
            "Inainte de orice, ceva ce trebuie spus la inceput, nu la final: frica si tristetea care nu se opresc pot avea si cauze medicale. Tiroida, anemia, lipsa de somn, o trauma, o depresie clinica.",
        },
        {
          from: "guide",
          text:
            "Nu e lipsa de credința si nu e pacat. Un om cu piciorul rupt se roaga si merge si la doctor. Fa amandoua.",
        },
        {
          from: "guide",
          text:
            "Daca nu poti funcționa, dacă nu dormi de saptamani, dacă te-ai gandit sa dispari: 112 acum, sau 116 123 pentru sprijin. Emanus nu inlocuieste medicul, psihologul, poliția sau 112.",
        },
      ],
    },
    {
      id: "s6_2",
      type: "check_in",
      order: 2,
      bubbles: [{ from: "guide", text: "Cum esti azi, sincer?" }],
    },
    {
      id: "s6_3",
      type: "scripture",
      order: 3,
      scripture: {
        text:
          "«Destul! Acum, Doamne, ia-mi viața, caci nu sunt mai bun decat parintii mei.» ... Un inger l-a atins si i-a zis: «Scoala-te si mananca.»",
        ref: "1 Regi 19:4,5",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "Omul care spune asta e Ilie. Cu o zi inainte vazuse foc coborand din cer, cel mai mare moment din viața lui.",
        },
        {
          from: "guide",
          text: "A doua zi era sub un copac in pustie, cerand sa moara. Deci nu e vorba de credința slaba.",
        },
        {
          from: "guide",
          text:
            "Si uita-te ce face Dumnezeu primul. Nu il mustra, nu ii face teologie, nu ii cere sa se roage. Il lasa sa doarma si ii da de mancare. De doua ori.",
        },
      ],
    },
    {
      id: "s6_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text:
            "Asta e in Biblie: primul raspuns al lui Dumnezeu la epuizarea unui om a fost somn si mâncare.",
        },
        {
          from: "guide",
          text:
            "Abia apoi a venit vorbirea, si nu in furtuna — intr-un susur blând si subțire.",
        },
        {
          from: "guide",
          text: "Daca Dumnezeu a tratat corpul inainte de suflet, nu e nespîritual sa faci la fel.",
        },
      ],
    },
    {
      id: "s6_5",
      type: "scripture",
      order: 5,
      scripture: {
        text:
          "Pentru ce te mahnesti, suflete, si gemi in mine? Nadajduiește in Dumnezeu, caci iar Îl voi lauda.",
        ref: "Psalmul 42:5",
      },
      bubbles: [
        {
          from: "guide",
          text:
            "E singurul loc din psalm in care omul nu vorbeste cu Dumnezeu. Vorbeste cu el insuși.",
        },
        {
          from: "guide",
          text:
            "Si asta e o abilitate care se invața: sa îți vorbești in loc sa te asculți. Toata ziua te asculți. Rar îți vorbești.",
        },
        {
          from: "guide",
          text:
            "Observa si ca nu isi neaga starea. Recunoaște «gemi in mine», si abia apoi spune ce e adevarat. Nu se pretinde bine.",
        },
      ],
    },
    {
      id: "s6_6",
      type: "world_vs_truth",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text:
            "Filipeni 4:6 e folosit uneori ca o bata: «nu va ingrijorati de nimic», deci daca ai anxietate ai pacatuit.",
        },
        {
          from: "guide",
          text:
            "Citeste tot: «ci in orice lucru aduceti cererile voastre la cunostinta lui Dumnezeu, prin rugaciuni si cereri, cu mulțumiri». Nu e o interdictie de a simti, e o instrucțiune despre unde duci ce simti.",
        },
        {
          from: "guide",
          text:
            "Si pacea promisa «intrece orice pricepere» — adica vine si cand situația nu s-a rezolvat. Nu e acelasi lucru cu «nu mai am nicio problema».",
        },
      ],
    },
    {
      id: "s6_7",
      type: "quiz",
      order: 7,
      quiz: {
        question: "Care a fost primul lucru pe care i l-a dat Dumnezeu lui Ilie, sub copac?",
        options: [
          { text: "O mustrare pentru lipsa de credința", correct: false },
          { text: "Somn si mancare", correct: true },
          { text: "O misiune noua, imediat", correct: false },
          { text: "O explicație despre de ce a permis situația", correct: false },
        ],
        explanation:
          "Textul spune ca a dormit, a fost trezit ca sa mance, apoi a dormit iar si a mancat iar. Corpul intai. De aia somnul, mancarea, mișcarea si, cand e nevoie, un medic nu sunt «variante lumesti» — sunt exact ordinea din 1 Regi 19.",
      },
    },
    {
      id: "s6_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "Ce se face concret, si nu in ordinea in care ai crede:",
        },
        {
          from: "guide",
          text:
            "1. Corpul: somn la ore fixe, mancare, mișcare, mai putină cafea si mai putin telefon noaptea. Si o analiza de sange, dacă nu ai facut de mult.",
        },
        {
          from: "guide",
          text:
            "2. Un om real. Nu «sa nu ii oboseasca pe ceilalti» — asta e vocea bolii, nu politetea.",
        },
        {
          from: "guide",
          text:
            "3. Un profesionist, dacă dureaza. Un psiholog nu inlocuieste rugaciunea, cum nici gipsul nu inlocuieste rugaciunea.",
        },
        {
          from: "guide",
          text:
            "4. Si El, in mijlocul tuturor: nu ca sa dispara starea maine, ci ca sa nu o duci singur pana trece.",
        },
      ],
    },
    {
      id: "s6_9",
      type: "step",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text:
            "Astazi, un singur lucru pentru corp — nu pentru suflet. Culcat cu o ora mai devreme, o masa adevarata, sau douazeci de minute de mers pe jos.",
        },
        {
          from: "guide",
          text: "Si o propozitie spusa cu voce tare la tine: «nadajduiesc in Dumnezeu, chiar acum».",
        },
      ],
    },
    {
      id: "s6_10",
      type: "prayer",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text:
            "«Doamne, nu-Ti cer sa mă fac sa nu simt. Iti cer sa nu pleci pana trece. Si arata-mi de la ce ajutor sa nu fug.»",
        },
      ],
    },
    {
      id: "s6_11",
      type: "journal",
      order: 11,
      journalPrompt: "Un rand: ce ajutor omenesc am evitat pana acum, si de ce?",
    },
    {
      id: "s6_12",
      type: "memory_verse",
      order: 12,
      scripture: { text: "Nadajduiește in Dumnezeu, caci iar Îl voi lauda.", ref: "Psalmul 42:5" },
    },
  ],
}

export const schimbareL7: Lesson = {
  id: "schimbare_l7",
  courseId: "path_schimbare",
  order: 7,
  title: "Cum se schimba cineva, de fapt",
  estMinutes: 11,
  anchorRefs: ["2 Corinteni 3:18", "Filipeni 1:6", "Evrei 10:24-25"],
  memoryVerseRef: "Filipeni 1:6",
  steps: [
    {
      id: "s7_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Ultima din drumul asta. Cum esti azi?" }],
    },
    {
      id: "s7_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text:
            "Ai intrat aici cu «sunt defect, asta sunt». Nu îți promit ca in sapte lectii s-a rezolvat. Ar fi o minciuna si ai mai auzit-o.",
        },
        {
          from: "guide",
          text: "Ce s-a schimbat e altceva: acum stii cum functioneaza, si nu mai lupti cu arma greșită.",
        },
      ],
    },
    {
      id: "s7_3",
      type: "scripture",
      order: 3,
      scripture: {
        text:
          "Noi toți privim cu fata descoperita, ca intr-o oglinda, slava Domnului, si suntem schimbați in acelasi chip al Lui, din slava in slava, prin Duhul Domnului.",
        ref: "2 Corinteni 3:18",
      },
      bubbles: [
        {
          from: "guide",
          text: "Doua lucruri, si amandoua sunt vesti bune.",
        },
        {
          from: "guide",
          text:
            "Primul: verbul e la pasiv — «suntem schimbați». Nu «ne schimbam». Nu e proiectul tau de voința.",
        },
        {
          from: "guide",
          text:
            "Al doilea: se intampla «privind». Te schimbi in ce te uiti. De aia conteaza atat de mult unde stai cu ochii și cu orele.",
        },
      ],
    },
    {
      id: "s7_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "«Din slava in slava» inseamna in trepte. Nu peste noapte.",
        },
        {
          from: "guide",
          text:
            "Asta e important pentru cineva ca tine, care a mai incercat: nu cauta ziua in care nu mai simti nimic. Uita-te la trei luni.",
        },
        {
          from: "guide",
          text:
            "Semnele reale de schimbare nu sunt spectaculoase: te intorci mai repede dupa cadere, minti mai putin, te ascunzi mai putin, cazi mai rar, iti pasa iar de oameni.",
        },
      ],
    },
    {
      id: "s7_5",
      type: "quiz",
      order: 5,
      quiz: {
        question: "Care e semnul cel mai bun ca ceva se schimba real?",
        options: [
          { text: "Nu mai simti nicio ispita", correct: false },
          { text: "Te intorci mai repede dupa cadere si te ascunzi mai putin", correct: true },
          { text: "Nu mai cazi niciodata", correct: false },
          { text: "Simti mereu pace", correct: false },
        ],
        explanation:
          "Nici Iisus n-a fost scutit de ispita. Semnul schimbarii nu e absența luptei, e viteza intoarcerii si sfarsitul ascunderii. Cine se intoarce in aceeași zi, de fiecare data, ajunge intr-un an intr-un loc de nerecunoscut.",
      },
    },
    {
      id: "s7_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text:
            "Si un lucru care nu e opțional, chiar dacă e cel mai greu pentru cine s-a ascuns ani: oamenii.",
        },
        {
          from: "guide",
          text:
            "«Sa veghem unii asupra altora, ca sa ne indemnam la dragoste si la fapte bune. Sa nu părăsim adunarea noastra» (Evrei 10:24-25).",
        },
        {
          from: "guide",
          text:
            "Nu e o regula bisericeasca. E mecanica: ce ramane in intuneric creste, ce e spus incepe sa moara. Un singur om care stie schimba statistica ta mai mult decat un an de hotarari.",
        },
      ],
    },
    {
      id: "s7_7",
      type: "scripture",
      order: 7,
      scripture: {
        text:
          "Sunt increzător ca Acela care a inceput in voi aceasta buna lucrare o va isprăvi pana in ziua lui Iisus Hristos.",
        ref: "Filipeni 1:6",
      },
      bubbles: [
        {
          from: "guide",
          text: "Cine a inceput lucrarea nu esti tu. Deci nici terminarea nu depinde de rezistența ta.",
        },
        {
          from: "guide",
          text:
            "Iar termenul dat nu e luna viitoare. E «ziua lui Hristos». Ai timp. Nu e o scuza ca sa amani — e permisiunea sa nu te mai grabesti si sa nu te mai renegi.",
        },
      ],
    },
    {
      id: "s7_8",
      type: "step",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "Astazi, doua lucruri, si al doilea e cel greu:",
        },
        {
          from: "guide",
          text:
            "1. Pune-ți cele zece minute cu El la aceeași ora, in fiecare zi. Scurt si zilnic bate lung si rar.",
        },
        {
          from: "guide",
          text:
            "2. Spune UNUI om ca te lupti cu asta. Nu tot, nu detalii. Doar: «ma lupt cu ceva si vreau sa stie cineva».",
        },
      ],
    },
    {
      id: "s7_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text:
            "«Doamne, nu ma grabesc si nu ma mai reneg. Tu ai inceput, Tu duci pana la capat. Eu stau cu ochii pe Tine.»",
        },
      ],
    },
    {
      id: "s7_10",
      type: "journal",
      order: 10,
      journalPrompt:
        "Reciteste propozitia cu care te descriai in prima lectie. Scrie acum una noua, chiar dacă nu o simti inca in intregime.",
      bubbles: [
        {
          from: "guide",
          text:
            "Drumul asta s-a terminat. Relația, nu. Ce ai scris ramane al tau, oricare drum alegi mai departe.",
        },
      ],
    },
    {
      id: "s7_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Acela care a inceput in voi aceasta buna lucrare o va isprăvi.",
        ref: "Filipeni 1:6",
      },
    },
  ],
}

export const SCHIMBARE_B: Lesson[] = [schimbareL5, schimbareL6, schimbareL7]
