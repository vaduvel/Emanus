import type { Lesson } from "../domain.js"

/*
 * Ușa „dependenta" — lecția de clarificare, în camera 5 (path_schimbare).
 *
 * De ce există lecția asta
 * ------------------------
 * Ușa „dependență" adună sub un singur cuvânt lucruri foarte diferite: alcool,
 * droguri, medicamente, jocuri de noroc, jocuri video, telefon, mâncare,
 * cumpărături, muncă. Unele omoară omul în câțiva ani. Altele îi fură doar
 * serile. Nu se pot trata la fel și nu se pot pune într-un singur parcurs
 * fără ca omul să își dea seama întâi unde stă.
 *
 * Lecția asta stă înaintea celorlalte din ușă. Nu vindecă nimic. Sortează.
 *
 * Cele trei întrebări
 * -------------------
 * Nu punem un diagnostic — nu avem dreptul și nu avem cum. Punem trei întrebări
 * pe care le pune și un medic la început:
 *   1. Crește? Îți trebuie tot mai mult pentru același efect?
 *   2. Continuă deși te costă? Bani, somn, oameni, sănătate, slujbă.
 *   3. Ce se întâmplă când te oprești? Aici se vede diferența dintre un obicei
 *      și o dependență a corpului.
 *
 * PUNCTUL DE SIGURANȚĂ CEL MAI IMPORTANT DIN TOT SETUL
 * ----------------------------------------------------
 * La alcool și la unele medicamente, oprirea bruscă, singur, acasă, poate fi
 * periculoasă pentru viață. Sevrajul nu este o chestiune de voință. De aceea
 * lecția spune limpede, de două ori, că pasul întâi este medicul, nu hotărârea
 * eroică de duminică seara. Aplicația nu ține locul unui medic (docs/22 §0).
 *
 * Ce nu face lecția
 * -----------------
 * 1. Nu spune «ești bolnav, deci nu ești responsabil» și nici «ești doar leneș».
 *    Amândouă sunt minciuni comode.
 * 2. Nu promite eliberare rapidă și nu numără zile curate (docs/22 §8).
 * 3. Nu cere omului să anunțe pe toată lumea. Cere un singur om.
 * 4. Nu atinge pornografia — aceea are ușa ei, în camera 1.
 *
 * Regula textului biblic
 * ----------------------
 * Toate versetele sunt verificate după Cornilescu 1924. Ioan 8:34 este citat
 * doar ca vorbire directă, fără rama „le-a răspuns", pentru că rama conține
 * Numele în forma din traducere. Eclesiastul 4:10 păstrează forma „să-l
 * ridice", cum stă în text; nu se desface în „să îl ridice".
 */

