import type { Lesson } from "../domain.js"
import {
  conversationLesson,
  type ConversationLessonInput,
} from "./conversationCourse.js"

type LessonSeed = Omit<ConversationLessonInput, "courseId" | "order">

function courseLessons(courseId: string, seeds: LessonSeed[]): Lesson[] {
  return seeds.map((seed, index) =>
    conversationLesson({ ...seed, courseId, order: index + 1 }),
  )
}

export const PAZESTE_INIMA_LESSONS = courseLessons("formare_inima", [
  {
    id: "inima_l1",
    title: "Ce numește Biblia «inimă»",
    refs: ["Proverbe 4:20-23", "Marcu 7:20-23", "Romani 10:9-10"],
    memoryRef: "Proverbe 4:23",
    memoryText: "Păzește-ți inima mai mult decât orice, căci din ea ies izvoarele vieții.",
    hook: [
      "În limbajul nostru, inima înseamnă adesea emoție. În Scriptură, inima poate gândi, dori, crede, hotărî și ascunde răul.",
      "Biblia nu ne cere să desenăm o anatomie invizibilă. Ne cere să privim centrul persoanei, locul din care ies credința, motivele și alegerile.",
    ],
    choicePrompt: "Cum vorbești de obicei despre inima ta?",
    branches: [
      {
        label: "Ca despre ce simt în momentul acesta.",
        response:
          "Sentimentul este real, dar nu este singurul glas al inimii și nici verdictul final. Adu lângă el gândul, dorința, motivul și Cuvântul.",
      },
      {
        label: "Ca despre ceva bun, stricat numai de exterior.",
        response:
          "Iisus spune că răul iese și dinăuntru. Presiunea descoperă ce era cultivat; nu poate purta singură vina alegerii tale.",
      },
      {
        label: "Ca despre centrul pe care Dumnezeu trebuie să-l schimbe.",
        response:
          "Aceasta te ține departe atât de fatalism, cât și de autosalvare. Tu ești chemat să păzești, iar Dumnezeu dă inimă nouă și lucrează în tine.",
      },
    ],
    scriptureRef: "Marcu 7:21-23",
    scriptureText:
      "Dinăuntru, din inima oamenilor, ies gândurile rele și faptele care întinează pe om.",
    truth: [
      "Inima este limbajul biblic pentru centrul lăuntric al persoanei, nu o formulă rigidă despre părțile sufletului și duhului.",
      "Păzirea inimii înseamnă să urmărești ce crezi, dorești, iubești și alegi înainte ca rodul să devină vizibil.",
    ],
    quiz: {
      question: "Ce include folosirea biblică a cuvântului «inimă»?",
      correct: "Gânduri, dorințe, credință, motive și hotărâri.",
      wrong: [
        "Numai emoțiile intense.",
        "O schemă exactă cu trei componente ale sufletului și trei ale duhului.",
      ],
      explanation:
        "Textele folosesc termenul în mai multe feluri pentru centrul persoanei; nu oferă anatomia rigidă pretinsă uneori.",
    },
    multiChoice: {
      prompt: "Ce merită cercetat când păzești inima?",
      options: [
        "Ce cred.",
        "Ce doresc.",
        "Ce motiv protejez.",
        "Numai ce văd ceilalți.",
      ],
    },
    action:
      "Alege o reacție din ultimele 24 de ore și scrie patru rânduri: ce ai simțit, ce ai gândit, ce ai dorit și ce ai ales.",
    journal:
      "Ce a ieșit din tine sub presiune și ce arată aceasta despre lucrul pe care îl iubești sau îl temi?",
    prayer:
      "Doamne, cercetează centrul vieții mele. Arată-mi adevărul despre motive și schimbă ce produce rău.",
  },
  {
    id: "inima_l2",
    title: "Mintea hrănită cu adevăr",
    refs: ["Romani 12:1-2", "Filipeni 4:8-9", "2 Corinteni 10:4-5"],
    memoryRef: "Romani 12:2",
    memoryText: "Să vă prefaceți prin înnoirea minții voastre.",
    hook: [
      "Un gând repetat nu devine adevărat, dar poate deveni drumul pe care reacțiile tale îl urmează fără să mai întrebe.",
      "Înnoirea minții nu este optimism religios. Este aducerea ideilor, interpretărilor și imaginației sub adevărul lui Dumnezeu.",
    ],
    choicePrompt: "Ce fel de gând te conduce cel mai des?",
    branches: [
      {
        label: "Un gând acuzator: «nu mai există har pentru mine».",
        response:
          "Dacă ai păcătuit, numește fapta și vino la Hristos. Refuză să transformi vinovăția concretă în identitatea fără speranță pe care Evanghelia o neagă.",
      },
      {
        label: "Un gând justificator: «n-am avut de ales».",
        response:
          "Numește presiunea fără să-i dai autoritatea de a-ți rescrie responsabilitatea. Caută alegerea reală și calea de ascultare care încă există.",
      },
      {
        label: "Un gând anxios despre un viitor pe care nu-l cunosc.",
        response:
          "Separă faptul cunoscut de scenariul imaginat. Planifică ce îți aparține și încredințează lui Dumnezeu ce nu ți-a dat să controlezi.",
      },
    ],
    scriptureRef: "2 Corinteni 10:5",
    scriptureText: "Orice gând îl facem rob ascultării de Hristos.",
    truth: [
      "Nu orice gând care apare este păcat, profeție sau identitate. Devine important ce primești, hrănești și lași să conducă.",
      "Adevărul biblic nu se lipește peste minciună ca slogan; o identifică, o contrazice în context și produce un pas de ascultare.",
    ],
    quiz: {
      question: "Cum este înnoită mintea?",
      correct: "Prin adevărul Scripturii primit, verificat și pus în practică.",
      wrong: [
        "Prin repetarea oricărui gând pozitiv.",
        "Prin tratarea fiecărui gând spontan ca mesaj divin.",
      ],
      explanation:
        "Pavel leagă înnoirea de discernerea voii lui Dumnezeu și de ascultarea concretă.",
    },
    multiChoice: {
      prompt: "Ce întrebare verifică un gând?",
      options: [
        "Este adevărat în lumina textului?",
        "Ce rod produce dacă îl urmez?",
        "Ce fapt și ce presupunere conține?",
        "Îmi place suficient ca să devină adevărat?",
      ],
    },
    action:
      "Scrie un gând repetat, dovezile reale, minciuna lui și un text biblic folosit în context. Adaugă o acțiune care urmează adevărul.",
    journal:
      "Ce gând ai protejat fiindcă îți oferă scuză, control sau autopedepsire?",
    prayer:
      "Iisuse, supun mintea mea adevărului Tău. Ajută-mă să nu hrănesc acuzația, scuza sau scenariul care mă îndepărtează de ascultare.",
  },
  {
    id: "inima_l3",
    title: "Conștiință sensibilă, slabă sau întinată",
    refs: [
      "Romani 2:14-15",
      "1 Corinteni 8:7-13",
      "1 Timotei 1:5,19",
      "Evrei 9:13-14",
    ],
    memoryRef: "1 Timotei 1:5",
    memoryText: "Ținta poruncii este dragostea care vine dintr-o inimă curată și un cuget bun.",
    hook: [
      "Conștiința poate acuza, apăra, avertiza sau tăcea. Faptul că simți vină nu dovedește automat că ai păcătuit, iar lipsa vinei nu dovedește automat nevinovăția.",
      "Conștiința trebuie respectată și formată de Cuvânt, nu ridicată deasupra Cuvântului.",
    ],
    choicePrompt: "Cum lucrează conștiința ta în perioada aceasta?",
    branches: [
      {
        label: "Mă acuză pentru lucruri pe care Scriptura nu le interzice.",
        response:
          "Nu o zdrobi și nu o numi direct vocea lui Dumnezeu. Cercetează textul, motivul și sfatul matur; conștiința slabă are nevoie de adevăr și timp.",
      },
      {
        label: "A devenit tăcută într-un păcat repetat.",
        response:
          "Tăcerea poate veni din împietrire, nu din libertate. Oprește fapta, numește-o și readu-te voluntar sub lumină și responsabilitate.",
      },
      {
        label: "Mă avertizează clar și tot negociez.",
        response:
          "Nu căuta încă zece confirmări ca să amâni ascultarea. Dacă Scriptura numește fapta, răspunde acum și repară ce ai făcut.",
      },
    ],
    scriptureRef: "Evrei 9:14",
    scriptureText:
      "Sângele lui Hristos vă va curăți cugetul de faptele moarte, ca să slujiți Dumnezeului celui viu.",
    truth: [
      "Conștiința este martor lăuntric, dar nu este infailibilă. Poate fi slabă, rănită, întinată sau formată greșit.",
      "Hristos curăță conștiința vinovată, iar Scriptura o formează pentru a numi corect binele și răul.",
    ],
    quiz: {
      question: "Care afirmație despre conștiință este corectă?",
      correct: "Trebuie ascultată cu grijă și formată continuu de Scriptură.",
      wrong: [
        "Este întotdeauna identică cu glasul lui Dumnezeu.",
        "Poate fi ignorată fără consecințe dacă nu te simți vinovat.",
      ],
      explanation:
        "Biblia vorbește despre conștiințe bune, slabe, întinate și însemnate; de aceea sentimentul trebuie verificat prin adevăr.",
    },
    multiChoice: {
      prompt: "Ce ajută la formarea conștiinței?",
      options: [
        "Scriptura în context.",
        "Ascultarea repetată.",
        "Comunitatea matură.",
        "Evitarea oricărei întrebări dificile.",
      ],
    },
    action:
      "Pentru o vină actuală, scrie: porunca sau principiul biblic, fapta concretă, ce trebuie mărturisit și ce trebuie primit prin Hristos.",
    journal:
      "Unde te acuză conștiința fără text și unde ai redus-o la tăcere împotriva unui text clar?",
    prayer:
      "Doamne, curăță-mi conștiința prin Hristos și formeaz-o prin adevăr. Fă-mă sensibil fără scrupule inventate și liber fără împietrire.",
  },
  {
    id: "inima_l4",
    title: "Păzește izvoarele, nu doar aparența",
    refs: ["Proverbe 4:20-27", "Psalmul 101:2-3", "Matei 6:19-24"],
    memoryRef: "Proverbe 4:26",
    memoryText: "Cărarea pe care mergi să fie netedă și toate căile tale să fie hotărâte.",
    hook: [
      "Păzirea inimii nu se face într-o clipă intensă, ci prin lucrurile pe care ochiul le caută, urechea le primește, mintea le repetă și piciorul le urmează.",
      "Nu păzești izvorul dacă lași toate canalele deschise și te rogi doar după ce apa s-a tulburat.",
    ],
    choicePrompt: "Care poartă este cel mai puțin păzită?",
    branches: [
      {
        label: "Ce privesc și consum.",
        response:
          "Nu trata alimentarea ca pe un detaliu neutru. Oprește sursa care îți antrenează pofta, comparația, frica sau disprețul.",
      },
      {
        label: "O relație care îmi modelează dorințele.",
        response:
          "Numește influența fără să demonizezi omul. Stabilește limita și caută apropierea unor oameni care te îndeamnă la adevăr și dragoste.",
      },
      {
        label: "Programul care mă lasă mereu vulnerabil.",
        response:
          "Oboseala nu produce singură păcatul, dar reduce vigilența. Mută somnul, telefonul, singurătatea sau accesul înaintea momentului de slăbiciune.",
      },
    ],
    scriptureRef: "Proverbe 4:25-27",
    scriptureText:
      "Ochii tăi să privească drept; nu te abate nici la dreapta, nici la stânga și ferește-te de rău.",
    truth: [
      "Păzirea inimii include limite concrete asupra atenției, relațiilor, timpului și accesului.",
      "Limita nu mântuiește și nu schimbă singură inima, dar refuzul limitei arată adesea că încă protejezi ceea ce te stăpânește.",
    ],
    quiz: {
      question: "Ce înseamnă practic să-ți păzești inima?",
      correct: "Să unești adevărul lăuntric cu limite și căi concrete de ascultare.",
      wrong: [
        "Să eviți orice persoană care gândește diferit.",
        "Să te bazezi pe intensitatea voinței din momentul ispitei.",
      ],
      explanation:
        "Proverbe leagă inima de ureche, ochi, gură și picioare: interiorul și traseul exterior se formează reciproc.",
    },
    multiChoice: {
      prompt: "Ce poartă poți păzi astăzi?",
      options: [
        "Conținutul consumat.",
        "Programul și odihna.",
        "Accesul la ispită.",
        "O relație de responsabilitate.",
      ],
    },
    action:
      "Închide astăzi o cale concretă care hrănește ce vrei să părăsești și deschide o cale concretă spre adevăr.",
    journal:
      "Ce spui că vrei să schimbi, dar continui să alimentezi prin ochi, timp sau acces?",
    prayer:
      "Doamne, păzește-mi inima și dă-mi curaj să schimb drumul, nu doar să regret destinația.",
    declaration:
      "Completează: «Voi păzi astăzi poarta ___ prin limita ___. Voi hrăni adevărul prin ___.»",
  },
])

