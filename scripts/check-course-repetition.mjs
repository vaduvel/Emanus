import {
  ALL_LIBRARY_COURSES,
  LIBRARY_LESSONS,
} from "../packages/shared/dist/library/current.js"
import {
  ALL_DOORS,
  PATHS,
  getPathForDoor,
  isPathReviewed,
} from "../packages/shared/dist/paths/index.js"
import { LESSON_SAFETY_POLICIES } from "../packages/shared/dist/lessonSafety.js"
import { quizOptionRotation } from "../packages/shared/dist/interactionEnrichment.js"

const SCRIPTURE_STEP_TYPES = new Set(["scripture", "memory_verse"])

const issues = []

function report(code, message, occurrences = []) {
  issues.push({ code, message, occurrences })
}

function normalizeText(value) {
  return typeof value === "string"
    ? value.normalize("NFKC").replace(/\s+/gu, " ").trim().toLocaleLowerCase("ro-RO")
    : ""
}

function normalizeTemplateText(value, lessonTitle) {
  const normalized = normalizeText(value)
  const title = normalizeText(lessonTitle)
  return title ? normalized.split(title).join("<titlul-lectiei>") : normalized
}

function templateSignature(value, lessonTitle) {
  const title = normalizeText(lessonTitle)
  const serialized = signature(value)
  return title ? serialized.split(title).join("<titlul-lectiei>") : serialized
}

// Aceste mesaje sunt contracte UX stabile, nu conținut editorial al lecției.
// Rămân verificate pentru dublare în aceeași lecție, dar sunt permise între lecții.
const CROSS_LESSON_INTENTIONAL_MICROCOPY = new Set([
  "Răspunsul este opțional. Nu scrie nimic ce nu vrei să rămână salvat pe dispozitivul tău.",
  "Exemplu — schimbă-l în cuvintele tale:",
  "Scrie numai ceea ce poți spune sincer…",
].map(normalizeText))

function isExcludedStep(step) {
  return SCRIPTURE_STEP_TYPES.has(step.type)
}

function optionPayload(option, excludedTexts = new Set()) {
  const label = normalizeText(option.label)
  const feedback = normalizeText(option.feedback)
  return {
    label: excludedTexts.has(label) ? "" : label,
    feedback: excludedTexts.has(feedback) ? "" : feedback,
  }
}

function stepPayload(step, excludedTexts = new Set()) {
  const text = (value) => {
    const normalized = normalizeText(value)
    return excludedTexts.has(normalized) ? "" : normalized
  }
  return {
    type: step.type,
    bubbles: (step.bubbles ?? []).map((bubble) => text(bubble.text)).filter(Boolean),
    choice: step.choice
      ? {
          prompt: text(step.choice.prompt),
          options: step.choice.options
            .map((option) => optionPayload(option, excludedTexts))
            .filter((option) => option.label || option.feedback),
        }
      : null,
    multiChoice: step.multiChoice
      ? {
          prompt: text(step.multiChoice.prompt),
          options: step.multiChoice.options
            .map((option) => optionPayload(option, excludedTexts))
            .filter((option) => option.label || option.feedback),
          minSelections: step.multiChoice.minSelections ?? null,
          maxSelections: step.multiChoice.maxSelections ?? null,
        }
      : null,
    response: step.response
      ? {
          prompt: text(step.response.prompt),
          placeholder: text(step.response.placeholder),
          required: step.response.required ?? false,
          minLength: step.response.minLength ?? null,
        }
      : null,
    quiz: step.quiz
      ? {
          question: text(step.quiz.question),
          options: step.quiz.options
            .map((option) => ({ text: text(option.text), correct: option.correct }))
            .filter((option) => option.text),
          explanation: text(step.quiz.explanation),
        }
      : null,
    journalPrompt: text(step.journalPrompt),
  }
}

function signature(value) {
  return JSON.stringify(value)
}

function occurrence(course, lesson, step, extra = {}) {
  return {
    ...(typeof course.offerAtPathEnd === "boolean"
      ? { pathId: course.id }
      : { courseId: course.id }),
    lessonId: lesson.id,
    stepId: step?.id,
    ...extra,
  }
}

function describeOccurrence(item) {
  const parts = [
    item.pathId ? `path=${item.pathId}` : `course=${item.courseId}`,
    `lesson=${item.lessonId}`,
  ]
  if (item.stepId) parts.push(`step=${item.stepId}`)
  if (item.field) parts.push(`field=${item.field}`)
  return parts.join(" ")
}

function addToGroup(groups, key, item) {
  if (!key) return
  const group = groups.get(key) ?? []
  group.push(item)
  groups.set(key, group)
}