export const clarificareaDependenteiL1: Lesson = {
  id: "clarificarea_dependentei_l1",
  courseId: "path_schimbare",
  order: 21,
  title: "Ce fel de lanț este, de fapt",
  estMinutes: 12,
  anchorRefs: [
    "1 Corinteni 6:12",
    "Ioan 8:34",
    "Luca 15:17",
    "Ioan 8:36",
    "Eclesiastul 4:9-10"
  ],
  memoryVerseRef: "1 Corinteni 6:12",
  safety: {
    topic: "mental_health",
    notice: "Dacă bei zilnic sau iei de multă vreme medicamente liniștitoare, nu te opri singur și dintr-odată. La alcool și la unele medicamente, sevrajul poate pune viața în pericol și se face sub supravegherea unui medic. Emanus nu ține locul medicului. Pentru urgență, 112. Pentru sprijin emoțional, 116 123. Dacă ești minor, 116 111."
  },
  steps: [
    {
      id: "cd1_1",
      type: "check_in",
      order: 1,
      bubbles: [
        { from: "guide", text: "Ai deschis ușa pe care scrie «dependență». Înainte de orice, hai să vedem ce este în spatele ei la tine." },
        { from: "guide", text: "Sub același cuvânt stau lucruri foarte diferite. Lecția asta nu vindecă nimic. Doar sortează, ca să știi de unde se începe." }
      ]
    },
    {
      id: "cd1_2",
      type: "hook",
      order: 2,
      bubbles: [
        { from: "guide", text: "Cei mai mulți oameni stau ani întregi într-un loc ciudat: știu că este o problemă, dar nu știu cât de mare." },
        { from: "guide", text: "Într-o zi își spun «nu e nimic, mă opresc când vreau». A doua zi își spun «sunt terminat, nu mai am ce face». Și așa se leagănă între două minciuni." },
        { from: "guide", text: "Adevărul este aproape întotdeauna la mijloc și se poate afla. Astăzi îl aflăm." }
      ]
    },
    {
      id: "cd1_3",
      type: "step",
      order: 3,
      bubbles: [
        { from: "guide", text: "Întâi, spune ce anume. Nu «o problemă», ci lucrul." },
        { from: "guide", text: "Poate fi ceva care intră în corp: alcool, droguri, medicamente liniștitoare sau de somn, tutun." },
        { from: "guide", text: "Sau poate fi o purtare care se repetă: jocuri de noroc și păcănele, jocuri video, telefon și rețele, mâncare, cumpărături, muncă fără oprire." },
        { from: "guide", text: "Diferența contează enorm. Ce intră în corp poate schimba corpul, iar atunci oprirea nu mai este doar o hotărâre. Ce se repetă ca purtare schimbă mai întâi obiceiul și timpul." },
        { from: "guide", text: "Dacă lucrul tău este pornografia, are ușa ei aparte și acolo se vorbește pe îndelete. Aici rămânem la restul." }
      ]
    },
    {
      id: "cd1_4",
      type: "step",
      order: 4,
      bubbles: [
        { from: "guide", text: "Acum lucrul cel mai important din toată lecția. Citește-l de două ori." },
        { from: "guide", text: "Dacă bei zilnic, sau de ani de zile, sau dacă iei de multă vreme medicamente liniștitoare ori de somn, nu te opri singur și dintr-odată." },
        { from: "guide", text: "La alcool și la unele medicamente, oprirea bruscă poate da tremur, convulsii și stări care pun viața în pericol. Asta nu este slăbiciune și nu se rezolvă cu voință. Se numește sevraj și se face sub ochii unui medic." },
        { from: "guide", text: "Deci pasul întâi nu este hotărârea eroică de duminică seara. Pasul întâi este o programare." },
        { from: "guide", text: "Nu țin locul unui medic și nu îți spun eu ce ai. Îți spun doar că acolo se începe." }
      ]
    },
    {
      id: "cd1_5",
      type: "step",
      order: 5,
      bubbles: [
        { from: "guide", text: "Trei întrebări. Răspunde-ți sincer, nu îmi răspunzi mie." },
        { from: "guide", text: "Una: crește? Îți trebuie tot mai mult, tot mai des, ca să simți ce simțeai la început?" },
        { from: "guide", text: "Două: continuă deși te costă? Bani care nu mai ajung, somn pierdut, cineva care a plâns din pricina asta, o slujbă scăpată, analize proaste." },
        { from: "guide", text: "Trei: ce se întâmplă când te oprești? Dacă apar doar plictiseala și pofta, este un obicei greu. Dacă apar tremur, transpirații, greață, panică, insomnie rea, atunci corpul tău a intrat în joc și ai nevoie de un medic." },
        { from: "guide", text: "Și o întrebare de control, cea mai grea: cui ai ascuns cât consumi cu adevărat?" }
      ]
    },
    {
      id: "cd1_6",
      type: "world_vs_truth",
      order: 6,
      bubbles: [
        { from: "guide", text: "Două explicații circulă peste tot și amândouă sunt comode." },
        { from: "guide", text: "Prima: «ești doar leneș și fără caracter, strânge din dinți». Asta nu explică de ce oameni cu voință de fier cad exact aici." },
        { from: "guide", text: "A doua: «este o boală, deci nu ai ce face și nu răspunzi de nimic». Asta te scutește de rușine și, în același timp, de speranță." },
        { from: "guide", text: "Adevărul le taie pe amândouă: este și o robie reală a corpului și a minții, și o serie de alegeri care se pot schimba. Se lucrează și cu medicul, și cu Dumnezeu, și cu oamenii." }
      ]
    },
    {
      id: "cd1_7",
      type: "truth_simple",
      order: 7,
      bubbles: [
        { from: "guide", text: "Adevărul de astăzi: nu ești nici doar slăbănog, nici doar bolnav. Ești un om ținut de ceva, iar strânsoarea aceea poate slăbi." },
        { from: "guide", text: "Dar mai întâi trebuie să vezi limpede ce te ține. Nu se scoate un cui pe care nu îl privești." }
      ]
    },
    {
      id: "cd1_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        { from: "guide", text: "Ce face Dumnezeu aici, pe îndelete." },
        { from: "guide", text: "Întâi îți dă numele corect al lucrului. Scriptura nu spune «ai o mică slăbiciune». Spune robie. Cuvântul doare, dar te scoate din ceață." },
        { from: "guide", text: "Apoi îți dă clipa în care îți vii în fire. În povestea fiului risipitor, întoarcerea nu începe cu o hotărâre măreață, ci cu un om care se trezește și își vede locul." },
        { from: "guide", text: "Apoi îți trimite oameni. Nimeni nu iese singur din așa ceva și nici nu ți se cere." }
      ]
    },
    {
      id: "cd1_9",
      type: "scripture",
      order: 9,
      scripture: {
        text: "Toate lucrurile îmi sunt îngăduite, dar nu toate sunt de folos; toate lucrurile îmi sunt îngăduite, dar nimic nu trebuie să pună stăpânire pe mine.",
        ref: "1 Corinteni 6:12"
      },
      bubbles: [
        { from: "guide", text: "Aici este definiția, și este mai veche decât orice manual: nu contează doar dacă lucrul este îngăduit, ci cine pe cine stăpânește." },
        { from: "guide", text: "Pune întrebarea așa și răspunsul vine repede: eu îl țin pe el, sau el mă ține pe mine?" }
      ]
    },
    {
      id: "cd1_10",
      type: "scripture",
      order: 10,
      scripture: {
        text: "Adevărat, adevărat vă spun că oricine trăiește în păcat este rob al păcatului.",
        ref: "Ioan 8:34"
      },
      bubbles: [
        { from: "guide", text: "Cuvântul este «rob», nu «om cu un mic viciu». Știu că sună aspru. Dar un om care se crede liber nu cere niciodată ajutor." }
      ]
    },
    {
      id: "cd1_11",
      type: "scripture",
      order: 11,
      scripture: {
        text: "Și-a venit în fire și a zis: «Câți argați ai tatălui meu au belșug de pâine, iar eu mor de foame aici!»",
        ref: "Luca 15:17"
      },
      bubbles: [
        { from: "guide", text: "Asta faci tu astăzi. Nu ai plecat încă nicăieri și nu ai reparat nimic. Doar ți-ai venit în fire." },
        { from: "guide", text: "Și totuși de aici a început toată întoarcerea lui." }
      ]
    },
    {
      id: "cd1_12",
      type: "scripture",
      order: 12,
      scripture: {
        text: "Deci, dacă Fiul vă face slobozi, veți fi cu adevărat slobozi.",
        ref: "Ioan 8:36"
      },
      bubbles: [
        { from: "guide", text: "«Cu adevărat», adică nu doar oprit o vreme, cu dinții strânși și cu mâna tremurând." },
        { from: "guide", text: "Nu îți spun când și nici că va fi ușor. Îți spun că se poate și că nu depinde numai de puterea ta." }
      ]
    },
    {
      id: "cd1_13",
      type: "scripture",
      order: 13,
      scripture: {
        text: "Mai bine doi decât unul, căci iau o plată cu atât mai bună pentru munca lor. Căci, dacă se întâmplă să cadă, se ridică unul pe altul; dar vai de cine este singur și cade fără să aibă pe altul care să-l ridice!",
        ref: "Eclesiastul 4:9-10"
      },
      bubbles: [
        { from: "guide", text: "Nu scrie «vai de cine cade». Scrie «vai de cine cade singur». Toată diferența stă într-un cuvânt." },
        { from: "guide", text: "De aceea pasul următor, după medic, este un singur om care să știe adevărul întreg. Unul, nu zece." }
      ]
    },
    {
      id: "cd1_14",
      type: "name_struggle",
      order: 14,
      bubbles: [
        { from: "guide", text: "Acum spune-o întreagă, o singură dată, ca la doctor." },
        { from: "guide", text: "Ce anume, de cât timp, cât într-o zi obișnuită și ce te-a costat până acum." },
        { from: "guide", text: "Fără să rotunjești în jos. Cifra pe care ai spune-o unui prieten nu este cifra adevărată, și tu știi asta." }
      ]
    },
    {
      id: "cd1_15",
      type: "quiz",
      order: 15,
      quiz: {
        question: "Bei zilnic de câțiva ani și vrei să te oprești. Cu ce începi?",
        options: [
          { text: "Te oprești brusc, singur acasă, ca să îți dovedești că poți", correct: false },
          { text: "Mergi întâi la un medic, pentru că la alcool sevrajul poate fi periculos, și spui adevărul întreg unui om de încredere", correct: true },
          { text: "Aștepți să îți dea Dumnezeu putere și nu spui nimănui, ca să nu fii judecat", correct: false }
        ],
        explanation: "La alcool și la unele medicamente, oprirea bruscă fără supraveghere poate pune viața în pericol; de aceea primul pas este medicul. Iar Eclesiastul 4:10 nu spune «vai de cine cade», ci «vai de cine este singur și cade»: rugăciunea și ajutorul omenesc nu se exclud, merg împreună."
      }
    },
    {
      id: "cd1_16",
      type: "memory_verse",
      order: 16,
      scripture: {
        text: "Toate lucrurile îmi sunt îngăduite, dar nu toate sunt de folos; toate lucrurile îmi sunt îngăduite, dar nimic nu trebuie să pună stăpânire pe mine.",
        ref: "1 Corinteni 6:12"
      },
      bubbles: [
        { from: "guide", text: "Ține minte ultima jumătate. Este cea mai bună întrebare pe care ți-o poți pune despre orice, toată viața." }
      ]
    },
    {
      id: "cd1_17",
      type: "prayer",
      order: 17,
      bubbles: [
        { from: "guide", text: "«Doamne, nu mai vreau să mă mint. Iată ce mă ține și de cât timp. Îți cer două lucruri: să văd limpede și să am curaj să cer ajutor de la un om și de la un medic. Amin.»" }
      ]
    },
    {
      id: "cd1_18",
      type: "journal",
      order: 18,
      journalPrompt: "Scrie răspunsul la cele trei întrebări: crește? continuă deși te costă? ce se întâmplă când te oprești? Apoi scrie numele omului căruia îi spui adevărul întreg și ziua în care îi spui.",
      reward: { xp: 0, axisDeltas: { freedom: 1 } }
    }
  ]
}

export const CLARIFICAREA_DEPENDENTEI_LESSONS: Lesson[] = [
  clarificareaDependenteiL1
]

/*
 * Practica ușii, aliniată pe index cu lecția. Nu numără zile și nu cere
 * abstinență într-o zi — cere un singur pas verificabil.
 */
export const CLARIFICAREA_DEPENDENTEI_PRACTICES: string[] = [
  "Astăzi fă un singur lucru concret: caută numărul unui medic de familie sau al unui centru de sprijin și scrie-l undeva la vedere. Doar numărul, astăzi."
]
