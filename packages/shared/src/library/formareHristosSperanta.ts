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

export const CUVANTUL_VESNIC_LESSONS = courseLessons(
  "formare_cuvantul",
  [
    {
      id: "cuvantul_l1",
      title: "Cuvântul era Dumnezeu",
      refs: ["Ioan 1:1-5", "Ioan 1:14-18", "Coloseni 1:15-17", "Evrei 1:1-3"],
      memoryRef: "Ioan 1:14",
      memoryText: "Cuvântul S-a făcut trup și a locuit printre noi, plin de har și de adevăr.",
      hook: [
        "Evanghelia după Ioan nu începe cu nașterea lui Iisus, ci înaintea creației. Cel care a venit în lume exista deja, era cu Dumnezeu și era Dumnezeu.",
        "Iisus nu este o creatură ridicată mai târziu la rang divin. Toate au venit în existență prin El, iar în El Dumnezeu ni S-a făcut cunoscut.",
      ],
      choicePrompt: "Ce afirmație despre Iisus îți cere cea mai mare reașezare?",
      branches: [
        {
          label: "El exista înainte de orice lucru creat.",
          response:
            "Nu-L reduce la un învățător apărut în istorie. Privește poruncile și promisiunile Lui ca venind de la Creatorul care ți-a dat viață.",
        },
        {
          label: "El este distinct de Tatăl și totuși este Dumnezeu.",
          response:
            "Ioan nu confundă Persoanele și nici nu micșorează dumnezeirea Fiului. Primește mărturia textului chiar dacă taina depășește formulele noastre simple.",
        },
        {
          label: "Dumnezeu S-a apropiat cu adevărat în trup.",
          response:
            "Fiul nu a mimat umanitatea. A intrat în slăbiciunea, durerea și moartea noastră fără păcat, ca să ne facă cunoscut harul și adevărul Tatălui.",
        },
      ],
      scriptureRef: "Ioan 1:3",
      scriptureText: "Toate lucrurile au fost făcute prin El; nimic din ce a fost făcut n-a fost făcut fără El.",
      truth: [
        "Cuvântul este veșnic, personal și divin. El este Creatorul, nu parte din creație.",
        "Întruparea nu anulează dumnezeirea Fiului și nici umanitatea Lui reală. În Iisus, Dumnezeu a venit să locuiască printre noi.",
      ],
      quiz: {
        question: "Ce spune Ioan 1 despre Cuvânt?",
        correct: "Era cu Dumnezeu, era Dumnezeu și toate au fost făcute prin El.",
        wrong: [
          "A început să existe la Betleem.",
          "A fost prima ființă creată de Dumnezeu.",
        ],
        explanation:
          "Prologul Îl așază pe Cuvânt înaintea creației și afirmă direct dumnezeirea și lucrarea Lui creatoare.",
      },
      multiChoice: {
        prompt: "Ce afirmă aceste texte despre Fiul?",
        options: [
          "Este veșnic.",
          "Este Creator.",
          "S-a făcut om.",
          "Este numai un profet creat.",
        ],
      },
      action:
        "Citește Ioan 1:1-18 și notează fiecare afirmație despre cine este Cuvântul, ce face și ce oferă.",
      journal:
        "Unde L-ai tratat pe Iisus ca pe un sfătuitor util, nu ca pe Domnul și Creatorul tău?",
      prayer:
        "Doamne Iisuse, Cuvânt veșnic, luminează-mi mintea și supune-mi viața adevărului Tău.",
    },
    {
      id: "cuvantul_l2",
      title: "Cine este Iisus cu adevărat",
      refs: ["Ioan 1:18", "Ioan 1:29-34", "Ioan 1:49-51", "Ioan 20:28-31"],
      memoryRef: "Ioan 20:31",
      memoryText: "Aceste lucruri au fost scrise ca să credeți că Iisus este Hristosul, Fiul lui Dumnezeu.",
      hook: [
        "Ioan adună titluri care nu pot fi reduse la un Iisus construit după preferințele noastre: Mielul lui Dumnezeu, Fiul lui Dumnezeu, Împăratul lui Israel, Domnul și Dumnezeul meu.",
        "Evanghelia nu cere doar acord asupra unor date. Cere credință în Persoana adevărată a lui Iisus și viață în Numele Lui.",
      ],
      choicePrompt: "Ce imagine micșorată despre Iisus te ispitește cel mai des?",
      branches: [
        {
          label: "Un ajutor pentru planurile mele.",
          response:
            "Mielul care ridică păcatul este și Împăratul căruia I te supui. Nu-I cere doar resurse; predă-I direcția și dreptul de a spune nu.",
        },
        {
          label: "Un exemplu moral, dar nu Domnul meu.",
          response:
            "Toma nu a spus doar «învățătorul meu». Învierea l-a adus la mărturisirea «Domnul meu și Dumnezeul meu». Credința adevărată se închină.",
        },
        {
          label: "O versiune a Lui care aprobă tot ce vreau.",
          response:
            "Un Iisus care nu te contrazice este, de obicei, o oglindă. Lasă Evanghelia întreagă să-Ți corecteze imaginea, inclusiv cuvintele despre păcat, judecată și ascultare.",
        },
      ],
      scriptureRef: "Ioan 20:28",
      scriptureText: "Toma I-a răspuns: «Domnul meu și Dumnezeul meu!»",
      truth: [
        "Iisus descoperă pe Tatăl, poartă păcatul ca Miel și primește mărturisirea de Domn și Dumnezeu.",
        "Scopul semnelor scrise de Ioan este credința care primește viața, nu fascinația fără supunere.",
      ],
      quiz: {
        question: "De ce a scris Ioan semnele selectate în Evanghelie?",
        correct: "Ca oamenii să creadă în Iisus și să aibă viață în Numele Lui.",
        wrong: [
          "Ca să ofere o biografie completă a fiecărei zile.",
          "Ca să provoace uimire fără o chemare la credință.",
        ],
        explanation:
          "Ioan își declară scopul: identitatea lui Iisus, credința cititorului și viața în Numele Lui.",
      },
      multiChoice: {
        prompt: "Ce titluri Îi sunt date lui Iisus în Ioan?",
        options: [
          "Mielul lui Dumnezeu.",
          "Fiul lui Dumnezeu.",
          "Domnul și Dumnezeu.",
          "Doar un reformator religios.",
        ],
      },
      action:
        "Scrie o propoziție de mărturisire pentru fiecare titlu din lecție și adaugă ascultarea concretă pe care o cere astăzi.",
      journal:
        "Care adevăr despre Iisus îl mărturisești cu gura, dar îl contrazici prin deciziile tale?",
      prayer:
        "Iisuse Hristoase, Mielul lui Dumnezeu, Fiul lui Dumnezeu, Domnul și Dumnezeul meu, dă-mi viață și o credință ascultătoare.",
      declaration:
        "Completează sincer: «Iisus este ___; de aceea renunț la ___ și Îl voi asculta prin ___.»",
    },
  ],
)

