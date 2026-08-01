import { createClient } from "@supabase/supabase-js"
import { config } from "dotenv"
import { fileURLToPath } from "node:url"
import { teensM1C1 } from "@emanus/shared"
import { LIBRARY_LESSONS } from "@emanus/shared/library"
import { mohlerNotForMe } from "@emanus/shared/lesson-mohler"
import { DOOR_ENTRY_OPTIONS, PATHS } from "@emanus/shared/paths"
import { STATIC_CONTENT_MANIFEST } from "@emanus/shared/content-catalog"
import type { Lesson } from "@emanus/shared/domain"
import { enrichLessonCollection } from "@emanus/shared/interaction-enrichment"

config({ path: fileURLToPath(new URL("../../../.env", import.meta.url)) })

const rawLessons = new Map<string, Lesson>()
for (const lesson of [
  ...PATHS.flatMap((path) => path.lessons),
  ...LIBRARY_LESSONS,
  ...mohlerNotForMe.lessons,
  ...teensM1C1.lessons,
]) {
  const existing = rawLessons.get(lesson.id)
  if (existing && JSON.stringify(existing) !== JSON.stringify(lesson)) {
    throw new Error(`Lecția ${lesson.id} are două definiții diferite.`)
  }
  rawLessons.set(lesson.id, lesson)
}

const ageHints = Object.fromEntries(
  STATIC_CONTENT_MANIFEST.shelves.flatMap((shelf) =>
    shelf.courses.map((course) => [course.id, course.ageHint]),
  ),
)
const lessons = new Map(
  enrichLessonCollection([...rawLessons.values()], ageHints).map((lesson) => [
    lesson.id,
    lesson,
  ]),
)
const enrichedAgain = new Map(
  enrichLessonCollection([...lessons.values()], ageHints).map((lesson) => [
    lesson.id,
    lesson,
  ]),
)
for (const [id, lesson] of lessons) {
  if (JSON.stringify(lesson) !== JSON.stringify(enrichedAgain.get(id))) {
    throw new Error(`Îmbogățirea interactivă nu este idempotentă pentru ${id}.`)
  }
}