function visibleTextOccurrences(step, safetyTexts) {
  if (isExcludedStep(step)) return []

  const values = [
    ...(step.bubbles ?? []).map((bubble, index) => ({
      value: bubble.text,
      field: `bubbles:${index + 1}`,
    })),
    { value: step.choice?.prompt, field: "choice.prompt" },
    ...(step.choice?.options ?? []).flatMap((option, index) => [
      { value: option.label, field: `choice.option:${index + 1}.label` },
      { value: option.feedback, field: `choice.option:${index + 1}.feedback` },
    ]),
    { value: step.multiChoice?.prompt, field: "multiChoice.prompt" },
    ...(step.multiChoice?.options ?? []).flatMap((option, index) => [
      { value: option.label, field: `multiChoice.option:${index + 1}.label` },
      { value: option.feedback, field: `multiChoice.option:${index + 1}.feedback` },
    ]),
    { value: step.response?.prompt, field: "response.prompt" },
    { value: step.response?.placeholder, field: "response.placeholder" },
    { value: step.quiz?.question, field: "quiz.question" },
    ...(step.quiz?.options ?? []).map((option, index) => ({
      value: option.text,
      field: `quiz.option:${index + 1}`,
    })),
    { value: step.quiz?.explanation, field: "quiz.explanation" },
    { value: step.journalPrompt, field: "journalPrompt" },
  ]

  return values
    .map(({ value, field }) => ({ text: normalizeText(value), field }))
    .filter(({ text }) => text && !safetyTexts.has(text))
}

function visibleTexts(step, safetyTexts) {
  return [...new Set(visibleTextOccurrences(step, safetyTexts).map(({ text }) => text))]
}

function lessonFlow(lesson, course) {
  const stepById = new Map(lesson.steps.map((step) => [step.id, step]))
  const branchTargets = new Set()

  for (const step of lesson.steps) {
    for (const option of step.choice?.options ?? []) {
      if (!option.branchStepId) continue
      branchTargets.add(option.branchStepId)
      if (step.type !== "choice") {
        report(
          "BRANCH_UNSUPPORTED_OWNER",
          `Ramura ${option.branchStepId} este declarată pe un pas ${step.type}; playerul urmează ramuri numai din choice.`,
          [occurrence(course, lesson, step, { field: `choice.option:${option.id}` })],
        )
      }
      if (!stepById.has(option.branchStepId)) {
        report(
          "BRANCH_TARGET_MISSING",
          `Ținta de ramură ${option.branchStepId} nu există în lecție.`,
          [occurrence(course, lesson, step, { field: `choice.option:${option.id}` })],
        )
      }
    }

    for (const option of step.multiChoice?.options ?? []) {
      if (!option.branchStepId) continue
      report(
        "BRANCH_UNSUPPORTED_OWNER",
        `Ramura ${option.branchStepId} este declarată pe multi_choice, dar playerul nu urmează ramuri din multi_choice.`,
        [occurrence(course, lesson, step, { field: `multiChoice.option:${option.id}` })],
      )
      if (!stepById.has(option.branchStepId)) {
        report(
          "BRANCH_TARGET_MISSING",
          `Ținta de ramură ${option.branchStepId} nu există în lecție.`,
          [occurrence(course, lesson, step, { field: `multiChoice.option:${option.id}` })],
        )
      }
    }
  }

  const mainSteps = lesson.steps
    .filter((step) => !branchTargets.has(step.id))
    .sort((left, right) => left.order - right.order || left.id.localeCompare(right.id))
  const mainIndex = new Map(mainSteps.map((step, index) => [step.id, index]))
  const reached = new Set()
  const edges = new Map()
  const queue = []
  const seenStates = new Set()

  function enqueueMain(stepId) {
    if (!stepId) return
    const index = mainIndex.get(stepId)
    if (index === undefined) return
    queue.push({ stepId, returnMainId: mainSteps[index + 1]?.id ?? null })
  }

  function enqueueBranch(stepId, returnMainId) {
    if (!stepId || !stepById.has(stepId)) return
    queue.push({ stepId, returnMainId })
  }

  function addEdge(from, to) {
    if (!from || !to || !stepById.has(to)) return
    const targets = edges.get(from) ?? new Set()
    targets.add(to)
    edges.set(from, targets)
  }

  function returnToMain(from, returnMainId) {
    if (!returnMainId) return
    addEdge(from, returnMainId)
    enqueueMain(returnMainId)
  }

  enqueueMain(mainSteps[0]?.id)

  while (queue.length > 0) {
    const state = queue.shift()
    const stateKey = `${state.stepId}\u0000${state.returnMainId ?? ""}`
    if (seenStates.has(stateKey)) continue
    seenStates.add(stateKey)

    const step = stepById.get(state.stepId)
    if (!step) continue
    reached.add(step.id)

    if (step.type !== "choice") {
      returnToMain(step.id, state.returnMainId)
      continue
    }

    const options = step.choice?.options ?? []
    for (const option of options) {
      if (option.branchStepId && stepById.has(option.branchStepId)) {
        addEdge(step.id, option.branchStepId)
        enqueueBranch(option.branchStepId, state.returnMainId)
      } else if (!option.branchStepId) {
        returnToMain(step.id, state.returnMainId)
      }
    }
  }

  for (const step of lesson.steps) {
    if (!reached.has(step.id)) {
      report(
        "STEP_UNREACHABLE",
        "Pasul nu este accesibil prin fluxul real al playerului.",
        [occurrence(course, lesson, step)],
      )
    }
  }

  return { edges, stepById }
}

