import type { Lesson } from "../domain.js"

/**
 * Cursul "Vrăjitoria: reală, dar nu suverană".
 *
 * Omul-țintă nu este vrăjitorul. Este omul căruia i s-a spus că «i s-a făcut»
 * și care trăiește de ani de zile cu frica aceea în casă.
 *
 * Testul de ton al fiecărei lecții: dacă un om speriat citește asta singur,
 * noaptea, trebuie să se teamă mai puțin de întuneric și mai mult de a rămâne
 * fără Hristos. Frica nu scoate pe nimeni din magie — frica e chiar motorul ei.
 *
 * Reguli (docs/14-carta-doctrinara.md, doctrineHar.ts):
 * - Păcatul se numește pe nume, judecata se anunță, iadul nu se ocolește,
 *   iar chemarea la pocăință este în fiecare lecție.
 * - Nu se pune diagnostic pe suferința niciunui om (Iov 42:7, Ioan 9:2-3,
 *   Luca 13:1-5). Nu se spune nimănui de ce a murit cineva sau de ce e bolnav.
 * - Nu se importă pedepsele civile ale lui Israel ca instrucțiuni pentru azi.
 *   Levitic 20:27 este lege civilă teocratică. În Noul Testament, Pavel o
 *   eliberează pe roabă (Faptele 16), efesenii își ard propriile cărți
 *   (Faptele 19), iar Cel care a dat Legea n-a aruncat piatra (Ioan 8).
 * - Nu se numește nicio confesiune și nu se spune nimănui să plece de unde este.
 *
 * Documentare: Grace to You, transcriere integrală în română, RON-1354
 * ("Satan există — cine este el"). Materialul a fost folosit numai pentru
 * documentarea temelor. Lecțiile pot fi verificate integral din pasajele citate.
 */

const COURSE = "spiritual_c6_vrajitorie"

