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

export const ATRIBUTELE_LUI_DUMNEZEU_LESSONS = courseLessons(
  "formare_atribute",
  [
    {
      id: "atribute_l1",
      title: "Creatorul și creatura",
      refs: ["Psalmul 90:1-2", "Isaia 40:25-28", "Romani 1:19-20"],
      memoryRef: "Psalmul 90:2",
      memoryText: "Din veșnicie în veșnicie, Tu ești Dumnezeu.",
      hook: [
        "Dacă Îl micșorezi pe Dumnezeu până încape în explicațiile tale, nu L-ai înțeles mai bine. Ai construit un dumnezeu după măsura ta.",
        "Scriptura spune două lucruri împreună: Dumnezeu Se face cunoscut cu adevărat și totuși rămâne mai presus de cuprinderea noastră.",
      ],
      choicePrompt: "Unde te găsești când încerci să-L înțelegi pe Dumnezeu?",
      branches: [
        {
          label: "Îl judec după cum aș proceda eu.",
          response:
            "Creatura nu este măsura Creatorului. Începe cu ce a descoperit El despre Sine, nu cu ce ți s-ar părea ție rezonabil să fie Dumnezeu.",
        },
        {
          label: "Cred că nu putem ști nimic sigur.",
          response:
            "Nu-L putem cuprinde, dar Îl putem cunoaște pentru că El a vorbit și S-a arătat în creație, în Scriptură și deplin în Fiul.",
        },
        {
          label: "Vreau să-L cunosc din Scriptură.",
          response:
            "Aceasta cere smerenie și atenție: primește toate textele, inclusiv pe cele care corectează imaginea confortabilă pe care o aveai despre El.",
        },
      ],
      scriptureRef: "Isaia 40:28",
      scriptureText:
        "Domnul este Dumnezeul cel veșnic, Creatorul marginilor pământului; priceperea Lui nu poate fi pătrunsă.",
      truth: [
        "Dumnezeu nu este o versiune mai mare a omului. El este Creatorul necreat, iar noi depindem de El.",
        "Faptul că nu-L putem epuiza nu ne lasă în întuneric. Ce spune Dumnezeu despre Sine este adevărat și suficient pentru credință și ascultare.",
      ],
      quiz: {
        question: "Ce înseamnă că Dumnezeu este de nepătruns?",
        correct:
          "Îl putem cunoaște adevărat prin revelația Lui, dar nu-L putem cuprinde în întregime.",
        wrong: [
          "Nu putem afirma nimic sigur despre El.",
          "Orice om își poate inventa propria definiție despre Dumnezeu.",
        ],
        explanation:
          "Scriptura Îl descoperă, dar nu transformă Creatorul infinit într-un obiect pe care mintea finită îl epuizează.",
      },
      multiChoice: {
        prompt: "Unde Îl face Dumnezeu cunoscut?",
        options: [
          "În creație.",
          "În Scriptură.",
          "În Fiul, Iisus Hristos.",
          "În fanteziile noastre despre cum ar trebui să fie.",
        ],
      },
      action:
        "Citește Isaia 40:12-31 și scrie separat ce afirmă textul despre Dumnezeu și ce afirmă despre om.",
      journal:
        "Ce trăsătură omenească ai proiectat cel mai des asupra lui Dumnezeu? Ce spune textul biblic în locul ei?",
      prayer:
        "Dumnezeule veșnic, smerește-mi mintea și fă-mă atent la ce ai descoperit despre Tine. Păzește-mă să nu Te modelez după chipul meu.",
    },
    {
      id: "atribute_l2",
      title: "El știe tot și mă cunoaște",
      refs: ["Psalmul 139:1-6", "Psalmul 147:5", "Romani 11:33-34"],
      memoryRef: "Psalmul 139:1",
      memoryText: "Doamne, Tu mă cercetezi de aproape și mă cunoști.",
      hook: [
        "Poți ascunde o faptă de oameni, poți ascunde un motiv chiar de tine, dar nimic nu este opac înaintea lui Dumnezeu.",
        "Atotștiința Lui nu este supravegherea rece a unui străin. Este cunoașterea deplină a Creatorului care vede adevărul și nu poate fi manipulat.",
      ],
      choicePrompt: "Cum reacționezi la faptul că Dumnezeu te cunoaște deplin?",
      branches: [
        {
          label: "Mă sperie ce vede în mine.",
          response:
            "Frica nu se rezolvă ascunzând. Adu păcatul în lumină și vino la Hristos, unde dreptatea nu este negată, iar păcătosul pocăit primește curățire.",
        },
        {
          label: "Mă liniștește că nu trebuie să mă explic perfect.",
          response:
            "El cunoaște suspinul, motivul și limita cuvintelor tale. Aceasta nu înlocuiește adevărul spus oamenilor, dar te eliberează de spectacol înaintea Lui.",
        },
        {
          label: "Încerc să păstrez o zonă numai pentru mine.",
          response:
            "Zona aceea nu este ascunsă de Dumnezeu. Întrebarea este dacă o vei deschide voluntar înaintea Lui sau o vei lăsa să te conducă din întuneric.",
        },
      ],
      scriptureRef: "Psalmul 139:3-4",
      scriptureText:
        "Tu îmi cercetezi cărarea și culcușul și cunoști toate căile mele; înainte să-mi ajungă cuvântul pe limbă, Tu îl cunoști în totul.",
      truth: [
        "Dumnezeu cunoaște toate lucrurile deodată, fără să învețe, să ghicească sau să descopere târziu.",
        "Cunoașterea Lui expune ipocrizia și, pentru cel care vine la Hristos, oferă și odihna de a fi cunoscut fără mască.",
      ],
      quiz: {
        question: "Care răspuns este potrivit atotștiinței lui Dumnezeu?",
        correct: "Adevăr, pocăință și încredere, nu ascundere.",
        wrong: [
          "Fatalism: alegerile mele nu mai contează.",
          "Spectacol religios ca să-I schimb impresia despre mine.",
        ],
        explanation:
          "Faptul că El știe nu anulează responsabilitatea; înlătură posibilitatea de a negocia realitatea prin imagine.",
      },
      multiChoice: {
        prompt: "Ce cunoaște Dumnezeu despre tine?",
        options: [
          "Faptele văzute.",
          "Motivele ascunse.",
          "Cuvintele încă nerostite.",
          "Numai lucrurile pe care I le spui în rugăciune.",
        ],
      },
      action:
        "Roagă-te cu Psalmul 139:23-24 și numește un lucru pe care ai încercat să-l ții în afara luminii.",
      journal:
        "Ce ai face diferit astăzi dacă ai trăi conștient că Dumnezeu vede și motivul, nu doar rezultatul?",
      prayer:
        "Doamne, Tu mă cunoști întreg. Cercetează-mă, arată-mi calea rea și condu-mă pe calea veșniciei.",
    },
    {
      id: "atribute_l3",
      title: "Neschimbător în caracter, viu în relație",
      refs: ["Maleahi 3:6", "Iacov 1:17", "Ieremia 18:7-10", "Numeri 23:19"],
      memoryRef: "Iacov 1:17",
      memoryText: "La Tatăl luminilor nu este nici schimbare, nici umbră de mutare.",
      hook: [
        "Biblia spune că Dumnezeu nu Se schimbă și tot Biblia Îl arată răspunzând la pocăință, mijlocire și răzvrătire.",
        "Contradicția apare doar dacă neschimbarea înseamnă pentru noi că Dumnezeu este inert. El este statornic în ființă, caracter și promisiune, nu absent din relație.",
      ],
      choicePrompt: "Ce confuzie ai despre neschimbarea lui Dumnezeu?",
      branches: [
        {
          label: "Dacă nu Se schimbă, rugăciunea pare inutilă.",
          response:
            "Dumnezeu a rânduit rugăciunea ca mijloc real prin care lucrează. Răspunsul Lui la rugăciune exprimă caracterul Lui statornic, nu o instabilitate descoperită târziu.",
        },
        {
          label: "Textele unde «Se căiește» par să nege totul.",
          response:
            "Ele descriu schimbarea lucrării Lui față de oameni când oamenii se schimbă, potrivit avertismentelor și promisiunilor deja date.",
        },
        {
          label: "Am nevoie să știu că promisiunile Lui țin.",
          response:
            "Statornicia Lui este temelia încrederii: nu devine mincinos, nedrept sau capricios și nu uită legământul Său.",
        },
      ],
      scriptureRef: "Maleahi 3:6",
      scriptureText: "Eu sunt Domnul, Eu nu Mă schimb.",
      truth: [
        "Dumnezeu nu se maturizează, nu se degradează și nu-Și corectează caracterul. El este desăvârșit.",
        "Același caracter sfânt răspunde diferit pocăinței și împietririi. Relația este reală, iar Dumnezeu rămâne credincios Lui Însuși.",
      ],
      quiz: {
        question: "Ce rămâne neschimbat în Dumnezeu?",
        correct: "Ființa, caracterul, adevărul și scopurile Lui.",
        wrong: [
          "Orice acțiune față de om, indiferent de pocăință.",
          "Doar dispoziția Lui dintr-un anumit moment.",
        ],
        explanation:
          "Imutabilitatea nu Îl transformă într-o forță inertă; garantează că lucrează mereu potrivit caracterului Său.",
      },
      multiChoice: {
        prompt: "Ce îți oferă statornicia lui Dumnezeu?",
        options: [
          "Încredere în promisiunile Lui.",
          "Motiv să iei avertismentele în serios.",
          "Libertatea de a-I atribui orice contradicție.",
          "Temelie pentru rugăciune.",
        ],
      },
      action:
        "Alege o promisiune biblică adresată credincioșilor și notează contextul, condiția și ce garantează caracterul lui Dumnezeu.",
      journal:
        "Unde ai confundat statornicia lui Dumnezeu cu obligația Lui de a confirma planul tău?",
      prayer:
        "Tată statornic, așază-mi încrederea în caracterul și promisiunile Tale, nu în presupunerile mele despre cum trebuie să lucrezi.",
    },
    {
      id: "atribute_l4",
      title: "Suveranitatea și rugăciunea",
      refs: ["Psalmul 115:3", "Matei 6:9-10", "Iacov 4:2-3", "1 Ioan 5:14"],
      memoryRef: "1 Ioan 5:14",
      memoryText: "Dacă cerem ceva după voia Lui, ne ascultă.",
      hook: [
        "Unii se roagă ca și cum Dumnezeu trebuie convins să devină bun. Alții nu se mai roagă fiindcă El este suveran.",
        "Iisus nu a pus suveranitatea și cererea în conflict. Ne-a învățat să cerem îndrăzneț și să dorim mai întâi Numele, Împărăția și voia Tatălui.",
      ],
      choicePrompt: "Ce se întâmplă cel mai des în rugăciunea ta?",
      branches: [
        {
          label: "Încerc să-L determin să facă planul meu.",
          response:
            "Spune cererea clar, apoi supune planul tău voii și înțelepciunii Lui. Credința nu este tehnica prin care voința ta devine suverană.",
        },
        {
          label: "Renunț să cer fiindcă El știe deja.",
          response:
            "El știe și totuși poruncește rugăciunea. Cererea te așază în dependență și este unul dintre mijloacele prin care Dumnezeu a ales să lucreze.",
        },
        {
          label: "Cer, dar vreau să învăț supunerea.",
          response:
            "Urmează ordinea lui Iisus: Tatăl, Numele, Împărăția, voia, apoi pâinea, iertarea și protecția de rău.",
        },
      ],
      scriptureRef: "Matei 6:9-10",
      scriptureText:
        "Tatăl nostru care ești în ceruri, sfințească-se Numele Tău; vie Împărăția Ta; facă-se voia Ta.",
      truth: [
        "Rugăciunea nu informează un Dumnezeu ignorant și nu manipulează un Dumnezeu reticent.",
        "Dumnezeul suveran poruncește cererea, răspunde potrivit voii Lui și ne schimbă în timp ce ne rugăm.",
      ],
      quiz: {
        question: "Cum se roagă credința biblică?",
        correct: "Cere concret și se supune voii bune a Tatălui.",
        wrong: [
          "Declară rezultatul pe care Dumnezeu este obligat să-l producă.",
          "Nu mai cere nimic, pentru că Dumnezeu știe.",
        ],
        explanation:
          "Iisus unește cererea îndrăzneață cu supunerea reală, nu cu resemnarea sau controlul.",
      },
      multiChoice: {
        prompt: "Ce trebuie să conțină rugăciunea matură?",
        options: [
          "Adorarea Tatălui.",
          "Cererea sinceră.",
          "Supunerea voii Lui.",
          "Garanția că primesc exact scenariul meu.",
        ],
      },
      action:
        "Rescrie o cerere actuală în trei propoziții: ce dorești, de ce o dorești și cum o supui voii lui Dumnezeu.",
      journal:
        "Ce rezultat ai transformat într-o condiție pentru a mai avea încredere în Dumnezeu?",
      prayer:
        "Tată, Îți spun ce doresc fără mască. Sfințească-se Numele Tău și facă-se voia Ta în mine și în această situație.",
    },
    {
      id: "atribute_l5",
      title: "Dumnezeu nu are nevoie de noi",
      refs: ["Exodul 3:13-15", "Faptele 17:24-25", "Ioan 5:26"],
      memoryRef: "Faptele 17:25",
      memoryText: "El dă tuturor viața, suflarea și toate lucrurile.",
      hook: [
        "Dumnezeu nu ne-a creat fiindcă era singur, incomplet sau avea nevoie de muncitori. Tatăl, Fiul și Duhul au viață și dragoste deplină din veșnicie.",
        "Noi nu completăm lipsa Lui. Existența, slujirea și fiecare respirație a noastră sunt primite de la El.",
      ],
      choicePrompt: "Ce idee te conduce când Îi slujești?",
      branches: [
        {
          label: "Dacă nu fac eu, lucrarea Lui se prăbușește.",
          response:
            "Responsabilitatea ta este reală, dar nu ești salvatorul Împărăției. Ascultă, odihnește-te și lasă rezultatul în mâna Celui care nu depinde de tine.",
        },
        {
          label: "Încerc să-I plătesc bunătatea.",
          response:
            "Nu poți transforma harul în datorie inversă. Ascultarea este răspunsul recunoscător al celui care a primit, nu salariul oferit lui Dumnezeu.",
        },
        {
          label: "Mă bucur că viața mea este dar.",
          response:
            "Atunci folosește darul fără mândrie și fără risipă. Dependența de Dumnezeu nu te face inutil, ci te așază corect în slujire.",
        },
      ],
      scriptureRef: "Faptele 17:24-25",
      scriptureText:
        "Dumnezeu nu este slujit de mâini omenești ca și cum ar avea trebuință de ceva, El care dă tuturor viața și suflarea.",
      truth: [
        "Dumnezeu are viața în Sine. Nu este produs, susținut sau îmbunătățit de creație.",
        "El ne implică în lucrare din har și pentru binele nostru, nu pentru că altfel ar rămâne neputincios.",
      ],
      quiz: {
        question: "De ce Îi slujim lui Dumnezeu?",
        correct: "Ca răspuns la har, în dependență și ascultare.",
        wrong: [
          "Pentru a-I completa lipsurile.",
          "Pentru a-L face dator față de noi.",
        ],
        explanation:
          "Cel care dă viață nu primește existență de la slujirea noastră. Slujirea este privilegiu, nu alimentarea unei nevoi divine.",
      },
      multiChoice: {
        prompt: "Ce primești continuu de la Dumnezeu?",
        options: [
          "Viață și suflare.",
          "Daruri pentru slujire.",
          "Orice lucru bun.",
          "Dreptul de a-I cere socoteală ca unui datornic.",
        ],
      },
      action:
        "Oprește pentru o zi o activitate prin care încerci să dovedești că ești indispensabil. Folosește timpul pentru închinare și odihnă responsabilă.",
      journal:
        "În ce domeniu ai confundat chemarea cu ideea că totul depinde de tine?",
      prayer:
        "Dumnezeule care ai viața în Tine, Îți mulțumesc că primesc totul din mâna Ta. Fă-mă credincios fără mândria indispensabilității.",
    },
    {
      id: "atribute_l6",
      title: "Sfânt, drept și iubitor",
      refs: ["Isaia 6:1-5", "Psalmul 89:14", "Romani 3:23-26", "1 Ioan 4:9-10"],
      memoryRef: "Psalmul 89:14",
      memoryText: "Dreptatea și judecata sunt temelia scaunului Tău de domnie.",
      hook: [
        "Dacă alegi dragostea lui Dumnezeu împotriva dreptății Lui, ai pierdut dragostea sfântă. Dacă alegi dreptatea împotriva milei, ai pierdut crucea.",
        "În Dumnezeu nu există trăsături care se ceartă. La cruce, păcatul este condamnat, dreptatea arătată și iubirea oferită păcătosului.",
      ],
      choicePrompt: "Ce adevăr despre Dumnezeu îți este cel mai greu să ții împreună cu celelalte?",
      branches: [
        {
          label: "Iubirea Lui cu judecata păcatului.",
          response:
            "Iubirea nu numește răul bine. Dumnezeu Își arată iubirea purtând în Hristos costul real al împăcării, nu ignorând vina.",
        },
        {
          label: "Sfințenia Lui cu apropierea de păcătoși.",
          response:
            "Cel Sfânt nu se contaminează când Se apropie. El expune, curăță și cheamă la pocăință; apropierea Lui nu aprobă păcatul.",
        },
        {
          label: "Dreptatea Lui cu iertarea mea.",
          response:
            "Iertarea nu declară vina imaginară. Hristos a purtat judecata, astfel încât Dumnezeu rămâne drept când îl socotește drept pe cel ce crede.",
        },
      ],
      scriptureRef: "Romani 3:25-26",
      scriptureText:
        "Dumnezeu L-a rânduit pe Hristos ca jertfă, ca să-Și arate dreptatea și să fie drept și să-l socotească drept pe cel ce crede în Iisus.",
      truth: [
        "Sfințenia înseamnă că Dumnezeu este cu totul separat de rău și vrednic de închinare.",
        "Dreptatea și iubirea Lui se întâlnesc în Hristos. Harul nu Îl face mai puțin drept, iar judecata nu Îl face lipsit de iubire.",
      ],
      quiz: {
        question: "Ce arată crucea despre Dumnezeu?",
        correct: "Că este sfânt, drept și iubitor fără să minimalizeze păcatul.",
        wrong: [
          "Că dreptatea a fost anulată de iubire.",
          "Că iubirea este oferită numai celor fără vină.",
        ],
        explanation:
          "Crucea nu rezolvă o contradicție din Dumnezeu, ci descoperă unitatea caracterului Său în mântuire.",
      },
      multiChoice: {
        prompt: "Ce răspuns cere caracterul lui Dumnezeu?",
        options: [
          "Închinare.",
          "Pocăință.",
          "Încredere în Hristos.",
          "Alegerea atributului care îmi convine.",
        ],
      },
      action:
        "Explică Evanghelia în patru propoziții folosind aceste cuvinte: sfințenie, păcat, dreptate, iubire.",
      journal:
        "Ce trăsătură a lui Dumnezeu ai folosit ca să o reduci la tăcere pe alta? Cum te corectează crucea?",
      prayer:
        "Dumnezeule sfânt, drept și iubitor, mă închin înaintea Ta și mă încred în lucrarea deplină a lui Hristos.",
      declaration:
        "Completează: «Nu-L voi modela pe Dumnezeu după preferințele mele. Aleg să primesc din Scriptură că El este ___, ___ și ___.»",
    },
  ],
)

