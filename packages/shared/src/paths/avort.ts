import type { Lesson } from "../domain.js"

/*
 * Ușa „avort" — trei lecții suplimentare în camera 1 (path_acasa).
 *
 * Este cel mai greu set din tot ce s-a scris pentru Porți și cel mai ușor de
 * stricat. Se citește întreg înainte de orice modificare.
 *
 * Cui îi scriem
 * ------------
 * Femeii care a făcut avort, oricând și în orice împrejurare. Și bărbatului:
 * celui care a plătit, celui care a cerut, celui care a tăcut și celui care a
 * aflat abia după. Bărbații nu sunt pomeniți aproape niciodată în materialele
 * de acest fel și duc lucrul acesta ani întregi fără să știe că li se cuvine
 * și lor un loc. Lecția 1 îi numește explicit, lecția 3 le dă un pasaj al lor.
 *
 * Cui NU îi scriem
 * ----------------
 * Femeii însărcinate care se află acum înaintea deciziei. Aceea are nevoie de
 * un om real, de un consilier și de informații pe care o aplicație nu i le
 * poate da. Lecția 1 spune asta pe față, în pasul av1_3, și o trimite mai
 * departe. Nu adăuga aici sfaturi pentru situația aceea.
 *
 * Ce nu face acest set de lecții
 * ------------------------------
 * 1. Nu argumentează politic și nu folosește cuvinte de tribunal. Omul care
 *    deschide ușa asta și-a rostit deja singur toate acuzațiile, de mii de
 *    ori. Nu i se mai adaugă niciuna.
 * 2. Nu minimalizează. «Nu a fost nimic» este cealaltă minciună și închide
 *    doliul în om, pentru că nu poți jeli ceva ce ți s-a spus că nu a existat.
 * 3. Nu cere mărturisire publică și nu cere ca cineva să afle.
 * 4. Nu promite vindecare și nu pune termen.
 * 5. Nu folosește puncte, procente sau niveluri (docs/22 §8).
 *
 * Cele două decizii grele de conținut
 * -----------------------------------
 * a) Psalmul 139:13-14. Este versetul cu care omul acesta a fost lovit cel mai
 *    des. Și este, în același timp, singurul temei pentru care doliul lui are
 *    voie să existe: dacă nu a fost nimeni, nu are pe cine jeli. L-am păstrat,
 *    dar îl așezăm în lecția 2, după iertare, niciodată înainte, și spunem
 *    răspicat în text că aici nu este folosit ca acuzație. Dacă cineva mută
 *    vreodată versetul în lecția 1, strică tot drumul.
 * b) 2 Samuel 12:23. Copilul lui David moare în legătură cu păcatul lui David,
 *    iar David spune «Eu mă voi duce la el». Este cea mai apropiată paralelă
 *    din Scriptură și o folosim ca atare. Nu o transformăm însă într-o dogmă:
 *    textul spune ce a spus David și că nimeni nu l-a corectat, nu mai mult.
 *
 * Siguranță (docs/22)
 * -------------------
 * Lecția 1 poartă câmpul safety cu numerele 112, 116 123 și 116 111. Data
 * aniversară este un moment de risc real și este tratată pe față în lecția 3.
 *
 * Regula textului biblic
 * ----------------------
 * Fiecare verset a fost verificat cuvânt cu cuvânt după Cornilescu 1924. Din
 * Ioan 8:11 s-a păstrat doar vorbirea directă, ca să nu intre în cod forma
 * „Isus", care se ciocnește cu convenția de scriere din restul aplicației.
 */