const allCourseIds = new Map()
for (const course of ALL_LIBRARY_COURSES) {
  const previous = allCourseIds.get(course.id)
  if (previous) {
    report("COURSE_ID_DUPLICATE", "Același ID de curs apare de mai multe ori în catalog.", [
      { courseId: previous.id, lessonId: "-" },
      { courseId: course.id, lessonId: "-" },
    ])
  } else {
    allCourseIds.set(course.id, course)
  }
}

const lessonDefinitions = new Map()
for (const lesson of LIBRARY_LESSONS) {
  const previous = lessonDefinitions.get(lesson.id)
  if (previous) {
    report("LESSON_ID_DUPLICATE", "Același ID de lecție are mai multe definiții.", [
      { courseId: previous.courseId, lessonId: previous.id },
      { courseId: lesson.courseId, lessonId: lesson.id },
    ])
  } else {
    lessonDefinitions.set(lesson.id, lesson)
  }
}

const liveCourses = ALL_LIBRARY_COURSES.filter((course) => course.state === "live")
const courseAudienceGroups = new Map()
for (const course of liveCourses) {
  addToGroup(courseAudienceGroups, normalizeText(course.forWhom), {
    courseId: course.id,
    lessonId: "-",
    field: "forWhom",
  })
}
for (const group of courseAudienceGroups.values()) {
  if (group.length > 1) {
    report(
      "COURSE_FOR_WHOM_REPEATED",
      "Aceeași descriere forWhom este refolosită exact în cursuri Library live diferite.",
      group,
    )
  }
}

const claimedLessons = new Map()
const globalStepIds = new Map()
const liveEntries = []

for (const course of liveCourses) {
  const localLessonIds = new Set()
  if (course.lessonIds.length !== course.plannedLessons) {
    report(
      "COURSE_LESSON_COUNT",
      `Cursul declară ${course.plannedLessons} lecții, dar referă ${course.lessonIds.length}.`,
      [{ courseId: course.id, lessonId: "-" }],
    )
  }

  for (const lessonId of course.lessonIds) {
    if (localLessonIds.has(lessonId)) {
      report("LESSON_REFERENCE_DUPLICATE", "Aceeași lecție este referită de două ori în curs.", [
        { courseId: course.id, lessonId },
      ])
      continue
    }
    localLessonIds.add(lessonId)

    const lesson = lessonDefinitions.get(lessonId)
    if (!lesson) {
      report("LESSON_REFERENCE_MISSING", "Referința cursului nu poate fi rezolvată.", [
        { courseId: course.id, lessonId },
      ])
      continue
    }

    const previousClaim = claimedLessons.get(lessonId)
    if (previousClaim && previousClaim.id !== course.id) {
      report("LESSON_REFERENCE_REUSED", "Aceeași lecție este publicată în două cursuri Library live.", [
        { courseId: previousClaim.id, lessonId },
        { courseId: course.id, lessonId },
      ])
    } else {
      claimedLessons.set(lessonId, course)
    }

    if (lesson.courseId !== course.id) {
      report(
        "LESSON_COURSE_MISMATCH",
        `Lecția declară courseId=${lesson.courseId}, dar este publicată de courseId=${course.id}.`,
        [{ courseId: course.id, lessonId }],
      )
    }

    liveEntries.push({ course, lesson })

    const localStepIds = new Set()
    for (const step of lesson.steps) {
      if (localStepIds.has(step.id)) {
        report("STEP_ID_DUPLICATE", "Același ID de pas apare de două ori în lecție.", [
          occurrence(course, lesson, step),
        ])
      }
      localStepIds.add(step.id)

      const previousStep = globalStepIds.get(step.id)
      if (previousStep && previousStep.lesson.id !== lesson.id) {
        report("STEP_ID_DUPLICATE", "Același ID de pas apare în două lecții live.", [
          occurrence(previousStep.course, previousStep.lesson, previousStep.step),
          occurrence(course, lesson, step),
        ])
      } else {
        globalStepIds.set(step.id, { course, lesson, step })
      }
    }
  }
}