export const RELIGIE_SAU_INIMA_SCHIMBATA_LESSONS = courseLessons(
  "formare_religie_inima",
  [
    {
      id: "religie_inima_l1",
      title: "Masca religioasă",
      refs: ["Matei 23:25-28", "Luca 18:9-14", "1 Samuel 16:7"],
      memoryRef: "1 Samuel 16:7",
      memoryText: "Omul se uită la ceea ce izbește ochii, dar Domnul Se uită la inimă.",
      hook: [
        "Poți vorbi corect, poți apăra doctrina și poți fi admirat în biserică, în timp ce ascunzi mândrie, nedreptate sau lipsă de milă.",
        "Iisus nu a condamnat ascultarea vizibilă. A condamnat folosirea ei ca mască pentru o inimă care refuză adevărul.",
      ],
      choicePrompt: "Unde apare cel mai ușor masca religioasă?",
      branches: [
        {
          label: "Îmi compar viața cu oamenii pe care îi disprețuiesc.",
          response:
            "Comparația îți poate produce superioritate fără sfințenie. Stai înaintea standardului lui Dumnezeu și cere milă, ca vameșul.",
        },
        {
          label: "Ascund ce este înăuntru prin activitate.",
          response:
            "Slujirea nu spală automat motivul. Oprește spectacolul suficient cât să numești ce protejezi prin el.",
        },
        {
          label: "Mi-e teamă că toată credința mea este falsă.",
          response:
            "Nu te diagnostica prin panică. Vino la lumină: recunoaște păcatul, privește la Hristos și caută rodul pocăinței în timp.",
        },
      ],
      scriptureRef: "Luca 18:13-14",
      scriptureText:
        "Vameșul zicea: «Dumnezeule, ai milă de mine, păcătosul!» Iisus a spus că omul acesta s-a întors socotit drept.",
      truth: [
        "Ipocrizia nu este simpla nepotrivire a unui credincios care încă se luptă. Este protejarea deliberată a imaginii în timp ce refuzi adevărul.",
        "Leacul nu este renunțarea la ascultare, ci venirea fără mască la Dumnezeu și umblarea în lumină.",
      ],
      quiz: {
        question: "Ce a condamnat Iisus la farisei?",
        correct: "Exteriorul religios folosit pentru a ascunde mândria și necurăția.",
        wrong: [
          "Orice disciplină sau ascultare vizibilă.",
          "Cunoașterea atentă a Scripturii în sine.",
        ],
        explanation:
          "Problema nu era seriozitatea față de porunci, ci ruptura dintre imagine, inimă și dreptatea cerută de Dumnezeu.",
      },
      multiChoice: {
        prompt: "Ce poate întreține masca?",
        options: [
          "Comparația cu alții.",
          "Teama de a pierde imaginea.",
          "Mărturisirea concretă.",
          "Activitatea fără cercetarea inimii.",
        ],
      },
      action:
        "Spune unui credincios matur un adevăr concret pe care l-ai ascuns în spatele unei imagini bune.",
      journal:
        "Ce vrei să creadă oamenii despre tine și ce adevăr ți-e teamă că ar contrazice imaginea?",
      prayer:
        "Doamne, scoate la lumină ce am acoperit prin imagine. Dă-mi pocăință sinceră și o viață întreagă înaintea Ta.",
    },
    {
      id: "religie_inima_l2",
      title: "Nicodim și nașterea din nou",
      refs: ["Ioan 3:1-16", "Ezechiel 36:25-27", "Tit 3:4-7"],
      memoryRef: "Ioan 3:3",
      memoryText: "Dacă un om nu se naște din nou, nu poate vedea Împărăția lui Dumnezeu.",
      hook: [
        "Nicodim avea educație biblică, moralitate și poziție religioasă. Iisus nu i-a spus să adauge încă o practică, ci că are nevoie de viață nouă.",
        "Creștinismul nu este lustruirea omului vechi până pare acceptabil. Duhul dă o inimă nouă celui care privește prin credință la Fiul.",
      ],
      choicePrompt: "Pe ce ai fost tentat să-ți sprijini apartenența la Dumnezeu?",
      branches: [
        {
          label: "Pe familia și mediul în care m-am născut.",
          response:
            "Moștenirea poate fi un dar, dar nu produce nașterea din nou. Evanghelia te cheamă personal la pocăință și credință.",
        },
        {
          label: "Pe cunoașterea și moralitatea mea.",
          response:
            "Nicodim le avea și tot avea nevoie de viață de sus. Cunoașterea trebuie să te ducă la Hristos, nu să devină certificatul tău de viață.",
        },
        {
          label: "Nu știu dacă am fost născut din nou.",
          response:
            "Nu căuta o emoție perfectă. Întreabă dacă te încrezi în Hristos, vii la lumină și dacă Duhul produce în timp pocăință și rod.",
        },
      ],
      scriptureRef: "Ioan 3:5-6",
      scriptureText:
        "Dacă nu se naște cineva din apă și din Duh, nu poate să intre în Împărăția lui Dumnezeu. Ce este născut din Duh este duh.",
      truth: [
        "Nașterea din nou este lucrarea lui Dumnezeu, nu autosugestie, tradiție de familie sau îmbunătățire morală.",
        "Viața nouă se primește prin credință în Hristos și se vede prin venirea la lumină și rodul Duhului.",
      ],
      quiz: {
        question: "De ce avea Nicodim nevoie de naștere din nou?",
        correct: "Pentru că religia și moralitatea nu pot da viață spirituală.",
        wrong: [
          "Pentru că nu știa deloc Scriptura.",
          "Pentru că trebuia doar să-și schimbe grupul religios.",
        ],
        explanation:
          "Iisus a confruntat temelia încrederii lui, nu doar lipsa unei informații sau practici.",
      },
      multiChoice: {
        prompt: "Ce însoțește viața nouă?",
        options: [
          "Credința în Fiul.",
          "Venirea la lumină.",
          "Rodul Duhului.",
          "Perfecțiunea instantanee.",
        ],
      },
      action:
        "Citește Ioan 3:1-21 și notează ce face Dumnezeu, ce primește omul și ce dovedește venirea la lumină.",
      journal:
        "Dacă ai scoate familia, eticheta și realizările tale, pe ce se sprijină speranța ta înaintea lui Dumnezeu?",
      prayer:
        "Duhule Sfânt, nu mă lăsa să mă odihnesc într-o etichetă. Du-mă la Fiul și fă vizibilă viața nouă prin adevăr și rod.",
    },
    {
      id: "religie_inima_l3",
      title: "Semnul exterior și inima tăiată împrejur",
      refs: [
        "Deuteronomul 10:12-16",
        "Deuteronomul 30:6",
        "Ieremia 4:4",
        "Romani 2:28-29",
        "Coloseni 2:11-12",
      ],
      memoryRef: "Romani 2:29",
      memoryText: "Tăierea împrejur este aceea a inimii, în duh, nu în slovă.",
      hook: [
        "Un semn poruncit de Dumnezeu poate deveni minciună dacă omul îl folosește ca înlocuitor pentru credință și ascultare.",
        "De la Deuteronom la Romani, Dumnezeu cere o inimă care Îl iubește, se smerește și nu se mai împotrivește adevărului.",
      ],
      choicePrompt: "Ce semn exterior ai putea folosi ca adăpost?",
      branches: [
        {
          label: "Botezul, fără o viață de pocăință.",
          response:
            "Botezul este important și poruncit, dar nu trebuie folosit ca scut împotriva chemării la credință vie și ascultare.",
        },
        {
          label: "Prezența la biserică și slujirea.",
          response:
            "Comunitatea și slujirea sunt daruri. Ele nu înlocuiesc dragostea de Dumnezeu, adevărul și lepădarea încăpățânării.",
        },
        {
          label: "Doctrina corectă, fără inimă smerită.",
          response:
            "Adevărul trebuie apărat, dar omul care îl folosește pentru mândrie contrazice prin caracter adevărul pe care îl rostește.",
        },
      ],
      scriptureRef: "Deuteronomul 10:16",
      scriptureText:
        "Să vă tăiați dar inima împrejur și să nu vă mai înțepeniți grumazul.",
      truth: [
        "Tema inimii schimbate nu este o invenție a Noului Testament. Dumnezeu a cerut mereu dragoste, credință și ascultare lăuntrică.",
        "Semnele legământului mărturisesc lucrarea lui Dumnezeu; nu ne dau voie să păstrăm răzvrătirea sub o etichetă religioasă.",
      ],
      quiz: {
        question: "Ce este «tăierea împrejur a inimii»?",
        correct:
          "Lucrarea lăuntrică prin care Dumnezeu înlătură împotrivirea și produce dragoste și ascultare.",
        wrong: [
          "O tehnică prin care împărțim sufletul în componente.",
          "Renunțarea la orice semn exterior poruncit de Dumnezeu.",
        ],
        explanation:
          "Imaginea vorbește despre îndepărtarea împietririi, nu despre o anatomie spirituală speculativă.",
      },
      multiChoice: {
        prompt: "Ce rod arată o inimă schimbată?",
        options: [
          "Dragoste pentru Dumnezeu.",
          "Smerenie și pocăință.",
          "Ascultare produsă de Duhul.",
          "Încredere exclusivă într-un ritual.",
        ],
      },
      action:
        "Alege un semn exterior bun pe care l-ai folosit ca să eviți o întrebare lăuntrică. Scrie ce ascultare concretă cere Dumnezeu acum.",
      journal:
        "Unde este imaginea ta religioasă mai puternică decât dragostea, adevărul și ascultarea reală?",
      prayer:
        "Doamne, taie împietrirea inimii mele. Nu mă lăsa să folosesc darurile și semnele Tale ca adăpost pentru neascultare.",
      declaration:
        "Completează: «Nu mă voi ascunde în spatele ___. Îi cer lui Dumnezeu o inimă care Îl iubește și Îl ascultă în ___.»",
    },
  ],
)

export const FORMARE_DUMNEZEU_ADEVAR_LESSONS: Lesson[] = [
  ...ATRIBUTELE_LUI_DUMNEZEU_LESSONS,
  ...RELIGIE_SAU_INIMA_SCHIMBATA_LESSONS,
]