export const avortL1: Lesson = {
  id: "avort_l1",
  courseId: "path_acasa",
  order: 31,
  title: "Păcatul despre care nu se vorbește",
  estMinutes: 9,
  anchorRefs: ["1 Ioan 1:9", "Isaia 1:18"],
  memoryVerseRef: "1 Ioan 1:9",
  safety: {
    topic: "mental_health",
    notice: "Dacă ai gânduri de a-ți face rău sau simți că nu mai poți duce, sună astăzi: 112 în caz de urgență, 116 123 pentru linia de sprijin emoțional, 116 111 pentru copii și tineri. Dacă ești însărcinată acum și te afli înaintea unei decizii, această lecție nu este pentru situația ta — caută un consilier sau un medic care să stea de vorbă cu tine pe îndelete."
  },
  steps: [
    {
      id: "av1_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Ai deschis o ușă pe care mulți nu o deschid niciodată. Vreau să știi de la început că nu vei fi certat aici." },
        { from: "guide", text: "Dacă la jumătate nu mai poți, închizi și vii altă dată. Nu se pierde nimic și nu rămâne nimic însemnat undeva." }
      ]
    },
    {
      id: "av1_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Sunt lucruri pe care omul le spune la un moment dat. Și este unul pe care nu îl spune niciodată." },
        { from: "guide", text: "Stă în biserică alături de oameni care îl salută frumos și în tot timpul acesta duce în el o zi despre care nu știe nimeni. Uneori de zece ani. Uneori de treizeci." },
        { from: "guide", text: "Și cu cât trece mai mult timp, cu atât pare mai imposibil de spus. Așa funcționează tăcerea: nu vindecă, doar îngroașă." }
      ]
    },
    {
      id: "av1_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Trei lămuriri, ca să știm clar unde suntem." },
        { from: "guide", text: "Unu: drumul acesta este și pentru femeie, și pentru bărbat. Pentru cel care a plătit, pentru cel care a cerut, pentru cel care a tăcut și pentru cel care a aflat abia după. Nu ești lăsat pe dinafară." },
        { from: "guide", text: "Doi: dacă ești însărcinată chiar acum și te afli înaintea deciziei, nu asta este lecția de care ai nevoie. Nu îți pot da aici ce îți trebuie. Caută un om real, care să aibă timp pentru tine." },
        { from: "guide", text: "Trei: aici nu se face proces. Nu ai nevoie de încă un acuzator. Ai unul care lucrează în tine în fiecare noapte." }
      ]
    },
    {
      id: "av1_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Ai auzit două răspunsuri și amândouă te-au lăsat singur." },
        { from: "guide", text: "Lumea spune: «nu a fost nimic, a fost o procedură, treci mai departe». Dacă nu a fost nimic, atunci de ce te doare de ani de zile? Explicația asta te lasă fără dreptul de a suferi." },
        { from: "guide", text: "Iar din partea cealaltă, uneori chiar din biserică, ai auzit că există un păcat pe care Dumnezeu nu îl iartă și că al tău este acela." },
        { from: "guide", text: "Prima minciună îți ia doliul. A doua îți ia iertarea. Împreună te lasă exact unde ești: cu o durere pe care nu ai voie să o arăți și cu o vină pe care crezi că nu ai voie să o lași jos." }
      ]
    },
    {
      id: "av1_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi, spus fără ocol: Scriptura nu are o listă de păcate pe care sângele lui Hristos nu le acoperă." },
        { from: "guide", text: "Nu există categoria aceea. Nu ai nimerit tu, dintre toți oamenii, singurul lucru pentru care nu s-a plătit." }
      ]
    },
    {
      id: "av1_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Ce cere Dumnezeu nu este ispășire. Ispașirea a fost făcută și nu se repetă." },
        { from: "guide", text: "Cere mărturisire. Adică să numești înaintea Lui, o singură dată, cu cuvintele tale, ce s-a întâmplat. Nu Îi spui ceva ce nu știe. Ți-o spui ție în prezența Lui." },
        { from: "guide", text: "Și mai este ceva în versetul de mai jos, ușor de trecut cu vederea: nu scrie că este bun, ci că este «credincios și drept». Iertarea nu îți este făcută ca o favoare de care să te rușinezi. Este dată pentru că prețul a fost plătit și Dumnezeu este drept." }
      ]
    },
    {
      id: "av1_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Dacă ne mărturisim păcatele, El este credincios și drept ca să ne ierte păcatele și să ne curețe de orice nelegiuire.",
        ref: "1 Ioan 1:9"
      },
      bubbles: [
        { from: "guide", text: "«De orice nelegiuire.» Nu «de cele mici». Cuvântul «orice» a fost pus acolo pentru oameni care se întreabă dacă al lor intră." }
      ]
    },
    {
      id: "av1_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Veniți totuși să ne judecăm, zice Domnul. De vor fi păcatele voastre cum e cârmâzul, se vor face albe ca zăpada; de vor fi roșii ca purpura, se vor face ca lâna.",
        ref: "Isaia 1:18"
      },
      bubbles: [
        { from: "guide", text: "Cârmâzul era o vopsea care nu ieșea la spălat. Se alegea tocmai pentru că rămânea pe veci în fir." },
        { from: "guide", text: "Dumnezeu alege dinadins imaginea petei care nu iese și spune ce face El cu ea. Nu spune că se estompează. Spune «albe ca zăpada»." }
      ]
    },
    {
      id: "av1_9",
      type: "name_struggle",
      order: 9,
      bubbles: [
        { from: "guide", text: "Acum urmează partea grea și o faci o singură dată." },
        { from: "guide", text: "Spune-I lui Dumnezeu, cu cuvintele tale, ce s-a întâmplat. Nu frumos. Nu în termeni bisericești. Așa cum îți vine." },
        { from: "guide", text: "Dacă nu îți iese cu voce tare, scrie. Dacă nu îți ies decât trei cuvinte, sunt de ajuns trei cuvinte." }
      ]
    },
    {
      id: "av1_10",
      type: "quiz",
      order: 10,
      quiz: {
        question: "Ce spune 1 Ioan 1:9 despre întinderea iertării?",
        options: [
          { text: "Că sunt păcate prea grele, care rămân pe om toată viața", correct: false },
          { text: "Că El curățește de orice nelegiuire, fără categorie lăsată pe dinafară", correct: true },
          { text: "Că iertarea vine după ce omul repară singur ce a stricat", correct: false }
        ],
        explanation: "Versetul nu împarte păcatele în categorii și nu cere ispășire din partea omului. Condiția este mărturisirea, iar temeiul nu este bunăvoința de moment a lui Dumnezeu, ci faptul că El este credincios și drept: prețul a fost plătit deja."
      }
    },
    {
      id: "av1_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "El este credincios și drept ca să ne ierte păcatele și să ne curețe de orice nelegiuire.",
        ref: "1 Ioan 1:9"
      },
      bubbles: [
        { from: "guide", text: "Când revine noaptea acuzarea, spune versetul ăsta cu voce tare. Acuzarea nu se combate cu argumente, ci cu ce este scris." }
      ]
    },
    {
      id: "av1_12",
      type: "prayer",
      order: 12,
      bubbles: [
        { from: "guide", text: "«Doamne, Știi ce am făcut. Nu mai ascund și nu mai caut scuze. Îl pun înaintea Ta așa cum este. Te rog să mă ierți și să mă cureți, pentru că așa ai spus că faci. Amin.»" }
      ]
    },
    {
      id: "av1_13",
      type: "journal",
      order: 13,
      journalPrompt: "Scrie data de astăzi și o singură propoziție: ce ai pus înaintea lui Dumnezeu astăzi. În zilele grele te vei întoarce la rândul acesta.",
      reward: { xp: 0, axisDeltas: { freedom: 1 } }
    }
  ]
}