export const vrajL1: Lesson = {
  id: "vraj_l1", courseId: COURSE, order: 1,
  title: "Real, dar nu suveran", estMinutes: 13,
  anchorRefs: ["Exod 7:10-12", "Iov 1:12", "Coloseni 2:15"], memoryVerseRef: "Coloseni 2:15",
  steps: [
    { id: "vr1_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Despre vrăjitorie se spun de obicei două lucruri, și amândouă sunt greșite. Unul: «nu există, sunt povești». Celălalt: «există și îți poate face orice»." },
      { from: "guide", text: "Biblia nu spune nici una, nici alta. Spune ceva mult mai așezat, și tocmai de aceea mult mai liniștitor." },
    ]},
    { id: "vr1_2", type: "scripture", order: 2, scripture: { text: "Dar vrăjitorii Egiptului au făcut și ei la fel prin vrăjitoriile lor. Toiegele lor s-au prefăcut toate în șerpi. Dar toiagul lui Aaron a înghițit toiegele lor.", ref: "Exod 7:11-12" } },
    { id: "vr1_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Uită-te la text fără să-l îndulcești. Textul nu spune că vrăjitorii au făcut trucuri. Spune că au făcut. Ceva s-a întâmplat cu adevărat." },
      { from: "guide", text: "Și tot textul spune și capătul: toiagul lui Dumnezeu le-a înghițit pe ale lor. Real, da. Egal cu Dumnezeu, niciodată." },
    ]},
    { id: "vr1_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Aceeași liniște o vezi în cartea lui Iov. Nimic nu se atinge de Iov fără să treacă întâi printr-o îngăduință, și îngăduința are hotar. Vrăjmașul cere voie. Cine cere voie nu e stăpân." },
      { from: "guide", text: "Iar la cruce s-a terminat: «A dezbrăcat domniile și stăpânirile și le-a făcut de ocară înaintea lumii, după ce a ieșit biruitor asupra lor prin cruce.»" },
      { from: "guide", text: "Deci ai în față un vrăjmaș real, dar unul deja învins. Se zbate, dar nu domnește. Și nu peste tine, dacă ești al lui Hristos." },
    ]},
    { id: "vr1_5", type: "choice", order: 5, choice: { prompt: "De ce ai deschis lecția asta?", options: [
      { id: "vr1a", label: "Mi s-a spus că mi s-a făcut ceva și trăiesc cu frica asta.", branchStepId: "vr1_b_frica" },
      { id: "vr1b", label: "Am fost eu la cineva care face astfel de lucruri.", branchStepId: "vr1_b_amfost" },
      { id: "vr1c", label: "Nu știu ce să cred și vreau să înțeleg.", branchStepId: "vr1_b_intreb" },
    ]}},
    { id: "vr1_b_frica", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Nu-ți vom spune nici că e adevărat, nici că e în capul tău. Nu avem cum să știm, și nimeni prin ecran n-ar trebui să-ți pună un diagnostic spiritual." },
      { from: "guide", text: "Dar ceva știm sigur: cine ți-a spus asta ți-a lăsat frica în casă și te-a trimis mai departe. Nu așa lucrează Dumnezeu. Mergi mai departe în curs. Lecția a doua e scrisă exact pentru tine." },
    ]},
    { id: "vr1_b_amfost", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Atunci ai un lucru limpede de făcut, și el nu e complicat: recunoaște înaintea lui Dumnezeu că ai căutat putere în altă parte decât la El. Asta e păcat și se numește pe nume." },
      { from: "guide", text: "Și tot atât de limpede: se iartă. Nu peste zece pași, ci astăzi. Lecția a treia îți arată un om din Biblie care făcea exact asta." },
    ]},
    { id: "vr1_b_intreb", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Bine că întrebi înainte să ai nevoie. Reține deocamdată un singur lucru: nu măsurăm puterea întunericului, pentru că nu ne interesează. Ne uităm la Cel care a biruit." },
    ]},
    { id: "vr1_6", type: "quiz", order: 6, quiz: { question: "Ce arată Exod 7 despre vrăjitorii Egiptului?", options: [
      { text: "Că nu s-a întâmplat nimic real, era doar iluzie", correct: false },
      { text: "Că s-a întâmplat ceva real, dar puterea lui Dumnezeu a înghițit-o", correct: true },
      { text: "Că aveau aceeași putere ca Moise", correct: false },
    ], explanation: "Scriptura nu banalizează și nu exagerează. Recunoaște o putere reală și în același timp arată că e fără șanse înaintea lui Dumnezeu." }},
    { id: "vr1_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Scrie pe o hârtie, cu mâna ta: «Real, dar biruit la cruce.» Pune hârtia unde o vezi când te ia frica." },
    ]},
    { id: "vr1_8", type: "journal", order: 8, journalPrompt: "De ce anume ți-e frică, mai exact? Numește lucrul, nu senzația." },
    { id: "vr1_9", type: "truth_simple", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: cursul acesta nu-ți spune ce s-a întâmplat în viața ta și nu explică necazurile tale. Nu punem noi diagnostic. Îți arătăm doar unde e puterea și cui îți poți da viața." },
    ]},
    { id: "vr1_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Doamne Iisuse, Tu ai biruit la cruce. Nu mă uit la puterea întunericului, mă uit la Tine. Scoate-mi frica și pune-ți pacea în locul ei.»" },
    ]},
    { id: "vr1_11", type: "memory_verse", order: 11, scripture: { text: "A dezbrăcat domniile și stăpânirile și a ieșit biruitor asupra lor prin cruce.", ref: "Coloseni 2:15" } },
  ],
}