const publicPaths = PATHS.filter((path) => path.offerAtPathEnd && isPathReviewed(path))
const publicPathEntries = publicPaths.flatMap((path) =>
  path.lessons.map((lesson, index) => ({ path, lesson, index })),
)
const publicDoorPrograms = ALL_DOORS.flatMap((door) => {
  const path = getPathForDoor(door.id)
  return path && isPathReviewed(path) ? [{ door, path }] : []
})
const safetyTexts = new Set(
  [
    ...[...liveEntries, ...publicPathEntries].map(({ lesson }) => lesson.safety?.notice),
    ...Object.values(LESSON_SAFETY_POLICIES).map((policy) => policy.notice),
  ]
    .map(normalizeText)
    .filter(Boolean),
)
const canonicalScriptureTexts = new Set(
  liveEntries
    .flatMap(({ lesson }) => lesson.steps.map((step) => step.scripture?.text))
    .map(normalizeText)
    .filter(Boolean),
)

for (const { course, lesson } of liveEntries) {
  if (!lesson.safety) continue
  const generatedWrittenSteps = lesson.steps.filter((step) =>
    step.id.endsWith("__reflection") || step.id.endsWith("__closing_declaration"),
  )
  if (generatedWrittenSteps.length > 0) {
    report(
      "SAFETY_GENERATED_WRITTEN_RESPONSE",
      "O lecție de siguranță nu poate primi automat un răspuns liber care ar putea salva detalii sensibile.",
      generatedWrittenSteps.map((step) => occurrence(course, lesson, step)),
    )
  }
}

const lessonSignatures = new Map()
const globalLibraryVisibleTextGroups = new Map()
for (const { course, lesson } of liveEntries) {
  const meaningfulSteps = [...lesson.steps]
    .filter((step) => !isExcludedStep(step) && visibleTexts(step, safetyTexts).length > 0)
    .sort((left, right) => left.order - right.order || left.id.localeCompare(right.id))
    .map((step) => stepPayload(step, safetyTexts))
  const key = signature(meaningfulSteps)
  if (meaningfulSteps.length > 0) {
    addToGroup(lessonSignatures, key, { courseId: course.id, lessonId: lesson.id })
  }

  for (const step of lesson.steps) {
    if (step.type === "check_in" || isExcludedStep(step)) continue
    for (const { text, field } of visibleTextOccurrences(step, safetyTexts)) {
      if (CROSS_LESSON_INTENTIONAL_MICROCOPY.has(text)) continue
      if (canonicalScriptureTexts.has(text)) continue
      const templated = normalizeTemplateText(text, lesson.title)
      if (templated.length < 32) continue
      addToGroup(
        globalLibraryVisibleTextGroups,
        templated,
        occurrence(course, lesson, step, { field }),
      )
    }
  }
}

for (const group of lessonSignatures.values()) {
  if (group.length > 1) {
    report("LESSON_CONTENT_DUPLICATE", "Lecții întregi au același conținut non-Scriptură.", group)
  }
}

for (const [text, group] of globalLibraryVisibleTextGroups) {
  if (new Set(group.map((item) => item.courseId)).size > 1) {
    report(
      "LIBRARY_VISIBLE_TEXT_REPEATED_BETWEEN_COURSES",
      `Textul vizibil non-Scriptură „${text}” apare în cursuri diferite din Bibliotecă.`,
      group,
    )
  }
}

for (const { course, lesson } of liveEntries) {
  lessonFlow(lesson, course)

  const lessonTextGroups = new Map()
  for (const step of lesson.steps) {
    for (const { text, field } of visibleTextOccurrences(step, safetyTexts)) {
      addToGroup(
        lessonTextGroups,
        text,
        occurrence(course, lesson, step, { field }),
      )
    }
  }
  for (const [text, group] of lessonTextGroups) {
    if (group.length > 1) {
      report(
        "TEXT_REPEATED_IN_LESSON",
        `Textul vizibil non-Scriptură „${text}” apare de mai multe ori în aceeași lecție.`,
        group,
      )
    }
  }
}

