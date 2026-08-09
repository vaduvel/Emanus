import type { Lesson } from "../domain.js"

/*
 * Ușa „pornografie" — două lecții suplimentare în camera 1 (path_acasa).
 *
 * Cui îi scriem
 * ------------
 * Omului care se întoarce acolo de ani de zile și care a promis de zeci de ori
 * că este ultima dată. Scriem și pentru bărbați, și pentru femei; lecția 1 o
 * spune răspicat, pentru că femeia care se luptă cu asta este de obicei și mai
 * singură, nefiind nici măcar recunoscută ca existentă.
 *
 * Mișcarea celor două lecții
 * --------------------------
 * Lecția 1 nu cere nimic. Doar așază corect diagnosticul: nu este lene și nu
 * este doar poftă; este un cerc în care rușinea de după alimentează întoarcerea
 * următoare. Romani 7 și Psalmul 32 sunt puse acolo tocmai ca omul să vadă că
 * Scriptura însăși descrie starea asta, fără să o înfrumusețeze.
 *
 * Lecția 2 este partea practică și are un singur mesaj central: secretul este
 * combustibilul. Nu se rupe cercul prin mai multă voință, ci prin ieșirea din
 * ascunzătoare, către un singur om potrivit.
 *
 * Ce nu face setul
 * ----------------
 * 1. Nu promite eliberare rapidă și nu leagă valoarea omului de numărul de
 *    zile curate. Nu există puncte, procente sau niveluri (docs/22 §8).
 * 2. Nu cere mărturisire publică și nu cere spovedanie într-o aplicație.
 * 3. Nu se adresează minorilor cu detalii; îi trimite la un adult de încredere
 *    și la 116 111.
 * 4. Nu confundă lupta cu infracțiunea. Materialele cu copii sau fără
 *    consimțământ nu sunt o „luptă", sunt fapte penale, iar pasul pg1_3 o spune
 *    limpede. Acel pas nu se scoate.
 *
 * Siguranță (docs/22)
 * -------------------
 * Lecția 1 poartă câmpul safety: 112, 116 123, 116 111, plus îndemnul la
 * terapeut când comportamentul este compulsiv sau în creștere.
 *
 * Regula textului biblic
 * ----------------------
 * Toate versetele au fost verificate cuvânt cu cuvânt după Cornilescu 1924.
 * Galateni 6:1 este citat trunchiat la „cu duhul blândeții", forma atestată
 * identic în toate edițiile consultate.
 */