export const avortL2: Lesson = {
  id: "avort_l2",
  courseId: "path_acasa",
  order: 32,
  title: "Copilul acela a fost real",
  estMinutes: 9,
  anchorRefs: ["2 Samuel 12:23", "Psalmul 139:13-14"],
  memoryVerseRef: "2 Samuel 12:23",
  steps: [
    {
      id: "av2_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Lecția trecută a fost despre iertare. Asta este despre altceva, și vine după, niciodată înainte." },
        { from: "guide", text: "Astăzi vorbim despre doliu. Sunt lucruri diferite și nu țin loc unul altuia." }
      ]
    },
    {
      id: "av2_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Ai observat, poate, un lucru ciudat: ești iertat și totuși te doare la fel." },
        { from: "guide", text: "Nu înseamnă că iertarea nu a fost reală. Înseamnă că mai era ceva în tine, de care nu s-a ocupat nimeni: o pierdere pe care nu ai avut voie să o jelești." },
        { from: "guide", text: "Nu a fost înmormântare. Nu a fost nume. Nimeni nu ți-a spus «condoleanțe». Nimeni nu a adus o floare. Iar tu ai înțeles din tăcerea aceea că nu ai dreptul să plângi." }
      ]
    },
    {
      id: "av2_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Doliul are nevoie de cineva. Nu poți jeli un nimic." },
        { from: "guide", text: "De aceea, ca să ai voie să suferi, trebuie spus lucrul greu: a fost cineva. Nu îți spun asta ca să te lovesc — ți-o spun pentru că este singurul temei pe care durerea ta stă în picioare." },
        { from: "guide", text: "Versetul care urmează, Psalmul 139, a fost aruncat în oameni ca o piatră, de multe ori. Aici nu este piatră. Aici este dovada că ai pe cine jeli." }
      ]
    },
    {
      id: "av2_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea îți spune, cu intenție bună: «nu era încă un copil, deci nu ai ce jeli»." },
        { from: "guide", text: "Pare o ușurare. În realitate îți încuie durerea înăuntru și o lasă acolo, fără ieșire, ani de zile." },
        { from: "guide", text: "Dumnezeu nu face asta. El nu îți neagă pierderea ca să te consoleze. O recunoaște — și abia atunci poți începe să plângi." }
      ]
    },
    {
      id: "av2_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: ai voie să jelești și doliul nu înseamnă că iertarea s-a anulat." },
        { from: "guide", text: "Un om iertat poate plânge. Lacrimile nu sunt o rejudecare a dosarului." }
      ]
    },
    {
      id: "av2_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Este în Scriptură o istorie pe care aproape nimeni nu o pune lângă durerea ta, deși stă cel mai aproape de ea." },
        { from: "guide", text: "David face un păcat greu. Copilul care se naște se îmbolnăvește și moare. Copilul acela moare în legătură cu ce făcuse tatăl lui." },
        { from: "guide", text: "Câtă vreme copilul trăiește, David postește și stă la pământ. Când copilul moare, David se ridică, se spală și mănâncă. Slujitorii nu înțeleg nimic și îl întreabă de ce. Răspunsul lui este versetul care urmează." }
      ]
    },
    {
      id: "av2_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Acum, când a murit, pentru ce să mai postesc? Pot să-l întorc în viață? Eu mă voi duce la el, dar el nu se va întoarce la mine.",
        ref: "2 Samuel 12:23"
      },
      bubbles: [
        { from: "guide", text: "«Eu mă voi duce la el.» David nu spune că s-a terminat. Spune că drumul merge într-o singură direcție și că el este cel care va face drumul." },
        { from: "guide", text: "Nu îți construiesc pe versetul acesta o învățătură întreagă, pentru că Scriptura nu ne dă mai mult. Îți spun doar atât: așa a vorbit un om al lui Dumnezeu despre copilul lui mort și nimeni nu l-a corectat." }
      ]
    },
    {
      id: "av2_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Tu mi-ai întocmit rărunchii, Tu m-ai țesut în pântecele mamei mele: Te laud că sunt o făptură așa de minunată. Minunate sunt lucrările Tale și ce bine vede sufletul meu lucrul acesta!",
        ref: "Psalmul 139:13-14"
      },
      bubbles: [
        { from: "guide", text: "Cine țese, știe ce țese. Nu a fost o întâmplare biologică fără martor." },
        { from: "guide", text: "Iar dacă a fost cunoscut de El, atunci nu jelești în gol. Ai pe cine jeli, și El știe despre cine este vorba când te rogi." }
      ]
    },
    {
      id: "av2_9",
      type: "name_struggle",
      order: 9,
      bubbles: [
        { from: "guide", text: "Mulți oameni care au trecut pe aici spun că abia când au dat un nume s-a mișcat ceva în ei." },
        { from: "guide", text: "Nu este o rânduială bisericească și nu are putere în sine. Este doar felul în care omul recunoaște că acolo a fost cineva." },
        { from: "guide", text: "Dacă vrei, alege un nume. Dacă nu vrei, spune-I lui Dumnezeu «copilul meu». Nu ești obligat la nimic." }
      ]
    },
    {
      id: "av2_10",
      type: "quiz",
      order: 10,
      quiz: {
        question: "Ce relație este între iertare și doliu?",
        options: [
          { text: "Dacă mai jelești, înseamnă că nu ai fost iertat cu adevărat", correct: false },
          { text: "Sunt două lucruri diferite: iertarea ridică vina, doliul plânge pierderea", correct: true },
          { text: "Doliul ține loc de iertare, dacă este destul de adânc", correct: false }
        ],
        explanation: "Vina și pierderea sunt două lucruri distincte. Iertarea se ocupă de vină și este încheiată. Pierderea rămâne și cere doliu, exact ca orice altă moarte. Un om iertat are voie să plângă, iar lacrimile lui nu redeschid dosarul."
      }
    },
    {
      id: "av2_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "Eu mă voi duce la el, dar el nu se va întoarce la mine.",
        ref: "2 Samuel 12:23"
      },
      bubbles: [
        { from: "guide", text: "Este singura propoziție din Scriptură spusă de un părinte despre copilul lui mort. Ți-o las aici." }
      ]
    },
    {
      id: "av2_12",
      type: "prayer",
      order: 12,
      bubbles: [
        { from: "guide", text: "«Doamne, astăzi nu Îți cer iertare, pentru că mi-ai dat-o. Astăzi Îți aduc plânsul pe care nu am avut voie să-l plâng. Tu Știi despre cine este vorba. Ai grijă de el. Amin.»" }
      ]
    },
    {
      id: "av2_13",
      type: "journal",
      order: 13,
      journalPrompt: "Scrie ce nu ai apucat să spui niciodată. Nu pentru altcineva. Scrie și închide caietul.",
      reward: { xp: 0, axisDeltas: { emotional_peace: 1 } }
    }
  ]
}

