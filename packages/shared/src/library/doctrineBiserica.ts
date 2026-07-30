import type { Lesson } from "../domain.js"

/* Cine este Biserica lui Iisus? — lecțiile 1-3. */

export const bisericaL1: Lesson = {
  id: "biserica_l1", courseId: "doctrine_c3_biserica", order: 1,
  title: "Care credință este adevărată?", estMinutes: 11,
  anchorRefs: ["Ioan 14:6", "1 Corinteni 3:11"], memoryVerseRef: "1 Corinteni 3:11",
  steps: [
    { id: "bc1_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Un om spune că adevărul este aici. Altul spune că este dincolo. Amândoi deschid Biblia, amândoi se roagă și amândoi sunt convinși. Dacă toți spun altceva, cum alegi fără să transformi credința într-o loterie?" },
      { from: "guide", text: "Cursul acesta nu îți va da numele unei tabere. Dacă răspunsul ar fi doar o etichetă, Iisus ar fi spus: «găsește grupul corect». El a spus altceva." },
    ]},
    { id: "bc1_2", type: "scripture", order: 2, scripture: { text: "Eu sunt Calea, Adevărul și Viața. Nimeni nu vine la Tatăl decât prin Mine.", ref: "Ioan 14:6" }, bubbles: [
      { from: "guide", text: "Răspunsul creștin la «care credință?» începe cu o Persoană. Iisus nu spune doar că arată calea sau predă adevărul. Spune că El este Calea și Adevărul." },
    ]},
    { id: "bc1_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Punctul principal: temelia credinței nu este cât de veche, mare, impresionantă sau familiară este o comunitate. Temelia este Iisus — cine este, ce a făcut și dacă a înviat." },
      { from: "guide", text: "Asta mută întrebarea de la «sunt în tabăra bună?» la «Îl cunosc pe El și ceea ce primesc aici mă duce spre El?»." },
    ]},
    { id: "bc1_4", type: "scripture", order: 4, scripture: { text: "Căci nimeni nu poate pune o altă temelie decât cea care a fost pusă și care este Isus Hristos.", ref: "1 Corinteni 3:11" }, bubbles: [
      { from: "guide", text: "Pavel scrie unei comunități împărțite în grupuri după liderii preferați. Răspunsul lui nu este să aleagă grupul câștigător, ci să îi ducă pe toți înapoi la aceeași temelie." },
    ]},
    { id: "bc1_5", type: "world_vs_truth", order: 5, bubbles: [
      { from: "guide", text: "Citirea greșită: «toate drumurile spun același lucru». Nu spun. Afirmațiile despre Dumnezeu, Iisus, păcat, har și înviere se pot contrazice real." },
      { from: "guide", text: "Cealaltă citire greșită: «grupul meu deține adevărul, deci tot ce spune grupul meu este adevărat». Nicio comunitate nu devine temelia. Și comunitățile trebuie cercetate în lumina lui Iisus și a Scripturii." },
    ]},
    { id: "bc1_6", type: "choice", order: 6, choice: { prompt: "După ce ai judecat până acum dacă un loc este adevărat?", options: [
      { id: "bc1a", label: "După tradiția în care am crescut." },
      { id: "bc1b", label: "După omul care vorbește cel mai convingător." },
      { id: "bc1c", label: "După cât de clar mă duce la Iisus și la Scriptură." },
    ]}},
    { id: "bc1_7", type: "how_god_helps", order: 7, bubbles: [
      { from: "guide", text: "Patru întrebări sunt mai folositoare decât eticheta: cine este Iisus aici? Este harul primit sau câștigat? Poate Scriptura să corecteze liderul? Produce viața comunității dragoste, adevăr și pocăință — inclusiv în cei care conduc?" },
      { from: "guide", text: "Un răspuns frumos la primele trei nu acoperă lipsa roadei. Iisus a spus că pomul se cunoaște după rod, nu după numele scris pe poartă." },
    ]},
    { id: "bc1_8", type: "quiz", order: 8, quiz: { question: "Care este temelia Bisericii, după 1 Corinteni 3:11?", options: [
      { text: "O listă perfectă de reguli", correct: false }, { text: "O instituție fără greșeli", correct: false }, { text: "Iisus Hristos", correct: true },
    ], explanation: "Oamenii, structurile și tradițiile pot sluji temelia, dar nu o pot înlocui." }},
    { id: "bc1_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: această lecție nu îți spune care comunitate locală este sănătoasă și nu poate evalua de la distanță toate diferențele dintre creștini." },
      { from: "guide", text: "Există întrebări deschise pe care credincioși sinceri le înțeleg diferit. Ce nu este deschis în Emanus este temelia: Iisus, moartea și Învierea Lui, harul și autoritatea Scripturii." },
    ]},
    { id: "bc1_10", type: "step", order: 10, bubbles: [
      { from: "guide", text: "Ia o idee pe care ai primit-o doar prin «așa se face». Întreabă fără dispreț: unde mă duce spre Iisus și unde o văd în Scriptură?" },
    ]},
    { id: "bc1_11", type: "memory_verse", order: 11, scripture: { text: "Nimeni nu poate pune o altă temelie decât cea care a fost pusă și care este Isus Hristos.", ref: "1 Corinteni 3:11" } },
  ],
}