export const CRUCEA_SI_INVIEREA_LESSONS = courseLessons(
  "formare_cruce_inviere",
  [
    {
      id: "cruce_l1",
      title: "De ce crucea",
      refs: ["Isaia 53:4-6", "Marcu 10:45", "Romani 3:23-26", "1 Petru 3:18"],
      memoryRef: "Marcu 10:45",
      memoryText: "Fiul omului a venit să-Și dea viața ca răscumpărare pentru mulți.",
      hook: [
        "Crucea nu este un accident pe care Dumnezeu l-a transformat apoi în simbol. Iisus a venit să slujească și să-Și dea viața pentru păcătoși.",
        "Dacă păcatul ar fi doar o slăbiciune fără vină, crucea ar fi disproporționată. Scriptura îl numește răzvrătire reală și arată un Dumnezeu drept care Îl oferă pe Fiul ca să justifice pe cel ce crede.",
      ],
      choicePrompt: "Ce adevăr despre cruce îți este cel mai greu să-l primești?",
      branches: [
        {
          label: "Păcatul meu este suficient de grav încât să ceară judecată.",
          response:
            "Nu te compara cu oameni mai răi. Privește sfințenia lui Dumnezeu și numește păcatul fără scuze. Crucea zdrobește minimalizarea, dar deschide iertarea.",
        },
        {
          label: "Nu mă pot salva prin repararea imaginii mele.",
          response:
            "Faptele bune nu pot șterge vina trecută. Oprește negocierea și primește prin credință darul pe care numai Hristos l-a putut împlini.",
        },
        {
          label: "Dumnezeu mă iubește fără să numească răul bine.",
          response:
            "La cruce, dragostea și dreptatea nu se anulează. Păcatul este condamnat, iar păcătosului care vine la Hristos i se oferă pace cu Dumnezeu.",
        },
      ],
      scriptureRef: "Isaia 53:5",
      scriptureText: "El era străpuns pentru păcatele noastre și zdrobit pentru fărădelegile noastre.",
      truth: [
        "Crucea descoperă gravitatea păcatului, dreptatea lui Dumnezeu și dragostea Lui pentru cei vinovați.",
        "Iisus moare de bunăvoie pentru noi. El nu este o victimă neputincioasă a unui Tată crud, ci Fiul care Se dă pe Sine în unitatea voii divine.",
      ],
      quiz: {
        question: "De ce este crucea centrală în Evanghelie?",
        correct: "Hristos a purtat păcatul pentru ca Dumnezeu să rămână drept și să justifice pe cel ce crede.",
        wrong: [
          "Arată doar că sacrificiul inspiră oamenii.",
          "Dovedește că păcatul nu are consecințe reale.",
        ],
        explanation:
          "Romani 3 leagă jertfa lui Hristos de dreptatea lui Dumnezeu, iertare și justificarea prin credință.",
      },
      multiChoice: {
        prompt: "Ce descoperă crucea?",
        options: [
          "Gravitatea păcatului.",
          "Dreptatea lui Dumnezeu.",
          "Dragostea lui Dumnezeu.",
          "Inutilitatea pocăinței.",
        ],
      },
      action:
        "Numește înaintea lui Dumnezeu un păcat pe care l-ai micșorat și mărturisește-l fără comparații sau justificări.",
      journal:
        "Ce spune felul în care privești crucea despre felul în care privești păcatul tău?",
      prayer:
        "Dumnezeule drept și milos, nu-mi ascund vina. Mulțumesc pentru Fiul care S-a dat pentru mine; adu-mă la pocăință și credință.",
    },
    {
      id: "cruce_l2",
      title: "Jertfa care împacă",
      refs: ["Leviticul 17:11", "Romani 5:6-11", "2 Corinteni 5:21", "1 Petru 2:24"],
      memoryRef: "Romani 5:8",
      memoryText: "Dumnezeu Își arată dragostea față de noi prin faptul că Hristos a murit pentru noi pe când eram păcătoși.",
      hook: [
        "Biblia vorbește despre cruce prin mai multe imagini: jertfă, răscumpărare, purtarea păcatelor, împăcare și biruință. Nu trebuie să alegem una ca să le ștergem pe celelalte.",
        "La centru rămâne Hristos care moare pentru noi, purtând ceea ce noi nu puteam înlătura și aducându-ne la Dumnezeu.",
      ],
      choicePrompt: "Cu ce înlocuiești cel mai des suficiența jertfei lui Hristos?",
      branches: [
        {
          label: "Cu pedepsirea continuă a propriei persoane.",
          response:
            "Remușcarea nu este ispășire. Primește verdictul lui Dumnezeu în Hristos, apoi repară ce poți și umblă în ascultare fără să pretinzi că suferința ta completează crucea.",
        },
        {
          label: "Cu fapte religioase prin care vreau să plătesc.",
          response:
            "Ascultarea este rodul harului, nu prețul iertării. Când o transformi în plată, îți muți încrederea de la Hristos la performanța ta.",
        },
        {
          label: "Cu ideea că Dumnezeu trebuie pur și simplu să treacă peste rău.",
          response:
            "Iertarea nu declară răul neimportant. Crucea arată costul real al împăcării și faptul că Dumnezeu nu-Și abandonează dreptatea.",
        },
      ],
      scriptureRef: "2 Corinteni 5:21",
      scriptureText: "Pe Cel ce n-a cunoscut niciun păcat, Dumnezeu L-a făcut păcat pentru noi, ca noi să fim neprihănirea lui Dumnezeu în El.",
      truth: [
        "Hristos este fără păcat și Se dă pentru păcătoși. Mântuirea nu este transferul unei vinovății morale personale asupra unui om vinovat, ci lucrarea reprezentativă și jertfitoare a Fiului fără păcat.",
        "Scriptura afirmă că Tatăl L-a înviat și că Fiul Și-a luat viața din nou; nu avem nevoie de teorii juridice inventate dincolo de ce spune textul.",
      ],
      quiz: {
        question: "Cum se raportează faptele bune la jertfa lui Hristos?",
        correct: "Sunt rodul harului primit, nu plata care completează jertfa.",
        wrong: [
          "Cumpără partea de iertare pe care crucea nu a acoperit-o.",
          "Nu mai au niciun loc în viața celui mântuit.",
        ],
        explanation:
          "Harul exclude meritul ca temelie, dar produce o viață nouă de ascultare și fapte bune.",
      },
      multiChoice: {
        prompt: "Ce limbaj folosește Scriptura pentru cruce?",
        options: [
          "Jertfă.",
          "Împăcare.",
          "Purtarea păcatelor.",
          "Autosalvare.",
        ],
      },
      action:
        "Identifică o faptă prin care încerci să plătești pentru acceptare. Transform-o într-un răspuns de recunoștință, nu într-o monedă de schimb.",
      journal:
        "Ce ai adăugat în mintea ta la propoziția «Hristos este suficient»?",
      prayer:
        "Tată, mulțumesc pentru jertfa Fiului. Dezvață-mă de autosalvare și fă ascultarea mea rod al harului.",
    },
    {
      id: "cruce_l3",
      title: "Mormântul gol",
      refs: ["Luca 24:1-12", "1 Corinteni 15:3-8", "1 Corinteni 15:14-20"],
      memoryRef: "Luca 24:6",
      memoryText: "Nu este aici, ci a înviat. Aduceți-vă aminte ce v-a spus.",
      hook: [
        "Creștinismul nu spune doar că ideile lui Iisus au continuat. Spune că trupul Lui nu a rămas în mormânt și că El S-a arătat viu martorilor.",
        "Pavel pune totul în joc: dacă Hristos nu a înviat, predicarea este goală, credința este zadarnică și păcatul rămâne neiertat.",
      ],
      choicePrompt: "Ce reacție ai în fața afirmației că Iisus a înviat trupește?",
      branches: [
        {
          label: "Cred, dar trăiesc de parcă moartea are ultimul cuvânt.",
          response:
            "Adu frica ta sub promisiunea învierii. Speranța nu neagă doliul, dar refuză să-l numească final pentru cei care sunt ai lui Hristos.",
        },
        {
          label: "Mă lupt cu îndoiala.",
          response:
            "Nu ascunde îndoiala sub limbaj religios. Citește mărturia apostolică, verifică ce afirmă și cere-I lui Dumnezeu lumină, fără să pretinzi că orice explicație este egală.",
        },
        {
          label: "O reduc la simbolul unui nou început.",
          response:
            "Noul început există tocmai fiindcă Hristos a înviat în istorie. Simbolul fără eveniment nu poate purta greutatea Evangheliei.",
        },
      ],
      scriptureRef: "1 Corinteni 15:17",
      scriptureText: "Dacă Hristos n-a înviat, credința voastră este zadarnică și voi sunteți încă în păcatele voastre.",
      truth: [
        "Învierea este evenimentul lui Dumnezeu în istorie și temelia speranței creștine.",
        "Mormântul gol, aparițiile și mărturia apostolică nu sunt prezentate ca metafore pentru optimism.",
      ],
      quiz: {
        question: "Ce spune Pavel dacă Hristos nu a înviat?",
        correct: "Credința este zadarnică, iar oamenii rămân în păcatele lor.",
        wrong: [
          "Mesajul moral rămâne neschimbat și suficient.",
          "Numai detaliile secundare ale credinței sunt afectate.",
        ],
        explanation:
          "Pentru Pavel, învierea nu este anexă, ci fapt central fără de care Evanghelia se prăbușește.",
      },
      multiChoice: {
        prompt: "Ce susține mărturia învierii?",
        options: [
          "Mormântul gol.",
          "Aparițiile lui Iisus.",
          "Mărturia apostolilor.",
          "Doar nevoia noastră de speranță.",
        ],
      },
      action:
        "Citește 1 Corinteni 15:1-28 și trasează două coloane: ce urmează dacă Hristos a înviat și ce urmează dacă nu.",
      journal:
        "Ce teamă sau alegere actuală ar trebui schimbată dacă învierea este cu adevărat ultimul cuvânt al lui Dumnezeu?",
      prayer:
        "Dumnezeule care L-ai înviat pe Iisus, întărește-mi credința și reașază-mi viața sub speranța învierii.",
    },
    {
      id: "cruce_l4",
      title: "Martorii învierii",
      refs: ["Ioan 20:19-29", "1 Corinteni 15:5-8", "Faptele Apostolilor 2:22-36"],
      memoryRef: "Faptele Apostolilor 2:32",
      memoryText: "Dumnezeu L-a înviat pe acest Iisus, și noi toți suntem martori ai Lui.",
      hook: [
        "Primii vestitori nu au predicat o experiență interioară imposibil de verificat. Au spus că Iisus cel răstignit a fost înviat și că ei L-au văzut.",
        "Toma arată că îndoiala nu este rezolvată prin rușinare. Iisus îl confruntă cu dovada și îl cheamă să nu rămână necredincios.",
      ],
      choicePrompt: "Ce obstacol apare când auzi mărturia martorilor?",
      branches: [
        {
          label: "Nu am fost acolo, deci nu pot ști nimic.",
          response:
            "Cea mai mare parte a cunoașterii istorice vine prin mărturie evaluată. Întreabă ce susțin martorii, cât de devreme și cu ce consecințe, nu cere un standard pe care nu-l aplici nicăieri.",
        },
        {
          label: "Mă tem să pun întrebări.",
          response:
            "Credința biblică nu are nevoie de prefăcătorie. Pune întrebarea exactă, caută răspunsul în text și nu transforma nelămurirea punctuală într-un verdict total.",
        },
        {
          label: "Aș crede dacă aș avea un semn personal.",
          response:
            "Iisus poate lucra personal, dar nu negociază la infinit cu cererea de dovezi speciale. Mărturia a fost scrisă ca să crezi; răspunde luminii pe care o ai.",
        },
      ],
      scriptureRef: "Ioan 20:29",
      scriptureText: "Ferice de cei ce n-au văzut și au crezut.",
      truth: [
        "Credința celor care nu L-au văzut fizic se sprijină pe mărturia apostolică dată și păstrată în Scriptură.",
        "Apostolii nu sunt sursa învierii, ci martori autorizați ai Celui înviat.",
      ],
      quiz: {
        question: "Pe ce se sprijină credința celor care nu L-au văzut fizic pe Iisus?",
        correct: "Pe mărturia apostolică despre Hristos, păstrată în Scriptură.",
        wrong: [
          "Pe refuzul oricărei întrebări.",
          "Pe obligația de a primi un semn privat identic cu al lui Toma.",
        ],
        explanation:
          "Ioan scrie tocmai pentru cititorii care nu au fost în cameră, dar pot crede prin mărturia adevărată.",
      },
      multiChoice: {
        prompt: "Cum răspunzi responsabil îndoielii?",
        options: [
          "Formulezi întrebarea exactă.",
          "Citești mărturia biblică.",
          "Cauți răspunsuri competente.",
          "Ascunzi orice nelămurire.",
        ],
      },
      action:
        "Scrie cea mai serioasă întrebare a ta despre înviere și caută în Ioan 20 și 1 Corinteni 15 exact afirmațiile relevante.",
      journal:
        "Ceri dovezi pentru a afla adevărul sau ridici permanent pragul ca să nu fii chemat la ascultare?",
      prayer:
        "Doamne Iisuse, întâmpină necredința mea cu adevărul Tău și dă-mi o credință cinstită, nu prefăcută.",
    },
    {
      id: "cruce_l5",
      title: "Drumul spre Emaus",
      refs: ["Luca 24:13-35", "Luca 24:44-47", "Ioan 5:39-40"],
      memoryRef: "Luca 24:27",
      memoryText: "A început de la Moise și de la toți prorocii și le-a tâlcuit ce era cu privire la El în toate Scripturile.",
      hook: [
        "Cei doi aveau faptele, dar le interpretau prin speranțele lor prăbușite. Iisus nu le oferă mai întâi o senzație; le reașază povestea prin Scripturi.",
        "A citi Biblia creștin înseamnă a vedea cum promisiunile, tiparele și împlinirea converg în Hristos, fără să transformăm fiecare detaliu într-un cod secret.",
      ],
      choicePrompt: "Ce îți întunecă cel mai mult citirea Scripturii?",
      branches: [
        {
          label: "O dezamăgire care îmi dictează concluzia.",
          response:
            "Numește speranța care s-a prăbușit. Apoi lasă textul să definească ce a promis Dumnezeu, nu obliga textul să susțină scenariul tău.",
        },
        {
          label: "Caut numai versete despre mine.",
          response:
            "Tu ești chemat și iubit, dar nu ești centrul canonului. Întreabă mai întâi ce descoperă pasajul despre Dumnezeu, lucrarea Lui și Hristos.",
        },
        {
          label: "Văd simboluri ascunse în orice detaliu.",
          response:
            "Hristos este împlinirea Scripturilor, dar legăturile trebuie susținute de text, context și mărturia biblică, nu de asemănări imaginative.",
        },
      ],
      scriptureRef: "Luca 24:32",
      scriptureText: "Nu ne ardea inima în noi când ne vorbea pe drum și ne deschidea Scripturile?",
      truth: [
        "Hristos este centrul istoriei răscumpărării, iar crucea și învierea nu contrazic planul Scripturii, ci îl împlinesc.",
        "Inima aprinsă urmează Scripturii deschise. Emoția nu înlocuiește sensul textului.",
      ],
      quiz: {
        question: "Cum le corectează Iisus interpretarea celor doi?",
        correct: "Le explică din Scripturi suferința și slava lui Hristos.",
        wrong: [
          "Le spune că textul nu mai contează după experiență.",
          "Le dă un cod prin care fiecare detaliu devine simbol ascuns.",
        ],
        explanation:
          "Iisus le reașază speranța prin sensul Scripturilor care conduc la Mesia suferind și glorificat.",
      },
      multiChoice: {
        prompt: "Ce întrebări ajută o citire centrată pe Hristos?",
        options: [
          "Unde este pasajul în istoria răscumpărării?",
          "Cum se leagă legitim de Hristos?",
          "Ce afirmă contextul?",
          "Ce simbol pot inventa din orice detaliu?",
        ],
      },
      action:
        "Citește Luca 24:13-35 și notează: interpretarea ucenicilor, corectarea lui Iisus și schimbarea produsă.",
      journal:
        "Ce dezamăgire te face să spui «noi trăgeam nădejde» și să nu mai vezi ce a spus Dumnezeu de fapt?",
      prayer:
        "Doamne Iisuse, deschide-mi Scripturile și corectează povestea falsă prin care Îți interpretez lucrarea.",
    },
    {
      id: "cruce_l6",
      title: "Petru restaurat și trimis",
      refs: ["Luca 22:31-34", "Luca 22:54-62", "Ioan 21:15-19"],
      memoryRef: "Ioan 21:17",
      memoryText: "Doamne, Tu toate le știi; știi că Te iubesc. Iisus i-a zis: «Paște oile Mele.»",
      hook: [
        "Petru nu a suferit doar un eșec de imagine. L-a negat de trei ori pe Domnul despre care spusese că nu-L va părăsi niciodată.",
        "Iisus nu numește trădarea neimportantă și nici nu-l abandonează. Îl confruntă, îl reașază în dragoste și îl trimite la slujire, sub o chemare care va costa.",
      ],
      choicePrompt: "Unde te afli după un eșec real?",
      branches: [
        {
          label: "Îl minimalizez ca să pot merge mai departe.",
          response:
            "Restaurarea nu se clădește pe negare. Spune ce ai făcut, cui ai produs rău și ce reparare este posibilă. Harul nu are nevoie de o poveste falsă.",
        },
        {
          label: "Mă declar inutil pentru totdeauna.",
          response:
            "Rușinea nu are ultimul cuvânt asupra celui pe care Hristos îl restaurează. Primește iertarea, acceptă consecințele și lasă chemarea să fie confirmată în timp și comunitate.",
        },
        {
          label: "Vreau imediat poziția înapoi.",
          response:
            "Iertarea nu garantează restaurarea instantanee în orice rol. Petru este chemat de Hristos; în situații de abuz, fraudă sau necalificare, protecția oamenilor și criteriile biblice rămân obligatorii.",
        },
      ],
      scriptureRef: "Ioan 21:19",
      scriptureText: "După ce a spus acestea, i-a zis: «Vino după Mine.»",
      truth: [
        "Hristos restaurează păcătosul pocăit fără să falsifice gravitatea păcatului.",
        "Restaurarea în părtășie, maturizarea și revenirea într-un rol nu sunt automat același lucru. Chemarea la slujire nu anulează siguranța, calificarea sau consecințele.",
      ],
      quiz: {
        question: "Cum îl restaurează Iisus pe Petru?",
        correct: "Îl confruntă în dragoste, îl recheamă la urmare și îi încredințează slujirea.",
        wrong: [
          "Pretinde că lepădarea nu s-a întâmplat.",
          "Îi promite că orice poziție se recuperează automat după scuze.",
        ],
        explanation:
          "Dialogul atinge rana lepădării, afirmă relația și dă o chemare concretă la fidelitate.",
      },
      multiChoice: {
        prompt: "Ce poate cere restaurarea biblică?",
        options: [
          "Mărturisire.",
          "Iertare primită.",
          "Reparare și rod în timp.",
          "Restituirea automată a oricărei poziții.",
        ],
      },
      action:
        "Scrie un plan în patru rânduri: păcatul numit, persoana față de care trebuie reparat, consecința acceptată și următorul pas de fidelitate.",
      journal:
        "Folosești harul ca să eviți adevărul sau rușinea ca să refuzi harul?",
      prayer:
        "Doamne Iisuse, Tu cunoști adevărul despre mine. Iartă-mă, curăță-mă și învăță-mă să Te urmez cu fidelitate.",
      declaration:
        "Completează: «Nu voi ascunde eșecul ___. Primesc harul lui Hristos, accept consecința ___ și fac pasul de reparare ___.»",
    },
  ],
)