export const avortL3: Lesson = {
  id: "avort_l3",
  courseId: "path_acasa",
  order: 33,
  title: "Cum trăiesc de aici înainte",
  estMinutes: 9,
  anchorRefs: ["Psalmul 103:12", "Mica 7:19"],
  memoryVerseRef: "Psalmul 103:12",
  steps: [
    {
      id: "av3_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Am pus jos vina și am dat drumul plânsului. Rămâne întrebarea cea mai practică: cum trăiești de mâine." }
      ]
    },
    {
      id: "av3_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Este o zi în calendar pe care numai tu o știi." },
        { from: "guide", text: "Vine în fiecare an și, chiar dacă nu te uiți la dată, corpul o știe: dormi prost cu o săptămână înainte și nu înțelegi de ce." },
        { from: "guide", text: "Iar undeva în minte ai și o vârstă care crește. «Ar fi avut acum șapte ani.» Nu ești nebun. Așa face aproape toată lumea care duce lucrul ăsta." }
      ]
    },
    {
      id: "av3_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Patru lucruri practice pentru anii care vin." },
        { from: "guide", text: "Unu, ziua aceea: nu o lăsa să te ia din spate. Înseamnă-ți-o și pregătește-o. În ziua aceea nu programa lucruri grele și nu rămâne singur toată seara." },
        { from: "guide", text: "Doi, un singur om: cândva, când vei fi gata, spune-i unui om de încredere. Nu bisericii, nu familiei. Unul. Tăcerea totală este cea care apasă, nu discreția." },
        { from: "guide", text: "Trei, fără pedeapsă: mulți încep să slujească peste puteri, ca să plătească. Nu se plătește nimic așa. Faci binele din mulțumire, nu din datorie." },
        { from: "guide", text: "Patru, pentru bărbat: dacă tu ai fost cel care a cerut sau cel care a tăcut, partea ta este a ta și se pune jos la fel. Iar dacă femeia aceea îți este și acum soție, la un moment dat veți avea de vorbit despre asta — nu astăzi și, cel mai bine, cu cineva de față." }
      ]
    },
    {
      id: "av3_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea zice că ai trecut peste, pentru că te vede râzând. Tu știi că nu este așa." },
        { from: "guide", text: "Iar în tine este o voce care spune că trebuie să plătești până la capătul vieții. Că dacă ai o zi bună, înseamnă că nu ți-a păsat destul." },
        { from: "guide", text: "Vocea aceea nu este a lui Dumnezeu. Dumnezeu nu îți cere să fii nefericit ca dovadă că regreți. El a încheiat socoteala și nu o redeschide El primul." }
      ]
    },
    {
      id: "av3_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: ai voie să fii fericit și asta nu înseamnă că ai uitat." },
        { from: "guide", text: "Bucuria nu este trădare. Este semnul că povara a fost luată de altcineva." }
      ]
    },
    {
      id: "av3_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Dumnezeu folosește două imagini când vorbește despre păcatul iertat, și amândouă sunt despre distanță." },
        { from: "guide", text: "Una este pe orizontală: răsăritul și apusul, adică două puncte care nu se întâlnesc niciodată, oricât ai merge." },
        { from: "guide", text: "Cealaltă este pe verticală: fundul mării. Un loc de unde nimeni nu scoate nimic înapoi." },
        { from: "guide", text: "Nu scrie că păcatul este ținut la îndemână, ca să fie scos când mai greșești o dată. Scrie că este dus departe și aruncat la fund." }
      ]
    },
    {
      id: "av3_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "cât este de departe răsăritul de apus, atât de mult depărtează El fărădelegile noastre de la noi.",
        ref: "Psalmul 103:12"
      },
      bubbles: [
        { from: "guide", text: "Nordul și sudul au capăt: mergi destul și ajungi la pol. Răsăritul și apusul nu au. Poți merge la nesfârșit și nu întors nici o dată." }
      ]
    },
    {
      id: "av3_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "vei arunca în fundul mării toate păcatele lor.",
        ref: "Mica 7:19"
      },
      bubbles: [
        { from: "guide", text: "«Toate.» Iarăși cuvântul care nu lasă nimic pe dinafară." }
      ]
    },
    {
      id: "av3_9",
      type: "name_struggle",
      order: 9,
      bubbles: [
        { from: "guide", text: "Ce mai duci, după cele trei lecții?" },
        { from: "guide", text: "Frica să nu afle cineva? Furia pe cel care te-a lăsat singură atunci? Gândul că nu meriți copiii pe care îi ai acum?" },
        { from: "guide", text: "Numește-l. Ce rămâne nenumit lucrează pe întuneric." }
      ]
    },
    {
      id: "av3_10",
      type: "quiz",
      order: 10,
      quiz: {
        question: "Ce se face cu ziua aniversară, an de an?",
        options: [
          { text: "Se ignoră complet, ca să nu se redeschidă rana", correct: false },
          { text: "Se pregătește dinainte: zi mai ușoară și cineva aproape spre seară", correct: true },
          { text: "Se ține post și se cere iertare din nou", correct: false }
        ],
        explanation: "Ignorarea nu funcționează, pentru că trupul ține minte data chiar dacă mintea o ocolește. Iar cererea de iertare repetată pentru același lucru deja mărturisit nu aduce nimic nou și întărește acuzarea. Ziua se pregătește dinainte, ca orice zi grea din calendar."
      }
    },
    {
      id: "av3_11",
      type: "memory_verse",
      order: 11,
      scripture: {
        text: "cât este de departe răsăritul de apus, atât de mult depărtează El fărădelegile noastre de la noi.",
        ref: "Psalmul 103:12"
      },
      bubbles: [
        { from: "guide", text: "Este versetul pentru ziua aceea din calendar. Învață-l înainte să vină." }
      ]
    },
    {
      id: "av3_12",
      type: "prayer",
      order: 12,
      bubbles: [
        { from: "guide", text: "«Doamne, nu mai vreau să plătesc ceva ce ai plătit Tu. Învață-mă să trăiesc ca un om iertat, nu ca un om care își isprăvește pedeapsa. Și fii cu mine în ziua aceea din an. Amin.»" }
      ]
    },
    {
      id: "av3_13",
      type: "journal",
      order: 13,
      journalPrompt: "Scrie ziua din calendar și, lângă ea, un lucru pe care îl vei face anul acesta ca să nu o duci singur. Scrie și numele omului căruia îi vei spune, când vei fi gata.",
      reward: { xp: 0, axisDeltas: { identity: 1 } }
    }
  ]
}

export const AVORT_LESSONS: Lesson[] = [avortL1, avortL2, avortL3]

/*
 * Practicile pentru ușa „avort", aliniate pe index cu AVORT_LESSONS.
 * Niciuna nu cere mărturisire publică și niciuna nu propune vreo formă de
 * ispășire prin fapte.
 */
export const AVORT_PRACTICES: string[] = [
  "Astăzi, când revine acuzarea, spune cu voce tare versetul din 1 Ioan 1:9 și nu-i răspunde cu nimic altceva.",
  "Astăzi lasă-ți zece minute într-un loc liniștit și nu te opri din plâns dacă vine. Nu ești dator nimănui cu o față senină.",
  "Astăzi caută ziua în calendar și însemneaz-o. Scrie lângă ea un singur lucru pe care îl vei face atunci."
]
