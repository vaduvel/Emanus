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

export const CE_INSEAMNA_UCENIC_LESSONS = courseLessons(
  "formare_ucenicie",
  [
    {
      id: "ucenic_l1",
      title: "Chemarea: vino după Mine",
      refs: ["Marcu 1:16-20", "Luca 9:23", "Ioan 15:16"],
      memoryRef: "Marcu 1:17",
      memoryText: "Veniți după Mine și vă voi face pescari de oameni.",
      hook: [
        "Iisus nu cheamă doar oameni care admiră învățătura Lui. Cheamă oameni care vin după El, sunt formați de El și intră în misiunea Lui.",
        "Chemarea începe cu inițiativa Lui, dar cere un răspuns real: părăsirea stăpânului vechi și așezarea pașilor în urma Lui.",
      ],
      choicePrompt: "Ce parte a chemării îți este cel mai greu să o primești?",
      branches: [
        {
          label: "Să vin după Iisus, nu să-I cer să vină după planul meu.",
          response:
            "Ucenicul nu-L adaugă pe Iisus ca ajutor pentru propria împărăție. Îi predă dreptul de a defini drumul, binele și scopul.",
        },
        {
          label: "Să cred că El mă poate forma.",
          response:
            "Iisus nu i-a chemat fiindcă erau gata. A spus «vă voi face». Răspunde prin ascultarea de astăzi, nu aștepta versiunea deja matură a ta.",
        },
        {
          label: "Să las ceva concret în urmă.",
          response:
            "Numește lucrul, nu doar ideea de sacrificiu. Uneori este păcat, alteori control, siguranță sau identitatea care refuză noua chemare.",
        },
      ],
      scriptureRef: "Marcu 1:18",
      scriptureText: "Îndată, ei și-au lăsat mrejele și au mers după El.",
      truth: [
        "Ucenicia este relație de ascultare cu Iisus, nu simpla acumulare de informații despre El.",
        "Cel care cheamă este și Cel care formează. Harul Lui nu elimină răspunsul, ci îl face posibil.",
      ],
      quiz: {
        question: "Ce cuprinde chemarea lui Iisus?",
        correct: "Să-L urmez, să fiu format de El și să particip la misiunea Lui.",
        wrong: [
          "Să-L admir fără să-mi schimbe direcția.",
          "Să-mi împlinească planul fără să-mi fie Domn.",
        ],
        explanation:
          "«Veniți», «vă voi face» și «pescari de oameni» descriu relația, transformarea și misiunea.",
      },
      multiChoice: {
        prompt: "Ce implică venirea după Iisus?",
        options: [
          "Încredere.",
          "Ascultare.",
          "Formare.",
          "Păstrarea oricărui stăpân vechi.",
        ],
      },
      action:
        "Numește o «mreajă» pe care trebuie să o lași și fă astăzi primul gest verificabil de desprindere.",
      journal:
        "Unde Îl urmezi pe Iisus numai atât timp cât merge în direcția aleasă deja de tine?",
      prayer:
        "Iisuse, Tu m-ai chemat. Dă-mi credință să vin după Tine și formează-mă pentru scopul Tău.",
    },
    {
      id: "ucenic_l2",
      title: "Costul și ascultarea",
      refs: ["Luca 9:23-25", "Luca 14:25-33", "Ioan 14:15", "Matei 7:21"],
      memoryRef: "Luca 9:23",
      memoryText: "Dacă voiește cineva să vină după Mine, să se lepede de sine și să Mă urmeze în fiecare zi.",
      hook: [
        "Iisus nu ascunde costul. Ucenicia poate cere pierderea aprobării, renunțarea la păcat și punerea legăturilor cele mai apropiate sub domnia Lui.",
        "Lepădarea de sine nu este ură de sine și nici acceptarea abuzului. Este refuzul dreptului de a fi propriul domn.",
      ],
      choicePrompt: "Ce cost negociezi cel mai mult?",
      branches: [
        {
          label: "Aprobarea familiei sau a grupului.",
          response:
            "Iubește-i și cinstește ce trebuie cinstit, dar nu le oferi autoritatea de a anula ascultarea de Iisus. Caută sprijin matur pentru costul relațional.",
        },
        {
          label: "Păstrarea unui păcat care îmi oferă alinare.",
          response:
            "Nu-l numi nevoie inevitabilă. Mărturisește-l, taie accesul și caută alinarea legitimă și comunitatea de care ai nevoie.",
        },
        {
          label: "Teama că îmi voi pierde personalitatea și dorințele.",
          response:
            "Iisus nu șterge persoana, ci o eliberează de domnia păcatului. Dorințele sunt curățate și reașezate, nu declarate automat sfinte sau inutile.",
        },
      ],
      scriptureRef: "Luca 14:27-28",
      scriptureText:
        "Cine nu-și poartă crucea și nu vine după Mine nu poate fi ucenicul Meu. Cine vrea să zidească un turn nu stă mai întâi să-i facă socoteala?",
      truth: [
        "Crucea ucenicului nu este orice neplăcere. Este costul credincioșiei față de Iisus într-o lume și o inimă care Îi rezistă.",
        "Ascultarea nu cumpără dragostea Lui; arată că mărturisirea «Iisus este Domn» nu este doar sunet.",
      ],
      quiz: {
        question: "Ce este lepădarea de sine?",
        correct: "Renunțarea la dreptul de a fi propriul domn pentru a-L urma pe Iisus.",
        wrong: [
          "Disprețuirea valorii propriei persoane.",
          "Acceptarea oricărei nedreptăți fără protecție.",
        ],
        explanation:
          "Contextul este domnia și urmarea lui Hristos, nu anularea demnității sau protejarea răului altuia.",
      },
      multiChoice: {
        prompt: "Ce cost poate include ucenicia?",
        options: [
          "Renunțarea la păcat.",
          "Pierderea aprobării.",
          "Schimbarea priorităților.",
          "Negarea oricărei limite de siguranță.",
        ],
      },
      action:
        "Fă socoteala unui cost concret și scrie ce ascultare cere, ce sprijin ai nevoie și ce rezultat nu poți controla.",
      journal:
        "Ce numești «prea mult» atunci când Iisus atinge lucrul care te stăpânește?",
      prayer:
        "Doamne Iisuse, nu vreau o ucenicie fără cruce. Dă-mi curaj să-Ți predau domnia și să ascult fără teatru.",
    },
    {
      id: "ucenic_l3",
      title: "Numai Iisus are cuvintele vieții",
      refs: ["Ioan 6:60-69", "Ioan 10:27-29", "Ioan 14:6"],
      memoryRef: "Ioan 6:68",
      memoryText: "Doamne, la cine să ne ducem? Tu ai cuvintele vieții veșnice.",
      hook: [
        "Mulți L-au părăsit pe Iisus când cuvântul Lui a devenit greu. Petru nu a pretins că înțelege tot; a mărturisit că nu există altă sursă a vieții.",
        "Ucenicia trece și prin momente când textul te contrazice, rugăciunea pare fără răspuns și alternativele par mai ușoare.",
      ],
      choicePrompt: "Ce faci când cuvântul lui Iisus este greu?",
      branches: [
        {
          label: "Îl diluez până nu mă mai confruntă.",
          response:
            "Caută contextul și sensul corect, dar nu confunda interpretarea atentă cu eliminarea verdictului care te incomodează.",
        },
        {
          label: "Mă retrag fiindcă nu înțeleg tot.",
          response:
            "Poți aduce întrebarea, cerceta și rămâne. Petru a avut o certitudine despre Persoană înainte să aibă toate explicațiile.",
        },
        {
          label: "Rămân, dar mă tem că nu voi rezista.",
          response:
            "Oile Lui ascultă glasul și sunt ținute de mâna Lui. Perseverența ta este reală și se sprijină pe păstrarea reală a Păstorului.",
        },
      ],
      scriptureRef: "Ioan 6:68-69",
      scriptureText:
        "Doamne, la cine să ne ducem? Tu ai cuvintele vieții veșnice și noi am crezut și am cunoscut că Tu ești Sfântul lui Dumnezeu.",
      truth: [
        "Credința nu înseamnă că fiecare învățătură devine ușoară, ci că Îl cunoști pe Cel care vorbește și continui să cercetezi sub autoritatea Lui.",
        "Iisus nu oferă doar sfat pentru o viață mai bună. El este Calea, Adevărul și Viața.",
      ],
      quiz: {
        question: "De ce a rămas Petru?",
        correct: "Pentru că a cunoscut cine este Iisus și că El are cuvintele vieții.",
        wrong: [
          "Pentru că înțelesese deja fiecare afirmație.",
          "Pentru că nu mai avea voie să pună întrebări.",
        ],
        explanation:
          "Mărturisirea lui unește credința în Persoana lui Iisus cu recunoașterea că viața nu se găsește în altă parte.",
      },
      multiChoice: {
        prompt: "Ce poți face în fața unui text greu?",
        options: [
          "Rămân lângă Iisus.",
          "Cercetez contextul.",
          "Cer ajutor matur.",
          "Îl rescriu după preferință.",
        ],
      },
      action:
        "Alege un text dificil, scrie întrebarea exactă și caută contextul înainte și după el. Discută-l cu un credincios competent.",
      journal:
        "Ce alternativă pare mai atrăgătoare când cuvântul lui Iisus îți cere să renunți la control?",
      prayer:
        "Doamne Iisuse, la cine să mă duc? Ține-mă aproape când nu înțeleg și dă-mi ascultare față de cuvintele vieții.",
    },
    {
      id: "ucenic_l4",
      title: "Fă ucenici, nu admiratori ai tăi",
      refs: ["Matei 28:18-20", "2 Timotei 2:1-2", "1 Corinteni 11:1"],
      memoryRef: "Matei 28:19",
      memoryText: "Duceți-vă și faceți ucenici din toate neamurile.",
      hook: [
        "Misiunea nu este să strângi oameni dependenți de vocea ta. Este să-i ajuți să-L urmeze pe Iisus, să primească tot ce a poruncit și să poată forma la rândul lor pe alții.",
        "Autoritatea este a lui Hristos, conținutul este învățătura Lui, iar promisiunea este prezența Lui.",
      ],
      choicePrompt: "Ce te oprește să ajuți pe cineva să crească?",
      branches: [
        {
          label: "Cred că trebuie să știu tot înainte.",
          response:
            "Nu preda ce nu cunoști și nu pretinde competență. Începe cu ce ai primit clar, rămâi corectabil și du omul spre comunitatea întreagă.",
        },
        {
          label: "Mi-e teamă că viața mea nu este model.",
          response:
            "Nu ascunde incoerența. Pocăiește-te, repară și spune transparent cum te corectează Evanghelia. Modelul nu este perfecțiunea mimată.",
        },
        {
          label: "Îmi place să fiu necesar.",
          response:
            "Atunci riști să produci dependență, nu ucenicie. Împarte responsabilitatea, învață omul să citească și să asculte și bucură-te când nu mai depinde de tine.",
        },
      ],
      scriptureRef: "Matei 28:18-20",
      scriptureText:
        "Toată autoritatea Mi-a fost dată. Faceți ucenici, învățați-i să păzească tot ce v-am poruncit; Eu sunt cu voi în toate zilele.",
      truth: [
        "A face ucenici include vestirea Evangheliei, botezul, învățarea ascultării și integrarea în comunitatea lui Hristos.",
        "Un ucenic matur nu reproduce personalitatea mentorului, ci fidelitatea față de Iisus și capacitatea de a da adevărul mai departe.",
      ],
      quiz: {
        question: "Care este ținta formării unui ucenic?",
        correct: "Să-L urmeze pe Iisus și să păzească învățătura Lui.",
        wrong: [
          "Să depindă permanent de mentor.",
          "Să copieze stilul și preferințele celui care îl învață.",
        ],
        explanation:
          "Marea trimitere are în centru autoritatea, poruncile și prezența lui Hristos.",
      },
      multiChoice: {
        prompt: "Ce aparține ucenicizării?",
        options: [
          "Evanghelia.",
          "Ascultarea.",
          "Comunitatea.",
          "Dependența de o personalitate.",
        ],
      },
      action:
        "Alege o persoană și propune-i patru întâlniri pentru a citi o Evanghelie, a vă ruga și a pune în practică un text.",
      journal:
        "Vrei ca oamenii să-L urmeze pe Iisus sau să confirme că ești important pentru creșterea lor?",
      prayer:
        "Iisuse, toată autoritatea este a Ta. Fă-mă credincios să dau mai departe adevărul și să-i conduc pe oameni spre Tine, nu spre mine.",
      declaration:
        "Completează: «Îl voi ajuta pe ___ să-L urmeze pe Iisus prin ___. Voi refuza să creez dependență prin ___.»",
    },
  ],
)

