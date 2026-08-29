import type { Lesson, LessonStep } from "./domain.js"
import { safetyPolicyForLesson } from "./lessonSafety.js"

export type LessonAgeHint = "0-5" | "6-11" | "12-18" | "adult" | "bunici"

function stableHash(value: string): number {
  let hash = 2_166_136_261
  for (const character of value) {
    hash = Math.imul(hash ^ (character.codePointAt(0) ?? 0), 16_777_619) >>> 0
  }
  return hash
}

/**
 * Păstrează indexul sursă al răspunsului pentru drafturile existente, dar mută
 * poziția afișată de la o sesiune la alta. Astfel, răspunsul corect nu devine
 * un tipar vizual pe care utilizatorul îl poate ghici.
 */
export function quizOptionRotation(
  courseId: string,
  quizSequenceIndex: number,
  correctOptionIndex: number,
  optionCount: number,
  previousCorrectPosition = -1,
): number {
  if (optionCount < 2 || correctOptionIndex < 0) return 0
  const courseOffset = stableHash(courseId) % optionCount
  const normalizedIndex = Number.isInteger(quizSequenceIndex) && quizSequenceIndex >= 0
    ? quizSequenceIndex
    : 0
  let targetPosition = (courseOffset + normalizedIndex) % optionCount
  if (optionCount > 1 && targetPosition === previousCorrectPosition) {
    targetPosition = (targetPosition + 1) % optionCount
  }
  return (correctOptionIndex - targetPosition + optionCount) % optionCount
}

export interface LessonInteractionContext {
  ageHint?: LessonAgeHint
  finalInCourse: boolean
}

const GENERATED = {
  reflection: "__reflection",
  declaration: "__closing_declaration",
} as const

const EDITORIAL_REFLECTIONS: Readonly<Record<string, { prompt: string; placeholder: string }>> = {
  vesnicia_l1: {
    prompt: "Când te gândești la rai ca la prezența lui Dumnezeu, ce se schimbă față de imaginea pe care o aveai înainte?",
    placeholder: "Numește imaginea veche și adevărul pe care îl păstrezi acum…",
  },
  vesnicia_l2: {
    prompt: "Ce te ajută să iei în serios despărțirea de Dumnezeu fără să folosești frica drept presiune?",
    placeholder: "Scrie ce ai înțeles și ce întrebare rămâne încă deschisă…",
  },
  pilda_bogatul_nebun: {
    prompt: "Ce încerci să depozitezi ca să te simți în siguranță și ce nu poate cumpăra acel lucru?",
    placeholder: "Poți numi un bun, un plan sau o imagine de succes…",
  },
  pilda_bogatul_lazar: {
    prompt: "Cine este omul de la «poarta» ta pe care îl vezi des, dar pe lângă care treci?",
    placeholder: "Numește persoana sau nevoia și un gest sigur pe care îl poți face…",
  },
}

const REFLECTION_FRAMES = [
  (cue: string) => `Recitește pasul practic: „${cue}”. Unde îți întâlnește viața de acum?`,
  (cue: string) => `Pasul practic începe cu „${cue}”. Ce te ajută sau te împiedică să-l începi?`,
  (cue: string) => `Ai ajuns la pasul „${cue}”. Care este răspunsul tău sincer?`,
  (cue: string) => `Lecția propune „${cue}”. Cum ar arăta asta concret pentru tine?`,
  (cue: string) => `Oprește-te la pasul „${cue}”. Unde ai nevoie de curaj sau de ajutor?`,
  (cue: string) => `Ține aproape pasul „${cue}”. În ce situație de azi îl poți încerca?`,
  (cue: string) => `Privește din nou pasul „${cue}”. Ce întrebare îți ridică?`,
  (cue: string) => `Pasul de azi este „${cue}”. Care ar fi primul gest sigur?`,
] as const

const DECLARATION_FRAMES = [
  (cue: string) => `Ultimul pas propus este „${cue}”. Ce alegi concret la capătul cursului?`,
  (cue: string) => `Cursul se încheie cu pasul „${cue}”. Cu ce angajament sincer răspunzi?`,
  (cue: string) => `Privește pasul „${cue}”. Ce vrei să duci în săptămâna următoare?`,
  (cue: string) => `După pasul „${cue}”, care este primul lucru verificabil pe care îl vei face?`,
  (cue: string) => `Pasul final spune „${cue}”. Cui îi vei spune și cum vei începe?`,
  (cue: string) => `Ca să trăiești pasul „${cue}”, ce limită, ajutor sau obicei îți trebuie?`,
  (cue: string) => `Ai încheiat cu pasul „${cue}”. Cum formulezi răspunsul în cuvintele tale?`,
  (cue: string) => `Păstrează înaintea ta pasul „${cue}”. Ce alegere vrei să rămână după lecție?`,
] as const

function compactPracticeCue(lesson: Lesson): string {
  const ordered = [...lesson.steps].sort((left, right) => left.order - right.order)
  const source = [...ordered].reverse().find((step) => step.type === "step" && step.bubbles?.length)
    ?? [...ordered].reverse().find((step) => (
      ["how_god_helps", "truth_simple", "hook"].includes(step.type)
      && step.bubbles?.length
    ))
  const text = source?.bubbles?.at(-1)?.text.trim() ?? lesson.title
  const words = text.replace(/^[„“«]|[”»]$/gu, "").split(/\s+/u)
  const cue = words.slice(0, 12).join(" ").replace(/[,:;.!?—-]+$/gu, "")
  return words.length > 12 ? `${cue}…` : cue
}

