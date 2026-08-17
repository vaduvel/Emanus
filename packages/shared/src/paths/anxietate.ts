import type { Lesson } from "../domain.js"

/*
 * path_anxietate — „Nu-mi găsesc liniștea”
 *
 * PERECHEA LUI tristete.ts, ȘI MOTIVUL PENTRU CARE SUNT DOUĂ FIȘIERE
 * Decizia 7 din documentul canonic de rutare: anxietatea și tristețea ies din
 * `path_schimbare` prin două trasee DISTINCTE. Documentul anticipează exact
 * greșeala pe care era s-o facem: „ar fi o ironie să le dăm aceeași lecție, când
 * defectul pe care îl reparăm este tocmai că doorEntries le trimite pe amândouă
 * în s1c_b”. `path_greutate`, pe care l-am scris eu mai devreme pe ramura asta cu
 * șapte lecții comune pentru amândouă, reproducea ironia cu un nivel mai sus.
 * Se retrage în favoarea celor două fișiere.
 *
 * DIFERENȚA DE FOND, NU DE ETICHETĂ
 * Tristețea a pierdut ceva și nu mai vrea nimic. Anxietatea n-a pierdut încă nimic
 * și se teme de tot. Una are nevoie de însoțire și de triaj. Cealaltă are nevoie de
 * hotar pus în timp — următoarele douăzeci și patru de ore — și de trup liniștit.
 * Lecțiile nu se împrumută între cele două fișiere.
 *
 * CE CERE DOCUMENTUL AICI, PUNCT CU PUNCT
 * • frica nu este automat păcat și nu e dovada unei credințe insuficiente → L1
 * • trup, respirație, odihnă → L2
 * • următoarele douăzeci și patru de ore → L3
 * • ajutor competent → L5
 * • INTERZIS: „schimbarea comportamentului ca ramă”. Drumul acesta nu e un program
 *   de corectare a omului. Nu i se dă de îndreptat nimic. Dacă cineva adaugă aici
 *   un plan de disciplină personală, a mutat ușa înapoi în `path_schimbare`.
 *
 * CONFIGURARE, NU CONȚINUT (se face în paths/index.ts, nu aici)
 * `entryState: { status: "provisional", issueNumber, reason }`, `offerAtPathEnd: false`,
 * și o încheiere proprie care oferă Azi, Biblia, Ajutor și Rugăciuni. Atenție:
 * `shouldInviteFirstPrayer()` cere `lessonsDone >= 2`, deci invitația la Rugăciuni
 * nu se declanșează singură pe un drum scurt. Se pune explicit în încheiere.
 *
 * REVIZIA CLINICĂ SE OBȚINE ÎNAINTE DE MERGE, NU DUPĂ.
 *
 * VERSETELE
 * Isaia 41:10, 1 Regi 19:5-6, Matei 6:34, Filipeni 4:6-7 și 1 Petru 5:7, Cornilescu
 * 1924, verificate cuvânt cu cuvânt înainte de scriere. Redarea „Iisus” urmează
 * convenția repo-ului, care o folosește și în citate (vezi neiertareC.ts, Filipeni 1:6).
 */