export const vrajL2: Lesson = {
  id: "vraj_l2", courseId: COURSE, order: 2,
  title: "Când ți se spune că ți s-a făcut", estMinutes: 14,
  anchorRefs: ["Numeri 23:23", "Proverbe 26:2", "Romani 8:38-39"], memoryVerseRef: "Numeri 23:23",
  steps: [
    { id: "vr2_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "E una dintre cele mai grele propoziții care i se pot spune unui om: «nu e de la tine, ți s-a făcut». După ea, totul capătă explicație. Boala, sărăcia, cearta din casă, copilul plecat." },
      { from: "guide", text: "Și, ciudat, propoziția asta pare că aduce ușurare. De fapt aduce lanț. Pentru că acum trăiești sub ceva ce nu vezi și nu poți opri." },
    ]},
    { id: "vr2_2", type: "scripture", order: 2, scripture: { text: "Descântecul nu poate face nimic împotriva lui Iacov, nici vrăjitoria împotriva lui Israel.", ref: "Numeri 23:23" } },
    { id: "vr2_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Ascultă unde se spune asta. Un împărat plătise un vrăjitor cu bani grei ca să blesteme un popor întreg. Omul a încercat de trei ori. Și de fiecare dată i-a ieșit binecuvântare din gură." },
      { from: "guide", text: "Nu pentru că poporul era bun. Nu era. Ci pentru că era al lui Dumnezeu. Blestemul plătit s-a lovit de Cineva și s-a întors." },
    ]},
    { id: "vr2_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Și Proverbele spun la fel, cu o imagine simplă: «cum sare vrabia încoace și încolo și cum zboară rândunica, așa nu nimerește blestemul neîntemeiat». Nu are unde să se așeze." },
      { from: "guide", text: "Deci întrebarea corectă nu e «mi s-a făcut sau nu?». Întrebarea e «al cui sunt?». Dacă ești al lui Hristos, Romani 8 spune că nici îngerii, nici stăpânirile, nici o altă făptură nu te pot despărți de dragostea Lui." },
    ]},
    { id: "vr2_5", type: "choice", order: 5, choice: { prompt: "Ce faci acum cu ce ți s-a spus?", options: [
      { id: "vr2a", label: "Caut mereu cine și de ce mi-a făcut.", branchStepId: "vr2_b_cauta" },
      { id: "vr2b", label: "Am fost la cineva care să «desfacă».", branchStepId: "vr2_b_desfacut" },
      { id: "vr2c", label: "Nu mai fac nimic, dar frica a rămas.", branchStepId: "vr2_b_ramas" },
    ]}},
    { id: "vr2_b_cauta", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Căutarea asta n-are capăt și o știi. Cu fiecare răspuns apare o întrebare nouă, iar la capătul ei stai bănuind oameni pe care ar trebui să-i iubești." },
      { from: "guide", text: "Oprește ancheta. Nu pentru că nu contează adevărul, ci pentru că el nu e la tine în mână — e la Dumnezeu. Iar El nu ți-a cerut să afli. Ți-a cerut să vii la El." },
    ]},
    { id: "vr2_b_desfacut", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Aici trebuie să fim cinstiți cu tine, chiar dacă doare: cel care «desface» lucrează cu aceeași putere ca cel care «face». Ai mers pentru scăpare și te-ai legat mai tare." },
      { from: "guide", text: "Nu te condamnăm. Erai speriat și căutai ajutor. Dar spune-I lui Dumnezeu pe nume ce ai făcut și cere iertare. Poarta pe care ai intrat se închide azi, prin pocăință, nu prin alt ritual." },
    ]},
    { id: "vr2_b_ramas", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Frica rămasă e normală și nu înseamnă că ești sub ceva. Un gând repetat ani de zile nu pleacă într-o zi." },
      { from: "guide", text: "Trateaz-o ca pe un gând, nu ca pe o dovadă. Când vine, răspunde-i cu voce tare cu Numeri 23:23 sau Romani 8:38. Nu discuța cu ea. Răspunde-i." },
    ]},
    { id: "vr2_6", type: "quiz", order: 6, quiz: { question: "De ce n-a putut Balaam să blesteme poporul?", options: [
      { text: "Pentru că poporul era fără păcat", correct: false },
      { text: "Pentru că poporul era al lui Dumnezeu, iar El nu a îngăduit", correct: true },
      { text: "Pentru că vrăjitoria nu există deloc", correct: false },
    ], explanation: "Protecția nu venea din meritul lor, ci din apartenență. De aceea întrebarea care contează nu e ce ți s-a făcut, ci al cui ești." }},
    { id: "vr2_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Astăzi, când îți vine gândul, spune cu voce tare o singură propoziție: «Sunt al lui Iisus Hristos și nimic nu mă desparte de El.» Repetă de câte ori e nevoie." },
    ]},
    { id: "vr2_8", type: "journal", order: 8, journalPrompt: "Cine ți-a spus că ți s-a făcut, când, și ce s-a schimbat în tine după ziua aceea?" },
    { id: "vr2_9", type: "truth_simple", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită: dacă ai o boală, un proces sau o problemă reală, lecția asta nu le rezolvă și nu-ți spune să le lași. Mergi la medic, la avocat, la cine trebuie. Credința nu înlocuiește ajutorul, îl însoțește." },
    ]},
    { id: "vr2_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Doamne, am trăit ani sub o vorbă spusă de un om. Astăzi o las jos. Tu ai spus că nimic nu mă desparte de dragostea Ta. Te cred. Ia-mi frica și fă-mă al Tău pe deplin.»" },
    ]},
    { id: "vr2_11", type: "memory_verse", order: 11, scripture: { text: "Descântecul nu poate face nimic împotriva lui Iacov, nici vrăjitoria împotriva lui Israel.", ref: "Numeri 23:23" } },
  ],
}

