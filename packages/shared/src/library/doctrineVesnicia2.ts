import type { Lesson } from "../domain.js"
import { DOCTRINE_VESNICIA_PART_A } from "./doctrineVesnicia.js"

/*
 * Cursul „Ce se întâmplă după moarte?", lecțiile 4-5. (docs/15 §Cursul 4)
 *
 * Lecția 4 atinge cel mai des o durere reală: un om drag care a murit și despre
 * care nu știm nimic. Regula: nu dăm verdicte despre nimeni, nici într-un sens,
 * nici în celălalt. Nu punem vina pe cel rămas în viață.
 */

export const vesniciaL4: Lesson = {
  id: "vesnicia_l4",
  courseId: "doctrine_c4_vesnicia",
  order: 4,
  title: "Și cei care n-au auzit niciodată?",
  estMinutes: 11,
  anchorRefs: ["Romani 2:14-16", "Romani 1:20", "Geneza 18:25"],
  memoryVerseRef: "Geneza 18:25",
  steps: [
    {
      id: "v4_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Întrebarea vine în două feluri. Uneori e teoretică: ce se întâmplă cu un om născut undeva unde nimeni n-a auzit de Hristos?" },
        { from: "guide", text: "Și uneori nu e teoretică deloc. Uneori e un nume și o fotografie pe perete." },
      ],
    },
    {
      id: "v4_2",
      type: "name_struggle",
      order: 2,
      bubbles: [
        { from: "guide", text: "Dacă ești în a doua situație, să fie limpede înainte de orice verset: nu știm ce s-a petrecut între omul acela și Dumnezeu în ultimele lui clipe. Și nimeni de pe pământ nu știe." },
        { from: "guide", text: "Nu-ți dăm un verdict pe care nu avem dreptul să-l dăm. Nici într-un sens, nici în celălalt." },
      ],
    },
    {
      id: "v4_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Când Neamurile, măcar că n-au lege, fac din firea lor lucrurile Legii, ele... arată că lucrarea Legii este scrisă în inimile lor; fiind mărturisite de știința lor.",
        ref: "Romani 2:14-15",
      },
      bubbles: [
        { from: "guide", text: "„Știința lor” traduce *syneidesis*: conștiința, martorul dinăuntru. Pavel spune că Dumnezeu a pus în fiecare om ceva care știe să acuze și să apere." },
        { from: "guide", text: "Deci nimeni nu e complet fără nimic. Toată lumea are un martor." },
      ],
    },
    {
      id: "v4_4",
      type: "scripture",
      order: 4,
      scripture: {
        text: "În adevăr, însușirile nevăzute ale Lui... se văd lămurit, de la facerea lumii, când te uiți cu băgare de seamă la ele în lucrurile făcute de El.",
        ref: "Romani 1:20",
      },
      bubbles: [
        { from: "guide", text: "Cerul, corpul omenesc, nașterea unui copil — toate spun ceva. Nu spun tot, dar spun destul ca omul să poată întinde mâna și să caute." },
      ],
    },
    {
      id: "v4_5",
      type: "truth_simple",
      order: 5,
      bubbles: [
        { from: "guide", text: "Ce știm, deci: fiecare om e judecat de Dumnezeu după ce a primit, nu după ce n-a primit. Judecătorul nu e nedrept și nu are informații lipsă." },
        { from: "guide", text: "Ce nu știm: numele oamenilor. Nu ne-a fost dată lista și nu suntem noi la masă acolo." },
      ],
    },
    {
      id: "v4_6",
      type: "scripture",
      order: 6,
      scripture: {
        text: "Nu va face Judecătorul întregului pământ dreptate?",
        ref: "Geneza 18:25",
      },
      bubbles: [
        { from: "guide", text: "Avraam pune întrebarea asta în cea mai grea negociere din Vechiul Testament. Și o pune ca pe o certitudine, nu ca pe o îndoială." },
        { from: "guide", text: "Aici te putem lăsa cu ceva sigur: oricine ar fi în discuție, va fi judecat de Cineva mai drept decât tine și mai milos decât tine." },
      ],
    },
    {
      id: "v4_7",
      type: "choice",
      order: 7,
      choice: {
        prompt: "De ce ai deschis lecția asta?",
        options: [
          { id: "v4c_a", label: "Mă gândesc la cineva care a murit." },
          { id: "v4c_b", label: "Mi se pare o nedreptate în sistem." },
          { id: "v4c_c", label: "Mă întreb pentru cineva viu, drag mie." },
        ],
      },
    },
    {
      id: "v4_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        { from: "guide", text: "Dacă e vorba de un om care a murit: poți pune durerea asta în mâinile Lui, cu numele lui în gură. Nu ca să schimbi ceva — ci pentru că tu ai nevoie să nu mai duci tu greutatea unei judecăți care nu e a ta." },
        { from: "guide", text: "Dacă e vorba de un om viu: atunci întrebarea are un răspuns practic. El aude despre Hristos prin oameni. De obicei prin cineva care ține la el." },
      ],
    },
    {
      id: "v4_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Ce spune Romani 2 despre omul care n-a avut Legea scrisă?",
        options: [
          { text: "Că e automat pierdut", correct: false },
          { text: "Că are în inimă un martor — conștiința — și că Dumnezeu judecă drept după ce a primit", correct: true },
          { text: "Că e automat mântuit", correct: false },
        ],
        explanation:
          "Textul nu dă verdicte pe nume. Spune că nimeni nu e fără martor și că Judecătorul e drept.",
      },
    },
    {
      id: "v4_10",
      type: "how_god_helps",
      order: 10,
      bubbles: [
        { from: "guide", text: "Limita cinstită, cea mai importantă din curs: nu știm cine e mântuit și cine nu. Nu putem spune despre un om anume, viu sau mort, unde e. Cine îți spune asta cu siguranță își ia o funcție care nu e a lui." },
        { from: "guide", text: "Știm un singur lucru cu certitudine: ce ni s-a spus nouă să facem. Nu să sortăm oameni, ci să mergem la El și să spunem altora că se poate." },
      ],
    },
    {
      id: "v4_11",
      type: "prayer",
      order: 11,
      bubbles: [
        { from: "guide", text: "Dacă ai un nume în minte, spune-l acum, cu voce tare, și adaugă: „Doamne, nu știu ce a fost între Tine și el. Îți las asta. Știu că ești mai drept și mai bun decât mine.”" },
      ],
    },
    {
      id: "v4_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "Nu va face Judecătorul întregului pământ dreptate?",
        ref: "Geneza 18:25",
      },
    },
  ],
}