const ANSWER_INPUT_TYPES = new Set([
  "choice",
  "multi_choice",
  "check_in",
  "quiz",
  "journal",
  "reflection",
  "declaration",
])
const WRITTEN_RESPONSE_TYPES = new Set([
  "journal",
  "reflection",
  "declaration",
])
const REQUIRED_EDITORIAL_BRANCHES = [
  { lessonId: "rusine_l1", stepId: "r1_3" },
  { lessonId: "rusine_l4", stepId: "r4_5" },
  { lessonId: "rusine_l5", stepId: "r5_ownership" },
  { lessonId: "neiertare_o1", stepId: "o1_context" },
  { lessonId: "neiertare_l6", stepId: "n6_readiness" },
  { lessonId: "doctrina_l1", stepId: "d1_entry" },
  { lessonId: "aproape_l1", stepId: "a1_3" },
  { lessonId: "schimbare_l1", stepId: "s1_3" },
  { lessonId: "har_l1", stepId: "h1_3" },
  { lessonId: "impreuna_l1", stepId: "im1_3" },
  { lessonId: "suferinta_l1", stepId: "sf1_focus" },
  { lessonId: "suferinta_l2", stepId: "sf2_belief" },
  { lessonId: "suferinta_l4", stepId: "sf4_need" },
  { lessonId: "suferinta_l6", stepId: "sf6_hope" },
] as const
const REQUIRED_DOOR_PATHS = {
  rusine: "path_acasa",
  avort: "path_acasa",
  infidelitate: "path_acasa",
  prea_departe: "path_acasa",
  neiertare: "path_neiertare",
  divort: "path_neiertare",
  doliu: "path_suferinta",
  boala: "path_suferinta",
  de_ce_permis: "path_suferinta",
  indoiala: "path_temelie",
  biblia_inventata: "path_temelie",
  alte_credinte: "path_temelie",
  perete: "path_aproape",
  nu_inteleg: "path_aproape",
  uscaciune: "path_aproape",
  flacara: "path_aproape",
  cum_citesc: "path_aproape",
  dependenta: "path_schimbare",
  anxietate: "path_schimbare",
  recadere: "path_schimbare",
  pornografie: "path_schimbare",
  tristete: "path_schimbare",
  furie: "path_schimbare",
  merit: "path_har",
  obisnuinta: "path_har",
  frica_pedeapsa: "path_har",
  epuizat_slujire: "path_har",
  singuratate: "path_impreuna",
  familie_respinge: "path_impreuna",
  respins_biserica: "path_impreuna",
  nou_venit: "path_impreuna",
} as const
function validateLesson(lesson: Lesson): void {
  if (!lesson.id || !lesson.courseId || !lesson.title.trim()) {
    throw new Error("Lecție fără id, courseId sau titlu.")
  }
  if (!Number.isInteger(lesson.estMinutes) || lesson.estMinutes <= 0) {
    throw new Error(`Lecția ${lesson.id} are durata invalidă.`)
  }
  if (lesson.steps.length === 0) {
    throw new Error(`Lecția ${lesson.id} nu are pași.`)
  }
  if (!lesson.steps.some((step) => ANSWER_INPUT_TYPES.has(step.type))) {
    throw new Error(`Lecția ${lesson.id} nu cere niciun răspuns utilizatorului.`)
  }
  if (!lesson.steps.some((step) => WRITTEN_RESPONSE_TYPES.has(step.type))) {
    throw new Error(`Lecția ${lesson.id} nu are reflecție sau răspuns liber.`)
  }

  const stepIds = new Set<string>()
  for (const step of lesson.steps) {
    if (stepIds.has(step.id)) {
      throw new Error(`Lecția ${lesson.id} are pasul duplicat ${step.id}.`)
    }
    stepIds.add(step.id)
    if (!Number.isFinite(step.order)) {
      throw new Error(`Pasul ${lesson.id}/${step.id} are ordinea invalidă.`)
    }
    if (step.type === "choice" && !step.choice?.options.length) {
      throw new Error(`Pasul ${lesson.id}/${step.id} nu are opțiuni.`)
    }
    if (step.choice) {
      const optionIds = new Set<string>()
      for (const option of step.choice.options) {
        if (optionIds.has(option.id)) {
          throw new Error(
            `Pasul ${lesson.id}/${step.id} are opțiunea duplicată ${option.id}.`,
          )
        }
        optionIds.add(option.id)
        if (!option.branchStepId && !option.feedback?.trim()) {
          throw new Error(
            `Opțiunea ${lesson.id}/${step.id}/${option.id} nu are feedback sau ramură.`,
          )
        }
      }
    }
    if (step.type === "multi_choice") {
      const spec = step.multiChoice
      if (!spec?.options.length) {
        throw new Error(`Pasul multiplu ${lesson.id}/${step.id} nu are opțiuni.`)
      }
      const min = spec.minSelections ?? 1
      const max = spec.maxSelections ?? spec.options.length
      if (min < 0 || max < min || max > spec.options.length) {
        throw new Error(
          `Pasul multiplu ${lesson.id}/${step.id} are limite invalide.`,
        )
      }
      if (new Set(spec.options.map((option) => option.id)).size !== spec.options.length) {
        throw new Error(
          `Pasul multiplu ${lesson.id}/${step.id} are opțiuni duplicate.`,
        )
      }
    }
    if (
      (step.type === "reflection" || step.type === "declaration") &&
      !step.response?.prompt.trim()
    ) {
      throw new Error(`Pasul ${lesson.id}/${step.id} nu are întrebare.`)
    }
  }

  for (const step of lesson.steps) {
    for (const option of step.choice?.options ?? []) {
      if (option.branchStepId && !stepIds.has(option.branchStepId)) {
        throw new Error(
          `Ramura ${lesson.id}/${step.id}/${option.id} indică pasul lipsă ${option.branchStepId}.`,
        )
      }
    }
  }
}

for (const lesson of lessons.values()) validateLesson(lesson)

for (const required of REQUIRED_EDITORIAL_BRANCHES) {
  const lesson = lessons.get(required.lessonId)
  const step = lesson?.steps.find((candidate) => candidate.id === required.stepId)
  if (!lesson || !step?.choice?.options.length) {
    throw new Error(
      `Ramificarea editorială obligatorie ${required.lessonId}/${required.stepId} lipsește.`,
    )
  }
  for (const option of step.choice.options) {
    const target = option.branchStepId
      ? lesson.steps.find((candidate) => candidate.id === option.branchStepId)
      : undefined
    if (
      !target ||
      !target.bubbles?.some((bubble) => bubble.text.trim())
    ) {
      throw new Error(
        `Opțiunea editorială ${lesson.id}/${step.id}/${option.id} nu are un răspuns pastoral complet.`,
      )
    }
  }
}

for (const [doorId, pathId] of Object.entries(REQUIRED_DOOR_PATHS)) {
  const door = STATIC_CONTENT_MANIFEST.doors.find(
    (candidate) => candidate.id === doorId,
  )
  const roomPathId = STATIC_CONTENT_MANIFEST.rooms.find(
    (room) => room.id === door?.roomId,
  )?.pathId
  const resolvedPathId = door?.pathId ?? roomPathId
  if (resolvedPathId !== pathId) {
    throw new Error(
      `Ușa ${doorId} trebuie să ducă în ${pathId}, nu în ${resolvedPathId ?? "niciun traseu"}.`,
    )
  }
}

if (
  Object.keys(REQUIRED_DOOR_PATHS).length !==
    STATIC_CONTENT_MANIFEST.doors.length ||
  Object.keys(DOOR_ENTRY_OPTIONS).length !==
    STATIC_CONTENT_MANIFEST.doors.length
) {
  throw new Error(
    "Fiecare ușă trebuie să aibă traseu și opțiune editorială declarate în validator.",
  )
}