export const CEI_DOISPREZECE_LESSONS = courseLessons(
  "formare_ceidoisprezece",
  [
    {
      id: "doisprezece_l1",
      title: "Petru și Andrei: chemați și formați",
      refs: ["Ioan 1:35-42", "Luca 5:1-11", "Luca 22:31-34,54-62", "Ioan 21:15-19"],
      memoryRef: "Ioan 1:42",
      memoryText: "Tu ești Simon; tu te vei chema Chifa, care înseamnă Petru.",
      hook: [
        "Andrei îl aduce pe fratele său la Iisus. Petru vorbește repede, cade public și este restaurat public pentru slujire.",
        "Iisus vede omul real și lucrarea pe care harul o poate face în el, fără să numească impulsivitatea maturitate sau trădarea un detaliu.",
      ],
      choicePrompt: "Cu cine te identifici mai ușor?",
      branches: [
        {
          label: "Cu Andrei, care aduce oameni fără să fie în centru.",
          response:
            "Slujirea discretă nu este mai mică. Continuă să conduci oameni spre Iisus fără să transformi lipsa scenei în resentiment.",
        },
        {
          label: "Cu Petru, care promite mai mult decât poate duce.",
          response:
            "Nu-ți construi identitatea din intensitatea promisiunii. Primește avertismentul, limitează încrederea în tine și rămâi aproape de comunitate.",
        },
        {
          label: "Cu Petru după cădere, rușinat să mai slujească.",
          response:
            "Iisus nu neagă lepădarea. Îl întreabă despre dragoste, îl restaurează și îi dă responsabilitate. Pocăința nu este finalul chemării.",
        },
      ],
      scriptureRef: "Ioan 21:17",
      scriptureText: "Iisus i-a spus lui Petru: «Mă iubești? Paște oile Mele.»",
      truth: [
        "Harul lui Iisus numește căderea, restaurează omul pocăit și îl formează pentru responsabilitate.",
        "Împărăția are nevoie și de cel vizibil, și de cel care îl aduce pe fratele său fără să primească aceeași atenție.",
      ],
      quiz: {
        question: "Cum l-a restaurat Iisus pe Petru?",
        correct: "A confruntat dragostea și i-a încredințat din nou slujirea.",
        wrong: [
          "A pretins că lepădarea nu a avut loc.",
          "L-a lăsat să se bazeze pe promisiuni mai puternice.",
        ],
        explanation:
          "Restaurarea unește adevărul despre cădere, relația cu Iisus și responsabilitatea pentru oameni.",
      },
      multiChoice: {
        prompt: "Ce vezi în chemarea lor?",
        options: [
          "Aducerea altora la Iisus.",
          "Formare în timp.",
          "Cădere și restaurare.",
          "Eroi fără slăbiciuni.",
        ],
      },
      action:
        "Fă un gest de tip Andrei: invită un om să citească un text despre Iisus. Sau fă un gest de tip Petru restaurat: reia responsabilitatea reparată.",
      journal:
        "Ce te definește mai mult acum: căderea, promisiunea ta sau chemarea și harul lui Iisus?",
      prayer:
        "Iisuse, formează-mă dincolo de impuls și rușine. Fă-mă credincios să aduc oameni la Tine și să îngrijesc ce-mi încredințezi.",
    },
    {
      id: "doisprezece_l2",
      title: "Iacov și Ioan: zelul transformat în slujire",
      refs: ["Marcu 3:17", "Luca 9:51-56", "Marcu 10:35-45", "1 Ioan 3:16"],
      memoryRef: "Marcu 10:45",
      memoryText: "Fiul omului n-a venit să I se slujească, ci El să slujească și să-Și dea viața.",
      hook: [
        "Iacov și Ioan au vrut foc peste sat și locurile cele mai înalte în Împărăție. Iisus nu le-a stins energia, ci le-a schimbat definiția măreției.",
        "Zelul fără caracter poate pedepsi în Numele lui Dumnezeu. Zelul format de cruce slujește și își dă viața.",
      ],
      choicePrompt: "Cum apare ambiția spirituală în tine?",
      branches: [
        {
          label: "Vreau poziția din care să influențez.",
          response:
            "Influența nu este automat păcat, dar întreabă dacă ai accepta aceeași ascultare fără titlu, scenă și recunoaștere.",
        },
        {
          label: "Vreau ca Dumnezeu să-i pedepsească pe cei care ne resping.",
          response:
            "Dreptatea finală Îi aparține. Acum, Iisus îți cere să deosebești apărarea adevărului de dorința de a distruge omul care te-a ofensat.",
        },
        {
          label: "Îmi este teamă că zelul meu este greșit.",
          response:
            "Nu-l îngropa. Adu-l sub cruce, sub corectare și în slujirea concretă a oamenilor, inclusiv a celor care nu te aplaudă.",
        },
      ],
      scriptureRef: "Marcu 10:43-44",
      scriptureText: "Oricare va vrea să fie mare între voi să fie slujitorul vostru.",
      truth: [
        "Iisus redefinește măreția prin slujire și jertfă, nu prin dominație religioasă.",
        "Zelul trebuie judecat după adevăr, caracter și rod, nu numai după intensitate sau cauza declarată.",
      ],
      quiz: {
        question: "Cum devine cineva mare în Împărăția lui Iisus?",
        correct: "Prin slujire după modelul Fiului care Își dă viața.",
        wrong: [
          "Prin pedepsirea rapidă a celor care resping mesajul.",
          "Prin obținerea locului cel mai apropiat de putere.",
        ],
        explanation:
          "Iisus răspunde ambiției lor cu propria Sa slujire și jertfă.",
      },
      multiChoice: {
        prompt: "Cum este curățat zelul?",
        options: [
          "Prin cruce.",
          "Prin corectare.",
          "Prin slujire.",
          "Prin dispreț față de oameni.",
        ],
      },
      action:
        "Fă săptămâna aceasta o slujire necesară care nu îți aduce titlu, vizibilitate sau datorie din partea beneficiarului.",
      journal:
        "Dacă nimeni nu ar afla, ai mai dori aceeași lucrare pentru Dumnezeu?",
      prayer:
        "Iisuse, curăță-mi zelul de mândrie și răzbunare. Învață-mă măreția slujirii Tale.",
    },
    {
      id: "doisprezece_l3",
      title: "Filip, Natanael și Toma: întrebări aduse la Iisus",
      refs: ["Ioan 1:43-51", "Ioan 6:5-9", "Ioan 14:8-9", "Ioan 20:24-29"],
      memoryRef: "Ioan 20:29",
      memoryText: "Ferice de cei ce n-au văzut și au crezut.",
      hook: [
        "Natanael întreabă dacă poate veni ceva bun din Nazaret. Filip calculează pâinea. Toma cere să vadă rănile. Iisus nu se teme de întrebare, dar o conduce spre adevăr și credință.",
        "Îndoiala sinceră poate veni la lumină; îndoiala folosită pentru a amâna orice răspuns mută mereu condiția după ce primește dovada.",
      ],
      choicePrompt: "Ce fel de întrebare porți?",
      branches: [
        {
          label: "O obiecție legată de originea sau credibilitatea lui Iisus.",
          response:
            "Urmează invitația lui Filip: «Vino și vezi». Cercetează sursele, textul și persoana lui Iisus, nu doar caricatura auzită.",
        },
        {
          label: "O problemă pe care o reduc la resursele vizibile.",
          response:
            "Calculează responsabil, dar nu face din calcul limita puterii lui Iisus. Adu-I resursele reale și ascultă porunca următoare.",
        },
        {
          label: "O îndoială după o dezamăgire sau pierdere.",
          response:
            "Iisus îi arată lui Toma rănile, nu îi oferă rușinare publică. Adu întrebarea în comunitate și privește mărturia apostolică, fără să faci din durere un criteriu final al adevărului.",
        },
      ],
      scriptureRef: "Ioan 1:46",
      scriptureText: "Filip i-a răspuns lui Natanael: «Vino și vezi!»",
      truth: [
        "Iisus primește întrebarea sinceră și o confruntă cu adevărul despre El, nu cu o promisiune că toate condițiile noastre vor fi satisfăcute.",
        "Credința creștină nu este credulitate fără mărturie; se sprijină pe lucrarea lui Dumnezeu și mărturia apostolică despre Hristos.",
      ],
      quiz: {
        question: "Care este răspunsul potrivit unei întrebări sincere?",
        correct: "Cercetarea mărturiei despre Iisus și un răspuns la adevărul găsit.",
        wrong: [
          "Rușinarea omului pentru că întreabă.",
          "Amânarea fără sfârșit, indiferent de dovezi.",
        ],
        explanation:
          "Evanghelia după Ioan prezintă semne și mărturii care cheamă la credință, nu la suspendarea permanentă a verdictului.",
      },
      multiChoice: {
        prompt: "Ce poți face cu întrebarea ta?",
        options: [
          "O formulez exact.",
          "Cercetez textul.",
          "O aduc în comunitate.",
          "Mut mereu condiția răspunsului.",
        ],
      },
      action:
        "Scrie întrebarea fără generalizări și identifică un text primar și un om competent cu care o vei cerceta.",
      journal:
        "Ce dovadă ai cerut și ce ai face dacă ai primi-o? Ai răspunde sau ai muta pragul?",
      prayer:
        "Iisuse, primește întrebarea mea și păzește-mă de necredința care refuză orice răspuns. Condu-mă la adevăr și închinare.",
    },
    {
      id: "doisprezece_l4",
      title: "Matei și ucenicii mai puțin văzuți",
      refs: ["Matei 9:9-13", "Luca 6:13-16", "Ioan 14:22-24", "1 Corinteni 1:26-31"],
      memoryRef: "Matei 9:13",
      memoryText: "N-am venit să chem la pocăință pe cei neprihăniți, ci pe cei păcătoși.",
      hook: [
        "Matei avea o ocupație disprețuită și legată de nedreptatea sistemului. Iisus îl cheamă, iar răspunsul lui produce o masă unde alți păcătoși Îl întâlnesc pe Iisus.",
        "Despre Iacov al lui Alfeu și Tadeu știm puțin. Lipsa detaliilor nu înseamnă lipsa credincioșiei sau a locului în temelie.",
      ],
      choicePrompt: "Ce îți amenință cel mai mult chemarea?",
      branches: [
        {
          label: "Trecutul și reputația mea.",
          response:
            "Chemarea lui Matei nu declară nedreptatea neimportantă. Îl scoate din vechiul stăpân și transformă casa și relațiile în loc de mărturie.",
        },
        {
          label: "Faptul că nu sunt vizibil sau cunoscut.",
          response:
            "Numele tău nu trebuie să umple pagini pentru ca ascultarea să conteze. Iisus cunoaște și folosește ucenicul pe care istoria îl descrie în câteva cuvinte.",
        },
        {
          label: "Confuzia că harul aprobă vechiul meu mod de viață.",
          response:
            "Iisus mănâncă alături de păcătoși și îi cheamă la pocăință. Apropierea Lui vindecă și schimbă, nu botează exploatarea.",
        },
      ],
      scriptureRef: "Matei 9:9",
      scriptureText: "Iisus i-a spus lui Matei: «Vino după Mine.» El s-a sculat și a mers după El.",
      truth: [
        "Harul cheamă oameni cu trecut real și îi mută într-o ascultare reală.",
        "Vizibilitatea nu măsoară valoarea sau credincioșia. Trupul lui Hristos este zidit și prin ucenici despre care lumea știe puțin.",
      ],
      quiz: {
        question: "Ce arată chemarea lui Matei?",
        correct: "Harul îl cheamă pe păcătos la pocăință și la o direcție nouă.",
        wrong: [
          "Iisus aprobă ocupația și orice practică veche.",
          "Numai oamenii respectați pot deveni ucenici.",
        ],
        explanation:
          "Iisus vine la păcătoși ca Medic și îi cheamă să-L urmeze, nu să păstreze stăpânirea veche.",
      },
      multiChoice: {
        prompt: "Ce poate transforma chemarea?",
        options: [
          "Ocupația și practicile.",
          "Casa și relațiile.",
          "Felul în care privești vizibilitatea.",
          "Doar eticheta religioasă.",
        ],
      },
      action:
        "Folosește o resursă, relație sau spațiu din viața ta pentru a-L face pe Iisus cunoscut, fără să ascunzi ce trebuie schimbat.",
      journal:
        "Ce parte a trecutului folosești ca verdict final și ce nevoie de vizibilitate îți fură bucuria ascultării?",
      prayer:
        "Iisuse, Tu chemi păcătoși și vezi ucenicii nevăzuți. Schimbă-mi direcția și fă-mă credincios, cu sau fără recunoaștere.",
    },
    {
      id: "doisprezece_l5",
      title: "Simon și Iuda: zel supus sau inimă împărțită",
      refs: ["Luca 6:13-16", "Ioan 6:64", "Ioan 6:68", "Ioan 6:70-71", "Ioan 12:4-6", "Ioan 13:21-30", "Faptele 1:15-26"],
      memoryRef: "Ioan 6:68",
      memoryText: "Doamne, la cine să ne ducem? Tu ai cuvintele vieții veșnice.",
      hook: [
        "Simon este numit Zelotul, dar textul nu ne oferă biografia completă pe care imaginația o dorește. Iuda a stat aproape de Iisus, a primit responsabilitate și totuși a păstrat furtul și trădarea.",
        "Apropierea de lucrurile sfinte nu înlocuiește predarea inimii. Zelul, funcția și experiența pot coexista cu un păcat protejat.",
      ],
      choicePrompt: "Ce avertisment primești din contrastul lor?",
      branches: [
        {
          label: "Am zel, dar îl folosesc pentru agenda mea.",
          response:
            "Adu agenda sub învățătura și caracterul lui Iisus. Nu completa biografia lui Simon ca să-ți justifici metodele; urmează ce este scris clar.",
        },
        {
          label: "Am responsabilitate spirituală și ascund un păcat.",
          response:
            "Rolul nu neutralizează păcatul. Oprește accesul, spune adevărul persoanelor potrivite și acceptă pierderea funcției dacă protecția și integritatea o cer.",
        },
        {
          label: "Mă tem că orice cădere mă face Iuda.",
          response:
            "Nu folosi avertismentul pentru diagnostic obsesiv. Petru a căzut și s-a întors; Iuda a mers până la trădare. Răspunde acum prin lumină și pocăință.",
        },
      ],
      scriptureRef: "Ioan 12:5-6",
      scriptureText:
        "Iuda vorbea despre bani pentru săraci nu pentru că îi păsa de ei, ci pentru că era hoț și lua din pungă.",
      truth: [
        "Scriptura ne interzice să inventăm detalii despre apostoli dincolo de mărturia ei, chiar când o poveste spectaculoasă ar suna folositor.",
        "Darurile, rolul și apropierea de comunitate nu înlocuiesc pocăința. Păcatul protejat trebuie adus la lumină înainte să se întărească.",
      ],
      quiz: {
        question: "Ce nu dovedește automat o inimă predată lui Iisus?",
        correct: "Rolul, experiența și apropierea exterioară de lucrurile sfinte.",
        wrong: [
          "Pocăința care aduce fapta la lumină.",
          "Rămânerea în cuvântul și ascultarea lui Iisus.",
        ],
        explanation:
          "Iuda a avut poziție și acces, dar a păstrat furtul și a ales trădarea.",
      },
      multiChoice: {
        prompt: "Ce cere avertismentul?",
        options: [
          "Cercetarea motivelor.",
          "Adevăr despre bani și responsabilitate.",
          "Pocăință înainte de împietrire.",
          "Speculații despre viețile apostolilor.",
        ],
      },
      action:
        "Verifică un domeniu în care ai încredere, bani sau influență. Creează o formă de transparență care nu depinde doar de propria declarație.",
      journal:
        "Ce rol sau experiență folosești ca argument că păcatul protejat nu este atât de periculos?",
      prayer:
        "Iisuse, supune zelul meu și cercetează-mi motivele. Nu mă lăsa să folosesc apropierea de lucrurile sfinte ca acoperire pentru întuneric.",
      declaration:
        "Completează: «Îmi voi supune zelul în domeniul ___ și voi aduce la lumină ___ înaintea lui ___.»",
    },
  ],
)