export const AUZI_SI_RAMAI_LESSONS = courseLessons("formare_auzire", [
  {
    id: "auzire_l1",
    title: "Sămânța și pământul inimii",
    refs: ["Marcu 4:3-20", "Luca 8:15", "Iacov 1:21"],
    memoryRef: "Marcu 4:20",
    memoryText: "Ei aud Cuvântul, îl primesc și fac rod.",
    hook: [
      "Aceeași sămânță cade pe patru feluri de pământ. Problema nu este lipsa puterii Cuvântului, ci felul în care este primit și păstrat.",
      "Pilda nu îți dă voie să-i etichetezi rapid pe ceilalți. Te cheamă să întrebi ce se întâmplă acum cu adevărul auzit de tine.",
    ],
    choicePrompt: "Ce amenință cel mai mult Cuvântul auzit?",
    branches: [
      {
        label: "Îl aud, dar nu-l las să intre.",
        response:
          "Cere lui Dumnezeu o inimă receptivă și oprește apărarea automată. Reformulează cu propriile cuvinte ce spune textul înainte să-l respingi.",
      },
      {
        label: "Încep cu entuziasm și abandonez sub presiune.",
        response:
          "Nu confunda bucuria inițială cu rădăcina. Leagă adevărul de comunitate, repetiție și ascultare când costul devine vizibil.",
      },
      {
        label: "Grijile și dorința după mai mult îl sufocă.",
        response:
          "Numește concurentul: bani, control, imagine sau plăcere. Nu-l trata ca zgomot neutru dacă îți ocupă atenția și ascultarea.",
      },
    ],
    scriptureRef: "Luca 8:15",
    scriptureText:
      "Sămânța din pământul bun sunt cei ce aud Cuvântul, îl țin într-o inimă bună și curată și fac rod în răbdare.",
    truth: [
      "A auzi biblic înseamnă mai mult decât a recepționa sunetul: înseamnă a primi, păstra și urma adevărul.",
      "O inimă împietrită poate refuza Cuvântul, dar nu orice dificultate de concentrare sau traumă este dovada împietririi. Nu inventăm diagnostice spirituale.",
    ],
    quiz: {
      question: "Ce dovedește primirea Cuvântului?",
      correct: "Rodul care apare prin păstrare și răbdare.",
      wrong: [
        "Emoția puternică din prima zi.",
        "Numărul de predici ascultate fără ascultare.",
      ],
      explanation:
        "Iisus urmărește traseul de la auzire la rădăcină, perseverență și rod.",
    },
    multiChoice: {
      prompt: "Ce poate sufoca adevărul?",
      options: [
        "Grijile.",
        "Înșelăciunea bogățiilor.",
        "Dorința după alte lucruri.",
        "Aplicarea concretă.",
      ],
    },
    action:
      "Alege un verset din Marcu 4, reformulează-l și stabilește o ascultare verificabilă pentru astăzi.",
    journal:
      "Care dintre cele patru pământuri descrie felul în care ai primit ultimul adevăr care te-a incomodat?",
    prayer:
      "Doamne, desțelenește ce s-a întărit, adâncește rădăcina și curăță spinii care sufocă adevărul.",
  },
  {
    id: "auzire_l2",
    title: "Rămâi când ascultarea costă",
    refs: ["Ioan 8:31-32", "Evrei 3:12-14", "Iacov 1:22-25"],
    memoryRef: "Ioan 8:31",
    memoryText: "Dacă rămâneți în Cuvântul Meu, sunteți în adevăr ucenicii Mei.",
    hook: [
      "Poți fi mișcat de adevăr și totuși să-l pierzi când devine repetitiv, lent sau costisitor.",
      "Perseverența nu cumpără mântuirea. Ea arată o credință care continuă să vină la Hristos, să primească avertismentul și să asculte.",
    ],
    choicePrompt: "Unde se rupe cel mai des continuitatea ta?",
    branches: [
      {
        label: "După ce emoția dispare.",
        response:
          "Leagă ascultarea de adevăr, nu de intensitatea zilei. Un pas mic repetat poate fi mai sincer decât o promisiune mare uitată.",
      },
      {
        label: "Când cineva mă corectează.",
        response:
          "Verifică textul și faptele înainte să respingi tonul sau persoana. Corectarea greșită nu face automat neadevărat lucrul pe care trebuie să-l vezi.",
      },
      {
        label: "Când rămân singur.",
        response:
          "Evrei poruncește îndemnul reciproc tocmai împotriva înșelăciunii păcatului. Alege un om concret, nu ideea abstractă de comunitate.",
      },
    ],
    scriptureRef: "Evrei 3:13-14",
    scriptureText:
      "Îndemnați-vă unii pe alții în fiecare zi, ca niciunul să nu se împietrească prin înșelăciunea păcatului.",
    truth: [
      "Păcatul înșală înainte să împietrească. De aceea ai nevoie de Cuvânt repetat și de oameni care pot spune adevărul.",
      "Rămânerea nu este pasivitate. Înseamnă auzire, practică, corectare și întoarcere la Hristos când ai căzut.",
    ],
    quiz: {
      question: "Ce susține perseverența biblică?",
      correct: "Rămânerea în Cuvânt și îndemnul reciproc pus în practică.",
      wrong: [
        "Entuziasmul continuu fără disciplină.",
        "Izolarea până când mă simt din nou puternic.",
      ],
      explanation:
        "Iisus vorbește despre rămânere, iar Evrei despre comunitatea care luptă împotriva înșelăciunii.",
    },
    multiChoice: {
      prompt: "Ce te ajută să rămâi?",
      options: [
        "Cuvântul repetat.",
        "Un pas concret.",
        "Un om care mă poate corecta.",
        "Ascunderea căderii.",
      ],
    },
    action:
      "Trimite unui om matur versetul pe care vrei să-l urmezi și cere-i să te întrebe peste trei zile ce ai făcut.",
    journal:
      "Ce adevăr ai primit cu bucurie, dar ai abandonat când a început să coste?",
    prayer:
      "Iisuse, ține-mă în Cuvântul Tău și dă-mi frați care mă îndeamnă. Păzește-mă de înșelăciunea izolării.",
    declaration:
      "Completează: «Voi rămâne în adevărul ___ prin pasul ___ și îi voi cere lui ___ să meargă cu mine.»",
  },
])

