import type { Lesson } from "../domain.js"

/*
 * Parcursul "Neiertare" — lecțiile 4-5 (pașii 4-5 din schelet: de ce e totul rupt,
 * și ce a făcut El). De aici încolo conținutul nu mai variază pe ușă — crucea e
 * aceeași pentru toată lumea. Vezi docs/20 §2.
 */

export const neiertareL4: Lesson = {
  id: "neiertare_l4",
  courseId: "path_neiertare",
  order: 4,
  title: "Nu știau ce fac",
  estMinutes: 11,
  anchorRefs: ["Luca 23:34", "Efeseni 6:12", "Ioan 8:44"],
  memoryVerseRef: "Luca 23:34",
  steps: [
    {
      id: "n4_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum ești azi?" }],
    },
    {
      id: "n4_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Azi îți spun o propoziție care a fost rostită de un om care fusese bătut, scuipat, mințit în instanță și bătut în cuie de viu.",
        },
        { from: "guide", text: "Nimeni din istorie n-a fost tratat mai nedrept. Și uite ce a găsit de spus." },
      ],
    },
    {
      id: "n4_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Tată, iartă-i, căci nu știu ce fac.",
        ref: "Luca 23:34",
      },
    },
    {
      id: "n4_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "N-a spus «nu-i nimic». N-a spus «n-a fost grav». Era grav, Îl omorau.",
        },
        {
          from: "guide",
          text: "A spus altceva: âștia habar n-au cine sunt ei și habar n-au ce fac. Sunt orbi.",
        },
      ],
    },
    {
      id: "n4_5",
      type: "name_struggle",
      order: 5,
      bubbles: [
        { from: "guide", text: "Pune întrebarea asta peste omul tău, și pune-o cinstit:" },
        {
          from: "guide",
          text: "Dacă ar fi știut cine e cu adevărat — dacă ar fi fost întreg, plin de Dumnezeu, vindecat — ți-ar mai fi făcut ce ți-a făcut?",
        },
        { from: "guide", text: "Nu. Un om întreg nu face așa ceva. A făcut-o din ce era el, nu din ce ești tu." },
      ],
    },
    {
      id: "n4_6",
      type: "world_vs_truth",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Asta nu-l scuză. Îl explică. Sunt două lucruri diferite și e important să nu le amesteci.",
        },
        {
          from: "guide",
          text: "Rămâne vinovat. Dar încetează să mai fie un uriaș în capul tău. Devine ce e: un om rupt, care a rupt mai departe.",
        },
      ],
    },
    {
      id: "n4_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Căci noi n-avem de luptat împotriva cărnii și a sângelui, ci împotriva căpeteniilor, împotriva domniilor, împotriva stăpânitorilor întunericului acestui veac.",
        ref: "Efeseni 6:12",
      },
    },
    {
      id: "n4_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "Pavel spune că lupta ta nu e cu omul. Iar Iisus spune despre diavol că e «ucigaș de oameni de la început» și «tatăl minciunii».",
        },
        {
          from: "guide",
          text: "Adică: cineva l-a mințit și pe el, cu ani înainte să ajungă la tine. Și a crezut minciuna. Și a devenit unealtă.",
        },
        {
          from: "guide",
          text: "Când vezi asta, se întâmplă ceva ciudat în piept: ura începe să se mute de pe om.",
        },
      ],
    },
    {
      id: "n4_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "«Nu știu ce fac» înseamnă…",
        options: [
          { text: "Că nu sunt vinovați", correct: false },
          { text: "Că sunt vinovați, dar orbi — și orbirea lor nu e răspunderea mea", correct: true },
          { text: "Că trebuie să mă împac cu ei și să uit", correct: false },
        ],
        explanation:
          "Iisus i-a lăsat vinovați și i-a predat Tatălui. Asta faci și tu: nu îi declari nevinovați, îi scoți din mâna ta și îi pui în mâna Lui.",
      },
    },
    {
      id: "n4_10",
      type: "step",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "Pasul de azi, și e greu: spune numele lui cu voce tare și adaugă — «nu știa ce face».",
        },
        {
          from: "guide",
          text: "N-o să simți nimic. Probabil o să te enerveze că o spui. Spune-o oricum. Nu e o mărturisire de sentiment, e o mutare de poziție.",
        },
      ],
    },
    {
      id: "n4_11",
      type: "memory_verse",
      order: 11,
      scripture: { text: "Tată, iartă-i, căci nu știu ce fac.", ref: "Luca 23:34" },
    },
    {
      id: "n4_12",
      type: "prayer",
      order: 12,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, omul ăsta nu știa cine e. A fost mințit înaintea mea și a cărat minciuna până la mine. Îl scot din mâna mea. Nu-l mai judec eu. Ți-l dau Ție — fă Tu ce e drept. Amin.",
        },
      ],
    },
    {
      id: "n4_13",
      type: "journal",
      order: 13,
      journalPrompt: "Ce s-a schimbat în tine când i-ai spus numele cu voce tare?",
      reward: { xp: 0 },
    },
  ],
}