export const bisericaL2: Lesson = {
  id: "biserica_l2", courseId: "doctrine_c3_biserica", order: 2,
  title: "O clădire sau oamenii?", estMinutes: 10,
  anchorRefs: ["Matei 16:18", "1 Corinteni 12:12-14", "1 Petru 2:5"], memoryVerseRef: "1 Corinteni 12:27",
  steps: [
    { id: "bc2_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Spunem «mă duc la biserică» și arătăm spre o clădire. Noul Testament ar fi spus mai aproape de: «biserica se adună în locul acela»." },
      { from: "guide", text: "Clădirea poate fi frumoasă și folositoare. Dar Biserica poate exista fără clădire; clădirea nu poate fi Biserică fără oameni." },
    ]},
    { id: "bc2_2", type: "truth_simple", order: 2, bubbles: [
      { from: "guide", text: "Cuvântul grecesc «ekklesia» desemna o adunare de oameni. În Noul Testament poate numi comunitatea dintr-un oraș, oamenii adunați într-o casă sau întregul popor al lui Hristos." },
      { from: "guide", text: "Nu este o lecție împotriva clădirilor și programelor. Este o reașezare: ele sunt unelte pentru oameni, nu oamenii unelte pentru menținerea lor." },
    ]},
    { id: "bc2_3", type: "scripture", order: 3, scripture: { text: "Și voi, ca niște pietre vii, sunteți zidiți ca să fiți o casă duhovnicească.", ref: "1 Petru 2:5" }, bubbles: [
      { from: "guide", text: "Textul nu spune că oamenii intră într-o clădire sfântă. Spune că oamenii sunt pietrele vii din care Dumnezeu zidește casa." },
    ]},
    { id: "bc2_4", type: "truth_simple", order: 4, bubbles: [
      { from: "guide", text: "A doua imagine este trupul. Un singur Duh, multe mădulare, funcții diferite. Nicio parte nu este întregul și nicio parte nu poate spune alteia «n-am nevoie de tine»." },
      { from: "guide", text: "Asta înseamnă că prezența într-o sală nu produce automat apartenență. Poți sta ani pe același scaun și nimeni să nu știe când cazi." },
    ]},
    { id: "bc2_5", type: "scripture", order: 5, scripture: { text: "Voi sunteți trupul lui Hristos și fiecare, în parte, mădularele lui.", ref: "1 Corinteni 12:27" } },
    { id: "bc2_6", type: "world_vs_truth", order: 6, bubbles: [
      { from: "guide", text: "Citirea greșită: «dacă am fost prezent la program, mi-am făcut partea». Noul Testament descrie cunoaștere, purtarea poverilor, masa, rugăciunea, corectarea și slujirea reciprocă." },
      { from: "guide", text: "Cealaltă extremă: «dacă instituțiile au probleme, eu sunt Biserica de unul singur». O piatră este vie, dar o singură piatră nu este casa; un mădular singur nu este trupul." },
    ]},
    { id: "bc2_7", type: "choice", order: 7, choice: { prompt: "Cum arată acum legătura ta cu alți credincioși?", options: [
      { id: "bc2a", label: "Sunt prezent, dar aproape nimeni nu mă cunoaște." },
      { id: "bc2b", label: "Am câțiva oameni cu care pot fi sincer." },
      { id: "bc2c", label: "Nu sunt legat de nicio comunitate." },
    ]}},
    { id: "bc2_8", type: "step", order: 8, bubbles: [
      { from: "guide", text: "Nu încerca să devii apropiat de toată adunarea. Identifică o singură relație în care poți trece de la «ce mai faci?» la o propoziție adevărată despre tine." },
    ]},
    { id: "bc2_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: Noul Testament nu oferă un singur model administrativ obligatoriu pentru toate locurile și toate secolele. Creștinii înțeleg diferit structura, conducerea și formele adunării." },
      { from: "guide", text: "Ce rămâne comun este că Biserica este a lui Iisus, alcătuită din oameni și chemată la viață împreună — nu redusă la clădire, calendar sau spectacol." },
    ]},
    { id: "bc2_10", type: "memory_verse", order: 10, scripture: { text: "Voi sunteți trupul lui Hristos și fiecare, în parte, mădularele lui.", ref: "1 Corinteni 12:27" } },
  ],
}