export const DECIZII_SUB_CUVANT_LESSONS = courseLessons("formare_decizii", [
  {
    id: "decizii_l1",
    title: "Ce valoare conduce alegerea",
    refs: ["Psalmul 119:105", "Proverbe 3:5-7", "Romani 12:1-2"],
    memoryRef: "Psalmul 119:105",
    memoryText: "Cuvântul Tău este o candelă pentru picioarele mele și o lumină pe cărarea mea.",
    hook: [
      "Când două opțiuni par posibile, alegerea scoate la lumină ce prețuiești: adevărul, confortul, imaginea, controlul sau iubirea aproapelui.",
      "Biblia nu oferă numele fiecărui job sau oraș, dar îți formează valorile și limitele în care hotărârea poate fi înțeleaptă.",
    ],
    choicePrompt: "Ce cântărește cel mai greu într-o decizie actuală?",
    branches: [
      {
        label: "Să nu pierd confortul sau banii.",
        response:
          "Confortul și administrarea banilor contează, dar nu pot cumpăra încălcarea unei porunci sau neglijarea oamenilor aflați în responsabilitatea ta.",
      },
      {
        label: "Să nu dezamăgesc oamenii.",
        response:
          "Sfatul lor poate fi prețios, dar aprobarea nu este Domn. Separă dragostea și respectul de frica ce te face să trădezi convingerea biblică.",
      },
      {
        label: "Să ascult de Dumnezeu chiar dacă pierd ceva.",
        response:
          "Verifică să fie o poruncă sau un principiu real, nu impulsul tău botezat spiritual. Apoi acceptă costul fără să-l folosești ca dovadă de superioritate.",
      },
    ],
    scriptureRef: "Romani 12:2",
    scriptureText:
      "Să vă prefaceți prin înnoirea minții, ca să puteți deosebi voia lui Dumnezeu cea bună, plăcută și desăvârșită.",
    truth: [
      "Deciziile mature încep cu poruncile clare și continuă cu înțelepciune în lucrurile unde există libertate.",
      "Valoarea dominantă se vede adesea în lucrul pe care refuzi să-l riști, chiar când adevărul cere altceva.",
    ],
    quiz: {
      question: "Cum luminează Scriptura o decizie fără poruncă explicită?",
      correct: "Formează valorile, scopurile și limitele în care alegem înțelept.",
      wrong: [
        "Oferă întotdeauna un verset cu numele opțiunii.",
        "Ne permite să alegem orice dacă simțim pace.",
      ],
      explanation:
        "Cuvântul nu este oracol de fragmente, ci lumină care înnoiește mintea și definește binele.",
    },
    multiChoice: {
      prompt: "Ce trebuie verificat înaintea alegerii?",
      options: [
        "Poruncile clare.",
        "Motivul inimii.",
        "Efectul asupra oamenilor.",
        "Numai avantajul imediat.",
      ],
    },
    action:
      "Scrie cele două opțiuni și, sub fiecare, valoarea pe care o protejează, porunca relevantă și costul pentru aproapele.",
    journal:
      "Ce lucru ți-e atât de teamă să pierzi încât îți poate conduce alegerea împotriva adevărului?",
    prayer:
      "Doamne, înnoiește-mi mintea și arată-mi valoarea care mă conduce. Fă Cuvântul Tău lumină pentru pasul de azi.",
  },
  {
    id: "decizii_l2",
    title: "Asumare fără învinovățirea lui Dumnezeu",
    refs: ["Geneza 3:9-13", "Proverbe 19:3", "Galateni 6:7-8"],
    memoryRef: "Proverbe 19:3",
    memoryText: "Nebunia omului îi sucește calea și apoi cârtește împotriva Domnului.",
    hook: [
      "Adam a arătat spre Eva și spre Dumnezeu; Eva a arătat spre șarpe. Faptele celorlalți erau reale, dar fiecare trebuia să răspundă pentru propria alegere.",
      "Asumarea nu înseamnă să preiei vina agresorului sau a circumstanței. Înseamnă să separi exact ce ți s-a făcut de ceea ce ai ales tu.",
    ],
    choicePrompt: "Ce îți face asumarea dificilă?",
    branches: [
      {
        label: "Mi s-a făcut un rău real.",
        response:
          "Numește răul fără să-l micșorezi și nu-l lua asupra ta. Apoi cercetează separat dacă ai răspuns printr-o alegere păcătoasă care îți aparține.",
      },
      {
        label: "Mă tem că recunoașterea mă va face singurul vinovat.",
        response:
          "Responsabilitățile nu se anulează reciproc. Poți spune «am făcut aceasta» fără să spui «celălalt este nevinovat».",
      },
      {
        label: "Am numit consecința mea «voia lui Dumnezeu».",
        response:
          "Dumnezeu rămâne suveran, dar suveranitatea nu transformă semănatul tău în nevinovăție. Numește legătura cunoscută dintre faptă și rod.",
      },
    ],
    scriptureRef: "Galateni 6:7",
    scriptureText: "Ce seamănă omul, aceea va și secera.",
    truth: [
      "Adevărul biblic refuză atât victimizarea falsă, cât și învinovățirea victimei. Fiecare răspunde pentru ce a făcut, nu pentru păcatul altuia.",
      "Când legătura dintre alegere și consecință este cunoscută, nu o numim doar atac, încercare sau mister.",
    ],
    quiz: {
      question: "Cum arată asumarea corectă?",
      correct: "Separă răul primit de alegerea proprie și numește fiecare responsabilitate.",
      wrong: [
        "Preia toată vina ca să se termine conflictul.",
        "Neagă alegerea proprie fiindcă altcineva a început.",
      ],
      explanation:
        "Biblia nu cere contabilitate confuză, ci adevăr despre fiecare faptă și fiecare autor.",
    },
    multiChoice: {
      prompt: "Ce propoziție poate face parte din asumare?",
      options: [
        "Mi s-a făcut răul ___.",
        "Eu am ales să ___.",
        "Consecința cunoscută este ___.",
        "Totul este vina mea, indiferent de fapte.",
      ],
    },
    action:
      "Împarte o situație în trei coloane: ce mi s-a făcut, ce am ales eu, ce consecință urmează fiecărei fapte.",
    journal:
      "Pe cine ai învinovățit pentru o alegere care îți aparține și ce vină străină ai preluat inutil?",
    prayer:
      "Dumnezeule al adevărului, ajută-mă să nu mut vina și să nu preiau vina altuia. Dă-mi pocăință pentru partea mea și curaj pentru adevărul întreg.",
  },
  {
    id: "decizii_l3",
    title: "Poruncă, exemplu și libertate",
    refs: ["1 Corinteni 10:6,11", "2 Timotei 3:16-17", "1 Corinteni 11:1"],
    memoryRef: "2 Timotei 3:16",
    memoryText: "Toată Scriptura este insuflată de Dumnezeu și de folos pentru învățătură.",
    hook: [
      "Biblia conține porunci, promisiuni, istorie, poezie și exemple. Dacă transformi orice faptă descrisă în poruncă, poți cere în numele lui Dumnezeu ce El nu a cerut.",
      "Exemplele ne formează, dar trebuie citite prin explicația pe care textul și restul Scripturii o dau despre ele.",
    ],
    choicePrompt: "Ce eroare faci mai ușor cu exemplele biblice?",
    branches: [
      {
        label: "Copiez acțiunea fără să verific dacă este aprobată.",
        response:
          "Descrierea nu este automat recomandare. Caută verdictul naratorului, consecința, poruncile clare și locul episodului în istoria răscumpărării.",
      },
      {
        label: "Ignor exemplele fiindcă nu sunt porunci.",
        response:
          "Pavel spune că au fost scrise ca avertisment. Exemplul poate arăta rodul necredinței sau modelul credincioșiei fără să devină ritual de copiat.",
      },
      {
        label: "Folosesc un personaj ca model fără să privesc la Hristos.",
        response:
          "Oamenii biblici au credință și eșec. Urmează-i în măsura în care Îl urmează pe Hristos, nu transforma eroul într-un salvator fără păcat.",
      },
    ],
    scriptureRef: "1 Corinteni 10:11",
    scriptureText:
      "Aceste lucruri li s-au întâmplat ca să ne slujească drept pilde și au fost scrise pentru învățătura noastră.",
    truth: [
      "Porunca cere ascultare directă; principiul cere înțelepciune; exemplul cere interpretare înainte de imitație.",
      "Hristos este centrul și Domnul Scripturii. Niciun personaj nu trebuie desprins de lucrarea și învățătura Lui.",
    ],
    quiz: {
      question: "Când devine o acțiune descrisă model pentru noi?",
      correct: "Când textul și învățătura Scripturii o aprobă și arată principiul urmărit.",
      wrong: [
        "Ori de câte ori un personaj important o face.",
        "Numai când acțiunea produce succes imediat.",
      ],
      explanation:
        "Statutul personajului și rezultatul temporar nu înlocuiesc verdictul biblic asupra faptei.",
    },
    multiChoice: {
      prompt: "Ce verifici într-o narațiune?",
      options: [
        "Ce descrie.",
        "Ce aprobă sau condamnă.",
        "Ce porunci clare se aplică.",
        "Ce detaliu pot copia fără context.",
      ],
    },
    action:
      "Ia o decizie justificată printr-un personaj biblic și verifică dacă textul descrie, aprobă, poruncește sau avertizează.",
    journal:
      "Ce exemplu ai folosit pentru a legitima o alegere pe care o doreai deja?",
    prayer:
      "Doamne, învață-mă să primesc toată Scriptura corect și să urmez exemplele numai în măsura în care mă conduc la Hristos și ascultare.",
  },
  {
    id: "decizii_l4",
    title: "Testul biblic al unei decizii",
    refs: ["Iacov 1:5", "1 Corinteni 6:12", "Coloseni 3:17", "Proverbe 15:22"],
    memoryRef: "Coloseni 3:17",
    memoryText: "Orice faceți să faceți în Numele Domnului Iisus.",
    hook: [
      "Nu orice opțiune permisă este folositoare și nu orice ușă deschisă este chemare. Uneori alegerea matură renunță la un drept pentru dragoste, libertate și mărturie.",
      "Un test bun nu îți promite certitudine absolută. Îți cere să aduci decizia sub poruncă, motiv, stăpânire, sfat și rod.",
    ],
    choicePrompt: "Ce lipsește cel mai mult din procesul tău?",
    branches: [
      {
        label: "Verificarea poruncilor și principiilor.",
        response:
          "Începe acolo. Nicio impresie, oportunitate sau profeție personală nu primește autoritatea de a anula un text clar.",
      },
      {
        label: "Sfatul oamenilor maturi.",
        response:
          "Caută oameni care pot contrazice, nu doar confirma. Spune-le și costul, motivul și detaliile care ar putea schimba verdictul.",
      },
      {
        label: "Curajul de a decide fără semn extraordinar.",
        response:
          "După ce ai verificat adevărul, motivul și sfatul, poți alege în libertate și încredere. Înțelepciunea nu este ghicire spirituală.",
      },
    ],
    scriptureRef: "1 Corinteni 6:12",
    scriptureText:
      "Toate lucrurile îmi sunt îngăduite, dar nu toate sunt de folos; nu mă voi lăsa stăpânit de ceva.",
    truth: [
      "Întreabă: este interzis, este folositor, mă stăpânește, zidește, poate fi făcut în Numele lui Iisus și ce sfat matur am primit?",
      "Pacea subiectivă poate însoți o alegere bună, dar nu poate anula porunca, faptele sau responsabilitatea.",
    ],
    quiz: {
      question: "Care criteriu este insuficient singur?",
      correct: "Faptul că simt pace sau că ușa este deschisă.",
      wrong: [
        "Conformitatea cu poruncile clare.",
        "Refuzul lucrului care mă stăpânește.",
      ],
      explanation:
        "Sentimentul și oportunitatea trebuie testate, nu folosite ca verdict final peste Scriptură și înțelepciune.",
    },
    multiChoice: {
      prompt: "Prin ce test va trece decizia ta?",
      options: [
        "Poruncă și principiu.",
        "Motiv și stăpânire.",
        "Rod asupra aproapelui.",
        "Sfat matur.",
      ],
    },
    action:
      "Trece decizia actuală prin cele patru teste alese și notează ce informație îți mai lipsește înainte să hotărăști.",
    journal:
      "Dacă Dumnezeu nu îți dă un semn spectaculos, ce adevăr și ce înțelepciune ai deja pentru a decide?",
    prayer:
      "Doamne, dă-mi înțelepciune fără superstiție, sfat fără dependență de oameni și curaj să aleg în ascultare.",
    declaration:
      "Completează: «Alegerea mea va rămâne sub porunca ___, va refuza stăpânirea ___ și va urmări binele ___.»",
  },
])