export const vesniciaL5: Lesson = {
  id: "vesnicia_l5",
  courseId: "doctrine_c4_vesnicia",
  order: 5,
  title: "De unde știu că sunt al Lui",
  estMinutes: 11,
  anchorRefs: ["1 Ioan 5:13", "Ioan 10:28-29", "Romani 8:16"],
  memoryVerseRef: "Ioan 10:28",
  steps: [
    {
      id: "v5_1",
      type: "hook",
      order: 1,
      bubbles: [
        { from: "guide", text: "Ultima lecție. Și cea care contează pentru azi, nu pentru ultima zi." },
        { from: "guide", text: "Foarte mulți oameni trăiesc cu o nesiguranță de fond: sper că sunt al Lui. Iar Biblia folosește alt cuvânt decât „sper”." },
      ],
    },
    {
      id: "v5_2",
      type: "scripture",
      order: 2,
      scripture: {
        text: "V-am scris aceste lucruri ca să știți că voi, care credeți în Numele Fiului lui Dumnezeu, aveți viața veșnică.",
        ref: "1 Ioan 5:13",
      },
      bubbles: [
        { from: "guide", text: "„Ca să știți”. Verbul e *eidete* — să știți, nu să sperați. Ioan spune că a scris o scrisoare întreagă exact ca să scoată nesiguranța din oameni." },
        { from: "guide", text: "Și mai spune „aveți”, la timpul prezent. Nu „veți avea, dacă rezistăm până la capăt”." },
      ],
    },
    {
      id: "v5_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Eu le dau viața veșnică și nu vor pieri niciodată; și nimeni nu le va smulge din mâna Mea. Tatăl Meu, care Mi le-a dat, este mai mare decât toți; și nimeni nu le poate smulge din mâna Tatălui Meu.",
        ref: "Ioan 10:28-29",
      },
      bubbles: [
        { from: "guide", text: "Două mâini. Nu una. Iisus ține și Tatăl ține peste." },
        { from: "guide", text: "Și uită-te la verb: „smulge”. Nu „plecă”. Discuția din verset e despre ce ți se poate lua, nu despre ce poți tu strica într-o zi proastă." },
      ],
    },
    {
      id: "v5_4",
      type: "name_struggle",
      order: 4,
      bubbles: [
        { from: "guide", text: "Atunci de ce ne simțim nesiguri? De obicei din trei motive: pentru că am căzut din nou, pentru că nu simțim nimic, sau pentru că cineva ne-a spus cândva că nu suntem destul de buni." },
        { from: "guide", text: "Niciunul din cele trei nu e un argument. Toate trei sunt senzații sau vorbe de om." },
      ],
    },
    {
      id: "v5_5",
      type: "world_vs_truth",
      order: 5,
      bubbles: [
        { from: "guide", text: "Vocea din tine spune: dacă nu simți, nu e real. Și dacă ai căzut, ai ieșit." },
        { from: "guide", text: "Textul spune: siguranța nu te bazezi pe ce simți tu despre El, ci pe ce a făcut El pentru tine și pe cine te ține. Sentimentele se schimbă cu somnul și cu vremea. Mâna Lui nu." },
      ],
    },
    {
      id: "v5_6",
      type: "scripture",
      order: 6,
      scripture: {
        text: "Însuși Duhul adeverește împreună cu duhul nostru că suntem copii ai lui Dumnezeu.",
        ref: "Romani 8:16",
      },
      bubbles: [
        { from: "guide", text: "Sunt semne cinstite și verificabile: te doare când greșești (înainte nu te durea), Îl vrei chiar și când nu-ți merge bine, ți s-a schimbat ce iubești și pe cine." },
        { from: "guide", text: "Astea nu sunt performanțe. Sunt urme de viață. Un om mort nu simte când e tăiat." },
      ],
    },
    {
      id: "v5_7",
      type: "choice",
      order: 7,
      choice: {
        prompt: "Ce te face să te îndoiești cel mai des?",
        options: [
          { id: "v5c_a", label: "Că recad în același lucru." },
          { id: "v5c_b", label: "Că nu simt nimic când mă rog." },
          { id: "v5c_c", label: "Ce mi-a spus cineva despre mine." },
        ],
      },
    },
    {
      id: "v5_8",
      type: "how_god_helps",
      order: 8,
      bubbles: [
        { from: "guide", text: "Un lucru practic: când vine nesiguranța, nu te apuca să-ți verifici sentimentele. Nu au ce să-ți spună." },
        { from: "guide", text: "Întoarce-te la ce e scris și spune-o cu voce tare, chiar dacă nu simți nimic: „nimeni nu mă smulge din mâna Lui”. Adevărul spus tare face mai mult decât adevărul răsucit în minte." },
      ],
    },
    {
      id: "v5_9",
      type: "quiz",
      order: 9,
      quiz: {
        question: "Pe ce se sprijină siguranța, după Ioan 10:28-29?",
        options: [
          { text: "Pe cât de tare țin eu", correct: false },
          { text: "Pe mâna lui Iisus și a Tatălui, care țin", correct: true },
          { text: "Pe cât de mult simt", correct: false },
        ],
        explanation:
          "Textul spune de două ori „nimeni nu le poate smulge” — și de fiecare dată subiectul care ține e El, nu noi.",
      },
    },
    {
      id: "v5_10",
      type: "how_god_helps",
      order: 10,
      bubbles: [
        { from: "guide", text: "Limita cinstită: nu putem noi să-ți dăm certificatul. Nu știm inima nimănui și nu ținem evidențe. Un om, o aplicație sau o listă nu poate face treaba asta." },
        { from: "guide", text: "Ce poți face azi e să mergi la El și să întrebi direct. Are voie să-ți răspundă și o face, de obicei prin ce e scris." },
      ],
    },
    {
      id: "v5_11",
      type: "journal",
      order: 11,
      journalPrompt:
        "Scrie o urmă de viață pe care o vezi la tine acum și care nu era acum un an. Orice, cât de mică. Doar tu o citești.",
    },
    {
      id: "v5_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "Eu le dau viața veșnică și nu vor pieri niciodată; și nimeni nu le va smulge din mâna Mea.",
        ref: "Ioan 10:28",
      },
    },
  ],
}

/** Cursul întreg, în ordine. */
export const DOCTRINE_VESNICIA_LESSONS: Lesson[] = [
  ...DOCTRINE_VESNICIA_PART_A,
  vesniciaL4,
  vesniciaL5,
]