export const anxietateL1: Lesson = {
  id: "anxietate_l1",
  courseId: "path_anxietate",
  order: 1,
  title: "Frica nu e dovada că ai credință puțină",
  estMinutes: 11,
  anchorRefs: ["Isaia 41:10"],
  memoryVerseRef: "Isaia 41:10",
  safety: {
    topic: "mental_health",
    notice:
      "Atacurile de panică și anxietatea care nu trece se tratează. Emanus nu înlocuiește medicul sau psihologul.",
  },
  steps: [
    {
      id: "anx1_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Ai deschis ușa pe care scrie că nu-ți găsești liniștea." }],
    },
    {
      id: "anx1_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Încep cu ce ți s-a spus, probabil, și ce te-a făcut să taci: «un creștin adevărat n-ar avea de ce să se teamă».",
        },
        { from: "guide", text: "Propoziția asta a făcut mult rău și nu se sprijină pe nimic." },
      ],
    },
    {
      id: "anx1_3",
      type: "world_vs_truth",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "În Biblie, «nu te teme» apare de sute de ori. Uită-te la cine se spune și când.",
        },
        {
          from: "guide",
          text: "Nu se spune unor oameni care se temeau degeaba. Se spune unor oameni care aveau motive foarte serioase, în fața unor lucruri foarte reale.",
        },
        {
          from: "guide",
          text: "Faptul că frica apare nu dovedește singur un păcat sau o credință mică. Scriptura mustră uneori necredința, dar nu ne dă voie să numim orice panică neascultare și nici să punem un diagnostic spiritual peste o suferință care poate avea cauze medicale.",
        },
      ],
    },
    {
      id: "anx1_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "Nu te teme, căci Eu sunt cu tine; nu te uita cu îngrijorare, căci Eu sunt Dumnezeul tău; Eu te întăresc, tot Eu îți vin în ajutor. Eu te sprijin cu dreapta Mea biruitoare.",
        ref: "Isaia 41:10",
      },
    },
    {
      id: "anx1_5",
      type: "how_god_helps",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Citește ce vine după «nu te teme». Nu vine un reproș. Nu vine «ai fi putut evita». Nu vine nici măcar o explicație.",
        },
        {
          from: "guide",
          text: "Vine o prezență. «Eu sunt cu tine.» Și pe urmă patru lucruri pe care le face El, nu tu: te întăresc, îți vin în ajutor, te sprijin.",
        },
        {
          from: "guide",
          text: "În tot versetul, singurul lucru pe care îl ai tu de făcut e să fii sprijinit.",
        },
      ],
    },
    {
      id: "anx1_6",
      type: "truth_simple",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Deci nu începem prin a-ți repara credința. Credința ta nu e problema de rezolvat aici.",
        },
        {
          from: "guide",
          text: "Începem prin a-ți da înapoi dreptul de a spune că ți-e frică, fără să te simți vinovat că o spui.",
        },
      ],
    },
    {
      id: "anx1_7",
      type: "step",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Și încă ceva, spus limpede de la început, ca să nu rămână nelămurit.",
        },
        {
          from: "guide",
          text: "Dacă ai avut vreodată momente în care ți s-a tăiat respirația, ți-a bătut inima să-ți sară din piept și ai crezut că mori — aceea are un nume, se cheamă atac de panică, și se tratează.",
        },
        {
          from: "guide",
          text: "Nu e slăbiciune de caracter și nu e lipsă de rugăciune. Mergi la un medic sau la un psiholog. Drumul ăsta merge în paralel cu îngrijirea, nu în locul ei.",
        },
        {
          from: "guide",
          text: "Iar dacă ajungi vreodată să simți că nu mai poți ține deloc: 112, sau 116 123 dacă vrei doar să vorbești cu cineva.",
        },
      ],
    },
    {
      id: "anx1_8",
      type: "memory_verse",
      order: 8,
      scripture: {
        text: "Nu te teme, căci Eu sunt cu tine.",
        ref: "Isaia 41:10",
      },
    },
    {
      id: "anx1_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, mi-e frică și m-am săturat să mă mai rușinez că mi-e frică. Arată-mi ce trebuie mărturisit și ce trebuie dus la un medic sau la un om competent. Fii cu mine. Atât Îți cer în seara asta. Amin.",
        },
      ],
    },
    {
      id: "anx1_10",
      type: "journal",
      order: 10,
      journalPrompt: "Cine ți-a spus că frica ta e o problemă de credință? Scrie și lasă aici.",
      reward: { xp: 0, axisDeltas: { emotional_peace: 1 } },
    },
  ],
}