export const LIMBA_CARE_RANESTE_SI_REPARA_LESSONS = courseLessons(
  "formare_limba",
  [
    {
      id: "limba_l1",
      title: "Cuvintele dau direcție",
      refs: ["Proverbe 18:20-21", "Iacov 3:2-5", "Proverbe 12:18"],
      memoryRef: "Proverbe 12:18",
      memoryText: "Limba înțelepților aduce vindecare.",
      hook: [
        "O propoziție nu creează realitatea prin putere magică, dar poate spune adevărul, poate aprinde frica, poate rupe încrederea sau poate orienta o relație ani întregi.",
        "Iacov compară limba cu frâul și cârma: mică, dar capabilă să dea direcție unui întreg trup.",
      ],
      choicePrompt: "Ce efect au cel mai des cuvintele tale?",
      branches: [
        {
          label: "Controlează prin teamă, vină sau tăcere.",
          response:
            "Controlul poate suna calm și tot rămâne manipulare. Numește ce vrei legitim și lasă celuilalt libertatea și responsabilitatea răspunsului.",
        },
        {
          label: "Taie repede când sunt furios.",
          response:
            "Nu numi sinceritate lovitura menită să pedepsească. Oprește conversația înainte de explozie și revino cu fapta, efectul și cererea clară.",
        },
        {
          label: "Zidesc, dar evit adevărul greu.",
          response:
            "Zidirea nu este compliment permanent. Uneori dragostea spune adevărul dificil fără dispreț și fără intenția de a zdrobi.",
        },
      ],
      scriptureRef: "Iacov 3:4-5",
      scriptureText:
        "O corabie mare este cârmuită de o cârmă foarte mică; tot așa și limba este un mic mădular.",
      truth: [
        "Cuvintele nu sunt incantații, dar sunt acțiuni morale cu direcție și consecințe reale.",
        "Puterea vorbirii cere stăpânire, adevăr și intenția de a sluji binele, nu controlul imaginii sau al celuilalt.",
      ],
      quiz: {
        question: "Ce arată imaginile frâului și cârmei?",
        correct: "Că un lucru mic poate orienta un întreg traseu.",
        wrong: [
          "Că orice propoziție rostită devine profeție.",
          "Că tăcerea este întotdeauna mai sfântă decât vorbirea.",
        ],
        explanation:
          "Iacov avertizează asupra influenței morale a limbii, nu predă o lege magică a declarațiilor.",
      },
      multiChoice: {
        prompt: "Ce poate produce vorbirea?",
        options: [
          "Direcție.",
          "Vindecare.",
          "Rănire.",
          "Control magic asupra lui Dumnezeu.",
        ],
      },
      action:
        "Alege o conversație importantă și scrie înainte scopul, adevărul necesar și formularea care nu atacă demnitatea omului.",
      journal:
        "Ce încerci să obții prin ton, tăcere, exagerare sau amenințare?",
      prayer:
        "Doamne, pune adevăr și dragoste în gura mea. Oprește cuvântul care controlează și dă direcție bună vorbirii mele.",
    },
    {
      id: "limba_l2",
      title: "Toți greșim în vorbire",
      refs: ["Iacov 3:1-2", "Matei 12:35-37", "Psalmul 141:3"],
      memoryRef: "Psalmul 141:3",
      memoryText: "Pune, Doamne, o strajă înaintea gurii mele.",
      hook: [
        "«Așa sunt eu, mai direct» poate fi adevăr despre obiceiul tău și totuși scuză pentru păcat. Temperamentul explică viteza, nu sfințește lovitura.",
        "Iacov spune că toți greșim. Aceasta ne smerește, dar nu ne dă voie să normalizăm aceeași rană la nesfârșit.",
      ],
      choicePrompt: "Cum reacționezi când afli că vorba ta a rănit?",
      branches: [
        {
          label: "Explic ce am vrut să spun.",
          response:
            "Intenția contează, dar nu șterge efectul și nici formularea. Ascultă până poți reda ce a primit celălalt înainte să-ți aperi motivul.",
        },
        {
          label: "Spun că omul este prea sensibil.",
          response:
            "Poate exista sensibilitate greșită, dar eticheta nu te achită. Verifică dacă ai spus adevărul la timpul, tonul și măsura potrivită.",
        },
        {
          label: "Recunosc repede, dar repet la fel.",
          response:
            "Scuza fără plan poate deveni costul mic prin care păstrezi obiceiul. Identifică semnalul de oprire și o formulare alternativă verificabilă.",
        },
      ],
      scriptureRef: "Matei 12:36",
      scriptureText: "Oamenii vor da socoteală de orice cuvânt nefolositor pe care-l vor fi rostit.",
      truth: [
        "Universalitatea greșelii produce smerenie și vigilență, nu indulgență față de abuzul verbal.",
        "Responsabilitatea include cuvântul, tonul, contextul și refuzul de a asculta efectul asupra celuilalt.",
      ],
      quiz: {
        question: "Ce răspuns este matur când cuvântul a rănit?",
        correct: "Ascult efectul, numesc fapta și schimb tiparul concret.",
        wrong: [
          "Îmi apăr intenția până celălalt renunță.",
          "Spun că toți greșesc și închei discuția.",
        ],
        explanation:
          "Smerenia din Iacov nu ascunde răul, ci recunoaște nevoia permanentă de strajă și reparare.",
      },
      multiChoice: {
        prompt: "Ce trebuie cercetat după o rană verbală?",
        options: [
          "Cuvintele exacte.",
          "Tonul și momentul.",
          "Efectul și tiparul.",
          "Numai intenția mea.",
        ],
      },
      action:
        "Întreabă o persoană sigură: «Ce fac în conversații când devin defensiv?» Ascultă fără să corectezi răspunsul.",
      journal:
        "Ce expresie folosești ca scuză pentru felul în care vorbești?",
      prayer:
        "Doamne, pune strajă gurii mele și fă-mă gata să ascult când cineva îmi arată rodul cuvintelor mele.",
    },
    {
      id: "limba_l3",
      title: "Focul care scapă din control",
      refs: ["Iacov 3:5-12", "Efeseni 4:29-32", "Proverbe 26:20-22"],
      memoryRef: "Efeseni 4:29",
      memoryText: "Niciun cuvânt stricat să nu vă iasă din gură, ci unul bun pentru zidire.",
      hook: [
        "Bârfa începe ca informație interesantă, sarcasmul ca glumă, iar izbucnirea ca apărare. Focul nu cere mult până ajunge dincolo de intenția inițială.",
        "A opri focul înseamnă uneori să nu mai adaugi combustibil, alteori să corectezi public minciuna pe care ai răspândit-o.",
      ],
      choicePrompt: "Ce combustibil folosește cel mai des limba ta?",
      branches: [
        {
          label: "Bârfa și informația care nu-mi aparține.",
          response:
            "Întreabă dacă persoana are nevoie să știe pentru protecție sau responsabilitate. Dacă nu, oprește transmiterea și refuză să numești curiozitatea «grijă».",
        },
        {
          label: "Sarcasmul care pedepsește fără confruntare.",
          response:
            "Spune cererea sau durerea direct. Sarcasmul îți oferă negare plauzibilă și îl lasă pe celălalt rănit fără un adevăr clar la care să răspundă.",
        },
        {
          label: "Furia care scoate toate dosarele vechi.",
          response:
            "Oprește conversația, reglează intensitatea și revino la o singură faptă. Adevărul nu are nevoie de avalanșă ca să fie adevăr.",
        },
      ],
      scriptureRef: "Iacov 3:5-6",
      scriptureText: "Iată, un foc mic ce pădure mare aprinde! Limba este și ea un foc.",
      truth: [
        "Cuvântul stricat nu este doar înjurătura. Include vorbirea care corupe, denaturează, exploatează sau aprinde conflictul.",
        "Zidirea nu înseamnă evitarea confruntării, ci adevăr potrivit nevoii, rostit la timp și fără otravă.",
      ],
      quiz: {
        question: "Cum se oprește focul vorbirii?",
        correct: "Prin oprirea combustibilului și înlocuirea lui cu adevăr care zidește.",
        wrong: [
          "Prin răspândirea poveștii numai către oameni apropiați.",
          "Prin folosirea sarcasmului în locul unei acuzații directe.",
        ],
        explanation:
          "Pavel nu cere doar tăcere, ci înlocuirea vorbirii stricate cu un cuvânt potrivit pentru zidire.",
      },
      multiChoice: {
        prompt: "Ce trebuie oprit?",
        options: [
          "Transmiterea inutilă.",
          "Exagerarea.",
          "Sarcasmul punitiv.",
          "Confruntarea adevărată și respectuoasă.",
        ],
      },
      action:
        "Oprește astăzi un lanț de bârfă sau sarcasm. Dacă ai transmis ceva fals, pregătește corectarea către aceleași persoane.",
      journal:
        "Ce tip de foc aprinzi și ce avantaj îți oferă înainte să-i vezi paguba?",
      prayer:
        "Doamne, stinge focul pe care îl alimentez și pune în loc adevăr curat, potrivit nevoii și plin de har.",
    },
    {
      id: "limba_l4",
      title: "Mărturisește și repară prin cuvinte",
      refs: ["Matei 5:23-24", "Efeseni 4:25", "Iacov 5:16", "Proverbe 28:13"],
      memoryRef: "Efeseni 4:25",
      memoryText: "Lăsați-vă de minciună; fiecare să spună aproapelui său adevărul.",
      hook: [
        "Unele cuvinte nu pot fi retrase. Pot însă fi mărturisite, corectate, urmate de restituirea reputației și de un tipar nou.",
        "«Îmi pare rău dacă te-ai simțit rănit» apără vorbitorul. Repararea numește ce ai spus, de ce a fost rău și ce vei corecta.",
      ],
      choicePrompt: "Ce reparare este necesară acum?",
      branches: [
        {
          label: "Trebuie să recunosc o insultă sau izbucnire.",
          response:
            "Numește expresia și intenția de a răni sau domina. Nu cere victimei să confirme că nu a fost atât de grav.",
        },
        {
          label: "Trebuie să corectez o minciună ori bârfă.",
          response:
            "Corectarea trebuie să ajungă la cercul care a primit falsul, fără să expui alte detalii care nu le aparțin.",
        },
        {
          label: "Trebuie să spun un adevăr pe care l-am evitat.",
          response:
            "Pregătește fapta, efectul și cererea. Nu descărca acuzații globale și nu folosi «sinceritatea» pentru a pedepsi.",
        },
      ],
      scriptureRef: "Iacov 5:16",
      scriptureText: "Mărturisiți-vă unii altora păcatele și rugați-vă unii pentru alții.",
      truth: [
        "Mărturisirea verbală trebuie să fie la fel de concretă ca rana: ce am spus, ce a fost fals sau rău și cui datorez corectarea.",
        "Iertarea nu poate fi cerută ca obligație și încrederea nu se reface printr-o singură conversație. Rodul repetat susține repararea.",
      ],
      quiz: {
        question: "Care formulare este mărturisire?",
        correct: "Am spus ___ ca să te rănesc. A fost păcat și voi corecta ___ în fața ___.",
        wrong: [
          "Îmi pare rău dacă ai interpretat greșit.",
          "Amândoi spunem lucruri, deci să uităm.",
        ],
        explanation:
          "Mărturisirea nu mută vina în reacția celuilalt și nu diluează fapta prin comparație.",
      },
      multiChoice: {
        prompt: "Ce poate cere repararea?",
        options: [
          "Recunoașterea cuvintelor exacte.",
          "Corectarea minciunii.",
          "Un tipar nou verificabil.",
          "Obligarea celuilalt să uite imediat.",
        ],
      },
      action:
        "Scrie mărturisirea fără «dacă», «dar» sau «și tu». Stabilește cui trebuie spusă și ce corectare îi urmează.",
      journal:
        "Ce cuvânt trebuie reparat și ce pierdere de imagine te face să amâni?",
      prayer:
        "Doamne, dă-mi adevăr fără apărare și curaj să repar ce am stricat prin vorbire.",
      declaration:
        "Completează: «Am spus ___. A fost rău pentru că ___. Voi spune adevărul lui ___ și voi schimba tiparul prin ___.»",
    },
  ],
)