export const DRAGOSTEA_POTRIVIT_SCRIPTURII_LESSONS = courseLessons(
  "formare_dragoste",
  [
    {
      id: "dragoste_l1",
      title: "Dragostea primește forma lui Hristos",
      refs: ["1 Corinteni 13:1-3", "Ioan 13:34-35", "1 Ioan 4:7-10"],
      memoryRef: "Ioan 13:34",
      memoryText: "Cum v-am iubit Eu, așa să vă iubiți și voi unii pe alții.",
      hook: [
        "Poți vorbi impresionant, poți face sacrificii vizibile și poți apăra o cauză corectă, iar Pavel spune că fără dragoste poți rămâne nimic.",
        "Dragostea nu își inventează singură definiția. Primește forma crucii: Dumnezeu ne-a iubit trimițându-L pe Fiul pentru păcatul nostru.",
      ],
      choicePrompt: "Ce ai confundat cel mai des cu dragostea?",
      branches: [
        {
          label: "Sentimentul intens.",
          response:
            "Sentimentul poate însoți dragostea, dar nu o conduce singur. Întreabă ce bine adevărat urmărești și ce ascultare cere când emoția scade.",
        },
        {
          label: "Sacrificiul care mă face indispensabil.",
          response:
            "Pavel spune că poți da mult fără dragoste. Verifică dacă slujirea respectă libertatea omului sau cumpără nevoie, admirație și control.",
        },
        {
          label: "Acceptarea fără nicio confruntare.",
          response:
            "Iubirea lui Dumnezeu vine la păcătoși și tratează păcatul prin cruce. Aprobarea răului nu este o formă mai înaltă de dragoste.",
        },
      ],
      scriptureRef: "1 Ioan 4:10",
      scriptureText:
        "Dragostea stă nu în faptul că noi L-am iubit pe Dumnezeu, ci că El ne-a iubit și L-a trimis pe Fiul Său ca jertfă pentru păcatele noastre.",
      truth: [
        "Dragostea creștină începe în caracterul și lucrarea lui Dumnezeu, nu în preferința noastră de moment.",
        "Ea urmărește binele adevărat al celuilalt și poate cere apropiere, sacrificiu, confruntare sau limită.",
      ],
      quiz: {
        question: "Care este modelul dragostei creștine?",
        correct: "Iubirea lui Dumnezeu arătată în trimiterea și jertfa Fiului.",
        wrong: [
          "Orice sentiment puternic și sincer.",
          "Orice sacrificiu care mă face necesar.",
        ],
        explanation:
          "Ioan definește dragostea prin inițiativa lui Dumnezeu și tratarea reală a păcatului în Hristos.",
      },
      multiChoice: {
        prompt: "Ce poate cere dragostea?",
        options: [
          "Sacrificiu.",
          "Adevăr.",
          "Limite.",
          "Aprobarea oricărei alegeri.",
        ],
      },
      action:
        "Alege un om și definește binele lui adevărat, nu doar lucrul care îl face mulțumit de tine. Fă un pas curat spre acel bine.",
      journal:
        "Ce primești tu din felul în care «iubești» și cum ar arăta binele celuilalt fără acel câștig?",
      prayer:
        "Dumnezeule care ai iubit întâi, formează dragostea mea după Hristos, nu după frica, nevoia sau sentimentul meu.",
    },
    {
      id: "dragoste_l2",
      title: "Răbdare și bunătate fără invidie",
      refs: ["1 Corinteni 13:4", "Romani 12:15", "Iacov 3:14-16"],
      memoryRef: "1 Corinteni 13:4",
      memoryText: "Dragostea este îndelung răbdătoare, este plină de bunătate și nu pizmuiește.",
      hook: [
        "Răbdarea suportă greutatea omului fără să-l pedepsească pentru ritmul lui. Bunătatea nu rămâne neutră, ci face bine. Invidia suferă tocmai când celălalt primește binele.",
        "Poți zâmbi la reușita cuiva și, înăuntru, să începi imediat procesul prin care o micșorezi.",
      ],
      choicePrompt: "Care reacție este mai aproape de tine?",
      branches: [
        {
          label: "Mă irită ritmul lent al altuia.",
          response:
            "Răbdarea nu anulează termenele și responsabilitatea, dar refuză umilirea. Spune clar ce este necesar și oferă timpul legitim pentru creștere.",
        },
        {
          label: "Ajut, dar țin evidența datoriei.",
          response:
            "Bunătatea care facturează emoțional devine control. Fă binele pe care îl poți oferi liber și spune limita înainte să acumulezi resentiment.",
        },
        {
          label: "Succesul altuia mă face să mă simt mai mic.",
          response:
            "Valoarea lui nu îți fură locul. Mărturisește invidia și exersează bucuria concretă: laudă adevărul și binecuvântează fără ironie.",
        },
      ],
      scriptureRef: "Romani 12:15",
      scriptureText: "Bucurați-vă cu cei ce se bucură; plângeți cu cei ce plâng.",
      truth: [
        "Răbdarea nu este pasivitate fără termen, iar bunătatea nu este servilism. Amândouă urmăresc binele în adevăr.",
        "Invidia transformă darul altuia într-un verdict asupra ta. Dragostea poate celebra fără comparație.",
      ],
      quiz: {
        question: "Cum răspunde dragostea la binele primit de altul?",
        correct: "Se bucură sincer și refuză comparația care micșorează.",
        wrong: [
          "Îl explică prin noroc ca să doară mai puțin.",
          "Îl ignoră până când primește și ea ceva asemănător.",
        ],
        explanation:
          "Dragostea nu pizmuiește și poate intra în bucuria celuilalt fără să-și piardă identitatea.",
      },
      multiChoice: {
        prompt: "Ce practică dragostea aici?",
        options: [
          "Răbdare.",
          "Bunătate concretă.",
          "Bucurie cu celălalt.",
          "Contabilitatea datoriei.",
        ],
      },
      action:
        "Felicită specific o persoană pe care ai invidiat-o și fă un bine fără să creezi o datorie ascunsă.",
      journal:
        "A cui bucurie o simți ca pe o amenințare și ce crezi că spune despre valoarea ta?",
      prayer:
        "Doamne, fă-mă răbdător, bun și liber să mă bucur de binele altuia fără comparație.",
    },
    {
      id: "dragoste_l3",
      title: "Dragostea nu se laudă și nu se umflă",
      refs: ["1 Corinteni 13:4", "Filipeni 2:3-8", "Ieremia 9:23-24"],
      memoryRef: "Filipeni 2:3",
      memoryText: "În smerenie, fiecare să privească pe altul mai presus de el însuși.",
      hook: [
        "Lauda nu apare numai când enumeri realizări. Poate apărea când transformi orice conversație în povestea ta sau când micșorezi contribuția altuia pentru a-ți păstra locul.",
        "Smerenia lui Hristos nu este negarea adevărului despre El. Este folosirea poziției și puterii pentru a sluji, nu pentru a Se agăța de avantaj.",
      ],
      choicePrompt: "Cum îți protejezi importanța?",
      branches: [
        {
          label: "Aduc mereu conversația înapoi la mine.",
          response:
            "Pune două întrebări reale înainte să adaugi experiența ta. Ascultarea este o formă prin care îi faci loc omului, nu doar aștepți rândul.",
        },
        {
          label: "Îmi ascund nevoia de laudă sub modestie.",
          response:
            "Autodeprecierea poate cere celorlalți să te contrazică și să te ridice. Spune adevărul simplu și mută mulțumirea spre Dumnezeu și echipă.",
        },
        {
          label: "Mă simt îndreptățit fiindcă am muncit mult.",
          response:
            "Munca poate merita recunoaștere și plată, dar nu superioritate. Cere dreptatea clar, fără să transformi contribuția în drept de dominare.",
        },
      ],
      scriptureRef: "Filipeni 2:5-7",
      scriptureText:
        "Să aveți în voi gândul lui Hristos, care S-a dezbrăcat pe Sine și a luat chip de rob.",
      truth: [
        "Smerenia nu minte despre daruri; recunoaște sursa lor și le folosește pentru binele altuia.",
        "Mândria cere ca valoarea să fie confirmată prin comparație, control sau centrul atenției. Dragostea poate coborî fără să-și piardă identitatea.",
      ],
      quiz: {
        question: "Cum arată smerenia lui Hristos?",
        correct: "Folosește puterea și poziția pentru slujire și jertfă.",
        wrong: [
          "Neagă adevărul despre identitatea și autoritatea Lui.",
          "Așteaptă ca ceilalți să-L convingă de valoarea Sa.",
        ],
        explanation:
          "Filipeni 2 unește identitatea adevărată cu alegerea voluntară a slujirii.",
      },
      multiChoice: {
        prompt: "Ce poate practica smerenia?",
        options: [
          "Ascultare reală.",
          "Împărțirea meritului.",
          "Slujirea fără scenă.",
          "Minciuna că nu am niciun dar.",
        ],
      },
      action:
        "Într-o conversație, renunță să spui povestea care te pune în centru și evidențiază contribuția reală a altcuiva.",
      journal:
        "Ce confirmare cauți prin lauda directă sau prin modestia care cere să fie contrazisă?",
      prayer:
        "Iisuse smerit, eliberează-mă de nevoia de a fi centrul și învață-mă să folosesc ce am pentru binele altuia.",
    },
    {
      id: "dragoste_l4",
      title: "Nu caută folosul său",
      refs: ["1 Corinteni 13:5", "Marcu 10:42-45", "Filipeni 2:4"],
      memoryRef: "Filipeni 2:4",
      memoryText: "Fiecare să se uite nu la foloasele lui, ci și la foloasele altora.",
      hook: [
        "Egoismul nu spune întotdeauna «nu-mi pasă». Uneori spune «fac totul pentru tine», dar decide singur ce ai nevoie și cere acces, recunoștință sau ascultare în schimb.",
        "Dragostea privește interesul celuilalt fără să nege responsabilitatea proprie sau să întrețină păcatul lui.",
      ],
      choicePrompt: "Unde cauți folosul tău sub forma grijii?",
      branches: [
        {
          label: "Ajut ca să fiu necesar.",
          response:
            "Întreabă înainte, respectă un «nu» și ajută omul să devină responsabil, nu dependent de rolul tău.",
        },
        {
          label: "Evit limita ca să nu fiu considerat rău.",
          response:
            "Lipsa limitei poate proteja imaginea ta și poate hrăni răul. Spune ce poți oferi liber și ce nu vei continua.",
        },
        {
          label: "Îmi apăr numai drepturile mele.",
          response:
            "Drepturile pot fi reale. Întreabă și dacă renunțarea voluntară la un avantaj ar sluji binele, fără să legitimeze abuzul sau nedreptatea.",
        },
      ],
      scriptureRef: "Marcu 10:45",
      scriptureText: "Fiul omului a venit să slujească și să-Și dea viața ca răscumpărare pentru mulți.",
      truth: [
        "Dragostea nu este autosacrificiu compulsiv și nici folosirea altuia pentru confort, statut sau identitate.",
        "Modelul este Iisus: dăruire voluntară pentru binele real și mântuirea altuia, în ascultare de Tatăl.",
      ],
      quiz: {
        question: "Ce înseamnă să nu cauți numai folosul tău?",
        correct: "Să iei în calcul binele real al celuilalt fără control sau complicitate.",
        wrong: [
          "Să nu mai ai nicio limită sau responsabilitate personală.",
          "Să decizi singur ce trebuie să primească celălalt.",
        ],
        explanation:
          "Pavel spune «și la foloasele altora», nu cere anularea persoanei sau a adevărului.",
      },
      multiChoice: {
        prompt: "Ce verifică o faptă de slujire?",
        options: [
          "Binele real al omului.",
          "Libertatea lui.",
          "Motivul meu.",
          "Datoria emoțională pe care o creez.",
        ],
      },
      action:
        "Înainte de a ajuta, întreabă persoana ce îi este de folos și oferă un lucru pe care îl poți da fără control sau resentiment.",
      journal:
        "Ce nevoie a ta de a fi bun, necesar sau aprobat conduce felul în care slujești?",
      prayer:
        "Iisuse, curăță slujirea mea de folos ascuns. Învață-mă să caut binele real fără control și fără complicitate.",
    },
    {
      id: "dragoste_l5",
      title: "Dragostea nu acoperă răul ca să-l păstreze",
      refs: ["1 Corinteni 13:6", "Efeseni 5:8-13", "Matei 18:15-17", "Romani 13:8-10"],
      memoryRef: "1 Corinteni 13:6",
      memoryText: "Dragostea nu se bucură de nelegiuire, ci se bucură de adevăr.",
      hook: [
        "A trece peste o iritare minoră poate fi dragoste. A ascunde abuzul, furtul sau pericolul ca să protejezi reputația nu este dragoste.",
        "Biblia poate vorbi despre acoperirea greșelilor fără bârfă și tot Biblia poruncește scoaterea faptelor întunericului la lumină. Contextul și natura răului contează.",
      ],
      choicePrompt: "Ce numești «acoperire în dragoste»?",
      branches: [
        {
          label: "Renunț să mă agăț de o iritare mică.",
          response:
            "Aceasta poate fi răbdare matură. Nu transforma fiecare slăbiciune în proces public și nu păstra contabilitatea pentru pedeapsa viitoare.",
        },
        {
          label: "Țin secret un păcat grav care continuă.",
          response:
            "Secretul care păstrează accesul și pericolul nu protejează omul, ci răul. Implică persoanele și autoritățile potrivite situației.",
        },
        {
          label: "Mi-e teamă că adevărul va rupe relația sau comunitatea.",
          response:
            "Minciuna a rupt deja temelia. Spune adevărul cu limite de confidențialitate și siguranță, fără spectacol și fără promisiunea că relația trebuie păstrată cu orice preț.",
        },
      ],
      scriptureRef: "Efeseni 5:11-13",
      scriptureText:
        "Nu luați parte la lucrările neroditoare ale întunericului, ci mai degrabă osândiți-le; tot ce este dat pe față de lumină se face vădit.",
      truth: [
        "Dragostea poate acoperi o slăbiciune prin discreție și iertare, dar nu acoperă răul prin negare, complicitate sau blocarea protecției.",
        "Abuzul, violența și infracțiunea cer siguranță și responsabilitate. Confidențialitatea pastorală nu este imunitate pentru făptuitor.",
      ],
      quiz: {
        question: "Când «acoperirea» devine complicitate?",
        correct: "Când ascunde răul grav, păstrează accesul sau împiedică protecția și responsabilitatea.",
        wrong: [
          "Când refuz să bârfesc o iritare minoră.",
          "Când iert fără să păstrez răzbunarea personală.",
        ],
        explanation:
          "Dragostea se bucură de adevăr și nu poate cere victimei sau martorului să întrețină întunericul.",
      },
      multiChoice: {
        prompt: "Ce cere răul grav?",
        options: [
          "Oprirea accesului.",
          "Protecția celor în pericol.",
          "Adevăr către oamenii potriviți.",
          "Secret pentru reputația grupului.",
        ],
      },
      action:
        "Clasifică situația: iritare, păcat relațional, abuz sau infracțiune. Alege răspunsul potrivit și nu confrunta singur dacă există pericol.",
      journal:
        "Ce reputație, relație sau instituție ai fi tentat să protejezi în locul omului aflat în pericol?",
      prayer:
        "Dumnezeule al luminii, dă-mi dragoste care iartă fără bârfă și curaj care expune răul fără spectacol sau complicitate.",
    },
    {
      id: "dragoste_l6",
      title: "Se bucură de adevăr și dreptate",
      refs: ["1 Corinteni 13:6", "Efeseni 4:15,25", "Proverbe 27:5-6"],
      memoryRef: "Efeseni 4:15",
      memoryText: "Credincioși adevărului, în dragoste, să creștem în toate privințele în Hristos.",
      hook: [
        "Adevărul fără dragoste poate deveni armă. Dragostea fără adevăr devine protecția iluziei. Pavel refuză alegerea dintre ele.",
        "Scopul confruntării nu este victoria ta, ci lumina, pocăința, protecția și creșterea în Hristos.",
      ],
      choicePrompt: "Unde se rupe echilibrul tău?",
      branches: [
        {
          label: "Spun adevărul ca să câștig sau să pedepsesc.",
          response:
            "Așteaptă până poți formula scopul bun pentru om. Dacă scopul este umilirea, nu numi impulsul «curaj profetic».",
        },
        {
          label: "Tac pentru a păstra pacea aparentă.",
          response:
            "Pacea construită pe minciună amână conflictul și crește paguba. Alege timpul și martorii potriviți, apoi spune fapta și chemarea la adevăr.",
        },
        {
          label: "Nu știu dacă interpretarea mea este fapt.",
          response:
            "Separă observația de concluzie: «Ai spus...» este fapt; «nu-ți pasă niciodată» este interpretare globală. Întreabă înainte să condamni motivul.",
        },
      ],
      scriptureRef: "Proverbe 27:5-6",
      scriptureText:
        "Mai bine o mustrare pe față decât o prietenie ascunsă; rănile făcute de un prieten dovedesc credincioșia lui.",
      truth: [
        "Confruntarea iubitoare este specifică, verificabilă și orientată spre bine, nu spre descărcarea furiei.",
        "Adevărul nu garantează reconcilierea, dar refuzul adevărului garantează că relația rămâne construită pe ceva fals.",
      ],
      quiz: {
        question: "Cum se spune adevărul în dragoste?",
        correct: "Specific, cu scop bun, după ascultare și fără atribuirea inventată a motivelor.",
        wrong: [
          "Prin orice cuvinte, dacă informația de bază este corectă.",
          "Numai atunci când omul garantează că nu se va supăra.",
        ],
        explanation:
          "Dragostea influențează scopul, timpul, forma și responsabilitatea, fără să elimine conținutul adevărului.",
      },
      multiChoice: {
        prompt: "Ce pregătești pentru o confruntare?",
        options: [
          "Fapta observată.",
          "Efectul real.",
          "Scopul bun.",
          "Verdictul asupra inimii omului.",
        ],
      },
      action:
        "Scrie o confruntare în patru propoziții: observație, efect, adevăr biblic și cerere. Elimină «mereu», «niciodată» și diagnosticul motivului.",
      journal:
        "Ce urmărești de fapt când spui adevărul: lumină și bine sau descărcare și victorie?",
      prayer:
        "Doamne, unește adevărul și dragostea în mine. Oprește cruzimea care se numește sinceritate și frica ce se numește pace.",
    },
    {
      id: "dragoste_l7",
      title: "Rabdă, crede și speră fără orbire",
      refs: ["1 Corinteni 13:7", "Galateni 6:2,5", "Romani 12:18", "Proverbe 22:3"],
      memoryRef: "Romani 12:18",
      memoryText: "Dacă este cu putință și cât atârnă de voi, trăiți în pace cu toți oamenii.",
      hook: [
        "«Dragostea crede totul» nu înseamnă că ignoră faptele sau predă din nou încrederea unui om care continuă să mintă.",
        "Dragostea refuză cinismul, poartă poveri și speră în lucrarea lui Dumnezeu, dar vede primejdia și nu confundă speranța cu accesul nelimitat.",
      ],
      choicePrompt: "Ce ai confundat cu răbdarea iubitoare?",
      branches: [
        {
          label: "Să cred fiecare promisiune după un tipar repetat de minciună.",
          response:
            "Poți spera în pocăință și totuși cere rod, timp și verificare. Încrederea se reconstruiește prin adevăr repetat, nu prin presiune spirituală.",
        },
        {
          label: "Să port responsabilitatea pe care celălalt o refuză.",
          response:
            "Galateni vorbește și despre purtarea poverilor, și despre sarcina fiecăruia. Ajutorul nu trebuie să elimine consecința care îl cheamă la responsabilitate.",
        },
        {
          label: "Să rămân în pericol pentru a dovedi iubirea.",
          response:
            "Omul chibzuit vede răul și se ascunde. Ieșirea din pericol, chemarea ajutorului și limita nu sunt trădarea dragostei.",
        },
      ],
      scriptureRef: "Proverbe 22:3",
      scriptureText: "Omul chibzuit vede răul și se ascunde, dar cei lesne crezători merg înainte și sunt pedepsiți.",
      truth: [
        "Dragostea interpretează generos unde faptele permit și refuză suspiciunea fără temei. Nu neagă tiparul dovedit sau pericolul.",
        "Poți ierta, spera și te ruga de la distanță. Reconcilierea și accesul cer adevăr, pocăință, rod și siguranță.",
      ],
      quiz: {
        question: "Ce înseamnă «dragostea crede totul»?",
        correct: "Refuză cinismul fără să nege adevărul, tiparul sau pericolul.",
        wrong: [
          "Acceptă orice afirmație, indiferent de fapte.",
          "Înlătură imediat toate limitele după o scuză.",
        ],
        explanation:
          "Aceeași Scriptură laudă chibzuința și cere pace numai cât depinde de noi și cât este posibil.",
      },
      multiChoice: {
        prompt: "Ce poate coexista cu dragostea?",
        options: [
          "Speranță.",
          "Verificare.",
          "Limită de siguranță.",
          "Negarea faptelor.",
        ],
      },
      action:
        "Pentru o relație dificilă, separă: ce ierți, pentru ce te rogi, ce limită păstrezi și ce rod ar fi necesar pentru încredere.",
      journal:
        "Ce te face să numești credință lucrul pe care faptele și înțelepciunea îl numesc primejdie?",
      prayer:
        "Doamne, păzește-mă de cinism și de orbire. Dă-mi dragoste care speră în Tine și umblă în adevăr și chibzuință.",
    },
    {
      id: "dragoste_l8",
      title: "Dragostea nu cade",
      refs: ["1 Corinteni 13:8-13", "Ioan 15:9-13", "Apocalipsa 21:3-5"],
      memoryRef: "1 Corinteni 13:13",
      memoryText: "Rămân credința, nădejdea și dragostea; dar cea mai mare dintre ele este dragostea.",
      hook: [
        "Darurile, cunoașterea noastră parțială și rolurile acestei vieți au un capăt. Dragostea aparține caracterului lui Dumnezeu și vieții care va rămâne.",
        "«Nu cade» nu înseamnă că fiecare relație continuă în forma dorită. Înseamnă că iubirea formată de Hristos nu este muncă pierdută, chiar când adevărul cere distanță sau celălalt refuză.",
      ],
      choicePrompt: "Ce te face să crezi că dragostea a eșuat?",
      branches: [
        {
          label: "Celălalt nu s-a schimbat.",
          response:
            "Dragostea nu controlează răspunsul. Poți fi credincios în adevăr, limită și bine fără să produci pocăința pe care numai omul și Dumnezeu o pot lucra.",
        },
        {
          label: "Relația nu a putut fi restaurată.",
          response:
            "Reconcilierea cere două părți și siguranță. Iertarea și refuzul răzbunării pot fi reale chiar când accesul nu este refăcut.",
        },
        {
          label: "Am iubit greșit și am produs rău.",
          response:
            "Numește controlul, complicitatea sau neadevărul. Pocăiește-te și lasă definiția lui Hristos să schimbe felul în care vei iubi de acum.",
        },
      ],
      scriptureRef: "1 Corinteni 13:12-13",
      scriptureText:
        "Acum vedem ca într-o oglindă, în chip întunecos; atunci vom vedea față în față. Acum rămân credința, nădejdea și dragostea.",
      truth: [
        "Dragostea nu este măsurată numai prin rezultatul relației, ci prin fidelitatea față de caracterul și porunca lui Hristos.",
        "În creația nouă, cunoașterea parțială și durerea se vor încheia, iar poporul lui Dumnezeu va locui în dragostea Lui fără păcat și teamă.",
      ],
      quiz: {
        question: "Ce înseamnă că dragostea nu cade?",
        correct: "Aparține vieții lui Dumnezeu și rămâne dincolo de darurile și rolurile trecătoare.",
        wrong: [
          "Fiecare relație trebuie păstrată indiferent de adevăr sau pericol.",
          "Dacă iubesc corect, pot controla schimbarea celuilalt.",
        ],
        explanation:
          "Pavel compară dragostea cu darurile și cunoașterea parțială, nu promite succesul fiecărei relații actuale.",
      },
      multiChoice: {
        prompt: "Ce va rămâne?",
        options: [
          "Credința.",
          "Nădejdea.",
          "Dragostea.",
          "Nevoia de control.",
        ],
      },
      action:
        "Alege o relație și formulează o faptă de dragoste care respectă simultan adevărul, binele și limita necesară.",
      journal:
        "Unde ai măsurat dragostea numai prin apropiere, răspuns sau rezultatul pe care îl doreai?",
      prayer:
        "Dumnezeule al dragostei, formează în mine ceea ce va rămâne. Fă-mă credincios în adevăr, speranță, jertfă și limite curate.",
      declaration:
        "Completează: «Voi iubi pe ___ urmărind binele ___, spunând adevărul ___ și păstrând limita ___. Rezultatul îl las lui Dumnezeu.»",
    },
  ],
)

export const FORMARE_UCENICIE_DRAGOSTE_LESSONS: Lesson[] = [
  ...CE_INSEAMNA_UCENIC_LESSONS,
  ...CEI_DOISPREZECE_LESSONS,
  ...DRAGOSTEA_POTRIVIT_SCRIPTURII_LESSONS,
]