function contextualPrompt(
  lesson: Lesson,
  frames: readonly ((cue: string) => string)[],
): string {
  const frame = frames[stableHash(lesson.id) % frames.length]
  return frame(compactPracticeCue(lesson))
}

function reflectionStep(lesson: Lesson, ageHint?: LessonAgeHint): LessonStep {
  const cue = compactPracticeCue(lesson)
  if (ageHint === "0-5") {
    return {
      id: `${lesson.id}${GENERATED.reflection}`,
      type: "reflection",
      order: 0,
      response: {
        prompt: `Pentru părinte: cum poate copilul încerca, în siguranță, pasul „${cue}”?`,
      },
    }
  }

  if (ageHint === "6-11") {
    return {
      id: `${lesson.id}${GENERATED.reflection}`,
      type: "reflection",
      order: 0,
      response: {
        prompt: `Ce poți face astăzi din pasul „${cue}”?`,
      },
    }
  }

  const editorial = EDITORIAL_REFLECTIONS[lesson.id]
  if (editorial) {
    return {
      id: `${lesson.id}${GENERATED.reflection}`,
      type: "reflection",
      order: 0,
      response: editorial,
    }
  }

  return {
    id: `${lesson.id}${GENERATED.reflection}`,
    type: "reflection",
    order: 0,
    response: {
      prompt: contextualPrompt(lesson, REFLECTION_FRAMES),
    },
  }
}

function declarationStep(lesson: Lesson, ageHint?: LessonAgeHint): LessonStep {
  const cue = compactPracticeCue(lesson)
  if (ageHint === "0-5") {
    return {
      id: `${lesson.id}${GENERATED.declaration}`,
      type: "declaration",
      order: 0,
      response: {
        prompt: `Ce veți încerca împreună din pasul „${cue}”?`,
      },
    }
  }

  if (ageHint === "6-11") {
    return {
      id: `${lesson.id}${GENERATED.declaration}`,
      type: "declaration",
      order: 0,
      response: {
        prompt: `Cum vrei să exersezi pasul „${cue}” după curs?`,
      },
    }
  }

  return {
    id: `${lesson.id}${GENERATED.declaration}`,
    type: "declaration",
    order: 0,
    response: {
      prompt: contextualPrompt(lesson, DECLARATION_FRAMES),
    },
  }
}

function enrichLesson(
  lesson: Lesson,
  context: LessonInteractionContext,
): Lesson {
  const safety = lesson.safety ?? safetyPolicyForLesson(lesson.id)
  const steps = [...lesson.steps].sort((a, b) => a.order - b.order)

  const generated: LessonStep[] = []

  const hasWrittenResponse = steps.some((step) =>
    ["journal", "reflection", "declaration"].includes(step.type),
  )
  const hasDeclaration = steps.some((step) => step.type === "declaration")

  // În lecțiile de siguranță, un răspuns liber poate expune pe dispozitiv
  // detalii despre abuz, dovezi sau un plan de ieșire. Păstrăm numai
  // interacțiunile scrise aprobate editorial în sursa lecției.
  if (!safety && !hasWrittenResponse && !context.finalInCourse) {
    generated.push(reflectionStep(lesson, context.ageHint))
  }
  if (!safety && context.finalInCourse && !hasDeclaration) {
    generated.push(declarationStep(lesson, context.ageHint))
  }

  const generatedMinutes = generated.reduce((total, step) => {
    if (step.type === "multi_choice") return total + 1
    if (context.ageHint === "0-5") return total + 1
    return total + 2
  }, 0)

  if (generated.length === 0) {
    return {
      ...lesson,
      ...(safety ? { safety } : {}),
      estMinutes: lesson.estMinutes + generatedMinutes,
      steps,
    }
  }

  const closingIndex = steps.findIndex((step) =>
    step.type === "memory_verse" || step.type === "reward",
  )
  const insertAt = closingIndex === -1 ? steps.length : closingIndex
  const combined = [
    ...steps.slice(0, insertAt),
    ...generated,
    ...steps.slice(insertAt),
  ].map((step, index) => ({ ...step, order: index + 1 }))

  return {
    ...lesson,
    ...(safety ? { safety } : {}),
    estMinutes: lesson.estMinutes + generatedMinutes,
    steps: combined,
  }
}

export function enrichLessonCollection(
  source: readonly Lesson[],
  ageHints: Readonly<Record<string, LessonAgeHint | undefined>> = {},
): Lesson[] {
  const byCourse = new Map<string, Lesson[]>()
  for (const lesson of source) {
    const course = byCourse.get(lesson.courseId) ?? []
    course.push(lesson)
    byCourse.set(lesson.courseId, course)
  }

  const result: Lesson[] = []
  for (const course of byCourse.values()) {
    const ordered = [...course].sort(
      (a, b) => a.order - b.order || a.id.localeCompare(b.id),
    )
    const finalId = ordered[ordered.length - 1]?.id

    for (const lesson of ordered) {
      result.push(
        enrichLesson(lesson, {
          ageHint: ageHints[lesson.courseId],
          finalInCourse: lesson.id === finalId,
        }),
      )
    }
  }
  return result
}
