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

export const CARTILE_INTELEPCIUNII_LESSONS = courseLessons(
  "formare_intelepciune",
  [
    {
      id: "intelepciune_l1",
      title: "Proverbul nu este promisiune absolută",
      refs: ["Proverbe 1:1-7", "Proverbe 10:4", "Proverbe 22:6", "Proverbe 26:4-5"],
      memoryRef: "Proverbe 1:7",
      memoryText: "Frica Domnului este începutul științei.",
      hook: [
        "Proverbele spun cum funcționează de regulă viața trăită în ordinea lui Dumnezeu. Ele nu promit că fiecare om harnic va fi bogat sau că fiecare copil va urma automat calea părinților.",
        "Dacă transformi observația în contract, poți ajunge să-L acuzi pe Dumnezeu pentru o garanție pe care textul nu a oferit-o.",
      ],
      choicePrompt: "Ce ai făcut cel mai des cu un proverb?",
      branches: [
        {
          label: "L-am tratat ca promisiune fără excepție.",
          response:
            "Caută genul și formularea. Proverbul oferă înțelepciune generală; promisiunea explicită spune ce garantează Dumnezeu și cui.",
        },
        {
          label: "L-am ignorat fiindcă există excepții.",
          response:
            "Excepția nu anulează înțelepciunea. Hărnicia rămâne mai roditoare decât lenea, chiar dacă boala, nedreptatea sau providența pot schimba rezultatul imediat.",
        },
        {
          label: "L-am folosit ca să judec suferința altuia.",
          response:
            "Nu transforma tiparul în verdict asupra unei persoane. Iov și Eclesiastul arată limitele concluziei că rezultatul vizibil dezvăluie simplu caracterul omului.",
        },
      ],
      scriptureRef: "Proverbe 26:4-5",
      scriptureText:
        "Nu răspunde nebunului după nebunia lui; răspunde nebunului după nebunia lui, ca să nu se creadă înțelept.",
      truth: [
        "Proverbele cer discernământ situațional: două îndemnuri aparent opuse pot fi amândouă înțelepte în contexte diferite.",
        "Promisiunile întemeiate în caracterul lui Dumnezeu rămân sigure; observațiile proverbiale descriu tipare, nu rezultate mecanice.",
      ],
      quiz: {
        question: "Cum citim de regulă un proverb?",
        correct: "Ca principiu general de viață care cere aplicare înțeleaptă în context.",
        wrong: [
          "Ca garanție fără nicio excepție.",
          "Ca afirmație opțională fără autoritate.",
        ],
        explanation:
          "Genul sapiențial formează priceperea, nu oferă o formulă automată pentru fiecare situație.",
      },
      multiChoice: {
        prompt: "Ce verifici înainte să aplici un proverb?",
        options: [
          "Genul literar.",
          "Contextul situației.",
          "Restul Scripturii.",
          "Doar rezultatul pe care îl doresc.",
        ],
      },
      action:
        "Alege un proverb folosit ca promisiune și rescrie-l ca principiu: «De regulă..., pentru că..., dar Scriptura arată și...». ",
      journal:
        "Ce dezamăgire ai legat de o promisiune pe care Dumnezeu nu a formulat-o de fapt?",
      prayer:
        "Doamne, dă-mi frică sfântă și pricepere. Păzește-mă să nu transform înțelepciunea Ta în formulă sau scuză.",
    },
    {
      id: "intelepciune_l2",
      title: "Frica Domnului și priceperea de a trăi",
      refs: ["Proverbe 2:1-11", "Proverbe 9:10", "Iacov 1:5"],
      memoryRef: "Proverbe 9:10",
      memoryText: "Începutul înțelepciunii este frica de Domnul.",
      hook: [
        "Poți avea informație biblică și să alegi prost, fiindcă înțelepciunea nu este numai ce știi. Este priceperea de a trăi înaintea lui Dumnezeu în realitatea concretă.",
        "Frica Domnului nu este panica sclavului care fuge de un stăpân capricios. Este reverența care ia caracterul și cuvântul Lui mai în serios decât presiunea momentului.",
      ],
      choicePrompt: "Unde ai nevoie acum de înțelepciune?",
      branches: [
        {
          label: "Știu principiul, dar nu văd pasul potrivit.",
          response:
            "Adună faptele, ascultă sfatul și întreabă ce aplicare respectă toate responsabilitățile, nu doar dorința cea mai puternică.",
        },
        {
          label: "Mă tem mai mult de reacția oamenilor.",
          response:
            "Frica de oameni promite siguranță prin aprobare. Frica Domnului te eliberează să iubești omul fără să-i dai locul lui Dumnezeu.",
        },
        {
          label: "Cer înțelepciune, dar refuz sfatul.",
          response:
            "Iacov cere credință, iar Proverbele cer căutare. Rugăciunea sinceră nu disprețuiește mijloacele prin care Dumnezeu poate răspunde.",
        },
      ],
      scriptureRef: "Proverbe 2:6",
      scriptureText: "Domnul dă înțelepciune; din gura Lui ies cunoștința și priceperea.",
      truth: [
        "Înțelepciunea vine de la Dumnezeu prin Cuvânt, rugăciune, experiență supusă adevărului și sfat matur.",
        "Frica Domnului reașază toate celelalte temeri și ne învață să alegem binele chiar atunci când costă.",
      ],
      quiz: {
        question: "Ce este înțelepciunea biblică?",
        correct: "Priceperea de a aplica adevărul lui Dumnezeu într-o situație reală.",
        wrong: [
          "Cantitatea de informații religioase memorate.",
          "Prima impresie care apare după rugăciune.",
        ],
        explanation:
          "Proverbele unesc cunoașterea, discernământul, căutarea și umblarea dreaptă.",
      },
      multiChoice: {
        prompt: "Prin ce poate veni înțelepciunea?",
        options: [
          "Scriptură.",
          "Rugăciune.",
          "Sfat matur.",
          "Impuls neverificat.",
        ],
      },
      action:
        "Formulează întrebarea deciziei tale într-o propoziție și cere sfatul a două persoane care au voie să te contrazică.",
      journal:
        "Ce frică îți vorbește mai tare decât frica Domnului în alegerea actuală?",
      prayer:
        "Doamne, Tu dai înțelepciune. Fă-mă smerit să cer, atent să caut și curajos să urmez adevărul primit.",
    },
    {
      id: "intelepciune_l3",
      title: "Eclesiastul și viața «sub soare»",
      refs: ["Eclesiastul 1:2-3", "Eclesiastul 3:9-14", "Eclesiastul 12:13-14"],
      memoryRef: "Eclesiastul 12:13",
      memoryText: "Teme-te de Dumnezeu și păzește poruncile Lui; aceasta este datoria oricărui om.",
      hook: [
        "Eclesiastul privește munca, plăcerea, bogăția, înțelepciunea și moartea într-o lume în care totul pare să se repete și să alunece din mână.",
        "«Deșertăciune» nu înseamnă că nimic nu are valoare. Imaginea este aburul: real, dar greu de prins, scurt și incapabil să poarte greutatea sensului ultim.",
      ],
      choicePrompt: "Ce ai încercat să obligi să-ți dea sens ultim?",
      branches: [
        {
          label: "Munca și realizările.",
          response:
            "Munca este dar și responsabilitate, dar nu poate opri moartea sau garanta că rodul rămâne în mâinile tale. Primește-o, nu o închina.",
        },
        {
          label: "Plăcerea și experiențele.",
          response:
            "Darurile pot fi gustate cu mulțumire, dar când le ceri să alunge definitiv golul devin stăpâni care cer tot mai mult.",
        },
        {
          label: "Controlul și explicația completă.",
          response:
            "Dumnezeu a pus veșnicia în inimă, dar omul nu cuprinde toată lucrarea Lui. Limita nu este chemare la cinism, ci la frică, bucurie și credincioșie.",
        },
      ],
      scriptureRef: "Eclesiastul 3:11",
      scriptureText:
        "Dumnezeu a pus în inima omului gândul veșniciei, măcar că omul nu poate cuprinde lucrarea pe care a făcut-o Dumnezeu.",
      truth: [
        "Viața «sub soare», privită ca sistem închis fără Dumnezeu și judecată, nu poate produce sens ultim.",
        "Eclesiastul nu ne cheamă la nihilism, ci la primirea darurilor, frica de Dumnezeu și ascultare în fața judecății viitoare.",
      ],
      quiz: {
        question: "Care este concluzia Eclesiastului?",
        correct: "Teme-te de Dumnezeu, păzește poruncile și trăiește înaintea judecății Lui.",
        wrong: [
          "Nimic nu contează, deci trăiește oricum.",
          "Munca și plăcerea pot învinge moartea dacă sunt suficiente.",
        ],
        explanation:
          "Cartea demontează idolii tocmai pentru a reașeza viața sub Dumnezeu și sub verdictul Lui.",
      },
      multiChoice: {
        prompt: "Cum primești un dar fără să-l transformi în dumnezeu?",
        options: [
          "Cu mulțumire.",
          "Cu limite.",
          "Fără să-i cer sens ultim.",
          "Ca drept absolut care trebuie să dureze.",
        ],
      },
      action:
        "Alege un dar bun pe care l-ai încărcat cu sens ultim. Mulțumește pentru el și stabilește o limită care arată că nu este stăpân.",
      journal:
        "Ce lucru bun a devenit pentru tine condiția fără de care viața pare lipsită de valoare?",
      prayer:
        "Dumnezeule veșnic, învață-mă să primesc darurile fără să le închin și să trăiesc astăzi în frică sfântă și bucurie.",
    },
    {
      id: "intelepciune_l4",
      title: "Iov și formula falsă a răsplătirii",
      refs: ["Iov 1:1,8-12", "Iov 2:3-10", "Ioan 9:1-3", "Luca 13:1-5"],
      memoryRef: "Iov 2:10",
      memoryText: "Ce! Primim de la Dumnezeu binele și să nu primim și răul?",
      hook: [
        "Prietenii lui Iov aveau o formulă simplă: Dumnezeu îi binecuvântează pe cei drepți, tu suferi, deci sigur ascunzi un păcat grav.",
        "Cititorul știe de la început că verdictul lor este fals. Iov este numit neprihănit, iar suferința lui nu este prezentată ca pedeapsa unei fărădelegi secrete.",
      ],
      choicePrompt: "Ce concluzie tragi când vezi suferința?",
      branches: [
        {
          label: "Caut imediat păcatul care a produs-o.",
          response:
            "Unele consecințe sunt legate de păcat, dar legătura trebuie stabilită prin text sau fapte. Fără acestea, suspiciunea ta nu este discernământ.",
        },
        {
          label: "Neg orice legătură posibilă între păcat și suferință.",
          response:
            "Biblia vorbește și despre consecințe, disciplină și judecată. Lecția lui Iov nu este că legătura nu există niciodată, ci că nu o inventăm.",
        },
        {
          label: "Nu știu ce să spun omului care suferă.",
          response:
            "Poți începe prin prezență, ascultare și ajutor concret. Nu ai nevoie de o cauză secretă ca să plângi cu cel ce plânge și să-l îndrepți spre Dumnezeu.",
        },
      ],
      scriptureRef: "Iov 1:8",
      scriptureText:
        "Domnul a spus despre Iov că este fără prihană, curat la suflet, că se teme de Dumnezeu și se abate de la rău.",
      truth: [
        "Cartea nu Îl scoate pe Dumnezeu din suveranitate și nici nu-l face pe Satan independent. Răul lucrează numai în limitele pe care Dumnezeu le îngăduie.",
        "Nu orice suferință este pedeapsa unui păcat personal. Diagnosticul nostru trebuie să se oprească unde revelația și faptele se opresc.",
      ],
      quiz: {
        question: "De ce era greșită formula prietenilor lui Iov?",
        correct: "Au dedus un păcat ascuns doar din existența suferinței.",
        wrong: [
          "Au crezut că păcatul poate avea vreodată consecințe.",
          "Au refuzat să ofere o explicație completă a planului lui Dumnezeu.",
        ],
        explanation:
          "Prologul cărții contrazice verdictul lor asupra lui Iov, chiar dacă afirmațiile lor conțin și fragmente adevărate despre dreptate.",
      },
      multiChoice: {
        prompt: "Ce categorie poate exista în suferință?",
        options: [
          "Consecință cunoscută.",
          "Disciplină biblic stabilită.",
          "Suferință fără cauză personală cunoscută.",
          "Verdict secret inventat de observator.",
        ],
      },
      action:
        "Pentru o suferință actuală, scrie separat ce știi din fapte, ce spune textul aplicabil și ce nu ai dreptul să afirmi.",
      journal:
        "Ce explicație rapidă îți oferă senzația de control asupra suferinței altuia?",
      prayer:
        "Doamne suveran, păzește-mă de verdictul inventat și de negarea adevărului cunoscut. Dă-mi smerenie, prezență și ascultare.",
    },
    {
      id: "intelepciune_l5",
      title: "Prietenii care vorbesc greșit despre Dumnezeu",
      refs: ["Iov 4:7-8", "Iov 16:1-5", "Iov 42:7-9", "Proverbe 18:13"],
      memoryRef: "Proverbe 18:13",
      memoryText: "Cine răspunde fără să fi ascultat face o nebunie și își trage rușinea.",
      hook: [
        "Prietenii lui Iov au stat șapte zile în tăcere. Apoi au încercat să apere dreptatea lui Dumnezeu prin acuzații pe care Dumnezeu nu le spusese.",
        "Poți rosti o propoziție teologică adevărată într-o aplicație falsă și să ajungi să vorbești nedrept despre Dumnezeu și despre om.",
      ],
      choicePrompt: "Ce faci când vrei să ajuți un om în durere?",
      branches: [
        {
          label: "Îi ofer repede o explicație.",
          response:
            "Întreabă dacă explicația este afirmată de text și fapte sau doar îți calmează neputința. Prezența cinstită este mai bună decât certitudinea falsă.",
        },
        {
          label: "Îi spun un adevăr general fără să ascult cazul.",
          response:
            "Adevărul general poate deveni acuzație greșită dacă îl aplici fără cunoaștere. Ascultă înainte să stabilești ce categorie biblică se potrivește.",
        },
        {
          label: "Tac fiindcă mă tem să nu greșesc.",
          response:
            "Tăcerea poate însoți, dar omul are nevoie și de ajutor. Poți spune ce știi sigur: Dumnezeu vede, răul este rău, Hristos a suferit și nu îl vei abandona.",
        },
      ],
      scriptureRef: "Iov 42:7",
      scriptureText:
        "Domnul le-a spus prietenilor lui Iov: «N-ați vorbit așa de drept despre Mine cum a vorbit robul Meu Iov.»",
      truth: [
        "A-L apăra pe Dumnezeu prin minciună despre om nu este zel sfânt. Dumnezeu nu are nevoie de acuzațiile noastre inventate.",
        "Îngrijirea biblică ascultă, deosebește, spune adevărul cunoscut și își recunoaște limitele.",
      ],
      quiz: {
        question: "Cum poate o propoziție adevărată deveni dăunătoare?",
        correct: "Prin aplicarea ei unei persoane fără temei în text sau fapte.",
        wrong: [
          "Adevărul este întotdeauna dăunător emoțional.",
          "Prin faptul că este spus calm și după ascultare.",
        ],
        explanation:
          "Prietenii au rostit idei generale despre dreptate, dar au construit din ele un verdict fals asupra lui Iov.",
      },
      multiChoice: {
        prompt: "Ce poți oferi fără să inventezi?",
        options: [
          "Prezență.",
          "Ascultare.",
          "Adevărul biblic sigur.",
          "Cauza ascunsă pe care o presupui.",
        ],
      },
      action:
        "Contactează un om aflat în durere și pune două întrebări înainte să oferi un răspuns. Nu-i explica motivul secret al suferinței.",
      journal:
        "Când ai folosit un adevăr corect pentru a evita să asculți sau pentru a controla povestea altuia?",
      prayer:
        "Doamne, pune strajă teologiei mele aplicate. Fă-mă drept în ce spun despre Tine și milos și adevărat față de omul care suferă.",
    },
    {
      id: "intelepciune_l6",
      title: "Răscumpărătorul viu și limita răspunsurilor",
      refs: ["Iov 19:23-27", "Iov 38:1-7", "Iov 42:1-6", "Romani 8:18-25"],
      memoryRef: "Iov 19:25",
      memoryText: "Știu că Răscumpărătorul meu este viu.",
      hook: [
        "La final, Dumnezeu nu îi oferă lui Iov dosarul complet al cauzelor. Îi descoperă măreția, înțelepciunea și limita omului.",
        "Credința nu primește toate explicațiile, dar nu rămâne fără temelie. Iov mărturisește un Răscumpărător viu, iar Evanghelia arată că Dumnezeu Însuși intră în suferință și va învia trupul.",
      ],
      choicePrompt: "Ce ceri cel mai mult în suferință?",
      branches: [
        {
          label: "O explicație completă înainte să mai am încredere.",
          response:
            "Poți cere și cerceta, dar nu transforma accesul la toate cauzele în condiția dreptului lui Dumnezeu de a fi Dumnezeu. Uită-te la caracterul și crucea Lui.",
        },
        {
          label: "Dreptate și oprirea răului.",
          response:
            "Cererea este biblică. Caută protecție și dreptate acum, fără să confunzi răzbunarea personală cu judecata pe care Dumnezeu o va aduce deplin.",
        },
        {
          label: "Putere să rezist fără răspuns complet.",
          response:
            "Speranța creștină nu este numai rezistență interioară. Este Răscumpărătorul viu, învierea trupului și creația eliberată de stricăciune.",
        },
      ],
      scriptureRef: "Iov 19:25-27",
      scriptureText:
        "Știu că Răscumpărătorul meu este viu și că Se va ridica la urmă; Îl voi vedea și ochii mei Îl vor privi.",
      truth: [
        "Iov nu primește o ecuație care face durerea mică. Primește întâlnirea cu Dumnezeul suveran și speranța Răscumpărătorului.",
        "În Hristos, Dumnezeu nu privește suferința de la distanță. El poartă păcatul, biruie moartea și promite înviere și judecată dreaptă.",
      ],
      quiz: {
        question: "Care este speranța finală a credinciosului?",
        correct: "Răscumpărătorul viu, învierea și dreptatea deplină a lui Dumnezeu.",
        wrong: [
          "Primirea unei explicații complete pentru fiecare durere în viața aceasta.",
          "Capacitatea de a declara că durerea nu mai este rea.",
        ],
        explanation:
          "Speranța lui Iov trece dincolo de circumstanța imediată spre Răscumpărător și vederea lui Dumnezeu.",
      },
      multiChoice: {
        prompt: "Ce poți mărturisi chiar fără răspuns complet?",
        options: [
          "Dumnezeu este Creatorul înțelept.",
          "Răscumpărătorul este viu.",
          "Trupul va învia.",
          "Cunosc motivul secret al fiecărei suferințe.",
        ],
      },
      action:
        "Scrie două liste: întrebările care rămân și adevărurile pe care crucea și învierea le fac sigure. Nu le amesteca.",
      journal:
        "Ce adevăr despre Răscumpărător poate purta întrebarea care încă nu are răspuns?",
      prayer:
        "Dumnezeule suveran, nu pretind că văd tot ce vezi Tu. Mă prind de Răscumpărătorul viu și aștept învierea și dreptatea Ta.",
      declaration:
        "Completează: «Nu cunosc încă ___. Știu însă că Răscumpărătorul meu este viu și de aceea voi ___.»",
    },
  ],
)

export const FORMARE_INTELEPCIUNE_LESSONS: Lesson[] = [
  ...CARTILE_INTELEPCIUNII_LESSONS,
]