for (const door of STATIC_CONTENT_MANIFEST.doors) {
  const expected = DOOR_ENTRY_OPTIONS[door.id]
  if (
    !expected ||
    door.entry?.lessonId !== expected.lessonId ||
    door.entry.stepId !== expected.stepId ||
    door.entry.optionId !== expected.optionId
  ) {
    throw new Error(
      `Ușa ${door.id} nu publică exact alegerea editorială declarată.`,
    )
  }
  const lesson = expected ? lessons.get(expected.lessonId) : undefined
  const step = lesson?.steps.find(
    (candidate) => candidate.id === expected?.stepId,
  )
  const option = step?.choice?.options.find(
    (candidate) => candidate.id === expected?.optionId,
  )
  if (!expected || !option?.branchStepId) {
    throw new Error(
      `Ușa ${door.id} nu are o opțiune editorială ramificată în traseul ei.`,
    )
  }
}

const courses = new Map<string, Lesson[]>()
for (const lesson of lessons.values()) {
  const course = courses.get(lesson.courseId) ?? []
  course.push(lesson)
  courses.set(lesson.courseId, course)
}
for (const [courseId, course] of courses) {
  const ordered = [...course].sort(
    (a, b) => a.order - b.order || a.id.localeCompare(b.id),
  )
  if (
    !ordered.some((lesson) =>
      lesson.steps.some((step) => step.type === "multi_choice"),
    )
  ) {
    throw new Error(`Cursul ${courseId} nu are selecție multiplă.`)
  }
  const finalLesson = ordered[ordered.length - 1]
  if (!finalLesson?.steps.some((step) => step.type === "declaration")) {
    throw new Error(`Ultima lecție din ${courseId} nu are declarație de încheiere.`)
  }
}

const referencedIds = new Set([
  ...STATIC_CONTENT_MANIFEST.paths.flatMap((path) =>
    path.lessons.map((lesson) => lesson.id),
  ),
  ...STATIC_CONTENT_MANIFEST.doctrineLessons.map((lesson) => lesson.id),
  ...STATIC_CONTENT_MANIFEST.shelves.flatMap((shelf) =>
    shelf.courses.flatMap((course) => course.lessonIds),
  ),
])

for (const id of referencedIds) {
  if (!lessons.has(id)) {
    throw new Error(`Manifestul referă lecția lipsă ${id}.`)
  }
}

const releaseLessons = [...referencedIds].map((id) => lessons.get(id)!)
const rows = releaseLessons.map((lesson) => ({
  id: lesson.id,
  course_id: lesson.courseId,
  sort_order: lesson.order,
  title: lesson.title,
  est_minutes: lesson.estMinutes,
  anchor_refs: lesson.anchorRefs,
  memory_verse_ref: lesson.memoryVerseRef,
  badge_id: lesson.badgeId ?? null,
  safety: lesson.safety ?? null,
  steps: lesson.steps,
}))

const releaseOptions = releaseLessons.flatMap((lesson) =>
  lesson.steps.flatMap((step) => step.choice?.options ?? []),
)
const interactionSummary = [
  `${new Set(releaseLessons.map((lesson) => lesson.courseId)).size} cursuri`,
  `${releaseLessons.filter((lesson) =>
    lesson.steps.some((step) => WRITTEN_RESPONSE_TYPES.has(step.type)),
  ).length} răspunsuri libere`,
  `${releaseLessons.filter((lesson) =>
    lesson.steps.some((step) => step.type === "multi_choice"),
  ).length} selecții multiple`,
  `${releaseLessons.filter((lesson) =>
    lesson.steps.some((step) => step.type === "declaration"),
  ).length} declarații`,
  `${releaseOptions.filter((option) => option.feedback).length} opțiuni cu feedback`,
  `${releaseOptions.filter((option) => option.branchStepId).length} opțiuni cu ramură`,
].join(", ")

if (process.argv.includes("--dry-run")) {
  console.log(
    `Conținut valid: ${STATIC_CONTENT_MANIFEST.contentVersion}, ${rows.length} lecții.`,
  )
  console.log(`Acoperire interactivă: ${interactionSummary}.`)
  process.exit(0)
}

const url = process.env.SUPABASE_URL
const secret =
  process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !secret) {
  throw new Error(
    "Lipsesc SUPABASE_URL și SUPABASE_SECRET_KEY/SUPABASE_SERVICE_ROLE_KEY.",
  )
}

const supabase = createClient(url, secret, {
  auth: { persistSession: false, autoRefreshToken: false },
})

const { data, error } = await supabase.rpc("publish_content_release", {
  release_version: STATIC_CONTENT_MANIFEST.contentVersion,
  release_payload: STATIC_CONTENT_MANIFEST,
  release_lessons: rows,
})

if (error) throw error

console.log(
  `Release publicat: ${STATIC_CONTENT_MANIFEST.contentVersion}, ${rows.length} lecții.`,
)
console.log(`Acoperire interactivă: ${interactionSummary}.`)
console.log(data)