export const neiertareL5: Lesson = {
  id: "neiertare_l5",
  courseId: "path_neiertare",
  order: 5,
  title: "Datoria pe care n-o mai poți plăti",
  estMinutes: 12,
  anchorRefs: ["Matei 18:21-35", "Coloseni 2:14", "Romani 5:8"],
  memoryVerseRef: "Romani 5:8",
  steps: [
    {
      id: "n5_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum ești azi?" }],
    },
    {
      id: "n5_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Petru L-a întrebat pe Iisus de câte ori trebuie să ierte. A propus șapte, și credea că e generos — învățătorii vremii ziceau de trei ori.",
        },
        { from: "guide", text: "Iisus i-a spus: de șaptezeci de ori câte șapte. Și pe urmă i-a spus de ce." },
      ],
    },
    {
      id: "n5_3",
      type: "truth_simple",
      order: 3,
      bubbles: [
        {
          from: "guide",
          text: "A spus povestea unui om care datora împăratului zece mii de talanți. Ca să înțelegi cifra: un muncitor câștiga un talant în cincisprezece ani de muncă.",
        },
        {
          from: "guide",
          text: "Deci era o datorie pe care nu putea s-o plătească nici în o sută de vieți. Ascultătorii au râs când au auzit suma — era absurdă intenționat.",
        },
        { from: "guide", text: "Și împăratul i-a șters-o. Toată. Într-o propoziție." },
      ],
    },
    {
      id: "n5_4",
      type: "hook",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Omul a ieșit pe poartă și a dat de un coleg care îi datora o sută de dinari — vreo trei luni de salariu. Bani reali, o datorie adevărată.",
        },
        { from: "guide", text: "L-a luat de gât și l-a băgat la închisoare." },
      ],
    },
    {
      id: "n5_5",
      type: "name_struggle",
      order: 5,
      bubbles: [
        {
          from: "guide",
          text: "Atenție aici, că se înțelege greșit de obicei: Iisus nu spune că datoria celui de-al doilea era imaginară.",
        },
        {
          from: "guide",
          text: "Ce ți s-a făcut ție e o datorie reală. Cineva îți datorează ceva și n-o să-ți plătească niciodată. Nu asta e problema din poveste.",
        },
        { from: "guide", text: "Problema e că omul uitase pe ce sumă stătea el." },
      ],
    },
    {
      id: "n5_6",
      type: "world_vs_truth",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Știu ce se ridică în tine acum: «bine, dar eu n-am făcut ce a făcut el».",
        },
        {
          from: "guide",
          text: "Nici nu e vorba de comparat faptele. E vorba de întrebarea: pe tine cine te-a suportat? Și cât?",
        },
      ],
    },
    {
      id: "n5_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Dar Dumnezeu ÎȘi arată dragostea față de noi prin faptul că, pe când eram noi încă păcătoși, Hristos a murit pentru noi.",
        ref: "Romani 5:8",
      },
    },
    {
      id: "n5_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        {
          from: "guide",
          text: "Nu a așteptat să te îndrepți. N-a cerut scuze înainte. A plătit când Îl înjurai sau când nici nu Știai că există.",
        },
        {
          from: "guide",
          text: "Pavel scrie în altă parte că a luat «zapisul» — hârtia cu datoria scrisă pe ea, cu semnătura ta — și a bătut-o în cuie pe cruce.",
        },
        { from: "guide", text: "Cuiele alea țineau o hârtie, nu doar un om." },
      ],
    },
    {
      id: "n5_9",
      type: "scripture",
      order: 9,
      scripture: {
        text: "A șters zapisul cu poruncile lui, care stătea împotriva noastră și ne era potrivnic, și l-a nimicit, pironindu-l pe cruce.",
        ref: "Coloseni 2:14",
      },
    },
    {
      id: "n5_10",
      type: "truth_simple",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "Iertarea nu înseamnă că datoria dispare. Înseamnă că o plătește altcineva.",
        },
        {
          from: "guide",
          text: "Când ierți, nu spui «n-a fost nimic». Spui: «nu mai încasez eu. S-a plătit deja, la El.»",
        },
      ],
    },
    {
      id: "n5_11",
      type: "quiz",
      order: 11,
      quiz: {
        question: "Ce înseamnă să ierți, după pilda asta?",
        options: [
          { text: "Să spun că nu a fost nimic grav", correct: false },
          { text: "Să renunț la dreptul de a încasa eu datoria", correct: true },
          { text: "Să uit ce s-a întâmplat", correct: false },
        ],
        explanation:
          "Nu ți se cere să uiți și nu ți se cere să negi. Ți se cere să lași din mână dreptul de a-l face să plătească. Îl dai Celui care a plătit deja și pentru tine.",
      },
    },
    {
      id: "n5_12",
      type: "step",
      order: 12,
      bubbles: [
        {
          from: "guide",
          text: "Pasul de azi: scrie pe o hârtie ce îți datorează. Concret. «O copilărie.» «Zece ani.» «Scuzele pe care nu mi le-a cerut.»",
        },
        { from: "guide", text: "Nu o rupe azi. Ține-o la tine. O să avem nevoie de ea mâine." },
      ],
    },
    {
      id: "n5_13",
      type: "memory_verse",
      order: 13,
      scripture: {
        text: "Pe când eram noi încă păcătoși, Hristos a murit pentru noi.",
        ref: "Romani 5:8",
      },
    },
    {
      id: "n5_14",
      type: "prayer",
      order: 14,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, uitasem pe ce sumă stau. N-am plătit nimic și m-ai primit oricum. Începe să-mi arăți cât m-a costat pe mine iertarea Ta, ca să pot da mai departe ce am primit. Amin.",
        },
      ],
    },
    {
      id: "n5_15",
      type: "journal",
      order: 15,
      journalPrompt: "Ce ți-a șters ție Dumnezeu, fără să-i ceri?",
      reward: { xp: 0 },
    },
  ],
}