export const PREGATIT_PENTRU_MOARTE_LESSONS = courseLessons(
  "formare_pregatit_moarte",
  [
    {
      id: "moarte_pregatire_l1",
      title: "Siguranța mântuirii",
      refs: ["Ioan 5:24", "Ioan 10:27-30", "Romani 8:1", "1 Ioan 5:11-13"],
      memoryRef: "1 Ioan 5:12",
      memoryText: "Cine are pe Fiul are viața; cine n-are pe Fiul lui Dumnezeu n-are viața.",
      hook: [
        "Pregătirea pentru moarte nu începe cu alegerea ceremoniei, ci cu întrebarea: sunt în Hristos? Biblia nu ne trimite nici la prezumție, nici la panică religioasă fără sfârșit.",
        "Siguranța nu se sprijină pe intensitatea emoției de astăzi, ci pe Fiul, promisiunea Lui și rodul unei credințe vii.",
      ],
      choicePrompt: "Ce îți zdruncină cel mai mult siguranța?",
      branches: [
        {
          label: "Mă uit numai la performanța mea schimbătoare.",
          response:
            "Păcatul trebuie mărturisit, dar temelia nu este o zi perfectă. Privește la lucrarea lui Hristos, apoi verifică dacă răspunsul tău este credință pocăită, nu nepăsare.",
        },
        {
          label: "Mă bazez pe o rugăciune spusă cândva, fără viață nouă.",
          response:
            "O formulă nu înlocuiește credința. Nu te liniști cu un moment trecut dacă Îl respingi voit pe Hristos astăzi; vino la El cu pocăință reală.",
        },
        {
          label: "Nu simt nimic și cred că Dumnezeu m-a părăsit.",
          response:
            "Sentimentul este real, dar nu este judecătorul promisiunii. Adu întunericul în rugăciune, rămâi în Cuvânt și cere ajutorul comunității, fără să inventezi un verdict divin din absența emoției.",
        },
      ],
      scriptureRef: "Ioan 5:24",
      scriptureText: "Cine ascultă cuvintele Mele și crede în Cel ce M-a trimis are viața veșnică și nu vine la judecată, ci a trecut din moarte la viață.",
      truth: [
        "Viața veșnică este în Fiul. Credința se odihnește în promisiunea și lucrarea Lui, nu în merit personal.",
        "Aceeași Scriptură care dă siguranță avertizează împotriva unei mărturisiri fără rod. Examinarea sinceră și încrederea în Hristos nu sunt dușmani.",
      ],
      quiz: {
        question: "Care este temelia siguranței mântuirii?",
        correct: "Hristos și promisiunea Lui, primite printr-o credință vie.",
        wrong: [
          "O emoție puternică pe care trebuie să o mențin permanent.",
          "O formulă spusă cândva, indiferent de respingerea actuală a lui Hristos.",
        ],
        explanation:
          "Ioan leagă viața de Fiul și scrie credincioșilor ca să știe că au viața veșnică.",
      },
      multiChoice: {
        prompt: "Ce întărește o siguranță biblică?",
        options: [
          "Promisiunea lui Hristos.",
          "Credința actuală în Fiul.",
          "Rodul lucrat de har.",
          "Compararea cu oameni considerați mai răi.",
        ],
      },
      action:
        "Citește 1 Ioan 5:9-13 și scrie separat: ce a făcut Dumnezeu, unde este viața și ce răspuns cere textul.",
      journal:
        "Siguranța ta este prezumție fără Hristos, panică centrată pe tine sau încredere pocăită în Fiul?",
      prayer:
        "Tată, viața este în Fiul Tău. Păzește-mă de prezumție și disperare și întărește-mă în Hristos.",
    },
    {
      id: "moarte_pregatire_l2",
      title: "Frica de moarte",
      refs: ["Psalmii 23:4", "Evrei 2:14-15", "Filipeni 1:20-23", "1 Tesaloniceni 4:13-18"],
      memoryRef: "Psalmii 23:4",
      memoryText: "Chiar dacă ar fi să umblu prin valea umbrei morții, nu mă tem de niciun rău, căci Tu ești cu mine.",
      hook: [
        "Biblia nu cere să numim moartea prieten. O numește ultimul vrăjmaș, dar vestește că Hristos a intrat în moarte și i-a frânt stăpânirea.",
        "Creștinul poate simți teamă, durere și dorința de a trăi. Speranța nu este amorțire, ci prezența Păstorului și certitudinea învierii.",
      ],
      choicePrompt: "Ce formă ia frica de moarte pentru tine?",
      branches: [
        {
          label: "Mă tem de judecata lui Dumnezeu.",
          response:
            "Nu-ți administra singur achitarea. Vino la Hristos, mărturisește păcatul și întreabă dacă te sprijini pe El sau pe propria dreptate. Pentru cel în Hristos nu mai este condamnare.",
        },
        {
          label: "Mă tem de procesul suferinței și pierderii controlului.",
          response:
            "Fă planuri responsabile: discută cu familia, medicul și pastorul, scrie dorințele legitime. Credința nu interzice îngrijirea paliativă sau pregătirea practică.",
        },
        {
          label: "Mă tem să-i las pe cei dragi.",
          response:
            "Iubește-i acum, spune ce trebuie spus și pune în ordine responsabilitățile. Nu poți controla viitorul lor, dar îi poți încredința Dumnezeului care nu moare.",
        },
      ],
      scriptureRef: "Evrei 2:14-15",
      scriptureText: "Prin moarte, El a nimicit pe cel ce avea puterea morții și i-a izbăvit pe cei ținuți în robie toată viața lor de frica morții.",
      truth: [
        "Hristos nu a biruit moartea evitând-o, ci trecând prin ea și înviind.",
        "A cere ajutor medical sau psihologic pentru anxietate severă nu este lipsă de credință. Adevărul biblic și îngrijirea competentă pot lucra împreună.",
      ],
      quiz: {
        question: "Cum tratează Evrei 2 frica de moarte?",
        correct: "Prin moartea și biruința lui Hristos, care eliberează din robia fricii.",
        wrong: [
          "Prin negarea faptului că moartea este dureroasă.",
          "Prin promisiunea că un credincios nu va simți niciodată teamă.",
        ],
        explanation:
          "Eliberarea are temelia în lucrarea lui Hristos, nu într-o obligație de a nu avea reacții omenești.",
      },
      multiChoice: {
        prompt: "Ce poate cuprinde pregătirea responsabilă?",
        options: [
          "Împăcarea cu Dumnezeu.",
          "Discuții sincere cu cei apropiați.",
          "Planuri medicale și practice.",
          "Negarea oricărei temeri.",
        ],
      },
      action:
        "Alege un pas concret: o conversație, un document practic, o mărturisire sau o întrebare adresată unui pastor ori medic.",
      journal:
        "Ce parte a fricii tale are nevoie de promisiunea lui Hristos și ce parte are nevoie de o acțiune responsabilă?",
      prayer:
        "Iisuse, Biruitorul morții, fii cu mine în teamă. Învață-mă să trăiesc și să mor în nădejdea Ta.",
    },
    {
      id: "moarte_pregatire_l3",
      title: "Trupul, înmormântarea și speranța învierii",
      refs: ["Geneza 3:19", "Ioan 5:28-29", "Romani 14:5-8", "1 Corinteni 15:42-44"],
      memoryRef: "1 Corinteni 15:42",
      memoryText: "Trupul este semănat în putrezire și înviază în neputrezire.",
      hook: [
        "Creștinii au cinstit în mod obișnuit trupul prin înmormântare, ca mărturie a speranței învierii. Totuși, Biblia nu dă o poruncă universală explicită ce declară incinerarea păcat.",
        "Dumnezeul care înviază nu este limitat de descompunere, foc, mare sau trecerea secolelor. Decizia trebuie luată cu conștiință, înțelepciune, respect și fără condamnări pe care textul nu le rostește.",
      ],
      choicePrompt: "Ce influențează cel mai mult felul în care privești ceremonia trupului?",
      branches: [
        {
          label: "Tradiția familiei sau a bisericii.",
          response:
            "Tradiția poate purta înțelepciune și mărturie. Cinstește-o, dar separă clar ceea ce este poruncă biblică de ceea ce este practică primită.",
        },
        {
          label: "Costurile și condițiile practice.",
          response:
            "Administrarea responsabilă contează. Nu transforma o alegere scumpă în dovadă de credință și nici una mai accesibilă în lipsă de respect.",
        },
        {
          label: "Teama că o alegere ar împiedica învierea.",
          response:
            "Puterea învierii aparține lui Dumnezeu, nu stării rămășițelor. Niciun proces fizic nu-L împiedică să ridice morții.",
        },
      ],
      scriptureRef: "Ioan 5:28-29",
      scriptureText: "Vine ceasul când toți cei din morminte vor auzi glasul Lui și vor ieși afară.",
      truth: [
        "Trupul contează fiindcă Dumnezeu l-a creat, Fiul a luat trup și învierea va fi trupească.",
        "Înmormântarea exprimă potrivit imaginea semănării, dar nu trebuie să inventăm o interdicție biblică explicită împotriva incinerării.",
      ],
      quiz: {
        question: "Ce afirmă Biblia cu certitudine despre trupul celui mort?",
        correct: "Dumnezeu îl va învia; puterea Lui nu depinde de procesul fizic al trupului.",
        wrong: [
          "Numai trupurile înmormântate pot fi înviate.",
          "Trupul nu are nicio importanță pentru credința creștină.",
        ],
        explanation:
          "Speranța este în puterea lui Dumnezeu și în înviere, iar demnitatea trupului rămâne reală.",
      },
      multiChoice: {
        prompt: "Ce trebuie separat într-o decizie funerară?",
        options: [
          "Porunca biblică.",
          "Tradiția creștină.",
          "Prudența practică.",
          "Condamnarea inventată.",
        ],
      },
      action:
        "Scrie familiei tale preferințele tale funerare și motivele biblice sau practice, marcând cinstit ce este convingere și ce este poruncă.",
      journal:
        "Unde ai ridicat o tradiție la nivel de poruncă sau ai tratat trupul ca lipsit de demnitate?",
      prayer:
        "Creatorule și Dătătorule al vieții, ajută-mă să cinstesc trupul și să-mi pun nădejdea numai în puterea Ta de a învia.",
      declaration:
        "Completează: «Speranța mea nu stă în metoda ___, ci în Dumnezeu care ___. Voi trata trupul și familia cu ___.»",
    },
  ],
)

