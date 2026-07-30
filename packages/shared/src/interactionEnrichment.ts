import type { ChoiceOption, Lesson, LessonStep } from "./domain.js"

export type LessonAgeHint = "0-5" | "6-11" | "12-18" | "adult" | "bunici"

export interface LessonInteractionContext {
  ageHint?: LessonAgeHint
  firstInCourse: boolean
  finalInCourse: boolean
  courseHasMultiChoice: boolean
}

const GENERATED = {
  focus: "__course_focus",
  reflection: "__reflection",
  declaration: "__closing_declaration",
} as const

function choiceFeedback(label: string, ageHint?: LessonAgeHint): string {
  const answer = label.trim().replace(/[.!?]+$/u, "")
  if (ageHint === "0-5" || ageHint === "6-11") {
    return `Ai ales: „${answer}”. Mulțumesc. Mergem mai departe de aici, fără note și fără să te facem de rușine pentru răspuns.`
  }
  return `Ai ales: „${answer}”. Răspunsul acesta este un punct de plecare, nu un verdict despre tine. Îl ținem aproape în timp ce mergem mai departe.`
}

function enrichChoiceOption(
  option: ChoiceOption,
  ageHint?: LessonAgeHint,
): ChoiceOption {
  if (option.feedback || option.branchStepId) return option
  return { ...option, feedback: choiceFeedback(option.label, ageHint) }
}

function focusStep(lesson: Lesson, ageHint?: LessonAgeHint): LessonStep {
  if (ageHint === "0-5") {
    return {
      id: `${lesson.id}${GENERATED.focus}`,
      type: "multi_choice",
      order: 0,
      bubbles: [
        {
          from: "guide",
          text: "În cursul acesta puteți alege mai multe lucruri de făcut împreună.",
        },
      ],
      multiChoice: {
        prompt: "Ce vreți să faceți împreună? Puteți alege mai multe.",
        options: [
          { id: `${lesson.id}__focus_story`, label: "Să povestim" },
          { id: `${lesson.id}__focus_draw`, label: "Să desenăm sau să ne jucăm" },
          { id: `${lesson.id}__focus_pray`, label: "Să ne rugăm simplu" },
          { id: `${lesson.id}__focus_step`, label: "Să facem pasul practic" },
        ],
      },
    }
  }

  if (ageHint === "6-11") {
    return {
      id: `${lesson.id}${GENERATED.focus}`,
      type: "multi_choice",
      order: 0,
      bubbles: [
        {
          from: "guide",
          text: "Nu trebuie să alegi un singur lucru. Poți urmări mai multe pe parcurs.",
        },
      ],
      multiChoice: {
        prompt: "Ce vrei să exersezi în cursul acesta?",
        options: [
          { id: `${lesson.id}__focus_truth`, label: "Să înțeleg adevărul biblic" },
          { id: `${lesson.id}__focus_feeling`, label: "Să spun ce simt" },
          { id: `${lesson.id}__focus_step`, label: "Să fac un pas bun" },
          { id: `${lesson.id}__focus_question`, label: "Să pun întrebări sincere" },
        ],
      },
    }
  }

  return {
    id: `${lesson.id}${GENERATED.focus}`,
    type: "multi_choice",
    order: 0,
    bubbles: [
      {
        from: "guide",
        text: "Nu trebuie să urmărești un singur rezultat. Alege ce vrei să observi pe parcursul cursului.",
      },
    ],
    multiChoice: {
      prompt: "Ce vrei să urmărești? Poți alege mai multe.",
      options: [
        { id: `${lesson.id}__focus_truth`, label: "Adevărul biblic pe care îl înțeleg" },
        { id: `${lesson.id}__focus_thought`, label: "Gândul care are nevoie de corectare" },
        { id: `${lesson.id}__focus_step`, label: "Pasul practic pe care îl pot face" },
        { id: `${lesson.id}__focus_question`, label: "Întrebarea pe care încă o port" },
      ],
    },
  }
}

