import type { Course, Lesson, Module } from "./domain.js"

// Seed partajat (sursa unică de conținut pentru API in-memory și pentru popularea DB).
// Adolescenți → Modul 1 (identity) → Curs 1.1. L1 complet (workbook §13); L2–L6 DRAFT.
export interface SeedBundle {
  module: Module
  course: Course
  lessons: Lesson[]
}

export const teensM1C1: SeedBundle = {
  module: {
    id: "teens_m1_identity",
    categoryId: "teens12_18",
    order: 1,
    title: "Cine sunt eu?",
    axis: "identity",
    courseIds: ["teens_m1_c1"],
  },
  course: {
    id: "teens_m1_c1",
    moduleId: "teens_m1_identity",
    order: 1,
    title: "Cine sunt eu, de fapt?",
    struggle: "Mă definesc după like-uri, note, ce zic alții.",
    truth: "Identitatea și valoarea vin de la Creator, nu din performanță.",
    lessonIds: [
      "teens_m1_c1_l1",
      "teens_m1_c1_l2",
      "teens_m1_c1_l3",
      "teens_m1_c1_l4",
      "teens_m1_c1_l5",
      "teens_m1_c1_l6",
    ],
  },
  lessons: [
    {
      id: "teens_m1_c1_l1",
      courseId: "teens_m1_c1",
      order: 1,
      title: "Nu ești ce zic like-urile",
      estMinutes: 6,
      anchorRefs: ["Geneza 1:27"],
      memoryVerseRef: "Psalm 139:14",
      badgeId: "badge_beyond_likes",
      steps: [
        { id: "l1_s1", type: "check_in", order: 1, bubbles: [{ from: "guide", text: "Salut! Sunt Daniel. Cum ești azi, sincer?" }] },
        { id: "l1_s2", type: "hook", order: 2, bubbles: [{ from: "guide", text: "Ai șters vreodată o postare fiindcă n-a luat destule aprecieri?" }] },
        { id: "l1_s3", type: "choice", order: 3, choice: { prompt: "Tu?", options: [{ id: "a", label: "Da, mi s-a întâmplat" }, { id: "b", label: "Nu, dar înțeleg senzația" }, { id: "c", label: "Mie nici nu-mi pasă", branchStepId: "l1_branch_c" }] } },
        { id: "l1_s4", type: "scripture", order: 4, scripture: { text: "Dumnezeu a făcut pe om după chipul Său.", ref: "Geneza 1:27" } },
        { id: "l1_s5", type: "quiz", order: 5, quiz: { question: "Care e adevărat?", options: [{ text: "Valoarea mea crește cu fiecare like", correct: false }, { text: "Valoarea mea vine de la Cel care m-a făcut", correct: true }], explanation: "Valoarea nu e un scor, e o amprentă." } },
        { id: "l1_s6", type: "step", order: 6, bubbles: [{ from: "guide", text: "Azi: nu verifica aprecierile 24 de ore. Observă ce simți." }] },
        { id: "l1_s7", type: "journal", order: 7, journalPrompt: "Un lucru pentru care valorezi, fără legătură cu ce văd alții.", reward: { xp: 10, badgeId: "badge_beyond_likes", axisDeltas: { identity: 1 } } },
      ],
    },
    {
      id: "teens_m1_c1_l2",
      courseId: "teens_m1_c1",
      order: 2,
      title: "Nu sunt de ajuns",
      estMinutes: 6,
      anchorRefs: ["Ioan 1:12", "Romani 5:8"],
      memoryVerseRef: "Romani 5:8",
      badgeId: "badge_made_on_purpose",
      steps: [
        { id: "l2_s1", type: "check_in", order: 1, bubbles: [{ from: "guide", text: "(DRAFT) De importat din sursa aprobată — vezi DECISIONS D-004." }] },
        { id: "l2_s2", type: "step", order: 2, bubbles: [{ from: "guide", text: "(DRAFT) Pasul de azi." }] },
        { id: "l2_s3", type: "journal", order: 3, journalPrompt: "(DRAFT)", reward: { xp: 10, axisDeltas: { identity: 1 } } },
      ],
    },
    {
      id: "teens_m1_c1_l3",
      courseId: "teens_m1_c1",
      order: 3,
      title: "Capcana comparației",
      estMinutes: 6,
      anchorRefs: ["2 Corinteni 10:12"],
      memoryVerseRef: "Galateni 6:4",
      badgeId: "badge_free_from_feed",
      steps: [
        { id: "l3_s1", type: "check_in", order: 1, bubbles: [{ from: "guide", text: "(DRAFT) De importat din sursa aprobată." }] },
        { id: "l3_s2", type: "step", order: 2, bubbles: [{ from: "guide", text: "(DRAFT) Pasul de azi." }] },
        { id: "l3_s3", type: "journal", order: 3, journalPrompt: "(DRAFT)", reward: { xp: 10, axisDeltas: { identity: 1 } } },
      ],
    },
    {
      id: "teens_m1_c1_l4",
      courseId: "teens_m1_c1",
      order: 4,
      title: "Oglinda: cum mă văd",
      estMinutes: 6,
      anchorRefs: ["1 Corinteni 6:19-20"],
      memoryVerseRef: "Psalm 139:14",
      badgeId: "badge_temple_not_problem",
      steps: [
        { id: "l4_s1", type: "check_in", order: 1, bubbles: [{ from: "guide", text: "(DRAFT) De importat din sursa aprobată." }] },
        { id: "l4_s2", type: "step", order: 2, bubbles: [{ from: "guide", text: "(DRAFT) Pasul de azi." }] },
        { id: "l4_s3", type: "journal", order: 3, journalPrompt: "(DRAFT)", reward: { xp: 10, axisDeltas: { identity: 1 } } },
      ],
    },
    {
      id: "teens_m1_c1_l5",
      courseId: "teens_m1_c1",
      order: 5,
      title: "Pentru ce exist?",
      estMinutes: 6,
      anchorRefs: ["Efeseni 2:10"],
      memoryVerseRef: "Ieremia 1:5",
      badgeId: "badge_made_with_purpose",
      steps: [
        { id: "l5_s1", type: "check_in", order: 1, bubbles: [{ from: "guide", text: "(DRAFT) De importat din sursa aprobată." }] },
        { id: "l5_s2", type: "step", order: 2, bubbles: [{ from: "guide", text: "(DRAFT) Pasul de azi." }] },
        { id: "l5_s3", type: "journal", order: 3, journalPrompt: "(DRAFT)", reward: { xp: 10, axisDeltas: { identity: 1 } } },
      ],
    },
    {
      id: "teens_m1_c1_l6",
      courseId: "teens_m1_c1",
      order: 6,
      title: "Al cui sunt",
      estMinutes: 6,
      anchorRefs: ["Isaia 43:1"],
      memoryVerseRef: "Isaia 43:1",
      badgeId: "badge_whose_i_am",
      steps: [
        { id: "l6_s1", type: "check_in", order: 1, bubbles: [{ from: "guide", text: "(DRAFT) De importat din sursa aprobată." }] },
        { id: "l6_s2", type: "step", order: 2, bubbles: [{ from: "guide", text: "(DRAFT) Pasul de azi." }] },
        { id: "l6_s3", type: "journal", order: 3, journalPrompt: "(DRAFT)", reward: { xp: 10, badgeId: "badge_whose_i_am", axisDeltas: { identity: 1 }, certificateId: "cert_teens_m1", unlocksModuleId: "teens_m2_emotional_peace" } },
      ],
    },
  ],
}
