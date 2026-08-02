import type { Lesson } from "../domain.js"

/**
 * Înlocuiește vechea lecție „Nu știau ce fac”. Luca 23:34 rămâne Cuvântul lui
 * Iisus despre cei care Îl răstigneau, dar nu este transformat într-un verdict
 * universal că orice agresor a acționat fără cunoaștere. Unii oameni aleg răul
 * conștient; Scriptura păstrează împreună mila, răspunderea și judecata dreaptă.
 */
export const neiertareL4Reviewed: Lesson = {
  id: "neiertare_l4",
  courseId: "path_neiertare",
  order: 4,
  title: "Răul lui nu spune cine ești tu",
  estMinutes: 11,
  anchorRefs: ["Luca 23:34", "1 Petru 2:23", "Romani 12:19"],
  memoryVerseRef: "1 Petru 2:23",
  steps: [
    {
      id: "n4r_1",
      type: "check_in",
      order: 1,
      bubbles: [{ from: "guide", text: "Cum ești azi?" }],
    },
    {
      id: "n4r_2",
      type: "hook",
      order: 2,
      bubbles: [
        {
          from: "guide",
          text: "Când cineva te rănește, mintea caută o explicație și ajunge adesea la tine: «poate am meritat», «poate nu valorez», «poate a văzut în mine ce sunt cu adevărat».",
        },
        {
          from: "guide",
          text: "Astăzi nu încercăm să ghicim cât a înțeles omul acela. Scriptura nu ne dă dreptul să inventăm motivele inimii lui.",
        },
      ],
    },
    {
      id: "n4r_3",
      type: "scripture",
      order: 3,
      scripture: {
        text: "Tată, iartă-i, căci nu știu ce fac.",
        ref: "Luca 23:34",
      },
      bubbles: [
        {
          from: "guide",
          text: "Iisus nu a numit răstignirea un lucru mic. S-a rugat în mijlocul unei nedreptăți reale, fără să transforme răul în bine.",
        },
        {
          from: "guide",
          text: "Cuvintele Lui ne arată mila Lui. Nu ne obligă să declarăm că fiecare om care a abuzat, a mințit sau a trădat nu știa ce făcea.",
        },
      ],
    },
    {
      id: "n4r_4",
      type: "truth_simple",
      order: 4,
      bubbles: [
        {
          from: "guide",
          text: "Poate că omul tău era orb într-un fel. Poate că știa exact și a ales să continue. Nu trebuie să hotărăști asta ca să poți merge spre libertate.",
        },
        {
          from: "guide",
          text: "Lucrul pe care îl poți spune sigur este acesta: ce a făcut arată alegerea și ruptura lui; nu stabilește valoarea ta înaintea lui Dumnezeu.",
        },
      ],
    },
    {
      id: "n4r_5",
      type: "scripture",
      order: 5,
      scripture: {
        text: "Când era batjocorit, nu răspundea cu batjocuri; și, când era chinuit, nu amenința, ci Se supunea dreptului Judecător.",
        ref: "1 Petru 2:23",
      },
      bubbles: [
        {
          from: "guide",
          text: "Iisus nu a negat nedreptatea. A refuzat răzbunarea personală și Și-a încredințat cauza Celui care judecă drept.",
        },
        {
          from: "guide",
          text: "Asta este diferit de a spune că agresorul este nevinovat sau că nu trebuie să existe consecințe, limite, poliție ori dreptate.",
        },
      ],
    },
    {
      id: "n4r_6",
      type: "world_vs_truth",
      order: 6,
      bubbles: [
        {
          from: "guide",
          text: "Minciuna rănii spune: «dacă m-a tratat așa, înseamnă că atât valorez».",
        },
        {
          from: "guide",
          text: "Adevărul spune: «omul acela răspunde pentru ce a ales; valoarea mea a fost arătată de Hristos, nu de felul în care m-a tratat el».",
        },
      ],
    },
    {
      id: "n4r_7",
      type: "scripture",
      order: 7,
      scripture: {
        text: "Nu vă răzbunați singuri, preaiubiților, ci lăsați să se răzbune mânia lui Dumnezeu; căci este scris: «Răzbunarea este a Mea; Eu voi răsplăti», zice Domnul.",
        ref: "Romani 12:19",
      },
    },
    {
      id: "n4r_8",
      type: "quiz",
      order: 8,
      quiz: {
        question: "Ce poți spune fără să inventezi ce era în inima celui care te-a rănit?",
        options: [
          { text: "Sigur nu știa ce făcea", correct: false },
          { text: "Ce a făcut nu definește valoarea mea, iar el răspunde înaintea lui Dumnezeu", correct: true },
          { text: "Dacă iert, nu mai trebuie să existe consecințe", correct: false },
        ],
        explanation: "Scriptura nu îți cere să ghicești motivele lui și nici să anulezi dreptatea. Îți permite să scoți identitatea ta și răzbunarea personală din mâna lui.",
      },
    },
    {
      id: "n4r_9",
      type: "step",
      order: 9,
      bubbles: [
        {
          from: "guide",
          text: "Spune, fără să-i scuzi fapta: «Ce ai făcut vorbește despre alegerea ta, nu despre valoarea mea. Nu voi purta eu judecata finală.»",
        },
        {
          from: "guide",
          text: "Dacă există pericol, abuz sau faptă penală, păstrează limitele și cere ajutor. A lăsa judecata lui Dumnezeu nu înseamnă a opri dreptatea omenească.",
        },
      ],
    },
    {
      id: "n4r_10",
      type: "prayer",
      order: 10,
      bubbles: [
        {
          from: "guide",
          text: "Doamne, Tu știi ce a fost în inima lui și Tu judeci drept. Nu voi numi răul bine, dar nici nu-i voi mai da dreptul să-mi spună cine sunt. Îți încredințez cauza mea. Amin.",
        },
      ],
    },
    {
      id: "n4r_11",
      type: "journal",
      order: 11,
      journalPrompt: "Ce minciună despre valoarea ta ai ajuns să crezi din cauza felului în care ai fost tratat?",
    },
    {
      id: "n4r_12",
      type: "memory_verse",
      order: 12,
      scripture: {
        text: "Se supunea dreptului Judecător.",
        ref: "1 Petru 2:23",
      },
    },
  ],
}