export const pornografieL1: Lesson = {
  id: "pornografie_l1",
  courseId: "path_acasa",
  order: 41,
  title: "Ușa pe care intri singur",
  estMinutes: 9,
  anchorRefs: ["Romani 7:15", "Psalmul 32:3", "Psalmul 32:5"],
  memoryVerseRef: "Psalmul 32:5",
  safety: {
    topic: "mental_health",
    notice: "Dacă nu mai poți opri, dacă îți afectează somnul, munca sau căsnicia, sau dacă ai început să cauți lucruri tot mai dure, cere ajutor de specialitate: un psiholog sau un psihoterapeut. Nu este o înfrângere spirituală, este îngrijire. Pentru sprijin emoțional: 116 123. Dacă ești copil sau tânăr: 116 111. În caz de urgență: 112. Iar dacă ai dat peste materiale cu copii sau fără consimțământ, acelea nu sunt o luptă personală, sunt fapte penale și se anunță la poliție."
  },
  steps: [
    {
      id: "pg1_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Ai deschis ușa asta și probabil ți-a fost greu să apeși. Bine că ai apăsat." },
        { from: "guide", text: "Nu îți cer astăzi nicio promisiune. Ai făcut destule și nu au ținut. Astăzi doar ne uităm la ce se întâmplă, cu ochii deschiși." }
      ]
    },
    {
      id: "pg1_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Cercul arată cam așa, și îl știi pe de rost." },
        { from: "guide", text: "Ești obosit, singur sau golit. Vine gândul. Zici că nu. Zici că nu încă o dată. Apoi cedezi. Urmează câteva minute și, imediat după, greața și rușinea." },
        { from: "guide", text: "Și aici este partea pe care puțini o spun: tocmai rușinea de după pregătește întoarcerea următoare. Pentru că un om care se disprețuiește caută iarăși ceva care să îl amorțească." },
        { from: "guide", text: "Nu ești într-o linie dreaptă spre mai rău. Ești într-un cerc. Iar un cerc se rupe altfel decât o linie." }
      ]
    },
    {
      id: "pg1_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Patru lămuriri, înainte de orice." },
        { from: "guide", text: "Unu: nu ești singurul și nu ești doar bărbat. Femeile se luptă cu asta și sunt și mai singure, pentru că nimeni nu vorbește despre ele." },
        { from: "guide", text: "Doi: dacă nu mai poți opri sau dacă ai început să cauți lucruri tot mai dure, ai nevoie de un specialist, nu doar de rugăciune. Un psiholog nu înlocuiește credința; îți dă unelte." },
        { from: "guide", text: "Trei: dacă este vorba de materiale cu copii sau fără consimțământ, aceea nu este o luptă personală. Este o faptă penală, se oprește acum și se anunță." },
        { from: "guide", text: "Patru: dacă ești minor, spune-i unui adult în care ai încredere sau sună la 116 111. Nu ești în bucluc pentru că ceri ajutor." }
      ]
    },
    {
      id: "pg1_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Lumea spune: «nu face rău nimănui, e normal». Dacă ar fi așa, nu ai fi șters istoricul și nu ai fi închis ecranul când a intrat cineva în cameră." },
        { from: "guide", text: "Iar din biserică se aude: «roagă-te mai mult și postește». Rugăciunea și postul sunt bune și nu le scot de aici. Dar dacă ar fi fost de ajuns singure, ai fi ieșit demult." },
        { from: "guide", text: "Adevărul stă la mijloc și este mai puțin spectaculos: lucrarea lui Dumnezeu în tine, plus niște lucruri foarte practice, plus un om care știe." }
      ]
    },
    {
      id: "pg1_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: Dumnezeu știe deja. De ani de zile." },
        { from: "guide", text: "Nu Îl șochezi și nu Îl pierzi astăzi. Ceea ce ascunzi, ascunzi de oameni, nu de El." }
      ]
    },
    {
      id: "pg1_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Uită-te la două texte și vezi că nu ești o excepție rușinoasă în Biblie." },
        { from: "guide", text: "Pavel scrie la persoana întâi despre exact starea asta: fac ce urăsc. Nu o spune un păcătos oarecare, o spune apostolul." },
        { from: "guide", text: "Iar David descrie ce face tăcerea într-un om: îl macină pe dinăuntru. Și spune și ce a schimbat totul: a încetat să mai ascundă." }
      ]
    },
    {
      id: "pg1_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Căci nu știu ce fac: nu fac ce vreau, ci fac ce urăsc.",
        ref: "Romani 7:15"
      },
      bubbles: [
        { from: "guide", text: "«Fac ce urăsc.» Exact contradicția care te face să crezi că ești fățarnic. Nu ești fățarnic. Ești într-o luptă pe care Scriptura o recunoaște." }
      ]
    },
    {
      id: "pg1_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Câtă vreme am tăcut, mi se topeau oasele de gemetele mele necurmate.",
        ref: "Psalmul 32:3"
      },
      bubbles: [
        { from: "guide", text: "«Câtă vreme am tăcut.» Tăcerea nu este neutră. Are un preț și îl plătești în fiecare zi." }
      ]
    },
    {
      id: "pg1_9",
      type: "scripture",
      order: 9,
      scripture: {
        text: "Atunci Ți-am mărturisit păcatul meu și nu mi-am ascuns fărădelegea. Am zis: «Îmi voi mărturisi Domnului fărădelegile!» Și Tu ai iertat vina păcatului meu.",
        ref: "Psalmul 32:5"
      },
      bubbles: [
        { from: "guide", text: "Observă cât de scurt este drumul în verset. A spus și a fost iertat. Nu a fost o perioadă de probă." }
      ]
    },
    {
      id: "pg1_10",
      type: "name_struggle",
      order: 10,
      bubbles: [
        { from: "guide", text: "O singură întrebare astăzi, și nu despre păcat." },
        { from: "guide", text: "Când se întâmplă, de obicei? Seara târziu? Când ești singur în casă? După o zi grea? După o ceartă? Când te plictisești?" },
        { from: "guide", text: "Nu căutăm o scuză. Căutăm ora și locul. Cercul are un punct în care se închide mereu, și acolo se lucrează." }
      ]
    },
    {
      id: "pg1_11",
      type: "quiz",
      order: 11,
      quiz: {
        question: "Ce rol are rușinea de după, în cercul acesta?",
        options: [
          { text: "Este pedeapsa care, dacă este destul de mare, oprește repetarea", correct: false },
          { text: "De obicei îl împinge pe om înapoi, pentru că un om care se disprețuiește caută din nou ceva care să îl amorțească", correct: true },
          { text: "Nu are niciun rol; contează doar voința", correct: false }
        ],
        explanation: "Rușinea nu este același lucru cu pocăința. Pocăința spune «am făcut un lucru rău și mă întorc» și duce spre Dumnezeu. Rușinea spune «sunt un om rău» și duce spre ascunzătoare, adică exact spre locul în care cercul se închide din nou."
      }
    },
    {
      id: "pg1_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "Atunci Ți-am mărturisit păcatul meu și nu mi-am ascuns fărădelegea.",
        ref: "Psalmul 32:5"
      },
      bubbles: [
        { from: "guide", text: "Două verbe: am mărturisit, nu am ascuns. Cu ele începe ieșirea." }
      ]
    },
    {
      id: "pg1_13",
      type: "prayer",
      order: 13,
      bubbles: [
        { from: "guide", text: "«Doamne, știi de ani de zile și nu ai plecat. Nu Îți promit astăzi nimic, pentru că am mai promis. Îți cer doar să nu mă lași singur în asta. Amin.»" }
      ]
    },
    {
      id: "pg1_14",
      type: "journal",
      order: 14,
      journalPrompt: "Scrie ora și locul în care se întâmplă cel mai des. Și scrie ce simți cu zece minute înainte, nu în timp.",
      reward: { xp: 0, axisDeltas: { freedom: 1 } }
    }
  ]
}