export const anxietateL2: Lesson = {
  id: "anxietate_l2",
  courseId: "path_anxietate",
  order: 2,
  title: "Trupul tău nu te minte",
  estMinutes: 11,
  anchorRefs: ["1 Regi 19:5-6"],
  memoryVerseRef: "1 Regi 19:5",
  steps: [
    {
      id: "anx2_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum ai dormit?" }],
    },
    {
      id: "anx2_2",
      type: "name_struggle",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Anxietatea nu stă doar în cap. Stă în umăr, în stomac, în fălci, în respirația care s-a făcut scurtă fără să bagi de seamă.",
        },
        {
          from: "guide",
          text: "Și uite ce se poate întâmpla: trupul intră în alarmă, iar mintea caută un motiv și poate lega alarma de primul pericol pe care îl găsește. Așa se poate învârti roata.",
        },
      ],
    },
    {
      id: "anx2_3",
      type: "world_vs_truth",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "Ni s-a spus că lucrurile duhovnicești sunt sus și trupul e jos, iar dacă ești om serios te ocupi de ce e sus.",
        },
        {
          from: "guide",
          text: "Prima grijă a lui Dumnezeu pentru un om prăbușit n-a fost o învățătură.",
        },
      ],
    },
    {
      id: "anx2_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "Iată, l-a atins un înger și i-a zis: «Scoală-te și mănâncă.» El s-a uitat și la căpătâiul lui era o turtă coaptă pe niște pietre încălzite și un ulcior cu apă.",
        ref: "1 Regi 19:5-6",
      },
    },
    {
      id: "anx2_5",
      type: "how_god_helps",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Ilie fugise de frică și ceruse să moară. A primit somn, o turtă și un ulcior cu apă. De două ori. Și abia mult mai târziu a venit vorba.",
        },
        {
          from: "guide",
          text: "Dacă Dumnezeu a început de la trup, poți și tu, fără să crezi că e o soluție de mâna a doua.",
        },
      ],
    },
    {
      id: "anx2_6",
      type: "step",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Un lucru de folosit când te prinde. Nu ca să te vindeci, ci ca să oprești roata pentru un minut.",
        },
        {
          from: "guide",
          text: "Respiră pe nas numărând până la patru. Ține puțin. Scoate aerul pe gură, mai lung decât l-ai luat, numărând până la șase. De patru ori.",
        },
        {
          from: "guide",
          text: "Expirația mai lungă decât inspirația — asta e tot. Trupului i se spune, pe limba lui, că alarma poate coborî.",
        },
      ],
    },
    {
      id: "anx2_7",
      type: "truth_simple",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Să fim cinstiți: respirația nu rezolvă ce te sperie. Nu plătește chiria și nu aduce rezultatul de la analize.",
        },
        {
          from: "guide",
          text: "Dar îți dă înapoi minutul în care poți gândi. Și azi atât ne trebuie.",
        },
      ],
    },
    {
      id: "anx2_8",
      type: "memory_verse",
      order: 8,
      scripture: {
        text: "Scoală-te și mănâncă.",
        ref: "1 Regi 19:5",
      },
    },
    {
      id: "anx2_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, m-ai făcut cu trup și Știi că obosește. Ia-mi alarma din piept cât să pot respira. Și învață-mă să nu mă rușinez că am nevoie de somn și de mâncare ca oricare om. Amin.",
        },
      ],
    },
    {
      id: "anx2_10",
      type: "journal",
      order: 10,
      journalPrompt: "Unde în trup simți întâi că vine? Umăr, stomac, piept, fălci? Scrie, ca să recunoști semnul data viitoare.",
      reward: { xp: 0, axisDeltas: { emotional_peace: 1 } },
    },
  ],
}