for (const course of liveCourses) {
  const entries = liveEntries.filter((entry) => entry.course.id === course.id)
  const quizGroups = {
    question: new Map(),
    option: new Map(),
    explanation: new Map(),
  }
  const repeatedStepGroups = new Map()
  const courseVisibleTextGroups = new Map()
  const displayedCorrectPositions = []

  for (const { lesson } of entries) {
    for (const step of lesson.steps) {
      if (isExcludedStep(step)) continue

      if (step.type !== "check_in") {
        for (const { text, field } of visibleTextOccurrences(step, safetyTexts)) {
          if (CROSS_LESSON_INTENTIONAL_MICROCOPY.has(text)) continue
          const templated = normalizeTemplateText(text, lesson.title)
          if (templated.length < 32) continue
          addToGroup(
            courseVisibleTextGroups,
            templated,
            occurrence(course, lesson, step, { field }),
          )
        }
      }

      if (step.quiz) {
        const correctIndices = step.quiz.options.flatMap((option, index) => option.correct ? [index] : [])
        if (correctIndices.length !== 1) {
          report(
            "QUIZ_CORRECT_OPTION_COUNT",
            `Quizul trebuie să aibă exact un răspuns corect; are ${correctIndices.length}.`,
            [occurrence(course, lesson, step)],
          )
        } else {
          const previousCorrectPosition = displayedCorrectPositions.at(-1)?.position ?? -1
          const rotation = quizOptionRotation(
            `course:${course.id}`,
            displayedCorrectPositions.length,
            correctIndices[0],
            step.quiz.options.length,
            previousCorrectPosition,
          )
          displayedCorrectPositions.push({
            position: (correctIndices[0] - rotation + step.quiz.options.length) % step.quiz.options.length,
            item: occurrence(course, lesson, step),
          })
        }
        const question = normalizeTemplateText(step.quiz.question, lesson.title)
        addToGroup(
          quizGroups.question,
          safetyTexts.has(question) ? "" : question,
          occurrence(course, lesson, step, { field: "quiz.question" }),
        )
        step.quiz.options.forEach((option, index) => {
          const optionText = normalizeTemplateText(option.text, lesson.title)
          addToGroup(
            quizGroups.option,
            safetyTexts.has(optionText) ? "" : optionText,
            occurrence(course, lesson, step, { field: `quiz.option:${index + 1}` }),
          )
        })
        const explanation = normalizeTemplateText(step.quiz.explanation, lesson.title)
        addToGroup(
          quizGroups.explanation,
          safetyTexts.has(explanation) ? "" : explanation,
          occurrence(course, lesson, step, { field: "quiz.explanation" }),
        )
      }

      if (step.type === "choice" || step.type === "how_god_helps") {
        const payload = stepPayload(step, safetyTexts)
        const allTexts = visibleTexts(step, safetyTexts)
        if (allTexts.length === 0) continue
        addToGroup(
          repeatedStepGroups,
          `${step.type}\u0000${templateSignature(payload, lesson.title)}`,
          occurrence(course, lesson, step),
        )
      }
    }
  }

  for (const [kind, groups] of Object.entries(quizGroups)) {
    for (const group of groups.values()) {
      const lessonIds = new Set(group.map((item) => item.lessonId))
      if (lessonIds.size > 1) {
        report(
          `QUIZ_${kind.toUpperCase()}_REPEATED`,
          `Același câmp quiz.${kind} apare în lecții diferite ale cursului.`,
          group,
        )
      }
    }
  }

  for (const group of repeatedStepGroups.values()) {
    if (group.length > 1) {
      report(
        "FULL_INTERACTION_STEP_REPEATED",
        "Același pas choice/how_god_helps este refolosit exact în curs.",
        group,
      )
    }
  }

  for (const [text, group] of courseVisibleTextGroups) {
    const lessonIds = new Set(group.map((item) => item.lessonId))
    if (lessonIds.size > 1) {
      report(
        "COURSE_VISIBLE_TEXT_REPEATED_BETWEEN_LESSONS",
        `Textul vizibil non-Scriptură „${text}” apare în lecții diferite ale aceluiași curs.`,
        group,
      )
    }
  }
  for (let index = 1; index < displayedCorrectPositions.length; index += 1) {
    const previous = displayedCorrectPositions[index - 1]
    const current = displayedCorrectPositions[index]
    if (previous.position === current.position) {
      report(
        "QUIZ_CORRECT_POSITION_REPEATED",
        `Două quizuri succesive afișează răspunsul corect pe poziția ${current.position + 1}.`,
        [previous.item, current.item],
      )
    }
  }
}

const publicPathIdGroups = new Map()
const publicPathLessonIdGroups = new Map()
const publicPathStepIdGroups = new Map()
const publicPathLessonSignatures = new Map()