export const TIMP_CU_DUMNEZEU_LESSONS = courseLessons(
  "formare_timp_cu_dumnezeu",
  [
    {
      id: "timp_dumnezeu_l1",
      title: "De ce cauți un loc liniștit",
      refs: ["Marcu 1:35", "Psalmul 63:1-4", "Ioan 15:4-5"],
      memoryRef: "Ioan 15:5",
      memoryText: "Despărțiți de Mine nu puteți face nimic.",
      hook: [
        "Timpul personal cu Dumnezeu nu este taxa zilnică prin care eviți pedeapsa și nici singurul loc unde El este prezent.",
        "Este o practică prin care îți retragi atenția din zgomot, vii la El prin Hristos și îți reașezi dorințele sub Cuvânt.",
      ],
      choicePrompt: "Ce îți blochează cel mai des timpul cu Dumnezeu?",
      branches: [
        {
          label: "Îl transform într-o obligație care mă acuză.",
          response:
            "Nu vii ca să câștigi acces. Vii prin Hristos. Începe scurt și sincer, fără să transformi durata într-o măsură a iubirii lui Dumnezeu.",
        },
        {
          label: "Telefonul și ritmul îmi fragmentează atenția.",
          response:
            "Mută telefonul fizic, alege o oră realistă și pregătește dinainte textul. Dorința fără un loc și o limită pierde ușor.",
        },
        {
          label: "Nu simt nimic când citesc sau mă rog.",
          response:
            "Prezența lui Dumnezeu nu se măsoară prin intensitatea emoției. Citește pentru adevăr, răspunde cinstit și ascultă chiar într-o zi uscată.",
        },
      ],
      scriptureRef: "Marcu 1:35",
      scriptureText:
        "Pe când era încă întuneric, Iisus S-a dus într-un loc pustiu și Se ruga acolo.",
      truth: [
        "Iisus a căutat locul retras fără să fugă de slujire. Solitudinea și întoarcerea între oameni aparțin aceleiași ascultări.",
        "Disciplina nu produce automat comuniune, dar creează spațiul în care atenția poate primi Cuvântul și răspunde Tatălui.",
      ],
      quiz: {
        question: "Ce nu este timpul personal cu Dumnezeu?",
        correct: "Plata prin care câștig accesul și iubirea Lui.",
        wrong: [
          "Un spațiu pentru Cuvânt și rugăciune.",
          "O practică de reașezare a atenției.",
        ],
        explanation:
          "Accesul este prin Hristos; practica hrănește relația, dar nu cumpără harul.",
      },
      multiChoice: {
        prompt: "Ce poți pregăti de seara?",
        options: [
          "Locul.",
          "Textul biblic.",
          "Ora realistă.",
          "O emoție garantată.",
        ],
      },
      action:
        "Stabilește pentru mâine un loc, o oră și un text de cel mult un capitol. Lasă telefonul în afara razei mâinii.",
      journal:
        "Ce crezi că dovedește despre tine o zi în care ai ratat practica și ce spune Evanghelia despre accesul tău la Tatăl?",
      prayer:
        "Tată, vin prin Iisus, nu prin performanța mea. Strânge-mi atenția și învață-mă să rămân în Cuvântul Fiului Tău.",
    },
    {
      id: "timp_dumnezeu_l2",
      title: "Citește, meditează, răspunde, ascultă",
      refs: ["Psalmul 1:1-3", "Luca 10:38-42", "Iacov 1:22-25"],
      memoryRef: "Iacov 1:22",
      memoryText: "Fiți împlinitori ai Cuvântului, nu numai ascultători.",
      hook: [
        "Poți termina capitolul și să nu fi observat ce spune. Poți scrie pagini de jurnal și să eviți singura poruncă pe care ai înțeles-o.",
        "O practică simplă are patru mișcări: citește textul, rumegă ideea, răspunde lui Dumnezeu și fă lucrul pe care l-ai văzut.",
      ],
      choicePrompt: "La ce pas te oprești cel mai des?",
      branches: [
        {
          label: "Citesc repede, fără să observ.",
          response:
            "Ia un paragraf, nu cinci capitole. Notează cine vorbește, ce afirmă și ce legătură are cu paragraful dinainte.",
        },
        {
          label: "Înțeleg, dar nu răspund personal.",
          response:
            "Transformă adevărul în adorare, mărturisire, mulțumire sau cerere. Nu inventa o aplicație înainte să răspunzi la ce spune textul despre Dumnezeu.",
        },
        {
          label: "Mă rog, dar amân ascultarea.",
          response:
            "Alege un verb și un termen: sun, opresc, restitui, cer iertare, ajut, până la ora ___. Rugăciunea nu este înlocuitor pentru pasul poruncit.",
        },
      ],
      scriptureRef: "Psalmul 1:2-3",
      scriptureText:
        "Își găsește plăcerea în Legea Domnului și zi și noapte cugetă la ea; este ca un pom sădit lângă un izvor de apă.",
      truth: [
        "Meditația biblică umple mintea cu textul și îl cercetează; nu o golește pentru a primi orice impresie.",
        "Întâlnirea cu Dumnezeu urmărește comuniune și transformare, nu doar informație bifată.",
      ],
      quiz: {
        question: "Care este traseul complet al practicii?",
        correct: "Citesc, meditez, răspund și ascult concret.",
        wrong: [
          "Citesc cât mai mult și mă opresc.",
          "Aștept o impresie fără să verific textul.",
        ],
        explanation:
          "Psalmul vorbește despre cugetare și rod, iar Iacov despre Cuvântul împlinit, nu doar auzit.",
      },
      multiChoice: {
        prompt: "Ce vei include în practica de mâine?",
        options: [
          "Observarea textului.",
          "Un adevăr despre Dumnezeu.",
          "O rugăciune de răspuns.",
          "Un pas de ascultare.",
        ],
      },
      action:
        "Folosește cele patru mișcări pe Psalmul 1 și notează un singur pas pe care îl vei încheia în 24 de ore.",
      journal:
        "Ce practică te face să pari disciplinat, dar îți permite să amâni ascultarea?",
      prayer:
        "Doamne, deschide-mi ochii să văd adevărul, gura să-Ți răspund și mâinile să împlinesc ce mi-ai arătat.",
      declaration:
        "Completează: «Mâine voi citi ___ la ora ___. Adevărul pe care îl voi urma astăzi este ___ prin pasul ___.»",
    },
  ],
)

export const FORMARE_INIMA_CARACTER_LESSONS: Lesson[] = [
  ...PAZESTE_INIMA_LESSONS,
  ...AUZI_SI_RAMAI_LESSONS,
  ...DECIZII_SUB_CUVANT_LESSONS,
  ...LIMBA_CARE_RANESTE_SI_REPARA_LESSONS,
  ...TIMP_CU_DUMNEZEU_LESSONS,
]