export const vrajL3: Lesson = {
  id: "vraj_l3", courseId: COURSE, order: 3,
  title: "Și pentru cel care a făcut, este iertare", estMinutes: 13,
  anchorRefs: ["Faptele 8:9-24", "1 Corinteni 6:9-11", "Apocalipsa 21:8"], memoryVerseRef: "1 Corinteni 6:11",
  steps: [
    { id: "vr3_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Până acum am vorbit despre cel căruia i s-a făcut. Acum vorbim despre cel care a făcut. Poate ai citit, ai descântat, ai dat mai departe ce ai primit de la o bunică, ai lucrat cu asta ani de zile." },
      { from: "guide", text: "Nu vom îndulci nimic. Și nici nu te vom lăsa fără ieșire." },
    ]},
    { id: "vr3_2", type: "scripture", order: 2, scripture: { text: "Cât despre fricoși, necredincioși, scârboși, ucigători, curvari, vrăjitori, închinătorii la idoli și toți mincinoșii, partea lor este în iazul care arde cu foc și cu pucioasă.", ref: "Apocalipsa 21:8" } },
    { id: "vr3_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Nu ocolim versetul ăsta și nu-l explicăm până nu mai înseamnă nimic. Vrăjitoria duce la pierzare veșnică. Asta e ce spune Scriptura și o spunem și noi, verde în față." },
      { from: "guide", text: "Dar citește încă o dată cu cine începe lista. Cu «fricoșii». Și în ea sunt și mincinoșii. Adică nimeni nu poate citi lista aceea cu superioritate. Nici cel care a făcut vrăji, nici cel care se teme de ele." },
    ]},
    { id: "vr3_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Acum uită-te la un om. Simon făcea vrăjitorii într-un oraș întreg și toți îl numeau «puterea cea mare». Când a auzit Evanghelia, a crezut și a fost botezat." },
      { from: "guide", text: "Mai târziu a greșit din nou — a vrut să cumpere darul lui Dumnezeu cu bani. Petru i-a spus fără menajamente că fierea amărăciunii e în el. Și imediat după: «pocăiește-te dar de această răutate a ta și roagă-te Domnului»." },
      { from: "guide", text: "Mustrare dură și ușă deschisă, în același verset. Așa lucrează Dumnezeu." },
    ]},
    { id: "vr3_5", type: "scripture", order: 5, scripture: { text: "Și așa erați unii din voi! Dar ați fost spălați, ați fost sfințiți, ați fost socotiți neprihăniți în Numele Domnului Iisus Hristos.", ref: "1 Corinteni 6:11" } },
    { id: "vr3_6", type: "choice", order: 6, choice: { prompt: "Ce te ține să nu vii?", options: [
      { id: "vr3a", label: "Cred că am făcut prea mult ca să fiu iertat.", branchStepId: "vr3_b_prea" },
      { id: "vr3b", label: "Am primit darul ăsta din familie, nu l-am cerut.", branchStepId: "vr3_b_mostenit" },
      { id: "vr3c", label: "Din asta trăiesc, oamenii vin la mine.", branchStepId: "vr3_b_bani" },
    ]}},
    { id: "vr3_b_prea", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "«Și așa erați unii din voi.» Pavel scrie asta unei biserici în care erau foști închinători la idoli și foști oameni cu viața distrusă. Nu spune «nu erați chiar așa răi». Spune «așa erați», la trecut." },
      { from: "guide", text: "Dacă ar exista un păcat prea mare, crucea ar fi prea mică. Nu este." },
    ]},
    { id: "vr3_b_mostenit", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Poate n-ai ales începutul. Dar alegi continuarea, și asta e partea ta. Dumnezeu nu te ține răspunzător pentru ce a făcut bunica ta — Ezechiel 18:20 e limpede: fiul nu poartă nelegiuirea tatălui." },
      { from: "guide", text: "Te ține răspunzător pentru ce faci tu de mâine încolo. Și tocmai de aceea poți opri lanțul chiar la tine." },
    ]},
    { id: "vr3_b_bani", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Efesenii din Faptele 19 și-au ars cărți care valorau cât salariul pe mulți ani. Textul spune suma anume, ca să știm că i-a costat. Nimeni nu-ți va spune că e ieftin." },
      { from: "guide", text: "Dar gândește-te ce vinzi și cui. Iar dacă îți faci griji pentru pâine: Cel care cere să lași e Cel care hrănește. Nu te-ar chema să ieși ca să te lase în drum." },
    ]},
    { id: "vr3_7", type: "quiz", order: 7, quiz: { question: "Ce i-a spus Petru lui Simon vrăjitorul?", options: [
      { text: "Că nu mai are nicio șansă", correct: false },
      { text: "L-a mustrat aspru și i-a spus să se pocăiască și să se roage Domnului", correct: true },
      { text: "Că păcatul lui nu era chiar așa de grav", correct: false },
    ], explanation: "Adevărul spus în față și chemarea la pocăință merg împreună. Nici mustrare fără ușă, nici ușă fără mustrare." }},
    { id: "vr3_8", type: "step", order: 8, bubbles: [
      { from: "guide", text: "Dacă ești în zona asta, fă azi un singur lucru care se vede: spune-i unui om că te oprești. Nu mâine. Azi." },
    ]},
    { id: "vr3_9", type: "journal", order: 9, journalPrompt: "Scrie înaintea lui Dumnezeu, pe nume și fără să micșorezi, ce ai făcut. Ce numești poate fi iertat." },
    { id: "vr3_10", type: "truth_simple", order: 10, bubbles: [
      { from: "guide", text: "Limita cinstită: iertarea e deplină, dar nu șterge urmările pământești. Dacă ai luat bani de la oameni, dacă ai făcut rău cuiva, ai ceva de îndreptat cu ei. Harul îți dă puterea să faci asta, nu scutirea." },
    ]},
    { id: "vr3_11", type: "prayer", order: 11, bubbles: [
      { from: "guide", text: "«Doamne, am lucrat cu ce Tu numești urâciune. Nu am scuze și nu-mi apăr fapta. Iartă-mă pentru sângele lui Iisus. Mă opresc azi. Spală-mă și fă-mă al Tău.»" },
    ]},
    { id: "vr3_12", type: "memory_verse", order: 12, scripture: { text: "Și așa erați unii din voi! Dar ați fost spălați, ați fost sfințiți, ați fost socotiți neprihăniți.", ref: "1 Corinteni 6:11" } },
  ],
}