export const ADVENTUL_IN_SCRIPTURA_LESSONS = courseLessons(
  "formare_advent",
  [
    {
      id: "advent_l1",
      title: "Isaia, Ahaz și semnul lui Emanuel",
      refs: ["Isaia 7:1-17", "Isaia 8:1-10", "Matei 1:22-23"],
      memoryRef: "Isaia 7:14",
      memoryText: "Iată, fecioara va rămâne însărcinată, va naște un fiu și-i va pune numele Emanuel.",
      hook: [
        "Isaia 7 nu a fost rostit într-un decor liniștit de Crăciun, ci într-o criză politică și militară. Regele Ahaz tremura și refuza să se încreadă în Dumnezeu.",
        "Semnul are o adresă în lumea lui Isaia, iar Matei vede în nașterea din fecioară împlinirea deplină: Dumnezeu cu noi în Iisus Hristos.",
      ],
      choicePrompt: "Ce greșeală de interpretare te ispitește?",
      branches: [
        {
          label: "Sar direct la Matei și ignor criza lui Ahaz.",
          response:
            "Citește capitolele 7 și 8. Contextul istoric nu slăbește împlinirea, ci arată tiparul prezenței și izbăvirii lui Dumnezeu pe care Hristos îl duce la plinătate.",
        },
        {
          label: "Rămân numai în secolul lui Isaia și resping lectura lui Matei.",
          response:
            "Matei este interpret apostolic inspirat al împlinirii. Nu opune contextul inițial împlinirii canonice; ține-le împreună în ordinea dată de Scriptură.",
        },
        {
          label: "Folosesc profeția drept cod pentru orice eveniment actual.",
          response:
            "Textul nu este material pentru predicții arbitrare. Identifică audiența, criza, semnul și felul în care Noul Testament îl aplică.",
        },
      ],
      scriptureRef: "Matei 1:23",
      scriptureText: "Îi vor pune numele Emanuel, care, tălmăcit, înseamnă: Dumnezeu este cu noi.",
      truth: [
        "Profeția trebuie citită în contextul ei istoric, literar și canonic.",
        "Matei nu inventează prezența lui Dumnezeu în text; arată plinătatea ei în Fiul născut din fecioară.",
      ],
      quiz: {
        question: "Cum trebuie citit semnul din Isaia 7?",
        correct: "În criza lui Ahaz și în împlinirea lui canonică arătată de Matei.",
        wrong: [
          "Numai ca predicție izolată, fără context istoric.",
          "Numai ca eveniment antic, ignorând interpretarea Noului Testament.",
        ],
        explanation:
          "Citirea creștină respectă situația inițială și autoritatea apostolică a împlinirii în Hristos.",
      },
      multiChoice: {
        prompt: "Ce elemente verifici într-o profeție?",
        options: [
          "Audiența inițială.",
          "Contextul istoric.",
          "Folosirea în Noul Testament.",
          "Asocieri moderne fără text.",
        ],
      },
      action:
        "Citește Isaia 7:1-17 și Matei 1:18-25. Scrie ce vede Ahaz, ce promite semnul și ce afirmă Matei despre Iisus.",
      journal:
        "Unde refuzi încrederea în Dumnezeu sub o aparență pioasă, asemenea lui Ahaz?",
      prayer:
        "Dumnezeule cu noi, dă-mi credință să citesc drept Cuvântul și să mă încred în Tine în mijlocul fricii.",
    },
    {
      id: "advent_l2",
      title: "Copilul promis și Împăratul păcii",
      refs: ["Isaia 9:1-7", "Luca 1:31-33", "Luca 2:10-14"],
      memoryRef: "Isaia 9:6",
      memoryText: "Un Copil ni S-a născut, un Fiu ni S-a dat, iar domnia va fi pe umărul Lui.",
      hook: [
        "Lumina promisă răsare peste un popor care umbla în întuneric și purta jugul asupririi. Copilul este dar, dar și Rege cu nume care depășesc orice conducător obișnuit.",
        "Pacea Lui nu este decor sentimental. Este domnia dreaptă care zdrobește jugul, pune capăt războiului și nu va avea sfârșit.",
      ],
      choicePrompt: "Ce aștepți cel mai des de la Împăratul promis?",
      branches: [
        {
          label: "Să-mi dea liniște fără să-mi conducă viața.",
          response:
            "Pacea biblică vine sub domnia Lui. Predă-I domeniul în care vrei confort, dar refuzi porunca.",
        },
        {
          label: "Să rezolve imediat orice nedreptate.",
          response:
            "Împărăția a venit în Hristos și va fi descoperită deplin. Nu folosi așteptarea ca scuză pentru pasivitate; practică acum dreptatea Împăratului.",
        },
        {
          label: "Să-mi confirme conducătorul sau tabăra preferată.",
          response:
            "Niciun lider pământesc nu poartă titlurile și domnia Fiului. Evaluează orice putere politică sub dreptatea Lui, nu-L recruta pe Hristos pentru propaganda ei.",
        },
      ],
      scriptureRef: "Isaia 9:7",
      scriptureText: "El va face ca domnia Lui să crească și o pace fără sfârșit să fie peste scaunul de domnie al lui David.",
      truth: [
        "Fiul promis este Rege din casa lui David, iar domnia Lui unește pacea cu dreptatea.",
        "Împlinirea începe prin venirea lui Iisus și așteaptă consumarea Împărăției. Creștinii nu trebuie să confunde niciun regim prezent cu această domnie.",
      ],
      quiz: {
        question: "Cum este pacea Copilului promis?",
        correct: "O pace unită cu domnia dreaptă și veșnică a lui Dumnezeu.",
        wrong: [
          "O stare sentimentală fără dreptate sau ascultare.",
          "Programul unui partid care poate fi identificat cu Împărăția.",
        ],
        explanation:
          "Isaia leagă pacea de tronul lui David, dreptate și o domnie fără sfârșit.",
      },
      multiChoice: {
        prompt: "Ce caracterizează domnia Fiului?",
        options: [
          "Dreptatea.",
          "Pacea.",
          "Veșnicia.",
          "Propaganda unui regim actual.",
        ],
      },
      action:
        "Alege un loc unde poți practica astăzi pacea și dreptatea Împăratului fără să aștepți controlul rezultatului.",
      journal:
        "Unde dorești darurile Împăratului fără domnia Lui?",
      prayer:
        "Iisuse, Împărat al păcii, domnește peste alegerile mele și fă-mă un om al dreptății și împăcării.",
    },
    {
      id: "advent_l3",
      title: "Maria, har și ascultare",
      refs: ["Luca 1:26-38", "Luca 1:46-55", "Luca 2:34-35"],
      memoryRef: "Luca 1:38",
      memoryText: "Iată roaba Domnului; facă-mi-se după cuvintele tale.",
      hook: [
        "Maria este numită binecuvântată și primește un har unic: va purta pe Fiul Celui Preaînalt. Textul nu o prezintă ca zeiță, dar nici nu ne permite să-i micșorăm credința și locul în istoria mântuirii.",
        "Răspunsul ei nu este naiv. Pune o întrebare reală, primește cuvântul lui Dumnezeu și se oferă ascultării care va aduce onoare, neînțelegere și durere.",
      ],
      choicePrompt: "Ce îți este greu în răspunsul Mariei?",
      branches: [
        {
          label: "Să primesc harul fără să-l transform în merit.",
          response:
            "Harul este favoarea lui Dumnezeu, nu dovada autosuficienței. Mulțumește pentru chemare și rămâi dependent de Cel care o dă.",
        },
        {
          label: "Să pun întrebări fără să refuz ascultarea.",
          response:
            "Întrebarea Mariei caută înțelegere, nu o portiță de ieșire. Formulează ce nu înțelegi și păstrează disponibilitatea pentru ce este deja clar.",
        },
        {
          label: "Să accept că ascultarea poate costa reputație și durere.",
          response:
            "Nu romantiza costul. Caută sprijinul oamenilor credincioși, dar nu schimba porunca pentru a controla părerea tuturor.",
        },
      ],
      scriptureRef: "Luca 1:46-47",
      scriptureText: "Sufletul meu mărește pe Domnul și mi se bucură duhul în Dumnezeu, Mântuitorul meu.",
      truth: [
        "Maria este slujitoarea binecuvântată a Domnului și Își numește Dumnezeu Mântuitor. Cinstea biblică nu cere nici divinizare, nici dispreț.",
        "Credința ei primește cuvântul, laudă harul lui Dumnezeu și acceptă costul chemării.",
      ],
      quiz: {
        question: "Cum răspunde Maria chemării?",
        correct: "Cu întrebare sinceră, credință și disponibilitate pentru ascultare.",
        wrong: [
          "Cu pretenția că a meritat alegerea prin perfecțiune proprie.",
          "Cu o ascultare oarbă ce interzice orice întrebare.",
        ],
        explanation:
          "Luca păstrează atât întrebarea ei, cât și predarea: «facă-mi-se după cuvintele tale».",
      },
      multiChoice: {
        prompt: "Ce vezi în răspunsul Mariei?",
        options: [
          "Har primit.",
          "Întrebare sinceră.",
          "Ascultare costisitoare.",
          "Autosuficiență spirituală.",
        ],
      },
      action:
        "Scrie o chemare clară din Scriptură pe care o amâni, întrebarea legitimă pe care o ai și pasul pe care îl poți face deja.",
      journal:
        "Folosești o întrebare reală pentru a căuta adevărul sau pentru a amâna ascultarea?",
      prayer:
        "Dumnezeule, Mântuitorul meu, primesc harul Tău. Dă-mi minte sinceră și inimă disponibilă să fac ce spui.",
    },
    {
      id: "advent_l4",
      title: "Cuvântul S-a făcut trup",
      refs: ["Luca 2:1-20", "Ioan 1:14", "Filipeni 2:5-11", "Evrei 2:14-18"],
      memoryRef: "Luca 2:11",
      memoryText: "Astăzi, în cetatea lui David, vi S-a născut un Mântuitor, care este Hristos, Domnul.",
      hook: [
        "Nașterea lui Iisus unește măreția și smerenia: Hristos Domnul vine ca prunc, într-o familie fără putere imperială, iar vestea ajunge mai întâi la păstori.",
        "Minunea nu are nevoie de calcule astronomice speculative ca să devină adevărată. Evangheliile ne cheamă să primim mărturia despre Fiul întrupat, nu să clădim doctrina pe reconstrucții nesigure ale stelei.",
      ],
      choicePrompt: "Cum riști să pierzi sensul întrupării?",
      branches: [
        {
          label: "O reduc la atmosferă, familie și nostalgie.",
          response:
            "Darurile pot fi bune, dar îngerii vestesc un Mântuitor și Domn. Așază păcatul, mântuirea și închinarea în centrul sărbătorii.",
        },
        {
          label: "Caut senzaționalul în teorii despre stea și date.",
          response:
            "Cercetarea istorică poate fi interesantă, dar nu-i da autoritatea textului. Nu face dintr-o ipoteză dovada de care ar depinde credința.",
        },
        {
          label: "Admir smerenia lui Iisus, dar refuz calea ei.",
          response:
            "Filipeni 2 nu este doar imn, ci poruncă pentru relațiile noastre. Renunță la folosirea statutului pentru avantaj și slujește concret.",
        },
      ],
      scriptureRef: "Ioan 1:14",
      scriptureText: "Cuvântul S-a făcut trup și a locuit printre noi, iar noi am privit slava Lui.",
      truth: [
        "Fiul veșnic a luat natura noastră omenească fără să înceteze să fie Dumnezeu.",
        "Întruparea conduce spre cruce, înviere și înălțare. Pruncul din iesle este Mântuitorul, Hristos și Domnul.",
      ],
      quiz: {
        question: "Care este centrul relatării nașterii lui Iisus?",
        correct: "Fiul veșnic a venit în trup ca Mântuitor, Hristos și Domn.",
        wrong: [
          "O atmosferă de familie care nu cere credință sau ascultare.",
          "O teorie astronomică de care depinde adevărul Evangheliei.",
        ],
        explanation:
          "Titlurile îngerului și mărturia lui Ioan identifică Persoana și misiunea, nu doar decorul.",
      },
      multiChoice: {
        prompt: "La ce răspuns cheamă întruparea?",
        options: [
          "Credință.",
          "Închinare.",
          "Smerenie și slujire.",
          "Fascinație fără ascultare.",
        ],
      },
      action:
        "Alege o persoană față de care poți renunța la avantajul statutului și sluji discret, concret și fără să ceri aplauze.",
      journal:
        "Ce parte a vieții tale celebrează ieslea, dar refuză smerenia și domnia Celui venit în ea?",
      prayer:
        "Iisuse Hristoase, Cuvânt făcut trup, Mântuitor și Domn, primește închinarea și ascultarea mea.",
      declaration:
        "Completează: «Iisus este Mântuitorul și Domnul meu. Renunț la ___ și voi arăta smerenia Lui prin ___.»",
    },
  ],
)

export const FORMARE_HRISTOS_SPERANTA_LESSONS: Lesson[] = [
  ...CUVANTUL_VESNIC_LESSONS,
  ...CRUCEA_SI_INVIEREA_LESSONS,
  ...PREGATIT_PENTRU_MOARTE_LESSONS,
  ...ADVENTUL_IN_SCRIPTURA_LESSONS,
]