for (const path of publicPaths) {
  if (!path.id) {
    report("PATH_ID_MISSING", "Un path public nu are ID rezolvabil.", [
      { pathId: "-", lessonId: "-" },
    ])
  }
  addToGroup(publicPathIdGroups, path.id, { pathId: path.id, lessonId: "-" })

  if (path.practices.length !== path.lessons.length) {
    report(
      "PATH_PRACTICE_COUNT_MISMATCH",
      `Path-ul are ${path.lessons.length} lecții, dar ${path.practices.length} practici.`,
      [{ pathId: path.id, lessonId: "-" }],
    )
  }

  const pathVisibleTextGroups = new Map()
  const pathStepSignatureGroups = new Map()
  const displayedCorrectPositions = []

  for (const [index, lesson] of path.lessons.entries()) {
    if (!lesson?.id) {
      report(
        "PATH_LESSON_ID_MISSING",
        `Lecția de la poziția ${index + 1} nu are ID rezolvabil.`,
        [{ pathId: path.id, lessonId: "-" }],
      )
      continue
    }

    const lessonItem = { pathId: path.id, lessonId: lesson.id, field: `position:${index + 1}` }
    addToGroup(publicPathLessonIdGroups, lesson.id, lessonItem)

    if (lesson.courseId !== path.id) {
      report(
        "PATH_LESSON_COURSE_MISMATCH",
        `Lecția declară courseId=${lesson.courseId}, dar este publicată de pathId=${path.id}.`,
        [lessonItem],
      )
    }
    if (lesson.order !== index + 1) {
      report(
        "PATH_LESSON_ORDER_MISMATCH",
        `Lecția are order=${lesson.order}, dar ocupă poziția ${index + 1} în path.`,
        [lessonItem],
      )
    }
    if (!Array.isArray(lesson.anchorRefs) || lesson.anchorRefs.length === 0 || lesson.anchorRefs.some((ref) => !normalizeText(ref))) {
      report(
        "PATH_LESSON_ANCHOR_REFS_MISSING",
        "Lecția nu are toate referințele anchorRefs structurale rezolvabile.",
        [lessonItem],
      )
    }
    if (!normalizeText(lesson.memoryVerseRef)) {
      report(
        "PATH_LESSON_MEMORY_REF_MISSING",
        "Lecția nu are memoryVerseRef structural rezolvabil.",
        [lessonItem],
      )
    }

    const localStepIds = new Map()
    for (const step of lesson.steps) {
      const stepItem = occurrence(path, lesson, step)
      if (!step.id) {
        report(
          "PATH_STEP_ID_MISSING",
          "Un pas din lecția path-ului nu are ID rezolvabil.",
          [stepItem],
        )
      }
      addToGroup(publicPathStepIdGroups, step.id, stepItem)
      addToGroup(localStepIds, step.id, stepItem)

      if (step.quiz) {
        const correctIndices = step.quiz.options.flatMap((option, optionIndex) => option.correct ? [optionIndex] : [])
        if (correctIndices.length !== 1) {
          report(
            "PATH_QUIZ_CORRECT_OPTION_COUNT",
            `Quizul trebuie să aibă exact un răspuns corect; are ${correctIndices.length}.`,
            [stepItem],
          )
        } else {
          const previousCorrectPosition = displayedCorrectPositions.at(-1)?.position ?? -1
          const rotation = quizOptionRotation(
            `path:${path.id}`,
            displayedCorrectPositions.length,
            correctIndices[0],
            step.quiz.options.length,
            previousCorrectPosition,
          )
          displayedCorrectPositions.push({
            position: (correctIndices[0] - rotation + step.quiz.options.length) % step.quiz.options.length,
            item: stepItem,
          })
        }
      }

      if (isExcludedStep(step)) continue

      const texts = visibleTextOccurrences(step, safetyTexts)
      if (step.type !== "check_in") {
        for (const { text, field } of texts) {
          if (CROSS_LESSON_INTENTIONAL_MICROCOPY.has(text)) continue
          addToGroup(
            pathVisibleTextGroups,
            text,
            occurrence(path, lesson, step, { field }),
          )
        }
      }

      if (step.type !== "check_in" && texts.length > 0) {
        addToGroup(
          pathStepSignatureGroups,
          signature(stepPayload(step, safetyTexts)),
          stepItem,
        )
      }
    }

    for (const group of localStepIds.values()) {
      if (group.length > 1) {
        report(
          "PATH_STEP_ID_DUPLICATE_IN_LESSON",
          "Același ID de pas apare de mai multe ori în lecția path-ului.",
          group,
        )
      }
    }

    lessonFlow(lesson, path)

    const lessonTextGroups = new Map()
    for (const step of lesson.steps) {
      for (const { text, field } of visibleTextOccurrences(step, safetyTexts)) {
        addToGroup(
          lessonTextGroups,
          text,
          occurrence(path, lesson, step, { field }),
        )
      }
    }
    for (const [text, group] of lessonTextGroups) {
      if (group.length > 1) {
        report(
          "PATH_TEXT_REPEATED_IN_LESSON",
          `Textul vizibil non-Scriptură „${text}” apare de mai multe ori în aceeași lecție de path.`,
          group,
        )
      }
    }

    const meaningfulSteps = [...lesson.steps]
      .filter((step) =>
        step.type !== "check_in"
        && !isExcludedStep(step)
        && visibleTexts(step, safetyTexts).length > 0,
      )
      .sort((left, right) => left.order - right.order || left.id.localeCompare(right.id))
      .map((step) => stepPayload(step, safetyTexts))
    if (meaningfulSteps.length > 0) {
      addToGroup(publicPathLessonSignatures, signature(meaningfulSteps), lessonItem)
    }
  }

  for (const [text, group] of pathVisibleTextGroups) {
    const lessonIds = new Set(group.map((item) => item.lessonId))
    if (lessonIds.size > 1) {
      report(
        "PATH_VISIBLE_TEXT_REPEATED_BETWEEN_LESSONS",
        `Textul vizibil non-Scriptură „${text}” apare în lecții diferite ale aceluiași path.`,
        group,
      )
    }
  }

  for (const group of pathStepSignatureGroups.values()) {
    const lessonIds = new Set(group.map((item) => item.lessonId))
    if (lessonIds.size > 1) {
      report(
        "PATH_FULL_STEP_REPEATED_BETWEEN_LESSONS",
        "Același pas vizibil non-Scriptură este refolosit exact în lecții diferite ale path-ului.",
        group,
      )
    }
  }
  for (let index = 1; index < displayedCorrectPositions.length; index += 1) {
    const previous = displayedCorrectPositions[index - 1]
    const current = displayedCorrectPositions[index]
    if (previous.position === current.position) {
      report(
        "PATH_QUIZ_CORRECT_POSITION_REPEATED",
        `Două quizuri succesive afișează răspunsul corect pe poziția ${current.position + 1}.`,
        [previous.item, current.item],
      )
    }
  }
}