export const pornografieL2: Lesson = {
  id: "pornografie_l2",
  courseId: "path_acasa",
  order: 42,
  title: "Ce rupe cercul",
  estMinutes: 11,
  anchorRefs: [
    "Proverbe 28:13",
    "Iacov 5:16",
    "1 Corinteni 10:13",
    "Iov 31:1",
    "Galateni 6:1"
  ],
  memoryVerseRef: "Iacov 5:16",
  steps: [
    {
      id: "pg2_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Ai scris ieri ora și locul. Astăzi lucrăm acolo." }
      ]
    },
    {
      id: "pg2_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Un singur lucru ține cercul în viață mai mult decât orice altceva: faptul că nu știe nimeni." },
        { from: "guide", text: "Nu pofta este combustibilul principal. Secretul este. Cât timp nu știe nimeni, nu se schimbă nimic, oricâte promisiuni ai face noaptea." },
        { from: "guide", text: "De aceea, cel mai greu pas nu este să nu te uiți. Este să spui unui om." }
      ]
    },
    {
      id: "pg2_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Cinci lucruri practice. Nu sunt spirituale și tocmai de aceea lipsesc de obicei." },
        { from: "guide", text: "Unu, omul: alege unul singur. Nu zece și nu grupul de pe telefon. Un om care nu se va îngrozi și nu va povesti mai departe. Dacă ești căsătorit, soțul sau soția poate fi al doilea pas, nu primul, și de preferat cu cineva de față." },
        { from: "guide", text: "Doi, dispozitivul: filtru pe telefon și pe calculator, iar telefonul încărcat în altă cameră peste noapte. Nu este lipsă de credință, este bun-simț. Nu ții sticla în casă dacă te lupți cu băutura." },
        { from: "guide", text: "Trei, ora: dacă se întâmplă după miezul nopții, problema este și ora de culcare. Culcă-te mai devreme o săptămână și vezi ce se schimbă." },
        { from: "guide", text: "Patru, golul: întreabă-te ce căutai de fapt. Odihnă? Alăturare? Să nu mai simți nimic o vreme? Pune ceva adevărat în locul acela, altfel rămâne gol și se umple singur." },
        { from: "guide", text: "Cinci, căderea: când recazi, nu se șterge tot. Te ridici și îi spui omului tău în aceeași zi, nu peste o lună." }
      ]
    },
    {
      id: "pg2_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        { from: "guide", text: "Se spune, și în biserică: «dacă ai căzut iar, înseamnă că nu ai fost sincer»." },
        { from: "guide", text: "Nu este adevărat. O deprindere veche de ani nu se rupe la o hotărâre. Se rupe la hotărâre plus timp, plus ajutor, plus niște lucruri schimbate în casă." },
        { from: "guide", text: "Și mai spune cineva: «nu contează, e în capul tău». Contează. Dar nu te definește." }
      ]
    },
    {
      id: "pg2_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: nu ieși singur și nu ieși într-o zi." },
        { from: "guide", text: "Nu îți promit că se termină repede. Îți spun că se poate și că alții au ieșit, pe drumul ăsta, nu pe altul." }
      ]
    },
    {
      id: "pg2_6",
      type: "how_god_helps",
      order: 6,
      bubbles: [
        { from: "guide", text: "Iacov așază mărturisirea reciprocă și rugăciunea în viața comunității. Nu este o formulă care garantează vindecarea după o singură conversație, dar arată limpede că lupta nu este făcută pentru ascundere." },
        { from: "guide", text: "Și mai spune ceva foarte concret: împreună cu ispita, Dumnezeu pregătește și mijlocul de ieșire. Mijlocul acela este de obicei banal: un telefon dat la timp, o ușă deschisă, o plimbare afară." },
        { from: "guide", text: "Iar Iov arată că se poate face un legământ cu ochii. Nu o dorință vagă. O hotărâre cu limite scrise." }
      ]
    },
    {
      id: "pg2_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Cine își ascunde fărădelegile nu propășește, dar cine le mărturisește și se lasă de ele capătă îndurare.",
        ref: "Proverbe 28:13"
      },
      bubbles: [
        { from: "guide", text: "Două lucruri stau împreună: mărturisirea și părăsirea păcatului. Proverbul nu le transformă într-o tehnică și nu promite că schimbarea va fi instantanee." }
      ]
    },
    {
      id: "pg2_8",
      type: "scripture",
      order: 8,
      scripture: {
        text: "Mărturisiți-vă unii altora păcatele și rugați-vă unii pentru alții, ca să fiți vindecați. Mare putere are rugăciunea fierbinte a celui neprihănit.",
        ref: "Iacov 5:16"
      },
      bubbles: [
        { from: "guide", text: "«Unii altora.» Nu «tuturor» și nu «de la amvon». Unui om potrivit." }
      ]
    },
    {
      id: "pg2_9",
      type: "scripture",
      order: 9,
      scripture: {
        text: "Nu v-a ajuns nicio ispită care să nu fi fost potrivită cu puterea omenească. Și Dumnezeu, care este credincios, nu va îngădui să fiți ispitiți peste puterile voastre; ci, împreună cu ispita, a pregătit și mijlocul să ieșiți din ea, ca s-o puteți răbda.",
        ref: "1 Corinteni 10:13"
      },
      bubbles: [
        { from: "guide", text: "«Mijlocul să ieșiți.» Există și de obicei apare devreme, nu în ultima secundă. Este momentul în care încă mai poți pune telefonul jos." }
      ]
    },
    {
      id: "pg2_10",
      type: "scripture",
      order: 10,
      scripture: {
        text: "Făcusem un legământ cu ochii mei și nu mi-aș fi oprit privirile asupra unei fecioare.",
        ref: "Iov 31:1"
      },
      bubbles: [
        { from: "guide", text: "Un om din vechime, fără ecrane, a socotit că privirea are nevoie de un legământ. Cu atât mai mult acum." }
      ]
    },
    {
      id: "pg2_11",
      type: "scripture",
      order: 11,
      scripture: {
        text: "Fraților, chiar dacă un om ar cădea deodată în vreo greșeală, voi, care sunteți duhovnicești, să-l ridicați cu duhul blândeții.",
        ref: "Galateni 6:1"
      },
      bubbles: [
        { from: "guide", text: "Pun versetul acesta pentru omul căruia îi vei spune. Dacă te-a strivit în loc să te ridice, nu tu ai greșit alegerea de a vorbi. Ai greșit omul." }
      ]
    },
    {
      id: "pg2_12",
      type: "name_struggle",
      order: 12,
      bubbles: [
        { from: "guide", text: "Un nume și o zi. Atât îți cer." },
        { from: "guide", text: "Cine este omul căruia îi vei spune și în ce zi din săptămâna asta?" },
        { from: "guide", text: "Nu trebuie să povestești tot. O propoziție ajunge: «Mă lupt cu pornografia de multă vreme și nu mai vreau să fiu singur în asta.»" }
      ]
    },
    {
      id: "pg2_13",
      type: "quiz",
      order: 13,
      quiz: {
        question: "Care este, după lecția asta, pasul care rupe cel mai tare cercul?",
        options: [
          { text: "O promisiune mai hotărâtă, făcută singur, noaptea", correct: false },
          { text: "Ieșirea din ascunzătoare către un singur om potrivit, plus câteva schimbări practice", correct: true },
          { text: "Așteptarea unei zile în care nu vei mai simți nicio ispită", correct: false }
        ],
        explanation: "Secretul hrănește lupta. Proverbe 28:13 ține împreună mărturisirea și părăsirea păcatului, iar Iacov 5:16 așază mărturisirea reciprocă lângă rugăciune. Niciun text nu promite o vindecare automată; responsabilitatea și schimbările practice scot însă lupta din izolare."
      }
    },
    {
      id: "pg2_14",
      type: "memory_verse",
      order: 14,
      scripture: {
        text: "Mărturisiți-vă unii altora păcatele și rugați-vă unii pentru alții, ca să fiți vindecați.",
        ref: "Iacov 5:16"
      },
      bubbles: [
        { from: "guide", text: "Ține minte cadrul: unii altora și rugăciune, nu singur în ascundere. Vindecarea rămâne lucrarea lui Dumnezeu, nu rezultatul mecanic al unei formule." }
      ]
    },
    {
      id: "pg2_15",
      type: "prayer",
      order: 15,
      bubbles: [
        { from: "guide", text: "«Doamne, m-am ascuns multă vreme și m-a costat. Dă-mi curaj pentru o singură propoziție spusă unui om și arată-mi mijlocul de ieșire când vine ceasul acela. Amin.»" }
      ]
    },
    {
      id: "pg2_16",
      type: "journal",
      order: 16,
      journalPrompt: "Scrie numele omului și ziua. Apoi scrie două schimbări practice pe care le faci astăzi în casă, nu mâine.",
      reward: { xp: 0, axisDeltas: { character: 1 } }
    }
  ]
}

export const PORNOGRAFIE_LESSONS: Lesson[] = [pornografieL1, pornografieL2]

/*
 * Practicile pentru ușa „pornografie", aliniate pe index cu lecțiile.
 * Niciuna nu cere numărarea zilelor curate și niciuna nu cere mărturisire
 * publică.
 */
export const PORNOGRAFIE_PRACTICES: string[] = [
  "Astăzi doar observă. Când vine gândul, uită-te la ceas și scrie ora. Nu te certa, doar scrie.",
  "Astăzi fă două lucruri: pune telefonul la încărcat în altă cameră peste noapte și trimite-i omului tău mesajul prin care ceri o întâlnire."
]