export const bisericaL3: Lesson = {
  id: "biserica_l3", courseId: "doctrine_c3_biserica", order: 3,
  title: "De ce sunt atât de multe tabere?", estMinutes: 11,
  anchorRefs: ["Efeseni 4:1-6", "1 Corinteni 1:10-13"], memoryVerseRef: "Efeseni 4:4-6",
  steps: [
    { id: "bc3_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Dacă Duhul este unul și Biblia este una, de ce există atâtea comunități care se separă, se contrazic și uneori se tratează ca dușmani?" },
      { from: "guide", text: "Întrebarea nu este rea. Dezbinarea creștinilor a făcut rău mărturiei lor, iar Iisus S-a rugat pentru unitate tocmai fiindcă știa cât va conta." },
    ]},
    { id: "bc3_2", type: "truth_simple", order: 2, bubbles: [
      { from: "guide", text: "Separările au venit din mai multe surse: limbi și culturi diferite, distanță geografică, politică, întrebări despre autoritate, reacții la abuzuri, diferențe doctrinare și, uneori, orgoliu omenesc." },
      { from: "guide", text: "Nu există o singură poveste care explică toate despărțirile și nici o singură parte vinovată pentru toate." },
    ]},
    { id: "bc3_3", type: "scripture", order: 3, scripture: { text: "Este un singur trup, un singur Duh... este un singur Domn, o singură credință, un singur botez. Este un singur Dumnezeu și Tată al tuturor.", ref: "Efeseni 4:4-6" }, bubbles: [
      { from: "guide", text: "Pavel nu scrie asta unor oameni identici. Scrie comunităților care trebuiau să păstreze unitatea în mijlocul diferențelor reale." },
    ]},
    { id: "bc3_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Citirea greșită: «dacă există diviziuni, totul trebuie să fie fals». Dezacordul arată că oamenii pot greși și se pot răni; nu decide singur dacă Iisus a înviat." },
      { from: "guide", text: "Cealaltă greșeală: «unitate înseamnă să nu mai discutăm adevărul». Pavel cere și unitate, și maturitate doctrinară. Pacea cumpărată prin tăcerea victimei sau ascunderea minciunii nu este unitate." },
    ]},
    { id: "bc3_5", type: "truth_simple", order: 5, bubbles: [
      { from: "guide", text: "Nu toate diferențele au aceeași greutate. Unele ating temelia: cine este Iisus, Învierea, harul, Scriptura. Altele sunt teme pe care credincioși care țin aceeași temelie le înțeleg diferit." },
      { from: "guide", text: "Maturitatea nu înseamnă că diferențele dispar. Înseamnă să nu transformi fiecare diferență într-un alt Iisus și nici fiecare acord într-o scuză pentru a ignora răul." },
    ]},
    { id: "bc3_6", type: "choice", order: 6, choice: { prompt: "Ce produce în tine existența atâtor tabere?", options: [
      { id: "bc3a", label: "Confuzie: nu mai știu pe cine să cred." },
      { id: "bc3b", label: "Superioritate: simt că grupul meu este singurul sigur." },
      { id: "bc3c", label: "Oboseală: nu mai vreau să aud discuțiile acestea." },
    ]}},
    { id: "bc3_7", type: "how_god_helps", order: 7, bubbles: [
      { from: "guide", text: "Când auzi o diferență, întreabă mai întâi: atinge temelia sau forma? Apoi formulează poziția celuilalt în așa fel încât persoana să spună «da, asta cred». Abia după aceea răspunde." },
      { from: "guide", text: "Poți avea convingeri fără dispreț. Poți spune «cred că textul înseamnă asta» fără să spui «oricine nu vede ca mine nu este al lui Iisus»." },
    ]},
    { id: "bc3_8", type: "quiz", order: 8, quiz: { question: "Ce fel de unitate cere Efeseni 4?", options: [
      { text: "Toți să aibă aceeași cultură și toate aceleași opinii", correct: false },
      { text: "Unitatea unui singur trup, Duh, Domn și Tată", correct: true },
      { text: "Să nu mai fie discutată nicio diferență", correct: false },
    ], explanation: "Unitatea este ancorată în Dumnezeu și în Evanghelie, nu în uniformitatea tuturor formelor și opiniilor." }},
    { id: "bc3_9", type: "how_god_helps", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: această lecție comprimă două mii de ani de istorie și nu poate explica fiecare separare. Unele diferențe sunt profunde și nu se rezolvă printr-un apel vag la iubire." },
      { from: "guide", text: "Emanus nu decide pentru tine temele deschise și nu numește o tabără câștigătoare. Te cheamă să păstrezi temelia, să cercetezi cinstit și să refuzi disprețul." },
    ]},
    { id: "bc3_10", type: "step", order: 10, bubbles: [
      { from: "guide", text: "Alege o poziție creștină cu care nu ești de acord și scrie-o într-o propoziție pe care celălalt ar recunoaște-o drept corectă. Fără răspunsul tău încă." },
    ]},
    { id: "bc3_11", type: "memory_verse", order: 11, scripture: { text: "Este un singur trup, un singur Duh... un singur Domn, o singură credință.", ref: "Efeseni 4:4-5" } },
  ],
}

export const DOCTRINE_BISERICA_PART_A: Lesson[] = [bisericaL1, bisericaL2, bisericaL3]