export const anxietateL3: Lesson = {
  id: "anxietate_l3",
  courseId: "path_anxietate",
  order: 3,
  title: "Doar până mâine dimineață",
  estMinutes: 11,
  anchorRefs: ["Matei 6:34"],
  memoryVerseRef: "Matei 6:34",
  steps: [
    {
      id: "anx3_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Ai apucat să încerci respirația?" }],
    },
    {
      id: "anx3_2",
      type: "name_struggle",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Anxietatea mută adesea mintea din ce este real acum spre ce s-ar putea întâmpla mai târziu. Uneori însă pericolul este prezent și atunci nu îl negăm: căutăm siguranță și ajutor concret.",
        },
        {
          from: "guide",
          text: "Pleacă de la ceva mic de azi și în douăzeci de secunde ești în octombrie, la un scenariu care nu s-a întâmplat, cu oameni care n-au spus nimic încă.",
        },
        {
          from: "guide",
          text: "Iar acolo, în viitorul ăla, nu ai nici o unealtă. N-ai cum să ai. Nu ești acolo.",
        },
      ],
    },
    {
      id: "anx3_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Nu vă îngrijorați dar de ziua de mâine; căci ziua de mâine se va îngrijora de ea însăși. Ajunge zilei necazul ei.",
        ref: "Matei 6:34",
      },
    },
    {
      id: "anx3_4",
      type: "how_god_helps",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Observă ce nu spune. Nu spune că mâine e bine. Nu spune că n-o să fie necaz. «Ajunge zilei necazul ei» — deci recunoaște că e necaz și azi, și mâine.",
        },
        {
          from: "guide",
          text: "Ce spune e altceva: nu-l căra pe cel de mâine astăzi. Nu pentru că nu există, ci pentru că harul pentru el nu ți-a fost dat încă.",
        },
      ],
    },
    {
      id: "anx3_5",
      type: "step",
      order: 5,
      bubbles: [
        { from: "guide", text: "Pasul de azi, și ăsta rămâne cu tine după ce se termină drumul." },
        {
          from: "guide",
          text: "Când te ia, pune-ți o singură întrebare: se întâmplă în următoarele douăzeci și patru de ore?",
        },
        {
          from: "guide",
          text: "Dacă da, e treabă de făcut. Fă primul lucru din ea, oricât de mic, acum.",
        },
        {
          from: "guide",
          text: "Dacă nu, spune cu voce tare: «asta nu e de azi». Și las-o jos. O să revină de zece ori. O lași jos de zece ori. Nu e eșec, e antrenament.",
        },
      ],
    },
    {
      id: "anx3_6",
      type: "quiz",
      order: 6,
      quiz: {
        question: "Te gândești la o discuție grea care are loc peste trei săptămâni. Ce faci?",
        options: [
          { text: "O repet în cap până găsesc toate variantele — așa mă pregătesc", correct: false },
          {
            text: "Nu e în următoarele 24 de ore — o notez undeva și o las jos, iar dacă revine o las jos din nou",
            correct: true,
          },
          { text: "Încerc să nu mă mai gândesc deloc la ea", correct: false },
        ],
        explanation:
          "Repetatul în cap nu e pregătire, e consum. Iar «nu te mai gândi» nu se poate face la comandă. A treia cale e să recunoști că nu e de azi și s-o lași jos de fiecare dată când revine.",
      },
    },
    {
      id: "anx3_7",
      type: "memory_verse",
      order: 7,
      scripture: {
        text: "Ajunge zilei necazul ei.",
        ref: "Matei 6:34",
      },
    },
    {
      id: "anx3_8",
      type: "prayer",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, m-am dus iar în săptămâna care n-a venit. Adu-mă înapoi în ziua de azi. Dă-mi cât îmi trebuie până diseară, și atât Îți cer. Amin.",
        },
      ],
    },
    {
      id: "anx3_9",
      type: "journal",
      order: 9,
      journalPrompt: "Scrie lucrul care te roade acum. Și sub el, un singur cuvânt: azi, sau nu azi.",
      reward: { xp: 0, axisDeltas: { emotional_peace: 1 } },
    },
  ],
}