for (const group of publicPathIdGroups.values()) {
  if (group.length > 1) {
    report("PATH_ID_DUPLICATE", "Același ID de path public apare de mai multe ori.", group)
  }
}
for (const group of publicPathLessonIdGroups.values()) {
  if (group.length > 1) {
    report(
      "PATH_LESSON_ID_DUPLICATE",
      "Același ID/reper de lecție este refolosit în inventarul paths publice.",
      group,
    )
  }
}
for (const group of publicPathStepIdGroups.values()) {
  if (group.length > 1) {
    report(
      "PATH_STEP_ID_DUPLICATE",
      "Același ID de pas este refolosit în inventarul paths publice.",
      group,
    )
  }
}
for (const group of publicPathLessonSignatures.values()) {
  if (group.length > 1) {
    report(
      "PATH_LESSON_CONTENT_DUPLICATE",
      "Lecții întregi din paths publice au același conținut vizibil non-Scriptură.",
      group,
    )
  }
}

for (const { door, path } of publicDoorPrograms) {
  const program = { ...path, id: `door:${door.id}` }
  if (path.practices.length !== path.lessons.length) {
    report(
      "DOOR_PRACTICE_COUNT_MISMATCH",
      `Programul ușii are ${path.lessons.length} lecții, dar ${path.practices.length} practici.`,
      [{ pathId: program.id, lessonId: "-" }],
    )
  }

  const localLessonIds = new Map()
  const visibleTextGroups = new Map()
  const fullStepGroups = new Map()
  const lessonContentGroups = new Map()
  const displayedCorrectPositions = []

  for (const lesson of path.lessons) {
    const lessonItem = { pathId: program.id, lessonId: lesson.id }
    addToGroup(localLessonIds, lesson.id, lessonItem)
    if (lesson.courseId !== path.id) {
      report(
        "DOOR_LESSON_COURSE_MISMATCH",
        `Lecția declară courseId=${lesson.courseId}, dar varianta ușii folosește pathId=${path.id}.`,
        [lessonItem],
      )
    }
    if (!Array.isArray(lesson.anchorRefs) || lesson.anchorRefs.length === 0 || lesson.anchorRefs.some((ref) => !normalizeText(ref))) {
      report("DOOR_LESSON_ANCHOR_REFS_MISSING", "Lecția ușii nu are anchorRefs structurale rezolvabile.", [lessonItem])
    }
    if (!normalizeText(lesson.memoryVerseRef)) {
      report("DOOR_LESSON_MEMORY_REF_MISSING", "Lecția ușii nu are memoryVerseRef structural rezolvabil.", [lessonItem])
    }

    const localStepIds = new Map()
    for (const step of lesson.steps) {
      const stepItem = occurrence(program, lesson, step)
      addToGroup(localStepIds, step.id, stepItem)
      if (step.quiz) {
        const correctIndices = step.quiz.options.flatMap((option, optionIndex) => option.correct ? [optionIndex] : [])
        if (correctIndices.length !== 1) {
          report(
            "DOOR_QUIZ_CORRECT_OPTION_COUNT",
            `Quizul trebuie să aibă exact un răspuns corect; are ${correctIndices.length}.`,
            [stepItem],
          )
        } else {
          const previousCorrectPosition = displayedCorrectPositions.at(-1)?.position ?? -1
          const rotation = quizOptionRotation(
            program.id,
            displayedCorrectPositions.length,
            correctIndices[0],
            step.quiz.options.length,
            previousCorrectPosition,
          )
          displayedCorrectPositions.push({
            position: (correctIndices[0] - rotation + step.quiz.options.length) % step.quiz.options.length,
            item: stepItem,
          })
        }
      }
      if (isExcludedStep(step)) continue
      const texts = visibleTextOccurrences(step, safetyTexts)
      if (step.type !== "check_in") {
        for (const { text, field } of texts) {
          if (CROSS_LESSON_INTENTIONAL_MICROCOPY.has(text)) continue
          addToGroup(visibleTextGroups, text, occurrence(program, lesson, step, { field }))
        }
        if (texts.length > 0) addToGroup(fullStepGroups, signature(stepPayload(step, safetyTexts)), stepItem)
      }
    }
    for (const group of localStepIds.values()) {
      if (group.length > 1) report("DOOR_STEP_ID_DUPLICATE_IN_LESSON", "Același ID de pas apare de mai multe ori în lecția ușii.", group)
    }

    lessonFlow(lesson, program)
    const meaningfulSteps = [...lesson.steps]
      .filter((step) => step.type !== "check_in" && !isExcludedStep(step) && visibleTexts(step, safetyTexts).length > 0)
      .sort((left, right) => left.order - right.order || left.id.localeCompare(right.id))
      .map((step) => stepPayload(step, safetyTexts))
    if (meaningfulSteps.length > 0) addToGroup(lessonContentGroups, signature(meaningfulSteps), lessonItem)
  }

  for (const group of localLessonIds.values()) {
    if (group.length > 1) report("DOOR_LESSON_REFERENCE_DUPLICATE", "Aceeași lecție apare de două ori în programul ușii.", group)
  }
  for (const [text, group] of visibleTextGroups) {
    if (new Set(group.map((item) => item.lessonId)).size > 1) {
      report("DOOR_VISIBLE_TEXT_REPEATED_BETWEEN_LESSONS", `Textul vizibil non-Scriptură „${text}” apare în sesiuni diferite ale aceleiași uși.`, group)
    }
  }
  for (const group of fullStepGroups.values()) {
    if (new Set(group.map((item) => item.lessonId)).size > 1) {
      report("DOOR_FULL_STEP_REPEATED_BETWEEN_LESSONS", "Același pas vizibil non-Scriptură este refolosit în sesiuni diferite ale ușii.", group)
    }
  }
  for (const group of lessonContentGroups.values()) {
    if (group.length > 1) report("DOOR_LESSON_CONTENT_DUPLICATE", "Două sesiuni ale ușii au același conținut vizibil non-Scriptură.", group)
  }
  for (let index = 1; index < displayedCorrectPositions.length; index += 1) {
    const previous = displayedCorrectPositions[index - 1]
    const current = displayedCorrectPositions[index]
    if (previous.position === current.position) {
      report(
        "DOOR_QUIZ_CORRECT_POSITION_REPEATED",
        `Două quizuri succesive afișează răspunsul corect pe poziția ${current.position + 1}.`,
        [previous.item, current.item],
      )
    }
  }
}

if (issues.length > 0) {
  console.error(`Guard cursuri și paths Emanus: ${issues.length} problem${issues.length === 1 ? "ă" : "e"}.`)
  for (const [index, issue] of issues.entries()) {
    console.error(`\n${index + 1}. [${issue.code}] ${issue.message}`)
    for (const item of issue.occurrences) console.error(`   - ${describeOccurrence(item)}`)
  }
  process.exitCode = 1
} else {
  console.log(
    `Guard cursuri, paths și Uși Emanus OK: ${liveCourses.length} cursuri Library live (${liveEntries.length} lecții, ${globalStepIds.size} pași), ${publicPaths.length} paths publice (${publicPathEntries.length} poziții de lecție) și ${publicDoorPrograms.length} programe de Uși validate.`,
  )
}