function reflectionStep(lesson: Lesson, ageHint?: LessonAgeHint): LessonStep {
  if (ageHint === "0-5") {
    return {
      id: `${lesson.id}${GENERATED.reflection}`,
      type: "reflection",
      order: 0,
      response: {
        prompt: `Pentru părinte: ce a observat copilul în lecția „${lesson.title}”?`,
        placeholder: "O propoziție este suficientă…",
      },
    }
  }

  if (ageHint === "6-11") {
    return {
      id: `${lesson.id}${GENERATED.reflection}`,
      type: "reflection",
      order: 0,
      response: {
        prompt: `Ce idee din „${lesson.title}” vrei să ții minte astăzi?`,
        placeholder: "Scrie în cuvintele tale…",
      },
    }
  }

  return {
    id: `${lesson.id}${GENERATED.reflection}`,
    type: "reflection",
    order: 0,
    response: {
      prompt: `În cuvintele tale, ce adevăr din lecția „${lesson.title}” atinge situația ta de acum?`,
      placeholder: "Poți scrie o propoziție sau poți trece peste acum…",
    },
  }
}

function declarationStep(lesson: Lesson, ageHint?: LessonAgeHint): LessonStep {
  if (ageHint === "0-5") {
    return {
      id: `${lesson.id}${GENERATED.declaration}`,
      type: "declaration",
      order: 0,
      response: {
        prompt:
          "Părinte și copil, completați numai dacă vreți: „Săptămâna aceasta vrem să…”",
        placeholder: "Săptămâna aceasta vrem să…",
      },
    }
  }

  if (ageHint === "6-11") {
    return {
      id: `${lesson.id}${GENERATED.declaration}`,
      type: "declaration",
      order: 0,
      response: {
        prompt:
          "Completează numai dacă este adevărat pentru tine: „Din cursul acesta vreau să duc cu mine…”",
        placeholder: "Vreau să duc cu mine…",
      },
    }
  }

  return {
    id: `${lesson.id}${GENERATED.declaration}`,
    type: "declaration",
    order: 0,
    response: {
      prompt:
        "Încheie numai dacă poți spune sincer: „Din cursul acesta aleg să duc mai departe…”",
      placeholder: "Aleg să duc mai departe…",
    },
  }
}

function enrichLesson(
  lesson: Lesson,
  context: LessonInteractionContext,
): Lesson {
  const addsChoiceFeedback = lesson.steps.some((step) =>
    step.choice?.options.some(
      (option) => !option.feedback && !option.branchStepId,
    ),
  )
  const steps = [...lesson.steps]
    .sort((a, b) => a.order - b.order)
    .map((step) =>
      step.choice
        ? {
            ...step,
            choice: {
              ...step.choice,
              options: step.choice.options.map((option) =>
                enrichChoiceOption(option, context.ageHint),
              ),
            },
          }
        : step,
    )

  const generated: LessonStep[] = []
  if (context.firstInCourse && !context.courseHasMultiChoice) {
    generated.push(focusStep(lesson, context.ageHint))
  }

  const hasWrittenResponse = steps.some((step) =>
    ["journal", "reflection", "declaration"].includes(step.type),
  )
  const hasDeclaration = steps.some((step) => step.type === "declaration")

  if (!hasWrittenResponse && !context.finalInCourse) {
    generated.push(reflectionStep(lesson, context.ageHint))
  }
  if (context.finalInCourse && !hasDeclaration) {
    generated.push(declarationStep(lesson, context.ageHint))
  }

  const generatedMinutes = generated.reduce((total, step) => {
    if (step.type === "multi_choice") return total + 1
    if (context.ageHint === "0-5") return total + 1
    return total + 2
  }, addsChoiceFeedback ? 1 : 0)

  if (generated.length === 0) {
    return {
      ...lesson,
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
    const courseHasMultiChoice = ordered.some((lesson) =>
      lesson.steps.some((step) => step.type === "multi_choice"),
    )
    const firstId = ordered[0]?.id
    const finalId = ordered[ordered.length - 1]?.id

    for (const lesson of ordered) {
      result.push(
        enrichLesson(lesson, {
          ageHint: ageHints[lesson.courseId],
          firstInCourse: lesson.id === firstId,
          finalInCourse: lesson.id === finalId,
          courseHasMultiChoice,
        }),
      )
    }
  }
  return result
}