export const anxietateL4: Lesson = {
  id: "anxietate_l4",
  courseId: "path_anxietate",
  order: 4,
  title: "Ce faci cu grija, concret",
  estMinutes: 11,
  anchorRefs: ["Filipeni 4:6-7"],
  memoryVerseRef: "Filipeni 4:7",
  steps: [
    {
      id: "anx4_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "A patra zi. Ai reușit să lași ceva jos?" }],
    },
    {
      id: "anx4_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Astăzi luăm versetul care se citește cel mai des oamenilor anxioși — și care le face cel mai des rău, pentru că se citește doar pe jumătate.",
        },
      ],
    },
    {
      id: "anx4_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Nu vă îngrijorați de nimic, ci, în orice lucru, aduceți cererile voastre la cunoștința lui Dumnezeu, prin rugăciuni și cereri, cu mulțumiri. Și pacea lui Dumnezeu, care întrece orice pricepere, vă va păzi inimile și gândurile în Hristos Iisus.",
        ref: "Filipeni 4:6-7",
      },
    },
    {
      id: "anx4_4",
      type: "world_vs_truth",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Cei mai mulți aud doar primele patru cuvinte și pleacă cu o poruncă imposibilă în spate: «nu te îngrijora». Ca și cum ai putea, la comandă.",
        },
        {
          from: "guide",
          text: "Dar propoziția nu se oprește acolo. Are un «ci». Și între cele două jumătăți stă toată diferența.",
        },
      ],
    },
    {
      id: "anx4_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Nu ți se cere să oprești grija. Ți se cere s-o muți. Din capul tău, unde se rotește, în cuvinte spuse lui Dumnezeu.",
        },
        {
          from: "guide",
          text: "Iar rezultatul promis nu e că se rezolvă situația. Citește încă o dată: e pace care păzește inima și gândurile. Adică pază în timp ce lucrul e încă nelămurit.",
        },
      ],
    },
    {
      id: "anx4_6",
      type: "step",
      order: 6,
      bubbles: [
        { from: "guide", text: "Pasul de azi. Ia hârtie și scrie, unul sub altul, lucrurile care te țin treaz. Toate. Nu le aranja frumos." },
        {
          from: "guide",
          text: "Pe urmă marchează ce cere un pas în următoarele douăzeci și patru de ore. Uneori lista se scurtează, alteori rămâne grea; scopul nu este să negi problemele, ci să vezi ce poți face astăzi și ce trebuie încredințat ori cerut ca ajutor.",
        },
        {
          from: "guide",
          text: "Ce a rămas, citește-i lui Dumnezeu cu voce tare, ca pe o listă. Fără introducere și fără cuvinte alese. Asta e «aduceți cererile la cunoștința lui Dumnezeu».",
        },
      ],
    },
    {
      id: "anx4_7",
      type: "how_god_helps",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Mai e un cuvânt acolo, ușor de sărit: «cu mulțumiri».",
        },
        {
          from: "guide",
          text: "Nu înseamnă să te prefaci că-ți pare bine. Înseamnă să adaugi la sfârșit un singur lucru care a mers azi. Unul. Anxietatea nu-l vede singură și trebuie spus cu gura.",
        },
      ],
    },
    {
      id: "anx4_8",
      type: "memory_verse",
      order: 8,
      scripture: {
        text: "Și pacea lui Dumnezeu, care întrece orice pricepere, vă va păzi inimile și gândurile în Hristos Iisus.",
        ref: "Filipeni 4:7",
      },
    },
    {
      id: "anx4_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, Îți citesc lista. Nu Știu ce faci cu ea și nu-Ți cer să rezolvi totul până mâine. Vreau doar să nu mai fie numai în capul meu. Și Îți mulțumesc pentru lucrul care a mers azi. Amin.",
        },
      ],
    },
    {
      id: "anx4_10",
      type: "journal",
      order: 10,
      journalPrompt: "Câte rânduri ai tăiat și câte au rămas?",
      reward: { xp: 0, axisDeltas: { living_faith: 1 } },
    },
  ],
}