export const vrajL4: Lesson = {
  id: "vraj_l4", courseId: COURSE, order: 4,
  title: "Cum trăiești liber", estMinutes: 14,
  anchorRefs: ["Efeseni 6:10-18", "Iacov 4:7", "1 Petru 5:8-9"], memoryVerseRef: "Iacov 4:7",
  steps: [
    { id: "vr4_1", type: "hook", order: 1, bubbles: [
      { from: "guide", text: "Ai înțeles că e real și biruit. Ai lăsat jos vorba care te ținea. Ai adus la lumină ce ai făcut. Rămâne ultima întrebare: cum trăiești de mâine?" },
    ]},
    { id: "vr4_2", type: "scripture", order: 2, scripture: { text: "Supuneți-vă dar lui Dumnezeu. Împotriviți-vă diavolului, și el va fugi de la voi.", ref: "Iacov 4:7" } },
    { id: "vr4_3", type: "truth_simple", order: 3, bubbles: [
      { from: "guide", text: "Sunt două jumătăți și nu merg separat. Cine se împotrivește fără să se supună se luptă singur. Cine crede că se supune, dar nu se împotrivește nimănui, doarme." },
      { from: "guide", text: "Și observă ce nu scrie: nu scrie «strigă mai tare», nu scrie «caută cine ți-a făcut», nu scrie «găsește formula». Scrie doar: supune-te și împotrivește-te." },
    ]},
    { id: "vr4_4", type: "world_vs_truth", order: 4, bubbles: [
      { from: "guide", text: "Armura din Efeseni 6 nu e o rugăciune magică pe care o rosești dimineața. Uită-te ce e în ea: adevăr, neprihănire, Evanghelie, credință, mântuire, Cuvânt, rugăciune." },
      { from: "guide", text: "Adică exact lucrurile obișnuite ale unui om care umblă cu Dumnezeu. Protecția ta nu e o tehnică specială. E viața de zi cu zi cu El." },
    ]},
    { id: "vr4_5", type: "choice", order: 5, choice: { prompt: "Ce e cel mai greu pentru tine acum?", options: [
      { id: "vr4a", label: "Frica se întoarce, mai ales noaptea.", branchStepId: "vr4_b_noapte" },
      { id: "vr4b", label: "Ai mei mă împing înapoi la vechile obiceiuri.", branchStepId: "vr4_b_familie" },
      { id: "vr4c", label: "Nu am pe nimeni cu care să vorbesc despre asta.", branchStepId: "vr4_b_singur" },
    ]}},
    { id: "vr4_b_noapte", type: "how_god_helps", order: 90, bubbles: [
      { from: "guide", text: "Noaptea nu e mai periculoasă. E doar mai tăcută, și gândurile se aud mai tare. Nu te certa cu ele în minte, pentru că acolo pierzi." },
      { from: "guide", text: "Aprinde lumina, citește Psalmul 91 cu voce tare și spune-I lui Dumnezeu că ți-e frică. «Nu ne-a dat un duh de frică.» Frica nu e de la El, deci n-o primi ca pe un mesaj." },
    ]},
    { id: "vr4_b_familie", type: "how_god_helps", order: 91, bubbles: [
      { from: "guide", text: "Nu te certa cu ei și nu-i face de rușine. Nu ai fost chemat să câștigi discuția, ci să rămâi al Lui." },
      { from: "guide", text: "Spune simplu și o singură dată: «eu nu mai fac lucrul ăsta». Apoi lasă viața ta să vorbească. Pacea ta îi va întreba pe ei mai bine decât argumentele tale." },
    ]},
    { id: "vr4_b_singur", type: "how_god_helps", order: 92, bubbles: [
      { from: "guide", text: "Singurătatea e locul unde frica se îngrașă. 1 Petru 5:9 spune să ne împotrivim «tari în credință», și imediat amintește că și alții trec prin aceleași lucruri. Nu ești un caz." },
      { from: "guide", text: "Caută un singur om credincios cu care să poți vorbi. Nu un grup, nu o mulțime. Unul." },
    ]},
    { id: "vr4_6", type: "quiz", order: 6, quiz: { question: "Ce este armura din Efeseni 6?", options: [
      { text: "O rugăciune care trebuie rostită exact, altfel nu are efect", correct: false },
      { text: "Adevărul, neprihănirea, Evanghelia, credința, Cuvântul și rugăciunea — viața obișnuită cu Dumnezeu", correct: true },
      { text: "O protecție rezervată celor foarte maturi duhovnicește", correct: false },
    ], explanation: "Fiecare piesa e un lucru pe care îl ai deja în Hristos și îl trăiești zilnic. Nu e formulă, e umblare." }},
    { id: "vr4_7", type: "step", order: 7, bubbles: [
      { from: "guide", text: "Așază-ți trei lucruri fixe pentru săptămâna care vine: un moment zilnic de citire, un moment zilnic de rugăciune cu cuvintele tale, și o întâlnire cu credincioși. Scrie-le acum, cu ora." },
    ]},
    { id: "vr4_8", type: "journal", order: 8, journalPrompt: "Scrie declarația ta de final, cu mâna ta: de ce m-am lepădat, Cui mă dau și cum trăiesc de mâine. Pune data." },
    { id: "vr4_9", type: "truth_simple", order: 9, bubbles: [
      { from: "guide", text: "Limita cinstită, la finalul cursului: nu-ți promitem că viața devine ușoară și nu-ți promitem că nu mai vine nicio noapte grea. Îți spunem doar Cine a biruit și că ești al Lui." },
      { from: "guide", text: "Și încă ceva, la fel de cinstit: dacă nu dormi, dacă nu mai funcționezi, dacă gândurile nu se opresc, mergi și la medic. Nu e necredință. Dumnezeu lucrează și prin oameni." },
    ]},
    { id: "vr4_10", type: "prayer", order: 10, bubbles: [
      { from: "guide", text: "«Doamne Iisuse, mă supun Ție și mă împotrivesc celui rău. Nu mă țin de nicio putere și de niciun obiect. Tu ai biruit la cruce și eu sunt al Tău. Învață-mă să umblu cu Tine în fiecare zi.»" },
    ]},
    { id: "vr4_11", type: "memory_verse", order: 11, scripture: { text: "Supuneți-vă dar lui Dumnezeu. Împotriviți-vă diavolului, și el va fugi de la voi.", ref: "Iacov 4:7" } },
  ],
}

export const SPIRITUAL_VRAJITORIE_LESSONS: Lesson[] = [vrajL1, vrajL2, vrajL3, vrajL4]