export const anxietateL5: Lesson = {
  id: "anxietate_l5",
  courseId: "path_anxietate",
  order: 5,
  title: "Nu e făcut să fie dus singur",
  estMinutes: 11,
  anchorRefs: ["1 Petru 5:7", "Isaia 41:10"],
  memoryVerseRef: "1 Petru 5:7",
  safety: {
    topic: "mental_health",
    notice:
      "Lecția aceasta vorbește despre ajutor medical și psihologic. Emanus nu dă diagnostic și nu recomandă tratamente.",
  },
  steps: [
    {
      id: "anx5_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Ultima zi din drumul ăsta." }],
    },
    {
      id: "anx5_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "N-o să-ți spun că de mâine ești liniștit. Ar fi o minciună și ai mai auzit-o.",
        },
        {
          from: "guide",
          text: "Îți spun ce rămâne în mâna ta și unde te duci dacă nu ajunge.",
        },
      ],
    },
    {
      id: "anx5_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Și aruncați asupra Lui toate îngrijorările voastre, căci El Însuși îngrijește de voi.",
        ref: "1 Petru 5:7",
      },
    },
    {
      id: "anx5_4",
      type: "how_god_helps",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "«Aruncați» e un cuvânt violent, și bine că e. Nu «puneți frumos deoparte». Aruncă, ca pe un sac de pe umeri, când nu mai poți.",
        },
        {
          from: "guide",
          text: "Și motivul nu e că grija ta e prostească. Motivul e la sfârșit: «căci El Însuși îngrijește de voi». Se poate arunca pentru că există cineva care prinde.",
        },
      ],
    },
    {
      id: "anx5_5",
      type: "step",
      order: 5,
      bubbles: [
        { from: "guide", text: "Ce rămâne cu tine, patru lucruri, în ordinea în care se folosesc:" },
        {
          from: "guide",
          text: "Respirația, când te prinde. Întrebarea — e în următoarele douăzeci și patru de ore? Lista citită cu voce tare, când nu poți dormi. Și lucrul care a mers azi, spus cu gura.",
        },
      ],
    },
    {
      id: "anx5_6",
      type: "step",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Iar acum partea pe care unii o să vrea s-o săriți, și tocmai de asta o pun la sfârșit, unde se ține minte.",
        },
        {
          from: "guide",
          text: "Dacă anxietatea îți strică somnul, munca sau relațiile, sau dacă ai atacuri de panică — mergi la un medic sau la un psiholog. Nu peste încă un an.",
        },
        {
          from: "guide",
          text: "A cere ajutor priceput nu e înfrângere duhovnicească. Ai văzut ce a trimis Dumnezeu întâi când un profet a vrut să moară: mâncare și somn. Ajutorul potrivit, la vremea potrivită, nu e mai puțin de la El pentru că vine printr-un om.",
        },
      ],
    },
    {
      id: "anx5_7",
      type: "truth_simple",
      order: 7,
      bubbles: [
        {
          from: "guide",
          text: "Și dacă peste două săptămâni ești tot acolo, nu înseamnă că n-ai crezut destul.",
        },
        {
          from: "guide",
          text: "Înseamnă că ești un om, într-o lume care apasă, și că Cel care spune «Eu sunt cu tine» n-a plecat nicăieri între timp.",
        },
      ],
    },
    {
      id: "anx5_8",
      type: "memory_verse",
      order: 8,
      scripture: {
        text: "Și aruncați asupra Lui toate îngrijorările voastre, căci El Însuși îngrijește de voi.",
        ref: "1 Petru 5:7",
      },
    },
    {
      id: "anx5_9",
      type: "prayer",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, arunc asupra Ta ce car de luni de zile. Dacă mâine îl iau înapoi, adu-mi aminte de seara asta. Și dă-mi înțelepciunea să cer ajutor de la oamenii care știu să ajute. Amin.",
        },
      ],
    },
    {
      id: "anx5_10",
      type: "journal",
      order: 10,
      journalPrompt: "Ce e altfel azi față de ziua întâi? Și ce faci săptămâna asta, dacă nu e altfel?",
      reward: { xp: 0, axisDeltas: { emotional_peace: 1 } },
    },
  ],
}

export const ANXIETATE_LESSONS: Lesson[] = [
  anxietateL1,
  anxietateL2,
  anxietateL3,
  anxietateL4,
  anxietateL5,
]

/*
 * Practicile drumului. Index-aliniate cu lecțiile.
 * Regula acestui drum: fiecare practică se termină într-un minut și se poate face
 * în picioare, în autobuz, la trei noaptea. O practică ce cere liniște și timp e
 * scrisă pentru alt om decât cel care intră pe ușa asta.
 */
export const ANXIETATE_PRACTICES: string[] = [
  "Când îți vine gândul că frica ta e o problemă de credință, spune: «Eu sunt cu tine — asta a fost răspunsul, nu un reproș».",
  "Patru respirații. Pe nas până la patru, afară pe gură până la șase. Expirația mai lungă decât inspirația.",
  "Întrebarea: se întâmplă în următoarele douăzeci și patru de ore? Dacă nu — «asta nu e de azi», cu voce tare.",
  "Seara, lista citită cu voce tare. La sfârșit, un singur lucru care a mers azi.",
  "O dată pe săptămână, întrebarea cinstită: îmi strică somnul, munca sau relațiile? Dacă da, fac programarea.",
]
